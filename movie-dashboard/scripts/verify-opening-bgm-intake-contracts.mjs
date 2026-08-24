import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const page = fs.readFileSync(path.join(root, "src/pages/OpeningBgmIntake.tsx"), "utf8");
const app = fs.readFileSync(path.join(root, "src/App.tsx"), "utf8");
const gate = fs.readFileSync(path.join(root, "src/components/OpeningProductionGatePanel.tsx"), "utf8");
const errors = [];

for (const token of [
  "openingProductionGate",
  "opening-bgm-main",
  "motion-studio/public/audio/opening/bgm-main.mp3",
  "pnpm check:opening-sound",
  "pnpm check:opening-sound:strict",
  "pnpm sync:opening-gate",
  "pnpm render:opening-v1:preview",
]) {
  if (!page.includes(token)) errors.push(`BGM intake workflow missing: ${token}`);
}

for (const principle of [
  "会場上映",
  "音源の入手元",
  "SNS / 配布は別判断",
  "確認Evidenceを残す",
]) {
  if (!page.includes(principle)) errors.push(`BGM rights principle missing: ${principle}`);
}

if (!page.includes("AIが権利確認を推測してcandidate / approved / finalへ勝手に変更しません")) {
  errors.push("BGM intake must preserve the human rights-confirmation gate");
}
if (!page.includes("この画面に「権利OK」チェックを作ってsource stateを偽装しません")) {
  errors.push("BGM intake must not use self-reported rights state as production truth");
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

if (errors.length > 0) {
  console.error(`Opening BGM Intake contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Opening BGM Intake contracts OK: rights-first / strict-gate / preview handoff preserved.");
