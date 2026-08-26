import {
  typographyProductionRoutes,
  type DaVinciTypographyRouteStatus,
} from "../data/typographySceneProductionRouting";
import {getRemotionElementCandidate} from "../data/remotionElementCandidates";
import {getTypographyDaVinciRequiredBindingRoles} from "../data/typographyDaVinciPromotionPolicy";
import {TypographyDaVinciActualRunQueue} from "./TypographyDaVinciActualRunQueue";

const DAVINCI_LABEL: Record<DaVinciTypographyRouteStatus, string> = {
  DAVINCI_TRANSLATION_NOT_IMPLEMENTED: "DaVinci翻訳待ち",
  DAVINCI_ACTUAL_CANDIDATE: "Actual候補",
  DAVINCI_IMPLEMENTATION_AVAILABLE: "live実装あり",
  DAVINCI_ACTUAL_VERIFIED: "Actual検証済み",
};

const DAVINCI_CLASS: Record<DaVinciTypographyRouteStatus, string> = {
  DAVINCI_TRANSLATION_NOT_IMPLEMENTED: "border-amber-300 text-amber-700 dark:border-amber-700 dark:text-amber-300",
  DAVINCI_ACTUAL_CANDIDATE: "border-sky-300 text-sky-700 dark:border-sky-700 dark:text-sky-300",
  DAVINCI_IMPLEMENTATION_AVAILABLE: "border-violet-300 text-violet-700 dark:border-violet-700 dark:text-violet-300",
  DAVINCI_ACTUAL_VERIFIED: "border-emerald-300 text-emerald-700 dark:border-emerald-700 dark:text-emerald-300",
};

export function TypographyProductionRoutingMatrix() {
  return (
    <details className="mt-3">
      <summary className="cursor-pointer text-[10px] text-violet-700 dark:text-violet-300">
        Typography 9候補のProduction Routingを見る
      </summary>
      <p className="mt-2 text-[10px] leading-4 text-navy-400">
        Remotion Element候補、DaVinci translator、Actual capture workflow、live実装、Actual検証は別状態です。Palmierは全候補でtimeline placement / trim / markerのみを担当し、前段の成功を後段の成功へ読み替えません。
      </p>
      <div className="mt-2 grid grid-cols-1 lg:grid-cols-2 gap-2">
        {typographyProductionRoutes.map((route) => {
          const candidate = getRemotionElementCandidate(route.patternId);
          const studioActual = candidate?.studioInstallActual === "PASS" && candidate?.studioControlReadbackActual === "PASS";
          const requiredRoles = route.patternId === "type-mask-reveal" ? [] : getTypographyDaVinciRequiredBindingRoles(route.patternId);

          return (
            <div key={route.patternId} className="border border-sand-200 dark:border-navy-600 p-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[10px] font-semibold text-navy-800 dark:text-sand-100">{route.patternId}</span>
                <span className={`text-[9px] font-mono px-1.5 py-0.5 border ${DAVINCI_CLASS[route.davinciRouteStatus]}`}>
                  {DAVINCI_LABEL[route.davinciRouteStatus]}
                </span>
              </div>
              <p className="mt-1 text-[9px] font-mono text-navy-400">TypographyRevealEngine / {route.canonicalMode}</p>
              <div className="mt-2 grid grid-cols-2 gap-1 text-[9px] text-navy-500 dark:text-navy-300">
                <span>Element CI: {candidate?.standaloneRenderCi ? "PASS" : "NO"}</span>
                <span>Studio Actual: {studioActual ? "PASS" : "NOT_RUN"}</span>
                <span>Palmier timing: READY</span>
                <span>Translator: {route.translatorSpecAvailable ? "READY" : "NO"}</span>
                <span>Actual workflow: {route.actualEvidenceWorkflowAvailable ? "READY" : "NO"}</span>
                <span>Live binding: {route.liveImplementationAvailable ? "READY" : "NOT_VERIFIED"}</span>
                <span>DaVinci Actual: {route.actualVerified ? "PASS" : "NOT_RUN"}</span>
                <span>Production: NOT_READY</span>
              </div>
              {requiredRoles.length > 0 ? (
                <div className="mt-2 border-t border-sand-200 dark:border-navy-600 pt-1.5">
                  <p className="text-[8px] font-semibold text-sky-700 dark:text-sky-300">
                    Human Review gate: machine parity + {requiredRoles.length} bindings + 1x/half-speed QA
                  </p>
                  <p className="mt-1 text-[8px] font-mono leading-3 text-navy-400 break-words">{requiredRoles.join(" · ")}</p>
                </div>
              ) : null}
              {route.davinciImplementationId ? <p className="mt-1 text-[8px] font-mono text-navy-400 break-all">{route.davinciImplementationId}</p> : null}
              <p className="mt-2 text-[9px] leading-4 text-navy-400">{route.rule}</p>
            </div>
          );
        })}
      </div>
      <p className="mt-2 border border-amber-200 dark:border-amber-800 p-2 text-[9px] leading-4 text-amber-800 dark:text-amber-200">
        Mask Revealだけがlive実装あり。残り8候補はcanonical translator + bounded Actual workflowまで到達しています。8候補すべてでrequired live bindings・machine parity・1x/half-speed QAを満たしても、別Human promotion reviewなしにActual検証済み/production-readyへ自動昇格しません。
      </p>
      <TypographyDaVinciActualRunQueue />
    </details>
  );
}
