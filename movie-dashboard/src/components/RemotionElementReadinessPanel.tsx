import type { RemotionElementCandidateRecord } from "../data/remotionElementCandidates";

const readinessLabel: Record<RemotionElementCandidateRecord["readiness"], string> = {
  PREVIEW_ONLY: "Previewのみ",
  ELEMENT_CANDIDATE: "Element候補 / CI検証済み",
  STUDIO_ACTUAL_VERIFIED: "Studio Actual検証済み",
};

const actualLabel = (state: RemotionElementCandidateRecord["studioInstallActual"]) => {
  switch (state) {
    case "PASS":
      return "PASS";
    case "FAIL":
      return "FAIL";
    case "BLOCKED":
      return "BLOCKED";
    default:
      return "NOT RUN";
  }
};

export function RemotionElementReadinessPanel({
  candidate,
}: {
  candidate: RemotionElementCandidateRecord;
}) {
  const verified = candidate.readiness === "STUDIO_ACTUAL_VERIFIED";

  return (
    <section className="mt-6 border border-violet-200 dark:border-violet-900 bg-violet-50/50 dark:bg-violet-950/20 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[10px] tracking-[0.2em] font-semibold text-violet-700 dark:text-violet-300">
            REMOTION ELEMENT
          </p>
          <h3 className="mt-1 text-sm font-bold text-navy-900 dark:text-sand-100">
            {readinessLabel[candidate.readiness]}
          </h3>
        </div>
        <span
          className={`px-2 py-1 text-[9px] font-mono border ${
            verified
              ? "border-emerald-400 text-emerald-700 dark:text-emerald-300"
              : "border-amber-400 text-amber-700 dark:text-amber-300"
          }`}
        >
          {candidate.readiness}
        </span>
      </div>

      <p className="mt-3 text-[11px] leading-5 text-navy-600 dark:text-navy-300">
        canonical: {candidate.canonicalEngine} / {candidate.canonicalMode} · payload: {candidate.payloadSlug}
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {candidate.editableFields.map((field) => (
          <span
            key={field}
            className="px-2 py-1 text-[9px] border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300"
          >
            {field}
          </span>
        ))}
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-[10px] text-navy-600 dark:text-navy-300">
        <div>
          <dt className="font-semibold">Standalone Render CI</dt>
          <dd>{candidate.standaloneRenderCi ? "PASS" : "NO"}</dd>
        </div>
        <div>
          <dt className="font-semibold">Production dependency</dt>
          <dd>{candidate.productionDependencyPromoted ? "PROMOTED" : "NOT PROMOTED"}</dd>
        </div>
        <div>
          <dt className="font-semibold">Studio Install Actual</dt>
          <dd>{actualLabel(candidate.studioInstallActual)}</dd>
        </div>
        <div>
          <dt className="font-semibold">Control Readback Actual</dt>
          <dd>{actualLabel(candidate.studioControlReadbackActual)}</dd>
        </div>
      </dl>

      {!verified && (
        <p className="mt-4 border-l-2 border-amber-400 pl-3 text-[10px] leading-5 text-amber-800 dark:text-amber-200">
          CIでpayload生成・compile・renderまでは検証済み。Mac Studioの確認ダイアログ、Inspector編集、source readback、undo/redo、reload/restartは未検証なので「使える」とはまだ断定しない。
        </p>
      )}
    </section>
  );
}
