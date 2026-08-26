// ChoreographyEvent: 歌詞(文字)とshot(写真/カメラ)が別々のclockで動いている問題
// (2026-08-25 audit項目7)を解消するための共通データ構造。
//
// これまでのimpactFrames(shotEngine.tsx)は3-hitだけを対象にした部分実装だった。
// ChoreographyEventは、1つの発音/beatの瞬間に対して
//   type(文字) / camera / media(写真) / layout(画面構成) / transition / effect
// を同時に記述する単一のsource of truthとし、複数レイヤーが同じeventを参照して
// 反応することで「歌詞と映像が同じ瞬間に意味を持って動く」ことを保証する。
//
// manual timing優先: eventはEnrichedLyricPhrase.importantWords(word-accent-map由来。
// 人間がDashboardで確定した場合はtimingSource='manual'が最優先される既存の仕組み)
// から直接派生させる。したがって、Dashboardでmarkerを動かせば、このeventを参照する
// 全レイヤー(文字・写真・カメラ・transition)が自動的に追従する。演出コード側の
// 個別修正は不要。
//
// variant別の差分: buildXxxEvents(phrase, variant)がvariantを受け取り、
// intensity/actionの強さをvariantごとに変える(B案は最大強度、A/Cは抑制、など)。

import type {EnrichedLyricPhrase} from './generated';
import {START_WEDDING_EDIT_FPS} from './sections';
import type {WeddingVariant} from './storyboard';

export type ChoreographyIntensity = 1 | 2 | 3 | 4 | 5;
export type ChoreographyAudioCue = 'vocal' | 'beat' | 'impact' | 'silence';
export type ChoreographyTimingSource = 'manual' | 'beat-snap' | 'estimated';

export type TypeAction =
  | {kind: 'none'}
  | {kind: 'char-reveal'}
  | {kind: 'word-punch'}
  | {kind: 'hold'}
  | {kind: 'dissolve-out'};

export type CameraAction =
  | {kind: 'none'}
  | {kind: 'punch'; scale: number}
  | {kind: 'shake'; amountPx: number}
  | {kind: 'settle'}
  | {kind: 'push-open'; toScale: number};

export type MediaAction =
  | {kind: 'none'}
  | {kind: 'panel-collide'; slot: number; fromDir: -1 | 0 | 1}
  | {kind: 'panel-release'}
  | {kind: 'ripple'}
  | {kind: 'shift-vertical'; dyPx: number}
  | {kind: 'merge-to-center'};

export type LayoutAction =
  | {kind: 'none'}
  | {kind: 'split-to-panels'; count: number}
  | {kind: 'panels-to-full'}
  | {kind: 'split-to-merge'};

export type TransitionAction =
  | {kind: 'none'}
  | {kind: 'flash-cut'}
  | {kind: 'wipe-connect'};

export type EffectAction =
  | {kind: 'none'}
  | {kind: 'white-flash'; opacity: number}
  | {kind: 'liquid-mask'};

/** 1つの発音/beatの瞬間に、文字・カメラ・写真・レイアウト・transition・effectを
 * 同時に記述する共通event。時間は絶対秒(sourceStartSec=0基準)で持ち、
 * 各レイヤー側でそのSequenceのlocal frameへ変換して使う。 */
export type ChoreographyEvent = {
  id: string;
  phraseId: string;
  word: string | null;
  timeSec: number;
  audioCueType: ChoreographyAudioCue;
  intensity: ChoreographyIntensity;
  timingSource: ChoreographyTimingSource;
  typeAction: TypeAction;
  cameraAction: CameraAction;
  mediaAction: MediaAction;
  layoutAction: LayoutAction;
  transitionAction: TransitionAction;
  effectAction: EffectAction;
  easing: 'linear' | 'ease-out' | 'ease-in-out';
  durationFrames: number;
};

export const secToFrame = (s: number) => Math.round(s * START_WEDDING_EDIT_FPS);

/** eventの絶対秒を、あるSequenceのlocal frameへ変換する。 */
export const eventLocalFrame = (event: ChoreographyEvent, sequenceStartSec: number): number =>
  secToFrame(event.timeSec) - secToFrame(sequenceStartSec);

/** intensityをvariantで底上げ/抑制する共通ルール。
 * B案(冒険アニメOP/CM文法)は最大強度、A案(記録映画)は抑制、C案(editorial)は中間。 */
const variantIntensityScale = (variant: WeddingVariant): number => (variant === 'B' ? 1 : variant === 'C' ? 0.75 : 0.55);

const clampIntensity = (n: number): ChoreographyIntensity => Math.max(1, Math.min(5, Math.round(n))) as ChoreographyIntensity;

/** importantWordsのtimingSourceをChoreographyTimingSourceへそのまま写す
 * (word-accent-map側の'manual'|'beat-snap'をそのまま尊重する)。 */
const wordTimingSource = (phrase: EnrichedLyricPhrase, idx: number): ChoreographyTimingSource =>
  phrase.importantWords?.[idx]?.timingSource ?? 'estimated';

/** P004「そう　武装と創と造で登場！！！！！」用の4 event。
 * 武装/創/造の3発が異なるpanelへ衝突し、登場で全画面Heroへ開放する。 */
