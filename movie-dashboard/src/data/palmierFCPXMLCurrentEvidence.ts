export type PalmierFCPXMLSourceEvidenceState =
  | "FCPXML_EMITTED_TESTED"
  | "FCPXML_EMITTED_SOURCE_ONLY"
  | "COLLAPSED_TO_STATIC_BY_EXPORTER"
  | "OMITTED_BY_EXPORTER"
  | "EXPORT_LIFECYCLE_TOOLING";

export type PalmierFCPXMLResolveRuntimeState = "PENDING_RUNTIME" | "RUNTIME_VERIFIED";

export interface PalmierFCPXMLCurrentEvidenceRecord {
  id: string;
  evidenceState: PalmierFCPXMLSourceEvidenceState;
  resolveRuntime: PalmierFCPXMLResolveRuntimeState;
  humanAdjustabilityTarget: "EDIT" | "TITLE_INSPECTOR" | "FAIRLIGHT" | "FUSION" | "EXPORT_WORKFLOW";
  expectedBehavior: string;
  observedSourceBehavior: string;
  recoveryOrVerification: string;
  sourceRefs: string[];
  guardrails: string[];
}

export const palmierCurrentSourceCoordinate = {
  checkedAt: "2026-08-26",
  latestRelease: "v0.7.6",
  latestReleasePublishedAt: "2026-08-19T04:03:00Z",
  sourceCommit: "8805801fa4df8bc2dbc57cb0a854a1f5108f95c6",
  repository: "palmier-io/palmier-pro",
} as const;

export const palmierLegacyHandoffCorrections = {
  supersedesCoarsePropertyIds: ["title-rotation-scale"],
  explanation:
    "Palmier current exporter distinguishes independent text scaling from title-box transform scale/rotation. Do not treat every title scale as LOST/rebuild-only.",
} as const;

const EXPORTER =
  "palmier-io/palmier-pro@8805801fa4df8bc2dbc57cb0a854a1f5108f95c6:Sources/PalmierPro/Export/FCPXMLExporter.swift";
const EXPORTER_TESTS =
  "palmier-io/palmier-pro@8805801fa4df8bc2dbc57cb0a854a1f5108f95c6:Tests/PalmierProTests/Export/FCPXMLExporterTests.swift";
const EXPORT_TOOL =
  "palmier-io/palmier-pro@8805801fa4df8bc2dbc57cb0a854a1f5108f95c6:Sources/PalmierPro/Agent/Tools/ToolExecutor+Export.swift";

