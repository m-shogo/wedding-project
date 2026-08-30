import {weddingProjectRemotionStageStatus} from "../generated/weddingProjectRemotionStageStatus";
import type {SceneProjectId} from "../data/visualSceneComposer";

type StageState = "NOT_STAGED" | "STAGED_CURRENT" | "HANDOFF_CURRENT" | "INVALID";
type PalmierTimelineState = "MISSING" | "CURRENT" | "STALE" | "INVALID";

const stateClass: Record<StageState, string> = {
  NOT_STAGED: "border-amber-300 text-amber-800 dark:border-amber-800 dark:text-amber-200",
  STAGED_CURRENT: "border-sky-300 text-sky-800 dark:border-sky-800 dark:text-sky-200",
  HANDOFF_CURRENT: "border-emerald-300 text-emerald-800 dark:border-emerald-800 dark:text-emerald-200",
  INVALID: "border-rose-300 text-rose-800 dark:border-rose-800 dark:text-rose-200",
};

const timelineStateClass: Record<PalmierTimelineState, string> = {
  MISSING: "border-amber-300 text-amber-800 dark:border-amber-800 dark:text-amber-200",
  CURRENT: "border-emerald-300 text-emerald-800 dark:border-emerald-800 dark:text-emerald-200",
  STALE: "border-orange-300 text-orange-800 dark:border-orange-800 dark:text-orange-200",
  INVALID: "border-rose-300 text-rose-800 dark:border-rose-800 dark:text-rose-200",
};

const palmierAssemblyPlanCommand = (projectId: SceneProjectId) =>
  `cd motion-studio && node --no-warnings scripts/build-wedding-palmier-typography-assembly-plan.mts --movie=${projectId} --write`;

