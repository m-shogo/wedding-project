/**
 * DaVinci Resolve automation / packaging availability authority.
 *
 * Purpose: separate "Resolve can do this" from "Codex can automate this in the
 * user's installed edition/context". Capability presence is not execution
 * availability.
 *
 * Evidence (checked 2026-08-26):
 * - Blackmagic Design current DaVinci Resolve Studio page: Python/Lua,
 *   developer APIs, workflow integrations and remote scripting API are Studio
 *   capabilities.
 * - Blackmagic Design Fusion 21 compare page: embedded Lua/Python scripting,
 *   macros and custom-tool extensibility are supported in Fusion 21 inside
 *   DaVinci Resolve Studio 21.
 * - Blackmagic Design Resolve 21 New Features Guide: .lottie / OGraf direct
 *   Media Pool/timeline import and OGrafLoader are native Resolve 21 features.
 *
 * Keep these states version/edition scoped. Do not infer a current Free-edition
 * external API from an old script working through an internal console.
 */

export type ResolveEdition = "FREE" | "STUDIO" | "UNKNOWN";

export type ResolveAutomationMode =
  | "DIRECT_MEDIA_IMPORT"
  | "MANUAL_NATIVE_UI"
  | "FUSION_MACRO_TEMPLATE"
  | "EMBEDDED_SCRIPT"
  | "EXTERNAL_SCRIPT_API"
  | "WORKFLOW_INTEGRATION";

export type AvailabilityConfidence = "OFFICIAL_CURRENT" | "NEEDS_RUNTIME";

export interface ResolveAutomationAvailabilityRecord {
  id: string;
  mode: ResolveAutomationMode;
  minimumEdition: ResolveEdition;
  canCodexDriveExternally: boolean;
  humanCanUseWithoutExternalApi: boolean;
  confidence: AvailabilityConfidence;
  instructionJa: string;
  sourceUrls: string[];
}

const STUDIO_SOURCE = "https://www.blackmagicdesign.com/jp/products/davinciresolve/studio";
const FUSION_COMPARE_SOURCE = "https://www.blackmagicdesign.com/products/fusion/compare";
const RESOLVE21_GUIDE = "https://documents.blackmagicdesign.com/SupportNotes/DaVinci_Resolve_21_New_Features_Guide.pdf";

export const resolveAutomationAvailability: ResolveAutomationAvailabilityRecord[] = [
  {
    id: "lottie-direct-import",
    mode: "DIRECT_MEDIA_IMPORT",
    minimumEdition: "UNKNOWN",
    canCodexDriveExternally: false,
    humanCanUseWithoutExternalApi: true,
    confidence: "OFFICIAL_CURRENT",
    instructionJa: "元の.lottie/.jsonをまずMedia PoolまたはTimelineへ直接importする。外部Scripting APIを前提にしない。alpha/duration/trim/save-reopenを実機確認する。",
    sourceUrls: [RESOLVE21_GUIDE],
  },
  {
    id: "fusion-macro-template",
    mode: "FUSION_MACRO_TEMPLATE",
    minimumEdition: "UNKNOWN",
    canCodexDriveExternally: false,
    humanCanUseWithoutExternalApi: true,
    confidence: "OFFICIAL_CURRENT",
    instructionJa: "再利用可能なFusion graphはMacro/Edit Templateとしてpackaging候補にする。生成・install・依存解決は実機Canaryが通るまでPENDING_RUNTIME。",
    sourceUrls: [RESOLVE21_GUIDE, FUSION_COMPARE_SOURCE],
  },
  {
    id: "resolve-python-lua-developer-api",
    mode: "EXTERNAL_SCRIPT_API",
    minimumEdition: "STUDIO",
    canCodexDriveExternally: true,
    humanCanUseWithoutExternalApi: false,
    confidence: "OFFICIAL_CURRENT",
    instructionJa: "Codex/Python/LuaからResolve Developer APIを外部制御する設計はDaVinci Resolve Studio前提として扱う。editionがFREE/UNKNOWNならAUTO_REBUILDを約束せず、native UI・artifact import・assisted routeへ降格する。",
    sourceUrls: [STUDIO_SOURCE],
  },
  {
    id: "resolve-workflow-integration",
    mode: "WORKFLOW_INTEGRATION",
    minimumEdition: "STUDIO",
    canCodexDriveExternally: true,
    humanCanUseWithoutExternalApi: false,
    confidence: "OFFICIAL_CURRENT",
    instructionJa: "JavaScript Workflow Integrationや外部automation system連携はStudio capabilityとして扱い、Free版を前提にしたRecovery Pathへ混ぜない。",
    sourceUrls: [STUDIO_SOURCE],
  },
  {
    id: "fusion-embedded-scripting",
    mode: "EMBEDDED_SCRIPT",
    minimumEdition: "STUDIO",
    canCodexDriveExternally: false,
    humanCanUseWithoutExternalApi: true,
    confidence: "OFFICIAL_CURRENT",
    instructionJa: "Fusion内Lua/Python scriptingはStudio/Fusion Studio側のextensibilityとしてversion-pinする。外部Codex操作とembedded scriptingを同一Capabilityとして扱わない。",
    sourceUrls: [FUSION_COMPARE_SOURCE],
  },
];

export function getResolveAutomationAvailability(id: string): ResolveAutomationAvailabilityRecord | undefined {
  return resolveAutomationAvailability.find((record) => record.id === id);
}

export function resolveCodexAutomationGuardrail(edition: ResolveEdition): string {
  if (edition === "STUDIO") {
    return "DaVinci Resolve Studio: external Python/Lua/Developer API route is an official capability, but each mutation still requires runtime verification before VERIFIED_WRITE.";
  }
  if (edition === "FREE") {
    return "DaVinci Resolve Free: do not promise external Codex/Python/Lua Developer API automation. Prefer direct asset import, editable native UI/Macro/Template artifacts, or ASSISTED_REBUILD unless a Free-edition runtime proves a specific route.";
  }
  return "DaVinci edition unknown: ask/inspect edition before selecting an external scripting route. Until resolved, treat external Codex automation as availability-unverified and keep a non-API fallback.";
}
