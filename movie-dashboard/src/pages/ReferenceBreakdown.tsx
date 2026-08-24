import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import {
  referenceBreakdownExamples,
  referenceBreakdownPrinciples,
  referenceTechniques,
  type ReferenceImplementation,
  type ReferenceTechniqueId,
} from "../data/referenceBreakdown";
import {
  allLearningSkills,
  allProductionOutcomes,
  getSkillState,
  learningStateLabel,
  loadCoachProgress,
} from "../lib/movieCoach";

const STORAGE_KEY = "wedding-movie-reference-breakdown-v1";

type ReferenceSourceType = "screenshot" | "video" | "scene" | "other";

interface ReferenceBreakdownRecord {
  recordId: string;
  sourceType: ReferenceSourceType;
  sourceRef: string;
  timecode: string;
  observation: string;
  techniqueIds: ReferenceTechniqueId[];
  estimatedFrames: string;
  implementation: ReferenceImplementation;
  outcomeId: string;
  weddingDecision: string;
  createdAt: string;
}

function loadRecords(): ReferenceBreakdownRecord[] {
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

function isImageRef(value: string) {
  return /^(https?:\/\/|\/).+\.(png|jpe?g|webp)(\?.*)?$/i.test(value.trim());
}

export function ReferenceBreakdown() {
  const [records, setRecords] = useState<ReferenceBreakdownRecord[]>(loadRecords);
  const [coachProgress] = useState(loadCoachProgress);
  const [sourceType, setSourceType] = useState<ReferenceSourceType>("screenshot");
  const [sourceRef, setSourceRef] = useState("");
  const [timecode, setTimecode] = useState("");
  const [observation, setObservation] = useState("");
  const [techniqueIds, setTechniqueIds] = useState<ReferenceTechniqueId[]>([]);
  const [estimatedFrames, setEstimatedFrames] = useState("");
  const [implementation, setImplementation] = useState<ReferenceImplementation>("Edit");
  const [outcomeId, setOutcomeId] = useState(allProductionOutcomes[0]?.outcomeId ?? "");
  const [weddingDecision, setWeddingDecision] = useState("");

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  }, [records]);

  const selectedTechniques = techniqueIds
    .map((techniqueId) => referenceTechniques.find((technique) => technique.techniqueId === techniqueId))
    .filter((technique) => technique !== undefined);

  const linkedSkillIds = useMemo(
    () => [...new Set(selectedTechniques.flatMap((technique) => technique.skillIds))],
    [selectedTechniques],
  );

  const linkedSkills = linkedSkillIds
    .map((skillId) => allLearningSkills.find((skill) => skill.skillId === skillId))
    .filter((skill) => skill !== undefined);

  function toggleTechnique(techniqueId: ReferenceTechniqueId) {
    setTechniqueIds((current) =>
      current.includes(techniqueId)
        ? current.filter((item) => item !== techniqueId)
        : [...current, techniqueId],
    );
  }

  function applyExample(exampleId: string) {
    const example = referenceBreakdownExamples.find((item) => item.exampleId === exampleId);
    if (!example) return;
    setObservation(example.observation);
    setTechniqueIds(example.techniqueIds);
    setEstimatedFrames(example.estimatedFrames);
    setImplementation(example.recommendedImplementation);
    setWeddingDecision(`${example.weddingUse} 理由: ${example.why}`);
  }

  function saveRecord() {
    const trimmedObservation = observation.trim();
    const trimmedDecision = weddingDecision.trim();
    if (!trimmedObservation || techniqueIds.length === 0 || !trimmedDecision || !outcomeId) return;

    const next: ReferenceBreakdownRecord = {
      recordId: `reference-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      sourceType,
      sourceRef: sourceRef.trim(),
      timecode: timecode.trim(),
      observation: trimmedObservation,
      techniqueIds,
      estimatedFrames: estimatedFrames.trim(),
      implementation,
      outcomeId,
      weddingDecision: trimmedDecision,
      createdAt: new Date().toISOString(),
    };
    setRecords((current) => [next, ...current]);
    setObservation("");
    setTechniqueIds([]);
    setEstimatedFrames("");
    setWeddingDecision("");
  }

  function removeRecord(recordId: string) {
    setRecords((current) => current.filter((record) => record.recordId !== recordId));
  }

  return (
    <div>
      <Header
        title="REFERENCE BREAKDOWN"
        description="参考映像を『すごい演出』で終わらせず、何が・何frame・どう変わるかへ分解してWedding Movieへ必要な部分だけ採用する"
      />

      <section className="mb-9 border-y border-sand-200 dark:border-navy-600 py-5">
        <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">OBSERVE BEFORE TOOLS</p>
        <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">DaVinci機能名を当てる前に、画面で起きていることを分ける</h2>
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-3">
          {referenceBreakdownPrinciples.map((principle, index) => (
            <div key={principle} className="flex gap-3 text-sm text-navy-700 dark:text-navy-200">
              <span className="font-mono text-navy-400">{String(index + 1).padStart(2, "0")}</span>
              <span>{principle}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <div className="border-b-2 border-navy-900 dark:border-sand-100 pb-3 mb-4">
          <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">EXAMPLE STARTERS</p>
          <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">よくある見た目を分解してみる</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-sand-200 dark:bg-navy-600 border border-sand-200 dark:border-navy-600">
          {referenceBreakdownExamples.map((example) => (
            <button key={example.exampleId} type="button" onClick={() => applyExample(example.exampleId)} className="text-left bg-white dark:bg-navy-800 p-4 hover:bg-sand-50 dark:hover:bg-navy-700">
              <span className="text-[10px] font-mono text-navy-400">{example.recommendedImplementation} · {example.estimatedFrames}</span>
              <span className="block mt-1 text-sm font-bold text-navy-900 dark:text-sand-100">{example.title}</span>
              <span className="block mt-2 text-xs leading-5 text-navy-500 dark:text-navy-300">{example.observation}</span>
              <span className="block mt-3 text-[10px] text-navy-400">{example.techniqueIds.join(" + ")}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <div className="border-b-2 border-navy-900 dark:border-sand-100 pb-3 mb-4">
          <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">BREAK DOWN A REFERENCE</p>
          <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">観察 → Technique → 実装候補 → Wedding判断</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[0.7fr_1.5fr_0.7fr] gap-3">
          <label className="text-xs text-navy-500 dark:text-navy-300">
            Reference type
            <select value={sourceType} onChange={(event) => setSourceType(event.target.value as ReferenceSourceType)} className="mt-1 w-full border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 px-3 py-2 text-sm text-navy-800 dark:text-sand-100">
              <option value="screenshot">Screenshot</option>
              <option value="video">Video</option>
              <option value="scene">Reference scene</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label className="text-xs text-navy-500 dark:text-navy-300">
            URL / path / memo
            <input value={sourceRef} onChange={(event) => setSourceRef(event.target.value)} placeholder="/reference/scene.png または動画メモ" className="mt-1 w-full border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 px-3 py-2 text-sm text-navy-800 dark:text-sand-100" />
          </label>
          <label className="text-xs text-navy-500 dark:text-navy-300">
            Timecode / range
            <input value={timecode} onChange={(event) => setTimecode(event.target.value)} placeholder="00:12.0–00:13.2" className="mt-1 w-full border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 px-3 py-2 text-sm font-mono text-navy-800 dark:text-sand-100" />
          </label>
        </div>

        {isImageRef(sourceRef) && (
          <div className="mt-4 max-w-3xl aspect-video border border-sand-200 dark:border-navy-600 bg-sand-50 dark:bg-navy-900 overflow-hidden">
            <img src={sourceRef} alt="Reference evidence" className="w-full h-full object-contain" />
          </div>
        )}

        <label className="block mt-5 text-xs text-navy-500 dark:text-navy-300">
          まず目で観察した事実
          <textarea value={observation} onChange={(event) => setObservation(event.target.value)} rows={3} placeholder="例: 写真は固定。文字だけが左の境界から約12frameで現れる。背景blurは変化しない。" className="mt-1 w-full border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 px-3 py-2 text-sm text-navy-800 dark:text-sand-100" />
        </label>

        <div className="mt-5">
          <p className="text-xs font-semibold text-navy-700 dark:text-sand-200">何が変わっている？</p>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-sand-200 dark:bg-navy-600 border border-sand-200 dark:border-navy-600">
            {referenceTechniques.map((technique) => {
              const selected = techniqueIds.includes(technique.techniqueId);
              return (
                <button key={technique.techniqueId} type="button" onClick={() => toggleTechnique(technique.techniqueId)} className={`text-left p-3 ${selected ? "bg-sand-50 dark:bg-navy-700" : "bg-white dark:bg-navy-800"}`}>
                  <span className="text-[10px] font-mono text-navy-400">{technique.implementation}</span>
                  <span className="block mt-1 text-sm font-semibold text-navy-800 dark:text-sand-100">{selected ? "✓ " : ""}{technique.label}</span>
                  <span className="block mt-1 text-xs leading-5 text-navy-500 dark:text-navy-300">{technique.observe}</span>
                </button>
              );
            })}
          </div>
        </div>

        {selectedTechniques.length > 0 && (
          <div className="mt-6 divide-y divide-sand-200 dark:divide-navy-600 border-y border-sand-200 dark:border-navy-600">
            {selectedTechniques.map((technique) => (
              <div key={technique.techniqueId} className="py-4 grid grid-cols-1 lg:grid-cols-[0.7fr_1.3fr_1fr] gap-4">
                <div>
                  <p className="font-bold text-navy-900 dark:text-sand-100">{technique.label}</p>
                  <p className="text-[10px] font-mono text-navy-400 mt-1">START: {technique.implementation}</p>
                </div>
                <div>
                  <p className="text-[10px] tracking-widest font-semibold text-navy-400">DAVINCI</p>
                  <p className="mt-1 text-xs text-navy-600 dark:text-navy-300">{technique.editPath}</p>
                  {technique.fusionPath && <p className="mt-1 text-xs text-navy-400">Fusion候補: {technique.fusionPath}</p>}
                </div>
                <div>
                  <p className="text-[10px] tracking-widest font-semibold text-navy-400">DECISION RULE</p>
                  <p className="mt-1 text-xs leading-5 text-navy-600 dark:text-navy-300">{technique.decisionRule}</p>
                  <p className="mt-1 text-[10px] text-red-700 dark:text-red-300">× {technique.avoid}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-5 grid grid-cols-1 md:grid-cols-[1fr_0.7fr_1.5fr] gap-3">
          <label className="text-xs text-navy-500 dark:text-navy-300">
            Duration / frames
            <input value={estimatedFrames} onChange={(event) => setEstimatedFrames(event.target.value)} placeholder="例: 12 frames / 0.4 sec" className="mt-1 w-full border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 px-3 py-2 text-sm text-navy-800 dark:text-sand-100" />
          </label>
          <label className="text-xs text-navy-500 dark:text-navy-300">
            実装開始地点
            <select value={implementation} onChange={(event) => setImplementation(event.target.value as ReferenceImplementation)} className="mt-1 w-full border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 px-3 py-2 text-sm text-navy-800 dark:text-sand-100">
              {(["Edit", "Fusion", "Color", "Fairlight", "Either"] as ReferenceImplementation[]).map((value) => <option key={value}>{value}</option>)}
            </select>
          </label>
          <label className="text-xs text-navy-500 dark:text-navy-300">
            Wedding Outcome
            <select value={outcomeId} onChange={(event) => setOutcomeId(event.target.value)} className="mt-1 w-full border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 px-3 py-2 text-sm text-navy-800 dark:text-sand-100">
              <optgroup label="Opening">
                {allProductionOutcomes.filter((outcome) => outcome.movieId === "opening").map((outcome) => <option key={outcome.outcomeId} value={outcome.outcomeId}>{outcome.title}</option>)}
              </optgroup>
              <optgroup label="Profile">
                {allProductionOutcomes.filter((outcome) => outcome.movieId === "profile").map((outcome) => <option key={outcome.outcomeId} value={outcome.outcomeId}>{outcome.title}</option>)}
              </optgroup>
            </select>
          </label>
        </div>

        <label className="block mt-4 text-xs text-navy-500 dark:text-navy-300">
          Weddingで採用する？ なぜ？
          <textarea value={weddingDecision} onChange={(event) => setWeddingDecision(event.target.value)} rows={3} placeholder="例: Hero AでStaticとの比較用にだけSmall Pushを試す。Fusionは不要。" className="mt-1 w-full border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 px-3 py-2 text-sm text-navy-800 dark:text-sand-100" />
        </label>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-sand-200 dark:border-navy-600 pt-4">
          <div className="flex flex-wrap gap-x-3 gap-y-2 text-xs">
            <span className="text-[10px] tracking-widest font-semibold text-navy-400">LEARN</span>
            {linkedSkills.map((skill) => (
              <Link key={skill.skillId} to={`/movie-coach/dictionary?q=${encodeURIComponent(skill.label)}`} className="border-b border-navy-300 text-navy-600 dark:text-navy-300">
                {skill.label} · {learningStateLabel[getSkillState(skill.skillId, coachProgress.evidence)]}
              </Link>
            ))}
          </div>
          <button type="button" disabled={!observation.trim() || techniqueIds.length === 0 || !weddingDecision.trim()} onClick={saveRecord} className="px-4 py-2 bg-navy-800 text-white text-xs disabled:bg-sand-200 disabled:text-navy-400 dark:bg-sand-100 dark:text-navy-900 dark:disabled:bg-navy-700">
            Breakdown保存
          </button>
        </div>
      </section>

      <section>
        <div className="border-b-2 border-navy-900 dark:border-sand-100 pb-3 mb-3 flex items-end justify-between">
          <div>
            <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">SAVED BREAKDOWNS</p>
            <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">観察から残した編集判断</h2>
          </div>
          <span className="text-xs font-mono text-navy-400">{records.length} RECORDS</span>
        </div>
        {records.length === 0 ? (
          <p className="py-6 text-sm text-navy-400">まだ保存はありません。参考動画を丸ごと真似せず、1つのsceneから分解します。</p>
        ) : (
          <div className="divide-y divide-sand-200 dark:divide-navy-600">
            {records.map((record) => {
              const outcome = allProductionOutcomes.find((item) => item.outcomeId === record.outcomeId);
              return (
                <article key={record.recordId} className="py-4 grid grid-cols-1 lg:grid-cols-[0.7fr_1.4fr_1.5fr_auto] gap-4">
                  <div>
                    <p className="text-[10px] uppercase font-mono text-navy-400">{record.sourceType}</p>
                    <p className="mt-1 text-xs font-mono text-navy-600 dark:text-navy-300">{record.timecode || "--:--"}</p>
                    <p className="mt-1 text-[10px] text-navy-400 break-all">{record.sourceRef || "no source ref"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy-800 dark:text-sand-100">{record.observation}</p>
                    <p className="mt-2 text-xs text-navy-400">{record.techniqueIds.join(" + ")} · {record.estimatedFrames || "duration未計測"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-navy-400">{record.implementation} → {outcome?.shortLabel ?? record.outcomeId}</p>
                    <p className="mt-1 text-sm text-navy-600 dark:text-navy-300">{record.weddingDecision}</p>
                  </div>
                  <button type="button" onClick={() => removeRecord(record.recordId)} className="text-xs text-navy-400">削除</button>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
