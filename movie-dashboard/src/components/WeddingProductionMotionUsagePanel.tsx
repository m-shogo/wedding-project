import { useMemo, useState } from "react";
import {
  getWeddingProductionMotionUsage,
  type WeddingMovieProject,
  type WeddingProductionMotionUsageRecord,
} from "../data/weddingProductionMotionUsage";

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

export function WeddingProductionMotionUsagePanel() {
  const summary = useMemo(() => getWeddingProductionMotionUsage(), []);
  const [project, setProject] = useState<WeddingMovieProject>("OPENING");
  const visible = project === "OPENING" ? summary.openingCompatible : summary.profileCompatible;

  return (
    <section className="mb-8 border border-sand-300 bg-white p-5 dark:border-navy-600 dark:bg-navy-800" aria-label="Wedding productionで実使用中のMotion">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.2em] text-navy-400">MOTION ZUKAN → PRODUCTION USAGE</p>
          <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">Weddingで実際に採用中のMotionだけを見る</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-navy-600 dark:text-navy-300">
            図鑑36件すべてではなく、正本の <code className="font-mono">usageStage=ROUGH/FINAL</code> だけをproduction workspaceへ接続する。
            Opening/Profile適合度は候補表示に使うが、既存usageStageにはproject assignmentが無いため「Openingで採用済み」「Profileで採用済み」とは推測しない。
          </p>
        </div>
        <div className="grid min-w-[240px] grid-cols-3 gap-2 text-center text-xs">
          <div className="border border-sand-200 p-2 dark:border-navy-600"><p className="text-lg font-bold">{summary.used.length}</p><p>USED</p></div>
          <div className="border border-amber-200 p-2 dark:border-amber-900"><p className="text-lg font-bold">{summary.rough.length}</p><p>ROUGH</p></div>
          <div className="border border-emerald-200 p-2 dark:border-emerald-900"><p className="text-lg font-bold">{summary.final.length}</p><p>FINAL</p></div>
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
          {visible.map((record) => (
            <article key={record.patternId} className="border border-sand-200 p-4 dark:border-navy-600">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`border px-2 py-1 text-[10px] font-bold ${stageClass(record.usageStage)}`}>{record.usageStage}</span>
                <span className="border border-sand-300 px-2 py-1 text-[10px] text-navy-500 dark:border-navy-600 dark:text-navy-300">{project} FIT {projectFit(record, project)}</span>
                <span className="border border-sand-300 px-2 py-1 text-[10px] text-navy-500 dark:border-navy-600 dark:text-navy-300">PROJECT ASSIGNMENT UNRECORDED</span>
              </div>
              <h3 className="mt-3 font-bold text-navy-900 dark:text-sand-100">{record.japaneseName}</h3>
              <p className="mt-1 text-xs font-mono text-navy-400">{record.commonName} · {record.patternId}</p>
              <dl className="mt-4 grid grid-cols-2 gap-3 text-xs text-navy-600 dark:text-navy-300">
                <div><dt className="font-semibold">Implementation</dt><dd>{record.implementationStatus}{record.verifiedImplementation ? " / VERIFIED" : ""}</dd></div>
                <div><dt className="font-semibold">Preview</dt><dd>{record.previewStatus}{record.verifiedPreview ? " / VERIFIED" : ""}</dd></div>
                <div className="col-span-2"><dt className="font-semibold">{project} sections</dt><dd>{projectSections(record, project).length ? projectSections(record, project).join(" / ") : "—"}</dd></div>
              </dl>
            </article>
          ))}
        </div>
      )}

      <p className="mt-4 border-l-2 border-amber-400 pl-3 text-[11px] leading-5 text-navy-500 dark:text-navy-300">
        Authority boundary: usageStageはWedding全体でのROUGH/FINAL採用を示す。project別採用履歴は現行schemaに無いため、このpanelは適合度だけでproject assignmentを捏造しない。Remotion Studio GUI Actual / Mac DaVinci GUI Actualもここから昇格しない。
      </p>
    </section>
  );
}
