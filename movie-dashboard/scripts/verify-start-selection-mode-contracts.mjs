import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const plan = fs.readFileSync(path.join(root, "src/data/startSelectionPlan.ts"), "utf8");
const mode = fs.readFileSync(path.join(root, "src/data/startSelectionMode.ts"), "utf8");
const page = fs.readFileSync(path.join(root, "src/pages/StartSelectionMode.tsx"), "utf8");
const app = fs.readFileSync(path.join(root, "src/App.tsx"), "utf8");
const sidebar = fs.readFileSync(path.join(root, "src/components/Sidebar.tsx"), "utf8");
const catalog = fs.readFileSync(path.join(root, "src/data/directorRecipeCatalog.ts"), "utf8");
const errors = [];

const families = [...plan.matchAll(/\{id: "([^"]+)", label:/g)].map((match) => match[1]);
const sections = [...plan.matchAll(/\{sectionId: "([^"]+)", familyId: "([^"]+)", recipeId: "([^"]+)"/g)]
  .map((match) => ({sectionId: match[1], familyId: match[2], recipeId: match[3]}));

if (families.length < 4 || families.length > 8) errors.push(`Expected 4-8 motion families; found ${families.length}.`);
if (new Set(families).size !== families.length) errors.push("Motion family IDs must be unique.");
if (sections.length !== 14 || new Set(sections.map((item) => item.sectionId)).size !== 14) errors.push(`Expected 14 unique section selections; found ${sections.length}.`);
for (const section of sections) {
  if (!families.includes(section.familyId)) errors.push(`${section.sectionId}: unknown family ${section.familyId}.`);
  if (!catalog.includes(`id: "${section.recipeId}"`)) errors.push(`${section.sectionId}: unknown recipe ${section.recipeId}.`);
}

for (const [source, token, message] of [
  [mode, 'start-extended-selection-mode-v1', "selection localStorage key missing"],
  [page, "NEXT ACTION", "next-action guide missing"],
  [page, "Codex用プロンプトをコピー", "Codex prompt copy missing"],
  [page, "Shortlist JSONを保存", "shortlist export missing"],
  [page, "AUDIO_BLOCKED / MEDIA_BLOCKED", "blocked authority label missing"],
  [app, 'path="movie-coach/start-selection"', "Selection Mode route missing"],
  [sidebar, 'to: "/movie-coach/start-selection"', "Selection Mode navigation missing"],
]) if (!source.includes(token)) errors.push(message);

if (errors.length) {
  console.error(`StaRt Selection Mode contracts FAILED (${errors.length})`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log(`StaRt Selection Mode contracts OK: ${families.length} families / ${sections.length} sections / export + prompt + blockers.`);
