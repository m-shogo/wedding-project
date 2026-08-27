import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {profileV1Chapters, profileV1OptionalGeneratedSlots} from '../src/data/profileV1ProductionPlan.ts';
import {profileV1RuntimeMedia} from '../src/data/profileV1RuntimeMedia.generated.ts';
import {profileV1GeneratedAccentImplementations} from '../src/data/profileV1GeneratedAccentRegistry.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const finalPath = join(root, 'out/profile/profile_v1.mp4');
const reviewPath = join(root, 'out/qa/profile-v1-final-render-review.json');
const realReviewPath = join(root, 'out/qa/profile-v1-real-media-review.json');
const structureReviewPath = join(root, 'out/qa/profile-v1-full-structure-review.json');
const bgmApprovalPath = join(root, 'out/qa/profile-v1-bgm-rights-approval.json');
const outDir = join(root, 'out/handoff/profile-v1');
const bundlePath = join(outDir, 'profile-v1-production-bundle.json');
const timelinePath = join(outDir, 'profile-v1-palmier-timeline.csv');
const bgmPath = join(root, 'public/audio/profile/bgm-main.mp3');
const sha = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
const shaText = (value: string) => createHash('sha256').update(value).digest('hex');
const rel = (path: string) => relative(root, path).replaceAll('\\', '/');
const run = (script: string, args: string[] = []) => spawnSync(process.execPath, ['--no-warnings', script, ...args], {cwd: root, encoding: 'utf8'});

const required = [finalPath, reviewPath, realReviewPath, structureReviewPath, bgmApprovalPath, bgmPath];
for (const path of required) if (!existsSync(path)) { console.error(`Profile production bundle blocked: missing ${rel(path)}`); process.exit(1); }
for (const [label, script, args] of [
  ['production preflight', 'scripts/profile-v1-production-preflight.mts', ['--strict']],
  ['render QA', 'scripts/check-profile-render.mts', ['out/profile/profile_v1.mp4']],
  ['final Human review', 'scripts/profile-v1-final-render-review.mts', ['--strict']],
] as const) {
  const result = run(script, [...args]);
  if (result.status !== 0) { console.error(`Profile production bundle blocked: ${label} not PASS`); console.error(result.stdout || result.stderr); process.exit(1); }
}

const finalReview = JSON.parse(readFileSync(reviewPath, 'utf8')) as {
  schemaVersion: string;
  authority: string;
  boundAt: string;
  finalRender: {path: string; sha256: string};
  renderSourceFingerprintSha256: string;
  review: {overall: string; reviewer: string | null; reviewedAt: string | null; notes: string};
};
if (finalReview.schemaVersion !== 'profile-v1-final-render-review/v1' || finalReview.authority !== 'HUMAN_FINAL_RENDER_REVIEW') throw new Error('PROFILE_BUNDLE_FINAL_REVIEW_CONTRACT');
if (finalReview.review.overall !== 'PASS' || !finalReview.review.reviewer?.trim()) throw new Error('PROFILE_BUNDLE_FINAL_REVIEW_NOT_PASS');

const media = profileV1RuntimeMedia.slots.map((slot) => {
  if (!slot.resolved || !slot.staticFilePath || !slot.extension) throw new Error(`PROFILE_BUNDLE_MEDIA_UNRESOLVED:${slot.id}`);
  const absolute = join(root, 'public', slot.staticFilePath);
  if (!existsSync(absolute)) throw new Error(`PROFILE_BUNDLE_MEDIA_MISSING:${slot.id}`);
  return {slot: slot.id, chapterId: slot.chapterId, label: slot.label, file: rel(absolute), extension: slot.extension, sha256: sha(absolute)};
});

const generatedAccents = profileV1GeneratedAccentImplementations.map((accent) => {
  const slot = profileV1OptionalGeneratedSlots.find((candidate) => candidate.id === accent.slotId);
  if (!slot || slot.chapterId !== accent.chapterId) throw new Error(`PROFILE_BUNDLE_ACCENT_SLOT_MISMATCH:${accent.slotId}`);
  return {
    slotId: accent.slotId,
    chapterId: accent.chapterId,
    label: slot.label,
    note: slot.note,
    implementation: accent.implementation,
    canonicalReuse: accent.canonicalReuse,
  };
});

