import type {TypographyProductionSelectionV1} from "./typographySceneProductionRouting";
import type {WeddingTypographyRoleGuideItem} from "./weddingTypographyProductionRoleGuide.generated";
import {getWeddingTypographyProductionRoleGuide} from "./weddingTypographyProductionRoleGuide.generated";
import type {MaskRevealSceneInstance} from "./visualSceneComposer";

export const TYPOGRAPHY_PRODUCTION_ROLE_CONTEXT_STORAGE_KEY = "motion-zukan-typography-production-role-context-v1";
export const TYPOGRAPHY_PRODUCTION_ROLE_CONTEXT_CHANGED_EVENT = "motion-zukan-typography-production-role-context-changed";

export interface TypographyProductionRoleContextV1 {
  schemaVersion: "typography-production-role-context/v1";
  authority: "HUMAN_SELECTED_ROLE_CONTEXT";
  sceneId: string;
  projectId: "opening" | "profile";
  sourceRevision: string;
  patternId: TypographyProductionSelectionV1["patternId"];
  routeSelectedAt: string;
  productionRole: WeddingTypographyRoleGuideItem["role"];
  roleSelectedAt: string;
}

interface TypographyProductionRoleContextStoreV1 {
  schemaVersion: "typography-production-role-context-store/v1";
  contexts: TypographyProductionRoleContextV1[];
}

function emptyStore(): TypographyProductionRoleContextStoreV1 {
  return {schemaVersion: "typography-production-role-context-store/v1", contexts: []};
}

function parseStore(raw: string | null): TypographyProductionRoleContextStoreV1 {
  if (!raw) return emptyStore();
  try {
    const value = JSON.parse(raw) as Partial<TypographyProductionRoleContextStoreV1>;
    if (value.schemaVersion !== "typography-production-role-context-store/v1" || !Array.isArray(value.contexts)) return emptyStore();
    return {
      schemaVersion: "typography-production-role-context-store/v1",
      contexts: value.contexts.filter(
        (context): context is TypographyProductionRoleContextV1 =>
          context?.schemaVersion === "typography-production-role-context/v1" &&
          context?.authority === "HUMAN_SELECTED_ROLE_CONTEXT" &&
          typeof context.sceneId === "string" &&
          (context.projectId === "opening" || context.projectId === "profile") &&
          typeof context.sourceRevision === "string" &&
          typeof context.patternId === "string" &&
          typeof context.routeSelectedAt === "string" &&
          typeof context.productionRole === "string" &&
          typeof context.roleSelectedAt === "string",
      ),
    };
  } catch {
    return emptyStore();
  }
}

function readStore() {
  if (typeof localStorage === "undefined") return emptyStore();
  return parseStore(localStorage.getItem(TYPOGRAPHY_PRODUCTION_ROLE_CONTEXT_STORAGE_KEY));
}

function writeStore(store: TypographyProductionRoleContextStoreV1) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(TYPOGRAPHY_PRODUCTION_ROLE_CONTEXT_STORAGE_KEY, JSON.stringify(store));
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(TYPOGRAPHY_PRODUCTION_ROLE_CONTEXT_CHANGED_EVENT, {detail: store}));
  }
}

function roleAvailableForScene(scene: MaskRevealSceneInstance, role: WeddingTypographyRoleGuideItem["role"]) {
  return getWeddingTypographyProductionRoleGuide(scene.projectId).some((item) => item.role === role);
}

export function loadTypographyProductionRoleContext(
  scene: MaskRevealSceneInstance,
  selection: TypographyProductionSelectionV1,
) {
  const context = readStore().contexts.find((item) => item.sceneId === scene.sceneId) ?? null;
  if (!context) return null;
  if (context.projectId !== scene.projectId || context.sourceRevision !== scene.updatedAt) return null;
  if (context.patternId !== selection.patternId || context.routeSelectedAt !== selection.selectedAt) return null;
  if (!roleAvailableForScene(scene, context.productionRole)) return null;
  return context;
}

export function listTypographyProductionRoleContexts() {
  return [...readStore().contexts];
}

export function saveTypographyProductionRoleContext(
  scene: MaskRevealSceneInstance,
  selection: TypographyProductionSelectionV1,
  productionRole: WeddingTypographyRoleGuideItem["role"],
  roleSelectedAt = new Date().toISOString(),
) {
  if (selection.sceneId !== scene.sceneId || selection.sourceRevision !== scene.updatedAt) {
    throw new Error("TYPOGRAPHY_ROLE_CONTEXT_REQUIRES_CURRENT_ROUTE_SELECTION");
  }
  if (!roleAvailableForScene(scene, productionRole)) {
    throw new Error(`TYPOGRAPHY_ROLE_CONTEXT_ROLE_NOT_AVAILABLE:${scene.projectId}:${productionRole}`);
  }
  const context: TypographyProductionRoleContextV1 = {
    schemaVersion: "typography-production-role-context/v1",
    authority: "HUMAN_SELECTED_ROLE_CONTEXT",
    sceneId: scene.sceneId,
    projectId: scene.projectId,
    sourceRevision: scene.updatedAt,
    patternId: selection.patternId,
    routeSelectedAt: selection.selectedAt,
    productionRole,
    roleSelectedAt,
  };
  const store = readStore();
  const contexts = store.contexts.filter((item) => item.sceneId !== scene.sceneId);
  writeStore({...store, contexts: [...contexts, context]});
  return context;
}

export function clearTypographyProductionRoleContext(sceneId: string) {
  const store = readStore();
  const contexts = store.contexts.filter((item) => item.sceneId !== sceneId);
  if (contexts.length === store.contexts.length) return;
  writeStore({...store, contexts});
}

export function pruneStaleTypographyProductionRoleContexts(
  scenes: MaskRevealSceneInstance[],
  selections: TypographyProductionSelectionV1[],
) {
  const sceneById = new Map(scenes.map((scene) => [scene.sceneId, scene]));
  const selectionByScene = new Map(selections.map((selection) => [selection.sceneId, selection]));
  const store = readStore();
  const contexts = store.contexts.filter((context) => {
    const scene = sceneById.get(context.sceneId);
    const selection = selectionByScene.get(context.sceneId);
    return Boolean(
      scene &&
      selection &&
      context.projectId === scene.projectId &&
      context.sourceRevision === scene.updatedAt &&
      context.patternId === selection.patternId &&
      context.routeSelectedAt === selection.selectedAt &&
      roleAvailableForScene(scene, context.productionRole),
    );
  });
  if (contexts.length !== store.contexts.length) writeStore({...store, contexts});
  return contexts;
}
