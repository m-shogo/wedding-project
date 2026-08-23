import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import {
  movieCoachIntentCategories,
  movieCoachIntents,
  type MovieCoachIntent,
  type MovieCoachIntentCategory,
} from "../data/movieCoachIntents";
import { learningSkills, productionOutcomes } from "../data/movieCoach";
import { getSkillState, learningStateLabel, loadCoachProgress } from "../lib/movieCoach";

const allCategory = "すべて" as const;
type CategoryFilter = MovieCoachIntentCategory | typeof allCategory;

function normalize(value: string) {
  return value.toLowerCase().replace(/[\s・/→＋+_-]+/g, "");
}

function matchIntent(intent: MovieCoachIntent, query: string) {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return true;

  const skillLabels = intent.skillIds
    .map((skillId) => learningSkills.find((skill) => skill.skillId === skillId)?.label ?? "")
    .join(" ");
  const haystack = normalize(
    [
      intent.title,
      intent.category,
      intent.goal,
      intent.davinciPage,
      ...intent.aliases,
      ...intent.features,
      skillLabels,
      intent.good,
      ...intent.bad,
      intent.why,
      intent.decisionRule,
    ].join(" "),
  );

  return haystack.includes(normalizedQuery);
}

export function MovieCoachDictionary() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>(allCategory);
  const [selectedId, setSelectedId] = useState(movieCoachIntents[0]?.intentId ?? "");
  const [progress] = useState(loadCoachProgress);

  const filtered = useMemo(
    () =>
      movieCoachIntents.filter(
        (intent) =>
          (category === allCategory || intent.category === category) && matchIntent(intent, query),
      ),
    [category, query],
  );

  const selected =
    filtered.find((intent) => intent.intentId === selectedId) ?? filtered[0] ?? null;

  const selectedSkills = selected
    ? selected.skillIds
        .map((skillId) => learningSkills.find((skill) => skill.skillId === skillId))
        .filter((skill) => skill !== undefined)
    : [];

  const selectedOutcomes = selected
    ? selected.weddingOutcomeIds
        .map((outcomeId) => productionOutcomes.find((outcome) => outcome.outcomeId === outcomeId))
        .filter((outcome) => outcome !== undefined)
    : [];

  return (
    <div>
      <Header
        title="逆引きDaVinci辞典"
        description="ソフトのページ名ではなく『何をしたいか』から、考え方 → DaVinci操作 → Wedding本番へたどる"
      />

      <div className="mb-6 border-y border-sand-200 dark:border-navy-600 py-4">
        <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
          <div className="flex-1">
            <label className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">WHAT DO YOU WANT TO DO?</label>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="例: 写真を映画っぽくゆっくり寄せたい / 顔を切りたくない / 音を自然につなぎたい"
              className="mt-1 w-full border-0 border-b-2 border-navy-800 dark:border-sand-200 bg-transparent px-0 py-2 text-base text-navy-900 dark:text-sand-100 focus:outline-none"
            />
          </div>
          <Link
            to="/movie-coach"
            className="shrink-0 text-xs border border-navy-700 dark:border-sand-300 px-3 py-2 text-navy-700 dark:text-sand-200"
          >
            ← 今日のMovie Coach
          </Link>
        </div>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
          {[allCategory, ...movieCoachIntentCategories].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`text-xs pb-0.5 border-b ${
                category === item
                  ? "border-navy-800 text-navy-900 font-bold dark:border-sand-100 dark:text-sand-100"
                  : "border-transparent text-navy-400 hover:text-navy-700 dark:hover:text-sand-200"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[0.8fr_1.4fr] gap-7">
        <aside>
          <div className="flex items-center justify-between border-b border-sand-200 dark:border-navy-600 pb-2 mb-2">
            <p className="text-[10px] tracking-[0.18em] font-semibold text-navy-400">INTENTS</p>
            <span className="text-xs font-mono text-navy-400">{filtered.length}</span>
          </div>
          <div className="divide-y divide-sand-100 dark:divide-navy-700">
            {filtered.map((intent) => {
              const active = selected?.intentId === intent.intentId;
              return (
                <button
                  key={intent.intentId}
                  type="button"
                  onClick={() => setSelectedId(intent.intentId)}
                  className={`w-full text-left py-3 pl-3 border-l-2 transition ${
                    active
                      ? "border-navy-900 bg-sand-50 dark:border-sand-100 dark:bg-navy-800"
                      : "border-transparent hover:border-sand-300 dark:hover:border-navy-500"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-navy-400">{intent.category}</span>
                    <span className="text-[10px] text-navy-400">{intent.practiceMinutes} min</span>
                  </div>
                  <p className={`mt-1 text-sm ${active ? "font-bold text-navy-900 dark:text-sand-100" : "text-navy-700 dark:text-navy-200"}`}>
                    {intent.title}
                  </p>
                </button>
              );
            })}
          </div>
          {filtered.length === 0 && (
            <p className="py-8 text-sm text-navy-400">一致する逆引き項目がありません。検索語を短くしてみてください。</p>
          )}
        </aside>

        {selected ? (
          <article className="min-w-0">
            <div className="border-b-2 border-navy-900 dark:border-sand-100 pb-4">
              <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-navy-400">
                <span>{selected.category}</span>
                <span>→</span>
                <span>{selected.davinciPage}</span>
                <span>→</span>
                <span>{selected.practiceMinutes} MIN PRACTICE</span>
              </div>
              <h2 className="mt-2 text-2xl font-bold text-navy-900 dark:text-sand-100">{selected.title}</h2>
              <p className="mt-2 text-sm text-navy-600 dark:text-navy-300">{selected.goal}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 py-6 border-b border-sand-200 dark:border-navy-600">
              <div>
                <p className="text-[10px] tracking-[0.18em] font-semibold text-navy-400">DAVINCI</p>
                <p className="mt-1 font-bold text-navy-800 dark:text-sand-100">{selected.davinciPage}</p>
                <p className="mt-2 text-xs font-mono leading-6 text-navy-500 dark:text-navy-300">
                  {selected.features.join(" / ")}
                </p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.18em] font-semibold text-navy-400">WHY?</p>
                <p className="mt-1 text-sm leading-6 text-navy-700 dark:text-navy-200">{selected.why}</p>
              </div>
            </div>

            <section className="py-6 border-b border-sand-200 dark:border-navy-600">
              <p className="text-[10px] tracking-[0.18em] font-semibold text-navy-400">3–12 MIN PRACTICE</p>
              <ol className="mt-3 space-y-2">
                {selected.practice.map((step, index) => (
                  <li key={step} className="flex gap-3 text-sm text-navy-700 dark:text-navy-200">
                    <span className="w-6 shrink-0 font-mono text-navy-400">{String(index + 1).padStart(2, "0")}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-b border-sand-200 dark:border-navy-600">
              <section className="py-6 md:pr-7 md:border-r border-sand-200 dark:border-navy-600">
                <p className="text-[10px] tracking-[0.18em] font-semibold text-emerald-700 dark:text-emerald-300">GOOD</p>
                <p className="mt-2 text-sm leading-6 text-navy-700 dark:text-navy-200">{selected.good}</p>
              </section>
              <section className="py-6 md:pl-7">
                <p className="text-[10px] tracking-[0.18em] font-semibold text-red-700 dark:text-red-300">BAD</p>
                <ul className="mt-2 space-y-1.5 text-sm text-navy-700 dark:text-navy-200">
                  {selected.bad.map((item) => (
                    <li key={item}>× {item}</li>
                  ))}
                </ul>
              </section>
            </div>

            <section className="py-6 border-b border-sand-200 dark:border-navy-600">
              <p className="text-[10px] tracking-[0.18em] font-semibold text-navy-400">DECISION RULE</p>
              <p className="mt-2 border-l-2 border-amber-400 pl-4 text-sm font-semibold leading-6 text-navy-800 dark:text-sand-100">
                {selected.decisionRule}
              </p>
            </section>

            <section className="py-6 border-b border-sand-200 dark:border-navy-600">
              <p className="text-[10px] tracking-[0.18em] font-semibold text-navy-400">LEARNING STATE</p>
              <div className="mt-3 space-y-2">
                {selectedSkills.map((skill) => {
                  const state = getSkillState(skill.skillId, progress.evidence);
                  return (
                    <div key={skill.skillId} className="flex flex-wrap items-center justify-between gap-2 text-sm">
                      <div>
                        <span className="font-semibold text-navy-800 dark:text-sand-100">{skill.label}</span>
                        <span className="ml-2 text-[10px] font-mono text-navy-400">{skill.kind === "davinci" ? skill.davinciPage : "CONCEPT"}</span>
                      </div>
                      <span className="text-xs text-navy-500 dark:text-navy-300">{learningStateLabel[state]}</span>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="py-6">
              <p className="text-[10px] tracking-[0.18em] font-semibold text-navy-400">WEDDING APPLY</p>
              {selectedOutcomes.length > 0 ? (
                <div className="mt-3 divide-y divide-sand-100 dark:divide-navy-700">
                  {selectedOutcomes.map((outcome) => (
                    <div key={outcome.outcomeId} className="py-2 flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-navy-800 dark:text-sand-100">{outcome.title}</span>
                      <span className="text-[10px] font-mono text-navy-400">{outcome.productionRef}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-2 text-sm text-navy-400">現在のOpening/Profile Outcomeへ直接割り当てず、必要素材が来た時に使うSkillです。</p>
              )}
            </section>
          </article>
        ) : (
          <div className="py-10 text-sm text-navy-400">検索結果を選ぶと、操作とWedding適用先を表示します。</div>
        )}
      </div>
    </div>
  );
}
