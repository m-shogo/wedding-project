import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const page = fs.readFileSync(path.join(root, "src/pages/OpeningBgmIntake.tsx"), "utf8");
const app = fs.readFileSync(path.join(root, "src/App.tsx"), "utf8");
const gate = fs.readFileSync(path.join(root, "src/components/OpeningProductionGatePanel.tsx"), "utf8");
const handoffButton = fs.readFileSync(path.join(root, "src/components/OpeningProductionHandoffExportButton.tsx"), "utf8");
const effectiveExport = fs.readFileSync(path.join(root, "src/lib/effectiveProductionHandoffExport.ts"), "utf8");
const errors = [];

for (const token of [
  "openingProductionGate",
  "opening-bgm-main",
  "motion-studio/public/audio/opening/bgm-main.mp3",
  "motion-studio/out/intake/opening-bgm-intake.json",
  "scripts/intake-production-bgm.mts --project opening",
  "--apply --receipt out/intake/opening-bgm-intake.json",
  "scripts/verify-production-bgm-intake-receipt.mts --project opening",
  "pnpm check:opening-sound",
  "pnpm check:opening-sound:strict",
  "pnpm sync:opening-gate",
  "pnpm render:opening-v1:preview",
  "OpeningProductionHandoffExportButton",
  "<OpeningProductionHandoffExportButton />",
  "<OpeningProductionHandoffExportButton compact />",
  "DRY_RUN_PASS != FILE_COPIED",
  "RECEIPT_CURRENT != RIGHTS_CLEARED",
  "FILE_FOUND != RECEIPT_CURRENT",
  "HANDOFF_EXPORTED != PRODUCTION_READY",
  "CI_MUST_NOT_PROMOTE_MAC_GUI_ACTUAL",
]) {
  if (!page.includes(token)) errors.push(`BGM intake workflow missing: ${token}`);
}

for (const token of [
  "buildOpeningEffectiveProductionHandoffJson",
  "opening-v1-production-handoff.json",
  "OPENING PRODUCTION HANDOFF",
  "BLOCKED / NOT_RUN",
  "effective authority",
]) {
  if (!handoffButton.includes(token)) errors.push(`Opening BGM handoff export control missing: ${token}`);
}
for (const token of [
  "buildOpeningProductionStatusHandoff",
  'effectiveProduction: buildOverlay("opening")',
  "CANONICAL_HANDOFF_REMAINS_SOURCE_OF_WEDDING_MEDIA_AND_STAGE_EVIDENCE",
  "EFFECTIVE_OVERLAY_EXPORTED != EFFECTIVE_GATE_COMPLETED",
]) {
  if (!effectiveExport.includes(token)) errors.push(`Opening BGM effective handoff overlay missing: ${token}`);
}

for (const principle of [
  "会場上映",
  "音源の入手元",
  "canonical intake receipt",
  "SNS / 配布は別判断",
  "確認Evidenceを残す",
]) {
  if (!page.includes(principle)) errors.push(`BGM rights/provenance principle missing: ${principle}`);
}

if (!page.includes("AIが権利確認を推測してcandidate / approved / finalへ勝手に変更しません")) {
  errors.push("BGM intake must preserve the human rights-confirmation gate");
}
if (!page.includes("Receiptは「正しくcopyされた」証拠であって権利承認ではありません")) {
  errors.push("BGM receipt must not be represented as rights approval");
}
if (page.includes("mkdir -p motion-studio/public/audio/opening") || page.includes("権利確認済み音源を motion-studio/public/audio/opening/bgm-main.mp3 として配置")) {
  errors.push("Opening BGM intake must not route users through direct manual target copy");
}
if (!app.includes('path="opening-bgm-intake"')) {
  errors.push("Opening BGM Intake route missing");
}
if (!gate.includes('to="/opening-bgm-intake"')) {
  errors.push("Production Gate must deep-link to Opening BGM Intake");
}
if (!gate.includes('to="/opening-photo-intake"')) {
  errors.push("BGM integration must not remove Opening Photo Intake link");
}
if (!gate.includes("OpeningProductionHandoffExportButton")) {
  errors.push("Opening production gate must surface canonical + effective handoff export");
}
if (handoffButton.includes("productionReady: true") || effectiveExport.includes("productionReady: true")) {
  errors.push("Opening handoff export must not fabricate production readiness");
}

if (errors.length > 0) {
  console.error(`Opening BGM Intake contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Opening BGM Intake contracts OK: source-preserving receipt-bound intake, Human rights promotion, strict-gate, preview handoff and canonical + effective production JSON export preserved.");
