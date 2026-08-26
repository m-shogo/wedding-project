// Critical Cue Report: expected/detected/rendered/delta/method/confidence/verified
// を表として出力する。ユーザー指示にある「主要cueについてCritical Cue Reportを
// 生成する」に対応する。
//
// 「Critical」の定義: 全73 vocal cue + 5 letterCueを一律には出さず、
// 優先的に確認すべき/演出上重要な以下を対象にする。
//   - syllable-hit(12件、StaRtの「パッ/チャプ」等の3連打アクセント。演出上の
//     ピンポイント同期が特に重要)
//   - letterCue(5件、冒頭のS→StaRt文字組み立て)
//   - confidenceScore最下位のphrase-onset(4件、実onset裏付けが無く優先度が高い)
//
// 出力: docs/decisions/2026-08-26-critical-cue-report.md(Markdown表、Git管理)
// 元データ(音源由来の生JSON)自体はコミットしない。表に載る「text」は各cueの
// 1〜数文字の断片(「パッ」「S」等)であり、既存のdecisionドキュメントで
// 既に使われている粒度と同等。歌詞全文はここにも含めない。

import {existsSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import type {TimingMaster} from '../src/data/startWeddingEdit/timingMaster.ts';
import {resolveEffectiveCueTimeMs} from '../src/data/startWeddingEdit/timingMaster.ts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const localDir = join(studioRoot, 'local');
const masterPath = join(localDir, 'start-wedding-timing-master.local.json');
const benchmarkPath = join(localDir, 'analysis/start-wedding/alignment-benchmark-result.local.json');
const outPath = join(studioRoot, '../docs/decisions/2026-08-26-critical-cue-report.md');

if (!existsSync(masterPath)) {
  console.error('❌ masterが無い。');
  process.exit(1);
}
const master = JSON.parse(readFileSync(masterPath, 'utf8')) as TimingMaster;
const benchmark = existsSync(benchmarkPath)
  ? (JSON.parse(readFileSync(benchmarkPath, 'utf8')) as {results: Array<{cueId: string; agreementSpreadMs: number | null}>})
  : null;
const spreadByCueId = new Map<string, number | null>((benchmark?.results ?? []).map((r) => [r.cueId, r.agreementSpreadMs]));

type Row = {
  cueId: string;
  text: string;
  kind: string;
  expectedMs: number; // 現行timeMs(cueOffsetMs適用前の設計値)
  renderedMs: number; // resolveEffectiveCueTimeMs()適用後、実際にrenderへ渡る値
  detectedAtMs: number | null;
  deltaExpectedVsDetectedMs: number | null;
  analysisMethod: string | null;
  confidenceScore: number | null;
  agreementSpreadMs: number | null;
  timingSource: string;
  verified: boolean;
};

// 重要: phrase-onset cueのtextはphrase全文(実際の歌詞1行)そのものであり、
// このrepoの既存方針(「歌詞本文をGitへ保存せず、LYRIC_###slotだけを使う」
// 既存方針: docs/opening-authority.md「歌詞本文はGitへ保存せず」/
// motion-studio/README.md「local: 実歌詞...local/はGit管理外」)に反する形で
// Git管理下のこのレポートへ書き込んではいけない。syllable-hit/letter-cueの
// textは「パッ」「チャプ」「S」「t」等の1〜2文字のオノマトペ/単一文字であり、
// 既存の committed README/CLAUDE.md でも同粒度の言及がある(全文の歌詞行とは
// 性質が異なる)ため、こちらはそのまま残す。
const redactText = (kind: string, text: string): string => (kind === 'phrase-onset' ? '[歌詞本文は非掲載。cueId接頭辞のphraseIdで参照]' : text);

const rows: Row[] = [];

for (const p of master.phrases) {
  for (const c of p.cues) {
    const isCritical = c.kind === 'syllable-hit';
    const isLowConfidencePhraseOnset = c.kind === 'phrase-onset' && c.confidenceScore <= 0.2;
    if (!isCritical && !isLowConfidencePhraseOnset) continue;
    const renderedMs = resolveEffectiveCueTimeMs(c, p, master.audio);
    rows.push({
      cueId: c.cueId,
      text: redactText(c.kind, c.text),
      kind: c.kind,
      expectedMs: c.timeMs,
      renderedMs,
      detectedAtMs: c.detectedAtMs,
      deltaExpectedVsDetectedMs: c.detectedAtMs != null ? Math.round((c.timeMs - c.detectedAtMs) * 10) / 10 : null,
      analysisMethod: c.analysisMethod,
      confidenceScore: c.confidenceScore,
      agreementSpreadMs: spreadByCueId.get(c.cueId) ?? null,
      timingSource: c.timingSource,
      verified: c.verifiedByListening,
    });
  }
}

for (const b of master.editorialBlocks) {
  for (const c of b.letterCues ?? []) {
    const renderedMs = c.timeMs + master.audio.globalContentOffsetMs;
    rows.push({
      cueId: c.cueId,
      text: c.text,
      kind: 'letter-cue',
      expectedMs: c.timeMs,
      renderedMs,
      detectedAtMs: null,
      deltaExpectedVsDetectedMs: null,
      analysisMethod: null,
      confidenceScore: null,
      agreementSpreadMs: spreadByCueId.get(c.cueId) ?? null,
      timingSource: c.timingSource,
      verified: c.verifiedByListening,
    });
  }
}

rows.sort((a, b) => a.expectedMs - b.expectedMs);

const fmt = (v: number | null, digits = 1) => (v == null ? '—' : v.toFixed(digits));
const header = '| cueId | text | kind | expected(ms) | rendered(ms) | detected(ms) | Δexpected-detected(ms) | method | confidenceScore | agreementSpread(ms) | timingSource | verified |';
const sep = '|---|---|---|---:|---:|---:|---:|---|---:|---:|---|---|';
const body = rows
  .map(
    (r) =>
      `| ${r.cueId} | ${r.text} | ${r.kind} | ${fmt(r.expectedMs, 1)} | ${fmt(r.renderedMs, 1)} | ${fmt(r.detectedAtMs, 1)} | ${fmt(r.deltaExpectedVsDetectedMs, 1)} | ${r.analysisMethod ?? '—'} | ${fmt(r.confidenceScore, 3)} | ${fmt(r.agreementSpreadMs, 1)} | ${r.timingSource} | ${r.verified ? 'YES' : 'no'} |`,
  )
  .join('\n');

const verifiedCount = rows.filter((r) => r.verified).length;
const md = `# Critical Cue Report — StaRt Wedding Edit

Status: MACHINE_GENERATED / 自動生成(再生成: \`node --no-warnings scripts/generate-critical-cue-report.mts\`)
masterId: ${master.masterId} / revision: ${master.revision} / contentHash: ${master.contentHash.slice(0, 16)}...
生成日時からの再現性: このrevisionのmasterから決定的に再生成される(手動編集しない)。

## 対象

- syllable-hit(3連打アクセント、12件)
- letterCue(冒頭S→StaRt文字組み立て、5件)
- confidenceScore≤0.2のphrase-onset(実onset裏付けが無い最優先確認候補、4件)

phrase-onset行の「text」列は、既存方針(歌詞本文をGitへ保存しない)に従い
歌詞全文を掲載せず、cueIdのphraseId接頭辞で参照する形にしている。

計${rows.length}件。**verified=YES: ${verifiedCount}/${rows.length}**(2026-08-26時点、人間の聴取確認はまだ0件)。

## 列の意味

- **expected(ms)**: cue.timeMs(cueOffsetMs適用前の設計値、絶対ms)
- **rendered(ms)**: \`resolveEffectiveCueTimeMs()\`適用後、実際にgenerated.ts/renderへ渡る値
  (global/phrase/cue offsetを二重適用せず合成した最終値)
- **detected(ms)**: timingSource='audio-analysis'の場合、htdemucs+librosa onset検出で
  実際に検出された生の時刻(nullの場合は実onset裏付けなし)
- **Δexpected-detected(ms)**: expected - detected。0に近いほど、検出値をそのまま採用している
- **agreementSpread(ms)**: \`docs/decisions/2026-08-26-forced-alignment-method-benchmark.md\`で
  実施した5手法間の合意度(値がある行のみ。ベンチマーク対象8件中のもの)
- **verified**: 人間が実際に聴いて確認したか(\`apply-listening-verification.mts\`経由でのみtrueになる)

## 表

${header}
${sep}
${body}

## 注意

このレポートはmasterの現在値をそのまま並べたものであり、正解を保証しない。
verified=noの行は、\`pnpm render:cue-listening-clips\` → \`listening-review.local.html\`で
人間が実際に聴いて確認するまで、confidenceScoreがどれだけ高くても最終値として扱わない。
`;

writeFileSync(outPath, md);
console.log(`[generate-critical-cue-report] ${rows.length}件を出力: ${outPath}`);
console.log(`[generate-critical-cue-report] verified=${verifiedCount}/${rows.length}`);
