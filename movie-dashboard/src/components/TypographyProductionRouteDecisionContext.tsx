import {getWeddingTypographyProductionRoleGuide} from "../data/weddingTypographyProductionRoleGuide.generated";
import type {TypographyProductionPatternId} from "../data/typographySceneProductionRouting";
import type {SceneProjectId} from "../data/visualSceneComposer";
import {TypographyProductionRouteChoiceGuide} from "./TypographyProductionRouteChoiceGuide";

export function TypographyProductionRouteDecisionContext({
  projectId,
  patternId,
}: {
  projectId: SceneProjectId;
  patternId: TypographyProductionPatternId;
}) {
  const roles = getWeddingTypographyProductionRoleGuide(projectId);
  const primaryFor = roles.filter((item) => item.primaryPatternId === patternId).map((item) => item.role);
  const fallbackFor = roles.filter((item) => item.fallbackPatternIds.includes(patternId)).map((item) => item.role);

  return (
    <div className="mt-2 border-t border-sand-100 dark:border-navy-700 pt-2">
      <div className="flex flex-wrap gap-1">
        {primaryFor.map((role) => (
          <span key={`primary:${role}`} className="border border-emerald-300 dark:border-emerald-800 px-1.5 py-0.5 text-[7px] font-semibold text-emerald-700 dark:text-emerald-300">
            PRIMARY · {role}
          </span>
        ))}
        {fallbackFor.map((role) => (
          <span key={`fallback:${role}`} className="border border-sky-300 dark:border-sky-800 px-1.5 py-0.5 text-[7px] text-sky-700 dark:text-sky-300">
            FALLBACK · {role}
          </span>
        ))}
        {primaryFor.length === 0 && fallbackFor.length === 0 ? (
          <span className="border border-sand-200 dark:border-navy-600 px-1.5 py-0.5 text-[7px] text-navy-400">CUSTOM / ROLE未推奨</span>
        ) : null}
      </div>
      <TypographyProductionRouteChoiceGuide patternId={patternId} />
    </div>
  );
}
