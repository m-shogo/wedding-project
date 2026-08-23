import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const dataDir = path.join(root, "src", "data");

const errors = [];

function fail(message) {
  errors.push(message);
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function parse(relativePath) {
  const sourceText = read(relativePath);
  return ts.createSourceFile(
    relativePath,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
}

function unwrap(expression) {
  let current = expression;
  while (
    current &&
    (ts.isParenthesizedExpression(current) ||
      ts.isAsExpression(current) ||
      ts.isTypeAssertionExpression(current) ||
      ts.isSatisfiesExpression?.(current))
  ) {
    current = current.expression;
  }
  return current;
}

function getVariableInitializer(relativePath, variableName) {
  const sourceFile = parse(relativePath);
  let initializer = null;

  function visit(node) {
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text === variableName
    ) {
      initializer = node.initializer ? unwrap(node.initializer) : null;
      return;
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  if (!initializer) {
    throw new Error(`${relativePath}: variable ${variableName} not found`);
  }
  return initializer;
}

function getObjectArray(relativePath, variableName) {
  const initializer = getVariableInitializer(relativePath, variableName);
  if (!ts.isArrayLiteralExpression(initializer)) {
    throw new Error(`${relativePath}: ${variableName} must be an array literal`);
  }
  return initializer.elements.filter(ts.isObjectLiteralExpression);
}

function propertyName(node) {
  if (ts.isIdentifier(node)) return node.text;
  if (ts.isStringLiteral(node) || ts.isNumericLiteral(node)) return node.text;
  return null;
}

function getProperty(objectNode, name) {
  return objectNode.properties.find(
    (property) =>
      ts.isPropertyAssignment(property) && propertyName(property.name) === name,
  );
}

function stringExpression(expression) {
  const value = unwrap(expression);
  if (ts.isStringLiteral(value) || ts.isNoSubstitutionTemplateLiteral(value)) {
    return value.text;
  }
  return null;
}

function stringProp(objectNode, name) {
  const property = getProperty(objectNode, name);
  if (!property || !ts.isPropertyAssignment(property)) return null;
  return stringExpression(property.initializer);
}

function numberProp(objectNode, name) {
  const property = getProperty(objectNode, name);
  if (!property || !ts.isPropertyAssignment(property)) return null;
  const value = unwrap(property.initializer);
  return ts.isNumericLiteral(value) ? Number(value.text) : null;
}

function stringArrayProp(objectNode, name) {
  const property = getProperty(objectNode, name);
  if (!property || !ts.isPropertyAssignment(property)) return [];
  const value = unwrap(property.initializer);
  if (!ts.isArrayLiteralExpression(value)) return [];
  return value.elements
    .map((element) => stringExpression(element))
    .filter((item) => item !== null);
}

function objectArrayProp(objectNode, name) {
  const property = getProperty(objectNode, name);
  if (!property || !ts.isPropertyAssignment(property)) return [];
  const value = unwrap(property.initializer);
  if (!ts.isArrayLiteralExpression(value)) return [];
  return value.elements.filter(ts.isObjectLiteralExpression);
}

function requireUnique(values, label) {
  const seen = new Set();
  for (const value of values) {
    if (!value) {
      fail(`${label}: empty id`);
      continue;
    }
    if (seen.has(value)) fail(`${label}: duplicate id ${value}`);
    seen.add(value);
  }
}

function requireRefs(refs, valid, label) {
  for (const ref of refs) {
    if (!valid.has(ref)) fail(`${label}: dangling reference ${ref}`);
  }
}

const baseSkillObjects = getObjectArray("src/data/movieCoach.ts", "learningSkills");
const profileSkillObjects = getObjectArray(
  "src/data/profileCoachLearning.ts",
  "profileLearningSkills",
);
const skillObjects = [...baseSkillObjects, ...profileSkillObjects];
const skillIds = skillObjects.map((item) => stringProp(item, "skillId"));
requireUnique(skillIds, "skills");
const skillIdSet = new Set(skillIds.filter(Boolean));

for (const skill of skillObjects) {
  const skillId = stringProp(skill, "skillId") ?? "<unknown-skill>";
  requireRefs(
    stringArrayProp(skill, "prerequisiteIds"),
    skillIdSet,
    `skill ${skillId} prerequisiteIds`,
  );
}

const baseOutcomeObjects = getObjectArray(
  "src/data/movieCoach.ts",
  "productionOutcomes",
);
const phaseObjects = getObjectArray(
  "src/data/profileCoachRoadmap.ts",
  "profileCoachPhases",
);

const baseOutcomeIds = baseOutcomeObjects.map((item) => stringProp(item, "outcomeId"));
const phaseIds = phaseObjects.map((item) => stringProp(item, "phaseId"));
const allOutcomeIds = [...baseOutcomeIds, ...phaseIds];
requireUnique(allOutcomeIds, "production outcomes");
const outcomeIdSet = new Set(allOutcomeIds.filter(Boolean));

const clips = JSON.parse(read("src/data/clips.json"));
const recipeIds = new Set((clips.recipes ?? []).map((recipe) => recipe.id));
if (recipeIds.size === 0) fail("clips.json: recipes must not be empty");

for (const outcome of baseOutcomeObjects) {
  const outcomeId = stringProp(outcome, "outcomeId") ?? "<unknown-outcome>";
  requireRefs(
    [
      ...stringArrayProp(outcome, "conceptSkillIds"),
      ...stringArrayProp(outcome, "davinciSkillIds"),
    ],
    skillIdSet,
    `outcome ${outcomeId} skillIds`,
  );
  requireRefs(
    stringArrayProp(outcome, "recipeIds"),
    recipeIds,
    `outcome ${outcomeId} recipeIds`,
  );
  requireRefs(
    stringArrayProp(outcome, "prerequisiteOutcomeIds"),
    outcomeIdSet,
    `outcome ${outcomeId} prerequisiteOutcomeIds`,
  );

  const checklist = objectArrayProp(outcome, "checklist");
  if (checklist.length === 0) fail(`outcome ${outcomeId}: checklist must not be empty`);
  requireUnique(
    checklist.map((item) => stringProp(item, "itemId")),
    `outcome ${outcomeId} checklist`,
  );
}

const phaseOrders = [];
for (const phase of phaseObjects) {
  const phaseId = stringProp(phase, "phaseId") ?? "<unknown-phase>";
  phaseOrders.push(numberProp(phase, "order"));
  requireRefs(
    [
      ...stringArrayProp(phase, "conceptSkillIds"),
      ...stringArrayProp(phase, "davinciSkillIds"),
    ],
    skillIdSet,
    `profile phase ${phaseId} skillIds`,
  );
  requireRefs(
    stringArrayProp(phase, "recipeIds"),
    recipeIds,
    `profile phase ${phaseId} recipeIds`,
  );
  if (stringArrayProp(phase, "done").length === 0) {
    fail(`profile phase ${phaseId}: done criteria must not be empty`);
  }
}

requireUnique(phaseOrders.map(String), "profile phase order");
for (let index = 0; index < phaseOrders.length; index += 1) {
  if (phaseOrders[index] !== index + 1) {
    fail(`profile phase order: expected ${index + 1}, got ${phaseOrders[index]}`);
  }
}

const prerequisiteMap = new Map();
for (const outcome of baseOutcomeObjects) {
  const id = stringProp(outcome, "outcomeId");
  if (id) prerequisiteMap.set(id, stringArrayProp(outcome, "prerequisiteOutcomeIds"));
}
for (let index = 0; index < phaseIds.length; index += 1) {
  const id = phaseIds[index];
  if (!id) continue;
  const prerequisite = index === 0 ? "profile-photo-selection" : phaseIds[index - 1];
  prerequisiteMap.set(id, prerequisite ? [prerequisite] : []);
}

for (const [id, prerequisites] of prerequisiteMap) {
  requireRefs(prerequisites, outcomeIdSet, `outcome ${id} generated prerequisites`);
}

const visiting = new Set();
const visited = new Set();
function visitOutcome(id, pathStack = []) {
  if (visiting.has(id)) {
    fail(`outcome prerequisite cycle: ${[...pathStack, id].join(" -> ")}`);
    return;
  }
  if (visited.has(id)) return;
  visiting.add(id);
  for (const prerequisite of prerequisiteMap.get(id) ?? []) {
    visitOutcome(prerequisite, [...pathStack, id]);
  }
  visiting.delete(id);
  visited.add(id);
}
for (const id of prerequisiteMap.keys()) visitOutcome(id);

const intentObjects = getObjectArray(
  "src/data/movieCoachIntents.ts",
  "movieCoachIntents",
);
for (const intent of intentObjects) {
  const intentId = stringProp(intent, "intentId") ?? "<unknown-intent>";
  requireRefs(
    stringArrayProp(intent, "skillIds"),
    skillIdSet,
    `intent ${intentId} skillIds`,
  );
  requireRefs(
    stringArrayProp(intent, "weddingOutcomeIds"),
    outcomeIdSet,
    `intent ${intentId} weddingOutcomeIds`,
  );
  requireRefs(
    stringArrayProp(intent, "recipeIds"),
    recipeIds,
    `intent ${intentId} recipeIds`,
  );
}

const reviewCategoryObjects = getObjectArray(
  "src/data/movieCoachReview.ts",
  "movieReviewCategories",
);
for (const reviewCategory of reviewCategoryObjects) {
  const category = stringProp(reviewCategory, "category") ?? "<unknown-review-category>";
  requireRefs(
    stringArrayProp(reviewCategory, "skillIds"),
    skillIdSet,
    `review category ${category} skillIds`,
  );
}

const profileLearningSource = read("src/data/profileCoachLearning.ts");
if (!profileLearningSource.includes("profileCoachPhases.map")) {
  fail("profileCoachLearning.ts must derive outcomes from profileCoachPhases.map");
}
if (!profileLearningSource.includes("prerequisiteOutcomeIds")) {
  fail("profileCoachLearning.ts must define generated outcome prerequisites");
}

if (errors.length > 0) {
  console.error(`Movie Coach contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Movie Coach contracts OK: ${skillIdSet.size} skills, ${outcomeIdSet.size} outcomes, ${phaseIds.length} profile phases, ${intentObjects.length} intents, ${reviewCategoryObjects.length} review categories.`,
);
