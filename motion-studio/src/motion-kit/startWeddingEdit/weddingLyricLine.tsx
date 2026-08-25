// StaRt Wedding Edit: 実歌詞phraseを歌声timingに合わせて表示するcomponent。
//
// 「歌詞スロットNN」「32分割均等表示」は廃止(旧Start129仕様)。
// Phase2(2026-08-26)以降は、各phraseのselectedAnimation(phrase-map.local.json→
// lyrics-wedding-edit.local.json→generated.tsへ統合済み)を正本として明示dispatchする。
// 文字数比例配分・text正規表現によるアニメーション推測は廃止した。
//
// timingの精度についての注記: startSec/endSecはPalmier Pro on-device beat detection
// (3-hit等の主要点)+ ffmpeg構造解析(区間境界)の組み合わせによる推定であり、
// 人間の聴取による最終確認はしていない(humanReviewRequired=true)。

import React from 'react';
import {AbsoluteFill, Sequence, interpolate, useCurrentFrame} from 'remotion';
import type {LyricPhrase} from '../../data/startWeddingEdit/localLyricsWeddingEdit';
import {START_WEDDING_EDIT_FPS} from '../../data/startWeddingEdit/sections';
import {
  CharacterBuild,
  HeldNoteStretch,
  QuestionPause,
  RepetitionEcho,
  SplitConflict,
  WhisperReveal,
  WordHit,
} from '../start129/lyricAnimationFamilies';
import {HandDrawnUnderline} from '../start129/handDrawnPrimitives';
import {BaselineTravel, ChorusBurstFlash, ForegroundReveal, TypeMaskText} from './weddingLyricFamiliesV2';

export type WeddingVariant = 'A' | 'B' | 'C';

const secToFrame = (s: number) => Math.round(s * START_WEDDING_EDIT_FPS);

const VARIANT_STYLE: Record<WeddingVariant, {color: string; accent: string; fontWeight: number}> = {
  A: {color: '#FDFBF5', accent: '#F4C95D', fontWeight: 500},
  B: {color: '#FFFDF7', accent: '#F4C95D', fontWeight: 900},
  C: {color: '#0A0A0C', accent: '#0A0A0C', fontWeight: 700},
};

/** 3-hit onomatopoeia(パッパッパッ/チャプチャプチャプ)の描画。3回のhitで積み上がる。 */
const ThreeHitLine: React.FC<{phrase: LyricPhrase; variant: WeddingVariant}> = ({phrase, variant}) => {
  const style = VARIANT_STYLE[variant];
  const startFrame = secToFrame(phrase.startSec);
  const hitFrames = (phrase.threeHitFrameSecs ?? [phrase.startSec, phrase.startSec + 0.3, phrase.startSec + 0.6]).map(
    (s) => secToFrame(s) - startFrame,
  ) as [number, number, number];
  const unitMatch = phrase.text.match(/^((?:パッ|チャプ){3})　(.+)$/);
  const unit = unitMatch ? unitMatch[1].slice(0, 2) : '・';
  const rest = unitMatch ? unitMatch[2] : phrase.text;
  const restStartFrame = hitFrames[2] + 6;

  return (
    <>
      <ThreeHitStagePop hitFrames={hitFrames} texts={[unit, unit.repeat(2), unit.repeat(3)]} color={style.accent} />
      {/* 3-hit後の言葉(晴れた町に/雨の心)はサビの持続音なのでHeld Note Stretchで
          文字間・線幅が伸びるように見せる(3回叩いた後の言葉なので単純な文字送りより伸びやかにする) */}
      <HeldNoteStretch text={rest} startFrame={restStartFrame} holdFrames={18} fontSize={variant === 'B' ? 56 : 48} color={style.color} />
      {/* Chorus Burst: 3打目で画面全体に一瞬光が開く(B案は強め、A/Cは控えめ) */}
      <ChorusBurstFlash hitFrame={hitFrames[2]} color={variant === 'B' ? '#FFF6D8' : '#FFFFFF'} />
    </>
  );
};

