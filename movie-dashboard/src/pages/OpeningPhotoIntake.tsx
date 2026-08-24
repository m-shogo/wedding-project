import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { openingProductionGate } from "../data/openingProductionGate.generated";

type SlotBrief = {
  chapter: string;
  timing: string;
  role: string;
  choose: string;
  avoid: string;
};

const slotBriefs: Record<string, SlotBrief> = {
  "okinawa-01": {
    chapter: "OKINAWA",
    timing: "02–13s / 1枚目",
    role: "章の入口。沖縄だと一目で分かり、2人の旅が始まる写真。",
    choose: "場所の空気と2人の存在が両方読める写真。",
    avoid: "顔だけの寄りで、沖縄らしい文脈が消える写真。",
  },
  "okinawa-02": {
    chapter: "OKINAWA",
    timing: "02–13s / 2枚目",
    role: "章の中盤。1枚目と違う距離感・行動・表情を入れる。",
    choose: "自然なやり取り、食事、遊びなど旅の体験が伝わる写真。",
    avoid: "1枚目とほぼ同じ立ち位置・構図。",
  },
  "okinawa-03": {
    chapter: "OKINAWA",
    timing: "02–13s / 3枚目",
    role: "沖縄章の締め。Seoulへ切り替わる前の余韻を作る。",
    choose: "広さ・景色・印象的な瞬間など前2枚と役割が違う写真。",
    avoid: "情報が細かすぎて短時間で読めない写真。",
  },
  "seoul-01": {
    chapter: "SEOUL",
    timing: "13–24s / 1枚目",
    role: "場所がSeoulへ変わったことを即座に伝える入口。",
    choose: "街・店・夜景など場所の違いが分かり、2人の旅として読める写真。",
    avoid: "沖縄やHawaiiと見分けがつかない背景の写真。",
  },
  "seoul-02": {
    chapter: "SEOUL",
    timing: "13–24s / 2枚目",
    role: "Seoulで何をしたかを見せる体験の写真。",
    choose: "食・街歩き・遊び・表情など、その旅でしかない具体的な瞬間。",
    avoid: "ただ並んでいるだけで1枚目と意味が重なる写真。",
  },
  "seoul-03": {
    chapter: "SEOUL",
    timing: "13–24s / 3枚目",
    role: "Seoul章の締め。人間味や2人らしさを残してHawaiiへつなぐ。",
    choose: "笑顔・自然な表情・余韻のある写真。",
    avoid: "人物が小さすぎる、主役が分からない写真。",
  },
  "hawaii-01": {
    chapter: "HAWAII",
    timing: "24–35s / 1枚目",
    role: "Hawaii章の入口。場所と特別感を一瞬で立ち上げる。",
    choose: "海・空・街などHawaiiの文脈と2人が両立する強い写真。",
    avoid: "背景情報がなく、普通の記念写真に見えるもの。",
  },
  "hawaii-02": {
    chapter: "HAWAII",
    timing: "24–35s / 2枚目",
    role: "旅行パートの感情ピーク候補。",
    choose: "特別な出来事・表情・関係性が伝わる写真。",
    avoid: "演出を足さないと意味が伝わらない弱い写真。",
  },
  "hawaii-03": {
    chapter: "HAWAII",
    timing: "24–35s / 3枚目",
    role: "旅行パートの締め。Heroへ渡す最後の旅写真。",
    choose: "景色と2人の関係がまとまり、旅行章全体を締められる写真。",
    avoid: "Hawaii 01/02と画角・表情がほぼ同じ写真。",
  },
  "hero-01": {
    chapter: "COUPLE HERO A",
    timing: "00–02s + 35–44s",
    role: "最重要写真。Cold OpenとHero Aの両方で使うため、最初の2秒で2人だと伝わる必要がある。",
    choose: "2人が大きく読める、表情が強い、思い出として象徴的な1枚。",
    avoid: "集合写真、人物が小さい、暗い、顔が隠れる、説明が必要な写真。",
  },
  "hero-02": {
    chapter: "COUPLE HERO B",
    timing: "44–53s",
    role: "Hero Aの反復ではなく、2人の別の魅力を見せる2枚目の主役写真。",
    choose: "Hero 01と距離・場所・感情のどれかが明確に違う強い写真。",
    avoid: "Hero 01の連写・ほぼ同じ構図。",
  },
};

