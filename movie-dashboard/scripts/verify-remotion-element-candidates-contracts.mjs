import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = path.resolve(root, '..');
const registry = fs.readFileSync(path.join(root, 'src/data/remotionElementCandidates.ts'), 'utf8');
const motionLibrary = fs.readFileSync(path.join(root, 'src/data/visualMotionLibrary.ts'), 'utf8');
const workflow = fs.readFileSync(path.join(repoRoot, '.github/workflows/remotion-mask-reveal-element-ci.yml'), 'utf8');
const errors = [];

const expected = [
  {
    id: 'type-mask-reveal',
    mode: 'mask',
    builder: 'build-mask-reveal-element-payload.mts',
    checker: 'check-mask-reveal-element-payload.mts',
    canary: 'WeddingMaskRevealElementCanary',
  },
  {
    id: 'type-char-stagger',
    mode: 'stagger',
    builder: 'build-char-stagger-element-payload.mts',
    checker: 'check-char-stagger-element-payload.mts',
    canary: 'WeddingCharStaggerElementCanary',
  },
  {
    id: 'type-type-on-rhythm',
    mode: 'word-stagger',
    builder: 'build-type-on-rhythm-element-payload.mts',
    checker: 'check-type-on-rhythm-element-payload.mts',
    canary: 'WeddingTypeOnRhythmElementCanary',
  },
];

for (const item of expected) {
  if (!motionLibrary.includes(`\"${item.id}\"`)) errors.push(`${item.id} missing from Motion Zukan catalog`);
  for (const token of [
    `patternId: \"${item.id}\"`,
    'readiness: \"ELEMENT_CANDIDATE\"',
    `canonicalMode: \"${item.mode}\"`,
    `builderScript: \"motion-studio/scripts/${item.builder}\"`,
    `checkerScript: \"motion-studio/scripts/${item.checker}\"`,
    'studioInstallActual: \"NOT_RUN\"',
    'studioControlReadbackActual: \"NOT_RUN\"',
    'productionDependencyPromoted: false',
  ]) {
    if (!registry.includes(token)) errors.push(`${item.id} registry missing: ${token}`);
  }
  for (const token of [item.builder, item.checker, item.canary]) {
    if (!workflow.includes(token)) errors.push(`${item.id} CI missing: ${token}`);
  }
  for (const relative of [`motion-studio/scripts/${item.builder}`, `motion-studio/scripts/${item.checker}`]) {
    if (!fs.existsSync(path.join(repoRoot, relative))) errors.push(`${item.id} referenced file missing: ${relative}`);
  }
}

if (registry.includes('studioInstallActual: \"PASS\"') || registry.includes('studioControlReadbackActual: \"PASS\"')) {
  errors.push('Registry must not claim Studio Actual PASS before Mac GUI evidence exists');
}
if (registry.includes('readiness: \"STUDIO_ACTUAL_VERIFIED\"')) {
  errors.push('No Element may be STUDIO_ACTUAL_VERIFIED before the Mac Actual is performed');
}
if (!workflow.includes("echo 'typographyElementCount=3'")) errors.push('CI must assert three Typography Element candidates');

if (errors.length) {
  console.error(`Remotion Element candidate contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Remotion Element candidate contracts OK: 3 Motion Zukan records are CI-rendered candidates and Studio Actual remains NOT_RUN.');
