import {createHash} from 'node:crypto';
import {mkdirSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const fixture = join(root, 'out/test/venue-delivery-redundancy');
const source = join(fixture, 'source');
const primary = join(fixture, 'primary');
const backup = join(fixture, 'backup');
const cloud = join(fixture, 'cloud');
const receipt = join(fixture, 'redundancy.json');
const rel = (path: string) => relative(root, path).replaceAll('\\', '/');
const shaFile = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
const shaJson = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex');

if (spawnSync('ffmpeg', ['-version'], {encoding: 'utf8'}).status !== 0 || spawnSync('ffprobe', ['-version'], {encoding: 'utf8'}).status !== 0) throw new Error('ffmpeg/ffprobe required');
rmSync(fixture, {recursive: true, force: true});
mkdirSync(source, {recursive: true});

const render = (path: string, frequency: number) => {
  const result = spawnSync('ffmpeg', [
    '-y', '-hide_banner', '-loglevel', 'error',
    '-f', 'lavfi', '-i', 'color=c=navy:s=1920x1080:r=30:d=0.4',
    '-f', 'lavfi', '-i', `sine=frequency=${frequency}:sample_rate=48000:duration=0.4`,
    '-shortest', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-r', '30',
    '-c:a', 'aac', '-ar', '48000', '-ac', '2', '-movflags', '+faststart', path,
  ], {encoding: 'utf8'});
  if (result.status !== 0) throw new Error(result.stderr || 'fixture render failed');
};
const probe = (path: string) => {
  const result = spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration,nb_streams', '-show_entries', 'stream=codec_type,codec_name,width,height,pix_fmt,avg_frame_rate,sample_rate,channels', '-of', 'json', path], {encoding: 'utf8'});
  if (result.status !== 0) throw new Error(result.stderr || 'fixture ffprobe failed');
  const data = JSON.parse(result.stdout) as {format: {duration: string}; streams: Array<any>};
  const video = data.streams.find((stream) => stream.codec_type === 'video');
  const audio = data.streams.find((stream) => stream.codec_type === 'audio');
  const [n, d] = String(video.avg_frame_rate).split('/').map(Number);
  return {container: 'mp4', video: {codec: video.codec_name, width: video.width, height: video.height, pixelFormat: video.pix_fmt, fps: n / d}, durationSeconds: Number(data.format.duration), audio: {codec: audio.codec_name, sampleRate: Number(audio.sample_rate), channels: audio.channels}, streamCount: 2, unexpectedStreamCount: 0};
};

const openingPath = join(source, '01_OPENING.mp4');
const profilePath = join(source, '02_PROFILE.mp4');
render(openingPath, 440);
render(profilePath, 660);
const openingSha = shaFile(openingPath);
const profileSha = shaFile(profilePath);
const compatibilityProfile = {width: 1920, height: 1080, fps: 30, videoCodec: 'h264', pixelFormat: 'yuv420p', audioCodec: 'aac', audioSampleRate: 48000, audioChannels: 2};
const core = {
  schemaVersion: 'wedding-venue-delivery-package/v1', authority: 'DERIVED_VENUE_DELIVERY_PACKAGE',
  builtFromProjectionManifest: 'fixture', projectionManifestSha256: '1234567890abcdef', projectionManifestFileSha256: 'abcdef1234567890', projectionCurrentnessState: 'CURRENT', compatibilityProfile,
  opening: {movieId: 'opening', filename: '01_OPENING.mp4', sha256: openingSha, sourceExportSha256: openingSha, technical: probe(openingPath)},
  profile: {movieId: 'profile', filename: '02_PROFILE.mp4', sha256: profileSha, sourceExportSha256: profileSha, technical: probe(profilePath)},
  packageReady: true,
  evidenceBoundary: {macDavinciResolveGuiActual: 'NOT_PROMOTED_BY_PACKAGE_BUILD'}, guardrails: [],
};
const manifest = {...core, manifestSha256: shaJson(core)};
const manifestPath = join(source, 'DELIVERY-MANIFEST.json');
writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
writeFileSync(join(source, 'SHA256SUMS.txt'), `${openingSha}  01_OPENING.mp4\n${profileSha}  02_PROFILE.mp4\n${shaFile(manifestPath)}  DELIVERY-MANIFEST.json\n`);

const run = spawnSync(process.execPath, [
  '--no-warnings', join(root, 'scripts/wedding-venue-delivery-redundancy.mts'),
  `--source=${rel(source)}`, `--primary=${rel(primary)}`, `--backup=${rel(backup)}`, `--cloud=${rel(cloud)}`, `--receipt=${rel(receipt)}`, '--json',
], {cwd: root, encoding: 'utf8'});
if (run.status !== 0) throw new Error(`three-copy redundancy rejected valid package:\n${run.stderr || run.stdout}`);
const report = JSON.parse(run.stdout) as {redundancyReady?: boolean; copies?: Array<{targetId?: string; state?: string; openingSha256?: string; profileSha256?: string}>; evidenceBoundary?: Record<string, string>};
if (report.redundancyReady !== true || report.copies?.length !== 3 || !report.copies.every((copy) => copy.state === 'CURRENT')) throw new Error('three-copy redundancy not READY');
if (!report.copies.every((copy) => copy.openingSha256 === openingSha && copy.profileSha256 === profileSha)) throw new Error('copied movie SHA mismatch');
if (report.evidenceBoundary?.physicalUsbInsertedActual !== 'NOT_PROMOTED_BY_REDUNDANCY_SCRIPT' || report.evidenceBoundary?.cloudUploadActual !== 'NOT_PROMOTED_BY_REDUNDANCY_SCRIPT' || report.evidenceBoundary?.venuePlaybackActual !== 'NOT_RUN') throw new Error('external Actual evidence promoted');

const currentnessScript = join(root, 'scripts/wedding-venue-delivery-redundancy-currentness.mts');
const current = spawnSync(process.execPath, ['--no-warnings', currentnessScript, `--receipt=${rel(receipt)}`, '--strict-current', '--json'], {cwd: root, encoding: 'utf8'});
if (current.status !== 0) throw new Error(`fresh redundancy receipt rejected:\n${current.stderr || current.stdout}`);
const currentReport = JSON.parse(current.stdout) as {state?: string; current?: boolean; copies?: Array<{state?: string}>; evidenceBoundary?: Record<string, string>};
if (currentReport.state !== 'CURRENT' || currentReport.current !== true || currentReport.copies?.length !== 3 || !currentReport.copies.every((copy) => copy.state === 'CURRENT')) throw new Error('fresh redundancy receipt not CURRENT');
if (currentReport.evidenceBoundary?.venuePlaybackActual !== 'NOT_RUN') throw new Error('currentness promoted venue playback Actual');

writeFileSync(join(backup, '01_OPENING.mp4'), Buffer.concat([readFileSync(join(backup, '01_OPENING.mp4')), Buffer.from('tamper')]));
const verifyTampered = spawnSync(process.execPath, ['--no-warnings', join(root, 'scripts/wedding-venue-delivery-package-verify.mts'), `--package-dir=${rel(backup)}`, '--json'], {cwd: root, encoding: 'utf8'});
if (verifyTampered.status === 0 || !`${verifyTampered.stderr}\n${verifyTampered.stdout}`.includes('OPENING_VENUE_FILE_SHA_STALE')) throw new Error('tampered backup copy accepted');

const stale = spawnSync(process.execPath, ['--no-warnings', currentnessScript, `--receipt=${rel(receipt)}`, '--strict-current', '--json'], {cwd: root, encoding: 'utf8'});
if (stale.status === 0) throw new Error('post-receipt backup tamper remained CURRENT');
const staleText = `${stale.stderr}\n${stale.stdout}`;
if (!staleText.includes('BACKUP_USB_OFFLINE_VERIFY_FAILED')) throw new Error(`post-receipt tamper did not surface expected stale blocker:\n${staleText}`);

console.log('✅ Wedding venue three-copy redundancy + strict-current contract passed');
console.log('✅ PRIMARY_USB / BACKUP_USB / CLOUD_BACKUP copies each offline-verified');
console.log('✅ Fresh redundancy receipt re-verifies CURRENT at all live target paths');
console.log('✅ Post-receipt backup tamper makes strict-current fail closed');
console.log('✅ Physical USB/cloud/venue playback Actual remain NOT_RUN');
