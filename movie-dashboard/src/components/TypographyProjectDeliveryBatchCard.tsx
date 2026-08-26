import {useEffect, useMemo, useState} from "react";
import {
  buildTypographyProjectDeliveryBatch,
  buildTypographyProjectDeliveryBatchJson,
} from "../data/typographyProjectDeliveryBatch";
import {
  listTypographyProductionSelections,
  TYPOGRAPHY_PRODUCTION_SELECTION_CHANGED_EVENT,
} from "../data/typographyProductionSelectionStore";
import {
  loadMotionZukanComposerState,
  MOTION_ZUKAN_COMPOSER_CHANGED_EVENT,
  type SceneProjectId,
} from "../data/visualSceneComposer";
import {downloadText} from "../lib/exporters";

const statusLabel = {
  CURRENT_PACKAGE_READY: "CURRENT",
  MISSING_HUMAN_ROUTE: "ROUTE未選択",
  STALE_HUMAN_ROUTE: "ROUTE古い",
} as const;

export function TypographyProjectDeliveryBatchCard({projectId}: {projectId: SceneProjectId}) {
  const [revision, setRevision] = useState(0);
  const batch = useMemo(() => {
    const composer = loadMotionZukanComposerState();
    const timeline = composer.timelines.find((item) => item.projectId === projectId);
    if (!timeline) return null;
    return buildTypographyProjectDeliveryBatch(
      projectId,
      composer.scenes,
      timeline,
      listTypographyProductionSelections(),
    );
  }, [projectId, revision]);

  const json = useMemo(() => {
    const composer = loadMotionZukanComposerState();
    const timeline = composer.timelines.find((item) => item.projectId === projectId);
    if (!timeline) return null;
    return buildTypographyProjectDeliveryBatchJson(
      projectId,
      composer.scenes,
      timeline,
      listTypographyProductionSelections(),
    );
  }, [projectId, revision]);

  useEffect(() => {
    const refresh = () => setRevision((value) => value + 1);
    window.addEventListener(MOTION_ZUKAN_COMPOSER_CHANGED_EVENT, refresh);
    window.addEventListener(TYPOGRAPHY_PRODUCTION_SELECTION_CHANGED_EVENT, refresh);
    return () => {
      window.removeEventListener(MOTION_ZUKAN_COMPOSER_CHANGED_EVENT, refresh);
      window.removeEventListener(TYPOGRAPHY_PRODUCTION_SELECTION_CHANGED_EVENT, refresh);
    };
  }, []);

  if (!batch || !json) return null;
  const ready = batch.summary.batchReadyForPalmierDaVinciHandoff;

  return (
    <section className="mt-3 border border-emerald-200 dark:border-emerald-800 p-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-[9px] tracking-[0.16em] font-semibold text-emerald-700 dark:text-emerald-300">PROJECT DELIVERY BATCH / {projectId.toUpperCase()}</p>
          <p className="mt-1 text-[10px] font-semibold text-navy-800 dark:text-sand-100">
            {batch.summary.currentPackages}/{batch.summary.totalScenes} Scene package ready
          </p>
          <p className="mt-1 text-[9px] text-navy-400">
            未選択 {batch.summary.missingRoutes} / stale {batch.summary.staleRoutes} / productionReady=NO
          </p>
        </div>
        <button
          type="button"
          disabled={!ready}
          onClick={() => downloadText(json, `${projectId}-typography-production-batch.json`)}
          className="border border-emerald-300 dark:border-emerald-700 px-2.5 py-1.5 text-[9px] font-semibold text-emerald-700 dark:text-emerald-300 disabled:cursor-not-allowed disabled:opacity-40"
        >
          全Scene package一括書き出し
        </button>
      </div>

      <div className="mt-2 space-y-1">
        {batch.scenes.map((item, index) => (
          <div key={item.sceneId} className="flex flex-wrap items-center justify-between gap-2 border border-sand-200 dark:border-navy-700 px-2 py-1.5 text-[8px]">
            <span className="font-mono text-navy-500 dark:text-navy-300">{index + 1}. {item.sceneId}</span>
            <span className={item.status === "CURRENT_PACKAGE_READY" ? "text-emerald-700 dark:text-emerald-300" : "text-amber-700 dark:text-amber-300"}>
              {statusLabel[item.status]}{item.selectedPatternId ? ` / ${item.selectedPatternId}` : ""}
            </span>
          </div>
        ))}
      </div>

      {!ready ? (
        <p className="mt-2 border border-amber-200 dark:border-amber-800 p-2 text-[8px] leading-4 text-amber-800 dark:text-amber-200">
          batch exportを停止中。全Sceneで現在revisionに対するHuman-selected Typography routeが必要です。未選択/stale Sceneをsilent skipしません。
        </p>
      ) : (
        <p className="mt-2 border border-emerald-200 dark:border-emerald-800 p-2 text-[8px] leading-4 text-emerald-800 dark:text-emerald-200">
          Palmier→DaVinci handoff packageは揃っています。ただしMac Actual / Human review / Scene Releaseは未完了なら各Sceneで別途必要です。
        </p>
      )}

      <details className="mt-2">
        <summary className="cursor-pointer text-[8px] text-emerald-700 dark:text-emerald-300">Batch JSON</summary>
        <pre className="mt-2 max-h-72 overflow-auto whitespace-pre-wrap border border-sand-200 dark:border-navy-600 p-2 text-[8px] leading-4 text-navy-500 dark:text-navy-300">{json}</pre>
      </details>
    </section>
  );
}
