import { useEffect, useMemo, useState } from "react";
import { Header } from "../components/Header";
import { useProduction } from "../store/productionStore";
import { useToast } from "../store/toastStore";
import { generateId } from "../lib/ids";
import {
  VIDEO_MODELS,
  compileVideoPrompt,
  type MotionPace,
  type RealismProfile,
  type VideoGenerationMode,
  type VideoModelId,
  type VideoPromptIntent,
} from "../lib/videoPromptBuilder";
import {
  VIDEO_PROMPT_PRESETS,
  getVideoPromptPreset,
} from "../lib/videoPromptPresets";
import { buildVideoModelEvidence } from "../lib/videoModelEvidence";
import { resolveProjectVideoModelRoute, videoModelRouteNote } from "../lib/videoProjectModelRouter";

const cameraPresets = [
  "locked camera",
  "slow push-in",
  "slow lateral truck",
  "gentle pan",
  "subtle handheld observation",
  "slow pull-back",
];

const lightingPresets = [
  "soft natural daylight",
  "warm golden-hour light",
  "soft overcast daylight",
  "restrained airport practical lighting",
  "cool blue-hour ambient light",
];

const starterIntent: VideoPromptIntent = {
  title: "",
  mode: "i2v",
  subject: "",
  environment: "",
  action: "Only the naturally moving elements in the scene move gently; the main composition stays stable.",
  camera: "slow push-in",
  pace: "slow",
  lighting: "soft natural daylight",
  mood: "quiet, elegant travel-film realism",
  durationSec: 5,
  aspectRatio: "16:9",
  realism: "natural-film",
  captionSpace: true,
  loop: false,
  referenceNotes: "preserve the supplied composition, color palette and geometry",
};

function availabilityLabel(value: "recommended" | "available" | "preview") {
  if (value === "recommended") return "推奨";
  if (value === "preview") return "Preview監視";
  return "比較候補";
}

