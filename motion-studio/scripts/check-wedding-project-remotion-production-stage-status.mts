import {spawnSync} from 'node:child_process';
import {existsSync} from 'node:fs';
import {join, resolve} from 'node:path';

const motionStudioRoot = process.cwd();
const repoRoot = resolve(motionStudioRoot, '..');

type MovieId = 'opening' | 'profile';
type StageStatus = 'NOT_STAGED' | 'STAGED_CURRENT' | 'HANDOFF_CURRENT' | 'INVALID';

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
const strict = process.argv.includes('--strict');
const asJson = process.argv.includes('--json');

const canonicalBatchPath = join(repoRoot, `movie-dashboard/out/typography-project-delivery/${movieId}-typography-production-batch.json`);
const canonicalRoleManifestPath = join(repoRoot, `movie-dashboard/out/project-role-handoff/${movieId}-production-role-handoff-manifest.json`);
const canonicalReceiptPath = join(repoRoot, `movie-dashboard/out/remotion-element-handoff/${movieId}-project-remotion-identity-verification-receipt.json`);
const recoveryPath = join(motionStudioRoot, movieId === 'opening'
  ? 'out/handoff/opening-v1/opening-v1-davinci-production-recovery.json'
  : 'out/handoff/profile-v1/profile-v1-davinci-production-recovery.json');

const canonicalArtifacts = {
  batch: canonicalBatchPath,
  roleManifest: canonicalRoleManifestPath,
  identityReceipt: canonicalReceiptPath,
  recovery: recoveryPath,
};

const run = (script: string, args: string[] = []) => spawnSync(
  process.execPath,
  ['--no-warnings', join(motionStudioRoot, 'scripts', script), ...args],
  {cwd: motionStudioRoot, encoding: 'utf8'},
);

const compactOutput = (result: ReturnType<typeof run>) => [result.stdout?.trim(), result.stderr?.trim()].filter(Boolean).join(' / ');

const missingStageArtifacts = (['batch', 'roleManifest', 'identityReceipt'] as const)
  .filter((key) => !existsSync(canonicalArtifacts[key]));

let state: StageStatus;
let blocker: string | null = null;
let detail: string | null = null;
let stageVerification: 'NOT_RUN' | 'CURRENT' | 'INVALID' = 'NOT_RUN';
let handoffVerification: 'NOT_RUN' | 'CURRENT' | 'INVALID' = 'NOT_RUN';

if (missingStageArtifacts.length > 0) {
  state = 'NOT_STAGED';
  blocker = 'CANONICAL_PROJECT_REMOTION_STAGE_MISSING';
  detail = `Missing canonical artifacts: ${missingStageArtifacts.join(', ')}`;
} else {
  const receipt = run('check-wedding-project-remotion-element-identity-receipt.mts', [`--movie=${movieId}`]);
  if (receipt.status !== 0) {
    state = 'INVALID';
    blocker = 'PROJECT_REMOTION_IDENTITY_RECEIPT_INVALID';
    detail = compactOutput(receipt) || 'Identity receipt currentness check failed.';
    stageVerification = 'INVALID';
  } else {
    const role = run('verify-wedding-project-remotion-identity-handoff.mts', [
      `--movie=${movieId}`,
      `--manifest=${canonicalRoleManifestPath}`,
    ]);
    if (role.status !== 0) {
      state = 'INVALID';
      blocker = 'PROJECT_REMOTION_CANONICAL_ROLE_HANDOFF_INVALID';
      detail = compactOutput(role) || 'Canonical Project Role handoff verification failed.';
      stageVerification = 'INVALID';
    } else {
      stageVerification = 'CURRENT';
      if (!existsSync(recoveryPath)) {
        state = 'STAGED_CURRENT';
      } else {
        const provenance = run('verify-wedding-production-handoff-provenance.mts', [`--movie=${movieId}`]);
        if (provenance.status === 0) {
          state = 'HANDOFF_CURRENT';
          handoffVerification = 'CURRENT';
        } else {
          state = 'INVALID';
          blocker = 'CANONICAL_PRODUCTION_HANDOFF_PROVENANCE_INVALID';
          detail = compactOutput(provenance) || 'Canonical production handoff provenance verification failed.';
          handoffVerification = 'INVALID';
        }
      }
    }
  }
}

