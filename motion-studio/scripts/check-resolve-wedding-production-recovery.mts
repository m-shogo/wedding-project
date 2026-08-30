import {
  resolveHandoffSidecarSchema,
  weddingProductionRecoverySchema,
} from '../src/data/resolveHandoff.schema.ts';
import {resolveWeddingProductionRecoveryPolicy} from '../src/data/resolveWeddingProductionRecoveryPolicy.ts';
import {resolve21AlphaHandoffPolicy} from '../src/data/resolveHandoffPolicy.ts';

const recoveryParsed = weddingProductionRecoverySchema.safeParse(resolveWeddingProductionRecoveryPolicy);
if (!recoveryParsed.success) {
  console.error(recoveryParsed.error.format());
  process.exit(1);
}

if (resolveWeddingProductionRecoveryPolicy.actual.state !== 'NOT_RUN') {
  throw new Error('reference Wedding recovery policy must remain NOT_RUN until real Resolve GUI Actual evidence exists');
}
if (resolveWeddingProductionRecoveryPolicy.bridge.macDaVinciActualVerified) {
  throw new Error('reference Wedding recovery policy must not claim Mac DaVinci Actual verified');
}
if (resolveWeddingProductionRecoveryPolicy.productionReady) {
  throw new Error('reference Wedding recovery policy must not claim production ready');
}
if (resolveWeddingProductionRecoveryPolicy.blockerActions.length < 3) {
  throw new Error('reference Wedding recovery policy must preserve ROUTE / COMMAND / HUMAN recovery actions');
}
for (const kind of ['ROUTE', 'COMMAND', 'HUMAN'] as const) {
  if (!resolveWeddingProductionRecoveryPolicy.blockerActions.some((action) => action.kind === kind)) {
    throw new Error(`reference Wedding recovery policy missing ${kind} action`);
  }
}

const projectMotionBindingArtifact = {
  authority: 'PALMIER_PROJECT_MOTION_ASSEMBLY_BINDING' as const,
  projectId: 'opening' as const,
  path: 'opening-v1-palmier-project-motion-binding.json',
  sha256: 'a'.repeat(64),
  currentnessState: 'CURRENT' as const,
  palmierCurrent: true as const,
  davinciHandoffCurrent: true as const,
  remotionStudioGuiActual: 'NOT_RUN' as const,
  macDaVinciGuiActual: 'NOT_RUN' as const,
  productionReady: false as const,
};

const sidecarWithRecovery = resolveHandoffSidecarSchema.parse({
  ...resolve21AlphaHandoffPolicy,
  artifactId: 'remotion-alpha-to-resolve21-wedding-recovery-canary',
  projectMotionBindingArtifact,
  productionRecovery: resolveWeddingProductionRecoveryPolicy,
});

if (sidecarWithRecovery.productionRecovery?.actual.state !== 'NOT_RUN') {
  throw new Error('Resolve handoff sidecar must preserve Wedding Actual NOT_RUN state');
}
if (!sidecarWithRecovery.productionRecovery?.blockerCodes.includes('PHOTO_MISSING')) {
  throw new Error('Resolve handoff sidecar dropped stable Wedding blocker codes');
}
if (sidecarWithRecovery.productionRecovery?.actual.commands.strict !== 'pnpm opening:davinci-actual:strict') {
  throw new Error('Resolve handoff sidecar dropped strict Actual verification command');
}
if (sidecarWithRecovery.projectMotionBindingArtifact?.sha256 !== projectMotionBindingArtifact.sha256) {
  throw new Error('Resolve handoff sidecar dropped the Palmier Project Motion binding artifact SHA');
}
if (sidecarWithRecovery.projectMotionBindingArtifact?.macDaVinciGuiActual !== 'NOT_RUN') {
  throw new Error('Project Motion binding must not elevate Mac DaVinci GUI Actual');
}
if (sidecarWithRecovery.projectMotionBindingArtifact?.productionReady !== false) {
  throw new Error('Project Motion binding must not elevate production readiness');
}

for (const invalidProjectMotionBindingArtifact of [
  {...projectMotionBindingArtifact, sha256: 'not-a-sha256'},
  {...projectMotionBindingArtifact, currentnessState: 'STALE'},
  {...projectMotionBindingArtifact, macDaVinciGuiActual: 'ACTUAL_VERIFIED'},
  {...projectMotionBindingArtifact, productionReady: true},
]) {
  const parsed = resolveHandoffSidecarSchema.safeParse({
    ...resolve21AlphaHandoffPolicy,
    artifactId: 'remotion-alpha-to-resolve21-invalid-project-motion-binding-canary',
    projectMotionBindingArtifact: invalidProjectMotionBindingArtifact,
    productionRecovery: resolveWeddingProductionRecoveryPolicy,
  });
  if (parsed.success) {
    throw new Error('Resolve handoff sidecar accepted an invalid or evidence-elevating Project Motion binding artifact');
  }
}

console.log('Resolve Wedding production recovery sidecar contracts: PASS');
