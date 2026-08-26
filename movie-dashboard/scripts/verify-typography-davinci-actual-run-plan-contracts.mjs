import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const runPlan = read("src/data/typographyDaVinciActualRunPlan.ts");
const runQueue = read("src/components/TypographyDaVinciActualRunQueue.tsx");
const matrix = read("src/components/TypographyProductionRoutingMatrix.tsx");
const policy = read("src/data/typographyDaVinciPromotionPolicy.ts");
const routing = read("src/data/typographySceneProductionRouting.ts");
const errors = [];
const requireText = (source, token, message) => {if (!source.includes(token)) errors.push(message);};

const patternIds = [
  "type-mask-reveal",
  "type-char-stagger",
  "type-type-on-rhythm",
  "type-word-punch",
  "type-tracking-burst",
  "type-vertical-wipe",
  "type-outline-fill",
  "type-baseline-hop",
  "type-triplet",
];

for (const id of patternIds) requireText(runPlan, `"${id}"`, `Actual run plan omitted ${id}`);
for (const id of patternIds.slice(1)) requireText(policy, `"${id}"`, `Shared promotion policy omitted ${id}`);

for (const token of [
  "typographyProductionRoutes.map",
  "getTypographyDaVinciRequiredBindingRoles",
  'macActualState: route.actualVerified ? "PASS" : "NOT_RUN"',
  'automaticPromotionAllowed: false',
  'productionReady: false',
  'visualQaRequired: ["1X", "HALF_SPEED"]',
  'reviewedAtRequired: true',
  'CAPTURE_EXISTING_LIVE_READBACK',
  'RUN_MAC_ACTUAL_CAPTURE',
  'HUMAN_PROMOTION_REVIEW',
  'Capture raw Resolve readback before normalizing units or coordinates.',
  'Prove every required binding role; one visible effect is not sufficient evidence.',
  'Keep automaticPromotionAllowed=false and productionReady=false until a separate human promotion review.',
]) requireText(runPlan, token, `Actual run plan missing honesty/sequence contract: ${token}`);

for (const token of [
  "Mac Resolve Actual 実行キュー",
  "NOT_RUN",
  "translatorやCIの成功はMac Actual PASSへ読み替えません。",
  "bindings",
  "QA: 1x + half-speed / reviewedAt必須",
  "全候補共通のActual順序",
  "automaticPromotionAllowed=false / productionReady=false",
]) requireText(runQueue, token, `Actual queue UI missing ${token}`);

requireText(matrix, 'import {TypographyDaVinciActualRunQueue}', "Routing Matrix must import shared Actual queue");
requireText(matrix, "<TypographyDaVinciActualRunQueue />", "Routing Matrix must render shared Actual queue");
requireText(routing, '"DAVINCI_ACTUAL_VERIFIED"', "Routing model must retain explicit Actual verified state");

const priorityBlock = runPlan.match(/const priorityOrder:[\s\S]*?\];/m)?.[0] ?? "";
for (const id of patternIds) if (!priorityBlock.includes(`"${id}"`)) errors.push(`Priority order omitted ${id}`);
if ((priorityBlock.match(/"type-/g) ?? []).length !== 9) errors.push("Actual queue priority order must contain exactly 9 Typography patterns");

if (/macActualState:\s*"PASS"/.test(runPlan)) errors.push("Actual run plan must not hardcode Mac PASS");
if (/automaticPromotionAllowed:\s*true/.test(runPlan)) errors.push("Actual run plan must never allow automatic promotion");
if (/productionReady:\s*true/.test(runPlan) || /Production:\s*READY/.test(runQueue)) errors.push("Actual run plan/queue must not fabricate production readiness");

if (errors.length) {
  console.error(`Typography DaVinci Actual run plan contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Typography DaVinci Actual run plan contracts OK: all 9 Typography routes share one ordered Mac Resolve evidence workflow, retain NOT_RUN honestly, require raw readback + full bindings + 1x/half-speed QA, and forbid automatic production promotion.");
