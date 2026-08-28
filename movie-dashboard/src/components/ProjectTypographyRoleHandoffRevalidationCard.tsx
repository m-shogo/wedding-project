import {useEffect, useMemo, useState} from "react";
import {
  loadMotionZukanProductionWorkspaceState,
  MOTION_ZUKAN_PRODUCTION_WORKSPACE_CHANGED_EVENT,
} from "../data/motionZukanProductionWorkspace";
import {parseAndValidateProjectTypographyRoleHandoffManifest} from "../data/projectTypographyRoleHandoffManifest";
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

export function ProjectTypographyRoleHandoffRevalidationCard({projectId}: {projectId: SceneProjectId}) {
  const [revision, setRevision] = useState(0);
  const [state, setState] = useState<"NOT_RUN" | "PASS" | "FAIL">("NOT_RUN");
  const [detail, setDetail] = useState<string | null>(null);
  const current = useMemo(() => ({
    composer: loadMotionZukanComposerState(),
    workspace: loadMotionZukanProductionWorkspaceState(),
    selections: listTypographyProductionSelections(),
    roleContexts: listTypographyProductionRoleContexts(),
  }), [projectId, revision]);

  useEffect(() => {
    const refresh = () => {
      setRevision((value) => value + 1);
      setState("NOT_RUN");
      setDetail(null);
    };
    window.addEventListener(MOTION_ZUKAN_COMPOSER_CHANGED_EVENT, refresh);
    window.addEventListener(MOTION_ZUKAN_PRODUCTION_WORKSPACE_CHANGED_EVENT, refresh);
    window.addEventListener(TYPOGRAPHY_PRODUCTION_SELECTION_CHANGED_EVENT, refresh);
    window.addEventListener(TYPOGRAPHY_PRODUCTION_ROLE_CONTEXT_CHANGED_EVENT, refresh);
    return () => {
      window.removeEventListener(MOTION_ZUKAN_COMPOSER_CHANGED_EVENT, refresh);
      window.removeEventListener(MOTION_ZUKAN_PRODUCTION_WORKSPACE_CHANGED_EVENT, refresh);
      window.removeEventListener(TYPOGRAPHY_PRODUCTION_SELECTION_CHANGED_EVENT, refresh);
      window.removeEventListener(TYPOGRAPHY_PRODUCTION_ROLE_CONTEXT_CHANGED_EVENT, refresh);
    };
  }, []);

  async function validate(file: File | undefined) {
    if (!file) return;
    try {
      parseAndValidateProjectTypographyRoleHandoffManifest(
        await file.text(),
        projectId,
        current.composer,
        current.workspace,
        current.selections,
        current.roleContexts,
      );
      setState("PASS");
      setDetail("CURRENT project / Scene revisions / routes / roles / workspace gates と完全一致");
    } catch (error) {
      setState("FAIL");
      setDetail(error instanceof Error ? error.message : String(error));
    }
  }

  return (
    <section className="mt-3 border border-violet-200 dark:border-violet-800 p-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-[9px] tracking-[0.16em] font-semibold text-violet-700 dark:text-violet-300">PROJECT ROLE HANDOFF / REVALIDATION</p>
          <p className="mt-1 text-[8px] leading-4 text-navy-400">DaVinciへ渡す前にexport済みmanifestを現在のOpening/Profile stateへ再照合します。Scene・route・role・workspaceのどれかが変わった古いfileはFAILします。</p>
        </div>
        <label className="cursor-pointer border border-violet-300 dark:border-violet-700 px-2.5 py-1.5 text-[9px] font-semibold text-violet-700 dark:text-violet-300">
          実制作handoff再検証
          <input type="file" accept="application/json,.json" className="sr-only" onChange={(event) => void validate(event.currentTarget.files?.[0])} />
        </label>
      </div>
      <p className={`mt-2 border p-2 text-[8px] font-mono ${state === "PASS" ? "border-emerald-300 text-emerald-700 dark:border-emerald-800 dark:text-emerald-300" : state === "FAIL" ? "border-red-300 text-red-700 dark:border-red-800 dark:text-red-300" : "border-sand-200 text-navy-400 dark:border-navy-700"}`}>
        Revalidation: {state}{detail ? ` / ${detail}` : " / file未選択"}
      </p>
      <p className="mt-2 text-[8px] leading-4 text-amber-700 dark:text-amber-300">PASSはhandoff fileのfreshness確認のみです。Studio GUI Actual / DaVinci GUI Actualは実行していないためNOT_RUNのまま、productionReadyもNOのままです。</p>
    </section>
  );
}
