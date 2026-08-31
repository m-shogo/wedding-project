import {Composition} from 'remotion';
import {
  StartMotionOverlayPreview,
  StartMotionReel,
  startMotionReelDurationFrames,
} from './compositions/common/StartMotionReel';
import {VisualMotionMaskRevealConcept} from './compositions/common/VisualMotionMaskRevealConcept';
import {
  VisualMotionContactSheetStockV1,
  VisualMotionPanelGridStockV1,
  VisualMotionSplitPanelStockV1,
} from './compositions/common/VisualMotionPhotoLayouts';
import {
  VisualMotionBaselineHopV1,
  VisualMotionCharacterStaggerV1,
  VisualMotionCounterScrollV1,
  VisualMotionFrameLockV1,
  VisualMotionOutlineFillV1,
  VisualMotionQuietCaptionV1,
  VisualMotionTrackingBurstV1,
  VisualMotionTripletTypeV1,
  VisualMotionTypeOnRhythmV1,
  VisualMotionVerticalWipeV1,
  VisualMotionWordPunchV1,
} from './compositions/common/VisualMotionTypographyConcepts';
import {
  VisualMotionDirectionalPanStockV1,
  VisualMotionFreezeCutoutStockV1,
  VisualMotionGentlePushStockV1,
  VisualMotionParallaxStockV1,
  VisualMotionSlowPullStockV1,
  VisualMotionStaticHeroStockV1,
} from './compositions/common/VisualMotionPhotoConcepts';
import {
  VisualMotionColorFieldReleaseV1,
  VisualMotionDirectionalShapeV1,
  VisualMotionPaperEdgeV1,
  VisualMotionRouteLineV1,
  VisualMotionSoftFlashV1,
} from './compositions/common/VisualMotionTransitionConcepts';
import {
  VisualMotionCelShadowSweepV1,
  VisualMotionHalftoneBurstV1,
  VisualMotionImpactFrameV1,
  VisualMotionMicroRgbSplitV1,
  VisualMotionScribbleUnderlineV1,
  VisualMotionSpeedLinesV1,
  VisualMotionStampTripletV1,
} from './compositions/common/VisualMotionGraphicConcepts';
import {
  VisualMotionHardAccentConceptV1,
  VisualMotionMatchShapeConceptV1,
  VisualMotionWhipSourceMatchedConceptV1,
} from './compositions/common/VisualMotionSourceCutConcepts';
import {
  MotionZukanStockDemo,
  MotionZukanDummyProduction,
  motionZukanDummyProductionDurationFrames,
  motionZukanStockDemoDurationFrames,
} from './compositions/common/MotionZukanStockDemo';
import {JapaneseFriendsOpening} from './compositions/common/JapaneseFriendsOpening';
import {JapaneseFriendsOpeningStartSync} from './compositions/common/JapaneseFriendsOpeningStartSync';
import {japaneseFriendsOpeningDurationFrames} from './data/japaneseFriendsOpeningStory';
import {startWeddingEditDurationInFrames} from './data/startWeddingEditPublic';

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
      <Composition
        id="VisualMotionStaticHeroStockV1"
        component={VisualMotionStaticHeroStockV1}
        width={1280}
        height={720}
        fps={30}
        durationInFrames={120}
      />
      <Composition
        id="VisualMotionGentlePushStockV1"
        component={VisualMotionGentlePushStockV1}
        width={1280}
        height={720}
        fps={30}
        durationInFrames={120}
      />
      <Composition
        id="VisualMotionDirectionalPanStockV1"
        component={VisualMotionDirectionalPanStockV1}
        width={1280}
        height={720}
        fps={30}
        durationInFrames={120}
      />
      <Composition
        id="VisualMotionSlowPullStockV1"
        component={VisualMotionSlowPullStockV1}
        width={1280}
        height={720}
        fps={30}
        durationInFrames={120}
      />
      <Composition
        id="VisualMotionParallaxStockV1"
        component={VisualMotionParallaxStockV1}
        width={1280}
        height={720}
        fps={30}
        durationInFrames={120}
      />
      <Composition
        id="VisualMotionFreezeCutoutStockV1"
        component={VisualMotionFreezeCutoutStockV1}
        width={1280}
        height={720}
        fps={30}
        durationInFrames={120}
      />
      <Composition id="VisualMotionContactSheetStockV1" component={VisualMotionContactSheetStockV1} width={1280} height={720} fps={30} durationInFrames={120} />
      <Composition id="VisualMotionSplitPanelStockV1" component={VisualMotionSplitPanelStockV1} width={1280} height={720} fps={30} durationInFrames={120} />
      <Composition id="VisualMotionPanelGridStockV1" component={VisualMotionPanelGridStockV1} width={1280} height={720} fps={30} durationInFrames={120} />
      <Composition id="VisualMotionWordPunchV1" component={VisualMotionWordPunchV1} width={1280} height={720} fps={30} durationInFrames={120} />
      <Composition id="VisualMotionCharacterStaggerV1" component={VisualMotionCharacterStaggerV1} width={1280} height={720} fps={30} durationInFrames={120} />
      <Composition id="VisualMotionTrackingBurstV1" component={VisualMotionTrackingBurstV1} width={1280} height={720} fps={30} durationInFrames={120} />
      <Composition id="VisualMotionQuietCaptionV1" component={VisualMotionQuietCaptionV1} width={1280} height={720} fps={30} durationInFrames={120} />
      <Composition id="VisualMotionBaselineHopV1" component={VisualMotionBaselineHopV1} width={1280} height={720} fps={30} durationInFrames={120} />
      <Composition id="VisualMotionOutlineFillV1" component={VisualMotionOutlineFillV1} width={1280} height={720} fps={30} durationInFrames={120} />
      <Composition id="VisualMotionVerticalWipeV1" component={VisualMotionVerticalWipeV1} width={1280} height={720} fps={30} durationInFrames={120} />
      <Composition id="VisualMotionTypeOnRhythmV1" component={VisualMotionTypeOnRhythmV1} width={1280} height={720} fps={30} durationInFrames={120} />
      <Composition id="VisualMotionFrameLockV1" component={VisualMotionFrameLockV1} width={1280} height={720} fps={30} durationInFrames={120} />
      <Composition id="VisualMotionTripletTypeV1" component={VisualMotionTripletTypeV1} width={1280} height={720} fps={30} durationInFrames={120} />
      <Composition id="VisualMotionCounterScrollV1" component={VisualMotionCounterScrollV1} width={1280} height={720} fps={30} durationInFrames={120} />
      <Composition id="VisualMotionRouteLineV1" component={VisualMotionRouteLineV1} width={1280} height={720} fps={30} durationInFrames={120} />
      <Composition id="VisualMotionSoftFlashV1" component={VisualMotionSoftFlashV1} width={1280} height={720} fps={30} durationInFrames={120} />
      <Composition id="VisualMotionDirectionalShapeV1" component={VisualMotionDirectionalShapeV1} width={1280} height={720} fps={30} durationInFrames={120} />
      <Composition id="VisualMotionPaperEdgeV1" component={VisualMotionPaperEdgeV1} width={1280} height={720} fps={30} durationInFrames={120} />
      <Composition id="VisualMotionColorFieldReleaseV1" component={VisualMotionColorFieldReleaseV1} width={1280} height={720} fps={30} durationInFrames={120} />
      <Composition id="VisualMotionSpeedLinesV1" component={VisualMotionSpeedLinesV1} width={1280} height={720} fps={30} durationInFrames={120} />
      <Composition id="VisualMotionStampTripletV1" component={VisualMotionStampTripletV1} width={1280} height={720} fps={30} durationInFrames={120} />
      <Composition id="VisualMotionHalftoneBurstV1" component={VisualMotionHalftoneBurstV1} width={1280} height={720} fps={30} durationInFrames={120} />
      <Composition id="VisualMotionScribbleUnderlineV1" component={VisualMotionScribbleUnderlineV1} width={1280} height={720} fps={30} durationInFrames={120} />
      <Composition id="VisualMotionImpactFrameV1" component={VisualMotionImpactFrameV1} width={1280} height={720} fps={30} durationInFrames={120} />
      <Composition id="VisualMotionCelShadowSweepV1" component={VisualMotionCelShadowSweepV1} width={1280} height={720} fps={30} durationInFrames={120} />
      <Composition id="VisualMotionMicroRgbSplitV1" component={VisualMotionMicroRgbSplitV1} width={1280} height={720} fps={30} durationInFrames={120} />
      <Composition id="VisualMotionHardAccentConceptV1" component={VisualMotionHardAccentConceptV1} width={1280} height={720} fps={30} durationInFrames={120} />
      <Composition id="VisualMotionMatchShapeConceptV1" component={VisualMotionMatchShapeConceptV1} width={1280} height={720} fps={30} durationInFrames={120} />
      <Composition id="VisualMotionWhipSourceMatchedConceptV1" component={VisualMotionWhipSourceMatchedConceptV1} width={1280} height={720} fps={30} durationInFrames={120} />
      <Composition id="MotionZukanStockDemoCinematicV1" component={MotionZukanStockDemo} defaultProps={{genre: 'CINEMATIC'}} width={1280} height={720} fps={30} durationInFrames={motionZukanStockDemoDurationFrames} />
      <Composition id="MotionZukanStockDemoAcousticV1" component={MotionZukanStockDemo} defaultProps={{genre: 'ACOUSTIC'}} width={1280} height={720} fps={30} durationInFrames={motionZukanStockDemoDurationFrames} />
      <Composition id="MotionZukanStockDemoUpbeatV1" component={MotionZukanStockDemo} defaultProps={{genre: 'UPBEAT'}} width={1280} height={720} fps={30} durationInFrames={motionZukanStockDemoDurationFrames} />
      <Composition id="MotionZukanStockDemoAmbientV1" component={MotionZukanStockDemo} defaultProps={{genre: 'AMBIENT'}} width={1280} height={720} fps={30} durationInFrames={motionZukanStockDemoDurationFrames} />
      <Composition id="OpeningV1DummyProduction" component={MotionZukanDummyProduction} width={1920} height={1080} fps={30} durationInFrames={motionZukanDummyProductionDurationFrames} />
      <Composition id="JapaneseFriendsOpeningDemoV1" component={JapaneseFriendsOpening} width={1920} height={1080} fps={30} durationInFrames={japaneseFriendsOpeningDurationFrames} />
      <Composition id="JapaneseFriendsOpeningStartSyncV1" component={JapaneseFriendsOpeningStartSync} width={1920} height={1080} fps={30} durationInFrames={startWeddingEditDurationInFrames} defaultProps={{audioPath: null, lyricPhrases: []}} />
    </>
  );
}
