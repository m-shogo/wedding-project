import {useState} from "react";
import {Link} from "react-router-dom";
import {Header} from "../components/Header";
import {OpeningProductionHandoffExportButton} from "../components/OpeningProductionHandoffExportButton";
import {openingProductionGate} from "../data/openingProductionGate.generated";

const rightsChecks = [
  {label: "会場上映", detail: "挙式・披露宴会場でこの曲をムービーBGMとして上映できる条件を、会場または利用サービスの案内で確認する。"},
  {label: "音源の入手元", detail: "利用条件を満たす正規の音源を使う。動画サイト等から抜き出した音源を本番正本にしない。"},
  {label: "canonical intake receipt", detail: "元音源を壊さずcanonical targetへcopyし、bytes + SHA-256をreceiptへ残す。Human approval initもcurrent receiptなしでは開始しない。"},
  {label: "SNS / 配布は別判断", detail: "会場上映OKでも、SNS投稿・オンライン共有・配布まで同じ条件とは限らない。用途を分けて確認する。"},
  {label: "確認Evidenceを残す", detail: "確認先・日付・対象用途をevidenceNoteへ残し、current BGM SHAにHuman approvalを束縛してからcandidateへ昇格する。"},
];

const intakeCommands = [
  "cd motion-studio",
  "node --no-warnings scripts/intake-production-bgm.mts --project opening --source \"/ABS/PATH/TO/opening-bgm.mp3\"",
  "node --no-warnings scripts/intake-production-bgm.mts --project opening --source \"/ABS/PATH/TO/opening-bgm.mp3\" --apply --receipt out/intake/opening-bgm-intake.json",
  "node --no-warnings scripts/verify-production-bgm-intake-receipt.mts --project opening",
  "pnpm check:opening-sound",
];

const rightsApprovalCommands = [
  "node --no-warnings scripts/opening-v1-bgm-rights-approval.mts --init",
  "out/qa/opening-v1-bgm-rights-approval.json → decision=APPROVE / approver / decidedAt / evidenceNote / rightsCleared=true をHuman入力",
  "node --no-warnings scripts/opening-v1-bgm-rights-approval.mts --strict",
];

const finalGateCommands = [
  "pnpm check:opening-sound:strict",
  "cd ../movie-dashboard",
  "pnpm sync:opening-gate",
  "cd ../motion-studio",
  "pnpm render:opening-v1:preview",
];

