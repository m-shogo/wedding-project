import { useEffect, useMemo, useState } from "react";
import {
  buildWeddingSceneMotionProductionHandoff,
  buildWeddingSceneMotionProductionHandoffJson,
} from "../data/weddingSceneMotionProductionHandoff";
import {
  loadWeddingProjectMotionAssignments,
  WEDDING_PROJECT_MOTION_ASSIGNMENTS_CHANGED_EVENT,
  type WeddingProjectMotionAssignmentState,
} from "../data/weddingProjectMotionAssignments";
import type { MaskRevealSceneInstance } from "../data/visualSceneComposer";
import { downloadText } from "../lib/exporters";

export function WeddingSceneMotionProductionHandoffCard({ scene }: { scene: MaskRevealSceneInstance }) {
  const [assignments, setAssignments] = useState<WeddingProjectMotionAssignmentState>(() => loadWeddingProjectMotionAssignments());
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    function onAssignmentsChanged(event: Event) {
      const next = (event as CustomEvent<WeddingProjectMotionAssignmentState>).detail;
      if (next?.schemaVersion === "wedding-project-motion-assignments/v1") setAssignments(next);
    }
    window.addEventListener(WEDDING_PROJECT_MOTION_ASSIGNMENTS_CHANGED_EVENT, onAssignmentsChanged);
    return () => window.removeEventListener(WEDDING_PROJECT_MOTION_ASSIGNMENTS_CHANGED_EVENT, onAssignmentsChanged);
  }, []);

  const handoff = useMemo(() => buildWeddingSceneMotionProductionHandoff(scene, assignments), [scene, assignments]);
  const json = useMemo(() => buildWeddingSceneMotionProductionHandoffJson(scene, assignments), [scene, assignments]);
  const fileName = `${scene.projectId}-${scene.sceneId}-motion-handoff.json`;

  async function copyJson() {
    await navigator.clipboard.writeText(json);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <section className="mt-3 border border-violet-200 p-3 dark:border-violet-900" aria-label="Scene Motion production handoff">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[9px] font-semibold tracking-[0.16em] text-violet-700 dark:text-violet-300">MOTION ZUKAN → PALMIER ROUGH → DAVINCI FINAL</p>
          <h3 className="mt-1 text-xs font-bold text-navy-900 dark:text-sand-100">このSceneへHuman割当されたMotion</h3>
          <p className="mt-1 text-[10px] text-navy-500 dark:text-navy-300">{handoff.readiness.assignmentCount}件 · reference {handoff.readiness.handoffReferenceReady ? "READY" : "NOT_READY"}</p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => void copyJson()} className="border border-violet-300 px-2.5 py-1.5 text-[10px] font-semibold text-violet-700 dark:border-violet-800 dark:text-violet-300">{copied ? "COPIED ✓" : "Motion sidecarをコピー"}</button>
          <button type="button" onClick={() => downloadText(json, fileName)} className="border border-sand-300 px-2.5 py-1.5 text-[10px] font-semibold text-navy-600 dark:border-navy-600 dark:text-navy-300">JSONを書き出す</button>
        </div>
      </div>

      {handoff.motions.length === 0 ? (
        <p className="mt-3 border border-dashed border-sand-300 p-2 text-[10px] text-navy-400 dark:border-navy-600">このSceneにMotion assignmentはありません。project fitや図鑑掲載だけでは自動割当しません。</p>
      ) : (
        <div className="mt-3 space-y-2">
          {handoff.motions.map((motion) => (
            <div key={motion.patternId} className="border border-sand-200 p-2 dark:border-navy-600">
              <div className="flex flex-wrap items-center gap-2">
                <span className="border border-violet-300 px-1.5 py-0.5 text-[9px] font-semibold text-violet-700 dark:border-violet-800 dark:text-violet-300">{motion.usageStage}</span>
                <span className="text-[10px] font-semibold text-navy-800 dark:text-sand-100">{motion.japaneseName}</span>
                <span className="text-[9px] font-mono text-navy-400">{motion.patternId}</span>
              </div>
              <p className="mt-1 text-[9px] text-navy-400">Implementation {motion.verifiedImplementation ? "VERIFIED" : motion.implementationStatus} · Preview {motion.verifiedPreview ? "VERIFIED" : motion.previewStatus}</p>
              <p className="mt-1 text-[9px] text-navy-400">Palmier: ROUGH_ASSEMBLY_REFERENCE · DaVinci: FINAL_REBUILD_OR_NATIVE_APPLICATION_REFERENCE</p>
            </div>
          ))}
        </div>
      )}

      {handoff.blockers.length > 0 && (
        <div className="mt-3 border border-amber-300 bg-amber-50 p-2 text-[9px] text-amber-800 dark:border-amber-900 dark:bg-amber-950/20 dark:text-amber-200">{handoff.blockers.join(" / ")}</div>
      )}
      <p className="mt-3 border-l-2 border-amber-400 pl-2 text-[9px] leading-4 text-navy-400">Motion sidecar export ≠ Palmier/DaVinciで適用済み。Remotion Studio GUI Actual = NOT_RUN / Mac DaVinci GUI Actual = NOT_RUN / productionReady = false を維持します。</p>
    </section>
  );
}
