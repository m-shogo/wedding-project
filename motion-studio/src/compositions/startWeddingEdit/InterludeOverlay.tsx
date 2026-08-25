// 2番サビ後の間奏(114.0-145.6s)。5つのbeatのうち、
// welcome/names/endにテキストoverlayを足す。montage/routeは
// 写真shot(storyboard.ts)自体が演出のため、overlayは無し。

import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import type {WeddingVariant} from '../../data/startWeddingEdit/storyboard';
import {HandDrawnUnderline} from '../../motion-kit/start129/handDrawnPrimitives';

const JP = "'Noto Sans JP', sans-serif";

const fadeInOut = (frame: number, dur: number) =>
  interpolate(frame, [0, 10, dur - 12, dur], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

const WelcomeText: React.FC<{variant: WeddingVariant}> = ({variant}) => {
  const frame = useCurrentFrame();
  const o = fadeInOut(frame, 180); // 6.0s@30fps
  const s = interpolate(frame, [0, 14], [0.85, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const color = variant === 'C' ? '#0A0A0C' : '#FFFDF7';
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', pointerEvents: 'none'}}>
      <AbsoluteFill style={{background: variant === 'C' ? 'transparent' : 'radial-gradient(ellipse at center, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 75%)'}} />
      <div style={{opacity: o, transform: `scale(${s})`, textAlign: 'center', zIndex: 2}}>
        <div style={{fontFamily: JP, fontSize: variant === 'B' ? 84 : 66, fontWeight: variant === 'B' ? 900 : 500, color, textShadow: variant === 'C' ? 'none' : '0 3px 16px rgba(0,0,0,0.5)'}}>
          ようこそ
        </div>
        <div style={{marginTop: 12, fontFamily: JP, fontSize: 24, fontWeight: 500, color}}>
          本日はお越しいただき、誠にありがとうございます
        </div>
        {variant === 'B' ? (
          <div style={{display: 'flex', justifyContent: 'center', marginTop: 6}}>
            <HandDrawnUnderline progressFrom={10} progressDurationInFrames={16} width={300} />
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};

const NamesText: React.FC<{variant: WeddingVariant}> = ({variant}) => {
  const frame = useCurrentFrame();
  const o = fadeInOut(frame, 120); // 4.0s
  const color = variant === 'C' ? '#0A0A0C' : '#FFFDF7';
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', pointerEvents: 'none'}}>
      <AbsoluteFill style={{background: variant === 'C' ? 'transparent' : 'radial-gradient(ellipse at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 75%)'}} />
      <div style={{opacity: o, textAlign: 'center', zIndex: 2}}>
        <div style={{fontFamily: JP, fontSize: variant === 'B' ? 62 : 48, fontWeight: 700, color}}>SHOGO &amp; SHIORI</div>
        <div style={{marginTop: 10, fontFamily: JP, fontSize: 22, fontWeight: 500, letterSpacing: '0.1em', color}}>2026.10.24 YOKOHAMA</div>
      </div>
    </AbsoluteFill>
  );
};

const EndLockup: React.FC<{variant: WeddingVariant}> = ({variant}) => {
  const frame = useCurrentFrame();
  const dur = 108; // 3.6s
  const o = interpolate(frame, [0, 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const s = interpolate(frame, [0, 18], [0.9, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const color = variant === 'C' ? '#0A0A0C' : '#FFFDF7';
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', pointerEvents: 'none'}}>
      <div style={{opacity: o, transform: `scale(${s})`, textAlign: 'center'}}>
        <div style={{fontFamily: JP, fontSize: variant === 'B' ? 74 : 56, fontWeight: 900, color, letterSpacing: '0.02em'}}>
          ようこそ、二人のStaRtへ
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const InterludeOverlay: React.FC<{sectionId: string; variant: WeddingVariant}> = ({sectionId, variant}) => {
  if (sectionId === 'interlude-welcome') return <WelcomeText variant={variant} />;
  if (sectionId === 'interlude-names') return <NamesText variant={variant} />;
  if (sectionId === 'interlude-end') return <EndLockup variant={variant} />;
  return null;
};
