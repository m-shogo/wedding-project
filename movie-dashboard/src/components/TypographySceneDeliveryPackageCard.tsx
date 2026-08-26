import {useEffect, useMemo, useState} from "react";
import {
  buildTypographySceneDeliveryPackage,
  buildTypographySceneDeliveryPackageJson,
} from "../data/typographySceneDeliveryPackage";
import {
  loadTypographyProductionSelection,
  TYPOGRAPHY_PRODUCTION_SELECTION_CHANGED_EVENT,
} from "../data/typographyProductionSelectionStore";
import type {MaskRevealSceneInstance} from "../data/visualSceneComposer";
import {downloadText} from "../lib/exporters";

export function TypographySceneDeliveryPackageCard({scene}: {scene: MaskRevealSceneInstance}) {
  const [revision, setRevision] = useState(0);
  const selection = useMemo(
    () => loadTypographyProductionSelection(scene),
    [scene.sceneId, scene.updatedAt, revision],
  );
  const delivery = useMemo(
    () => (selection ? buildTypographySceneDeliveryPackage(scene, selection) : null),
    [scene, selection],
  );
  const json = useMemo(
    () => (selection ? buildTypographySceneDeliveryPackageJson(scene, selection) : null),
    [scene, selection],
  );

  useEffect(() => {
    const refresh = () => setRevision((value) => value + 1);
    window.addEventListener(TYPOGRAPHY_PRODUCTION_SELECTION_CHANGED_EVENT, refresh);
    return () => window.removeEventListener(TYPOGRAPHY_PRODUCTION_SELECTION_CHANGED_EVENT, refresh);
  }, []);

  if (!delivery || !json) {
    return (
      <section className="mt-3 border border-sky-200 dark:border-sky-800 p-3">
        <p className="text-[9px] tracking-[0.16em] font-semibold text-sky-700 dark:text-sky-300">SCENE DELIVERY PACKAGE</p>
        <p className="mt-1 text-[9px] leading-4 text-navy-400">Typography routeを人間が選択すると、Palmier timingとDaVinci handoffを1 Scene単位のproduction packageとして書き出せます。</p>
      </section>
    );
  }

  return (
    <section className="mt-3 border border-sky-200 dark:border-sky-800 p-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-[9px] tracking-[0.16em] font-semibold text-sky-700 dark:text-sky-300">SCENE DELIVERY PACKAGE</p>
          <p className="mt-1 text-[10px] font-semibold text-navy-800 dark:text-sand-100">{delivery.identity.sceneId} → {delivery.identity.patternId}</p>
          <p className="mt-1 text-[9px] text-navy-400">Palmier: {delivery.timeline.capability} / DaVinci: {delivery.davinci.routeStatus} / Actual: {delivery.davinci.actualEvidenceState}</p>
        </div>
        <button
          type="button"
          onClick={() => downloadText(json, delivery.files.deliverySidecarFileName)}
          className="border border-sky-300 dark:border-sky-700 px-2.5 py-1.5 text-[9px] font-semibold text-sky-700 dark:text-sky-300"
        >
          Production packageを書き出す
        </button>
      </div>
      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-1 text-[8px] font-mono text-navy-500 dark:text-navy-300">
        <span>Scene revision: {delivery.identity.sourceRevision}</span>
        <span>Canonical: {delivery.canonical.engine} / {delivery.canonical.mode}</span>
        <span>Palmier XML: {delivery.files.palmierTimelineXmlFileName}</span>
        <span>Marker: {delivery.timeline.sceneMarkerId}</span>
        <span>Translator: {delivery.davinci.translatorSpecAvailable ? "AVAILABLE" : "MISSING"}</span>
        <span>Release: {delivery.release.productionReady ? "READY" : "BLOCKED"}</span>
      </div>
      <div className="mt-2 border border-sky-100 dark:border-sky-900 p-2 text-[8px] leading-4 text-navy-400">
        <p className="font-mono">Current stop: {delivery.execution.currentStopReason}</p>
        <p className="mt-1">{delivery.execution.order.join(" → ")}</p>
      </div>
      {delivery.davinci.actualWorkflow ? (
        <p className="mt-2 text-[8px] leading-4 text-navy-400">Mac Actual: {delivery.davinci.actualWorkflow.actualArtifactFile} → {delivery.davinci.actualWorkflow.evidenceCaptureFile} → {delivery.davinci.actualWorkflow.verificationCommand}</p>
      ) : null}
      <p className="mt-2 border border-amber-200 dark:border-amber-800 p-2 text-[8px] leading-4 text-amber-800 dark:text-amber-200">
        package出力 ≠ production release。Mac Actual / Human promotion / Scene-bound Release Gateは別証拠として維持し、未実行はNOT_RUNのままです。
      </p>
      <details className="mt-2">
        <summary className="cursor-pointer text-[8px] text-sky-700 dark:text-sky-300">package JSON</summary>
        <pre className="mt-2 max-h-72 overflow-auto whitespace-pre-wrap border border-sand-200 dark:border-navy-600 p-2 text-[8px] leading-4 text-navy-500 dark:text-navy-300">{json}</pre>
      </details>
    </section>
  );
}
