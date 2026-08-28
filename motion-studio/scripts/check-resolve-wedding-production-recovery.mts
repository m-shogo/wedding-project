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

const sidecarWithRecovery = resolveHandoffSidecarSchema.parse({
  ...resolve21AlphaHandoffPolicy,
  artifactId: 'remotion-alpha-to-resolve21-wedding-recovery-canary',
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

console.log('Resolve Wedding production recovery sidecar contracts: PASS');
