import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { assertCompleteOrAbsent, classifyMediaSet } from "./media-qa-policy.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(root, "..");
const width = 1280;
const height = 720;
const errors = [];
const sha256 = (file) => crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");

const assets = {
  matchVideo: [path.join(root, "public/motion-previews/cut-match-shape/source-actual-v1.mp4"), "a6ffdd20fcdb08107297f28c7c2c4ce864155914d1c06f0d2cc46bb6ebe0fc68"],
  matchPoster: [path.join(root, "public/motion-previews/cut-match-shape/source-actual-v1-poster.png"), "eefe6137618a8bc5e95241e1dfa24eb8b3352b3dd8b084f964c7d0d8e99c3fb5"],
  whipVideo: [path.join(root, "public/motion-previews/whip-source-matched/source-actual-v1.mp4"), "abd8138b243099208528aba5be3a8c431ddfb34a240a6c8552af3ab6f99bb5ac"],
  whipPoster: [path.join(root, "public/motion-previews/whip-source-matched/source-actual-v1-poster.png"), "28169df7348bdb6f9614f1478608328c7b53e1a9c995f448a0d77a594d1de0d1"],
};
const sourceCatalog = JSON.parse(fs.readFileSync(path.join(root, "src/data/sourceMotionActualCatalog.json"), "utf8"));
const mediaState = classifyMediaSet(Object.values(assets).map(([file]) => file));
assertCompleteOrAbsent("Source-motion Actual media", mediaState, errors);

