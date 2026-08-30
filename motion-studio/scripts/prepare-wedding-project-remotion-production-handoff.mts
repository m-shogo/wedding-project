import {spawnSync} from 'node:child_process';
import {existsSync} from 'node:fs';
import {isAbsolute, join, relative, resolve} from 'node:path';

const motionStudioRoot = process.cwd();
const repoRoot = resolve(motionStudioRoot, '..');

type MovieId = 'opening' | 'profile';
type Phase = 'identity' | 'handoff';

type StepResult = {
  id: string;
  command: string;
  state: 'PASS';
};

const argValue = (name: string) => {
  const exact = process.argv.find((arg) => arg.startsWith(`${name}=`));
  if (exact) return exact.slice(name.length + 1);
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
};

const movieArg = argValue('--movie');
if (movieArg !== 'opening' && movieArg !== 'profile') {
  console.error('BLOCK / MOVIE_MUST_BE_OPENING_OR_PROFILE');
  process.exit(2);
}
const movieId: MovieId = movieArg;

const phaseArg = argValue('--phase') ?? 'identity';
if (phaseArg !== 'identity' && phaseArg !== 'handoff') {
  console.error('BLOCK / PHASE_MUST_BE_IDENTITY_OR_HANDOFF');
  process.exit(2);
}
const phase: Phase = phaseArg;

const canonicalBatchPath = join(repoRoot, `movie-dashboard/out/typography-project-delivery/${movieId}-typography-production-batch.json`);
const canonicalRoleManifestPath = join(repoRoot, `movie-dashboard/out/project-role-handoff/${movieId}-production-role-handoff-manifest.json`);
const canonicalReceiptPath = join(repoRoot, `movie-dashboard/out/remotion-element-handoff/${movieId}-project-remotion-identity-verification-receipt.json`);
const canonicalCatalogIdentityPath = join(repoRoot, 'movie-dashboard/out/remotion-element-handoff/wedding-remotion-element-identities.json');
const requestedBatch = argValue('--batch');
const batchPath = requestedBatch
  ? (isAbsolute(requestedBatch) ? requestedBatch : resolve(motionStudioRoot, requestedBatch))
  : canonicalBatchPath;

const displayPath = (absolutePath: string) => relative(repoRoot, absolutePath).replaceAll('\\', '/');
const steps: StepResult[] = [];

const fail = (code: string, detail?: string): never => {
  console.error(`BLOCK / ${code}${detail ? ` / ${detail}` : ''}`);
  process.exit(1);
};

const run = (id: string, script: string, args: string[] = []) => {
  const command = `node --no-warnings scripts/${script}${args.length ? ` ${args.join(' ')}` : ''}`;
  const result = spawnSync(process.execPath, ['--no-warnings', join(motionStudioRoot, 'scripts', script), ...args], {
    cwd: motionStudioRoot,
    encoding: 'utf8',
  });
  if (result.status !== 0) {
    const detail = [result.stdout?.trim(), result.stderr?.trim()].filter(Boolean).join(' / ');
    fail(`STEP_FAILED:${id}`, detail || command);
  }
  steps.push({id, command, state: 'PASS'});
  return result.stdout.trim();
};

if (!existsSync(batchPath)) {
  fail(
    'TYPOGRAPHY_PROJECT_BATCH_MISSING_BEFORE_PRODUCTION_PREP',
    `Export Motion Zukan Typography package and place it at ${displayPath(batchPath)}`,
  );
}

run('EXPORT_CURRENT_CATALOG_IDENTITY', 'export-wedding-remotion-element-handoff-identities.mts');
run('CHECK_CURRENT_CATALOG_IDENTITY', 'check-wedding-remotion-element-handoff-identities.mts');
run('GENERATE_PROJECT_IDENTITY_RECEIPT', 'verify-wedding-project-remotion-element-identities.mts', [
  `--movie=${movieId}`,
  `--batch=${displayPath(batchPath).startsWith('motion-studio/') ? displayPath(batchPath).slice('motion-studio/'.length) : `../${displayPath(batchPath)}`}`,
]);
run('CHECK_PROJECT_IDENTITY_RECEIPT', 'check-wedding-project-remotion-element-identity-receipt.mts', [`--movie=${movieId}`]);

