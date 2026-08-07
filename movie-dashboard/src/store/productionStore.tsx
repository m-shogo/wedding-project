import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import type {
  AllData,
  Asset,
  MovieProject,
  Prompt,
  Scene,
  Task,
} from "../types/movie";
import { generateId } from "../lib/ids";
import {
  clearData,
  loadData,
  loadSelectedMovie,
  saveData,
  saveSelectedMovie,
} from "../lib/storage";

import defaultMovies from "../data/movies.json";
import defaultScenes from "../data/scenes.json";
import defaultAssets from "../data/assets.json";
import defaultPrompts from "../data/prompts.json";
import defaultTasks from "../data/tasks.json";

const defaults: AllData = {
  movies: defaultMovies as MovieProject[],
  scenes: defaultScenes as Scene[],
  assets: defaultAssets as Asset[],
  prompts: defaultPrompts as Prompt[],
  tasks: defaultTasks as Task[],
};

const MAX_HISTORY = 30;

interface ProductionContextValue {
  data: AllData;
  selectedMovieId: string;
  setSelectedMovieId: (id: string) => void;
  lastSavedAt: Date | null;

  // Filtered getters
  currentMovie: MovieProject | undefined;
  movieScenes: Scene[];
  movieAssets: Asset[];
  moviePrompts: Prompt[];
  movieTasks: Task[];

  // Movie CRUD
  addMovie: (movie: MovieProject) => void;
  updateMovie: (movie: MovieProject) => void;
  deleteMovie: (movieId: string) => void;

  // Scene CRUD
  addScene: (scene: Scene) => void;
  updateScene: (scene: Scene) => void;
  deleteScene: (sceneId: string) => void;
  duplicateScene: (sceneId: string) => void;
  moveScene: (sceneId: string, direction: "up" | "down") => void;
  reorderScenes: (movieId: string, orderedIds: string[]) => void;

  // Asset CRUD
  addAsset: (asset: Asset) => void;
  updateAsset: (asset: Asset) => void;
  deleteAsset: (assetId: string) => void;
  duplicateAsset: (assetId: string) => void;
  linkAssetToScene: (assetId: string, sceneId: string) => void;
  unlinkAssetFromScene: (assetId: string, sceneId: string) => void;
  registerPromptResultAsset: (promptId: string, asset: Asset) => void;

  // Prompt CRUD
  addPrompt: (prompt: Prompt) => void;
  addPromptLinkedToScenes: (prompt: Prompt, sceneIds: string[]) => void;
  updatePrompt: (prompt: Prompt) => void;
  deletePrompt: (promptId: string) => void;
  duplicatePrompt: (promptId: string) => void;
  linkPromptToScene: (promptId: string, sceneId: string) => void;
  unlinkPromptFromScene: (promptId: string, sceneId: string) => void;

  // Task CRUD
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
  duplicateTask: (taskId: string) => void;
  linkTaskToScene: (taskId: string, sceneId: string) => void;
  unlinkTaskFromScene: (taskId: string) => void;

  // Undo / Redo
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;

  // Bulk operations
  resetToDefaults: () => void;
  importAllData: (data: AllData) => void;
  getAllData: () => AllData;
}

const ProductionContext = createContext<ProductionContextValue | null>(null);

