import {readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (path: string) => readFileSync(join(studioRoot, path), 'utf8');
const exporter = read('scripts/export-opening-v1-production-bundle.mts');
const status = read('scripts/opening-v1-production-status.mts');
const davinci = read('scripts/opening-v1-davinci-finishing-evidence.mts');

const errors: string[] = [];
const requireText = (source: string, token: string, message: string) => {
  if (!source.includes(token)) errors.push(message);
};

for (const token of [
  "const shaText = (text: string)",
  "const soundCueCsvPath = join(outDir, 'opening-v1-palmier-sound-cues.csv');",
  "['order', 'scene_id', 'title', 'start_sec', 'end_sec', 'duration_sec', 'kind', 'owner', 'replacement_policy', 'final_render_sha256']",
  'scene.replacementPolicy',
  "['cue_id', 'role', 'asset_id', 'start_sec', 'end_sec', 'volume', 'note', 'final_render_sha256']",
  '...openingV1SoundCues.map((cue) => [',
  'const timelineCsvSha256 = shaText(timelineCsv);',
  'const soundCueCsvSha256 = shaText(soundCueCsv);',
  "handoffContractVersion: 'opening-v1-palmier-handoff/v2'",
  'timelineCsv: rel(timelineCsvPath)',
  'timelineCsvSha256,',
  'soundCueCsv: rel(soundCueCsvPath)',
  'soundCueCsvSha256,',
  "'PALMIER_HANDOFF_CONTRACT_VERSION_MISMATCH => STOP_AND_REGENERATE_HANDOFF'",
  "'PALMIER_TIMELINE_SHA_MISMATCH => STOP_AND_REGENERATE_HANDOFF'",
  "'PALMIER_SOUND_CUE_SHA_MISMATCH => STOP_AND_REGENERATE_HANDOFF'",
  'writeFileSync(timelineCsvPath, timelineCsv);',
  'writeFileSync(soundCueCsvPath, soundCueCsv);',
]) {
  requireText(exporter, token, `Opening production bundle exporter missing Palmier handoff contract: ${token}`);
}

for (const token of [
  "const timelineCsvPath = join(studioRoot, 'out/handoff/opening-v1/opening-v1-palmier-timeline.csv');",
  "const soundCueCsvPath = join(studioRoot, 'out/handoff/opening-v1/opening-v1-palmier-sound-cues.csv');",
  'handoffContractVersion?: string;',
  'soundCueCsv?: string;',
  'soundCueCsvSha256?: string;',
  "errors.push('BUNDLE_PALMIER_HANDOFF_CONTRACT_STALE')",
  "errors.push('BUNDLE_PALMIER_TIMELINE_PATH_STALE')",
  "errors.push('BUNDLE_PALMIER_TIMELINE_MISSING')",
  "errors.push('BUNDLE_PALMIER_TIMELINE_SHA_STALE')",
  "errors.push('BUNDLE_PALMIER_SOUND_CUE_PATH_STALE')",
  "errors.push('BUNDLE_PALMIER_SOUND_CUE_MISSING')",
  "errors.push('BUNDLE_PALMIER_SOUND_CUE_SHA_STALE')",
  "'PALMIER_HANDOFF_CONTRACT_VERSION_MISMATCH => PRODUCTION_BUNDLE_STALE'",
  "'PALMIER_SOUND_CUE_SHA_MISMATCH => PRODUCTION_BUNDLE_STALE'",
]) {
  requireText(status, token, `Opening production status missing Palmier handoff validation: ${token}`);
}

for (const token of [
  "const timelineCsvPath = join(studioRoot, 'out/handoff/opening-v1/opening-v1-palmier-timeline.csv');",
  "const soundCueCsvPath = join(studioRoot, 'out/handoff/opening-v1/opening-v1-palmier-sound-cues.csv');",
  'handoffContractVersion: string;',
  'soundCueCsv: string;',
  'soundCueCsvSha256: string;',
  "throw new Error('DAVINCI_FINISHING_PALMIER_HANDOFF_CONTRACT_STALE')",
  "throw new Error('DAVINCI_FINISHING_PALMIER_TIMELINE_PATH_MISMATCH')",
  "throw new Error('DAVINCI_FINISHING_PALMIER_TIMELINE_MISSING')",
  "throw new Error('DAVINCI_FINISHING_PALMIER_TIMELINE_SHA_MISMATCH')",
  "throw new Error('DAVINCI_FINISHING_PALMIER_SOUND_CUE_PATH_MISMATCH')",
  "throw new Error('DAVINCI_FINISHING_PALMIER_SOUND_CUE_MISSING')",
  "throw new Error('DAVINCI_FINISHING_PALMIER_SOUND_CUE_SHA_MISMATCH')",
]) {
  requireText(davinci, token, `Opening DaVinci evidence direct path missing Palmier handoff validation: ${token}`);
}

if (exporter.indexOf('const timelineCsvSha256 = shaText(timelineCsv);') > exporter.indexOf('const bundle = {')) {
  errors.push('Palmier timeline SHA must be computed before the bundle object is constructed');
}
if (exporter.indexOf('const soundCueCsvSha256 = shaText(soundCueCsv);') > exporter.indexOf('const bundle = {')) {
  errors.push('Palmier sound cue SHA must be computed before the bundle object is constructed');
}
if (exporter.indexOf('writeFileSync(timelineCsvPath, timelineCsv);') > exporter.indexOf('writeFileSync(bundlePath')) {
  errors.push('Palmier timeline should be written before the bundle so the handoff closes in dependency order');
}
if (exporter.indexOf('writeFileSync(soundCueCsvPath, soundCueCsv);') > exporter.indexOf('writeFileSync(bundlePath')) {
  errors.push('Palmier sound cue file should be written before the bundle so the handoff closes in dependency order');
}
if (status.includes('timelineCsvSha256?: string') && !status.includes('shaFile(timelineCsvPath)')) {
  errors.push('Production status declares Palmier timeline SHA but does not compare it to the current CSV');
}
if (status.includes('soundCueCsvSha256?: string') && !status.includes('shaFile(soundCueCsvPath)')) {
  errors.push('Production status declares Palmier sound cue SHA but does not compare it to the current CSV');
}
if (davinci.includes('timelineCsvSha256: string') && !davinci.includes('shaFile(timelineCsvPath)')) {
  errors.push('DaVinci evidence declares Palmier timeline SHA but does not compare it to the current CSV');
}
if (davinci.includes('soundCueCsvSha256: string') && !davinci.includes('shaFile(soundCueCsvPath)')) {
  errors.push('DaVinci evidence declares Palmier sound cue SHA but does not compare it to the current CSV');
}

for (const forbidden of [
  "macActualState: 'PASS'",
  'productionReady: true',
]) {
  if (exporter.includes(forbidden)) errors.push(`Exporter fabricates readiness: ${forbidden}`);
}

if (errors.length > 0) {
  console.error(`Opening Palmier handoff contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Opening Palmier handoff contracts OK: scene replacement intent and canonical J-cut/BGM cues are exported as versioned SHA-bound artifacts, status/direct DaVinci reject drift, and Mac Actual remains separate.');
