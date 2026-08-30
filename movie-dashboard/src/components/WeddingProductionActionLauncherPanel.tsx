import { useMemo, useState } from "react";
import { weddingProductionActions, type WeddingProject } from "../lib/weddingProductionActions";

function badgeClass(kind: string) {
  if (kind === "READY") return "border-emerald-300 text-emerald-700 dark:border-emerald-800 dark:text-emerald-300";
  if (kind === "INPUT_REQUIRED") return "border-amber-300 text-amber-700 dark:border-amber-800 dark:text-amber-300";
  if (kind === "HUMAN") return "border-fuchsia-300 text-fuchsia-700 dark:border-fuchsia-800 dark:text-fuchsia-300";
  return "border-indigo-300 text-indigo-700 dark:border-indigo-800 dark:text-indigo-300";
}

export function WeddingProductionActionLauncherPanel() {
  const [project, setProject] = useState<WeddingProject>("Opening");
  const [copied, setCopied] = useState<string | null>(null);
  const action = useMemo(() => weddingProductionActions[project], [project]);

  async function copy(command: string) {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(command);
      window.setTimeout(() => setCopied(null), 1400);
    } catch {
      setCopied(null);
    }
  }

  return (
    <section className="mb-10 border-2 border-violet-200 bg-violet-50/20 dark:border-violet-900 dark:bg-violet-950/10">
      <div className="border-b border-violet-100 p-4 md:p-5 dark:border-violet-900/60">
        <p className="text-[10px] font-semibold tracking-[0.2em] text-violet-700 dark:text-violet-300">PRODUCTION ACTION LAUNCHER</p>
        <h2 className="mt-1 text-lg font-bold text-navy-900 dark:text-sand-100">MatrixのEXACT NEXTをcanonical commandへ接続</h2>
        <p className="mt-2 max-w-3xl text-xs leading-5 text-navy-500 dark:text-navy-300">
          Dashboardはcommandを実行しません。Motion Studio側の既存CLI / package scriptだけを表示・copyし、失敗時は同じcurrent sourceへ戻るrecovery hintを示します。
        </p>
      </div>

      <div className="p-4 md:p-5">
        <div className="flex flex-wrap gap-2">
          {(["Opening", "Profile"] as WeddingProject[]).map((candidate) => (
            <button
              key={candidate}
              type="button"
              onClick={() => setProject(candidate)}
              className={`border px-3 py-2 text-xs font-bold ${project === candidate ? "border-violet-500 bg-violet-100/70 text-violet-800 dark:bg-violet-950/40 dark:text-violet-200" : "border-sand-300 text-navy-500 dark:border-navy-600 dark:text-navy-300"}`}
            >
              {candidate}
            </button>
          ))}
        </div>

        <div className="mt-4 border border-sand-200 bg-white/60 p-4 dark:border-navy-700 dark:bg-navy-950/20">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="max-w-3xl">
              <p className="text-[10px] text-navy-400">{project} · {action.phase}</p>
              <h3 className="mt-1 font-bold text-navy-900 dark:text-sand-100">{action.title}</h3>
              <p className="mt-2 text-xs leading-5 text-navy-500 dark:text-navy-300">{action.detail}</p>
            </div>
            <span className={`border px-2 py-1 text-[10px] font-bold ${badgeClass(action.kind)}`}>{action.kind}</span>
          </div>

          {action.kind === "INPUT_REQUIRED" ? (
            <div className="mt-4 border border-amber-300 bg-amber-50/50 p-3 text-xs leading-5 text-amber-800 dark:border-amber-800 dark:bg-amber-950/20 dark:text-amber-200">
              実素材pathが必要です。上のProduction Input Plan Builderからcanonical intake planを生成してください。placeholder pathでは後続commandを解放しません。
            </div>
          ) : action.commands.length > 0 ? (
            <div className="mt-4 grid gap-2 lg:grid-cols-3">
              {action.commands.map((command, index) => (
                <button
                  key={command}
                  type="button"
                  onClick={() => copy(command)}
                  className="border border-sand-300 px-3 py-3 text-left dark:border-navy-600"
                >
                  <span className="block text-[9px] font-bold tracking-[0.14em] text-violet-600 dark:text-violet-300">STEP {index + 1}</span>
                  <span className="mt-1 block font-mono text-[10px] leading-5 break-all text-navy-700 dark:text-navy-200">{copied === command ? "✓ copied" : command}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="mt-4 border border-emerald-300 bg-emerald-50/40 p-3 text-xs leading-5 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-200">
              このreview chainに追加commandはありません。次はcanonical handoff / recovery authorityへ進みます。
            </div>
          )}

          <div className="mt-4 border-t border-sand-200 pt-3 text-[10px] leading-5 text-navy-400 dark:border-navy-700">
            <strong className="text-navy-600 dark:text-navy-300">RECOVERY:</strong> {action.recoveryHint}
          </div>
        </div>

        <p className="mt-4 text-[10px] leading-5 text-navy-400">
          MATRIX_EXACT_NEXT == LAUNCHER_ACTION / DASHBOARD_EXECUTION = NEVER / COMMAND_COPIED != COMMAND_EXECUTED / HUMAN_QA_REQUIRED != HUMAN_QA_PASS / Remotion Studio GUI Actual = NOT_RUN / Mac DaVinci GUI Actual = NOT_RUN
        </p>
      </div>
    </section>
  );
}
