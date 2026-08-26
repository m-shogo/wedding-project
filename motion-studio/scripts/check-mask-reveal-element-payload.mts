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
  studioInteractivity?: {
    mechanism?: string;
    editableFields?: string[];
    textLabel?: string;
    intensityLabel?: string;
    colorLabel?: string;
    transformSchema?: boolean;
    colorControl?: string;
    transparentControl?: string;
    actualStudioControlReadback?: string;
  };
  exitAnimation?: {
    mode?: string;
    approximateDurationSeconds?: number;
    elementOnlyImplementation?: boolean;
    userControl?: string;
  };
  productionReadiness?: string;
  actualStudioInstallState?: string;
  guardrails?: string[];
};

const errors: string[] = [];
const fail = (message: string) => errors.push(message);

if (payload.type !== 'remotion-element' || payload.version !== 1) {
  fail(`unexpected official payload envelope: ${payload.type}@${payload.version}`);
}
if (payload.element?.slug !== 'wedding/mask-reveal') fail('unexpected Element slug');
if (payload.element?.displayName !== 'Wedding Mask Reveal') fail('unexpected Element displayName');
if (payload.element?.installationMode !== 'wrapped') {
  fail('Mask Reveal must remain wrapped unless component-owned Sequence is deliberately revalidated');
}
if (payload.element?.dimensions?.width !== 1280 || payload.element?.dimensions?.height !== 720) {
  fail('Element dimensions must match the existing 1280x720 concept preview');
}
if (payload.element?.durationInFrames !== 120 && payload.durationInFrames !== 120) {
  fail('Element duration must match the existing 120-frame concept preview');
}
if (!Array.isArray(payload.element?.dependencies) || payload.element.dependencies.length !== 0) {
  fail('Mask Reveal Element must have zero declared dependencies; react/remotion are project-provided');
}
if (payload.element?.sourceCode !== source) fail('payload sourceCode differs from generated source artifact');

