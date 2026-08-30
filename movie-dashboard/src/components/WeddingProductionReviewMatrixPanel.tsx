import { openingProductionStatus } from "../data/openingProductionStatus.generated";
import { profileAssemblyReviewReadiness } from "../data/profileAssemblyReviewReadiness.generated";
import { weddingProductionActions } from "../lib/weddingProductionActions";

type Cell = { state: string; detail: string };

type ProjectRow = {
  project: "Opening" | "Profile";
  inputs: Cell;
  structureOrCrop: Cell;
  realMedia: Cell;
  audio: Cell;
  finalRender: Cell;
  exactNext: string;
};

const openingState = (state: string, detail: string): Cell => ({ state, detail });

function deriveOpening(): ProjectRow {
  const inputsReady = Boolean(openingProductionStatus.readiness.finalRenderEligible);
  const crop = String(openingProductionStatus.stages.cropReview.state);
  const preview = String(openingProductionStatus.stages.previewReview.state);
  const audio = String(openingProductionStatus.stages.audioListeningReview.state);
  const finalRender = String(openingProductionStatus.stages.finalRender.state);

  return {
    project: "Opening",
    inputs: openingState(inputsReady ? "READY" : "INPUT_REQUIRED", "11写真 + BGM receipt / rights"),
    structureOrCrop: openingState(crop, "crop / focus / color / motion"),
    realMedia: openingState(preview, "source-bound preview Human QA"),
    audio: openingState(audio, "preview + BGM Human listening"),
    finalRender: openingState(finalRender, "final MP4 technical QA"),
    exactNext: weddingProductionActions.Opening.title,
  };
}

function deriveProfile(): ProjectRow {
  const inputsReady = Boolean(profileAssemblyReviewReadiness.finalRenderEligible);
  const structure = String(profileAssemblyReviewReadiness.structureReview.state);
  const realMedia = String(profileAssemblyReviewReadiness.realMediaReview.state);
  const audio = String(profileAssemblyReviewReadiness.audioReview.state);
  const assemblyReady = Boolean(profileAssemblyReviewReadiness.assemblyReady);

  return {
    project: "Profile",
    inputs: { state: inputsReady ? "READY" : "INPUT_REQUIRED", detail: "17素材 + BGM receipt / rights" },
    structureOrCrop: { state: structure, detail: "5章 order / hierarchy / pacing" },
    realMedia: { state: realMedia, detail: `${profileAssemblyReviewReadiness.realMediaReview.reviewedCount}/${profileAssemblyReviewReadiness.realMediaReview.expectedCount} media Human QA` },
    audio: { state: audio, detail: "preview + BGM Human listening" },
    finalRender: { state: assemblyReady ? "READY" : "BLOCKED", detail: "assemblyReady prerequisite" },
    exactNext: weddingProductionActions.Profile.title,
  };
}

const rows = [deriveOpening(), deriveProfile()];

function stateClass(state: string) {
  if (state === "PASS" || state === "READY") return "text-emerald-700 dark:text-emerald-300";
  if (state === "INPUT_REQUIRED" || state === "BLOCKED" || state === "MISSING" || state === "STALE") return "text-amber-700 dark:text-amber-300";
  return "text-navy-500 dark:text-navy-300";
}

export function WeddingProductionReviewMatrixPanel() {
  return (
    <section className="mb-10 border-2 border-indigo-200 bg-indigo-50/20 dark:border-indigo-900 dark:bg-indigo-950/10">
      <div className="border-b border-indigo-100 p-4 md:p-5 dark:border-indigo-900/60">
        <p className="text-[10px] font-semibold tracking-[0.2em] text-indigo-700 dark:text-indigo-300">WEDDING PRODUCTION REVIEW MATRIX</p>
        <h2 className="mt-1 text-lg font-bold text-navy-900 dark:text-sand-100">Opening / Profileの「何待ち」を横並びで確認</h2>
        <p className="mt-2 max-w-3xl text-xs leading-5 text-navy-500 dark:text-navy-300">
          各project固有のMotion Studio authorityを集約表示するだけで、状態の正本は複製しません。EXACT NEXTはAction Launcherと同じderivationを共有します。
        </p>
      </div>

      <div className="overflow-x-auto p-4 md:p-5">
        <table className="min-w-[920px] w-full border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-sand-200 dark:border-navy-700">
              <th className="p-3">PROJECT</th>
              <th className="p-3">INPUTS</th>
              <th className="p-3">STRUCTURE / CROP</th>
              <th className="p-3">REAL-MEDIA QA</th>
              <th className="p-3">AUDIO QA</th>
              <th className="p-3">FINAL RENDER</th>
              <th className="p-3">EXACT NEXT</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.project} className="border-b border-sand-100 align-top dark:border-navy-800">
                <td className="p-3 font-bold text-navy-900 dark:text-sand-100">{row.project}</td>
                {[row.inputs, row.structureOrCrop, row.realMedia, row.audio, row.finalRender].map((cell, index) => (
                  <td key={index} className="p-3">
                    <p className={`font-bold ${stateClass(cell.state)}`}>{cell.state}</p>
                    <p className="mt-1 text-[10px] leading-4 text-navy-400">{cell.detail}</p>
                  </td>
                ))}
                <td className="p-3 font-semibold text-indigo-700 dark:text-indigo-300">{row.exactNext}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="mt-4 text-[10px] leading-5 text-navy-400">
          AGGREGATED_VIEW != NEW_AUTHORITY / MATRIX_EXACT_NEXT == LAUNCHER_ACTION / INPUT_READY != HUMAN_QA_PASS / HUMAN_QA_PASS != GUI_ACTUAL / Remotion Studio GUI Actual = NOT_RUN / Mac DaVinci GUI Actual = NOT_RUN
        </p>
      </div>
    </section>
  );
}
