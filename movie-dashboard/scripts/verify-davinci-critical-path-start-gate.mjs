import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");

const model = read("src/data/weddingMovieProductionCriticalPath.ts");
const audit = read("src/data/weddingDavinciGuiActualStartGateAudit.ts");
const liveAuthority = read("src/data/weddingDavinciGuiActualStartGateLiveAuthority.ts");
const criticalPathCard = read("src/components/WeddingMovieProductionCriticalPathCard.tsx");
const startGateCard = read("src/components/WeddingDavinciGuiActualStartGateCard.tsx");
const errors = [];
const need = (source, token, message) => {
  if (!source.includes(token)) errors.push(message);
};

need(model, 'WEDDING_DAVINCI_GUI_ACTUAL_START_GATE_ROUTE = "/movie-coach/motion-library#davinci-gui-actual-start-gate"', "critical path must route DaVinci finishing to canonical Motion Zukan Start Gate");
need(model, 'canonicalWeddingDavinciGuiActualStartGateArtifactPath', "critical path must import canonical Start Gate artifact authority");
need(model, 'defaultWeddingDavinciGuiActualStartGateAudits', "critical path must consume Start Gate Audit command authority");
need(model, 'stageName === "davinciFinishing"', "critical path missing davinciFinishing action target");
need(model, 'DAVINCI_START_GATE_LINK_VISIBLE != GUI_ACTUAL_STARTED', "critical path must preserve GUI Actual evidence boundary");

need(audit, 'PROJECT_REMOTION_IDENTITY_BLOCKED', "Start Gate Audit must model Project Remotion identity blocking");
need(audit, 'liveProjectRemotionIdentityMatch', "Start Gate Audit must expose live Remotion identity match");
need(audit, 'GUI_START_GATE_PROJECT_REMOTION_IDENTITY_RECEIPT_SHA_STALE', "Start Gate Audit must fail-close receipt SHA drift");
need(audit, 'GUI_START_GATE_PROJECT_REMOTION_IDENTITY_RESOLVE_SIDECAR_SHA_STALE', "Start Gate Audit must fail-close Resolve sidecar SHA drift");
need(audit, 'GUI_START_GATE_PROJECT_REMOTION_IDENTITY_SOURCE_BATCH_SHA_STALE', "Start Gate Audit must fail-close source Batch SHA drift");

need(liveAuthority, 'WeddingDavinciGuiActualStartGateAuditMap', "shared Start Gate authority must keep Opening/Profile audits in one typed map");
need(liveAuthority, 'subscribeWeddingDavinciGuiActualStartGateAudit', "shared Start Gate authority must expose subscription");
need(liveAuthority, 'publishWeddingDavinciGuiActualStartGateAudit', "shared Start Gate authority must expose publication");
if (liveAuthority.includes("localStorage") || liveAuthority.includes("sessionStorage")) errors.push("shared Start Gate state must not persist across Dashboard sessions");

need(criticalPathCard, 'useSyncExternalStore(', "critical path must subscribe to shared live Start Gate authority");
need(criticalPathCard, 'LIVE DAVINCI START GATE AUTHORITY', "critical path must visibly surface Start Gate audit state");
need(criticalPathCard, 'startGateAudit.liveProjectRemotionIdentityMatch', "critical path must show live Remotion identity match");
need(criticalPathCard, 'startGateAudit.project.projectRemotionIdentityPreflight', "critical path must consume audited Remotion identity preflight");
need(criticalPathCard, 'projectRemotionIdentity.receiptSha256', "critical path must show receipt SHA");
need(criticalPathCard, 'projectRemotionIdentity.resolveSidecarSha256', "critical path must show Resolve identity SHA");
need(criticalPathCard, 'projectRemotionIdentity.sourceBatchSha256', "critical path must show source Batch SHA");
need(criticalPathCard, 'Remotion verifier:', "critical path must show exact Remotion identity verifier");
need(criticalPathCard, 'startGateAudit.state === "STALE" || startGateAudit.state === "INVALID"', "STALE/INVALID must prioritize regeneration");
need(criticalPathCard, 'これは実行済み/PASSではありません', "critical path must preserve Human Mac GUI evidence boundary");

need(startGateCard, 'Project Remotion identity canonical verifier', "Start Gate must surface canonical Remotion identity verifier");
need(startGateCard, 'Identity receipt', "Start Gate must surface identity receipt SHA");
need(startGateCard, 'Resolve identity', "Start Gate must surface Resolve identity SHA");
need(startGateCard, 'Source Batch', "Start Gate must surface source Batch SHA");
need(startGateCard, 'publishWeddingDavinciGuiActualStartGateAudit(movieId, audit);', "Start Gate card must publish post-audit state only");
need(startGateCard, 'Actual evidenceはNOT_RUNのまま', "Start Gate must preserve NOT_RUN semantics when GUI was not performed");

if (errors.length) {
  console.error(`DaVinci critical-path Start Gate contract FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("DaVinci critical-path Start Gate contract OK: Critical Path consumes the shared audited Project Motion + Project Remotion identity state, displays the exact Remotion receipt/Resolve/source Batch SHA chain and verifier, prioritizes stale/invalid regeneration, and preserves NOT_RUN GUI Actual boundaries.");
