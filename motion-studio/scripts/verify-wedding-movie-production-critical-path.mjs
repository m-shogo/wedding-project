import {spawnSync} from 'node:child_process';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const run = spawnSync(process.execPath, ['--no-warnings', 'scripts/wedding-movie-production-critical-path.mts', '--json'], {cwd: root, encoding: 'utf8'});
if (run.status !== 0) {
  console.error(run.stderr || run.stdout);
  process.exit(1);
}

const report = JSON.parse(run.stdout);
const errors = [];
const need = (condition, message) => { if (!condition) errors.push(message); };

need(report.schemaVersion === 'wedding-movie-production-critical-path/v1', 'critical path schema mismatch');
need(report.authority === 'DERIVED_CROSS_PROJECT_CRITICAL_PATH', 'critical path authority mismatch');
need(report.projects?.opening?.projectId === 'opening', 'opening critical path missing');
need(report.projects?.profile?.projectId === 'profile', 'profile critical path missing');

for (const projectId of ['opening', 'profile']) {
  const project = report.projects[projectId];
  need(typeof project.overallState === 'string', `${projectId}: overallState missing`);
  need(typeof project.productionReady === 'boolean', `${projectId}: productionReady missing`);
  need(Array.isArray(project.downstreamBlockedStages), `${projectId}: downstreamBlockedStages missing`);
  need(Array.isArray(project.nextActions), `${projectId}: nextActions missing`);
  if (!project.productionReady) {
    need(project.currentCriticalStage !== null, `${projectId}: not ready but no current critical stage`);
    need(typeof project.currentCriticalStage?.detail === 'string', `${projectId}: current critical detail missing`);
    need(Array.isArray(project.currentCriticalStage?.blockers), `${projectId}: blocker list missing`);
  }
}

need(Array.isArray(report.guardrails), 'guardrails missing');
for (const guardrail of [
  'CRITICAL_PATH_REPORT != PRODUCTION_APPROVAL',
  'RECOVERY_COMMAND_LISTED != RECOVERY_EXECUTED',
  'CI_STATUS != MAC_DAVINCI_ACTUAL',
  'DOWNSTREAM_BLOCKED != DOWNSTREAM_FAILED',
]) need(report.guardrails.includes(guardrail), `guardrail missing: ${guardrail}`);

const strictRun = spawnSync(process.execPath, ['--no-warnings', 'scripts/wedding-movie-production-critical-path.mts', '--strict'], {cwd: root, encoding: 'utf8'});
if (!report.productionReady) need(strictRun.status !== 0, 'strict critical path must fail closed while productionReady=false');

if (errors.length) {
  console.error(`Wedding Movie production critical path contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`Wedding Movie production critical path contracts OK: opening=${report.projects.opening.overallState}, profile=${report.projects.profile.overallState}, productionReady=${report.productionReady}`);
