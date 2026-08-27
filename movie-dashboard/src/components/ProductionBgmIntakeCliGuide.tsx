import {useMemo, useState} from "react";

type BgmProject = "opening" | "profile";

const projectCopy = {
  opening: {
    label: "OPENING BGM",
    sourcePlaceholder: "/ABSOLUTE/PATH/TO/RIGHTS-REVIEW-CANDIDATE.mp3",
    receipt: "out/intake/opening-bgm-intake.json",
    next: [
      "pnpm check:opening-sound",
      "# Human rights evidence確認後だけ motion-studio/src/data/assets.ts の opening-bgm-main をcandidate以上へ明示昇格",
      "pnpm check:opening-sound:strict",
    ],
  },
  profile: {
    label: "PROFILE BGM",
    sourcePlaceholder: "/ABSOLUTE/PATH/TO/RIGHTS-REVIEW-CANDIDATE.mp3",
    receipt: "out/intake/profile-bgm-intake.json",
    next: [
      "pnpm profile:bgm-rights:init",
      "# out/qa/profile-v1-bgm-rights-approval.json をHuman reviewで更新",
      "pnpm profile:bgm-rights:strict",
      "pnpm prepare:profile-v1",
    ],
  },
} as const;

export function ProductionBgmIntakeCliGuide({project}: {project: BgmProject}) {
  const [copied, setCopied] = useState<string | null>(null);
  const config = projectCopy[project];
  const commands = useMemo(() => {
    const base = `node --no-warnings scripts/intake-production-bgm.mts --project ${project} --source "${config.sourcePlaceholder}"`;
    return [
      {label: "Motion Studioへ移動", command: "cd motion-studio"},
      {label: "DRY RUN — BGMをcopyしない", command: base},
      {label: "APPLY — SHA確認 + local receipt", command: `${base} --apply --receipt "${config.receipt}"`},
      ...config.next.map((command, index) => ({label: `RIGHTS / PREP ${index + 1}`, command})),
    ];
  }, [config.next, config.receipt, config.sourcePlaceholder, project]);

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
    <section className="mb-8 border-2 border-fuchsia-200 dark:border-fuchsia-800">
      <div className="p-4 md:p-5 border-b border-fuchsia-100 dark:border-fuchsia-900/60">
        <p className="text-[10px] tracking-[0.18em] font-semibold text-fuchsia-700 dark:text-fuchsia-300">CANONICAL BGM INTAKE / {config.label}</p>
        <h2 className="mt-1 text-lg font-bold text-navy-900 dark:text-sand-100">音源copyと権利承認を分離して進める</h2>
        <p className="mt-2 text-xs leading-5 text-navy-500 dark:text-navy-300">
          まず.mp3の実ファイルをDRY RUNし、PASS後だけcanonical <code>bgm-main.mp3</code> へsource非破壊copyします。copy直後にbytesとSHA-256を照合してreceiptを残しますが、<strong>intakeだけでは権利確認済みになりません</strong>。その後に各ProjectのHuman rights gateを通します。
        </p>
      </div>
      <div className="p-4 md:p-5 space-y-2">
        {commands.map((item, index) => (
          <div key={`${item.label}-${index}`}>
            <p className="mb-1 text-[10px] font-semibold text-navy-500 dark:text-navy-300">{String(index + 1).padStart(2, "0")} / {item.label}</p>
            <button
              type="button"
              onClick={() => copy(item.command)}
              className="w-full border border-sand-200 dark:border-navy-600 bg-sand-50 dark:bg-navy-900 px-3 py-2 text-left text-[10px] md:text-xs font-mono text-navy-700 dark:text-navy-200 break-all"
            >
              {copied === item.command ? "✓ copied" : item.command}
            </button>
          </div>
        ))}
        <div className="pt-2 text-[10px] leading-5 text-navy-400">
          <p>RECEIPT: <code>{config.receipt}</code></p>
          <p>NON-MP3は自動transcodeしません。音質・codec条件を別途確認してから入力ファイルを用意します。</p>
          <p>BGM_COPIED != RIGHTS_CLEARED / RECEIPT_WRITTEN != HUMAN_CREATIVE_APPROVAL / BGM_READY != PRODUCTION_READY</p>
        </div>
      </div>
    </section>
  );
}
