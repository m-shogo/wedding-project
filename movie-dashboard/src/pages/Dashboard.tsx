import { useState } from "react";
import { Header } from "../components/Header";
import { StatCard } from "../components/StatCard";
import { SectionCard } from "../components/SectionCard";
import { Badge } from "../components/Badge";
import { Modal } from "../components/Modal";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { MovieForm } from "../components/forms/MovieForm";
import { computeStats } from "../lib/dashboard";
import {
  sceneStatusLabel,
  sceneStatusColor,
  taskPriorityLabel,
  taskPriorityColor,
  taskStatusLabel,
  taskStatusColor,
  movieStatusLabel,
  movieStatusColor,
  movieTypeLabel,
} from "../lib/labels";
import { useProduction } from "../store/productionStore";
import { useToast } from "../store/toastStore";
import type { MovieProject } from "../types/movie";

export function Dashboard() {
  const {
    data,
    currentMovie,
    movieScenes,
    movieAssets,
    moviePrompts,
    movieTasks,
    addMovie,
    updateMovie,
    deleteMovie,
  } = useProduction();
  const { addToast } = useToast();

  const [showAddMovie, setShowAddMovie] = useState(false);
  const [editMovie, setEditMovie] = useState<MovieProject | null>(null);
  const [deleteMovieId, setDeleteMovieId] = useState<string | null>(null);

  const stats = computeStats(
    currentMovie,
    movieScenes,
    movieAssets,
    moviePrompts,
    movieTasks,
  );

  return (
    <div>
      <Header
        title="ダッシュボード"
        description="ムービー制作の全体状況"
        showMovieSelector
      />

      {/* Row 1: Scene stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
        <StatCard icon="🎞" label="全シーン" value={stats.totalScenes} />
        <StatCard icon="✅" label="完了" value={stats.doneScenes} accent="text-emerald-600" />
        <StatCard icon="🔧" label="制作中" value={stats.inProgressScenes} accent="text-blue-600" />
        <StatCard icon="📊" label="進捗" value={`${stats.progressPercent}%`} accent="text-indigo-600" />
        <StatCard icon="⏱" label="尺" value={`${stats.totalDurationSec}秒 / ${stats.targetDurationSec}秒`} />
      </div>

      {/* Row 2: Asset/prompt stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <StatCard icon="📦" label="不足素材" value={stats.missingAssets} accent="text-orange-600" />
        <StatCard icon="🔗" label="未紐付素材" value={stats.unlinkedAssets} accent="text-amber-600" />
        <StatCard icon="📝" label="未紐付プロンプト" value={stats.unlinkedPrompts} accent="text-amber-600" />
        <StatCard icon="🤖" label="AI動画予定" value={stats.aiVideoPlanned} accent="text-indigo-600" />
        <StatCard icon="✂" label="CapCut準備済" value={stats.capcutReady} accent="text-teal-600" />
      </div>

      {/* Urgent tasks */}
      {stats.urgentTasks.length > 0 && (
        <SectionCard title="優先タスク" className="mb-8">
          <ul className="space-y-3">
            {stats.urgentTasks.map((t) => (
              <li key={t.taskId} className="flex items-start gap-3">
                <Badge label={taskPriorityLabel[t.priority]} colorClass={taskPriorityColor[t.priority]} />
                <Badge label={taskStatusLabel[t.status]} colorClass={taskStatusColor[t.status]} />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-navy-800 dark:text-sand-100">{t.title}</p>
                  {t.notes && <p className="text-xs text-navy-400 mt-0.5 truncate dark:text-navy-300">{t.notes}</p>}
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
      )}

      {/* Blocked scenes */}
      {stats.blockedScenes.length > 0 && (
        <SectionCard title="詰まっているシーン" className="mb-8">
          <div className="space-y-3">
            {stats.blockedScenes.map((s) => (
              <div key={s.sceneId} className="flex items-center gap-3 p-3 rounded-lg bg-red-50 border border-red-100 dark:bg-red-900/20 dark:border-red-800">
                <Badge label={sceneStatusLabel[s.status]} colorClass={sceneStatusColor[s.status]} />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-navy-800 dark:text-sand-100">{s.title}</p>
                  <p className="text-xs text-navy-400 font-mono dark:text-navy-300">{s.sceneId} &middot; {s.durationSec}秒</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* Per-movie progress (all movies, not filtered) */}
      <SectionCard title="ムービー別進捗" className="mb-8">
        <div className="flex justify-end mb-4">
          <button onClick={() => setShowAddMovie(true)} className="px-3 py-1.5 text-xs rounded-lg bg-navy-700 text-white hover:bg-navy-800">
            + ムービー追加
          </button>
        </div>
        <div className="space-y-4">
          {data.movies.map((movie) => {
            const mScenes = data.scenes.filter((s) => s.movieId === movie.movieId);
            const mDone = mScenes.filter((s) => s.status === "done").length;
            const mTotal = mScenes.length;
            const pct = mTotal > 0 ? Math.round((mDone / mTotal) * 100) : 0;

            return (
              <div key={movie.movieId} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-navy-800 dark:text-sand-100">{movie.title}</span>
                    <span className="text-xs text-navy-400 dark:text-navy-300">{movieTypeLabel[movie.type]}</span>
                    <Badge label={movieStatusLabel[movie.status]} colorClass={movieStatusColor[movie.status]} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-navy-500 dark:text-navy-300">{mDone}/{mTotal} シーン完了 ({pct}%)</span>
                    <button onClick={() => setEditMovie(movie)} className="text-xs text-navy-400 hover:text-navy-700" title="編集">✏️</button>
                    <button onClick={() => setDeleteMovieId(movie.movieId)} className="text-xs text-red-400 hover:text-red-600" title="削除">🗑</button>
                  </div>
                </div>
                <div className="w-full bg-sand-100 dark:bg-navy-700 rounded-full h-2">
                  <div className="bg-navy-600 dark:bg-navy-400 h-2 rounded-full transition-all" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </SectionCard>

      {/* Scene progress cards */}
      <SectionCard title="シーン進捗">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {movieScenes.map((scene) => (
            <div key={scene.sceneId} className="border border-sand-200 dark:border-navy-600 rounded-lg p-4 hover:shadow-md transition-shadow dark:bg-navy-800/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-navy-400 dark:text-navy-300">{scene.sceneId}</span>
                <Badge label={sceneStatusLabel[scene.status]} colorClass={sceneStatusColor[scene.status]} />
              </div>
              <h3 className="font-semibold text-navy-800 dark:text-sand-100 mb-1">{scene.title}</h3>
              <p className="text-xs text-navy-500 dark:text-navy-300 mb-2 line-clamp-2">{scene.purpose}</p>
              <div className="flex items-center justify-between text-xs text-navy-400 dark:text-navy-300">
                <span>{scene.durationSec}秒</span>
                <span>素材 {scene.assets.length}件</span>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Add movie modal */}
      <Modal open={showAddMovie} onClose={() => setShowAddMovie(false)} title="ムービー追加" wide>
        <MovieForm onSave={(m) => { addMovie(m); setShowAddMovie(false); addToast("ムービーを追加しました", "success"); }} onCancel={() => setShowAddMovie(false)} />
      </Modal>

      {/* Edit movie modal */}
      <Modal open={!!editMovie} onClose={() => setEditMovie(null)} title="ムービー編集" wide>
        {editMovie && <MovieForm movie={editMovie} onSave={(m) => { updateMovie(m); setEditMovie(null); addToast("ムービーを更新しました", "success"); }} onCancel={() => setEditMovie(null)} />}
      </Modal>

      {/* Delete movie confirm */}
      <ConfirmDialog
        open={!!deleteMovieId}
        title="ムービー削除"
        message="このムービーに紐付くシーン、タスクも削除されます。本当に削除しますか？"
        onConfirm={() => { if (deleteMovieId) deleteMovie(deleteMovieId); setDeleteMovieId(null); addToast("ムービーを削除しました", "info"); }}
        onCancel={() => setDeleteMovieId(null)}
        danger
      />
    </div>
  );
}
