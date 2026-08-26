import {
  typographyProductionRoutes,
  type DaVinciTypographyRouteStatus,
} from "../data/typographySceneProductionRouting";
import { getRemotionElementCandidate } from "../data/remotionElementCandidates";

const DAVINCI_LABEL: Record<DaVinciTypographyRouteStatus, string> = {
  DAVINCI_IMPLEMENTATION_AVAILABLE: "DaVinci routeあり",
  DAVINCI_TRANSLATION_NOT_IMPLEMENTED: "DaVinci翻訳待ち",
};

export function TypographyProductionRoutingMatrix() {
  return (
    <details className="mt-3">
      <summary className="cursor-pointer text-[10px] text-violet-700 dark:text-violet-300">
        Typography 9候補のProduction Routingを見る
      </summary>
      <p className="mt-2 text-[10px] leading-4 text-navy-400">
        Remotion Element候補とDaVinci実装済みは別状態です。Palmierは全候補でtimeline placement / trim / markerのみを担当し、Typography visual motionはDaVinci translatorが実装・検証された候補だけ昇格します。
      </p>
      <div className="mt-2 grid grid-cols-1 lg:grid-cols-2 gap-2">
        {typographyProductionRoutes.map((route) => {
          const candidate = getRemotionElementCandidate(route.patternId);
          const davinciReady = route.davinciRouteStatus === "DAVINCI_IMPLEMENTATION_AVAILABLE";
          const studioActual =
            candidate?.studioInstallActual === "PASS" && candidate?.studioControlReadbackActual === "PASS";

          return (
            <div key={route.patternId} className="border border-sand-200 dark:border-navy-600 p-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[10px] font-semibold text-navy-800 dark:text-sand-100">{route.patternId}</span>
                <span
                  className={`text-[9px] font-mono px-1.5 py-0.5 border ${
                    davinciReady
                      ? "border-emerald-300 text-emerald-700 dark:border-emerald-700 dark:text-emerald-300"
                      : "border-amber-300 text-amber-700 dark:border-amber-700 dark:text-amber-300"
                  }`}
                >
                  {DAVINCI_LABEL[route.davinciRouteStatus]}
                </span>
              </div>
              <p className="mt-1 text-[9px] font-mono text-navy-400">
                TypographyRevealEngine / {route.canonicalMode}
              </p>
              <div className="mt-2 grid grid-cols-2 gap-1 text-[9px] text-navy-500 dark:text-navy-300">
                <span>Element CI: {candidate?.standaloneRenderCi ? "PASS" : "NO"}</span>
                <span>Studio Actual: {studioActual ? "PASS" : "NOT_RUN"}</span>
                <span>Palmier timing: READY</span>
                <span>DaVinci Actual: NOT_RUN</span>
              </div>
              <p className="mt-2 text-[9px] leading-4 text-navy-400">{route.rule}</p>
            </div>
          );
        })}
      </div>
      <p className="mt-2 border border-amber-200 dark:border-amber-800 p-2 text-[9px] leading-4 text-amber-800 dark:text-amber-200">
        現時点でDaVinci visual routeを実装済みとして扱うのは type-mask-reveal のみです。それでも実Resolve applied-value/readback evidenceがNOT_RUNなのでproduction-readyではありません。
      </p>
    </details>
  );
}
