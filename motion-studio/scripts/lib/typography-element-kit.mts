import {createHash} from 'node:crypto';
import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';

export type TypographyElementConfig = {
  patternId: string;
  legacyPresetId: string | null;
  mode: string;
  outputSlug: string;
  displayName: string;
  payloadSlug: string;
  componentName: string;
  layerName: string;
  componentIdentity: string;
  timelineName: string;
  defaultText: string;
  durationInFrames: number;
};

type CreateElementPayload = (input: {
  displayName: string;
  slug: string;
  sourceCode: string;
  dependencies: Array<{name: string; version: string | null}>;
  dimensions: {width: number; height: number} | null;
  durationInFrames: number;
  installationMode?: 'wrapped' | 'component-owned-sequence';
}) => unknown;

const loadCanonicalTypographyBlock = (root: string) => {
  const enginePath = join(root, 'src/motion-kit/engines.tsx');
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
    .replace('export type TypographyRevealExit', 'type TypographyRevealExit')
    .replace('export function TypographyRevealEngine', 'function TypographyRevealEngine');

  if (internalTypographyBlock.includes('export function TypographyRevealEngine')) {
    throw new Error('TypographyRevealEngine export was not internalized');
  }

  return {canonicalTypographyBlock, internalTypographyBlock};
};

const buildElementSource = (config: TypographyElementConfig, internalTypographyBlock: string) => `import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {
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

type ${config.layerName}Props = InteractiveBaseProps &
  InteractiveTransformProps & {
    readonly text?: string;
    readonly intensity?: MotionIntensity;
    readonly color?: string;
  };

const schema = {
  ...Interactive.baseSchema,
  text: {
    type: 'text-content',
    default: '${config.defaultText}',
    description: '表示テキスト',
  },
  intensity: {
    type: 'enum',
    default: 'M',
    description: '動きの強さ (S=やさしい / M=標準 / L=強い)',
    keyframable: false,
    variants: {S: {}, M: {}, L: {}},
  },
  color: {
    type: 'color',
    default: '#ffffff',
    description: '文字色',
  },
  ...Interactive.transformSchema,
} as const satisfies InteractivitySchema;

const ${config.layerName}Inner = forwardRef<
  HTMLDivElement,
  ${config.layerName}Props & {readonly controls: SequenceControls | undefined}
>(({
  controls,
  text = '${config.defaultText}',
  intensity = 'M',
  color = '#ffffff',
  name,
  style,
  ...sequenceProps
}, ref) => {
  const outlineRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => outlineRef.current as HTMLDivElement, []);

  return (
    <Sequence
      layout="none"
      {...sequenceProps}
      controls={controls}
      name={name ?? '<${config.layerName}>'}
      outlineRef={outlineRef}
    >
      <div
        ref={outlineRef}
        style={{position: 'relative', width: 1280, height: 720, overflow: 'hidden', ...style}}
      >
        <TypographyRevealEngine
          text={text}
          intensity={intensity}
          mode="${config.mode}"
          transparent
          color={color}
          exitAnimation="fade"
        />
      </div>
    </Sequence>
  );
});

const InteractiveLayer = Interactive.withSchema({
  Component: ${config.layerName}Inner,
  componentName: '<${config.layerName}>',
  componentIdentity: '${config.componentIdentity}',
  schema,
  supportsEffects: false,
});

/** Motion Zukan: ${config.patternId}. Generated from canonical TypographyRevealEngine. */
export const ${config.componentName}: React.FC = () => (
  <InteractiveLayer
    text="${config.defaultText}"
    intensity="M"
    color="#ffffff"
    name="${config.timelineName}"
    style={{translate: '0px 0px', scale: 1, rotate: '0deg', opacity: 1}}
  />
);
`;

