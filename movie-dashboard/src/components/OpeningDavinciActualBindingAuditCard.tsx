import {openingDavinciActualBindingAudit as audit} from "../data/openingDavinciActualBindingAudit.generated";

const shortSha = (value: string | null | undefined) => value ? `${value.slice(0, 12)}…` : "PENDING";

export function OpeningDavinciActualBindingAuditCard() {
  const auditState = String(audit.state);
  const auditCurrent = Boolean(audit.current);
  const tone = auditCurrent
    ? "border-emerald-200 dark:border-emerald-800"
    : auditState === "STALE" || auditState === "INVALID"
      ? "border-rose-200 dark:border-rose-800"
      : "border-slate-200 dark:border-slate-700";

  return (
    <div className={`mt-2 border ${tone} p-2`}>
      <div className="flex flex-wrap items-center justify-between gap-1">
        <p className="text-[8px] font-semibold text-indigo-700 dark:text-indigo-300">OPENING DAVINCI ACTUAL / RECOVERY / FINAL APPROVAL AUDIT</p>
        <span className="text-[8px] text-navy-500 dark:text-navy-300">{auditState} / current={auditCurrent ? "YES" : "NO"}</span>
      </div>
      <div className="mt-1 grid gap-1 lg:grid-cols-3 text-[8px] leading-4 text-navy-500 dark:text-navy-300">
        <div className="border border-slate-100 dark:border-slate-800 px-2 py-1.5">
          <div className="font-semibold">Current recovery</div>
          <div>SHA: <code>{shortSha(audit.recovery.sha256)}</code></div>
          <div>render: <code>{shortSha(audit.recovery.sourceRenderSha256)}</code></div>
          <div>crop QA: <code>{shortSha(audit.recovery.cropReviewEvidenceSha256)}</code></div>
          <div>crop fingerprint: <code>{shortSha(audit.recovery.cropReviewBindingFingerprintSha256)}</code></div>
        </div>
        <div className="border border-slate-100 dark:border-slate-800 px-2 py-1.5">
          <div className="font-semibold">Mac DaVinci Actual binding</div>
          <div>evidence SHA: <code>{shortSha(audit.actualEvidence.sha256)}</code></div>
          <div>bound recovery: <code>{shortSha(audit.actualEvidence.boundRecoverySha256)}</code></div>
          <div>bound render: <code>{shortSha(audit.actualEvidence.boundSourceRenderSha256)}</code></div>
          <div>bound crop QA: <code>{shortSha(audit.actualEvidence.boundCropReviewEvidenceSha256)}</code></div>
          <div>review: {audit.actualEvidence.reviewOverall} / all PASS={audit.actualEvidence.allChecksPass ? "YES" : "NO"}</div>
        </div>
        <div className="border border-slate-100 dark:border-slate-800 px-2 py-1.5">
          <div className="font-semibold">Human final approval binding</div>
          <div>approval SHA: <code>{shortSha(audit.finalApproval.sha256)}</code></div>
          <div>decision: {audit.finalApproval.decision}</div>
          <div>current: {audit.finalApproval.current ? "YES" : "NO"}</div>
          <div>bound recovery: <code>{shortSha(audit.finalApproval.boundRecoverySha256)}</code></div>
          <div>bound Actual: <code>{shortSha(audit.finalApproval.boundDavinciEvidenceSha256)}</code></div>
        </div>
      </div>
      {audit.mismatches.length > 0 ? <div className="mt-1 border border-rose-200 dark:border-rose-800 px-2 py-1.5 text-[8px] text-rose-700 dark:text-rose-300">stale reasons: {audit.mismatches.join(" / ")}</div> : null}
      <p className="mt-1 text-[8px] text-navy-400">{audit.guardrails.join(" / ")} / productionReady={audit.productionReady ? "YES" : "NO"}</p>
    </div>
  );
}
