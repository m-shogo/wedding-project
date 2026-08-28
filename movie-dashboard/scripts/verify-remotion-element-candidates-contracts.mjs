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
const evidenceScript = fs.readFileSync(path.join(repoRoot, 'motion-studio/scripts/typography-elements-studio-actual-evidence.mts'), 'utf8');
const errors = [];

const expected = [
  ['type-mask-reveal', 'mask', 'mask-reveal', 'WeddingMaskRevealElementCanary'],
  ['type-char-stagger', 'stagger', 'char-stagger', 'WeddingCharStaggerElementCanary'],
  ['type-type-on-rhythm', 'word-stagger', 'type-on-rhythm', 'WeddingTypeOnRhythmElementCanary'],
  ['type-word-punch', 'punch', 'word-punch', 'WeddingWordPunchElementCanary'],
  ['type-tracking-burst', 'tracking', 'tracking-burst', 'WeddingTrackingBurstElementCanary'],
  ['type-vertical-wipe', 'vertical-wipe', 'vertical-wipe', 'WeddingVerticalWipeElementCanary'],
  ['type-outline-fill', 'outline', 'outline-fill', 'WeddingOutlineFillElementCanary'],
  ['type-baseline-hop', 'hop', 'baseline-hop', 'WeddingBaselineHopElementCanary'],
  ['type-triplet', 'triplet', 'triplet', 'WeddingTypographyTripletElementCanary'],
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
  'for slug in mask-reveal char-stagger type-on-rhythm word-punch tracking-burst vertical-wipe outline-fill baseline-hop triplet',
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
  'remotionElementStudioActualBatch',
  'batch.candidateIds.includes(candidate.patternId)',
  'STUDIO ACTUAL BATCH HANDOFF',
  'Studio {batch.studioVersionTarget}',
  'artifact: {batch.artifactRoot}',
  '{batch.prepareCommand}',
  '{batch.checkCommand}',
  '{evidence.initCommand}',
  '{evidence.statusCommand}',
  '{evidence.strictCommand}',
  'CURRENT REPO ACTUAL',
  'MACHINE SUMMARY CONTRACT',
  'Machine summary: {evidence.summaryPath}',
  'summary authority: {evidence.summaryAuthority}',
  'Object.entries(batch.actual)',
  'confirmation / install / control readback / timeline insertion / post-install renderはすべてNOT_RUN',
  'SUMMARY_EXPORTED != STUDIO_ACTUAL_VERIFIED',
]) {
  if (!readinessPanel.includes(token)) errors.push(`Element readiness panel missing honesty/batch/summary surface: ${token}`);
}
if (registry.includes('studioInstallActual: \"PASS\"') || registry.includes('studioControlReadbackActual: \"PASS\"')) errors.push('Registry must not claim Studio Actual PASS before Mac GUI evidence exists');
if (registry.includes('readiness: \"STUDIO_ACTUAL_VERIFIED\"')) errors.push('No Element may be STUDIO_ACTUAL_VERIFIED before the Mac Actual is performed');

for (const relative of ['motion-studio/scripts/prepare-typography-elements-studio-actual-batch.mts','motion-studio/scripts/check-typography-elements-studio-actual-batch.mts','motion-studio/scripts/typography-elements-studio-actual-evidence.mts']) {
  if (!fs.existsSync(path.join(repoRoot, relative))) errors.push(`Studio Actual batch/evidence file missing: ${relative}`);
  if (!workflow.includes(path.basename(relative))) errors.push(`Studio Actual batch/evidence file missing from CI: ${relative}`);
}
if (!workflow.includes("echo 'typographyElementCount=9'")) errors.push('CI must assert nine Typography Element candidates');
if (!workflow.includes("echo 'studioActualBatchPrepared=PASS_PREP_ONLY'")) errors.push('CI must distinguish Actual batch prep from Actual execution');
if (!workflow.includes("echo 'studioInstallActual=NOT_RUN'")) errors.push('CI must keep Studio install Actual NOT_RUN');

for (const token of [
  'remotionElementStudioActualBatch',
  'schemaVersion: \"remotion-element-studio-actual-batch/v1\"',
  'authority: \"MOTION_ZUKAN_REMOTION_STUDIO_ACTUAL_BATCH_HANDOFF\"',
  'studioVersionTarget: \"4.0.517\"',
  'artifactRoot: \"movie-dashboard/out/remotion-element-actual-batch\"',
  'scripts/prepare-typography-elements-studio-actual-batch.mts',
  'scripts/check-typography-elements-studio-actual-batch.mts',
  'summaryPath: \"movie-dashboard/out/remotion-element-actual-batch/studio-actual-summary.json\"',
  'summarySchemaVersion: \"remotion-element-studio-actual-summary/v1\"',
  'summaryAuthority: \"MAC_REMOTION_STUDIO_ACTUAL_STATUS_SUMMARY\"',
  'checkAxesPerCandidate: 11',
  'candidateCount: 9',
  'currentRepoState: \"NOT_RUN\" as StudioActualState',
  'humanReviewed: false',
  'candidateIds: remotionElementCandidates.map((candidate) => candidate.patternId)',
  'requestTransport: \"NOT_RUN\"',
  'confirmationDialog: \"NOT_RUN\"',
  'studioInstall: \"NOT_RUN\"',
  'controlReadback: \"NOT_RUN\"',
  'timelineInsertion: \"NOT_RUN\"',
  'postInstallRender: \"NOT_RUN\"',
  'SUMMARY_EXPORTED != STUDIO_ACTUAL_VERIFIED',
  'STUDIO_ACTUAL_BATCH_HANDOFF_EXPORTED != STUDIO_ACTUAL_VERIFIED',
  'STUDIO_ACTUAL_VERIFIED != PRODUCTION_DEPENDENCY_PROMOTED',
]) {
  if (!registry.includes(token)) errors.push(`Studio Actual batch/summary handoff contract missing: ${token}`);
}

for (const token of [
  "schemaVersion: 'remotion-element-studio-actual-summary/v1'",
  "authority: 'MAC_REMOTION_STUDIO_ACTUAL_STATUS_SUMMARY'",
  "const summaryPath = join(batchRoot, 'studio-actual-summary.json')",
  'manifestCurrent: boolean',
  'humanReviewed: boolean',
  'blockerCodes: string[]',
  'completedCandidates: number',
  "guardrails: ['SUMMARY_EXPORTED != STUDIO_ACTUAL_VERIFIED', 'STUDIO_ACTUAL_VERIFIED != PRODUCTION_DEPENDENCY_PROMOTED']",
  'writeSummary({manifestSha, manifestCurrent, evidence, evidenceValid: true, blockerCodes: errors})',
]) {
  if (!evidenceScript.includes(token)) errors.push(`Studio Actual machine summary script missing: ${token}`);
}

const expectedIdIndexes = expected.map((item) => registry.indexOf(`patternId: \"${item.id}\"`));
if (expectedIdIndexes.some((index) => index < 0)) errors.push('Studio Actual batch candidate source is incomplete');
if (expectedIdIndexes.length !== 9) errors.push('Studio Actual batch must stay aligned to nine registry candidates');

if (errors.length) {
  console.error(`Remotion Element candidate contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log('Remotion Element candidate contracts OK: 9 Motion Zukan cards surface CI-rendered Element readiness, bounded Studio Actual handoff, machine-readable status summary metadata, and GUI Actual remains NOT_RUN.');
