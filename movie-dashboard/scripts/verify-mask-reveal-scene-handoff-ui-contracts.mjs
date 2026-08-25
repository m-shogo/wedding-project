import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const card = fs.readFileSync(path.join(root, "src/components/MaskRevealSceneHandoffCard.tsx"), "utf8");
const workspace = fs.readFileSync(path.join(root, "src/components/MaskRevealEditableWorkspace.tsx"), "utf8");
const bundle = fs.readFileSync(path.join(root, "src/data/maskRevealSceneProductionBundle.ts"), "utf8");
const errors = [];

function requireText(source, token, message) {
  if (!source.includes(token)) errors.push(message);
}

for (const token of [
  'buildMaskRevealSceneProductionBundle(scene)',
  'buildMaskRevealSceneProductionBundleJson(scene)',
  'HUMAN MASTER HANDOFF',
  'bundle.sceneMarkerId',
  'Scene revision:',
  'bundle.sourceRevision',
  'Palmier XML:',
  'bundle.timeline.projectTimelineXmlFileName',
  'Sidecar:',
  'bundle.timeline.sidecarFileName',
  'DaVinci Actual:',
  '"PENDING"',
  'Handoff JSONをコピー',
  'JSONを書き出す',
  'Handoff詳細を見る',
  'navigator.clipboard.writeText(json)',
  'downloadText(json, bundle.timeline.sidecarFileName)',
  'Sceneを編集するとupdatedAtが変わり、この表示bundleも現在のSceneInstanceから再生成されます。',
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

console.log("Mask Reveal Scene Handoff UI contracts OK: live adopted SceneInstance drives fresh Human Master bundle, JSON can be copied/exported, Palmier XML remains external, and DaVinci Actual visibly stays PENDING until real evidence exists.");
