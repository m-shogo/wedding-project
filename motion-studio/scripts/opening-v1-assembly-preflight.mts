import {existsSync, readdirSync, statSync} from 'node:fs';
import {dirname, extname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {assets} from '../src/data/assets.ts';
import {openingV1Presentation} from '../src/data/openingV1Presentation.ts';
import {openingV1SoundCues} from '../src/data/openingV1Sound.ts';
import {verifyBgmIntakeReceipt} from './verify-production-bgm-intake-receipt.mts';

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
  const absolutePath = localPublicPath ? join(studioRoot, asset.path) : null;
  const fileExists = absolutePath ? existsSync(absolutePath) : false;
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
const bgmAssetReady = bgmRows.length === 1 && bgmRows.every((row) => row.ready);
const bgmReceipt = bgmRows.length === 1 && bgmRows[0]?.path.startsWith('public/audio/')
  ? verifyBgmIntakeReceipt({project: 'opening', targetPath: join(studioRoot, bgmRows[0].path)})
  : null;
const bgmReceiptCurrent = bgmReceipt?.current === true;
const bgmReady = bgmAssetReady && bgmReceiptCurrent;
const ambienceReadyCount = ambienceRows.filter((row) => row.ready).length;
const ambienceReady = ambienceReadyCount === ambienceRows.length;
const finalRenderEligible = photosReady && bgmReady;
const mixReady = finalRenderEligible && ambienceReady;

const blockers = [
  ...photoPlan.filter((row) => !row.ready).map((row) => `PHOTO_MISSING:${row.slot}`),
  ...bgmRows.filter((row) => !row.ready).map((row) => `BGM_NOT_READY:${row.assetId}:${row.status}`),
  ...(bgmRows.length !== 1 ? [`BGM_CUE_COUNT:${bgmRows.length}`] : []),
  ...(bgmRows.length === 1 && !bgmReceiptCurrent
    ? [
        'BGM_INTAKE_RECEIPT_STALE',
        ...(bgmReceipt?.blockers ?? ['BGM_RECEIPT_UNAVAILABLE']).map((blocker) => `BGM_INTAKE:${blocker}`),
      ]
    : []),
];
const mixWarnings = ambienceRows
  .filter((row) => !row.ready)
  .map((row) => `AMBIENCE_NOT_READY:${row.assetId}:${row.status}`);

const canonicalPhotoIntakeActions = [
  '実写真11枚をcanonical filenameで投入',
  'pnpm sync:photos',
  'pnpm opening:assembly-preflight',
];
const canonicalBgmIntakeActions = [
  'node --no-warnings scripts/intake-production-bgm.mts --project opening --source "/ABS/PATH/TO/opening-bgm.mp3"',
  'node --no-warnings scripts/intake-production-bgm.mts --project opening --source "/ABS/PATH/TO/opening-bgm.mp3" --apply --receipt out/intake/opening-bgm-intake.json',
  'node --no-warnings scripts/verify-production-bgm-intake-receipt.mts --project opening',
];
const bgmNeedsIntake = !bgmRows[0]?.fileExists || !bgmReceiptCurrent;
const bgmNeedsApproval = !bgmNeedsIntake && !bgmAssetReady;
const inputRecovery = {
  photos: {
    state: photosReady ? 'READY' as const : 'BLOCKED' as const,
    actions: photosReady ? [] : canonicalPhotoIntakeActions,
  },
  bgm: {
    state: bgmReady ? 'READY' as const : 'BLOCKED' as const,
    actions: bgmNeedsIntake
      ? canonicalBgmIntakeActions
      : bgmNeedsApproval
        ? ['BGMの会場上映条件/Evidenceを人間確認', 'assets.tsのopening-bgm-mainをcandidate以上へ明示昇格', 'pnpm check:opening-sound:strict']
        : [],
  },
};
const parallelInputActions = [
  ...inputRecovery.photos.actions,
  ...inputRecovery.bgm.actions,
];

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
    bgmAssetReady,
    bgmIntakeReceiptCurrent: bgmReceiptCurrent,
    bgmIntakeReceiptPath: bgmReceipt?.receiptPath ? `out/intake/opening-bgm-intake.json` : null,
    bgmIntakeReceiptBlockers: bgmReceipt?.blockers ?? ['BGM_RECEIPT_UNAVAILABLE'],
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
  inputRecovery,
  nextActions: parallelInputActions.length > 0
    ? parallelInputActions
    : !ambienceReady
      ? ['60秒previewをrenderしてcrop/focus/motionを確認', '必要ならJ-cut現地音4種を投入', 'pnpm opening:assembly-preflight -- --mix-strict']
      : ['pnpm render:opening-v1:preview', 'crop/focus/color/motion/audio QA', '問題解消後にpnpm render:opening-v1'],
};

if (jsonMode) {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log(`Opening V1 assembly preflight: photos=${photosReadyCount}/${photoPlan.length} BGM=${bgmReady ? 'READY' : 'BLOCKED'} receipt=${bgmReceiptCurrent ? 'CURRENT' : 'MISSING_OR_STALE'} ambience=${ambienceReadyCount}/${ambienceRows.length}`);
  console.log(`finalRenderEligible=${finalRenderEligible ? 'YES' : 'NO'} mixReady=${mixReady ? 'YES' : 'NO'} renderQa=NOT_RUN MacDaVinciActual=NOT_RUN`);
  for (const blocker of blockers) console.log(`BLOCK / ${blocker}`);
  for (const warning of mixWarnings) console.log(`WARN  / ${warning}`);
  console.log(`INPUT / photos=${inputRecovery.photos.state} bgm=${inputRecovery.bgm.state}`);
  console.log(`NEXT / ${report.nextActions.join(' → ')}`);
  console.log('JSON / pnpm opening:assembly-preflight -- --json');
}

if ((strict && !finalRenderEligible) || (mixStrict && !mixReady)) {
  process.exit(1);
}
