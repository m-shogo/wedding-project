import { useMemo, useState } from "react";
import { Header } from "../components/Header";
import { LocalVideoProbePicker } from "../components/LocalVideoProbePicker";
import { useProduction } from "../store/productionStore";
import { useToast } from "../store/toastStore";
import { parseVideoResultReproMetadata } from "../lib/videoResultMetadata";
import {
  parseVideoResultProbeEvidence,
  upsertVideoResultProbeEvidence,
  type VideoResultProbeEvidence,
} from "../lib/videoResultProbeEvidence";

interface PendingMedia {
  durationSec?: number;
  resolution: string;
}

function shortFingerprint(value?: string) {
  if (!value) return "";
  const parts = value.split(":");
  const digest = parts[parts.length - 1] ?? value;
  return `…${digest.slice(-12)}`;
}

function formatProbeDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("ja-JP", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

function lastNoteValue(notes: string, key: string) {
  const lines = notes.split("\n");
  const pattern = new RegExp(`${key}=([^\\s/]+)`);
  for (let index = lines.length - 1; index >= 0; index -= 1) {
    const match = lines[index].match(pattern);
    if (match?.[1]) return match[1];
  }
  return "";
}

export function VideoAssetReprobe() {
  const { selectedMovieId, data, movieAssets, updateAsset } = useProduction();
  const { addToast } = useToast();
  const [selectedAssetId, setSelectedAssetId] = useState("");
  const [pendingEvidence, setPendingEvidence] = useState<VideoResultProbeEvidence>();
  const [pendingMedia, setPendingMedia] = useState<PendingMedia>();

  const sourceAssets = selectedMovieId === "all" ? data.assets : movieAssets;
  const videoAssets = sourceAssets.filter((asset) => asset.type === "ai_video");
  const selectedAsset = videoAssets.find((asset) => asset.assetId === selectedAssetId);
  const selectedStoredMedia = selectedAsset ? parseVideoResultReproMetadata(selectedAsset.notes) : undefined;
  const selectedStoredProbe = selectedAsset ? parseVideoResultProbeEvidence(selectedAsset.notes) : undefined;
  const selectedTargetDuration = selectedAsset?.relatedSceneIds.reduce((sum, sceneId) => sum + (data.scenes.find((scene) => scene.sceneId === sceneId)?.durationSec ?? 0), 0);
  const selectedAdoptedPrompts = selectedAsset
    ? data.prompts.filter((prompt) => {
      if (prompt.status !== "adopted" || !prompt.resultAssetIds.includes(selectedAsset.assetId)) return false;
      const savedSelectedResultId = lastNoteValue(prompt.notes, "selected-result-asset");
      const effectiveSelectedResultId = savedSelectedResultId || (prompt.resultAssetIds.length === 1 ? prompt.resultAssetIds[0] : "");
      return effectiveSelectedResultId === selectedAsset.assetId;
    })
    : [];
  const adoptedSelectedAuthority = selectedAdoptedPrompts.length > 0;
  const pendingFingerprint = pendingEvidence?.sampleFingerprint ?? "";
  const wouldRemoveAdoptedFingerprint = Boolean(adoptedSelectedAuthority && pendingEvidence && !pendingFingerprint);
  const reviewedFingerprintMismatch = Boolean(
    adoptedSelectedAuthority
      && pendingFingerprint
      && selectedAdoptedPrompts.some((prompt) => {
        const reviewedFingerprint = lastNoteValue(prompt.notes, "reviewed-sample-fingerprint");
        return Boolean(reviewedFingerprint && reviewedFingerprint !== pendingFingerprint);
      }),
  );
  const reviewedFingerprintMatch = Boolean(
    adoptedSelectedAuthority
      && pendingFingerprint
      && selectedAdoptedPrompts.every((prompt) => {
        const reviewedFingerprint = lastNoteValue(prompt.notes, "reviewed-sample-fingerprint");
        return !reviewedFingerprint || reviewedFingerprint === pendingFingerprint;
      }),
  );

  const counts = useMemo(() => {
    let probed = 0;
    let fingerprinted = 0;
    for (const asset of videoAssets) {
      const evidence = parseVideoResultProbeEvidence(asset.notes);
      if (evidence) probed += 1;
      if (evidence?.sampleFingerprint) fingerprinted += 1;
    }
    return { total: videoAssets.length, probed, fingerprinted, missing: videoAssets.length - probed };
  }, [videoAssets]);

  const durationChanged = Boolean(
    pendingMedia?.durationSec !== undefined
      && selectedStoredMedia?.actualDurationSec !== undefined
      && Math.abs(pendingMedia.durationSec - selectedStoredMedia.actualDurationSec) > 0.25,
  );
  const resolutionChanged = Boolean(
    pendingMedia?.resolution
      && selectedStoredMedia?.resolution
      && pendingMedia.resolution !== selectedStoredMedia.resolution,
  );

  function openProbe(assetId: string) {
    setSelectedAssetId(assetId);
    setPendingEvidence(undefined);
    setPendingMedia(undefined);
  }

  function closeProbe() {
    setSelectedAssetId("");
    setPendingEvidence(undefined);
    setPendingMedia(undefined);
  }

  function saveEvidence() {
    if (!selectedAsset || !pendingEvidence) {
      addToast("先にローカル動画を選んでprobeしてください", "error");
      return;
    }
    if (adoptedSelectedAuthority && !pendingEvidence.sampleFingerprint) {
      addToast("採用正本はfingerprintなしのprobe証跡で上書きできません。fingerprintを取得できる実動画を選び直してください", "error");
      return;
    }
    updateAsset({
      ...selectedAsset,
      notes: upsertVideoResultProbeEvidence(selectedAsset.notes, pendingEvidence),
    });
    if (reviewedFingerprintMismatch) {
      addToast("probe証跡を更新しました。QA時fingerprintと変わったため結果レビューで再QAが必要です", "info");
    } else {
      addToast("動画本体を変更せず、probe証跡だけ更新しました", "success");
    }
    closeProbe();
  }

  return (
    <div>
      <Header title="既存AI動画 再probe" description="既存Assetを作り直さず、ローカル実動画のprobe証跡だけを安全に更新します" showMovieSelector />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <div className="rounded-xl border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 p-4"><p className="text-xs text-navy-400">AI動画Asset</p><p className="text-2xl font-bold text-navy-800 dark:text-sand-100">{counts.total}</p></div>
        <div className="rounded-xl border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 p-4"><p className="text-xs text-navy-400">probe済み</p><p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">{counts.probed}</p></div>
        <div className="rounded-xl border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 p-4"><p className="text-xs text-navy-400">fingerprintあり</p><p className="text-2xl font-bold text-violet-700 dark:text-violet-300">{counts.fingerprinted}</p></div>
        <div className={`rounded-xl border p-4 ${counts.missing > 0 ? "border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20" : "border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800"}`}><p className="text-xs text-navy-400">probe証跡なし</p><p className={`text-2xl font-bold ${counts.missing > 0 ? "text-amber-700 dark:text-amber-300" : "text-navy-800 dark:text-sand-100"}`}>{counts.missing}</p></div>
      </div>

      <div className="mb-6 rounded-xl border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-900/20 p-4 text-sm text-sky-900 dark:text-sky-200">
        <strong>非破壊:</strong> この画面は動画本体・保存path・タイトル・採用statusを変更しません。再生成や動画差し替えは別Assetで管理し、ここでは既存Assetの `local-media-probe` 証跡行だけを更新します。
      </div>

      {videoAssets.length === 0 ? (
        <div className="rounded-xl border border-dashed border-sand-300 dark:border-navy-600 p-10 text-center text-sm text-navy-400">対象のAI動画Assetはありません。</div>
      ) : (
        <div className="space-y-3">
          {videoAssets.map((asset) => {
            const evidence = parseVideoResultProbeEvidence(asset.notes);
            const active = selectedAssetId === asset.assetId;
            return (
              <article key={asset.assetId} className={`rounded-xl border bg-white dark:bg-navy-800 shadow-sm ${active ? "border-sky-400 ring-1 ring-sky-300" : "border-sand-200 dark:border-navy-600"}`}>
                <div className="p-4 flex flex-wrap items-start gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-bold text-navy-800 dark:text-sand-100">{asset.title}</h2>
                      {evidence?.sampleFingerprint ? <span className="px-2 py-0.5 rounded-full text-[10px] bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-300">fingerprint {shortFingerprint(evidence.sampleFingerprint)}</span> : evidence ? <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300">probe済み / fingerprintなし</span> : <span className="px-2 py-0.5 rounded-full text-[10px] bg-sand-100 dark:bg-navy-700 text-navy-500 dark:text-navy-300">probe証跡なし</span>}
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-sand-100 dark:bg-navy-700 text-navy-500 dark:text-navy-300">{asset.status}</span>
                    </div>
                    {asset.path && <code className="block mt-1 text-[11px] text-navy-400 break-all">{asset.path}</code>}
                    <p className="mt-1 text-[11px] text-navy-400">{asset.source || "source未記録"} · scene {asset.relatedSceneIds.length}件{evidence ? ` · probe ${formatProbeDate(evidence.probedAt)} · preview ${evidence.previewFrameCount}枚` : ""}</p>
                  </div>
                  <button type="button" onClick={() => active ? closeProbe() : openProbe(asset.assetId)} className="px-3 py-1.5 text-xs rounded-lg border border-sky-200 dark:border-sky-700 text-sky-700 dark:text-sky-300 hover:bg-sky-50 dark:hover:bg-sky-900/20">{active ? "閉じる" : evidence ? "再probe" : "probeする"}</button>
                </div>

                {active && selectedAsset && (
                  <div className="border-t border-sand-100 dark:border-navy-600 p-4 space-y-4">
                    {adoptedSelectedAuthority && (
                      <div className="rounded-lg border border-violet-200 dark:border-violet-700 bg-violet-50 dark:bg-violet-900/20 p-3 text-xs text-violet-800 dark:text-violet-300">
                        <strong>採用正本のQA authorityを保護します。</strong>
                        <p className="mt-1">このAssetは {selectedAdoptedPrompts.length}件の採用Promptで編集正本です。保存にはsample fingerprintが必要です。現在の証跡: {selectedStoredProbe?.sampleFingerprint ? shortFingerprint(selectedStoredProbe.sampleFingerprint) : "fingerprintなし"}。</p>
                      </div>
                    )}

                    <LocalVideoProbePicker
                      savedPath={selectedAsset.path}
                      expectedDurationSec={selectedTargetDuration || undefined}
                      onMetadata={(metadata) => setPendingMedia(metadata)}
                      onProbeEvidence={setPendingEvidence}
                    />

                    {(durationChanged || resolutionChanged) && (
                      <div className="rounded-lg border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20 p-3 text-xs text-amber-800 dark:text-amber-300">
                        <strong>既存の再現メタデータと差があります。</strong>
                        {durationChanged && <p className="mt-1">実尺: 保存済み {selectedStoredMedia?.actualDurationSec}s → 今回 {pendingMedia?.durationSec}s</p>}
                        {resolutionChanged && <p className="mt-1">解像度: 保存済み {selectedStoredMedia?.resolution} → 今回 {pendingMedia?.resolution}</p>}
                        <p className="mt-1">この画面は再現メタデータを自動書換えしません。別動画へ差し替わった可能性がある場合は、既存Assetを上書きせず新しい結果Assetとして登録してください。</p>
                      </div>
                    )}

                    {wouldRemoveAdoptedFingerprint && (
                      <div className="rounded-lg border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 p-3 text-xs text-red-800 dark:text-red-300">
                        <strong>保存不可: 採用正本のfingerprint authorityが失われます。</strong>
                        <p className="mt-1">今回のprobeではsample fingerprintを取得できませんでした。旧fingerprintを消すprobe証跡では上書きせず、fingerprintを取得できる実動画を選び直してください。</p>
                      </div>
                    )}

                    {reviewedFingerprintMismatch && (
                      <div className="rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20 p-3 text-xs text-amber-900 dark:text-amber-300">
                        <strong>QA時の実動画とfingerprintが変わっています。</strong>
                        <p className="mt-1">保存はできますが、以前の目視QAを現在の実動画へ引き継げません。保存後はPreflight / Palmier Handoffが止まり、AI動画 結果レビューで再QAが必要です。</p>
                      </div>
                    )}

                    {reviewedFingerprintMatch && (
                      <div className="rounded-lg border border-emerald-200 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-900/20 p-3 text-xs text-emerald-800 dark:text-emerald-300">
                        ✓ 今回のsample fingerprintは保存済みQA authorityと一致しています。fingerprint一致だけで目視QA PASSを推測せず、既存レビュー証跡の実体参照を維持します。
                      </div>
                    )}

                    {pendingEvidence && (
                      <div className="rounded-lg border border-emerald-200 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-900/20 p-3 text-xs text-emerald-800 dark:text-emerald-300">
                        <p>保存候補: preview {pendingEvidence.previewFrameCount}枚{pendingEvidence.sampleFingerprint ? ` / fingerprint ${shortFingerprint(pendingEvidence.sampleFingerprint)}` : " / fingerprintなし"}</p>
                        <p className="mt-1">保存しても動画本体は変更しません。旧probe証跡行だけを置換します。</p>
                      </div>
                    )}

                    <div className="flex justify-end gap-2">
                      <button type="button" onClick={closeProbe} className="px-4 py-2 text-sm rounded-lg border border-sand-200 dark:border-navy-600 text-navy-600 dark:text-navy-200">キャンセル</button>
                      <button type="button" onClick={saveEvidence} disabled={!pendingEvidence || wouldRemoveAdoptedFingerprint} className="px-4 py-2 text-sm rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed">probe証跡だけ保存</button>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
