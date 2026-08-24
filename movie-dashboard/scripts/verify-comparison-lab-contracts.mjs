import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];

function parse(relativePath) {
  return ts.createSourceFile(relativePath, fs.readFileSync(path.join(root, relativePath), "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
}
function unwrap(expression) {
  let current = expression;
  while (current && (ts.isParenthesizedExpression(current) || ts.isAsExpression(current) || ts.isTypeAssertionExpression(current) || ts.isSatisfiesExpression?.(current))) current = current.expression;
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
  return objectNode.properties.find((item) => ts.isPropertyAssignment(item) && ((ts.isIdentifier(item.name) && item.name.text === name) || (ts.isStringLiteral(item.name) && item.name.text === name)));
}
function stringProp(objectNode, name) {
  const item = prop(objectNode, name);
  if (!item || !ts.isPropertyAssignment(item)) return null;
  const value = unwrap(item.initializer);
  return ts.isStringLiteral(value) ? value.text : null;
}
function stringArrayProp(objectNode, name) {
  const item = prop(objectNode, name);
  if (!item || !ts.isPropertyAssignment(item)) return [];
  const value = unwrap(item.initializer);
  if (!ts.isArrayLiteralExpression(value)) return [];
  return value.elements.map((entry) => { const unwrapped = unwrap(entry); return ts.isStringLiteral(unwrapped) ? unwrapped.text : null; }).filter(Boolean);
}
function duplicates(values) {
  const seen = new Set();
  const duplicate = new Set();
  for (const value of values) { if (seen.has(value)) duplicate.add(value); seen.add(value); }
  return [...duplicate];
}

const dimensions = variableArray("src/data/comparisonLab.ts", "comparisonDimensions");
const protocols = variableArray("src/data/comparisonLab.ts", "comparisonProtocols");
const baseSkills = variableArray("src/data/movieCoach.ts", "learningSkills");
const profileSkills = variableArray("src/data/profileCoachLearning.ts", "profileLearningSkills");
const baseOutcomes = variableArray("src/data/movieCoach.ts", "productionOutcomes");
const profilePhases = variableArray("src/data/profileCoachRoadmap.ts", "profileCoachPhases");

const validSkillIds = new Set([...baseSkills, ...profileSkills].map((skill) => stringProp(skill, "skillId")).filter(Boolean));
const validOutcomeIds = new Set([
  ...baseOutcomes.map((outcome) => stringProp(outcome, "outcomeId")).filter(Boolean),
  ...profilePhases.map((phase) => stringProp(phase, "phaseId")).filter(Boolean),
]);
const dimensionIds = dimensions.map((dimension) => stringProp(dimension, "dimensionId")).filter(Boolean);
const validDimensionIds = new Set(dimensionIds);
for (const id of duplicates(dimensionIds)) errors.push(`duplicate comparison dimensionId: ${id}`);

for (const dimension of dimensions) {
  const id = stringProp(dimension, "dimensionId") ?? "<unknown-dimension>";
  for (const skillId of stringArrayProp(dimension, "skillIds")) {
    if (!validSkillIds.has(skillId)) errors.push(`${id}: dangling skill reference ${skillId}`);
  }
  for (const required of ["label", "question", "decisionRule"]) {
    if (!stringProp(dimension, required)?.trim()) errors.push(`${id}: missing ${required}`);
  }
}

const protocolIds = protocols.map((protocol) => stringProp(protocol, "protocolId")).filter(Boolean);
for (const id of duplicates(protocolIds)) errors.push(`duplicate comparison protocolId: ${id}`);
for (const protocol of protocols) {
  const id = stringProp(protocol, "protocolId") ?? "<unknown-protocol>";
  const outcomeId = stringProp(protocol, "outcomeId");
  const dimensionId = stringProp(protocol, "dimensionId");
  if (!outcomeId || !validOutcomeIds.has(outcomeId)) errors.push(`${id}: dangling Wedding Outcome ${outcomeId ?? "<missing>"}`);
  if (!dimensionId || !validDimensionIds.has(dimensionId)) errors.push(`${id}: dangling dimension ${dimensionId ?? "<missing>"}`);
  for (const required of ["title", "versionA", "versionB", "preferWhen", "avoid"]) {
    if (!stringProp(protocol, required)?.trim()) errors.push(`${id}: missing ${required}`);
  }
  if (stringArrayProp(protocol, "compare").length < 2) errors.push(`${id}: compare needs at least 2 points`);
}

if (errors.length > 0) {
  console.error(`Comparison Lab contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`Comparison Lab contracts OK: ${dimensions.length} dimensions / ${protocols.length} protocols.`);
