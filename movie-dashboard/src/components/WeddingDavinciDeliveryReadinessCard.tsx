import {useState} from "react";
import {buildWeddingDavinciDeliveryReadiness} from "../data/weddingDavinciDeliveryReadiness";
import {
  buildWeddingDavinciFinalDeliveryPreflight,
  buildWeddingDavinciOperatorPacketJson,
} from "../data/weddingDavinciFinalDeliveryPreflight";
import {
  buildWeddingDavinciActualSessionPlan,
  buildWeddingDavinciActualSessionPlanJson,
} from "../data/weddingDavinciActualSessionPlan";
import {
  auditTransportedWeddingDavinciActualSessionPlan,
  defaultWeddingDavinciActualSessionPlanTransportAudit,
} from "../data/weddingDavinciActualSessionPlanTransportAudit";

const shortSha = (value: string | null) => value ? `${value.slice(0, 10)}…` : "—";

const stateClass = (state: string) => {
  if (state === "READY" || state === "CURRENT" || state.includes("RECORDED")) return "text-emerald-700 dark:text-emerald-300";
  if (state === "INVALID" || state === "STALE" || state.includes("BLOCKED")) return "text-rose-700 dark:text-rose-300";
  return "text-amber-700 dark:text-amber-300";
};

const nextGateLabel = (nextGate: {stage?: string | null} | null | undefined) => nextGate?.stage ?? "PRODUCTION_READY";

