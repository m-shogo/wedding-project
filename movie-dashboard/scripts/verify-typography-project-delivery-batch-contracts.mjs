import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const batch = read("src/data/typographyProjectDeliveryBatch.ts");
const card = read("src/components/TypographyProjectDeliveryBatchCard.tsx");
const revalidationCard = read("src/components/ProjectTypographyRoleHandoffRevalidationCard.tsx");
const handoff = read("src/components/MaskRevealSceneHandoffCard.tsx");
const scenePackage = read("src/data/typographySceneDeliveryPackage.ts");
const roleManifest = read("src/data/projectTypographyRoleHandoffManifest.ts");
const transitionStore = read("src/data/projectSceneTransitionSelectionStore.ts");
const transitionCard = read("src/components/RhythmSceneTransitionCorrectionCard.tsx");

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
  'STALE_HUMAN_SELECTED_TRANSITION',
  'resolveProjectSceneTransitions(',
  'transitions: transitions.map((transition) => ({...transition}))',
  'staleTransitions === 0',
  'buildTypographySceneDeliveryPackage(scene, selection)',
  'buildTypographySceneRoleDeliveryPackage(scene, selection, context.productionRole)',
  'currentPackages === items.length',
  'currentRoleContexts === items.length',
  'remotionElementIdentityVerification',
  'currentnessVerifiedByBatchBuild: false',
  'selectedPatternIds',
  'sceneBindings: identitySceneBindings',
  'artifactPath: firstIdentity?.shaBinding.artifactPath ?? null',
  'exportCommand: firstIdentity?.shaBinding.exportCommand ?? null',
  'projectBatchDownloadPath',
  '$HOME/Downloads/${projectId}-typography-production-batch.json',
  'projectRoleManifestDownloadPath',
  '$HOME/Downloads/${projectId}-production-role-handoff-manifest.json',
  'buildProjectRemotionIdentityProductionPrepCommand',
  '--phase=identity --batch=${batch}',
  '--phase=stage --batch=${batch} --role-manifest=${roleManifest}',
  'checkCommand: projectIdentityProductionPrepCommand',
  'external batch/role bindingを検証してからcanonical pathへatomic stageする',
  'mustRunBeforePalmierDaVinciHandoff: identitySceneBindings.length > 0',
  'identityVerificationState: TypographyProjectRemotionIdentityVerificationState = identitySceneBindings.length > 0 ? "NOT_RUN" : "NOT_APPLICABLE"',
  'remotionIdentityVerificationState: identityVerificationState',
  'batchReadyはproductionReadyもRemotion identity currentnessも意味せず',
  'productionReady: false',
  'stale context/transitionをsilent rebaseしない',
  'production prep identity/stage commandのCURRENTもRemotion Studio GUI Actual / Mac DaVinci Actual / Human promotion',
]) requireText(batch, token, `project batch contract missing: ${token}`);

for (const token of [
  'schemaVersion: "project-scene-transition-selection/v1"',
  'authority: "HUMAN_SELECTED_TRANSITION"',
  '"HARD_CUT"',
  '"CROSS_DISSOLVE"',
  '"STALE_HUMAN_SELECTION"',
  'fromRevision === fromScene.updatedAt',
  'toRevision === toScene.updatedAt',
  'MAX_CROSS_DISSOLVE_FRAMES = 30',
  'MIN_CROSS_DISSOLVE_FRAMES = 6',
]) requireText(transitionStore, token, `transition authority missing: ${token}`);

for (const token of [
  'HUMAN SCENE EDGE TRANSITION',
  'request.axis !== "TRANSITION"',
  'createProjectSceneTransitionSelection(',
  'saveProjectSceneTransitionSelection(',
  'Scene revisionが更新済みです',
  'Remotion Studio GUI Actual / Palmier GUI Actual / Mac DaVinci GUI Actual',
]) requireText(transitionCard, token, `transition correction UI missing: ${token}`);

for (const token of [
  'schemaVersion: "wedding-movie-project-role-handoff/v1"',
  'authority: "DERIVED_FROM_PROJECT_HANDOFF_AND_PERSISTED_HUMAN_ROLE_CONTEXT"',
  'studioGuiActual: "NOT_RUN"',
  'davinciGuiActual: "NOT_RUN"',
  'productionReady: false',
  'buildTypographyProjectDeliveryBatch(projectId, composer.scenes, timeline, selections, roleContexts)',
  'parseAndValidateProjectTypographyRoleHandoffManifest(',
  'PROJECT_ROLE_HANDOFF_ENVELOPE_MISMATCH',
  'PROJECT_ROLE_HANDOFF_AUTHORITY_MISMATCH',
  'PROJECT_ROLE_HANDOFF_PROJECT_MISMATCH',
  'PROJECT_ROLE_HANDOFF_MUST_NOT_CLAIM_ACTUAL_OR_PRODUCTION_READY',
  'STALE_OR_DRIFTED_PROJECT_ROLE_HANDOFF_MANIFEST',
  'canonicalJson(parsed) !== canonicalJson(expected)',
]) requireText(roleManifest, token, `role-aware project handoff missing: ${token}`);

