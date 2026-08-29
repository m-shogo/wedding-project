import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const asset = path.join(root, "public/motion-previews/type-mask-reveal/davinci-actual-v1.mp4");
const expectedSha256 = "32d5e1b39b2b8d381ae7521f4c6c3bcc30fe72b1dacb0fc7153b87e8bcf23592";
const width = 1280;
const height = 720;
const frameNumbers = [0, 17, 18, 24, 30, 36, 60, 119];

function fail(message) {
  console.error(`Mask Reveal rendered-pixel oracle FAILED: ${message}`);
  process.exit(1);
}

if (!fs.existsSync(asset)) {
  console.log("Mask Reveal rendered-pixel oracle OK (code-only): local binary asset is absent by Git media policy; committed digest/evidence contracts are checked separately.");
  process.exit(0);
}
const digest = crypto.createHash("sha256").update(fs.readFileSync(asset)).digest("hex");
if (digest !== expectedSha256) fail(`asset digest mismatch: ${digest}`);

const probe = spawnSync("ffprobe", [
  "-v", "error",
  "-select_streams", "v:0",
  "-show_entries", "stream=width,height,r_frame_rate,nb_frames:format=duration",
  "-of", "json",
  asset,
], { encoding: "utf8" });
if (probe.status !== 0) fail(`ffprobe failed: ${probe.stderr}`);
const probeData = JSON.parse(probe.stdout);
const stream = probeData.streams?.[0];
if (stream?.width !== width || stream?.height !== height) fail("render must be 1280x720");
if (stream?.r_frame_rate !== "30/1" || Number(stream?.nb_frames) !== 120) fail("render must be 30fps / 120 frames");
if (Number(probeData.format?.duration) !== 4) fail("render must measure exactly 4 seconds");

const filter = `select='${frameNumbers.map((frame) => `eq(n\\,${frame})`).join("+")}'`;
const decoded = spawnSync("ffmpeg", [
  "-v", "error",
  "-i", asset,
  "-vf", filter,
  "-vsync", "0",
  "-f", "rawvideo",
  "-pix_fmt", "rgb24",
  "pipe:1",
], { maxBuffer: 64 * 1024 * 1024 });
if (decoded.status !== 0) fail(`ffmpeg decode failed: ${decoded.stderr.toString()}`);

const frameBytes = width * height * 3;
if (decoded.stdout.length !== frameBytes * frameNumbers.length) {
  fail(`decoded ${decoded.stdout.length} bytes; expected ${frameBytes * frameNumbers.length}`);
}

function measure(frameIndex) {
  const offset = frameIndex * frameBytes;
  let whiteTextPixels = 0;
  let warmAccentPixels = 0;
  for (let y = 450; y < height; y += 1) {
    for (let x = 650; x < width; x += 1) {
      const pixel = offset + (y * width + x) * 3;
      const red = decoded.stdout[pixel];
      const green = decoded.stdout[pixel + 1];
      const blue = decoded.stdout[pixel + 2];
      if (red > 210 && green > 210 && blue > 210) whiteTextPixels += 1;
      if (red > 130 && green > 70 && green < 190 && blue < 100) warmAccentPixels += 1;
    }
  }
  return { frame: frameNumbers[frameIndex], whiteTextPixels, warmAccentPixels };
}

const samples = frameNumbers.map((_, index) => measure(index));
const byFrame = Object.fromEntries(samples.map((sample) => [sample.frame, sample]));

for (const frame of [0, 17, 18]) {
  if (byFrame[frame].whiteTextPixels !== 0) fail(`frame ${frame} must keep WELCOME outside the mask`);
}
if (!(byFrame[24].whiteTextPixels > 2000 && byFrame[24].whiteTextPixels < byFrame[30].whiteTextPixels)) {
  fail("frame 24 must contain a partial reveal smaller than frame 30");
}
if (!(byFrame[30].whiteTextPixels < byFrame[36].whiteTextPixels && byFrame[36].whiteTextPixels > 10000)) {
  fail("WELCOME must continue revealing through frame 30 and be fully settled by frame 36");
}
for (const frame of [0, 17, 18, 24, 30, 36, 60, 119]) {
  if (byFrame[frame].warmAccentPixels < 500) fail(`frame ${frame} lost the warm accent line`);
}
for (const frame of [60, 119]) {
  if (Math.abs(byFrame[frame].whiteTextPixels - byFrame[36].whiteTextPixels) > 20) {
    fail(`frame ${frame} must hold the settled text without exit motion`);
  }
}

console.log(`Mask Reveal rendered-pixel oracle OK: ${JSON.stringify(samples)}`);
