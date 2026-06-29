import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "../components/Header";
import { SectionCard } from "../components/SectionCard";
import { Badge } from "../components/Badge";
import { Modal } from "../components/Modal";
import { SceneForm } from "../components/forms/SceneForm";
import {
  sceneStatusLabel, sceneStatusColor,
  assetStatusLabel, assetStatusColor,
  promptStatusLabel, promptStatusColor,
  taskStatusLabel, taskStatusColor,
  taskPriorityLabel, taskPriorityColor,
} from "../lib/labels";
import { useProduction } from "../store/productionStore";

export function SceneDetail() {
  const { sceneId } = useParams<{ sceneId: string }>();
  const {
    data,
    updateScene,
    linkAssetToScene,
    unlinkAssetFromScene,
    linkPromptToScene,
    unlinkPromptFromScene,
  } = useProduction();

  const [editScene, setEditScene] = useState(false);
  const [linkAssetOpen, setLinkAssetOpen] = useState(false);
  const [linkPromptOpen, setLinkPromptOpen] = useState(false);
  const [memoEditing, setMemoEditing] = useState(false);
  const [memoText, setMemoText] = useState("");

  const scene = data.scenes.find((s) => s.sceneId === sceneId);

  if (!scene) {
    return (
      <div className="text-center py-16">
        <p className="text-navy-500 mb-4">シーンが見つかりません</p>
        <Link to="/storyboard" className="text-sm text-navy-600 hover:text-navy-800 underline">← 絵コンテに戻る</Link>
      </div>
    );
  }

  const sceneAssets = data.assets.filter((a) => scene.assets.includes(a.assetId));
  const scenePrompts = data.prompts.filter((p) => scene.promptIds.includes(p.promptId));
  const sceneTasks = data.tasks.filter((t) => t.relatedSceneId === scene.sceneId);
  const availableAssets = data.assets.filter((a) => !scene.assets.includes(a.assetId));
  const availablePrompts = data.prompts.filter((p) => !scene.promptIds.includes(p.promptId));

  function startMemoEdit() {
    setMemoText(scene!.capcutMemo ?? "");
    setMemoEditing(true);
  }

  function saveMemo() {
    if (!scene) return;
    updateScene({ ...scene, capcutMemo: memoText || undefined });
    setMemoEditing(false);
  }

  return (
    <div>
      <Header title={scene.title} description={scene.sceneId} />

      <div className="mb-6">
        <Link to="/storyboard" className="text-sm text-navy-500 hover:text-navy-700">← 絵コンテに戻る</Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: basic info */}
        <div className="lg:col-span-2 space-y-6">
          <SectionCard title="基本情報">
            <div className="flex items-center gap-3 mb-4">
              <Badge label={sceneStatusLabel[scene.status]} colorClass={sceneStatusColor[scene.status]} />
              <span className="text-sm text-navy-500">{scene.durationSec}秒</span>
              {scene.yearLabel && <span className="text-xs text-navy-400">{scene.yearLabel}</span>}
              {scene.person && <span className="text-xs text-navy-400">{scene.person}</span>}
              <button onClick={() => setEditScene(true)} className="ml-auto text-xs text-navy-500 hover:text-navy-700">✏️ 編集</button>
            </div>
            <div className="space-y-3">
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
          </SectionCard>

          <SectionCard title="CapCutメモ">
            {memoEditing ? (
              <div>
                <textarea value={memoText} onChange={(e) => setMemoText(e.target.value)} className="form-input" rows={4} />
                <div className="flex gap-2 mt-2">
                  <button onClick={saveMemo} className="px-3 py-1.5 text-xs rounded-lg bg-navy-700 text-white hover:bg-navy-800">保存</button>
                  <button onClick={() => setMemoEditing(false)} className="px-3 py-1.5 text-xs rounded-lg border border-sand-200 text-navy-600">キャンセル</button>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-2">
                <p className="text-sm text-navy-600 flex-1">{scene.capcutMemo || "—"}</p>
                <button onClick={startMemoEdit} className="text-xs text-navy-400 hover:text-navy-600 shrink-0">✏️</button>
              </div>
            )}
          </SectionCard>
        </div>

        {/* Right: relations */}
        <div className="space-y-6">
          <SectionCard title={`素材 (${sceneAssets.length})`}>
            <button onClick={() => setLinkAssetOpen(true)} className="text-xs text-navy-500 hover:text-navy-700 mb-3 block">+ 紐付け</button>
            {sceneAssets.length > 0 ? (
              <div className="space-y-2">
                {sceneAssets.map((a) => (
                  <div key={a.assetId} className="flex items-center gap-2 text-sm">
                    <Badge label={assetStatusLabel[a.status]} colorClass={assetStatusColor[a.status]} />
                    <span className="text-navy-700 truncate flex-1">{a.title}</span>
                    <button onClick={() => unlinkAssetFromScene(a.assetId, scene.sceneId)} className="text-xs text-red-400 hover:text-red-600 shrink-0">解除</button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-navy-300">なし</p>
            )}
          </SectionCard>

          <SectionCard title={`プロンプト (${scenePrompts.length})`}>
            <button onClick={() => setLinkPromptOpen(true)} className="text-xs text-navy-500 hover:text-navy-700 mb-3 block">+ 紐付け</button>
            {scenePrompts.length > 0 ? (
              <div className="space-y-2">
                {scenePrompts.map((p) => (
                  <div key={p.promptId} className="flex items-center gap-2 text-sm">
                    <Badge label={promptStatusLabel[p.status]} colorClass={promptStatusColor[p.status]} />
                    <span className="text-navy-700 truncate flex-1">{p.title}</span>
                    <button onClick={() => unlinkPromptFromScene(p.promptId, scene.sceneId)} className="text-xs text-red-400 hover:text-red-600 shrink-0">解除</button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-navy-300">なし</p>
            )}
          </SectionCard>

          <SectionCard title={`関連タスク (${sceneTasks.length})`}>
            {sceneTasks.length > 0 ? (
              <div className="space-y-2">
                {sceneTasks.map((t) => (
                  <div key={t.taskId} className="flex items-center gap-2 text-sm">
                    <Badge label={taskPriorityLabel[t.priority]} colorClass={taskPriorityColor[t.priority]} />
                    <Badge label={taskStatusLabel[t.status]} colorClass={taskStatusColor[t.status]} />
                    <span className="text-navy-700 truncate flex-1">{t.title}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-navy-300">なし</p>
            )}
          </SectionCard>
        </div>
      </div>

      {/* Edit scene modal */}
      <Modal open={editScene} onClose={() => setEditScene(false)} title="シーン編集" wide>
        <SceneForm scene={scene} movieId={scene.movieId} onSave={(s) => { updateScene(s); setEditScene(false); }} onCancel={() => setEditScene(false)} />
      </Modal>

      {/* Link asset */}
      <Modal open={linkAssetOpen} onClose={() => setLinkAssetOpen(false)} title="素材を紐付け">
        {availableAssets.length > 0 ? (
          <div className="space-y-2 max-h-80 overflow-auto">
            {availableAssets.map((a) => (
              <button key={a.assetId} onClick={() => { linkAssetToScene(a.assetId, scene.sceneId); setLinkAssetOpen(false); }}
                className="w-full text-left p-3 rounded-lg border border-sand-200 hover:bg-sand-50 flex items-center gap-3">
                <Badge label={assetStatusLabel[a.status]} colorClass={assetStatusColor[a.status]} />
                <span className="text-sm text-navy-700">{a.title}</span>
                <span className="text-xs text-navy-400 ml-auto font-mono">{a.assetId}</span>
              </button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-navy-400">紐付け可能な素材がありません</p>
        )}
      </Modal>

      {/* Link prompt */}
      <Modal open={linkPromptOpen} onClose={() => setLinkPromptOpen(false)} title="プロンプトを紐付け">
        {availablePrompts.length > 0 ? (
          <div className="space-y-2 max-h-80 overflow-auto">
            {availablePrompts.map((p) => (
              <button key={p.promptId} onClick={() => { linkPromptToScene(p.promptId, scene.sceneId); setLinkPromptOpen(false); }}
                className="w-full text-left p-3 rounded-lg border border-sand-200 hover:bg-sand-50 flex items-center gap-3">
                <Badge label={promptStatusLabel[p.status]} colorClass={promptStatusColor[p.status]} />
                <span className="text-sm text-navy-700">{p.title}</span>
                <span className="text-xs text-navy-400 ml-auto font-mono">{p.promptId}</span>
              </button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-navy-400">紐付け可能なプロンプトがありません</p>
        )}
      </Modal>
    </div>
  );
}
