import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const data = fs.readFileSync(path.join(root, "src/data/visualMotionLibrary.ts"), "utf8");
const handoff = fs.readFileSync(path.join(root, "src/data/maskRevealHandoff.ts"), "utf8");
const samples = fs.readFileSync(path.join(root, "src/data/motionSampleAssetSets.ts"), "utf8");
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
]) {
  requireText(handoff, token, `Mask Reveal handoff missing contract token: ${token}`);
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
if (handoff.includes("MOTION:type-mask-reveal") || page.includes("MOTION:type-mask-reveal")) {
  errors.push("Generic Mask Reveal marker must not reappear; use the section-aware VML_MASK_REVEAL_<SECTION> authority");
}

for (const token of [
  "CONCEPT PREVIEW / 実装確認前",
  "AI指示を作る",
  "Human Brief",
  "Claude Creative Instruction",
  "Palmier Instruction",
  "NLE XML Handoff",
  "DaVinci Finish Manifest",
  "Verification Checklist",
  "Machine JSON",
  "Motion Handoff Manifest JSON",
  "NLE XML",
  "XMLをこのアプリ側で捏造しません",
  "navigator.clipboard.writeText",
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

console.log("Visual Motion Library contracts OK: Mask Reveal uses one section-aware marker authority, shared WELCOME sample, Palmier NLE XML + sidecar Motion Handoff Manifest, and remains concept-only until local DaVinci verification.");
