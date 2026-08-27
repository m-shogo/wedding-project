import {useMemo, useState} from "react";
import {
  buildProfileProductionStatusHandoff,
  buildProfileProductionStatusHandoffJson,
} from "../data/profileProductionStatusHandoff";
import {downloadText} from "../lib/exporters";

const stateClass = (state: string) =>
  state === "PASS" || state === "PRODUCTION_READY"
    ? "text-emerald-700 dark:text-emerald-300"
    : state === "NOT_RUN" || state === "MISSING"
      ? "text-amber-700 dark:text-amber-300"
      : "text-rose-700 dark:text-rose-300";

export function ProfileProductionStatusHandoffCard() {
  const [copied, setCopied] = useState(false);
  const handoff = useMemo(() => buildProfileProductionStatusHandoff(), []);
  const json = useMemo(() => buildProfileProductionStatusHandoffJson(), []);
  const production = handoff.profile.production;

  async function copyJson() {
    await navigator.clipboard.writeText(json);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <section className="mt-3 border border-fuchsia-200 dark:border-fuchsia-800 p-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-[9px] tracking-[0.16em] font-semibold text-fuchsia-700 dark:text-fuchsia-300">
            PROFILE V1 / PRODUCTION STATUS HANDOFF
          </p>
          <p className={`mt-1 text-[10px] font-semibold ${stateClass(production.overallState)}`}>
            {production.overallState}
          </p>
          <p className="mt-1 text-[8px] text-navy-400">
            17素材 {handoff.profile.media.resolved}/{handoff.profile.media.expected} / Human media QA {handoff.profile.realMediaHumanQa.state} / productionReady={production.readiness.productionReady ? "YES" : "NO"}
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button type="button" onClick={() => void copyJson()} className="border border-fuchsia-300 dark:border-fuchsia-700 px-2.5 py-1.5 text-[8px] font-semibold text-fuchsia-700 dark:text-fuchsia-300">
            {copied ? "COPIED ✓" : "Status JSONコピー"}
          </button>
          <button type="button" onClick={() => downloadText(json, "profile-v1-production-status-handoff.json")} className="border border-sand-300 dark:border-navy-600 px-2.5 py-1.5 text-[8px] font-semibold text-navy-600 dark:text-navy-300">
            Status JSON書き出し
          </button>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-1 sm:grid-cols-3">
        {Object.entries(production.stages).map(([name, stage]) => (
          <div key={name} className="border border-sand-200 dark:border-navy-700 px-2 py-1.5 text-[7px]">
            <div className="text-navy-400">{name}</div>
            <div className={`mt-0.5 font-semibold ${stateClass(stage.state)}`}>{stage.state}</div>
          </div>
        ))}
      </div>

      <p className="mt-2 text-[8px] leading-4 text-navy-400">
        Assembly / final render / Human final review / production bundle / Mac DaVinci Actual / final delivery approvalを別状態で保持します。Mac Actualや最終承認をCIから自動昇格しません。
      </p>

      <details className="mt-2">
        <summary className="cursor-pointer text-[8px] text-fuchsia-700 dark:text-fuchsia-300">Profile production status JSON</summary>
        <pre className="mt-2 max-h-72 overflow-auto whitespace-pre-wrap border border-sand-200 dark:border-navy-600 p-2 text-[8px] leading-4 text-navy-500 dark:text-navy-300">{json}</pre>
      </details>
    </section>
  );
}
