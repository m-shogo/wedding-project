import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {profileV1Chapters, profileV1ProductionContract} from '../src/data/profileV1ProductionPlan.ts';
import {profileV1RuntimeMedia} from '../src/data/profileV1RuntimeMedia.generated.ts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const reviewEvidencePath = join(studioRoot, 'out/qa/profile-v1-real-media-review.json');
const outDir = join(studioRoot, 'out/handoff/profile-v1');
const bundlePath = join(outDir, 'profile-v1-davinci-assembly-bundle.json');
const csvPath = join(outDir, 'profile-v1-palmier-assembly.csv');
const shaFile = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
const rel = (path: string) => relative(studioRoot, path).replaceAll('\\', '/');
const run = (args: string[]) => spawnSync(process.execPath, ['--no-warnings', ...args], {cwd: studioRoot, encoding: 'utf8'});

const preflight = run(['scripts/profile-v1-assembly-preflight.mts', '--json']);
if (preflight.status !== 0) throw new Error(`PROFILE_PREFLIGHT_FAILED:${preflight.stderr || preflight.stdout}`);
const report = JSON.parse(preflight.stdout);
if (report.readiness?.assemblyReady !== true) {
  console.error('Profile V1 DaVinci assembly bundle blocked: assemblyReady=false.');
  for (const blocker of report.readiness?.blockers ?? []) console.error(`BLOCK / ${blocker}`);
  process.exit(1);
}

const review = run(['scripts/profile-v1-real-media-review.mts', '--strict']);
if (review.status !== 0 || !existsSync(reviewEvidencePath)) {
  console.error('Profile V1 DaVinci assembly bundle blocked: current Human real-media review evidence is not valid.');
  process.exit(1);
}

const evidence = JSON.parse(readFileSync(reviewEvidencePath, 'utf8')) as {
  review: {overall: string; reviewer: string | null; reviewedAt: string | null; notes: string};
  media: Array<{slot: string; chapterId: string; label: string; file: string; extension: string; sha256: string}>;
};
const mediaBySlot = new Map(evidence.media.map((item) => [item.slot, item]));

const chapters = profileV1Chapters.map((chapter) => ({
  chapterId: chapter.id,
  order: chapter.order,
  title: chapter.title,
  role: chapter.role,
  editIntent: [...chapter.editIntent],
  timing: {
    state: 'HUMAN_EDIT_DECISION_REQUIRED' as const,
    startSeconds: null,
    endSeconds: null,
    durationSeconds: null,
    rule: '30秒Real-Media PreviewはQA inputでありfinal尺ではない。Palmier/DaVinciで章尺を決定後、正式timeline authorityへ昇格する。',
  },
  media: chapter.mediaSlots.filter((slot) => slot.required).map((slot) => {
    const item = mediaBySlot.get(slot.id);
    if (!item) throw new Error(`PROFILE_REVIEW_MEDIA_MISSING:${slot.id}`);
    return {
      slotId: slot.id,
      label: slot.label,
      kind: slot.kind,
      canonicalStem: slot.canonicalStem,
      file: item.file,
      extension: item.extension,
      sha256: item.sha256,
      note: slot.note,
    };
  }),
}));

const bundle = {
  schemaVersion: 'profile-v1-davinci-assembly-bundle/v1',
  authority: 'HUMAN_QA_BOUND_ASSEMBLY_HANDOFF',
  generatedAt: new Date().toISOString(),
  sourceAuthority: profileV1ProductionContract.sourceAuthority,
  finalTimeline: {
    state: 'NOT_DEFINED' as const,
    durationSeconds: null,
    reason: 'Canonical Profile chapter plan does not define a final movie duration. Do not promote the 30-second review preview into a final timeline.',
  },
  canonical: {
    chapterCount: profileV1Chapters.length,
    productionPlanSha256: shaFile(join(studioRoot, 'src/data/profileV1ProductionPlan.ts')),
    runtimeManifestSha256: shaFile(join(studioRoot, 'src/data/profileV1RuntimeMedia.generated.ts')),
  },
  humanReview: {
    evidencePath: rel(reviewEvidencePath),
    evidenceSha256: shaFile(reviewEvidencePath),
    overall: evidence.review.overall,
    reviewer: evidence.review.reviewer,
    reviewedAt: evidence.review.reviewedAt,
    notes: evidence.review.notes,
  },
  bgm: {
    assetId: report.audio.assetId,
    path: report.audio.path,
    rightsState: report.audio.rightsState,
    rightsBoundSha256: report.audio.rightsBoundSha256,
    ready: report.audio.ready,
  },
  chapters,
  palmier: {
    handoffMode: 'CHAPTER_INTENT_AND_MEDIA_REFERENCE',
    csv: rel(csvPath),
    timingAuthority: 'HUMAN_EDIT_DECISION_REQUIRED',
    instruction: '章順・role・editIntent・素材SHAを維持して編集する。30秒QA previewの章尺をfinalへコピーしない。',
  },
  davinci: {
    intendedUse: 'NATIVE_PROFILE_TIMELINE_ASSEMBLY',
    timelineCreationState: 'NOT_RUN',
    chapterTimingDecisionState: 'NOT_RUN',
    mediaInsertionState: 'NOT_RUN',
    typographyRebuildState: 'NOT_RUN',
    audioAssemblyState: 'NOT_RUN',
    colorFinishState: 'NOT_RUN',
    exportValidationState: 'NOT_RUN',
    macActualState: 'NOT_RUN',
    productionReady: false,
  },
  guardrails: [
    '30S_REAL_MEDIA_PREVIEW != FINAL_PROFILE_DURATION',
    'ASSEMBLY_BUNDLE_EXPORTED != DAVINCI_ACTUAL_VERIFIED',
    'HUMAN_MEDIA_QA_PASS != FINAL_DELIVERY_APPROVED',
    'CHAPTER_TIMING_NOT_DEFINED => DO_NOT_INVENT_FINAL_RUNTIME',
  ],
  nextActions: [
    'PalmierまたはDaVinciで5章の実制作timelineを組み、章尺を人間の編集判断として決める',
    '決定した章尺を別のtimeline authorityへSHA-boundして保存する',
    'Mac DaVinci Actualで素材挿入・Typography・BGM・color/audioを検証する',
    '最終renderとHuman final approvalを別gateで行う',
  ],
};

const csvEscape = (value: unknown) => {
  const text = String(value ?? '');
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
};
const csvRows = [
  ['chapter_order', 'chapter_id', 'title', 'role', 'edit_intent', 'slot_id', 'media_label', 'file', 'sha256', 'timing_state'],
  ...chapters.flatMap((chapter) => chapter.media.map((media) => [
    chapter.order,
    chapter.chapterId,
    chapter.title,
    chapter.role,
    chapter.editIntent.join(' / '),
    media.slotId,
    media.label,
    media.file,
    media.sha256,
    chapter.timing.state,
  ])),
];

mkdirSync(outDir, {recursive: true});
writeFileSync(bundlePath, `${JSON.stringify(bundle, null, 2)}\n`);
writeFileSync(csvPath, `${csvRows.map((row) => row.map(csvEscape).join(',')).join('\n')}\n`);
console.log(`Profile V1 DaVinci assembly bundle exported: ${rel(bundlePath)}`);
console.log(`Palmier assembly CSV exported: ${rel(csvPath)}`);
console.log('Final Profile duration remains NOT_DEFINED; Mac DaVinci Actual remains NOT_RUN; productionReady=false.');
