import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = path.resolve(process.cwd());
const data = fs.readFileSync(path.join(root, "src/data/weddingRealMediaPreviewReview.ts"), "utf8");
const component = fs.readFileSync(path.join(root, "src/components/WeddingRealMediaPreviewReviewPanel.tsx"), "utf8");
const page = fs.readFileSync(path.join(root, "src/pages/MotionZukanWorkspaceHandoff.tsx"), "utf8");

function requireContract(condition, message) {
  if (!condition) throw new Error(`Wedding real-media preview review contract failed: ${message}`);
}

requireContract(data.includes('openingProductionStatus.stages.cropReview.state === "PASS"'), "Opening preview must require current Human crop review before rendering");
requireContract(data.includes('profileProductionStatus.readiness.assemblyReady === true'), "Profile preview must require production assembly readiness");
requireContract(data.includes('profileRealMediaReviewGate'), "Profile Human review state must come from canonical generated gate");
requireContract(data.includes('humanReviewRequired: true'), "Preview review must remain explicitly Human");
requireContract(data.includes('expectedCount: 11'), "Opening surface must preserve the 11-photo production expectation");
requireContract(data.includes('mediaExpected'), "Profile surface must preserve generated expected media count");

requireContract(component.includes("PREVIEW_COMMAND_COPIED != PREVIEW_RENDERED"), "UI must not equate copied commands with executed renders");
requireContract(component.includes("PREVIEW_RENDERED != HUMAN_REVIEW_PASS"), "UI must keep render and Human review separate");
requireContract(component.includes("HUMAN_REVIEW_PASS != GUI_ACTUAL_PASS"), "UI must keep Human review and GUI Actual separate");
requireContract(component.includes("Remotion Studio GUI Actual: <strong>NOT_RUN</strong>"), "Studio GUI Actual must remain NOT_RUN");
requireContract(component.includes("Mac DaVinci GUI Actual: <strong>NOT_RUN</strong>"), "DaVinci GUI Actual must remain NOT_RUN");
requireContract(component.includes("disabled={!project.canRenderPreview}"), "preview render command must be disabled until upstream gate passes");
requireContract(component.includes("disabled={!project.canStartHumanReview}"), "Human review commands must be disabled until preview exists/current");
requireContract(page.includes("<WeddingRealMediaPreviewReviewPanel />"), "Motion Zukan workspace must expose preview review launch surface");

console.log("Wedding real-media preview review contracts: PASS");
