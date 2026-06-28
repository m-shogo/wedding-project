import { useState } from "react";
import { Header } from "../components/Header";
import { Badge } from "../components/Badge";
import { Modal } from "../components/Modal";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { AssetForm } from "../components/forms/AssetForm";
import {
  assetTypeLabel,
  assetTypeColor,
  assetStatusLabel,
  assetStatusColor,
} from "../lib/labels";
import { useProduction } from "../store/productionStore";
import type { Asset, AssetType, AssetStatus } from "../types/movie";

const allTypes: AssetType[] = [
  "generated_image", "own_photo", "own_video", "ai_video",
  "motion_studio_export", "audio", "reference", "text", "design_asset",
];
const allStatuses: AssetStatus[] = [
  "idea", "needed", "collecting", "ready", "selected", "rejected", "needs_replace", "used",
];

export function AssetLibrary() {
  const {
    selectedMovieId,
    movieAssets,
    data,
    addAsset,
    updateAsset,
    deleteAsset,
    duplicateAsset,
  } = useProduction();

  const [filterType, setFilterType] = useState<AssetType | "all">("all");
  const [filterStatus, setFilterStatus] = useState<AssetStatus | "all">("all");
  const [editAsset, setEditAsset] = useState<Asset | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const assets = selectedMovieId === "all" ? data.assets : movieAssets;
  const filtered = assets
    .filter((a) => filterType === "all" || a.type === filterType)
    .filter((a) => filterStatus === "all" || a.status === filterStatus);

  function copyPath(path: string, assetId: string) {
    navigator.clipboard.writeText(path);
    setCopiedId(assetId);
    setTimeout(() => setCopiedId(null), 1500);
  }

  return (
    <div>
      <Header title="素材ライブラリ" description="素材一覧 — パス、用途、ステータスを管理" showMovieSelector />

      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setFilterType("all")}
            className={`px-3 py-1.5 text-xs rounded-full font-medium transition-colors ${filterType === "all" ? "bg-navy-700 text-white" : "bg-sand-100 text-navy-600 hover:bg-sand-200"}`}>
            すべて ({assets.length})
          </button>
          {allTypes.map((t) => {
            const count = assets.filter((a) => a.type === t).length;
            if (count === 0) return null;
            return (
              <button key={t} onClick={() => setFilterType(t)}
                className={`px-3 py-1.5 text-xs rounded-full font-medium transition-colors ${filterType === t ? "bg-navy-700 text-white" : "bg-sand-100 text-navy-600 hover:bg-sand-200"}`}>
                {assetTypeLabel[t]} ({count})
              </button>
            );
          })}
        </div>
        <button onClick={() => setShowAdd(true)} className="px-4 py-2 text-sm rounded-lg bg-navy-700 text-white hover:bg-navy-800 shrink-0">
          + 素材追加
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <span className="text-xs text-navy-400 self-center mr-1">状態:</span>
        <button onClick={() => setFilterStatus("all")}
          className={`px-2 py-1 text-xs rounded font-medium ${filterStatus === "all" ? "bg-navy-600 text-white" : "bg-sand-50 text-navy-500 hover:bg-sand-100"}`}>
          すべて
        </button>
        {allStatuses.map((s) => {
          const count = assets.filter((a) => a.status === s).length;
          if (count === 0) return null;
          return (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`px-2 py-1 text-xs rounded font-medium ${filterStatus === s ? "bg-navy-600 text-white" : "bg-sand-50 text-navy-500 hover:bg-sand-100"}`}>
              {assetStatusLabel[s]} ({count})
            </button>
          );
        })}
      </div>

      <div className="bg-white rounded-xl border border-sand-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-navy-50 text-left">
                <th className="px-4 py-3 text-xs font-semibold text-navy-500 tracking-wider">タイプ</th>
                <th className="px-4 py-3 text-xs font-semibold text-navy-500 tracking-wider">タイトル</th>
                <th className="px-4 py-3 text-xs font-semibold text-navy-500 tracking-wider">パス</th>
                <th className="px-4 py-3 text-xs font-semibold text-navy-500 tracking-wider">ステータス</th>
                <th className="px-4 py-3 text-xs font-semibold text-navy-500 tracking-wider">シーン</th>
                <th className="px-4 py-3 text-xs font-semibold text-navy-500 tracking-wider w-28">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-100">
              {filtered.map((asset) => (
                <tr key={asset.assetId} className="hover:bg-sand-50 transition-colors">
                  <td className="px-4 py-3">
                    <Badge label={assetTypeLabel[asset.type]} colorClass={assetTypeColor[asset.type]} />
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-navy-800">{asset.title}</p>
                    {asset.notes && <p className="text-xs text-navy-400 mt-0.5 max-w-xs truncate">{asset.notes}</p>}
                  </td>
                  <td className="px-4 py-3">
                    {asset.path ? (
                      <div className="flex items-center gap-1">
                        <code className="text-xs bg-sand-100 px-1.5 py-0.5 rounded text-navy-600 max-w-[200px] truncate block">{asset.path}</code>
                        <button onClick={() => copyPath(asset.path, asset.assetId)} className="text-xs text-navy-400 hover:text-navy-600 shrink-0">
                          {copiedId === asset.assetId ? "✓" : "📋"}
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-red-400">未設定</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Badge label={assetStatusLabel[asset.status]} colorClass={assetStatusColor[asset.status]} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {asset.relatedSceneIds.map((s) => (
                        <span key={s} className="text-xs bg-navy-50 text-navy-500 px-1.5 py-0.5 rounded font-mono">{s}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => setEditAsset(asset)} className="text-xs text-navy-400 hover:text-navy-700" title="編集">✏️</button>
                      <button onClick={() => duplicateAsset(asset.assetId)} className="text-xs text-navy-400 hover:text-navy-700" title="複製">📋</button>
                      <button onClick={() => setDeleteId(asset.assetId)} className="text-xs text-red-400 hover:text-red-600" title="削除">🗑</button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-navy-400 text-sm">該当する素材がありません</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="素材追加" wide>
        <AssetForm selectedMovieId={selectedMovieId} onSave={(a) => { addAsset(a); setShowAdd(false); }} onCancel={() => setShowAdd(false)} />
      </Modal>

      <Modal open={!!editAsset} onClose={() => setEditAsset(null)} title="素材編集" wide>
        {editAsset && <AssetForm asset={editAsset} selectedMovieId={selectedMovieId} onSave={(a) => { updateAsset(a); setEditAsset(null); }} onCancel={() => setEditAsset(null)} />}
      </Modal>

      <ConfirmDialog
        open={!!deleteId}
        title="素材削除"
        message="この素材を削除しますか？紐付いたシーンからも解除されます。"
        onConfirm={() => { if (deleteId) deleteAsset(deleteId); setDeleteId(null); }}
        onCancel={() => setDeleteId(null)}
        danger
      />
    </div>
  );
}
