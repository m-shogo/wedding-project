import { useState } from "react";
import {
  captureLocalVideoPreviewFrames,
  formatFileSize,
  probeLocalVideoFile,
  type LocalVideoPreviewFrame,
  type LocalVideoProbeResult,
} from "../lib/localVideoProbe";
import { fingerprintLocalVideoSample } from "../lib/localVideoSampleFingerprint";
import type { VideoResultProbeEvidence } from "../lib/videoResultProbeEvidence";

interface LocalVideoProbePickerProps {
  expectedDurationSec?: number;
  savedPath?: string;
  onMetadata: (metadata: { durationSec?: number; resolution: string }) => void;
  onProbeEvidence?: (evidence: VideoResultProbeEvidence) => void;
}

type DurationFit = "short" | "long" | "fit" | "unknown";

function durationFit(actual: number | undefined, expected: number | undefined): DurationFit {
  if (!actual || !expected || expected <= 0) return "unknown";
  if (actual + 0.25 < expected) return "short";
  if (actual > expected + 1) return "long";
  return "fit";
}

function pathBaseName(path: string) {
  return path.trim().replace(/\\/g, "/").split("/").filter(Boolean).pop() ?? "";
}

export function LocalVideoProbePicker({ expectedDurationSec, savedPath = "", onMetadata, onProbeEvidence }: LocalVideoProbePickerProps) {
  const [probe, setProbe] = useState<LocalVideoProbeResult>();
  const [previewFrames, setPreviewFrames] = useState<LocalVideoPreviewFrame[]>([]);
  const [sampleFingerprint, setSampleFingerprint] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [previewError, setPreviewError] = useState("");
  const [fingerprintError, setFingerprintError] = useState("");
  const fit = durationFit(probe?.durationSec, expectedDurationSec);
  const savedFileName = pathBaseName(savedPath);
  const fileNameMismatch = Boolean(probe?.fileName && savedFileName && probe.fileName.toLowerCase() !== savedFileName.toLowerCase());

  async function handleFile(file?: File) {
    setError("");
    setPreviewError("");
    setFingerprintError("");
    setProbe(undefined);
    setPreviewFrames([]);
    setSampleFingerprint("");
    if (!file) return;
    setBusy(true);
    try {
      const result = await probeLocalVideoFile(file);
      const probedAt = new Date().toISOString();
      let previewFrameCount = 0;
      let previewFrameTimesSec: number[] | undefined;
      let fingerprint = "";
      let sampledBytes: number | undefined;
      setProbe(result);
      onMetadata({ durationSec: result.durationSec, resolution: result.resolution });
      try {
        const frames = await captureLocalVideoPreviewFrames(file);
        previewFrameCount = frames.length;
        previewFrameTimesSec = frames.map((frame) => frame.timeSec);
        setPreviewFrames(frames);
      } catch (caught) {
        setPreviewError(caught instanceof Error ? caught.message : "QAフレームを抽出できませんでした");
      }
      try {
        const sampled = await fingerprintLocalVideoSample(file);
        fingerprint = `${sampled.version}:${sampled.digest}`;
        sampledBytes = sampled.sampledBytes;
        setSampleFingerprint(fingerprint);
      } catch (caught) {
        setFingerprintError(caught instanceof Error ? caught.message : "sample fingerprintを作成できませんでした");
      }
      onProbeEvidence?.({ probedAt, previewFrameCount, previewFrameTimesSec, sampleFingerprint: fingerprint || undefined, sampledBytes });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "動画メタデータを読み取れませんでした");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-lg border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-900/20 p-3">
      <div className="flex flex-wrap items-start gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold text-sky-800 dark:text-sky-300">ローカル動画から実メディア情報 + QAフレームを読む</p>
          <p className="mt-1 text-[11px] text-sky-700 dark:text-sky-300">動画ファイルはアップロードしません。ブラウザ内でduration / width / height、冒頭・中間・終端プレビュー、先頭/中央/末尾の最大64KBずつを使う軽量sample fingerprintだけを作ります。FPS・seed・generation IDは推測しません。</p>
        </div>
        <label className="px-3 py-1.5 text-xs rounded-lg bg-white/70 dark:bg-navy-800/60 border border-sky-200 dark:border-sky-700 text-sky-800 dark:text-sky-200 cursor-pointer">
          {busy ? "読取中…" : "動画ファイルを選択"}
          <input
            type="file"
            accept="video/*"
            disabled={busy}
            onChange={(event) => void handleFile(event.currentTarget.files?.[0])}
            className="sr-only"
          />
        </label>
      </div>

      {probe && (
        <div className="mt-3 rounded-lg border border-sky-200/70 dark:border-sky-700 bg-white/70 dark:bg-navy-800/40 p-3 text-xs text-sky-900 dark:text-sky-200">
          <p className="font-medium break-all">{probe.fileName}</p>
          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-[11px]">
            <span>{formatFileSize(probe.sizeBytes)}</span>
            <span>実尺 {probe.durationSec ?? "読取不可"}s</span>
            {expectedDurationSec && <span>対象scene {expectedDurationSec}s</span>}
            <span>解像度 {probe.resolution || "読取不可"}</span>
            {probe.mimeType && <span>{probe.mimeType}</span>}
          </div>

          {sampleFingerprint && <div className="mt-3 rounded-lg border border-violet-200 dark:border-violet-700 bg-violet-50 dark:bg-violet-900/20 p-2.5 text-violet-800 dark:text-violet-300"><strong>sample fingerprint:</strong> <code>{sampleFingerprint.slice(0, 28)}…</code><p className="mt-1 text-[10px]">動画全体hashではありません。同名/リネームvariantの取り違え検知用で、完全なファイル同一性証明には使いません。</p></div>}
          {fileNameMismatch && <div className="mt-3 rounded-lg border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20 p-2.5 text-amber-800 dark:text-amber-300"><strong>ファイル名を再確認:</strong> 今プレビューした動画は <code>{probe.fileName}</code>、登録path末尾は <code>{savedFileName}</code> です。意図的にリネーム/コピー済みならそのままでOKですが、別variantを誤って登録していないか確認してください。</div>}
          {fit === "short" && <div className="mt-3 rounded-lg border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20 p-2.5 text-amber-800 dark:text-amber-300"><strong>尺不足:</strong> sceneより短い動画です。ループや強いslow-downで埋めるとAIっぽさが出やすいため、scene尺を短くする・別素材で補う・必要尺だけ再生成する方を優先します。</div>}
          {fit === "long" && <div className="mt-3 rounded-lg border border-sky-200 dark:border-sky-700 bg-sky-50 dark:bg-sky-900/20 p-2.5 text-sky-800 dark:text-sky-300"><strong>余尺あり:</strong> sceneより1秒以上長いです。速度変更せず、自然な区間をtrimできる候補です。</div>}
          {fit === "fit" && <div className="mt-3 rounded-lg border border-emerald-200 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-900/20 p-2.5 text-emerald-800 dark:text-emerald-300">✓ scene尺に対して無理なループ/速度変更なしで扱いやすい実尺です。</div>}

          {previewFrames.length > 0 && (
            <div className="mt-4">
              <div className="flex flex-wrap items-baseline gap-2 mb-2">
                <p className="text-xs font-bold text-sky-800 dark:text-sky-300">時間方向の早期QA</p>
                <span className="text-[11px] text-sky-700 dark:text-sky-300">3枚を横に見比べる</span>
              </div>
              <div className="grid grid-cols-3 gap-2 items-start">
                {previewFrames.map((frame) => (
                  <figure key={`${frame.label}-${frame.timeSec}`} className="rounded-lg overflow-hidden border border-sky-200 dark:border-sky-700 bg-white dark:bg-navy-800">
                    <img src={frame.dataUrl} alt={`${frame.label} ${frame.timeSec}s`} className="block w-full h-auto object-contain bg-black" />
                    <figcaption className="px-2 py-1.5 text-[11px] text-navy-600 dark:text-navy-200"><strong>{frame.label}</strong> · {frame.timeSec}s</figcaption>
                  </figure>
                ))}
              </div>
              <div className="mt-3 rounded-lg border border-sky-200 dark:border-sky-700 bg-sky-50/70 dark:bg-sky-900/20 p-2.5 text-[11px] text-sky-900 dark:text-sky-200">
                <strong>見る場所:</strong> 窓枠・翼・建物・水平線などの形が変わっていないか / 人物・文字・ロゴが途中で増えていないか / 終端だけ溶ける・構図が崩れる・過剰発光していないか / テロップ余白が最後まで残っているか。
              </div>
            </div>
          )}

          {previewError && <p className="mt-3 text-[11px] text-amber-700 dark:text-amber-300">QAフレームだけ取得できませんでした: {previewError}。実尺・解像度はそのまま利用できます。</p>}
          {fingerprintError && <p className="mt-2 text-[11px] text-amber-700 dark:text-amber-300">sample fingerprintだけ作成できませんでした: {fingerprintError}。metadata / QAフレームはそのまま利用できます。</p>}
          <p className="mt-2 text-[11px] opacity-80">ファイル名・bytes・3枚のプレビュー画像は表示確認用だけです。production dataへ残すのはprobe時刻・preview成功数・確認した再生時刻・sample fingerprintだけで、動画本体やローカルpathは保存しません。</p>
        </div>
      )}

      {error && <p className="mt-2 text-xs text-red-700 dark:text-red-300">{error}</p>}
    </div>
  );
}
