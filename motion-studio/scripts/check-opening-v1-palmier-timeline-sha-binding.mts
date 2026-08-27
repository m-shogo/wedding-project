import {readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (path: string) => readFileSync(join(studioRoot, path), 'utf8');
const exporter = read('scripts/export-opening-v1-production-bundle.mts');
const status = read('scripts/opening-v1-production-status.mts');

const errors: string[] = [];
const requireText = (source: string, token: string, message: string) => {
  if (!source.includes(token)) errors.push(message);
};

for (const token of [
  "const shaText = (text: string)",
  'const timelineCsv =',
  'const timelineCsvSha256 = shaText(timelineCsv);',
  'timelineCsv: rel(timelineCsvPath)',
  'timelineCsvSha256,',
  "'PALMIER_TIMELINE_SHA_MISMATCH => STOP_AND_REGENERATE_HANDOFF'",
  'writeFileSync(timelineCsvPath, timelineCsv);',
]) {
  requireText(exporter, token, `Opening production bundle exporter missing Palmier SHA contract: ${token}`);
}

for (const token of [
  "const timelineCsvPath = join(studioRoot, 'out/handoff/opening-v1/opening-v1-palmier-timeline.csv');",
  'palmier?: {timelineCsv?: string; timelineCsvSha256?: string};',
  "errors.push('BUNDLE_PALMIER_TIMELINE_PATH_STALE')",
  "errors.push('BUNDLE_PALMIER_TIMELINE_MISSING')",
  "errors.push('BUNDLE_PALMIER_TIMELINE_SHA_STALE')",
  "'PALMIER_TIMELINE_SHA_MISMATCH => PRODUCTION_BUNDLE_STALE'",
]) {
  requireText(status, token, `Opening production status missing Palmier SHA validation: ${token}`);
}

if (exporter.indexOf('const timelineCsvSha256 = shaText(timelineCsv);') > exporter.indexOf('const bundle = {')) {
  errors.push('Palmier timeline SHA must be computed before the bundle object is constructed');
}
if (exporter.indexOf('writeFileSync(timelineCsvPath, timelineCsv);') > exporter.indexOf('writeFileSync(bundlePath')) {
  errors.push('Palmier timeline should be written before the bundle so the handoff closes in dependency order');
}
if (status.includes("timelineCsvSha256?: string") && !status.includes('shaFile(timelineCsvPath)')) {
  errors.push('Production status declares Palmier timeline SHA but does not compare it to the current CSV');
}

for (const forbidden of [
  "macActualState: 'PASS'",
  'productionReady: true',
]) {
  if (exporter.includes(forbidden)) errors.push(`Exporter fabricates readiness: ${forbidden}`);
}

if (errors.length > 0) {
  console.error(`Opening Palmier timeline SHA binding contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Opening Palmier timeline SHA binding contracts OK: bundle records the deterministic CSV hash, production status rejects path/missing/hash drift, and Mac Actual remains separate.');
