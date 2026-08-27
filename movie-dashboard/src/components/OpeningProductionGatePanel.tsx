import { Link } from "react-router-dom";
import { openingProductionGate } from "../data/openingProductionGate.generated";
import {OpeningProductionHandoffExportButton} from "./OpeningProductionHandoffExportButton";
import {ProductionMediaIntakeCliGuide} from "./ProductionMediaIntakeCliGuide";

const phaseTone = {
  blocked: "border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-900/20 dark:text-red-200",
  waiting: "border-sand-200 bg-white text-navy-500 dark:border-navy-600 dark:bg-navy-800 dark:text-navy-300",
  ready: "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-200",
} as const;

export function OpeningProductionGatePanel({ compact = false }: { compact?: boolean }) {
  const gate = openingProductionGate;
  const photoFilesReady = gate.photos.fileReady;
  const photoReceiptCurrent = gate.photos.intakeReceiptCurrent;
  const photosReady = gate.photos.ready;
  const bgmReady = gate.bgm.ready;
  const previewReady = !gate.finalBlocked;

  const phases = [
    {
      step: "01",
      label: "REAL PHOTOS / SHA RECEIPT",
      value: `${gate.resolvedPhotoCount}/${gate.expectedPhotoCount}`,
      detail: photosReady
        ? `11 files + ${gate.photos.intakeReceiptVerifiedCount}/${gate.photos.intakeReceiptExpectedCount} SHA CURRENT`
        : photoFilesReady
          ? "11 files found / intake receipt MISSING or STALE"
          : `${gate.photoMissingCount} files不足 / receipt ${photoReceiptCurrent ? "CURRENT" : "BLOCKED"}`,
      tone: photosReady ? "ready" : "blocked",
    },
    {
      step: "02",
      label: "BGM FILE / RECEIPT / RIGHTS",
      value: bgmReady ? "READY" : gate.bgm.status.toUpperCase(),
      detail: bgmReady
        ? "file + receipt + candidate以上"
        : `file=${gate.bgm.fileExists ? "YES" : "NO"} receipt=${gate.bgm.intakeReceiptCurrent ? "CURRENT" : "BLOCKED"}`,
      tone: bgmReady ? "ready" : "blocked",
    },
    {
      step: "03",
      label: "60s PREVIEW",
      value: previewReady ? "UNLOCKED" : "LOCKED",
      detail: previewReady ? "canonical assembly gate通過" : "写真receipt + BGM後に解放",
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
            {gate.finalBlocked ? "本番素材 + SHA receiptを先に揃える" : "Canonical Assembly Gateクリア — 60秒previewへ"}
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
        <>
          {!photosReady && (
            <div className="p-4 md:p-5 border-b border-sand-200 dark:border-navy-600">
              <ProductionMediaIntakeCliGuide project="opening" />
            </div>
          )}
          <div className="p-4 md:p-5 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-5">
            <div>
              <p className="text-[10px] tracking-[0.18em] font-semibold text-navy-400">PHOTO SLOTS / FILE DISCOVERY</p>
              <div className="mt-3 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-2">
                {gate.photoSlots.map((slot) => (
                  <div key={slot.key} className={`border px-2.5 py-2 ${slot.resolved ? "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-900/20" : "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20"}`}>
                    <p className="text-[10px] font-mono text-navy-600 dark:text-navy-300">{slot.key}</p>
                    <p className={`mt-1 text-[10px] font-semibold ${slot.resolved ? "text-emerald-700 dark:text-emerald-300" : "text-red-700 dark:text-red-300"}`}>
                      {slot.resolved ? "FILE FOUND" : "MISSING"}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-3 border border-sand-200 dark:border-navy-600 p-3 text-[10px] text-navy-500 dark:text-navy-300">
                <p>SHA receipt: <strong>{photoReceiptCurrent ? "CURRENT" : "MISSING / STALE"}</strong> — {gate.photos.intakeReceiptVerifiedCount}/{gate.photos.intakeReceiptExpectedCount} target verified</p>
                <code className="mt-1 block break-all text-navy-400">motion-studio/{gate.photos.intakeReceiptPath}</code>
              </div>
              <div className="mt-4">
                <OpeningProductionHandoffExportButton />
              </div>
            </div>

            <div>
              <p className="text-[10px] tracking-[0.18em] font-semibold text-navy-400">DO THIS NOW</p>
              <ol className="mt-3 space-y-2 text-xs leading-5 text-navy-600 dark:text-navy-300">
                <li><span className="font-mono text-navy-400 mr-2">1</span>実写真11枠をcanonical名で揃える</li>
                <li><span className="font-mono text-navy-400 mr-2">2</span>CANONICAL INTAKE CLIをDRY RUN → <code className="text-[10px]">--apply</code> でsource非破壊copy + SHA receipt</li>
                <li><span className="font-mono text-navy-400 mr-2">3</span>receipt verifierで11 targetの現在bytes/SHAを確認</li>
                <li><span className="font-mono text-navy-400 mr-2">4</span>BGMのfile + receipt + 会場上映条件を確認</li>
                <li><span className="font-mono text-navy-400 mr-2">5</span>canonical assembly gateが通ったら60秒previewへ</li>
              </ol>
              <div className="mt-4 flex flex-wrap gap-3 text-xs">
                {!photosReady && <Link to="/opening-photo-intake" className="px-3 py-2 bg-navy-800 text-white dark:bg-sand-100 dark:text-navy-900">写真11枚を選ぶ →</Link>}
                {!bgmReady && <Link to="/opening-bgm-intake" className="px-3 py-2 bg-navy-800 text-white dark:bg-sand-100 dark:text-navy-900">BGM Gateを進める →</Link>}
                <OpeningProductionHandoffExportButton compact />
                <Link to="/movie-coach/compare" className="border-b border-navy-300 text-navy-600 dark:text-navy-300 self-center">Preview後のA/B判断 →</Link>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
