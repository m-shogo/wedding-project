import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const data = fs.readFileSync(path.join(root, "src/data/visualMotionLibrary.ts"), "utf8");
const handoff = fs.readFileSync(path.join(root, "src/data/maskRevealHandoff.ts"), "utf8");
const editable = fs.readFileSync(path.join(root, "src/data/humanEditableMotionIntent.ts"), "utf8");
const production = fs.readFileSync(path.join(root, "src/data/maskRevealEditableProduction.ts"), "utf8");
const workspace = fs.readFileSync(path.join(root, "src/components/MaskRevealEditableWorkspace.tsx"), "utf8");
const samples = fs.readFileSync(path.join(root, "src/data/motionSampleAssetSets.ts"), "utf8");
const learning = fs.readFileSync(path.join(root, "src/data/motionLearningLinks.ts"), "utf8");
const previewEvidence = fs.readFileSync(path.join(root, "src/data/motionPreviewEvidence.ts"), "utf8");
const fusionLearning = fs.readFileSync(path.join(root, "src/data/fusionNodeTranslator.ts"), "utf8");
const page = fs.readFileSync(path.join(root, "src/pages/VisualMotionLibrary.tsx"), "utf8");
const app = fs.readFileSync(path.join(root, "src/App.tsx"), "utf8");
const sidebar = fs.readFileSync(path.join(root, "src/components/Sidebar.tsx"), "utf8");
const errors = [];

function requireText(source, token, message) {
  if (!source.includes(token)) errors.push(message);
}

for (const token of [
  'id: "type-mask-reveal"',
  'legacyPresetIds: ["type-mask-slide"]',
  'japaneseName: "マスクから文字がスッと現れる"',
  '"文字 下からシュッ"',
  '"PALMIER_TIMING_ONLY"',
  '"DAVINCI_TEXT_PLUS"',
  'status: "AVAILABLE"',
  'verified: false',
  'sourceType: "REPO_GENERATED"',
  'status: "CONCEPT"',
  'sampleAssetSetId: "sample-typography-welcome-v1"',
  'searchedExistingPatterns: true',
  'searchedDaVinciBuiltins: true',
  'searchedExternalSources: true',
  'whyExistingOptionsFail',
  'whyNewPatternIsNeeded',
  'buildMaskRevealPromptOutputs',
  'humanBrief',
  'claudeCreativeInstruction',
  'palmierInstruction',
  'davinciFinishManifest',
  'machineJson',
]) {
  requireText(data, token, `Visual Motion data missing contract token: ${token}`);
}

for (const token of [
  'schemaVersion: "motion-handoff/v1"',
  'expectedFormat: "NLE_XML"',
  'xmlGeneratedExternally: true',
  'companionFileName: "palmier-mask-reveal-timeline.xml"',
  'markerIdFor',
  '`VML_MASK_REVEAL_${section}`',
  'buildMaskRevealExecutionOutputs',
  'nleXmlHandoff',
  'verificationChecklist',
  'implementationId: "impl-type-mask-reveal-davinci-text-plus"',
  '"opened-in-davinci"',
  '"render-tested"',
  '"visual-QA"',
  '"resolve-version-recorded"',
  'canonicalTarget: "ACTUAL_DAVINCI_RENDER"',
  'productionReady: false',
  'schemaVersion: "motion-verification/v1"',
  'sampleAssetSetId: "sample-typography-welcome-v1"',
  'status: "PENDING_LOCAL_DAVINCI"',
  'targetPreviewSourceType: "ACTUAL_DAVINCI_RENDER"',
  'candidatePreviewAssetPath: null',
  'renderSha256: null',
  'visualQa1x: false',
  'visualQaHalfSpeed: false',
  'sampleAssetSetMatched: false',
  'conceptPreviewKeptSeparate: false',
  'false/nullの未確認項目が残る間はProduction Readyへ昇格しない',
]) {
  requireText(handoff, token, `Mask Reveal handoff missing contract token: ${token}`);
}

