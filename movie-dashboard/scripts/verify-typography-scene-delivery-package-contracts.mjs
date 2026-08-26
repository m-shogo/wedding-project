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
  'owner: "Palmier"',
  'capability: "PALMIER_TIMING_ONLY"',
  'xmlGeneratedExternally: true',
  'actualEvidenceState: "NOT_RUN"',
  'productionReady: false',
  'releaseDecisionEmbedded: false',
  '"MAC_ACTUAL_EVALUATION"',
  '"HUMAN_PROMOTION_REVIEW"',
  '"SCENE_BOUND_RELEASE_GATE"',
  'buildTypographySceneProductionBundle(scene, selection)',
  'buildMaskRevealSceneProductionBundle(scene)',
  'getTypographyDaVinciActualWorkflow(patternId)',
]) {
  requireText(delivery, token, `delivery package contract missing: ${token}`);
}

for (const token of [
  "Production packageを書き出す",
  "package出力 ≠ production release",
  "Mac Actual",
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

console.log("Typography Scene Delivery Package contracts OK: Scene revision + human-selected route + Palmier timing + DaVinci workflow are bundled without fabricating Mac Actual or Release evidence.");
