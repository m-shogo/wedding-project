import {existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';
import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const temp = mkdtempSync(join(tmpdir(), 'wedding-davinci-gui-start-'));
const snapshot = join(temp, 'session-plan.json');
const run = (script: string, args: string[]) => spawnSync(process.execPath, ['--no-warnings', join(root, 'scripts', script), ...args], {
  cwd: root,
  encoding: 'utf8',
});

try {
  const missingArtifact = join(temp, 'opening-start-gate.json');
  const missing = run('wedding-davinci-gui-actual-start-gate.mts', ['--movie=opening', `--snapshot=${snapshot}`, `--output=${missingArtifact}`, '--write', '--strict-gui-start', '--json']);
  if (missing.status === 0) throw new Error('missing transported plan must not allow GUI Actual start');
  const missingGate = JSON.parse(missing.stdout);
  if (missingGate.state !== 'TRANSPORT_NOT_CURRENT' || missingGate.guiActualStartAllowed !== false) throw new Error('missing transport must fail closed');
  if (!missingGate.transport.mismatches.includes('SESSION_PLAN_SNAPSHOT_NOT_FOUND')) throw new Error('missing snapshot reason not surfaced');
  if (!existsSync(missingArtifact)) throw new Error('blocked gate must still write a diagnostic artifact when --write is requested');
  const persistedMissing = JSON.parse(readFileSync(missingArtifact, 'utf8'));
  if (persistedMissing.state !== missingGate.state) throw new Error('persisted blocked gate must match stdout JSON state');
  if (persistedMissing.artifact?.writeRequested !== true) throw new Error('persisted gate must record that artifact write was requested');
  if (!persistedMissing.guardrails?.includes('START_GATE_ARTIFACT_EXISTS != GUI_ACTUAL_EXECUTED')) throw new Error('artifact evidence boundary guardrail missing');
  if (persistedMissing.evidenceBoundary?.productionReady !== false) throw new Error('persisted blocked gate must remain productionReady=false');

  const write = run('wedding-davinci-actual-session-plan.mts', ['--write', `--output=${snapshot}`]);
  if (write.status !== 0) throw new Error(`session plan write failed: ${write.stderr || write.stdout}`);

  for (const movieId of ['opening', 'profile']) {
    const artifact = join(temp, `${movieId}-start-gate.json`);
    const gateResult = run('wedding-davinci-gui-actual-start-gate.mts', [`--movie=${movieId}`, `--snapshot=${snapshot}`, `--output=${artifact}`, '--write', '--json']);
    if (gateResult.status !== 0) throw new Error(`${movieId} start gate inspection failed: ${gateResult.stderr || gateResult.stdout}`);
    const gate = JSON.parse(gateResult.stdout);
    if (!existsSync(artifact)) throw new Error(`${movieId}: --write must persist the canonical gate JSON`);
    const persisted = JSON.parse(readFileSync(artifact, 'utf8'));
    if (persisted.schemaVersion !== 'wedding-davinci-gui-actual-start-gate/v1' || persisted.movieId !== movieId) throw new Error(`${movieId}: persisted artifact identity invalid`);
    if (persisted.state !== gate.state || persisted.nextAction?.kind !== gate.nextAction?.kind) throw new Error(`${movieId}: persisted artifact must match stdout gate`);
    if (persisted.artifact?.path !== artifact) throw new Error(`${movieId}: absolute custom output must be preserved in artifact metadata`);
    if (gate.transport.state !== 'CURRENT' || gate.transport.current !== true) throw new Error(`${movieId}: fresh transport must be CURRENT`);
    if (!['CURRENT', 'NOT_APPLICABLE', 'INVALID'].includes(gate.project?.projectMotionPreflight?.state)) throw new Error(`${movieId}: Project Motion preflight state must be surfaced`);
    if (typeof gate.project?.projectMotionPreflight?.command !== 'string' || !gate.project.projectMotionPreflight.command.includes(`--movie=${movieId}`)) throw new Error(`${movieId}: Project Motion verifier command must be surfaced`);
    if (gate.project.projectMotionPreflight.state === 'INVALID' && gate.state !== 'PROJECT_MOTION_BLOCKED') throw new Error(`${movieId}: INVALID Project Motion must block GUI start`);
    if (gate.project.projectMotionPreflight.state === 'INVALID' && gate.nextAction.kind !== 'REVALIDATE_PROJECT_MOTION') throw new Error(`${movieId}: INVALID Project Motion must point to canonical verifier`);
    if (!['CURRENT', 'NOT_APPLICABLE', 'INVALID'].includes(gate.project?.projectRemotionIdentityPreflight?.state)) throw new Error(`${movieId}: Project Remotion identity preflight state must be surfaced`);
    if (typeof gate.project?.projectRemotionIdentityPreflight?.command !== 'string' || !gate.project.projectRemotionIdentityPreflight.command.includes(`--movie=${movieId}`)) throw new Error(`${movieId}: Project Remotion identity verifier command must be surfaced`);
    if (gate.project.projectRemotionIdentityPreflight.state === 'CURRENT') {
      for (const key of ['resolveSidecarSha256', 'receiptSha256', 'sourceBatchSha256']) {
        if (!/^[a-f0-9]{64}$/.test(gate.project.projectRemotionIdentityPreflight[key] ?? '')) throw new Error(`${movieId}: CURRENT Project Remotion identity ${key} must be SHA-256`);
      }
    }
    if (gate.project.projectMotionPreflight.state !== 'INVALID' && gate.project.projectRemotionIdentityPreflight.state === 'INVALID') {
      if (gate.state !== 'PROJECT_REMOTION_IDENTITY_BLOCKED') throw new Error(`${movieId}: INVALID Project Remotion identity must block GUI start`);
      if (gate.nextAction.kind !== 'REVALIDATE_PROJECT_REMOTION_IDENTITY') throw new Error(`${movieId}: INVALID Project Remotion identity must point to canonical verifier`);
    }
    if (gate.evidenceBoundary?.productionReady !== false) throw new Error(`${movieId}: start gate must stay productionReady=false`);
    if (!['PROJECT_MOTION_BLOCKED', 'PROJECT_REMOTION_IDENTITY_BLOCKED', 'UPSTREAM_BLOCKED', 'EVIDENCE_INIT_REQUIRED', 'GUI_ACTUAL_ALLOWED', 'GUI_ACTUAL_COMPLETE', 'EVIDENCE_BLOCKED'].includes(gate.state)) {
      throw new Error(`${movieId}: unexpected gate state ${gate.state}`);
    }
    if ((gate.state === 'GUI_ACTUAL_ALLOWED') !== gate.guiActualStartAllowed) throw new Error(`${movieId}: GUI allowed flag/state mismatch`);
    if (gate.state === 'GUI_ACTUAL_ALLOWED' && gate.nextAction.command !== null) throw new Error(`${movieId}: human GUI action must not expose automation command`);
  }

  const tampered = JSON.parse(readFileSync(snapshot, 'utf8'));
  tampered.projects.opening.sessionState = 'GUI_ACTUAL_IN_PROGRESS';
  writeFileSync(snapshot, `${JSON.stringify(tampered, null, 2)}\n`);
  const staleArtifact = join(temp, 'stale-start-gate.json');
  const stale = run('wedding-davinci-gui-actual-start-gate.mts', ['--movie=opening', `--snapshot=${snapshot}`, `--output=${staleArtifact}`, '--write', '--strict-gui-start', '--json']);
  if (stale.status === 0) throw new Error('tampered transported plan must not allow GUI Actual start');
  const staleGate = JSON.parse(stale.stdout);
  if (staleGate.state !== 'TRANSPORT_NOT_CURRENT') throw new Error(`tampered transport expected TRANSPORT_NOT_CURRENT, got ${staleGate.state}`);
  if (!['INVALID', 'STALE'].includes(staleGate.transport.state)) throw new Error('tampered transport must be invalid/stale');
  if (!existsSync(staleArtifact)) throw new Error('stale transport should still produce a diagnostic gate artifact with --write');

  const source = readFileSync(join(root, 'scripts/wedding-davinci-gui-actual-start-gate.mts'), 'utf8');
  if (source.includes("macDavinciResolveGuiActual: 'PASS'")) throw new Error('start gate must not synthesize DaVinci PASS');
  if (source.includes('productionReady: true')) throw new Error('start gate must not synthesize productionReady');
  if (!source.includes("projectMotionPreflight.state === 'INVALID'")) throw new Error('start gate must fail close on INVALID Project Motion');
  if (!source.includes("projectRemotionIdentityPreflight.state === 'INVALID'")) throw new Error('start gate must fail close on INVALID Project Remotion identity');
  if (!source.includes("'PROJECT_MOTION_INVALID => GUI_ACTUAL_START_BLOCKED'")) throw new Error('Project Motion GUI-start guardrail missing');
  if (!source.includes("'PROJECT_REMOTION_IDENTITY_INVALID => GUI_ACTUAL_START_BLOCKED'")) throw new Error('Project Remotion identity GUI-start guardrail missing');
  if (!source.includes("state === 'GUI_ACTUAL_ALLOWED'")) throw new Error('strict GUI start must be tied only to GUI_ACTUAL_ALLOWED');
  if (!source.includes("writeFileSync(outputPath")) throw new Error('canonical Start Gate artifact writer missing');

  console.log('Wedding DaVinci GUI Actual start gate contract: PASS');
  console.log('Missing/tampered transported plan: GUI START BLOCKED + diagnostic artifact written');
  console.log('INVALID Project Motion preflight: GUI START BLOCKED');
  console.log('INVALID Project Remotion identity preflight: GUI START BLOCKED');
  console.log('Fresh transported plan: exact per-movie next action + canonical JSON artifact derived');
  console.log('START_GATE_ARTIFACT_EXISTS != GUI_ACTUAL_EXECUTED');
} finally {
  rmSync(temp, {recursive: true, force: true});
}