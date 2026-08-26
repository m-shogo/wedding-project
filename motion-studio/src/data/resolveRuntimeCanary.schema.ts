import {z} from 'zod';

export const resolveCanaryStateSchema = z.enum([
  'READY_TO_EXECUTE',
  'BLOCKED_INPUT',
  'PENDING_RUNTIME',
  'PASSED',
  'FAILED',
  'NEEDS_REVALIDATION',
]);

export const resolveCanaryPrioritySchema = z.enum(['P0', 'P1', 'P2', 'P3']);
export const resolveCanaryPlatformSchema = z.enum(['MACOS', 'WINDOWS', 'LINUX']);
export const resolveCanaryEditionSchema = z.enum(['FREE', 'STUDIO']);
export const resolveCanaryPageSchema = z.enum(['MEDIA', 'CUT', 'EDIT', 'FUSION', 'COLOR', 'FAIRLIGHT', 'DELIVER', 'PROJECT_MANAGER']);

export const resolveCanaryInputSchema = z.object({
  id: z.string().min(1),
  kind: z.enum(['MEDIA', 'FCPXML', 'DRFX', 'SETTING', 'LOTTIE', 'OTIO', 'OTIOZ', 'DRT', 'DRA', 'SIDECAR', 'OTHER']),
  required: z.boolean(),
  sourceRef: z.string().min(1),
  preparationCommand: z.string().optional(),
  notes: z.string().optional(),
});

export const resolveCanaryStepSchema = z.object({
  id: z.string().min(1),
  page: resolveCanaryPageSchema,
  mutation: z.enum(['READ_ONLY', 'DISPOSABLE_MUTATION', 'RENDER_OUTPUT']),
  action: z.string().min(1),
  expected: z.string().min(1),
  capture: z.array(z.string()).min(1),
  abortIf: z.array(z.string()).default([]),
});

export const resolveCanaryEvidenceRequirementSchema = z.object({
  id: z.string().min(1),
  kind: z.enum(['READBACK', 'SCREENSHOT', 'RENDER', 'HASH', 'INVENTORY', 'LOG', 'HUMAN_REVIEW', 'FILE', 'OTHER']),
  required: z.boolean(),
  description: z.string().min(1),
});

export const resolveRuntimeCanarySchema = z.object({
  schemaVersion: z.literal('resolve-runtime-canary/v1'),
  id: z.string().min(1),
  title: z.string().min(1),
  purpose: z.string().min(1),
  priority: resolveCanaryPrioritySchema,
  state: resolveCanaryStateSchema,
  capabilityIds: z.array(z.string().min(1)).min(1),
  target: z.object({
    resolveMajor: z.literal(21),
    patchRule: z.literal('CAPTURE_EXACT_AT_RUNTIME'),
    editions: z.array(resolveCanaryEditionSchema).min(1),
    platforms: z.array(resolveCanaryPlatformSchema).min(1),
    pages: z.array(resolveCanaryPageSchema).min(1),
  }),
  isolation: z.object({
    disposableProjectRequired: z.boolean(),
    realWeddingProjectMutationForbidden: z.boolean(),
    privateMediaCommitForbidden: z.boolean(),
    networkInstallAllowed: z.boolean(),
  }),
  inputs: z.array(resolveCanaryInputSchema).min(1),
  preflight: z.array(z.string()).min(1),
  steps: z.array(resolveCanaryStepSchema).min(1),
  evidenceRequirements: z.array(resolveCanaryEvidenceRequirementSchema).min(1),
  passCriteria: z.array(z.string()).min(1),
  failCriteria: z.array(z.string()).min(1),
  promotion: z.object({
    from: z.literal('PENDING_RUNTIME'),
    to: z.enum(['RUNTIME_VERIFIED', 'REPRODUCED']),
    minimumIndependentExecutions: z.number().int().min(1),
    requiresSaveReopen: z.boolean(),
    requiresRender: z.boolean(),
  }),
  guardrails: z.array(z.string()).min(1),
});

export const resolveRuntimeCanaryPackSchema = z.object({
  schemaVersion: z.literal('resolve-runtime-canary-pack/v1'),
  generatedFrom: z.string().min(1),
  canaries: z.array(resolveRuntimeCanarySchema).min(1),
});

export const resolveRuntimeCanaryEvidenceSchema = z.object({
  schemaVersion: z.literal('resolve-runtime-canary-evidence/v1'),
  canaryId: z.string().min(1),
  executionId: z.string().min(1),
  capturedAt: z.string().datetime().nullable(),
  result: z.enum(['NOT_RUN', 'PASS', 'FAIL', 'BLOCKED']),
  resolve: z.object({
    product: z.string().nullable(),
    version: z.string().nullable(),
    edition: z.enum(['FREE', 'STUDIO', 'UNKNOWN']),
    platform: z.enum(['MACOS', 'WINDOWS', 'LINUX', 'UNKNOWN']),
    projectName: z.string().nullable(),
    timelineName: z.string().nullable(),
  }),
  inputInventory: z.array(z.object({
    id: z.string(),
    pathOrRef: z.string().nullable(),
    sha256: z.string().nullable(),
    present: z.boolean().nullable(),
  })),
  stepResults: z.array(z.object({
    stepId: z.string(),
    status: z.enum(['NOT_RUN', 'PASS', 'FAIL', 'BLOCKED']),
    observed: z.string().nullable(),
    readback: z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()])).default({}),
  })),
  artifacts: z.array(z.object({
    kind: z.string(),
    path: z.string(),
    sha256: z.string().nullable(),
  })),
  humanReview: z.object({
    completed: z.boolean(),
    notes: z.array(z.string()),
  }),
  promotionEligible: z.boolean(),
  notes: z.array(z.string()),
});

export type ResolveRuntimeCanary = z.infer<typeof resolveRuntimeCanarySchema>;
export type ResolveRuntimeCanaryPack = z.infer<typeof resolveRuntimeCanaryPackSchema>;
export type ResolveRuntimeCanaryEvidence = z.infer<typeof resolveRuntimeCanaryEvidenceSchema>;
