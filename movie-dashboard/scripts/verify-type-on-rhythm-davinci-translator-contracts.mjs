import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const translator = fs.readFileSync(path.join(root, "src/data/typeOnRhythmDaVinciTranslator.ts"), "utf8");
const routing = fs.readFileSync(path.join(root, "src/data/typographySceneProductionRouting.ts"), "utf8");
const engine = fs.readFileSync(path.join(root, "../motion-studio/src/motion-kit/engines.tsx"), "utf8");
const errors = [];

const requireText = (source, token, message) => {
  if (!source.includes(token)) errors.push(message);
};

for (const token of [
  'patternId: "type-type-on-rhythm"',
  'mode: "word-stagger"',
  'splitStrategy: "SPACE_DELIMITED_MATCH_CANONICAL"',
  'perWordDelaySeconds = 0.22',
  'wordDurationSeconds = 0.32',
  '30 * strength',
  'input.text.split(" ")',
  'target: "FUSION_TEXT_PLUS_FOLLOWER_WORDS"',
  'implementationId: "impl-type-type-on-rhythm-davinci-text-plus-follower-words"',
  'range: "ALL_WORDS"',
  'unit: "WORDS"',
  'order: "LEFT_TO_RIGHT"',
  'delayType: "BETWEEN_EACH_WORD"',
  'easing: "EASE_OUT_CUBIC"',
  'sourceClass: "BLACKMAGIC_OFFICIAL_PRODUCT_GUIDANCE"',
  'Follower supports sequential text animation line-by-line, word-by-word, or character-by-character',
  'runtimeApplyState: "NOT_RUN"',
  'runtimeReadbackState: "NOT_RUN"',
  'renderParityState: "NOT_RUN"',
  'liveParameterBindingState: "NOT_VERIFIED"',
  'OFFICIAL_WORD_LEVEL_CAPABILITY != LIVE_PARAMETER_BINDING_VERIFIED',
  'WORD_LEVEL_REVEAL != PALMIER_TIMELINE_PLACEMENT',
]) {
  requireText(translator, token, `Type-on-rhythm translator missing contract: ${token}`);
}

for (const token of [
  'if (mode === \'word-stagger\')',
  'const words = text.split(\' \')',
  'const perWordDelay = Math.round(fps * 0.22)',
  'const wordDuration = Math.round(fps * 0.32)',
  '(1 - wordProgress) * 30 * strength',
  'opacity: wordProgress',
  'Easing.out(Easing.cubic)',
]) {
  requireText(engine, token, `Canonical word-stagger implementation drifted: ${token}`);
}

requireText(
  routing,
  '"type-type-on-rhythm",\n    "word-stagger",\n    "DAVINCI_TRANSLATION_NOT_IMPLEMENTED"',
  "type-type-on-rhythm route must remain fail-closed until Resolve Actual is proven",
);

if (/runtimeApplyState:\s*"PASS"/.test(translator) || /runtimeReadbackState:\s*"PASS"/.test(translator)) {
  errors.push("Translator spec must not fabricate Resolve Actual PASS");
}
if (/liveParameterBindingState:\s*"VERIFIED"/.test(translator)) {
  errors.push("Word-level Follower parameter bindings are not yet live-verified");
}
if (/DAVINCI_IMPLEMENTATION_AVAILABLE[\s\S]{0,140}type-type-on-rhythm/.test(routing)) {
  errors.push("Deterministic translator spec alone must not promote type-type-on-rhythm route");
}

if (errors.length) {
  console.error(`Type-on-rhythm DaVinci Translator contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Type-on-rhythm DaVinci Translator contracts OK: the deterministic word-level Follower spec matches canonical 0.22s word delay / 0.32s duration / 30px*intensity Y reveal / opacity / cubic-out semantics, uses Blackmagic's official word-level Follower capability only as capability evidence, and keeps live binding, apply/readback, render parity, and production routing unverified until Mac Resolve Actual.");
