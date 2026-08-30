import { readFile } from "node:fs/promises";

const data = await readFile(new URL("../src/data/weddingSceneMotionProductionHandoff.ts", import.meta.url), "utf8");
const card = await readFile(new URL("../src/components/WeddingSceneMotionProductionHandoffCard.tsx", import.meta.url), "utf8");
const host = await readFile(new URL("../src/components/MaskRevealSceneHandoffCard.tsx", import.meta.url), "utf8");
const assignments = await readFile(new URL("../src/data/weddingProjectMotionAssignments.ts", import.meta.url), "utf8");
const failures = [];
const requireText = (source, token, label) => {
  if (!source.includes(token)) failures.push(`${label}: missing ${JSON.stringify(token)}`);
};
const forbidText = (source, token, label) => {
  if (source.includes(token)) failures.push(`${label}: forbidden ${JSON.stringify(token)}`);
};

for (const token of [
  'schemaVersion: "wedding-scene-motion-production-handoff/v1"',
  'authority: "DERIVED_FROM_HUMAN_SCENE_ASSIGNMENTS"',
  'assignment.projectId === scene.projectId && assignment.sceneId === scene.sceneId',
  'palmierIntent: "ROUGH_ASSEMBLY_REFERENCE"',
  'davinciIntent: "FINAL_REBUILD_OR_NATIVE_APPLICATION_REFERENCE"',
  'handoffReferenceReady: sceneAssignments.length > 0 && blockers.length === 0',
  'productionReady: false',
  'remotionStudioGuiActual: "NOT_RUN"',
  'macDaVinciGuiActual: "NOT_RUN"',
  "SCENE_MOTION_USAGE_NOT_FOUND",
  "SCENE_MOTION_IMPLEMENTATION_NOT_VERIFIED",
  "SCENE_MOTION_PREVIEW_NOT_VERIFIED",
]) requireText(data, token, "scene motion handoff authority");

for (const token of [
  "MOTION ZUKAN → PALMIER ROUGH → DAVINCI FINAL",
  "Motion sidecarをコピー",
  "JSONを書き出す",
  "project fitや図鑑掲載だけでは自動割当しません",
  "Motion sidecar export ≠ Palmier/DaVinciで適用済み",
  "Remotion Studio GUI Actual = NOT_RUN",
  "Mac DaVinci GUI Actual = NOT_RUN",
]) requireText(card, token, "scene motion handoff UI");

requireText(host, '<WeddingSceneMotionProductionHandoffCard scene={scene} />', "Scene handoff host mount");
requireText(assignments, 'assignedBy: "HUMAN_MASTER"', "Human assignment provenance");
forbidText(data, 'productionReady: true', "handoff must not claim production ready");
forbidText(data, 'remotionStudioGuiActual: "PASS"', "Remotion Studio Actual fabrication");
forbidText(data, 'macDaVinciGuiActual: "PASS"', "Mac DaVinci Actual fabrication");
forbidText(data, 'assignedBy: "AUTO"', "automatic assignment forbidden");

if (failures.length) {
  console.error("Wedding Scene Motion Production Handoff contracts FAILED");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("Wedding Scene Motion Production Handoff contracts PASS");
console.log("Scene-bound HUMAN_MASTER motion intent can travel as a Palmier rough / DaVinci final reference without promoting GUI Actual or production readiness.");
