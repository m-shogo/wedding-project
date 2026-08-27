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
  previewSourceBinding: "Preview source binding",
  previewReview: "Human preview QA",
  finalRender: "Final render",
  finalRenderReview: "Human final MP4 QA",
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
  const sourceRevalidation = production.sourceRevalidation;
  const palmier = production.palmierHandoff;
  const davinci = production.davinciHandoff;

  return (
    <section className="mt-3 border border-sky-300 dark:border-sky-800 p-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-[9px] tracking-[0.16em] font-semibold text-sky-700 dark:text-sky-300">OPENING V1 / FINAL PRODUCTION STATUS</p>
          <p className="mt-1 text-[10px] font-semibold text-navy-800 dark:text-sand-100">{production.overallState}</p>
          <p className="mt-1 text-[8px] text-navy-400">
            photos={media.resolvedPhotoCount}/{media.expectedPhotoCount} / BGM={media.bgm.playable ? "PLAYABLE" : media.bgm.status} / productionReady={production.readiness.productionReady ? "YES" : "NO"}
          </p>
        </div>
        <button type="button" onClick={() => downloadText(json, "opening-production-status-handoff.json")} className="border border-sky-300 dark:border-sky-700 px-2.5 py-1.5 text-[9px] font-semibold text-sky-700 dark:text-sky-300">
          Opening production statusを書き出す
        </button>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-1 sm:grid-cols-4">
        {Object.entries(production.stages).map(([key, stage]) => {
          const state = String(stage.state);
          const complete = !incompleteStageStates.has(state);
          return (
            <div key={key} className={`border px-2 py-1.5 text-[8px] ${complete ? "border-emerald-200 text-emerald-700 dark:border-emerald-800 dark:text-emerald-300" : "border-amber-200 text-amber-700 dark:border-amber-800 dark:text-amber-300"}`}>
              <span className="font-semibold">{stageLabel[key] ?? key}</span>: {state}
            </div>
          );
        })}
      </div>

      <div className="mt-2 grid grid-cols-2 gap-1 sm:grid-cols-6 text-[8px] text-navy-500 dark:text-navy-300">
        <div className="border border-sand-200 dark:border-navy-700 px-2 py-1.5">Final render eligible: {production.readiness.finalRenderEligible ? "YES" : "NO"}</div>
        <div className="border border-sand-200 dark:border-navy-700 px-2 py-1.5">Preview source: {production.readiness.previewSourceBound ? "CURRENT" : "NOT BOUND"}</div>
        <div className="border border-sand-200 dark:border-navy-700 px-2 py-1.5">Human preview: {production.readiness.humanPreviewApproved ? "PASS" : "NOT PASS"}</div>
        <div className="border border-sand-200 dark:border-navy-700 px-2 py-1.5">Human final MP4: {production.readiness.humanFinalRenderApproved ? "PASS" : "NOT PASS"}</div>
        <div className="border border-sand-200 dark:border-navy-700 px-2 py-1.5">Mac DaVinci: {production.readiness.macDaVinciActualVerified ? "VERIFIED" : "NOT_RUN"}</div>
        <div className="border border-sand-200 dark:border-navy-700 px-2 py-1.5">Final approval: {production.readiness.finalDeliveryApproved ? "APPROVED" : "NOT APPROVED"}</div>
      </div>

      <div className="mt-2 border border-amber-200 dark:border-amber-800 p-2">
        <p className="text-[8px] font-semibold text-amber-700 dark:text-amber-300">SOURCE / HUMAN REVIEW REVALIDATION</p>
        <div className="mt-1 text-[8px] leading-4 text-navy-500 dark:text-navy-300">
          <div>Real-media preview source: <span className="font-semibold">{sourceRevalidation.realMediaPreview.state}</span></div>
          {sourceRevalidation.realMediaPreview.blockers.length > 0 ? <div>preview blockers: {sourceRevalidation.realMediaPreview.blockers.join(" / ")}</div> : null}
          {sourceRevalidation.realMediaPreview.recovery.length > 0 ? <div>preview recovery: {sourceRevalidation.realMediaPreview.recovery.join(" → ")}</div> : null}
          <div className="mt-1">Final MP4 Human review: <span className="font-semibold">{sourceRevalidation.finalRender.state}</span></div>
          {sourceRevalidation.finalRender.blockers.length > 0 ? <div>final blockers: {sourceRevalidation.finalRender.blockers.join(" / ")}</div> : null}
          {sourceRevalidation.finalRender.recovery.length > 0 ? <div>final recovery: {sourceRevalidation.finalRender.recovery.join(" → ")}</div> : null}
        </div>
        <p className="mt-1 text-[8px] text-navy-400">{sourceRevalidation.guardrails.join(" / ")}</p>
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
      </div>

      <div className="mt-2 border border-indigo-200 dark:border-indigo-800 p-2">
        <div className="flex flex-wrap items-center justify-between gap-1">
          <p className="text-[8px] font-semibold text-indigo-700 dark:text-indigo-300">DAVINCI HANDOFF / {davinci.contractVersion}</p>
          <span className="text-[8px] text-indigo-600 dark:text-indigo-300">handoff={davinci.current ? "CURRENT" : "NOT_EXPORTED_OR_STALE"}</span>
        </div>
        <div className="mt-1 text-[8px] leading-4 text-navy-500 dark:text-navy-300">
          <div>source: <code className="break-all">{davinci.handoffAsset.path}</code></div>
          <div>expected SHA: <code>{davinci.handoffAsset.expectedSha256 ?? "PENDING_BUNDLE_EXPORT"}</code></div>
          <div>use: {davinci.handoffAsset.intendedUse}</div>
          <div>Actual evidence: <code className="break-all">{davinci.actualEvidence.path}</code></div>
          <div>required: {davinci.actualEvidence.requiredChecks.join(" / ")}</div>
        </div>
        <p className="mt-1 text-[8px] text-navy-400">HUMAN_FINAL_RENDER_REVIEW_PASS != DAVINCI_ACTUAL_VERIFIED / DAVINCI_HANDOFF_CURRENT != MAC_DAVINCI_ACTUAL_VERIFIED</p>
      </div>

      <div className="mt-2 border border-sky-100 dark:border-sky-900 p-2">
        <p className="text-[8px] font-semibold text-sky-700 dark:text-sky-300">NEXT ACTIONS</p>
        <ol className="mt-1 space-y-1 text-[8px] leading-4 text-navy-500 dark:text-navy-300">
          {production.nextActions.map((action, index) => <li key={`${index}-${action}`}>{index + 1}. <code>{action}</code></li>)}
        </ol>
      </div>

      <p className="mt-2 text-[8px] leading-4 text-navy-400">
        このstatusはMEDIA_REQUIRED / NOT_RUNも含めて現在状態とPalmier / DaVinci handoff contractを外へ渡すためのenvelopeです。Statusのexport可否とproduction readinessは分離しています。
        `STATUS_EXPORTABLE != FINAL_RENDER_ELIGIBLE` / `PREVIEW_REVIEW_PASS != FINAL_RENDER_REVIEW_PASS` / `FINAL_RENDER_OR_SOURCE_CHANGED =&gt; FINAL_RENDER_RE_REVIEW_REQUIRED` / `HANDOFF_METADATA_EXPORTED != HANDOFF_ARTIFACTS_CURRENT` / `HUMAN_FINAL_RENDER_REVIEW_PASS != DAVINCI_ACTUAL_VERIFIED` / `DAVINCI_ACTUAL_VERIFIED != FINAL_DELIVERY_APPROVED`
      </p>

      <details className="mt-2">
        <summary className="cursor-pointer text-[8px] text-sky-700 dark:text-sky-300">Opening production status JSON</summary>
        <pre className="mt-2 max-h-72 overflow-auto whitespace-pre-wrap border border-sand-200 dark:border-navy-600 p-2 text-[8px] leading-4 text-navy-500 dark:text-navy-300">{json}</pre>
      </details>
    </section>
  );
}
