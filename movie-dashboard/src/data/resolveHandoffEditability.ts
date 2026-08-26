/**
 * DaVinci handoff editability authority.
 *
 * Transport/rebuild success and post-handoff editability are intentionally
 * separate axes. A file can import and render correctly while exposing only
 * clip-level controls rather than the original animation parameters.
 *
 * Current evidence (Blackmagic Resolve 21 New Features Guide, checked
 * 2026-08-26): .lottie / OGraf files can be dragged to the Media Pool or
 * timeline, preserve alpha, and are treated like a fully rendered animation
 * clip. Fusion also provides OGrafLoader. The guide does not claim that direct
 * timeline import exposes the source Lottie animation graph as editable
 * keyframes/controls.
 */

export type HandoffEditabilityClass =
  | "PARAMETRIC_NATIVE"
  | "CLIP_LEVEL_ONLY"
  | "GRAPH_EDITABLE_CANDIDATE"
  | "INTENT_ONLY"
  | "UNKNOWN";

export type EditabilityEvidenceState = "OFFICIAL_BEHAVIOR" | "PENDING_RUNTIME";

export interface ResolveHandoffEditabilityRecord {
  propertyId: string;
  editabilityClass: HandoffEditabilityClass;
  evidenceState: EditabilityEvidenceState;
  instructionJa: string;
  verificationJa: string;
  sourceUrls: string[];
}

const RESOLVE21_GUIDE = "https://documents.blackmagicdesign.com/SupportNotes/DaVinci_Resolve_21_New_Features_Guide.pdf";

export const resolveHandoffEditability: ResolveHandoffEditabilityRecord[] = [
  {
    propertyId: "lottie-overlay",
    editabilityClass: "CLIP_LEVEL_ONLY",
    evidenceState: "OFFICIAL_BEHAVIOR",
    instructionJa: "Direct importは最優先のREBUILD_ASSET経路として使う。ただし『import/renderできる』ことを『Lottie内部モーションがDaVinci native parameterとして編集できる』ことと同一視しない。内部調整が必要ならOGrafLoader/Fusion経路を別Canaryで評価する。",
    verificationJa: "clean projectへ.lottieをimportし、alpha・duration・trim・save/reopenを確認する。次にInspector/Fusionで内部animation parameterが編集可能かを別項目としてreadbackし、確認できない限りCLIP_LEVEL_ONLYを維持する。",
    sourceUrls: [RESOLVE21_GUIDE],
  },
];

export function getResolveHandoffEditability(propertyId: string): ResolveHandoffEditabilityRecord | undefined {
  return resolveHandoffEditability.find((record) => record.propertyId === propertyId);
}
