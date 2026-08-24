import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const data = fs.readFileSync(path.join(root, "src/data/startMotionKit.ts"), "utf8");
const page = fs.readFileSync(path.join(root, "src/pages/StartMotionKitCatalog.tsx"), "utf8");
const app = fs.readFileSync(path.join(root, "src/App.tsx"), "utf8");
const sidebar = fs.readFileSync(path.join(root, "src/components/Sidebar.tsx"), "utf8");
const errors = [];

function requireText(source, token, message) {
  if (!source.includes(token)) errors.push(message);
}

const presetMatches = [...data.matchAll(/p\("([^"]+)", "(TYPO|PHOTO|TRANSITION|ANIME_ACCENT)"/g)];
if (presetMatches.length !== 36) errors.push(`Motion Kit must contain exactly 36 presets, found ${presetMatches.length}`);

const ids = presetMatches.map((match) => match[1]);
if (new Set(ids).size !== ids.length) errors.push("Motion Kit preset ids must be unique");

const expectedCounts = { TYPO: 12, PHOTO: 8, TRANSITION: 8, ANIME_ACCENT: 8 };
for (const [category, expected] of Object.entries(expectedCounts)) {
  const actual = presetMatches.filter((match) => match[2] === category).length;
  if (actual !== expected) errors.push(`${category} must contain ${expected} presets, found ${actual}`);
}

for (const status of ["planned", "renderable", "reviewed", "approved"]) requireText(data, `"${status}"`, `status missing: ${status}`);
requireText(data, 'status: "planned"', "new presets must default to planned");
if (/status:\s*"approved"/.test(data)) errors.push("AI must not ship any preset approved by default");

for (const engine of ["typography-reveal", "camera-transform", "transition-wipe", "graphic-hit"]) requireText(data, `"${engine}"`, `shared motion engine missing: ${engine}`);
for (const source of ["lyric", "photo", "video"]) requireText(data, `"${source}"`, `source filter contract missing: ${source}`);
requireText(data, '"3-hit"', "3-hit use-case must remain filterable");
requireText(data, "buildPalmierMotionHandoff", "Palmier handoff builder missing");
requireText(data, "buildDavinciLearningHref", "DaVinci learning link builder missing");
requireText(data, "Do not auto-approve", "Palmier handoff must prohibit automatic approval");
requireText(data, "Do not generate or transform identity", "real-person/dog identity safety rule missing");

for (const token of ["motionFamilies", "motionEnergies", "motionSources", "motionStatuses", "motionUseCases", "navigator.clipboard.writeText", "Palmier handoff copy", "DaVinciで学ぶ"]) {
  requireText(page, token, `Motion Kit Catalog page missing: ${token}`);
}
requireText(app, 'path="movie-coach/start-motion-kit"', "Motion Kit route missing");
requireText(sidebar, 'to: "/movie-coach/start-motion-kit"', "Motion Kit LEARN navigation missing");
requireText(sidebar, 'label: "StaRt Motion Kit"', "Motion Kit navigation label missing");

if (errors.length) {
  console.error(`StaRt Motion Kit contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log("StaRt Motion Kit contracts OK: 36 presets / 12+8+8+8 / clean statuses / filters / handoff / learning links.");
