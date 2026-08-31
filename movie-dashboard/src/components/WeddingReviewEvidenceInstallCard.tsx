import {useState} from "react";
import type {SceneProjectId} from "../data/visualSceneComposer";

const COMMANDS: Record<SceneProjectId, {file: string; destination: string; strict: string; sync: string}> = {
  opening: {
    file: "opening-v1-crop-review-evidence.json",
    destination: "motion-studio/out/qa/opening-v1-crop-review-evidence.json",
    strict: "node --no-warnings scripts/opening-v1-crop-review-evidence.mts --strict",
    sync: "node scripts/sync-opening-crop-review-gate.mjs --write",
  },
  profile: {
    file: "profile-v1-real-media-review.json",
    destination: "motion-studio/out/qa/profile-v1-real-media-review.json",
    strict: "pnpm profile:real-media-review:strict",
    sync: "node scripts/sync-profile-real-media-review-gate.mjs --write",
  },
};

export function WeddingReviewEvidenceInstallCard({projectId}: {projectId: SceneProjectId}) {
  const [copied, setCopied] = useState(false);
  const config = COMMANDS[projectId];
  const command = [
    "mkdir -p motion-studio/out/qa",
    `cp \"$HOME/Downloads/${config.file}\" ${config.destination}`,
    `cd motion-studio && ${config.strict}`,
    `cd ../movie-dashboard && ${config.sync}`,
    "pnpm sync:production-state",
  ].join(" && ");

  async function copyCommand() {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <section className="mt-3 border border-teal-300 p-3 dark:border-teal-800" data-wedding-review-evidence-install={projectId}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-[8px] font-semibold tracking-[0.14em] text-teal-700 dark:text-teal-300">HUMAN REVIEW EVIDENCE / INSTALL + VERIFY + REFRESH</p>
          <p className="mt-1 text-[10px] font-semibold text-navy-800 dark:text-sand-100">downloadしたHuman verdictをcanonical evidenceへ戻してstrict再検証</p>
          <p className="mt-1 text-[7px] leading-4 text-navy-500 dark:text-navy-300">repo rootから実行。Downloadsのreview JSONをcanonical `out/qa`へcopyし、既存strict verifierがPASSした場合だけDashboard snapshotを再同期します。</p>
        </div>
        <button type="button" onClick={() => void copyCommand()} className="border border-teal-300 px-2.5 py-1.5 text-[8px] font-semibold text-teal-700 dark:border-teal-800 dark:text-teal-300">{copied ? "COPIED ✓" : "install + verify commandをコピー"}</button>
      </div>

      <code className="mt-3 block max-w-full overflow-x-auto whitespace-nowrap border border-teal-100 p-2 text-[7px] leading-4 dark:border-teal-950">{command}</code>
      <div className="mt-2 grid gap-1 text-[7px] leading-4 sm:grid-cols-2">
        <p><span className="font-semibold">Download:</span> $HOME/Downloads/{config.file}</p>
        <p><span className="font-semibold">Canonical:</span> {config.destination}</p>
      </div>
      <p className="mt-2 border-l-2 border-amber-300 pl-2 text-[7px] leading-3 text-amber-800 dark:text-amber-200">このsurfaceはcommandをcopyするだけです。JSON install ≠ strict PASS。strict PASS ≠ Remotion Studio GUI Actual PASS ≠ Mac Studio Actual PASS ≠ Mac DaVinci GUI Actual PASS ≠ productionReady。</p>
    </section>
  );
}
