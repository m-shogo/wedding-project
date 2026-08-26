import {
  createTypographyProductionSelection,
  type TypographyProductionPatternId,
  type TypographyProductionSelectionV1,
} from "./typographySceneProductionRouting";
import type { MaskRevealSceneInstance } from "./visualSceneComposer";

export const TYPOGRAPHY_PRODUCTION_SELECTION_STORAGE_KEY = "motion-zukan-typography-production-selection-v1";
export const TYPOGRAPHY_PRODUCTION_SELECTION_CHANGED_EVENT = "motion-zukan-typography-production-selection-changed";

interface TypographyProductionSelectionStoreV1 {
  schemaVersion: "typography-production-selection-store/v1";
  selections: TypographyProductionSelectionV1[];
}

function emptyStore(): TypographyProductionSelectionStoreV1 {
  return { schemaVersion: "typography-production-selection-store/v1", selections: [] };
}

function parseStore(raw: string | null): TypographyProductionSelectionStoreV1 {
  if (!raw) return emptyStore();
  try {
    const value = JSON.parse(raw) as Partial<TypographyProductionSelectionStoreV1>;
    if (value.schemaVersion !== "typography-production-selection-store/v1" || !Array.isArray(value.selections)) {
      return emptyStore();
    }
    return {
      schemaVersion: "typography-production-selection-store/v1",
      selections: value.selections.filter(
        (selection): selection is TypographyProductionSelectionV1 =>
          selection?.schemaVersion === "typography-production-selection/v1" &&
          selection?.authority === "HUMAN_SELECTED" &&
          typeof selection.sceneId === "string" &&
          typeof selection.sourceRevision === "string" &&
          typeof selection.patternId === "string" &&
          typeof selection.selectedAt === "string",
      ),
    };
  } catch {
    return emptyStore();
  }
}

function readStore() {
  if (typeof localStorage === "undefined") return emptyStore();
  return parseStore(localStorage.getItem(TYPOGRAPHY_PRODUCTION_SELECTION_STORAGE_KEY));
}

function writeStore(store: TypographyProductionSelectionStoreV1) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(TYPOGRAPHY_PRODUCTION_SELECTION_STORAGE_KEY, JSON.stringify(store));
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(TYPOGRAPHY_PRODUCTION_SELECTION_CHANGED_EVENT, { detail: store }));
  }
}

/**
 * Returns only a selection made against the current SceneInstance revision.
 * Older human decisions are intentionally treated as stale, not silently rebased.
 */
export function loadTypographyProductionSelection(scene: MaskRevealSceneInstance) {
  const selection = readStore().selections.find((item) => item.sceneId === scene.sceneId) ?? null;
  if (!selection) return null;
  if (selection.sourceRevision !== scene.updatedAt) return null;
  return selection;
}

export function listTypographyProductionSelections() {
  return [...readStore().selections];
}

export function saveTypographyProductionSelection(
  scene: MaskRevealSceneInstance,
  patternId: TypographyProductionPatternId,
  selectedAt = new Date().toISOString(),
) {
  const selection = createTypographyProductionSelection(scene, patternId, selectedAt);
  const store = readStore();
  const selections = store.selections.filter((item) => item.sceneId !== scene.sceneId);
  writeStore({ ...store, selections: [...selections, selection] });
  return selection;
}

export function clearTypographyProductionSelection(sceneId: string) {
  const store = readStore();
  const selections = store.selections.filter((item) => item.sceneId !== sceneId);
  if (selections.length === store.selections.length) return;
  writeStore({ ...store, selections });
}

export function pruneStaleTypographyProductionSelections(scenes: MaskRevealSceneInstance[]) {
  const revisions = new Map(scenes.map((scene) => [scene.sceneId, scene.updatedAt]));
  const store = readStore();
  const selections = store.selections.filter(
    (selection) => revisions.get(selection.sceneId) === selection.sourceRevision,
  );
  if (selections.length !== store.selections.length) {
    writeStore({ ...store, selections });
  }
  return selections;
}
