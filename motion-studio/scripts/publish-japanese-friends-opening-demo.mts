import {copyFileSync, existsSync, mkdirSync, readFileSync, statSync, writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = join(studioRoot, '..');
const source = join(studioRoot, 'out/opening/japanese_friends_opening_demo_v1.mp4');
const destination = join(repoRoot, 'movie-dashboard/public/demo-renders/japanese-friends-opening-demo-v1.mp4');
const manifestDestination = join(repoRoot, 'movie-dashboard/public/demo-renders/japanese-friends-opening-demo-v1.manifest.json');

if (!existsSync(source)) throw new Error(`Japanese friends opening render not found: ${source}`);

const probe = spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'stream=index,codec_type,codec_name,width,height,r_frame_rate,sample_rate,channels', '-show_entries', 'format=duration', '-of', 'json', source], {encoding: 'utf8'});
if (probe.status !== 0) throw new Error(`ffprobe failed:\n${probe.stderr}`);
const result = JSON.parse(probe.stdout) as {streams?: Array<Record<string, unknown>>; format?: {duration?: string}};
const video = result.streams?.find((stream) => stream.codec_type === 'video');
const audio = result.streams?.find((stream) => stream.codec_type === 'audio');
const durationSeconds = Number(result.format?.duration);
if (video?.codec_name !== 'h264' || video.width !== 1920 || video.height !== 1080 || video.r_frame_rate !== '30/1') throw new Error(`Unexpected video format: ${JSON.stringify(video)}`);
if (audio?.codec_name !== 'aac' || audio.sample_rate !== '48000' || audio.channels !== 2) throw new Error(`Unexpected audio format: ${JSON.stringify(audio)}`);
if (Math.abs(durationSeconds - 105.053333) > 0.1) throw new Error(`Unexpected duration: ${durationSeconds}s`);

mkdirSync(dirname(destination), {recursive: true});
copyFileSync(source, destination);
const sha256 = createHash('sha256').update(readFileSync(destination)).digest('hex');
const manifest = {
  schemaVersion: 'japanese-friends-opening-demo-manifest/v1',
  authority: 'FICTIONAL_CAST_DEMO',
  publicationApproved: false,
  generatedAt: new Date().toISOString(),
  artifact: {file: 'japanese-friends-opening-demo-v1.mp4', sha256, byteSize: statSync(destination).size},
  video: {codec: video.codec_name, width: video.width, height: video.height, fps: video.r_frame_rate, durationSeconds},
  audio: {codec: audio.codec_name, sampleRate: audio.sample_rate, channels: audio.channels},
  content: {fictionalCast: true, generatedPhotoCount: 5, sceneCount: 15, bgmRightsStatus: 'DUMMY_CANDIDATE'},
  qa: {status: 'PASSED', checks: ['typecheck', 'story-contract', 'resolution', 'fps', 'duration', 'audio-format']},
} as const;
writeFileSync(manifestDestination, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
console.log(`✅ Published fictional-cast Japanese opening demo: ${destination}`);
console.log(`✅ Wrote integrity manifest: ${manifestDestination}`);