export const buildTypographyElement = async (config: TypographyElementConfig) => {
  const root = process.cwd();
  const {canonicalTypographyBlock, internalTypographyBlock} = loadCanonicalTypographyBlock(root);
  const elementSource = buildElementSource(config, internalTypographyBlock);

  for (const forbidden of ["from './", 'from "./', "from '../", 'from "../', 'http://', 'https://']) {
    if (elementSource.includes(forbidden)) {
      throw new Error(`Generated Element source contains forbidden portability token: ${forbidden}`);
    }
  }

  const exportedComponents = Array.from(
    elementSource.matchAll(/export\s+(?:const|function)\s+([A-Z_$][A-Za-z0-9_$]*)\b/g),
  ).map((match) => match[1]);
  if (exportedComponents.length !== 1 || exportedComponents[0] !== config.componentName) {
    throw new Error(`Expected exactly one exported named React component, got: ${exportedComponents.join(', ')}`);
  }

  const dynamicImport = new Function('specifier', 'return import(specifier)') as (
    specifier: string,
  ) => Promise<{createElementPayload?: CreateElementPayload}>;
  const protocol = await dynamicImport('@remotion/studio-protocol').catch((error) => {
    throw new Error(
      'Official @remotion/studio-protocol is required in the bounded candidate environment.',
      {cause: error},
    );
  });
  if (typeof protocol.createElementPayload !== 'function') {
    throw new Error('Official @remotion/studio-protocol does not expose createElementPayload()');
  }

  const outputDir = join(root, 'out/research/remotion-elements', config.outputSlug);
  const sourceOutputPath = join(outputDir, `${config.outputSlug}.element-source.tsx`);
  const payloadOutputPath = join(outputDir, `${config.outputSlug}.element-payload.json`);
  const manifestOutputPath = join(outputDir, 'manifest.json');
  mkdirSync(outputDir, {recursive: true});
  writeFileSync(sourceOutputPath, elementSource);

  const payload = protocol.createElementPayload({
    displayName: config.displayName,
    slug: config.payloadSlug,
    sourceCode: elementSource,
    dependencies: [],
    dimensions: {width: 1280, height: 720},
    durationInFrames: config.durationInFrames,
    installationMode: 'wrapped',
  });
  writeFileSync(payloadOutputPath, `${JSON.stringify(payload, null, 2)}\n`);

  const manifest = {
    patternId: config.patternId,
    legacyPresetId: config.legacyPresetId,
    canonicalSource: 'src/motion-kit/engines.tsx#TypographyRevealEngine',
    canonicalMode: config.mode,
    canonicalBlockSha256: createHash('sha256').update(canonicalTypographyBlock).digest('hex'),
    elementSourceSha256: createHash('sha256').update(elementSource).digest('hex'),
    elementComponent: config.componentName,
    sourceStrategy: 'DERIVED_FROM_SHARED_CANONICAL_TYPOGRAPHY_ELEMENT_KIT',
    dependencies: [],
    dimensions: {width: 1280, height: 720},
    durationInFrames: config.durationInFrames,
    installationMode: 'wrapped',
    officialValidator: '@remotion/studio-protocol createElementPayload()',
    studioInteractivity: {
      mechanism: 'Interactive.withSchema()',
      editableFields: ['text', 'intensity', 'color', 'style.translate', 'style.scale', 'style.rotate', 'style.opacity'],
      textLabel: '表示テキスト',
      intensityLabel: '動きの強さ (S=やさしい / M=標準 / L=強い)',
      colorLabel: '文字色',
      transformSchema: true,
      actualStudioControlReadback: 'NOT_RUN',
    },
    exitAnimation: {
      mode: 'CANONICAL_FADE',
      elementOnlyImplementation: false,
    },
    productionReadiness: 'CANDIDATE_NEEDS_STUDIO_ACTUAL',
    actualStudioInstallState: 'NOT_RUN',
    guardrails: [
      'ELEMENT_PAYLOAD_VALID != STUDIO_INSTALL_VERIFIED',
      'DERIVED_SOURCE != SECOND_MOTION_IMPLEMENTATION',
      'SHARED_ELEMENT_KIT != SHARED_MOTION_IMPLEMENTATION',
      'ELEMENT_EXIT_USES_CANONICAL_ENGINE != ELEMENT_ONLY_DIVERGENCE',
    ],
  };
  writeFileSync(manifestOutputPath, `${JSON.stringify(manifest, null, 2)}\n`);

  console.log(`✅ ${config.patternId} Element generated from shared canonical Typography Element kit.`);
  console.log(`source=${sourceOutputPath}`);
  console.log(`payload=${payloadOutputPath}`);
  console.log(`elementSourceSha256=${manifest.elementSourceSha256}`);
  console.log('actualStudioControlReadback=NOT_RUN');
  console.log('actualStudioInstallState=NOT_RUN');
};
