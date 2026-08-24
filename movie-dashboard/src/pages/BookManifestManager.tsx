import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import {
  bookSourceOptions,
  formatChapterPages,
  getBookCoverage,
  validateBookManifest,
} from "../lib/bookManifest";
import {
  allLearningSkills,
  allProductionOutcomes,
  loadCoachProgress,
  saveCoachProgress,
  selectTodayOutcome,
} from "../lib/movieCoach";
import type { BookChapterManifest, BookManifest } from "../types/learning";

export function BookManifestManager() {
  const [progress, setProgress] = useState(loadCoachProgress);
  const [chapterTitle, setChapterTitle] = useState("");
  const [pageStart, setPageStart] = useState("");
  const [pageEnd, setPageEnd] = useState("");
  const [skillQuery, setSkillQuery] = useState("");
  const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>([]);
  const [importText, setImportText] = useState("");
  const [importErrors, setImportErrors] = useState<string[]>([]);
  const [copyState, setCopyState] = useState("JSONをコピー");

  useEffect(() => {
    saveCoachProgress(progress);
  }, [progress]);

  const book = progress.book;
  const today = useMemo(() => selectTodayOutcome(progress), [progress]);
  const coverage = useMemo(
    () => getBookCoverage(book, allLearningSkills, allProductionOutcomes),
    [book],
  );
  const validSkillIds = useMemo(
    () => new Set(allLearningSkills.map((skill) => skill.skillId)),
    [],
  );

  const filteredSkills = useMemo(() => {
    const query = skillQuery.trim().toLowerCase();
    const source = query
      ? allLearningSkills.filter((skill) =>
          [skill.label, skill.category, skill.summary, skill.davinciPage ?? "", ...(skill.features ?? [])]
            .join(" ")
            .toLowerCase()
            .includes(query),
        )
      : allLearningSkills;
    return source.slice(0, 24);
  }, [skillQuery]);

  const todaySkillIds = today
    ? [...today.conceptSkillIds, ...today.davinciSkillIds]
    : [];
  const todayMappings = todaySkillIds.map((skillId) => ({
    skill: allLearningSkills.find((skill) => skill.skillId === skillId),
    chapters: book.chapters.filter((chapter) => chapter.skillIds.includes(skillId)),
  }));

  const exportJson = useMemo(() => JSON.stringify(book, null, 2), [book]);

  function updateBook(patch: Partial<BookManifest>) {
    setProgress((current) => ({
      ...current,
      book: { ...current.book, ...patch },
    }));
  }

  function toggleSelectedSkill(skillId: string) {
    setSelectedSkillIds((current) =>
      current.includes(skillId)
        ? current.filter((item) => item !== skillId)
        : [...current, skillId],
    );
  }

  function parsePage(value: string) {
    const trimmed = value.trim();
    if (!trimmed) return null;
    const parsed = Number(trimmed);
    return Number.isInteger(parsed) && parsed >= 1 ? parsed : null;
  }

  function addChapter() {
    const title = chapterTitle.trim();
    if (!title || selectedSkillIds.length === 0) return;
    const start = parsePage(pageStart);
    const end = parsePage(pageEnd);
    if ((pageStart.trim() && start === null) || (pageEnd.trim() && end === null)) return;
    if (start !== null && end !== null && end < start) return;

    const chapter: BookChapterManifest = {
      chapterId: `book-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      title,
      pageStart: start,
      pageEnd: end,
      skillIds: selectedSkillIds,
    };

    updateBook({ chapters: [...book.chapters, chapter] });
    setChapterTitle("");
    setPageStart("");
    setPageEnd("");
    setSelectedSkillIds([]);
    setSkillQuery("");
  }

  function removeChapter(chapterId: string) {
    updateBook({ chapters: book.chapters.filter((chapter) => chapter.chapterId !== chapterId) });
  }

  function importManifest() {
    setImportErrors([]);
    try {
      const parsed = JSON.parse(importText);
      const result = validateBookManifest(parsed, validSkillIds);
      if (!result.valid || !result.manifest) {
        setImportErrors(result.errors);
        return;
      }
      updateBook(result.manifest);
      setImportText("");
    } catch {
      setImportErrors(["JSONとして解析できませんでした"]);
    }
  }

  async function copyManifest() {
    try {
      await navigator.clipboard.writeText(exportJson);
      setCopyState("コピー済み");
      window.setTimeout(() => setCopyState("JSONをコピー"), 1500);
    } catch {
      setCopyState("下のJSONを手動コピー");
    }
  }

  return (
    <div>
      <Header
        title="BOOK MANIFEST"
        description="本を最初から読むのではなく、Wedding Movieで今日必要なSkillから読む章・ページを逆引きする"
      />

      <section className="mb-8 border-y border-sand-200 dark:border-navy-600 py-5 grid grid-cols-2 lg:grid-cols-4 gap-5">
        <div>
          <p className="text-[10px] tracking-[0.18em] font-semibold text-navy-400">WEDDING SKILL COVERAGE</p>
          <p className="mt-1 text-2xl font-mono font-bold text-navy-900 dark:text-sand-100">{coverage.percent}%</p>
          <p className="text-xs text-navy-400">{coverage.mappedRequired}/{coverage.totalRequired} skills mapped</p>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.18em] font-semibold text-navy-400">OPENING</p>
          <p className="mt-1 text-2xl font-mono font-bold text-navy-900 dark:text-sand-100">{coverage.opening.percent}%</p>
          <p className="text-xs text-navy-400">{coverage.opening.mapped}/{coverage.opening.total}</p>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.18em] font-semibold text-navy-400">PROFILE</p>
          <p className="mt-1 text-2xl font-mono font-bold text-navy-900 dark:text-sand-100">{coverage.profile.percent}%</p>
          <p className="text-xs text-navy-400">{coverage.profile.mapped}/{coverage.profile.total}</p>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.18em] font-semibold text-navy-400">CHAPTERS</p>
          <p className="mt-1 text-2xl font-mono font-bold text-navy-900 dark:text-sand-100">{book.chapters.length}</p>
          <p className="text-xs text-navy-400">registered</p>
        </div>
      </section>

      <section className="mb-10">
        <div className="border-b-2 border-navy-900 dark:border-sand-100 pb-3 mb-4">
          <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">BOOK IDENTITY</p>
          <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">書名が確定した情報だけ入れる</h2>
        </div>
        <p className="text-sm text-navy-500 dark:text-navy-300 mb-4">
          書名・版・ページ番号は推測で埋めません。未確定は空欄のままで問題ありません。
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <label className="text-xs text-navy-500 dark:text-navy-300">
            書籍タイトル
            <input value={book.title} onChange={(event) => updateBook({ title: event.target.value })} className="mt-1 w-full border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 px-3 py-2 text-sm text-navy-800 dark:text-sand-100" />
          </label>
          <label className="text-xs text-navy-500 dark:text-navy-300">
            版 / edition
            <input value={book.edition} onChange={(event) => updateBook({ edition: event.target.value })} className="mt-1 w-full border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 px-3 py-2 text-sm text-navy-800 dark:text-sand-100" />
          </label>
          <label className="text-xs text-navy-500 dark:text-navy-300">
            対応DaVinci Version
            <input value={book.davinciVersion} onChange={(event) => updateBook({ davinciVersion: event.target.value })} className="mt-1 w-full border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 px-3 py-2 text-sm text-navy-800 dark:text-sand-100" />
          </label>
          <label className="text-xs text-navy-500 dark:text-navy-300">
            Source
            <select value={book.sourceType} onChange={(event) => updateBook({ sourceType: event.target.value as BookManifest["sourceType"] })} className="mt-1 w-full border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 px-3 py-2 text-sm text-navy-800 dark:text-sand-100">
              {bookSourceOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
          </label>
        </div>
      </section>

      {today && (
        <section className="mb-10 border-l-2 border-navy-900 dark:border-sand-100 pl-5 py-1">
          <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">TODAY&apos;S READING MAP</p>
          <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">{today.title}</h2>
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-3">
            {todayMappings.map(({ skill, chapters }) => skill ? (
              <div key={skill.skillId} className="flex items-start justify-between gap-4 border-b border-sand-100 dark:border-navy-700 pb-2">
                <div>
                  <p className="text-sm font-semibold text-navy-800 dark:text-sand-100">{skill.label}</p>
                  <p className="text-[10px] font-mono text-navy-400">{skill.skillId}</p>
                </div>
                <div className="text-right text-xs text-navy-500 dark:text-navy-300">
                  {chapters.length > 0
                    ? chapters.map((chapter) => <p key={chapter.chapterId}>{chapter.title} · {formatChapterPages(chapter)}</p>)
                    : <span className="text-amber-700 dark:text-amber-300">未mapping</span>}
                </div>
              </div>
            ) : null)}
          </div>
        </section>
      )}

      <section className="mb-10">
        <div className="border-b-2 border-navy-900 dark:border-sand-100 pb-3 mb-4">
          <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">ADD CHAPTER</p>
          <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">章 / ページを複数Skillへ紐付ける</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_0.6fr_0.6fr] gap-3">
          <label className="text-xs text-navy-500 dark:text-navy-300">
            章名
            <input value={chapterTitle} onChange={(event) => setChapterTitle(event.target.value)} className="mt-1 w-full border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 px-3 py-2 text-sm text-navy-800 dark:text-sand-100" />
          </label>
          <label className="text-xs text-navy-500 dark:text-navy-300">
            開始P
            <input type="number" min="1" value={pageStart} onChange={(event) => setPageStart(event.target.value)} className="mt-1 w-full border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 px-3 py-2 text-sm text-navy-800 dark:text-sand-100" />
          </label>
          <label className="text-xs text-navy-500 dark:text-navy-300">
            終了P
            <input type="number" min="1" value={pageEnd} onChange={(event) => setPageEnd(event.target.value)} className="mt-1 w-full border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 px-3 py-2 text-sm text-navy-800 dark:text-sand-100" />
          </label>
        </div>
        <input value={skillQuery} onChange={(event) => setSkillQuery(event.target.value)} placeholder="Skill検索: trim / caption / color / story..." className="mt-4 w-full border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 px-3 py-2 text-sm text-navy-800 dark:text-sand-100" />
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-sand-200 dark:bg-navy-600 border border-sand-200 dark:border-navy-600 max-h-[360px] overflow-auto">
          {filteredSkills.map((skill) => {
            const selected = selectedSkillIds.includes(skill.skillId);
            return (
              <button key={skill.skillId} type="button" onClick={() => toggleSelectedSkill(skill.skillId)} className={`text-left p-3 ${selected ? "bg-sand-50 dark:bg-navy-700" : "bg-white dark:bg-navy-800"}`}>
                <span className="text-[10px] font-mono text-navy-400">{skill.kind === "davinci" ? skill.davinciPage : skill.category}</span>
                <span className="block mt-1 text-sm font-semibold text-navy-800 dark:text-sand-100">{selected ? "✓ " : ""}{skill.label}</span>
              </button>
            );
          })}
        </div>
        <div className="mt-3 flex items-center justify-between gap-4">
          <p className="text-xs text-navy-400">選択 {selectedSkillIds.length} Skill</p>
          <button type="button" onClick={addChapter} disabled={!chapterTitle.trim() || selectedSkillIds.length === 0} className="px-4 py-2 bg-navy-800 text-white text-xs disabled:bg-sand-200 disabled:text-navy-400 dark:bg-sand-100 dark:text-navy-900 dark:disabled:bg-navy-700">
            章を追加
          </button>
        </div>
      </section>

      <section className="mb-10">
        <div className="border-b-2 border-navy-900 dark:border-sand-100 pb-3 mb-3 flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">REGISTERED CHAPTERS</p>
            <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">Book → Skill Map</h2>
          </div>
          <span className="text-xs font-mono text-navy-400">{coverage.mappedSkillIds.length} UNIQUE SKILLS</span>
        </div>
        {book.chapters.length === 0 ? (
          <p className="py-6 text-sm text-navy-400">まだ章は登録されていません。目次を全部入力する必要はなく、Weddingで必要な章から登録します。</p>
        ) : (
          <div className="divide-y divide-sand-200 dark:divide-navy-600">
            {book.chapters.map((chapter) => (
              <article key={chapter.chapterId} className="py-4 grid grid-cols-1 lg:grid-cols-[1fr_2fr_auto] gap-4 items-start">
                <div>
                  <p className="font-bold text-navy-900 dark:text-sand-100">{chapter.title}</p>
                  <p className="mt-1 text-xs font-mono text-navy-400">{formatChapterPages(chapter)}</p>
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-2">
                  {chapter.skillIds.map((skillId) => (
                    <span key={skillId} className="text-xs border-b border-sand-300 dark:border-navy-500 text-navy-600 dark:text-navy-300">
                      {allLearningSkills.find((skill) => skill.skillId === skillId)?.label ?? skillId}
                    </span>
                  ))}
                </div>
                <button type="button" onClick={() => removeChapter(chapter.chapterId)} className="text-xs text-navy-400">削除</button>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="mb-10">
        <div className="border-b-2 border-navy-900 dark:border-sand-100 pb-3 mb-4">
          <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">COVERAGE GAPS</p>
          <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">Weddingで使うのに本の場所がまだ分からないSkill</h2>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {coverage.missingSkillIds.length === 0 ? (
            <span className="text-sm text-emerald-700 dark:text-emerald-300">登録済みOutcomeのSkillはすべて本へmappingされています。</span>
          ) : coverage.missingSkillIds.map((skillId) => (
            <span key={skillId} className="text-xs border-b border-amber-300 text-navy-600 dark:text-navy-300">
              {allLearningSkills.find((skill) => skill.skillId === skillId)?.label ?? skillId}
            </span>
          ))}
        </div>
      </section>

      <section className="mb-8 grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div>
          <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">EXPORT</p>
          <h2 className="mt-1 text-lg font-bold text-navy-900 dark:text-sand-100">Manifest JSON</h2>
          <textarea readOnly value={exportJson} rows={14} className="mt-3 w-full border border-sand-200 dark:border-navy-600 bg-sand-50 dark:bg-navy-900 px-3 py-2 text-xs font-mono text-navy-700 dark:text-navy-200" />
          <button type="button" onClick={copyManifest} className="mt-2 px-3 py-2 border border-navy-700 dark:border-sand-300 text-xs text-navy-700 dark:text-sand-200">{copyState}</button>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">IMPORT</p>
          <h2 className="mt-1 text-lg font-bold text-navy-900 dark:text-sand-100">JSONを検証して反映</h2>
          <textarea value={importText} onChange={(event) => setImportText(event.target.value)} rows={14} placeholder="Book Manifest JSONを貼り付け" className="mt-3 w-full border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 px-3 py-2 text-xs font-mono text-navy-700 dark:text-navy-200" />
          {importErrors.length > 0 && <ul className="mt-2 space-y-1 text-xs text-red-700 dark:text-red-300">{importErrors.map((error) => <li key={error}>× {error}</li>)}</ul>}
          <button type="button" onClick={importManifest} disabled={!importText.trim()} className="mt-2 px-3 py-2 bg-navy-800 text-white text-xs disabled:bg-sand-200 disabled:text-navy-400 dark:bg-sand-100 dark:text-navy-900">検証して反映</button>
        </div>
      </section>

      <div className="flex flex-wrap gap-4 text-xs">
        <Link to="/movie-coach" className="border-b border-navy-300 text-navy-600 dark:text-navy-300">Movie Coachへ戻る →</Link>
        <Link to="/movie-coach/dictionary" className="border-b border-navy-300 text-navy-600 dark:text-navy-300">逆引きDaVinci辞典 →</Link>
      </div>
    </div>
  );
}
