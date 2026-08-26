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
  mode?: 'mask' | 'punch' | 'stagger' | 'hop' | 'lock' | 'outline' | 'tracking' | 'triplet' | 'vertical-wipe' | 'word-stagger' | 'counter-scroll';
  transparent?: boolean;
}) {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const strength = intensityScale[intensity];
  const progress = interpolate(frame, [0, Math.round(fps * 0.5)], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  // tripletは3拍(3-hit)で文字を叩き込む表現。GraphicHitEngineのtripletとは別実装
  // (こちらは文字自体をscaleで3回パンチする)。
  const tripletHitFrames = [Math.round(fps * 0.12), Math.round(fps * 0.12) + 6, Math.round(fps * 0.12) + 12];
  const tripletPulse = (hitFrame: number) => Math.max(0, 1 - (frame - hitFrame) / 6);
  const tripletScale = mode === 'triplet' ? 1 + 0.25 * strength * tripletHitFrames.reduce((sum, h) => sum + (frame >= h ? tripletPulse(h) : 0), 0) : 1;
  const tripletOpacity = mode === 'triplet' ? interpolate(frame, [tripletHitFrames[0] - 2, tripletHitFrames[0]], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) : 1;
  // vertical-wipeはclip-pathで上から下へ物理的に切り出す(maskのtranslateYスライドとは別)。
  const verticalWipeClip = mode === 'vertical-wipe' ? `inset(${(1 - progress) * 100}% 0 0 0)` : undefined;
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

  const scale = mode === 'punch' ? interpolate(progress, [0, 1], [1 + 0.18 * strength, 1]) : mode === 'triplet' ? tripletScale : 1;
  const translateY =
    mode === 'mask' ? (1 - progress) * 80 * strength : mode === 'hop' ? (1 - hopProgress) * -90 * strength : 0;
  const translateX = mode === 'lock' ? 130 * strength : 0;
  // trackingは字間burst(type-tracking-burst)。stagger(type-char-stagger)は
  // 下の文字単位reveal(charProgress)で表現するため、letterSpacingは動かさない。
  const letterSpacing = mode === 'tracking' ? `${interpolate(progress, [0, 1], [0.18 * strength, 0.02])}em` : '0.02em';
  const fontSize = mode === 'lock' ? 200 : 104;
  const opacity = mode === 'outline' ? outlineAppear : mode === 'triplet' ? tripletOpacity : mode === 'vertical-wipe' ? 1 : progress;
  const color = mode === 'outline' ? `rgba(255,255,255,${outlineFill})` : '#fff';
  const webkitTextStroke = mode === 'outline' ? `${outlineStrokeWidth}px #fff` : undefined;

  if (mode === 'word-stagger') {
    // type-type-on-rhythmは「文字単位」ではなく「語単位」で音の区切りに合わせて現す
    // ため、char-stagger(1文字ずつ)とは分割単位が異なる別実装にする。
    const words = text.split(' ');
    const perWordDelay = Math.round(fps * 0.22);
    const wordDuration = Math.round(fps * 0.32);
    return (
      <AbsoluteFill style={{backgroundColor: transparent ? undefined : '#0d2035', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{display: 'flex', padding: '0.15em 0.25em'}}>
          {words.map((word, index) => {
            const start = index * perWordDelay;
            const wordProgress = interpolate(frame, [start, start + wordDuration], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.out(Easing.cubic),
            });
            return (
              <span
                key={`${word}-${index}`}
                style={{
                  display: 'inline-block',
                  opacity: wordProgress,
                  transform: `translateY(${(1 - wordProgress) * 30 * strength}px)`,
                  fontSize,
                  fontWeight: 800,
                  color: '#fff',
                  whiteSpace: 'pre',
                  // flexのgapではなくmarginRightで語間を確保する(空文字ではなく
                  // 実際のスペース幅を確実に取るため)。
                  marginRight: index < words.length - 1 ? '0.35em' : 0,
                }}
              >
                {word}
              </span>
            );
          })}
        </div>
      </AbsoluteFill>
    );
  }

  if (mode === 'counter-scroll') {
    // 背景の移動と逆向きに、テキストが画面全体を横切り続けるmarquee的な動き。
    // maskやstaggerのような「1回reveal」ではなく、clip全体で継続する速度差の表現。
    const scrollX = interpolate(frame, [0, Math.max(1, durationInFrames - 1)], [40 * strength, -140 * strength]);
    return (
      <AbsoluteFill style={{backgroundColor: transparent ? undefined : '#0d2035', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}}>
        <div
          style={{
            whiteSpace: 'nowrap',
            transform: `translateX(${scrollX}%)`,
            fontSize,
            fontWeight: 800,
            color: '#fff',
            letterSpacing: '0.04em',
          }}
        >
          {text}
        </div>
      </AbsoluteFill>
    );
  }

  if (mode === 'stagger') {
    const perCharDelay = Math.round(fps * 0.06);
    const charDuration = Math.round(fps * 0.28);
    return (
      <AbsoluteFill style={{backgroundColor: transparent ? undefined : '#0d2035', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{display: 'flex', padding: '0.15em 0.25em'}}>
          {text.split('').map((char, index) => {
            const start = index * perCharDelay;
            const charProgress = interpolate(frame, [start, start + charDuration], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.out(Easing.cubic),
            });
            return (
              <span
                key={`${char}-${index}`}
                style={{
                  display: 'inline-block',
                  opacity: charProgress,
                  transform: `translateY(${(1 - charProgress) * 40 * strength}px)`,
                  fontSize,
                  fontWeight: 800,
                  color: '#fff',
                  whiteSpace: 'pre',
                }}
              >
                {char}
              </span>
            );
          })}
        </div>
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill
      style={{
        backgroundColor: transparent ? undefined : '#0d2035',
        alignItems: 'center',
        justifyContent: mode === 'lock' ? 'flex-start' : 'center',
        overflow: mode === 'lock' ? 'hidden' : undefined,
      }}
    >
      <div style={{overflow: 'hidden', padding: '0.15em 0.25em', clipPath: verticalWipeClip}}>
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
  mode?: 'static' | 'push' | 'pull' | 'pan' | 'parallax' | 'freeze';
}) {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const strength = intensityScale[intensity];
  const t = interpolate(frame, [0, Math.max(1, durationInFrames - 1)], [0, 1], {extrapolateRight: 'clamp'});

  if (mode === 'freeze') {
    // photo-freeze-cutout: カメラは完全に静止(static)させたまま、hitタイミングで
    // 実素材cutoutを模した角のあるgraphic frameとlabelを1回だけ叩き込む。
    // camera-transform自体の「動き」ではなく、静止画に対するgraphic accentの追加。
    //
    // 最初の実装ではclip-path(角を斜めに欠いた四角形)をborderに適用していたが、
    // 頂点がbox端とほぼ1点でしか接しないshapeだったため、border全体がほぼ
    // クリップされて見えなくなるバグがあった(実render確認で発見)。四隅だけ
    // 三角形の切り欠き(notch)を入れるshapeへ変更し、辺の大部分はborderが
    // 確実に見えるようにした。
    const hitFrame = 8;
    const hitPulse = Math.max(0, 1 - (frame - hitFrame) / 10);
    const cutoutScale = frame >= hitFrame ? 0.86 + hitPulse * 0.3 * strength : 0.86;
    const cutoutOpacity = interpolate(frame, [hitFrame - 2, hitFrame], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
    const notchedFrame =
      'polygon(0 6%, 6% 0, 94% 0, 100% 6%, 100% 94%, 94% 100%, 6% 100%, 0 94%)';
    return (
      <AbsoluteFill style={{overflow: 'hidden'}}>
        {children}
        <div
          style={{
            position: 'absolute',
            inset: '4%',
            border: '10px solid #fff',
            clipPath: notchedFrame,
            opacity: cutoutOpacity * 0.9,
            transform: `scale(${cutoutScale})`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 110,
            bottom: 150,
            fontSize: 26,
            fontWeight: 900,
            letterSpacing: '0.1em',
            color: '#fff',
            background: '#f0d37a',
            padding: '6px 16px',
            opacity: cutoutOpacity,
            transform: `translateY(${(1 - cutoutOpacity) * 20}px)`,
          }}
        >
          FREEZE
        </div>
      </AbsoluteFill>
    );
  }

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
  // 'shape'は矩形の色面ではなく、角のある図形(chevron)そのものが横切る表現。
  // 'paper'は紙が破れたようなジグザグの端を持つ色面が横切る表現。
  variant?: 'wipe' | 'release' | 'shape' | 'paper';
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

  if (variant === 'paper') {
    const paperProgress = interpolate(frame, [0, Math.max(4, Math.round(fps * 0.55))], [0, 1], {
      extrapolateRight: 'clamp',
      easing: Easing.inOut(Easing.cubic),
    });
    const paperTravel = (1 - paperProgress) * 130 * sign * strength;
    // 振幅を大きく(65%〜100%)取ることで、sweepのどの瞬間でも紙が破れたような
    // ジグザグが画面上で確実に視認できるようにする(小さな振幅では境界の位置に
    // よって見えたり見えなかったりしてしまうため)。
    const jaggedRightEdge =
      'polygon(0 0, 70% 0, 100% 8%, 68% 16%, 100% 24%, 66% 32%, 100% 40%, 68% 48%, 100% 56%, 66% 64%, 100% 72%, 68% 80%, 100% 88%, 70% 100%, 0 100%)';
    const jaggedBottomEdge =
      'polygon(0 0, 100% 0, 100% 70%, 92% 100%, 84% 68%, 76% 100%, 68% 66%, 60% 100%, 52% 68%, 44% 100%, 36% 66%, 28% 100%, 20% 68%, 12% 100%, 0 70%)';
    return (
      <AbsoluteFill style={{backgroundColor: transparent ? undefined : '#0d2035', overflow: 'hidden'}}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: '#f0d37a',
            opacity: 0.95,
            clipPath: horizontal ? jaggedRightEdge : jaggedBottomEdge,
            transform: horizontal ? `translateX(${paperTravel}%)` : `translateY(${paperTravel}%)`,
          }}
        />
      </AbsoluteFill>
    );
  }

  if (variant === 'shape') {
    const shapeProgress = interpolate(frame, [0, Math.max(4, Math.round(fps * 0.55))], [0, 1], {
      extrapolateRight: 'clamp',
      easing: Easing.inOut(Easing.cubic),
    });
    const shapeTravel = (1 - shapeProgress) * 130 * sign * strength;
    return (
      <AbsoluteFill style={{backgroundColor: transparent ? undefined : '#0d2035', overflow: 'hidden'}}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: '#f0d37a',
            opacity: 0.95,
            clipPath: horizontal
              ? 'polygon(0 0, 68% 0, 100% 50%, 68% 100%, 0 100%)'
              : 'polygon(0 0, 100% 0, 100% 68%, 50% 100%, 0 68%)',
            transform: horizontal ? `translateX(${shapeTravel}%)` : `translateY(${shapeTravel}%)`,
          }}
        />
      </AbsoluteFill>
    );
  }

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

