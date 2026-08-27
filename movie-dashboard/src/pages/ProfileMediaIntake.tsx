import {Link} from "react-router-dom";
import {Header} from "../components/Header";
import {LocalMediaIntakeValidator} from "../components/LocalMediaIntakeValidator";
import {ProductionMediaIntakeCliGuide} from "../components/ProductionMediaIntakeCliGuide";
import {ProfileProductionHandoffExportButton} from "../components/ProfileProductionHandoffExportButton";
import {profileProductionGate} from "../data/profileProductionGate.generated";

const kindLabel: Record<string, string> = {
  photo: "PHOTO",
  "photo-or-video": "PHOTO / VIDEO",
};

export function ProfileMediaIntake() {
  const gate = profileProductionGate;
  const mediaReady = gate.media.ready;
  const mediaFilesReady = gate.media.fileReady;
  const receiptCurrent = gate.media.intakeReceiptCurrent;
  const bgmReady = gate.bgm.ready;
  const assemblyReady = gate.blockingGatePass;
  const localValidationSlots = gate.mediaSlots.map((slot) => ({
    id: slot.id,
    canonicalStem: slot.canonicalStem,
    label: slot.label,
    kind: slot.kind,
  }));

  return (
    <div>
      <Header
        title="PROFILE MEDIA INTAKE"
        description="Profile V1の5章・17実素材とBGMをcanonical名+SHA receiptで揃え、real-media previewへ進むための本番素材Gate"
      />

      <section className={`mb-7 border-2 ${assemblyReady ? "border-emerald-300 dark:border-emerald-800" : "border-amber-300 dark:border-amber-800"}`}>
        <div className="p-4 md:p-5 border-b border-sand-200 dark:border-navy-600 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[10px] tracking-[0.18em] font-semibold text-navy-400">PROFILE V1 / REAL MEDIA GATE</p>
            <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">
              {assemblyReady ? "実素材Gateクリア — previewへ" : "17素材の実ファイル + SHA receipt + BGMを揃える"}
            </h2>
            <p className="mt-2 text-sm text-navy-600 dark:text-navy-300">
              素材 {gate.resolvedMediaCount}/{gate.expectedMediaCount} / media receipt {receiptCurrent ? "CURRENT" : "MISSING / STALE"} / BGM {bgmReady ? "READY" : gate.bgm.rightsState}
            </p>
          </div>
          <span className={`px-2.5 py-1 text-[10px] font-mono font-bold ${assemblyReady ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"}`}>
            {assemblyReady ? "ASSEMBLY READY" : "ASSEMBLY BLOCKED"}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-px bg-sand-200 dark:bg-navy-600">
          <div className={`p-4 ${mediaFilesReady ? "bg-emerald-50 dark:bg-emerald-900/20" : "bg-white dark:bg-navy-800"}`}>
            <p className="text-[10px] tracking-[0.16em] font-semibold text-navy-400">REAL MEDIA FILES</p>
            <p className="mt-1 text-2xl font-mono font-bold text-navy-900 dark:text-sand-100">{gate.resolvedMediaCount}/{gate.expectedMediaCount}</p>
            <p className="mt-1 text-xs text-navy-500 dark:text-navy-300">{mediaFilesReady ? "17 canonical target found" : "canonical target不足"}</p>
            <code className="mt-1 block text-[9px] text-navy-400">motion-studio/public/profile/</code>
          </div>
          <div className={`p-4 ${receiptCurrent ? "bg-emerald-50 dark:bg-emerald-900/20" : "bg-white dark:bg-navy-800"}`}>
            <p className="text-[10px] tracking-[0.16em] font-semibold text-navy-400">MEDIA SHA RECEIPT</p>
            <p className="mt-1 text-2xl font-mono font-bold text-navy-900 dark:text-sand-100">{receiptCurrent ? "CURRENT" : "BLOCKED"}</p>
            <p className="mt-1 text-xs text-navy-500 dark:text-navy-300">
              {gate.media.intakeReceiptVerifiedCount}/{gate.media.intakeReceiptExpectedCount} target SHA verified
            </p>
            <code className="mt-1 block break-all text-[9px] text-navy-400">motion-studio/{gate.media.intakeReceiptPath}</code>
          </div>
          <div className={`p-4 ${bgmReady ? "bg-emerald-50 dark:bg-emerald-900/20" : "bg-white dark:bg-navy-800"}`}>
            <p className="text-[10px] tracking-[0.16em] font-semibold text-navy-400">BGM</p>
            <p className="mt-1 text-2xl font-mono font-bold text-navy-900 dark:text-sand-100">{bgmReady ? "READY" : "BLOCKED"}</p>
            <p className="mt-1 text-xs text-navy-500 dark:text-navy-300 break-all">{gate.bgm.path}</p>
            {!bgmReady ? <Link to="/profile-bgm-intake" className="mt-2 inline-block border-b border-navy-300 text-[10px] text-navy-600 dark:text-navy-300">BGM rights gateを開く →</Link> : null}
          </div>
          <div className={`p-4 ${mediaReady && bgmReady ? "bg-emerald-50 dark:bg-emerald-900/20" : "bg-white dark:bg-navy-800"}`}>
            <p className="text-[10px] tracking-[0.16em] font-semibold text-navy-400">NEXT COMMAND</p>
            <p className="mt-1 text-sm font-mono font-bold text-navy-900 dark:text-sand-100">pnpm prepare:profile-v1</p>
            <p className="mt-1 text-xs text-navy-500 dark:text-navy-300">17 filesだけでは解除しない。current receipt + BGM後にpreview準備へ</p>
          </div>
        </div>
      </section>

      <LocalMediaIntakeValidator
        slots={localValidationSlots}
        title="17素材をコピーする前にcanonical名を一括検査"
      />

      <ProductionMediaIntakeCliGuide project="profile" />

      <section className="mb-8 border-t-2 border-violet-400 dark:border-violet-700 pt-4">
        <ProfileProductionHandoffExportButton />
      </section>

      <div className="space-y-8">
        {gate.chapters.map((chapter) => {
          const slots = gate.mediaSlots.filter((slot) => slot.chapterId === chapter.chapterId);
          return (
            <section key={chapter.chapterId} className="border-t-2 border-navy-900 dark:border-sand-100 pt-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-mono text-navy-400">CHAPTER {String(chapter.order).padStart(2, "0")}</p>
                  <h2 className="mt-1 text-lg font-bold text-navy-900 dark:text-sand-100">{chapter.title}</h2>
                  <p className="mt-1 text-sm text-navy-600 dark:text-navy-300">{chapter.role}</p>
                </div>
                <span className={`text-sm font-mono font-bold ${chapter.ready ? "text-emerald-700 dark:text-emerald-300" : "text-amber-700 dark:text-amber-300"}`}>
                  {chapter.readyCount}/{chapter.requiredCount}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2">
                {slots.map((slot) => (
                  <div key={slot.id} className={`border p-3 ${slot.ready ? "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-900/20" : "border-sand-200 bg-white dark:border-navy-600 dark:bg-navy-800"}`}>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs font-semibold text-navy-800 dark:text-sand-100">{slot.label}</p>
                        <p className="mt-1 text-[9px] font-mono text-navy-400">{kindLabel[slot.kind] ?? slot.kind}</p>
                      </div>
                      <span className={`text-[9px] font-bold ${slot.ready ? "text-emerald-700 dark:text-emerald-300" : "text-red-600 dark:text-red-300"}`}>
                        {slot.ready ? "FILE FOUND" : "MISSING"}
                      </span>
                    </div>
                    <code className="mt-3 block break-all text-[10px] text-navy-600 dark:text-navy-300">{slot.canonicalStem}</code>
                    <p className="mt-1 text-[9px] text-navy-400">{slot.file ?? "public/profile/<canonical-stem>.(jpg|png|webp|mp4|mov|webm)"}</p>
                  </div>
                ))}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {chapter.editIntent.map((intent) => (
                  <span key={intent} className="border border-sand-200 dark:border-navy-600 px-2 py-1 text-[10px] text-navy-500 dark:text-navy-300">{intent}</span>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <section className="mt-8 border-y border-sand-200 dark:border-navy-600 py-5">
        <p className="text-[10px] tracking-[0.18em] font-semibold text-navy-400">DO THIS NOW</p>
        <ol className="mt-3 space-y-2 text-sm leading-6 text-navy-600 dark:text-navy-300">
          <li><span className="font-mono text-navy-400 mr-2">1</span>17 roleに合う実写真/動画を選ぶ</li>
          <li><span className="font-mono text-navy-400 mr-2">2</span>上のLOCAL PRECHECKでcanonical filename / extension / duplicateを一括確認</li>
          <li><span className="font-mono text-navy-400 mr-2">3</span>CANONICAL INTAKE CLIをDRY RUNし、PASS後だけ <code className="text-xs">--apply</code> でsource非破壊copy + SHA receipt保存</li>
          <li><span className="font-mono text-navy-400 mr-2">4</span><code className="text-xs">verify-production-media-intake-receipt.mts --project profile</code> で17 targetのbytes/SHAがCURRENTか確認</li>
          <li><span className="font-mono text-navy-400 mr-2">5</span><Link to="/profile-bgm-intake" className="border-b border-navy-300">Profile BGM rights gate</Link> で現在のBGM SHAへHuman rights approvalを固定</li>
          <li><span className="font-mono text-navy-400 mr-2">6</span><code className="text-xs">pnpm prepare:profile-v1</code> → real-media preview → Human crop/focus/color/content QAへ</li>
        </ol>
        <div className="mt-4 flex flex-wrap gap-3 text-xs">
          <Link to="/profile-planner" className="px-3 py-2 bg-navy-800 text-white dark:bg-sand-100 dark:text-navy-900">写真計画を開く →</Link>
          <Link to="/profile-bgm-intake" className="px-3 py-2 border border-navy-700 dark:border-sand-300 text-navy-700 dark:text-sand-200">BGM Gateを開く →</Link>
          <ProfileProductionHandoffExportButton compact />
          <Link to="/movie-coach/profile" className="border-b border-navy-300 text-navy-600 dark:text-navy-300 self-center">Profile Movie Coach →</Link>
          <Link to="/movie-coach/compare" className="border-b border-navy-300 text-navy-600 dark:text-navy-300 self-center">Preview後のHuman QA →</Link>
        </div>
      </section>

      <p className="mt-5 text-[10px] text-navy-400">
        17/17 FILE FOUND != MEDIA READY。SHA receiptがCURRENTで、BGM gateも通って初めてpreview input readyです。Human QA / Mac DaVinci Actual / final approval は自動PASSしません。
      </p>
    </div>
  );
}
