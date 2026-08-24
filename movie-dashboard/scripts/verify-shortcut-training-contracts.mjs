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

function nullableStringProp(objectNode, name) {
  const item = prop(objectNode, name);
  if (!item || !ts.isPropertyAssignment(item)) return undefined;
  const value = unwrap(item.initializer);
  if (ts.isStringLiteral(value)) return value.text;
  if (value.kind === ts.SyntaxKind.NullKeyword) return null;
  return undefined;
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

const actions = variableArray("src/data/shortcutTraining.ts", "shortcutActions");
const drills = variableArray("src/data/shortcutTraining.ts", "shortcutDrills");
const baseOutcomes = variableArray("src/data/movieCoach.ts", "productionOutcomes");
const profilePhases = variableArray("src/data/profileCoachRoadmap.ts", "profileCoachPhases");

const actionIds = actions.map((action) => stringProp(action, "actionId")).filter(Boolean);
const validActionIds = new Set(actionIds);
for (const id of duplicates(actionIds)) errors.push(`duplicate shortcut actionId: ${id}`);

for (const action of actions) {
  const id = stringProp(action, "actionId") ?? "<unknown-action>";
  const policy = stringProp(action, "mappingPolicy");
  const defaultBinding = nullableStringProp(action, "defaultBinding");
  if (!new Set(["known_core", "verify_current_map"]).has(policy)) {
    errors.push(`${id}: invalid mappingPolicy ${policy ?? "<missing>"}`);
  }
  if (policy === "known_core" && !defaultBinding?.trim()) {
    errors.push(`${id}: known_core action needs a defaultBinding`);
  }
  for (const required of ["label", "purpose", "weddingUse", "avoid"]) {
    if (!stringProp(action, required)?.trim()) errors.push(`${id}: missing ${required}`);
  }
}

const validOutcomeIds = new Set([
  ...baseOutcomes.map((outcome) => stringProp(outcome, "outcomeId")).filter(Boolean),
  ...profilePhases.map((phase) => stringProp(phase, "phaseId")).filter(Boolean),
]);
const drillIds = drills.map((drill) => stringProp(drill, "drillId")).filter(Boolean);
for (const id of duplicates(drillIds)) errors.push(`duplicate shortcut drillId: ${id}`);

for (const drill of drills) {
  const id = stringProp(drill, "drillId") ?? "<unknown-drill>";
  const actionRefs = stringArrayProp(drill, "actionIds");
  if (actionRefs.length === 0) errors.push(`${id}: actionIds must not be empty`);
  for (const actionId of actionRefs) {
    if (!validActionIds.has(actionId)) errors.push(`${id}: dangling action reference ${actionId}`);
  }
  for (const outcomeId of stringArrayProp(drill, "weddingOutcomeIds")) {
    if (!validOutcomeIds.has(outcomeId)) errors.push(`${id}: dangling Wedding Outcome ${outcomeId}`);
  }
  if (stringArrayProp(drill, "practice").length < 3) errors.push(`${id}: needs at least 3 practice steps`);
  if (!stringProp(drill, "done")?.trim()) errors.push(`${id}: missing done condition`);
}

if (errors.length > 0) {
  console.error(`Shortcut Training contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Shortcut Training contracts OK: ${actions.length} actions / ${drills.length} drills.`);
