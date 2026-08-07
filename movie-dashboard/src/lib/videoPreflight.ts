import type { AllData, Prompt } from "../types/movie";
import { failureCategoryForPrompt, failureLearningKey, latestRejectedCategory, latestRejectedReason, retryAttempt } from "./videoFailureTaxonomy";
import { promptMode } from "./videoExecutionRouter";
import { buildVideoModelEvidence } from "./videoModelEvidence";
import { resolveProjectVideoModelRoute } from "./videoProjectModelRouter";
import { findVideoResultFingerprintDuplicates } from "./videoResultFingerprintDuplicates";
import { parseVideoResultProbeEvidence } from "./videoResultProbeEvidence";

export type PreflightSeverity = "block" | "warning" | "info";

export interface VideoPreflightIssue {
  id: string;
  severity: PreflightSeverity;
  promptId?: string;
  title: string;
  detail: string;
  action: string;
  href: string;
}

const NEGATIVE_PATTERN = /\b(no|not|without|avoid|never|don't|do not|doesn't)\b/i;
const GUIDANCE_MAX_AGE_DAYS = 45;

function noteValue(notes: string, key: string) {
  const match = notes.match(new RegExp(`${key}=([^\\s/]+)`));
  return match?.[1] ?? "";
}

function guidanceAgeDays(notes: string, now: Date) {
  const value = noteValue(notes, "guidance-checked");
  if (!value) return undefined;
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return undefined;
  return Math.floor((now.getTime() - date.getTime()) / 86_400_000);
}

function promptLabel(prompt: Prompt) {
  return prompt.title || prompt.promptId;
}