const globalChecks = [
  "スクリーンショットやSNS保存画像より、可能なら元写真を使う",
  "顔・目・重要な部分にピントがあり、極端な手ブレがない",
  "3枚連続で同じ距離・同じ立ち位置にしない",
  "16:9へcropしても顔・手・場所の意味が残る",
  "『綺麗だから』ではなく、その旅・2人らしさを説明できる写真を選ぶ",
  "AIで人物を作り直さない。実写真のcrop / color / motionだけで仕上げる",
];

const motionStudioCommands = [
  "cd motion-studio",
  "pnpm sync:photos",
  "pnpm check:opening-photos:strict",
  "pnpm opening:preflight",
];

const dashboardCommands = [
  "cd ../movie-dashboard",
  "pnpm sync:opening-gate",
];

const previewCommands = [
  "cd ../motion-studio",
  "pnpm render:opening-v1:preview",
];

export function OpeningPhotoIntake() {
  const [copied, setCopied] = useState<string | null>(null);
  const gate = openingProductionGate;
  const resolved = Number(gate.resolvedPhotoCount);
  const total = Number(gate.expectedPhotoCount);

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      window.setTimeout(() => setCopied(null), 1400);
    } catch {
      setCopied(null);
    }
  }

  function CommandList({ commands }: { commands: string[] }) {
    return (
      <div className="space-y-2">
        {commands.map((command) => (
          <button
            key={command}
            type="button"
            onClick={() => copy(command)}
            className="block w-full text-left px-3 py-2 border border-sand-200 dark:border-navy-600 bg-white dark:bg-navy-800 text-xs font-mono text-navy-700 dark:text-navy-200"
          >
            {copied === command ? "✓ copied" : command}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div>
      <Header
        title="OPENING PHOTO INTAKE"
        description="11枚をただ埋めず、各写真の役割を決めてからcanonical名で投入する"
      />

      <section className="mb-8 border-y border-sand-200 dark:border-navy-600 py-5 grid grid-cols-1 md:grid-cols-[0.7fr_1.3fr] gap-6">
        <div>
          <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">REAL PHOTO GATE</p>
          <p className="mt-1 text-4xl font-mono font-bold text-navy-900 dark:text-sand-100">{resolved}/{total}</p>
          <p className={`mt-2 text-sm font-semibold ${resolved === total ? "text-emerald-700 dark:text-emerald-300" : "text-red-700 dark:text-red-300"}`}>
            {resolved === total ? "11枠解決済み" : `あと${total - resolved}枚でFinal photo gate解除`}
          </p>
          <p className="mt-3 text-xs leading-5 text-navy-500 dark:text-navy-300">
            RESOLVED/MISSINGは自己申告ではなく、Motion Studioの実ファイル正本から判定します。
          </p>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">選び方の共通ルール</p>
          <div className="mt-3 grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-2">
            {globalChecks.map((item) => (
              <p key={item} className="text-xs leading-5 text-navy-600 dark:text-navy-300">✓ {item}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-10">
        <div className="border-b-2 border-navy-900 dark:border-sand-100 pb-3 mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">11 CANONICAL SLOTS</p>
            <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">写真の意味 → 選定 → canonical filename</h2>
          </div>
          <span className="text-xs font-mono text-navy-400">JPEG / PNG / WEBP</span>
        </div>

        <div className="divide-y divide-sand-200 dark:divide-navy-600">
          {gate.photoSlots.map((slot, index) => {
            const brief = slotBriefs[slot.key];
            const filename = `${slot.key}.jpg`;
            return (
              <article key={slot.key} className="py-5 grid grid-cols-1 xl:grid-cols-[0.55fr_1fr_1.4fr_0.8fr] gap-5 items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-navy-400">{String(index + 1).padStart(2, "0")}</span>
                    <span className={`text-[10px] font-semibold ${slot.resolved ? "text-emerald-700 dark:text-emerald-300" : "text-red-700 dark:text-red-300"}`}>
                      {slot.resolved ? "RESOLVED" : "MISSING"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-bold text-navy-900 dark:text-sand-100">{brief.chapter}</p>
                  <p className="mt-1 text-xs font-mono text-navy-400">{brief.timing}</p>
                </div>

                <div>
                  <p className="text-[10px] tracking-widest font-semibold text-navy-400">ROLE</p>
                  <p className="mt-1 text-sm leading-6 text-navy-700 dark:text-navy-200">{brief.role}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] tracking-widest font-semibold text-emerald-600">CHOOSE</p>
                    <p className="mt-1 text-xs leading-5 text-navy-600 dark:text-navy-300">{brief.choose}</p>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-widest font-semibold text-red-500">AVOID</p>
                    <p className="mt-1 text-xs leading-5 text-navy-600 dark:text-navy-300">{brief.avoid}</p>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] tracking-widest font-semibold text-navy-400">FILENAME</p>
                  <button
                    type="button"
                    onClick={() => copy(filename)}
                    className="mt-1 w-full text-left px-3 py-2 border border-sand-200 dark:border-navy-600 bg-sand-50 dark:bg-navy-900 text-xs font-mono text-navy-700 dark:text-navy-200"
                  >
                    {copied === filename ? "✓ copied" : filename}
                  </button>
                  {slot.path && <p className="mt-2 text-[10px] break-all text-emerald-700 dark:text-emerald-300">{slot.path}</p>}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mb-10 grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="border-t-2 border-navy-900 dark:border-sand-100 pt-4">
          <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">PUT FILES HERE</p>
          <h2 className="mt-1 text-lg font-bold text-navy-900 dark:text-sand-100">Motion StudioのOpening専用folder</h2>
          <button
            type="button"
            onClick={() => copy("motion-studio/public/photos/opening/")}
            className="mt-3 w-full text-left px-3 py-3 border border-sand-200 dark:border-navy-600 bg-sand-50 dark:bg-navy-900 text-xs font-mono text-navy-700 dark:text-navy-200"
          >
            {copied === "motion-studio/public/photos/opening/" ? "✓ copied" : "motion-studio/public/photos/opening/"}
          </button>
          <p className="mt-3 text-xs leading-5 text-navy-500 dark:text-navy-300">
            実写真本体はGit管理しません。canonical filenameだけ揃え、Motion Studioが実体を読む形を維持します。
          </p>
        </div>

        <div className="border-t-2 border-navy-900 dark:border-sand-100 pt-4">
          <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">AFTER COPY</p>
          <h2 className="mt-1 text-lg font-bold text-navy-900 dark:text-sand-100">11枚投入 → Dashboard同期 → 60秒Preview</h2>
          <div className="mt-4 space-y-5">
            <div>
              <p className="mb-2 text-[10px] tracking-widest font-semibold text-navy-400">1. MOTION STUDIO</p>
              <CommandList commands={motionStudioCommands} />
            </div>
            <div>
              <p className="mb-2 text-[10px] tracking-widest font-semibold text-navy-400">2. DASHBOARD SNAPSHOT</p>
              <CommandList commands={dashboardCommands} />
            </div>
            <div>
              <p className="mb-2 text-[10px] tracking-widest font-semibold text-navy-400">3. PREVIEW</p>
              <CommandList commands={previewCommands} />
            </div>
          </div>
          <p className="mt-3 text-xs text-navy-500 dark:text-navy-300">
            Preview後に初めてcrop / motion / colorを判断。写真を入れる前に演出を詰めません。
          </p>
        </div>
      </section>

      <div className="flex flex-wrap gap-4 text-xs">
        <Link to="/" className="border-b border-navy-300 text-navy-600 dark:text-navy-300">Production Gateへ戻る →</Link>
        <Link to="/movie-coach/compare" className="border-b border-navy-300 text-navy-600 dark:text-navy-300">60秒Preview後のBefore / After →</Link>
        <Link to="/asset-placement-guide" className="border-b border-navy-300 text-navy-600 dark:text-navy-300">素材管理ルール →</Link>
      </div>
    </div>
  );
}
