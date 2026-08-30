import { useEffect, useMemo, useState } from "react";
import {
  getWeddingProductionMotionUsage,
  type WeddingMovieProject,
  type WeddingProductionMotionUsageRecord,
} from "../data/weddingProductionMotionUsage";
import {
  assignedProjectsForPattern,
  assignmentForPatternProject,
  loadWeddingProjectMotionAssignments,
  saveWeddingProjectMotionAssignments,
  setWeddingProjectMotionAssignment,
  setWeddingProjectMotionSceneAssignment,
} from "../data/weddingProjectMotionAssignments";
import {
  loadMotionZukanComposerState,
  MOTION_ZUKAN_COMPOSER_CHANGED_EVENT,
  type MotionZukanComposerState,
  type SceneProjectId,
} from "../data/visualSceneComposer";

function stageClass(stage: WeddingProductionMotionUsageRecord["usageStage"]) {
  return stage === "FINAL"
    ? "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-200"
    : "border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200";
}

function projectFit(record: WeddingProductionMotionUsageRecord, project: WeddingMovieProject) {
  return project === "OPENING" ? record.openingFit : record.profileFit;
}

function projectSections(record: WeddingProductionMotionUsageRecord, project: WeddingMovieProject) {
  return project === "OPENING" ? record.openingSections : record.profileSections;
}

function sceneProjectId(project: WeddingMovieProject): SceneProjectId {
  return project === "OPENING" ? "opening" : "profile";
}

function sceneLabel(scene: MotionZukanComposerState["scenes"][number], index: number) {
  const text = scene.editableIntent.fields.text.defaultValue.trim();
  return `${index + 1}. ${text || scene.recipeProvenance.label}`;
}

