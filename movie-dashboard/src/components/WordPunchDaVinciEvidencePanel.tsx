import { useMemo, useState } from "react";
import { createWordPunchDaVinciActualArtifact } from "../data/wordPunchDaVinciActualArtifact";
import {
  createWordPunchDaVinciEvidenceCaptureTemplate,
  evaluateWordPunchDaVinciEvidenceCapture,
  parseWordPunchDaVinciEvidenceCapture,
  type WordPunchDaVinciEvaluatedEvidenceV1,
} from "../data/wordPunchDaVinciEvidenceCapture";
import { assessWordPunchDaVinciPromotionEligibility } from "../data/wordPunchDaVinciPromotionGate";
import type { TypographyProductionSelectionV1 } from "../data/typographySceneProductionRouting";
import type { MaskRevealSceneInstance } from "../data/visualSceneComposer";
import { downloadText } from "../lib/exporters";

export function WordPunchDaVinciEvidencePanel({
  scene,
  selection,
}: {
  scene: MaskRevealSceneInstance;
  selection: TypographyProductionSelectionV1;
}) {
  const [evaluated, setEvaluated] = useState<WordPunchDaVinciEvaluatedEvidenceV1 | null>(null);
  const [error, setError] = useState<string | null>(null);
  const artifact = useMemo(() => createWordPunchDaVinciActualArtifact(scene, selection), [scene, selection]);
  const captureTemplate = useMemo(() => createWordPunchDaVinciEvidenceCaptureTemplate(artifact), [artifact]);
  const promotion = useMemo(
    () => (evaluated ? assessWordPunchDaVinciPromotionEligibility(evaluated) : null),
    [evaluated],
  );

  function exportActual() {
    downloadText(JSON.stringify(artifact, null, 2), `${scene.sceneId}-type-word-punch-davinci-actual.json`);
  }
  function exportTemplate() {
    downloadText(JSON.stringify(captureTemplate, null, 2), `${scene.sceneId}-type-word-punch-davinci-evidence-capture.json`);
  }
  async function importCapture(file: File | undefined) {
    if (!file) return;
    try {
      const capture = parseWordPunchDaVinciEvidenceCapture(await file.text(), artifact);
      setEvaluated(evaluateWordPunchDaVinciEvidenceCapture(artifact, capture));
      setError(null);
    } catch (caught) {
      setEvaluated(null);
      setError(caught instanceof Error ? caught.message : String(caught));
    }
  }
  function exportEvaluated() {
    if (!evaluated) return;
    downloadText(JSON.stringify(evaluated, null, 2), `${scene.sceneId}-type-word-punch-davinci-evaluated-evidence.json`);
  }

  return (
    <div className="mt-2 border border-fuchsia-200 dark:border-fuchsia-800 p-2.5 text-[9px] leading-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="font-semibold text-fuchsia-700 dark:text-fuchsia-300">Word Punch / Text+ + Transform Actual</p>
          <p className="mt-1 text-navy-400">
            canonical scale + opacity / live Fusion binding: NOT_VERIFIED / Apply・Readback・Render・Visual QA: NOT_RUN
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button type="button" onClick={exportActual} className="border border-fuchsia-300 dark:border-fuchsia-700 px-2.5 py-1.5 font-semibold text-fuchsia-700 dark:text-fuchsia-300">
            Actual JSONを書き出す
          </button>
          <button type="button" onClick={exportTemplate} className="border border-fuchsia-300 dark:border-fuchsia-700 px-2.5 py-1.5 font-semibold text-fuchsia-700 dark:text-fuchsia-300">
            Readback template
          </button>
          <label className="cursor-pointer border border-fuchsia-300 dark:border-fuchsia-700 px-2.5 py-1.5 font-semibold text-fuchsia-700 dark:text-fuchsia-300">
            Readback取込
            <input type="file" accept="application/json,.json" className="sr-only" onChange={(event) => void importCapture(event.currentTarget.files?.[0])} />
          </label>
        </div>
      </div>
      <p className="mt-2 text-navy-400">
        Mac Resolveではwhole-title scaleに使った実際のTransform tool/input名を記録します。canonical値は決定論的ですが、Fusion binding名は実機readback前に推測しません。
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
          <p className="mt-2">Automatic promotion: NO / productionReady: NO。ELIGIBLEでもHuman reviewなしにrouteは昇格しません。</p>
        </div>
      ) : null}
    </div>
  );
}
