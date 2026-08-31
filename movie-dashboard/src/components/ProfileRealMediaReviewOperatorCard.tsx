import {useMemo, useState} from "react";
import {profileRealMediaReviewGate} from "../data/profileRealMediaReviewGate.generated";
import {buildProfileRealMediaTimecodes, formatProfileReviewTimecode} from "../data/profileRealMediaTimecodes";
import {useVisualQaPlayback} from "../hooks/useVisualQaPlayback";
import {downloadText} from "../lib/exporters";

type QaState = "NOT_RUN" | "PASS" | "FAIL";
type MediaAxis = "crop" | "focus" | "color" | "emotionalFit" | "contentAccuracy";
type ChapterAxis = "visualFlow" | "readability" | "mediaRoleFit";
type MediaAudit = {slot: string | null; chapterId: string | null; label: string | null; file: string | null; extension: string | null; sha256: string | null; qa: Record<MediaAxis, QaState>};
type ChapterAudit = {chapterId: string | null; title: string | null; visualFlow: QaState; readability: QaState; mediaRoleFit: QaState};
type ReviewAudit = {
  evidencePath: string; evidenceExists: boolean; evidenceSha256: string | null; parseState: string; boundAt: string | null;
  preview: {path: string | null; sha256: string | null} | null;
  previewSourceFingerprintSha256: string | null; previewSources: Array<{path: string | null; sha256: string | null}>;
  runtimeManifestSha256: string | null; productionPlanSha256: string | null; previewComponentSha256: string | null; canonicalPlanFingerprint: string | null;
  media: MediaAudit[]; chapters: ChapterAudit[]; review: {overall: QaState; reviewer: string | null; reviewedAt: string | null; notes: string};
};

const MEDIA_AXES: Array<{key: MediaAxis; label: string}> = [
  {key: "crop", label: "CROP"}, {key: "focus", label: "FOCUS"}, {key: "color", label: "COLOR"},
  {key: "emotionalFit", label: "EMOTION"}, {key: "contentAccuracy", label: "CONTENT"},
];
const CHAPTER_AXES: Array<{key: ChapterAxis; label: string}> = [
  {key: "visualFlow", label: "FLOW"}, {key: "readability", label: "READABILITY"}, {key: "mediaRoleFit", label: "ROLE FIT"},
];
const cloneMedia = (media: MediaAudit[]) => media.map((item) => ({...item, qa: {...item.qa}}));
const cloneChapters = (chapters: ChapterAudit[]) => chapters.map((item) => ({...item}));
const allMediaAxesReviewed = (media: MediaAudit) => MEDIA_AXES.every(({key}) => media.qa[key] !== "NOT_RUN");
const allMediaAxesPass = (media: MediaAudit) => MEDIA_AXES.every(({key}) => media.qa[key] === "PASS");
const allChapterAxesReviewed = (chapter: ChapterAudit) => CHAPTER_AXES.every(({key}) => chapter[key] !== "NOT_RUN");
const allChapterAxesPass = (chapter: ChapterAudit) => CHAPTER_AXES.every(({key}) => chapter[key] === "PASS");

