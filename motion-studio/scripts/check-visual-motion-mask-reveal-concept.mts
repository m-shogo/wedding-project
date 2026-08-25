import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const concept = fs.readFileSync(path.join(root, 'src/compositions/common/VisualMotionMaskRevealConcept.tsx'), 'utf8');
const rootFile = fs.readFileSync(path.join(root, 'src/StartMotionKitRoot.tsx'), 'utf8');
const engine = fs.readFileSync(path.join(root, 'src/motion-kit/engines.tsx'), 'utf8');
const sampleRegistry = fs.readFileSync(path.join(root, '../movie-dashboard/src/data/motionSampleAssetSets.ts'), 'utf8');
const errors: string[] = [];

const requireText = (source: string, token: string, message: string) => {
  if (!source.includes(token)) errors.push(message);
};

for (const token of [
  'TypographyRevealEngine',
  'text="WELCOME"',
  'intensity="M"',
  'mode="mask"',
  'transparent',
  "backgroundColor: '#17191c'",
  "fontFamily: 'Arial, Helvetica, sans-serif'",
  'Repository-generated CONCEPT preview only',
  'NOT evidence',
]) {
  requireText(concept, token, `Mask Reveal concept composition missing: ${token}`);
}

for (const token of [
  'id="VisualMotionMaskRevealConceptV1"',
  'width={1280}',
  'height={720}',
  'fps={30}',
  'durationInFrames={120}',
]) {
  requireText(rootFile, token, `Mask Reveal concept composition contract missing: ${token}`);
}

for (const token of [
  'export function TypographyRevealEngine',
  "mode = 'mask'",
  'Easing.out(Easing.cubic)',
]) {
  requireText(engine, token, `Existing TypographyRevealEngine reuse contract missing: ${token}`);
}

for (const token of [
  'id: "sample-typography-welcome-v1"',
  'canonicalText: ["WELCOME"]',
  'width: 1280',
  'height: 720',
  'fps: 30',
  'durationSeconds: 4',
]) {
  requireText(sampleRegistry, token, `WELCOME sample registry mismatch: ${token}`);
}

if (concept.includes('interpolate(') || concept.includes('Easing.')) {
  errors.push('Concept composition must reuse TypographyRevealEngine instead of recreating Mask Reveal timing/easing');
}

if (errors.length) {
  console.error(`Visual Motion Mask Reveal concept contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Visual Motion Mask Reveal concept contracts OK: existing TypographyRevealEngine reused with neutral sans WELCOME 1280x720 / 30fps / 4s sample; concept remains explicitly non-DaVinci evidence.');
