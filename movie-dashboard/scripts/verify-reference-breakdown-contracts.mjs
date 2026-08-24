import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];

function read(relativePath) { return fs.readFileSync(path.join(root, relativePath), "utf8"); }
function parse(relativePath) { return ts.createSourceFile(relativePath, read(relativePath), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS); }
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
  const seen = new Set(); const dup = new Set();
  for (const value of values) { if (seen.has(value)) dup.add(value); seen.add(value); }
  return [...dup];
}

const techniques = variableArray("src/data/referenceBreakdown.ts", "referenceTechniques");
const examples = variableArray("src/data/referenceBreakdown.ts", "referenceBreakdownExamples");
const baseSkills = variableArray("src/data/movieCoach.ts", "learningSkills");
const profileSkills = variableArray("src/data/profileCoachLearning.ts", "profileLearningSkills");
const validSkillIds = new Set([...baseSkills, ...profileSkills].map((skill) => stringProp(skill, "skillId")).filter(Boolean));
const techniqueIds = techniques.map((item) => stringProp(item, "techniqueId")).filter(Boolean);
const validTechniqueIds = new Set(techniqueIds);
for (const id of duplicates(techniqueIds)) errors.push(`duplicate reference techniqueId: ${id}`);

const allowedImplementations = new Set(["Edit", "Fusion", "Color", "Fairlight", "Either"]);
for (const technique of techniques) {
  const id = stringProp(technique, "techniqueId") ?? "<unknown-technique>";
  const implementation = stringProp(technique, "implementation");
  if (!allowedImplementations.has(implementation)) errors.push(`${id}: invalid implementation ${implementation ?? "<missing>"}`);
  for (const skillId of stringArrayProp(technique, "skillIds")) if (!validSkillIds.has(skillId)) errors.push(`${id}: dangling skill ${skillId}`);
  for (const required of ["label", "observe", "editPath", "decisionRule", "avoid"]) if (!stringProp(technique, required)?.trim()) errors.push(`${id}: missing ${required}`);
}

const exampleIds = examples.map((item) => stringProp(item, "exampleId")).filter(Boolean);
for (const id of duplicates(exampleIds)) errors.push(`duplicate reference exampleId: ${id}`);
for (const example of examples) {
  const id = stringProp(example, "exampleId") ?? "<unknown-example>";
  const techniqueRefs = stringArrayProp(example, "techniqueIds");
  if (techniqueRefs.length < 2) errors.push(`${id}: should decompose into at least 2 techniques`);
  for (const ref of techniqueRefs) if (!validTechniqueIds.has(ref)) errors.push(`${id}: dangling technique ${ref}`);
  const implementation = stringProp(example, "recommendedImplementation");
  if (!allowedImplementations.has(implementation)) errors.push(`${id}: invalid recommendedImplementation ${implementation ?? "<missing>"}`);
  for (const required of ["title", "observation", "estimatedFrames", "weddingUse", "why"]) if (!stringProp(example, required)?.trim()) errors.push(`${id}: missing ${required}`);
}

const appSource = read("src/App.tsx");
if (!appSource.includes('path="movie-coach/reference"')) errors.push("Reference Breakdown route missing");
const pageSource = read("src/pages/ReferenceBreakdown.tsx");
for (const token of ["allLearningSkills", "allProductionOutcomes", "wedding-movie-reference-breakdown-v1"]) if (!pageSource.includes(token)) errors.push(`Reference Breakdown integration missing: ${token}`);

if (errors.length) {
  console.error(`Reference Breakdown contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`Reference Breakdown contracts OK: ${techniques.length} techniques / ${examples.length} examples.`);
