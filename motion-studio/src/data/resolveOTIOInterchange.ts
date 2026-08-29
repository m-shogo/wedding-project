import {
  resolveRuntimeCanaryEvidenceSchema,
  resolveRuntimeCanarySchema,
  type ResolveRuntimeCanaryEvidence,
} from './resolveRuntimeCanary.schema.ts';

export const otioCurrentReleaseCoordinate = {
  checkedAt: '2026-08-26',
  currentReleasedVersion: 'v0.18.1',
  releasedAt: '2025-11-08',
  fixtureSchemaAuthority: 'OpenTimelineIO v0.18.1 tag',
  fixtureClipSchema: 'Clip.2',
  fixtureMarkerSchema: 'Marker.2',
  devMainObservedMarkerSchema: 'Marker.3',
  note: 'OpenTimelineIO latest/dev documentation can describe post-v0.18.1 schemas. Neutral fixtures stay pinned to released v0.18.1 serialization shapes instead of silently following dev main.',
} as const;

export const resolveOTIOOfficialCoordinate = {
  checkedAt: '2026-08-26',
  resolveMajor: 21,
  guiImportExportIntroduced: '18.5',
  scriptingCustomImportOptionsIntroduced: '19',
  currentPlanningPatch: '21.0.3',
  sourceRefs: [
    'Blackmagic Design DaVinci Resolve 18.5 New Features Guide — OpenTimelineIO import/export and OTIOZ media bundle',
    'Blackmagic Design DaVinci Resolve 19 New Features Guide — Scripting API custom OpenTimelineIO import options',
    'Blackmagic Design Support Center — DaVinci Resolve 21.0.3 Update (2026-07-22)',
  ],
} as const;

export type OTIOInterchangeFidelity =
  | 'STANDARD_EDITORIAL_CORE'
  | 'MEDIA_REFERENCE_ONLY'
  | 'MEDIA_BUNDLED_OTIOZ'
  | 'RESOLVE_VENDOR_METADATA'
  | 'NOT_PORTABILITY_PROOF';

export const resolveOTIOCapabilityMatrix = [
  {
    id: 'clip-track-order-timing',
    fidelity: 'STANDARD_EDITORIAL_CORE' as OTIOInterchangeFidelity,
    expected: 'Clip order, track structure, source ranges and editorial timing are represented by standard OTIO schema objects.',
    guardrail: 'OTIO_STRUCTURE_VALID != RESOLVE_IMPORT_FIDELITY',
  },
  {
    id: 'gap-transition-marker',
    fidelity: 'STANDARD_EDITORIAL_CORE' as OTIOInterchangeFidelity,
    expected: 'Gap, Transition and Marker objects are standard editorial schema objects; destination mapping still requires runtime readback.',
    guardrail: 'STANDARD_OBJECT_PRESENT != DESTINATION_UI_MAPPING_VERIFIED',
  },
  {
    id: 'plain-otio-media',
    fidelity: 'MEDIA_REFERENCE_ONLY' as OTIOInterchangeFidelity,
    expected: '.otio carries media references and editorial metadata; referenced media remains external and may require relink.',
    guardrail: 'OTIO_FILE != MEDIA_PACKAGE',
  },
  {
    id: 'otioz-media-bundle',
    fidelity: 'MEDIA_BUNDLED_OTIOZ' as OTIOInterchangeFidelity,
    expected: '.otioz bundles content.otio, version.txt and referenced media for portable editorial transfer.',
    guardrail: 'OTIOZ_MEDIA_BUNDLED != DEPENDENCY_COMPLETE',
  },
  {
    id: 'resolve-native-effects',
    fidelity: 'RESOLVE_VENDOR_METADATA' as OTIOInterchangeFidelity,
    expected: 'Resolve-origin OTIO samples can carry built-in effect parameters/keyframes under application-specific Resolve_OTIO metadata.',
    guardrail: 'RESOLVE_OTIO_METADATA_PRESENT != CROSS_NLE_EFFECT_SEMANTICS',
  },
  {
    id: 'third-party-ofx',
    fidelity: 'NOT_PORTABILITY_PROOF' as OTIOInterchangeFidelity,
    expected: 'OTIO effect serialization is not evidence that arbitrary third-party OpenFX effects round-trip across applications.',
    guardrail: 'OTIO_EFFECT_RECORD != OPENFX_EFFECT_ROUNDTRIP',
  },
] as const;