export function OpeningBgmIntake() {
  const [copied, setCopied] = useState<string | null>(null);
  const gate = openingProductionGate;
  const playable = Boolean(gate.bgm.playable);
  const status = gate.bgm.status;

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      window.setTimeout(() => setCopied(null), 1400);
    } catch {
      setCopied(null);
    }
  }

  function CopyLine({text}: {text: string}) {
    return <button type="button" onClick={() => copy(text)} className="block w-full text-left px-3 py-2 border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 text-xs font-mono text-navy-700 dark:text-navy-200">{copied === text ? "✓ copied" : text}</button>;
  }

  return (
    <div>
      <Header title="OPENING BGM INTAKE" description="Opening V1のBGMをsource-preserving canonical intake + SHA receipt + exact-SHA Human rights approvalでFinal sound gateへ接続する" />

      <section className="mb-8 border-y border-sand-200 dark:border-navy-600 py-5 grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-7">
        <div>
          <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">CURRENT SOURCE STATE</p>
          <div className="mt-2 flex items-baseline gap-3"><span className={`text-3xl font-mono font-bold ${playable ? "text-emerald-700 dark:text-emerald-300" : "text-red-700 dark:text-red-300"}`}>{playable ? "READY" : status.toUpperCase()}</span><span className="text-xs font-mono text-navy-400">opening-bgm-main</span></div>
          <p className="mt-3 text-sm leading-6 text-navy-600 dark:text-navy-300">{playable ? "candidate以上のstatus。strict sound gateでは実ファイル、current intake receipt、current SHAへのHuman rights approvalを再検証します。" : "現在はFinal BGM gateを解除できません。canonical intake・SHA-bound権利確認・明示的status昇格が先です。"}</p>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">SOURCE OF TRUTH</p>
          <div className="mt-2 space-y-2 text-xs text-navy-600 dark:text-navy-300">
            <p><code>motion-studio/out/intake/opening-bgm-intake.json</code> — copy provenance / bytes / SHA-256</p>
            <p><code>motion-studio/out/qa/opening-v1-bgm-rights-approval.json</code> — Human WEDDING_SCREENING decision bound to exact BGM SHA</p>
            <p><code>motion-studio/src/data/assets.ts</code> — path / status</p>
            <p><code>motion-studio/src/data/openingV1Sound.ts</code> — 0–60s BGM cue / volume</p>
            <p><code>motion-studio/scripts/check-opening-sound.mts</code> — receipt + Human rights bound Final strict gate</p>
          </div>
          <p className="mt-3 text-xs text-navy-400">Receiptは「正しくcopyされた」証拠であって権利承認ではありません。Human approvalも対象SHAが変わればSTALEです。</p>
        </div>
      </section>

      <section className="mb-8 border-t-2 border-violet-400 dark:border-violet-700 pt-4"><OpeningProductionHandoffExportButton /></section>

      <section className="mb-10">
        <div className="border-b-2 border-navy-900 dark:border-sand-100 pb-3 mb-4"><p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">RIGHTS + PROVENANCE</p><h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">candidateへ上げる前に確認する5点</h2></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-sand-200 dark:bg-navy-600 border border-sand-200 dark:border-navy-600">
          {rightsChecks.map((item, index) => <article key={item.label} className="bg-white dark:bg-navy-800 p-4"><div className="flex gap-3"><span className="text-[10px] font-mono text-navy-400">{String(index + 1).padStart(2, "0")}</span><div><h3 className="text-sm font-bold text-navy-900 dark:text-sand-100">{item.label}</h3><p className="mt-1 text-xs leading-5 text-navy-600 dark:text-navy-300">{item.detail}</p></div></div></article>)}
        </div>
      </section>

      <section className="mb-10 grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="border-t-2 border-navy-900 dark:border-sand-100 pt-4">
          <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">01 / CANONICAL INTAKE</p>
          <h2 className="mt-1 text-lg font-bold text-navy-900 dark:text-sand-100">DRY RUN → SHA-verified apply</h2>
          <CopyLine text="motion-studio/public/audio/opening/bgm-main.mp3" /><div className="mt-2"><CopyLine text="motion-studio/out/intake/opening-bgm-intake.json" /></div>
          <p className="mt-3 text-xs leading-5 text-navy-500 dark:text-navy-300">手動copyを正規ルートにしません。DRY RUN後、明示`--apply --receipt`でsource非破壊copyし、source/target bytes + SHA-256を照合します。</p>
          <div className="mt-4 space-y-2">{intakeCommands.map((command) => <CopyLine key={command} text={command} />)}</div>
          <p className="mt-3 text-[10px] text-navy-400">DRY_RUN_PASS != FILE_COPIED / RECEIPT_CURRENT != RIGHTS_CLEARED / INTAKE_DONE != PRODUCTION_READY</p>
        </div>

        <div className="border-t-2 border-navy-900 dark:border-sand-100 pt-4">
          <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">02 / HUMAN RIGHTS APPROVAL</p>
          <h2 className="mt-1 text-lg font-bold text-navy-900 dark:text-sand-100">current SHAへ判断を固定</h2>
          <div className="mt-3 border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-4"><p className="text-xs font-semibold text-amber-800 dark:text-amber-200">人間確認Gate</p><p className="mt-1 text-xs leading-5 text-amber-700 dark:text-amber-300">`--init` はcurrent receiptが無ければ失敗し、作成時は必ず HOLD / rightsCleared=false。Humanが会場上映条件を確認してこのSHAへAPPROVEした後だけstrictが通ります。</p></div>
          <div className="mt-4 space-y-2">{rightsApprovalCommands.map((command) => <CopyLine key={command} text={command} />)}</div>
          <p className="mt-3 text-xs text-navy-400">BGM bytesを後から変えると `STALE_OPENING_BGM_RIGHTS_APPROVAL_SHA` で失効します。</p>
        </div>

        <div className="border-t-2 border-navy-900 dark:border-sand-100 pt-4">
          <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">03 / PROMOTE</p>
          <h2 className="mt-1 text-lg font-bold text-navy-900 dark:text-sand-100">CLEARED後だけassets.tsをcandidate以上へ</h2>
          <div className="mt-3 border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-4"><p className="text-xs leading-5 text-amber-700 dark:text-amber-300">AIが権利確認を推測してcandidate / approved / finalへ勝手に変更しません。Human approval strictがCLEAREDの後に明示的status昇格します。</p></div>
          <div className="mt-4 space-y-2"><CopyLine text="motion-studio/src/data/assets.ts → opening-bgm-main" /><CopyLine text="status: 'candidate'" /></div>
        </div>
      </section>

      <section className="mb-10 border-t-2 border-navy-900 dark:border-sand-100 pt-4">
        <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">AFTER PROMOTION</p>
        <h2 className="mt-1 text-lg font-bold text-navy-900 dark:text-sand-100">Receipt + Human rights strict gate → Dashboard同期 → 60秒Preview</h2>
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-2">{finalGateCommands.map((command) => <CopyLine key={command} text={command} />)}</div>
        <p className="mt-3 text-xs text-navy-500 dark:text-navy-300">写真11/11も揃えば60秒Previewで初めて「曲の山と写真cutが合うか」「音が映像を急かしていないか」をHuman QAします。</p>
      </section>

      <div className="flex flex-wrap gap-4 text-xs"><Link to="/" className="border-b border-navy-300 text-navy-600 dark:text-navy-300">Production Gateへ戻る →</Link><Link to="/opening-photo-intake" className="border-b border-navy-300 text-navy-600 dark:text-navy-300">写真11枚のIntake →</Link><OpeningProductionHandoffExportButton compact /><Link to="/movie-coach/audio" className="border-b border-navy-300 text-navy-600 dark:text-navy-300">Audio Learning →</Link></div>

      <p className="mt-5 text-[10px] text-navy-400">FILE_FOUND != RECEIPT_CURRENT / RECEIPT_CURRENT != RIGHTS_CLEARED / HANDOFF_EXPORTED != PRODUCTION_READY / CI_MUST_NOT_PROMOTE_MAC_GUI_ACTUAL</p>
    </div>
  );
}
