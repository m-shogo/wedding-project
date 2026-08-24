import { Header } from "../components/Header";
import {
  startAccentIdeas,
  startDavinciDrills,
  startOpeningScenePlan,
  startReferences,
  startSectionCues,
  startSongFacts,
} from "../data/startRhythmLab";

const fmt = (value: number) => `${Math.floor(value / 60)}:${String(Math.round(value % 60)).padStart(2, "0")}`;

export function StartRhythmLab() {
  return (
    <div>
      <Header
        title="StaRt RHYTHM LAB"
        description="Mrs. GREEN APPLE『StaRt』を、曲構造→映像判断→DaVinci操作へ分解してOpening V1へ適用する"
      />

      <section className="mb-8 border-y border-sand-200 dark:border-navy-600 py-5 grid grid-cols-2 lg:grid-cols-5 gap-5">
        <div><p className="text-[10px] tracking-widest text-navy-400">TEMPO</p><p className="mt-1 text-3xl font-mono font-bold text-navy-900 dark:text-sand-100">{startSongFacts.bpm}</p><p className="text-xs text-navy-400">BPM</p></div>
        <div><p className="text-[10px] tracking-widest text-navy-400">EDIT GRID</p><p className="mt-1 text-3xl font-mono font-bold text-navy-900 dark:text-sand-100">{startSongFacts.halfTimeBpm}</p><p className="text-xs text-navy-400">half-time BPM</p></div>
        <div><p className="text-[10px] tracking-widest text-navy-400">1 BEAT</p><p className="mt-1 text-3xl font-mono font-bold text-navy-900 dark:text-sand-100">{startSongFacts.beatSec.toFixed(3)}</p><p className="text-xs text-navy-400">sec</p></div>
        <div><p className="text-[10px] tracking-widest text-navy-400">HALF BEAT</p><p className="mt-1 text-3xl font-mono font-bold text-navy-900 dark:text-sand-100">{startSongFacts.halfTimeBeatSec.toFixed(3)}</p><p className="text-xs text-navy-400">sec</p></div>
        <div><p className="text-[10px] tracking-widest text-navy-400">CANDIDATE A</p><p className="mt-1 text-3xl font-mono font-bold text-emerald-700 dark:text-emerald-300">+{startSongFacts.candidateOffsetSec}s</p><p className="text-xs text-navy-400">Hero A → song 0:38</p></div>
      </section>

      <section className="mb-10 border-l-2 border-navy-900 dark:border-sand-100 pl-5">
        <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">CORE IDEA</p>
        <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">190 BPMを全部切らない。95 BPMで読ませ、190 BPMは小さなaccentに使う</h2>
        <p className="mt-2 text-sm leading-6 text-navy-600 dark:text-navy-300">{startSongFacts.note}</p>
      </section>

      <section className="mb-10">
        <div className="border-b-2 border-navy-900 dark:border-sand-100 pb-3 mb-4">
          <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">SONG STRUCTURE</p>
          <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">最初にMarkerへ置く6つの区切り</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-px bg-sand-200 dark:bg-navy-600">
          {startSectionCues.map((cue) => (
            <div key={cue.label} className="bg-white dark:bg-navy-800 p-3">
              <p className="text-[10px] font-mono text-navy-400">{fmt(cue.songStartSec)}–{fmt(cue.songEndSec)}</p>
              <p className="mt-1 text-sm font-bold text-navy-800 dark:text-sand-100">{cue.label}</p>
              <p className="mt-2 text-xs leading-5 text-navy-500 dark:text-navy-300">{cue.purpose}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <div className="border-b-2 border-navy-900 dark:border-sand-100 pb-3 mb-4">
          <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">60s CANDIDATE A / +3s</p>
          <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">現行Opening V1を曲へ当てる第一案</h2>
        </div>
        <div className="divide-y divide-sand-200 dark:divide-navy-600">
          {startOpeningScenePlan.map((scene) => (
            <article key={scene.sceneId} className="py-4 grid grid-cols-1 xl:grid-cols-[0.8fr_0.8fr_1.8fr_1.2fr] gap-5">
              <div>
                <p className="text-[10px] font-mono text-navy-400">TIMELINE {scene.timelineStartSec}–{scene.timelineEndSec}s</p>
                <p className="mt-1 text-sm font-bold text-navy-900 dark:text-sand-100">{scene.sceneId}</p>
                <p className="mt-1 text-xs text-navy-400">SONG {fmt(scene.songStartSec)}–{fmt(scene.songEndSec)}</p>
              </div>
              <div>
                <p className="text-[10px] tracking-widest font-semibold text-navy-400">MUSIC ROLE</p>
                <p className="mt-1 text-sm text-navy-700 dark:text-navy-200">{scene.musicalRole}</p>
              </div>
              <div>
                <p className="text-[10px] tracking-widest font-semibold text-emerald-600">VISUAL DIRECTION</p>
                <p className="mt-1 text-sm leading-6 text-navy-700 dark:text-navy-200">{scene.visualDirection}</p>
                <p className="mt-2 text-[10px] font-mono text-navy-400">{scene.davinci.join(" / ")}</p>
              </div>
              <div>
                <p className="text-[10px] tracking-widest font-semibold text-red-500">AVOID</p>
                <p className="mt-1 text-xs leading-5 text-navy-600 dark:text-navy-300">{scene.avoid}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-10 grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div>
          <div className="border-b-2 border-navy-900 dark:border-sand-100 pb-3 mb-4">
            <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">EDIT IDEAS</p>
            <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">曲に合う演出候補</h2>
          </div>
          <div className="space-y-3">
            {startAccentIdeas.map((idea, index) => (
              <div key={idea} className="flex gap-3 text-sm leading-6 text-navy-600 dark:text-navy-300">
                <span className="font-mono text-navy-400">{String(index + 1).padStart(2, "0")}</span><p>{idea}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="border-b-2 border-navy-900 dark:border-sand-100 pb-3 mb-4">
            <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">DAVINCI PRACTICE</p>
            <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">Weddingを進めながら覚える5 drills</h2>
          </div>
          <div className="space-y-5">
            {startDavinciDrills.map((drill) => (
              <article key={drill.id} className="border-l border-sand-300 dark:border-navy-600 pl-4">
                <div className="flex items-center justify-between gap-3"><h3 className="font-bold text-navy-900 dark:text-sand-100">{drill.title}</h3><span className="text-xs font-mono text-navy-400">{drill.minutes}m</span></div>
                <p className="mt-2 text-sm leading-6 text-navy-600 dark:text-navy-300">{drill.task}</p>
                <p className="mt-2 text-xs text-emerald-700 dark:text-emerald-300">DONE: {drill.doneWhen}</p>
                <p className="mt-1 text-[10px] font-mono text-navy-400">Wedding: {drill.weddingApply} / {drill.skillIds.join(" / ")}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-10">
        <div className="border-b-2 border-navy-900 dark:border-sand-100 pb-3 mb-4">
          <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">REFERENCE LIBRARY</p>
          <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">見る動画・公式教材と、何を盗むか</h2>
          <p className="mt-2 text-xs text-navy-400">動画ファイルの無断ミラーはせず、参照URL・timecode・技法を保存。公式配布PDF/lesson filesは取得対象。</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-sand-200 dark:bg-navy-600">
          {startReferences.map((ref) => (
            <a key={ref.id} href={ref.url} target="_blank" rel="noreferrer" className="bg-white dark:bg-navy-800 p-4 hover:bg-sand-50 dark:hover:bg-navy-700 transition">
              <div className="flex items-center justify-between gap-3"><span className="text-[10px] uppercase tracking-wider text-navy-400">{ref.kind}</span><span className="text-[10px] text-navy-400">{ref.usage}</span></div>
              <p className="mt-1 text-sm font-bold text-navy-900 dark:text-sand-100">{ref.title}</p>
              <p className="mt-2 text-xs leading-5 text-navy-600 dark:text-navy-300">{ref.study}</p>
              <p className="mt-2 text-[10px] text-sky-700 dark:text-sky-300">開く ↗</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
