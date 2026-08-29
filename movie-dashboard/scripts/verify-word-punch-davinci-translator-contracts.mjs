import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const translator = fs.readFileSync(path.join(root, "src/data/wordPunchDaVinciTranslator.ts"), "utf8");
const engine = fs.readFileSync(path.join(root, "../motion-studio/src/motion-kit/engines.tsx"), "utf8");
const errors = [];
const requireText = (source, token, message) => {
  if (!source.includes(token)) errors.push(message);
};

for (const token of [
  'patternId: "type-word-punch"',
  'mode: "punch"',
  'durationSeconds = 0.5',
  '1 + 0.18 * strength',
  'target: "FUSION_TEXT_PLUS_TRANSFORM"',
  'implementationId: "impl-type-word-punch-davinci-text-plus-transform"',
  'scale: { from: scaleFrom, to: 1 }',
  'opacity: { from: 0, to: 1 }',
  'easing: "EASE_OUT_CUBIC"',
  'runtimeApplyState: "NOT_RUN"',
  'runtimeReadbackState: "NOT_RUN"',
  'renderParityState: "NOT_RUN"',
  'TRANSFORM_SCALE_INTENT != LIVE_FUSION_INPUT_NAME_VERIFIED',
]) {
  requireText(translator, token, `Word Punch translator missing contract: ${token}`);
}

for (const token of [
  "mode === 'punch'",
  '[1 + 0.18 * strength, 1]',
  'Easing.out(Easing.cubic)',
  'opacity',
]) {
  requireText(engine, token, `Canonical punch implementation drifted: ${token}`);
}

if (/runtimeApplyState:\s*"PASS"/.test(translator) || /runtimeReadbackState:\s*"PASS"/.test(translator)) {
  errors.push("Word Punch translator must not fabricate Resolve Actual PASS");
}
if (errors.length) {
  console.error(`Word Punch DaVinci Translator contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log("Word Punch DaVinci Translator contracts OK: canonical 0.5s cubic-out whole-title scale/opacity intent is deterministic while live Fusion bindings and Resolve Actual remain NOT_RUN.");
