import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const width = 1280;
const height = 720;
const library = fs.readFileSync(path.join(root, "src/data/visualMotionLibrary.ts"), "utf8");
const evidence = fs.readFileSync(path.join(root, "src/data/motionPreviewEvidence.ts"), "utf8");

const previews = [
  { id: "type-word-punch", hash: "b8a0f91c32ab9ba593c495b78ef6ac484d3d4758058de6694e3966e4ddc814dd", posterHash: "364c1581de6b8fb565ccbefd71c39f27bfc0bb730f4cf1303d272dfad4dac609" },
  { id: "type-char-stagger", hash: "ccc54ce98a887e33ce04440bc9553337bfd699fe7ca6c7df3527fa051c563d55", posterHash: "f205774c852cc36ba8a44a2fcc10bbcd781830b953a66762c69e52c550b0fb70" },
  { id: "type-tracking-burst", hash: "258858b925e8494861b35cd00b888932913d4a0eee32518ccbc7397647fbf077", posterHash: "95db2eebcefe48244122e48ef6e6ebc371899112dd7ad49f7e3bbca2e43e3371" },
  { id: "type-quiet-caption", hash: "3653d7212f6fa446f684a6927e6c6e735343a4ca7826a7d1094ddb1c84e0a859", posterHash: "bd87dacd90060363a7eb4a00398bf87e686714abde6a2bd12fb891658abf05e5" },
  { id: "type-baseline-hop", hash: "9aa49a7f8474204ad952939ea15f496c01f10f31c9a9c6b3b3294bd5db5a325e", posterHash: "23c48e2482d715022ffe43da08ba98046a9f2a71e1cf3c147ce455e9e401f5d0" },
  { id: "type-outline-fill", hash: "14a76d97f17c829b6be5a38c955179e7ab928b0024dcea64b89c22d5c04a9dd5", posterHash: "116cb7bf3ab3286eaac9d94235215decf2c3a00e4ef15ab660f68964bdda6e31" },
  { id: "type-vertical-wipe", hash: "15786c1d7b8419812192755b4d3d6ea1fce2885bd748723085363c9959a08bb4", posterHash: "2fc3283e2bc91f8948db132d0fed117c4948251ea888b475fe95ee530e0a920d" },
  { id: "type-type-on-rhythm", hash: "18af18d15bcd1ff5ed27a2ecc15933ba22b0515a869683ff6c24bfc69be0bece", posterHash: "4be0285f0ffbf34b5fe4106735c76188ee41500e7cf7c936af638000b7bc8cb8" },
  { id: "type-frame-lock", hash: "eaa898787ea7de6f699b18b2f6061a0d453c937f69a724db31d5f39e7894f7f5", posterHash: "3f1e92c06169f7d6ba097faec95ba64340e41712f017d02a5661a27aaa0d6abf" },
  { id: "type-triplet", hash: "6c8f3a9452cc3c8fabd7142b01968b212540e2b93b8bac50c8ec8329abde7579", posterHash: "2c9b002f601829537875cb6ab06038bd6a23609261e566e97cfa03db9ede4394" },
  { id: "type-counter-scroll", hash: "2c70bef02d5300c79c9ad244e218ad1c5ef9d73e7037793882ccd4e70fcf5d4e", posterHash: "3c0191a9ba3a4966f281e494194f615195e651b980365201a096ea2f0e5cd64d" },
];

for (const token of [
  '"type-word-punch": "/motion-previews/type-word-punch/repo-v1"',
  '"type-char-stagger": "/motion-previews/type-char-stagger/repo-v1"',
  '"type-tracking-burst": "/motion-previews/type-tracking-burst/repo-v1"',
  '"type-quiet-caption": "/motion-previews/type-quiet-caption/repo-v1"',
  '"type-baseline-hop": "/motion-previews/type-baseline-hop/repo-v1"',
  '"type-outline-fill": "/motion-previews/type-outline-fill/repo-v1"',
  '"type-vertical-wipe": "/motion-previews/type-vertical-wipe/repo-v1"',
  '"type-type-on-rhythm": "/motion-previews/type-type-on-rhythm/repo-v1"',
  '"type-frame-lock": "/motion-previews/type-frame-lock/repo-v1"',
  '"type-triplet": "/motion-previews/type-triplet/repo-v1"',
  '"type-counter-scroll": "/motion-previews/type-counter-scroll/repo-v1"',
  '"type-word-punch",\n  "type-char-stagger",\n  "type-tracking-burst",',
  'preset.id === "type-quiet-caption"',
  'canonical実装はDaVinci EditのためImplementationは未検証のまま',
]) {
  if (!library.includes(token)) errors.push(`typography preview library wiring missing: ${token}`);
}

