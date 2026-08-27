import {spawnSync} from 'node:child_process';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const jsonMode = process.argv.includes('--json');
const strict = process.argv.includes('--strict');

const run = (script: string, args: string[] = []) =>
  spawnSync(process.execPath, ['--no-warnings', script, ...args], {
    cwd: root,
    encoding: 'utf8',
  });

const accentCheck = run('scripts/check-profile-v1-generated-accents.mts');
const generatedAccents = {
  state: accentCheck.status === 0 ? ('PASS' as const) : ('BLOCKED' as const),
  expectedCount: 3,
  detail:
    accentCheck.status === 0
      ? 'All canonical optional generated roles are implemented and bound to the production composition.'
      : 'Generated accent implementation/reuse contracts failed.',
  blockers:
    accentCheck.status === 0
      ? []
      : `${accentCheck.stdout ?? ''}\n${accentCheck.stderr ?? ''}`
          .split(/\r?\n/)
          .map((line) => line.trim())
          .filter(Boolean),
};

const assemblyRun = run('scripts/profile-v1-assembly-preflight.mts', ['--json']);
let assemblyReport: any = null;
if (assemblyRun.status === 0) {
  try {
    assemblyReport = JSON.parse(assemblyRun.stdout);
  } catch {
    assemblyReport = null;
  }
}
const assemblyReady = assemblyReport?.readiness?.assemblyReady === true;
const productionPreflightReady = generatedAccents.state === 'PASS' && assemblyReady;
const blockers = [
  ...generatedAccents.blockers.map((blocker) => `GENERATED_ACCENTS:${blocker}`),
  ...(assemblyReport?.readiness?.blockers ?? (assemblyRun.status === 0 ? [] : ['ASSEMBLY_PREFLIGHT_FAILED'])),
];

const report = {
  schemaVersion: 'profile-v1-production-preflight/v1' as const,
  authority: 'MOTION_STUDIO_DERIVED_PRODUCTION_PREFLIGHT' as const,
  generatedAccents,
  assembly: {
    state: assemblyReady ? ('PASS' as const) : ('BLOCKED' as const),
    report: assemblyReport,
  },
  readiness: {
    productionPreflightReady,
    blockers,
    macDaVinciActual: 'NOT_RUN' as const,
    productionReady: false,
  },
  guardrails: [
    'GENERATED_ACCENT_CONTRACT_PASS != HUMAN_REAL_MEDIA_QA_PASS',
    'PRODUCTION_PREFLIGHT_READY != MAC_DAVINCI_ACTUAL_VERIFIED',
    'PRODUCTION_PREFLIGHT_READY != PRODUCTION_READY',
  ],
};

if (jsonMode) {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log(
    `Profile V1 production preflight: generatedAccents=${generatedAccents.state} assembly=${assemblyReady ? 'PASS' : 'BLOCKED'} ready=${productionPreflightReady ? 'YES' : 'NO'}`,
  );
  for (const blocker of blockers) console.log(`BLOCK / ${blocker}`);
  console.log('MacDaVinciActual=NOT_RUN productionReady=NO');
}

if (strict && !productionPreflightReady) process.exit(1);
