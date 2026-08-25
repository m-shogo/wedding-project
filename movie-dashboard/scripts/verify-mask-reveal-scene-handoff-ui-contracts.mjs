import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const card = fs.readFileSync(path.join(root, "src/components/MaskRevealSceneHandoffCard.tsx"), "utf8");
const workspace = fs.readFileSync(path.join(root, "src/components/MaskRevealEditableWorkspace.tsx"), "utf8");
const bundle = fs.readFileSync(path.join(root, "src/data/maskRevealSceneProductionBundle.ts"), "utf8");
const outputClarification = fs.readFileSync(path.join(root, "../docs/decisions/2026-08-25-motion-zukan-output-format-clarification.md"), "utf8");
const presetBridge = fs.readFileSync(path.join(root, "../docs/decisions/2026-08-25-motion-zukan-preset-first-davinci-value-bridge.md"), "utf8");
const errors = [];

function requireText(source, token, message) {
  if (!source.includes(token)) errors.push(message);
}

for (const token of [
  'buildMaskRevealSceneProductionBundle(scene)',
  'buildMaskRevealSceneProductionBundleJson(scene)',
  'EXPORT / ADAPTER',
  'bundle.sceneMarkerId',
  'Scene revision:',
  'bundle.sourceRevision',
  'Palmier Timeline:',
  'bundle.timeline.projectTimelineXmlFileName',
  'Sidecar JSON:',
  'bundle.timeline.sidecarFileName',
  'DaVinci Actual:',
  '"PENDING"',
  'Sidecar JSONをコピー',
  'Sidecar JSONを書き出す',
  'Export詳細を見る',
  'navigator.clipboard.writeText(json)',
  'downloadText(json, bundle.timeline.sidecarFileName)',
  'Human MasterはSceneの人間が理解できる値です。',
  'JSON / XML自体はHuman Masterではありません。',
  'Sceneを編集するとupdatedAtが変わり、このexportも現在のSceneInstanceから再生成されます。',
  'NLE XML自体はPalmier実timelineからexportします。',
]) {
  requireText(card, token, `Scene Handoff UI missing: ${token}`);
}

for (const token of [
  'import { MaskRevealSceneHandoffCard } from "./MaskRevealSceneHandoffCard"',
  '<MaskRevealSceneHandoffCard scene={scene} />',
  '採用済みSceneを編集中。変更はfield単位で自動保存されます。',
]) {
  requireText(workspace, token, `Scene Handoff card not connected to live adopted SceneInstance: ${token}`);
}

for (const token of [
  'xmlGeneratedExternally: true',
  'productionReady: false',
  'sourceRevision: scene.updatedAt',
]) {
  requireText(bundle, token, `Scene Handoff UI dependency lost production truth: ${token}`);
}

for (const token of [
  'AUTHORITATIVE CLARIFICATION',
  '`JSON` は正本フォーマットではない。',
  'Human-readable production values',
  'Canonical structured scene state',
  'Target-specific exporter / adapter',
  'Human-friendly in, tool-native out.',
]) {
  requireText(outputClarification, token, `Output format authority missing: ${token}`);
}

for (const token of [
  'Preset First → Accordion Detail → DaVinci Final Precision.',
  '人間向けPreset → 正規化された内部値 → DaVinci実装値',
  'Preset labelからDaVinci値へ直接飛ばさない。',
]) {
  requireText(presetBridge, token, `Preset-first bridge authority missing: ${token}`);
}

if (card.includes('HUMAN MASTER HANDOFF')) {
  errors.push('Scene export UI must not label JSON/XML serialization itself as HUMAN MASTER HANDOFF');
}
if (/\.xml[`"']\s*,?\s*JSON\.stringify/.test(card) || /downloadText\([^\n]*\.xml/.test(card)) {
  errors.push("Scene Handoff UI must not generate or download fake Palmier NLE XML");
}
if (!card.includes('bundle.preview.productionReady ? "VERIFIED" : "PENDING"')) {
  errors.push("Scene Handoff UI must visibly fail-close DaVinci Actual as PENDING until verified");
}

if (errors.length) {
  console.error(`Mask Reveal Scene Handoff UI contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Mask Reveal Scene Handoff UI contracts OK: Human-readable Scene values remain Human Master; live SceneInstance drives target-specific sidecar export; JSON/XML are serialization only; Palmier XML remains external; DaVinci Actual visibly stays PENDING until real evidence exists.");
