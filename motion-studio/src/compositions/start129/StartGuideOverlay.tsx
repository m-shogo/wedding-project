// 解説付きモード用の二層UI。
// 1. MiniGuideCard: 映像内。新技術の開始時だけ1.5〜2.5秒、最大3行
// 2. 常設の技術番号+区間名(小さく畳む)
// Dashboard詳細パネルは別画面(movie-dashboard側)が担当し、ここでは作らない。

import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import type {Start129Section} from '../../data/start129/sections';
import type {Start129Technique} from '../../data/start129/techniqueCatalog';

const CONTRAST_SCRIM = 'linear-gradient(0deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0) 60%)';

export const MiniGuideCard: React.FC<{
  technique: Start129Technique;
  showFrom: number;
  showDurationInFrames?: number;
  anchor?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
}> = ({technique, showFrom, showDurationInFrames = 60, anchor = 'bottom-left'}) => {
  const frame = useCurrentFrame();
  const local = frame - showFrom;
  if (local < 0 || local > showDurationInFrames) return null;

  const opacity = interpolate(
    local,
    [0, 8, showDurationInFrames - 10, showDurationInFrames],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  const posStyle: React.CSSProperties =
    anchor === 'bottom-left'
      ? {left: 40, bottom: 40}
      : anchor === 'bottom-right'
        ? {right: 40, bottom: 40}
        : anchor === 'top-left'
          ? {left: 40, top: 40}
          : {right: 40, top: 40};

  return (
    <div
      style={{
        position: 'absolute',
        ...posStyle,
        opacity,
        maxWidth: 560,
        padding: '14px 18px',
        borderRadius: 6,
        background: 'rgba(10,10,10,0.68)',
        color: '#FDFBF5',
        fontFamily: "'Noto Sans JP', sans-serif",
        lineHeight: 1.5,
      }}
    >
      <div style={{fontSize: 20, fontWeight: 700}}>演出: {technique.nameJa}</div>
      <div style={{fontSize: 16, opacity: 0.85}}>目的: {technique.purposeJa}</div>
      <div style={{fontSize: 13, opacity: 0.6, marginTop: 2}}>{technique.componentRef}</div>
    </div>
  );
};

export const SectionBadge: React.FC<{section: Start129Section; secondsElapsed: number}> = ({
  section,
  secondsElapsed,
}) => (
  <div
    style={{
      position: 'absolute',
      top: 24,
      left: 24,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '6px 12px',
      borderRadius: 4,
      background: 'rgba(0,0,0,0.5)',
      color: '#FDFBF5',
      fontFamily: "'Noto Sans JP', sans-serif",
      fontSize: 13,
    }}
  >
    <span style={{opacity: 0.7}}>{secondsElapsed.toFixed(1)}s / 129s</span>
    <span style={{opacity: 0.4}}>|</span>
    <span>{section.labelJa}</span>
  </div>
);

/** 写真上に固定するscrim。局所contrastを確保する目的で、全面blurより優先する。 */
export const BottomScrim: React.FC = () => (
  <div style={{position: 'absolute', inset: 0, background: CONTRAST_SCRIM, pointerEvents: 'none'}} />
);
