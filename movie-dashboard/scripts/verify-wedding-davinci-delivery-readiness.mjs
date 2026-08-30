import {readFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const dashboardRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const repoRoot = resolve(dashboardRoot, '..');
const motionRoot = resolve(repoRoot, 'motion-studio');
const scriptPath = resolve(motionRoot, 'scripts/wedding-davinci-delivery-readiness.mts');

const sync = spawnSync(process.execPath, ['scripts/sync-wedding-project-motion-provenance-preflight.mjs'], {
  cwd: dashboardRoot,
  encoding: 'utf8',
});
if (sync.status !== 0) throw new Error(sync.stderr || sync.stdout || 'Project Motion dashboard preflight snapshot stale');

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
  if (!project.projectMotion || !['CURRENT', 'NOT_APPLICABLE', 'INVALID'].includes(project.projectMotion.state)) {
    fail(`${name} Project Motion provenance preflight state missing`);
  }
  if (project.projectMotion.state === 'INVALID') {
    if (project.ready) fail(`${name} must not be ready with invalid Project Motion provenance`);
    if (project.nextGate !== 'REVALIDATE_PROJECT_MOTION_PROVENANCE') fail(`${name} must route to Project Motion revalidation`);
    if (!project.projectMotion.command?.includes(`--movie=${name}`)) fail(`${name} Project Motion recovery command missing exact movie`);
  }
  if (project.ready && project.auditState !== 'CURRENT_PASS') fail(`${name} ready without CURRENT_PASS audit`);
  if (project.ready && !project.finalApprovalCurrent) fail(`${name} ready without current final approval`);
}
if (!report.guardrails.includes('PROJECT_MOTION_PROVENANCE_CURRENT_OR_NOT_APPLICABLE_REQUIRED')) {
  fail('Wedding readiness must retain Project Motion provenance guardrail');
}

const generatedSource = readFileSync(resolve(dashboardRoot, 'src/data/weddingProjectMotionProvenancePreflight.generated.ts'), 'utf8');
for (const token of [
  'wedding-project-motion-dashboard-preflight/v1',
  'MOTION_STUDIO_DERIVED_PROJECT_MOTION_PROVENANCE_PREFLIGHT',
  '--movie=opening',
  '--movie=profile',
  'NOT_APPLICABLE',
  'GENERATED_DASHBOARD_SNAPSHOT != LIVE_MAC_GUI_ACTUAL',
]) {
  if (!generatedSource.includes(token)) fail(`Generated Project Motion dashboard preflight missing ${token}`);
}

const dataSource = readFileSync(resolve(dashboardRoot, 'src/data/weddingDavinciDeliveryReadiness.ts'), 'utf8');
for (const token of [
  'WEDDING_DAVINCI_DELIVERY_READINESS_SCHEMA',
  'weddingProjectMotionProvenancePreflight',
  'projectMotionSnapshot',
  'projectMotion: openingProjectMotion',
  'projectMotion: profileProjectMotion',
  'REVALIDATE_PROJECT_MOTION_PROVENANCE',
  'PROJECT_MOTION_INVALID => WEDDING_DELIVERY_INVALID',
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
  'OPENING_PROJECT_MOTION_PROVENANCE_INVALID',
  'PROFILE_PROJECT_MOTION_PROVENANCE_INVALID',
  'PROJECT_MOTION_OPENING_STATUS',
  'PROJECT_MOTION_PROFILE_STATUS',
  'Opening Project Motion — ${live.opening.projectMotion.state}',
  'Profile Project Motion — ${live.profile.projectMotion.state}',
  'PROJECT_MOTION_STATE_ALWAYS_VISIBLE_IN_COMMAND_SURFACE',
  'PROJECT_MOTION_NOT_APPLICABLE != VERIFIED',
  'projectMotionPreflight',
  'PROJECT_MOTION_VERIFIER_COMMAND_VISIBLE != PROJECT_MOTION_VERIFIED',
  'OPENING_DAVINCI_DELIVERY_NOT_READY',
  'PROFILE_DAVINCI_DELIVERY_NOT_READY',
  'SNAPSHOT_CURRENT != FINAL_DELIVERY_READY',
  'wedding-davinci-delivery-readiness.mts --write',
  'wedding-davinci-delivery-readiness-snapshot.mts --strict-current',
  'wedding-davinci-final-delivery-preflight.mts --strict',
  'Manifest生成',
  'Snapshot再検証',
  'Final Delivery strict',
  'buildWeddingDavinciOperatorPacketJson',
  'NOT_PROMOTED_BY_PACKET',
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
  'buildWeddingDavinciOperatorPacketJson',
  'new Blob',
  'URL.createObjectURL',
  'wedding-davinci-operator-packet.json',
  'DaVinci Operator Packet JSONを保存',
  '保存してもMac/Studio/DaVinci ActualやHuman approvalはPASSになりません',
]) {
  if (!componentSource.includes(token)) fail(`Wedding readiness card missing ${token}`);
}

const zukanSource = readFileSync(resolve(dashboardRoot, 'src/pages/VisualMotionLibrary.tsx'), 'utf8');
if (!zukanSource.includes('WeddingDavinciDeliveryReadinessCard')) fail('Motion Zukan must surface wedding-wide readiness');

console.log(`Wedding DaVinci readiness + always-visible Project Motion preflight + operator packet surface OK: state=${report.state} opening=${report.opening.nextGate}/${report.opening.projectMotion.state} profile=${report.profile.nextGate}/${report.profile.projectMotion.state}`);
