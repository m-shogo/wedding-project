import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const data = read("src/data/visualMotionLibrary.ts");
const handoff = read("src/data/maskRevealHandoff.ts");
const editable = read("src/data/humanEditableMotionIntent.ts");
const production = read("src/data/maskRevealEditableProduction.ts");
const workspace = read("src/components/MaskRevealEditableWorkspace.tsx");
const samples = read("src/data/motionSampleAssetSets.ts");
const learning = read("src/data/motionLearningLinks.ts");
const previewEvidence = read("src/data/motionPreviewEvidence.ts");
const fusionLearning = read("src/data/fusionNodeTranslator.ts");
const page = read("src/pages/VisualMotionLibrary.tsx");
const app = read("src/App.tsx");
const sidebar = read("src/components/Sidebar.tsx");
const errors = [];

function requireAll(source, tokens, prefix) {
  for (const token of tokens) if (!source.includes(token)) errors.push(`${prefix}: ${token}`);
}

requireAll(data, [
  'id: "type-mask-reveal"', 'legacyPresetIds: ["type-mask-slide"]', 'japaneseName: "マスクから文字がスッと現れる"',
  '"文字 下からシュッ"', '"PALMIER_TIMING_ONLY"', '"DAVINCI_TEXT_PLUS"', 'status: "AVAILABLE"', 'verified: false',
  'sourceType: "REPO_GENERATED"', 'status: "CONCEPT"', 'sampleAssetSetId: "sample-typography-welcome-v1"',
  'searchedExistingPatterns: true', 'searchedDaVinciBuiltins: true', 'searchedExternalSources: true',
  'whyExistingOptionsFail', 'whyNewPatternIsNeeded', 'buildMaskRevealPromptOutputs', 'humanBrief',
  'claudeCreativeInstruction', 'palmierInstruction', 'davinciFinishManifest', 'machineJson',
], "Visual Motion data missing contract token");

requireAll(handoff, [
  'schemaVersion: "motion-handoff/v1"', 'expectedFormat: "NLE_XML"', 'xmlGeneratedExternally: true',
  'companionFileName: "palmier-mask-reveal-timeline.xml"', 'markerIdFor', '`VML_MASK_REVEAL_${section}`',
  'buildMaskRevealExecutionOutputs', 'nleXmlHandoff', 'verificationChecklist',
  'implementationId: "impl-type-mask-reveal-davinci-text-plus"', '"opened-in-davinci"', '"render-tested"',
  '"visual-QA"', '"resolve-version-recorded"', 'canonicalTarget: "ACTUAL_DAVINCI_RENDER"', 'productionReady: false',
  'schemaVersion: "motion-verification/v1"', 'sampleAssetSetId: "sample-typography-welcome-v1"',
  'status: "PENDING_LOCAL_DAVINCI"', 'targetPreviewSourceType: "ACTUAL_DAVINCI_RENDER"',
  'candidatePreviewAssetPath: null', 'renderSha256: null', 'visualQa1x: false', 'visualQaHalfSpeed: false',
  'sampleAssetSetMatched: false', 'conceptPreviewKeptSeparate: false', 'false/nullの未確認項目が残る間はProduction Readyへ昇格しない',
], "Mask Reveal handoff missing contract token");

requireAll(editable, [
  'schemaVersion: "human-editable-motion/v1"', '"DEFAULT" | "AI_SUGGESTED" | "HUMAN_SELECTED" | "LOCKED"',
  'sceneDurationSeconds', 'layerDelaySeconds', 'motionDelaySeconds', 'enterMotion', 'enterDurationSeconds', 'holdMotion',
  'holdDurationSeconds', 'exitMotion', 'exitDurationSeconds', 'staggerDelaySeconds', 'positionPreset', 'positionXPercent',
  'positionYPercent', 'positionOffsetXPercent', 'positionOffsetYPercent', 'direction', 'distancePercent', 'scaleFromPercent',
  'scaleToPercent', 'cropFocus', 'intensity', 'humanSelectedValue', 'locked: boolean', 'resolveEditableValue',
  'if (value.locked) return "LOCKED"', 'if (current.locked) return intent', 'applyHumanSelection', 'setEditableFieldLock',
  'retargetMaskRevealSection', 'resolveMaskRevealEditableIntent',
], "Human-editable Mask Reveal model missing");

requireAll(production, [
  'authority: "HUMAN_MASTER"', 'HUMAN_SELECTED / LOCKED must never be silently overwritten', 'Scene Duration', 'Layer Delay',
  'Motion Delay', 'Motion Duration', 'Hold', 'Stagger Delay', 'Position Offset X', 'Direction', 'Distance', 'Scale From',
  'Crop / Focus', 'HUMAN MASTER AUTHORITY', 'HUMAN LOCKED', 'HUMAN SELECTED', 'AI MAY ADJUST',
  'If a locked value makes the scene invalid, report the conflict. Do not replace it.',
  'PALMIER ROUGH / HUMAN MASTER AUTHORITY', 'intended value, applied value, and delta',
  'DAVINCI FINAL / HUMAN MASTER AUTHORITY', 'Actual render is implementation evidence, not the source of truth.',
  'schemaVersion: "motion-handoff/v2-human-editable"', 'palmierDeltaEvidence', 'appliedValue: null', 'difference: null',
], "Human-editable production bridge missing");

