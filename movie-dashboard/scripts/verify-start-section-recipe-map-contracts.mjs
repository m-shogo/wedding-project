import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const mapSrc = fs.readFileSync(path.join(root, "src/data/startSectionRecipeMap.ts"), "utf8");
const catalogSrc = fs.readFileSync(path.join(root, "src/data/directorRecipeCatalog.ts"), "utf8");
const rhythmMapSrc = fs.readFileSync(path.join(root, "src/data/startExtendedRhythmMap.ts"), "utf8");
const errors = [];

// --- Cross-check inputs -----------------------------------------------------

const catalogIds = new Set([...catalogSrc.matchAll(/^\s{4}id: "([^"]+)",$/gm)].map((m) => m[1]));
if (catalogIds.size < 80) errors.push(`Expected Director Recipe Catalog ids to cross-check against, found only ${catalogIds.size}`);

const sectionIds = new Set([...rhythmMapSrc.matchAll(/id: "([a-z0-9-]+)", label: "/g)].map((m) => m[1]));
if (sectionIds.size !== 14) errors.push(`Expected 14 StaRt Extended section ids to cross-check against, found ${sectionIds.size}`);

// --- Parse startSectionRecipeMap.ts into per-section blocks -----------------

const bodyStart = mapSrc.indexOf("export const startSectionRecipeMap");
const body = mapSrc.slice(bodyStart);
const blocks = body.split(/\n {2}\{\n/).slice(1);

if (blocks.length !== 14) {
  errors.push(`startSectionRecipeMap must contain exactly 14 section mappings, found ${blocks.length}`);
}

const seenSections = new Set();

function arrField(block, name) {
  const re = new RegExp(`${name}: \\[([^\\]]*)\\]`);
  const m = block.match(re);
  if (!m) return null;
  return [...m[1].matchAll(/"([^"]+)"/g)].map((mm) => mm[1]);
}

function strField(block, name) {
  const re = new RegExp(`${name}: "([^"]*)"`);
  const m = block.match(re);
  return m ? m[1] : null;
}

for (const block of blocks) {
  const sectionIdMatch = block.match(/^\s*sectionId: "([^"]+)",/);
  if (!sectionIdMatch) {
    errors.push("Found a section mapping block without a sectionId as its first field");
    continue;
  }
  const sectionId = sectionIdMatch[1];

  if (!sectionIds.has(sectionId)) {
    errors.push(`Unknown StaRt section id referenced: ${sectionId}`);
  }
  if (seenSections.has(sectionId)) {
    errors.push(`Duplicate section mapping for: ${sectionId}`);
  }
  seenSections.add(sectionId);

  const primary = arrField(block, "primaryRecipeIds") ?? [];
  const alternate = arrField(block, "alternateRecipeIds") ?? [];

  if (primary.length < 1) {
    errors.push(`${sectionId}: primaryRecipeIds must contain at least 1 recipe`);
  }
  if (primary.length > 4) {
    errors.push(`${sectionId}: primaryRecipeIds should contain at most 4 recipes, found ${primary.length}`);
  }
  if (alternate.length > 3) {
    errors.push(`${sectionId}: alternateRecipeIds should contain at most 3 recipes, found ${alternate.length}`);
  }

  for (const id of primary) {
    if (!catalogIds.has(id)) errors.push(`${sectionId}: primaryRecipeIds references unknown recipe id: ${id}`);
  }
  for (const id of alternate) {
    if (!catalogIds.has(id)) errors.push(`${sectionId}: alternateRecipeIds references unknown recipe id: ${id}`);
  }

  // avoidRecipeIds is an array of {recipeId, reason} objects, parse separately.
  const avoidBlockMatch = block.match(/avoidRecipeIds: \[([\s\S]*?)\n\s{4}\],\n\s{4}energy:/);
  const avoidIds = [];
  if (avoidBlockMatch) {
    for (const m of avoidBlockMatch[1].matchAll(/recipeId: "([^"]+)", reason: "([^"]*)"/g)) {
      avoidIds.push(m[1]);
      if (!m[2] || m[2].trim().length === 0) {
        errors.push(`${sectionId}: avoidRecipeIds entry ${m[1]} is missing a reason`);
      }
    }
  }
  for (const id of avoidIds) {
    if (!catalogIds.has(id)) errors.push(`${sectionId}: avoidRecipeIds references unknown recipe id: ${id}`);
  }

  const overlap = primary.filter((id) => avoidIds.includes(id)).concat(alternate.filter((id) => avoidIds.includes(id)));
  if (overlap.length > 0) {
    errors.push(`${sectionId}: recipe(s) listed in both primary/alternate AND avoid: ${overlap.join(", ")}`);
  }

  const primaryAlternateOverlap = primary.filter((id) => alternate.includes(id));
  if (primaryAlternateOverlap.length > 0) {
    errors.push(`${sectionId}: recipe(s) listed in both primary AND alternate: ${primaryAlternateOverlap.join(", ")}`);
  }

  const energy = strField(block, "energy");
  const density = strField(block, "density");
  const photoHoldSeconds = strField(block, "photoHoldSeconds");
  const graphicDensityPolicy = strField(block, "graphicDensityPolicy");
  const typographyLevel = strField(block, "typographyLevel");
  const notes = strField(block, "notes");

  if (!energy) errors.push(`${sectionId}: missing energy`);
  if (!density) errors.push(`${sectionId}: missing density`);
  if (!photoHoldSeconds) errors.push(`${sectionId}: missing photoHoldSeconds`);
  if (!graphicDensityPolicy) errors.push(`${sectionId}: missing graphicDensityPolicy`);
  if (!typographyLevel) errors.push(`${sectionId}: missing typographyLevel`);
  if (!notes || notes.trim().length < 10) errors.push(`${sectionId}: notes must be a non-trivial explanation`);

  const isThreeHitSection = sectionId === "chorus-1-b" || sectionId === "chorus-2-b";
  const hasThreeHitPolicy = /threeHitPolicy: "[^"]/.test(block);
  const hasNullThreeHitPolicy = /threeHitPolicy: null,/.test(block);
  if (isThreeHitSection && !hasThreeHitPolicy) {
    errors.push(`${sectionId}: THREE-HIT section must have a non-null threeHitPolicy`);
  }
  if (!isThreeHitSection && !hasNullThreeHitPolicy) {
    errors.push(`${sectionId}: non THREE-HIT section must have threeHitPolicy: null`);
  }
}

for (const sectionId of sectionIds) {
  if (!seenSections.has(sectionId)) {
    errors.push(`Missing section mapping for: ${sectionId}`);
  }
}

// --- Nothing here should promote catalog recipe status --------------------

if (/status:\s*"approved"/.test(mapSrc) || /status:\s*"reviewed"/.test(mapSrc)) {
  errors.push("startSectionRecipeMap.ts must not carry its own approved/reviewed status field; adoption stays in directorRecipeCatalog.ts and requires human review");
}

// --- Required exported helpers ---------------------------------------------

for (const token of ["getSectionRecipeMapping", "getAllMappedSectionIds", "export const startSectionRecipeMap"]) {
  if (!mapSrc.includes(token)) errors.push(`startSectionRecipeMap.ts is missing expected export: ${token}`);
}

if (errors.length) {
  console.error(`StaRt Section ⇄ Recipe Map contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(
  `StaRt Section ⇄ Recipe Map contracts OK: ${seenSections.size}/14 sections mapped, all primary/alternate/avoid recipe ids resolve against the ${catalogIds.size}-recipe catalog.`,
);
