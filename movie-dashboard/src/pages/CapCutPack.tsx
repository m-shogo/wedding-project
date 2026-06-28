import { useState } from "react";
import { Header } from "../components/Header";
import { Badge } from "../components/Badge";
import { SectionCard } from "../components/SectionCard";
import {
  sceneStatusLabel, sceneStatusColor,
  assetStatusLabel, assetStatusColor,
} from "../lib/labels";
import { useProduction } from "../store/productionStore";
import { exportCapcutMarkdown, downloadText, downloadJson } from "../lib/exporters";
import type { Asset } from "../types/movie";

export function CapCutPack() {
  const {
    movieScenes,
    movieAssets,
    moviePrompts,
    movieTasks,
    data,
    currentMovie,
    updateScene,
  } = useProduction();

  const [editingMemo, setEditingMemo] = useState<string | null>(null);
  const [memoText, setMemoText] = useState("");

  function getSceneAssets(sceneAssetIds: string[]): Asset[] {
    return sceneAssetIds
      .map((id) => data.assets.find((a) => a.assetId === id))
      .filter((a): a is Asset => a !== undefined);
  }

  function handleExportMarkdown() {
    const md = exportCapcutMarkdown(
      currentMovie?.title ?? "ムービー",
      movieScenes,
      movieAssets,
      moviePrompts,
      movieTasks,
    );
    downloadText(md, `${currentMovie?.movieId ?? "movie"}_capcut_edit_plan.md`);
  }

  function handleExportJson() {
    const pack = {
      movie: currentMovie,
      scenes: movieScenes,
      assets: movieAssets,
      prompts: moviePrompts,
      tasks: movieTasks,
      exportedAt: new Date().toISOString(),
    };
    downloadJson(pack, `${currentMovie?.movieId ?? "movie"}_capcut_pack.json`);
  }

  function startEditMemo(sceneId: string, current?: string) {
    setEditingMemo(sceneId);
    setMemoText(current ?? "");
  }

  function saveMemo(sceneId: string) {
    const scene = movieScenes.find((s) => s.sceneId === sceneId);
    if (scene) {
      updateScene({ ...scene, capcutMemo: memoText || undefined });
    }
    setEditingMemo(null);
  }

  let timelineSec = 0;
  const totalDuration = movieScenes.reduce((s, sc) => s + sc.durationSec, 0);

  return (
    <div>
      <Header title="CapCut Pack" description="CapCut編集に渡すための素材・指示まとめ" showMovieSelector />

      <div className="flex items-center justify-end gap-3 mb-6">
        <button onClick={handleExportMarkdown} className="px-4 py-2 text-sm rounded-lg border border-sand-200 text-navy-600 hover:bg-sand-50">
          Markdown書き出し
        </button>
        <button onClick={handleExportJson} className="px-4 py-2 text-sm rounded-lg border border-sand-200 text-navy-600 hover:bg-sand-50">
          JSON書き出し
        </button>
      </div>

      {/* Timeline bar */}
      <SectionCard title="Timeline Overview" className="mb-8">
        <div className="flex gap-1 h-8 rounded-lg overflow-hidden">
          {movieScenes.map((scene) => {
            const pct = totalDuration > 0 ? (scene.durationSec / totalDuration) * 100 : 0;
            const colorMap: Record<string, string> = {
              not_started: "bg-gray-300", collecting: "bg-amber-400", generating: "bg-blue-400",
              editing: "bg-purple-400", review: "bg-orange-400", done: "bg-emerald-400",
            };
            return (
              <div key={scene.sceneId}
                className={`${colorMap[scene.status] ?? "bg-gray-300"} flex items-center justify-center`}
                style={{ width: `${pct}%` }}
                title={`${scene.title} (${scene.durationSec}秒)`}>
                <span className="text-[10px] text-white font-bold truncate px-1">{scene.sceneId}</span>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between mt-2 text-xs text-navy-400">
          <span>0:00</span>
          <span>{Math.floor(totalDuration / 60)}:{String(totalDuration % 60).padStart(2, "0")}</span>
        </div>
      </SectionCard>

      {/* Scene cards */}
      <div className="space-y-6">
        {movieScenes.map((scene) => {
          const startSec = timelineSec;
          timelineSec += scene.durationSec;
          const sceneAssets = getSceneAssets(scene.assets);
          const missing = sceneAssets.filter((a) => a.status === "needed" || a.status === "idea" || !a.path);
          const ready = sceneAssets.filter((a) => (a.status === "used" || a.status === "selected" || a.status === "ready") && a.path);
          const isCapcutReady = sceneAssets.length > 0 && missing.length === 0;

          return (
            <div key={scene.sceneId} className="bg-white rounded-xl border border-sand-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-sand-100 bg-gradient-to-r from-navy-50 to-transparent flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-xs font-mono bg-navy-700 text-white px-2 py-1 rounded">
                    {Math.floor(startSec / 60)}:{String(startSec % 60).padStart(2, "0")} — {Math.floor(timelineSec / 60)}:{String(timelineSec % 60).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-800">{scene.title}</h3>
                    <p className="text-xs text-navy-400">{scene.durationSec}秒</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isCapcutReady && (
                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-medium">CapCut Ready</span>
                  )}
                  <Badge label={sceneStatusLabel[scene.status]} colorClass={sceneStatusColor[scene.status]} />
                </div>
              </div>

              <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-xs font-bold text-navy-400 uppercase tracking-wider mb-3">使用素材</h4>
                  {sceneAssets.length === 0 ? (
                    <p className="text-sm text-navy-300">素材なし</p>
                  ) : (
                    <ul className="space-y-2">
                      {sceneAssets.map((a) => (
                        <li key={a.assetId} className="text-sm">
                          <div className="flex items-center gap-2">
                            <Badge label={assetStatusLabel[a.status]} colorClass={assetStatusColor[a.status]} />
                            <span className="text-navy-700 font-medium truncate">{a.title}</span>
                          </div>
                          {a.path && <code className="text-xs text-navy-400 block mt-0.5 ml-16 truncate">{a.path}</code>}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div>
                  <h4 className="text-xs font-bold text-navy-400 uppercase tracking-wider mb-3">編集メモ</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-xs text-navy-400">テロップ:</span>
                      <p className="text-navy-700 font-serif italic">{scene.caption || "—"}</p>
                    </div>
                    <div>
                      <span className="text-xs text-navy-400">BGM/SE:</span>
                      <p className="text-navy-700">{scene.bgmCue || "—"}</p>
                    </div>
                    <div>
                      <span className="text-xs text-navy-400">CapCutメモ:</span>
                      {editingMemo === scene.sceneId ? (
                        <div className="mt-1">
                          <textarea value={memoText} onChange={(e) => setMemoText(e.target.value)}
                            className="w-full text-sm border border-sand-200 rounded p-2 focus:outline-none focus:ring-1 focus:ring-navy-300" rows={3} />
                          <div className="flex gap-2 mt-1">
                            <button onClick={() => saveMemo(scene.sceneId)} className="text-xs text-navy-600 hover:text-navy-800">保存</button>
                            <button onClick={() => setEditingMemo(null)} className="text-xs text-navy-400">キャンセル</button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start gap-2">
                          <p className="text-navy-500">{scene.capcutMemo || "—"}</p>
                          <button onClick={() => startEditMemo(scene.sceneId, scene.capcutMemo)} className="text-xs text-navy-400 hover:text-navy-600 shrink-0">✏️</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-navy-400 uppercase tracking-wider mb-3">ステータス</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-emerald-400" />
                      <span className="text-navy-700">準備完了: {ready.length}件</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-400" />
                      <span className="text-navy-700">不足: {missing.length}件</span>
                    </div>
                  </div>
                  {missing.length > 0 && (
                    <div className="mt-3 p-2 bg-red-50 rounded text-xs text-red-700">
                      <p className="font-semibold mb-1">不足素材:</p>
                      <ul className="list-disc list-inside">
                        {missing.map((a) => <li key={a.assetId}>{a.title}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
