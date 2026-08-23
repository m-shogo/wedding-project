import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function parse(relativePath) {
  return ts.createSourceFile(
    relativePath,
    read(relativePath),
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

function variableArray(relativePath, variableName) {
  const sourceFile = parse(relativePath);
  let result = null;
  function visit(node) {
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text === variableName
    ) {
      const initializer = node.initializer ? unwrap(node.initializer) : null;
      if (initializer && ts.isArrayLiteralExpression(initializer)) result = initializer;
      return;
    }
    ts.forEachChild(node, visit);
  }
  visit(sourceFile);
  if (!result) throw new Error(`${relativePath}: ${variableName} array not found`);
  return result.elements.filter(ts.isObjectLiteralExpression);
}

function prop(objectNode, name) {
  return objectNode.properties.find(
    (item) =>
      ts.isPropertyAssignment(item) &&
      ((ts.isIdentifier(item.name) && item.name.text === name) ||
        (ts.isStringLiteral(item.name) && item.name.text === name)),
  );
}

function stringProp(objectNode, name) {
  const property = prop(objectNode, name);
  if (!property || !ts.isPropertyAssignment(property)) return null;
  const value = unwrap(property.initializer);
  return ts.isStringLiteral(value) ? value.text : null;
}

function stringArrayProp(objectNode, name) {
  const property = prop(objectNode, name);
  if (!property || !ts.isPropertyAssignment(property)) return [];
  const value = unwrap(property.initializer);
  if (!ts.isArrayLiteralExpression(value)) return [];
  return value.elements
    .map((item) => {
      const element = unwrap(item);
      return ts.isStringLiteral(element) ? element.text : null;
    })
    .filter(Boolean);
}

function checkReferences(items, propertyName, validIds, label) {
  for (const item of items) {
    const id =
      stringProp(item, "intentId") ??
      stringProp(item, "category") ??
      "<unknown>";
    for (const ref of stringArrayProp(item, propertyName)) {
      if (!validIds.has(ref)) {
        errors.push(`${label} ${id}: dangling ${propertyName} reference ${ref}`);
      }
    }
  }
}

const skills = [
  ...variableArray("src/data/movieCoach.ts", "learningSkills"),
  ...variableArray("src/data/profileCoachLearning.ts", "profileLearningSkills"),
];
const validSkillIds = new Set(skills.map((skill) => stringProp(skill, "skillId")).filter(Boolean));

const baseOutcomes = variableArray("src/data/movieCoach.ts", "productionOutcomes");
const profilePhases = variableArray("src/data/profileCoachRoadmap.ts", "profileCoachPhases");
const validOutcomeIds = new Set([
  ...baseOutcomes.map((outcome) => stringProp(outcome, "outcomeId")),
  ...profilePhases.map((phase) => stringProp(phase, "phaseId")),
].filter(Boolean));

const clips = JSON.parse(read("src/data/clips.json"));
const validRecipeIds = new Set((clips.recipes ?? []).map((recipe) => recipe.id));

const categories = variableArray("src/data/movieCoachReview.ts", "movieReviewCategories");
checkReferences(categories, "profileSkillIds", validSkillIds, "review category");

const profileIntents = variableArray("src/data/profileCoachIntents.ts", "profileCoachIntents");
checkReferences(profileIntents, "skillIds", validSkillIds, "profile intent");
checkReferences(profileIntents, "weddingOutcomeIds", validOutcomeIds, "profile intent");
checkReferences(profileIntents, "recipeIds", validRecipeIds, "profile intent");

const intentIds = profileIntents.map((intent) => stringProp(intent, "intentId"));
if (new Set(intentIds).size !== intentIds.length) {
  errors.push("profile intents: duplicate intentId");
}

if (errors.length > 0) {
  console.error(`Movie Coach profile route contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Movie Coach profile route contracts OK: ${categories.length} review categories, ${profileIntents.length} profile intents.`,
);