const timeline = profileV1Chapters.map((chapter, index) => ({
  order: chapter.order,
  chapterId: chapter.id,
  title: chapter.title,
  role: chapter.role,
  editIntent: [...chapter.editIntent],
  generatedAccents: generatedAccents.filter((accent) => accent.chapterId === chapter.id),
  startSec: index * 6,
  endSec: (index + 1) * 6,
  durationSec: 6,
}));
const finalSha = sha(finalPath);
if (finalReview.finalRender.path !== rel(finalPath) || finalReview.finalRender.sha256 !== finalSha) throw new Error('PROFILE_BUNDLE_FINAL_REVIEW_RENDER_BINDING_STALE');
const esc = (v: unknown) => /[",\n]/.test(String(v)) ? `"${String(v).replaceAll('"', '""')}"` : String(v);
const rows = [
  ['order','chapter_id','title','start_sec','end_sec','duration_sec','role','edit_intent','generated_accent_routes','final_render_sha256'],
  ...timeline.map((c) => [
    c.order,
    c.chapterId,
    c.title,
    c.startSec,
    c.endSec,
    c.durationSec,
    c.role,
    c.editIntent.join(' / '),
    c.generatedAccents.map((accent) => `${accent.slotId}:${accent.implementation}:${accent.canonicalReuse}`).join(' / '),
    finalSha,
  ]),
];
const timelineCsv = `${rows.map((row) => row.map(esc).join(',')).join('\n')}\n`;
const timelineSha = shaText(timelineCsv);
const bundle = {
  schemaVersion: 'profile-v1-production-bundle/v1', authority: 'FINAL_RENDER_BOUND_HANDOFF', generatedAt: new Date().toISOString(),
  composition: {id: 'ProfileV1', width: 1920, height: 1080, fps: 30, durationSeconds: 30},
  finalRender: {path: rel(finalPath), sha256: finalSha, qaContract: 'check-profile-render.mts=PASS_AT_EXPORT'},
  humanFinalRenderReview: {
    evidencePath: rel(reviewPath),
    evidenceSha256: sha(reviewPath),
    boundAt: finalReview.boundAt,
    finalRenderPath: finalReview.finalRender.path,
    finalRenderSha256: finalReview.finalRender.sha256,
    renderSourceFingerprintSha256: finalReview.renderSourceFingerprintSha256,
    reviewer: finalReview.review.reviewer,
    reviewedAt: finalReview.review.reviewedAt,
    overall: finalReview.review.overall,
    notes: finalReview.review.notes,
  },
  upstreamHumanEvidence: {realMediaReviewSha256: sha(realReviewPath), structureReviewSha256: sha(structureReviewPath), bgmRightsApprovalSha256: sha(bgmApprovalPath)},
  bgm: {path: rel(bgmPath), sha256: sha(bgmPath)}, media, timeline, generatedAccents,
  palmier: {
    handoffMode: 'REFERENCE_TIMELINE_AND_FINAL_RENDER',
    timelineCsv: rel(timelinePath),
    timelineCsvSha256: timelineSha,
    generatedAccentAuthority: 'PROFILE_V1_GENERATED_ACCENT_REGISTRY',
    instruction: '5章30秒のchapter boundary・edit intent・generated accent route・final render SHAを正本として扱い、変更が必要ならMotion Studio正本へ戻す。',
  },
  davinci: {
    handoffAsset: rel(finalPath),
    expectedSha256: finalSha,
    intendedUse: 'FINISHING_AND_OUTPUT_QA',
    generatedAccentRoutes: generatedAccents.map(({slotId, chapterId, label, note, implementation, canonicalReuse}) => ({slotId, chapterId, label, note, implementation, canonicalReuse})),
    macActualState: 'NOT_RUN',
    productionReady: false,
  },
  guardrails: [
    'FINAL_RENDER_REVIEW_PASS != DAVINCI_ACTUAL_VERIFIED',
    'FINAL_RENDER_OR_RENDER_SOURCE_CHANGED => RE_RENDER_AND_RE_REVIEW',
    'GENERATED_ACCENT_ROUTE_EXPORTED != MAC_DAVINCI_ACTUAL_VERIFIED',
    'PALMIER_TIMELINE_SHA_MISMATCH => STOP_AND_REGENERATE_HANDOFF',
    'BUNDLE_EXPORTED != PRODUCTION_READY',
    'RENDER_SHA_MISMATCH => STOP_AND_REGENERATE_HANDOFF',
  ],
};
mkdirSync(outDir, {recursive: true});
writeFileSync(timelinePath, timelineCsv);
writeFileSync(bundlePath, `${JSON.stringify(bundle, null, 2)}\n`);
console.log(`Profile V1 production bundle exported: ${rel(bundlePath)}`);
console.log(`Palmier timeline exported: ${rel(timelinePath)}`);
console.log(`palmierTimelineSha256=${timelineSha}`);
console.log(`generatedAccentRoutes=${generatedAccents.length}`);
console.log(`finalRenderReviewEvidenceSha256=${sha(reviewPath)}`);
console.log(`finalRenderSha256=${finalSha}`);
console.log('DaVinci Mac Actual remains NOT_RUN; productionReady=false.');
