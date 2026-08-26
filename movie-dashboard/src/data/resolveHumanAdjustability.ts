/**
 * Human-adjustability authority for Resolve handoff recipes.
 *
 * This is intentionally separate from transport fidelity and parametric editability.
 * A capability may import perfectly but still be painful for a human to revise, or it may
 * expose only clip-level edits while remaining very easy to trim/reposition in the Edit page.
 */

export type HumanAdjustabilityClass =
  | "EASY_INSPECTOR"
  | "EASY_TIMELINE"
  | "GUIDED_FUSION"
  | "ASSISTED_MANUAL"
  | "BAKED";

export type ResolvePlatformScope = "ALL_DESKTOP" | "MACOS_WINDOWS" | "UNKNOWN";
export type HumanAdjustabilityEvidence = "OFFICIAL_BEHAVIOR" | "PENDING_RUNTIME";

export interface ResolveHumanAdjustabilityRecord {
  propertyId: string;
  adjustabilityClass: HumanAdjustabilityClass;
  platformScope: ResolvePlatformScope;
  evidenceState: HumanAdjustabilityEvidence;
  humanInstructionJa: string;
  lateEditCheckJa: string;
  sourceRefs: string[];
}

const RESOLVE21_GUIDE =
  "https://documents.blackmagicdesign.com/SupportNotes/DaVinci_Resolve_21_New_Features_Guide.pdf";
const RUN09 = "docs/research/2026-08-26-movie-tool-learning-run-09-human-adjustability-resolve21.md";
const RUN17 = "docs/research/2026-08-26-movie-tool-learning-run-17-resolve21-text-late-edit-and-font-deps.md";
const RUN19 = "docs/research/2026-08-26-movie-tool-learning-run-19-resolve21-lottie-platform-boundary.md";

export const resolveHumanAdjustability: ResolveHumanAdjustabilityRecord[] = [
  {
    propertyId: "text-properties",
    adjustabilityClass: "EASY_INSPECTOR",
    platformScope: "ALL_DESKTOP",
    evidenceState: "OFFICIAL_BEHAVIOR",
    humanInstructionJa:
      "最終コピーが未確定なら焼き込まず、Edit Inspectorで本文・フォント・サイズ・色を変更できるNative Text/Text+/公開Template controlを優先する。",
    lateEditCheckJa:
      "コピー差替え、和文/欧文、font style、duration変更を行い、Fusion graphを開かず期待見た目へ戻せることを確認する。",
    sourceRefs: [RESOLVE21_GUIDE, RUN09, RUN17],
  },
  {
    propertyId: "lottie-overlay",
    adjustabilityClass: "EASY_TIMELINE",
    platformScope: "MACOS_WINDOWS",
    evidenceState: "OFFICIAL_BEHAVIOR",
    humanInstructionJa:
      "macOS/WindowsのResolve 21では元.lottie/OGrafを直接importする。Timeline上の配置・trim等は簡単に行えるが、内部animation parameterの編集性とは分ける。",
    lateEditCheckJa:
      "alpha、trim、duration、save/reopenを確認し、内部調整が必要ならOGrafLoader/Fusionを別Canaryで評価する。",
    sourceRefs: [RESOLVE21_GUIDE, RUN19],
  },
  {
    propertyId: "audio-volume-keyframes",
    adjustabilityClass: "EASY_TIMELINE",
    platformScope: "ALL_DESKTOP",
    evidenceState: "PENDING_RUNTIME",
    humanInstructionJa:
      "自動writeを約束せず、Human MasterのdB/timingをEdit/Fairlightのaudio keyframeとして再構築する。Resolve 21のsubframe編集を使い精度を落とさない。",
    lateEditCheckJa:
      "人間が対象clipだけを選び、指定dB/timingへ変更し、再生・save/reopenで結果を確認できるか実機Canaryする。",
    sourceRefs: [RUN09],
  },
  {
    propertyId: "audio-fade",
    adjustabilityClass: "EASY_TIMELINE",
    platformScope: "ALL_DESKTOP",
    evidenceState: "PENDING_RUNTIME",
    humanInstructionJa:
      "FCPXMLで落ちたfadeはHuman Masterのduration/curveを見ながらTimeline/Fairlightで再構築する。外部script writeが未確認でも人間調整経路は残す。",
    lateEditCheckJa:
      "fade durationを変更→save/reopen→聴感/波形/必要ならrenderで確認する。",
    sourceRefs: [RUN09],
  },
  {
    propertyId: "text-background-box",
    adjustabilityClass: "GUIDED_FUSION",
    platformScope: "ALL_DESKTOP",
    evidenceState: "PENDING_RUNTIME",
    humanInstructionJa:
      "Fusion graph全体を見せず、生成したDRFX/Edit TemplateのInspectorへ背景色・余白・角丸など必要なcontrolだけ公開する。",
    lateEditCheckJa:
      "Editページだけで背景色/余白/角丸を変更でき、save/reopen後も保持されるか確認する。",
    sourceRefs: [RESOLVE21_GUIDE, RUN09],
  },
  {
    propertyId: "crop-keyframes",
    adjustabilityClass: "GUIDED_FUSION",
    platformScope: "ALL_DESKTOP",
    evidenceState: "PENDING_RUNTIME",
    humanInstructionJa:
      "Fusion再構築が必要でもCrop/Reveal量など意味のある少数controlだけInspectorへ公開し、通常修正でnode graphを要求しない。",
    lateEditCheckJa:
      "公開controlのkeyframeをEditページで調整し、duration変更後のtimingとsave/reopenを確認する。",
    sourceRefs: [RESOLVE21_GUIDE, RUN09],
  },
  {
    propertyId: "edge-softness",
    adjustabilityClass: "GUIDED_FUSION",
    platformScope: "ALL_DESKTOP",
    evidenceState: "PENDING_RUNTIME",
    humanInstructionJa:
      "まず意味が一致するNative/Edit controlを評価し、不足時だけFusion maskを使う。Fusionの場合もSoftnessだけを人間向けInspectorへ公開する。",
    lateEditCheckJa:
      "Softness controlだけで意図する見た目へ変更できることをGolden比較する。",
    sourceRefs: [RUN09],
  },
  {
    propertyId: "edge-rounding",
    adjustabilityClass: "GUIDED_FUSION",
    platformScope: "ALL_DESKTOP",
    evidenceState: "PENDING_RUNTIME",
    humanInstructionJa:
      "角丸だけのために複雑なgraphを触らせない。Native FX/Inspector routeを先に探し、Fusion fallbackではRadius相当controlだけ公開する。",
    lateEditCheckJa:
      "角丸量の変更がInspectorだけで完結し、他のmotion値を壊さないことを確認する。",
    sourceRefs: [RUN09],
  },
];

export function getResolveHumanAdjustability(
  propertyId: string,
): ResolveHumanAdjustabilityRecord | undefined {
  return resolveHumanAdjustability.find((record) => record.propertyId === propertyId);
}
