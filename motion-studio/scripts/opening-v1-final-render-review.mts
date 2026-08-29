import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const finalPath = join(root, 'out/opening/opening_v1.mp4');
const evidencePath = join(root, 'out/qa/opening-v1-final-render-review.json');
const previewReviewPath = join(root, 'out/qa/opening-v1-preview-review.json');
const previewSourcePath = join(root, 'out/qa/opening-v1-preview-source-fingerprint.json');
const presentationPath = join(root, 'src/data/openingV1Presentation.ts');
const soundPath = join(root, 'src/data/openingV1Sound.ts');
const mode = process.argv.includes('--init') ? 'init' : process.argv.includes('--strict') ? 'strict' : process.argv.includes('--json') ? 'json' : 'status';

const renderSourcePaths = [
  'src/index-opening-v1.ts',
  'src/OpeningV1Root.tsx',
  'src/compositions/opening/OpeningV1.tsx',
  'src/compositions/opening/OpeningV1PhotoScenes.tsx',
  'src/compositions/opening/OpeningV1UtilityScenes.tsx',
  'src/compositions/opening/OpeningV1AudioLayer.tsx',
  'src/data/openingV1.ts',
  'src/data/openingV1Media.ts',
  'src/data/openingV1Presentation.ts',
  'src/data/openingV1Sound.ts',
  'src/data/theme.ts',
] as const;

type Qa = 'NOT_RUN' | 'PASS' | 'FAIL';
type RenderSource = {path: string; sha256: string};
type Evidence = {
  schemaVersion: 'opening-v1-final-render-review/v1';
  authority: 'HUMAN_FINAL_RENDER_REVIEW';
  boundAt: string;
  finalRender: {path: string; sha256: string};
  renderSourceFingerprintSha256: string;
  renderSources: RenderSource[];
  upstream: {
    previewReviewSha256: string;
    previewSourceBindingSha256: string;
    presentationSha256: string;
    soundSha256: string;
  };
  review: {
    visual: Qa;
    timing: Qa;
    textReadability: Qa;
    bgmTiming: Qa;
    bgmLevel: Qa;
    finalEncodingPlayback: Qa;
    overall: Qa;
    reviewer: string | null;
    reviewedAt: string | null;
    notes: string;
  };
  macDaVinciActual: 'NOT_RUN';
  productionReady: false;
};

const shaBuffer = (value: Buffer | string) => createHash('sha256').update(value).digest('hex');
const sha = (path: string) => shaBuffer(readFileSync(path));
const rel = (path: string) => relative(root, path).replaceAll('\\', '/');
const run = (script: string, args: string[] = []) => spawnSync(process.execPath, ['--no-warnings', script, ...args], {cwd: root, encoding: 'utf8'});

function renderSourceBinding() {
  const renderSources = renderSourcePaths.map((path) => {
    const absolute = join(root, path);
    if (!existsSync(absolute)) throw new Error(`OPENING_FINAL_REVIEW_RENDER_SOURCE_MISSING:${path}`);
    return {path, sha256: sha(absolute)};
  });
  return {
    renderSources,
    renderSourceFingerprintSha256: shaBuffer(renderSources.map((source) => `${source.path}\0${source.sha256}`).join('\n')),
  };
}

function current() {
  for (const [label, path] of [
    ['FINAL_RENDER', finalPath],
    ['PREVIEW_REVIEW', previewReviewPath],
    ['PREVIEW_SOURCE', previewSourcePath],
    ['PRESENTATION', presentationPath],
    ['SOUND', soundPath],
  ] as const) if (!existsSync(path)) throw new Error(`OPENING_FINAL_REVIEW_${label}_MISSING`);

  if (run('scripts/check-opening-render.mts', ['out/opening/opening_v1.mp4']).status !== 0) throw new Error('OPENING_FINAL_RENDER_TECHNICAL_QA_NOT_PASS');
  if (run('scripts/opening-v1-preview-source-fingerprint.mts', ['--strict']).status !== 0) throw new Error('OPENING_PREVIEW_SOURCE_BINDING_NOT_PASS');
  if (run('scripts/opening-v1-preview-review.mts', ['--strict']).status !== 0) throw new Error('OPENING_PREVIEW_REVIEW_NOT_PASS');

  return {
    finalRender: {path: rel(finalPath), sha256: sha(finalPath)},
    ...renderSourceBinding(),
    upstream: {
      previewReviewSha256: sha(previewReviewPath),
      previewSourceBindingSha256: sha(previewSourcePath),
      presentationSha256: sha(presentationPath),
      soundSha256: sha(soundPath),
    },
  };
}

