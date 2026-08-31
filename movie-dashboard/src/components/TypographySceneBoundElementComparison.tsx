import {useMemo, useState} from "react";
import {resolveMaskRevealEditableIntent} from "../data/humanEditableMotionIntent";
import {
  loadTypographyProductionRoleContext,
  saveTypographyProductionRoleContext,
} from "../data/typographyProductionRoleContextStore";
import {
  loadTypographyProductionSelection,
  saveTypographyProductionSelection,
} from "../data/typographyProductionSelectionStore";
import {
  getTypographyProductionRoute,
  type TypographyProductionPatternId,
} from "../data/typographySceneProductionRouting";
import {getWeddingTypographyProductionRoleGuide} from "../data/weddingTypographyProductionRoleGuide.generated";
import type {MaskRevealSceneInstance} from "../data/visualSceneComposer";
import {getPatternPreview, motionPatterns} from "../data/visualMotionLibrary";

const FPS = 30;

function shellSingleQuote(value: string) {
  return `'${value.replaceAll("'", `'"'"'`)}'`;
}

function candidateRenderCommand(
  scene: MaskRevealSceneInstance,
  patternId: TypographyProductionPatternId,
  role: string,
) {
  const resolved = resolveMaskRevealEditableIntent(scene.editableIntent);
  const route = getTypographyProductionRoute(patternId);
  const frames = Math.max(1, Math.round(scene.computedDurationSeconds * FPS));
  const props = JSON.stringify({
    text: resolved.text,
    intensity: resolved.intensity,
    mode: route?.canonicalMode ?? "mask",
    label: `${scene.projectId.toUpperCase()} / ${role} / ${patternId}`,
  });
  const output = `out/qa/scene-bound-remotion/${scene.projectId}/${scene.sceneId}/${role}/${patternId}.mp4`;
  return `pnpm --dir motion-studio exec remotion render src/index-start-motion-kit.ts WeddingSceneTypographyCandidateV1 ${output} --props=${shellSingleQuote(props)} --frames=0-${frames - 1} --scale=0.5 --crf=24`;
}