for (const token of [
  'schemaVersion: "human-editable-motion/v1"',
  '"DEFAULT" | "AI_SUGGESTED" | "HUMAN_SELECTED" | "LOCKED"',
  'sceneDurationSeconds',
  'layerDelaySeconds',
  'motionDelaySeconds',
  'enterMotion',
  'enterDurationSeconds',
  'holdMotion',
  'holdDurationSeconds',
  'exitMotion',
  'exitDurationSeconds',
  'staggerDelaySeconds',
  'positionPreset',
  'positionXPercent',
  'positionYPercent',
  'positionOffsetXPercent',
  'positionOffsetYPercent',
  'direction',
  'distancePercent',
  'scaleFromPercent',
  'scaleToPercent',
  'cropFocus',
  'intensity',
  'humanSelectedValue',
  'locked: boolean',
  'resolveEditableValue',
  'if (value.locked) return "LOCKED"',
  'if (current.locked) return intent',
  'applyHumanSelection',
  'setEditableFieldLock',
  'retargetMaskRevealSection',
  'resolveMaskRevealEditableIntent',
]) {
  requireText(editable, token, `Human-editable Mask Reveal model missing: ${token}`);
}

for (const token of [
  'authority: "HUMAN_MASTER"',
  'HUMAN_SELECTED / LOCKED must never be silently overwritten',
  'Scene Duration',
  'Layer Delay',
  'Motion Delay',
  'Motion Duration',
  'Hold',
  'Stagger Delay',
  'Position Offset X',
  'Direction',
  'Distance',
  'Scale From',
  'Crop / Focus',
  'HUMAN MASTER AUTHORITY',
  'HUMAN LOCKED',
  'HUMAN SELECTED',
  'AI MAY ADJUST',
  'If a locked value makes the scene invalid, report the conflict. Do not replace it.',
  'PALMIER ROUGH / HUMAN MASTER AUTHORITY',
  'intended value, applied value, and delta',
  'DAVINCI FINAL / HUMAN MASTER AUTHORITY',
  'Actual render is implementation evidence, not the source of truth.',
  'schemaVersion: "motion-handoff/v2-human-editable"',
  'palmierDeltaEvidence',
  'appliedValue: null',
  'difference: null',
]) {
  requireText(production, token, `Human-editable production bridge missing: ${token}`);
}

for (const token of [
  'HUMAN MASTER / EDITABLE SOURCE OF TRUTH',
  'かんたん',
  '詳細',
  'DaVinci',
  'AI Suggested:',
  'Reason:',
  'Human Selected:',
  'LOCKED 🔒',
  'Scene Duration',
  'Layer Delay',
  'Motion Delay',
  'Motion Duration',
  'Hold',
  'Stagger Delay',
  'Distance',
  'Scale From',
  'AI指示を作る',
  'Human Brief',
  'Claude Creative Instruction',
  'Palmier Instruction',
  'NLE XML Handoff',
  'DaVinci Finish Manifest',
  'Verification Checklist',
  'Editable Source of Truth JSON',
  'Machine JSON',
  'Motion Handoff Manifest JSON',
  'NLE XML',
  'XMLをこのアプリ側で捏造しません',
  'navigator.clipboard.writeText',
  'buildMaskRevealExecutionOutputs',
]) {
  requireText(workspace, token, `Human-editable workspace missing: ${token}`);
}

for (const token of [
  'id: "sample-typography-welcome-v1"',
  'category: "TYPOGRAPHY"',
  'canonicalText: ["WELCOME"]',
  'width: 1280',
  'height: 720',
  'fps: 30',
  'durationSeconds: 4',
  'muted: true',
  'loopTarget: true',
  'kind: "PROCEDURAL_NEUTRAL_BACKGROUND"',
  'usedByPatternIds: ["type-mask-reveal"]',
  'usedByPreviewIds: ["preview-type-mask-reveal-repo-concept"]',
  'status: "READY"',
]) {
  requireText(samples, token, `Motion sample asset set missing contract token: ${token}`);
}

