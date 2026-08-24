import { Link } from "react-router-dom";
import { openingProductionGate } from "../data/openingProductionGate.generated";

const phaseTone = {
  blocked: "border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-900/20 dark:text-red-200",
  waiting: "border-sand-200 bg-white text-navy-500 dark:border-navy-600 dark:bg-navy-800 dark:text-navy-300",
  ready: "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-200",
} as const;

export function OpeningProductionGatePanel({ compact = false }: { compact?: boolean }) {
  const gate = openingProductionGate;
  const photosReady = Number(gate.photoMissingCount) === 0;
  const bgmReady = Boolean(gate.bgm.playable);
  const previewReady = photosReady && bgmReady;

  const phases = [
    {
      step: "01",
      label: "REAL PHOTOS",
      value: `${gate.resolvedPhotoCount}/${gate.expectedPhotoCount}`,
      detail: photosReady ? "11枠すべて解決済み" : `${gate.photoMissingCount}枚不足`,
      tone: photosReady ? "ready" : "blocked",
    },
    {
      step: "02",
      label: "BGM RIGHTS / FILE",
      value: gate.bgm.playable ? "READY" : gate.bgm.status.toUpperCase(),
      detail: gate.bgm.playable ? "candidate以上" : "権利確認・本体投入待ち",
      tone: bgmReady ? "ready" : "blocked",
    },
    {
      step: "03",
      label: "60s PREVIEW",
      value: previewReady ? "UNLOCKED" : "LOCKED",
      detail: previewReady ? "renderへ進める" : "写真+BGM後に解放",
      tone: previewReady ? "ready" : "waiting",
    },
    {
      step: "04",
      label: "CREATIVE QA",
      value: previewReady ? "NEXT" : "WAIT",
      detail: "crop / motion / color / audio",
      tone: previewReady ? "ready" : "waiting",
    },
  ] as const;

  return (
    <section className={`${compact ? "mb-6" : "mb-8"} border-2 ${gate.finalBlocked ? "border-red-300 dark:border-red-800" : "border-emerald-300 dark:border-emerald-800"} bg-white dark:bg-navy-800`}>
      <div className="p-4 md:p-5 border-b border-sand-200 dark:border-navy-600 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className={`text-[10px] tracking-[0.2em] font-semibold ${gate.finalBlocked ? "text-red-500" : "text-emerald-600"}`}>
            OPENING V1 / PRODUCTION GATE
          </p>
          <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">
            {gate.finalBlocked ? "学習より先に、本番素材を入れる" : "本番素材Gateクリア — 60秒previewへ"}
          </h2>
          <p className="mt-2 text-sm text-navy-600 dark:text-navy-300">{gate.nextAction}</p>
        </div>
        <span className={`px-2.5 py-1 text-[10px] font-mono font-bold tracking-wider ${gate.finalBlocked ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"}`}>
          {gate.finalBlocked ? "FINAL BLOCKED" : "READY FOR PREVIEW"}
        </span>
      </div>

      <div className={`grid grid-cols-2 ${compact ? "lg:grid-cols-4" : "xl:grid-cols-4"} gap-px bg-sand-200 dark:bg-navy-600`}>
        {phases.map((phase) => (
          <div key={phase.step} className={`p-3 md:p-4 border-0 ${phaseTone[phase.tone]}`}>
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-mono opacity-60">STEP {phase.step}</span>
              <span className="text-sm font-mono font-bold">{phase.value}</span>
            </div>
            <p className="mt-2 text-xs font-semibold tracking-wide">{phase.label}</p>
            <p className="mt-1 text-[11px] opacity-70">{phase.detail}</p>
          </div>
        ))}
      </div>

      {!compact && (
        <div className="p-4 md:p-5 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-5">
          <div>
            <p className="text-[10px] tracking-[0.18em] font-semibold text-navy-400">PHOTO SLOTS</p>
            <div className="mt-3 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-2">
              {gate.photoSlots.map((slot) => (
                <div key={slot.key} className={`border px-2.5 py-2 ${slot.resolved ? "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-900/20" : "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20"}`}>
                  <p className="text-[10px] font-mono text-navy-600 dark:text-navy-300">{slot.key}</p>
                  <p className={`mt-1 text-[10px] font-semibold ${slot.resolved ? "text-emerald-700 dark:text-emerald-300" : "text-red-700 dark:text-red-300"}`}>
                    {slot.resolved ? "RESOLVED" : "MISSING"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] tracking-[0.18em] font-semibold text-navy-400">DO THIS NOW</p>
            <ol className="mt-3 space-y-2 text-xs leading-5 text-navy-600 dark:text-navy-300">
              <li><span className="font-mono text-navy-400 mr-2">1</span>11枠の役割を見て実写真を選ぶ</li>
              <li><span className="font-mono text-navy-400 mr-2">2</span>canonical名で <code className="text-[10px]">motion-studio/public/photos/opening/</code> へ配置</li>
              <li><span className="font-mono text-navy-400 mr-2">3</span><code className="text-[10px]">pnpm sync:photos</code> でLibrary更新</li>
              <li><span className="font-mono text-navy-400 mr-2">4</span>BGM権利確認後に60秒previewへ進む</li>
            </ol>
            <div className="mt-4 flex flex-wrap gap-3 text-xs">
              <Link to="/opening-photo-intake" className="px-3 py-2 bg-navy-800 text-white dark:bg-sand-100 dark:text-navy-900">写真11枚を選ぶ →</Link>
              <Link to="/asset-placement-guide" className="border-b border-navy-300 text-navy-600 dark:text-navy-300 self-center">素材ルール →</Link>
              <Link to="/movie-coach/compare" className="border-b border-navy-300 text-navy-600 dark:text-navy-300 self-center">Preview後のA/B判断 →</Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
