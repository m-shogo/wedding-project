import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { automationCandidates } from "../data/automationCandidates";
import {
  allLearningSkills,
  getSkillState,
  learningStateLabel,
  loadCoachProgress,
  saveCoachProgress,
} from "../lib/movieCoach";
import {
  createAutomatedEvidence,
  getAutomationReadiness,
  hasAutomatedEvidence,
  type AutomationReadinessStatus,
} from "../lib/automationReadiness";

const statusOrder: AutomationReadinessStatus[] = [
  "ready",
  "needs_wedding_use",
  "needs_practice",
  "needs_learning",
  "human_only",
  "automated",
];

const statusTone: Record<AutomationReadinessStatus, string> = {
  human_only: "text-navy-600 dark:text-navy-300",
  needs_learning: "text-sky-700 dark:text-sky-300",
  needs_practice: "text-amber-700 dark:text-amber-300",
  needs_wedding_use: "text-orange-700 dark:text-orange-300",
  ready: "text-emerald-700 dark:text-emerald-300",
  automated: "text-violet-700 dark:text-violet-300",
};

export function AutomationReadiness() {
  const [progress, setProgress] = useState(loadCoachProgress);
  const [filter, setFilter] = useState<AutomationReadinessStatus | "all">("all");
  const [copyState, setCopyState] = useState<string | null>(null);

  useEffect(() => {
    saveCoachProgress(progress);
  }, [progress]);

  const rows = useMemo(
    () =>
      allLearningSkills.map((skill) => ({
        skill,
        readiness: getAutomationReadiness(skill, progress.evidence),
        candidates: automationCandidates.filter((candidate) => candidate.skillId === skill.skillId),
      })),
    [progress.evidence],
  );

  const counts = useMemo(
    () =>
      statusOrder.reduce<Record<AutomationReadinessStatus, number>>(
        (acc, status) => {
          acc[status] = rows.filter((row) => row.readiness.status === status).length;
          return acc;
        },
        {
          human_only: 0,
          needs_learning: 0,
          needs_practice: 0,
          needs_wedding_use: 0,
          ready: 0,
          automated: 0,
        },
      ),
    [rows],
  );

  const visibleRows = rows.filter((row) => filter === "all" || row.readiness.status === filter);

  async function copyHandoff(candidateId: string) {
    const candidate = automationCandidates.find((item) => item.candidateId === candidateId);
    if (!candidate) return;
    try {
      await navigator.clipboard.writeText(candidate.handoff);
      setCopyState(candidateId);
      window.setTimeout(() => setCopyState(null), 1500);
    } catch {
      setCopyState(null);
    }
  }

  function markAutomated(skillId: string) {
    setProgress((current) => {
      const skill = allLearningSkills.find((item) => item.skillId === skillId);
      if (!skill || hasAutomatedEvidence(skillId, current.evidence)) return current;
      const readiness = getAutomationReadiness(skill, current.evidence);
      if (readiness.status !== "ready") return current;
      return { ...current, evidence: [...current.evidence, createAutomatedEvidence(skill)] };
    });
  }

  return (
    <div>
      <Header
        title="AUTO MODE / READINESS"
        description="分からない操作をAIへ丸投げせず、理解 → 練習 → Wedding実使用のEvidenceに応じて自動化してよい範囲を決める"
      />

      <section className="mb-8 border-y border-sand-200 dark:border-navy-600 py-5 grid grid-cols-2 lg:grid-cols-5 gap-5">
        <div>
          <p className="text-[10px] tracking-[0.18em] font-semibold text-navy-400">READY</p>
          <p className="mt-1 text-2xl font-mono font-bold text-emerald-700 dark:text-emerald-300">{counts.ready}</p>
          <p className="text-xs text-navy-400">自動化候補</p>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.18em] font-semibold text-navy-400">WEDDING FIRST</p>
          <p className="mt-1 text-2xl font-mono font-bold text-orange-700 dark:text-orange-300">{counts.needs_wedding_use}</p>
          <p className="text-xs text-navy-400">本番で1回使う</p>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.18em] font-semibold text-navy-400">PRACTICE FIRST</p>
          <p className="mt-1 text-2xl font-mono font-bold text-amber-700 dark:text-amber-300">{counts.needs_practice}</p>
          <p className="text-xs text-navy-400">練習が必要</p>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.18em] font-semibold text-navy-400">HUMAN</p>
          <p className="mt-1 text-2xl font-mono font-bold text-navy-900 dark:text-sand-100">{counts.human_only}</p>
          <p className="text-xs text-navy-400">判断を残す</p>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.18em] font-semibold text-navy-400">AUTOMATED</p>
          <p className="mt-1 text-2xl font-mono font-bold text-violet-700 dark:text-violet-300">{counts.automated}</p>
          <p className="text-xs text-navy-400">Evidence記録済み</p>
        </div>
      </section>

      <section className="mb-9 border-l-2 border-navy-900 dark:border-sand-100 pl-5 py-1">
        <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">AUTO MODE PRINCIPLE</p>
        <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">AIには判断ではなく、承認済み条件の適用と検査を渡す</h2>
        <div className="mt-3 grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-2 text-sm text-navy-600 dark:text-navy-300">
          <p>✓ Render QA / duration / codec / marker候補など機械的な作業は早く任せる。</p>
          <p>✓ Crop・Motion・Colorは一度Wedding素材で自分の判断を作ってから値の適用を任せる。</p>
          <p>× Rhythm・Stillness・Story・Typographyの最終判断を『AIが良いと言ったから』で決めない。</p>
          <p>× 自動化した結果をReviewせず、そのままFinalへ通さない。</p>
        </div>
      </section>

      <section className="mb-10">
        <div className="border-b-2 border-navy-900 dark:border-sand-100 pb-3 mb-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">READINESS MAP</p>
            <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">どこまで自分で理解し、どこからAIへ渡すか</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setFilter("all")} className={`text-xs px-2 py-1 border ${filter === "all" ? "border-navy-800 text-navy-800 dark:border-sand-200 dark:text-sand-100" : "border-sand-200 text-navy-400 dark:border-navy-600"}`}>ALL</button>
            {statusOrder.map((status) => (
              <button key={status} type="button" onClick={() => setFilter(status)} className={`text-xs px-2 py-1 border ${filter === status ? "border-navy-800 dark:border-sand-200" : "border-sand-200 dark:border-navy-600"} ${statusTone[status]}`}>
                {status.replace(/_/g, " ")} {counts[status]}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-sand-200 dark:divide-navy-600">
          {visibleRows.map(({ skill, readiness, candidates }) => {
            const currentState = getSkillState(skill.skillId, progress.evidence);
            return (
              <article key={skill.skillId} className="py-5 grid grid-cols-1 xl:grid-cols-[0.9fr_0.8fr_2fr] gap-5">
                <div>
                  <p className="text-[10px] tracking-widest font-semibold text-navy-400">{skill.kind === "concept" ? skill.category : `DAVINCI / ${skill.davinciPage}`}</p>
                  <h3 className="mt-1 font-bold text-navy-900 dark:text-sand-100">{skill.label}</h3>
                  <p className="mt-1 text-xs text-navy-400">現在: {learningStateLabel[currentState]}</p>
                </div>
                <div>
                  <p className={`text-sm font-bold ${statusTone[readiness.status]}`}>{readiness.label}</p>
                  <p className="mt-1 text-xs leading-5 text-navy-500 dark:text-navy-300">次: {readiness.next}</p>
                  <p className="mt-2 text-[10px] font-mono text-navy-400">policy: {skill.automationPolicy}</p>
                </div>
                <div>
                  {candidates.length === 0 ? (
                    <p className="text-sm text-navy-400">自動化Recipeは登録していません。AIは比較・説明・Review補助まで。</p>
                  ) : (
                    <div className="space-y-4">
                      {candidates.map((candidate) => (
                        <div key={candidate.candidateId} className="border-l border-sand-200 dark:border-navy-600 pl-4">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                              <p className="text-sm font-semibold text-navy-800 dark:text-sand-100">{candidate.label}</p>
                              <p className="mt-1 text-[10px] font-mono text-navy-400">{candidate.tools.join(" / ")}</p>
                            </div>
                            <button type="button" onClick={() => copyHandoff(candidate.candidateId)} className="text-xs border border-sand-200 dark:border-navy-600 px-2 py-1 text-navy-500 dark:text-navy-300">
                              {copyState === candidate.candidateId ? "コピー済み" : "Handoffをコピー"}
                            </button>
                          </div>
                          <div className="mt-2 grid grid-cols-1 lg:grid-cols-2 gap-3 text-xs leading-5">
                            <p className="text-navy-600 dark:text-navy-300"><span className="font-semibold text-emerald-700 dark:text-emerald-300">AUTO</span> {candidate.automate}</p>
                            <p className="text-navy-600 dark:text-navy-300"><span className="font-semibold text-amber-700 dark:text-amber-300">HUMAN</span> {candidate.keepHuman}</p>
                          </div>
                          <p className="mt-2 text-[10px] text-navy-400">Evidence: {candidate.evidenceToKeep}</p>
                          {readiness.status === "ready" && (
                            <button type="button" onClick={() => markAutomated(skill.skillId)} className="mt-3 text-xs border border-violet-300 dark:border-violet-700 px-2.5 py-1.5 text-violet-700 dark:text-violet-300">
                              実装・Review後に「自動化済み」へ記録
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <div className="flex flex-wrap gap-4 text-xs">
        <Link to="/movie-coach" className="border-b border-navy-300 text-navy-600 dark:text-navy-300">Movie Coach / Today →</Link>
        <Link to="/movie-coach/review" className="border-b border-navy-300 text-navy-600 dark:text-navy-300">自動化後のMovie Review →</Link>
        <Link to="/movie-coach/compare" className="border-b border-navy-300 text-navy-600 dark:text-navy-300">Before / Afterで判断 →</Link>
      </div>
    </div>
  );
}
