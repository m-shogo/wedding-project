import {copyFileSync, existsSync, mkdirSync, readFileSync, statSync, writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = join(studioRoot, '..');
const source = join(studioRoot, 'out/opening/japanese_friends_opening_start_sync_v1.mp4');
const audioSource = join(studioRoot, 'local/audio/StaRt.m4a');
const destination = join(repoRoot, 'movie-dashboard/public/demo-renders/japanese-friends-opening-start-sync-v1.mp4');
const manifestDestination = join(repoRoot, 'movie-dashboard/public/demo-renders/japanese-friends-opening-start-sync-v1.manifest.json');

if (!existsSync(source)) throw new Error(`StaRt sync opening render not found: ${source}`);
if (!existsSync(audioSource)) throw new Error(`Local StaRt source not found: ${audioSource}`);

const probe = spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'stream=index,codec_type,codec_name,width,height,r_frame_rate,sample_rate,channels', '-show_entries', 'format=duration', '-of', 'json', source], {encoding: 'utf8'});
if (probe.status !== 0) throw new Error(`ffprobe failed:\n${probe.stderr}`);
const result = JSON.parse(probe.stdout) as {streams?: Array<Record<string, unknown>>; format?: {duration?: string}};
const video = result.streams?.find((stream) => stream.codec_type === 'video');
const audio = result.streams?.find((stream) => stream.codec_type === 'audio');
const durationSeconds = Number(result.format?.duration);
if (video?.codec_name !== 'h264' || video.width !== 1920 || video.height !== 1080 || video.r_frame_rate !== '30/1') throw new Error(`Unexpected video format: ${JSON.stringify(video)}`);
if (audio?.codec_name !== 'aac' || audio.sample_rate !== '48000' || audio.channels !== 2) throw new Error(`Unexpected audio format: ${JSON.stringify(audio)}`);
if (Math.abs(durationSeconds - 145.642667) > 0.1) throw new Error(`Unexpected duration: ${durationSeconds}s`);

const blackDetect = spawnSync('ffmpeg', ['-hide_banner', '-i', source, '-vf', 'blackdetect=d=0.08:pix_th=0.10', '-an', '-f', 'null', '-'], {encoding: 'utf8'});
if (blackDetect.status !== 0 || /black_start/.test(`${blackDetect.stdout}${blackDetect.stderr}`)) throw new Error('Black-frame QA failed');
const silenceDetect = spawnSync('ffmpeg', ['-hide_banner', '-i', source, '-af', 'silencedetect=n=-50dB:d=1', '-vn', '-f', 'null', '-'], {encoding: 'utf8'});
if (silenceDetect.status !== 0 || /silence_start/.test(`${silenceDetect.stdout}${silenceDetect.stderr}`)) throw new Error('Silence QA failed');

mkdirSync(dirname(destination), {recursive: true});
copyFileSync(source, destination);
const sha256 = createHash('sha256').update(readFileSync(destination)).digest('hex');
const sourceAudioSha256 = createHash('sha256').update(readFileSync(audioSource)).digest('hex');
const manifest = {
  schemaVersion: 'japanese-friends-opening-start-sync-manifest/v1',
  authority: 'PRIVATE_START_SYNC_DEMO',
  publicationApproved: false,
  rightsStatus: 'MUSIC_AND_LYRICS_NOT_CLEARED',
  generatedAt: new Date().toISOString(),
  artifact: {file: 'japanese-friends-opening-start-sync-v1.mp4', sha256, byteSize: statSync(destination).size},
  source: {title: 'StaRt', sourceAudioSha256, editEndSeconds: 145.6, bpm: 187.5},
  video: {codec: video.codec_name, width: video.width, height: video.height, fps: video.r_frame_rate, durationSeconds},
  audio: {codec: audio.codec_name, sampleRate: audio.sample_rate, channels: audio.channels},
  timing: {lyricPhraseCount: 30, measuredThreeHitPhraseCount: 4, verifiedByListening: false, humanReviewRequired: true},
  qa: {status: 'AUTOMATED_PASSED', checks: ['resolution', 'fps', 'duration', 'audio-format', 'black-detect', 'silence-detect']},
} as const;
writeFileSync(manifestDestination, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
console.log(`✅ Published private StaRt sync opening: ${destination}`);
console.log(`✅ Wrote rights-guarded manifest: ${manifestDestination}`);
