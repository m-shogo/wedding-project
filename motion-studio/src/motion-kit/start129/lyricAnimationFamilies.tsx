// 歌詞animation family(音楽主導版のための再利用部品)。
//
// 重要な前提: 正規歌詞・正規音源が未投入のため(docs/decisions/2026-08-25-
// start-129-music-driven-blocker.md)、ここではtimingを「frame数」という
// 抽象値で受け取るだけで、実際の歌詞本文・実際のbeatとは一切結び付けていない。
// 音源投入後、phrase-map.local.json / accent-map.local.json から
// 実際の秒数を渡せば、そのまま音楽主導の演出として機能する設計にしてある。
//
// 「実装済み」の意味: 各familyのvisual mechanicsが動くことをstillで確認済み。
// 「音楽と同期している」という意味では**ない**(音源が無いため検証不可能)。

import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';

const JP = "'Noto Sans JP', sans-serif";

export type WordTiming = {
  text: string;
  /** このwordが着地するframe(音源投入後はbeat/vocal attackへ合わせる) */
  hitFrame: number;
};

const baseTextStyle = (size: number, color: string, weight: number): React.CSSProperties => ({
  fontFamily: JP,
  fontSize: size,
  fontWeight: weight,
  color,
  whiteSpace: 'pre',
});

