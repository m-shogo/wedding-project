import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const page = fs.readFileSync(path.join(root, "src/pages/OpeningPhotoIntake.tsx"), "utf8");
const app = fs.readFileSync(path.join(root, "src/App.tsx"), "utf8");
const gatePanel = fs.readFileSync(path.join(root, "src/components/OpeningProductionGatePanel.tsx"), "utf8");
const errors = [];

const canonicalSlots = [
  "okinawa-01",
  "okinawa-02",
  "okinawa-03",
  "seoul-01",
  "seoul-02",
  "seoul-03",
  "hawaii-01",
  "hawaii-02",
  "hawaii-03",
  "hero-01",
  "hero-02",
];

for (const slot of canonicalSlots) {
  if (!page.includes(`"${slot}"`)) errors.push(`photo intake brief missing canonical slot: ${slot}`);
}

for (const token of [
  "openingProductionGate",
  "motion-studio/public/photos/opening/",
  "pnpm sync:photos",
  "pnpm check:opening-photos:strict",
  "pnpm opening:preflight",
  "pnpm sync:opening-gate",
  "pnpm render:opening-v1:preview",
]) {
  if (!page.includes(token)) errors.push(`photo intake workflow missing: ${token}`);
}

if (!page.includes("RESOLVED/MISSINGは自己申告ではなく")) {
  errors.push("photo intake must state that progress comes from real source state");
}
if (!page.includes("AIで人物を作り直さない")) {
  errors.push("photo intake must preserve the no-AI-person rule");
}
if (!app.includes('path="opening-photo-intake"')) {
  errors.push("Opening Photo Intake route missing");
}
if (!gatePanel.includes('to="/opening-photo-intake"')) {
  errors.push("Production Gate must deep-link to Opening Photo Intake");
}

if (errors.length > 0) {
  console.error(`Opening Photo Intake contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Opening Photo Intake contracts OK: ${canonicalSlots.length} canonical slots / full sync-preview handoff.`);
