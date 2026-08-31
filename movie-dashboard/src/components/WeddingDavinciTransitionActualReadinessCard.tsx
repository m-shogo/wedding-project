import {weddingDavinciTransitionActualReadiness} from "../data/weddingDavinciTransitionActualReadiness.generated";
import {weddingDavinciActualCompletionReadiness} from "../data/weddingDavinciActualCompletionReadiness.generated";

const shortSha = (value: string | null) => value ? `${value.slice(0, 10)}…` : "—";
const stateClass = (state: string) => state === "CURRENT"
  ? "text-emerald-700 dark:text-emerald-300"
  : "text-amber-700 dark:text-amber-300";

export function WeddingDavinciTransitionActualReadinessCard() {
  const snapshot = weddingDavinciTransitionActualReadiness;
  const completion = weddingDavinciActualCompletionReadiness;
  const projects = [
    ["Opening", snapshot.opening, completion.opening],
    ["Profile", snapshot.profile, completion.profile],
  ] as const;
  const allCurrent = projects.every(([, transition, completed]) => transition.current && completed.current);

  return (
    <section className="mb-10 border border-cyan-300 dark:border-cyan-900/70 bg-white dark:bg-navy-800 p-5" aria-label="DaVinci transition Actual readiness">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[10px] tracking-[0.2em] font-semibold text-cyan-700 dark:text-cyan-300">DAVINCI TRANSITION ACTUAL / HUMAN GATE</p>
          <h2 className="mt-1 text-lg font-bold text-navy-900 dark:text-sand-100">Palmier transitionをDaVinci実GUIで確認し、finishing Actualと同じRecoveryへcompletion receiptで固定</h2>
          <p className="mt-2 max-w-4xl text-xs leading-5 text-navy-500 dark:text-navy-300">
            HARD CUT保持、CROSS DISSOLVE保持、CROSS DISSOLVEのexact frame尺をHumanがDaVinci上で確認します。
            その後、通常のfinishing Actualとtransition Actualが同一Recovery SHAへHuman PASSでbindingされていることをderived completion receiptへ固定します。
            表示・コマンドコピー・CI成功だけではActual PASSになりません。
          </p>
        </div>
        <div className="text-right">
          <p className={`text-sm font-bold ${allCurrent ? "text-emerald-700 dark:text-emerald-300" : "text-amber-700 dark:text-amber-300"}`}>
            {allCurrent ? "ACTUAL SET CURRENT" : "HUMAN ACTUAL / RECEIPT REQUIRED"}
          </p>
          <p className="mt-1 text-[10px] text-navy-400">NOT_RUN != PASS / RECEIPT != GUI ACTUAL</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-2">
        {projects.map(([label, project, completed]) => (
          <article key={label} className="border border-cyan-200 dark:border-cyan-900/60 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-bold text-navy-900 dark:text-sand-100">{label}</h3>
              <div className="text-right">
                <span className={`block text-xs font-semibold ${stateClass(project.state)}`}>Transition {project.state}</span>
                <span className={`mt-1 block text-[10px] font-semibold ${stateClass(completed.state)}`}>Completion {completed.state}</span>
              </div>
            </div>

            <dl className="mt-3 grid grid-cols-[max-content_1fr] gap-x-3 gap-y-2 text-[11px] leading-5 text-navy-500 dark:text-navy-300">
              <dt className="font-semibold">Human review</dt><dd>{project.reviewOverall}</dd>
              <dt className="font-semibold">Transition Evidence</dt><dd className="font-mono">{shortSha(project.evidenceSha256)}</dd>
              <dt className="font-semibold">Proof SHA</dt><dd className="font-mono">{shortSha(project.transitionProofSha256)}</dd>
              <dt className="font-semibold">Edges</dt><dd>{project.edgeCount ?? "—"}</dd>
              <dt className="font-semibold">Cross Dissolve</dt><dd>{project.crossDissolveCount ?? "—"}</dd>
              <dt className="font-semibold">Completion Receipt</dt><dd className="font-mono">{shortSha(completed.receiptSha256)}</dd>
              <dt className="font-semibold">Bound Recovery</dt><dd className="font-mono">{shortSha(completed.recoverySha256)}</dd>
              <dt className="font-semibold">Finishing Evidence</dt><dd className="font-mono">{shortSha(completed.finishingEvidenceSha256)}</dd>
              <dt className="font-semibold">Bound Transition</dt><dd className="font-mono">{shortSha(completed.transitionEvidenceSha256)}</dd>
              <dt className="font-semibold">Evidence path</dt><dd className="break-all font-mono text-[9px]">{project.evidencePath}</dd>
              <dt className="font-semibold">Receipt path</dt><dd className="break-all font-mono text-[9px]">{completed.receiptPath}</dd>
            </dl>

            {!project.current && (
              <div className="mt-4 border-l-2 border-amber-400 pl-3">
                <p className="text-[10px] font-semibold text-amber-800 dark:text-amber-300">HUMAN / MAC DAVINCI GUI REQUIRED</p>
                <p className="mt-1 text-[10px] leading-4 text-amber-800 dark:text-amber-300">
                  1) templateを初期化 → 2) DaVinci上で各edgeを実再生確認 → 3) JSONへHuman verdictを記録 → 4) strict → 5) final transition gate の順です。
                </p>
              </div>
            )}

            <div className="mt-4 space-y-2">
              <div>
                <p className="text-[9px] font-semibold text-cyan-700 dark:text-cyan-300">1 / INIT — verdictは全てNOT_RUN</p>
                <code className="mt-1 block overflow-x-auto bg-navy-950 px-3 py-2 text-[9px] leading-4 text-sand-100">{project.initCommand}</code>
              </div>
              <div>
                <p className="text-[9px] font-semibold text-cyan-700 dark:text-cyan-300">2 / STRICT — Human確認後のみ通る</p>
                <code className="mt-1 block overflow-x-auto bg-navy-950 px-3 py-2 text-[9px] leading-4 text-sand-100">{project.strictCommand}</code>
              </div>
              <div>
                <p className="text-[9px] font-semibold text-cyan-700 dark:text-cyan-300">3 / FINAL DELIVERY TRANSITION GATE</p>
                <code className="mt-1 block overflow-x-auto bg-navy-950 px-3 py-2 text-[9px] leading-4 text-sand-100">{project.finalGateCommand}</code>
              </div>
              <div className="border-t border-cyan-200 dark:border-cyan-900/60 pt-3">
                <p className="text-[9px] font-semibold text-indigo-700 dark:text-indigo-300">4 / ACTUAL COMPLETION RECEIPT — finishing + transitionを同一Recoveryへ固定</p>
                <code className="mt-1 block overflow-x-auto bg-navy-950 px-3 py-2 text-[9px] leading-4 text-sand-100">{completed.writeCommand}</code>
                <p className="mt-2 text-[9px] font-semibold text-indigo-700 dark:text-indigo-300">5 / COMPLETION STRICT — evidence/proof driftを再検証</p>
                <code className="mt-1 block overflow-x-auto bg-navy-950 px-3 py-2 text-[9px] leading-4 text-sand-100">{completed.strictCommand}</code>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-4 border border-amber-200 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/10 p-3">
        <p className="text-[10px] leading-4 text-amber-800 dark:text-amber-300">
          GENERATED DASHBOARD SNAPSHOT != LIVE MAC DAVINCI GUI ACTUAL。Transition/finishing evidence、Recovery、またはproof SHAが変わったらcompletion receiptはstaleになり、再生成・strict再確認が必要です。
          Derived receipt自体はMac GUI操作を行わず、productionReadyを昇格させません。
        </p>
      </div>
    </section>
  );
}
