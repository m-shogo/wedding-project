import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const evidence = fs.readFileSync(path.join(root, "src/data/maskRevealDaVinciAppliedEvidence.ts"), "utf8");
const bundle = fs.readFileSync(path.join(root, "src/data/maskRevealSceneProductionBundle.ts"), "utf8");
const runbook = fs.readFileSync(path.join(root, "../docs/runbooks/2026-08-25-mask-reveal-davinci-applied-evidence-gate.md"), "utf8");
const propertyDecision = fs.readFileSync(path.join(root, "../docs/decisions/2026-08-26-motion-zukan-property-stack-customization.md"), "utf8");
const errors = [];

function requireText(source, token, message) {
  if (!source.includes(token)) errors.push(message);
}

for (const token of [
  'schemaVersion: "davinci-applied-evidence/v1"',
  'authority: "EVIDENCE_ONLY"',
  'status: "PENDING_LOCAL_DAVINCI"',
  'schemaVersion: "davinci-applied-readback/v1"',
  'schemaVersion: "davinci-applied-comparison/v1"',
  'expectedSource: "CANONICAL_SCENE_STATE_WITH_LIVE_PROJECT_CONTEXT"',
  'activePropertyUnits: ["Transform", "Mask"]',
  'propertyLocalReview: MaskRevealPropertyLocalReviewV1',
  'propertyLocalIntegrity: boolean | null',
  'sourceRevision: scene.updatedAt',
  'DaVinci readback is STALE for the current SceneInstance revision',
  'buildMaskRevealDaVinciValueBridge(scene.editableIntent, readback.projectContext)',
  'lockedPreserved: readback.lockedPreserved',
  'propertyLocalReviewCaptured',
  'productionReady: false',
  'renderTested: false',
  'visualQa1x: false',
  'visualQaHalfSpeed: false',
  'never write readback values back into HUMAN_SELECTED/LOCKED automatically',
]) requireText(evidence, token, `Applied evidence contract missing: ${token}`);

for (const token of [
  'createMaskRevealDaVinciAppliedEvidenceTemplate',
  'appliedEvidence: ReturnType<typeof createMaskRevealDaVinciAppliedEvidenceTemplate>',
  'const davinciAppliedEvidence = createMaskRevealDaVinciAppliedEvidenceTemplate(scene)',
  'appliedEvidence: davinciAppliedEvidence',
  'humanMaster: false',
  'xmlGeneratedExternally: true',
]) requireText(bundle, token, `Scene production bundle lost evidence/truth boundary: ${token}`);

for (const token of [
  'docs/decisions/2026-08-26-motion-zukan-property-stack-customization.md',
  'Transform',
  'Mask',
  'Preset First → Property-local Override → DaVinci Final Precision.',
  'sourceRevision = SceneInstance.updatedAt',
  'CANONICAL_SCENE_STATE_WITH_LIVE_PROJECT_CONTEXT',
  'propertyLocalIntegrity=false',
  'Seconds remain Human Master.',
  'VML_MASK_REVEAL_<SECTION>_<SCENE_TOKEN>',
  'productionReady` remains false',
]) requireText(runbook, token, `Applied evidence runbook missing: ${token}`);

for (const token of [
  'Property-local override',
  'Preset First → Property-local Override → DaVinci Final Precision.',
  '- Transform',
  '- Mask',
  'ユーザーが1項目だけ変更した場合、他のPreset値までCustom化しない。',
]) requireText(propertyDecision, token, `Property Stack authority missing: ${token}`);

if (/productionReady:\s*true/.test(evidence)) {
  errors.push("Applied-value readback must not promote productionReady before Actual render/visual QA");
}
if (/renderTested:\s*true/.test(evidence) || /visualQa1x:\s*true/.test(evidence) || /visualQaHalfSpeed:\s*true/.test(evidence)) {
  errors.push("Applied-value evidence must not invent render/visual QA success before local DaVinci evidence exists");
}
if (!evidence.includes('readback.sourceRevision !== scene.updatedAt')) {
  errors.push("Applied-value comparison must reject stale SceneInstance revisions");
}
if (!evidence.includes('readback.projectContext')) {
  errors.push("Applied-value comparison must derive expected values from live Project Context");
}

if (errors.length) {
  console.error(`Mask Reveal DaVinci Applied Evidence contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Mask Reveal DaVinci Applied Evidence contracts OK: Human/Canonical state remains authority, live Resolve context derives expected values, stale revisions are rejected, Transform/Mask property-local integrity is reviewable, and readback cannot prematurely claim Actual render or Production Ready.");