function init() {
  const evidence: Evidence = {
    schemaVersion: 'opening-v1-final-render-review/v1',
    authority: 'HUMAN_FINAL_RENDER_REVIEW',
    boundAt: new Date().toISOString(),
    ...current(),
    review: {
      visual: 'NOT_RUN', timing: 'NOT_RUN', textReadability: 'NOT_RUN', bgmTiming: 'NOT_RUN', bgmLevel: 'NOT_RUN', finalEncodingPlayback: 'NOT_RUN', overall: 'NOT_RUN',
      reviewer: null, reviewedAt: null, notes: '',
    },
    macDaVinciActual: 'NOT_RUN',
    productionReady: false,
  };
  mkdirSync(dirname(evidencePath), {recursive: true});
  writeFileSync(evidencePath, `${JSON.stringify(evidence, null, 2)}\n`);
  console.log(`Opening final render Human review initialized: ${rel(evidencePath)}`);
  console.log(`renderSourceFingerprintSha256=${evidence.renderSourceFingerprintSha256}`);
}

function evaluate() {
  const blockers: string[] = [];
  if (!existsSync(evidencePath)) return {schemaVersion: 'opening-v1-final-render-review-status/v1', authority: 'DERIVED_FINAL_RENDER_REVIEW_STATUS', state: 'NOT_RUN' as const, blockers: ['FINAL_RENDER_REVIEW_EVIDENCE_MISSING'], humanReviewComplete: false, productionReady: false};
  let e: Evidence;
  try { e = JSON.parse(readFileSync(evidencePath, 'utf8')) as Evidence; }
  catch { return {schemaVersion: 'opening-v1-final-render-review-status/v1', authority: 'DERIVED_FINAL_RENDER_REVIEW_STATUS', state: 'BLOCKED' as const, blockers: ['FINAL_RENDER_REVIEW_INVALID_JSON'], humanReviewComplete: false, productionReady: false}; }

  if (e.schemaVersion !== 'opening-v1-final-render-review/v1') blockers.push('SCHEMA_VERSION');
  if (e.authority !== 'HUMAN_FINAL_RENDER_REVIEW') blockers.push('AUTHORITY');
  if (e.macDaVinciActual !== 'NOT_RUN') blockers.push('MAC_DAVINCI_ACTUAL_MUST_REMAIN_SEPARATE');
  if (e.productionReady !== false) blockers.push('FINAL_RENDER_REVIEW_CANNOT_PROMOTE_PRODUCTION');
  const boundAtMs = Date.parse(e.boundAt);
  if (!e.boundAt || Number.isNaN(boundAtMs)) blockers.push('BOUND_AT_INVALID');

  try {
    const c = current();
    if (e.finalRender.path !== c.finalRender.path || e.finalRender.sha256 !== c.finalRender.sha256) blockers.push('STALE_FINAL_RENDER');
    if (e.renderSourceFingerprintSha256 !== c.renderSourceFingerprintSha256) blockers.push('STALE_RENDER_SOURCE_FINGERPRINT');
    const saved = new Map(Array.isArray(e.renderSources) ? e.renderSources.map((source) => [source.path, source.sha256]) : []);
    for (const source of c.renderSources) if (saved.get(source.path) !== source.sha256) blockers.push(`STALE_RENDER_SOURCE:${source.path}`);
    if (!Array.isArray(e.renderSources) || e.renderSources.length !== c.renderSources.length) blockers.push(`RENDER_SOURCE_COUNT:${Array.isArray(e.renderSources) ? e.renderSources.length : 0}/${c.renderSources.length}`);
    for (const key of Object.keys(c.upstream) as Array<keyof typeof c.upstream>) if (e.upstream[key] !== c.upstream[key]) blockers.push(`STALE_${key.toUpperCase()}`);
  } catch (error) { blockers.push(error instanceof Error ? error.message : String(error)); }

  for (const axis of ['visual','timing','textReadability','bgmTiming','bgmLevel','finalEncodingPlayback','overall'] as const) if (e.review?.[axis] !== 'PASS') blockers.push(`${axis.toUpperCase()}_${e.review?.[axis] ?? 'INVALID'}`);
  if (!e.review?.reviewer?.trim()) blockers.push('REVIEWER_MISSING');
  const reviewedAtMs = e.review?.reviewedAt ? Date.parse(e.review.reviewedAt) : Number.NaN;
  if (!e.review?.reviewedAt || Number.isNaN(reviewedAtMs)) blockers.push('REVIEWED_AT_INVALID');
  else if (!Number.isNaN(boundAtMs) && reviewedAtMs < boundAtMs) blockers.push('REVIEWED_BEFORE_BINDING');

  return {schemaVersion: 'opening-v1-final-render-review-status/v1', authority: 'DERIVED_FINAL_RENDER_REVIEW_STATUS', state: blockers.length ? ('BLOCKED' as const) : ('PASS' as const), blockers, humanReviewComplete: blockers.length === 0, productionReady: false};
}

if (mode === 'init') init();
else {
  const status = evaluate();
  if (mode === 'json') console.log(JSON.stringify(status, null, 2));
  else { console.log(`Opening final render Human review: ${status.state}`); for (const blocker of status.blockers) console.log(`BLOCK / ${blocker}`); }
  if (mode === 'strict' && !status.humanReviewComplete) process.exit(1);
}
