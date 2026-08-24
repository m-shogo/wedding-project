import { useMemo, useState } from "react";
import { Header } from "../components/Header";
import {
  directorRecipeCatalog,
  directorRecipeCategories,
  getDirectorRecipeById,
  type DirectorRecipe,
  type DirectorRecipeCategory,
  type DirectorRecipeIntensity,
  type DirectorRecipeSourceType,
  type DirectorRecipeStatus,
} from "../data/directorRecipeCatalog";
import { motionEnergies, type MotionEnergy } from "../data/startMotionKit";
import { startExtendedSections, type StartExtendedSectionId } from "../data/startExtendedRhythmMap";
import { startSectionRecipeMap } from "../data/startSectionRecipeMap";

const ALL = "ALL" as const;
type Filter<T> = T | typeof ALL;

const categoryLabels: Record<DirectorRecipeCategory, string> = {
  CINEMATIC_CAMERA: "Cinematic Camera",
  PHOTO_PRESENTATION: "Photo Presentation",
  TYPOGRAPHY: "Typography",
  ANIME_OP_GRAMMAR: "Anime OP Grammar",
  CUT_TRANSITION: "Cut & Transition",
  RHYTHM_MUSIC_HIT: "Rhythm / Music Hit",
  TRAVEL: "Travel",
  EDITORIAL_CM: "Editorial / CM",
  WEDDING_EMOTION: "Wedding Emotion",
  START_SPECIFIC: "StaRt Specific",
};

const sourceTypeLabels: Record<DirectorRecipeSourceType, string> = {
  "photo-safe": "写真専用",
  "video-safe": "動画専用",
  both: "写真/動画両対応",
};

const statusLabels: Record<DirectorRecipeStatus, string> = {
  planned: "planned（未着手）",
  reviewed: "reviewed（レビュー済）",
  approved: "approved（採用）",
  rejected: "rejected（不採用）",
};

function categorySlug(category: DirectorRecipeCategory): string {
  return category.toLowerCase().replace(/_/g, "-");
}

function copyText(text: string) {
  void navigator.clipboard.writeText(text);
}

type Tab = "catalog" | "section-map";

