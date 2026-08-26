import {createHash} from 'node:crypto';
import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';

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

const elementSource = `import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {
  AbsoluteFill,
  Easing,
  Interactive,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  type InteractiveBaseProps,
  type InteractiveTransformProps,
  type InteractivitySchema,
  type SequenceControls,
} from 'remotion';

${internalTypographyBlock}

type WeddingMaskRevealLayerProps = InteractiveBaseProps &
  InteractiveTransformProps & {
    readonly text?: string;
    readonly intensity?: MotionIntensity;
  };

const weddingMaskRevealSchema = {
  ...Interactive.baseSchema,
  text: {
    type: 'text-content',
    default: 'WELCOME',
    description: '表示テキスト',
  },
  intensity: {
    type: 'enum',
    default: 'M',
    description: '動きの強さ (S=やさしい / M=標準 / L=強い)',
    keyframable: false,
    variants: {
      S: {},
      M: {},
      L: {},
    },
  },
  ...Interactive.transformSchema,
} as const satisfies InteractivitySchema;

const WeddingMaskRevealLayerInner = forwardRef<
  HTMLDivElement,
  WeddingMaskRevealLayerProps & {
    readonly controls: SequenceControls | undefined;
  }
>(
  (
    {
      controls,
      text = 'WELCOME',
      intensity = 'M',
      name,
      style,
      ...sequenceProps
    },
    ref,
  ) => {
    const outlineRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => outlineRef.current as HTMLDivElement, []);

    return (
      <Sequence
        layout="none"
        {...sequenceProps}
        controls={controls}
        name={name ?? '<WeddingMaskReveal>'}
        outlineRef={outlineRef}
      >
        <div
          ref={outlineRef}
          style={{
            position: 'relative',
            width: 1280,
            height: 720,
            overflow: 'hidden',
            ...style,
          }}
        >
          <TypographyRevealEngine
            text={text}
            intensity={intensity}
            mode="mask"
            transparent
          />
        </div>
      </Sequence>
    );
  },
);

const InteractiveWeddingMaskRevealLayer = Interactive.withSchema({
  Component: WeddingMaskRevealLayerInner,
  componentName: '<WeddingMaskReveal>',
  componentIdentity: 'com.wedding.motion-zukan.mask-reveal',
  schema: weddingMaskRevealSchema,
  supportsEffects: false,
});

/**
 * Motion Zukan: type-mask-reveal
 * Canonical motion implementation is generated from TypographyRevealEngine above.
 * Studio-facing customization is delegated to Remotion Interactive.withSchema().
 */
export const WeddingMaskRevealElement: React.FC = () => {
  return (
    <InteractiveWeddingMaskRevealLayer
      text="WELCOME"
      intensity="M"
      name="Mask Reveal"
      style={{
        translate: '0px 0px',
        scale: 1,
        rotate: '0deg',
        opacity: 1,
      }}
    />
  );
};
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
      sourceStrategy: 'DERIVED_FROM_CANONICAL_ENGINE_PLUS_INTERACTIVE_WRAPPER',
      dependencies: [],
      dimensions: {width: 1280, height: 720},
      fpsForExistingConceptPreview: 30,
      durationInFrames: 120,
      installationMode: 'wrapped',
      officialValidator: '@remotion/studio-protocol createElementPayload()',
      studioInteractivity: {
        mechanism: 'Interactive.withSchema()',
        editableFields: [
          'text',
          'intensity',
          'style.translate',
          'style.scale',
          'style.rotate',
          'style.opacity',
        ],
        textLabel: '表示テキスト',
        intensityLabel: '動きの強さ (S=やさしい / M=標準 / L=強い)',
        transformSchema: true,
        colorControl: 'NOT_EXPOSED_CANONICAL_ENGINE_CURRENTLY_HARDCODES_WHITE',
        transparentControl: 'INTENTIONALLY_NOT_EXPOSED_TECHNICAL_SETTING',
        actualStudioControlReadback: 'NOT_RUN',
      },
      productionReadiness: 'CANDIDATE_NEEDS_STUDIO_ACTUAL_AND_EXIT_ANIMATION_REVIEW',
      actualStudioInstallState: 'NOT_RUN',
      guardrails: [
        'ELEMENT_PAYLOAD_VALID != STUDIO_INSTALL_VERIFIED',
        'INTERACTIVE_SCHEMA_PRESENT != STUDIO_CONTROL_READBACK_VERIFIED',
        'DERIVED_SOURCE != SECOND_MOTION_IMPLEMENTATION',
        'REMOTION_PROVIDED_PACKAGES != ELEMENT_DEPENDENCIES',
        'FAKE_COLOR_CONTROL != HUMAN_ADJUSTABILITY',
        'ENTRANCE_ONLY_ELEMENT != PRODUCTION_READY_TEMPORARY_OVERLAY',
      ],
    },
    null,
    2,
  )}\n`,
);

console.log('✅ Mask Reveal Element payload validated with official createElementPayload() and Interactive schema source.');
console.log(`source=${sourceOutputPath}`);
console.log(`payload=${payloadOutputPath}`);
console.log(`canonicalBlockSha256=${canonicalBlockSha256}`);
console.log(`elementSourceSha256=${elementSourceSha256}`);
console.log('dependencies=0');
console.log('studioInteractivity=INTERACTIVE_SCHEMA_CANDIDATE');
console.log('actualStudioControlReadback=NOT_RUN');
console.log('actualStudioInstallState=NOT_RUN');
