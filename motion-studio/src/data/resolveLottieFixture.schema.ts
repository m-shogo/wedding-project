import {z} from 'zod';

export const resolveLottieFixtureSpecSchema = z.object({
  schemaVersion: z.literal('resolve-lottie-fixture-spec/v1'),
  canaryId: z.literal('DV21-LOTTIE-OGRAF-01'),
  fixtureId: z.literal('wedding-neutral-alpha-motion-v1'),
  displayName: z.literal('Wedding Neutral Alpha Motion'),
  dotLottieSpecVersion: z.literal('1'),
  animationId: z.literal('wedding-neutral-alpha-motion'),
  manifestSourcePath: z.string().min(1),
  animationSourcePath: z.string().min(1),
  archiveManifestPath: z.literal('manifest.json'),
  archiveAnimationPath: z.literal('animations/wedding-neutral-alpha-motion.json'),
  outputPath: z.literal('out/canary-inputs/lottie/WeddingNeutralAlphaMotion.lottie'),
  target: z.object({
    resolveMajor: z.literal(21),
    platforms: z.array(z.enum(['MACOS', 'WINDOWS'])).min(1),
  }),
  timing: z.object({
    width: z.literal(512),
    height: z.literal(512),
    fps: z.literal(30),
    inFrame: z.literal(0),
    outFrame: z.literal(90),
    durationSeconds: z.literal(3),
  }),
  visualIntent: z.object({
    transparentCanvas: z.literal(true),
    obviousMotion: z.literal(true),
    description: z.string().min(1),
  }),
  sourcePolicy: z.object({
    selfAuthoredSynthetic: z.literal(true),
    copyrightedContent: z.literal(false),
    thirdPartyAssets: z.array(z.string()).length(0),
    networkAssets: z.array(z.string()).length(0),
    fonts: z.array(z.string()).length(0),
  }),
  expectedImportBehavior: z.object({
    nativeMediaOrTimelineImport: z.literal('PENDING_RUNTIME'),
    alphaPreserved: z.literal('PENDING_RUNTIME'),
    clipLevelTrimReposition: z.literal('PENDING_RUNTIME'),
    internalParametricEditability: z.literal('UNKNOWN_UNTIL_RUNTIME'),
  }),
  runtimeState: z.literal('PENDING_RUNTIME'),
  guardrails: z.array(z.string().min(1)).min(1),
});

export const resolveLottieFixtureManifestSchema = z.object({
  schemaVersion: z.literal('resolve-lottie-fixture-manifest/v1'),
  generatedAt: z.string().datetime(),
  fixtureId: z.literal('wedding-neutral-alpha-motion-v1'),
  canaryId: z.literal('DV21-LOTTIE-OGRAF-01'),
  dotLottieSpecVersion: z.literal('1'),
  animationId: z.literal('wedding-neutral-alpha-motion'),
  lottiePath: z.string().min(1),
  lottieSha256: z.string().regex(/^[a-f0-9]{64}$/),
  sourceFiles: z.array(z.object({
    role: z.enum(['DOTLOTTIE_MANIFEST', 'LOTTIE_ANIMATION']),
    path: z.string().min(1),
    sha256: z.string().regex(/^[a-f0-9]{64}$/),
  })).length(2),
  archiveEntries: z.array(z.object({
    path: z.string().min(1),
    sha256: z.string().regex(/^[a-f0-9]{64}$/),
    byteLength: z.number().int().positive(),
    timestampPolicy: z.literal('FIXED_1980_01_01_00_00_00'),
  })).length(2),
  timing: z.object({
    width: z.literal(512),
    height: z.literal(512),
    fps: z.literal(30),
    inFrame: z.literal(0),
    outFrame: z.literal(90),
    durationSeconds: z.literal(3),
  }),
  visualIntent: z.object({
    transparentCanvas: z.literal(true),
    obviousMotion: z.literal(true),
    description: z.string().min(1),
  }),
  sourcePolicy: z.object({
    selfAuthoredSynthetic: z.literal(true),
    copyrightedContent: z.literal(false),
    thirdPartyAssets: z.array(z.string()).length(0),
    networkAssets: z.array(z.string()).length(0),
    fonts: z.array(z.string()).length(0),
  }),
  packagingVerification: z.object({
    zipReadable: z.literal(true),
    expectedHierarchyOnly: z.literal(true),
    noPathTraversal: z.literal(true),
    deterministicArchiveExpected: z.literal(true),
  }),
  expectedImportBehavior: z.object({
    nativeMediaOrTimelineImport: z.literal('PENDING_RUNTIME'),
    alphaPreserved: z.literal('PENDING_RUNTIME'),
    clipLevelTrimReposition: z.literal('PENDING_RUNTIME'),
    internalParametricEditability: z.literal('UNKNOWN_UNTIL_RUNTIME'),
  }),
  runtimeState: z.literal('PENDING_RUNTIME'),
  guardrails: z.array(z.string().min(1)).min(1),
});

export type ResolveLottieFixtureSpec = z.infer<typeof resolveLottieFixtureSpecSchema>;
export type ResolveLottieFixtureManifest = z.infer<typeof resolveLottieFixtureManifestSchema>;
