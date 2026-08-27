import {spawnSync} from 'node:child_process';
import {existsSync, readdirSync, statSync} from 'node:fs';
import {dirname, extname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {
  profileV1Chapters,
  profileV1ProductionContract,
  profileV1RequiredMediaSlots,
} from '../src/data/profileV1ProductionPlan.ts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const mediaRoot = join(studioRoot, profileV1ProductionContract.mediaDirectory);
const audioPath = join(studioRoot, 'public/audio/profile/bgm-main.mp3');
const mediaExts = new Set(['.jpg', '.jpeg', '.png', '.webp', '.mp4', '.mov', '.m4v', '.webm']);
const jsonMode = process.argv.includes('--json');
const strict = process.argv.includes('--strict');

const normalizeStem = (file: string) => {
  const ext = extname(file);
  return file.slice(0, file.length - ext.length).toLowerCase().replaceAll('_', '-');
};

const mediaFiles = existsSync(mediaRoot)
  ? readdirSync(mediaRoot)
      .filter((file) => !file.startsWith('.'))
      .filter((file) => statSync(join(mediaRoot, file)).isFile())
      .filter((file) => mediaExts.has(extname(file).toLowerCase()))
      .sort((a, b) => a.localeCompare(b, 'en'))
  : [];
const mediaByStem = new Map(mediaFiles.map((file) => [normalizeStem(file), file]));

const mediaSlots = profileV1RequiredMediaSlots.map((slot) => {
  const file = mediaByStem.get(slot.canonicalStem) ?? null;
  return {
    ...slot,
    file,
    ready: Boolean(file),
    cropQaState: 'NOT_RUN' as const,
    focusQaState: 'NOT_RUN' as const,
    colorQaState: 'NOT_RUN' as const,
    emotionalFitQaState: 'NOT_RUN' as const,
  };
});

const readyMediaCount = mediaSlots.filter((slot) => slot.ready).length;
const mediaReady = readyMediaCount === mediaSlots.length;
const bgmFileExists = existsSync(audioPath);

type RightsStatus = {
  schemaVersion: 'profile-v1-bgm-rights-status/v1';
  authority: 'DERIVED_BGM_RIGHTS_STATUS';
  state: 'NOT_RUN' | 'BLOCKED' | 'CLEARED';
  bgm: {path: string; sha256: string} | null;
  approvalPath: string;
  blockers: string[];
  rightsCleared: boolean;
};

type StructureReviewStatus = {
  schemaVersion: 'profile-v1-full-structure-review-status/v1';
  authority: 'DERIVED_STRUCTURE_REVIEW_STATUS';
  state: 'NOT_RUN' | 'BLOCKED' | 'PASS';
  evidencePath: string;
  boundPreviewSha256: string | null;
  currentPreviewSha256: string | null;
  reviewer: string | null;
  reviewedAt: string | null;
  blockers: string[];
  humanReviewComplete: boolean;
  realMediaReviewed: false;
  bgmReviewed: false;
  contentAccuracyReviewed: false;
  macDaVinciActual: 'NOT_RUN';
  productionReady: false;
};

type RealMediaReviewStatus = {
  schemaVersion: 'profile-v1-real-media-review-status/v1';
  authority: 'DERIVED_REAL_MEDIA_REVIEW_STATUS';
  state: 'NOT_RUN' | 'BLOCKED' | 'PASS';
  humanReviewComplete: boolean;
  blockers: string[];
  mediaExpected: 17;
  mediaReviewed: number;
  bgmReviewed: false;
  macDaVinciActual: 'NOT_RUN';
  productionReady: false;
};

const rightsRun = spawnSync(
  process.execPath,
  ['--no-warnings', 'scripts/profile-v1-bgm-rights-approval.mts', '--json'],
  {cwd: studioRoot, encoding: 'utf8'},
);
if (rightsRun.status !== 0) throw new Error(`PROFILE_BGM_RIGHTS_STATUS_FAILED:${rightsRun.stderr || rightsRun.stdout}`);
const rightsStatus = JSON.parse(rightsRun.stdout) as RightsStatus;
if (rightsStatus.schemaVersion !== 'profile-v1-bgm-rights-status/v1' || rightsStatus.authority !== 'DERIVED_BGM_RIGHTS_STATUS') {
  throw new Error('PROFILE_BGM_RIGHTS_STATUS_CONTRACT');
}

const structureReviewRun = spawnSync(
  process.execPath,
  ['--no-warnings', 'scripts/profile-v1-full-structure-review.mts', '--json'],
  {cwd: studioRoot, encoding: 'utf8'},
);
if (structureReviewRun.status !== 0) {
  throw new Error(`PROFILE_STRUCTURE_REVIEW_STATUS_FAILED:${structureReviewRun.stderr || structureReviewRun.stdout}`);
}
const structureReview = JSON.parse(structureReviewRun.stdout) as StructureReviewStatus;
if (
  structureReview.schemaVersion !== 'profile-v1-full-structure-review-status/v1' ||
  structureReview.authority !== 'DERIVED_STRUCTURE_REVIEW_STATUS'
) {
  throw new Error('PROFILE_STRUCTURE_REVIEW_STATUS_CONTRACT');
}

const realMediaReviewRun = spawnSync(
  process.execPath,
  ['--no-warnings', 'scripts/profile-v1-real-media-review.mts', '--json'],
  {cwd: studioRoot, encoding: 'utf8'},
);
if (realMediaReviewRun.status !== 0) {
  throw new Error(`PROFILE_REAL_MEDIA_REVIEW_STATUS_FAILED:${realMediaReviewRun.stderr || realMediaReviewRun.stdout}`);
}
const realMediaReview = JSON.parse(realMediaReviewRun.stdout) as RealMediaReviewStatus;
if (
  realMediaReview.schemaVersion !== 'profile-v1-real-media-review-status/v1' ||
  realMediaReview.authority !== 'DERIVED_REAL_MEDIA_REVIEW_STATUS'
) {
  throw new Error('PROFILE_REAL_MEDIA_REVIEW_STATUS_CONTRACT');
}

const bgmRightsState = rightsStatus.state;
const bgmReady = bgmFileExists && rightsStatus.rightsCleared;
const finalRenderEligible = mediaReady && bgmReady;
const assemblyReady =
  finalRenderEligible &&
  structureReview.state === 'PASS' &&
  structureReview.humanReviewComplete &&
  realMediaReview.state === 'PASS' &&
  realMediaReview.humanReviewComplete;

const blockers = [
  ...mediaSlots.filter((slot) => !slot.ready).map((slot) => `MEDIA_MISSING:${slot.id}`),
  ...rightsStatus.blockers.map((blocker) => `BGM_RIGHTS:${blocker}`),
  ...(structureReview.state === 'PASS'
    ? []
    : structureReview.blockers.length > 0
      ? structureReview.blockers.map((blocker) => `STRUCTURE_REVIEW:${blocker}`)
      : [`STRUCTURE_REVIEW:${structureReview.state}`]),
  ...(realMediaReview.state === 'PASS'
    ? []
    : realMediaReview.blockers.length > 0
      ? realMediaReview.blockers.map((blocker) => `REAL_MEDIA_REVIEW:${blocker}`)
      : [`REAL_MEDIA_REVIEW:${realMediaReview.state}`]),
];

const chapterRows = profileV1Chapters.map((chapter) => {
  const required = mediaSlots.filter((slot) => slot.chapterId === chapter.id);
  const readyCount = required.filter((slot) => slot.ready).length;
  return {
    chapterId: chapter.id,
    order: chapter.order,
    title: chapter.title,
    role: chapter.role,
    editIntent: chapter.editIntent,
    requiredCount: required.length,
    readyCount,
    ready: readyCount === required.length,
  };
});

const report = {
  schemaVersion: 'profile-v1-assembly-preflight/v1' as const,
  authority: 'MOTION_STUDIO_DERIVED_PREFLIGHT' as const,
  sourceAuthority: profileV1ProductionContract.sourceAuthority,
  chapters: chapterRows,
  media: {
    directory: profileV1ProductionContract.mediaDirectory,
    ready: mediaReady,
    readyCount: readyMediaCount,
    expectedCount: mediaSlots.length,
    slots: mediaSlots,
  },
  audio: {
    assetId: profileV1ProductionContract.bgmAssetId,
    path: 'public/audio/profile/bgm-main.mp3',
    fileExists: bgmFileExists,
    rightsState: bgmRightsState,
    rightsApprovalPath: rightsStatus.approvalPath,
    rightsBoundSha256: rightsStatus.bgm?.sha256 ?? null,
    ready: bgmReady,
  },
  structureReview,
  realMediaReview,
  readiness: {
    finalRenderEligible,
    assemblyReady,
    blockers,
    structurePreviewQaState: structureReview.state,
    previewQaState: realMediaReview.state,
    humanContentQaState: realMediaReview.state,
    audioQaState: 'NOT_RUN' as const,
    macDaVinciActualState: 'NOT_RUN' as const,
    productionReady: false,
  },
  nextActions: !mediaReady
    ? [
        `Profile実素材を ${profileV1ProductionContract.mediaDirectory}/ へcanonical stem名で投入`,
        'pnpm prepare:profile-v1',
      ]
    : !bgmFileExists
      ? ['権利確認対象BGMを public/audio/profile/bgm-main.mp3 へ配置', 'pnpm profile:bgm-rights:init']
      : !bgmReady
        ? [
            'pnpm profile:bgm-rights:init',
            '生成されたHOLD artifactを人間が権利証拠に基づいて編集',
            'pnpm profile:bgm-rights:strict',
          ]
        : structureReview.state !== 'PASS'
          ? [
              'pnpm render:profile-v1:structure-preview',
              'pnpm profile:structure-review:init',
              '30秒全5章structure previewを人間確認してreview evidenceを更新',
              'pnpm profile:structure-review:strict',
            ]
          : realMediaReview.state !== 'PASS'
            ? [
                'pnpm render:profile-v1:real-media-preview',
                'pnpm qa:profile-v1:real-media-stills',
                'pnpm profile:real-media-review:init',
                '17素材のcrop/focus/color/emotional-fit/contentと5章flow/readability/role fitを人間確認',
                'pnpm profile:real-media-review:strict',
              ]
            : ['Profile assembly input + structure + real-media Human QA ready', 'pnpm render:profile-v1'],
};

if (jsonMode) {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log(
    `Profile V1 assembly preflight: chapters=${chapterRows.filter((chapter) => chapter.ready).length}/${chapterRows.length} media=${readyMediaCount}/${mediaSlots.length} BGM=${bgmReady ? 'READY' : `BLOCKED/${bgmRightsState}`} structure=${structureReview.state} realMediaQA=${realMediaReview.state}`,
  );
  console.log(`finalRenderEligible=${finalRenderEligible ? 'YES' : 'NO'} assemblyReady=${assemblyReady ? 'YES' : 'NO'} structurePreviewQA=${structureReview.state} realMediaPreviewQA=${realMediaReview.state} HumanContentQA=${realMediaReview.state} MacDaVinciActual=NOT_RUN productionReady=NO`);
  for (const blocker of blockers) console.log(`BLOCK / ${blocker}`);
  console.log(`NEXT / ${report.nextActions.join(' → ')}`);
  console.log('JSON / node --no-warnings scripts/profile-v1-assembly-preflight.mts --json');
}

if (strict && !assemblyReady) process.exit(1);
