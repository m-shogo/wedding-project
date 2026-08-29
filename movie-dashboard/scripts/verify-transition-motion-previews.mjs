import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const width = 1280;
const height = 720;
const errors = [];
const library = fs.readFileSync(path.join(root, "src/data/visualMotionLibrary.ts"), "utf8");
const evidence = fs.readFileSync(path.join(root, "src/data/motionPreviewEvidence.ts"), "utf8");
const previews = [
  { id: "wipe-route-line", hash: "593f6afc05367951c88185a6b1a6fdbe25cc78c704b6a15055bfb6f4a90461d6", posterHash: "07359a07ecbddea0e3153d12f10250bf9f0dc5e77604dcd0ca15559e12448b46" },
  { id: "flash-one-frame-soft", hash: "8bc02e6911524a13c911fc9a30111219c01366d3737656089eea85b7bd88679f", posterHash: "b0c16047a9db215ef7c8b3186a1b65b92c2b36b438f1eaaa186a0afe469980c8" },
  { id: "wipe-directional-shape", hash: "d3d6f5ef98957b68fb5cf7779195b85e41a3c28c36130b96197622d0759a1c0c", posterHash: "4aa342d21f1e5d2995d9efe2e9b30519762254b42978f2536a1c049e4a10f1fa" },
  { id: "wipe-paper-edge", hash: "a7e9ad84e129babd5eb605b91dec94930839dc65bc0ff71e964038d1f4043711", posterHash: "82df2a9004993ddb9bb0403b9806a65fa26a5cfea35d19a42ed58c95b703c893" },
  { id: "color-field-release", hash: "b7113e1ff8289c252b269c81afe90f83ccaa279d3a972e4caaade8e74fcfe054", posterHash: "98a5dbf217394a82392ece136a5ec09d55226881fc248eebf8341c98436ad761" },
];
const frames = [0, 1, 2, 3, 4, 6, 8, 10, 12, 18, 20, 30, 90, 119];
for (const preview of previews) {
  if (!library.includes(`"${preview.id}": "/motion-previews/${preview.id}/repo-v1"`)) errors.push(`${preview.id}: library preview wiring missing`);
  if (!evidence.includes(`id: "evidence-${preview.id}-repo-2026-08-27"`) || !evidence.includes(`artifactDigest: "sha256:${preview.hash}"`)) errors.push(`${preview.id}: evidence wiring missing`);
}
const sha256 = (file) => crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
const decode = (video, frame) => {
  const result = spawnSync("ffmpeg", ["-v", "error", "-i", video, "-vf", `select=eq(n\\,${frame})`, "-frames:v", "1", "-f", "rawvideo", "-pix_fmt", "rgb24", "-"], { encoding: null, maxBuffer: width * height * 4 });
  if (result.status !== 0 || result.stdout.length !== width * height * 3) throw new Error(`${video}: frame ${frame} decode failed`);
  return result.stdout;
};
function stats(buffer) {
  let gold = 0;
  let luminance = 0;
  let samples = 0;
  for (let y = 0; y < 620; y += 2) {
    for (let x = 0; x < width; x += 2) {
      const offset = (y * width + x) * 3;
      const r = buffer[offset]; const g = buffer[offset + 1]; const b = buffer[offset + 2];
      if (r > 175 && g > 135 && b < 170 && r > b + 45) gold += 1;
      luminance += (r + g + b) / 3;
      samples += 1;
    }
  }
  return { gold, mean: luminance / samples };
}

for (const preview of previews) {
  const video = path.join(root, `public/motion-previews/${preview.id}/repo-v1.mp4`);
  const poster = path.join(root, `public/motion-previews/${preview.id}/repo-v1-poster.png`);
  if (!fs.existsSync(video) || !fs.existsSync(poster)) { errors.push(`${preview.id}: video/poster missing`); continue; }
  if (sha256(video) !== preview.hash) errors.push(`${preview.id}: video hash mismatch`);
  if (sha256(poster) !== preview.posterHash) errors.push(`${preview.id}: poster hash mismatch`);
  const probe = spawnSync("ffprobe", ["-v", "error", "-count_frames", "-select_streams", "v:0", "-show_entries", "stream=codec_name,width,height,r_frame_rate,nb_read_frames", "-of", "json", video], { encoding: "utf8" });
  const stream = probe.status === 0 ? JSON.parse(probe.stdout)?.streams?.[0] : null;
  if (stream?.codec_name !== "h264" || stream?.width !== width || stream?.height !== height || stream?.r_frame_rate !== "30/1" || Number(stream?.nb_read_frames) !== 120) errors.push(`${preview.id}: render contract mismatch`);
  preview.stats = Object.fromEntries(frames.map((frame) => [frame, stats(decode(video, frame))]));
}

const s = (id, frame) => previews.find((preview) => preview.id === id)?.stats?.[frame];
if (!(s("wipe-route-line", 2).gold < s("wipe-route-line", 6).gold && s("wipe-route-line", 6).gold < s("wipe-route-line", 18).gold && Math.abs(s("wipe-route-line", 18).gold - s("wipe-route-line", 30).gold) / s("wipe-route-line", 30).gold < 0.05)) errors.push("route-line must draw progressively then hold");
if (!(s("flash-one-frame-soft", 1).mean > s("flash-one-frame-soft", 0).mean + 70 && s("flash-one-frame-soft", 3).mean < s("flash-one-frame-soft", 1).mean - 70)) errors.push("soft flash must peak for one frame and clear by frame 3");
for (const id of ["wipe-directional-shape", "wipe-paper-edge"]) {
  if (!(s(id, 4).gold < s(id, 8).gold && s(id, 8).gold < s(id, 12).gold && s(id, 20).gold >= s(id, 12).gold)) errors.push(`${id}: gold field must sweep progressively and settle`);
}
if (!(s("color-field-release", 0).mean < s("color-field-release", 8).mean && s("color-field-release", 8).mean < s("color-field-release", 10).mean && Math.abs(s("color-field-release", 10).mean - s("color-field-release", 30).mean) < 2 && Math.abs(s("color-field-release", 30).mean - s("color-field-release", 90).mean) < 2 && s("color-field-release", 119).mean < s("color-field-release", 8).mean)) errors.push("color-field release must fade in, hold, and fade out");

if (errors.length) {
  console.error(`Transition motion preview oracle FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  console.error(JSON.stringify(Object.fromEntries(previews.map((preview) => [preview.id, preview.stats]))));
  process.exit(1);
}
console.log(`Transition motion preview oracle OK: ${JSON.stringify(Object.fromEntries(previews.map((preview) => [preview.id, preview.stats])))}`);
