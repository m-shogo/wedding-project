import {useEffect, useMemo, useState} from "react";
import {
  buildTypographyProjectDeliveryBatch,
  buildTypographyProjectDeliveryBatchJson,
} from "../data/typographyProjectDeliveryBatch";
import {
  listTypographyProductionRoleContexts,
  TYPOGRAPHY_PRODUCTION_ROLE_CONTEXT_CHANGED_EVENT,
} from "../data/typographyProductionRoleContextStore";
import {
  listTypographyProductionSelections,
  TYPOGRAPHY_PRODUCTION_SELECTION_CHANGED_EVENT,
} from "../data/typographyProductionSelectionStore";
import {
  loadMotionZukanComposerState,
  MOTION_ZUKAN_COMPOSER_CHANGED_EVENT,
  type SceneProjectId,
} from "../data/visualSceneComposer";
import {downloadText} from "../lib/exporters";

type AuditScene = {
  sceneId: string;
  sourceRevision: string;
  patternId: string | null;
  productionRole: string | null;
  text: string;
  mediaLabel: string;
  media: {state: string; path: string | null; sha256: string | null; kind: string | null; blocker: string | null};
  transitionAfter: {toSceneId: string; type: string; durationFrames: number; status: string} | null;
  readiness: "READY_FOR_REAL_MEDIA_PREVIEW" | "WAITING_HUMAN_INPUT" | "BLOCKED_BY_STALE_AUTHORITY";
  blockers: string[];
  humanInputs: string[];
  nextAction: string;
};

type ProductionReadinessAudit = {
  schemaVersion: "wedding-movie-production-readiness-audit/v1";
  authority: string;
  projectId: SceneProjectId;
  source: {batchSha256: string; mediaManifestSha256: string | null; audioManifestSha256: string | null; identitySha256: string};
  scenes: AuditScene[];
  audio: {state: string; path: string | null; sha256: string | null; blocker: string | null};
  summary: {
    totalScenes: number;
    readyForRealMediaPreview: number;
    waitingHumanInput: number;
    blockedByStaleAuthority: number;
    projectHumanInputs: string[];
    projectBlockers: string[];
    readyForContinuousRealMediaPreview: boolean;
    productionReady: false;
  };
  nextActions: {renderableSceneIds: string[]; waitingSceneIds: string[]; blockedSceneIds: string[]; renderSelectedScenes: string | null; renderContinuousPreview: string | null};
  evidenceBoundary: {remotionStudioGuiActual: "NOT_RUN"; palmierGuiActual: "NOT_RUN"; macDaVinciGuiActual: "NOT_RUN"; productionReady: false};
};

function auditIsShapeValid(value: unknown, projectId: SceneProjectId): value is ProductionReadinessAudit {
  if (!value || typeof value !== "object") return false;
  const audit = value as Partial<ProductionReadinessAudit>;
  return audit.schemaVersion === "wedding-movie-production-readiness-audit/v1"
    && audit.projectId === projectId
    && Array.isArray(audit.scenes)
    && audit.summary?.productionReady === false
    && audit.evidenceBoundary?.remotionStudioGuiActual === "NOT_RUN"
    && audit.evidenceBoundary?.palmierGuiActual === "NOT_RUN"
    && audit.evidenceBoundary?.macDaVinciGuiActual === "NOT_RUN";
}

const readinessLabel = {
  READY_FOR_REAL_MEDIA_PREVIEW: "REAL PREVIEW READY",
  WAITING_HUMAN_INPUT: "HUMAN待ち",
  BLOCKED_BY_STALE_AUTHORITY: "STALE / BLOCKED",
} as const;

