import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {profileV1Chapters} from '../src/data/profileV1ProductionPlan.ts';
import {profileV1RuntimeMedia} from '../src/data/profileV1RuntimeMedia.generated.ts';

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
const rel = (path: string) => relative(root, path).replaceAll('\\', '/');
const run = (script: string, args: string[] = []) => spawnSync(process.execPath, ['--no-warnings', script, ...args], {cwd: root, encoding: 'utf8'});

const required = [finalPath, reviewPath, realReviewPath, structureReviewPath, bgmApprovalPath, bgmPath];
for (const path of required) if (!existsSync(path)) { console.error(`Profile production bundle blocked: missing ${rel(path)}`); process.exit(1); }
for (const [label, script, args] of [
  ['assembly', 'scripts/profile-v1-assembly-preflight.mts', ['--strict']],
  ['render QA', 'scripts/check-profile-render.mts', ['out/profile/profile_v1.mp4']],
  ['final Human review', 'scripts/profile-v1-final-render-review.mts', ['--strict']],
] as const) {
  const result = run(script, [...args]);
  if (result.status !== 0) { console.error(`Profile production bundle blocked: ${label} not PASS`); console.error(result.stdout || result.stderr); process.exit(1); }
}

const media = profileV1RuntimeMedia.slots.map((slot) => {
  if (!slot.resolved || !slot.staticFilePath || !slot.extension) throw new Error(`PROFILE_BUNDLE_MEDIA_UNRESOLVED:${slot.id}`);
  const absolute = join(root, 'public', slot.staticFilePath);
  if (!existsSync(absolute)) throw new Error(`PROFILE_BUNDLE_MEDIA_MISSING:${slot.id}`);
  return {slot: slot.id, chapterId: slot.chapterId, label: slot.label, file: rel(absolute), extension: slot.extension, sha256: sha(absolute)};
});

const timeline = profileV1Chapters.map((chapter, index) => ({
  order: chapter.order, chapterId: chapter.id, title: chapter.title, role: chapter.role, editIntent: [...chapter.editIntent], startSec: index * 6, endSec: (index + 1) * 6, durationSec: 6,
}));
const finalSha = sha(finalPath);
const bundle = {
  schemaVersion: 'profile-v1-production-bundle/v1', authority: 'FINAL_RENDER_BOUND_HANDOFF', generatedAt: new Date().toISOString(),
  composition: {id: 'ProfileV1', width: 1920, height: 1080, fps: 30, durationSeconds: 30},
  finalRender: {path: rel(finalPath), sha256: finalSha, qaContract: 'check-profile-render.mts=PASS_AT_EXPORT'},
  humanFinalRenderReview: {evidencePath: rel(reviewPath), evidenceSha256: sha(reviewPath)},
  upstreamHumanEvidence: {realMediaReviewSha256: sha(realReviewPath), structureReviewSha256: sha(structureReviewPath), bgmRightsApprovalSha256: sha(bgmApprovalPath)},
  bgm: {path: rel(bgmPath), sha256: sha(bgmPath)}, media, timeline,
  palmier: {handoffMode: 'REFERENCE_TIMELINE_AND_FINAL_RENDER', timelineCsv: rel(timelinePath), instruction: '5章30秒のchapter boundary・edit intent・final render SHAを正本として扱い、変更が必要ならMotion Studio正本へ戻す。'},
  davinci: {handoffAsset: rel(finalPath), expectedSha256: finalSha, intendedUse: 'FINISHING_AND_OUTPUT_QA', macActualState: 'NOT_RUN', productionReady: false},
  guardrails: ['FINAL_RENDER_REVIEW_PASS != DAVINCI_ACTUAL_VERIFIED', 'BUNDLE_EXPORTED != PRODUCTION_READY', 'RENDER_SHA_MISMATCH => STOP_AND_REGENERATE_HANDOFF'],
};
const esc = (v: unknown) => /[",\n]/.test(String(v)) ? `"${String(v).replaceAll('"', '""')}"` : String(v);
const rows = [['order','chapter_id','title','start_sec','end_sec','duration_sec','role','edit_intent','final_render_sha256'], ...timeline.map((c) => [c.order,c.chapterId,c.title,c.startSec,c.endSec,c.durationSec,c.role,c.editIntent.join(' / '),finalSha])];
mkdirSync(outDir, {recursive: true});
writeFileSync(bundlePath, `${JSON.stringify(bundle, null, 2)}\n`);
writeFileSync(timelinePath, `${rows.map((row) => row.map(esc).join(',')).join('\n')}\n`);
console.log(`Profile V1 production bundle exported: ${rel(bundlePath)}`);
console.log(`Palmier timeline exported: ${rel(timelinePath)}`);
console.log(`finalRenderSha256=${finalSha}`);
console.log('DaVinci Mac Actual remains NOT_RUN; productionReady=false.');
