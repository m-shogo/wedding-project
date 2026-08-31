import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, statSync, writeFileSync} from 'node:fs';
import {dirname, join, relative, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {strict as assert} from 'node:assert';

const studioRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = resolve(studioRoot, '..');
const manifestPath = join(repoRoot, 'movie-dashboard/public/demo-renders/japanese-friends-opening-start-sync-v1.manifest.json');
const artifactPath = join(repoRoot, 'movie-dashboard/public/demo-renders/japanese-friends-opening-start-sync-v1.mp4');
const lyricPath = join(studioRoot, 'local/lyrics-wedding-edit.local.json');
const evidencePath = join(studioRoot, 'out/qa/japanese-friends-opening-start-sync-listening-review.json');
const mode = process.argv.includes('--init')
  ? 'init'
  : process.argv.includes('--strict')
    ? 'strict'
    : process.argv.includes('--json')
      ? 'json'
      : process.argv.includes('--self-test')
        ? 'self-test'
        : 'status';

type ReviewState = 'NOT_RUN' | 'PASS' | 'FAIL';
type PhraseBinding = {
  phraseId: string;
  lineNumber: number;
  sectionId: string;
  startSec: number;
  endSec: number;
  threeHitFrameSecs: number[] | null;
  rhythmType: string;
  confidence: string;
};
type PhraseReview = PhraseBinding & {review: ReviewState; notes: string};
type GlobalChecks = {
  fullPlayback: ReviewState;
  lyricTimingOverall: ReviewState;
  measuredThreeHitTiming: ReviewState;
  transitionRhythm: ReviewState;
  endingLockupTiming: ReviewState;
  audioVisualSync: ReviewState;
};
type Evidence = {
  schemaVersion: 'japanese-friends-opening-start-sync-listening-review/v1';
  authority: 'HUMAN_START_SYNC_LISTENING_REVIEW';
  boundAt: string;
  manifestSha256: string;
  artifactSha256: string;
  sourceAudioSha256: string;
  lyricTimingFingerprintSha256: string;
  phraseCount: 30;
  measuredThreeHitPhraseCount: 4;
  phrases: PhraseReview[];
  checks: GlobalChecks;
  review: {overall: ReviewState; reviewer: string | null; reviewedAt: string | null; notes: string};
  rightsCleared: false;
  publicationApproved: false;
  macDaVinciActual: 'NOT_RUN';
  productionReady: false;
};

const sha = (value: Buffer | string) => createHash('sha256').update(value).digest('hex');
const shaFile = (path: string) => sha(readFileSync(path));
const rel = (path: string) => relative(repoRoot, path).replaceAll('\\', '/');
const reviewStates = new Set<ReviewState>(['NOT_RUN', 'PASS', 'FAIL']);
const isReviewState = (value: unknown): value is ReviewState => typeof value === 'string' && reviewStates.has(value as ReviewState);

function readManifest() {
  if (!existsSync(manifestPath)) throw new Error('START_SYNC_MANIFEST_MISSING');
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as any;
  if (manifest.schemaVersion !== 'japanese-friends-opening-start-sync-manifest/v1') throw new Error('START_SYNC_MANIFEST_SCHEMA');
  if (manifest.authority !== 'PRIVATE_START_SYNC_DEMO') throw new Error('START_SYNC_MANIFEST_AUTHORITY');
  if (manifest.publicationApproved !== false) throw new Error('START_SYNC_PUBLICATION_MUST_REMAIN_BLOCKED');
  if (manifest.rightsStatus !== 'MUSIC_AND_LYRICS_NOT_CLEARED') throw new Error('START_SYNC_RIGHTS_STATUS_UNEXPECTED');
  if (manifest.timing?.lyricPhraseCount !== 30 || manifest.timing?.measuredThreeHitPhraseCount !== 4) throw new Error('START_SYNC_TIMING_COUNT_MISMATCH');
  if (manifest.timing?.humanReviewRequired !== true) throw new Error('START_SYNC_HUMAN_REVIEW_MUST_BE_REQUIRED');
  return manifest;
}

function phraseBindings(): PhraseBinding[] {
  if (!existsSync(lyricPath)) throw new Error('START_SYNC_LOCAL_LYRICS_MISSING');
  const document = JSON.parse(readFileSync(lyricPath, 'utf8')) as {phrases?: any[]};
  if (!Array.isArray(document.phrases) || document.phrases.length !== 30) throw new Error(`START_SYNC_LOCAL_LYRIC_COUNT:${document.phrases?.length ?? 0}/30`);
  const bindings = document.phrases.map((phrase, index) => {
    const threeHitFrameSecs = Array.isArray(phrase?.threeHitFrameSecs) ? phrase.threeHitFrameSecs.map(Number) : null;
    return {
      phraseId: String(phrase?.phraseId ?? `phrase-${index + 1}`),
      lineNumber: Number(phrase?.lineNumber ?? index + 1),
      sectionId: String(phrase?.sectionId ?? 'UNKNOWN'),
      startSec: Number(phrase?.startSec),
      endSec: Number(phrase?.endSec),
      threeHitFrameSecs,
      rhythmType: String(phrase?.rhythmType ?? 'UNKNOWN'),
      confidence: String(phrase?.confidence ?? 'UNKNOWN'),
    } satisfies PhraseBinding;
  });
  for (const phrase of bindings) {
    if (!phrase.phraseId || !Number.isFinite(phrase.startSec) || !Number.isFinite(phrase.endSec) || phrase.endSec <= phrase.startSec) {
      throw new Error(`START_SYNC_LOCAL_LYRIC_BINDING_INVALID:${phrase.phraseId}`);
    }
  }
  const measured = bindings.filter((phrase) => Array.isArray(phrase.threeHitFrameSecs) && phrase.threeHitFrameSecs.length === 3);
  if (measured.length !== 4) throw new Error(`START_SYNC_MEASURED_THREE_HIT_COUNT:${measured.length}/4`);
  return bindings;
}

function timingFingerprint(phrases: readonly PhraseBinding[]) {
  return sha(JSON.stringify(phrases.map((phrase) => ({
    phraseId: phrase.phraseId,
    lineNumber: phrase.lineNumber,
    sectionId: phrase.sectionId,
    startSec: phrase.startSec,
    endSec: phrase.endSec,
    threeHitFrameSecs: phrase.threeHitFrameSecs,
    rhythmType: phrase.rhythmType,
    confidence: phrase.confidence,
  }))));
}

function currentBindings() {
  const manifest = readManifest();
  if (!existsSync(artifactPath)) throw new Error('START_SYNC_LOCAL_RENDER_MISSING');
  const artifactSha256 = shaFile(artifactPath);
  if (artifactSha256 !== manifest.artifact?.sha256) throw new Error('START_SYNC_LOCAL_RENDER_SHA_MISMATCH');
  if (statSync(artifactPath).size !== manifest.artifact?.byteSize) throw new Error('START_SYNC_LOCAL_RENDER_SIZE_MISMATCH');
  const phrases = phraseBindings();
  return {
    manifest,
    manifestSha256: shaFile(manifestPath),
    artifactSha256,
    sourceAudioSha256: String(manifest.source?.sourceAudioSha256 ?? ''),
    lyricTimingFingerprintSha256: timingFingerprint(phrases),
    phrases,
  };
}

function initialize() {
  const current = currentBindings();
  const evidence: Evidence = {
    schemaVersion: 'japanese-friends-opening-start-sync-listening-review/v1',
    authority: 'HUMAN_START_SYNC_LISTENING_REVIEW',
    boundAt: new Date().toISOString(),
    manifestSha256: current.manifestSha256,
    artifactSha256: current.artifactSha256,
    sourceAudioSha256: current.sourceAudioSha256,
    lyricTimingFingerprintSha256: current.lyricTimingFingerprintSha256,
    phraseCount: 30,
    measuredThreeHitPhraseCount: 4,
    phrases: current.phrases.map((phrase) => ({...phrase, review: 'NOT_RUN', notes: ''})),
    checks: {
      fullPlayback: 'NOT_RUN',
      lyricTimingOverall: 'NOT_RUN',
      measuredThreeHitTiming: 'NOT_RUN',
      transitionRhythm: 'NOT_RUN',
      endingLockupTiming: 'NOT_RUN',
      audioVisualSync: 'NOT_RUN',
    },
    review: {overall: 'NOT_RUN', reviewer: null, reviewedAt: null, notes: ''},
    rightsCleared: false,
    publicationApproved: false,
    macDaVinciActual: 'NOT_RUN',
    productionReady: false,
  };
  mkdirSync(dirname(evidencePath), {recursive: true});
  writeFileSync(evidencePath, `${JSON.stringify(evidence, null, 2)}\n`);
  console.log(`StaRt sync Human listening review initialized: ${rel(evidencePath)}`);
  console.log(`artifactSha256=${evidence.artifactSha256}`);
  console.log('30 phrase timing verdicts and all global listening checks remain NOT_RUN. Rights and GUI Actual remain separate.');
}

function evaluate() {
  const base = {
    schemaVersion: 'japanese-friends-opening-start-sync-listening-review-status/v1' as const,
    authority: 'DERIVED_START_SYNC_LISTENING_REVIEW_STATUS' as const,
    evidencePath: rel(evidencePath),
    rightsCleared: false as const,
    publicationApproved: false as const,
    macDaVinciActual: 'NOT_RUN' as const,
    productionReady: false as const,
  };
  if (!existsSync(evidencePath)) {
    return {...base, state: 'NOT_RUN' as const, humanReviewComplete: false, phrasesReviewed: 0, phrasesExpected: 30, blockers: ['START_SYNC_LISTENING_REVIEW_EVIDENCE_MISSING']};
  }
  let evidence: Evidence;
  try {
    evidence = JSON.parse(readFileSync(evidencePath, 'utf8')) as Evidence;
  } catch {
    return {...base, state: 'BLOCKED' as const, humanReviewComplete: false, phrasesReviewed: 0, phrasesExpected: 30, blockers: ['START_SYNC_LISTENING_REVIEW_EVIDENCE_INVALID_JSON']};
  }
  const blockers: string[] = [];
  if (evidence.schemaVersion !== 'japanese-friends-opening-start-sync-listening-review/v1') blockers.push('START_SYNC_LISTENING_REVIEW_SCHEMA');
  if (evidence.authority !== 'HUMAN_START_SYNC_LISTENING_REVIEW') blockers.push('START_SYNC_LISTENING_REVIEW_AUTHORITY');
  if (evidence.rightsCleared !== false) blockers.push('START_SYNC_RIGHTS_CANNOT_BE_PROMOTED_BY_LISTENING_REVIEW');
  if (evidence.publicationApproved !== false) blockers.push('START_SYNC_PUBLICATION_CANNOT_BE_PROMOTED_BY_LISTENING_REVIEW');
  if (evidence.macDaVinciActual !== 'NOT_RUN') blockers.push('START_SYNC_MAC_DAVINCI_ACTUAL_MUST_REMAIN_NOT_RUN');
  if (evidence.productionReady !== false) blockers.push('START_SYNC_LISTENING_REVIEW_CANNOT_PROMOTE_PRODUCTION_READY');

  let current: ReturnType<typeof currentBindings> | null = null;
  try {
    current = currentBindings();
  } catch (error) {
    blockers.push(error instanceof Error ? error.message : String(error));
  }
  if (current) {
    if (evidence.manifestSha256 !== current.manifestSha256) blockers.push('START_SYNC_LISTENING_REVIEW_MANIFEST_STALE');
    if (evidence.artifactSha256 !== current.artifactSha256) blockers.push('START_SYNC_LISTENING_REVIEW_RENDER_STALE');
    if (evidence.sourceAudioSha256 !== current.sourceAudioSha256) blockers.push('START_SYNC_LISTENING_REVIEW_AUDIO_STALE');
    if (evidence.lyricTimingFingerprintSha256 !== current.lyricTimingFingerprintSha256) blockers.push('START_SYNC_LISTENING_REVIEW_TIMING_STALE');
  }

  if (!Array.isArray(evidence.phrases) || evidence.phrases.length !== 30) blockers.push(`START_SYNC_LISTENING_REVIEW_PHRASE_COUNT:${evidence.phrases?.length ?? 0}/30`);
  const phraseById = new Map(Array.isArray(evidence.phrases) ? evidence.phrases.map((phrase) => [phrase.phraseId, phrase]) : []);
  if (phraseById.size !== (evidence.phrases?.length ?? 0)) blockers.push('START_SYNC_LISTENING_REVIEW_DUPLICATE_PHRASE');
  if (current && Array.isArray(evidence.phrases)) {
    for (const binding of current.phrases) {
      const saved = phraseById.get(binding.phraseId);
      if (!saved) {
        blockers.push(`START_SYNC_LISTENING_REVIEW_PHRASE_MISSING:${binding.phraseId}`);
        continue;
      }
      const {review: _review, notes: _notes, ...savedBinding} = saved;
      if (JSON.stringify(savedBinding) !== JSON.stringify(binding)) blockers.push(`START_SYNC_LISTENING_REVIEW_PHRASE_STALE:${binding.phraseId}`);
      if (!isReviewState(saved.review)) blockers.push(`START_SYNC_LISTENING_REVIEW_PHRASE_INVALID:${binding.phraseId}`);
      else if (saved.review !== 'PASS') blockers.push(`START_SYNC_LISTENING_REVIEW_PHRASE_${saved.review}:${binding.phraseId}`);
    }
  }

  const globalEntries = Object.entries(evidence.checks ?? {}) as Array<[keyof GlobalChecks, unknown]>;
  const expectedGlobalChecks: Array<keyof GlobalChecks> = ['fullPlayback', 'lyricTimingOverall', 'measuredThreeHitTiming', 'transitionRhythm', 'endingLockupTiming', 'audioVisualSync'];
  for (const key of expectedGlobalChecks) {
    const value = evidence.checks?.[key];
    if (!isReviewState(value)) blockers.push(`START_SYNC_LISTENING_REVIEW_GLOBAL_INVALID:${key}`);
    else if (value !== 'PASS') blockers.push(`START_SYNC_LISTENING_REVIEW_GLOBAL_${value}:${key}`);
  }
  if (globalEntries.length !== expectedGlobalChecks.length) blockers.push('START_SYNC_LISTENING_REVIEW_GLOBAL_CHECK_COUNT');
  if (evidence.review?.overall !== 'PASS') blockers.push(`START_SYNC_LISTENING_REVIEW_OVERALL_${evidence.review?.overall ?? 'INVALID'}`);
  if (!evidence.review?.reviewer?.trim()) blockers.push('START_SYNC_LISTENING_REVIEW_REVIEWER_MISSING');
  if (!evidence.review?.reviewedAt || Number.isNaN(Date.parse(evidence.review.reviewedAt))) blockers.push('START_SYNC_LISTENING_REVIEW_REVIEWED_AT_INVALID');
  if (!evidence.boundAt || Number.isNaN(Date.parse(evidence.boundAt))) blockers.push('START_SYNC_LISTENING_REVIEW_BOUND_AT_INVALID');
  else if (evidence.review?.reviewedAt && Date.parse(evidence.review.reviewedAt) < Date.parse(evidence.boundAt)) blockers.push('START_SYNC_LISTENING_REVIEW_REVIEWED_BEFORE_BINDING');

  const phrasesReviewed = Array.isArray(evidence.phrases) ? evidence.phrases.filter((phrase) => phrase.review === 'PASS').length : 0;
  const stale = blockers.some((blocker) => blocker.includes('_STALE'));
  const humanReviewComplete = blockers.length === 0;
  return {
    ...base,
    state: humanReviewComplete ? ('PASS' as const) : stale ? ('STALE' as const) : ('BLOCKED' as const),
    humanReviewComplete,
    phrasesReviewed,
    phrasesExpected: 30,
    blockers,
  };
}

function selfTest() {
  const phrases: PhraseBinding[] = Array.from({length: 30}, (_, index) => ({
    phraseId: `phrase-${index + 1}`,
    lineNumber: index + 1,
    sectionId: index < 10 ? 'A' : index < 20 ? 'B' : 'C',
    startSec: index * 4,
    endSec: index * 4 + 3.5,
    threeHitFrameSecs: [0.1, 0.2, 0.3, 0.4].includes(Number((index / 10).toFixed(1))) ? [index * 4 + 0.5, index * 4 + 1, index * 4 + 1.5] : null,
    rhythmType: 'TEST',
    confidence: 'TEST',
  }));
  const withFourMeasured = phrases.map((phrase, index) => ({...phrase, threeHitFrameSecs: index < 4 ? [phrase.startSec + 0.5, phrase.startSec + 1, phrase.startSec + 1.5] : null}));
  const fingerprint = timingFingerprint(withFourMeasured);
  assert.equal(fingerprint, timingFingerprint(withFourMeasured));
  assert.notEqual(fingerprint, timingFingerprint(withFourMeasured.map((phrase, index) => index === 0 ? {...phrase, startSec: phrase.startSec + 0.01} : phrase)));
  assert.notEqual(fingerprint, timingFingerprint(withFourMeasured.map((phrase, index) => index === 1 ? {...phrase, threeHitFrameSecs: [1, 2, 4]} : phrase)));
  console.log('StaRt sync Human listening review binding self-test: PASS');
  console.log('Timing drift and measured three-hit drift invalidate the copyright-safe phrase fingerprint.');
}

if (mode === 'init') initialize();
else if (mode === 'self-test') selfTest();
else {
  const status = evaluate();
  if (mode === 'json') console.log(JSON.stringify(status, null, 2));
  else {
    console.log(`StaRt sync Human listening QA: ${status.state} (${status.phrasesReviewed}/${status.phrasesExpected} phrase timings PASS)`);
    for (const blocker of status.blockers) console.log(`BLOCK / ${blocker}`);
  }
  if (mode === 'strict' && !status.humanReviewComplete) process.exit(1);
}
