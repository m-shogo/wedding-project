import {resolveLottieFixtureSpecSchema} from './resolveLottieFixture.schema.ts';

export const weddingNeutralAlphaMotionLottieFixture = resolveLottieFixtureSpecSchema.parse({
  schemaVersion: 'resolve-lottie-fixture-spec/v1',
  canaryId: 'DV21-LOTTIE-OGRAF-01',
  fixtureId: 'wedding-neutral-alpha-motion-v1',
  displayName: 'Wedding Neutral Alpha Motion',
  dotLottieSpecVersion: '1',
  animationId: 'wedding-neutral-alpha-motion',
  manifestSourcePath: 'fixtures/resolve/lottie/WeddingNeutralAlphaMotion.manifest.json',
  animationSourcePath: 'fixtures/resolve/lottie/WeddingNeutralAlphaMotion.animation.json',
  archiveManifestPath: 'manifest.json',
  archiveAnimationPath: 'animations/wedding-neutral-alpha-motion.json',
  outputPath: 'out/canary-inputs/lottie/WeddingNeutralAlphaMotion.lottie',
  target: {
    resolveMajor: 21,
    platforms: ['MACOS', 'WINDOWS'],
  },
  timing: {
    width: 512,
    height: 512,
    fps: 30,
    inFrame: 0,
    outFrame: 90,
    durationSeconds: 3,
  },
  visualIntent: {
    transparentCanvas: true,
    obviousMotion: true,
    description: 'One solid circle moves horizontally across an otherwise transparent 512x512 canvas.',
  },
  sourcePolicy: {
    selfAuthoredSynthetic: true,
    copyrightedContent: false,
    thirdPartyAssets: [],
    networkAssets: [],
    fonts: [],
  },
  expectedImportBehavior: {
    nativeMediaOrTimelineImport: 'PENDING_RUNTIME',
    alphaPreserved: 'PENDING_RUNTIME',
    clipLevelTrimReposition: 'PENDING_RUNTIME',
    internalParametricEditability: 'UNKNOWN_UNTIL_RUNTIME',
  },
  runtimeState: 'PENDING_RUNTIME',
  guardrails: [
    'DOTLOTTIE_ARCHIVE_VALID != RESOLVE_IMPORTABLE',
    'LOTTIE_JSON_STRUCTURE_VALID != RESOLVE_RENDER_FIDELITY',
    'NATIVE_IMPORT != INTERNAL_PARAMETRIC_EDITABILITY',
    'ALPHA_INTENT != RESOLVE_ALPHA_PROOF',
    'MACOS_WINDOWS_CAPABILITY != LINUX_CAPABILITY',
  ],
});
