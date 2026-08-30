import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const delivery = read("src/data/typographySceneDeliveryPackage.ts");
const card = read("src/components/TypographySceneDeliveryPackageCard.tsx");
const roleStore = read("src/data/typographyProductionRoleContextStore.ts");
const roleDelivery = read("src/data/typographySceneRoleDeliveryPackage.ts");
const handoff = read("src/components/MaskRevealSceneHandoffCard.tsx");
const routing = read("src/data/typographySceneProductionRouting.ts");
const registry = read("src/data/typographyDaVinciActualWorkflowRegistry.ts");
const identityReference = read("src/data/remotionElementHandoffIdentityReference.ts");

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
  '"VERIFY_REMOTION_ELEMENT_HANDOFF_IDENTITY"',
  '"EXPORT_PALMIER_TIMELINE_WITH_MARKER"',
  '"APPLY_DAVINCI_TRANSLATOR"',
  '"CAPTURE_MAC_ACTUAL_EVIDENCE"',
  '"RUN_HUMAN_PROMOTION_REVIEW"',
  '"EVALUATE_SCENE_BOUND_RELEASE_GATE"',
  '"CURRENT_REMOTION_ELEMENT_HANDOFF_IDENTITY"',
  '"MAC_ACTUAL_EVALUATION"',
  '"HUMAN_PROMOTION_REVIEW"',
  '"SCENE_BOUND_RELEASE_GATE"',
  'buildTypographySceneProductionBundle(scene, selection)',
  'buildMaskRevealSceneProductionBundle(scene)',
  'buildRemotionElementCandidateHandoffIdentityReference(scene.projectId, selection.patternId)',
  'handoffIdentity,',
  'remotionElementIdentityArtifactPath: handoffIdentity.shaBinding.artifactPath',
  'remotionElementIdentityCheckCommand: handoffIdentity.shaBinding.checkCommand',
  'currentnessMustBeCheckedBeforeSceneHandoffUse',
  'TYPOGRAPHY_SCENE_DELIVERY_REMOTION_HANDOFF_IDENTITY_MISMATCH',
  'TYPOGRAPHY_SCENE_DELIVERY_REMOTION_IDENTITY_MUST_NOT_CLAIM_GUI_ACTUAL',
  'getTypographyDaVinciActualWorkflow(patternId)',
  'parseAndValidateTypographySceneDeliveryPackage(',
  'STALE_TYPOGRAPHY_SCENE_DELIVERY_PACKAGE',
  'TYPOGRAPHY_SCENE_DELIVERY_ROUTE_MISMATCH',
  'TYPOGRAPHY_SCENE_DELIVERY_MUST_NOT_EMBED_ACTUAL_PASS',
  'TYPOGRAPHY_SCENE_DELIVERY_MUST_NOT_EMBED_RELEASE',
]) requireText(delivery, token, `delivery package contract missing: ${token}`);

for (const token of [
  'wedding-remotion-element-handoff-identities/v2',
  'buildRemotionElementCandidateHandoffIdentityReference',
  'SHA_BOUND_WEDDING_REMOTION_ELEMENT_CATALOG_IDENTITY_REFERENCE',
  'CATALOG_IDENTITY_REFERENCE != WEDDING_PROJECT_ADOPTED',
  'SCENE_SELECTED_ELEMENT_REQUIRES_CURRENT_SHA_BOUND_CATALOG_IDENTITY',
  'macRemotionStudioGuiActual: "NOT_RUN"',
  'macDaVinciGuiActual: "NOT_RUN"',
]) requireText(identityReference, token, `Remotion scene identity reference missing: ${token}`);

for (const token of [
  "Production packageを書き出す",
  "Role handoffを書き出す",
  "Package再検証",
  "Package revalidation:",
  "package出力 ≠ production release",
  "Scene更新後の古いpackage/Role contextは拒否",
  "PERSISTED HUMAN CONTEXT",
  "saveTypographyProductionRoleContext(scene, selection, guide.role)",
  "loadTypographyProductionRoleContext(scene, selection)",
  "Mac Actual",
  "Current stop:",
  "delivery.execution.order.join",
  "delivery.files.palmierTimelineXmlFileName",
  "delivery.timeline.sceneMarkerId",
]) requireText(card, token, `delivery package UI missing: ${token}`);

for (const token of [
  'schemaVersion: "typography-production-role-context/v1"',
  'authority: "HUMAN_SELECTED_ROLE_CONTEXT"',
  'context.sourceRevision === scene.updatedAt',
  'context.patternId === selection.patternId',
  'context.routeSelectedAt === selection.selectedAt',
  'TYPOGRAPHY_ROLE_CONTEXT_REQUIRES_CURRENT_ROUTE_SELECTION',
]) requireText(roleStore, token, `persisted role context contract missing: ${token}`);

for (const token of [
  'schemaVersion: "wedding-movie-typography-role-delivery/v1"',
  'studioGuiActual: "NOT_RUN"',
  'davinciGuiActual: "NOT_RUN"',
  'productionReady: false',
]) requireText(roleDelivery, token, `role delivery honesty contract missing: ${token}`);

requireText(handoff, 'import { TypographySceneDeliveryPackageCard }', "Scene handoff does not import delivery package card");
requireText(handoff, '<TypographySceneDeliveryPackageCard scene={scene} />', "Scene handoff does not render delivery package card");

for (const patternId of ["type-mask-reveal", "type-char-stagger", "type-type-on-rhythm", "type-word-punch", "type-tracking-burst", "type-vertical-wipe", "type-outline-fill", "type-baseline-hop", "type-triplet"]) {
  requireText(routing, `"${patternId}"`, `production routing missing ${patternId}`);
  if (patternId !== "type-mask-reveal") requireText(registry, `patternId: "${patternId}"`, `Actual workflow registry missing ${patternId}`);
}

for (const forbidden of ['actualEvidenceState: "PASS"', 'productionReady: true', 'releaseDecisionEmbedded: true', 'xmlGeneratedExternally: false']) {
  if (delivery.includes(forbidden)) errors.push(`delivery package fabricates production evidence: ${forbidden}`);
}
for (const forbidden of ['studioGuiActual: "PASS"', 'davinciGuiActual: "PASS"', 'productionReady: true']) {
  if (roleDelivery.includes(forbidden)) errors.push(`role delivery fabricates production evidence: ${forbidden}`);
}

if (errors.length) {
  console.error(`Typography Scene Delivery Package contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Typography Scene Delivery Package contracts OK: Human Master + current route + catalog-wide SHA-bound Remotion Element identity + revision-bound Human role context are bundled without fabricating Studio/DaVinci Actual or production release evidence.");
