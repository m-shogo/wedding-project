import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const batch = read("src/data/typographyProjectDeliveryBatch.ts");
const card = read("src/components/TypographyProjectDeliveryBatchCard.tsx");
const handoff = read("src/components/MaskRevealSceneHandoffCard.tsx");
const scenePackage = read("src/data/typographySceneDeliveryPackage.ts");
const roleManifest = read("src/data/projectTypographyRoleHandoffManifest.ts");

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
  '"CURRENT_ROLE_CONTEXT"',
  '"MISSING_ROLE_CONTEXT"',
  '"STALE_ROLE_CONTEXT"',
  'HUMAN_SELECTED_TYPOGRAPHY_ROUTE_REQUIRED',
  'STALE_HUMAN_SELECTED_TYPOGRAPHY_ROUTE',
  'HUMAN_SELECTED_TYPOGRAPHY_ROLE_REQUIRED',
  'STALE_HUMAN_SELECTED_TYPOGRAPHY_ROLE',
  'buildTypographySceneDeliveryPackage(scene, selection)',
  'buildTypographySceneRoleDeliveryPackage(scene, selection, context.productionRole)',
  'currentPackages === items.length',
  'currentRoleContexts === items.length',
  'productionReady: false',
  'stale contextをsilent rebaseしない',
  'Mac Actual / Human promotion / Scene-bound Release Gate',
]) requireText(batch, token, `project batch contract missing: ${token}`);

for (const token of [
  'schemaVersion: "wedding-movie-project-role-handoff/v1"',
  'authority: "DERIVED_FROM_PROJECT_HANDOFF_AND_PERSISTED_HUMAN_ROLE_CONTEXT"',
  'studioGuiActual: "NOT_RUN"',
  'davinciGuiActual: "NOT_RUN"',
  'productionReady: false',
  'buildTypographyProjectDeliveryBatch(projectId, composer.scenes, timeline, selections, roleContexts)',
]) requireText(roleManifest, token, `role-aware project handoff missing: ${token}`);

for (const token of [
  'Typography package一括書き出し',
  'disabled={!routeReady}',
  '未選択/stale Sceneをsilent skipしません',
  'productionReady=NO',
  'listTypographyProductionSelections()',
  'MOTION_ZUKAN_COMPOSER_CHANGED_EVENT',
  'TYPOGRAPHY_PRODUCTION_SELECTION_CHANGED_EVENT',
]) requireText(card, token, `project batch UI missing: ${token}`);

requireText(handoff, 'import { TypographyProjectDeliveryBatchCard }', "Scene handoff does not import project batch card");
requireText(handoff, '<TypographyProjectDeliveryBatchCard projectId={scene.projectId} />', "Scene handoff does not render project batch card");
requireText(scenePackage, 'actualEvidenceState: "NOT_RUN"', "Scene package no longer preserves NOT_RUN Actual evidence");
requireText(scenePackage, 'productionReady: false', "Scene package no longer fails closed for production readiness");

for (const forbidden of ['productionReady: true', 'batchReadyForPalmierDaVinciHandoff: true', 'filter((item) => item.status === "CURRENT_PACKAGE_READY").map']) {
  if (batch.includes(forbidden)) errors.push(`project batch can silently overclaim readiness: ${forbidden}`);
}
for (const forbidden of ['studioGuiActual: "PASS"', 'davinciGuiActual: "PASS"', 'productionReady: true']) {
  if (roleManifest.includes(forbidden)) errors.push(`role-aware project handoff fabricates production evidence: ${forbidden}`);
}

if (errors.length) {
  console.error(`Typography Project Delivery Batch contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Typography Project Delivery Batch contracts OK: current human route + persisted role context can be required for project handoff, stale/missing context fails closed, and Studio/DaVinci Actual plus productionReady remain unclaimed.");
