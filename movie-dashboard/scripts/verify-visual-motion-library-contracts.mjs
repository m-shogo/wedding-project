import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { assertCompleteOrAbsent, classifyMediaSet } from "./media-qa-policy.mjs";

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
const actualQueue = read("src/data/motionActualVerificationQueue.ts");
const actualWorkspace = read("src/components/MotionActualVerificationWorkspace.tsx");
const app = read("src/App.tsx");
const sidebar = read("src/components/Sidebar.tsx");
const errors = [];

function requireAll(source, tokens, prefix) {
  for (const token of tokens) if (!source.includes(token)) errors.push(`${prefix}: ${token}`);
}

requireAll(data, [
  'id: "type-mask-reveal"', 'legacyPresetIds: ["type-mask-slide"]', 'japaneseName: "マスクから文字がスッと現れる"',
  '"文字 下からシュッ"', '"PALMIER_TIMING_ONLY"', '"DAVINCI_TEXT_PLUS"', 'status: "PRODUCTION_READY"', 'resolveVersion: "21.0.4.5"',
  'id: "preview-type-mask-reveal-davinci-actual"', 'sourceType: "ACTUAL_DAVINCI_RENDER"', 'status: "VERIFIED"',
  'assetPath: "/motion-previews/type-mask-reveal/davinci-actual-v1.mp4"', 'verified: true',
  'id: "preview-type-mask-reveal-repo-concept"', 'sourceType: "REPO_GENERATED"', 'status: "CONCEPT"', 'sampleAssetSetId: "sample-typography-welcome-v1"',
  'searchedExistingPatterns: true', 'searchedDaVinciBuiltins: true', 'searchedExternalSources: true',
  '"photo-static-hero": ["photo-hero-still"]', '"photo-small-push": ["camera-gentle-push"]',
  '...pattern.legacyPresetIds', 'export function resolveMotionPatternId',
  'whyExistingOptionsFail', 'whyNewPatternIsNeeded', 'buildMaskRevealPromptOutputs', 'humanBrief',
  'claudeCreativeInstruction', 'palmierInstruction', 'davinciFinishManifest', 'machineJson',
], "Visual Motion data missing contract token");

requireAll(handoff, [
  'schemaVersion: "motion-handoff/v1"', 'expectedFormat: "NLE_XML"', 'xmlGeneratedExternally: true',
  'companionFileName: `palmier-${patternId}-timeline.xml`', 'markerIdFor', '`VML_${slug}_${section}`',
  'buildMaskRevealExecutionOutputs', 'nleXmlHandoff', 'verificationChecklist',
  // patternId/implementationId are now taken from MaskRevealPromptInput (any registered
  // PRODUCTION_READY pattern, not only type-mask-reveal) so this checks the fallback default
  // used when a caller omits them, not a hardcoded literal in the manifest itself.
  'implementationId ?? "impl-type-mask-reveal-davinci-text-plus"', '"opened-in-davinci"', '"render-tested"',
  '"visual-QA"', '"resolve-version-recorded"', 'canonicalTarget: "ACTUAL_DAVINCI_RENDER"', 'productionReady: false',
  'schemaVersion: "motion-verification/v1"', 'sampleAssetSetId: "sample-generic-hero-photo-v1"',
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
  'モーション図鑑 / HUMAN MASTER', 'かんたん', '詳細', 'DaVinci', 'AI提案:', '理由:', '選択済み:', '固定中 🔒',
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
  'usedByPreviewIds: ["preview-type-mask-reveal-davinci-actual", "preview-type-mask-reveal-repo-concept"]', 'status: "READY"',
], "Motion sample asset set missing contract token");

requireAll(learning, [
  'patternId: "type-mask-reveal"', 'fusionRecipeIds: ["fusion-masked-reveal"]',
  'learningTopics: ["Mask", "Text+", "Keyframe", "Easing", "Merge"]', 'getMotionLearningBundle',
  'fusionLearningRecipes.find', 'Do not duplicate tutorials here',
], "Motion learning link missing reuse contract token");
if (!fusionLearning.includes('recipeId: "fusion-masked-reveal"')) errors.push("Existing Fusion masked reveal recipe must remain the learning authority");

