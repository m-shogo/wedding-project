import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { getDirectorRecipeById } from "../data/directorRecipeCatalog";
import { getDirectorRecipeVisualAudit } from "../data/directorRecipeVisualFidelity";
import {
  startCreativeDirections,
  startCreativeIdeas,
  type StartCreativeIdeaCategory,
} from "../data/startCreativeIdeas";
import { readHumanReviewDecisions } from "../data/startHumanReview";
import {
  START_SELECTION_STORAGE_KEY,
  buildStartCodexPrompt,
  buildStartShortlistExport,
  defaultStartSelectionState,
  getStartNextAction,
  readStartSelectionState,
  sectionRecipeOptions,
  startMotionFamilies,
  startStarterSectionPlan,
  type StartMotionFamilyId,
  type StartSelectionState,
} from "../data/startSelectionMode";
import { startExtendedSections, type StartExtendedSectionId } from "../data/startExtendedRhythmMap";

const readinessLabels: Record<keyof StartSelectionState["readiness"], string> = {
  photosInventoried: "使える写真を一覧化した",
  videosInventoried: "使える動画を一覧化した（なければ確認済みにする）",
  heroChosen: "サビ用Hero写真を2枚以上選んだ",
  clearedLocalAudio: "使用許諾済みの正規ローカル音源を用意した",
  waveformReviewed: "音源の波形を確認した",
  markersConfirmed: "セクションMarkerと終了点を確定した",
};

const creativeCategoryLabels: Record<StartCreativeIdeaCategory, string> = {
  photo: "写真",
  motion: "動き",
  typography: "文字",
  sound: "音",
};

const startSourceFolders = [
  {step: "1A", label: "写真の原本", path: "/Users/m-shogo/Developer/personal/wedding-project/05_photos/opening/", note: "couple / travel / family-friends / venue に分ける", formats: "JPG・JPEG・PNG・WEBP（HEIC原本はそのままでOK。採用後に変換）", example: "travel_hawaii_001.jpg"},
  {step: "1B", label: "動画の原本", path: "/Users/m-shogo/Developer/personal/wedding-project/06_videos/opening/", note: "旅行・会場・自然な短い動画を置く", formats: "MP4・MOV。元動画を短く切らなくてOK", example: "travel_hawaii_walk_001.mov"},
  {step: "2A", label: "音源候補", path: "/Users/m-shogo/Developer/personal/wedding-project/07_music/candidates/", note: "候補段階。ここから本番再生しない", formats: "MP3・WAV・M4Aなどの手元の候補", example: "start_candidate_original.m4a"},
  {step: "2B", label: "利用確認済み音源", path: "/Users/m-shogo/Developer/personal/wedding-project/07_music/licensed/", note: "会場利用条件を確認した音源だけ移す", formats: "候補と同じファイル形式でOK", example: "start_licensed_master.m4a"},
] as const;

