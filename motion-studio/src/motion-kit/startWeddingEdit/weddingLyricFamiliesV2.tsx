// Phase4追加分の歌詞animation family。
// 既存lyricAnimationFamilies.tsx(start129)にある9種に加えて、
// 写真・図形との一体化を意識した3種+chorus burst effectを実装する。
//
// Baseline Travel / Foreground Reveal / Type Maskは、写真を単なる背景として
// 扱わず、歌詞の意味と直接繋がる形で連動させることを狙いとする。

import React from 'react';
import {AbsoluteFill, interpolate, staticFile, useCurrentFrame} from 'remotion';

const JP = "'Noto Sans JP', sans-serif";

/** 10. Baseline Travel: 横線が画面を横断しながら文字が乗る。線がそのまま次shotのroute/水平線を予告する。 */
export const BaselineTravel: React.FC<{text: string; color: string; fontSize?: number}> = ({
  text,
  color,
  fontSize = 40,
}) => {
  const f = useCurrentFrame();
  const lineW = interpolate(f, [0, 16], [0, 420], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const textO = interpolate(f, [10, 20], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div style={{display: 'inline-block'}}>
      <div style={{height: 2, width: lineW, background: color, opacity: 0.85}} />
      <div
        style={{
          fontFamily: JP,
          fontSize,
          fontWeight: 700,
          color,
          opacity: textO,
          marginTop: 8,
          transform: `translateX(${interpolate(f, [10, 24], [-14, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}px)`,
        }}
      >
        {text}
      </div>
    </div>
  );
};

/** 12. Foreground Reveal: 下から上へclip-pathで持ち上がるように現れる(前景から立ち上がる印象)。 */
export const ForegroundReveal: React.FC<{text: string; color: string; fontSize?: number}> = ({
  text,
  color,
  fontSize = 44,
}) => {
  const f = useCurrentFrame();
  const reveal = interpolate(f, [0, 16], [0, 100], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const blur = interpolate(f, [0, 16], [6, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const y = interpolate(f, [0, 16], [16, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div
      style={{
        fontFamily: JP,
        fontSize,
        fontWeight: 700,
        color,
        clipPath: `inset(${100 - reveal}% 0 0 0)`,
        filter: `blur(${blur}px)`,
        transform: `translateY(${y}px)`,
      }}
    >
      {text}
    </div>
  );
};

/** 11. Type Mask: 文字の内側に写真が見える。background-clip:textで実写真を文字に流し込む。 */
const TYPE_MASK_PHOTO = 'demo/start-129/HERO_CLOSE/pexels-10638717.jpg';

export const TypeMaskText: React.FC<{text: string; fontSize?: number}> = ({text, fontSize = 72}) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [0, 14], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const zoom = interpolate(f, [0, 220], [100, 118], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div style={{position: 'relative', opacity: o}}>
      <div
        style={{
          fontFamily: JP,
          fontSize,
          fontWeight: 900,
          lineHeight: 1.15,
          backgroundImage: `url(${staticFile(TYPE_MASK_PHOTO)})`,
          backgroundSize: `${zoom}% auto`,
          backgroundPosition: 'center',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {text}
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: -6,
          height: 2,
          background: '#0A0A0C',
          opacity: 0.5,
        }}
      />
    </div>
  );
};

/** 15. Call-and-Response Layout: 呼びかけと応答を左右(または上下)に分けて時間差で見せる。
 * 「ほら　寄って集って！」(呼びかけ)→「お手を拝借！」(応答)のような掛け合いに使う。 */
export const CallAndResponseLayout: React.FC<{call: string; response: string; color: string; fontSize?: number}> = ({
  call,
  response,
  color,
  fontSize = 42,
}) => {
  const f = useCurrentFrame();
  const callO = interpolate(f, [0, 6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const callX = interpolate(f, [0, 8], [-24, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const respHit = 16;
  const respO = interpolate(f, [respHit, respHit + 6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const respX = interpolate(f, [respHit, respHit + 8], [24, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const respS = interpolate(f, [respHit, respHit + 4, respHit + 10], [1.3, 1.05, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <div>
      <div style={{fontFamily: JP, fontSize, fontWeight: 600, color, opacity: callO, transform: `translateX(${callX}px)`}}>
        {call}
      </div>
      <div
        style={{
          fontFamily: JP,
          fontSize: fontSize * 1.15,
          fontWeight: 900,
          color,
          opacity: respO,
          transform: `translateX(${respX}px) scale(${respS})`,
          marginTop: 6,
        }}
      >
        {response}
      </div>
    </div>
  );
};

/** 14. Lyric-to-Transition: phrase最後の文字のbaselineが画面全体へ広がるwipeになり、
 * 次shotへ視覚的に開いていく印象を作る(実際のshot切替はSequence側で別途起きるが、
 * 退場のタイミングを揃えることで「文字が次画面を開いた」ように見せる)。 */
export const LyricToTransition: React.FC<{text: string; color: string; fontSize?: number; exitFrame: number}> = ({
  text,
  color,
  fontSize = 42,
  exitFrame,
}) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [0, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const wipe = interpolate(f, [exitFrame, exitFrame + 10], [0, 100], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const textFade = interpolate(f, [exitFrame, exitFrame + 6], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div style={{position: 'relative'}}>
      <div style={{fontFamily: JP, fontSize, fontWeight: 700, color, opacity: o * textFade}}>{text}</div>
      <div style={{height: 2, width: '100%', background: color, opacity: 0.7, marginTop: 6}} />
      {wipe > 0 ? (
        <AbsoluteFill
          style={{
            background: color,
            clipPath: `inset(0 ${100 - wipe}% 0 0)`,
            pointerEvents: 'none',
          }}
        />
      ) : null}
    </div>
  );
};

/** Chorus Burst: 3-hit最終段で画面全体に一瞬だけ光が開くeffect layer。写真自体は隠さない。 */
export const ChorusBurstFlash: React.FC<{hitFrame: number; color?: string}> = ({hitFrame, color = '#FFFFFF'}) => {
  const f = useCurrentFrame();
  const local = f - hitFrame;
  const o = interpolate(local, [-2, 0, 10], [0, 0.35, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  if (o <= 0.001) return null;
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at center, ${color} 0%, rgba(255,255,255,0) 70%)`,
        opacity: o,
        pointerEvents: 'none',
      }}
    />
  );
};
