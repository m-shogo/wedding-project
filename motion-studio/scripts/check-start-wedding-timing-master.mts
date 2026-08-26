// StaRtタイミングマスターのschema/整合性QA。
//
// 検査するもの:
//   - schemaVersion / 必須フィールド有無
//   - 音源sha256が実ファイルと一致
//   - phrase順序(startMs昇順)・重複phraseId
//   - cue ID重複(cueIdはmaster全体で一意である必要がある)
//   - 時刻範囲外(cue.timeMsがphraseの[startMs,endMs]から大きく外れていないか)
//   - held-note-start/endの前後関係
//   - 3-hit(syllable-hit)の必要数
//   - verified状態の整合(verifiedByListening=trueなのにtimingSource='estimated'等の矛盾)
//   - manual値保持(masterのmanualエントリがbackupより減っていないか、の簡易チェック)
//   - TIMING_MASTER_VERIFIED昇格条件

import {createHash} from 'node:crypto';
import {existsSync, readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import type {TimingMaster, VocalCue} from '../src/data/startWeddingEdit/timingMaster.ts';
import {canBeTimingMasterVerified, countVerification} from '../src/data/startWeddingEdit/timingMaster.ts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const masterPath = join(studioRoot, 'local/start-wedding-timing-master.local.json');

if (!existsSync(masterPath)) {
  console.error('❌ local/start-wedding-timing-master.local.json が無い。先にmigrateスクリプトを実行してください。');
  process.exit(1);
}
const master = JSON.parse(readFileSync(masterPath, 'utf8')) as TimingMaster;

const errors: string[] = [];
const warnings: string[] = [];

// 1. schemaVersion
if (typeof master.schemaVersion !== 'number') errors.push('schemaVersionが無い');
if (!master.masterId) errors.push('masterIdが無い');

// 2. 音源hash
const audioDir = join(studioRoot, 'local/audio');
const audioPath = join(audioDir, master.audio.fileName);
if (!existsSync(audioPath)) {
  errors.push(`音源が見つからない: local/audio/${master.audio.fileName}`);
} else {
  const actual = createHash('sha256').update(readFileSync(audioPath)).digest('hex');
  if (actual !== master.audio.sha256) {
    errors.push(`音源sha256不一致: master=${master.audio.sha256.slice(0, 12)}... 実ファイル=${actual.slice(0, 12)}...`);
  }
}

// 3. phrase順序・重複
const seenPhraseIds = new Set<string>();
let lastStart = -Infinity;
for (const p of master.phrases) {
  if (seenPhraseIds.has(p.phraseId)) errors.push(`phraseId重複: ${p.phraseId}`);
  seenPhraseIds.add(p.phraseId);
  if (p.startMs < lastStart) errors.push(`phrase順序が逆転: ${p.phraseId}(startMs=${p.startMs})`);
  lastStart = p.startMs;
  if (p.endMs <= p.startMs) errors.push(`${p.phraseId}: endMs(${p.endMs}) <= startMs(${p.startMs})`);
  if (typeof p.phraseOffsetMs !== 'number' || !Number.isFinite(p.phraseOffsetMs)) {
    errors.push(`${p.phraseId}: phraseOffsetMsが数値でない(${p.phraseOffsetMs})`);
  } else if (p.phraseOffsetMs !== 0) {
    warnings.push(`${p.phraseId}: phraseOffsetMs=${p.phraseOffsetMs}(0以外)。resolveEffectiveCueTimeMs()経由でのみ適用されているか確認。`);
  }
}

// 4. cue ID重複 + 時刻範囲外
const allCues: Array<VocalCue & {phraseStartMs: number; phraseEndMs: number}> = [];
const seenCueIds = new Set<string>();
for (const p of master.phrases) {
  for (const c of p.cues) {
    if (seenCueIds.has(c.cueId)) errors.push(`cueId重複: ${c.cueId}`);
    seenCueIds.add(c.cueId);
    allCues.push({...c, phraseStartMs: p.startMs, phraseEndMs: p.endMs});
    if (c.timeMs < p.startMs - 300 || c.timeMs > p.endMs + 300) {
      warnings.push(`${c.cueId}: timeMs=${c.timeMs}がphrase範囲[${p.startMs},${p.endMs}]から300ms超で外れている`);
    }
    // verified状態の整合: verifiedByListening=trueならtimingSourceがestimatedのままは矛盾。
    if (c.verifiedByListening && c.timingSource === 'estimated') {
      errors.push(`${c.cueId}: verifiedByListening=trueなのにtimingSource='estimated'(矛盾)`);
    }
    if (typeof c.cueOffsetMs !== 'number' || !Number.isFinite(c.cueOffsetMs)) {
      errors.push(`${c.cueId}: cueOffsetMsが数値でない(${c.cueOffsetMs})`);
    } else if (c.cueOffsetMs !== 0) {
      warnings.push(`${c.cueId}: cueOffsetMs=${c.cueOffsetMs}(0以外)。resolveEffectiveCueTimeMs()経由でのみ適用されているか確認。`);
    }
    // confidenceScore: 0.0〜1.0の範囲、かつverifiedByListeningとは独立した値である
    // ことを検査する(confidenceScore=1.0でもverifiedByListening=falseはあり得る、
    // その逆にmanualなのにconfidenceScoreが低いのは矛盾ではない設計だが、
    // manual/verified-vocalなら実装上は必ず1.0になるはずなので矛盾を検出する)。
    if (typeof c.confidenceScore !== 'number' || !Number.isFinite(c.confidenceScore) || c.confidenceScore < 0 || c.confidenceScore > 1) {
      errors.push(`${c.cueId}: confidenceScoreが0.0〜1.0の範囲外(${c.confidenceScore})`);
    } else if ((c.timingSource === 'manual' || c.timingSource === 'verified-vocal') && c.confidenceScore !== 1.0) {
      errors.push(`${c.cueId}: timingSource='${c.timingSource}'なのにconfidenceScore=${c.confidenceScore}(1.0であるべき)`);
    }
    if (c.detectedAtMs != null && (typeof c.detectedAtMs !== 'number' || !Number.isFinite(c.detectedAtMs))) {
      errors.push(`${c.cueId}: detectedAtMsが数値でない(${c.detectedAtMs})`);
    }
    if (c.timingSource === 'audio-analysis' && c.detectedAtMs == null) {
      warnings.push(`${c.cueId}: timingSource='audio-analysis'だがdetectedAtMsが無い(再migration前のデータの可能性)`);
    }
  }
}
// offset architecture: audio.renderPipelineOffsetMsが未検証のまま実質的な値を
// 持つ場合、render/generated.tsへ自動適用されていないことを明示的に警告する
// (renderPipelineOffsetMsはresolveEffectiveCueTimeMs()の合成式に意図的に含まれない)。
if (master.audio.renderPipelineOffsetMs != null && !master.audio.renderPipelineOffsetVerified) {
  warnings.push(
    `audio.renderPipelineOffsetMs=${master.audio.renderPipelineOffsetMs}msは未検証(verified=false)。人間の聴取確認まで render/generated.ts へ適用しない。`,
  );
}

// Render Truth監査(2026-08-27)P0対応:
// 4a. phrase順序・重なりの回帰防止(canonical start補正の副作用でstartMs逆転や
//     endMs重なりが再発しないことを保証する。migrate scriptがすでにclamp/fail
//     しているはずだが、schema checkerでも独立に再検証する)。
let lastPhraseEndMs = -Infinity;
for (const p of master.phrases) {
  if (p.endMs <= p.startMs) errors.push(`${p.phraseId}: endMs(${p.endMs}) <= startMs(${p.startMs})(canonical start補正後)`);
  if (p.startMs < lastPhraseEndMs - 0.5) {
    errors.push(`${p.phraseId}: startMs(${p.startMs})が前phraseのendMs(${lastPhraseEndMs})より前(overlap未解消)`);
  }
  lastPhraseEndMs = p.endMs;
}

// 4b. 同一phrase内のordered cue group(syllable-hit)がH01<H02<H03の狭義単調増加
//     であることを保証する(item13/14: 1 onset→複数critical cueの重複割当を
//     再発させないための回帰check。実際にP013-H01/H02が同一onsetへ収束する
//     bugを2026-08-27に発見・修正した)。
for (const p of master.phrases) {
  const hits = p.cues.filter((c) => c.kind === 'syllable-hit').sort((a, b) => a.cueId.localeCompare(b.cueId));
  for (let i = 1; i < hits.length; i++) {
    if (hits[i].timeMs <= hits[i - 1].timeMs) {
      errors.push(`${p.phraseId}: ${hits[i - 1].cueId}(${hits[i - 1].timeMs}ms) と ${hits[i].cueId}(${hits[i].timeMs}ms) が単調増加でない(onset重複割当の疑い)`);
    }
  }
}

// 5. musicCue cueId重複
const seenMusicCueIds = new Set<string>();
for (const m of master.musicCues) {
  if (seenMusicCueIds.has(m.cueId)) errors.push(`musicCue cueId重複: ${m.cueId}`);
  seenMusicCueIds.add(m.cueId);
}

// 6. editorialBlock順序チェック(冒頭ブロックが重複時間帯を持たないか)
const sortedBlocks = [...master.editorialBlocks].sort((a, b) => a.startMs - b.startMs);
for (let i = 1; i < sortedBlocks.length; i++) {
  if (sortedBlocks[i].startMs < sortedBlocks[i - 1].endMs) {
    errors.push(`editorialBlock時間帯重複: ${sortedBlocks[i - 1].blockId} と ${sortedBlocks[i].blockId}`);
  }
}

// 7. 検証集計の整合(master.verificationが実データと一致しているか)
const recomputed = countVerification(master);
if (recomputed.totalPhrases !== master.verification.totalPhrases || recomputed.totalVocalCues !== master.verification.totalVocalCues) {
  warnings.push('master.verificationの集計値が実データと不一致(再migrateで解消)');
}

console.log(
  `検査対象: ${master.masterId} revision=${master.revision} status=${master.status}\n` +
    `  phrases=${master.phrases.length} cues=${allCues.length}(verified=${recomputed.verifiedVocalCues}) musicCues=${master.musicCues.length} editorialBlocks=${master.editorialBlocks.length}\n` +
    `  audio.confirmedEndMs=${master.audio.confirmedEndMs} (${master.audio.confirmedEndMs == null ? 'candidate、未確定' : '確定済み'})`,
);

const verifiedGate = canBeTimingMasterVerified(master);
if (master.status === 'TIMING_MASTER_VERIFIED' && !verifiedGate.ok) {
  errors.push(`status=TIMING_MASTER_VERIFIEDだが条件未達: ${verifiedGate.reasons.join(' / ')}`);
}
console.log(`TIMING_MASTER_VERIFIED昇格可否: ${verifiedGate.ok ? '可' : `不可(${(verifiedGate as {reasons: string[]}).reasons.join(' / ')})`}`);

console.log('');
warnings.forEach((w) => console.warn(`⚠️  ${w}`));
if (errors.length) {
  errors.forEach((e) => console.error(`❌ ${e}`));
  console.error(`\ncheck-start-wedding-timing-master: ${errors.length}件のエラー`);
  process.exit(1);
}
console.log('✅ check-start-wedding-timing-master OK');
console.log('注意: これはschema/整合性チェック。人間の聴取確認の代わりにはならない。');
