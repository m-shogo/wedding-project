import { useState } from "react";
import type { Asset, AssetStatus, AssetType, PersonCategory, PeriodTag, PhotoOrientation, PhotoUsage } from "../../types/movie";
import { assetTypeLabel, assetStatusLabel, personCategoryLabel, periodTagLabel, photoOrientationLabel, photoUsageLabel } from "../../lib/labels";
import { generateId } from "../../lib/ids";

interface AssetFormProps {
  asset?: Asset;
  selectedMovieId: string;
  onSave: (asset: Asset) => void;
  onCancel: () => void;
}

const typeKeys = Object.keys(assetTypeLabel) as AssetType[];
const statusKeys = Object.keys(assetStatusLabel) as AssetStatus[];
const personKeys = Object.keys(personCategoryLabel) as PersonCategory[];
const periodKeys = Object.keys(periodTagLabel) as PeriodTag[];
const orientationKeys = Object.keys(photoOrientationLabel) as PhotoOrientation[];
const usageKeys = Object.keys(photoUsageLabel) as PhotoUsage[];

export function AssetForm({ asset, selectedMovieId, onSave, onCancel }: AssetFormProps) {
  const isEdit = !!asset;

  const [title, setTitle] = useState(asset?.title ?? "");
  const [type, setType] = useState<AssetType>(asset?.type ?? "generated_image");
  const [path, setPath] = useState(asset?.path ?? "");
  const [source, setSource] = useState(asset?.source ?? "");
  const [usage, setUsage] = useState(asset?.usage ?? "");
  const [status, setStatus] = useState<AssetStatus>(asset?.status ?? "idea");
  const [notes, setNotes] = useState(asset?.notes ?? "");
  const [personTags, setPersonTags] = useState<PersonCategory[]>(asset?.personTags ?? []);
  const [periodTags, setPeriodTags] = useState<PeriodTag[]>(asset?.periodTags ?? []);
  const [orientation, setOrientation] = useState<PhotoOrientation | "">(asset?.orientation ?? "");
  const [photoUsage, setPhotoUsage] = useState<PhotoUsage | "">(asset?.photoUsage ?? "");
  const [commentDraft, setCommentDraft] = useState(asset?.commentDraft ?? "");

  const isPhoto = type === "own_photo";

  function toggleTag<T extends string>(arr: T[], val: T): T[] {
    return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
  }

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
      ...(isPhoto ? {
        personTags: personTags.length > 0 ? personTags : undefined,
        periodTags: periodTags.length > 0 ? periodTags : undefined,
        orientation: orientation || undefined,
        photoUsage: photoUsage || undefined,
        commentDraft: commentDraft || undefined,
      } : {}),
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

      {/* Photo-specific fields */}
      {isPhoto && (
        <div className="border-t border-sand-200 dark:border-navy-600 pt-4 space-y-4">
          <h3 className="text-sm font-bold text-navy-700 dark:text-sand-100">写真情報</h3>
          <div>
            <label className="form-label">人物タグ</label>
            <div className="flex flex-wrap gap-2">
              {personKeys.map((k) => (
                <button key={k} type="button" onClick={() => setPersonTags(toggleTag(personTags, k))}
                  className={`px-2 py-1 text-xs rounded-full font-medium ${personTags.includes(k) ? "bg-navy-700 text-white" : "bg-sand-100 dark:bg-navy-700 text-navy-600 dark:text-navy-300"}`}>
                  {personCategoryLabel[k]}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="form-label">時期タグ</label>
            <div className="flex flex-wrap gap-2">
              {periodKeys.map((k) => (
                <button key={k} type="button" onClick={() => setPeriodTags(toggleTag(periodTags, k))}
                  className={`px-2 py-1 text-xs rounded-full font-medium ${periodTags.includes(k) ? "bg-navy-700 text-white" : "bg-sand-100 dark:bg-navy-700 text-navy-600 dark:text-navy-300"}`}>
                  {periodTagLabel[k]}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">向き</label>
              <select value={orientation} onChange={(e) => setOrientation(e.target.value as PhotoOrientation | "")} className="form-input">
                <option value="">未設定</option>
                {orientationKeys.map((k) => <option key={k} value={k}>{photoOrientationLabel[k]}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">写真用途</label>
              <select value={photoUsage} onChange={(e) => setPhotoUsage(e.target.value as PhotoUsage | "")} className="form-input">
                <option value="">未設定</option>
                {usageKeys.map((k) => <option key={k} value={k}>{photoUsageLabel[k]}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="form-label">コメント案（テロップ用）</label>
            <textarea value={commentDraft} onChange={(e) => setCommentDraft(e.target.value)} className="form-input" rows={2} placeholder="この写真に添えるテロップ案" />
          </div>
        </div>
      )}

      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm rounded-lg border border-sand-200 text-navy-600 hover:bg-sand-50 dark:border-navy-600 dark:text-navy-300 dark:hover:bg-navy-700">
          キャンセル
        </button>
        <button type="submit" className="px-4 py-2 text-sm rounded-lg bg-navy-700 text-white hover:bg-navy-800">
          {isEdit ? "更新" : "追加"}
        </button>
      </div>
    </form>
  );
}
