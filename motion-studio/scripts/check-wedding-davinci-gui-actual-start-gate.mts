import {mkdtempSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
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
  const missing = run('wedding-davinci-gui-actual-start-gate.mts', ['--movie=opening', `--snapshot=${snapshot}`, '--strict-gui-start', '--json']);
  if (missing.status === 0) throw new Error('missing transported plan must not allow GUI Actual start');
  const missingGate = JSON.parse(missing.stdout);
  if (missingGate.state !== 'TRANSPORT_NOT_CURRENT' || missingGate.guiActualStartAllowed !== false) throw new Error('missing transport must fail closed');
  if (!missingGate.transport.mismatches.includes('SESSION_PLAN_SNAPSHOT_NOT_FOUND')) throw new Error('missing snapshot reason not surfaced');

  const write = run('wedding-davinci-actual-session-plan.mts', ['--write', `--output=${snapshot}`]);
  if (write.status !== 0) throw new Error(`session plan write failed: ${write.stderr || write.stdout}`);

  for (const movieId of ['opening', 'profile']) {
    const gateResult = run('wedding-davinci-gui-actual-start-gate.mts', [`--movie=${movieId}`, `--snapshot=${snapshot}`, '--json']);
    if (gateResult.status !== 0) throw new Error(`${movieId} start gate inspection failed: ${gateResult.stderr || gateResult.stdout}`);
    const gate = JSON.parse(gateResult.stdout);
    if (gate.transport.state !== 'CURRENT' || gate.transport.current !== true) throw new Error(`${movieId}: fresh transport must be CURRENT`);
    if (gate.evidenceBoundary?.productionReady !== false) throw new Error(`${movieId}: start gate must stay productionReady=false`);
    if (!['UPSTREAM_BLOCKED', 'EVIDENCE_INIT_REQUIRED', 'GUI_ACTUAL_ALLOWED', 'GUI_ACTUAL_COMPLETE', 'EVIDENCE_BLOCKED'].includes(gate.state)) {
      throw new Error(`${movieId}: unexpected gate state ${gate.state}`);
    }
    if ((gate.state === 'GUI_ACTUAL_ALLOWED') !== gate.guiActualStartAllowed) throw new Error(`${movieId}: GUI allowed flag/state mismatch`);
    if (gate.state === 'GUI_ACTUAL_ALLOWED' && gate.nextAction.command !== null) throw new Error(`${movieId}: human GUI action must not expose automation command`);
  }

  const tampered = JSON.parse(readFileSync(snapshot, 'utf8'));
  tampered.projects.opening.sessionState = 'GUI_ACTUAL_IN_PROGRESS';
  writeFileSync(snapshot, `${JSON.stringify(tampered, null, 2)}\n`);
  const stale = run('wedding-davinci-gui-actual-start-gate.mts', ['--movie=opening', `--snapshot=${snapshot}`, '--strict-gui-start', '--json']);
  if (stale.status === 0) throw new Error('tampered transported plan must not allow GUI Actual start');
  const staleGate = JSON.parse(stale.stdout);
  if (staleGate.state !== 'TRANSPORT_NOT_CURRENT') throw new Error(`tampered transport expected TRANSPORT_NOT_CURRENT, got ${staleGate.state}`);
  if (!['INVALID', 'STALE'].includes(staleGate.transport.state)) throw new Error('tampered transport must be invalid/stale');

  const source = readFileSync(join(root, 'scripts/wedding-davinci-gui-actual-start-gate.mts'), 'utf8');
  if (source.includes("macDavinciResolveGuiActual: 'PASS'")) throw new Error('start gate must not synthesize DaVinci PASS');
  if (source.includes('productionReady: true')) throw new Error('start gate must not synthesize productionReady');
  if (!source.includes("state === 'GUI_ACTUAL_ALLOWED'")) throw new Error('strict GUI start must be tied only to GUI_ACTUAL_ALLOWED');

  console.log('Wedding DaVinci GUI Actual start gate contract: PASS');
  console.log('Missing/tampered transported plan: GUI START BLOCKED');
  console.log('Fresh transported plan: exact per-movie next action derived');
  console.log('GUI_ACTUAL_ALLOWED != GUI_ACTUAL_EXECUTED');
} finally {
  rmSync(temp, {recursive: true, force: true});
}
