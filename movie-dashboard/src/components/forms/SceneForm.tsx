import { useState } from "react";
import type { Scene, SceneStatus } from "../../types/movie";
import { sceneStatusLabel } from "../../lib/labels";
import { generateId } from "../../lib/ids";

interface SceneFormProps {
  scene?: Scene;
  movieId: string;
  onSave: (scene: Scene) => void;
  onCancel: () => void;
}

const statusKeys = Object.keys(sceneStatusLabel) as SceneStatus[];

export function SceneForm({ scene, movieId, onSave, onCancel }: SceneFormProps) {
  const isEdit = !!scene;

  const [title, setTitle] = useState(scene?.title ?? "");
  const [durationSec, setDurationSec] = useState(scene?.durationSec ?? 5);
  const [purpose, setPurpose] = useState(scene?.purpose ?? "");
  const [visual, setVisual] = useState(scene?.visual ?? "");
  const [caption, setCaption] = useState(scene?.caption ?? "");
  const [bgmCue, setBgmCue] = useState(scene?.bgmCue ?? "");
  const [status, setStatus] = useState<SceneStatus>(scene?.status ?? "not_started");
  const [notes, setNotes] = useState(scene?.notes ?? "");
  const [capcutMemo, setCapcutMemo] = useState(scene?.capcutMemo ?? "");
  const [photoSlots, setPhotoSlots] = useState(scene?.photoSlots ?? 0);
  const [comment, setComment] = useState(scene?.comment ?? "");
  const [yearLabel, setYearLabel] = useState(scene?.yearLabel ?? "");
  const [person, setPerson] = useState(scene?.person ?? "");
  const [requiredAssetCount, setRequiredAssetCount] = useState(scene?.requiredAssetCount ?? 0);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result: Scene = {
      sceneId: scene?.sceneId ?? generateId("scene"),
      movieId: scene?.movieId ?? movieId,
      title,
      durationSec,
      purpose,
      visual,
      caption,
      bgmCue,
      assets: scene?.assets ?? [],
      promptIds: scene?.promptIds ?? [],
      status,
      notes,
      capcutMemo: capcutMemo || undefined,
      photoSlots: photoSlots || undefined,
      comment: comment || undefined,
      yearLabel: yearLabel || undefined,
      person: person || undefined,
      requiredAssetCount: requiredAssetCount || undefined,
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
          <label className="form-label">尺 (秒)</label>
          <input type="number" value={durationSec} onChange={(e) => setDurationSec(Number(e.target.value))} className="form-input" min={1} />
        </div>
        <div>
          <label className="form-label">ステータス</label>
          <select value={status} onChange={(e) => setStatus(e.target.value as SceneStatus)} className="form-input">
            {statusKeys.map((k) => (
              <option key={k} value={k}>{sceneStatusLabel[k]}</option>
            ))}
          </select>
        </div>
        <div className="col-span-2">
          <label className="form-label">目的</label>
          <input type="text" value={purpose} onChange={(e) => setPurpose(e.target.value)} className="form-input" />
        </div>
        <div className="col-span-2">
          <label className="form-label">ビジュアル</label>
          <input type="text" value={visual} onChange={(e) => setVisual(e.target.value)} className="form-input" />
        </div>
        <div>
          <label className="form-label">テロップ</label>
          <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)} className="form-input" />
        </div>
        <div>
          <label className="form-label">BGMキュー</label>
          <input type="text" value={bgmCue} onChange={(e) => setBgmCue(e.target.value)} className="form-input" />
        </div>
        <div>
          <label className="form-label">年ラベル</label>
          <input type="text" value={yearLabel} onChange={(e) => setYearLabel(e.target.value)} className="form-input" />
        </div>
        <div>
          <label className="form-label">人物</label>
          <input type="text" value={person} onChange={(e) => setPerson(e.target.value)} className="form-input" />
        </div>
        <div>
          <label className="form-label">写真スロット数</label>
          <input type="number" value={photoSlots} onChange={(e) => setPhotoSlots(Number(e.target.value))} className="form-input" min={0} />
        </div>
        <div>
          <label className="form-label">必要素材数</label>
          <input type="number" value={requiredAssetCount} onChange={(e) => setRequiredAssetCount(Number(e.target.value))} className="form-input" min={0} />
        </div>
        <div className="col-span-2">
          <label className="form-label">コメント</label>
          <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} className="form-input" />
        </div>
        <div className="col-span-2">
          <label className="form-label">CapCutメモ</label>
          <textarea value={capcutMemo} onChange={(e) => setCapcutMemo(e.target.value)} className="form-input" rows={2} />
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
