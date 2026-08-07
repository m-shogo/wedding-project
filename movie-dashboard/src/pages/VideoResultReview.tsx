import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { useProduction } from "../store/productionStore";
import { useToast } from "../store/toastStore";
import { generateId } from "../lib/ids";
import {
  classifyVideoFailure,
  latestRejectedCategory,
  latestRejectedReason,
  videoFailureCategoryById,
  VIDEO_FAILURE_CATEGORIES,
  type VideoFailureCategoryId,
} from "../lib/videoFailureTaxonomy";
import {
  loadVideoReviewDrafts,
  saveVideoReviewDrafts,
  type VideoReviewDraftEntry,
} from "../lib/videoReviewDraftStorage";
import { parseVideoResultProbeEvidence } from "../lib/videoResultProbeEvidence";
import type { Prompt } from "../types/movie";

type ReviewFilter = "ready" | "waiting" | "adopted" | "rejected" | "all";
type ReviewCheck = { id: string; label: string };

const COMMON_CHECKS: ReviewCheck[] = [
  { id: "forbidden", label: "人物・動物・読める文字・ロゴ・看板が0" },
  { id: "single-motion", label: "主動作が1つで、勝手なカット・追加アクションがない" },
  { id: "geometry", label: "建築・翼・窓枠・水平線などの形状が時間方向に安定している" },
  { id: "physics", label: "カメラの加減速と被写体の慣性が自然" },
  { id: "light", label: "光・影・反射・露出がフレーム間で連続している" },
  { id: "caption", label: "必要なテロップ余白が最後まで維持されている" },
  { id: "anti-ai", label: "不要なフレア・粒子・過剰発光・ツルツルしたAIショーリール感がない" },
  { id: "real-footage", label: "前後の実写真・実動画と比べて、このカットだけ不自然に浮かない" },
  { id: "capcut", label: "CapCutの実尺で前後ショットと接続して違和感がない" },
];

const EMPTY_REVIEW_DRAFT: VideoReviewDraftEntry = {
  checks: {},
  reason: "",
  selectedResultAssetId: "",
  updatedAt: "",
};

function parseQaFocus(notes: string) {
  const lines = notes.split("\n");
  for (const line of lines) {
    const marker = "qa=";
    const index = line.indexOf(marker);
    if (index >= 0) return line.slice(index + marker.length).trim();
  }
  return "";
}

function parseNoteValue(notes: string, key: string) {
  const match = notes.match(new RegExp(`${key}=([^\\s/]+)`));
  return match?.[1] ?? "";
}

function parseLastNoteValue(notes: string, key: string) {
  const lines = notes.split("\n");
  const pattern = new RegExp(`${key}=([^\\s/]+)`);
  for (let index = lines.length - 1; index >= 0; index -= 1) {
    const match = lines[index].match(pattern);
    if (match?.[1]) return match[1];
  }
  return "";
}

function appendReviewNote(notes: string, line: string) {
  const trimmed = notes.trim();
  return trimmed ? `${trimmed}\n${line}` : line;
}

function lastReviewNote(notes: string) {
  const lines = notes.split("\n").filter((line) => line.startsWith("video-review="));
  return lines.length > 0 ? lines[lines.length - 1] : "";
}