export function ProfileRealMediaReviewOperatorCard() {
  const audit = profileRealMediaReviewGate.audit as unknown as ReviewAudit;
  const auditReady = audit.evidenceExists && audit.parseState === "PARSED" && audit.media.length === 17 && audit.chapters.length === 5
    && Boolean(audit.boundAt) && Boolean(audit.preview?.path) && Boolean(audit.preview?.sha256) && Boolean(audit.previewSourceFingerprintSha256)
    && Boolean(audit.runtimeManifestSha256) && Boolean(audit.productionPlanSha256) && Boolean(audit.previewComponentSha256) && Boolean(audit.canonicalPlanFingerprint);
  const [mediaDraft, setMediaDraft] = useState<MediaAudit[]>(() => cloneMedia(audit.media));
  const [chapterDraft, setChapterDraft] = useState<ChapterAudit[]>(() => cloneChapters(audit.chapters));
  const [reviewer, setReviewer] = useState(audit.review.reviewer ?? "");
  const [notes, setNotes] = useState(audit.review.notes ?? "");
  const [focusedMediaIndex, setFocusedMediaIndex] = useState(0);
  const playback = useVisualQaPlayback();

  const mediaReviewed = useMemo(() => mediaDraft.filter(allMediaAxesReviewed).length, [mediaDraft]);
  const mediaPassed = useMemo(() => mediaDraft.filter(allMediaAxesPass).length, [mediaDraft]);
  const chaptersReviewed = useMemo(() => chapterDraft.filter(allChapterAxesReviewed).length, [chapterDraft]);
  const chaptersPassed = useMemo(() => chapterDraft.filter(allChapterAxesPass).length, [chapterDraft]);
  const timecodes = useMemo(() => buildProfileRealMediaTimecodes(mediaDraft, chapterDraft), [mediaDraft, chapterDraft]);
  const firstIncompleteMediaIndex = mediaDraft.findIndex((item) => !allMediaAxesReviewed(item));
  const allHumanAxesReviewed = auditReady && mediaReviewed === 17 && chaptersReviewed === 5;
  const allHumanAxesPass = auditReady && mediaPassed === 17 && chaptersPassed === 5;
  const canExport = allHumanAxesReviewed && reviewer.trim().length > 0;

  function setMediaQa(index: number, axis: MediaAxis, state: QaState) {
    setMediaDraft((current) => current.map((item, itemIndex) => itemIndex === index ? {...item, qa: {...item.qa, [axis]: state}} : item));
  }
  function setChapterQa(index: number, axis: ChapterAxis, state: QaState) {
    setChapterDraft((current) => current.map((item, itemIndex) => itemIndex === index ? {...item, [axis]: state} : item));
  }
  function focusMedia(index: number, play = true) {
    setFocusedMediaIndex(index);
    if (!play) return;
    const slot = mediaDraft[index]?.slot;
    const range = slot ? timecodes.mediaRanges.find((item) => item.slot === slot) : undefined;
    playback.playRange(range);
  }
  function markMediaPass(index: number) {
    setMediaDraft((current) => current.map((item, itemIndex) => itemIndex === index
      ? {...item, qa: {crop: "PASS", focus: "PASS", color: "PASS", emotionalFit: "PASS", contentAccuracy: "PASS"}} : item));
    const next = mediaDraft.findIndex((item, itemIndex) => itemIndex > index && !allMediaAxesReviewed(item));
    if (next >= 0) focusMedia(next);
  }
  function focusNextIncomplete() { if (firstIncompleteMediaIndex >= 0) focusMedia(firstIncompleteMediaIndex); }
  function exportEvidence() {
    if (!canExport || !audit.preview || !audit.boundAt) return;
    const evidence = {
      schemaVersion: "profile-v1-real-media-review/v1", authority: "HUMAN_REAL_MEDIA_PREVIEW_REVIEW", boundAt: audit.boundAt,
      preview: audit.preview, previewSourceFingerprintSha256: audit.previewSourceFingerprintSha256, previewSources: audit.previewSources,
      runtimeManifestSha256: audit.runtimeManifestSha256, productionPlanSha256: audit.productionPlanSha256,
      previewComponentSha256: audit.previewComponentSha256, canonicalPlanFingerprint: audit.canonicalPlanFingerprint,
      media: mediaDraft, chapters: chapterDraft,
      review: {overall: allHumanAxesPass ? "PASS" : "FAIL", reviewer: reviewer.trim(), reviewedAt: new Date().toISOString(), notes},
      bgmReviewed: false, macDaVinciActual: "NOT_RUN", productionReady: false,
    } as const;
    downloadText(`${JSON.stringify(evidence, null, 2)}\n`, "profile-v1-real-media-review.json");
  }

  if (!auditReady) return (
    <section className="mt-3 border-2 border-fuchsia-200 p-3 dark:border-fuchsia-900" data-profile-real-media-review-operator="BLOCKED_INIT">
      <p className="text-[8px] font-semibold tracking-[0.14em] text-fuchsia-700 dark:text-fuchsia-300">PROFILE REAL-MEDIA VISUAL QA OPERATOR</p>
      <p className="mt-1 text-[11px] font-semibold text-navy-800 dark:text-sand-100">Human review templateがまだcurrentではありません</p>
      <p className="mt-1 text-[8px] leading-4 text-navy-500 dark:text-navy-300">17素材をintakeした後、fresh preview renderとSHA-bound review template initを先に実行してください。</p>
      <code className="mt-2 block max-w-full overflow-x-auto whitespace-nowrap text-[7px]">pnpm profile:real-media-review:init</code>
      <code className="block max-w-full overflow-x-auto whitespace-nowrap text-[7px]">pnpm profile:real-media-review:strict</code>
      <p className="mt-2 border-l-2 border-amber-300 pl-2 text-[7px] leading-3 text-amber-800 dark:text-amber-200">DashboardはHuman evidenceを捏造しません。Mac DaVinci GUI Actual = NOT_RUN / productionReady = false。</p>
    </section>
  );

  const focused = mediaDraft[Math.min(focusedMediaIndex, Math.max(mediaDraft.length - 1, 0))];
  const focusedRange = focused?.slot ? timecodes.mediaRanges.find((item) => item.slot === focused.slot) : undefined;

  return (
    <section className="mt-3 border-2 border-fuchsia-300 p-3 dark:border-fuchsia-800" data-profile-real-media-review-operator="READY">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-[8px] font-semibold tracking-[0.14em] text-fuchsia-700 dark:text-fuchsia-300">PROFILE REAL-MEDIA VISUAL QA OPERATOR</p>
          <p className="mt-1 text-[11px] font-semibold text-navy-800 dark:text-sand-100">17素材 {mediaReviewed}/17 reviewed / {mediaPassed}/17 PASS ・ 5章 {chaptersReviewed}/5 reviewed</p>
          <p className="mt-1 text-[7px] text-navy-400">boundAt={audit.boundAt} / evidence={audit.evidenceSha256?.slice(0, 12)}…</p>
        </div>
        <button type="button" onClick={focusNextIncomplete} disabled={firstIncompleteMediaIndex < 0} className="border border-fuchsia-300 px-2 py-1 text-[8px] font-semibold disabled:opacity-40 dark:border-fuchsia-800">次の未review素材へ</button>
      </div>

      <div className="mt-3 border-2 border-cyan-200 p-3 dark:border-cyan-900" data-profile-review-timecode-bridge={playback.objectUrl ? "LOADED" : "WAITING_LOCAL_PREVIEW"}>
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <p className="text-[8px] font-semibold tracking-[0.14em] text-cyan-700 dark:text-cyan-300">VISUAL QA TIMECODE BRIDGE</p>
            <p className="mt-1 text-[9px] font-semibold">対象区間を0.5秒pre-rollで再生し、終端で自動{playback.loopRange ? "ループ" : "停止"}</p>
            <p className="mt-1 text-[7px] text-navy-400">authority: ProfileV1RealMediaPreview = 5 chapters × 6s / chapter slots evenly divided</p>
          </div>
          <div className="flex flex-wrap gap-1">
            <button type="button" onClick={() => playback.setLoopRange(!playback.loopRange)} className="border border-cyan-300 px-2 py-1 text-[8px] font-semibold dark:border-cyan-800" data-visual-qa-loop={String(playback.loopRange)}>区間LOOP {playback.loopRange ? "ON" : "OFF"}</button>
            <label className="cursor-pointer border border-cyan-300 px-2 py-1 text-[8px] font-semibold dark:border-cyan-800">preview MP4を選ぶ<input type="file" accept="video/*" className="hidden" onChange={(event) => playback.loadFile(event.target.files?.[0] ?? null)} /></label>
          </div>
        </div>
        {playback.objectUrl ? (
          <div className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,1fr)_240px]">
            <video ref={playback.videoRef} src={playback.objectUrl} onTimeUpdate={playback.handleTimeUpdate} controls preload="metadata" className="w-full border border-cyan-200 bg-black dark:border-cyan-900" data-profile-review-preview-player="LOCAL_FILE" />
            <div className="text-[7px] leading-4">
              <p><span className="font-semibold">local file:</span> {playback.filename}</p>
              <p><span className="font-semibold">canonical evidence path:</span> <code>{audit.preview?.path}</code></p>
              <p><span className="font-semibold">canonical SHA:</span> <code>{audit.preview?.sha256?.slice(0, 16)}…</code></p>
              <p><span className="font-semibold">segment:</span> {playback.activeRange ? `${formatProfileReviewTimecode(playback.activeRange.startSec)}–${formatProfileReviewTimecode(playback.activeRange.endSec)}` : "FULL / NONE"}</p>
              <p className="mt-2 border-l-2 border-amber-300 pl-2 text-amber-800 dark:text-amber-200">local fileと区間loopはnavigationだけ。strict verifierがcanonical SHA authorityで、再生操作だけではHuman PASS/evidenceになりません。</p>
            </div>
          </div>
        ) : <p className="mt-2 text-[7px] leading-4 text-navy-500 dark:text-navy-300"><code>{audit.preview?.path}</code> をローカルから選ぶとplayerが有効になります。</p>}
      </div>

      {focused ? (
        <div className="mt-3 border border-fuchsia-200 p-3 dark:border-fuchsia-900" data-profile-review-focused-slot={focused.slot ?? "INVALID"}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-[10px] font-semibold">{focused.label} <span className="font-mono text-[7px] opacity-60">{focused.slot}</span></p>
              <p className="mt-1 text-[7px] text-navy-400">{focused.file} / chapter={focused.chapterId} / sha={focused.sha256?.slice(0, 12)}…</p>
              {focusedRange ? <p className="mt-1 font-mono text-[7px] text-cyan-700 dark:text-cyan-300">preview {formatProfileReviewTimecode(focusedRange.startSec)} → {formatProfileReviewTimecode(focusedRange.endSec)} / seek={formatProfileReviewTimecode(focusedRange.seekSec)}</p> : null}
            </div>
            <div className="flex flex-wrap gap-1">
              <button type="button" onClick={() => playback.playRange(focusedRange)} disabled={!playback.objectUrl || !focusedRange} className="border border-cyan-300 px-2 py-1 text-[8px] font-semibold disabled:opacity-40 dark:border-cyan-800">映像で確認</button>
              <button type="button" onClick={() => markMediaPass(focusedMediaIndex)} className="border border-emerald-300 px-2 py-1 text-[8px] font-semibold text-emerald-700 dark:border-emerald-800 dark:text-emerald-300">5項目すべてPASS</button>
            </div>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-5">
            {MEDIA_AXES.map(({key, label}) => <div key={key} className="border border-sand-200 p-2 dark:border-navy-700"><p className="text-[7px] font-semibold">{label}</p><div className="mt-1 flex gap-1">{(["PASS", "FAIL"] as const).map((state) => <button key={state} type="button" onClick={() => setMediaQa(focusedMediaIndex, key, state)} className={`border px-1.5 py-1 text-[7px] ${focused.qa[key] === state ? "border-fuchsia-500 font-bold" : "border-sand-200 dark:border-navy-700"}`}>{state}</button>)}</div></div>)}
          </div>
        </div>
      ) : null}

      <details className="mt-3"><summary className="cursor-pointer text-[8px] font-semibold text-fuchsia-700 dark:text-fuchsia-300">17素材一覧を開く</summary><div className="mt-2 grid gap-1 sm:grid-cols-2 xl:grid-cols-3">{mediaDraft.map((item, index) => { const range = item.slot ? timecodes.mediaRanges.find((candidate) => candidate.slot === item.slot) : undefined; return <button key={item.slot ?? index} type="button" onClick={() => focusMedia(index)} className={`border p-2 text-left text-[7px] ${index === focusedMediaIndex ? "border-fuchsia-500" : "border-sand-200 dark:border-navy-700"}`} data-profile-review-slot={item.slot ?? "INVALID"}><span className="font-semibold">{index + 1}. {item.label}</span><span className="ml-2 font-mono">{allMediaAxesPass(item) ? "PASS" : allMediaAxesReviewed(item) ? "FAIL" : "NOT_RUN"}</span>{range ? <span className="mt-1 block font-mono text-cyan-700 dark:text-cyan-300">{formatProfileReviewTimecode(range.startSec)}–{formatProfileReviewTimecode(range.endSec)}</span> : null}</button>; })}</div></details>

      <div className="mt-3 border-t border-fuchsia-200 pt-3 dark:border-fuchsia-900">
        <p className="text-[8px] font-semibold text-fuchsia-700 dark:text-fuchsia-300">CHAPTER QA / visualFlow ・ readability ・ mediaRoleFit</p>
        <div className="mt-2 space-y-2">{chapterDraft.map((chapter, index) => { const range = chapter.chapterId ? timecodes.chapterRanges.find((candidate) => candidate.chapterId === chapter.chapterId) : undefined; return <div key={chapter.chapterId ?? index} className="border border-sand-200 p-2 dark:border-navy-700"><div className="flex flex-wrap items-center justify-between gap-2"><p className="text-[8px] font-semibold">{chapter.title} <span className="font-mono opacity-50">{chapter.chapterId}</span>{range ? <span className="ml-2 font-mono text-cyan-700 dark:text-cyan-300">{formatProfileReviewTimecode(range.startSec)}–{formatProfileReviewTimecode(range.endSec)}</span> : null}</p><button type="button" onClick={() => playback.playRange(range)} disabled={!playback.objectUrl || !range} className="border border-cyan-300 px-2 py-1 text-[7px] font-semibold disabled:opacity-40 dark:border-cyan-800">章を区間再生</button></div><div className="mt-2 flex flex-wrap gap-2">{CHAPTER_AXES.map(({key, label}) => <div key={key} className="flex items-center gap-1 text-[7px]"><span>{label}</span>{(["PASS", "FAIL"] as const).map((state) => <button key={state} type="button" onClick={() => setChapterQa(index, key, state)} className={`border px-1.5 py-1 ${chapter[key] === state ? "border-fuchsia-500 font-bold" : "border-sand-200 dark:border-navy-700"}`}>{state}</button>)}</div>)}</div></div>; })}</div>
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2"><label className="text-[7px] font-semibold">Reviewer<input value={reviewer} onChange={(event) => setReviewer(event.target.value)} className="mt-1 block w-full border border-sand-300 bg-transparent p-2 text-[8px] dark:border-navy-600" placeholder="Human reviewer name" /></label><label className="text-[7px] font-semibold">Notes<textarea value={notes} onChange={(event) => setNotes(event.target.value)} className="mt-1 block min-h-16 w-full border border-sand-300 bg-transparent p-2 text-[8px] dark:border-navy-600" placeholder="見た内容・修正点" /></label></div>
      <div className="mt-3 border-t border-fuchsia-200 pt-3 dark:border-fuchsia-900"><div className="flex flex-wrap items-center gap-2"><button type="button" onClick={exportEvidence} disabled={!canExport} className="border border-fuchsia-400 px-3 py-1.5 text-[8px] font-semibold text-fuchsia-700 disabled:opacity-40 dark:border-fuchsia-700 dark:text-fuchsia-300">Human review evidence JSONを書き出す</button><span className="font-mono text-[7px]">overall={allHumanAxesReviewed ? (allHumanAxesPass ? "PASS" : "FAIL") : "NOT_RUN"}</span></div><p className="mt-2 text-[7px] leading-4 text-navy-500 dark:text-navy-300">downloadした <code>profile-v1-real-media-review.json</code> を <code>motion-studio/out/qa/profile-v1-real-media-review.json</code> に置き、<code>pnpm profile:real-media-review:strict</code> で再検証してください。</p></div>
      <p className="mt-3 border-l-2 border-amber-300 pl-2 text-[7px] leading-3 text-amber-800 dark:text-amber-200">区間loopを含むplayer操作はブラウザsession内だけ。BGM review=false / Remotion Studio GUI Actual=NOT_RUN / Mac DaVinci GUI Actual=NOT_RUN / productionReady=false。</p>
    </section>
  );
}
