import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const guide = read("src/components/ProductionMediaIntakeCliGuide.tsx");
const profile = read("src/pages/ProfileMediaIntake.tsx");
const openingGate = read("src/components/OpeningProductionGatePanel.tsx");
const errors = [];

const requireText = (source, token, message) => {
  if (!source.includes(token)) errors.push(message);
};

for (const token of [
  'type IntakeProject = "opening" | "profile"',
  '/ABSOLUTE/PATH/TO/OPENING-SELECTED',
  '/ABSOLUTE/PATH/TO/PROFILE-SELECTED',
  'out/intake/opening-media-intake.json',
  'out/intake/profile-media-intake.json',
  'scripts/intake-production-media.mts --project ${project} --source',
  'DRY RUN — copyせず全slotを確認',
  'APPLY — copy後のbytesをSHA確認しreceipt保存',
  '--apply --receipt',
  'pnpm prepare:opening-v1',
  'pnpm prepare:profile-v1',
  'sourceを残したままcanonical targetへcopy',
  'source/targetのbytesとSHA-256を照合',
  'canonical id / source filename / target filename / bytes / SHA-256',
  '実素材本体や絶対source pathはreceiptへ保存しません',
  'DRY_RUN_PASS != FILE_COPIED / SHA_RECEIPT_WRITTEN != HUMAN_QA_PASS / APPLY_DONE != PRODUCTION_READY',
]) {
  requireText(guide, token, `production media CLI guide missing: ${token}`);
}

for (const token of [
  'ProductionMediaIntakeCliGuide',
  '<ProductionMediaIntakeCliGuide project="profile" />',
  'CANONICAL INTAKE CLIをDRY RUNし',
  '--apply',
  'source非破壊copy',
  'Human QA / Mac DaVinci Actual / final approval は自動PASSしません',
]) {
  requireText(profile, token, `Profile media intake CLI wiring missing: ${token}`);
}

for (const token of [
  'ProductionMediaIntakeCliGuide',
  '<ProductionMediaIntakeCliGuide project="opening" />',
  '!photosReady',
  'CANONICAL INTAKE CLIをDRY RUNし',
  '--apply',
  'source非破壊copy',
  '写真+BGMが揃ったら60秒previewへ',
]) {
  requireText(openingGate, token, `Opening production gate CLI wiring missing: ${token}`);
}

if (guide.includes('productionReady: true') || profile.includes('productionReady: true') || openingGate.includes('productionReady: true')) {
  errors.push("media intake dashboard guide must not fabricate production readiness");
}

if (errors.length) {
  console.error(`Production Media Intake Dashboard Guide contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Production Media Intake Dashboard Guide contracts OK: Opening and Profile expose canonical dry-run -> SHA-verified apply + local receipt -> prepare commands, while source preservation and Human/Mac production gates remain explicit.");