const downloadJson = (json: string, filename: string) => {
  const blob = new Blob([`${json}\n`], {type: "application/json;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
};

const downloadOperatorPacket = () => downloadJson(
  buildWeddingDavinciOperatorPacketJson(),
  "wedding-davinci-operator-packet.json",
);

const downloadDashboardSessionPlanReference = () => downloadJson(
  buildWeddingDavinciActualSessionPlanJson(),
  "wedding-davinci-actual-session-plan-dashboard-reference.json",
);

export function WeddingDavinciDeliveryReadinessCard() {
  const manifest = buildWeddingDavinciDeliveryReadiness();
  const preflight = buildWeddingDavinciFinalDeliveryPreflight();
  const sessionPlan = buildWeddingDavinciActualSessionPlan();
  const [transportAudit, setTransportAudit] = useState(defaultWeddingDavinciActualSessionPlanTransportAudit);
  const projects = [
    ["Opening", manifest.opening],
    ["Profile", manifest.profile],
  ] as const;
  const sessionProjects = [
    ["Opening", sessionPlan.projects.opening],
    ["Profile", sessionPlan.projects.profile],
  ] as const;

  const inspectTransportedSessionPlan = async (file: File | undefined) => {
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text());
      setTransportAudit(auditTransportedWeddingDavinciActualSessionPlan(parsed));
    } catch {
      setTransportAudit(auditTransportedWeddingDavinciActualSessionPlan(null));
    }
  };

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
              <dt className="font-semibold">Next gate</dt><dd>{nextGateLabel(project.nextGate)}</dd>
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

      <section className="mt-5 border-t border-sand-200 dark:border-navy-600 pt-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[10px] tracking-[0.2em] font-semibold text-fuchsia-700 dark:text-fuchsia-300">MAC DAVINCI ACTUAL SESSION PLAN</p>
            <h3 className="mt-1 text-base font-bold text-navy-900 dark:text-sand-100">Recovery → evidence init → 実GUI確認 → strict → Human approval</h3>
            <p className="mt-2 text-[11px] leading-5 text-navy-500 dark:text-navy-300">
              MacでDaVinciを開く時の一本道です。Evidence templateやこの画面の存在をActual PASSとして扱うことはありません。
            </p>
          </div>
          <button
            type="button"
            onClick={downloadDashboardSessionPlanReference}
            className="border border-fuchsia-500 px-3 py-2 text-[11px] font-semibold text-fuchsia-800 dark:text-fuchsia-200 hover:bg-fuchsia-100 dark:hover:bg-fuchsia-950/40"
          >
            Dashboard参照JSONを保存
          </button>
        </div>

        <div className="mt-4 border border-fuchsia-200 dark:border-fuchsia-900/50 bg-fuchsia-50/30 dark:bg-fuchsia-950/10 p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.16em] text-fuchsia-800 dark:text-fuchsia-300">TRANSPORTED SESSION PLAN AUDIT</p>
              <p className="mt-1 text-[11px] leading-5 text-navy-500 dark:text-navy-300">
                Macへ持ち出した正本JSONを読み込み、Opening/Profileの共通bindingが古くないか確認します。Browser一致だけではCURRENTにせず、必ずcanonical CLI strict-currentを要求します。
              </p>
            </div>
            <span className={`text-xs font-bold ${stateClass(transportAudit.state)}`}>{transportAudit.state}</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <label className="cursor-pointer border border-fuchsia-500 px-3 py-2 text-[11px] font-semibold text-fuchsia-800 dark:text-fuchsia-200 hover:bg-fuchsia-100 dark:hover:bg-fuchsia-950/40">
              正本Session Plan JSONを監査
              <input
                type="file"
                accept="application/json,.json"
                className="hidden"
                onChange={(event) => void inspectTransportedSessionPlan(event.target.files?.[0])}
              />
            </label>
            <code className="min-w-[260px] flex-1 overflow-x-auto text-[9px] leading-4 text-navy-500 dark:text-navy-300">{transportAudit.strictCommand}</code>
          </div>
          <p className="mt-2 text-[10px] leading-4 text-amber-700 dark:text-amber-300">{transportAudit.note}</p>
          {transportAudit.mismatches.length > 0 && (
            <ul className="mt-2 space-y-1 text-[10px] leading-4 text-rose-700 dark:text-rose-300">
              {transportAudit.mismatches.map((reason) => <li key={reason}>• {reason}</li>)}
            </ul>
          )}
          <div className="mt-3 border-t border-fuchsia-200 dark:border-fuchsia-900/50 pt-3">
            <p className="text-[10px] font-semibold text-navy-700 dark:text-sand-200">正本Session Planの生成</p>
            <code className="mt-1 block overflow-x-auto text-[9px] leading-4 text-navy-500 dark:text-navy-300">cd motion-studio && node --no-warnings scripts/wedding-davinci-actual-session-plan.mts --write</code>
            <p className="mt-1 text-[9px] leading-4 text-navy-400">Dashboard参照JSONはUI表示用であり、transported strictの入力正本には使用しません。</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
          {sessionProjects.map(([label, project]) => (
            <article key={label} className="border border-fuchsia-200 dark:border-fuchsia-900/50 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-sm font-bold text-navy-900 dark:text-sand-100">{label} Actual Session</h4>
                <span className={`text-[10px] font-semibold ${stateClass(project.sessionState)}`}>{project.sessionState}</span>
              </div>
              <p className="mt-2 text-[10px] text-navy-500 dark:text-navy-300">current next gate: {project.currentNextGate}</p>
              <ol className="mt-3 space-y-2">
                {project.orderedActions.map((action) => (
                  <li key={action.order} className="border-l-2 border-fuchsia-300 dark:border-fuchsia-800 pl-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[9px] font-mono text-fuchsia-700 dark:text-fuchsia-300">{action.order}</span>
                      <span className="text-[10px] font-semibold text-navy-800 dark:text-sand-100">{action.label}</span>
                      {action.humanOnly && <span className="text-[8px] font-semibold text-amber-700 dark:text-amber-300">HUMAN / MAC GUI</span>}
                    </div>
                    {action.command && <code className="mt-1 block overflow-x-auto text-[9px] leading-4 text-navy-500 dark:text-navy-300">{action.command}</code>}
                    {"note" in action && action.note && <p className="mt-1 text-[9px] leading-4 text-amber-700 dark:text-amber-300">{action.note}</p>}
                    {"checklist" in action && action.checklist && (
                      <ul className="mt-2 space-y-1 text-[9px] leading-4 text-navy-500 dark:text-navy-300">
                        {action.checklist.map((item) => <li key={item}>• {item}</li>)}
                      </ul>
                    )}
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-5 border-t border-sand-200 dark:border-navy-600 pt-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[10px] tracking-[0.2em] font-semibold text-violet-700 dark:text-violet-300">FINAL DELIVERY PREFLIGHT / COMMAND SURFACE</p>
            <h3 className="mt-1 text-base font-bold text-navy-900 dark:text-sand-100">Manifest → Snapshot再検証 → strict final の順で実行</h3>
            <p className="mt-2 text-[11px] leading-5 text-navy-500 dark:text-navy-300">
              SnapshotがCURRENTでもOpening/ProfileがREADYでなければFinal Deliveryは通りません。GUI ActualやHuman approvalをCLI/CIから自動昇格させる処理はありません。
            </p>
          </div>
          <div className="text-right">
            <p className={`text-sm font-bold ${stateClass(preflight.state)}`}>{preflight.state}</p>
            <p className="mt-1 text-[10px] text-navy-400">snapshot: {preflight.snapshot.state} / final: {preflight.eligible ? "ELIGIBLE" : "BLOCKED"}</p>
          </div>
        </div>

        {preflight.blockerCodes.length > 0 && (
          <div className="mt-4 border border-amber-200 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/10 p-3">
            <p className="text-[10px] font-semibold text-amber-800 dark:text-amber-300">CURRENT BLOCKERS</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {preflight.blockerCodes.map((code) => (
                <code key={code} className="border border-amber-300 dark:border-amber-800 px-2 py-1 text-[10px] text-amber-800 dark:text-amber-300">{code}</code>
              ))}
            </div>
            <p className="mt-2 text-[10px] leading-4 text-amber-800 dark:text-amber-300">
              Opening next: {nextGateLabel(preflight.opening.nextGate)} / Profile next: {nextGateLabel(preflight.profile.nextGate)}
            </p>
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-3 border border-violet-200 dark:border-violet-900/60 bg-violet-50/40 dark:bg-violet-950/10 p-3">
          <button
            type="button"
            onClick={downloadOperatorPacket}
            className="border border-violet-500 px-3 py-2 text-[11px] font-semibold text-violet-800 dark:text-violet-200 hover:bg-violet-100 dark:hover:bg-violet-950/40"
          >
            DaVinci Operator Packet JSONを保存
          </button>
          <p className="min-w-[220px] flex-1 text-[10px] leading-4 text-violet-800 dark:text-violet-300">
            Opening/Profileのnext gate・SHA binding・blocker・実行順を1ファイルで持ち出します。これは作業指示/indexであり、保存してもMac/Studio/DaVinci ActualやHuman approvalはPASSになりません。
          </p>
        </div>

        <ol className="mt-4 space-y-3">
          {preflight.commands.map((item) => (
            <li key={item.id} className="border border-sand-200 dark:border-navy-600 p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-semibold text-navy-800 dark:text-sand-100">{item.label}</p>
                <span className={`text-[9px] font-semibold ${item.required ? "text-amber-700 dark:text-amber-300" : "text-emerald-700 dark:text-emerald-300"}`}>
                  {item.required ? "REQUIRED / SAFE TO RUN" : "CURRENT / OPTIONAL REFRESH"}
                </span>
              </div>
              <p className="mt-1 text-[10px] leading-4 text-navy-500 dark:text-navy-300">{item.purpose}</p>
              <code className="mt-2 block overflow-x-auto bg-navy-950 px-3 py-2 text-[10px] leading-5 text-sand-100">{item.command}</code>
            </li>
          ))}
        </ol>
      </section>

      <p className="mt-4 text-[10px] leading-4 text-navy-400">
        GUI Actualをこの画面やCIから昇格させることはありません。Mac/Remotion Studio/DaVinciの実操作をしていない証拠は引き続きNOT_RUNとして扱います。
      </p>
    </section>
  );
}