if (phase === 'handoff') {
  if (batchPath !== canonicalBatchPath) {
    fail('CANONICAL_BATCH_REQUIRED_FOR_HANDOFF_PHASE', `Expected ${displayPath(canonicalBatchPath)}`);
  }
  if (!existsSync(canonicalRoleManifestPath)) {
    fail(
      'PROJECT_ROLE_HANDOFF_MANIFEST_MISSING_BEFORE_CANONICAL_HANDOFF',
      `Export Motion Zukan role handoff manifest and place it at ${displayPath(canonicalRoleManifestPath)}`,
    );
  }
  run('EXPORT_CANONICAL_PRODUCTION_HANDOFF', 'export-wedding-production-handoff.mts', [`--movie=${movieId}`]);
  run('VERIFY_CANONICAL_PRODUCTION_HANDOFF', 'verify-wedding-production-handoff-provenance.mts', [`--movie=${movieId}`]);
}

const report = {
  schemaVersion: 'wedding-project-remotion-production-prep/v1',
  authority: 'DERIVED_PROJECT_REMOTION_PRODUCTION_PREP',
  movieId,
  phase,
  state: 'CURRENT',
  artifacts: {
    sourceBatch: displayPath(batchPath),
    canonicalBatch: displayPath(canonicalBatchPath),
    projectRoleManifest: displayPath(canonicalRoleManifestPath),
    catalogIdentity: displayPath(canonicalCatalogIdentityPath),
    identityReceipt: displayPath(canonicalReceiptPath),
  },
  steps,
  next: phase === 'identity'
    ? {
        kind: 'STAGE_ROLE_MANIFEST_AND_RUN_HANDOFF_PHASE',
        command: `node --no-warnings scripts/prepare-wedding-project-remotion-production-handoff.mts --movie=${movieId} --phase=handoff`,
        note: 'Run only after the canonical Typography batch and Project Role handoff manifest are staged at the paths above and upstream production requirements are ready.',
      }
    : {
        kind: 'DAVINCI_SESSION_PLAN_AND_START_GATE',
        command: `node --no-warnings scripts/wedding-davinci-actual-session-plan.mts --write`,
        note: 'Canonical production handoff provenance is current. Continue through the transported Session Plan and strict GUI Actual Start Gate; do not synthesize GUI PASS.',
      },
  evidenceBoundary: {
    macRemotionStudioGuiActual: 'NOT_RUN_UNLESS_HUMAN_EXECUTED',
    macDavinciResolveGuiActual: 'NOT_RUN_UNLESS_HUMAN_EXECUTED',
    productionReadyPromotedByThisPrep: false,
  },
  guardrails: [
    'PRODUCTION_PREP_CURRENT != REMOTION_STUDIO_GUI_ACTUAL_PASS',
    'PRODUCTION_PREP_CURRENT != MAC_DAVINCI_GUI_ACTUAL_PASS',
    'IDENTITY_PHASE_CURRENT != CANONICAL_PRODUCTION_HANDOFF_CURRENT',
    'HANDOFF_PHASE_REQUIRES_CANONICAL_BATCH_AND_ROLE_MANIFEST',
    'PRODUCTION_PREP_MUST_NOT_SYNTHESIZE_HUMAN_EVIDENCE',
  ],
} as const;

if (process.argv.includes('--json')) console.log(JSON.stringify(report, null, 2));
else {
  console.log(`projectRemotionProductionPrep=${report.state}`);
  console.log(`movieId=${movieId}`);
  console.log(`phase=${phase}`);
  console.log(`identityReceipt=${report.artifacts.identityReceipt}`);
  console.log(`next=${report.next.kind}`);
  console.log('macRemotionStudioGuiActual=NOT_RUN_UNLESS_HUMAN_EXECUTED');
  console.log('macDaVinciGuiActual=NOT_RUN_UNLESS_HUMAN_EXECUTED');
  console.log('productionReadyPromotedByThisPrep=NO');
}
