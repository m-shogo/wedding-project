import {createHash} from 'node:crypto';
import {existsSync, readFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const bundlePath = join(root, 'out/handoff/opening-v1/opening-v1-production-bundle.json');
const timelinePath = join(root, 'out/handoff/opening-v1/opening-v1-palmier-timeline.csv');
const soundCuePath = join(root, 'out/handoff/opening-v1/opening-v1-palmier-sound-cues.csv');
const evidencePath = join(root, 'out/qa/opening-v1-davinci-finishing-evidence.json');
const defaultRenderPath = 'out/opening/opening_v1.mp4';
const rel = (path: string) => relative(root, path).replaceAll('\\', '/');
const sha = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

const blockers: string[] = [];
let bundle: any = null;
if (!existsSync(bundlePath)) blockers.push('OPENING_DAVINCI_BUNDLE_MISSING');
else {
  try { bundle = JSON.parse(readFileSync(bundlePath, 'utf8')); }
  catch { blockers.push('OPENING_DAVINCI_BUNDLE_INVALID_JSON'); }
}

if (bundle) {
  if (bundle.schemaVersion !== 'opening-v1-production-bundle/v1') blockers.push('OPENING_DAVINCI_BUNDLE_SCHEMA_MISMATCH');
  if (bundle.authority !== 'FINAL_RENDER_BOUND_HANDOFF') blockers.push('OPENING_DAVINCI_BUNDLE_AUTHORITY_MISMATCH');
  if (bundle.davinci?.intendedUse !== 'FINISHING_AND_OUTPUT_QA') blockers.push('OPENING_DAVINCI_INTENDED_USE_MISMATCH');
  if (bundle.davinci?.productionReady !== false) blockers.push('OPENING_DAVINCI_BUNDLE_MUST_FAIL_CLOSED');
  if (bundle.finalRender?.path !== bundle.davinci?.handoffAsset) blockers.push('OPENING_DAVINCI_HANDOFF_ASSET_PATH_MISMATCH');
  if (bundle.finalRender?.sha256 !== bundle.davinci?.expectedSha256) blockers.push('OPENING_DAVINCI_EXPECTED_SHA_MISMATCH');
  if (bundle.palmier?.handoffContractVersion !== 'opening-v1-palmier-handoff/v2') blockers.push('OPENING_DAVINCI_PALMIER_CONTRACT_STALE');
  if (bundle.palmier?.timelineCsv !== rel(timelinePath)) blockers.push('OPENING_DAVINCI_PALMIER_TIMELINE_PATH_MISMATCH');
  if (!existsSync(timelinePath)) blockers.push('OPENING_DAVINCI_PALMIER_TIMELINE_MISSING');
  else if (bundle.palmier?.timelineCsvSha256 !== sha(timelinePath)) blockers.push('OPENING_DAVINCI_PALMIER_TIMELINE_SHA_STALE');
  if (bundle.palmier?.soundCueCsv !== rel(soundCuePath)) blockers.push('OPENING_DAVINCI_PALMIER_SOUND_CUE_PATH_MISMATCH');
  if (!existsSync(soundCuePath)) blockers.push('OPENING_DAVINCI_PALMIER_SOUND_CUE_MISSING');
  else if (bundle.palmier?.soundCueCsvSha256 !== sha(soundCuePath)) blockers.push('OPENING_DAVINCI_PALMIER_SOUND_CUE_SHA_STALE');
  const renderPath = join(root, bundle.finalRender?.path ?? defaultRenderPath);
  if (!existsSync(renderPath)) blockers.push('OPENING_DAVINCI_SOURCE_RENDER_MISSING');
  else if (bundle.finalRender?.sha256 !== sha(renderPath)) blockers.push('OPENING_DAVINCI_SOURCE_RENDER_SHA_STALE');
}

const report = {
  schemaVersion: 'opening-v1-davinci-handoff/v1',
  authority: 'MOTION_STUDIO_OPENING_DAVINCI_HANDOFF',
  current: blockers.length === 0,
  sourceAuthorities: [
    'scripts/export-opening-v1-production-bundle.mts#bundle.davinci',
    'scripts/opening-v1-davinci-finishing-evidence.mts',
  ],
  upstreamPalmier: {
    requiredContractVersion: 'opening-v1-palmier-handoff/v2',
    timelinePath: rel(timelinePath),
    soundCuePath: rel(soundCuePath),
  },
  handoffAsset: {
    path: bundle?.davinci?.handoffAsset ?? defaultRenderPath,
    expectedSha256: bundle?.davinci?.expectedSha256 ?? null,
    shaBound: true,
    intendedUse: 'FINISHING_AND_OUTPUT_QA',
  },
  actualEvidence: {
    path: rel(evidencePath),
    schemaVersion: 'opening-v1-davinci-finishing-evidence/v1',
    authority: 'MAC_DAVINCI_ACTUAL_EVIDENCE',
    requiredChecks: [
      'source_render_sha_readback',
      'resolve_version_project_timeline',
      'timeline_insertion',
      'duration_and_fps',
      'color_finish',
      'audio_finish',
      'title_safe_and_framing',
      'playback_1x',
      'playback_half_speed',
      'export_duration_dimensions_fps_audio',
      'watched_with_sound',
      'human_overall_review',
    ],
  },
  productionReady: false,
  blockers,
  guardrails: [
    'DAVINCI_HANDOFF_CURRENT != MAC_DAVINCI_ACTUAL_VERIFIED',
    'DAVINCI_EVIDENCE_TEMPLATE != ACTUAL_EVIDENCE_PASS',
    'MAC_DAVINCI_ACTUAL_VERIFIED != FINAL_DELIVERY_APPROVED',
  ],
};

if (process.argv.includes('--json')) console.log(JSON.stringify(report, null, 2));
else console.log(`Opening DaVinci handoff: ${report.current ? 'CURRENT' : 'NOT_EXPORTED_OR_STALE'} / blockers=${blockers.length}`);
if (process.argv.includes('--strict') && !report.current) process.exit(1);
