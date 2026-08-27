import {readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {profileV1GeneratedAccentImplementations} from '../src/data/profileV1GeneratedAccentRegistry.ts';
import {profileV1OptionalGeneratedSlots} from '../src/data/profileV1ProductionPlan.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const production = readFileSync(join(root, 'src/compositions/profile/ProfileV1.tsx'), 'utf8');
const accents = readFileSync(join(root, 'src/compositions/profile/ProfileV1GeneratedAccents.tsx'), 'utf8');
const preview = readFileSync(join(root, 'src/compositions/profile/ProfileV1GeneratedAccentsPreview.tsx'), 'utf8');
const rootFile = readFileSync(join(root, 'src/ProfileV1Root.tsx'), 'utf8');
const doorLight = readFileSync(join(root, 'src/compositions/opening/DoorLight.tsx'), 'utf8');
const errors: string[] = [];

const declared = profileV1OptionalGeneratedSlots.map((slot) => slot.id).sort();
const implemented = profileV1GeneratedAccentImplementations.map((item) => item.slotId).sort();
if (JSON.stringify(declared) !== JSON.stringify(implemented)) {
  errors.push(`optional generated role coverage drifted: declared=${declared.join(',')} implemented=${implemented.join(',')}`);
}
if (new Set(implemented).size !== implemented.length) errors.push('generated accent registry contains duplicate slotId');

for (const expected of [
  ['departure-boarding-title', 'PROFILE_BOARDING_TITLE_CARD', 'COMPOSITION_SPECIFIC_GRAPHIC'],
  ['intersection-route', 'MOTION_ZUKAN_ROUTE_LINE', 'TransitionWipeEngine/route-line'],
  ['arrival-door-light', 'OPENING_DOOR_LIGHT_REUSE', 'DoorLight'],
] as const) {
  const [slotId, implementation, canonicalReuse] = expected;
  const item = profileV1GeneratedAccentImplementations.find((candidate) => candidate.slotId === slotId);
  if (!item) errors.push(`generated accent missing: ${slotId}`);
  else {
    if (item.implementation !== implementation) errors.push(`${slotId} implementation drifted`);
    if (item.canonicalReuse !== canonicalReuse) errors.push(`${slotId} reuse path drifted`);
  }
}

for (const token of [
  "import {ProfileV1GeneratedAccents} from './ProfileV1GeneratedAccents'",
  '<ProfileV1GeneratedAccents',
  'chapterId={chapter.id}',
  'duration={chapterDuration}',
]) {
  if (!production.includes(token)) errors.push(`Profile V1 production composition does not consume generated accents: ${token}`);
}

for (const token of [
  "variant=\"route-line\"",
  "direction=\"right\"",
  "intensity=\"S\"",
  '<DoorLight',
  'durationInFramesOverride={accentDuration}',
  'BOARDING',
]) {
  if (!accents.includes(token)) errors.push(`generated accent implementation token missing: ${token}`);
}

for (const token of [
  'durationInFramesOverride: z.number().int().positive().optional()',
  'durationInFramesOverride ?? compositionDurationInFrames',
  'Math.max(openStartFrame + 1, durationInFrames - 30)',
]) {
  if (!doorLight.includes(token)) errors.push(`DoorLight composability contract missing: ${token}`);
}

for (const token of [
  'ProfileV1GeneratedAccentsPreview',
  'GENERATED ROLE VISUAL SMOKE / NOT PRODUCTION EVIDENCE',
  "chapterId={chapter.id}",
]) {
  if (!preview.includes(token)) errors.push(`generated accent preview contract missing: ${token}`);
}
for (const token of [
  'id="ProfileV1GeneratedAccentsPreview"',
  'durationInFrames={9 * video.fps}',
]) {
  if (!rootFile.includes(token)) errors.push(`Profile root generated accent preview registration missing: ${token}`);
}

for (const forbidden of ['productionReady: true', "macDaVinciActualState: 'PASS'", 'REAL_MEDIA_QA_PASS']) {
  if (accents.includes(forbidden) || preview.includes(forbidden)) errors.push(`generated accent path fabricates production evidence: ${forbidden}`);
}

if (errors.length) {
  console.error(`Profile V1 generated accent contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`Profile V1 generated accent contracts OK: all ${implemented.length} optional generated roles are implemented, canonical route/door-light reuse is explicit, and the visual smoke preview does not claim production evidence.`);
