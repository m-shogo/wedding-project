import {existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {applyIntakePlan, buildIntakePlan, getIntakeSpecs} from './intake-production-media.mts';

const root = mkdtempSync(join(tmpdir(), 'wedding-media-intake-'));
const openingSource = join(root, 'opening-source');
const openingTarget = join(root, 'opening-target');
const profileSource = join(root, 'profile-source');
const profileTarget = join(root, 'profile-target');

await import('node:fs').then(({mkdirSync}) => {
  mkdirSync(openingSource, {recursive: true});
  mkdirSync(profileSource, {recursive: true});
});

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

  applyIntakePlan(openingPlan);
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
  applyIntakePlan(profilePlan);

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

  console.log('Production media intake contracts OK: Opening aliases -> canonical targets, Profile kind-aware 17-slot import, source preservation, existing-target protection, and ambiguity fail-close verified.');
} finally {
  rmSync(root, {recursive: true, force: true});
}
