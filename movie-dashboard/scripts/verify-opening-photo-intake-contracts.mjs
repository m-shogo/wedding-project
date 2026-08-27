import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const page = fs.readFileSync(path.join(root, "src/pages/OpeningPhotoIntake.tsx"), "utf8");
const app = fs.readFileSync(path.join(root, "src/App.tsx"), "utf8");
const gatePanel = fs.readFileSync(path.join(root, "src/components/OpeningProductionGatePanel.tsx"), "utf8");
const handoffButton = fs.readFileSync(path.join(root, "src/components/OpeningProductionHandoffExportButton.tsx"), "utf8");
const handoff = fs.readFileSync(path.join(root, "src/data/openingProductionStatusHandoff.ts"), "utf8");
const localMediaValidator = fs.readFileSync(path.join(root, "src/components/LocalMediaIntakeValidator.tsx"), "utf8");
const errors = [];

const canonicalSlots = ["okinawa-01","okinawa-02","okinawa-03","seoul-01","seoul-02","seoul-03","hawaii-01","hawaii-02","hawaii-03","hero-01","hero-02"];
for (const slot of canonicalSlots) if (!page.includes(`"${slot}"`)) errors.push(`photo intake brief missing canonical slot: ${slot}`);

for (const token of ["openingProductionGate","motion-studio/public/photos/opening/","pnpm sync:photos","pnpm check:opening-photos:strict","pnpm opening:preflight","pnpm sync:opening-gate","pnpm render:opening-v1:preview","LocalMediaIntakeValidator","localValidationSlots","11写真をコピーする前にcanonical名を一括検査"]) {
  if (!page.includes(token)) errors.push(`photo intake workflow missing: ${token}`);
}
for (const token of ["LOCAL PRECHECK / NO UPLOAD","multiple",".jpg,.jpeg,.png,.webp,.mp4,.mov,.webm","canonicalStem","extensionAllowed","unexpected","invalidExtension","duplicates","NAMES READY","LOCAL_NAME_CHECK_PASS != FILE_COPIED / FILE_COPIED != PRODUCTION_READY"]) {
  if (!localMediaValidator.includes(token)) errors.push(`local media intake validator missing: ${token}`);
}
for (const token of ["OpeningProductionHandoffExportButton","<OpeningProductionHandoffExportButton />","<OpeningProductionHandoffExportButton compact />"]) if (!gatePanel.includes(token)) errors.push(`Opening production gate handoff export missing: ${token}`);
for (const token of ["buildOpeningProductionStatusHandoffJson","downloadText","opening-v1-production-handoff.json","OPENING PRODUCTION HANDOFF","11写真・BGM/ambience・critical path・Palmier / DaVinci状態を1 JSONへ","BLOCKED / NOT_RUN","export自体はproductionReadyへの昇格ではありません"]) if (!handoffButton.includes(token)) errors.push(`Opening production handoff export control missing: ${token}`);
for (const token of ["photoSlots: openingProductionGate.photoSlots.map",'intakeDirectory: "motion-studio/public/photos/opening/"',"bgm: {...openingProductionGate.bgm}","ambience: openingProductionGate.ambience.map","criticalPath: criticalPath.projects.opening","palmierHandoff: openingProductionStatus.handoff.palmier","davinciHandoff: openingProductionStatus.handoff.davinci"]) if (!handoff.includes(token)) errors.push(`Opening production handoff payload missing: ${token}`);

if (!page.includes("RESOLVED/MISSINGは自己申告ではなく")) errors.push("photo intake must state that progress comes from real source state");
if (!page.includes("AIで人物を作り直さない")) errors.push("photo intake must preserve the no-AI-person rule");
if (!app.includes('path="opening-photo-intake"')) errors.push("Opening Photo Intake route missing");
if (!gatePanel.includes('to="/opening-photo-intake"')) errors.push("Production Gate must deep-link to Opening Photo Intake");
if (handoffButton.includes("productionReady: true")) errors.push("Opening handoff export must not fabricate production readiness");
if (localMediaValidator.includes("upload(")) errors.push("local filename precheck must not upload media");

if (errors.length > 0) {
  console.error(`Opening Photo Intake contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`Opening Photo Intake contracts OK: ${canonicalSlots.length} canonical slots / local no-upload filename precheck / full sync-preview handoff / production-status JSON export.`);