export const palmierFCPXMLCurrentEvidence: PalmierFCPXMLCurrentEvidenceRecord[] = [
  {
    id: "export-job-terminal-lifecycle",
    evidenceState: "EXPORT_LIFECYCLE_TOOLING",
    resolveRuntime: "PENDING_RUNTIME",
    humanAdjustabilityTarget: "EXPORT_WORKFLOW",
    expectedBehavior:
      "A Resolve-target FCPXML handoff uses the exact export_project jobId and waits for manage_exports to report that same job as completed before attachment.",
    observedSourceBehavior:
      "export_project returns started/queued + jobId + destination path. manage_exports list returns jobId, path, status, progress, error, warnings and result; terminal states include completed/failed/canceled.",
    recoveryOrVerification:
      "Record export start time, call export_project(mode=fcpxml, fcpxmlTarget=resolve, explicit timelineId), capture jobId/path, then check manage_exports for that exact jobId until terminal. Only completed proceeds to structure/freshness/provenance attachment.",
    sourceRefs: [EXPORT_TOOL],
    guardrails: [
      "EXPORT_QUEUED != EXPORT_SUCCEEDED",
      "PROGRESS_100 != TERMINAL_SUCCESS",
      "JOB_ID_MUST_MATCH_TERMINAL_RESULT",
      "TERMINAL_SUCCESS != FRESHNESS_PROVENANCE",
    ],
  },
  {
    id: "fcpxml-version-gate",
    evidenceState: "FCPXML_EMITTED_SOURCE_ONLY",
    resolveRuntime: "PENDING_RUNTIME",
    humanAdjustabilityTarget: "EXPORT_WORKFLOW",
    expectedBehavior:
      "FCPXML version choice is treated as an importer compatibility gate, not as a fidelity tier.",
    observedSourceBehavior:
      "Current exporter supports version attributes 1.10 through 1.14, defaults to 1.10, and comments that the emitted body uses elements available since FCPXML 1.1. The source labels 1.10 as Resolve 18+ and higher choices as Resolve 21+.",
    recoveryOrVerification:
      "Use the broadest compatible version unless a concrete destination requires a higher gate; never infer that 1.14 transports more Palmier properties than 1.10 without source/runtime evidence.",
    sourceRefs: [EXPORTER, EXPORTER_TESTS],
    guardrails: ["FCPXML_VERSION_ATTRIBUTE != HANDOFF_FIDELITY_LEVEL"],
  },
  {
    id: "nested-timeline-compound",
    evidenceState: "FCPXML_EMITTED_TESTED",
    resolveRuntime: "PENDING_RUNTIME",
    humanAdjustabilityTarget: "EDIT",
    expectedBehavior:
      "Reachable Palmier nested timelines are represented as FCPXML media/sequence resources and referenced by ref-clip carriers rather than flattened or silently dropped.",
    observedSourceBehavior:
      "Current exporter collects reachable nested timelines, creates nested media/sequence resources, and emits ref-clip carriers. Upstream tests cover one nest, linked A/V carrier collapse, two-level nesting, frozen-carrier clamping, and dropping empty/missing children.",
    recoveryOrVerification:
      "Add a dedicated Resolve Actual scene with at least one two-level nested timeline and compare imported compound/timeline structure, timing, linked A/V behavior and save/reopen. Do not promote from exporter tests alone.",
    sourceRefs: [EXPORTER, EXPORTER_TESTS],
    guardrails: [
      "FCPXML_NEST_STRUCTURE_TESTED != RESOLVE_COMPOUND_IMPORT_VERIFIED",
      "NESTED_TIMELINE_TRANSPORT != NESTED_TIMELINE_EDITABILITY",
    ],
  },
  {
    id: "title-independent-text-scale",
    evidenceState: "FCPXML_EMITTED_TESTED",
    resolveRuntime: "PENDING_RUNTIME",
    humanAdjustabilityTarget: "TITLE_INSPECTOR",
    expectedBehavior:
      "Independent text width/height scaling and text scale animation are emitted as a title scale parameter and must be evaluated separately from title-box transform scale/rotation.",
    observedSourceBehavior:
      "titleTransformNodes builds a title scale param from TextStyle.widthScale/heightScale and clip text-scale keyframes. The upstream textScaleExportsAsIndependentTitleTransform test asserts static and keyframed scale values in FCPXML.",
    recoveryOrVerification:
      "In Resolve Actual, import a Palmier title with asymmetric width/height scale plus a bounded scale animation, then read back the title control and render known frames. Until then this is FCPXML-emitted source evidence, not Resolve parity proof.",
    sourceRefs: [EXPORTER, EXPORTER_TESTS],
    guardrails: [
      "TEXT_STYLE_SCALE != TITLE_BOX_TRANSFORM_SCALE",
      "FCPXML_PARAM_EMITTED != RESOLVE_TITLE_PARITY",
    ],
  },
  {
    id: "title-box-transform-scale-rotation",
    evidenceState: "OMITTED_BY_EXPORTER",
    resolveRuntime: "PENDING_RUNTIME",
    humanAdjustabilityTarget: "FUSION",
    expectedBehavior:
      "Title-box transform scale and rotation remain a rebuild concern even though independent text scaling has a title-specific FCPXML path.",
    observedSourceBehavior:
      "The textBoxTransformExportsTitlePositionAndOpacity test supplies title transform width/height and rotation but expects an adjust-transform with scale 1 1 and no title rotation transport; opacity and position are handled separately.",
    recoveryOrVerification:
      "Keep Human Master title-box rotation/transform scale values and rebuild them in the simplest native Resolve title/Fusion surface. Do not reuse the coarse claim that every form of title scale is lost.",
    sourceRefs: [EXPORTER_TESTS],
    guardrails: ["TITLE_BOX_TRANSFORM != INDEPENDENT_TEXT_SCALE"],
  },
  {
    id: "audio-volume-keyframes-collapse-static",
    evidenceState: "COLLAPSED_TO_STATIC_BY_EXPORTER",
    resolveRuntime: "PENDING_RUNTIME",
    humanAdjustabilityTarget: "FAIRLIGHT",
    expectedBehavior:
      "Palmier audio volume automation does not survive FCPXML; only the clip's static volume is emitted when non-unity.",
    observedSourceBehavior:
      "volumeNode emits a self-closing adjust-volume from clip.volume only. The upstream volumeKeyframesCollapseToStaticLevel test explicitly verifies that a volumeTrack is not emitted as keyframeAnimation and preserves only the static -6.0206 dB example.",
    recoveryOrVerification:
      "Treat static volume and automation as separate properties. Rebuild volume automation from Human Master values in Fairlight/Edit until an exact supported write path is Runtime Verified.",
    sourceRefs: [EXPORTER, EXPORTER_TESTS],
    guardrails: [
      "STATIC_AUDIO_VOLUME_TRANSPORT != AUDIO_AUTOMATION_TRANSPORT",
      "VOLUME_KEYFRAMES_PRESENT_IN_PALMIER != VOLUME_KEYFRAMES_IN_FCPXML",
    ],
  },
  {
    id: "audio-fade-omitted",
    evidenceState: "OMITTED_BY_EXPORTER",
    resolveRuntime: "PENDING_RUNTIME",
    humanAdjustabilityTarget: "FAIRLIGHT",
    expectedBehavior: "Palmier audio fade duration/curve is retained in Human Master but not emitted into FCPXML.",
    observedSourceBehavior:
      "The upstream fadesAndChannelLayoutAreNotExported test creates a fade-in and asserts no fade element is present in the FCPXML.",
    recoveryOrVerification:
      "Rebuild fade handles/automation in Resolve using the stored Human Master duration/curve and verify the audible/readback result separately from static volume.",
    sourceRefs: [EXPORTER_TESTS],
    guardrails: ["AUDIO_FADE_EDITABLE_IN_PALMIER != AUDIO_FADE_TRANSPORTED"],
  },
];

export function getPalmierFCPXMLCurrentEvidence(id: string): PalmierFCPXMLCurrentEvidenceRecord | undefined {
  return palmierFCPXMLCurrentEvidence.find((entry) => entry.id === id);
}
