import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const validDirections = new Set(["RIGHT", "LEFT", "UP", "DOWN"]);

export function validateMotionActualPreflight(manifest) {
  const errors = [];
  if (!manifest || typeof manifest !== "object") return ["manifest must be an object"];
  if (manifest.schemaVersion !== "motion-actual-preflight/v1") errors.push("schemaVersion must be motion-actual-preflight/v1");
  if (!['cut-match-shape', 'whip-source-matched'].includes(manifest.patternId)) errors.push("patternId must be a source-media gate");
  if (manifest.authority !== "SOURCE_MEDIA") errors.push("authority must remain SOURCE_MEDIA");
  if (manifest.status !== "PRECHECK_ONLY") errors.push("status must remain PRECHECK_ONLY");
  if (manifest.productionAuthority !== false) errors.push("productionAuthority must be false");
  if (manifest.implementationPromotionAllowed !== false) errors.push("implementationPromotionAllowed must be false");
  if (manifest.result !== "PENDING_ACTUAL_RENDER") errors.push("result must remain PENDING_ACTUAL_RENDER");
  if (!Array.isArray(manifest.sourceFiles) || manifest.sourceFiles.length !== 2) errors.push("exactly two sourceFiles are required");
  for (const [index, source] of (manifest.sourceFiles ?? []).entries()) {
    if (!source?.name || typeof source.name !== "string") errors.push(`sourceFiles[${index}].name missing`);
    if (!(source?.sizeBytes > 0)) errors.push(`sourceFiles[${index}].sizeBytes must be positive`);
    if (!(source?.width > 0 && source?.height > 0)) errors.push(`sourceFiles[${index}] video dimensions missing`);
    if (!(Number.isFinite(source?.durationSeconds) && source.durationSeconds > 0)) errors.push(`sourceFiles[${index}].durationSeconds must be positive`);
    if (source?.sha256 !== null || source?.sha256Status !== "PENDING_CLI") errors.push(`sourceFiles[${index}] hash must remain PENDING_CLI`);
  }
  if (typeof manifest.reviewNotes !== "string" || manifest.reviewNotes.trim().length < 10) errors.push("reviewNotes must contain at least 10 characters");
  if (manifest.patternId === "whip-source-matched" && !validDirections.has(manifest.declaredMotionDirection)) errors.push("whip-source-matched requires a declared shared motion direction");
  if (manifest.patternId === "cut-match-shape" && manifest.declaredMotionDirection !== null) errors.push("cut-match-shape must not invent a motion direction");
  return errors;
}

function sampleManifest() {
  return {
    schemaVersion: "motion-actual-preflight/v1",
    patternId: "whip-source-matched",
    authority: "SOURCE_MEDIA",
    status: "PRECHECK_ONLY",
    productionAuthority: false,
    implementationPromotionAllowed: false,
    createdAt: "2026-08-28T00:00:00.000Z",
    sourceFiles: [0, 1].map((index) => ({ name: `shot-${index + 1}.mp4`, sizeBytes: 1000 + index, mimeType: "video/mp4", lastModified: "2026-08-28T00:00:00.000Z", width: 1920, height: 1080, durationSeconds: 2.5, sha256: null, sha256Status: "PENDING_CLI" })),
    declaredMotionDirection: "RIGHT",
    reviewNotes: "両方とも右方向へ動き、blur区間を確認済み。",
    requiredAction: "render required",
    passCondition: "motion continuity required",
    result: "PENDING_ACTUAL_RENDER",
  };
}

function runSelfTest() {
  const valid = sampleManifest();
  if (validateMotionActualPreflight(valid).length) throw new Error("valid preflight fixture must pass");
  const unsafeMutations = [
    { ...valid, status: "TESTED" },
    { ...valid, productionAuthority: true },
    { ...valid, implementationPromotionAllowed: true },
    { ...valid, result: "VERIFIED" },
    { ...valid, declaredMotionDirection: null },
    { ...valid, sourceFiles: valid.sourceFiles.slice(0, 1) },
    { ...valid, sourceFiles: valid.sourceFiles.map((source) => ({ ...source, sha256Status: "VERIFIED" })) },
  ];
  for (const unsafe of unsafeMutations) {
    if (validateMotionActualPreflight(unsafe).length === 0) throw new Error(`unsafe mutation passed: ${JSON.stringify(unsafe)}`);
  }
  console.log(`Motion Actual preflight validator self-test OK: 1 valid fixture / ${unsafeMutations.length} unsafe promotions rejected.`);
}

const invokedDirectly = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  const target = process.argv[2];
  if (target === "--self-test") {
    runSelfTest();
  } else if (!target) {
    console.error("Usage: node scripts/verify-motion-actual-preflight.mjs <preflight.json> | --self-test");
    process.exit(2);
  } else {
    const manifest = JSON.parse(fs.readFileSync(path.resolve(target), "utf8"));
    const errors = validateMotionActualPreflight(manifest);
    if (errors.length) {
      console.error(`Motion Actual preflight FAILED (${errors.length})`);
      for (const error of errors) console.error(`- ${error}`);
      process.exit(1);
    }
    console.log(`Motion Actual preflight OK: ${manifest.patternId} has two metadata-complete source candidates; Actual render/hash remain pending and no promotion is allowed.`);
  }
}
