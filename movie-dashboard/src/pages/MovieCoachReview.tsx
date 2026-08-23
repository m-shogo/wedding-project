import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import {
  movieReviewCategories,
  openingQaEvidenceSources,
  type MovieReviewCategory,
  type MovieReviewFinding,
  type MovieReviewSource,
} from "../data/movieCoachReview";
import {
  allLearningSkills,
  allProductionOutcomes,
  getSkillState,
  learningStateLabel,
  loadCoachProgress,
} from "../lib/movieCoach";

const REVIEW_STORAGE_KEY = "wedding-movie-coach-review-v1";

function loadFindings(): MovieReviewFinding[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(REVIEW_STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function skillLearningTarget(skillId: string, profileSpecific: boolean) {
  const skill = allLearningSkills.find((item) => item.skillId === skillId);
  if (!skill) return null;

  if (profileSpecific) {
    const phase = allProductionOutcomes.find(
      (outcome) =>
        outcome.movieId === "profile" &&
        [...outcome.conceptSkillIds, ...outcome.davinciSkillIds].includes(skillId),
    );
    return {
      skill,
      to: phase ? `/movie-coach/profile#${phase.outcomeId}` : "/movie-coach/profile",
    };
  }

  return {
    skill,
    to: `/movie-coach/dictionary?q=${encodeURIComponent(skill.label)}`,
  };
}

export function MovieCoachReview() {
  const openingOutcomes = allProductionOutcomes.filter((outcome) => outcome.movieId === "opening");
  const profileOutcomes = allProductionOutcomes.filter((outcome) => outcome.movieId === "profile");
  const [findings, setFindings] = useState<MovieReviewFinding[]>(loadFindings);
  const [outcomeId, setOutcomeId] = useState(openingOutcomes[0]?.outcomeId ?? profileOutcomes[0]?.outcomeId ?? "");
  const [timecode, setTimecode] = useState("00:00.0");
  const [category, setCategory] = useState<MovieReviewCategory>("timing");
  const [note, setNote] = useState("");
  const [source, setSource] = useState<MovieReviewSource>("manual");
  const [coachProgress] = useState(loadCoachProgress);

  useEffect(() => {
    window.localStorage.setItem(REVIEW_STORAGE_KEY, JSON.stringify(findings));
  }, [findings]);

  const openFindings = findings.filter((finding) => finding.status === "open");
  const resolvedFindings = findings.filter((finding) => finding.status === "resolved");
  const selectedOutcome = allProductionOutcomes.find((outcome) => outcome.outcomeId === outcomeId);

  const selectedCategory = useMemo(
    () => movieReviewCategories.find((item) => item.category === category) ?? movieReviewCategories[0],
    [category],
  );

  function addFinding() {
    const trimmed = note.trim();
    if (!trimmed || !outcomeId) return;

    const finding: MovieReviewFinding = {
      findingId: `review-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      outcomeId,
      timecode: timecode.trim() || "--:--",
      category,
      note: trimmed,
      source,
      status: "open",
      createdAt: new Date().toISOString(),
      resolvedAt: null,
    };

    setFindings((current) => [finding, ...current]);
    setNote("");
  }

  function toggleResolved(findingId: string) {
    setFindings((current) =>
      current.map((finding) => {
        if (finding.findingId !== findingId) return finding;
        const nextResolved = finding.status !== "resolved";
        return {
          ...finding,
          status: nextResolved ? "resolved" : "open",
          resolvedAt: nextResolved ? new Date().toISOString() : null,
        };
      }),
    );
  }

  function removeFinding(findingId: string) {
    setFindings((current) => current.filter((finding) => finding.findingId !== findingId));
  }

  return (
    <div>
      <Header
        title="MOVIE REVIEW"
        description="Opening / Profileを同じFinding → Why → Skill → Fix → Re-reviewループで改善する"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 border-y border-sand-200 dark:border-navy-600 py-4 mb-7">
        <div>
          <p className="text-[10px] tracking-[0.18em] text-navy-400 font-semibold">OPEN FINDINGS</p>
          <p className="mt-1 text-2xl font-mono font-bold text-navy-900 dark:text-sand-100">{openFindings.length}</p>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.18em] text-navy-400 font-semibold">RESOLVED</p>
          <p className="mt-1 text-2xl font-mono font-bold text-navy-900 dark:text-sand-100">{resolvedFindings.length}</p>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.18em] text-navy-400 font-semibold">OUTCOMES</p>
          <p className="mt-1 text-2xl font-mono font-bold text-navy-900 dark:text-sand-100">{allProductionOutcomes.length}</p>
          <p className="text-xs text-navy-400">Opening + Profile</p>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.18em] text-navy-400 font-semibold">LOOP</p>
          <p className="mt-1 text-sm font-bold text-navy-900 dark:text-sand-100">OBSERVE → FIX → REVIEW</p>
        </div>
      </div>

      <section className="mb-9">
        <div className="border-b-2 border-navy-900 dark:border-sand-100 pb-3 mb-4">
          <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">ADD REVIEW FINDING</p>
          <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">気になったことを1問題 = 1Findingで分ける</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_0.7fr_1fr_0.8fr] gap-3">
          <label className="text-xs text-navy-500 dark:text-navy-300">
            Wedding Outcome
            <select
              value={outcomeId}
              onChange={(event) => setOutcomeId(event.target.value)}
              className="mt-1 w-full border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 px-2 py-2 text-sm text-navy-800 dark:text-sand-100"
            >
              <optgroup label="Opening Movie">
                {openingOutcomes.map((outcome) => (
                  <option key={outcome.outcomeId} value={outcome.outcomeId}>{outcome.title}</option>
                ))}
              </optgroup>
              <optgroup label="Profile Movie">
                {profileOutcomes.map((outcome) => (
                  <option key={outcome.outcomeId} value={outcome.outcomeId}>{outcome.title}</option>
                ))}
              </optgroup>
            </select>
          </label>
          <label className="text-xs text-navy-500 dark:text-navy-300">
            Timecode
            <input
              value={timecode}
              onChange={(event) => setTimecode(event.target.value)}
              placeholder="00:07.4"
              className="mt-1 w-full border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 px-2 py-2 text-sm font-mono text-navy-800 dark:text-sand-100"
            />
          </label>
          <label className="text-xs text-navy-500 dark:text-navy-300">
            Category
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value as MovieReviewCategory)}
              className="mt-1 w-full border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 px-2 py-2 text-sm text-navy-800 dark:text-sand-100"
            >
              {movieReviewCategories.map((item) => (
                <option key={item.category} value={item.category}>{item.label}</option>
              ))}
            </select>
          </label>
          <label className="text-xs text-navy-500 dark:text-navy-300">
            Source
            <select
              value={source}
              onChange={(event) => setSource(event.target.value as MovieReviewSource)}
              className="mt-1 w-full border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 px-2 py-2 text-sm text-navy-800 dark:text-sand-100"
            >
              <option value="manual">Manual review</option>
              <option value="qa">Existing QA</option>
              <option value="ai">AI-assisted review</option>
            </select>
          </label>
        </div>

        <label className="block mt-3 text-xs text-navy-500 dark:text-navy-300">
          Finding
          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            rows={3}
            placeholder={selectedOutcome?.movieId === "profile" ? "例: 新郎学生時代が同じテンポで続き、写真一覧に見える" : "例: Heroのpushが少し強く、写真よりmotionが先に目に入る"}
            className="mt-1 w-full border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 px-3 py-2 text-sm text-navy-800 dark:text-sand-100"
          />
        </label>

        <div className="mt-3 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 items-start">
          <div className="border-l-2 border-amber-400 pl-4 py-1">
            <p className="text-[10px] tracking-widest font-semibold text-amber-700 dark:text-amber-300">
              COACH ROUTING · {selectedOutcome?.movieId?.toUpperCase() ?? "MOVIE"}
            </p>
            <p className="mt-1 text-sm text-navy-700 dark:text-navy-200">{selectedCategory.question}</p>
            <p className="mt-1 text-xs text-navy-500 dark:text-navy-300">修正の出発点: {selectedCategory.defaultFix}</p>
          </div>
          <button
            type="button"
            onClick={addFinding}
            className="px-4 py-2 bg-navy-800 text-white text-xs dark:bg-sand-100 dark:text-navy-900"
          >
            Findingを追加
          </button>
        </div>
      </section>

      <section className="mb-10">
        <div className="flex items-end justify-between border-b-2 border-navy-900 dark:border-sand-100 pb-3 mb-3">
          <div>
            <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">REVIEW INBOX</p>
            <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">修正待ち</h2>
          </div>
          <span className="text-xs font-mono text-navy-400">{openFindings.length} OPEN</span>
        </div>

        {openFindings.length === 0 ? (
          <p className="py-6 text-sm text-navy-400">Findingはまだありません。preview / Full Passを見て、1つの問題を1件として追加します。</p>
        ) : (
          <div className="divide-y divide-sand-200 dark:divide-navy-600">
            {openFindings.map((finding) => {
              const categoryDef =
                movieReviewCategories.find((item) => item.category === finding.category) ?? movieReviewCategories[0];
              const outcome = allProductionOutcomes.find((item) => item.outcomeId === finding.outcomeId);
              const profileSkillIds = outcome?.movieId === "profile" ? categoryDef.profileSkillIds ?? [] : [];
              const routedSkillIds = [...new Set([...categoryDef.skillIds, ...profileSkillIds])];

              return (
                <article key={finding.findingId} className="py-5">
                  <div className="grid grid-cols-1 lg:grid-cols-[110px_1fr_1fr] gap-5">
                    <div>
                      <p className="font-mono text-lg font-bold text-navy-900 dark:text-sand-100">{finding.timecode}</p>
                      <p className="mt-1 text-[10px] uppercase font-mono text-navy-400">{finding.source} / {finding.category}</p>
                      <p className="mt-1 text-[10px] uppercase font-mono text-navy-400">{outcome?.movieId ?? "unknown"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-navy-400">{outcome?.shortLabel ?? finding.outcomeId}</p>
                      <p className="mt-1 text-sm font-semibold leading-6 text-navy-800 dark:text-sand-100">{finding.note}</p>
                      <p className="mt-3 text-[10px] tracking-widest font-semibold text-navy-400">FIX</p>
                      <p className="mt-1 text-xs leading-5 text-navy-600 dark:text-navy-300">{categoryDef.defaultFix}</p>
                    </div>
                    <div>
                      <p className="text-[10px] tracking-widest font-semibold text-navy-400">LEARN NEXT</p>
                      <div className="mt-2 space-y-2">
                        {routedSkillIds.map((skillId) => {
                          const profileSpecific = profileSkillIds.includes(skillId);
                          const target = skillLearningTarget(skillId, profileSpecific);
                          if (!target) return null;
                          const state = getSkillState(skillId, coachProgress.evidence);
                          return (
                            <div key={skillId} className="flex items-center justify-between gap-3 text-xs">
                              <Link
                                to={target.to}
                                className="font-semibold text-navy-700 dark:text-navy-200 underline underline-offset-2"
                              >
                                {target.skill.label} →
                              </Link>
                              <span className="text-navy-400">{learningStateLabel[state]}</span>
                            </div>
                          );
                        })}
                      </div>
                      <div className="mt-4 flex gap-2">
                        <button
                          type="button"
                          onClick={() => toggleResolved(finding.findingId)}
                          className="px-3 py-1.5 text-xs border border-emerald-300 text-emerald-700 dark:border-emerald-700 dark:text-emerald-300"
                        >
                          修正して再確認済み
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFinding(finding.findingId)}
                          className="px-2 py-1.5 text-xs text-navy-400"
                        >
                          削除
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <section className="mb-10 grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div>
          <div className="border-b-2 border-navy-900 dark:border-sand-100 pb-3 mb-3">
            <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">EXISTING OPENING QA</p>
            <h2 className="mt-1 text-lg font-bold text-navy-900 dark:text-sand-100">既存Evidenceを先に使う</h2>
          </div>
          <div className="divide-y divide-sand-200 dark:divide-navy-600">
            {openingQaEvidenceSources.map((qa) => (
              <article key={qa.sourceId} className="py-4">
                <p className="font-bold text-sm text-navy-900 dark:text-sand-100">{qa.label}</p>
                <code className="block mt-2 text-[11px] font-mono text-navy-500 dark:text-navy-300 break-all">{qa.command}</code>
                <p className="mt-2 text-xs text-navy-700 dark:text-navy-200">{qa.evidence}</p>
                <p className="mt-1 text-[11px] leading-5 text-navy-400">境界: {qa.boundary}</p>
              </article>
            ))}
          </div>
        </div>

        <div>
          <div className="border-b-2 border-navy-900 dark:border-sand-100 pb-3 mb-3">
            <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">PROFILE REVIEW EVIDENCE</p>
            <h2 className="mt-1 text-lg font-bold text-navy-900 dark:text-sand-100">まだ自動解析を捏造しない</h2>
          </div>
          <div className="divide-y divide-sand-200 dark:divide-navy-600">
            <div className="py-4">
              <p className="font-bold text-sm text-navy-900 dark:text-sand-100">Profile Planner / Scene Data</p>
              <p className="mt-2 text-xs text-navy-700 dark:text-navy-200">既存photo slot、選定写真、comment、scene purposeをStory / crop Reviewの事実として使う。</p>
              <Link to="/profile-planner" className="inline-block mt-2 text-xs underline text-navy-600 dark:text-navy-300">Profile Planner →</Link>
            </div>
            <div className="py-4">
              <p className="font-bold text-sm text-navy-900 dark:text-sand-100">Profile Coach DONE WHEN</p>
              <p className="mt-2 text-xs text-navy-700 dark:text-navy-200">各PhaseのNarrative / Caption / Pacing / Ending条件をReview baselineとして使う。</p>
              <Link to="/movie-coach/profile" className="inline-block mt-2 text-xs underline text-navy-600 dark:text-navy-300">Profile Movie Coach →</Link>
            </div>
            <div className="py-4">
              <p className="font-bold text-sm text-navy-900 dark:text-sand-100">Full Pass Findings</p>
              <p className="mt-2 text-xs text-navy-700 dark:text-navy-200">4〜6分を止めずに再生し、退屈・読めない・強い瞬間をtimecode Findingとして残す。</p>
              <p className="mt-2 text-[11px] leading-5 text-amber-700 dark:text-amber-300">Profile用の自動frame/audio QAはまだ未実装。存在しない解析結果をEvidence扱いしない。</p>
            </div>
          </div>
        </div>
      </section>

      {resolvedFindings.length > 0 && (
        <section>
          <div className="border-b border-sand-200 dark:border-navy-600 pb-2 mb-2">
            <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">RESOLVED / RE-REVIEWED</p>
          </div>
          <div className="space-y-2">
            {resolvedFindings.map((finding) => (
              <button
                key={finding.findingId}
                type="button"
                onClick={() => toggleResolved(finding.findingId)}
                className="w-full text-left flex flex-wrap items-center gap-x-4 gap-y-1 py-2 text-xs text-navy-400"
              >
                <span className="font-mono">{finding.timecode}</span>
                <span>{finding.note}</span>
                <span className="ml-auto">resolved · reopen</span>
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
