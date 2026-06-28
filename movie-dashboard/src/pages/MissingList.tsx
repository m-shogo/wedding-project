import { Header } from "../components/Header";
import { Badge } from "../components/Badge";
import {
  taskPriorityLabel,
  taskPriorityColor,
  taskStatusLabel,
  taskStatusColor,
} from "../lib/labels";
import tasks from "../data/tasks.json";
import type { Task } from "../types/movie";

const typedTasks = tasks as Task[];

const priorityOrder = { high: 0, medium: 1, low: 2 } as const;

export function MissingList() {
  const sorted = [...typedTasks]
    .filter((t) => t.status !== "done")
    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  const doneTasks = typedTasks.filter((t) => t.status === "done");

  return (
    <div>
      <Header
        title="Missing List"
        description="不足素材・未確定事項の一覧 — 今日やるべきことが分かる"
      />

      <div className="space-y-3 mb-10">
        {sorted.map((task) => (
          <div
            key={task.taskId}
            className={`bg-white rounded-lg border shadow-sm p-4 flex items-start gap-4 ${
              task.priority === "high"
                ? "border-red-200"
                : task.priority === "medium"
                  ? "border-amber-200"
                  : "border-sand-200"
            }`}
          >
            <div className="flex flex-col gap-1.5 items-center shrink-0 pt-0.5">
              <Badge
                label={taskPriorityLabel[task.priority]}
                colorClass={taskPriorityColor[task.priority]}
              />
              <Badge
                label={taskStatusLabel[task.status]}
                colorClass={taskStatusColor[task.status]}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs text-navy-400">
                  {task.taskId}
                </span>
                {task.relatedSceneId && (
                  <span className="text-xs bg-navy-50 text-navy-500 px-1.5 py-0.5 rounded font-mono">
                    {task.relatedSceneId}
                  </span>
                )}
                {task.category && (
                  <span className="text-xs bg-gold-100 text-gold-700 px-1.5 py-0.5 rounded">
                    {task.category}
                  </span>
                )}
              </div>
              <h3 className="font-semibold text-navy-800">{task.title}</h3>
              {task.notes && (
                <p className="text-sm text-navy-500 mt-1">{task.notes}</p>
              )}
              {task.due && (
                <p className="text-xs text-navy-400 mt-1">期限: {task.due}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {doneTasks.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-navy-800 mb-4">完了済み</h2>
          <div className="space-y-2">
            {doneTasks.map((task) => (
              <div
                key={task.taskId}
                className="bg-sand-50 rounded-lg border border-sand-200 p-3 flex items-center gap-3 opacity-60"
              >
                <Badge
                  label={taskStatusLabel[task.status]}
                  colorClass={taskStatusColor[task.status]}
                />
                <span className="text-sm text-navy-600 line-through">
                  {task.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
