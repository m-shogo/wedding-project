import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProduction } from "../store/productionStore";

interface SearchPaletteProps {
  open: boolean;
  onClose: () => void;
}

interface SearchResult {
  kind: "scene" | "asset" | "prompt" | "task";
  icon: string;
  label: string;
  title: string;
  id: string;
  path: string;
}

export function SearchPalette({ open, onClose }: SearchPaletteProps) {
  const { data } = useProduction();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  const results = useMemo<SearchResult[]>(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    const out: SearchResult[] = [];

    for (const s of data.scenes) {
      if ([s.title, s.purpose, s.visual, s.caption, s.notes].some((f) => f.toLowerCase().includes(q))) {
        out.push({ kind: "scene", icon: "🎬", label: "シーン", title: s.title, id: s.sceneId, path: "/storyboard" });
      }
    }
    for (const a of data.assets) {
      if ([a.title, a.path, a.notes, a.source, a.usage].some((f) => f.toLowerCase().includes(q))) {
        out.push({ kind: "asset", icon: "🗂", label: "素材", title: a.title, id: a.assetId, path: "/assets" });
      }
    }
    for (const p of data.prompts) {
      if ([p.title, p.prompt, p.negativePrompt, p.notes].some((f) => f.toLowerCase().includes(q))) {
        out.push({ kind: "prompt", icon: "✨", label: "プロンプト", title: p.title, id: p.promptId, path: "/prompts" });
      }
    }
    for (const t of data.tasks) {
      if ([t.title, t.notes].some((f) => f.toLowerCase().includes(q))) {
        out.push({ kind: "task", icon: "⚠", label: "タスク", title: t.title, id: t.taskId, path: "/missing" });
      }
    }
    return out.slice(0, 20);
  }, [query, data]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center pt-[15vh]" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 h-fit max-h-[60vh] flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="px-4 py-3 border-b border-sand-100">
          <input
            ref={inputRef}
            type="search"
            placeholder="シーン、素材、プロンプト、タスクを検索…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm bg-transparent outline-none text-navy-800 placeholder:text-navy-300"
          />
        </div>
        <div className="overflow-auto flex-1 p-2">
          {query && results.length === 0 && (
            <p className="text-sm text-navy-400 text-center py-6">該当なし</p>
          )}
          {!query && (
            <p className="text-xs text-navy-300 text-center py-6">⌘K で検索を開始</p>
          )}
          {results.map((r) => (
            <button
              key={`${r.kind}-${r.id}`}
              onClick={() => { navigate(r.path); onClose(); }}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-sand-50 flex items-center gap-3"
            >
              <span className="text-lg">{r.icon}</span>
              <span className="text-xs text-navy-400 w-16 shrink-0">{r.label}</span>
              <span className="text-sm text-navy-700 truncate flex-1">{r.title}</span>
              <span className="text-xs font-mono text-navy-300 shrink-0">{r.id}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
