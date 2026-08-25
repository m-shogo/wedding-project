import { useMemo, useState } from "react";
import {
  buildMaskRevealSceneProductionBundle,
  buildMaskRevealSceneProductionBundleJson,
} from "../data/maskRevealSceneProductionBundle";
import type { MaskRevealSceneInstance } from "../data/visualSceneComposer";
import { downloadText } from "../lib/exporters";

export function MaskRevealSceneHandoffCard({ scene }: { scene: MaskRevealSceneInstance }) {
  const [copied, setCopied] = useState(false);
  const bundle = useMemo(() => buildMaskRevealSceneProductionBundle(scene), [scene]);
  const json = useMemo(() => buildMaskRevealSceneProductionBundleJson(scene), [scene]);

  async function copyJson() {
    await navigator.clipboard.writeText(json);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  function exportJson() {
    downloadText(json, bundle.timeline.sidecarFileName);
  }

  return (
    <section className="mt-3 border-t border-sand-200 dark:border-navy-600 pt-3">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[9px] tracking-[0.16em] font-semibold text-violet-700 dark:text-violet-300">EXPORT / ADAPTER</p>
          <p className="mt-1 text-[10px] font-mono text-navy-500 dark:text-navy-300 break-all">{bundle.sceneMarkerId}</p>
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[10px] text-navy-500 dark:text-navy-300">
            <span>Scene revision: {bundle.sourceRevision}</span>
            <span>Palmier Timeline: {bundle.timeline.projectTimelineXmlFileName}</span>
            <span>Sidecar JSON: {bundle.timeline.sidecarFileName}</span>
            <span>DaVinci Actual: {bundle.preview.productionReady ? "VERIFIED" : "PENDING"}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          <button type="button" onClick={() => void copyJson()} className="border border-violet-300 dark:border-violet-800 px-2.5 py-1.5 text-[10px] font-semibold text-violet-700 dark:text-violet-300">
            {copied ? "COPIED ✓" : "Sidecar JSONをコピー"}
          </button>
          <button type="button" onClick={exportJson} className="border border-sand-300 dark:border-navy-600 px-2.5 py-1.5 text-[10px] font-semibold text-navy-600 dark:text-navy-300">
            Sidecar JSONを書き出す
          </button>
        </div>
      </div>

      <p className="mt-2 text-[10px] leading-4 text-navy-400">
        Human MasterはSceneの人間が理解できる値です。JSON / XML自体はHuman Masterではありません。Sceneを編集するとupdatedAtが変わり、このexportも現在のSceneInstanceから再生成されます。NLE XML自体はPalmier実timelineからexportします。
      </p>

      <details className="mt-2">
        <summary className="cursor-pointer text-[10px] text-sky-700 dark:text-sky-300">Export詳細を見る</summary>
        <pre className="mt-2 max-h-80 overflow-auto border border-sand-200 dark:border-navy-600 p-3 text-[10px] leading-5 whitespace-pre-wrap text-navy-500 dark:text-navy-300">{json}</pre>
      </details>
    </section>
  );
}
