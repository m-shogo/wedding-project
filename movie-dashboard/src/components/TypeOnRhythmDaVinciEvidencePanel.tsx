import { useMemo, useState } from "react";
import { createTypeOnRhythmDaVinciActualArtifact } from "../data/typeOnRhythmDaVinciActualArtifact";
import {
  createTypeOnRhythmDaVinciEvidenceCaptureTemplate,
  evaluateTypeOnRhythmDaVinciEvidenceCapture,
  parseTypeOnRhythmDaVinciEvidenceCapture,
  type TypeOnRhythmDaVinciEvaluatedEvidenceV1,
} from "../data/typeOnRhythmDaVinciEvidenceCapture";
import { assessTypeOnRhythmDaVinciPromotionEligibility } from "../data/typeOnRhythmDaVinciPromotionGate";
import type { TypographyProductionSelectionV1 } from "../data/typographySceneProductionRouting";
import type { MaskRevealSceneInstance } from "../data/visualSceneComposer";
import { downloadText } from "../lib/exporters";

export function TypeOnRhythmDaVinciEvidencePanel({
  scene,
  selection,
}: {
  scene: MaskRevealSceneInstance;
  selection: TypographyProductionSelectionV1;
}) {
  const [evaluated, setEvaluated] = useState<TypeOnRhythmDaVinciEvaluatedEvidenceV1 | null>(null);
  const [error, setError] = useState<string | null>(null);
  const artifact = useMemo(
    () => createTypeOnRhythmDaVinciActualArtifact(scene, selection),
    [scene, selection],
  );
  const captureTemplate = useMemo(
    () => createTypeOnRhythmDaVinciEvidenceCaptureTemplate(artifact),
    [artifact],
  );
  const promotion = useMemo(
    () => (evaluated ? assessTypeOnRhythmDaVinciPromotionEligibility(evaluated) : null),
    [evaluated],
  );

  function exportActual() {
    downloadText(JSON.stringify(artifact, null, 2), `${scene.sceneId}-type-type-on-rhythm-davinci-actual.json`);
  }
  function exportTemplate() {
    downloadText(
      JSON.stringify(captureTemplate, null, 2),
      `${scene.sceneId}-type-type-on-rhythm-davinci-evidence-capture.json`,
    );
  }
  async function importCapture(file: File | undefined) {
    if (!file) return;
    try {
      const capture = parseTypeOnRhythmDaVinciEvidenceCapture(await file.text(), artifact);
      setEvaluated(evaluateTypeOnRhythmDaVinciEvidenceCapture(artifact, capture));
      setError(null);
    } catch (caught) {
      setEvaluated(null);
      setError(caught instanceof Error ? caught.message : String(caught));
    }
  }
  function exportEvaluated() {
    if (!evaluated) return;
    downloadText(
      JSON.stringify(evaluated, null, 2),
      `${scene.sceneId}-type-type-on-rhythm-davinci-evaluated-evidence.json`,
    );
  }

  return (
    <div className="mt-2 border border-indigo-200 dark:border-indigo-800 p-2.5 text-[9px] leading-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="font-semibold text-indigo-700 dark:text-indigo-300">Type on Rhythm / word-level Follower Actual</p>
          <p className="mt-1 text-navy-400">
            Follower unit: WORDS expected / live parameter binding: NOT_VERIFIED / GUI・Readback・Render・Visual QA: NOT_RUN
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button type="button" onClick={exportActual} className="border border-indigo-300 dark:border-indigo-700 px-2.5 py-1.5 font-semibold text-indigo-700 dark:text-indigo-300">
            Actual JSONを書き出す
          </button>
          <button type="button" onClick={exportTemplate} className="border border-indigo-300 dark:border-indigo-700 px-2.5 py-1.5 font-semibold text-indigo-700 dark:text-indigo-300">
            Readback template
          </button>
          <label className="cursor-pointer border border-indigo-300 dark:border-indigo-700 px-2.5 py-1.5 font-semibold text-indigo-700 dark:text-indigo-300">
            Readback取込
            <input type="file" accept="application/json,.json" className="sr-only" onChange={(event) => void importCapture(event.currentTarget.files?.[0])} />
          </label>
        </div>
      </div>
      <p className="mt-2 text-navy-400">
        Mac Resolve ActualではText+ / Followerに加えて、word-level sequencing unit自体のlive input名と値を記録します。公式capability説明だけからbinding名を推測しません。
      </p>
      {error ? <p className="mt-2 border border-red-300 dark:border-red-800 p-2 text-red-700 dark:text-red-300">Readback rejected: {error}</p> : null}
      {evaluated && promotion ? (
        <div className="mt-2 border border-emerald-200 dark:border-emerald-800 p-2 text-navy-400">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="font-semibold text-emerald-700 dark:text-emerald-300">Readback evaluated</p>
              <p>Machine checks: {evaluated.allMachineComparableChecksPass ? "ALL PASS" : "INCOMPLETE / FAIL"}</p>
              <p>Live binding roles: {promotion.capturedBindingRoles.length}/{promotion.requiredBindingRoles.length}</p>
              <p>Visual QA: 1x {evaluated.visualQa.oneX} / half-speed {evaluated.visualQa.halfSpeed}</p>
              <p>Promotion review: {promotion.eligibleForHumanPromotionReview ? "ELIGIBLE" : "BLOCKED"}</p>
              {promotion.blockers.length ? <p>Blockers: {promotion.blockers.join(", ")}</p> : null}
            </div>
            <button type="button" onClick={exportEvaluated} className="border border-emerald-300 dark:border-emerald-700 px-2.5 py-1.5 font-semibold text-emerald-700 dark:text-emerald-300">
              Evaluated evidence
            </button>
          </div>
          <p className="mt-2">Automatic promotion: NO / productionReady: NO。ELIGIBLEでも別のHuman reviewなしにrouteは昇格しません。</p>
        </div>
      ) : null}
    </div>
  );
}