export function ProductionProvider({ children }: { children: ReactNode }) {
  const initialData = loadData(defaults);
  const [data, setDataRaw] = useState<AllData>(initialData);
  const [selectedMovieId, setSelectedMovieIdState] = useState<string>(() =>
    loadSelectedMovie(),
  );
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);

  // History for undo/redo
  const historyRef = useRef<AllData[]>([initialData]);
  const historyIndexRef = useRef(0);
  const isUndoRedoRef = useRef(false);

  const setData = useCallback((updater: AllData | ((prev: AllData) => AllData)) => {
    setDataRaw((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      if (Object.is(next, prev)) return prev;
      if (!isUndoRedoRef.current) {
        const h = historyRef.current.slice(0, historyIndexRef.current + 1);
        h.push(next);
        if (h.length > MAX_HISTORY) h.shift();
        historyRef.current = h;
        historyIndexRef.current = h.length - 1;
      }
      return next;
    });
  }, []);

  // Persist data to localStorage on change
  useEffect(() => {
    saveData(data);
    setLastSavedAt(new Date());
  }, [data]);

  // Persist selected movie
  const setSelectedMovieId = useCallback((id: string) => {
    setSelectedMovieIdState(id);
    saveSelectedMovie(id);
  }, []);

  // --- Undo / Redo ---
  const canUndo = historyIndexRef.current > 0;
  const canRedo = historyIndexRef.current < historyRef.current.length - 1;

  const undo = useCallback(() => {
    if (historyIndexRef.current <= 0) return;
    historyIndexRef.current -= 1;
    isUndoRedoRef.current = true;
    setDataRaw(historyRef.current[historyIndexRef.current]);
    isUndoRedoRef.current = false;
  }, []);

  const redo = useCallback(() => {
    if (historyIndexRef.current >= historyRef.current.length - 1) return;
    historyIndexRef.current += 1;
    isUndoRedoRef.current = true;
    setDataRaw(historyRef.current[historyIndexRef.current]);
    isUndoRedoRef.current = false;
  }, []);

  // --- Filtered getters (memoized) ---
  const currentMovie = useMemo(
    () => data.movies.find((m) => m.movieId === selectedMovieId),
    [data.movies, selectedMovieId],
  );

  const movieScenes = useMemo(
    () => data.scenes.filter((s) => s.movieId === selectedMovieId),
    [data.scenes, selectedMovieId],
  );

  const movieAssets = useMemo(
    () =>
      data.assets.filter((a) => a.relatedMovieIds.includes(selectedMovieId)),
    [data.assets, selectedMovieId],
  );

  const moviePrompts = useMemo(
    () =>
      data.prompts.filter((p) => p.relatedMovieIds.includes(selectedMovieId)),
    [data.prompts, selectedMovieId],
  );

  const movieTasks = useMemo(
    () =>
      data.tasks.filter(
        (t) => t.movieId === selectedMovieId || t.movieId === "",
      ),
    [data.tasks, selectedMovieId],
  );

  // --- Movie CRUD ---
  const addMovie = useCallback(
    (movie: MovieProject) => {
      setData((prev) => ({ ...prev, movies: [...prev.movies, movie] }));
    },
    [setData],
  );

  const updateMovie = useCallback(
    (movie: MovieProject) => {
      setData((prev) => ({
        ...prev,
        movies: prev.movies.map((m) =>
          m.movieId === movie.movieId ? movie : m,
        ),
      }));
    },
    [setData],
  );

  const deleteMovie = useCallback(
    (movieId: string) => {
      setData((prev) => {
        const sceneIdsToRemove = new Set(
          prev.scenes.filter((s) => s.movieId === movieId).map((s) => s.sceneId),
        );
        return {
          ...prev,
          movies: prev.movies.filter((m) => m.movieId !== movieId),
          scenes: prev.scenes.filter((s) => s.movieId !== movieId),
          assets: prev.assets.map((a) => ({
            ...a,
            relatedMovieIds: a.relatedMovieIds.filter((id) => id !== movieId),
            relatedSceneIds: a.relatedSceneIds.filter((id) => !sceneIdsToRemove.has(id)),
          })),
          prompts: prev.prompts.map((p) => ({
            ...p,
            relatedMovieIds: p.relatedMovieIds.filter((id) => id !== movieId),
            relatedSceneIds: p.relatedSceneIds.filter((id) => !sceneIdsToRemove.has(id)),
          })),
          tasks: prev.tasks.filter((t) => t.movieId !== movieId),
        };
      });
    },
    [setData],
  );

  // --- Scene CRUD ---
  const addScene = useCallback(
    (scene: Scene) => {
      setData((prev) => ({ ...prev, scenes: [...prev.scenes, scene] }));
    },
    [setData],
  );

  const updateScene = useCallback(
    (scene: Scene) => {
      setData((prev) => ({
        ...prev,
        scenes: prev.scenes.map((s) =>
          s.sceneId === scene.sceneId ? scene : s,
        ),
      }));
    },
    [setData],
  );

  const deleteScene = useCallback(
    (sceneId: string) => {
      setData((prev) => ({
        ...prev,
        scenes: prev.scenes.filter((s) => s.sceneId !== sceneId),
        assets: prev.assets.map((a) =>
          a.relatedSceneIds.includes(sceneId)
            ? { ...a, relatedSceneIds: a.relatedSceneIds.filter((id) => id !== sceneId) }
            : a,
        ),
        prompts: prev.prompts.map((p) =>
          p.relatedSceneIds.includes(sceneId)
            ? { ...p, relatedSceneIds: p.relatedSceneIds.filter((id) => id !== sceneId) }
            : p,
        ),
        tasks: prev.tasks.map((t) =>
          t.relatedSceneId === sceneId ? { ...t, relatedSceneId: "" } : t,
        ),
      }));
    },
    [setData],
  );

  const duplicateScene = useCallback(
    (sceneId: string) => {
      setData((prev) => {
        const original = prev.scenes.find((s) => s.sceneId === sceneId);
        if (!original) return prev;
        const newScene: Scene = {
          ...original,
          sceneId: generateId("scene"),
          title: `${original.title} (コピー)`,
          assets: [],
          promptIds: [],
          photoSlots: original.photoSlots
            ? original.photoSlots.map((s) => ({
                ...s,
                slotId: generateId("slot"),
                selectedAssetIds: [],
                candidateAssetIds: [],
                rejectedAssetIds: [],
              }))
            : undefined,
        };
        const idx = prev.scenes.findIndex((s) => s.sceneId === sceneId);
        const newScenes = [...prev.scenes];
        newScenes.splice(idx + 1, 0, newScene);
        return { ...prev, scenes: newScenes };
      });
    },
    [setData],
  );

  const moveScene = useCallback(
    (sceneId: string, direction: "up" | "down") => {
      setData((prev) => {
        const movieSceneIds = prev.scenes
          .filter((s) => s.movieId === selectedMovieId)
          .map((s) => s.sceneId);
        const posInMovie = movieSceneIds.indexOf(sceneId);
        if (posInMovie < 0) return prev;
        if (direction === "up" && posInMovie === 0) return prev;
        if (direction === "down" && posInMovie === movieSceneIds.length - 1)
          return prev;

        const swapTargetId =
          direction === "up"
            ? movieSceneIds[posInMovie - 1]
            : movieSceneIds[posInMovie + 1];

        const scenes = [...prev.scenes];
        const idxA = scenes.findIndex((s) => s.sceneId === sceneId);
        const idxB = scenes.findIndex((s) => s.sceneId === swapTargetId);
        [scenes[idxA], scenes[idxB]] = [scenes[idxB], scenes[idxA]];
        return { ...prev, scenes };
      });
    },
    [setData, selectedMovieId],
  );

  const reorderScenes = useCallback(
    (movieId: string, orderedIds: string[]) => {
      setData((prev) => {
        const otherScenes = prev.scenes.filter((s) => s.movieId !== movieId);
        const movieScenesMap = new Map(
          prev.scenes.filter((s) => s.movieId === movieId).map((s) => [s.sceneId, s]),
        );
        const reordered = orderedIds
          .map((id) => movieScenesMap.get(id))
          .filter((s): s is Scene => s !== undefined);
        return { ...prev, scenes: [...otherScenes, ...reordered] };
      });
    },
    [setData],
  );

  // --- Asset CRUD ---
  const addAsset = useCallback(
    (asset: Asset) => {
      setData((prev) => ({ ...prev, assets: [...prev.assets, asset] }));
    },
    [setData],
  );

  const updateAsset = useCallback(
    (asset: Asset) => {
      setData((prev) => ({
        ...prev,
        assets: prev.assets.map((a) =>
          a.assetId === asset.assetId ? asset : a,
        ),
      }));
    },
    [setData],
  );

  const deleteAsset = useCallback(
    (assetId: string) => {
      setData((prev) => ({
        ...prev,
        assets: prev.assets.filter((a) => a.assetId !== assetId),
        scenes: prev.scenes.map((s) => ({
          ...s,
          assets: s.assets.filter((id) => id !== assetId),
          photoSlots: s.photoSlots?.map((slot) => ({
            ...slot,
            selectedAssetIds: slot.selectedAssetIds.filter((id) => id !== assetId),
            candidateAssetIds: slot.candidateAssetIds.filter((id) => id !== assetId),
            rejectedAssetIds: slot.rejectedAssetIds.filter((id) => id !== assetId),
          })),
        })),
        prompts: prev.prompts.map((p) => ({
          ...p,
          resultAssetIds: p.resultAssetIds.filter((id) => id !== assetId),
        })),
      }));
    },
    [setData],
  );

  const duplicateAsset = useCallback(
    (assetId: string) => {
      setData((prev) => {
        const original = prev.assets.find((a) => a.assetId === assetId);
        if (!original) return prev;
        const newAsset: Asset = {
          ...original,
          assetId: generateId("asset"),
          title: `${original.title} (コピー)`,
          status: "idea",
          relatedSceneIds: [],
        };
        return { ...prev, assets: [...prev.assets, newAsset] };
      });
    },
    [setData],
  );

  const linkAssetToScene = useCallback(
    (assetId: string, sceneId: string) => {
      setData((prev) => ({
        ...prev,
        scenes: prev.scenes.map((s) =>
          s.sceneId === sceneId && !s.assets.includes(assetId)
            ? { ...s, assets: [...s.assets, assetId] }
            : s,
        ),
        assets: prev.assets.map((a) =>
          a.assetId === assetId && !a.relatedSceneIds.includes(sceneId)
            ? { ...a, relatedSceneIds: [...a.relatedSceneIds, sceneId] }
            : a,
        ),
      }));
    },
    [setData],
  );

  const unlinkAssetFromScene = useCallback(
    (assetId: string, sceneId: string) => {
      setData((prev) => ({
        ...prev,
        scenes: prev.scenes.map((s) =>
          s.sceneId === sceneId
            ? { ...s, assets: s.assets.filter((id) => id !== assetId) }
            : s,
        ),
        assets: prev.assets.map((a) =>
          a.assetId === assetId
            ? {
                ...a,
                relatedSceneIds: a.relatedSceneIds.filter(
                  (id) => id !== sceneId,
                ),
              }
            : a,
        ),
      }));
    },
    [setData],
  );

  const registerPromptResultAsset = useCallback(
    (promptId: string, asset: Asset) => {
      setData((prev) => {
        const prompt = prev.prompts.find((item) => item.promptId === promptId);
        if (!prompt || prev.assets.some((item) => item.assetId === asset.assetId)) return prev;

        const existingSceneIds = new Set(prev.scenes.map((scene) => scene.sceneId));
        const relatedSceneIds = Array.from(new Set([
          ...asset.relatedSceneIds,
          ...prompt.relatedSceneIds.filter((sceneId) => existingSceneIds.has(sceneId)),
        ]));
        const registeredAsset: Asset = {
          ...asset,
          relatedSceneIds,
          relatedMovieIds: Array.from(new Set([...asset.relatedMovieIds, ...prompt.relatedMovieIds])),
        };

        return {
          ...prev,
          assets: [...prev.assets, registeredAsset],
          scenes: prev.scenes.map((scene) =>
            relatedSceneIds.includes(scene.sceneId) && !scene.assets.includes(asset.assetId)
              ? { ...scene, assets: [...scene.assets, asset.assetId] }
              : scene,
          ),
          prompts: prev.prompts.map((item) =>
            item.promptId === promptId
              ? {
                  ...item,
                  status: item.status === "draft" ? "testing" : item.status,
                  resultAssetIds: item.resultAssetIds.includes(asset.assetId)
                    ? item.resultAssetIds
                    : [...item.resultAssetIds, asset.assetId],
                }
              : item,
          ),
        };
      });
    },
    [setData],
  );

  // --- Prompt CRUD ---
  const addPrompt = useCallback(
    (prompt: Prompt) => {
      setData((prev) => ({ ...prev, prompts: [...prev.prompts, prompt] }));
    },
    [setData],
  );

  const addPromptLinkedToScenes = useCallback(
    (prompt: Prompt, sceneIds: string[]) => {
      setData((prev) => {
        if (prev.prompts.some((item) => item.promptId === prompt.promptId)) return prev;
        const requestedSceneIds = new Set([...prompt.relatedSceneIds, ...sceneIds]);
        const linkedScenes = prev.scenes.filter((scene) => requestedSceneIds.has(scene.sceneId));
        const relatedSceneIds = Array.from(new Set(linkedScenes.map((scene) => scene.sceneId)));
        const normalizedPrompt: Prompt = {
          ...prompt,
          relatedSceneIds,
          relatedMovieIds: Array.from(new Set([
            ...prompt.relatedMovieIds,
            ...linkedScenes.map((scene) => scene.movieId),
          ])),
        };
        return {
          ...prev,
          prompts: [...prev.prompts, normalizedPrompt],
          scenes: prev.scenes.map((scene) =>
            relatedSceneIds.includes(scene.sceneId) && !scene.promptIds.includes(prompt.promptId)
              ? { ...scene, promptIds: [...scene.promptIds, prompt.promptId] }
              : scene,
          ),
        };
      });
    },
    [setData],
  );

  const updatePrompt = useCallback(
    (prompt: Prompt) => {
      setData((prev) => ({
        ...prev,
        prompts: prev.prompts.map((p) =>
          p.promptId === prompt.promptId ? prompt : p,
        ),
      }));
    },
    [setData],
  );

  const deletePrompt = useCallback(
    (promptId: string) => {
      setData((prev) => ({
        ...prev,
        prompts: prev.prompts.filter((p) => p.promptId !== promptId),
        scenes: prev.scenes.map((s) => ({
          ...s,
          promptIds: s.promptIds.filter((id) => id !== promptId),
        })),
      }));
    },
    [setData],
  );

  const duplicatePrompt = useCallback(
    (promptId: string) => {
      setData((prev) => {
        const original = prev.prompts.find((p) => p.promptId === promptId);
        if (!original) return prev;
        const newPrompt: Prompt = {
          ...original,
          promptId: generateId("prompt"),
          title: `${original.title} (コピー)`,
          status: "draft",
          resultAssetIds: [],
          relatedSceneIds: [],
        };
        return { ...prev, prompts: [...prev.prompts, newPrompt] };
      });
    },
    [setData],
  );

  const linkPromptToScene = useCallback(
    (promptId: string, sceneId: string) => {
      setData((prev) => ({
        ...prev,
        scenes: prev.scenes.map((s) =>
          s.sceneId === sceneId && !s.promptIds.includes(promptId)
            ? { ...s, promptIds: [...s.promptIds, promptId] }
            : s,
        ),
        prompts: prev.prompts.map((p) =>
          p.promptId === promptId && !p.relatedSceneIds.includes(sceneId)
            ? { ...p, relatedSceneIds: [...p.relatedSceneIds, sceneId] }
            : p,
        ),
      }));
    },
    [setData],
  );

  const unlinkPromptFromScene = useCallback(
    (promptId: string, sceneId: string) => {
      setData((prev) => ({
        ...prev,
        scenes: prev.scenes.map((s) =>
          s.sceneId === sceneId
            ? { ...s, promptIds: s.promptIds.filter((id) => id !== promptId) }
            : s,
        ),
        prompts: prev.prompts.map((p) =>
          p.promptId === promptId
            ? {
                ...p,
                relatedSceneIds: p.relatedSceneIds.filter(
                  (id) => id !== sceneId,
                ),
              }
            : p,
        ),
      }));
    },
    [setData],
  );

  // --- Task CRUD ---
  const addTask = useCallback(
    (task: Task) => {
      setData((prev) => ({ ...prev, tasks: [...prev.tasks, task] }));
    },
    [setData],
  );

  const updateTask = useCallback(
    (task: Task) => {
      setData((prev) => ({
        ...prev,
        tasks: prev.tasks.map((t) =>
          t.taskId === task.taskId ? task : t,
        ),
      }));
    },
    [setData],
  );

  const deleteTask = useCallback(
    (taskId: string) => {
      setData((prev) => ({
        ...prev,
        tasks: prev.tasks.filter((t) => t.taskId !== taskId),
      }));
    },
    [setData],
  );

  const duplicateTask = useCallback(
    (taskId: string) => {
      setData((prev) => {
        const original = prev.tasks.find((t) => t.taskId === taskId);
        if (!original) return prev;
        const newTask: Task = {
          ...original,
          taskId: generateId("task"),
          title: `${original.title} (コピー)`,
          status: "todo",
        };
        return { ...prev, tasks: [...prev.tasks, newTask] };
      });
    },
    [setData],
  );

  const linkTaskToScene = useCallback(
    (taskId: string, sceneId: string) => {
      setData((prev) => ({
        ...prev,
        tasks: prev.tasks.map((t) =>
          t.taskId === taskId ? { ...t, relatedSceneId: sceneId } : t,
        ),
      }));
    },
    [setData],
  );

  const unlinkTaskFromScene = useCallback(
    (taskId: string) => {
      setData((prev) => ({
        ...prev,
        tasks: prev.tasks.map((t) =>
          t.taskId === taskId ? { ...t, relatedSceneId: "" } : t,
        ),
      }));
    },
    [setData],
  );

  // --- Bulk operations ---
  const resetToDefaults = useCallback(() => {
    clearData();
    historyRef.current = [defaults];
    historyIndexRef.current = 0;
    setDataRaw(defaults);
  }, []);

  const importAllData = useCallback((imported: AllData) => {
    historyRef.current = [imported];
    historyIndexRef.current = 0;
    setDataRaw(imported);
  }, []);

  const getAllData = useCallback((): AllData => {
    return data;
  }, [data]);

  const contextValue = useMemo<ProductionContextValue>(
    () => ({
      data,
      selectedMovieId,
      setSelectedMovieId,
      lastSavedAt,
      currentMovie,
      movieScenes,
      movieAssets,
      moviePrompts,
      movieTasks,
      addMovie,
      updateMovie,
      deleteMovie,
      addScene,
      updateScene,
      deleteScene,
      duplicateScene,
      moveScene,
      reorderScenes,
      addAsset,
      updateAsset,
      deleteAsset,
      duplicateAsset,
      linkAssetToScene,
      unlinkAssetFromScene,
      registerPromptResultAsset,
      addPrompt,
      addPromptLinkedToScenes,
      updatePrompt,
      deletePrompt,
      duplicatePrompt,
      linkPromptToScene,
      unlinkPromptFromScene,
      addTask,
      updateTask,
      deleteTask,
      duplicateTask,
      linkTaskToScene,
      unlinkTaskFromScene,
      undo,
      redo,
      canUndo,
      canRedo,
      resetToDefaults,
      importAllData,
      getAllData,
    }),
    [
      data,
      selectedMovieId,
      setSelectedMovieId,
      lastSavedAt,
      currentMovie,
      movieScenes,
      movieAssets,
      moviePrompts,
      movieTasks,
      addMovie,
      updateMovie,
      deleteMovie,
      addScene,
      updateScene,
      deleteScene,
      duplicateScene,
      moveScene,
      reorderScenes,
      addAsset,
      updateAsset,
      deleteAsset,
      duplicateAsset,
      linkAssetToScene,
      unlinkAssetFromScene,
      registerPromptResultAsset,
      addPrompt,
      addPromptLinkedToScenes,
      updatePrompt,
      deletePrompt,
      duplicatePrompt,
      linkPromptToScene,
      unlinkPromptFromScene,
      addTask,
      updateTask,
      deleteTask,
      duplicateTask,
      linkTaskToScene,
      unlinkTaskFromScene,
      undo,
      redo,
      canUndo,
      canRedo,
      resetToDefaults,
      importAllData,
      getAllData,
    ],
  );

  return (
    <ProductionContext.Provider value={contextValue}>
      {children}
    </ProductionContext.Provider>
  );
}

export function useProduction(): ProductionContextValue {
  const ctx = useContext(ProductionContext);
  if (!ctx) {
    throw new Error("useProduction must be used within ProductionProvider");
  }
  return ctx;
}
