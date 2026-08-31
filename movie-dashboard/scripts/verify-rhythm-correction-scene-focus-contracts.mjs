import {readFileSync} from "node:fs";

const contract = readFileSync("movie-dashboard/src/data/motionZukanSceneFocus.ts", "utf8");
const operator = readFileSync("movie-dashboard/src/components/ProjectRhythmReviewOperator.tsx", "utf8");
const workspace = readFileSync("movie-dashboard/src/components/MotionZukanProductionWorkspace.tsx", "utf8");
const compare = readFileSync("movie-dashboard/src/components/TypographySceneBoundElementComparison.tsx", "utf8");

function requireText(source, text, label) {
  if (!source.includes(text)) throw new Error(`${label}: missing ${text}`);
}

requireText(contract, 'MOTION_ZUKAN_SCENE_FOCUS_REQUEST_EVENT', "focus contract");
requireText(contract, 'PROJECT_RHYTHM_CORRECTION_QUEUE', "focus contract requester");
requireText(contract, 'sourceRevision', "focus contract revision binding");
requireText(contract, 'SCENE_BOUND_A_B_COMPARE', "focus contract A/B surface");
requireText(contract, 'SCENE_TIMING_AND_A_B_COMPARE', "focus contract timing surface");

requireText(operator, 'requestMotionZukanSceneFocus({', "rhythm operator dispatch");
requireText(operator, 'sourceRevision: failure.sourceRevision', "rhythm operator revision");
requireText(operator, 'axis: failure.axis', "rhythm operator axis");
requireText(operator, 'surface: failure.returnTo', "rhythm operator target surface");
requireText(operator, 'data-rhythm-correction-focus-scene', "rhythm operator UI target");

requireText(workspace, 'window.addEventListener(MOTION_ZUKAN_SCENE_FOCUS_REQUEST_EVENT', "workspace listener");
requireText(workspace, 'isMotionZukanSceneFocusRequest(request)', "workspace request validation");
requireText(workspace, 'currentScene.updatedAt !== request.sourceRevision', "workspace stale rejection");
requireText(workspace, 'setProjectId(request.projectId)', "workspace project state");
requireText(workspace, 'setSelectedSceneId(request.sceneId)', "workspace Scene state");
requireText(workspace, 'data-motion-zukan-selected-scene={selectedScene.sceneId}', "workspace selected Scene target");
requireText(workspace, 'announceMotionZukanSceneFocusResolved(request)', "workspace resolved event");
requireText(compare, 'data-scene-bound-remotion-comparison={scene.sceneId}', "Scene-bound comparison target");

for (const forbidden of [
  'remotionStudioGuiActual: "PASS"',
  'palmierGuiActual: "PASS"',
  'macDaVinciGuiActual: "PASS"',
  'productionReady: true',
]) {
  if (contract.includes(forbidden) || operator.includes(forbidden) || workspace.includes(forbidden)) {
    throw new Error(`focus navigation must not promote evidence: ${forbidden}`);
  }
}

console.log("rhythm correction Scene focus contracts: OK");
