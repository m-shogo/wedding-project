import {useState} from "react";
import {Link} from "react-router-dom";
import {Header} from "../components/Header";
import {ProfileProductionHandoffExportButton} from "../components/ProfileProductionHandoffExportButton";
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
    label: "canonical intake receiptを固定",
    detail: "元音源を壊さずコピーし、target bytes + SHA-256をreceiptへ保存。Human approval前にもcurrent receiptを再検証する。",
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
  "cd motion-studio",
  "node --no-warnings scripts/intake-production-bgm.mts --project profile --source \"/ABS/PATH/TO/profile-bgm.mp3\"",
  "node --no-warnings scripts/intake-production-bgm.mts --project profile --source \"/ABS/PATH/TO/profile-bgm.mp3\" --apply --receipt out/intake/profile-bgm-intake.json",
  "node --no-warnings scripts/verify-production-bgm-intake-receipt.mts --project profile",
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
        description="Profile V1のBGMをsource-preserving canonical intake + SHA receipt + Human rights approvalでproduction gateへ接続する"
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
          <p className="mt-2 text-xs text-navy-500 dark:text-navy-300">current intake receipt + Human approval / WEDDING_SCREENING / current BGM SHA-bound</p>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.18em] font-semibold text-navy-400">PRODUCTION BGM</p>
          <p className={`mt-1 text-2xl font-mono font-bold ${ready ? "text-emerald-700 dark:text-emerald-300" : "text-red-700 dark:text-red-300"}`}>
            {ready ? "READY" : "BLOCKED"}
          </p>
          <p className="mt-2 text-xs text-navy-500 dark:text-navy-300">実ファイル・current receipt・rights approvalが全てcurrentな時だけ解除</p>
        </div>
      </section>

      <section className="mb-8 border-t-2 border-violet-400 dark:border-violet-700 pt-4">
        <ProfileProductionHandoffExportButton />
      </section>

      <section className="mb-10">
        <div className="border-b-2 border-navy-900 dark:border-sand-100 pb-3 mb-4">
          <p className="text-[10px] tracking-[0.18em] font-semibold text-navy-400">HUMAN RIGHTS GATE</p>
          <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">APPROVE前に確認する5点</h2>
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
          <p className="text-[10px] tracking-[0.18em] font-semibold text-navy-400">CANONICAL TARGET + RECEIPT</p>
          <button
            type="button"
            onClick={() => copy("motion-studio/public/audio/profile/bgm-main.mp3")}
            className="mt-3 w-full text-left border border-sand-200 dark:border-navy-600 px-3 py-3 text-xs font-mono text-navy-700 dark:text-navy-200"
          >
            {copied === "motion-studio/public/audio/profile/bgm-main.mp3" ? "✓ copied" : "motion-studio/public/audio/profile/bgm-main.mp3"}
          </button>
          <button
            type="button"
            onClick={() => copy("motion-studio/out/intake/profile-bgm-intake.json")}
            className="mt-2 w-full text-left border border-sand-200 dark:border-navy-600 px-3 py-3 text-xs font-mono text-navy-700 dark:text-navy-200"
          >
            {copied === "motion-studio/out/intake/profile-bgm-intake.json" ? "✓ copied" : "motion-studio/out/intake/profile-bgm-intake.json"}
          </button>
          <p className="mt-3 text-xs leading-5 text-navy-500 dark:text-navy-300">
            手動copyを正規ルートにしない。まずDRY RUN、次に明示`--apply --receipt`でsourceを保持したままcanonical targetへcopyし、bytes + SHAを照合する。receiptがcurrentでも権利確認済みにはならない。
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
          <p className="mt-3 text-[10px] leading-4 text-navy-400">
            DRY_RUN_PASS != FILE_COPIED / RECEIPT_CURRENT != RIGHTS_CLEARED / RIGHTS_CLEARED != HUMAN_CREATIVE_APPROVAL
          </p>
        </div>
      </section>

      <section className="mb-10 border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-4">
        <p className="text-xs font-bold text-amber-800 dark:text-amber-200">Human approvalをUIで偽装しない</p>
        <p className="mt-2 text-xs leading-5 text-amber-700 dark:text-amber-300">
          この画面には「権利OK」のローカルcheckboxを置かない。current `profile-bgm-intake.json` と `profile-v1-bgm-rights-approval.json` の decision / approver / decidedAt / evidenceNote / BGM SHA が全て一致して `profile:bgm-rights:strict` を通った時だけCLEAREDになる。
        </p>
      </section>

      <div className="flex flex-wrap gap-4 text-xs">
        <Link to="/profile-media-intake" className="border-b border-navy-300 text-navy-600 dark:text-navy-300">17素材Intakeへ戻る →</Link>
        <ProfileProductionHandoffExportButton compact />
        <Link to="/movie-coach/audio" className="border-b border-navy-300 text-navy-600 dark:text-navy-300">Audio Learning →</Link>
        <Link to="/movie-coach/profile" className="border-b border-navy-300 text-navy-600 dark:text-navy-300">Profile Movie Coach →</Link>
      </div>

      <p className="mt-5 text-[10px] text-navy-400">
        FILE_FOUND != RECEIPT_CURRENT / RECEIPT_CURRENT != RIGHTS_CLEARED / RIGHTS_CLEARED != HUMAN_CREATIVE_APPROVAL / BGM_READY != PRODUCTION_READY / HANDOFF_EXPORTED != PRODUCTION_READY
      </p>
    </div>
  );
}
