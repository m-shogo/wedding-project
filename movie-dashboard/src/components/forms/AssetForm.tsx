import { useState } from "react";
import type { Asset, AssetStatus, AssetType } from "../../types/movie";
import { assetTypeLabel, assetStatusLabel } from "../../lib/labels";
import { generateId } from "../../lib/ids";

interface AssetFormProps {
  asset?: Asset;
  selectedMovieId: string;
  onSave: (asset: Asset) => void;
  onCancel: () => void;
}

const typeKeys = Object.keys(assetTypeLabel) as AssetType[];
const statusKeys = Object.keys(assetStatusLabel) as AssetStatus[];

export function AssetForm({ asset, selectedMovieId, onSave, onCancel }: AssetFormProps) {
  const isEdit = !!asset;

  const [title, setTitle] = useState(asset?.title ?? "");
  const [type, setType] = useState<AssetType>(asset?.type ?? "generated_image");
  const [path, setPath] = useState(asset?.path ?? "");
  const [source, setSource] = useState(asset?.source ?? "");
  const [usage, setUsage] = useState(asset?.usage ?? "");
  const [status, setStatus] = useState<AssetStatus>(asset?.status ?? "idea");
  const [notes, setNotes] = useState(asset?.notes ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result: Asset = {
      assetId: asset?.assetId ?? generateId("asset"),
      type,
      title,
      path,
      relatedSceneIds: asset?.relatedSceneIds ?? [],
      relatedMovieIds: asset?.relatedMovieIds ?? (selectedMovieId !== "all" ? [selectedMovieId] : []),
      status,
      source,
      usage,
      notes,
    };
    onSave(result);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="form-label">タイトル</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-input" required />
        </div>
        <div>
          <label className="form-label">素材タイプ</label>
          <select value={type} onChange={(e) => setType(e.target.value as AssetType)} className="form-input">
            {typeKeys.map((k) => (
              <option key={k} value={k}>{assetTypeLabel[k]}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="form-label">ステータス</label>
          <select value={status} onChange={(e) => setStatus(e.target.value as AssetStatus)} className="form-input">
            {statusKeys.map((k) => (
              <option key={k} value={k}>{assetStatusLabel[k]}</option>
            ))}
          </select>
        </div>
        <div className="col-span-2">
          <label className="form-label">パス</label>
          <input type="text" value={path} onChange={(e) => setPath(e.target.value)} className="form-input" />
        </div>
        <div>
          <label className="form-label">出典・生成元</label>
          <input type="text" value={source} onChange={(e) => setSource(e.target.value)} className="form-input" />
        </div>
        <div>
          <label className="form-label">用途</label>
          <input type="text" value={usage} onChange={(e) => setUsage(e.target.value)} className="form-input" />
        </div>
        <div className="col-span-2">
          <label className="form-label">メモ</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="form-input" rows={2} />
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm rounded-lg border border-sand-200 text-navy-600 hover:bg-sand-50">
          キャンセル
        </button>
        <button type="submit" className="px-4 py-2 text-sm rounded-lg bg-navy-700 text-white hover:bg-navy-800">
          {isEdit ? "更新" : "追加"}
        </button>
      </div>
    </form>
  );
}
