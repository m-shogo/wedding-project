import {
  resolveRuntimeCanaryEvidenceSchema,
  resolveRuntimeCanarySchema,
  type ResolveRuntimeCanary,
  type ResolveRuntimeCanaryEvidence,
} from './resolveRuntimeCanary.schema.ts';
import {getResolveRuntimeCanary} from './resolveRuntimeCanaryPack.ts';

const canaryId = 'DV21-PALMIER-FCPXML-01';
const base = getResolveRuntimeCanary(canaryId);
if (!base) throw new Error(`${canaryId} base canary is missing.`);

export type PalmierV2RuntimeCapabilityRef = {
  kind: 'HANDOFF_PROPERTY' | 'SOURCE_EVIDENCE';
  id: string;
  sourceRef: string;
};

export const palmierV2RuntimeCapabilityRefs: PalmierV2RuntimeCapabilityRef[] = [
  {kind: 'HANDOFF_PROPERTY', id: 'clip-placement-trim-speed', sourceRef: 'movie-dashboard/src/data/palmierDavinciHandoffFidelity.ts'},
  {kind: 'HANDOFF_PROPERTY', id: 'position-scale-rotation-flip', sourceRef: 'movie-dashboard/src/data/palmierDavinciHandoffFidelity.ts'},
  {kind: 'HANDOFF_PROPERTY', id: 'crop-static', sourceRef: 'movie-dashboard/src/data/palmierDavinciHandoffFidelity.ts'},
  {kind: 'HANDOFF_PROPERTY', id: 'text-properties', sourceRef: 'movie-dashboard/src/data/palmierDavinciHandoffFidelity.ts'},
  {kind: 'HANDOFF_PROPERTY', id: 'static-volume-source-timecode', sourceRef: 'movie-dashboard/src/data/palmierDavinciHandoffFidelity.ts'},
  {kind: 'HANDOFF_PROPERTY', id: 'audio-volume-keyframes', sourceRef: 'movie-dashboard/src/data/palmierDavinciHandoffFidelity.ts'},
  {kind: 'HANDOFF_PROPERTY', id: 'audio-fade', sourceRef: 'movie-dashboard/src/data/palmierDavinciHandoffFidelity.ts'},
  {kind: 'SOURCE_EVIDENCE', id: 'title-independent-text-scale', sourceRef: 'movie-dashboard/src/data/palmierFCPXMLCurrentEvidence.ts'},
  {kind: 'SOURCE_EVIDENCE', id: 'title-box-transform-scale-rotation', sourceRef: 'movie-dashboard/src/data/palmierFCPXMLCurrentEvidence.ts'},
  {kind: 'SOURCE_EVIDENCE', id: 'nested-timeline-compound', sourceRef: 'movie-dashboard/src/data/palmierFCPXMLCurrentEvidence.ts'},
];