function saveState(state: StartSelectionState) {
  try {
    window.localStorage.setItem(START_SELECTION_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // The current session remains usable even if browser storage is unavailable.
  }
}

function downloadText(filename: string, text: string, type: string) {
  const url = URL.createObjectURL(new Blob([text], {type}));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function StartSelectionMode() {
  const [state, setState] = useState<StartSelectionState>(readStartSelectionState);
  const [ideaSectionId, setIdeaSectionId] = useState<StartExtendedSectionId>("opening-pickup");
  const [copied, setCopied] = useState<"prompt" | "json" | "render" | "studio" | null>(null);
  const [copiedAssetPath, setCopiedAssetPath] = useState<string | null>(null);
  const decisions = useMemo(readHumanReviewDecisions, []);
  const shortlist = useMemo(() => buildStartShortlistExport(state, decisions), [state, decisions]);
  const prompt = useMemo(() => buildStartCodexPrompt(state, decisions), [state, decisions]);
  const selectedRecipeIds = Object.values(state.recipeBySection);
  const favoriteCount = selectedRecipeIds.filter((id) => decisions[id] === "favorite").length;
  const familyValid = state.selectedFamilyIds.length >= 4 && state.selectedFamilyIds.length <= 8;

  function update(updater: (current: StartSelectionState) => StartSelectionState) {
    setState((current) => {
      const next = updater(current);
      saveState(next);
      return next;
    });
  }

  function copy(text: string, kind: "prompt" | "json" | "render" | "studio") {
    void navigator.clipboard.writeText(text);
    setCopied(kind);
    window.setTimeout(() => setCopied((current) => current === kind ? null : current), 1600);
  }

  function copyAssetPath(path: string) {
    void navigator.clipboard.writeText(path);
    setCopiedAssetPath(path);
    window.setTimeout(() => setCopiedAssetPath((current) => current === path ? null : current), 1600);
  }

  function toggleFamily(id: StartMotionFamilyId) {
    update((current) => ({
      ...current,
      selectedFamilyIds: current.selectedFamilyIds.includes(id)
        ? current.selectedFamilyIds.filter((familyId) => familyId !== id)
        : [...current.selectedFamilyIds, id],
    }));
  }

  function selectRecipe(sectionId: StartExtendedSectionId, recipeId: string) {
    update((current) => ({...current, recipeBySection: {...current.recipeBySection, [sectionId]: recipeId}}));
  }

  function toggleCreativeIdea(id: string) {
    update((current) => ({
      ...current,
      selectedCreativeIdeaIds: current.selectedCreativeIdeaIds.includes(id)
        ? current.selectedCreativeIdeaIds.filter((ideaId) => ideaId !== id)
        : [...current.selectedCreativeIdeaIds, id],
    }));
  }

  const visibleCreativeIdeas = startCreativeIdeas.filter((idea) => idea.sectionId === ideaSectionId);

  const steps = [
    {label: "1. 系統を選ぶ", done: familyValid, detail: `${state.selectedFamilyIds.length} / 4〜8 family`},
    {label: "2. 区間を確認", done: selectedRecipeIds.length === startExtendedSections.length, detail: `${selectedRecipeIds.length} / ${startExtendedSections.length} section`},
    {label: "3. 素材と音源", done: Object.values(state.readiness).every(Boolean), detail: `${Object.values(state.readiness).filter(Boolean).length} / ${Object.keys(state.readiness).length} check`},
    {label: "4. Codexへ渡す", done: false, detail: "prompt / JSON export"},
  ];

  return (
    <div>
      <Header title="StaRt SELECTION MODE" description="選ぶ → 素材を揃える → コメントを1つの依頼文にする。StaRt本編の初心者向け制作ナビ" />

      <section className="mb-6 border-2 border-sky-500 bg-sky-50 p-5 dark:border-sky-700 dark:bg-sky-950/30">
        <p className="text-[10px] font-semibold tracking-[0.2em] text-sky-700 dark:text-sky-300">ANIMATION LIBRARY — 作ったアニメーションはここ</p>
        <h2 className="mt-2 text-xl font-bold text-navy-900 dark:text-sand-100">まず「StaRt全体見本」→ 気になったら「演出レシピ図鑑」の順で見ます</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <Link to="/movie-coach/start-showcase" className="border-2 border-sky-500 bg-white p-4 dark:bg-navy-800">
            <p className="text-[10px] font-semibold tracking-widest text-sky-700 dark:text-sky-300">最初に見る</p>
            <h3 className="mt-1 font-bold text-navy-900 dark:text-sand-100">▶ StaRt全体見本</h3>
            <p className="mt-2 text-xs leading-5 text-navy-600 dark:text-navy-300">曲全体のどこで、どの動きを使うかを見る画面。</p>
          </Link>
          <Link to="/movie-coach/director-recipes" className="border border-sand-300 bg-white p-4 dark:border-navy-600 dark:bg-navy-800">
            <p className="text-[10px] font-semibold tracking-widest text-navy-400">詳しく選ぶ</p>
            <h3 className="mt-1 font-bold text-navy-900 dark:text-sand-100">🎞 演出レシピ図鑑（97種類）</h3>
            <p className="mt-2 text-xs leading-5 text-navy-600 dark:text-navy-300">Favorite・Maybe・Rejectを付けて候補を絞る画面。</p>
          </Link>
          <Link to="/movie-coach/start-motion-kit" className="border border-sand-300 bg-white p-4 dark:border-navy-600 dark:bg-navy-800">
            <p className="text-[10px] font-semibold tracking-widest text-navy-400">基礎から見る</p>
            <h3 className="mt-1 font-bold text-navy-900 dark:text-sand-100">✦ 基礎アニメーション図鑑（36種類）</h3>
            <p className="mt-2 text-xs leading-5 text-navy-600 dark:text-navy-300">文字・写真・切替・リズムの基本パーツを見る画面。</p>
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-3 border-t border-sky-200 pt-4 sm:flex-row sm:items-center sm:justify-between dark:border-sky-800">
          <p className="text-xs leading-5 text-sky-900 dark:text-sky-200"><strong>実際に動くプレビュー：</strong>Remotion Studioを起動すると、作った全Compositionを再生できます。</p>
          <button onClick={() => copy("cd /Users/m-shogo/Developer/personal/wedding-project/motion-studio && pnpm dev:director-recipes", "studio")} className="shrink-0 border border-sky-700 bg-white px-4 py-2 text-xs font-bold text-sky-900 dark:bg-navy-800 dark:text-sky-200">
            {copied === "studio" ? "起動コマンドをコピーしました ✓" : "動く図鑑の起動コマンドをコピー"}
          </button>
        </div>
      </section>

      <section className="mb-6 border-2 border-emerald-500 bg-emerald-50 p-5 dark:border-emerald-700 dark:bg-emerald-950/30">
        <p className="text-[10px] font-semibold tracking-[0.2em] text-emerald-700 dark:text-emerald-300">NEXT ACTION</p>
        <h2 className="mt-2 text-xl font-bold text-navy-900 dark:text-sand-100">{getStartNextAction(state)}</h2>
        <p className="mt-2 text-sm text-navy-600 dark:text-navy-300">迷ったら、この緑の枠に書かれた作業だけ進めてください。選択内容はこのブラウザ内へ自動保存されます。</p>
      </section>

      <section className="mb-7 grid grid-cols-1 gap-px bg-sand-200 md:grid-cols-4 dark:bg-navy-600">
        {steps.map((step) => <div key={step.label} className="bg-white p-4 dark:bg-navy-800">
          <p className={`text-xs font-bold ${step.done ? "text-emerald-700 dark:text-emerald-300" : "text-navy-800 dark:text-sand-100"}`}>{step.done ? "✓ " : "○ "}{step.label}</p>
          <p className="mt-1 text-[10px] font-mono text-navy-400">{step.detail}</p>
        </div>)}
      </section>

      <section className="mb-8 border-2 border-fuchsia-500 bg-fuchsia-50 p-5 dark:border-fuchsia-700 dark:bg-fuchsia-950/20">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.2em] text-fuchsia-700 dark:text-fuchsia-300">CREATIVE IDEA ASSISTANT</p>
            <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">完成形を想像しながら、使いたい案だけ選ぶ</h2>
          </div>
          <span className="border border-fuchsia-400 bg-white px-3 py-1 text-xs font-bold text-fuchsia-800 dark:bg-navy-800 dark:text-fuchsia-200">{state.selectedCreativeIdeaIds.length}案を採用候補に追加済み</span>
        </div>
        <p className="mt-2 text-sm leading-6 text-navy-600 dark:text-navy-300">まず全体の方向を1つ選び、区間ごとの案を眺めます。アイデアは必須ではありません。追加した案だけがJSONとCodex用プロンプトへ入り、最終採用はRoughを見て人間が決めます。</p>

        <div className="mt-5">
          <p className="text-[10px] font-semibold tracking-widest text-fuchsia-700 dark:text-fuchsia-300">1. 全体の雰囲気を選ぶ</p>
          <div className="mt-2 grid gap-3 lg:grid-cols-3">
            {startCreativeDirections.map((direction) => {
              const selected = state.creativeDirectionId === direction.id;
              return <button key={direction.id} onClick={() => update((current) => ({...current, creativeDirectionId: direction.id}))} className={`border-2 p-4 text-left ${selected ? "border-fuchsia-500 bg-white dark:bg-navy-800" : "border-fuchsia-200 bg-fuchsia-50/50 opacity-70 dark:border-fuchsia-900 dark:bg-navy-900"}`}>
                <h3 className="font-bold text-navy-900 dark:text-sand-100">{selected ? "✓" : "○"} {direction.label}</h3>
                <p className="mt-2 text-xs leading-5 text-navy-700 dark:text-navy-200">{direction.summary}</p>
                <p className="mt-2 text-[11px] leading-5 text-navy-500 dark:text-navy-300"><strong>映像ルール：</strong>{direction.visualRule}</p>
                <p className="mt-1 text-[11px] leading-5 text-red-600 dark:text-red-300"><strong>注意：</strong>{direction.risk}</p>
              </button>;
            })}
          </div>
        </div>

        <div className="mt-6 border-t border-fuchsia-200 pt-5 dark:border-fuchsia-800">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <label className="text-[10px] font-semibold tracking-widest text-fuchsia-700 dark:text-fuchsia-300">2. アイデアを見る区間
              <select value={ideaSectionId} onChange={(event) => setIdeaSectionId(event.target.value as StartExtendedSectionId)} className="mt-1 block min-w-64 border border-fuchsia-300 bg-white px-3 py-2 text-sm text-navy-800 dark:border-fuchsia-800 dark:bg-navy-900 dark:text-sand-100">
                {startExtendedSections.map((section, index) => <option key={section.id} value={section.id}>{index + 1}. {section.label}</option>)}
              </select>
            </label>
            <p className="text-xs text-navy-500 dark:text-navy-300">各区間に2案・全28案。必要素材と注意点も先に確認できます。</p>
          </div>
          <div className="mt-3 grid gap-3 lg:grid-cols-2">
            {visibleCreativeIdeas.map((idea) => {
              const selected = state.selectedCreativeIdeaIds.includes(idea.id);
              return <article key={idea.id} className={`border-2 p-4 ${selected ? "border-fuchsia-500 bg-white dark:bg-navy-800" : "border-fuchsia-200 bg-white/70 dark:border-fuchsia-900 dark:bg-navy-900"}`}>
                <div className="flex items-center justify-between gap-2">
                  <span className="bg-fuchsia-100 px-2 py-1 text-[10px] font-bold text-fuchsia-800 dark:bg-fuchsia-900 dark:text-fuchsia-200">{creativeCategoryLabels[idea.category]}</span>
                  <span className="font-mono text-[9px] text-navy-400">{idea.id}</span>
                </div>
                <h3 className="mt-3 font-bold text-navy-900 dark:text-sand-100">{idea.title}</h3>
                <p className="mt-2 text-sm leading-6 text-navy-700 dark:text-navy-200">{idea.suggestion}</p>
                <p className="mt-2 text-xs leading-5 text-navy-600 dark:text-navy-300"><strong>なぜ効く：</strong>{idea.why}</p>
                <div className="mt-3 grid gap-2 bg-fuchsia-50 p-3 text-xs leading-5 sm:grid-cols-2 dark:bg-fuchsia-950/30">
                  <p><strong className="block text-fuchsia-800 dark:text-fuchsia-200">必要素材</strong>{idea.materialHint}</p>
                  <p><strong className="block text-red-700 dark:text-red-300">注意</strong>{idea.caution}</p>
                </div>
                <button onClick={() => toggleCreativeIdea(idea.id)} className={`mt-3 w-full border px-3 py-2 text-xs font-bold ${selected ? "border-red-300 text-red-600" : "border-fuchsia-600 bg-fuchsia-600 text-white"}`}>{selected ? "候補から外す" : "採用候補に追加（Promptへ入る）"}</button>
              </article>;
            })}
          </div>
          {state.selectedCreativeIdeaIds.length > 0 && <details className="mt-3 border border-fuchsia-300 bg-white p-3 dark:border-fuchsia-800 dark:bg-navy-800">
            <summary className="cursor-pointer text-xs font-bold text-fuchsia-800 dark:text-fuchsia-200">追加済み{state.selectedCreativeIdeaIds.length}案を確認</summary>
            <ul className="mt-3 space-y-2 text-xs text-navy-700 dark:text-navy-200">
              {state.selectedCreativeIdeaIds.map((id) => {
                const idea = startCreativeIdeas.find((item) => item.id === id);
                if (!idea) return null;
                const section = startExtendedSections.find((item) => item.id === idea.sectionId);
                return <li key={id} className="flex items-center justify-between gap-3 border-t border-fuchsia-100 pt-2 dark:border-fuchsia-900"><span><strong>{section?.label}：</strong>{idea.title}</span><button onClick={() => toggleCreativeIdea(id)} className="shrink-0 text-red-600">外す</button></li>;
              })}
            </ul>
          </details>}
        </div>
      </section>

      <section className="mb-8">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-navy-900 pb-3 dark:border-sand-100">
          <div><p className="text-[10px] font-semibold tracking-[0.2em] text-sky-700 dark:text-sky-300">STEP 1</p><h2 className="text-xl font-bold text-navy-900 dark:text-sand-100">Motion Familyを4〜8個に絞る</h2></div>
          <p className={`text-sm font-bold ${familyValid ? "text-emerald-700" : "text-red-600"}`}>{state.selectedFamilyIds.length}個選択中 {familyValid ? "✓" : "（4〜8個にしてください）"}</p>
        </div>
        <p className="my-3 text-sm leading-6 text-navy-600 dark:text-navy-300">最初から推奨6系統を選択済みです。わからなければ、そのままで問題ありません。これは制作開始用の候補で、最終採用ではありません。</p>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {startMotionFamilies.map((family) => {
            const selected = state.selectedFamilyIds.includes(family.id);
            return <button key={family.id} onClick={() => toggleFamily(family.id)} className={`p-4 text-left border-2 ${selected ? "border-sky-500 bg-sky-50 dark:bg-sky-950/30" : "border-sand-200 bg-white opacity-60 dark:border-navy-600 dark:bg-navy-800"}`}>
              <div className="flex items-center justify-between"><h3 className="font-bold text-navy-900 dark:text-sand-100">{selected ? "✓" : "○"} {family.label}</h3><span className="text-[10px] font-mono text-navy-400">{family.recipeIds.length} recipes</span></div>
              <p className="mt-2 text-sm text-navy-700 dark:text-navy-200">{family.role}</p>
              <p className="mt-1 text-xs text-navy-500 dark:text-navy-300">初心者ルール：{family.beginnerRule}</p>
              <p className="mt-1 text-xs text-red-600 dark:text-red-300">避ける：{family.avoid}</p>
            </button>;
          })}
        </div>
      </section>

      <section className="mb-8">
        <div className="border-b-2 border-navy-900 pb-3 dark:border-sand-100"><p className="text-[10px] font-semibold tracking-[0.2em] text-sky-700 dark:text-sky-300">STEP 2</p><h2 className="text-xl font-bold text-navy-900 dark:text-sand-100">14セクションを上から確認する</h2></div>
        <p className="my-3 text-sm leading-6 text-navy-600 dark:text-navy-300">各行は推奨案を選択済みです。変更するなら候補リストから選び、気になった点だけコメントしてください。仮秒数は正規音源確認後に直します。</p>
        <div className="space-y-3">
          {startExtendedSections.map((section, index) => {
            const starter = startStarterSectionPlan.find((item) => item.sectionId === section.id);
            const recipeId = state.recipeBySection[section.id];
            const recipe = getDirectorRecipeById(recipeId);
            const fidelity = recipe ? getDirectorRecipeVisualAudit(recipe).fidelity : "placeholder";
            return <details key={section.id} className="border border-sand-200 bg-white dark:border-navy-600 dark:bg-navy-800" open={index === 0}>
              <summary className="cursor-pointer p-4 list-none grid grid-cols-[auto_1fr_auto] items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy-900 text-xs font-bold text-white dark:bg-sand-100 dark:text-navy-900">{index + 1}</span>
                <span><strong className="text-navy-900 dark:text-sand-100">{section.label}</strong><span className="ml-2 text-xs font-mono text-navy-400">{section.referenceStartSec}–{section.referenceEndSec}s 仮</span><span className="block text-xs text-navy-500 dark:text-navy-300">{starter?.beginnerGoal}</span></span>
                <span className={`border px-2 py-1 text-[10px] font-mono uppercase ${fidelity === "exact" ? "border-emerald-400 text-emerald-700" : fidelity === "representative" ? "border-amber-400 text-amber-700" : "border-red-400 text-red-600"}`}>{fidelity}</span>
              </summary>
              <div className="grid gap-4 border-t border-sand-200 p-4 lg:grid-cols-2 dark:border-navy-600">
                <div>
                  <label className="text-[10px] font-semibold tracking-widest text-navy-400">RECIPE
                    <select value={recipeId} onChange={(event) => selectRecipe(section.id, event.target.value)} className="mt-1 block w-full border border-sand-300 bg-white px-3 py-2 text-sm text-navy-800 dark:border-navy-600 dark:bg-navy-900 dark:text-sand-100">
                      {sectionRecipeOptions(section.id).map((option) => <option key={option.id} value={option.id}>{option.label} — {option.id}</option>)}
                    </select>
                  </label>
                  <p className="mt-3 text-xs leading-5 text-navy-600 dark:text-navy-300"><strong>必要素材：</strong>{starter?.mediaRole}</p>
                  <p className="mt-1 text-xs leading-5 text-navy-600 dark:text-navy-300"><strong>狙い：</strong>{recipe?.purpose}</p>
                  <p className="mt-1 text-xs font-mono text-navy-400">human: {decisions[recipeId] ?? "unreviewed"}</p>
                </div>
                <label className="text-[10px] font-semibold tracking-widest text-navy-400">COMMENT（直してほしい点）
                  <textarea value={state.commentsBySection[section.id] ?? ""} onChange={(event) => update((current) => ({...current, commentsBySection: {...current.commentsBySection, [section.id]: event.target.value}}))} placeholder="例：写真をもう少し長く見せたい" className="mt-1 min-h-24 w-full border border-sand-300 bg-white p-3 text-sm text-navy-800 dark:border-navy-600 dark:bg-navy-900 dark:text-sand-100" />
                </label>
              </div>
            </details>;
          })}
        </div>
      </section>

      <section className="mb-8 grid gap-5 xl:grid-cols-2">
        <div className="border-2 border-amber-400 bg-amber-50 p-5 dark:bg-amber-950/20">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-amber-700 dark:text-amber-300">STEP 3 — AUDIO_BLOCKED / MEDIA_BLOCKED</p>
          <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">実素材と音源の準備</h2>
          <p className="mt-2 text-sm leading-6 text-navy-600 dark:text-navy-300">チェックは「ファイルを実際に確認した後」に入れてください。ここを押しても素材自体はアップロードされません。</p>
          <div className="mt-4 space-y-2">
            {(Object.keys(readinessLabels) as (keyof StartSelectionState["readiness"])[]).map((key) => <label key={key} className="flex items-start gap-3 border border-amber-200 bg-white p-3 text-sm text-navy-800 dark:border-amber-900 dark:bg-navy-800 dark:text-sand-100">
              <input type="checkbox" checked={state.readiness[key]} onChange={() => update((current) => ({...current, readiness: {...current.readiness, [key]: !current.readiness[key]}}))} className="mt-1" />
              {readinessLabels[key]}
            </label>)}
          </div>
          <div className="mt-5 border-t border-amber-300 pt-4 dark:border-amber-800">
            <h3 className="font-bold text-navy-900 dark:text-sand-100">まず原本を置く場所</h3>
            <p className="mt-1 text-xs leading-5 text-navy-600 dark:text-navy-300">写真・動画・音源本体はGitへ入りません。ファイル名は後からCodexが整理できるので、まず種類ごとのフォルダへ入れてください。</p>
            <div className="mt-3 grid gap-2 bg-white p-3 text-xs text-navy-700 sm:grid-cols-3 dark:bg-navy-800 dark:text-navy-200">
              <div><strong className="block text-amber-700 dark:text-amber-300">① パスをコピー</strong>下のボタンを押す</div>
              <div><strong className="block text-amber-700 dark:text-amber-300">② Finderで ⌘⇧G</strong>「フォルダへ移動」を開く</div>
              <div><strong className="block text-amber-700 dark:text-amber-300">③ 貼り付けてEnter</strong>表示された場所へ原本を入れる</div>
            </div>
            <div className="mt-3 space-y-2">
              {startSourceFolders.map((folder) => <div key={folder.path} className="border border-amber-200 bg-white p-3 dark:border-amber-900 dark:bg-navy-800">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-navy-800 dark:text-sand-100"><span className="mr-2 inline-block bg-amber-200 px-1.5 py-0.5 font-mono text-[9px] text-amber-900 dark:bg-amber-800 dark:text-amber-100">{folder.step}</span>{folder.label}</p>
                    <code className="mt-1 block overflow-x-auto whitespace-nowrap text-[10px] text-navy-600 dark:text-navy-300">{folder.path}</code>
                    <p className="mt-1 text-[10px] text-navy-500 dark:text-navy-300">{folder.note}</p>
                    <p className="mt-1 text-[10px] text-navy-400">対応目安：{folder.formats}</p>
                    <p className="mt-1 text-[10px] font-mono text-navy-400">ファイル名例：{folder.example}</p>
                  </div>
                  <button onClick={() => copyAssetPath(folder.path)} className="shrink-0 border border-navy-500 px-2 py-1 text-[10px] text-navy-700 dark:text-sand-200">{copiedAssetPath === folder.path ? "コピー済み ✓" : "パスをコピー"}</button>
                </div>
              </div>)}
            </div>
            <details className="mt-3 border border-amber-300 bg-white p-3 dark:border-amber-800 dark:bg-navy-800">
              <summary className="cursor-pointer text-xs font-bold text-navy-900 dark:text-sand-100">💡 素材投入Tips — 最初はやらなくていいこと</summary>
              <ul className="mt-3 space-y-2 text-xs leading-5 text-navy-600 dark:text-navy-300">
                <li>・全部のファイル名を完璧に直さなくてOK。場所や人物が分かる名前なら十分です。</li>
                <li>・写真を先にトリミング・縮小・色補正しなくてOK。原本を残してください。</li>
                <li>・動画を先に短く編集しなくてOK。使う区間はRough作成時に選びます。</li>
                <li>・音源候補を利用確認前に<code>licensed</code>へ入れないでください。</li>
                <li>・Remotionの<code>public</code>フォルダへ自分でコピーしなくてOK。採用後にCodexが接続します。</li>
              </ul>
            </details>
            <div className="mt-3 bg-amber-100 p-3 text-xs leading-5 text-amber-900 dark:bg-amber-900/30 dark:text-amber-200">
              <strong>置き終わったら：</strong>この画面の「使える写真を一覧化した」などをチェックし、Codex用プロンプトをコピーしてください。Codexが採用素材だけをRemotion用フォルダへ接続し、14セクションへ割り当てます。原本を直接移動・上書きしません。
            </div>
            <Link to="/asset-placement-guide" className="mt-3 inline-block border border-navy-700 px-3 py-2 text-xs dark:border-sand-300">全素材の置き場ルールを見る</Link>
          </div>
        </div>

        <div className="border-2 border-sky-400 bg-sky-50 p-5 dark:bg-sky-950/20">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-sky-700 dark:text-sky-300">STEP 4 — HANDOFF</p>
          <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">チェックとコメントを1つにまとめる</h2>
          <p className="mt-2 text-sm leading-6 text-navy-600 dark:text-navy-300">Codex用プロンプトには、全体方向・追加したCreative Ideas・選んだ6系統・14区間・Favorite・コメント・未準備項目・安全条件がすべて入ります。</p>
          <label className="mt-4 block text-[10px] font-semibold tracking-widest text-navy-400">全体コメント
            <textarea value={state.globalComment} onChange={(event) => update((current) => ({...current, globalComment: event.target.value}))} placeholder="例：全体を楽しく。ただし写真が読める時間は残したい" className="mt-1 min-h-24 w-full border border-sand-300 bg-white p-3 text-sm text-navy-800 dark:border-navy-600 dark:bg-navy-900 dark:text-sand-100" />
          </label>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <button onClick={() => copy(prompt, "prompt")} className="bg-navy-900 px-4 py-3 text-sm font-bold text-white dark:bg-sand-100 dark:text-navy-900">{copied === "prompt" ? "コピーしました ✓" : "Codex用プロンプトをコピー"}</button>
            <button onClick={() => downloadText("start-codex-prompt.md", prompt, "text/markdown")} className="border border-navy-700 px-4 py-3 text-sm font-bold dark:border-sand-300">プロンプトを保存</button>
            <button onClick={() => copy(JSON.stringify(shortlist, null, 2), "json")} className="border border-navy-700 px-4 py-3 text-sm font-bold dark:border-sand-300">{copied === "json" ? "コピーしました ✓" : "Shortlist JSONをコピー"}</button>
            <button onClick={() => downloadText("start-shortlist.json", JSON.stringify(shortlist, null, 2), "application/json")} className="border border-navy-700 px-4 py-3 text-sm font-bold dark:border-sand-300">Shortlist JSONを保存</button>
          </div>
          <button onClick={() => copy("cd motion-studio && pnpm render:start-extended-rough", "render")} className="mt-2 w-full border border-emerald-600 px-4 py-3 text-sm font-bold text-emerald-800 dark:text-emerald-300">{copied === "render" ? "コピーしました ✓" : "Rough render commandをコピー"}</button>
          <details className="mt-4"><summary className="cursor-pointer text-xs font-bold text-sky-800 dark:text-sky-200">生成されるプロンプトを確認</summary><pre className="mt-2 max-h-80 overflow-auto whitespace-pre-wrap border border-sky-200 bg-white p-3 text-xs leading-5 text-navy-700 dark:border-sky-900 dark:bg-navy-900 dark:text-navy-200">{prompt}</pre></details>
        </div>
      </section>

      <section className="mb-8 flex flex-wrap items-center justify-between gap-3 border border-sand-300 p-4 dark:border-navy-600">
        <p className="text-sm text-navy-600 dark:text-navy-300">選定済みレシピ内のFavorite：<strong className="text-navy-900 dark:text-sand-100">{favoriteCount}</strong>件。Catalog全体からFavoriteだけ見直すこともできます。</p>
        <div className="flex gap-2"><Link to="/movie-coach/director-recipes?human=favorite" className="border border-navy-700 px-3 py-2 text-xs dark:border-sand-300">Favoriteだけ見直す</Link><button onClick={() => update(() => structuredClone(defaultStartSelectionState))} className="border border-red-300 px-3 py-2 text-xs text-red-600">推奨案へ戻す</button></div>
      </section>
    </div>
  );
}
