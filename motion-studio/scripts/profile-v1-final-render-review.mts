import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const finalPath = join(root, 'out/profile/profile_v1.mp4');
const evidencePath = join(root, 'out/qa/profile-v1-final-render-review.json');
const componentPath = join(root, 'src/compositions/profile/ProfileV1.tsx');
const runtimePath = join(root, 'src/data/profileV1RuntimeMedia.generated.ts');
const planPath = join(root, 'src/data/profileV1ProductionPlan.ts');
const realReviewPath = join(root, 'out/qa/profile-v1-real-media-review.json');
const structureReviewPath = join(root, 'out/qa/profile-v1-full-structure-review.json');
const bgmApprovalPath = join(root, 'out/qa/profile-v1-bgm-rights-approval.json');
const bgmPath = join(root, 'public/audio/profile/bgm-main.mp3');
const mode = process.argv.includes('--init') ? 'init' : process.argv.includes('--strict') ? 'strict' : process.argv.includes('--json') ? 'json' : 'status';

type Qa = 'NOT_RUN' | 'PASS' | 'FAIL';
type Evidence = {
  schemaVersion: 'profile-v1-final-render-review/v1'; authority: 'HUMAN_FINAL_RENDER_REVIEW'; boundAt: string;
  finalRender: {path: string; sha256: string}; componentSha256: string; runtimeManifestSha256: string; productionPlanSha256: string;
  upstream: {realMediaReviewSha256: string; structureReviewSha256: string; bgmRightsApprovalSha256: string; bgmSha256: string};
  review: {visual: Qa; timing: Qa; chapterFlow: Qa; textReadability: Qa; bgmTiming: Qa; bgmLevel: Qa; overall: Qa; reviewer: string | null; reviewedAt: string | null; notes: string};
  macDaVinciActual: 'NOT_RUN'; productionReady: false;
};
const sha = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
const rel = (path: string) => relative(root, path).replaceAll('\\', '/');
const run = (script: string, args: string[] = []) => spawnSync(process.execPath, ['--no-warnings', script, ...args], {cwd: root, encoding: 'utf8'});

function current() {
  for (const [label, path] of [['FINAL_RENDER', finalPath], ['COMPONENT', componentPath], ['RUNTIME', runtimePath], ['PLAN', planPath], ['REAL_REVIEW', realReviewPath], ['STRUCTURE_REVIEW', structureReviewPath], ['BGM_APPROVAL', bgmApprovalPath], ['BGM', bgmPath]] as const) {
    if (!existsSync(path)) throw new Error(`PROFILE_FINAL_REVIEW_${label}_MISSING`);
  }
  if (run('scripts/check-profile-render.mts', ['out/profile/profile_v1.mp4']).status !== 0) throw new Error('PROFILE_FINAL_RENDER_TECHNICAL_QA_NOT_PASS');
  if (run('scripts/profile-v1-real-media-review.mts', ['--strict']).status !== 0) throw new Error('PROFILE_REAL_MEDIA_REVIEW_NOT_PASS');
  if (run('scripts/profile-v1-full-structure-review.mts', ['--strict']).status !== 0) throw new Error('PROFILE_STRUCTURE_REVIEW_NOT_PASS');
  if (run('scripts/profile-v1-bgm-rights-approval.mts', ['--strict']).status !== 0) throw new Error('PROFILE_BGM_RIGHTS_NOT_CLEARED');
  return {
    finalRender: {path: rel(finalPath), sha256: sha(finalPath)}, componentSha256: sha(componentPath), runtimeManifestSha256: sha(runtimePath), productionPlanSha256: sha(planPath),
    upstream: {realMediaReviewSha256: sha(realReviewPath), structureReviewSha256: sha(structureReviewPath), bgmRightsApprovalSha256: sha(bgmApprovalPath), bgmSha256: sha(bgmPath)},
  };
}

function init() {
  const c = current();
  const evidence: Evidence = {schemaVersion: 'profile-v1-final-render-review/v1', authority: 'HUMAN_FINAL_RENDER_REVIEW', boundAt: new Date().toISOString(), ...c,
    review: {visual: 'NOT_RUN', timing: 'NOT_RUN', chapterFlow: 'NOT_RUN', textReadability: 'NOT_RUN', bgmTiming: 'NOT_RUN', bgmLevel: 'NOT_RUN', overall: 'NOT_RUN', reviewer: null, reviewedAt: null, notes: ''},
    macDaVinciActual: 'NOT_RUN', productionReady: false};
  mkdirSync(dirname(evidencePath), {recursive: true});
  writeFileSync(evidencePath, `${JSON.stringify(evidence, null, 2)}\n`);
  console.log(`Profile final render Human review initialized: ${rel(evidencePath)}`);
}

