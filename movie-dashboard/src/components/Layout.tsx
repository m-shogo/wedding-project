import { useCallback, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { SearchPalette } from "./SearchPalette";
import { MovieCoachNowBar } from "./MovieCoachNowBar";
import { useProduction } from "../store/productionStore";
import { useToast } from "../store/toastStore";
import { saveToLocal } from "../lib/exporters";

export function Layout() {
  const [showSearch, setShowSearch] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showMobileNavigation, setShowMobileNavigation] = useState(false);
  const { undo, redo, getAllData } = useProduction();
  const { addToast } = useToast();
  const location = useLocation();

  const handleSaveLocal = useCallback(async () => {
    try {
      await saveToLocal(getAllData());
      addToast("src/data/ に保存しました", "success");
    } catch (e) {
      addToast(e instanceof Error ? e.message : "保存に失敗しました", "error");
    }
  }, [getAllData, addToast]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const mod = e.metaKey || e.ctrlKey;
      const inFormField = e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement;
      if (mod && e.key === "k") {
        e.preventDefault();
        setShowSearch((v) => !v);
      } else if (mod && e.shiftKey && e.key === "z" && !inFormField) {
        e.preventDefault();
        redo();
      } else if (mod && e.key === "z" && !inFormField) {
        e.preventDefault();
        undo();
      } else if (mod && e.key === "s") {
        e.preventDefault();
        void handleSaveLocal();
      } else if (e.key === "?" && !mod && !inFormField) {
        e.preventDefault();
        setShowShortcuts((v) => !v);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [undo, redo, handleSaveLocal]);

  return (
    <div className="flex min-h-screen">
      <button
        type="button"
        onClick={() => setShowMobileNavigation(true)}
        className="fixed left-3 top-3 z-30 rounded border border-sand-300 bg-white px-3 py-2 text-sm font-bold text-navy-800 shadow md:hidden dark:border-navy-600 dark:bg-navy-800 dark:text-sand-100"
        aria-label="メニューを開く"
      >
        ☰ メニュー
      </button>
      {showMobileNavigation && <button type="button" aria-label="メニューを閉じる" onClick={() => setShowMobileNavigation(false)} className="fixed inset-0 z-30 bg-black/40 md:hidden" />}
      <div className={`${showMobileNavigation ? "fixed" : "hidden"} inset-y-0 left-0 z-40 md:static md:block`}>
        <Sidebar onNavigate={() => setShowMobileNavigation(false)} />
      </div>
      <main className="min-w-0 flex-1 overflow-auto p-4 pt-16 md:p-8 dark:bg-navy-900">
        {location.pathname === "/" && <MovieCoachNowBar />}
        <Outlet />
      </main>
      <SearchPalette open={showSearch} onClose={() => setShowSearch(false)} />

      {/* Shortcut help */}
      {showShortcuts && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center" onClick={() => setShowShortcuts(false)}>
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm mx-4 overflow-hidden dark:bg-navy-800" onClick={(e) => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-sand-100 flex items-center justify-between dark:border-navy-600">
              <h2 className="text-lg font-bold text-navy-800 dark:text-sand-100">ショートカット</h2>
              <button onClick={() => setShowShortcuts(false)} className="text-navy-400 hover:text-navy-700 text-xl leading-none dark:text-navy-300">&times;</button>
            </div>
            <div className="p-6">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-sand-100 dark:divide-navy-600">
                  {[
                    ["⌘K", "検索"],
                    ["⌘Z", "元に戻す"],
                    ["⌘⇧Z", "やり直し"],
                    ["⌘S", "ローカル保存"],
                    ["?", "ショートカット一覧"],
                  ].map(([key, desc]) => (
                    <tr key={key}>
                      <td className="py-2 pr-4"><kbd className="px-2 py-0.5 bg-sand-100 dark:bg-navy-700 rounded text-xs font-mono text-navy-600 dark:text-navy-200">{key}</kbd></td>
                      <td className="py-2 text-navy-700 dark:text-navy-200">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
