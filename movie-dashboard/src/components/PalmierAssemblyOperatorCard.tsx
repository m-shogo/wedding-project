import {useEffect, useMemo, useState} from "react";
import {
  listTypographyProductionRoleContexts,
  TYPOGRAPHY_PRODUCTION_ROLE_CONTEXT_CHANGED_EVENT,
} from "../data/typographyProductionRoleContextStore";
import {
  listTypographyProductionSelections,
  TYPOGRAPHY_PRODUCTION_SELECTION_CHANGED_EVENT,
} from "../data/typographyProductionSelectionStore";
import {buildTypographyProjectDeliveryBatch} from "../data/typographyProjectDeliveryBatch";
import {
  loadMotionZukanComposerState,
  MOTION_ZUKAN_COMPOSER_CHANGED_EVENT,
  type SceneProjectId,
} from "../data/visualSceneComposer";

const canonicalPlanCommand = (projectId: SceneProjectId) =>
  `cd motion-studio && node --no-warnings scripts/build-wedding-palmier-typography-assembly-plan.mts --movie=${projectId} --write`;

const timelineVerifyCommand = (projectId: SceneProjectId) =>
  `cd motion-studio && node --no-warnings scripts/verify-wedding-palmier-typography-timeline-export.mts --movie=${projectId} --xml=\"$HOME/Downloads/${projectId}.fcpxml\" --write`;

type OperatorProgress = {placed: boolean; markerAdded: boolean; timingReviewed: boolean};
const emptyProgress = (): OperatorProgress => ({placed: false, markerAdded: false, timingReviewed: false});