export function DirectorRecipeCatalog() {
  const [tab, setTab] = useState<Tab>("catalog");
  const [category, setCategory] = useState<Filter<DirectorRecipeCategory>>(ALL);
  const [energy, setEnergy] = useState<Filter<MotionEnergy>>(ALL);
  const [source, setSource] = useState<Filter<DirectorRecipeSourceType>>(ALL);
  const [section, setSection] = useState<Filter<StartExtendedSectionId>>(ALL);
  const [intensity, setIntensity] = useState<Filter<DirectorRecipeIntensity>>(ALL);
  const [status, setStatus] = useState<Filter<DirectorRecipeStatus>>(ALL);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      directorRecipeCatalog.filter((recipe) =>
        (category === ALL || recipe.category === category) &&
        (energy === ALL || recipe.energy.includes(energy)) &&
        (source === ALL || recipe.sourceType === source || recipe.sourceType === "both") &&
        (section === ALL || recipe.recommendedStaRtSections.includes(section)) &&
        (intensity === ALL || recipe.intensity.includes(intensity)) &&
        (status === ALL || recipe.status === status),
      ),
    [category, energy, source, section, intensity, status],
  );

  const selected = useMemo(
    () => directorRecipeCatalog.find((recipe) => recipe.id === selectedId) ?? null,
    [selectedId],
  );

  function handleCopy(recipe: DirectorRecipe) {
    const command = `pnpm render:director-recipe ${recipe.id}`;
    copyText(command);
    setCopiedId(recipe.id);
    window.setTimeout(() => setCopiedId((current) => (current === recipe.id ? null : current)), 1600);
  }

  return (
    <div>
      <Header
        title="StaRt DIRECTOR RECIPE CATALOG"
        description="97件の演出レシピをcategory / energy / source / StaRt section / intensity / statusで絞り込んで見る、研究用ブラウジング画面（読み取り専用）"
      />

      <section className="mb-6 border-2 border-sky-300 dark:border-sky-700 bg-sky-50 dark:bg-sky-900/20 p-5">
        <p className="text-[10px] tracking-[0.2em] font-semibold text-sky-700 dark:text-sky-300">RESEARCH TRACK — NOT OPENING V1</p>
        <p className="mt-2 text-sm leading-6 text-sky-900 dark:text-sky-200">
          この画面はDirector Recipe Catalog（movie-dashboard Phase A data）を眺めて比較するための並行研究トラック。
          Opening V1の正本は<code>docs/opening-v1-motion-map.md</code>のまま。ここでのブラウジングが実写真の差し替え作業より優先されることはない。
        </p>
        <p className="mt-2 text-xs leading-5 text-sky-800 dark:text-sky-300">
          statusはすべて<code>planned</code>のまま。AIがfavorite/approvedへ自動昇格させることはしない。採否は人間確認が必須。
        </p>
      </section>

      <section className="mb-6 flex gap-2 border-b border-sand-200 dark:border-navy-600">
        <button
          onClick={() => setTab("catalog")}
          className={`px-4 py-2 text-xs font-semibold tracking-widest ${tab === "catalog" ? "border-b-2 border-navy-900 dark:border-sand-100 text-navy-900 dark:text-sand-100" : "text-navy-400"}`}
        >
          CATALOG（97件）
        </button>
        <button
          onClick={() => setTab("section-map")}
          className={`px-4 py-2 text-xs font-semibold tracking-widest ${tab === "section-map" ? "border-b-2 border-navy-900 dark:border-sand-100 text-navy-900 dark:text-sand-100" : "text-navy-400"}`}
        >
          SECTION MAP（14 section）
        </button>
      </section>

      {tab === "catalog" && (
      <>
      <section className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-px bg-sand-200 dark:bg-navy-600">
        <div className="bg-white dark:bg-navy-800 p-4">
          <p className="text-[10px] tracking-widest text-navy-400">TOTAL RECIPES</p>
          <p className="mt-1 text-3xl font-mono font-bold text-navy-900 dark:text-sand-100">{directorRecipeCatalog.length}</p>
        </div>
        <div className="bg-white dark:bg-navy-800 p-4">
          <p className="text-[10px] tracking-widest text-navy-400">CATEGORIES</p>
          <p className="mt-1 text-3xl font-mono font-bold text-navy-900 dark:text-sand-100">{directorRecipeCategories.length}</p>
        </div>
        <div className="bg-white dark:bg-navy-800 p-4">
          <p className="text-[10px] tracking-widest text-navy-400">SHOWING</p>
          <p className="mt-1 text-3xl font-mono font-bold text-navy-900 dark:text-sand-100">{filtered.length}</p>
        </div>
        <div className="bg-white dark:bg-navy-800 p-4">
          <p className="text-[10px] tracking-widest text-navy-400">APPROVED</p>
          <p className="mt-1 text-3xl font-mono font-bold text-emerald-700 dark:text-emerald-300">
            {directorRecipeCatalog.filter((r) => r.status === "approved").length}
          </p>
        </div>
      </section>

      <section className="mb-7 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 border-b border-sand-200 dark:border-navy-600 pb-5">
        <label className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">CATEGORY
          <select value={category} onChange={(e) => setCategory(e.target.value as Filter<DirectorRecipeCategory>)} className="mt-1 block w-full border border-sand-300 dark:border-navy-600 bg-white dark:bg-navy-800 px-3 py-2 text-sm text-navy-800 dark:text-sand-100">
            <option value={ALL}>ALL</option>
            {directorRecipeCategories.map((c) => <option key={c} value={c}>{categoryLabels[c]}</option>)}
          </select>
        </label>
        <label className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">ENERGY
          <select value={energy} onChange={(e) => setEnergy(e.target.value as Filter<MotionEnergy>)} className="mt-1 block w-full border border-sand-300 dark:border-navy-600 bg-white dark:bg-navy-800 px-3 py-2 text-sm text-navy-800 dark:text-sand-100">
            <option value={ALL}>ALL</option>
            {motionEnergies.map((e) => <option key={e} value={e}>{e}</option>)}
          </select>
        </label>
        <label className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">SOURCE
          <select value={source} onChange={(e) => setSource(e.target.value as Filter<DirectorRecipeSourceType>)} className="mt-1 block w-full border border-sand-300 dark:border-navy-600 bg-white dark:bg-navy-800 px-3 py-2 text-sm text-navy-800 dark:text-sand-100">
            <option value={ALL}>ALL</option>
            <option value="photo-safe">{sourceTypeLabels["photo-safe"]}</option>
            <option value="video-safe">{sourceTypeLabels["video-safe"]}</option>
            <option value="both">{sourceTypeLabels.both}</option>
          </select>
        </label>
        <label className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">StaRt SECTION
          <select value={section} onChange={(e) => setSection(e.target.value as Filter<StartExtendedSectionId>)} className="mt-1 block w-full border border-sand-300 dark:border-navy-600 bg-white dark:bg-navy-800 px-3 py-2 text-sm text-navy-800 dark:text-sand-100">
            <option value={ALL}>ALL</option>
            {startExtendedSections.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </label>
        <label className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">INTENSITY
          <select value={intensity} onChange={(e) => setIntensity(e.target.value as Filter<DirectorRecipeIntensity>)} className="mt-1 block w-full border border-sand-300 dark:border-navy-600 bg-white dark:bg-navy-800 px-3 py-2 text-sm text-navy-800 dark:text-sand-100">
            <option value={ALL}>ALL</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
          </select>
        </label>
        <label className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">STATUS
          <select value={status} onChange={(e) => setStatus(e.target.value as Filter<DirectorRecipeStatus>)} className="mt-1 block w-full border border-sand-300 dark:border-navy-600 bg-white dark:bg-navy-800 px-3 py-2 text-sm text-navy-800 dark:text-sand-100">
            <option value={ALL}>ALL</option>
            <option value="planned">planned</option>
            <option value="reviewed">reviewed</option>
            <option value="approved">approved</option>
            <option value="rejected">rejected</option>
          </select>
        </label>
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_1fr] gap-6">
        <section className="border-t-2 border-navy-900 dark:border-sand-100 divide-y divide-sand-200 dark:divide-navy-600 max-h-[70vh] overflow-y-auto">
          {filtered.map((recipe) => (
            <article
              key={recipe.id}
              onClick={() => setSelectedId(recipe.id)}
              className={`py-4 px-2 cursor-pointer grid grid-cols-1 md:grid-cols-[0.9fr_1.4fr_0.9fr] gap-3 hover:bg-sand-50 dark:hover:bg-navy-800 ${selected?.id === recipe.id ? "bg-sand-50 dark:bg-navy-800" : ""}`}
            >
              <div>
                <p className="text-[10px] font-mono text-navy-400">{recipe.id}</p>
                <h3 className="mt-1 font-bold text-navy-900 dark:text-sand-100">{recipe.label}</h3>
                <p className="mt-1 text-[10px] font-mono uppercase text-sky-700 dark:text-sky-300">{categoryLabels[recipe.category]}</p>
              </div>
              <div className="text-xs leading-5 text-navy-600 dark:text-navy-300">
                <p>{recipe.purpose}</p>
                <p className="mt-1 font-mono text-navy-400">
                  {sourceTypeLabels[recipe.sourceType]} / energy: {recipe.energy.join(",")} / intensity: {recipe.intensity.join(",")}
                </p>
              </div>
              <div className="text-xs leading-5 text-navy-600 dark:text-navy-300">
                <p className="font-mono text-navy-400">status: {recipe.status}</p>
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    handleCopy(recipe);
                  }}
                  className="mt-2 border border-navy-700 dark:border-sand-300 px-2 py-1 text-[10px] text-navy-700 dark:text-sand-200"
                >
                  {copiedId === recipe.id ? "COPIED ✓" : "render command copy"}
                </button>
              </div>
            </article>
          ))}
          {filtered.length === 0 && (
            <p className="py-8 text-center text-sm text-navy-400">条件に一致するレシピがありません。</p>
          )}
        </section>

        <section className="border-t-2 border-navy-900 dark:border-sand-100 pt-4">
          {!selected && (
            <p className="text-sm text-navy-400">左の一覧からレシピを選ぶと詳細が表示されます。</p>
          )}
          {selected && (
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-mono text-navy-400">{selected.id}</p>
                <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">{selected.label}</h2>
                <p className="mt-1 text-xs font-mono uppercase text-sky-700 dark:text-sky-300">
                  {categoryLabels[selected.category]} / {selected.subCategory}
                </p>
                <p className="mt-1 text-[10px] font-mono text-navy-400">{statusLabels[selected.status]}</p>
              </div>

              <div className="text-xs leading-5 text-navy-600 dark:text-navy-300 space-y-2">
                <p><span className="font-semibold text-emerald-700 dark:text-emerald-300">PURPOSE:</span> {selected.purpose}</p>
                <p><span className="font-semibold text-emerald-700 dark:text-emerald-300">WHY IT WORKS:</span> {selected.whyItWorks}</p>
                <p className="text-red-600 dark:text-red-300"><span className="font-semibold">AVOID WHEN:</span> {selected.avoidWhen}</p>
                <p><span className="font-semibold">AI TEMPLATE RISK:</span> {selected.aiTemplateRisk}</p>
                <p><span className="font-semibold">OVER-EDITING RISK:</span> {selected.overEditingRisk}</p>
              </div>

              <div className="text-xs leading-5 text-navy-600 dark:text-navy-300">
                <p className="font-semibold text-navy-800 dark:text-sand-100">GRAMMAR</p>
                <p className="mt-1"><span className="font-semibold">Camera:</span> {selected.cameraGrammar}</p>
                <p><span className="font-semibold">Edit:</span> {selected.editGrammar}</p>
                <p><span className="font-semibold">Typography:</span> {selected.typographyGrammar}</p>
                <p><span className="font-semibold">Transition:</span> {selected.transitionGrammar}</p>
                <p className="mt-1 font-mono text-navy-400">beat: {selected.beatBehavior} / duration: {selected.durationFrames[0]}–{selected.durationFrames[1]}f</p>
              </div>

              <div className="text-xs leading-5 text-navy-600 dark:text-navy-300">
                <p className="font-semibold text-navy-800 dark:text-sand-100">RECOMMENDED StaRt SECTIONS</p>
                <p className="mt-1 font-mono">{selected.recommendedStaRtSections.join(" / ") || "なし"}</p>
              </div>

              <div className="text-xs leading-5 text-navy-600 dark:text-navy-300">
                <p className="font-semibold text-navy-800 dark:text-sand-100">MOTION PRESET IDS（既存36 Motion Kit参照）</p>
                <p className="mt-1 font-mono">{selected.motionPresetIds.join(" / ")}</p>
              </div>

              <div className="text-xs leading-5 text-navy-600 dark:text-navy-300">
                <p className="font-semibold text-navy-800 dark:text-sand-100">DAVINCI SKILLS</p>
                <p className="mt-1 font-mono">{selected.davinciSkills.join(" / ")}</p>
              </div>

              <div className="border-t border-sand-200 dark:border-navy-600 pt-3">
                <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">MOTION-STUDIO PREVIEW（低bitrate render。重い実ファイルはGit/dashboardに持ち込まない）</p>
                <pre className="mt-2 bg-navy-900 text-sand-100 text-[11px] p-3 overflow-x-auto rounded">
{`cd motion-studio
pnpm render:director-recipe ${selected.id}`}
                </pre>
                <div className="mt-2 flex flex-wrap gap-2">
                  <button
                    onClick={() => handleCopy(selected)}
                    className="border border-navy-700 dark:border-sand-300 px-3 py-1.5 text-xs text-navy-700 dark:text-sand-200"
                  >
                    {copiedId === selected.id ? "COPIED ✓" : "render commandをコピー"}
                  </button>
                  <button
                    onClick={() => copyText(`pnpm dev:director-recipes`)}
                    className="border border-sand-300 dark:border-navy-600 px-3 py-1.5 text-xs text-navy-600 dark:text-navy-200"
                  >
                    Studio起動コマンドをコピー
                  </button>
                </div>
                <p className="mt-2 text-[11px] leading-5 text-navy-400">
                  カテゴリ全体を通しで見たい場合は
                  <code className="mx-1">pnpm render:director-recipe-collection DirectorRecipeReel-{categorySlug(selected.category)}</code>
                  （motion-studio内）。
                </p>
              </div>

              <div className="border-t border-sand-200 dark:border-navy-600 pt-3">
                <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">FAVORITE / MAYBE / REJECT（プレースホルダー）</p>
                <p className="mt-1 text-[11px] leading-5 text-navy-400">
                  ボタンは将来の人間レビュー機能用の設計余地。押しても状態は変わらない。AIがfavorite/approvedへ自動判定・自動昇格することはしない。
                </p>
                <div className="mt-2 flex gap-2">
                  <button disabled className="border border-emerald-300 dark:border-emerald-700 px-3 py-1.5 text-xs text-emerald-500 opacity-50 cursor-not-allowed">☆ Favorite</button>
                  <button disabled className="border border-amber-300 dark:border-amber-700 px-3 py-1.5 text-xs text-amber-500 opacity-50 cursor-not-allowed">? Maybe</button>
                  <button disabled className="border border-red-300 dark:border-red-700 px-3 py-1.5 text-xs text-red-500 opacity-50 cursor-not-allowed">✕ Reject</button>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>

      <section className="mt-8 border-l-2 border-navy-900 dark:border-sand-100 pl-5">
        <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">CATALOG ≠ FINAL DECISION</p>
        <p className="mt-1 text-sm leading-6 text-navy-700 dark:text-navy-200">
          ここに並ぶ97件は候補データ。Opening V1へ機械的に割り当てず、実写真previewで弱いcutが明確になった場合だけ、
          <code className="mx-1">docs/reference-recipes.md</code>の語彙と合わせて個別に検討する。
        </p>
      </section>
      </>
      )}

      {tab === "section-map" && <SectionRecipeMapView />}
    </div>
  );
}

