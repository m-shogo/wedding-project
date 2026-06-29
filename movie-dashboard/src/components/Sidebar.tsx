import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "ダッシュボード", icon: "✈" },
  { to: "/storyboard", label: "絵コンテ", icon: "🎬" },
  { to: "/assets", label: "素材ライブラリ", icon: "🗂" },
  { to: "/prompts", label: "プロンプト管理", icon: "✨" },
  { to: "/missing", label: "不足・未確定リスト", icon: "⚠" },
  { to: "/capcut", label: "CapCut編集パック", icon: "✂" },
  { to: "/production-map", label: "制作マップ", icon: "🗺" },
  { to: "/data", label: "データ管理", icon: "💾" },
  { to: "/guide", label: "使い方", icon: "📖" },
];

export function Sidebar() {
  return (
    <aside className="w-60 shrink-0 bg-white border-r border-sand-200 flex flex-col min-h-screen">
      <div className="px-5 py-6 border-b border-sand-100">
        <h1 className="text-lg font-bold text-navy-800 font-serif tracking-wide">
          MEMORY FLIGHT
        </h1>
        <p className="text-xs text-navy-400 mt-0.5">ウェディングムービー制作管理</p>
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
      <div className="p-4 border-t border-sand-100">
        <p className="text-xs text-navy-300 text-center">2026.10.24 Yokohama</p>
      </div>
    </aside>
  );
}
