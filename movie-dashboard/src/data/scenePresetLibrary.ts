import type { MaskRevealDirection, MaskRevealIntensity, PositionPreset } from "./humanEditableMotionIntent";

// A named, reusable "combination" of structural Scene choices (which text pattern, which image
// pattern, position, direction, intensity, timing) WITHOUT the per-scene content (Text / Media
// Label). The point is: build one combination once ("Small Push写真 + Mask Reveal右下タイトル"),
// name it, and reuse it for every following Scene without re-picking every dropdown each time.
// Text/Media stay scene-specific and are never captured here.
export interface ScenePreset {
  schemaVersion: "scene-preset/v1";
  id: string;
  name: string;
  patternId: string;
  imagePatternId: string;
  positionPreset: PositionPreset;
  positionXPercent: number;
  positionYPercent: number;
  direction: MaskRevealDirection;
  intensity: MaskRevealIntensity;
  layerDelaySeconds: number;
  imageMotionDurationSeconds: number;
  createdAt: string;
}

const SCENE_PRESET_STORAGE_KEY = "motion-zukan-scene-presets-v1";

export function loadScenePresets(): ScenePreset[] {
  if (typeof localStorage === "undefined") return [];
  try {
    const raw = localStorage.getItem(SCENE_PRESET_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is ScenePreset => Boolean(item) && typeof item === "object" && (item as ScenePreset).schemaVersion === "scene-preset/v1");
  } catch {
    return [];
  }
}

function saveScenePresets(presets: ScenePreset[]) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(SCENE_PRESET_STORAGE_KEY, JSON.stringify(presets));
}

export function addScenePreset(preset: Omit<ScenePreset, "schemaVersion" | "id" | "createdAt">): ScenePreset[] {
  const next: ScenePreset = {
    ...preset,
    schemaVersion: "scene-preset/v1",
    id: `preset-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  };
  const presets = [...loadScenePresets(), next];
  saveScenePresets(presets);
  return presets;
}

export function removeScenePreset(id: string): ScenePreset[] {
  const presets = loadScenePresets().filter((preset) => preset.id !== id);
  saveScenePresets(presets);
  return presets;
}
