import { useMemo, useState } from "react";
import { Header } from "../components/Header";
import { useProduction } from "../store/productionStore";
import { useToast } from "../store/toastStore";
import { buildPalmierAgentHandoff, routeVideoPrompt, selectedResultAssetId } from "../lib/videoExecutionRouter";
import { buildVideoDecisionRecords } from "../lib/videoDecisionRecord";
import { buildVideoContinuityReport, CONTINUITY_REVIEW_CHECKLIST } from "../lib/videoContinuity";
import {
  appendVideoContinuitySignoff,
  buildVideoContinuityFingerprint,
  buildVideoContinuitySignoffLine,
  latestVideoContinuitySignoff,
} from "../lib/videoContinuitySignoff";

function downloadText(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export function PalmierHandoff() {
  const { selectedMovieId, currentMovie, data, moviePrompts, movieScenes, updateScene } = useProduction();
  const { addToast } = useToast();
  const [copied, setCopied] = useState(false);
  const [copiedDecision, setCopiedDecision] = useState(false);
  const [copiedContinuity, setCopiedContinuity] = useState(false);

  const sourcePrompts = selectedMovieId === "all" ? data.prompts : moviePrompts;
  const sourceScenes = selectedMovieId === "all" ? data.scenes : movieScenes;
  const videoPrompts = sourcePrompts.filter((prompt) => prompt.target === "video");
  const movieTitle = currentMovie?.title ?? (selectedMovieId === "all" ? "All Movies" : selectedMovieId);

  function sceneName(prompt: (typeof videoPrompts)[number]) {
    const names = prompt.relatedSceneIds.map((sceneId) => {
      const scene = data.scenes.find((item) => item.sceneId === sceneId);
      if (!scene) return sceneId;
      const movie = data.movies.find((item) => item.movieId === scene.movieId);
      return selectedMovieId === "all" ? `${movie?.title ?? scene.movieId} / ${scene.title}` : scene.title;
    });
    return names.join(" / ") || "未紐付け";
  }

  const handoff = useMemo(() => buildPalmierAgentHandoff({
    movieTitle,
    prompts: videoPrompts,
    assets: data.assets,
    sceneName,
  }), [movieTitle, videoPrompts, data.assets]);

  const decisions = useMemo(() => buildVideoDecisionRecords({
    prompts: videoPrompts,
    allPrompts: data.prompts,
    assets: data.assets,
    sceneName,
  }), [videoPrompts, data.prompts, data.assets]);

  const continuity = useMemo(
    () => buildVideoContinuityReport(sourceScenes, videoPrompts, data.assets),
    [sourceScenes, videoPrompts, data.assets],
  );

  const continuityFingerprint = useMemo(
    () => buildVideoContinuityFingerprint(sourceScenes, videoPrompts, data.assets, continuity.issues),
    [sourceScenes, videoPrompts, data.assets, continuity.issues],
  );
  const continuitySignoff = useMemo(() => latestVideoContinuitySignoff(sourceScenes), [sourceScenes]);
  const continuityRequired = continuity.transitionCount > 0;
  const continuityCurrent = !continuityRequired || (selectedMovieId !== "all" && continuitySignoff?.fingerprint === continuityFingerprint);
  const continuityStale = continuityRequired && Boolean(continuitySignoff) && !continuityCurrent;

  const routeCounts = useMemo(() => {
    const counts = { palmier: 0, review: 0, edit: 0, external: 0, blocked: 0 };
    for (const prompt of videoPrompts) {
      const resultAssets = data.assets.filter((asset) => prompt.resultAssetIds.includes(asset.assetId));
      const route = routeVideoPrompt(prompt, resultAssets);
      if (route.destination === "palmier") counts.palmier += 1;
      else if (route.destination === "review") counts.review += 1;
      else if (route.destination === "edit") counts.edit += 1;
      else if (route.destination === "blocked") counts.blocked += 1;
      else counts.external += 1;
    }
    return counts;
  }, [videoPrompts, data.assets]);

  const decisionWarnings = decisions.records.reduce((sum, record) => sum + record.warnings.length, 0);
  const allVideoAdopted = videoPrompts.length > 0 && routeCounts.edit === videoPrompts.length;
  const editFixReady = allVideoAdopted && decisionWarnings === 0 && continuityCurrent;

  const continuityAuthorityMarkdown = useMemo(() => [
    "# Continuity Authority",
    "",
    `movie: ${movieTitle}`,
    `fingerprint: ${continuityFingerprint}`,
    `status: ${!continuityRequired ? "not-required" : continuityCurrent ? "passed-current" : continuityStale ? "stale" : "pending"}`,
    `reviewedAt: ${continuityCurrent ? continuitySignoff?.reviewedAt ?? "not-required" : continuitySignoff?.reviewedAt ?? "—"}`,
    `edit-fix-ready: ${editFixReady ? "yes" : "no"}`,
    "",
    continuityRequired
      ? "A continuity PASS is authoritative only for this fingerprint. Changing selected AI variants, scene duration, adjacent real media, model/preset, actual media metadata or detected continuity issues invalidates the previous PASS."
      : "No AI-related adjacent transition currently requires a separate continuity sign-off.",
    "",
  ].join("\n"), [movieTitle, continuityFingerprint, continuityRequired, continuityCurrent, continuityStale, continuitySignoff, editFixReady]);

  const combinedHandoffMarkdown = useMemo(
    () => `${handoff.markdown}\n\n${continuity.markdown}\n\n${continuityAuthorityMarkdown}`,
    [handoff.markdown, continuity.markdown, continuityAuthorityMarkdown],
  );

  function recordContinuityPass() {
    if (selectedMovieId === "all") {
      addToast("Continuity PASSはムービー単位です。対象ムービーを1つ選んでください", "error");
      return;
    }
    if (!continuityRequired) {
      addToast("現在はAI関連の前後境界がなく、追加のContinuity PASSは不要です", "info");
      return;
    }
    const targetScene = sourceScenes[0];
    if (!targetScene) {
      addToast("Continuity記録先のシーンがありません", "error");
      return;
    }
    const reviewedAt = new Date().toISOString();
    const line = buildVideoContinuitySignoffLine({
      fingerprint: continuityFingerprint,
      reviewedAt,
      warningCount: continuity.warningCount,
      transitionCount: continuity.transitionCount,
    });
    updateScene({ ...targetScene, notes: appendVideoContinuitySignoff(targetScene.notes, line) });
    addToast("連続再生QA PASSを現在の編集fingerprintへ記録しました", "success");
  }

  async function copyHandoff() {
    await navigator.clipboard.writeText(combinedHandoffMarkdown);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
    addToast("Palmier Agent Handoff + Continuity Gateをコピーしました", "success");
  }

  async function copyDecisionRecords() {
    await navigator.clipboard.writeText(decisions.markdown);
    setCopiedDecision(true);
    window.setTimeout(() => setCopiedDecision(false), 1600);
    addToast("採用Decision Recordをコピーしました", "success");
  }

  async function copyContinuity() {
    await navigator.clipboard.writeText(`${continuity.markdown}\n\n${continuityAuthorityMarkdown}`);
    setCopiedContinuity(true);
    window.setTimeout(() => setCopiedContinuity(false), 1600);
    addToast("Continuity Gate + authorityをコピーしました", "success");
  }

  function exportMarkdown() {
    downloadText("palmier-agent-handoff.md", combinedHandoffMarkdown, "text/markdown;charset=utf-8");
    addToast("Palmier Handoff + Continuity Markdownを書き出しました", "success");
  }

  function exportJson() {
    downloadText("palmier-agent-handoff.json", JSON.stringify({
      movieTitle,
      editFixReady,
      prompts: handoff.rows,
      continuity: {
        fingerprint: continuityFingerprint,
        required: continuityRequired,
        current: continuityCurrent,
        stale: continuityStale,
        reviewedAt: continuitySignoff?.reviewedAt ?? "",
        transitionCount: continuity.transitionCount,
        warningCount: continuity.warningCount,
        infoCount: continuity.infoCount,
        issues: continuity.issues,
        checklist: CONTINUITY_REVIEW_CHECKLIST,
      },
    }, null, 2), "application/json;charset=utf-8");
    addToast("Palmier Handoff JSONを書き出しました", "success");
  }

  function exportDecisionMarkdown() {
    downloadText("ai-video-decision-records.md", decisions.markdown, "text/markdown;charset=utf-8");
    addToast("Decision Record Markdownを書き出しました", "success");
  }

  function exportDecisionJson() {
    downloadText("ai-video-decision-records.json", JSON.stringify({ movieTitle, records: decisions.records }, null, 2), "application/json;charset=utf-8");
    addToast("Decision Record JSONを書き出しました", "success");
  }

  return (
    <div>
      <Header
        title="Palmier 実行Handoff"
        description="採用正本・判断根拠・前後ショットの連続性まで、Palmier/Claude Codeへ非破壊で引き渡します"
        showMovieSelector
      />

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 mb-6">
        <div className="rounded-xl border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 p-4"><p className="text-xs text-navy-400">Palmier first/last</p><p className="text-2xl font-bold text-navy-800 dark:text-sand-100">{routeCounts.palmier}</p></div>
        <div className="rounded-xl border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 p-4"><p className="text-xs text-navy-400">外部生成/結果待ち</p><p className="text-2xl font-bold text-navy-800 dark:text-sand-100">{routeCounts.external}</p></div>
        <div className="rounded-xl border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 p-4"><p className="text-xs text-navy-400">結果レビュー</p><p className="text-2xl font-bold text-navy-800 dark:text-sand-100">{routeCounts.review}</p></div>
        <div className="rounded-xl border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 p-4"><p className="text-xs text-navy-400">編集へ</p><p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">{routeCounts.edit}</p></div>
        <div className="rounded-xl border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 p-4"><p className="text-xs text-navy-400">停止/見直し</p><p className={`text-2xl font-bold ${routeCounts.blocked > 0 ? "text-red-700 dark:text-red-300" : "text-navy-800 dark:text-sand-100"}`}>{routeCounts.blocked}</p></div>
        <div className={`rounded-xl border p-4 ${editFixReady ? "border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-900/20" : "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20"}`}><p className={editFixReady ? "text-xs text-emerald-700" : "text-xs text-amber-700"}>編集FIX Ready</p><p className={`text-xl font-bold mt-1 ${editFixReady ? "text-emerald-800 dark:text-emerald-300" : "text-amber-800 dark:text-amber-300"}`}>{editFixReady ? "PASS" : "PENDING"}</p></div>
      </div>

      <div className="rounded-xl border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20 p-4 mb-6">
        <h2 className="font-bold text-amber-900 dark:text-amber-200 mb-1">有料生成の境界</h2>
        <p className="text-sm text-amber-800 dark:text-amber-300">このhandoffは配置・placeholder・参照準備までは自動化対象にしますが、Palmierや外部モデルのgeneration credits消費は明示指示まで発火させません。</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button onClick={() => void copyHandoff()} disabled={videoPrompts.length === 0} className="px-4 py-2.5 text-sm rounded-lg bg-navy-700 text-white hover:bg-navy-800 disabled:opacity-40">{copied ? "✓ コピー済み" : "Palmier用Handoff + Continuityをコピー"}</button>
        <button onClick={exportMarkdown} disabled={videoPrompts.length === 0} className="px-4 py-2.5 text-sm rounded-lg border border-sand-200 dark:border-navy-600 text-navy-600 dark:text-navy-200 disabled:opacity-40">Markdown</button>
        <button onClick={exportJson} disabled={videoPrompts.length === 0} className="px-4 py-2.5 text-sm rounded-lg border border-sand-200 dark:border-navy-600 text-navy-600 dark:text-navy-200 disabled:opacity-40">JSON</button>
      </div>

      <div className={`rounded-xl border p-4 mb-6 ${decisionWarnings > 0 ? "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20" : "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-900/20"}`}>
        <div className="flex flex-wrap items-center gap-3"><div className="min-w-0 flex-1"><h2 className={`font-bold ${decisionWarnings > 0 ? "text-amber-900 dark:text-amber-200" : "text-emerald-900 dark:text-emerald-200"}`}>採用Decision Record — {decisions.records.length}件</h2><p className={`text-xs mt-1 ${decisionWarnings > 0 ? "text-amber-800 dark:text-amber-300" : "text-emerald-800 dark:text-emerald-300"}`}>採用正本 / model / preset / routing / QA日時 / project実績 / 実メディア仕様 / 代替variantを保存。warning {decisionWarnings}件。</p></div><div className="flex flex-wrap gap-2"><button onClick={() => void copyDecisionRecords()} disabled={decisions.records.length === 0} className="px-3 py-2 text-xs rounded-lg bg-white/70 dark:bg-navy-800/60 border border-current/20 disabled:opacity-40">{copiedDecision ? "✓ コピー済み" : "Decision Recordをコピー"}</button><button onClick={exportDecisionMarkdown} disabled={decisions.records.length === 0} className="px-3 py-2 text-xs rounded-lg bg-white/70 dark:bg-navy-800/60 border border-current/20 disabled:opacity-40">MD</button><button onClick={exportDecisionJson} disabled={decisions.records.length === 0} className="px-3 py-2 text-xs rounded-lg bg-white/70 dark:bg-navy-800/60 border border-current/20 disabled:opacity-40">JSON</button></div></div>
      </div>

      <div className={`rounded-xl border p-4 mb-6 ${continuityCurrent ? "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-900/20" : "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20"}`}>
        <div className="flex flex-wrap items-center gap-3">
          <div className="min-w-0 flex-1">
            <h2 className={`font-bold ${continuityCurrent ? "text-emerald-900 dark:text-emerald-200" : "text-amber-900 dark:text-amber-200"}`}>AI動画 Continuity Authority — {!continuityRequired ? "不要" : continuityCurrent ? "PASS" : continuityStale ? "再確認必要" : "未確認"}</h2>
            <p className={`text-xs mt-1 ${continuityCurrent ? "text-emerald-800 dark:text-emerald-300" : "text-amber-800 dark:text-amber-300"}`}>fingerprint {continuityFingerprint} / AI関連境界 {continuity.transitionCount} / warning {continuity.warningCount} / info {continuity.infoCount}{continuitySignoff ? ` / 前回 ${continuitySignoff.reviewedAt}` : ""}</p>
            {continuityStale && <p className="text-xs mt-2 text-amber-800 dark:text-amber-300">前回PASS後に採用variant・scene尺・隣接実素材・生成条件・実メディア仕様・検出issueのいずれかが変わりました。旧PASSは自動失効しています。</p>}
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => void copyContinuity()} disabled={continuity.transitionCount === 0 && continuity.issues.length === 0} className="px-3 py-2 text-xs rounded-lg bg-white/70 dark:bg-navy-800/60 border border-current/20 disabled:opacity-40">{copiedContinuity ? "✓ コピー済み" : "Continuityをコピー"}</button>
            {continuityRequired && <button type="button" onClick={recordContinuityPass} disabled={selectedMovieId === "all" || continuityCurrent} className="px-3 py-2 text-xs rounded-lg bg-navy-700 text-white disabled:opacity-40">{continuityCurrent ? "✓ 現在のfingerprintでPASS済み" : "連続再生QA PASSを記録"}</button>}
          </div>
        </div>

        {continuity.issues.length > 0 ? <div className="mt-4 space-y-2">{continuity.issues.map((issue) => <div key={issue.id} className={`rounded-lg border p-3 ${issue.severity === "warning" ? "border-amber-200 bg-white/60 dark:border-amber-800 dark:bg-navy-800/40" : "border-sky-200 bg-white/60 dark:border-sky-800 dark:bg-navy-800/40"}`}><div className="flex flex-wrap items-center gap-2"><span>{issue.severity === "warning" ? "⚠️" : "ℹ️"}</span><p className="text-sm font-bold text-navy-800 dark:text-sand-100">{issue.title}</p><span className="text-[11px] text-navy-400">{issue.sceneIds.join(" → ")}</span></div><p className="mt-1 text-xs text-navy-600 dark:text-navy-200">{issue.detail}</p><p className="mt-2 text-xs text-navy-700 dark:text-navy-100"><strong>編集時:</strong> {issue.action}</p></div>)}</div> : <p className="mt-3 text-sm text-navy-600 dark:text-navy-200">自動検出できる連続性問題はありません。AI関連境界がある場合は、下のチェックを見ながら実際のタイムラインを連続再生してください。</p>}

        <details className="mt-4 rounded-lg border border-current/15 bg-white/50 dark:bg-navy-800/30 p-3"><summary className="cursor-pointer text-sm font-medium text-navy-700 dark:text-navy-200">PASS前に見るContinuity Checklist</summary><ul className="mt-3 space-y-2 text-xs text-navy-600 dark:text-navy-200">{CONTINUITY_REVIEW_CHECKLIST.map((item) => <li key={item}>☐ {item}</li>)}</ul><p className="mt-3 text-[11px] text-navy-400">上記をPalmier/CapCutの実タイムラインで確認した後にPASSを記録します。警告がある場合は修正または意図的に許容した上で記録してください。</p></details>
      </div>

      {!editFixReady && videoPrompts.length > 0 && <div className="rounded-xl border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 p-4 mb-6"><p className="font-bold text-navy-800 dark:text-sand-100">編集FIX Readyまで</p><ul className="mt-2 space-y-1 text-sm text-navy-600 dark:text-navy-200"><li>{allVideoAdopted ? "✓" : "○"} 全動画Promptが採用正本まで確定</li><li>{decisionWarnings === 0 ? "✓" : "○"} Decision Record warning 0</li><li>{continuityCurrent ? "✓" : "○"} 現在のfingerprintでContinuity QA PASS</li></ul></div>}

      {videoPrompts.length === 0 ? <div className="rounded-xl border border-dashed border-sand-300 dark:border-navy-600 p-10 text-center text-sm text-navy-400">動画Promptがありません。動画プロンプト画面から作成してください。</div> : <div className="space-y-4">{videoPrompts.map((prompt) => {
        const resultAssets = data.assets.filter((asset) => prompt.resultAssetIds.includes(asset.assetId));
        const route = routeVideoPrompt(prompt, resultAssets);
        const selectedId = selectedResultAssetId(prompt) || (resultAssets.length === 1 ? resultAssets[0]?.assetId ?? "" : "");
        return <article key={prompt.promptId} className="rounded-xl border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 p-5"><div className="flex flex-wrap items-start gap-3"><div className="min-w-0 flex-1"><h3 className="font-bold text-navy-800 dark:text-sand-100">{prompt.title}</h3><p className="text-xs text-navy-400 mt-0.5">{sceneName(prompt)} · {prompt.tool} · {prompt.status}</p></div><span className={`px-3 py-1 rounded-full text-xs font-medium ${route.destination === "blocked" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" : route.destination === "edit" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" : route.destination === "review" ? "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300" : "bg-sand-100 text-navy-600 dark:bg-navy-700 dark:text-navy-200"}`}>{route.label}</span></div><div className="mt-3 rounded-lg bg-sand-50 dark:bg-navy-700 p-3"><p className="text-xs text-navy-500 dark:text-navy-300"><strong>理由:</strong> {route.reason}</p><p className="text-sm text-navy-700 dark:text-navy-200 mt-1"><strong>次:</strong> {route.action}</p></div>{resultAssets.length > 0 && <div className="mt-3 flex flex-wrap gap-2">{resultAssets.map((asset) => { const selected = asset.assetId === selectedId && prompt.status === "adopted"; return <span key={asset.assetId} className={`px-2 py-1 rounded text-xs ${selected ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 ring-1 ring-emerald-300" : "bg-sand-50 dark:bg-navy-700 text-navy-500 dark:text-navy-300"}`}>{selected ? "✓ 採用正本 · " : "候補 · "}{asset.title}{asset.path ? ` · ${asset.path}` : " · path missing"}</span>; })}</div>}</article>;
      })}</div>}
    </div>
  );
}
