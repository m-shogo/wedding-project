import {createHash} from 'node:crypto';
import {existsSync, readFileSync} from 'node:fs';
import {isAbsolute, join, resolve} from 'node:path';
import {spawnSync} from 'node:child_process';

const root = process.cwd();
type MovieId = 'opening' | 'profile';
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
const recoveryPath = resolveArg(argValue('--recovery') ?? join(root, `out/handoff/${movieId === 'opening' ? 'opening-v1' : 'profile-v1'}/${movieId}-v1-davinci-production-recovery.json`));
const receiptPath = resolveArg(argValue('--receipt') ?? join(root, `out/handoff/wedding/${movieId}-palmier-typography-timeline-export-receipt.json`));
const sha256 = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
const block = (code: string, detail?: string): never => {
  console.error(`BLOCK / ${code}${detail ? ` / ${detail}` : ''}`);
  console.error('Palmier GUI Actual remains NOT_RUN unless a human actually performed it.');
  console.error('Mac DaVinci Resolve GUI Actual remains NOT_RUN unless a human actually performed it.');
  process.exit(2);
};

if (!existsSync(recoveryPath)) block('PALMIER_TIMELINE_DAVINCI_RECOVERY_MISSING');
if (!existsSync(receiptPath)) block('PALMIER_TIMELINE_EXPORT_RECEIPT_MISSING');
const checker = spawnSync(
  process.execPath,
  ['--no-warnings', join(root, 'scripts/check-wedding-palmier-typography-timeline-export-receipt.mts'), `--movie=${movieId}`, `--receipt=${receiptPath}`, '--strict'],
  {cwd: root, encoding: 'utf8'},
);
if (checker.status !== 0) block('PALMIER_TIMELINE_EXPORT_RECEIPT_NOT_CURRENT', [checker.stdout?.trim(), checker.stderr?.trim()].filter(Boolean).join(' / '));

let recovery: any;
let receipt: any;
try {
  recovery = JSON.parse(readFileSync(recoveryPath, 'utf8'));
  receipt = JSON.parse(readFileSync(receiptPath, 'utf8'));
} catch (error) {
  block('PALMIER_TIMELINE_PRODUCTION_HANDOFF_JSON_INVALID', error instanceof Error ? error.message : String(error));
}
const bound = recovery?.palmierTimelineExport;
if (bound?.authority !== 'SHA_BOUND_PALMIER_TIMELINE_EXPORT_HANDOFF' || bound?.movieId !== movieId || bound?.state !== 'CURRENT') {
  block('PALMIER_TIMELINE_PRODUCTION_HANDOFF_BINDING_MISSING_OR_INVALID');
}
if (bound?.receipt?.sha256 !== sha256(receiptPath)) block('PALMIER_TIMELINE_PRODUCTION_HANDOFF_RECEIPT_SHA_STALE');
const assemblyPlanPath = receipt?.source?.assemblyPlan?.path ? resolveArg(receipt.source.assemblyPlan.path) : null;
const fcpxmlPath = receipt?.source?.palmierFcpxml?.path ? resolveArg(receipt.source.palmierFcpxml.path) : null;
if (!assemblyPlanPath || !fcpxmlPath || !existsSync(assemblyPlanPath) || !existsSync(fcpxmlPath)) {
  block('PALMIER_TIMELINE_PRODUCTION_HANDOFF_SOURCE_MISSING');
}
const assemblyPlanSha256 = sha256(assemblyPlanPath);
const fcpxmlSha256 = sha256(fcpxmlPath);
if (bound?.assemblyPlan?.sha256 !== assemblyPlanSha256 || receipt?.source?.assemblyPlan?.sha256 !== assemblyPlanSha256) {
  block('PALMIER_TIMELINE_PRODUCTION_HANDOFF_ASSEMBLY_PLAN_SHA_STALE');
}
if (bound?.palmierFcpxml?.sha256 !== fcpxmlSha256 || receipt?.source?.palmierFcpxml?.sha256 !== fcpxmlSha256) {
  block('PALMIER_TIMELINE_PRODUCTION_HANDOFF_FCPXML_SHA_STALE');
}
if (
  bound?.palmierGuiActual !== 'NOT_RUN' ||
  bound?.remotionStudioGuiActual !== 'NOT_RUN' ||
  bound?.macDaVinciGuiActual !== 'NOT_RUN' ||
  bound?.productionReady !== false
) block('PALMIER_TIMELINE_PRODUCTION_HANDOFF_EVIDENCE_BOUNDARY_INVALID');

console.log('palmierTimelineProductionHandoff=CURRENT');
console.log(`movieId=${movieId}`);
console.log(`receiptSha256=${bound.receipt.sha256}`);
console.log(`assemblyPlanSha256=${assemblyPlanSha256}`);
console.log(`palmierFcpxmlSha256=${fcpxmlSha256}`);
console.log('palmierGuiActual=NOT_RUN');
console.log('remotionStudioGuiActual=NOT_RUN');
console.log('macDaVinciGuiActual=NOT_RUN');
console.log('productionReady=NO');
