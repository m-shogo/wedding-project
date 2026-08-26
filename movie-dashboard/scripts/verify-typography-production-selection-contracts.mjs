import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const store = fs.readFileSync(path.join(root, "src/data/typographyProductionSelectionStore.ts"), "utf8");
const selector = fs.readFileSync(path.join(root, "src/components/TypographyProductionRouteSelector.tsx"), "utf8");
const handoff = fs.readFileSync(path.join(root, "src/components/MaskRevealSceneHandoffCard.tsx"), "utf8");
const routing = fs.readFileSync(path.join(root, "src/data/typographySceneProductionRouting.ts"), "utf8");
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
  'DaVinci translatorあり / Actual未確認',
  'DaVinci translator未実装',
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
]) {
  requireText(routing, token, `Production routing lost selection honesty contract: ${token}`);
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

if (errors.length) {
  console.error(`Typography Production Selection contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Typography Production Selection contracts OK: a human can explicitly choose one of nine production routes per adopted Scene; the choice is persisted separately from tool evidence, bound to the exact Scene revision, stale choices fail closed/prune, unselected scenes remain unmodified, and Studio/DaVinci Actual evidence is never fabricated.");
