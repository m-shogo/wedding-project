import {
  applyHumanSelection,
  listHumanSelectedMaskRevealFields,
  listLockedMaskRevealFields,
  resolveMaskRevealEditableIntent,
  type MaskRevealEditableFieldKey,
  type MaskRevealEditableFields,
  type MaskRevealEditableIntent,
} from "./humanEditableMotionIntent";

export type ScenePrimarySubject = "IMAGE" | "TEXT" | "MULTI_IMAGE" | "TRANSITION" | "IMPACT";
export type SceneComplexity = "CALM" | "BALANCED" | "BUSY";

export interface MaskRevealSceneRecipe {
  recipeId: "scene-recipe-mask-reveal-hero-v1";
  revision: 1;
  label: "Hero Photo + Mask Reveal";
  patternId: "type-mask-reveal";
  primarySubject: "IMAGE";
  secondarySubject: "TEXT";
  authority: "EDITABLE_DEFAULT_ONLY";
}

export interface MaskRevealSceneInstance {
  schemaVersion: "scene-instance/v1";
  sceneId: string;
  status: "ADOPTED";
  authority: "HUMAN_MASTER";
  recipeProvenance: MaskRevealSceneRecipe;
  primarySubject: ScenePrimarySubject;
  secondarySubject: "TEXT";
  complexity: SceneComplexity;
  editableIntent: MaskRevealEditableIntent;
  targetDurationSeconds: number;
  computedDurationSeconds: number;
  durationDeltaSeconds: number;
  humanSelectedFields: MaskRevealEditableFieldKey[];
  lockedFields: MaskRevealEditableFieldKey[];
}

export interface TimelineScenePlacement {
  sceneId: string;
  startSeconds: number;
  endSeconds: number;
  durationSeconds: number;
}

export interface SceneEdge {
  fromSceneId: string;
  toSceneId: string;
  transition: "HARD_CUT";
}

export interface ProjectTimelineV1 {
  schemaVersion: "project-timeline/v1";
  authority: "STRUCTURED_SCENE_TIMELINE";
  sceneIds: string[];
  placements: TimelineScenePlacement[];
  edges: SceneEdge[];
  totalComputedDurationSeconds: number;
}

export const maskRevealHeroSceneRecipe: MaskRevealSceneRecipe = {
  recipeId: "scene-recipe-mask-reveal-hero-v1",
  revision: 1,
  label: "Hero Photo + Mask Reveal",
  patternId: "type-mask-reveal",
  primarySubject: "IMAGE",
  secondarySubject: "TEXT",
  authority: "EDITABLE_DEFAULT_ONLY",
};

function cloneEditableIntent(intent: MaskRevealEditableIntent): MaskRevealEditableIntent {
  return JSON.parse(JSON.stringify(intent)) as MaskRevealEditableIntent;
}

export function computeMaskRevealSceneDuration(intent: MaskRevealEditableIntent) {
  const value = resolveMaskRevealEditableIntent(intent);
  const textStructuralEnd =
    value.layerDelaySeconds +
    value.motionDelaySeconds +
    value.enterDurationSeconds +
    value.holdDurationSeconds +
    value.exitDurationSeconds;

  // For this MVP Hero scene, IMAGE/VIDEO is visible for the target scene duration.
  // If text timing extends beyond it, computed duration grows rather than silently truncating a human choice.
  return Number(Math.max(value.sceneDurationSeconds, textStructuralEnd).toFixed(3));
}

export function adoptMaskRevealScene(
  sourceIntent: MaskRevealEditableIntent,
  sceneId: string,
  recipe: MaskRevealSceneRecipe = maskRevealHeroSceneRecipe,
): MaskRevealSceneInstance {
  const editableIntent = cloneEditableIntent(sourceIntent);
  const resolved = resolveMaskRevealEditableIntent(editableIntent);
  const computedDurationSeconds = computeMaskRevealSceneDuration(editableIntent);

  return {
    schemaVersion: "scene-instance/v1",
    sceneId,
    status: "ADOPTED",
    authority: "HUMAN_MASTER",
    recipeProvenance: { ...recipe },
    primarySubject: recipe.primarySubject,
    secondarySubject: recipe.secondarySubject,
    complexity: "CALM",
    editableIntent,
    targetDurationSeconds: resolved.sceneDurationSeconds,
    computedDurationSeconds,
    durationDeltaSeconds: Number((computedDurationSeconds - resolved.sceneDurationSeconds).toFixed(3)),
    humanSelectedFields: listHumanSelectedMaskRevealFields(editableIntent),
    lockedFields: listLockedMaskRevealFields(editableIntent),
  };
}

export function updateMaskRevealSceneField<K extends MaskRevealEditableFieldKey>(
  scene: MaskRevealSceneInstance,
  key: K,
  value: MaskRevealEditableFields[K]["defaultValue"],
  lock = false,
): MaskRevealSceneInstance {
  const editableIntent = applyHumanSelection(scene.editableIntent, key, value, lock);
  const resolved = resolveMaskRevealEditableIntent(editableIntent);
  const computedDurationSeconds = computeMaskRevealSceneDuration(editableIntent);

  return {
    ...scene,
    editableIntent,
    targetDurationSeconds: resolved.sceneDurationSeconds,
    computedDurationSeconds,
    durationDeltaSeconds: Number((computedDurationSeconds - resolved.sceneDurationSeconds).toFixed(3)),
    humanSelectedFields: listHumanSelectedMaskRevealFields(editableIntent),
    lockedFields: listLockedMaskRevealFields(editableIntent),
  };
}

export function buildProjectTimeline(scenes: MaskRevealSceneInstance[]): ProjectTimelineV1 {
  let cursor = 0;
  const placements = scenes.map((scene) => {
    const startSeconds = cursor;
    const endSeconds = Number((startSeconds + scene.computedDurationSeconds).toFixed(3));
    cursor = endSeconds;
    return {
      sceneId: scene.sceneId,
      startSeconds,
      endSeconds,
      durationSeconds: scene.computedDurationSeconds,
    };
  });

  const edges: SceneEdge[] = scenes.slice(1).map((scene, index) => ({
    fromSceneId: scenes[index].sceneId,
    toSceneId: scene.sceneId,
    transition: "HARD_CUT",
  }));

  return {
    schemaVersion: "project-timeline/v1",
    authority: "STRUCTURED_SCENE_TIMELINE",
    sceneIds: scenes.map((scene) => scene.sceneId),
    placements,
    edges,
    totalComputedDurationSeconds: Number(cursor.toFixed(3)),
  };
}

export function buildMaskRevealSceneExport(scene: MaskRevealSceneInstance) {
  const resolved = resolveMaskRevealEditableIntent(scene.editableIntent);
  return {
    schemaVersion: "scene-export/v1" as const,
    authority: "HUMAN_MASTER" as const,
    sceneId: scene.sceneId,
    recipeProvenance: scene.recipeProvenance,
    primarySubject: scene.primarySubject,
    targetDurationSeconds: scene.targetDurationSeconds,
    computedDurationSeconds: scene.computedDurationSeconds,
    durationDeltaSeconds: scene.durationDeltaSeconds,
    humanSelectedFields: scene.humanSelectedFields,
    lockedFields: scene.lockedFields,
    editableIntent: scene.editableIntent,
    effective: resolved,
    rule: "Recipe/default updates are provenance only after adoption; they must not silently rewrite this SceneInstance.",
  };
}
