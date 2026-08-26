import {
  resolveRuntimeCanaryEvidenceSchema,
  resolveRuntimeCanarySchema,
  type ResolveRuntimeCanaryEvidence,
} from './resolveRuntimeCanary.schema.ts';

export const resolveNativePIPOfficialCoordinate = {
  productBaseline: 'DaVinci Resolve 21',
  targetPatch: '21.0.3',
  checkedAt: '2026-08-26',
  officialFeatureSource: 'DaVinci Resolve 21 New Features Guide — Resolve FX / Picture in Picture',
  officialProductSource: 'Blackmagic Design Resolve 21 What’s New / Edit pages',
  runtimeEditionAvailability: 'VERIFY_EXACT_RUNTIME',
} as const;

export const resolveNativePIPControlGroups = [
  {
    group: 'CONTENT',
    controls: ['Zoom', 'Pan', 'Tilt'],
    purpose: 'Frame the source content inside the PiP window without changing the outer window placement.',
  },
  {
    group: 'POSITION',
    controls: ['Position X', 'Position Y', 'Width', 'Height'],
    purpose: 'Place and size the floating frame in the destination canvas.',
  },
  {
    group: 'STYLE_CORE',
    controls: ['Rounding', 'Rotation', 'Opacity', 'Border', 'Fill', 'Drop Shadow', 'Use Alpha'],
    purpose: 'Wedding photo-card shape, framing and compositing controls expected to stay human-readable in the Inspector.',
  },
  {
    group: 'BORDER',
    controls: ['Border Width', 'Border Color', 'Border Opacity'],
    purpose: 'Routine photo-card border adjustment without opening Fusion.',
  },
  {
    group: 'FILL',
    controls: ['Fill Matches Border', 'Fill Color', 'Fill Opacity'],
    purpose: 'Optional background behind transparent content.',
  },
  {
    group: 'SHADOW',
    controls: ['Strength', 'Color', 'Drop Angle', 'Drop Distance', 'Expand', 'Blur'],
    purpose: 'Routine depth/shadow adjustment for a wedding photo card.',
  },
] as const;

export const nativePIPHumanMaster = {
  schemaVersion: 'resolve-native-pip-human-master/v1',
  canaryId: 'DV21-NATIVE-PIP-01',
  fixtureId: 'wedding-neutral-native-pip-v1',
  purpose:
    'Test whether Resolve 21 native Picture in Picture can serve as the preferred human-adjustable photo-card route before custom Fusion/DRFX for ordinary framing.',
  timeline: {
    fps: 30,
    width: 1920,
    height: 1080,
    durationSeconds: 6,
  },
  sourceIntent: {
    topClip: 'Synthetic moving test pattern with obvious orientation/motion.',
    bottomClip: 'Synthetic neutral full-frame background.',
    copyrightedContent: false,
  },
  targetIntent: {
    placement: 'Clearly smaller floating frame positioned away from center so position/size changes are obvious.',
    sourceFraming: 'Use Zoom/Pan/Tilt only if needed to demonstrate content framing separately from outer window placement.',
    rounding: {
      target: 0.35,
      authority: 'Resolve 21 guide documents Rounding from 0 right-angle to 1 circle.',
    },
    rotation: 'Small but clearly visible non-zero clockwise rotation; record the exact Resolve value used.',
    opacity: 'Near-opaque but visibly non-default only if the exact runtime exposes a clear numeric control; record actual value.',
    border: 'Enabled with clearly visible width/color; record exact runtime values.',
    fill: 'Keep disabled for the core opaque-media test unless needed by the tested runtime.',
    dropShadow: 'Enabled with clearly visible strength/distance/blur; record exact runtime values.',
    useAlpha: 'Record availability separately. Do not claim alpha correctness from an opaque source fixture.',
  },
  lateEditTasks: [
    'Change Rounding to a second obvious value from the Edit Inspector, then record before/after.',
    'Change Border Width or Border Color from the Edit Inspector, then record before/after.',
    'Change Position or Width/Height from the Edit Inspector or documented Open FX overlay, then record before/after.',
  ],
  animationProbe: {
    requiredForCorePass: false,
    purpose:
      'Record whether meaningful PiP effect controls expose keyframe affordances in the exact runtime. If unavailable, do not fail static human adjustability automatically; keep animation capability separate.',
  },
  usabilityQuestions: [
    'Can a normal editor find the effect and the required controls without opening Fusion?',
    'Are routine card corrections visible in the Edit Inspector with meaningful labels?',
    'Can position/size/style changes be made without hidden node-graph work?',
    'Do changed values survive save/reopen?',
    'Does a short render visually reflect the Inspector state?',
  ],
  guardrails: [
    'NATIVE_INSPECTOR_CAPABILITY > CUSTOM_GRAPH_WHEN_VISUAL_INTENT_EQUIVALENT',
    'SIMILAR_CONTROL_NAME != SEMANTIC_PARITY',
    'EFFECT_LISTED_IN_DOCS != EFFECT_AVAILABLE_IN_TESTED_EDITION',
    'PARAMETRIC_EDITABLE != HUMAN_ADJUSTABLE',
    'STATIC_HUMAN_ADJUSTABILITY != ANIMATION_CAPABILITY',
    'OPAQUE_SOURCE_USE_ALPHA_CONTROL != ALPHA_PRESERVATION_PROOF',
    'ONE_PASS != REPRODUCED',
  ],
} as const;