export function runVideoPreflight(data: AllData, prompts: Prompt[], now = new Date()): VideoPreflightIssue[] {
  const issues: VideoPreflightIssue[] = [];
  const sceneIds = new Set(data.scenes.map((scene) => scene.sceneId));
  const assetById = new Map(data.assets.map((asset) => [asset.assetId, asset]));
  const promptById = new Map(prompts.map((prompt) => [prompt.promptId, prompt]));
  const modelEvidence = buildVideoModelEvidence(data.prompts);

  for (const duplicate of findVideoResultFingerprintDuplicates(prompts, data.assets)) {
    const prompt = promptById.get(duplicate.promptId);
    if (!prompt) continue;
    const titles = duplicate.assets.map((asset) => asset.title).join(" / ");
    const fingerprintTail = duplicate.sampleFingerprint.slice(-12);
    issues.push({
      id: `${duplicate.promptId}:duplicate-sample-fingerprint:${fingerprintTail}`,
      severity: "warning",
      promptId: duplicate.promptId,
      title: `${promptLabel(prompt)}: 同じ実動画らしいvariantが複数`,
      detail: `${titles} が同じsample fingerprint（…${fingerprintTail}）です。sample fingerprintはfull-file hashではないため、完全一致の証明ではありません。`,
      action: "結果レビューで各Assetを確認し、重複登録なら不要variantを整理する。fingerprintだけで自動削除しない。",
      href: "/video-result-review",
    });
  }

  // Result intake records promptId on generated assets. If Undo or manual editing
  // leaves the Asset but removes Prompt.resultAssetIds, surface it before more work.
  for (const asset of data.assets) {
    if (asset.type !== "ai_video") continue;
    const sourcePromptId = noteValue(asset.notes, "promptId");
    if (!sourcePromptId) continue;
    const sourcePrompt = promptById.get(sourcePromptId);
    if (!sourcePrompt) continue; // Outside the currently selected movie scope.

    if (!sourcePrompt.resultAssetIds.includes(asset.assetId)) {
      issues.push({
        id: `${asset.assetId}:orphan-result-link`,
        severity: "block",
        promptId: sourcePromptId,
        title: `${asset.title}: 生成結果リンクが途中状態`,
        detail: `Asset.notesはpromptId=${sourcePromptId}を示しますが、Prompt.resultAssetIdsに${asset.assetId}がありません。Undo途中または手動編集の可能性があります。`,
        action: "Prompt Bankで既存Assetを結果へ再リンクするか、不要な生成結果ならAssetを整理してから続行する。",
        href: "/prompts",
      });
    }

    const missingSceneLinks = sourcePrompt.relatedSceneIds.filter((sceneId) => !asset.relatedSceneIds.includes(sceneId));
    if (missingSceneLinks.length > 0) {
      issues.push({
        id: `${asset.assetId}:result-scene-gap`,
        severity: "warning",
        promptId: sourcePromptId,
        title: `${asset.title}: Promptと結果Assetのscene範囲が不一致`,
        detail: `Prompt側scene ${missingSceneLinks.join(", ")} が結果Asset.relatedSceneIdsにありません。`,
        action: "素材ライブラリまたは絵コンテで、生成結果を元Promptと同じsceneへ紐付ける。",
        href: "/assets",
      });
    }
  }

  const failureCounts = new Map<string, number>();
  for (const prompt of prompts) {
    if (prompt.status !== "rejected") continue;
    const category = failureCategoryForPrompt(prompt);
    const key = failureLearningKey(prompt, category.id);
    failureCounts.set(key, (failureCounts.get(key) ?? 0) + 1);
  }

  for (const prompt of prompts) {
    const label = promptLabel(prompt);
    const active = prompt.status === "draft" || prompt.status === "testing";

    if (prompt.relatedSceneIds.length === 0 && active) {
      issues.push({ id: `${prompt.promptId}:scene-unlinked`, severity: "block", promptId: prompt.promptId, title: `${label}: シーン未紐付け`, detail: "生成しても絵コンテ上の用途・尺・前後関係へ戻せません。", action: "動画プロンプトまたはPrompt Bankでsceneへ紐付ける。", href: "/prompts" });
    }

    const missingScenes = prompt.relatedSceneIds.filter((sceneId) => !sceneIds.has(sceneId));
    if (missingScenes.length > 0) {
      issues.push({ id: `${prompt.promptId}:scene-missing`, severity: "block", promptId: prompt.promptId, title: `${label}: 存在しないsceneId`, detail: missingScenes.join(", "), action: "壊れたscene参照をPromptから外し、正しいsceneへ再リンクする。", href: "/prompts" });
    }

    const resultAssets = prompt.resultAssetIds.map((assetId) => assetById.get(assetId));
    const missingAssetIds = prompt.resultAssetIds.filter((_, index) => !resultAssets[index]);
    if (missingAssetIds.length > 0) {
      issues.push({ id: `${prompt.promptId}:asset-missing`, severity: "block", promptId: prompt.promptId, title: `${label}: 存在しない結果Asset`, detail: missingAssetIds.join(", "), action: "Prompt.resultAssetIdsを修復するか、生成キューから結果を登録し直す。", href: "/video-generation-queue" });
    }

    const selectedResultId = noteValue(prompt.notes, "selected-result-asset");
    const effectiveAdoptedResultId = prompt.status === "adopted"
      ? selectedResultId || (prompt.resultAssetIds.length === 1 ? prompt.resultAssetIds[0] : "")
      : "";
    const pathless = resultAssets.filter((asset) => {
      if (!asset || asset.path.trim()) return false;
      if (prompt.status === "adopted") return effectiveAdoptedResultId ? asset.assetId === effectiveAdoptedResultId : false;
      return prompt.status === "testing";
    });
    if (pathless.length > 0) {
      issues.push({ id: `${prompt.promptId}:asset-path`, severity: "block", promptId: prompt.promptId, title: `${label}: 使用対象の結果Assetに保存パスなし`, detail: pathless.map((asset) => asset?.title).filter(Boolean).join(" / "), action: "素材ライブラリで実ファイルの保存パスを登録する。", href: "/assets" });
    }

    if (prompt.status === "testing" && prompt.resultAssetIds.length > 0) {
      issues.push({ id: `${prompt.promptId}:review-ready`, severity: "info", promptId: prompt.promptId, title: `${label}: 追加生成よりレビュー優先`, detail: "testingで結果Assetが登録済みです。", action: "AI動画 結果レビューへ進む。", href: "/video-result-review" });
    }

    if (prompt.status === "adopted") {
      if (prompt.resultAssetIds.length === 0) {
        issues.push({ id: `${prompt.promptId}:adopted-no-result`, severity: "block", promptId: prompt.promptId, title: `${label}: 採用済みなのに結果Assetなし`, detail: "採用状態と実素材が一致していません。", action: "結果Assetを紐付けるか、Prompt statusを見直す。", href: "/prompts" });
      }
      if (!prompt.notes.includes("video-review=passed")) {
        issues.push({ id: `${prompt.promptId}:adopted-no-review`, severity: "block", promptId: prompt.promptId, title: `${label}: QA記録なしで採用`, detail: "目視QAを通過した証跡がPrompt.notesにありません。", action: "結果レビューを通し、video-review=passedを残す。", href: "/video-result-review" });
      }
      if (prompt.resultAssetIds.length > 1 && !selectedResultId) {
        issues.push({
          id: `${prompt.promptId}:adopted-result-ambiguous`,
          severity: "block",
          promptId: prompt.promptId,
          title: `${label}: 複数variantの採用正本が未選択`,
          detail: `${prompt.resultAssetIds.length}本の結果Assetが紐付いていますが、Palmier / CapCutへ渡す1本が確定していません。`,
          action: "AI動画 結果レビューで使用する結果Assetを1本選び、QA PASSを保存し直す。",
          href: "/video-result-review",
        });
      }
      if (selectedResultId && !prompt.resultAssetIds.includes(selectedResultId)) {
        issues.push({
          id: `${prompt.promptId}:selected-result-broken`,
          severity: "block",
          promptId: prompt.promptId,
          title: `${label}: 採用正本Asset参照が壊れている`,
          detail: `selected-result-asset=${selectedResultId} がPrompt.resultAssetIdsにありません。`,
          action: "結果レビューで存在する結果Assetを採用正本として選び直す。",
          href: "/video-result-review",
        });
      }
      const adoptedResultAsset = effectiveAdoptedResultId ? assetById.get(effectiveAdoptedResultId) : undefined;
      if (adoptedResultAsset && !parseVideoResultProbeEvidence(adoptedResultAsset.notes)?.sampleFingerprint) {
        issues.push({
          id: `${prompt.promptId}:adopted-result-no-sample-fingerprint`,
          severity: "warning",
          promptId: prompt.promptId,
          title: `${label}: 採用正本の実体fingerprintなし`,
          detail: `${adoptedResultAsset.title} は採用正本ですがsample fingerprintがありません。Continuity v2はAsset ID/path/media metadataで評価を続けますが、同じpathへの実体差し替え検知が弱くなります。`,
          action: "AI動画 実体再probeで同じ既存Assetへprobe証跡だけ追加する。動画本体は上書きしない。",
          href: "/video-asset-reprobe",
        });
      }
    }

    if (prompt.status === "rejected") {
      const reason = latestRejectedReason(prompt.notes);
      const explicitCategory = latestRejectedCategory(prompt.notes);
      if (!reason && !explicitCategory) {
        issues.push({ id: `${prompt.promptId}:rejected-no-reason`, severity: "warning", promptId: prompt.promptId, title: `${label}: 不採用理由・カテゴリなし`, detail: "次回生成へ学習を引き継げません。", action: "結果レビューで失敗カテゴリを記録する。", href: "/video-result-review" });
      }
      const attempt = retryAttempt(prompt);
      if (attempt >= 3) {
        issues.push({ id: `${prompt.promptId}:retry-stop`, severity: "warning", promptId: prompt.promptId, title: `${label}: retry ${attempt}/3 — この系統は停止`, detail: "このlineageは追加Promptではなく入力条件を変える段階です。他のショットまで全体停止にはしません。", action: "失敗学習で静止画・参照・カメラ・モデルの変更を決める。", href: "/video-failure-lab" });
      }
      const category = failureCategoryForPrompt(prompt);
      const recurrence = failureCounts.get(failureLearningKey(prompt, category.id)) ?? 0;
      if (recurrence >= 2) {
        issues.push({ id: `${prompt.promptId}:failure-repeat`, severity: "warning", promptId: prompt.promptId, title: `${label}: 同条件の「${category.label}」が${recurrence}回`, detail: "同じmodel + preset + failure categoryで再発しています。明示カテゴリがあるログではそれを正本にしています。", action: category.nextAction, href: "/video-failure-lab" });
      }
    }

    // Project-observed model evidence can improve after a draft was created.
    // Never rewrite the draft silently: warn before paid generation unless the user explicitly overrode the model.
    if (prompt.status === "draft") {
      const presetId = noteValue(prompt.notes, "preset");
      const routingMode = noteValue(prompt.notes, "model-routing");
      if (presetId && routingMode !== "manual-override") {
        const currentRoute = resolveProjectVideoModelRoute(presetId, modelEvidence);
        if (currentRoute?.learned && currentRoute.model.toolLabel !== prompt.tool) {
          const rate = currentRoute.evidence ? Math.round(currentRoute.evidence.passRate * 100) : 0;
          issues.push({
            id: `${prompt.promptId}:routing-stale`,
            severity: "warning",
            promptId: prompt.promptId,
            title: `${label}: モデル選択が現在のproject実績より古い`,
            detail: `このdraftは${prompt.tool}ですが、現在の「${currentRoute.preset.label}」実績では${currentRoute.model.label}がQA済み${currentRoute.evidence?.reviewed ?? 0}本・採用率${rate}%で優先候補になっています。`,
            action: "有料生成前にVideo Prompt Builderで同じpresetを再適用して比較する。手動で現モデルを使う判断ならmanual overrideとして保存する。",
            href: "/video-prompt-builder",
          });
        }
      }
    }

    if (prompt.tool === "Runway Gen-4.5") {
      if (NEGATIVE_PATTERN.test(prompt.prompt)) {
        issues.push({ id: `${prompt.promptId}:runway-negative`, severity: "warning", promptId: prompt.promptId, title: `${label}: Runway本文に否定表現`, detail: "現行Runway guidanceでは、起きてほしい状態を肯定文で直接書く方針です。", action: "no / avoid / without等を、維持したい状態の肯定文へ書き換える。", href: "/video-prompt-builder" });
      }
      const policy = noteValue(prompt.notes, "negative-policy");
      if (policy !== "qa-only") {
        issues.push({ id: `${prompt.promptId}:runway-negative-policy`, severity: "warning", promptId: prompt.promptId, title: `${label}: Runway negative policyが旧形式`, detail: "このPromptはprovider-aware compiler導入前の可能性があります。", action: "必要なら最新Video Prompt Builderで作り直し、AVOIDをQA専用にする。", href: "/video-prompt-builder" });
      }
    }

    const age = guidanceAgeDays(prompt.notes, now);
    if (age === undefined && active) {
      issues.push({ id: `${prompt.promptId}:guidance-missing`, severity: "warning", promptId: prompt.promptId, title: `${label}: guidance確認日の記録なし`, detail: "古いPromptまたは旧compilerの可能性があります。", action: "モデル仕様が変わっていないか確認し、必要なら最新builderで再コンパイルする。", href: "/video-prompt-builder" });
    } else if (age !== undefined && age > GUIDANCE_MAX_AGE_DAYS && active) {
      issues.push({ id: `${prompt.promptId}:guidance-stale`, severity: "warning", promptId: prompt.promptId, title: `${label}: provider guidanceが${age}日前`, detail: `確認から${GUIDANCE_MAX_AGE_DAYS}日を超えています。モデル更新が速い領域です。`, action: "公式provider docs / 現行UIを再確認してから有料生成する。", href: "/video-prompt-builder" });
    }

    if (promptMode(prompt) === "first-last" && active) {
      issues.push({ id: `${prompt.promptId}:first-last-route`, severity: "info", promptId: prompt.promptId, title: `${label}: first / lastはPalmier準備候補`, detail: "first/last frame・referenceをtimeline contextで管理できます。", action: "Palmier 実行Handoffでfirst/last slotsを準備する。", href: "/palmier-handoff" });
    }

    if (prompt.status === "draft" && prompt.resultAssetIds.length > 0) {
      issues.push({ id: `${prompt.promptId}:draft-with-result`, severity: "warning", promptId: prompt.promptId, title: `${label}: draftなのに結果Assetあり`, detail: "生成済みならtestingへ進めた方がパイプライン状態が正確です。", action: "Prompt statusをtestingへ変更し、結果レビューへ進む。", href: "/prompts" });
    }
  }

  return issues.sort((a, b) => {
    const rank: Record<PreflightSeverity, number> = { block: 0, warning: 1, info: 2 };
    return rank[a.severity] - rank[b.severity] || a.title.localeCompare(b.title, "ja");
  });
}
