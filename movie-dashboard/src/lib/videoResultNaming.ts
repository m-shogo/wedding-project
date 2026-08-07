import type { Asset, Prompt } from "../types/movie";

function noteValue(notes: string, key: string) {
  const match = notes.match(new RegExp(`${key}=([^\\s/]+)`));
  return match?.[1] ?? "";
}

function fileToken(value: string, fallback: string) {
  const normalized = value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^[-_]+|[-_]+$/g, "");
  return normalized || fallback;
}

function linkedGeneratedCount(prompt: Prompt, assets: Asset[]) {
  const ids = new Set(prompt.resultAssetIds);
  for (const asset of assets) {
    if (asset.type !== "ai_video") continue;
    if (noteValue(asset.notes, "promptId") === prompt.promptId) ids.add(asset.assetId);
  }
  return ids.size;
}

export function suggestVideoResultNaming(prompt: Prompt, assets: Asset[]) {
  const scene = fileToken(prompt.relatedSceneIds[0] ?? "", "unlinked");
  const preset = fileToken(noteValue(prompt.notes, "preset"), "video");
  const model = fileToken(prompt.tool, "model");
  const variantNumber = linkedGeneratedCount(prompt, assets) + 1;
  const variant = `v${String(variantNumber).padStart(2, "0")}`;
  const filename = `${scene}-${preset}-${model}-${variant}.mp4`;

  return {
    variant,
    filename,
    title: `${prompt.title} / ${prompt.tool} ${variant}`,
    suggestedPath: `/04_ai-video-assets/ai-videos/${filename}`,
  };
}
