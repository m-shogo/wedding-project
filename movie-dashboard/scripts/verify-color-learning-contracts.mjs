import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];

function parse(relativePath) {
  return ts.createSourceFile(
    relativePath,
    fs.readFileSync(path.join(root, relativePath), "utf8"),
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
  ) current = current.expression;
  return current;
}

function variableArray(relativePath, name) {
  const source = parse(relativePath);
  let result = null;
  function visit(node) {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === name) {
      const value = node.initializer ? unwrap(node.initializer) : null;
      if (value && ts.isArrayLiteralExpression(value)) result = value;
      return;
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  if (!result) throw new Error(`${relativePath}: ${name} array not found`);
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
  const item = prop(objectNode, name);
  if (!item || !ts.isPropertyAssignment(item)) return null;
  const value = unwrap(item.initializer);
  return ts.isStringLiteral(value) ? value.text : null;
}

function numberProp(objectNode, name) {
  const item = prop(objectNode, name);
  if (!item || !ts.isPropertyAssignment(item)) return null;
  const value = unwrap(item.initializer);
  return ts.isNumericLiteral(value) ? Number(value.text) : null;
}

function stringArrayProp(objectNode, name) {
  const item = prop(objectNode, name);
  if (!item || !ts.isPropertyAssignment(item)) return [];
  const value = unwrap(item.initializer);
  if (!ts.isArrayLiteralExpression(value)) return [];
  return value.elements
    .map((entry) => {
      const unwrapped = unwrap(entry);
      return ts.isStringLiteral(unwrapped) ? unwrapped.text : null;
    })
    .filter(Boolean);
}

function duplicates(values) {
  const seen = new Set();
  const duplicate = new Set();
  for (const value of values) {
    if (seen.has(value)) duplicate.add(value);
    seen.add(value);
  }
  return [...duplicate];
}

const stages = variableArray("src/data/colorLearning.ts", "colorLearningStages");
const exercises = variableArray("src/data/colorLearning.ts", "colorWeddingExercises");
const baseOutcomes = variableArray("src/data/movieCoach.ts", "productionOutcomes");
const profilePhases = variableArray("src/data/profileCoachRoadmap.ts", "profileCoachPhases");

const expectedStages = [
  "original",
  "white-balance",
  "exposure",
  "contrast",
  "saturation",
  "shot-match",
  "final",
];
const stageIds = stages.map((stage) => stringProp(stage, "stageId")).filter(Boolean);
const stageOrders = stages.map((stage) => numberProp(stage, "order"));
for (const id of duplicates(stageIds)) errors.push(`duplicate color stageId: ${id}`);
if (stageIds.join("|") !== expectedStages.join("|")) {
  errors.push(`color stage order must be ${expectedStages.join(" → ")}`);
}
if (stageOrders.some((order, index) => order !== index + 1)) {
  errors.push("color stage numeric order must be continuous 1..7");
}

const validOutcomeIds = new Set([
  ...baseOutcomes.map((outcome) => stringProp(outcome, "outcomeId")).filter(Boolean),
  ...profilePhases.map((phase) => stringProp(phase, "phaseId")).filter(Boolean),
]);
const exerciseIds = exercises.map((exercise) => stringProp(exercise, "exerciseId")).filter(Boolean);
for (const id of duplicates(exerciseIds)) errors.push(`duplicate color exerciseId: ${id}`);

for (const exercise of exercises) {
  const id = stringProp(exercise, "exerciseId") ?? "<unknown-exercise>";
  const source = stringProp(exercise, "source");
  if (!source || !validOutcomeIds.has(source)) errors.push(`${id}: dangling Wedding Outcome source ${source ?? "<missing>"}`);
  if (stringArrayProp(exercise, "steps").length < 3) errors.push(`${id}: needs at least 3 practice steps`);
  if (!stringProp(exercise, "done")?.trim()) errors.push(`${id}: missing done condition`);
}

if (errors.length > 0) {
  console.error(`Color Learning contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Color Learning contracts OK: ${stages.length} stages / ${exercises.length} Wedding exercises.`);
