import { useMemo, useRef, useState } from "react";
import { Header } from "../components/Header";
import { DemoStockMediaShelf } from "../components/DemoStockMediaShelf";
import { MaskRevealEditableWorkspace } from "../components/MaskRevealEditableWorkspace";
import { MotionZukanProductionWorkspace } from "../components/MotionZukanProductionWorkspace";
import { MotionActualVerificationWorkspace } from "../components/MotionActualVerificationWorkspace";
import { ProfileRealMediaQaAuditCard } from "../components/ProfileRealMediaQaAuditCard";
import { RemotionElementReadinessPanel } from "../components/RemotionElementReadinessPanel";
import { WeddingDavinciDeliveryReadinessCard } from "../components/WeddingDavinciDeliveryReadinessCard";
import { WeddingDavinciGuiActualStartGateCard } from "../components/WeddingDavinciGuiActualStartGateCard";
import { WeddingDavinciTransitionActualReadinessCard } from "../components/WeddingDavinciTransitionActualReadinessCard";
import { getMotionLearningBundle } from "../data/motionLearningLinks";
import { getLatestPreviewEvidence } from "../data/motionPreviewEvidence";
import { getRemotionElementCandidate } from "../data/remotionElementCandidates";
import {
  getPatternImplementation,
  getPatternPreview,
  searchMotionPatterns,
} from "../data/visualMotionLibrary";

type OpeningSPickMeta = {
  score: 4 | 5;
  difficulty: "かんたん" | "ふつう" | "少し難しい";
  bestFor: string;
  why: string;
};

const openingSPicks: Record<string, OpeningSPickMeta> = {
  "type-mask-reveal": {
    score: 5,
    difficulty: "ふつう",
    bestFor: "冒頭タイトル・名前・地名",
    why: "実写真を主役のまま残しつつ、旅行映画っぽいタイトル感だけを足せる。StaRtの文字アクセントにも合わせやすい。",
  },
  "cut-match-shape": {
    score: 5,
    difficulty: "少し難しい",
    bestFor: "旅行先の切替・写真→動画",
    why: "似た形や位置をつないで場面転換でき、旅の記録が一本につながって見える。テンプレ感を出さずに印象を残せる。",
  },
  "photo-small-push": {
    score: 5,
    difficulty: "かんたん",
    bestFor: "思い出写真・余韻・人物写真",
    why: "写真そのものを見せたい今回のOpeningと最も相性がいい基本動作。派手さを足さず、静止画を自然に映像へできる。",
  },
  "photo-directional-pan": {
    score: 4,
    difficulty: "かんたん",
    bestFor: "視線誘導・横長写真・移動感",
    why: "写真の中の視線や移動方向を利用でき、旅行テーマの『次へ進む感じ』を自然に出せる。使いすぎない前提で強い。",
  },
};

function getOpeningSPick(patternId: string) {
  return openingSPicks[patternId] ?? null;
}

function isOpeningSPick(patternId: string) {
  return Boolean(getOpeningSPick(patternId));
}

function actualRenderLabel(sourceType: string) {
  if (sourceType === "ACTUAL_PALMIER_RENDER") return "PALMIER";
  if (sourceType === "ACTUAL_DAVINCI_RENDER") return "DAVINCI";
  return "SOURCE MEDIA";
}

function davinciPathLabel(kind?: string) {
  if (!kind) return "未確認";
  const normalized = kind.toUpperCase();
  if (normalized.includes("FUSION")) return "Fusion向き";
  if (normalized.includes("TEXT_PLUS")) return "Text+ / Fusion";
  if (normalized.includes("EDIT")) return "Editで作りやすい";
  if (normalized.includes("PALMIER")) return "Palmier中心";
  return kind;
}

function selfBuildDifficulty(kind?: string) {
  if (!kind) return "未確認";
  const normalized = kind.toUpperCase();
  if (normalized.includes("PALMIER") || normalized.includes("EDIT_NATIVE") || normalized === "DAVINCI_EDIT") return "★☆☆ かんたん";
  if (normalized.includes("TEXT_PLUS") || normalized.includes("DAVINCI_BUILTIN")) return "★★☆ ふつう";
  if (normalized.includes("FUSION") || normalized.includes("MIXED") || normalized.includes("REMOTION")) return "★★★ むずかしめ";
  return "★★☆ ふつう";
}

