// 歌詞レイヤー。A/B/Cで表示位置・入り方・weightをすべて変える。
//
// 重要な制約(docs/decisions/2026-08-25-start-129-rebuild-root-cause.md):
// - 正規歌詞が無い状態で「歌詞が入った」と扱わない。
// - placeholderは薄く出して誤魔化さず、DEMOバッジで明示する。
// - 3案で同じ位置・同じfont size・同じfadeにしない。

import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import type {ResolvedLyricSlot} from '../../data/start129/localLyrics';

const JP = "'Noto Sans JP', sans-serif";
const isKanji = (ch: string) => /[一-龯]/.test(ch);

/** 写真の上でも読めるようにする局所scrim。全画面を暗くしない。 */
const Scrim: React.FC<{align: 'bottom' | 'top' | 'center'}> = ({align}) => {
  const g =
    align === 'bottom'
      ? 'linear-gradient(0deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.28) 26%, rgba(0,0,0,0) 52%)'
      : align === 'top'
        ? 'linear-gradient(180deg, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.22) 26%, rgba(0,0,0,0) 52%)'
        : 'radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 45%, rgba(0,0,0,0) 72%)';
  return <AbsoluteFill style={{background: g, pointerEvents: 'none'}} />;
};

export type LyricSlotPlacement = {
  slot: ResolvedLyricSlot;
  durationInFrames: number;
  /** 区間内で何番目か。位置を変えて単調さを避けるために使う */
  indexInSection: number;
  /** サビなど強調区間か */
  emphasis: boolean;
};

