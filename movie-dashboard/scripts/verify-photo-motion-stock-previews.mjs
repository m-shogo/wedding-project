import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const temp = fs.mkdtempSync(path.join(os.tmpdir(), "photo-motion-oracle-"));
const errors = [];
const library = fs.readFileSync(path.join(root, "src/data/visualMotionLibrary.ts"), "utf8");
const evidence = fs.readFileSync(path.join(root, "src/data/motionPreviewEvidence.ts"), "utf8");

const previews = [
  {
    id: "photo-static-hero",
    video: "public/motion-previews/photo-static-hero/repo-stock-v1.mp4",
    poster: "public/motion-previews/photo-static-hero/repo-stock-v1-poster.png",
    videoHash: "9e6fc090e6f07caf270a5106249679f2250b818083f9aeb1ffb392d83d0a626c",
    posterHash: "e9c083f8dfff2613fed391ee410163c52dbad632b05d90a0cd02c933514477e0",
    psnr: { min: 60, max: Infinity },
  },
  {
    id: "photo-small-push",
    video: "public/motion-previews/photo-small-push/repo-stock-v1.mp4",
    poster: "public/motion-previews/photo-small-push/repo-stock-v1-poster.png",
    videoHash: "55f8749a1b107660d0c387cd3387c12db11cfcecd546881c27f75bde66bfa816",
    posterHash: "a640967dfec0f99f935bdbb94a0ca914bf2d57d9beb2e8869c96a041ad474d66",
    psnr: { min: 15, max: 30 },
  },
  {
    id: "photo-directional-pan",
    video: "public/motion-previews/photo-directional-pan/repo-stock-v1.mp4",
    poster: "public/motion-previews/photo-directional-pan/repo-stock-v1-poster.png",
    videoHash: "fcbb35c21387f6305671e70a0aae61400eb5c457783f7df6d7b19ce31759c8a2",
    posterHash: "d54775fb6adc0615a4ee138cb96d2d5aee699cbf93591a5e4c49273988ebd0ba",
    psnr: { min: 8, max: 20 },
  },
  {
    id: "photo-slow-pull",
    video: "public/motion-previews/photo-slow-pull/repo-stock-v1.mp4",
    poster: "public/motion-previews/photo-slow-pull/repo-stock-v1-poster.png",
    videoHash: "e7f75311b3ddb0b0231b92ff70c6389e01fb49294655f7175b6cca1bdfae85ce",
    posterHash: "b13b351e757a0306b961c885c2eec160dc078ddc374725fced9416d81955ced3",
    psnr: { min: 15, max: 30 },
  },
  {
    id: "photo-2p5d-parallax",
    video: "public/motion-previews/photo-2p5d-parallax/repo-stock-v1.mp4",
    poster: "public/motion-previews/photo-2p5d-parallax/repo-stock-v1-poster.png",
    videoHash: "07e8f07d7e44c9ba2a981ee42456f9e0b6e0c3db77c6d1afc91f9f3e7d15a709",
    posterHash: "8b59980aa14c60a4b70849d22131018ef40d6955a576d36a4e43bf6254791330",
    psnr: { min: 8, max: 18 },
  },
  {
    id: "photo-freeze-cutout",
    video: "public/motion-previews/photo-freeze-cutout/repo-stock-v1.mp4",
    poster: "public/motion-previews/photo-freeze-cutout/repo-stock-v1-poster.png",
    videoHash: "a0452c2b16f7d30da33df436acbf07d6ab0c90eee64450fa952d3839d56f8a40",
    posterHash: "7b94740cca67996b053dae59a6fb177c4d3feaa1b2a600536510de830caad26a",
    psnr: { min: 20, max: 35 },
  },
  {
    id: "photo-contact-sheet-snap",
    video: "public/motion-previews/photo-contact-sheet-snap/repo-stock-v1.mp4",
    poster: "public/motion-previews/photo-contact-sheet-snap/repo-stock-v1-poster.png",
    videoHash: "a2385b9f548481c4a1eb43f39979868e7b2d614c27da45a1b105b349ecfb94bb",
    posterHash: "9ac1f66c492cdf1cd1c06ba812bd75ea2f95db4d91cf7896e2072c840ce719da",
    psnr: { min: 2, max: 10 },
  },
  {
    id: "photo-split-panel",
    video: "public/motion-previews/photo-split-panel/repo-stock-v1.mp4",
    poster: "public/motion-previews/photo-split-panel/repo-stock-v1-poster.png",
    videoHash: "d023e5271738358ff3edad3e216607155cad003fbf0a0168068e0a60206f0021",
    posterHash: "131c9caabc590ace5e354f02f5517064e17578660e4c5dcfc9f7b3822357aa81",
    psnr: { min: 2, max: 10 },
  },
  {
    id: "accent-panel-grid",
    video: "public/motion-previews/accent-panel-grid/repo-stock-v1.mp4",
    poster: "public/motion-previews/accent-panel-grid/repo-stock-v1-poster.png",
    videoHash: "bd5875f8860eed7ccaa417e477755ea248170c909d271d6ed0b739f61e290d79",
    posterHash: "1e5cd2c1355e27a21b869ed0a6f20af07af0ed4dc198301f96a71bac30036dc6",
    psnr: { min: 2, max: 12 },
  },
];