// panel-grid(コマ割り)は4枚の時だけ非対称レイアウトにする。それ以外の枚数は
// contact-sheetと同じ均等grid(近似)にfallbackし、その旨をコメントで明記する。
const PANEL_GRID_AREAS_FOR_FOUR = ['a', 'b', 'c', 'd'];
const PANEL_GRID_TEMPLATE_AREAS_FOR_FOUR = '"a a b" "a a c" "d d d"';

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
  const isPanelGrid = variant === 'panel-grid';
  const useAsymmetricPanelGrid = isPanelGrid && panelCount === 4;
  const columns = variant === 'contact-sheet' ? Math.min(4, panelCount) : useAsymmetricPanelGrid ? 3 : panelCount;
  const gap = isPanelGrid ? 6 : 10;

  return (
    <AbsoluteFill style={{backgroundColor: transparent ? undefined : '#0d2035', padding: 24}}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridTemplateRows: useAsymmetricPanelGrid ? 'repeat(3, 1fr)' : undefined,
          gridTemplateAreas: useAsymmetricPanelGrid ? PANEL_GRID_TEMPLATE_AREAS_FOR_FOUR : undefined,
          gap,
          width: '100%',
          height: '100%',
        }}
      >
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
                gridArea: useAsymmetricPanelGrid ? PANEL_GRID_AREAS_FOR_FOUR[index] : undefined,
                border: isPanelGrid ? '3px solid #fff' : '1px solid rgba(255,255,255,0.35)',
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

