import { useMemo, useState } from "react";
import { Header } from "../components/Header";
import { MaskRevealEditableWorkspace } from "../components/MaskRevealEditableWorkspace";
import { MotionZukanProductionWorkspace } from "../components/MotionZukanProductionWorkspace";
import { getMotionLearningBundle } from "../data/motionLearningLinks";
import { getLatestPreviewEvidence } from "../data/motionPreviewEvidence";
import {
  getPatternImplementation,
  getPatternPreview,
  searchMotionPatterns,
} from "../data/visualMotionLibrary";

export function VisualMotionLibrary() {
  const [query, setQuery] = useState("");
  const patterns = useMemo(() => searchMotionPatterns(query), [query]);

  return (
    <div>
      <Header
        title="モーション図鑑"
        description="動きを動画から探し、人間が理解・部分修正できるSceneとして採用し、Palmier Rough → DaVinci Finalへ渡す"
      />

      <section className="mb-8 border-l-2 border-emerald-600 pl-5">
        <p className="text-[10px] tracking-[0.2em] font-semibold text-emerald-700 dark:text-emerald-300">VERTICAL SLICE / HUMAN MASTER</p>
        <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">Mask Reveal 1件を、Actual Renderだけでなく「後から直せる構造」まで通す</h2>
        <p className="mt-2 text-sm leading-6 text-navy-600 dark:text-navy-300">
          36 / 97件を一括移行しない。人間が理解できるScene Duration / Delay / Hold / Position / Direction等を正本にし、Actual DaVinci Renderは実装証拠として紐付ける。
        </p>
      </section>

      <MotionZukanProductionWorkspace />

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
          const previewEvidence = preview ? getLatestPreviewEvidence(preview.id) : null;
          const implementation = getPatternImplementation(pattern);
          const learning = getMotionLearningBundle(pattern.id);

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
                        既存RemotionのMask Slideはvisual prior art。DaVinci Actual Renderではなく、人間が編集できる構造の見た目確認用Conceptとして扱う。
                      </p>
                    </div>
                  )}
                  <span className="absolute top-3 left-3 px-2 py-1 text-[9px] font-mono border border-white/30 bg-black/30">
                    {preview?.sourceType ?? "MISSING"} / {preview?.status ?? "MISSING"}
                  </span>
                  {previewEvidence && (
                    <div className="absolute bottom-3 left-3 right-3 border border-emerald-300/30 bg-black/55 px-3 py-2 text-left">
                      <p className="text-[10px] font-semibold text-emerald-300">CONCEPT RENDER QA ✓ / NOT DAVINCI ACTUAL</p>
                      <p className="mt-1 text-[9px] leading-4 text-navy-200">
                        {previewEvidence.renderSpec.width}×{previewEvidence.renderSpec.height} / {previewEvidence.renderSpec.fps}fps / {previewEvidence.renderSpec.frames}frames · Human Visual QA {previewEvidence.humanVisualQa.result}
                      </p>
                      {!previewEvidence.persistentAssetPath && (
                        <p className="mt-1 text-[9px] leading-4 text-amber-200">期限付きartifactで検証済み。永続MP4がないため、この画面では静止placeholderのまま。</p>
                      )}
                    </div>
                  )}
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

                  {learning && (
                    <section className="mt-6 border-t border-sand-200 dark:border-navy-600 pt-5">
                      <p className="text-[10px] tracking-[0.2em] font-semibold text-sky-700 dark:text-sky-300">JUST-IN-TIME LEARNING</p>
                      <h3 className="mt-1 text-base font-bold text-navy-900 dark:text-sand-100">この演出で学べること</h3>
                      <p className="mt-2 text-xs leading-5 text-navy-500 dark:text-navy-300">{learning.whyNow}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {learning.learningTopics.map((topic) => (
                          <span key={topic} className="px-2 py-1 text-[10px] border border-sky-200 dark:border-sky-900 text-sky-700 dark:text-sky-300">{topic}</span>
                        ))}
                      </div>
                      <div className="mt-4 space-y-3">
                        {learning.fusionRecipes.map((recipe) => (
                          <div key={recipe.recipeId} className="border border-sand-200 dark:border-navy-600 p-3">
                            <p className="text-xs font-semibold text-navy-800 dark:text-sand-100">{recipe.title}</p>
                            <p className="mt-1 text-[11px] leading-5 text-navy-500 dark:text-navy-300">{recipe.goal}</p>
                            <ol className="mt-2 space-y-1 text-[11px] leading-5 text-navy-500 dark:text-navy-300">
                              {recipe.steps.map((step, index) => (
                                <li key={`${recipe.recipeId}-${step.nodeId}-${index}`}>{index + 1}. {step.note}</li>
                              ))}
                            </ol>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              </div>

              <div className="border-t border-sand-200 dark:border-navy-600 p-6">
                <MaskRevealEditableWorkspace />
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
