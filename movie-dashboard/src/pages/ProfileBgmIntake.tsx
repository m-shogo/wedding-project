import {useState} from "react";
import {Link} from "react-router-dom";
import {Header} from "../components/Header";
import {profileProductionGate} from "../data/profileProductionGate.generated";

const rightsChecks = [
  {
    label: "披露宴上映用途を確認",
    detail: "会場・利用サービス・音源の条件を確認し、今回のプロフィールムービー上映に使える根拠を残す。",
  },
  {
    label: "正規音源だけを使用",
    detail: "購入・提供条件が確認できる音源を使い、動画サイト等から抜き出したファイルを本番正本にしない。",
  },
  {
    label: "現在の音源SHAへ承認を固定",
    detail: "音源差し替え後に古い権利確認を使い回さない。Profile V1はHuman approvalを現在のBGM SHA-256へbindする。",
  },
  {
    label: "Evidence noteを残す",
    detail: "確認先・対象用途・日付・判断内容が後で追えるEvidenceをHuman approval artifactへ記録する。",
  },
] as const;

const commands = [
  "mkdir -p motion-studio/public/audio/profile",
  "# 権利確認対象の音源を motion-studio/public/audio/profile/bgm-main.mp3 として配置",
  "cd motion-studio",
  "pnpm profile:bgm-rights:init",
  "# out/qa/profile-v1-bgm-rights-approval.json をHuman reviewで更新",
  "pnpm profile:bgm-rights:strict",
  "pnpm prepare:profile-v1",
] as const;

export function ProfileBgmIntake() {
  const [copied, setCopied] = useState<string | null>(null);
  const gate = profileProductionGate;
  const fileExists = Boolean(gate.bgm.fileExists);
  const rightsState = String(gate.bgm.rightsState);
  const rightsCleared = rightsState === "CLEARED";
  const ready = Boolean(gate.bgm.ready);

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      window.setTimeout(() => setCopied(null), 1400);
    } catch {
      setCopied(null);
    }
  }

  return (
    <div>
      <Header
        title="PROFILE BGM INTAKE"
        description="Profile V1のBGMを実ファイル + SHA-bound Human rights approvalで確認してからproduction gateへ接続する"
      />

      <section className="mb-8 border-y border-sand-200 dark:border-navy-600 py-5 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <p className="text-[10px] tracking-[0.18em] font-semibold text-navy-400">FILE</p>
          <p className={`mt-1 text-2xl font-mono font-bold ${fileExists ? "text-emerald-700 dark:text-emerald-300" : "text-red-700 dark:text-red-300"}`}>
            {fileExists ? "FOUND" : "MISSING"}
          </p>
          <code className="mt-2 block break-all text-[10px] text-navy-500 dark:text-navy-300">{gate.bgm.path}</code>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.18em] font-semibold text-navy-400">RIGHTS APPROVAL</p>
          <p className={`mt-1 text-2xl font-mono font-bold ${rightsCleared ? "text-emerald-700 dark:text-emerald-300" : "text-amber-700 dark:text-amber-300"}`}>
            {rightsState}
          </p>
          <p className="mt-2 text-xs text-navy-500 dark:text-navy-300">Human approval / WEDDING_SCREENING / current BGM SHA-bound</p>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.18em] font-semibold text-navy-400">PRODUCTION BGM</p>
          <p className={`mt-1 text-2xl font-mono font-bold ${ready ? "text-emerald-700 dark:text-emerald-300" : "text-red-700 dark:text-red-300"}`}>
            {ready ? "READY" : "BLOCKED"}
          </p>
          <p className="mt-2 text-xs text-navy-500 dark:text-navy-300">実ファイルとrights approvalの両方がcurrentな時だけ解除</p>
        </div>
      </section>

      <section className="mb-10">
        <div className="border-b-2 border-navy-900 dark:border-sand-100 pb-3 mb-4">
          <p className="text-[10px] tracking-[0.18em] font-semibold text-navy-400">HUMAN RIGHTS GATE</p>
          <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">APPROVE前に確認する4点</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-sand-200 dark:bg-navy-600 border border-sand-200 dark:border-navy-600">
          {rightsChecks.map((item, index) => (
            <article key={item.label} className="bg-white dark:bg-navy-800 p-4">
              <div className="flex gap-3">
                <span className="text-[10px] font-mono text-navy-400">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-sm font-bold text-navy-900 dark:text-sand-100">{item.label}</h3>
                  <p className="mt-1 text-xs leading-5 text-navy-600 dark:text-navy-300">{item.detail}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-10 grid grid-cols-1 xl:grid-cols-[0.8fr_1.2fr] gap-8">
        <div className="border-t-2 border-navy-900 dark:border-sand-100 pt-4">
          <p className="text-[10px] tracking-[0.18em] font-semibold text-navy-400">CANONICAL FILE</p>
          <button
            type="button"
            onClick={() => copy("motion-studio/public/audio/profile/bgm-main.mp3")}
            className="mt-3 w-full text-left border border-sand-200 dark:border-navy-600 px-3 py-3 text-xs font-mono text-navy-700 dark:text-navy-200"
          >
            {copied === "motion-studio/public/audio/profile/bgm-main.mp3" ? "✓ copied" : "motion-studio/public/audio/profile/bgm-main.mp3"}
          </button>
          <p className="mt-3 text-xs leading-5 text-navy-500 dark:text-navy-300">
            音源本体はGitへ入れない。ファイルが存在してもHuman rights approvalが未完了ならproduction BGMにはしない。
          </p>
        </div>

        <div className="border-t-2 border-navy-900 dark:border-sand-100 pt-4">
          <p className="text-[10px] tracking-[0.18em] font-semibold text-navy-400">CANONICAL COMMAND PATH</p>
          <div className="mt-3 space-y-2">
            {commands.map((command) => (
              <button
                key={command}
                type="button"
                onClick={() => copy(command)}
                className="block w-full text-left border border-sand-200 dark:border-navy-600 px-3 py-2 text-xs font-mono text-navy-700 dark:text-navy-200"
              >
                {copied === command ? "✓ copied" : command}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-10 border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-4">
        <p className="text-xs font-bold text-amber-800 dark:text-amber-200">Human approvalをUIで偽装しない</p>
        <p className="mt-2 text-xs leading-5 text-amber-700 dark:text-amber-300">
          この画面には「権利OK」のローカルcheckboxを置かない。`profile-v1-bgm-rights-approval.json` の decision / approver / decidedAt / evidenceNote と、現在のBGM SHAが一致して `profile:bgm-rights:strict` を通った時だけCLEAREDになる。
        </p>
      </section>

      <div className="flex flex-wrap gap-4 text-xs">
        <Link to="/profile-media-intake" className="border-b border-navy-300 text-navy-600 dark:text-navy-300">17素材Intakeへ戻る →</Link>
        <Link to="/movie-coach/audio" className="border-b border-navy-300 text-navy-600 dark:text-navy-300">Audio Learning →</Link>
        <Link to="/movie-coach/profile" className="border-b border-navy-300 text-navy-600 dark:text-navy-300">Profile Movie Coach →</Link>
      </div>

      <p className="mt-5 text-[10px] text-navy-400">
        FILE_FOUND != RIGHTS_CLEARED / RIGHTS_CLEARED != HUMAN_CREATIVE_APPROVAL / BGM_READY != PRODUCTION_READY
      </p>
    </div>
  );
}
