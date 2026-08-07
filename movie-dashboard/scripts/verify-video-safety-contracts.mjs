import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");

async function source(relativePath) {
  return readFile(resolve(root, relativePath), "utf8");
}

function requireMatch(text, pattern, label) {
  if (!pattern.test(text)) {
    throw new Error(`AI video safety contract failed: ${label}`);
  }
}

function requireText(text, expected, label) {
  if (!text.includes(expected)) {
    throw new Error(`AI video safety contract failed: ${label}`);
  }
}

function forbidText(text, forbidden, label) {
  if (text.includes(forbidden)) {
    throw new Error(`AI video safety contract failed: ${label}`);
  }
}

const promptBuilder = await source("src/lib/videoPromptBuilder.ts");
requireMatch(
  promptBuilder,
  /id:\s*"runway-gen-4\.5"[\s\S]{0,2200}?negativePromptPolicy:\s*"qa-only"/,
  "Runway Gen-4.5 must keep negativePromptPolicy=qa-only",
);

const generationPacket = await source("src/lib/videoGenerationPacket.ts");
requireText(
  generationPacket,
  'negativePolicy === "optional-separate-field"',
  "model input may include negative text only through the optional-separate-field gate",
);
requireText(
  generationPacket,
  "QA ONLY — DO NOT SEND AS MODEL INPUT",
  "qa-only negative content must remain explicitly separated from model input",
);

const executionRouter = await source("src/lib/videoExecutionRouter.ts");
requireText(
  executionRouter,
  "generationは明示指示まで実行しない",
  "external-generation routes must keep generation execution behind explicit user instruction",
);
forbidText(
  executionRouter,
  "未生成なら現在のmodel/toolで1本だけ実行する。",
  "testing-without-result route must not implicitly authorize generation",
);
forbidText(
  executionRouter,
  "低コスト試作を1本だけ実行する。",
  "draft route must not implicitly authorize generation",
);
forbidText(
  executionRouter,
  "まず1本だけ生成して",
  "draft route reason must not imply permission to execute generation",
);
requireText(
  executionRouter,
  "生成実行の許可とは分離する",
  "draft route must explicitly separate preparation from generation authorization",
);
requireText(
  executionRouter,
  "adoptedFingerprintMismatch",
  "execution routing must compare reviewed and current adopted media fingerprints",
);
requireText(
  executionRouter,
  "以前の目視QAを編集工程へ引き継げません",
  "fingerprint mismatch must block adopted media from edit handoff",
);
requireText(
  executionRouter,
  'route.destination === "edit" ? selected : []',
  "blocked adopted media must be omitted from Palmier handoff result assets",
);
requireText(
  executionRouter,
  'const blockedAdopted = prompt.status === "adopted" && route.destination === "blocked";',
  "Palmier handoff must explicitly identify blocked adopted prompts before exposing alternatives",
);
requireText(
  executionRouter,
  "withheldResultAssetIds: blockedAdopted ? allResultAssets.map((asset) => asset.assetId) : []",
  "blocked adopted media may expose only diagnostic Asset IDs instead of file paths or repro metadata",
);
requireText(
  executionRouter,
  "Blocked adopted media must not expose file paths or repro metadata in the structured handoff",
  "Palmier handoff safety boundary must forbid blocked media path and repro leakage",
);
requireText(
  executionRouter,
  "QA-reviewed sample fingerprint",
  "Palmier handoff must expose the fingerprint captured at QA PASS",
);
requireText(
  executionRouter,
  "current sample fingerprint",
  "Palmier handoff must expose the current adopted media fingerprint evidence",
);
requireText(
  executionRouter,
  "sample fingerprint is a bounded audit hint",
  "Palmier handoff must not present sampled fingerprint as a full-file checksum or visual QA",
);

const continuity = await source("src/lib/videoContinuitySignoff.ts");
requireText(continuity, "version: 2", "continuity fingerprint payload must stay on v2 authority");
requireText(
  continuity,
  'sampleFingerprint: probe?.sampleFingerprint ?? ""',
  "continuity authority must bind adopted media sample fingerprint when available",
);

const resultReview = await source("src/pages/VideoResultReview.tsx");
requireText(
  resultReview,
  "reviewed-sample-fingerprint=",
  "QA PASS must bind the selected adopted Asset to its sampled media fingerprint when available",
);
requireText(
  resultReview,
  "QA時fingerprintと不一致",
  "result review must visibly surface reviewed/current fingerprint mismatch",
);
requireText(
  resultReview,
  "採用前に実体fingerprintを記録してください",
  "result review must stop QA adoption until the selected Asset has sampled media fingerprint evidence",
);
requireText(
  resultReview,
  "selectedHasFingerprint",
  "QA adoption button must remain gated by the selected Asset fingerprint authority",
);

const preflight = await source("src/lib/videoPreflight.ts");
requireText(
  preflight,
  "lastNoteValue(prompt.notes, \"selected-result-asset\")",
  "preflight must resolve the latest append-only selected-result authority",
);
requireText(
  preflight,
  "adopted-review-fingerprint-mismatch",
  "preflight must block when current adopted media differs from the fingerprint reviewed at QA PASS",
);
requireText(
  preflight,
  "同じ目視QAを引き継げません",
  "fingerprint mismatch must invalidate previous visual QA authority",
);

const store = await source("src/store/productionStore.tsx");
requireText(store, "registerPromptResultAsset", "atomic generated-result registration must remain available");
requireText(store, "addPromptLinkedToScenes", "atomic Prompt + scene linking must remain available");
requireText(store, "if (Object.is(next, prev)) return prev;", "no-op state updates must not pollute Undo history");

const queue = await source("src/pages/VideoGenerationQueue.tsx");
requireText(queue, "registerPromptResultAsset", "generation queue must use atomic result registration");
requireMatch(
  queue,
  /const\s*\{[\s\S]{0,500}?registerPromptResultAsset[\s\S]{0,500}?\}\s*=\s*useProduction\(\)/,
  "generation queue must obtain atomic registration from ProductionProvider",
);

for (const relativePath of [
  "src/pages/VideoPromptBuilder.tsx",
  "src/pages/VideoShotPlanner.tsx",
  "src/pages/VideoResultReview.tsx",
]) {
  const text = await source(relativePath);
  requireText(text, "addPromptLinkedToScenes", `${relativePath} must keep Prompt + scene creation atomic`);
}

console.log("AI video safety contracts: PASS");
