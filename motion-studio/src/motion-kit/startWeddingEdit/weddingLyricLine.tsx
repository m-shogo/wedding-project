// StaRt Wedding Edit: 実歌詞phraseを歌声timingに合わせて表示するcomponent。
//
// 「歌詞スロットNN」「32分割均等表示」は廃止(旧Start129仕様)。
// Phase2(2026-08-26)以降は、各phraseのselectedAnimation(phrase-map.local.json→
// lyrics-wedding-edit.local.json→generated.tsへ統合済み)を正本として明示dispatchする。
// 文字数比例配分・text正規表現によるアニメーション推測は廃止した。
//
// v3(2026-08-26): word-accent-map由来のimportantWords(実accentSec)を
// generated.ts(EnrichedLyricPhrase)経由で受け取り、WordHit/QuestionPause/
// LyricToTransition/CallAndResponseLayout/CharacterBuildの固定フラクション
// (durFrames*0.15等)を実accent由来のlocal frameへ置き換えた。
// importantWordsが無いphraseだけ、明示的なfallback定数を使い、
// phrase.mapStatusとは別にfallbackUsedフラグをGuide overlay用に露出する。
//
// timingの精度についての注記: startSec/endSecはPalmier Pro on-device beat detection
// (3-hit等の主要点)+ ffmpeg構造解析(区間境界)の組み合わせによる推定であり、
// 人間の聴取による最終確認はしていない(humanReviewRequired=true)。

import React from 'react';
import {AbsoluteFill, Sequence, interpolate, useCurrentFrame} from 'remotion';
import type {EnrichedLyricPhrase} from '../../data/startWeddingEdit/generated';
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
import {
  BaselineTravel,
  CallAndResponseLayout,
  ChorusBurstFlash,
  ForegroundReveal,
  LyricToTransitionText,
  LyricToTransitionWipe,
  TypeMaskText,
  WordSequenceBuild,
} from './weddingLyricFamiliesV2';

export type WeddingVariant = 'A' | 'B' | 'C';

const secToFrame = (s: number) => Math.round(s * START_WEDDING_EDIT_FPS);

const VARIANT_STYLE: Record<WeddingVariant, {color: string; accent: string; fontWeight: number}> = {
  A: {color: '#FDFBF5', accent: '#F4C95D', fontWeight: 500},
  B: {color: '#FFFDF7', accent: '#F4C95D', fontWeight: 900},
  C: {color: '#0A0A0C', accent: '#0A0A0C', fontWeight: 700},
};

/** 現在このphraseがfallback(実accent不在)を使って描画されているかどうか。
 * Guide overlayが読む可能性があるため、windowグローバルではなくmoduleスコープの
 * 単純なmapとして最後の状態を保持する(1phrase=1Sequenceなので競合しない)。 */
export const weddingLyricFallbackByPhraseId = new Map<string, boolean>();

/** importantWordsをlocal frame配列に変換する。1件も無ければnullを返しfallbackを促す。 */
const wordsToLocalFrames = (phrase: EnrichedLyricPhrase): {words: string[]; frames: number[]} | null => {
  if (!phrase.importantWords || phrase.importantWords.length === 0) return null;
  const startFrame = secToFrame(phrase.startSec);
  return {
    words: phrase.importantWords.map((w) => w.word),
    frames: phrase.importantWords.map((w) => secToFrame(w.accentSec) - startFrame),
  };
};

/** 単一accentだけ欲しい呼び出し用。無ければnull。 */
const firstWordFrame = (phrase: EnrichedLyricPhrase): number | null => {
  const w = phrase.importantWords?.[0];
  if (!w) return null;
  return secToFrame(w.accentSec) - secToFrame(phrase.startSec);
};

