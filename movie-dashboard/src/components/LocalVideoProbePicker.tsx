import { useState } from "react";
import {
  formatFileSize,
  probeLocalVideoFile,
  type LocalVideoProbeResult,
} from "../lib/localVideoProbe";

interface LocalVideoProbePickerProps {
  expectedDurationSec?: number;
  onMetadata: (metadata: { durationSec?: number; resolution: string }) => void;
}

type DurationFit = "short" | "long" | "fit" | "unknown";

function durationFit(actual: number | undefined, expected: number | undefined): DurationFit {
  if (!actual || !expected || expected <= 0) return "unknown";
  if (actual + 0.25 < expected) return "short";
  if (actual > expected + 1) return "long";
  return "fit";
}

export function LocalVideoProbePicker({ expectedDurationSec, onMetadata }: LocalVideoProbePickerProps) {
  const [probe, setProbe] = useState<LocalVideoProbeResult>();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const fit = durationFit(probe?.durationSec, expectedDurationSec);

  async function handleFile(file?: File) {
    setError("");
    setProbe(undefined);
    if (!file) return;
    setBusy(true);
    try {
      const result = await probeLocalVideoFile(file);
      setProbe(result);
      onMetadata({ durationSec: result.durationSec, resolution: result.resolution });
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
          <p className="text-xs font-bold text-sky-800 dark:text-sky-300">ローカル動画から実メディア情報を読む</p>
          <p className="mt-1 text-[11px] text-sky-700 dark:text-sky-300">動画ファイルはアップロードしません。ブラウザ内でdurationとwidth/heightだけを読み、下の再現メタデータ入力へ反映します。FPS・seed・generation IDは推測しません。</p>
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

          {fit === "short" && <div className="mt-3 rounded-lg border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20 p-2.5 text-amber-800 dark:text-amber-300"><strong>尺不足:</strong> sceneより短い動画です。ループや強いslow-downで埋めるとAIっぽさが出やすいため、scene尺を短くする・別素材で補う・必要尺だけ再生成する方を優先します。</div>}
          {fit === "long" && <div className="mt-3 rounded-lg border border-sky-200 dark:border-sky-700 bg-sky-50 dark:bg-sky-900/20 p-2.5 text-sky-800 dark:text-sky-300"><strong>余尺あり:</strong> sceneより1秒以上長いです。速度変更せず、自然な区間をtrimできる候補です。</div>}
          {fit === "fit" && <div className="mt-3 rounded-lg border border-emerald-200 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-900/20 p-2.5 text-emerald-800 dark:text-emerald-300">✓ scene尺に対して無理なループ/速度変更なしで扱いやすい実尺です。</div>}

          <p className="mt-2 text-[11px] opacity-80">ファイル名やbytesは表示確認用だけで、production dataには自動保存しません。保存パスは実際の配置先を別欄で確認してください。</p>
        </div>
      )}

      {error && <p className="mt-2 text-xs text-red-700 dark:text-red-300">{error}</p>}
    </div>
  );
}