export type GraphicHitVariant = 'triplet' | 'speed-lines' | 'impact' | 'stamp-line-dot' | 'scribble' | 'halftone' | 'cel-shadow' | 'rgb-split';

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

      {variant === 'cel-shadow' && (() => {
        // accent-cel-shadow-sweep: flatなアニメ風の影shapeが斜めに画面を横切り、
        // 通過中だけsection colorを暗く落とす(顔の上に長く影を置かない設計)。
        // 最初の実装ではnavy背景に近い暗さの影色(rgba(6,14,26,...))を使ったため、
        // 元のnavy gradient backdropとほぼ同化してしまい、実render確認では
        // 「ほぼ見えない」ことが判明した。純黒+高不透明度へ変更しコントラストを確保。
        const sweepProgress = interpolate(frame, [2, 20], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)});
        const sweepX = interpolate(sweepProgress, [0, 1], [-60, 160]);
        const tintOpacity = interpolate(frame, [2, 8, 16, 22], [0, 0.45 * strength, 0.45 * strength, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        return (
          <>
            <AbsoluteFill style={{background: '#000', opacity: tintOpacity}} />
            <div
              style={{
                position: 'absolute',
                top: '-20%',
                left: `${sweepX}%`,
                width: '55%',
                height: '140%',
                background: 'rgba(0,0,0,0.85)',
                clipPath: 'polygon(0 0, 60% 0, 30% 100%, -30% 100%)',
              }}
            />
          </>
        );
      })()}

      {variant === 'rgb-split' && (() => {
        // accent-micro-rgb-split: 2〜6frameだけRGB各chをずらして表示するglitch。
        // 常時glitchにしないため、hit直後のごく短い窓(frame4-8)だけ有効にする。
        const active = frame >= 4 && frame <= 8;
        const splitAmount = active ? (1 - Math.abs(frame - 6) / 2) * 14 * strength : 0;
        if (!active) return null;
        return (
          <>
            <div style={{position: 'absolute', inset: 0, background: 'rgba(255,0,60,0.55)', mixBlendMode: 'screen', transform: `translateX(${-splitAmount}px)`}} />
            <div style={{position: 'absolute', inset: 0, background: 'rgba(0,255,180,0.5)', mixBlendMode: 'screen', transform: `translateX(${splitAmount}px)`}} />
            <div style={{position: 'absolute', left: '18%', right: '18%', top: '46%', height: 3, background: '#fff', opacity: 0.85}} />
          </>
        );
      })()}
    </AbsoluteFill>
  );
}
