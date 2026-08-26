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
  mode?: 'mask' | 'punch' | 'stagger' | 'hop' | 'lock' | 'outline';
  transparent?: boolean;
}) {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const strength = intensityScale[intensity];
  const progress = interpolate(frame, [0, Math.round(fps * 0.5)], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  // hopは着地時に軽く弾む物理的な質感を出すため、Easing.bounceを別トラックとして使う
  // (progress自体はopacity/scaleの基準として保つ)。
  const hopProgress = interpolate(frame, [0, Math.round(fps * 0.7)], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.bounce,
  });
  // outlineは「線から塗りへ」変わる表現のため、全体opacityは早めに1へ到達させ、
  // 塗り(fillOpacity)とWebkitTextStrokeの太さを別トラックで進行させる。
  const outlineAppear = interpolate(frame, [0, 4], [0, 1], {extrapolateRight: 'clamp'});
  const outlineFill = interpolate(progress, [0.35, 1], [0, 1], {extrapolateLeft: 'clamp'});
  const outlineStrokeWidth = interpolate(progress, [0, 1], [2.5, 0]) * strength;

  const scale = mode === 'punch' ? interpolate(progress, [0, 1], [1 + 0.18 * strength, 1]) : 1;
  const translateY =
    mode === 'mask' ? (1 - progress) * 80 * strength : mode === 'hop' ? (1 - hopProgress) * -90 * strength : 0;
  const translateX = mode === 'lock' ? 130 * strength : 0;
  const letterSpacing = mode === 'stagger' ? `${interpolate(progress, [0, 1], [0.18 * strength, 0.02])}em` : '0.02em';
  const fontSize = mode === 'lock' ? 200 : 104;
  const opacity = mode === 'outline' ? outlineAppear : progress;
  const color = mode === 'outline' ? `rgba(255,255,255,${outlineFill})` : '#fff';
  const webkitTextStroke = mode === 'outline' ? `${outlineStrokeWidth}px #fff` : undefined;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: transparent ? undefined : '#0d2035',
        alignItems: 'center',
        justifyContent: mode === 'lock' ? 'flex-start' : 'center',
        overflow: mode === 'lock' ? 'hidden' : undefined,
      }}
    >
      <div style={{overflow: 'hidden', padding: '0.15em 0.25em'}}>
        <div
          style={{
            opacity,
            transform: `translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`,
            letterSpacing,
            fontSize,
            fontWeight: 800,
            color,
            WebkitTextStroke: webkitTextStroke,
          }}
        >
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
  mode?: 'static' | 'push' | 'pull' | 'pan' | 'parallax';
}) {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const strength = intensityScale[intensity];
  const t = interpolate(frame, [0, Math.max(1, durationInFrames - 1)], [0, 1], {extrapolateRight: 'clamp'});

  if (mode === 'parallax') {
    const backgroundX = interpolate(t, [0, 1], [-10 * strength, 12 * strength]);
    const foregroundX = interpolate(t, [0, 1], [-54 * strength, 62 * strength]);
    const backgroundScale = 1.015 + t * 0.025 * strength;
    const foregroundScale = 1.08 + t * 0.035 * strength;
    return (
      <AbsoluteFill style={{overflow: 'hidden', backgroundColor: '#0d2035'}}>
        <AbsoluteFill style={{transform: `translateX(${backgroundX}px) scale(${backgroundScale})`}}>{children}</AbsoluteFill>
        <div
          style={{
            position: 'absolute',
            left: '10%',
            bottom: '-2%',
            width: '42%',
            height: '66%',
            overflow: 'hidden',
            clipPath: 'polygon(8% 6%, 88% 0, 100% 88%, 18% 100%, 0 42%)',
            transform: `translateX(${foregroundX}px) scale(${foregroundScale})`,
            transformOrigin: '50% 80%',
            boxShadow: '0 34px 70px rgba(0,0,0,0.38)',
          }}
        >
          <AbsoluteFill style={{left: '-18%', width: '136%', transform: `translateX(${-foregroundX * 0.22}px) scale(1.08)`, filter: 'saturate(1.08) contrast(1.04)'}}>
            {children}
          </AbsoluteFill>
        </div>
        <div
          style={{
            position: 'absolute',
            right: '9%',
            top: '16%',
            width: 170,
            height: 170,
            borderRadius: 999,
            border: '2px solid rgba(255,255,255,0.35)',
            transform: `translateX(${-foregroundX * 0.45}px) translateY(${14 - t * 28 * strength}px)`,
            opacity: 0.55,
          }}
        />
      </AbsoluteFill>
    );
  }

  const scale = mode === 'static' ? 1 : mode === 'pull' ? 1.05 - t * 0.04 * strength : 1 + t * 0.045 * strength;
  const translateX = mode === 'pan' ? interpolate(t, [0, 1], [-32 * strength, 32 * strength]) : 0;

  return <AbsoluteFill style={{transform: `translateX(${translateX}px) scale(${scale})`}}>{children}</AbsoluteFill>;
}

