import {getTypographyProductionRouteGuide} from "../data/typographyProductionRouteGuide";
import type {TypographyProductionPatternId} from "../data/typographySceneProductionRouting";

const energyLabel = {
  CALM: "静か",
  BALANCED: "中間",
  ENERGETIC: "強い",
} as const;

const rhythmLabel = {
  CONTINUOUS: "滑らか",
  STAGGERED: "時間差",
  HIT_BASED: "ヒット",
} as const;

export function TypographyProductionRouteChoiceGuide({patternId}: {patternId: TypographyProductionPatternId}) {
  const guide = getTypographyProductionRouteGuide(patternId);
  return (
    <div className="mt-2 border-t border-sand-100 dark:border-navy-700 pt-2">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-[10px] font-semibold text-navy-700 dark:text-sand-100">{guide.labelJa}</span>
        <span className="border border-sand-200 dark:border-navy-600 px-1.5 py-0.5 text-[7px] text-navy-400">強さ {energyLabel[guide.energy]}</span>
        <span className="border border-sand-200 dark:border-navy-600 px-1.5 py-0.5 text-[7px] text-navy-400">動き {rhythmLabel[guide.rhythm]}</span>
      </div>
      <p className="mt-1 text-[8px] leading-3.5 text-navy-500 dark:text-navy-300">{guide.motionSignatureJa}</p>
      <p className="mt-1 text-[8px] leading-3.5 text-emerald-700 dark:text-emerald-300">向く: {guide.bestForJa}</p>
      <p className="text-[8px] leading-3.5 text-amber-700 dark:text-amber-300">避ける: {guide.avoidWhenJa}</p>
    </div>
  );
}
