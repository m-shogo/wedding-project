import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { shortcutActions, shortcutDrills, shortcutPrinciples } from "../data/shortcutTraining";

const STORAGE_KEY = "wedding-movie-shortcut-training-v1";

interface ShortcutProgress {
  mappings: Record<string, string>;
  repetitions: Record<string, number>;
}

const emptyProgress: ShortcutProgress = { mappings: {}, repetitions: {} };

function loadProgress(): ShortcutProgress {
  if (typeof window === "undefined") return emptyProgress;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress;
    const parsed = JSON.parse(raw) as Partial<ShortcutProgress>;
    return {
      mappings: parsed.mappings && typeof parsed.mappings === "object" ? parsed.mappings : {},
      repetitions: parsed.repetitions && typeof parsed.repetitions === "object" ? parsed.repetitions : {},
    };
  } catch {
    return emptyProgress;
  }
}

export function ShortcutTraining() {
  const [progress, setProgress] = useState(loadProgress);
  const [selectedDrillId, setSelectedDrillId] = useState(shortcutDrills[0]?.drillId ?? "");
  const selectedDrill = useMemo(
    () => shortcutDrills.find((drill) => drill.drillId === selectedDrillId) ?? shortcutDrills[0],
    [selectedDrillId],
  );

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  function mappingFor(actionId: string, defaultBinding: string | null) {
    return progress.mappings[actionId] ?? defaultBinding ?? "";
  }

  function updateMapping(actionId: string, value: string) {
    setProgress((current) => ({
      ...current,
      mappings: { ...current.mappings, [actionId]: value },
    }));
  }

  function recordCleanRun(drillId: string) {
    setProgress((current) => ({
      ...current,
      repetitions: {
        ...current.repetitions,
        [drillId]: Math.min(3, (current.repetitions[drillId] ?? 0) + 1),
      },
    }));
  }

  function resetDrill(drillId: string) {
    setProgress((current) => ({
      ...current,
      repetitions: { ...current.repetitions, [drillId]: 0 },
    }));
  }

  const completedDrills = shortcutDrills.filter((drill) => (progress.repetitions[drill.drillId] ?? 0) >= 3).length;

  return (
    <div>
      <Header
        title="SHORTCUT TRAINING"
        description="キー暗記ゲームではなく、Weddingで頻出する操作を現在のKeyboard Mappingで3回連続実行する"
      />

      <section className="mb-9 border-y border-sand-200 dark:border-navy-600 py-5">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">PRINCIPLE</p>
            <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">速さより、映像から視線を離さない</h2>
          </div>
          <p className="text-sm font-mono text-navy-500 dark:text-navy-300">DRILLS {completedDrills}/{shortcutDrills.length}</p>
        </div>
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-3">
          {shortcutPrinciples.map((principle, index) => (
            <div key={principle} className="flex gap-3 text-sm text-navy-700 dark:text-navy-200">
              <span className="font-mono text-navy-400">{String(index + 1).padStart(2, "0")}</span>
              <span>{principle}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <div className="border-b-2 border-navy-900 dark:border-sand-100 pb-3 mb-4">
          <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">CURRENT KEYBOARD MAPPING</p>
          <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">自分のDaVinciで確認したkeyを正本にする</h2>
          <p className="mt-2 text-sm text-navy-500 dark:text-navy-300">
            DaVinci Resolve → Keyboard Customizationで現在のpresetを確認。空欄や違うkeyはここへ登録します。
          </p>
        </div>

        <div className="overflow-x-auto border-y border-sand-200 dark:border-navy-600">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="text-left text-[10px] tracking-widest text-navy-400 border-b border-sand-200 dark:border-navy-600">
                <th className="py-2 pr-3">ACTION</th>
                <th className="pr-3">KEY</th>
                <th className="pr-3">POLICY</th>
                <th>WEDDING USE</th>
              </tr>
            </thead>
            <tbody>
              {shortcutActions.map((action) => {
                const value = mappingFor(action.actionId, action.defaultBinding);
                return (
                  <tr key={action.actionId} className="border-b border-sand-100 dark:border-navy-700 align-top">
                    <td className="py-3 pr-3">
                      <p className="font-semibold text-navy-800 dark:text-sand-100">{action.label}</p>
                      <p className="mt-0.5 text-xs text-navy-400">{action.purpose}</p>
                    </td>
                    <td className="py-3 pr-3">
                      <input
                        value={value}
                        onChange={(event) => updateMapping(action.actionId, event.target.value)}
                        placeholder="確認して入力"
                        className="w-32 border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 px-2 py-1.5 font-mono text-sm text-navy-800 dark:text-sand-100"
                      />
                    </td>
                    <td className="py-3 pr-3">
                      <span className={`text-[10px] font-mono ${action.mappingPolicy === "known_core" ? "text-emerald-700 dark:text-emerald-300" : "text-amber-700 dark:text-amber-300"}`}>
                        {action.mappingPolicy === "known_core" ? "CORE / VERIFY IF CUSTOM" : "VERIFY CURRENT MAP"}
                      </span>
                    </td>
                    <td className="py-3 text-xs leading-5 text-navy-600 dark:text-navy-300">{action.weddingUse}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <div className="border-b-2 border-navy-900 dark:border-sand-100 pb-3 mb-4">
          <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">3 CLEAN RUNS</p>
          <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">迷わず3回できたら次へ</h2>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[0.75fr_1.4fr] gap-7">
          <div className="border-y border-sand-200 dark:border-navy-600 divide-y divide-sand-100 dark:divide-navy-700">
            {shortcutDrills.map((drill) => {
              const count = progress.repetitions[drill.drillId] ?? 0;
              const active = selectedDrill?.drillId === drill.drillId;
              return (
                <button
                  key={drill.drillId}
                  type="button"
                  onClick={() => setSelectedDrillId(drill.drillId)}
                  className={`w-full text-left px-3 py-4 border-l-2 ${active ? "border-navy-900 bg-sand-50 dark:border-sand-100 dark:bg-navy-800" : "border-transparent"}`}
                >
                  <span className="text-[10px] font-mono text-navy-400">{drill.minutes} MIN · CLEAN {count}/3</span>
                  <span className="block mt-1 text-sm font-semibold text-navy-800 dark:text-sand-100">{drill.title}</span>
                </button>
              );
            })}
          </div>

          {selectedDrill && (() => {
            const count = progress.repetitions[selectedDrill.drillId] ?? 0;
            const actions = selectedDrill.actionIds
              .map((actionId) => shortcutActions.find((action) => action.actionId === actionId))
              .filter((action) => action !== undefined);
            const unresolved = actions.filter(
              (action) => action.mappingPolicy === "verify_current_map" && !mappingFor(action.actionId, action.defaultBinding).trim(),
            );
            const complete = count >= 3;
            return (
              <article>
                <div className="border-b border-sand-200 dark:border-navy-600 pb-3">
                  <h3 className="text-xl font-bold text-navy-900 dark:text-sand-100">{selectedDrill.title}</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {actions.map((action) => (
                      <span key={action.actionId} className="text-[11px] font-mono border border-sand-300 dark:border-navy-500 px-2 py-1 text-navy-700 dark:text-navy-200">
                        {mappingFor(action.actionId, action.defaultBinding) || "?"} · {action.label}
                      </span>
                    ))}
                  </div>
                </div>

                {unresolved.length > 0 && (
                  <div className="mt-4 border-l-2 border-amber-400 pl-4 py-1">
                    <p className="text-xs font-semibold text-amber-700 dark:text-amber-300">
                      先にKeyboard Customizationで確認: {unresolved.map((action) => action.label).join(" / ")}
                    </p>
                  </div>
                )}

                <ol className="mt-5 space-y-3">
                  {selectedDrill.practice.map((step, index) => (
                    <li key={step} className="grid grid-cols-[28px_1fr] gap-3 text-sm text-navy-700 dark:text-navy-200">
                      <span className="font-mono text-navy-400">{String(index + 1).padStart(2, "0")}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>

                <div className="mt-5 border-y border-sand-200 dark:border-navy-600 py-4">
                  <p className="text-[10px] tracking-widest font-semibold text-emerald-700 dark:text-emerald-300">DONE WHEN</p>
                  <p className="mt-1 text-sm font-semibold text-navy-800 dark:text-sand-100">{selectedDrill.done}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      disabled={complete || unresolved.length > 0}
                      onClick={() => recordCleanRun(selectedDrill.drillId)}
                      className="px-3 py-2 text-xs border border-navy-700 text-navy-700 disabled:border-sand-200 disabled:text-navy-300 dark:border-sand-300 dark:text-sand-200 dark:disabled:border-navy-700 dark:disabled:text-navy-600"
                    >
                      {complete ? "✓ 3回完了" : `迷わずできた +1 (${count}/3)`}
                    </button>
                    {count > 0 && (
                      <button type="button" onClick={() => resetDrill(selectedDrill.drillId)} className="text-xs text-navy-400">
                        リセット
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })()}
        </div>
      </section>

      <section className="mb-8 border-y border-sand-200 dark:border-navy-600 py-5">
        <p className="text-[10px] tracking-[0.2em] font-semibold text-red-700 dark:text-red-300">DO NOT MEMORIZE BLINDLY</p>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
          {shortcutActions.slice(0, 8).map((action) => (
            <p key={action.actionId} className="text-sm text-navy-700 dark:text-navy-200">× {action.avoid}</p>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap gap-4 text-xs">
        <Link to="/movie-coach" className="border-b border-navy-300 text-navy-600 dark:text-navy-300">← Movie Coach</Link>
        <Link to="/movie-coach/timeline" className="border-b border-navy-300 text-navy-600 dark:text-navy-300">Timeline Anatomy →</Link>
        <Link to="/movie-coach/review" className="border-b border-navy-300 text-navy-600 dark:text-navy-300">10秒をReview →</Link>
      </div>
    </div>
  );
}