export function TransitionWipeEngine({
  direction = 'right',
  intensity = 'M',
  transparent = true,
  variant = 'wipe',
}: {
  direction?: 'left' | 'right' | 'up' | 'down';
  intensity?: MotionIntensity;
  transparent?: boolean;
  // 'release'は方向性のあるwipeではなく、一度color fieldへ落として呼吸するholdの表現。
  variant?: 'wipe' | 'release';
}) {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const strength = intensityScale[intensity];
  const progress = interpolate(frame, [0, Math.max(4, Math.round(fps * 0.45))], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });
  const horizontal = direction === 'left' || direction === 'right';
  const sign = direction === 'left' || direction === 'up' ? -1 : 1;
  const travel = (1 - progress) * 110 * sign;

  if (variant === 'release') {
    const inEnd = Math.round(fps * 0.35);
    const outStart = Math.max(inEnd + 1, durationInFrames - Math.round(fps * 0.45));
    const fieldOpacity = interpolate(frame, [0, inEnd, outStart, durationInFrames - 1], [0, 0.85 * strength, 0.85 * strength, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.inOut(Easing.cubic),
    });
    return (
      <AbsoluteFill style={{backgroundColor: transparent ? undefined : '#0d2035'}}>
        <AbsoluteFill style={{background: '#f0d37a', opacity: fieldOpacity}} />
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill style={{backgroundColor: transparent ? undefined : '#0d2035', overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: horizontal ? '0 auto 0 0' : '0 0 auto 0', width: horizontal ? `${Math.max(8, progress * 100)}%` : '100%', height: horizontal ? '100%' : `${Math.max(8, progress * 100)}%`, background: '#f0d37a', transform: horizontal ? `translateX(${travel * strength}%)` : `translateY(${travel * strength}%)`, opacity: 0.9}} />
      <div style={{position: 'absolute', left: '8%', right: '8%', top: '50%', height: 4, background: '#fff', transform: `scaleX(${progress})`, transformOrigin: direction === 'left' ? 'right' : 'left'}} />
    </AbsoluteFill>
  );
}

export function NativeCutEngine({
  label = 'CUT',
  variant = 'hard',
  intensity = 'M',
  transparent = false,
}: {
  label?: string;
  variant?: 'hard' | 'j-cut' | 'l-cut';
  intensity?: MotionIntensity;
  transparent?: boolean;
}) {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const strength = intensityScale[intensity];
  const cutAt = Math.round(durationInFrames / 2);
  const bedLead = variant === 'j-cut' ? Math.round(12 * strength) : variant === 'l-cut' ? -Math.round(12 * strength) : 0;
  const bedStart = cutAt - bedLead;
  const bedOpacity = interpolate(frame, [bedStart - 6, bedStart], [0, 0.55], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const isAfterCut = frame >= cutAt;

  return (
    <AbsoluteFill style={{backgroundColor: transparent ? undefined : isAfterCut ? '#173d5b' : '#0d2035', overflow: 'hidden'}}>
      <AbsoluteFill style={{background: '#f0d37a', opacity: bedOpacity}} />
      <div style={{position: 'absolute', left: 0, right: 0, top: '50%', height: 2, background: 'rgba(255,255,255,0.5)', transform: `scaleX(${frame === cutAt ? 1 : 0.4})`, transition: 'none'}} />
      <div style={{position: 'absolute', left: 90, bottom: 90, fontSize: 26, letterSpacing: '0.14em', color: '#fff', opacity: 0.85}}>
        {isAfterCut ? 'B' : 'A'} / {label}
      </div>
    </AbsoluteFill>
  );
}

export function PhotoLayoutEngine({
  variant = 'contact-sheet',
  count = 4,
  intensity = 'M',
  transparent = false,
}: {
  variant?: 'contact-sheet' | 'split-panel' | 'panel-grid';
  count?: number;
  intensity?: MotionIntensity;
  transparent?: boolean;
}) {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const strength = intensityScale[intensity];
  const panelCount = variant === 'split-panel' ? Math.min(2, Math.max(2, count)) : Math.max(2, count);
  const columns = variant === 'contact-sheet' ? Math.min(4, panelCount) : panelCount;
  const gap = 10;

  return (
    <AbsoluteFill style={{backgroundColor: transparent ? undefined : '#0d2035', padding: 24}}>
      <div style={{display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap, width: '100%', height: '100%'}}>
        {Array.from({length: panelCount}).map((_, index) => {
          const staggerStart = index * Math.round(fps * 0.08);
          const reveal = interpolate(frame, [staggerStart, staggerStart + Math.round(fps * 0.3)], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.out(Easing.cubic),
          });
          return (
            <div
              key={index}
              style={{
                border: '1px solid rgba(255,255,255,0.35)',
                background: 'rgba(255,255,255,0.06)',
                opacity: reveal,
                transform: `scale(${0.92 + reveal * 0.08 * strength})`,
              }}
            />
          );
        })}
      </div>
    </AbsoluteFill>
  );
}

