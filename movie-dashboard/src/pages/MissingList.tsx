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
import { useToast } from "../store/toastStore";
import type { Task, TaskCategory, TaskStatus } from "../types/movie";

const priorityOrder = { high: 0, medium: 1, low: 2 } as const;
const activeStatuses: TaskStatus[] = ["todo", "in_progress", "waiting", "blocked"];

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
  const { addToast } = useToast();

  const [filterCategory, setFilterCategory] = useState<TaskCategory | "all">("all");
  const [filterStatus, setFilterStatus] = useState<TaskStatus | "all">("all");
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDone, setShowDone] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkStatus, setBulkStatus] = useState<TaskStatus>("done");
  const [bulkDeleteConfirm, setBulkDeleteConfirm] = useState(false);

  const tasks = selectedMovieId === "all" ? data.tasks : movieTasks;
  const activeTasks = tasks
    .filter((t) => t.status !== "done" && t.status !== "dropped")
    .filter((t) => filterCategory === "all" || t.category === filterCategory)
    .filter((t) => filterStatus === "all" || t.status === filterStatus)
    .filter((t) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return [t.title, t.notes].some((f) => f.toLowerCase().includes(q));
    })
    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  const doneTasks = tasks.filter((t) => t.status === "done" || t.status === "dropped");

  const today = new Date().toISOString().slice(0, 10);

  function toggleSelect(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    if (selectedIds.size === activeTasks.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(activeTasks.map((t) => t.taskId)));
    }
  }

  function applyBulkStatus() {
    for (const id of selectedIds) {
      const task = data.tasks.find((t) => t.taskId === id);
      if (task) updateTask({ ...task, status: bulkStatus });
    }
    addToast(`${selectedIds.size}件のステータスを変更しました`, "success");
    setSelectedIds(new Set());
  }

  function doBulkDelete() {
    for (const id of selectedIds) deleteTask(id);
    addToast(`${selectedIds.size}件を削除しました`, "info");
    setSelectedIds(new Set());
    setBulkDeleteConfirm(false);
  }

  return (
    <div>
      <Header title="不足・未確定リスト" description="不足素材・未確定事項・作業タスクを優先度付きで管理します" showMovieSelector />

      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setFilterCategory("all")}
            className={`px-3 py-1.5 text-xs rounded-full font-medium ${filterCategory === "all" ? "bg-navy-700 text-white" : "bg-sand-100 dark:bg-navy-700 text-navy-600 dark:text-navy-300 hover:bg-sand-200 dark:hover:bg-navy-600"}`}>
            すべて ({tasks.filter((t) => t.status !== "done" && t.status !== "dropped").length})
          </button>
          {(Object.keys(taskCategoryLabel) as TaskCategory[]).map((c) => {
            const count = tasks.filter((t) => t.category === c && t.status !== "done" && t.status !== "dropped").length;
            if (count === 0) return null;
            return (
              <button key={c} onClick={() => setFilterCategory(c)}
                className={`px-3 py-1.5 text-xs rounded-full font-medium ${filterCategory === c ? "bg-navy-700 text-white" : "bg-sand-100 dark:bg-navy-700 text-navy-600 dark:text-navy-300 hover:bg-sand-200 dark:hover:bg-navy-600"}`}>
                {taskCategoryLabel[c]} ({count})
              </button>
            );
          })}
        </div>
        <button onClick={() => setShowAdd(true)} className="px-4 py-2 text-sm rounded-lg bg-navy-700 text-white hover:bg-navy-800 shrink-0">
          + タスク追加
        </button>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-navy-400 self-center mr-1">状態:</span>
          {activeStatuses.map((s) => (
            <button key={s} onClick={() => setFilterStatus(filterStatus === s ? "all" : s)}
              className={`px-2 py-1 text-xs rounded font-medium ${filterStatus === s ? "bg-navy-600 text-white" : "bg-sand-50 dark:bg-navy-700 text-navy-500 dark:text-navy-300 hover:bg-sand-100 dark:hover:bg-navy-600"}`}>
              {taskStatusLabel[s]}
            </button>
          ))}
        </div>
        <input
          type="search"
          placeholder="検索…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-input w-48 text-sm ml-auto"
        />
      </div>

      {/* Bulk action bar */}
      {selectedIds.size > 0 && (
        <div className="flex items-center gap-3 mb-4 p-3 bg-navy-50 dark:bg-navy-700 rounded-lg">
          <span className="text-sm text-navy-700 dark:text-navy-200 font-medium">{selectedIds.size}件選択中</span>
          <select value={bulkStatus} onChange={(e) => setBulkStatus(e.target.value as TaskStatus)} className="form-input w-auto text-xs">
            {(["todo", "in_progress", "waiting", "blocked", "done", "dropped"] as TaskStatus[]).map((s) => (
              <option key={s} value={s}>{taskStatusLabel[s]}</option>
            ))}
          </select>
          <button onClick={applyBulkStatus} className="px-3 py-1 text-xs rounded bg-navy-700 text-white hover:bg-navy-800">適用</button>
          <button onClick={() => setBulkDeleteConfirm(true)} className="px-3 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-700">削除</button>
          <button onClick={() => setSelectedIds(new Set())} className="px-3 py-1 text-xs rounded border border-sand-200 dark:border-navy-600 text-navy-600 dark:text-navy-300 hover:bg-sand-50 dark:hover:bg-navy-700">選択解除</button>
        </div>
      )}

      <div className="space-y-3 mb-10">
        {activeTasks.length > 0 && (
          <div className="flex items-center gap-2 mb-2">
            <input type="checkbox" checked={activeTasks.length > 0 && selectedIds.size === activeTasks.length} onChange={toggleAll} className="w-3.5 h-3.5" />
            <span className="text-xs text-navy-400">すべて選択</span>
          </div>
        )}
        {activeTasks.map((task) => (
          <div key={task.taskId}
            className={`bg-white dark:bg-navy-800 rounded-lg border shadow-sm p-4 flex items-start gap-4 ${
              task.priority === "high" ? "border-red-200 dark:border-red-800" : task.priority === "medium" ? "border-amber-200 dark:border-amber-800" : "border-sand-200 dark:border-navy-600"
            }`}>
            <div className="flex items-center pt-1 shrink-0">
              <input type="checkbox" checked={selectedIds.has(task.taskId)} onChange={() => toggleSelect(task.taskId)} className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col gap-1.5 items-center shrink-0 pt-0.5">
              <Badge label={taskPriorityLabel[task.priority]} colorClass={taskPriorityColor[task.priority]} />
              <Badge label={taskStatusLabel[task.status]} colorClass={taskStatusColor[task.status]} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs text-navy-400">{task.taskId}</span>
                {task.relatedSceneId && (
                  <span className="text-xs bg-navy-50 dark:bg-navy-700 text-navy-500 dark:text-navy-300 px-1.5 py-0.5 rounded font-mono">{task.relatedSceneId}</span>
                )}
                <Badge label={taskCategoryLabel[task.category]} colorClass={taskCategoryColor[task.category]} />
              </div>
              <h3 className="font-semibold text-navy-800 dark:text-sand-100">{task.title}</h3>
              {task.notes && <p className="text-sm text-navy-500 dark:text-navy-300 mt-1">{task.notes}</p>}
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
                addToast("タスクを完了にしました", "success");
              }} className="text-xs text-emerald-400 hover:text-emerald-600" title="完了にする">✅</button>
              <button onClick={() => setDeleteId(task.taskId)} className="text-xs text-red-400 hover:text-red-600" title="削除">🗑</button>
            </div>
          </div>
        ))}
        {activeTasks.length === 0 && <p className="text-sm text-navy-400 text-center py-8">該当するタスクがありません</p>}
      </div>

      {doneTasks.length > 0 && (
        <div>
          <button onClick={() => setShowDone(!showDone)} className="flex items-center gap-2 text-lg font-bold text-navy-800 dark:text-sand-100 mb-4">
            完了済み ({doneTasks.length})
            <span className="text-sm text-navy-400">{showDone ? "▲" : "▼"}</span>
          </button>
          {showDone && (
            <div className="space-y-2">
              {doneTasks.map((task) => (
                <div key={task.taskId} className="bg-sand-50 dark:bg-navy-700 rounded-lg border border-sand-200 dark:border-navy-600 p-3 flex items-center gap-3 opacity-60">
                  <Badge label={taskStatusLabel[task.status]} colorClass={taskStatusColor[task.status]} />
                  <span className="text-sm text-navy-600 dark:text-navy-300 line-through flex-1">{task.title}</span>
                  <button onClick={() => updateTask({ ...task, status: "todo" })} className="text-xs text-navy-400 hover:text-navy-600">戻す</button>
                  <button onClick={() => setDeleteId(task.taskId)} className="text-xs text-red-400 hover:text-red-600">🗑</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="タスク追加" wide>
        <TaskForm movieId={selectedMovieId === "all" ? "" : selectedMovieId} onSave={(t) => { addTask(t); setShowAdd(false); addToast("タスクを追加しました", "success"); }} onCancel={() => setShowAdd(false)} />
      </Modal>

      <Modal open={!!editTask} onClose={() => setEditTask(null)} title="タスク編集" wide>
        {editTask && <TaskForm task={editTask} movieId={editTask.movieId} onSave={(t) => { updateTask(t); setEditTask(null); }} onCancel={() => setEditTask(null)} />}
      </Modal>

      <ConfirmDialog
        open={!!deleteId}
        title="タスク削除"
        message="このタスクを削除しますか？"
        onConfirm={() => { if (deleteId) deleteTask(deleteId); setDeleteId(null); addToast("タスクを削除しました", "info"); }}
        onCancel={() => setDeleteId(null)}
        danger
      />

      <ConfirmDialog
        open={bulkDeleteConfirm}
        title="一括削除"
        message={`${selectedIds.size}件のタスクを削除しますか？`}
        onConfirm={doBulkDelete}
        onCancel={() => setBulkDeleteConfirm(false)}
        danger
      />
    </div>
  );
}
