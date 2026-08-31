import {createHash} from 'node:crypto';
import {mkdirSync, rmSync, writeFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const fixtureDir = join(root, 'out/test/projection-currentness');
const script = join(root, 'scripts/wedding-projection-delivery-manifest-currentness.mts');
const rel = (path: string) => relative(root, path).replaceAll('\\', '/');
const shaJson = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex');
const run = (manifestPath: string, strict = false) => spawnSync(process.execPath, [
  '--no-warnings', script, `--manifest=${rel(manifestPath)}`, '--json', ...(strict ? ['--strict-current'] : []),
], {cwd: root, encoding: 'utf8'});

rmSync(fixtureDir, {recursive: true, force: true});
mkdirSync(fixtureDir, {recursive: true});
const missingPath = join(fixtureDir, 'missing.json');
const missing = run(missingPath);
if (missing.status !== 0) throw new Error('missing manifest status mode must remain inspectable');
const missingReport = JSON.parse(missing.stdout) as {state: string; current: boolean; mismatches: string[]};
if (missingReport.state !== 'NOT_RUN' || missingReport.current !== false || !missingReport.mismatches.includes('PROJECTION_DELIVERY_MANIFEST_MISSING')) throw new Error('missing manifest did not stay NOT_RUN');
const missingStrict = run(missingPath, true);
if (missingStrict.status === 0) throw new Error('strict-current accepted missing projection manifest');

const forgedPath = join(fixtureDir, 'forged.json');
const forgedCore = {
  schemaVersion: 'wedding-projection-delivery-manifest/v1',
  authority: 'DERIVED_PROJECTION_DELIVERY_VALIDATION',
  finalEvidenceManifest: {path: 'out/test/projection-currentness/nonexistent-final-evidence.json', sha256: 'deadbeef', manifestSha256: 'deadbeef'},
  compatibilityProfile: {width: 1920, height: 1080, fps: 30, videoCodec: 'h264', pixelFormat: 'yuv420p', audioCodec: 'aac', audioSampleRate: 48000, audioChannels: 2},
  opening: {finalApproval: {path: 'out/test/projection-currentness/opening.json', sha256: 'deadbeef'}, approvedExport: {path: 'out/test/projection-currentness/opening.mp4', expectedSha256: 'deadbeef', actualSha256: 'deadbeef'}, technical: {}, state: 'CURRENT_AND_PROJECTION_COMPATIBLE'},
  profile: {finalApproval: {path: 'out/test/projection-currentness/profile.json', sha256: 'deadbeef'}, approvedExport: {path: 'out/test/projection-currentness/profile.mp4', expectedSha256: 'deadbeef', actualSha256: 'deadbeef'}, technical: {}, state: 'CURRENT_AND_PROJECTION_COMPATIBLE'},
  deliveryReady: true,
  evidenceBoundary: {macDavinciResolveGuiActual: 'NOT_PROMOTED_BY_PROJECTION_VALIDATION'},
  guardrails: [],
};
writeFileSync(forgedPath, `${JSON.stringify({...forgedCore, manifestSha256: shaJson(forgedCore)}, null, 2)}\n`);
const forged = run(forgedPath, true);
if (forged.status === 0) throw new Error('strict-current accepted projection manifest without CURRENT Final Evidence');
const forgedReport = JSON.parse(forged.stdout) as {state: string; current: boolean; mismatches: string[]; evidenceBoundary: {macDavinciResolveGuiActual: string}};
if (forgedReport.state !== 'STALE' || forgedReport.current !== false || !forgedReport.mismatches.includes('FINAL_EVIDENCE_MANIFEST_NOT_CURRENT')) throw new Error('Final Evidence currentness was not fail-closed');
if (forgedReport.evidenceBoundary.macDavinciResolveGuiActual !== 'NOT_PROMOTED_BY_CURRENTNESS_AUDIT') throw new Error('GUI Actual boundary was promoted');

const nonCanonicalPath = join(fixtureDir, 'noncanonical.json');
const nonCanonicalCore = {...forgedCore, compatibilityProfile: {...forgedCore.compatibilityProfile, width: 1280}};
writeFileSync(nonCanonicalPath, `${JSON.stringify({...nonCanonicalCore, manifestSha256: shaJson(nonCanonicalCore)}, null, 2)}\n`);
const nonCanonical = run(nonCanonicalPath, true);
if (nonCanonical.status === 0 || !nonCanonical.stdout.includes('COMPATIBILITY_PROFILE_WIDTH_NOT_CANONICAL')) throw new Error('strict-current accepted non-canonical projection profile');

console.log('✅ Wedding projection delivery currentness contract passed');
console.log('✅ Missing manifest remains NOT_RUN and strict-current blocks');
console.log('✅ CURRENT projection manifest cannot outlive stale/missing Final Evidence authority');
console.log('✅ Non-canonical projection compatibility profile blocks strict-current');
console.log('✅ Mac/Studio GUI Actual remains NOT_PROMOTED');
