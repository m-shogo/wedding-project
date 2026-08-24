import {Composition} from 'remotion';
import {
  StartMotionOverlayPreview,
  StartMotionReel,
  startMotionReelDurationFrames,
} from './compositions/common/StartMotionReel';

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
    </>
  );
}