requireAll(workspace, [
  'モーション図鑑 / HUMAN MASTER', 'かんたん', '詳細', 'DaVinci', 'AI Suggested:', 'Reason:', 'Human Selected:', 'LOCKED 🔒',
  'Scene Duration', 'Layer Delay', 'Motion Delay', 'Motion Duration', 'Hold', 'Stagger Delay', 'Distance', 'Scale From',
  'AI指示を作る', 'Human Brief', 'Claude Creative Instruction', 'Palmier Instruction', 'NLE XML Handoff',
  'DaVinci Finish Manifest', 'Verification Checklist', 'Editable Scene Serialization (JSON)', 'Machine JSON',
  'Motion Handoff Manifest JSON', 'NLE XML', 'XMLをこのアプリ側で捏造しません', 'navigator.clipboard.writeText',
  'buildMaskRevealExecutionOutputs',
], "Human-editable workspace missing");

requireAll(samples, [
  'id: "sample-typography-welcome-v1"', 'category: "TYPOGRAPHY"', 'canonicalText: ["WELCOME"]', 'width: 1280',
  'height: 720', 'fps: 30', 'durationSeconds: 4', 'muted: true', 'loopTarget: true',
  'kind: "PROCEDURAL_NEUTRAL_BACKGROUND"', 'usedByPatternIds: ["type-mask-reveal"]',
  'usedByPreviewIds: ["preview-type-mask-reveal-repo-concept"]', 'status: "READY"',
], "Motion sample asset set missing contract token");

requireAll(learning, [
  'patternId: "type-mask-reveal"', 'fusionRecipeIds: ["fusion-masked-reveal"]',
  'learningTopics: ["Mask", "Text+", "Keyframe", "Easing", "Merge"]', 'getMotionLearningBundle',
  'fusionLearningRecipes.find', 'Do not duplicate tutorials here',
], "Motion learning link missing reuse contract token");
if (!fusionLearning.includes('recipeId: "fusion-masked-reveal"')) errors.push("Existing Fusion masked reveal recipe must remain the learning authority");

requireAll(previewEvidence, [
  'id: "evidence-type-mask-reveal-concept-2026-08-25"', 'previewId: "preview-type-mask-reveal-repo-concept"',
  'classification: "CONCEPT"', 'sourceType: "REPO_GENERATED"', 'workflowRunId: 32847587754',
  'artifactDigest: "sha256:7c2c1f8777311d9fe5e30b05dd6e57da5d8f1b8eb2971521fa277b1bb1f35b6e"',
  'artifactExpiresAt: "2026-09-01T12:28:01Z"', 'persistentAssetPath: null', 'frames: 120', 'ffprobeVerified: true',
  'renderedPixelOracle: true', 'result: "PASS"', 'productionAuthority: false', 'DaVinci Actual / local Resolve verificationとは完全に別扱い',
], "Mask Reveal Concept evidence missing provenance token");

if (/status:\s*"PRODUCTION_READY"/.test(data)) errors.push("Mask Reveal must not be PRODUCTION_READY before local Resolve render verification");
if (/sourceType:\s*"ACTUAL_DAVINCI_RENDER"/.test(data)) errors.push("Mask Reveal must not claim ACTUAL_DAVINCI_RENDER before real local render evidence exists");
if (/resolveVersion:\s*"[^\"]+"/.test(data)) errors.push("Resolve version must stay null until a locally tested version is recorded");
if (/resolveVersion:\s*"[^\"]+"/.test(handoff)) errors.push("Motion handoff must not invent a Resolve version before local verification");
if (/productionReady:\s*true/.test(handoff)) errors.push("Motion handoff verification evidence must remain productionReady=false until every local DaVinci gate is proven");
if (/productionAuthority:\s*true/.test(previewEvidence)) errors.push("Repository-generated Concept evidence must never become production authority");
if (handoff.includes("MOTION:type-mask-reveal") || page.includes("MOTION:type-mask-reveal")) errors.push("Generic Mask Reveal marker must not reappear; use the section-aware VML_MASK_REVEAL_<SECTION> authority");
if (workspace.includes('label="Editable Source of Truth JSON"')) errors.push("JSON serialization must not be presented to the user as the Source of Truth");

requireAll(page, [
  'Mask Reveal 1件を、Actual Renderだけでなく「後から直せる構造」まで通す',
  '人間が理解できるScene Duration / Delay / Hold / Position / Direction等を正本', 'MaskRevealEditableWorkspace',
  'CONCEPT PREVIEW / 実装確認前', 'JUST-IN-TIME LEARNING', 'この演出で学べること', 'getMotionLearningBundle(pattern.id)',
  'learning.fusionRecipes.map', 'getLatestPreviewEvidence(preview.id)', 'CONCEPT RENDER QA ✓ / NOT DAVINCI ACTUAL',
  '期限付きartifactで検証済み。永続MP4がないため、この画面では静止placeholderのまま。',
], "Visual Motion page missing");

if (!app.includes('path="movie-coach/motion-library"')) errors.push("Visual Motion Library route missing");
if (!sidebar.includes('to: "/movie-coach/motion-library"')) errors.push("Visual Motion Library navigation missing");
if (!sidebar.includes('label: "動きを見て探す"')) errors.push("Visual Motion Library must use beginner-first navigation label");

if (errors.length) {
  console.error(`Visual Motion Library contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Visual Motion Library contracts OK: Palmier XML / Actual DaVinci / Concept gates remain intact; human-readable editable Scene values stay the source of truth; JSON is serialization only; property-level Human Selected/Locked authority survives handoff.");
