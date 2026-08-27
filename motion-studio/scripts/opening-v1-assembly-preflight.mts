import {existsSync, readdirSync, statSync} from 'node:fs';
import {dirname, extname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {assets} from '../src/data/assets.ts';
import {openingV1Presentation} from '../src/data/openingV1Presentation.ts';
import {openingV1SoundCues} from '../src/data/openingV1Sound.ts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const openingPhotoDir = join(studioRoot, 'public/photos/opening');
const imageExts = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const playableStatuses = new Set(['candidate', 'approved', 'final']);
const jsonMode = process.argv.includes('--json');
const strict = process.argv.includes('--strict');
const mixStrict = process.argv.includes('--mix-strict');

const expectedPhotoSlots = [
  'okinawa-01',
  'okinawa-02',
  'okinawa-03',
  'seoul-01',
  'seoul-02',
  'seoul-03',
  'hawaii-01',
  'hawaii-02',
  'hawaii-03',
  'hero-01',
  'hero-02',
] as const;

const normalizeStem = (file: string) => {
  const ext = extname(file);
  return file.slice(0, file.length - ext.length).toLowerCase().replaceAll('_', '-');
};

const photoFiles = existsSync(openingPhotoDir)
  ? readdirSync(openingPhotoDir)
      .filter((file) => !file.startsWith('.'))
      .filter((file) => statSync(join(openingPhotoDir, file)).isFile())
      .filter((file) => imageExts.has(extname(file).toLowerCase()))
      .sort((a, b) => a.localeCompare(b, 'en'))
  : [];
const photoByStem = new Map(photoFiles.map((file) => [normalizeStem(file), file]));

const photoPlan = expectedPhotoSlots.map((slot) => {
  const [group, ordinalText] = slot.split('-');
  const ordinal = Number(ordinalText);
  const file = photoByStem.get(slot) ?? null;
  const plan = group === 'hero'
    ? ordinal === 1
      ? openingV1Presentation.heroes.a
      : openingV1Presentation.heroes.b
    : openingV1Presentation.memories[group as 'okinawa' | 'seoul' | 'hawaii'][ordinal - 1];
  if (!plan) throw new Error(`Opening V1 presentation plan missing for ${slot}`);
  const fit = 'fit' in plan ? plan.fit : plan.layout === 'wide' ? 'contain' : 'cover';
  return {
    slot,
    file,
    ready: Boolean(file),
    fit,
    focus: plan.focus,
    motion: plan.motion,
    cropQaRequired: fit === 'cover',
    cropQaState: 'NOT_RUN' as const,
    focusQaState: 'NOT_RUN' as const,
    colorQaState: 'NOT_RUN' as const,
    motionQaState: 'NOT_RUN' as const,
  };
});

const audioFileState = (assetId: string) => {
  const asset = assets[assetId];
  if (!asset) throw new Error(`Opening V1 audio asset missing from registry: ${assetId}`);
  const playable = playableStatuses.has(asset.status);
  const localPublicPath = asset.path.startsWith('public/audio/');
  const fileExists = localPublicPath ? existsSync(join(studioRoot, asset.path)) : false;
  return {
    assetId,
    status: asset.status,
    path: asset.path,
    playable,
    fileExists,
    ready: playable && localPublicPath && fileExists,
  };
};

const soundPlan = openingV1SoundCues.map((cue) => ({
  cueId: cue.id,
  role: cue.role,
  startSec: cue.startSec,
  endSec: cue.endSec,
  volume: cue.volume,
  note: cue.note,
  ...audioFileState(cue.assetId),
}));

const bgmRows = soundPlan.filter((row) => row.role === 'bgm');
const ambienceRows = soundPlan.filter((row) => row.role === 'ambience');
const photosReadyCount = photoPlan.filter((row) => row.ready).length;
const photosReady = photosReadyCount === photoPlan.length;
const bgmReady = bgmRows.length === 1 && bgmRows.every((row) => row.ready);
const ambienceReadyCount = ambienceRows.filter((row) => row.ready).length;
const ambienceReady = ambienceReadyCount === ambienceRows.length;
const finalRenderEligible = photosReady && bgmReady;
const mixReady = finalRenderEligible && ambienceReady;

const blockers = [
  ...photoPlan.filter((row) => !row.ready).map((row) => `PHOTO_MISSING:${row.slot}`),
  ...bgmRows.filter((row) => !row.ready).map((row) => `BGM_NOT_READY:${row.assetId}:${row.status}`),
  ...(bgmRows.length !== 1 ? [`BGM_CUE_COUNT:${bgmRows.length}`] : []),
];
const mixWarnings = ambienceRows
  .filter((row) => !row.ready)
  .map((row) => `AMBIENCE_NOT_READY:${row.assetId}:${row.status}`);

const report = {
  schemaVersion: 'opening-v1-assembly-preflight/v1' as const,
  authority: 'MOTION_STUDIO_DERIVED_PREFLIGHT' as const,
  photos: {
    ready: photosReady,
    readyCount: photosReadyCount,
    expectedCount: photoPlan.length,
    slots: photoPlan,
  },
  audio: {
    bgmReady,
    bgm: bgmRows,
    ambienceReady,
    ambienceReadyCount,
    ambienceExpectedCount: ambienceRows.length,
    ambience: ambienceRows,
  },
  readiness: {
    finalRenderEligible,
    mixReady,
    blockers,
    mixWarnings,
    renderQaState: 'NOT_RUN' as const,
    macDaVinciActualState: 'NOT_RUN' as const,
  },
  nextActions: !photosReady
    ? ['実写真11枚をcanonical filenameで投入', 'pnpm sync:photos', 'pnpm opening:assembly-preflight']
    : !bgmReady
      ? ['権利確認済みBGMをopening-bgm-mainへ登録しcandidate以上へ昇格', 'pnpm opening:assembly-preflight']
      : !ambienceReady
        ? ['60秒previewをrenderしてcrop/focus/motionを確認', '必要ならJ-cut現地音4種を投入', 'pnpm opening:assembly-preflight -- --mix-strict']
        : ['pnpm render:opening-v1:preview', 'crop/focus/color/motion/audio QA', '問題解消後にpnpm render:opening-v1'],
};

if (jsonMode) {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log(`Opening V1 assembly preflight: photos=${photosReadyCount}/${photoPlan.length} BGM=${bgmReady ? 'READY' : 'BLOCKED'} ambience=${ambienceReadyCount}/${ambienceRows.length}`);
  console.log(`finalRenderEligible=${finalRenderEligible ? 'YES' : 'NO'} mixReady=${mixReady ? 'YES' : 'NO'} renderQa=NOT_RUN MacDaVinciActual=NOT_RUN`);
  for (const blocker of blockers) console.log(`BLOCK / ${blocker}`);
  for (const warning of mixWarnings) console.log(`WARN  / ${warning}`);
  console.log(`NEXT / ${report.nextActions.join(' → ')}`);
  console.log('JSON / pnpm opening:assembly-preflight -- --json');
}

if ((strict && !finalRenderEligible) || (mixStrict && !mixReady)) {
  process.exit(1);
}
