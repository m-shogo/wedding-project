import {spawnSync} from 'node:child_process';
import {readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const script = join(root, 'scripts/wedding-davinci-actual-session-plan.mts');
const result = spawnSync(process.execPath, ['--no-warnings', script, '--json'], {
  cwd: root,
  encoding: 'utf8',
});
if (result.status !== 0) throw new Error(`session plan failed: ${result.stderr || result.stdout}`);
const plan = JSON.parse(result.stdout);
const source = readFileSync(script, 'utf8');

const assert = (condition: unknown, message: string) => {
  if (!condition) throw new Error(message);
};

assert(plan.schemaVersion === 'wedding-davinci-actual-session-plan/v1', 'schema mismatch');
assert(plan.authority === 'DERIVED_MAC_DAVINCI_ACTUAL_SESSION_PLAN', 'authority mismatch');
assert(/^[a-f0-9]{64}$/.test(plan.transportIdentitySha256), 'transport identity SHA-256 missing or invalid');
assert(plan.evidenceBoundary?.macDavinciResolveGuiActual === 'NOT_RUN_UNLESS_HUMAN_EXECUTED', 'DaVinci Actual boundary mismatch');
assert(plan.evidenceBoundary?.macRemotionStudioGuiActual === 'NOT_RUN_UNLESS_HUMAN_EXECUTED', 'Studio Actual boundary mismatch');
assert(plan.evidenceBoundary?.humanFinalApproval === 'SEPARATE_AFTER_ACTUAL_STRICT_PASS', 'Human approval boundary mismatch');
assert(plan.evidenceBoundary?.productionReady === false, 'session plan must never set productionReady');
assert(JSON.stringify(plan.sessionOrder) === JSON.stringify(['opening', 'profile']), 'session order must be deterministic');

for (const movieId of ['opening', 'profile']) {
  const project = plan.projects?.[movieId];
  assert(project?.movieId === movieId, `${movieId}: movie id mismatch`);
  assert(Array.isArray(project?.orderedActions) && project.orderedActions.length === 6, `${movieId}: action count mismatch`);
  assert(project.orderedActions[0]?.kind === 'SAFE_PREP', `${movieId}: canonical production handoff must come first`);
  assert(project.orderedActions[0]?.command === `node --no-warnings scripts/export-wedding-production-handoff.mts --movie=${movieId}`, `${movieId}: SAFE_PREP must use canonical production handoff exporter`);
  assert(project.orderedActions[1]?.kind === 'PROJECT_MOTION_PREFLIGHT', `${movieId}: Project Motion preflight must come second`);
  assert(project.orderedActions[1]?.command === `node --no-warnings scripts/verify-wedding-project-motion-production-provenance.mts --movie=${movieId}`, `${movieId}: Project Motion preflight must use canonical provenance verifier`);
  assert(project.orderedActions[1]?.purpose?.includes('before Actual evidence initialization'), `${movieId}: Project Motion preflight must explicitly gate evidence init`);
  assert(project.orderedActions[2]?.kind === 'EVIDENCE_INIT', `${movieId}: evidence init must come after Project Motion preflight`);
  assert(project.orderedActions[3]?.kind === 'MAC_GUI_ACTUAL', `${movieId}: manual GUI Actual must come after evidence init`);
  assert(project.orderedActions[3]?.command === null, `${movieId}: GUI Actual must not have an automation command`);
  assert(project.orderedActions[4]?.kind === 'STRICT_VERIFY', `${movieId}: strict verify must follow GUI Actual`);
  assert(project.orderedActions[5]?.kind === 'HUMAN_FINAL_APPROVAL', `${movieId}: final approval must be last`);
  assert(project.orderedActions[2]?.purpose?.includes('NOT_RUN'), `${movieId}: evidence init must state NOT_RUN boundary`);
  assert(project.orderedActions[3]?.purpose?.includes('CI/automation must not mark'), `${movieId}: GUI action must prohibit CI promotion`);
  assert(project.orderedActions[3]?.checklist?.some((item: string) => item.includes('Resolve Project Motion handoff sidecar path/SHA')), `${movieId}: GUI checklist must mention Resolve Project Motion sidecar SHA`);
  assert(project.actualEvidence?.state !== 'PASS' || project.sessionState === 'GUI_ACTUAL_RECORDED', `${movieId}: PASS state mapping mismatch`);
}

assert(plan.guardrails?.includes('SESSION_PLAN_EXISTS != GUI_ACTUAL_EXECUTED'), 'missing session-plan guardrail');
assert(plan.guardrails?.includes('EVIDENCE_TEMPLATE_EXISTS != GUI_ACTUAL_PASS'), 'missing evidence-template guardrail');
assert(plan.guardrails?.includes('PROJECT_MOTION_PREFLIGHT_CURRENT != GUI_ACTUAL_PASS'), 'missing Project Motion preflight evidence-boundary guardrail');
assert(plan.guardrails?.includes('PROJECT_MOTION_PREFLIGHT_MUST_RUN_BEFORE_EVIDENCE_INIT'), 'missing Project Motion preflight ordering guardrail');
assert(plan.guardrails?.includes('CI_MUST_NOT_PROMOTE_MAC_GUI_ACTUAL'), 'missing CI Actual guardrail');
assert(plan.weddingFinalization?.length === 3, 'Wedding finalization command count mismatch');
assert(plan.weddingFinalization[2]?.includes('--strict'), 'Wedding finalization must end in strict preflight');
assert(source.includes("createHash('sha256').update(JSON.stringify(planBody)).digest('hex')"), 'transport identity must bind the full canonical plan body');
assert(!source.includes("macDavinciResolveGuiActual: 'PASS'"), 'source must not synthesize DaVinci PASS');
assert(!source.includes("productionReady: true"), 'source must not synthesize productionReady');

console.log('Wedding DaVinci Actual session plan contract: PASS');
console.log(`transportIdentitySha256=${plan.transportIdentitySha256}`);
console.log(`opening=${plan.projects.opening.sessionState}`);
console.log(`profile=${plan.projects.profile.sessionState}`);
console.log('Project Motion preflight before evidence init: REQUIRED');
console.log('Mac/Studio GUI Actual promotion by CI: FORBIDDEN');
