import {useState} from "react";
import {
  buildTypographyDaVinciHumanPromotionReviewTemplateJson,
  parseAndEvaluateTypographyDaVinciHumanPromotionReview,
  type TypographyDaVinciHumanPromotionReviewEvaluation,
} from "../data/typographyDaVinciHumanPromotionReview";
import type {TypographyDaVinciActualEvaluationReportV1} from "../data/typographyDaVinciActualSession";

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

export function TypographyDaVinciHumanPromotionReview({report}: {report: TypographyDaVinciActualEvaluationReportV1}) {
  const [evaluation, setEvaluation] = useState<TypographyDaVinciHumanPromotionReviewEvaluation | null>(null);
  const [error, setError] = useState<string | null>(null);

  const downloadTemplate = () => {
    const safeSessionId = report.sourceSession.sessionId.replace(/[^a-zA-Z0-9._-]+/g, "-") || "unknown-session";
    downloadJson(
      `typography-davinci-human-promotion-review-${safeSessionId}.json`,
      buildTypographyDaVinciHumanPromotionReviewTemplateJson(report),
    );
  };

  const onFile = async (file: File | null) => {
    setEvaluation(null);
    setError(null);
    if (!file) return;
    try {
      const result = parseAndEvaluateTypographyDaVinciHumanPromotionReview(await file.text(), report);
      setEvaluation(result.evaluation);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Invalid Human promotion review JSON");
    }
  };

  const eligibleCount = report.items.filter((item) => item.eligibleForHumanPromotionReview).length;

  return (
    <details className="mt-3 border border-emerald-200 dark:border-emerald-800 p-2.5">
      <summary className="cursor-pointer text-[10px] font-semibold text-emerald-700 dark:text-emerald-300">
        Separate Human promotion review — source eligible {eligibleCount}/9
      </summary>
      <p className="mt-2 text-[9px] leading-4 text-navy-400">
        Actual評価とは別の人間判断です。templateは全候補PENDINGで生成され、APPROVEにはsourceがHUMAN_REVIEW_ELIGIBLEであること、reviewer、reviewedAtが必要です。
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={downloadTemplate}
          className="border border-emerald-300 dark:border-emerald-700 px-2 py-1 text-[8px] font-semibold text-emerald-700 dark:text-emerald-300"
        >
          PENDING promotion review templateを保存
        </button>
        <input
          className="block min-w-64 flex-1 text-[9px] text-navy-500"
          type="file"
          accept="application/json,.json"
          onChange={(event) => void onFile(event.target.files?.[0] ?? null)}
        />
      </div>
      {error ? <p className="mt-2 text-[9px] text-red-600">Promotion review parse failed: {error}</p> : null}
      {evaluation ? (
        <div className="mt-2 space-y-2">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 text-[8px] font-mono text-navy-500 dark:text-navy-300">
            <span>approved: {evaluation.approvedCount}</span>
            <span>rejected: {evaluation.rejectedCount}</span>
            <span>pending: {evaluation.pendingCount}</span>
            <span>coverage: {evaluation.completeNinePatternCoverage ? "9/9" : "INCOMPLETE"}</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
            {evaluation.items.map((item, index) => (
              <div key={`${item.patternId}-${index}`} className="border border-sand-200 dark:border-navy-600 p-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[8px] font-semibold text-navy-800 dark:text-sand-100">{item.patternId}</span>
                  <span className={`text-[8px] font-mono ${item.humanPromoted ? "text-emerald-700 dark:text-emerald-300" : item.decision === "REJECT" ? "text-red-600" : "text-amber-700 dark:text-amber-300"}`}>
                    {item.humanPromoted ? "HUMAN_PROMOTED" : item.decision}
                  </span>
                </div>
                <p className="mt-1 text-[8px] text-navy-400">
                  source eligible: {item.sourceEligibleForHumanPromotionReview ? "YES" : "NO"} / release gate: REQUIRED
                </p>
                {item.issues.length > 0 ? <p className="mt-1 text-[8px] font-mono leading-3 text-amber-700 dark:text-amber-300">{item.issues.join(" · ")}</p> : null}
              </div>
            ))}
          </div>
          <p className="border border-amber-200 dark:border-amber-800 p-2 text-[8px] leading-3 text-amber-800 dark:text-amber-200">
            HUMAN_PROMOTEDでもproductionReady=false。releaseGateRequired=true。Human review artifactはActual evidenceを書き換えず、productionへの自動昇格も行いません。
          </p>
        </div>
      ) : null}
    </details>
  );
}
