import {createHash} from 'node:crypto';
import {existsSync, readFileSync} from 'node:fs';
import {dirname, join, relative, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const defaultManifestPath = join(root, 'out/handoff/wedding/wedding-final-delivery-evidence-manifest.json');
const rel = (path: string) => relative(root, path).replaceAll('\\', '/');
const shaJson = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex');
const argValue = (name: string) => {
  const prefix = `--${name}=`;
  const value = process.argv.find((arg) => arg.startsWith(prefix));
  return value ? value.slice(prefix.length) : null;
};

type EvidenceProject = {
  movieId?: string;
  recoverySha256?: string;
  sourceRenderSha256?: string;
  davinciActualEvidenceSha256?: string;
  transitionActualEvidenceSha256?: string;
  transitionProofSha256?: string;
  davinciActualCompletionReceiptSha256?: string;
  finalApprovalSha256?: string;
  finalApprovalCompletionBindingSha256?: string;
  transitionGateState?: string;
  actualCompletionGateState?: string;
  finalApprovalCompletionGateState?: string;
  evidenceChainSha256?: string;
};
type Manifest = {
  schemaVersion?: string;
  authority?: string;
  readinessSha256?: string;
  manifestSha256?: string;
  opening?: EvidenceProject;
  profile?: EvidenceProject;
  evidenceBoundary?: Record<string, string>;
  guardrails?: string[];
};

const manifestPath = resolve(root, argValue('manifest') ?? rel(defaultManifestPath));
if (!existsSync(manifestPath)) {
  const report = {schemaVersion: 'wedding-final-delivery-evidence-manifest-currentness/v1', authority: 'DERIVED_FINAL_DELIVERY_EVIDENCE_MANIFEST_CURRENTNESS', state: 'NOT_RUN', current: false, manifestPath: rel(manifestPath), mismatches: ['FINAL_DELIVERY_EVIDENCE_MANIFEST_MISSING'], evidenceBoundary: {macDavinciResolveGuiActual: 'NOT_PROMOTED_BY_CURRENTNESS_AUDIT'}} as const;
  if (process.argv.includes('--json')) console.log(JSON.stringify(report, null, 2));
  else console.log(`Wedding final delivery evidence manifest currentness: ${report.state}`);
  if (process.argv.includes('--strict-current')) process.exit(1);
  process.exit(0);
}

let carried: Manifest;
try { carried = JSON.parse(readFileSync(manifestPath, 'utf8')) as Manifest; }
catch { throw new Error('FINAL_DELIVERY_EVIDENCE_MANIFEST_INVALID_JSON'); }
if (carried.schemaVersion !== 'wedding-final-delivery-evidence-manifest/v1') throw new Error('FINAL_DELIVERY_EVIDENCE_MANIFEST_SCHEMA_INVALID');
if (carried.authority !== 'DERIVED_FINAL_DELIVERY_EVIDENCE_MANIFEST') throw new Error('FINAL_DELIVERY_EVIDENCE_MANIFEST_AUTHORITY_INVALID');

const readinessResult = spawnSync(process.execPath, ['--no-warnings', join(root, 'scripts/wedding-davinci-delivery-readiness.mts'), '--json'], {cwd: root, encoding: 'utf8'});
if (readinessResult.status !== 0) throw new Error(readinessResult.stderr || readinessResult.stdout || 'LIVE_WEDDING_DAVINCI_READINESS_FAILED');
const liveReadiness = JSON.parse(readinessResult.stdout);
const generatedResult = spawnSync(process.execPath, ['--no-warnings', join(root, 'scripts/wedding-final-delivery-evidence-manifest.mts'), '--json'], {cwd: root, encoding: 'utf8'});
if (generatedResult.status !== 0) {
  const report = {
    schemaVersion: 'wedding-final-delivery-evidence-manifest-currentness/v1',
    authority: 'DERIVED_FINAL_DELIVERY_EVIDENCE_MANIFEST_CURRENTNESS',
    state: 'STALE', current: false, manifestPath: rel(manifestPath),
    mismatches: ['LIVE_FINAL_DELIVERY_CHAIN_NO_LONGER_READY'],
    carried: {manifestSha256: carried.manifestSha256 ?? null, readinessSha256: carried.readinessSha256 ?? null},
    live: {readinessState: liveReadiness.state ?? null, ready: liveReadiness.ready ?? false},
    evidenceBoundary: {macDavinciResolveGuiActual: 'NOT_PROMOTED_BY_CURRENTNESS_AUDIT', humanFinalApproval: 'NOT_PROMOTED_BY_CURRENTNESS_AUDIT'},
  } as const;
  if (process.argv.includes('--json')) console.log(JSON.stringify(report, null, 2));
  else console.log(`Wedding final delivery evidence manifest currentness: ${report.state}`);
  if (process.argv.includes('--strict-current')) process.exit(1);
  process.exit(0);
}
const live = JSON.parse(generatedResult.stdout) as Manifest;
const mismatches: string[] = [];

if (carried.readinessSha256 !== live.readinessSha256) mismatches.push('READINESS_SHA256_STALE');
if (carried.manifestSha256 !== live.manifestSha256) mismatches.push('MANIFEST_SHA256_STALE');

const fields: Array<keyof EvidenceProject> = [
  'recoverySha256','sourceRenderSha256','davinciActualEvidenceSha256','transitionActualEvidenceSha256','transitionProofSha256','davinciActualCompletionReceiptSha256','finalApprovalSha256','finalApprovalCompletionBindingSha256','transitionGateState','actualCompletionGateState','finalApprovalCompletionGateState','evidenceChainSha256',
];
for (const movieId of ['opening','profile'] as const) {
  const current = live[movieId];
  const snapshot = carried[movieId];
  if (!current || !snapshot) { mismatches.push(`${movieId.toUpperCase()}_EVIDENCE_CHAIN_MISSING`); continue; }
  for (const field of fields) if (snapshot[field] !== current[field]) mismatches.push(`${movieId.toUpperCase()}_${String(field).replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase()}_STALE`);
}

const core = {...carried} as any;
delete core.manifestSha256;
if (carried.manifestSha256 !== shaJson(core)) mismatches.push('CARRIED_MANIFEST_SELF_SHA_INVALID');
for (const movieId of ['opening','profile'] as const) {
  const item = carried[movieId];
  if (!item) continue;
  const evidence = {...item} as any;
  delete evidence.evidenceChainSha256;
  if (item.evidenceChainSha256 !== shaJson(evidence)) mismatches.push(`${movieId.toUpperCase()}_CARRIED_EVIDENCE_CHAIN_SELF_SHA_INVALID`);
}

const current = mismatches.length === 0;
const report = {
  schemaVersion: 'wedding-final-delivery-evidence-manifest-currentness/v1',
  authority: 'DERIVED_FINAL_DELIVERY_EVIDENCE_MANIFEST_CURRENTNESS',
  state: current ? 'CURRENT' : 'STALE', current, manifestPath: rel(manifestPath), mismatches,
  carried: {manifestSha256: carried.manifestSha256 ?? null, readinessSha256: carried.readinessSha256 ?? null, openingEvidenceChainSha256: carried.opening?.evidenceChainSha256 ?? null, profileEvidenceChainSha256: carried.profile?.evidenceChainSha256 ?? null},
  live: {manifestSha256: live.manifestSha256 ?? null, readinessSha256: live.readinessSha256 ?? null, openingEvidenceChainSha256: live.opening?.evidenceChainSha256 ?? null, profileEvidenceChainSha256: live.profile?.evidenceChainSha256 ?? null},
  evidenceBoundary: {macRemotionStudioGuiActual: 'NOT_PROMOTED_BY_CURRENTNESS_AUDIT', palmierGuiActual: 'NOT_PROMOTED_BY_CURRENTNESS_AUDIT', macDavinciResolveGuiActual: 'NOT_PROMOTED_BY_CURRENTNESS_AUDIT', humanFinalApproval: 'NOT_PROMOTED_BY_CURRENTNESS_AUDIT'},
  guardrails: ['CURRENT_REQUIRES_EXACT_LIVE_EVIDENCE_CHAIN_MATCH','CARRIED_MANIFEST_SELF_SHA_MUST_MATCH','PER_PROJECT_EVIDENCE_CHAIN_SELF_SHA_MUST_MATCH','ANY_BOUND_SHA_DRIFT => STALE','CURRENTNESS_AUDIT_DERIVED_ONLY != GUI_ACTUAL'],
} as const;
if (process.argv.includes('--json')) console.log(JSON.stringify(report, null, 2));
else console.log(`Wedding final delivery evidence manifest currentness: ${report.state} / mismatches=${mismatches.length}`);
if (process.argv.includes('--strict-current') && !current) process.exit(1);