for (const token of [
  'Typography package一括書き出し',
  '実制作handoff manifest',
  'disabled={!routeReady}',
  '未選択/stale Sceneをsilent skipしません',
  'productionReady=NO',
  'listTypographyProductionSelections()',
  'listTypographyProductionRoleContexts()',
  'buildTypographyProjectDeliveryBatch(projectId, composer.scenes, timeline, selections, roleContexts)',
  'buildTypographyProjectDeliveryBatchJson(projectId, composer.scenes, timeline, selections, roleContexts)',
  'buildProjectTypographyRoleHandoffManifest(projectId, composer, workspace, selections, roleContexts)',
  'buildProjectTypographyRoleHandoffManifestJson(projectId, composer, workspace, selections, roleContexts)',
  'TYPOGRAPHY_PRODUCTION_ROLE_CONTEXT_CHANGED_EVENT',
  'MOTION_ZUKAN_COMPOSER_CHANGED_EVENT',
  'TYPOGRAPHY_PRODUCTION_SELECTION_CHANGED_EVENT',
  'item.productionRole',
  'item.selectionClass',
  'item.roleContextStatus',
  'roleManifest.roleHandoff.studioGuiActual',
  'roleManifest.roleHandoff.davinciGuiActual',
  '${projectId}-production-role-handoff-manifest.json',
  'PROJECT REMOTION ELEMENT IDENTITY VERIFICATION',
  'const identityPlan = batch.remotionElementIdentityVerification',
  'Remotion identity {batch.summary.remotionIdentityVerificationState}',
  'identityPlan.selectedPatternIds',
  'identityPlan.sceneBindings',
  'identityPlan.artifactPath',
  'identityPlan.exportCommand',
  'identityPlan.checkCommand',
  'Project identity verification={identityPlan.state}',
  'batchReady / package export ≠ identity CURRENT ≠ Studio GUI Actual PASS ≠ DaVinci GUI Actual PASS',
]) requireText(card, token, `project batch UI missing: ${token}`);

for (const token of [
  'PROJECT ROLE HANDOFF / REVALIDATION',
  '実制作handoff再検証',
  'parseAndValidateProjectTypographyRoleHandoffManifest(',
  'listTypographyProductionSelections()',
  'listTypographyProductionRoleContexts()',
  'MOTION_ZUKAN_PRODUCTION_WORKSPACE_CHANGED_EVENT',
  'TYPOGRAPHY_PRODUCTION_ROLE_CONTEXT_CHANGED_EVENT',
  'Studio GUI Actual / DaVinci GUI Actualは実行していないためNOT_RUN',
  'Revalidation: {state}',
]) requireText(revalidationCard, token, `project role revalidation UI missing: ${token}`);

requireText(handoff, 'import { TypographyProjectDeliveryBatchCard }', "Scene handoff does not import project batch card");
requireText(handoff, '<TypographyProjectDeliveryBatchCard projectId={scene.projectId} />', "Scene handoff does not render project batch card");
requireText(handoff, 'import { ProjectTypographyRoleHandoffRevalidationCard }', "Scene handoff does not import project revalidation card");
requireText(handoff, '<ProjectTypographyRoleHandoffRevalidationCard projectId={scene.projectId} />', "Scene handoff does not render project revalidation card");
requireText(handoff, 'import { RhythmSceneTransitionCorrectionCard }', "Scene handoff does not import transition correction card");
requireText(handoff, '<RhythmSceneTransitionCorrectionCard scene={scene} />', "Scene handoff does not render transition correction card");
requireText(scenePackage, 'actualEvidenceState: "NOT_RUN"', "Scene package no longer preserves NOT_RUN Actual evidence");
requireText(scenePackage, 'productionReady: false', "Scene package no longer fails closed for production readiness");

for (const forbidden of ['productionReady: true', 'batchReadyForPalmierDaVinciHandoff: true', 'currentnessVerifiedByBatchBuild: true', 'filter((item) => item.status === "CURRENT_PACKAGE_READY").map']) {
  if (batch.includes(forbidden)) errors.push(`project batch can silently overclaim readiness: ${forbidden}`);
}
for (const forbidden of ['studioGuiActual: "PASS"', 'davinciGuiActual: "PASS"', 'productionReady: true']) {
  if (roleManifest.includes(forbidden)) errors.push(`role-aware project handoff fabricates production evidence: ${forbidden}`);
  if (card.includes(forbidden)) errors.push(`project batch UI fabricates production evidence: ${forbidden}`);
  if (revalidationCard.includes(forbidden)) errors.push(`project revalidation UI fabricates production evidence: ${forbidden}`);
}

if (errors.length) {
  console.error(`Typography Project Delivery Batch contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Typography Project Delivery Batch contracts OK: UI export requires current route + persisted role context + current Human transition bindings; stale Scene-edge transition selections fail closed, while identity currentness, Studio/DaVinci Actual, and productionReady remain unclaimed.");
