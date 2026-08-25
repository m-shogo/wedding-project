// StaRt Wedding Edit: 実歌詞phraseを歌声timingに合わせて表示するcomponent。
//
// 「歌詞スロットNN」「32分割均等表示」は廃止(旧Start129仕様)。
// ここではlocalLyricsWeddingEdit.LyricPhraseの実際のstartSec/endSec/rhythmType/
// semanticType/emphasisWord/threeHitFrameSecsに応じて、既存の
// lyricAnimationFamilies.tsxのfamilyを使い分ける。
//
// timingの精度についての注記: 各行のstartSec/endSecはffmpeg解析による
// section区切り推定 + 行内文字数比例配分であり、音節単位で実測したものではない
// (docs/decisions/2026-08-25-start-wedding-edit-scope-change.md参照)。

import React from 'react';
import {AbsoluteFill, Sequence, interpolate, useCurrentFrame} from 'remotion';
import type {LyricPhrase} from '../../data/startWeddingEdit/localLyricsWeddingEdit';
import {START_WEDDING_EDIT_FPS} from '../../data/startWeddingEdit/sections';
import {CharacterBuild, HeldNoteStretch, QuestionPause, WhisperReveal} from '../start129/lyricAnimationFamilies';
import {HandDrawnUnderline} from '../start129/handDrawnPrimitives';

export type WeddingVariant = 'A' | 'B' | 'C';

const secToFrame = (s: number) => Math.round(s * START_WEDDING_EDIT_FPS);

const VARIANT_STYLE: Record<WeddingVariant, {color: string; accent: string; fontWeight: number; align: 'left' | 'center'}> = {
  A: {color: '#FDFBF5', accent: '#F4C95D', fontWeight: 500, align: 'center'},
  B: {color: '#FFFDF7', accent: '#F4C95D', fontWeight: 900, align: 'left'},
  C: {color: '#0A0A0C', accent: '#0A0A0C', fontWeight: 700, align: 'left'},
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
  // Remotion<Sequence>は既定でabsolute-fillラップされ親のtext-align/位置指定から
  // 外れてしまうため(実際に左上へ飛ぶ表示崩れを確認済み)、ここではネストSequenceを使わず
  // 現在frameを直接比較して出し分ける。

  return (
    <>
      <ThreeHitStagePop hitFrames={hitFrames} texts={[unit, unit.repeat(2), unit.repeat(3)]} color={style.accent} />
      {/* 3-hit後の言葉(晴れた町に/雨の心)はサビの持続音なのでHeld Note Stretchで
          文字間・線幅が伸びるように見せる(3回叩いた後の言葉なので単純な文字送りより伸びやかにする) */}
      <HeldNoteStretch text={rest} startFrame={restStartFrame} holdFrames={18} fontSize={variant === 'B' ? 56 : 48} color={style.color} />
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

/** サビの着地句(「僕は探すんだ」等)。ライブラリのImpactWordは短いflash用の
 * decay curveを持つため、phraseの長い持続時間(4秒前後)に対しては早く消えてしまう。
 * ここではphrase durationに比例したhold(fade in→保持→Sequence終了で自然に切れる)にする。 */
const ImpactWordHold: React.FC<{text: string; durFrames: number; fontSize: number; color: string}> = ({
  text,
  durFrames,
  fontSize,
  color,
}) => {
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

const WeddingLyricBody: React.FC<{phrase: LyricPhrase; variant: WeddingVariant}> = ({phrase, variant}) => {
  const style = VARIANT_STYLE[variant];
  const durFrames = Math.max(1, secToFrame(phrase.endSec) - secToFrame(phrase.startSec));

  if (phrase.threeHitFrameSecs) {
    return <ThreeHitLine phrase={phrase} variant={variant} />;
  }

  if (phrase.text === '僕は探すんだ' || phrase.text === '明日も唄うんだ') {
    return <ImpactWordHold text={phrase.text} durFrames={durFrames} fontSize={variant === 'B' ? 100 : 78} color={style.color} />;
  }

  if (phrase.text.includes('？') || phrase.text.includes('?')) {
    return <QuestionPause text={phrase.text} startFrame={0} pauseFrame={Math.round(durFrames * 0.7)} fontSize={44} />;
  }

  if (phrase.semanticType === 'loneliness') {
    // 「静けさと1対1」等、内省的な行は薄く静かに現れるWhisper Revealにする
    return <WhisperReveal text={phrase.text} startFrame={0} fontSize={variant === 'B' ? 40 : 32} color={style.color} />;
  }

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
};

/** A案: 中央下寄せ、静かなfade主体 */
const WeddingLyricA: React.FC<{phrase: LyricPhrase}> = ({phrase}) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 110, pointerEvents: 'none'}}>
      <div style={{opacity: o, textAlign: 'center', textShadow: '0 2px 18px rgba(0,0,0,0.55)'}}>
        <WeddingLyricBody phrase={phrase} variant="A" />
      </div>
    </AbsoluteFill>
  );
};

/** B案: 左下、手描きunderline+背景shape付き */
const WeddingLyricB: React.FC<{phrase: LyricPhrase}> = ({phrase}) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, 5], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'flex-start', padding: '0 0 96px 90px', pointerEvents: 'none'}}>
      <div style={{opacity: o}}>
        <div style={{background: 'rgba(18,16,13,0.42)', borderLeft: '5px solid #F4C95D', padding: '10px 22px', borderRadius: 4}}>
          <WeddingLyricBody phrase={phrase} variant="B" />
        </div>
        <div style={{marginTop: 4, marginLeft: 22}}>
          <HandDrawnUnderline progressFrom={4} progressDurationInFrames={14} width={260} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** C案: baseline-scan、editorial左寄せ */
const WeddingLyricC: React.FC<{phrase: LyricPhrase}> = ({phrase}) => {
  const frame = useCurrentFrame();
  const w = interpolate(frame, [0, 10], [0, 300], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'flex-start', padding: '0 0 100px 90px', pointerEvents: 'none'}}>
      <div style={{background: 'rgba(242,239,232,0.88)', padding: '10px 20px', borderRadius: 2}}>
        <WeddingLyricBody phrase={phrase} variant="C" />
        <div style={{height: 2, width: w, background: '#0A0A0C', marginTop: 8}} />
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
          <Sequence key={p.phraseId} from={from} durationInFrames={dur} name={`lyric-${p.phraseId}`}>
            <Comp phrase={p} />
          </Sequence>
        );
      })}
    </>
  );
};
