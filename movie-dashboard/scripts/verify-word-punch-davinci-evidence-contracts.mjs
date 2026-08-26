import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const artifact = fs.readFileSync(path.join(root, "src/data/wordPunchDaVinciActualArtifact.ts"), "utf8");
const capture = fs.readFileSync(path.join(root, "src/data/wordPunchDaVinciEvidenceCapture.ts"), "utf8");
const shared = fs.readFileSync(path.join(root, "src/data/davinciFollowerEvidenceContract.ts"), "utf8");
const errors = [];
const requireText = (source, token, message) => {
  if (!source.includes(token)) errors.push(message);
};

for (const token of [
  'schemaVersion: "word-punch-davinci-actual-artifact/v1"',
  'authority: "EVIDENCE_ONLY"',
  'patternId: "type-word-punch"',
  'state: "NOT_VERIFIED"',
  'renderCompleted: "NOT_RUN"',
  'visualQa1x: "NOT_RUN"',
  'visualQaHalfSpeed: "NOT_RUN"',
  'productionReady: false',
  'attachWordPunchDaVinciActualReadback',
  'scaleApplied: exactDeltaState',
]) {
  requireText(artifact, token, `Word Punch Actual artifact missing contract: ${token}`);
}

for (const token of [
  'schemaVersion: "word-punch-davinci-evidence-capture/v1"',
  'authority: "EVIDENCE_ONLY"',
  'parseDaVinciLiveParameterBindings',
  'parseDaVinciVisualQa',
  'assertDaVinciEvidenceIdentity',
  'TRANSFORM_TOOL',
  'SCALE',
  'OPACITY',
  'EASING',
  'allMachineComparableChecksPass',
  'productionReady: false',
]) {
  requireText(capture, token, `Word Punch evidence capture missing contract: ${token}`);
}

for (const token of [
  'export function parseDaVinciLiveParameterBindings',
  'export function assertDaVinciEvidenceIdentity',
  'export function blankDaVinciVisualQa',
]) {
  requireText(shared, token, `Shared DaVinci evidence helper missing: ${token}`);
}

if (/productionReady:\s*true/.test(artifact) || /productionReady:\s*true/.test(capture)) {
  errors.push("Word Punch Actual/evidence must never self-promote to productionReady=true");
}
if (/state:\s*"VERIFIED"/.test(artifact)) {
  errors.push("Word Punch live parameter binding must remain NOT_VERIFIED before Mac Actual");
}
if (errors.length) {
  console.error(`Word Punch DaVinci evidence contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log("Word Punch DaVinci evidence contracts OK: bounded Actual/readback/visual-QA evidence is fail-closed, identity-bound and remains non-authoritative until real Mac Resolve work is captured and separately promoted.");
