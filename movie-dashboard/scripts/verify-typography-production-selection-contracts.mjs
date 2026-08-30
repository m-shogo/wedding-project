import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const store = fs.readFileSync(path.join(root, "src/data/typographyProductionSelectionStore.ts"), "utf8");
const selector = fs.readFileSync(path.join(root, "src/components/TypographyProductionRouteSelector.tsx"), "utf8");
const handoff = fs.readFileSync(path.join(root, "src/components/MaskRevealSceneHandoffCard.tsx"), "utf8");
const routing = fs.readFileSync(path.join(root, "src/data/typographySceneProductionRouting.ts"), "utf8");
const routeGuide = fs.readFileSync(path.join(root, "src/data/typographyProductionRouteGuide.ts"), "utf8");
const routeGuideView = fs.readFileSync(path.join(root, "src/components/TypographyProductionRouteChoiceGuide.tsx"), "utf8");
const roleGuideView = fs.readFileSync(path.join(root, "src/components/TypographyProductionRoleGuide.tsx"), "utf8");
const errors = [];

const requireText = (source, token, message) => {
  if (!source.includes(token)) errors.push(message);
};

for (const token of [
  'TYPOGRAPHY_PRODUCTION_SELECTION_STORAGE_KEY',
  'motion-zukan-typography-production-selection-v1',
  'typography-production-selection-store/v1',
  'selection?.authority === "HUMAN_SELECTED"',
  'loadTypographyProductionSelection',
  'selection.sourceRevision !== scene.updatedAt',
  'saveTypographyProductionSelection',
  'createTypographyProductionSelection(scene, patternId, selectedAt)',
  'store.selections.filter((item) => item.sceneId !== scene.sceneId)',
  'clearTypographyProductionSelection',
  'pruneStaleTypographyProductionSelections',
  'revisions.get(selection.sceneId) === selection.sourceRevision',
]) {
  requireText(store, token, `Typography selection store missing contract: ${token}`);
}

for (const token of [
  'HUMAN SELECTED / TYPOGRAPHY ROUTE',
  'typographyProductionRoutes.map',
  'saveTypographyProductionSelection(scene, patternId)',
  'clearTypographyProductionSelection(scene.sceneId)',
  'loadTypographyProductionSelection(scene)',
  'buildTypographySceneProductionBundle(scene, selection)',
  'HUMAN_SELECTED ✓',
  'DAVINCI_ROUTE_SUMMARY',
  'DaVinci translator未実装',
  'Translator + Actual workflowあり / live未検証',
  'DaVinci live実装あり / Actual未確認',
  'DaVinci Actual検証済み',
  'DaVinci stage:',
  'Production ready: NO',
  '既存Sceneを勝手に別モーションへ変更しないため',
]) {
  requireText(selector, token, `Typography route selector missing contract: ${token}`);
}

for (const token of [
  'import { TypographyProductionRouteSelector } from "./TypographyProductionRouteSelector"',
  '<TypographyProductionRouteSelector scene={scene} />',
]) {
  requireText(handoff, token, `Scene handoff is not connected to Typography selection UI: ${token}`);
}

for (const token of [
  'authority: "HUMAN_SELECTED"',
  'STALE_TYPOGRAPHY_ROUTE_SELECTION',
  'productionReady: false',
  'actualAppliedEvidence: "NOT_RUN"',
  '"DAVINCI_ACTUAL_CANDIDATE"',
  '"DAVINCI_ACTUAL_VERIFIED"',
]) {
  requireText(routing, token, `Production routing lost selection/readiness honesty contract: ${token}`);
}

for (const patternId of [
  'type-mask-reveal',
  'type-char-stagger',
  'type-type-on-rhythm',
  'type-word-punch',
  'type-tracking-burst',
  'type-vertical-wipe',
  'type-outline-fill',
  'type-baseline-hop',
  'type-triplet',
]) {
  requireText(routeGuide, `"${patternId}"`, `Human route choice guide missing ${patternId}`);
}

for (const token of [
  'motionSignatureJa',
  'bestForJa',
  'avoidWhenJa',
  'energy:',
  'rhythm:',
  'getTypographyProductionRouteGuide',
]) {
  requireText(routeGuide, token, `Human route choice guide missing decision field: ${token}`);
}

for (const token of [
  '強さ {energyLabel[guide.energy]}',
  '動き {rhythmLabel[guide.rhythm]}',
  '向く: {guide.bestForJa}',
  '避ける: {guide.avoidWhenJa}',
]) {
  requireText(routeGuideView, token, `Typography route guide UI missing decision aid: ${token}`);
}

for (const token of [
  'TypographyProductionRouteChoiceGuide',
  'patternId={item.primaryPatternId as TypographyProductionPatternId}',
  '用途・強さ・避ける場面は選択補助です',
  'Actual NOT_RUN',
]) {
  requireText(roleGuideView, token, `Production role guide missing practical route-choice surface: ${token}`);
}

if (/default.*type-mask-reveal/i.test(selector) || /saveTypographyProductionSelection\(scene,\s*"type-mask-reveal"/.test(selector)) {
  errors.push("Selection UI must not silently persist Mask Reveal as a human choice");
}
if (/studioInstallActual:\s*"PASS"/.test(store) || /actualAppliedEvidence:\s*"PASS"/.test(store)) {
  errors.push("Selection storage must not carry fabricated Actual evidence");
}
if (!store.includes('if (selection.sourceRevision !== scene.updatedAt) return null;')) {
  errors.push("Stale persisted Typography route selection must fail closed on load");
}
if (!selector.includes('DAVINCI_ROUTE_SUMMARY[route.davinciRouteStatus]')) {
  errors.push("Selection UI must derive the human-readable DaVinci stage from the route truth instead of a two-state shortcut");
}
if (/saveTypographyProductionSelection|createTypographyProductionSelection|productionReady:\s*true|Actual PASS/.test(routeGuide)) {
  errors.push("Human route choice guide must remain advisory and must not select a route or promote production/Actual evidence");
}

if (errors.length) {
  console.error(`Typography Production Selection contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Typography Production Selection contracts OK: a human can explicitly choose one of nine production routes per adopted Scene; the choice remains revision-bound and evidence-safe, while the production role guide now explains motion character, suitable usage, avoid-cases, energy and rhythm without auto-selecting a route or fabricating Studio/DaVinci Actual.");
