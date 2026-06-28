import { useState } from "react";
import { Header } from "../components/Header";
import { Badge } from "../components/Badge";
import {
  assetTypeLabel,
  assetTypeColor,
  assetStatusLabel,
  assetStatusColor,
} from "../lib/labels";
import assets from "../data/assets.json";
import type { Asset, AssetType } from "../types/movie";

const typedAssets = assets as Asset[];

const allTypes: AssetType[] = [
  "generated_image",
  "own_photo",
  "own_video",
  "ai_video",
  "motion_studio_export",
  "audio",
  "reference",
];

export function AssetLibrary() {
  const [filterType, setFilterType] = useState<AssetType | "all">("all");

  const filtered =
    filterType === "all"
      ? typedAssets
      : typedAssets.filter((a) => a.type === filterType);

  return (
    <div>
      <Header
        title="Asset Library"
        description="素材一覧 — パス、用途、ステータスを管理"
      />

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilterType("all")}
          className={`px-3 py-1.5 text-xs rounded-full font-medium transition-colors ${
            filterType === "all"
              ? "bg-navy-700 text-white"
              : "bg-sand-100 text-navy-600 hover:bg-sand-200"
          }`}
        >
          すべて ({typedAssets.length})
        </button>
        {allTypes.map((t) => {
          const count = typedAssets.filter((a) => a.type === t).length;
          if (count === 0) return null;
          return (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 text-xs rounded-full font-medium transition-colors ${
                filterType === t
                  ? "bg-navy-700 text-white"
                  : "bg-sand-100 text-navy-600 hover:bg-sand-200"
              }`}
            >
              {assetTypeLabel[t]} ({count})
            </button>
          );
        })}
      </div>

      <div className="bg-white rounded-xl border border-sand-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-navy-50 text-left">
                <th className="px-4 py-3 text-xs font-semibold text-navy-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-navy-500 uppercase tracking-wider">
                  タイプ
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-navy-500 uppercase tracking-wider">
                  タイトル
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-navy-500 uppercase tracking-wider">
                  パス
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-navy-500 uppercase tracking-wider">
                  用途
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-navy-500 uppercase tracking-wider">
                  ステータス
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-navy-500 uppercase tracking-wider">
                  シーン
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-100">
              {filtered.map((asset) => (
                <tr key={asset.assetId} className="hover:bg-sand-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-navy-400">
                    {asset.assetId}
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      label={assetTypeLabel[asset.type]}
                      colorClass={assetTypeColor[asset.type]}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-navy-800">{asset.title}</p>
                    {asset.notes && (
                      <p className="text-xs text-navy-400 mt-0.5 max-w-xs truncate">
                        {asset.notes}
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {asset.path ? (
                      <code className="text-xs bg-sand-100 px-1.5 py-0.5 rounded text-navy-600 max-w-[200px] truncate block">
                        {asset.path}
                      </code>
                    ) : (
                      <span className="text-xs text-red-400">未設定</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-navy-600 max-w-[180px]">
                    {asset.usage}
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      label={assetStatusLabel[asset.status]}
                      colorClass={assetStatusColor[asset.status]}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {asset.relatedSceneIds.map((s) => (
                        <span
                          key={s}
                          className="text-xs bg-navy-50 text-navy-500 px-1.5 py-0.5 rounded font-mono"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
