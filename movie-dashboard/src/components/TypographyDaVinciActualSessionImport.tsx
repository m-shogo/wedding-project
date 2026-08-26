import {useState} from "react";
import {
  buildTypographyDaVinciActualEvaluationReport,
  buildTypographyDaVinciActualEvaluationReportJson,
  buildTypographyDaVinciActualSessionTemplateJson,
  parseAndEvaluateTypographyDaVinciActualSession,
  type TypographyDaVinciActualSessionEvaluation,
  type TypographyDaVinciActualSessionV1,
} from "../data/typographyDaVinciActualSession";
import {TypographyDaVinciHumanPromotionReview} from "./TypographyDaVinciHumanPromotionReview";

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

const downloadSessionTemplate = () =>
  downloadJson("typography-davinci-actual-session-template.json", buildTypographyDaVinciActualSessionTemplateJson());

export function TypographyDaVinciActualSessionImport() {
  const [session, setSession] = useState<TypographyDaVinciActualSessionV1 | null>(null);
  const [evaluation, setEvaluation] = useState<TypographyDaVinciActualSessionEvaluation | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onFile = async (file: File | null) => {
    setError(null);
    setSession(null);
    setEvaluation(null);
    if (!file) return;
    try {
      const result = parseAndEvaluateTypographyDaVinciActualSession(await file.text());
      setSession(result.session);
      setEvaluation(result.evaluation);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Invalid Actual session JSON");
    }
  };

  const eligibleCount = evaluation?.items.filter((item) => item.eligibleForHumanPromotionReview).length ?? 0;
  const downloadEvaluationReport = () => {
    if (!session) return;
    const safeSessionId = session.sessionId.replace(/[^a-zA-Z0-9._-]+/g, "-") || "unknown-session";
    downloadJson(`typography-davinci-actual-evaluation-${safeSessionId}.json`, buildTypographyDaVinciActualEvaluationReportJson(session));
  };

  return (
    <details className="mt-3 border border-violet-200 dark:border-violet-800 p-2.5">
      <summary className="cursor-pointer text-[10px] font-semibold text-violet-700 dark:text-violet-300">Mac Actual session JSONを読み戻す</summary>
      <div className="mt-2 flex flex-wrap items-start justify-between gap-2">
        <p className="max-w-3xl text-[9px] leading-4 text-navy-400">
          Mac Resolveで採取したsession envelopeをローカルで検証します。読み込みだけではroute statusやproduction stateを書き換えません。
        </p>
        <button type="button" onClick={downloadSessionTemplate} className="border border-violet-300 dark:border-violet-700 px-2 py-1 text-[8px] font-semibold text-violet-700 dark:text-violet-300">
          NOT_RUN session templateを保存
        </button>
      </div>
      <p className="mt-1 text-[8px] leading-3 text-navy-400">templateは9候補・required bindingsを自動展開しますが、evidence欄はすべてNOT_RUN。Mac側で実測した項目だけ更新してください。</p>
      <input className="mt-2 block w-full text-[9px] text-navy-500" type="file" accept="application/json,.json" onChange={(event) => void onFile(event.target.files?.[0] ?? null)} />
      {error ? <p className="mt-2 text-[9px] text-red-600">JSON parse failed: {error}</p> : null}

      {session && evaluation ? (
        <div className="mt-3 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="grid flex-1 grid-cols-2 lg:grid-cols-4 gap-1 text-[8px] font-mono text-navy-500 dark:text-navy-300">
              <span>session: {session.sessionId || "MISSING"}</span>
              <span>Resolve: {session.resolveVersion || "MISSING"}</span>
              <span>machine: {session.machine || "MISSING"}</span>
              <span>coverage: {evaluation.completeNinePatternCoverage ? "9/9" : `${session.items.length}/9`}</span>
            </div>
            <button type="button" onClick={downloadEvaluationReport} className="border border-emerald-300 dark:border-emerald-700 px-2 py-1 text-[8px] font-semibold text-emerald-700 dark:text-emerald-300">
              derived evaluation reportを保存
            </button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 text-[8px] font-mono text-navy-500 dark:text-navy-300">
            <span>NOT_RUN: {evaluation.stageCounts.NOT_RUN}</span>
            <span>IN_PROGRESS: {evaluation.stageCounts.ACTUAL_IN_PROGRESS}</span>
            <span>FAILED: {evaluation.stageCounts.ACTUAL_FAILED}</span>
            <span>HUMAN_REVIEW_ELIGIBLE: {evaluation.stageCounts.HUMAN_REVIEW_ELIGIBLE}</span>
          </div>
          <p className="text-[8px] leading-3 text-navy-400">evaluation reportはDERIVED_FROM_MAC_ACTUAL_EVIDENCE_SESSION。raw evidenceの代替ではなく、Gitへ残す判定結果です。</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
            {evaluation.items.map((item, index) => (
              <div key={`${item.patternId}-${index}`} className="border border-sand-200 dark:border-navy-600 p-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[8px] font-semibold text-navy-800 dark:text-sand-100">{item.patternId}</span>
                  <span className={`text-[8px] font-mono ${item.eligibleForHumanPromotionReview ? "text-emerald-700 dark:text-emerald-300" : item.stage === "ACTUAL_FAILED" ? "text-red-600" : "text-amber-700 dark:text-amber-300"}`}>
                    {item.stage}
                  </span>
                </div>
                <div className="mt-1 grid grid-cols-2 gap-1 text-[8px] font-mono text-navy-400">
                  <span>machine: {item.machineEvidenceComplete ? "PASS" : "WAIT"}</span>
                  <span>bindings: {item.requiredBindingsComplete ? "PASS" : "WAIT"}</span>
                  <span>visual QA: {item.visualQaComplete ? "PASS" : "WAIT"}</span>
                  <span>review meta: {item.reviewMetadataComplete ? "PASS" : "WAIT"}</span>
                </div>
                {item.issues.length > 0 ? <p className="mt-1 text-[8px] font-mono leading-3 text-amber-700 dark:text-amber-300">{item.issues.join(" · ")}</p> : <p className="mt-1 text-[8px] text-navy-400">machine/bindings/1x/half-speed/reviewedAt evidence complete</p>}
              </div>
            ))}
          </div>
          <p className="border border-amber-200 dark:border-amber-800 p-2 text-[8px] leading-3 text-amber-800 dark:text-amber-200">
            eligible for separate Human promotion review: {eligibleCount}/9。HUMAN_REVIEW_ELIGIBLEはHuman promotedではありません。automaticPromotionAllowed=false / productionReady=false。session import/evaluation report成功をproduction昇格へ読み替えません。
          </p>
          <TypographyDaVinciHumanPromotionReview report={buildTypographyDaVinciActualEvaluationReport(session)} />
        </div>
      ) : null}
    </details>
  );
}