/** 3回のhitで同じ場所の文字がパッ→パッパッ→パッパッパッと置き換わりながらpopする(積み重ねない) */
const ThreeHitStagePop: React.FC<{hitFrames: [number, number, number]; texts: [string, string, string]; color: string}> = ({
  hitFrames,
  texts,
  color,
}) => {
  const frame = useCurrentFrame();
  let stageIndex = -1;
  for (let i = 0; i < hitFrames.length; i++) {
    if (frame >= hitFrames[i]) stageIndex = i;
  }
  if (stageIndex < 0) return null;
  const local = frame - hitFrames[stageIndex];
  const s = interpolate(local, [0, 3, 8], [1.35, 1.1, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <span
      style={{
        fontFamily: "'Noto Sans JP', sans-serif",
        fontSize: 64,
        fontWeight: 900,
        color,
        display: 'inline-block',
        transform: `scale(${s})`,
      }}
    >
      {texts[stageIndex]}
    </span>
  );
};

/** サビの着地句(「僕は探すんだ」等)。長い持続時間phraseに対してhold型で表示する。 */
const ImpactWordHold: React.FC<{text: string; fontSize: number; color: string}> = ({text, fontSize, color}) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const s = interpolate(frame, [0, 10, 18], [0.6, 1.12, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <span
      style={{
        fontFamily: "'Noto Sans JP', sans-serif",
        fontSize,
        fontWeight: 900,
        color,
        opacity: o,
        transform: `scale(${s})`,
        display: 'inline-block',
      }}
    >
      {text}
    </span>
  );
};

/** Split Conflict用: 「もう　苦悩と煩と悩は上等！」を意味の切れ目で2分割する */
const splitPhraseForConflict = (text: string): {left: string; right: string} => {
  const idx = text.indexOf('は上等');
  if (idx > 0) return {left: text.slice(0, idx), right: text.slice(idx)};
  const mid = Math.floor(text.length / 2);
  return {left: text.slice(0, mid), right: text.slice(mid)};
};

/** Repetition Echo用: 反復語(お手を拝借等)を検出して分離する */
const REPEATED_PHRASES = ['お手を拝借', 'スタート'];
const extractRepeatedWord = (text: string): string | null => {
  for (const w of REPEATED_PHRASES) {
    if (text.includes(w)) return w;
  }
  return null;
};

const WeddingLyricBody: React.FC<{phrase: LyricPhrase; variant: WeddingVariant}> = ({phrase, variant}) => {
  const style = VARIANT_STYLE[variant];
  const durFrames = Math.max(1, secToFrame(phrase.endSec) - secToFrame(phrase.startSec));
  const anim = phrase.selectedAnimation ?? 'character-build';

  switch (anim) {
    case 'three-hit-build':
      return <ThreeHitLine phrase={phrase} variant={variant} />;

    case 'impact-word':
      return <ImpactWordHold text={phrase.text} fontSize={variant === 'B' ? 100 : 78} color={style.color} />;

    case 'question-pause':
      return (
        <QuestionPause
          text={phrase.text}
          startFrame={0}
          pauseFrame={Math.round(durFrames * 0.7)}
          fontSize={44}
          color={style.color}
        />
      );

    case 'word-hit':
      return (
        <WordHit
          word={{text: phrase.text, hitFrame: Math.round(durFrames * 0.15)}}
          fontSize={variant === 'B' ? 54 : 42}
          color={style.color}
        />
      );

    case 'whisper-reveal':
      return <WhisperReveal text={phrase.text} startFrame={0} fontSize={variant === 'B' ? 40 : 32} color={style.color} />;

    case 'held-note-stretch':
      return (
        <HeldNoteStretch
          text={phrase.text}
          startFrame={Math.round(durFrames * 0.1)}
          holdFrames={Math.max(14, Math.round(durFrames * 0.5))}
          fontSize={variant === 'B' ? 50 : 40}
          color={style.color}
        />
      );

    case 'split-conflict': {
      const {left, right} = splitPhraseForConflict(phrase.text);
      return <SplitConflict left={left} right={right} startFrame={0} fontSize={variant === 'B' ? 44 : 36} />;
    }

    case 'repetition-echo': {
      const word = extractRepeatedWord(phrase.text) ?? phrase.text.slice(0, 4);
      const rest = phrase.text.replace(word, '');
      return (
        <div style={{position: 'relative'}}>
          <RepetitionEcho text={word} occurrences={[0, 8, 16]} fontSize={variant === 'B' ? 46 : 36} />
          <div style={{marginTop: 44}}>
            <CharacterBuild
              text={rest}
              charFrames={Array.from(rest).map((_, i) => 20 + i * 2)}
              fontSize={variant === 'B' ? 40 : 32}
              color={style.color}
            />
          </div>
        </div>
      );
    }

    case 'baseline-travel':
      return <BaselineTravel text={phrase.text} color={style.color} fontSize={variant === 'B' ? 48 : 40} />;

    case 'foreground-reveal':
      return <ForegroundReveal text={phrase.text} color={style.color} fontSize={variant === 'B' ? 50 : 42} />;

    case 'type-mask':
      return <TypeMaskText text={phrase.text} fontSize={variant === 'B' ? 66 : 58} />;

    case 'character-build':
    default: {
      const chars = Array.from(phrase.text);
      const perCharStep = Math.max(2, Math.floor((durFrames * 0.7) / Math.max(1, chars.length)));
      return (
        <CharacterBuild
          text={phrase.text}
          charFrames={chars.map((_, i) => i * perCharStep)}
          fontSize={variant === 'B' ? 52 : variant === 'C' ? 40 : 44}
          color={style.color}
        />
      );
    }
  }
};

/** animation familyごとに画面内の置き場所を変える(常に下帯に固定しない)。 */
type Placement = {justifyContent: React.CSSProperties['justifyContent']; alignItems: React.CSSProperties['alignItems']; padding: string};

const placementFor = (anim: string | undefined): Placement => {
  switch (anim) {
    case 'type-mask':
    case 'split-conflict':
      return {justifyContent: 'center', alignItems: 'center', padding: '0'};
    case 'three-hit-build':
      return {justifyContent: 'center', alignItems: 'center', padding: '0 0 60px 0'};
    case 'question-pause':
      return {justifyContent: 'flex-start', alignItems: 'center', padding: '140px 0 0 0'};
    case 'whisper-reveal':
      return {justifyContent: 'center', alignItems: 'flex-end', padding: '0 90px 160px 0'};
    case 'baseline-travel':
    case 'foreground-reveal':
      return {justifyContent: 'flex-end', alignItems: 'flex-start', padding: '0 0 140px 90px'};
    default:
      return {justifyContent: 'flex-end', alignItems: 'flex-start', padding: '0 0 96px 90px'};
  }
};

/** A案: 映画タイトル的な余白と静けさ。placementで位置を可変にする */
const WeddingLyricA: React.FC<{phrase: LyricPhrase}> = ({phrase}) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const p = placementFor(phrase.selectedAnimation);
  const centered = p.justifyContent === 'center';
  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: p.justifyContent,
        alignItems: centered ? 'center' : p.alignItems,
        padding: p.padding,
        pointerEvents: 'none',
      }}
    >
      <div style={{opacity: o, textAlign: centered ? 'center' : 'left', textShadow: '0 2px 18px rgba(0,0,0,0.55)'}}>
        <WeddingLyricBody phrase={phrase} variant="A" />
      </div>
    </AbsoluteFill>
  );
};

