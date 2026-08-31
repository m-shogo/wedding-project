import {useMemo, useState} from "react";
import {openingCropReviewGate} from "../data/openingCropReviewGate.generated";
import {formatOpeningReviewTimecode, openingReviewRangeFor} from "../data/openingCropReviewTimecodes";
import {useVisualQaPlayback} from "../hooks/useVisualQaPlayback";
import {downloadText} from "../lib/exporters";

type ReviewState = "NOT_RUN" | "PASS" | "FAIL";
type Focus = {x: number; y: number} | null;
type OpeningCropSlot = {
  key: string | null; file: string | null; mediaSha256: string | null; focus: Focus; fit: string | null;
  focusSource: string | null; fitSource: string | null; cropQaRequired: boolean; presentationRevision: string | null;
  review: ReviewState; reviewer: string | null; reviewedAt: string | null; notes: string;
};
type OpeningCropAudit = {
  evidencePath: string; evidenceExists: boolean; evidenceSha256: string | null; parseState: string; boundAt: string | null;
  bindingFingerprintSha256: string | null; slots: OpeningCropSlot[]; overall: ReviewState;
  macStudioActual: "NOT_RUN"; macDaVinciActual: "NOT_RUN"; productionReady: false;
};
const cloneSlots = (slots: OpeningCropSlot[]) => slots.map((slot) => ({...slot, focus: slot.focus ? {...slot.focus} : null}));

