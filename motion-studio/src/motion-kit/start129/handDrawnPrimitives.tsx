// B案(冒険アニメOP)用の手描き系primitive。B-01
// SVG strokeDashoffsetでpath lengthアニメを作る。Math.random()は使わない。

import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';

export const HandDrawnUnderline: React.FC<{
  progressFrom: number;
  progressDurationInFrames: number;
  color?: string;
  width?: number;
}> = ({progressFrom, progressDurationInFrames, color = '#F4E7C9', width = 320}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [progressFrom, progressFrom + progressDurationInFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const pathLength = 400;
  return (
    <svg width={width} height={24} viewBox="0 0 400 24" style={{overflow: 'visible'}}>
      <path
        d="M4 14 C 80 4, 160 20, 240 10 S 360 6, 396 12"
        fill="none"
        stroke={color}
        strokeWidth={5}
        strokeLinecap="round"
        strokeDasharray={pathLength}
        strokeDashoffset={pathLength * (1 - progress)}
      />
    </svg>
  );
};

/** 消失点から放射するspeed line。1〜2frameの短いhit用。intensityは0-1。 */
export const SpeedLineBurst: React.FC<{
  vanishX: number;
  vanishY: number;
  intensity: number;
  lineCount?: number;
  color?: string;
}> = ({vanishX, vanishY, intensity, lineCount = 10, color = 'rgba(255,255,255,0.5)'}) => {
  if (intensity <= 0) return null;
  const lines = Array.from({length: lineCount}, (_, i) => {
    const angle = (i / lineCount) * Math.PI * 2;
    const len = 260 * intensity;
    const x2 = vanishX + Math.cos(angle) * len;
    const y2 = vanishY + Math.sin(angle) * len;
    return <line key={i} x1={vanishX} y1={vanishY} x2={x2} y2={y2} stroke={color} strokeWidth={2} />;
  });
  return (
    <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
      {lines}
    </svg>
  );
};

/** 円形stamp。3-hitのstamp-lineドット用。押印そのものは既存 押印-* テンプレを流用しない(別文法のため独自実装)。 */
export const RouteDot: React.FC<{x: number; y: number; scale: number; color?: string}> = ({
  x,
  y,
  scale,
  color = '#F4E7C9',
}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: 14,
      height: 14,
      borderRadius: '50%',
      background: color,
      transform: `translate(-50%, -50%) scale(${scale})`,
    }}
  />
);
