import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const plan = fs.readFileSync(path.join(root, "src/data/startSelectionPlan.ts"), "utf8");
const mode = fs.readFileSync(path.join(root, "src/data/startSelectionMode.ts"), "utf8");
const creative = fs.readFileSync(path.join(root, "src/data/startCreativeIdeas.ts"), "utf8");
const page = fs.readFileSync(path.join(root, "src/pages/StartSelectionMode.tsx"), "utf8");
const app = fs.readFileSync(path.join(root, "src/App.tsx"), "utf8");
const sidebar = fs.readFileSync(path.join(root, "src/components/Sidebar.tsx"), "utf8");
const catalog = fs.readFileSync(path.join(root, "src/data/directorRecipeCatalog.ts"), "utf8");
const errors = [];

const families = [...plan.matchAll(/\{id: "([^"]+)", label:/g)].map((match) => match[1]);
const sections = [...plan.matchAll(/\{sectionId: "([^"]+)", familyId: "([^"]+)", recipeId: "([^"]+)"/g)]
  .map((match) => ({sectionId: match[1], familyId: match[2], recipeId: match[3]}));
const creativeDirections = [...creative.matchAll(/\{id: "(balanced-joy|documentary-warm|anime-pop)", label:/g)].map((match) => match[1]);
const creativeIdeas = [...creative.matchAll(/\{id: "([^"]+)", sectionId: "([^"]+)"/g)]
  .map((match) => ({id: match[1], sectionId: match[2]}));

if (families.length < 4 || families.length > 8) errors.push(`Expected 4-8 motion families; found ${families.length}.`);
if (new Set(families).size !== families.length) errors.push("Motion family IDs must be unique.");
if (sections.length !== 14 || new Set(sections.map((item) => item.sectionId)).size !== 14) errors.push(`Expected 14 unique section selections; found ${sections.length}.`);
for (const section of sections) {
  if (!families.includes(section.familyId)) errors.push(`${section.sectionId}: unknown family ${section.familyId}.`);
  if (!catalog.includes(`id: "${section.recipeId}"`)) errors.push(`${section.sectionId}: unknown recipe ${section.recipeId}.`);
}
if (creativeDirections.length !== 3 || new Set(creativeDirections).size !== 3) errors.push(`Expected 3 unique creative directions; found ${creativeDirections.length}.`);
if (creativeIdeas.length !== 28 || new Set(creativeIdeas.map((idea) => idea.id)).size !== 28) errors.push(`Expected 28 unique creative ideas; found ${creativeIdeas.length}.`);
for (const section of sections) {
  const ideaCount = creativeIdeas.filter((idea) => idea.sectionId === section.sectionId).length;
  if (ideaCount !== 2) errors.push(`${section.sectionId}: expected 2 creative ideas; found ${ideaCount}.`);
}

for (const [source, token, message] of [
  [mode, 'start-extended-selection-mode-v1', "selection localStorage key missing"],
  [mode, "selectedCreativeIdeaIds", "creative idea persistence missing"],
  [mode, "creativeDirectionId", "creative direction persistence missing"],
  [page, "NEXT ACTION", "next-action guide missing"],
  [page, "CREATIVE IDEA ASSISTANT", "creative idea assistant missing"],
  [page, "採用候補に追加（Promptへ入る）", "creative idea prompt handoff missing"],
  [page, "必要素材", "creative idea material hint missing"],
  [page, "作ったアニメーションはここ", "animation library guide missing"],
  [page, "動く図鑑の起動コマンドをコピー", "Remotion Studio preview command missing"],
  [page, "Codex用プロンプトをコピー", "Codex prompt copy missing"],
  [page, "Shortlist JSONを保存", "shortlist export missing"],
  [page, "AUDIO_BLOCKED / MEDIA_BLOCKED", "blocked authority label missing"],
  [page, "/05_photos/opening/", "StaRt photo source folder missing"],
  [page, "/06_videos/opening/", "StaRt video source folder missing"],
  [page, "/07_music/candidates/", "StaRt candidate audio folder missing"],
  [page, "/07_music/licensed/", "StaRt licensed audio folder missing"],
  [page, "Finderで ⌘⇧G", "Finder navigation tip missing"],
  [page, "素材投入Tips", "asset intake beginner tips missing"],
  [page, "Remotionの", "runtime handoff explanation missing"],
  [app, 'path="movie-coach/start-selection"', "Selection Mode route missing"],
  [sidebar, 'to: "/movie-coach/start-selection"', "Selection Mode navigation missing"],
]) if (!source.includes(token)) errors.push(message);

if (errors.length) {
  console.error(`StaRt Selection Mode contracts FAILED (${errors.length})`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log(`StaRt Selection Mode contracts OK: ${families.length} families / ${sections.length} sections / ${creativeDirections.length} directions / ${creativeIdeas.length} creative ideas / export + prompt + blockers.`);
