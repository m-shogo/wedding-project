import { MovieSelector } from "./MovieSelector";
import { OpeningProductionGatePanel } from "./OpeningProductionGatePanel";
import { useProduction } from "../store/productionStore";

interface HeaderProps {
  title: string;
  description?: string;
  showMovieSelector?: boolean;
}

export function Header({ title, description, showMovieSelector }: HeaderProps) {
  const { undo, redo, canUndo, canRedo } = useProduction();
  const showOpeningGate = title === "ダッシュボード" || title === "MOVIE COACH";

  return (
    <>
      <header className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900 font-serif dark:text-sand-100">{title}</h1>
          {description && (
            <p className="mt-1 text-sm text-navy-500 dark:text-navy-300">{description}</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <button
              onClick={undo}
              disabled={!canUndo}
              className="px-2 py-1 text-xs text-navy-500 hover:text-navy-700 disabled:opacity-30 dark:text-navy-300 dark:hover:text-white"
              title="元に戻す (⌘Z)"
            >
              ↩ Undo
            </button>
            <button
              onClick={redo}
              disabled={!canRedo}
              className="px-2 py-1 text-xs text-navy-500 hover:text-navy-700 disabled:opacity-30 dark:text-navy-300 dark:hover:text-white"
              title="やり直し (⌘⇧Z)"
            >
              ↪ Redo
            </button>
          </div>
          {showMovieSelector && <MovieSelector />}
        </div>
      </header>
      {showOpeningGate && <OpeningProductionGatePanel compact={title === "MOVIE COACH"} />}
    </>
  );
}
