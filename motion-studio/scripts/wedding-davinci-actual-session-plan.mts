import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, isAbsolute, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const defaultOutput = join(root, 'out/handoff/wedding/wedding-davinci-actual-session-plan.json');
const requestedOutput = (() => {
  const exact = process.argv.find((arg) => arg.startsWith('--output='));
  if (exact) return exact.slice('--output='.length);
  const index = process.argv.indexOf('--output');
  return index >= 0 ? process.argv[index + 1] : undefined;
})();
const outputPath = requestedOutput
  ? (isAbsolute(requestedOutput) ? requestedOutput : resolve(root, requestedOutput))
  : defaultOutput;

const evidencePaths = {
  opening: join(root, 'out/qa/opening-v1-davinci-finishing-evidence.json'),
  profile: join(root, 'out/qa/profile-v1-davinci-finishing-evidence.json'),
} as const;

type MovieId = keyof typeof evidencePaths;
type EvidenceState = 'NOT_RUN' | 'IN_PROGRESS' | 'PASS' | 'FAIL' | 'INVALID';

type ActualEvidence = {
  authority?: string;
  productionRecovery?: {sha256?: string};
  sourceRender?: {shaMatch?: string};
  resolve?: {timelineInsertion?: string; durationAndFps?: string};
  finishing?: {
    color?: string;
    audio?: string;
    titleSafeAndFraming?: string;
    playback1x?: string;
    playbackHalfSpeed?: string;
  };
  export?: {
    duration?: string;
    dimensions?: string;
    fps?: string;
    audioPresent?: string;
    watchedWithSound?: string;
  };
  review?: {overall?: string; reviewer?: string | null; reviewedAt?: string | null};
  productionReady?: boolean;
};

const runJson = (script: string) => {
  const result = spawnSync(process.execPath, ['--no-warnings', join(root, 'scripts', script), '--json'], {
    cwd: root,
    encoding: 'utf8',
  });
  if (result.status !== 0) throw new Error(`${script} failed: ${result.stderr || result.stdout}`);
  return JSON.parse(result.stdout);
};

const operatorPacket = runJson('wedding-davinci-operator-packet.mts');

const verdictFields = (evidence: ActualEvidence) => [
  evidence.sourceRender?.shaMatch,
  evidence.resolve?.timelineInsertion,
  evidence.resolve?.durationAndFps,
  evidence.finishing?.color,
  evidence.finishing?.audio,
  evidence.finishing?.titleSafeAndFraming,
  evidence.finishing?.playback1x,
  evidence.finishing?.playbackHalfSpeed,
  evidence.export?.duration,
  evidence.export?.dimensions,
  evidence.export?.fps,
  evidence.export?.audioPresent,
  evidence.export?.watchedWithSound,
  evidence.review?.overall,
].filter((value): value is string => typeof value === 'string');

const inspectEvidence = (movieId: MovieId) => {
  const path = evidencePaths[movieId];
  if (!existsSync(path)) return {state: 'NOT_RUN' as EvidenceState, path: path.slice(root.length + 1), recoverySha256: null};
  try {
    const evidence = JSON.parse(readFileSync(path, 'utf8')) as ActualEvidence;
    if (evidence.authority !== 'MAC_DAVINCI_ACTUAL_EVIDENCE' || evidence.productionReady !== false) {
      return {state: 'INVALID' as EvidenceState, path: path.slice(root.length + 1), recoverySha256: evidence.productionRecovery?.sha256 ?? null};
    }
    const verdicts = verdictFields(evidence);
    if (verdicts.some((value) => value === 'FAIL')) {
      return {state: 'FAIL' as EvidenceState, path: path.slice(root.length + 1), recoverySha256: evidence.productionRecovery?.sha256 ?? null};
    }
    if (evidence.review?.overall === 'PASS' && verdicts.length > 0 && verdicts.every((value) => value === 'PASS')) {
      return {state: 'PASS' as EvidenceState, path: path.slice(root.length + 1), recoverySha256: evidence.productionRecovery?.sha256 ?? null};
    }
    return {state: 'IN_PROGRESS' as EvidenceState, path: path.slice(root.length + 1), recoverySha256: evidence.productionRecovery?.sha256 ?? null};
  } catch {
    return {state: 'INVALID' as EvidenceState, path: path.slice(root.length + 1), recoverySha256: null};
  }
};

const manualChecklist = [
  'Confirm the source render readback SHA matches the recovery-bound expected SHA before editing.',
  'Confirm the Resolve Project Motion handoff sidecar path/SHA shown in recovery Markdown matches the canonical preflight result before editing.',
  'Record DaVinci Resolve version, project name, timeline name, timeline insertion, duration and FPS.',
  'Review color, audio, title-safe/framing, playback at 1x, and playback at half speed in the real Mac GUI.',
  'Export from DaVinci and record path/SHA plus duration, dimensions, FPS, audio presence, and watched-with-sound verdicts.',
  'Set review.overall=PASS only after every required GUI Actual verdict is PASS and reviewer/reviewedAt are recorded.',
] as const;

