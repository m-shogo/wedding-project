import { useState } from "react";
import type { Task, TaskCategory, TaskPriority, TaskStatus } from "../../types/movie";
import { taskCategoryLabel, taskPriorityLabel, taskStatusLabel } from "../../lib/labels";
import { generateId } from "../../lib/ids";

interface TaskFormProps {
  task?: Task;
  movieId: string;
  onSave: (task: Task) => void;
  onCancel: () => void;
}

const categoryKeys = Object.keys(taskCategoryLabel) as TaskCategory[];
const priorityKeys = Object.keys(taskPriorityLabel) as TaskPriority[];
const statusKeys = Object.keys(taskStatusLabel) as TaskStatus[];

export function TaskForm({ task, movieId, onSave, onCancel }: TaskFormProps) {
  const isEdit = !!task;

  const [title, setTitle] = useState(task?.title ?? "");
  const [category, setCategory] = useState<TaskCategory>(task?.category ?? "missing_asset");
  const [priority, setPriority] = useState<TaskPriority>(task?.priority ?? "medium");
  const [due, setDue] = useState(task?.due ?? "");
  const [status, setStatus] = useState<TaskStatus>(task?.status ?? "todo");
  const [notes, setNotes] = useState(task?.notes ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result: Task = {
      taskId: task?.taskId ?? generateId("task"),
      movieId: task?.movieId ?? movieId,
      title,
      category,
      priority,
      relatedSceneId: task?.relatedSceneId ?? "",
      due,
      status,
      notes,
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
          <label className="form-label">カテゴリ</label>
          <select value={category} onChange={(e) => setCategory(e.target.value as TaskCategory)} className="form-input">
            {categoryKeys.map((k) => (
              <option key={k} value={k}>{taskCategoryLabel[k]}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="form-label">優先度</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value as TaskPriority)} className="form-input">
            {priorityKeys.map((k) => (
              <option key={k} value={k}>{taskPriorityLabel[k]}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="form-label">期限</label>
          <input type="date" value={due} onChange={(e) => setDue(e.target.value)} className="form-input" />
        </div>
        <div>
          <label className="form-label">ステータス</label>
          <select value={status} onChange={(e) => setStatus(e.target.value as TaskStatus)} className="form-input">
            {statusKeys.map((k) => (
              <option key={k} value={k}>{taskStatusLabel[k]}</option>
            ))}
          </select>
        </div>
        <div className="col-span-2">
          <label className="form-label">メモ</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="form-input" rows={3} />
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