export function OpeningCropReviewOperatorCard() {
  const audit = openingCropReviewGate.audit as unknown as OpeningCropAudit;
  const auditReady = audit.evidenceExists && audit.parseState === "PARSED" && audit.slots.length === 11 && Boolean(audit.boundAt) && Boolean(audit.bindingFingerprintSha256);
  const [slots, setSlots] = useState<OpeningCropSlot[]>(() => cloneSlots(audit.slots));
  const [reviewer, setReviewer] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(() => {
    const firstRequired = audit.slots.findIndex((slot) => slot.cropQaRequired && slot.review === "NOT_RUN");
    return firstRequired >= 0 ? firstRequired : 0;
  });
  const playback = useVisualQaPlayback();

  const requiredSlots = useMemo(() => slots.filter((slot) => slot.cropQaRequired), [slots]);
  const reviewedRequiredCount = useMemo(() => requiredSlots.filter((slot) => slot.review !== "NOT_RUN").length, [requiredSlots]);
  const passedRequiredCount = useMemo(() => requiredSlots.filter((slot) => slot.review === "PASS").length, [requiredSlots]);
  const firstIncompleteIndex = slots.findIndex((slot) => slot.cropQaRequired && slot.review === "NOT_RUN");
  const allRequiredReviewed = auditReady && requiredSlots.length > 0 && reviewedRequiredCount === requiredSlots.length;
  const allRequiredPass = allRequiredReviewed && passedRequiredCount === requiredSlots.length;
  const canExport = allRequiredReviewed && reviewer.trim().length > 0;

  function focusSlot(index: number, play = true) {
    setFocusedIndex(index);
    if (play) playback.playRange(openingReviewRangeFor(slots[index]?.key ?? null));
  }
  function setReview(index: number, review: ReviewState) {
    setSlots((current) => current.map((slot, slotIndex) => slotIndex === index ? {...slot, review} : slot));
    if (review !== "NOT_RUN") {
      const next = slots.findIndex((slot, slotIndex) => slotIndex > index && slot.cropQaRequired && slot.review === "NOT_RUN");
      if (next >= 0) focusSlot(next);
    }
  }
  function setNotes(index: number, notes: string) { setSlots((current) => current.map((slot, slotIndex) => slotIndex === index ? {...slot, notes} : slot)); }
  function focusNextIncomplete() { if (firstIncompleteIndex >= 0) focusSlot(firstIncompleteIndex); }
  function exportEvidence() {
    if (!canExport || !audit.boundAt || !audit.bindingFingerprintSha256) return;
    const reviewedAt = new Date().toISOString();
    const evidence = {
      schemaVersion: "opening-v1-crop-review-evidence/v1", authority: "HUMAN_OPENING_CROP_REVIEW", boundAt: audit.boundAt,
      bindingFingerprintSha256: audit.bindingFingerprintSha256,
      slots: slots.map((slot) => slot.cropQaRequired && slot.review !== "NOT_RUN" ? {...slot, reviewer: reviewer.trim(), reviewedAt} : slot),
      overall: allRequiredPass ? "PASS" : "FAIL", macStudioActual: "NOT_RUN", macDaVinciActual: "NOT_RUN", productionReady: false,
    } as const;
    downloadText(`${JSON.stringify(evidence, null, 2)}\n`, "opening-v1-crop-review-evidence.json");
  }

  if (!auditReady) return (
    <section className="mt-3 border-2 border-cyan-200 p-3 dark:border-cyan-900" data-opening-crop-review-operator="BLOCKED_INIT">
      <p className="text-[8px] font-semibold tracking-[0.14em] text-cyan-700 dark:text-cyan-300">OPENING CROP / FOCUS QA OPERATOR</p>
      <p className="mt-1 text-[11px] font-semibold text-navy-800 dark:text-sand-100">11写真のSHA-bound crop review templateがまだありません</p>
      <p className="mt-1 text-[8px] leading-4 text-navy-500 dark:text-navy-300">Opening実写真をcanonical intakeした後、現在のmedia SHA + effective fit/focusへbindingしたHuman review templateを先に初期化してください。</p>
      <code className="mt-2 block max-w-full overflow-x-auto whitespace-nowrap text-[7px]">node --no-warnings scripts/opening-v1-crop-review-evidence.mts --init</code>
      <code className="block max-w-full overflow-x-auto whitespace-nowrap text-[7px]">node --no-warnings scripts/opening-v1-crop-review-evidence.mts --strict</code>
      <p className="mt-2 border-l-2 border-amber-300 pl-2 text-[7px] leading-3 text-amber-800 dark:text-amber-200">template未生成では入力/exportを有効化しません。Mac Studio Actual = NOT_RUN / Mac DaVinci GUI Actual = NOT_RUN / productionReady = false。</p>
    </section>
  );

  const focused = slots[Math.min(focusedIndex, Math.max(slots.length - 1, 0))];
  const focusedRange = openingReviewRangeFor(focused?.key ?? null);

  return (
    <section className="mt-3 border-2 border-cyan-300 p-3 dark:border-cyan-800" data-opening-crop-review-operator="READY">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div><p className="text-[8px] font-semibold tracking-[0.14em] text-cyan-700 dark:text-cyan-300">OPENING CROP / FOCUS QA OPERATOR</p><p className="mt-1 text-[11px] font-semibold text-navy-800 dark:text-sand-100">crop-required {reviewedRequiredCount}/{requiredSlots.length} reviewed / {passedRequiredCount}/{requiredSlots.length} PASS</p><p className="mt-1 text-[7px] text-navy-400">binding={audit.bindingFingerprintSha256?.slice(0, 12)}… / evidence={audit.evidenceSha256?.slice(0, 12)}…</p></div>
        <button type="button" onClick={focusNextIncomplete} disabled={firstIncompleteIndex < 0} className="border border-cyan-300 px-2 py-1 text-[8px] font-semibold disabled:opacity-40 dark:border-cyan-800">次の未review写真へ</button>
      </div>

      <div className="mt-3 border-2 border-sky-200 p-3 dark:border-sky-900" data-opening-review-timecode-bridge={playback.objectUrl ? "LOADED" : "WAITING_LOCAL_PREVIEW"}>
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div><p className="text-[8px] font-semibold tracking-[0.14em] text-sky-700 dark:text-sky-300">OPENING VISUAL QA TIMECODE BRIDGE</p><p className="mt-1 text-[9px] font-semibold">対象写真を0.5秒pre-rollで再生し、終端で自動{playback.loopRange ? "ループ" : "停止"}</p><p className="mt-1 text-[7px] text-navy-400">memory cuts = canonical 30fps frame-rounded 29% / 59% · OpeningV1 = exactly 60s</p></div>
          <div className="flex flex-wrap gap-1"><button type="button" onClick={() => playback.setLoopRange(!playback.loopRange)} className="border border-sky-300 px-2 py-1 text-[8px] font-semibold dark:border-sky-800" data-visual-qa-loop={String(playback.loopRange)}>区間LOOP {playback.loopRange ? "ON" : "OFF"}</button><label className="cursor-pointer border border-sky-300 px-2 py-1 text-[8px] font-semibold dark:border-sky-800">OpeningV1 MP4を選ぶ<input type="file" accept="video/*" className="hidden" onChange={(event) => playback.loadFile(event.target.files?.[0] ?? null)} /></label></div>
        </div>
        {playback.objectUrl ? <div className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,1fr)_240px]"><video ref={playback.videoRef} src={playback.objectUrl} onTimeUpdate={playback.handleTimeUpdate} controls preload="metadata" className="w-full border border-sky-200 bg-black dark:border-sky-900" data-opening-review-preview-player="LOCAL_FILE" /><div className="text-[7px] leading-4"><p><span className="font-semibold">local file:</span> {playback.filename}</p><p><span className="font-semibold">crop authority:</span> <code>{audit.evidencePath}</code></p><p><span className="font-semibold">segment:</span> {playback.activeRange ? `${formatOpeningReviewTimecode(playback.activeRange.startSec)}–${formatOpeningReviewTimecode(playback.activeRange.endSec)}` : "FULL / NONE"}</p><p className="mt-2 border-l-2 border-amber-300 pl-2 text-amber-800 dark:text-amber-200">区間loopは視覚確認だけ。crop currentnessは既存strict verifierがauthorityで、再生操作はPASS/Actualになりません。</p></div></div> : <p className="mt-2 text-[7px] leading-4 text-navy-500 dark:text-navy-300">current OpeningV1 render/previewを選ぶとplayerが有効になります。</p>}
      </div>

      {focused ? <div className="mt-3 border border-cyan-200 p-3 dark:border-cyan-900" data-opening-crop-focused-slot={focused.key ?? "INVALID"}><div className="flex flex-wrap items-start justify-between gap-2"><div><p className="text-[10px] font-semibold">{focused.key}</p><p className="mt-1 text-[7px] text-navy-400">{focused.file} / sha={focused.mediaSha256?.slice(0, 12)}…</p><p className="mt-1 text-[7px] text-navy-400">fit={focused.fit} ({focused.fitSource}) / focus={focused.focus ? `${focused.focus.x},${focused.focus.y}` : "none"} ({focused.focusSource})</p><p className="mt-1 text-[7px] text-navy-400">presentationRevision={focused.presentationRevision?.slice(0, 12)}… / cropQaRequired={String(focused.cropQaRequired)}</p>{focusedRange ? <p className="mt-1 font-mono text-[7px] text-sky-700 dark:text-sky-300">scene={focusedRange.sceneId} · {formatOpeningReviewTimecode(focusedRange.startSec)} → {formatOpeningReviewTimecode(focusedRange.endSec)} · seek={formatOpeningReviewTimecode(focusedRange.seekSec)}</p> : null}</div><div className="flex flex-wrap gap-1"><button type="button" onClick={() => playback.playRange(focusedRange)} disabled={!playback.objectUrl || !focusedRange} className="border border-sky-300 px-2 py-1 text-[8px] font-semibold disabled:opacity-40 dark:border-sky-800">映像でcrop確認</button>{focused.cropQaRequired ? (["PASS", "FAIL"] as const).map((state) => <button key={state} type="button" onClick={() => setReview(focusedIndex, state)} className={`border px-2 py-1 text-[8px] ${focused.review === state ? "border-cyan-500 font-bold" : "border-sand-200 dark:border-navy-700"}`}>{state}</button>) : <span className="border border-emerald-300 px-2 py-1 text-[7px] text-emerald-700 dark:border-emerald-800 dark:text-emerald-300">CONTAIN / CROP QA NOT REQUIRED</span>}</div></div><label className="mt-3 block text-[7px] font-semibold">Notes<textarea value={focused.notes} onChange={(event) => setNotes(focusedIndex, event.target.value)} className="mt-1 block min-h-16 w-full border border-sand-300 bg-transparent p-2 text-[8px] dark:border-navy-600" placeholder="顔切れ、視線、余白、タイトルsafeとの干渉など" /></label></div> : null}

      <div className="mt-3 grid gap-1 sm:grid-cols-2 xl:grid-cols-3">{slots.map((slot, index) => { const range = openingReviewRangeFor(slot.key); return <button key={slot.key ?? index} type="button" onClick={() => focusSlot(index)} className={`border p-2 text-left text-[7px] ${index === focusedIndex ? "border-cyan-500" : "border-sand-200 dark:border-navy-700"}`} data-opening-crop-review-slot={slot.key ?? "INVALID"}><div className="flex items-center justify-between gap-2"><span className="font-semibold">{index + 1}. {slot.key}</span><span className="font-mono">{slot.cropQaRequired ? slot.review : "AUTO PASS"}</span></div><p className="mt-1 opacity-60">{slot.fit} / focus {slot.focus ? `${slot.focus.x},${slot.focus.y}` : "none"}</p>{range ? <p className="mt-1 font-mono text-sky-700 dark:text-sky-300">{formatOpeningReviewTimecode(range.startSec)}–{formatOpeningReviewTimecode(range.endSec)}</p> : null}</button>; })}</div>

      <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_auto] sm:items-end"><label className="text-[7px] font-semibold">Reviewer<input value={reviewer} onChange={(event) => setReviewer(event.target.value)} className="mt-1 block w-full border border-sand-300 bg-transparent p-2 text-[8px] dark:border-navy-600" placeholder="Human reviewer name" /></label><button type="button" onClick={exportEvidence} disabled={!canExport} className="border border-cyan-400 px-3 py-2 text-[8px] font-semibold text-cyan-700 disabled:opacity-40 dark:border-cyan-700 dark:text-cyan-300">Crop review evidence JSONを書き出す</button></div>
      <p className="mt-2 text-[7px] leading-4 text-navy-500 dark:text-navy-300">downloadした <code>opening-v1-crop-review-evidence.json</code> を <code>motion-studio/out/qa/opening-v1-crop-review-evidence.json</code> に置き、<code>node --no-warnings scripts/opening-v1-crop-review-evidence.mts --strict</code> で再検証してください。</p>
      <p className="mt-3 border-l-2 border-amber-300 pl-2 text-[7px] leading-3 text-amber-800 dark:text-amber-200">区間loopを含むplayer操作はブラウザsession内だけ。PASS/FAILはHuman明示入力だけ。Mac Studio Actual=NOT_RUN / Mac DaVinci GUI Actual=NOT_RUN / productionReady=false。</p>
    </section>
  );
}