function RecipeChip({ id }: { id: string }) {
  const recipe = getDirectorRecipeById(id);
  if (!recipe) {
    return <span className="inline-block border border-red-300 dark:border-red-700 px-2 py-0.5 text-[11px] text-red-600">unknown: {id}</span>;
  }
  return (
    <span className="inline-block border border-sand-300 dark:border-navy-600 px-2 py-0.5 text-[11px] font-mono text-navy-700 dark:text-sand-200" title={recipe.purpose}>
      {id}
    </span>
  );
}

function SectionRecipeMapView() {
  const [expandedId, setExpandedId] = useState<StartExtendedSectionId | null>(startSectionRecipeMap[0]?.sectionId ?? null);

  return (
    <div>
      <section className="mb-6 border-2 border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-900/20 p-5">
        <p className="text-[10px] tracking-[0.2em] font-semibold text-emerald-700 dark:text-emerald-300">PHASE E — SECTION ⇄ RECIPE MAPPING</p>
        <p className="mt-2 text-sm leading-6 text-emerald-900 dark:text-emerald-200">
          14 section（Extended Rhythm Map）それぞれに対して、primary / alternate / avoidレシピと
          photo hold秒数・graphic密度・typography・3-hit方針を具体化した設計図。
          <code className="mx-1">movie-dashboard/src/data/startSectionRecipeMap.ts</code> が単一情報源。
        </p>
        <p className="mt-2 text-xs leading-5 text-emerald-800 dark:text-emerald-300">
          statusはこのファイルには存在しない。採否・昇格は引き続きDirector Recipe Catalog側で人間確認が必須（AIが自動昇格しない）。
        </p>
      </section>

      <section className="space-y-3">
        {startSectionRecipeMap.map((mapping) => {
          const sectionMeta = startExtendedSections.find((s) => s.id === mapping.sectionId);
          const isExpanded = expandedId === mapping.sectionId;
          return (
            <article key={mapping.sectionId} className="border border-sand-200 dark:border-navy-600">
              <button
                onClick={() => setExpandedId(isExpanded ? null : mapping.sectionId)}
                className="w-full text-left px-4 py-3 flex flex-wrap items-center justify-between gap-2 hover:bg-sand-50 dark:hover:bg-navy-800"
              >
                <div>
                  <p className="text-[10px] font-mono text-navy-400">{mapping.sectionId}</p>
                  <h3 className="font-bold text-navy-900 dark:text-sand-100">{sectionMeta?.label ?? mapping.sectionId}</h3>
                </div>
                <p className="text-[11px] font-mono text-navy-400">
                  energy: {mapping.energy} / density: {mapping.density} / typography: {mapping.typographyLevel}
                  {mapping.threeHitPolicy ? " / THREE-HIT" : ""}
                </p>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 space-y-3 text-xs leading-5 text-navy-600 dark:text-navy-300">
                  <div>
                    <p className="font-semibold text-emerald-700 dark:text-emerald-300 mb-1">PRIMARY</p>
                    <div className="flex flex-wrap gap-1.5">
                      {mapping.primaryRecipeIds.map((id) => <RecipeChip key={id} id={id} />)}
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-sky-700 dark:text-sky-300 mb-1">ALTERNATE</p>
                    <div className="flex flex-wrap gap-1.5">
                      {mapping.alternateRecipeIds.map((id) => <RecipeChip key={id} id={id} />)}
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-red-600 dark:text-red-300 mb-1">AVOID</p>
                    <ul className="space-y-1">
                      {mapping.avoidRecipeIds.map((a) => (
                        <li key={a.recipeId} className="flex flex-wrap items-start gap-2">
                          <RecipeChip id={a.recipeId} />
                          <span className="text-navy-500 dark:text-navy-400">{a.reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    <p><span className="font-semibold text-navy-800 dark:text-sand-100">PHOTO HOLD:</span> {mapping.photoHoldSeconds}</p>
                    <p><span className="font-semibold text-navy-800 dark:text-sand-100">GRAPHIC DENSITY:</span> {mapping.graphicDensityPolicy}</p>
                  </div>
                  {mapping.threeHitPolicy && (
                    <p className="border-l-2 border-red-400 pl-3"><span className="font-semibold text-red-600 dark:text-red-300">THREE-HIT POLICY:</span> {mapping.threeHitPolicy}</p>
                  )}
                  <p className="border-l-2 border-navy-300 dark:border-navy-600 pl-3"><span className="font-semibold text-navy-800 dark:text-sand-100">NOTES:</span> {mapping.notes}</p>
                </div>
              )}
            </article>
          );
        })}
      </section>
    </div>
  );
}
