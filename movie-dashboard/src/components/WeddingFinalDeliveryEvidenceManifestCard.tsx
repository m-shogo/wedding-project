import {weddingFinalDeliveryEvidenceManifestReadiness as readiness} from "../data/weddingFinalDeliveryEvidenceManifestReadiness.generated";

const shortSha = (value: string | null) => value ? `${value.slice(0, 12)}…` : "—";
const stateClass = (state: string) => state === "CURRENT"
  ? "text-emerald-700 dark:text-emerald-300"
  : state === "STALE" || state === "INVALID"
    ? "text-rose-700 dark:text-rose-300"
    : "text-amber-700 dark:text-amber-300";

export function WeddingFinalDeliveryEvidenceManifestCard() {
  return (
    <section className="mb-10 border border-violet-300 dark:border-violet-800 bg-white dark:bg-navy-800 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[10px] tracking-[0.2em] font-semibold text-violet-700 dark:text-violet-300">FINAL DELIVERY EVIDENCE MANIFEST / TRANSPORT GATE</p>
          <h2 className="mt-1 text-lg font-bold text-navy-900 dark:text-sand-100">Opening / Profile の最終証拠鎖を1つのSHA-bound manifestで持ち出す</h2>
          <p className="mt-2 max-w-4xl text-xs leading-5 text-navy-500 dark:text-navy-300">
            Recovery、source render、DaVinci finishing Actual、transition Actual / proof、Actual completion receipt、Human final approval、final approval completion bindingを両Movieで固定します。Dashboard snapshotだけではCURRENT扱いせず、持ち出し直前にcanonical CLI strict-currentを通してください。
          </p>
        </div>
        <div className="text-right">
          <p className={`text-sm font-bold ${stateClass(readiness.state)}`}>{readiness.state}</p>
          <p className="mt-1 text-[10px] text-navy-400">canonical current: {readiness.current ? "YES" : "NO"}</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        <div className="border border-sand-200 dark:border-navy-600 p-3">
          <p className="text-[9px] font-semibold text-navy-400">MANIFEST SHA</p>
          <p className="mt-1 font-mono text-[11px] text-navy-700 dark:text-sand-200">{shortSha(readiness.manifestSha256)}</p>
        </div>
        <div className="border border-sand-200 dark:border-navy-600 p-3">
          <p className="text-[9px] font-semibold text-navy-400">READINESS SHA</p>
          <p className="mt-1 font-mono text-[11px] text-navy-700 dark:text-sand-200">{shortSha(readiness.readinessSha256)}</p>
        </div>
        <div className="border border-sand-200 dark:border-navy-600 p-3">
          <p className="text-[9px] font-semibold text-navy-400">OPENING EVIDENCE CHAIN</p>
          <p className="mt-1 font-mono text-[11px] text-navy-700 dark:text-sand-200">{shortSha(readiness.openingEvidenceChainSha256)}</p>
        </div>
        <div className="border border-sand-200 dark:border-navy-600 p-3">
          <p className="text-[9px] font-semibold text-navy-400">PROFILE EVIDENCE CHAIN</p>
          <p className="mt-1 font-mono text-[11px] text-navy-700 dark:text-sand-200">{shortSha(readiness.profileEvidenceChainSha256)}</p>
        </div>
      </div>

      {readiness.mismatches.length > 0 && (
        <div className="mt-4 border border-amber-200 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/10 p-3">
          <p className="text-[10px] font-semibold text-amber-800 dark:text-amber-300">CURRENTNESS BLOCKERS</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {readiness.mismatches.map((code) => <code key={code} className="border border-amber-300 dark:border-amber-800 px-2 py-1 text-[10px] text-amber-800 dark:text-amber-300">{code}</code>)}
          </div>
        </div>
      )}

      <div className="mt-4 grid gap-3 xl:grid-cols-2">
        <div className="border border-violet-200 dark:border-violet-900/50 p-3">
          <p className="text-[10px] font-semibold text-violet-800 dark:text-violet-300">1. READY後にmanifest生成</p>
          <code className="mt-2 block overflow-x-auto text-[9px] leading-4 text-navy-500 dark:text-navy-300">{readiness.writeCommand}</code>
        </div>
        <div className="border border-violet-200 dark:border-violet-900/50 p-3">
          <p className="text-[10px] font-semibold text-violet-800 dark:text-violet-300">2. 持ち出し直前にstrict-current</p>
          <code className="mt-2 block overflow-x-auto text-[9px] leading-4 text-navy-500 dark:text-navy-300">{readiness.strictCommand}</code>
        </div>
      </div>

      <p className="mt-3 text-[10px] leading-4 text-amber-700 dark:text-amber-300">
        GENERATED DASHBOARD SNAPSHOT ≠ LIVE MAC DAVINCI GUI ACTUAL。Manifest生成・CURRENT表示・SHA一致のどれもHuman Actual PASSやHuman final approvalを新しく作りません。
      </p>
    </section>
  );
}