export const resolveOTIOInterchangeCanary = resolveRuntimeCanarySchema.parse({
  schemaVersion: 'resolve-runtime-canary/v1',
  id: 'DV21-OTIO-INTERCHANGE-01',
  title: 'OTIO / OTIOZ editorial interchange + Resolve vendor-metadata boundary',
  purpose:
    'Prove Resolve 21 import/export behavior for a standards-only neutral OTIO editorial core, compare plain .otio external-media handling with .otioz bundled-media handling, verify ordinary human late-editability after import/save-reopen, and observe Resolve-specific exported metadata without treating it as cross-NLE effect portability.',
  priority: 'P2',
  state: 'READY_TO_EXECUTE',
  capabilityIds: [
    'otio-editorial-core',
    'otio-external-media-reference',
    'otioz-media-bundle',
    'resolve-otio-vendor-metadata-boundary',
  ],
  target: {
    resolveMajor: 21,
    patchRule: 'CAPTURE_EXACT_AT_RUNTIME',
    editions: ['FREE', 'STUDIO'],
    platforms: ['MACOS', 'WINDOWS', 'LINUX'],
    pages: ['MEDIA', 'EDIT', 'PROJECT_MANAGER'],
  },
  isolation: {
    disposableProjectRequired: true,
    realWeddingProjectMutationForbidden: true,
    privateMediaCommitForbidden: true,
    networkInstallAllowed: false,
  },
  inputs: [
    {
      id: 'neutral-otio',
      kind: 'OTIO',
      required: true,
      sourceRef: 'Locally generated standards-only OpenTimelineIO v0.18.1-compatible .otio with synthetic media references.',
      preparationCommand: 'node --no-warnings scripts/prepare-resolve-otio-fixture.mts',
      notes: 'Input fixture intentionally contains no Resolve_OTIO vendor metadata.',
    },
    {
      id: 'neutral-otioz',
      kind: 'OTIOZ',
      required: true,
      sourceRef: 'Locally generated OTIOZ bundle containing content.otio, version.txt and the same synthetic media.',
      preparationCommand: 'node --no-warnings scripts/prepare-resolve-otio-fixture.mts',
      notes: 'OTIOZ media bundling is not a claim that fonts/LUTs/OFX/templates or arbitrary application dependencies are bundled.',
    },
  ],
  preflight: [
    'Capture exact live Resolve product/version/edition/platform; do not substitute the current download version for the tested runtime.',
    'Use two clean disposable timelines/projects so plain .otio and .otioz media behavior can be compared independently.',
    'Verify the input manifest SHA-256 values and confirm the standards-only input OTIO contains no Resolve_OTIO metadata.',
    'Record expected track/clip/gap/transition/marker inventory from the fixture manifest before import.',
  ],
  steps: [
    {
      id: 'plain-otio-import',
      page: 'EDIT',
      mutation: 'DISPOSABLE_MUTATION',
      action: 'Import the exact neutral .otio into a clean disposable Resolve context using the supported OpenTimelineIO route.',
      expected: 'The editorial timeline imports; external media handling/relink behavior is observed instead of assumed.',
      capture: ['import result/warnings', 'timeline fps', 'track count', 'clip count', 'media online/offline/relink state'],
      abortIf: ['Resolve asks to mutate the real wedding project', 'input hash does not match the fixture manifest'],
    },
    {
      id: 'otioz-import',
      page: 'EDIT',
      mutation: 'DISPOSABLE_MUTATION',
      action: 'Import the exact neutral .otioz in a separate clean disposable context and record extraction/automatic-link behavior.',
      expected: 'Bundled referenced media is usable or any extraction/link failure is captured precisely.',
      capture: ['import result/warnings', 'extracted/linked media observation', 'timeline fps', 'track count', 'clip count'],
      abortIf: ['input hash does not match the fixture manifest'],
    },
    {
      id: 'editorial-core-readback',
      page: 'EDIT',
      mutation: 'READ_ONLY',
      action: 'Compare clip order, source ranges, track kind, gap duration, transition type/duration and marker identity/timing against the standards-only fixture manifest.',
      expected: 'Each editorial-core property receives its own observed mapping/result rather than one coarse import PASS.',
      capture: ['clip names/order', 'source in/duration', 'gap duration', 'transition name/type/duration', 'marker name/time', 'unexpected mappings'],
      abortIf: [],
    },
    {
      id: 'human-late-edit-save-reopen',
      page: 'EDIT',
      mutation: 'DISPOSABLE_MUTATION',
      action: 'Perform one obvious native late edit such as a bounded trim plus marker move, save/reopen, and verify the timeline remains understandable and editable from normal Edit-page controls.',
      expected: 'Routine editorial correction remains human-friendly without editing serialized OTIO JSON or application internals.',
      capture: ['edit performed', 'UI/native surface used', 'before/after value', 'post-reopen value', 'human adjustability note'],
      abortIf: [],
    },
    {
      id: 'resolve-otio-export-readback',
      page: 'EDIT',
      mutation: 'DISPOSABLE_MUTATION',
      action: 'Export the edited disposable Resolve timeline as .otio using the supported Resolve route, hash the file, and inspect standard editorial objects separately from any Resolve_OTIO application metadata.',
      expected: 'Resolve export produces an inspectable OTIO artifact; any Resolve_OTIO metadata is classified as vendor metadata rather than portable standard semantics.',
      capture: ['export path/hash', 'serialized schema versions', 'standard object inventory', 'Resolve_OTIO metadata paths if present'],
      abortIf: [],
    },
    {
      id: 'roundtrip-reimport',
      page: 'EDIT',
      mutation: 'DISPOSABLE_MUTATION',
      action: 'Re-import the Resolve-exported .otio into another clean disposable timeline and re-check the edited editorial core.',
      expected: 'The bounded native editorial edit and core timeline structure survive the Resolve OTIO export/reimport path or the exact loss is captured.',
      capture: ['reimport result', 'clip/track inventory', 'edited trim state', 'marker state', 'transition/gap state'],
      abortIf: [],
    },
  ],
  evidenceRequirements: [
    {id: 'fixture-hashes', kind: 'HASH', required: true, description: 'SHA-256 for exact .otio, .otioz and synthetic media inputs.'},
    {id: 'plain-import-inventory', kind: 'INVENTORY', required: true, description: 'Resolve inventory/media state after plain .otio import.'},
    {id: 'otioz-import-inventory', kind: 'INVENTORY', required: true, description: 'Resolve inventory/media state after .otioz import.'},
    {id: 'editorial-core-readback', kind: 'READBACK', required: true, description: 'Clip/track/gap/transition/marker timing mapping readback.'},
    {id: 'late-edit-reopen', kind: 'HUMAN_REVIEW', required: true, description: 'Human adjustability and save/reopen review after one bounded native edit.'},
    {id: 'resolve-exported-otio', kind: 'FILE', required: true, description: 'Resolve-exported .otio path/hash plus standard-vs-vendor metadata inspection.'},
    {id: 'roundtrip-readback', kind: 'READBACK', required: true, description: 'Clean reimport readback of the edited Resolve-exported OTIO.'},
  ],
  passCriteria: [
    'Plain .otio imports with external-media behavior explicitly observed.',
    '.otioz imports with bundled-media extraction/link behavior explicitly observed.',
    'Standard editorial core properties are compared individually against the neutral fixture.',
    'A routine native late edit remains human-adjustable and survives save/reopen.',
    'Resolve can export an OTIO artifact whose standard objects and Resolve-specific metadata are classified separately.',
    'The bounded edited editorial core survives clean OTIO reimport or any loss is explicitly recorded without overstating effect portability.',
  ],
  failCriteria: [
    'Import success is used to claim effect/keyframe fidelity without property-level evidence.',
    '.otio is described as containing media instead of external references.',
    '.otioz media bundling is described as complete font/LUT/OFX/template dependency packaging.',
    'Resolve_OTIO vendor metadata is reported as standardized cross-NLE effect semantics.',
    'A third-party OFX round-trip is inferred from built-in Resolve effect metadata.',
    'Ordinary late editing requires hand-editing OTIO JSON or Resolve project internals.',
  ],
  promotion: {
    from: 'PENDING_RUNTIME',
    to: 'REPRODUCED',
    minimumIndependentExecutions: 2,
    requiresSaveReopen: true,
    requiresRender: false,
  },
  guardrails: [
    'OTIO_IMPORT_SUCCESS != EFFECT_FIDELITY',
    'OTIO_FILE != MEDIA_PACKAGE',
    'OTIOZ_MEDIA_BUNDLED != DEPENDENCY_COMPLETE',
    'RESOLVE_OTIO_METADATA_PRESENT != CROSS_NLE_EFFECT_SEMANTICS',
    'RESOLVE_NATIVE_EFFECT_SERIALIZED != STANDARD_OTIO_EFFECT_PORTABILITY',
    'OTIO_EFFECT_RECORD != OPENFX_EFFECT_ROUNDTRIP',
    'OTIO_METADATA_PRESENT != HUMAN_ADJUSTABLE',
    'DRT_RESOLVE_NATIVE_ROUNDTRIP != OTIO_CROSS_APP_EDITORIAL_INTERCHANGE',
    'LATEST_DOCS_DEV_VERSION != CURRENT_RELEASE_VERSION',
    'ONE_PASS != REPRODUCED',
  ],
});

