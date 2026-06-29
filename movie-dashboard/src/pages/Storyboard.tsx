import { useState } from "react";
import { Link } from "react-router-dom";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Header } from "../components/Header";
import { Badge } from "../components/Badge";
import { Modal } from "../components/Modal";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { SceneForm } from "../components/forms/SceneForm";
import { sceneStatusLabel, sceneStatusColor, assetStatusLabel, assetStatusColor, promptStatusLabel, promptStatusColor } from "../lib/labels";
import { useProduction } from "../store/productionStore";
import { useToast } from "../store/toastStore";
import { downloadText } from "../lib/exporters";
import type { Scene } from "../types/movie";

const TEMPLATE_KEY = "wedding-movie-dashboard-scene-templates";

interface SceneTemplate {
  name: string;
  scene: Omit<Scene, "sceneId" | "movieId">;
}

function loadTemplates(): SceneTemplate[] {
  try {
    return JSON.parse(localStorage.getItem(TEMPLATE_KEY) ?? "[]") as SceneTemplate[];
  } catch { return []; }
}

function saveTemplates(templates: SceneTemplate[]) {
  localStorage.setItem(TEMPLATE_KEY, JSON.stringify(templates));
}

function toCsvRow(fields: string[]): string {
  return fields.map((f) => `"${f.replace(/"/g, '""')}"`).join(",");
}