// ---------------------------------------------------------------------------
// A案: 余白へfade。読了時間を確保し、顔と競合させない。
// 位置はindexInSectionで4隅まわりへローテーションする。
// ---------------------------------------------------------------------------
export const LyricA: React.FC<LyricSlotPlacement> = ({slot, durationInFrames, indexInSection, emphasis}) => {
  const f = useCurrentFrame();
  const inF = 10;
  const outF = 10;
  const opacity = interpolate(
    f,
    [0, inF, Math.max(inF, durationInFrames - outF), durationInFrames],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  // 入りで少しだけ下から上がる(2px程度。派手にしない)
  const y = interpolate(f, [0, inF], [10, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const tracking = interpolate(f, [0, inF + 8], [0.16, 0.02], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  const positions = [
    {justifyContent: 'flex-end', alignItems: 'flex-start', padding: '0 0 84px 88px'},
    {justifyContent: 'flex-end', alignItems: 'flex-end', padding: '0 88px 84px 0'},
    {justifyContent: 'flex-start', alignItems: 'flex-start', padding: '96px 0 0 88px'},
    {justifyContent: 'flex-end', alignItems: 'flex-start', padding: '0 0 132px 88px'},
  ] as const;
  const pos = positions[indexInSection % positions.length];
  const size = emphasis ? 58 : 40;

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <Scrim align={pos.justifyContent === 'flex-start' ? 'top' : 'bottom'} />
      <AbsoluteFill style={{...pos, display: 'flex'}}>
        <div
          style={{
            fontFamily: JP,
            color: '#FDFBF5',
            fontSize: size,
            fontWeight: 400,
            letterSpacing: `${tracking}em`,
            maxWidth: 1080,
            lineHeight: 1.5,
            opacity: opacity * (slot.isPlaceholder ? 0.62 : 1),
            transform: `translateY(${y}px)`,
            textShadow: '0 2px 18px rgba(0,0,0,0.55)',
          }}
        >
          {slot.text}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// B案: 1文字ずつstagger。強調語はscale hit。shape背景つきで写真の上へ。
// ---------------------------------------------------------------------------
export const LyricB: React.FC<LyricSlotPlacement> = ({slot, durationInFrames, indexInSection, emphasis}) => {
  const f = useCurrentFrame();
  const chars = Array.from(slot.text);
  const outF = 8;
  const groupOpacity = interpolate(
    f,
    [0, 4, Math.max(4, durationInFrames - outF), durationInFrames],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  const size = emphasis ? 64 : 38;
  // 区間内で上下を入れ替える
  const top = indexInSection % 2 === 0;

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <AbsoluteFill
        style={{
          display: 'flex',
          justifyContent: top ? 'flex-start' : 'flex-end',
          alignItems: indexInSection % 3 === 1 ? 'flex-end' : 'flex-start',
          padding: top ? '90px 80px 0 80px' : '0 80px 90px 80px',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            flexWrap: 'wrap',
            alignItems: 'baseline',
            background: 'rgba(18,16,13,0.55)',
            borderLeft: '5px solid #F4C95D',
            padding: '10px 20px 12px 16px',
            opacity: groupOpacity * (slot.isPlaceholder ? 0.66 : 1),
          }}
        >
          {chars.map((ch, i) => {
            const start = i * 1.6;
            const o = interpolate(f, [start, start + 6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
            const dy = interpolate(f, [start, start + 8], [16, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
            const pop = interpolate(f, [start, start + 4, start + 9], [1.25, 1.06, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            return (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  fontFamily: JP,
                  fontSize: size,
                  fontWeight: 800,
                  color: '#FFFDF7',
                  opacity: o,
                  transform: `translateY(${dy}px) scale(${pop})`,
                  textShadow: '0 3px 0 rgba(0,0,0,0.35)',
                  whiteSpace: 'pre',
                }}
              >
                {ch}
              </span>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// C案: editorial。漢字/かなでweightを変え、baselineが走り、trackingが開く。
// 位置とサイズをindexInSectionで大きく変える(大小コントラスト)。
// ---------------------------------------------------------------------------
export const LyricC: React.FC<LyricSlotPlacement> = ({slot, durationInFrames, indexInSection, emphasis}) => {
  const f = useCurrentFrame();
  const revealF = Math.min(26, Math.max(10, durationInFrames - 8));
  const scan = interpolate(f, [0, revealF], [0, 100], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const groupOpacity = interpolate(
    f,
    [0, 6, Math.max(6, durationInFrames - 8), durationInFrames],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  const tracking = interpolate(f, [0, revealF], [0.3, 0.04], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  // 大小コントラスト: 区間内で交互に大きく/小さく
  const big = emphasis || indexInSection % 3 === 0;
  const size = big ? (emphasis ? 92 : 66) : 34;
  const layouts = [
    {justifyContent: 'flex-end', alignItems: 'flex-start', padding: '0 0 96px 96px', textAlign: 'left' as const},
    {justifyContent: 'center', alignItems: 'flex-end', padding: '0 96px 0 0', textAlign: 'right' as const},
    {justifyContent: 'flex-start', alignItems: 'flex-start', padding: '110px 0 0 96px', textAlign: 'left' as const},
    {justifyContent: 'flex-end', alignItems: 'flex-end', padding: '0 96px 110px 0', textAlign: 'right' as const},
  ];
  const L = layouts[indexInSection % layouts.length];

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <AbsoluteFill style={{display: 'flex', ...L, opacity: groupOpacity}}>
        <div style={{position: 'relative', display: 'inline-block', maxWidth: 1200}}>
          <div style={{fontFamily: JP, letterSpacing: `${tracking}em`, lineHeight: 1.35, textAlign: L.textAlign}}>
            {Array.from(slot.text).map((ch, i) => (
              <span
                key={i}
                style={{
                  fontSize: isKanji(ch) ? size : size * 0.8,
                  fontWeight: isKanji(ch) ? 700 : 300,
                  color: slot.isPlaceholder ? 'rgba(253,251,245,0.66)' : '#FDFBF5',
                  textShadow: '0 2px 16px rgba(0,0,0,0.5)',
                }}
              >
                {ch}
              </span>
            ))}
          </div>
          {/* baselineが走る */}
          <div
            style={{
              position: 'absolute',
              left: L.textAlign === 'right' ? 'auto' : 0,
              right: L.textAlign === 'right' ? 0 : 'auto',
              bottom: -10,
              height: 2,
              width: `${scan}%`,
              background: '#FDFBF5',
              opacity: 0.9,
            }}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * 正規歌詞が未投入であることを常時明示するバッジ。
 * これがある限り、この動画は「歌詞入り」ではない。
 */
export const DemoLyricBadge: React.FC = () => (
  <div
    style={{
      position: 'absolute',
      right: 22,
      bottom: 18,
      padding: '5px 12px',
      borderRadius: 3,
      background: 'rgba(190,60,40,0.88)',
      color: '#FFF6F2',
      fontFamily: JP,
      fontSize: 15,
      fontWeight: 700,
      letterSpacing: '0.06em',
      pointerEvents: 'none',
    }}
  >
    DEMO / 正規歌詞・音源 未投入
  </div>
);
