import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import {
  loadMotionZukanProductionWorkspaceState,
  saveMotionZukanProductionWorkspaceState,
} from "../data/motionZukanProductionWorkspace";
import {
  buildMotionZukanWorkspaceHandoff,
  parseMotionZukanWorkspaceHandoff,
} from "../data/motionZukanWorkspaceHandoff";
import {
  loadMotionZukanComposerState,
  MOTION_ZUKAN_COMPOSER_CHANGED_EVENT,
  saveMotionZukanComposerState,
  type SceneProjectId,
} from "../data/visualSceneComposer";
import {
  loadWeddingProjectMotionAssignments,
  saveWeddingProjectMotionAssignments,
  WEDDING_PROJECT_MOTION_ASSIGNMENTS_CHANGED_EVENT,
} from "../data/weddingProjectMotionAssignments";
import {buildWeddingProjectMotionProductionHandoff} from "../data/weddingProjectMotionProductionHandoff";

export function MotionZukanWorkspaceHandoffPanel() {
  const [projectId, setProjectId] = useState<SceneProjectId>("opening");
  const [feedback, setFeedback] = useState("");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [motionRevision, setMotionRevision] = useState(0);

  useEffect(() => () => {
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
  }, [downloadUrl]);

  useEffect(() => {
    const refresh = () => setMotionRevision((value) => value + 1);
    window.addEventListener(MOTION_ZUKAN_COMPOSER_CHANGED_EVENT, refresh);
    window.addEventListener(WEDDING_PROJECT_MOTION_ASSIGNMENTS_CHANGED_EVENT, refresh);
    return () => {
      window.removeEventListener(MOTION_ZUKAN_COMPOSER_CHANGED_EVENT, refresh);
      window.removeEventListener(WEDDING_PROJECT_MOTION_ASSIGNMENTS_CHANGED_EVENT, refresh);
    };
  }, []);

  const motionHandoff = useMemo(() => buildWeddingProjectMotionProductionHandoff(
    projectId,
    loadMotionZukanComposerState(),
    loadWeddingProjectMotionAssignments(),
  ), [projectId, motionRevision]);

  function downloadJson(payload: unknown, filename: string) {
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    setDownloadUrl(href);
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.download = filename;
    anchor.click();
  }

  function exportWorkspace() {
    const handoff = buildMotionZukanWorkspaceHandoff(
      loadMotionZukanComposerState(),
      loadMotionZukanProductionWorkspaceState(),
      loadWeddingProjectMotionAssignments(),
      projectId,
    );
    downloadJson(handoff, `motion-zukan-${projectId}-workspace-handoff.json`);
    setFeedback(`${projectId === "opening" ? "Opening" : "Profile"} Human workspaceを書き出しました。Motion project assignmentも含みますが、GUI ActualやProduction承認は含みません。`);
  }

  function exportProjectMotionHandoff() {
    downloadJson(motionHandoff, `${projectId}-project-motion-production-handoff.json`);
    setFeedback(`${projectId === "opening" ? "Opening" : "Profile"} のScene-bound Motion production handoffを書き出しました。Palmier rough / DaVinci finalの参照情報であり、適用済み・GUI Actual・Production承認を意味しません。`);
  }

  async function importWorkspace(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const file = input.files?.[0];
    if (!file) return;
    const parsed = parseMotionZukanWorkspaceHandoff(await file.text());
    input.value = "";
    if (!parsed.ok) {
      setFeedback(`読込拒否: ${parsed.error}`);
      return;
    }
    const label = parsed.handoff.projectId === "opening" ? "Opening" : "Profile";
    if (!window.confirm(`${label}のHuman workspaceを読み込みます。現在のローカル状態とMotion project assignmentは置き換わります。続行しますか？`)) {
      setFeedback("読込をキャンセルしました。");
      return;
    }
    saveMotionZukanComposerState(structuredClone(parsed.handoff.composer));
    saveMotionZukanProductionWorkspaceState(structuredClone(parsed.handoff.workspace));
    saveWeddingProjectMotionAssignments(structuredClone(parsed.handoff.projectMotionAssignments));
    setProjectId(parsed.handoff.projectId);
    setMotionRevision((value) => value + 1);
    setFeedback(`${label} Human workspaceとMotion project assignmentを読み込みました。Remotion Studio GUI Actual / Mac DaVinci ActualはNOT_RUNのままです。`);
  }

  const motionReady = motionHandoff.summary.allAssignedMotionsReadyForHandoffReference;

  return (
    <section className="mb-10 border border-sky-200 bg-sky-50/50 p-4 dark:border-sky-900 dark:bg-sky-950/10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-3xl">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-sky-700 dark:text-sky-300">WORKSPACE HANDOFF / HUMAN MASTER ONLY</p>
          <h2 className="mt-1 text-lg font-bold text-navy-900 dark:text-sand-100">モーション図鑑の制作状態をJSONで退避・引き継ぐ</h2>
          <p className="mt-2 text-xs leading-5 text-navy-500 dark:text-navy-300">
            Scene・素材参照・曲marker・デザイン設定・Version・HumanによるOpening/Profile Motion割当をまとめて保存します。これはブラウザ作業状態の移送だけで、Production Gate合格、Remotion Studio GUI Actual、Mac DaVinci Actual、最終納品承認には昇格しません。
          </p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => setProjectId("opening")} className={`border px-3 py-2 text-xs ${projectId === "opening" ? "border-sky-500 text-sky-700 dark:text-sky-300" : "border-sand-300 dark:border-navy-600"}`}>Opening</button>
          <button type="button" onClick={() => setProjectId("profile")} className={`border px-3 py-2 text-xs ${projectId === "profile" ? "border-sky-500 text-sky-700 dark:text-sky-300" : "border-sand-300 dark:border-navy-600"}`}>Profile</button>
        </div>
      </div>

      <div className="mt-4 border border-violet-200 bg-white/70 p-3 dark:border-violet-900 dark:bg-navy-900/40">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[9px] font-semibold tracking-[0.16em] text-violet-700 dark:text-violet-300">PROJECT MOTION → PALMIER / DAVINCI ASSEMBLY REFERENCE</p>
            <p className="mt-1 text-xs font-semibold text-navy-800 dark:text-sand-100">
              Human採用 {motionHandoff.summary.projectAssignmentCount} / Scene割当 {motionHandoff.summary.sceneAssignedCount} / Scene handoff ready {motionHandoff.summary.sceneHandoffReadyCount}
            </p>
            <p className={`mt-1 text-[10px] ${motionReady ? "text-emerald-700 dark:text-emerald-300" : "text-amber-700 dark:text-amber-300"}`}>
              {motionReady ? "MOTION HANDOFF REFERENCE READY" : `BLOCKED / ${motionHandoff.blockers.length} blocker`}
            </p>
          </div>
          <button type="button" onClick={exportProjectMotionHandoff} className="border border-violet-400 px-3 py-2 text-[10px] font-semibold text-violet-700 dark:text-violet-300">
            Project Motion handoff JSON
          </button>
        </div>
        <div className="mt-3 grid gap-2 text-[9px] sm:grid-cols-3">
          <div className="border border-sand-200 p-2 dark:border-navy-700">Scene未割当: <strong>{motionHandoff.summary.unassignedSceneCount}</strong></div>
          <div className="border border-sand-200 p-2 dark:border-navy-700">Stale Scene ref: <strong>{motionHandoff.summary.staleSceneReferenceCount}</strong></div>
          <div className="border border-sand-200 p-2 dark:border-navy-700">Usage unresolved: <strong>{motionHandoff.summary.unresolvedUsageCount}</strong></div>
        </div>
        {motionHandoff.scenes.length > 0 ? (
          <div className="mt-3 space-y-1">
            {motionHandoff.scenes.map((scene) => (
              <div key={scene.scene.sceneId} className="flex flex-wrap items-center justify-between gap-2 border border-sand-200 px-2 py-1.5 text-[8px] dark:border-navy-700">
                <span className="font-mono text-navy-500 dark:text-navy-300">{scene.scene.sceneId}</span>
                <span className={scene.readiness.handoffReferenceReady ? "text-emerald-700 dark:text-emerald-300" : "text-amber-700 dark:text-amber-300"}>
                  {scene.motions.length} Motion / {scene.readiness.handoffReferenceReady ? "REFERENCE READY" : `${scene.blockers.length} BLOCKER`}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-[9px] text-navy-400">このprojectでSceneへ明示割当されたROUGH/FINAL Motionはまだありません。Motion未採用projectはMotionだけを理由にassembly blockしません。</p>
        )}
        {motionHandoff.blockers.length > 0 && (
          <div className="mt-3 border border-amber-200 p-2 text-[8px] leading-4 text-amber-800 dark:border-amber-800 dark:text-amber-200">
            {motionHandoff.blockers.map((blocker) => <div key={blocker}>{blocker}</div>)}
          </div>
        )}
        <p className="mt-3 text-[8px] leading-4 text-violet-700 dark:text-violet-300">
          ROUGH → Palmier assembly reference / FINAL → DaVinci rebuild・native application reference。JSON exportやverified metadataは「適用済み」ではありません。
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" onClick={exportWorkspace} className="border border-sky-500 px-3 py-2 text-xs font-semibold text-sky-700 dark:text-sky-300">Human workspace JSONを書き出す</button>
        <label className="cursor-pointer border border-sand-300 px-3 py-2 text-xs font-semibold text-navy-600 dark:border-navy-600 dark:text-navy-300">
          Human workspace JSONを読み込む
          <input type="file" accept="application/json,.json" onChange={importWorkspace} className="sr-only" />
        </label>
      </div>
      <div className="mt-3 grid gap-2 text-[10px] text-navy-500 dark:text-navy-300 sm:grid-cols-3">
        <div className="border border-sand-200 p-2 dark:border-navy-700">Remotion Studio GUI Actual: <strong>{motionHandoff.summary.remotionStudioGuiActual}</strong></div>
        <div className="border border-sand-200 p-2 dark:border-navy-700">Mac DaVinci GUI Actual: <strong>{motionHandoff.summary.macDaVinciGuiActual}</strong></div>
        <div className="border border-sand-200 p-2 dark:border-navy-700">Final Delivery Approval: <strong>NO</strong></div>
      </div>
      {feedback && <p role="status" className={`mt-3 text-xs font-semibold ${feedback.startsWith("読込拒否") ? "text-red-600" : "text-emerald-700 dark:text-emerald-300"}`}>{feedback}</p>}
    </section>
  );
}