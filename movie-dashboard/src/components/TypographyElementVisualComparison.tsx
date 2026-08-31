import {typographyProductionRoutes} from "../data/typographySceneProductionRouting";
import {getWeddingTypographyProductionRoleGuide} from "../data/weddingTypographyProductionRoleGuide.generated";
import type {SceneProjectId} from "../data/visualSceneComposer";
import {getPatternPreview, motionPatterns} from "../data/visualMotionLibrary";

type RoleMatch = {role: string; priority: "PRIMARY" | "FALLBACK"; rank: number};

export function TypographyElementVisualComparison({projectId}: {projectId: SceneProjectId}) {
  const roles = getWeddingTypographyProductionRoleGuide(projectId);
  const roleMatches = new Map<string, RoleMatch[]>();

  for (const role of roles) {
    const current = roleMatches.get(role.primaryPatternId) ?? [];
    current.push({role: role.role, priority: "PRIMARY", rank: 0});
    roleMatches.set(role.primaryPatternId, current);
    role.fallbackPatternIds.forEach((patternId, index) => {
      const fallback = roleMatches.get(patternId) ?? [];
      fallback.push({role: role.role, priority: "FALLBACK", rank: index + 1});
      roleMatches.set(patternId, fallback);
    });
  }

  const routes = [...typographyProductionRoutes].sort((a, b) => {
    const aMatches = roleMatches.get(a.patternId) ?? [];
    const bMatches = roleMatches.get(b.patternId) ?? [];
    const aScore = aMatches.some((item) => item.priority === "PRIMARY") ? 0 : aMatches.length ? 1 : 2;
    const bScore = bMatches.some((item) => item.priority === "PRIMARY") ? 0 : bMatches.length ? 1 : 2;
    return aScore - bScore || a.patternId.localeCompare(b.patternId);
  });

  return (
    <div className="mt-3 border-t border-sky-200 dark:border-sky-800 pt-3" data-remotion-role-visual-comparison={projectId}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-[8px] font-semibold tracking-[0.14em] text-sky-700 dark:text-sky-300">ROLE-SCOPED ELEMENT VISUAL COMPARISON / {projectId.toUpperCase()}</p>
          <p className="mt-1 text-[9px] leading-4 text-navy-400">Primary → Fallback候補を先に並べ、preview・用途fit・Palmier capability・避ける場面を同時比較します。選択そのものはScene側のHuman Selected操作で行います。</p>
        </div>
        <span className="text-[8px] font-mono text-navy-400">AUTO SELECT = OFF / click video to play</span>
      </div>
      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {routes.map((route) => {
          const pattern = motionPatterns.find((item) => item.id === route.patternId);
          const preview = pattern ? getPatternPreview(pattern) : undefined;
          const matches = roleMatches.get(route.patternId) ?? [];
          const fit = projectId === "opening" ? pattern?.openingFit : pattern?.profileFit;
          return (
            <article key={route.patternId} className={`overflow-hidden border ${matches.some((item) => item.priority === "PRIMARY") ? "border-fuchsia-300 dark:border-fuchsia-800" : matches.length ? "border-sky-200 dark:border-sky-800" : "border-sand-200 dark:border-navy-600"}`} data-role-candidate={matches.length ? "true" : "false"}>
              <div className="aspect-video bg-navy-950/5 dark:bg-black/20">
                {preview?.assetPath ? (
                  <video
                    className="h-full w-full object-cover"
                    src={preview.assetPath}
                    poster={preview.posterPath ?? undefined}
                    controls
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                ) : preview?.posterPath ? (
                  <img className="h-full w-full object-cover" src={preview.posterPath} alt={`${pattern?.japaneseName ?? route.patternId} preview`} loading="lazy" />
                ) : (
                  <div className="flex h-full items-center justify-center px-3 text-center text-[9px] text-navy-400">preview asset未配置 / {preview?.status ?? "MISSING"}</div>
                )}
              </div>
              <div className="p-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[10px] font-semibold text-navy-800 dark:text-sand-100">{pattern?.japaneseName ?? route.patternId}</p>
                    <p className="mt-0.5 font-mono text-[7px] text-navy-400">{route.patternId}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="border border-sand-200 dark:border-navy-600 px-1.5 py-0.5 text-[7px] font-mono text-navy-400">preview {preview?.status ?? "MISSING"}</span>
                    <span className="border border-sand-200 dark:border-navy-600 px-1.5 py-0.5 text-[7px] font-mono text-navy-400">{projectId} fit {fit ?? "?"}</span>
                  </div>
                </div>
                {matches.length ? (
                  <div className="mt-2 flex flex-wrap gap-1" data-role-match-count={matches.length}>
                    {matches.map((match) => <span key={`${match.role}:${match.priority}:${match.rank}`} className={`border px-1.5 py-0.5 text-[7px] font-semibold ${match.priority === "PRIMARY" ? "border-fuchsia-300 text-fuchsia-700 dark:border-fuchsia-800 dark:text-fuchsia-300" : "border-sky-200 text-sky-700 dark:border-sky-800 dark:text-sky-300"}`}>{match.role} / {match.priority}{match.rank ? ` ${match.rank}` : ""}</span>)}
                  </div>
                ) : <p className="mt-2 text-[7px] text-navy-400">このmovieのcanonical Role Guideでは未推奨。必要ならHumanが個別routeとして選択。</p>}
                <p className="mt-2 text-[8px] leading-3.5 text-navy-500 dark:text-navy-300">{pattern?.looksLike ?? "Motion Zukan description missing"}</p>
                <div className="mt-2 grid gap-1 text-[7px] leading-3 text-navy-400">
                  <p><strong className="text-navy-600 dark:text-navy-200">Palmier:</strong> {pattern?.palmierCapability ?? "UNVERIFIED"}</p>
                  <p><strong className="text-navy-600 dark:text-navy-200">Good:</strong> {pattern?.goodFor.slice(0, 2).join(" / ") || "N/A"}</p>
                  <p><strong className="text-navy-600 dark:text-navy-200">Avoid:</strong> {pattern?.avoidFor.slice(0, 2).join(" / ") || "N/A"}</p>
                </div>
                <p className="mt-2 text-[7px] leading-3 text-navy-400">preview source: {preview?.sourceType ?? "MISSING"} / freshness: {preview?.freshness ?? "NEEDS_RECHECK"}</p>
              </div>
            </article>
          );
        })}
      </div>
      <p className="mt-2 border-l-2 border-amber-300 pl-2 text-[7px] leading-3 text-amber-800 dark:text-amber-200">Role badge / fit / preview比較はHuman選択を速くする判断材料だけです。Preview VERIFIED ≠ Remotion Studio GUI Actual PASS ≠ DaVinci GUI Actual PASS ≠ productionReady。</p>
    </div>
  );
}
