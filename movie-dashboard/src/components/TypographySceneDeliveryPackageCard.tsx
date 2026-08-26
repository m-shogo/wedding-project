import {useEffect, useMemo, useState} from "react";
import {
  buildTypographySceneDeliveryPackage,
  buildTypographySceneDeliveryPackageJson,
  parseAndValidateTypographySceneDeliveryPackage,
} from "../data/typographySceneDeliveryPackage";
import {
  loadTypographyProductionSelection,
  TYPOGRAPHY_PRODUCTION_SELECTION_CHANGED_EVENT,
} from "../data/typographyProductionSelectionStore";
import type {MaskRevealSceneInstance} from "../data/visualSceneComposer";
import {downloadText} from "../lib/exporters";

export function TypographySceneDeliveryPackageCard({scene}: {scene: MaskRevealSceneInstance}) {
  const [revision, setRevision] = useState(0);
  const [revalidation, setRevalidation] = useState<"NOT_RUN" | "PASS" | "FAIL">("NOT_RUN");
  const [revalidationError, setRevalidationError] = useState<string | null>(null);
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

  useEffect(() => {
    setRevalidation("NOT_RUN");
    setRevalidationError(null);
  }, [scene.sceneId, scene.updatedAt, selection?.patternId, selection?.selectedAt]);

  async function revalidatePackage(file: File | undefined) {
    if (!file || !selection) return;
    try {
      parseAndValidateTypographySceneDeliveryPackage(await file.text(), scene, selection);
      setRevalidation("PASS");
      setRevalidationError(null);
    } catch (error) {
      setRevalidation("FAIL");
      setRevalidationError(error instanceof Error ? error.message : String(error));
    }
  }

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
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => downloadText(json, delivery.files.deliverySidecarFileName)}
            className="border border-sky-300 dark:border-sky-700 px-2.5 py-1.5 text-[9px] font-semibold text-sky-700 dark:text-sky-300"
          >
            Production packageを書き出す
          </button>
          <label className="cursor-pointer border border-sky-300 dark:border-sky-700 px-2.5 py-1.5 text-[9px] font-semibold text-sky-700 dark:text-sky-300">
            Package再検証
            <input type="file" accept="application/json,.json" className="sr-only" onChange={(event) => void revalidatePackage(event.currentTarget.files?.[0])} />
          </label>
        </div>
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
      {revalidation !== "NOT_RUN" ? (
        <p className={`mt-2 border p-2 text-[8px] font-mono ${revalidation === "PASS" ? "border-emerald-300 text-emerald-700 dark:border-emerald-800 dark:text-emerald-300" : "border-red-300 text-red-700 dark:border-red-800 dark:text-red-300"}`}>
          Package revalidation: {revalidation}{revalidationError ? ` / ${revalidationError}` : " / CURRENT scene + routeに一致"}
        </p>
      ) : null}
      {delivery.davinci.actualWorkflow ? (
        <p className="mt-2 text-[8px] leading-4 text-navy-400">Mac Actual: {delivery.davinci.actualWorkflow.actualArtifactFile} → {delivery.davinci.actualWorkflow.evidenceCaptureFile} → {delivery.davinci.actualWorkflow.verificationCommand}</p>
      ) : null}
      <p className="mt-2 border border-amber-200 dark:border-amber-800 p-2 text-[8px] leading-4 text-amber-800 dark:text-amber-200">
        package出力 ≠ production release。Mac Actual / Human promotion / Scene-bound Release Gateは別証拠として維持し、未実行はNOT_RUNのままです。Scene更新後の古いpackageは再検証で拒否します。
      </p>
      <details className="mt-2">
        <summary className="cursor-pointer text-[8px] text-sky-700 dark:text-sky-300">package JSON</summary>
        <pre className="mt-2 max-h-72 overflow-auto whitespace-pre-wrap border border-sand-200 dark:border-navy-600 p-2 text-[8px] leading-4 text-navy-500 dark:text-navy-300">{json}</pre>
      </details>
    </section>
  );
}
