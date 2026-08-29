import {spawnSync} from 'node:child_process';
import {existsSync} from 'node:fs';
import {dirname, isAbsolute, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const argValue = (name: string) => {
  const exact = process.argv.find((arg) => arg.startsWith(`${name}=`));
  if (exact) return exact.slice(name.length + 1);
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
};

const movieArg = argValue('--movie');
if (movieArg !== 'opening' && movieArg !== 'profile') {
  console.error('Use --movie=opening or --movie=profile');
  process.exit(2);
}
const movieId = movieArg;
const requestedSnapshot = argValue('--snapshot');
const snapshotPath = requestedSnapshot
  ? (isAbsolute(requestedSnapshot) ? requestedSnapshot : resolve(root, requestedSnapshot))
  : join(root, 'out/handoff/wedding/wedding-davinci-actual-session-plan.json');

const runJson = (script: string, args: string[] = []) => {
  const result = spawnSync(process.execPath, ['--no-warnings', join(root, 'scripts', script), ...args, '--json'], {
    cwd: root,
    encoding: 'utf8',
  });
  if (result.status !== 0 && !result.stdout.trim()) {
    throw new Error(`${script} failed: ${result.stderr || 'no JSON output'}`);
  }
  return {status: result.status ?? 1, json: JSON.parse(result.stdout)};
};

type StartGateState =
  | 'TRANSPORT_NOT_CURRENT'
  | 'UPSTREAM_BLOCKED'
  | 'EVIDENCE_INIT_REQUIRED'
  | 'GUI_ACTUAL_ALLOWED'
  | 'GUI_ACTUAL_COMPLETE'
  | 'EVIDENCE_BLOCKED';

const live = runJson('wedding-davinci-actual-session-plan.mts').json;
const project = live.projects[movieId];
const transport = existsSync(snapshotPath)
  ? runJson('wedding-davinci-actual-session-plan-snapshot.mts', [`--snapshot=${snapshotPath}`]).json
  : {
      state: 'NOT_RUN',
      current: false,
      mismatches: ['SESSION_PLAN_SNAPSHOT_NOT_FOUND'],
      transportedIdentitySha256: null,
      liveIdentitySha256: live.transportIdentitySha256 ?? null,
    };

const evidenceState = project.actualEvidence?.state ?? 'INVALID';
let state: StartGateState;
let nextAction: {kind: string; command: string | null; humanOnly: boolean; reason: string};

if (transport.state !== 'CURRENT' || transport.current !== true) {
  state = 'TRANSPORT_NOT_CURRENT';
  nextAction = {
    kind: 'REVALIDATE_TRANSPORT',
    command: `node --no-warnings scripts/wedding-davinci-actual-session-plan-snapshot.mts --snapshot=${snapshotPath} --strict-current`,
    humanOnly: false,
    reason: 'Mac GUI Actual must not start from a missing, stale, invalid, or otherwise non-CURRENT transported Session Plan.',
  };
} else if (!project.handoffIdentitySha256 || project.sessionState === 'BLOCKED_UPSTREAM') {
  state = 'UPSTREAM_BLOCKED';
  nextAction = {
    kind: 'RESOLVE_UPSTREAM_GATE',
    command: null,
    humanOnly: false,
    reason: `Current project next gate is ${typeof project.currentNextGate === 'string' ? project.currentNextGate : project.currentNextGate?.stage ?? 'UNKNOWN'}. Resolve upstream production/Human QA before initializing Actual evidence.`,
  };
} else if (evidenceState === 'NOT_RUN') {
  const init = project.orderedActions.find((action: any) => action.kind === 'EVIDENCE_INIT');
  state = 'EVIDENCE_INIT_REQUIRED';
  nextAction = {
    kind: 'EVIDENCE_INIT',
    command: init?.command ?? null,
    humanOnly: false,
    reason: 'Create the recovery-bound Actual evidence template first. Every GUI verdict must still begin at NOT_RUN.',
  };
} else if (evidenceState === 'IN_PROGRESS') {
  state = 'GUI_ACTUAL_ALLOWED';
  nextAction = {
    kind: 'MAC_GUI_ACTUAL',
    command: null,
    humanOnly: true,
    reason: 'Transport is CURRENT and an Actual evidence template exists in progress. The next step is the real human Mac DaVinci GUI review.',
  };
} else if (evidenceState === 'PASS') {
  const verify = project.orderedActions.find((action: any) => action.kind === 'STRICT_VERIFY');
  state = 'GUI_ACTUAL_COMPLETE';
  nextAction = {
    kind: 'STRICT_VERIFY',
    command: verify?.command ?? null,
    humanOnly: false,
    reason: 'Recorded GUI Actual verdicts are PASS; do not rerun GUI merely to satisfy automation. Strictly verify the current evidence chain next.',
  };
} else {
  state = 'EVIDENCE_BLOCKED';
  nextAction = {
    kind: 'REPAIR_ACTUAL_EVIDENCE',
    command: null,
    humanOnly: false,
    reason: `Actual evidence state is ${evidenceState}. Resolve FAIL/INVALID evidence without synthesizing PASS before any GUI continuation.`,
  };
}

const gate = {
  schemaVersion: 'wedding-davinci-gui-actual-start-gate/v1',
  authority: 'DERIVED_MAC_DAVINCI_GUI_ACTUAL_START_GATE',
  movieId,
  state,
  guiActualStartAllowed: state === 'GUI_ACTUAL_ALLOWED',
  transport: {
    state: transport.state,
    current: transport.current === true,
    snapshotPath: snapshotPath.startsWith(root) ? snapshotPath.slice(root.length + 1) : snapshotPath,
    transportedIdentitySha256: transport.transportedIdentitySha256 ?? null,
    liveIdentitySha256: transport.liveIdentitySha256 ?? live.transportIdentitySha256 ?? null,
    mismatches: [...(transport.mismatches ?? [])],
  },
  project: {
    sessionState: project.sessionState,
    evidenceState,
    handoffIdentitySha256: project.handoffIdentitySha256 ?? null,
    actualRecoverySha256: project.actualEvidence?.recoverySha256 ?? null,
    currentNextGate: project.currentNextGate,
  },
  nextAction,
  evidenceBoundary: {
    macRemotionStudioGuiActual: 'NOT_PROMOTED_BY_START_GATE',
    macDavinciResolveGuiActual: state === 'GUI_ACTUAL_ALLOWED' ? 'HUMAN_ACTION_ALLOWED_NOT_EXECUTED' : 'NOT_RUN_OR_NOT_ALLOWED',
    humanFinalApproval: 'NOT_PROMOTED_BY_START_GATE',
    productionReady: false,
  },
  guardrails: [
    'TRANSPORT_CURRENT_REQUIRED_BEFORE_GUI_ACTUAL',
    'EVIDENCE_TEMPLATE_REQUIRED_BEFORE_GUI_ACTUAL',
    'GUI_ACTUAL_ALLOWED != GUI_ACTUAL_EXECUTED',
    'START_GATE_MUST_NOT_SYNTHESIZE_PASS',
    'CI_MUST_NOT_PROMOTE_MAC_GUI_ACTUAL',
  ],
} as const;

if (process.argv.includes('--json')) console.log(JSON.stringify(gate, null, 2));
else {
  console.log(`Wedding DaVinci GUI Actual start gate: ${movieId}=${gate.state}`);
  console.log(`next=${gate.nextAction.kind}`);
  for (const mismatch of gate.transport.mismatches) console.log(`BLOCK / ${mismatch}`);
}

if (process.argv.includes('--strict-gui-start') && !gate.guiActualStartAllowed) process.exit(1);
