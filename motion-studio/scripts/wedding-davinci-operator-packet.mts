import {spawnSync} from 'node:child_process';
import {mkdirSync, writeFileSync} from 'node:fs';
import {dirname, isAbsolute, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const defaultOutput = join(root, 'out/handoff/wedding/wedding-davinci-operator-packet.json');

const argValue = (name: string) => {
  const exact = process.argv.find((arg) => arg.startsWith(`${name}=`));
  if (exact) return exact.slice(name.length + 1);
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
};

const requestedOutput = argValue('--output');
const outputPath = requestedOutput
  ? (isAbsolute(requestedOutput) ? requestedOutput : resolve(root, requestedOutput))
  : defaultOutput;

const runJson = (script: string, args: string[] = []) => {
  const result = spawnSync(process.execPath, ['--no-warnings', join(root, 'scripts', script), ...args, '--json'], {
    cwd: root,
    encoding: 'utf8',
  });
  if (result.status !== 0) throw new Error(`${script} failed: ${result.stderr || result.stdout}`);
  return JSON.parse(result.stdout);
};

const readiness = runJson('wedding-davinci-delivery-readiness.mts');
const preflight = runJson('wedding-davinci-final-delivery-preflight.mts');

const projectPacket = (project: any) => ({
  ready: project.ready,
  auditState: project.auditState,
  nextGate: project.nextGate,
  projectMotion: {
    state: project.projectMotion.state,
    applicable: project.projectMotion.applicable,
    current: project.projectMotion.current,
    verifierCommand: project.projectMotion.command,
    error: project.projectMotion.error,
  },
  handoffIdentitySha256: project.handoffIdentitySha256,
  davinciActualEvidenceSha256: project.davinciActualEvidenceSha256,
  finalApprovalSha256: project.finalApprovalSha256,
});

const packet = {
  schemaVersion: 'wedding-davinci-operator-packet/v1',
  authority: 'DERIVED_WEDDING_DAVINCI_OPERATOR_HANDOFF',
  state: preflight.state,
  eligible: preflight.eligible,
  evidenceBoundary: {
    macRemotionStudioGuiActual: 'NOT_PROMOTED_BY_PACKET',
    macDavinciResolveGuiActual: 'NOT_PROMOTED_BY_PACKET',
    humanFinalApproval: 'NOT_PROMOTED_BY_PACKET',
    productionReady: false,
    note: 'Operator packet is an index/handoff artifact only. It is not Mac GUI Actual evidence or Human final approval.',
  },
  snapshot: preflight.snapshot,
  projectMotionPreflight: preflight.projectMotion,
  blockerCodes: [...preflight.blockerCodes],
  projects: {
    opening: projectPacket(readiness.opening),
    profile: projectPacket(readiness.profile),
  },
  orderedCommands: [
    {
      order: 1,
      id: 'WRITE_READINESS_SNAPSHOT',
      command: 'node --no-warnings scripts/wedding-davinci-delivery-readiness.mts --write',
      purpose: 'Freeze current Opening/Profile SHA identities, Project Motion provenance states, and next gates into the transported readiness snapshot.',
    },
    {
      order: 2,
      id: 'REVALIDATE_TRANSPORTED_SNAPSHOT',
      command: 'node --no-warnings scripts/wedding-davinci-delivery-readiness-snapshot.mts --strict-current',
      purpose: 'Fail closed if transported readiness no longer matches current Project Motion provenance, recovery/Actual/final approval identities.',
    },
    {
      order: 3,
      id: 'FINAL_DELIVERY_STRICT',
      command: 'node --no-warnings scripts/wedding-davinci-final-delivery-preflight.mts --strict',
      purpose: 'Permit final delivery only when snapshot and active Project Motion provenance are CURRENT and both Opening/Profile are READY.',
    },
  ],
  recovery: [...preflight.recovery],
  guardrails: [
    'OPERATOR_PACKET_EXISTS != FINAL_DELIVERY_READY',
    'SNAPSHOT_CURRENT != FINAL_DELIVERY_READY',
    'PROJECT_MOTION_PROVENANCE_MUST_BE_CURRENT_OR_NOT_APPLICABLE_AT_FINAL_DELIVERY',
    'PROJECT_MOTION_VERIFIER_COMMAND_IN_PACKET != PROJECT_MOTION_VERIFIED',
    'FINAL_DELIVERY_READY_REQUIRES_CURRENT_SNAPSHOT_AND_BOTH_MOVIES_READY',
    'NOT_RUN != VERIFIED',
    'CI_MUST_NOT_PROMOTE_MAC_GUI_ACTUAL',
  ],
} as const;

if (process.argv.includes('--write')) {
  mkdirSync(dirname(outputPath), {recursive: true});
  writeFileSync(outputPath, `${JSON.stringify(packet, null, 2)}\n`);
}

if (process.argv.includes('--json')) console.log(JSON.stringify(packet, null, 2));
else console.log(`Wedding DaVinci operator packet: ${packet.state} / blockers=${packet.blockerCodes.join(',') || 'NONE'} / output=${outputPath}`);

if (process.argv.includes('--strict') && !packet.eligible) process.exit(1);
