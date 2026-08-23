import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { SectionCard } from "../components/SectionCard";
import clipData from "../data/clips.json";
import { learningSkills, productionOutcomes } from "../data/movieCoach";
import {
  getBookChapterForSkill,
  getMovieCoachProgress,
  getOutcomeCompletion,
  getSkill,
  getSkillState,
  hasEvidence,
  learningStateLabel,
  loadCoachProgress,
  saveCoachProgress,
  selectTodayOutcome,
} from "../lib/movieCoach";
import { useProduction } from "../store/productionStore";
import type { ClipLibraryData } from "../types/movie";
import type {
  LearningEvidence,
  LearningState,
  ProductionOutcome,
} from "../types/learning";

const recipes = (clipData as unknown as ClipLibraryData).recipes;

type EvidenceState = Exclude<LearningState, "not_started">;

const evidenceStates: EvidenceState[] = [
  "learned",
  "practiced",
  "used_in_wedding",
  "comfortable",
  "automated",
];

const stateTone: Record<LearningState, string> = {
  not_started: "bg-sand-100 text-navy-500 dark:bg-navy-700 dark:text-navy-300",
  learned: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300",
  practiced: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  used_in_wedding: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  comfortable: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300",
  automated: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
};

const automationLabel = {
  never: "人間判断を残す",
  after_practice: "練習後に自動化可",
  after_wedding_use: "本番使用後に自動化可",
  safe_anytime: "補助自動化OK",
} as const;

function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="h-2 bg-sand-100 dark:bg-navy-700 overflow-hidden">
      <div className="h-full bg-navy-700 dark:bg-sand-200 transition-all" style={{ width: `${percent}%` }} />
    </div>
  );
}

function OutcomeRail({ outcome, active }: { outcome: ProductionOutcome; active: boolean }) {
  return (
    <div className={`border-l-2 pl-3 py-1 ${active ? "border-navy-800 dark:border-sand-100" : "border-sand-200 dark:border-navy-600"}`}>
      <div className="flex items-center gap-2">
        <span className={`text-xs font-mono ${active ? "text-navy-800 dark:text-sand-100" : "text-navy-400"}`}>
          {outcome.durationSec ? `${outcome.durationSec}s` : "PLAN"}
        </span>
        <span className={`text-sm ${active ? "font-bold text-navy-800 dark:text-sand-100" : "text-navy-500 dark:text-navy-300"}`}>
          {outcome.shortLabel}
        </span>
      </div>
    </div>
  );
}

