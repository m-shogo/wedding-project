import { useEffect, useState } from "react";
import { motionActualVerificationQueue, type MotionActualVerificationGate } from "../data/motionActualVerificationQueue";

type VideoMetadata = { durationSeconds: number; width: number; height: number };

const fileKey = (file: File) => `${file.name}-${file.size}-${file.lastModified}`;

function LocalVideoCandidate({ file, index, metadata, onMetadata }: { file: File; index: number; metadata: VideoMetadata | null; onMetadata: (metadata: VideoMetadata) => void }) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const nextUrl = URL.createObjectURL(file);
    setUrl(nextUrl);
    return () => URL.revokeObjectURL(nextUrl);
  }, [file]);

  return (
    <div className="border border-sand-200 dark:border-navy-600 p-2">
      {url && <video src={url} controls muted playsInline onLoadedMetadata={(event) => onMetadata({ durationSeconds: event.currentTarget.duration, width: event.currentTarget.videoWidth, height: event.currentTarget.videoHeight })} className="aspect-video w-full bg-black object-contain" />}
      <p className="mt-2 truncate text-[10px] text-navy-600 dark:text-navy-300">SHOT {index + 1}: {file.name}</p>
      <p className="text-[9px] text-navy-400">{file.type || "video / unknown codec"} · {(file.size / 1024 / 1024).toFixed(1)} MB</p>
      <p className="text-[9px] text-navy-400">{metadata ? `${metadata.width}×${metadata.height} · ${metadata.durationSeconds.toFixed(2)}秒` : "映像metadataを読込中…"}</p>
    </div>
  );
}

function checklistFor(gate: MotionActualVerificationGate) {
  return [
    `Motion Actual Verification: ${gate.patternId}`,
    `Authority: ${gate.authority}`,
    `Required input: ${gate.requiredInput}`,
    `Action: ${gate.verificationAction}`,
    `Pass condition: ${gate.passCondition}`,
    `Promotion target: ${gate.promotionTarget}`,
    "Result: PENDING",
    "Evidence asset/hash: PENDING",
    "Rule: このチェックリストをコピーしただけでは検証済みにしない。",
  ].join("\n");
}