for (const token of [
  'id: "evidence-type-word-punch-repo-2026-08-27"',
  'artifactDigest: "sha256:b8a0f91c32ab9ba593c495b78ef6ac484d3d4758058de6694e3966e4ddc814dd"',
  'id: "evidence-type-char-stagger-repo-2026-08-27"',
  'artifactDigest: "sha256:ccc54ce98a887e33ce04440bc9553337bfd699fe7ca6c7df3527fa051c563d55"',
  'id: "evidence-type-tracking-burst-repo-2026-08-27"',
  'artifactDigest: "sha256:258858b925e8494861b35cd00b888932913d4a0eee32518ccbc7397647fbf077"',
  'id: "evidence-type-quiet-caption-repo-2026-08-27"',
  'artifactDigest: "sha256:3653d7212f6fa446f684a6927e6c6e735343a4ca7826a7d1094ddb1c84e0a859"',
  'id: "evidence-type-baseline-hop-repo-2026-08-27"',
  'artifactDigest: "sha256:9aa49a7f8474204ad952939ea15f496c01f10f31c9a9c6b3b3294bd5db5a325e"',
  'id: "evidence-type-outline-fill-repo-2026-08-27"',
  'artifactDigest: "sha256:14a76d97f17c829b6be5a38c955179e7ab928b0024dcea64b89c22d5c04a9dd5"',
  'id: "evidence-type-vertical-wipe-repo-2026-08-27"',
  'artifactDigest: "sha256:15786c1d7b8419812192755b4d3d6ea1fce2885bd748723085363c9959a08bb4"',
  'id: "evidence-type-type-on-rhythm-repo-2026-08-27"',
  'artifactDigest: "sha256:18af18d15bcd1ff5ed27a2ecc15933ba22b0515a869683ff6c24bfc69be0bece"',
  'id: "evidence-type-frame-lock-repo-2026-08-27"',
  'artifactDigest: "sha256:eaa898787ea7de6f699b18b2f6061a0d453c937f69a724db31d5f39e7894f7f5"',
  'id: "evidence-type-triplet-repo-2026-08-27"',
  'artifactDigest: "sha256:6c8f3a9452cc3c8fabd7142b01968b212540e2b93b8bac50c8ec8329abde7579"',
  'id: "evidence-type-counter-scroll-repo-2026-08-27"',
  'artifactDigest: "sha256:2c70bef02d5300c79c9ad244e218ad1c5ef9d73e7037793882ccd4e70fcf5d4e"',
]) {
  if (!evidence.includes(token)) errors.push(`typography preview evidence wiring missing: ${token}`);
}

const sha256 = (file) => crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
const decode = (video, frame) => {
  const result = spawnSync("ffmpeg", ["-v", "error", "-i", video, "-vf", `select=eq(n\\,${frame})`, "-frames:v", "1", "-f", "rawvideo", "-pix_fmt", "rgb24", "-"], { encoding: null, maxBuffer: width * height * 4 });
  if (result.status !== 0 || result.stdout.length !== width * height * 3) throw new Error(`frame ${frame} decode failed`);
  return result.stdout;
};

