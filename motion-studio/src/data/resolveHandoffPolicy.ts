import {resolveHandoffSidecarSchema, type ResolveHandoffSidecar} from './resolveHandoff.schema.ts';

// Evidence-backed policy fixture. Values marked PENDING_RUNTIME must not be promoted merely because
// an artifact can be generated. This fixture intentionally models the currently preferred
// Remotion-alpha -> Resolve 21 recovery path without claiming internal parametric editability.
export const resolve21AlphaHandoffPolicy: ResolveHandoffSidecar = resolveHandoffSidecarSchema.parse({
  schemaVersion: '1.0',
  artifactId: 'remotion-alpha-to-resolve21-baseline',
  generatedAt: '2026-08-26T00:00:00.000Z',
  source: {
    tool: 'REMOTION',
    projectRef: 'motion-studio',
    runtimeVersion: '4.0.475',
    compositionOrTimeline: 'runtime-canary-placeholder',
    humanMasterRef: 'motion-studio/src/Root.tsx + composition schema/default props',
  },
  resolve: {
    major: 21,
    targetPatch: '21.0.3',
    testedPatch: null,
    edition: 'FREE',
    platform: 'MACOS',
    page: 'EDIT',
  },
  executionScope: {
    timeline: '<explicit timeline name required at execution time>',
    clipIds: [],
    trackIds: [],
    allowedEdits: [
      'import the named alpha artifact',
      'place it only in the explicitly selected/identified timeline scope',
      'trim, reposition, scale or adjust clip opacity when the Human Master requests it',
      'read back the changed clip-level values',
    ],
    forbiddenEdits: [
      'replace important photos automatically',
      'change final copy automatically',
      'reorder scenes automatically',
      'delete clips/tracks automatically',
      'rewrite unrelated timeline items',
    ],
    preconditions: [
      'Capture the exact live Resolve major/patch/edition/platform before applying the recipe.',
      'Treat targetPatch as a planning baseline, not as evidence that the local runtime was tested.',
      'Confirm the intended timeline and target clip/track scope before any mutation.',
      'Confirm the source artifact and dependency sidecar refer to the same composition/render.',
    ],
    abortIf: [
      'timeline or target scope is ambiguous',
      'expected source artifact is missing or stale',
      'the actual Resolve major/edition/platform is outside the recipe scope, or a different patch has not been explicitly revalidated',
      'the requested edit requires an unsupported capability or changes a high-impact decision',
    ],
    postEditReadback: [
      'target clip identity and placement',
      'trim/duration',
      'position/scale/opacity values changed by this operation',
      'alpha composite checkpoint',
      'save/reopen checkpoint when promotion to Trusted is being evaluated',
    ],
  },
  timeline: {
    fps: 30,
    width: 1920,
    height: 1080,
    colorContext: 'Rec.709 project context; verify actual project and Deliver override at runtime',
    audioRateHz: 48000,
  },
  artifact: {
    kind: 'ALPHA_RENDER',
    path: 'out/common/<artifact>.mov',
    codec: 'ProRes 4444 candidate',
    container: 'MOV',
  },
  alpha: {
    import: 'PENDING_RUNTIME',
    workingPath: 'PENDING_RUNTIME',
    export: 'PENDING_RUNTIME',
    codec: 'ProRes 4444 candidate',
    pixelFormat: 'yuva444p10le candidate',
    alphaMode: 'UNKNOWN',
  },
  humanMaster: [
    {
      key: 'position',
      label: '位置',
      value: 'source-defined',
      editableInResolve: true,
      resolveControl: 'Edit Inspector / Transform or explicit native rebuild control',
    },
    {
      key: 'motionAmount',
      label: '動きの強さ',
      value: 'source-defined',
      editableInResolve: false,
      resolveControl: 'Requires sidecar-guided native rebuild unless exposed by a DRFX template',
    },
  ],
  dependencies: [
    {
      kind: 'MEDIA',
      id: 'alpha-render',
      required: true,
      bundled: false,
      relinkHint: 'Keep render beside this sidecar or record a project-relative path.',
    },
  ],
  capabilities: [
    {
      capabilityId: 'visual-alpha-composite',
      sourceTool: 'Remotion',
      sourcePath: 'transparent composition render',
      resolveNativePath: 'Media Pool -> Edit timeline clip',
      fidelity: 'BAKE_OPTION',
      adjustability: 'EASY_TIMELINE',
      automation: 'NATIVE_NO_SCRIPT',
      runtime: 'PENDING_RUNTIME',
      expectedBehavior: 'Resolve 21 imports the rendered clip with transparency and allows clip-level timeline edits.',
      recoveryRecipe: 'If internal motion must remain adjustable, rebuild the Human Master values as a Resolve-native Effect/DRFX instead of treating the baked clip as parametric.',
      verificationRecipe: 'Import into a clean Resolve 21 project; inspect alpha over a checker/background, trim, save/reopen, render again, and compare edge/opacity parity.',
      guardrails: [
        'VISUAL_PARITY != PARAMETRIC_EDITABILITY',
        'ALPHA_IMPORT != ALPHA_WORKING_PATH != ALPHA_EXPORT',
        'GENERATED_ARTIFACT != RUNTIME_VERIFIED_HANDOFF',
      ],
    },
  ],
  highImpactDecisions: [
    'Do not replace important photos, final copy, scene order, or delete content automatically.',
  ],
  notes: [
    'Blackmagic Design Support Center lists DaVinci Resolve 21.0.3 (2026-07-22) as the current Resolve 21 update at this research date; this is target planning evidence, not local runtime proof.',
    'testedPatch intentionally remains null until an actual Resolve runtime execution records the exact live patch.',
    'ProRes 4444 command paths already exist in package.json, but Resolve 21 clean import remains a runtime canary.',
    'Platform is explicit because some Resolve 21 capabilities such as Lottie/OGraf are documented for macOS/Windows rather than universally cross-platform.',
  ],
});
