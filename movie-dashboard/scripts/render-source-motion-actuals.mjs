import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const dashboardRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(dashboardRoot, "..");
const source = (relativePath) => path.join(repoRoot, relativePath);
const output = (relativePath) => path.join(dashboardRoot, "public/motion-previews", relativePath);
const sourceCatalog = JSON.parse(fs.readFileSync(path.join(dashboardRoot, "src/data/sourceMotionActualCatalog.json"), "utf8"));
const sourceSpecs = Object.fromEntries(sourceCatalog.sources.map((entry) => [entry.id, entry]));
const sources = Object.fromEntries(Object.entries(sourceSpecs).map(([key, entry]) => [key, source(entry.localPath)]));

const sha256 = (file) => crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
const run = (command, args) => {
  const result = spawnSync(command, args, { stdio: "inherit" });
  if (result.status !== 0) throw new Error(`${command} failed with status ${result.status}`);
};

for (const [key, file] of Object.entries(sources)) {
  if (!fs.existsSync(file)) throw new Error(`Missing source: ${file}`);
  const actualHash = sha256(file);
  if (actualHash !== sourceSpecs[key].sha256) throw new Error(`${key} source hash changed: ${actualHash}`);
}

const matchVideo = output("cut-match-shape/source-actual-v1.mp4");
const matchPoster = output("cut-match-shape/source-actual-v1-poster.png");
const whipVideo = output("whip-source-matched/source-actual-v1.mp4");
const whipPoster = output("whip-source-matched/source-actual-v1-poster.png");
fs.mkdirSync(path.dirname(matchVideo), { recursive: true });
fs.mkdirSync(path.dirname(whipVideo), { recursive: true });

run("ffmpeg", [
  "-loglevel", "error", "-y", "-i", sources.matchA, "-i", sources.matchB,
  "-filter_complex",
  "[0:v]trim=start=10.5:duration=1.5,setpts=PTS-STARTPTS,fps=30,scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,format=yuv420p[a];[1:v]trim=start=0.5:duration=1.5,setpts=PTS-STARTPTS,fps=30,scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,format=yuv420p[b];[a][b]concat=n=2:v=1:a=0[out]",
  "-map", "[out]", "-an", "-frames:v", "90", "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-movflags", "+faststart", matchVideo,
]);
run("ffmpeg", ["-loglevel", "error", "-y", "-i", matchVideo, "-vf", "select=eq(n\\,44)", "-frames:v", "1", matchPoster]);

run("ffmpeg", [
  "-loglevel", "error", "-y", "-ss", "1.7", "-t", "0.4", "-i", sources.whipA,
  "-ss", "1.8", "-t", "0.4", "-i", sources.whipB,
  "-filter_complex",
  "[0:v]setpts=PTS-STARTPTS,fps=30,scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,format=yuv420p[a];[1:v]setpts=PTS-STARTPTS,fps=30,scale=1280:-2,crop=1280:720:0:(ih-720)/2,format=yuv420p[b];[a][b]concat=n=2:v=1:a=0[out]",
  "-map", "[out]", "-an", "-frames:v", "24", "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-movflags", "+faststart", whipVideo,
]);
run("ffmpeg", ["-loglevel", "error", "-y", "-i", whipVideo, "-vf", "select=eq(n\\,11)", "-frames:v", "1", whipPoster]);

console.log("Source-motion Actual renders created: match-shape=90frames, whip=24frames.");
