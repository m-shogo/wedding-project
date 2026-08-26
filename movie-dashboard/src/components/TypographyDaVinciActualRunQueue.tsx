import {
  typographyDaVinciActualRunPlan,
  typographyDaVinciSharedActualSteps,
  type TypographyDaVinciActualNextAction,
} from "../data/typographyDaVinciActualRunPlan";

const ACTION_LABEL: Record<TypographyDaVinciActualNextAction, string> = {
  CAPTURE_EXISTING_LIVE_READBACK: "既存live実装のActual採取",
  RUN_MAC_ACTUAL_CAPTURE: "Mac Resolve Actualを実行",
  RUN_MAC_ACTUAL_VERIFICATION: "Actual検証を実行",
  HUMAN_PROMOTION_REVIEW: "Human promotion review",
};

export function TypographyDaVinciActualRunQueue() {
  const notRunCount = typographyDaVinciActualRunPlan.filter((item) => item.macActualState === "NOT_RUN").length;

  return (
    <details className="mt-3 border border-sky-200 dark:border-sky-800 p-2.5">
      <summary className="cursor-pointer text-[10px] font-semibold text-sky-700 dark:text-sky-300">
        Mac Resolve Actual 実行キュー — {notRunCount}/9 NOT_RUN
      </summary>
      <p className="mt-2 text-[9px] leading-4 text-navy-400">
        9候補を別々の手順で試すのではなく、同じ証拠順序で上から処理します。translatorやCIの成功はMac Actual PASSへ読み替えません。
      </p>

      <div className="mt-2 grid grid-cols-1 lg:grid-cols-3 gap-2">
        {typographyDaVinciActualRunPlan.map((item) => (
          <div key={item.patternId} className="border border-sand-200 dark:border-navy-600 p-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[9px] font-semibold text-navy-800 dark:text-sand-100">
                {item.priority}. {item.patternId}
              </span>
              <span className="text-[8px] font-mono text-amber-700 dark:text-amber-300">{item.macActualState}</span>
            </div>
            <p className="mt-1 text-[8px] font-mono text-navy-400">mode={item.canonicalMode}</p>
            <p className="mt-1 text-[9px] font-semibold text-sky-700 dark:text-sky-300">次: {ACTION_LABEL[item.nextAction]}</p>
            <p className="mt-1 text-[8px] font-mono leading-3 text-navy-400 break-all">{item.implementationId}</p>
            {item.requiredBindingRoles.length > 0 ? (
              <p className="mt-1 text-[8px] leading-3 text-navy-400">
                bindings {item.requiredBindingRoles.length}: {item.requiredBindingRoles.join(" · ")}
              </p>
            ) : (
              <p className="mt-1 text-[8px] leading-3 text-navy-400">existing live implementation: applied-value/readback evidenceを採取</p>
            )}
            <p className="mt-1 text-[8px] text-navy-400">QA: 1x + half-speed / reviewedAt必須</p>
          </div>
        ))}
      </div>

      <div className="mt-3 border-t border-sky-200 dark:border-sky-800 pt-2">
        <p className="text-[9px] font-semibold text-navy-700 dark:text-sand-100">全候補共通のActual順序</p>
        <ol className="mt-1 space-y-1 text-[8px] leading-3 text-navy-400">
          {typographyDaVinciSharedActualSteps.map((step, index) => (
            <li key={step}>{index + 1}. {step}</li>
          ))}
        </ol>
      </div>

      <p className="mt-2 border border-amber-200 dark:border-amber-800 p-2 text-[8px] leading-3 text-amber-800 dark:text-amber-200">
        automaticPromotionAllowed=false / productionReady=false。全machine checks・required live bindings・1x/half-speed QAが揃っても、別Human promotion reviewなしでproductionへ自動昇格しません。
      </p>
    </details>
  );
}