function whiteStats(buffer, fullFrame = false) {
  let count = 0;
  let minX = width;
  let maxX = -1;
  let minY = height;
  let maxY = -1;
  const minScanX = fullFrame ? 0 : 180;
  const maxScanX = fullFrame ? width : 1100;
  const minScanY = fullFrame ? 0 : 150;
  const maxScanY = fullFrame ? 620 : 570;
  for (let y = minScanY; y < maxScanY; y += 1) {
    for (let x = minScanX; x < maxScanX; x += 1) {
      const offset = (y * width + x) * 3;
      const r = buffer[offset];
      const g = buffer[offset + 1];
      const b = buffer[offset + 2];
      if (r > 205 && g > 205 && b > 205 && Math.max(r, g, b) - Math.min(r, g, b) < 18) {
        count += 1;
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      }
    }
  }
  return { count, minX: count ? minX : null, maxX: count ? maxX : null, minY: count ? minY : null, maxY: count ? maxY : null, centerX: count ? (minX + maxX) / 2 : null, centerY: count ? (minY + maxY) / 2 : null };
}

function differenceStats(buffer, baseline) {
  let count = 0;
  let minX = width;
  let maxX = -1;
  let minY = height;
  let maxY = -1;
  let energy = 0;
  for (let y = 150; y < 570; y += 1) {
    for (let x = 180; x < 1100; x += 1) {
      const offset = (y * width + x) * 3;
      const delta = (Math.abs(buffer[offset] - baseline[offset]) + Math.abs(buffer[offset + 1] - baseline[offset + 1]) + Math.abs(buffer[offset + 2] - baseline[offset + 2])) / 3;
      energy += delta;
      if (delta > 12) {
        count += 1;
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      }
    }
  }
  return { count, energy: Math.round(energy), centerX: count ? (minX + maxX) / 2 : null, centerY: count ? (minY + maxY) / 2 : null };
}

for (const preview of previews) {
  const video = path.join(root, `public/motion-previews/${preview.id}/repo-v1.mp4`);
  const poster = path.join(root, `public/motion-previews/${preview.id}/repo-v1-poster.png`);
  if (!fs.existsSync(video) || !fs.existsSync(poster)) {
    errors.push(`${preview.id}: video/poster missing`);
    continue;
  }
  if (sha256(video) !== preview.hash) errors.push(`${preview.id}: video hash mismatch`);
  if (sha256(poster) !== preview.posterHash) errors.push(`${preview.id}: poster hash mismatch`);
  const probe = spawnSync("ffprobe", ["-v", "error", "-count_frames", "-select_streams", "v:0", "-show_entries", "stream=codec_name,width,height,r_frame_rate,nb_read_frames:format=duration", "-of", "json", video], { encoding: "utf8" });
  const parsed = probe.status === 0 ? JSON.parse(probe.stdout) : null;
  const stream = parsed?.streams?.[0];
  if (stream?.codec_name !== "h264" || stream?.width !== width || stream?.height !== height || stream?.r_frame_rate !== "30/1" || Number(stream?.nb_read_frames) !== 120) errors.push(`${preview.id}: render contract mismatch`);
  const frames = [0, 2, 4, 6, 10, 15, 16, 30, 33, 60, 90, 119];
  const decoded = new Map(frames.map((frame) => [frame, decode(video, frame)]));
  preview.stats = frames.map((frame) => ({ frame, ...whiteStats(decoded.get(frame)) }));
  preview.fullStats = frames.map((frame) => ({ frame, ...whiteStats(decoded.get(frame), true) }));
  if (preview.id === "type-quiet-caption") {
    preview.diffStats = frames.slice(1).map((frame) => ({ frame, ...differenceStats(decoded.get(frame), decoded.get(0)) }));
  }
}

const byId = Object.fromEntries(previews.map((preview) => [preview.id, preview.stats ?? []]));
const stat = (id, frame) => byId[id].find((entry) => entry.frame === frame);
const fullById = Object.fromEntries(previews.map((preview) => [preview.id, preview.fullStats ?? []]));
const fullStat = (id, frame) => fullById[id].find((entry) => entry.frame === frame);