for (const [label, [file, expectedHash]] of mediaState.mode === "COMPLETE" ? Object.entries(assets) : []) {
  if (!fs.existsSync(file)) errors.push(`${label}: missing`);
  else if (sha256(file) !== expectedHash) errors.push(`${label}: hash mismatch`);
}
if (sourceCatalog.schemaVersion !== "source-motion-actual/v1" || sourceCatalog.sources?.length !== 4) errors.push("source catalog contract mismatch");
let locallyAvailableSources = 0;
for (const sourceEntry of sourceCatalog.sources ?? []) {
  if (!/^https:\/\/www\.pexels\.com\/video\//.test(sourceEntry.sourceUrl) || sourceEntry.licenseUrl !== "https://www.pexels.com/license/" || !/^[a-f0-9]{64}$/.test(sourceEntry.sha256)) errors.push(`source catalog provenance invalid: ${sourceEntry.id}`);
  const file = path.join(repoRoot, sourceEntry.localPath);
  if (fs.existsSync(file)) {
    locallyAvailableSources += 1;
    if (sha256(file) !== sourceEntry.sha256) errors.push(`source hash mismatch: ${file}`);
  }
}

function probe(file, frames, duration) {
  const result = spawnSync("ffprobe", ["-v", "error", "-count_frames", "-show_entries", "stream=codec_name,codec_type,width,height,r_frame_rate,nb_read_frames", "-show_entries", "format=duration", "-of", "json", file], { encoding: "utf8" });
  const parsed = result.status === 0 ? JSON.parse(result.stdout) : null;
  const video = parsed?.streams?.find((stream) => stream.codec_type === "video");
  if (video?.codec_name !== "h264" || video?.width !== width || video?.height !== height || video?.r_frame_rate !== "30/1" || Number(video?.nb_read_frames) !== frames) errors.push(`${path.basename(file)}: video contract mismatch`);
  if (parsed?.streams?.some((stream) => stream.codec_type === "audio")) errors.push(`${path.basename(file)}: audio must be absent`);
  if (Math.abs(Number(parsed?.format?.duration) - duration) > 0.001) errors.push(`${path.basename(file)}: duration mismatch`);
}

const decode = (file, frameNumber) => {
  const result = spawnSync("ffmpeg", ["-v", "error", "-i", file, "-vf", `select=eq(n\\,${frameNumber})`, "-frames:v", "1", "-f", "rawvideo", "-pix_fmt", "rgb24", "-"], { encoding: null, maxBuffer: width * height * 4 });
  if (result.status !== 0 || result.stdout.length !== width * height * 3) throw new Error(`${file}: frame ${frameNumber} decode failed`);
  return result.stdout;
};
const meanAbsDiff = (a, b) => {
  let sum = 0; let samples = 0;
  for (let index = 0; index < a.length; index += 12) {
    sum += Math.abs(a[index] - b[index]) + Math.abs(a[index + 1] - b[index + 1]) + Math.abs(a[index + 2] - b[index + 2]);
    samples += 3;
  }
  return sum / samples;
};
function sunCenter(buffer) {
  let sumX = 0; let sumY = 0; let count = 0;
  for (let y = 180; y < 380; y += 1) {
    for (let x = 500; x < 780; x += 1) {
      const index = (y * width + x) * 3;
      const red = buffer[index]; const green = buffer[index + 1]; const blue = buffer[index + 2];
      if (red > 245 && green > 220 && blue > 155 && red - blue > 35) { sumX += x; sumY += y; count += 1; }
    }
  }
  return { x: Math.round(sumX / count), y: Math.round(sumY / count), count };
}
function bestHorizontalShift(a, b, maxShift = 320) {
  let best = { dx: 0, score: Number.POSITIVE_INFINITY };
  for (let dx = -maxShift; dx <= maxShift; dx += 4) {
    let score = 0; let samples = 0;
    for (let y = 100; y < 620; y += 12) {
      for (let x = maxShift + 20; x < width - maxShift - 20; x += 12) {
        const aIndex = (y * width + x) * 3;
        const bIndex = (y * width + x + dx) * 3;
        score += Math.abs(a[aIndex] - b[bIndex]) + Math.abs(a[aIndex + 1] - b[bIndex + 1]) + Math.abs(a[aIndex + 2] - b[bIndex + 2]);
        samples += 3;
      }
    }
    score /= samples;
    if (score < best.score) best = { dx, score };
  }
  return best;
}

let centerDistance = null;
let matchCutDiff = null;
let shiftA = null;
let shiftB = null;
if (mediaState.mode === "COMPLETE") {
probe(assets.matchVideo[0], 90, 3);
probe(assets.whipVideo[0], 24, 0.8);
const match43 = decode(assets.matchVideo[0], 43); const match44 = decode(assets.matchVideo[0], 44);
const match45 = decode(assets.matchVideo[0], 45); const match46 = decode(assets.matchVideo[0], 46);
const sun44 = sunCenter(match44); const sun45 = sunCenter(match45);
centerDistance = Math.hypot(sun45.x - sun44.x, sun45.y - sun44.y);
matchCutDiff = meanAbsDiff(match44, match45);
if (!(sun44.count > 500 && sun45.count > 500 && centerDistance <= 20)) errors.push(`match-shape sun alignment failed: distance=${centerDistance}`);
if (!(meanAbsDiff(match43, match44) < 5 && matchCutDiff > 40 && meanAbsDiff(match45, match46) < 5)) errors.push("match-shape must be a native cut between stable shots");

const whip1 = decode(assets.whipVideo[0], 1); const whip10 = decode(assets.whipVideo[0], 10);
const whip11 = decode(assets.whipVideo[0], 11); const whip12 = decode(assets.whipVideo[0], 12);
const whip13 = decode(assets.whipVideo[0], 13); const whip22 = decode(assets.whipVideo[0], 22);
shiftA = bestHorizontalShift(whip1, whip10); shiftB = bestHorizontalShift(whip13, whip22);
if (!(shiftA.dx < -40 && shiftB.dx < -40)) errors.push(`whip direction must remain leftward in both source shots: A=${shiftA.dx}, B=${shiftB.dx}`);
if (!(meanAbsDiff(whip11, whip12) > 40)) errors.push("whip source shots must cut without crossfade");
}

const library = fs.readFileSync(path.join(root, "src/data/visualMotionLibrary.ts"), "utf8");
const evidence = fs.readFileSync(path.join(root, "src/data/motionPreviewEvidence.ts"), "utf8");
const queue = fs.readFileSync(path.join(root, "src/data/motionActualVerificationQueue.ts"), "utf8");
for (const token of ["preview-cut-match-shape-source-actual", "preview-whip-source-matched-source-actual", "ACTUAL_SOURCE_MEDIA_RENDER", 'status: "TESTED"']) if (!library.includes(token)) errors.push(`library registration missing: ${token}`);
for (const token of ["evidence-cut-match-shape-source-actual-2026-08-28", "evidence-whip-source-matched-source-actual-2026-08-28", "productionAuthority: false"]) if (!evidence.includes(token)) errors.push(`evidence registration missing: ${token}`);
if (!queue.includes("motionActualVerificationQueue: readonly MotionActualVerificationGate[] = []")) errors.push("source-media Actual verification queue must be empty");

if (errors.length) {
  console.error(`Source-motion Actual oracle FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(mediaState.mode === "COMPLETE"
  ? `Source-motion Actual oracle OK: match center distance=${centerDistance.toFixed(2)}px/cut diff=${matchCutDiff.toFixed(2)}; whip shifts A=${shiftA.dx}px/B=${shiftB.dx}px; local sources=${locallyAvailableSources}/4.`
  : `Source-motion Actual oracle OK (code-only): local render assets absent; catalog/evidence/queue contracts passed; local sources=${locallyAvailableSources}/4.`);
