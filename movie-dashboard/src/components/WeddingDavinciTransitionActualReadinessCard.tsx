import {weddingDavinciTransitionActualReadiness} from "../data/weddingDavinciTransitionActualReadiness.generated";
import {weddingDavinciActualCompletionReadiness} from "../data/weddingDavinciActualCompletionReadiness.generated";
import {weddingFinalApprovalCompletionReadiness} from "../data/weddingFinalApprovalCompletionReadiness.generated";

const shortSha = (value: string | null) => value ? `${value.slice(0, 10)}…` : "—";
const stateClass = (state: string) => state === "CURRENT"
  ? "text-emerald-700 dark:text-emerald-300"
  : "text-amber-700 dark:text-amber-300";

export function WeddingDavinciTransitionActualReadinessCard() {
  const snapshot = weddingDavinciTransitionActualReadiness;
  const completion = weddingDavinciActualCompletionReadiness;
  const approvalBinding = weddingFinalApprovalCompletionReadiness;
  const projects = [
    ["Opening", snapshot.opening, completion.opening, approvalBinding.opening],
    ["Profile", snapshot.profile, completion.profile, approvalBinding.profile],
  ] as const;
  const allCurrent = projects.every(([, transition, completed, bound]) => transition.current && completed.current && bound.current);

  return (
    <section className="mb-10 border border-cyan-300 dark:border-cyan-900/70 bg-white dark:bg-navy-800 p-5" aria-label="DaVinci transition Actual readiness">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[10px] tracking-[0.2em] font-semibold text-cyan-700 dark:text-cyan-300">DAVINCI TRANSITION ACTUAL / HUMAN GATE</p>
          <h2 className="mt-1 text-lg font-bold text-navy-900 dark:text-sand-100">DaVinci Actual → completion receipt → Human final approval → final bindingまで一つの証拠鎖で確認</h2>
          <p className="mt-2 max-w-4xl text-xs leading-5 text-navy-500 dark:text-navy-300">
            HARD CUT保持、CROSS DISSOLVE保持、exact frame尺をHumanがDaVinci上で確認し、finishing Actualとtransition Actualを同一Recoveryへcompletion receiptで固定します。
            Human final approval後は、そのapproval自体もcurrent completion receiptへderived bindingします。表示・コマンドコピー・CI成功だけではActual PASSやHuman approvalになりません。
          </p>
        </div>
        <div className="text-right">
          <p className={`text-sm font-bold ${allCurrent ? "text-emerald-700 dark:text-emerald-300" : "text-amber-700 dark:text-amber-300"}`}>
            {allCurrent ? "FINAL EVIDENCE CHAIN CURRENT" : "HUMAN ACTUAL / FINAL BINDING REQUIRED"}
          </p>
          <p className="mt-1 text-[10px] text-navy-400">NOT_RUN != PASS / DERIVED BINDING != HUMAN APPROVAL</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-2">
        {projects.map(([label, project, completed, bound]) => (
          <article key={label} className="border border-cyan-200 dark:border-cyan-900/60 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-bold text-navy-900 dark:text-sand-100">{label}</h3>
              <div className="text-right">
                <span className={`block text-xs font-semibold ${stateClass(project.state)}`}>Transition {project.state}</span>
                <span className={`mt-1 block text-[10px] font-semibold ${stateClass(completed.state)}`}>Completion {completed.state}</span>
                <span className={`mt-1 block text-[10px] font-semibold ${stateClass(bound.state)}`}>Final binding {bound.state}</span>
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
              <dt className="font-semibold">Final Approval</dt><dd className="font-mono">{shortSha(bound.finalApprovalSha256)}</dd>
              <dt className="font-semibold">Final Binding</dt><dd className="font-mono">{shortSha(bound.bindingSha256)}</dd>
              <dt className="font-semibold">Bound Completion</dt><dd className="font-mono">{shortSha(bound.completionReceiptSha256)}</dd>
              <dt className="font-semibold">Evidence path</dt><dd className="break-all font-mono text-[9px]">{project.evidencePath}</dd>
              <dt className="font-semibold">Receipt path</dt><dd className="break-all font-mono text-[9px]">{completed.receiptPath}</dd>
              <dt className="font-semibold">Binding path</dt><dd className="break-all font-mono text-[9px]">{bound.bindingPath}</dd>
            </dl>

            {!project.current && (
              <div className="mt-4 border-l-2 border-amber-400 pl-3">
                <p className="text-[10px] font-semibold text-amber-800 dark:text-amber-300">HUMAN / MAC DAVINCI GUI REQUIRED</p>
                <p className="mt-1 text-[10px] leading-4 text-amber-800 dark:text-amber-300">template初期化 → DaVinci上で各edgeを実再生確認 → Human verdict記録 → strict → transition gate の順です。</p>
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
                <p className="mt-2 text-[9px] font-semibold text-indigo-700 dark:text-indigo-300">5 / COMPLETION STRICT</p>
                <code className="mt-1 block overflow-x-auto bg-navy-950 px-3 py-2 text-[9px] leading-4 text-sand-100">{completed.strictCommand}</code>
              </div>
              <div className="border-t border-violet-200 dark:border-violet-900/60 pt-3">
                <p className="text-[9px] font-semibold text-violet-700 dark:text-violet-300">6 / FINAL APPROVAL COMPLETION BINDING — Human approval後のみ</p>
                <code className="mt-1 block overflow-x-auto bg-navy-950 px-3 py-2 text-[9px] leading-4 text-sand-100">{bound.writeCommand}</code>
                <p className="mt-2 text-[9px] font-semibold text-violet-700 dark:text-violet-300">7 / FINAL BINDING STRICT — approval / receipt driftを再検証</p>
                <code className="mt-1 block overflow-x-auto bg-navy-950 px-3 py-2 text-[9px] leading-4 text-sand-100">{bound.strictCommand}</code>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-4 border border-amber-200 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/10 p-3">
        <p className="text-[10px] leading-4 text-amber-800 dark:text-amber-300">
          GENERATED DASHBOARD SNAPSHOT != LIVE MAC DAVINCI GUI ACTUAL。Transition/finishing evidence、Recovery、completion receipt、Human final approvalのいずれかが変われば最終bindingはstaleです。
          Derived receipt/bindingはMac GUI操作もHuman approvalも行わず、productionReadyを自動昇格させません。
        </p>
      </div>
    </section>
  );
}