export function MovieCoach() {
  const { data } = useProduction();
  const [progress, setProgress] = useState(loadCoachProgress);
  const [skillQuery, setSkillQuery] = useState("");
  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterPageStart, setChapterPageStart] = useState("");
  const [chapterPageEnd, setChapterPageEnd] = useState("");
  const [chapterSkillId, setChapterSkillId] = useState("davinci-trim");

  useEffect(() => {
    saveCoachProgress(progress);
  }, [progress]);

  const today = useMemo(() => selectTodayOutcome(progress), [progress]);
  const openingProgress = useMemo(() => getMovieCoachProgress("opening", progress), [progress]);
  const profileCoachProgress = useMemo(() => getMovieCoachProgress("profile", progress), [progress]);

  const profilePhotoStats = useMemo(() => {
    const slots = data.scenes
      .filter((scene) => scene.movieId === "profile")
      .flatMap((scene) => scene.photoSlots ?? []);
    const required = slots.reduce((sum, slot) => sum + slot.requiredCount, 0);
    const selected = slots.reduce(
      (sum, slot) => sum + Math.min(slot.selectedAssetIds.length, slot.requiredCount),
      0,
    );
    const percent = required > 0 ? Math.round((selected / required) * 100) : 0;
    return { required, selected, percent };
  }, [data.scenes]);

  const todaySkillIds = today ? [...today.conceptSkillIds, ...today.davinciSkillIds] : [];
  const todaySkills = todaySkillIds.map(getSkill).filter((skill) => skill !== undefined);
  const todayBookChapters = todaySkillIds
    .map((skillId) => ({ skillId, chapter: getBookChapterForSkill(skillId, progress) }))
    .filter((item) => item.chapter !== undefined);
  const todayRecipes = today
    ? recipes.filter((recipe) => today.recipeIds.includes(recipe.id))
    : [];

  const filteredSkills = useMemo(() => {
    const query = skillQuery.trim().toLowerCase();
    if (!query) return learningSkills;

    return learningSkills.filter((skill) => {
      const haystack = [
        skill.label,
        skill.category,
        skill.summary,
        skill.whyItMatters,
        skill.davinciPage ?? "",
        ...(skill.features ?? []),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [skillQuery]);

  function toggleChecklist(outcomeId: string, itemId: string) {
    setProgress((current) => {
      const currentItems = new Set(current.outcomeChecklist[outcomeId] ?? []);
      if (currentItems.has(itemId)) currentItems.delete(itemId);
      else currentItems.add(itemId);

      return {
        ...current,
        outcomeChecklist: {
          ...current.outcomeChecklist,
          [outcomeId]: Array.from(currentItems),
        },
      };
    });
  }

  function recordEvidence(skillId: string, state: EvidenceState, outcomeId: string) {
    setProgress((current) => {
      if (hasEvidence(skillId, state, outcomeId, current.evidence)) return current;

      const evidence: LearningEvidence = {
        evidenceId: `${skillId}-${state}-${Date.now()}`,
        skillId,
        state,
        outcomeId,
        createdAt: new Date().toISOString(),
        note: `Wedding Movie Coach: ${outcomeId}`,
      };

      return { ...current, evidence: [...current.evidence, evidence] };
    });
  }

  function updateBook(field: "title" | "edition" | "davinciVersion", value: string) {
    setProgress((current) => ({
      ...current,
      book: { ...current.book, [field]: value },
    }));
  }

  function addBookChapter() {
    const title = chapterTitle.trim();
    if (!title) return;

    const pageStart = chapterPageStart.trim() ? Number(chapterPageStart) : null;
    const pageEnd = chapterPageEnd.trim() ? Number(chapterPageEnd) : null;
    const chapterId = `book-${Date.now()}`;

    setProgress((current) => ({
      ...current,
      book: {
        ...current.book,
        chapters: [
          ...current.book.chapters,
          {
            chapterId,
            title,
            pageStart: Number.isFinite(pageStart) ? pageStart : null,
            pageEnd: Number.isFinite(pageEnd) ? pageEnd : null,
            skillIds: [chapterSkillId],
          },
        ],
      },
    }));

    setChapterTitle("");
    setChapterPageStart("");
    setChapterPageEnd("");
  }

  const todayCompletion = today
    ? getOutcomeCompletion(today, progress.outcomeChecklist)
    : null;

  return (
    <div>
      <Header
        title="MOVIE COACH"
        description="Wedding Movieを完成させながら、必要な編集判断とDaVinci操作だけを身につける"
      />

      <div className="mb-8 border-y border-sand-200 dark:border-navy-600 py-5 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr_1fr] gap-6">
        <div>
          <p className="text-[11px] tracking-[0.22em] text-navy-400 font-semibold">GOAL</p>
          <p className="mt-1 text-2xl font-serif text-navy-900 dark:text-sand-100">2026.10.24</p>
          <p className="mt-2 text-sm text-navy-500 dark:text-navy-300">完成品を進めることが学習。操作の習得だけでは完了にしません。</p>
        </div>
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-semibold text-navy-700 dark:text-sand-200">OPENING / Coach実践</span>
            <span className="font-mono text-navy-500">{openingProgress.done}/{openingProgress.total} · {openingProgress.percent}%</span>
          </div>
          <ProgressBar percent={openingProgress.percent} />
          <p className="text-[11px] text-navy-400 mt-2">Remotion正本のsceneをOutcome単位で完了した割合</p>
        </div>
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-semibold text-navy-700 dark:text-sand-200">PROFILE / 写真選定</span>
            <span className="font-mono text-navy-500">{profilePhotoStats.selected}/{profilePhotoStats.required} · {profilePhotoStats.percent}%</span>
          </div>
          <ProgressBar percent={profilePhotoStats.percent} />
          <p className="text-[11px] text-navy-400 mt-2">既存Profile Plannerの実データを再利用</p>
        </div>
      </div>

      {today ? (
        <section className="mb-10">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-navy-900 dark:border-sand-100 pb-3 mb-5">
            <div>
              <p className="text-[11px] tracking-[0.2em] text-navy-400 font-semibold">TODAY&apos;S OUTCOME</p>
              <h2 className="mt-1 text-2xl font-bold text-navy-900 dark:text-sand-100">{today.title}</h2>
              <p className="mt-1 text-xs font-mono text-navy-400">{today.authorityLabel} · {today.productionRef}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-mono font-bold text-navy-900 dark:text-sand-100">{todayCompletion?.percent ?? 0}%</p>
              <p className="text-xs text-navy-400">完成条件 {todayCompletion?.done ?? 0}/{todayCompletion?.total ?? 0}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1.6fr_1fr] gap-6">
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                <div>
                  <p className="text-[11px] tracking-widest font-semibold text-navy-400">🎬 今日作る</p>
                  <p className="mt-1 text-base font-semibold text-navy-800 dark:text-sand-100">{today.title}</p>
                  <p className="text-sm text-navy-500 dark:text-navy-300 mt-1">練習目安 {today.practiceMinutes}分。終点は練習ではなくWedding本番への適用。</p>
                </div>
                <div>
                  <p className="text-[11px] tracking-widest font-semibold text-navy-400">📖 今日読む</p>
                  {todayBookChapters.length > 0 ? (
                    <div className="mt-1 space-y-1">
                      {todayBookChapters.map(({ skillId, chapter }) => (
                        <p key={`${skillId}-${chapter!.chapterId}`} className="text-sm text-navy-700 dark:text-navy-200">
                          {chapter!.title}
                          {chapter!.pageStart !== null && ` P.${chapter!.pageStart}`}
                          {chapter!.pageEnd !== null && `–${chapter!.pageEnd}`}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-1 text-sm text-amber-700 dark:text-amber-300">Book Manifest未接続。下の「購入本」へ章・ページを1回登録すると自動表示します。</p>
                  )}
                </div>
                <div>
                  <p className="text-[11px] tracking-widest font-semibold text-navy-400">🧠 今日覚える</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {today.conceptSkillIds.map((skillId) => {
                      const skill = getSkill(skillId);
                      return skill ? <span key={skillId} className="text-xs border-b border-navy-300 pb-0.5 text-navy-700 dark:text-navy-200">{skill.label}</span> : null;
                    })}
                  </div>
                </div>
                <div>
                  <p className="text-[11px] tracking-widest font-semibold text-navy-400">🛠 今日使う</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {today.davinciSkillIds.map((skillId) => {
                      const skill = getSkill(skillId);
                      return skill ? <span key={skillId} className="text-xs font-mono text-navy-700 dark:text-sand-200">{skill.davinciPage} / {skill.label}</span> : null;
                    })}
                  </div>
                </div>
              </div>

              <div className="border-t border-sand-200 dark:border-navy-600 pt-4">
                <p className="text-[11px] tracking-widest font-semibold text-navy-400">✅ 今日の完成条件</p>
                <div className="mt-3 space-y-2">
                  {today.checklist.map((item) => {
                    const checked = (progress.outcomeChecklist[today.outcomeId] ?? []).includes(item.itemId);
                    return (
                      <label key={item.itemId} className="flex items-center gap-3 text-sm text-navy-700 dark:text-navy-200 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleChecklist(today.outcomeId, item.itemId)}
                          className="h-4 w-4"
                        />
                        <span className={checked ? "line-through text-navy-400" : ""}>{item.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="border-l-2 border-amber-400 pl-4 py-1">
                <p className="text-[11px] tracking-widest font-semibold text-amber-700 dark:text-amber-300">WHY THIS TODAY?</p>
                <p className="mt-1 text-sm text-navy-700 dark:text-navy-200">{today.whyToday}</p>
              </div>
            </div>

            <aside className="border-l border-sand-200 dark:border-navy-600 pl-5">
              <p className="text-[11px] tracking-[0.2em] font-semibold text-navy-400 mb-3">OPENING PATH</p>
              <div className="space-y-2">
                {productionOutcomes.filter((outcome) => outcome.movieId === "opening").map((outcome) => (
                  <OutcomeRail key={outcome.outcomeId} outcome={outcome} active={outcome.outcomeId === today.outcomeId} />
                ))}
              </div>
              <Link to="/profile-planner" className="inline-block mt-5 text-xs text-navy-600 dark:text-navy-300 underline">Profile写真計画を見る →</Link>
            </aside>
          </div>
        </section>
      ) : (
        <div className="mb-10 p-6 border border-emerald-200 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-800">
          <p className="font-bold text-emerald-800 dark:text-emerald-200">登録済みOutcomeはすべて完了です。</p>
          <p className="text-sm text-emerald-700 dark:text-emerald-300 mt-1">次はReview結果から新しいProduction Outcomeを追加します。</p>
        </div>
      )}

      {today && (
        <SectionCard title="Learn → Try → Apply → Evidence" className="mb-8">
          <p className="text-sm text-navy-500 dark:text-navy-300 mb-4">
            状態は単独の自己申告値ではなく、Wedding Outcomeに紐づくEvidenceから算出します。同じ操作を別sceneでも使えるようになったら「自力で使える」へ進めます。
          </p>
          <div className="space-y-4">
            {todaySkills.map((skill) => {
              const currentState = getSkillState(skill.skillId, progress.evidence);
              return (
                <div key={skill.skillId} className="border-t border-sand-200 dark:border-navy-600 pt-4 first:border-t-0 first:pt-0">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="max-w-2xl">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] tracking-widest font-semibold text-navy-400">{skill.kind === "concept" ? "CONCEPT" : `DAVINCI / ${skill.davinciPage}`}</span>
                        <span className={`px-2 py-0.5 text-[11px] ${stateTone[currentState]}`}>{learningStateLabel[currentState]}</span>
                      </div>
                      <h3 className="mt-1 font-bold text-navy-900 dark:text-sand-100">{skill.label}</h3>
                      <p className="mt-1 text-sm text-navy-600 dark:text-navy-300">{skill.summary}</p>
                      <p className="mt-1 text-xs text-navy-400">なぜ: {skill.whyItMatters}</p>
                    </div>
                    <p className="text-[11px] text-navy-400">AUTO: {automationLabel[skill.automationPolicy]}</p>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {evidenceStates.map((state) => {
                      const recorded = hasEvidence(skill.skillId, state, today.outcomeId, progress.evidence);
                      const tooEarlyForAutomation = state === "automated" && skill.automationPolicy === "never";
                      return (
                        <button
                          key={state}
                          type="button"
                          disabled={recorded || tooEarlyForAutomation}
                          onClick={() => recordEvidence(skill.skillId, state, today.outcomeId)}
                          className={`px-2.5 py-1.5 text-xs border transition ${
                            recorded
                              ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-300"
                              : tooEarlyForAutomation
                                ? "border-sand-100 text-navy-300 cursor-not-allowed dark:border-navy-700 dark:text-navy-600"
                                : "border-sand-200 text-navy-600 hover:border-navy-500 dark:border-navy-600 dark:text-navy-200"
                          }`}
                        >
                          {recorded ? "✓ " : ""}{learningStateLabel[state]}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        <SectionCard title="逆引き — やりたいことから探す">
          <input
            type="search"
            value={skillQuery}
            onChange={(event) => setSkillQuery(event.target.value)}
            placeholder="例: 写真を寄せたい / crop / beat / 音を自然につなぐ"
            className="w-full px-3 py-2 border border-sand-200 bg-white text-sm text-navy-800 dark:bg-navy-800 dark:border-navy-600 dark:text-sand-100"
          />
          <div className="mt-4 space-y-3 max-h-[420px] overflow-auto pr-1">
            {filteredSkills.map((skill) => {
              const state = getSkillState(skill.skillId, progress.evidence);
              return (
                <div key={skill.skillId} className="border-b border-sand-100 dark:border-navy-700 pb-3 last:border-0">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-sm text-navy-800 dark:text-sand-100">{skill.label}</p>
                    <span className={`px-2 py-0.5 text-[10px] ${stateTone[state]}`}>{learningStateLabel[state]}</span>
                  </div>
                  <p className="text-xs text-navy-500 dark:text-navy-300 mt-1">{skill.summary}</p>
                  {skill.kind === "davinci" && (
                    <p className="text-[11px] font-mono text-navy-400 mt-1">{skill.davinciPage} · {(skill.features ?? []).join(" / ")}</p>
                  )}
                </div>
              );
            })}
          </div>
        </SectionCard>

        <SectionCard title="Good / Bad — 既存Recipeを教材化">
          <p className="text-sm text-navy-500 dark:text-navy-300 mb-4">
            新しいRecipe DBは作らず、既存 <code className="font-mono text-xs">clips.json / reference-recipes.md</code> の型をそのまま使います。
          </p>
          {todayRecipes.length > 0 ? (
            <div className="space-y-4">
              {todayRecipes.map((recipe) => (
                <div key={recipe.id} className="border-y border-sand-200 dark:border-navy-600 py-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-navy-400">{recipe.id}</span>
                    <span className="font-bold text-navy-800 dark:text-sand-100">{recipe.name}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <div>
                      <p className="text-[11px] font-bold tracking-widest text-emerald-700 dark:text-emerald-300">GOOD</p>
                      <p className="text-sm text-navy-700 dark:text-navy-200 mt-1">{recipe.beats}</p>
                      <p className="text-xs text-navy-400 mt-1">{recipe.transition}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold tracking-widest text-red-700 dark:text-red-300">BAD</p>
                      <p className="text-sm text-navy-700 dark:text-navy-200 mt-1">{recipe.avoid}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-navy-400">今日のOutcomeにRecipeがありません。</p>
          )}
          <Link to="/clips" className="inline-block mt-4 text-xs text-navy-600 dark:text-navy-300 underline">既存クリップ素材集 / Recipeを見る →</Link>
        </SectionCard>
      </div>

      <SectionCard title="購入済みDaVinci本 — Book Manifest" className="mb-8">
        <p className="text-sm text-navy-500 dark:text-navy-300 mb-4">
          本を最初から読むのではなく、今日必要なSkillから章・ページを逆引きします。タイトル・版・ページ番号は固定ハードコードしません。
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
          <label className="text-xs text-navy-500 dark:text-navy-300">
            書籍タイトル
            <input value={progress.book.title} onChange={(event) => updateBook("title", event.target.value)} className="mt-1 w-full px-3 py-2 border border-sand-200 bg-white text-sm text-navy-800 dark:bg-navy-800 dark:border-navy-600 dark:text-sand-100" />
          </label>
          <label className="text-xs text-navy-500 dark:text-navy-300">
            版 / edition
            <input value={progress.book.edition} onChange={(event) => updateBook("edition", event.target.value)} className="mt-1 w-full px-3 py-2 border border-sand-200 bg-white text-sm text-navy-800 dark:bg-navy-800 dark:border-navy-600 dark:text-sand-100" />
          </label>
          <label className="text-xs text-navy-500 dark:text-navy-300">
            対応DaVinci Version
            <input value={progress.book.davinciVersion} onChange={(event) => updateBook("davinciVersion", event.target.value)} className="mt-1 w-full px-3 py-2 border border-sand-200 bg-white text-sm text-navy-800 dark:bg-navy-800 dark:border-navy-600 dark:text-sand-100" />
          </label>
        </div>

        <div className="border-t border-sand-200 dark:border-navy-600 pt-4">
          <p className="text-xs font-semibold text-navy-700 dark:text-sand-200 mb-3">章 / ページ → Skillを登録</p>
          <div className="grid grid-cols-1 md:grid-cols-[1.4fr_0.7fr_0.7fr_1.2fr_auto] gap-2 items-end">
            <label className="text-xs text-navy-500 dark:text-navy-300">章名<input value={chapterTitle} onChange={(event) => setChapterTitle(event.target.value)} className="mt-1 w-full px-2 py-2 border border-sand-200 bg-white text-sm dark:bg-navy-800 dark:border-navy-600 dark:text-sand-100" /></label>
            <label className="text-xs text-navy-500 dark:text-navy-300">開始P<input type="number" min="1" value={chapterPageStart} onChange={(event) => setChapterPageStart(event.target.value)} className="mt-1 w-full px-2 py-2 border border-sand-200 bg-white text-sm dark:bg-navy-800 dark:border-navy-600 dark:text-sand-100" /></label>
            <label className="text-xs text-navy-500 dark:text-navy-300">終了P<input type="number" min="1" value={chapterPageEnd} onChange={(event) => setChapterPageEnd(event.target.value)} className="mt-1 w-full px-2 py-2 border border-sand-200 bg-white text-sm dark:bg-navy-800 dark:border-navy-600 dark:text-sand-100" /></label>
            <label className="text-xs text-navy-500 dark:text-navy-300">Skill<select value={chapterSkillId} onChange={(event) => setChapterSkillId(event.target.value)} className="mt-1 w-full px-2 py-2 border border-sand-200 bg-white text-sm dark:bg-navy-800 dark:border-navy-600 dark:text-sand-100">{learningSkills.map((skill) => <option key={skill.skillId} value={skill.skillId}>{skill.label}</option>)}</select></label>
            <button type="button" onClick={addBookChapter} className="px-3 py-2 bg-navy-800 text-white text-xs dark:bg-sand-100 dark:text-navy-900">追加</button>
          </div>
        </div>

        {progress.book.chapters.length > 0 && (
          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-left text-xs text-navy-400 border-b border-sand-200 dark:border-navy-600"><th className="py-2">章</th><th>ページ</th><th>Skill</th></tr></thead>
              <tbody>
                {progress.book.chapters.map((chapter) => (
                  <tr key={chapter.chapterId} className="border-b border-sand-100 dark:border-navy-700">
                    <td className="py-2 text-navy-800 dark:text-sand-100">{chapter.title}</td>
                    <td className="font-mono text-xs text-navy-500">{chapter.pageStart ?? "?"}–{chapter.pageEnd ?? "?"}</td>
                    <td className="text-xs text-navy-500">{chapter.skillIds.map((skillId) => getSkill(skillId)?.label ?? skillId).join(", ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SectionCard>

      <SectionCard title="Profile Movieへつなぐ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div><p className="text-[11px] tracking-widest text-navy-400 font-semibold">PHOTO PLAN</p><p className="mt-1 text-2xl font-mono font-bold text-navy-900 dark:text-sand-100">{profilePhotoStats.percent}%</p><p className="text-xs text-navy-500 mt-1">{profilePhotoStats.selected}/{profilePhotoStats.required}枚を選定済み</p></div>
          <div><p className="text-[11px] tracking-widest text-navy-400 font-semibold">COACH OUTCOME</p><p className="mt-1 text-2xl font-mono font-bold text-navy-900 dark:text-sand-100">{profileCoachProgress.percent}%</p><p className="text-xs text-navy-500 mt-1">まず写真選定 → Story → 長尺Pacingへ進む</p></div>
          <div><p className="text-[11px] tracking-widest text-navy-400 font-semibold">PRINCIPLE</p><p className="mt-1 text-sm font-semibold text-navy-800 dark:text-sand-100">派手な演出よりStoryが伝わること</p><Link to="/profile-planner" className="inline-block mt-2 text-xs underline text-navy-600 dark:text-navy-300">Profile Plannerへ →</Link></div>
        </div>
      </SectionCard>
    </div>
  );
}
