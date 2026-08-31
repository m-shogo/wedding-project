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

export function PalmierMarkerSequenceCard({projectId}: {projectId: SceneProjectId}) {
  const [revision, setRevision] = useState(0);
  const [copied, setCopied] = useState(false);
  const sequence = useMemo(() => {
    const composer = loadMotionZukanComposerState();
    const timeline = composer.timelines.find((item) => item.projectId === projectId);
    if (!timeline) return [];
    const batch = buildTypographyProjectDeliveryBatch(
      projectId,
      composer.scenes,
      timeline,
      listTypographyProductionSelections(),
      listTypographyProductionRoleContexts(),
    );
    return batch.scenes.map((scene, index) => ({
      order: index + 1,
      sceneId: scene.sceneId,
      sourceRevision: scene.sourceRevision,
      current: scene.status === "CURRENT_PACKAGE_READY" && scene.roleContextStatus === "CURRENT_ROLE_CONTEXT" && Boolean(scene.package),
      marker: scene.package?.timeline.sceneMarkerId ?? null,
      patternId: scene.selectedPatternId,
      productionRole: scene.productionRole,
    }));
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

  if (sequence.length === 0) return null;
  const allCurrent = sequence.every((scene) => scene.current && scene.marker);
  const clipboardText = sequence.map((scene) => `${scene.order}\t${scene.sceneId}\t${scene.marker ?? "BLOCKED"}`).join("\n");

  async function copySequence() {
    if (!allCurrent) return;
    await navigator.clipboard.writeText(clipboardText);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <section className="mt-3 border border-cyan-200 dark:border-cyan-900 p-3" data-palmier-marker-sequence={projectId}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-[8px] tracking-[0.14em] font-semibold text-cyan-700 dark:text-cyan-300">PALMIER MARKER SEQUENCE / {projectId.toUpperCase()}</p>
          <p className="mt-1 text-[8px] leading-4 text-navy-500 dark:text-navy-300">structured timeline順のmarkerを一括コピーし、Palmierで上から順に貼り付けるためのoperator補助です。</p>
        </div>
        <button
          type="button"
          disabled={!allCurrent}
          onClick={() => void copySequence()}
          className="border border-cyan-300 dark:border-cyan-800 px-2.5 py-1.5 text-[8px] font-semibold text-cyan-700 dark:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {copied ? "SEQUENCE COPIED ✓" : "全markerを順番どおりコピー"}
        </button>
      </div>

      <div className="mt-2 space-y-1">
        {sequence.map((scene) => (
          <div key={`${scene.sceneId}@${scene.sourceRevision}`} className={`grid gap-1 border px-2 py-1.5 text-[7px] sm:grid-cols-[2rem_1fr_2fr] ${scene.current ? "border-cyan-100 dark:border-cyan-950" : "border-amber-200 dark:border-amber-900"}`}>
            <span className="font-mono">{scene.order}</span>
            <span className="font-mono break-all">{scene.sceneId}</span>
            <span className="font-mono break-all">{scene.marker ?? "BLOCKED / route-roleをCURRENTへ"}</span>
            <span className="sm:col-start-2 sm:col-span-2 opacity-70">pattern={scene.patternId ?? "NOT_SELECTED"} / role={scene.productionRole ?? "NOT_SELECTED"}</span>
          </div>
        ))}
      </div>

      <p className="mt-2 border-l-2 border-amber-300 pl-2 text-[7px] leading-3 text-amber-800 dark:text-amber-200">
        marker sequence copyはClipboard操作だけです。Palmier timelineを変更・exportした証拠ではなく、FCPXML receipt CURRENT、Palmier GUI Actual PASS、Mac DaVinci GUI Actual PASS、productionReadyを生成しません。
      </p>
    </section>
  );
}
