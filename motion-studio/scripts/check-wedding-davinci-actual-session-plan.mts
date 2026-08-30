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
  assert(['CURRENT', 'NOT_APPLICABLE', 'INVALID'].includes(project?.projectMotionPreflight?.state), `${movieId}: Project Motion preflight state missing`);
  assert(typeof project?.projectMotionPreflight?.command === 'string' && project.projectMotionPreflight.command.includes(`--movie=${movieId}`), `${movieId}: Project Motion verifier command missing`);
  assert(typeof project?.projectMotionPreflight?.applicable === 'boolean', `${movieId}: Project Motion applicability missing`);
  assert(typeof project?.projectMotionPreflight?.current === 'boolean', `${movieId}: Project Motion currentness missing`);
  if (project.projectMotionPreflight.state === 'INVALID') {
    assert(project.sessionState === 'BLOCKED_PROJECT_MOTION_PREFLIGHT', `${movieId}: INVALID Project Motion must block session plan`);
  }
  assert(['CURRENT', 'NOT_APPLICABLE', 'INVALID'].includes(project?.projectRemotionIdentityPreflight?.state), `${movieId}: Project Remotion identity preflight state missing`);
  assert(typeof project?.projectRemotionIdentityPreflight?.command === 'string' && project.projectRemotionIdentityPreflight.command.includes(`--movie=${movieId}`), `${movieId}: Project Remotion identity verifier command missing`);
  assert(typeof project?.projectRemotionIdentityPreflight?.applicable === 'boolean', `${movieId}: Project Remotion identity applicability missing`);
  assert(typeof project?.projectRemotionIdentityPreflight?.current === 'boolean', `${movieId}: Project Remotion identity currentness missing`);
  if (project.projectRemotionIdentityPreflight.state === 'INVALID' && project.projectMotionPreflight.state !== 'INVALID') {
    assert(project.sessionState === 'BLOCKED_PROJECT_REMOTION_IDENTITY_PREFLIGHT', `${movieId}: INVALID Project Remotion identity must block session plan`);
  }
  assert(['CURRENT', 'NOT_APPLICABLE', 'INVALID'].includes(project?.palmierTimelinePreflight?.state), `${movieId}: Palmier timeline preflight state missing`);
  assert(typeof project?.palmierTimelinePreflight?.command === 'string' && project.palmierTimelinePreflight.command.includes(`--movie=${movieId}`), `${movieId}: Palmier timeline verifier command missing`);
  assert(typeof project?.palmierTimelinePreflight?.applicable === 'boolean', `${movieId}: Palmier timeline applicability missing`);
  assert(typeof project?.palmierTimelinePreflight?.current === 'boolean', `${movieId}: Palmier timeline currentness missing`);
  if (project.palmierTimelinePreflight.state === 'CURRENT') {
    for (const key of ['receiptSha256', 'assemblyPlanSha256', 'palmierFcpxmlSha256']) {
      assert(/^[a-f0-9]{64}$/.test(project.palmierTimelinePreflight[key] ?? ''), `${movieId}: CURRENT Palmier timeline ${key} must be SHA-256`);
    }
  }
  if (project.palmierTimelinePreflight.state === 'INVALID' && project.projectMotionPreflight.state !== 'INVALID' && project.projectRemotionIdentityPreflight.state !== 'INVALID') {
    assert(project.sessionState === 'BLOCKED_PALMIER_TIMELINE_PREFLIGHT', `${movieId}: INVALID Palmier timeline must block session plan`);
  }
  assert(Array.isArray(project?.orderedActions) && project.orderedActions.length === 8, `${movieId}: action count mismatch`);
  assert(project.orderedActions[0]?.kind === 'SAFE_PREP', `${movieId}: canonical production handoff must come first`);
  assert(project.orderedActions[0]?.command === `node --no-warnings scripts/export-wedding-production-handoff.mts --movie=${movieId}`, `${movieId}: SAFE_PREP must use canonical production handoff exporter`);
  assert(project.orderedActions[1]?.kind === 'PROJECT_MOTION_PREFLIGHT', `${movieId}: Project Motion preflight must come second`);
  assert(project.orderedActions[1]?.command === project.projectMotionPreflight.command, `${movieId}: action must reuse transported Project Motion verifier command`);
  assert(project.orderedActions[1]?.purpose?.includes(`state=${project.projectMotionPreflight.state}`), `${movieId}: action must expose transported Project Motion state`);
  assert(project.orderedActions[1]?.purpose?.includes('before Actual evidence initialization'), `${movieId}: Project Motion preflight must explicitly gate evidence init`);
  assert(project.orderedActions[2]?.kind === 'PROJECT_REMOTION_IDENTITY_PREFLIGHT', `${movieId}: Project Remotion identity preflight must come third`);
  assert(project.orderedActions[2]?.command === project.projectRemotionIdentityPreflight.command, `${movieId}: action must reuse transported Project Remotion identity verifier command`);
  assert(project.orderedActions[2]?.purpose?.includes(`state=${project.projectRemotionIdentityPreflight.state}`), `${movieId}: action must expose transported Project Remotion identity state`);
  assert(project.orderedActions[2]?.purpose?.includes('before Actual evidence initialization'), `${movieId}: Project Remotion identity preflight must explicitly gate evidence init`);
  assert(project.orderedActions[3]?.kind === 'PALMIER_TIMELINE_PREFLIGHT', `${movieId}: Palmier timeline preflight must come fourth`);
  assert(project.orderedActions[3]?.command === project.palmierTimelinePreflight.command, `${movieId}: action must reuse transported Palmier timeline verifier command`);
  assert(project.orderedActions[3]?.purpose?.includes(`state=${project.palmierTimelinePreflight.state}`), `${movieId}: action must expose transported Palmier timeline state`);
  assert(project.orderedActions[3]?.purpose?.includes('before Actual evidence initialization'), `${movieId}: Palmier timeline preflight must explicitly gate evidence init`);
  assert(project.orderedActions[4]?.kind === 'EVIDENCE_INIT', `${movieId}: evidence init must come after all provenance preflights`);
  assert(project.orderedActions[5]?.kind === 'MAC_GUI_ACTUAL', `${movieId}: manual GUI Actual must come after evidence init`);
  assert(project.orderedActions[5]?.command === null, `${movieId}: GUI Actual must not have an automation command`);
  assert(project.orderedActions[6]?.kind === 'STRICT_VERIFY', `${movieId}: strict verify must follow GUI Actual`);
  assert(project.orderedActions[7]?.kind === 'HUMAN_FINAL_APPROVAL', `${movieId}: final approval must be last`);
  assert(project.orderedActions[4]?.purpose?.includes('NOT_RUN'), `${movieId}: evidence init must state NOT_RUN boundary`);
  assert(project.orderedActions[5]?.purpose?.includes('CI/automation must not mark'), `${movieId}: GUI action must prohibit CI promotion`);
  assert(project.orderedActions[5]?.checklist?.some((item: string) => item.includes('Resolve Project Motion handoff sidecar path/SHA')), `${movieId}: GUI checklist must mention Resolve Project Motion sidecar SHA`);
  assert(project.orderedActions[5]?.checklist?.some((item: string) => item.includes('Project Remotion Element identity receipt')), `${movieId}: GUI checklist must mention Project Remotion identity receipt`);
  assert(project.orderedActions[5]?.checklist?.some((item: string) => item.includes('Palmier timeline export receipt')), `${movieId}: GUI checklist must mention Palmier timeline receipt/SHA chain`);
  assert(project.actualEvidence?.state !== 'PASS' || project.sessionState === 'GUI_ACTUAL_RECORDED', `${movieId}: PASS state mapping mismatch`);
}

