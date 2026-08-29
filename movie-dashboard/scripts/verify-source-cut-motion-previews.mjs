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
  {id: "cut-hard-accent", hash: "3fd6184c4593b503ee7d9a827fadf81e5599f411bbb8f35ff674986f4a7824eb", posterHash: "21ff217f91259b48eb05f2b3830745b961197bf4d080c0734abdca87cca3c346"},
  {id: "cut-match-shape", hash: "d4332e5938be99388aa3f22d5cf13b2e7a863f71a9b5133143836c95d27323bf", posterHash: "c1774fc8e236727dfb3a1f3597e446ab2bb4cc11644240c45f4013153eb06c98"},
  {id: "whip-source-matched", hash: "8b51cd37448600bb26028fe72c54adbc32831750e4cb6b641636465100983c68", posterHash: "84b65419b3bf3c061cd1762df24aac20b1e91e6dbbdf6555046120ee75f9cd42"},
];
const palmierActual = {
  video: path.join(root, "public/motion-previews/cut-hard-accent/palmier-actual-v1.mp4"),
  poster: path.join(root, "public/motion-previews/cut-hard-accent/palmier-actual-v1-poster.png"),
  fcpxml: path.join(root, "public/motion-previews/cut-hard-accent/palmier-actual-v1.fcpxml"),
  videoHash: "26d597067f9161f0bd4be0ea69334f123b637900899d442eb6be815d7cd06d34",
  posterHash: "6c25b37a3d625bf11195705b5c1538f39d7a974f6cb38d36957f82ca6c0a7a6c",
  fcpxmlHash: "3d36a0bdd10d0e19e20fe76bd63ef6a06bf81e2aac77aa4642822799c115a907",
};

const sha256 = (file) => crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
const decode = (video, frame) => {
  const result = spawnSync("ffmpeg", ["-v", "error", "-i", video, "-vf", `select=eq(n\\,${frame})`, "-frames:v", "1", "-f", "rawvideo", "-pix_fmt", "rgb24", "-"], {encoding: null, maxBuffer: width * height * 4});
  if (result.status !== 0 || result.stdout.length !== width * height * 3) throw new Error(`${video}: frame ${frame} decode failed`);
  return result.stdout;
};
const mean = (buffer) => {
  let sum = 0;
  for (let i = 0; i < buffer.length; i += 3) sum += (buffer[i] + buffer[i + 1] + buffer[i + 2]) / 3;
  return sum / (buffer.length / 3);
};
const meanAbsDiff = (a, b) => {
  let sum = 0;
  for (let i = 0; i < a.length; i += 12) sum += Math.abs(a[i] - b[i]) + Math.abs(a[i + 1] - b[i + 1]) + Math.abs(a[i + 2] - b[i + 2]);
  return sum / (a.length / 12 * 3);
};
function bestHorizontalShift(a, b, maxShift) {
  let best = {dx: 0, score: Number.POSITIVE_INFINITY};
  for (let dx = -maxShift; dx <= maxShift; dx += 4) {
    let score = 0; let samples = 0;
    for (let y = 80; y < 600; y += 16) {
      for (let x = maxShift; x < width - maxShift; x += 16) {
        const ai = (y * width + x) * 3;
        const bi = (y * width + x + dx) * 3;
        score += Math.abs(a[ai] - b[bi]) + Math.abs(a[ai + 1] - b[bi + 1]) + Math.abs(a[ai + 2] - b[bi + 2]);
        samples += 3;
      }
    }
    score /= samples;
    if (score < best.score) best = {dx, score};
  }
  return best;
}

for (const preview of previews) {
  const base = path.join(root, `public/motion-previews/${preview.id}/repo-representative-v1`);
  const video = `${base}.mp4`; const poster = `${base}-poster.png`;
  if (!library.includes(`"${preview.id}": "/motion-previews/${preview.id}/repo-representative-v1"`)) errors.push(`${preview.id}: representative preview wiring missing`);
  if (!evidence.includes(`id: "evidence-${preview.id}-representative-2026-08-28"`) || !evidence.includes(`artifactDigest: "sha256:${preview.hash}"`)) errors.push(`${preview.id}: evidence wiring missing`);
  if (!fs.existsSync(video) || !fs.existsSync(poster)) { errors.push(`${preview.id}: video/poster missing`); continue; }
  if (sha256(video) !== preview.hash) errors.push(`${preview.id}: video hash mismatch`);
  if (sha256(poster) !== preview.posterHash) errors.push(`${preview.id}: poster hash mismatch`);
  const probe = spawnSync("ffprobe", ["-v", "error", "-count_frames", "-select_streams", "v:0", "-show_entries", "stream=codec_name,width,height,r_frame_rate,nb_read_frames", "-of", "json", video], {encoding: "utf8"});
  const stream = probe.status === 0 ? JSON.parse(probe.stdout)?.streams?.[0] : null;
  if (stream?.codec_name !== "h264" || stream?.width !== width || stream?.height !== height || stream?.r_frame_rate !== "30/1" || Number(stream?.nb_read_frames) !== 120) errors.push(`${preview.id}: render contract mismatch`);
}

