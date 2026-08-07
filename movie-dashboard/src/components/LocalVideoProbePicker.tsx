import { useState } from "react";
import {
  formatFileSize,
  probeLocalVideoFile,
  type LocalVideoProbeResult,
} from "../lib/localVideoProbe";

interface LocalVideoProbePickerProps {
  onMetadata: (metadata: { durationSec?: number; resolution: string }) => void;
}

export function LocalVideoProbePicker({ onMetadata }: LocalVideoProbePickerProps) {
  const [probe, setProbe] = useState<LocalVideoProbeResult>();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

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
            <span>解像度 {probe.resolution || "読取不可"}</span>
            {probe.mimeType && <span>{probe.mimeType}</span>}
          </div>
          <p className="mt-2 text-[11px] opacity-80">ファイル名やbytesは表示確認用だけで、production dataには自動保存しません。保存パスは実際の配置先を別欄で確認してください。</p>
        </div>
      )}

      {error && <p className="mt-2 text-xs text-red-700 dark:text-red-300">{error}</p>}
    </div>
  );
}
