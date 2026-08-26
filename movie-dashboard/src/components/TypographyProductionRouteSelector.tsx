import { useEffect, useMemo, useState } from "react";
import { CharStaggerDaVinciPromotionAssessmentView } from "./CharStaggerDaVinciPromotionAssessmentView";
import { TypeOnRhythmDaVinciEvidencePanel } from "./TypeOnRhythmDaVinciEvidencePanel";
import { WordPunchDaVinciEvidencePanel } from "./WordPunchDaVinciEvidencePanel";
import { createCharStaggerDaVinciActualArtifact } from "../data/charStaggerDaVinciActualArtifact";
import {
  createCharStaggerDaVinciEvidenceCaptureTemplate,
  evaluateCharStaggerDaVinciEvidenceCapture,
  parseCharStaggerDaVinciEvidenceCapture,
  type CharStaggerDaVinciEvaluatedEvidenceV1,
} from "../data/charStaggerDaVinciEvidenceCapture";
import {
  buildTypographySceneProductionBundle,
  typographyProductionRoutes,
  type DaVinciTypographyRouteStatus,
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

const DAVINCI_ROUTE_SUMMARY: Record<DaVinciTypographyRouteStatus, string> = {
  DAVINCI_TRANSLATION_NOT_IMPLEMENTED: "DaVinci translator未実装",
  DAVINCI_ACTUAL_CANDIDATE: "Translator + Actual workflowあり / live未検証",
  DAVINCI_IMPLEMENTATION_AVAILABLE: "DaVinci live実装あり / Actual未確認",
  DAVINCI_ACTUAL_VERIFIED: "DaVinci Actual検証済み",
};

export function TypographyProductionRouteSelector({ scene }: { scene: MaskRevealSceneInstance }) {
  const [revision, setRevision] = useState(0);
  const [charStaggerEvaluatedEvidence, setCharStaggerEvaluatedEvidence] = useState<CharStaggerDaVinciEvaluatedEvidenceV1 | null>(null);
  const [charStaggerEvidenceError, setCharStaggerEvidenceError] = useState<string | null>(null);
  const selection = useMemo(() => loadTypographyProductionSelection(scene), [scene.sceneId, scene.updatedAt, revision]);
  const bundle = useMemo(() => (selection ? buildTypographySceneProductionBundle(scene, selection) : null), [scene, selection]);
  const charStaggerActualArtifact = useMemo(
    () => selection?.patternId === "type-char-stagger" ? createCharStaggerDaVinciActualArtifact(scene, selection) : null,
    [scene, selection],
  );
  const charStaggerCaptureTemplate = useMemo(
    () => charStaggerActualArtifact ? createCharStaggerDaVinciEvidenceCaptureTemplate(charStaggerActualArtifact) : null,
    [charStaggerActualArtifact],
  );

  useEffect(() => {
    const refresh = () => setRevision((value) => value + 1);
    window.addEventListener(TYPOGRAPHY_PRODUCTION_SELECTION_CHANGED_EVENT, refresh);
    return () => window.removeEventListener(TYPOGRAPHY_PRODUCTION_SELECTION_CHANGED_EVENT, refresh);
  }, []);

  useEffect(() => {
    setCharStaggerEvaluatedEvidence(null);
    setCharStaggerEvidenceError(null);
  }, [scene.sceneId, scene.updatedAt, selection?.patternId, selection?.sourceRevision]);

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
    downloadText(JSON.stringify(charStaggerActualArtifact, null, 2), `${scene.sceneId}-type-char-stagger-davinci-actual.json`);
  }

  function exportCharStaggerCaptureTemplate() {
    if (!charStaggerCaptureTemplate) return;
    downloadText(JSON.stringify(charStaggerCaptureTemplate, null, 2), `${scene.sceneId}-type-char-stagger-davinci-evidence-capture.json`);
  }

  async function importCharStaggerCapture(file: File | undefined) {
    if (!file || !charStaggerActualArtifact) return;
    try {
      const capture = parseCharStaggerDaVinciEvidenceCapture(await file.text(), charStaggerActualArtifact);
      const evaluated = evaluateCharStaggerDaVinciEvidenceCapture(charStaggerActualArtifact, capture);
      setCharStaggerEvaluatedEvidence(evaluated);
      setCharStaggerEvidenceError(null);
    } catch (error) {
      setCharStaggerEvaluatedEvidence(null);
      setCharStaggerEvidenceError(error instanceof Error ? error.message : String(error));
    }
  }

  function exportCharStaggerEvaluatedEvidence() {
    if (!charStaggerEvaluatedEvidence) return;
    downloadText(JSON.stringify(charStaggerEvaluatedEvidence, null, 2), `${scene.sceneId}-type-char-stagger-davinci-evaluated-evidence.json`);
  }

  return (
    <section className="mt-3 border border-violet-200 dark:border-violet-800 p-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-[9px] tracking-[0.16em] font-semibold text-violet-700 dark:text-violet-300">HUMAN SELECTED / TYPOGRAPHY ROUTE</p>
          <p className="mt-1 text-[10px] leading-4 text-navy-500 dark:text-navy-300">
            このSceneで使う文字モーションを選びます。選択は現在のScene revisionに固定され、Sceneを編集した後は自動適用されません。
          </p>
        </div>
        {selection ? <button type="button" onClick={clear} className="text-[9px] font-semibold text-navy-400 underline">選択を解除</button> : null}
      </div>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
        {typographyProductionRoutes.map((route) => {
          const selected = selection?.patternId === route.patternId;
          return (
            <button
              key={route.patternId}
              type="button"
              onClick={() => choose(route.patternId)}
              className={`text-left border p-2.5 ${selected ? "border-violet-500 bg-violet-50 dark:bg-violet-950/20" : "border-sand-200 dark:border-navy-600"}`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-semibold text-navy-800 dark:text-sand-100">{route.patternId}</span>
                <span className="text-[8px] font-mono text-navy-400">{route.canonicalMode}</span>
              </div>
              <p className="mt-1 text-[9px] text-navy-400">{DAVINCI_ROUTE_SUMMARY[route.davinciRouteStatus]}</p>
              {selected ? <p className="mt-1 text-[9px] font-semibold text-violet-700 dark:text-violet-300">HUMAN_SELECTED ✓</p> : null}
            </button>
          );
        })}
      </div>

      {bundle ? (
        <div className="mt-3 border-t border-violet-200 dark:border-violet-800 pt-2 text-[9px] leading-4 text-navy-500 dark:text-navy-300">
          <p>Selected: {bundle.patternId} / revision {bundle.routeSelection.sourceRevision}</p>
          <p>Gate: Remotion Studio {bundle.gate.remotionStudioReady ? "READY" : "NOT_RUN"} / Palmier timing READY / DaVinci visual {bundle.gate.davinciVisualReady ? "IMPLEMENTED" : "BLOCKED"}</p>
          <p>DaVinci stage: {bundle.davinci.routeStatus} / translator {bundle.davinci.translatorSpecAvailable ? "READY" : "NO"} / Actual workflow {bundle.davinci.actualEvidenceWorkflowAvailable ? "READY" : "NO"} / live {bundle.davinci.liveImplementationAvailable ? "READY" : "NOT_VERIFIED"} / Actual {bundle.davinci.actualVerified ? "PASS" : "NOT_RUN"}</p>
          <p>Production ready: NO / blockers: {bundle.gate.blockers.join(", ")}</p>
          {charStaggerActualArtifact ? (
            <div className="mt-2 border border-sky-200 dark:border-sky-800 p-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-semibold text-sky-700 dark:text-sky-300">Char Stagger / DaVinci Actual canary</p>
                  <p className="mt-1 text-navy-400">Parameter binding: NOT_VERIFIED / Apply・Readback・Render・Visual QA: NOT_RUN</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <button type="button" onClick={exportCharStaggerActualArtifact} className="border border-sky-300 dark:border-sky-700 px-2.5 py-1.5 font-semibold text-sky-700 dark:text-sky-300">Actual JSONを書き出す</button>
                  <button type="button" onClick={exportCharStaggerCaptureTemplate} className="border border-sky-300 dark:border-sky-700 px-2.5 py-1.5 font-semibold text-sky-700 dark:text-sky-300">Readback template</button>
                  <label className="cursor-pointer border border-sky-300 dark:border-sky-700 px-2.5 py-1.5 font-semibold text-sky-700 dark:text-sky-300">
                    Readback取込
                    <input type="file" accept="application/json,.json" className="sr-only" onChange={(event) => void importCharStaggerCapture(event.currentTarget.files?.[0])} />
                  </label>
                </div>
              </div>
              <p className="mt-2 text-navy-400">このEVIDENCE_ONLYテンプレートでは、Actual JSONを作業指示、Readback templateをMac Resolveで実測値・live Fusion input名・1x/half-speed QAを記録する容器として分離します。取込時はsceneId / sourceRevisionをfail-closeで検証します。</p>
              {charStaggerEvidenceError ? <p className="mt-2 border border-red-300 dark:border-red-800 p-2 text-red-700 dark:text-red-300">Readback rejected: {charStaggerEvidenceError}</p> : null}
              {charStaggerEvaluatedEvidence ? (
                <div className="mt-2 border border-emerald-200 dark:border-emerald-800 p-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="font-semibold text-emerald-700 dark:text-emerald-300">Readback evaluated</p>
                      <p className="mt-1 text-navy-400">Machine checks: {charStaggerEvaluatedEvidence.allMachineComparableChecksPass ? "ALL PASS" : "INCOMPLETE / FAIL"} / live bindings {charStaggerEvaluatedEvidence.parameterBindingsCaptured ? "CAPTURED" : "MISSING"}</p>
                      <p className="text-navy-400">Visual QA: 1x {charStaggerEvaluatedEvidence.checks.visualQa1x} / half-speed {charStaggerEvaluatedEvidence.checks.visualQaHalfSpeed}</p>
                    </div>
                    <button type="button" onClick={exportCharStaggerEvaluatedEvidence} className="border border-emerald-300 dark:border-emerald-700 px-2.5 py-1.5 font-semibold text-emerald-700 dark:text-emerald-300">Evaluated evidence</button>
                  </div>
                  <CharStaggerDaVinciPromotionAssessmentView evidence={charStaggerEvaluatedEvidence} />
                  <p className="mt-2 text-navy-400">ここでALL PASSになっても productionReady は自動昇格しません。live parameter bindingのレビューとproduction route昇格は別工程です。</p>
                </div>
              ) : null}
            </div>
          ) : null}
          {selection?.patternId === "type-type-on-rhythm" ? <TypeOnRhythmDaVinciEvidencePanel scene={scene} selection={selection} /> : null}
          {selection?.patternId === "type-word-punch" ? <WordPunchDaVinciEvidencePanel scene={scene} selection={selection} /> : null}
        </div>
      ) : (
        <p className="mt-3 text-[9px] leading-4 text-amber-700 dark:text-amber-300">未選択です。既存Sceneを勝手に別モーションへ変更しないため、production routeは人間が明示的に選ぶまで作成しません。</p>
      )}
    </section>
  );
}
