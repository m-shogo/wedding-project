import {existsSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {
  buildWeddingProjectMotionReceiptCurrentnessFromCanonicalReceipt,
  buildWeddingProjectMotionReceiptCurrentnessFromFiles,
  saveWeddingProjectMotionReceiptCurrentness,
  type WeddingProjectMotionReceiptCurrentnessV1,
} from './wedding-project-motion-import-currentness.mts';
import {getWeddingProjectMotionCanonicalArtifactPaths} from './wedding-project-motion-artifact-store.mts';
import {attachWeddingProjectMotionProductionProvenance} from './wedding-project-motion-production-provenance.mts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const movieArg = process.argv.find((arg) => arg.startsWith('--movie='))?.split('=')[1];
if (movieArg !== 'opening' && movieArg !== 'profile') {
  console.error('Usage: node --no-warnings scripts/export-wedding-production-handoff.mts --movie=opening|profile');
  process.exit(1);
}

const projectMotionReceipt = process.argv
  .find((arg) => arg.startsWith('--project-motion-receipt='))
  ?.slice('--project-motion-receipt='.length);
const projectMotionExport = process.argv
  .find((arg) => arg.startsWith('--project-motion-export='))
  ?.slice('--project-motion-export='.length);

if (Boolean(projectMotionReceipt) !== Boolean(projectMotionExport)) {
  console.error(
    'Wedding production handoff blocked: --project-motion-receipt and --project-motion-export must be supplied together.',
  );
  process.exit(2);
}

const canonicalProjectMotion = getWeddingProjectMotionCanonicalArtifactPaths(movieArg);
let projectMotionCurrentness: WeddingProjectMotionReceiptCurrentnessV1 | null = null;

try {
  if (projectMotionReceipt && projectMotionExport) {
    projectMotionCurrentness = buildWeddingProjectMotionReceiptCurrentnessFromFiles(
      projectMotionReceipt,
      projectMotionExport,
      movieArg,
    );
  } else if (existsSync(canonicalProjectMotion.receipt)) {
    projectMotionCurrentness = buildWeddingProjectMotionReceiptCurrentnessFromCanonicalReceipt(movieArg);
  }
} catch (error) {
  console.error(
    `Wedding production handoff blocked: ${movieArg} canonical Project Motion artifact could not be validated: ${
      error instanceof Error ? error.message : String(error)
    }`,
  );
  console.error('Re-import the current Project Motion handoff with --save-current before continuing.');
  console.error('Mac Remotion Studio GUI Actual remains NOT_RUN.');
  console.error('Mac DaVinci Actual remains NOT_RUN.');
  process.exit(2);
}

if (projectMotionCurrentness) {
  const savedCurrentnessPath = saveWeddingProjectMotionReceiptCurrentness(projectMotionCurrentness);
  process.stdout.write(`${JSON.stringify(projectMotionCurrentness, null, 2)}\n`);
  console.log(`Project Motion currentness artifact: ${savedCurrentnessPath}`);
  if (
    projectMotionCurrentness.state !== 'CURRENT' ||
    !projectMotionCurrentness.assemblyGate.palmierCurrent ||
    !projectMotionCurrentness.assemblyGate.davinciHandoffCurrent
  ) {
    console.error(
      `Wedding production handoff blocked: ${movieArg} Project Motion import receipt is not current and assembly-actionable.`,
    );
    const recoveryCommand = projectMotionCurrentness.recoveryActions.find((action) => action.kind === 'COMMAND')?.command;
    if (recoveryCommand) console.error(`recovery=${recoveryCommand}`);
    console.error('Mac Remotion Studio GUI Actual remains NOT_RUN.');
    console.error('Mac DaVinci Actual remains NOT_RUN.');
    process.exit(2);
  }
  console.log(`Project Motion receipt currentness gate: ${movieArg}=CURRENT`);
}

const config = movieArg === 'opening'
  ? {
      productionExporter: 'scripts/export-opening-v1-production-bundle.mts',
      bundle: 'out/handoff/opening-v1/opening-v1-production-bundle.json',
      resolveProjectMotionSidecar: 'out/handoff/opening-v1/opening-v1-resolve-project-motion-handoff.json',
      recovery: 'out/handoff/opening-v1/opening-v1-davinci-production-recovery.json',
      recoveryMarkdown: 'out/handoff/opening-v1/opening-v1-davinci-production-recovery.md',
    }
  : {
      productionExporter: 'scripts/export-profile-v1-production-bundle.mts',
      bundle: 'out/handoff/profile-v1/profile-v1-production-bundle.json',
      resolveProjectMotionSidecar: 'out/handoff/profile-v1/profile-v1-resolve-project-motion-handoff.json',
      recovery: 'out/handoff/profile-v1/profile-v1-davinci-production-recovery.json',
      recoveryMarkdown: 'out/handoff/profile-v1/profile-v1-davinci-production-recovery.md',
    };

const run = (script: string, args: string[] = []) => spawnSync(
  process.execPath,
  ['--no-warnings', script, ...args],
  {cwd: root, encoding: 'utf8', stdio: 'pipe'},
);
const forward = (result: ReturnType<typeof run>) => {
  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
};

const bundle = run(config.productionExporter);
forward(bundle);
if (bundle.status !== 0) {
  console.error(`Wedding production handoff blocked: ${movieArg} production bundle export failed; DaVinci recovery was not exported.`);
  process.exit(bundle.status ?? 1);
}
const bundlePath = join(root, config.bundle);
if (!existsSync(bundlePath)) {
  console.error(`Wedding production handoff blocked: ${config.bundle} missing after successful exporter exit.`);
  process.exit(1);
}
if (projectMotionCurrentness) {
  try {
    const provenance = attachWeddingProjectMotionProductionProvenance(movieArg, bundlePath);
    console.log(`Project Motion provenance attached to production bundle: sourceSha256=${provenance.sourceExport.sha256}`);
  } catch (error) {
    console.error(
      `Wedding production handoff blocked: ${movieArg} Project Motion provenance could not be attached to production bundle: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
    console.error('Mac Remotion Studio GUI Actual remains NOT_RUN.');
    console.error('Mac DaVinci Actual remains NOT_RUN.');
    process.exit(2);
  }

  const resolveProjectMotionSidecar = run('scripts/export-wedding-resolve-project-motion-sidecar.mts', [`--movie=${movieArg}`]);
  forward(resolveProjectMotionSidecar);
  if (resolveProjectMotionSidecar.status !== 0) {
    console.error(`Wedding production handoff blocked: ${movieArg} Resolve Project Motion sidecar generation failed.`);
    process.exit(resolveProjectMotionSidecar.status ?? 2);
  }
  if (!existsSync(join(root, config.resolveProjectMotionSidecar))) {
    console.error(`Wedding production handoff blocked: ${config.resolveProjectMotionSidecar} missing after successful Resolve sidecar exporter exit.`);
    process.exit(2);
  }
}

const recovery = run('scripts/export-wedding-davinci-production-recovery.mts', [`--movie=${movieArg}`]);
forward(recovery);
if (recovery.status !== 0) {
  console.error(`Wedding production handoff blocked: ${movieArg} recovery sidecar export failed.`);
  process.exit(recovery.status ?? 1);
}
const recoveryPath = join(root, config.recovery);
if (!existsSync(recoveryPath)) {
  console.error(`Wedding production handoff blocked: ${config.recovery} missing after successful recovery exporter exit.`);
  process.exit(1);
}
if (projectMotionCurrentness) {
  try {
    const provenance = attachWeddingProjectMotionProductionProvenance(movieArg, recoveryPath);
    console.log(`Project Motion provenance attached to DaVinci recovery: sourceSha256=${provenance.sourceExport.sha256}`);
  } catch (error) {
    console.error(
      `Wedding production handoff blocked: ${movieArg} Project Motion provenance could not be attached to DaVinci recovery: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
    console.error('Mac Remotion Studio GUI Actual remains NOT_RUN.');
    console.error('Mac DaVinci Actual remains NOT_RUN.');
    process.exit(2);
  }
}

const remotionAttachment = run('scripts/attach-wedding-remotion-element-recovery-sidecar.mts', [`--movie=${movieArg}`]);
forward(remotionAttachment);
if (remotionAttachment.status !== 0) {
  console.error(`Wedding production handoff blocked: ${movieArg} Remotion Element gate sidecar attachment is missing or stale.`);
  process.exit(remotionAttachment.status ?? 1);
}
const recoveryMarkdownPath = join(root, config.recoveryMarkdown);
if (!existsSync(recoveryMarkdownPath)) {
  console.error(`Wedding production handoff blocked: ${config.recoveryMarkdown} missing after Remotion Element recovery attachment.`);
  process.exit(1);
}

const provenanceMarkdown = run('scripts/append-wedding-project-motion-provenance-recovery-markdown.mts', [`--movie=${movieArg}`]);
forward(provenanceMarkdown);
if (provenanceMarkdown.status !== 0) {
  console.error(`Wedding production handoff blocked: ${movieArg} Project Motion provenance could not be surfaced in recovery Markdown.`);
  process.exit(provenanceMarkdown.status ?? 1);
}

const provenanceConsistency = run('scripts/verify-wedding-project-motion-production-provenance.mts', [`--movie=${movieArg}`]);
forward(provenanceConsistency);
if (provenanceConsistency.status !== 0) {
  console.error(`Wedding production handoff blocked: ${movieArg} Project Motion provenance is inconsistent across bundle/recovery/Markdown.`);
  process.exit(provenanceConsistency.status ?? 1);
}

console.log(`Wedding production handoff complete: ${movieArg}`);
console.log(`bundle=${config.bundle}`);
if (projectMotionCurrentness) console.log(`resolveProjectMotionSidecar=${config.resolveProjectMotionSidecar}`);
console.log(`davinciRecovery=${config.recovery}`);
console.log(`davinciRecoveryMarkdown=${config.recoveryMarkdown}`);
console.log('Mac Remotion Studio GUI Actual remains NOT_RUN; sidecar attachment is not GUI evidence.');
console.log('Mac DaVinci Actual remains NOT_RUN; handoff export does not execute Resolve GUI work.');