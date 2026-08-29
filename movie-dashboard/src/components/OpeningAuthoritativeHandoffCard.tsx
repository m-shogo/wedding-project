import {buildOpeningAuthoritativeHandoffOverlay} from "../data/openingAuthoritativeHandoffOverlay";

const STATE_LABEL = {
  true: "CURRENT",
  false: "BLOCKED",
} as const;

function StatePill({current}: {current: boolean}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide ${
        current
          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200"
          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
      }`}
    >
      {STATE_LABEL[String(current) as "true" | "false"]}
    </span>
  );
}

export function OpeningAuthoritativeHandoffCard() {
  const status = buildOpeningAuthoritativeHandoffOverlay();
  const rows = [
    ["Human Audio Listening", status.effective.humanAudioListeningCurrent],
    ["Production Bundle", status.effective.productionBundleCurrent],
    ["Palmier Handoff", status.effective.palmierHandoffCurrent],
    ["DaVinci Handoff", status.effective.davinciHandoffCurrent],
  ] as const;

  return (
    <section className="mb-8 rounded-xl border border-sand-200 bg-white p-5 shadow-sm dark:border-navy-600 dark:bg-navy-800/60">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.16em] text-navy-400 dark:text-navy-300">
            OPENING PRODUCTION STATUS
          </p>
          <h2 className="mt-1 text-base font-semibold text-navy-900 dark:text-sand-100">
            Authoritative Handoff
          </h2>
          <p className="mt-1 max-w-3xl text-xs leading-5 text-navy-500 dark:text-navy-300">
            reported CURRENTではなく、Human Audio QAを含む実効currentnessを表示します。音源・preview・evidenceが古い場合はPalmier / DaVinciもfail-closeします。
          </p>
        </div>
        <StatePill current={status.current} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {rows.map(([label, current]) => (
          <div key={label} className="rounded-lg border border-sand-200 p-3 dark:border-navy-600">
            <div className="flex items-start justify-between gap-2">
              <span className="text-xs font-medium text-navy-700 dark:text-sand-100">{label}</span>
              <StatePill current={current} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        <div className="rounded-lg bg-sand-50 p-3 dark:bg-navy-700">
          <p className="text-[11px] font-semibold tracking-wider text-navy-400">REPORTED → EFFECTIVE</p>
          <div className="mt-2 space-y-1 text-xs text-navy-600 dark:text-navy-200">
            <p>Bundle: {String(status.reported.productionBundleCurrent)} → {String(status.effective.productionBundleCurrent)}</p>
            <p>Palmier: {String(status.reported.palmierHandoffCurrent)} → {String(status.effective.palmierHandoffCurrent)}</p>
            <p>DaVinci: {String(status.reported.davinciHandoffCurrent)} → {String(status.effective.davinciHandoffCurrent)}</p>
          </div>
        </div>
        <div className="rounded-lg bg-sand-50 p-3 dark:bg-navy-700">
          <p className="text-[11px] font-semibold tracking-wider text-navy-400">ACTUAL EVIDENCE</p>
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            <span className="rounded border border-sand-200 px-2 py-1 text-navy-600 dark:border-navy-600 dark:text-navy-200">
              Mac DaVinci Actual: {status.effective.macDaVinciActualVerified ? "VERIFIED" : "NOT_RUN"}
            </span>
            <span className="rounded border border-sand-200 px-2 py-1 text-navy-600 dark:border-navy-600 dark:text-navy-200">
              productionReady: {String(status.effective.productionReady)}
            </span>
          </div>
        </div>
      </div>

      {status.blockerCodes.length > 0 && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-900/20">
          <p className="text-[11px] font-semibold tracking-wider text-red-600 dark:text-red-300">BLOCKERS</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {status.blockerCodes.map((code) => (
              <code key={code} className="rounded bg-white/80 px-2 py-1 text-[11px] text-red-700 dark:bg-navy-900/60 dark:text-red-200">
                {code}
              </code>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