export function WeddingProjectRemotionStageStatusCard({projectId}: {projectId: SceneProjectId}) {
  const status = weddingProjectRemotionStageStatus[projectId];
  const state = status.state as StageState;
  const timeline = status.palmierTimelineExport;
  const timelineState = timeline.state as PalmierTimelineState;
  const isInvalid = state === "INVALID";
  const isStagedCurrent = state === "STAGED_CURRENT";
  const isHandoffCurrent = state === "HANDOFF_CURRENT";
  const timelineNeedsRecovery = timelineState === "STALE" || timelineState === "INVALID";

  return (
    <section className={`mt-3 border-2 p-3 ${stateClass[state]}`} data-project-remotion-stage-status={state} data-palmier-timeline-export-status={timelineState}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-[8px] tracking-[0.14em] font-semibold">PROJECT REMOTION / CANONICAL STAGE</p>
          <p className="mt-1 text-[11px] font-semibold">{projectId.toUpperCase()} — {state}</p>
          <p className="mt-1 text-[8px] leading-4 opacity-80">
            stage={status.checks.stageVerification} / handoff={status.checks.handoffVerification} / productionReady=NO
          </p>
        </div>
        <span className="border px-2 py-1 font-mono text-[8px]">{state}</span>
      </div>

      {status.blocker ? <p className="mt-2 text-[8px] font-semibold">blocker: {status.blocker}</p> : null}
      {status.detail ? <p className="mt-1 text-[8px] leading-4 opacity-80">{status.detail}</p> : null}

      <div className="mt-2 grid gap-1 text-[7px] sm:grid-cols-2">
        <code className="overflow-x-auto whitespace-nowrap border px-2 py-1">batch: {status.canonicalArtifacts.batch}</code>
        <code className="overflow-x-auto whitespace-nowrap border px-2 py-1">role: {status.canonicalArtifacts.roleManifest}</code>
        <code className="overflow-x-auto whitespace-nowrap border px-2 py-1">receipt: {status.canonicalArtifacts.identityReceipt}</code>
        <code className="overflow-x-auto whitespace-nowrap border px-2 py-1">recovery: {status.canonicalArtifacts.recovery}</code>
      </div>

      <div className={`mt-2 border-2 p-2.5 ${timelineStateClass[timelineState]}`}>
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <p className="text-[7px] font-semibold uppercase tracking-wide">Palmier real timeline / FCPXML receipt</p>
            <p className="mt-1 text-[9px] font-semibold">{timelineState}</p>
          </div>
          <span className="border px-2 py-1 font-mono text-[7px]">{timelineState}</span>
        </div>
        {timeline.detail ? <p className="mt-1 text-[7px] leading-3 opacity-80">{timeline.detail}</p> : null}
        <div className="mt-2 grid gap-1 text-[7px] sm:grid-cols-2">
          <code className="overflow-x-auto whitespace-nowrap border px-2 py-1">receipt: {timeline.receiptPath ?? "NOT_WRITTEN"}</code>
          <code className="overflow-x-auto whitespace-nowrap border px-2 py-1">assembly plan: {timeline.source.assemblyPlan ?? "NOT_BOUND"}</code>
          <code className="overflow-x-auto whitespace-nowrap border px-2 py-1 sm:col-span-2">FCPXML: {timeline.source.palmierFcpxml ?? "NOT_BOUND"}</code>
        </div>
        <p className="mt-2 text-[7px] font-semibold uppercase tracking-wide">
          {timelineNeedsRecovery ? "最優先: FCPXML receiptを再検証" : timelineState === "CURRENT" ? "CURRENT: canonical handoffへ進める" : "次: 実Palmier FCPXMLを検証"}
        </p>
        <p className="mt-1 text-[8px] font-semibold">{timeline.next.kind}</p>
        <code className="mt-1 block max-w-full overflow-x-auto whitespace-nowrap text-[8px] leading-4">cd motion-studio && {timeline.next.command}</code>
        <p className="mt-1 text-[7px] leading-3 opacity-80">CURRENTはAssembly Planと実FCPXMLのSHA/currentnessが一致する意味です。Palmier GUI Actualを実行・PASSした証拠ではありません。</p>
      </div>

      {isStagedCurrent ? (
        <div className="mt-2 border-2 border-cyan-300 dark:border-cyan-800 p-2.5">
          <p className="text-[7px] font-semibold uppercase tracking-wide text-cyan-700 dark:text-cyan-300">次: Palmier Assembly Plan</p>
          <p className="mt-1 text-[8px] leading-4">Scene順・Human-selected pattern/Role・Palmier marker/XML・DaVinci translator状態を1つのoperator planへまとめます。</p>
          <code className="mt-1 block max-w-full overflow-x-auto whitespace-nowrap text-[8px] leading-4">{palmierAssemblyPlanCommand(projectId)}</code>
          <p className="mt-1 text-[7px] leading-3 opacity-80">plan生成だけではPalmier timeline export済みになりません。実timeline/XMLはPalmier側で人間が作業・exportします。</p>
        </div>
      ) : null}

      <div className="mt-2 border-l-2 pl-2">
        <p className="text-[7px] font-semibold uppercase tracking-wide">
          {isInvalid ? "最優先: revalidate / restage" : isHandoffCurrent ? "次: DaVinci Session Plan / Start Gate" : isStagedCurrent ? "canonical stageの次工程" : "次の正本操作"}
        </p>
        <p className="mt-1 text-[8px] font-semibold">{status.next.kind}</p>
        <code className="mt-1 block max-w-full overflow-x-auto whitespace-nowrap text-[8px] leading-4">cd motion-studio && {status.next.command}</code>
      </div>

      <p className="mt-2 border-t pt-2 text-[8px] leading-4 opacity-80">
        この表示はread-only checkerから生成したsnapshotです。STAGED_CURRENT / HANDOFF_CURRENT / Palmier FCPXML CURRENT / Assembly Plan / CI GREENは、Remotion Studio GUI Actual、Palmier GUI Actual、Mac DaVinci GUI ActualのPASSを意味しません。GUI Actualは人間が実行した場合だけ記録します。
      </p>
    </section>
  );
}
