import {createHash} from 'node:crypto';
import {existsSync, readFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const finalPath = join(root, 'out/profile/profile_v1.mp4');
const reviewPath = join(root, 'out/qa/profile-v1-final-render-review.json');
const bundlePath = join(root, 'out/handoff/profile-v1/profile-v1-production-bundle.json');
const jsonMode = process.argv.includes('--json');
const strict = process.argv.includes('--strict');
type StageState = 'PASS' | 'BLOCKED' | 'NOT_RUN' | 'MISSING' | 'STALE';
type Stage = {state: StageState; detail: string; path?: string; blockers?: string[]};
const rel = (path: string) => relative(root, path).replaceAll('\\', '/');
const sha = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
const run = (script: string, args: string[] = []) => spawnSync(process.execPath, ['--no-warnings', script, ...args], {cwd: root, encoding: 'utf8'});
const lines = (value: string | null | undefined) => (value ?? '').split(/\r?\n/).map((v) => v.trim()).filter(Boolean);

const assemblyRun = run('scripts/profile-v1-assembly-preflight.mts', ['--json']);
let assemblyReport: any = null;
let assembly: Stage;
if (assemblyRun.status !== 0) assembly = {state: 'BLOCKED', detail: 'Assembly preflight failed.', blockers: [...lines(assemblyRun.stdout), ...lines(assemblyRun.stderr)]};
else {
  try { assemblyReport = JSON.parse(assemblyRun.stdout); } catch { assemblyReport = null; }
  const ready = assemblyReport?.readiness?.assemblyReady === true;
  assembly = {state: ready ? 'PASS' : 'BLOCKED', detail: ready ? '17 media + BGM rights + structure + real-media Human QA are ready.' : 'Assembly inputs/Human QA are not all ready.', blockers: ready ? [] : (assemblyReport?.readiness?.blockers ?? [])};
}

const finalRender: Stage = assembly.state !== 'PASS'
  ? {state: 'NOT_RUN', detail: 'Blocked by assembly readiness.', path: rel(finalPath)}
  : !existsSync(finalPath)
    ? {state: 'MISSING', detail: 'Render the current ProfileV1 production candidate.', path: rel(finalPath)}
    : (() => { const r = run('scripts/check-profile-render.mts', ['out/profile/profile_v1.mp4']); return r.status === 0 ? {state: 'PASS', detail: 'Final render passes technical media QA.', path: rel(finalPath)} : {state: 'BLOCKED', detail: 'Final render technical QA failed.', path: rel(finalPath), blockers: [...lines(r.stdout), ...lines(r.stderr)]}; })();

const finalReview: Stage = finalRender.state !== 'PASS'
  ? {state: 'NOT_RUN', detail: 'Blocked until final render QA passes.', path: rel(reviewPath)}
  : !existsSync(reviewPath)
    ? {state: 'MISSING', detail: 'Initialize Human final-render review.', path: rel(reviewPath)}
    : (() => { const r = run('scripts/profile-v1-final-render-review.mts', ['--strict']); return r.status === 0 ? {state: 'PASS', detail: 'Human final-render review is current and PASS.', path: rel(reviewPath)} : {state: 'BLOCKED', detail: 'Human final-render review is incomplete/failed/stale.', path: rel(reviewPath), blockers: [...lines(r.stdout), ...lines(r.stderr)]}; })();

let bundle: Stage;
if (finalReview.state !== 'PASS') bundle = {state: 'NOT_RUN', detail: 'Blocked until current Human final-render review passes.', path: rel(bundlePath)};
else if (!existsSync(bundlePath)) bundle = {state: 'MISSING', detail: 'Export SHA-bound Profile production bundle.', path: rel(bundlePath)};
else {
  const blockers: string[] = [];
  try {
    const b = JSON.parse(readFileSync(bundlePath, 'utf8')) as any;
    if (b.schemaVersion !== 'profile-v1-production-bundle/v1') blockers.push('BUNDLE_SCHEMA_MISMATCH');
    if (b.authority !== 'FINAL_RENDER_BOUND_HANDOFF') blockers.push('BUNDLE_AUTHORITY_MISMATCH');
    if (b.finalRender?.sha256 !== sha(finalPath)) blockers.push('BUNDLE_FINAL_RENDER_SHA_STALE');
    if (b.humanFinalRenderReview?.evidenceSha256 !== sha(reviewPath)) blockers.push('BUNDLE_FINAL_REVIEW_SHA_STALE');
    if (b.davinci?.expectedSha256 !== sha(finalPath)) blockers.push('BUNDLE_DAVINCI_SHA_STALE');
    if (b.davinci?.productionReady !== false) blockers.push('BUNDLE_MUST_FAIL_CLOSED');
  } catch { blockers.push('BUNDLE_INVALID_JSON'); }
  bundle = blockers.length ? {state: 'STALE', detail: 'Bundle must be regenerated from current approved artifacts.', path: rel(bundlePath), blockers} : {state: 'PASS', detail: 'Bundle is current and ready for Mac DaVinci finishing.', path: rel(bundlePath)};
}

let overallState: string;
let nextActions: string[];
if (assembly.state !== 'PASS') { overallState = 'ASSEMBLY_REQUIRED'; nextActions = assemblyReport?.nextActions ?? ['Profile assembly blockersを解消']; }
else if (finalRender.state === 'MISSING') { overallState = 'FINAL_RENDER_REQUIRED'; nextActions = ['node --no-warnings scripts/render-profile-v1-production.mts']; }
else if (finalRender.state !== 'PASS') { overallState = 'FINAL_RENDER_QA_FAILED'; nextActions = ['final render QA failureを修正']; }
else if (finalReview.state === 'MISSING') { overallState = 'FINAL_RENDER_REVIEW_INIT_REQUIRED'; nextActions = ['node --no-warnings scripts/profile-v1-final-render-review.mts --init', '最終MP4を音声付きで人間確認']; }
else if (finalReview.state !== 'PASS') { overallState = 'HUMAN_FINAL_RENDER_REVIEW_REQUIRED_OR_STALE'; nextActions = ['current final renderに対するHuman reviewを完了']; }
else if (bundle.state === 'MISSING') { overallState = 'PRODUCTION_BUNDLE_REQUIRED'; nextActions = ['node --no-warnings scripts/export-profile-v1-production-bundle.mts']; }
else if (bundle.state !== 'PASS') { overallState = 'PRODUCTION_BUNDLE_STALE'; nextActions = ['current artifactsからproduction bundleを再生成']; }
else { overallState = 'AWAITING_DAVINCI_ACTUAL'; nextActions = ['Mac DaVinci finishing evidence layerを初期化・実行', 'Actual未実施のままproductionReadyへ昇格しない']; }

const report = {schemaVersion: 'profile-v1-production-status/v1', authority: 'DERIVED_PRODUCTION_STATUS', overallState, stages: {assembly, finalRender, finalRenderReview: finalReview, productionBundle: bundle}, readiness: {assemblyReady: assembly.state === 'PASS', finalRenderQaPass: finalRender.state === 'PASS', humanFinalRenderReviewPass: finalReview.state === 'PASS', bundleCurrent: bundle.state === 'PASS', macDaVinciActual: 'NOT_RUN', productionReady: false}, nextActions};
if (jsonMode) console.log(JSON.stringify(report, null, 2)); else { console.log(`Profile V1 production status: ${overallState}`); for (const [name, stage] of Object.entries(report.stages)) console.log(`${name}=${stage.state} / ${stage.detail}`); console.log(`NEXT / ${nextActions.join(' → ')}`); }
if (strict && overallState !== 'AWAITING_DAVINCI_ACTUAL') process.exit(1);