/** 3-hit onomatopoeia(パッパッパッ/チャプチャプチャプ)の描画。3回のhitで積み上がる。 */
const ThreeHitLine: React.FC<{phrase: EnrichedLyricPhrase; variant: WeddingVariant}> = ({phrase, variant}) => {
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

/** サビの着地句(「僕は探すんだ」等)。P015=探索の始まり(控えめ)、P030=全体最大のHero(圧倒的)にする。 */
const ImpactWordHold: React.FC<{text: string; fontSize: number; color: string; hero: boolean; accentColor: string}> = ({
  text,
  fontSize,
  color,
  hero,
  accentColor,
}) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const s = hero
    ? interpolate(frame, [0, 14, 26], [0.4, 1.35, 1.18], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
    : interpolate(frame, [0, 10, 18], [0.6, 1.12, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const glow = hero ? interpolate(frame, [0, 16, 40], [0, 0.55, 0.25], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) : 0;
  return (
    <div style={{position: 'relative'}}>
      {hero ? (
        <AbsoluteFill
          style={{
            background: `radial-gradient(ellipse at center, ${accentColor}55 0%, rgba(0,0,0,0) 65%)`,
            opacity: glow,
            pointerEvents: 'none',
          }}
        />
      ) : null}
      <span
        style={{
          fontFamily: "'Noto Sans JP', sans-serif",
          fontSize: hero ? fontSize * 1.25 : fontSize,
          fontWeight: 900,
          color,
          opacity: o,
          transform: `scale(${s})`,
          display: 'inline-block',
          textShadow: hero ? `0 0 34px ${accentColor}99` : undefined,
        }}
      >
        {text}
      </span>
    </div>
  );
};

/** Split Conflict用: 「もう　苦悩と煩と悩は上等！」を意味の切れ目で2分割する(fallback用) */
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

/** P026「スタートに戻ろう」用: 冒頭Sモチーフ(短い横線+丸)を呼び戻す小さな残像。 */
const StartMotifCallback: React.FC<{color: string}> = ({color}) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [0, 8, 20], [0, 0.8, 0.5], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const w = interpolate(f, [0, 10], [0, 46], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 6, opacity: o, marginBottom: 6}}>
      <div style={{width: 10, height: 10, borderRadius: 5, border: `2px solid ${color}`}} />
      <div style={{height: 2, width: w, background: color}} />
    </div>
  );
};

