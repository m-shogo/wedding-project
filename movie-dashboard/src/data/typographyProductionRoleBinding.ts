import type {TypographyProductionSelectionV1} from "./typographySceneProductionRouting";
import {
  getWeddingTypographyProductionRoleGuide,
  type WeddingTypographyRoleGuideItem,
} from "./weddingTypographyProductionRoleGuide.generated";
import type {MaskRevealSceneInstance} from "./visualSceneComposer";

export type TypographyProductionChoiceKind = "PRIMARY" | "FALLBACK" | "CUSTOM";

export interface TypographyProductionRoleBindingV1 {
  schemaVersion: "typography-production-role-binding/v1";
  authority: "DERIVED_FROM_HUMAN_SELECTED_ROUTE_AND_PRODUCTION_ROLE";
  sceneId: string;
  projectId: "opening" | "profile";
  sourceRevision: string;
  productionRole: WeddingTypographyRoleGuideItem["role"];
  patternId: TypographyProductionSelectionV1["patternId"];
  choiceKind: TypographyProductionChoiceKind;
  roleReason: string;
  selectedAt: string;
  selectionAuthority: "HUMAN_SELECTED";
  freshness: {
    sceneRevision: string;
    selectionRevision: string;
    fresh: true;
  };
}

function requireRoleGuide(scene: MaskRevealSceneInstance, productionRole: WeddingTypographyRoleGuideItem["role"]) {
  const guide = getWeddingTypographyProductionRoleGuide(scene.projectId).find((item) => item.role === productionRole);
  if (!guide) {
    throw new Error(`TYPOGRAPHY_PRODUCTION_ROLE_NOT_AVAILABLE_FOR_PROJECT:${scene.projectId}:${productionRole}`);
  }
  return guide;
}

function assertFreshSelection(scene: MaskRevealSceneInstance, selection: TypographyProductionSelectionV1) {
  if (selection.sceneId !== scene.sceneId) throw new Error("TYPOGRAPHY_ROLE_BINDING_SCENE_MISMATCH");
  if (selection.sourceRevision !== scene.updatedAt) throw new Error("STALE_TYPOGRAPHY_ROLE_BINDING_SELECTION");
  if (selection.authority !== "HUMAN_SELECTED") throw new Error("TYPOGRAPHY_ROLE_BINDING_REQUIRES_HUMAN_SELECTION");
}

function classifyPattern(guide: WeddingTypographyRoleGuideItem, patternId: string): TypographyProductionChoiceKind {
  if (patternId === guide.primaryPatternId) return "PRIMARY";
  if (guide.fallbackPatternIds.includes(patternId)) return "FALLBACK";
  return "CUSTOM";
}

export function buildTypographyProductionRoleBinding(
  scene: MaskRevealSceneInstance,
  selection: TypographyProductionSelectionV1,
  productionRole: WeddingTypographyRoleGuideItem["role"],
): TypographyProductionRoleBindingV1 {
  assertFreshSelection(scene, selection);
  const guide = requireRoleGuide(scene, productionRole);
  return {
    schemaVersion: "typography-production-role-binding/v1",
    authority: "DERIVED_FROM_HUMAN_SELECTED_ROUTE_AND_PRODUCTION_ROLE",
    sceneId: scene.sceneId,
    projectId: scene.projectId,
    sourceRevision: scene.updatedAt,
    productionRole,
    patternId: selection.patternId,
    choiceKind: classifyPattern(guide, selection.patternId),
    roleReason: guide.reason,
    selectedAt: selection.selectedAt,
    selectionAuthority: "HUMAN_SELECTED",
    freshness: {
      sceneRevision: scene.updatedAt,
      selectionRevision: selection.sourceRevision,
      fresh: true,
    },
  };
}

export function parseAndValidateTypographyProductionRoleBinding(
  raw: string,
  scene: MaskRevealSceneInstance,
  selection: TypographyProductionSelectionV1,
): TypographyProductionRoleBindingV1 {
  const parsed = JSON.parse(raw) as Partial<TypographyProductionRoleBindingV1>;
  if (parsed.schemaVersion !== "typography-production-role-binding/v1") throw new Error("TYPOGRAPHY_ROLE_BINDING_ENVELOPE_MISMATCH");
  if (parsed.sceneId !== scene.sceneId || parsed.projectId !== scene.projectId) throw new Error("TYPOGRAPHY_ROLE_BINDING_SCENE_MISMATCH");
  if (parsed.sourceRevision !== scene.updatedAt || parsed.freshness?.selectionRevision !== selection.sourceRevision) {
    throw new Error("STALE_TYPOGRAPHY_ROLE_BINDING");
  }
  if (parsed.patternId !== selection.patternId || parsed.selectedAt !== selection.selectedAt) {
    throw new Error("TYPOGRAPHY_ROLE_BINDING_ROUTE_MISMATCH");
  }
  if (!parsed.productionRole) throw new Error("TYPOGRAPHY_ROLE_BINDING_ROLE_MISSING");
  const expected = buildTypographyProductionRoleBinding(scene, selection, parsed.productionRole);
  if (parsed.choiceKind !== expected.choiceKind) throw new Error("TYPOGRAPHY_ROLE_BINDING_CHOICE_KIND_MISMATCH");
  if (parsed.roleReason !== expected.roleReason) throw new Error("TYPOGRAPHY_ROLE_BINDING_REASON_DRIFT");
  return parsed as TypographyProductionRoleBindingV1;
}
