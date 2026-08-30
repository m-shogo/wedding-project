import {spawnSync} from 'node:child_process';
import {copyFileSync, existsSync, mkdirSync, renameSync} from 'node:fs';
import {dirname, isAbsolute, join, relative, resolve} from 'node:path';

const motionStudioRoot = process.cwd();
const repoRoot = resolve(motionStudioRoot, '..');

type MovieId = 'opening' | 'profile';
type Phase = 'identity' | 'stage' | 'handoff';

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
if (phaseArg !== 'identity' && phaseArg !== 'stage' && phaseArg !== 'handoff') {
  console.error('BLOCK / PHASE_MUST_BE_IDENTITY_STAGE_OR_HANDOFF');
  process.exit(2);
}
const phase: Phase = phaseArg;

const canonicalBatchPath = join(repoRoot, `movie-dashboard/out/typography-project-delivery/${movieId}-typography-production-batch.json`);
const canonicalRoleManifestPath = join(repoRoot, `movie-dashboard/out/project-role-handoff/${movieId}-production-role-handoff-manifest.json`);
const canonicalReceiptPath = join(repoRoot, `movie-dashboard/out/remotion-element-handoff/${movieId}-project-remotion-identity-verification-receipt.json`);
const canonicalCatalogIdentityPath = join(repoRoot, 'movie-dashboard/out/remotion-element-handoff/wedding-remotion-element-identities.json');
const requestedBatch = argValue('--batch');
const requestedRoleManifest = argValue('--role-manifest');
const batchPath = requestedBatch
  ? (isAbsolute(requestedBatch) ? requestedBatch : resolve(motionStudioRoot, requestedBatch))
  : canonicalBatchPath;
const roleManifestPath = requestedRoleManifest
  ? (isAbsolute(requestedRoleManifest) ? requestedRoleManifest : resolve(motionStudioRoot, requestedRoleManifest))
  : canonicalRoleManifestPath;