export function TypographySceneBoundElementComparison({scene}: {scene: MaskRevealSceneInstance}) {
  const [revision, setRevision] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);
  const resolved = useMemo(() => resolveMaskRevealEditableIntent(scene.editableIntent), [scene]);
  const roles = useMemo(() => getWeddingTypographyProductionRoleGuide(scene.projectId), [scene.projectId]);
  const selection = useMemo(() => loadTypographyProductionSelection(scene), [scene.sceneId, scene.updatedAt, revision]);
  const roleContext = useMemo(
    () => (selection ? loadTypographyProductionRoleContext(scene, selection) : null),
    [scene.sceneId, scene.updatedAt, selection, revision],
  );

  function choose(role: (typeof roles)[number]["role"], patternId: TypographyProductionPatternId) {
    const selected = saveTypographyProductionSelection(scene, patternId);
    saveTypographyProductionRoleContext(scene, selected, role);
    setRevision((value) => value + 1);
  }

  async function copyCommand(key: string, command: string) {
    await navigator.clipboard.writeText(command);
    setCopied(key);
    window.setTimeout(() => setCopied((current) => current === key ? null : current), 1400);
  }

  return (
    <section className="mt-3 border-2 border-fuchsia-300 dark:border-fuchsia-800 p-3" data-scene-bound-remotion-comparison={scene.sceneId}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-[8px] font-semibold tracking-[0.14em] text-fuchsia-700 dark:text-fuchsia-300">SCENE-BOUND REMOTION ELEMENT A/B/C</p>
          <p className="mt-1 text-[10px] font-semibold text-navy-800 dark:text-sand-100">{resolved.text || "(empty text)"}</p>
          <p className="mt-1 text-[8px] leading-4 text-navy-500 dark:text-navy-300">同じScene revision・文字・{scene.computedDurationSeconds.toFixed(2)}秒・intensity {resolved.intensity}でPRIMARY + FALLBACKを比較します。REFERENCE previewは既存sample、下のcommandはこのScene入力をRemotionで実renderします。</p>
        </div>
        <div className="text-right font-mono text-[7px] text-navy-400">
          <p>{scene.sceneId}</p>
          <p>revision {scene.updatedAt}</p>
          <p>{scene.editableIntent.section} / {Math.max(1, Math.round(scene.computedDurationSeconds * FPS))}f @ {FPS}fps</p>
        </div>
      </div>

      <div className="mt-3 space-y-3">
        {roles.map((role) => {
          const ids = [role.primaryPatternId, ...role.fallbackPatternIds] as TypographyProductionPatternId[];
          const batchCommand = ids.map((patternId) => candidateRenderCommand(scene, patternId, role.role)).join(" && ");
          const batchKey = `batch:${role.role}`;
          return (
            <div key={role.role} className="border border-fuchsia-100 dark:border-fuchsia-900 p-2.5" data-scene-bound-role={role.role}>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="text-[9px] font-semibold text-fuchsia-700 dark:text-fuchsia-300">{role.role}</p>
                  <p className="mt-1 text-[7px] leading-3 text-navy-400">{role.reason}</p>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="font-mono text-[7px] text-navy-400">A PRIMARY / B-C FALLBACK</span>
                  <button type="button" onClick={() => void copyCommand(batchKey, batchCommand)} className="border border-fuchsia-300 dark:border-fuchsia-800 px-2 py-1 text-[7px] font-semibold text-fuchsia-700 dark:text-fuchsia-300">{copied === batchKey ? "A/B/C BATCH COPIED ✓" : "A/B/Cを同条件で一括render"}</button>
                </div>
              </div>
              <div className="mt-2 grid gap-2 lg:grid-cols-3">
                {ids.map((patternId, index) => {
                  const pattern = motionPatterns.find((item) => item.id === patternId);
                  const preview = pattern ? getPatternPreview(pattern) : undefined;
                  const command = candidateRenderCommand(scene, patternId, role.role);
                  const key = `${role.role}:${patternId}`;
                  const selected = selection?.patternId === patternId && roleContext?.productionRole === role.role;
                  return (
                    <article key={key} className={`overflow-hidden border ${selected ? "border-emerald-400 dark:border-emerald-700" : index === 0 ? "border-fuchsia-300 dark:border-fuchsia-800" : "border-sand-200 dark:border-navy-600"}`} data-scene-bound-candidate={key}>
                      <div className="aspect-video bg-navy-950/5 dark:bg-black/20">
                        {preview?.assetPath ? <video className="h-full w-full object-cover" src={preview.assetPath} poster={preview.posterPath ?? undefined} controls muted loop playsInline preload="metadata" /> : preview?.posterPath ? <img className="h-full w-full object-cover" src={preview.posterPath} alt={`${patternId} reference`} loading="lazy" /> : <div className="flex h-full items-center justify-center px-3 text-center text-[8px] text-navy-400">REFERENCE preview MISSING</div>}
                      </div>
                      <div className="p-2">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-[9px] font-semibold text-navy-800 dark:text-sand-100">{String.fromCharCode(65 + index)} / {index === 0 ? "PRIMARY" : `FALLBACK ${index}`}</p>
                            <p className="mt-0.5 font-mono text-[7px] text-navy-400">{patternId}</p>
                          </div>
                          <span className="font-mono text-[7px] text-navy-400">{getTypographyProductionRoute(patternId)?.canonicalMode ?? "?"}</span>
                        </div>
                        <p className="mt-2 text-[7px] leading-3 text-navy-400">REFERENCE preview {preview?.status ?? "MISSING"} / Scene-bound renderはactual text + actual durationをprops/frame rangeへ固定。</p>
                        <div className="mt-2 grid gap-1">
                          <button type="button" onClick={() => void copyCommand(key, command)} className="border border-sky-300 dark:border-sky-800 px-2 py-1.5 text-[7px] font-semibold text-sky-700 dark:text-sky-300">{copied === key ? "RENDER COMMAND COPIED ✓" : "Scene-bound render command"}</button>
                          <button type="button" onClick={() => choose(role.role, patternId)} className={`border px-2 py-1.5 text-[7px] font-semibold ${selected ? "border-emerald-400 text-emerald-700 dark:border-emerald-700 dark:text-emerald-300" : "border-fuchsia-300 text-fuchsia-700 dark:border-fuchsia-800 dark:text-fuchsia-300"}`}>{selected ? "HUMAN SELECTED + ROLE BOUND ✓" : "このSceneにHuman採用"}</button>
                        </div>
                        <details className="mt-2">
                          <summary className="cursor-pointer text-[7px] text-navy-400">exact render command</summary>
                          <code className="mt-1 block break-all text-[6px] leading-3 text-navy-400">{command}</code>
                        </details>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-3 border-l-2 border-amber-300 pl-2 text-[7px] leading-3 text-amber-800 dark:text-amber-200">AUTO SELECT = OFF。Human採用は既存のcurrent Scene revisionへroute + Role contextをbindingし、Palmier instruction packetへ反映されます。render command生成・REFERENCE preview・Human選択のいずれもRemotion Studio GUI Actual / Palmier GUI Actual / Mac DaVinci GUI Actual / productionReadyを自動昇格しません。</p>
    </section>
  );
}