for (const token of [
  'patternId: "type-mask-reveal"',
  'fusionRecipeIds: ["fusion-masked-reveal"]',
  'learningTopics: ["Mask", "Text+", "Keyframe", "Easing", "Merge"]',
  'getMotionLearningBundle',
  'fusionLearningRecipes.find',
  'Do not duplicate tutorials here',
]) {
  requireText(learning, token, `Motion learning link missing reuse contract token: ${token}`);
}
requireText(fusionLearning, 'recipeId: "fusion-masked-reveal"', "Existing Fusion masked reveal recipe must remain the learning authority");

for (const token of [
  'id: "evidence-type-mask-reveal-concept-2026-08-25"',
  'previewId: "preview-type-mask-reveal-repo-concept"',
  'classification: "CONCEPT"',
  'sourceType: "REPO_GENERATED"',
  'workflowRunId: 32847587754',
  'artifactDigest: "sha256:7c2c1f8777311d9fe5e30b05dd6e57da5d8f1b8eb2971521fa277b1bb1f35b6e"',
  'artifactExpiresAt: "2026-09-01T12:28:01Z"',
  'persistentAssetPath: null',
  'frames: 120',
  'ffprobeVerified: true',
  'renderedPixelOracle: true',
  'result: "PASS"',
  'productionAuthority: false',
  'DaVinci Actual / local Resolve verificationとは完全に別扱い',
]) {
  requireText(previewEvidence, token, `Mask Reveal Concept evidence missing provenance token: ${token}`);
}

if (/status:\s*"PRODUCTION_READY"/.test(data)) {
  errors.push("Mask Reveal must not be PRODUCTION_READY before local Resolve render verification");
}
if (/sourceType:\s*"ACTUAL_DAVINCI_RENDER"/.test(data)) {
  errors.push("Mask Reveal must not claim ACTUAL_DAVINCI_RENDER before real local render evidence exists");
}
if (/resolveVersion:\s*"[^\"]+"/.test(data)) {
  errors.push("Resolve version must stay null until a locally tested version is recorded");
}
if (/resolveVersion:\s*"[^\"]+"/.test(handoff)) {
  errors.push("Motion handoff must not invent a Resolve version before local verification");
}
if (/productionReady:\s*true/.test(handoff)) {
  errors.push("Motion handoff verification evidence must remain productionReady=false until every local DaVinci gate is proven");
}
if (/productionAuthority:\s*true/.test(previewEvidence)) {
  errors.push("Repository-generated Concept evidence must never become production authority");
}
if (handoff.includes("MOTION:type-mask-reveal") || page.includes("MOTION:type-mask-reveal")) {
  errors.push("Generic Mask Reveal marker must not reappear; use the section-aware VML_MASK_REVEAL_<SECTION> authority");
}

for (const token of [
  "Mask Reveal 1件を、Actual Renderだけでなく「後から直せる構造」まで通す",
  "人間が理解できるScene Duration / Delay / Hold / Position / Direction等を正本",
  "MaskRevealEditableWorkspace",
  "CONCEPT PREVIEW / 実装確認前",
  "JUST-IN-TIME LEARNING",
  "この演出で学べること",
  "getMotionLearningBundle(pattern.id)",
  "learning.fusionRecipes.map",
  "getLatestPreviewEvidence(preview.id)",
  "CONCEPT RENDER QA ✓ / NOT DAVINCI ACTUAL",
  "期限付きartifactで検証済み。永続MP4がないため、この画面では静止placeholderのまま。",
]) {
  requireText(page, token, `Visual Motion page missing: ${token}`);
}

requireText(app, 'path="movie-coach/motion-library"', "Visual Motion Library route missing");
requireText(sidebar, 'to: "/movie-coach/motion-library"', "Visual Motion Library navigation missing");
requireText(sidebar, 'label: "動きを見て探す"', "Visual Motion Library must use beginner-first navigation label");

if (errors.length) {
  console.error(`Visual Motion Library contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Visual Motion Library contracts OK: legacy Palmier XML / Actual DaVinci gates remain intact while HUMAN_MASTER editable intent becomes the production source of truth; property-level selections/locks survive Prompt/Palmier/DaVinci handoff and renders remain evidence only.");
