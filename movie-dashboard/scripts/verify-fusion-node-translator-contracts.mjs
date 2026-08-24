import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = "src/data/fusionNodeTranslator.ts";
const source = ts.createSourceFile(
  sourcePath,
  fs.readFileSync(path.join(root, sourcePath), "utf8"),
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TS,
);
const errors = [];

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

function variableArray(name) {
  let result = null;
  function visit(node) {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === name) {
      const initializer = node.initializer ? unwrap(node.initializer) : null;
      if (initializer && ts.isArrayLiteralExpression(initializer)) result = initializer;
      return;
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  if (!result) throw new Error(`${sourcePath}: ${name} array not found`);
  return result.elements.filter(ts.isObjectLiteralExpression);
}

function property(objectNode, name) {
  return objectNode.properties.find(
    (item) =>
      ts.isPropertyAssignment(item) &&
      ((ts.isIdentifier(item.name) && item.name.text === name) ||
        (ts.isStringLiteral(item.name) && item.name.text === name)),
  );
}

function stringProp(objectNode, name) {
  const item = property(objectNode, name);
  if (!item || !ts.isPropertyAssignment(item)) return null;
  const value = unwrap(item.initializer);
  return ts.isStringLiteral(value) ? value.text : null;
}

function booleanProp(objectNode, name) {
  const item = property(objectNode, name);
  if (!item || !ts.isPropertyAssignment(item)) return null;
  const value = unwrap(item.initializer);
  if (value.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (value.kind === ts.SyntaxKind.FalseKeyword) return false;
  return null;
}

function objectArrayProp(objectNode, name) {
  const item = property(objectNode, name);
  if (!item || !ts.isPropertyAssignment(item)) return [];
  const value = unwrap(item.initializer);
  if (!ts.isArrayLiteralExpression(value)) return [];
  return value.elements.filter(ts.isObjectLiteralExpression);
}

function stringArrayProp(objectNode, name) {
  const item = property(objectNode, name);
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

const nodes = variableArray("fusionNodeLessons");
const recipes = variableArray("fusionLearningRecipes");
const nodeIds = nodes.map((node) => stringProp(node, "nodeId")).filter(Boolean);
const nodeNames = nodes.map((node) => stringProp(node, "nodeName")).filter(Boolean);
const validNodeIds = new Set(nodeIds);

for (const id of duplicates(nodeIds)) errors.push(`duplicate Fusion nodeId: ${id}`);
for (const name of duplicates(nodeNames)) errors.push(`duplicate Fusion nodeName: ${name}`);

const recipeIds = recipes.map((recipe) => stringProp(recipe, "recipeId")).filter(Boolean);
for (const id of duplicates(recipeIds)) errors.push(`duplicate Fusion recipeId: ${id}`);

let hasFusionRecipe = false;
let hasEditFirstRecipe = false;
for (const recipe of recipes) {
  const id = stringProp(recipe, "recipeId") ?? "<unknown-recipe>";
  const useFusion = booleanProp(recipe, "useFusion");
  if (useFusion === true) hasFusionRecipe = true;
  if (useFusion === false) hasEditFirstRecipe = true;

  const steps = objectArrayProp(recipe, "steps");
  if (steps.length === 0) errors.push(`${id}: recipe must contain at least one step`);
  for (const step of steps) {
    const nodeId = stringProp(step, "nodeId");
    if (!nodeId || !validNodeIds.has(nodeId)) {
      errors.push(`${id}: dangling Fusion node reference ${nodeId ?? "<missing>"}`);
    }
  }

  for (const required of ["goal", "editAlternative", "why", "weddingUse"]) {
    if (!stringProp(recipe, required)?.trim()) errors.push(`${id}: missing ${required}`);
  }
  if (stringArrayProp(recipe, "avoid").length === 0) errors.push(`${id}: avoid list must not be empty`);
}

if (!hasFusionRecipe) errors.push("Fusion translator needs at least one USE FUSION recipe");
if (!hasEditFirstRecipe) errors.push("Fusion translator needs at least one EDIT FIRST recipe");

if (errors.length > 0) {
  console.error(`Fusion Node Translator contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Fusion Node Translator contracts OK: ${nodes.length} nodes / ${recipes.length} recipes.`);
