import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(root, "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const readRepo = (relative) => fs.readFileSync(path.join(repoRoot, relative), "utf8");

const registrySource = read("src/data/palmierDavinciHandoffFidelity.ts");
const availabilitySource = read("src/data/resolveAutomationAvailability.ts");
const editabilitySource = read("src/data/resolveHandoffEditability.ts");
const maskRevealLinkSource = read("src/data/maskRevealHandoffFidelity.ts");
const cardSource = read("src/components/MaskRevealSceneHandoffCard.tsx");
const run01 = readRepo("docs/research/2026-08-26-movie-tool-learning-run-01.md");
const run02 = readRepo("docs/research/2026-08-26-movie-tool-learning-run-02.md");

const errors = [];

function requireText(source, token, message) {
  if (!source.includes(token)) errors.push(message);
}

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

for (const audioId of ["audio-volume-keyframes", "audio-fade"]) {
  const body = recordBodies.get(audioId);
  if (!body) {
    errors.push(`Expected audio property record missing: ${audioId}`);
    continue;
  }
  if (body.includes('automationClass: "AUTO_REBUILD"')) {
    errors.push(`${audioId}: must not claim AUTO_REBUILD (run-02 GL-06/07 — Fairlight write path is unverified)`);
  }
  if (body.includes('capabilityTrust: "VERIFIED_WRITE"')) {
    errors.push(`${audioId}: must not claim VERIFIED_WRITE capability without a demonstrated mutation`);
  }
}

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

requireText(availabilitySource, 'export type ResolveEdition = "FREE" | "STUDIO" | "UNKNOWN"', "Resolve edition axis missing");
requireText(availabilitySource, 'id: "resolve-python-lua-developer-api"', "Resolve developer API availability record missing");
requireText(availabilitySource, 'minimumEdition: "STUDIO"', "Studio requirement must be explicit for external developer API routes");
requireText(availabilitySource, 'id: "resolve-workflow-integration"', "Workflow integration availability record missing");
requireText(availabilitySource, "do not promise external Codex/Python/Lua Developer API automation", "Free-edition guardrail missing");
requireText(availabilitySource, "edition unknown", "Unknown-edition guardrail missing");
requireText(availabilitySource, 'id: "lottie-direct-import"', "Lottie direct-import non-API fallback missing");

// Resolve 21 explicitly describes direct Lottie/OGraf timeline import as a fully rendered animation clip.
// Therefore successful native import must not be promoted to source-animation/parameter editability.
requireText(editabilitySource, 'export type HandoffEditabilityClass =', "Handoff editability axis missing");
requireText(editabilitySource, 'propertyId: "lottie-overlay"', "Lottie editability record missing");
requireText(editabilitySource, 'editabilityClass: "CLIP_LEVEL_ONLY"', "Direct Lottie import must remain CLIP_LEVEL_ONLY until an internal-control Canary proves more");
requireText(editabilitySource, "fully rendered animation", "Lottie editability evidence must preserve the official rendered-clip wording");
requireText(editabilitySource, "OGrafLoader/Fusion", "Lottie internal-editability fallback must point to a separate Fusion/OGrafLoader Canary");
requireText(cardSource, "getResolveHandoffEditability", "Mask Reveal handoff UI must render editability separately from transport");
requireText(cardSource, "Editability:", "Mask Reveal handoff UI editability label missing");

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
  `Palmier → DaVinci Handoff Fidelity contracts OK: ${ids.length} properties cataloged, audio automation stays non-AUTO_REBUILD, no property claims VERIFIED_WRITE/RUNTIME_VERIFIED without a Canary, Resolve edition/automation availability is explicit, and Lottie native import stays separate from source-animation editability.`,
);
