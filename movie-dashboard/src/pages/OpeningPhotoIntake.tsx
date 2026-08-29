import {useState} from "react";
import {Link} from "react-router-dom";
import {Header} from "../components/Header";
import {LocalMediaIntakeValidator} from "../components/LocalMediaIntakeValidator";
import {ProductionMediaIntakeCliGuide} from "../components/ProductionMediaIntakeCliGuide";
import {OpeningProductionHandoffExportButton} from "../components/OpeningProductionHandoffExportButton";
import {openingProductionGate} from "../data/openingProductionGate.generated";

type SlotBrief = {
  chapter: string;
  timing: string;
  role: string;
  choose: string;
  avoid: string;
};

const slotBriefs: Record<string, SlotBrief> = {
  "okinawa-01": {chapter: "OKINAWA", timing: "02–13s / 1枚目", role: "章の入口。沖縄だと一目で分かり、2人の旅が始まる写真。", choose: "場所の空気と2人の存在が両方読める写真。", avoid: "顔だけの寄りで、沖縄らしい文脈が消える写真。"},
  "okinawa-02": {chapter: "OKINAWA", timing: "02–13s / 2枚目", role: "章の中盤。1枚目と違う距離感・行動・表情を入れる。", choose: "自然なやり取り、食事、遊びなど旅の体験が伝わる写真。", avoid: "1枚目とほぼ同じ立ち位置・構図。"},
  "okinawa-03": {chapter: "OKINAWA", timing: "02–13s / 3枚目", role: "沖縄章の締め。Seoulへ切り替わる前の余韻を作る。", choose: "広さ・景色・印象的な瞬間など前2枚と役割が違う写真。", avoid: "情報が細かすぎて短時間で読めない写真。"},
  "seoul-01": {chapter: "SEOUL", timing: "13–24s / 1枚目", role: "場所がSeoulへ変わったことを即座に伝える入口。", choose: "街・店・夜景など場所の違いが分かり、2人の旅として読める写真。", avoid: "沖縄やHawaiiと見分けがつかない背景の写真。"},
  "seoul-02": {chapter: "SEOUL", timing: "13–24s / 2枚目", role: "Seoulで何をしたかを見せる体験の写真。", choose: "食・街歩き・遊び・表情など、その旅でしかない具体的な瞬間。", avoid: "ただ並んでいるだけで1枚目と意味が重なる写真。"},
  "seoul-03": {chapter: "SEOUL", timing: "13–24s / 3枚目", role: "Seoul章の締め。人間味や2人らしさを残してHawaiiへつなぐ。", choose: "笑顔・自然な表情・余韻のある写真。", avoid: "人物が小さすぎる、主役が分からない写真。"},
  "hawaii-01": {chapter: "HAWAII", timing: "24–35s / 1枚目", role: "Hawaii章の入口。場所と特別感を一瞬で立ち上げる。", choose: "海・空・街などHawaiiの文脈と2人が両立する強い写真。", avoid: "背景情報がなく、普通の記念写真に見えるもの。"},
  "hawaii-02": {chapter: "HAWAII", timing: "24–35s / 2枚目", role: "旅行パートの感情ピーク候補。", choose: "特別な出来事・表情・関係性が伝わる写真。", avoid: "演出を足さないと意味が伝わらない弱い写真。"},
  "hawaii-03": {chapter: "HAWAII", timing: "24–35s / 3枚目", role: "旅行パートの締め。Heroへ渡す最後の旅写真。", choose: "景色と2人の関係がまとまり、旅行章全体を締められる写真。", avoid: "Hawaii 01/02と画角・表情がほぼ同じ写真。"},
  "hero-01": {chapter: "COUPLE HERO A", timing: "00–02s + 35–44s", role: "最重要写真。Cold OpenとHero Aの両方で使うため、最初の2秒で2人だと伝わる必要がある。", choose: "2人が大きく読める、表情が強い、思い出として象徴的な1枚。", avoid: "集合写真、人物が小さい、暗い、顔が隠れる、説明が必要な写真。"},
  "hero-02": {chapter: "COUPLE HERO B", timing: "44–53s", role: "Hero Aの反復ではなく、2人の別の魅力を見せる2枚目の主役写真。", choose: "Hero 01と距離・場所・感情のどれかが明確に違う強い写真。", avoid: "Hero 01の連写・ほぼ同じ構図。"},
};

const globalChecks = [
  "スクリーンショットやSNS保存画像より、可能なら元写真を使う",
  "顔・目・重要な部分にピントがあり、極端な手ブレがない",
  "3枚連続で同じ距離・同じ立ち位置にしない",
  "16:9へcropしても顔・手・場所の意味が残る",
  "『綺麗だから』ではなく、その旅・2人らしさを説明できる写真を選ぶ",
  "AIで人物を作り直さない。実写真のcrop / color / motionだけで仕上げる",
];

