import { useState } from "react";
import { profileAssemblyReviewReadiness as readiness } from "../data/profileAssemblyReviewReadiness.generated";

type ActionKind = "INPUT_REQUIRED" | "COMMAND" | "HUMAN" | "READY";

type NextAction = {
  kind: ActionKind;
  phase: string;
  title: string;
  detail: string;
  commands: string[];
};

function deriveNextAction(): NextAction {
  if (!readiness.finalRenderEligible) {
    return {
      kind: "INPUT_REQUIRED",
      phase: "PRODUCTION INPUTS",
      title: "まず17素材とrights-cleared BGMを投入",
      detail: "このHuman QA surfaceからplaceholder pathを実行しない。上のProduction Input Plan Builderで実パスを指定し、receipt verify → final prepareまで完了する。",
      commands: [],
    };
  }
  if (readiness.structureReview.state !== "PASS") {
    return {
      kind: "COMMAND",
      phase: "STRUCTURE REVIEW",
      title: "5章structure previewを作りHuman review",
      detail: "chapter order / visual hierarchy / pacing / media roleを確認する。ここではreal media・BGM・content accuracy・GUI Actualを承認しない。",
      commands: [
        "pnpm render:profile-v1:structure-preview",
        "pnpm profile:structure-review:init",
        "pnpm profile:structure-review:strict",
      ],
    };
  }
  if (readiness.realMediaReview.state !== "PASS") {
    return {
      kind: "COMMAND",
      phase: "REAL-MEDIA REVIEW",
      title: "17素材入りpreviewをrenderしてHuman QA",
      detail: "crop / focus / color / emotional fit / contentと5章flowをHuman確認する。renderしただけではreview PASSにならない。",
      commands: [
        "pnpm render:profile-v1:real-media-preview",
        "pnpm profile:real-media-review:init",
        "pnpm profile:real-media-review:strict",
      ],
    };
  }
  if (readiness.audioReview.state !== "PASS") {
    return {
      kind: "HUMAN",
      phase: "AUDIO REVIEW",
      title: "BGM入りpreviewを最後まで人間が再生",
      detail: "audibility / balance / start integrity / end integrity / picture syncを実耳で確認し、evidenceを更新してstrict checkする。",
      commands: [
        "pnpm profile:audio-listening-review:init",
        "pnpm profile:audio-listening-review:strict",
      ],
    };
  }
  return {
    kind: "READY",
    phase: "ASSEMBLY",
    title: "Profile assembly input + Human QA ready",
    detail: "次はfinal render → technical QA → Human final-render review。Mac DaVinci Actualはまだ別工程。",
    commands: ["pnpm render:profile-v1", "pnpm check:profile-render"],
  };
}

export function ProfileReviewNextActionPanel() {
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
    <section className="mb-10 border-2 border-fuchsia-200 bg-fuchsia-50/20 dark:border-fuchsia-900 dark:bg-fuchsia-950/10">
      <div className="p-4 md:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="max-w-3xl">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-fuchsia-700 dark:text-fuchsia-300">PROFILE EXACT NEXT HUMAN QA GATE</p>
            <h2 className="mt-1 text-lg font-bold text-navy-900 dark:text-sand-100">{action.title}</h2>
            <p className="mt-2 text-xs leading-5 text-navy-500 dark:text-navy-300">{action.detail}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-navy-400">{action.phase}</p>
            <span className="mt-1 inline-block border border-fuchsia-300 px-2 py-1 text-[10px] font-bold text-fuchsia-700 dark:border-fuchsia-800 dark:text-fuchsia-300">{action.kind}</span>
          </div>
        </div>

        {action.kind === "INPUT_REQUIRED" ? (
          <div className="mt-4 border border-amber-300 bg-amber-50/40 p-3 text-xs leading-5 text-amber-800 dark:border-amber-800 dark:bg-amber-950/20 dark:text-amber-200">
            Production Input Plan Builderへ実media path / optional BGM pathを入力してください。入力前の後続Human QA commandは実行対象にしません。
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

        <p className="mt-4 text-[10px] leading-5 text-navy-400">COMMAND_COPIED != COMMAND_EXECUTED / HUMAN_QA_REQUIRED != HUMAN_QA_PASS / Remotion Studio GUI Actual = NOT_RUN / Mac DaVinci GUI Actual = NOT_RUN</p>
      </div>
    </section>
  );
}
