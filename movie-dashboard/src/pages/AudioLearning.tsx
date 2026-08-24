import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import {
  audioDecisionRules,
  audioLearningStages,
  audioTrackAnatomy,
  audioWeddingExercises,
  type AudioStageId,
} from "../data/audioLearning";

export function AudioLearning() {
  const [selectedStageId, setSelectedStageId] = useState<AudioStageId>("role");
  const [selectedExerciseId, setSelectedExerciseId] = useState(audioWeddingExercises[0]?.exerciseId ?? "");

  const selectedStage = useMemo(
    () => audioLearningStages.find((stage) => stage.stageId === selectedStageId) ?? audioLearningStages[0],
    [selectedStageId],
  );
  const selectedExercise = useMemo(
    () => audioWeddingExercises.find((exercise) => exercise.exerciseId === selectedExerciseId) ?? audioWeddingExercises[0],
    [selectedExerciseId],
  );

  return (
    <div>
      <Header
        title="AUDIO LEARNING"
        description="Fairlightの機能一覧ではなく、BGM・実音・Fade・J/L-cutをWedding MovieのStoryへ必要な順番で使う"
      />

      <section className="mb-9 border-y border-sand-200 dark:border-navy-600 py-5">
        <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">AUDIO PRINCIPLE</p>
        <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">音を足す前に、役割と曲構造を決める</h2>
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-3">
          {audioDecisionRules.map((rule, index) => (
            <div key={rule} className="flex gap-3 text-sm text-navy-700 dark:text-navy-200">
              <span className="font-mono text-navy-400">{String(index + 1).padStart(2, "0")}</span>
              <span>{rule}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <div className="border-b-2 border-navy-900 dark:border-sand-100 pb-3 mb-4">
          <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">TIMELINE ANATOMY / AUDIO</p>
          <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">Trackを「音の役割」で分ける</h2>
        </div>
        <div className="divide-y divide-sand-200 dark:divide-navy-600 border-y border-sand-200 dark:border-navy-600">
          {audioTrackAnatomy.map((track) => (
            <div key={track.track} className="grid grid-cols-[64px_150px_1fr] gap-4 py-3 text-sm">
              <span className="font-mono font-bold text-navy-900 dark:text-sand-100">{track.track}</span>
              <span className="font-semibold text-navy-700 dark:text-navy-200">{track.role}</span>
              <span className="text-navy-500 dark:text-navy-300">{track.rule}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <div className="border-b-2 border-navy-900 dark:border-sand-100 pb-3 mb-4">
          <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">ROLE → FULL PASS</p>
          <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">1回に1つの音問題だけ直す</h2>
        </div>

        <div className="overflow-x-auto pb-2">
          <div className="flex min-w-max border-y border-sand-200 dark:border-navy-600">
            {audioLearningStages.map((stage) => {
              const active = selectedStage?.stageId === stage.stageId;
              return (
                <button
                  key={stage.stageId}
                  type="button"
                  onClick={() => setSelectedStageId(stage.stageId)}
                  className={`min-w-[150px] px-4 py-3 text-left border-b-2 ${
                    active
                      ? "border-navy-900 bg-sand-50 dark:border-sand-100 dark:bg-navy-800"
                      : "border-transparent"
                  }`}
                >
                  <span className="text-[10px] font-mono text-navy-400">STEP {String(stage.order).padStart(2, "0")}</span>
                  <span className="block mt-1 text-sm font-semibold text-navy-800 dark:text-sand-100">{stage.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {selectedStage && (
          <article className="mt-6 grid grid-cols-1 xl:grid-cols-[1.15fr_1fr] gap-8">
            <div>
              <p className="text-[10px] tracking-widest font-semibold text-navy-400">QUESTION</p>
              <p className="mt-2 text-lg font-semibold leading-7 text-navy-900 dark:text-sand-100">{selectedStage.question}</p>
              <p className="mt-5 text-[10px] tracking-widest font-semibold text-navy-400">DAVINCI</p>
              <p className="mt-1 text-sm font-mono text-navy-600 dark:text-navy-300">{selectedStage.davinci}</p>
              <p className="mt-5 text-[10px] tracking-widest font-semibold text-navy-400">ACTION</p>
              <p className="mt-1 text-sm leading-6 text-navy-700 dark:text-navy-200">{selectedStage.action}</p>
            </div>
            <div className="border-l border-sand-200 dark:border-navy-600 pl-6">
              <p className="text-[10px] tracking-widest font-semibold text-emerald-700 dark:text-emerald-300">EVIDENCE</p>
              <p className="mt-1 text-sm leading-6 text-navy-700 dark:text-navy-200">{selectedStage.evidence}</p>
              <p className="mt-6 text-[10px] tracking-widest font-semibold text-red-700 dark:text-red-300">COMMON MISTAKE</p>
              <p className="mt-1 text-sm leading-6 text-navy-700 dark:text-navy-200">× {selectedStage.commonMistake}</p>
            </div>
          </article>
        )}
      </section>

      <section className="mb-10">
        <div className="border-b-2 border-navy-900 dark:border-sand-100 pb-3 mb-4">
          <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">WEDDING PRACTICE</p>
          <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">本番区間を音だけでもレビューする</h2>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[0.7fr_1.4fr] gap-7">
          <div className="border-y border-sand-200 dark:border-navy-600 divide-y divide-sand-100 dark:divide-navy-700">
            {audioWeddingExercises.map((exercise) => {
              const active = selectedExercise?.exerciseId === exercise.exerciseId;
              return (
                <button
                  key={exercise.exerciseId}
                  type="button"
                  onClick={() => setSelectedExerciseId(exercise.exerciseId)}
                  className={`w-full text-left px-3 py-4 border-l-2 ${
                    active
                      ? "border-navy-900 bg-sand-50 dark:border-sand-100 dark:bg-navy-800"
                      : "border-transparent"
                  }`}
                >
                  <span className="text-[10px] font-mono text-navy-400">{exercise.minutes} MIN / {exercise.source}</span>
                  <span className="block mt-1 text-sm font-semibold text-navy-800 dark:text-sand-100">{exercise.title}</span>
                </button>
              );
            })}
          </div>

          {selectedExercise && (
            <article>
              <div className="border-b border-sand-200 dark:border-navy-600 pb-3">
                <h3 className="text-xl font-bold text-navy-900 dark:text-sand-100">{selectedExercise.title}</h3>
                <p className="mt-1 text-xs font-mono text-navy-400">Wedding Outcome: {selectedExercise.source}</p>
              </div>
              <ol className="mt-4 space-y-3">
                {selectedExercise.steps.map((step, index) => (
                  <li key={step} className="grid grid-cols-[28px_1fr] gap-3 text-sm text-navy-700 dark:text-navy-200">
                    <span className="font-mono text-navy-400">{String(index + 1).padStart(2, "0")}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-5 border-l-2 border-emerald-500 pl-4 py-1">
                <p className="text-[10px] tracking-widest font-semibold text-emerald-700 dark:text-emerald-300">DONE WHEN</p>
                <p className="mt-1 text-sm font-semibold leading-6 text-navy-800 dark:text-sand-100">{selectedExercise.done}</p>
              </div>
            </article>
          )}
        </div>
      </section>

      <section className="mb-8 border-y border-sand-200 dark:border-navy-600 py-5">
        <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">FINAL AUDIO QA</p>
        <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">画面を見ずに1回聴く</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-5 text-sm text-navy-700 dark:text-navy-200">
          <div><span className="font-mono text-navy-400">01</span><p className="mt-1">音量差で驚く時刻をMarker。</p></div>
          <div><span className="font-mono text-navy-400">02</span><p className="mt-1">急な無音・長すぎるFadeをMarker。</p></div>
          <div><span className="font-mono text-navy-400">03</span><p className="mt-1">不要なSFX・AmbienceをMute比較。</p></div>
          <div><span className="font-mono text-navy-400">04</span><p className="mt-1">修正後に映像込みでFull Pass。</p></div>
        </div>
      </section>

      <div className="flex flex-wrap gap-4 text-xs">
        <Link to="/movie-coach" className="border-b border-navy-300 text-navy-600 dark:text-navy-300">← Movie Coach</Link>
        <Link to="/movie-coach/dictionary?q=音" className="border-b border-navy-300 text-navy-600 dark:text-navy-300">逆引き辞典で音を調べる →</Link>
        <Link to="/movie-coach/review" className="border-b border-navy-300 text-navy-600 dark:text-navy-300">Audio FindingをReviewする →</Link>
      </div>
    </div>
  );
}
