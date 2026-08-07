import { NavLink } from "react-router-dom";
import { useProduction } from "../store/productionStore";
import { useTheme } from "../store/themeStore";

const links = [
  { to: "/", label: "ダッシュボード", icon: "✈" },
  { to: "/storyboard", label: "絵コンテ", icon: "🎬" },
  { to: "/assets", label: "素材ライブラリ", icon: "🗂" },
  { to: "/video-prompt-builder", label: "動画プロンプト", icon: "🎥" },
  { to: "/prompts", label: "プロンプト管理", icon: "✨" },
  { to: "/missing", label: "不足・未確定リスト", icon: "⚠" },
  { to: "/capcut", label: "CapCut編集パック", icon: "✂" },
  { to: "/production-map", label: "制作マップ", icon: "🗺" },
  { to: "/quality", label: "品質ゲート", icon: "🏁" },
  { to: "/profile-planner", label: "写真計画", icon: "📷" },
  { to: "/asset-placement-guide", label: "素材置き場ガイド", icon: "📁" },
  { to: "/data", label: "データ管理", icon: "💾" },
  { to: "/guide", label: "使い方", icon: "📖" },
];

export function Sidebar() {
  const { lastSavedAt } = useProduction();
  const { theme, toggle } = useTheme();

  return (
    <aside className="w-60 shrink-0 bg-white border-r border-sand-200 flex flex-col min-h-screen dark:bg-navy-800 dark:border-navy-700">
      <div className="px-5 py-6 border-b border-sand-100 dark:border-navy-700">
        <h1 className="text-lg font-bold text-navy-800 font-serif tracking-wide dark:text-sand-100">
          MEMORY FLIGHT
        </h1>
        <p className="text-xs text-navy-400 mt-0.5 dark:text-navy-300">ウェディングムービー制作管理</p>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/"}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "sidebar-link-active" : ""}`
            }
          >
            <span className="text-lg">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-sand-100 space-y-2 dark:border-navy-700">
        <button
          onClick={toggle}
          className="w-full text-xs text-navy-400 hover:text-navy-600 dark:text-navy-300 dark:hover:text-navy-100 flex items-center justify-center gap-1.5 py-1 rounded hover:bg-sand-50 dark:hover:bg-navy-700"
        >
          {theme === "light" ? "🌙 ダーク" : "☀️ ライト"}モード
        </button>
        {lastSavedAt && (
          <p className="text-xs text-navy-300 text-center dark:text-navy-400">
            ✓ {lastSavedAt.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" })} 保存済み
          </p>
        )}
        <p className="text-xs text-navy-300 text-center dark:text-navy-400">2026.10.24 Yokohama</p>
      </div>
    </aside>
  );
}
