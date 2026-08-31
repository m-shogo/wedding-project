import {createHash} from "node:crypto";
import {execFileSync} from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const dashboardRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(dashboardRoot, "..");
const studioRoot = path.join(repoRoot, "motion-studio");
const reviewScript = path.join(studioRoot, "scripts/japanese-friends-opening-start-sync-listening-review.mts");
const evidenceRelativePath = "motion-studio/out/qa/japanese-friends-opening-start-sync-listening-review.json";
const evidencePath = path.join(repoRoot, evidenceRelativePath);
const manifestRelativePath = "movie-dashboard/public/demo-renders/japanese-friends-opening-start-sync-v1.manifest.json";
const manifestPath = path.join(repoRoot, manifestRelativePath);
const outputPath = path.join(dashboardRoot, "src/data/startSyncListeningReviewGate.generated.ts");
const sha256 = (value) => createHash("sha256").update(value).digest("hex");

const status = JSON.parse(execFileSync(process.execPath, ["--no-warnings", reviewScript, "--json"], {
  cwd: studioRoot,
  encoding: "utf8",
}));
if (status.schemaVersion !== "japanese-friends-opening-start-sync-listening-review-status/v1") {
  throw new Error(`Unexpected StaRt listening status schema: ${status.schemaVersion}`);
}
if (status.authority !== "DERIVED_START_SYNC_LISTENING_REVIEW_STATUS") {
  throw new Error(`Unexpected StaRt listening status authority: ${status.authority}`);
}
if (status.rightsCleared !== false || status.publicationApproved !== false || status.macDaVinciActual !== "NOT_RUN" || status.productionReady !== false) {
  throw new Error("StaRt listening review status attempted to promote rights, GUI Actual, or production readiness");
}

const manifestRaw = fs.readFileSync(manifestPath);
const manifest = JSON.parse(manifestRaw.toString("utf8"));
if (manifest.schemaVersion !== "japanese-friends-opening-start-sync-manifest/v1") throw new Error("Unexpected StaRt manifest schema");

function emptyAudit(parseState = "MISSING", evidenceSha256 = null) {
  return {
    evidencePath: evidenceRelativePath,
    evidenceExists: parseState !== "MISSING",
    evidenceSha256,
    parseState,
    boundAt: null,
    manifestSha256: null,
    artifactSha256: null,
    sourceAudioSha256: null,
    lyricTimingFingerprintSha256: null,
    phraseCount: 30,
    measuredThreeHitPhraseCount: 4,
    phrases: [],
    checks: {
      fullPlayback: "NOT_RUN",
      lyricTimingOverall: "NOT_RUN",
      measuredThreeHitTiming: "NOT_RUN",
      transitionRhythm: "NOT_RUN",
      endingLockupTiming: "NOT_RUN",
      audioVisualSync: "NOT_RUN"
    },
    review: {overall: "NOT_RUN", reviewer: null, reviewedAt: null, notes: ""},
  };
}

