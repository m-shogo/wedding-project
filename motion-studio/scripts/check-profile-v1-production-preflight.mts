import {readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const preflight = readFileSync(join(root, 'scripts/profile-v1-production-preflight.mts'), 'utf8');
const render = readFileSync(join(root, 'scripts/render-profile-v1-production.mts'), 'utf8');
const status = readFileSync(join(root, 'scripts/profile-v1-production-status.mts'), 'utf8');
const errors: string[] = [];
const need = (source: string, token: string, message: string) => {
  if (!source.includes(token)) errors.push(message);
};

for (const token of [
  'profile-v1-production-preflight/v1',
  'MOTION_STUDIO_DERIVED_PRODUCTION_PREFLIGHT',
  'scripts/check-profile-v1-generated-accents.mts',
  "scripts/profile-v1-assembly-preflight.mts', ['--json']",
  "generatedAccents.state === 'PASS' && assemblyReady",
  'GENERATED_ACCENT_CONTRACT_PASS != HUMAN_REAL_MEDIA_QA_PASS',
  'PRODUCTION_PREFLIGHT_READY != MAC_DAVINCI_ACTUAL_VERIFIED',
  'PRODUCTION_PREFLIGHT_READY != PRODUCTION_READY',
  "macDaVinciActual: 'NOT_RUN'",
  'productionReady: false',
]) {
  need(preflight, token, `production preflight missing contract: ${token}`);
}

for (const token of [
  'scripts/profile-v1-production-preflight.mts',
  "'--strict'",
  'generated accent contracts and assembly readiness must both pass',
]) {
  need(render, token, `production render does not use full preflight: ${token}`);
}

for (const token of [
  "run('scripts/profile-v1-production-preflight.mts',['--json'])",
  'productionPreflightReport?.assembly?.report',
  'productionPreflightReport?.readiness?.productionPreflightReady===true',
  'Generated accents + 17 media + BGM rights + structure + real-media Human QA are ready.',
  'Blocked by full production preflight readiness.',
]) {
  need(status, token, `production status does not use full preflight: ${token}`);
}

if (render.includes("scripts/profile-v1-assembly-preflight.mts', '--strict'")) {
  errors.push('production render bypasses generated-accent preflight by calling assembly strict directly');
}
if (status.includes("run('scripts/profile-v1-assembly-preflight.mts',['--json'])")) {
  errors.push('production status bypasses generated-accent preflight by reading assembly directly');
}
if (preflight.includes("productionReady: true") || preflight.includes("macDaVinciActual: 'ACTUAL_VERIFIED'")) {
  errors.push('production preflight fabricates downstream production evidence');
}

if (errors.length) {
  console.error(`Profile V1 production preflight contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Profile V1 production preflight contracts OK: generated Motion Zukan accents and assembly readiness are required consistently by final render and production status, without fabricating Human QA, Mac Actual, or production readiness.');
