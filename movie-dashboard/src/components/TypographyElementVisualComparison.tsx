import {typographyProductionRoutes} from "../data/typographySceneProductionRouting";
import {getPatternPreview, motionPatterns} from "../data/visualMotionLibrary";

export function TypographyElementVisualComparison() {
  return (
    <div className="mt-3 border-t border-sky-200 dark:border-sky-800 pt-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-[8px] font-semibold tracking-[0.14em] text-sky-700 dark:text-sky-300">9 ELEMENT VISUAL COMPARISON</p>
          <p className="mt-1 text-[9px] leading-4 text-navy-400">Motion Zukanの既存previewを同じ場所で比較します。previewがVERIFIEDでもStudio / DaVinci GUI Actualや本番素材QAの証拠ではありません。</p>
        </div>
        <span className="text-[8px] font-mono text-navy-400">click video to play</span>
      </div>
      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {typographyProductionRoutes.map((route) => {
          const pattern = motionPatterns.find((item) => item.id === route.patternId);
          const preview = pattern ? getPatternPreview(pattern) : undefined;
          return (
            <article key={route.patternId} className="overflow-hidden border border-sand-200 dark:border-navy-600">
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
                  <span className="border border-sand-200 dark:border-navy-600 px-1.5 py-0.5 text-[7px] font-mono text-navy-400">{preview?.status ?? "MISSING"}</span>
                </div>
                <p className="mt-1 text-[8px] leading-3.5 text-navy-500 dark:text-navy-300">{pattern?.looksLike ?? "Motion Zukan description missing"}</p>
                <p className="mt-1 text-[7px] leading-3 text-navy-400">preview source: {preview?.sourceType ?? "MISSING"} / freshness: {preview?.freshness ?? "NEEDS_RECHECK"}</p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
