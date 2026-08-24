import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { openingProductionGate } from "../data/openingProductionGate.generated";

const rightsChecks = [
  {
    label: "会場上映",
    detail: "挙式・披露宴会場でこの曲をムービーBGMとして上映できる条件を、会場または利用サービスの案内で確認する。",
  },
  {
    label: "音源の入手元",
    detail: "利用条件を満たす正規の音源を使う。動画サイト等から抜き出した音源を本番正本にしない。",
  },
  {
    label: "SNS / 配布は別判断",
    detail: "会場上映OKでも、SNS投稿・オンライン共有・配布まで同じ条件とは限らない。用途を分けて確認する。",
  },
  {
    label: "確認Evidenceを残す",
    detail: "確認先・日付・対象用途が後で分かるよう、メモやスクリーンショット等を残してからcandidateへ昇格する。",
  },
];

const fileCommands = [
  "mkdir -p motion-studio/public/audio/opening",
  "# 権利確認済み音源を motion-studio/public/audio/opening/bgm-main.mp3 として配置",
  "cd motion-studio",
  "pnpm check:opening-sound",
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

  function CopyLine({ text }: { text: string }) {
    return (
      <button
        type="button"
        onClick={() => copy(text)}
        className="block w-full text-left px-3 py-2 border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 text-xs font-mono text-navy-700 dark:text-navy-200"
      >
        {copied === text ? "✓ copied" : text}
      </button>
    );
  }

  return (
    <div>
      <Header
        title="OPENING BGM INTAKE"
        description="曲を入れることより先に利用条件を確認し、権利確認済みの本体だけをOpening V1へ接続する"
      />

      <section className="mb-8 border-y border-sand-200 dark:border-navy-600 py-5 grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-7">
        <div>
          <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">CURRENT SOURCE STATE</p>
          <div className="mt-2 flex items-baseline gap-3">
            <span className={`text-3xl font-mono font-bold ${playable ? "text-emerald-700 dark:text-emerald-300" : "text-red-700 dark:text-red-300"}`}>
              {playable ? "READY" : status.toUpperCase()}
            </span>
            <span className="text-xs font-mono text-navy-400">opening-bgm-main</span>
          </div>
          <p className="mt-3 text-sm leading-6 text-navy-600 dark:text-navy-300">
            {playable
              ? "candidate以上のstatus。strict sound gateでは、さらに実ファイルの存在も検査します。"
              : "現在はFinal BGM gateを解除できません。権利確認と実ファイル投入が先です。"}
          </p>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">SOURCE OF TRUTH</p>
          <div className="mt-2 space-y-2 text-xs text-navy-600 dark:text-navy-300">
            <p><code>motion-studio/src/data/assets.ts</code> — path / status / note</p>
            <p><code>motion-studio/src/data/openingV1Sound.ts</code> — 0–60s BGM cue / volume</p>
            <p><code>motion-studio/scripts/check-opening-sound.mts</code> — Final strict gate</p>
          </div>
          <p className="mt-3 text-xs text-navy-400">
            この画面に「権利OK」チェックを作ってsource stateを偽装しません。Final可否はMotion Studio正本だけで決まります。
          </p>
        </div>
      </section>

      <section className="mb-10">
        <div className="border-b-2 border-navy-900 dark:border-sand-100 pb-3 mb-4">
          <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">RIGHTS FIRST</p>
          <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">candidateへ上げる前に確認する4点</h2>
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

      <section className="mb-10 grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="border-t-2 border-navy-900 dark:border-sand-100 pt-4">
          <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">CANONICAL FILE</p>
          <h2 className="mt-1 text-lg font-bold text-navy-900 dark:text-sand-100">本番BGMの配置先</h2>
          <button
            type="button"
            onClick={() => copy("motion-studio/public/audio/opening/bgm-main.mp3")}
            className="mt-3 w-full text-left px-3 py-3 border border-sand-200 dark:border-navy-600 bg-sand-50 dark:bg-navy-900 text-xs font-mono text-navy-700 dark:text-navy-200"
          >
            {copied === "motion-studio/public/audio/opening/bgm-main.mp3" ? "✓ copied" : "motion-studio/public/audio/opening/bgm-main.mp3"}
          </button>
          <p className="mt-3 text-xs leading-5 text-navy-500 dark:text-navy-300">
            音源本体はGitへ入れません。権利未確認の音源をここへ置いても、statusがmissingの間は本番再生されません。
          </p>
          <div className="mt-4 space-y-2">
            {fileCommands.map((command) => <CopyLine key={command} text={command} />)}
          </div>
        </div>

        <div className="border-t-2 border-navy-900 dark:border-sand-100 pt-4">
          <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">PROMOTE ONLY AFTER RIGHTS REVIEW</p>
          <h2 className="mt-1 text-lg font-bold text-navy-900 dark:text-sand-100">assets.tsでcandidate以上へ昇格</h2>
          <div className="mt-3 border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-4">
            <p className="text-xs font-semibold text-amber-800 dark:text-amber-200">人間確認Gate</p>
            <p className="mt-1 text-xs leading-5 text-amber-700 dark:text-amber-300">
              `assets.ts` のルールどおり、AIが権利確認を推測してcandidate / approved / finalへ勝手に変更しません。確認Evidenceが揃った段階で明示的に昇格します。
            </p>
          </div>
          <div className="mt-4 space-y-2">
            <CopyLine text="motion-studio/src/data/assets.ts → opening-bgm-main" />
            <CopyLine text="status: 'candidate'" />
          </div>
          <p className="mt-3 text-xs text-navy-400">
            candidateは「利用条件を確認し、採用候補として再生可能」の段階。creative final approvalとは分離します。
          </p>
        </div>
      </section>

      <section className="mb-10 border-t-2 border-navy-900 dark:border-sand-100 pt-4">
        <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">AFTER PROMOTION</p>
        <h2 className="mt-1 text-lg font-bold text-navy-900 dark:text-sand-100">Strict gate → Dashboard同期 → 60秒Preview</h2>
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-2">
          {finalGateCommands.map((command) => <CopyLine key={command} text={command} />)}
        </div>
        <p className="mt-3 text-xs text-navy-500 dark:text-navy-300">
          写真11/11も揃えば60秒Previewで初めて「曲の山と写真cutが合うか」「音が映像を急かしていないか」を判断します。
        </p>
      </section>

      <div className="flex flex-wrap gap-4 text-xs">
        <Link to="/" className="border-b border-navy-300 text-navy-600 dark:text-navy-300">Production Gateへ戻る →</Link>
        <Link to="/opening-photo-intake" className="border-b border-navy-300 text-navy-600 dark:text-navy-300">写真11枚のIntake →</Link>
        <Link to="/movie-coach/audio" className="border-b border-navy-300 text-navy-600 dark:text-navy-300">Audio Learning →</Link>
      </div>
    </div>
  );
}
