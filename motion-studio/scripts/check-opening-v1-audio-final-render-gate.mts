import {readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const path = join(root, 'scripts/init-opening-v1-final-render-review.mts');
const source = readFileSync(path, 'utf8');
const errors: string[] = [];

const visualGate = "run('pnpm', ['opening:preview-review:strict']);";
const audioGate = "run(process.execPath, ['--no-warnings', 'scripts/opening-v1-audio-listening-review.mts', '--strict']);";
const finalRender = "run('pnpm', ['exec', 'remotion', 'render', 'src/index-opening-v1.ts', 'OpeningV1', 'out/opening/opening_v1.mp4']);";
const finalTechnicalQa = "run(process.execPath, ['--no-warnings', 'scripts/check-opening-render.mts', 'out/opening/opening_v1.mp4']);";
const humanFinalReviewInit = "run(process.execPath, ['--no-warnings', 'scripts/opening-v1-final-render-review.mts', '--init']);";

for (const token of [visualGate, audioGate, finalRender, finalTechnicalQa, humanFinalReviewInit]) {
  if (!source.includes(token)) errors.push(`missing production gate token: ${token}`);
}

const indexes = [visualGate, audioGate, finalRender, finalTechnicalQa, humanFinalReviewInit].map((token) => source.indexOf(token));
if (indexes.every((index) => index >= 0)) {
  for (let index = 1; index < indexes.length; index += 1) {
    if (indexes[index - 1] >= indexes[index]) errors.push('Opening final-render pipeline order drifted: visual review -> Human audio review -> fresh render -> technical QA -> Human final review init is mandatory.');
  }
}

if (!source.includes("'scripts/opening-v1-audio-listening-review.mts', '--strict'")) {
  errors.push('Opening final render must consume strict SHA-bound Human audio-listening evidence.');
}
if (source.includes("'scripts/opening-v1-audio-listening-review.mts', '--init'")) {
  errors.push('Production final-render command must never auto-initialize Human audio evidence as a substitute for completed Human listening QA.');
}
if (!source.includes('current visual preview review and SHA-bound Human audio listening QA both passed')) {
  errors.push('Operator output must state the dual Human gate before production render.');
}

if (errors.length > 0) {
  console.error(`Opening V1 audio final-render gate FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Opening V1 audio final-render gate OK: current visual preview review and current SHA-bound Human audio listening QA are both mandatory before fresh production render; GUI Actual and productionReady remain outside this command.');
