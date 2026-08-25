import {existsSync} from 'node:fs';
import {spawnSync} from 'node:child_process';

const artifactPath = process.argv[2];
if (!artifactPath || !existsSync(artifactPath)) {
  console.error(`usage: node scripts/verify-visual-motion-mask-reveal-artifact.mts <rendered-mp4> (missing: ${artifactPath ?? '(none)'})`);
  process.exit(1);
}

const sampleWidth = 320;
const sampleHeight = 180;
const channels = 3;
const expectedBytes = sampleWidth * sampleHeight * channels;
const errors: string[] = [];

function fail(message: string) {
  errors.push(message);
  console.error(`❌ ${message}`);
}

function run(command: string, args: string[]): Buffer {
  const result = spawnSync(command, args, {encoding: null, maxBuffer: 16 * 1024 * 1024});
  if (result.status !== 0) {
    throw new Error(`${command} failed: ${result.stderr?.toString().trim() || '(no stderr)'}`);
  }
  return result.stdout ?? Buffer.alloc(0);
}

function frameAt(frame: number): Buffer {
  const output = run('ffmpeg', [
    '-v', 'error', '-i', artifactPath,
    '-vf', `select=eq(n\\,${frame}),scale=${sampleWidth}:${sampleHeight}:flags=neighbor`,
    '-frames:v', '1', '-f', 'rawvideo', '-pix_fmt', 'rgb24', 'pipe:1',
  ]);
  if (output.length !== expectedBytes) throw new Error(`frame ${frame}: expected ${expectedBytes} RGB bytes, got ${output.length}`);
  return output;
}

function meanAbsDelta(a: Buffer, b: Buffer): number {
  let total = 0;
  for (let i = 0; i < expectedBytes; i++) total += Math.abs(a[i] - b[i]);
  return total / expectedBytes;
}

function brightCentroidY(frame: Buffer): {count: number; y: number | null} {
  let count = 0;
  let weightedY = 0;
  const x0 = Math.round(sampleWidth * 0.18);
  const x1 = Math.round(sampleWidth * 0.82);
  const y0 = Math.round(sampleHeight * 0.24);
  const y1 = Math.round(sampleHeight * 0.78);
  for (let y = y0; y < y1; y++) {
    for (let x = x0; x < x1; x++) {
      const offset = (y * sampleWidth + x) * channels;
      const r = frame[offset];
      const g = frame[offset + 1];
      const b = frame[offset + 2];
      const luma = r * 0.299 + g * 0.587 + b * 0.114;
      if (luma > 145) {
        count += 1;
        weightedY += y;
      }
    }
  }
  return {count, y: count ? weightedY / count : null};
}

const metadata = JSON.parse(run('ffprobe', [
  '-v', 'error', '-count_frames', '-select_streams', 'v:0',
  '-show_entries', 'stream=width,height,nb_read_frames,r_frame_rate', '-of', 'json', artifactPath,
]).toString());
const stream = metadata.streams?.[0];
if (Number(stream?.width) !== 1280 || Number(stream?.height) !== 720) fail(`expected 1280x720 artifact, got ${stream?.width ?? '?'}x${stream?.height ?? '?'}`);
if (stream?.r_frame_rate !== '30/1') fail(`expected 30fps artifact, got ${stream?.r_frame_rate ?? '(missing)'}`);
if (Number(stream?.nb_read_frames) !== 120) fail(`expected 120 frames / 4 seconds, got ${stream?.nb_read_frames ?? '(missing)'}`);

const start = frameAt(0);
const revealing = frameAt(4);
const settled = frameAt(18);
const late = frameAt(90);
const startToReveal = meanAbsDelta(start, revealing);
const revealToSettled = meanAbsDelta(revealing, settled);
const settledToLate = meanAbsDelta(settled, late);

if (startToReveal < 0.35) fail(`text does not visibly begin revealing (mean delta ${startToReveal.toFixed(3)})`);
if (revealToSettled < 0.20) fail(`reveal does not materially progress to settled state (mean delta ${revealToSettled.toFixed(3)})`);
if (settledToLate > 0.18) fail(`preview should settle after the reveal, but late frames still differ too much (${settledToLate.toFixed(3)})`);

const revealingText = brightCentroidY(revealing);
const settledText = brightCentroidY(settled);
if (settledText.count < 250) fail(`WELCOME is not clearly visible after reveal (${settledText.count} bright pixels)`);
if (revealingText.y !== null && settledText.y !== null && revealingText.y <= settledText.y + 0.8) {
  fail(`mask reveal should travel upward into its settled position (reveal y=${revealingText.y.toFixed(2)}, settled y=${settledText.y.toFixed(2)})`);
}

console.log(JSON.stringify({width: stream?.width, height: stream?.height, fps: stream?.r_frame_rate, frames: stream?.nb_read_frames, startToReveal, revealToSettled, settledToLate, revealingText, settledText}, null, 2));
if (errors.length) {
  console.error(`Visual Motion Mask Reveal rendered-artifact oracle FAILED (${errors.length})`);
  process.exit(1);
}
console.log('Visual Motion Mask Reveal rendered-artifact oracle OK: 720p/30fps/4s concept visibly reveals upward, settles, and remains repository-generated concept evidence only.');
