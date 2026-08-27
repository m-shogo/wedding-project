import {useEffect, useMemo, useState} from "react";
import {
  loadMotionZukanProductionWorkspaceState,
  MOTION_ZUKAN_PRODUCTION_WORKSPACE_CHANGED_EVENT,
} from "../data/motionZukanProductionWorkspace";
import {
  buildProjectProductionHandoffManifest,
  buildProjectProductionHandoffManifestJson,
} from "../data/projectProductionHandoffManifest";
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
  const snapshot = useMemo(() => {
    const composer = loadMotionZukanComposerState();
    const workspace = loadMotionZukanProductionWorkspaceState();
    const selections = listTypographyProductionSelections();
    const timeline = composer.timelines.find((item) => item.projectId === projectId);
    if (!timeline) return null;
    return {
      batch: buildTypographyProjectDeliveryBatch(projectId, composer.scenes, timeline, selections),
      batchJson: buildTypographyProjectDeliveryBatchJson(projectId, composer.scenes, timeline, selections),
      manifest: buildProjectProductionHandoffManifest(projectId, composer, workspace, selections),
      manifestJson: buildProjectProductionHandoffManifestJson(projectId, composer, workspace, selections),
    };
  }, [projectId, revision]);

  useEffect(() => {
    const refresh = () => setRevision((value) => value + 1);
    window.addEventListener(MOTION_ZUKAN_COMPOSER_CHANGED_EVENT, refresh);
    window.addEventListener(MOTION_ZUKAN_PRODUCTION_WORKSPACE_CHANGED_EVENT, refresh);
    window.addEventListener(TYPOGRAPHY_PRODUCTION_SELECTION_CHANGED_EVENT, refresh);
    return () => {
      window.removeEventListener(MOTION_ZUKAN_COMPOSER_CHANGED_EVENT, refresh);
      window.removeEventListener(MOTION_ZUKAN_PRODUCTION_WORKSPACE_CHANGED_EVENT, refresh);
      window.removeEventListener(TYPOGRAPHY_PRODUCTION_SELECTION_CHANGED_EVENT, refresh);
    };
  }, []);

  if (!snapshot) return null;
  const {batch, batchJson, manifest, manifestJson} = snapshot;
  const routeReady = batch.summary.batchReadyForPalmierDaVinciHandoff;
  const assemblyReady = manifest.handoff.readyForPalmierDaVinciAssembly;

  return (
    <section className="mt-3 border border-emerald-200 dark:border-emerald-800 p-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-[9px] tracking-[0.16em] font-semibold text-emerald-700 dark:text-emerald-300">PROJECT DELIVERY BATCH / {projectId.toUpperCase()}</p>
          <p className="mt-1 text-[10px] font-semibold text-navy-800 dark:text-sand-100">
            {batch.summary.currentPackages}/{batch.summary.totalScenes} Scene package ready
          </p>
          <p className="mt-1 text-[9px] text-navy-400">
            未選択 {batch.summary.missingRoutes} / stale {batch.summary.staleRoutes} / workspace checks {manifest.productionWorkspace.finalChecksPass ? "PASS" : "BLOCKED"} / productionReady=NO
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            disabled={!routeReady}
            onClick={() => downloadText(batchJson, `${projectId}-typography-production-batch.json`)}
            className="border border-emerald-300 dark:border-emerald-700 px-2.5 py-1.5 text-[9px] font-semibold text-emerald-700 dark:text-emerald-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Typography package一括書き出し
          </button>
          <button
            type="button"
            disabled={!assemblyReady}
            onClick={() => downloadText(manifestJson, `${projectId}-production-handoff-manifest.json`)}
            className="border border-violet-300 dark:border-violet-700 px-2.5 py-1.5 text-[9px] font-semibold text-violet-700 dark:text-violet-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            実制作handoff manifest
          </button>
        </div>
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

      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-1">
        {manifest.productionWorkspace.finalChecks.map((check) => (
          <div key={check.id} className={`border px-2 py-1.5 text-[8px] ${check.ok ? "border-emerald-200 text-emerald-700 dark:border-emerald-800 dark:text-emerald-300" : "border-amber-200 text-amber-700 dark:border-amber-800 dark:text-amber-300"}`}>
            {check.ok ? "PASS" : "BLOCK"} / {check.label}: {check.detail}
          </div>
        ))}
      </div>

      {!routeReady ? (
        <p className="mt-2 border border-amber-200 dark:border-amber-800 p-2 text-[8px] leading-4 text-amber-800 dark:text-amber-200">
          Typography batch exportを停止中。全Sceneで現在revisionに対するHuman-selected Typography routeが必要です。未選択/stale Sceneをsilent skipしません。
        </p>
      ) : !assemblyReady ? (
        <p className="mt-2 border border-amber-200 dark:border-amber-800 p-2 text-[8px] leading-4 text-amber-800 dark:text-amber-200">
          Typography routeは揃いましたが、実制作handoffは停止中です。全Sceneの素材割当・仮素材除去・DONE状態・素材重複確認などProduction Workspace final checksを解消してください。
        </p>
      ) : (
        <p className="mt-2 border border-emerald-200 dark:border-emerald-800 p-2 text-[8px] leading-4 text-emerald-800 dark:text-emerald-200">
          Palmier→DaVinci assembly用のScene/素材/曲マーカー/デザイン/Typography情報が揃っています。ただしMac Actual / Human review / Scene Releaseは未完了なら各Sceneで別途必要です。
        </p>
      )}

      <details className="mt-2">
        <summary className="cursor-pointer text-[8px] text-violet-700 dark:text-violet-300">Production handoff manifest JSON</summary>
        <pre className="mt-2 max-h-72 overflow-auto whitespace-pre-wrap border border-sand-200 dark:border-navy-600 p-2 text-[8px] leading-4 text-navy-500 dark:text-navy-300">{manifestJson}</pre>
      </details>
    </section>
  );
}
