import { useRef, useState } from "react";
import { Header } from "../components/Header";
import { SectionCard } from "../components/SectionCard";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { useProduction } from "../store/productionStore";
import { downloadJson } from "../lib/exporters";
import { validateData } from "../lib/validators";
import type { ValidationIssue } from "../lib/validators";
import type { AllData } from "../types/movie";

export function DataManager() {
  const { data, resetToDefaults, importAllData, getAllData } = useProduction();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [issues, setIssues] = useState<ValidationIssue[] | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);

  function handleExport() {
    const allData = getAllData();
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, "-");
    downloadJson(allData, `movie-dashboard-backup-${timestamp}.json`);
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
          setImportError("JSONの形式が正しくありません。movies, scenes, assets, prompts, tasks の各配列が必要です。");
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
        setImportError(null);
        setImportSuccess(true);
        setIssues(null);
        setTimeout(() => setImportSuccess(false), 3000);
      } catch {
        setImportError("JSONの解析に失敗しました。ファイルを確認してください。");
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
            <div key={key} className="bg-sand-50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-navy-800">{val}</p>
              <p className="text-xs text-navy-400 mt-1">{{ movies: "ムービー", scenes: "シーン", assets: "素材", prompts: "プロンプト", tasks: "タスク" }[key]}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Export */}
        <SectionCard title="エクスポート">
          <p className="text-sm text-navy-500 mb-4">
            現在のデータをJSON形式でダウンロードします。localStorageのバックアップとして使えます。
          </p>
          <button onClick={handleExport} className="px-4 py-2 text-sm rounded-lg bg-navy-700 text-white hover:bg-navy-800">
            JSONエクスポート
          </button>
        </SectionCard>

        {/* Import */}
        <SectionCard title="インポート">
          <p className="text-sm text-navy-500 mb-4">
            エクスポートしたJSONファイルを読み込みます。現在のデータは上書きされます。
          </p>
          <input ref={fileInputRef} type="file" accept=".json" onChange={handleFileChange} className="hidden" />
          <button onClick={handleImportClick} className="px-4 py-2 text-sm rounded-lg border border-sand-200 text-navy-600 hover:bg-sand-50">
            JSONインポート
          </button>
          {importError && <p className="text-sm text-red-600 mt-3">{importError}</p>}
          {importSuccess && <p className="text-sm text-emerald-600 mt-3">インポートが完了しました</p>}
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Validate */}
        <SectionCard title="データ検証">
          <p className="text-sm text-navy-500 mb-4">
            データの整合性をチェックします。存在しないIDへの参照、未紐付けのエンティティなどを検出します。
          </p>
          <button onClick={handleValidate} className="px-4 py-2 text-sm rounded-lg border border-sand-200 text-navy-600 hover:bg-sand-50">
            検証実行
          </button>
          {issues !== null && (
            <div className="mt-4">
              {issues.length === 0 ? (
                <p className="text-sm text-emerald-600 font-medium">問題は見つかりませんでした</p>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-navy-600">
                    エラー: <span className="font-bold text-red-600">{errors.length}</span> &middot;
                    警告: <span className="font-bold text-amber-600">{warnings.length}</span>
                  </p>
                  <div className="max-h-64 overflow-auto space-y-1.5">
                    {issues.map((issue, idx) => (
                      <div key={idx} className={`text-xs p-2 rounded ${issue.type === "error" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700"}`}>
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
          <p className="text-sm text-navy-500 mb-4">
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
        onConfirm={() => { resetToDefaults(); setShowResetConfirm(false); setIssues(null); }}
        onCancel={() => setShowResetConfirm(false)}
        danger
      />
    </div>
  );
}
