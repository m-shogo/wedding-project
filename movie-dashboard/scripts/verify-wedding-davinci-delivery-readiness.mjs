import {readFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const dashboardRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const repoRoot = resolve(dashboardRoot, '..');
const motionRoot = resolve(repoRoot, 'motion-studio');
const scriptPath = resolve(motionRoot, 'scripts/wedding-davinci-delivery-readiness.mts');

const run = spawnSync(process.execPath, ['--no-warnings', scriptPath, '--json'], {
  cwd: motionRoot,
  encoding: 'utf8',
});
if (run.status !== 0) throw new Error(run.stderr || run.stdout || 'Wedding DaVinci readiness command failed');
const report = JSON.parse(run.stdout);

const fail = (message) => { throw new Error(message); };
if (report.schemaVersion !== 'wedding-davinci-delivery-readiness/v1') fail('Unexpected wedding readiness schema');
if (report.authority !== 'DERIVED_WEDDING_DAVINCI_DELIVERY_READINESS') fail('Unexpected wedding readiness authority');
if (!report.opening || !report.profile) fail('Opening/Profile readiness entries are required');
if (report.ready !== Boolean(report.opening.ready && report.profile.ready)) fail('Wedding ready must require both projects ready');
if (report.ready && report.state !== 'READY') fail('ready=true must map to READY');
if (!report.ready && report.state !== 'BLOCKED') fail('ready=false must map to BLOCKED');
for (const [name, project] of Object.entries({opening: report.opening, profile: report.profile})) {
  if (!('handoffIdentitySha256' in project)) fail(`${name} handoff identity SHA field missing`);
  if (!('davinciActualEvidenceSha256' in project)) fail(`${name} Actual evidence SHA field missing`);
  if (!('finalApprovalSha256' in project)) fail(`${name} final approval SHA field missing`);
  if (!project.nextGate) fail(`${name} next gate missing`);
  if (project.ready && project.auditState !== 'CURRENT_PASS') fail(`${name} ready without CURRENT_PASS audit`);
  if (project.ready && !project.finalApprovalCurrent) fail(`${name} ready without current final approval`);
}

const dataSource = readFileSync(resolve(dashboardRoot, 'src/data/weddingDavinciDeliveryReadiness.ts'), 'utf8');
for (const token of [
  'WEDDING_DAVINCI_DELIVERY_READINESS_SCHEMA',
  'finalRenderBoundRecoverySha256',
  'actualEvidenceSha256',
  'finalApprovalSha256',
  'strictDeliveryEligible',
  'NOT_RUN != VERIFIED',
]) {
  if (!dataSource.includes(token)) fail(`Dashboard readiness data missing ${token}`);
}

const preflightSource = readFileSync(resolve(dashboardRoot, 'src/data/weddingDavinciFinalDeliveryPreflight.ts'), 'utf8');
for (const token of [
  'WEDDING_DAVINCI_SNAPSHOT_REQUIRED',
  'WEDDING_DAVINCI_SNAPSHOT_INVALID',
  'WEDDING_DAVINCI_SNAPSHOT_STALE',
  'OPENING_DAVINCI_DELIVERY_NOT_READY',
  'PROFILE_DAVINCI_DELIVERY_NOT_READY',
  'SNAPSHOT_CURRENT != FINAL_DELIVERY_READY',
  'FINAL_DELIVERY_READY_REQUIRES_CURRENT_SNAPSHOT_AND_BOTH_MOVIES_READY',
  'wedding-davinci-delivery-readiness.mts --write',
  'wedding-davinci-delivery-readiness-snapshot.mts --strict-current',
  'wedding-davinci-final-delivery-preflight.mts --strict',
  'Manifest生成',
  'Snapshot再検証',
  'Final Delivery strict',
]) {
  if (!preflightSource.includes(token)) fail(`Dashboard final preflight model missing ${token}`);
}
if (!preflightSource.includes('state: "NOT_RUN"')) fail('Dashboard snapshot authority must fail closed as NOT_RUN until transported evidence is explicitly supplied');
if (!preflightSource.includes('snapshot.current && live.strictDeliveryEligible && blockerCodes.length === 0')) {
  fail('Dashboard final delivery eligibility must require current snapshot + live Wedding eligibility + zero blockers');
}

const componentSource = readFileSync(resolve(dashboardRoot, 'src/components/WeddingDavinciDeliveryReadinessCard.tsx'), 'utf8');
for (const token of [
  'Recovery SHA',
  'Actual SHA',
  'Approval SHA',
  'Next gate',
  'strict delivery',
  'FINAL DELIVERY PREFLIGHT / COMMAND SURFACE',
  'CURRENT BLOCKERS',
  'preflight.commands.map',
]) {
  if (!componentSource.includes(token)) fail(`Wedding readiness card missing ${token}`);
}

const zukanSource = readFileSync(resolve(dashboardRoot, 'src/pages/VisualMotionLibrary.tsx'), 'utf8');
if (!zukanSource.includes('WeddingDavinciDeliveryReadinessCard')) fail('Motion Zukan must surface wedding-wide readiness');

console.log(`Wedding DaVinci readiness + final delivery command surface OK: state=${report.state} opening=${report.opening.nextGate} profile=${report.profile.nextGate}`);
