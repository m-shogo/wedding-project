import {openingCropReviewGate} from "../data/openingCropReviewGate.generated";
import {formatOpeningReviewTimecode, openingReviewRangeFor} from "../data/openingCropReviewTimecodes";
import {profileRealMediaReviewGate} from "../data/profileRealMediaReviewGate.generated";
import {buildProfileRealMediaTimecodes, formatProfileReviewTimecode} from "../data/profileRealMediaTimecodes";
import type {SceneProjectId} from "../data/visualSceneComposer";

type QaState = "NOT_RUN" | "PASS" | "FAIL";
type ProfileAxis = "crop" | "focus" | "color" | "emotionalFit" | "contentAccuracy";
type OpeningSlot = {
  key: string | null;
  file: string | null;
  focus: {x: number; y: number} | null;
  fit: string | null;
  focusSource: string | null;
  fitSource: string | null;
  review: QaState;
  notes: string;
};
type ProfileMedia = {
  slot: string | null;
  chapterId: string | null;
  label: string | null;
  file: string | null;
  qa: Record<ProfileAxis, QaState>;
};
type ProfileChapter = {chapterId: string | null; title: string | null; visualFlow: QaState; readability: QaState; mediaRoleFit: QaState};

const PROFILE_AXES: ProfileAxis[] = ["crop", "focus", "color", "emotionalFit", "contentAccuracy"];

function copyText(value: string) {
  void navigator.clipboard?.writeText(value);
}