if (!(stat("type-word-punch", 0).count === 0 && stat("type-word-punch", 6).count > 0 && stat("type-word-punch", 15).count >= stat("type-word-punch", 6).count)) errors.push("word-punch must reveal and settle");
if (!(stat("type-char-stagger", 0).count === 0 && stat("type-char-stagger", 6).count > 0 && stat("type-char-stagger", 15).count > stat("type-char-stagger", 6).count)) errors.push("character-stagger must add characters over time");
if (!(stat("type-tracking-burst", 0).count === 0 && stat("type-tracking-burst", 6).count > 0 && stat("type-tracking-burst", 15).count >= stat("type-tracking-burst", 6).count)) errors.push("tracking-burst must reveal and settle");
const quietDiff = previews.find((preview) => preview.id === "type-quiet-caption").diffStats;
const quietAt = (frame) => quietDiff.find((entry) => entry.frame === frame);
const quiet6 = quietAt(6);
const quiet15 = quietAt(15);
const quiet33 = quietAt(33);
const quiet119 = quietAt(119);
if (!(stat("type-quiet-caption", 0).count === 0 && quiet6.energy < quiet15.energy && quiet15.energy < quiet33.energy && Math.abs(quiet33.energy - quiet119.energy) / quiet119.energy < 0.01)) errors.push("quiet-caption must use a slow fade then hold");
if (!(quiet6.count > 0 && Math.abs(quiet6.centerX - quiet119.centerX) <= 2 && Math.abs(quiet6.centerY - quiet119.centerY) <= 2)) errors.push("quiet-caption text center moved; translate/scale is forbidden");
const hop6 = stat("type-baseline-hop", 6);
const hop15 = stat("type-baseline-hop", 15);
if (!(hop6.count > 0 && hop15.count > hop6.count && Math.abs(hop6.centerY - hop15.centerY) > 20)) errors.push("baseline-hop must visibly move toward its settled baseline");
if (!(stat("type-outline-fill", 0).count === 0 && stat("type-outline-fill", 6).count > 0 && stat("type-outline-fill", 15).count > stat("type-outline-fill", 6).count)) errors.push("outline-fill must progress from outline toward fill");
if (!(stat("type-vertical-wipe", 0).count === 0 && stat("type-vertical-wipe", 2).count > 0 && stat("type-vertical-wipe", 6).count > stat("type-vertical-wipe", 2).count)) errors.push("vertical-wipe must reveal more text over time");
if (!(stat("type-type-on-rhythm", 0).count === 0 && stat("type-type-on-rhythm", 6).count > 0 && stat("type-type-on-rhythm", 15).count > stat("type-type-on-rhythm", 6).count)) errors.push("type-on-rhythm must add the second word after the first");
const lock15 = fullStat("type-frame-lock", 15);
const lock33 = fullStat("type-frame-lock", 33);
if (!(lock15.count > 0 && lock15.maxX === width - 1 && lock33.maxX === width - 1)) errors.push("frame-lock must settle oversized text against and beyond the right frame edge");
const tripletSettle = fullStat("type-triplet", 33);
for (const hitFrame of [4, 10, 16]) {
  const hit = fullStat("type-triplet", hitFrame);
  if (!(hit.count > 0 && hit.maxX - hit.minX > tripletSettle.maxX - tripletSettle.minX)) errors.push(`triplet must punch larger than its settled state at frame ${hitFrame}`);
}
const counter30 = fullStat("type-counter-scroll", 30);
const counter60 = fullStat("type-counter-scroll", 60);
const counter90 = fullStat("type-counter-scroll", 90);
if (!(counter30.count > 0 && counter60.count > 0 && counter90.count > 0 && counter30.centerX > counter60.centerX && counter60.centerX > counter90.centerX && counter30.centerX - counter90.centerX > 300)) errors.push("counter-scroll must travel continuously left across the frame");

if (errors.length) {
  console.error(`Typography motion preview oracle FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  console.error(JSON.stringify(Object.fromEntries(previews.map((preview) => [preview.id, { stats: preview.stats, fullStats: preview.fullStats, diffStats: preview.diffStats }]))));
  process.exit(1);
}

console.log(`Typography motion preview oracle OK: ${JSON.stringify(Object.fromEntries(previews.map((preview) => [preview.id, { stats: preview.stats, fullStats: preview.fullStats, diffStats: preview.diffStats }])))}`);
