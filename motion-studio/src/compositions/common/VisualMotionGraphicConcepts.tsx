import {AbsoluteFill} from 'remotion';
import {GraphicHitEngine, type GraphicHitVariant} from '../../motion-kit/engines';

function GraphicConcept({variant, label, intensity = 'M'}: {variant: GraphicHitVariant; label: string; intensity?: 'S' | 'M' | 'L'}) {
  return (
    <AbsoluteFill style={{background: 'linear-gradient(135deg, #071523 0%, #102b42 58%, #1b4058 100%)'}}>
      <GraphicHitEngine variant={variant} intensity={intensity} transparent />
      <div style={{position: 'absolute', left: 28, bottom: 24, padding: '8px 12px', background: 'rgba(5,18,31,0.76)', color: '#f0d37a', fontFamily: 'Arial, sans-serif', fontSize: 15, letterSpacing: '0.12em'}}>{label} · REPO RENDER</div>
    </AbsoluteFill>
  );
}

export const VisualMotionSpeedLinesV1 = () => <GraphicConcept variant="speed-lines" label="SPEED LINES" />;
export const VisualMotionStampTripletV1 = () => <GraphicConcept variant="triplet" label="STAMP TRIPLET" intensity="L" />;
export const VisualMotionHalftoneBurstV1 = () => <GraphicConcept variant="halftone" label="HALFTONE BURST" />;
export const VisualMotionScribbleUnderlineV1 = () => <GraphicConcept variant="scribble" label="SCRIBBLE UNDERLINE" />;
export const VisualMotionImpactFrameV1 = () => <GraphicConcept variant="impact" label="IMPACT FRAME" intensity="L" />;
export const VisualMotionCelShadowSweepV1 = () => <GraphicConcept variant="cel-shadow" label="CEL SHADOW SWEEP" />;
export const VisualMotionMicroRgbSplitV1 = () => <GraphicConcept variant="rgb-split" label="MICRO RGB SPLIT" />;
