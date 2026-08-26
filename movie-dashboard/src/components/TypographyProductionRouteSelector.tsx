import { useEffect, useMemo, useState } from "react";
import { createCharStaggerDaVinciActualArtifact } from "../data/charStaggerDaVinciActualArtifact";
import {
  buildTypographySceneProductionBundle,
  typographyProductionRoutes,
  type TypographyProductionPatternId,
} from "../data/typographySceneProductionRouting";
import {
  clearTypographyProductionSelection,
  loadTypographyProductionSelection,
  saveTypographyProductionSelection,
  TYPOGRAPHY_PRODUCTION_SELECTION_CHANGED_EVENT,
} from "../data/typographyProductionSelectionStore";
import type { MaskRevealSceneInstance } from "../data/visualSceneComposer";
import { downloadText } from "../lib/exporters";

export function TypographyProductionRouteSelector({ scene }: { scene: MaskRevealSceneInstance }) {
  const [revision, setRevision] = useState(0);
  const selection = useMemo(
    () => loadTypographyProductionSelection(scene),
    [scene.sceneId, scene.updatedAt, revision],
  );
  const bundle = useMemo(
    () => (selection ? buildTypographySceneProductionBundle(scene, selection) : null),
    [scene, selection],
  );
  const charStaggerActualArtifact = useMemo(
    () =>
      selection?.patternId === "type-char-stagger"
        ? createCharStaggerDaVinciActualArtifact(scene, selection)
        : null,
    [scene, selection],
  );

  useEffect(() => {
    const refresh = () => setRevision((value) => value + 1);
    window.addEventListener(TYPOGRAPHY_PRODUCTION_SELECTION_CHANGED_EVENT, refresh);
    return () => window.removeEventListener(TYPOGRAPHY_PRODUCTION_SELECTION_CHANGED_EVENT, refresh);
  }, []);

  function choose(patternId: TypographyProductionPatternId) {
    saveTypographyProductionSelection(scene, patternId);
    setRevision((value) => value + 1);
  }

  function clear() {
    clearTypographyProductionSelection(scene.sceneId);
    setRevision((value) => value + 1);
  }

  function exportCharStaggerActualArtifact() {
    if (!charStaggerActualArtifact) return;
    downloadText(
      JSON.stringify(charStaggerActualArtifact, null, 2),
      `${scene.sceneId}-type-char-stagger-davinci-actual.json`,
    );
  }

  return (
    <section className="mt-3 border border-violet-200 dark:border-violet-800 p-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-[9px] tracking-[0.16em] font-semibold text-violet-700 dark:text-violet-300">
            HUMAN SELECTED / TYPOGRAPHY ROUTE
          </p>
          <p className="mt-1 text-[10px] leading-4 text-navy-500 dark:text-navy-300">
            このSceneで使う文字モーションを選びます。選択は現在のScene revisionに固定され、Sceneを編集した後は自動適用されません。
          </p>
        </div>
        {selection ? (
          <button type="button" onClick={clear} className="text-[9px] font-semibold text-navy-400 underline">
            選択を解除
          </button>
        ) : null}
      </div>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
        {typographyProductionRoutes.map((route) => {
          const selected = selection?.patternId === route.patternId;
          const davinciReady = route.davinciRouteStatus === "DAVINCI_IMPLEMENTATION_AVAILABLE";
          return (
            <button
              key={route.patternId}
              type="button"
              onClick={() => choose(route.patternId)}
              className={`text-left border p-2.5 ${
                selected
                  ? "border-violet-500 bg-violet-50 dark:bg-violet-950/20"
                  : "border-sand-200 dark:border-navy-600"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-semibold text-navy-800 dark:text-sand-100">{route.patternId}</span>
                <span className="text-[8px] font-mono text-navy-400">{route.canonicalMode}</span>
              </div>
              <p className="mt-1 text-[9px] text-navy-400">
                {davinciReady ? "DaVinci translatorあり / Actual未確認" : "DaVinci translator未実装"}
              </p>
              {selected ? (
                <p className="mt-1 text-[9px] font-semibold text-violet-700 dark:text-violet-300">HUMAN_SELECTED ✓</p>
              ) : null}
            </button>
          );
        })}
      </div>

      {bundle ? (
        <div className="mt-3 border-t border-violet-200 dark:border-violet-800 pt-2 text-[9px] leading-4 text-navy-500 dark:text-navy-300">
          <p>Selected: {bundle.patternId} / revision {bundle.routeSelection.sourceRevision}</p>
          <p>
            Gate: Remotion Studio {bundle.gate.remotionStudioReady ? "READY" : "NOT_RUN"} / Palmier timing READY / DaVinci visual {bundle.gate.davinciVisualReady ? "IMPLEMENTED" : "BLOCKED"}
          </p>
          <p>Production ready: NO / blockers: {bundle.gate.blockers.join(", ")}</p>
          {charStaggerActualArtifact ? (
            <div className="mt-2 border border-sky-200 dark:border-sky-800 p-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-semibold text-sky-700 dark:text-sky-300">Char Stagger / DaVinci Actual canary</p>
                  <p className="mt-1 text-navy-400">
                    Parameter binding: NOT_VERIFIED / Apply・Readback・Render・Visual QA: NOT_RUN
                  </p>
                </div>
                <button
                  type="button"
                  onClick={exportCharStaggerActualArtifact}
                  className="border border-sky-300 dark:border-sky-700 px-2.5 py-1.5 font-semibold text-sky-700 dark:text-sky-300"
                >
                  Actual JSONを書き出す
                </button>
              </div>
              <p className="mt-2 text-navy-400">
                このJSONはSceneの正本ではなく、実Mac ResolveでText+ / Followerを適用・readback・render確認するためのEVIDENCE_ONLYテンプレートです。
              </p>
            </div>
          ) : null}
        </div>
      ) : (
        <p className="mt-3 text-[9px] leading-4 text-amber-700 dark:text-amber-300">
          未選択です。既存Sceneを勝手に別モーションへ変更しないため、production routeは人間が明示的に選ぶまで作成しません。
        </p>
      )}
    </section>
  );
}
