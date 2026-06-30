import { useRef, useState } from "react";
import { Header } from "../components/Header";
import { SectionCard } from "../components/SectionCard";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { useProduction } from "../store/productionStore";
import { useToast } from "../store/toastStore";
import { downloadJson, saveToLocal } from "../lib/exporters";
import { validateData } from "../lib/validators";
import type { ValidationIssue } from "../lib/validators";
import type { AllData } from "../types/movie";

export function DataManager() {
  const { data, resetToDefaults, importAllData, getAllData } = useProduction();
  const { addToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [issues, setIssues] = useState<ValidationIssue[] | null>(null);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving">("idle");

  function handleExport() {
    const allData = getAllData();
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, "-");
    downloadJson(allData, `movie-dashboard-backup-${timestamp}.json`);
  }

  async function handleSaveLocal() {
    setSaveStatus("saving");
    try {
      await saveToLocal(getAllData());
      setSaveStatus("idle");
      addToast("src/data/ に保存しました", "success");
    } catch (e) {
      setSaveStatus("idle");
      addToast(e instanceof Error ? e.message : "保存に失敗しました", "error");
    }
  }

  function handleImportClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const raw = JSON.parse(ev.target?.result as string) as Record<string, unknown>;
        if (
          !Array.isArray(raw.movies) ||
          !Array.isArray(raw.scenes) ||
          !Array.isArray(raw.assets) ||
          !Array.isArray(raw.prompts) ||
          !Array.isArray(raw.tasks)
        ) {
          addToast("JSONの形式が正しくありません", "error");
          return;
        }
        const parsed: AllData = {
          movies: raw.movies as AllData["movies"],
          scenes: raw.scenes as AllData["scenes"],
          assets: raw.assets as AllData["assets"],
          prompts: raw.prompts as AllData["prompts"],
          tasks: raw.tasks as AllData["tasks"],
        };
        importAllData(parsed);
        setIssues(null);
        addToast("インポートが完了しました", "success");
      } catch {
        addToast("JSONの解析に失敗しました", "error");
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleValidate() {
    const result = validateData(data);
    setIssues(result);
  }

  const counts = {
    movies: data.movies.length,
    scenes: data.scenes.length,
    assets: data.assets.length,
    prompts: data.prompts.length,
    tasks: data.tasks.length,
  };

  const errors = issues?.filter((i) => i.type === "error") ?? [];
  const warnings = issues?.filter((i) => i.type === "warning") ?? [];

  return (
    <div>
      <Header title="データ管理" description="データの整合性チェック、JSONエクスポート/インポート、初期データへのリセットを行います" />

      {/* Current data summary */}
      <SectionCard title="現在のデータ" className="mb-6">
        <div className="grid grid-cols-5 gap-4">
          {Object.entries(counts).map(([key, val]) => (
            <div key={key} className="bg-sand-50 dark:bg-navy-700 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-navy-800 dark:text-sand-100">{val}</p>
              <p className="text-xs text-navy-400 dark:text-navy-300 mt-1">{{ movies: "ムービー", scenes: "シーン", assets: "素材", prompts: "プロンプト", tasks: "タスク" }[key]}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Local save */}
      <SectionCard title="ローカル保存" className="mb-6">
        <p className="text-sm text-navy-500 dark:text-navy-300 mb-4">
          現在のデータを <code className="text-xs bg-sand-100 dark:bg-navy-600 px-1 py-0.5 rounded">src/data/*.json</code> に直接書き込みます。開発サーバー起動中のみ使えます。保存後に git commit すればデータをリポジトリに残せます。
        </p>
        <button
          onClick={handleSaveLocal}
          disabled={saveStatus === "saving"}
          className="px-4 py-2 text-sm rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          {saveStatus === "saving" ? "保存中…" : "src/data/ に保存"}
        </button>
      </SectionCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Export */}
        <SectionCard title="エクスポート">
          <p className="text-sm text-navy-500 dark:text-navy-300 mb-4">
            現在のデータをJSON形式でダウンロードします。localStorageのバックアップとして使えます。
          </p>
          <button onClick={handleExport} className="px-4 py-2 text-sm rounded-lg bg-navy-700 text-white hover:bg-navy-800">
            JSONエクスポート
          </button>
        </SectionCard>

        {/* Import */}
        <SectionCard title="インポート">
          <p className="text-sm text-navy-500 dark:text-navy-300 mb-4">
            エクスポートしたJSONファイルを読み込みます。現在のデータは上書きされます。
          </p>
          <input ref={fileInputRef} type="file" accept=".json" onChange={handleFileChange} className="hidden" />
          <button onClick={handleImportClick} className="px-4 py-2 text-sm rounded-lg border border-sand-200 dark:border-navy-600 text-navy-600 dark:text-navy-300 hover:bg-sand-50 dark:hover:bg-navy-700">
            JSONインポート
          </button>
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Validate */}
        <SectionCard title="データ検証">
          <p className="text-sm text-navy-500 dark:text-navy-300 mb-4">
            データの整合性をチェックします。存在しないIDへの参照、未紐付けのエンティティなどを検出します。
          </p>
          <button onClick={handleValidate} className="px-4 py-2 text-sm rounded-lg border border-sand-200 dark:border-navy-600 text-navy-600 dark:text-navy-300 hover:bg-sand-50 dark:hover:bg-navy-700">
            検証実行
          </button>
          {issues !== null && (
            <div className="mt-4">
              {issues.length === 0 ? (
                <p className="text-sm text-emerald-600 font-medium">問題は見つかりませんでした</p>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-navy-600 dark:text-navy-300">
                    エラー: <span className="font-bold text-red-600">{errors.length}</span> &middot;
                    警告: <span className="font-bold text-amber-600">{warnings.length}</span>
                  </p>
                  <div className="max-h-64 overflow-auto space-y-1.5">
                    {issues.map((issue, idx) => (
                      <div key={idx} className={`text-xs p-2 rounded ${issue.type === "error" ? "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400" : "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400"}`}>
                        <span className="font-semibold">[{issue.entity}:{issue.entityId}]</span> {issue.message}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </SectionCard>

        {/* Reset */}
        <SectionCard title="リセット">
          <p className="text-sm text-navy-500 dark:text-navy-300 mb-4">
            localStorageのデータを削除し、デフォルトのJSONデータに戻します。この操作は取り消せません。
          </p>
          <button onClick={() => setShowResetConfirm(true)} className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700">
            デフォルトに戻す
          </button>
        </SectionCard>
      </div>

      <ConfirmDialog
        open={showResetConfirm}
        title="データリセット"
        message="すべてのデータをデフォルトに戻します。localStorageの変更は失われます。先にエクスポートすることをおすすめします。"
        onConfirm={() => { resetToDefaults(); setShowResetConfirm(false); setIssues(null); addToast("デフォルトデータに戻しました", "info"); }}
        onCancel={() => setShowResetConfirm(false)}
        danger
      />
    </div>
  );
}
