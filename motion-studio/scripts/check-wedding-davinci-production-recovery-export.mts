import {readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {buildWeddingDavinciProductionRecovery} from '../src/data/weddingDavinciProductionRecovery.ts';
import {weddingProductionRecoverySchema} from '../src/data/resolveHandoff.schema.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const exporter = readFileSync(join(root, 'scripts/export-wedding-davinci-production-recovery.mts'), 'utf8');
const orchestrator = readFileSync(join(root, 'scripts/export-wedding-production-handoff.mts'), 'utf8');

for (const movieId of ['opening', 'profile'] as const) {
  const recovery = buildWeddingDavinciProductionRecovery(movieId);
  const parsed = weddingProductionRecoverySchema.parse(recovery);
  if (parsed.movieId !== movieId) throw new Error(`${movieId}: movie id drift`);
  if (parsed.productionReady) throw new Error(`${movieId}: recovery export must not claim production ready`);
  if (parsed.actual.state !== 'NOT_RUN') throw new Error(`${movieId}: Mac DaVinci Actual must start NOT_RUN`);
  if (parsed.bridge.macDaVinciActualVerified) throw new Error(`${movieId}: export must not verify Mac Actual`);
  if (parsed.bridge.finalDeliveryApproved) throw new Error(`${movieId}: export must not approve final delivery`);
  if (parsed.blockerCodes.join(',') !== 'MAC_DAVINCI_ACTUAL_NOT_VERIFIED') {
    throw new Error(`${movieId}: post-bundle blocker must be Mac Actual`);
  }
  for (const command of ['init', 'status', 'strict'] as const) {
    if (!parsed.actual.commands[command].includes(`${movieId}:davinci-finishing`)) {
      throw new Error(`${movieId}: ${command} command is not canonical`);
    }
  }
  if (!parsed.blockerActions.some((action) => action.kind === 'HUMAN')) {
    throw new Error(`${movieId}: Human Resolve GUI action missing`);
  }
}

for (const required of [
  "bundle.davinci?.productionReady !== false",
  "bundle.davinci?.macActualState !== 'NOT_RUN'",
  "recovery.artifactPath !== bundle.finalRender?.path",
  "bundle.finalRender.sha256 !== bundle.davinci?.expectedSha256",
  "FINAL_RENDER_BOUND_DAVINCI_RECOVERY",
  "Mac DaVinci Actual remains NOT_RUN; recovery export is not execution evidence.",
]) {
  if (!exporter.includes(required)) throw new Error(`exporter fail-close contract missing: ${required}`);
}

for (const required of [
  "productionExporter: 'scripts/export-opening-v1-production-bundle.mts'",
  "productionExporter: 'scripts/export-profile-v1-production-bundle.mts'",
  "const recovery = run('scripts/export-wedding-davinci-production-recovery.mts'",
  'production bundle export failed; DaVinci recovery was not exported.',
  'recovery sidecar export failed.',
  'Mac DaVinci Actual remains NOT_RUN; handoff export does not execute Resolve GUI work.',
]) {
  if (!orchestrator.includes(required)) throw new Error(`handoff orchestrator contract missing: ${required}`);
}
const bundleIndex = orchestrator.indexOf('const bundle = run(config.productionExporter)');
const recoveryIndex = orchestrator.indexOf("const recovery = run('scripts/export-wedding-davinci-production-recovery.mts'");
if (bundleIndex < 0 || recoveryIndex < 0 || bundleIndex >= recoveryIndex) {
  throw new Error('handoff orchestrator must export the production bundle before DaVinci recovery');
}

console.log('Wedding DaVinci production recovery export contracts: PASS');
