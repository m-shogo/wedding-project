import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const data = fs.readFileSync(path.join(root, "src/data/motionZukanProductionWorkspace.ts"), "utf8");
const ui = fs.readFileSync(path.join(root, "src/components/MotionZukanProductionWorkspace.tsx"), "utf8");
const handoff = fs.readFileSync(path.join(root, "src/data/motionZukanWorkspaceHandoff.ts"), "utf8");
const handoffUi = fs.readFileSync(path.join(root, "src/components/MotionZukanWorkspaceHandoffPanel.tsx"), "utf8");
const handoffPage = fs.readFileSync(path.join(root, "src/pages/MotionZukanWorkspaceHandoff.tsx"), "utf8");
const composer = fs.readFileSync(path.join(root, "src/data/visualSceneComposer.ts"), "utf8");
const page = fs.readFileSync(path.join(root, "src/pages/VisualMotionLibrary.tsx"), "utf8");
const app = fs.readFileSync(path.join(root, "src/App.tsx"), "utf8");
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
  'MOTION_ZUKAN_WORKSPACE_HANDOFF_SCHEMA = "motion-zukan-workspace-handoff/v1"',
  'MOTION_ZUKAN_WORKSPACE_HANDOFF_AUTHORITY = "HUMAN_MASTER_WORKSPACE_TRANSFER"',
  "buildMotionZukanWorkspaceHandoff",
  "parseMotionZukanWorkspaceHandoff",
  'externalProductionGateEvaluated: false',
  'remotionStudioGuiActual: "NOT_RUN"',
  'macDaVinciGuiActual: "NOT_RUN"',
  'finalDeliveryApproved: false',
  'scene.authority === "HUMAN_MASTER"',
  'timeline.authority === "STRUCTURED_SCENE_TIMELINE"',
]) requireText(handoff, token, `Workspace handoff authority contract missing: ${token}`);

for (const token of [
  "Human workspace JSONを書き出す",
  "Human workspace JSONを読み込む",
  "buildMotionZukanWorkspaceHandoff",
  "parseMotionZukanWorkspaceHandoff",
  "saveMotionZukanComposerState",
  "saveMotionZukanProductionWorkspaceState",
  "window.confirm",
  "Remotion Studio GUI Actual",
  "Mac DaVinci GUI Actual",
  "NOT_RUN",
]) requireText(handoffUi, token, `Workspace handoff UI contract missing: ${token}`);

for (const token of [
  "duplicateSceneInstance",
  "reorderProjectTimelineScenes",
  "MOTION_ZUKAN_COMPOSER_CHANGED_EVENT",
  "CustomEvent",
]) requireText(composer, token, `Composer integration contract missing: ${token}`);

requireText(page, "<MotionZukanProductionWorkspace />", "VisualMotionLibrary must mount the production workspace");
requireText(handoffPage, "<MotionZukanWorkspaceHandoffPanel />", "Workspace handoff page must mount the handoff panel");
requireText(app, 'path="movie-coach/motion-workspace-handoff"', "App must expose the Motion Zukan workspace handoff route");

if (ui.includes("AI score") || ui.includes("自動修正")) {
  errors.push("Production workspace must not present AI scoring or automatic correction as authority");
}
if (/macDaVinciGuiActual:\s*"(PASS|VERIFIED|CURRENT)"/.test(handoff) || /remotionStudioGuiActual:\s*"(PASS|VERIFIED|CURRENT)"/.test(handoff)) {
  errors.push("Workspace handoff must never fabricate GUI Actual evidence");
}

if (errors.length) {
  console.error(`Motion Zukan Production Workspace contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Motion Zukan Production Workspace contracts OK: media references, placeholder tracking, usage history, duplicate warnings, scene notes/status, scene duplicate/reorder, undo/redo, music markers, project defaults, version snapshots and final checks remain Human Master; workspace JSON handoff is schema/authority guarded and cannot promote Remotion Studio or Mac DaVinci GUI Actual.");
