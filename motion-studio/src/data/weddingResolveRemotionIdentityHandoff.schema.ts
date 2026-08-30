import {z} from 'zod';
import {resolveHandoffSidecarSchema, sha256Schema} from './resolveHandoff.schema.ts';

export const resolveProjectRemotionIdentityReceiptSchema = z.object({
  authority: z.literal('SHA_BOUND_PROJECT_REMOTION_ELEMENT_IDENTITY_VERIFICATION'),
  projectId: z.enum(['opening', 'profile']),
  path: z.string().min(1),
  sha256: sha256Schema,
  state: z.literal('CURRENT'),
  sourceBatchSha256: sha256Schema,
  handoffIdentityArtifactSha256: sha256Schema,
  canonicalTypographyEngineBlockSha256: sha256Schema,
  selectedPatternIds: z.array(z.string().min(1)).min(1),
  verifiedSceneBindingCount: z.number().int().positive(),
  remotionStudioGuiActual: z.literal('NOT_RUN'),
  macDaVinciGuiActual: z.literal('NOT_RUN'),
  productionReady: z.literal(false),
});

// Resolve handoff surface that explicitly carries the Project-level Remotion Element identity
// verification receipt. CURRENT proves only SHA/currentness integrity for the selected Scene
// identities; it never proves Studio GUI Actual, DaVinci GUI Actual, or production readiness.
export const weddingResolveRemotionIdentityHandoffSidecarSchema = resolveHandoffSidecarSchema.extend({
  projectRemotionIdentityReceipt: resolveProjectRemotionIdentityReceiptSchema,
});

export type ResolveProjectRemotionIdentityReceipt = z.infer<typeof resolveProjectRemotionIdentityReceiptSchema>;
export type WeddingResolveRemotionIdentityHandoffSidecar = z.infer<typeof weddingResolveRemotionIdentityHandoffSidecarSchema>;
