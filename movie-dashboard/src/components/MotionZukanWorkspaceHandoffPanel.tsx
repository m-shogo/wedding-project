import { useEffect, useState, type ChangeEvent } from "react";
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
  saveMotionZukanComposerState,
  type SceneProjectId,
} from "../data/visualSceneComposer";
import {
  loadWeddingProjectMotionAssignments,
  saveWeddingProjectMotionAssignments,
} from "../data/weddingProjectMotionAssignments";

export function MotionZukanWorkspaceHandoffPanel() {
  const [projectId, setProjectId] = useState<SceneProjectId>("opening");
  const [feedback, setFeedback] = useState("");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  useEffect(() => () => {
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
  }, [downloadUrl]);

  function exportWorkspace() {
    const handoff = buildMotionZukanWorkspaceHandoff(
      loadMotionZukanComposerState(),
      loadMotionZukanProductionWorkspaceState(),
      loadWeddingProjectMotionAssignments(),
      projectId,
    );
    const blob = new Blob([JSON.stringify(handoff, null, 2)], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    setDownloadUrl(href);
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.download = `motion-zukan-${projectId}-workspace-handoff.json`;
    anchor.click();
    setFeedback(`${projectId === "opening" ? "Opening" : "Profile"} Human workspaceを書き出しました。Motion project assignmentも含みますが、GUI ActualやProduction承認は含みません。`);
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
    setFeedback(`${label} Human workspaceとMotion project assignmentを読み込みました。Remotion Studio GUI Actual / Mac DaVinci ActualはNOT_RUNのままです。`);
  }

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
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" onClick={exportWorkspace} className="border border-sky-500 px-3 py-2 text-xs font-semibold text-sky-700 dark:text-sky-300">Human workspace JSONを書き出す</button>
        <label className="cursor-pointer border border-sand-300 px-3 py-2 text-xs font-semibold text-navy-600 dark:border-navy-600 dark:text-navy-300">
          Human workspace JSONを読み込む
          <input type="file" accept="application/json,.json" onChange={importWorkspace} className="sr-only" />
        </label>
      </div>
      <div className="mt-3 grid gap-2 text-[10px] text-navy-500 dark:text-navy-300 sm:grid-cols-3">
        <div className="border border-sand-200 p-2 dark:border-navy-700">Remotion Studio GUI Actual: <strong>NOT_RUN</strong></div>
        <div className="border border-sand-200 p-2 dark:border-navy-700">Mac DaVinci GUI Actual: <strong>NOT_RUN</strong></div>
        <div className="border border-sand-200 p-2 dark:border-navy-700">Final Delivery Approval: <strong>NO</strong></div>
      </div>
      {feedback && <p role="status" className={`mt-3 text-xs font-semibold ${feedback.startsWith("読込拒否") ? "text-red-600" : "text-emerald-700 dark:text-emerald-300"}`}>{feedback}</p>}
    </section>
  );
}