export function OpeningPhotoIntake() {
  const [copied, setCopied] = useState<string | null>(null);
  const gate = openingProductionGate;
  const resolved = Number(gate.resolvedPhotoCount);
  const total = Number(gate.expectedPhotoCount);
  const filesReady = gate.photos.fileReady;
  const receiptCurrent = gate.photos.intakeReceiptCurrent;
  const photosReady = gate.photos.ready;
  const bgmReady = gate.bgm.ready;
  const previewReady = !gate.finalBlocked;
  const localValidationSlots = gate.photoSlots.map((slot) => ({
    id: slot.key,
    canonicalStem: slot.key,
    label: slotBriefs[slot.key]?.chapter ?? slot.key,
    kind: "photo" as const,
  }));

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
        title="OPENING REAL MEDIA INTAKE"
        description="11実写真をcanonical名+SHA receiptで固定し、BGMと合わせて60秒real-media previewへ進むための制作入口"
      />

      <section className={`mb-7 border-2 ${previewReady ? "border-emerald-300 dark:border-emerald-800" : "border-amber-300 dark:border-amber-800"}`}>
        <div className="p-4 md:p-5 border-b border-sand-200 dark:border-navy-600 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[10px] tracking-[0.18em] font-semibold text-navy-400">OPENING V1 / REAL MEDIA PHASE 1</p>
            <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">
              {previewReady ? "実素材Gateクリア — 60秒previewへ" : "11写真 + SHA receipt + BGMを揃える"}
            </h2>
            <p className="mt-2 text-sm text-navy-600 dark:text-navy-300">
              photos {resolved}/{total} / receipt {receiptCurrent ? "CURRENT" : "MISSING / STALE"} / BGM file {gate.bgm.fileExists ? "FOUND" : "MISSING"} / BGM receipt {gate.bgm.intakeReceiptCurrent ? "CURRENT" : "MISSING / STALE"}
            </p>
          </div>
          <span className={`px-2.5 py-1 text-[10px] font-mono font-bold ${previewReady ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"}`}>
            {previewReady ? "PREVIEW READY" : "PREVIEW BLOCKED"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-px bg-sand-200 dark:bg-navy-600">
          <div className={`p-4 ${filesReady ? "bg-emerald-50 dark:bg-emerald-900/20" : "bg-white dark:bg-navy-800"}`}>
            <p className="text-[10px] tracking-[0.16em] font-semibold text-navy-400">REAL PHOTO FILES</p>
            <p className="mt-1 text-2xl font-mono font-bold text-navy-900 dark:text-sand-100">{resolved}/{total}</p>
            <p className="mt-1 text-xs text-navy-500 dark:text-navy-300">{filesReady ? "11 canonical slots found" : `あと${total - resolved}枚`}</p>
          </div>
          <div className={`p-4 ${receiptCurrent ? "bg-emerald-50 dark:bg-emerald-900/20" : "bg-white dark:bg-navy-800"}`}>
            <p className="text-[10px] tracking-[0.16em] font-semibold text-navy-400">PHOTO SHA RECEIPT</p>
            <p className="mt-1 text-2xl font-mono font-bold text-navy-900 dark:text-sand-100">{receiptCurrent ? "CURRENT" : "BLOCKED"}</p>
            <p className="mt-1 text-xs text-navy-500 dark:text-navy-300">{gate.photos.intakeReceiptVerifiedCount}/{gate.photos.intakeReceiptExpectedCount} target SHA verified</p>
            <code className="mt-1 block break-all text-[9px] text-navy-400">motion-studio/{gate.photos.intakeReceiptPath}</code>
          </div>
          <div className={`p-4 ${bgmReady ? "bg-emerald-50 dark:bg-emerald-900/20" : "bg-white dark:bg-navy-800"}`}>
            <p className="text-[10px] tracking-[0.16em] font-semibold text-navy-400">BGM FILE + RECEIPT</p>
            <p className="mt-1 text-sm font-mono font-bold text-navy-900 dark:text-sand-100">{gate.bgm.fileExists ? "FILE FOUND" : "FILE MISSING"}</p>
            <p className={`mt-1 text-xs font-mono font-bold ${gate.bgm.intakeReceiptCurrent ? "text-emerald-700 dark:text-emerald-300" : "text-amber-700 dark:text-amber-300"}`}>RECEIPT {gate.bgm.intakeReceiptCurrent ? "CURRENT" : "MISSING / STALE"}</p>
            {!bgmReady ? <Link to="/opening-bgm-intake" className="mt-2 inline-block border-b border-navy-300 text-[10px] text-navy-600 dark:text-navy-300">Opening BGM Gateを開く →</Link> : null}
          </div>
          <div className={`p-4 ${photosReady && bgmReady ? "bg-emerald-50 dark:bg-emerald-900/20" : "bg-white dark:bg-navy-800"}`}>
            <p className="text-[10px] tracking-[0.16em] font-semibold text-navy-400">NEXT COMMAND</p>
            <p className="mt-1 text-sm font-mono font-bold text-navy-900 dark:text-sand-100">pnpm prepare:opening-v1</p>
            <p className="mt-1 text-xs text-navy-500 dark:text-navy-300">11 filesだけでは解除しない。photo receipt + BGM file + BGM receipt後にpreview準備へ。</p>
          </div>
        </div>
      </section>

      <LocalMediaIntakeValidator slots={localValidationSlots} title="11写真をコピーする前にcanonical名を一括検査" />

      <ProductionMediaIntakeCliGuide project="opening" />

      <section className="mb-8 border-t-2 border-violet-400 dark:border-violet-700 pt-4">
        <OpeningProductionHandoffExportButton />
      </section>

      <section className="mb-8 border-t-2 border-navy-900 dark:border-sand-100 pt-4">
        <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">PHOTO SELECTION RULES</p>
        <div className="mt-3 grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-2">
          {globalChecks.map((item) => <p key={item} className="text-xs leading-5 text-navy-600 dark:text-navy-300">✓ {item}</p>)}
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
                    <span className={`text-[10px] font-semibold ${slot.resolved ? "text-emerald-700 dark:text-emerald-300" : "text-red-700 dark:text-red-300"}`}>{slot.resolved ? "RESOLVED" : "MISSING"}</span>
                  </div>
                  <p className="mt-2 text-sm font-bold text-navy-900 dark:text-sand-100">{brief.chapter}</p>
                  <p className="mt-1 text-xs font-mono text-navy-400">{brief.timing}</p>
                </div>
                <div>
                  <p className="text-[10px] tracking-widest font-semibold text-navy-400">ROLE</p>
                  <p className="mt-1 text-sm leading-6 text-navy-700 dark:text-navy-200">{brief.role}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><p className="text-[10px] tracking-widest font-semibold text-emerald-600">CHOOSE</p><p className="mt-1 text-xs leading-5 text-navy-600 dark:text-navy-300">{brief.choose}</p></div>
                  <div><p className="text-[10px] tracking-widest font-semibold text-red-500">AVOID</p><p className="mt-1 text-xs leading-5 text-navy-600 dark:text-navy-300">{brief.avoid}</p></div>
                </div>
                <div>
                  <p className="text-[10px] tracking-widest font-semibold text-navy-400">FILENAME</p>
                  <button type="button" onClick={() => copy(filename)} className="mt-1 w-full text-left px-3 py-2 border border-sand-200 dark:border-navy-600 bg-sand-50 dark:bg-navy-900 text-xs font-mono text-navy-700 dark:text-navy-200">{copied === filename ? "✓ copied" : filename}</button>
                  {slot.path && <p className="mt-2 text-[10px] break-all text-emerald-700 dark:text-emerald-300">{slot.path}</p>}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mt-8 border-y border-sand-200 dark:border-navy-600 py-5">
        <p className="text-[10px] tracking-[0.18em] font-semibold text-navy-400">DO THIS NOW</p>
        <ol className="mt-3 space-y-2 text-sm leading-6 text-navy-600 dark:text-navy-300">
          <li><span className="font-mono text-navy-400 mr-2">1</span>11 roleに合う実写真を選び、LOCAL PRECHECKでcanonical filename / extension / duplicateを確認</li>
          <li><span className="font-mono text-navy-400 mr-2">2</span>CANONICAL INTAKE CLIをDRY RUNし、PASS後だけ <code className="text-xs">--apply</code> でsource非破壊copy + SHA receipt保存</li>
          <li><span className="font-mono text-navy-400 mr-2">3</span><code className="text-xs">verify-production-media-intake-receipt.mts --project opening</code> で11 targetのbytes/SHAがCURRENTか確認</li>
          <li><span className="font-mono text-navy-400 mr-2">4</span><Link to="/opening-bgm-intake" className="border-b border-navy-300">Opening BGM Gate</Link> でBGM file + receiptをCURRENTにする</li>
          <li><span className="font-mono text-navy-400 mr-2">5</span><code className="text-xs">pnpm prepare:opening-v1</code> → <code className="text-xs">pnpm render:opening-v1:preview</code> → Human crop/focus QAへ</li>
        </ol>
        <div className="mt-4 flex flex-wrap gap-3 text-xs">
          <Link to="/opening-bgm-intake" className="px-3 py-2 bg-navy-800 text-white dark:bg-sand-100 dark:text-navy-900">BGM Gateを開く →</Link>
          <OpeningProductionHandoffExportButton compact />
          <Link to="/movie-coach/compare" className="border-b border-navy-300 text-navy-600 dark:text-navy-300 self-center">Preview後のHuman QA →</Link>
        </div>
      </section>

      <p className="mt-5 text-[10px] text-navy-400">
        11/11 FILE FOUND != PHOTOS READY。photo SHA receiptとBGM file/receiptがcurrentで初めて60秒preview input readyです。Human crop QA / Mac Remotion Studio Actual / DaVinci Actual / final approval は自動PASSしません。
      </p>
    </div>
  );
}