const buildProject = (movieId: MovieId) => {
  const project = operatorPacket.projects[movieId];
  const evidence = inspectEvidence(movieId);
  const prefix = movieId === 'opening' ? 'opening' : 'profile';
  return {
    movieId,
    upstreamReady: project.ready,
    auditState: project.auditState,
    currentNextGate: project.nextGate,
    handoffIdentitySha256: project.handoffIdentitySha256,
    expectedDavinciActualEvidenceSha256: project.davinciActualEvidenceSha256,
    actualEvidence: evidence,
    sessionState: !project.handoffIdentitySha256
      ? 'BLOCKED_UPSTREAM'
      : evidence.state === 'NOT_RUN'
        ? 'READY_TO_INITIALIZE_WHEN_RECOVERY_CURRENT'
        : evidence.state === 'PASS'
          ? 'GUI_ACTUAL_RECORDED'
          : evidence.state === 'IN_PROGRESS'
            ? 'GUI_ACTUAL_IN_PROGRESS'
            : 'GUI_ACTUAL_BLOCKED',
    orderedActions: [
      {
        order: 1,
        kind: 'SAFE_PREP',
        command: `node --no-warnings scripts/export-wedding-production-handoff.mts --movie=${movieId}`,
        purpose: 'Regenerate the canonical production bundle, Project Motion provenance/Resolve sidecar when applicable, recovery JSON, and recovery Markdown. This does not run DaVinci.',
      },
      {
        order: 2,
        kind: 'PROJECT_MOTION_PREFLIGHT',
        command: `node --no-warnings scripts/verify-wedding-project-motion-production-provenance.mts --movie=${movieId}`,
        purpose: 'Fail closed on stale/replaced Resolve Project Motion sidecars or Palmier binding drift before Actual evidence initialization. NOT_APPLICABLE is allowed when no Project Motion provenance is in use.',
      },
      {
        order: 3,
        kind: 'EVIDENCE_INIT',
        command: `node --no-warnings scripts/${prefix}-v1-davinci-finishing-evidence.mts --init`,
        purpose: 'Create an Actual evidence template bound to the current recovery SHA. Every GUI verdict starts at NOT_RUN.',
      },
      {
        order: 4,
        kind: 'MAC_GUI_ACTUAL',
        command: null,
        purpose: 'Open DaVinci Resolve on the Mac and perform the manual checklist. CI/automation must not mark these verdicts PASS.',
        checklist: manualChecklist,
      },
      {
        order: 5,
        kind: 'STRICT_VERIFY',
        command: `node --no-warnings scripts/${prefix}-v1-davinci-finishing-evidence.mts --strict`,
        purpose: 'Fail closed unless the evidence is current, recovery-bound, and every required Actual verdict is PASS.',
      },
      {
        order: 6,
        kind: 'HUMAN_FINAL_APPROVAL',
        command: `node --no-warnings scripts/${prefix}-v1-final-delivery-approval.mts --init`,
        purpose: 'Initialize final Human approval only after strict DaVinci Actual verification succeeds; approval remains a separate Human action.',
      },
    ],
  };
};

const planBody = {
  schemaVersion: 'wedding-davinci-actual-session-plan/v1',
  authority: 'DERIVED_MAC_DAVINCI_ACTUAL_SESSION_PLAN',
  generatedFromOperatorPacketSchema: operatorPacket.schemaVersion,
  evidenceBoundary: {
    macRemotionStudioGuiActual: 'NOT_RUN_UNLESS_HUMAN_EXECUTED',
    macDavinciResolveGuiActual: 'NOT_RUN_UNLESS_HUMAN_EXECUTED',
    humanFinalApproval: 'SEPARATE_AFTER_ACTUAL_STRICT_PASS',
    productionReady: false,
  },
  sessionOrder: ['opening', 'profile'],
  projects: {
    opening: buildProject('opening'),
    profile: buildProject('profile'),
  },
  weddingFinalization: [
    'node --no-warnings scripts/wedding-davinci-delivery-readiness.mts --write',
    'node --no-warnings scripts/wedding-davinci-delivery-readiness-snapshot.mts --strict-current',
    'node --no-warnings scripts/wedding-davinci-final-delivery-preflight.mts --strict',
  ],
  guardrails: [
    'SESSION_PLAN_EXISTS != GUI_ACTUAL_EXECUTED',
    'EVIDENCE_TEMPLATE_EXISTS != GUI_ACTUAL_PASS',
    'RECOVERY_CURRENT != GUI_ACTUAL_PASS',
    'PROJECT_MOTION_PREFLIGHT_CURRENT != GUI_ACTUAL_PASS',
    'PROJECT_MOTION_PREFLIGHT_MUST_RUN_BEFORE_EVIDENCE_INIT',
    'CI_MUST_NOT_PROMOTE_MAC_GUI_ACTUAL',
    'FINAL_HUMAN_APPROVAL_REQUIRES_STRICT_CURRENT_ACTUAL_EVIDENCE',
  ],
} as const;

const transportIdentitySha256 = createHash('sha256').update(JSON.stringify(planBody)).digest('hex');
const plan = {...planBody, transportIdentitySha256} as const;

if (process.argv.includes('--write')) {
  mkdirSync(dirname(outputPath), {recursive: true});
  writeFileSync(outputPath, `${JSON.stringify(plan, null, 2)}\n`);
}

if (process.argv.includes('--json')) console.log(JSON.stringify(plan, null, 2));
else {
  console.log(`Wedding DaVinci Actual session plan: opening=${plan.projects.opening.sessionState} / profile=${plan.projects.profile.sessionState}`);
  console.log(`transportIdentitySha256=${plan.transportIdentitySha256}`);
  console.log('Mac/DaVinci GUI Actual remains NOT_RUN unless a human actually performs and records the GUI checks.');
  console.log(`output=${outputPath}`);
}
