export interface MaskRevealDaVinciActualEvidenceV1 {
  schemaVersion: "mask-reveal-davinci-actual/v1";
  authority: "IMPLEMENTATION_EVIDENCE_ONLY";
  patternId: "type-mask-reveal";
  implementationId: "impl-type-mask-reveal-davinci-text-plus";
  sceneId: string;
  sourceRevision: string;
  markerId: string;
  capturedAt: string;
  resolve: {
    product: "DaVinci Resolve";
    version: "21.0.4.5";
    edition: "FREE";
    transport: "PALMIER_FCPXML_TO_RESOLVE_INTERNAL_UTILITY_SCRIPT";
    projectName: string;
    timelineName: string;
    fusionCompName: string;
    fusionToolCount: number;
  };
  palmierHandoff: {
    sidecarSha256: string;
    fcpxmlSha256: string;
    importedTimelineName: string;
    appliedTimelineName: string;
    importedTitleName: string;
    importedTimelineDurationFrames: 120;
    markerMatched: true;
  };
  appliedReadback: {
    styledText: "WELCOME";
    maskConnected: true;
    layerDelayFrames: 18;
    motionDelayFrames: 0;
    enterDurationFrames: 18;
    holdDurationFrames: 84;
    exitDurationFrames: 0;
    startPositionNormalized: { x: 0.8; y: 0.9 };
    finalPositionNormalized: { x: 0.8; y: 0.78 };
    direction: "UP";
    distanceNormalized: 0.12;
    scale: { from: 1; to: 1 };
  };
  render: {
    assetPath: "/motion-previews/type-mask-reveal/davinci-actual-v1.mp4";
    posterPath: "/motion-previews/type-mask-reveal/davinci-actual-v1-poster.png";
    sha256: string;
    codec: "h264";
    width: 1280;
    height: 720;
    fps: 30;
    frames: 120;
    measuredDurationSeconds: 4;
    muted: true;
  };
  checks: {
    resolveIdentityCaptured: true;
    nativeFusionCompositionRendered: true;
    textReadbackCaptured: true;
    maskConnectionReadbackCaptured: true;
    timingReadbackCaptured: true;
    positionReadbackCaptured: true;
    renderTested: true;
    visualQa1x: true;
    visualQaHalfSpeed: true;
    conceptPreviewKeptSeparate: true;
    palmierMarkerMatchedInScratchImport: true;
    independentRenderedPixelOracle: true;
  };
  productionReady: true;
  remainingGate: null;
}

export const maskRevealDaVinciActualEvidence: MaskRevealDaVinciActualEvidenceV1 = {
  schemaVersion: "mask-reveal-davinci-actual/v1",
  authority: "IMPLEMENTATION_EVIDENCE_ONLY",
  patternId: "type-mask-reveal",
  implementationId: "impl-type-mask-reveal-davinci-text-plus",
  sceneId: "mz-scene-1f5568a2-e89a-4c63-95e7-bce4862e30c7",
  sourceRevision: "2026-08-26T08:56:54.064Z",
  markerId: "VML_MASK_REVEAL_OPENING_INTRO_MZ_SCENE_1F5568A2_E89A_4C63_95E7_BCE4862E30C7",
  capturedAt: "2026-08-27T03:01:32Z",
  resolve: {
    product: "DaVinci Resolve",
    version: "21.0.4.5",
    edition: "FREE",
    transport: "PALMIER_FCPXML_TO_RESOLVE_INTERNAL_UTILITY_SCRIPT",
    projectName: "MotionZukan_MaskReveal_Handoff_20260827_U",
    timelineName: "VML_MASK_REVEAL_OPENING_INTRO_MZ_SCENE_1F5568A2_E89A_4C63_95E7_BCE4862E30C7__DAVINCI_ACTUAL",
    fusionCompName: "Composition 1",
    fusionToolCount: 11,
  },
  palmierHandoff: {
    sidecarSha256: "bed8c21e71b35a4949bf203d18574d963ab100e7cf284452f246cd42ee54531b",
    fcpxmlSha256: "fd019269393277e477c22f059ea9721cc25a2524cd223f65c8bcb7389d4b48e5",
    importedTimelineName: "VML_MASK_REVEAL_OPENING_INTRO_MZ_SCENE_1F5568A2_E89A_4C63_95E7_BCE4862E30C7",
    appliedTimelineName: "VML_MASK_REVEAL_OPENING_INTRO_MZ_SCENE_1F5568A2_E89A_4C63_95E7_BCE4862E30C7__DAVINCI_ACTUAL",
    importedTitleName: "テキスト",
    importedTimelineDurationFrames: 120,
    markerMatched: true,
  },
  appliedReadback: {
    styledText: "WELCOME",
    maskConnected: true,
    layerDelayFrames: 18,
    motionDelayFrames: 0,
    enterDurationFrames: 18,
    holdDurationFrames: 84,
    exitDurationFrames: 0,
    startPositionNormalized: { x: 0.8, y: 0.9 },
    finalPositionNormalized: { x: 0.8, y: 0.78 },
    direction: "UP",
    distanceNormalized: 0.12,
    scale: { from: 1, to: 1 },
  },
  render: {
    assetPath: "/motion-previews/type-mask-reveal/davinci-actual-v1.mp4",
    posterPath: "/motion-previews/type-mask-reveal/davinci-actual-v1-poster.png",
    sha256: "32d5e1b39b2b8d381ae7521f4c6c3bcc30fe72b1dacb0fc7153b87e8bcf23592",
    codec: "h264",
    width: 1280,
    height: 720,
    fps: 30,
    frames: 120,
    measuredDurationSeconds: 4,
    muted: true,
  },
  checks: {
    resolveIdentityCaptured: true,
    nativeFusionCompositionRendered: true,
    textReadbackCaptured: true,
    maskConnectionReadbackCaptured: true,
    timingReadbackCaptured: true,
    positionReadbackCaptured: true,
    renderTested: true,
    visualQa1x: true,
    visualQaHalfSpeed: true,
    conceptPreviewKeptSeparate: true,
    palmierMarkerMatchedInScratchImport: true,
    independentRenderedPixelOracle: true,
  },
  productionReady: true,
  remainingGate: null,
};
