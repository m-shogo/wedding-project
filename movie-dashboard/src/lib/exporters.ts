import type { AllData, Asset, Prompt, Scene, Task } from "../types/movie";

export function downloadJson(data: AllData | Record<string, unknown>, filename: string): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadText(text: string, filename: string): void {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportCapcutMarkdown(
  movieTitle: string,
  scenes: Scene[],
  assets: Asset[],
  prompts: Prompt[],
  tasks: Task[],
): string {
  const lines: string[] = [];
  lines.push(`# ${movieTitle} — CapCut編集指示書`);
  lines.push("");
  lines.push(`生成日時: ${new Date().toLocaleString("ja-JP")}`);
  lines.push("");

  let timecodeOffset = 0;

  for (const scene of scenes) {
    const start = formatTimecode(timecodeOffset);
    const end = formatTimecode(timecodeOffset + scene.durationSec);
    lines.push(`## ${scene.sceneId}: ${scene.title}`);
    lines.push("");
    lines.push(`- タイムコード: ${start} - ${end} (${scene.durationSec}秒)`);
    lines.push(`- ステータス: ${scene.status}`);
    lines.push(`- 目的: ${scene.purpose}`);
    lines.push(`- 映像: ${scene.visual}`);
    lines.push(`- テロップ: ${scene.caption}`);
    lines.push(`- BGM: ${scene.bgmCue}`);

    if (scene.capcutMemo) {
      lines.push(`- CapCutメモ: ${scene.capcutMemo}`);
    }

    const sceneAssets = assets.filter((a) => scene.assets.includes(a.assetId));
    if (sceneAssets.length > 0) {
      lines.push("");
      lines.push("### 素材");
      for (const a of sceneAssets) {
        const statusMark = a.status === "used" || a.status === "selected" || a.status === "ready" ? "[OK]" : "[!!]";
        lines.push(`- ${statusMark} ${a.title} (${a.type}) — ${a.path || "パス未設定"}`);
      }
    }

    const missingAssets = sceneAssets.filter(
      (a) => a.status === "needed" || a.status === "idea" || !a.path,
    );
    if (missingAssets.length > 0) {
      lines.push("");
      lines.push("### 不足素材");
      for (const a of missingAssets) {
        lines.push(`- ${a.title}: ${a.notes}`);
      }
    }

    const scenePrompts = prompts.filter((p) => scene.promptIds.includes(p.promptId));
    if (scenePrompts.length > 0) {
      lines.push("");
      lines.push("### プロンプト");
      for (const p of scenePrompts) {
        lines.push(`- ${p.title} (${p.status}): ${p.tool}`);
      }
    }

    const sceneTasks = tasks.filter((t) => t.relatedSceneId === scene.sceneId && t.status !== "done" && t.status !== "dropped");
    if (sceneTasks.length > 0) {
      lines.push("");
      lines.push("### 残タスク");
      for (const t of sceneTasks) {
        lines.push(`- [${t.priority}] ${t.title} (${t.status})`);
      }
    }

    if (scene.photoSlots && scene.photoSlots.length > 0) {
      lines.push("");
      lines.push("### 写真スロット");
      for (const slot of scene.photoSlots) {
        const selected = slot.selectedAssetIds.length;
        const mark = selected >= slot.requiredCount ? "[OK]" : "[!!]";
        lines.push(`- ${mark} ${slot.label} (${selected}/${slot.requiredCount}枚) — ${slot.yearLabel || "時期未設定"}`);
        if (slot.comment) lines.push(`  コメント: ${slot.comment}`);
        if (slot.notes) lines.push(`  メモ: ${slot.notes}`);
      }
    }

    if (scene.notes) {
      lines.push("");
      lines.push(`> ${scene.notes}`);
    }

    lines.push("");
    lines.push("---");
    lines.push("");

    timecodeOffset += scene.durationSec;
  }

  lines.push(`合計尺: ${formatTimecode(timecodeOffset)} (${timecodeOffset}秒)`);
  lines.push("");

  return lines.join("\n");
}

export async function saveToLocal(data: AllData): Promise<void> {
  const res = await fetch("/api/save-data", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Unknown error" })) as { error?: string };
    throw new Error(err.error ?? `HTTP ${res.status}`);
  }
}

function formatTimecode(totalSec: number): string {
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}:${sec.toString().padStart(2, "0")}`;
}
