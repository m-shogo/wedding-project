// storyboard.tsのShotを実際の映像へ変換する共通エンジン。
//
// 「1区間 = 背景1枚」だった以前の実装を置き換える。
// motion / entry / layout / effect をそれぞれ独立に組み合わせられるようにし、
// A/B/C案は「どの組み合わせを選ぶか」で映像文法を変える。
//
// Math.random()は使わない。すべてframeとshot dataからdeterministicに計算する。

import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {StartDemoBackdrop} from '../../compositions/start129/StartDemoBackdrop';
import {SparkleOverlay} from '../../compositions/start129/SparkleOverlay';
import type {PlacedShot, ShotEffect, ShotEntry, ShotLayout, ShotMotion} from '../../data/start129/storyboard';
import type {Start129AssetRole} from '../../data/start129/assetRoles';

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// ---------------------------------------------------------------------------
// motion: shot内でmediaがどう動くか
// ---------------------------------------------------------------------------
const motionStyle = (motion: ShotMotion, localFrame: number, duration: number): React.CSSProperties => {
  const p = duration <= 1 ? 1 : Math.min(1, Math.max(0, localFrame / duration));
  switch (motion.kind) {
    case 'static':
      return {};
    case 'push-in': {
      const s = motion.from + (motion.to - motion.from) * easeOut(p);
      return {transform: `scale(${s})`, transformOrigin: `${motion.originX ?? 50}% ${motion.originY ?? 50}%`};
    }
    case 'pull-out': {
      const s = motion.from + (motion.to - motion.from) * easeOut(p);
      return {transform: `scale(${s})`, transformOrigin: `${motion.originX ?? 50}% ${motion.originY ?? 50}%`};
    }
    case 'pan': {
      const scale = motion.scale ?? 1.12;
      // scaleで作った余白の範囲内で横移動する(端が見えないようにclamp)
      const maxShift = ((scale - 1) / 2) * 100;
      const dx = Math.max(-maxShift, Math.min(maxShift, motion.dx));
      const x = -dx / 2 + dx * easeInOut(p);
      return {transform: `scale(${scale}) translateX(${x}%)`};
    }
    case 'tilt': {
      const scale = motion.scale ?? 1.12;
      const maxShift = ((scale - 1) / 2) * 100;
      const dy = Math.max(-maxShift, Math.min(maxShift, motion.dy));
      const y = -dy / 2 + dy * easeInOut(p);
      return {transform: `scale(${scale}) translateY(${y}%)`};
    }
    case 'parallax': {
      // 背景層。前景層はShotRendererが別途重ねる
      const scale = motion.depth;
      const x = -motion.dx / 2 + motion.dx * easeInOut(p);
      return {transform: `scale(${scale}) translateX(${x}%)`};
    }
    case 'drift': {
      const x = Math.sin(p * Math.PI) * motion.dx;
      const y = Math.sin(p * Math.PI * 0.7) * motion.dy;
      return {transform: `scale(${motion.scale}) translate(${x}%, ${y}%)`};
    }
  }
};

// ---------------------------------------------------------------------------
// entry: 前のshotからの切り替わり方
// ---------------------------------------------------------------------------
type EntryRender = {
  /** shot全体へかけるstyle(opacity/filter/transform) */
  style: React.CSSProperties;
  /** clipPathでのmask */
  clipPath?: string;
  /** entryの上に重ねる装飾(color blockなど) */
  overlay?: React.ReactNode;
};

