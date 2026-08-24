import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import {
  timelineAvoid,
  timelineCoreConcepts,
  timelinePractices,
  timelineTrackLessons,
  type TimelineTrackId,
} from "../data/timelineAnatomy";

export function TimelineAnatomy() {
  const [selectedTrackId, setSelectedTrackId] = useState<TimelineTrackId>("V1");
  const [selectedPracticeId, setSelectedPracticeId] = useState(timelinePractices[0]?.practiceId ?? "");

  const selectedTrack = useMemo(
    () => timelineTrackLessons.find((track) => track.trackId === selectedTrackId) ?? timelineTrackLessons[0],
    [selectedTrackId],
  );
  const selectedPractice = useMemo(
    () => timelinePractices.find((practice) => practice.practiceId === selectedPracticeId) ?? timelinePractices[0],
    [selectedPracticeId],
  );

  return (
    <div>
      <Header
        title="TIMELINE ANATOMY"
        description="V1/V2/A1を番号として覚えず、同じ時間を走る素材を『役割』で分ける理由から理解する"
      />

      <section className="mb-9 border-y border-sand-200 dark:border-navy-600 py-5">
        <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">CORE CONCEPT</p>
        <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">Track = 同じ時間を走る役割別のレーン</h2>
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-5">
          {timelineCoreConcepts.map((concept, index) => (
            <article key={concept.title} className="grid grid-cols-[28px_1fr] gap-3">
              <span className="font-mono text-xs text-navy-400">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-sm font-bold text-navy-800 dark:text-sand-100">{concept.title}</h3>
                <p className="mt-1 text-sm leading-6 text-navy-600 dark:text-navy-300">{concept.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <div className="border-b-2 border-navy-900 dark:border-sand-100 pb-3 mb-4">
          <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">TRACK STACK</p>
          <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">上から見た目、下から実素材と音</h2>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[0.75fr_1.4fr] gap-7">
          <div className="space-y-2">
            {timelineTrackLessons.map((track) => {
              const active = selectedTrack?.trackId === track.trackId;
              return (
                <button
                  key={track.trackId}
                  type="button"
                  onClick={() => setSelectedTrackId(track.trackId)}
                  className={`w-full grid grid-cols-[52px_1fr] gap-3 items-center text-left border px-3 py-3 ${
                    active
                      ? "border-navy-900 bg-sand-50 dark:border-sand-100 dark:bg-navy-800"
                      : "border-sand-200 dark:border-navy-600"
                  }`}
                >
                  <span className="font-mono text-base font-bold text-navy-900 dark:text-sand-100">{track.trackId}</span>
                  <span>
                    <span className="block text-[10px] font-mono text-navy-400">{track.kind.toUpperCase()} / {track.role}</span>
                    <span className="block mt-0.5 text-sm font-semibold text-navy-700 dark:text-navy-200">{track.plainName}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {selectedTrack && (
            <article>
              <div className="flex flex-wrap items-baseline gap-3 border-b border-sand-200 dark:border-navy-600 pb-3">
                <span className="text-3xl font-mono font-bold text-navy-900 dark:text-sand-100">{selectedTrack.trackId}</span>
                <span className="text-lg font-bold text-navy-800 dark:text-sand-100">{selectedTrack.role}</span>
                <span className="text-sm text-navy-400">= {selectedTrack.plainName}</span>
              </div>

              <div className="mt-5">
                <p className="text-[10px] tracking-widest font-semibold text-navy-400">WHAT GOES HERE?</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedTrack.contains.map((item) => (
                    <span key={item} className="text-xs border-b border-sand-300 dark:border-navy-500 text-navy-700 dark:text-navy-200">{item}</span>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 border-y border-sand-200 dark:border-navy-600 py-5">
                <div>
                  <p className="text-[10px] tracking-widest font-semibold text-navy-400">WHY SEPARATE?</p>
                  <p className="mt-1 text-sm leading-6 text-navy-700 dark:text-navy-200">{selectedTrack.whySeparate}</p>
                </div>
                <div>
                  <p className="text-[10px] tracking-widest font-semibold text-emerald-700 dark:text-emerald-300">RULE</p>
                  <p className="mt-1 text-sm leading-6 text-navy-700 dark:text-navy-200">{selectedTrack.rule}</p>
                </div>
              </div>

              <div className="mt-5 border-l-2 border-red-400 pl-4 py-1">
                <p className="text-[10px] tracking-widest font-semibold text-red-700 dark:text-red-300">COMMON MISTAKE</p>
                <p className="mt-1 text-sm text-navy-700 dark:text-navy-200">× {selectedTrack.commonMistake}</p>
              </div>
            </article>
          )}
        </div>
      </section>

      <section className="mb-10">
        <div className="border-b-2 border-navy-900 dark:border-sand-100 pb-3 mb-4">
          <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">WEDDING PRACTICE</p>
          <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">本番区間を「役割」で並べ直す</h2>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[0.7fr_1.4fr] gap-7">
          <div className="border-y border-sand-200 dark:border-navy-600 divide-y divide-sand-100 dark:divide-navy-700">
            {timelinePractices.map((practice) => {
              const active = selectedPractice?.practiceId === practice.practiceId;
              return (
                <button
                  key={practice.practiceId}
                  type="button"
                  onClick={() => setSelectedPracticeId(practice.practiceId)}
                  className={`w-full text-left px-3 py-4 border-l-2 ${
                    active
                      ? "border-navy-900 bg-sand-50 dark:border-sand-100 dark:bg-navy-800"
                      : "border-transparent"
                  }`}
                >
                  <span className="text-[10px] font-mono text-navy-400">{practice.minutes} MIN / {practice.outcomeId}</span>
                  <span className="block mt-1 text-sm font-semibold text-navy-800 dark:text-sand-100">{practice.title}</span>
                </button>
              );
            })}
          </div>

          {selectedPractice && (
            <article>
              <div className="border-b border-sand-200 dark:border-navy-600 pb-3">
                <h3 className="text-xl font-bold text-navy-900 dark:text-sand-100">{selectedPractice.title}</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedPractice.tracks.map((trackId) => (
                    <span key={trackId} className="text-[11px] font-mono border border-sand-300 dark:border-navy-500 px-2 py-1 text-navy-700 dark:text-navy-200">{trackId}</span>
                  ))}
                </div>
              </div>
              <ol className="mt-4 space-y-3">
                {selectedPractice.steps.map((step, index) => (
                  <li key={step} className="grid grid-cols-[28px_1fr] gap-3 text-sm text-navy-700 dark:text-navy-200">
                    <span className="font-mono text-navy-400">{String(index + 1).padStart(2, "0")}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-5 border-l-2 border-emerald-500 pl-4 py-1">
                <p className="text-[10px] tracking-widest font-semibold text-emerald-700 dark:text-emerald-300">DONE WHEN</p>
                <p className="mt-1 text-sm font-semibold leading-6 text-navy-800 dark:text-sand-100">{selectedPractice.done}</p>
              </div>
            </article>
          )}
        </div>
      </section>

      <section className="mb-8 border-y border-sand-200 dark:border-navy-600 py-5">
        <p className="text-[10px] tracking-[0.2em] font-semibold text-red-700 dark:text-red-300">AVOID TIMELINE CLUTTER</p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
          {timelineAvoid.map((item) => <p key={item} className="text-sm text-navy-700 dark:text-navy-200">× {item}</p>)}
        </div>
      </section>

      <div className="flex flex-wrap gap-4 text-xs">
        <Link to="/movie-coach" className="border-b border-navy-300 text-navy-600 dark:text-navy-300">← Movie Coach</Link>
        <Link to="/movie-coach/audio" className="border-b border-navy-300 text-navy-600 dark:text-navy-300">Audio Learning →</Link>
        <Link to="/movie-coach/dictionary?q=track" className="border-b border-navy-300 text-navy-600 dark:text-navy-300">逆引き辞典でTrackを調べる →</Link>
      </div>
    </div>
  );
}
