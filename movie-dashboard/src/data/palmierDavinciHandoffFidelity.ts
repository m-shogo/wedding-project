/**
 * Palmier → DaVinci Resolve handoff fidelity registry.
 *
 * This is the canonical, pattern-agnostic promotion of
 * docs/research/2026-08-26-movie-tool-learning-run-01.md and
 * docs/research/2026-08-26-movie-tool-learning-run-02.md from research prose
 * into structured data the app can render and verify.
 *
 * Do not add a property record here from assumption. Every record must cite
 * the research run(s) it came from. Research itself is source-level evidence
 * about the Palmier exporter and Resolve's documented API surface, not a
 * runtime Resolve import/render test (GL-05). Keep `evidenceState` honest:
 * almost everything here is "PENDING_RUNTIME" until an actual Resolve Canary
 * (see docs/research/2026-08-26-movie-tool-learning-run-01.md「Canary」節)
 * has been run and recorded.
 */

/** What happens to a Human Master property when it crosses Palmier → FCPXML → Resolve. */
export type TransportClass =
  /** Palmier's Resolve-target FCPXML exporter carries the value through, and Resolve reads it back as the same edit-controllable property. */
  | "EXACT"
  /** Transported, but Palmier's exporter applies Resolve-specific compensation (position/scale/rotation/crop encoding), so exact numeric parity across mismatched aspect ratios is not yet proven. */
  | "APPROX"
  /** Not transported by FCPXML, but the Human Master value/timing/curve is fully known, so DaVinci-side values can be reconstructed deterministically. */
  | "REBUILD_VALUES"
  /** Not transported, but the underlying asset (e.g. a Lottie/OGraf file) can be re-imported natively instead of being rebuilt as keyframes. */
  | "REBUILD_ASSET"
  /** Not transported and not numerically reconstructable 1:1; only the creative intent can be re-approximated with DaVinci-native tools (Color page, Resolve FX, Fusion). */
  | "REBUILD_INTENT"
  /** A deterministic rebuild path is not yet proven; baking the property into the delivered media is the fallback if no automation route is verified in time. */
  | "BAKE_OPTION"
  /** No transport and no known DaVinci-native recovery path yet. Reserved for properties research has not found a route for. */
  | "LOST";

/** How much of the DaVinci-side reconstruction can be automated. */
export type AutomationClass =
  /** A deterministic graph/value reconstruction is possible via a generated artifact (Fusion comp, .setting, script) with a verified write/import path. */
  | "AUTO_REBUILD"
  /** The graph/route is deterministic, but media-specific visual tuning by a human remains (e.g. matching a soft edge to a specific photo). */
  | "ASSISTED_REBUILD"
  /** Tracking, rotoscope, occlusion, or other image-content judgement dominates; automation cannot substitute for a human's eye. */
  | "VISUAL_REBUILD"
  /** Only after a concrete automation path has been tried and disproven (never a default). */
  | "MANUAL_ONLY";

/** How trustworthy the automation route itself currently is — separate from the property's transport class. */
export type CapabilityTrust =
  /** A scripting/import mutation has actually been run against a real Resolve project and confirmed to take effect. */
  | "VERIFIED_WRITE"
  /** A generated artifact (.setting/.drfx/script output) exists and imports, but the write path itself has not been mutation-tested end to end. */
  | "GENERATED_ARTIFACT"
  /** No automated write path is verified; a human must apply the value inside DaVinci using exact Human Master numbers as instructions. */
  | "ASSISTED_MANUAL"
  /** Not yet investigated, or investigated and inconclusive. */
  | "UNKNOWN";

/** Separates "the research says this should work" from "we ran it and watched it work". */
export type EvidenceState =
  /** Backed only by Palmier source comments/tests or official Resolve docs/release notes — not yet exercised against a real project (GL-05). */
  | "PENDING_RUNTIME"
  /** An actual Resolve import/mutation/render Canary has reproduced this at least twice (docs/research run-01 promotion rule: one clip is not enough). */
  | "RUNTIME_VERIFIED";

