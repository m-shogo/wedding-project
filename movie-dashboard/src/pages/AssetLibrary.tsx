import { useState } from "react";
import { Header } from "../components/Header";
import { Badge } from "../components/Badge";
import { Modal } from "../components/Modal";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { AssetForm } from "../components/forms/AssetForm";
import { downloadText } from "../lib/exporters";
import {
  assetTypeLabel,
  assetTypeColor,
  assetStatusLabel,
  assetStatusColor,
} from "../lib/labels";
import { useProduction } from "../store/productionStore";
import { useToast } from "../store/toastStore";
import type { Asset, AssetType, AssetStatus } from "../types/movie";

const allTypes: AssetType[] = [
  "generated_image", "own_photo", "own_video", "ai_video",
  "motion_studio_export", "audio", "reference", "text", "design_asset",
];
const allStatuses: AssetStatus[] = [
  "idea", "needed", "collecting", "ready", "selected", "rejected", "needs_replace", "used",
];

function isImagePath(p: string): boolean {
  return /\.(jpe?g|png|webp|gif|svg)$/i.test(p);
}

function toCsvRow(fields: string[]): string {
  return fields.map((f) => `"${f.replace(/"/g, '""')}"`).join(",");
}

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
  const { addToast } = useToast();

  const [filterType, setFilterType] = useState<AssetType | "all">("all");
  const [filterStatus, setFilterStatus] = useState<AssetStatus | "all">("all");
  const [editAsset, setEditAsset] = useState<Asset | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkStatus, setBulkStatus] = useState<AssetStatus>("used");
  const [bulkDeleteConfirm, setBulkDeleteConfirm] = useState(false);
  const [previewPath, setPreviewPath] = useState<string | null>(null);

  const assets = selectedMovieId === "all" ? data.assets : movieAssets;
  const filtered = assets
    .filter((a) => filterType === "all" || a.type === filterType)
    .filter((a) => filterStatus === "all" || a.status === filterStatus)
    .filter((a) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return [a.title, a.path, a.notes, a.source, a.usage].some((f) => f.toLowerCase().includes(q));
    });

  function copyPath(path: string, assetId: string) {
    navigator.clipboard.writeText(path);
    setCopiedId(assetId);
    setTimeout(() => setCopiedId(null), 1500);
  }

  function toggleSelect(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    if (selectedIds.size === filtered.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filtered.map((a) => a.assetId)));
    }
  }

  function applyBulkStatus() {
    for (const id of selectedIds) {
      const asset = data.assets.find((a) => a.assetId === id);
      if (asset) updateAsset({ ...asset, status: bulkStatus });
    }
    addToast(`${selectedIds.size}件のステータスを変更しました`, "success");
    setSelectedIds(new Set());
  }

  function doBulkDelete() {
    for (const id of selectedIds) deleteAsset(id);
    addToast(`${selectedIds.size}件を削除しました`, "info");
    setSelectedIds(new Set());
    setBulkDeleteConfirm(false);
  }

  function handleExportCsv() {
    const bom = "﻿";
    const header = toCsvRow(["素材ID", "タイプ", "タイトル", "パス", "ステータス", "用途", "シーンID", "メモ"]);
    const rows = filtered.map((a) =>
      toCsvRow([a.assetId, a.type, a.title, a.path, a.status, a.usage, a.relatedSceneIds.join(";"), a.notes]),
    );
    downloadText(bom + [header, ...rows].join("\n"), "assets.csv");
  }

  // Reset selection on filter change
  function changeFilterType(t: AssetType | "all") {
    setFilterType(t);
    setSelectedIds(new Set());
  }
  function changeFilterStatus(s: AssetStatus | "all") {
    setFilterStatus(s);
    setSelectedIds(new Set());
  }

  return (
    <div>
      <Header title="素材ライブラリ" description="写真・動画・生成素材のパス、用途、ステータスを管理します。実ファイルはGitに入れません" showMovieSelector />

      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-wrap gap-2">
          <button onClick={() => changeFilterType("all")}
            className={`px-3 py-1.5 text-xs rounded-full font-medium transition-colors ${filterType === "all" ? "bg-navy-700 text-white" : "bg-sand-100 dark:bg-navy-700 text-navy-600 dark:text-navy-300 hover:bg-sand-200 dark:hover:bg-navy-600"}`}>
            すべて ({assets.length})
          </button>
          {allTypes.map((t) => {
            const count = assets.filter((a) => a.type === t).length;
            if (count === 0) return null;
            return (
              <button key={t} onClick={() => changeFilterType(t)}
                className={`px-3 py-1.5 text-xs rounded-full font-medium transition-colors ${filterType === t ? "bg-navy-700 text-white" : "bg-sand-100 dark:bg-navy-700 text-navy-600 dark:text-navy-300 hover:bg-sand-200 dark:hover:bg-navy-600"}`}>
                {assetTypeLabel[t]} ({count})
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleExportCsv} className="px-3 py-1.5 text-xs rounded-lg border border-sand-200 dark:border-navy-600 text-navy-600 dark:text-navy-300 hover:bg-sand-50 dark:hover:bg-navy-700">
            CSV出力
          </button>
          <button onClick={() => setShowAdd(true)} className="px-4 py-2 text-sm rounded-lg bg-navy-700 text-white hover:bg-navy-800 shrink-0">
            + 素材追加
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-navy-400 self-center mr-1">状態:</span>
          <button onClick={() => changeFilterStatus("all")}
            className={`px-2 py-1 text-xs rounded font-medium ${filterStatus === "all" ? "bg-navy-600 text-white" : "bg-sand-50 dark:bg-navy-700 text-navy-500 dark:text-navy-300 hover:bg-sand-100 dark:hover:bg-navy-600"}`}>
            すべて
          </button>
          {allStatuses.map((s) => {
            const count = assets.filter((a) => a.status === s).length;
            if (count === 0) return null;
            return (
              <button key={s} onClick={() => changeFilterStatus(s)}
                className={`px-2 py-1 text-xs rounded font-medium ${filterStatus === s ? "bg-navy-600 text-white" : "bg-sand-50 dark:bg-navy-700 text-navy-500 dark:text-navy-300 hover:bg-sand-100 dark:hover:bg-navy-600"}`}>
                {assetStatusLabel[s]} ({count})
              </button>
            );
          })}
        </div>
        <input
          type="search"
          placeholder="検索…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-input w-48 text-sm ml-auto"
        />
      </div>

      {/* Bulk action bar */}
      {selectedIds.size > 0 && (
        <div className="flex items-center gap-3 mb-4 p-3 bg-navy-50 dark:bg-navy-700 rounded-lg">
          <span className="text-sm text-navy-700 dark:text-navy-200 font-medium">{selectedIds.size}件選択中</span>
          <select value={bulkStatus} onChange={(e) => setBulkStatus(e.target.value as AssetStatus)} className="form-input w-auto text-xs">
            {allStatuses.map((s) => <option key={s} value={s}>{assetStatusLabel[s]}</option>)}
          </select>
          <button onClick={applyBulkStatus} className="px-3 py-1 text-xs rounded bg-navy-700 text-white hover:bg-navy-800">適用</button>
          <button onClick={() => setBulkDeleteConfirm(true)} className="px-3 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-700">削除</button>
          <button onClick={() => setSelectedIds(new Set())} className="px-3 py-1 text-xs rounded border border-sand-200 dark:border-navy-600 text-navy-600 dark:text-navy-300 hover:bg-sand-50 dark:hover:bg-navy-700">選択解除</button>
        </div>
      )}

      <div className="bg-white dark:bg-navy-800 rounded-xl border border-sand-200 dark:border-navy-600 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-navy-50 dark:bg-navy-700 text-left">
                <th className="px-3 py-3 w-8">
                  <input type="checkbox" checked={filtered.length > 0 && selectedIds.size === filtered.length} onChange={toggleAll} className="w-3.5 h-3.5" />
                </th>
                <th className="px-3 py-3 text-xs font-semibold text-navy-500 dark:text-navy-300 tracking-wider w-12"></th>
                <th className="px-4 py-3 text-xs font-semibold text-navy-500 dark:text-navy-300 tracking-wider">タイプ</th>
                <th className="px-4 py-3 text-xs font-semibold text-navy-500 dark:text-navy-300 tracking-wider">タイトル</th>
                <th className="px-4 py-3 text-xs font-semibold text-navy-500 dark:text-navy-300 tracking-wider">パス</th>
                <th className="px-4 py-3 text-xs font-semibold text-navy-500 dark:text-navy-300 tracking-wider">ステータス</th>
                <th className="px-4 py-3 text-xs font-semibold text-navy-500 dark:text-navy-300 tracking-wider">シーン</th>
                <th className="px-4 py-3 text-xs font-semibold text-navy-500 dark:text-navy-300 tracking-wider w-28">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-100 dark:divide-navy-600">
              {filtered.map((asset) => (
                <tr key={asset.assetId} className="hover:bg-sand-50 dark:hover:bg-navy-700 transition-colors">
                  <td className="px-3 py-3">
                    <input type="checkbox" checked={selectedIds.has(asset.assetId)} onChange={() => toggleSelect(asset.assetId)} className="w-3.5 h-3.5" />
                  </td>
                  <td className="px-3 py-3">
                    {asset.path && isImagePath(asset.path) ? (
                      <img
                        src={asset.path}
                        className="w-10 h-10 object-cover rounded cursor-pointer"
                        onClick={() => setPreviewPath(asset.path)}
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                        alt=""
                      />
                    ) : (
                      <span className="text-lg">📄</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Badge label={assetTypeLabel[asset.type]} colorClass={assetTypeColor[asset.type]} />
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-navy-800 dark:text-sand-100">{asset.title}</p>
                    {asset.notes && <p className="text-xs text-navy-400 mt-0.5 max-w-xs truncate">{asset.notes}</p>}
                  </td>
                  <td className="px-4 py-3">
                    {asset.path ? (
                      <div className="flex items-center gap-1">
                        <code className="text-xs bg-sand-100 dark:bg-navy-600 px-1.5 py-0.5 rounded text-navy-600 dark:text-navy-300 max-w-[200px] truncate block">{asset.path}</code>
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
                        <span key={s} className="text-xs bg-navy-50 dark:bg-navy-700 text-navy-500 dark:text-navy-300 px-1.5 py-0.5 rounded font-mono">{s}</span>
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
                <tr><td colSpan={8} className="px-4 py-8 text-center text-navy-400 text-sm">該当する素材がありません</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="素材追加" wide>
        <AssetForm selectedMovieId={selectedMovieId} onSave={(a) => { addAsset(a); setShowAdd(false); addToast("素材を追加しました", "success"); }} onCancel={() => setShowAdd(false)} />
      </Modal>

      <Modal open={!!editAsset} onClose={() => setEditAsset(null)} title="素材編集" wide>
        {editAsset && <AssetForm asset={editAsset} selectedMovieId={selectedMovieId} onSave={(a) => { updateAsset(a); setEditAsset(null); }} onCancel={() => setEditAsset(null)} />}
      </Modal>

      <ConfirmDialog
        open={!!deleteId}
        title="素材削除"
        message="この素材を削除しますか？紐付いたシーンからも解除されます。"
        onConfirm={() => { if (deleteId) deleteAsset(deleteId); setDeleteId(null); addToast("素材を削除しました", "info"); }}
        onCancel={() => setDeleteId(null)}
        danger
      />

      <ConfirmDialog
        open={bulkDeleteConfirm}
        title="一括削除"
        message={`${selectedIds.size}件の素材を削除しますか？`}
        onConfirm={doBulkDelete}
        onCancel={() => setBulkDeleteConfirm(false)}
        danger
      />

      {/* Image preview */}
      <Modal open={!!previewPath} onClose={() => setPreviewPath(null)} title="プレビュー" wide>
        {previewPath && <img src={previewPath} className="max-w-full max-h-[70vh] mx-auto" alt="" />}
      </Modal>
    </div>
  );
}
