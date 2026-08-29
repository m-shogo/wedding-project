import {useMemo, useState} from "react";
import {getWeddingProductionNextGate, type WeddingMovieId} from "../data/weddingProductionNextGate";
import {ProductionMediaIntakeCliGuide} from "./ProductionMediaIntakeCliGuide";

function badgeClass(kind: "COMMAND" | "HUMAN" | "INPUT_REQUIRED") {
  if (kind === "COMMAND") return "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-300";
  if (kind === "INPUT_REQUIRED") return "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/20 dark:text-amber-300";
  return "border-sky-300 bg-sky-50 text-sky-700 dark:border-sky-800 dark:bg-sky-950/20 dark:text-sky-300";
}

export function WeddingProductionNextGatePanel() {
  const report = useMemo(() => getWeddingProductionNextGate(), []);
  const [projectId, setProjectId] = useState<WeddingMovieId>(report.selectedNextTarget?.movieId ?? "opening");
  const [copied, setCopied] = useState<string | null>(null);
  const project = report.projects.find((item) => item.movieId === projectId)!;

  async function copy(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(value);
      window.setTimeout(() => setCopied(null), 1400);
    } catch {
      setCopied(null);
    }
  }

  return (
    <section className="mb-10 border-2 border-amber-200 bg-amber-50/20 dark:border-amber-900 dark:bg-amber-950/10">
      <div className="border-b border-amber-100 p-4 md:p-5 dark:border-amber-900/60">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-amber-700 dark:text-amber-300">PRODUCTION NEXT GATE / MOTION STUDIO AUTHORITY</p>
            <h2 className="mt-1 text-lg font-bold text-navy-900 dark:text-sand-100">今やるべき1工程を、Motion Zukanから迷わず確認する</h2>
            <p className="mt-2 text-xs leading-5 text-navy-500 dark:text-navy-300">
              Motion Studioから同期されたOpening / Profile production statusだけを読んで、次の工程をCOMMAND・INPUT_REQUIRED・HUMANに分離します。ここで表示しただけでは実行・承認・GUI Actualには昇格しません。
            </p>
          </div>
          <div className="flex gap-2">
            {report.projects.map((item) => (
              <button key={item.movieId} type="button" onClick={() => setProjectId(item.movieId)} className={`border px-3 py-2 text-xs font-semibold ${projectId === item.movieId ? "border-amber-500 text-amber-700 dark:text-amber-300" : "border-sand-300 dark:border-navy-600"}`}>
                {item.movieId === "opening" ? "Opening" : "Profile"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-5 p-4 md:p-5">
        <div className="grid gap-3 md:grid-cols-3">
          <div className="border border-sand-200 p-3 dark:border-navy-700">
            <p className="text-[10px] text-navy-400">CURRENT STATE</p>
            <p className="mt-1 text-sm font-bold text-navy-800 dark:text-sand-100">{project.overallState}</p>
          </div>
          <div className="border border-sand-200 p-3 dark:border-navy-700">
            <p className="text-[10px] text-navy-400">NEXT ACTION TYPE</p>
            <span className={`mt-1 inline-block border px-2 py-1 text-[10px] font-bold ${badgeClass(project.firstAction?.kind ?? "HUMAN")}`}>
              {project.firstAction?.kind ?? "NONE"}
            </span>
          </div>
          <div className="border border-sand-200 p-3 dark:border-navy-700">
            <p className="text-[10px] text-navy-400">PRODUCTION READY</p>
            <p className="mt-1 text-sm font-bold text-navy-800 dark:text-sand-100">{project.productionReady ? "YES" : "NO"}</p>
          </div>
        </div>

        {project.firstAction && (
          <div className="border-2 border-amber-300 p-4 dark:border-amber-800">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.16em] text-amber-700 dark:text-amber-300">EXACT NEXT ACTION</p>
                <p className="mt-1 text-xs text-navy-500 dark:text-navy-300">
                  {project.firstAction.kind === "INPUT_REQUIRED" ? "実ファイルの場所を指定してから進む工程です。placeholderのまま実行しません。" : project.firstAction.kind === "HUMAN" ? "Human review / GUI操作が先です。後続commandを自動実行しません。" : "Human/Input barrierより前にあるmachine-safe commandです。"}
                </p>
              </div>
              <span className={`border px-2 py-1 text-[10px] font-bold ${badgeClass(project.firstAction.kind)}`}>{project.firstAction.kind}</span>
            </div>
            <button type="button" onClick={() => copy(project.firstAction!.text)} className="mt-3 w-full border border-sand-300 bg-white px-3 py-3 text-left font-mono text-[10px] leading-5 text-navy-700 break-all dark:border-navy-600 dark:bg-navy-900 dark:text-navy-200">
              {copied === project.firstAction.text ? "✓ copied" : project.firstAction.text}
            </button>
          </div>
        )}

        {project.inputRequiredBeforeFurtherAutomation && <ProductionMediaIntakeCliGuide project={project.movieId} />}

        <div>
          <p className="mb-2 text-[10px] font-semibold tracking-[0.16em] text-navy-500 dark:text-navy-300">PIPELINE BLOCKERS / FIRST 5</p>
          <div className="space-y-2">
            {project.blockedStages.slice(0, 5).map((stage) => (
              <div key={stage.stageId} className="grid gap-1 border border-sand-200 p-3 text-xs dark:border-navy-700 md:grid-cols-[10rem_6rem_1fr]">
                <strong className="text-navy-700 dark:text-sand-100">{stage.stageId}</strong>
                <span className="font-mono text-[10px] text-navy-400">{stage.state}</span>
                <span className="text-navy-500 dark:text-navy-300">{stage.detail}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-2 text-[10px] text-navy-500 dark:text-navy-300 sm:grid-cols-3">
          <div className="border border-sand-200 p-2 dark:border-navy-700">Remotion Studio GUI Actual: <strong>NOT_RUN</strong></div>
          <div className="border border-sand-200 p-2 dark:border-navy-700">Mac DaVinci GUI Actual: <strong>NOT_RUN</strong></div>
          <div className="border border-sand-200 p-2 dark:border-navy-700">Final Delivery Approval: <strong>NO</strong></div>
        </div>
        <p className="text-[10px] leading-5 text-navy-400">DASHBOARD_NEXT_GATE != ACTION_EXECUTED / INPUT_REQUIRED != AUTOMATION_SAFE_COMMAND / HUMAN_ACTION_MUST_NOT_BE_AUTOMATED</p>
      </div>
    </section>
  );
}