export type NativeRoute = "EDIT" | "TEXT_PLUS" | "FUSION" | "COLOR" | "FAIRLIGHT" | "MEDIA_POOL_IMPORT";

export interface HandoffPropertyRecord {
  id: string;
  japaneseName: string;
  englishName: string;
  category: "TRANSFORM" | "TEXT" | "CROP_MASK" | "AUDIO" | "COLOR_EFFECT" | "ASSET";
  transportClass: TransportClass;
  automationClass: AutomationClass;
  capabilityTrust: CapabilityTrust;
  evidenceState: EvidenceState;
  nativeRoute: NativeRoute;
  recoveryInstructionJa: string;
  sourceCitations: string[];
  notes: string;
}

const RUN01 = "docs/research/2026-08-26-movie-tool-learning-run-01.md";
const RUN02 = "docs/research/2026-08-26-movie-tool-learning-run-02.md";

export const palmierDavinciHandoffProperties: HandoffPropertyRecord[] = [
  {
    id: "clip-placement-trim-speed",
    japaneseName: "クリップ配置/トリム/速度",
    englishName: "Clip placement / trims / speed",
    category: "TRANSFORM",
    transportClass: "EXACT",
    automationClass: "AUTO_REBUILD",
    capabilityTrust: "GENERATED_ARTIFACT",
    evidenceState: "PENDING_RUNTIME",
    nativeRoute: "EDIT",
    recoveryInstructionJa: "Palmier実timelineのFCPXMLをそのままDaVinci Editへimportする。復元操作は不要。",
    sourceCitations: [RUN01],
    notes: "Palmier FCPXMLExporterのソースコメントで transported と明記。Resolve実importでのCanary未実施。",
  },
  {
    id: "position-scale-rotation-flip",
    japaneseName: "位置/拡大縮小/回転/反転(静的・keyframe)",
    englishName: "Position / scale / rotation / flip (static + keyframes)",
    category: "TRANSFORM",
    transportClass: "APPROX",
    automationClass: "AUTO_REBUILD",
    capabilityTrust: "GENERATED_ARTIFACT",
    evidenceState: "PENDING_RUNTIME",
    nativeRoute: "EDIT",
    recoveryInstructionJa: "importされたTransformをEdit pageで確認する。Palmier Resolve-target exporterはconform-fit scaling補正・回転符号反転・Resolve独自crop符号化を行うため、異なるaspect ratio間での完全一致はActual Canaryで別途確認する。",
    sourceCitations: [RUN01],
    notes: "APPROXの理由: Resolveは同じFCPXML transform値をFinal Cutと異なる解釈をするため、Palmier exporterが値を補正している(ソースコメントで明記)。数値が転送されること自体はEXACT寄りだが、mismatched aspect ratioでの視覚的一致は未検証。",
  },
  {
    id: "crop-static",
    japaneseName: "クロップ(静的)",
    englishName: "Crop (static)",
    category: "CROP_MASK",
    transportClass: "APPROX",
    automationClass: "AUTO_REBUILD",
    capabilityTrust: "GENERATED_ARTIFACT",
    evidenceState: "PENDING_RUNTIME",
    nativeRoute: "EDIT",
    recoveryInstructionJa: "importされた静的cropをEdit pageで確認する。Resolve独自crop符号化のため、極端なcrop値は別途確認する。",
    sourceCitations: [RUN01],
    notes: "Resolve-specific crop encodingがexporterソースコメントに明記。",
  },
  {
    id: "text-properties",
    japaneseName: "文字(フォント/フェイス/サイズ/色/配置/縁取り)",
    englishName: "Text + font / face / size / color / alignment / stroke",
    category: "TEXT",
    transportClass: "EXACT",
    automationClass: "AUTO_REBUILD",
    capabilityTrust: "GENERATED_ARTIFACT",
    evidenceState: "PENDING_RUNTIME",
    nativeRoute: "TEXT_PLUS",
    recoveryInstructionJa: "importされたTitle/Text+をそのまま使う。復元操作は不要。",
    sourceCitations: [RUN01],
    notes: "Palmier FCPXMLExporterソースで transported と明記。",
  },
  {
    id: "opacity-keyframes",
    japaneseName: "不透明度(静的・keyframe)",
    englishName: "Opacity + opacity keyframes",
    category: "TRANSFORM",
    transportClass: "EXACT",
    automationClass: "AUTO_REBUILD",
    capabilityTrust: "GENERATED_ARTIFACT",
    evidenceState: "PENDING_RUNTIME",
    nativeRoute: "EDIT",
    recoveryInstructionJa: "importされたOpacity keyframeをそのまま使う。復元操作は不要。",
    sourceCitations: [RUN01],
    notes: "Palmier FCPXMLExporterソースで transported と明記。",
  },
  {
    id: "static-volume-source-timecode",
    japaneseName: "静的音量 / ソースタイムコード",
    englishName: "Static volume / source start timecode",
    category: "AUDIO",
    transportClass: "EXACT",
    automationClass: "AUTO_REBUILD",
    capabilityTrust: "GENERATED_ARTIFACT",
    evidenceState: "PENDING_RUNTIME",
    nativeRoute: "FAIRLIGHT",
    recoveryInstructionJa: "importされた静的volume/タイムコードをそのまま使う。復元操作は不要。",
    sourceCitations: [RUN01],
    notes: "Palmier FCPXMLExporterソースで transported と明記(keyframe化されたvolumeとは区別する)。",
  },
  {
    id: "audio-volume-keyframes",
    japaneseName: "音量キーフレーム",
    englishName: "Audio volume keyframes",
    category: "AUDIO",
    transportClass: "LOST",
    automationClass: "ASSISTED_REBUILD",
    capabilityTrust: "UNKNOWN",
    evidenceState: "PENDING_RUNTIME",
    nativeRoute: "FAIRLIGHT",
    recoveryInstructionJa: "Human Masterが持つ正確なdB値とtiming/curveをFairlight(またはEdit page audioキーフレーム)で人間が手動再現する。`SetProperty('Volume'|'Level'|'Gain'|'AudioVolume', ...)`はResolve 21.0.0で書き込みに失敗した非公式レポートがあるため、AUTO_REBUILDへ昇格させない。",
    sourceCitations: [RUN01, RUN02],
    notes: "GL-06/GL-07: TimelineItemのPanは映像Transform Panであり音声Panではない。一般的なResolve scripting可能性からFairlight自動化が可能とは推論しない。",
  },
  {
    id: "audio-fade",
    japaneseName: "オーディオフェード",
    englishName: "Audio fade in/out",
    category: "AUDIO",
    transportClass: "LOST",
    automationClass: "ASSISTED_REBUILD",
    capabilityTrust: "UNKNOWN",
    evidenceState: "PENDING_RUNTIME",
    nativeRoute: "FAIRLIGHT",
    recoveryInstructionJa: "Human Masterが持つduration/curveをEdit pageのfade handleまたはFairlightで人間が手動再現する。",
    sourceCitations: [RUN01, RUN02],
    notes: "音量キーフレームと同じ理由でAUTO_REBUILDを名乗らない。",
  },
  {
    id: "text-background-box",
    japaneseName: "文字の背景ボックス",
    englishName: "Text background box",
    category: "TEXT",
    transportClass: "REBUILD_VALUES",
    automationClass: "AUTO_REBUILD",
    capabilityTrust: "GENERATED_ARTIFACT",
    evidenceState: "PENDING_RUNTIME",
    nativeRoute: "FUSION",
    recoveryInstructionJa: "Human Masterのbox色/余白/角丸値から、生成したFusion comp(Background + Rectangle + Merge)を`ImportFusionComp()`でTimelineItemへ適用する。Edit page keyframe fallbackより先にFusion経路を試す。",
    sourceCitations: [RUN01, RUN02],
    notes: "AUTO_REBUILD候補と分類される根拠は、Resolve scripting APIに`ImportFusionComp()`等timeline-item操作が存在するため(run-02)。実際のmutationテストは未実施。",
  },
  {
    id: "crop-keyframes",
    japaneseName: "クロップのキーフレーム",
    englishName: "Crop keyframes",
    category: "CROP_MASK",
    transportClass: "REBUILD_VALUES",
    automationClass: "AUTO_REBUILD",
    capabilityTrust: "GENERATED_ARTIFACT",
    evidenceState: "PENDING_RUNTIME",
    nativeRoute: "FUSION",
    recoveryInstructionJa: "Human Masterのcrop keyframe値から、Fusion compを先に試す。`TimelineItem:SetProperty()`のCrop系プロパティによるEdit page keyframe再現をfallbackとする。",
    sourceCitations: [RUN01, RUN02],
    notes: "run-02のPreferred native routeに従い、Fusion優先→Edit fallbackの順。",
  },
  {
    id: "title-rotation-scale",
    japaneseName: "タイトルの回転/拡大縮小",
    englishName: "Title rotation / scale",
    category: "TEXT",
    transportClass: "REBUILD_VALUES",
    automationClass: "AUTO_REBUILD",
    capabilityTrust: "GENERATED_ARTIFACT",
    evidenceState: "PENDING_RUNTIME",
    nativeRoute: "TEXT_PLUS",
    recoveryInstructionJa: "Human Masterの回転/scale値をText+/Edit/Fusionのtransform keyframeとして再現する。意味的に妥当な場合は転送済みvideo transformで代替できないか先に確認する。",
    sourceCitations: [RUN01, RUN02],
    notes: "Palmier側のtitle rotation/scaleそのものはFCPXML非転送。",
  },
  {
    id: "edge-softness",
    japaneseName: "エッジのぼかし",
    englishName: "Edge softness",
    category: "CROP_MASK",
    transportClass: "REBUILD_VALUES",
    automationClass: "AUTO_REBUILD",
    capabilityTrust: "GENERATED_ARTIFACT",
    evidenceState: "PENDING_RUNTIME",
    nativeRoute: "FUSION",
    recoveryInstructionJa: "Fusion maskのsoft edgeで再現する。`TimelineItem:SetProperty('CropSoftness', ...)`は意味が一致する場合のみ使う(video crop用であり、maskのsoft edgeと常に同一ではない)。",
    sourceCitations: [RUN01, RUN02],
    notes: "run-02: CropSoftnessは『意味が一致する場合のみ』使う注記あり。",
  },
  {
    id: "edge-rounding",
    japaneseName: "エッジの角丸",
    englishName: "Edge rounding",
    category: "CROP_MASK",
    transportClass: "REBUILD_VALUES",
    automationClass: "AUTO_REBUILD",
    capabilityTrust: "GENERATED_ARTIFACT",
    evidenceState: "PENDING_RUNTIME",
    nativeRoute: "FUSION",
    recoveryInstructionJa: "Fusion maskまたはmacroで角丸を再現する。",
    sourceCitations: [RUN01, RUN02],
    notes: "",
  },
  {
    id: "lottie-overlay",
    japaneseName: "Lottieオーバーレイ",
    englishName: "Lottie / OGraf overlay",
    category: "ASSET",
    transportClass: "REBUILD_ASSET",
    automationClass: "AUTO_REBUILD",
    capabilityTrust: "GENERATED_ARTIFACT",
    evidenceState: "PENDING_RUNTIME",
    nativeRoute: "MEDIA_POOL_IMPORT",
    recoveryInstructionJa: "元の`.lottie`/`.json`(OGraf)ファイルをDaVinci Resolve 21のMedia Poolへネイティブ再importする(alpha維持)。Fusion側では`OGrafLoader`も使える。手動でアニメーションを作り直さない。",
    sourceCitations: [RUN01, RUN02],
    notes: "GL-03: Lottieはasset-rebuildであり手動再作成ではない。Resolve 21公式機能として存在(21.0.3時点)。",
  },
  {
    id: "palmier-color",
    japaneseName: "Palmier側のカラー編集",
    englishName: "Palmier color grade",
    category: "COLOR_EFFECT",
    transportClass: "REBUILD_INTENT",
    automationClass: "ASSISTED_REBUILD",
    capabilityTrust: "ASSISTED_MANUAL",
    evidenceState: "PENDING_RUNTIME",
    nativeRoute: "COLOR",
    recoveryInstructionJa: "数値の1:1移植ではなく、Human Masterが持つ意図(暖色寄り/コントラスト強め等)をColor pageのnodeで人間が再現する。",
    sourceCitations: [RUN01],
    notes: "1:1数値マッピングは主張しない(意図ベースの再現に限定)。",
  },
  {
    id: "palmier-effects",
    japaneseName: "Palmier側のエフェクト",
    englishName: "Palmier effects",
    category: "COLOR_EFFECT",
    transportClass: "REBUILD_INTENT",
    automationClass: "ASSISTED_REBUILD",
    capabilityTrust: "ASSISTED_MANUAL",
    evidenceState: "PENDING_RUNTIME",
    nativeRoute: "FUSION",
    recoveryInstructionJa: "エフェクトの目的(例: 光漏れ、粒子)ごとに対応するResolve FXまたはFusion nodeを個別に検討する。汎用の一括変換はしない。",
    sourceCitations: [RUN01],
    notes: "per-effect mapping required(一括ルールにしない)。",
  },
];