export const resolvePalmierFCPXMLV2RuntimeCanary: ResolveRuntimeCanary = resolveRuntimeCanarySchema.parse({
  ...base,
  title: 'Palmier FCPXML v2 clean import + title-scale/nested fidelity readback',
  purpose:
    'Prove that the fresh operator-attested Palmier synthetic scene v2 imports into a clean Resolve 21 project with expected clip/timing/static-volume/transform behavior, independent text width-height scale animation, explicit title-box transform omission classification, two-level nested timeline structure, save/reopen stability, and a short neutral visual checkpoint.',
  capabilityIds: [
    ...base.capabilityIds,
    'title-independent-text-scale',
    'title-box-transform-scale-rotation',
    'nested-timeline-compound',
  ],
  target: {
    ...base.target,
    pages: ['MEDIA', 'EDIT', 'DELIVER', 'PROJECT_MANAGER'],
  },
  inputs: base.inputs.map((input) => {
    if (input.id === 'palmier-real-fcpxml') {
      return {
        ...input,
        sourceRef: 'Fresh real Palmier scene-v2 FCPXML attached through attach-palmier-canary-v2-export.mts after exact-job terminal completion.',
        notes: 'Must satisfy palmier-fcpxml-canary-scene-spec/v2 markers: independent text scale, separate title-box transform probe, and L2 -> L1 -> root nesting.',
      };
    }
    if (input.id === 'human-master-sidecar') {
      return {
        ...input,
        sourceRef: 'Generated Human Master sidecar tied by SHA-256 to the exact Palmier scene-v2 FCPXML and v2 scene specification.',
      };
    }
    return input;
  }),
  preflight: [
    'Capture exact Resolve product/version/edition/platform from the live app or supported API.',
    'Confirm a disposable project is active and the real wedding project is not the mutation target.',
    'Confirm the attached Human Master fixtureId is palmier-resolve-handoff-synthetic-scene-v2 and the exact FCPXML hash matches the prepared manifest.',
    'Record expected root inventory plus PALMIER_CANARY_TEXT_SCALE, PALMIER_CANARY_TITLE_BOX_TRANSFORM, PALMIER_CANARY_NEST_L1 and PALMIER_CANARY_NEST_L2 before import.',
  ],
  steps: [
    {
      id: 'import-clean',
      page: 'EDIT',
      mutation: 'DISPOSABLE_MUTATION',
      action: 'Import the exact fresh scene-v2 Palmier FCPXML into a clean disposable Resolve project.',
      expected: 'Import completes without silently dropping the root timeline or making the timeline unusable.',
      capture: ['import warnings/errors', 'timeline name', 'timeline fps', 'root clip count', 'track count'],
      abortIf: ['Resolve requests mutation of the real wedding project', 'attached FCPXML/hash does not match the prepared scene-v2 manifest'],
    },
    {
      id: 'inventory-readback',
      page: 'EDIT',
      mutation: 'READ_ONLY',
      action: 'Compare imported root clip/media/title/audio inventory with the scene-v2 Human Master inventory.',
      expected: 'Expected transportable root items and both exact marker titles are present; known omissions remain omissions rather than guessed success.',
      capture: ['clip IDs/names', 'source paths/relink state', 'start/duration', 'marker title count', 'audio clip count'],
      abortIf: [],
    },
    {
      id: 'core-property-readback',
      page: 'EDIT',
      mutation: 'READ_ONLY',
      action: 'Read back ordinary transform/crop/static volume and inspect audio fade/volume-keyframe behavior.',
      expected: 'Transported core properties are measurable; static audio volume stays separate from automation/fades.',
      capture: ['position/scale/rotation', 'crop', 'static volume', 'audio fade presence', 'audio volume-keyframe presence'],
      abortIf: [],
    },
    {
      id: 'independent-text-scale-readback',
      page: 'EDIT',
      mutation: 'READ_ONLY',
      action: 'Locate PALMIER_CANARY_TEXT_SCALE and inspect asymmetric width/height appearance, scale animation timing, and the closest native Inspector/editability surface without changing the source meaning.',
      expected: 'The independently scaled title is identifiable and its imported behavior can be distinguished from title-box transform scale/rotation.',
      capture: ['title identity', 'Inspector control labels/values if exposed', 'animation/keyframe visibility if exposed', 'start/mid/end visual state'],
      abortIf: [],
    },
    {
      id: 'title-box-omission-readback',
      page: 'EDIT',
      mutation: 'READ_ONLY',
      action: 'Locate PALMIER_CANARY_TITLE_BOX_TRANSFORM and inspect whether the Palmier title-box size/15-degree rotation arrived, was dropped, or was mapped into an unexpected Resolve control.',
      expected: 'Title-box transform behavior is recorded separately from independent text scaling; omission is not reported as a text-scale failure.',
      capture: ['title identity', 'rotation readback', 'box/transform scale readback', 'unexpected mapping if any'],
      abortIf: [],
    },
    {
      id: 'nested-timeline-readback',
      page: 'EDIT',
      mutation: 'READ_ONLY',
      action: 'Inspect PALMIER_CANARY_NEST_L1 and PALMIER_CANARY_NEST_L2 after import, including representation, carrier timing/trim, linked A/V behavior, and meaningful editability.',
      expected: 'Both levels are identifiable or any structural loss is captured precisely; FCPXML source structure is not treated as proof of Resolve compound editability.',
      capture: ['L1 representation/name', 'L2 representation/name', 'carrier start/duration/trim', 'linked A/V state', 'nested editability observation'],
      abortIf: [],
    },
    {
      id: 'visual-checkpoint-render',
      page: 'DELIVER',
      mutation: 'RENDER_OUTPUT',
      action: 'Render a short neutral checkpoint spanning the independent text-scale animation and nested-timeline section; preserve the exact render path and SHA-256.',
      expected: 'Rendered frames provide visual evidence for text-scale timing/appearance and nested playback without being mistaken for parametric editability proof.',
      capture: ['render path', 'render hash', 'codec/settings', 'text-scale start/mid/end review', 'nested playback review'],
      abortIf: [],
    },
    {
      id: 'save-reopen',
      page: 'PROJECT_MANAGER',
      mutation: 'DISPOSABLE_MUTATION',
      action: 'Save the disposable project, close/reopen it, and repeat root inventory, marker-title, and L1/L2 nested structure checks.',
      expected: 'Imported scene-v2 structure remains usable and the observed text/nested states are stable after reopen.',
      capture: ['post-reopen root clip count', 'post-reopen marker titles', 'post-reopen L1/L2 representation', 'post-reopen relink state'],
      abortIf: [],
    },
  ],
  evidenceRequirements: [
    {id: 'expected-inventory', kind: 'INVENTORY', required: true, description: 'Scene-v2 Palmier/Human Master inventory before Resolve import.'},
    {id: 'actual-inventory', kind: 'INVENTORY', required: true, description: 'Resolve root inventory immediately after import and after save/reopen.'},
    {id: 'core-property-readback', kind: 'READBACK', required: true, description: 'Measured core transported/omitted property states including static volume vs audio automation.'},
    {id: 'text-scale-readback', kind: 'READBACK', required: true, description: 'Independent text-scale control/timing/editability observations for PALMIER_CANARY_TEXT_SCALE.'},
    {id: 'title-box-readback', kind: 'READBACK', required: true, description: 'Separate title-box scale/rotation observation for PALMIER_CANARY_TITLE_BOX_TRANSFORM.'},
    {id: 'nested-readback', kind: 'READBACK', required: true, description: 'L1/L2 imported representation, timing, A/V and editability observations.'},
    {id: 'visual-checkpoint', kind: 'RENDER', required: true, description: 'Short neutral rendered checkpoint with hash for text-scale/nested visual review.'},
    {id: 'human-visual-review', kind: 'HUMAN_REVIEW', required: true, description: 'Human review of title scale timing/appearance and nested playback; visual parity remains separate from editability.'},
    {id: 'import-log', kind: 'LOG', required: true, description: 'Import warnings/errors and relink observations.'},
  ],
  passCriteria: [
    'Transportable root clip/timing inventory matches the expected scene-v2 Human Master.',
    'Repeated/shared media does not create an unusable relink state.',
    'Static volume is present where expected while audio volume automation/fades remain explicitly classified from observation.',
    'PALMIER_CANARY_TEXT_SCALE is observed separately from title-box transform and its animation timing/appearance is reviewed at known checkpoints.',
    'PALMIER_CANARY_TITLE_BOX_TRANSFORM is classified from actual readback without conflating omission with independent text-scale transport.',
    'PALMIER_CANARY_NEST_L1 and PALMIER_CANARY_NEST_L2 representation/timing/editability are explicitly observed.',
    'Short render review and save/reopen preserve the observed scene-v2 behavior.',
  ],
  failCriteria: [
    'A required transportable root clip disappears or shifts materially without an explained source-timebase reason.',
    'The independent text-scale probe is reported as verified without identifying the exact marker title and observed timing/appearance.',
    'Title-box transform omission is conflated with independent text scale.',
    'Nested timeline support is claimed solely because the source FCPXML contains media/ref-clip structure.',
    'A required L1/L2 nested level disappears or becomes unusable without the failure being recorded.',
    'Known audio automation omissions are reported as verified merely because the timeline rendered.',
    'The visual checkpoint is missing/unhashed while promotionEligible is claimed.',
    'The evidence cannot identify the exact Palmier scene-v2 export used.',
  ],
  promotion: {
    from: 'PENDING_RUNTIME',
    to: 'REPRODUCED',
    minimumIndependentExecutions: 2,
    requiresSaveReopen: true,
    requiresRender: true,
  },
  guardrails: Array.from(new Set([
    ...base.guardrails,
    'TEXT_STYLE_SCALE != TITLE_BOX_TRANSFORM_SCALE',
    'FCPXML_PARAM_EMITTED != RESOLVE_TITLE_PARITY',
    'FCPXML_NEST_STRUCTURE_TESTED != RESOLVE_COMPOUND_IMPORT_VERIFIED',
    'VISUAL_PARITY != PARAMETRIC_EDITABILITY',
    'RENDER_SUCCESS != NESTED_EDITABILITY',
    'ONE_PASS != REPRODUCED',
  ])),
});

