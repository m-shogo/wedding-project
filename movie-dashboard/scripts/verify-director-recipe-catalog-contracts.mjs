import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const data = fs.readFileSync(path.join(root, "src/data/directorRecipeCatalog.ts"), "utf8");
const motionKit = fs.readFileSync(path.join(root, "src/data/startMotionKit.ts"), "utf8");
const rhythmMap = fs.readFileSync(path.join(root, "src/data/startExtendedRhythmMap.ts"), "utf8");
const page = fs.readFileSync(path.join(root, "src/pages/DirectorRecipeCatalog.tsx"), "utf8");
const humanReview = fs.readFileSync(path.join(root, "src/data/startHumanReview.ts"), "utf8");
const fidelityAudit = fs.readFileSync(path.join(root, "src/data/directorRecipeVisualFidelity.ts"), "utf8");
const errors = [];

function requireText(source, token, message) {
  if (!source.includes(token)) errors.push(message);
}

// Extract every recipe object id (top-level "id:" lines inside directorRecipeCatalog array).
const idMatches = [...data.matchAll(/^\s{4}id: "([^"]+)",$/gm)];
const ids = idMatches.map((m) => m[1]);

if (ids.length < 80) errors.push(`Director Recipe Catalog must contain at least 80 recipes, found ${ids.length}`);
if (ids.length > 100) errors.push(`Director Recipe Catalog must contain at most 100 recipes, found ${ids.length}`);
if (new Set(ids).size !== ids.length) errors.push("Director Recipe Catalog ids must be unique");

const categoryMatches = [...data.matchAll(/category: "([A-Z_]+)",/g)];
const categoryCounts = {};
for (const m of categoryMatches) categoryCounts[m[1]] = (categoryCounts[m[1]] || 0) + 1;

const requiredCategories = [
  "CINEMATIC_CAMERA",
  "PHOTO_PRESENTATION",
  "TYPOGRAPHY",
  "ANIME_OP_GRAMMAR",
  "CUT_TRANSITION",
  "RHYTHM_MUSIC_HIT",
  "TRAVEL",
  "EDITORIAL_CM",
  "WEDDING_EMOTION",
  "START_SPECIFIC",
];
for (const category of requiredCategories) {
  if (!categoryCounts[category] || categoryCounts[category] < 1) {
    errors.push(`Category missing or empty: ${category}`);
  }
}
if ((categoryCounts.START_SPECIFIC || 0) < 15) {
  errors.push(`START_SPECIFIC must contain at least 15 recipes, found ${categoryCounts.START_SPECIFIC || 0}`);
}

// status must always be "planned" in this data file; AI must not ship pre-approved recipes.
if (/status:\s*"approved"/.test(data)) errors.push("AI must not ship any recipe approved by default");
if (/status:\s*"reviewed"/.test(data)) errors.push("AI must not ship any recipe pre-marked reviewed by default");
requireText(data, 'status: "planned"', "recipes must default to status: planned");

// motionPresetIds must only reference real Motion Kit ids (36-preset catalog).
const motionKitIds = new Set(
  [...motionKit.matchAll(/p\("([^"]+)", "(?:TYPO|PHOTO|TRANSITION|ANIME_ACCENT)"/g)].map((m) => m[1]),
);
if (motionKitIds.size !== 36) errors.push(`Expected 36 Motion Kit ids to cross-check against, found ${motionKitIds.size}`);

const motionPresetIdBlocks = [...data.matchAll(/motionPresetIds: \[([^\]]*)\]/g)];
const referencedMotionIds = new Set();
for (const block of motionPresetIdBlocks) {
  for (const m of block[1].matchAll(/"([^"]+)"/g)) referencedMotionIds.add(m[1]);
}
for (const mid of referencedMotionIds) {
  if (!motionKitIds.has(mid)) errors.push(`motionPresetIds references unknown Motion Kit id: ${mid}`);
}
if (referencedMotionIds.size === 0) errors.push("No recipe references a Motion Kit preset id");

// recommendedStaRtSections must only reference real StaRt Extended section ids.
const sectionIds = new Set(
  [...rhythmMap.matchAll(/id: "([a-z0-9-]+)", label: "/g)].map((m) => m[1]),
);
if (sectionIds.size !== 14) errors.push(`Expected 14 StaRt Extended section ids to cross-check against, found ${sectionIds.size}`);

const sectionBlocks = [...data.matchAll(/recommendedStaRtSections: \[([^\]]*)\]/g)];
const referencedSectionIds = new Set();
for (const block of sectionBlocks) {
  for (const m of block[1].matchAll(/"([^"]+)"/g)) referencedSectionIds.add(m[1]);
}
for (const sid of referencedSectionIds) {
  if (!sectionIds.has(sid)) errors.push(`recommendedStaRtSections references unknown section id: ${sid}`);
}

// Required data-safety and provenance guarantees.
requireText(data, "Do not generate or transform identity", "real-person/dog identity safety rule missing from Palmier handoff builder");
requireText(data, "Do not auto-approve", "Palmier handoff must prohibit automatic approval");
requireText(data, "buildPalmierRecipeHandoff", "Palmier recipe handoff builder missing");
requireText(data, "getDirectorRecipesByCategory", "category filter helper missing");
requireText(data, "getDirectorRecipesBySection", "StaRt section filter helper missing");
requireText(data, "getDirectorRecipeById", "id lookup helper missing");
requireText(fidelityAudit, 'export type DirectorVisualFidelity = "exact" | "representative" | "placeholder"', "visual fidelity audit levels missing");
requireText(page, "getDirectorRecipeVisualAudit", "catalog UI must expose visual fidelity truth");
requireText(page, "VISUAL FIDELITY", "catalog UI visual fidelity filter missing");
requireText(humanReview, "start-director-human-decisions-v1", "human review localStorage namespace missing");
requireText(page, "aria-pressed", "human review controls must expose selected state");
if (/button disabled[^>]*>[^<]*(Favorite|Maybe|Reject)/.test(page)) errors.push("human review controls must be functional, not disabled placeholders");

// Every recipe must carry the risk-notation fields (aiTemplateRisk / overEditingRisk) non-empty.
const emptyRiskFields = [...data.matchAll(/aiTemplateRisk: "",/g)];
if (emptyRiskFields.length > 0) errors.push("aiTemplateRisk must not be empty for any recipe");
const emptyOverEditing = [...data.matchAll(/overEditingRisk: "",/g)];
if (emptyOverEditing.length > 0) errors.push("overEditingRisk must not be empty for any recipe");

if (errors.length) {
  console.error(`Director Recipe Catalog contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(
  `Director Recipe Catalog contracts OK: ${ids.length} recipes / ${Object.keys(categoryCounts).length} categories / ` +
    `START_SPECIFIC=${categoryCounts.START_SPECIFIC} / all motionPresetIds and StaRt sections resolve / no pre-approved status.`,
);
