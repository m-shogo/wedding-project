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
  return ts.createSourceFile(relativePath, read(relativePath), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
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

const sourceOptions = variableArray("src/lib/bookManifest.ts", "bookSourceOptions");
const sourceValues = sourceOptions.map((option) => stringProp(option, "value")).filter(Boolean);
const expectedSources = ["owned_book", "official_training", "other"];
for (const expected of expectedSources) {
  if (!sourceValues.includes(expected)) errors.push(`book source option missing: ${expected}`);
}
if (new Set(sourceValues).size !== sourceValues.length) errors.push("book source options contain duplicates");

const helperSource = read("src/lib/bookManifest.ts");
for (const helper of ["validateBookManifest", "getBookCoverage", "formatChapterPages"]) {
  if (!helperSource.includes(`function ${helper}`) && !helperSource.includes(`function ${helper}(`)) {
    errors.push(`book manifest helper missing: ${helper}`);
  }
}

const typeSource = read("src/types/learning.ts");
if (!/interface BookChapterManifest[\s\S]*skillIds:\s*string\[\]/.test(typeSource)) {
  errors.push("BookChapterManifest must keep multi-skill skillIds[] support");
}
if (!/sourceType:\s*"owned_book"\s*\|\s*"official_training"\s*\|\s*"other"/.test(typeSource)) {
  errors.push("BookManifest sourceType union changed unexpectedly");
}

const appSource = read("src/App.tsx");
if (!appSource.includes('path="movie-coach/book"')) errors.push("Book Manifest route missing");
if (!appSource.includes("BookManifestManager")) errors.push("BookManifestManager is not wired into App");

const pageSource = read("src/pages/BookManifestManager.tsx");
for (const token of ["allLearningSkills", "allProductionOutcomes", "validateBookManifest", "getBookCoverage", "selectTodayOutcome"]) {
  if (!pageSource.includes(token)) errors.push(`BookManifestManager integration missing: ${token}`);
}

if (errors.length > 0) {
  console.error(`Book Manifest contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Book Manifest contracts OK: ${sourceValues.length} sources / multi-skill chapters / Today coverage wired.`);
