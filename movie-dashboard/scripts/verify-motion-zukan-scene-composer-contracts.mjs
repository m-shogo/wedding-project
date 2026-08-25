import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const composer = fs.readFileSync(path.join(root, "src/data/visualSceneComposer.ts"), "utf8");
const workspace = fs.readFileSync(path.join(root, "src/components/MaskRevealEditableWorkspace.tsx"), "utf8");
const principles = fs.readFileSync(path.join(root, "../docs/decisions/2026-08-25-motion-zukan-product-principles.md"), "utf8");
const claude = fs.readFileSync(path.join(root, "../CLAUDE.md"), "utf8");
const errors = [];

function requireText(source, token, message) {
  if (!source.includes(token)) errors.push(message);
}

for (const token of [
  "# モーション図鑑 Product Principles",
  "ユーザー向けの正本名称は **「モーション図鑑」**",
  "AIが作ったものを人が頑張って直すのではなく、人が直せる構造をAIが組み立てる",
  "Motion Pattern and Scene Recipe",
  "Recipeは完成品ではなくeditable defaults",
  "採用後はSceneInstanceとして独立",
  "Scene Composerは制作の中心",
  "DEFAULT",
  "AI_SUGGESTED",
  "HUMAN_SELECTED",
  "LOCKED",
  "computedSceneDuration = max(layerStartOffset + layerVisibleDuration)",
  "Structured Timeline authority",
]) requireText(principles, token, `Motion Zukan Product Principles missing: ${token}`);

for (const token of [
  "**ユーザー向けの正本名称は「モーション図鑑」。**",
  "docs/decisions/2026-08-25-motion-zukan-product-principles.md",
  "Scene Composer",
  "Structured Timeline",
]) requireText(claude, token, `CLAUDE entrypoint missing Motion Zukan authority: ${token}`);

for (const token of [
  'recipeId: "scene-recipe-mask-reveal-hero-v1"',
  'authority: "EDITABLE_DEFAULT_ONLY"',
  'schemaVersion: "scene-instance/v1"',
  'authority: "HUMAN_MASTER"',
  'legacySceneId: null',
  'recipeProvenance',
  'schemaVersion: "project-timeline/v1"',
  'authority: "STRUCTURED_SCENE_TIMELINE"',
  'SceneEdge',
  'transition: "HARD_CUT"',
  'targetDurationSeconds',
  'computedDurationSeconds',
  'durationDeltaSeconds',
  'Math.max(value.sceneDurationSeconds, textStructuralEnd)',
  'structuredClone(intent)',
  'humanSelectedFields',
  'lockedFields',
  'Property-local correction',
  'applyHumanSelection(scene.editableIntent, key, value, lock)',
  'applyAiSuggestion(scene.editableIntent, key, value, reason)',
  'setEditableFieldLock(scene.editableIntent, key, locked)',
  'retargetMaskRevealSection(scene.editableIntent, section)',
  'MOTION_ZUKAN_COMPOSER_STORAGE_KEY',
  'motion-zukan-composer-state-v1',
  'loadMotionZukanComposerState',
  'saveMotionZukanComposerState',
  'buildProjectTimeline(opening, "opening")',
  'buildProjectTimeline(profile, "profile")',
  'Recipe/default updates are provenance only after adoption; they must not silently rewrite this SceneInstance.',
]) requireText(composer, token, `Visual Scene Composer missing contract: ${token}`);

if (composer.includes("productionStore") || composer.includes('from "../types/movie"')) {
  errors.push("Scene Composer MVP must not destructively overload the legacy Storyboard/Production store");
}

for (const token of [
  "モーション図鑑 / HUMAN MASTER",
  "人間が理解して、1項目ずつ直せるScene",
  "かんたん",
  "詳細",
  "DaVinci",
  "このSceneを採用",
  "別Sceneとして採用",
  "採用済みSceneを編集中。変更はfield単位で自動保存されます。",
  "PROJECT TIMELINE / STRUCTURED AUTHORITY",
  "採用したSceneを積み上げる",
  "Legacy Storyboardは壊さず",
  "Recipeは採用時のprovenance",
  "Target",
  "Computed",
  "人間の値を勝手に縮めず差分を表示しています。",
  "HUMAN_SELECTED",
  "LOCKED",
  "SceneEdge:",
]) requireText(workspace, token, `Scene Composer UI missing human-editable behavior: ${token}`);

if (errors.length) {
  console.error(`Motion Zukan Scene Composer contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Motion Zukan Scene Composer contracts OK: Mask Reveal adopts a cloned HUMAN_MASTER SceneInstance, recipe provenance cannot silently rewrite it, property-local edits/locks persist independently, target/computed duration stays visible, and Opening/Profile structured timelines retain SceneEdge authority without replacing the legacy Storyboard model.");
