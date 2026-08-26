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
  if (!Array.isArray(payload.element?.dependencies) || payload.element.dependencies.length !== 0) fail('Element dependencies must remain empty');

  for (const token of [
    'function TypographyRevealEngine',
    'Interactive.withSchema',
    "type: 'text-content'",
    "type: 'enum'",
    "type: 'color'",
    `componentIdentity: '${config.componentIdentity}'`,
    `export const ${config.componentName}`,
    `mode=\"${config.mode}\"`,
    `text=\"${config.defaultText}\"`,
    'color={color}',
    'exitAnimation="fade"',
  ]) if (!source.includes(token)) fail(`generated source missing: ${token}`);

  for (const forbidden of ["from './", 'from "./', "from '../", 'from "../', 'process.env', 'http://', 'https://']) {
    if (source.includes(forbidden)) fail(`generated source contains forbidden token: ${forbidden}`);
  }

  const exports = Array.from(source.matchAll(/export\s+(?:const|function)\s+([A-Z_$][A-Za-z0-9_$]*)\b/g)).map((m) => m[1]);
  if (exports.length !== 1 || exports[0] !== config.componentName) fail(`unexpected exported components: ${exports.join(', ')}`);

  if (manifest.patternId !== config.patternId) fail('manifest patternId drifted');
  if (manifest.legacyPresetId !== config.legacyPresetId) fail('manifest legacyPresetId drifted');
  if (manifest.canonicalMode !== config.mode) fail('manifest canonicalMode drifted');
  if (manifest.elementComponent !== config.componentName) fail('manifest component drifted');
  if (manifest.sourceStrategy !== 'DERIVED_FROM_SHARED_CANONICAL_TYPOGRAPHY_ELEMENT_KIT') fail('shared source strategy missing');
  if (manifest.actualStudioInstallState !== 'NOT_RUN') fail('Studio Actual must not be fabricated');
  if (manifest.studioInteractivity?.actualStudioControlReadback !== 'NOT_RUN') fail('Studio control readback must remain NOT_RUN');
  if (manifest.exitAnimation?.mode !== 'CANONICAL_FADE' || manifest.exitAnimation?.elementOnlyImplementation !== false) fail('exit must remain canonical-backed');
  for (const field of ['text', 'intensity', 'color', 'style.translate', 'style.scale', 'style.rotate', 'style.opacity']) {
    if (!manifest.studioInteractivity?.editableFields?.includes(field)) fail(`missing editable field: ${field}`);
  }

  const sourceSha = createHash('sha256').update(source).digest('hex');
  if (manifest.elementSourceSha256 !== sourceSha) fail('source hash mismatch');
  const engine = readFileSync(join(root, 'src/motion-kit/engines.tsx'), 'utf8');
  const start = engine.indexOf('export type MotionIntensity');
  const end = engine.indexOf('export type CameraTransformMode');
  const canonical = engine.slice(start, end).trim();
  const canonicalSha = createHash('sha256').update(canonical).digest('hex');
  if (manifest.canonicalBlockSha256 !== canonicalSha) fail('canonical block hash mismatch');

  if (errors.length) {
    console.error(`${config.patternId} Element FAILED (${errors.length})`);
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }

  console.log(`✅ ${config.patternId} Element shares canonical Typography engine and truthful Studio boundary.`);
  console.log(`elementSourceSha256=${sourceSha}`);
  console.log('actualStudioControlReadback=NOT_RUN');
  console.log('actualStudioInstallState=NOT_RUN');
};
