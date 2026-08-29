import {z} from 'zod';

export const resolveCanaryPreparedFileSchema = z.object({
  id: z.string().min(1),
  role: z.string().min(1),
  path: z.string().min(1),
  sha256: z.string().regex(/^[a-f0-9]{64}$/).nullable(),
  metadata: z.record(z.string(), z.unknown()).default({}),
});

export const resolveCanaryInputManifestSchema = z.object({
  schemaVersion: z.literal('resolve-canary-input-manifest/v1'),
  canaryId: z.string().min(1),
  generatedAt: z.string().datetime(),
  status: z.enum(['PREPARED', 'BLOCKED_REAL_TOOL_EXPORT_REQUIRED']),
  generator: z.object({
    script: z.string().min(1),
    mode: z.string().min(1),
  }),
  files: z.array(resolveCanaryPreparedFileSchema),
  humanMaster: z.record(z.string(), z.unknown()).optional(),
  expectedInventory: z.record(z.string(), z.unknown()).optional(),
  nextAction: z.string().min(1),
  guardrails: z.array(z.string()).min(1),
});

export const audioRecoveryHumanMaster = {
  schemaVersion: 'resolve-audio-human-master/v1',
  fixtureId: 'synthetic-tone-440hz-6s-48k-stereo',
  source: {
    kind: 'SYNTHETIC_TONE',
    frequencyHz: 440,
    durationSeconds: 6,
    sampleRateHz: 48000,
    channels: 2,
    codec: 'pcm_s24le',
    copyrightedContent: false,
  },
  targetEnvelope: {
    fadeInSeconds: 0.5,
    fadeOutSeconds: 0.75,
    volumePoints: [
      {timeSeconds: 0.5, db: -12},
      {timeSeconds: 2.0, db: -3},
      {timeSeconds: 4.0, db: -9},
      {timeSeconds: 5.25, db: -6},
    ],
    curveIntent: 'Use native Resolve/Fairlight interpolation available in the tested runtime; record the actual curve type instead of assuming equivalence.',
  },
  guardrails: [
    'MANUAL_RECOVERY != AUTOMATED_WRITE',
    'VIDEO_TRANSFORM_PAN != AUDIO_PAN',
    'TARGET_DB_VALUES_ARE_HUMAN_MASTER_NOT_RUNTIME_EVIDENCE',
  ],
} as const;

