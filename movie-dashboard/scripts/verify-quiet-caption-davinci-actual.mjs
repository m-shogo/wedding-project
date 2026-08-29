import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import {spawnSync} from "node:child_process";
import {fileURLToPath} from "node:url";
import {assertCompleteOrAbsent, classifyMediaSet} from "./media-qa-policy.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const width = 1280;
const height = 720;
const video = path.join(root, "public/motion-previews/type-quiet-caption/davinci-actual-v1.mp4");
const poster = path.join(root, "public/motion-previews/type-quiet-caption/davinci-actual-v1-poster.png");
const library = fs.readFileSync(path.join(root, "src/data/visualMotionLibrary.ts"), "utf8");
const evidence = fs.readFileSync(path.join(root, "src/data/motionPreviewEvidence.ts"), "utf8");
const queue = fs.readFileSync(path.join(root, "src/data/motionActualVerificationQueue.ts"), "utf8");
const builder = fs.readFileSync(path.join(root, "scripts/create-resolve-quiet-caption-actual.lua"), "utf8");
const errors = [];
const mediaState = classifyMediaSet([video, poster]);
assertCompleteOrAbsent("Quiet-caption Actual media", mediaState, errors);

const sha256 = (file) => crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
const decode = (frame) => {
  const result = spawnSync("ffmpeg", ["-v", "error", "-i", video, "-vf", `select=eq(n\\,${frame})`, "-frames:v", "1", "-f", "rawvideo", "-pix_fmt", "rgb24", "-"], {encoding: null, maxBuffer: width * height * 4});
  if (result.status !== 0 || result.stdout.length !== width * height * 3) throw new Error(`frame ${frame} decode failed`);
  return result.stdout;
};
const roiDiff = (a, b, x0, y0, x1, y1) => {
  let sum = 0; let samples = 0;
  for (let y = y0; y < y1; y += 2) for (let x = x0; x < x1; x += 2) {
    const i = (y * width + x) * 3;
    for (let channel = 0; channel < 3; channel += 1) { sum += Math.abs(a[i + channel] - b[i + channel]); samples += 1; }
  }
  return sum / samples;
};
const captionBounds = (base, frame) => {
  const bounds = {x0: width, y0: height, x1: -1, y1: -1, pixels: 0};
  for (let y = 480; y < 640; y += 1) for (let x = 300; x < 980; x += 1) {
    const i = (y * width + x) * 3;
    const diff = Math.max(...[0, 1, 2].map((channel) => Math.abs(base[i + channel] - frame[i + channel])));
    if (diff <= 24) continue;
    bounds.x0 = Math.min(bounds.x0, x); bounds.x1 = Math.max(bounds.x1, x);
    bounds.y0 = Math.min(bounds.y0, y); bounds.y1 = Math.max(bounds.y1, y); bounds.pixels += 1;
  }
  return bounds;
};

for (const [label, file, expected] of mediaState.mode === "COMPLETE" ? [
  ["video", video, "945439d65312d947087b1f64e570d4d7eae9300bb0db656d20f3d66572e0ad03"],
  ["poster", poster, "637e04022d1c2983ba1b917274a4ea574dfa55f686248867fc145d31f08ffe69"],
] : []) {
  if (!fs.existsSync(file)) errors.push(`${label}: missing`);
  else if (sha256(file) !== expected) errors.push(`${label}: hash mismatch`);
}

if (mediaState.mode === "COMPLETE") {
  const probe = spawnSync("ffprobe", ["-v", "error", "-count_frames", "-select_streams", "v:0", "-show_entries", "stream=codec_name,width,height,r_frame_rate,nb_read_frames,duration", "-of", "json", video], {encoding: "utf8"});
  const stream = probe.status === 0 ? JSON.parse(probe.stdout)?.streams?.[0] : null;
  if (stream?.codec_name !== "h264" || stream?.width !== width || stream?.height !== height || stream?.r_frame_rate !== "24/1" || Number(stream?.nb_read_frames) !== 95 || Math.abs(Number(stream?.duration) - 3.958333) > 0.001) errors.push("render contract mismatch");

  const [frame0, frame5, frame11, frame50, frame94] = [0, 5, 11, 50, 94].map(decode);
  const caption5 = roiDiff(frame0, frame5, 350, 500, 930, 625);
  const caption11 = roiDiff(frame0, frame11, 350, 500, 930, 625);
  const caption50 = roiDiff(frame0, frame50, 350, 500, 930, 625);
  const caption94 = roiDiff(frame0, frame94, 350, 500, 930, 625);
  const control94 = roiDiff(frame0, frame94, 850, 80, 1180, 240);
  if (!(caption5 > 3 && caption5 < caption11 * 0.65 && caption11 > 8)) errors.push(`opacity fade missing (frame5=${caption5.toFixed(3)}, frame11=${caption11.toFixed(3)})`);
  if (!(Math.abs(caption11 - caption50) < 0.05 && Math.abs(caption11 - caption94) < 0.05 && control94 < 0.2)) errors.push("caption must hold while the control region remains static");
  const bounds11 = captionBounds(frame0, frame11); const bounds50 = captionBounds(frame0, frame50); const bounds94 = captionBounds(frame0, frame94);
  for (const [label, bounds] of [["frame11", bounds11], ["frame50", bounds50], ["frame94", bounds94]]) {
    if (bounds.x0 !== 407 || bounds.x1 !== 869 || bounds.y0 !== 545 || bounds.y1 !== 583 || bounds.pixels < 5000) errors.push(`${label}: caption bounds moved or disappeared (${JSON.stringify(bounds)})`);
  }
}

for (const token of [
  'id: "preview-type-quiet-caption-davinci-actual"', 'sourceType: "ACTUAL_DAVINCI_RENDER"',
  'status: "PRODUCTION_READY"', 'assetPath: "/motion-previews/type-quiet-caption/davinci-actual-v1.mp4"',
]) if (!library.includes(token)) errors.push(`library registration missing: ${token}`);
for (const token of [
  'id: "evidence-type-quiet-caption-davinci-actual-2026-08-28"',
  'artifactDigest: "sha256:945439d65312d947087b1f64e570d4d7eae9300bb0db656d20f3d66572e0ad03"',
  'productionAuthority: true',
]) if (!evidence.includes(token)) errors.push(`evidence registration missing: ${token}`);
for (const token of ["mediaType = 1", "text.Center = {0.5, 0.22}", "merge.Blend = comp:BezierSpline()", "merge.Blend[0] = 0.0", "merge.Blend[11] = 1.0", "merge.Blend[94] = 1.0"]) if (!builder.includes(token)) errors.push(`Resolve builder missing: ${token}`);
if (queue.includes('patternId: "type-quiet-caption"')) errors.push("verified quiet caption must not remain in the Actual verification queue");

if (errors.length) {
  console.error(`Quiet-caption DaVinci Actual oracle FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(mediaState.mode === "COMPLETE"
  ? "Quiet-caption DaVinci Actual oracle OK: 1280x720/24fps/95frames; opacity fades by frame 11; bbox stays x=407..869/y=545..583 through frame 94."
  : "Quiet-caption DaVinci Actual oracle OK (code-only): local video/poster absent; library, evidence, builder, and queue contracts passed.");
