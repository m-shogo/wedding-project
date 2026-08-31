import {createHash} from 'node:crypto';
import {existsSync, readFileSync} from 'node:fs';
import {dirname, join, relative, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const argValue = (name: string, fallback: string) => {
  const prefix = `--${name}=`;
  const hit = args.find((arg) => arg.startsWith(prefix));
  return hit ? hit.slice(prefix.length) : fallback;
};
const receiptPath = resolve(root, argValue('receipt', 'out/handoff/wedding/wedding-venue-delivery-redundancy.json'));
const rel = (path: string) => relative(root, path).replaceAll('\\', '/');
const shaJson = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex');
const strict = args.includes('--strict-current');
const json = args.includes('--json');
const verifier = join(root, 'scripts/wedding-venue-delivery-package-verify.mts');
const expectedTargets = ['PRIMARY_USB', 'BACKUP_USB', 'CLOUD_BACKUP'] as const;

type VerifyReport = {
  state?: string;
  current?: boolean;
  projectionManifestSha256?: string;
  deliveryManifestSha256?: string;
  opening?: {sha256?: string};
  profile?: {sha256?: string};
};
type Snapshot = {
  projectionManifestSha256?: string | null;
  deliveryManifestSha256?: string | null;
  openingSha256?: string | null;
  profileSha256?: string | null;
};
type Copy = Snapshot & {targetId?: string; path?: string; state?: string};
type Receipt = {
  schemaVersion?: string;
  authority?: string;
  source?: Snapshot & {path?: string; state?: string};
  copies?: Copy[];
  redundancyReady?: boolean;
  evidenceBoundary?: Record<string, string>;
  guardrails?: string[];
  receiptSha256?: string;
};

const emit = (report: unknown, current: boolean) => {
  if (json) console.log(JSON.stringify(report, null, 2));
  else {
    const value = report as {state?: string; mismatches?: string[]};
    console.log(`Wedding venue redundancy currentness: ${value.state ?? 'INVALID'} / mismatches=${value.mismatches?.length ?? 0}`);
  }
  if (strict && !current) process.exit(1);
};

if (!existsSync(receiptPath)) {
  emit({
    schemaVersion: 'wedding-venue-delivery-redundancy-currentness/v1',
    authority: 'DERIVED_THREE_COPY_REDUNDANCY_CURRENTNESS',
    state: 'NOT_RUN', current: false, receiptPath: rel(receiptPath),
    mismatches: ['VENUE_REDUNDANCY_RECEIPT_MISSING'],
    evidenceBoundary: {physicalUsbInsertedActual: 'NOT_PROMOTED_BY_REDUNDANCY_CURRENTNESS', cloudUploadActual: 'NOT_PROMOTED_BY_REDUNDANCY_CURRENTNESS', venuePlaybackActual: 'NOT_RUN'},
  }, false);
  process.exit(0);
}

let receipt: Receipt;
try { receipt = JSON.parse(readFileSync(receiptPath, 'utf8')) as Receipt; }
catch { throw new Error('VENUE_REDUNDANCY_RECEIPT_INVALID_JSON'); }
if (receipt.schemaVersion !== 'wedding-venue-delivery-redundancy/v1' || receipt.authority !== 'DERIVED_THREE_COPY_DELIVERY_REDUNDANCY') throw new Error('VENUE_REDUNDANCY_RECEIPT_CONTRACT_INVALID');

const mismatches: string[] = [];
const core = {...receipt} as Record<string, unknown>;
delete core.receiptSha256;
if (!receipt.receiptSha256 || receipt.receiptSha256 !== shaJson(core)) mismatches.push('VENUE_REDUNDANCY_RECEIPT_SELF_SHA_STALE');
if (receipt.redundancyReady !== true) mismatches.push('VENUE_REDUNDANCY_RECEIPT_NOT_READY');
const ids = receipt.copies?.map((copy) => copy.targetId) ?? [];
if (ids.length !== 3 || !expectedTargets.every((id) => ids.filter((value) => value === id).length === 1)) mismatches.push('VENUE_REDUNDANCY_TARGET_SET_INVALID');

const verifyPath = (pathValue: string | undefined, label: string): VerifyReport | null => {
  if (!pathValue) { mismatches.push(`${label}_PATH_MISSING`); return null; }
  const absolute = resolve(root, pathValue);
  if (!existsSync(absolute)) { mismatches.push(`${label}_PATH_NOT_FOUND`); return null; }
  const result = spawnSync(process.execPath, ['--no-warnings', verifier, `--package-dir=${rel(absolute)}`, '--json'], {cwd: root, encoding: 'utf8'});
  if (result.status !== 0) { mismatches.push(`${label}_OFFLINE_VERIFY_FAILED`); return null; }
  try {
    const report = JSON.parse(result.stdout) as VerifyReport;
    if (report.state !== 'CURRENT' || report.current !== true) { mismatches.push(`${label}_OFFLINE_VERIFY_NOT_CURRENT`); return null; }
    return report;
  } catch {
    mismatches.push(`${label}_OFFLINE_VERIFY_INVALID_JSON`);
    return null;
  }
};

const matchesSnapshot = (label: string, snapshot: Snapshot | undefined, live: VerifyReport | null) => {
  if (!snapshot || !live) return;
  if (snapshot.projectionManifestSha256 !== live.projectionManifestSha256) mismatches.push(`${label}_PROJECTION_SHA_STALE`);
  if (snapshot.deliveryManifestSha256 !== live.deliveryManifestSha256) mismatches.push(`${label}_DELIVERY_MANIFEST_SHA_STALE`);
  if (snapshot.openingSha256 !== live.opening?.sha256) mismatches.push(`${label}_OPENING_SHA_STALE`);
  if (snapshot.profileSha256 !== live.profile?.sha256) mismatches.push(`${label}_PROFILE_SHA_STALE`);
};

const sourceLive = verifyPath(receipt.source?.path, 'SOURCE');
matchesSnapshot('SOURCE', receipt.source, sourceLive);

const liveCopies = expectedTargets.map((targetId) => {
  const carried = receipt.copies?.find((copy) => copy.targetId === targetId);
  if (!carried) { mismatches.push(`${targetId}_RECEIPT_ENTRY_MISSING`); return {targetId, carried: null, live: null}; }
  if (carried.state !== 'CURRENT') mismatches.push(`${targetId}_CARRIED_STATE_NOT_CURRENT`);
  const live = verifyPath(carried.path, targetId);
  matchesSnapshot(targetId, carried, live);
  return {targetId, carried, live};
});

if (sourceLive) {
  for (const {targetId, live} of liveCopies) {
    if (!live) continue;
    if (live.projectionManifestSha256 !== sourceLive.projectionManifestSha256) mismatches.push(`${targetId}_LIVE_PROJECTION_SHA_DIFFERS_FROM_SOURCE`);
    if (live.deliveryManifestSha256 !== sourceLive.deliveryManifestSha256) mismatches.push(`${targetId}_LIVE_DELIVERY_SHA_DIFFERS_FROM_SOURCE`);
    if (live.opening?.sha256 !== sourceLive.opening?.sha256) mismatches.push(`${targetId}_LIVE_OPENING_SHA_DIFFERS_FROM_SOURCE`);
    if (live.profile?.sha256 !== sourceLive.profile?.sha256) mismatches.push(`${targetId}_LIVE_PROFILE_SHA_DIFFERS_FROM_SOURCE`);
  }
}

const current = mismatches.length === 0 && sourceLive !== null && liveCopies.every(({live}) => live !== null);
const report = {
  schemaVersion: 'wedding-venue-delivery-redundancy-currentness/v1',
  authority: 'DERIVED_THREE_COPY_REDUNDANCY_CURRENTNESS',
  state: current ? 'CURRENT' : 'STALE',
  current,
  receiptPath: rel(receiptPath),
  receiptSha256: receipt.receiptSha256 ?? null,
  mismatches,
  source: sourceLive ? {
    projectionManifestSha256: sourceLive.projectionManifestSha256 ?? null,
    deliveryManifestSha256: sourceLive.deliveryManifestSha256 ?? null,
    openingSha256: sourceLive.opening?.sha256 ?? null,
    profileSha256: sourceLive.profile?.sha256 ?? null,
  } : null,
  copies: liveCopies.map(({targetId, carried, live}) => ({
    targetId,
    path: carried?.path ?? null,
    state: live ? 'CURRENT' : 'STALE',
    projectionManifestSha256: live?.projectionManifestSha256 ?? null,
    deliveryManifestSha256: live?.deliveryManifestSha256 ?? null,
    openingSha256: live?.opening?.sha256 ?? null,
    profileSha256: live?.profile?.sha256 ?? null,
  })),
  evidenceBoundary: {
    physicalUsbInsertedActual: 'NOT_PROMOTED_BY_REDUNDANCY_CURRENTNESS',
    cloudUploadActual: 'NOT_PROMOTED_BY_REDUNDANCY_CURRENTNESS',
    venuePlaybackActual: 'NOT_RUN',
    macDavinciResolveGuiActual: 'NOT_PROMOTED_BY_REDUNDANCY_CURRENTNESS',
    humanFinalApproval: 'NOT_PROMOTED_BY_REDUNDANCY_CURRENTNESS',
  },
  guardrails: [
    'RECEIPT_SELF_SHA_REQUIRED',
    'SOURCE_PACKAGE_REVERIFIED_AT_CURRENT_PATH',
    'PRIMARY_BACKUP_CLOUD_PACKAGES_EACH_REVERIFIED_AT_CURRENT_PATH',
    'LIVE_PROJECTION_DELIVERY_OPENING_PROFILE_SHA_MUST_MATCH_SOURCE',
    'ANY_POST_RECEIPT_FILE_OR_PATH_DRIFT => STALE',
    'CURRENTNESS_DOES_NOT_PROVE_PHYSICAL_USB_INSERTION_CLOUD_UPLOAD_OR_VENUE_PLAYBACK',
  ],
} as const;
emit(report, current);
