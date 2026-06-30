import { useState } from "react";
import { Header } from "../components/Header";
import { SectionCard } from "../components/SectionCard";
import { placementRules, capcutPackRule } from "../lib/assetPaths";
import { assetTypeLabel, assetTypeColor } from "../lib/labels";
import { Badge } from "../components/Badge";
import type { AssetType } from "../types/movie";

const orderedTypes: AssetType[] = [
  "own_photo", "own_video", "generated_image", "ai_video",
  "motion_studio_export", "audio", "reference", "text", "design_asset",
];

function FolderTree({ base, subs }: { base: string; subs: string[] }) {
  return (
    <div className="font-mono text-xs text-navy-600 dark:text-navy-300 bg-sand-50 dark:bg-navy-700 rounded-lg p-3 overflow-x-auto">
      <div className="font-bold text-navy-800 dark:text-sand-100">{base}</div>
      {subs.map((s) => (
        <div key={s} className="ml-4">└ {s}</div>
      ))}
    </div>
  );
}

export function AssetPlacementGuide() {
  const [copiedPath, setCopiedPath] = useState<string | null>(null);

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    setCopiedPath(text);
    setTimeout(() => setCopiedPath(null), 1500);
  }

  return (
    <div>
      <Header title="素材置き場ガイド" description="素材タイプごとの保存先、Asset Libraryへの登録パス、Git管理ルールを一覧で確認できます" />

      <div className="mb-8 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
        <p className="text-sm text-amber-800 dark:text-amber-200 font-medium mb-1">基本ルール</p>
        <p className="text-sm text-amber-700 dark:text-amber-300">
          素材本体（写真・動画・音源）はGitに入れません。Asset Libraryにはパスだけ登録します。
          実ファイルは推奨フォルダに保存し、ここに書かれたパスをAsset Libraryの「パス」欄にコピーしてください。
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        {orderedTypes.map((type) => {
          const rule = placementRules[type];
          return (
            <SectionCard key={type} title="" className="!pt-0">
              <div className="flex items-center gap-2 mb-3">
                <Badge label={assetTypeLabel[type]} colorClass={assetTypeColor[type]} />
                <span className={`text-xs px-2 py-0.5 rounded-full ${rule.gitManaged ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"}`}>
                  {rule.gitManaged ? "Git管理OK" : "Git管理しない"}
                </span>
              </div>
              <p className="text-sm text-navy-600 dark:text-navy-300 mb-3">{rule.description}</p>

              <FolderTree base={rule.baseFolder} subs={rule.subfolders} />

              <div className="mt-3">
                <p className="text-xs font-medium text-navy-500 dark:text-navy-400 mb-1">ファイル名の例:</p>
                <div className="flex flex-wrap gap-1.5">
                  {rule.namingExamples.map((ex) => (
                    <button key={ex} onClick={() => copyToClipboard(ex)}
                      className="font-mono text-xs bg-sand-100 dark:bg-navy-600 text-navy-600 dark:text-navy-300 px-2 py-1 rounded hover:bg-sand-200 dark:hover:bg-navy-500 transition-colors"
                      title="クリックでコピー">
                      {copiedPath === ex ? "✓ コピー済" : ex}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-3 flex items-start gap-1.5">
                <span className="text-xs text-navy-400 dark:text-navy-400 shrink-0">💡</span>
                <p className="text-xs text-navy-400 dark:text-navy-400">{rule.gitNote}</p>
              </div>

              <div className="mt-2">
                <p className="text-xs text-navy-500 dark:text-navy-400 mb-1">Asset Library登録パス例:</p>
                <button onClick={() => copyToClipboard(rule.baseFolder + rule.namingExamples[0])}
                  className="font-mono text-xs bg-navy-50 dark:bg-navy-700 text-navy-700 dark:text-navy-200 px-2 py-1 rounded border border-navy-200 dark:border-navy-600 hover:bg-navy-100 dark:hover:bg-navy-600 transition-colors"
                  title="クリックでコピー">
                  {copiedPath === rule.baseFolder + rule.namingExamples[0] ? "✓ コピー済" : rule.baseFolder + rule.namingExamples[0]}
                </button>
              </div>
            </SectionCard>
          );
        })}
      </div>

      {/* CapCut Pack */}
      <SectionCard title="CapCut編集パック書き出し先" className="mb-8">
        <p className="text-sm text-navy-600 dark:text-navy-300 mb-3">{capcutPackRule.description}</p>
        <FolderTree base={capcutPackRule.baseFolder} subs={capcutPackRule.subfolders} />
        <div className="mt-3 flex items-start gap-1.5">
          <span className="text-xs text-navy-400 dark:text-navy-400 shrink-0">💡</span>
          <p className="text-xs text-navy-400 dark:text-navy-400">{capcutPackRule.gitNote}</p>
        </div>
      </SectionCard>

      {/* Quick reference table */}
      <SectionCard title="素材タイプ早見表">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-navy-50 dark:bg-navy-700 text-left">
                <th className="px-3 py-2 text-xs font-semibold text-navy-500 dark:text-navy-300">タイプ</th>
                <th className="px-3 py-2 text-xs font-semibold text-navy-500 dark:text-navy-300">保存先</th>
                <th className="px-3 py-2 text-xs font-semibold text-navy-500 dark:text-navy-300">Git</th>
                <th className="px-3 py-2 text-xs font-semibold text-navy-500 dark:text-navy-300">Asset Libraryには</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-100 dark:divide-navy-600">
              {orderedTypes.map((type) => {
                const rule = placementRules[type];
                return (
                  <tr key={type} className="hover:bg-sand-50 dark:hover:bg-navy-700">
                    <td className="px-3 py-2">
                      <Badge label={assetTypeLabel[type]} colorClass={assetTypeColor[type]} />
                    </td>
                    <td className="px-3 py-2">
                      <code className="text-xs font-mono text-navy-600 dark:text-navy-300">{rule.baseFolder}</code>
                    </td>
                    <td className="px-3 py-2">
                      <span className={`text-xs ${rule.gitManaged ? "text-emerald-600" : "text-red-500"}`}>
                        {rule.gitManaged ? "OK" : "✕"}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-xs text-navy-500 dark:text-navy-300">パスだけ登録</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
