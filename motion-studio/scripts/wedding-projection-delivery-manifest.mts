import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, relative, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outPath = join(root, 'out/handoff/wedding/wedding-projection-delivery-manifest.json');
const rel = (path: string) => relative(root, path).replaceAll('\\', '/');
const shaFile = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
const shaJson = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex');
const args = process.argv.slice(2);
const argValue = (name: string, fallback?: string) => {
  const prefix = `--${name}=`;
  const hit = args.find((arg) => arg.startsWith(prefix));
  return hit ? hit.slice(prefix.length) : fallback ?? null;
};
const rational = (value?: string) => {
  if (!value) return Number.NaN;
  if (!value.includes('/')) return Number(value);
  const [n, d] = value.split('/').map(Number);
  return d ? n / d : Number.NaN;
};

const evidencePath = resolve(root, argValue('evidence-manifest', 'out/handoff/wedding/wedding-final-delivery-evidence-manifest.json')!);
const approvalPaths = {
  opening: resolve(root, argValue('opening-approval', 'out/qa/opening-v1-final-delivery-approval.json')!),
  profile: resolve(root, argValue('profile-approval', 'out/qa/profile-v1-final-delivery-approval.json')!),
} as const;
const expected = {
  width: Number(argValue('width', '1920')),
  height: Number(argValue('height', '1080')),
  fps: Number(argValue('fps', '30')),
  videoCodec: argValue('video-codec', 'h264')!,
  pixelFormat: argValue('pixel-format', 'yuv420p')!,
  audioCodec: argValue('audio-codec', 'aac')!,
  audioSampleRate: Number(argValue('audio-sample-rate', '48000')),
  audioChannels: Number(argValue('audio-channels', '2')),
};

type FinalEvidence = {
  schemaVersion?: string;
  authority?: string;
  manifestSha256?: string;
  opening?: {finalApprovalSha256?: string};
  profile?: {finalApprovalSha256?: string};
};
type Approval = {
  schemaVersion?: string;
  authority?: string;
  decision?: string;
  productionReady?: boolean;
  davinciExport?: {path?: string; sha256?: string};
};
type Probe = {
  format?: {format_name?: string; duration?: string; nb_streams?: number};
  streams?: Array<{
    index?: number;
    codec_type?: string;
    codec_name?: string;
    width?: number;
    height?: number;
    pix_fmt?: string;
    avg_frame_rate?: string;
    r_frame_rate?: string;
    sample_rate?: string;
    channels?: number;
  }>;
};

const loadJson = <T>(path: string, code: string): T => {
  if (!existsSync(path)) throw new Error(`${code}_MISSING:${rel(path)}`);
  try { return JSON.parse(readFileSync(path, 'utf8')) as T; }
  catch { throw new Error(`${code}_INVALID_JSON:${rel(path)}`); }
};

if (spawnSync('ffprobe', ['-version'], {encoding: 'utf8'}).status !== 0) {
  throw new Error('FFPROBE_NOT_AVAILABLE');
}

const evidence = loadJson<FinalEvidence>(evidencePath, 'FINAL_EVIDENCE_MANIFEST');
if (evidence.schemaVersion !== 'wedding-final-delivery-evidence-manifest/v1' || evidence.authority !== 'DERIVED_FINAL_DELIVERY_EVIDENCE_MANIFEST') {
  throw new Error('FINAL_EVIDENCE_MANIFEST_CONTRACT_INVALID');
}
const evidenceCore = {...evidence} as Record<string, unknown>;
delete evidenceCore.manifestSha256;
if (!evidence.manifestSha256 || evidence.manifestSha256 !== shaJson(evidenceCore)) throw new Error('FINAL_EVIDENCE_MANIFEST_SELF_HASH_STALE');

