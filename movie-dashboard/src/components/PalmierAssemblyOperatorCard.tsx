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
const isComplete = (progress: OperatorProgress) => progress.placed && progress.markerAdded && progress.timingReviewed;

type ScenePacketInput = {
  projectId: SceneProjectId;
  order: number;
  sceneId: string;
  sourceRevision: string;
  selectedPatternId: string | null;
  productionRole: string | null;
  selectionClass: string | null;
  startSeconds: number | null;
  endSeconds: number | null;
  durationSeconds: number | null;
  deliverySidecarFileName: string | null;
  palmierTimelineXmlFileName: string | null;
  marker: string | null;
  instruction: string | null;
};

const formatSeconds = (value: number | null) => value === null ? "MISSING" : `${value.toFixed(2)}s`;

const buildSceneInstructionPacket = (input: ScenePacketInput) => [
  `PALMIER SCENE PACKET / ${input.projectId.toUpperCase()} / ${String(input.order).padStart(2, "0")}`,
  `scene=${input.sceneId}`,
  `revision=${input.sourceRevision}`,
  `time=${formatSeconds(input.startSeconds)} -> ${formatSeconds(input.endSeconds)} / duration=${formatSeconds(input.durationSeconds)}`,
  `pattern=${input.selectedPatternId ?? "NOT_SELECTED"}`,
  `role=${input.productionRole ?? "NOT_SELECTED"}`,
  `class=${input.selectionClass ?? "N/A"}`,
  `package=${input.deliverySidecarFileName ?? "MISSING"}`,
  `timeline=${input.palmierTimelineXmlFileName ?? "MISSING"}`,
  `marker=${input.marker ?? "MISSING"}`,
  "instruction:",
  input.instruction ?? "BLOCKED: Human route / Role / delivery packageをCURRENTへ戻してから配置する。",
  "checklist: Scene配置 -> Marker追加 -> Timing確認",
].join("\n");