export type GraphicHitVariant = 'triplet' | 'speed-lines' | 'impact' | 'stamp-line-dot' | 'scribble' | 'halftone';

export function GraphicHitEngine({
  variant = 'triplet',
  intensity = 'M',
  transparent = true,
}: {
  variant?: GraphicHitVariant;
  intensity?: MotionIntensity;
  transparent?: boolean;
}) {
  const frame = useCurrentFrame();
  const strength = intensityScale[intensity];
  const hit = (at: number) => interpolate(frame, [at - 1, at, at + 5], [0, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const reveal = (from: number, to: number) => interpolate(frame, [from, to], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});

  return (
    <AbsoluteFill style={{backgroundColor: transparent ? undefined : '#0d2035', overflow: 'hidden'}}>
      {variant === 'triplet' && [8, 16, 24].map((at, index) => (
        <div key={at} style={{position: 'absolute', left: `${24 + index * 24}%`, top: '45%', width: 76, height: 76, borderRadius: 999, border: '7px solid #f0d37a', opacity: hit(at), transform: `scale(${0.65 + hit(at) * 0.65 * strength})`}} />
      ))}

      {variant === 'stamp-line-dot' && (
        <>
          <div
            style={{
              position: 'absolute',
              left: '22%',
              top: '40%',
              width: 122,
              height: 122,
              borderRadius: 999,
              border: '8px double #f0d37a',
              color: '#f0d37a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
              fontWeight: 900,
              letterSpacing: '0.12em',
              opacity: Math.max(hit(8), frame >= 8 ? 0.62 : 0),
              transform: `rotate(-9deg) scale(${0.7 + hit(8) * 0.55 * strength})`,
            }}
          >
            START
          </div>
          <div
            style={{
              position: 'absolute',
              left: '36%',
              top: '50%',
              width: '31%',
              height: 5,
              background: '#fff',
              transformOrigin: 'left center',
              transform: `scaleX(${reveal(14, 19)})`,
              opacity: 0.9,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: '68%',
              top: 'calc(50% - 13px)',
              width: 30,
              height: 30,
              borderRadius: 999,
              background: '#f0d37a',
              boxShadow: `0 0 0 ${10 + hit(24) * 20 * strength}px rgba(240,211,122,${0.16 + hit(24) * 0.25})`,
              opacity: frame >= 22 ? 1 : 0,
              transform: `scale(${0.72 + hit(24) * 0.8 * strength})`,
            }}
          />
        </>
      )}

      {variant === 'scribble' && (
        <svg viewBox="0 0 1200 400" style={{position: 'absolute', left: '13%', top: '33%', width: '74%', height: '36%', overflow: 'visible'}}>
          <path
            d="M70 240 C170 205, 250 265, 350 228 S545 202, 640 239 S815 268, 930 216 S1060 214, 1130 236"
            fill="none"
            stroke="#f0d37a"
            strokeWidth={18 * strength}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - reveal(4, 18)}
          />
          <path
            d="M110 282 C280 254, 420 306, 565 270 S845 248, 1080 274"
            fill="none"
            stroke="rgba(255,255,255,0.78)"
            strokeWidth={7 * strength}
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - reveal(11, 24)}
          />
        </svg>
      )}

      {variant === 'halftone' && Array.from({length: 63}).map((_, index) => {
        const col = index % 9;
        const row = Math.floor(index / 9);
        const dx = col - 4;
        const dy = row - 3;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const p = reveal(3 + distance * 0.8, 12 + distance * 1.2);
        const size = Math.max(5, (24 - distance * 2.6) * strength);
        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: `calc(50% + ${dx * 76}px)`,
              top: `calc(50% + ${dy * 76}px)`,
              width: size,
              height: size,
              marginLeft: -size / 2,
              marginTop: -size / 2,
              borderRadius: 999,
              background: index % 3 === 0 ? '#f0d37a' : '#fff',
              opacity: p * (0.45 + 0.45 * strength),
              transform: `scale(${0.25 + p * 1.35})`,
            }}
          />
        );
      })}

      {variant === 'speed-lines' && Array.from({length: 12}).map((_, index) => {
        const progress = interpolate(frame, [0, 12], [0, 1], {extrapolateRight: 'clamp'});
        return <div key={index} style={{position: 'absolute', left: `${-10 + index * 9}%`, top: `${8 + (index % 6) * 15}%`, width: `${18 + (index % 3) * 8}%`, height: 3, background: '#fff', opacity: 0.18 + 0.5 * strength, transform: `translateX(${progress * 180 * strength}px) rotate(-8deg)`}} />;
      })}
      {variant === 'impact' && <AbsoluteFill style={{background: '#fff', opacity: hit(8) * 0.75 * strength}} />}
    </AbsoluteFill>
  );
}