const videoFor = (id) => path.join(root, `public/motion-previews/${id}/repo-representative-v1.mp4`);
const hard30 = decode(videoFor("cut-hard-accent"), 30); const hard44 = decode(videoFor("cut-hard-accent"), 44); const hard45 = decode(videoFor("cut-hard-accent"), 45); const hard60 = decode(videoFor("cut-hard-accent"), 60);
if (!(meanAbsDiff(hard30, hard44) < 0.5 && meanAbsDiff(hard45, hard60) < 0.5 && mean(hard45) > mean(hard44) + 80)) errors.push("hard accent must stay static on each side and cut without interpolation at frame 45");

const match44 = decode(videoFor("cut-match-shape"), 44); const match45 = decode(videoFor("cut-match-shape"), 45);
if (!(meanAbsDiff(match44, match45) > 40)) errors.push("match shape must visibly cut between two distinct shots");
for (const [name, buffer] of [["before", match44], ["after", match45]]) {
  const center = buffer.subarray((360 * width + 640) * 3, (360 * width + 640) * 3 + 3);
  const edge = buffer.subarray((360 * width + 445) * 3, (360 * width + 445) * 3 + 3);
  if (meanAbsDiff(center, edge) < 20) errors.push(`match shape ${name}: centered circle boundary missing`);
}

const whip = videoFor("whip-source-matched");
const shiftA = bestHorizontalShift(decode(whip, 10), decode(whip, 20), 160);
const shiftB = bestHorizontalShift(decode(whip, 50), decode(whip, 60), 180);
if (!(shiftA.dx > 20 && shiftB.dx > 20)) errors.push(`whip source motion must continue rightward in both shots (A=${shiftA.dx}, B=${shiftB.dx})`);

for (const [label, file, expectedHash] of [
  ["Palmier Actual video", palmierActual.video, palmierActual.videoHash],
  ["Palmier Actual poster", palmierActual.poster, palmierActual.posterHash],
  ["Palmier Actual FCPXML", palmierActual.fcpxml, palmierActual.fcpxmlHash],
]) {
  if (!fs.existsSync(file)) errors.push(`${label}: missing`);
  else if (sha256(file) !== expectedHash) errors.push(`${label}: hash mismatch`);
}
if (fs.existsSync(palmierActual.video)) {
  const probe = spawnSync("ffprobe", ["-v", "error", "-count_frames", "-select_streams", "v:0", "-show_entries", "stream=codec_name,width,height,r_frame_rate,nb_read_frames", "-of", "json", palmierActual.video], {encoding: "utf8"});
  const stream = probe.status === 0 ? JSON.parse(probe.stdout)?.streams?.[0] : null;
  if (stream?.codec_name !== "h264" || stream?.width !== width || stream?.height !== height || stream?.r_frame_rate !== "30/1" || Number(stream?.nb_read_frames) !== 120) errors.push("Palmier Actual: render contract mismatch");
  const before = decode(palmierActual.video, 62);
  const after = decode(palmierActual.video, 63);
  if (!(meanAbsDiff(before, after) > 0.5)) errors.push("Palmier Actual: frame 62→63 must be a visible source cut");
}
if (fs.existsSync(palmierActual.fcpxml)) {
  const xml = fs.readFileSync(palmierActual.fcpxml, "utf8");
  for (const token of [
    'duration="21/10s" enabled="1" srcEnable="video"',
    'offset="21/10s" start="0s" duration="19/10s" enabled="1" srcEnable="video"',
    'name="pixabay-simple-upbeat-158080.mp3" lane="-2" offset="0s" start="0s" duration="4s" enabled="1"',
    'enabled="0" srcEnable="audio"',
  ]) if (!xml.includes(token)) errors.push(`Palmier Actual FCPXML missing native timeline token: ${token}`);
  if (/<transition\b/.test(xml)) errors.push("Palmier Actual FCPXML must not contain a transition");
}
for (const token of [
  'id: "preview-cut-hard-accent-palmier-actual"',
  'sourceType: "ACTUAL_PALMIER_RENDER"',
  'status: "PRODUCTION_READY"',
  '"/motion-previews/cut-hard-accent/palmier-actual-v1.fcpxml"',
]) if (!library.includes(token)) errors.push(`Palmier Actual library registration missing: ${token}`);
for (const token of [
  'id: "evidence-cut-hard-accent-palmier-actual-2026-08-28"',
  `artifactDigest: "sha256:${palmierActual.videoHash}"`,
  'productionAuthority: true',
]) if (!evidence.includes(token)) errors.push(`Palmier Actual evidence registration missing: ${token}`);

if (!library.includes('preset.id in VERIFIED_REPRESENTATIVE_CUT_PREVIEW_BASES') || !evidence.includes('productionAuthority: false, notes: "代表Conceptのみ。')) errors.push("representative previews must remain explicitly separate from Actual production authority");
if (errors.length) {
  console.error(`Source-cut representative preview oracle FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`Source-cut preview oracle OK: Palmier Actual hard cut frame=63 with native FCPXML/BGM; representative concepts remain separate; match shape center locked; whip shifts A=${shiftA.dx}px/B=${shiftB.dx}px.`);
