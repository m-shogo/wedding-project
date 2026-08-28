import {existsSync, readdirSync, statSync} from 'node:fs';
import {dirname, extname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
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
const imageExts = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const jsonMode = process.argv.includes('--json');
const strict = process.argv.includes('--strict');

const normalizeStem = (file: string) => {
  const ext = extname(file);
  return file.slice(0, file.length - ext.length).toLowerCase().replaceAll('_', '-');
};

const files = existsSync(openingDir)
  ? readdirSync(openingDir)
      .filter((file) => !file.startsWith('.'))
      .filter((file) => statSync(join(openingDir, file)).isFile())
      .filter((file) => imageExts.has(extname(file).toLowerCase()))
  : [];
const fileByStem = new Map(files.map((file) => [normalizeStem(file), file]));

const scenePresentation = (key: OpeningV1PhotoKey): {fit: OpeningV1PhotoFit; focus: OpeningV1PhotoFocus} => {
  if (key.startsWith('hero-')) {
    const plan = key === 'hero-01' ? openingV1Presentation.heroes.a : openingV1Presentation.heroes.b;
    return {fit: plan.fit, focus: plan.focus};
  }
  const [place, ordinal] = key.split('-') as ['okinawa' | 'seoul' | 'hawaii', string];
  const plan = openingV1Presentation.memories[place][Number(ordinal) - 1];
  if (!plan) throw new Error(`Opening V1 scene presentation missing for ${key}`);
  return {
    fit: plan.layout === 'wide' ? 'contain' : 'cover',
    focus: plan.focus,
  };
};

const metadataErrors = validateOpeningV1PhotoMetadata();
const slots = orderedKeys.map((key) => {
  const scene = scenePresentation(key);
  const asset = openingV1PhotoMetadata[key];
  const effective = resolveOpeningV1PhotoPresentation({
    sceneFocus: scene.focus,
    sceneFit: scene.fit,
    assetFocus: asset?.focus,
    assetFit: asset?.fit,
  });
  const file = fileByStem.get(key) ?? null;
  return {
    key,
    file,
    mediaPresent: file !== null,
    scene: {focus: scene.focus, fit: scene.fit},
    assetHint: asset ?? null,
    effective: {
      focus: effective.focus ?? null,
      fit: effective.fit,
      focusSource: effective.focusSource,
      fitSource: effective.fitSource,
    },
    cropQaRequired: effective.fit === 'cover',
    humanCropQaState: 'NOT_RUN' as const,
  };
});

const presentCount = slots.filter((slot) => slot.mediaPresent).length;
const coverCount = slots.filter((slot) => slot.cropQaRequired).length;
const coverPresentCount = slots.filter((slot) => slot.mediaPresent && slot.cropQaRequired).length;
const assetHintCount = slots.filter((slot) => slot.assetHint !== null).length;
const report = {
  schemaVersion: 'opening-v1-crop-qa-preflight/v1' as const,
  authority: 'OPENING_V1_SCENE_FIRST_CROP_QA' as const,
  precedence: 'SCENE > ASSET > DEFAULT' as const,
  metadataValid: metadataErrors.length === 0,
  metadataErrors,
  summary: {
    expectedCount: slots.length,
    mediaPresentCount: presentCount,
    coverCount,
    coverPresentCount,
    assetHintCount,
    humanCropQaState: 'NOT_RUN' as const,
    macStudioActualState: 'NOT_RUN' as const,
    macDaVinciActualState: 'NOT_RUN' as const,
    productionReady: false,
  },
  slots,
};

if (jsonMode) {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log(`Opening V1 crop QA preflight: media=${presentCount}/${slots.length} cover=${coverPresentCount}/${coverCount} assetHints=${assetHintCount} metadata=${report.metadataValid ? 'VALID' : 'INVALID'}`);
  for (const error of metadataErrors) console.log(`BLOCK / CROP_METADATA_INVALID:${error}`);
  for (const slot of slots) {
    console.log(`${slot.mediaPresent ? '✅' : '· '} ${slot.key} fit=${slot.effective.fit}(${slot.effective.fitSource}) focus=${slot.effective.focus ? `${slot.effective.focus.x}/${slot.effective.focus.y}` : 'center'}(${slot.effective.focusSource}) humanCropQa=NOT_RUN`);
  }
}

if (strict && metadataErrors.length > 0) process.exit(1);
