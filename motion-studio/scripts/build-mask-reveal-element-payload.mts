import {createHash} from 'node:crypto';
import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';

const root = process.cwd();
const enginePath = join(root, 'src/motion-kit/engines.tsx');
const outputDir = join(root, 'out/research/remotion-elements/mask-reveal');
const sourceOutputPath = join(outputDir, 'mask-reveal.element-source.tsx');
const payloadOutputPath = join(outputDir, 'mask-reveal.element-payload.json');
const manifestOutputPath = join(outputDir, 'manifest.json');

const canonicalFile = readFileSync(enginePath, 'utf8');
const startMarker = 'export type MotionIntensity';
const endMarker = 'export type CameraTransformMode';
const start = canonicalFile.indexOf(startMarker);
const end = canonicalFile.indexOf(endMarker);

if (start < 0 || end < 0 || end <= start) {
  throw new Error('Could not isolate canonical TypographyRevealEngine block from engines.tsx');
}
if (canonicalFile.indexOf(startMarker, start + startMarker.length) >= 0) {
  throw new Error('MotionIntensity marker is no longer unique; update the extractor deliberately');
}
if (canonicalFile.indexOf(endMarker, end + endMarker.length) >= 0) {
  throw new Error('CameraTransformMode marker is no longer unique; update the extractor deliberately');
}

const canonicalTypographyBlock = canonicalFile.slice(start, end).trim();
const internalTypographyBlock = canonicalTypographyBlock
  .replace('export type MotionIntensity', 'type MotionIntensity')
  .replace('export type TypographyRevealMode', 'type TypographyRevealMode')
  .replace('export function TypographyRevealEngine', 'function TypographyRevealEngine');

if (internalTypographyBlock.includes('export function TypographyRevealEngine')) {
  throw new Error('TypographyRevealEngine export was not internalized');
}

const elementSource = `import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

${internalTypographyBlock}

/**
 * Motion Zukan: type-mask-reveal
 * Derived from the canonical TypographyRevealEngine implementation.
 * Keep the motion implementation above generated from engines.tsx; do not fork it here.
 */
export function WeddingMaskRevealElement({
  text = 'WELCOME',
  intensity = 'M',
  transparent = true,
}: {
  text?: string;
  intensity?: MotionIntensity;
  transparent?: boolean;
}) {
  return (
    <TypographyRevealEngine
      text={text}
      intensity={intensity}
      mode="mask"
      transparent={transparent}
    />
  );
}
`;

for (const forbidden of ["from './", 'from "./', "from '../", 'from "../']) {
  if (elementSource.includes(forbidden)) {
    throw new Error(`Generated Element source contains a private relative import: ${forbidden}`);
  }
}

const exportedComponents = Array.from(
  elementSource.matchAll(/export\s+(?:const|function)\s+([A-Z_$][A-Za-z0-9_$]*)\b/g),
).map((match) => match[1]);
if (exportedComponents.length !== 1 || exportedComponents[0] !== 'WeddingMaskRevealElement') {
  throw new Error(`Expected exactly one exported named React component, got: ${exportedComponents.join(', ')}`);
}

const canonicalBlockSha256 = createHash('sha256').update(canonicalTypographyBlock).digest('hex');
const elementSourceSha256 = createHash('sha256').update(elementSource).digest('hex');

mkdirSync(outputDir, {recursive: true});
writeFileSync(sourceOutputPath, elementSource);

// Keep @remotion/studio-protocol out of the production dependency graph for this
// candidate run. CI installs the official 4.0.517 package ephemerally, then this
// dynamic import invokes its real createElementPayload() implementation.
type CreateElementPayload = (input: {
  displayName: string;
  slug: string;
  sourceCode: string;
  dependencies: Array<{name: string; version: string | null}>;
  dimensions: {width: number; height: number} | null;
  durationInFrames: number;
  installationMode?: 'wrapped' | 'component-owned-sequence';
}) => unknown;

const dynamicImport = new Function('specifier', 'return import(specifier)') as (
  specifier: string,
) => Promise<{createElementPayload?: CreateElementPayload}>;

let protocol: {createElementPayload?: CreateElementPayload};
try {
  protocol = await dynamicImport('@remotion/studio-protocol');
} catch (error) {
  throw new Error(
    'Official @remotion/studio-protocol is required to validate the Element payload. Install it only in the bounded candidate environment.',
    {cause: error},
  );
}

if (typeof protocol.createElementPayload !== 'function') {
  throw new Error('Official @remotion/studio-protocol does not expose createElementPayload()');
}

const payload = protocol.createElementPayload({
  displayName: 'Wedding Mask Reveal',
  slug: 'wedding/mask-reveal',
  sourceCode: elementSource,
  dependencies: [],
  dimensions: {width: 1280, height: 720},
  durationInFrames: 120,
  installationMode: 'wrapped',
});

writeFileSync(payloadOutputPath, `${JSON.stringify(payload, null, 2)}\n`);
writeFileSync(
  manifestOutputPath,
  `${JSON.stringify(
    {
      patternId: 'type-mask-reveal',
      legacyPresetId: 'type-mask-slide',
      canonicalSource: 'src/motion-kit/engines.tsx#TypographyRevealEngine',
      canonicalBlockSha256,
      elementSourceSha256,
      elementComponent: 'WeddingMaskRevealElement',
      sourceStrategy: 'DERIVED_FROM_CANONICAL_ENGINE_PLUS_THIN_WRAPPER',
      dependencies: [],
      dimensions: {width: 1280, height: 720},
      fpsForExistingConceptPreview: 30,
      durationInFrames: 120,
      installationMode: 'wrapped',
      officialValidator: '@remotion/studio-protocol createElementPayload()',
      actualStudioInstallState: 'NOT_RUN',
      guardrails: [
        'ELEMENT_PAYLOAD_VALID != STUDIO_INSTALL_VERIFIED',
        'DERIVED_SOURCE != SECOND_MOTION_IMPLEMENTATION',
        'REMOTION_PROVIDED_PACKAGES != ELEMENT_DEPENDENCIES',
      ],
    },
    null,
    2,
  )}\n`,
);

console.log('✅ Mask Reveal Element payload validated by official createElementPayload().');
console.log(`source=${sourceOutputPath}`);
console.log(`payload=${payloadOutputPath}`);
console.log(`canonicalBlockSha256=${canonicalBlockSha256}`);
console.log(`elementSourceSha256=${elementSourceSha256}`);
console.log('dependencies=0');
console.log('actualStudioInstallState=NOT_RUN');
