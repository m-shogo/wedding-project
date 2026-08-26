import {generatedAssetProvenanceSchema, type GeneratedAssetProvenance} from './generatedAsset.schema.ts';

// Synthetic policy fixture only. It encodes how a generated Wedding-safe asset must be recorded;
// it does not claim a real production generation has been performed with this provider/model.
export const generatedVideoProvenancePolicy: GeneratedAssetProvenance = generatedAssetProvenanceSchema.parse({
  schemaVersion: '1.0',
  assetId: 'synthetic-generated-video-provenance-baseline',
  kind: 'VIDEO',
  createdAt: '2026-08-26T00:00:00.000Z',
  provider: 'EXAMPLE_PROVIDER',
  hostProduct: 'EXAMPLE_HOST',
  model: 'EXAMPLE_MODEL',
  availability: 'UNKNOWN',
  availabilityCheckedAt: '2026-08-26T00:00:00.000Z',
  rebuildClass: 'REBUILD_INTENT',
  prompt: 'Synthetic non-person scene used only to validate the provenance contract.',
  parameters: {
    aspectRatio: '16:9',
  },
  references: [],
  output: {
    path: 'generated/<asset>.mp4',
  },
  provenance: {
    c2paExpected: false,
    visibleWatermarkExpected: false,
  },
  policy: {
    commercialUseNote: 'Verify the exact provider/host/model terms before production use.',
    projectPolicyCompatible: true,
  },
  humanIntent: {
    purpose: 'Validate the generated-asset provenance contract without binding production to a provider.',
    mustPreserve: ['synthetic non-person subject', '16:9 composition intent'],
    mayVary: ['exact pixels', 'micro motion'],
    forbiddenChanges: ['substitute an important real person or production photo automatically'],
  },
  verification: {
    sourceFileExists: false,
    provenanceChecked: false,
    visualReviewed: false,
    weddingApproved: false,
  },
  notes: [
    'Provider/model fields are deliberately synthetic. Runtime generator availability belongs in real per-asset records.',
  ],
});
