import {useEffect, useMemo, useState} from "react";
import {
  buildTypographySceneDeliveryPackage,
  buildTypographySceneDeliveryPackageJson,
  parseAndValidateTypographySceneDeliveryPackage,
} from "../data/typographySceneDeliveryPackage";
import {
  buildTypographySceneRoleDeliveryPackage,
  buildTypographySceneRoleDeliveryPackageJson,
  parseAndValidateTypographySceneRoleDeliveryPackage,
} from "../data/typographySceneRoleDeliveryPackage";
import {
  loadTypographyProductionRoleContext,
  saveTypographyProductionRoleContext,
  TYPOGRAPHY_PRODUCTION_ROLE_CONTEXT_CHANGED_EVENT,
} from "../data/typographyProductionRoleContextStore";
import {
  loadTypographyProductionSelection,
  TYPOGRAPHY_PRODUCTION_SELECTION_CHANGED_EVENT,
} from "../data/typographyProductionSelectionStore";
import {getWeddingTypographyProductionRoleGuide} from "../data/weddingTypographyProductionRoleGuide.generated";
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
  const roleContext = useMemo(
    () => selection ? loadTypographyProductionRoleContext(scene, selection) : null,
    [scene, selection, revision],
  );
  const productionRole = roleContext?.productionRole ?? null;
  const roleGuide = useMemo(() => getWeddingTypographyProductionRoleGuide(scene.projectId), [scene.projectId]);
  const delivery = useMemo(
    () => (selection ? buildTypographySceneDeliveryPackage(scene, selection) : null),
    [scene, selection],
  );
  const json = useMemo(
    () => (selection ? buildTypographySceneDeliveryPackageJson(scene, selection) : null),
    [scene, selection],
  );
  const roleDelivery = useMemo(
    () => selection && productionRole ? buildTypographySceneRoleDeliveryPackage(scene, selection, productionRole) : null,
    [scene, selection, productionRole],
  );
  const roleJson = useMemo(
    () => selection && productionRole ? buildTypographySceneRoleDeliveryPackageJson(scene, selection, productionRole) : null,
    [scene, selection, productionRole],
  );

  useEffect(() => {
    const refresh = () => setRevision((value) => value + 1);
    window.addEventListener(TYPOGRAPHY_PRODUCTION_SELECTION_CHANGED_EVENT, refresh);
    window.addEventListener(TYPOGRAPHY_PRODUCTION_ROLE_CONTEXT_CHANGED_EVENT, refresh);
    return () => {
      window.removeEventListener(TYPOGRAPHY_PRODUCTION_SELECTION_CHANGED_EVENT, refresh);
      window.removeEventListener(TYPOGRAPHY_PRODUCTION_ROLE_CONTEXT_CHANGED_EVENT, refresh);
    };
  }, []);

  useEffect(() => {
    setRevalidation("NOT_RUN");
    setRevalidationError(null);
  }, [scene.sceneId, scene.updatedAt, selection?.patternId, selection?.selectedAt, productionRole]);

  async function revalidatePackage(file: File | undefined) {
    if (!file || !selection) return;
    try {
      const raw = await file.text();
      if (productionRole) {
        parseAndValidateTypographySceneRoleDeliveryPackage(raw, scene, selection, productionRole);
      } else {
        parseAndValidateTypographySceneDeliveryPackage(raw, scene, selection);
      }
      setRevalidation("PASS");
      setRevalidationError(null);
    } catch (error) {
      setRevalidation("FAIL");
      setRevalidationError(error instanceof Error ? error.message : String(error));
    }
  }

  if (!selection || !delivery || !json) {
    return (
      <section className="mt-3 border border-sky-200 dark:border-sky-800 p-3">
        <p className="text-[9px] tracking-[0.16em] font-semibold text-sky-700 dark:text-sky-300">SCENE DELIVERY PACKAGE</p>
        <p className="mt-1 text-[9px] leading-4 text-navy-400">Typography routeを人間が選択すると、Palmier timingとDaVinci handoffを1 Scene単位のproduction packageとして書き出せます。</p>
      </section>
    );
  }

  const elementIdentity = delivery.remotion.handoffIdentity;

  return (
    <section className="mt-3 border border-sky-200 dark:border-sky-800 p-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-[9px] tracking-[0.16em] font-semibold text-sky-700 dark:text-sky-300">SCENE DELIVERY PACKAGE</p>
          <p className="mt-1 text-[10px] font-semibold text-navy-800 dark:text-sand-100">{delivery.identity.sceneId} → {delivery.identity.patternId}</p>
          <p className="mt-1 text-[9px] text-navy-400">Palmier: {delivery.timeline.capability} / DaVinci: {delivery.davinci.routeStatus} / Actual: {delivery.davinci.actualEvidenceState}</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button type="button" onClick={() => downloadText(json, delivery.files.deliverySidecarFileName)} className="border border-sky-300 dark:border-sky-700 px-2.5 py-1.5 text-[9px] font-semibold text-sky-700 dark:text-sky-300">Production packageを書き出す</button>
          {roleDelivery && roleJson ? <button type="button" onClick={() => downloadText(roleJson, `${scene.sceneId}-${roleDelivery.productionUse.productionRole}-${selection.patternId}-role-handoff.json`)} className="border border-violet-300 dark:border-violet-700 px-2.5 py-1.5 text-[9px] font-semibold text-violet-700 dark:text-violet-300">Role handoffを書き出す</button> : null}
          <label className="cursor-pointer border border-sky-300 dark:border-sky-700 px-2.5 py-1.5 text-[9px] font-semibold text-sky-700 dark:text-sky-300">Package再検証<input type="file" accept="application/json,.json" className="sr-only" onChange={(event) => void revalidatePackage(event.currentTarget.files?.[0])} /></label>
        </div>
      </div>

      <div className="mt-3 border-2 border-cyan-300 dark:border-cyan-800 p-2.5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <p className="text-[8px] tracking-[0.14em] font-semibold text-cyan-700 dark:text-cyan-300">REMOTION ELEMENT IDENTITY / SHA-CURRENTNESS REQUIRED</p>
            <p className="mt-1 text-[8px] leading-4 text-navy-500 dark:text-navy-300">Scene-selected ElementをPalmier / DaVinciへ渡す前にcatalog-wide handoff identityを再生成・current checkします。</p>
          </div>
          <span className={`border px-2 py-1 text-[8px] font-semibold ${elementIdentity.adoptedForMovie ? "border-emerald-300 text-emerald-700 dark:border-emerald-800 dark:text-emerald-300" : "border-sand-300 text-navy-500 dark:border-navy-600 dark:text-navy-300"}`}>
            project adoption: {elementIdentity.adoptedForMovie ? "ADOPTED" : "NOT_ADOPTED"}
          </span>
        </div>
        <div className="mt-2 grid gap-1 text-[8px] font-mono text-navy-500 dark:text-navy-300 sm:grid-cols-2">
          <span>Pattern: {elementIdentity.patternId}</span>
          <span>Canonical: {elementIdentity.canonicalIdentity.canonicalEngine} / {elementIdentity.canonicalIdentity.canonicalMode}</span>
          <span>Studio GUI Actual: {elementIdentity.macRemotionStudioGuiActual}</span>
          <span>DaVinci GUI Actual: {elementIdentity.macDaVinciGuiActual}</span>
        </div>
        <code className="mt-2 block max-w-full overflow-x-auto whitespace-nowrap text-[8px] text-navy-400">source: {elementIdentity.canonicalIdentity.canonicalSource}</code>
        <code className="mt-1 block max-w-full overflow-x-auto whitespace-nowrap text-[8px] text-navy-400">artifact: {delivery.files.remotionElementIdentityArtifactPath}</code>
        <div className="mt-2 grid gap-1.5">
          <div>
            <p className="text-[7px] font-semibold uppercase tracking-wide text-cyan-600 dark:text-cyan-300">1. export current identity artifact</p>
            <code className="block max-w-full overflow-x-auto whitespace-nowrap border-l-2 border-cyan-300 pl-2 text-[8px] leading-4 text-navy-500 dark:text-navy-300">{elementIdentity.shaBinding.exportCommand}</code>
          </div>
          <div>
            <p className="text-[7px] font-semibold uppercase tracking-wide text-cyan-600 dark:text-cyan-300">2. verify SHA currentness</p>
            <code className="block max-w-full overflow-x-auto whitespace-nowrap border-l-2 border-cyan-300 pl-2 text-[8px] leading-4 text-navy-500 dark:text-navy-300">{delivery.files.remotionElementIdentityCheckCommand}</code>
          </div>
        </div>
        <p className="mt-2 border-l-2 border-amber-300 pl-2 text-[8px] leading-4 text-amber-800 dark:text-amber-200">identity CURRENT ≠ Studio GUI Actual PASS ≠ DaVinci GUI Actual PASS。catalog identityの存在はproject adoptionも自動実行しません。</p>
      </div>

      <div className="mt-3 border border-violet-200 dark:border-violet-800 p-2.5">
        <p className="text-[8px] tracking-[0.14em] font-semibold text-violet-700 dark:text-violet-300">PRODUCTION ROLE / PERSISTED HUMAN CONTEXT</p>
        <p className="mt-1 text-[8px] leading-4 text-navy-400">Roleは現在のScene revisionとHuman-selected routeへ固定保存します。Sceneやrouteが変わった古いRole contextは自動適用しません。</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {roleGuide.map((guide) => {
            const selected = productionRole === guide.role;
            const choiceKind = selection.patternId === guide.primaryPatternId ? "PRIMARY" : guide.fallbackPatternIds.includes(selection.patternId) ? "FALLBACK" : "CUSTOM";
            return (
              <button key={guide.role} type="button" onClick={() => saveTypographyProductionRoleContext(scene, selection, guide.role)} className={`border px-2.5 py-1.5 text-left text-[8px] ${selected ? "border-violet-500 bg-violet-50 dark:bg-violet-950/20" : "border-sand-200 dark:border-navy-600"}`}>
                <span className="font-semibold">{guide.role}</span><span className="ml-1 font-mono text-navy-400">{choiceKind}</span>
              </button>
            );
          })}
        </div>
        {roleDelivery && roleContext ? (
          <div className="mt-2 text-[8px] leading-4 text-navy-500 dark:text-navy-300">
            <p>Role: {roleDelivery.productionUse.productionRole} / Pattern: {roleDelivery.productionUse.patternId} / Class: {roleDelivery.productionUse.choiceKind}</p>
            <p>Role selected: {roleContext.roleSelectedAt} / bound route: {roleContext.routeSelectedAt}</p>
            <p>Reason: {roleDelivery.productionUse.roleReason}</p>
            <p>Studio GUI Actual: {roleDelivery.handoffSummary.studioGuiActual} / DaVinci GUI Actual: {roleDelivery.handoffSummary.davinciGuiActual} / Production ready: NO</p>
          </div>
        ) : <p className="mt-2 text-[8px] text-amber-700 dark:text-amber-300">Role context未選択。Role handoff exportは停止しています。</p>}
      </div>

      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-1 text-[8px] font-mono text-navy-500 dark:text-navy-300">
        <span>Scene revision: {delivery.identity.sourceRevision}</span><span>Canonical: {delivery.canonical.engine} / {delivery.canonical.mode}</span><span>Palmier XML: {delivery.files.palmierTimelineXmlFileName}</span><span>Marker: {delivery.timeline.sceneMarkerId}</span><span>Translator: {delivery.davinci.translatorSpecAvailable ? "AVAILABLE" : "MISSING"}</span><span>Release: {delivery.release.productionReady ? "READY" : "BLOCKED"}</span>
      </div>
      <div className="mt-2 border border-sky-100 dark:border-sky-900 p-2 text-[8px] leading-4 text-navy-400"><p className="font-mono">Current stop: {delivery.execution.currentStopReason}</p><p className="mt-1">{delivery.execution.order.join(" → ")}</p></div>
      {revalidation !== "NOT_RUN" ? <p className={`mt-2 border p-2 text-[8px] font-mono ${revalidation === "PASS" ? "border-emerald-300 text-emerald-700 dark:border-emerald-800 dark:text-emerald-300" : "border-red-300 text-red-700 dark:border-red-800 dark:text-red-300"}`}>Package revalidation: {revalidation}{revalidationError ? ` / ${revalidationError}` : " / CURRENT scene + route + persisted roleに一致"}</p> : null}
      {delivery.davinci.actualWorkflow ? <p className="mt-2 text-[8px] leading-4 text-navy-400">Mac Actual: {delivery.davinci.actualWorkflow.actualArtifactFile} → {delivery.davinci.actualWorkflow.evidenceCaptureFile} → {delivery.davinci.actualWorkflow.verificationCommand}</p> : null}
      <p className="mt-2 border border-amber-200 dark:border-amber-800 p-2 text-[8px] leading-4 text-amber-800 dark:text-amber-200">package出力 ≠ production release。Mac Actual / Human promotion / Scene-bound Release Gateは別証拠として維持し、未実行はNOT_RUNのままです。Scene更新後の古いpackage/Role contextは拒否します。</p>
      <details className="mt-2"><summary className="cursor-pointer text-[8px] text-sky-700 dark:text-sky-300">package JSON</summary><pre className="mt-2 max-h-72 overflow-auto whitespace-pre-wrap border border-sand-200 dark:border-navy-600 p-2 text-[8px] leading-4 text-navy-500 dark:text-navy-300">{roleJson ?? json}</pre></details>
    </section>
  );
}
