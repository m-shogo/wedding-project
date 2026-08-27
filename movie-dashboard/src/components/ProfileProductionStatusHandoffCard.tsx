import {useMemo} from "react";
import {
  buildProfileProductionStatusHandoff,
  buildProfileProductionStatusHandoffJson,
} from "../data/profileProductionStatusHandoff";
import type {SceneProjectId} from "../data/visualSceneComposer";
import {downloadText} from "../lib/exporters";
import {OpeningProductionStatusHandoffCard} from "./OpeningProductionStatusHandoffCard";

const stageLabel: Record<string, string> = {
  assembly: "Assembly",
  finalRender: "Final render",
  finalRenderReview: "Human render QA",
  productionBundle: "Production bundle",
  davinciFinishing: "DaVinci Actual",
  finalDeliveryApproval: "Final approval",
};

const incompleteStageStates = new Set(["NOT_RUN", "BLOCKED", "MISSING", "STALE"]);

export function ProfileProductionStatusHandoffCard({projectId}: {projectId: SceneProjectId}) {
  const status = useMemo(() => buildProfileProductionStatusHandoff(), []);
  const json = useMemo(() => buildProfileProductionStatusHandoffJson(), []);

  if (projectId === "opening") return <OpeningProductionStatusHandoffCard projectId={projectId} />;
  if (projectId !== "profile") return null;

  const production = status.profile.production;
  const productionReady = production.readiness.productionReady;

  return (
    <section className="mt-3 border border-fuchsia-300 dark:border-fuchsia-800 p-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-[9px] tracking-[0.16em] font-semibold text-fuchsia-700 dark:text-fuchsia-300">
            PROFILE V1 / FINAL PRODUCTION STATUS
          </p>
          <p className="mt-1 text-[10px] font-semibold text-navy-800 dark:text-sand-100">
            {production.overallState}
          </p>
          <p className="mt-1 text-[8px] text-navy-400">
            productionReady={productionReady ? "YES" : "NO"} / Mac DaVinci={production.readiness.macDaVinciActual}
          </p>
        </div>
        <button
          type="button"
          onClick={() => downloadText(json, "profile-production-status-handoff.json")}
          className="border border-fuchsia-300 dark:border-fuchsia-700 px-2.5 py-1.5 text-[9px] font-semibold text-fuchsia-700 dark:text-fuchsia-300"
        >
          Profile production statusを書き出す
        </button>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-1 sm:grid-cols-3">
        {Object.entries(production.stages).map(([key, stage]) => {
          const state = String(stage.state);
          const complete = !incompleteStageStates.has(state);
          return (
            <div
              key={key}
              className={`border px-2 py-1.5 text-[8px] ${complete ? "border-emerald-200 text-emerald-700 dark:border-emerald-800 dark:text-emerald-300" : "border-amber-200 text-amber-700 dark:border-amber-800 dark:text-amber-300"}`}
            >
              <span className="font-semibold">{stageLabel[key] ?? key}</span>: {state}
            </div>
          );
        })}
      </div>

      <p className="mt-2 text-[8px] leading-4 text-navy-400">
        このstatusはBLOCKED / NOT_RUNも含めて現在状態を外へ渡すためのenvelopeです。Assembly manifestの可否とは別なので、未完成でも書き出せます。
        `ASSEMBLY_READY != PRODUCTION_READY` / `MAC_DAVINCI_ACTUAL_VERIFIED != FINAL_DELIVERY_APPROVED`
      </p>

      <details className="mt-2">
        <summary className="cursor-pointer text-[8px] text-fuchsia-700 dark:text-fuchsia-300">Profile production status JSON</summary>
        <pre className="mt-2 max-h-72 overflow-auto whitespace-pre-wrap border border-sand-200 dark:border-navy-600 p-2 text-[8px] leading-4 text-navy-500 dark:text-navy-300">{json}</pre>
      </details>
    </section>
  );
}
