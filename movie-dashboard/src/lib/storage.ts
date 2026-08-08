import type { AllData } from "../types/movie";

const STORAGE_KEY = "wedding-movie-dashboard";
const SELECTED_MOVIE_KEY = "wedding-movie-dashboard-selected";

export function loadStoredDataSnapshot(): Partial<AllData> | undefined {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return undefined;
    return parsed as Partial<AllData>;
  } catch {
    return undefined;
  }
}

export function loadData(defaults: AllData): AllData {
  const parsed = loadStoredDataSnapshot();
  if (parsed) {
    return {
      movies: Array.isArray(parsed.movies) ? parsed.movies : defaults.movies,
      scenes: Array.isArray(parsed.scenes) ? parsed.scenes : defaults.scenes,
      assets: Array.isArray(parsed.assets) ? parsed.assets : defaults.assets,
      prompts: Array.isArray(parsed.prompts) ? parsed.prompts : defaults.prompts,
      tasks: Array.isArray(parsed.tasks) ? parsed.tasks : defaults.tasks,
    };
  }
  return defaults;
}

export function saveData(data: AllData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function clearData(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function loadSelectedMovie(): string {
  return localStorage.getItem(SELECTED_MOVIE_KEY) ?? "opening";
}

export function saveSelectedMovie(movieId: string): void {
  localStorage.setItem(SELECTED_MOVIE_KEY, movieId);
}
