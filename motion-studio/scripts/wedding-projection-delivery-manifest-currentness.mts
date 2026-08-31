import {createHash} from 'node:crypto';
import {existsSync, readFileSync} from 'node:fs';
import {dirname, join, relative, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const defaultManifestPath = join(root, 'out/handoff/wedding/wedding-projection-delivery-manifest.json');
const rel = (path: string) => relative(root, path).replaceAll('\\', '/');
const shaJson = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex');
const argValue = (name: string) => {
  const prefix = `--${name}=`;
  const hit = process.argv.find((arg) => arg.startsWith(prefix));
  return hit ? hit.slice(prefix.length) : null;
};

type CompatibilityProfile = {
  width?: number; height?: number; fps?: number; videoCodec?: string; pixelFormat?: string;
  audioCodec?: string; audioSampleRate?: number; audioChannels?: number;
};
type Movie = {
  finalApproval?: {path?: string; sha256?: string};
  approvedExport?: {path?: string; expectedSha256?: string; actualSha256?: string};
  technical?: unknown;
  state?: string;
};
type Manifest = {
  schemaVersion?: string;
  authority?: string;
  manifestSha256?: string;
  finalEvidenceManifest?: {path?: string; sha256?: string; manifestSha256?: string};
  compatibilityProfile?: CompatibilityProfile;
  opening?: Movie;
  profile?: Movie;
  deliveryReady?: boolean;
  evidenceBoundary?: Record<string, string>;
  guardrails?: string[];
};

const canonicalProfile = {
  width: 1920,
  height: 1080,
  fps: 30,
  videoCodec: 'h264',
  pixelFormat: 'yuv420p',
  audioCodec: 'aac',
  audioSampleRate: 48000,
  audioChannels: 2,
} as const;
const manifestPath = resolve(root, argValue('manifest') ?? rel(defaultManifestPath));
const strict = process.argv.includes('--strict-current');
const json = process.argv.includes('--json');

const emit = (report: unknown, current: boolean) => {
  if (json) console.log(JSON.stringify(report, null, 2));
  else {
    const state = (report as {state?: string}).state ?? 'INVALID';
    const mismatches = (report as {mismatches?: string[]}).mismatches?.length ?? 0;
    console.log(`Wedding projection delivery currentness: ${state} / mismatches=${mismatches}`);
  }
  if (strict && !current) process.exit(1);
};

if (!existsSync(manifestPath)) {
  emit({
    schemaVersion: 'wedding-projection-delivery-manifest-currentness/v1',
    authority: 'DERIVED_PROJECTION_DELIVERY_CURRENTNESS',
    state: 'NOT_RUN', current: false, manifestPath: rel(manifestPath),
    mismatches: ['PROJECTION_DELIVERY_MANIFEST_MISSING'],
    evidenceBoundary: {macDavinciResolveGuiActual: 'NOT_PROMOTED_BY_CURRENTNESS_AUDIT'},
  }, false);
  process.exit(0);
}

let carried: Manifest;
try { carried = JSON.parse(readFileSync(manifestPath, 'utf8')) as Manifest; }
catch { throw new Error('PROJECTION_DELIVERY_MANIFEST_INVALID_JSON'); }
if (carried.schemaVersion !== 'wedding-projection-delivery-manifest/v1') throw new Error('PROJECTION_DELIVERY_MANIFEST_SCHEMA_INVALID');
if (carried.authority !== 'DERIVED_PROJECTION_DELIVERY_VALIDATION') throw new Error('PROJECTION_DELIVERY_MANIFEST_AUTHORITY_INVALID');

const mismatches: string[] = [];
const carriedCore = {...carried} as Record<string, unknown>;
delete carriedCore.manifestSha256;
if (!carried.manifestSha256 || carried.manifestSha256 !== shaJson(carriedCore)) mismatches.push('CARRIED_PROJECTION_MANIFEST_SELF_SHA_INVALID');
for (const [key, value] of Object.entries(canonicalProfile)) {
  if (carried.compatibilityProfile?.[key as keyof CompatibilityProfile] !== value) mismatches.push(`COMPATIBILITY_PROFILE_${key.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase()}_NOT_CANONICAL`);
}
if (carried.deliveryReady !== true) mismatches.push('CARRIED_PROJECTION_DELIVERY_NOT_READY');
if (carried.opening?.state !== 'CURRENT_AND_PROJECTION_COMPATIBLE') mismatches.push('OPENING_PROJECTION_STATE_NOT_CURRENT');
if (carried.profile?.state !== 'CURRENT_AND_PROJECTION_COMPATIBLE') mismatches.push('PROFILE_PROJECTION_STATE_NOT_CURRENT');

const evidencePathValue = carried.finalEvidenceManifest?.path;
if (!evidencePathValue) mismatches.push('FINAL_EVIDENCE_MANIFEST_PATH_MISSING');
else {
  const currentness = spawnSync(process.execPath, [
    '--no-warnings', join(root, 'scripts/wedding-final-delivery-evidence-manifest-currentness.mts'),
    `--manifest=${evidencePathValue}`, '--strict-current', '--json',
  ], {cwd: root, encoding: 'utf8'});
  if (currentness.status !== 0) mismatches.push('FINAL_EVIDENCE_MANIFEST_NOT_CURRENT');
}

let live: Manifest | null = null;
if (mismatches.length === 0) {
  const openingApproval = carried.opening?.finalApproval?.path;
  const profileApproval = carried.profile?.finalApproval?.path;
  if (!openingApproval) mismatches.push('OPENING_FINAL_APPROVAL_PATH_MISSING');
  if (!profileApproval) mismatches.push('PROFILE_FINAL_APPROVAL_PATH_MISSING');
  if (openingApproval && profileApproval && evidencePathValue) {
    const generated = spawnSync(process.execPath, [
      '--no-warnings', join(root, 'scripts/wedding-projection-delivery-manifest.mts'), '--json',
      `--evidence-manifest=${evidencePathValue}`,
      `--opening-approval=${openingApproval}`,
      `--profile-approval=${profileApproval}`,
    ], {cwd: root, encoding: 'utf8'});
    if (generated.status !== 0) mismatches.push('LIVE_PROJECTION_DELIVERY_VALIDATION_FAILED');
    else {
      try { live = JSON.parse(generated.stdout) as Manifest; }
      catch { mismatches.push('LIVE_PROJECTION_DELIVERY_INVALID_JSON'); }
    }
  }
}

if (live) {
  if (carried.manifestSha256 !== live.manifestSha256) mismatches.push('PROJECTION_MANIFEST_SHA256_STALE');
  if (carried.finalEvidenceManifest?.sha256 !== live.finalEvidenceManifest?.sha256) mismatches.push('FINAL_EVIDENCE_FILE_SHA256_STALE');
  if (carried.finalEvidenceManifest?.manifestSha256 !== live.finalEvidenceManifest?.manifestSha256) mismatches.push('FINAL_EVIDENCE_MANIFEST_SHA256_STALE');
  for (const movieId of ['opening', 'profile'] as const) {
    const snapshot = carried[movieId];
    const current = live[movieId];
    if (!snapshot || !current) { mismatches.push(`${movieId.toUpperCase()}_PROJECTION_BINDING_MISSING`); continue; }
    if (snapshot.finalApproval?.sha256 !== current.finalApproval?.sha256) mismatches.push(`${movieId.toUpperCase()}_FINAL_APPROVAL_SHA256_STALE`);
    if (snapshot.approvedExport?.path !== current.approvedExport?.path) mismatches.push(`${movieId.toUpperCase()}_APPROVED_EXPORT_PATH_STALE`);
    if (snapshot.approvedExport?.expectedSha256 !== current.approvedExport?.expectedSha256) mismatches.push(`${movieId.toUpperCase()}_APPROVED_EXPORT_EXPECTED_SHA256_STALE`);
    if (snapshot.approvedExport?.actualSha256 !== current.approvedExport?.actualSha256) mismatches.push(`${movieId.toUpperCase()}_APPROVED_EXPORT_ACTUAL_SHA256_STALE`);
    if (JSON.stringify(snapshot.technical) !== JSON.stringify(current.technical)) mismatches.push(`${movieId.toUpperCase()}_TECHNICAL_PROBE_STALE`);
    if (snapshot.state !== current.state) mismatches.push(`${movieId.toUpperCase()}_PROJECTION_STATE_STALE`);
  }
}

const current = mismatches.length === 0 && live !== null;
const report = {
  schemaVersion: 'wedding-projection-delivery-manifest-currentness/v1',
  authority: 'DERIVED_PROJECTION_DELIVERY_CURRENTNESS',
  state: current ? 'CURRENT' : 'STALE',
  current,
  manifestPath: rel(manifestPath),
  mismatches,
  carried: {
    manifestSha256: carried.manifestSha256 ?? null,
    finalEvidenceManifestSha256: carried.finalEvidenceManifest?.manifestSha256 ?? null,
    openingExportSha256: carried.opening?.approvedExport?.actualSha256 ?? null,
    profileExportSha256: carried.profile?.approvedExport?.actualSha256 ?? null,
  },
  live: live ? {
    manifestSha256: live.manifestSha256 ?? null,
    finalEvidenceManifestSha256: live.finalEvidenceManifest?.manifestSha256 ?? null,
    openingExportSha256: live.opening?.approvedExport?.actualSha256 ?? null,
    profileExportSha256: live.profile?.approvedExport?.actualSha256 ?? null,
  } : null,
  evidenceBoundary: {
    macRemotionStudioGuiActual: 'NOT_PROMOTED_BY_CURRENTNESS_AUDIT',
    palmierGuiActual: 'NOT_PROMOTED_BY_CURRENTNESS_AUDIT',
    macDavinciResolveGuiActual: 'NOT_PROMOTED_BY_CURRENTNESS_AUDIT',
    humanFinalApproval: 'NOT_PROMOTED_BY_CURRENTNESS_AUDIT',
  },
  guardrails: [
    'FINAL_EVIDENCE_MANIFEST_STRICT_CURRENT_REQUIRED',
    'CANONICAL_PROJECTION_PROFILE_REQUIRED',
    'APPROVED_EXPORT_FILE_SHA_REPROBE_REQUIRED',
    'PROJECTION_MANIFEST_SELF_SHA_REQUIRED',
    'ANY_FINAL_EVIDENCE_APPROVAL_EXPORT_OR_TECHNICAL_DRIFT => STALE',
    'CURRENTNESS_AUDIT_DERIVED_ONLY != GUI_ACTUAL',
  ],
} as const;
emit(report, current);
