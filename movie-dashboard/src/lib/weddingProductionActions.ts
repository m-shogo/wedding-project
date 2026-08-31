import { openingProductionStatus } from "../data/openingProductionStatus.generated";
import { profileAssemblyReviewReadiness } from "../data/profileAssemblyReviewReadiness.generated";
import { profileProductionStatus } from "../data/profileProductionStatus.generated";

export type WeddingProject = "Opening" | "Profile";
export type ActionKind = "INPUT_REQUIRED" | "COMMAND" | "HUMAN" | "READY";

export type ProductionAction = {
  project: WeddingProject;
  kind: ActionKind;
  phase: string;
  title: string;
  detail: string;
  commands: string[];
  recoveryHint: string;
};

const isCurrentStage = (state: string) => state === "PASS" || state === "CURRENT";
const executableRecoveryCommands = (items: readonly string[]) => items.filter((item) => item.startsWith("pnpm ") || item.startsWith("node "));

export function deriveOpeningNextAction(): ProductionAction {
  const status = openingProductionStatus;

  if (!Boolean(status.readiness.finalRenderEligible)) {
    return {
      project: "Opening",
      kind: "INPUT_REQUIRED",
      phase: "PRODUCTION INPUTS",
      title: "実11写真 + rights-cleared BGM intake",
      detail: "Production Input Plan Builderで実パスを指定し、media/BGM receipt verifyとfinal prepareまで完了する。placeholder pathの後続commandは実行対象にしない。",
      commands: [],
      recoveryHint: "Production Input Plan Builder → opening intake plan",
    };
  }

  if (String(status.stages.cropReview.state) !== "PASS") {
    return {
      project: "Opening",
      kind: "HUMAN",
      phase: "CROP / FOCUS REVIEW",
      title: "Human crop / focus review",
      detail: "11写真のcrop / focus / color / motionをcurrent photo SHAとeffective focus/fitへ束縛してHuman確認する。",
      commands: executableRecoveryCommands(status.stages.cropReview.recovery),
      recoveryHint: "opening-v1 crop review evidenceをcurrent sourceで再init",
    };
  }

  if (String(status.stages.previewRender.state) !== "PASS") {
    return {
      project: "Opening",
      kind: "COMMAND",
      phase: "REAL-MEDIA PREVIEW",
      title: "real-media preview render",
      detail: "crop承認済みの実素材previewをrenderする。render完了はHuman preview review PASSではない。",
      commands: executableRecoveryCommands(status.stages.previewRender.recovery),
      recoveryHint: "current crop evidenceからpreviewを再render",
    };
  }

  if (String(status.stages.previewSourceBinding.state) !== "PASS" || String(status.stages.previewReview.state) !== "PASS") {
    return {
      project: "Opening",
      kind: "HUMAN",
      phase: "SOURCE-BOUND PREVIEW REVIEW",
      title: "source-bound preview Human review",
      detail: "current render sourceへpreviewを束縛し、映像をHuman確認してstrict checkする。source変更後の古いpreview/evidenceはCURRENT扱いしない。",
      commands: executableRecoveryCommands(status.stages.previewReview.recovery),
      recoveryHint: "preview source bindingをcurrent render sourceへ再init",
    };
  }

  if (String(status.stages.audioListeningReview.state) !== "PASS") {
    return {
      project: "Opening",
      kind: "HUMAN",
      phase: "AUDIO LISTENING REVIEW",
      title: "Human audio listening review",
      detail: "rights-cleared BGM入りpreviewを最後まで実耳で確認し、preview/BGM SHAへevidenceを束縛する。Human listening instructionは説明として扱い、launcherには実行可能commandだけを出す。",
      commands: executableRecoveryCommands(status.stages.audioListeningReview.recovery),
      recoveryHint: "audio evidenceをcurrent preview/BGM SHAへ再init",
    };
  }

  if (!isCurrentStage(String(status.stages.finalRender.state))) {
    return {
      project: "Opening",
      kind: "COMMAND",
      phase: "FINAL RENDER",
      title: "final render + technical QA",
      detail: "Human review済みsourceからfinal renderを作る。technical render成功をHuman final-render reviewやGUI Actualと同一視しない。",
      commands: executableRecoveryCommands(status.stages.finalRender.recovery),
      recoveryHint: "current reviewed sourceからfinal renderを再生成",
    };
  }

  if (!isCurrentStage(String(status.stages.finalRenderReview.state))) {
    return {
      project: "Opening",
      kind: "HUMAN",
      phase: "FINAL RENDER REVIEW",
      title: "Human final-render review",
      detail: "final MP4をHuman確認し、current renderへreview evidenceを束縛する。technical QA PASSだけでは完了扱いにしない。",
      commands: executableRecoveryCommands(status.stages.finalRenderReview.recovery),
      recoveryHint: "final-render review evidenceをcurrent final MP4へ再init",
    };
  }

  if (!isCurrentStage(String(status.stages.productionBundle.state))) {
    return {
      project: "Opening",
      kind: "COMMAND",
      phase: "PRODUCTION BUNDLE",
      title: "SHA-bound production bundle finalize",
      detail: "Human-reviewed final renderからPalmier / DaVinciへ渡すcanonical production bundleを生成する。bundle生成はMac DaVinci Actualではない。",
      commands: executableRecoveryCommands(status.stages.productionBundle.recovery),
      recoveryHint: "current Human final-render reviewからOpening production bundleを再finalize",
    };
  }

  if (!isCurrentStage(String(status.stages.davinciFinishing.state))) {
    return {
      project: "Opening",
      kind: "HUMAN",
      phase: "MAC DAVINCI ACTUAL",
      title: "Opening DaVinci finishing Actual evidence",
      detail: "production bundleをMac DaVinci Resolveへ持ち込み、timeline insertion / crop binding / color / audio / title-safe / 1x・half-speed / exportをHumanが実機確認する。",
      commands: executableRecoveryCommands(status.stages.davinciFinishing.recovery),
      recoveryHint: "Opening DaVinci finishing evidenceをcurrent production bundleへ再initしHuman Actualを実施",
    };
  }

  if (!isCurrentStage(String(status.stages.finalDeliveryApproval.state))) {
    return {
      project: "Opening",
      kind: "HUMAN",
      phase: "FINAL DELIVERY APPROVAL",
      title: "Opening Human final delivery approval",
      detail: "current Mac DaVinci Actual evidenceへ最終承認を束縛する。ここで初めてOpening delivery approvalをHuman判断する。",
      commands: executableRecoveryCommands(status.stages.finalDeliveryApproval.recovery),
      recoveryHint: "Opening final delivery approval evidenceをcurrent DaVinci Actualへ再init",
    };
  }

  return {
    project: "Opening",
    kind: "READY",
    phase: "DELIVERY READY",
    title: "Opening production chain current",
    detail: "final render / Human final review / production bundle / Mac DaVinci Actual / final delivery approvalがcurrent。表示だけでproductionReadyを新規昇格しない。",
    commands: [],
    recoveryHint: "current canonical Opening handoff artifactsをdeliveryへ使用",
  };
}

