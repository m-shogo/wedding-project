import {
  buildTypographyProductionRoleBinding,
  type TypographyProductionRoleBindingV1,
} from "./typographyProductionRoleBinding";
import {
  buildTypographySceneDeliveryPackage,
  type TypographySceneDeliveryPackageV1,
} from "./typographySceneDeliveryPackage";
import type {TypographyProductionSelectionV1} from "./typographySceneProductionRouting";
import type {WeddingTypographyRoleGuideItem} from "./weddingTypographyProductionRoleGuide.generated";
import type {MaskRevealSceneInstance} from "./visualSceneComposer";

export interface TypographySceneRoleDeliveryPackageV1 {
  schemaVersion: "wedding-movie-typography-role-delivery/v1";
  authority: "DERIVED_DELIVERY_PACKAGE";
  scene: {
    sceneId: string;
    projectId: "opening" | "profile";
    sourceRevision: string;
  };
  productionUse: TypographyProductionRoleBindingV1;
  delivery: TypographySceneDeliveryPackageV1;
  handoffSummary: {
    productionRole: WeddingTypographyRoleGuideItem["role"];
    selectedPatternId: TypographyProductionSelectionV1["patternId"];
    selectionClass: "PRIMARY" | "FALLBACK" | "CUSTOM";
    palmierTimelineOwner: true;
    davinciVisualOwner: true;
    studioGuiActual: "NOT_RUN";
    davinciGuiActual: "NOT_RUN";
    productionReady: false;
  };
  rules: readonly string[];
}

export function buildTypographySceneRoleDeliveryPackage(
  scene: MaskRevealSceneInstance,
  selection: TypographyProductionSelectionV1,
  productionRole: WeddingTypographyRoleGuideItem["role"],
): TypographySceneRoleDeliveryPackageV1 {
  const productionUse = buildTypographyProductionRoleBinding(scene, selection, productionRole);
  const delivery = buildTypographySceneDeliveryPackage(scene, selection);

  return {
    schemaVersion: "wedding-movie-typography-role-delivery/v1",
    authority: "DERIVED_DELIVERY_PACKAGE",
    scene: {
      sceneId: scene.sceneId,
      projectId: scene.projectId,
      sourceRevision: scene.updatedAt,
    },
    productionUse,
    delivery,
    handoffSummary: {
      productionRole,
      selectedPatternId: selection.patternId,
      selectionClass: productionUse.choiceKind,
      palmierTimelineOwner: true,
      davinciVisualOwner: true,
      studioGuiActual: "NOT_RUN",
      davinciGuiActual: "NOT_RUN",
      productionReady: false,
    },
    rules: [
      "productionRoleはWedding Production Typography Guideの同一movieId roleだけを許可する。",
      "selectedPatternIdはHuman-selected routeを保持し、primary/fallback推奨へ自動置換しない。",
      "PRIMARY/FALLBACK/CUSTOMはhandoff説明用のderived classificationであり、新しいselection authorityではない。",
      "Palmierはplacement/trim/marker timing owner、DaVinciはvisual translation ownerとして分離する。",
      "Mac Remotion Studio GUI ActualとDaVinci Resolve GUI Actualは実施証拠なしでは常にNOT_RUN。",
      "このsidecarを書き出しただけではproductionReadyへ昇格しない。",
    ],
  };
}

export function buildTypographySceneRoleDeliveryPackageJson(
  scene: MaskRevealSceneInstance,
  selection: TypographyProductionSelectionV1,
  productionRole: WeddingTypographyRoleGuideItem["role"],
) {
  return JSON.stringify(buildTypographySceneRoleDeliveryPackage(scene, selection, productionRole), null, 2);
}

export function parseAndValidateTypographySceneRoleDeliveryPackage(
  raw: string,
  scene: MaskRevealSceneInstance,
  selection: TypographyProductionSelectionV1,
  productionRole: WeddingTypographyRoleGuideItem["role"],
): TypographySceneRoleDeliveryPackageV1 {
  const parsed = JSON.parse(raw) as Partial<TypographySceneRoleDeliveryPackageV1>;
  if (parsed.schemaVersion !== "wedding-movie-typography-role-delivery/v1") throw new Error("TYPOGRAPHY_ROLE_DELIVERY_ENVELOPE_MISMATCH");
  if (parsed.scene?.sceneId !== scene.sceneId || parsed.scene?.sourceRevision !== scene.updatedAt) {
    throw new Error("STALE_TYPOGRAPHY_ROLE_DELIVERY_PACKAGE");
  }
  if (parsed.productionUse?.productionRole !== productionRole) throw new Error("TYPOGRAPHY_ROLE_DELIVERY_ROLE_MISMATCH");
  const expected = buildTypographySceneRoleDeliveryPackage(scene, selection, productionRole);
  if (parsed.productionUse?.patternId !== expected.productionUse.patternId) throw new Error("TYPOGRAPHY_ROLE_DELIVERY_PATTERN_MISMATCH");
  if (parsed.productionUse?.choiceKind !== expected.productionUse.choiceKind) throw new Error("TYPOGRAPHY_ROLE_DELIVERY_CHOICE_KIND_MISMATCH");
  if (parsed.handoffSummary?.studioGuiActual !== "NOT_RUN" || parsed.handoffSummary?.davinciGuiActual !== "NOT_RUN") {
    throw new Error("TYPOGRAPHY_ROLE_DELIVERY_MUST_NOT_CLAIM_GUI_ACTUAL");
  }
  if (parsed.handoffSummary?.productionReady !== false) throw new Error("TYPOGRAPHY_ROLE_DELIVERY_MUST_NOT_CLAIM_PRODUCTION_READY");
  return parsed as TypographySceneRoleDeliveryPackageV1;
}
