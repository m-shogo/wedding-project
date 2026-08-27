import {createHash} from 'node:crypto';
import {existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {applyIntakePlan, buildIntakePlan, getIntakeSpecs, writeIntakeReceipt} from './intake-production-media.mts';

const root = mkdtempSync(join(tmpdir(), 'wedding-media-intake-'));
const openingSource = join(root, 'opening-source');
const openingTarget = join(root, 'opening-target');
const profileSource = join(root, 'profile-source');
const profileTarget = join(root, 'profile-target');

await import('node:fs').then(({mkdirSync}) => {
  mkdirSync(openingSource, {recursive: true});
  mkdirSync(profileSource, {recursive: true});
});

const sha256 = (value: string) => createHash('sha256').update(value).digest('hex');

try {
  const openingSpecs = getIntakeSpecs('opening');
  for (const spec of openingSpecs) {
    let stem = spec.canonicalStem;
    if (spec.id === 'hero-01') stem = 'couple01';
    if (spec.id === 'seoul-01') stem = 'korea01';
    writeFileSync(join(openingSource, `${stem}.JPG`), `opening:${spec.id}`);
  }

  const openingPlan = buildIntakePlan({
    project: 'opening',
    sourceDirectory: openingSource,
    targetDirectory: openingTarget,
  });
  if (!openingPlan.readyToApply) throw new Error(`opening plan unexpectedly blocked: ${JSON.stringify(openingPlan)}`);
  if (openingPlan.expectedCount !== 11 || openingPlan.resolvedCount !== 11) throw new Error('opening plan count mismatch');
  if (!openingPlan.copies.some((item) => item.sourceFile === 'couple01.JPG' && item.targetFile === 'hero-01.jpg')) throw new Error('opening alias did not canonicalize hero-01');
  if (!openingPlan.copies.some((item) => item.sourceFile === 'korea01.JPG' && item.targetFile === 'seoul-01.jpg')) throw new Error('opening alias did not canonicalize seoul-01');

  const openingReceipt = applyIntakePlan(openingPlan, '2026-08-28T00:00:00.000Z');
  if (openingReceipt.schemaVersion !== 'wedding-production-media-intake-receipt/v1') throw new Error('opening receipt schema mismatch');
  if (openingReceipt.copiedCount !== 11 || openingReceipt.expectedCount !== 11) throw new Error('opening receipt count mismatch');
  if (!openingReceipt.sourcePreserved || !openingReceipt.copyBytesVerified) throw new Error('opening receipt must record source preservation and byte verification');
  if (openingReceipt.humanQaState !== 'NOT_RUN' || openingReceipt.macDaVinciActualState !== 'NOT_RUN' || openingReceipt.productionReady) throw new Error('intake receipt must not fabricate downstream readiness');
  const heroReceipt = openingReceipt.copies.find((item) => item.id === 'hero-01');
  if (!heroReceipt) throw new Error('opening receipt missing hero-01');
  if (heroReceipt.sha256 !== sha256('opening:hero-01') || heroReceipt.bytes !== Buffer.byteLength('opening:hero-01') || !heroReceipt.sourceTargetMatch) throw new Error('opening receipt did not bind copied bytes');

  const receiptPath = join(root, 'receipts', 'opening.json');
  writeIntakeReceipt(openingReceipt, receiptPath);
  const persistedReceipt = JSON.parse(readFileSync(receiptPath, 'utf8'));
  if (persistedReceipt.copies.find((item: {id: string}) => item.id === 'hero-01')?.sha256 !== heroReceipt.sha256) throw new Error('persisted receipt changed SHA evidence');

  if (!existsSync(join(openingTarget, 'hero-01.jpg'))) throw new Error('opening apply did not create canonical target');
  if (!existsSync(join(openingSource, 'couple01.JPG'))) throw new Error('opening apply modified source file');
  if (readFileSync(join(openingTarget, 'hero-01.jpg'), 'utf8') !== 'opening:hero-01') throw new Error('opening copied bytes changed');

  const postApplyPlan = buildIntakePlan({
    project: 'opening',
    sourceDirectory: openingSource,
    targetDirectory: openingTarget,
  });
  if (postApplyPlan.readyToApply || postApplyPlan.existingTargets.length !== 11) throw new Error('existing targets must fail closed without --overwrite');

  const profileSpecs = getIntakeSpecs('profile');
  for (const [index, spec] of profileSpecs.entries()) {
    const extension = spec.kind === 'photo' ? '.jpg' : '.mp4';
    const stem = index === 0 ? spec.canonicalStem.replaceAll('-', '_') : spec.canonicalStem;
    writeFileSync(join(profileSource, `${stem}${extension}`), `profile:${spec.id}`);
  }

  const profilePlan = buildIntakePlan({
    project: 'profile',
    sourceDirectory: profileSource,
    targetDirectory: profileTarget,
  });
  if (!profilePlan.readyToApply) throw new Error(`profile plan unexpectedly blocked: ${JSON.stringify(profilePlan)}`);
  if (profilePlan.expectedCount !== 17 || profilePlan.resolvedCount !== 17) throw new Error('profile plan count mismatch');
  const profileReceipt = applyIntakePlan(profilePlan, '2026-08-28T00:00:01.000Z');
  if (profileReceipt.copiedCount !== 17 || profileReceipt.copies.some((item) => !item.sourceTargetMatch || item.sha256.length !== 64)) throw new Error('profile receipt must SHA-verify all 17 media slots');

  const firstProfile = profileSpecs[0];
  const firstExtension = firstProfile.kind === 'photo' ? '.jpg' : '.mp4';
  if (!existsSync(join(profileTarget, `${firstProfile.canonicalStem}${firstExtension}`))) throw new Error('profile underscore normalization did not create canonical target');

  const duplicateSource = join(root, 'duplicate-source');
  await import('node:fs').then(({mkdirSync}) => mkdirSync(duplicateSource, {recursive: true}));
  for (const spec of openingSpecs) writeFileSync(join(duplicateSource, `${spec.canonicalStem}.jpg`), spec.id);
  writeFileSync(join(duplicateSource, 'hero01.png'), 'duplicate');
  const duplicatePlan = buildIntakePlan({project: 'opening', sourceDirectory: duplicateSource, targetDirectory: join(root, 'duplicate-target')});
  if (duplicatePlan.readyToApply) throw new Error('ambiguous canonical role must not be ready to apply');
  if (!duplicatePlan.ambiguous.some((item) => item.id === 'hero-01')) throw new Error('duplicate alias ambiguity was not detected');

  console.log('Production media intake contracts OK: Opening aliases -> canonical targets, Profile kind-aware 17-slot import, source preservation, SHA-verified copy receipts, existing-target protection, and ambiguity fail-close verified.');
} finally {
  rmSync(root, {recursive: true, force: true});
}