export const resolveOTIOSecondaryVendorEffectProbe = {
  id: 'DV21-OTIO-INTERCHANGE-01-SECONDARY-VENDOR-EFFECT',
  promotionRequired: false,
  purpose:
    'After the editorial-core canary is recorded, optionally add one bounded built-in Resolve Transform or Dynamic Zoom change, export OTIO again, and inspect whether parameter/keyframe information appears under Resolve_OTIO metadata. This observation must not change the standard editorial-core result or imply third-party OFX portability.',
  guardrails: [
    'SECONDARY_VENDOR_PROBE != CORE_CANARY_PASS_REQUIREMENT',
    'RESOLVE_OTIO_METADATA_PRESENT != CROSS_NLE_EFFECT_SEMANTICS',
    'BUILT_IN_EFFECT_OBSERVED != THIRD_PARTY_OFX_PORTABLE',
  ],
} as const;

export function createResolveOTIOInterchangeEvidenceTemplate(
  executionId = 'DV21-OTIO-INTERCHANGE-01-UNEXECUTED',
): ResolveRuntimeCanaryEvidence {
  return resolveRuntimeCanaryEvidenceSchema.parse({
    schemaVersion: 'resolve-runtime-canary-evidence/v1',
    canaryId: resolveOTIOInterchangeCanary.id,
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
    inputInventory: resolveOTIOInterchangeCanary.inputs.map((input) => ({
      id: input.id,
      pathOrRef: null,
      sha256: null,
      present: null,
    })),
    stepResults: resolveOTIOInterchangeCanary.steps.map((step) => ({
      stepId: step.id,
      status: 'NOT_RUN',
      observed: null,
      readback: {},
    })),
    artifacts: [],
    humanReview: {completed: false, notes: []},
    promotionEligible: false,
    notes: [
      'OTIO/OTIOZ interchange evidence starts fail-closed. Standard editorial-core behavior, media portability, Resolve vendor metadata and effect portability are separate observations.',
    ],
  });
}
