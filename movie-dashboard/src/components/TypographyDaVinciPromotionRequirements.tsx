import {
  getTypographyDaVinciRequiredBindingRoles,
  type TypographyDaVinciActualCandidatePatternId,
} from "../data/typographyDaVinciPromotionPolicy";
import type {TypographyProductionPatternId} from "../data/typographySceneProductionRouting";

function isActualCandidatePatternId(
  patternId: TypographyProductionPatternId,
): patternId is TypographyDaVinciActualCandidatePatternId {
  return patternId !== "type-mask-reveal";
}

export function TypographyDaVinciPromotionRequirements({
  patternId,
}: {
  patternId: TypographyProductionPatternId;
}) {
  if (!isActualCandidatePatternId(patternId)) {
    return (
      <div className="mt-2 border border-violet-200 dark:border-violet-800 p-2 text-[9px] leading-4 text-navy-500 dark:text-navy-300">
        <p className="font-semibold text-violet-700 dark:text-violet-300">Mask Reveal / live implementation route</p>
        <p className="mt-1">
          live実装は存在しますが、DaVinci Actual applied/readback/render evidenceは別gateです。live実装あり ≠ Actual verified ≠ production-ready。
        </p>
      </div>
    );
  }

  const roles = getTypographyDaVinciRequiredBindingRoles(patternId);

  return (
    <div className="mt-2 border border-sky-200 dark:border-sky-800 p-2.5 text-[9px] leading-4 text-navy-500 dark:text-navy-300">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-semibold text-sky-700 dark:text-sky-300">DaVinci Actual → Human Review requirements</p>
        <span className="font-mono text-[8px] text-sky-600 dark:text-sky-300">{roles.length} live binding roles</span>
      </div>
      <p className="mt-1 text-navy-400">
        TranslatorとActual workflowはあります。次の3群が全部揃って初めてHuman promotion reviewへ進めます。ここでは自動昇格しません。
      </p>
      <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-1.5">
        <div className="border border-sand-200 dark:border-navy-600 p-1.5">
          <p className="font-semibold">1. Machine parity</p>
          <p className="mt-0.5 text-navy-400">canonical expected ↔ Resolve apply/readback/render が全PASS</p>
        </div>
        <div className="border border-sand-200 dark:border-navy-600 p-1.5">
          <p className="font-semibold">2. Live bindings</p>
          <p className="mt-0.5 text-navy-400">下記required roleを実Resolve/Fusionから全件記録</p>
        </div>
        <div className="border border-sand-200 dark:border-navy-600 p-1.5">
          <p className="font-semibold">3. Visual QA</p>
          <p className="mt-0.5 text-navy-400">1x PASS + half-speed PASS + reviewedAt実記録</p>
        </div>
      </div>
      <div className="mt-2 flex flex-wrap gap-1">
        {roles.map((role) => (
          <span key={role} className="border border-sky-200 dark:border-sky-800 px-1.5 py-0.5 font-mono text-[8px] text-sky-700 dark:text-sky-300">
            {role}
          </span>
        ))}
      </div>
      {patternId === "type-type-on-rhythm" ? (
        <p className="mt-2 border border-amber-200 dark:border-amber-800 p-1.5 text-amber-800 dark:text-amber-200">
          Type on Rhythmは `FOLLOWER_UNIT` の存在だけでなく、readbackで WORDS が確認され `wordUnitApplied=PASS` になることが必須です。
        </p>
      ) : null}
      <p className="mt-2 font-semibold text-amber-700 dark:text-amber-300">
        現在のMac Resolve Actual: NOT_RUN / automaticPromotionAllowed: NO / productionReady: NO
      </p>
    </div>
  );
}
