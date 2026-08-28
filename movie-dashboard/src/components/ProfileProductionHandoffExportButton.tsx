import {buildProfileProductionStatusHandoff, buildProfileProductionStatusHandoffJson} from "../data/profileProductionStatusHandoff";
import {downloadText} from "../lib/exporters";
import {ProductionNextGateSummary} from "./ProductionNextGateSummary";

export function ProfileProductionHandoffExportButton({compact = false}: {compact?: boolean}) {
  const handoff = buildProfileProductionStatusHandoff();
  const nextGate = handoff.profile.production.nextGate;
  const exportHandoff = () => downloadText(buildProfileProductionStatusHandoffJson(), "profile-v1-production-handoff.json");
  return <div className={compact ? "inline-block" : "w-full border border-violet-300 dark:border-violet-700 px-3 py-3"}>
    <button type="button" onClick={exportHandoff} className={compact ? "px-3 py-2 border border-violet-300 dark:border-violet-700 text-xs font-semibold text-violet-700 dark:text-violet-300" : "w-full text-left"}>
      <span className="block text-[10px] tracking-[0.16em] font-semibold text-violet-500 dark:text-violet-300">PROFILE PRODUCTION HANDOFF</span>
      <span className="mt-1 block text-sm font-bold text-navy-900 dark:text-sand-100">{compact ? "Production Handoff JSONを書き出す" : "17素材・BGM・critical path・Palmier / DaVinci状態を1 JSONへ"}</span>
      {!compact ? <span className="mt-1 block text-xs leading-5 text-navy-500 dark:text-navy-300">未準備でもBLOCKED / NOT_RUNを保持したまま書き出します。export自体はproductionReadyへの昇格ではありません。</span> : null}
    </button>
    {!compact ? <ProductionNextGateSummary projectLabel="Profile" state={nextGate.state} stage={nextGate.stage} artifactPath={nextGate.artifactPath} blockerCodes={nextGate.blockerCodes} recovery={nextGate.recovery} actionTargets={nextGate.actionTargets} /> : null}
  </div>;
}
