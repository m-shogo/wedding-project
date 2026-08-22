import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProduction } from "../store/productionStore";

interface SearchPaletteProps {
  open: boolean;
  onClose: () => void;
}

interface SearchResult {
  kind: "page" | "scene" | "asset" | "prompt" | "task";
  icon: string;
  label: string;
  title: string;
  id: string;
  path: string;
}

const pageCommands: Array<SearchResult & { keywords: string[]; pinned?: boolean }> = [
  { kind: "page", icon: "🧭", label: "AI動画", title: "ショット計画", id: "video-shot-planner", path: "/video-shot-planner", keywords: ["shot", "planner", "b-roll", "絵コンテ", "自動分類"], pinned: true },
  { kind: "page", icon: "🎥", label: "AI動画", title: "動画プロンプト", id: "video-prompt-builder", path: "/video-prompt-builder", keywords: ["prompt", "seedance", "runway", "veo", "kling", "プリセット"], pinned: true },
  { kind: "page", icon: "🛡️", label: "AI動画", title: "プリフライト", id: "video-preflight", path: "/video-preflight", keywords: ["preflight", "block", "warning", "生成前"], pinned: true },
  { kind: "page", icon: "🚀", label: "AI動画", title: "動画生成キュー", id: "video-generation-queue", path: "/video-generation-queue", keywords: ["queue", "生成", "testing", "結果登録"], pinned: true },
  { kind: "page", icon: "🔎", label: "AI動画", title: "結果レビュー", id: "video-result-review", path: "/video-result-review", keywords: ["review", "qa", "採用", "不採用", "retry"], pinned: true },
  { kind: "page", icon: "🧬", label: "AI動画", title: "実体再probe", id: "video-asset-reprobe", path: "/video-asset-reprobe", keywords: ["probe", "fingerprint", "実動画", "再確認", "既存asset"] },
  { kind: "page", icon: "🧠", label: "AI動画", title: "失敗学習", id: "video-failure-lab", path: "/video-failure-lab", keywords: ["failure", "失敗", "retry", "破綻" ] },
  { kind: "page", icon: "📊", label: "AI動画", title: "モデル実績", id: "video-model-evidence", path: "/video-model-evidence", keywords: ["model", "evidence", "採用率", "seedance", "runway"] },
  { kind: "page", icon: "🌴", label: "編集", title: "Palmier 実行Handoff", id: "palmier-handoff", path: "/palmier-handoff", keywords: ["palmier", "handoff", "編集", "continuity"], pinned: true },
  { kind: "page", icon: "✂", label: "編集", title: "CapCut編集パック", id: "capcut", path: "/capcut", keywords: ["capcut", "編集", "実尺"] },
  { kind: "page", icon: "🗂", label: "制作", title: "素材ライブラリ", id: "assets", path: "/assets", keywords: ["asset", "素材", "動画", "写真"] },
  { kind: "page", icon: "🎞", label: "制作", title: "クリップ素材集", id: "clips", path: "/clips", keywords: ["clip", "クリップ", "切り出し", "motion", "動き", "レシピ", "recipe"] },
  { kind: "page", icon: "🎬", label: "制作", title: "絵コンテ", id: "storyboard", path: "/storyboard", keywords: ["scene", "storyboard", "シーン", "絵コンテ"] },
];

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
    if (!q) return pageCommands.filter((command) => command.pinned).slice(0, 8);
    const out: SearchResult[] = [];

    for (const command of pageCommands) {
      const haystack = [command.title, command.label, command.id, ...command.keywords].join(" ").toLowerCase();
      if (haystack.includes(q)) out.push(command);
    }
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
      <div className="bg-white dark:bg-navy-800 rounded-xl shadow-xl w-full max-w-lg mx-4 h-fit max-h-[60vh] flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="px-4 py-3 border-b border-sand-100 dark:border-navy-700">
          <input
            ref={inputRef}
            type="search"
            placeholder="画面、シーン、素材、プロンプト、タスクを検索…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm bg-transparent outline-none text-navy-800 dark:text-sand-100 placeholder:text-navy-300 dark:placeholder:text-navy-400"
          />
        </div>
        <div className="overflow-auto flex-1 p-2">
          {query && results.length === 0 && (
            <p className="text-sm text-navy-400 text-center py-6">該当なし</p>
          )}
          {!query && (
            <p className="px-3 pt-2 pb-1 text-[11px] text-navy-400">よく使うAI動画・編集画面</p>
          )}
          {results.map((r) => (
            <button
              key={`${r.kind}-${r.id}`}
              onClick={() => { navigate(r.path); onClose(); }}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-sand-50 dark:hover:bg-navy-700 flex items-center gap-3"
            >
              <span className="text-lg">{r.icon}</span>
              <span className="text-xs text-navy-400 w-16 shrink-0">{r.label}</span>
              <span className="text-sm text-navy-700 dark:text-navy-200 truncate flex-1">{r.title}</span>
              <span className="text-xs font-mono text-navy-300 dark:text-navy-400 shrink-0">{r.id}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
