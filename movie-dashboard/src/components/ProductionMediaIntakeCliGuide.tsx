import {useMemo, useState} from "react";

type IntakeProject = "opening" | "profile";

const projectCopy = {
  opening: {
    label: "OPENING 11 PHOTOS",
    sourcePlaceholder: "/ABSOLUTE/PATH/TO/OPENING-SELECTED",
    receipt: "out/intake/opening-media-intake.json",
    prepare: "pnpm prepare:opening-v1",
  },
  profile: {
    label: "PROFILE 17 MEDIA",
    sourcePlaceholder: "/ABSOLUTE/PATH/TO/PROFILE-SELECTED",
    receipt: "out/intake/profile-media-intake.json",
    prepare: "pnpm prepare:profile-v1",
  },
} as const;

export function ProductionMediaIntakeCliGuide({project}: {project: IntakeProject}) {
  const [copied, setCopied] = useState<string | null>(null);
  const config = projectCopy[project];
  const commands = useMemo(() => {
    const base = `node --no-warnings scripts/intake-production-media.mts --project ${project} --source "${config.sourcePlaceholder}"`;
    return [
      {step: "1", label: "Motion Studioへ移動", command: "cd motion-studio"},
      {step: "2", label: "DRY RUN — copyせず全slotを確認", command: base},
      {
        step: "3",
        label: "APPLY — copy後のbytesをSHA確認しreceipt保存",
        command: `${base} --apply --receipt "${config.receipt}"`,
      },
      {step: "4", label: "Motion Studio正本を再同期・preflight", command: config.prepare},
    ];
  }, [config.prepare, config.receipt, config.sourcePlaceholder, project]);

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
    <section className="mb-8 border-2 border-indigo-200 dark:border-indigo-800">
      <div className="p-4 md:p-5 border-b border-indigo-100 dark:border-indigo-900/60">
        <p className="text-[10px] tracking-[0.18em] font-semibold text-indigo-600 dark:text-indigo-300">CANONICAL INTAKE CLI / {config.label}</p>
        <h2 className="mt-1 text-lg font-bold text-navy-900 dark:text-sand-100">元ファイルを壊さず、canonical名 + SHA receiptでMotion Studioへ取り込む</h2>
        <p className="mt-2 text-xs leading-5 text-navy-500 dark:text-navy-300">
          まずDRY RUNで missing / duplicate / kind / 既存target を確認します。DRY RUNはcopyしません。PASS後だけ <code>--apply</code> を実行し、sourceを残したままcanonical targetへcopyします。copy直後にsource/targetのbytesとSHA-256を照合し、成功した各slotのprovenanceをlocal receiptへ保存します。
        </p>
      </div>
      <div className="p-4 md:p-5 space-y-3">
        {commands.map((item) => (
          <div key={item.step} className="grid grid-cols-[2rem_1fr] gap-2 items-start">
            <span className="pt-2 text-[10px] font-mono text-navy-400">{item.step}</span>
            <div>
              <p className="mb-1 text-[10px] font-semibold text-navy-500 dark:text-navy-300">{item.label}</p>
              <button
                type="button"
                onClick={() => copy(item.command)}
                className="w-full border border-sand-200 dark:border-navy-600 bg-sand-50 dark:bg-navy-900 px-3 py-2 text-left text-[10px] md:text-xs font-mono text-navy-700 dark:text-navy-200 break-all"
              >
                {copied === item.command ? "✓ copied" : item.command}
              </button>
            </div>
          </div>
        ))}
        <div className="pt-2 border-t border-indigo-100 dark:border-indigo-900/60 text-[10px] leading-5 text-navy-400">
          <p>RECEIPT: <code>{config.receipt}</code></p>
          <p>canonical id / source filename / target filename / bytes / SHA-256 を保存。実素材本体や絶対source pathはreceiptへ保存しません。</p>
        </div>
        <p className="pt-1 text-[10px] text-navy-400">
          DRY_RUN_PASS != FILE_COPIED / SHA_RECEIPT_WRITTEN != HUMAN_QA_PASS / APPLY_DONE != PRODUCTION_READY
        </p>
      </div>
    </section>
  );
}