function evaluate() {
  const blockers: string[] = [];
  if (!existsSync(evidencePath)) return {schemaVersion: 'profile-v1-final-render-review-status/v1', authority: 'DERIVED_FINAL_RENDER_REVIEW_STATUS', state: 'NOT_RUN' as const, blockers: ['FINAL_RENDER_REVIEW_EVIDENCE_MISSING'], humanReviewComplete: false, productionReady: false};
  let e: Evidence;
  try { e = JSON.parse(readFileSync(evidencePath, 'utf8')) as Evidence; } catch { return {schemaVersion: 'profile-v1-final-render-review-status/v1', authority: 'DERIVED_FINAL_RENDER_REVIEW_STATUS', state: 'BLOCKED' as const, blockers: ['FINAL_RENDER_REVIEW_INVALID_JSON'], humanReviewComplete: false, productionReady: false}; }
  if (e.schemaVersion !== 'profile-v1-final-render-review/v1') blockers.push('SCHEMA_VERSION');
  if (e.authority !== 'HUMAN_FINAL_RENDER_REVIEW') blockers.push('AUTHORITY');
  if (e.macDaVinciActual !== 'NOT_RUN') blockers.push('MAC_DAVINCI_ACTUAL_MUST_REMAIN_SEPARATE');
  if (e.productionReady !== false) blockers.push('FINAL_RENDER_REVIEW_CANNOT_PROMOTE_PRODUCTION');
  const boundAtMs = Date.parse(e.boundAt);
  if (!e.boundAt || Number.isNaN(boundAtMs)) blockers.push('BOUND_AT_INVALID');
  try {
    const c = current();
    if (e.finalRender.path !== c.finalRender.path || e.finalRender.sha256 !== c.finalRender.sha256) blockers.push('STALE_FINAL_RENDER');
    if (e.componentSha256 !== c.componentSha256) blockers.push('STALE_PROFILE_COMPONENT');
    if (e.runtimeManifestSha256 !== c.runtimeManifestSha256) blockers.push('STALE_RUNTIME_MANIFEST');
    if (e.productionPlanSha256 !== c.productionPlanSha256) blockers.push('STALE_PRODUCTION_PLAN');
    for (const key of Object.keys(c.upstream) as Array<keyof typeof c.upstream>) if (e.upstream[key] !== c.upstream[key]) blockers.push(`STALE_${key.toUpperCase()}`);
  } catch (error) { blockers.push(error instanceof Error ? error.message : String(error)); }
  for (const axis of ['visual','timing','chapterFlow','textReadability','bgmTiming','bgmLevel','overall'] as const) if (e.review[axis] !== 'PASS') blockers.push(`${axis.toUpperCase()}_${e.review[axis]}`);
  if (!e.review.reviewer?.trim()) blockers.push('REVIEWER_MISSING');
  const reviewedAtMs = e.review.reviewedAt ? Date.parse(e.review.reviewedAt) : Number.NaN;
  if (!e.review.reviewedAt || Number.isNaN(reviewedAtMs)) blockers.push('REVIEWED_AT_INVALID');
  else if (!Number.isNaN(boundAtMs) && reviewedAtMs < boundAtMs) blockers.push('REVIEWED_BEFORE_BINDING');
  return {schemaVersion: 'profile-v1-final-render-review-status/v1', authority: 'DERIVED_FINAL_RENDER_REVIEW_STATUS', state: blockers.length ? ('BLOCKED' as const) : ('PASS' as const), blockers, humanReviewComplete: blockers.length === 0, productionReady: false};
}

if (mode === 'init') init(); else {
  const status = evaluate();
  if (mode === 'json') console.log(JSON.stringify(status, null, 2)); else { console.log(`Profile final render Human review: ${status.state}`); for (const blocker of status.blockers) console.log(`BLOCK / ${blocker}`); }
  if (mode === 'strict' && !status.humanReviewComplete) process.exit(1);
}