const displayPath = (absolutePath: string) => relative(repoRoot, absolutePath).replaceAll('\\', '/');
const shellQuote = (value: string) => /[\s'"$`\\]/.test(value)
  ? `'${value.replaceAll("'", `'\\''`)}'`
  : value;
const formatCommandArg = (arg: string) => {
  const separator = arg.indexOf('=');
  if (separator > 0 && arg.startsWith('--')) {
    return `${arg.slice(0, separator + 1)}${shellQuote(arg.slice(separator + 1))}`;
  }
  return shellQuote(arg);
};
const steps: StepResult[] = [];

const fail = (code: string, detail?: string): never => {
  console.error(`BLOCK / ${code}${detail ? ` / ${detail}` : ''}`);
  process.exit(1);
};

const run = (id: string, script: string, args: string[] = []) => {
  const command = `node --no-warnings scripts/${script}${args.length ? ` ${args.map(formatCommandArg).join(' ')}` : ''}`;
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

const atomicStage = (sourcePath: string, destinationPath: string) => {
  mkdirSync(dirname(destinationPath), {recursive: true});
  const stagingPath = `${destinationPath}.stage-${process.pid}-${Date.now()}`;
  copyFileSync(sourcePath, stagingPath);
  renameSync(stagingPath, destinationPath);
};

if (!existsSync(batchPath)) {
  fail(
    'TYPOGRAPHY_PROJECT_BATCH_MISSING_BEFORE_PRODUCTION_PREP',
    `Export Motion Zukan Typography package and provide it via --batch or place it at ${displayPath(canonicalBatchPath)}`,
  );
}

if (phase === 'stage') {
  if (!requestedBatch) fail('STAGE_PHASE_REQUIRES_EXPLICIT_BATCH_PATH');
  if (!requestedRoleManifest) fail('STAGE_PHASE_REQUIRES_EXPLICIT_ROLE_MANIFEST_PATH');
  if (!existsSync(roleManifestPath)) {
    fail('PROJECT_ROLE_HANDOFF_MANIFEST_MISSING_BEFORE_STAGE', `Expected operator-selected manifest at ${roleManifestPath}`);
  }
  if (batchPath === canonicalBatchPath || roleManifestPath === canonicalRoleManifestPath) {
    fail('STAGE_PHASE_REQUIRES_NON_CANONICAL_SOURCE_PATHS');
  }
}

run('EXPORT_CURRENT_CATALOG_IDENTITY', 'export-wedding-remotion-element-handoff-identities.mts');
run('CHECK_CURRENT_CATALOG_IDENTITY', 'check-wedding-remotion-element-handoff-identities.mts');
run('GENERATE_PROJECT_IDENTITY_RECEIPT', 'verify-wedding-project-remotion-element-identities.mts', [
  `--movie=${movieId}`,
  `--batch=${batchPath}`,
]);
run('CHECK_PROJECT_IDENTITY_RECEIPT', 'check-wedding-project-remotion-element-identity-receipt.mts', [`--movie=${movieId}`]);

let canonicalStageState: 'NOT_RUN' | 'CURRENT' = 'NOT_RUN';
if (phase === 'stage') {
  run('VERIFY_EXTERNAL_PROJECT_ROLE_HANDOFF', 'verify-wedding-project-remotion-identity-handoff.mts', [
    `--movie=${movieId}`,
    `--manifest=${roleManifestPath}`,
  ]);

  atomicStage(batchPath, canonicalBatchPath);
  atomicStage(roleManifestPath, canonicalRoleManifestPath);
  steps.push({
    id: 'STAGE_VALIDATED_INPUTS_TO_CANONICAL_PATHS',
    command: `atomic-stage ${shellQuote(batchPath)} -> ${displayPath(canonicalBatchPath)} ; ${shellQuote(roleManifestPath)} -> ${displayPath(canonicalRoleManifestPath)}`,
    state: 'PASS',
  });

  run('REGENERATE_CANONICAL_PROJECT_IDENTITY_RECEIPT', 'verify-wedding-project-remotion-element-identities.mts', [
    `--movie=${movieId}`,
    `--batch=${canonicalBatchPath}`,
  ]);
  run('CHECK_CANONICAL_PROJECT_IDENTITY_RECEIPT', 'check-wedding-project-remotion-element-identity-receipt.mts', [`--movie=${movieId}`]);
  run('VERIFY_CANONICAL_PROJECT_ROLE_HANDOFF', 'verify-wedding-project-remotion-identity-handoff.mts', [
    `--movie=${movieId}`,
    `--manifest=${canonicalRoleManifestPath}`,
  ]);
  canonicalStageState = 'CURRENT';
}

if (phase === 'handoff') {
  if (batchPath !== canonicalBatchPath) {
    fail('CANONICAL_BATCH_REQUIRED_FOR_HANDOFF_PHASE', `Expected ${displayPath(canonicalBatchPath)}`);
  }
  if (!existsSync(canonicalRoleManifestPath)) {
    fail(
      'PROJECT_ROLE_HANDOFF_MANIFEST_MISSING_BEFORE_CANONICAL_HANDOFF',
      `Run --phase=stage with the downloaded batch + role manifest, or place the validated manifest at ${displayPath(canonicalRoleManifestPath)}`,
    );
  }
  run('VERIFY_CANONICAL_PROJECT_ROLE_HANDOFF', 'verify-wedding-project-remotion-identity-handoff.mts', [
    `--movie=${movieId}`,
    `--manifest=${canonicalRoleManifestPath}`,
  ]);
  run('EXPORT_CANONICAL_PRODUCTION_HANDOFF', 'export-wedding-production-handoff.mts', [`--movie=${movieId}`]);
  run('VERIFY_CANONICAL_PRODUCTION_HANDOFF', 'verify-wedding-production-handoff-provenance.mts', [`--movie=${movieId}`]);
}

const next = phase === 'identity'
  ? {
      kind: 'STAGE_CANONICAL_INPUTS',
      command: `node --no-warnings scripts/prepare-wedding-project-remotion-production-handoff.mts --movie=${movieId} --phase=stage --batch='<downloaded-typography-batch-path>' --role-manifest='<downloaded-role-manifest-path>'`,
      note: 'Stage only the Human-exported batch + role manifest that pass the current SHA-bound identity/handoff verification. Stage is explicit and never runs automatically.',
    }
  : phase === 'stage'
    ? {
        kind: 'RUN_CANONICAL_HANDOFF_WHEN_UPSTREAM_READY',
        command: `node --no-warnings scripts/prepare-wedding-project-remotion-production-handoff.mts --movie=${movieId} --phase=handoff`,
        note: 'Canonical inputs and receipt are current. Run the final handoff phase only when real-media/final-render upstream production requirements are ready.',
      }
    : {
        kind: 'DAVINCI_SESSION_PLAN_AND_START_GATE',
        command: `node --no-warnings scripts/wedding-davinci-actual-session-plan.mts --write`,
        note: 'Canonical production handoff provenance is current. Continue through the transported Session Plan and strict GUI Actual Start Gate; do not synthesize GUI PASS.',
      };

const report = {
  schemaVersion: 'wedding-project-remotion-production-prep/v2',
  authority: 'DERIVED_PROJECT_REMOTION_PRODUCTION_PREP',
  movieId,
  phase,
  state: 'CURRENT',
  batchInput: {
    source: requestedBatch ? 'EXPLICIT_OPERATOR_PATH' : 'CANONICAL_PATH',
    absolutePath: batchPath,
    repoRelativePath: displayPath(batchPath),
  },
  roleManifestInput: {
    source: requestedRoleManifest ? 'EXPLICIT_OPERATOR_PATH' : 'CANONICAL_PATH',
    absolutePath: roleManifestPath,
    repoRelativePath: displayPath(roleManifestPath),
  },
  canonicalStage: {
    state: canonicalStageState,
    performedByThisRun: phase === 'stage',
    batchPath: displayPath(canonicalBatchPath),
    roleManifestPath: displayPath(canonicalRoleManifestPath),
    receiptPath: displayPath(canonicalReceiptPath),
  },
  artifacts: {
    sourceBatch: displayPath(batchPath),
    canonicalBatch: displayPath(canonicalBatchPath),
    projectRoleManifest: displayPath(canonicalRoleManifestPath),
    catalogIdentity: displayPath(canonicalCatalogIdentityPath),
    identityReceipt: displayPath(canonicalReceiptPath),
  },
  steps,
  next,
  evidenceBoundary: {
    macRemotionStudioGuiActual: 'NOT_RUN_UNLESS_HUMAN_EXECUTED',
    macDavinciResolveGuiActual: 'NOT_RUN_UNLESS_HUMAN_EXECUTED',
    productionReadyPromotedByThisPrep: false,
  },
  guardrails: [
    'PRODUCTION_PREP_CURRENT != REMOTION_STUDIO_GUI_ACTUAL_PASS',
    'PRODUCTION_PREP_CURRENT != MAC_DAVINCI_GUI_ACTUAL_PASS',
    'IDENTITY_PHASE_CURRENT != CANONICAL_PRODUCTION_HANDOFF_CURRENT',
    'STAGE_PHASE_REQUIRES_EXPLICIT_HUMAN_EXPORTED_INPUT_PATHS',
    'STAGE_PHASE_VERIFIES_EXTERNAL_BATCH_ROLE_BINDINGS_BEFORE_CANONICAL_WRITE',
    'STAGE_PHASE_REGENERATES_RECEIPT_AGAINST_CANONICAL_BATCH_AFTER_WRITE',
    'HANDOFF_PHASE_REQUIRES_CANONICAL_BATCH_AND_ROLE_MANIFEST',
    'PRODUCTION_PREP_MUST_NOT_SYNTHESIZE_HUMAN_EVIDENCE',
  ],
} as const;

if (process.argv.includes('--json')) console.log(JSON.stringify(report, null, 2));
else {
  console.log(`projectRemotionProductionPrep=${report.state}`);
  console.log(`movieId=${movieId}`);
  console.log(`phase=${phase}`);
  console.log(`batchInputSource=${report.batchInput.source}`);
  console.log(`roleManifestInputSource=${report.roleManifestInput.source}`);
  console.log(`canonicalStage=${report.canonicalStage.state}`);
  console.log(`identityReceipt=${report.artifacts.identityReceipt}`);
  console.log(`next=${report.next.kind}`);
  console.log('macRemotionStudioGuiActual=NOT_RUN_UNLESS_HUMAN_EXECUTED');
  console.log('macDaVinciGuiActual=NOT_RUN_UNLESS_HUMAN_EXECUTED');
  console.log('productionReadyPromotedByThisPrep=NO');
}
