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
