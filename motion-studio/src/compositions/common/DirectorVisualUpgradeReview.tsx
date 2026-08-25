import type {ReactNode} from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {CameraTransformEngine, GraphicHitEngine} from '../../motion-kit/engines';

const SEGMENT_FRAMES = 75;

function ReviewPlate({title, subtitle, children}: {title: string; subtitle: string; children: ReactNode}) {
  return (
    <AbsoluteFill style={{background: '#0d2035', color: '#fff', overflow: 'hidden'}}>
      <AbsoluteFill>{children}</AbsoluteFill>
      <div style={{position: 'absolute', left: 64, top: 52, fontSize: 18, letterSpacing: '0.14em', opacity: 0.62}}>START VISUAL UPGRADE REVIEW</div>
      <div style={{position: 'absolute', left: 64, bottom: 76, fontSize: 34, fontWeight: 800}}>{title}</div>
      <div style={{position: 'absolute', left: 64, bottom: 46, fontSize: 17, opacity: 0.68}}>{subtitle}</div>
    </AbsoluteFill>
  );
}

function SyntheticTravelBackdrop() {
  return (
    <AbsoluteFill style={{background: 'linear-gradient(145deg,#102940 0%,#2c6074 55%,#d0b66d 100%)'}}>
      <div style={{position: 'absolute', left: '12%', top: '18%', width: '58%', height: '55%', border: '2px solid rgba(255,255,255,0.32)', borderRadius: 22}} />
      <div style={{position: 'absolute', left: '18%', top: '27%', fontSize: 74, fontWeight: 900, color: '#fff', letterSpacing: '-0.035em'}}>HAWAII</div>
      <div style={{position: 'absolute', left: '18%', top: '42%', width: '34%', height: 4, background: 'rgba(255,255,255,0.76)'}} />
      <div style={{position: 'absolute', left: '18%', top: '47%', fontSize: 23, color: '#fff', opacity: 0.8}}>TRAVEL MEMORY / HERO PHOTO DEMO</div>
    </AbsoluteFill>
  );
}

export function DirectorVisualUpgradeReview() {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={SEGMENT_FRAMES}>
        <ReviewPlate title="01 / STAMP → LINE → ROUTE DOT" subtitle="StaRt chorus 3-hit / same Hero photo stays on screen">
          <SyntheticTravelBackdrop />
          <GraphicHitEngine variant="stamp-line-dot" intensity="L" transparent />
        </ReviewPlate>
      </Sequence>

      <Sequence from={SEGMENT_FRAMES} durationInFrames={SEGMENT_FRAMES}>
        <ReviewPlate title="02 / SCRIBBLE UNDERLINE" subtitle="one hand-drawn accent; not a generic circle triplet">
          <SyntheticTravelBackdrop />
          <GraphicHitEngine variant="scribble" intensity="M" transparent />
        </ReviewPlate>
      </Sequence>

      <Sequence from={SEGMENT_FRAMES * 2} durationInFrames={SEGMENT_FRAMES}>
        <ReviewPlate title="03 / HALFTONE BURST" subtitle="short anime-OP texture accent around a static Hero">
          <SyntheticTravelBackdrop />
          <GraphicHitEngine variant="halftone" intensity="M" transparent />
        </ReviewPlate>
      </Sequence>

      <Sequence from={SEGMENT_FRAMES * 3} durationInFrames={SEGMENT_FRAMES}>
        <ReviewPlate title="04 / 2.5D PARALLAX DEMO" subtitle="synthetic separated depth layers; real photo later needs a proper mask">
          <CameraTransformEngine mode="parallax" intensity="M">
            <SyntheticTravelBackdrop />
          </CameraTransformEngine>
        </ReviewPlate>
      </Sequence>
    </AbsoluteFill>
  );
}

export const directorVisualUpgradeReviewFrames = SEGMENT_FRAMES * 4;
