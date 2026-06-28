import { useState } from "react";
import { Header } from "../components/Header";
import { Badge } from "../components/Badge";
import { Modal } from "../components/Modal";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { TaskForm } from "../components/forms/TaskForm";
import {
  taskPriorityLabel, taskPriorityColor,
  taskStatusLabel, taskStatusColor,
  taskCategoryLabel, taskCategoryColor,
} from "../lib/labels";
import { useProduction } from "../store/productionStore";
import type { Task, TaskCategory, TaskStatus } from "../types/movie";

const priorityOrder = { high: 0, medium: 1, low: 2 } as const;

export function MissingList() {
  const {
    selectedMovieId,
    movieTasks,
    data,
    addTask,
    updateTask,
    deleteTask,
    duplicateTask,
  } = useProduction();

  const [filterCategory, setFilterCategory] = useState<TaskCategory | "all">("all");
  const [filterStatus, setFilterStatus] = useState<TaskStatus | "all">("all");
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDone, setShowDone] = useState(false);

  const tasks = selectedMovieId === "all" ? data.tasks : movieTasks;
  const activeTasks = tasks
    .filter((t) => t.status !== "done" && t.status !== "dropped")
    .filter((t) => filterCategory === "all" || t.category === filterCategory)
    .filter((t) => filterStatus === "all" || t.status === filterStatus)
    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  const doneTasks = tasks.filter((t) => t.status === "done" || t.status === "dropped");

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div>
      <Header title="不足・未確定リスト" description="不足素材・未確定事項の一覧" showMovieSelector />

      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setFilterCategory("all")}
            className={`px-3 py-1.5 text-xs rounded-full font-medium ${filterCategory === "all" ? "bg-navy-700 text-white" : "bg-sand-100 text-navy-600 hover:bg-sand-200"}`}>
            すべて ({tasks.filter((t) => t.status !== "done" && t.status !== "dropped").length})
          </button>
          {(Object.keys(taskCategoryLabel) as TaskCategory[]).map((c) => {
            const count = tasks.filter((t) => t.category === c && t.status !== "done" && t.status !== "dropped").length;
            if (count === 0) return null;
            return (
              <button key={c} onClick={() => setFilterCategory(c)}
                className={`px-3 py-1.5 text-xs rounded-full font-medium ${filterCategory === c ? "bg-navy-700 text-white" : "bg-sand-100 text-navy-600 hover:bg-sand-200"}`}>
                {taskCategoryLabel[c]} ({count})
              </button>
            );
          })}
        </div>
        <button onClick={() => setShowAdd(true)} className="px-4 py-2 text-sm rounded-lg bg-navy-700 text-white hover:bg-navy-800 shrink-0">
          + タスク追加
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <span className="text-xs text-navy-400 self-center mr-1">状態:</span>
        {(["todo", "in_progress", "waiting", "blocked"] as TaskStatus[]).map((s) => (
          <button key={s} onClick={() => setFilterStatus(filterStatus === s ? "all" : s)}
            className={`px-2 py-1 text-xs rounded font-medium ${filterStatus === s ? "bg-navy-600 text-white" : "bg-sand-50 text-navy-500 hover:bg-sand-100"}`}>
            {taskStatusLabel[s]}
          </button>
        ))}
      </div>

      <div className="space-y-3 mb-10">
        {activeTasks.map((task) => (
          <div key={task.taskId}
            className={`bg-white rounded-lg border shadow-sm p-4 flex items-start gap-4 ${
              task.priority === "high" ? "border-red-200" : task.priority === "medium" ? "border-amber-200" : "border-sand-200"
            }`}>
            <div className="flex flex-col gap-1.5 items-center shrink-0 pt-0.5">
              <Badge label={taskPriorityLabel[task.priority]} colorClass={taskPriorityColor[task.priority]} />
              <Badge label={taskStatusLabel[task.status]} colorClass={taskStatusColor[task.status]} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs text-navy-400">{task.taskId}</span>
                {task.relatedSceneId && (
                  <span className="text-xs bg-navy-50 text-navy-500 px-1.5 py-0.5 rounded font-mono">{task.relatedSceneId}</span>
                )}
                <Badge label={taskCategoryLabel[task.category]} colorClass={taskCategoryColor[task.category]} />
              </div>
              <h3 className="font-semibold text-navy-800">{task.title}</h3>
              {task.notes && <p className="text-sm text-navy-500 mt-1">{task.notes}</p>}
              {task.due && (
                <p className={`text-xs mt-1 ${task.due < today ? "text-red-600 font-semibold" : "text-navy-400"}`}>
                  期限: {task.due} {task.due < today && "(期限超過)"}
                </p>
              )}
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button onClick={() => setEditTask(task)} className="text-xs text-navy-400 hover:text-navy-700" title="編集">✏️</button>
              <button onClick={() => duplicateTask(task.taskId)} className="text-xs text-navy-400 hover:text-navy-700" title="複製">📋</button>
              <button onClick={() => {
                updateTask({ ...task, status: "done" });
              }} className="text-xs text-emerald-400 hover:text-emerald-600" title="完了にする">✅</button>
              <button onClick={() => setDeleteId(task.taskId)} className="text-xs text-red-400 hover:text-red-600" title="削除">🗑</button>
            </div>
          </div>
        ))}
        {activeTasks.length === 0 && <p className="text-sm text-navy-400 text-center py-8">該当するタスクがありません</p>}
      </div>

      {doneTasks.length > 0 && (
        <div>
          <button onClick={() => setShowDone(!showDone)} className="flex items-center gap-2 text-lg font-bold text-navy-800 mb-4">
            完了済み ({doneTasks.length})
            <span className="text-sm text-navy-400">{showDone ? "▲" : "▼"}</span>
          </button>
          {showDone && (
            <div className="space-y-2">
              {doneTasks.map((task) => (
                <div key={task.taskId} className="bg-sand-50 rounded-lg border border-sand-200 p-3 flex items-center gap-3 opacity-60">
                  <Badge label={taskStatusLabel[task.status]} colorClass={taskStatusColor[task.status]} />
                  <span className="text-sm text-navy-600 line-through flex-1">{task.title}</span>
                  <button onClick={() => updateTask({ ...task, status: "todo" })} className="text-xs text-navy-400 hover:text-navy-600">戻す</button>
                  <button onClick={() => setDeleteId(task.taskId)} className="text-xs text-red-400 hover:text-red-600">🗑</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="タスク追加" wide>
        <TaskForm movieId={selectedMovieId === "all" ? "" : selectedMovieId} onSave={(t) => { addTask(t); setShowAdd(false); }} onCancel={() => setShowAdd(false)} />
      </Modal>

      <Modal open={!!editTask} onClose={() => setEditTask(null)} title="タスク編集" wide>
        {editTask && <TaskForm task={editTask} movieId={editTask.movieId} onSave={(t) => { updateTask(t); setEditTask(null); }} onCancel={() => setEditTask(null)} />}
      </Modal>

      <ConfirmDialog
        open={!!deleteId}
        title="タスク削除"
        message="このタスクを削除しますか？"
        onConfirm={() => { if (deleteId) deleteTask(deleteId); setDeleteId(null); }}
        onCancel={() => setDeleteId(null)}
        danger
      />
    </div>
  );
}
