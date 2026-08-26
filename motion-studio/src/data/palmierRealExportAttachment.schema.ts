import {z} from 'zod';

export const palmierRealExportInspectionSchema = z.object({
  schemaVersion: z.literal('palmier-fcpxml-inspection/v1'),
  fcpxmlRootDetected: z.boolean(),
  fcpxmlVersion: z.string().nullable(),
  sequenceDetected: z.boolean(),
  spineDetected: z.boolean(),
  byteLength: z.number().int().nonnegative(),
  provenance: z.literal('UNVERIFIED_BY_STRUCTURE'),
  guardrails: z.array(z.string().min(1)).min(1),
});

export const palmierExportFreshnessSchema = z.object({
  exportStartedAt: z.string().datetime(),
  sourceModifiedAt: z.string().datetime(),
  sourceModifiedAtMs: z.number().nonnegative(),
  exportStartedAtMs: z.number().nonnegative(),
  toleranceMs: z.number().int().nonnegative(),
  freshAfterExportStart: z.literal(true),
});

export const palmierCanaryHumanMasterSchema = z.object({
  schemaVersion: z.literal('palmier-resolve-canary-human-master/v1'),
  canaryId: z.literal('DV21-PALMIER-FCPXML-01'),
  fixtureId: z.union([
    z.literal('palmier-resolve-handoff-synthetic-scene-v1'),
    z.literal('palmier-resolve-handoff-synthetic-scene-v2'),
  ]),
  generatedAt: z.string().datetime(),
  generatedFromSceneSpecSha256: z.string().regex(/^[a-f0-9]{64}$/),
  actualExport: z.object({
    fcpxmlSha256: z.string().regex(/^[a-f0-9]{64}$/),
    fcpxmlVersion: z.string(),
    provenanceLevel: z.literal('OPERATOR_ATTESTED_REAL_PALMIER_EXPORT'),
    freshness: palmierExportFreshnessSchema,
  }),
  timeline: z.record(z.string(), z.unknown()),
  expectedElements: z.array(z.record(z.string(), z.unknown())).min(1),
  expectedTransport: z.record(z.string(), z.unknown()),
  guardrails: z.array(z.string().min(1)).min(1),
});

export const palmierRealExportAttachmentSchema = z.object({
  schemaVersion: z.literal('palmier-real-export-attachment/v1'),
  canaryId: z.literal('DV21-PALMIER-FCPXML-01'),
  attachedAt: z.string().datetime(),
  sourceBasename: z.string().min(1),
  copiedFcpxmlPath: z.string().min(1),
  fcpxmlSha256: z.string().regex(/^[a-f0-9]{64}$/),
  fcpxmlVersion: z.string().min(1),
  byteLength: z.number().int().positive(),
  freshness: palmierExportFreshnessSchema,
  sceneSpecSha256: z.string().regex(/^[a-f0-9]{64}$/),
  humanMasterPath: z.string().min(1),
  humanMasterSha256: z.string().regex(/^[a-f0-9]{64}$/),
  operatorAttestation: z.object({
    realPalmierExport: z.literal(true),
    statement: z.literal('I confirm this FCPXML was exported by Palmier using its DaVinci/Resolve export path from the neutral canary scene.'),
  }),
  provenanceLevel: z.literal('OPERATOR_ATTESTED_REAL_PALMIER_EXPORT'),
  guardrails: z.array(z.string().min(1)).min(1),
});

export type PalmierRealExportInspection = z.infer<typeof palmierRealExportInspectionSchema>;
export type PalmierExportFreshness = z.infer<typeof palmierExportFreshnessSchema>;
export type PalmierCanaryHumanMaster = z.infer<typeof palmierCanaryHumanMasterSchema>;
export type PalmierRealExportAttachment = z.infer<typeof palmierRealExportAttachmentSchema>;
