import { useState } from "react";
import { openingProductionStatus as status } from "../data/openingProductionStatus.generated";

type ActionKind = "INPUT_REQUIRED" | "COMMAND" | "HUMAN" | "READY";

type NextAction = {
  kind: ActionKind;
  phase: string;
  title: string;
  detail: string;
  commands: string[];
};

function deriveNextAction(): NextAction {
  if (!Boolean(status.readiness.finalRenderEligible)) {
    return {
      kind: "INPUT_REQUIRED",
      phase: "PRODUCTION INPUTS",
      title: "まず11写真とrights-cleared BGMを投入",
      detail: "上のProduction Input Plan Builderで実パスを指定し、media/BGM receipt verifyとfinal prepareまで完了する。placeholder pathの後続commandは実行対象にしない。",
      commands: [],
    };
  }
  if (String(status.stages.cropReview.state) !== "PASS") {
    return {
      kind: "HUMAN",
      phase: "CROP / FOCUS REVIEW",
      title: "11写真のcrop / focus / color / motionをHuman確認",
      detail: "current photo SHA + effective focus/fitへevidenceを束縛する。initだけではPASSにならず、Human記録後のstrict checkが必要。",
      commands: [
        "node --no-warnings scripts/opening-v1-crop-review-evidence.mts --init",
        "node --no-warnings scripts/opening-v1-crop-review-evidence.mts --strict",
      ],
    };
  }
  if (String(status.stages.previewRender.state) !== "PASS") {
    return {
      kind: "COMMAND",
      phase: "REAL-MEDIA PREVIEW",
      title: "crop承認済みの実素材previewをrender",
      detail: "preview MP4を作るだけの工程。render完了をHuman preview review PASSやGUI Actualと同一視しない。",
      commands: ["pnpm render:opening-v1:preview"],
    };
  }
  if (String(status.stages.previewSourceBinding.state) !== "PASS" || String(status.stages.previewReview.state) !== "PASS") {
    return {
      kind: "HUMAN",
      phase: "SOURCE-BOUND PREVIEW REVIEW",
      title: "current sourceへpreviewを束縛してHuman QA",
      detail: "source変更後の古いpreview/evidenceはCURRENT扱いしない。initでcurrent render sourceへ束縛し、映像をHuman確認してstrict checkする。",
      commands: [
        "pnpm opening:preview-review:init",
        "pnpm opening:preview-review:strict",
      ],
    };
  }
  if (String(status.stages.audioListeningReview.state) !== "PASS") {
    return {
      kind: "HUMAN",
      phase: "AUDIO LISTENING REVIEW",
      title: "rights-cleared BGM入りpreviewを最後まで実耳で確認",
      detail: "audibility / balance / start integrity / end integrity / picture syncをHuman確認し、preview/BGM SHAへevidenceを束縛する。",
      commands: [
        "node --no-warnings scripts/opening-v1-audio-listening-review.mts --init",
        "node --no-warnings scripts/opening-v1-audio-listening-review.mts --strict",
      ],
    };
  }
  return {
    kind: "READY",
    phase: "FINAL RENDER",
    title: "Opening final renderへ進める",
    detail: "media + crop + source-bound preview + audio listeningがcurrent。次はfinal render → technical QA → Human final-render review。Mac DaVinci Actualは別工程。",
    commands: [
      "pnpm render:opening-v1",
      "pnpm opening:final-render-review:init",
      "pnpm opening:final-render-review:strict",
    ],
  };
}

export function OpeningReviewNextActionPanel() {
  const action = deriveNextAction();
  const [copied, setCopied] = useState<string | null>(null);

  async function copy(command: string) {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(command);
      window.setTimeout(() => setCopied(null), 1400);
    } catch {
      setCopied(null);
    }
  }

  return (
    <section className="mb-10 border-2 border-cyan-200 bg-cyan-50/20 dark:border-cyan-900 dark:bg-cyan-950/10">
      <div className="p-4 md:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="max-w-3xl">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-cyan-700 dark:text-cyan-300">OPENING EXACT NEXT HUMAN QA GATE</p>
            <h2 className="mt-1 text-lg font-bold text-navy-900 dark:text-sand-100">{action.title}</h2>
            <p className="mt-2 text-xs leading-5 text-navy-500 dark:text-navy-300">{action.detail}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-navy-400">{action.phase}</p>
            <span className="mt-1 inline-block border border-cyan-300 px-2 py-1 text-[10px] font-bold text-cyan-700 dark:border-cyan-800 dark:text-cyan-300">{action.kind}</span>
          </div>
        </div>

        {action.kind === "INPUT_REQUIRED" ? (
          <div className="mt-4 border border-amber-300 bg-amber-50/40 p-3 text-xs leading-5 text-amber-800 dark:border-amber-800 dark:bg-amber-950/20 dark:text-amber-200">
            Production Input Plan Builderへ実media path / optional BGM pathを入力してください。入力前はcrop以降のHuman QAを開始しません。
          </div>
        ) : (
          <div className="mt-4 grid gap-2 lg:grid-cols-3">
            {action.commands.map((command) => (
              <button key={command} type="button" onClick={() => copy(command)} className="border border-sand-300 px-3 py-3 text-left font-mono text-[10px] leading-5 break-all dark:border-navy-600">
                {copied === command ? "✓ copied" : command}
              </button>
            ))}
          </div>
        )}

        <p className="mt-4 text-[10px] leading-5 text-navy-400">COMMAND_COPIED != COMMAND_EXECUTED / HUMAN_QA_REQUIRED != HUMAN_QA_PASS / PREVIEW_RENDERED != PREVIEW_REVIEW_PASS / Remotion Studio GUI Actual = NOT_RUN / Mac DaVinci GUI Actual = NOT_RUN</p>
      </div>
    </section>
  );
}
