import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const bridge = fs.readFileSync(path.join(root, "src/data/maskRevealPresetBridge.ts"), "utf8");
const workspace = fs.readFileSync(path.join(root, "src/components/MaskRevealEditableWorkspace.tsx"), "utf8");
const bundle = fs.readFileSync(path.join(root, "src/data/maskRevealSceneProductionBundle.ts"), "utf8");
const presetDecision = fs.readFileSync(path.join(root, "../docs/decisions/2026-08-25-motion-zukan-preset-first-davinci-value-bridge.md"), "utf8");
const formatDecision = fs.readFileSync(path.join(root, "../docs/decisions/2026-08-25-motion-zukan-output-format-clarification.md"), "utf8");
const errors = [];

function requireText(source, token, message) {
  if (!source.includes(token)) errors.push(message);
}

for (const token of [
  'type LayerDelayPreset = "IMMEDIATE" | "SHORT_WAIT" | "PHOTO_FIRST"',
  'layerDelayPresetOptions',
  'label: "すぐ"',
  'label: "少し待ってから"',
  'label: "写真をしっかり見せてから"',
  'resolveLayerDelayPreset',
  'detectLayerDelayPreset',
  'positionPresetOptions',
  'resolvePositionPreset',
  'detectPositionPreset',
  'schemaVersion: "mask-reveal-canonical/v1"',
  'authority: "HUMAN_EDITABLE_CANONICAL"',
  'xNormalized: value.positionXPercent / 100',
  'distanceNormalized: value.distancePercent / 100',
  'schemaVersion: "davinci-value-bridge/v1"',
  'source: "CANONICAL_SCENE_STATE"',
  'secondsToFrames',
  'resolvedFrames: secondsToFrames(seconds, context.fps)',
  'MASK_REVEAL_VERTICAL_SLICE_CONTEXT',
  'fps: 30',
  'width: 1280',
  'height: 720',
  'Preset labelからDaVinci値へ直接飛ばさない。Human UI → Canonical scene state → Project Context → DaVinci implementation value',
]) requireText(bridge, token, `Preset/DaVinci bridge missing: ${token}`);

for (const token of [
  'Preset First → Accordion Detail → DaVinci Final Precision',
  '文字を出すタイミング',
  'layerDelayPresetOptions',
  'positionPresetOptions',
  'カスタム',
  '詳細設定を見る →',
  '<details open',
  '詳細設定 / 現在の実数値',
  'DERIVED / NOT HUMAN MASTER',
  'Canonical → DaVinci Value Bridge',
  'resolvedFrames',
  'frame数だけを正本にしません',
  'Editable Scene Serialization (JSON)',
  'JSON / XML自体はHuman Masterではなく',
]) requireText(workspace, token, `Preset-first workspace missing: ${token}`);

if (workspace.includes('label="Editable Source of Truth JSON"')) {
  errors.push('Old UI label must not present JSON serialization itself as the Source of Truth');
}

for (const token of [
  'canonicalSceneState: ReturnType<typeof resolveCanonicalMaskRevealState>',
  'valueBridge: ReturnType<typeof buildMaskRevealDaVinciValueBridge>',
  'role: "TARGET_SPECIFIC_SIDECAR"',
  'humanMaster: false',
  'canonicalSceneState,',
  'valueBridge: davinciValueBridge',
]) requireText(bundle, token, `Scene production bundle missing canonical/export separation: ${token}`);

for (const token of [
  'Preset First → Accordion Detail → DaVinci Final Precision.',
  '人間向けPreset → 正規化された内部値 → DaVinci実装値',
  'Preset labelからDaVinci値へ直接飛ばさない。',
  '人間向けの正本は原則 `seconds`',
]) requireText(presetDecision, token, `Preset decision missing authority: ${token}`);

for (const token of [
  'AUTHORITATIVE CLARIFICATION',
  '`JSON` は正本フォーマットではない。',
  'Canonical structured scene state',
  'Target-specific exporter / adapter',
  'Human-friendly in, tool-native out.',
]) requireText(formatDecision, token, `Output format clarification missing authority: ${token}`);

if (errors.length) {
  console.error(`Mask Reveal Preset / DaVinci Value Bridge contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Mask Reveal Preset / DaVinci Value Bridge contracts OK: preset labels live in the resolver authority, easy UI consumes those options, direct numeric edits surface as Custom, seconds remain Human Master, and DaVinci frames/normalized implementation values are derived through explicit Project Context rather than becoming the source of truth.");
