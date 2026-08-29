import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';
import {evaluateProfileV1BgmRights} from './profile-v1-bgm-rights-approval.mts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const previewPath = join(studioRoot, 'out/preview/profile_v1_real_media_preview.mp4');
const evidencePath = join(studioRoot, 'out/qa/profile-v1-audio-listening-review.json');
const mode = process.argv.includes('--init') ? 'init' : process.argv.includes('--strict') ? 'strict' : process.argv.includes('--json') ? 'json' : 'status';

type QaState = 'NOT_RUN' | 'PASS' | 'FAIL';
type Evidence = {
  schemaVersion: 'profile-v1-audio-listening-review/v1';
  authority: 'HUMAN_PROFILE_AUDIO_LISTENING_REVIEW';
  boundAt: string;
  preview: {path: string; sha256: string};
  bgm: {path: string; sha256: string};
  qa: {
    audibility: QaState;
    balance: QaState;
    startIntegrity: QaState;
    endIntegrity: QaState;
    pictureSync: QaState;
  };
  review: {overall: QaState; reviewer: string | null; reviewedAt: string | null; notes: string};
  macDaVinciActual: 'NOT_RUN';
  productionReady: false;
};

const shaFile = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
const rel = (path: string) => relative(studioRoot, path).replaceAll('\\', '/');
const qaAxes = ['audibility', 'balance', 'startIntegrity', 'endIntegrity', 'pictureSync'] as const;
const isQaState = (value: unknown): value is QaState => value === 'NOT_RUN' || value === 'PASS' || value === 'FAIL';

function currentBindings() {
  if (!existsSync(previewPath)) throw new Error('PROFILE_AUDIO_REVIEW_PREVIEW_MISSING');
  const rights = evaluateProfileV1BgmRights();
  if (!rights.rightsCleared || rights.state !== 'CLEARED' || !rights.current) {
    throw new Error(`PROFILE_AUDIO_REVIEW_BGM_RIGHTS_NOT_CLEARED:${rights.blockers.join('|')}`);
  }
  return {
    preview: {path: rel(previewPath), sha256: shaFile(previewPath)},
    bgm: rights.current,
  };
}

function initialize() {
  const current = currentBindings();
  const evidence: Evidence = {
    schemaVersion: 'profile-v1-audio-listening-review/v1',
    authority: 'HUMAN_PROFILE_AUDIO_LISTENING_REVIEW',
    boundAt: new Date().toISOString(),
    preview: current.preview,
    bgm: current.bgm,
    qa: {
      audibility: 'NOT_RUN',
      balance: 'NOT_RUN',
      startIntegrity: 'NOT_RUN',
      endIntegrity: 'NOT_RUN',
      pictureSync: 'NOT_RUN',
    },
    review: {overall: 'NOT_RUN', reviewer: null, reviewedAt: null, notes: ''},
    macDaVinciActual: 'NOT_RUN',
    productionReady: false,
  };
  mkdirSync(dirname(evidencePath), {recursive: true});
  writeFileSync(evidencePath, `${JSON.stringify(evidence, null, 2)}\n`);
  console.log(`Profile V1 audio listening review initialized: ${rel(evidencePath)}`);
  console.log('Human listening verdicts remain NOT_RUN; Mac DaVinci Actual remains NOT_RUN.');
}

