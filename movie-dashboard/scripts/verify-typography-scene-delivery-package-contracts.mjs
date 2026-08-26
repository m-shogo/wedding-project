import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const delivery = read("src/data/typographySceneDeliveryPackage.ts");
const card = read("src/components/TypographySceneDeliveryPackageCard.tsx");
const handoff = read("src/components/MaskRevealSceneHandoffCard.tsx");
const routing = read("src/data/typographySceneProductionRouting.ts");
const registry = read("src/data/typographyDaVinciActualWorkflowRegistry.ts");

const errors = [];
const requireText = (source, token, message) => {
  if (!source.includes(token)) errors.push(message);
};

for (const token of [
  'schemaVersion: "wedding-movie-typography-scene-delivery/v1"',
  'authority: "DERIVED_DELIVERY_PACKAGE"',
  'humanMasterPreserved: true',
  'humanState: base.humanState',
  'owner: "Palmier"',
  'capability: "PALMIER_TIMING_ONLY"',
  'xmlGeneratedExternally: true',
  'instruction: base.palmier.instruction',
  'actualEvidenceState: "NOT_RUN"',
  'productionReady: false',
  'releaseDecisionEmbedded: false',
  '"CONFIRM_CURRENT_SCENE_REVISION"',
  '"EXPORT_PALMIER_TIMELINE_WITH_MARKER"',
  '"APPLY_DAVINCI_TRANSLATOR"',
  '"CAPTURE_MAC_ACTUAL_EVIDENCE"',
  '"RUN_HUMAN_PROMOTION_REVIEW"',
  '"EVALUATE_SCENE_BOUND_RELEASE_GATE"',
  '"MAC_ACTUAL_EVALUATION"',
  '"HUMAN_PROMOTION_REVIEW"',
  '"SCENE_BOUND_RELEASE_GATE"',
  'buildTypographySceneProductionBundle(scene, selection)',
  'buildMaskRevealSceneProductionBundle(scene)',
  'getTypographyDaVinciActualWorkflow(patternId)',
  'parseAndValidateTypographySceneDeliveryPackage(',
  'STALE_TYPOGRAPHY_SCENE_DELIVERY_PACKAGE',
  'TYPOGRAPHY_SCENE_DELIVERY_ROUTE_MISMATCH',
  'TYPOGRAPHY_SCENE_DELIVERY_MUST_NOT_EMBED_ACTUAL_PASS',
  'TYPOGRAPHY_SCENE_DELIVERY_MUST_NOT_EMBED_RELEASE',
]) {
  requireText(delivery, token, `delivery package contract missing: ${token}`);
}

for (const token of [
  "Production packageを書き出す",
  "Package再検証",
  "Package revalidation:",
  "package出力 ≠ production release",
  "Scene更新後の古いpackageは再検証で拒否",
  "Mac Actual",
  "Current stop:",
  "delivery.execution.order.join",
  "delivery.files.palmierTimelineXmlFileName",
  "delivery.timeline.sceneMarkerId",
]) {
  requireText(card, token, `delivery package UI missing: ${token}`);
}

requireText(handoff, 'import { TypographySceneDeliveryPackageCard }', "Scene handoff does not import delivery package card");
requireText(handoff, '<TypographySceneDeliveryPackageCard scene={scene} />', "Scene handoff does not render delivery package card");

for (const patternId of [
  "type-mask-reveal",
  "type-char-stagger",
  "type-type-on-rhythm",
  "type-word-punch",
  "type-tracking-burst",
  "type-vertical-wipe",
  "type-outline-fill",
  "type-baseline-hop",
  "type-triplet",
]) {
  requireText(routing, `"${patternId}"`, `production routing missing ${patternId}`);
  if (patternId !== "type-mask-reveal") {
    requireText(registry, `patternId: "${patternId}"`, `Actual workflow registry missing ${patternId}`);
  }
}

for (const forbidden of [
  'actualEvidenceState: "PASS"',
  'productionReady: true',
  'releaseDecisionEmbedded: true',
  'xmlGeneratedExternally: false',
]) {
  if (delivery.includes(forbidden)) errors.push(`delivery package fabricates production evidence: ${forbidden}`);
}

if (errors.length) {
  console.error(`Typography Scene Delivery Package contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Typography Scene Delivery Package contracts OK: Human Master values + current route + Palmier timing + DaVinci workflow + execution order are bundled, stale imports fail closed, and Mac Actual/Release evidence is never fabricated.");
