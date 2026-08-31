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
const projectionPath = resolve(root, argValue('projection-manifest', 'out/handoff/wedding/wedding-projection-delivery-manifest.json'));
const packageDir = resolve(root, argValue('package-dir', 'out/delivery/wedding-venue'));
const rel = (path: string) => relative(root, path).replaceAll('\\', '/');
const shaFile = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
const shaJson = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex');

if (!existsSync(projectionPath)) throw new Error(`PROJECTION_DELIVERY_MANIFEST_MISSING:${rel(projectionPath)}`);
const currentness = spawnSync(process.execPath, [
  '--no-warnings', join(root, 'scripts/wedding-projection-delivery-manifest-currentness.mts'),
  `--manifest=${rel(projectionPath)}`, '--strict-current', '--json',
], {cwd: root, encoding: 'utf8'});
if (currentness.status !== 0) throw new Error(`PROJECTION_DELIVERY_NOT_CURRENT:${(currentness.stdout || currentness.stderr).trim()}`);
const currentnessReport = JSON.parse(currentness.stdout) as {state?: string; current?: boolean};
if (currentnessReport.state !== 'CURRENT' || currentnessReport.current !== true) throw new Error('PROJECTION_DELIVERY_NOT_CURRENT');

type ProjectionManifest = {
  schemaVersion?: string;
  authority?: string;
  manifestSha256?: string;
  compatibilityProfile?: Record<string, unknown>;
  opening?: {approvedExport?: {path?: string; actualSha256?: string}; technical?: unknown};
  profile?: {approvedExport?: {path?: string; actualSha256?: string}; technical?: unknown};
};
const projection = JSON.parse(readFileSync(projectionPath, 'utf8')) as ProjectionManifest;
if (projection.schemaVersion !== 'wedding-projection-delivery-manifest/v1' || projection.authority !== 'DERIVED_PROJECTION_DELIVERY_VALIDATION') throw new Error('PROJECTION_DELIVERY_CONTRACT_INVALID');
if (!projection.manifestSha256) throw new Error('PROJECTION_DELIVERY_SHA_MISSING');

const staged = ([movieId, filename]: readonly ['opening' | 'profile', string]) => {
  const item = projection[movieId];
  const sourceRel = item?.approvedExport?.path;
  const sourceSha = item?.approvedExport?.actualSha256;
  if (!sourceRel || !sourceSha) throw new Error(`${movieId.toUpperCase()}_PROJECTION_EXPORT_BINDING_MISSING`);
  const sourcePath = resolve(root, sourceRel);
  if (!existsSync(sourcePath)) throw new Error(`${movieId.toUpperCase()}_PROJECTION_EXPORT_MISSING:${sourceRel}`);
  if (shaFile(sourcePath) !== sourceSha) throw new Error(`${movieId.toUpperCase()}_PROJECTION_EXPORT_SHA_STALE`);
  const destinationPath = join(packageDir, filename);
  copyFileSync(sourcePath, destinationPath);
  const copiedSha = shaFile(destinationPath);
  if (copiedSha !== sourceSha) throw new Error(`${movieId.toUpperCase()}_COPY_SHA_MISMATCH`);
  return {
    movieId,
    filename,
    sha256: copiedSha,
    sourceExportSha256: sourceSha,
    technical: item?.technical ?? null,
  } as const;
};

rmSync(packageDir, {recursive: true, force: true});
mkdirSync(packageDir, {recursive: true});
const opening = staged(['opening', '01_OPENING.mp4']);
const profile = staged(['profile', '02_PROFILE.mp4']);
const core = {
  schemaVersion: 'wedding-venue-delivery-package/v1',
  authority: 'DERIVED_VENUE_DELIVERY_PACKAGE',
  builtFromProjectionManifest: rel(projectionPath),
  projectionManifestSha256: projection.manifestSha256,
  projectionManifestFileSha256: shaFile(projectionPath),
  projectionCurrentnessState: 'CURRENT',
  compatibilityProfile: projection.compatibilityProfile,
  opening,
  profile,
  packageReady: true,
  evidenceBoundary: {
    macRemotionStudioGuiActual: 'NOT_PROMOTED_BY_PACKAGE_BUILD',
    palmierGuiActual: 'NOT_PROMOTED_BY_PACKAGE_BUILD',
    macDavinciResolveGuiActual: 'NOT_PROMOTED_BY_PACKAGE_BUILD',
    humanFinalApproval: 'REUSED_CURRENT_PROJECTION_CHAIN_ONLY',
  },
  guardrails: [
    'BUILD_REQUIRES_PROJECTION_DELIVERY_STRICT_CURRENT',
    'COPY_SHA_MUST_EQUAL_HUMAN_APPROVED_DAVINCI_EXPORT_SHA',
    'PACKAGE_CONTAINS_ONLY_TWO_MP4S_MANIFEST_AND_CHECKSUMS',
    'OFFLINE_VERIFY_MUST_PASS_AFTER_COPY_TO_USB_OR_VENUE_MEDIA',
    'PACKAGE_BUILD_NEVER_CREATES_GUI_ACTUAL_OR_HUMAN_APPROVAL',
  ],
} as const;
const delivery = {...core, manifestSha256: shaJson(core)};
const manifestPath = join(packageDir, 'DELIVERY-MANIFEST.json');
writeFileSync(manifestPath, `${JSON.stringify(delivery, null, 2)}\n`);
writeFileSync(join(packageDir, 'SHA256SUMS.txt'), [
  `${opening.sha256}  ${opening.filename}`,
  `${profile.sha256}  ${profile.filename}`,
  `${shaFile(manifestPath)}  DELIVERY-MANIFEST.json`,
].join('\n') + '\n');

const verify = spawnSync(process.execPath, ['--no-warnings', join(root, 'scripts/wedding-venue-delivery-package-verify.mts'), `--package-dir=${rel(packageDir)}`, '--json'], {cwd: root, encoding: 'utf8'});
if (verify.status !== 0) throw new Error(`VENUE_PACKAGE_POST_COPY_VERIFY_FAILED:${(verify.stdout || verify.stderr).trim()}`);
const verified = JSON.parse(verify.stdout) as {state?: string; current?: boolean};
if (verified.state !== 'CURRENT' || verified.current !== true) throw new Error('VENUE_PACKAGE_POST_COPY_VERIFY_NOT_CURRENT');

if (args.includes('--json')) console.log(JSON.stringify(delivery, null, 2));
else {
  console.log(`Wedding venue delivery package: READY / ${rel(packageDir)}`);
  console.log(`Opening ${opening.sha256}`);
  console.log(`Profile ${profile.sha256}`);
  console.log('Offline copy check: node --no-warnings scripts/wedding-venue-delivery-package-verify.mts --package-dir=<copied-folder>');
}
