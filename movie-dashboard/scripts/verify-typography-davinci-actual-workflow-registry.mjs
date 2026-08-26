import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const exists = (relative) => fs.existsSync(path.join(root, relative));
const registry = read("src/data/typographyDaVinciActualWorkflowRegistry.ts");
const runPlan = read("src/data/typographyDaVinciActualRunPlan.ts");
const queue = read("src/components/TypographyDaVinciActualRunQueue.tsx");
const errors = [];

const expected = [
  ["type-char-stagger", "src/data/charStaggerDaVinciTranslator.ts", "src/data/charStaggerDaVinciActualArtifact.ts", "src/data/charStaggerDaVinciEvidenceCapture.ts"],
  ["type-type-on-rhythm", "src/data/typeOnRhythmDaVinciTranslator.ts", "src/data/typeOnRhythmDaVinciActualArtifact.ts", "src/data/typeOnRhythmDaVinciEvidenceCapture.ts"],
  ["type-word-punch", "src/data/wordPunchDaVinciTranslator.ts", "src/data/wordPunchDaVinciActualArtifact.ts", "src/data/wordPunchDaVinciEvidenceCapture.ts"],
  ["type-tracking-burst", "src/data/trackingBurstDaVinciTranslator.ts", "src/data/trackingBurstDaVinciActualArtifact.ts", "src/data/trackingBurstDaVinciEvidenceCapture.ts"],
  ["type-vertical-wipe", "src/data/verticalWipeDaVinciTranslator.ts", "src/data/verticalWipeDaVinciActualArtifact.ts", "src/data/verticalWipeDaVinciEvidenceCapture.ts"],
  ["type-outline-fill", "src/data/outlineFillDaVinciTranslator.ts", "src/data/outlineFillDaVinciActualArtifact.ts", "src/data/outlineFillDaVinciEvidenceCapture.ts"],
  ["type-baseline-hop", "src/data/baselineHopDaVinciTranslator.ts", "src/data/baselineHopDaVinciActualArtifact.ts", "src/data/baselineHopDaVinciEvidenceCapture.ts"],
  ["type-triplet", "src/data/tripletDaVinciTranslator.ts", "src/data/tripletDaVinciActualArtifact.ts", "src/data/tripletDaVinciEvidenceCapture.ts"],
];

for (const [patternId, translator, artifact, capture] of expected) {
  for (const token of [`patternId: "${patternId}"`, `translatorFile: "${translator}"`, `actualArtifactFile: "${artifact}"`, `evidenceCaptureFile: "${capture}"`]) {
    if (!registry.includes(token)) errors.push(`Workflow registry missing ${token}`);
  }
  for (const file of [translator, artifact, capture]) {
    if (!exists(file)) errors.push(`Workflow registry points to missing file: ${file}`);
  }
}

const ids = [...registry.matchAll(/patternId: "(type-[^"]+)"/g)].map((match) => match[1]);
if (ids.length !== expected.length) errors.push(`Expected ${expected.length} Actual workflow entries, found ${ids.length}`);
if (new Set(ids).size !== ids.length) errors.push("Actual workflow registry contains duplicate pattern ids");

for (const token of [
  'evidenceAuthority: "EVIDENCE_ONLY"',
  "macActualRequired: true",
  "getTypographyDaVinciActualWorkflow",
]) if (!registry.includes(token)) errors.push(`Workflow registry safety contract missing: ${token}`);

for (const token of [
  "getTypographyDaVinciActualWorkflow",
  "translatorFile: string | null",
  "actualArtifactFile: string",
  "evidenceCaptureFile: string",
  "verificationCommand: string",
  'evidenceAuthority: "EVIDENCE_ONLY"',
  "WORKFLOW_FILE_LISTED != WORKFLOW_EXECUTED",
  "Open the exact translator / Actual artifact / evidence capture files listed in this manifest",
]) if (!runPlan.includes(token)) errors.push(`Actual run manifest did not adopt workflow registry contract: ${token}`);

for (const token of [
  "translator: {item.translatorFile}",
  "artifact: {item.actualArtifactFile}",
  "evidence: {item.evidenceCaptureFile}",
  "verify: {item.verificationCommand}",
  "ファイル名やverification commandが揃ってもActual実施証拠ではありません",
]) if (!queue.includes(token)) errors.push(`Actual queue does not expose honest executable handoff: ${token}`);

if (/macActualState:\s*"PASS"/.test(registry) || /productionReady:\s*true/.test(registry)) {
  errors.push("Workflow registry must never fabricate Actual PASS or production readiness");
}

if (errors.length) {
  console.error(`Typography DaVinci Actual workflow registry FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log("Typography DaVinci Actual workflow registry OK: all eight candidates point to existing translator/artifact/evidence files, the run manifest carries exact handoff paths, and file discovery is never treated as Mac Actual evidence.");
