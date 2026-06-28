import { useState } from "react";
import { Header } from "../components/Header";
import { Badge } from "../components/Badge";
import { Modal } from "../components/Modal";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { SceneForm } from "../components/forms/SceneForm";
import { sceneStatusLabel, sceneStatusColor, assetStatusLabel, assetStatusColor, promptStatusLabel, promptStatusColor } from "../lib/labels";
import { useProduction } from "../store/productionStore";
import type { Scene } from "../types/movie";

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
    linkAssetToScene,
    unlinkAssetFromScene,
    linkPromptToScene,
    unlinkPromptFromScene,
    currentMovie,
  } = useProduction();

  const [editScene, setEditScene] = useState<Scene | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [linkAssetSceneId, setLinkAssetSceneId] = useState<string | null>(null);
  const [linkPromptSceneId, setLinkPromptSceneId] = useState<string | null>(null);

  const totalDuration = movieScenes.reduce((s, sc) => s + sc.durationSec, 0);
  const targetDuration = currentMovie?.targetDurationSec ?? 0;

  return (
    <div>
      <Header title="絵コンテ" description="シーンの構成・編集・並び替え" showMovieSelector />

      <div className="flex items-center justify-between mb-6">
        <div className="text-sm text-navy-500">
          {movieScenes.length} シーン &middot; 合計 {totalDuration}秒
          {targetDuration > 0 && ` / 目標 ${targetDuration}秒`}
        </div>
        {selectedMovieId !== "all" && (
          <button onClick={() => setShowAdd(true)} className="px-4 py-2 text-sm rounded-lg bg-navy-700 text-white hover:bg-navy-800">
            + シーン追加
          </button>
        )}
      </div>

      <div className="space-y-6">
        {movieScenes.map((scene, i) => {
          const sceneAssets = data.assets.filter((a) => scene.assets.includes(a.assetId));
          const scenePrompts = data.prompts.filter((p) => scene.promptIds.includes(p.promptId));
          return (
            <div key={scene.sceneId} className="bg-white rounded-xl border border-sand-200 shadow-sm overflow-hidden">
              <div className="flex items-center gap-4 px-6 py-4 border-b border-sand-100 bg-gradient-to-r from-navy-50 to-transparent">
                <div className="w-10 h-10 rounded-full bg-navy-700 text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-navy-800 truncate">{scene.title}</h3>
                    <Badge label={sceneStatusLabel[scene.status]} colorClass={sceneStatusColor[scene.status]} />
                  </div>
                  <p className="text-xs text-navy-400 mt-0.5">
                    {scene.sceneId} &middot; {scene.durationSec}秒
                    {scene.yearLabel && ` &middot; ${scene.yearLabel}`}
                    {scene.person && ` &middot; ${scene.person}`}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => moveScene(scene.sceneId, "up")} disabled={i === 0} className="p-1.5 text-navy-400 hover:text-navy-700 disabled:opacity-30" title="上へ">▲</button>
                  <button onClick={() => moveScene(scene.sceneId, "down")} disabled={i === movieScenes.length - 1} className="p-1.5 text-navy-400 hover:text-navy-700 disabled:opacity-30" title="下へ">▼</button>
                  <button onClick={() => setEditScene(scene)} className="p-1.5 text-navy-400 hover:text-navy-700" title="編集">✏️</button>
                  <button onClick={() => duplicateScene(scene.sceneId)} className="p-1.5 text-navy-400 hover:text-navy-700" title="複製">📋</button>
                  <button onClick={() => setDeleteId(scene.sceneId)} className="p-1.5 text-red-400 hover:text-red-600" title="削除">🗑</button>
                </div>
              </div>

              <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-navy-400 tracking-wider mb-1">目的</p>
                    <p className="text-sm text-navy-700">{scene.purpose}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-navy-400 tracking-wider mb-1">ビジュアル</p>
                    <p className="text-sm text-navy-700">{scene.visual}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-navy-400 tracking-wider mb-1">テロップ</p>
                    <p className="text-sm text-navy-700 font-serif italic">{scene.caption || "—"}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-navy-400 tracking-wider mb-1">BGMキュー</p>
                    <p className="text-sm text-navy-700">{scene.bgmCue || "—"}</p>
                  </div>
                  {scene.notes && (
                    <div>
                      <p className="text-xs font-semibold text-navy-400 tracking-wider mb-1">メモ</p>
                      <p className="text-sm text-navy-500 bg-sand-50 rounded p-2">{scene.notes}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-semibold text-navy-400 tracking-wider">素材 ({sceneAssets.length})</p>
                      <button onClick={() => setLinkAssetSceneId(scene.sceneId)} className="text-xs text-navy-500 hover:text-navy-700">+ 紐付け</button>
                    </div>
                    {sceneAssets.length > 0 ? (
                      <div className="space-y-1.5">
                        {sceneAssets.map((a) => (
                          <div key={a.assetId} className="flex items-center gap-2 text-sm">
                            <Badge label={assetStatusLabel[a.status]} colorClass={assetStatusColor[a.status]} />
                            <span className="text-navy-700 truncate flex-1">{a.title}</span>
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
                      <p className="text-xs font-semibold text-navy-400 tracking-wider">プロンプト ({scenePrompts.length})</p>
                      <button onClick={() => setLinkPromptSceneId(scene.sceneId)} className="text-xs text-navy-500 hover:text-navy-700">+ 紐付け</button>
                    </div>
                    {scenePrompts.length > 0 ? (
                      <div className="space-y-1.5">
                        {scenePrompts.map((p) => (
                          <div key={p.promptId} className="flex items-center gap-2 text-sm">
                            <Badge label={promptStatusLabel[p.status]} colorClass={promptStatusColor[p.status]} />
                            <span className="text-navy-700 truncate flex-1">{p.title}</span>
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
            </div>
          );
        })}
      </div>

      {/* Add scene modal */}
      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="シーン追加" wide>
        <SceneForm movieId={selectedMovieId} onSave={(s) => { addScene(s); setShowAdd(false); }} onCancel={() => setShowAdd(false)} />
      </Modal>

      {/* Edit scene modal */}
      <Modal open={!!editScene} onClose={() => setEditScene(null)} title="シーン編集" wide>
        {editScene && (
          <SceneForm scene={editScene} movieId={editScene.movieId} onSave={(s) => { updateScene(s); setEditScene(null); }} onCancel={() => setEditScene(null)} />
        )}
      </Modal>

      {/* Delete confirm */}
      <ConfirmDialog
        open={!!deleteId}
        title="シーン削除"
        message="このシーンを削除しますか？紐付いた素材・プロンプトの紐付けも解除されます。"
        onConfirm={() => { if (deleteId) deleteScene(deleteId); setDeleteId(null); }}
        onCancel={() => setDeleteId(null)}
        danger
      />

      {/* Link asset picker */}
      <Modal open={!!linkAssetSceneId} onClose={() => setLinkAssetSceneId(null)} title="素材を紐付け">
        {linkAssetSceneId && (() => {
          const scene = movieScenes.find((s) => s.sceneId === linkAssetSceneId);
          const available = data.assets.filter((a) => !scene?.assets.includes(a.assetId));
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

      {/* Link prompt picker */}
      <Modal open={!!linkPromptSceneId} onClose={() => setLinkPromptSceneId(null)} title="プロンプトを紐付け">
        {linkPromptSceneId && (() => {
          const scene = movieScenes.find((s) => s.sceneId === linkPromptSceneId);
          const available = data.prompts.filter((p) => !scene?.promptIds.includes(p.promptId));
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
    </div>
  );
}