requireAll(previewEvidence, [
  'id: "evidence-type-mask-reveal-davinci-actual-2026-08-27"', 'previewId: "preview-type-mask-reveal-davinci-actual"',
  'classification: "ACTUAL"', 'sourceType: "ACTUAL_DAVINCI_RENDER"',
  'artifactDigest: "sha256:32d5e1b39b2b8d381ae7521f4c6c3bcc30fe72b1dacb0fc7153b87e8bcf23592"',
  'persistentAssetPath: "/motion-previews/type-mask-reveal/davinci-actual-v1.mp4"', 'measuredDurationSeconds: 4',
  'renderedPixelOracle: true', '通常速度とffmpeg 0.5x版',
  'id: "evidence-type-mask-reveal-concept-2026-08-25"', 'previewId: "preview-type-mask-reveal-repo-concept"',
  'classification: "CONCEPT"', 'sourceType: "REPO_GENERATED"', 'workflowRunId: 32847587754',
  'artifactDigest: "sha256:7c2c1f8777311d9fe5e30b05dd6e57da5d8f1b8eb2971521fa277b1bb1f35b6e"',
  'artifactExpiresAt: "2026-09-01T12:28:01Z"', 'persistentAssetPath: null', 'frames: 120', 'ffprobeVerified: true',
  'renderedPixelOracle: true', 'result: "PASS"', 'productionAuthority: false', 'DaVinci Actual / local Resolve verificationとは完全に別扱い',
  'id: "evidence-type-quiet-caption-davinci-actual-2026-08-28"', 'previewId: "preview-type-quiet-caption-davinci-actual"',
  'artifactDigest: "sha256:945439d65312d947087b1f64e570d4d7eae9300bb0db656d20f3d66572e0ad03"',
  'persistentAssetPath: "/motion-previews/type-quiet-caption/davinci-actual-v1.mp4"', 'frames: 95',
  'id: "evidence-cut-match-shape-source-actual-2026-08-28"', 'id: "evidence-whip-source-matched-source-actual-2026-08-28"',
  'sourceType: "ACTUAL_SOURCE_MEDIA_RENDER"', 'productionAuthority: false',
], "Mask Reveal Concept evidence missing provenance token");

if (!/status:\s*"PRODUCTION_READY"/.test(data)) errors.push("Mask Reveal must remain PRODUCTION_READY after the real Palmier→Resolve chain and independent pixel oracle pass");
if (/resolveVersion:\s*"[^\"]+"/.test(handoff)) errors.push("Motion handoff must not invent a Resolve version before local verification");
if (/productionReady:\s*true/.test(handoff)) errors.push("Motion handoff verification evidence must remain productionReady=false until every local DaVinci gate is proven");
const productionAuthorityTrueCount = (previewEvidence.match(/productionAuthority:\s*true/g) ?? []).length;
if (productionAuthorityTrueCount !== 2
  || !previewEvidence.includes('id: "evidence-cut-hard-accent-palmier-actual-2026-08-28"')
  || !previewEvidence.includes('id: "evidence-type-quiet-caption-davinci-actual-2026-08-28"')) errors.push("Only the verified Palmier hard cut and DaVinci quiet caption may carry production authority");
if (handoff.includes("MOTION:type-mask-reveal") || page.includes("MOTION:type-mask-reveal")) errors.push("Generic Mask Reveal marker must not reappear; use the section-aware VML_MASK_REVEAL_<SECTION> authority");
if (workspace.includes('label="Editable Source of Truth JSON"')) errors.push("JSON serialization must not be presented to the user as the Source of Truth");

requireAll(page, [
  'Native App Actual 8件を、検証根拠と一緒に公開する',
  'Mask Reveal・Quiet Caption・Static Hero・Word Punch・Small Push・Flash Soft・Char StaggerはDaVinci Actual、Hard Cut AccentはPalmier Actualまで到達済み',
  '人間が理解できるScene Duration / Delay / Hold / Position / Direction等を正本', 'MaskRevealEditableWorkspace',
  'CONCEPT PREVIEW / 実装確認前', 'JUST-IN-TIME LEARNING', 'この演出で学べること', 'getMotionLearningBundle(pattern.id)',
  'learning.fusionRecipes.map', 'getLatestPreviewEvidence(preview.id)', 'ACTUAL ${actualRenderLabel(previewEvidence.sourceType)} RENDER QA ✓ / IMPLEMENTATION EVIDENCE',
  'poster={preview.posterPath ?? undefined}',
  'CONCEPT RENDER QA ✓ / NOT DAVINCI ACTUAL', '永続${actualRenderLabel(previewEvidence.sourceType)} Actual assetを表示中。Human Master Scene値とは分離した実装証拠です。',
  '永続Remotion previewを表示中。DaVinci Actualではなく、図鑑用の実装検証証拠です。',
  'COMPLETION / HONEST GATES', 'Native App Actual', 'Implementation TESTED', '外部確認待ち',
  'completion.remaining.join(" / ")', 'Pexels列車窓2本の同方向camera motionでTESTED',
  'MotionActualVerificationWorkspace onShowPattern={showPattern}',
  'aria-label="実装状態で絞り込み"', 'EXTERNAL_GATE',
  'Previewの検証とImplementationの検証は別判定',
  '永続representative previewを表示中。見た目の説明用で、Implementation検証証拠ではありません。',
  '期限付きartifactで検証済み。永続MP4がないため、この画面では静止placeholderのまま。',
], "Visual Motion page missing");