const WeddingLyricBody: React.FC<{phrase: EnrichedLyricPhrase; variant: WeddingVariant}> = ({phrase, variant}) => {
  const style = VARIANT_STYLE[variant];
  const durFrames = Math.max(1, secToFrame(phrase.endSec) - secToFrame(phrase.startSec));
  const anim = phrase.selectedAnimation ?? 'character-build';
  const wordData = wordsToLocalFrames(phrase);
  const single = firstWordFrame(phrase);

  switch (anim) {
    case 'three-hit-build':
      return <ThreeHitLine phrase={phrase} variant={variant} />;

    case 'impact-word': {
      // P030(2回目の「僕は探すんだ」)は曲全体最大のHero瞬間。P015は探索の始まりとして控えめにする。
      const hero = phrase.phraseId === 'P030';
      weddingLyricFallbackByPhraseId.set(phrase.phraseId, false);
      return (
        <ImpactWordHold
          text={phrase.text}
          fontSize={variant === 'B' ? (hero ? 118 : 100) : hero ? 96 : 78}
          color={style.color}
          hero={hero}
          accentColor={style.accent}
        />
      );
    }

    case 'question-pause': {
      // P010/P021/P023: 実accentSec(気づけるか/ナニヶ原/イイでしょう)をpauseFrameとして使う。
      const fallback = single === null;
      weddingLyricFallbackByPhraseId.set(phrase.phraseId, fallback);
      const pauseFrame = single ?? Math.round(durFrames * 0.7);
      return (
        <QuestionPause text={phrase.text} startFrame={0} pauseFrame={Math.max(2, pauseFrame)} fontSize={44} color={style.color} />
      );
    }

    case 'word-hit': {
      // P011(さあ/試されよう)は2語なのでWordSequenceBuildで別々のaccentへ着地させる。
      // P026(スタートに戻ろう)は単発accent+冒頭Sモチーフ回想を追加する。
      if (wordData && wordData.words.length >= 2) {
        weddingLyricFallbackByPhraseId.set(phrase.phraseId, false);
        return <WordSequenceBuild words={wordData.words} frames={wordData.frames} color={style.color} fontSize={variant === 'B' ? 54 : 42} />;
      }
      const fallback = single === null;
      weddingLyricFallbackByPhraseId.set(phrase.phraseId, fallback);
      const hitFrame = single ?? Math.round(durFrames * 0.15);
      return (
        <div>
          {phrase.phraseId === 'P026' ? <StartMotifCallback color={style.color} /> : null}
          <WordHit word={{text: phrase.text, hitFrame}} fontSize={variant === 'B' ? 54 : 42} color={style.color} />
        </div>
      );
    }

    case 'whisper-reveal': {
      // P006「ラララララ」は静かなwhisperではなく弾む遊び心が要求されているため専用表示にする。
      if (phrase.phraseId === 'P006' && wordData) {
        weddingLyricFallbackByPhraseId.set(phrase.phraseId, false);
        const laLaHit = wordData.frames[0];
        return <BouncyLaLa hitFrame={laLaHit} restText={phrase.text.replace('ラララララ♪', '').trim()} color={style.color} variant={variant} />;
      }
      weddingLyricFallbackByPhraseId.set(phrase.phraseId, false);
      return <WhisperReveal text={phrase.text} startFrame={0} fontSize={variant === 'B' ? 40 : 32} color={style.color} />;
    }

    case 'held-note-stretch': {
      // P004(武装/創/造/登場)は4段階の意味変化(武装→創→造→登場で完成)が要求されているため、
      // 単一のHeldNoteStretchではなくWordSequenceBuildで実accentごとに別語として出す。
      if (phrase.phraseId === 'P004' && wordData && wordData.words.length >= 4) {
        weddingLyricFallbackByPhraseId.set(phrase.phraseId, false);
        return (
          <WordSequenceBuild
            words={wordData.words}
            frames={wordData.frames}
            color={style.color}
            fontSize={variant === 'B' ? 46 : 38}
            finalWordScaleUp
          />
        );
      }
      weddingLyricFallbackByPhraseId.set(phrase.phraseId, false);
      return (
        <HeldNoteStretch
          text={phrase.text}
          startFrame={Math.round(durFrames * 0.1)}
          holdFrames={Math.max(14, Math.round(durFrames * 0.5))}
          fontSize={variant === 'B' ? 50 : 40}
          color={style.color}
        />
      );
    }

    case 'split-conflict': {
      // P019(苦悩/煩/悩/上等)は4段階の衝突→上等での解決として表示する。
      if (phrase.phraseId === 'P019' && wordData && wordData.words.length >= 4) {
        weddingLyricFallbackByPhraseId.set(phrase.phraseId, false);
        return <ConflictCollideResolve words={wordData.words} frames={wordData.frames} color={style.color} accentColor={style.accent} variant={variant} />;
      }
      weddingLyricFallbackByPhraseId.set(phrase.phraseId, true);
      const {left, right} = splitPhraseForConflict(phrase.text);
      return <SplitConflict left={left} right={right} startFrame={0} fontSize={variant === 'B' ? 44 : 36} color={style.color} />;
    }

    case 'repetition-echo': {
      weddingLyricFallbackByPhraseId.set(phrase.phraseId, false);
      const word = extractRepeatedWord(phrase.text) ?? phrase.text.slice(0, 4);
      const rest = phrase.text.replace(word, '');
      return (
        <div style={{position: 'relative'}}>
          <RepetitionEcho text={word} occurrences={[0, 8, 16]} fontSize={variant === 'B' ? 46 : 36} color={style.color} />
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

    case 'baseline-travel': {
      // P001(やっとこさ/幕開けだ)を2つの別accentとして表示し、2語目で画面が開く印象を足す。
      const fallback = !wordData;
      weddingLyricFallbackByPhraseId.set(phrase.phraseId, fallback);
      const words = wordData?.words ?? [phrase.text];
      const frames = wordData?.frames ?? [0];
      return <BaselineTravel words={words} frames={frames} color={style.color} fontSize={variant === 'B' ? 48 : 40} />;
    }

    case 'foreground-reveal': {
      // P014(独りじゃない)。実accentは単発だが、以降のP029のスプリット→マージへ繋がる前段として表示する。
      weddingLyricFallbackByPhraseId.set(phrase.phraseId, single === null);
      return <ForegroundReveal text={phrase.text} color={style.color} fontSize={variant === 'B' ? 50 : 42} />;
    }

    case 'type-mask': {
      // P029「貴方を」はaccentSec=106.56sでshowcase momentにする(scale-up+glow pulse)。
      const showcaseFrame = single;
      weddingLyricFallbackByPhraseId.set(phrase.phraseId, showcaseFrame === null);
      return (
        <TypeMaskText
          text={phrase.text}
          variant={variant}
          fontSize={variant === 'B' ? 66 : 58}
          emphasisFrame={showcaseFrame ?? undefined}
        />
      );
    }

    case 'call-and-response-layout': {
      // 「ほら　寄って集って！　お手を拝借！」を呼びかけ/応答の2段に分割し、
      // 実accentSec(寄って集って/お手を拝借)をそれぞれのhit frameに使う(固定16frame廃止)。
      const idx = phrase.text.indexOf('お手を拝借');
      const call = idx > 0 ? phrase.text.slice(0, idx) : phrase.text;
      const response = idx > 0 ? phrase.text.slice(idx) : '';
      const callFrame = wordData?.frames[0] ?? 0;
      const responseFrame = wordData?.frames[1] ?? 16;
      weddingLyricFallbackByPhraseId.set(phrase.phraseId, !wordData || wordData.frames.length < 2);
      return (
        <CallAndResponseLayout
          call={call}
          response={response}
          callFrame={callFrame}
          responseFrame={responseFrame}
          color={style.color}
          variant={variant}
          fontSize={variant === 'B' ? 46 : 38}
        />
      );
    }

    case 'lyric-to-transition': {
      // 重要な訂正: P018「スタート合図」のimportantWords accentSec(67.66s)は
      // phrase開始(67.55s)直後、つまり"アクセントが来る場所"であって"退場する場所"ではない。
      // 退場(exit/wipe開始)にはphrase.exitSec(phrase-map/transition-map由来の実データ、
      // 通常phrase終盤)を使う。両者を混同すると、文字が現れた直後に即wipeしてしまう
      // (実際にレンダーして確認した不具合)。exitSec自体が無い場合だけ0.75 fallbackにする。
      const exitFrame =
        phrase.exitSec != null ? secToFrame(phrase.exitSec) - secToFrame(phrase.startSec) : Math.round(durFrames * 0.75);
      weddingLyricFallbackByPhraseId.set(phrase.phraseId, phrase.exitSec == null);
      return <LyricToTransitionText text={phrase.text} color={style.color} fontSize={variant === 'B' ? 48 : 40} exitFrame={exitFrame} />;
    }

    case 'character-build':
    default: {
      weddingLyricFallbackByPhraseId.set(phrase.phraseId, false);
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

/** P006用: ラララララを弾む/回転するplayfulな動きで表示する(WhisperRevealの静けさとは別実装)。 */
const BouncyLaLa: React.FC<{hitFrame: number; restText: string; color: string; variant: WeddingVariant}> = ({
  hitFrame,
  restText,
  color,
  variant,
}) => {
  const f = useCurrentFrame();
  const restO = interpolate(f, [0, 10], [0, 0.85], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const chars = Array.from('ラララララ');
  return (
    <div>
      <div style={{fontFamily: "'Noto Sans JP', sans-serif", fontSize: variant === 'B' ? 34 : 28, fontWeight: 400, color, opacity: restO}}>
        {restText}
      </div>
      <div style={{display: 'flex', marginTop: 4}}>
        {chars.map((ch, i) => {
          const local = f - (hitFrame + i * 3);
          const bounce = interpolate(local, [0, 5, 10, 15], [0, -18, 0, -6], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          const rot = interpolate(local, [0, 10], [0, i % 2 === 0 ? 8 : -8], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          const o = interpolate(local, [0, 4], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          if (o <= 0.001) return null;
          return (
            <span
              key={i}
              style={{
                fontFamily: "'Noto Sans JP', sans-serif",
                fontSize: variant === 'B' ? 46 : 38,
                fontWeight: 800,
                color,
                opacity: o,
                display: 'inline-block',
                transform: `translateY(${bounce}px) rotate(${rot}deg)`,
              }}
            >
              {ch}
            </span>
          );
        })}
      </div>
    </div>
  );
};

/** P019用: 苦悩/煩/悩が衝突し、上等で画面が再整列して解決する。 */
const ConflictCollideResolve: React.FC<{
  words: string[];
  frames: number[];
  color: string;
  accentColor: string;
  variant: WeddingVariant;
}> = ({words, frames, color, accentColor, variant}) => {
  const f = useCurrentFrame();
  const resolveFrame = frames[3] ?? frames[frames.length - 1];
  const resolved = f >= resolveFrame;
  const shake = !resolved
    ? interpolate(f, [frames[0], resolveFrame], [0, 6], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) *
      Math.sin(f * 2.4)
    : 0;
  return (
    <div style={{position: 'relative'}}>
      <div style={{display: 'flex', gap: 14, transform: `translateX(${shake}px)`}}>
        {words.slice(0, 3).map((w, i) => {
          const local = f - frames[i];
          const dir = i === 0 ? -1 : i === 1 ? 0 : 1;
          const dx = interpolate(local, [0, 14], [dir * 60, dir * 14], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          const o = interpolate(local, [0, 6], [0, resolved ? 0.25 : 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          if (o <= 0.001) return null;
          return (
            <span
              key={i}
              style={{
                fontFamily: "'Noto Sans JP', sans-serif",
                fontSize: variant === 'B' ? 40 : 34,
                fontWeight: 700,
                color,
                opacity: o,
                transform: `translateX(${dx}px)`,
                display: 'inline-block',
              }}
            >
              {w}
            </span>
          );
        })}
      </div>
      {(() => {
        const local = f - resolveFrame;
        const o = interpolate(local, [0, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        const s = interpolate(local, [0, 8, 16], [0.6, 1.25, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        if (o <= 0.001) return null;
        return (
          <div
            style={{
              marginTop: 10,
              fontFamily: "'Noto Sans JP', sans-serif",
              fontSize: variant === 'B' ? 58 : 48,
              fontWeight: 900,
              color: accentColor,
              opacity: o,
              transform: `scale(${s})`,
            }}
          >
            {words[3]}
          </div>
        );
      })()}
    </div>
  );
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

/** lyric-to-transitionのwipeは小さいplacement divの外、AbsoluteFillの直接の子として描画する必要がある。 */
const TransitionWipeLayer: React.FC<{phrase: EnrichedLyricPhrase; variant: WeddingVariant}> = ({phrase, variant}) => {
  if (phrase.selectedAnimation !== 'lyric-to-transition') return null;
  const style = VARIANT_STYLE[variant];
  const durFrames = Math.max(1, secToFrame(phrase.endSec) - secToFrame(phrase.startSec));
  // LyricToTransitionText側と同じexitSec基準を使う(accentSecと混同しない)。
  const exitFrame =
    phrase.exitSec != null ? secToFrame(phrase.exitSec) - secToFrame(phrase.startSec) : Math.round(durFrames * 0.75);
  const wipeColor = variant === 'C' ? '#0A0A0C' : variant === 'B' ? style.accent : '#FFFDF7';
  return <LyricToTransitionWipe exitFrame={exitFrame} color={wipeColor} variant={variant} />;
};

/** A案: 映画タイトル的な余白と静けさ。placementで位置を可変にする */
const WeddingLyricA: React.FC<{phrase: EnrichedLyricPhrase}> = ({phrase}) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const p = placementFor(phrase.selectedAnimation);
  const centered = p.justifyContent === 'center';
  return (
    <>
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
      <TransitionWipeLayer phrase={phrase} variant="A" />
    </>
  );
};

/** B案: 手描きunderline+背景shape付き。placementで位置を可変にする */
const WeddingLyricB: React.FC<{phrase: EnrichedLyricPhrase}> = ({phrase}) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, 5], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const p = placementFor(phrase.selectedAnimation);
  const skipCard = phrase.selectedAnimation === 'type-mask' || phrase.selectedAnimation === 'three-hit-build';
  return (
    <>
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
      <TransitionWipeLayer phrase={phrase} variant="B" />
    </>
  );
};

/** C案: editorial。明背景なので必ず暗文字+背景カードでcontrastを保証する */
const WeddingLyricC: React.FC<{phrase: EnrichedLyricPhrase}> = ({phrase}) => {
  const frame = useCurrentFrame();
  const w = interpolate(frame, [0, 10], [0, 300], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const p = placementFor(phrase.selectedAnimation);
  const showBaseline = phrase.selectedAnimation !== 'type-mask' && phrase.selectedAnimation !== 'three-hit-build';
  return (
    <>
      <AbsoluteFill
        style={{display: 'flex', flexDirection: 'column', justifyContent: p.justifyContent, alignItems: p.alignItems, padding: p.padding, pointerEvents: 'none'}}
      >
        <div style={{background: 'rgba(242,239,232,0.9)', padding: '10px 20px', borderRadius: 2}}>
          <WeddingLyricBody phrase={phrase} variant="C" />
          {showBaseline ? <div style={{height: 2, width: w, background: '#0A0A0C', marginTop: 8}} /> : null}
        </div>
      </AbsoluteFill>
      <TransitionWipeLayer phrase={phrase} variant="C" />
    </>
  );
};

const VARIANT_COMPONENT: Record<WeddingVariant, React.FC<{phrase: EnrichedLyricPhrase}>> = {
  A: WeddingLyricA,
  B: WeddingLyricB,
  C: WeddingLyricC,
};

/** 30phrase全体を、それぞれ絶対frame位置のSequenceとして並べる */
export const WeddingLyricTrack: React.FC<{phrases: EnrichedLyricPhrase[]; variant: WeddingVariant}> = ({phrases, variant}) => {
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