export function PalmierAssemblyOperatorCard({projectId}: {projectId: SceneProjectId}) {
  const [revision, setRevision] = useState(0);
  const [copiedMarker, setCopiedMarker] = useState<string | null>(null);
  const [copiedPacket, setCopiedPacket] = useState<string | null>(null);
  const [progressByRevision, setProgressByRevision] = useState<Record<string, OperatorProgress>>({});
  const [activeRevisionKey, setActiveRevisionKey] = useState<string | null>(null);

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
  const sceneRows = batch.scenes.map((scene, index) => {
    const revisionKey = `${scene.sceneId}@${scene.sourceRevision}`;
    const progress = progressByRevision[revisionKey] ?? emptyProgress();
    const current = scene.status === "CURRENT_PACKAGE_READY" && scene.roleContextStatus === "CURRENT_ROLE_CONTEXT" && Boolean(scene.package);
    const placement = placementByScene.get(scene.sceneId) ?? null;
    const pkg = scene.package;
    const packet = buildSceneInstructionPacket({
      projectId,
      order: index + 1,
      sceneId: scene.sceneId,
      sourceRevision: scene.sourceRevision,
      selectedPatternId: scene.selectedPatternId,
      productionRole: scene.productionRole,
      selectionClass: scene.selectionClass,
      startSeconds: placement?.startSeconds ?? null,
      endSeconds: placement?.endSeconds ?? null,
      durationSeconds: placement?.durationSeconds ?? null,
      deliverySidecarFileName: pkg?.files.deliverySidecarFileName ?? null,
      palmierTimelineXmlFileName: pkg?.files.palmierTimelineXmlFileName ?? null,
      marker: pkg?.timeline.sceneMarkerId ?? null,
      instruction: pkg?.timeline.instruction ?? null,
    });
    return {scene, index, revisionKey, progress, current, complete: isComplete(progress), placement, packet};
  });
  const readySceneCount = sceneRows.filter((row) => row.current).length;
  const completedSceneCount = sceneRows.filter((row) => row.complete).length;
  const firstIncomplete = sceneRows.find((row) => row.current && !row.complete) ?? null;
  const effectiveActiveKey = activeRevisionKey && sceneRows.some((row) => row.revisionKey === activeRevisionKey && row.current && !row.complete)
    ? activeRevisionKey
    : firstIncomplete?.revisionKey ?? null;
  const activeRow = effectiveActiveKey ? sceneRows.find((row) => row.revisionKey === effectiveActiveKey) ?? null : null;
  const allAssemblyComplete = batch.summary.totalScenes > 0 && completedSceneCount === batch.summary.totalScenes;

  function focusRevisionKey(revisionKey: string | null) {
    if (!revisionKey) return;
    setActiveRevisionKey(revisionKey);
    window.requestAnimationFrame(() => {
      document.getElementById(`palmier-${projectId}-${revisionKey}`)?.scrollIntoView({behavior: "smooth", block: "center"});
    });
  }

  async function copyMarker(sceneId: string, marker: string) {
    await navigator.clipboard.writeText(marker);
    setCopiedMarker(sceneId);
    window.setTimeout(() => setCopiedMarker((current) => (current === sceneId ? null : current)), 1200);
  }

  async function copyInstructionPacket(revisionKey: string, packet: string) {
    await navigator.clipboard.writeText(packet);
    setCopiedPacket(revisionKey);
    window.setTimeout(() => setCopiedPacket((current) => (current === revisionKey ? null : current)), 1600);
  }

  function toggleProgress(sceneId: string, sourceRevision: string, key: keyof OperatorProgress) {
    const revisionKey = `${sceneId}@${sourceRevision}`;
    setProgressByRevision((current) => {
      const progress = current[revisionKey] ?? emptyProgress();
      const nextProgress = {...progress, [key]: !progress[key]};
      const nextState = {...current, [revisionKey]: nextProgress};
      if (isComplete(nextProgress)) {
        const currentIndex = sceneRows.findIndex((row) => row.revisionKey === revisionKey);
        const nextIncomplete = sceneRows.slice(currentIndex + 1).find((row) => {
          const candidate = nextState[row.revisionKey] ?? emptyProgress();
          return row.current && !isComplete(candidate);
        }) ?? sceneRows.slice(0, currentIndex).find((row) => {
          const candidate = nextState[row.revisionKey] ?? emptyProgress();
          return row.current && !isComplete(candidate);
        });
        if (nextIncomplete) window.setTimeout(() => focusRevisionKey(nextIncomplete.revisionKey), 0);
      }
      return nextState;
    });
  }

  return (
    <section className="mt-3 border-2 border-cyan-300 dark:border-cyan-800 p-3" data-palmier-assembly-operator={projectId} data-palmier-operator-flow="V3_PACKET">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-[8px] tracking-[0.14em] font-semibold text-cyan-700 dark:text-cyan-300">PALMIER ASSEMBLY OPERATOR / {projectId.toUpperCase()}</p>
          <p className="mt-1 text-[11px] font-semibold text-navy-800 dark:text-sand-100">{readySceneCount}/{batch.summary.totalScenes} Scene ready / assembly {completedSceneCount}/{batch.summary.totalScenes}</p>
          <p className="mt-1 text-[8px] leading-4 text-navy-500 dark:text-navy-300">Instruction packetを1回コピー → Scene配置 → marker → timing確認 → 次の未完Sceneへ。revision変更後の古いchecklistは再利用しません。</p>
        </div>
        <span className={`border px-2 py-1 font-mono text-[8px] ${assemblyReady ? "border-emerald-300 text-emerald-700 dark:border-emerald-800 dark:text-emerald-300" : "border-amber-300 text-amber-700 dark:border-amber-800 dark:text-amber-300"}`}>{assemblyReady ? "READY_TO_STAGE" : "BLOCKED"}</span>
      </div>

      <div className="mt-2 grid gap-1 sm:grid-cols-2">
        <div>
          <p className="mb-1 text-[7px] uppercase tracking-wide opacity-70">Input readiness</p>
          <div className="h-1.5 overflow-hidden bg-sand-100 dark:bg-navy-700"><div className="h-full bg-current transition-all" style={{width: `${batch.summary.totalScenes ? (readySceneCount / batch.summary.totalScenes) * 100 : 0}%`}} /></div>
        </div>
        <div>
          <p className="mb-1 text-[7px] uppercase tracking-wide opacity-70">Human assembly checklist</p>
          <div className="h-1.5 overflow-hidden bg-sand-100 dark:bg-navy-700"><div className="h-full bg-current transition-all" style={{width: `${batch.summary.totalScenes ? (completedSceneCount / batch.summary.totalScenes) * 100 : 0}%`}} /></div>
        </div>
      </div>

      {!allAssemblyComplete ? (
        <div className="mt-3 border-2 border-cyan-300 dark:border-cyan-800 p-2" data-palmier-next-incomplete={effectiveActiveKey ?? "NONE"}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-[7px] font-semibold uppercase tracking-wide text-cyan-700 dark:text-cyan-300">NEXT INCOMPLETE SCENE</p>
              <p className="mt-1 font-mono text-[8px]">{effectiveActiveKey ?? "CURRENTな未完Sceneなし"}</p>
            </div>
            <div className="flex flex-wrap gap-1">
              <button type="button" disabled={!activeRow} onClick={() => activeRow && void copyInstructionPacket(activeRow.revisionKey, activeRow.packet)} className="border border-cyan-300 dark:border-cyan-800 px-2.5 py-1.5 text-[8px] font-semibold text-cyan-700 dark:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-40">{activeRow && copiedPacket === activeRow.revisionKey ? "PACKET COPIED ✓" : "次Scene packetをコピー"}</button>
              <button type="button" disabled={!effectiveActiveKey} onClick={() => focusRevisionKey(effectiveActiveKey)} className="border border-cyan-300 dark:border-cyan-800 px-2.5 py-1.5 text-[8px] font-semibold text-cyan-700 dark:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-40">次の未完Sceneへ</button>
            </div>
          </div>
          {activeRow ? <pre className="mt-2 max-h-44 overflow-auto whitespace-pre-wrap border border-cyan-100 dark:border-cyan-950 p-2 font-mono text-[7px] leading-3" data-palmier-active-packet={activeRow.revisionKey}>{activeRow.packet}</pre> : null}
        </div>
      ) : (
        <div className="mt-3 border-2 border-emerald-300 dark:border-emerald-800 p-2.5" data-palmier-assembly-complete="true">
          <p className="text-[8px] font-semibold text-emerald-700 dark:text-emerald-300">ASSEMBLY CHECKLIST COMPLETE — real FCPXML export / verifyへ</p>
          <code className="mt-1 block max-w-full overflow-x-auto whitespace-nowrap text-[8px] leading-4">{timelineVerifyCommand(projectId)}</code>
          <p className="mt-1 text-[7px] leading-3 opacity-80">この昇格はoperator checklist上だけです。receipt CURRENTやPalmier GUI Actual PASSはchecker実行前には生成しません。</p>
        </div>
      )}

      <div className="mt-3 space-y-2">
        {sceneRows.map(({scene, index, revisionKey, progress, current, complete, placement, packet}) => {
          const pkg = scene.package;
          const marker = pkg?.timeline.sceneMarkerId ?? null;
          const active = effectiveActiveKey === revisionKey;
          return (
            <article id={`palmier-${projectId}-${revisionKey}`} key={revisionKey} className={`border p-2 ${active ? "ring-2 ring-cyan-400" : ""} ${complete ? "border-emerald-300 dark:border-emerald-800" : current ? "border-cyan-200 dark:border-cyan-900" : "border-amber-200 dark:border-amber-900"}`} data-palmier-scene-status={current ? "CURRENT" : "BLOCKED"} data-palmier-operator-progress={complete ? "COMPLETE" : "INCOMPLETE"} data-palmier-active-scene={active ? "true" : "false"}>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="text-[8px] font-semibold text-navy-800 dark:text-sand-100">{index + 1}. {scene.sceneId}</p>
                  <p className="mt-1 text-[7px] text-navy-500 dark:text-navy-300">pattern={scene.selectedPatternId ?? "NOT_SELECTED"} / role={scene.productionRole ?? "NOT_SELECTED"} / class={scene.selectionClass ?? "N/A"}</p>
                </div>
                <span className="font-mono text-[7px] text-navy-400">{placement ? `${placement.startSeconds.toFixed(2)}s → ${placement.endSeconds.toFixed(2)}s / ${placement.durationSeconds.toFixed(2)}s` : "TIMING_MISSING"}</span>
              </div>

              {pkg ? (
                <div className="mt-2 grid gap-1 text-[7px] sm:grid-cols-2">
                  <div className="border border-sand-200 dark:border-navy-700 p-1.5"><div className="font-semibold">今Palmierでやること</div><div className="mt-1 leading-3 opacity-80">{pkg.timeline.instruction}</div></div>
                  <div className="border border-sand-200 dark:border-navy-700 p-1.5"><div className="font-semibold">Clip / XML</div><div className="mt-1 font-mono leading-3 break-all">package={pkg.files.deliverySidecarFileName}</div><div className="font-mono leading-3 break-all">timeline={pkg.files.palmierTimelineXmlFileName}</div></div>
                </div>
              ) : <p className="mt-2 text-[7px] leading-3 text-amber-700 dark:text-amber-300">先にHuman route / RoleをCURRENTへ戻してください。Palmier配置はまだ開始しません。</p>}

              <div className="mt-2 flex flex-wrap gap-1">
                <button type="button" disabled={!current} onClick={() => void copyInstructionPacket(revisionKey, packet)} className="border border-cyan-300 dark:border-cyan-800 px-2 py-1 text-[8px] font-semibold text-cyan-700 dark:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-40">{copiedPacket === revisionKey ? "PACKET COPIED ✓" : "Scene packetをコピー"}</button>
                {marker ? <button type="button" onClick={() => void copyMarker(scene.sceneId, marker)} className="border border-cyan-300 dark:border-cyan-800 px-2 py-1 text-[8px] font-semibold text-cyan-700 dark:text-cyan-300">{copiedMarker === scene.sceneId ? "MARKER COPIED ✓" : "markerだけコピー"}</button> : null}
              </div>

              {active ? <pre className="mt-2 max-h-44 overflow-auto whitespace-pre-wrap border border-cyan-100 dark:border-cyan-950 p-2 font-mono text-[7px] leading-3" data-palmier-scene-packet={revisionKey}>{packet}</pre> : null}

              <div className="mt-2 flex flex-wrap gap-1" aria-label={`${scene.sceneId} Palmier assembly checklist`}>
                {([["placed", "1. Scene配置"], ["markerAdded", "2. Marker追加"], ["timingReviewed", "3. Timing確認"]] as const).map(([key, label]) => (
                  <button key={key} type="button" disabled={!current} aria-pressed={progress[key]} onClick={() => toggleProgress(scene.sceneId, scene.sourceRevision, key)} className={`border px-2 py-1 text-[7px] font-semibold disabled:cursor-not-allowed disabled:opacity-40 ${progress[key] ? "border-emerald-300 text-emerald-700 dark:border-emerald-800 dark:text-emerald-300" : "border-sand-300 text-navy-500 dark:border-navy-600 dark:text-navy-300"}`}>{progress[key] ? "✓ " : ""}{label}</button>
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

      <p className="mt-2 border-l-2 border-amber-300 pl-2 text-[7px] leading-3 text-amber-800 dark:text-amber-200">Instruction packet copy / Human assembly checklist / focus / auto-advanceはこの画面session内の作業補助だけで、Scene revision単位に分離されます。packet copyやチェック完了 ≠ FCPXML receipt CURRENT ≠ Palmier GUI Actual PASS ≠ Remotion Studio GUI Actual PASS ≠ Mac DaVinci GUI Actual PASS。GUI Actualは人間が実行した場合だけ記録します。</p>
    </section>
  );
}
