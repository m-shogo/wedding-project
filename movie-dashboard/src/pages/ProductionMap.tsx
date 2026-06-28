import { Header } from "../components/Header";
import { Badge } from "../components/Badge";
import { SectionCard } from "../components/SectionCard";
import {
  sceneStatusLabel, sceneStatusColor,
  assetStatusLabel, assetStatusColor,
  taskStatusLabel, taskStatusColor,
  taskPriorityColor, taskPriorityLabel,
  movieStatusLabel, movieStatusColor,
  movieTypeLabel,
} from "../lib/labels";
import { useProduction } from "../store/productionStore";

export function ProductionMap() {
  const { data } = useProduction();

  return (
    <div>
      <Header title="Production Map" description="制作全体の依存関係と進捗マップ" />

      {/* Movie overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {data.movies.map((movie) => {
          const scenes = data.scenes.filter((s) => s.movieId === movie.movieId);
          const assets = data.assets.filter((a) => a.relatedMovieIds.includes(movie.movieId));
          const tasks = data.tasks.filter((t) => t.movieId === movie.movieId);
          const doneScenes = scenes.filter((s) => s.status === "done").length;
          const doneTasks = tasks.filter((t) => t.status === "done" || t.status === "dropped").length;
          const blockedTasks = tasks.filter((t) => t.status === "blocked").length;
          const missingAssets = assets.filter((a) => a.status === "needed" || a.status === "idea").length;
          const totalDuration = scenes.reduce((s, sc) => s + sc.durationSec, 0);

          return (
            <SectionCard key={movie.movieId} title={movie.title} className="relative">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs text-navy-400">{movieTypeLabel[movie.type]}</span>
                <Badge label={movieStatusLabel[movie.status]} colorClass={movieStatusColor[movie.status]} />
                <span className="text-xs text-navy-400 ml-auto">{totalDuration}秒 / {movie.targetDurationSec}秒</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                <div className="bg-sand-50 rounded p-2">
                  <p className="text-xs text-navy-400">シーン</p>
                  <p className="font-bold text-navy-800">{doneScenes}/{scenes.length}</p>
                </div>
                <div className="bg-sand-50 rounded p-2">
                  <p className="text-xs text-navy-400">タスク</p>
                  <p className="font-bold text-navy-800">{doneTasks}/{tasks.length}</p>
                </div>
                <div className="bg-sand-50 rounded p-2">
                  <p className="text-xs text-navy-400">不足素材</p>
                  <p className={`font-bold ${missingAssets > 0 ? "text-red-600" : "text-emerald-600"}`}>{missingAssets}</p>
                </div>
                <div className="bg-sand-50 rounded p-2">
                  <p className="text-xs text-navy-400">ブロック</p>
                  <p className={`font-bold ${blockedTasks > 0 ? "text-red-600" : "text-emerald-600"}`}>{blockedTasks}</p>
                </div>
              </div>

              {/* Scene flow */}
              <div className="flex gap-1 h-6 rounded overflow-hidden">
                {scenes.map((s) => {
                  const pct = totalDuration > 0 ? (s.durationSec / totalDuration) * 100 : 0;
                  const colorMap: Record<string, string> = {
                    not_started: "bg-gray-300", collecting: "bg-amber-400", generating: "bg-blue-400",
                    editing: "bg-purple-400", review: "bg-orange-400", done: "bg-emerald-400",
                  };
                  return (
                    <div key={s.sceneId}
                      className={`${colorMap[s.status] ?? "bg-gray-300"}`}
                      style={{ width: `${pct}%` }}
                      title={`${s.title} (${sceneStatusLabel[s.status]})`} />
                  );
                })}
              </div>
            </SectionCard>
          );
        })}
      </div>

      {/* Per-scene dependency table */}
      <SectionCard title="シーン別 依存状況" className="mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-navy-50 text-left">
                <th className="px-3 py-2 text-xs font-semibold text-navy-500">シーン</th>
                <th className="px-3 py-2 text-xs font-semibold text-navy-500">ステータス</th>
                <th className="px-3 py-2 text-xs font-semibold text-navy-500">尺</th>
                <th className="px-3 py-2 text-xs font-semibold text-navy-500">素材</th>
                <th className="px-3 py-2 text-xs font-semibold text-navy-500">不足</th>
                <th className="px-3 py-2 text-xs font-semibold text-navy-500">タスク</th>
                <th className="px-3 py-2 text-xs font-semibold text-navy-500">ブロック</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-100">
              {data.scenes.map((scene) => {
                const sceneAssets = data.assets.filter((a) => scene.assets.includes(a.assetId));
                const missing = sceneAssets.filter((a) => a.status === "needed" || a.status === "idea");
                const sceneTasks = data.tasks.filter((t) => t.relatedSceneId === scene.sceneId);
                const blocked = sceneTasks.filter((t) => t.status === "blocked");
                return (
                  <tr key={scene.sceneId} className="hover:bg-sand-50">
                    <td className="px-3 py-2">
                      <span className="font-mono text-xs text-navy-400 mr-2">{scene.sceneId}</span>
                      <span className="text-navy-700">{scene.title}</span>
                    </td>
                    <td className="px-3 py-2">
                      <Badge label={sceneStatusLabel[scene.status]} colorClass={sceneStatusColor[scene.status]} />
                    </td>
                    <td className="px-3 py-2 text-navy-600">{scene.durationSec}秒</td>
                    <td className="px-3 py-2">
                      <div className="flex flex-wrap gap-1">
                        {sceneAssets.map((a) => (
                          <span key={a.assetId} className={`text-xs px-1.5 py-0.5 rounded ${assetStatusColor[a.status]}`} title={a.title}>
                            {assetStatusLabel[a.status]}
                          </span>
                        ))}
                        {sceneAssets.length === 0 && <span className="text-xs text-navy-300">—</span>}
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      {missing.length > 0 ? (
                        <span className="text-xs text-red-600 font-semibold">{missing.length}件</span>
                      ) : (
                        <span className="text-xs text-emerald-600">OK</span>
                      )}
                    </td>
                    <td className="px-3 py-2 text-navy-600 text-xs">{sceneTasks.length}</td>
                    <td className="px-3 py-2">
                      {blocked.length > 0 ? (
                        <span className="text-xs text-red-600 font-semibold">{blocked.length}件</span>
                      ) : (
                        <span className="text-xs text-navy-300">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {/* Urgent/blocked tasks */}
      {(() => {
        const urgent = data.tasks.filter((t) => (t.priority === "high" || t.status === "blocked") && t.status !== "done" && t.status !== "dropped");
        if (urgent.length === 0) return null;
        return (
          <SectionCard title="要対応タスク">
            <div className="space-y-2">
              {urgent.map((t) => (
                <div key={t.taskId} className="flex items-center gap-3 p-3 rounded-lg bg-sand-50 border border-sand-200">
                  <Badge label={taskPriorityLabel[t.priority]} colorClass={taskPriorityColor[t.priority]} />
                  <Badge label={taskStatusLabel[t.status]} colorClass={taskStatusColor[t.status]} />
                  <span className="text-sm text-navy-700 flex-1">{t.title}</span>
                  {t.relatedSceneId && <span className="text-xs font-mono text-navy-400">{t.relatedSceneId}</span>}
                </div>
              ))}
            </div>
          </SectionCard>
        );
      })()}
    </div>
  );
}
