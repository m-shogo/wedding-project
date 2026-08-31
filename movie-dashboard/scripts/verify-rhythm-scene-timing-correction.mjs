import {readFileSync} from "node:fs";

const timing = readFileSync("movie-dashboard/src/components/RhythmSceneTimingCorrectionCard.tsx", "utf8");
const handoff = readFileSync("movie-dashboard/src/components/MaskRevealSceneHandoffCard.tsx", "utf8");
const composer = readFileSync("movie-dashboard/src/data/visualSceneComposer.ts", "utf8");
const focus = readFileSync("movie-dashboard/src/data/motionZukanSceneFocus.ts", "utf8");

function requireText(source, text, label) {
  if (!source.includes(text)) throw new Error(`${label}: missing ${text}`);
}

requireText(timing, 'updateSceneInstanceField(composer, scene.sceneId, "sceneDurationSeconds"', "Human duration mutation");
requireText(timing, "currentScene.updatedAt !== scene.updatedAt", "stale Scene rejection");
requireText(timing, "saveMotionZukanComposerState(next)", "canonical composer save");
requireText(timing, "scene.durationDeltaSeconds", "structural timing overrun surface");
requireText(timing, "MOTION_ZUKAN_SCENE_FOCUS_RESOLVED_EVENT", "Rhythm correction focus bridge");
requireText(timing, 'request.axis !== "DURATION" && request.axis !== "PACING"', "DURATION/PACING scope");
requireText(timing, "data-rhythm-scene-timing-correction", "Human timing correction target");
requireText(timing, "旧route / Role / render / reelはstale", "stale downstream warning");
requireText(handoff, '<RhythmSceneTimingCorrectionCard scene={scene} />', "Handoff mount");
requireText(composer, "return rebuildTimelines", "timeline rebuild authority");
requireText(composer, "updatedAt", "Scene revision authority");
requireText(focus, '"DURATION" | "PACING"', "focus axis authority");

for (const forbidden of [
  'remotionStudioGuiActual: "PASS"',
  'palmierGuiActual: "PASS"',
  'macDaVinciGuiActual: "PASS"',
  'productionReady: true',
]) {
  if (timing.includes(forbidden)) throw new Error(`timing correction must not promote evidence: ${forbidden}`);
}

console.log("Human Rhythm Scene timing correction contracts: OK");
