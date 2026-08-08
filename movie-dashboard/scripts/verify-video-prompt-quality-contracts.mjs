import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");

async function source(relativePath) {
  return readFile(resolve(root, relativePath), "utf8");
}

function requireText(text, expected, label) {
  if (!text.includes(expected)) throw new Error(`AI video prompt quality contract failed: ${label}`);
}

function forbidText(text, forbidden, label) {
  if (text.includes(forbidden)) throw new Error(`AI video prompt quality contract failed: ${label}`);
}

const generationPacket = await source("src/lib/videoGenerationPacket.ts");
requireText(
  generationPacket,
  "return buildVideoProviderFields(prompt).mainPrompt;",
  "provider model input must stay limited to the clean main prompt",
);
requireText(
  generationPacket,
  "buildVideoOperatorPacket",
  "operator metadata must remain separate from the provider main prompt",
);
requireText(
  generationPacket,
  "QA ONLY UNTIL PROVIDER POLICY IS VERIFIED",
  "unknown negative policy must fail safe into human QA only",
);
requireText(
  generationPacket,
  "[OPTIONAL SEPARATE NEGATIVE FIELD — USE ONLY IN A SEPARATE PROVIDER FIELD]",
  "optional negative text must stay visibly separated from the main prompt",
);

const promptBuilder = await source("src/lib/videoPromptBuilder.ts");
requireText(promptBuilder, "function runwayI2VMotion", "Runway I2V must retain a motion-first compiler path");
requireText(
  promptBuilder,
  'modelId === "runway-gen-4.5" && intent.mode === "i2v"',
  "motion-first compilation must be scoped to Runway I2V rather than all modes",
);
requireText(
  promptBuilder,
  "runway-i2v-input=motion-first",
  "Runway I2V prompts must retain an auditable compiler marker",
);
requireText(promptBuilder, "function cameraInstruction", "camera controls must compile through a sentence-normalization layer");
requireText(
  promptBuilder,
  '"slow push-in": "Camera performs one slow, steady push-in."',
  "common camera preset shorthand must compile into a complete natural-language sentence",
);
requireText(
  promptBuilder,
  "cameraInstruction(intent.camera)",
  "compiled motion must use normalized camera sentences",
);
forbidText(
  promptBuilder,
  "intent.camera.trim(),",
  "raw camera shorthand must not be inserted directly into compiled model prompts",
);
requireText(
  promptBuilder,
  "function sentenceInstruction",
  "free-form motion instructions must retain explicit sentence boundaries",
);
requireText(
  promptBuilder,
  "sentenceInstruction(intent.action)",
  "action text must be normalized before it is joined with camera or pacing instructions",
);
requireText(
  promptBuilder,
  "function prefixedInstruction",
  "reference guidance must avoid missing or duplicated sentence terminators",
);
forbidText(
  promptBuilder,
  "intent.action.trim(),",
  "raw action shorthand must not be inserted directly into compiled model prompts",
);
requireText(
  promptBuilder,
  "function inlineFragment",
  "embedded lighting fragments must remove trailing sentence punctuation before wrapping",
);
requireText(
  promptBuilder,
  'prefixedInstruction("Mood", intent.mood)',
  "mood text must use the shared sentence boundary helper",
);
requireText(
  promptBuilder,
  "function instructionClauseCount",
  "prompt complexity warnings must share one clause counter",
);
requireText(
  promptBuilder,
  "split(/[,;、；。]/)",
  "prompt complexity warnings must count comma and semicolon separated clauses",
);
requireText(
  promptBuilder,
  "runwayI2VIgnoresAppearanceControls",
  "warnings must recognize that Runway I2V omits appearance controls from its main prompt",
);

const presets = await source("src/lib/videoPromptPresets.ts");
for (const legacyNegative of [
  "no new cloud forms suddenly appear",
  "do not invent people",
  "; no people, text, logos or signs",
  "realistic not glossy",
  "avoid additional vehicles or aircraft",
  "no dramatic wave growth",
  "do not add text, signs, neon graphics, particles or lens effects",
  "without particles or magical effects",
]) {
  forbidText(presets, legacyNegative, `model-facing preset language must not regress to negative phrase: ${legacyNegative}`);
}

const reviewDrafts = await source("src/lib/videoReviewDraftStorage.ts");
requireText(
  reviewDrafts,
  "resetReviewDraftEvidenceOnVariantChange",
  "switching result variants must invalidate in-progress visual QA evidence",
);
requireText(
  reviewDrafts,
  "previousDraft.selectedResultAssetId === draft.selectedResultAssetId",
  "QA evidence may persist only while the selected result Asset stays the same",
);
requireText(reviewDrafts, "checks: {}", "variant changes must clear prior QA checks");
requireText(reviewDrafts, "failureCategoryId: undefined", "variant changes must clear prior failure classification");

const failureTaxonomy = await source("src/lib/videoFailureTaxonomy.ts");
requireText(failureTaxonomy, "function keywordMatches", "failure inference must use explicit keyword matching rules");
requireText(
  failureTaxonomy,
  "(^|[^a-z0-9])",
  "ASCII failure keywords must retain token boundaries to avoid substring false positives",
);

const resultMetadata = await source("src/lib/videoResultMetadata.ts");
requireText(resultMetadata, "normalizeVideoResolution", "video resolution evidence must retain canonical normalization");
requireText(resultMetadata, "[xX×]", "resolution normalization must handle x/X/multiplication-sign variants");

const preflight = await source("src/lib/videoPreflight.ts");
requireText(
  preflight,
  "runway-i2v-motion-first-missing",
  "legacy Runway I2V drafts without the motion-first marker must stay visible before generation",
);
requireText(
  preflight,
  'lastNoteValue(prompt.notes, "runway-i2v-input")',
  "Runway migration preflight must read the latest compiler marker",
);
requireText(
  preflight,
  "既に生成を開始しているなら追加生成せず",
  "testing-state migration guidance must avoid duplicate provider generation",
);

const assetReprobe = await source("src/pages/VideoAssetReprobe.tsx");
requireText(assetReprobe, "adoptedSelectedAuthority", "reprobe must identify assets that are active adopted edit authorities");
requireText(assetReprobe, "wouldRemoveAdoptedFingerprint", "reprobe must detect when a save would erase adopted fingerprint authority");
requireText(assetReprobe, "reviewedFingerprintMismatch", "reprobe must compare new media fingerprint with QA-reviewed authority");
requireText(
  assetReprobe,
  "採用正本はfingerprintなしのprobe証跡で上書きできません",
  "adopted result evidence must not be overwritten by an incomplete fingerprint probe",
);
requireText(
  assetReprobe,
  "QA時fingerprintと変わったため結果レビューで再QAが必要です",
  "changed adopted media fingerprint must explicitly require visual re-review",
);
requireText(
  assetReprobe,
  "disabled={!pendingEvidence || wouldRemoveAdoptedFingerprint}",
  "reprobe save control must block adopted-authority fingerprint removal",
);
requireText(
  assetReprobe,
  "fingerprint一致だけで目視QA PASSを推測せず",
  "fingerprint equality must never be presented as automatic visual QA",
);

console.log("AI video prompt quality contracts: PASS");
