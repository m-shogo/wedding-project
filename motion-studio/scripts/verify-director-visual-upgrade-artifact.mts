// Independent rendered-artifact oracle for StartDirectorVisualUpgradesV1.
//
// Deliberately does not import the renderer, adapter, fidelity audit, or review composition.
// It treats the MP4 as the product and checks the visual brief through sampled pixels:
//   1. stamp -> line -> route dot appear in distinct horizontal zones over time
//   2. scribble spans the frame as a continuous underline
//   3. halftone resolves into many separate dot components
//   4. foreground and background have materially different horizontal displacement

import {existsSync} from 'node:fs';
import {spawnSync} from 'node:child_process';

const artifactPath = process.argv[2];
if (!artifactPath || !existsSync(artifactPath)) {
  console.error(`usage: pnpm check:director-visual-upgrade-artifact <rendered-mp4> (missing: ${artifactPath ?? '(none)'})`);
  process.exit(1);
}

const width = 480;
const height = 270;
const channels = 3;
const expectedBytes = width * height * channels;
let errors = 0;
const fail = (message: string) => {
  errors += 1;
  console.error(`❌ ${message}`);
};

function run(command: string, args: string[]): Buffer {
  const result = spawnSync(command, args, {encoding: null, maxBuffer: 8 * 1024 * 1024});
  if (result.status !== 0) {
    const stderr = result.stderr?.toString().trim() || '(no stderr)';
    throw new Error(`${command} failed: ${stderr}`);
  }
  return result.stdout ?? Buffer.alloc(0);
}

function frameAt(frame: number): Buffer {
  const output = run('ffmpeg', [
    '-v', 'error', '-i', artifactPath,
    '-vf', `select=eq(n\\,${frame}),scale=${width}:${height}:flags=neighbor`,
    '-frames:v', '1', '-f', 'rawvideo', '-pix_fmt', 'rgb24', 'pipe:1',
  ]);
  if (output.length !== expectedBytes) throw new Error(`frame ${frame}: expected ${expectedBytes} RGB bytes, got ${output.length}`);
  return output;
}

function pixelDelta(a: Buffer, b: Buffer, x: number, y: number): number {
  const offset = (y * width + x) * channels;
  return Math.abs(a[offset] - b[offset]) + Math.abs(a[offset + 1] - b[offset + 1]) + Math.abs(a[offset + 2] - b[offset + 2]);
}

function changedRatio(a: Buffer, b: Buffer, rect: [number, number, number, number], threshold = 55): number {
  const [x0, y0, x1, y1] = rect;
  let changed = 0;
  let total = 0;
  for (let y = y0; y < y1; y++) {
    for (let x = x0; x < x1; x++) {
      total += 1;
      if (pixelDelta(a, b, x, y) >= threshold) changed += 1;
    }
  }
  return changed / total;
}

function horizontalCoverage(a: Buffer, b: Buffer, rect: [number, number, number, number], bins: number): number {
  const [x0, y0, x1, y1] = rect;
  let covered = 0;
  for (let bin = 0; bin < bins; bin++) {
    const left = Math.round(x0 + ((x1 - x0) * bin) / bins);
    const right = Math.round(x0 + ((x1 - x0) * (bin + 1)) / bins);
    if (changedRatio(a, b, [left, y0, right, y1], 65) > 0.003) covered += 1;
  }
  return covered;
}

function componentCount(a: Buffer, b: Buffer, rect: [number, number, number, number]): number {
  const [x0, y0, x1, y1] = rect;
  const rw = x1 - x0;
  const rh = y1 - y0;
  const mask = new Uint8Array(rw * rh);
  for (let y = 0; y < rh; y++) {
    for (let x = 0; x < rw; x++) {
      if (pixelDelta(a, b, x + x0, y + y0) >= 85) mask[y * rw + x] = 1;
    }
  }
  let count = 0;
  const stack: number[] = [];
  for (let start = 0; start < mask.length; start++) {
    if (mask[start] !== 1) continue;
    mask[start] = 2;
    stack.push(start);
    let size = 0;
    while (stack.length) {
      const current = stack.pop()!;
      size += 1;
      const x = current % rw;
      const y = Math.floor(current / rw);
      for (const next of [current - 1, current + 1, current - rw, current + rw]) {
        if (next < 0 || next >= mask.length || mask[next] !== 1) continue;
        const nx = next % rw;
        const ny = Math.floor(next / rw);
        if (Math.abs(nx - x) + Math.abs(ny - y) !== 1) continue;
        mask[next] = 2;
        stack.push(next);
      }
    }
    if (size >= 3 && size <= 220) count += 1;
  }
  return count;
}

