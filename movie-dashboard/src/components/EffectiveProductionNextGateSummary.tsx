import {Link} from "react-router-dom";
import type {PalmierEffectiveNextGate, PalmierEffectiveRecoveryAction} from "../lib/palmierWeddingProductionGate";

function EffectiveRecoveryAction({action}: {action: PalmierEffectiveRecoveryAction}) {
  if (action.kind === "ROUTE" && action.route) {
    return <Link to={action.route} title={action.purpose} className="border border-red-300 px-2 py-1 text-[10px] font-semibold text-red-700 dark:border-red-800 dark:text-red-300">{action.label} →</Link>;
  }
  if (action.kind === "COMMAND" && action.command) {
    return <code title={action.purpose} className="border border-red-300 px-2 py-1 text-[10px] text-red-700 dark:border-red-800 dark:text-red-300">{action.command}</code>;
  }
  return <span title={action.purpose} className="border border-red-300 px-2 py-1 text-[10px] text-red-700 dark:border-red-800 dark:text-red-300">{action.label} · HUMAN</span>;
}

export function EffectiveProductionNextGateSummary({projectLabel, gate}: {projectLabel: "Opening" | "Profile"; gate: PalmierEffectiveNextGate}) {
  const blocked = gate.state !== "PRODUCTION_READY";
  return (
    <div className="mt-3 border-t border-violet-200 pt-3 dark:border-violet-800">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[10px] font-semibold tracking-[0.16em] text-violet-500 dark:text-violet-300">EFFECTIVE NEXT GATE</span>
        <span className={blocked ? "border border-amber-300 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:border-amber-700 dark:text-amber-300" : "border border-emerald-300 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:border-emerald-700 dark:text-emerald-300"}>{gate.state}</span>
      </div>
      <p className="mt-2 text-xs font-semibold text-navy-900 dark:text-sand-100">{blocked ? `${projectLabel} NOW: ${gate.stage ?? "UNKNOWN_STAGE"}` : `${projectLabel} production ready`}</p>
      <p className="mt-1 break-all text-[10px] leading-5 text-navy-500 dark:text-navy-300"><strong>Authority:</strong> {gate.authority ?? "none"}</p>
      {gate.artifactPath ? <p className="mt-1 break-all text-[10px] leading-5 text-navy-500 dark:text-navy-300"><strong>Artifact:</strong> {gate.artifactPath}</p> : null}
      {gate.adoptedCandidateIds.length > 0 ? <p className="mt-1 break-all text-[10px] leading-5 text-violet-600 dark:text-violet-300"><strong>Adopted Remotion:</strong> {gate.adoptedCandidateIds.join(", ")}</p> : null}
      {gate.blockerCodes.length > 0 ? <div className="mt-2 flex flex-wrap gap-1.5">{gate.blockerCodes.map((code) => <code key={code} className="border border-amber-200 bg-amber-50 px-1.5 py-0.5 text-[10px] text-amber-800 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200">{code}</code>)}</div> : null}
      {gate.blockerActions.length > 0 ? <div className="mt-2"><p className="mb-1 text-[10px] font-semibold tracking-[0.12em] text-red-500 dark:text-red-300">ACTUAL NEXT ACTION</p><div className="flex flex-wrap gap-1.5">{gate.blockerActions.map((action) => <EffectiveRecoveryAction key={`${action.kind}-${action.label}`} action={action} />)}</div></div> : null}
      {gate.recovery.length > 0 ? <div className="mt-2 space-y-1"><p className="text-[10px] font-semibold tracking-[0.12em] text-navy-400 dark:text-navy-400">EFFECTIVE RECOVERY</p>{gate.recovery.map((action) => <p key={action} className="break-words font-mono text-[10px] leading-5 text-navy-600 dark:text-navy-200">{action}</p>)}</div> : null}
      <p className="mt-2 text-[9px] leading-4 text-violet-500 dark:text-violet-300">Wedding canonical blockerを先に解消し、canonical READY後に明示採用Remotion dependencyが未完了ならそちらを次gateとして表示します。表示・exportだけではHuman QA / Studio Actual / DaVinci ActualをPASSへ昇格しません。</p>
    </div>
  );
}
