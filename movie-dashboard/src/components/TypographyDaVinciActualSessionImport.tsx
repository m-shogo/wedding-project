import {useState} from "react";
import {
  parseAndEvaluateTypographyDaVinciActualSession,
  type TypographyDaVinciActualSessionEvaluation,
  type TypographyDaVinciActualSessionV1,
} from "../data/typographyDaVinciActualSession";

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

  return (
    <details className="mt-3 border border-violet-200 dark:border-violet-800 p-2.5">
      <summary className="cursor-pointer text-[10px] font-semibold text-violet-700 dark:text-violet-300">
        Mac Actual session JSONを読み戻す
      </summary>
      <p className="mt-2 text-[9px] leading-4 text-navy-400">
        Mac Resolveで採取したsession envelopeをローカルで検証します。読み込みだけではroute statusやproduction stateを書き換えません。
      </p>
      <input
        className="mt-2 block w-full text-[9px] text-navy-500"
        type="file"
        accept="application/json,.json"
        onChange={(event) => void onFile(event.target.files?.[0] ?? null)}
      />

      {error ? <p className="mt-2 text-[9px] text-red-600">JSON parse failed: {error}</p> : null}

      {session && evaluation ? (
        <div className="mt-3 space-y-2">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 text-[8px] font-mono text-navy-500 dark:text-navy-300">
            <span>session: {session.sessionId || "MISSING"}</span>
            <span>Resolve: {session.resolveVersion || "MISSING"}</span>
            <span>machine: {session.machine || "MISSING"}</span>
            <span>coverage: {evaluation.completeNinePatternCoverage ? "9/9" : `${session.items.length}/9`}</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
            {evaluation.items.map((item, index) => (
              <div key={`${item.patternId}-${index}`} className="border border-sand-200 dark:border-navy-600 p-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[8px] font-semibold text-navy-800 dark:text-sand-100">{item.patternId}</span>
                  <span className={`text-[8px] font-mono ${item.eligibleForHumanPromotionReview ? "text-emerald-700 dark:text-emerald-300" : "text-amber-700 dark:text-amber-300"}`}>
                    {item.eligibleForHumanPromotionReview ? "HUMAN_REVIEW_ELIGIBLE" : "BLOCKED"}
                  </span>
                </div>
                {item.issues.length > 0 ? (
                  <p className="mt-1 text-[8px] font-mono leading-3 text-amber-700 dark:text-amber-300">{item.issues.join(" · ")}</p>
                ) : (
                  <p className="mt-1 text-[8px] text-navy-400">machine/bindings/1x/half-speed/reviewedAt evidence complete</p>
                )}
              </div>
            ))}
          </div>
          <p className="border border-amber-200 dark:border-amber-800 p-2 text-[8px] leading-3 text-amber-800 dark:text-amber-200">
            eligible for separate Human promotion review: {eligibleCount}/9。automaticPromotionAllowed=false / productionReady=false。session import成功をproduction昇格へ読み替えません。
          </p>
        </div>
      ) : null}
    </details>
  );
}