assert(plan.guardrails?.includes('SESSION_PLAN_EXISTS != GUI_ACTUAL_EXECUTED'), 'missing session-plan guardrail');
assert(plan.guardrails?.includes('EVIDENCE_TEMPLATE_EXISTS != GUI_ACTUAL_PASS'), 'missing evidence-template guardrail');
assert(plan.guardrails?.includes('PROJECT_MOTION_PREFLIGHT_STATE_TRANSPORTED_WITH_SESSION_PLAN'), 'missing Project Motion transport guardrail');
assert(plan.guardrails?.includes('PROJECT_MOTION_PREFLIGHT_INVALID => SESSION_PLAN_BLOCKED'), 'missing Project Motion invalid blocker guardrail');
assert(plan.guardrails?.includes('PROJECT_MOTION_PREFLIGHT_CURRENT != GUI_ACTUAL_PASS'), 'missing Project Motion preflight evidence-boundary guardrail');
assert(plan.guardrails?.includes('PROJECT_MOTION_PREFLIGHT_MUST_RUN_BEFORE_EVIDENCE_INIT'), 'missing Project Motion preflight ordering guardrail');
assert(plan.guardrails?.includes('PROJECT_REMOTION_IDENTITY_PREFLIGHT_STATE_TRANSPORTED_WITH_SESSION_PLAN'), 'missing Project Remotion identity transport guardrail');
assert(plan.guardrails?.includes('PROJECT_REMOTION_IDENTITY_PREFLIGHT_INVALID => SESSION_PLAN_BLOCKED'), 'missing Project Remotion identity invalid blocker guardrail');
assert(plan.guardrails?.includes('PROJECT_REMOTION_IDENTITY_CURRENT != GUI_ACTUAL_PASS'), 'missing Project Remotion identity evidence-boundary guardrail');
assert(plan.guardrails?.includes('PROJECT_REMOTION_IDENTITY_PREFLIGHT_MUST_RUN_BEFORE_EVIDENCE_INIT'), 'missing Project Remotion identity preflight ordering guardrail');
assert(plan.guardrails?.includes('PALMIER_TIMELINE_PREFLIGHT_STATE_TRANSPORTED_WITH_SESSION_PLAN'), 'missing Palmier timeline transport guardrail');
assert(plan.guardrails?.includes('PALMIER_TIMELINE_PREFLIGHT_INVALID => SESSION_PLAN_BLOCKED'), 'missing Palmier timeline invalid blocker guardrail');
assert(plan.guardrails?.includes('PALMIER_TIMELINE_CURRENT != PALMIER_GUI_ACTUAL_PROVEN'), 'missing Palmier timeline GUI evidence-boundary guardrail');
assert(plan.guardrails?.includes('PALMIER_TIMELINE_CURRENT != GUI_ACTUAL_PASS'), 'missing Palmier timeline DaVinci evidence-boundary guardrail');
assert(plan.guardrails?.includes('PALMIER_TIMELINE_PREFLIGHT_MUST_RUN_BEFORE_EVIDENCE_INIT'), 'missing Palmier timeline ordering guardrail');
assert(plan.guardrails?.includes('CI_MUST_NOT_PROMOTE_MAC_GUI_ACTUAL'), 'missing CI Actual guardrail');
assert(plan.weddingFinalization?.length === 3, 'Wedding finalization command count mismatch');
assert(plan.weddingFinalization[2]?.includes('--strict'), 'Wedding finalization must end in strict preflight');
assert(source.includes("createHash('sha256').update(JSON.stringify(planBody)).digest('hex')"), 'transport identity must bind the full canonical plan body');
assert(source.includes('projectMotionPreflight: {'), 'transport body must include Project Motion preflight payload');
assert(source.includes('projectRemotionIdentityPreflight,'), 'transport body must include Project Remotion identity preflight payload');
assert(source.includes('palmierTimelinePreflight,'), 'transport body must include Palmier timeline preflight payload');
assert(!source.includes("macDavinciResolveGuiActual: 'PASS'"), 'source must not synthesize DaVinci PASS');
assert(!source.includes("productionReady: true"), 'source must not synthesize productionReady');

console.log('Wedding DaVinci Actual session plan contract: PASS');
console.log(`transportIdentitySha256=${plan.transportIdentitySha256}`);
console.log(`opening=${plan.projects.opening.sessionState}/${plan.projects.opening.projectMotionPreflight.state}/${plan.projects.opening.projectRemotionIdentityPreflight.state}/${plan.projects.opening.palmierTimelinePreflight.state}`);
console.log(`profile=${plan.projects.profile.sessionState}/${plan.projects.profile.projectMotionPreflight.state}/${plan.projects.profile.projectRemotionIdentityPreflight.state}/${plan.projects.profile.palmierTimelinePreflight.state}`);
console.log('Project Motion preflight transport binding: REQUIRED');
console.log('Project Remotion identity preflight transport binding: REQUIRED');
console.log('Palmier timeline preflight transport binding: REQUIRED');
console.log('All production preflights before evidence init: REQUIRED');
console.log('Mac/Studio GUI Actual promotion by CI: FORBIDDEN');
