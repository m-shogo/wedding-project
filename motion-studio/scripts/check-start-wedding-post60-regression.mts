// Post-60s Regression Gate(ユーザー指示item22対応)。
//
// 背景: 人間が実際にB-clean.mp4を視聴し、約1分(60秒)を超えたあたりから
// 音と映像のズレを明確に感じたことがきっかけで、phrase.startMs/ONSET cue
// 二重正本のroot causeを発見・修正した(2026-08-27)。この修正が再発しない
// ことを機械的に保証するため、60秒以降の代表的なanchor時刻について、
// canonical(TimingMaster)→generated(generated.ts)の変換が一致していることを
// 検証する。
//
// 重要な限界: これはcanonical値とgenerated値の変換一致を見るものであり、
// 「audio onsetが音楽的に正しいか」を判定するものではない(それは人間の
// 聴取確認が必要)。ここで保証するのは「TimingMasterの値が、生成される
// consumer向けデータへ正しく伝播しているか」という、plumbing(配管)の正しさ。

import {existsSync, readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import type {TimingMaster} from '../src/data/startWeddingEdit/timingMaster.ts';
import {resolveEffectiveCueTimeMs} from '../src/data/startWeddingEdit/timingMaster.ts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const masterPath = join(studioRoot, 'local/start-wedding-timing-master.local.json');
const generatedPath = join(studioRoot, 'src/data/startWeddingEdit/generated.ts');

if (!existsSync(masterPath)) {
  console.error('❌ masterが無い。');
  process.exit(1);
}
if (!existsSync(generatedPath)) {
  console.error('❌ generated.tsが無い(実データ)。');
  process.exit(1);
}

const master = JSON.parse(readFileSync(masterPath, 'utf8')) as TimingMaster;
const {sourceStartMs, globalContentOffsetMs} = master.audio;

const ANCHOR_SECONDS = [60, 63, 67.5, 70, 75, 78, 82, 90, 98, 105, 110, 120, 130, 144];
const FRAME_TOLERANCE = 1; // ±1frame(30fpsで約33.3ms)まで許容
const MS_TOLERANCE = (1000 / 30) * FRAME_TOLERANCE;

const errors: string[] = [];

const generatedModule = (await import(`../src/data/startWeddingEdit/generated.ts?t=${Date.now()}`)) as {
  weddingEditLyricPhrases: Array<{phraseId: string; startSec: number; endSec: number}>;
};

for (const anchorSec of ANCHOR_SECONDS) {
  const anchorMs = anchorSec * 1000;
  // このanchor時刻に実際にactiveなphraseを、canonical(master)側から探す。
  const phrase = master.phrases.find((p) => anchorMs >= p.startMs && anchorMs < p.endMs);
  if (!phrase) {
    console.log(`${anchorSec}s: activeなphrase無し(section間の隙間、または音楽的な無音区間の可能性)`);
    continue;
  }
  const generated = generatedModule.weddingEditLyricPhrases.find((p) => p.phraseId === phrase.phraseId);
  if (!generated) {
    errors.push(`${anchorSec}s(${phrase.phraseId}): generated.tsに存在しない`);
    continue;
  }
  // canonical→generatedの変換式は sync-start-wedding-timing-master.mts の
  // toEditSec(absoluteMs) = (absoluteMs + globalContentOffsetMs - sourceStartMs) / 1000
  // をここで独立に再計算し、実際にgenerated.tsへ書き込まれた値と突き合わせる
  // (「同じ式を2箇所に書いている」こと自体は許容するが、結果が一致しなければ
  // どちらかが壊れている証拠になる)。
  const expectedStartSec = (phrase.startMs + globalContentOffsetMs - sourceStartMs) / 1000;
  const expectedEndSec = (phrase.endMs + globalContentOffsetMs - sourceStartMs) / 1000;
  const deltaStartMs = (generated.startSec - expectedStartSec) * 1000;
  const deltaEndMs = (generated.endSec - expectedEndSec) * 1000;
  const status = Math.abs(deltaStartMs) <= MS_TOLERANCE && Math.abs(deltaEndMs) <= MS_TOLERANCE ? 'OK' : 'MISMATCH';
  console.log(
    `${anchorSec}s(${phrase.phraseId}): canonical=[${phrase.startMs},${phrase.endMs}]ms generated=[${generated.startSec.toFixed(4)},${generated.endSec.toFixed(4)}]s deltaStart=${deltaStartMs.toFixed(2)}ms deltaEnd=${deltaEndMs.toFixed(2)}ms ${status}`,
  );
  if (status === 'MISMATCH') {
    errors.push(`${anchorSec}s(${phrase.phraseId}): canonical→generated変換の不一致(deltaStart=${deltaStartMs.toFixed(2)}ms deltaEnd=${deltaEndMs.toFixed(2)}ms、許容=±${MS_TOLERANCE.toFixed(1)}ms)`);
  }
}

// 追加: 60秒以降の全cueについて、resolveEffectiveCueTimeMs()の結果と
// generated.ts側の値(importantWords[].accentSec等)が一致しているかも
// 抜き取り検証する(cue単位のplumbing検証)。
//
// P0-3根本修正(2026-08-27、Render Truth再監査): 以前は`accentSec近傍
// (±500ms)`でcueを検索してPASS判定していたが、500msは同期検査としては
// 広すぎ、かつ「近い別のcueを誤って拾ってPASSしてしまう」リスクがある
// (ユーザー指摘: 禁止事項「近い別cueを500ms windowで拾ってPASS」)。
// generated.ts側のImportantWordへcueIdを伝播させ(sync-start-wedding-
// timing-master.mts側で対応済み)、ここではcueId完全一致で対応するentryを
// 探し、時刻はFRAME_TOLERANCE(±1frame)以内の厳密一致のみ許容する。
let cueMismatches = 0;
for (const p of master.phrases) {
  if (p.startMs < 60000) continue;
  const generated = generatedModule.weddingEditLyricPhrases.find((gp) => gp.phraseId === p.phraseId) as
    | {importantWords?: Array<{cueId: string; word: string; accentSec: number}>}
    | undefined;
  if (!generated?.importantWords) continue;
  for (const c of p.cues) {
    if (c.kind !== 'word-accent') continue;
    const expectedSec = (resolveEffectiveCueTimeMs(c, p, master.audio) - sourceStartMs) / 1000;
    const match = generated.importantWords.find((w) => w.cueId === c.cueId);
    if (!match) {
      cueMismatches++;
      errors.push(`${c.cueId}: generated.tsのimportantWordsにcueId完全一致するentryが無い(cueId propagation漏れ)`);
      continue;
    }
    const deltaMs = Math.abs(match.accentSec - expectedSec) * 1000;
    if (deltaMs > MS_TOLERANCE) {
      cueMismatches++;
      errors.push(`${c.cueId}: cueId一致entryのaccentSec(${match.accentSec.toFixed(4)}s)がcanonical期待値(${expectedSec.toFixed(4)}s)と±${MS_TOLERANCE.toFixed(1)}ms超で不一致(delta=${deltaMs.toFixed(1)}ms)`);
    }
  }
}
console.log(`60秒以降のword-accent cue plumbing検証: ミスマッチ${cueMismatches}件`);

// P0-4追加: syllable-hit(3-hit)cueもthreeHitCueIds経由でcueId厳密照合する
// (word-accentだけでなく、P027/P028等60秒以降のthree-hit-build phraseの
// 3発それぞれについてもcanonical→generatedのplumbingを検証する)。
let hitCueMismatches = 0;
for (const p of master.phrases) {
  if (p.startMs < 60000) continue;
  const hitCues = p.cues.filter((c) => c.kind === 'syllable-hit').sort((a, b) => a.timeMs - b.timeMs);
  if (hitCues.length === 0) continue;
  const generated = generatedModule.weddingEditLyricPhrases.find((gp) => gp.phraseId === p.phraseId) as
    | {threeHitFrameSecs?: number[] | null; threeHitCueIds?: string[] | null}
    | undefined;
  if (!generated?.threeHitCueIds || !generated.threeHitFrameSecs) {
    hitCueMismatches += hitCues.length;
    errors.push(`${p.phraseId}: generated.tsにthreeHitCueIds/threeHitFrameSecsが無い(3-hit cueが${hitCues.length}件あるのに)`);
    continue;
  }
  for (const c of hitCues) {
    const idx = generated.threeHitCueIds.indexOf(c.cueId);
    if (idx === -1) {
      hitCueMismatches++;
      errors.push(`${c.cueId}: generated.tsのthreeHitCueIdsにcueId完全一致するentryが無い(cueId propagation漏れ)`);
      continue;
    }
    const expectedSec = (resolveEffectiveCueTimeMs(c, p, master.audio) - sourceStartMs) / 1000;
    const generatedSec = generated.threeHitFrameSecs[idx];
    const deltaMs = Math.abs(generatedSec - expectedSec) * 1000;
    if (deltaMs > MS_TOLERANCE) {
      hitCueMismatches++;
      errors.push(`${c.cueId}: threeHitFrameSecs[${idx}](${generatedSec.toFixed(4)}s)がcanonical期待値(${expectedSec.toFixed(4)}s)と±${MS_TOLERANCE.toFixed(1)}ms超で不一致(delta=${deltaMs.toFixed(1)}ms)`);
    }
  }
}
console.log(`60秒以降のsyllable-hit cue plumbing検証: ミスマッチ${hitCueMismatches}件`);

if (errors.length > 0) {
  console.error(`\n❌ post60-regression: ${errors.length}件のエラー`);
  errors.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
}
console.log('\n✅ post60-regression OK(60秒以降のcanonical→generated変換が全anchorで±1frame以内)');
console.log('注意: これはplumbing(データ伝播)の正しさの検証。audio onsetの音楽的な正しさは人間の聴取確認が必要。');
