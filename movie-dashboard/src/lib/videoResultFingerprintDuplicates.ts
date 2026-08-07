import type { Asset, Prompt } from "../types/movie";
import { parseVideoResultProbeEvidence } from "./videoResultProbeEvidence";

export interface VideoResultFingerprintDuplicate {
  promptId: string;
  sampleFingerprint: string;
  assets: Asset[];
}

export function findVideoResultFingerprintDuplicates(prompts: Prompt[], assets: Asset[]) {
  const assetById = new Map(assets.map((asset) => [asset.assetId, asset]));
  const duplicates: VideoResultFingerprintDuplicate[] = [];

  for (const prompt of prompts) {
    if (prompt.target !== "video" || prompt.resultAssetIds.length < 2) continue;
    const byFingerprint = new Map<string, Asset[]>();

    for (const assetId of prompt.resultAssetIds) {
      const asset = assetById.get(assetId);
      if (!asset || asset.type !== "ai_video") continue;
      const fingerprint = parseVideoResultProbeEvidence(asset.notes)?.sampleFingerprint;
      if (!fingerprint) continue;
      const items = byFingerprint.get(fingerprint) ?? [];
      items.push(asset);
      byFingerprint.set(fingerprint, items);
    }

    for (const [sampleFingerprint, matchingAssets] of byFingerprint) {
      if (matchingAssets.length < 2) continue;
      duplicates.push({ promptId: prompt.promptId, sampleFingerprint, assets: matchingAssets });
    }
  }

  return duplicates;
}