export function WeddingVisualQaCorrectionQueueCard({projectId}: {projectId: SceneProjectId}) {
  if (projectId === "opening") {
    const audit = openingCropReviewGate.audit as unknown as {evidenceExists: boolean; parseState: string; slots: OpeningSlot[]; overall: QaState};
    const failed = audit.slots.filter((slot) => slot.review === "FAIL");
    const renderCommand = "cd motion-studio && pnpm render:opening-v1:preview";
    const reviewInitCommand = "cd motion-studio && node --no-warnings scripts/opening-v1-crop-review-evidence.mts --init";

    return (
      <section className="mt-3 border-2 border-rose-300 p-3 dark:border-rose-800" data-visual-qa-correction-queue="opening" data-correction-count={failed.length}>
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <p className="text-[8px] font-semibold tracking-[0.14em] text-rose-700 dark:text-rose-300">VISUAL QA → CORRECTION → RE-RENDER / OPENING</p>
            <p className="mt-1 text-[11px] font-semibold">Correction Queue {failed.length}件</p>
            <p className="mt-1 text-[7px] text-navy-400">installed Human crop evidenceのFAILだけを抽出。修正後はfresh render + fresh review templateで再確認します。</p>
          </div>
          <span className="border border-rose-300 px-2 py-1 font-mono text-[8px] dark:border-rose-800">{audit.evidenceExists && audit.parseState === "PARSED" ? audit.overall : "NOT_READY"}</span>
        </div>

        {failed.length === 0 ? <p className="mt-3 border border-emerald-200 p-2 text-[8px] text-emerald-700 dark:border-emerald-800 dark:text-emerald-300">installed evidenceにFAILはありません。NOT_RUNはCorrection Queueへ混ぜません。</p> : (
          <div className="mt-3 grid gap-2">
            {failed.map((slot) => {
              const range = openingReviewRangeFor(slot.key);
              const source = slot.focusSource === "scene" || slot.fitSource === "scene"
                ? "motion-studio/src/data/openingV1Presentation.ts"
                : "motion-studio/src/data/openingV1PhotoPresentation.ts";
              return (
                <div key={slot.key ?? slot.file ?? "unknown"} className="border border-rose-200 p-2 text-[7px] dark:border-rose-900" data-correction-slot={slot.key ?? "INVALID"}>
                  <div className="flex flex-wrap items-center justify-between gap-2"><p className="text-[9px] font-semibold">{slot.key}</p><span className="font-mono text-rose-700 dark:text-rose-300">FAIL / CROP-FOCUS</span></div>
                  <p className="mt-1">file=<code>{slot.file}</code></p>
                  <p>effective fit=<code>{slot.fit}</code> / focus=<code>{slot.focus ? `${slot.focus.x},${slot.focus.y}` : "none"}</code></p>
                  {range ? <p className="font-mono text-sky-700 dark:text-sky-300">review {formatOpeningReviewTimecode(range.startSec)}–{formatOpeningReviewTimecode(range.endSec)} / scene={range.sceneId}</p> : null}
                  <p className="mt-1">修正候補: <code>{source}</code></p>
                  {slot.notes ? <p className="mt-1 border-l-2 border-rose-300 pl-2">Human note: {slot.notes}</p> : null}
                  <button type="button" onClick={() => copyText(source)} className="mt-2 border border-rose-300 px-2 py-1 font-semibold dark:border-rose-800">source pathをコピー</button>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-3 border-t border-rose-200 pt-2 text-[7px] leading-4 dark:border-rose-900">
          <p className="font-semibold">Correction loop</p>
          <p>1. FAIL slotのpresentationだけ修正 → 2. preview再render → 3. fresh evidence init → 4. Motion Zukanで該当timecodeを再review</p>
          <div className="mt-1 flex flex-wrap gap-1"><button type="button" onClick={() => copyText(renderCommand)} className="border px-2 py-1">re-render commandをコピー</button><button type="button" onClick={() => copyText(reviewInitCommand)} className="border px-2 py-1">fresh review initをコピー</button></div>
          <code className="mt-1 block overflow-x-auto whitespace-nowrap">{renderCommand}</code><code className="block overflow-x-auto whitespace-nowrap">{reviewInitCommand}</code>
        </div>
        <p className="mt-2 border-l-2 border-amber-300 pl-2 text-[7px] text-amber-800 dark:text-amber-200">Correction Queueは修正ナビゲーションだけ。Mac/Studio GUI Actual = NOT_RUN / Mac DaVinci GUI Actual = NOT_RUN / productionReady = false。</p>
      </section>
    );
  }

  const audit = profileRealMediaReviewGate.audit as unknown as {evidenceExists: boolean; parseState: string; media: ProfileMedia[]; chapters: ProfileChapter[]; review: {overall: QaState; notes: string}};
  const timecodes = buildProfileRealMediaTimecodes(audit.media, audit.chapters);
  const failed = audit.media.flatMap((media) => PROFILE_AXES.filter((axis) => media.qa[axis] === "FAIL").map((axis) => ({media, axis})));
  const failedChapters = audit.chapters.flatMap((chapter) => (["visualFlow", "readability", "mediaRoleFit"] as const).filter((axis) => chapter[axis] === "FAIL").map((axis) => ({chapter, axis})));
  const renderCommand = "cd motion-studio && pnpm render:profile-v1:real-media-preview";
  const reviewInitCommand = "cd motion-studio && pnpm profile:real-media-review:init";

  return (
    <section className="mt-3 border-2 border-rose-300 p-3 dark:border-rose-800" data-visual-qa-correction-queue="profile" data-correction-count={failed.length + failedChapters.length}>
      <div className="flex flex-wrap items-start justify-between gap-2"><div><p className="text-[8px] font-semibold tracking-[0.14em] text-rose-700 dark:text-rose-300">VISUAL QA → CORRECTION → RE-RENDER / PROFILE</p><p className="mt-1 text-[11px] font-semibold">Correction Queue {failed.length} media-axis + {failedChapters.length} chapter-axis</p><p className="mt-1 text-[7px] text-navy-400">17素材・5章のinstalled Human evidenceからFAIL axisだけを抽出します。</p></div><span className="border border-rose-300 px-2 py-1 font-mono text-[8px] dark:border-rose-800">{audit.evidenceExists && audit.parseState === "PARSED" ? audit.review.overall : "NOT_READY"}</span></div>

      {failed.length === 0 && failedChapters.length === 0 ? <p className="mt-3 border border-emerald-200 p-2 text-[8px] text-emerald-700 dark:border-emerald-800 dark:text-emerald-300">installed evidenceにFAILはありません。NOT_RUNはCorrection Queueへ混ぜません。</p> : null}
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {failed.map(({media, axis}) => {
          const range = timecodes.mediaRanges.find((item) => item.slot === media.slot);
          const source = axis === "crop" || axis === "focus" ? "motion-studio/src/compositions/profile/ProfileV1RealMediaPreview.tsx" : "motion-studio/src/data/profileV1ProductionPlan.ts";
          return <div key={`${media.slot}:${axis}`} className="border border-rose-200 p-2 text-[7px] dark:border-rose-900" data-correction-slot={media.slot ?? "INVALID"} data-correction-axis={axis}><div className="flex items-center justify-between gap-2"><p className="text-[9px] font-semibold">{media.label} / {media.slot}</p><span className="font-mono text-rose-700 dark:text-rose-300">FAIL / {axis}</span></div><p className="mt-1">chapter={media.chapterId} / file=<code>{media.file}</code></p>{range ? <p className="font-mono text-sky-700 dark:text-sky-300">review {formatProfileReviewTimecode(range.startSec)}–{formatProfileReviewTimecode(range.endSec)}</p> : null}<p className="mt-1">修正候補: <code>{source}</code></p><button type="button" onClick={() => copyText(source)} className="mt-2 border border-rose-300 px-2 py-1 font-semibold dark:border-rose-800">source pathをコピー</button></div>;
        })}
        {failedChapters.map(({chapter, axis}) => {
          const range = timecodes.chapterRanges.find((item) => item.chapterId === chapter.chapterId);
          const source = "motion-studio/src/data/profileV1ProductionPlan.ts";
          return <div key={`${chapter.chapterId}:${axis}`} className="border border-rose-200 p-2 text-[7px] dark:border-rose-900" data-correction-chapter={chapter.chapterId ?? "INVALID"} data-correction-axis={axis}><div className="flex items-center justify-between gap-2"><p className="text-[9px] font-semibold">{chapter.title} / {chapter.chapterId}</p><span className="font-mono text-rose-700 dark:text-rose-300">FAIL / {axis}</span></div>{range ? <p className="mt-1 font-mono text-sky-700 dark:text-sky-300">chapter {formatProfileReviewTimecode(range.startSec)}–{formatProfileReviewTimecode(range.endSec)}</p> : null}<p className="mt-1">修正候補: <code>{source}</code></p><button type="button" onClick={() => copyText(source)} className="mt-2 border border-rose-300 px-2 py-1 font-semibold dark:border-rose-800">source pathをコピー</button></div>;
        })}
      </div>
      {audit.review.notes ? <p className="mt-3 border-l-2 border-rose-300 pl-2 text-[7px]">Human review note: {audit.review.notes}</p> : null}
      <div className="mt-3 border-t border-rose-200 pt-2 text-[7px] leading-4 dark:border-rose-900"><p className="font-semibold">Correction loop</p><p>1. FAIL axisだけ修正 → 2. real-media preview再render → 3. fresh review init → 4. 該当timecodeを再review</p><div className="mt-1 flex flex-wrap gap-1"><button type="button" onClick={() => copyText(renderCommand)} className="border px-2 py-1">re-render commandをコピー</button><button type="button" onClick={() => copyText(reviewInitCommand)} className="border px-2 py-1">fresh review initをコピー</button></div><code className="mt-1 block overflow-x-auto whitespace-nowrap">{renderCommand}</code><code className="block overflow-x-auto whitespace-nowrap">{reviewInitCommand}</code></div>
      <p className="mt-2 border-l-2 border-amber-300 pl-2 text-[7px] text-amber-800 dark:text-amber-200">FAIL抽出はHuman evidenceの再表示だけ。BGM review=false / Mac DaVinci GUI Actual=NOT_RUN / productionReady=false。</p>
    </section>
  );
}
