import {useEffect, useMemo, useState} from "react";
import type {
  TypographyDaVinciActualEvaluationReportV1,
} from "../data/typographyDaVinciActualSession";
import type {TypographyDaVinciHumanPromotionReviewV1} from "../data/typographyDaVinciHumanPromotionReview";
import {
  buildTypographyDaVinciProductionReleaseGateTemplateJson,
  parseAndEvaluateTypographyDaVinciProductionReleaseGate,
  type TypographyDaVinciProductionReleaseEvaluation,
} from "../data/typographyDaVinciProductionReleaseGate";
import type {TypographyProductionSelectionV1} from "../data/typographySceneProductionRouting";
import type {MaskRevealSceneInstance} from "../data/visualSceneComposer";

function downloadJson(fileName: string, json: string) {
  const blob = new Blob([json], {type: "application/json"});
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

async function parseJsonFile<T>(file: File | null): Promise<T | null> {
  if (!file) return null;
  return JSON.parse(await file.text()) as T;
}

export function TypographyDaVinciProductionReleaseGate({
  scene,
  selection,
}: {
  scene: MaskRevealSceneInstance;
  selection: TypographyProductionSelectionV1;
}) {
  const [report, setReport] = useState<TypographyDaVinciActualEvaluationReportV1 | null>(null);
  const [promotionReview, setPromotionReview] = useState<TypographyDaVinciHumanPromotionReviewV1 | null>(null);
  const [evaluation, setEvaluation] = useState<TypographyDaVinciProductionReleaseEvaluation | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setReport(null);
    setPromotionReview(null);
    setEvaluation(null);
    setError(null);
  }, [scene.sceneId, scene.updatedAt, selection.patternId, selection.sourceRevision, selection.selectedAt]);

  const sourceReady = useMemo(() => {
    if (!report || !promotionReview) return false;
    const reportHasPattern = report.items?.some((item) => item.patternId === selection.patternId) ?? false;
    const reviewHasPattern = promotionReview.items?.some((item) => item.patternId === selection.patternId) ?? false;
    return reportHasPattern && reviewHasPattern;
  }, [report, promotionReview, selection.patternId]);

  async function loadReport(file: File | null) {
    setEvaluation(null);
    setError(null);
    try {
      const parsed = await parseJsonFile<TypographyDaVinciActualEvaluationReportV1>(file);
      if (!parsed) return;
      if (parsed.schemaVersion !== "typography-davinci-actual-evaluation/v1" || parsed.authority !== "DERIVED_FROM_MAC_ACTUAL_EVIDENCE_SESSION") {
        throw new Error("ACTUAL_EVALUATION_REPORT_ENVELOPE_MISMATCH");
      }
      setReport(parsed);
    } catch (cause) {
      setReport(null);
      setError(cause instanceof Error ? cause.message : "Invalid Actual evaluation report JSON");
    }
  }

  async function loadPromotionReview(file: File | null) {
    setEvaluation(null);
    setError(null);
    try {
      const parsed = await parseJsonFile<TypographyDaVinciHumanPromotionReviewV1>(file);
      if (!parsed) return;
      if (parsed.schemaVersion !== "typography-davinci-human-promotion-review/v1" || parsed.authority !== "HUMAN_PROMOTION_DECISION") {
        throw new Error("HUMAN_PROMOTION_REVIEW_ENVELOPE_MISMATCH");
      }
      setPromotionReview(parsed);
    } catch (cause) {
      setPromotionReview(null);
      setError(cause instanceof Error ? cause.message : "Invalid Human promotion review JSON");
    }
  }

  function downloadHoldTemplate() {
    if (!report || !promotionReview) return;
    const safeSceneId = scene.sceneId.replace(/[^a-zA-Z0-9._-]+/g, "-");
    downloadJson(
      `${safeSceneId}-${selection.patternId}-production-release-gate.json`,
      buildTypographyDaVinciProductionReleaseGateTemplateJson(scene, selection, report),
    );
  }

  async function loadReleaseGate(file: File | null) {
    setEvaluation(null);
    setError(null);
    if (!file || !report || !promotionReview) return;
    try {
      const result = parseAndEvaluateTypographyDaVinciProductionReleaseGate(
        await file.text(),
        scene,
        selection,
        report,
        promotionReview,
      );
      setEvaluation(result.evaluation);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Invalid production release gate JSON");
    }
  }

  return (
    <details className="mt-3 border border-rose-200 dark:border-rose-800 p-2.5">
      <summary className="cursor-pointer text-[10px] font-semibold text-rose-700 dark:text-rose-300">
        Production Release Gate — {selection.patternId} / Scene revision bound
      </summary>
      <p className="mt-2 text-[9px] leading-4 text-navy-400">
        最終本番Ready判定です。現在のHuman-selected routeとScene revision、Actual evaluation、Human promotion reviewの4つを同じidentityで照合します。Sceneを編集・routeを選び直した時点で古いRELEASEは失効します。
      </p>
      <div className="mt-2 grid grid-cols-1 lg:grid-cols-2 gap-2 text-[8px]">
        <label className="border border-sand-200 dark:border-navy-600 p-2 cursor-pointer">
          <span className="font-semibold">1. Actual evaluation report</span>
          <input type="file" accept="application/json,.json" className="block mt-1 w-full" onChange={(event) => void loadReport(event.currentTarget.files?.[0] ?? null)} />
          <span className="block mt-1 font-mono text-navy-400">{report ? `loaded: ${report.sourceSession.sessionId}` : "not loaded"}</span>
        </label>
        <label className="border border-sand-200 dark:border-navy-600 p-2 cursor-pointer">
          <span className="font-semibold">2. Human promotion review</span>
          <input type="file" accept="application/json,.json" className="block mt-1 w-full" onChange={(event) => void loadPromotionReview(event.currentTarget.files?.[0] ?? null)} />
          <span className="block mt-1 font-mono text-navy-400">{promotionReview ? `loaded: ${promotionReview.sourceEvaluation.sessionId}` : "not loaded"}</span>
        </label>
      </div>
      <div className="mt-2 flex flex-wrap gap-2 items-center">
        <button
          type="button"
          disabled={!sourceReady}
          onClick={downloadHoldTemplate}
          className="border border-rose-300 dark:border-rose-700 px-2 py-1 text-[8px] font-semibold text-rose-700 dark:text-rose-300 disabled:opacity-40"
        >
          HOLD release gate templateを保存
        </button>
        <label className={`border border-rose-300 dark:border-rose-700 px-2 py-1 text-[8px] font-semibold text-rose-700 dark:text-rose-300 ${sourceReady ? "cursor-pointer" : "opacity-40 pointer-events-none"}`}>
          3. Release gateを再読込
          <input type="file" accept="application/json,.json" className="sr-only" onChange={(event) => void loadReleaseGate(event.currentTarget.files?.[0] ?? null)} />
        </label>
      </div>
      {error ? <p className="mt-2 border border-red-300 dark:border-red-800 p-2 text-[8px] font-mono text-red-700 dark:text-red-300">Release gate rejected: {error}</p> : null}
      {evaluation ? (
        <div className={`mt-2 border p-2 ${evaluation.productionReady ? "border-emerald-300 dark:border-emerald-800" : "border-amber-300 dark:border-amber-800"}`}>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-1 text-[8px] font-mono text-navy-500 dark:text-navy-300">
            <span>selection: {evaluation.selectionFresh ? "FRESH" : "STALE"}</span>
            <span>pattern: {evaluation.patternMatchesCurrentSelection ? "MATCH" : "MISMATCH"}</span>
            <span>promotion: {evaluation.humanPromotionVerified ? "VERIFIED" : "BLOCKED"}</span>
            <span>release: {evaluation.releaseDecisionComplete ? "COMPLETE" : "HOLD"}</span>
            <span className={evaluation.productionReady ? "text-emerald-700 dark:text-emerald-300" : "text-amber-700 dark:text-amber-300"}>PRODUCTION: {evaluation.productionReady ? "READY" : "BLOCKED"}</span>
          </div>
          {evaluation.issues.length > 0 ? <p className="mt-1 text-[8px] font-mono leading-3 text-amber-700 dark:text-amber-300">{evaluation.issues.join(" · ")}</p> : null}
        </div>
      ) : null}
      <p className="mt-2 text-[8px] leading-3 text-amber-800 dark:text-amber-200">
        templateは必ずHOLD。RELEASEを書いただけでは通らず、選択revision freshness + matching pattern + Human promotion verified + releaseReviewer + releasedAtがすべて必要です。Mac Actualを実行していない現状では本番Readyにはなりません。
      </p>
    </details>
  );
}
