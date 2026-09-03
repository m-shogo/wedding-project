// C案(リズム・タイポMV)用の文字系primitive。
// 単語をバラバラに動かさず、phrase単位を編集単位にする。

import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';

const isKanji = (ch: string) => /[一-龯]/.test(ch);

/** 漢字とかなの階層。漢字はやや大きく/重く、かなは流れを作る細字。 */
export const KanjiKanaHierarchyText: React.FC<{text: string; fontSize?: number; color?: string}> = ({
  text,
  fontSize = 64,
  color = '#FBF6EA',
}) => (
  <span style={{fontFamily: "'Noto Sans JP', sans-serif", color, whiteSpace: 'pre'}}>
    {Array.from(text).map((ch, i) => (
      <span
        key={i}
        style={{
          fontSize: isKanji(ch) ? fontSize : fontSize * 0.82,
          fontWeight: isKanji(ch) ? 700 : 400,
        }}
      >
        {ch}
      </span>
    ))}
  </span>
);

/**
 * ベースライン走査。下線が通過した後、文字がfade-inして定着する。
 * カラオケの色追従ではなく、phrase単位で1回だけ発火する演出。
 */
export const BaselineScanText: React.FC<{
  text: string;
  startFrame: number;
  durationInFrames: number;
  fontSize?: number;
  color?: string;
}> = ({text, startFrame, durationInFrames, fontSize = 64, color = '#FBF6EA'}) => {
  const frame = useCurrentFrame();
  const scanX = interpolate(frame, [startFrame, startFrame + durationInFrames], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const textOpacity = interpolate(
    frame,
    [startFrame, startFrame + Math.round(durationInFrames * 0.6), startFrame + durationInFrames],
    [0, 0.35, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  return (
    <div style={{position: 'relative', display: 'inline-block'}}>
      <div style={{opacity: textOpacity}}>
        <KanjiKanaHierarchyText text={text} fontSize={fontSize} color={color} />
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: -6,
          left: 0,
          height: 3,
          width: `${scanX}%`,
          background: color,
          opacity: 0.85,
        }}
      />
    </div>
  );
};

/** 句読点・小さい音だけへ使うmicro accent。全文は揺らさない。 */
export const PunctuationAccent: React.FC<{frame: number; hitFrame: number; children: React.ReactNode}> = ({
  frame,
  hitFrame,
  children,
}) => {
  const scale = interpolate(frame, [hitFrame - 2, hitFrame, hitFrame + 6], [1, 1.35, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <span style={{display: 'inline-block', transform: `scale(${scale})`}}>{children}</span>;
};
