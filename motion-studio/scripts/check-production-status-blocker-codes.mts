import {spawnSync} from 'node:child_process';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const allowedCode = /^[A-Z][A-Z0-9_]*(?::[A-Z0-9_.-]+)*$/;

function readStatus(script: string) {
  const result = spawnSync(process.execPath, ['--no-warnings', script, '--json'], {cwd: root, encoding: 'utf8'});
  if (result.status !== 0) throw new Error(`${script} failed: ${result.stderr || result.stdout}`);
  return JSON.parse(result.stdout) as {
    schemaVersion?: string;
    stages?: Record<string, {state?: string; blockers?: string[]; blockerCodes?: string[]}>;
    readiness?: {productionReady?: boolean};
  };
}

function verify(label: string, report: ReturnType<typeof readStatus>) {
  if (!report.stages) throw new Error(`${label}: stages missing`);
  let rawBlockerStageCount = 0;
  let stableCodeCount = 0;
  for (const [stageName, stage] of Object.entries(report.stages)) {
    if (!Array.isArray(stage.blockerCodes)) throw new Error(`${label}:${stageName}: blockerCodes must always be an array`);
    const raw = Array.isArray(stage.blockers) ? stage.blockers : [];
    if (raw.length > 0) rawBlockerStageCount += 1;
    if (raw.length > 0 && stage.blockerCodes.length === 0) throw new Error(`${label}:${stageName}: raw blockers exist but stable blockerCodes are empty`);
    if (new Set(stage.blockerCodes).size !== stage.blockerCodes.length) throw new Error(`${label}:${stageName}: blockerCodes must be deduplicated`);
    for (const code of stage.blockerCodes) {
      stableCodeCount += 1;
      if (!allowedCode.test(code)) throw new Error(`${label}:${stageName}: unstable blocker code syntax: ${code}`);
      if (code.includes('/') || code.includes('\\') || code.includes(' ')) throw new Error(`${label}:${stageName}: blocker code leaked path/log detail: ${code}`);
    }
  }
  if (rawBlockerStageCount === 0) throw new Error(`${label}: fresh-clone status should expose at least one real blocking stage`);
  if (stableCodeCount === 0) throw new Error(`${label}: fresh-clone status should expose at least one stable blocker code`);
  if (report.readiness?.productionReady !== false) throw new Error(`${label}: CI must not promote productionReady`);
  console.log(`${label}: stable blocker code contract OK (${stableCodeCount} codes across ${rawBlockerStageCount} raw-blocker stages)`);
}

verify('Opening', readStatus('scripts/opening-v1-production-status.mts'));
verify('Profile', readStatus('scripts/profile-v1-production-status.mts'));
