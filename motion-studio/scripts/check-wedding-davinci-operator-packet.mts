import {spawnSync} from 'node:child_process';
import {existsSync, readFileSync, rmSync} from 'node:fs';
import {join} from 'node:path';
import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const script = join(root, 'scripts/wedding-davinci-operator-packet.mts');
const output = join(root, 'out/qa/wedding-davinci-operator-packet-contract.json');

rmSync(output, {force: true});
const result = spawnSync(process.execPath, ['--no-warnings', script, '--output', output, '--write', '--json'], {
  cwd: root,
  encoding: 'utf8',
});
if (result.status !== 0) throw new Error(result.stderr || result.stdout || 'Operator packet command failed');
const packet = JSON.parse(result.stdout);

if (packet.schemaVersion !== 'wedding-davinci-operator-packet/v1') throw new Error('Unexpected operator packet schema');
if (packet.authority !== 'DERIVED_WEDDING_DAVINCI_OPERATOR_HANDOFF') throw new Error('Unexpected operator packet authority');
if (!existsSync(output)) throw new Error('Operator packet --write did not create output');
const written = JSON.parse(readFileSync(output, 'utf8'));
if (JSON.stringify(written) !== JSON.stringify(packet)) throw new Error('Written operator packet differs from stdout JSON');

if (packet.evidenceBoundary.macDavinciResolveGuiActual !== 'NOT_PROMOTED_BY_PACKET') throw new Error('Operator packet must not promote DaVinci GUI Actual');
if (packet.evidenceBoundary.macRemotionStudioGuiActual !== 'NOT_PROMOTED_BY_PACKET') throw new Error('Operator packet must not promote Remotion Studio GUI Actual');
if (packet.evidenceBoundary.humanFinalApproval !== 'NOT_PROMOTED_BY_PACKET') throw new Error('Operator packet must not promote Human final approval');
if (packet.evidenceBoundary.productionReady !== false) throw new Error('Operator packet artifact itself must never claim productionReady');

if (!Array.isArray(packet.orderedCommands) || packet.orderedCommands.length !== 3) throw new Error('Operator packet must contain exactly three ordered final-delivery commands');
const expectedIds = ['WRITE_READINESS_SNAPSHOT', 'REVALIDATE_TRANSPORTED_SNAPSHOT', 'FINAL_DELIVERY_STRICT'];
for (const [index, expectedId] of expectedIds.entries()) {
  const command = packet.orderedCommands[index];
  if (command.order !== index + 1 || command.id !== expectedId) throw new Error(`Operator command order mismatch at ${index + 1}`);
}

if (!packet.projects?.opening?.nextGate || !packet.projects?.profile?.nextGate) throw new Error('Operator packet requires Opening/Profile exact next gates');
if (!Array.isArray(packet.blockerCodes)) throw new Error('Operator packet blockerCodes missing');
if (!packet.guardrails.includes('OPERATOR_PACKET_EXISTS != FINAL_DELIVERY_READY')) throw new Error('Operator packet existence guardrail missing');
if (!packet.guardrails.includes('NOT_RUN != VERIFIED')) throw new Error('NOT_RUN evidence guardrail missing');

if (packet.eligible === false) {
  const strict = spawnSync(process.execPath, ['--no-warnings', script, '--output', output, '--strict'], {cwd: root, encoding: 'utf8'});
  if (strict.status === 0) throw new Error('Strict operator packet command must fail while final delivery is blocked');
}

rmSync(output, {force: true});
console.log(`Wedding DaVinci operator packet contract OK: state=${packet.state} opening=${packet.projects.opening.nextGate} profile=${packet.projects.profile.nextGate}`);
