import {profileDavinciActualBindingAudit as audit} from "../data/profileDavinciActualBindingAudit.generated";

const shortSha = (value: string | null | undefined) => value ? `${value.slice(0, 12)}…` : "PENDING";

export function ProfileDavinciActualBindingAuditCard() {
  const currentTone = audit.current
    ? "border-emerald-200 dark:border-emerald-800"
    : audit.state === "STALE" || audit.state === "INVALID"
      ? "border-rose-200 dark:border-rose-800"
      : "border-slate-200 dark:border-slate-700";

  return (
    <div className={`mt-2 border ${currentTone} p-2`}>
      <div className="flex flex-wrap items-center justify-between gap-1">
        <p className="text-[8px] font-semibold text-indigo-700 dark:text-indigo-300">DAVINCI ACTUAL / RECOVERY BINDING AUDIT</p>
        <span className="text-[8px] text-navy-500 dark:text-navy-300">{audit.state} / current={audit.current ? "YES" : "NO"}</span>
      </div>

      <div className="mt-1 grid gap-1 sm:grid-cols-2 text-[8px] leading-4 text-navy-500 dark:text-navy-300">
        <div className="border border-slate-100 dark:border-slate-800 px-2 py-1.5">
          <div className="font-semibold">Current recovery authority</div>
          <div>sidecar: <code className="break-all">{audit.recovery.path}</code></div>
          <div>exists: {audit.recovery.exists ? "YES" : "NO"}</div>
          <div>recovery SHA: <code>{shortSha(audit.recovery.sha256)}</code></div>
          <div>render SHA: <code>{shortSha(audit.recovery.sourceRenderSha256)}</code></div>
          <div>Human QA SHA: <code>{shortSha(audit.recovery.realMediaHumanQaEvidenceSha256)}</code></div>
          <div>Human QA fingerprint: <code>{shortSha(audit.recovery.realMediaHumanQaBindingFingerprintSha256)}</code></div>
        </div>

        <div className="border border-slate-100 dark:border-slate-800 px-2 py-1.5">
          <div className="font-semibold">Mac DaVinci Actual evidence binding</div>
          <div>evidence: <code className="break-all">{audit.actualEvidence.path}</code></div>
          <div>exists: {audit.actualEvidence.exists ? "YES" : "NO"}</div>
          <div>evidence SHA: <code>{shortSha(audit.actualEvidence.sha256)}</code></div>
          <div>bound recovery SHA: <code>{shortSha(audit.actualEvidence.boundRecoverySha256)}</code></div>
          <div>bound render SHA: <code>{shortSha(audit.actualEvidence.boundSourceRenderSha256)}</code></div>
          <div>bound Human QA SHA: <code>{shortSha(audit.actualEvidence.boundRealMediaHumanQaEvidenceSha256)}</code></div>
          <div>bound Human QA fingerprint: <code>{shortSha(audit.actualEvidence.boundRealMediaHumanQaBindingFingerprintSha256)}</code></div>
          <div>review: {audit.actualEvidence.reviewOverall} / all checks PASS={audit.actualEvidence.allChecksPass ? "YES" : "NO"}</div>
        </div>
      </div>

      {audit.mismatches.length > 0 ? (
        <div className="mt-1 border border-rose-200 dark:border-rose-800 px-2 py-1.5 text-[8px] leading-4 text-rose-700 dark:text-rose-300">
          stale reasons: {audit.mismatches.join(" / ")}
        </div>
      ) : null}

      <p className="mt-1 text-[8px] text-navy-400">
        {audit.guardrails.join(" / ")} / productionReady={audit.productionReady ? "YES" : "NO"}
      </p>
    </div>
  );
}