export function VisualMotionLibrary() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "PRODUCTION_READY" | "TESTED" | "EXTERNAL_GATE">("ALL");
  const [focusFilter, setFocusFilter] = useState<"ALL" | "S">("ALL");
  const searchRef = useRef<HTMLInputElement>(null);
  const patterns = useMemo(() => searchMotionPatterns(query)
    .filter((pattern) => focusFilter === "ALL" || isOpeningSPick(pattern.id))
    .filter((pattern) => {
      if (statusFilter === "ALL") return true;
      const status = getPatternImplementation(pattern)?.status;
      if (statusFilter === "EXTERNAL_GATE") return status !== "PRODUCTION_READY" && status !== "TESTED";
      return status === statusFilter;
    })
    .sort((a, b) => {
      const aPick = getOpeningSPick(a.id);
      const bPick = getOpeningSPick(b.id);
      if (aPick && bPick) return bPick.score - aPick.score;
      return Number(Boolean(bPick)) - Number(Boolean(aPick));
    }), [query, statusFilter, focusFilter]);
  const completion = useMemo(() => {
    const all = searchMotionPatterns("");
    const implementations = all.map((pattern) => ({ pattern, implementation: getPatternImplementation(pattern) }));
    return {
      total: all.length,
      productionReady: implementations.filter(({ implementation }) => implementation?.status === "PRODUCTION_READY").length,
      tested: implementations.filter(({ implementation }) => implementation?.status === "TESTED").length,
      remaining: implementations.filter(({ implementation }) => implementation?.status !== "PRODUCTION_READY" && implementation?.status !== "TESTED").map(({ pattern }) => pattern.id),
      sPicks: all.filter((pattern) => isOpeningSPick(pattern.id)).length,
    };
  }, []);

  function scrollToCatalog() {
    requestAnimationFrame(() => searchRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  function showSPicks() {
    setQuery("");
    setStatusFilter("ALL");
    setFocusFilter("S");
    scrollToCatalog();
  }

  function showPattern(patternId: string) {
    setQuery(patternId);
    setFocusFilter("ALL");
    setStatusFilter("EXTERNAL_GATE");
    scrollToCatalog();
  }

  return (
    <div>
      <Header
        title="モーション図鑑"
        description="まず動画を見て『これ』を選ぶ。名前が分からなくても、日本語の言い方と一般名を知ってOpeningへ持ち込める図鑑"
      />

      <section className="mb-8 border-l-2 border-amber-500 pl-5" aria-label="モーション図鑑の使い方">
        <p className="text-[10px] tracking-[0.2em] font-semibold text-amber-700 dark:text-amber-300">FIRST STEP / 見てこれ</p>
        <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">名前を知らなくても、見た目から選べばいい</h2>
        <p className="mt-2 text-sm leading-6 text-navy-600 dark:text-navy-300">
          今は2026-10-24の結婚式Openingを最優先。まずPreviewを見て『これやりたい』を見つけ、図鑑が日本語名・一般名・検索語へ橋渡しする。
          <span className="ml-1 font-semibold text-amber-700 dark:text-amber-300">S</span> は今回のOpeningに特に合うと判断した少数の推し。一般人気の順位ではない。
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={showSPicks} className="min-h-11 rounded-full bg-amber-400 px-4 py-2 text-sm font-bold text-navy-950">
            Sだけ見る · {completion.sPicks}件
          </button>
          <button type="button" onClick={scrollToCatalog} className="min-h-11 rounded-full border border-sand-300 px-4 py-2 text-sm font-semibold text-navy-700 dark:border-navy-600 dark:text-sand-100">
            全演出から探す
          </button>
        </div>
      </section>

      <section className="mb-8 border-l-2 border-emerald-600 pl-5">
        <p className="text-[10px] tracking-[0.2em] font-semibold text-emerald-700 dark:text-emerald-300">VERTICAL SLICE / HUMAN MASTER</p>
        <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">Native App Actual 10件を、検証根拠と一緒に公開する</h2>
        <p className="mt-2 text-sm leading-6 text-navy-600 dark:text-navy-300">
          人間が理解できるScene Duration / Delay / Hold / Position / Direction等を正本として編集できるのはMask Revealのみ。
          他のMotion Kit presetは、31件の永続Remotion TESTEDと2件のsource-media Actual TESTEDを証拠種別ごとに分けている。Mask Reveal・Quiet Caption・Static Hero・Word Punch・Small Push・Slow Pull・Gentle Pan・Flash Soft・Char StaggerはDaVinci Actual、Hard Cut AccentはPalmier Actualまで到達済み。
        </p>
      </section>

      <section className="mb-8 border border-sand-300 dark:border-navy-600 bg-white dark:bg-navy-800 p-5" aria-label="モーション図鑑の完成度">
        <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">COMPLETION / HONEST GATES</p>
        <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="border border-emerald-200 dark:border-emerald-900 p-3"><p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">{completion.productionReady}</p><p className="text-[11px] text-navy-500 dark:text-navy-300">Native App Actual</p></div>
          <div className="border border-sky-200 dark:border-sky-900 p-3"><p className="text-2xl font-bold text-sky-700 dark:text-sky-300">{completion.tested}</p><p className="text-[11px] text-navy-500 dark:text-navy-300">Implementation TESTED</p></div>
          <div className="border border-amber-200 dark:border-amber-900 p-3"><p className="text-2xl font-bold text-amber-700 dark:text-amber-300">{completion.remaining.length}</p><p className="text-[11px] text-navy-500 dark:text-navy-300">外部確認待ち</p></div>
          <div className="border border-sand-200 dark:border-navy-600 p-3"><p className="text-2xl font-bold text-navy-800 dark:text-sand-100">{completion.total}</p><p className="text-[11px] text-navy-500 dark:text-navy-300">全パターン</p></div>
        </div>
        <div className="mt-4 grid gap-2 text-xs md:grid-cols-2">
          <p className="border-l-2 border-emerald-500 pl-3"><span className="font-mono">type-quiet-caption</span> — DaVinci Fusionで静かなopacity fadeを実機確認済み</p>
          <p className="border-l-2 border-emerald-500 pl-3"><span className="font-mono">cut-hard-accent</span> — Palmier native hard cutをframe 63 / BGM downbeatで確認済み</p>
          <p className="border-l-2 border-emerald-500 pl-3"><span className="font-mono">photo-static-hero</span> — DaVinci Edit page nativeでpan/zoom無しの静止Heroを実機確認済み</p>
          <p className="border-l-2 border-emerald-500 pl-3"><span className="font-mono">type-word-punch</span> — DaVinci Fusion Saverで単発Blendパンチ(GO!)を実機確認済み</p>
          <p className="border-l-2 border-emerald-500 pl-3"><span className="font-mono">photo-small-push</span> — DaVinci Fusion TransformのSize keyframe(1.00→1.05)を実機確認済み</p>
          <p className="border-l-2 border-emerald-500 pl-3"><span className="font-mono">photo-slow-pull</span> — DaVinci Fusion TransformのSize keyframe(1.06→1.00)を実機確認済み</p>
          <p className="border-l-2 border-emerald-500 pl-3"><span className="font-mono">photo-directional-pan</span> — DaVinci Fusion TransformのCenter keyframe(0.44→0.56)を実機確認済み</p>
          <p className="border-l-2 border-emerald-500 pl-3"><span className="font-mono">flash-one-frame-soft</span> — DaVinci Fusion Background+Mergeのソフトフラッシュを実機確認済み</p>
          <p className="border-l-2 border-emerald-500 pl-3"><span className="font-mono">type-char-stagger</span> — DaVinci Fusion 3x Text+の時間差Blendを実機確認済み</p>
          <p className="border-l-2 border-emerald-500 pl-3"><span className="font-mono">cut-match-shape</span> — Pexels実動画2本の太陽中心を合わせてTESTED</p>
          <p className="border-l-2 border-emerald-500 pl-3"><span className="font-mono">whip-source-matched</span> — Pexels列車窓2本の同方向camera motionでTESTED</p>
        </div>
        <p className="mt-3 text-[11px] text-navy-500 dark:text-navy-300">未検証ID: {completion.remaining.length ? completion.remaining.join(" / ") : "なし"}</p>
      </section>

      <MotionActualVerificationWorkspace onShowPattern={showPattern} />

      <MotionZukanProductionWorkspace />
      <WeddingDavinciDeliveryReadinessCard />
      <WeddingDavinciTransitionActualReadinessCard />
      <WeddingDavinciGuiActualStartGateCard />
      <div className="mb-10">
        <ProfileRealMediaQaAuditCard />
      </div>

      <DemoStockMediaShelf />

      <label className="block mb-5">
        <span className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">何をしたい？ 名前が分からなくてOK</span>
        <input
          ref={searchRef}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="例: 写真にゆっくり寄る / 人物の後ろに文字 / 写真同士を似た形でつなぐ / 文字 下からシュッ"
          className="mt-2 w-full border border-sand-300 dark:border-navy-600 bg-white dark:bg-navy-800 px-4 py-3 text-sm text-navy-900 dark:text-sand-100"
        />
      </label>

      <section className="mb-7" aria-label="演出を絞り込み">
        <div className="mb-3 flex flex-wrap gap-2">
          <button type="button" aria-pressed={focusFilter === "ALL"} onClick={() => setFocusFilter("ALL")} className={`min-h-11 rounded-full border px-4 py-2 text-xs font-bold ${focusFilter === "ALL" ? "border-navy-900 bg-navy-900 text-white dark:border-sand-100 dark:bg-sand-100 dark:text-navy-900" : "border-sand-300 text-navy-600 dark:border-navy-600 dark:text-navy-300"}`}>
            全演出
          </button>
          <button type="button" aria-pressed={focusFilter === "S"} onClick={() => setFocusFilter("S")} className={`min-h-11 rounded-full border px-4 py-2 text-xs font-bold ${focusFilter === "S" ? "border-amber-400 bg-amber-400 text-navy-950" : "border-amber-300 text-amber-700 dark:border-amber-700 dark:text-amber-300"}`}>
            S · OP推しだけ {completion.sPicks}
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {([
            ["ALL", `すべて ${completion.total}`],
            ["PRODUCTION_READY", `Native App Actual ${completion.productionReady}`],
            ["TESTED", `Implementation TESTED ${completion.tested}`],
            ["EXTERNAL_GATE", `外部確認待ち ${completion.remaining.length}`],
          ] as const).map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={statusFilter === value}
              onClick={() => setStatusFilter(value)}
              className={`min-h-11 border px-3 py-2 text-xs font-semibold ${statusFilter === value ? "border-navy-900 bg-navy-900 text-white dark:border-sand-100 dark:bg-sand-100 dark:text-navy-900" : "border-sand-300 text-navy-600 dark:border-navy-600 dark:text-navy-300"}`}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="mt-2 text-[11px] text-navy-500 dark:text-navy-300">表示中 {patterns.length}件 · Sは今回のOpening向け推し · Previewの検証とImplementationの検証は別判定</p>
      </section>

      <section className="space-y-6">
        {patterns.map((pattern) => {
          const preview = getPatternPreview(pattern);
          const previewEvidence = preview ? getLatestPreviewEvidence(preview.id) : null;
          const implementation = getPatternImplementation(pattern);
          const learning = getMotionLearningBundle(pattern.id);
          const remotionElement = getRemotionElementCandidate(pattern.id);
          const sPick = getOpeningSPick(pattern.id);
          const openingSPick = Boolean(sPick);

          return (
            <article key={pattern.id} className={`border bg-white dark:bg-navy-800 ${openingSPick ? "border-amber-400 dark:border-amber-500" : "border-sand-300 dark:border-navy-600"}`}>
              <div className="grid grid-cols-1 xl:grid-cols-[1.15fr_1fr]">
                <div className="min-h-[260px] bg-navy-950 text-white flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
                  {preview?.assetPath ? (
                    <video src={preview.assetPath} poster={preview.posterPath ?? undefined} controls loop muted playsInline className="w-full max-h-[420px] object-contain" />
                  ) : (
                    <div className="text-center max-w-lg">
                      <p className="text-[10px] tracking-[0.22em] text-amber-300 font-semibold">CONCEPT PREVIEW / 実装確認前</p>
                      <p className="mt-5 text-2xl md:text-3xl font-bold tracking-[0.08em]">{pattern.commonName}</p>
                      <p className="mt-5 text-sm leading-6 text-navy-200">{pattern.looksLike}</p>
                      {implementation && !implementation.installed && (
                        <p className="mt-3 text-[10px] leading-5 text-amber-200">
                          {implementation.kind} / まだ実Render・実機検証を行っていない({implementation.studioRequired ? "DaVinci等のアプリ操作が必要" : "motion-studioでの書き出しが未実施"})。
                        </p>
                      )}
                    </div>
                  )}
                  <span className="absolute top-3 left-3 px-2 py-1 text-[9px] font-mono border border-white/30 bg-black/30">
                    {preview?.sourceType ?? "MISSING"} / {preview?.status ?? "MISSING"}
                  </span>
                  {openingSPick && (
                    <span className="absolute top-3 right-3 rounded-full bg-amber-400 px-3 py-1 text-xs font-black text-navy-950 shadow-sm" title="今回の結婚式Openingに特に合うと判断した推し">
                      S · OP推し
                    </span>
                  )}
                  {previewEvidence && (
                    <div className="absolute bottom-3 left-3 right-3 border border-emerald-300/30 bg-black/55 px-3 py-2 text-left">
                      <p className="text-[10px] font-semibold text-emerald-300">
                        {previewEvidence.classification === "ACTUAL"
                          ? `ACTUAL ${actualRenderLabel(previewEvidence.sourceType)} RENDER QA ✓ / IMPLEMENTATION EVIDENCE`
                          : "CONCEPT RENDER QA ✓ / NOT DAVINCI ACTUAL"}
                      </p>
                      <p className="mt-1 text-[9px] leading-4 text-navy-200">
                        {previewEvidence.renderSpec.width}×{previewEvidence.renderSpec.height} / {previewEvidence.renderSpec.fps}fps / {previewEvidence.renderSpec.frames}frames · Human Visual QA {previewEvidence.humanVisualQa.result}
                      </p>
                      {!previewEvidence.persistentAssetPath && previewEvidence.workflowRunId && (
                        <p className="mt-1 text-[9px] leading-4 text-amber-200">期限付きartifactで検証済み。永続MP4がないため、この画面では静止placeholderのまま。</p>
                      )}
                      {!previewEvidence.persistentAssetPath && !previewEvidence.workflowRunId && (
                        <p className="mt-1 text-[9px] leading-4 text-amber-200">ローカルRenderで検証済み(out/配下・Git外の一時ファイル)。永続MP4がないため、この画面では静止placeholderのまま。</p>
                      )}
                      {previewEvidence.persistentAssetPath && (
                        <p className="mt-1 text-[9px] leading-4 text-emerald-200">
                          {previewEvidence.classification === "ACTUAL"
                            ? `永続${actualRenderLabel(previewEvidence.sourceType)} Actual assetを表示中。Human Master Scene値とは分離した実装証拠です。`
                            : implementation?.verified
                              ? "永続Remotion previewを表示中。DaVinci Actualではなく、図鑑用の実装検証証拠です。"
                              : "永続representative previewを表示中。見た目の説明用で、Implementation検証証拠ではありません。"}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div className="p-5 sm:p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">{pattern.categories.join(" / ")}</p>
                    {openingSPick && <span className="rounded-full border border-amber-400 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-300">S · 今回のOP候補</span>}
                  </div>
                  <h2 className="mt-1 text-2xl font-bold text-navy-900 dark:text-sand-100">{pattern.japaneseName}</h2>
                  <p className="mt-1 text-sm font-mono text-navy-400">一般名: {pattern.commonName} · {pattern.id}</p>
                  <p className="mt-3 border-l-2 border-sand-300 pl-3 text-sm leading-6 text-navy-700 dark:border-navy-500 dark:text-navy-200">見た目: {pattern.looksLike}</p>
                  <p className="mt-4 text-sm leading-7 text-navy-600 dark:text-navy-300">{pattern.naturalDescription}</p>

                  <div className="mt-5 grid gap-2 sm:grid-cols-3" aria-label="3秒で判断">
                    <div className="border border-sand-200 dark:border-navy-600 p-3">
                      <p className="text-[10px] font-semibold text-navy-400">OPおすすめ</p>
                      <p className="mt-1 text-sm font-bold text-navy-900 dark:text-sand-100">{sPick ? `${"★".repeat(sPick.score)}${"☆".repeat(5 - sPick.score)}` : pattern.openingFit}</p>
                    </div>
                    <div className="border border-sand-200 dark:border-navy-600 p-3">
                      <p className="text-[10px] font-semibold text-navy-400">自作難易度</p>
                      <p className="mt-1 text-sm font-bold text-navy-900 dark:text-sand-100">{sPick?.difficulty ?? selfBuildDifficulty(implementation?.kind)}</p>
                    </div>
                    <div className="border border-sand-200 dark:border-navy-600 p-3 sm:col-span-1">
                      <p className="text-[10px] font-semibold text-navy-400">向いてる場面</p>
                      <p className="mt-1 text-sm font-bold text-navy-900 dark:text-sand-100">{sPick?.bestFor ?? pattern.goodFor[0] ?? "用途を確認"}</p>
                    </div>
                  </div>

                  {sPick && (
                    <div className="mt-3 border-l-4 border-amber-400 bg-amber-50 px-4 py-3 dark:bg-amber-950/20">
                      <p className="text-[10px] font-black tracking-[0.16em] text-amber-700 dark:text-amber-300">WHY S / 今回これを推す理由</p>
                      <p className="mt-1 text-sm leading-6 text-navy-700 dark:text-navy-200">{sPick.why}</p>
                    </div>
                  )}

                  <div className="mt-5 flex flex-wrap gap-2">
                    {pattern.aliases.slice(0, 6).map((alias) => (
                      <span key={alias} className="px-2 py-1 text-[10px] border border-sand-300 dark:border-navy-600 text-navy-500 dark:text-navy-300">{alias}</span>
                    ))}
                  </div>

                  <details className="mt-6 border-t border-sand-200 pt-4 dark:border-navy-600">
                    <summary className="min-h-11 cursor-pointer py-2 text-sm font-bold text-navy-800 dark:text-sand-100">作り方・DaVinci情報を見る</summary>
                    <dl className="mt-3 grid grid-cols-2 gap-x-5 gap-y-3 text-xs text-navy-600 dark:text-navy-300">
                      <div><dt className="font-semibold">Opening</dt><dd>{pattern.openingFit}</dd></div>
                      <div><dt className="font-semibold">Profile</dt><dd>{pattern.profileFit}</dd></div>
                      <div><dt className="font-semibold">Palmier</dt><dd>{pattern.palmierCapability}</dd></div>
                      <div><dt className="font-semibold">DaVinciで作るなら</dt><dd>{davinciPathLabel(implementation?.kind)}</dd></div>
                      <div><dt className="font-semibold">Implementation</dt><dd>{implementation?.status ?? "DISCOVERED"}</dd></div>
                      <div><dt className="font-semibold">Verified</dt><dd>{implementation?.verified ? "YES" : "NO"}</dd></div>
                    </dl>

                    {remotionElement && <RemotionElementReadinessPanel candidate={remotionElement} />}

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
                  </details>
                </div>
              </div>

              {pattern.id === "type-mask-reveal" && (
                <div className="border-t border-sand-200 dark:border-navy-600 p-6">
                  <MaskRevealEditableWorkspace />
                </div>
              )}
            </article>
          );
        })}
      </section>
    </div>
  );
}
