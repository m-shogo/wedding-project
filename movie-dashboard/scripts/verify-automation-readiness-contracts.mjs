import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
function read(p) { return fs.readFileSync(path.join(root, p), "utf8"); }
function parse(p) { return ts.createSourceFile(p, read(p), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS); }
function unwrap(e) { let c = e; while (c && (ts.isParenthesizedExpression(c) || ts.isAsExpression(c) || ts.isTypeAssertionExpression(c) || ts.isSatisfiesExpression?.(c))) c = c.expression; return c; }
function variableArray(p, name) {
  const source = parse(p); let result = null;
  function visit(node) {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === name) {
      const value = node.initializer ? unwrap(node.initializer) : null;
      if (value && ts.isArrayLiteralExpression(value)) result = value;
      return;
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  if (!result) throw new Error(`${p}: ${name} not found`);
  return result.elements.filter(ts.isObjectLiteralExpression);
}
function prop(obj, name) { return obj.properties.find((item) => ts.isPropertyAssignment(item) && ((ts.isIdentifier(item.name) && item.name.text === name) || (ts.isStringLiteral(item.name) && item.name.text === name))); }
function stringProp(obj, name) { const item = prop(obj, name); if (!item || !ts.isPropertyAssignment(item)) return null; const value = unwrap(item.initializer); return ts.isStringLiteral(value) ? value.text : null; }
function stringArrayProp(obj, name) { const item = prop(obj, name); if (!item || !ts.isPropertyAssignment(item)) return []; const value = unwrap(item.initializer); if (!ts.isArrayLiteralExpression(value)) return []; return value.elements.map((entry) => { const v = unwrap(entry); return ts.isStringLiteral(v) ? v.text : null; }).filter(Boolean); }
function duplicates(values) { const seen = new Set(); const dup = new Set(); for (const value of values) { if (seen.has(value)) dup.add(value); seen.add(value); } return [...dup]; }

const candidates = variableArray("src/data/automationCandidates.ts", "automationCandidates");
const baseSkills = variableArray("src/data/movieCoach.ts", "learningSkills");
const profileSkills = variableArray("src/data/profileCoachLearning.ts", "profileLearningSkills");
const skillPolicies = new Map([...baseSkills, ...profileSkills].map((skill) => [stringProp(skill, "skillId"), stringProp(skill, "automationPolicy")]));

const candidateIds = candidates.map((candidate) => stringProp(candidate, "candidateId")).filter(Boolean);
for (const id of duplicates(candidateIds)) errors.push(`duplicate automation candidateId: ${id}`);

for (const candidate of candidates) {
  const id = stringProp(candidate, "candidateId") ?? "<unknown-candidate>";
  const skillId = stringProp(candidate, "skillId");
  if (!skillId || !skillPolicies.has(skillId)) errors.push(`${id}: dangling skill ${skillId ?? "<missing>"}`);
  if (skillId && skillPolicies.get(skillId) === "never") errors.push(`${id}: human-only skill must not have automation candidate (${skillId})`);
  if (stringArrayProp(candidate, "tools").length === 0) errors.push(`${id}: tools required`);
  for (const required of ["label", "automate", "keepHuman", "evidenceToKeep", "handoff"]) if (!stringProp(candidate, required)?.trim()) errors.push(`${id}: missing ${required}`);
}

const helperSource = read("src/lib/automationReadiness.ts");
for (const status of ["human_only", "needs_learning", "needs_practice", "needs_wedding_use", "ready", "automated"]) if (!helperSource.includes(`"${status}"`)) errors.push(`readiness status missing: ${status}`);
for (const policy of ["never", "safe_anytime", "after_practice", "after_wedding_use"]) if (!helperSource.includes(`"${policy}"`)) errors.push(`automation policy handling missing: ${policy}`);

const appSource = read("src/App.tsx");
if (!appSource.includes('path="movie-coach/auto"')) errors.push("Automation Readiness route missing");
const pageSource = read("src/pages/AutomationReadiness.tsx");
for (const token of ["allLearningSkills", "getAutomationReadiness", "saveCoachProgress", "markAutomated"]) if (!pageSource.includes(token)) errors.push(`Automation Readiness integration missing: ${token}`);

if (errors.length) {
  console.error(`Automation Readiness contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`Automation Readiness contracts OK: ${candidates.length} candidates / human boundaries preserved.`);
