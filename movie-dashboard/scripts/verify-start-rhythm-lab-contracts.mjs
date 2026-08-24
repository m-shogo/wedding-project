import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const data = fs.readFileSync(path.join(root, "src/data/startRhythmLab.ts"), "utf8");
const page = fs.readFileSync(path.join(root, "src/pages/StartRhythmLab.tsx"), "utf8");
const app = fs.readFileSync(path.join(root, "src/App.tsx"), "utf8");
const errors = [];

function requireText(source, token, message) {
  if (!source.includes(token)) errors.push(message);
}

requireText(data, 'bpm: 190', "StaRt BPM must remain 190");
requireText(data, 'halfTimeBpm: 95', "half-time editing grid must remain 95 BPM");
requireText(data, 'candidateOffsetSec: 3', "Candidate A must preserve +3s song offset for A/B");
requireText(data, 'songStartSec: 38', "chorus alignment at song 0:38 must remain represented");
for (const second of [17, 28, 38, 48, 58]) {
  requireText(data, `songStartSec: ${second}`, `song structure marker missing: ${second}s`);
}

const sceneIds = [
  "v1-photo-cold-open",
  "v1-photos-okinawa",
  "v1-photos-seoul",
  "v1-photos-hawaii",
  "v1-photo-hero-a",
  "v1-photo-hero-b",
  "v1-arrival-route",
  "v1-ending-title",
];
for (const sceneId of sceneIds) requireText(data, `sceneId: "${sceneId}"`, `Opening V1 scene missing from rhythm plan: ${sceneId}`);
const sceneMatches = [...data.matchAll(/sceneId: "(v1-[^"]+)"/g)].map((match) => match[1]);
if (sceneMatches.length !== sceneIds.length) errors.push(`rhythm plan must contain exactly ${sceneIds.length} Opening scenes, found ${sceneMatches.length}`);
if (JSON.stringify(sceneMatches) !== JSON.stringify(sceneIds)) errors.push("rhythm plan scene order must match Opening V1 canonical order");

const timelineRanges = [...data.matchAll(/timelineStartSec: (\d+),\n\s+timelineEndSec: (\d+)/g)].map((match) => [Number(match[1]), Number(match[2])]);
if (timelineRanges.length !== 8) errors.push(`expected 8 timeline ranges, found ${timelineRanges.length}`);
const coveredSec = timelineRanges.reduce((sum, [start, end]) => sum + (end - start), 0);
if (coveredSec !== 60) errors.push(`StaRt Candidate A must cover exactly 60s, found ${coveredSec}s`);
for (let index = 1; index < timelineRanges.length; index++) {
  if (timelineRanges[index - 1][1] !== timelineRanges[index][0]) errors.push(`timeline gap/overlap between scene ${index} and ${index + 1}`);
}

const heroBlock = data.match(/sceneId: "v1-photo-hero-a"[\s\S]*?sceneId: "v1-photo-hero-b"/)?.[0] ?? "";
requireText(heroBlock, "timelineStartSec: 35", "Hero A must start at Opening 35s");
requireText(heroBlock, "songStartSec: 38", "Hero A must align to Candidate A chorus at song 0:38");
requireText(heroBlock, "1.03〜1.05", "Hero A small-push comparison range must remain restrained");

const drillCount = (data.match(/id: "start-drill-/g) ?? []).length;
if (drillCount < 5) errors.push(`at least 5 practical DaVinci drills required, found ${drillCount}`);
const refCount = (data.match(/id: "start-ref-/g) ?? []).length;
if (refCount < 8) errors.push(`at least 8 reference entries required, found ${refCount}`);

for (const skill of ["davinci-marker", "davinci-trim", "davinci-ripple", "davinci-transform", "davinci-keyframe", "davinci-easing", "davinci-text", "davinci-audio-fade"]) {
  requireText(data, `"${skill}"`, `DaVinci practice skill missing: ${skill}`);
}

requireText(data, "NUFfRHk1Qcs", "official StaRt artist audio reference missing");
requireText(data, "blackmagicdesign.com/jp/products/davinciresolve/training", "official Blackmagic training reference missing");
requireText(data, "DaVinci_Resolve_21_New_Features_Guide.pdf", "Resolve 21 official guide reference missing");
requireText(data, "190 BPMの毎拍", "anti-overcut rule missing");
requireText(data, "Speed Rampは静止画には使わない", "speed-ramp safety rule for still photos missing");
requireText(data, "無断ミラー", "copyright-safe reference collection rule missing");
requireText(data, "Beatは命令ではなく候補", "beat-is-not-command learning principle missing");

requireText(page, "startOpeningScenePlan", "Rhythm Lab page must render Opening scene mapping");
requireText(page, "startDavinciDrills", "Rhythm Lab page must render DaVinci drills");
requireText(page, "startReferences", "Rhythm Lab page must render reference library");
requireText(app, 'path="movie-coach/start-rhythm"', "StaRt Rhythm Lab route missing");

if (errors.length) {
  console.error(`StaRt Rhythm Lab contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`StaRt Rhythm Lab contracts OK: ${sceneMatches.length} scenes / ${drillCount} drills / ${refCount} references / 60s Candidate A.`);
