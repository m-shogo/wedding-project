import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync} from 'node:fs';
import {dirname, extname, join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';
import {strict as assert} from 'node:assert';
import {openingV1Presentation} from '../src/data/openingV1Presentation.ts';
import {orderedKeys, type OpeningV1PhotoKey} from '../src/data/openingV1PhotoRoles.ts';
import {
  openingV1PhotoMetadata,
  resolveOpeningV1PhotoPresentation,
  validateOpeningV1PhotoMetadata,
  type OpeningV1PhotoFit,
  type OpeningV1PhotoFocus,
} from '../src/data/openingV1PhotoPresentation.ts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const openingDir = join(studioRoot, 'public/photos/opening');
const evidencePath = join(studioRoot, 'out/qa/opening-v1-crop-review-evidence.json');
const imageExts = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const mode = process.argv.includes('--init')
  ? 'init'
  : process.argv.includes('--strict')
    ? 'strict'
    : process.argv.includes('--self-test')
      ? 'self-test'
      : process.argv.includes('--json')
        ? 'json'
        : 'status';

type ReviewState = 'NOT_RUN' | 'PASS' | 'FAIL';
type DerivedState = 'NOT_RUN' | 'PASS' | 'BLOCKED' | 'STALE';
type PresentationSource = 'scene' | 'asset' | 'default';
type SlotBinding = {
  key: OpeningV1PhotoKey;
  file: string;
  mediaSha256: string;
  focus: OpeningV1PhotoFocus | null;
  fit: OpeningV1PhotoFit;
  focusSource: PresentationSource;
  fitSource: PresentationSource;
  cropQaRequired: boolean;
  presentationRevision: string;
};
type SlotEvidence = SlotBinding & {
  review: ReviewState;
  reviewer: string | null;
  reviewedAt: string | null;
  notes: string;
};
type Evidence = {
  schemaVersion: 'opening-v1-crop-review-evidence/v1';
  authority: 'HUMAN_OPENING_CROP_REVIEW';
  boundAt: string;
  bindingFingerprintSha256: string;
  slots: SlotEvidence[];
  overall: ReviewState;
  macStudioActual: 'NOT_RUN';
  macDaVinciActual: 'NOT_RUN';
  productionReady: false;
};

const shaBuffer = (value: Buffer | string) => createHash('sha256').update(value).digest('hex');
const shaFile = (path: string) => shaBuffer(readFileSync(path));
const rel = (path: string) => relative(studioRoot, path).replaceAll('\\', '/');
const normalizeStem = (file: string) => {
  const ext = extname(file);
  return file.slice(0, file.length - ext.length).toLowerCase().replaceAll('_', '-');
};

const scenePresentation = (key: OpeningV1PhotoKey): {fit: OpeningV1PhotoFit; focus: OpeningV1PhotoFocus} => {
  if (key.startsWith('hero-')) {
    const plan = key === 'hero-01' ? openingV1Presentation.heroes.a : openingV1Presentation.heroes.b;
    return {fit: plan.fit, focus: plan.focus};
  }
  const [place, ordinal] = key.split('-') as ['okinawa' | 'seoul' | 'hawaii', string];
  const plan = openingV1Presentation.memories[place][Number(ordinal) - 1];
  if (!plan) throw new Error(`OPENING_CROP_SCENE_PRESENTATION_MISSING:${key}`);
  return {fit: plan.layout === 'wide' ? 'contain' : 'cover', focus: plan.focus};
};

const bindingRevision = (binding: Omit<SlotBinding, 'presentationRevision'>) =>
  shaBuffer(JSON.stringify({
    key: binding.key,
    mediaSha256: binding.mediaSha256,
    focus: binding.focus,
    fit: binding.fit,
    focusSource: binding.focusSource,
    fitSource: binding.fitSource,
    cropQaRequired: binding.cropQaRequired,
  }));

const bindingFingerprint = (slots: readonly SlotBinding[]) =>
  shaBuffer(slots.map((slot) => `${slot.key}\0${slot.presentationRevision}`).join('\n'));

function currentBindings(): SlotBinding[] {
  const metadataErrors = validateOpeningV1PhotoMetadata();
  if (metadataErrors.length > 0) throw new Error(`OPENING_CROP_METADATA_INVALID:${metadataErrors.join('|')}`);
  if (!existsSync(openingDir)) throw new Error('OPENING_CROP_MEDIA_DIR_MISSING');
  const files = readdirSync(openingDir)
    .filter((file) => !file.startsWith('.'))
    .filter((file) => statSync(join(openingDir, file)).isFile())
    .filter((file) => imageExts.has(extname(file).toLowerCase()));
  const fileByStem = new Map(files.map((file) => [normalizeStem(file), file]));

  return orderedKeys.map((key) => {
    const file = fileByStem.get(key);
    if (!file) throw new Error(`OPENING_CROP_MEDIA_MISSING:${key}`);
    const scene = scenePresentation(key);
    const asset = openingV1PhotoMetadata[key];
    const effective = resolveOpeningV1PhotoPresentation({
      sceneFocus: scene.focus,
      sceneFit: scene.fit,
      assetFocus: asset?.focus,
      assetFit: asset?.fit,
    });
    const absolute = join(openingDir, file);
    const base = {
      key,
      file: rel(absolute),
      mediaSha256: shaFile(absolute),
      focus: effective.focus ?? null,
      fit: effective.fit,
      focusSource: effective.focusSource,
      fitSource: effective.fitSource,
      cropQaRequired: effective.fit === 'cover',
    } satisfies Omit<SlotBinding, 'presentationRevision'>;
    return {...base, presentationRevision: bindingRevision(base)};
  });
}

function initializeEvidence() {
  const slots = currentBindings();
  const evidence: Evidence = {
    schemaVersion: 'opening-v1-crop-review-evidence/v1',
    authority: 'HUMAN_OPENING_CROP_REVIEW',
    boundAt: new Date().toISOString(),
    bindingFingerprintSha256: bindingFingerprint(slots),
    slots: slots.map((slot) => ({
      ...slot,
      review: slot.cropQaRequired ? 'NOT_RUN' : 'PASS',
      reviewer: null,
      reviewedAt: null,
      notes: slot.cropQaRequired ? '' : 'Contain presentation does not require crop framing review.',
    })),
    overall: 'NOT_RUN',
    macStudioActual: 'NOT_RUN',
    macDaVinciActual: 'NOT_RUN',
    productionReady: false,
  };
  mkdirSync(dirname(evidencePath), {recursive: true});
  writeFileSync(evidencePath, `${JSON.stringify(evidence, null, 2)}\n`);
  console.log(`Opening V1 crop review initialized: ${rel(evidencePath)}`);
  console.log(`bindingFingerprintSha256=${evidence.bindingFingerprintSha256}`);
  console.log('Human cover-crop verdicts remain NOT_RUN. Mac/Studio and DaVinci Actual remain NOT_RUN.');
}

function evaluate() {
  const base = {
    schemaVersion: 'opening-v1-crop-review-status/v1' as const,
    authority: 'DERIVED_OPENING_CROP_REVIEW_STATUS' as const,
    evidencePath: rel(evidencePath),
    macStudioActual: 'NOT_RUN' as const,
    macDaVinciActual: 'NOT_RUN' as const,
    productionReady: false as const,
  };
  if (!existsSync(evidencePath)) {
    return {...base, state: 'NOT_RUN' as DerivedState, blockers: ['OPENING_CROP_REVIEW_EVIDENCE_MISSING'], reviewedCount: 0, requiredCount: 0};
  }

  let evidence: Evidence;
  try {
    evidence = JSON.parse(readFileSync(evidencePath, 'utf8')) as Evidence;
  } catch {
    return {...base, state: 'BLOCKED' as DerivedState, blockers: ['OPENING_CROP_REVIEW_EVIDENCE_INVALID_JSON'], reviewedCount: 0, requiredCount: 0};
  }

  const blockers: string[] = [];
  if (evidence.schemaVersion !== 'opening-v1-crop-review-evidence/v1') blockers.push('OPENING_CROP_REVIEW_SCHEMA_MISMATCH');
  if (evidence.authority !== 'HUMAN_OPENING_CROP_REVIEW') blockers.push('OPENING_CROP_REVIEW_AUTHORITY_MISMATCH');
  if (evidence.macStudioActual !== 'NOT_RUN') blockers.push('MAC_STUDIO_ACTUAL_MUST_REMAIN_NOT_RUN');
  if (evidence.macDaVinciActual !== 'NOT_RUN') blockers.push('MAC_DAVINCI_ACTUAL_MUST_REMAIN_NOT_RUN');
  if (evidence.productionReady !== false) blockers.push('CROP_REVIEW_CANNOT_PROMOTE_PRODUCTION_READY');
  const boundAtMs = Date.parse(evidence.boundAt);
  if (!evidence.boundAt || Number.isNaN(boundAtMs)) blockers.push('OPENING_CROP_REVIEW_BOUND_AT_INVALID');

  let current: SlotBinding[] | null = null;
  try {
    current = currentBindings();
  } catch (error) {
    blockers.push(error instanceof Error ? error.message : String(error));
  }

  if (!Array.isArray(evidence.slots)) blockers.push('OPENING_CROP_REVIEW_SLOTS_INVALID');
  if (current && Array.isArray(evidence.slots)) {
    if (evidence.bindingFingerprintSha256 !== bindingFingerprint(current)) blockers.push('OPENING_CROP_REVIEW_BINDING_STALE');
    const savedByKey = new Map(evidence.slots.map((slot) => [slot.key, slot]));
    if (savedByKey.size !== evidence.slots.length) blockers.push('OPENING_CROP_REVIEW_DUPLICATE_SLOT');
    for (const slot of current) {
      const saved = savedByKey.get(slot.key);
      if (!saved) {
        blockers.push(`OPENING_CROP_REVIEW_SLOT_MISSING:${slot.key}`);
        continue;
      }
      if (saved.file !== slot.file || saved.mediaSha256 !== slot.mediaSha256) blockers.push(`OPENING_CROP_REVIEW_MEDIA_STALE:${slot.key}`);
      if (saved.presentationRevision !== slot.presentationRevision) blockers.push(`OPENING_CROP_REVIEW_PRESENTATION_STALE:${slot.key}`);
      if (saved.fit !== slot.fit || JSON.stringify(saved.focus) !== JSON.stringify(slot.focus)) blockers.push(`OPENING_CROP_REVIEW_EFFECTIVE_CROP_STALE:${slot.key}`);
      if (saved.cropQaRequired !== slot.cropQaRequired) blockers.push(`OPENING_CROP_REVIEW_REQUIREMENT_STALE:${slot.key}`);
      if (slot.cropQaRequired) {
        if (saved.review !== 'PASS') blockers.push(`OPENING_CROP_REVIEW_${saved.review}:${slot.key}`);
        if (saved.review === 'PASS' && (!saved.reviewer || !saved.reviewedAt || Number.isNaN(Date.parse(saved.reviewedAt)))) {
          blockers.push(`OPENING_CROP_REVIEW_PASS_EVIDENCE_INCOMPLETE:${slot.key}`);
        }
      }
    }
    for (const saved of evidence.slots) {
      if (!current.some((slot) => slot.key === saved.key)) blockers.push(`OPENING_CROP_REVIEW_UNKNOWN_SLOT:${saved.key}`);
    }
  }

  if (evidence.overall !== 'PASS') blockers.push(`OPENING_CROP_REVIEW_OVERALL_${evidence.overall}`);
  const required = current?.filter((slot) => slot.cropQaRequired) ?? [];
  const reviewedCount = required.filter((slot) => evidence.slots?.find((saved) => saved.key === slot.key)?.review === 'PASS').length;
  const stale = blockers.some((blocker) => blocker.includes('_STALE'));
  const state: DerivedState = blockers.length === 0 ? 'PASS' : stale ? 'STALE' : 'BLOCKED';
  return {...base, state, blockers, reviewedCount, requiredCount: required.length};
}

function selfTest() {
  const base = {
    key: 'hero-01' as OpeningV1PhotoKey,
    file: 'public/photos/opening/hero-01.jpg',
    mediaSha256: 'a'.repeat(64),
    focus: {x: 50, y: 50},
    fit: 'cover' as OpeningV1PhotoFit,
    focusSource: 'scene' as const,
    fitSource: 'scene' as const,
    cropQaRequired: true,
  };
  const revision = bindingRevision(base);
  assert.equal(revision, bindingRevision({...base}));
  assert.notEqual(revision, bindingRevision({...base, mediaSha256: 'b'.repeat(64)}));
  assert.notEqual(revision, bindingRevision({...base, focus: {x: 51, y: 50}}));
  assert.notEqual(revision, bindingRevision({...base, fit: 'contain'}));
  const bound = [{...base, presentationRevision: revision}];
  assert.notEqual(bindingFingerprint(bound), bindingFingerprint([{...base, mediaSha256: 'b'.repeat(64), presentationRevision: bindingRevision({...base, mediaSha256: 'b'.repeat(64)})}]));
  console.log('Opening V1 crop review binding self-test: PASS');
  console.log('media SHA, effective focus, and fit changes each invalidate the bound presentation revision.');
}

if (mode === 'init') {
  initializeEvidence();
} else if (mode === 'self-test') {
  selfTest();
} else {
  const report = evaluate();
  if (mode === 'json') console.log(JSON.stringify(report, null, 2));
  else {
    console.log(`Opening V1 crop review: ${report.state} ${report.reviewedCount}/${report.requiredCount}`);
    for (const blocker of report.blockers) console.log(`BLOCK / ${blocker}`);
  }
  if (mode === 'strict' && report.state !== 'PASS') process.exit(1);
}
