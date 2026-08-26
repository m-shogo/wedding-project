import {z} from 'zod';

// Provenance/recovery contract for AI-generated image/video/audio assets.
// A prompt is not a reproducibility guarantee. Provider/host/model/version/references/availability
// and policy/licensing state must travel with the generated artifact.

export const generatorAvailabilitySchema = z.enum([
  'ACTIVE',
  'DEPRECATED',
  'SUNSETTING',
  'DISCONTINUED',
  'UNKNOWN',
]);

export const generatedAssetKindSchema = z.enum(['IMAGE', 'VIDEO', 'AUDIO', 'OTHER']);

export const generationRebuildClassSchema = z.enum([
  'REPRODUCIBLE_CANDIDATE',
  'REBUILD_INTENT',
  'SOURCE_ONLY',
  'UNAVAILABLE',
]);

export const referenceAssetSchema = z.object({
  role: z.enum(['FIRST_FRAME', 'LAST_FRAME', 'CHARACTER', 'STYLE', 'SCENE', 'OBJECT', 'MASK', 'OTHER']),
  pathOrId: z.string().min(1),
  sha256: z.string().regex(/^[a-f0-9]{64}$/).optional(),
  note: z.string().optional(),
});

export const generatedAssetProvenanceSchema = z.object({
  schemaVersion: z.literal('1.0'),
  assetId: z.string().min(1),
  kind: generatedAssetKindSchema,
  createdAt: z.string().datetime(),
  provider: z.string().min(1),
  hostProduct: z.string().min(1),
  model: z.string().min(1),
  modelVersion: z.string().optional(),
  availability: generatorAvailabilitySchema,
  availabilityCheckedAt: z.string().datetime(),
  rebuildClass: generationRebuildClassSchema,
  prompt: z.string().min(1),
  negativePrompt: z.string().optional(),
  seed: z.union([z.string(), z.number()]).optional(),
  parameters: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).default({}),
  references: z.array(referenceAssetSchema).default([]),
  output: z.object({
    path: z.string().min(1),
    sha256: z.string().regex(/^[a-f0-9]{64}$/).optional(),
    width: z.number().int().positive().optional(),
    height: z.number().int().positive().optional(),
    durationSec: z.number().positive().optional(),
    fps: z.number().positive().optional(),
    hasAudio: z.boolean().optional(),
  }),
  provenance: z.object({
    c2paExpected: z.boolean().default(false),
    c2paObserved: z.boolean().optional(),
    visibleWatermarkExpected: z.boolean().default(false),
    contentCredentialsNote: z.string().optional(),
  }),
  policy: z.object({
    commercialUseNote: z.string().optional(),
    licenseOrTermsRef: z.string().optional(),
    personLikenessConstraints: z.string().optional(),
    projectPolicyCompatible: z.boolean(),
  }),
  humanIntent: z.object({
    purpose: z.string().min(1),
    mustPreserve: z.array(z.string()).default([]),
    mayVary: z.array(z.string()).default([]),
    forbiddenChanges: z.array(z.string()).default([]),
  }),
  verification: z.object({
    sourceFileExists: z.boolean(),
    provenanceChecked: z.boolean(),
    visualReviewed: z.boolean(),
    weddingApproved: z.boolean().default(false),
  }),
  notes: z.array(z.string()).default([]),
});

export type GeneratedAssetProvenance = z.infer<typeof generatedAssetProvenanceSchema>;
