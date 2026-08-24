import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { startMotionPresets, motionEnergies, type MotionEnergy } from "../data/startMotionKit";
import {
  buildStartShowcasePalmierHandoff,
  startShowcaseAuthority,
  startShowcaseSections,
  startShowcaseSlots,
  type StartShowcaseSection,
} from "../data/startMotionShowcase";

const ALL = "ALL" as const;
type SectionFilter = StartShowcaseSection | typeof ALL;
type EnergyFilter = MotionEnergy | typeof ALL;

function downloadJson() {
  const blob = new Blob([JSON.stringify({ authority: startShowcaseAuthority, slots: startShowcaseSlots }, null, 2)], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "start-motion-showcase-palmier-rough.json";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export function StartMotionShowcase() {
  const [section, setSection] = useState<SectionFilter>(ALL);
  const [energy, setEnergy] = useState<EnergyFilter>(ALL);
  const [copied, setCopied] = useState(false);

  const filtered = useMemo(
    () => startShowcaseSlots.filter((slot) =>
      (section === ALL || slot.section === section) &&
      (energy === ALL || slot.energy === energy)),
    [section, energy],
  );

  async function copyHandoff() {
    await navigator.clipboard.writeText(buildStartShowcasePalmierHandoff());
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div>
      <Header
        title="StaRt MOTION SHOWCASE"
        description="曲頭→2番サビ後の間奏までを、歌詞slot・実素材slot・Motion KitでPalmierへ渡す研究用rough timeline"
      />

      <section className="mb-8 border-2 border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20 p-5">
        <p className="text-[10px] tracking-[0.2em] font-semibold text-amber-700 dark:text-amber-300">EXACT TIMING GATE</p>
        <h2 className="mt-1 text-xl font-bold text-amber-950 dark:text-amber-100">秒数はまだ確定しない — 正規/local音源の波形とMarkerがauthority</h2>
        <p className="mt-2 text-sm leading-6 text-amber-900 dark:text-amber-200">{startShowcaseAuthority.timingRule}</p>
        <p className="mt-2 text-xs leading-5 text-amber-800 dark:text-amber-300">{startShowcaseAuthority.lyricRule}</p>
      </section>

      <section className="mb-8 grid grid-cols-2 lg:grid-cols-5 gap-px bg-sand-200 dark:bg-navy-600">
        <div className="bg-white dark:bg-navy-800 p-4"><p className="text-[10px] tracking-widest text-navy-400">ROUGH SLOTS</p><p className="mt-1 text-3xl font-mono font-bold text-navy-900 dark:text-sand-100">{startShowcaseSlots.length}</p></div>
        <div className="bg-white dark:bg-navy-800 p-4"><p className="text-[10px] tracking-widest text-navy-400">LYRIC SLOTS</p><p className="mt-1 text-3xl font-mono font-bold text-navy-900 dark:text-sand-100">{startShowcaseSlots.filter((slot) => slot.phraseSlot).length}</p></div>
        <div className="bg-white dark:bg-navy-800 p-4"><p className="text-[10px] tracking-widest text-navy-400">SECTIONS</p><p className="mt-1 text-3xl font-mono font-bold text-navy-900 dark:text-sand-100">{startShowcaseSections.length}</p></div>
        <div className="bg-white dark:bg-navy-800 p-4"><p className="text-[10px] tracking-widest text-navy-400">EXACT END</p><p className="mt-1 text-lg font-mono font-bold text-amber-700 dark:text-amber-300">PENDING AUDIO</p></div>
        <div className="bg-white dark:bg-navy-800 p-4"><p className="text-[10px] tracking-widest text-navy-400">APPROVED</p><p className="mt-1 text-3xl font-mono font-bold text-emerald-700 dark:text-emerald-300">0</p></div>
      </section>

      <section className="mb-7 flex flex-col xl:flex-row xl:items-end gap-4 border-b border-sand-200 dark:border-navy-600 pb-5">
        <label className="text-[10px] tracking-[0.2em] font-semibold text-navy-400 min-w-56">SECTION
          <select value={section} onChange={(event) => setSection(event.target.value as SectionFilter)} className="mt-1 block w-full border border-sand-300 dark:border-navy-600 bg-white dark:bg-navy-800 px-3 py-2 text-sm text-navy-800 dark:text-sand-100">
            <option value={ALL}>ALL</option>
            {startShowcaseSections.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
        <label className="text-[10px] tracking-[0.2em] font-semibold text-navy-400 min-w-48">ENERGY
          <select value={energy} onChange={(event) => setEnergy(event.target.value as EnergyFilter)} className="mt-1 block w-full border border-sand-300 dark:border-navy-600 bg-white dark:bg-navy-800 px-3 py-2 text-sm text-navy-800 dark:text-sand-100">
            <option value={ALL}>ALL</option>
            {motionEnergies.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
        <div className="xl:ml-auto flex flex-wrap gap-2">
          <button onClick={() => void copyHandoff()} className="border border-navy-700 dark:border-sand-300 px-4 py-2 text-xs text-navy-700 dark:text-sand-200">{copied ? "PALMIER HANDOFF COPIED ✓" : "Palmier rough handoff copy"}</button>
          <button onClick={downloadJson} className="border border-sand-300 dark:border-navy-600 px-4 py-2 text-xs text-navy-600 dark:text-navy-200">JSON export</button>
        </div>
      </section>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-mono text-navy-400">SHOWING {filtered.length} / {startShowcaseSlots.length}</p>
        <div className="flex gap-4 text-xs">
          <Link to="/movie-coach/start-rhythm" className="text-sky-700 dark:text-sky-300">Rhythm Lab</Link>
          <Link to="/movie-coach/start-motion-kit" className="text-sky-700 dark:text-sky-300">Motion Kit 36</Link>
        </div>
      </div>

      <section className="border-t-2 border-navy-900 dark:border-sand-100 divide-y divide-sand-200 dark:divide-navy-600">
        {filtered.map((slot) => {
          const preset = startMotionPresets.find((item) => item.id === slot.motionPresetId);
          return (
            <article key={slot.slotId} className="py-5 grid grid-cols-1 xl:grid-cols-[0.8fr_1.2fr_1.2fr_1.4fr] gap-5">
              <div>
                <p className="text-[10px] font-mono text-navy-400">{slot.slotId}</p>
                <h3 className="mt-1 font-bold text-navy-900 dark:text-sand-100">{slot.section}</h3>
                <p className="mt-1 text-[10px] font-mono text-amber-700 dark:text-amber-300">MARKER {slot.markerAnchor}</p>
                <p className="mt-2 text-xs font-mono text-navy-500 dark:text-navy-300">{slot.phraseSlot ?? "NO LYRIC"}</p>
              </div>
              <div className="text-xs leading-5 text-navy-600 dark:text-navy-300">
                <p className="font-semibold text-navy-800 dark:text-sand-100">SOURCE SLOT</p>
                <p className="font-mono mt-1">{slot.sourceSlot}</p>
                <p className="mt-2"><span className="font-semibold">Placement:</span> {slot.placement}</p>
                <p><span className="font-semibold">Duration:</span> {slot.expectedDuration}</p>
              </div>
              <div className="text-xs leading-5 text-navy-600 dark:text-navy-300">
                <p className="font-semibold text-navy-800 dark:text-sand-100">MOTION</p>
                <p className="mt-1 font-mono">{slot.motionPresetId}</p>
                <p>{preset?.label ?? "UNKNOWN PRESET"}</p>
                <p className="mt-2"><span className="font-semibold">Energy:</span> {slot.energy}</p>
                <p><span className="font-semibold">Intensity:</span> {slot.intensity}</p>
                <p><span className="font-semibold">Catalog status:</span> {preset?.status ?? "missing"}</p>
              </div>
              <div className="text-xs leading-5 text-navy-600 dark:text-navy-300">
                <p><span className="font-semibold text-emerald-700 dark:text-emerald-300">WHY:</span> {slot.purpose}</p>
                <p className="mt-2 text-red-600 dark:text-red-300"><span className="font-semibold">AVOID:</span> {slot.avoidWhen}</p>
                <p className="mt-2 font-mono text-navy-400">status: {slot.status}</p>
              </div>
            </article>
          );
        })}
      </section>

      <section className="mt-8 border-l-2 border-navy-900 dark:border-sand-100 pl-5">
        <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">SHOWCASE ≠ FINAL</p>
        <p className="mt-1 text-sm leading-6 text-navy-700 dark:text-navy-200">{startShowcaseAuthority.finalRule} {startShowcaseAuthority.mediaRule}</p>
      </section>
    </div>
  );
}
