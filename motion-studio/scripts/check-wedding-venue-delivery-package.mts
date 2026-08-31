import {createHash} from 'node:crypto';
import {mkdirSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const fixtureDir = join(root, 'out/test/venue-delivery-package');
const verifyScript = join(root, 'scripts/wedding-venue-delivery-package-verify.mts');
const shaFile = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
const shaJson = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex');
const rel = (path: string) => relative(root, path).replaceAll('\\', '/');

if (spawnSync('ffmpeg', ['-version'], {encoding: 'utf8'}).status !== 0 || spawnSync('ffprobe', ['-version'], {encoding: 'utf8'}).status !== 0) throw new Error('ffmpeg/ffprobe required');
rmSync(fixtureDir, {recursive: true, force: true});
mkdirSync(fixtureDir, {recursive: true});

const render = (path: string, size = '1920x1080') => {
  const result = spawnSync('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', '-f', 'lavfi', '-i', `color=c=navy:s=${size}:r=30:d=0.6`, '-f', 'lavfi', '-i', 'sine=frequency=440:sample_rate=48000:duration=0.6', '-shortest', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-r', '30', '-c:a', 'aac', '-ar', '48000', '-ac', '2', '-movflags', '+faststart', path], {encoding: 'utf8'});
  if (result.status !== 0) throw new Error(result.stderr || 'fixture render failed');
};
const probeTechnical = (path: string) => {
  const result = spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration,nb_streams', '-show_entries', 'stream=codec_type,codec_name,width,height,pix_fmt,avg_frame_rate,sample_rate,channels', '-of', 'json', path], {encoding: 'utf8'});
  if (result.status !== 0) throw new Error(result.stderr || 'fixture ffprobe failed');
  const data = JSON.parse(result.stdout) as {format: {duration: string; nb_streams: number}; streams: Array<any>};
  const video = data.streams.find((s) => s.codec_type === 'video');
  const audio = data.streams.find((s) => s.codec_type === 'audio');
  const [n, d] = String(video.avg_frame_rate).split('/').map(Number);
  return {container: 'mp4', video: {codec: video.codec_name, width: video.width, height: video.height, pixelFormat: video.pix_fmt, fps: n / d}, durationSeconds: Number(data.format.duration), audio: {codec: audio.codec_name, sampleRate: Number(audio.sample_rate), channels: audio.channels}, streamCount: data.streams.length, unexpectedStreamCount: 0};
};
const openingPath = join(fixtureDir, '01_OPENING.mp4');
const profilePath = join(fixtureDir, '02_PROFILE.mp4');
render(openingPath); render(profilePath);
const compatibilityProfile = {width: 1920, height: 1080, fps: 30, videoCodec: 'h264', pixelFormat: 'yuv420p', audioCodec: 'aac', audioSampleRate: 48000, audioChannels: 2};
const writeManifestAndSums = () => {
  const openingSha = shaFile(openingPath); const profileSha = shaFile(profilePath);
  const core = {
    schemaVersion: 'wedding-venue-delivery-package/v1', authority: 'DERIVED_VENUE_DELIVERY_PACKAGE', builtFromProjectionManifest: 'fixture', projectionManifestSha256: '1234567890abcdef', projectionManifestFileSha256: 'abcdef1234567890', projectionCurrentnessState: 'CURRENT', compatibilityProfile,
    opening: {movieId: 'opening', filename: '01_OPENING.mp4', sha256: openingSha, sourceExportSha256: openingSha, technical: probeTechnical(openingPath)},
    profile: {movieId: 'profile', filename: '02_PROFILE.mp4', sha256: profileSha, sourceExportSha256: profileSha, technical: probeTechnical(profilePath)},
    packageReady: true,
    evidenceBoundary: {macRemotionStudioGuiActual: 'NOT_PROMOTED_BY_PACKAGE_BUILD', palmierGuiActual: 'NOT_PROMOTED_BY_PACKAGE_BUILD', macDavinciResolveGuiActual: 'NOT_PROMOTED_BY_PACKAGE_BUILD', humanFinalApproval: 'REUSED_CURRENT_PROJECTION_CHAIN_ONLY'},
    guardrails: [],
  };
  const manifest = {...core, manifestSha256: shaJson(core)};
  const manifestPath = join(fixtureDir, 'DELIVERY-MANIFEST.json');
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  writeFileSync(join(fixtureDir, 'SHA256SUMS.txt'), `${openingSha}  01_OPENING.mp4\n${profileSha}  02_PROFILE.mp4\n${shaFile(manifestPath)}  DELIVERY-MANIFEST.json\n`);
};
const run = () => spawnSync(process.execPath, ['--no-warnings', verifyScript, `--package-dir=${rel(fixtureDir)}`, '--json'], {cwd: root, encoding: 'utf8'});

writeManifestAndSums();
const good = run();
if (good.status !== 0) throw new Error(`valid venue package rejected:\n${good.stderr || good.stdout}`);
const report = JSON.parse(good.stdout) as {state: string; current: boolean; evidenceBoundary: {macDavinciResolveGuiActual: string}};
if (report.state !== 'CURRENT' || report.current !== true) throw new Error('valid venue package not CURRENT');
if (report.evidenceBoundary.macDavinciResolveGuiActual !== 'NOT_PROMOTED_BY_OFFLINE_PACKAGE_VERIFY') throw new Error('GUI Actual promoted by offline verify');

const original = readFileSync(openingPath);
writeFileSync(openingPath, Buffer.concat([original, Buffer.from('tamper')]));
const tampered = run();
if (tampered.status === 0 || !`${tampered.stderr}\n${tampered.stdout}`.includes('OPENING_VENUE_FILE_SHA_STALE')) throw new Error('tampered copied MP4 accepted');
writeFileSync(openingPath, original);

writeFileSync(join(fixtureDir, 'README.txt'), 'unexpected');
const extra = run();
if (extra.status === 0 || !`${extra.stderr}\n${extra.stdout}`.includes('VENUE_PACKAGE_CONTENTS_INVALID')) throw new Error('extra USB file accepted');
rmSync(join(fixtureDir, 'README.txt'));

render(openingPath, '1280x720');
writeManifestAndSums();
const incompatible = run();
if (incompatible.status === 0 || !`${incompatible.stderr}\n${incompatible.stdout}`.includes('OPENING_VENUE_VIDEO_TECHNICAL_INVALID')) throw new Error('incompatible copied MP4 accepted');

console.log('✅ Wedding venue delivery package verifier contract passed');
console.log('✅ Real 1080p30 H.264/AAC package accepted');
console.log('✅ Post-copy MP4 tamper rejected');
console.log('✅ Unexpected USB/package file rejected');
console.log('✅ Incompatible 720p copied MP4 rejected after ffprobe');
console.log('✅ GUI Actual remains NOT_PROMOTED');
