import {
  remotionElementStudioActualBatch,
  type RemotionElementCandidateRecord,
} from "../data/remotionElementCandidates";

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
  const batch = remotionElementStudioActualBatch;
  const evidence = batch.evidence;
  const inActualBatch = batch.candidateIds.includes(candidate.patternId);

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
        <span className={`px-2 py-1 text-[9px] font-mono border ${verified ? "border-emerald-400 text-emerald-700 dark:text-emerald-300" : "border-amber-400 text-amber-700 dark:text-amber-300"}`}>
          {candidate.readiness}
        </span>
      </div>

      <p className="mt-3 text-[11px] leading-5 text-navy-600 dark:text-navy-300">
        canonical: {candidate.canonicalEngine} / {candidate.canonicalMode} · payload: {candidate.payloadSlug}
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {candidate.editableFields.map((field) => (
          <span key={field} className="px-2 py-1 text-[9px] border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300">{field}</span>
        ))}
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-[10px] text-navy-600 dark:text-navy-300">
        <div><dt className="font-semibold">Standalone Render CI</dt><dd>{candidate.standaloneRenderCi ? "PASS" : "NO"}</dd></div>
        <div><dt className="font-semibold">Production dependency</dt><dd>{candidate.productionDependencyPromoted ? "PROMOTED" : "NOT PROMOTED"}</dd></div>
        <div><dt className="font-semibold">Studio Install Actual</dt><dd>{actualLabel(candidate.studioInstallActual)}</dd></div>
        <div><dt className="font-semibold">Control Readback Actual</dt><dd>{actualLabel(candidate.studioControlReadbackActual)}</dd></div>
      </dl>

      {inActualBatch && !verified && (
        <div className="mt-4 border border-violet-200 bg-white/70 p-3 dark:border-violet-800 dark:bg-navy-900/20">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[10px] tracking-[0.15em] font-semibold text-violet-700 dark:text-violet-300">STUDIO ACTUAL BATCH HANDOFF</p>
            <code className="text-[9px] text-violet-600 dark:text-violet-300">Studio {batch.studioVersionTarget}</code>
          </div>
          <p className="mt-2 text-[10px] leading-5 text-navy-600 dark:text-navy-300">
            このElementは9候補のbounded Mac Studio Actual batch対象。CIはbatch artifactの準備と検査までで、confirmation / install / control readback / timeline insertion / post-install renderはすべてNOT_RUNです。
          </p>
          <p className="mt-2 break-all text-[9px] text-navy-400">artifact: {batch.artifactRoot}</p>
          <div className="mt-3 grid grid-cols-2 gap-2 text-[9px]">
            <div className="border border-amber-200 p-2 dark:border-amber-800">
              <p className="font-semibold text-amber-800 dark:text-amber-200">CURRENT REPO ACTUAL</p>
              <p className="mt-1 font-mono text-amber-700 dark:text-amber-300">{evidence.currentRepoState}</p>
            </div>
            <div className="border border-violet-200 p-2 dark:border-violet-800">
              <p className="font-semibold text-violet-800 dark:text-violet-200">MACHINE SUMMARY CONTRACT</p>
              <p className="mt-1 font-mono text-violet-700 dark:text-violet-300">{evidence.candidateCount} candidates × {evidence.checkAxesPerCandidate} checks</p>
            </div>
          </div>
          <div className="mt-3 border border-sky-200 bg-sky-50/70 p-2.5 dark:border-sky-900 dark:bg-sky-950/20">
            <p className="text-[9px] font-semibold tracking-[0.12em] text-sky-800 dark:text-sky-200">BATCH SOURCE CURRENTNESS · SHA-BOUND</p>
            <p className="mt-1 text-[9px] leading-4 text-sky-800 dark:text-sky-200">
              prepared payload / builder / checker / shared typography kit はSHA-256でbatch manifestに束縛。どれかが変わるとbatch checkと既存Studio Actual evidenceはSTALEになり、再prepare・再Actualが必要です。
            </p>
            <p className="mt-1 text-[9px] leading-4 text-sky-700 dark:text-sky-300">
              SOURCE_CHANGED ⇒ BATCH_STALE ⇒ OLD_STUDIO_ACTUAL_EVIDENCE_NOT_CURRENT
            </p>
          </div>
          <div className="mt-2 grid gap-1.5">
            <div><p className="text-[9px] font-semibold text-violet-700 dark:text-violet-300">01 PREPARE BOUNDED BATCH</p><code className="mt-0.5 block break-all bg-violet-950/5 px-2 py-1 text-[9px] text-navy-600 dark:bg-white/5 dark:text-navy-200">{batch.prepareCommand}</code></div>
            <div><p className="text-[9px] font-semibold text-violet-700 dark:text-violet-300">02 CHECK PREP ARTIFACT + SOURCE SHAs</p><code className="mt-0.5 block break-all bg-violet-950/5 px-2 py-1 text-[9px] text-navy-600 dark:bg-white/5 dark:text-navy-200">{batch.checkCommand}</code></div>
            <div><p className="text-[9px] font-semibold text-violet-700 dark:text-violet-300">03 INIT ACTUAL EVIDENCE</p><code className="mt-0.5 block break-all bg-violet-950/5 px-2 py-1 text-[9px] text-navy-600 dark:bg-white/5 dark:text-navy-200">{evidence.initCommand}</code></div>
            <div><p className="text-[9px] font-semibold text-violet-700 dark:text-violet-300">04 STATUS / SUMMARY</p><code className="mt-0.5 block break-all bg-violet-950/5 px-2 py-1 text-[9px] text-navy-600 dark:bg-white/5 dark:text-navy-200">{evidence.statusCommand}</code></div>
            <div><p className="text-[9px] font-semibold text-violet-700 dark:text-violet-300">05 STRICT VERIFY</p><code className="mt-0.5 block break-all bg-violet-950/5 px-2 py-1 text-[9px] text-navy-600 dark:bg-white/5 dark:text-navy-200">{evidence.strictCommand}</code></div>
          </div>
          <p className="mt-2 break-all text-[9px] text-navy-400">Actual evidence: {evidence.path}</p>
          <p className="mt-1 break-all text-[9px] text-navy-400">Machine summary: {evidence.summaryPath}</p>
          <p className="mt-1 text-[9px] text-navy-400">summary authority: {evidence.summaryAuthority}</p>
          <div className="mt-2 flex flex-wrap gap-1">
            {Object.entries(batch.actual).map(([key, state]) => <code key={key} className="border border-amber-300 px-1.5 py-0.5 text-[8px] text-amber-700 dark:border-amber-700 dark:text-amber-300">{key}={state}</code>)}
          </div>
          <p className="mt-2 border-l-2 border-amber-400 pl-2 text-[9px] leading-4 text-amber-800 dark:text-amber-200">
            statusはevidence有無に関係なくmachine summaryを更新し、候補別PASS/FAIL/BLOCKED/NOT_RUN数・manifest currentness・Human review有無・stable blockerCodesを出します。initは9候補×11項目をNOT_RUNで作るだけです。strictは全項目PASS・reviewer・reviewedAt・current SHA-bound batch manifestが揃うまで失敗します。SUMMARY_EXPORTED != STUDIO_ACTUAL_VERIFIED。
          </p>
        </div>
      )}

      {!verified && (
        <p className="mt-4 border-l-2 border-amber-400 pl-3 text-[10px] leading-5 text-amber-800 dark:text-amber-200">
          CIでpayload生成・compile・renderまでは検証済み。Mac Studioの確認ダイアログ、Inspector編集、source readback、undo/redo、reload/restartは未検証なので「使える」とはまだ断定しない。
        </p>
      )}
    </section>
  );
}