const inspectMovie = (movieId: 'opening' | 'profile') => {
  const approvalPath = approvalPaths[movieId];
  const approval = loadJson<Approval>(approvalPath, `${movieId.toUpperCase()}_FINAL_APPROVAL`);
  const approvalSha256 = shaFile(approvalPath);
  const expectedApprovalSha = evidence[movieId]?.finalApprovalSha256;
  if (!expectedApprovalSha || approvalSha256 !== expectedApprovalSha) throw new Error(`${movieId.toUpperCase()}_FINAL_APPROVAL_SHA_STALE`);
  if (approval.authority !== 'HUMAN_FINAL_DELIVERY_APPROVAL' || approval.decision !== 'APPROVE' || approval.productionReady !== true) {
    throw new Error(`${movieId.toUpperCase()}_FINAL_APPROVAL_NOT_APPROVED`);
  }
  if (!approval.davinciExport?.path || !approval.davinciExport.sha256) throw new Error(`${movieId.toUpperCase()}_APPROVED_EXPORT_BINDING_MISSING`);

  const exportPath = resolve(root, approval.davinciExport.path);
  if (!existsSync(exportPath)) throw new Error(`${movieId.toUpperCase()}_APPROVED_EXPORT_FILE_MISSING:${rel(exportPath)}`);
  const actualSha256 = shaFile(exportPath);
  if (actualSha256 !== approval.davinciExport.sha256) throw new Error(`${movieId.toUpperCase()}_APPROVED_EXPORT_SHA_STALE`);

  const probe = spawnSync('ffprobe', [
    '-v', 'error',
    '-show_entries', 'format=format_name,duration,nb_streams',
    '-show_entries', 'stream=index,codec_type,codec_name,width,height,pix_fmt,avg_frame_rate,r_frame_rate,sample_rate,channels',
    '-of', 'json', exportPath,
  ], {encoding: 'utf8'});
  if (probe.status !== 0) throw new Error(`${movieId.toUpperCase()}_FFPROBE_FAILED:${(probe.stderr || probe.stdout).trim()}`);
  let data: Probe;
  try { data = JSON.parse(probe.stdout) as Probe; }
  catch { throw new Error(`${movieId.toUpperCase()}_FFPROBE_INVALID_JSON`); }

  const streams = data.streams ?? [];
  const videos = streams.filter((stream) => stream.codec_type === 'video');
  const audios = streams.filter((stream) => stream.codec_type === 'audio');
  const unexpected = streams.filter((stream) => stream.codec_type !== 'video' && stream.codec_type !== 'audio');
  if (videos.length !== 1) throw new Error(`${movieId.toUpperCase()}_VIDEO_STREAM_COUNT_INVALID:${videos.length}`);
  if (audios.length !== 1) throw new Error(`${movieId.toUpperCase()}_AUDIO_STREAM_COUNT_INVALID:${audios.length}`);
  if (unexpected.length !== 0 || Number(data.format?.nb_streams ?? streams.length) !== 2) throw new Error(`${movieId.toUpperCase()}_UNEXPECTED_STREAMS_PRESENT`);

  const video = videos[0];
  const audio = audios[0];
  const fps = rational(video.avg_frame_rate || video.r_frame_rate);
  const durationSeconds = Number(data.format?.duration);
  if (!(data.format?.format_name ?? '').split(',').includes('mp4')) throw new Error(`${movieId.toUpperCase()}_CONTAINER_NOT_MP4`);
  if (video.codec_name !== expected.videoCodec) throw new Error(`${movieId.toUpperCase()}_VIDEO_CODEC_INVALID:${video.codec_name ?? 'unknown'}`);
  if (video.width !== expected.width || video.height !== expected.height) throw new Error(`${movieId.toUpperCase()}_RESOLUTION_INVALID:${video.width ?? '?'}x${video.height ?? '?'}`);
  if (video.pix_fmt !== expected.pixelFormat) throw new Error(`${movieId.toUpperCase()}_PIXEL_FORMAT_INVALID:${video.pix_fmt ?? 'unknown'}`);
  if (!Number.isFinite(fps) || Math.abs(fps - expected.fps) > 0.01) throw new Error(`${movieId.toUpperCase()}_FPS_INVALID:${Number.isFinite(fps) ? fps.toFixed(3) : 'unknown'}`);
  if (!Number.isFinite(durationSeconds) || durationSeconds <= 0) throw new Error(`${movieId.toUpperCase()}_DURATION_INVALID`);
  if (audio.codec_name !== expected.audioCodec) throw new Error(`${movieId.toUpperCase()}_AUDIO_CODEC_INVALID:${audio.codec_name ?? 'unknown'}`);
  if (Number(audio.sample_rate) !== expected.audioSampleRate) throw new Error(`${movieId.toUpperCase()}_AUDIO_SAMPLE_RATE_INVALID:${audio.sample_rate ?? 'unknown'}`);
  if (audio.channels !== expected.audioChannels) throw new Error(`${movieId.toUpperCase()}_AUDIO_CHANNELS_INVALID:${audio.channels ?? 'unknown'}`);

  return {
    movieId,
    finalApproval: {path: rel(approvalPath), sha256: approvalSha256},
    approvedExport: {path: rel(exportPath), expectedSha256: approval.davinciExport.sha256, actualSha256},
    technical: {
      container: 'mp4',
      video: {codec: video.codec_name, width: video.width, height: video.height, pixelFormat: video.pix_fmt, fps},
      durationSeconds,
      audio: {codec: audio.codec_name, sampleRate: Number(audio.sample_rate), channels: audio.channels},
      streamCount: streams.length,
      unexpectedStreamCount: unexpected.length,
    },
    state: 'CURRENT_AND_PROJECTION_COMPATIBLE' as const,
  };
};

