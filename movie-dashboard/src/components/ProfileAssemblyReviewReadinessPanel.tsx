import { profileAssemblyReviewReadiness } from "../data/profileAssemblyReviewReadiness.generated";

function badgeClass(state: string) {
  if (state === "PASS") return "border-emerald-300 text-emerald-700 dark:border-emerald-800 dark:text-emerald-300";
  if (state === "BLOCKED" || state === "STALE") return "border-amber-300 text-amber-700 dark:border-amber-800 dark:text-amber-300";
  return "border-sand-300 text-navy-500 dark:border-navy-600 dark:text-navy-300";
}

const rows = [
  {
    key: "structure",
    label: "STRUCTURE REVIEW",
    detail: "5章の順序・visual hierarchy・pacing・media roleをHuman確認",
    review: profileAssemblyReviewReadiness.structureReview,
  },
  {
    key: "real-media",
    label: "REAL-MEDIA REVIEW",
    detail: "17素材のcrop / focus / color / emotional fit / contentをHuman確認",
    review: profileAssemblyReviewReadiness.realMediaReview,
  },
  {
    key: "audio",
    label: "AUDIO REVIEW",
    detail: "rights-cleared BGM入りpreviewを最後まで聴き、balance / sync / integrityをHuman確認",
    review: profileAssemblyReviewReadiness.audioReview,
  },
] as const;

export function ProfileAssemblyReviewReadinessPanel() {
  return (
    <section className="mb-10 border-2 border-violet-200 bg-violet-50/20 dark:border-violet-900 dark:bg-violet-950/10">
      <div className="border-b border-violet-100 p-4 md:p-5 dark:border-violet-900/60">
        <p className="text-[10px] font-semibold tracking-[0.2em] text-violet-700 dark:text-violet-300">PROFILE PRODUCTION REVIEW READINESS / MOTION STUDIO AUTHORITY</p>
        <h2 className="mt-1 text-lg font-bold text-navy-900 dark:text-sand-100">素材準備とHuman QAを別々に確認</h2>
        <p className="mt-2 max-w-3xl text-xs leading-5 text-navy-500 dark:text-navy-300">
          Profile assembly preflightの正本から、final render入力条件と3段階のHuman reviewをそのまま同期します。素材が揃ったこととHuman QA完了を同じ意味にしません。
        </p>
      </div>

      <div className="space-y-4 p-4 md:p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="border border-sand-200 p-3 dark:border-navy-700">
            <p className="text-[10px] text-navy-400">FINAL RENDER INPUT ELIGIBLE</p>
            <p className="mt-1 text-sm font-bold text-navy-800 dark:text-sand-100">{profileAssemblyReviewReadiness.finalRenderEligible ? "YES" : "NO"}</p>
          </div>
          <div className="border border-sand-200 p-3 dark:border-navy-700">
            <p className="text-[10px] text-navy-400">ASSEMBLY READY</p>
            <p className="mt-1 text-sm font-bold text-navy-800 dark:text-sand-100">{profileAssemblyReviewReadiness.assemblyReady ? "YES" : "NO"}</p>
          </div>
        </div>

        <div className="grid gap-3 lg:grid-cols-3">
          {rows.map(({key, label, detail, review}) => (
            <div key={key} className="border border-sand-200 p-4 dark:border-navy-700">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.14em] text-navy-500 dark:text-navy-300">{label}</p>
                  <p className="mt-2 text-xs leading-5 text-navy-500 dark:text-navy-300">{detail}</p>
                </div>
                <span className={`shrink-0 border px-2 py-1 text-[10px] font-bold ${badgeClass(review.state)}`}>{review.state}</span>
              </div>
              <p className="mt-3 text-[10px] text-navy-400">Human complete: <strong>{review.humanReviewComplete ? "YES" : "NO"}</strong></p>
              {review.blockers.length > 0 && (
                <p className="mt-2 font-mono text-[10px] leading-4 text-amber-700 dark:text-amber-300">{review.blockers[0]}</p>
              )}
            </div>
          ))}
        </div>

        <div className="border border-sand-200 p-3 text-[10px] leading-5 text-navy-500 dark:border-navy-700 dark:text-navy-300">
          FINAL_RENDER_ELIGIBLE != HUMAN_QA_COMPLETE / STRUCTURE_PASS != REAL_MEDIA_PASS / REAL_MEDIA_PASS != AUDIO_PASS / Remotion Studio GUI Actual = <strong>NOT_RUN</strong> / Mac DaVinci GUI Actual = <strong>NOT_RUN</strong>
        </div>
      </div>
    </section>
  );
}