const run = (command, args) => spawnSync(command, args, { encoding: "utf8" });
const sha256 = (file) => crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");

for (const token of [
  'const TESTED_REMOTION_IMPLEMENTATIONS = new Set([',
  'status: implementationTested ? "TESTED"',
  'status: repoPreviewVerified ? "VERIFIED"',
  'verified: implementationTested',
  '"/motion-previews/photo-static-hero/repo-stock-v1"',
  '"/motion-previews/photo-small-push/repo-stock-v1"',
  '"/motion-previews/photo-directional-pan/repo-stock-v1"',
  '"/motion-previews/photo-slow-pull/repo-stock-v1"',
  '"/motion-previews/photo-2p5d-parallax/repo-stock-v1"',
  '"/motion-previews/photo-freeze-cutout/repo-stock-v1"',
  '"/motion-previews/photo-contact-sheet-snap/repo-stock-v1"',
  '"/motion-previews/photo-split-panel/repo-stock-v1"',
  '"/motion-previews/accent-panel-grid/repo-stock-v1"',
]) {
  if (!library.includes(token)) errors.push(`visual motion library wiring missing: ${token}`);
}

for (const token of [
  'id: "evidence-photo-static-hero-stock-2026-08-27"',
  'artifactDigest: "sha256:9e6fc090e6f07caf270a5106249679f2250b818083f9aeb1ffb392d83d0a626c"',
  'persistentAssetPath: "/motion-previews/photo-static-hero/repo-stock-v1.mp4"',
  'id: "evidence-photo-small-push-stock-2026-08-27"',
  'artifactDigest: "sha256:55f8749a1b107660d0c387cd3387c12db11cfcecd546881c27f75bde66bfa816"',
  'persistentAssetPath: "/motion-previews/photo-small-push/repo-stock-v1.mp4"',
  'id: "evidence-photo-directional-pan-stock-2026-08-27"',
  'artifactDigest: "sha256:fcbb35c21387f6305671e70a0aae61400eb5c457783f7df6d7b19ce31759c8a2"',
  'persistentAssetPath: "/motion-previews/photo-directional-pan/repo-stock-v1.mp4"',
  'id: "evidence-photo-slow-pull-stock-2026-08-27"',
  'artifactDigest: "sha256:e7f75311b3ddb0b0231b92ff70c6389e01fb49294655f7175b6cca1bdfae85ce"',
  'persistentAssetPath: "/motion-previews/photo-slow-pull/repo-stock-v1.mp4"',
  'id: "evidence-photo-2p5d-parallax-stock-2026-08-27"',
  'artifactDigest: "sha256:07e8f07d7e44c9ba2a981ee42456f9e0b6e0c3db77c6d1afc91f9f3e7d15a709"',
  'persistentAssetPath: "/motion-previews/photo-2p5d-parallax/repo-stock-v1.mp4"',
  'id: "evidence-photo-freeze-cutout-stock-2026-08-27"',
  'artifactDigest: "sha256:a0452c2b16f7d30da33df436acbf07d6ab0c90eee64450fa952d3839d56f8a40"',
  'persistentAssetPath: "/motion-previews/photo-freeze-cutout/repo-stock-v1.mp4"',
  'id: "evidence-photo-contact-sheet-snap-stock-2026-08-27"',
  'artifactDigest: "sha256:a2385b9f548481c4a1eb43f39979868e7b2d614c27da45a1b105b349ecfb94bb"',
  'persistentAssetPath: "/motion-previews/photo-contact-sheet-snap/repo-stock-v1.mp4"',
  'id: "evidence-photo-split-panel-stock-2026-08-27"',
  'artifactDigest: "sha256:d023e5271738358ff3edad3e216607155cad003fbf0a0168068e0a60206f0021"',
  'persistentAssetPath: "/motion-previews/photo-split-panel/repo-stock-v1.mp4"',
  'id: "evidence-accent-panel-grid-stock-2026-08-27"',
  'artifactDigest: "sha256:bd5875f8860eed7ccaa417e477755ea248170c909d271d6ed0b739f61e290d79"',
  'persistentAssetPath: "/motion-previews/accent-panel-grid/repo-stock-v1.mp4"',
  'DEMO_ONLY_NOT_USER_MEDIA',
]) {
  if (!evidence.includes(token)) errors.push(`preview evidence wiring missing: ${token}`);
}

