import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import {verifyWeddingProjectRemotionIdentityProductionConsistency} from './verify-wedding-project-remotion-identity-production-consistency.mts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const movieArg = process.argv.find((arg) => arg.startsWith('--movie='))?.slice('--movie='.length);
if (movieArg !== 'opening' && movieArg !== 'profile') {
  console.error('Usage: node --no-warnings scripts/verify-wedding-production-handoff-provenance.mts --movie=opening|profile');
  process.exit(1);
}

const projectMotion = spawnSync(
  process.execPath,
  ['--no-warnings', 'scripts/verify-wedding-project-motion-production-provenance.mts', `--movie=${movieArg}`],
  {cwd: root, encoding: 'utf8', stdio: 'pipe'},
);
if (projectMotion.stdout) process.stdout.write(projectMotion.stdout);
if (projectMotion.stderr) process.stderr.write(projectMotion.stderr);
if (projectMotion.status !== 0) {
  console.error(`Wedding production provenance blocked: ${movieArg} Project Motion consistency failed.`);
  console.error('Mac Remotion Studio GUI Actual remains NOT_RUN.');
  console.error('Mac DaVinci Actual remains NOT_RUN.');
  process.exit(projectMotion.status ?? 2);
}

const outDir = join(root, 'out', 'handoff', `${movieArg}-v1`);
try {
  const remotionIdentity = verifyWeddingProjectRemotionIdentityProductionConsistency({
    movieId: movieArg,
    recoveryPath: join(outDir, `${movieArg}-v1-davinci-production-recovery.json`),
    markdownPath: join(outDir, `${movieArg}-v1-davinci-production-recovery.md`),
    motionStudioRoot: root,
  });
  console.log(`Project Remotion identity production consistency: ${remotionIdentity.state}`);
  if (remotionIdentity.state === 'CURRENT') {
    console.log(`resolveRemotionIdentitySidecarSha256=${remotionIdentity.resolveSidecarSha256}`);
    console.log(`projectRemotionIdentityReceiptSha256=${remotionIdentity.receiptSha256}`);
    console.log(`projectRemotionSourceBatchSha256=${remotionIdentity.sourceBatchSha256}`);
    console.log(`remotionHandoffIdentityArtifactSha256=${remotionIdentity.handoffIdentityArtifactSha256}`);
    console.log(`canonicalTypographyEngineBlockSha256=${remotionIdentity.canonicalTypographyEngineBlockSha256}`);
    console.log(`verifiedSceneBindings=${remotionIdentity.verifiedSceneBindingCount}`);
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  console.error('Wedding production provenance blocked: Project Remotion identity consistency failed.');
  console.error('Mac Remotion Studio GUI Actual remains NOT_RUN.');
  console.error('Mac DaVinci Actual remains NOT_RUN.');
  process.exit(2);
}

console.log(`Wedding production handoff provenance consistency: ${movieArg}=CURRENT_OR_NOT_APPLICABLE`);
console.log('Mac Remotion Studio GUI Actual remains NOT_RUN.');
console.log('Mac DaVinci Actual remains NOT_RUN.');
console.log('productionReady is not promoted by provenance verification.');
