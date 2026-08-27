import {useMemo} from "react";
import {
  buildWeddingMovieProductionCriticalPath,
  buildWeddingMovieProductionCriticalPathJson,
} from "../data/weddingMovieProductionCriticalPath";
import type {SceneProjectId} from "../data/visualSceneComposer";
import {downloadText} from "../lib/exporters";

const stageLabels: Record<string, string> = {
  media: "実写真・BGM",
  previewRender: "Real-media preview",
  previewSourceBinding: "Preview source binding",
  previewReview: "Human preview QA",
  assembly: "実素材 assembly",
  finalRender: "Final render",
  finalRenderReview: "Human final MP4 QA",
  productionBundle: "Production bundle",
  davinciFinishing: "DaVinci Actual",
  finalDeliveryApproval: "Final approval",
};

export function WeddingMovieProductionCriticalPathCard({projectId}: {projectId: SceneProjectId}) {
  const report = useMemo(() => buildWeddingMovieProductionCriticalPath(), []);
  const json = useMemo(() => buildWeddingMovieProductionCriticalPathJson(), []);
  if (projectId !== "opening" && projectId !== "profile") return null;

  const project = report.projects[projectId];
  const current = project.currentCriticalStage;

  return (
    <section className="mt-3 border-2 border-amber-300 dark:border-amber-700 p-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-[9px] tracking-[0.16em] font-semibold text-amber-700 dark:text-amber-300">NOW / PRODUCTION CRITICAL PATH</p>
          <p className="mt-1 text-[11px] font-semibold text-navy-800 dark:text-sand-100">
            {current ? `${stageLabels[current.name] ?? current.name} / ${current.state}` : "All canonical stages PASS"}
          </p>
          <p className="mt-1 text-[8px] text-navy-500 dark:text-navy-300">{current?.detail ?? "No remaining canonical production blocker."}</p>
          {current?.path ? <code className="mt-1 block break-all text-[8px] text-navy-400">{current.path}</code> : null}
        </div>
        <button type="button" onClick={() => downloadText(json, "wedding-movie-production-critical-path.json")} className="border border-amber-300 dark:border-amber-700 px-2.5 py-1.5 text-[9px] font-semibold text-amber-700 dark:text-amber-300">
          Critical pathを書き出す
        </button>
      </div>

      {current ? (
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          <div className="border border-amber-200 dark:border-amber-800 p-2 text-[8px] leading-4 text-navy-500 dark:text-navy-300">
            <p className="font-semibold text-amber-700 dark:text-amber-300">今やること</p>
            {current.recovery.length > 0 ? current.recovery.map((action, index) => <div key={`${index}-${action}`}>{index + 1}. <code>{action}</code></div>) : project.nextActions.map((action, index) => <div key={`${index}-${action}`}>{index + 1}. <code>{action}</code></div>)}
          </div>
          <div className="border border-sand-200 dark:border-navy-700 p-2 text-[8px] leading-4 text-navy-500 dark:text-navy-300">
            <p className="font-semibold">この後に解放される工程</p>
            <div>{project.downstreamBlockedStages.map((stage) => stageLabels[stage.name] ?? stage.name).join(" → ") || "none"}</div>
          </div>
        </div>
      ) : null}

      <div className="mt-2 grid gap-1 sm:grid-cols-2 text-[8px] text-navy-500 dark:text-navy-300">
        <div className="border border-sand-200 dark:border-navy-700 px-2 py-1.5">Opening: {report.projects.opening.overallState} / ready={report.projects.opening.productionReady ? "YES" : "NO"}</div>
        <div className="border border-sand-200 dark:border-navy-700 px-2 py-1.5">Profile: {report.projects.profile.overallState} / ready={report.projects.profile.productionReady ? "YES" : "NO"}</div>
      </div>
      <p className="mt-2 text-[8px] text-navy-400">{report.guardrails.join(" / ")}</p>
    </section>
  );
}
