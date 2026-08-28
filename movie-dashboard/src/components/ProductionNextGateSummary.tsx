import {Link} from "react-router-dom";

type ActionTarget = {label: string; route: string; purpose: string};

type ProductionNextGateSummaryProps = {
  projectLabel: "Opening" | "Profile";
  state: "BLOCKED" | "PRODUCTION_READY";
  stage: string | null;
  artifactPath: string | null;
  blockerCodes: readonly string[];
  recovery: readonly string[];
  actionTargets: readonly ActionTarget[];
};

export function ProductionNextGateSummary({projectLabel, state, stage, artifactPath, blockerCodes, recovery, actionTargets}: ProductionNextGateSummaryProps) {
  const blocked = state === "BLOCKED";
  return (
    <div className="mt-3 border-t border-violet-200 pt-3 dark:border-violet-800">
      <div className="flex flex-wrap items-center gap-2"><span className="text-[10px] font-semibold tracking-[0.16em] text-violet-500 dark:text-violet-300">NEXT GATE</span><span className={blocked ? "border border-amber-300 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:border-amber-700 dark:text-amber-300" : "border border-emerald-300 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:border-emerald-700 dark:text-emerald-300"}>{state}</span></div>
      <p className="mt-2 text-xs font-semibold text-navy-900 dark:text-sand-100">{blocked ? `${projectLabel} NOW: ${stage ?? "UNKNOWN_STAGE"}` : `${projectLabel} production gate cleared`}</p>
      {artifactPath ? <p className="mt-1 break-all text-[11px] leading-5 text-navy-500 dark:text-navy-300">ARTIFACT: {artifactPath}</p> : null}
      {blockerCodes.length > 0 ? <div className="mt-2 flex flex-wrap gap-1.5">{blockerCodes.map((code) => <code key={code} className="border border-amber-200 bg-amber-50 px-1.5 py-0.5 text-[10px] text-amber-800 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200">{code}</code>)}</div> : null}
      {actionTargets.length > 0 ? <div className="mt-2 flex flex-wrap gap-1.5">{actionTargets.map((target) => <Link key={`${target.route}-${target.label}`} to={target.route} title={target.purpose} className="border border-violet-300 px-2 py-1 text-[10px] font-semibold text-violet-700 dark:border-violet-700 dark:text-violet-300">{target.label} →</Link>)}</div> : null}
      {recovery.length > 0 ? <div className="mt-2 space-y-1"><p className="text-[10px] font-semibold tracking-[0.12em] text-navy-400 dark:text-navy-400">CANONICAL RECOVERY</p>{recovery.map((action) => <p key={action} className="break-words font-mono text-[10px] leading-5 text-navy-600 dark:text-navy-200">{action}</p>)}</div> : null}
    </div>
  );
}