const next = state === 'NOT_STAGED'
  ? {
      kind: 'EXPORT_AND_STAGE_MOTION_ZUKAN_INPUTS',
      command: `node --no-warnings scripts/prepare-wedding-project-remotion-production-handoff.mts --movie=${movieId} --phase=stage --batch='<downloaded-typography-batch-path>' --role-manifest='<downloaded-role-manifest-path>'`,
    }
  : state === 'STAGED_CURRENT'
    ? {
        kind: 'BUILD_AND_VERIFY_REAL_PALMIER_TIMELINE_BEFORE_HANDOFF',
        command: `node --no-warnings scripts/build-wedding-palmier-typography-assembly-plan.mts --movie=${movieId} --write`,
      }
    : state === 'HANDOFF_CURRENT'
      ? {
          kind: 'DAVINCI_SESSION_PLAN_AND_START_GATE',
          command: 'node --no-warnings scripts/wedding-davinci-actual-session-plan.mts --write',
        }
      : {
          kind: 'REVALIDATE_OR_RESTAGE_PROJECT_REMOTION_INPUTS',
          command: `node --no-warnings scripts/prepare-wedding-project-remotion-production-handoff.mts --movie=${movieId} --phase=identity`,
        };

const report = {
  schemaVersion: 'wedding-project-remotion-production-stage-status/v2',
  authority: 'READ_ONLY_CANONICAL_PROJECT_REMOTION_STATUS_WITH_PALMIER_HANDOFF_ROUTE',
  movieId,
  state,
  blocker,
  detail,
  canonicalArtifacts,
  checks: {
    stageVerification,
    handoffVerification,
  },
  next,
  evidenceBoundary: {
    palmierGuiActual: 'NOT_RUN_UNLESS_HUMAN_EXECUTED',
    macRemotionStudioGuiActual: 'NOT_RUN_UNLESS_HUMAN_EXECUTED',
    macDavinciResolveGuiActual: 'NOT_RUN_UNLESS_HUMAN_EXECUTED',
    productionReadyPromotedByThisCheck: false,
  },
  guardrails: [
    'STATUS_CHECK_IS_READ_ONLY',
    'STAGED_CURRENT_REQUIRES_PALMIER_ASSEMBLY_AND_FCPXML_VERIFICATION_BEFORE_HANDOFF',
    'STAGED_CURRENT != CANONICAL_PRODUCTION_HANDOFF_CURRENT',
    'HANDOFF_CURRENT != PALMIER_GUI_ACTUAL_PASS',
    'HANDOFF_CURRENT != REMOTION_STUDIO_GUI_ACTUAL_PASS',
    'HANDOFF_CURRENT != MAC_DAVINCI_GUI_ACTUAL_PASS',
    'STATUS_CHECK_MUST_NOT_SYNTHESIZE_HUMAN_EVIDENCE',
  ],
} as const;

if (asJson) console.log(JSON.stringify(report, null, 2));
else {
  console.log(`projectRemotionProductionStageStatus=${state}`);
  console.log(`movieId=${movieId}`);
  console.log(`stageVerification=${stageVerification}`);
  console.log(`handoffVerification=${handoffVerification}`);
  if (blocker) console.log(`blocker=${blocker}`);
  if (detail) console.log(`detail=${detail}`);
  console.log(`next=${next.kind}`);
  console.log(`nextCommand=${next.command}`);
  console.log('palmierGuiActual=NOT_RUN_UNLESS_HUMAN_EXECUTED');
  console.log('macRemotionStudioGuiActual=NOT_RUN_UNLESS_HUMAN_EXECUTED');
  console.log('macDaVinciGuiActual=NOT_RUN_UNLESS_HUMAN_EXECUTED');
  console.log('productionReadyPromotedByThisCheck=NO');
}

if (strict && state !== 'STAGED_CURRENT' && state !== 'HANDOFF_CURRENT') {
  process.exit(state === 'NOT_STAGED' ? 3 : 2);
}
