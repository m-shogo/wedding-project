import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const fixtureDir = join(root, 'out/test/projection-delivery');
const script = join(root, 'scripts/wedding-projection-delivery-manifest.mts');
const shaFile = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
const shaJson = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex');
const rel = (path: string) => relative(root, path).replaceAll('\\', '/');
const run = (args: string[]) => spawnSync(process.execPath, ['--no-warnings', script, ...args], {cwd: root, encoding: 'utf8'});

if (spawnSync('ffmpeg', ['-version'], {encoding: 'utf8'}).status !== 0 || spawnSync('ffprobe', ['-version'], {encoding: 'utf8'}).status !== 0) {
  throw new Error('ffmpeg/ffprobe required for projection delivery contract test');
}

rmSync(fixtureDir, {recursive: true, force: true});
mkdirSync(fixtureDir, {recursive: true});

const makeMp4 = (path: string, size = '1920x1080') => {
  const result = spawnSync('ffmpeg', [
    '-y', '-hide_banner', '-loglevel', 'error',
    '-f', 'lavfi', '-i', `color=c=navy:s=${size}:r=30:d=0.6`,
    '-f', 'lavfi', '-i', 'sine=frequency=440:sample_rate=48000:duration=0.6',
    '-shortest', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-r', '30',
    '-c:a', 'aac', '-ar', '48000', '-ac', '2', '-movflags', '+faststart', path,
  ], {encoding: 'utf8'});
  if (result.status !== 0) throw new Error(result.stderr || 'fixture render failed');
};

const openingMp4 = join(fixtureDir, 'opening-approved.mp4');
const profileMp4 = join(fixtureDir, 'profile-approved.mp4');
const openingApprovalPath = join(fixtureDir, 'opening-approval.json');
const profileApprovalPath = join(fixtureDir, 'profile-approval.json');
const evidencePath = join(fixtureDir, 'final-evidence.json');
makeMp4(openingMp4);
makeMp4(profileMp4);

const writeApproval = (path: string, exportPath: string) => {
  const approval = {
    schemaVersion: 'fixture-final-delivery-approval/v1',
    authority: 'HUMAN_FINAL_DELIVERY_APPROVAL',
    decision: 'APPROVE',
    productionReady: true,
    davinciExport: {path: rel(exportPath), sha256: shaFile(exportPath)},
  };
  writeFileSync(path, `${JSON.stringify(approval, null, 2)}\n`);
};
const writeEvidence = () => {
  const core = {
    schemaVersion: 'wedding-final-delivery-evidence-manifest/v1',
    authority: 'DERIVED_FINAL_DELIVERY_EVIDENCE_MANIFEST',
    opening: {finalApprovalSha256: shaFile(openingApprovalPath)},
    profile: {finalApprovalSha256: shaFile(profileApprovalPath)},
  };
  writeFileSync(evidencePath, `${JSON.stringify({...core, manifestSha256: shaJson(core)}, null, 2)}\n`);
};
writeApproval(openingApprovalPath, openingMp4);
writeApproval(profileApprovalPath, profileMp4);
writeEvidence();

const commonArgs = [
  `--evidence-manifest=${rel(evidencePath)}`,
  `--opening-approval=${rel(openingApprovalPath)}`,
  `--profile-approval=${rel(profileApprovalPath)}`,
  '--json',
];

const good = run(commonArgs);
if (good.status !== 0) throw new Error(`valid fixture rejected:\n${good.stderr || good.stdout}`);
const manifest = JSON.parse(good.stdout) as {
  schemaVersion: string; authority: string; deliveryReady: boolean;
  opening: {state: string; technical: {video: {width: number; height: number; fps: number}; audio: {sampleRate: number; channels: number}; unexpectedStreamCount: number}};
  profile: {state: string}; evidenceBoundary: {macDavinciResolveGuiActual: string};
};
if (manifest.schemaVersion !== 'wedding-projection-delivery-manifest/v1' || manifest.authority !== 'DERIVED_PROJECTION_DELIVERY_VALIDATION' || manifest.deliveryReady !== true) throw new Error('manifest contract invalid');
if (manifest.opening.state !== 'CURRENT_AND_PROJECTION_COMPATIBLE' || manifest.profile.state !== 'CURRENT_AND_PROJECTION_COMPATIBLE') throw new Error('movie compatibility state invalid');
if (manifest.opening.technical.video.width !== 1920 || manifest.opening.technical.video.height !== 1080 || Math.abs(manifest.opening.technical.video.fps - 30) > 0.01) throw new Error('video technical facts invalid');
if (manifest.opening.technical.audio.sampleRate !== 48000 || manifest.opening.technical.audio.channels !== 2 || manifest.opening.technical.unexpectedStreamCount !== 0) throw new Error('audio/stream technical facts invalid');
if (manifest.evidenceBoundary.macDavinciResolveGuiActual !== 'NOT_PROMOTED_BY_PROJECTION_VALIDATION') throw new Error('GUI Actual boundary was promoted');

const originalOpening = readFileSync(openingMp4);
writeFileSync(openingMp4, Buffer.concat([originalOpening, Buffer.from('tamper')]));
const staleSha = run(commonArgs);
if (staleSha.status === 0 || !`${staleSha.stderr}\n${staleSha.stdout}`.includes('OPENING_APPROVED_EXPORT_SHA_STALE')) throw new Error('tampered approved export was not rejected');
writeFileSync(openingMp4, originalOpening);

makeMp4(openingMp4, '1280x720');
writeApproval(openingApprovalPath, openingMp4);
writeEvidence();
const badResolution = run(commonArgs);
if (badResolution.status === 0 || !`${badResolution.stderr}\n${badResolution.stdout}`.includes('OPENING_RESOLUTION_INVALID:1280x720')) throw new Error('incompatible projection resolution was not rejected');

console.log('✅ Wedding projection delivery manifest contract passed');
console.log('✅ Valid approved H.264 MP4 / 1080p30 / AAC 48k stereo accepted');
console.log('✅ Approved-export SHA tamper rejected');
console.log('✅ Incompatible 720p delivery rejected');
console.log('✅ Mac/Studio GUI Actual remains NOT_PROMOTED by this derived validator');
