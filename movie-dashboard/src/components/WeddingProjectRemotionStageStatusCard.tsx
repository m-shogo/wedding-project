import {weddingProjectRemotionStageStatus} from "../generated/weddingProjectRemotionStageStatus";
import type {SceneProjectId} from "../data/visualSceneComposer";

const stateClass = {
  NOT_STAGED: "border-amber-300 text-amber-800 dark:border-amber-800 dark:text-amber-200",
  STAGED_CURRENT: "border-sky-300 text-sky-800 dark:border-sky-800 dark:text-sky-200",
  HANDOFF_CURRENT: "border-emerald-300 text-emerald-800 dark:border-emerald-800 dark:text-emerald-200",
  INVALID: "border-rose-300 text-rose-800 dark:border-rose-800 dark:text-rose-200",
} as const;

export function WeddingProjectRemotionStageStatusCard({projectId}: {projectId: SceneProjectId}) {
  const status = weddingProjectRemotionStageStatus[projectId];
  const isInvalid = status.state === "INVALID";
  const isHandoffCurrent = status.state === "HANDOFF_CURRENT";

  return (
    <section className={`mt-3 border-2 p-3 ${stateClass[status.state]}`} data-project-remotion-stage-status={status.state}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-[8px] tracking-[0.14em] font-semibold">PROJECT REMOTION / CANONICAL STAGE</p>
          <p className="mt-1 text-[11px] font-semibold">{projectId.toUpperCase()} — {status.state}</p>
          <p className="mt-1 text-[8px] leading-4 opacity-80">
            stage={status.checks.stageVerification} / handoff={status.checks.handoffVerification} / productionReady=NO
          </p>
        </div>
        <span className="border px-2 py-1 font-mono text-[8px]">{status.state}</span>
      </div>

      {status.blocker ? <p className="mt-2 text-[8px] font-semibold">blocker: {status.blocker}</p> : null}
      {status.detail ? <p className="mt-1 text-[8px] leading-4 opacity-80">{status.detail}</p> : null}

      <div className="mt-2 grid gap-1 text-[7px] sm:grid-cols-2">
        <code className="overflow-x-auto whitespace-nowrap border px-2 py-1">batch: {status.canonicalArtifacts.batch}</code>
        <code className="overflow-x-auto whitespace-nowrap border px-2 py-1">role: {status.canonicalArtifacts.roleManifest}</code>
        <code className="overflow-x-auto whitespace-nowrap border px-2 py-1">receipt: {status.canonicalArtifacts.identityReceipt}</code>
        <code className="overflow-x-auto whitespace-nowrap border px-2 py-1">recovery: {status.canonicalArtifacts.recovery}</code>
      </div>

      <div className="mt-2 border-l-2 pl-2">
        <p className="text-[7px] font-semibold uppercase tracking-wide">
          {isInvalid ? "最優先: revalidate / restage" : isHandoffCurrent ? "次: DaVinci Session Plan / Start Gate" : "次の正本操作"}
        </p>
        <p className="mt-1 text-[8px] font-semibold">{status.next.kind}</p>
        <code className="mt-1 block max-w-full overflow-x-auto whitespace-nowrap text-[8px] leading-4">cd motion-studio && {status.next.command}</code>
      </div>

      <p className="mt-2 border-t pt-2 text-[8px] leading-4 opacity-80">
        この表示はread-only checkerから生成したsnapshotです。STAGED_CURRENT / HANDOFF_CURRENT / CI GREENは、Remotion Studio GUI ActualやMac DaVinci GUI ActualのPASSを意味しません。GUI Actualは人間が実行した場合だけ記録します。
      </p>
    </section>
  );
}