function SortableScene({ scene, index, children }: { scene: Scene; index: number; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: scene.sceneId });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : undefined,
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div className="bg-white rounded-xl border border-sand-200 shadow-sm overflow-hidden dark:bg-navy-800 dark:border-navy-600">
        <div className="flex items-center gap-4 px-6 py-4 border-b border-sand-100 bg-gradient-to-r from-navy-50 to-transparent dark:from-navy-700 dark:border-navy-600">
          <button {...listeners} className="cursor-grab active:cursor-grabbing text-navy-400 hover:text-navy-600 shrink-0 p-1" title="ドラッグで並べ替え">
            ⠿
          </button>
          <div className="w-10 h-10 rounded-full bg-navy-700 text-white flex items-center justify-center font-bold text-sm shrink-0 dark:bg-navy-500">
            {index + 1}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export function Storyboard() {
  const {
    selectedMovieId,
    movieScenes,
    data,
    addScene,
    updateScene,
    deleteScene,
    duplicateScene,
    moveScene,
    reorderScenes,
    linkAssetToScene,
    unlinkAssetFromScene,
    linkPromptToScene,
    unlinkPromptFromScene,
    currentMovie,
  } = useProduction();
  const { addToast } = useToast();

  const [editScene, setEditScene] = useState<Scene | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [linkAssetSceneId, setLinkAssetSceneId] = useState<string | null>(null);
  const [linkPromptSceneId, setLinkPromptSceneId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showTemplates, setShowTemplates] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [saveTemplateScene, setSaveTemplateScene] = useState<Scene | null>(null);
  const [templates, setTemplates] = useState<SceneTemplate[]>(loadTemplates);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const totalDuration = movieScenes.reduce((s, sc) => s + sc.durationSec, 0);
  const targetDuration = currentMovie?.targetDurationSec ?? 0;

  const filtered = movieScenes.filter((s) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return [s.title, s.purpose, s.visual, s.caption, s.notes].some((f) => f.toLowerCase().includes(q));
  });

  const isDraggable = !searchQuery && selectedMovieId !== "all";

  function handleExportCsv() {
    const bom = "﻿";
    const header = toCsvRow(["シーンID", "タイトル", "秒数", "目的", "ビジュアル", "テロップ", "BGM", "ステータス", "素材数", "メモ"]);
    const rows = movieScenes.map((s) =>
      toCsvRow([s.sceneId, s.title, String(s.durationSec), s.purpose, s.visual, s.caption, s.bgmCue, s.status, String(s.assets.length), s.notes]),
    );
    downloadText(bom + [header, ...rows].join("\n"), `${currentMovie?.movieId ?? "movie"}_storyboard.csv`);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id || selectedMovieId === "all") return;
    const oldIndex = movieScenes.findIndex((s) => s.sceneId === active.id);
    const newIndex = movieScenes.findIndex((s) => s.sceneId === over.id);
    if (oldIndex === -1 || newIndex === -1) return;
    const newOrder = [...movieScenes.map((s) => s.sceneId)];
    const [removed] = newOrder.splice(oldIndex, 1);
    newOrder.splice(newIndex, 0, removed);
    reorderScenes(selectedMovieId, newOrder);
  }

  function handleSaveTemplate(scene: Scene) {
    setSaveTemplateScene(scene);
    setTemplateName(scene.title + " テンプレート");
  }

  function doSaveTemplate() {
    if (!saveTemplateScene || !templateName.trim()) return;
    const { sceneId: _sid, movieId: _mid, ...rest } = saveTemplateScene;
    void _sid; void _mid;
    const newTemplates = [...templates, { name: templateName.trim(), scene: rest }];
    saveTemplates(newTemplates);
    setTemplates(newTemplates);
    setSaveTemplateScene(null);
    setTemplateName("");
    addToast("テンプレートを保存しました", "success");
  }

  function applyTemplate(tpl: SceneTemplate) {
    if (selectedMovieId === "all") return;
    const newScene: Scene = {
      ...tpl.scene,
      sceneId: "",
      movieId: selectedMovieId,
    };
    addScene(newScene);
    setShowTemplates(false);
    addToast(`テンプレート「${tpl.name}」からシーンを追加しました`, "success");
  }

  function deleteTemplate(index: number) {
    const newTemplates = templates.filter((_, i) => i !== index);
    saveTemplates(newTemplates);
    setTemplates(newTemplates);
  }

  function renderSceneContent(scene: Scene, i: number) {
    const sceneAssets = data.assets.filter((a) => scene.assets.includes(a.assetId));
    const scenePrompts = data.prompts.filter((p) => scene.promptIds.includes(p.promptId));
    return (
      <>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <Link to={`/scene/${scene.sceneId}`} className="font-bold text-navy-800 truncate hover:text-navy-600 dark:text-navy-100 dark:hover:text-navy-300">{scene.title}</Link>
            <Badge label={sceneStatusLabel[scene.status]} colorClass={sceneStatusColor[scene.status]} />
          </div>
          <p className="text-xs text-navy-400 mt-0.5 dark:text-navy-300">
            {scene.sceneId} &middot; {scene.durationSec}秒
            {scene.yearLabel && ` · ${scene.yearLabel}`}
            {scene.person && ` · ${scene.person}`}
          </p>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {!isDraggable && (
            <>
              <button onClick={() => moveScene(scene.sceneId, "up")} disabled={i === 0} className="p-1.5 text-navy-400 hover:text-navy-700 disabled:opacity-30" title="上へ">▲</button>
              <button onClick={() => moveScene(scene.sceneId, "down")} disabled={i === filtered.length - 1} className="p-1.5 text-navy-400 hover:text-navy-700 disabled:opacity-30" title="下へ">▼</button>
            </>
          )}
          <button onClick={() => setEditScene(scene)} className="p-1.5 text-navy-400 hover:text-navy-700" title="編集">✏️</button>
          <button onClick={() => duplicateScene(scene.sceneId)} className="p-1.5 text-navy-400 hover:text-navy-700" title="複製">📋</button>
          <button onClick={() => handleSaveTemplate(scene)} className="p-1.5 text-navy-400 hover:text-navy-700" title="テンプレ保存">📌</button>
          <button onClick={() => setDeleteId(scene.sceneId)} className="p-1.5 text-red-400 hover:text-red-600" title="削除">🗑</button>
        </div>
        {/* Body */}
        <div className="col-span-full p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-navy-400 tracking-wider mb-1 dark:text-navy-300">目的</p>
              <p className="text-sm text-navy-700 dark:text-navy-200">{scene.purpose}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-navy-400 tracking-wider mb-1 dark:text-navy-300">ビジュアル</p>
              <p className="text-sm text-navy-700 dark:text-navy-200">{scene.visual}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-navy-400 tracking-wider mb-1 dark:text-navy-300">テロップ</p>
              <p className="text-sm text-navy-700 font-serif italic dark:text-navy-200">{scene.caption || "—"}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-navy-400 tracking-wider mb-1 dark:text-navy-300">BGMキュー</p>
              <p className="text-sm text-navy-700 dark:text-navy-200">{scene.bgmCue || "—"}</p>
            </div>
            {scene.notes && (
              <div>
                <p className="text-xs font-semibold text-navy-400 tracking-wider mb-1 dark:text-navy-300">メモ</p>
                <p className="text-sm text-navy-500 bg-sand-50 rounded p-2 dark:bg-navy-700 dark:text-navy-200">{scene.notes}</p>
              </div>
            )}
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-navy-400 tracking-wider dark:text-navy-300">素材 ({sceneAssets.length})</p>
                <button onClick={() => setLinkAssetSceneId(scene.sceneId)} className="text-xs text-navy-500 hover:text-navy-700 dark:text-navy-300">+ 紐付け</button>
              </div>
              {sceneAssets.length > 0 ? (
                <div className="space-y-1.5">
                  {sceneAssets.map((a) => (
                    <div key={a.assetId} className="flex items-center gap-2 text-sm">
                      <Badge label={assetStatusLabel[a.status]} colorClass={assetStatusColor[a.status]} />
                      <span className="text-navy-700 truncate flex-1 dark:text-navy-200">{a.title}</span>
                      <button onClick={() => unlinkAssetFromScene(a.assetId, scene.sceneId)} className="text-xs text-red-400 hover:text-red-600 shrink-0">解除</button>
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text-xs text-navy-300">なし</span>
              )}
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-navy-400 tracking-wider dark:text-navy-300">プロンプト ({scenePrompts.length})</p>
                <button onClick={() => setLinkPromptSceneId(scene.sceneId)} className="text-xs text-navy-500 hover:text-navy-700 dark:text-navy-300">+ 紐付け</button>
              </div>
              {scenePrompts.length > 0 ? (
                <div className="space-y-1.5">
                  {scenePrompts.map((p) => (
                    <div key={p.promptId} className="flex items-center gap-2 text-sm">
                      <Badge label={promptStatusLabel[p.status]} colorClass={promptStatusColor[p.status]} />
                      <span className="text-navy-700 truncate flex-1 dark:text-navy-200">{p.title}</span>
                      <button onClick={() => unlinkPromptFromScene(p.promptId, scene.sceneId)} className="text-xs text-red-400 hover:text-red-600 shrink-0">解除</button>
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text-xs text-navy-300">なし</span>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div>
      <Header title="絵コンテ" description="シーンごとの構成・尺・素材・プロンプト・タスクを管理します" showMovieSelector />

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="text-sm text-navy-500 dark:text-navy-300">
            {movieScenes.length} シーン &middot; 合計 {totalDuration}秒
            {targetDuration > 0 && ` / 目標 ${targetDuration}秒`}
          </div>
          <input
            type="search"
            placeholder="検索…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input w-48 text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleExportCsv} className="px-3 py-1.5 text-xs rounded-lg border border-sand-200 text-navy-600 hover:bg-sand-50 dark:border-navy-600 dark:text-navy-300">
            CSV出力
          </button>
          {selectedMovieId !== "all" && templates.length > 0 && (
            <button onClick={() => setShowTemplates(true)} className="px-3 py-1.5 text-xs rounded-lg border border-sand-200 text-navy-600 hover:bg-sand-50 dark:border-navy-600 dark:text-navy-300">
              📌 テンプレート
            </button>
          )}
          {selectedMovieId !== "all" && (
            <button onClick={() => setShowAdd(true)} className="px-4 py-2 text-sm rounded-lg bg-navy-700 text-white hover:bg-navy-800">
              + シーン追加
            </button>
          )}
        </div>
      </div>

      {isDraggable ? (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={filtered.map((s) => s.sceneId)} strategy={verticalListSortingStrategy}>
            <div className="space-y-6">
              {filtered.map((scene, i) => (
                <SortableScene key={scene.sceneId} scene={scene} index={i}>
                  {renderSceneContent(scene, i)}
                </SortableScene>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        <div className="space-y-6">
          {filtered.map((scene, i) => (
            <div key={scene.sceneId} className="bg-white rounded-xl border border-sand-200 shadow-sm overflow-hidden dark:bg-navy-800 dark:border-navy-600">
              <div className="flex items-center gap-4 px-6 py-4 border-b border-sand-100 bg-gradient-to-r from-navy-50 to-transparent dark:from-navy-700 dark:border-navy-600">
                <div className="w-10 h-10 rounded-full bg-navy-700 text-white flex items-center justify-center font-bold text-sm shrink-0 dark:bg-navy-500">
                  {i + 1}
                </div>
                {renderSceneContent(scene, i)}
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="シーン追加" wide>
        <SceneForm movieId={selectedMovieId} onSave={(s) => { addScene(s); setShowAdd(false); addToast("シーンを追加しました", "success"); }} onCancel={() => setShowAdd(false)} />
      </Modal>

      <Modal open={!!editScene} onClose={() => setEditScene(null)} title="シーン編集" wide>
        {editScene && (
          <SceneForm scene={editScene} movieId={editScene.movieId} onSave={(s) => { updateScene(s); setEditScene(null); }} onCancel={() => setEditScene(null)} />
        )}
      </Modal>

      <ConfirmDialog
        open={!!deleteId}
        title="シーン削除"
        message="このシーンを削除しますか？紐付いた素材・プロンプトの紐付けも解除されます。"
        onConfirm={() => { if (deleteId) deleteScene(deleteId); setDeleteId(null); addToast("シーンを削除しました", "info"); }}
        onCancel={() => setDeleteId(null)}
        danger
      />

      <Modal open={!!linkAssetSceneId} onClose={() => setLinkAssetSceneId(null)} title="素材を紐付け">
        {linkAssetSceneId && (() => {
          const sc = movieScenes.find((s) => s.sceneId === linkAssetSceneId);
          const available = data.assets.filter((a) => !sc?.assets.includes(a.assetId));
          return available.length > 0 ? (
            <div className="space-y-2 max-h-80 overflow-auto">
              {available.map((a) => (
                <button key={a.assetId} onClick={() => { linkAssetToScene(a.assetId, linkAssetSceneId); setLinkAssetSceneId(null); }}
                  className="w-full text-left p-3 rounded-lg border border-sand-200 hover:bg-sand-50 flex items-center gap-3">
                  <Badge label={assetStatusLabel[a.status]} colorClass={assetStatusColor[a.status]} />
                  <span className="text-sm text-navy-700">{a.title}</span>
                  <span className="text-xs text-navy-400 ml-auto font-mono">{a.assetId}</span>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-navy-400">紐付け可能な素材がありません</p>
          );
        })()}
      </Modal>

      <Modal open={!!linkPromptSceneId} onClose={() => setLinkPromptSceneId(null)} title="プロンプトを紐付け">
        {linkPromptSceneId && (() => {
          const sc = movieScenes.find((s) => s.sceneId === linkPromptSceneId);
          const available = data.prompts.filter((p) => !sc?.promptIds.includes(p.promptId));
          return available.length > 0 ? (
            <div className="space-y-2 max-h-80 overflow-auto">
              {available.map((p) => (
                <button key={p.promptId} onClick={() => { linkPromptToScene(p.promptId, linkPromptSceneId); setLinkPromptSceneId(null); }}
                  className="w-full text-left p-3 rounded-lg border border-sand-200 hover:bg-sand-50 flex items-center gap-3">
                  <Badge label={promptStatusLabel[p.status]} colorClass={promptStatusColor[p.status]} />
                  <span className="text-sm text-navy-700">{p.title}</span>
                  <span className="text-xs text-navy-400 ml-auto font-mono">{p.promptId}</span>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-navy-400">紐付け可能なプロンプトがありません</p>
          );
        })()}
      </Modal>

      {/* Save template modal */}
      <Modal open={!!saveTemplateScene} onClose={() => setSaveTemplateScene(null)} title="シーンテンプレート保存">
        <div className="space-y-4">
          <p className="text-sm text-navy-500">このシーンの設定をテンプレートとして保存します。新規シーン作成時に再利用できます。</p>
          <div>
            <label className="form-label">テンプレート名</label>
            <input type="text" value={templateName} onChange={(e) => setTemplateName(e.target.value)} className="form-input w-full" />
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={() => setSaveTemplateScene(null)} className="px-4 py-2 text-sm rounded-lg border border-sand-200 text-navy-600">キャンセル</button>
            <button onClick={doSaveTemplate} disabled={!templateName.trim()} className="px-4 py-2 text-sm rounded-lg bg-navy-700 text-white hover:bg-navy-800 disabled:opacity-50">保存</button>
          </div>
        </div>
      </Modal>

      {/* Template list modal */}
      <Modal open={showTemplates} onClose={() => setShowTemplates(false)} title="シーンテンプレート">
        {templates.length > 0 ? (
          <div className="space-y-2 max-h-80 overflow-auto">
            {templates.map((tpl, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-sand-200 hover:bg-sand-50">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-navy-700">{tpl.name}</p>
                  <p className="text-xs text-navy-400">{tpl.scene.durationSec}秒 &middot; {tpl.scene.purpose.slice(0, 40)}</p>
                </div>
                <button onClick={() => applyTemplate(tpl)} className="text-xs text-navy-600 hover:text-navy-800 px-2 py-1 rounded bg-navy-50">適用</button>
                <button onClick={() => deleteTemplate(i)} className="text-xs text-red-400 hover:text-red-600">🗑</button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-navy-400">テンプレートがありません。シーンの📌ボタンで保存できます。</p>
        )}
      </Modal>
    </div>
  );
}
