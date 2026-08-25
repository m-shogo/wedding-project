import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const bundle = fs.readFileSync(path.join(root, "src/data/maskRevealSceneProductionBundle.ts"), "utf8");
const composer = fs.readFileSync(path.join(root, "src/data/visualSceneComposer.ts"), "utf8");
const runbook = fs.readFileSync(path.join(root, "../docs/runbooks/2026-08-25-mask-reveal-sceneinstance-handoff-addendum.md"), "utf8");
const errors = [];

function requireText(source, token, message) {
  if (!source.includes(token)) errors.push(message);
}

for (const token of [
  'schemaVersion: "motion-zukan-scene-production/v1"',
  'authority: "HUMAN_MASTER"',
  'patternId: "type-mask-reveal"',
  'sourceRevision: scene.updatedAt',
  'sceneMarkerId',
  'recipeProvenance: scene.recipeProvenance',
  'targetDurationSeconds: scene.targetDurationSeconds',
  'computedDurationSeconds: scene.computedDurationSeconds',
  'durationDeltaSeconds: scene.durationDeltaSeconds',
  'humanSelectedFields: [...scene.humanSelectedFields]',
  'lockedFields: [...scene.lockedFields]',
  'editableSourceOfTruth',
  'resolvedEditableIntent: resolved',
  'producer: "Palmier"',
  'expectedFormat: "NLE_XML"',
  'projectTimelineXmlFileName: `palmier-${scene.projectId}-timeline.xml`',
  'xmlGeneratedExternally: true',
  'PALMIER_TIMING_ONLY',
  'appliedValue: null',
  'difference: null',
  'implementationId: "impl-type-mask-reveal-davinci-text-plus"',
  'currentStatus: "CONCEPT"',
  'canonicalTarget: "ACTUAL_DAVINCI_RENDER"',
  'productionReady: false',
  'generatedFromSceneUpdatedAt: scene.updatedAt',
  'SceneInstance.updatedAtが変わったら、このbundleを再生成',
  'buildMaskRevealSceneProductionBundleJson',
]) {
  requireText(bundle, token, `Scene production bundle missing contract token: ${token}`);
}

for (const token of [
  'return `VML_MASK_REVEAL_${scene.editableIntent.section}_${markerSceneToken(scene.sceneId)}`',
  'sidecarFileName: `${fileToken}-mask-reveal-handoff.json`',
  'Palmier実timeline内で ${sceneMarkerId} をSceneInstanceの一意識別子として保持する',
]) {
  requireText(bundle, token, `Scene-specific handoff identity missing: ${token}`);
}

for (const token of [
  'schemaVersion: "scene-instance/v1"',
  'authority: "HUMAN_MASTER"',
  'updatedAt: string',
  'recipeProvenance',
  'humanSelectedFields',
  'lockedFields',
]) {
  requireText(composer, token, `SceneInstance authority missing prerequisite: ${token}`);
}

for (const token of [
  '# Mask Reveal SceneInstance → Palmier / DaVinci Handoff Addendum',
  '採用済み `SceneInstance` をProduction Source of Truthとして扱う',
  'sourceRevision = SceneInstance.updatedAt',
  'VML_MASK_REVEAL_<SECTION>_<SCENE_TOKEN>',
  'palmier-opening-timeline.xml',
  'palmier-profile-timeline.xml',
  'アプリ側でNLE XMLを捏造しない',
  'intended value',
  'applied value',
  'difference / delta',
  'SceneInstance → fresh production bundle → Palmier real NLE XML → DaVinci import',
  '`productionReady` は実機検証完了まで `false`',
  '36 Motion Kit / 97 Director Recipes',
]) {
  requireText(runbook, token, `SceneInstance handoff runbook missing: ${token}`);
}

if (/productionReady:\s*true/.test(bundle)) {
  errors.push("Scene production bundle must not claim productionReady before actual Palmier/DaVinci verification");
}
if (/xmlGeneratedExternally:\s*false/.test(bundle)) {
  errors.push("Scene production bundle must never pretend the dashboard generated Palmier NLE XML");
}
if (!bundle.includes('scene.updatedAt') || !bundle.includes('sourceRevision')) {
  errors.push("Scene production bundle must carry SceneInstance freshness/revision evidence");
}

if (errors.length) {
  console.error(`Mask Reveal Scene Production Bundle contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Mask Reveal Scene Production Bundle contracts OK: adopted HUMAN_MASTER SceneInstance is the handoff authority; Scene-specific markers avoid collisions; Palmier XML remains external truth; stale bundles fail by revision rule; Actual DaVinci evidence remains pending until real verification.");
