import type {ReactNode} from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

export type MotionIntensity = 'S' | 'M' | 'L';

const intensityScale: Record<MotionIntensity, number> = {S: 0.55, M: 0.8, L: 1};

export function TypographyRevealEngine({
  text,
  intensity = 'M',
  mode = 'mask',
  transparent = true,
}: {
  text: string;
  intensity?: MotionIntensity;
  mode?: 'mask' | 'punch' | 'stagger';
  transparent?: boolean;
}) {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const strength = intensityScale[intensity];
  const progress = interpolate(frame, [0, Math.round(fps * 0.5)], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const scale = mode === 'punch' ? interpolate(progress, [0, 1], [1 + 0.18 * strength, 1]) : 1;
  const translateY = mode === 'mask' ? (1 - progress) * 80 * strength : 0;
  const letterSpacing = mode === 'stagger' ? `${interpolate(progress, [0, 1], [0.18 * strength, 0.02])}em` : '0.02em';

  return (
    <AbsoluteFill style={{backgroundColor: transparent ? undefined : '#0d2035', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{overflow: 'hidden', padding: '0.15em 0.25em'}}>
        <div style={{opacity: progress, transform: `translateY(${translateY}px) scale(${scale})`, letterSpacing, fontSize: 104, fontWeight: 800, color: '#fff'}}>
          {text}
        </div>
      </div>
    </AbsoluteFill>
  );
}

export function CameraTransformEngine({
  children,
  intensity = 'M',
  mode = 'push',
}: {
  children: ReactNode;
  intensity?: MotionIntensity;
  mode?: 'static' | 'push' | 'pull' | 'pan';
}) {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const strength = intensityScale[intensity];
  const t = interpolate(frame, [0, Math.max(1, durationInFrames - 1)], [0, 1], {extrapolateRight: 'clamp'});
  const scale = mode === 'static' ? 1 : mode === 'pull' ? 1.05 - t * 0.04 * strength : 1 + t * 0.045 * strength;
  const translateX = mode === 'pan' ? interpolate(t, [0, 1], [-32 * strength, 32 * strength]) : 0;

  return <AbsoluteFill style={{transform: `translateX(${translateX}px) scale(${scale})`}}>{children}</AbsoluteFill>;
}

export function TransitionWipeEngine({
  direction = 'right',
  intensity = 'M',
  transparent = true,
}: {
  direction?: 'left' | 'right' | 'up' | 'down';
  intensity?: MotionIntensity;
  transparent?: boolean;
}) {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const strength = intensityScale[intensity];
  const progress = interpolate(frame, [0, Math.max(4, Math.round(fps * 0.45))], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });
  const horizontal = direction === 'left' || direction === 'right';
  const sign = direction === 'left' || direction === 'up' ? -1 : 1;
  const travel = (1 - progress) * 110 * sign;

  return (
    <AbsoluteFill style={{backgroundColor: transparent ? undefined : '#0d2035', overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: horizontal ? '0 auto 0 0' : '0 0 auto 0', width: horizontal ? `${Math.max(8, progress * 100)}%` : '100%', height: horizontal ? '100%' : `${Math.max(8, progress * 100)}%`, background: '#f0d37a', transform: horizontal ? `translateX(${travel * strength}%)` : `translateY(${travel * strength}%)`, opacity: 0.9}} />
      <div style={{position: 'absolute', left: '8%', right: '8%', top: '50%', height: 4, background: '#fff', transform: `scaleX(${progress})`, transformOrigin: direction === 'left' ? 'right' : 'left'}} />
    </AbsoluteFill>
  );
}

export function GraphicHitEngine({
  variant = 'triplet',
  intensity = 'M',
  transparent = true,
}: {
  variant?: 'triplet' | 'speed-lines' | 'impact';
  intensity?: MotionIntensity;
  transparent?: boolean;
}) {
  const frame = useCurrentFrame();
  const strength = intensityScale[intensity];
  const hit = (at: number) => interpolate(frame, [at - 1, at, at + 5], [0, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{backgroundColor: transparent ? undefined : '#0d2035', overflow: 'hidden'}}>
      {variant === 'triplet' && [8, 16, 24].map((at, index) => (
        <div key={at} style={{position: 'absolute', left: `${24 + index * 24}%`, top: '45%', width: 76, height: 76, borderRadius: 999, border: '7px solid #f0d37a', opacity: hit(at), transform: `scale(${0.65 + hit(at) * 0.65 * strength})`}} />
      ))}
      {variant === 'speed-lines' && Array.from({length: 12}).map((_, index) => {
        const progress = interpolate(frame, [0, 12], [0, 1], {extrapolateRight: 'clamp'});
        return <div key={index} style={{position: 'absolute', left: `${-10 + index * 9}%`, top: `${8 + (index % 6) * 15}%`, width: `${18 + (index % 3) * 8}%`, height: 3, background: '#fff', opacity: 0.18 + 0.5 * strength, transform: `translateX(${progress * 180 * strength}px) rotate(-8deg)`}} />;
      })}
      {variant === 'impact' && <AbsoluteFill style={{background: '#fff', opacity: hit(8) * 0.75 * strength}} />}
    </AbsoluteFill>
  );
}
