import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {join} from 'node:path';

const root = process.cwd();
const outputDir = join(root, 'out/research/remotion-elements/mask-reveal');
const source = readFileSync(join(outputDir, 'mask-reveal.element-source.tsx'), 'utf8');
const payload = JSON.parse(
  readFileSync(join(outputDir, 'mask-reveal.element-payload.json'), 'utf8'),
) as {
  type?: string;
  version?: number;
  durationInFrames?: number;
  element?: {
    slug?: string;
    displayName?: string;
    sourceCode?: string;
    dependencies?: unknown[];
    dimensions?: {width?: number; height?: number} | null;
    durationInFrames?: number;
    installationMode?: string;
  };
};
const manifest = JSON.parse(readFileSync(join(outputDir, 'manifest.json'), 'utf8')) as {
  patternId?: string;
  legacyPresetId?: string;
  canonicalSource?: string;
  canonicalBlockSha256?: string;
  elementSourceSha256?: string;
  elementComponent?: string;
  sourceStrategy?: string;
  dependencies?: unknown[];
  dimensions?: {width?: number; height?: number};
  fpsForExistingConceptPreview?: number;
  durationInFrames?: number;
  installationMode?: string;
  officialValidator?: string;
  actualStudioInstallState?: string;
};

const errors: string[] = [];
const fail = (message: string) => errors.push(message);

if (payload.type !== 'remotion-element' || payload.version !== 1) {
  fail(`unexpected official payload envelope: ${payload.type}@${payload.version}`);
}
if (payload.element?.slug !== 'wedding/mask-reveal') fail('unexpected Element slug');
if (payload.element?.displayName !== 'Wedding Mask Reveal') fail('unexpected Element displayName');
if (payload.element?.installationMode !== 'wrapped') fail('Mask Reveal must use wrapped installation mode');
if (payload.element?.dimensions?.width !== 1280 || payload.element?.dimensions?.height !== 720) {
  fail('Element dimensions must match the existing 1280x720 concept preview');
}
if (payload.element?.durationInFrames !== 120 && payload.durationInFrames !== 120) {
  fail('Element duration must match the existing 120-frame concept preview');
}
if (!Array.isArray(payload.element?.dependencies) || payload.element.dependencies.length !== 0) {
  fail('Mask Reveal Element must have zero declared dependencies; remotion is project-provided');
}
if (payload.element?.sourceCode !== source) fail('payload sourceCode differs from generated source artifact');

for (const required of [
  "from 'remotion'",
  'function TypographyRevealEngine',
  'export function WeddingMaskRevealElement',
  'mode="mask"',
  "text = 'WELCOME'",
  "intensity = 'M'",
]) {
  if (!source.includes(required)) fail(`generated source missing: ${required}`);
}
for (const forbidden of [
  "from './",
  'from "./',
  "from '../",
  'from "../',
  'process.env',
  'http://',
  'https://',
]) {
  if (source.includes(forbidden)) fail(`generated source contains forbidden portability/privacy token: ${forbidden}`);
}

const exportedComponents = Array.from(
  source.matchAll(/export\s+(?:const|function)\s+([A-Z_$][A-Za-z0-9_$]*)\b/g),
).map((match) => match[1]);
if (exportedComponents.length !== 1 || exportedComponents[0] !== 'WeddingMaskRevealElement') {
  fail(`expected exactly one exported named component, got ${exportedComponents.join(', ')}`);
}

const sourceSha256 = createHash('sha256').update(source).digest('hex');
if (manifest.elementSourceSha256 !== sourceSha256) fail('element source hash does not match manifest');
if (manifest.patternId !== 'type-mask-reveal') fail('manifest patternId drifted');
if (manifest.legacyPresetId !== 'type-mask-slide') fail('manifest legacy preset drifted');
if (manifest.canonicalSource !== 'src/motion-kit/engines.tsx#TypographyRevealEngine') fail('canonical source locator drifted');
if (manifest.elementComponent !== 'WeddingMaskRevealElement') fail('manifest component name drifted');
if (manifest.sourceStrategy !== 'DERIVED_FROM_CANONICAL_ENGINE_PLUS_THIN_WRAPPER') fail('source strategy must remain derived, not copied');
if (!Array.isArray(manifest.dependencies) || manifest.dependencies.length !== 0) fail('manifest dependencies must remain empty');
if (manifest.dimensions?.width !== 1280 || manifest.dimensions?.height !== 720) fail('manifest dimensions drifted');
if (manifest.fpsForExistingConceptPreview !== 30 || manifest.durationInFrames !== 120) fail('manifest preview timing drifted');
if (manifest.installationMode !== 'wrapped') fail('manifest installation mode drifted');
if (manifest.officialValidator !== '@remotion/studio-protocol createElementPayload()') fail('official validator provenance missing');
if (manifest.actualStudioInstallState !== 'NOT_RUN') fail('payload generation must not fabricate Studio install success');

const engine = readFileSync(join(root, 'src/motion-kit/engines.tsx'), 'utf8');
const start = engine.indexOf('export type MotionIntensity');
const end = engine.indexOf('export type CameraTransformMode');
if (start < 0 || end <= start) {
  fail('cannot independently locate canonical TypographyRevealEngine block');
} else {
  const canonicalBlockSha256 = createHash('sha256')
    .update(engine.slice(start, end).trim())
    .digest('hex');
  if (manifest.canonicalBlockSha256 !== canonicalBlockSha256) {
    fail('manifest canonical block hash does not match current engines.tsx');
  }
}

if (errors.length > 0) {
  console.error(`Mask Reveal Element artifact FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('✅ Mask Reveal Element artifact is canonical-derived, dependency-free, official-validator-backed and still honestly NOT_RUN for Studio install.');
console.log(`elementSourceSha256=${sourceSha256}`);
console.log('patternId=type-mask-reveal');
console.log('dependencies=0');
console.log('actualStudioInstallState=NOT_RUN');
