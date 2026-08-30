import {getWeddingTypographyProductionRoleGuide} from "../data/weddingTypographyProductionRoleGuide.generated";
import type {TypographyProductionPatternId} from "../data/typographySceneProductionRouting";
import type {SceneProjectId} from "../data/visualSceneComposer";
import {TypographyElementVisualComparison} from "./TypographyElementVisualComparison";
import {TypographyProductionRouteChoiceGuide} from "./TypographyProductionRouteChoiceGuide";

export function TypographyProductionRoleGuide({projectId}: {projectId: SceneProjectId}) {
  const roles = getWeddingTypographyProductionRoleGuide(projectId);

  return (
    <section className="mt-3 border border-sky-200 dark:border-sky-800 p-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-[9px] tracking-[0.16em] font-semibold text-sky-700 dark:text-sky-300">PRODUCTION ROLE GUIDE</p>
          <p className="mt-1 text-[10px] leading-4 text-navy-500 dark:text-navy-300">
            {projectId === "opening" ? "Opening" : "Profile"}で既存Typography Elementをどう使い分けるかの推奨です。自動選択ではなく、Human Selected routeの判断材料です。
          </p>
        </div>
        <span className="text-[8px] font-mono text-navy-400">PRIMARY → FALLBACK</span>
      </div>

      <div className="mt-3 grid grid-cols-1 lg:grid-cols-3 gap-2">
        {roles.map((item) => (
          <div key={`${item.movieId}:${item.role}`} className="border border-sand-200 dark:border-navy-600 p-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-semibold text-navy-800 dark:text-sand-100">{item.role}</span>
              <span className="text-[8px] font-mono text-amber-700 dark:text-amber-300">Actual NOT_RUN</span>
            </div>
            <p className="mt-1 text-[9px] leading-4 text-navy-500 dark:text-navy-300">
              Primary: <span className="font-mono font-semibold">{item.primaryPatternId}</span>
            </p>
            <TypographyProductionRouteChoiceGuide patternId={item.primaryPatternId as TypographyProductionPatternId} />
            <p className="mt-2 text-[9px] leading-4 text-navy-400">Fallback: {item.fallbackPatternIds.join(" → ")}</p>
            <p className="mt-1 text-[9px] leading-4 text-navy-400">{item.reason}</p>
          </div>
        ))}
      </div>

      <TypographyElementVisualComparison />

      <p className="mt-2 text-[9px] leading-4 text-amber-700 dark:text-amber-300">
        用途・強さ・避ける場面とpreviewは選択補助です。このガイド表示だけではRemotion Studio / DaVinci Resolve Actual、production-ready、Human approvalのいずれも成立しません。
      </p>
    </section>
  );
}
