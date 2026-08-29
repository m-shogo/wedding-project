import {AbsoluteFill} from 'remotion';
import {
  TransitionWipeEngine,
  type TransitionWipeDirection,
  type TransitionWipeVariant,
} from '../../motion-kit/engines';

function TransitionConcept({variant, direction, label, intensity = 'M'}: {variant: TransitionWipeVariant; direction?: TransitionWipeDirection; label: string; intensity?: 'S' | 'M' | 'L'}) {
  return (
    <AbsoluteFill style={{background: 'linear-gradient(135deg, #071523 0%, #102b42 58%, #1b4058 100%)'}}>
      <TransitionWipeEngine variant={variant} direction={direction} intensity={intensity} transparent />
      <div style={{position: 'absolute', left: 28, bottom: 24, padding: '8px 12px', background: 'rgba(5,18,31,0.76)', color: '#f0d37a', fontFamily: 'Arial, sans-serif', fontSize: 15, letterSpacing: '0.12em'}}>
        {label} · REPO RENDER
      </div>
    </AbsoluteFill>
  );
}

export const VisualMotionRouteLineV1 = () => <TransitionConcept variant="route-line" direction="right" label="ROUTE LINE WIPE" />;
export const VisualMotionSoftFlashV1 = () => <TransitionConcept variant="flash" label="SOFT IMPACT FRAME" intensity="S" />;
export const VisualMotionDirectionalShapeV1 = () => <TransitionConcept variant="shape" direction="right" label="DIRECTIONAL SHAPE WIPE" />;
export const VisualMotionPaperEdgeV1 = () => <TransitionConcept variant="paper" direction="left" label="PAPER EDGE WIPE" />;
export const VisualMotionColorFieldReleaseV1 = () => <TransitionConcept variant="release" label="COLOR FIELD RELEASE" />;
