import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import {
  comparisonDimensions,
  comparisonPrinciples,
  comparisonProtocols,
  type ComparisonDimensionId,
} from "../data/comparisonLab";
import { allLearningSkills, allProductionOutcomes, getSkillState, learningStateLabel, loadCoachProgress } from "../lib/movieCoach";

const STORAGE_KEY = "wedding-movie-comparison-lab-v1";

type Winner = "a" | "b" | "tie";

interface ComparisonDecision {
  decisionId: string;
  outcomeId: string;
  dimensionId: ComparisonDimensionId;
  timecode: string;
  versionA: string;
  versionB: string;
  evidenceA: string;
  evidenceB: string;
  winner: Winner;
  reason: string;
  createdAt: string;
}

function loadDecisions(): ComparisonDecision[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function isVisualReference(value: string) {
  const trimmed = value.trim();
  return /^(https?:\/\/|\/).+\.(png|jpe?g|webp)(\?.*)?$/i.test(trimmed);
}

export function ComparisonLab() {
  const [decisions, setDecisions] = useState<ComparisonDecision[]>(loadDecisions);
  const [coachProgress] = useState(loadCoachProgress);
  const [selectedProtocolId, setSelectedProtocolId] = useState(comparisonProtocols[0]?.protocolId ?? "");
  const selectedProtocol = useMemo(
    () => comparisonProtocols.find((protocol) => protocol.protocolId === selectedProtocolId) ?? comparisonProtocols[0],
    [selectedProtocolId],
  );

  const [outcomeId, setOutcomeId] = useState(selectedProtocol?.outcomeId ?? allProductionOutcomes[0]?.outcomeId ?? "");
  const [dimensionId, setDimensionId] = useState<ComparisonDimensionId>(selectedProtocol?.dimensionId ?? "motion");
  const [timecode, setTimecode] = useState("00:00.0");
  const [versionA, setVersionA] = useState(selectedProtocol?.versionA ?? "Version A");
  const [versionB, setVersionB] = useState(selectedProtocol?.versionB ?? "Version B");
  const [evidenceA, setEvidenceA] = useState("");
  const [evidenceB, setEvidenceB] = useState("");
  const [winner, setWinner] = useState<Winner>("tie");
  const [reason, setReason] = useState("");

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(decisions));
  }, [decisions]);

  useEffect(() => {
    if (!selectedProtocol) return;
    setOutcomeId(selectedProtocol.outcomeId);
    setDimensionId(selectedProtocol.dimensionId);
    setVersionA(selectedProtocol.versionA);
    setVersionB(selectedProtocol.versionB);
    setEvidenceA("");
    setEvidenceB("");
    setWinner("tie");
    setReason("");
  }, [selectedProtocol]);

  const dimension = comparisonDimensions.find((item) => item.dimensionId === dimensionId) ?? comparisonDimensions[0];
  const linkedSkills = dimension.skillIds
    .map((skillId) => allLearningSkills.find((skill) => skill.skillId === skillId))
    .filter((skill) => skill !== undefined);

  function saveDecision() {
    const trimmedReason = reason.trim();
    if (!outcomeId || !versionA.trim() || !versionB.trim() || !trimmedReason) return;
    const next: ComparisonDecision = {
      decisionId: `compare-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      outcomeId,
      dimensionId,
      timecode: timecode.trim() || "--:--",
      versionA: versionA.trim(),
      versionB: versionB.trim(),
      evidenceA: evidenceA.trim(),
      evidenceB: evidenceB.trim(),
      winner,
      reason: trimmedReason,
      createdAt: new Date().toISOString(),
    };
    setDecisions((current) => [next, ...current]);
    setReason("");
  }

  function removeDecision(decisionId: string) {
    setDecisions((current) => current.filter((decision) => decision.decisionId !== decisionId));
  }

  const selectedOutcome = allProductionOutcomes.find((outcome) => outcome.outcomeId === outcomeId);

  return (
    <div>
      <Header
        title="BEFORE / AFTER DECISION LAB"
        description="A/Bを派手さで選ばず、同じWedding Outcomeで1要素だけ変えて採用理由をEvidenceとして残す"
      />

      <section className="mb-9 border-y border-sand-200 dark:border-navy-600 py-5">
        <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">COMPARISON PRINCIPLE</p>
        <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">一度に比較するのは1つだけ</h2>
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-3">
          {comparisonPrinciples.map((principle, index) => (
            <div key={principle} className="flex gap-3 text-sm text-navy-700 dark:text-navy-200">
              <span className="font-mono text-navy-400">{String(index + 1).padStart(2, "0")}</span>
              <span>{principle}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <div className="border-b-2 border-navy-900 dark:border-sand-100 pb-3 mb-4">
          <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">START FROM A WEDDING QUESTION</p>
          <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">比較テンプレートを選ぶ</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-sand-200 dark:bg-navy-600 border border-sand-200 dark:border-navy-600">
          {comparisonProtocols.map((protocol) => {
            const active = selectedProtocol?.protocolId === protocol.protocolId;
            return (
              <button
                key={protocol.protocolId}
                type="button"
                onClick={() => setSelectedProtocolId(protocol.protocolId)}
                className={`text-left p-4 ${active ? "bg-sand-50 dark:bg-navy-700" : "bg-white dark:bg-navy-800"}`}
              >
                <span className="text-[10px] font-mono text-navy-400">{protocol.dimensionId} / {protocol.outcomeId}</span>
                <span className="block mt-1 text-sm font-bold text-navy-800 dark:text-sand-100">{protocol.title}</span>
                <span className="block mt-2 text-xs leading-5 text-navy-500 dark:text-navy-300">A: {protocol.versionA}<br />B: {protocol.versionB}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="mb-10">
        <div className="border-b-2 border-navy-900 dark:border-sand-100 pb-3 mb-4">
          <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">COMPARE NOW</p>
          <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">A/B Decisionを残す</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <label className="text-xs text-navy-500 dark:text-navy-300">
            Wedding Outcome
            <select value={outcomeId} onChange={(event) => setOutcomeId(event.target.value)} className="mt-1 w-full border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 px-2 py-2 text-sm text-navy-800 dark:text-sand-100">
              <optgroup label="Opening">
                {allProductionOutcomes.filter((outcome) => outcome.movieId === "opening").map((outcome) => (
                  <option key={outcome.outcomeId} value={outcome.outcomeId}>{outcome.title}</option>
                ))}
              </optgroup>
              <optgroup label="Profile">
                {allProductionOutcomes.filter((outcome) => outcome.movieId === "profile").map((outcome) => (
                  <option key={outcome.outcomeId} value={outcome.outcomeId}>{outcome.title}</option>
                ))}
              </optgroup>
            </select>
          </label>
          <label className="text-xs text-navy-500 dark:text-navy-300">
            比較Dimension
            <select value={dimensionId} onChange={(event) => setDimensionId(event.target.value as ComparisonDimensionId)} className="mt-1 w-full border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 px-2 py-2 text-sm text-navy-800 dark:text-sand-100">
              {comparisonDimensions.map((item) => <option key={item.dimensionId} value={item.dimensionId}>{item.label}</option>)}
            </select>
          </label>
          <label className="text-xs text-navy-500 dark:text-navy-300">
            Timecode / 区間
            <input value={timecode} onChange={(event) => setTimecode(event.target.value)} className="mt-1 w-full border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 px-2 py-2 text-sm font-mono text-navy-800 dark:text-sand-100" />
          </label>
        </div>

        <div className="mt-5 border-l-2 border-amber-400 pl-4 py-1">
          <p className="text-[10px] tracking-widest font-semibold text-amber-700 dark:text-amber-300">DECISION QUESTION</p>
          <p className="mt-1 text-sm font-semibold text-navy-800 dark:text-sand-100">{dimension.question}</p>
          <p className="mt-1 text-xs text-navy-500 dark:text-navy-300">Rule: {dimension.decisionRule}</p>
        </div>

        <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[
            { id: "a", label: "VERSION A", value: versionA, setValue: setVersionA, evidence: evidenceA, setEvidence: setEvidenceA },
            { id: "b", label: "VERSION B", value: versionB, setValue: setVersionB, evidence: evidenceB, setEvidence: setEvidenceB },
          ].map((version) => (
            <div key={version.id} className="border-t-2 border-navy-800 dark:border-sand-100 pt-3">
              <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">{version.label}</p>
              <input value={version.value} onChange={(event) => version.setValue(event.target.value)} className="mt-2 w-full border-0 border-b border-sand-300 dark:border-navy-600 bg-transparent px-0 py-2 text-base font-semibold text-navy-900 dark:text-sand-100" />
              <label className="block mt-3 text-xs text-navy-500 dark:text-navy-300">
                Evidence ref / optional image URL
                <input value={version.evidence} onChange={(event) => version.setEvidence(event.target.value)} placeholder="例: /qa/opening/frame-44s.png または notes" className="mt-1 w-full border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 px-2 py-2 text-xs font-mono text-navy-700 dark:text-navy-200" />
              </label>
              {isVisualReference(version.evidence) && (
                <div className="mt-3 aspect-video border border-sand-200 dark:border-navy-600 overflow-hidden bg-sand-50 dark:bg-navy-900">
                  <img src={version.evidence} alt={`${version.label} evidence`} className="w-full h-full object-contain" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[0.6fr_1.4fr_auto] gap-4 items-end">
          <label className="text-xs text-navy-500 dark:text-navy-300">
            採用
            <select value={winner} onChange={(event) => setWinner(event.target.value as Winner)} className="mt-1 w-full border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 px-2 py-2 text-sm text-navy-800 dark:text-sand-100">
              <option value="a">A</option>
              <option value="b">B</option>
              <option value="tie">Tie / 差がない</option>
            </select>
          </label>
          <label className="text-xs text-navy-500 dark:text-navy-300">
            Why? 採用理由
            <textarea value={reason} onChange={(event) => setReason(event.target.value)} rows={3} placeholder="例: PushありよりStaticの方が写真の表情へ先に目が行くため" className="mt-1 w-full border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 px-3 py-2 text-sm text-navy-800 dark:text-sand-100" />
          </label>
          <button type="button" onClick={saveDecision} disabled={!reason.trim()} className="px-4 py-2 bg-navy-800 text-white text-xs disabled:bg-sand-200 disabled:text-navy-400 dark:bg-sand-100 dark:text-navy-900 dark:disabled:bg-navy-700 dark:disabled:text-navy-500">
            Decision保存
          </button>
        </div>

        <div className="mt-6 border-y border-sand-200 dark:border-navy-600 py-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="text-[10px] tracking-widest font-semibold text-navy-400">LEARN NEXT</span>
            {linkedSkills.map((skill) => {
              const state = getSkillState(skill.skillId, coachProgress.evidence);
              return (
                <Link key={skill.skillId} to={`/movie-coach/dictionary?q=${encodeURIComponent(skill.label)}`} className="text-xs border-b border-navy-300 text-navy-700 dark:text-navy-200">
                  {skill.label} · {learningStateLabel[state]}
                </Link>
              );
            })}
          </div>
          {selectedOutcome && <p className="mt-2 text-[10px] font-mono text-navy-400">APPLY: {selectedOutcome.productionRef}</p>}
        </div>
      </section>

      {selectedProtocol && (
        <section className="mb-10 border-y border-sand-200 dark:border-navy-600 py-5">
          <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">PROTOCOL NOTES</p>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-bold text-navy-800 dark:text-sand-100">見るポイント</p>
              <ul className="mt-2 space-y-1 text-sm text-navy-600 dark:text-navy-300">
                {selectedProtocol.compare.map((item) => <li key={item}>・{item}</li>)}
              </ul>
            </div>
            <div>
              <p className="text-sm font-bold text-navy-800 dark:text-sand-100">採用基準</p>
              <p className="mt-2 text-sm leading-6 text-navy-600 dark:text-navy-300">{selectedProtocol.preferWhen}</p>
              <p className="mt-3 text-xs text-red-700 dark:text-red-300">× {selectedProtocol.avoid}</p>
            </div>
          </div>
        </section>
      )}

      <section className="mb-8">
        <div className="flex items-end justify-between border-b-2 border-navy-900 dark:border-sand-100 pb-3 mb-3">
          <div>
            <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">DECISION LOG</p>
            <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">採用理由を再利用する</h2>
          </div>
          <span className="text-xs font-mono text-navy-400">{decisions.length} DECISIONS</span>
        </div>
        {decisions.length === 0 ? (
          <p className="py-6 text-sm text-navy-400">まだDecisionはありません。同じshotをA/Bで作り、理由を1文で残します。</p>
        ) : (
          <div className="divide-y divide-sand-200 dark:divide-navy-600">
            {decisions.map((decision) => {
              const outcome = allProductionOutcomes.find((item) => item.outcomeId === decision.outcomeId);
              return (
                <article key={decision.decisionId} className="py-4 grid grid-cols-1 lg:grid-cols-[110px_1fr_130px] gap-4">
                  <div>
                    <p className="font-mono font-bold text-navy-900 dark:text-sand-100">{decision.timecode}</p>
                    <p className="text-[10px] font-mono text-navy-400">{decision.dimensionId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-navy-400">{outcome?.shortLabel ?? decision.outcomeId}</p>
                    <p className="mt-1 text-sm font-semibold text-navy-800 dark:text-sand-100">
                      {decision.versionA} <span className="text-navy-400">vs</span> {decision.versionB}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-navy-600 dark:text-navy-300">{decision.reason}</p>
                  </div>
                  <div className="lg:text-right">
                    <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300">WINNER: {decision.winner.toUpperCase()}</p>
                    <button type="button" onClick={() => removeDecision(decision.decisionId)} className="mt-2 text-xs text-navy-400">削除</button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <div className="flex flex-wrap gap-4 text-xs">
        <Link to="/movie-coach/review" className="border-b border-navy-300 text-navy-600 dark:text-navy-300">← Movie Review</Link>
        <Link to="/movie-coach/color" className="border-b border-navy-300 text-navy-600 dark:text-navy-300">Color Learning →</Link>
        <Link to="/movie-coach/audio" className="border-b border-navy-300 text-navy-600 dark:text-navy-300">Audio Learning →</Link>
      </div>
    </div>
  );
}
