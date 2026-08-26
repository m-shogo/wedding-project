import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(root, "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const readRepo = (relative) => fs.readFileSync(path.join(repoRoot, relative), "utf8");

const registrySource = read("src/data/palmierDavinciHandoffFidelity.ts");
const availabilitySource = read("src/data/resolveAutomationAvailability.ts");
const maskRevealLinkSource = read("src/data/maskRevealHandoffFidelity.ts");
const cardSource = read("src/components/MaskRevealSceneHandoffCard.tsx");
const run01 = readRepo("docs/research/2026-08-26-movie-tool-learning-run-01.md");
const run02 = readRepo("docs/research/2026-08-26-movie-tool-learning-run-02.md");

const errors = [];

function requireText(source, token, message) {
  if (!source.includes(token)) errors.push(message);
}

// Both research runs must actually exist and be readable — the registry claims to promote them.
if (!run01.includes("RESEARCH_SATURATED = false")) errors.push("run-01 status marker missing/changed unexpectedly");
if (!run02.includes("RESEARCH_SATURATED = false")) errors.push("run-02 status marker missing/changed unexpectedly");

requireText(registrySource, 'export type TransportClass =', "TransportClass union missing");
for (const value of ["EXACT", "APPROX", "REBUILD_VALUES", "REBUILD_ASSET", "REBUILD_INTENT", "BAKE_OPTION", "LOST"]) {
  requireText(registrySource, `"${value}"`, `TransportClass missing value: ${value}`);
}
requireText(registrySource, 'export type AutomationClass =', "AutomationClass union missing");
for (const value of ["AUTO_REBUILD", "ASSISTED_REBUILD", "VISUAL_REBUILD", "MANUAL_ONLY"]) {
  requireText(registrySource, `"${value}"`, `AutomationClass missing value: ${value}`);
}
requireText(registrySource, 'export type CapabilityTrust =', "CapabilityTrust union missing");
for (const value of ["VERIFIED_WRITE", "GENERATED_ARTIFACT", "ASSISTED_MANUAL", "UNKNOWN"]) {
  requireText(registrySource, `"${value}"`, `CapabilityTrust missing value: ${value}`);
}
requireText(registrySource, 'export type EvidenceState =', "EvidenceState union missing");
requireText(registrySource, '"PENDING_RUNTIME"', "EvidenceState missing PENDING_RUNTIME");
requireText(registrySource, '"RUNTIME_VERIFIED"', "EvidenceState missing RUNTIME_VERIFIED");

// Extract each record object body between two "id: " occurrences so we can check invariants per record.
const idMatches = [...registrySource.matchAll(/^\s{2}\{\s*\n\s*id: "([^"]+)",/gm)];
const ids = idMatches.map((match) => match[1]);
if (ids.length === 0) errors.push("No handoff property records found");
if (new Set(ids).size !== ids.length) errors.push("Duplicate handoff property ids");

const recordBodies = new Map();
for (let index = 0; index < idMatches.length; index += 1) {
  const start = idMatches[index].index;
  const end = index + 1 < idMatches.length ? idMatches[index + 1].index : registrySource.indexOf("\n];", start);
  recordBodies.set(idMatches[index][1], registrySource.slice(start, end));
}

// GL-06/GL-07 (run-02): audio volume/fade must never claim AUTO_REBUILD or VERIFIED_WRITE — the
// documented capability is a Fairlight scripting limitation, not a proven write path.
for (const audioId of ["audio-volume-keyframes", "audio-fade"]) {
  const body = recordBodies.get(audioId);
  if (!body) {
    errors.push(`Expected audio property record missing: ${audioId}`);
    continue;
  }
  if (body.includes('automationClass: "AUTO_REBUILD"')) {
    errors.push(`${audioId}: must not claim AUTO_REBUILD (run-02 GL-06/07 — Fairlight write path is unverified, do not infer from general Resolve scripting)`);
  }
  if (body.includes('capabilityTrust: "VERIFIED_WRITE"')) {
    errors.push(`${audioId}: must not claim VERIFIED_WRITE capability without a demonstrated mutation`);
  }
}

// Every record must cite at least one research run — no record invented from assumption.
// No record may claim VERIFIED_WRITE or RUNTIME_VERIFIED yet — no Canary has been run in this repo.
for (const [id, body] of recordBodies) {
  if (!/sourceCitations: \[[^\]]*RUN0[12][^\]]*\]/.test(body)) {
    errors.push(`${id}: sourceCitations must reference RUN01/RUN02`);
  }
  if (body.includes('capabilityTrust: "VERIFIED_WRITE"')) {
    errors.push(`${id}: capabilityTrust VERIFIED_WRITE requires an actual Canary; none has been recorded yet in this repo`);
  }
  if (body.includes('evidenceState: "RUNTIME_VERIFIED"')) {
    errors.push(`${id}: evidenceState RUNTIME_VERIFIED requires an actual Canary; none has been recorded yet in this repo`);
  }
}

