import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { useProduction } from "../store/productionStore";
import { useToast } from "../store/toastStore";
import { generateId } from "../lib/ids";
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

function rejectedReason(notes: string) {
  const review = lastReviewNote(notes);
  const marker = "reason=";
  const index = review.indexOf(marker);
  return index >= 0 ? review.slice(index + marker.length).trim() : "";
}

function sanitizeReason(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function baseRetryPrompt(prompt: string) {
  const marker = "\n\nRetry correction ";
  const index = prompt.indexOf(marker);
  return index >= 0 ? prompt.slice(0, index).trim() : prompt.trim();
}

export function VideoResultReview() {
  const { selectedMovieId, data, moviePrompts, addPrompt, updatePrompt, linkPromptToScene } = useProduction();
  const { addToast } = useToast();
  const [filter, setFilter] = useState<ReviewFilter>("ready");
  const [checks, setChecks] = useState<Record<string, Record<string, boolean>>>({});
  const [reasons, setReasons] = useState<Record<string, string>>({});

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

  function isChecked(promptId: string, checkId: string) { return checks[promptId]?.[checkId] ?? false; }
  function toggleCheck(promptId: string, checkId: string) {
    setChecks((prev) => ({ ...prev, [promptId]: { ...(prev[promptId] ?? {}), [checkId]: !(prev[promptId]?.[checkId] ?? false) } }));
  }
  function allChecked(prompt: Prompt) { return reviewChecks(prompt).every((item) => isChecked(prompt.promptId, item.id)); }

  function markAdopted(prompt: Prompt) {
    if (prompt.resultAssetIds.length === 0) { addToast("結果素材を先にPromptへ紐付けてください", "error"); return; }
    const items = reviewChecks(prompt);
    if (!allChecked(prompt)) { addToast("すべてのQAを確認してから採用してください", "error"); return; }
    const note = `video-review=passed / reviewedAt=${new Date().toISOString()} / checks=${items.length}/${items.length}`;
    updatePrompt({ ...prompt, status: "adopted", notes: appendReviewNote(prompt.notes, note) });
    addToast("QA PASSとして採用しました", "success");
  }

  function markRejected(prompt: Prompt) {
    const reason = sanitizeReason(reasons[prompt.promptId] ?? "");
    if (!reason) { addToast("不採用・再生成の理由を入力してください", "error"); return; }
    const note = `video-review=rejected / reviewedAt=${new Date().toISOString()} / reason=${reason}`;
    updatePrompt({ ...prompt, status: "rejected", notes: appendReviewNote(prompt.notes, note) });
    addToast("不採用理由を記録しました", "info");
  }

  function createRetryDraft(prompt: Prompt) {
    const reason = rejectedReason(prompt.notes);
    if (!reason) { addToast("先に不採用理由を記録してください", "error"); return; }
    const previousAttempt = Number(parseLastNoteValue(prompt.notes, "retry-attempt") || "0");
    const nextAttempt = previousAttempt + 1;
    if (nextAttempt > 3) { addToast("同系統の再生成が3回に達しました。静止画・参照素材・ショット設計・モデルを見直してください", "error"); return; }

    const retryId = generateId("prompt");
    const retryRoot = parseLastNoteValue(prompt.notes, "retry-root") || prompt.promptId;
    const correction = `Retry correction ${nextAttempt}/3: Correct this verified defect: ${reason}. Keep the intended composition, timing, single primary action and camera behavior otherwise unchanged.`;
    const retryNote = `retry-of=${prompt.promptId} / retry-root=${retryRoot} / retry-attempt=${nextAttempt} / source-review=${reason}`;
    addPrompt({
      ...prompt,
      promptId: retryId,
      title: `${prompt.title} / retry ${nextAttempt}`,
      prompt: `${baseRetryPrompt(prompt.prompt)}\n\n${correction}`,
      relatedSceneIds: [],
      status: "draft",
      resultAssetIds: [],
      notes: appendReviewNote(prompt.notes, retryNote),
    });
    for (const sceneId of prompt.relatedSceneIds) linkPromptToScene(retryId, sceneId);
    addToast(`再生成ドラフト retry ${nextAttempt}/3 を作成しました`, "success");
  }

  return <div>
    <Header title="AI動画 結果レビュー" description="生成結果を同じQAで確認し、採用・再生成理由をPromptへ残します" showMovieSelector />
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">{[["ready","レビュー待ち",counts.ready],["waiting","結果待ち",counts.waiting],["adopted","採用",counts.adopted],["rejected","不採用",counts.rejected]].map(([key,label,count]) => <button key={String(key)} type="button" onClick={() => setFilter(key as ReviewFilter)} className={`rounded-xl border p-4 text-left transition ${filter === key ? "border-navy-600 ring-1 ring-navy-300 bg-navy-50 dark:bg-navy-700" : "border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 hover:bg-sand-50 dark:hover:bg-navy-700"}`}><p className="text-xs text-navy-400">{label}</p><p className="text-2xl font-bold text-navy-800 dark:text-sand-100">{count}</p></button>)}</div>
    <div className="flex flex-wrap items-center gap-3 mb-6"><select value={filter} onChange={(e) => setFilter(e.target.value as ReviewFilter)} className="form-input w-auto min-w-[170px]"><option value="ready">レビュー待ち</option><option value="waiting">結果待ち</option><option value="adopted">採用済み</option><option value="rejected">不採用</option><option value="all">すべて</option></select><span className="text-xs text-navy-400">表示 {filteredPrompts.length}件 / 動画Prompt {videoPrompts.length}件</span><div className="ml-auto flex gap-2"><Link to="/video-generation-queue" className="px-3 py-2 text-xs rounded-lg border border-sand-200 dark:border-navy-600 text-navy-600 dark:text-navy-200">← 生成キュー</Link><Link to="/prompts" className="px-3 py-2 text-xs rounded-lg bg-navy-700 text-white hover:bg-navy-800">Prompt Bank</Link></div></div>
    {filteredPrompts.length === 0 ? <div className="rounded-xl border border-dashed border-sand-300 dark:border-navy-600 p-10 text-center text-sm text-navy-400">この条件のレビュー対象はありません。</div> : <div className="space-y-6">{filteredPrompts.map((prompt) => {
      const resultAssets = data.assets.filter((asset) => prompt.resultAssetIds.includes(asset.assetId));
      const items = reviewChecks(prompt); const checkedCount = items.filter((item) => isChecked(prompt.promptId,item.id)).length;
      const preset = parseNoteValue(prompt.notes,"preset"); const finishCandidate = parseNoteValue(prompt.notes,"finish-candidate");
      const reviewNote = lastReviewNote(prompt.notes); const retryAttempt = Number(parseLastNoteValue(prompt.notes,"retry-attempt") || "0");
      const canReview = prompt.status === "testing" && resultAssets.length > 0;
      return <article key={prompt.promptId} className="rounded-xl border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-sand-100 dark:border-navy-600 flex flex-wrap items-start gap-3"><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2 mb-1"><h2 className="font-bold text-navy-800 dark:text-sand-100">{prompt.title}</h2><span className="px-2 py-0.5 rounded-full text-[11px] bg-sand-100 dark:bg-navy-700 text-navy-600 dark:text-navy-200">{prompt.tool}</span>{preset && <span className="px-2 py-0.5 rounded-full text-[11px] bg-sand-100 dark:bg-navy-700 text-navy-500 dark:text-navy-300">{preset}</span>}{retryAttempt > 0 && <span className="px-2 py-0.5 rounded-full text-[11px] bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300">retry {retryAttempt}/3</span>}</div><p className="text-xs text-navy-400">シーン: {sceneText(prompt)}</p>{finishCandidate && <p className="text-xs text-navy-400 mt-0.5">仕上げ候補: {finishCandidate}</p>}</div><div className="text-right"><p className="text-xs text-navy-400">QA</p><p className={`text-lg font-bold ${checkedCount === items.length ? "text-emerald-700 dark:text-emerald-300" : "text-navy-700 dark:text-sand-100"}`}>{checkedCount}/{items.length}</p></div></div>
        <div className="p-5 grid grid-cols-1 xl:grid-cols-[0.8fr_1.2fr] gap-6"><div className="space-y-4"><div><p className="text-xs font-semibold text-navy-400 tracking-wider mb-2">結果素材 ({resultAssets.length})</p>{resultAssets.length > 0 ? <div className="space-y-2">{resultAssets.map((asset) => <div key={asset.assetId} className="rounded-lg bg-sand-50 dark:bg-navy-700 p-3"><div className="flex items-center gap-2"><span className="font-medium text-sm text-navy-700 dark:text-navy-200">{asset.title}</span><span className="ml-auto text-[11px] text-navy-400">{asset.status}</span></div>{asset.path && <code className="block mt-1 text-[11px] text-navy-400 break-all">{asset.path}</code>}</div>)}</div> : <div className="rounded-lg border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20 p-3 text-xs text-amber-800 dark:text-amber-300">結果素材が未登録です。Prompt Bankで生成結果を紐付けてからレビューします。</div>}</div><details><summary className="cursor-pointer text-xs font-medium text-navy-500 dark:text-navy-300">生成プロンプトを確認</summary><div className="mt-3 space-y-2"><pre className="text-xs text-navy-700 dark:text-navy-200 bg-sand-50 dark:bg-navy-700 rounded-lg p-3 whitespace-pre-wrap break-words font-mono">{prompt.prompt}</pre>{prompt.negativePrompt && <pre className="text-xs text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 rounded-lg p-3 whitespace-pre-wrap break-words font-mono">{prompt.negativePrompt}</pre>}</div></details>{reviewNote && <div><p className="text-xs font-semibold text-navy-400 tracking-wider mb-2">前回レビュー</p><code className="block text-[11px] text-navy-500 dark:text-navy-300 bg-sand-50 dark:bg-navy-700 rounded-lg p-3 break-words">{reviewNote}</code></div>}</div>
          <div><p className="text-xs font-semibold text-navy-400 tracking-wider mb-3">QA CHECKLIST</p><div className="space-y-2.5">{items.map((item) => <label key={item.id} className={`flex items-start gap-3 rounded-lg border p-3 ${isChecked(prompt.promptId,item.id) ? "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-900/20" : "border-sand-200 dark:border-navy-600"}`}><input type="checkbox" checked={isChecked(prompt.promptId,item.id)} onChange={() => toggleCheck(prompt.promptId,item.id)} disabled={!canReview} className="mt-0.5"/><span className="text-sm text-navy-700 dark:text-navy-200">{item.label}</span></label>)}</div>
            {canReview && <div className="mt-5 pt-5 border-t border-sand-100 dark:border-navy-600"><label className="form-label">不採用 / 再生成理由</label><textarea value={reasons[prompt.promptId] ?? ""} onChange={(e) => setReasons((prev) => ({...prev,[prompt.promptId]:e.target.value}))} className="form-input" rows={3} placeholder="例: 窓枠が3秒付近で歪む。カメラをlockedにして再生成。"/><div className="mt-3 grid grid-cols-2 gap-3"><button type="button" onClick={() => markRejected(prompt)} className="px-4 py-2.5 text-sm rounded-lg border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20">不採用・再生成理由を記録</button><button type="button" onClick={() => markAdopted(prompt)} disabled={!allChecked(prompt)} className="px-4 py-2.5 text-sm rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed">QA PASS → 採用</button></div></div>}
            {prompt.status === "rejected" && <div className="mt-5 pt-5 border-t border-sand-100 dark:border-navy-600">{retryAttempt < 3 ? <><p className="text-sm font-medium text-navy-700 dark:text-navy-200">失敗理由を次の試作へ引き継ぐ</p><p className="mt-1 text-xs text-navy-400">元Promptとシーンを保持し、結果素材を空にした retry {retryAttempt + 1}/3 の下書きを作ります。</p><button type="button" onClick={() => createRetryDraft(prompt)} className="mt-3 w-full px-4 py-2.5 text-sm rounded-lg bg-navy-700 text-white hover:bg-navy-800">再生成ドラフト retry {retryAttempt + 1}/3 を作成</button></> : <div className="rounded-lg border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20 p-3 text-sm text-amber-800 dark:text-amber-300">同系統の再生成が3回に達しています。文章を足し続けず、静止画・参照素材・ショット設計・モデルを見直してください。<div className="mt-2"><Link to="/video-prompt-builder" className="font-medium underline">動画プロンプトへ戻る →</Link></div></div>}</div>}
          </div></div>
      </article>;
    })}</div>}
  </div>;
}