export const palmierFcpxmlSyntheticSceneSpec = {
  schemaVersion: 'palmier-fcpxml-canary-scene-spec/v2',
  canaryId: 'DV21-PALMIER-FCPXML-01',
  fixtureId: 'palmier-resolve-handoff-synthetic-scene-v2',
  purpose: 'Create this exact neutral scene inside Palmier, then export using Palmier’s real DaVinci/Resolve FCPXML target. This spec is not FCPXML and must never be renamed or treated as a Palmier export.',
  sourceCoordinate: {
    palmierRelease: 'v0.7.6',
    sourceCommit: '8805801fa4df8bc2dbc57cb0a854a1f5108f95c6',
    checkedAt: '2026-08-26',
  },
  timeline: {
    fps: 30,
    width: 1920,
    height: 1080,
    durationSeconds: 12,
  },
  markerContract: {
    independentTextScaleTitle: 'PALMIER_CANARY_TEXT_SCALE',
    titleBoxTransformProbeTitle: 'PALMIER_CANARY_TITLE_BOX_TRANSFORM',
    nestedTimelineLevel1Name: 'PALMIER_CANARY_NEST_L1',
    nestedTimelineLevel2Name: 'PALMIER_CANARY_NEST_L2',
    minimumNestedTimelineResources: 2,
  },
  agentBuildHints: [
    'Use update_text style.widthScale=1.5 and style.heightScale=0.75 for PALMIER_CANARY_TEXT_SCALE. Palmier current MCP tests expose both fields with range 0.1...10.',
    'Use set_keyframes with property=scale on PALMIER_CANARY_TEXT_SCALE and two bounded linear keyframes. Read the clip back with get_timeline before export.',
    'Use create_timeline to create PALMIER_CANARY_NEST_L2 and PALMIER_CANARY_NEST_L1. Add L2 into L1, then L1 into the root via add_clips entries whose mediaRef is the child timeline id.',
    'After every mutation, read back the affected clip/timeline instead of assuming tool success equals scene correctness.',
  ],
  requiredElements: [
    {
      id: 'video-a',
      type: 'VIDEO_WITH_AUDIO',
      startSeconds: 0,
      durationSeconds: 4,
      requirements: ['linked A/V source', 'static position/scale/rotation', 'static crop', 'static volume'],
    },
    {
      id: 'video-a-repeat',
      type: 'VIDEO_WITH_AUDIO',
      startSeconds: 4,
      durationSeconds: 2,
      requirements: ['reuse the exact same physical source as video-a', 'different logical clip instance'],
    },
    {
      id: 'transform-kf',
      type: 'VIDEO_OR_IMAGE',
      startSeconds: 1,
      durationSeconds: 3,
      requirements: ['position keyframes', 'scale keyframes', 'rotation keyframes'],
    },
    {
      id: 'title-basic',
      type: 'TEXT',
      startSeconds: 2,
      durationSeconds: 2,
      requirements: ['font', 'size', 'color', 'alignment', 'stroke if available'],
    },
    {
      id: 'title-independent-text-scale',
      type: 'TEXT',
      markerText: 'PALMIER_CANARY_TEXT_SCALE',
      startSeconds: 6,
      durationSeconds: 2,
      requirements: [
        'exact text content PALMIER_CANARY_TEXT_SCALE',
        'style.widthScale = 1.5',
        'style.heightScale = 0.75',
        'scale keyframes with two observable values and linear interpolation',
      ],
    },
    {
      id: 'title-box-transform-loss-probe',
      type: 'TEXT',
      markerText: 'PALMIER_CANARY_TITLE_BOX_TRANSFORM',
      startSeconds: 8,
      durationSeconds: 2,
      requirements: [
        'exact text content PALMIER_CANARY_TITLE_BOX_TRANSFORM',
        'non-default title clip transform box size',
        'title clip rotation = 15 degrees',
        'keep independent text widthScale/heightScale at unity so this remains distinct from the text-scale probe',
      ],
    },
    {
      id: 'nested-timeline-level2',
      type: 'NESTED_TIMELINE',
      timelineName: 'PALMIER_CANARY_NEST_L2',
      requirements: ['non-empty child timeline', 'contains at least one visual clip', 'duration at least 1 second'],
    },
    {
      id: 'nested-timeline-level1',
      type: 'NESTED_TIMELINE',
      timelineName: 'PALMIER_CANARY_NEST_L1',
      startSeconds: 9,
      durationSeconds: 3,
      requirements: [
        'non-empty child timeline',
        'contains PALMIER_CANARY_NEST_L2 as a nested carrier',
        'PALMIER_CANARY_NEST_L1 is itself added to the root timeline',
      ],
    },
    {
      id: 'audio-automation-loss-probe',
      type: 'AUDIO',
      startSeconds: 0,
      durationSeconds: 6,
      requirements: ['static volume', 'volume keyframes', 'fade in', 'fade out'],
    },
  ],
  expectedTransport: {
    clipPlacementTrimSpeed: 'TRANSPORT_EXPECTED',
    positionScaleRotationKeyframes: 'TRANSPORT_EXPECTED_WITH_RESOLVE_TARGET_COMPENSATION',
    staticCrop: 'TRANSPORT_EXPECTED_WITH_RESOLVE_TARGET_ENCODING',
    textProperties: 'TRANSPORT_EXPECTED',
    independentTextWidthHeightScale: 'FCPXML_TITLE_SCALE_PARAM_EXPECTED',
    independentTextScaleAnimation: 'FCPXML_TITLE_SCALE_KEYFRAMES_EXPECTED',
    titleBoxTransformScaleRotation: 'KNOWN_OMISSION_EXPECTED',
    nestedTimelines: 'FCPXML_MEDIA_SEQUENCE_REF_CLIP_EXPECTED_PENDING_RESOLVE_RUNTIME',
    staticVolume: 'TRANSPORT_EXPECTED',
    audioVolumeKeyframes: 'KNOWN_OMISSION_EXPECTED_COLLAPSE_TO_STATIC',
    audioFade: 'KNOWN_OMISSION_EXPECTED',
  },
  exportRequirement: {
    mustUseRealPalmier: true,
    target: 'DaVinci/Resolve',
    fakeOrRepoSynthesizedFcpxmlForbidden: true,
    exportedFcpxmlPath: null,
    exportedFcpxmlSha256: null,
  },
  guardrails: [
    'SCENE_SPEC != FCPXML_EXPORT',
    'REAL_PALMIER_EXPORT_REQUIRED',
    'PARSE_SUCCESS != TIMELINE_FIDELITY',
    'STATIC_AUDIO_VOLUME_TRANSPORT != AUDIO_AUTOMATION_TRANSPORT',
    'TEXT_STYLE_SCALE != TITLE_BOX_TRANSFORM_SCALE',
    'FCPXML_NEST_STRUCTURE_TESTED != RESOLVE_COMPOUND_IMPORT_VERIFIED',
    'SCENE_MARKER_MATCH != REAL_PALMIER_PROVENANCE',
  ],
} as const;

