import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {join} from 'node:path';

export type TypographyElementCheck = {
  outputSlug: string;
  patternId: string;
  legacyPresetId: string | null;
  mode: string;
  payloadSlug: string;
  displayName: string;
  componentName: string;
  componentIdentity: string;
  defaultText: string;
};

export const checkTypographyElement = (config: TypographyElementCheck) => {
  const root = process.cwd();
  const outputDir = join(root, 'out/research/remotion-elements', config.outputSlug);
  const source = readFileSync(join(outputDir, `${config.outputSlug}.element-source.tsx`), 'utf8');
  const payload = JSON.parse(readFileSync(join(outputDir, `${config.outputSlug}.element-payload.json`), 'utf8')) as any;
  const manifest = JSON.parse(readFileSync(join(outputDir, 'manifest.json'), 'utf8')) as any;
  const errors: string[] = [];
  const fail = (message: string) => errors.push(message);

  if (payload.type !== 'remotion-element' || payload.version !== 1) fail('unexpected official payload envelope');
  if (payload.element?.slug !== config.payloadSlug) fail('unexpected Element slug');
  if (payload.element?.displayName !== config.displayName) fail('unexpected Element displayName');
  if (payload.element?.sourceCode !== source) fail('payload sourceCode differs from generated source');
  if (payload.element?.installationMode !== 'wrapped') fail('Element installation mode must remain wrapped');
  if (payload.element?.dimensions?.width !== 1280 || payload.element?.dimensions?.height !== 720) fail('Element dimensions drifted');
  if (payload.element?.durationInFrames !== 120 && payload.durationInFrames !== 120) fail('Element duration drifted');
  if (!Array.isArray(payload.element?.dependencies) || payload.element.dependencies.length !== 0) fail('Element dependencies must remain empty');

  for (const token of [
    'function TypographyRevealEngine',
    "type TypographyRevealExit = 'none' | 'fade'",
    'Interactive.withSchema',
    "type: 'text-content'",
    "description: '表示テキスト'",
    "type: 'enum'",
    "description: '動きの強さ (S=やさしい / M=標準 / L=強い)'",
    "type: 'color'",
    "description: '文字色'",
    `componentIdentity: '${config.componentIdentity}'`,
    `export const ${config.componentName}`,
    `mode=\"${config.mode}\"`,
    `text=\"${config.defaultText}\"`,
    'color={color}',
    'exitAnimation="fade"',
  ]) if (!source.includes(token)) fail(`generated source missing: ${token}`);

  for (const forbidden of ["from './", 'from "./', "from '../", 'from "../', 'process.env', 'http://', 'https://', 'transparent: {']) {
    if (source.includes(forbidden)) fail(`generated source contains forbidden token: ${forbidden}`);
  }

  const exports = Array.from(source.matchAll(/export\s+(?:const|function)\s+([A-Z_$][A-Za-z0-9_$]*)\b/g)).map((m) => m[1]);
  if (exports.length !== 1 || exports[0] !== config.componentName) fail(`unexpected exported components: ${exports.join(', ')}`);

  if (manifest.patternId !== config.patternId) fail('manifest patternId drifted');
  if (manifest.legacyPresetId !== config.legacyPresetId) fail('manifest legacyPresetId drifted');
  if (manifest.canonicalMode !== config.mode) fail('manifest canonicalMode drifted');
  if (manifest.elementComponent !== config.componentName) fail('manifest component drifted');
  if (manifest.sourceStrategy !== 'DERIVED_FROM_SHARED_CANONICAL_TYPOGRAPHY_ELEMENT_KIT') fail('shared source strategy missing');
  if (manifest.officialValidator !== '@remotion/studio-protocol createElementPayload()') fail('official validator provenance missing');
  if (manifest.dimensions?.width !== 1280 || manifest.dimensions?.height !== 720) fail('manifest dimensions drifted');
  if (manifest.fpsForExistingConceptPreview !== 30 || manifest.durationInFrames !== 120) fail('manifest timing drifted');
  if (manifest.installationMode !== 'wrapped') fail('manifest installation mode drifted');
  if (manifest.actualStudioInstallState !== 'NOT_RUN') fail('Studio Actual must not be fabricated');
  if (manifest.productionReadiness !== 'CANDIDATE_NEEDS_STUDIO_ACTUAL') fail('candidate readiness must stay gated by Studio Actual');

  const interactive = manifest.studioInteractivity;
  if (interactive?.mechanism !== 'Interactive.withSchema()') fail('Studio interactivity mechanism drifted');
  if (interactive?.textLabel !== '表示テキスト') fail('text label drifted');
  if (interactive?.intensityLabel !== '動きの強さ (S=やさしい / M=標準 / L=強い)') fail('intensity label drifted');
  if (interactive?.colorLabel !== '文字色') fail('color label drifted');
  if (interactive?.transformSchema !== true) fail('transform schema must stay enabled');
  if (interactive?.colorControl !== 'CANONICAL_ENGINE_BACKED') fail('color control must remain canonical-backed');
  if (interactive?.transparentControl !== 'INTENTIONALLY_NOT_EXPOSED_TECHNICAL_SETTING') fail('transparent control honesty marker drifted');
  if (interactive?.actualStudioControlReadback !== 'NOT_RUN') fail('Studio control readback must remain NOT_RUN');
  for (const field of ['text', 'intensity', 'color', 'style.translate', 'style.scale', 'style.rotate', 'style.opacity']) {
    if (!interactive?.editableFields?.includes(field)) fail(`missing editable field: ${field}`);
  }

  const exit = manifest.exitAnimation;
  if (exit?.mode !== 'CANONICAL_FADE') fail('exit mode must remain canonical fade');
  if (exit?.approximateDurationSeconds !== 0.35) fail('exit duration contract drifted');
  if (exit?.elementOnlyImplementation !== false) fail('exit must not become wrapper-only');
  if (exit?.userControl !== 'INTENTIONALLY_NOT_EXPOSED_FIXED_TEMPORARY_OVERLAY_BEHAVIOR') fail('exit control honesty marker drifted');

  for (const guardrail of [
    'ELEMENT_PAYLOAD_VALID != STUDIO_INSTALL_VERIFIED',
    'INTERACTIVE_SCHEMA_PRESENT != STUDIO_CONTROL_READBACK_VERIFIED',
    'DERIVED_SOURCE != SECOND_MOTION_IMPLEMENTATION',
    'COLOR_CONTROL_REQUIRES_CANONICAL_ENGINE_PROP',
    'SHARED_ELEMENT_KIT != SHARED_MOTION_IMPLEMENTATION',
    'ELEMENT_EXIT_USES_CANONICAL_ENGINE != ELEMENT_ONLY_DIVERGENCE',
    'REMOTION_PROVIDED_PACKAGES != ELEMENT_DEPENDENCIES',
  ]) if (!manifest.guardrails?.includes(guardrail)) fail(`missing guardrail: ${guardrail}`);

  const sourceSha = createHash('sha256').update(source).digest('hex');
  if (manifest.elementSourceSha256 !== sourceSha) fail('source hash mismatch');
  const engine = readFileSync(join(root, 'src/motion-kit/engines.tsx'), 'utf8');
  const start = engine.indexOf('export type MotionIntensity');
  const end = engine.indexOf('export type CameraTransformMode');
  if (start < 0 || end <= start) {
    fail('cannot locate canonical TypographyRevealEngine block');
  } else {
    const canonical = engine.slice(start, end).trim();
    const canonicalSha = createHash('sha256').update(canonical).digest('hex');
    if (manifest.canonicalBlockSha256 !== canonicalSha) fail('canonical block hash mismatch');
    for (const token of ["color = '#fff'", "exitAnimation = 'none'", "exitAnimation === 'fade'"]) {
      if (!canonical.includes(token)) fail(`canonical safe default missing: ${token}`);
    }
  }

  if (errors.length) {
    console.error(`${config.patternId} Element FAILED (${errors.length})`);
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }

  console.log(`✅ ${config.patternId} Element shares canonical Typography engine and preserves the Run45 evidence contract.`);
  console.log(`elementSourceSha256=${sourceSha}`);
  console.log('colorControl=CANONICAL_ENGINE_BACKED');
  console.log('exitAnimation=CANONICAL_FADE');
  console.log('actualStudioControlReadback=NOT_RUN');
  console.log('actualStudioInstallState=NOT_RUN');
};