export function createResolvePalmierFCPXMLV2EvidenceTemplate(
  executionId = `${canaryId}-UNEXECUTED-V2`,
): ResolveRuntimeCanaryEvidence {
  return resolveRuntimeCanaryEvidenceSchema.parse({
    schemaVersion: 'resolve-runtime-canary-evidence/v1',
    canaryId,
    executionId,
    capturedAt: null,
    result: 'NOT_RUN',
    resolve: {
      product: null,
      version: null,
      edition: 'UNKNOWN',
      platform: 'UNKNOWN',
      projectName: null,
      timelineName: null,
    },
    inputInventory: resolvePalmierFCPXMLV2RuntimeCanary.inputs.map((input) => ({
      id: input.id,
      pathOrRef: null,
      sha256: null,
      present: null,
    })),
    stepResults: resolvePalmierFCPXMLV2RuntimeCanary.steps.map((step) => ({
      stepId: step.id,
      status: 'NOT_RUN',
      observed: null,
      readback: {},
    })),
    artifacts: [],
    humanReview: {
      completed: false,
      notes: [],
    },
    promotionEligible: false,
    notes: [
      'Palmier scene-v2 effective runtime evidence. Fill only observed values; source FCPXML contracts and renders do not substitute for Resolve readback/editability evidence.',
    ],
  });
}
