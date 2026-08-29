import {appendFileSync, readFileSync, writeFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const generatedPath = join(studioRoot, 'src/data/profileV1FramingVerdicts.generated.ts');
const original = readFileSync(generatedPath, 'utf8');

try {
  appendFileSync(generatedPath, '\n// deliberate stale framing mutation for production-preflight contract test\n');

  const run = spawnSync(
    process.execPath,
    ['--no-warnings', 'scripts/profile-v1-production-preflight.mts', '--json'],
    {cwd: studioRoot, encoding: 'utf8'},
  );

  if (run.status !== 0) {
    throw new Error(`PROFILE_PRODUCTION_PREFLIGHT_STATUS_FAILED:${run.stderr || run.stdout}`);
  }

  const report = JSON.parse(run.stdout) as {
    framing?: {state?: string; blockers?: string[]};
    readiness?: {productionPreflightReady?: boolean; blockers?: string[]};
  };

  if (report.framing?.state !== 'STALE') {
    throw new Error(`EXPECTED_STALE_FRAMING:${JSON.stringify(report.framing)}`);
  }
  if (report.readiness?.productionPreflightReady !== false) {
    throw new Error('STALE_FRAMING_MUST_BLOCK_PRODUCTION_PREFLIGHT');
  }
  if (!(report.readiness.blockers ?? []).some((blocker) => blocker.startsWith('PROFILE_FRAMING:'))) {
    throw new Error(`PROFILE_FRAMING_BLOCKER_MISSING:${JSON.stringify(report.readiness?.blockers ?? [])}`);
  }

  console.log('Profile V1 production framing gate OK: stale generated framing is reported as STALE and blocks final production preflight.');
} finally {
  writeFileSync(generatedPath, original);
}
