import {existsSync} from 'node:fs';
import {resolve} from 'node:path';
import {spawnSync} from 'node:child_process';

const target = resolve(process.argv.slice(2).find((arg) => !arg.startsWith('--')) ?? 'out/profile/profile_v1.mp4');
const expected = {width: 1920, height: 1080, fps: 30, duration: 30};
const tolerance = 0.15;
const errors: string[] = [];
const fail = (message: string) => errors.push(message);

if (!existsSync(target)) fail(`render file not found: ${target}`);
if (spawnSync('ffprobe', ['-version'], {encoding: 'utf8'}).status !== 0) fail('ffprobe not found');
if (errors.length) {
  for (const error of errors) console.error(`❌ ${error}`);
  process.exit(1);
}

const probe = spawnSync('ffprobe', [
  '-v', 'error',
  '-show_entries', 'stream=index,codec_type,width,height,avg_frame_rate:format=duration',
  '-of', 'json', target,
], {encoding: 'utf8'});
if (probe.status !== 0) {
  console.error(probe.stderr || probe.stdout);
  process.exit(1);
}

const data = JSON.parse(probe.stdout) as {
  streams?: Array<{codec_type?: string; width?: number; height?: number; avg_frame_rate?: string}>;
  format?: {duration?: string};
};
const video = data.streams?.find((stream) => stream.codec_type === 'video');
const audio = data.streams?.find((stream) => stream.codec_type === 'audio');
if (!video) fail('video stream missing');
if (!audio) fail('audio stream missing; Profile V1 production render must contain the approved BGM track');
if (video && (video.width !== expected.width || video.height !== expected.height)) {
  fail(`resolution mismatch ${video.width}x${video.height}`);
}
const fpsParts = video?.avg_frame_rate?.split('/').map(Number) ?? [];
const fps = fpsParts.length === 2 && fpsParts[1] ? fpsParts[0] / fpsParts[1] : Number.NaN;
if (!Number.isFinite(fps) || Math.abs(fps - expected.fps) > 0.01) fail(`fps mismatch ${fps}`);
const duration = Number(data.format?.duration);
if (!Number.isFinite(duration) || Math.abs(duration - expected.duration) > tolerance) fail(`duration mismatch ${duration}`);

if (errors.length) {
  for (const error of errors) console.error(`❌ ${error}`);
  process.exit(1);
}
console.log(`✅ Profile V1 render QA passed: ${expected.width}x${expected.height} ${expected.fps}fps ${duration.toFixed(3)}s + audio stream`);
console.log('Human final-render review / Mac DaVinci Actual are NOT inferred from technical QA.');