export function PalmierAssemblyOperatorCard({projectId}: {projectId: SceneProjectId}) {
  const [revision, setRevision] = useState(0);
  const [copiedMarker, setCopiedMarker] = useState<string | null>(null);
  const [progressByRevision, setProgressByRevision] = useState<Record<string, OperatorProgress>>({});
  const snapshot = useMemo(() => {
    const composer = loadMotionZukanComposerState();
    const timeline = composer.timelines.find((item) => item.projectId === projectId);
    if (!timeline) return null;
    const batch = buildTypographyProjectDeliveryBatch(
      projectId,
      composer.scenes,
      timeline,
      listTypographyProductionSelections(),
      listTypographyProductionRoleContexts(),
    );
    return {batch, timeline};
  }, [projectId, revision]);

  useEffect(() => {
    const refresh = () => setRevision((value) => value + 1);
    window.addEventListener(MOTION_ZUKAN_COMPOSER_CHANGED_EVENT, refresh);
    window.addEventListener(TYPOGRAPHY_PRODUCTION_SELECTION_CHANGED_EVENT, refresh);
    window.addEventListener(TYPOGRAPHY_PRODUCTION_ROLE_CONTEXT_CHANGED_EVENT, refresh);
    return () => {
      window.removeEventListener(MOTION_ZUKAN_COMPOSER_CHANGED_EVENT, refresh);
      window.removeEventListener(TYPOGRAPHY_PRODUCTION_SELECTION_CHANGED_EVENT, refresh);
      window.removeEventListener(TYPOGRAPHY_PRODUCTION_ROLE_CONTEXT_CHANGED_EVENT, refresh);
    };
  }, []);

  if (!snapshot) return null;
  const {batch, timeline} = snapshot;
  const assemblyReady = batch.summary.batchReadyForPalmierDaVinciHandoff;
  const placementByScene = new Map(timeline.placements.map((placement) => [placement.sceneId, placement]));
  const readySceneCount = batch.scenes.filter(
    (scene) => scene.status === "CURRENT_PACKAGE_READY" && scene.roleContextStatus === "CURRENT_ROLE_CONTEXT" && scene.package,
  ).length;
  const completedSceneCount = batch.scenes.filter((scene) => {
    const progress = progressByRevision[`${scene.sceneId}@${scene.sourceRevision}`];
    return Boolean(progress?.placed && progress.markerAdded && progress.timingReviewed);
  }).length;

  async function copyMarker(sceneId: string, marker: string) {
    await navigator.clipboard.writeText(marker);
    setCopiedMarker(sceneId);
    window.setTimeout(() => setCopiedMarker((current) => (current === sceneId ? null : current)), 1200);
  }

  function toggleProgress(sceneId: string, sourceRevision: string, key: keyof OperatorProgress) {
    const revisionKey = `${sceneId}@${sourceRevision}`;
    setProgressByRevision((current) => {
      const progress = current[revisionKey] ?? emptyProgress();
      return {...current, [revisionKey]: {...progress, [key]: !progress[key]}};
    });
  }

  return (
    <section className="mt-3 border-2 border-cyan-300 dark:border-cyan-800 p-3" data-palmier-assembly-operator={projectId}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-[8px] tracking-[0.14em] font-semibold text-cyan-700 dark:text-cyan-300">PALMIER ASSEMBLY OPERATOR / {projectId.toUpperCase()}</p>
          <p className="mt-1 text-[11px] font-semibold text-navy-800 dark:text-sand-100">{readySceneCount}/{batch.summary.totalScenes} Scene ready / assembly {completedSceneCount}/{batch.summary.totalScenes}</p>
          <p className="mt-1 text-[8px] leading-4 text-navy-500 dark:text-navy-300">
            Scene順・marker・Human-selected pattern/Role・timingを1画面で確認。ここはoperator previewで、canonical Assembly Planはstage後にCLIで生成します。
          </p>
        </div>
        <span className={`border px-2 py-1 font-mono text-[8px] ${assemblyReady ? "border-emerald-300 text-emerald-700 dark:border-emerald-800 dark:text-emerald-300" : "border-amber-300 text-amber-700 dark:border-amber-800 dark:text-amber-300"}`}>
          {assemblyReady ? "READY_TO_STAGE" : "BLOCKED"}
        </span>
      </div>

      <div className="mt-2 grid gap-1 sm:grid-cols-2">
        <div>
          <p className="mb-1 text-[7px] uppercase tracking-wide opacity-70">Input readiness</p>
          <div className="h-1.5 overflow-hidden bg-sand-100 dark:bg-navy-700">
            <div className="h-full bg-current transition-all" style={{width: `${batch.summary.totalScenes ? (readySceneCount / batch.summary.totalScenes) * 100 : 0}%`}} />
          </div>
        </div>
        <div>
          <p className="mb-1 text-[7px] uppercase tracking-wide opacity-70">Human assembly checklist</p>
          <div className="h-1.5 overflow-hidden bg-sand-100 dark:bg-navy-700">
            <div className="h-full bg-current transition-all" style={{width: `${batch.summary.totalScenes ? (completedSceneCount / batch.summary.totalScenes) * 100 : 0}%`}} />
          </div>
        </div>
      </div>

      <div className="mt-3 space-y-2">
        {batch.scenes.map((scene, index) => {
          const placement = placementByScene.get(scene.sceneId);
          const pkg = scene.package;
          const current = scene.status === "CURRENT_PACKAGE_READY" && scene.roleContextStatus === "CURRENT_ROLE_CONTEXT" && Boolean(pkg);
          const marker = pkg?.timeline.sceneMarkerId ?? null;
          const progressKey = `${scene.sceneId}@${scene.sourceRevision}`;
          const progress = progressByRevision[progressKey] ?? emptyProgress();
          const complete = progress.placed && progress.markerAdded && progress.timingReviewed;
          return (
            <article key={scene.sceneId} className={`border p-2 ${complete ? "border-emerald-300 dark:border-emerald-800" : current ? "border-cyan-200 dark:border-cyan-900" : "border-amber-200 dark:border-amber-900"}`} data-palmier-scene-status={current ? "CURRENT" : "BLOCKED"} data-palmier-operator-progress={complete ? "COMPLETE" : "INCOMPLETE"}>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="text-[8px] font-semibold text-navy-800 dark:text-sand-100">{index + 1}. {scene.sceneId}</p>
                  <p className="mt-1 text-[7px] text-navy-500 dark:text-navy-300">
                    pattern={scene.selectedPatternId ?? "NOT_SELECTED"} / role={scene.productionRole ?? "NOT_SELECTED"} / class={scene.selectionClass ?? "N/A"}
                  </p>
                </div>
                <span className="font-mono text-[7px] text-navy-400">
                  {placement ? `${placement.startSeconds.toFixed(2)}s → ${placement.endSeconds.toFixed(2)}s / ${placement.durationSeconds.toFixed(2)}s` : "TIMING_MISSING"}
                </span>
              </div>

              {pkg ? (
                <div className="mt-2 grid gap-1 text-[7px] sm:grid-cols-2">
                  <div className="border border-sand-200 dark:border-navy-700 p-1.5">
                    <div className="font-semibold">今Palmierでやること</div>
                    <div className="mt-1 leading-3 opacity-80">{pkg.timeline.instruction}</div>
                  </div>
                  <div className="border border-sand-200 dark:border-navy-700 p-1.5">
                    <div className="font-semibold">Clip / XML</div>
                    <div className="mt-1 font-mono leading-3 break-all">package={pkg.files.deliverySidecarFileName}</div>
                    <div className="font-mono leading-3 break-all">timeline={pkg.files.palmierTimelineXmlFileName}</div>
                  </div>
                </div>
              ) : (
                <p className="mt-2 text-[7px] leading-3 text-amber-700 dark:text-amber-300">先にHuman route / RoleをCURRENTへ戻してください。Palmier配置はまだ開始しません。</p>
              )}

              {marker ? (
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <code className="max-w-full flex-1 overflow-x-auto whitespace-nowrap border border-cyan-200 dark:border-cyan-900 px-2 py-1 text-[8px]">{marker}</code>
                  <button type="button" onClick={() => void copyMarker(scene.sceneId, marker)} className="border border-cyan-300 dark:border-cyan-800 px-2 py-1 text-[8px] font-semibold text-cyan-700 dark:text-cyan-300">
                    {copiedMarker === scene.sceneId ? "COPIED ✓" : "markerをコピー"}
                  </button>
                </div>
              ) : null}

              <div className="mt-2 flex flex-wrap gap-1" aria-label={`${scene.sceneId} Palmier assembly checklist`}>
                {([
                  ["placed", "1. Scene配置"],
                  ["markerAdded", "2. Marker追加"],
                  ["timingReviewed", "3. Timing確認"],
                ] as const).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    disabled={!current}
                    aria-pressed={progress[key]}
                    onClick={() => toggleProgress(scene.sceneId, scene.sourceRevision, key)}
                    className={`border px-2 py-1 text-[7px] font-semibold disabled:cursor-not-allowed disabled:opacity-40 ${progress[key] ? "border-emerald-300 text-emerald-700 dark:border-emerald-800 dark:text-emerald-300" : "border-sand-300 text-navy-500 dark:border-navy-600 dark:text-navy-300"}`}
                  >
                    {progress[key] ? "✓ " : ""}{label}
                  </button>
                ))}
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-3 border-t border-cyan-200 dark:border-cyan-900 pt-2">
        <p className="text-[7px] font-semibold uppercase tracking-wide text-cyan-700 dark:text-cyan-300">Canonical operator sequence</p>
        <code className="mt-1 block max-w-full overflow-x-auto whitespace-nowrap text-[8px] leading-4">{canonicalPlanCommand(projectId)}</code>
        <p className="mt-2 text-[7px] font-semibold uppercase tracking-wide text-cyan-700 dark:text-cyan-300">After real FCPXML export</p>
        <code className="mt-1 block max-w-full overflow-x-auto whitespace-nowrap text-[8px] leading-4">{timelineVerifyCommand(projectId)}</code>
      </div>

      <p className="mt-2 border-l-2 border-amber-300 pl-2 text-[7px] leading-3 text-amber-800 dark:text-amber-200">
        Human assembly checklistはこの画面session内の作業メモだけで、Scene revision単位に分離されます。チェック完了 ≠ FCPXML receipt CURRENT ≠ Palmier GUI Actual PASS ≠ Remotion Studio GUI Actual PASS ≠ Mac DaVinci GUI Actual PASS。GUI Actualは人間が実行した場合だけ記録します。
      </p>
    </section>
  );
}
