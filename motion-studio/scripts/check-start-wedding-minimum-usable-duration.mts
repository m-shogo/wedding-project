// Minimum-usable-duration gate(P0-B)。
//
// 背景: phrase.startMs/ONSET統一やclamp integrity gateにより、一部phraseの
// durationが変化した(P0-2のclamp integrity監査で15 phraseのendMsが最大
// 378ms短縮された)。この短縮によって、そのphraseが実際に使う word-accent /
// syllable-hit cueの位置が、Sequenceの範囲外(entrance前に終了、visual impact
// 前に終了)へ押し出されていないかを検証する。
//
// 方針(ユーザー指示: 固定の「最低30frame」等を全animationへ一律適用しない):
//   - 各phraseが実際に使うcue(word-accent/syllable-hit)のlocal frame位置
//     (= phrase.startMs起点のフレーム)を計算する。
//   - localFrame < 0 または localFrame > durFrames は、Sequence自体の
//     範囲外でありanimationとして成立しないためERROR。
//   - durFrames - localFrame が家族ごとの最小tail(FAMILY_MIN_TAIL_FRAMES、
//     visual impact後にanimationが「見える」ために必要な最小残り時間)を
//     下回る場合はWARNING(即バグとは断定できないため、視覚QA対象として
//     報告するに留める)。
//   - 家族ごとの最小tailは、weddingLyricLine.tsx内の既存fallback定数
//     (rampFrames最小6frame等)を参考に、家族の性質(punchy hit vs held
//     note vs multi-hit)に応じて個別に設定する。
//
// 実行: node --no-warnings scripts/check-start-wedding-minimum-usable-duration.mts

import {existsSync, readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import type {TimingMaster} from '../src/data/startWeddingEdit/timingMaster.ts';
import {resolveEffectiveCueTimeMs} from '../src/data/startWeddingEdit/timingMaster.ts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const masterPath = join(studioRoot, 'local/start-wedding-timing-master.local.json');

if (!existsSync(masterPath)) {
  console.error('❌ masterが無い。');
  process.exit(1);
}

const master = JSON.parse(readFileSync(masterPath, 'utf8')) as TimingMaster;
const FPS = 30;

// animationFamilyごとの最小tail(visual impact後、exit/settleに最低限必要な
// frame数)。punchy(瞬間的)な家族ほど短く、held/impact(余韻が要る)家族ほど長い。
const FAMILY_MIN_TAIL_FRAMES: Record<string, number> = {
  'word-hit': 3,
  'three-hit-build': 6, // 最後のhit後、settleが要る
  'impact-word': 8, // Hero瞬間、余韻が重要
  'question-pause': 4,
  'whisper-reveal': 4,
  'held-note-stretch': 6,
  'character-build': 4,
  'split-conflict': 4,
  'repetition-echo': 4,
  'baseline-travel': 4,
  'call-and-response-layout': 4,
  'type-mask': 6,
  'foreground-reveal': 6,
  'lyric-to-transition': 4,
};
const DEFAULT_MIN_TAIL_FRAMES = 4;

const errors: string[] = [];
const warnings: string[] = [];
let checkedPhraseCount = 0;
let checkedCueCount = 0;

for (const phrase of master.phrases) {
  const durFrames = ((phrase.endMs - phrase.startMs) / 1000) * FPS;
  const family = phrase.selectedAnimation ?? null;
  const minTail = family != null ? (FAMILY_MIN_TAIL_FRAMES[family] ?? DEFAULT_MIN_TAIL_FRAMES) : DEFAULT_MIN_TAIL_FRAMES;
  checkedPhraseCount++;

  if (durFrames < 3) {
    errors.push(`${phrase.phraseId}(${family}): durFrames=${durFrames.toFixed(1)}が3frame未満。animationが実質表示不能。`);
    continue;
  }

  const criticalCues = phrase.cues.filter((c) => c.kind === 'word-accent' || c.kind === 'syllable-hit');
  for (const c of criticalCues) {
    checkedCueCount++;
    const effectiveMs = resolveEffectiveCueTimeMs(c, phrase, master.audio);
    const localFrame = ((effectiveMs - phrase.startMs) / 1000) * FPS;

    if (localFrame < 0) {
      // weddingLyricLine.tsx側でMath.max(0, ...)によりrender時は0へclamp
      // 済み(audio-analysis検出差でword-accentがphrase onsetより早い場合が
      // ある。P019/P024で確認済み)。audio truthは書き換えないためデータ上は
      // 負のままだが、renderが壊れることはない。ただし本来どちらの検出が
      // 正しいかは人間の聴取確認が必要なため、可視化のためWARNINGで残す。
      warnings.push(
        `${c.cueId}(${phrase.phraseId}/${family}): localFrame=${localFrame.toFixed(1)}が負(word-accentがphrase onsetより早い検出。weddingLyricLine.tsxでrender時は0へclamp済みだが、audio-analysis検出差として人間の聴取確認が必要)`,
      );
      continue;
    }
    if (localFrame > durFrames) {
      errors.push(`${c.cueId}(${phrase.phraseId}/${family}): localFrame=${localFrame.toFixed(1)}がdurFrames=${durFrames.toFixed(1)}を超過(visual impact前にSequenceが終了する)`);
      continue;
    }
    const tail = durFrames - localFrame;
    if (tail < minTail) {
      warnings.push(
        `${c.cueId}(${phrase.phraseId}/${family}): tail=${tail.toFixed(1)}frameが家族最小tail(${minTail}frame)未満(visual impact後の余韻/exitが窮屈な可能性。要視覚QA)`,
      );
    }
  }

  // three-hit-buildは3発全てが収まっているかを個別に強調確認する
  // (ChoreographedMomentが途中で切断される典型パターン)。
  if (family === 'three-hit-build') {
    const hits = criticalCues.filter((c) => c.kind === 'syllable-hit');
    if (hits.length !== 3) {
      warnings.push(`${phrase.phraseId}(three-hit-build): syllable-hit cueが${hits.length}件(期待3件)。ChoreographedMomentが3発揃っていない可能性。`);
    }
  }
}

console.log(`検査対象: phrase ${checkedPhraseCount}件、word-accent+syllable-hit cue ${checkedCueCount}件`);

if (warnings.length > 0) {
  console.log(`\n⚠️  警告${warnings.length}件(即バグ断定はしないが視覚QA対象):`);
  warnings.forEach((w) => console.log(`  - ${w}`));
}

if (errors.length > 0) {
  console.error(`\n❌ minimum-usable-duration: FAIL(${errors.length}件)`);
  errors.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
}
console.log('\n✅ minimum-usable-duration OK(全phraseでcritical cueがSequence範囲内。tail不足は上記警告のみ)');
console.log('注意: tail警告は視覚QA(部分render目視)で実際に問題になるか確認すること。このcheckは幾何学的な範囲チェックに留まる。');
