import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
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

interface ProductionContextValue {
  data: AllData;
  selectedMovieId: string;
  setSelectedMovieId: (id: string) => void;

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

  // Asset CRUD
  addAsset: (asset: Asset) => void;
  updateAsset: (asset: Asset) => void;
  deleteAsset: (assetId: string) => void;
  duplicateAsset: (assetId: string) => void;
  linkAssetToScene: (assetId: string, sceneId: string) => void;
  unlinkAssetFromScene: (assetId: string, sceneId: string) => void;

  // Prompt CRUD
  addPrompt: (prompt: Prompt) => void;
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

  // Bulk operations
  resetToDefaults: () => void;
  importAllData: (data: AllData) => void;
  getAllData: () => AllData;
}

const ProductionContext = createContext<ProductionContextValue | null>(null);

export function ProductionProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AllData>(() => loadData(defaults));
  const [selectedMovieId, setSelectedMovieIdState] = useState<string>(() =>
    loadSelectedMovie(),
  );

  // Persist data to localStorage on change
  useEffect(() => {
    saveData(data);
  }, [data]);

  // Persist selected movie
  const setSelectedMovieId = useCallback((id: string) => {
    setSelectedMovieIdState(id);
    saveSelectedMovie(id);
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
    [],
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
    [],
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
    [],
  );

  // --- Scene CRUD ---
  const addScene = useCallback(
    (scene: Scene) => {
      setData((prev) => ({ ...prev, scenes: [...prev.scenes, scene] }));
    },
    [],
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
    [],
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
    [],
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
        };
        const idx = prev.scenes.findIndex((s) => s.sceneId === sceneId);
        const newScenes = [...prev.scenes];
        newScenes.splice(idx + 1, 0, newScene);
        return { ...prev, scenes: newScenes };
      });
    },
    [],
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
    [selectedMovieId],
  );

  // --- Asset CRUD ---
  const addAsset = useCallback(
    (asset: Asset) => {
      setData((prev) => ({ ...prev, assets: [...prev.assets, asset] }));
    },
    [],
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
    [],
  );

  const deleteAsset = useCallback(
    (assetId: string) => {
      setData((prev) => ({
        ...prev,
        assets: prev.assets.filter((a) => a.assetId !== assetId),
        scenes: prev.scenes.map((s) => ({
          ...s,
          assets: s.assets.filter((id) => id !== assetId),
        })),
      }));
    },
    [],
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
    [],
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
    [],
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
    [],
  );

  // --- Prompt CRUD ---
  const addPrompt = useCallback(
    (prompt: Prompt) => {
      setData((prev) => ({ ...prev, prompts: [...prev.prompts, prompt] }));
    },
    [],
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
    [],
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
    [],
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
    [],
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
    [],
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
    [],
  );

  // --- Task CRUD ---
  const addTask = useCallback(
    (task: Task) => {
      setData((prev) => ({ ...prev, tasks: [...prev.tasks, task] }));
    },
    [],
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
    [],
  );

  const deleteTask = useCallback(
    (taskId: string) => {
      setData((prev) => ({
        ...prev,
        tasks: prev.tasks.filter((t) => t.taskId !== taskId),
      }));
    },
    [],
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
    [],
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
    [],
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
    [],
  );

  // --- Bulk operations ---
  const resetToDefaults = useCallback(() => {
    clearData();
    setData(defaults);
  }, []);

  const importAllData = useCallback((imported: AllData) => {
    setData(imported);
  }, []);

  const getAllData = useCallback((): AllData => {
    return data;
  }, [data]);

  const contextValue = useMemo<ProductionContextValue>(
    () => ({
      data,
      selectedMovieId,
      setSelectedMovieId,
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
      addAsset,
      updateAsset,
      deleteAsset,
      duplicateAsset,
      linkAssetToScene,
      unlinkAssetFromScene,
      addPrompt,
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
      resetToDefaults,
      importAllData,
      getAllData,
    }),
    [
      data,
      selectedMovieId,
      setSelectedMovieId,
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
      addAsset,
      updateAsset,
      deleteAsset,
      duplicateAsset,
      linkAssetToScene,
      unlinkAssetFromScene,
      addPrompt,
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
