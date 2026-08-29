import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const gate = read("src/data/typographyDaVinciProductionReleaseGate.ts");
const ui = read("src/components/TypographyDaVinciProductionReleaseGate.tsx");
const sceneBinding = read("src/components/TypographyDaVinciProductionReleaseGateForScene.tsx");
const handoff = read("src/components/MaskRevealSceneHandoffCard.tsx");
const selectionStore = read("src/data/typographyProductionSelectionStore.ts");
const humanReview = read("src/data/typographyDaVinciHumanPromotionReview.ts");
const errors = [];
const requireText = (source, token, message) => {if (!source.includes(token)) errors.push(message);};

for (const token of [
  '"HOLD" | "RELEASE"',
  'schemaVersion: "typography-davinci-production-release-gate/v1"',
  'authority: "HUMAN_PRODUCTION_RELEASE_DECISION"',
  'sceneId: scene.sceneId',
  'sourceRevision: scene.updatedAt',
  'patternId: selection.patternId',
  'selectionSelectedAt: selection.selectedAt',
  'promotionSource: {...report.sourceSession}',
  'decision: "HOLD"',
  'releaseReviewer: null',
  'releasedAt: null',
  'STALE_TYPOGRAPHY_ROUTE_SELECTION',
  'RELEASE_GATE_SCHEMA_VERSION_MISMATCH',
  'RELEASE_GATE_AUTHORITY_MISMATCH',
  'PROMOTION_SOURCE_IDENTITY_MISMATCH',
  'STALE_SCENE_OR_ROUTE_SELECTION',
  'RELEASE_PATTERN_MISMATCH',
  'HUMAN_PROMOTION_NOT_VERIFIED_FOR_SELECTED_PATTERN',
  'RELEASE_DECISION_INVALID',
  'RELEASE_REQUIRES_REVIEWER',
  'RELEASE_REQUIRES_RELEASED_AT',
  'evaluateTypographyDaVinciHumanPromotionReview',
  'promotionItem?.humanPromoted === true',
  'gate.scene.selectionSelectedAt === selection.selectedAt',
  'gate.scene.sourceRevision === scene.updatedAt',
  'gate.scene.patternId === selection.patternId',
  'productionReady',
  'parseAndEvaluateTypographyDaVinciProductionReleaseGate',
]) requireText(gate, token, `Production release gate contract missing: ${token}`);

for (const token of [
  'Production Release Gate',
  'Scene revision bound',
  'Sceneを編集・routeを選び直した時点で古いRELEASEは失効します。',
  'ACTUAL_EVALUATION_REPORT_ENVELOPE_MISMATCH',
  'HUMAN_PROMOTION_REVIEW_ENVELOPE_MISMATCH',
  'HOLD release gate templateを保存',
  'Release gateを再読込',
  'selection: {evaluation.selectionFresh ? "FRESH" : "STALE"}',
  'promotion: {evaluation.humanPromotionVerified ? "VERIFIED" : "BLOCKED"}',
  'PRODUCTION: {evaluation.productionReady ? "READY" : "BLOCKED"}',
  'templateは必ずHOLD。',
  'Mac Actualを実行していない現状では本番Readyにはなりません。',
]) requireText(ui, token, `Production release gate UI missing: ${token}`);

for (const token of [
  'loadTypographyProductionSelection',
  'TYPOGRAPHY_PRODUCTION_SELECTION_CHANGED_EVENT',
  '[scene.sceneId, scene.updatedAt, revision]',
  'if (!selection)',
  '<TypographyDaVinciProductionReleaseGate scene={scene} selection={selection} />',
]) requireText(sceneBinding, token, `Scene-bound release gate adapter missing: ${token}`);

for (const token of [
  'import { TypographyDaVinciProductionReleaseGateForScene } from "./TypographyDaVinciProductionReleaseGateForScene"',
  '<TypographyDaVinciProductionReleaseGateForScene scene={scene} />',
]) requireText(handoff, token, `Scene handoff does not surface production release gate: ${token}`);

for (const token of [
  'selection.sourceRevision !== scene.updatedAt',
  'pruneStaleTypographyProductionSelections',
]) requireText(selectionStore, token, `Release gate relies on missing selection freshness boundary: ${token}`);

for (const token of [
  'humanPromoted',
  'releaseGateRequired: true',
  'productionReady: false',
]) requireText(humanReview, token, `Human promotion → release boundary missing: ${token}`);

if (/decision:\s*"RELEASE"/.test(gate.split("buildTypographyDaVinciProductionReleaseGateTemplate")[1]?.split("const promotionIdentityMatches")[0] ?? "")) {
  errors.push("Production release template must default HOLD, never RELEASE");
}
if (!gate.includes('decision: "HOLD"')) errors.push("Production release template must explicitly default HOLD");

for (const token of [
  'issues.length === 0',
  'selectionFresh &&',
  'patternMatchesCurrentSelection &&',
  'humanPromotionVerified &&',
  'releaseDecisionComplete;',
]) requireText(gate, token, `productionReady is missing fail-closed release guard: ${token}`);

if (errors.length) {
  console.error(`Typography DaVinci Production Release Gate contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log("Typography DaVinci Production Release Gate contracts OK: templates default HOLD, RELEASE is bound to the exact current Scene revision/route selection and verified Human promotion, the UI is reachable from Scene handoff and follows route-selection changes, and stale Scene or route changes fail closed before productionReady can become true.");
