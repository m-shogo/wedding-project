import {useMemo, useState} from "react";
import {
  buildWeddingProductionInputGeneratorCommand,
  type WeddingProductionInputProject,
} from "../data/weddingProductionInputCommandBuilder";

export function WeddingProductionInputPlanBuilder() {
  const [project, setProject] = useState<WeddingProductionInputProject>("opening");
  const [mediaSource, setMediaSource] = useState("");
  const [bgmSource, setBgmSource] = useState("");
  const [copied, setCopied] = useState(false);

  const preview = useMemo(
    () => buildWeddingProductionInputGeneratorCommand({project, mediaSource, bgmSource}),
    [project, mediaSource, bgmSource],
  );

  async function copyCommand() {
    if (!preview.command) return;
    try {
      await navigator.clipboard.writeText(preview.command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="mb-10 border-2 border-sky-200 bg-sky-50/20 dark:border-sky-900 dark:bg-sky-950/10">
      <div className="border-b border-sky-100 p-4 md:p-5 dark:border-sky-900/60">
        <p className="text-[10px] font-semibold tracking-[0.2em] text-sky-700 dark:text-sky-300">PRODUCTION INPUT PLAN BUILDER / COMMAND ONLY</p>
        <h2 className="mt-1 text-lg font-bold text-navy-900 dark:text-sand-100">実素材の場所からcanonical intake planを作る</h2>
        <p className="mt-2 max-w-3xl text-xs leading-5 text-navy-500 dark:text-navy-300">
          Motion Zukanはファイルをcopy・実行しません。実際のmacOS絶対パスを入力すると、Motion Studio正本の wedding-production-input-plan CLIを呼ぶcommandだけを生成します。CLIが最終validationとintake順序のauthorityです。
        </p>
      </div>

      <div className="space-y-5 p-4 md:p-5">
        <div className="flex gap-2">
          {(["opening", "profile"] as const).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setProject(id)}
              className={`border px-3 py-2 text-xs font-semibold ${project === id ? "border-sky-500 text-sky-700 dark:text-sky-300" : "border-sand-300 dark:border-navy-600"}`}
            >
              {id === "opening" ? "Opening" : "Profile"}
            </button>
          ))}
        </div>

        <label className="block">
          <span className="text-[10px] font-semibold tracking-[0.14em] text-navy-500 dark:text-navy-300">MEDIA SOURCE · REQUIRED</span>
          <input
            value={mediaSource}
            onChange={(event) => setMediaSource(event.target.value)}
            placeholder={project === "opening" ? "/Users/you/Wedding/Opening/photos" : "/Users/you/Wedding/Profile/media"}
            className="mt-2 w-full border border-sand-300 bg-white px-3 py-3 font-mono text-xs text-navy-800 outline-none focus:border-sky-500 dark:border-navy-600 dark:bg-navy-900 dark:text-sand-100"
          />
        </label>

        <label className="block">
          <span className="text-[10px] font-semibold tracking-[0.14em] text-navy-500 dark:text-navy-300">BGM SOURCE · OPTIONAL</span>
          <input
            value={bgmSource}
            onChange={(event) => setBgmSource(event.target.value)}
            placeholder="/Users/you/Wedding/Music/rights-cleared-bgm.m4a"
            className="mt-2 w-full border border-sand-300 bg-white px-3 py-3 font-mono text-xs text-navy-800 outline-none focus:border-sky-500 dark:border-navy-600 dark:bg-navy-900 dark:text-sand-100"
          />
        </label>

        {preview.errors.length > 0 && (
          <div className="border border-amber-300 bg-amber-50/50 p-3 text-xs text-amber-800 dark:border-amber-800 dark:bg-amber-950/20 dark:text-amber-200">
            {preview.errors.map((error) => <p key={error}>• {error}</p>)}
          </div>
        )}

        <div className="border border-sand-200 p-4 dark:border-navy-700">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.14em] text-navy-500 dark:text-navy-300">CANONICAL PLAN GENERATOR COMMAND</p>
              <p className="mt-1 text-[10px] text-navy-400">生成後も execution state / Studio Actual / DaVinci Actual はすべて NOT_RUN のままです。</p>
            </div>
            <span className={`border px-2 py-1 text-[10px] font-bold ${preview.state === "READY" ? "border-emerald-300 text-emerald-700 dark:border-emerald-800 dark:text-emerald-300" : "border-amber-300 text-amber-700 dark:border-amber-800 dark:text-amber-300"}`}>
              {preview.state}
            </span>
          </div>
          <button
            type="button"
            disabled={!preview.command}
            onClick={copyCommand}
            className="mt-3 w-full border border-sand-300 bg-white px-3 py-3 text-left font-mono text-[10px] leading-5 text-navy-700 break-all disabled:cursor-not-allowed disabled:opacity-40 dark:border-navy-600 dark:bg-navy-900 dark:text-navy-200"
          >
            {preview.command ? (copied ? "✓ copied" : preview.command) : "実media pathを入力するとcommandを生成します"}
          </button>
        </div>

        <div className="grid gap-2 text-[10px] text-navy-500 dark:text-navy-300 sm:grid-cols-3">
          <div className="border border-sand-200 p-2 dark:border-navy-700">Plan execution: <strong>NOT_RUN</strong></div>
          <div className="border border-sand-200 p-2 dark:border-navy-700">Remotion Studio GUI Actual: <strong>NOT_RUN</strong></div>
          <div className="border border-sand-200 p-2 dark:border-navy-700">Mac DaVinci GUI Actual: <strong>NOT_RUN</strong></div>
        </div>
        <p className="text-[10px] leading-5 text-navy-400">DASHBOARD_COMMAND_PREVIEW != COMMAND_EXECUTED / CLI_IS_FINAL_PATH_VALIDATION_AUTHORITY / REAL_ABSOLUTE_PATH_REQUIRED</p>
      </div>
    </section>
  );
}
