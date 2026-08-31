import {createHash} from 'node:crypto';
import {existsSync, readdirSync, readFileSync} from 'node:fs';
import {basename, dirname, join, relative, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const argValue = (name: string, fallback: string) => {
  const prefix = `--${name}=`;
  const hit = args.find((arg) => arg.startsWith(prefix));
  return hit ? hit.slice(prefix.length) : fallback;
};
const packageDir = resolve(root, argValue('package-dir', 'out/delivery/wedding-venue'));
const rel = (path: string) => relative(root, path).replaceAll('\\', '/');
const shaFile = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
const shaJson = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex');
const rational = (value?: string) => {
  if (!value) return Number.NaN;
  if (!value.includes('/')) return Number(value);
  const [n, d] = value.split('/').map(Number);
  return d ? n / d : Number.NaN;
};

const expectedFiles = ['01_OPENING.mp4', '02_PROFILE.mp4', 'DELIVERY-MANIFEST.json', 'SHA256SUMS.txt'] as const;
if (!existsSync(packageDir)) throw new Error(`VENUE_PACKAGE_MISSING:${rel(packageDir)}`);
const actualFiles = readdirSync(packageDir).sort();
if (JSON.stringify(actualFiles) !== JSON.stringify([...expectedFiles].sort())) {
  throw new Error(`VENUE_PACKAGE_CONTENTS_INVALID:${actualFiles.join(',')}`);
}

type MovieEntry = {
  movieId?: string;
  filename?: string;
  sha256?: string;
  sourceExportSha256?: string;
  technical?: {
    container?: string;
    video?: {codec?: string; width?: number; height?: number; pixelFormat?: string; fps?: number};
    durationSeconds?: number;
    audio?: {codec?: string; sampleRate?: number; channels?: number};
    streamCount?: number;
    unexpectedStreamCount?: number;
  };
};
type DeliveryManifest = {
  schemaVersion?: string;
  authority?: string;
  projectionManifestSha256?: string;
  projectionCurrentnessState?: string;
  compatibilityProfile?: {
    width?: number; height?: number; fps?: number; videoCodec?: string; pixelFormat?: string;
    audioCodec?: string; audioSampleRate?: number; audioChannels?: number;
  };
  opening?: MovieEntry;
  profile?: MovieEntry;
  packageReady?: boolean;
  evidenceBoundary?: Record<string, string>;
  manifestSha256?: string;
};

const manifestPath = join(packageDir, 'DELIVERY-MANIFEST.json');
let manifest: DeliveryManifest;
try { manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as DeliveryManifest; }
catch { throw new Error('VENUE_DELIVERY_MANIFEST_INVALID_JSON'); }
if (manifest.schemaVersion !== 'wedding-venue-delivery-package/v1' || manifest.authority !== 'DERIVED_VENUE_DELIVERY_PACKAGE') throw new Error('VENUE_DELIVERY_MANIFEST_CONTRACT_INVALID');
const core = {...manifest} as Record<string, unknown>;
delete core.manifestSha256;
if (!manifest.manifestSha256 || manifest.manifestSha256 !== shaJson(core)) throw new Error('VENUE_DELIVERY_MANIFEST_SELF_SHA_INVALID');
if (manifest.projectionCurrentnessState !== 'CURRENT' || manifest.packageReady !== true) throw new Error('VENUE_DELIVERY_PACKAGE_NOT_CURRENT');

const canonical = {width: 1920, height: 1080, fps: 30, videoCodec: 'h264', pixelFormat: 'yuv420p', audioCodec: 'aac', audioSampleRate: 48000, audioChannels: 2} as const;
for (const [key, value] of Object.entries(canonical)) {
  if (manifest.compatibilityProfile?.[key as keyof typeof canonical] !== value) throw new Error(`VENUE_COMPATIBILITY_${key.toUpperCase()}_INVALID`);
}
if (!manifest.projectionManifestSha256 || manifest.projectionManifestSha256.length < 8) throw new Error('VENUE_PROJECTION_MANIFEST_SHA_MISSING');
if (spawnSync('ffprobe', ['-version'], {encoding: 'utf8'}).status !== 0) throw new Error('FFPROBE_NOT_AVAILABLE');

const verifyMovie = (movieId: 'opening' | 'profile', expectedFilename: string) => {
  const item = manifest[movieId];
  if (!item || item.movieId !== movieId || item.filename !== expectedFilename || !item.sha256 || !item.sourceExportSha256) throw new Error(`${movieId.toUpperCase()}_VENUE_BINDING_INVALID`);
  if (item.sha256 !== item.sourceExportSha256) throw new Error(`${movieId.toUpperCase()}_COPY_SHA_DIFFERS_FROM_SOURCE`);
  const path = join(packageDir, expectedFilename);
  if (shaFile(path) !== item.sha256) throw new Error(`${movieId.toUpperCase()}_VENUE_FILE_SHA_STALE`);
  const probe = spawnSync('ffprobe', [
    '-v', 'error', '-show_entries', 'format=format_name,duration,nb_streams',
    '-show_entries', 'stream=codec_type,codec_name,width,height,pix_fmt,avg_frame_rate,r_frame_rate,sample_rate,channels',
    '-of', 'json', path,
  ], {encoding: 'utf8'});
  if (probe.status !== 0) throw new Error(`${movieId.toUpperCase()}_VENUE_FFPROBE_FAILED`);
  const data = JSON.parse(probe.stdout) as {format?: {format_name?: string; duration?: string; nb_streams?: number}; streams?: Array<any>};
  const streams = data.streams ?? [];
  const videos = streams.filter((s) => s.codec_type === 'video');
  const audios = streams.filter((s) => s.codec_type === 'audio');
  if (videos.length !== 1 || audios.length !== 1 || streams.length !== 2 || Number(data.format?.nb_streams) !== 2) throw new Error(`${movieId.toUpperCase()}_VENUE_STREAMS_INVALID`);
  const video = videos[0]; const audio = audios[0]; const fps = rational(video.avg_frame_rate || video.r_frame_rate); const durationSeconds = Number(data.format?.duration);
  if (!(data.format?.format_name ?? '').split(',').includes('mp4') || video.codec_name !== canonical.videoCodec || video.width !== canonical.width || video.height !== canonical.height || video.pix_fmt !== canonical.pixelFormat || Math.abs(fps - canonical.fps) > 0.01) throw new Error(`${movieId.toUpperCase()}_VENUE_VIDEO_TECHNICAL_INVALID`);
  if (audio.codec_name !== canonical.audioCodec || Number(audio.sample_rate) !== canonical.audioSampleRate || audio.channels !== canonical.audioChannels) throw new Error(`${movieId.toUpperCase()}_VENUE_AUDIO_TECHNICAL_INVALID`);
  if (!Number.isFinite(durationSeconds) || durationSeconds <= 0) throw new Error(`${movieId.toUpperCase()}_VENUE_DURATION_INVALID`);
  if (item.technical) {
    if (item.technical.video?.codec !== video.codec_name || item.technical.video?.width !== video.width || item.technical.video?.height !== video.height || item.technical.video?.pixelFormat !== video.pix_fmt || Math.abs(Number(item.technical.video?.fps) - fps) > 0.01 || item.technical.audio?.codec !== audio.codec_name || item.technical.audio?.sampleRate !== Number(audio.sample_rate) || item.technical.audio?.channels !== audio.channels || Math.abs(Number(item.technical.durationSeconds) - durationSeconds) > 0.02 || item.technical.streamCount !== streams.length || item.technical.unexpectedStreamCount !== 0) throw new Error(`${movieId.toUpperCase()}_VENUE_MANIFEST_TECHNICAL_STALE`);
  }
  return {filename: expectedFilename, sha256: item.sha256, durationSeconds};
};

const opening = verifyMovie('opening', '01_OPENING.mp4');
const profile = verifyMovie('profile', '02_PROFILE.mp4');
const checksumExpected = [
  `${opening.sha256}  ${opening.filename}`,
  `${profile.sha256}  ${profile.filename}`,
  `${shaFile(manifestPath)}  ${basename(manifestPath)}`,
].join('\n') + '\n';
if (readFileSync(join(packageDir, 'SHA256SUMS.txt'), 'utf8') !== checksumExpected) throw new Error('VENUE_SHA256SUMS_STALE');

const report = {
  schemaVersion: 'wedding-venue-delivery-package-verification/v1',
  authority: 'DERIVED_OFFLINE_VENUE_PACKAGE_VERIFICATION',
  state: 'CURRENT', current: true, packageDir: rel(packageDir),
  projectionManifestSha256: manifest.projectionManifestSha256,
  deliveryManifestSha256: manifest.manifestSha256,
  opening, profile,
  evidenceBoundary: {
    macRemotionStudioGuiActual: 'NOT_PROMOTED_BY_OFFLINE_PACKAGE_VERIFY',
    palmierGuiActual: 'NOT_PROMOTED_BY_OFFLINE_PACKAGE_VERIFY',
    macDavinciResolveGuiActual: 'NOT_PROMOTED_BY_OFFLINE_PACKAGE_VERIFY',
    humanFinalApproval: 'NOT_PROMOTED_BY_OFFLINE_PACKAGE_VERIFY',
  },
} as const;
if (args.includes('--json')) console.log(JSON.stringify(report, null, 2));
else console.log(`Wedding venue delivery package: CURRENT / opening=${opening.sha256.slice(0, 12)} / profile=${profile.sha256.slice(0, 12)}`);