function sanitizeReason(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function baseRetryPrompt(prompt: string) {
  const marker = "\n\nRetry correction ";
  const index = prompt.indexOf(marker);
  return index >= 0 ? prompt.slice(0, index).trim() : prompt.trim();
}

function formatProbeTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("ja-JP", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

function shortFingerprint(value?: string) {
  if (!value) return "";
  const parts = value.split(":");
  const digest = parts[parts.length - 1] ?? value;
  return `…${digest.slice(-12)}`;
}

export function VideoResultReview() {
  const { selectedMovieId, data, moviePrompts, addPromptLinkedToScenes, updatePrompt } = useProduction();
  const { addToast } = useToast();
  const [filter, setFilter] = useState<ReviewFilter>("ready");
  const [reviewDrafts, setReviewDrafts] = useState(loadVideoReviewDrafts);

  const sourcePrompts = selectedMovieId === "all" ? data.prompts : moviePrompts;
  const videoPrompts = sourcePrompts.filter((prompt) => prompt.target === "video");
  const counts = useMemo(() => ({
    ready: videoPrompts.filter((prompt) => prompt.status === "testing" && prompt.resultAssetIds.length > 0).length,
    waiting: videoPrompts.filter((prompt) => (prompt.status === "draft" || prompt.status === "testing") && prompt.resultAssetIds.length === 0).length,
    adopted: videoPrompts.filter((prompt) => prompt.status === "adopted").length,
    rejected: videoPrompts.filter((prompt) => prompt.status === "rejected").length,
  }), [videoPrompts]);

  const filteredPrompts = videoPrompts.filter((prompt) => {
    if (filter === "all") return true;
    if (filter === "ready") return prompt.status === "testing" && prompt.resultAssetIds.length > 0;
    if (filter === "waiting") return (prompt.status === "draft" || prompt.status === "testing") && prompt.resultAssetIds.length === 0;
    return prompt.status === filter;
  });

  function reviewDraft(promptId: string) {
    return reviewDrafts[promptId] ?? EMPTY_REVIEW_DRAFT;
  }

  function updateReviewDraft(promptId: string, patch: Partial<Omit<VideoReviewDraftEntry, "updatedAt">>) {
    setReviewDrafts((previous) => {
      const current = previous[promptId] ?? EMPTY_REVIEW_DRAFT;
      const next = {
        ...previous,
        [promptId]: {
          ...current,
          ...patch,
          checks: patch.checks ?? current.checks,
          updatedAt: new Date().toISOString(),
        },
      };
      saveVideoReviewDrafts(next);
      return next;
    });
  }

  function clearReviewDraft(promptId: string) {
    setReviewDrafts((previous) => {
      const next = { ...previous };
      delete next[promptId];
      saveVideoReviewDrafts(next);
      return next;
    });
  }

  function sceneText(prompt: Prompt) {
    const names = prompt.relatedSceneIds.map((sceneId) => {
      const scene = data.scenes.find((item) => item.sceneId === sceneId);
      if (!scene) return sceneId;
      const movie = data.movies.find((item) => item.movieId === scene.movieId);
      return selectedMovieId === "all" ? `${movie?.title ?? scene.movieId} / ${scene.title}` : scene.title;
    });
    return names.join(" / ") || "未紐付け";
  }

  function reviewChecks(prompt: Prompt): ReviewCheck[] {
    const qaFocus = parseQaFocus(prompt.notes);
    return qaFocus ? [...COMMON_CHECKS, { id: "preset-focus", label: `プリセット重点: ${qaFocus}` }] : COMMON_CHECKS;
  }

  function isChecked(promptId: string, checkId: string) { return reviewDraft(promptId).checks[checkId] ?? false; }
  function toggleCheck(promptId: string, checkId: string) {
    const current = reviewDraft(promptId);
    updateReviewDraft(promptId, {
      checks: {
        ...current.checks,
        [checkId]: !(current.checks[checkId] ?? false),
      },
    });
  }
  function allChecked(prompt: Prompt) { return reviewChecks(prompt).every((item) => isChecked(prompt.promptId, item.id)); }

  function effectiveSelectedResult(prompt: Prompt) {
    const resultAssets = data.assets.filter((asset) => prompt.resultAssetIds.includes(asset.assetId));
    const saved = parseLastNoteValue(prompt.notes, "selected-result-asset");
    const selectedId = reviewDraft(prompt.promptId).selectedResultAssetId || saved || (resultAssets.length === 1 ? resultAssets[0]?.assetId ?? "" : "");
    return resultAssets.find((asset) => asset.assetId === selectedId);
  }

  function markAdopted(prompt: Prompt) {
    const resultAssets = data.assets.filter((asset) => prompt.resultAssetIds.includes(asset.assetId));
    if (resultAssets.length === 0) { addToast("結果素材を先にPromptへ紐付けてください", "error"); return; }
    const selected = effectiveSelectedResult(prompt);
    if (!selected) {
      addToast(resultAssets.length > 1 ? "採用する結果動画を1本選んでください" : "採用する結果Assetを確認してください", "error");
      return;
    }
    const selectedProbe = parseVideoResultProbeEvidence(selected.notes);
    if (!selectedProbe?.sampleFingerprint) {
      addToast("採用前に実体fingerprintを記録してください。実体再probeは動画本体を変更しません", "error");
      return;
    }
    const items = reviewChecks(prompt);
    if (!allChecked(prompt)) { addToast("すべてのQAを確認してから採用してください", "error"); return; }
    const fingerprintAuthority = ` / reviewed-sample-fingerprint=${selectedProbe.sampleFingerprint} / reviewed-probe-at=${selectedProbe.probedAt} / reviewed-preview-frames=${selectedProbe.previewFrameCount}`;
    const note = `video-review=passed / reviewedAt=${new Date().toISOString()} / checks=${items.length}/${items.length} / selected-result-asset=${selected.assetId}${fingerprintAuthority}`;
    updatePrompt({ ...prompt, status: "adopted", notes: appendReviewNote(prompt.notes, note) });
    clearReviewDraft(prompt.promptId);
    addToast(`QA PASS → 「${selected.title}」をfingerprint付き採用正本にしました`, "success");
  }

  function markRejected(prompt: Prompt) {
    const draft = reviewDraft(prompt.promptId);
    const category = videoFailureCategoryById(draft.failureCategoryId);
    if (!category) { addToast("失敗カテゴリを1つ選んでください", "error"); return; }
    const detail = sanitizeReason(draft.reason);
    const reason = detail || category.label;
    const note = `video-review=rejected / reviewedAt=${new Date().toISOString()} / failure-category=${category.id} / reason=${reason}`;
    updatePrompt({ ...prompt, status: "rejected", notes: appendReviewNote(prompt.notes, note) });
    clearReviewDraft(prompt.promptId);
    addToast(`${category.icon} ${category.label} として不採用を記録しました`, "info");
  }

  function createRetryDraft(prompt: Prompt) {
    const reason = latestRejectedReason(prompt.notes);
    if (!reason) { addToast("先に不採用理由を記録してください", "error"); return; }
    const category = latestRejectedCategory(prompt.notes) ?? classifyVideoFailure(reason);
    const previousAttempt = Number(parseLastNoteValue(prompt.notes, "retry-attempt") || "0");
    const nextAttempt = previousAttempt + 1;
    if (nextAttempt > 3) { addToast("同系統の再生成が3回に達しました。静止画・参照素材・ショット設計・モデルを見直してください", "error"); return; }

    const retryId = generateId("prompt");
    const retryRoot = parseLastNoteValue(prompt.notes, "retry-root") || prompt.promptId;
    const correction = `Retry correction ${nextAttempt}/3: ${category.correction} Preserve the intended composition, timing, single primary action and camera behavior otherwise unchanged.`;
    const retryNote = `retry-of=${prompt.promptId} / retry-root=${retryRoot} / retry-attempt=${nextAttempt} / source-failure-category=${category.id} / source-review=${reason}`;
    addPromptLinkedToScenes({
      ...prompt,
      promptId: retryId,
      title: `${prompt.title} / retry ${nextAttempt}`,
      prompt: `${baseRetryPrompt(prompt.prompt)}\n\n${correction}`,
      relatedSceneIds: [],
      status: "draft",
      resultAssetIds: [],
      notes: appendReviewNote(prompt.notes, retryNote),
    }, prompt.relatedSceneIds);
    addToast(`再生成ドラフト retry ${nextAttempt}/3 を作成しました。sceneリンクもUndo 1回で戻せます`, "success");
  }

  return <div>
    <Header title="AI動画 結果レビュー" description="複数variantから採用正本を1本確定し、QA・失敗学習・編集Handoffまで一貫して記録します" showMovieSelector />
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">{[["ready","レビュー待ち",counts.ready],["waiting","結果待ち",counts.waiting],["adopted","採用",counts.adopted],["rejected","不採用",counts.rejected]].map(([key,label,count]) => <button key={String(key)} type="button" onClick={() => setFilter(key as ReviewFilter)} className={`rounded-xl border p-4 text-left transition ${filter === key ? "border-navy-600 ring-1 ring-navy-300 bg-navy-50 dark:bg-navy-700" : "border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 hover:bg-sand-50 dark:hover:bg-navy-700"}`}><p className="text-xs text-navy-400">{label}</p><p className="text-2xl font-bold text-navy-800 dark:text-sand-100">{count}</p></button>)}</div>
    <div className="flex flex-wrap items-center gap-3 mb-6"><select value={filter} onChange={(e) => setFilter(e.target.value as ReviewFilter)} className="form-input w-auto min-w-[170px]"><option value="ready">レビュー待ち</option><option value="waiting">結果待ち</option><option value="adopted">採用済み</option><option value="rejected">不採用</option><option value="all">すべて</option></select><span className="text-xs text-navy-400">表示 {filteredPrompts.length}件 / 動画Prompt {videoPrompts.length}件</span><span className="text-xs text-emerald-700 dark:text-emerald-300">✓ QA途中入力はこのブラウザへ自動保存</span><div className="ml-auto flex gap-2"><Link to="/video-generation-queue" className="px-3 py-2 text-xs rounded-lg border border-sand-200 dark:border-navy-600 text-navy-600 dark:text-navy-200">← 生成キュー</Link><Link to="/prompts" className="px-3 py-2 text-xs rounded-lg bg-navy-700 text-white hover:bg-navy-800">Prompt Bank</Link></div></div>
    {filteredPrompts.length === 0 ? <div className="rounded-xl border border-dashed border-sand-300 dark:border-navy-600 p-10 text-center text-sm text-navy-400">この条件のレビュー対象はありません。</div> : <div className="space-y-6">{filteredPrompts.map((prompt) => {
      const resultAssets = data.assets.filter((asset) => prompt.resultAssetIds.includes(asset.assetId));
      const draft = reviewDraft(prompt.promptId);
      const items = reviewChecks(prompt); const checkedCount = items.filter((item) => isChecked(prompt.promptId,item.id)).length;
      const preset = parseNoteValue(prompt.notes,"preset"); const finishCandidate = parseNoteValue(prompt.notes,"finish-candidate");
      const reviewNote = lastReviewNote(prompt.notes); const retryAttempt = Number(parseLastNoteValue(prompt.notes,"retry-attempt") || "0");
      const savedFailureCategory = latestRejectedCategory(prompt.notes);
      const savedSelectedResultId = parseLastNoteValue(prompt.notes, "selected-result-asset");
      const reviewedFingerprint = parseLastNoteValue(prompt.notes, "reviewed-sample-fingerprint");
      const selectedResultId = draft.selectedResultAssetId || savedSelectedResultId || (resultAssets.length === 1 ? resultAssets[0]?.assetId ?? "" : "");
      const selectedResultAsset = resultAssets.find((asset) => asset.assetId === selectedResultId);
      const selectedResultProbe = selectedResultAsset ? parseVideoResultProbeEvidence(selectedResultAsset.notes) : undefined;
      const selectedHasFingerprint = Boolean(selectedResultProbe?.sampleFingerprint);
      const canReview = prompt.status === "testing" && resultAssets.length > 0;
      const hasSavedDraft = Boolean(draft.updatedAt);
      return <article key={prompt.promptId} className="rounded-xl border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-sand-100 dark:border-navy-600 flex flex-wrap items-start gap-3"><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2 mb-1"><h2 className="font-bold text-navy-800 dark:text-sand-100">{prompt.title}</h2><span className="px-2 py-0.5 rounded-full text-[11px] bg-sand-100 dark:bg-navy-700 text-navy-600 dark:text-navy-200">{prompt.tool}</span>{preset && <span className="px-2 py-0.5 rounded-full text-[11px] bg-sand-100 dark:bg-navy-700 text-navy-500 dark:text-navy-300">{preset}</span>}{retryAttempt > 0 && <span className="px-2 py-0.5 rounded-full text-[11px] bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300">retry {retryAttempt}/3</span>}{savedFailureCategory && <span className="px-2 py-0.5 rounded-full text-[11px] bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300">{savedFailureCategory.icon} {savedFailureCategory.label}</span>}{prompt.status === "adopted" && selectedResultId && <span className="px-2 py-0.5 rounded-full text-[11px] bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300">採用Asset確定</span>}{prompt.status === "adopted" && reviewedFingerprint && <span className="px-2 py-0.5 rounded-full text-[11px] bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-300">QA fp {shortFingerprint(reviewedFingerprint)}</span>}{canReview && hasSavedDraft && <span className="px-2 py-0.5 rounded-full text-[11px] bg-sky-100 dark:bg-sky-900/30 text-sky-800 dark:text-sky-300">途中保存あり</span>}</div><p className="text-xs text-navy-400">シーン: {sceneText(prompt)}</p>{finishCandidate && <p className="text-xs text-navy-400 mt-0.5">仕上げ候補: {finishCandidate}</p>}</div><div className="text-right"><p className="text-xs text-navy-400">QA</p><p className={`text-lg font-bold ${checkedCount === items.length ? "text-emerald-700 dark:text-emerald-300" : "text-navy-700 dark:text-sand-100"}`}>{checkedCount}/{items.length}</p></div></div>
        <div className="p-5 grid grid-cols-1 xl:grid-cols-[0.8fr_1.2fr] gap-6"><div className="space-y-4"><div><div className="flex items-center gap-2 mb-2"><p className="text-xs font-semibold text-navy-400 tracking-wider">結果素材 ({resultAssets.length})</p>{resultAssets.length > 1 && canReview && <span className="text-[11px] text-amber-600 dark:text-amber-300">QA PASS前に採用する1本を選択</span>}</div>{resultAssets.length > 0 ? <div className="space-y-2">{resultAssets.map((asset) => {
          const selected = selectedResultId === asset.assetId;
          const probe = parseVideoResultProbeEvidence(asset.notes);
          const probeComplete = (probe?.previewFrameCount ?? 0) >= 3;
          const reviewFingerprintMismatch = Boolean(selected && reviewedFingerprint && probe?.sampleFingerprint && reviewedFingerprint !== probe.sampleFingerprint);
          return <button key={asset.assetId} type="button" disabled={!canReview} onClick={() => updateReviewDraft(prompt.promptId, { selectedResultAssetId: asset.assetId })} className={`w-full rounded-lg border p-3 text-left transition ${reviewFingerprintMismatch ? "border-red-400 bg-red-50 dark:border-red-700 dark:bg-red-900/20 ring-1 ring-red-300" : selected ? "border-emerald-400 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-900/20 ring-1 ring-emerald-300" : "border-sand-200 bg-sand-50 dark:border-navy-600 dark:bg-navy-700"} ${canReview ? "hover:border-emerald-300" : "cursor-default"}`}><div className="flex flex-wrap items-center gap-2"><span className="font-medium text-sm text-navy-700 dark:text-navy-200">{asset.title}</span>{selected && <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300">{prompt.status === "adopted" ? "採用正本" : "採用候補"}</span>}{probeComplete ? <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300">実メディアprobe + 3フレーム</span> : probe ? <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300">probe済み / preview {probe.previewFrameCount}枚</span> : <span className="px-2 py-0.5 rounded-full text-[10px] bg-sand-200 dark:bg-navy-600 text-navy-500 dark:text-navy-300">probe証跡なし</span>}{probe?.sampleFingerprint && <span className="px-2 py-0.5 rounded-full text-[10px] bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-300">fp {shortFingerprint(probe.sampleFingerprint)}</span>}{reviewFingerprintMismatch && <span className="px-2 py-0.5 rounded-full text-[10px] bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">QA時fingerprintと不一致</span>}<span className="ml-auto text-[11px] text-navy-400">{asset.status}</span></div>{asset.path && <code className="block mt-1 text-[11px] text-navy-400 break-all">{asset.path}</code>}{probe && <p className="mt-1 text-[10px] text-navy-400">probe {formatProbeTime(probe.probedAt)} · これは人間QA PASSではありません{reviewFingerprintMismatch ? ` · QA時 ${shortFingerprint(reviewedFingerprint)} → 現在 ${shortFingerprint(probe.sampleFingerprint)}` : ""}</p>}</button>;
        })}</div> : <div className="rounded-lg border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20 p-3 text-xs text-amber-800 dark:text-amber-300">結果素材が未登録です。Prompt Bankで生成結果を紐付けてからレビューします。</div>}</div><details><summary className="cursor-pointer text-xs font-medium text-navy-500 dark:text-navy-300">生成プロンプトを確認</summary><div className="mt-3 space-y-2"><pre className="text-xs text-navy-700 dark:text-navy-200 bg-sand-50 dark:bg-navy-700 rounded-lg p-3 whitespace-pre-wrap break-words font-mono">{prompt.prompt}</pre>{prompt.negativePrompt && <pre className="text-xs text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 rounded-lg p-3 whitespace-pre-wrap break-words font-mono">{prompt.negativePrompt}</pre>}</div></details>{reviewNote && <div><p className="text-xs font-semibold text-navy-400 tracking-wider mb-2">前回レビュー</p><code className="block text-[11px] text-navy-500 dark:text-navy-300 bg-sand-50 dark:bg-navy-700 rounded-lg p-3 break-words">{reviewNote}</code></div>}</div>
          <div><p className="text-xs font-semibold text-navy-400 tracking-wider mb-3">QA CHECKLIST</p><div className="space-y-2.5">{items.map((item) => <label key={item.id} className={`flex items-start gap-3 rounded-lg border p-3 ${isChecked(prompt.promptId,item.id) ? "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-900/20" : "border-sand-200 dark:border-navy-600"}`}><input type="checkbox" checked={isChecked(prompt.promptId,item.id)} onChange={() => toggleCheck(prompt.promptId,item.id)} disabled={!canReview} className="mt-0.5"/><span className="text-sm text-navy-700 dark:text-navy-200">{item.label}</span></label>)}</div>
            {canReview && <div className="mt-5 pt-5 border-t border-sand-100 dark:border-navy-600"><p className="form-label">失敗カテゴリ（不採用時は必須）</p><div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">{VIDEO_FAILURE_CATEGORIES.map((category) => { const selected = draft.failureCategoryId === category.id; return <button key={category.id} type="button" onClick={() => updateReviewDraft(prompt.promptId, { failureCategoryId: category.id as VideoFailureCategoryId })} className={`rounded-lg border p-2.5 text-left text-xs transition ${selected ? "border-red-400 bg-red-50 text-red-800 dark:border-red-700 dark:bg-red-900/20 dark:text-red-300 ring-1 ring-red-300" : "border-sand-200 dark:border-navy-600 text-navy-600 dark:text-navy-200 hover:bg-sand-50 dark:hover:bg-navy-700"}`}><span className="mr-1">{category.icon}</span>{category.label}</button>; })}</div><label className="form-label">失敗の補足（任意）</label><textarea value={draft.reason} onChange={(e) => updateReviewDraft(prompt.promptId, { reason: e.target.value })} className="form-input" rows={2} placeholder="例: 3秒付近だけ窓枠が歪む。カテゴリだけで十分なら空欄でOK。"/><p className="mt-1 text-xs text-navy-400">カテゴリを正本として保存します。自由記述は再現条件・秒数などの補足だけに使います。未確定入力はこのブラウザだけに保存されます。</p>{resultAssets.length > 1 && !selectedResultId && <div className="mt-3 rounded-lg border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20 p-2.5 text-xs text-amber-800 dark:text-amber-300">QA PASSする場合は左側の結果動画から採用する1本を選んでください。不採用は選択なしでも記録できます。</div>}{selectedResultId && !selectedHasFingerprint && <div className="mt-3 rounded-lg border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20 p-2.5 text-xs text-amber-800 dark:text-amber-300">採用候補に実体fingerprintがありません。<Link to="/video-asset-reprobe" className="ml-1 font-medium underline">実体再probe</Link>で証跡を追加してからQA PASSしてください。動画本体は変更しません。</div>}<div className="mt-3 grid grid-cols-2 gap-3"><button type="button" onClick={() => markRejected(prompt)} className="px-4 py-2.5 text-sm rounded-lg border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20">カテゴリ付きで不採用を記録</button><button type="button" onClick={() => markAdopted(prompt)} disabled={!allChecked(prompt) || !selectedHasFingerprint || (resultAssets.length > 1 && !selectedResultId)} className="px-4 py-2.5 text-sm rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed">QA PASS → 選択Assetを採用</button></div>{hasSavedDraft && <button type="button" onClick={() => clearReviewDraft(prompt.promptId)} className="mt-2 text-xs text-navy-400 hover:text-red-600 underline">この途中入力だけ破棄</button>}</div>}
            {prompt.status === "rejected" && <div className="mt-5 pt-5 border-t border-sand-100 dark:border-navy-600">{retryAttempt < 3 ? <><p className="text-sm font-medium text-navy-700 dark:text-navy-200">失敗カテゴリを次の試作へ引き継ぐ</p><p className="mt-1 text-xs text-navy-400">Prompt本文にはカテゴリ専用の肯定文補正だけを追加し、具体的な失敗メモはnotesへ保持します。retry {retryAttempt + 1}/3。</p><button type="button" onClick={() => createRetryDraft(prompt)} className="mt-3 w-full px-4 py-2.5 text-sm rounded-lg bg-navy-700 text-white hover:bg-navy-800">再生成ドラフト retry {retryAttempt + 1}/3 を作成</button></> : <div className="rounded-lg border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20 p-3 text-sm text-amber-800 dark:text-amber-300">同系統の再生成が3回に達しています。文章を足し続けず、静止画・参照素材・ショット設計・モデルを見直してください。<div className="mt-2"><Link to="/video-prompt-builder" className="font-medium underline">動画プロンプトへ戻る →</Link></div></div>}</div>}
          </div></div>
      </article>;
    })}</div>}
  </div>;
}
