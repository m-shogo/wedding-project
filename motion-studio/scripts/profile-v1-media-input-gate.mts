import {spawnSync} from 'node:child_process';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

type AssemblyReport = {
  schemaVersion?: string;
  readiness?: {
    finalRenderEligible?: boolean;
    blockers?: string[];
  };
  media?: {
    readyCount?: number;
    expectedCount?: number;
  };
  audio?: {
    ready?: boolean;
    rightsState?: string;
    intakeReceiptCurrent?: boolean;
  };
};

export function assertProfileV1MediaInputsReady(studioRoot: string) {
  const result = spawnSync(
    process.execPath,
    ['--no-warnings', 'scripts/profile-v1-assembly-preflight.mts', '--json'],
    {cwd: studioRoot, encoding: 'utf8'},
  );
  if (result.status !== 0) {
    throw new Error(`PROFILE_MEDIA_INPUT_PREFLIGHT_FAILED:${result.stderr || result.stdout}`);
  }

  let report: AssemblyReport;
  try {
    report = JSON.parse(result.stdout) as AssemblyReport;
  } catch {
    throw new Error('PROFILE_MEDIA_INPUT_PREFLIGHT_INVALID_JSON');
  }

  if (report.schemaVersion !== 'profile-v1-assembly-preflight/v1') {
    throw new Error(`PROFILE_MEDIA_INPUT_PREFLIGHT_SCHEMA:${report.schemaVersion ?? 'missing'}`);
  }

  if (report.readiness?.finalRenderEligible !== true) {
    const media = `${report.media?.readyCount ?? 0}/${report.media?.expectedCount ?? 17}`;
    const bgm = report.audio?.ready === true
      ? 'READY'
      : `BLOCKED/${report.audio?.rightsState ?? 'UNKNOWN'}/receipt=${report.audio?.intakeReceiptCurrent ? 'CURRENT' : 'MISSING_OR_STALE'}`;
    const blockers = report.readiness?.blockers ?? [];
    throw new Error(`PROFILE_REAL_MEDIA_INPUTS_NOT_READY:media=${media}:bgm=${bgm}:${blockers.join('|')}`);
  }

  return report;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
  try {
    const report = assertProfileV1MediaInputsReady(studioRoot);
    console.log(`Profile V1 media input gate PASS: media=${report.media?.readyCount}/${report.media?.expectedCount} BGM=READY`);
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}
