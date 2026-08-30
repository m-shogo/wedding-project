import { openingProductionStatus as status } from "../data/openingProductionStatus.generated";

function badgeClass(state: string) {
  if (state === "PASS") return "border-emerald-300 text-emerald-700 dark:border-emerald-800 dark:text-emerald-300";
  if (state === "BLOCKED" || state === "STALE" || state === "MISSING") return "border-amber-300 text-amber-700 dark:border-amber-800 dark:text-amber-300";
  return "border-sand-300 text-navy-500 dark:border-navy-600 dark:text-navy-300";
}

const phases = [
  {
    key: "crop",
    label: "CROP / FOCUS REVIEW",
    detail: "11枚の実写真についてcrop / focus / color / motion intentをHuman確認。素材が揃っただけではPASSにしない。",
    state: String(status.stages.cropReview.state),
    blocker: status.stages.cropReview.detail,
  },
  {
    key: "preview",
    label: "SOURCE-BOUND PREVIEW REVIEW",
    detail: "current render sourceへSHA-boundされた60秒previewをHuman確認。古いpreview reviewはsource変更後に再利用しない。",
    state: String(status.stages.previewReview.state),
    blocker: status.stages.previewReview.detail,
  },
  {
    key: "audio",
    label: "AUDIO LISTENING REVIEW",
    detail: "rights-cleared BGM入りpreviewを最後まで実耳で再生し、balance / integrity / picture syncをHuman確認。",
    state: String(status.stages.audioListeningReview.state),
    blocker: status.stages.audioListeningReview.detail,
  },
] as const;

export function OpeningProductionReviewReadinessPanel() {
  return (
    <section className="mb-10 border-2 border-sky-200 bg-sky-50/20 dark:border-sky-900 dark:bg-sky-950/10">
      <div className="border-b border-sky-100 p-4 md:p-5 dark:border-sky-900/60">
        <p className="text-[10px] font-semibold tracking-[0.2em] text-sky-700 dark:text-sky-300">OPENING PRODUCTION REVIEW READINESS / MOTION STUDIO AUTHORITY</p>
        <h2 className="mt-1 text-lg font-bold text-navy-900 dark:text-sand-100">Openingも素材準備とHuman QAを段階別に確認</h2>
        <p className="mt-2 max-w-3xl text-xs leading-5 text-navy-500 dark:text-navy-300">
          opening-v1-production-statusの正本から、media/BGM readiness → crop → source-bound preview → audio listening → final renderの順序を同期します。
        </p>
      </div>

      <div className="space-y-4 p-4 md:p-5">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="border border-sand-200 p-3 dark:border-navy-700">
            <p className="text-[10px] text-navy-400">FINAL RENDER INPUT ELIGIBLE</p>
            <p className="mt-1 text-sm font-bold text-navy-800 dark:text-sand-100">{Boolean(status.readiness.finalRenderEligible) ? "YES" : "NO"}</p>
          </div>
          <div className="border border-sand-200 p-3 dark:border-navy-700">
            <p className="text-[10px] text-navy-400">PREVIEW SOURCE CURRENT</p>
            <p className="mt-1 text-sm font-bold text-navy-800 dark:text-sand-100">{String(status.sourceRevalidation.realMediaPreview.state)}</p>
          </div>
          <div className="border border-sand-200 p-3 dark:border-navy-700">
            <p className="text-[10px] text-navy-400">FINAL RENDER REVIEW</p>
            <p className="mt-1 text-sm font-bold text-navy-800 dark:text-sand-100">{String(status.stages.finalRenderReview.state)}</p>
          </div>
        </div>

        <div className="grid gap-3 lg:grid-cols-3">
          {phases.map((phase) => (
            <div key={phase.key} className="border border-sand-200 p-4 dark:border-navy-700">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.14em] text-navy-500 dark:text-navy-300">{phase.label}</p>
                  <p className="mt-2 text-xs leading-5 text-navy-500 dark:text-navy-300">{phase.detail}</p>
                </div>
                <span className={`shrink-0 border px-2 py-1 text-[10px] font-bold ${badgeClass(phase.state)}`}>{phase.state}</span>
              </div>
              {phase.state !== "PASS" && <p className="mt-3 text-[10px] leading-4 text-amber-700 dark:text-amber-300">{phase.blocker}</p>}
            </div>
          ))}
        </div>

        <div className="border border-sand-200 p-3 text-[10px] leading-5 text-navy-500 dark:border-navy-700 dark:text-navy-300">
          MEDIA_READY != HUMAN_CROP_REVIEW_PASS / CROP_PASS != SOURCE_BOUND_PREVIEW_REVIEW_PASS / PREVIEW_REVIEW_PASS != HUMAN_AUDIO_LISTENING_PASS / HUMAN_AUDIO_PASS != FINAL_RENDER_REVIEW_PASS / Remotion Studio GUI Actual = <strong>NOT_RUN</strong> / Mac DaVinci GUI Actual = <strong>NOT_RUN</strong>
        </div>
      </div>
    </section>
  );
}
