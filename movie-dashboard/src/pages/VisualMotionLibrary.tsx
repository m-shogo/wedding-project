import { useMemo, useRef, useState } from "react";
import { Header } from "../components/Header";
import {
  buildMotionPromptOutputs,
  implementationRegistry,
  maskRevealVerticalSliceGate,
  motionPatternRegistry,
  previewRegistry,
  searchMotionPatterns,
  vocabularyRegistry,
  type HumanDecision,
  type MotionIntensity,
} from "../data/visualMotionLibrary";

const scoreLabel = ["—", "△", "○", "◎"] as const;

export function VisualMotionLibrary() {
  const [query, setQuery] = useState("下から シュッ");
  const [selectedId, setSelectedId] = useState("type-mask-reveal");
  const [text, setText] = useState("WELCOME");
  const [mediaPath, setMediaPath] = useState("");
  const [project, setProject] = useState<"OPENING" | "PROFILE">("OPENING");
  const [section, setSection] = useState("INTRO");
  const [intensity, setIntensity] = useState<MotionIntensity>("M");
  const [durationSec, setDurationSec] = useState(0.8);
  const [marker, setMarker] = useState("section-start");
  const [decision, setDecision] = useState<HumanDecision>("NONE");
  const [loop, setLoop] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const patterns = useMemo(() => searchMotionPatterns(query), [query]);
  const pattern = motionPatternRegistry.find((item) => item.id === selectedId) ?? patterns[0] ?? motionPatternRegistry[0];
  const preview = previewRegistry.find((item) => item.id === pattern.previewId);
  const implementation = implementationRegistry.find((item) => item.id === pattern.implementationId);
  const vocab = vocabularyRegistry.filter((item) => pattern.vocabularyIds.includes(item.id));

  const outputs = useMemo(
    () => buildMotionPromptOutputs({
      patternId: pattern.id,
      text: text || "WELCOME",
      mediaPath,
      project,
      section,
      intensity,
      durationSec,
      marker,
    }),
    [pattern.id, text, mediaPath, project, section, intensity, durationSec, marker],
  );

  function setPlaybackRate(rate: number) {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = rate;
    void videoRef.current.play().catch(() => undefined);
  }

  function replay() {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    void videoRef.current.play().catch(() => undefined);
  }

  async function copyOutput(key: string, value: string) {
    await navigator.clipboard.writeText(value);
    setCopied(key);
    window.setTimeout(() => setCopied(null), 1400);
  }

  function downloadMachineJson() {
    const blob = new Blob([outputs.machineJson], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${pattern.id}-handoff.json`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <Header
        title="動きを見て探す"
        description="名前を知らなくても、実際のMotion Preview → 日本語説明 → Palmier Rough → DaVinci Finishまで1本につなぐVisual Motion Library"
      />

      <section className="mb-6 border-2 border-navy-900 dark:border-sand-100 bg-white dark:bg-navy-800 p-5">
        <div className="grid gap-4 xl:grid-cols-[1.4fr_0.8fr] xl:items-end">
          <label className="block">
            <span className="text-[10px] font-semibold tracking-[0.2em] text-navy-400">何をしたい？ 自然な言葉で検索</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="例: 文字 下からシュッ / 写真 ドン / パンパンパン"
              className="mt-2 w-full border border-sand-300 bg-white px-4 py-3 text-base text-navy-900 outline-none focus:border-sky-500 dark:border-navy-600 dark:bg-navy-900 dark:text-sand-100"
            />
          </label>
          <div className="text-xs leading-5 text-navy-500 dark:text-navy-300">
            <p className="font-semibold text-navy-900 dark:text-sand-100">Vertical Slice rule</p>
            <p>Mask RevealがActual DaVinci Renderまで通る前に、Pattern数を増やさない。</p>
          </div>
        </div>
      </section>

      <section className="mb-7 grid gap-4 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800">
          <div className="border-b border-sand-200 dark:border-navy-600 px-4 py-3 flex items-center justify-between">
            <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">MOTION PATTERNS</p>
            <p className="text-xs font-mono text-navy-400">{patterns.length} HIT</p>
          </div>
          {patterns.length === 0 ? (
            <div className="p-5 text-sm text-navy-500 dark:text-navy-300">まだ一致するPatternがありません。MVPではMask Reveal 1件だけを深く完成させています。</div>
          ) : (
            <div className="divide-y divide-sand-200 dark:divide-navy-600">
              {patterns.map((item) => {
                const itemPreview = previewRegistry.find((previewItem) => previewItem.id === item.previewId);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedId(item.id)}
                    className={`w-full p-4 text-left transition ${item.id === pattern.id ? "bg-sky-50 dark:bg-sky-900/20" : "hover:bg-sand-50 dark:hover:bg-navy-700"}`}
                  >
                    <p className="text-lg font-bold text-navy-950 dark:text-sand-100">{item.japaneseName}</p>
                    <p className="mt-0.5 text-xs font-mono text-navy-400">{item.commonName} · {item.id}</p>
                    <p className="mt-2 text-sm leading-5 text-navy-600 dark:text-navy-300">{item.shortDescription}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5 text-[10px]">
                      <span className="border border-sand-300 px-2 py-0.5 dark:border-navy-600">Opening {scoreLabel[item.openingScore]}</span>
                      <span className="border border-sand-300 px-2 py-0.5 dark:border-navy-600">Profile {scoreLabel[item.profileScore]}</span>
                      <span className="border border-amber-400 bg-amber-50 px-2 py-0.5 text-amber-800 dark:bg-amber-900/20 dark:text-amber-200">{itemPreview?.status ?? "MISSING"}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <article className="border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <p className="text-[10px] tracking-[0.2em] font-semibold text-sky-700 dark:text-sky-300">VISUAL MOTION PATTERN</p>
              <h2 className="mt-1 text-3xl font-bold text-navy-950 dark:text-sand-100">{pattern.japaneseName}</h2>
              <p className="mt-1 font-mono text-sm text-navy-400">{pattern.commonName}</p>
            </div>
            <div className="flex flex-wrap gap-2 text-[10px]">
              <span className="border border-sky-300 px-2 py-1 text-sky-800 dark:border-sky-700 dark:text-sky-200">Palmier: {pattern.palmierSupport}</span>
              <span className="border border-navy-300 px-2 py-1 text-navy-700 dark:border-navy-600 dark:text-navy-200">DaVinci: {implementation?.type ?? "MISSING"}</span>
            </div>
          </div>

          <div className="mt-5 overflow-hidden border border-navy-900 bg-[#101318] dark:border-sand-300">
            {preview?.videoPath ? (
              <video
                ref={videoRef}
                src={preview.videoPath}
                poster={preview.posterPath ?? undefined}
                muted
                loop={loop}
                playsInline
                controls
                className="aspect-video w-full object-cover"
              />
            ) : (
              <div className="aspect-video flex items-center justify-center text-sm text-white">Preview MISSING</div>
            )}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className={`px-2 py-1 text-[10px] font-bold ${preview?.verified ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-900"}`}>
              {preview?.label ?? "Preview MISSING"}
            </span>
            <span className="text-[10px] font-mono text-navy-400">{preview?.sourceType} / sample={preview?.sampleAssetSetId}</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={replay} className="border border-sand-300 px-3 py-1.5 text-xs dark:border-navy-600">Replay</button>
            <button type="button" onClick={() => setPlaybackRate(1)} className="border border-sand-300 px-3 py-1.5 text-xs dark:border-navy-600">1x</button>
            <button type="button" onClick={() => setPlaybackRate(0.5)} className="border border-sand-300 px-3 py-1.5 text-xs dark:border-navy-600">0.5x 学習</button>
            <label className="flex items-center gap-2 border border-sand-300 px-3 py-1.5 text-xs dark:border-navy-600">
              <input type="checkbox" checked={loop} onChange={(event) => setLoop(event.target.checked)} /> Loop
            </label>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <div>
              <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">こんな動き</p>
              <p className="mt-2 text-sm leading-6 text-navy-700 dark:text-navy-200">{pattern.howItLooks}</p>
              <p className="mt-4 text-[10px] tracking-[0.2em] font-semibold text-navy-400">向いている</p>
              <ul className="mt-2 space-y-1 text-sm text-navy-700 dark:text-navy-200">{pattern.goodFor.map((item) => <li key={item}>• {item}</li>)}</ul>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">向いていない</p>
              <ul className="mt-2 space-y-1 text-sm text-navy-700 dark:text-navy-200">{pattern.avoidFor.map((item) => <li key={item}>• {item}</li>)}</ul>
              <p className="mt-4 text-[10px] tracking-[0.2em] font-semibold text-navy-400">自然言語Alias</p>
              <div className="mt-2 flex flex-wrap gap-1.5">{pattern.aliases.map((alias) => <span key={alias} className="bg-sand-100 px-2 py-1 text-[11px] text-navy-700 dark:bg-navy-700 dark:text-navy-200">{alias}</span>)}</div>
            </div>
          </div>
        </article>
      </section>

      <section className="mb-7 grid gap-4 xl:grid-cols-[1fr_1fr]">
        <div className="border border-sand-200 bg-white p-5 dark:border-navy-600 dark:bg-navy-800">
          <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">この演出を使う</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="text-xs text-navy-500">Text
              <input value={text} maxLength={18} onChange={(event) => setText(event.target.value)} className="mt-1 block w-full border border-sand-300 bg-white px-3 py-2 text-sm text-navy-900 dark:border-navy-600 dark:bg-navy-900 dark:text-sand-100" />
            </label>
            <label className="text-xs text-navy-500">Photo path (optional)
              <input value={mediaPath} onChange={(event) => setMediaPath(event.target.value)} placeholder="hawaii_hero_03.jpg" className="mt-1 block w-full border border-sand-300 bg-white px-3 py-2 text-sm text-navy-900 dark:border-navy-600 dark:bg-navy-900 dark:text-sand-100" />
            </label>
            <label className="text-xs text-navy-500">Project
              <select value={project} onChange={(event) => setProject(event.target.value as "OPENING" | "PROFILE")} className="mt-1 block w-full border border-sand-300 bg-white px-3 py-2 text-sm text-navy-900 dark:border-navy-600 dark:bg-navy-900 dark:text-sand-100">
                <option value="OPENING">Opening</option><option value="PROFILE">Profile</option>
              </select>
            </label>
            <label className="text-xs text-navy-500">Section
              <input value={section} onChange={(event) => setSection(event.target.value)} className="mt-1 block w-full border border-sand-300 bg-white px-3 py-2 text-sm text-navy-900 dark:border-navy-600 dark:bg-navy-900 dark:text-sand-100" />
            </label>
            <label className="text-xs text-navy-500">Intensity
              <select value={intensity} onChange={(event) => setIntensity(event.target.value as MotionIntensity)} className="mt-1 block w-full border border-sand-300 bg-white px-3 py-2 text-sm text-navy-900 dark:border-navy-600 dark:bg-navy-900 dark:text-sand-100">
                <option value="S">弱</option><option value="M">中</option><option value="L">強</option>
              </select>
            </label>
            <label className="text-xs text-navy-500">Duration {durationSec.toFixed(1)} sec
              <input type="range" min="0.4" max="1.5" step="0.1" value={durationSec} onChange={(event) => setDurationSec(Number(event.target.value))} className="mt-2 block w-full" />
            </label>
            <label className="text-xs text-navy-500 md:col-span-2">Marker
              <input value={marker} onChange={(event) => setMarker(event.target.value)} className="mt-1 block w-full border border-sand-300 bg-white px-3 py-2 text-sm text-navy-900 dark:border-navy-600 dark:bg-navy-900 dark:text-sand-100" />
            </label>
          </div>
          <div className="mt-5 border-t border-sand-200 pt-4 dark:border-navy-600">
            <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">Human Decision</p>
            <div className="mt-2 flex gap-2">
              {(["FAVORITE", "MAYBE", "REJECT"] as HumanDecision[]).map((item) => (
                <button key={item} type="button" onClick={() => setDecision(item)} className={`border px-3 py-2 text-xs ${decision === item ? "border-sky-500 bg-sky-50 text-sky-800 dark:bg-sky-900/30 dark:text-sky-200" : "border-sand-300 dark:border-navy-600"}`}>{item}</button>
              ))}
            </div>
            <p className="mt-2 text-xs text-navy-400">Implementation statusとHuman Decisionは別管理。実装済みでもRejectできる。</p>
          </div>
        </div>

        <div className="border border-sand-200 bg-white p-5 dark:border-navy-600 dark:bg-navy-800">
          <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">必要素材 / Just-in-time Learning</p>
          <div className="mt-3 divide-y divide-sand-200 border-y border-sand-200 dark:divide-navy-600 dark:border-navy-600">
            {pattern.inputSlots.map((slot) => (
              <div key={slot.id} className="py-3 text-sm text-navy-700 dark:text-navy-200">
                <span className="font-mono text-[10px] text-navy-400">{slot.kind}</span>
                <p className="font-semibold">{slot.label} {slot.required ? "*" : ""}</p>
                {slot.kind === "TEXT" && <p className="mt-1 text-xs">{slot.minChars}〜{slot.maxChars}文字 / 最大{slot.maxLines}行 / 例: {slot.example}</p>}
                {slot.kind === "MEDIA" && <p className="mt-1 text-xs">{slot.minCount}〜{slot.maxCount}枚 / {slot.orientation} / {slot.aspectPreference} / {slot.textSafeArea}</p>}
                {slot.kind === "TIMING" && <p className="mt-1 text-xs">{slot.allowed.join(" / ")}</p>}
              </div>
            ))}
          </div>
          <div className="mt-5 grid gap-2 md:grid-cols-2">
            {vocab.map((item) => (
              <div key={item.id} className="border border-sand-200 p-3 dark:border-navy-600">
                <p className="font-semibold text-navy-900 dark:text-sand-100">{item.japanese} <span className="font-mono text-xs text-navy-400">{item.term}</span></p>
                <p className="mt-1 text-xs leading-5 text-navy-600 dark:text-navy-300">{item.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-7">
        <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">AI指示を作る</p>
            <h2 className="mt-1 text-xl font-bold text-navy-950 dark:text-sand-100">同じ選択から5形式を生成</h2>
          </div>
          <button type="button" onClick={downloadMachineJson} className="border border-navy-700 px-4 py-2 text-xs text-navy-700 dark:border-sand-300 dark:text-sand-100">Machine JSON download</button>
        </div>
        <div className="grid gap-4 xl:grid-cols-2">
          {[
            ["human", "Human Brief", outputs.humanBrief],
            ["claude", "Claude Creative Instruction", outputs.claudeCreativeInstruction],
            ["palmier", "Palmier Instruction", outputs.palmierInstruction],
            ["davinci", "DaVinci Finish Manifest", outputs.davinciFinishManifest],
          ].map(([key, title, value]) => (
            <article key={key} className="border border-sand-200 bg-white p-4 dark:border-navy-600 dark:bg-navy-800">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-bold text-navy-900 dark:text-sand-100">{title}</h3>
                <button type="button" onClick={() => void copyOutput(key, value)} className="text-xs text-sky-700 dark:text-sky-300">{copied === key ? "Copied ✓" : "Copy"}</button>
              </div>
              <pre className="mt-3 whitespace-pre-wrap break-words text-xs leading-5 text-navy-700 dark:text-navy-200">{value}</pre>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-8 border-2 border-amber-400 bg-amber-50 p-5 dark:border-amber-700 dark:bg-amber-900/20">
        <p className="text-[10px] tracking-[0.2em] font-semibold text-amber-800 dark:text-amber-200">IMPLEMENTATION TRUTH</p>
        <h2 className="mt-1 text-xl font-bold text-amber-950 dark:text-amber-100">DaVinci実renderがまだ無いのでProduction Readyではない</h2>
        <p className="mt-2 text-sm leading-6 text-amber-900 dark:text-amber-200">{implementation?.verificationNote}</p>
        <div className="mt-4 grid grid-cols-2 gap-px bg-amber-200 md:grid-cols-4 xl:grid-cols-7 dark:bg-amber-800">
          {Object.entries(maskRevealVerticalSliceGate).map(([key, passed]) => (
            <div key={key} className="bg-white p-3 dark:bg-navy-800">
              <p className={`text-sm font-bold ${passed ? "text-emerald-700" : "text-amber-700 dark:text-amber-300"}`}>{passed ? "✓" : "WAIT"}</p>
              <p className="mt-1 break-words text-[9px] font-mono text-navy-500 dark:text-navy-300">{key}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
