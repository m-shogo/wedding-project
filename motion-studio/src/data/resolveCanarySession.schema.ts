import {z} from 'zod';

export const resolveCanarySessionSchema = z.object({
  schemaVersion: z.literal('resolve-canary-session/v1'),
  canaryId: z.string().min(1),
  executionId: z.string().min(1),
  createdAt: z.string().datetime(),
  status: z.enum(['READY_FOR_RUNTIME', 'BLOCKED_INPUT']),
  canaryStateAtPreparation: z.string().min(1),
  inputManifestStatus: z.enum(['PREPARED', 'BLOCKED_REAL_TOOL_EXPORT_REQUIRED']),
  targetResolveMajor: z.literal(21),
  runtimeLaunchPerformed: z.literal(false),
  networkRequestsPerformed: z.literal(false),
  paths: z.object({
    sessionDir: z.string().min(1),
    inputManifest: z.string().min(1),
    evidence: z.string().min(1),
    plan: z.string().min(1),
    runInstructions: z.string().min(1),
  }),
  nextAction: z.string().min(1),
  guardrails: z.array(z.string().min(1)).min(1),
});

export type ResolveCanarySession = z.infer<typeof resolveCanarySessionSchema>;
