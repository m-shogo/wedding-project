import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");

const runtime = read("src/data/weddingMovieProductionCriticalPathRuntimeSnapshot.ts");
const card = read("src/components/WeddingMovieProductionCriticalPathCard.tsx");
const liveAuthority = read("src/data/weddingDavinciGuiActualStartGateLiveAuthority.ts");
const errors = [];
const need = (source, token, message) => { if (!source.includes(token)) errors.push(message); };

for (const token of [
  'wedding-movie-production-critical-path-runtime-snapshot/v1',
  'DASHBOARD_RUNTIME_CRITICAL_PATH_WITH_LIVE_DAVINCI_START_GATE_AUDIT',
  'stableCriticalPath: buildWeddingMovieProductionCriticalPath()',
  'liveDavinciStartGate',
  'opening: startGateRuntimeSnapshot(audits.opening)',
  'profile: startGateRuntimeSnapshot(audits.profile)',
  'state: audit.state',
  'canonicalArtifactPath: audit.canonicalArtifactPath',
  'inspectCommand: audit.inspectCommand',
  'strictGuiStartCommand: audit.strictGuiStartCommand',
  'liveMatch: audit.liveProjectMotionMatch',
  'state: audit.project.projectMotionPreflight.state',
  'current: audit.project.projectMotionPreflight.current',
  'transportedIdentitySha256',
  'liveIdentitySha256',
  'NOT_PROMOTED_BY_RUNTIME_SNAPSHOT',
  'productionReady: false as const',
  'GUI_ACTUAL_ALLOWED != GUI_ACTUAL_EXECUTED',
  'PROJECT_MOTION_LIVE_MATCH != HUMAN_GUI_REVIEW_PASSED',
  'STRICT_COMMAND_EXPORTED != STRICT_COMMAND_EXECUTED',
]) need(runtime, token, `runtime snapshot missing ${token}`);

for (const token of [
  'buildWeddingMovieProductionCriticalPathJson',
  'const stableJson = useMemo(() => buildWeddingMovieProductionCriticalPathJson(), [])',
  'downloadText(stableJson, "wedding-movie-production-critical-path.json")',
  'Stable pathを書き出す',
  'buildWeddingMovieProductionCriticalPathRuntimeSnapshotJson',
  'const runtimeJson = useMemo(',
  'buildWeddingMovieProductionCriticalPathRuntimeSnapshotJson(startGateAudits)',
  '[startGateAudits]',
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

if (runtime.includes('productionReady: true') || runtime.includes('macDavinciResolveGuiActual: "PASS"')) {
  errors.push('Runtime snapshot must never promote production readiness or Mac DaVinci GUI Actual');
}
if (runtime.includes('localStorage') || runtime.includes('sessionStorage')) {
  errors.push('Runtime snapshot must remain session-live and must not persist browser audit authority');
}

if (errors.length) {
  console.error(`Wedding Movie production critical-path runtime snapshot FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Wedding Movie production critical-path runtime snapshot OK: stable export remains available while runtime JSON binds the current session live DaVinci Start Gate audit without promoting Mac/Studio GUI Actual or production readiness.');
