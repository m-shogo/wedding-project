// 回帰テスト: manual/verifiedByListening=trueなcueが、migration再実行で
// 上書きされないことを実データに対して検証する。
//
// 手順:
//   1. 現在のmasterをbackup(このtest専用、_backups/とは別に保持)
//   2. master内の1つのcueをmanual+verifiedByListening=trueへ書き換える
//   3. migrate --apply を再実行する
//   4. そのcueのtimeMs/timingSource/verifiedByListeningが変化していないことを確認
//   5. 元のmaster(step1のbackup)へ必ず復元する(成功/失敗を問わず)
//
// このテストが作った一時的な変更が実データに残らないことを保証する
// (テスト操作で仮のverified状態を残さない、という既知の教訓への対応)。

import {execFileSync} from 'node:child_process';
import {existsSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import type {TimingMaster} from '../src/data/startWeddingEdit/timingMaster.ts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const masterPath = join(studioRoot, 'local/start-wedding-timing-master.local.json');

if (!existsSync(masterPath)) {
  console.error('❌ masterが無い。テスト不可。');
  process.exit(1);
}

const originalRaw = readFileSync(masterPath, 'utf8');
let restored = false;
const restore = () => {
  if (restored) return;
  writeFileSync(masterPath, originalRaw);
  restored = true;
  console.log('[test] masterを元の状態へ復元しました。');
};
process.on('exit', restore);
process.on('SIGINT', () => {
  restore();
  process.exit(1);
});

try {
  const master = JSON.parse(originalRaw) as TimingMaster;
  // 重要: phrase.cues[0]は常にphrase-onset cueであり、そのtimeMsは今や
  // phrase.startMsそのものと同一の正本になった(2026-08-27のRender Truth
  // 修正)。ここへ意図的に大きく異常な値(+12345ms)を書き込むと、phrase.startMs
  // も連動して異常値になり、次phraseとの順序逆転を引き起こして
  // migrate --apply自体がfail()で中止される(これは新しい正しい安全動作であり
  // バグではない)。このtestは「manual/verified値がcue単体として保持される」
  // ことの検証が目的なので、phrase.startMsへ影響しないword-accent cueを
  // 対象に選ぶ(phrase-onset以外)。
  const targetPhrase = master.phrases.find((p) => p.cues.some((c) => c.kind === 'word-accent'));
  if (!targetPhrase) throw new Error('word-accent cueを持つphraseが無い');
  const targetCue = targetPhrase.cues.find((c) => c.kind === 'word-accent')!;
  const originalCueSnapshot = {...targetCue};

  // 意図的に「実際の値とは異なる」manual値へ書き換える(上書きされていないか
  // 明確に分かるようにするため、既存値+12345msという明らかに異常な値にする)。
  const testTimeMs = targetCue.timeMs + 12345;
  targetCue.timeMs = testTimeMs;
  targetCue.timingSource = 'manual';
  targetCue.verifiedByListening = true;
  targetCue.reviewComment = '[TEST-ONLY] manual preservation regression test';
  writeFileSync(masterPath, JSON.stringify(master, null, 2) + '\n');
  console.log(`[test] ${targetCue.cueId}を manual/verified/timeMs=${testTimeMs} へ一時的に書き換えました。`);

  // migrate --apply を実行(backupは_backups/へ別途作られるが、このtestの
  // 検証には影響しない)。
  execFileSync('node', ['--no-warnings', 'scripts/migrate-start-wedding-timing-master.mts', '--apply'], {
    cwd: studioRoot,
    stdio: 'inherit',
  });

  const afterRaw = readFileSync(masterPath, 'utf8');
  const after = JSON.parse(afterRaw) as TimingMaster;
  const afterPhrase = after.phrases.find((p) => p.phraseId === targetPhrase.phraseId);
  const afterCue = afterPhrase?.cues.find((c) => c.cueId === targetCue.cueId);

  if (!afterCue) throw new Error(`migration後に${targetCue.cueId}が見つからない`);

  const checks = [
    ['timeMs', afterCue.timeMs === testTimeMs, `期待=${testTimeMs} 実際=${afterCue.timeMs}`],
    ['timingSource', afterCue.timingSource === 'manual', `期待=manual 実際=${afterCue.timingSource}`],
    ['verifiedByListening', afterCue.verifiedByListening === true, `期待=true 実際=${afterCue.verifiedByListening}`],
  ] as const;

  let allOk = true;
  for (const [field, ok, detail] of checks) {
    console.log(`  ${ok ? '✅' : '❌'} ${field}: ${detail}`);
    if (!ok) allOk = false;
  }

  if (allOk) {
    console.log('✅ manual preservation regression test: PASS(migration再実行後もmanual/verified値が保持された)');
  } else {
    console.error('❌ manual preservation regression test: FAIL(migration再実行でmanual/verified値が上書きされた)');
    process.exitCode = 1;
  }
} finally {
  restore();
  // migrate --apply実行時に作られたテスト用backupを削除はしない(通常の
  // backup運用と同じ扱いにする。ただしmasterの実データ自体はここで
  // 確実に元へ戻している)。
}
