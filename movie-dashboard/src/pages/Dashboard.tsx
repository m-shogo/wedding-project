import { useState } from "react";
import { Link } from "react-router-dom";
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

  const aiVideoPrompts = (currentMovie ? moviePrompts : data.prompts).filter((prompt) => prompt.target === "video");
  const aiDraft = aiVideoPrompts.filter((prompt) => prompt.status === "draft").length;
  const aiWaitingResult = aiVideoPrompts.filter((prompt) => prompt.status === "testing" && prompt.resultAssetIds.length === 0).length;
  const aiReviewReady = aiVideoPrompts.filter((prompt) => prompt.status === "testing" && prompt.resultAssetIds.length > 0).length;
  const aiAdopted = aiVideoPrompts.filter((prompt) => prompt.status === "adopted").length;
  const aiRejected = aiVideoPrompts.filter((prompt) => prompt.status === "rejected").length;

  const aiNextAction = aiReviewReady > 0
    ? { label: `レビュー待ち ${aiReviewReady}件をQAする`, to: "/video-result-review", cta: "結果レビューを開く" }
    : aiDraft > 0
      ? { label: `下書き ${aiDraft}件をモデル別に生成する`, to: "/video-generation-queue", cta: "生成キューを開く" }
      : aiWaitingResult > 0
        ? { label: `結果待ち ${aiWaitingResult}件。生成結果をAssetへ登録する`, to: "/video-generation-queue", cta: "生成キューを確認" }
        : aiRejected > 0
          ? { label: `不採用 ${aiRejected}件。理由からretryまたはショット見直し`, to: "/video-result-review", cta: "不採用を確認" }
          : aiVideoPrompts.length === 0
            ? { label: "AI動画Promptがまだありません。シーンとプリセットから作成する", to: "/video-prompt-builder", cta: "動画Promptを作る" }
            : { label: `採用済み ${aiAdopted}件。CapCut実尺へ進める`, to: "/capcut", cta: "CapCut Packを開く" };

  return (
    <div>
      <Header title="ダッシュボード" description="ムービー制作の全体状況" showMovieSelector />

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
        <StatCard icon="🎞" label="全シーン" value={stats.totalScenes} />
        <StatCard icon="✅" label="完了" value={stats.doneScenes} accent="text-emerald-600" />
        <StatCard icon="🔧" label="制作中" value={stats.inProgressScenes} accent="text-blue-600" />
        <StatCard icon="📊" label="進捗" value={`${stats.progressPercent}%`} accent="text-indigo-600" />
        <StatCard icon="⏱" label="尺" value={`${stats.totalDurationSec}秒 / ${stats.targetDurationSec}秒`} />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
        <StatCard icon="📦" label="不足素材" value={stats.missingAssets} accent="text-orange-600" />
        <StatCard icon="🔗" label="未紐付素材" value={stats.unlinkedAssets} accent="text-amber-600" />
        <StatCard icon="📝" label="未紐付プロンプト" value={stats.unlinkedPrompts} accent="text-amber-600" />
        <StatCard icon="🤖" label="AI動画予定" value={stats.aiVideoPlanned} accent="text-indigo-600" />
        <StatCard icon="✂" label="CapCut準備済" value={stats.capcutReady} accent="text-teal-600" />
      </div>

      {stats.photoSlotsTotal > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <StatCard icon="📷" label="写真スロット" value={stats.photoSlotsTotal} />
          <StatCard icon="✅" label="写真選定済" value={stats.photoSelected} accent="text-emerald-600" />
          <StatCard icon="📸" label="写真不足" value={stats.photoMissing} accent={stats.photoMissing > 0 ? "text-red-600" : "text-emerald-600"} />
          <StatCard icon="📋" label="必要枚数" value={stats.photoRequired} />
          <StatCard icon="💬" label="コメント率" value={`${stats.photoCommentRate}%`} accent="text-sky-600" />
        </div>
      )}

      <div className="mb-4 p-3 bg-sand-50 dark:bg-navy-700 rounded-lg flex items-center justify-between">
        <p className="text-xs text-navy-500 dark:text-navy-300">💡 素材本体はGitに入れません。写真・動画・音源は推奨フォルダに保存し、Asset Libraryにはパスだけ登録します。</p>
        <Link to="/asset-placement-guide" className="text-xs text-navy-600 dark:text-navy-200 hover:underline shrink-0 ml-3">素材置き場ガイドを見る →</Link>
      </div>

      <SectionCard title="AI動画パイプライン" className="mb-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
          {[
            ["1", "Prompt下書き", aiDraft, "/video-prompt-builder"],
            ["2", "生成・結果待ち", aiWaitingResult, "/video-generation-queue"],
            ["3", "レビュー待ち", aiReviewReady, "/video-result-review"],
            ["4", "採用", aiAdopted, "/video-result-review"],
            ["×", "不採用", aiRejected, "/video-result-review"],
          ].map(([step, label, value, to]) => (
            <Link key={String(label)} to={String(to)} className="rounded-lg border border-sand-200 dark:border-navy-600 p-3 hover:bg-sand-50 dark:hover:bg-navy-700 transition">
              <div className="flex items-center justify-between"><span className="text-[11px] font-mono text-navy-400">STEP {step}</span><span className="text-lg font-bold text-navy-800 dark:text-sand-100">{value}</span></div>
              <p className="mt-1 text-xs text-navy-600 dark:text-navy-200">{label}</p>
            </Link>
          ))}
        </div>
        <div className="rounded-lg bg-navy-50 dark:bg-navy-700 p-4 flex flex-wrap items-center gap-3">
          <div className="min-w-0 flex-1"><p className="text-[11px] font-semibold tracking-wider text-navy-400">NEXT ACTION</p><p className="mt-1 text-sm font-medium text-navy-800 dark:text-sand-100">{aiNextAction.label}</p></div>
          <Link to={aiNextAction.to} className="px-3 py-2 text-xs rounded-lg bg-navy-700 dark:bg-navy-500 text-white hover:bg-navy-800">{aiNextAction.cta} →</Link>
        </div>
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          <Link to="/video-prompt-builder" className="px-2.5 py-1.5 rounded border border-sand-200 dark:border-navy-600 text-navy-500 dark:text-navy-300">① Prompt・プリセット</Link>
          <Link to="/video-generation-queue" className="px-2.5 py-1.5 rounded border border-sand-200 dark:border-navy-600 text-navy-500 dark:text-navy-300">② モデル別生成キュー</Link>
          <Link to="/video-result-review" className="px-2.5 py-1.5 rounded border border-sand-200 dark:border-navy-600 text-navy-500 dark:text-navy-300">③ QA・retry</Link>
          <Link to="/capcut" className="px-2.5 py-1.5 rounded border border-sand-200 dark:border-navy-600 text-navy-500 dark:text-navy-300">④ CapCut実尺</Link>
        </div>
      </SectionCard>

      {stats.urgentTasks.length > 0 && (
        <SectionCard title="優先タスク" className="mb-8">
          <ul className="space-y-3">{stats.urgentTasks.map((t) => <li key={t.taskId} className="flex items-start gap-3"><Badge label={taskPriorityLabel[t.priority]} colorClass={taskPriorityColor[t.priority]} /><Badge label={taskStatusLabel[t.status]} colorClass={taskStatusColor[t.status]} /><div className="min-w-0"><p className="text-sm font-medium text-navy-800 dark:text-sand-100">{t.title}</p>{t.notes && <p className="text-xs text-navy-400 mt-0.5 truncate dark:text-navy-300">{t.notes}</p>}</div></li>)}</ul>
        </SectionCard>
      )}

      {stats.blockedScenes.length > 0 && (
        <SectionCard title="詰まっているシーン" className="mb-8"><div className="space-y-3">{stats.blockedScenes.map((s) => <div key={s.sceneId} className="flex items-center gap-3 p-3 rounded-lg bg-red-50 border border-red-100 dark:bg-red-900/20 dark:border-red-800"><Badge label={sceneStatusLabel[s.status]} colorClass={sceneStatusColor[s.status]} /><div className="min-w-0"><p className="text-sm font-medium text-navy-800 dark:text-sand-100">{s.title}</p><p className="text-xs text-navy-400 font-mono dark:text-navy-300">{s.sceneId} &middot; {s.durationSec}秒</p></div></div>)}</div></SectionCard>
      )}

      <SectionCard title="ムービー別進捗" className="mb-8">
        <div className="flex justify-end mb-4"><button onClick={() => setShowAddMovie(true)} className="px-3 py-1.5 text-xs rounded-lg bg-navy-700 text-white hover:bg-navy-800">+ ムービー追加</button></div>
        <div className="space-y-4">{data.movies.map((movie) => {
          const mScenes = data.scenes.filter((s) => s.movieId === movie.movieId); const mDone = mScenes.filter((s) => s.status === "done").length; const mTotal = mScenes.length; const pct = mTotal > 0 ? Math.round((mDone / mTotal) * 100) : 0;
          return <div key={movie.movieId} className="space-y-1.5"><div className="flex items-center justify-between"><div className="flex items-center gap-2"><span className="text-sm font-medium text-navy-800 dark:text-sand-100">{movie.title}</span><span className="text-xs text-navy-400 dark:text-navy-300">{movieTypeLabel[movie.type]}</span><Badge label={movieStatusLabel[movie.status]} colorClass={movieStatusColor[movie.status]} /></div><div className="flex items-center gap-2"><span className="text-xs text-navy-500 dark:text-navy-300">{mDone}/{mTotal} シーン完了 ({pct}%)</span><button onClick={() => setEditMovie(movie)} className="text-xs text-navy-400 hover:text-navy-700" title="編集">✏️</button><button onClick={() => setDeleteMovieId(movie.movieId)} className="text-xs text-red-400 hover:text-red-600" title="削除">🗑</button></div></div><div className="w-full bg-sand-100 dark:bg-navy-700 rounded-full h-2"><div className="bg-navy-600 dark:bg-navy-400 h-2 rounded-full transition-all" style={{ width: `${pct}%` }} /></div></div>;
        })}</div>
      </SectionCard>

      <SectionCard title="シーン進捗"><div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">{movieScenes.map((scene) => <div key={scene.sceneId} className="border border-sand-200 dark:border-navy-600 rounded-lg p-4 hover:shadow-md transition-shadow dark:bg-navy-800/50"><div className="flex items-center justify-between mb-2"><span className="text-xs font-mono text-navy-400 dark:text-navy-300">{scene.sceneId}</span><Badge label={sceneStatusLabel[scene.status]} colorClass={sceneStatusColor[scene.status]} /></div><h3 className="font-semibold text-navy-800 dark:text-sand-100 mb-1">{scene.title}</h3><p className="text-xs text-navy-500 dark:text-navy-300 mb-2 line-clamp-2">{scene.purpose}</p><div className="flex items-center justify-between text-xs text-navy-400 dark:text-navy-300"><span>{scene.durationSec}秒</span><span>素材 {scene.assets.length}件</span></div></div>)}</div></SectionCard>

      <Modal open={showAddMovie} onClose={() => setShowAddMovie(false)} title="ムービー追加" wide><MovieForm onSave={(m) => { addMovie(m); setShowAddMovie(false); addToast("ムービーを追加しました", "success"); }} onCancel={() => setShowAddMovie(false)} /></Modal>
      <Modal open={!!editMovie} onClose={() => setEditMovie(null)} title="ムービー編集" wide>{editMovie && <MovieForm movie={editMovie} onSave={(m) => { updateMovie(m); setEditMovie(null); addToast("ムービーを更新しました", "success"); }} onCancel={() => setEditMovie(null)} />}</Modal>
      <ConfirmDialog open={!!deleteMovieId} title="ムービー削除" message="このムービーに紐付くシーン、タスクも削除されます。本当に削除しますか？" onConfirm={() => { if (deleteMovieId) deleteMovie(deleteMovieId); setDeleteMovieId(null); addToast("ムービーを削除しました", "info"); }} onCancel={() => setDeleteMovieId(null)} danger />
    </div>
  );
}
