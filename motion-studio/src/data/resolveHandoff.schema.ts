import {z} from 'zod';

// Canonical machine-readable contract for Remotion/Palmier -> DaVinci Resolve 21 handoff.
// Research notes remain the evidence log; this schema is the implementation boundary that
// production exporters/verifiers can share without assuming that visual parity implies editability.

export const handoffFidelitySchema = z.enum([
  'EXACT',
  'APPROX',
  'REBUILD_VALUES',
  'REBUILD_ASSET',
  'REBUILD_INTENT',
  'BAKE_OPTION',
  'LOST',
]);

export const humanAdjustabilitySchema = z.enum([
  'EASY_INSPECTOR',
  'EASY_TIMELINE',
  'GUIDED_FUSION',
  'EXTERNAL_REBUILD',
  'BAKED',
]);

export const automationAvailabilitySchema = z.enum([
  'NATIVE_NO_SCRIPT',
  'GENERATE_ARTIFACT_ASSISTED_INSTALL',
  'STUDIO_EXTERNAL_SCRIPT',
  'ASSISTED_REBUILD',
  'UNAVAILABLE',
  'PENDING_RUNTIME',
]);

export const runtimeStateSchema = z.enum([
  'EVIDENCE_ONLY',
  'PENDING_RUNTIME',
  'RUNTIME_VERIFIED',
  'REPRODUCED',
  'CROSS_SCENE',
  'WEDDING_VERIFIED',
  'NEEDS_REVALIDATION',
]);

export const resolveEditionSchema = z.enum(['FREE', 'STUDIO', 'UNKNOWN']);
export const resolvePlatformSchema = z.enum(['MACOS', 'WINDOWS', 'LINUX', 'UNKNOWN']);

export const dependencyKindSchema = z.enum([
  'MEDIA',
  'FONT',
  'LUT',
  'OFX',
  'PLUGIN',
  'DRFX',
  'LOTTIE_OGRAF',
  'AUDIO',
  'OTHER',
]);

export const dependencySchema = z.object({
  kind: dependencyKindSchema,
  id: z.string().min(1),
  required: z.boolean(),
  bundled: z.boolean(),
  relinkHint: z.string().optional(),
  licenseNote: z.string().optional(),
});

export const alphaStageSchema = z.object({
  import: runtimeStateSchema,
  workingPath: runtimeStateSchema,
  export: runtimeStateSchema,
  codec: z.string().optional(),
  pixelFormat: z.string().optional(),
  alphaMode: z.enum(['STRAIGHT', 'PREMULTIPLIED', 'UNKNOWN']).default('UNKNOWN'),
});

export const humanMasterValueSchema = z.object({
  key: z.string().min(1),
  label: z.string().min(1),
  value: z.union([z.string(), z.number(), z.boolean()]),
  unit: z.string().optional(),
  editableInResolve: z.boolean(),
  resolveControl: z.string().optional(),
});

export const capabilityHandoffSchema = z.object({
  capabilityId: z.string().min(1),
  sourceTool: z.string().min(1),
  sourcePath: z.string().min(1),
  resolveNativePath: z.string().min(1),
  fidelity: handoffFidelitySchema,
  adjustability: humanAdjustabilitySchema,
  automation: automationAvailabilitySchema,
  runtime: runtimeStateSchema,
  expectedBehavior: z.string().min(1),
  observedBehavior: z.string().optional(),
  recoveryRecipe: z.string().optional(),
  verificationRecipe: z.string().min(1),
  guardrails: z.array(z.string()).default([]),
});

export const resolveHandoffSidecarSchema = z.object({
  schemaVersion: z.literal('1.0'),
  artifactId: z.string().min(1),
  generatedAt: z.string().datetime(),
  source: z.object({
    tool: z.enum(['REMOTION', 'PALMIER', 'AI_GENERATOR', 'OTHER']),
    projectRef: z.string().min(1),
    runtimeVersion: z.string().min(1),
    compositionOrTimeline: z.string().min(1),
    humanMasterRef: z.string().min(1).optional(),
  }),
  resolve: z.object({
    major: z.literal(21),
    testedPatch: z.string().regex(/^21\.\d+\.\d+(?:\.\d+)?$/),
    edition: resolveEditionSchema,
    platform: resolvePlatformSchema,
    page: z.enum(['EDIT', 'FUSION', 'COLOR', 'FAIRLIGHT', 'DELIVER', 'MULTI']),
  }),
  timeline: z.object({
    fps: z.number().positive(),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    colorContext: z.string().min(1),
    audioRateHz: z.number().int().positive().default(48000),
  }),
  artifact: z.object({
    kind: z.enum(['FCPXML', 'DRFX', 'SETTING', 'DRT', 'DRA', 'LOTTIE', 'ALPHA_RENDER', 'MEDIA', 'OTHER']),
    path: z.string().min(1),
    codec: z.string().optional(),
    container: z.string().optional(),
  }),
  alpha: alphaStageSchema.optional(),
  humanMaster: z.array(humanMasterValueSchema).default([]),
  dependencies: z.array(dependencySchema).default([]),
  capabilities: z.array(capabilityHandoffSchema).min(1),
  highImpactDecisions: z.array(z.string()).default([]),
  notes: z.array(z.string()).default([]),
});

export type ResolveHandoffSidecar = z.infer<typeof resolveHandoffSidecarSchema>;
export type CapabilityHandoff = z.infer<typeof capabilityHandoffSchema>;