requireText(registrySource, "export function buildCodexRebuildInstruction", "Codex instruction builder missing");
requireText(registrySource, "Target: DaVinci Resolve", "Codex instruction template missing Target line");
requireText(registrySource, "Transport state:", "Codex instruction template missing Transport state line");
requireText(registrySource, "Preferred native route:", "Codex instruction template missing Preferred native route line");
requireText(registrySource, "Automation capability:", "Codex instruction template missing Automation capability line");
requireText(registrySource, "Editable-after-rebuild: required", "Codex instruction template missing Editable-after-rebuild line");
requireText(registrySource, "Verification: readback + render checkpoint + dependency check", "Codex instruction template missing Verification line");
requireText(registrySource, "do not report this as confirmed working", "Codex instruction must warn about PENDING_RUNTIME evidence");

// Availability is separate from capability. Current Blackmagic product material describes
// Python/Lua developer APIs, workflow integrations, and remote scripting under Resolve Studio.
// The registry must therefore never imply that an UNKNOWN/FREE edition can use external Codex automation.
requireText(availabilitySource, 'export type ResolveEdition = "FREE" | "STUDIO" | "UNKNOWN"', "Resolve edition axis missing");
requireText(availabilitySource, 'id: "resolve-python-lua-developer-api"', "Resolve developer API availability record missing");
requireText(availabilitySource, 'minimumEdition: "STUDIO"', "Studio requirement must be explicit for external developer API routes");
requireText(availabilitySource, 'id: "resolve-workflow-integration"', "Workflow integration availability record missing");
requireText(availabilitySource, "do not promise external Codex/Python/Lua Developer API automation", "Free-edition guardrail missing");
requireText(availabilitySource, "edition unknown", "Unknown-edition guardrail missing");
requireText(availabilitySource, 'id: "lottie-direct-import"', "Lottie direct-import non-API fallback missing");
requireText(cardSource, "resolveCodexAutomationGuardrail", "Mask Reveal handoff UI must surface edition/automation availability");
requireText(cardSource, "Automation availability:", "Mask Reveal handoff UI availability label missing");

requireText(maskRevealLinkSource, "maskRevealActiveHandoffPropertyIds", "Mask Reveal → handoff fidelity link missing");
requireText(maskRevealLinkSource, "buildMaskRevealHandoffFidelityReport", "Mask Reveal fidelity report builder missing");

requireText(cardSource, "buildMaskRevealHandoffFidelityReport", "Mask Reveal handoff card must render the fidelity report");
requireText(cardSource, "PENDING_RUNTIME", "Mask Reveal handoff card must show the PENDING_RUNTIME caveat, not present it as verified");

if (errors.length) {
  console.error(`Palmier → DaVinci Handoff Fidelity contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Palmier → DaVinci Handoff Fidelity contracts OK: ${ids.length} properties cataloged from research run-01/02, audio automation stays non-AUTO_REBUILD (GL-06/07), no record claims VERIFIED_WRITE/RUNTIME_VERIFIED without an actual Canary, Resolve edition/automation availability is explicit, external API routes stay Studio-scoped, and the Mask Reveal handoff card surfaces both runtime and edition uncertainty.`,
);
