import {mkdtempSync, readFileSync, rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';
import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const temp = mkdtempSync(join(tmpdir(), 'wedding-davinci-transition-proof-'));
const snapshot = join(temp, 'session-plan.json');
const run = (script: string, args: string[]) => spawnSync(process.execPath, ['--no-warnings', join(root, 'scripts', script), ...args], {
  cwd: root,
  encoding: 'utf8',
});
const sha = (value: unknown) => typeof value === 'string' && /^[a-f0-9]{64}$/.test(value);

try {
  const write = run('wedding-davinci-actual-session-plan.mts', ['--write', `--output=${snapshot}`, '--json']);
  if (write.status !== 0) throw new Error(`session plan failed: ${write.stderr || write.stdout}`);
  const plan = JSON.parse(write.stdout);
  if (plan.evidenceBoundary?.palmierTransitionAppliedGuiActual !== 'NOT_RUN_UNLESS_HUMAN_EXECUTED') throw new Error('session plan must preserve transition GUI Actual NOT_RUN boundary');
  if (!plan.guardrails?.includes('PALMIER_TRANSITION_PROOF_TRANSPORTED_WITH_SESSION_PLAN')) throw new Error('transition transport guardrail missing');
  if (!plan.guardrails?.includes('PALMIER_TRANSITION_PROOF_RECOVERY_DRIFT => SESSION_PLAN_BLOCKED')) throw new Error('transition recovery drift guardrail missing');
  if (!plan.guardrails?.includes('PALMIER_TRANSITION_PROOF_CURRENT != TRANSITION_GUI_ACTUAL_PASS')) throw new Error('transition GUI Actual evidence boundary missing');

  for (const movieId of ['opening', 'profile']) {
    const preflight = plan.projects?.[movieId]?.palmierTimelinePreflight;
    if (!preflight) throw new Error(`${movieId}: Palmier preflight missing`);
    if (!['CURRENT', 'NOT_APPLICABLE', 'INVALID'].includes(preflight.state)) throw new Error(`${movieId}: Palmier preflight state invalid`);
    if (preflight.state === 'CURRENT') {
      if (!Number.isInteger(preflight.transitionEdgeCount) || preflight.transitionEdgeCount < 0) throw new Error(`${movieId}: transitionEdgeCount invalid`);
      if (!Number.isInteger(preflight.crossDissolveCount) || preflight.crossDissolveCount < 0 || preflight.crossDissolveCount > preflight.transitionEdgeCount) throw new Error(`${movieId}: crossDissolveCount invalid`);
      if (!sha(preflight.transitionProofSha256) || preflight.transitionProofSha256 !== preflight.recoveryTransitionProofSha256) throw new Error(`${movieId}: receipt/recovery transition proof SHA mismatch`);
      if (!Array.isArray(preflight.transitionProof) || preflight.transitionProof.length !== preflight.transitionEdgeCount) throw new Error(`${movieId}: transition proof edge count mismatch`);
      for (const edge of preflight.transitionProof) {
        if (edge.state !== 'CURRENT' || typeof edge.edgeId !== 'string') throw new Error(`${movieId}: transition proof edge identity invalid`);
        if (!['HARD_CUT', 'CROSS_DISSOLVE'].includes(edge.transition)) throw new Error(`${movieId}: transition kind invalid`);
      }
      const action = plan.projects[movieId].orderedActions?.find((entry: any) => entry.kind === 'PALMIER_TIMELINE_PREFLIGHT');
      if (!action?.purpose?.includes(`transitions=${preflight.transitionEdgeCount}`) || !action.purpose.includes(`proofSha=${preflight.transitionProofSha256}`)) throw new Error(`${movieId}: ordered preflight action must expose transition proof transport`);
    }

    const gateResult = run('wedding-davinci-gui-actual-start-gate.mts', [`--movie=${movieId}`, `--snapshot=${snapshot}`, '--json']);
    if (gateResult.status !== 0) throw new Error(`${movieId}: start gate inspection failed: ${gateResult.stderr || gateResult.stdout}`);
    const gate = JSON.parse(gateResult.stdout);
    const gatePreflight = gate.project?.palmierTimelinePreflight;
    if (!gatePreflight) throw new Error(`${movieId}: start gate Palmier preflight missing`);
    if (gatePreflight.state === 'CURRENT') {
      if (gatePreflight.transitionProofCurrent !== true) throw new Error(`${movieId}: CURRENT Palmier proof must be CURRENT at GUI start gate`);
      if (gatePreflight.transitionProofSha256 !== preflight.transitionProofSha256) throw new Error(`${movieId}: start gate must carry Session Plan transition proof SHA exactly`);
      if (gatePreflight.recoveryTransitionProofSha256 !== preflight.recoveryTransitionProofSha256) throw new Error(`${movieId}: start gate must carry Recovery transition proof SHA exactly`);
      if (gatePreflight.transitionEdgeCount !== preflight.transitionEdgeCount || gatePreflight.crossDissolveCount !== preflight.crossDissolveCount) throw new Error(`${movieId}: start gate transition counts drifted`);
    }
    if (gate.evidenceBoundary?.palmierTransitionAppliedGuiActual !== 'NOT_PROMOTED_BY_START_GATE') throw new Error(`${movieId}: start gate must not promote transition GUI Actual`);
    if (!gate.guardrails?.includes('PALMIER_TRANSITION_PROOF_CURRENT_REQUIRED_BEFORE_GUI_ACTUAL')) throw new Error(`${movieId}: start gate transition proof guardrail missing`);
    if (!gate.guardrails?.includes('PALMIER_TRANSITION_PROOF_SHA_DRIFT => GUI_ACTUAL_START_BLOCKED')) throw new Error(`${movieId}: start gate transition drift blocker missing`);
  }

  const planSource = readFileSync(join(root, 'scripts/wedding-davinci-actual-session-plan.mts'), 'utf8');
  const gateSource = readFileSync(join(root, 'scripts/wedding-davinci-gui-actual-start-gate.mts'), 'utf8');
  if (!planSource.includes('PALMIER_TIMELINE_RECOVERY_TRANSITION_PROOF_DRIFT')) throw new Error('Session Plan must fail closed on Recovery transition proof drift');
  if (!planSource.includes('recoveryTransitionProofSha256 !== transitionProofSha256')) throw new Error('Session Plan must compare Recovery and receipt transition proof SHA');
  if (!gateSource.includes('transitionProofSha256 === palmierTimelinePreflight.recoveryTransitionProofSha256')) throw new Error('Start Gate must compare transported Recovery and Session transition proof SHA');
  if (planSource.includes("palmierTransitionAppliedGuiActual: 'PASS'") || gateSource.includes("palmierTransitionAppliedGuiActual: 'PASS'")) throw new Error('automation must not synthesize transition GUI Actual PASS');
  if (planSource.includes('productionReady: true') || gateSource.includes('productionReady: true')) throw new Error('transition transport must not synthesize productionReady');

  console.log('Wedding DaVinci transition proof transport contract: PASS');
  console.log('Palmier FCPXML transition proof -> Recovery -> Session Plan -> Start Gate: SHA-bound');
  console.log('Palmier transition GUI Actual: NOT_RUN / NOT_PROMOTED');
  console.log('Mac DaVinci GUI Actual: NOT_RUN unless human evidence is IN_PROGRESS and Start Gate allows it');
} finally {
  rmSync(temp, {recursive: true, force: true});
}