/** 1. Character Build: 1文字ずつ組み上がる。文字ごとにhitFrameを個別指定する。 */
export const CharacterBuild: React.FC<{
  text: string;
  charFrames: number[]; // 文字ごとの出現frame(text.lengthと同じ長さ)
  fontSize?: number;
  color?: string;
}> = ({text, charFrames, fontSize = 72, color = '#FDFBF5'}) => {
  const f = useCurrentFrame();
  const chars = Array.from(text);
  return (
    <span style={{display: 'inline-flex'}}>
      {chars.map((ch, i) => {
        const hit = charFrames[i] ?? charFrames[charFrames.length - 1] + i * 4;
        const local = f - hit;
        const o = interpolate(local, [0, 5], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        const y = interpolate(local, [0, 6], [22, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        const s = interpolate(local, [0, 3, 8], [1.4, 1.15, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        return (
          <span
            key={i}
            style={{
              ...baseTextStyle(fontSize, color, 800),
              opacity: o,
              transform: `translateY(${y}px) scale(${s})`,
              display: 'inline-block',
            }}
          >
            {ch}
          </span>
        );
      })}
    </span>
  );
};

/** 2. Word Hit: 単語単位でbeatへ着地する。 */
export const WordHit: React.FC<{word: WordTiming; fontSize?: number; color?: string}> = ({
  word,
  fontSize = 56,
  color = '#FDFBF5',
}) => {
  const f = useCurrentFrame();
  const local = f - word.hitFrame;
  const s = interpolate(local, [-4, 0, 3, 10], [0.6, 1.22, 1.02, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const o = interpolate(local, [-4, 0], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <span style={{...baseTextStyle(fontSize, color, 800), opacity: o, transform: `scale(${s})`, display: 'inline-block'}}>
      {word.text}
    </span>
  );
};

/** 3. Three-Hit Build: 3音でelementが1段階ずつ完成する。呼び出し側で3つのvisual要素を渡す。 */
export const ThreeHitBuild: React.FC<{
  hitFrames: [number, number, number];
  stages: [React.ReactNode, React.ReactNode, React.ReactNode];
}> = ({hitFrames, stages}) => {
  const f = useCurrentFrame();
  return (
    <>
      {stages.map((node, i) => {
        const local = f - hitFrames[i];
        const o = interpolate(local, [-2, 0], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        const s = interpolate(local, [-2, 0, 4], [0.7, 1.2, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        if (o <= 0.001) return null;
        return (
          <div key={i} style={{opacity: o, transform: `scale(${s})`}}>
            {node}
          </div>
        );
      })}
    </>
  );
};

/** 4. Held Note Stretch: 伸ばす音に合わせて文字間・線幅が伸びる。 */
export const HeldNoteStretch: React.FC<{
  text: string;
  startFrame: number;
  holdFrames: number;
  fontSize?: number;
  color?: string;
}> = ({text, startFrame, holdFrames, fontSize = 60, color = '#FDFBF5'}) => {
  const f = useCurrentFrame();
  const local = f - startFrame;
  const tracking = interpolate(local, [0, holdFrames], [0.02, 0.5], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const o = interpolate(local, [0, 6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const lineW = interpolate(local, [0, holdFrames], [0, 220], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div style={{opacity: o}}>
      <span style={{...baseTextStyle(fontSize, color, 400), letterSpacing: `${tracking}em`}}>{text}</span>
      <div style={{height: 2, width: lineW, background: color, opacity: 0.6, marginTop: 8}} />
    </div>
  );
};

/** 5. Whisper Reveal: 小さい声で薄く静かに現れる。
 * rampFrames(既定24): fade-in+blur解消にかける時間。P024(0.86秒=26frame)のように
 * phrase自体が短い場合、既定の24frameだと表示時間の9割以上が「まだ薄い/ぼやけている」
 * 状態のまま終わってしまい、実質読めないままphraseが終わる不具合があった。
 * 呼び出し側でdurFrames(phraseの全長)に応じて短縮したrampFramesを渡すことで、
 * 短いphraseでも表示時間の大半を「読める状態」にする。 */
export const WhisperReveal: React.FC<{text: string; startFrame: number; fontSize?: number; color?: string; rampFrames?: number}> = ({
  text,
  startFrame,
  fontSize = 30,
  color = '#FDFBF5',
  rampFrames = 24,
}) => {
  const f = useCurrentFrame();
  const local = f - startFrame;
  const o = interpolate(local, [0, rampFrames], [0, 0.55], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const blur = interpolate(local, [0, rampFrames], [6, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <span style={{...baseTextStyle(fontSize, color, 300), opacity: o, filter: `blur(${blur}px)`}}>{text}</span>
  );
};

/** 6. Impact Word: 強調語だけ大きく短く出る。 */
export const ImpactWord: React.FC<{text: string; hitFrame: number; fontSize?: number; color?: string}> = ({
  text,
  hitFrame,
  fontSize = 110,
  color = '#FDFBF5',
}) => {
  const f = useCurrentFrame();
  const local = f - hitFrame;
  const o = interpolate(local, [-2, 0, 14, 20], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const s = interpolate(local, [-2, 0, 5], [0.5, 1.15, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  if (o <= 0.001) return null;
  return (
    <span style={{...baseTextStyle(fontSize, color, 900), opacity: o, transform: `scale(${s})`, display: 'inline-block'}}>
      {text}
    </span>
  );
};

/** 7. Split Conflict: 葛藤を表すphraseで文字が左右へ分離する。 */
export const SplitConflict: React.FC<{
  left: string;
  right: string;
  startFrame: number;
  fontSize?: number;
  color?: string;
}> = ({left, right, startFrame, fontSize = 48, color = '#FDFBF5'}) => {
  const f = useCurrentFrame();
  const local = f - startFrame;
  const dx = interpolate(local, [0, 20], [0, 90], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const o = interpolate(local, [0, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div style={{display: 'flex', gap: 4, opacity: o}}>
      <span style={{...baseTextStyle(fontSize, color, 600), transform: `translateX(${-dx}px)`}}>{left}</span>
      <span style={{...baseTextStyle(fontSize, color, 600), transform: `translateX(${dx}px)`}}>{right}</span>
    </div>
  );
};

/** 8. Question Pause: 疑問のphraseで文字が途中停止し、余白を残す。 */
export const QuestionPause: React.FC<{
  text: string;
  startFrame: number;
  pauseFrame: number;
  fontSize?: number;
  color?: string;
}> = ({text, startFrame, pauseFrame, fontSize = 52, color = '#FDFBF5'}) => {
  const f = useCurrentFrame();
  const chars = Array.from(text);
  const visibleCount = f < pauseFrame ? Math.min(chars.length, Math.floor((f - startFrame) / 3)) : chars.length;
  return (
    <span style={baseTextStyle(fontSize, color, 500)}>
      {chars.slice(0, Math.max(0, visibleCount)).join('')}
      <span style={{opacity: f >= startFrame && f < pauseFrame ? 0.4 : 0}}>_</span>
    </span>
  );
};

/** 9. Repetition Echo: 反復語が奥行き・位置・色を変えて残る。 */
export const RepetitionEcho: React.FC<{text: string; occurrences: number[]; fontSize?: number; color?: string}> = ({
  text,
  occurrences,
  fontSize = 40,
  color = '#FDFBF5',
}) => {
  const f = useCurrentFrame();
  return (
    <>
      {occurrences.map((hitFrame, i) => {
        const local = f - hitFrame;
        const o = interpolate(local, [0, 6, 40], [0, 0.9 - i * 0.15, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        const scale = 1 + i * 0.15;
        if (o <= 0.001) return null;
        return (
          <span
            key={i}
            style={{
              ...baseTextStyle(fontSize, color, 500),
              position: 'absolute',
              opacity: o,
              transform: `scale(${scale}) translateX(${i * 12}px)`,
            }}
          >
            {text}
          </span>
        );
      })}
    </>
  );
};

/** 12. Photo Push: 文字の出現で背景写真をずらす(呼び出し側でtransformへ反映する値を返すhook的component)。 */
export const usePhotoPushOffset = (startFrame: number, durationFrames: number, maxPx: number): number => {
  const f = useCurrentFrame();
  return interpolate(f, [startFrame, startFrame + durationFrames], [0, maxPx], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
};
