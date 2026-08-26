import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = path.resolve(root, '..');
const registry = fs.readFileSync(path.join(root, 'src/data/remotionElementCandidates.ts'), 'utf8');
const motionLibrary = fs.readFileSync(path.join(root, 'src/data/visualMotionLibrary.ts'), 'utf8');
const motionLibraryPage = fs.readFileSync(path.join(root, 'src/pages/VisualMotionLibrary.tsx'), 'utf8');
const readinessPanel = fs.readFileSync(path.join(root, 'src/components/RemotionElementReadinessPanel.tsx'), 'utf8');
const workflow = fs.readFileSync(path.join(repoRoot, '.github/workflows/remotion-mask-reveal-element-ci.yml'), 'utf8');
const errors = [];

const expected = [
  ['type-mask-reveal', 'mask', 'mask-reveal', 'WeddingMaskRevealElementCanary'],
  ['type-char-stagger', 'stagger', 'char-stagger', 'WeddingCharStaggerElementCanary'],
  ['type-type-on-rhythm', 'word-stagger', 'type-on-rhythm', 'WeddingTypeOnRhythmElementCanary'],
  ['type-word-punch', 'punch', 'word-punch', 'WeddingWordPunchElementCanary'],
  ['type-tracking-burst', 'tracking', 'tracking-burst', 'WeddingTrackingBurstElementCanary'],
  ['type-vertical-wipe', 'vertical-wipe', 'vertical-wipe', 'WeddingVerticalWipeElementCanary'],
].map(([id, mode, slug, canary]) => ({
  id, mode, slug, canary,
  builder: `build-${slug}-element-payload.mts`,
  checker: `check-${slug}-element-payload.mts`,
}));

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
  for (const relative of [`motion-studio/scripts/${item.builder}`, `motion-studio/scripts/${item.checker}`]) {
    if (!fs.existsSync(path.join(repoRoot, relative))) errors.push(`${item.id} referenced file missing: ${relative}`);
  }
  if (!workflow.includes(item.slug)) errors.push(`${item.id} CI slug loop missing: ${item.slug}`);
  if (!workflow.includes(item.canary)) errors.push(`${item.id} CI canary missing: ${item.canary}`);
}

for (const token of [
  'motion-studio/scripts/build-*-element-payload.mts',
  'motion-studio/scripts/check-*-element-payload.mts',
  'for slug in mask-reveal char-stagger type-on-rhythm word-punch tracking-burst vertical-wipe',
]) {
  if (!workflow.includes(token)) errors.push(`Typography CI scaling contract missing: ${token}`);
}
for (const token of [
  'getRemotionElementCandidate',
  'const remotionElement = getRemotionElementCandidate(pattern.id)',
  '<RemotionElementReadinessPanel candidate={remotionElement} />',
]) {
  if (!motionLibraryPage.includes(token)) errors.push(`Motion Zukan page missing Element readiness integration: ${token}`);
}
for (const token of [
  'ELEMENT_CANDIDATE: \"Element候補 / CI検証済み\"',
  'STUDIO_ACTUAL_VERIFIED: \"Studio Actual検証済み\"',
  'Studio Install Actual', 'Control Readback Actual', 'Mac Studioの確認ダイアログ',
]) {
  if (!readinessPanel.includes(token)) errors.push(`Element readiness panel missing honesty surface: ${token}`);
}
if (registry.includes('studioInstallActual: \"PASS\"') || registry.includes('studioControlReadbackActual: \"PASS\"')) errors.push('Registry must not claim Studio Actual PASS before Mac GUI evidence exists');
if (registry.includes('readiness: \"STUDIO_ACTUAL_VERIFIED\"')) errors.push('No Element may be STUDIO_ACTUAL_VERIFIED before the Mac Actual is performed');

for (const relative of ['motion-studio/scripts/prepare-typography-elements-studio-actual-batch.mts','motion-studio/scripts/check-typography-elements-studio-actual-batch.mts']) {
  if (!fs.existsSync(path.join(repoRoot, relative))) errors.push(`Studio Actual batch file missing: ${relative}`);
  if (!workflow.includes(path.basename(relative))) errors.push(`Studio Actual batch file missing from CI: ${relative}`);
}
if (!workflow.includes("echo 'typographyElementCount=6'")) errors.push('CI must assert six Typography Element candidates');
if (!workflow.includes("echo 'studioActualBatchPrepared=PASS_PREP_ONLY'")) errors.push('CI must distinguish Actual batch prep from Actual execution');
if (!workflow.includes("echo 'studioInstallActual=NOT_RUN'")) errors.push('CI must keep Studio install Actual NOT_RUN');

if (errors.length) {
  console.error(`Remotion Element candidate contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log('Remotion Element candidate contracts OK: 6 Motion Zukan cards surface CI-rendered Element readiness, batch prep is gated, and Studio Actual remains NOT_RUN.');