export function VideoPromptBuilder() {
  const {
    selectedMovieId,
    data,
    movieScenes,
    addPrompt,
    linkPromptToScene,
  } = useProduction();
  const { addToast } = useToast();
  const [modelId, setModelId] = useState<VideoModelId>("seedance-2.0-mini");
  const [intent, setIntent] = useState<VideoPromptIntent>(starterIntent);
  const [selectedSceneId, setSelectedSceneId] = useState("");
  const [selectedPresetId, setSelectedPresetId] = useState("");
  const [copied, setCopied] = useState<"prompt" | "negative" | "all" | null>(null);

  const availableScenes = useMemo(
    () => selectedMovieId === "all" ? data.scenes : movieScenes,
    [data.scenes, movieScenes, selectedMovieId],
  );
  const selectedScene = availableScenes.find((scene) => scene.sceneId === selectedSceneId);
  const activePreset = selectedPresetId ? getVideoPromptPreset(selectedPresetId) : undefined;
  const modelEvidence = useMemo(() => buildVideoModelEvidence(data.prompts), [data.prompts]);
  const activeRoute = activePreset ? resolveProjectVideoModelRoute(activePreset.id, modelEvidence) : undefined;
  const activeRouteEvidenceRate = activeRoute?.evidence ? Math.round(activeRoute.evidence.passRate * 100) : undefined;
  const model = VIDEO_MODELS.find((item) => item.id === modelId) ?? VIDEO_MODELS[0];
  const compiled = useMemo(() => compileVideoPrompt(modelId, intent), [modelId, intent]);

  useEffect(() => {
    if (selectedSceneId && !availableScenes.some((scene) => scene.sceneId === selectedSceneId)) {
      setSelectedSceneId("");
    }
  }, [availableScenes, selectedSceneId]);

  function update<K extends keyof VideoPromptIntent>(key: K, value: VideoPromptIntent[K]) {
    setIntent((prev) => ({ ...prev, [key]: value }));
  }

  function applyPreset(presetId: string) {
    const preset = getVideoPromptPreset(presetId);
    if (!preset) return;
    const route = resolveProjectVideoModelRoute(preset.id, modelEvidence);
    setSelectedPresetId(preset.id);
    setModelId(route?.model.id ?? preset.draftModelId);
    setIntent({
      ...preset.intent,
      title: selectedScene ? `${selectedScene.title} / ${preset.label}` : preset.intent.title,
    });
    if (route?.learned && route.evidence) {
      addToast(`${preset.label}: project QA ${route.evidence.reviewed}本の実績から${route.model.label}を試作候補にしました`, "info");
    } else {
      addToast(`${preset.label}プリセットを適用しました`, "info");
    }
  }

  async function copy(text: string, kind: "prompt" | "negative" | "all") {
    await navigator.clipboard.writeText(text);
    setCopied(kind);
    window.setTimeout(() => setCopied(null), 1500);
  }

  function saveToPromptBank() {
    const promptId = generateId("prompt");
    const title = intent.title.trim() || `${model.label} ${intent.mode.toUpperCase()} ${intent.durationSec}s`;
    const relatedMovieIds = selectedScene
      ? [selectedScene.movieId]
      : selectedMovieId !== "all"
        ? [selectedMovieId]
        : [];
    const routingNote = activePreset && activeRoute
      ? modelId === activeRoute.model.id
        ? videoModelRouteNote(activeRoute)
        : `model-routing=manual-override / project-suggested-model=${activeRoute.model.id}`
      : "model-routing=manual";

    addPrompt({
      promptId,
      title,
      target: "video",
      tool: model.toolLabel,
      prompt: compiled.prompt,
      negativePrompt: compiled.negativePrompt,
      relatedSceneIds: [],
      relatedMovieIds,
      status: "draft",
      resultAssetIds: [],
      notes: [
        `Generated by Video Prompt Builder / model=${model.label}`,
        `mode=${intent.mode}, duration=${intent.durationSec}s, ratio=${intent.aspectRatio}, realism=${intent.realism}`,
        activePreset ? `preset=${activePreset.id} / finish-candidate=${activePreset.finishModelId} / qa=${activePreset.qaFocus}` : "",
        routingNote,
        selectedScene ? `scene=${selectedScene.sceneId} / purpose=${selectedScene.purpose} / visual=${selectedScene.visual}` : "scene=unlinked",
        ...compiled.modelNotes,
        ...(compiled.warnings.length ? [`Warnings: ${compiled.warnings.join(" / ")}`] : []),
      ].filter(Boolean).join("\n"),
    });

    if (selectedScene) {
      // The second history entry adds both Prompt.relatedSceneIds and Scene.promptIds.
      // One undo returns to a valid unlinked Prompt instead of a one-way relationship.
      linkPromptToScene(promptId, selectedScene.sceneId);
      addToast(`保存して「${selectedScene.title}」へ紐付けました`, "success");
    } else {
      addToast("プロンプト管理へ保存しました", "success");
    }
  }

  const fullCopy = [
    `[MODEL] ${model.label}`,
    `[MODE] ${intent.mode} / ${intent.durationSec}s / ${intent.aspectRatio}`,
    selectedScene ? `[SCENE] ${selectedScene.title} (${selectedScene.sceneId})` : "[SCENE] unlinked",
    activePreset ? `[PRESET] ${activePreset.label}` : "",
    "",
    compiled.prompt,
    "",
    `[AVOID] ${compiled.negativePrompt}`,
  ].filter((line, index, lines) => line || lines[index - 1] !== "").join("\n");

  return (
    <div>
      <Header
        title="動画プロンプトビルダー"
        description="結婚式プリセットと絵コンテからモデル別プロンプトを組み立て、project QA実績もモデル選択へ反映します"
        showMovieSelector
      />

      <div className="mb-6 bg-white dark:bg-navy-800 rounded-xl border border-sand-200 dark:border-navy-600 shadow-sm p-5">
        <div className="flex flex-wrap items-end gap-4 mb-5">
          <div className="min-w-[240px] flex-1">
            <label className="form-label">1. 絵コンテのシーン</label>
            <select value={selectedSceneId} onChange={(e) => setSelectedSceneId(e.target.value)} className="form-input">
              <option value="">紐付けなし</option>
              {availableScenes.map((scene) => {
                const movie = data.movies.find((item) => item.movieId === scene.movieId);
                const label = selectedMovieId === "all" ? `${movie?.title ?? scene.movieId} / ${scene.title}` : scene.title;
                return <option key={scene.sceneId} value={scene.sceneId}>{label}</option>;
              })}
            </select>
            <p className="text-xs text-navy-400 mt-1">選ぶと保存時にPrompt Bankと絵コンテへ同時に紐付きます。</p>
          </div>
          {selectedScene && (
            <div className="min-w-[280px] flex-[1.5] rounded-lg bg-sand-50 dark:bg-navy-700 p-3 text-xs text-navy-500 dark:text-navy-300">
              <p><strong>目的:</strong> {selectedScene.purpose || "—"}</p>
              <p><strong>画:</strong> {selectedScene.visual || "—"}</p>
              <p><strong>尺:</strong> {selectedScene.durationSec}s</p>
            </div>
          )}
        </div>

        <div>
          <p className="form-label mb-2">2. 結婚式・旅行ショットのプリセット</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {VIDEO_PROMPT_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyPreset(preset.id)}
                className={`text-left rounded-lg border p-3 transition ${selectedPresetId === preset.id ? "border-navy-600 bg-navy-50 dark:bg-navy-700 ring-1 ring-navy-300" : "border-sand-200 dark:border-navy-600 hover:bg-sand-50 dark:hover:bg-navy-700"}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span aria-hidden>{preset.icon}</span>
                  <span className="text-sm font-bold text-navy-800 dark:text-sand-100">{preset.label}</span>
                </div>
                <p className="text-[11px] leading-relaxed text-navy-400 dark:text-navy-300">{preset.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-6">
        <section className="bg-white dark:bg-navy-800 rounded-xl border border-sand-200 dark:border-navy-600 shadow-sm p-6 space-y-5">
          {activePreset && (
            <div className="rounded-lg border border-sand-200 dark:border-navy-600 bg-sand-50 dark:bg-navy-700 p-3 text-xs text-navy-600 dark:text-navy-200">
              <p className="font-bold mb-1">{activePreset.icon} {activePreset.label} の推奨ルート</p>
              <p>試作: {activeRoute?.model.label ?? VIDEO_MODELS.find((item) => item.id === activePreset.draftModelId)?.label ?? activePreset.draftModelId} {activeRoute?.learned && <span className="ml-1 text-emerald-700 dark:text-emerald-300">● project実績から自動昇格</span>}</p>
              {activeRoute?.evidence && <p>project QA: {activeRoute.evidence.reviewed}本 / 採用率 {activeRouteEvidenceRate}%</p>}
              {!activeRoute?.learned && activeRoute?.defaultEvidence?.signal === "caution" && <p className="mt-1 text-amber-700 dark:text-amber-300">preset既定モデルは同条件のproject実績で要見直し。十分な代替候補がないため自動変更していません。</p>}
              {activeRoute && modelId !== activeRoute.model.id && <p className="mt-1 text-sky-700 dark:text-sky-300">現在は手動で {model.label} を選択中。保存時にmanual-overrideとして記録します。</p>}
              <p>仕上げ候補: {VIDEO_MODELS.find((item) => item.id === activePreset.finishModelId)?.label ?? activePreset.finishModelId}</p>
              <p className="mt-1"><strong>重点QA:</strong> {activePreset.qaFocus}</p>
            </div>
          )}

          <div>
            <label className="form-label">生成モデル</label>
            <select value={modelId} onChange={(e) => setModelId(e.target.value as VideoModelId)} className="form-input">
              {VIDEO_MODELS.map((item) => (
                <option key={item.id} value={item.id}>{item.label} — {availabilityLabel(item.availability)}</option>
              ))}
            </select>
            <div className="mt-3 rounded-lg bg-sand-50 dark:bg-navy-700 p-3 text-xs text-navy-500 dark:text-navy-300 space-y-1">
              <p><strong>向いている用途:</strong> {model.bestFor}</p>
              <p><strong>書き方:</strong> {model.promptStrategy}</p>
              <p><strong>尺:</strong> {model.durationHint}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">生成モード</label>
              <select value={intent.mode} onChange={(e) => update("mode", e.target.value as VideoGenerationMode)} className="form-input">
                <option value="i2v">Image to Video</option>
                <option value="t2v">Text to Video</option>
                <option value="first-last">First / Last Frame</option>
              </select>
            </div>
            <div>
              <label className="form-label">タイトル（任意）</label>
              <input value={intent.title} onChange={(e) => update("title", e.target.value)} className="form-input" placeholder="例: 雲海 slow push-in v1" />
            </div>
          </div>

          {intent.mode === "t2v" && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">被写体</label>
                <input value={intent.subject} onChange={(e) => update("subject", e.target.value)} className="form-input" placeholder="例: an airplane wing above a sea of clouds" />
              </div>
              <div>
                <label className="form-label">環境</label>
                <input value={intent.environment} onChange={(e) => update("environment", e.target.value)} className="form-input" placeholder="例: soft morning sky at cruising altitude" />
              </div>
            </div>
          )}

          <div>
            <label className="form-label">主動作 — 1ショット1つ</label>
            <textarea value={intent.action} onChange={(e) => update("action", e.target.value)} className="form-input" rows={3} placeholder="何が、どの方向へ、どの程度動くか" />
            <p className="text-xs text-navy-400 mt-1">I2Vでは静止画の内容を長く説明せず、動き・時間変化を中心にします。</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">カメラ</label>
              <input list="camera-presets" value={intent.camera} onChange={(e) => update("camera", e.target.value)} className="form-input" />
              <datalist id="camera-presets">
                {cameraPresets.map((value) => <option key={value} value={value} />)}
              </datalist>
            </div>
            <div>
              <label className="form-label">動きの速さ</label>
              <select value={intent.pace} onChange={(e) => update("pace", e.target.value as MotionPace)} className="form-input">
                <option value="locked">固定</option>
                <option value="subtle">ごく僅か</option>
                <option value="slow">ゆっくり</option>
                <option value="medium">中程度</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">光</label>
              <input list="lighting-presets" value={intent.lighting} onChange={(e) => update("lighting", e.target.value)} className="form-input" />
              <datalist id="lighting-presets">
                {lightingPresets.map((value) => <option key={value} value={value} />)}
              </datalist>
            </div>
            <div>
              <label className="form-label">ムード</label>
              <input value={intent.mood} onChange={(e) => update("mood", e.target.value)} className="form-input" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="form-label">尺（秒）</label>
              <input type="number" min={2} max={30} value={intent.durationSec} onChange={(e) => update("durationSec", Number(e.target.value) || 5)} className="form-input" />
            </div>
            <div>
              <label className="form-label">比率</label>
              <select value={intent.aspectRatio} onChange={(e) => update("aspectRatio", e.target.value)} className="form-input">
                <option value="16:9">16:9</option>
                <option value="9:16">9:16</option>
                <option value="1:1">1:1</option>
                <option value="4:3">4:3</option>
                <option value="3:4">3:4</option>
              </select>
            </div>
            <div>
              <label className="form-label">自然さ</label>
              <select value={intent.realism} onChange={(e) => update("realism", e.target.value as RealismProfile)} className="form-input">
                <option value="natural-film">自然なフィルム</option>
                <option value="documentary">観察的・ドキュメンタリー</option>
                <option value="polished">整った広告映像</option>
              </select>
            </div>
          </div>

          <div>
            <label className="form-label">参照素材の役割</label>
            <textarea value={intent.referenceNotes} onChange={(e) => update("referenceNotes", e.target.value)} className="form-input" rows={2} placeholder="例: composition=画像A / camera motion=参考動画B / color mood=画像C" />
            <p className="text-xs text-navy-400 mt-1">参照を増やす時は「何を参照するか」を役割別に書き、全部を真似させないのが安定します。</p>
          </div>

          <div className="flex flex-wrap gap-5 text-sm text-navy-600 dark:text-navy-200">
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" checked={intent.captionSpace} onChange={(e) => update("captionSpace", e.target.checked)} />
              テロップ余白を固定
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" checked={intent.loop} onChange={(e) => update("loop", e.target.checked)} />
              ソフトループ前提
            </label>
          </div>
        </section>

        <section className="space-y-4">
          {compiled.warnings.length > 0 && (
            <div className="rounded-xl border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20 p-4">
              <h2 className="text-sm font-bold text-amber-800 dark:text-amber-300 mb-2">生成前の注意</h2>
              <ul className="space-y-1 text-xs text-amber-700 dark:text-amber-300 list-disc pl-5">
                {compiled.warnings.map((warning) => <li key={warning}>{warning}</li>)}
              </ul>
            </div>
          )}

          <div className="bg-white dark:bg-navy-800 rounded-xl border border-sand-200 dark:border-navy-600 shadow-sm p-5">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div>
                <p className="text-xs text-navy-400">MODEL-SPECIFIC PROMPT</p>
                <h2 className="font-bold text-navy-800 dark:text-sand-100">{model.label}</h2>
              </div>
              <div className="flex gap-2">
                <button onClick={() => void copy(compiled.prompt, "prompt")} className="px-3 py-1.5 text-xs rounded-lg border border-sand-200 dark:border-navy-600 text-navy-600 dark:text-navy-200 hover:bg-sand-50 dark:hover:bg-navy-700">
                  {copied === "prompt" ? "✓ コピー済み" : "プロンプトをコピー"}
                </button>
                <button onClick={() => void copy(fullCopy, "all")} className="px-3 py-1.5 text-xs rounded-lg bg-navy-700 text-white hover:bg-navy-800">
                  {copied === "all" ? "✓ コピー済み" : "全部コピー"}
                </button>
              </div>
            </div>
            <pre className="text-sm text-navy-700 dark:text-navy-200 bg-sand-50 dark:bg-navy-700 rounded-lg p-4 whitespace-pre-wrap break-words font-mono leading-relaxed select-all">{compiled.prompt}</pre>

            <div className="mt-4 flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-navy-400">AVOID / NEGATIVE</p>
              <button onClick={() => void copy(compiled.negativePrompt, "negative")} className="text-xs text-navy-500 hover:text-navy-700 dark:text-navy-300">
                {copied === "negative" ? "✓ コピー済み" : "コピー"}
              </button>
            </div>
            <pre className="text-xs text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 rounded-lg p-3 whitespace-pre-wrap break-words font-mono">{compiled.negativePrompt}</pre>

            <button onClick={saveToPromptBank} className="mt-4 w-full px-4 py-2.5 text-sm rounded-lg bg-navy-700 text-white hover:bg-navy-800 font-medium">
              {selectedScene ? `保存 + 「${selectedScene.title}」へ紐付け` : "プロンプト管理へ保存"}
            </button>
          </div>

          <div className="bg-white dark:bg-navy-800 rounded-xl border border-sand-200 dark:border-navy-600 shadow-sm p-5">
            <h2 className="font-bold text-navy-800 dark:text-sand-100 mb-3">AIっぽさを減らすQA</h2>
            {activePreset && (
              <div className="mb-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 p-3 text-xs text-amber-800 dark:text-amber-300">
                <strong>{activePreset.label}重点:</strong> {activePreset.qaFocus}
              </div>
            )}
            <ol className="space-y-2 text-sm text-navy-600 dark:text-navy-200 list-decimal pl-5">
              {compiled.qaChecklist.map((item) => <li key={item}>{item}</li>)}
            </ol>
          </div>

          <div className="bg-sand-50 dark:bg-navy-800 rounded-xl border border-sand-200 dark:border-navy-600 p-5">
            <h2 className="font-bold text-navy-800 dark:text-sand-100 mb-2">運用ルール</h2>
            <ul className="space-y-1.5 text-sm text-navy-600 dark:text-navy-200 list-disc pl-5">
              <li>絵コンテのシーンを先に選び、プリセットで80%まで埋めて必要な部分だけ調整する。</li>
              <li>まずMini/Fastで複数案を比較し、構図や動きが決まってから高品質モデルへ進む。</li>
              <li>AI素材は本編の主役ではなく、3〜5秒前後の背景・つなぎ素材として使う。</li>
              <li>人物・家族・友人・犬は実写真・実動画を優先し、AIで置換しない。</li>
              <li>重要な文字・ロゴ・テロップは生成映像に焼き込まず、CapCut / Motion Studio側で載せる。</li>
              <li>同じ失敗が3回続いたらプロンプトを長くするのではなく、静止画・参照素材・ショット設計を見直す。</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