export function MotionActualVerificationWorkspace({ onShowPattern }: { onShowPattern: (patternId: string) => void }) {
  const [filesByPattern, setFilesByPattern] = useState<Record<string, File[]>>({});
  const [metadataByPattern, setMetadataByPattern] = useState<Record<string, Record<string, VideoMetadata>>>({});
  const [notesByPattern, setNotesByPattern] = useState<Record<string, string>>({});
  const [directionByPattern, setDirectionByPattern] = useState<Record<string, string>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [manualCopyId, setManualCopyId] = useState<string | null>(null);

  async function copyChecklist(gate: MotionActualVerificationGate) {
    try {
      await navigator.clipboard.writeText(checklistFor(gate));
      setCopiedId(gate.patternId);
      setManualCopyId(null);
    } catch {
      setCopiedId(null);
      setManualCopyId(gate.patternId);
    }
  }

  function updateFiles(patternId: string, files: File[]) {
    setFilesByPattern((current) => ({ ...current, [patternId]: files }));
    setMetadataByPattern((current) => ({ ...current, [patternId]: {} }));
  }

  function savePreflightManifest(gate: MotionActualVerificationGate, files: File[], metadata: Record<string, VideoMetadata>, direction: string, reviewNotes: string) {
    const manifest = {
      schemaVersion: "motion-actual-preflight/v1",
      patternId: gate.patternId,
      authority: gate.authority,
      status: "PRECHECK_ONLY",
      productionAuthority: false,
      implementationPromotionAllowed: false,
      createdAt: new Date().toISOString(),
      sourceFiles: files.map((file) => ({
        name: file.name,
        sizeBytes: file.size,
        mimeType: file.type || null,
        lastModified: new Date(file.lastModified).toISOString(),
        ...metadata[fileKey(file)],
        sha256: null,
        sha256Status: "PENDING_CLI",
      })),
      declaredMotionDirection: direction || null,
      reviewNotes,
      requiredAction: gate.verificationAction,
      passCondition: gate.passCondition,
      result: "PENDING_ACTUAL_RENDER",
    };
    const url = URL.createObjectURL(new Blob([`${JSON.stringify(manifest, null, 2)}\n`], { type: "application/json" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${gate.patternId}-preflight.json`;
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }

  return (
    <section className={`mb-8 border p-5 ${motionActualVerificationQueue.length === 0 ? "border-emerald-200 dark:border-emerald-900 bg-emerald-50/50 dark:bg-navy-800" : "border-amber-200 dark:border-amber-900 bg-amber-50/50 dark:bg-navy-800"}`} aria-label="Actual確認キュー">
      <p className={`text-[10px] tracking-[0.2em] font-semibold ${motionActualVerificationQueue.length === 0 ? "text-emerald-700 dark:text-emerald-300" : "text-amber-700 dark:text-amber-300"}`}>ACTUAL VERIFICATION WORKSPACE / FAIL CLOSED</p>
      <h2 className="mt-1 text-lg font-bold text-navy-900 dark:text-sand-100">{motionActualVerificationQueue.length === 0 ? "全36パターンが検証ゲートを通過" : `残り${motionActualVerificationQueue.length}件は、実素材または実アプリ確認後だけ昇格する`}</h2>
      <p className="mt-2 text-xs leading-5 text-navy-600 dark:text-navy-300">
        {motionActualVerificationQueue.length === 0
          ? "v1の外部素材ゲートはすべてActual render・hash・pixel oracle・目視QAまで完了。新しいsource依存パターンを追加した場合は、このfail-closed queueへ登録する。"
          : "ローカル動画はブラウザ内だけで読み込み、サーバーへ保存しない。素材を選択してもPRECHECK止まりで、Actual render・hash・目視QAが揃うまでは未検証のまま維持する。"}
      </p>
      <div className="mt-4 grid gap-3 xl:grid-cols-2">
        {motionActualVerificationQueue.map((gate, index) => {
          const files = filesByPattern[gate.patternId] ?? [];
          const metadata = metadataByPattern[gate.patternId] ?? {};
          const reviewNotes = notesByPattern[gate.patternId] ?? "";
          const direction = directionByPattern[gate.patternId] ?? "";
          const needsSourceVideos = gate.authority === "SOURCE_MEDIA";
          const metadataReady = files.length === 2 && files.every((file) => metadata[fileKey(file)]);
          const directionReady = gate.patternId !== "whip-source-matched" || direction !== "";
          const notesReady = reviewNotes.trim().length >= 10;
          const preflightReady = needsSourceVideos && metadataReady && directionReady && notesReady;
          return (
            <article key={gate.patternId} className="border border-amber-200 dark:border-amber-900 bg-white dark:bg-navy-900 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] font-mono text-amber-700 dark:text-amber-300">GATE {index + 1} · {gate.authority}</p>
                  <h3 className="mt-1 font-mono text-sm font-bold text-navy-900 dark:text-sand-100">{gate.patternId}</h3>
                </div>
                <span className="border border-amber-300 dark:border-amber-800 px-2 py-1 text-[9px] font-semibold text-amber-800 dark:text-amber-200">→ {gate.promotionTarget}</span>
              </div>
              <dl className="mt-3 space-y-2 text-[11px] leading-5 text-navy-600 dark:text-navy-300">
                <div><dt className="font-semibold text-navy-800 dark:text-sand-100">必要入力</dt><dd>{gate.requiredInput}</dd></div>
                <div><dt className="font-semibold text-navy-800 dark:text-sand-100">確認操作</dt><dd>{gate.verificationAction}</dd></div>
                <div><dt className="font-semibold text-navy-800 dark:text-sand-100">合格条件</dt><dd>{gate.passCondition}</dd></div>
              </dl>

              {needsSourceVideos && (
                <div className="mt-4 border-t border-sand-200 dark:border-navy-600 pt-3">
                  <label className="block text-[10px] font-semibold text-navy-700 dark:text-sand-100">
                    実動画を2本選ぶ（ローカルpreviewのみ）
                    <input
                      type="file"
                      accept="video/*"
                      multiple
                      onChange={(event) => updateFiles(gate.patternId, Array.from(event.target.files ?? []).filter((file) => file.type.startsWith("video/")).slice(0, 2))}
                      className="mt-2 block w-full text-[10px] text-navy-500 file:mr-3 file:border file:border-sand-300 file:bg-white file:px-3 file:py-2 file:text-[10px] dark:file:border-navy-600 dark:file:bg-navy-800 dark:file:text-sand-100"
                    />
                  </label>
                  <p className={`mt-2 text-[10px] font-semibold ${preflightReady ? "text-emerald-700 dark:text-emerald-300" : "text-amber-700 dark:text-amber-300"}`}>
                    {preflightReady ? "PRECHECK READY / NOT VERIFIED — manifestを保存できます" : `PENDING — 動画 ${files.length}/2 · metadata ${metadataReady ? "OK" : "未完了"} · 確認メモ ${notesReady ? "OK" : "10文字以上必要"}`}
                  </p>
                  {files.length > 0 && <div className="mt-3 grid gap-2 sm:grid-cols-2">{files.map((file, fileIndex) => <LocalVideoCandidate key={fileKey(file)} file={file} index={fileIndex} metadata={metadata[fileKey(file)] ?? null} onMetadata={(nextMetadata) => setMetadataByPattern((current) => ({ ...current, [gate.patternId]: { ...(current[gate.patternId] ?? {}), [fileKey(file)]: nextMetadata } }))} />)}</div>}
                  {gate.patternId === "whip-source-matched" && (
                    <label className="mt-3 block text-[10px] font-semibold text-navy-700 dark:text-sand-100">2本に共通するcamera motion方向
                      <select value={direction} onChange={(event) => setDirectionByPattern((current) => ({ ...current, [gate.patternId]: event.target.value }))} className="mt-1 block w-full border border-sand-300 dark:border-navy-600 bg-white dark:bg-navy-800 px-3 py-2 text-xs">
                        <option value="">未選択</option><option value="RIGHT">右 →</option><option value="LEFT">左 ←</option><option value="UP">上 ↑</option><option value="DOWN">下 ↓</option>
                      </select>
                    </label>
                  )}
                  <label className="mt-3 block text-[10px] font-semibold text-navy-700 dark:text-sand-100">{gate.patternId === "cut-match-shape" ? "対応する形・中心位置の確認メモ" : "方向・blur区間の確認メモ"}
                    <textarea value={reviewNotes} onChange={(event) => setNotesByPattern((current) => ({ ...current, [gate.patternId]: event.target.value }))} placeholder="例: SHOT 1終端とSHOT 2先頭で、円形の中心が画面中央に一致" className="mt-1 h-20 w-full border border-sand-300 dark:border-navy-600 bg-white dark:bg-navy-800 p-2 text-xs" />
                  </label>
                  <div className="mt-2 flex flex-wrap gap-3">
                    <button type="button" disabled={!preflightReady} onClick={() => savePreflightManifest(gate, files, metadata, direction, reviewNotes)} className="border border-emerald-300 px-3 py-2 text-[10px] font-semibold text-emerald-800 disabled:cursor-not-allowed disabled:opacity-40 dark:border-emerald-900 dark:text-emerald-200">プリフライトJSONを保存</button>
                    {files.length > 0 && <button type="button" onClick={() => updateFiles(gate.patternId, [])} className="text-[10px] text-navy-500 underline">選択を解除</button>}
                  </div>
                </div>
              )}

              <div className="mt-3 flex flex-wrap gap-2">
                <button type="button" onClick={() => onShowPattern(gate.patternId)} className="border border-amber-300 dark:border-amber-800 px-3 py-2 text-[10px] font-semibold text-amber-800 dark:text-amber-200">図鑑でこのPreviewを見る ↓</button>
                <button type="button" onClick={() => void copyChecklist(gate)} className="border border-sand-300 dark:border-navy-600 px-3 py-2 text-[10px] font-semibold text-navy-700 dark:text-sand-100">{copiedId === gate.patternId ? "コピー済み ✓" : "Actual確認票をコピー"}</button>
              </div>
              {manualCopyId === gate.patternId && (
                <div className="mt-3 border border-sky-200 dark:border-sky-900 bg-sky-50 dark:bg-navy-800 p-3">
                  <p className="text-[10px] text-sky-800 dark:text-sky-200">ブラウザのClipboard権限がないため、下の確認票を選択してコピーしてください。</p>
                  <textarea
                    readOnly
                    value={checklistFor(gate)}
                    aria-label={`${gate.patternId} Actual確認票`}
                    onFocus={(event) => event.currentTarget.select()}
                    className="mt-2 h-44 w-full border border-sky-200 dark:border-sky-900 bg-white dark:bg-navy-950 p-2 font-mono text-[10px] text-navy-700 dark:text-sand-100"
                  />
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
