import {createHash} from 'node:crypto';
import {copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
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
const sourceDir = resolve(root, argValue('source', 'out/delivery/wedding-venue'));
const targets = [
  {id: 'PRIMARY_USB', dir: resolve(root, argValue('primary', 'out/delivery/redundancy/primary-usb'))},
  {id: 'BACKUP_USB', dir: resolve(root, argValue('backup', 'out/delivery/redundancy/backup-usb'))},
  {id: 'CLOUD_BACKUP', dir: resolve(root, argValue('cloud', 'out/delivery/redundancy/cloud-backup'))},
] as const;
const receiptPath = resolve(root, argValue('receipt', 'out/handoff/wedding/wedding-venue-delivery-redundancy.json'));
const rel = (path: string) => relative(root, path).replaceAll('\\', '/');
const shaFile = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
const shaJson = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex');
const files = ['01_OPENING.mp4', '02_PROFILE.mp4', 'DELIVERY-MANIFEST.json', 'SHA256SUMS.txt'] as const;
const verifier = join(root, 'scripts/wedding-venue-delivery-package-verify.mts');

const runVerify = (dir: string) => {
  const result = spawnSync(process.execPath, ['--no-warnings', verifier, `--package-dir=${rel(dir)}`, '--json'], {cwd: root, encoding: 'utf8'});
  if (result.status !== 0) throw new Error(`VENUE_REDUNDANCY_VERIFY_FAILED:${rel(dir)}:${(result.stderr || result.stdout).trim()}`);
  const report = JSON.parse(result.stdout) as {
    state?: string; current?: boolean; projectionManifestSha256?: string; deliveryManifestSha256?: string;
    opening?: {sha256?: string}; profile?: {sha256?: string};
  };
  if (report.state !== 'CURRENT' || report.current !== true) throw new Error(`VENUE_REDUNDANCY_VERIFY_NOT_CURRENT:${rel(dir)}`);
  return report;
};

if (!existsSync(sourceDir)) throw new Error(`VENUE_REDUNDANCY_SOURCE_MISSING:${rel(sourceDir)}`);
const sourceVerify = runVerify(sourceDir);
const sourceSha = Object.fromEntries(files.map((filename) => [filename, shaFile(join(sourceDir, filename))])) as Record<(typeof files)[number], string>;

const copied = targets.map((target) => {
  rmSync(target.dir, {recursive: true, force: true});
  mkdirSync(target.dir, {recursive: true});
  for (const filename of files) {
    copyFileSync(join(sourceDir, filename), join(target.dir, filename));
    const destinationSha = shaFile(join(target.dir, filename));
    if (destinationSha !== sourceSha[filename]) throw new Error(`${target.id}_${filename.replaceAll('.', '_').toUpperCase()}_COPY_SHA_MISMATCH`);
  }
  const verification = runVerify(target.dir);
  if (verification.projectionManifestSha256 !== sourceVerify.projectionManifestSha256) throw new Error(`${target.id}_PROJECTION_SHA_MISMATCH`);
  if (verification.deliveryManifestSha256 !== sourceVerify.deliveryManifestSha256) throw new Error(`${target.id}_DELIVERY_MANIFEST_SHA_MISMATCH`);
  if (verification.opening?.sha256 !== sourceVerify.opening?.sha256) throw new Error(`${target.id}_OPENING_SHA_MISMATCH`);
  if (verification.profile?.sha256 !== sourceVerify.profile?.sha256) throw new Error(`${target.id}_PROFILE_SHA_MISMATCH`);
  return {
    targetId: target.id,
    path: rel(target.dir),
    state: 'CURRENT' as const,
    projectionManifestSha256: verification.projectionManifestSha256 ?? null,
    deliveryManifestSha256: verification.deliveryManifestSha256 ?? null,
    openingSha256: verification.opening?.sha256 ?? null,
    profileSha256: verification.profile?.sha256 ?? null,
    files: files.map((filename) => ({filename, sha256: shaFile(join(target.dir, filename))})),
  };
});

const core = {
  schemaVersion: 'wedding-venue-delivery-redundancy/v1',
  authority: 'DERIVED_THREE_COPY_DELIVERY_REDUNDANCY',
  source: {
    path: rel(sourceDir),
    state: 'CURRENT' as const,
    projectionManifestSha256: sourceVerify.projectionManifestSha256 ?? null,
    deliveryManifestSha256: sourceVerify.deliveryManifestSha256 ?? null,
    openingSha256: sourceVerify.opening?.sha256 ?? null,
    profileSha256: sourceVerify.profile?.sha256 ?? null,
  },
  copies: copied,
  redundancyReady: copied.length === 3 && copied.every((copy) => copy.state === 'CURRENT'),
  evidenceBoundary: {
    physicalUsbInsertedActual: 'NOT_PROMOTED_BY_REDUNDANCY_SCRIPT',
    cloudUploadActual: 'NOT_PROMOTED_BY_REDUNDANCY_SCRIPT',
    venuePlaybackActual: 'NOT_RUN',
    macDavinciResolveGuiActual: 'NOT_PROMOTED_BY_REDUNDANCY_SCRIPT',
    humanFinalApproval: 'REUSED_CURRENT_PACKAGE_CHAIN_ONLY',
  },
  guardrails: [
    'SOURCE_PACKAGE_OFFLINE_VERIFY_CURRENT_REQUIRED',
    'ALL_FOUR_PACKAGE_FILES_COPIED_BYTE_IDENTICALLY',
    'EACH_TARGET_MUST_PASS_OFFLINE_FFPROBE_AND_SHA_VERIFY',
    'PRIMARY_BACKUP_CLOUD_PROJECTION_AND_DELIVERY_SHA_MUST_MATCH_SOURCE',
    'DEFAULT_TARGETS_ARE_LOCAL_STAGING_PATHS_NOT_PHYSICAL_USB_OR_CLOUD_ACTUAL',
    'SCRIPT_NEVER_PROMOTES_PHYSICAL_USB_CLOUD_UPLOAD_VENUE_PLAYBACK_OR_GUI_ACTUAL',
  ],
} as const;
const receipt = {...core, receiptSha256: shaJson(core)};
mkdirSync(dirname(receiptPath), {recursive: true});
writeFileSync(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`);

if (args.includes('--json') || args.includes('--write')) console.log(JSON.stringify(receipt, null, 2));
else {
  console.log(`Wedding venue delivery redundancy: READY / receipt=${rel(receiptPath)}`);
  for (const copy of copied) console.log(`${copy.targetId}: CURRENT / ${copy.path}`);
  console.log('Physical USB insertion, cloud upload and venue playback Actual remain NOT_RUN unless a human truly performs them.');
}
