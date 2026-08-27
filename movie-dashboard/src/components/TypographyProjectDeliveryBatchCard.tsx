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
  const openingMedia = manifest.productionWorkspace.openingV1Media;
  const profileMedia = manifest.productionWorkspace.profileV1Media;

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

      {openingMedia ? (
        <div className="mt-2 border border-sky-200 dark:border-sky-800 p-2">
          <div className="flex flex-wrap items-center justify-between gap-2 text-[8px]">
            <span className="font-semibold text-sky-800 dark:text-sky-200">OPENING V1 / MOTION STUDIO MEDIA GATE</span>
            <span className={openingMedia.blockingGatePass ? "text-emerald-700 dark:text-emerald-300" : "text-amber-700 dark:text-amber-300"}>
              {openingMedia.blockingGatePass ? "BLOCKING GATE PASS" : "BLOCKING GATE BLOCKED"}
            </span>
          </div>
          <div className="mt-1 grid grid-cols-1 gap-1 sm:grid-cols-3 text-[8px]">
            <div className="border border-sand-200 dark:border-navy-700 px-2 py-1.5">写真 {openingMedia.resolvedPhotoCount}/{openingMedia.expectedPhotoCount}</div>
            <div className="border border-sand-200 dark:border-navy-700 px-2 py-1.5">BGM {openingMedia.bgm.playable ? "PLAYABLE" : `BLOCKED / ${openingMedia.bgm.status}`}</div>
            <div className="border border-sand-200 dark:border-navy-700 px-2 py-1.5">現地音 {openingMedia.ambiencePlayableCount}/{openingMedia.ambienceExpectedCount} {openingMedia.ambienceReadyForMix ? "MIX READY" : "MIX NOT READY"}</div>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-1 sm:grid-cols-4">
            {openingMedia.photoSlots.map((slot) => (
              <div key={slot.key} className={`border px-2 py-1 text-[7px] ${slot.resolved ? "border-emerald-200 text-emerald-700 dark:border-emerald-800 dark:text-emerald-300" : "border-amber-200 text-amber-700 dark:border-amber-800 dark:text-amber-300"}`}>
                {slot.resolved ? "PASS" : "MISSING"} / {slot.key}
              </div>
            ))}
          </div>
          {!openingMedia.blockingGatePass ? (
            <p className="mt-2 text-[8px] leading-4 text-amber-800 dark:text-amber-200">次: {openingMedia.nextAction}</p>
          ) : !openingMedia.ambienceReadyForMix ? (
            <p className="mt-2 text-[8px] leading-4 text-amber-800 dark:text-amber-200">写真/BGM blocking gateは通過。現地音4種はfinal blockではなくmix readinessとして残っています。</p>
          ) : (
            <p className="mt-2 text-[8px] leading-4 text-emerald-800 dark:text-emerald-200">11写真・BGM・現地音がMotion Studio正本で揃っています。crop / motion / color / audio QAへ進めます。</p>
          )}
        </div>
      ) : null}

      {profileMedia ? (
        <div className="mt-2 border border-fuchsia-200 dark:border-fuchsia-800 p-2">
          <div className="flex flex-wrap items-center justify-between gap-2 text-[8px]">
            <span className="font-semibold text-fuchsia-800 dark:text-fuchsia-200">PROFILE V1 / MOTION STUDIO MEDIA GATE</span>
            <span className={profileMedia.blockingGatePass ? "text-emerald-700 dark:text-emerald-300" : "text-amber-700 dark:text-amber-300"}>
              {profileMedia.blockingGatePass ? "BLOCKING GATE PASS" : "BLOCKING GATE BLOCKED"}
            </span>
          </div>
          <div className="mt-1 grid grid-cols-1 gap-1 sm:grid-cols-3 text-[8px]">
            <div className="border border-sand-200 dark:border-navy-700 px-2 py-1.5">実素材 {profileMedia.resolvedMediaCount}/{profileMedia.expectedMediaCount}</div>
            <div className="border border-sand-200 dark:border-navy-700 px-2 py-1.5">BGM {profileMedia.bgm.ready ? "READY" : `BLOCKED / ${profileMedia.bgm.rightsState}`}</div>
            <div className="border border-sand-200 dark:border-navy-700 px-2 py-1.5">QA preview={profileMedia.qa.preview} / Mac={profileMedia.qa.macDaVinciActual}</div>
          </div>
          <div className="mt-2 grid grid-cols-1 gap-1 sm:grid-cols-5">
            {profileMedia.chapters.map((chapter) => (
              <div key={chapter.chapterId} className={`border px-2 py-1 text-[7px] ${chapter.ready ? "border-emerald-200 text-emerald-700 dark:border-emerald-800 dark:text-emerald-300" : "border-amber-200 text-amber-700 dark:border-amber-800 dark:text-amber-300"}`}>
                {chapter.order}. {chapter.title} {chapter.readyCount}/{chapter.requiredCount}
              </div>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-2 gap-1 sm:grid-cols-4">
            {profileMedia.mediaSlots.map((slot) => (
              <div key={slot.id} className={`border px-2 py-1 text-[7px] ${slot.ready ? "border-emerald-200 text-emerald-700 dark:border-emerald-800 dark:text-emerald-300" : "border-amber-200 text-amber-700 dark:border-amber-800 dark:text-amber-300"}`}>
                {slot.ready ? "PASS" : "MISSING"} / {slot.label}
              </div>
            ))}
          </div>
          {!profileMedia.blockingGatePass ? (
            <p className="mt-2 text-[8px] leading-4 text-amber-800 dark:text-amber-200">次: {profileMedia.nextActions.join(" → ")}</p>
          ) : (
            <p className="mt-2 text-[8px] leading-4 text-emerald-800 dark:text-emerald-200">5章17実素材roleとBGM gateが揃っています。preview / Human content / audio QAへ進めます。</p>
          )}
        </div>
      ) : null}

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
          Typography routeは揃っていますが、実制作handoffは停止中です。Workspace final checksに加え、Openingは11写真/BGM、Profileは5章17実素材role/BGM権利のMotion Studio gateを解消してください。
        </p>
      ) : (
        <p className="mt-2 border border-emerald-200 dark:border-emerald-800 p-2 text-[8px] leading-4 text-emerald-800 dark:text-emerald-200">
          Palmier→DaVinci assembly用のScene/素材/曲マーカー/デザイン/Typography情報が揃っています。ただしMac Actual / Human review / Scene Releaseは未完了なら各Sceneで別途必要です。
        </p>
      )}

      {manifest.handoff.warnings.length > 0 ? (
        <div className="mt-2 border border-amber-200 dark:border-amber-800 p-2 text-[8px] leading-4 text-amber-800 dark:text-amber-200">
          {manifest.handoff.warnings.map((warning) => <div key={warning}>WARN / {warning}</div>)}
        </div>
      ) : null}

      <details className="mt-2">
        <summary className="cursor-pointer text-[8px] text-violet-700 dark:text-violet-300">Production handoff manifest JSON</summary>
        <pre className="mt-2 max-h-72 overflow-auto whitespace-pre-wrap border border-sand-200 dark:border-navy-600 p-2 text-[8px] leading-4 text-navy-500 dark:text-navy-300">{manifestJson}</pre>
      </details>
    </section>
  );
}