function buildAudit() {
  if (!fs.existsSync(evidencePath)) return emptyAudit();
  const raw = fs.readFileSync(evidencePath);
  const evidenceSha256 = sha256(raw);
  let evidence;
  try {
    evidence = JSON.parse(raw.toString("utf8"));
  } catch {
    return emptyAudit("INVALID_JSON", evidenceSha256);
  }
  return {
    evidencePath: evidenceRelativePath,
    evidenceExists: true,
    evidenceSha256,
    parseState: "PARSED",
    boundAt: typeof evidence?.boundAt === "string" ? evidence.boundAt : null,
    manifestSha256: typeof evidence?.manifestSha256 === "string" ? evidence.manifestSha256 : null,
    artifactSha256: typeof evidence?.artifactSha256 === "string" ? evidence.artifactSha256 : null,
    sourceAudioSha256: typeof evidence?.sourceAudioSha256 === "string" ? evidence.sourceAudioSha256 : null,
    lyricTimingFingerprintSha256: typeof evidence?.lyricTimingFingerprintSha256 === "string" ? evidence.lyricTimingFingerprintSha256 : null,
    phraseCount: evidence?.phraseCount ?? 30,
    measuredThreeHitPhraseCount: evidence?.measuredThreeHitPhraseCount ?? 4,
    phrases: Array.isArray(evidence?.phrases) ? evidence.phrases.map((phrase) => ({
      phraseId: typeof phrase?.phraseId === "string" ? phrase.phraseId : null,
      lineNumber: Number(phrase?.lineNumber),
      sectionId: typeof phrase?.sectionId === "string" ? phrase.sectionId : null,
      startSec: Number(phrase?.startSec),
      endSec: Number(phrase?.endSec),
      threeHitFrameSecs: Array.isArray(phrase?.threeHitFrameSecs) ? phrase.threeHitFrameSecs.map(Number) : null,
      rhythmType: typeof phrase?.rhythmType === "string" ? phrase.rhythmType : null,
      confidence: typeof phrase?.confidence === "string" ? phrase.confidence : null,
      review: phrase?.review ?? "NOT_RUN",
      notes: typeof phrase?.notes === "string" ? phrase.notes : "",
    })) : [],
    checks: {
      fullPlayback: evidence?.checks?.fullPlayback ?? "NOT_RUN",
      lyricTimingOverall: evidence?.checks?.lyricTimingOverall ?? "NOT_RUN",
      measuredThreeHitTiming: evidence?.checks?.measuredThreeHitTiming ?? "NOT_RUN",
      transitionRhythm: evidence?.checks?.transitionRhythm ?? "NOT_RUN",
      endingLockupTiming: evidence?.checks?.endingLockupTiming ?? "NOT_RUN",
      audioVisualSync: evidence?.checks?.audioVisualSync ?? "NOT_RUN",
    },
    review: {
      overall: evidence?.review?.overall ?? "NOT_RUN",
      reviewer: typeof evidence?.review?.reviewer === "string" ? evidence.review.reviewer : null,
      reviewedAt: typeof evidence?.review?.reviewedAt === "string" ? evidence.review.reviewedAt : null,
      notes: typeof evidence?.review?.notes === "string" ? evidence.review.notes : "",
    },
  };
}

const snapshot = {
  source: "motion-studio/scripts/japanese-friends-opening-start-sync-listening-review.mts",
  state: status.state,
  humanReviewComplete: status.humanReviewComplete,
  blockers: status.blockers,
  phrasesReviewed: status.phrasesReviewed,
  phrasesExpected: status.phrasesExpected,
  rightsCleared: false,
  publicationApproved: false,
  macDaVinciActual: "NOT_RUN",
  productionReady: false,
  manifest: {
    path: manifestRelativePath,
    sha256: sha256(manifestRaw),
    generatedAt: manifest.generatedAt,
    artifact: manifest.artifact,
    source: {title: manifest.source?.title, editEndSeconds: manifest.source?.editEndSeconds, bpm: manifest.source?.bpm},
    timing: manifest.timing,
    qa: manifest.qa,
  },
  mediaPath: "/demo-renders/japanese-friends-opening-start-sync-v1.mp4",
  audit: buildAudit(),
};

const output = `// AUTO-GENERATED by scripts/sync-start-sync-listening-review-gate.mjs\n// Human listening evidence remains local/ignored; lyrics and audio are never copied into this snapshot.\n\nexport const startSyncListeningReviewGate = ${JSON.stringify(snapshot, null, 2)} as const;\n`;

if (process.argv.includes("--write")) {
  fs.writeFileSync(outputPath, output, "utf8");
  console.log(`StaRt listening review gate synced: ${snapshot.state} ${snapshot.phrasesReviewed}/${snapshot.phrasesExpected}`);
  process.exit(0);
}
if (!fs.existsSync(outputPath)) {
  console.error("StaRt listening review generated gate missing. Run: node scripts/sync-start-sync-listening-review-gate.mjs --write");
  process.exit(1);
}
if (fs.readFileSync(outputPath, "utf8") !== output) {
  console.error("StaRt listening review generated gate stale. Run: node scripts/sync-start-sync-listening-review-gate.mjs --write");
  process.exit(1);
}
console.log(`StaRt listening review gate current: ${snapshot.state} ${snapshot.phrasesReviewed}/${snapshot.phrasesExpected}`);