export const buildArmorCreationEvents = (phrase: EnrichedLyricPhrase, variant: WeddingVariant): ChoreographyEvent[] => {
  const words = phrase.importantWords ?? [];
  const scale = variantIntensityScale(variant);
  const dirs: Array<-1 | 0 | 1> = [-1, 0, 1];
  const events: ChoreographyEvent[] = words.slice(0, 3).map((w, i) => ({
    id: `${phrase.phraseId}-panel-${i}`,
    phraseId: phrase.phraseId,
    word: w.word,
    timeSec: w.accentSec,
    audioCueType: 'vocal',
    intensity: clampIntensity(3 * scale + 1),
    timingSource: wordTimingSource(phrase, i),
    typeAction: {kind: 'word-punch'},
    cameraAction: {kind: 'shake', amountPx: 4 * scale},
    mediaAction: {kind: 'panel-collide', slot: i, fromDir: dirs[i]},
    layoutAction: i === 0 ? {kind: 'split-to-panels', count: 3} : {kind: 'none'},
    transitionAction: {kind: 'none'},
    effectAction: {kind: 'white-flash', opacity: 0.18 * scale},
    easing: 'ease-out',
    durationFrames: 10,
  }));
  const finalWord = words[3];
  if (finalWord) {
    events.push({
      id: `${phrase.phraseId}-open`,
      phraseId: phrase.phraseId,
      word: finalWord.word,
      timeSec: finalWord.accentSec,
      audioCueType: 'impact',
      intensity: 5,
      timingSource: wordTimingSource(phrase, 3),
      typeAction: {kind: 'hold'},
      cameraAction: {kind: 'push-open', toScale: 1 + 0.1 * scale},
      mediaAction: {kind: 'panel-release'},
      layoutAction: {kind: 'panels-to-full'},
      transitionAction: {kind: 'flash-cut'},
      effectAction: {kind: 'white-flash', opacity: 0.55 * scale},
      easing: 'ease-out',
      durationFrames: 16,
    });
  }
  return events;
};

/** P013「チャプチャプチャプ　雨の心」用。各発音に個別event、波紋+写真の縦移動、
 * 3発目で次のshotへ実際に繋がるwipe-connectを持たせる。 */
export const buildRippleThreeHitEvents = (phrase: EnrichedLyricPhrase, variant: WeddingVariant): ChoreographyEvent[] => {
  const scale = variantIntensityScale(variant);
  const hitSecs = phrase.threeHitFrameSecs ?? [phrase.startSec, phrase.startSec + 0.32, phrase.startSec + 0.64];
  return hitSecs.map((sec, i) => ({
    id: `${phrase.phraseId}-hit-${i}`,
    phraseId: phrase.phraseId,
    word: 'チャプ',
    timeSec: sec,
    audioCueType: 'impact',
    intensity: clampIntensity((2 + i) * scale + 1),
    timingSource: phrase.importantWords?.[0]?.timingSource ?? 'beat-snap',
    typeAction: {kind: 'word-punch'},
    cameraAction: {kind: 'punch', scale: 1 + (0.02 + i * 0.01) * scale},
    mediaAction: {kind: i < 2 ? 'shift-vertical' : 'ripple', dyPx: (i + 1) * 10 * scale},
    layoutAction: {kind: 'none'},
    transitionAction: i === 2 ? {kind: 'wipe-connect'} : {kind: 'none'},
    effectAction: {kind: 'liquid-mask'},
    easing: 'ease-out',
    durationFrames: i === 2 ? 20 : 10,
  }));
};

/** P014「独りじゃないと否定出来るように」用。分割された写真/文字が「独りじゃない」の
 * accentで1つへ統合される(単なるfadeではなく画面構成の変化で意味を表現)。 */
export const buildSoloUnionEvents = (phrase: EnrichedLyricPhrase, variant: WeddingVariant): ChoreographyEvent[] => {
  const scale = variantIntensityScale(variant);
  const w = phrase.importantWords?.[0];
  const mergeSec = w?.accentSec ?? phrase.startSec + (phrase.endSec - phrase.startSec) * 0.15;
  return [
    {
      id: `${phrase.phraseId}-split`,
      phraseId: phrase.phraseId,
      word: null,
      timeSec: phrase.startSec,
      audioCueType: 'silence',
      intensity: clampIntensity(2 * scale + 1),
      timingSource: 'estimated',
      typeAction: {kind: 'none'},
      cameraAction: {kind: 'none'},
      mediaAction: {kind: 'none'},
      layoutAction: {kind: 'split-to-merge'},
      transitionAction: {kind: 'none'},
      effectAction: {kind: 'none'},
      easing: 'linear',
      durationFrames: 1,
    },
    {
      id: `${phrase.phraseId}-merge`,
      phraseId: phrase.phraseId,
      word: w?.word ?? '独りじゃない',
      timeSec: mergeSec,
      audioCueType: 'vocal',
      intensity: clampIntensity(4 * scale + 1),
      timingSource: wordTimingSource(phrase, 0),
      typeAction: {kind: 'char-reveal'},
      cameraAction: {kind: 'settle'},
      mediaAction: {kind: 'merge-to-center'},
      layoutAction: {kind: 'none'},
      transitionAction: {kind: 'none'},
      effectAction: {kind: 'white-flash', opacity: 0.12 * scale},
      easing: 'ease-in-out',
      durationFrames: 18,
    },
  ];
};
