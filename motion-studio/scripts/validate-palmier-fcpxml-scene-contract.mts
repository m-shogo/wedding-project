import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {palmierFcpxmlSyntheticSceneSpec} from '../src/data/resolveCanaryInputFixtures.ts';

const args = process.argv.slice(2);

function valueFor(flag: string) {
  const index = args.indexOf(flag);
  if (index < 0) return undefined;
  const value = args[index + 1];
  if (!value || value.startsWith('--')) throw new Error(`${flag} requires a value.`);
  return value;
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function titleBlock(text: string, title: string) {
  const marker = escapeRegex(title);
  const match = text.match(new RegExp(`<title\\b[^>]*\\bname=["']${marker}["'][^>]*>([\\s\\S]*?)<\\/title>`, 'i'));
  return match?.[1] ?? null;
}

function nestedMediaId(text: string, timelineName: string) {
  const marker = escapeRegex(timelineName);
  const match = text.match(new RegExp(`<media\\b[^>]*\\bid=["']([^"']+)["'][^>]*\\bname=["']${marker}["'][^>]*>`, 'i'));
  return match?.[1] ?? null;
}

function requireMatch(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

try {
  const rawPath = valueFor('--fcpxml');
  if (!rawPath) throw new Error('Usage: node --no-warnings scripts/validate-palmier-fcpxml-scene-contract.mts --fcpxml <FILE.fcpxml>');

  const path = resolve(process.cwd(), rawPath);
  const text = readFileSync(path, 'utf8').replace(/^\uFEFF/, '');
  const version = text.match(/<fcpxml\b[^>]*\bversion=["']([^"']+)["']/i)?.[1] ?? null;
  requireMatch(version, 'Missing FCPXML root/version.');

  const markers = palmierFcpxmlSyntheticSceneSpec.markerContract;

  const independentScaleBlock = titleBlock(text, markers.independentTextScaleTitle);
  requireMatch(independentScaleBlock, `Missing title marker: ${markers.independentTextScaleTitle}`);
  requireMatch(
    /<param\b[^>]*\bname=["']scale["'][^>]*>/i.test(independentScaleBlock),
    `${markers.independentTextScaleTitle}: expected title-local scale param is missing.`,
  );
  requireMatch(
    /<keyframeAnimation\b/i.test(independentScaleBlock) && /<keyframe\b/i.test(independentScaleBlock),
    `${markers.independentTextScaleTitle}: expected scale keyframe animation is missing.`,
  );

  const titleBoxBlock = titleBlock(text, markers.titleBoxTransformProbeTitle);
  requireMatch(titleBoxBlock, `Missing title marker: ${markers.titleBoxTransformProbeTitle}`);
  const titleBoxTransform = titleBoxBlock.match(/<adjust-transform\b[^>]*>/i)?.[0] ?? null;
  requireMatch(titleBoxTransform, `${markers.titleBoxTransformProbeTitle}: expected adjust-transform node is missing.`);
  requireMatch(
    /\bscale=["']1 1["']/i.test(titleBoxTransform),
    `${markers.titleBoxTransformProbeTitle}: title-box transform unexpectedly exported a non-unity adjust-transform scale.`,
  );
  requireMatch(
    !/\brotation=/i.test(titleBoxTransform),
    `${markers.titleBoxTransformProbeTitle}: title-box rotation unexpectedly appeared on adjust-transform.`,
  );

  const nestedNames = [markers.nestedTimelineLevel1Name, markers.nestedTimelineLevel2Name];
  const nested = nestedNames.map((name) => {
    const mediaId = nestedMediaId(text, name);
    requireMatch(mediaId, `Missing nested timeline media resource: ${name}`);
    const refRegex = new RegExp(`<ref-clip\\b[^>]*\\bref=["']${escapeRegex(mediaId)}["'][^>]*>`, 'i');
    requireMatch(refRegex.test(text), `Nested timeline ${name} has media resource ${mediaId} but no ref-clip carrier.`);
    return {name, mediaId};
  });

  requireMatch(
    nested.length >= markers.minimumNestedTimelineResources,
    `Expected at least ${markers.minimumNestedTimelineResources} nested timeline resources.`,
  );

  const result = {
    schemaVersion: 'palmier-canary-fcpxml-scene-contract/v2',
    canaryId: palmierFcpxmlSyntheticSceneSpec.canaryId,
    fixtureId: palmierFcpxmlSyntheticSceneSpec.fixtureId,
    fcpxmlVersion: version,
    contractResult: 'PASS',
    observed: {
      independentTextScale: {
        title: markers.independentTextScaleTitle,
        titleScaleParamDetected: true,
        keyframeAnimationDetected: true,
      },
      titleBoxTransformOmissionProbe: {
        title: markers.titleBoxTransformProbeTitle,
        adjustTransformDetected: true,
        unityScaleDetected: true,
        rotationAttributeAbsent: true,
      },
      nestedTimelines: nested,
    },
    provenance: 'UNVERIFIED_BY_SCENE_CONTRACT',
    resolveRuntime: 'NOT_RUN',
    guardrails: [
      'SCENE_MARKER_MATCH != REAL_PALMIER_PROVENANCE',
      'SCENE_CONTRACT_PASS != RESOLVE_IMPORT_VERIFIED',
      'FCPXML_PARAM_EMITTED != RESOLVE_TITLE_PARITY',
      'FCPXML_NEST_STRUCTURE_TESTED != RESOLVE_COMPOUND_IMPORT_VERIFIED',
    ],
  } as const;

  console.log(JSON.stringify(result, null, 2));
} catch (error) {
  console.error(`❌ ${error instanceof Error ? error.message : error}`);
  process.exit(1);
}
