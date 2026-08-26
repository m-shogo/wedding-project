import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const session = read("src/data/typographyDaVinciActualSession.ts");
const readiness = read("src/data/typographyDaVinciActualReadiness.ts");
const importer = read("src/components/TypographyDaVinciActualSessionImport.tsx");
const queue = read("src/components/TypographyDaVinciActualRunQueue.tsx");
const plan = read("src/data/typographyDaVinciActualRunPlan.ts");
const errors = [];
const requireText = (source, token, message) => {if (!source.includes(token)) errors.push(message);};

for (const token of [
  'schemaVersion: "typography-davinci-actual-session/v1"', 'authority: "MAC_ACTUAL_EVIDENCE_SESSION"',
  'macActualState: "NOT_RUN"', 'machineParity: "NOT_RUN"', 'oneX: "NOT_RUN"', 'halfSpeed: "NOT_RUN"',
  'reviewedAt: null', 'rawEvidenceFile: null',
  'Object.fromEntries(runItem.requiredBindingRoles.map((role) => [role, "NOT_RUN" as const]))',
  'FILL_FROM_MAC_ACTUAL_SESSION', 'DUPLICATE_PATTERN_ID', 'UNKNOWN_PATTERN_ID',
  'NINE_PATTERN_COVERAGE_INCOMPLETE', 'eligibleForHumanPromotionReview', 'humanPromotionReviewRequired: true',
  'automaticPromotionAllowed: false', 'productionReady: false', 'buildTypographyDaVinciActualSessionTemplateJson',
  'parseAndEvaluateTypographyDaVinciActualSession',
  'evaluateTypographyDaVinciActualReadiness',
  'stageCounts',
  'schemaVersion: "typography-davinci-actual-evaluation/v1"',
  'authority: "DERIVED_FROM_MAC_ACTUAL_EVIDENCE_SESSION"',
  'eligibleForHumanPromotionReviewCount', 'blockedCount',
  '"EVALUATION_REPORT != RAW_MAC_EVIDENCE"', '"ACTUAL_IN_PROGRESS != ACTUAL_PASS"',
  '"HUMAN_REVIEW_ELIGIBLE != HUMAN_PROMOTED"',
  '"HUMAN_PROMOTED != PRODUCTION_READY_WITHOUT_SEPARATE_RELEASE_GATE"',
  'buildTypographyDaVinciActualEvaluationReportJson',
]) requireText(session, token, `Actual session/evaluation contract missing: ${token}`);

for (const token of [
  '"NOT_RUN"',
  '"ACTUAL_IN_PROGRESS"',
  '"ACTUAL_FAILED"',
  '"HUMAN_REVIEW_ELIGIBLE"',
  'IMPLEMENTATION_ID_MISMATCH',
  'MAC_ACTUAL_STATE_INVALID',
  'MACHINE_PARITY_STATE_INVALID',
  'VISUAL_QA_1X_STATE_INVALID',
  'VISUAL_QA_HALF_SPEED_STATE_INVALID',
  'REQUIRED_BINDING_STATE_INVALID:',
  'REQUIRED_BINDING_NOT_PASS:',
  'PASS_REQUIRES_RAW_EVIDENCE_FILE',
  'PASS_REQUIRES_MACHINE_PARITY',
  'PASS_REQUIRES_1X_VISUAL_QA',
  'PASS_REQUIRES_HALF_SPEED_VISUAL_QA',
  'PASS_REQUIRES_REVIEWED_AT',
  'machineEvidenceComplete',
  'requiredBindingsComplete',
  'visualQaComplete',
  'reviewMetadataComplete',
  'humanPromotionReviewRequired: true',
  'automaticPromotionAllowed: false',
  'productionReady: false',
]) requireText(readiness, token, `Shared Actual readiness contract missing: ${token}`);

for (const token of [
  "buildTypographyDaVinciActualSessionTemplateJson", "typography-davinci-actual-session-template.json",
  "NOT_RUN session templateを保存", "evidence欄はすべてNOT_RUN", "Mac Actual session JSONを読み戻す",
  "読み込みだけではroute statusやproduction stateを書き換えません。", "HUMAN_REVIEW_ELIGIBLE", "BLOCKED",
  "buildTypographyDaVinciActualEvaluationReportJson", "derived evaluation reportを保存",
  "DERIVED_FROM_MAC_ACTUAL_EVIDENCE_SESSION", "raw evidenceの代替ではなく、Gitへ残す判定結果です。",
  "automaticPromotionAllowed=false / productionReady=false",
]) requireText(importer, token, `Actual session import UI missing: ${token}`);

requireText(queue, 'import {TypographyDaVinciActualSessionImport}', "Actual queue must import session importer");
requireText(queue, "<TypographyDaVinciActualSessionImport />", "Actual queue must render session importer");
requireText(session, "typographyDaVinciActualRunPlan.map", "Session template must derive all items from shared run plan");
requireText(session, "getTypographyDaVinciActualRunItem", "Session validation must resolve shared run-plan identity");
requireText(plan, 'authority: "PLAN_ONLY_NOT_ACTUAL_EVIDENCE"', "Plan/session/evaluation authorities must remain distinct");

if (/macActualState:\s*"PASS"/.test(session)) errors.push("Session template must not hardcode Mac Actual PASS");
if (/machineParity:\s*"PASS"/.test(session)) errors.push("Session template must not hardcode machine parity PASS");
if (/automaticPromotionAllowed:\s*true/.test(session + readiness) || /productionReady:\s*true/.test(session + readiness)) errors.push("Session/readiness evaluation must never auto-promote to production");

for (const token of [
  'item.macActualState === "PASS"',
  'item.machineParity === "PASS"',
  'item.visualQa?.oneX === "PASS"',
  'item.visualQa?.halfSpeed === "PASS"',
  'Boolean(item.reviewedAt)',
  'Boolean(item.rawEvidenceFile)',
  'runItem.requiredBindingRoles.every((role) => item.bindingResults?.[role] === "PASS")',
]) requireText(readiness, token, `Human-review eligibility missing shared evidence guard: ${token}`);

if (errors.length) {
  console.error(`Typography DaVinci Actual session contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log("Typography DaVinci Actual session contracts OK: all nine session items use one staged readiness evaluator, raw Mac evidence remains authoritative, and Human promotion / production promotion remain explicit separate gates.");