const entryRender = (entry: ShotEntry, localFrame: number): EntryRender => {
  const f = localFrame;
  switch (entry.kind) {
    case 'cut':
      return {style: {}};
    case 'fade': {
      const o = interpolate(f, [0, entry.frames], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
      return {style: {opacity: o}};
    }
    case 'dissolve': {
      const o = interpolate(f, [0, entry.frames], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
      const s = interpolate(f, [0, entry.frames], [1.03, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
      return {style: {opacity: o, transform: `scale(${s})`}};
    }
    case 'blur-in': {
      const b = interpolate(f, [0, entry.frames], [18, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
      const o = interpolate(f, [0, entry.frames * 0.6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
      return {style: {filter: `blur(${b}px)`, opacity: o}};
    }
    case 'wipe': {
      const p = interpolate(f, [0, entry.frames], [0, 100], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
      const e = easeOut(p / 100) * 100;
      const map: Record<string, string> = {
        left: `inset(0 ${100 - e}% 0 0)`,
        right: `inset(0 0 0 ${100 - e}%)`,
        up: `inset(0 0 ${100 - e}% 0)`,
        down: `inset(${100 - e}% 0 0 0)`,
      };
      return {style: {}, clipPath: map[entry.dir]};
    }
    case 'iris': {
      const p = interpolate(f, [0, entry.frames], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
      const r = easeOut(p) * 75;
      return {style: {}, clipPath: `circle(${r}% at 50% 50%)`};
    }
    case 'whip': {
      const p = interpolate(f, [0, entry.frames], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
      const dir = entry.dir === 'left' ? -1 : 1;
      const x = (1 - easeOut(p)) * 28 * dir;
      const blur = (1 - easeOut(p)) * 14;
      return {style: {transform: `translateX(${x}%)`, filter: `blur(${blur}px)`}};
    }
    case 'scale-pop': {
      const p = interpolate(f, [0, entry.frames], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
      // overshootしてから着地
      const s = p < 1 ? 1.14 - 0.14 * easeOut(p) - (p > 0.7 ? 0 : 0) : 1;
      const o = interpolate(f, [0, entry.frames * 0.4], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
      return {style: {transform: `scale(${s})`, opacity: o}};
    }
    case 'color-block': {
      const p = interpolate(f, [0, entry.frames], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
      // 前半で色面が画面を覆い、後半で抜けて次画面が出る
      const cover = p < 0.5 ? easeOut(p * 2) : 1 - easeOut((p - 0.5) * 2);
      const dir = entry.dir === 'left' ? 'right' : 'left';
      const inset = dir === 'right' ? `inset(0 0 0 ${100 - cover * 100}%)` : `inset(0 ${100 - cover * 100}% 0 0)`;
      return {
        style: {opacity: p > 0.45 ? 1 : 0},
        overlay: (
          <AbsoluteFill style={{background: entry.color, clipPath: inset, pointerEvents: 'none'}} />
        ),
      };
    }
    case 'slat': {
      const p = interpolate(f, [0, entry.frames], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
      const e = easeOut(p);
      // count本の縦帯が順に開く。CSSのclipPathは1要素に1つしか持てないため、
      // maskImageのrepeating-linear-gradientで帯を作り、帯幅をアニメーションさせる。
      const bandW = 100 / entry.count;
      const openRatio = Math.min(1, e * 1.15);
      const mask = `repeating-linear-gradient(90deg, rgba(0,0,0,1) 0 ${bandW * openRatio}%, rgba(0,0,0,0) ${bandW * openRatio}% ${bandW}%)`;
      return {
        style: {
          maskImage: e >= 0.999 ? undefined : mask,
          WebkitMaskImage: e >= 0.999 ? undefined : mask,
          maskSize: '100% 100%',
          WebkitMaskSize: '100% 100%',
        },
      };
    }
  }
};

// ---------------------------------------------------------------------------
// layout: 複数mediaの配置
// ---------------------------------------------------------------------------
const LayoutRender: React.FC<{
  layout: ShotLayout;
  role: Start129AssetRole;
  variantIndex: number;
  extras: Array<{role: Start129AssetRole; variantIndex: number}>;
  focus?: {x: number; y: number};
  /** C案のgridで罫線を出すか */
  editorialRules?: boolean;
}> = ({layout, role, variantIndex, extras, focus, editorialRules}) => {
  const objectPosition = focus ? `${focus.x}% ${focus.y}%` : undefined;
  const cell = (r: Start129AssetRole, vi: number, key: React.Key) => (
    <div key={key} style={{position: 'relative', overflow: 'hidden', width: '100%', height: '100%'}}>
      <StartDemoBackdrop role={r} variantIndex={vi} objectPosition={objectPosition} />
    </div>
  );
  const gap = editorialRules ? 6 : 4;
  const bg = editorialRules ? '#F2EFE8' : '#0C0B0A';

  switch (layout.kind) {
    case 'full':
      return <StartDemoBackdrop role={role} variantIndex={variantIndex} objectPosition={objectPosition} />;
    case 'split-2': {
      const r = layout.ratio ?? 0.5;
      return (
        <AbsoluteFill style={{display: 'grid', gridTemplateColumns: `${r * 100}% ${(1 - r) * 100}%`, gap, background: bg}}>
          {cell(role, variantIndex, 'a')}
          {extras[0] ? cell(extras[0].role, extras[0].variantIndex, 'b') : <div />}
        </AbsoluteFill>
      );
    }
    case 'strip-3':
      return (
        <AbsoluteFill style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap, background: bg}}>
          {cell(role, variantIndex, 'a')}
          {extras[0] ? cell(extras[0].role, extras[0].variantIndex, 'b') : <div />}
          {extras[1] ? cell(extras[1].role, extras[1].variantIndex, 'c') : <div />}
        </AbsoluteFill>
      );
    case 'panel-4':
      return (
        <AbsoluteFill style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap, background: bg}}>
          {cell(role, variantIndex, 'a')}
          {extras[0] ? cell(extras[0].role, extras[0].variantIndex, 'b') : <div />}
          {extras[1] ? cell(extras[1].role, extras[1].variantIndex, 'c') : <div />}
          {extras[2] ? cell(extras[2].role, extras[2].variantIndex, 'd') : <div />}
        </AbsoluteFill>
      );
    case 'grid-editorial':
      return (
        <AbsoluteFill style={{display: 'grid', gridTemplateColumns: '64% 36%', gridTemplateRows: '1fr 1fr', gap, background: bg}}>
          <div style={{gridRow: '1 / 3', position: 'relative', overflow: 'hidden'}}>
            <StartDemoBackdrop role={role} variantIndex={variantIndex} objectPosition={objectPosition} />
          </div>
          {extras[0] ? cell(extras[0].role, extras[0].variantIndex, 'b') : <div />}
          {extras[1] ? cell(extras[1].role, extras[1].variantIndex, 'c') : <div />}
        </AbsoluteFill>
      );
    case 'inset':
      return (
        <AbsoluteFill>
          {extras[0] ? (
            <StartDemoBackdrop role={extras[0].role} variantIndex={extras[0].variantIndex} />
          ) : (
            <AbsoluteFill style={{background: bg}} />
          )}
          <div
            style={{
              position: 'absolute',
              left: `${layout.x}%`,
              top: `${layout.y}%`,
              width: `${layout.w}%`,
              aspectRatio: '16 / 9',
              transform: 'translate(-50%, -50%)',
              overflow: 'hidden',
              boxShadow: '0 12px 48px rgba(0,0,0,0.4)',
            }}
          >
            <StartDemoBackdrop role={role} variantIndex={variantIndex} />
          </div>
        </AbsoluteFill>
      );
    case 'stack':
      return <StartDemoBackdrop role={role} variantIndex={variantIndex} objectPosition={objectPosition} />;
  }
};

// ---------------------------------------------------------------------------
// effects: 前景の光/粒子/graphic
// ---------------------------------------------------------------------------
const EffectLayer: React.FC<{effect: ShotEffect; localFrame: number; duration: number}> = ({
  effect,
  localFrame,
  duration,
}) => {
  const p = duration <= 1 ? 1 : localFrame / duration;
  switch (effect.kind) {
    case 'none':
      return null;
    case 'dust':
      return <SparkleOverlay kind="dust" opacity={effect.opacity} />;
    case 'sparks': {
      // hitに合わせて短く出す(shot前半のみ)
      const o = interpolate(localFrame, [0, 6, 22, 30], [0, effect.opacity, effect.opacity * 0.5, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
      return <SparkleOverlay kind="sparks" opacity={o} />;
    }
    case 'light-leak': {
      const o = Math.sin(p * Math.PI) * effect.opacity;
      const dir = effect.side === 'left' ? '105deg' : '255deg';
      return (
        <AbsoluteFill
          style={{
            background: `linear-gradient(${dir}, rgba(255,214,170,${o}) 0%, rgba(255,190,140,${o * 0.4}) 22%, rgba(0,0,0,0) 55%)`,
            mixBlendMode: 'screen',
            pointerEvents: 'none',
          }}
        />
      );
    }
    case 'prism': {
      const o = Math.sin(p * Math.PI) * effect.opacity;
      return (
        <AbsoluteFill
          style={{
            background: `linear-gradient(115deg, rgba(255,140,180,${o}) 0%, rgba(150,200,255,${o * 0.8}) 30%, rgba(255,230,150,${o * 0.6}) 55%, rgba(0,0,0,0) 78%)`,
            mixBlendMode: 'screen',
            pointerEvents: 'none',
          }}
        />
      );
    }
    case 'glint': {
      // 一点だけ短く光る
      const o = interpolate(localFrame, [10, 22, 34], [0, 0.85, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
      const s = interpolate(localFrame, [10, 22, 34], [0.4, 1.15, 0.5], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
      if (o <= 0.001) return null;
      return (
        <svg width={1920} height={1080} style={{position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'screen'}}>
          <g transform={`translate(${(effect.x / 100) * 1920} ${(effect.y / 100) * 1080}) scale(${s})`} opacity={o}>
            <path d="M0 -46 L7 -7 L46 0 L7 7 L0 46 L-7 7 L-46 0 L-7 -7 Z" fill="rgba(255,246,220,0.95)" />
            <circle r="7" fill="rgba(255,255,255,0.95)" />
          </g>
        </svg>
      );
    }
    case 'halftone': {
      return (
        <AbsoluteFill
          style={{
            backgroundImage: 'radial-gradient(rgba(0,0,0,0.55) 1.2px, transparent 1.3px)',
            backgroundSize: '7px 7px',
            opacity: effect.opacity,
            mixBlendMode: 'multiply',
            pointerEvents: 'none',
          }}
        />
      );
    }
    case 'speed-lines': {
      const o = interpolate(localFrame, [0, 4, 16, 24], [0, effect.intensity, effect.intensity * 0.4, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
      if (o <= 0.001) return null;
      const lines = Array.from({length: 26}, (_, i) => {
        const t = i / 26;
        const y = t * 1080;
        const len = 200 + ((i * 137) % 380);
        const fromLeft = i % 2 === 0;
        return (
          <line
            key={i}
            x1={fromLeft ? 0 : 1920}
            y1={y}
            x2={fromLeft ? len : 1920 - len}
            y2={y}
            stroke="rgba(255,252,240,0.85)"
            strokeWidth={i % 3 === 0 ? 3 : 1.5}
          />
        );
      });
      return (
        <svg width={1920} height={1080} style={{position: 'absolute', inset: 0, opacity: o, pointerEvents: 'none'}}>
          {lines}
        </svg>
      );
    }
    case 'grain': {
      return (
        <AbsoluteFill
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0px, rgba(0,0,0,0.06) 1px, rgba(255,255,255,0.04) 2px)',
            opacity: effect.opacity * 6,
            mixBlendMode: 'overlay',
            pointerEvents: 'none',
          }}
        />
      );
    }
    case 'vignette':
      return (
        <AbsoluteFill
          style={{
            background: `radial-gradient(ellipse at center, rgba(0,0,0,0) 45%, rgba(0,0,0,${effect.strength}) 100%)`,
            pointerEvents: 'none',
          }}
        />
      );
    case 'flash': {
      const o = interpolate(localFrame, [0, 1, effect.frames], [0.75, 0.5, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
      if (o <= 0.001) return null;
      return <AbsoluteFill style={{background: `rgba(255,255,255,${o})`, pointerEvents: 'none'}} />;
    }
  }
};

// ---------------------------------------------------------------------------
// ShotRenderer: 1 shotを描く
// ---------------------------------------------------------------------------
export const ShotRenderer: React.FC<{shot: PlacedShot; editorialRules?: boolean}> = ({shot, editorialRules}) => {
  const localFrame = useCurrentFrame();
  const dur = shot.durationInFrames;
  const entry = entryRender(shot.entry, localFrame);
  const mStyle = motionStyle(shot.motion, localFrame, dur);
  const layout = shot.layout ?? {kind: 'full' as const};
  const extras = shot.extraRoles ?? [];

  return (
    <AbsoluteFill style={{overflow: 'hidden', ...entry.style, clipPath: entry.clipPath}}>
      <AbsoluteFill style={mStyle}>
        <LayoutRender
          layout={layout}
          role={shot.role}
          variantIndex={shot.variantIndex}
          extras={extras}
          focus={shot.focus}
          editorialRules={editorialRules}
        />
      </AbsoluteFill>
      {/* parallax時は同じ素材を前景として少し速く動かし、擬似的な奥行きを作る */}
      {shot.motion.kind === 'parallax' ? (
        <AbsoluteFill
          style={{
            transform: `scale(${shot.motion.depth * 1.08}) translateX(${
              -shot.motion.dx * 0.9 + shot.motion.dx * 1.8 * easeInOut(Math.min(1, localFrame / dur))
            }%)`,
            maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 26%, rgba(0,0,0,0) 42%)',
            WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 26%, rgba(0,0,0,0) 42%)',
            pointerEvents: 'none',
          }}
        >
          <StartDemoBackdrop role={shot.role} variantIndex={shot.variantIndex} />
        </AbsoluteFill>
      ) : null}
      {(shot.effects ?? []).map((e, i) => (
        <EffectLayer key={i} effect={e} localFrame={localFrame} duration={dur} />
      ))}
      {entry.overlay}
    </AbsoluteFill>
  );
};