export function deriveProfileNextAction(): ProductionAction {
  const readiness = profileAssemblyReviewReadiness;
  const production = profileProductionStatus;

  if (!Boolean(readiness.finalRenderEligible)) {
    return {
      project: "Profile",
      kind: "INPUT_REQUIRED",
      phase: "PRODUCTION INPUTS",
      title: "実17素材 + rights-cleared BGM intake",
      detail: "Production Input Plan Builderで実パスを指定し、receipt verify → final prepareまで完了する。",
      commands: [],
      recoveryHint: "Production Input Plan Builder → profile intake plan",
    };
  }

  if (String(readiness.structureReview.state) !== "PASS") {
    return {
      project: "Profile",
      kind: "COMMAND",
      phase: "STRUCTURE REVIEW",
      title: "5章structure Human review",
      detail: "chapter order / visual hierarchy / pacing / media roleをstructure previewでHuman確認する。",
      commands: [
        "pnpm render:profile-v1:structure-preview",
        "pnpm profile:structure-review:init",
        "pnpm profile:structure-review:strict",
      ],
      recoveryHint: "structure previewを再renderしcurrent structure evidenceを再init",
    };
  }

  if (String(readiness.realMediaReview.state) !== "PASS") {
    return {
      project: "Profile",
      kind: "COMMAND",
      phase: "REAL-MEDIA REVIEW",
      title: "real-media preview + Human review",
      detail: "17素材入りpreviewをrenderし、crop / focus / color / emotional fit / contentと5章flowをHuman確認する。",
      commands: [
        "pnpm render:profile-v1:real-media-preview",
        "pnpm profile:real-media-review:init",
        "pnpm profile:real-media-review:strict",
      ],
      recoveryHint: "current 17素材sourceからreal-media preview/evidenceを再生成",
    };
  }

  if (String(readiness.audioReview.state) !== "PASS") {
    return {
      project: "Profile",
      kind: "HUMAN",
      phase: "AUDIO REVIEW",
      title: "Human audio listening review",
      detail: "BGM入りpreviewを最後まで実耳で確認し、current preview/BGMへevidenceを束縛する。",
      commands: [
        "node --no-warnings scripts/profile-v1-audio-listening-review.mts --init",
        "node --no-warnings scripts/profile-v1-audio-listening-review.mts --strict",
      ],
      recoveryHint: "audio evidenceをcurrent preview/BGMへ再init",
    };
  }

  if (!Boolean(readiness.assemblyReady)) {
    return {
      project: "Profile",
      kind: "COMMAND",
      phase: "ASSEMBLY PREFLIGHT",
      title: "assembly preflight再評価",
      detail: "Human QAは揃っているがassemblyReadyが未成立。canonical preflightを再評価してstale/missing prerequisiteを特定する。",
      commands: ["node --no-warnings scripts/profile-v1-assembly-preflight.mts"],
      recoveryHint: "profile-v1 assembly preflightで最初のstale/missing prerequisiteへ戻る",
    };
  }

  if (!isCurrentStage(String(production.stages.finalRender.state))) {
    return {
      project: "Profile",
      kind: "COMMAND",
      phase: "FINAL RENDER",
      title: "final render + technical QA",
      detail: "assemblyReadyかつHuman QA currentなsourceからfinal MP4を生成しtechnical QAする。render成功だけではHuman final-render reviewやDaVinci ActualをPASSにしない。",
      commands: [...production.stages.finalRender.recovery],
      recoveryHint: "current assembly sourceからprofile final renderを再生成",
    };
  }

  if (!isCurrentStage(String(production.stages.finalRenderReview.state))) {
    return {
      project: "Profile",
      kind: "HUMAN",
      phase: "FINAL RENDER REVIEW",
      title: "Profile final MP4 Human review",
      detail: "current final MP4をHumanが実視聴し、review evidenceをrender SHAへ束縛する。technical QA PASSだけでは完了扱いにしない。",
      commands: [...production.stages.finalRenderReview.recovery],
      recoveryHint: "profile final-render review evidenceをcurrent final MP4へ再init",
    };
  }

  if (!isCurrentStage(String(production.stages.productionBundle.state))) {
    return {
      project: "Profile",
      kind: "COMMAND",
      phase: "PRODUCTION BUNDLE",
      title: "SHA-bound production bundle export",
      detail: "Human-reviewed final renderからPalmier / DaVinciへ渡すcanonical production bundleを生成する。bundle生成はMac DaVinci Actualではない。",
      commands: [...production.stages.productionBundle.recovery],
      recoveryHint: "current Human final-render reviewからproduction bundleを再export",
    };
  }

  if (!isCurrentStage(String(production.stages.davinciFinishing.state))) {
    return {
      project: "Profile",
      kind: "HUMAN",
      phase: "MAC DAVINCI ACTUAL",
      title: "DaVinci finishing Actual evidence",
      detail: "production bundleをMac DaVinci Resolveへ持ち込み、timeline insertion / color / audio / title-safe / 1x・half-speed / exportをHumanが実機確認する。",
      commands: [...production.stages.davinciFinishing.recovery],
      recoveryHint: "DaVinci finishing evidenceをcurrent production bundleへ再initしHuman Actualを実施",
    };
  }

  if (!isCurrentStage(String(production.stages.finalDeliveryApproval.state))) {
    return {
      project: "Profile",
      kind: "HUMAN",
      phase: "FINAL DELIVERY APPROVAL",
      title: "Human final delivery approval",
      detail: "current Mac DaVinci Actual evidenceへ最終承認を束縛する。ここで初めてProfile delivery approvalをHuman判断する。",
      commands: [...production.stages.finalDeliveryApproval.recovery],
      recoveryHint: "final delivery approval evidenceをcurrent DaVinci Actualへ再init",
    };
  }

  return {
    project: "Profile",
    kind: "READY",
    phase: "DELIVERY READY",
    title: "Profile production chain current",
    detail: "final render / Human final review / production bundle / Mac DaVinci Actual / final delivery approvalがcurrent。表示だけでproductionReadyを新規昇格しない。",
    commands: [],
    recoveryHint: "current canonical handoff artifactsをdeliveryへ使用",
  };
}

export const weddingProductionActions = {
  Opening: deriveOpeningNextAction(),
  Profile: deriveProfileNextAction(),
} as const;
