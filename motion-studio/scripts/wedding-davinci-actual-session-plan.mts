import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, isAbsolute, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {verifyWeddingProjectRemotionIdentityProductionConsistency} from './verify-wedding-project-remotion-identity-production-consistency.mts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = resolve(root, '..');
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

type PalmierTimelineReceipt = {
  source?: {
    assemblyPlan?: {path?: string; sha256?: string};
    palmierFcpxml?: {path?: string; sha256?: string};
  };
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

const inspectProjectRemotionIdentity = (movieId: MovieId) => {
  const batchPath = join(repoRoot, `movie-dashboard/out/typography-project-delivery/${movieId}-typography-production-batch.json`);
  const manifestPath = join(repoRoot, `movie-dashboard/out/project-role-handoff/${movieId}-production-role-handoff-manifest.json`);
  const receiptPath = join(repoRoot, `movie-dashboard/out/remotion-element-handoff/${movieId}-project-remotion-identity-verification-receipt.json`);
  const handoffDir = join(root, 'out/handoff', `${movieId}-v1`);
  const recoveryPath = join(handoffDir, `${movieId}-v1-davinci-production-recovery.json`);
  const markdownPath = join(handoffDir, `${movieId}-v1-davinci-production-recovery.md`);
  const command = `node --no-warnings scripts/verify-wedding-production-handoff-provenance.mts --movie=${movieId}`;
  const applicable = [batchPath, manifestPath, receiptPath].some((path) => existsSync(path));
  if (!applicable) {
    return {
      state: 'NOT_APPLICABLE' as const,
      applicable: false,
      current: false,
      command,
      resolveSidecarSha256: null,
      receiptSha256: null,
      sourceBatchSha256: null,
      error: null,
    };
  }
  try {
    const result = verifyWeddingProjectRemotionIdentityProductionConsistency({
      movieId,
      recoveryPath,
      markdownPath,
      motionStudioRoot: root,
    });
    if (result.state !== 'CURRENT') throw new Error('PROJECT_REMOTION_IDENTITY_EXPECTED_CURRENT_WHEN_APPLICABLE');
    return {
      state: 'CURRENT' as const,
      applicable: true,
      current: true,
      command,
      resolveSidecarSha256: result.resolveSidecarSha256,
      receiptSha256: result.receiptSha256,
      sourceBatchSha256: result.sourceBatchSha256,
      error: null,
    };
  } catch (error) {
    return {
      state: 'INVALID' as const,
      applicable: true,
      current: false,
      command,
      resolveSidecarSha256: null,
      receiptSha256: null,
      sourceBatchSha256: null,
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

const inspectPalmierTimelineExport = (movieId: MovieId, projectRemotionApplicable: boolean) => {
  const receiptPath = join(root, `out/handoff/wedding/${movieId}-palmier-typography-timeline-export-receipt.json`);
  const command = `node --no-warnings scripts/check-wedding-palmier-typography-timeline-export-receipt.mts --movie=${movieId} --strict`;
  const applicable = projectRemotionApplicable || existsSync(receiptPath);
  if (!applicable) {
    return {
      state: 'NOT_APPLICABLE' as const,
      applicable: false,
      current: false,
      command,
      receiptSha256: null,
      assemblyPlanSha256: null,
      palmierFcpxmlSha256: null,
      error: null,
    };
  }
  const result = spawnSync(process.execPath, ['--no-warnings', join(root, 'scripts/check-wedding-palmier-typography-timeline-export-receipt.mts'), `--movie=${movieId}`, '--json'], {
    cwd: root,
    encoding: 'utf8',
  });
  try {
    if (result.status !== 0 || !result.stdout.trim()) throw new Error(result.stderr || 'PALMIER_TIMELINE_PREFLIGHT_NO_JSON');
    const report = JSON.parse(result.stdout) as {state?: string; detail?: string | null};
    if (report.state !== 'CURRENT') throw new Error(report.detail ?? `PALMIER_TIMELINE_${report.state ?? 'INVALID'}`);
    if (!existsSync(receiptPath)) throw new Error('PALMIER_TIMELINE_RECEIPT_MISSING_AFTER_CURRENT_CHECK');
    const receiptRaw = readFileSync(receiptPath, 'utf8');
    const receipt = JSON.parse(receiptRaw) as PalmierTimelineReceipt;
    const assemblyPlanSha256 = receipt.source?.assemblyPlan?.sha256 ?? null;
    const palmierFcpxmlSha256 = receipt.source?.palmierFcpxml?.sha256 ?? null;
    if (!/^[a-f0-9]{64}$/.test(assemblyPlanSha256 ?? '') || !/^[a-f0-9]{64}$/.test(palmierFcpxmlSha256 ?? '')) {
      throw new Error('PALMIER_TIMELINE_RECEIPT_SHA_BINDING_INVALID');
    }
    return {
      state: 'CURRENT' as const,
      applicable: true,
      current: true,
      command,
      receiptSha256: createHash('sha256').update(receiptRaw).digest('hex'),
      assemblyPlanSha256,
      palmierFcpxmlSha256,
      error: null,
    };
  } catch (error) {
    return {
      state: 'INVALID' as const,
      applicable: true,
      current: false,
      command,
      receiptSha256: null,
      assemblyPlanSha256: null,
      palmierFcpxmlSha256: null,
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

const manualChecklist = [
  'Confirm the source render readback SHA matches the recovery-bound expected SHA before editing.',
  'Confirm the Resolve Project Motion handoff sidecar path/SHA shown in recovery Markdown matches the canonical preflight result before editing.',
  'Confirm the Project Remotion Element identity receipt and Resolve identity sidecar SHA shown in recovery Markdown match the transported session-plan preflight before editing.',
  'Confirm the Palmier timeline export receipt, Assembly Plan SHA, and real FCPXML SHA match the transported Session Plan before editing.',
  'Record DaVinci Resolve version, project name, timeline name, timeline insertion, duration and FPS.',
  'Review color, audio, title-safe/framing, playback at 1x, and playback at half speed in the real Mac GUI.',
  'Export from DaVinci and record path/SHA plus duration, dimensions, FPS, audio presence, and watched-with-sound verdicts.',
  'Set review.overall=PASS only after every required GUI Actual verdict is PASS and reviewer/reviewedAt are recorded.',
] as const;

const buildProject = (movieId: MovieId) => {
  const project = operatorPacket.projects[movieId];
  const projectMotionPreflight = operatorPacket.projectMotionPreflight[movieId];
  const projectRemotionIdentityPreflight = inspectProjectRemotionIdentity(movieId);
  const palmierTimelinePreflight = inspectPalmierTimelineExport(movieId, projectRemotionIdentityPreflight.applicable);
  const evidence = inspectEvidence(movieId);
  const prefix = movieId === 'opening' ? 'opening' : 'profile';
  return {
    movieId,
    upstreamReady: project.ready,
    auditState: project.auditState,
    currentNextGate: project.nextGate,
    projectMotionPreflight: {
      state: projectMotionPreflight.state,
      applicable: projectMotionPreflight.applicable,
      current: projectMotionPreflight.current,
      command: projectMotionPreflight.command,
      error: projectMotionPreflight.error ?? null,
    },
    projectRemotionIdentityPreflight,
    palmierTimelinePreflight,
    handoffIdentitySha256: project.handoffIdentitySha256,
    expectedDavinciActualEvidenceSha256: project.davinciActualEvidenceSha256,
    actualEvidence: evidence,
    sessionState: projectMotionPreflight.state === 'INVALID'
      ? 'BLOCKED_PROJECT_MOTION_PREFLIGHT'
      : projectRemotionIdentityPreflight.state === 'INVALID'
        ? 'BLOCKED_PROJECT_REMOTION_IDENTITY_PREFLIGHT'
        : palmierTimelinePreflight.state === 'INVALID'
          ? 'BLOCKED_PALMIER_TIMELINE_PREFLIGHT'
          : !project.handoffIdentitySha256
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
        purpose: 'Regenerate the canonical production bundle and all applicable provenance/recovery sidecars. This does not run DaVinci.',
      },
      {
        order: 2,
        kind: 'PROJECT_MOTION_PREFLIGHT',
        command: projectMotionPreflight.command,
        purpose: `Transported Project Motion state=${projectMotionPreflight.state}. Fail closed on provenance drift before Actual evidence initialization.`,
      },
      {
        order: 3,
        kind: 'PROJECT_REMOTION_IDENTITY_PREFLIGHT',
        command: projectRemotionIdentityPreflight.command,
        purpose: `Transported Project Remotion identity state=${projectRemotionIdentityPreflight.state}. Fail closed on identity/recovery drift before Actual evidence initialization.`,
      },
      {
        order: 4,
        kind: 'PALMIER_TIMELINE_PREFLIGHT',
        command: palmierTimelinePreflight.command,
        purpose: `Transported Palmier timeline state=${palmierTimelinePreflight.state}. When Project Remotion typography is in use, require a CURRENT SHA-bound real FCPXML receipt before Actual evidence initialization.`,
      },
      {
        order: 5,
        kind: 'EVIDENCE_INIT',
        command: `node --no-warnings scripts/${prefix}-v1-davinci-finishing-evidence.mts --init`,
        purpose: 'Create an Actual evidence template bound to the current recovery SHA. Every GUI verdict starts at NOT_RUN.',
      },
      {
        order: 6,
        kind: 'MAC_GUI_ACTUAL',
        command: null,
        purpose: 'Open DaVinci Resolve on the Mac and perform the manual checklist. CI/automation must not mark these verdicts PASS.',
        checklist: manualChecklist,
      },
      {
        order: 7,
        kind: 'STRICT_VERIFY',
        command: `node --no-warnings scripts/${prefix}-v1-davinci-finishing-evidence.mts --strict`,
        purpose: 'Fail closed unless the evidence is current, recovery-bound, and every required Actual verdict is PASS.',
      },
      {
        order: 8,
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
    'PROJECT_MOTION_PREFLIGHT_STATE_TRANSPORTED_WITH_SESSION_PLAN',
    'PROJECT_MOTION_PREFLIGHT_INVALID => SESSION_PLAN_BLOCKED',
    'PROJECT_MOTION_PREFLIGHT_CURRENT != GUI_ACTUAL_PASS',
    'PROJECT_MOTION_PREFLIGHT_MUST_RUN_BEFORE_EVIDENCE_INIT',
    'PROJECT_REMOTION_IDENTITY_PREFLIGHT_STATE_TRANSPORTED_WITH_SESSION_PLAN',
    'PROJECT_REMOTION_IDENTITY_PREFLIGHT_INVALID => SESSION_PLAN_BLOCKED',
    'PROJECT_REMOTION_IDENTITY_CURRENT != GUI_ACTUAL_PASS',
    'PROJECT_REMOTION_IDENTITY_PREFLIGHT_MUST_RUN_BEFORE_EVIDENCE_INIT',
    'PALMIER_TIMELINE_PREFLIGHT_STATE_TRANSPORTED_WITH_SESSION_PLAN',
    'PALMIER_TIMELINE_PREFLIGHT_INVALID => SESSION_PLAN_BLOCKED',
    'PALMIER_TIMELINE_CURRENT != PALMIER_GUI_ACTUAL_PROVEN',
    'PALMIER_TIMELINE_CURRENT != GUI_ACTUAL_PASS',
    'PALMIER_TIMELINE_PREFLIGHT_MUST_RUN_BEFORE_EVIDENCE_INIT',
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