/** B案: 手描きunderline+背景shape付き。placementで位置を可変にする */
const WeddingLyricB: React.FC<{phrase: LyricPhrase}> = ({phrase}) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, 5], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const p = placementFor(phrase.selectedAnimation);
  const skipCard = phrase.selectedAnimation === 'type-mask' || phrase.selectedAnimation === 'three-hit-build';
  return (
    <AbsoluteFill
      style={{display: 'flex', flexDirection: 'column', justifyContent: p.justifyContent, alignItems: p.alignItems, padding: p.padding, pointerEvents: 'none'}}
    >
      <div style={{opacity: o}}>
        {skipCard ? (
          <WeddingLyricBody phrase={phrase} variant="B" />
        ) : (
          <>
            <div style={{background: 'rgba(18,16,13,0.42)', borderLeft: '5px solid #F4C95D', padding: '10px 22px', borderRadius: 4}}>
              <WeddingLyricBody phrase={phrase} variant="B" />
            </div>
            <div style={{marginTop: 4, marginLeft: 22}}>
              <HandDrawnUnderline progressFrom={4} progressDurationInFrames={14} width={260} />
            </div>
          </>
        )}
      </div>
    </AbsoluteFill>
  );
};

/** C案: editorial。明背景なので必ず暗文字+背景カードでcontrastを保証する */
const WeddingLyricC: React.FC<{phrase: LyricPhrase}> = ({phrase}) => {
  const frame = useCurrentFrame();
  const w = interpolate(frame, [0, 10], [0, 300], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const p = placementFor(phrase.selectedAnimation);
  const showBaseline = phrase.selectedAnimation !== 'type-mask' && phrase.selectedAnimation !== 'three-hit-build';
  return (
    <AbsoluteFill
      style={{display: 'flex', flexDirection: 'column', justifyContent: p.justifyContent, alignItems: p.alignItems, padding: p.padding, pointerEvents: 'none'}}
    >
      <div style={{background: 'rgba(242,239,232,0.9)', padding: '10px 20px', borderRadius: 2}}>
        <WeddingLyricBody phrase={phrase} variant="C" />
        {showBaseline ? <div style={{height: 2, width: w, background: '#0A0A0C', marginTop: 8}} /> : null}
      </div>
    </AbsoluteFill>
  );
};

const VARIANT_COMPONENT: Record<WeddingVariant, React.FC<{phrase: LyricPhrase}>> = {
  A: WeddingLyricA,
  B: WeddingLyricB,
  C: WeddingLyricC,
};

/** 30phrase全体を、それぞれ絶対frame位置のSequenceとして並べる */
export const WeddingLyricTrack: React.FC<{phrases: LyricPhrase[]; variant: WeddingVariant}> = ({phrases, variant}) => {
  const Comp = VARIANT_COMPONENT[variant];
  return (
    <>
      {phrases.map((p) => {
        const from = secToFrame(p.startSec);
        const dur = Math.max(1, secToFrame(p.endSec) - from);
        return (
          <Sequence key={p.phraseId} from={from} durationInFrames={dur} name={`lyric-${p.phraseId}:${p.selectedAnimation}`}>
            <Comp phrase={p} />
          </Sequence>
        );
      })}
    </>
  );
};