const opening = inspectMovie('opening');
const profile = inspectMovie('profile');
const core = {
  schemaVersion: 'wedding-projection-delivery-manifest/v1',
  authority: 'DERIVED_PROJECTION_DELIVERY_VALIDATION',
  finalEvidenceManifest: {path: rel(evidencePath), sha256: shaFile(evidencePath), manifestSha256: evidence.manifestSha256},
  compatibilityProfile: expected,
  opening,
  profile,
  deliveryReady: true,
  evidenceBoundary: {
    macRemotionStudioGuiActual: 'NOT_PROMOTED_BY_PROJECTION_VALIDATION',
    palmierGuiActual: 'NOT_PROMOTED_BY_PROJECTION_VALIDATION',
    macDavinciResolveGuiActual: 'NOT_PROMOTED_BY_PROJECTION_VALIDATION',
    humanFinalApproval: 'REUSED_CURRENT_SHA_BOUND_APPROVAL_ONLY',
  },
  guardrails: [
    'APPROVED_DAVINCI_EXPORT_SHA_MUST_MATCH_FILE',
    'FINAL_EVIDENCE_MANIFEST_MUST_BIND_CURRENT_FINAL_APPROVAL',
    'MP4_H264_1920X1080_30FPS_YUV420P_REQUIRED_BY_DEFAULT',
    'AAC_48KHZ_STEREO_REQUIRED_BY_DEFAULT',
    'EXACTLY_ONE_VIDEO_AND_ONE_AUDIO_STREAM_REQUIRED',
    'VALIDATION_DERIVES_COMPATIBILITY_ONLY_AND_NEVER_CREATES_GUI_ACTUAL_OR_HUMAN_APPROVAL',
  ],
} as const;
const manifest = {...core, manifestSha256: shaJson(core)};

if (args.includes('--write')) {
  mkdirSync(dirname(outPath), {recursive: true});
  writeFileSync(outPath, `${JSON.stringify(manifest, null, 2)}\n`);
}
if (args.includes('--json') || args.includes('--write')) console.log(JSON.stringify(manifest, null, 2));
else console.log(`Wedding projection delivery: READY / opening=${opening.technical.durationSeconds.toFixed(3)}s / profile=${profile.technical.durationSeconds.toFixed(3)}s / sha=${manifest.manifestSha256}`);
