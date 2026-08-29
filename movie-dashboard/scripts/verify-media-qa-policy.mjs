import { assertCompleteOrAbsent, classifyMediaSet } from "./media-qa-policy.mjs";

const files = ["a", "b", "c"];
const cases = [
  [new Set(), "ABSENT"],
  [new Set(files), "COMPLETE"],
  [new Set(["a"]), "PARTIAL"],
];
for (const [present, expected] of cases) {
  const state = classifyMediaSet(files, (file) => present.has(file));
  if (state.mode !== expected) throw new Error(`expected ${expected}, got ${state.mode}`);
}
const errors = [];
assertCompleteOrAbsent("fixture", classifyMediaSet(files, (file) => file === "a"), errors);
if (errors.length !== 1 || !errors[0].includes("b, c")) throw new Error("partial media set must fail closed");

console.log("Media QA policy OK: complete=verify, absent=code-only, partial=fail-closed.");
