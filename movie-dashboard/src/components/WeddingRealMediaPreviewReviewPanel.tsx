import { useMemo, useState } from "react";
import { getWeddingRealMediaPreviewReview, type WeddingPreviewProjectId } from "../data/weddingRealMediaPreviewReview";

function stateClass(state: string) {
  if (state === "PASS" || state === "CURRENT") return "border-emerald-300 text-emerald-700 dark:border-emerald-800 dark:text-emerald-300";
  if (state === "BLOCKED" || state === "STALE") return "border-amber-300 text-amber-700 dark:border-amber-800 dark:text-amber-300";
  return "border-sand-300 text-navy-500 dark:border-navy-600 dark:text-navy-300";
}

export function WeddingRealMediaPreviewReviewPanel() {
  const projects = useMemo(() => getWeddingRealMediaPreviewReview(), []);
  const [projectId, setProjectId] = useState<WeddingPreviewProjectId>("opening");
  const [copied, setCopied] = useState<string | null>(null);
  const project = projects.find((item) => item.projectId === projectId)!;

  async function copy(command: string) {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(command);
      window.setTimeout(() => setCopied(null), 1400);
    } catch {
      setCopied(null);
    }
  }

  const reviewBlockedReason = project.projectId === "opening"
    ? "Openingは本番media/BGM assembly後、Human crop review PASSがpreview renderより先です。"
    : "Profileは17枠の実素材を含むproduction assemblyがreadyになってからreal-media previewをrenderします。";

  return (
    <section className="mb-10 border-2 border-sky-200 bg-sky-50/20 dark:border-sky-900 dark:bg-sky-950/10">
      <div className="border-b border-sky-100 p-4 md:p-5 dark:border-sky-900/60">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-sky-700 dark:text-sky-300">REAL-MEDIA PREVIEW / HUMAN QA LAUNCH SURFACE</p>
            <h2 className="mt-1 text-lg font-bold text-navy-900 dark:text-sand-100">素材投入後、previewを作ってHuman QAへ進む場所</h2>
            <p className="mt-2 text-xs leading-5 text-navy-500 dark:text-navy-300">
              Motion Studio正本statusだけを読み、preview renderとHuman reviewの開始条件・evidence path・canonical commandを1画面にまとめます。ここからcommandをcopyしても、render実行・Human承認・GUI Actualが自動で成立することはありません。
            </p>
          </div>
          <div className="flex gap-2">
            {projects.map((item) => (
              <button key={item.projectId} type="button" onClick={() => setProjectId(item.projectId)} className={`border px-3 py-2 text-xs font-semibold ${projectId === item.projectId ? "border-sky-500 text-sky-700 dark:text-sky-300" : "border-sand-300 dark:border-navy-600"}`}>
                {item.projectId === "opening" ? "Opening" : "Profile"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-5 p-4 md:p-5">
        <div className="grid gap-3 md:grid-cols-4">
          <div className="border border-sand-200 p-3 dark:border-navy-700">
            <p className="text-[10px] text-navy-400">UPSTREAM</p>
            <span className={`mt-1 inline-block border px-2 py-1 text-[10px] font-bold ${stateClass(project.upstreamState)}`}>{project.upstreamState}</span>
          </div>
          <div className="border border-sand-200 p-3 dark:border-navy-700">
            <p className="text-[10px] text-navy-400">PREVIEW</p>
            <span className={`mt-1 inline-block border px-2 py-1 text-[10px] font-bold ${stateClass(project.previewState)}`}>{project.previewState}</span>
          </div>
          <div className="border border-sand-200 p-3 dark:border-navy-700">
            <p className="text-[10px] text-navy-400">HUMAN REVIEW</p>
            <span className={`mt-1 inline-block border px-2 py-1 text-[10px] font-bold ${stateClass(project.reviewState)}`}>{project.reviewState}</span>
          </div>
          <div className="border border-sand-200 p-3 dark:border-navy-700">
            <p className="text-[10px] text-navy-400">MEDIA REVIEWED</p>
            <p className="mt-1 text-sm font-bold text-navy-800 dark:text-sand-100">{project.reviewedCount}/{project.expectedCount}</p>
          </div>
        </div>

        {!project.canRenderPreview && (
          <div className="border border-amber-300 bg-amber-50/40 p-4 text-xs leading-5 text-amber-800 dark:border-amber-800 dark:bg-amber-950/20 dark:text-amber-200">
            <strong>PREVIEW BLOCKED:</strong> {reviewBlockedReason}
          </div>
        )}

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="border border-sand-200 p-4 dark:border-navy-700">
            <p className="text-[10px] font-semibold tracking-[0.16em] text-navy-500 dark:text-navy-300">1. REAL-MEDIA PREVIEW RENDER</p>
            <p className="mt-2 text-xs text-navy-500 dark:text-navy-300">Output: <code>{project.previewPath}</code></p>
            <button disabled={!project.canRenderPreview} type="button" onClick={() => copy(project.renderCommand)} className="mt-3 w-full border border-sand-300 px-3 py-3 text-left font-mono text-[10px] leading-5 break-all disabled:cursor-not-allowed disabled:opacity-40 dark:border-navy-600">
              {copied === project.renderCommand ? "✓ copied" : project.renderCommand}
            </button>
          </div>

          <div className="border border-sand-200 p-4 dark:border-navy-700">
            <p className="text-[10px] font-semibold tracking-[0.16em] text-navy-500 dark:text-navy-300">2. HUMAN REVIEW EVIDENCE</p>
            <p className="mt-2 text-xs text-navy-500 dark:text-navy-300">Evidence: <code>{project.reviewEvidencePath}</code></p>
            <div className="mt-3 space-y-2">
              {[project.reviewInitCommand, project.reviewStrictCommand].map((command) => (
                <button key={command} disabled={!project.canStartHumanReview} type="button" onClick={() => copy(command)} className="w-full border border-sand-300 px-3 py-3 text-left font-mono text-[10px] leading-5 break-all disabled:cursor-not-allowed disabled:opacity-40 dark:border-navy-600">
                  {copied === command ? "✓ copied" : command}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-2 text-[10px] text-navy-500 dark:text-navy-300 sm:grid-cols-4">
          <div className="border border-sand-200 p-2 dark:border-navy-700">Human review required: <strong>YES</strong></div>
          <div className="border border-sand-200 p-2 dark:border-navy-700">BGM reviewed: <strong>{project.bgmReviewed ? "YES" : "NO"}</strong></div>
          <div className="border border-sand-200 p-2 dark:border-navy-700">Remotion Studio GUI Actual: <strong>NOT_RUN</strong></div>
          <div className="border border-sand-200 p-2 dark:border-navy-700">Mac DaVinci GUI Actual: <strong>NOT_RUN</strong></div>
        </div>

        <p className="text-[10px] leading-5 text-navy-400">PREVIEW_COMMAND_COPIED != PREVIEW_RENDERED / PREVIEW_RENDERED != HUMAN_REVIEW_PASS / HUMAN_REVIEW_PASS != GUI_ACTUAL_PASS</p>
      </div>
    </section>
  );
}