export function getHandoffProperty(id: string): HandoffPropertyRecord | undefined {
  return palmierDavinciHandoffProperties.find((property) => property.id === id);
}

export interface CodexRebuildInstructionInput {
  propertyId: string;
  resolveVersion: string;
  timelineName: string;
  timelineFps: number;
  timelineResolution: string;
  clipIdentity: string;
  humanMasterValue: string;
}

/**
 * Builds the exact instruction-recipe shape from
 * docs/research/2026-08-26-movie-tool-learning-run-02.md「Instruction recipe delta」.
 * This exists so an agent is never told to just "make it look the same" (GL from run-01).
 */
export function buildCodexRebuildInstruction(input: CodexRebuildInstructionInput): string {
  const property = getHandoffProperty(input.propertyId);
  if (!property) throw new Error(`Unknown handoff property id: ${input.propertyId}`);

  const transportState = property.transportClass === "EXACT" || property.transportClass === "APPROX"
    ? "FCPXML_TRANSPORTED"
    : "REBUILD_REQUIRED";
  const automationCapability =
    property.capabilityTrust === "VERIFIED_WRITE"
      ? "VERIFIED_WRITE"
      : property.capabilityTrust === "GENERATED_ARTIFACT"
        ? "GENERATED_ARTIFACT"
        : property.capabilityTrust === "ASSISTED_MANUAL"
          ? "ASSISTED_MANUAL"
          : "UNKNOWN";

  return [
    `Target: DaVinci Resolve ${input.resolveVersion}`,
    `Timeline: ${input.timelineName}, ${input.timelineFps}fps, ${input.timelineResolution}`,
    `Clip: ${input.clipIdentity}`,
    `Human Master property: ${property.japaneseName} (${property.englishName}) = ${input.humanMasterValue}`,
    `Transport state: ${transportState}`,
    `Preferred native route: ${property.nativeRoute}`,
    `Automation capability: ${automationCapability}`,
    "Editable-after-rebuild: required",
    "Verification: readback + render checkpoint + dependency check",
    `Evidence state: ${property.evidenceState}${property.evidenceState === "PENDING_RUNTIME" ? " (do not report this as confirmed working until an actual Resolve Canary passes twice)" : ""}`,
  ].join("\n");
}
