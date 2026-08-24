import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import {
  buildDavinciLearningHref,
  buildPalmierMotionHandoff,
  motionEnergies,
  motionFamilies,
  motionSources,
  motionStatuses,
  motionUseCases,
  startMotionPresets,
  type MotionEnergy,
  type MotionFamily,
  type MotionSource,
  type MotionStatus,
} from "../data/startMotionKit";

const ALL = "ALL" as const;
type Filter<T> = T | typeof ALL;

export function StartMotionKitCatalog() {
  const [family, setFamily] = useState<Filter<MotionFamily>>(ALL);
  const [energy, setEnergy] = useState<Filter<MotionEnergy>>(ALL);
  const [source, setSource] = useState<Filter<MotionSource>>(ALL);
  const [status, setStatus] = useState<Filter<MotionStatus>>(ALL);
  const [useCase, setUseCase] = useState<string>(ALL);
  const [copiedId, setCopiedId] = useState("");

  const filtered = useMemo(
    () => startMotionPresets.filter((preset) =>
      (family === ALL || preset.category === family) &&
      (energy === ALL || preset.energy.includes(energy)) &&
      (source === ALL || preset.source.includes(source)) &&
      (status === ALL || preset.status === status) &&
      (useCase === ALL || preset.useCases.includes(useCase))),
    [family, energy, source, status, useCase],
  );

  async function copyHandoff(id: string) {
    const preset = startMotionPresets.find((item) => item.id === id);
    if (!preset) return;
    await navigator.clipboard.writeText(buildPalmierMotionHandoff(preset));
    setCopiedId(id);
    window.setTimeout(() => setCopiedId(""), 1600);
  }

  return (
    <div>
      <Header title="StaRt MOTION KIT" description="36 reusable presetsを、曲のenergy・素材・用途から選び、Palmier試作とDaVinci学習へつなぐ" />

      <section className="mb-8 border-y border-sand-200 dark:border-navy-600 py-5 grid grid-cols-2 lg:grid-cols-6 gap-5">
        <div><p className="text-[10px] tracking-widest text-navy-400">PRESETS</p><p className="mt-1 text-3xl font-mono font-bold text-navy-900 dark:text-sand-100">36</p></div>
        {motionFamilies.map((item) => <div key={item}><p className="text-[10px] tracking-widest text-navy-400">{item}</p><p className="mt-1 text-3xl font-mono font-bold text-navy-900 dark:text-sand-100">{startMotionPresets.filter((preset) => preset.category === item).length}</p></div>)}
        <div><p className="text-[10px] tracking-widest text-navy-400">APPROVED</p><p className="mt-1 text-3xl font-mono font-bold text-emerald-700 dark:text-emerald-300">{startMotionPresets.filter((preset) => preset.status === "approved").length}</p></div>
      </section>

      <section className="mb-8 border-l-2 border-navy-900 dark:border-sand-100 pl-5">
        <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">RULE</p>
        <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">36個を全部Finalへ使わない。Showcaseで比較し、Finalは4〜8 motion familyへ削る</h2>
        <p className="mt-2 text-sm leading-6 text-navy-600 dark:text-navy-300">presetはshared engineのparameter差として扱う。AIはartifact evidenceなしで approved へ上げない。</p>
      </section>

      <div className="mb-7 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3">
        <Select label="CATEGORY" value={family} onChange={(value) => setFamily(value as Filter<MotionFamily>)} options={motionFamilies} />
        <Select label="ENERGY" value={energy} onChange={(value) => setEnergy(value as Filter<MotionEnergy>)} options={motionEnergies} />
        <Select label="SOURCE" value={source} onChange={(value) => setSource(value as Filter<MotionSource>)} options={motionSources} />
        <Select label="USE CASE" value={useCase} onChange={setUseCase} options={[...motionUseCases]} />
        <Select label="STATUS" value={status} onChange={(value) => setStatus(value as Filter<MotionStatus>)} options={motionStatuses} />
      </div>

      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-xs font-mono text-navy-400">SHOWING {filtered.length} / 36</p>
        <Link to="/movie-coach/start-rhythm" className="text-xs text-sky-700 dark:text-sky-300">← StaRt Rhythm Lab</Link>
      </div>

      <section className="divide-y divide-sand-200 dark:divide-navy-600 border-t-2 border-navy-900 dark:border-sand-100">
        {filtered.map((preset) => (
          <article key={preset.id} className="py-5 grid grid-cols-1 xl:grid-cols-[1.2fr_1fr_1.4fr_1fr] gap-5">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-semibold tracking-widest text-navy-400">{preset.category}</span>
                <span className="text-[10px] font-mono border border-sand-300 dark:border-navy-600 px-1.5 py-0.5 text-navy-500 dark:text-navy-300">{preset.status}</span>
              </div>
              <h3 className="mt-1 text-lg font-bold text-navy-900 dark:text-sand-100">{preset.label}</h3>
              <p className="text-[10px] font-mono text-navy-400">{preset.id}</p>
              <p className="mt-2 text-sm leading-6 text-navy-600 dark:text-navy-300">{preset.purpose}</p>
            </div>
            <div className="text-xs leading-5 text-navy-600 dark:text-navy-300">
              <p><span className="font-semibold">Energy:</span> {preset.energy.join(" / ")}</p>
              <p><span className="font-semibold">Beat:</span> {preset.beatBehavior}</p>
              <p><span className="font-semibold">Duration:</span> {preset.durationFrames[0]}–{preset.durationFrames[1]}f</p>
              <p><span className="font-semibold">Intensity:</span> {preset.intensity.join(" / ")}</p>
              <p><span className="font-semibold">Still photo:</span> {preset.safeForStillPhoto ? "safe" : "video only"}</p>
            </div>
            <div className="text-xs leading-5 text-navy-600 dark:text-navy-300">
              <p><span className="font-semibold">Source:</span> {preset.source.join(" / ")}</p>
              <p><span className="font-semibold">Use:</span> {preset.useCases.join(" / ")}</p>
              <p><span className="font-semibold">Engine:</span> {preset.engine} → {preset.sharedEngine}</p>
              <p className="mt-2 text-red-600 dark:text-red-300"><span className="font-semibold">Avoid:</span> {preset.avoidWhen}</p>
            </div>
            <div className="flex xl:flex-col gap-2 xl:items-stretch">
              <button onClick={() => void copyHandoff(preset.id)} className="border border-navy-700 dark:border-sand-300 px-3 py-2 text-xs text-navy-700 dark:text-sand-200 hover:bg-sand-50 dark:hover:bg-navy-700">{copiedId === preset.id ? "COPIED ✓" : "Palmier handoff copy"}</button>
              <Link to={buildDavinciLearningHref(preset)} className="border border-sand-300 dark:border-navy-600 px-3 py-2 text-xs text-sky-700 dark:text-sky-300 text-center">DaVinciで学ぶ →</Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: readonly string[] }) {
  return <label className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">{label}<select value={value} onChange={(event) => onChange(event.target.value)} className="mt-1 block w-full border border-sand-300 dark:border-navy-600 bg-white dark:bg-navy-800 px-3 py-2 text-sm text-navy-800 dark:text-sand-100"><option value={ALL}>ALL</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>;
}
