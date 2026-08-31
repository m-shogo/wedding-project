import {createHash} from "node:crypto";
import {execFileSync} from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const dashboardRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(dashboardRoot, "..");
const reviewScript = path.join(repoRoot, "motion-studio/scripts/profile-v1-real-media-review.mts");
const evidenceRelativePath = "motion-studio/out/qa/profile-v1-real-media-review.json";
const evidencePath = path.join(repoRoot, evidenceRelativePath);
const outputPath = path.join(dashboardRoot, "src/data/profileRealMediaReviewGate.generated.ts");
const sha256 = (value) => createHash("sha256").update(value).digest("hex");

const status = JSON.parse(
  execFileSync(process.execPath, ["--no-warnings", reviewScript, "--json"], {
    cwd: path.join(repoRoot, "motion-studio"),
    encoding: "utf8",
  }),
);

if (
  status.schemaVersion !== "profile-v1-real-media-review-status/v1" ||
  status.authority !== "DERIVED_REAL_MEDIA_REVIEW_STATUS"
) {
  throw new Error(`Unexpected Profile real-media review status: ${status.schemaVersion}/${status.authority}`);
}

function emptyAudit(parseState = "MISSING", evidenceSha256 = null) {
  return {
    evidencePath: evidenceRelativePath,
    evidenceExists: parseState !== "MISSING",
    evidenceSha256,
    parseState,
    boundAt: null,
    preview: null,
    previewSourceFingerprintSha256: null,
    previewSources: [],
    runtimeManifestSha256: null,
    productionPlanSha256: null,
    previewComponentSha256: null,
    canonicalPlanFingerprint: null,
    media: [],
    chapters: [],
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

  const preview = evidence?.preview && typeof evidence.preview === "object"
    ? {
        path: typeof evidence.preview.path === "string" ? evidence.preview.path : null,
        sha256: typeof evidence.preview.sha256 === "string" ? evidence.preview.sha256 : null,
      }
    : null;
  const previewSources = Array.isArray(evidence?.previewSources)
    ? evidence.previewSources.map((source) => ({
        path: typeof source?.path === "string" ? source.path : null,
        sha256: typeof source?.sha256 === "string" ? source.sha256 : null,
      }))
    : [];
  const media = Array.isArray(evidence?.media)
    ? evidence.media.map((item) => ({
        slot: typeof item?.slot === "string" ? item.slot : null,
        chapterId: typeof item?.chapterId === "string" ? item.chapterId : null,
        label: typeof item?.label === "string" ? item.label : null,
        file: typeof item?.file === "string" ? item.file : null,
        extension: typeof item?.extension === "string" ? item.extension : null,
        sha256: typeof item?.sha256 === "string" ? item.sha256 : null,
        qa: {
          crop: item?.qa?.crop ?? "NOT_RUN",
          focus: item?.qa?.focus ?? "NOT_RUN",
          color: item?.qa?.color ?? "NOT_RUN",
          emotionalFit: item?.qa?.emotionalFit ?? "NOT_RUN",
          contentAccuracy: item?.qa?.contentAccuracy ?? "NOT_RUN",
        },
      }))
    : [];
  const chapters = Array.isArray(evidence?.chapters)
    ? evidence.chapters.map((chapter) => ({
        chapterId: typeof chapter?.chapterId === "string" ? chapter.chapterId : null,
        title: typeof chapter?.title === "string" ? chapter.title : null,
        visualFlow: chapter?.visualFlow ?? "NOT_RUN",
        readability: chapter?.readability ?? "NOT_RUN",
        mediaRoleFit: chapter?.mediaRoleFit ?? "NOT_RUN",
      }))
    : [];

  return {
    evidencePath: evidenceRelativePath,
    evidenceExists: true,
    evidenceSha256,
    parseState: "PARSED",
    boundAt: typeof evidence?.boundAt === "string" ? evidence.boundAt : null,
    preview,
    previewSourceFingerprintSha256:
      typeof evidence?.previewSourceFingerprintSha256 === "string" ? evidence.previewSourceFingerprintSha256 : null,
    previewSources,
    runtimeManifestSha256: typeof evidence?.runtimeManifestSha256 === "string" ? evidence.runtimeManifestSha256 : null,
    productionPlanSha256: typeof evidence?.productionPlanSha256 === "string" ? evidence.productionPlanSha256 : null,
    previewComponentSha256: typeof evidence?.previewComponentSha256 === "string" ? evidence.previewComponentSha256 : null,
    canonicalPlanFingerprint: typeof evidence?.canonicalPlanFingerprint === "string" ? evidence.canonicalPlanFingerprint : null,
    media,
    chapters,
    review: {
      overall: evidence?.review?.overall ?? "NOT_RUN",
      reviewer: typeof evidence?.review?.reviewer === "string" ? evidence.review.reviewer : null,
      reviewedAt: typeof evidence?.review?.reviewedAt === "string" ? evidence.review.reviewedAt : null,
      notes: typeof evidence?.review?.notes === "string" ? evidence.review.notes : "",
    },
  };
}

const snapshot = {
  source: "motion-studio/scripts/profile-v1-real-media-review.mts",
  state: status.state,
  humanReviewComplete: status.humanReviewComplete,
  blockers: status.blockers,
  mediaExpected: status.mediaExpected,
  mediaReviewed: status.mediaReviewed,
  bgmReviewed: status.bgmReviewed,
  macDaVinciActual: status.macDaVinciActual,
  productionReady: status.productionReady,
  audit: buildAudit(),
};

const output = `// AUTO-GENERATED by scripts/sync-profile-real-media-review-gate.mjs\n// Human evidence lives under motion-studio/out and is never manufactured by this file.\n\nexport const profileRealMediaReviewGate = ${JSON.stringify(snapshot, null, 2)} as const;\n`;

if (process.argv.includes("--write")) {
  fs.writeFileSync(outputPath, output, "utf8");
  console.log(`Profile real-media review gate synced: ${snapshot.state} ${snapshot.mediaReviewed}/${snapshot.mediaExpected}`);
  process.exit(0);
}

if (!fs.existsSync(outputPath)) {
  console.error("Profile real-media review generated gate is missing. Run: node scripts/sync-profile-real-media-review-gate.mjs --write");
  process.exit(1);
}

const current = fs.readFileSync(outputPath, "utf8");
if (current !== output) {
  console.error("Profile real-media review generated gate is stale. Run: node scripts/sync-profile-real-media-review-gate.mjs --write");
  process.exit(1);
}

console.log(`Profile real-media review gate current: ${snapshot.state} ${snapshot.mediaReviewed}/${snapshot.mediaExpected}`);