export function WeddingProductionMotionUsagePanel() {
  const summary = useMemo(() => getWeddingProductionMotionUsage(), []);
  const [project, setProject] = useState<WeddingMovieProject>("OPENING");
  const [assignments, setAssignments] = useState(() => loadWeddingProjectMotionAssignments());
  const [composer, setComposer] = useState<MotionZukanComposerState>(() => loadMotionZukanComposerState());
  const visible = project === "OPENING" ? summary.openingCompatible : summary.profileCompatible;
  const currentProjectId = sceneProjectId(project);
  const assignedCount = assignments.assignments.filter((item) => item.projectId === currentProjectId).length;

  useEffect(() => {
    function onComposerChanged(event: Event) {
      const next = (event as CustomEvent<MotionZukanComposerState>).detail;
      if (next?.schemaVersion === "motion-zukan-composer-state/v1") setComposer(next);
    }
    window.addEventListener(MOTION_ZUKAN_COMPOSER_CHANGED_EVENT, onComposerChanged);
    return () => window.removeEventListener(MOTION_ZUKAN_COMPOSER_CHANGED_EVENT, onComposerChanged);
  }, []);

  const projectSceneIds = composer.timelines.find((item) => item.projectId === currentProjectId)?.sceneIds ?? [];
  const projectScenes = projectSceneIds
    .map((sceneId) => composer.scenes.find((scene) => scene.sceneId === sceneId && scene.projectId === currentProjectId))
    .filter((scene): scene is MotionZukanComposerState["scenes"][number] => Boolean(scene));

  function toggleAssignment(patternId: string) {
    const projects = assignedProjectsForPattern(assignments, patternId);
    const next = setWeddingProjectMotionAssignment(assignments, patternId, currentProjectId, !projects.includes(currentProjectId));
    saveWeddingProjectMotionAssignments(next);
    setAssignments(next);
  }

  function assignScene(patternId: string, sceneId: string | null) {
    const next = setWeddingProjectMotionSceneAssignment(assignments, patternId, currentProjectId, sceneId);
    saveWeddingProjectMotionAssignments(next);
    setAssignments(next);
  }

  return (
    <section className="mb-8 border border-sand-300 bg-white p-5 dark:border-navy-600 dark:bg-navy-800" aria-label="Wedding productionで実使用中のMotion">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.2em] text-navy-400">MOTION ZUKAN → SCENE COMPOSER → PRODUCTION</p>
          <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">採用MotionをOpening/Profileの実Sceneへ割り当てる</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-navy-600 dark:text-navy-300">
            正本の <code className="font-mono">usageStage=ROUGH/FINAL</code> だけを対象にする。project assignmentとScene assignmentは適合度から推測せず、Human Masterが明示した記録だけを保存する。
          </p>
        </div>
        <div className="grid min-w-[320px] grid-cols-4 gap-2 text-center text-xs">
          <div className="border border-sand-200 p-2 dark:border-navy-600"><p className="text-lg font-bold">{summary.used.length}</p><p>USED</p></div>
          <div className="border border-amber-200 p-2 dark:border-amber-900"><p className="text-lg font-bold">{summary.rough.length}</p><p>ROUGH</p></div>
          <div className="border border-emerald-200 p-2 dark:border-emerald-900"><p className="text-lg font-bold">{summary.final.length}</p><p>FINAL</p></div>
          <div className="border border-sky-200 p-2 dark:border-sky-900"><p className="text-lg font-bold">{assignedCount}</p><p>{project} ASSIGNED</p></div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2" aria-label="project filter">
        {(["OPENING", "PROFILE"] as const).map((value) => (
          <button
            key={value}
            type="button"
            aria-pressed={project === value}
            onClick={() => setProject(value)}
            className={`border px-3 py-2 text-xs font-semibold ${project === value ? "border-navy-900 bg-navy-900 text-white dark:border-sand-100 dark:bg-sand-100 dark:text-navy-900" : "border-sand-300 text-navy-600 dark:border-navy-600 dark:text-navy-300"}`}
          >
            {value} compatible {value === "OPENING" ? summary.openingCompatible.length : summary.profileCompatible.length}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="mt-5 border border-dashed border-sand-300 p-4 text-sm text-navy-500 dark:border-navy-600 dark:text-navy-300">
          {project}に適合するROUGH/FINAL Motionはまだ記録されていません。図鑑の存在やTESTED状態だけではproduction採用扱いにしません。
        </div>
      ) : (
        <div className="mt-5 grid gap-3 lg:grid-cols-2">
          {visible.map((record) => {
            const assigned = assignedProjectsForPattern(assignments, record.patternId).includes(currentProjectId);
            const assignment = assignmentForPatternProject(assignments, record.patternId, currentProjectId);
            const assignedSceneExists = !assignment?.sceneId || projectScenes.some((scene) => scene.sceneId === assignment.sceneId);
            return (
              <article key={record.patternId} className="border border-sand-200 p-4 dark:border-navy-600">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`border px-2 py-1 text-[10px] font-bold ${stageClass(record.usageStage)}`}>{record.usageStage}</span>
                  <span className="border border-sand-300 px-2 py-1 text-[10px] text-navy-500 dark:border-navy-600 dark:text-navy-300">{project} FIT {projectFit(record, project)}</span>
                  <span className={`border px-2 py-1 text-[10px] ${assigned ? "border-sky-400 bg-sky-50 text-sky-800 dark:border-sky-700 dark:bg-sky-950/30 dark:text-sky-200" : "border-sand-300 text-navy-500 dark:border-navy-600 dark:text-navy-300"}`}>
                    {assigned ? `${project} / HUMAN ASSIGNED` : "PROJECT UNASSIGNED"}
                  </span>
                  {assignment?.sceneId && (
                    <span className={`border px-2 py-1 text-[10px] ${assignedSceneExists ? "border-violet-300 text-violet-700 dark:border-violet-800 dark:text-violet-300" : "border-red-300 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300"}`}>
                      {assignedSceneExists ? "SCENE ASSIGNED" : "STALE SCENE REF"}
                    </span>
                  )}
                </div>
                <h3 className="mt-3 font-bold text-navy-900 dark:text-sand-100">{record.japaneseName}</h3>
                <p className="mt-1 text-xs font-mono text-navy-400">{record.commonName} · {record.patternId}</p>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-xs text-navy-600 dark:text-navy-300">
                  <div><dt className="font-semibold">Implementation</dt><dd>{record.implementationStatus}{record.verifiedImplementation ? " / VERIFIED" : ""}</dd></div>
                  <div><dt className="font-semibold">Preview</dt><dd>{record.previewStatus}{record.verifiedPreview ? " / VERIFIED" : ""}</dd></div>
                  <div className="col-span-2"><dt className="font-semibold">{project} sections</dt><dd>{projectSections(record, project).length ? projectSections(record, project).join(" / ") : "—"}</dd></div>
                </dl>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
                  <button
                    type="button"
                    onClick={() => toggleAssignment(record.patternId)}
                    className={`border px-3 py-2 text-xs font-semibold ${assigned ? "border-red-300 text-red-700 dark:border-red-900 dark:text-red-300" : "border-sky-500 text-sky-700 dark:text-sky-300"}`}
                  >
                    {assigned ? `${project}割当を解除` : `${project}へHuman割当`}
                  </button>
                  {assigned && (
                    <label className="min-w-0 flex-1 text-xs font-semibold text-navy-600 dark:text-navy-300">
                      Scene Composer Scene
                      <select
                        value={assignment?.sceneId ?? ""}
                        onChange={(event) => assignScene(record.patternId, event.target.value || null)}
                        className="mt-1 w-full border border-sand-300 bg-white px-2 py-2 text-xs text-navy-900 dark:border-navy-600 dark:bg-navy-900 dark:text-sand-100"
                      >
                        <option value="">Scene未割当</option>
                        {!assignedSceneExists && assignment?.sceneId && <option value={assignment.sceneId}>削除済みScene: {assignment.sceneId}</option>}
                        {projectScenes.map((scene, index) => <option key={scene.sceneId} value={scene.sceneId}>{sceneLabel(scene, index)}</option>)}
                      </select>
                    </label>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      <p className="mt-4 border-l-2 border-amber-400 pl-3 text-[11px] leading-5 text-navy-500 dark:text-navy-300">
        Authority boundary: usageStageはWedding全体のROUGH/FINAL採用、project/Scene assignmentはHuman Masterの明示操作だけを正本にする。Scene削除時は自動再割当せずSTALEとして見せる。割当操作はMotion実装検証・Human QA・Remotion Studio GUI Actual・Mac DaVinci GUI Actualを昇格させない。
      </p>
    </section>
  );
}
