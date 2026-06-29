import { useState } from "react";
import type { MovieProject, MovieStatus, MovieType } from "../../types/movie";
import { movieTypeLabel, movieStatusLabel } from "../../lib/labels";
import { generateId } from "../../lib/ids";

interface MovieFormProps {
  movie?: MovieProject;
  onSave: (movie: MovieProject) => void;
  onCancel: () => void;
}

const typeKeys = Object.keys(movieTypeLabel) as MovieType[];
const statusKeys = Object.keys(movieStatusLabel) as MovieStatus[];

export function MovieForm({ movie, onSave, onCancel }: MovieFormProps) {
  const isEdit = !!movie;

  const [title, setTitle] = useState(movie?.title ?? "");
  const [type, setType] = useState<MovieType>(movie?.type ?? "opening");
  const [theme, setTheme] = useState(movie?.theme ?? "");
  const [targetDurationSec, setTargetDurationSec] = useState(movie?.targetDurationSec ?? 0);
  const [status, setStatus] = useState<MovieStatus>(movie?.status ?? "planning");
  const [description, setDescription] = useState(movie?.description ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({
      movieId: movie?.movieId ?? generateId("movie"),
      title,
      type,
      theme,
      targetDurationSec,
      status,
      description,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="form-label">タイトル</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-input" required />
        </div>
        <div>
          <label className="form-label">タイプ</label>
          <select value={type} onChange={(e) => setType(e.target.value as MovieType)} className="form-input">
            {typeKeys.map((k) => <option key={k} value={k}>{movieTypeLabel[k]}</option>)}
          </select>
        </div>
        <div>
          <label className="form-label">ステータス</label>
          <select value={status} onChange={(e) => setStatus(e.target.value as MovieStatus)} className="form-input">
            {statusKeys.map((k) => <option key={k} value={k}>{movieStatusLabel[k]}</option>)}
          </select>
        </div>
        <div>
          <label className="form-label">テーマ</label>
          <input type="text" value={theme} onChange={(e) => setTheme(e.target.value)} className="form-input" />
        </div>
        <div>
          <label className="form-label">目標尺（秒）</label>
          <input type="number" value={targetDurationSec} onChange={(e) => setTargetDurationSec(Number(e.target.value))} className="form-input" min={0} />
        </div>
        <div className="col-span-2">
          <label className="form-label">説明</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="form-input" rows={2} />
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
