import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {openingV1Scenes, openingV1TotalSec} from '../src/data/openingV1.ts';
import {openingV1SoundCues} from '../src/data/openingV1Sound.ts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const finalRenderPath = join(studioRoot, 'out/opening/opening_v1.mp4');
const previewReviewPath = join(studioRoot, 'out/qa/opening-v1-preview-review.json');
const outDir = join(studioRoot, 'out/handoff/opening-v1');
const bundlePath = join(outDir, 'opening-v1-production-bundle.json');
const timelineCsvPath = join(outDir, 'opening-v1-palmier-timeline.csv');

const shaFile = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
const rel = (path: string) => relative(studioRoot, path).replaceAll('\\', '/');
const run = (args: string[]) => spawnSync(process.execPath, ['--no-warnings', ...args], {
  cwd: studioRoot,
  encoding: 'utf-8',
});

const assembly = run(['scripts/opening-v1-assembly-preflight.mts', '--json']);
if (assembly.status !== 0) {
  console.error(assembly.stderr || assembly.stdout || 'Opening V1 assembly preflight failed');
  process.exit(1);
}
let assemblyReport: any;
try {
  assemblyReport = JSON.parse(assembly.stdout);
} catch {
  console.error('Opening V1 assembly preflight did not return valid JSON');
  process.exit(1);
}
if (assemblyReport.readiness?.finalRenderEligible !== true) {
  console.error('Opening V1 production bundle blocked: assembly preflight is not final-render eligible.');
  for (const blocker of assemblyReport.readiness?.blockers ?? []) console.error(`BLOCK / ${blocker}`);
  process.exit(1);
}

const previewReview = run(['scripts/opening-v1-preview-review.mts', '--strict']);
if (previewReview.status !== 0) {
  console.error('Opening V1 production bundle blocked: current preview has no valid human review evidence.');
  console.error(previewReview.stdout || previewReview.stderr || 'preview review strict failed');
  process.exit(1);
}
if (!existsSync(previewReviewPath)) {
  console.error('Opening V1 production bundle blocked: preview review evidence file missing.');
  process.exit(1);
}
if (!existsSync(finalRenderPath)) {
  console.error('Opening V1 production bundle blocked: final render missing. Run pnpm render:opening-v1 first.');
  process.exit(1);
}

const renderCheck = run([
  'scripts/check-opening-render.mts',
  'out/opening/opening_v1.mp4',
]);
if (renderCheck.status !== 0) {
  console.error('Opening V1 production bundle blocked: final render QA contract failed.');
  console.error(renderCheck.stdout || renderCheck.stderr || 'render QA failed');
  process.exit(1);
}

const evidence = JSON.parse(readFileSync(previewReviewPath, 'utf8')) as {
  schemaVersion: string;
  preview: {path: string; sha256: string};
  review: {overall: string; reviewer: string | null; reviewedAt: string | null; notes: string};
  photos: Array<{slot: string; file: string; sha256: string}>;
  audio: {
    bgm: {assetId: string; file: string; sha256: string};
    ambience: Array<{assetId: string; file: string | null; sha256: string | null}>;
  };
};

let cursor = 0;
const sceneTimeline = openingV1Scenes.map((scene, index) => {
  const startSec = cursor;
  const endSec = startSec + scene.durationSec;
  cursor = endSec;
  return {
    order: index + 1,
    sceneId: scene.id,
    title: scene.title,
    startSec,
    endSec,
    durationSec: scene.durationSec,
    kind: scene.kind,
    owner: scene.owner,
    replacementPolicy: scene.replacementPolicy,
  };
});
if (cursor !== openingV1TotalSec || openingV1TotalSec !== 60) {
  throw new Error(`Opening V1 timeline drifted: cursor=${cursor} total=${openingV1TotalSec}`);
}

