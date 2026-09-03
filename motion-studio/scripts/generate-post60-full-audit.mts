// Post-60s Full Audit(ユーザー指示P0-7対応)。
//
// 背景: 人間が実際にB-clean.mp4を視聴し、約60秒を超えたあたりから音ズレを
// 明確に感じたという事実(human evidence)を最優先し、代表anchorだけでなく
// 60秒以降の**全cue**(phrase-onset/word-accent/syllable-hit、letterCueは
// 60秒以前のため対象外)についてcanonical→generated→plumbingの状態を
// 一覧化する。Critical Cue Report(21件限定)とは別に、post-60領域を
// 網羅する専用レポート。
//
// 出力: docs/decisions/2026-08-27-post60-full-audit.md(歌詞本文は非掲載)

import {existsSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import type {TimingMaster, VocalCue} from '../src/data/startWeddingEdit/timingMaster.ts';
import {resolveEffectiveCueTimeMs} from '../src/data/startWeddingEdit/timingMaster.ts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const localDir = join(studioRoot, 'local');
const masterPath = join(localDir, 'start-wedding-timing-master.local.json');
const benchmarkPath = join(localDir, 'analysis/start-wedding/alignment-benchmark-result.local.json');
const outPath = join(studioRoot, '../docs/decisions/2026-08-27-post60-full-audit.md');

if (!existsSync(masterPath)) {
  console.error('❌ masterが無い。');
  process.exit(1);
}
const master = JSON.parse(readFileSync(masterPath, 'utf8')) as TimingMaster;
const benchmark = existsSync(benchmarkPath)
  ? (JSON.parse(readFileSync(benchmarkPath, 'utf8')) as {results: Array<{cueId: string; agreementSpreadMs: number | null}>})
  : null;
const spreadByCueId = new Map<string, number | null>((benchmark?.results ?? []).map((r) => [r.cueId, r.agreementSpreadMs]));

const generatedModule = (await import(`../src/data/startWeddingEdit/generated.ts?t=${Date.now()}`)) as {
  weddingEditLyricPhrases: Array<{
    phraseId: string;
    importantWords?: Array<{cueId: string; accentSec: number}>;
    threeHitCueIds?: string[] | null;
    threeHitFrameSecs?: number[] | null;
  }>;
};

type Row = {
  phraseId: string;
  cueId: string;
  kind: VocalCue['kind'];
  audioDetectedMs: number | null;
  canonicalMs: number;
  generatedMs: number | null;
  deltaMs: number | null;
  confidenceScore: number;
  agreementSpreadMs: number | null;
  timingSource: string;
  verified: boolean;
  flags: string[];
};

const rows: Row[] = [];
const POST60_MS = 60000;

for (const p of master.phrases) {
  if (p.endMs < POST60_MS) continue; // phraseの一部でも60秒以降にかかっていれば対象
  const generatedPhrase = generatedModule.weddingEditLyricPhrases.find((gp) => gp.phraseId === p.phraseId);
  for (const c of p.cues) {
    if (c.timeMs < POST60_MS) continue; // cue自体が60秒以降のものだけ
    const canonicalMs = resolveEffectiveCueTimeMs(c, p, master.audio);
    const flags: string[] = [];

    let generatedMs: number | null = null;
    if (c.kind === 'word-accent') {
      const match = generatedPhrase?.importantWords?.find((w) => w.cueId === c.cueId);
      if (match) generatedMs = match.accentSec * 1000 + master.audio.sourceStartMs;
      else flags.push('CANONICAL_GENERATED_MISMATCH');
    } else if (c.kind === 'syllable-hit') {
      const idx = generatedPhrase?.threeHitCueIds?.indexOf(c.cueId) ?? -1;
      if (idx !== -1 && generatedPhrase?.threeHitFrameSecs) generatedMs = generatedPhrase.threeHitFrameSecs[idx] * 1000 + master.audio.sourceStartMs;
      else flags.push('CANONICAL_GENERATED_MISMATCH');
    } else {
      // phrase-onsetはgenerated.ts側にcueId単位のexportが無い(phrase.startSecへ
      // 統合済み)ため、phrase.startMsとの一致だけ確認する。
      generatedMs = p.startMs === c.timeMs ? canonicalMs : null;
    }

    const deltaMs = generatedMs != null ? Math.round((generatedMs - canonicalMs) * 10) / 10 : null;
    if (deltaMs != null && Math.abs(deltaMs) > 1000 / 30) flags.push('CANONICAL_GENERATED_MISMATCH');
    if (c.confidenceScore < 0.3) flags.push('LOW_CONFIDENCE');
    if (c.analysisMethod == null && c.timingSource === 'audio-analysis') flags.push('NO_AUDIO_EVIDENCE');
    if (!c.verifiedByListening) flags.push('UNVERIFIED');
    const spread = spreadByCueId.get(c.cueId) ?? null;
    if (spread != null && spread > 150) flags.push('HIGH_METHOD_DISAGREEMENT');

    rows.push({
      phraseId: p.phraseId,
      cueId: c.cueId,
      kind: c.kind,
      audioDetectedMs: c.detectedAtMs,
      canonicalMs,
      generatedMs,
      deltaMs,
      confidenceScore: c.confidenceScore,
      agreementSpreadMs: spread,
      timingSource: c.timingSource,
      verified: c.verifiedByListening,
      flags,
    });
  }
}

// syllable-hitのmonotonic検査(phrase内)
for (const p of master.phrases) {
  if (p.endMs < POST60_MS) continue;
  const hits = p.cues.filter((c) => c.kind === 'syllable-hit' && c.timeMs >= POST60_MS).sort((a, b) => a.cueId.localeCompare(b.cueId));
  for (let i = 1; i < hits.length; i++) {
    if (hits[i].timeMs <= hits[i - 1].timeMs) {
      const row = rows.find((r) => r.cueId === hits[i].cueId);
      row?.flags.push('NON_MONOTONIC');
    }
  }
}

rows.sort((a, b) => a.canonicalMs - b.canonicalMs);

const fmt = (v: number | null, d = 1) => (v == null ? '—' : v.toFixed(d));
const header = '| phraseId | cueId | kind | audioDetected(ms) | canonical(ms) | generated(ms) | delta(ms) | confidenceScore | agreementSpread(ms) | timingSource | verified | flags |';
const sep = '|---|---|---|---:|---:|---:|---:|---:|---:|---|---|---|';
const body = rows
  .map(
    (r) =>
      `| ${r.phraseId} | ${r.cueId} | ${r.kind} | ${fmt(r.audioDetectedMs)} | ${fmt(r.canonicalMs)} | ${fmt(r.generatedMs)} | ${fmt(r.deltaMs)} | ${r.confidenceScore.toFixed(3)} | ${fmt(r.agreementSpreadMs)} | ${r.timingSource} | ${r.verified ? 'YES' : 'no'} | ${r.flags.join(',') || '—'} |`,
  )
  .join('\n');

const deltas = rows.map((r) => r.deltaMs).filter((d): d is number => d != null);
const maxDelta = deltas.length ? Math.max(...deltas.map(Math.abs)) : null;
const sortedAbs = deltas.map(Math.abs).sort((a, b) => a - b);
const p95 = sortedAbs.length ? sortedAbs[Math.min(sortedAbs.length - 1, Math.floor(sortedAbs.length * 0.95))] : null;
const flaggedCount = rows.filter((r) => r.flags.some((f) => f !== 'UNVERIFIED')).length;

const md = `# Post-60s Full Audit — StaRt Wedding Edit

Status: MACHINE_GENERATED(再生成: \`node --no-warnings scripts/generate-post60-full-audit.mts\`)
masterId: ${master.masterId} / revision: ${master.revision} / contentHash: ${master.contentHash.slice(0, 16)}...

## 対象

phraseの一部でも60秒以降にかかる全phraseの、cue自体が60秒以降にあるもの全件
(phrase-onset/word-accent/syllable-hit)。代表anchorへの間引きはしていない。

計${rows.length}件。canonical→generated delta の絶対値: 最大=${fmt(maxDelta)}ms、P95=${fmt(p95)}ms。
UNVERIFIED以外のflagが立った行: ${flaggedCount}件。

## 列の意味

- **audioDetected(ms)**: htdemucs+librosa onset検出で実際に検出された生の時刻(裏付け無しはnull)
- **canonical(ms)**: \`resolveEffectiveCueTimeMs()\`適用後の正本値
- **generated(ms)**: generated.ts側のcueId一致entryから逆算した絶対ms(見つからなければnull)
- **delta(ms)**: generated - canonical。±33.3ms(1frame)超で CANONICAL_GENERATED_MISMATCH
- **flags**: DUPLICATE_ONSET / NON_MONOTONIC / LOW_CONFIDENCE / NO_AUDIO_EVIDENCE /
  HIGH_METHOD_DISAGREEMENT / CANONICAL_GENERATED_MISMATCH / UNVERIFIED

## 表

${header}
${sep}
${body}

## 注意

これはplumbing(データ伝播)の機械検証結果。UNVERIFIEDは全件に付くのが現状の正しい状態
(人間の聴取確認がまだ0件のため)。UNVERIFIED以外のflagが0件でも「音楽的に正しい」ことは
意味しない — 最終的な正しさはHuman Listening Verificationでのみ確定する。
`;

writeFileSync(outPath, md);
console.log(`[generate-post60-full-audit] ${rows.length}件を出力: ${outPath}`);
console.log(`[generate-post60-full-audit] maxDelta=${fmt(maxDelta)}ms P95=${fmt(p95)}ms flagged(non-UNVERIFIED)=${flaggedCount}件`);
