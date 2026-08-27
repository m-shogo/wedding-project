import { useMemo, useState } from "react";
import { buildMaskRevealHandoffFidelityReport } from "../data/maskRevealHandoffFidelity";
import {
  buildMaskRevealSceneProductionBundle,
  buildMaskRevealSceneProductionBundleJson,
} from "../data/maskRevealSceneProductionBundle";
import { resolveCodexAutomationGuardrail } from "../data/resolveAutomationAvailability";
import { getResolveHandoffEditability } from "../data/resolveHandoffEditability";
import { getResolveHumanAdjustability } from "../data/resolveHumanAdjustability";
import type { MaskRevealSceneInstance } from "../data/visualSceneComposer";
import { downloadText } from "../lib/exporters";
import { ProfileProductionStatusHandoffCard } from "./ProfileProductionStatusHandoffCard";
import { TypographyDaVinciProductionReleaseGateForScene } from "./TypographyDaVinciProductionReleaseGateForScene";
import { TypographyProductionRouteSelector } from "./TypographyProductionRouteSelector";
import { TypographyProductionRoutingMatrix } from "./TypographyProductionRoutingMatrix";
import { TypographyProjectDeliveryBatchCard } from "./TypographyProjectDeliveryBatchCard";
import { TypographySceneDeliveryPackageCard } from "./TypographySceneDeliveryPackageCard";

const TRANSPORT_LABEL_JA: Record<string, string> = {
  EXACT: "そのまま転送",
  APPROX: "転送されるが要確認",
  REBUILD_VALUES: "値から再構築",
  REBUILD_ASSET: "素材を再import",
  REBUILD_INTENT: "意図だけ再現",
  BAKE_OPTION: "焼き込みで代替",
  LOST: "転送されない",
};

export function MaskRevealSceneHandoffCard({ scene }: { scene: MaskRevealSceneInstance }) {
  const [copied, setCopied] = useState(false);
  const bundle = useMemo(() => buildMaskRevealSceneProductionBundle(scene), [scene]);
  const json = useMemo(() => buildMaskRevealSceneProductionBundleJson(scene), [scene]);
  const fidelity = useMemo(() => buildMaskRevealHandoffFidelityReport(), []);
  const resolveEditionGuardrail = useMemo(() => resolveCodexAutomationGuardrail("UNKNOWN"), []);

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

      <TypographyProductionRouteSelector scene={scene} />
      <TypographySceneDeliveryPackageCard scene={scene} />
      <TypographyProjectDeliveryBatchCard projectId={scene.projectId} />
      {scene.projectId === "profile" ? <ProfileProductionStatusHandoffCard /> : null}
      <TypographyDaVinciProductionReleaseGateForScene scene={scene} />
      <TypographyProductionRoutingMatrix />

      <details className="mt-2">
        <summary className="cursor-pointer text-[10px] text-sky-700 dark:text-sky-300">Export詳細を見る</summary>
        <pre className="mt-2 max-h-80 overflow-auto border border-sand-200 dark:border-navy-600 p-3 text-[10px] leading-5 whitespace-pre-wrap text-navy-500 dark:text-navy-300">{json}</pre>
      </details>

      <details className="mt-3">
        <summary className="cursor-pointer text-[10px] text-sky-700 dark:text-sky-300">
          Palmier → DaVinci Handoff Fidelity({fidelity.transportedCount}件転送 / {fidelity.rebuildCount}件要再構築)
        </summary>
        <p className="mt-2 text-[10px] leading-4 text-amber-700 dark:text-amber-300">
          {fidelity.allRuntimeVerified
            ? "全項目がRuntime Verified(実Resolve Canaryで確認済み)です。"
            : "この一覧はPalmierソースコード/Resolve公式資料に基づく研究段階の分類です(PENDING_RUNTIME)。実Resolveでの動作確認はまだ行っていません。"}
        </p>
        <p className="mt-2 border border-amber-200 dark:border-amber-800 p-2 text-[10px] leading-4 text-amber-800 dark:text-amber-200">
          Automation availability: {resolveEditionGuardrail}
        </p>
        <p className="mt-2 text-[9px] leading-4 text-navy-400">
          Editability(内部parameterをどこまで編集できるか)と Human Adjustability(人間がどれだけ簡単に直せるか)は別判定です。
        </p>
        <div className="mt-2 space-y-2">
          {fidelity.properties.map((property) => {
            const editability = getResolveHandoffEditability(property.id);
            const adjustability = getResolveHumanAdjustability(property.id);
            return (
              <div key={property.id} className="border border-sand-200 dark:border-navy-600 p-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[10px] font-semibold text-navy-800 dark:text-sand-100">{property.japaneseName}</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 border border-navy-300 dark:border-navy-600 text-navy-500 dark:text-navy-300">
                    {property.transportClass} / {TRANSPORT_LABEL_JA[property.transportClass]}
                  </span>
                </div>
                <p className="mt-1 text-[10px] leading-4 text-navy-500 dark:text-navy-300">{property.recoveryInstructionJa}</p>
                <p className="mt-1 text-[9px] leading-4 text-navy-400">
                  Native: {property.nativeRoute} / Automation: {property.automationClass} / Capability: {property.capabilityTrust} / Evidence: {property.evidenceState}
                </p>
                {editability ? (
                  <div className="mt-2 border-l-2 border-sky-300 dark:border-sky-700 pl-2">
                    <p className="text-[9px] font-mono text-sky-700 dark:text-sky-300">Editability: {editability.editabilityClass} / {editability.evidenceState}</p>
                    <p className="mt-1 text-[9px] leading-4 text-navy-400">{editability.instructionJa}</p>
                  </div>
                ) : null}
                {adjustability ? (
                  <div className="mt-2 border-l-2 border-violet-300 dark:border-violet-700 pl-2">
                    <p className="text-[9px] font-mono text-violet-700 dark:text-violet-300">
                      Human adjustability: {adjustability.adjustabilityClass} / Platform: {adjustability.platformScope} / {adjustability.evidenceState}
                    </p>
                    <p className="mt-1 text-[9px] leading-4 text-navy-400">{adjustability.humanInstructionJa}</p>
                    <p className="mt-1 text-[9px] leading-4 text-navy-400">Late edit QA: {adjustability.lateEditCheckJa}</p>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </details>
    </section>
  );
}
