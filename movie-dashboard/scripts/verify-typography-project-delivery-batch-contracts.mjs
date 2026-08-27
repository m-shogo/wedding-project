import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const batch = read("src/data/typographyProjectDeliveryBatch.ts");
const card = read("src/components/TypographyProjectDeliveryBatchCard.tsx");
const handoff = read("src/components/MaskRevealSceneHandoffCard.tsx");
const scenePackage = read("src/data/typographySceneDeliveryPackage.ts");

const errors = [];
const requireText = (source, token, message) => {
  if (!source.includes(token)) errors.push(message);
};

for (const token of [
  'schemaVersion: "wedding-movie-typography-project-delivery/v1"',
  'authority: "DERIVED_PROJECT_HANDOFF"',
  '"CURRENT_PACKAGE_READY"',
  '"MISSING_HUMAN_ROUTE"',
  '"STALE_HUMAN_ROUTE"',
  'HUMAN_SELECTED_TYPOGRAPHY_ROUTE_REQUIRED',
  'STALE_HUMAN_SELECTED_TYPOGRAPHY_ROUTE',
  'buildTypographySceneDeliveryPackage(scene, selection)',
  'currentPackages === items.length',
  'productionReady: false',
  '未選択Sceneをsilent skipしない',
  'Mac Actual / Human promotion / Scene-bound Release Gate',
]) {
  requireText(batch, token, `project batch contract missing: ${token}`);
}

for (const token of [
  'Typography package一括書き出し',
  'disabled={!routeReady}',
  '未選択/stale Sceneをsilent skipしません',
  'productionReady=NO',
  'listTypographyProductionSelections()',
  'MOTION_ZUKAN_COMPOSER_CHANGED_EVENT',
  'TYPOGRAPHY_PRODUCTION_SELECTION_CHANGED_EVENT',
]) {
  requireText(card, token, `project batch UI missing: ${token}`);
}

requireText(handoff, 'import { TypographyProjectDeliveryBatchCard }', "Scene handoff does not import project batch card");
requireText(handoff, '<TypographyProjectDeliveryBatchCard projectId={scene.projectId} />', "Scene handoff does not render project batch card");
requireText(scenePackage, 'actualEvidenceState: "NOT_RUN"', "Scene package no longer preserves NOT_RUN Actual evidence");
requireText(scenePackage, 'productionReady: false', "Scene package no longer fails closed for production readiness");

for (const forbidden of [
  'productionReady: true',
  'batchReadyForPalmierDaVinciHandoff: true',
  'filter((item) => item.status === "CURRENT_PACKAGE_READY").map',
]) {
  if (batch.includes(forbidden)) errors.push(`project batch can silently overclaim readiness: ${forbidden}`);
}

if (errors.length) {
  console.error(`Typography Project Delivery Batch contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Typography Project Delivery Batch contracts OK: every timeline Scene must have a current human-selected route before batch export, stale/missing routes block the batch, individual derived packages remain evidence-honest, and productionReady stays false.");
