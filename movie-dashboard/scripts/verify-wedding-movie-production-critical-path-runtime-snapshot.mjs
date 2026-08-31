import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const runtime = read("src/data/weddingMovieProductionCriticalPathRuntimeSnapshot.ts");
const card = read("src/components/WeddingMovieProductionCriticalPathCard.tsx");
const liveAuthority = read("src/data/weddingDavinciGuiActualStartGateLiveAuthority.ts");
const generatedStage = read("src/generated/weddingProjectRemotionStageStatus.ts");
const errors = [];
const need = (source, token, message) => { if (!source.includes(token)) errors.push(message); };

for (const token of [
  'wedding-movie-production-critical-path-runtime-snapshot/v3',
  'DASHBOARD_RUNTIME_CRITICAL_PATH_WITH_CANONICAL_REMOTION_STAGE_PALMIER_TIMELINE_AND_LIVE_DAVINCI_START_GATE_AUDIT',
  'stableCriticalPath: buildWeddingMovieProductionCriticalPath()',
  'canonicalProjectRemotionStage',
  'palmierTimelineExport',
  'receiptSha256: status.palmierTimelineExport.receiptSha256',
  'source: {...status.palmierTimelineExport.source}',
  'liveDavinciStartGate',
  'projectRemotionIdentity: projectRemotionIdentityRuntimeSnapshot(audit)',
  'palmierTimeline: palmierTimelineRuntimeSnapshot(audit)',
  'liveMatch: audit.livePalmierTimelineMatch',
  'receiptSha256',
  'assemblyPlanSha256',
  'palmierFcpxmlSha256',
  'palmierGuiActual: "NOT_PROMOTED_BY_RUNTIME_SNAPSHOT"',
  'productionReady: false as const',
  'PALMIER_TIMELINE_RECEIPT_CURRENT != PALMIER_GUI_ACTUAL_EXECUTED',
  'PALMIER_TIMELINE_RECEIPT_CURRENT != MAC_DAVINCI_GUI_ACTUAL_EXECUTED',
  'PALMIER_TIMELINE_LIVE_MATCH != PALMIER_GUI_ACTUAL_EXECUTED',
  'PALMIER_TIMELINE_LIVE_MATCH != MAC_DAVINCI_GUI_ACTUAL_EXECUTED',
  'GUI_ACTUAL_ALLOWED != GUI_ACTUAL_EXECUTED',
  'PROJECT_MOTION_LIVE_MATCH != HUMAN_GUI_REVIEW_PASSED',
]) need(runtime, token, `runtime snapshot missing ${token}`);

for (const token of [
  'wedding-project-remotion-stage-status-dashboard/v2',
  'GENERATED_FROM_READ_ONLY_CANONICAL_STAGE_AND_PALMIER_TIMELINE_RECEIPT_CHECKERS',
  'palmierTimelineExport',
  'PALMIER_TIMELINE_EXPORT_RECEIPT_MISSING',
  'receiptSha256',
  'assemblyPlanSha256',
  'palmierFcpxmlSha256',
  'VERIFY_REAL_PALMIER_FCPXML',
  'palmierGuiActual',
  'productionReadyPromotedBySnapshot',
]) need(generatedStage, token, `generated Remotion/Palmier snapshot missing ${token}`);

for (const token of [
  'buildWeddingMovieProductionCriticalPathJson',
  'const stableJson = useMemo(() => buildWeddingMovieProductionCriticalPathJson(), [])',
  'downloadText(stableJson, "wedding-movie-production-critical-path.json")',
  'Stable pathを書き出す',
  'buildWeddingMovieProductionCriticalPathRuntimeSnapshotJson',
  'buildWeddingMovieProductionCriticalPathRuntimeSnapshotJson(startGateAudits)',
  'downloadText(runtimeJson, "wedding-movie-production-critical-path-runtime.json")',
  'Runtime snapshotを書き出す',
  'LIVE DAVINCI START GATE AUTHORITY',
  'live Project Motion match=',
]) need(card, token, `critical-path runtime export UI missing ${token}`);

for (const token of [
  'let currentAudits',
  'publishWeddingDavinciGuiActualStartGateAudit',
  'currentAudits = {...currentAudits, [movieId]: audit}',
  'resetWeddingDavinciGuiActualStartGateAuditAuthority',
]) need(liveAuthority, token, `live Start Gate authority missing ${token}`);

if (runtime.includes('productionReady: true') || runtime.includes('macDavinciResolveGuiActual: "PASS"') || runtime.includes('palmierGuiActual: "PASS"')) errors.push('Runtime snapshot must never promote production readiness or Palmier/Mac DaVinci GUI Actual');
if (runtime.includes('localStorage') || runtime.includes('sessionStorage')) errors.push('Runtime snapshot must remain session-live and must not persist browser audit authority');

if (errors.length) {
  console.error(`Wedding Movie production critical-path runtime snapshot FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log('Wedding Movie production critical-path runtime snapshot OK: runtime export binds canonical Project Remotion stage status, Palmier real-FCPXML receipt SHA currentness, and the session-live DaVinci Start Gate Palmier audit without promoting Palmier/Mac/Studio GUI Actual or production readiness.');