const finalRenderSha256 = shaFile(finalRenderPath);
const bundle = {
  schemaVersion: 'opening-v1-production-bundle/v1',
  authority: 'FINAL_RENDER_BOUND_HANDOFF',
  generatedAt: new Date().toISOString(),
  composition: {
    id: 'OpeningV1',
    width: 1920,
    height: 1080,
    fps: 30,
    durationSeconds: 60,
  },
  finalRender: {
    path: rel(finalRenderPath),
    sha256: finalRenderSha256,
    qaContract: 'check-opening-render.mts=PASS_AT_EXPORT',
  },
  humanPreviewReview: {
    evidencePath: rel(previewReviewPath),
    evidenceSha256: shaFile(previewReviewPath),
    previewPath: evidence.preview.path,
    previewSha256: evidence.preview.sha256,
    reviewer: evidence.review.reviewer,
    reviewedAt: evidence.review.reviewedAt,
    overall: evidence.review.overall,
    notes: evidence.review.notes,
  },
  media: {
    assemblyPreflight: assemblyReport,
    photos: evidence.photos,
    bgm: evidence.audio.bgm,
    ambience: evidence.audio.ambience,
  },
  timeline: sceneTimeline,
  soundCues: openingV1SoundCues.map((cue) => ({...cue})),
  palmier: {
    handoffMode: 'REFERENCE_TIMELINE_AND_FINAL_RENDER',
    timelineCsv: rel(timelineCsvPath),
    instruction: '60秒のscene boundaryとfinal render SHAを正本として扱い、編集時に別renderへ差し替えない。必要な再編集はMotion Studio正本へ戻してpreview reviewを再実行する。',
  },
  davinci: {
    handoffAsset: rel(finalRenderPath),
    expectedSha256: finalRenderSha256,
    intendedUse: 'FINISHING_AND_OUTPUT_QA',
    macActualState: 'NOT_RUN',
    timelineInsertionState: 'NOT_RUN',
    colorFinishState: 'NOT_RUN',
    audioFinishState: 'NOT_RUN',
    exportValidationState: 'NOT_RUN',
    productionReady: false,
  },
  guardrails: [
    'FINAL_RENDER_EXISTS != DAVINCI_ACTUAL_VERIFIED',
    'HUMAN_PREVIEW_REVIEW_PASS != FINAL_DELIVERY_APPROVED',
    'BUNDLE_EXPORTED != PRODUCTION_READY',
    'RENDER_SHA_MISMATCH => STOP_AND_REGENERATE_HANDOFF',
  ],
  nextActions: [
    'Palmierでscene boundaryとintentを確認し、正本renderを置換しない',
    'DaVinciへfinal renderを挿入しSHA一致対象であることを確認',
    '実機でcolor/audio/output QAを行い各Actual evidenceを別途記録',
    'Mac Actual未実施のままproductionReadyへ昇格しない',
  ],
};

const csvEscape = (value: unknown) => {
  const text = String(value);
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
};
const csvRows = [
  ['order', 'scene_id', 'title', 'start_sec', 'end_sec', 'duration_sec', 'kind', 'owner', 'final_render_sha256'],
  ...sceneTimeline.map((scene) => [
    scene.order,
    scene.sceneId,
    scene.title,
    scene.startSec,
    scene.endSec,
    scene.durationSec,
    scene.kind,
    scene.owner,
    finalRenderSha256,
  ]),
];

mkdirSync(outDir, {recursive: true});
writeFileSync(bundlePath, `${JSON.stringify(bundle, null, 2)}\n`);
writeFileSync(timelineCsvPath, `${csvRows.map((row) => row.map(csvEscape).join(',')).join('\n')}\n`);

console.log(`Opening V1 production bundle exported: ${rel(bundlePath)}`);
console.log(`Palmier timeline exported: ${rel(timelineCsvPath)}`);
console.log(`finalRenderSha256=${finalRenderSha256}`);
console.log('DaVinci Mac Actual remains NOT_RUN; productionReady=false.');
