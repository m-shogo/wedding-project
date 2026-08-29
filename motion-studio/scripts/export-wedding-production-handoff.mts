import {existsSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const movieArg = process.argv.find((arg) => arg.startsWith('--movie='))?.split('=')[1];
if (movieArg !== 'opening' && movieArg !== 'profile') {
  console.error('Usage: node --no-warnings scripts/export-wedding-production-handoff.mts --movie=opening|profile');
  process.exit(1);
}
const config = movieArg === 'opening'
  ? {
      productionExporter: 'scripts/export-opening-v1-production-bundle.mts',
      bundle: 'out/handoff/opening-v1/opening-v1-production-bundle.json',
      recovery: 'out/handoff/opening-v1/opening-v1-davinci-production-recovery.json',
      recoveryMarkdown: 'out/handoff/opening-v1/opening-v1-davinci-production-recovery.md',
    }
  : {
      productionExporter: 'scripts/export-profile-v1-production-bundle.mts',
      bundle: 'out/handoff/profile-v1/profile-v1-production-bundle.json',
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
if (!existsSync(join(root, config.bundle))) {
  console.error(`Wedding production handoff blocked: ${config.bundle} missing after successful exporter exit.`);
  process.exit(1);
}

const recovery = run('scripts/export-wedding-davinci-production-recovery.mts', [`--movie=${movieArg}`]);
forward(recovery);
if (recovery.status !== 0) {
  console.error(`Wedding production handoff blocked: ${movieArg} recovery sidecar export failed.`);
  process.exit(recovery.status ?? 1);
}
if (!existsSync(join(root, config.recovery))) {
  console.error(`Wedding production handoff blocked: ${config.recovery} missing after successful recovery exporter exit.`);
  process.exit(1);
}

const remotionAttachment = run('scripts/attach-wedding-remotion-element-recovery-sidecar.mts', [`--movie=${movieArg}`]);
forward(remotionAttachment);
if (remotionAttachment.status !== 0) {
  console.error(`Wedding production handoff blocked: ${movieArg} Remotion Element gate sidecar attachment is missing or stale.`);
  process.exit(remotionAttachment.status ?? 1);
}
if (!existsSync(join(root, config.recoveryMarkdown))) {
  console.error(`Wedding production handoff blocked: ${config.recoveryMarkdown} missing after Remotion Element recovery attachment.`);
  process.exit(1);
}

console.log(`Wedding production handoff complete: ${movieArg}`);
console.log(`bundle=${config.bundle}`);
console.log(`davinciRecovery=${config.recovery}`);
console.log(`davinciRecoveryMarkdown=${config.recoveryMarkdown}`);
console.log('Mac Remotion Studio GUI Actual remains NOT_RUN; sidecar attachment is not GUI evidence.');
console.log('Mac DaVinci Actual remains NOT_RUN; handoff export does not execute Resolve GUI work.');
