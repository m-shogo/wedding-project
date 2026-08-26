// 回帰テスト: offset architecture(global/phrase/cue)が二重適用されないことを
// 実データに対して検証する。
//
// 検証対象: resolveEffectiveCueTimeMs()を経由するsync-start-wedding-timing-master.mts
// の出力(generated.ts)が、以下の式どおりに1回だけoffsetを合成しているか。
//
//   effectiveSourceMs = cue.timeMs
//                      + master.audio.globalContentOffsetMs
//                      + phrase.phraseOffsetMs
//                      + cue.cueOffsetMs
//   accentSec (generated.ts) = (effectiveSourceMs - sourceStartMs) / 1000
//
// 手順:
//   1. 現在のmasterをbackup
//   2. word-accent cueを1件選び、cueOffsetMs/phraseOffsetMsへ既知の値を書き込む
//      (globalContentOffsetMsは既存値のまま。触ると全体に影響するため変更しない)
//   3. sync-start-wedding-timing-master.mts を実行してgenerated.tsを再生成
//   4. generated.tsを実際にimportし、対象wordのaccentSecが期待値と一致するか確認
//      (期待値と実際値の差が二重適用の有無を明確に示す: 二重適用ならcueOffsetMs分
//      またはphraseOffsetMs分だけさらにズレる)
//   5. master・generated.tsを元の状態へ必ず復元する(成功/失敗を問わず)

import {execFileSync} from 'node:child_process';
import {existsSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import type {TimingMaster} from '../src/data/startWeddingEdit/timingMaster.ts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const masterPath = join(studioRoot, 'local/start-wedding-timing-master.local.json');
const generatedPath = join(studioRoot, 'src/data/startWeddingEdit/generated.ts');

if (!existsSync(masterPath)) {
  console.error('❌ masterが無い。テスト不可。');
  process.exit(1);
}
if (!existsSync(generatedPath)) {
  console.error('❌ generated.tsが無い(実データ)。テスト不可。');
  process.exit(1);
}

const originalMasterRaw = readFileSync(masterPath, 'utf8');
const originalGeneratedRaw = readFileSync(generatedPath, 'utf8');
let restored = false;
const restore = () => {
  if (restored) return;
  writeFileSync(masterPath, originalMasterRaw);
  writeFileSync(generatedPath, originalGeneratedRaw);
  restored = true;
  console.log('[test] masterとgenerated.tsを元の状態へ復元しました。');
};
process.on('exit', restore);
process.on('SIGINT', () => {
  restore();
  process.exit(1);
});

try {
  const master = JSON.parse(originalMasterRaw) as TimingMaster;
  const targetPhrase = master.phrases.find((p) => p.cues.some((c) => c.kind === 'word-accent'));
  if (!targetPhrase) throw new Error('word-accent cueを持つphraseが無い');
  const targetCue = targetPhrase.cues.find((c) => c.kind === 'word-accent')!;

  const testPhraseOffsetMs = 222;
  const testCueOffsetMs = 111;
  const originalTimeMs = targetCue.timeMs;
  const {sourceStartMs, globalContentOffsetMs} = master.audio;

  const expectedEffectiveMs = originalTimeMs + globalContentOffsetMs + testPhraseOffsetMs + testCueOffsetMs;
  const expectedAccentSec = (expectedEffectiveMs - sourceStartMs) / 1000;

  targetPhrase.phraseOffsetMs = testPhraseOffsetMs;
  targetCue.cueOffsetMs = testCueOffsetMs;
  writeFileSync(masterPath, JSON.stringify(master, null, 2) + '\n');
  console.log(
    `[test] ${targetPhrase.phraseId}.phraseOffsetMs=${testPhraseOffsetMs}, ${targetCue.cueId}.cueOffsetMs=${testCueOffsetMs} を一時的に設定しました。` +
      ` 期待accentSec=${expectedAccentSec}`,
  );

  execFileSync('node', ['--no-warnings', 'scripts/sync-start-wedding-timing-master.mts'], {
    cwd: studioRoot,
    stdio: 'inherit',
  });

  // generated.tsを実際にimportして検証する(regexパースではなく、実際にconsumerが
  // 読む値そのものを見る)。cache-bustのためquery paramを付与する。
  const generatedModule = (await import(`../src/data/startWeddingEdit/generated.ts?t=${Date.now()}`)) as {
    weddingEditLyricPhrases: Array<{
      phraseId: string;
      importantWords: Array<{word: string; accentSec: number}>;
    }>;
  };
  const afterPhrase = generatedModule.weddingEditLyricPhrases.find((p) => p.phraseId === targetPhrase.phraseId);
  if (!afterPhrase) throw new Error(`generated.tsに${targetPhrase.phraseId}が見つからない`);
  const afterWord = afterPhrase.importantWords.find((w) => w.word === targetCue.text);
  if (!afterWord) throw new Error(`generated.tsに${targetCue.text}(${targetCue.cueId})が見つからない`);

  const diffMs = Math.round((afterWord.accentSec - expectedAccentSec) * 1000);
  const ok = Math.abs(diffMs) < 1; // 浮動小数点誤差1ms未満は許容

  console.log(`  期待accentSec=${expectedAccentSec} 実際accentSec=${afterWord.accentSec} 差分=${diffMs}ms`);
  if (ok) {
    console.log('✅ offset composition regression test: PASS(global+phrase+cue offsetが1回だけ正しく合成された)');
  } else {
    // 二重適用が起きている場合の典型例を示す(診断の助けにするため)
    const doubledPhraseAndCue = (originalTimeMs + globalContentOffsetMs + testPhraseOffsetMs * 2 + testCueOffsetMs * 2 - sourceStartMs) / 1000;
    console.error('❌ offset composition regression test: FAIL(offsetが二重適用されたか、正しく合成されていない)');
    console.error(`   参考: phraseOffsetMs/cueOffsetMsが2重適用された場合の想定値=${doubledPhraseAndCue}`);
    process.exitCode = 1;
  }
} finally {
  restore();
}
