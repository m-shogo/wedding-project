// StaRt 129秒ショーケース用の控えめなline icon。
// Style Bible方針: gold/glowで高級に見せない、装飾を増やさない、意味のある場所だけで使う。
// すべて手描き線画相当のstroke-onlyなSVGで、写真より目立たせない。

import React from 'react';
import {interpolate} from 'remotion';

type IconProps = {
  size?: number;
  color?: string;
  strokeWidth?: number;
  /** 0-1。線画が伸びていくreveal(HandDrawnUnderlineと同じ考え方)。省略時は常時表示。 */
  progress?: number;
};

const strokeCommon = (color: string, strokeWidth: number) => ({
  fill: 'none',
  stroke: color,
  strokeWidth,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
});

/** 到着・場所を示す控えめなpin icon。 */
export const PinIcon: React.FC<IconProps> = ({size = 28, color = '#FDFBF5', strokeWidth = 1.6, progress = 1}) => {
  const pathLength = 90;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path
        d="M12 21c-4.2-4.6-7-8.1-7-11.5A7 7 0 0 1 19 9.5C19 12.9 16.2 16.4 12 21Z"
        {...strokeCommon(color, strokeWidth)}
        strokeDasharray={pathLength}
        strokeDashoffset={pathLength * (1 - progress)}
      />
      <circle cx="12" cy="9.5" r="2.4" {...strokeCommon(color, strokeWidth)} opacity={progress} />
    </svg>
  );
};

/** 感謝・emotionを示す控えめなoutline heart。塗りは使わずstrokeのみ。 */
export const HeartOutlineIcon: React.FC<IconProps> = ({size = 26, color = '#FDFBF5', strokeWidth = 1.6, progress = 1}) => {
  const pathLength = 70;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path
        d="M12 20.5c-4.8-3.2-9-6.6-9-11.1A5 5 0 0 1 12 6.4a5 5 0 0 1 9 3c0 4.5-4.2 7.9-9 11.1Z"
        {...strokeCommon(color, strokeWidth)}
        strokeDasharray={pathLength}
        strokeDashoffset={pathLength * (1 - progress)}
      />
    </svg>
  );
};

/** 旅・飛行機の軌跡を示す控えめなplane trail icon。B案の手描き文法に合う。 */
export const PlaneTrailIcon: React.FC<IconProps> = ({size = 30, color = '#FDFBF5', strokeWidth = 1.8, progress = 1}) => {
  const dashLength = 60;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path
        d="M2 18 Q10 14 22 4"
        {...strokeCommon(color, strokeWidth)}
        strokeDasharray={`3 4`}
        opacity={0.7 * progress}
      />
      <path
        d="M22 4 L15.5 5.5 L18 9 Z M22 4 L20.5 10.5 L17 8 Z"
        {...strokeCommon(color, strokeWidth)}
        strokeDasharray={dashLength}
        strokeDashoffset={dashLength * (1 - progress)}
      />
    </svg>
  );
};

/** interpolateの共通ヘルパー。0→1へ滑らかに伸びるicon revealを作る。 */
export const useIconReveal = (frame: number, from: number, durationInFrames = 18) =>
  interpolate(frame, [from, from + durationInFrames], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
