import {AbsoluteFill} from 'remotion';
import {TypographyRevealEngine, type MotionIntensity, type TypographyRevealMode} from '../../motion-kit/engines';

function TypographyConcept({mode, text, label, intensity = 'M', transparentBackground = false}: {mode: TypographyRevealMode; text: string; label: string; intensity?: MotionIntensity; transparentBackground?: boolean}) {
  return (
    <AbsoluteFill style={{background: transparentBackground ? 'transparent' : 'linear-gradient(135deg, #071523 0%, #102b42 58%, #1b4058 100%)'}}>
      <TypographyRevealEngine mode={mode} text={text} intensity={intensity} transparent />
      <div style={{position: 'absolute', left: 28, bottom: 24, padding: '8px 12px', background: 'rgba(5,18,31,0.76)', color: '#f0d37a', fontFamily: 'Arial, sans-serif', fontSize: 15, letterSpacing: '0.12em'}}>
        {label} · REPO RENDER
      </div>
    </AbsoluteFill>
  );
}

export type WeddingSceneTypographyCandidateProps = {
  text: string;
  mode: TypographyRevealMode;
  intensity: MotionIntensity;
  label: string;
  transparentBackground?: boolean;
};

export function WeddingSceneTypographyCandidateV1({
  text,
  mode,
  intensity,
  label,
  transparentBackground = false,
}: WeddingSceneTypographyCandidateProps) {
  return <TypographyConcept mode={mode} text={text} label={label} intensity={intensity} transparentBackground={transparentBackground} />;
}

export function VisualMotionWordPunchV1() {
  return <TypographyConcept mode="punch" text="START" label="WORD PUNCH" intensity="L" />;
}

export function VisualMotionCharacterStaggerV1() {
  return <TypographyConcept mode="stagger" text="JOURNEY" label="CHARACTER STAGGER" />;
}

export function VisualMotionTrackingBurstV1() {
  return <TypographyConcept mode="tracking" text="ARRIVAL" label="TRACKING BURST" />;
}

export function VisualMotionQuietCaptionV1() {
  return <TypographyConcept mode="quiet" text="THANK YOU" label="QUIET CAPTION" intensity="S" />;
}

export function VisualMotionBaselineHopV1() {
  return <TypographyConcept mode="hop" text="HOP" label="BASELINE HOP" />;
}

export function VisualMotionOutlineFillV1() {
  return <TypographyConcept mode="outline" text="MEMORY" label="OUTLINE TO FILL" />;
}

export function VisualMotionVerticalWipeV1() {
  return <TypographyConcept mode="vertical-wipe" text="CHAPTER" label="VERTICAL WIPE" />;
}

export function VisualMotionTypeOnRhythmV1() {
  return <TypographyConcept mode="word-stagger" text="OUR JOURNEY" label="TYPE ON RHYTHM" />;
}

export function VisualMotionFrameLockV1() {
  return <TypographyConcept mode="lock" text="YOKOHAMA" label="FRAME LOCK" intensity="L" />;
}

export function VisualMotionTripletTypeV1() {
  return <TypographyConcept mode="triplet" text="GO" label="TRIPLET TYPE" intensity="L" />;
}

export function VisualMotionCounterScrollV1() {
  return <TypographyConcept mode="counter-scroll" text="YOKOHAMA → HAWAII" label="COUNTER SCROLL" />;
}