export const alphaCanaryFixture = {
  canaryId: 'DV21-REMOTION-ALPHA-01',
  compositionId: '透過確認-押印',
  renderCommand: 'pnpm render:stamp-test:prores',
  outputPath: 'out/common/stamp_test_prores.mov',
  expected: {
    container: 'mov',
    codecFamily: 'prores',
    profile: '4444',
    pixelFormatIntent: 'yuva444p10le',
    width: 1920,
    height: 1080,
    fps: 30,
  },
  guardrails: [
    'SOURCE_CODEC_METADATA != RESOLVE_ALPHA_IMPORT_PROOF',
    'ALPHA_SOURCE_RENDER != ALPHA_IMPORT != ALPHA_WORKING_PATH != ALPHA_EXPORT',
  ],
} as const;

export type ResolveCanaryInputPreparationMode = 'alpha' | 'audio' | 'palmier' | 'drfx' | 'lottie';
export type ResolveCanaryInputPreparation = {
  mode: ResolveCanaryInputPreparationMode;
  command: string;
  result: string;
  manifestPath: string;
};

export const resolveCanaryInputPreparationCommands: Record<string, ResolveCanaryInputPreparation> = {
  'DV21-REMOTION-ALPHA-01': {
    mode: 'alpha',
    command: 'node --no-warnings scripts/prepare-resolve-canary-inputs.mts alpha',
    result: 'Renders the neutral ProRes 4444 source and writes SHA-256 + ffprobe metadata manifest.',
    manifestPath: 'out/canary-inputs/manifests/DV21-REMOTION-ALPHA-01.json',
  },
  'DV21-AUDIO-RECOVERY-01': {
    mode: 'audio',
    command: 'node --no-warnings scripts/prepare-resolve-canary-inputs.mts audio',
    result: 'Generates a copyright-free 48kHz stereo tone, exact Human Master envelope, SHA-256, and ffprobe manifest.',
    manifestPath: 'out/canary-inputs/manifests/DV21-AUDIO-RECOVERY-01.json',
  },
  'DV21-PALMIER-FCPXML-01': {
    mode: 'palmier',
    command: 'node --no-warnings scripts/prepare-resolve-canary-inputs.mts palmier',
    result: 'Writes Palmier synthetic scene specification v2 with nested-timeline and title-scale probes. Status remains blocked until Palmier itself exports real FCPXML.',
    manifestPath: 'out/canary-inputs/manifests/DV21-PALMIER-FCPXML-01.json',
  },
  'DV21-DRFX-FREE-01': {
    mode: 'drfx',
    command: 'node --no-warnings scripts/prepare-resolve-canary-inputs.mts drfx',
    result: 'Builds a deterministic dependency-free Edit Generator .drfx candidate with a single grouped Color control and writes hash/structure manifests. Runtime install remains pending.',
    manifestPath: 'out/canary-inputs/manifests/DV21-DRFX-FREE-01.json',
  },
  'DV21-LOTTIE-OGRAF-01': {
    mode: 'lottie',
    command: 'node --no-warnings scripts/prepare-resolve-canary-inputs.mts lottie',
    result: 'Builds a deterministic self-authored dotLottie v1 fixture with transparent-canvas intent and obvious motion, plus provenance/timing manifests. Resolve import/alpha/editability remain runtime-pending.',
    manifestPath: 'out/canary-inputs/manifests/DV21-LOTTIE-OGRAF-01.json',
  },
};

export function getResolveCanaryInputPreparation(canaryId: string) {
  return resolveCanaryInputPreparationCommands[canaryId];
}

export type ResolveCanaryInputManifest = z.infer<typeof resolveCanaryInputManifestSchema>;
