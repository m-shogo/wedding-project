import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const data = fs.readFileSync(path.join(root, "src/data/motionZukanProductionWorkspace.ts"), "utf8");
const ui = fs.readFileSync(path.join(root, "src/components/MotionZukanProductionWorkspace.tsx"), "utf8");
const handoff = fs.readFileSync(path.join(root, "src/data/motionZukanWorkspaceHandoff.ts"), "utf8");
const handoffUi = fs.readFileSync(path.join(root, "src/components/MotionZukanWorkspaceHandoffPanel.tsx"), "utf8");
const assignmentData = fs.readFileSync(path.join(root, "src/data/weddingProjectMotionAssignments.ts"), "utf8");
const handoffPage = fs.readFileSync(path.join(root, "src/pages/MotionZukanWorkspaceHandoff.tsx"), "utf8");
const nextGate = fs.readFileSync(path.join(root, "src/data/weddingProductionNextGate.ts"), "utf8");
const nextGateUi = fs.readFileSync(path.join(root, "src/components/WeddingProductionNextGatePanel.tsx"), "utf8");
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
  "applyDemoStockMediaPack",
  "assignDemoAssetsToEmptyScenes",
  "removeDemoStockMediaPack",
  "buildMotionZukanProductionHandoff",
  "parseMotionZukanProductionHandoff",
  'schemaVersion: "motion-zukan-production-handoff/v1"',
  "demoBgmSelection",
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
  "DEMO BGM CANDIDATE",
  "空Sceneへ仮配置",
  "デモ素材を外す",
  "素材未設定",
  "previewIsPlaceholder",
  "制作状態JSONを書き出す",
  "制作状態JSONを読み込む",
  "読込拒否",
  "外部Production Gate",
  "最終公開は未承認",
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
  "projectMotionAssignments",
  "validProjectMotionAssignments",
  'item.assignedBy === "HUMAN_MASTER"',
  'externalProductionGateEvaluated: false',
  'remotionStudioGuiActual: "NOT_RUN"',
  'macDaVinciGuiActual: "NOT_RUN"',
  'finalDeliveryApproved: false',
  'scene.authority === "HUMAN_MASTER"',
  'timeline.authority === "STRUCTURED_SCENE_TIMELINE"',
]) requireText(handoff, token, `Workspace handoff authority contract missing: ${token}`);

for (const token of [
  'schemaVersion: "wedding-project-motion-assignments/v1"',
  'assignedBy: "HUMAN_MASTER"',
  "saveWeddingProjectMotionAssignments",
]) requireText(assignmentData, token, `Project motion assignment contract missing: ${token}`);

for (const token of [
  "Human workspace JSONを書き出す",
  "Human workspace JSONを読み込む",
  "buildMotionZukanWorkspaceHandoff",
  "parseMotionZukanWorkspaceHandoff",
  "loadWeddingProjectMotionAssignments",
  "saveWeddingProjectMotionAssignments",
  "saveMotionZukanComposerState",
  "saveMotionZukanProductionWorkspaceState",
  "window.confirm",
  "Remotion Studio GUI Actual",
  "Mac DaVinci GUI Actual",
  "NOT_RUN",
]) requireText(handoffUi, token, `Workspace handoff UI contract missing: ${token}`);

for (const token of [
  'openingProductionStatus',
  'profileProductionStatus',
  'WeddingNextActionKind = "COMMAND" | "HUMAN" | "INPUT_REQUIRED"',
  'INPUT_REQUIRED',
  'DASHBOARD_NEXT_GATE != ACTION_EXECUTED',
  'REMOTION_STUDIO_GUI_ACTUAL_REMAINS_NOT_RUN_WITHOUT_REAL_GUI_EVIDENCE',
  'MAC_DAVINCI_GUI_ACTUAL_REMAINS_NOT_RUN_WITHOUT_REAL_GUI_EVIDENCE',
  'finalDeliveryApprovedByThisSurface: false',
]) requireText(nextGate, token, `Wedding production next-gate dashboard contract missing: ${token}`);

for (const token of [
  "PRODUCTION NEXT GATE / MOTION STUDIO AUTHORITY",
  "EXACT NEXT ACTION",
  "INPUT_REQUIRED",
  "ProductionMediaIntakeCliGuide",
  "Remotion Studio GUI Actual",
  "Mac DaVinci GUI Actual",
  "NOT_RUN",
  "DASHBOARD_NEXT_GATE != ACTION_EXECUTED",
]) requireText(nextGateUi, token, `Wedding production next-gate UI contract missing: ${token}`);

for (const token of [
  "duplicateSceneInstance",
  "reorderProjectTimelineScenes",
  "MOTION_ZUKAN_COMPOSER_CHANGED_EVENT",
  "CustomEvent",
]) requireText(composer, token, `Composer integration contract missing: ${token}`);

requireText(page, "<MotionZukanProductionWorkspace />", "VisualMotionLibrary must mount the production workspace");
requireText(handoffPage, "<MotionZukanWorkspaceHandoffPanel />", "Workspace handoff page must mount the handoff panel");
requireText(handoffPage, "<WeddingProductionNextGatePanel />", "Workspace handoff page must mount the production next-gate panel");
requireText(app, 'path="movie-coach/motion-workspace-handoff"', "App must expose the Motion Zukan workspace handoff route");

if (ui.includes("AI score") || ui.includes("自動修正")) {
  errors.push("Production workspace must not present AI scoring or automatic correction as authority");
}
if (/macDaVinciGuiActual:\s*"(PASS|VERIFIED|CURRENT)"/.test(handoff) || /remotionStudioGuiActual:\s*"(PASS|VERIFIED|CURRENT)"/.test(handoff)) {
  errors.push("Workspace handoff must never fabricate GUI Actual evidence");
}
if (/macDaVinciGuiActual:\s*"(PASS|VERIFIED|CURRENT)"/.test(nextGate) || /remotionStudioGuiActual:\s*"(PASS|VERIFIED|CURRENT)"/.test(nextGate)) {
  errors.push("Production next-gate dashboard must never fabricate GUI Actual evidence");
}

if (errors.length) {
  console.error(`Motion Zukan Production Workspace contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Motion Zukan Production Workspace contracts OK: Human Master workspace handoff preserves project motion assignments while keeping Production/GUI Actual evidence fail-closed; the dashboard next gate remains generated Motion Studio authority.");