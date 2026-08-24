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

const tracks = variableArray("src/data/timelineAnatomy.ts", "timelineTrackLessons");
const practices = variableArray("src/data/timelineAnatomy.ts", "timelinePractices");
const baseOutcomes = variableArray("src/data/movieCoach.ts", "productionOutcomes");
const profilePhases = variableArray("src/data/profileCoachRoadmap.ts", "profileCoachPhases");

const expectedTracks = ["V3", "V2", "V1", "A1", "A2", "A3"];
const trackIds = tracks.map((track) => stringProp(track, "trackId")).filter(Boolean);
for (const id of duplicates(trackIds)) errors.push(`duplicate timeline trackId: ${id}`);
if (trackIds.join("|") !== expectedTracks.join("|")) {
  errors.push(`timeline anatomy must define ${expectedTracks.join(" → ")}`);
}

for (const track of tracks) {
  const id = stringProp(track, "trackId") ?? "<unknown-track>";
  for (const required of ["role", "plainName", "whySeparate", "rule", "commonMistake"]) {
    if (!stringProp(track, required)?.trim()) errors.push(`${id}: missing ${required}`);
  }
  if (stringArrayProp(track, "contains").length === 0) errors.push(`${id}: contains must not be empty`);
}

const validTrackIds = new Set(trackIds);
const validOutcomeIds = new Set([
  ...baseOutcomes.map((outcome) => stringProp(outcome, "outcomeId")).filter(Boolean),
  ...profilePhases.map((phase) => stringProp(phase, "phaseId")).filter(Boolean),
]);
const practiceIds = practices.map((practice) => stringProp(practice, "practiceId")).filter(Boolean);
for (const id of duplicates(practiceIds)) errors.push(`duplicate timeline practiceId: ${id}`);

for (const practice of practices) {
  const id = stringProp(practice, "practiceId") ?? "<unknown-practice>";
  const outcomeId = stringProp(practice, "outcomeId");
  if (!outcomeId || !validOutcomeIds.has(outcomeId)) {
    errors.push(`${id}: dangling Wedding Outcome ${outcomeId ?? "<missing>"}`);
  }
  for (const trackId of stringArrayProp(practice, "tracks")) {
    if (!validTrackIds.has(trackId)) errors.push(`${id}: dangling track reference ${trackId}`);
  }
  if (stringArrayProp(practice, "steps").length < 3) errors.push(`${id}: needs at least 3 practice steps`);
  if (!stringProp(practice, "done")?.trim()) errors.push(`${id}: missing done condition`);
}

if (errors.length > 0) {
  console.error(`Timeline Anatomy contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Timeline Anatomy contracts OK: ${tracks.length} tracks / ${practices.length} Wedding practices.`);
