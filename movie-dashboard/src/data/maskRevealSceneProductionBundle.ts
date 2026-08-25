import { resolveMaskRevealEditableIntent } from "./humanEditableMotionIntent";
import {
  buildMaskRevealEditableProductionOutputs,
  buildMaskRevealEditableSourceOfTruth,
} from "./maskRevealEditableProduction";
import { buildMaskRevealMotionHandoffManifest } from "./maskRevealHandoff";
import { createMaskRevealDaVinciAppliedEvidenceTemplate } from "./maskRevealDaVinciAppliedEvidence";
import {
  buildMaskRevealDaVinciValueBridge,
  MASK_REVEAL_VERTICAL_SLICE_CONTEXT,
  resolveCanonicalMaskRevealState,
} from "./maskRevealPresetBridge";
import type { MaskRevealSceneInstance } from "./visualSceneComposer";

export interface MaskRevealSceneProductionBundleV1 {
  schemaVersion: "motion-zukan-scene-production/v1";
  authority: "HUMAN_MASTER";
  patternId: "type-mask-reveal";
  sceneId: string;
  projectId: "opening" | "profile";
  sourceRevision: string;
  sceneMarkerId: string;
  recipeProvenance: MaskRevealSceneInstance["recipeProvenance"];
  serialization: {
    format: "JSON";
    role: "TARGET_SPECIFIC_SIDECAR";
    humanMaster: false;
  };
  sceneTiming: {
    targetDurationSeconds: number;
    computedDurationSeconds: number;
    durationDeltaSeconds: number;
  };
  humanState: {
    humanSelectedFields: string[];
    lockedFields: string[];
    editableSourceOfTruth: ReturnType<typeof buildMaskRevealEditableSourceOfTruth>;
    resolvedEditableIntent: ReturnType<typeof resolveMaskRevealEditableIntent>;
    canonicalSceneState: ReturnType<typeof resolveCanonicalMaskRevealState>;
  };
  timeline: {
    producer: "Palmier";
    expectedFormat: "NLE_XML";
    projectTimelineXmlFileName: string;
    sidecarFileName: string;
    xmlGeneratedExternally: true;
    markerRule: string;
  };
  palmier: {
    capability: "PALMIER_TIMING_ONLY";
    instruction: string;
    actualEvidence: {
      appliedValue: null;
      difference: null;
      rule: string;
    };
  };
  davinci: {
    implementationId: "impl-type-mask-reveal-davinci-text-plus";
    finishManifest: string;
    valueBridge: ReturnType<typeof buildMaskRevealDaVinciValueBridge>;
    appliedEvidence: ReturnType<typeof createMaskRevealDaVinciAppliedEvidenceTemplate>;
    verificationEvidence: ReturnType<typeof buildMaskRevealMotionHandoffManifest>["verificationEvidence"];
  };
  preview: {
    currentStatus: "CONCEPT";
    canonicalTarget: "ACTUAL_DAVINCI_RENDER";
    productionReady: false;
  };
  freshness: {
    generatedFromSceneUpdatedAt: string;
    rule: string;
  };
}

function safeFileToken(value: string) {
  return value
    .trim()
    .replace(/[^a-zA-Z0-9_-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || "scene";
}

function markerSceneToken(sceneId: string) {
  return safeFileToken(sceneId).replace(/-/g, "_").toUpperCase().slice(0, 48);
}

export function maskRevealSceneMarkerId(scene: MaskRevealSceneInstance) {
  return `VML_MASK_REVEAL_${scene.editableIntent.section}_${markerSceneToken(scene.sceneId)}`;
}

export function buildMaskRevealSceneProductionBundle(
  scene: MaskRevealSceneInstance,
): MaskRevealSceneProductionBundleV1 {
  const resolved = resolveMaskRevealEditableIntent(scene.editableIntent);
  const editableSourceOfTruth = buildMaskRevealEditableSourceOfTruth(scene.editableIntent);
  const canonicalSceneState = resolveCanonicalMaskRevealState(scene.editableIntent);
  const production = buildMaskRevealEditableProductionOutputs(scene.editableIntent);
  const davinciValueBridge = buildMaskRevealDaVinciValueBridge(scene.editableIntent, MASK_REVEAL_VERTICAL_SLICE_CONTEXT);
  const davinciAppliedEvidence = createMaskRevealDaVinciAppliedEvidenceTemplate(scene);
  const legacyHandoff = buildMaskRevealMotionHandoffManifest({
    text: resolved.text,
    mediaLabel: resolved.mediaLabel,
    section: scene.editableIntent.section,
    intensity: resolved.intensity,
    durationSeconds: resolved.enterDurationSeconds,
  });
  const sceneMarkerId = maskRevealSceneMarkerId(scene);
  const fileToken = safeFileToken(scene.sceneId);

  return {
    schemaVersion: "motion-zukan-scene-production/v1",
    authority: "HUMAN_MASTER",
    patternId: "type-mask-reveal",
    sceneId: scene.sceneId,
    projectId: scene.projectId,
    sourceRevision: scene.updatedAt,
    sceneMarkerId,
    recipeProvenance: scene.recipeProvenance,
    serialization: {
      format: "JSON",
      role: "TARGET_SPECIFIC_SIDECAR",
      humanMaster: false,
    },
    sceneTiming: {
      targetDurationSeconds: scene.targetDurationSeconds,
      computedDurationSeconds: scene.computedDurationSeconds,
      durationDeltaSeconds: scene.durationDeltaSeconds,
    },
    humanState: {
      humanSelectedFields: [...scene.humanSelectedFields],
      lockedFields: [...scene.lockedFields],
      editableSourceOfTruth,
      resolvedEditableIntent: resolved,
      canonicalSceneState,
    },
    timeline: {
      producer: "Palmier",
      expectedFormat: "NLE_XML",
      projectTimelineXmlFileName: `palmier-${scene.projectId}-timeline.xml`,
      sidecarFileName: `${fileToken}-mask-reveal-handoff.json`,
      xmlGeneratedExternally: true,
      markerRule: `Palmier実timeline内で ${sceneMarkerId} をSceneInstanceの一意識別子として保持する。XMLはPalmier実timelineからexportし、アプリ側で捏造しない。`,
    },
    palmier: {
      capability: "PALMIER_TIMING_ONLY",
      instruction: production.palmierInstruction,
      actualEvidence: {
        appliedValue: null,
        difference: null,
        rule: "Palmier実出力を確認した後だけappliedValue/differenceを記録する。Human Master値は書き換えない。",
      },
    },
    davinci: {
      implementationId: "impl-type-mask-reveal-davinci-text-plus",
      finishManifest: production.davinciFinishManifest,
      valueBridge: davinciValueBridge,
      appliedEvidence: davinciAppliedEvidence,
      verificationEvidence: {
        ...legacyHandoff.verificationEvidence,
        markerId: sceneMarkerId,
      },
    },
    preview: {
      currentStatus: "CONCEPT",
      canonicalTarget: "ACTUAL_DAVINCI_RENDER",
      productionReady: false,
    },
    freshness: {
      generatedFromSceneUpdatedAt: scene.updatedAt,
      rule: "SceneInstance.updatedAtが変わったら、このbundleを再生成してからPalmier/DaVinciへ渡す。古いbundleを自動適用しない。",
    },
  };
}

export function buildMaskRevealSceneProductionBundleJson(scene: MaskRevealSceneInstance) {
  return JSON.stringify(buildMaskRevealSceneProductionBundle(scene), null, 2);
}
