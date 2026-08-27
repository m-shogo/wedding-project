import {readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {
  profileV1Chapters,
  profileV1OptionalGeneratedSlots,
  profileV1ProductionContract,
  profileV1RequiredMediaSlots,
} from '../src/data/profileV1ProductionPlan.ts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = join(studioRoot, '..');
const chapterPlan = readFileSync(join(repoRoot, '01_profile-movie/chapter-plan.md'), 'utf8');
const preflight = readFileSync(join(studioRoot, 'scripts/profile-v1-assembly-preflight.mts'), 'utf8');
const rightsApproval = readFileSync(join(studioRoot, 'scripts/profile-v1-bgm-rights-approval.mts'), 'utf8');
const errors: string[] = [];
const fail = (message: string) => errors.push(message);

if (profileV1ProductionContract.schemaVersion !== 'profile-v1-production-plan/v1') fail('unexpected Profile V1 plan schema');
if (profileV1ProductionContract.sourceAuthority !== '01_profile-movie/chapter-plan.md') fail('Profile V1 source authority drifted');
if (profileV1Chapters.length !== 5) fail(`expected 5 chapters, got ${profileV1Chapters.length}`);
if (profileV1ProductionContract.chapterCount !== 5) fail('production contract chapterCount drifted');
if (profileV1ProductionContract.productionReady !== false) fail('Profile V1 plan must never predeclare production readiness');
if (profileV1ProductionContract.humanQaState !== 'NOT_RUN') fail('Profile V1 Human QA must start NOT_RUN');
if (profileV1ProductionContract.macDaVinciActualState !== 'NOT_RUN') fail('Profile V1 Mac DaVinci Actual must start NOT_RUN');

const expectedChapters = [
  ['departure', 'Chapter 1 出発'],
  ['separate-journeys', 'Chapter 2 それぞれの旅'],
  ['intersection', 'Chapter 3 交差'],
  ['adventure', 'Chapter 4 冒険'],
  ['arrival', 'Chapter 5 到着'],
] as const;
for (const [id, heading] of expectedChapters) {
  if (!profileV1Chapters.some((chapter) => chapter.id === id)) fail(`missing canonical chapter: ${id}`);
  if (!chapterPlan.includes(heading)) fail(`source chapter plan missing: ${heading}`);
}

for (const token of ['空港', '幼少期', '二人の写真', 'ハワイ', '犬', '入籍', '横浜']) {
  if (!chapterPlan.includes(token)) fail(`source chapter requirement missing: ${token}`);
}

if (profileV1RequiredMediaSlots.length !== 17) fail(`expected 17 minimum representative real-media slots, got ${profileV1RequiredMediaSlots.length}`);
if (profileV1OptionalGeneratedSlots.length !== 3) fail(`expected 3 optional generated graphic roles, got ${profileV1OptionalGeneratedSlots.length}`);

const duplicateStem = profileV1RequiredMediaSlots.find(
  (slot, index, all) => all.findIndex((candidate) => candidate.canonicalStem === slot.canonicalStem) !== index,
);
if (duplicateStem) fail(`duplicate canonical media stem: ${duplicateStem.canonicalStem}`);

const dogSlot = profileV1RequiredMediaSlots.find((slot) => slot.id === 'adventure-dog');
if (!dogSlot?.note.includes('AI置換しない')) fail('real dog asset boundary must remain explicit');

for (const token of [
  "schemaVersion: 'profile-v1-assembly-preflight/v1'",
  "authority: 'MOTION_STUDIO_DERIVED_PREFLIGHT'",
  'profile-v1-bgm-rights-approval.mts',
  "schemaVersion: 'profile-v1-bgm-rights-status/v1'",
  'rightsStatus.rightsCleared',
  'profile-v1-real-media-review.mts',
  "schemaVersion: 'profile-v1-real-media-review-status/v1'",
  "authority: 'DERIVED_REAL_MEDIA_REVIEW_STATUS'",
  "previewQaState: realMediaReview.state",
  "humanContentQaState: realMediaReview.state",
  'realMediaReview.humanReviewComplete',
  'assemblyReady',
  "macDaVinciActualState: 'NOT_RUN'",
  'productionReady: false',
  'strict && !assemblyReady',
]) {
  if (!preflight.includes(token)) fail(`Profile V1 preflight honesty token missing: ${token}`);
}

for (const token of [
  "schemaVersion: 'profile-v1-bgm-rights-approval/v1'",
  "authority: 'HUMAN_BGM_RIGHTS_APPROVAL'",
  "usageScope: 'WEDDING_SCREENING'",
  "decision: 'HOLD'",
  'rightsCleared: false',
  'shaFile(bgmPath)',
  'STALE_PROFILE_BGM_RIGHTS_APPROVAL_SHA',
  'PROFILE_BGM_RIGHTS_APPROVER_MISSING',
  'PROFILE_BGM_RIGHTS_EVIDENCE_NOTE_MISSING',
  'PROFILE_BGM_RIGHTS_CLEARED_MUST_MATCH_DECISION',
]) {
  if (!rightsApproval.includes(token)) fail(`Profile V1 BGM rights approval contract missing: ${token}`);
}

for (const forbidden of ['productionReady: true', "macDaVinciActualState: 'PASS'"]) {
  if (preflight.includes(forbidden)) fail(`Profile V1 preflight fabricates readiness: ${forbidden}`);
}
if (rightsApproval.includes("decision: 'APPROVE',")) fail('BGM rights approval must never initialize pre-approved');
if (rightsApproval.includes('rightsCleared: true,')) fail('BGM rights approval must never hardcode rights cleared');

if (errors.length > 0) {
  console.error(`Profile V1 production plan contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Profile V1 production plan contracts OK: 5 canonical chapters, ${profileV1RequiredMediaSlots.length} minimum real-media roles, BGM rights and SHA-bound Human real-media QA are both required before assembly readiness; Mac Actual remains separate.`);
