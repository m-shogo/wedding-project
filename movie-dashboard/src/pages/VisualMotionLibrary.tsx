import { useMemo, useState } from "react";
import { Header } from "../components/Header";
import {
  buildMaskRevealPromptOutputs,
  getPatternImplementation,
  getPatternPreview,
  searchMotionPatterns,
  type MaskRevealPromptInput,
  type MotionPromptOutputs,
} from "../data/visualMotionLibrary";

const defaultInput: MaskRevealPromptInput = {
  text: "WELCOME",
  mediaLabel: "Hero Photo",
  section: "OPENING_INTRO",
  intensity: "S",
  durationSeconds: 0.8,
};

export function VisualMotionLibrary() {
  const [query, setQuery] = useState("");
  const [input, setInput] = useState<MaskRevealPromptInput>(defaultInput);
  const [outputs, setOutputs] = useState<MotionPromptOutputs | null>(() => buildMaskRevealPromptOutputs(defaultInput));
  const [copied, setCopied] = useState("");
  const patterns = useMemo(() => searchMotionPatterns(query), [query]);

  async function copy(label: string, value: string) {
    await navigator.clipboard.writeText(value);
    setCopied(label);
    window.setTimeout(() => setCopied(""), 1400);
  }

  return (
    <div>
      <Header
        title="Visual Motion Library"
        description="名前を知らなくても、動きの見た目・自然な日本語・必要素材から探し、Palmier Rough → DaVinci Finalへつなぐ"
      />

      <section className="mb-8 border-l-2 border-emerald-600 pl-5">
        <p className="text-[10px] tracking-[0.2em] font-semibold text-emerald-700 dark:text-emerald-300">VERTICAL SLICE</p>
        <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">まずMask Reveal 1件だけを最後まで通す</h2>
        <p className="mt-2 text-sm leading-6 text-navy-600 dark:text-navy-300">
          36 / 97件を先に移行しない。Actual DaVinci Renderとlocal Resolve versionが確認されるまではProduction Readyにしない。
        </p>
      </section>

      <label className="block mb-7">
        <span className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">何をしたい？</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="例: 文字 下からシュッ / 映画っぽい タイトル / 文字を静かに出す"
          className="mt-2 w-full border border-sand-300 dark:border-navy-600 bg-white dark:bg-navy-800 px-4 py-3 text-sm text-navy-900 dark:text-sand-100"
        />
      </label>

      <section className="space-y-6">
        {patterns.map((pattern) => {
          const preview = getPatternPreview(pattern);
          const implementation = getPatternImplementation(pattern);
          return (
            <article key={pattern.id} className="border border-sand-300 dark:border-navy-600 bg-white dark:bg-navy-800">
              <div className="grid grid-cols-1 xl:grid-cols-[1.15fr_1fr]">
                <div className="min-h-[260px] bg-navy-950 text-white flex items-center justify-center p-8 relative overflow-hidden">
                  {preview?.assetPath ? (
                    <video src={preview.assetPath} controls loop muted playsInline className="w-full max-h-[420px] object-contain" />
                  ) : (
                    <div className="text-center max-w-lg">
                      <p className="text-[10px] tracking-[0.22em] text-amber-300 font-semibold">CONCEPT PREVIEW / 実装確認前</p>
                      <p className="mt-5 text-4xl md:text-6xl font-bold tracking-[0.12em]">WELCOME</p>
                      <p className="mt-5 text-sm leading-6 text-navy-200">
                        既存RemotionのMask Slideはvisual prior artとして登録済み。ただし、この枠をDaVinci実装のPreviewとして見せることは禁止。
                      </p>
                    </div>
                  )}
                  <span className="absolute top-3 left-3 px-2 py-1 text-[9px] font-mono border border-white/30 bg-black/30">
                    {preview?.sourceType ?? "MISSING"} / {preview?.status ?? "MISSING"}
                  </span>
                </div>

                <div className="p-6">
                  <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">{pattern.categories.join(" / ")}</p>
                  <h2 className="mt-1 text-2xl font-bold text-navy-900 dark:text-sand-100">{pattern.japaneseName}</h2>
                  <p className="mt-1 text-sm font-mono text-navy-400">{pattern.commonName} · {pattern.id}</p>
                  <p className="mt-4 text-sm leading-7 text-navy-600 dark:text-navy-300">{pattern.naturalDescription}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {pattern.aliases.slice(0, 6).map((alias) => (
                      <span key={alias} className="px-2 py-1 text-[10px] border border-sand-300 dark:border-navy-600 text-navy-500 dark:text-navy-300">{alias}</span>
                    ))}
                  </div>

                  <dl className="mt-6 grid grid-cols-2 gap-x-5 gap-y-3 text-xs text-navy-600 dark:text-navy-300">
                    <div><dt className="font-semibold">Opening</dt><dd>{pattern.openingFit}</dd></div>
                    <div><dt className="font-semibold">Profile</dt><dd>{pattern.profileFit}</dd></div>
                    <div><dt className="font-semibold">Palmier</dt><dd>{pattern.palmierCapability}</dd></div>
                    <div><dt className="font-semibold">DaVinci</dt><dd>{implementation?.kind ?? "UNVERIFIED"}</dd></div>
                    <div><dt className="font-semibold">Implementation</dt><dd>{implementation?.status ?? "DISCOVERED"}</dd></div>
                    <div><dt className="font-semibold">Verified</dt><dd>{implementation?.verified ? "YES" : "NO"}</dd></div>
                  </dl>
                </div>
              </div>

              <div className="border-t border-sand-200 dark:border-navy-600 p-6 grid grid-cols-1 xl:grid-cols-[0.9fr_1.5fr] gap-8">
                <div>
                  <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">この演出を使う</p>
                  <div className="mt-4 space-y-4">
                    <Field label="TEXT">
                      <input
                        value={input.text}
                        maxLength={24}
                        onChange={(event) => setInput((current) => ({ ...current, text: event.target.value }))}
                        className="w-full border border-sand-300 dark:border-navy-600 bg-white dark:bg-navy-900 px-3 py-2 text-sm text-navy-900 dark:text-sand-100"
                      />
                    </Field>
                    <Field label="MEDIA LABEL">
                      <input
                        value={input.mediaLabel ?? ""}
                        onChange={(event) => setInput((current) => ({ ...current, mediaLabel: event.target.value }))}
                        className="w-full border border-sand-300 dark:border-navy-600 bg-white dark:bg-navy-900 px-3 py-2 text-sm text-navy-900 dark:text-sand-100"
                      />
                    </Field>
                    <Field label="SECTION">
                      <select
                        value={input.section}
                        onChange={(event) => setInput((current) => ({ ...current, section: event.target.value as MaskRevealPromptInput["section"] }))}
                        className="w-full border border-sand-300 dark:border-navy-600 bg-white dark:bg-navy-900 px-3 py-2 text-sm text-navy-900 dark:text-sand-100"
                      >
                        <option value="OPENING_INTRO">Opening Intro</option>
                        <option value="OPENING_CHORUS">Opening Chorus</option>
                        <option value="PROFILE_CHAPTER">Profile Chapter</option>
                        <option value="PROFILE_COUPLE_STORY">Profile Couple Story</option>
                      </select>
                    </Field>
                    <Field label="INTENSITY">
                      <select
                        value={input.intensity}
                        onChange={(event) => setInput((current) => ({ ...current, intensity: event.target.value as MaskRevealPromptInput["intensity"] }))}
                        className="w-full border border-sand-300 dark:border-navy-600 bg-white dark:bg-navy-900 px-3 py-2 text-sm text-navy-900 dark:text-sand-100"
                      >
                        <option value="S">弱 / S</option>
                        <option value="M">中 / M</option>
                        <option value="L">強 / L</option>
                      </select>
                    </Field>
                    <Field label="DURATION (sec)">
                      <input
                        type="number"
                        min="0.4"
                        max="3"
                        step="0.1"
                        value={input.durationSeconds}
                        onChange={(event) => setInput((current) => ({ ...current, durationSeconds: Number(event.target.value) }))}
                        className="w-full border border-sand-300 dark:border-navy-600 bg-white dark:bg-navy-900 px-3 py-2 text-sm text-navy-900 dark:text-sand-100"
                      />
                    </Field>
                    <button
                      onClick={() => setOutputs(buildMaskRevealPromptOutputs(input))}
                      className="w-full bg-navy-900 dark:bg-sand-100 text-white dark:text-navy-900 px-4 py-3 text-sm font-semibold"
                    >
                      AI指示を作る
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">OUTPUTS</p>
                  {outputs && (
                    <div className="mt-4 space-y-4">
                      <OutputCard label="Human Brief" value={outputs.humanBrief} copied={copied} onCopy={copy} />
                      <OutputCard label="Claude Creative Instruction" value={outputs.claudeCreativeInstruction} copied={copied} onCopy={copy} />
                      <OutputCard label="Palmier Instruction" value={outputs.palmierInstruction} copied={copied} onCopy={copy} />
                      <OutputCard label="DaVinci Finish Manifest" value={outputs.davinciFinishManifest} copied={copied} onCopy={copy} />
                      <OutputCard label="Machine JSON" value={outputs.machineJson} copied={copied} onCopy={copy} />
                    </div>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[10px] tracking-[0.16em] font-semibold text-navy-400">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

function OutputCard({ label, value, copied, onCopy }: { label: string; value: string; copied: string; onCopy: (label: string, value: string) => Promise<void> }) {
  return (
    <section className="border border-sand-300 dark:border-navy-600">
      <div className="px-3 py-2 border-b border-sand-200 dark:border-navy-600 flex items-center justify-between gap-3">
        <h3 className="text-xs font-semibold text-navy-800 dark:text-sand-100">{label}</h3>
        <button onClick={() => void onCopy(label, value)} className="text-[10px] text-sky-700 dark:text-sky-300">
          {copied === label ? "COPIED ✓" : "COPY"}
        </button>
      </div>
      <pre className="p-3 text-[11px] leading-5 whitespace-pre-wrap overflow-x-auto text-navy-600 dark:text-navy-300">{value}</pre>
    </section>
  );
}