for (const required of [
  "from 'react'",
  "from 'remotion'",
  'function TypographyRevealEngine',
  "type TypographyRevealExit = 'none' | 'fade'",
  "color = '#fff'",
  "exitAnimation = 'none'",
  "exitAnimation === 'fade'",
  'Interactive.withSchema',
  'Interactive.baseSchema',
  'Interactive.transformSchema',
  "type: 'text-content'",
  "description: '表示テキスト'",
  "type: 'enum'",
  "description: '動きの強さ (S=やさしい / M=標準 / L=強い)'",
  "type: 'color'",
  "description: '文字色'",
  "componentIdentity: 'com.wedding.motion-zukan.mask-reveal'",
  'const WeddingMaskRevealLayerInner = forwardRef',
  '<Sequence',
  'controls={controls}',
  'outlineRef={outlineRef}',
  'export const WeddingMaskRevealElement',
  'mode="mask"',
  'text="WELCOME"',
  'intensity="M"',
  'color="#ffffff"',
  'color={color}',
  'exitAnimation="fade"',
  "translate: '0px 0px'",
  'scale: 1',
  "rotate: '0deg'",
  'opacity: 1',
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
  'transparent: {',
]) {
  if (source.includes(forbidden)) fail(`generated source contains forbidden portability/honesty token: ${forbidden}`);
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
if (manifest.sourceStrategy !== 'DERIVED_FROM_CANONICAL_ENGINE_PLUS_INTERACTIVE_WRAPPER') {
  fail('source strategy must remain canonical-derived plus interactive wrapper');
}
if (!Array.isArray(manifest.dependencies) || manifest.dependencies.length !== 0) fail('manifest dependencies must remain empty');
if (manifest.dimensions?.width !== 1280 || manifest.dimensions?.height !== 720) fail('manifest dimensions drifted');
if (manifest.fpsForExistingConceptPreview !== 30 || manifest.durationInFrames !== 120) fail('manifest preview timing drifted');
if (manifest.installationMode !== 'wrapped') fail('manifest installation mode drifted');
if (manifest.officialValidator !== '@remotion/studio-protocol createElementPayload()') fail('official validator provenance missing');
if (manifest.actualStudioInstallState !== 'NOT_RUN') fail('payload generation must not fabricate Studio install success');

const interactive = manifest.studioInteractivity;
if (interactive?.mechanism !== 'Interactive.withSchema()') fail('Studio interactivity mechanism is not official Interactive.withSchema()');
for (const field of ['text', 'intensity', 'color', 'style.translate', 'style.scale', 'style.rotate', 'style.opacity']) {
  if (!interactive?.editableFields?.includes(field)) fail(`missing intended human-editable field: ${field}`);
}
if (interactive?.textLabel !== '表示テキスト') fail('Japanese-first text control label drifted');
if (interactive?.intensityLabel !== '動きの強さ (S=やさしい / M=標準 / L=強い)') fail('Japanese-first intensity control label drifted');
if (interactive?.colorLabel !== '文字色') fail('Japanese-first color control label drifted');
if (interactive?.transformSchema !== true) fail('transform schema must remain enabled');
if (interactive?.colorControl !== 'CANONICAL_ENGINE_BACKED') {
  fail('color control must remain backed by canonical TypographyRevealEngine');
}
if (interactive?.transparentControl !== 'INTENTIONALLY_NOT_EXPOSED_TECHNICAL_SETTING') {
  fail('transparent technical setting should not become user-facing by accident');
}
if (interactive?.actualStudioControlReadback !== 'NOT_RUN') fail('Studio control readback must remain NOT_RUN before local Actual');

const exit = manifest.exitAnimation;
if (exit?.mode !== 'CANONICAL_FADE') fail('Element exit must use the canonical fade capability');
if (exit?.approximateDurationSeconds !== 0.35) fail('Element exit duration contract drifted');
if (exit?.elementOnlyImplementation !== false) fail('Element exit must not be implemented only in the wrapper');
if (exit?.userControl !== 'INTENTIONALLY_NOT_EXPOSED_FIXED_TEMPORARY_OVERLAY_BEHAVIOR') {
  fail('exit behavior should remain a fixed treatment behavior rather than a noisy first-level control');
}
if (manifest.productionReadiness !== 'CANDIDATE_NEEDS_STUDIO_ACTUAL') {
  fail('candidate must remain unpromoted until Studio Actual is complete');
}

for (const guardrail of [
  'ELEMENT_PAYLOAD_VALID != STUDIO_INSTALL_VERIFIED',
  'INTERACTIVE_SCHEMA_PRESENT != STUDIO_CONTROL_READBACK_VERIFIED',
  'DERIVED_SOURCE != SECOND_MOTION_IMPLEMENTATION',
  'COLOR_CONTROL_REQUIRES_CANONICAL_ENGINE_PROP',
  'ELEMENT_EXIT_USES_CANONICAL_ENGINE != ELEMENT_ONLY_DIVERGENCE',
  'REMOTION_PROVIDED_PACKAGES != ELEMENT_DEPENDENCIES',
]) {
  if (!manifest.guardrails?.includes(guardrail)) fail(`missing Element guardrail: ${guardrail}`);
}

const engine = readFileSync(join(root, 'src/motion-kit/engines.tsx'), 'utf8');
const start = engine.indexOf('export type MotionIntensity');
const end = engine.indexOf('export type CameraTransformMode');
if (start < 0 || end <= start) {
  fail('cannot independently locate canonical TypographyRevealEngine block');
} else {
  const canonicalBlock = engine.slice(start, end).trim();
  const canonicalBlockSha256 = createHash('sha256').update(canonicalBlock).digest('hex');
  if (manifest.canonicalBlockSha256 !== canonicalBlockSha256) {
    fail('manifest canonical block hash does not match current engines.tsx');
  }
  for (const token of [
    "color = '#fff'",
    "exitAnimation = 'none'",
    "color?: string",
    'exitAnimation?: TypographyRevealExit',
    "exitAnimation === 'fade'",
    'opacity: exitOpacity',
  ]) {
    if (!canonicalBlock.includes(token)) fail(`canonical TypographyRevealEngine missing safe color/exit contract: ${token}`);
  }
}

if (errors.length > 0) {
  console.error(`Mask Reveal Element artifact FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('✅ Mask Reveal Element is canonical-derived, official-validator-backed, color-editable and uses canonical exit fade without fabricating Studio Actual.');
console.log(`elementSourceSha256=${sourceSha256}`);
console.log('patternId=type-mask-reveal');
console.log('dependencies=0');
console.log('studioInteractivity=INTERACTIVE_SCHEMA_CANDIDATE');
console.log('colorControl=CANONICAL_ENGINE_BACKED');
console.log('exitAnimation=CANONICAL_FADE');
console.log('actualStudioControlReadback=NOT_RUN');
console.log('actualStudioInstallState=NOT_RUN');
