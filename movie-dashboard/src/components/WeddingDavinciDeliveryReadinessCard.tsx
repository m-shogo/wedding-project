import {buildWeddingDavinciDeliveryReadiness} from "../data/weddingDavinciDeliveryReadiness";

const shortSha = (value: string | null) => value ? `${value.slice(0, 10)}…` : "—";

const stateClass = (state: string) => {
  if (state === "READY") return "text-emerald-700 dark:text-emerald-300";
  if (state === "INVALID" || state === "STALE") return "text-rose-700 dark:text-rose-300";
  return "text-amber-700 dark:text-amber-300";
};

export function WeddingDavinciDeliveryReadinessCard() {
  const manifest = buildWeddingDavinciDeliveryReadiness();
  const projects = [
    ["Opening", manifest.opening],
    ["Profile", manifest.profile],
  ] as const;

  return (
    <section className="mb-10 border border-sand-300 dark:border-navy-600 bg-white dark:bg-navy-800 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[10px] tracking-[0.2em] font-semibold text-sky-700 dark:text-sky-300">WEDDING-WIDE DAVINCI DELIVERY READINESS</p>
          <h2 className="mt-1 text-lg font-bold text-navy-900 dark:text-sand-100">Opening / Profile の最終handoff鎖を同時に監査</h2>
          <p className="mt-2 text-xs leading-5 text-navy-500 dark:text-navy-300">
            recovery SHA → Mac DaVinci Actual evidence → Human final approval が両MovieでCURRENTになるまで、Wedding全体はREADYへ昇格しません。
          </p>
        </div>
        <div className="text-right">
          <p className={`text-sm font-bold ${stateClass(manifest.state)}`}>{manifest.state}</p>
          <p className="mt-1 text-[10px] text-navy-400">strict delivery: {manifest.strictDeliveryEligible ? "ELIGIBLE" : "BLOCKED"}</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-2">
        {projects.map(([label, project]) => (
          <article key={label} className="border border-sand-200 dark:border-navy-600 p-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-bold text-navy-900 dark:text-sand-100">{label}</h3>
              <span className={`text-xs font-semibold ${stateClass(project.state)}`}>{project.state}</span>
            </div>
            <dl className="mt-3 grid grid-cols-[max-content_1fr] gap-x-3 gap-y-2 text-[11px] leading-5 text-navy-500 dark:text-navy-300">
              <dt className="font-semibold">Audit</dt><dd>{project.audit.state}</dd>
              <dt className="font-semibold">Recovery SHA</dt><dd className="font-mono">{shortSha(project.audit.recoverySha256)}</dd>
              <dt className="font-semibold">Render SHA</dt><dd className="font-mono">{shortSha(project.handoff.sourceRenderSha256)}</dd>
              <dt className="font-semibold">Actual SHA</dt><dd className="font-mono">{shortSha(project.audit.actualEvidenceSha256)}</dd>
              <dt className="font-semibold">Approval SHA</dt><dd className="font-mono">{shortSha(project.audit.finalApprovalSha256)}</dd>
              <dt className="font-semibold">Approval</dt><dd>{project.audit.finalApprovalDecision} / current={project.audit.finalApprovalCurrent ? "YES" : "NO"}</dd>
              <dt className="font-semibold">Next gate</dt><dd>{project.nextGate.stage ?? "PRODUCTION_READY"}</dd>
            </dl>
            {project.audit.mismatches.length > 0 && (
              <div className="mt-3 border-l-2 border-rose-400 pl-3">
                <p className="text-[10px] font-semibold text-rose-700 dark:text-rose-300">STALE / INVALID REASONS</p>
                <ul className="mt-1 space-y-1 text-[10px] leading-4 text-rose-700 dark:text-rose-300">
                  {project.audit.mismatches.map((reason) => <li key={reason}>{reason}</li>)}
                </ul>
              </div>
            )}
          </article>
        ))}
      </div>

      <p className="mt-4 text-[10px] leading-4 text-navy-400">
        GUI Actualをこの画面やCIから昇格させることはありません。Mac/Remotion Studio/DaVinciの実操作をしていない証拠は引き続きNOT_RUNとして扱います。
      </p>
    </section>
  );
}