try {
  for (const preview of previews) {
    const video = path.join(root, preview.video);
    const poster = path.join(root, preview.poster);
    if (!fs.existsSync(video) || !fs.existsSync(poster)) {
      errors.push(`${preview.id}: persistent video/poster missing`);
      continue;
    }
    if (sha256(video) !== preview.videoHash) errors.push(`${preview.id}: video SHA-256 mismatch`);
    if (sha256(poster) !== preview.posterHash) errors.push(`${preview.id}: poster SHA-256 mismatch`);

    const probe = run("ffprobe", ["-v", "error", "-count_frames", "-select_streams", "v:0", "-show_entries", "stream=codec_name,width,height,r_frame_rate,nb_read_frames:format=duration", "-of", "json", video]);
    if (probe.status !== 0) {
      errors.push(`${preview.id}: ffprobe failed`);
      continue;
    }
    const parsed = JSON.parse(probe.stdout);
    const stream = parsed.streams?.[0];
    const duration = Number(parsed.format?.duration);
    if (stream?.codec_name !== "h264" || stream?.width !== 1280 || stream?.height !== 720 || stream?.r_frame_rate !== "30/1" || Number(stream?.nb_read_frames) !== 120 || Math.abs(duration - 4.053333) > 0.001) {
      errors.push(`${preview.id}: expected h264 / 1280x720 / 30fps / 120f / 4.053333s`);
    }

    const first = path.join(temp, `${preview.id}-first.png`);
    const last = path.join(temp, `${preview.id}-last.png`);
    for (const [frame, target] of [[0, first], [119, last]]) {
      const extract = run("ffmpeg", ["-v", "error", "-i", video, "-vf", `select=eq(n\\,${frame})`, "-frames:v", "1", target]);
      if (extract.status !== 0) errors.push(`${preview.id}: frame ${frame} decode failed`);
    }
    if (!fs.existsSync(first) || !fs.existsSync(last)) continue;

    const compare = run("ffmpeg", ["-i", first, "-i", last, "-lavfi", "[0:v]crop=960:540:160:90[x];[1:v]crop=960:540:160:90[y];[x][y]psnr", "-f", "null", "-"]);
    const psnrMatch = compare.stderr.match(/average:([0-9.]+)/);
    const psnr = psnrMatch ? Number(psnrMatch[1]) : NaN;
    if (!Number.isFinite(psnr) || psnr < preview.psnr.min || psnr > preview.psnr.max) {
      errors.push(`${preview.id}: first/last PSNR ${psnr} outside ${preview.psnr.min}..${preview.psnr.max}`);
    }
    preview.measuredPsnr = psnr;
  }
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}

if (errors.length) {
  console.error(`Photo motion stock preview oracle FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Photo motion stock preview oracle OK: ${JSON.stringify(previews.map(({ id, measuredPsnr }) => ({ id, firstLastPsnr: measuredPsnr })))}`);
