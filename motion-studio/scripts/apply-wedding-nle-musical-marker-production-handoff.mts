import {createHash} from 'node:crypto';
import {existsSync, readFileSync, writeFileSync} from 'node:fs';
import {isAbsolute, join, relative, resolve} from 'node:path';
import {spawnSync} from 'node:child_process';

type MovieId = 'opening' | 'profile';
const root = process.cwd();
const argValue = (name: string) => {
  const exact = process.argv.find((arg) => arg.startsWith(`${name}=`));
  if (exact) return exact.slice(name.length + 1);
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
};
const movieArg = argValue('--movie');
if (movieArg !== 'opening' && movieArg !== 'profile') {
  console.error('BLOCK / MOVIE_MUST_BE_OPENING_OR_PROFILE');
  process.exit(2);
}
const movieId: MovieId = movieArg;
const resolveArg = (value: string) => isAbsolute(value) ? value : resolve(root, value);
const displayPath = (path: string) => { const rel = relative(root, path).replaceAll('\\','/'); return rel.startsWith('..') ? path : rel; };
const sha256 = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
const block = (code: string, detail?: string): never => {
  console.error(`BLOCK / ${code}${detail ? ` / ${detail}` : ''}`);
  console.error('Palmier GUI Actual remains NOT_RUN unless a human actually performed it.');
  console.error('Mac DaVinci Resolve GUI Actual remains NOT_RUN unless a human actually performed it.');
  process.exit(2);
};
const defaultRecovery = join(root, `out/handoff/${movieId === 'opening' ? 'opening-v1' : 'profile-v1'}/${movieId}-v1-davinci-production-recovery.json`);
const defaultHandoff = join(root, `out/qa/project-real-media-preview/${movieId}/${movieId}-nle-musical-marker-handoff.json`);
const defaultCurrentness = join(root, `out/qa/project-real-media-preview/${movieId}/${movieId}-nle-musical-marker-handoff-currentness.json`);
const recoveryPath = resolveArg(argValue('--recovery') ?? defaultRecovery);
const handoffPath = resolveArg(argValue('--marker-handoff') ?? defaultHandoff);
const currentnessPath = resolveArg(argValue('--marker-currentness') ?? defaultCurrentness);
if (!existsSync(recoveryPath)) block('DAVINCI_RECOVERY_MISSING', displayPath(recoveryPath));
if (!existsSync(handoffPath)) block('NLE_MARKER_HANDOFF_MISSING', displayPath(handoffPath));
if (!existsSync(currentnessPath)) block('NLE_MARKER_CURRENTNESS_MISSING', displayPath(currentnessPath));
const verifier = spawnSync(process.execPath, ['--no-warnings', join(root,'scripts/verify-wedding-project-nle-musical-marker-handoff-currentness.mts'), `--handoff=${handoffPath}`, `--output=${currentnessPath}`, '--strict-current=1'], {cwd: root, encoding: 'utf8'});
if (verifier.status !== 0) block('NLE_MARKER_HANDOFF_NOT_CURRENT', [verifier.stdout?.trim(), verifier.stderr?.trim()].filter(Boolean).join(' / '));
let recovery:any; let handoff:any; let currentness:any;
try { recovery=JSON.parse(readFileSync(recoveryPath,'utf8')); handoff=JSON.parse(readFileSync(handoffPath,'utf8')); currentness=JSON.parse(readFileSync(currentnessPath,'utf8')); }
catch(error){ block('NLE_MARKER_PRODUCTION_HANDOFF_JSON_INVALID', error instanceof Error ? error.message : String(error)); }
if (recovery?.authority !== 'FINAL_RENDER_BOUND_DAVINCI_RECOVERY') block('DAVINCI_RECOVERY_AUTHORITY_INVALID');
if (handoff?.schemaVersion !== 'wedding-movie-nle-musical-marker-handoff/v1' || handoff?.authority !== 'CURRENT_MUSICAL_AND_MOVIE_MARKERS_FOR_PALMIER_DAVINCI_HANDOFF' || handoff?.projectId !== movieId) block('NLE_MARKER_HANDOFF_CONTRACT_INVALID');
if (currentness?.schemaVersion !== 'wedding-movie-nle-musical-marker-handoff-currentness/v1' || currentness?.authority !== 'LIVE_REVALIDATION_OF_NLE_MUSICAL_MARKER_HANDOFF_INPUT_IDENTITIES' || currentness?.projectId !== movieId || currentness?.state !== 'CURRENT') block('NLE_MARKER_CURRENTNESS_CONTRACT_INVALID');
const handoffSha256=sha256(handoffPath); const currentnessSha256=sha256(currentnessPath);
if (currentness.source?.handoffSha256 !== handoffSha256) block('NLE_MARKER_CURRENTNESS_BINDING_STALE');
const categoryCounts = (handoff.markers ?? []).reduce((acc:any,m:any)=>{acc[m.category]=(acc[m.category]??0)+1;return acc;},{});
recovery.musicalMarkerHandoff = {
  authority: 'SHA_BOUND_CURRENT_NLE_MUSICAL_MARKER_HANDOFF',
  movieId,
  state: 'CURRENT',
  handoff: {path: displayPath(handoffPath), sha256: handoffSha256, revision: handoff.revision},
  currentness: {path: displayPath(currentnessPath), sha256: currentnessSha256},
  source: {alignmentSha256: handoff.source?.alignmentSha256 ?? null, rhythmPassSha256: handoff.source?.rhythmPassSha256 ?? null, bgmCueMapSha256: handoff.source?.bgmCueMapSha256 ?? null, bgmSha256: handoff.source?.bgmSha256 ?? null, humanSelectionSha256: handoff.source?.humanSelectionSha256 ?? null},
  verification: {fps: handoff.fps, markerCount: handoff.summary?.markerCount ?? 0, bgmCueCount: categoryCounts.BGM_CUE ?? 0, movieEventCount: categoryCounts.MOVIE_EVENT ?? 0, humanEditTargetCount: categoryCounts.HUMAN_EDIT_TARGET ?? 0, exactTimecodesPresent: (handoff.markers ?? []).every((m:any)=>typeof m.timecode==='string'&&/^\d{2}:\d{2}:\d{2}:\d{2}$/.test(m.timecode))},
  palmierMarkerImportActual: 'NOT_RUN',
  daVinciMarkerImportActual: 'NOT_RUN',
  palmierGuiActual: 'NOT_RUN',
  macDaVinciGuiActual: 'NOT_RUN',
  productionReady: false,
  guardrails: [
    'NLE_MUSICAL_MARKER_HANDOFF_CURRENT != PALMIER_MARKER_IMPORT_ACTUAL_PASS',
    'NLE_MUSICAL_MARKER_HANDOFF_CURRENT != DAVINCI_MARKER_IMPORT_ACTUAL_PASS',
    'NLE_MUSICAL_MARKER_HANDOFF_CURRENT != MAC_DAVINCI_GUI_ACTUAL_PASS',
    'NLE_MUSICAL_MARKER_HANDOFF_CURRENT != PRODUCTION_READY'
  ]
};
writeFileSync(recoveryPath, `${JSON.stringify(recovery,null,2)}\n`);
console.log('musicalMarkerProductionHandoff=CURRENT');
console.log(`movieId=${movieId}`);
console.log(`recovery=${displayPath(recoveryPath)}`);
console.log(`markerHandoffSha256=${handoffSha256}`);
console.log(`markerCurrentnessSha256=${currentnessSha256}`);
console.log(`markerCount=${recovery.musicalMarkerHandoff.verification.markerCount}`);
console.log('palmierMarkerImportActual=NOT_RUN');
console.log('daVinciMarkerImportActual=NOT_RUN');
console.log('macDaVinciGuiActual=NOT_RUN');
console.log('productionReady=NO');
