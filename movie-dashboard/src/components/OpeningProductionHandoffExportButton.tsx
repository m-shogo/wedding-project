import {buildOpeningProductionStatusHandoffJson} from "../data/openingProductionStatusHandoff";
import {downloadText} from "../lib/exporters";
import {buildPalmierWeddingProductionGate} from "../lib/palmierWeddingProductionGate";
import {EffectiveProductionNextGateSummary} from "./EffectiveProductionNextGateSummary";

export function OpeningProductionHandoffExportButton({compact = false}: {compact?: boolean}) {
  const effectiveProject = buildPalmierWeddingProductionGate("opening").projects[0];
  const exportHandoff = () => downloadText(buildOpeningProductionStatusHandoffJson(), "opening-v1-production-handoff.json");
  return <div className={compact ? "inline-block" : "w-full border border-violet-300 dark:border-violet-700 px-3 py-3"}>
    <button type="button" onClick={exportHandoff} className={compact ? "px-3 py-2 border border-violet-300 dark:border-violet-700 text-xs font-semibold text-violet-700 dark:text-violet-300" : "w-full text-left"}>
      <span className="block text-[10px] tracking-[0.16em] font-semibold text-violet-500 dark:text-violet-300">OPENING PRODUCTION HANDOFF</span>
      <span className="mt-1 block text-sm font-bold text-navy-900 dark:text-sand-100">{compact ? "Production Handoff JSONを書き出す" : "11写真・BGM/ambience・critical path・Palmier / DaVinci状態を1 JSONへ"}</span>
      {!compact ? <span className="mt-1 block text-xs leading-5 text-navy-500 dark:text-navy-300">未準備でもBLOCKED / NOT_RUNを保持したまま書き出します。export自体はproductionReadyへの昇格ではありません。</span> : null}
    </button>
    {!compact && effectiveProject ? <EffectiveProductionNextGateSummary projectLabel="Opening" gate={effectiveProject.effectiveNextGate} /> : null}
  </div>;
}
