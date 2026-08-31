import {useState} from "react";
import {getWeddingProductionNextAction} from "../data/weddingProductionNextAction";
import type {SceneProjectId} from "../data/visualSceneComposer";

export function WeddingProductionNextActionCard({projectId}: {projectId: SceneProjectId}) {
  const [copied, setCopied] = useState(false);
  const next = getWeddingProductionNextAction(projectId);
  const action = next.firstAction;

  async function copyAction() {
    if (!action) return;
    await navigator.clipboard.writeText(action.text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <section className="mt-3 border-2 border-orange-300 dark:border-orange-800 p-3" data-wedding-production-next-action={projectId}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-[8px] tracking-[0.14em] font-semibold text-orange-700 dark:text-orange-300">PRODUCTION NEXT ACTION / {projectId.toUpperCase()}</p>
          <p className="mt-1 text-[11px] font-semibold text-navy-800 dark:text-sand-100">{next.overallState}</p>
          <p className="mt-1 text-[8px] leading-4 text-navy-500 dark:text-navy-300">Motion StudioのOpening/Profile production statusを再利用したoperator surfaceです。表示・copyだけでコマンド実行やHuman reviewを代行しません。</p>
        </div>
        <span className="border border-orange-300 dark:border-orange-800 px-2 py-1 font-mono text-[8px] text-orange-700 dark:text-orange-300">{action?.kind ?? "NONE"}</span>
      </div>

      {action ? (
        <div className="mt-3 border border-orange-200 dark:border-orange-900 p-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-[7px] font-semibold uppercase tracking-wide text-orange-700 dark:text-orange-300">
                {action.kind === "INPUT_REQUIRED" ? "素材パスを指定して開始" : action.kind === "HUMAN" ? "Human action required" : "次に実行するcommand"}
              </p>
              {action.kind === "INPUT_REQUIRED" ? <p className="mt-1 text-[7px] leading-3 opacity-70">`/ABS/PATH/TO/...`を実素材の絶対パスへ置き換えてから実行してください。</p> : null}
            </div>
            <button type="button" onClick={() => void copyAction()} className="border border-orange-300 dark:border-orange-800 px-2.5 py-1.5 text-[8px] font-semibold text-orange-700 dark:text-orange-300">{copied ? "COPIED ✓" : "次Actionをコピー"}</button>
          </div>
          <code className="mt-2 block max-w-full overflow-x-auto whitespace-nowrap text-[8px] leading-4">{action.text}</code>
        </div>
      ) : <p className="mt-3 text-[8px] text-navy-400">現在のstatusには次Actionがありません。</p>}

      {next.actions.length > 1 ? (
        <details className="mt-2">
          <summary className="cursor-pointer text-[8px] font-semibold text-orange-700 dark:text-orange-300">このstageの後続手順 {next.actions.length}件</summary>
          <ol className="mt-2 space-y-1 text-[7px]">
            {next.actions.map((item) => <li key={`${item.index}:${item.text}`} className="border border-sand-200 dark:border-navy-700 px-2 py-1.5"><span className="mr-2 font-mono opacity-60">{item.index + 1}. {item.kind}</span><code>{item.text}</code></li>)}
          </ol>
        </details>
      ) : null}

      <p className="mt-2 border-l-2 border-amber-300 pl-2 text-[7px] leading-3 text-amber-800 dark:text-amber-200">NEXT_ACTION表示 / clipboard copy ≠ action executed ≠ Human review PASS ≠ Remotion Studio GUI Actual PASS ≠ Mac DaVinci GUI Actual PASS ≠ productionReady。GUI Actualは実機で実行した場合だけ記録します。</p>
    </section>
  );
}