export const resolveNativePIPCanary = resolveRuntimeCanarySchema.parse({
  schemaVersion: 'resolve-runtime-canary/v1',
  id: 'DV21-NATIVE-PIP-01',
  title: 'Resolve 21 native Picture in Picture — Wedding photo-card human adjustability',
  purpose:
    'Verify in the exact Resolve 21 runtime/edition whether the built-in Picture in Picture Resolve FX provides the documented human-friendly content/position/style controls, supports ordinary wedding photo-card late edits without Fusion, persists through save/reopen, and renders the Inspector state correctly.',
  priority: 'P1',
  state: 'READY_TO_EXECUTE',
  capabilityIds: [
    'native-pip-photo-card',
    'native-pip-rounding-border-shadow',
    'native-pip-human-adjustability',
  ],
  target: {
    resolveMajor: 21,
    patchRule: 'CAPTURE_EXACT_AT_RUNTIME',
    editions: ['FREE', 'STUDIO'],
    platforms: ['MACOS', 'WINDOWS', 'LINUX'],
    pages: ['EDIT', 'DELIVER', 'PROJECT_MANAGER'],
  },
  isolation: {
    disposableProjectRequired: true,
    realWeddingProjectMutationForbidden: true,
    privateMediaCommitForbidden: true,
    networkInstallAllowed: false,
  },
  inputs: [
    {
      id: 'native-pip-top-source',
      kind: 'MEDIA',
      required: true,
      sourceRef: 'Generated synthetic moving 640x360 test-pattern MP4 used as the top/PiP source.',
      notes: 'No private or copyrighted wedding media is needed.',
    },
    {
      id: 'native-pip-background',
      kind: 'MEDIA',
      required: true,
      sourceRef: 'Generated synthetic 1920x1080 neutral background MP4 used below the PiP source.',
      notes: 'Keeps the visual composite deterministic without external assets.',
    },
    {
      id: 'native-pip-human-master',
      kind: 'SIDECAR',
      required: true,
      sourceRef: 'Human Master describing required documented control groups, target intent and late-edit tasks.',
      notes: 'Expected intent is not Resolve runtime readback; record actual numeric values exposed by the tested runtime.',
    },
  ],
  preflight: [
    'Capture exact live Resolve product/version/edition/platform before applying the effect.',
    'Use a clean disposable timeline with the synthetic background on V1 and synthetic PiP source on V2.',
    'Record whether Picture in Picture Resolve FX is actually available in the tested edition before claiming Free/Studio support.',
    'Do not open Fusion for the core human-adjustability path.',
  ],
  steps: [
    {
      id: 'effect-availability',
      page: 'EDIT',
      mutation: 'READ_ONLY',
      action: 'Locate the built-in Picture in Picture Resolve FX in the tested Resolve edition and record its exact Effects Library category/name/availability.',
      expected: 'Availability is observed from the exact runtime rather than inferred from product marketing or another edition.',
      capture: ['effect category/name', 'Resolve edition', 'availability', 'watermark/restriction if any'],
      abortIf: ['The only way to continue would mutate the real wedding project'],
    },
    {
      id: 'apply-control-inventory',
      page: 'EDIT',
      mutation: 'DISPOSABLE_MUTATION',
      action: 'Apply Picture in Picture to the synthetic V2 source and inventory the human-facing Inspector controls before changing them.',
      expected: 'Core documented Content, Position and Style controls are visible with meaningful labels; any missing/renamed controls are recorded exactly.',
      capture: ['Content controls', 'Position controls', 'Style controls', 'Border controls', 'Shadow controls', 'keyframe affordances if visible'],
      abortIf: ['Effect is unavailable in this edition/runtime'],
    },
    {
      id: 'style-photo-card',
      page: 'EDIT',
      mutation: 'DISPOSABLE_MUTATION',
      action: 'Create the neutral wedding photo-card intent using native PiP controls: obvious placement/size, Rounding=0.35 where representable, small rotation, visible border and drop shadow. Record every actual value used.',
      expected: 'The visual card can be created without opening Fusion and the result clearly reflects rounding/border/shadow/placement changes.',
      capture: ['actual PiP values', 'viewer screenshot', 'Fusion opened yes/no', 'Open FX overlay used yes/no'],
      abortIf: ['Routine styling requires direct project-file editing or a third-party plugin'],
    },
    {
      id: 'human-late-edit',
      page: 'EDIT',
      mutation: 'DISPOSABLE_MUTATION',
      action: 'Perform bounded routine late edits from the Edit Inspector/overlay: change rounding, one border property, and one position/size property. Record before/after values and editing friction.',
      expected: 'A normal editor can make ordinary photo-card corrections from obvious native controls without Fusion graph spelunking.',
      capture: ['before/after values', 'UI surface', 'actions/friction notes', 'Fusion opened yes/no'],
      abortIf: [],
    },
    {
      id: 'animation-affordance-probe',
      page: 'EDIT',
      mutation: 'DISPOSABLE_MUTATION',
      action: 'Inspect and, only if clearly supported, exercise one bounded PiP keyframe animation. Keep this observation separate from static human-adjustability PASS.',
      expected: 'Animation capability is classified from the tested runtime and never inferred merely because the static Inspector is editable.',
      capture: ['keyframe controls visible', 'property tested', 'before/after keyframe values', 'playback result'],
      abortIf: ['Only undocumented/destructive workarounds remain'],
    },
    {
      id: 'save-reopen-render',
      page: 'DELIVER',
      mutation: 'RENDER_OUTPUT',
      action: 'Save/reopen the disposable project, verify the PiP late-edit values remain, then render a short neutral sample and hash it.',
      expected: 'Inspector values persist after reopen and the short render visually reflects the native PiP state.',
      capture: ['post-reopen values', 'render path/hash', 'render settings', 'human visual review'],
      abortIf: [],
    },
  ],
  evidenceRequirements: [
    {id: 'fixture-manifest', kind: 'FILE', required: true, description: 'Exact synthetic source/background/Human Master identities and hashes.'},
    {id: 'effect-availability', kind: 'READBACK', required: true, description: 'Exact tested edition and PiP Resolve FX availability/category/name.'},
    {id: 'control-inventory', kind: 'READBACK', required: true, description: 'Observed Inspector control groups/labels and keyframe affordances.'},
    {id: 'late-edit-readback', kind: 'READBACK', required: true, description: 'Before/after/post-reopen routine photo-card adjustments.'},
    {id: 'human-adjustability-review', kind: 'HUMAN_REVIEW', required: true, description: 'Human review confirming whether routine photo-card work stayed in obvious native Edit-page controls.'},
    {id: 'render', kind: 'RENDER', required: true, description: 'Short neutral render with SHA-256 reflecting the final PiP Inspector state.'},
  ],
  passCriteria: [
    'Picture in Picture availability is recorded for the exact Resolve version/edition/platform.',
    'The documented core Content/Position/Style controls required for the neutral photo-card are visible or any runtime-specific naming is unambiguously mapped.',
    'The neutral card can be styled with rounding, border, shadow and placement without opening Fusion.',
    'Routine late edits to rounding, border and position/size are human-readable and survive save/reopen.',
    'The short render visually reflects the post-reopen native Inspector state.',
    'Animation affordance is classified separately and is not required to fake a static human-adjustability PASS.',
  ],
  failCriteria: [
    'Effect availability in Free/Studio is claimed from documentation rather than the exact tested edition.',
    'Routine card styling requires opening an opaque Fusion graph even though the canary claims EASY_INSPECTOR adjustability.',
    'A similarly named control is treated as proof of visual parity with Palmier/Fusion without a runtime comparison.',
    'Animation support is inferred from static editability without an actual keyframe observation.',
    'Use Alpha control presence on this opaque fixture is reported as alpha preservation proof.',
    'Save/reopen loses required native PiP values or render does not reflect the Inspector state.',
  ],
  promotion: {
    from: 'PENDING_RUNTIME',
    to: 'REPRODUCED',
    minimumIndependentExecutions: 2,
    requiresSaveReopen: true,
    requiresRender: true,
  },
  guardrails: [...nativePIPHumanMaster.guardrails],
});

export function createResolveNativePIPEvidenceTemplate(
  executionId = 'DV21-NATIVE-PIP-01-UNEXECUTED',
): ResolveRuntimeCanaryEvidence {
  return resolveRuntimeCanaryEvidenceSchema.parse({
    schemaVersion: 'resolve-runtime-canary-evidence/v1',
    canaryId: resolveNativePIPCanary.id,
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
    inputInventory: resolveNativePIPCanary.inputs.map((input) => ({
      id: input.id,
      pathOrRef: null,
      sha256: null,
      present: null,
    })),
    stepResults: resolveNativePIPCanary.steps.map((step) => ({
      stepId: step.id,
      status: 'NOT_RUN',
      observed: null,
      readback: {},
    })),
    artifacts: [],
    humanReview: {completed: false, notes: []},
    promotionEligible: false,
    notes: [
      'Native PiP evidence starts fail-closed. Documented controls and generated fixtures are not Resolve runtime proof.',
      'Static human adjustability and animation capability must stay separately classified.',
    ],
  });
}
