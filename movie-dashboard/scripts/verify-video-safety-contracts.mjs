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

const continuity = await source("src/lib/videoContinuitySignoff.ts");
requireText(continuity, "version: 2", "continuity fingerprint payload must stay on v2 authority");
requireText(
  continuity,
  'sampleFingerprint: probe?.sampleFingerprint ?? ""',
  "continuity authority must bind adopted media sample fingerprint when available",
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