function luma(frame: Buffer, x: number, y: number): number {
  const offset = (y * width + x) * channels;
  return frame[offset] * 0.299 + frame[offset + 1] * 0.587 + frame[offset + 2] * 0.114;
}

function bestHorizontalShift(a: Buffer, b: Buffer, rect: [number, number, number, number], maxShift: number): number {
  const [x0, y0, x1, y1] = rect;
  let bestShift = 0;
  let bestError = Number.POSITIVE_INFINITY;
  for (let shift = -maxShift; shift <= maxShift; shift++) {
    let error = 0;
    let samples = 0;
    for (let y = y0; y < y1; y += 2) {
      for (let x = x0; x < x1; x += 2) {
        const bx = x + shift;
        if (bx < 0 || bx >= width) continue;
        error += Math.abs(luma(a, x, y) - luma(b, bx, y));
        samples += 1;
      }
    }
    const meanError = error / Math.max(1, samples);
    if (meanError < bestError) {
      bestError = meanError;
      bestShift = shift;
    }
  }
  return bestShift;
}

const metadata = JSON.parse(run('ffprobe', [
  '-v', 'error', '-count_frames', '-select_streams', 'v:0',
  '-show_entries', 'stream=nb_read_frames,r_frame_rate', '-of', 'json', artifactPath,
]).toString());
const stream = metadata.streams?.[0];
if (stream?.r_frame_rate !== '30/1') fail(`expected 30fps artifact, got ${stream?.r_frame_rate ?? '(missing)'}`);
if (Number(stream?.nb_read_frames) !== 300) fail(`expected 300 frames (4 x 75), got ${stream?.nb_read_frames ?? '(missing)'}`);

const stampBase = frameAt(0);
const stamp = frameAt(8);
const line = frameAt(18);
const dot = frameAt(24);
const stampLeft = changedRatio(stampBase, stamp, [70, 80, 185, 175]);
const lineCenter = changedRatio(stamp, line, [170, 105, 325, 155]);
const dotRight = changedRatio(line, dot, [315, 90, 390, 165]);
if (stampLeft < 0.012) fail(`stamp phase is not visible in the left zone (changed ratio ${stampLeft.toFixed(4)})`);
if (lineCenter < 0.006) fail(`line phase is not visible in the center zone (changed ratio ${lineCenter.toFixed(4)})`);
if (dotRight < 0.006) fail(`route-dot phase is not visible in the right zone (changed ratio ${dotRight.toFixed(4)})`);

const scribbleBase = frameAt(75);
const scribble = frameAt(99);
const scribbleCoverage = horizontalCoverage(scribbleBase, scribble, [45, 90, 430, 180], 8);
if (scribbleCoverage < 6) fail(`scribble underline lacks horizontal continuity (${scribbleCoverage}/8 zones changed)`);

const halftoneBase = frameAt(150);
const halftone = frameAt(165);
const halftoneComponents = componentCount(halftoneBase, halftone, [120, 45, 410, 225]);
if (halftoneComponents < 20) fail(`halftone field lacks separate dot components (${halftoneComponents}, expected >=20)`);

const parallaxStart = frameAt(225);
const parallaxEnd = frameAt(299);
const backgroundShift = bestHorizontalShift(parallaxStart, parallaxEnd, [250, 35, 440, 125], 32);
const foregroundShift = bestHorizontalShift(parallaxStart, parallaxEnd, [35, 80, 250, 210], 32);
if (Math.abs(foregroundShift - backgroundShift) < 6) {
  fail(`parallax layers do not show distinct displacement (foreground=${foregroundShift}px, background=${backgroundShift}px)`);
}

console.log(JSON.stringify({stampLeft, lineCenter, dotRight, scribbleCoverage, halftoneComponents, foregroundShift, backgroundShift}, null, 2));
if (errors > 0) {
  console.error(`Director visual-upgrade artifact oracle FAILED: ${errors} error(s).`);
  process.exit(1);
}
console.log('Director visual-upgrade artifact oracle OK: rendered pixels independently satisfy all four visual briefs.');
