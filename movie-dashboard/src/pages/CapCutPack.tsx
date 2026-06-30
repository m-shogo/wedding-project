import { useRef, useState } from "react";
import { Header } from "../components/Header";
import { Badge } from "../components/Badge";
import { SectionCard } from "../components/SectionCard";
import {
  sceneStatusLabel, sceneStatusColor,
  assetStatusLabel, assetStatusColor,
} from "../lib/labels";
import { useProduction } from "../store/productionStore";
import { useToast } from "../store/toastStore";
import { exportCapcutMarkdown, downloadText, downloadJson } from "../lib/exporters";
import { assetLocationSummary, capcutPackRule } from "../lib/assetPaths";
import type { Asset } from "../types/movie";

function toCsvRow(fields: string[]): string {
  return fields.map((f) => `"${f.replace(/"/g, '""')}"`).join(",");
}

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
  const { addToast } = useToast();

  const [editingMemo, setEditingMemo] = useState<string | null>(null);
  const [memoText, setMemoText] = useState("");
  const [hoveredSceneId, setHoveredSceneId] = useState<string | null>(null);
  const sceneRefs = useRef<Record<string, HTMLDivElement | null>>({});

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

  function handleExportCsv() {
    const bom = "﻿";
    const header = toCsvRow(["開始", "終了", "シーンID", "タイトル", "秒数", "テロップ", "BGM", "CapCutメモ", "素材", "ステータス"]);
    let t = 0;
    const rows = movieScenes.map((s) => {
      const start = `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;
      t += s.durationSec;
      const end = `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;
      const assets = getSceneAssets(s.assets).map((a) => a.title).join("; ");
      return toCsvRow([start, end, s.sceneId, s.title, String(s.durationSec), s.caption, s.bgmCue, s.capcutMemo ?? "", assets, s.status]);
    });
    downloadText(bom + [header, ...rows].join("\n"), `${currentMovie?.movieId ?? "movie"}_capcut_plan.csv`);
    addToast("CSVをエクスポートしました", "success");
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

  function scrollToScene(sceneId: string) {
    sceneRefs.current[sceneId]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  let timelineSec = 0;
  const totalDuration = movieScenes.reduce((s, sc) => s + sc.durationSec, 0);

  const timeMarkers: { sec: number; label: string }[] = [];
  if (totalDuration > 0) {
    const interval = totalDuration <= 30 ? 5 : totalDuration <= 120 ? 10 : 30;
    for (let s = 0; s <= totalDuration; s += interval) {
      timeMarkers.push({ sec: s, label: `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}` });
    }
  }

  return (
    <div>
      <Header title="CapCut編集パック" description="シーン順に素材パス・テロップ・BGM・編集メモをまとめます。Markdown書き出しも可能" showMovieSelector />

      <div className="flex items-center justify-end gap-3 mb-6">
        <button onClick={handleExportCsv} className="px-4 py-2 text-sm rounded-lg border border-sand-200 text-navy-600 hover:bg-sand-50 dark:border-navy-600 dark:text-navy-300 dark:hover:bg-navy-700">
          CSV出力
        </button>
        <button onClick={handleExportMarkdown} className="px-4 py-2 text-sm rounded-lg border border-sand-200 text-navy-600 hover:bg-sand-50 dark:border-navy-600 dark:text-navy-300 dark:hover:bg-navy-700">
          Markdown出力
        </button>
        <button onClick={handleExportJson} className="px-4 py-2 text-sm rounded-lg border border-sand-200 text-navy-600 hover:bg-sand-50 dark:border-navy-600 dark:text-navy-300 dark:hover:bg-navy-700">
          JSON出力
        </button>
      </div>

      {/* Interactive timeline bar */}
      <SectionCard title="タイムライン全体" className="mb-8">
        <div className="relative">
          <div className="flex gap-0.5 h-10 rounded-lg overflow-hidden">
            {movieScenes.map((scene) => {
              const pct = totalDuration > 0 ? (scene.durationSec / totalDuration) * 100 : 0;
              const colorMap: Record<string, string> = {
                not_started: "bg-gray-300", collecting: "bg-amber-400", generating: "bg-blue-400",
                editing: "bg-purple-400", review: "bg-orange-400", done: "bg-emerald-400",
              };
              const isHovered = hoveredSceneId === scene.sceneId;
              return (
                <div key={scene.sceneId}
                  className={`${colorMap[scene.status] ?? "bg-gray-300"} flex items-center justify-center cursor-pointer transition-all ${isHovered ? "ring-2 ring-navy-600 z-10 scale-y-110" : ""}`}
                  style={{ width: `${pct}%` }}
                  title={`${scene.title} (${scene.durationSec}秒)`}
                  onMouseEnter={() => setHoveredSceneId(scene.sceneId)}
                  onMouseLeave={() => setHoveredSceneId(null)}
                  onClick={() => scrollToScene(scene.sceneId)}>
                  <span className="text-[10px] text-white font-bold truncate px-1">{scene.title.slice(0, 6)}</span>
                </div>
              );
            })}
          </div>
          {/* Time markers */}
          <div className="relative h-4 mt-1">
            {timeMarkers.map((m) => (
              <span key={m.sec}
                className="absolute text-[10px] text-navy-400 -translate-x-1/2"
                style={{ left: `${totalDuration > 0 ? (m.sec / totalDuration) * 100 : 0}%` }}>
                {m.label}
              </span>
            ))}
          </div>
        </div>
        {/* Tooltip */}
        {hoveredSceneId && (() => {
          const s = movieScenes.find((sc) => sc.sceneId === hoveredSceneId);
          if (!s) return null;
          const scAssets = getSceneAssets(s.assets);
          return (
            <div className="mt-2 p-3 bg-navy-50 dark:bg-navy-700 rounded-lg text-sm">
              <p className="font-medium text-navy-800 dark:text-sand-100">{s.title} ({s.durationSec}秒)</p>
              <p className="text-xs text-navy-500 dark:text-navy-300">{s.caption || s.purpose}</p>
              {scAssets.length > 0 && <p className="text-xs text-navy-400 dark:text-navy-300 mt-1">素材: {scAssets.map((a) => a.title).join(", ")}</p>}
            </div>
          );
        })()}
      </SectionCard>

      {/* Asset location reference */}
      <div className="mb-6 p-4 bg-sand-50 dark:bg-navy-700 rounded-lg">
        <p className="text-xs font-medium text-navy-600 dark:text-navy-200 mb-2">素材本体の場所</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {assetLocationSummary.map((loc) => (
            <div key={loc.label} className="text-xs">
              <span className="text-navy-500 dark:text-navy-300">{loc.label}: </span>
              <code className="font-mono text-navy-700 dark:text-navy-200">{loc.path}</code>
            </div>
          ))}
        </div>
        <p className="text-xs text-navy-400 dark:text-navy-400 mt-2">
          CapCut Pack書き出し先: <code className="font-mono">{capcutPackRule.baseFolder}</code>
        </p>
      </div>

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
            <div key={scene.sceneId} ref={(el) => { sceneRefs.current[scene.sceneId] = el; }}
              className="bg-white dark:bg-navy-800 rounded-xl border border-sand-200 dark:border-navy-600 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-sand-100 dark:border-navy-600 bg-gradient-to-r from-navy-50 dark:from-navy-700 to-transparent flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-xs font-mono bg-navy-700 text-white px-2 py-1 rounded">
                    {Math.floor(startSec / 60)}:{String(startSec % 60).padStart(2, "0")} — {Math.floor(timelineSec / 60)}:{String(timelineSec % 60).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-800 dark:text-sand-100">{scene.title}</h3>
                    <p className="text-xs text-navy-400 dark:text-navy-300">{scene.durationSec}秒</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isCapcutReady && (
                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-medium">CapCut準備完了</span>
                  )}
                  <Badge label={sceneStatusLabel[scene.status]} colorClass={sceneStatusColor[scene.status]} />
                </div>
              </div>

              <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-xs font-bold text-navy-400 dark:text-navy-300 tracking-wider mb-3">使用素材</h4>
                  {sceneAssets.length === 0 ? (
                    <p className="text-sm text-navy-300 dark:text-navy-400">素材なし</p>
                  ) : (
                    <ul className="space-y-2">
                      {sceneAssets.map((a) => (
                        <li key={a.assetId} className="text-sm">
                          <div className="flex items-center gap-2">
                            <Badge label={assetStatusLabel[a.status]} colorClass={assetStatusColor[a.status]} />
                            <span className="text-navy-700 dark:text-navy-200 font-medium truncate">{a.title}</span>
                          </div>
                          {a.path && <code className="text-xs text-navy-400 block mt-0.5 ml-16 truncate">{a.path}</code>}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div>
                  <h4 className="text-xs font-bold text-navy-400 dark:text-navy-300 tracking-wider mb-3">編集メモ</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-xs text-navy-400">テロップ:</span>
                      <p className="text-navy-700 dark:text-navy-200 font-serif italic">{scene.caption || "—"}</p>
                    </div>
                    <div>
                      <span className="text-xs text-navy-400">BGM/SE:</span>
                      <p className="text-navy-700 dark:text-navy-200">{scene.bgmCue || "—"}</p>
                    </div>
                    <div>
                      <span className="text-xs text-navy-400">CapCutメモ:</span>
                      {editingMemo === scene.sceneId ? (
                        <div className="mt-1">
                          <textarea value={memoText} onChange={(e) => setMemoText(e.target.value)}
                            className="w-full text-sm border border-sand-200 dark:border-navy-600 dark:bg-navy-700 dark:text-sand-100 rounded p-2 focus:outline-none focus:ring-1 focus:ring-navy-300" rows={3} />
                          <div className="flex gap-2 mt-1">
                            <button onClick={() => saveMemo(scene.sceneId)} className="text-xs text-navy-600 hover:text-navy-800">保存</button>
                            <button onClick={() => setEditingMemo(null)} className="text-xs text-navy-400">キャンセル</button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start gap-2">
                          <p className="text-navy-500 dark:text-navy-300">{scene.capcutMemo || "—"}</p>
                          <button onClick={() => startEditMemo(scene.sceneId, scene.capcutMemo)} className="text-xs text-navy-400 hover:text-navy-600 shrink-0">✏️</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-navy-400 dark:text-navy-300 tracking-wider mb-3">ステータス</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-emerald-400" />
                      <span className="text-navy-700 dark:text-navy-200">準備完了: {ready.length}件</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-400" />
                      <span className="text-navy-700 dark:text-navy-200">不足: {missing.length}件</span>
                    </div>
                  </div>
                  {missing.length > 0 && (
                    <div className="mt-3 p-2 bg-red-50 dark:bg-red-900/20 rounded text-xs text-red-700 dark:text-red-400">
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
