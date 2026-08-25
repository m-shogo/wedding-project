import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const data = fs.readFileSync(path.join(root, "src/data/motionZukanProductionWorkspace.ts"), "utf8");
const ui = fs.readFileSync(path.join(root, "src/components/MotionZukanProductionWorkspace.tsx"), "utf8");
const composer = fs.readFileSync(path.join(root, "src/data/visualSceneComposer.ts"), "utf8");
const page = fs.readFileSync(path.join(root, "src/pages/VisualMotionLibrary.tsx"), "utf8");
const errors = [];

function requireText(source, token, message) {
  if (!source.includes(token)) errors.push(message);
}

for (const token of [
  'schemaVersion: "motion-zukan-production-workspace/v1"',
  "MotionZukanMediaAsset",
  "placeholder",
  "SceneProductionMeta",
  "SceneWorkflowStatus",
  "MusicStructureMarker",
  "ProjectDesignSettings",
  "ProjectVersionSnapshot",
  "getDuplicateAssetUsage",
  "getFinalChecks",
  "saveProjectVersion",
  "restoreWorkspaceFromVersion",
  "MOTION_ZUKAN_PRODUCTION_WORKSPACE_STORAGE_KEY",
]) requireText(data, token, `Production workspace data contract missing: ${token}`);

for (const token of [
  "素材BOX",
  "同じ素材を複数Sceneで使用中",
  "Sceneメモ",
  "完成状態",
  "Sceneを複製",
  "Undo",
  "Redo",
  "曲の構成ガイド",
  "全体デザイン設定",
  "PROJECT VERSION",
  "FINAL CHECK",
  "DndContext",
  "SortableContext",
  "toggleSceneAssetAssignment",
  "HUMAN_SELECTED",
  "LOCKED",
]) requireText(ui, token, `Production workspace UI contract missing: ${token}`);

for (const token of [
  "duplicateSceneInstance",
  "reorderProjectTimelineScenes",
  "MOTION_ZUKAN_COMPOSER_CHANGED_EVENT",
  "CustomEvent",
]) requireText(composer, token, `Composer integration contract missing: ${token}`);

requireText(page, "<MotionZukanProductionWorkspace />", "VisualMotionLibrary must mount the production workspace");

if (ui.includes("AI score") || ui.includes("自動修正")) {
  errors.push("Production workspace must not present AI scoring or automatic correction as authority");
}

if (errors.length) {
  console.error(`Motion Zukan Production Workspace contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Motion Zukan Production Workspace contracts OK: media references, placeholder tracking, usage history, duplicate warnings, scene notes/status, scene duplicate/reorder, undo/redo, music markers, project defaults, version snapshots and final checks are mounted without changing Human Master authority.");