export function WeddingMovieProductionReadinessOperatorCard({projectId}: {projectId: SceneProjectId}) {
  const [audit, setAudit] = useState<ProductionReadinessAudit | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [revision, setRevision] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);

  const current = useMemo(() => {
    const composer = loadMotionZukanComposerState();
    const timeline = composer.timelines.find((item) => item.projectId === projectId);
    if (!timeline) return null;
    const selections = listTypographyProductionSelections();
    const roles = listTypographyProductionRoleContexts();
    const batch = buildTypographyProjectDeliveryBatch(projectId, composer.scenes, timeline, selections, roles);
    return {batch, batchJson: buildTypographyProjectDeliveryBatchJson(projectId, composer.scenes, timeline, selections, roles)};
  }, [projectId, revision]);

  useEffect(() => {
    const refresh = () => setRevision((value) => value + 1);
    window.addEventListener(MOTION_ZUKAN_COMPOSER_CHANGED_EVENT, refresh);
    window.addEventListener(TYPOGRAPHY_PRODUCTION_SELECTION_CHANGED_EVENT, refresh);
    window.addEventListener(TYPOGRAPHY_PRODUCTION_ROLE_CONTEXT_CHANGED_EVENT, refresh);
    return () => {
      window.removeEventListener(MOTION_ZUKAN_COMPOSER_CHANGED_EVENT, refresh);
      window.removeEventListener(TYPOGRAPHY_PRODUCTION_SELECTION_CHANGED_EVENT, refresh);
      window.removeEventListener(TYPOGRAPHY_PRODUCTION_ROLE_CONTEXT_CHANGED_EVENT, refresh);
    };
  }, []);

  const currentness = useMemo(() => {
    if (!audit || !current) return {state: "NOT_RUN" as const, mismatches: [] as string[]};
    const mismatches: string[] = [];
    if (audit.scenes.length !== current.batch.scenes.length) mismatches.push(`SCENE_COUNT:${audit.scenes.length}->${current.batch.scenes.length}`);
    for (const scene of current.batch.scenes) {
      const carried = audit.scenes.find((item) => item.sceneId === scene.sceneId);
      if (!carried) { mismatches.push(`SCENE_MISSING:${scene.sceneId}`); continue; }
      if (carried.sourceRevision !== scene.sourceRevision) mismatches.push(`REVISION:${scene.sceneId}`);
      if (carried.patternId !== (scene.selectedPatternId ?? null)) mismatches.push(`PATTERN:${scene.sceneId}`);
      if (carried.productionRole !== (scene.productionRole ?? null)) mismatches.push(`ROLE:${scene.sceneId}`);
      if (scene.status !== "CURRENT_PACKAGE_READY") mismatches.push(`ROUTE_NOT_CURRENT:${scene.sceneId}`);
      if (scene.roleContextStatus !== "CURRENT_ROLE_CONTEXT") mismatches.push(`ROLE_NOT_CURRENT:${scene.sceneId}`);
    }
    if (current.batch.summary.staleTransitions > 0) mismatches.push("TRANSITION_AUTHORITY_STALE");
    return {state: mismatches.length === 0 ? "CURRENT" as const : "STALE" as const, mismatches};
  }, [audit, current]);

  const continuousPreviewAllowed = audit?.summary.readyForContinuousRealMediaPreview === true && currentness.state === "CURRENT";
  const auditCommand = `node --no-warnings motion-studio/scripts/wedding-movie-production-readiness-audit.mts --batch="$HOME/Downloads/${projectId}-typography-production-batch.json" --media-manifest="$HOME/Downloads/${projectId}-production-media-input.json" --audio-manifest="$HOME/Downloads/${projectId}-production-audio-input.json" --output="$HOME/Downloads/${projectId}-production-readiness-audit.json"`;

  async function copy(value: string, key: string) {
    await navigator.clipboard.writeText(value);
    setCopied(key);
    window.setTimeout(() => setCopied(null), 1200);
  }

  async function loadFile(file: File | null) {
    if (!file) return;
    setLoadError(null);
    try {
      const value = JSON.parse(await file.text());
      if (!auditIsShapeValid(value, projectId)) throw new Error("schema / project / evidence boundary mismatch");
      setAudit(value);
    } catch (error) {
      setAudit(null);
      setLoadError(error instanceof Error ? error.message : "invalid audit JSON");
    }
  }

  return (
    <section className="mt-3 border-2 border-teal-300 dark:border-teal-800 p-3" data-production-readiness-operator={projectId} data-currentness={currentness.state}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-[8px] tracking-[0.14em] font-semibold text-teal-700 dark:text-teal-300">PRODUCTION READINESS GAP AUDIT / {projectId.toUpperCase()}</p>
          <p className="mt-1 text-[11px] font-semibold text-navy-800 dark:text-sand-100">
            {audit ? `${audit.summary.readyForRealMediaPreview}/${audit.summary.totalScenes} real-preview ready` : "Audit JSONを読み込んで実制作Gapを確認"}
          </p>
          <p className="mt-1 text-[8px] text-navy-500 dark:text-navy-300">Transport currentness={currentness.state} / productionReady=NO</p>
        </div>
        <label className="cursor-pointer border border-teal-300 dark:border-teal-800 px-2.5 py-1.5 text-[8px] font-semibold text-teal-700 dark:text-teal-300">
          Audit JSON読込
          <input className="hidden" type="file" accept="application/json,.json" onChange={(event) => void loadFile(event.target.files?.[0] ?? null)} />
        </label>
      </div>

      <div className="mt-2 border border-teal-200 dark:border-teal-900 p-2 text-[7px] leading-4">
        <div className="flex flex-wrap items-center justify-between gap-2"><span className="font-semibold">1. Current batchを書き出す → 2. real media/BGM manifestを用意 → 3. audit</span><button type="button" onClick={() => current && downloadText(current.batchJson, `${projectId}-typography-production-batch.json`)} disabled={!current} className="border px-2 py-1 disabled:opacity-40">Batch JSON</button></div>
        <code className="mt-1 block max-w-full overflow-x-auto whitespace-nowrap">{auditCommand}</code>
        <button type="button" onClick={() => void copy(auditCommand, "audit")} className="mt-1 border px-2 py-1">{copied === "audit" ? "COPIED ✓" : "audit commandをコピー"}</button>
      </div>

      {loadError ? <p className="mt-2 border border-rose-300 p-2 text-[8px] text-rose-700">AUDIT_INVALID: {loadError}</p> : null}
      {currentness.state === "STALE" ? <p className="mt-2 border border-amber-300 p-2 text-[8px] text-amber-800 dark:text-amber-200">Auditは現在のScene authorityと不一致です: {currentness.mismatches.join(" / ")}</p> : null}

      {audit ? (
        <>
          <div className="mt-2 grid grid-cols-2 gap-1 sm:grid-cols-4 text-[8px]">
            <div className="border p-2">READY {audit.summary.readyForRealMediaPreview}</div><div className="border p-2">HUMAN待ち {audit.summary.waitingHumanInput}</div><div className="border p-2">STALE/BLOCKED {audit.summary.blockedByStaleAuthority}</div><div className="border p-2">BGM {audit.audio.state}</div>
          </div>
          <div className="mt-2 space-y-1">
            {audit.scenes.map((scene) => (
              <div key={scene.sceneId} className="border border-sand-200 dark:border-navy-700 p-2 text-[7px] leading-4" data-production-readiness-scene={scene.sceneId} data-readiness={scene.readiness}>
                <div className="flex flex-wrap items-center justify-between gap-2"><span className="font-semibold">{scene.sceneId} / {scene.patternId ?? "NO_PATTERN"} / {scene.productionRole ?? "NO_ROLE"}</span><span className="font-mono">{readinessLabel[scene.readiness]}</span></div>
                <p>{scene.text || "COPY EMPTY"} / media={scene.media.kind ?? "N/A"} {scene.media.state}</p>
                {scene.humanInputs.length ? <p className="text-amber-700 dark:text-amber-300">Human: {scene.humanInputs.join(" / ")}</p> : null}
                {scene.blockers.length ? <p className="text-rose-700 dark:text-rose-300">Blocker: {scene.blockers.join(" / ")}</p> : null}
                {scene.transitionAfter ? <p className="opacity-70">→ {scene.transitionAfter.toSceneId}: {scene.transitionAfter.type} {scene.transitionAfter.durationFrames}f / {scene.transitionAfter.status}</p> : null}
              </div>
            ))}
          </div>
          <div className="mt-2 border-t border-teal-200 dark:border-teal-900 pt-2 text-[7px] leading-4">
            <p>Renderable: {audit.nextActions.renderableSceneIds.join(" / ") || "NONE"}</p><p>Human待ち: {audit.nextActions.waitingSceneIds.join(" / ") || "NONE"}</p><p>Stale/blocked: {audit.nextActions.blockedSceneIds.join(" / ") || "NONE"}</p>
            {audit.nextActions.renderSelectedScenes ? <button type="button" onClick={() => void copy(audit.nextActions.renderSelectedScenes!, "scenes")} className="mt-1 mr-1 border px-2 py-1">{copied === "scenes" ? "COPIED ✓" : "READY Scene render command"}</button> : null}
            {audit.nextActions.renderContinuousPreview ? <button type="button" disabled={!continuousPreviewAllowed} onClick={() => void copy(audit.nextActions.renderContinuousPreview!, "reel")} className="mt-1 border px-2 py-1 disabled:cursor-not-allowed disabled:opacity-40">{copied === "reel" ? "COPIED ✓" : continuousPreviewAllowed ? "Continuous real preview command" : "CURRENT auditが必要"}</button> : null}
          </div>
        </>
      ) : null}

      <p className="mt-2 border-l-2 border-amber-300 pl-2 text-[7px] leading-3 text-amber-800 dark:text-amber-200">Audit CURRENT / media SHA一致 ≠ visual QA PASS ≠ Remotion Studio GUI Actual PASS ≠ Palmier GUI Actual PASS ≠ Mac DaVinci GUI Actual PASS。Human/GUI evidenceは自動昇格しません。</p>
    </section>
  );
}
