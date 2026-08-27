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

const bgmRightsState = rightsStatus.state;
const bgmReady = bgmFileExists && rightsStatus.rightsCleared;
const finalRenderEligible = mediaReady && bgmReady;

const blockers = [
  ...mediaSlots.filter((slot) => !slot.ready).map((slot) => `MEDIA_MISSING:${slot.id}`),
  ...rightsStatus.blockers.map((blocker) => `BGM_RIGHTS:${blocker}`),
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
  readiness: {
    finalRenderEligible,
    blockers,
    previewQaState: 'NOT_RUN' as const,
    humanContentQaState: 'NOT_RUN' as const,
    audioQaState: 'NOT_RUN' as const,
    macDaVinciActualState: 'NOT_RUN' as const,
    productionReady: false,
  },
  nextActions: !mediaReady
    ? [
        `Profile実素材を ${profileV1ProductionContract.mediaDirectory}/ へcanonical stem名で投入`,
        'node --no-warnings scripts/profile-v1-assembly-preflight.mts',
      ]
    : !bgmFileExists
      ? ['権利確認対象BGMを public/audio/profile/bgm-main.mp3 へ配置', 'BGM rights approvalを初期化']
      : !bgmReady
        ? [
            'node --no-warnings scripts/profile-v1-bgm-rights-approval.mts --init',
            '生成されたHOLD artifactを人間が権利証拠に基づいて編集',
            'node --no-warnings scripts/profile-v1-bgm-rights-approval.mts --strict',
          ]
        : ['Profile V1 preview compositionを実装・render', 'crop/focus/color/content/audioを人間確認', 'DaVinci handoffへ進む'],
};

if (jsonMode) {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log(
    `Profile V1 assembly preflight: chapters=${chapterRows.filter((chapter) => chapter.ready).length}/${chapterRows.length} media=${readyMediaCount}/${mediaSlots.length} BGM=${bgmReady ? 'READY' : `BLOCKED/${bgmRightsState}`}`,
  );
  console.log(`finalRenderEligible=${finalRenderEligible ? 'YES' : 'NO'} previewQA=NOT_RUN HumanContentQA=NOT_RUN MacDaVinciActual=NOT_RUN productionReady=NO`);
  for (const blocker of blockers) console.log(`BLOCK / ${blocker}`);
  console.log(`NEXT / ${report.nextActions.join(' → ')}`);
  console.log('JSON / node --no-warnings scripts/profile-v1-assembly-preflight.mts --json');
}

if (strict && !finalRenderEligible) process.exit(1);