function evaluate() {
  const blockers: string[] = [];
  if (!existsSync(evidencePath)) {
    return {
      schemaVersion: 'profile-v1-audio-listening-review-status/v1' as const,
      authority: 'DERIVED_PROFILE_AUDIO_LISTENING_REVIEW_STATUS' as const,
      state: 'NOT_RUN' as const,
      evidencePath: rel(evidencePath),
      blockers: ['PROFILE_AUDIO_LISTENING_REVIEW_NOT_RUN'],
      humanAudioQaComplete: false,
      macDaVinciActual: 'NOT_RUN' as const,
      productionReady: false,
    };
  }

  let evidence: Evidence;
  try {
    evidence = JSON.parse(readFileSync(evidencePath, 'utf8')) as Evidence;
  } catch {
    return {
      schemaVersion: 'profile-v1-audio-listening-review-status/v1' as const,
      authority: 'DERIVED_PROFILE_AUDIO_LISTENING_REVIEW_STATUS' as const,
      state: 'BLOCKED' as const,
      evidencePath: rel(evidencePath),
      blockers: ['PROFILE_AUDIO_LISTENING_REVIEW_INVALID_JSON'],
      humanAudioQaComplete: false,
      macDaVinciActual: 'NOT_RUN' as const,
      productionReady: false,
    };
  }

  if (evidence.schemaVersion !== 'profile-v1-audio-listening-review/v1') blockers.push('PROFILE_AUDIO_LISTENING_SCHEMA');
  if (evidence.authority !== 'HUMAN_PROFILE_AUDIO_LISTENING_REVIEW') blockers.push('PROFILE_AUDIO_LISTENING_AUTHORITY');
  if (evidence.macDaVinciActual !== 'NOT_RUN') blockers.push('PROFILE_AUDIO_REVIEW_CANNOT_PROMOTE_MAC_ACTUAL');
  if (evidence.productionReady !== false) blockers.push('PROFILE_AUDIO_REVIEW_CANNOT_PROMOTE_PRODUCTION');

  let current: ReturnType<typeof currentBindings> | null = null;
  try {
    current = currentBindings();
  } catch (error) {
    blockers.push(error instanceof Error ? error.message : String(error));
  }
  if (current) {
    if (evidence.preview.path !== current.preview.path || evidence.preview.sha256 !== current.preview.sha256) blockers.push('STALE_PROFILE_AUDIO_REVIEW_PREVIEW_SHA');
    if (evidence.bgm.path !== current.bgm.path || evidence.bgm.sha256 !== current.bgm.sha256) blockers.push('STALE_PROFILE_AUDIO_REVIEW_BGM_SHA');
  }

  if (!evidence.qa || typeof evidence.qa !== 'object') {
    blockers.push('PROFILE_AUDIO_QA_INVALID');
  } else {
    for (const axis of qaAxes) {
      const state = evidence.qa[axis];
      if (!isQaState(state)) blockers.push(`PROFILE_AUDIO_QA_INVALID:${axis}`);
      else if (state !== 'PASS') blockers.push(`PROFILE_AUDIO_QA_${state}:${axis}`);
    }
  }
  if (!evidence.review || evidence.review.overall !== 'PASS') blockers.push(`PROFILE_AUDIO_OVERALL_${evidence.review?.overall ?? 'INVALID'}`);
  if (!evidence.review?.reviewer?.trim()) blockers.push('PROFILE_AUDIO_REVIEWER_MISSING');
  if (!evidence.review?.reviewedAt || Number.isNaN(Date.parse(evidence.review.reviewedAt))) blockers.push('PROFILE_AUDIO_REVIEWED_AT_INVALID');
  if (!evidence.review?.notes?.trim()) blockers.push('PROFILE_AUDIO_REVIEW_NOTES_MISSING');

  const pass = blockers.length === 0;
  return {
    schemaVersion: 'profile-v1-audio-listening-review-status/v1' as const,
    authority: 'DERIVED_PROFILE_AUDIO_LISTENING_REVIEW_STATUS' as const,
    state: pass ? ('PASS' as const) : ('BLOCKED' as const),
    evidencePath: rel(evidencePath),
    blockers,
    humanAudioQaComplete: pass,
    previewSha256: evidence.preview?.sha256 ?? null,
    bgmSha256: evidence.bgm?.sha256 ?? null,
    macDaVinciActual: 'NOT_RUN' as const,
    productionReady: false,
  };
}

if (mode === 'init') {
  try {
    initialize();
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
} else {
  const result = evaluate();
  if (mode === 'json') console.log(JSON.stringify(result, null, 2));
  else {
    console.log(`Profile V1 audio listening review: ${result.state}`);
    for (const blocker of result.blockers) console.log(`BLOCK / ${blocker}`);
  }
  if (mode === 'strict' && result.state !== 'PASS') process.exit(1);
}
