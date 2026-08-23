import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  getMovieCoachProgress,
  getOutcomeCompletion,
  loadCoachProgress,
  selectTodayOutcome,
} from "../lib/movieCoach";

export function MovieCoachNowBar() {
  const [progress] = useState(loadCoachProgress);
  const today = useMemo(() => selectTodayOutcome(progress), [progress]);
  const opening = useMemo(() => getMovieCoachProgress("opening", progress), [progress]);
  const profile = useMemo(() => getMovieCoachProgress("profile", progress), [progress]);
  const completion = today ? getOutcomeCompletion(today, progress.outcomeChecklist) : null;

  return (
    <section className="mb-6 border-y border-sand-200 dark:border-navy-600 py-4">
      <div className="flex flex-col xl:flex-row xl:items-center gap-4 xl:gap-8">
        <div className="shrink-0">
          <p className="text-[10px] tracking-[0.22em] font-semibold text-navy-400">MOVIE COACH / TODAY</p>
          <p className="mt-0.5 text-xs font-mono text-navy-500 dark:text-navy-300">GOAL 2026.10.24</p>
        </div>

        <div className="min-w-0 flex-1 border-l-2 border-navy-800 dark:border-sand-100 pl-4">
          {today ? (
            <>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <p className="font-bold text-navy-900 dark:text-sand-100">{today.title}</p>
                <span className="text-xs font-mono text-navy-400">
                  {completion?.done ?? 0}/{completion?.total ?? 0} · {completion?.percent ?? 0}%
                </span>
              </div>
              <p className="mt-1 text-xs text-navy-500 dark:text-navy-300 line-clamp-1">{today.whyToday}</p>
            </>
          ) : (
            <p className="font-bold text-emerald-700 dark:text-emerald-300">登録済みOutcomeはすべて完了</p>
          )}
        </div>

        <div className="flex items-center gap-5 text-xs shrink-0">
          <div>
            <span className="text-navy-400">OPENING </span>
            <span className="font-mono font-bold text-navy-800 dark:text-sand-100">{opening.percent}%</span>
          </div>
          <div>
            <span className="text-navy-400">PROFILE </span>
            <span className="font-mono font-bold text-navy-800 dark:text-sand-100">{profile.percent}%</span>
          </div>
          <Link
            to="/movie-coach"
            className="px-3 py-1.5 border border-navy-700 text-navy-700 hover:bg-navy-700 hover:text-white dark:border-sand-300 dark:text-sand-200 dark:hover:bg-sand-100 dark:hover:text-navy-900 transition"
          >
            今日の作業を開く →
          </Link>
        </div>
      </div>
    </section>
  );
}
