import {useMemo} from "react";
import {
  buildOpeningProductionStatusHandoff,
  buildOpeningProductionStatusHandoffJson,
} from "../data/openingProductionStatusHandoff";
import type {SceneProjectId} from "../data/visualSceneComposer";
import {downloadText} from "../lib/exporters";

const stageLabel: Record<string, string> = {
  media: "Real media",
  previewRender: "Preview render",
  previewReview: "Human preview QA",
  finalRender: "Final render",
  productionBundle: "Production bundle",
  davinciFinishing: "DaVinci Actual",
  finalDeliveryApproval: "Final approval",
};

const incompleteStageStates = new Set(["NOT_RUN", "BLOCKED", "MISSING", "STALE"]);

export function OpeningProductionStatusHandoffCard({projectId}: {projectId: SceneProjectId}) {
  const status = useMemo(() => buildOpeningProductionStatusHandoff(), []);
  const json = useMemo(() => buildOpeningProductionStatusHandoffJson(), []);

  if (projectId !== "opening") return null;

  const production = status.opening.production;
  const media = status.opening.media;
  const palmier = production.palmierHandoff;

  return (
    <section className="mt-3 border border-sky-300 dark:border-sky-800 p-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-[9px] tracking-[0.16em] font-semibold text-sky-700 dark:text-sky-300">
            OPENING V1 / FINAL PRODUCTION STATUS
          </p>
          <p className="mt-1 text-[10px] font-semibold text-navy-800 dark:text-sand-100">
            {production.overallState}
          </p>
          <p className="mt-1 text-[8px] text-navy-400">
            photos={media.resolvedPhotoCount}/{media.expectedPhotoCount} / BGM={media.bgm.playable ? "PLAYABLE" : media.bgm.status} / productionReady={production.readiness.productionReady ? "YES" : "NO"}
          </p>
        </div>
        <button
          type="button"
          onClick={() => downloadText(json, "opening-production-status-handoff.json")}
          className="border border-sky-300 dark:border-sky-700 px-2.5 py-1.5 text-[9px] font-semibold text-sky-700 dark:text-sky-300"
        >
          Opening production statusを書き出す
        </button>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-1 sm:grid-cols-4">
        {Object.entries(production.stages).map(([key, stage]) => {
          const state = String(stage.state);
          const complete = !incompleteStageStates.has(state);
          return (
            <div
              key={key}
              className={`border px-2 py-1.5 text-[8px] ${complete ? "border-emerald-200 text-emerald-700 dark:border-emerald-800 dark:text-emerald-300" : "border-amber-200 text-amber-700 dark:border-amber-800 dark:text-amber-300"}`}
            >
              <span className="font-semibold">{stageLabel[key] ?? key}</span>: {state}
            </div>
          );
        })}
      </div>

      <div className="mt-2 grid grid-cols-2 gap-1 sm:grid-cols-4 text-[8px] text-navy-500 dark:text-navy-300">
        <div className="border border-sand-200 dark:border-navy-700 px-2 py-1.5">Final render eligible: {production.readiness.finalRenderEligible ? "YES" : "NO"}</div>
        <div className="border border-sand-200 dark:border-navy-700 px-2 py-1.5">Human preview: {production.readiness.humanPreviewApproved ? "PASS" : "NOT PASS"}</div>
        <div className="border border-sand-200 dark:border-navy-700 px-2 py-1.5">Mac DaVinci: {production.readiness.macDaVinciActualVerified ? "VERIFIED" : "NOT_RUN"}</div>
        <div className="border border-sand-200 dark:border-navy-700 px-2 py-1.5">Final approval: {production.readiness.finalDeliveryApproved ? "APPROVED" : "NOT APPROVED"}</div>
      </div>

      <div className="mt-2 border border-violet-200 dark:border-violet-800 p-2">
        <div className="flex flex-wrap items-center justify-between gap-1">
          <p className="text-[8px] font-semibold text-violet-700 dark:text-violet-300">PALMIER HANDOFF / {palmier.contractVersion}</p>
          <span className="text-[8px] text-violet-600 dark:text-violet-300">artifacts={palmier.current ? "CURRENT" : "NOT_EXPORTED_OR_STALE"}</span>
        </div>
        <div className="mt-1 grid gap-1 sm:grid-cols-2 text-[8px] leading-4 text-navy-500 dark:text-navy-300">
          <div className="border border-violet-100 dark:border-violet-900 p-1.5">
            <p className="font-semibold">Scene timeline</p>
            <code className="break-all">{palmier.artifacts.sceneTimeline.path}</code>
            <p>{palmier.artifacts.sceneTimeline.carries.join(" / ")}</p>
          </div>
          <div className="border border-violet-100 dark:border-violet-900 p-1.5">
            <p className="font-semibold">Sound cues</p>
            <code className="break-all">{palmier.artifacts.soundCues.path}</code>
            <p>{palmier.artifacts.soundCues.carries.join(" / ")}</p>
          </div>
        </div>
        <p className="mt-1 text-[8px] text-navy-400">
          Motion Studio正本から派生するSHA-bound handoffです。metadataが見えていてもartifact currentを意味しません。
        </p>
      </div>

      <div className="mt-2 border border-sky-100 dark:border-sky-900 p-2">
        <p className="text-[8px] font-semibold text-sky-700 dark:text-sky-300">NEXT ACTIONS</p>
        <ol className="mt-1 space-y-1 text-[8px] leading-4 text-navy-500 dark:text-navy-300">
          {production.nextActions.map((action, index) => (
            <li key={`${index}-${action}`}>
              {index + 1}. <code>{action}</code>
            </li>
          ))}
        </ol>
      </div>

      <p className="mt-2 text-[8px] leading-4 text-navy-400">
        このstatusはMEDIA_REQUIRED / NOT_RUNも含めて現在状態とPalmier handoff contractを外へ渡すためのenvelopeです。Statusのexport可否とproduction readinessは分離しています。
        `STATUS_EXPORTABLE != FINAL_RENDER_ELIGIBLE` / `HANDOFF_METADATA_EXPORTED != HANDOFF_ARTIFACTS_CURRENT` / `DAVINCI_ACTUAL_VERIFIED != FINAL_DELIVERY_APPROVED` / `NEXT_ACTION_EXPORTED != ACTION_COMPLETED`
      </p>

      <details className="mt-2">
        <summary className="cursor-pointer text-[8px] text-sky-700 dark:text-sky-300">Opening production status JSON</summary>
        <pre className="mt-2 max-h-72 overflow-auto whitespace-pre-wrap border border-sand-200 dark:border-navy-600 p-2 text-[8px] leading-4 text-navy-500 dark:text-navy-300">{json}</pre>
      </details>
    </section>
  );
}