requireAll(actualQueue, [
  'motionActualVerificationQueue: readonly MotionActualVerificationGate[] = []', 'getMotionActualVerificationGate',
], "Actual verification queue missing");
if (actualQueue.includes('patternId: "type-quiet-caption"')) errors.push("Verified quiet caption must be removed from the Actual verification queue");

requireAll(actualWorkspace, [
  'ACTUAL VERIFICATION WORKSPACE / FAIL CLOSED', 'motionActualVerificationQueue.map',
  '全36パターンが検証ゲートを通過',
  'type="file"', 'accept="video/*"', 'multiple', 'URL.createObjectURL(file)', 'URL.revokeObjectURL(nextUrl)',
  'PRECHECK READY / NOT VERIFIED', 'manifestを保存できます', 'Actual確認票をコピー',
  '図鑑でこのPreviewを見る ↓',
  'navigator.clipboard.writeText', 'Result: PENDING', 'このチェックリストをコピーしただけでは検証済みにしない。',
  'ブラウザのClipboard権限がないため、下の確認票を選択してコピーしてください。', 'event.currentTarget.select()',
  'ローカル動画はブラウザ内だけで読み込み、サーバーへ保存しない。',
  'motion-actual-preflight/v1', 'status: "PRECHECK_ONLY"', 'productionAuthority: false',
  'implementationPromotionAllowed: false', 'sha256Status: "PENDING_CLI"', 'result: "PENDING_ACTUAL_RENDER"',
  'プリフライトJSONを保存', 'metadata.width', 'metadata.durationSeconds', '2本に共通するcamera motion方向',
], "Actual verification workspace missing");

const actualAssets = [
  "public/motion-previews/type-mask-reveal/davinci-actual-v1.mp4",
  "public/motion-previews/type-mask-reveal/davinci-actual-v1-poster.png",
  "public/motion-previews/type-quiet-caption/davinci-actual-v1.mp4",
  "public/motion-previews/type-quiet-caption/davinci-actual-v1-poster.png",
  "public/motion-previews/cut-match-shape/source-actual-v1.mp4",
  "public/motion-previews/cut-match-shape/source-actual-v1-poster.png",
  "public/motion-previews/whip-source-matched/source-actual-v1.mp4",
  "public/motion-previews/whip-source-matched/source-actual-v1-poster.png",
];
const actualMediaState = classifyMediaSet(actualAssets.map((asset) => path.join(root, asset)));
assertCompleteOrAbsent("Visual Motion Actual media", actualMediaState, errors);
for (const asset of actualMediaState.mode === "COMPLETE" ? actualAssets : []) {
  const assetPath = path.join(root, asset);
  if (!fs.existsSync(assetPath) || fs.statSync(assetPath).size === 0) errors.push(`Mask Reveal Actual asset missing or empty: ${asset}`);
}

if (!app.includes('path="movie-coach/motion-library"')) errors.push("Visual Motion Library route missing");
if (!sidebar.includes('to: "/movie-coach/motion-library"')) errors.push("Visual Motion Library navigation missing");
if (!sidebar.includes('label: "動きを見て探す"')) errors.push("Visual Motion Library must use beginner-first navigation label");

if (errors.length) {
  console.error(`Visual Motion Library contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Visual Motion Library contracts OK (${actualMediaState.mode === "COMPLETE" ? "media verified" : "code-only; local media absent"}): 8 native-app Actuals (mask-reveal, quiet-caption, cut-hard-accent, photo-static-hero, type-word-punch, photo-small-push, flash-one-frame-soft, type-char-stagger), 2 source-media Actual TESTED renders, independent pixel-oracle evidence, and separate Concept assets are registered; Human Master Scene values remain the source of truth.`);
