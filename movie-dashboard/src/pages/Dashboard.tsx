import { Header } from "../components/Header";
import { StatCard } from "../components/StatCard";
import { SectionCard } from "../components/SectionCard";
import { Badge } from "../components/Badge";
import { computeStats } from "../lib/dashboard";
import { sceneStatusLabel, sceneStatusColor, taskPriorityLabel, taskPriorityColor } from "../lib/labels";
import scenes from "../data/scenes.json";
import assets from "../data/assets.json";
import tasks from "../data/tasks.json";
import type { Scene, Asset, Task } from "../types/movie";

const typedScenes = scenes as Scene[];
const typedAssets = assets as Asset[];
const typedTasks = tasks as Task[];

export function Dashboard() {
  const stats = computeStats(typedScenes, typedAssets, typedTasks);

  return (
    <div>
      <Header
        title="Dashboard"
        description="オープニングムービー制作の全体状況"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon="🎞" label="全シーン" value={stats.totalScenes} />
        <StatCard icon="✅" label="完了" value={stats.doneScenes} accent="text-emerald-600" />
        <StatCard icon="🔧" label="制作中" value={stats.inProgressScenes} accent="text-blue-600" />
        <StatCard
          icon="⏱"
          label="合計尺"
          value={`${Math.floor(stats.totalDurationSec / 60)}:${String(stats.totalDurationSec % 60).padStart(2, "0")}`}
        />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon="📦" label="不足素材" value={stats.missingAssets} accent="text-orange-600" />
        <StatCard icon="👁" label="要確認" value={stats.needsReviewAssets} accent="text-amber-600" />
        <StatCard icon="🤖" label="AI動画予定" value={stats.aiVideoPlanned} accent="text-indigo-600" />
        <StatCard icon="✂" label="CapCut素材" value={stats.capcutReady} accent="text-teal-600" />
      </div>

      {stats.urgentTasks.length > 0 && (
        <SectionCard title="優先タスク" className="mb-8">
          <ul className="space-y-3">
            {stats.urgentTasks.map((t) => (
              <li key={t.taskId} className="flex items-start gap-3">
                <Badge
                  label={taskPriorityLabel[t.priority]}
                  colorClass={taskPriorityColor[t.priority]}
                />
                <div>
                  <p className="text-sm font-medium text-navy-800">{t.title}</p>
                  {t.notes && (
                    <p className="text-xs text-navy-400 mt-0.5">{t.notes}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
      )}

      <SectionCard title="シーン進捗">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {typedScenes.map((scene) => (
            <div
              key={scene.sceneId}
              className="border border-sand-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-navy-400">
                  {scene.sceneId}
                </span>
                <Badge
                  label={sceneStatusLabel[scene.status]}
                  colorClass={sceneStatusColor[scene.status]}
                />
              </div>
              <h3 className="font-semibold text-navy-800 mb-1">{scene.title}</h3>
              <p className="text-xs text-navy-500 mb-2">{scene.purpose}</p>
              <div className="flex items-center justify-between text-xs text-navy-400">
                <span>{scene.durationSec}秒</span>
                <span>素材 {scene.assets.length}件</span>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
