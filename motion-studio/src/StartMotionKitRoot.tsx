import {Composition} from 'remotion';
import {
  StartMotionOverlayPreview,
  StartMotionReel,
  startMotionReelDurationFrames,
} from './compositions/common/StartMotionReel';
import {VisualMotionMaskRevealConcept} from './compositions/common/VisualMotionMaskRevealConcept';

export function StartMotionKitRoot() {
  return (
    <>
      <Composition
        id="StaRtMotionReelV1"
        component={StartMotionReel}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={startMotionReelDurationFrames}
      />
      <Composition
        id="StaRtMotionOverlayPreview"
        component={StartMotionOverlayPreview}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={60}
      />
      <Composition
        id="VisualMotionMaskRevealConceptV1"
        component={VisualMotionMaskRevealConcept}
        width={1280}
        height={720}
        fps={30}
        durationInFrames={120}
      />
    </>
  );
}
