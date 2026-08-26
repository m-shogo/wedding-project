import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const translator = fs.readFileSync(path.join(root, "src/data/charStaggerDaVinciTranslator.ts"), "utf8");
const engine = fs.readFileSync(path.join(root, "../motion-studio/src/motion-kit/engines.tsx"), "utf8");
const routing = fs.readFileSync(path.join(root, "src/data/typographySceneProductionRouting.ts"), "utf8");
const errors = [];

const requireText = (source, token, message) => {
  if (!source.includes(token)) errors.push(message);
};

for (const token of [
  "if (mode === 'stagger')",
  "const perCharDelay = Math.round(fps * 0.06)",
  "const charDuration = Math.round(fps * 0.28)",
  "(1 - charProgress) * 40 * strength",
  "opacity: charProgress",
  "Easing.out(Easing.cubic)",
]) {
  requireText(engine, token, `Canonical Typography stagger contract missing: ${token}`);
}

for (const token of [
  'schemaVersion: "davinci-typography-translator/v1"',
  'patternId: "type-char-stagger"',
  'engine: "TypographyRevealEngine"',
  'mode: "stagger"',
  'const perCharacterDelaySeconds = 0.06',
  'const characterDurationSeconds = 0.28',
  '40 * strength',
  'implementationId: "impl-type-char-stagger-davinci-text-plus-follower"',
  'target: "FUSION_TEXT_PLUS_FOLLOWER"',
  '["Text+", "Follower", "Keyframe", "Spline"]',
  'range: "ALL_CHARACTERS"',
  'order: "LEFT_TO_RIGHT"',
  'delayType: "BETWEEN_EACH_CHARACTER"',
  'delayFrames: perCharacterDelayFrames',
  'opacity: { from: 0, to: 1 }',
  'easing: "EASE_OUT_CUBIC"',
  'runtimeApplyState: "NOT_RUN"',
  'runtimeReadbackState: "NOT_RUN"',
  'renderParityState: "NOT_RUN"',
  'TRANSLATOR_SPEC_IMPLEMENTED != RESOLVE_ACTUAL_APPLIED',
  'FOLLOWER_CAPABILITY_DOCUMENTED != PARAMETER_NAMES_RUNTIME_VERIFIED',
  'EXPECTED_VALUES != RENDER_PARITY_VERIFIED',
]) {
  requireText(translator, token, `Char Stagger DaVinci translator missing contract: ${token}`);
}

requireText(
  routing,
  '"type-char-stagger",\n    "stagger",\n    "DAVINCI_TRANSLATION_NOT_IMPLEMENTED"',
  "Production routing must remain blocked until a real Fusion application path is implemented and verified",
);

if (/runtimeApplyState:\s*"PASS"/.test(translator) || /renderParityState:\s*"PASS"/.test(translator)) {
  errors.push("Char Stagger translator must not fabricate Resolve runtime/render parity evidence");
}
if (/DAVINCI_IMPLEMENTATION_AVAILABLE[\s\S]{0,120}type-char-stagger/.test(routing)) {
  errors.push("Char Stagger must not be promoted to implemented DaVinci route from translator spec alone");
}

if (errors.length) {
  console.error(`Char Stagger DaVinci Translator contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Char Stagger DaVinci Translator contracts OK: canonical 0.06s per-character delay / 0.28s character motion / 40px*intensity translate / cubic-out opacity are deterministically mapped to a Fusion Text+ Follower spec, while runtime apply/readback/render parity remain NOT_RUN and the production route remains fail-closed.");
