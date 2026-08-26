import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const review = read("src/data/typographyDaVinciHumanPromotionReview.ts");
const reviewUi = read("src/components/TypographyDaVinciHumanPromotionReview.tsx");
const sessionUi = read("src/components/TypographyDaVinciActualSessionImport.tsx");
const errors = [];
const requireText = (source, token, message) => {if (!source.includes(token)) errors.push(message);};

for (const token of [
  '"PENDING" | "APPROVE" | "REJECT"',
  'schemaVersion: "typography-davinci-human-promotion-review/v1"',
  'authority: "HUMAN_PROMOTION_DECISION"',
  'decision: "PENDING"',
  'reviewer: null',
  'reviewedAt: null',
  'PROMOTION_REVIEW_SCHEMA_VERSION_MISMATCH',
  'PROMOTION_REVIEW_AUTHORITY_MISMATCH',
  'SOURCE_EVALUATION_IDENTITY_MISMATCH',
  'SOURCE_EVALUATION_ITEM_MISSING',
  'PROMOTION_DECISION_INVALID',
  'DECISION_REQUIRES_REVIEWER',
  'DECISION_REQUIRES_REVIEWED_AT',
  'APPROVE_REQUIRES_HUMAN_REVIEW_ELIGIBLE_SOURCE',
  'DUPLICATE_PATTERN_ID',
  'NINE_PATTERN_PROMOTION_REVIEW_COVERAGE_INCOMPLETE',
  'humanPromoted',
  'releaseGateRequired: true',
  'automaticPromotionAllowed: false',
  'productionReady: false',
  'parseAndEvaluateTypographyDaVinciHumanPromotionReview',
]) requireText(review, token, `Human promotion review contract missing: ${token}`);

for (const token of [
  'Separate Human promotion review',
  'source eligible',
  'PENDING promotion review templateを保存',
  'parseAndEvaluateTypographyDaVinciHumanPromotionReview',
  'approved: {evaluation.approvedCount}',
  'rejected: {evaluation.rejectedCount}',
  'pending: {evaluation.pendingCount}',
  'HUMAN_PROMOTED',
  'release gate: REQUIRED',
  'HUMAN_PROMOTEDでもproductionReady=false',
  'releaseGateRequired=true',
]) requireText(reviewUi, token, `Human promotion review UI missing: ${token}`);

for (const token of [
  'buildTypographyDaVinciActualEvaluationReport',
  'TypographyDaVinciHumanPromotionReview',
  '<TypographyDaVinciHumanPromotionReview report={buildTypographyDaVinciActualEvaluationReport(session)} />',
]) requireText(sessionUi, token, `Actual session UI is not connected to separate Human promotion review: ${token}`);

if (/decision:\s*"APPROVE"/.test(review)) errors.push("Human promotion template must never prefill APPROVE");
if (/automaticPromotionAllowed:\s*true/.test(review) || /productionReady:\s*true/.test(review)) errors.push("Human promotion review must not auto-promote to production");

for (const token of [
  'reviewItem.decision === "APPROVE"',
  'sourceItem?.eligibleForHumanPromotionReview === true',
  'Boolean(reviewItem.reviewer?.trim())',
  'Boolean(reviewItem.reviewedAt?.trim())',
]) requireText(review, token, `Human promotion approval missing explicit guard: ${token}`);

if (errors.length) {
  console.error(`Typography DaVinci Human promotion review contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log("Typography DaVinci Human promotion review contracts OK: Actual eligibility and explicit human decision are separate artifacts, APPROVE fails closed without eligible source/reviewer/time, and production release remains a separate manual gate.");
