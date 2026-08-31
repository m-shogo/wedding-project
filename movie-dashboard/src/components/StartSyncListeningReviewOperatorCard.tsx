import {useMemo, useRef, useState} from "react";
import {startSyncListeningReviewGate} from "../data/startSyncListeningReviewGate.generated";
import {downloadText} from "../lib/exporters";

type ReviewState = "NOT_RUN" | "PASS" | "FAIL";
type PhraseReview = {
  phraseId: string | null;
  lineNumber: number;
  sectionId: string | null;
  startSec: number;
  endSec: number;
  threeHitFrameSecs: readonly number[] | null;
  rhythmType: string | null;
  confidence: string | null;
  review: ReviewState;
  notes: string;
};
type GlobalCheckKey = "fullPlayback" | "lyricTimingOverall" | "measuredThreeHitTiming" | "transitionRhythm" | "endingLockupTiming" | "audioVisualSync";
type GlobalChecks = Record<GlobalCheckKey, ReviewState>;
type ListeningAudit = {
  evidenceExists: boolean;
  evidenceSha256: string | null;
  parseState: string;
  boundAt: string | null;
  manifestSha256: string | null;
  artifactSha256: string | null;
  sourceAudioSha256: string | null;
  lyricTimingFingerprintSha256: string | null;
  phraseCount: number;
  measuredThreeHitPhraseCount: number;
  phrases: PhraseReview[];
  checks: GlobalChecks;
  review: {overall: ReviewState; reviewer: string | null; reviewedAt: string | null; notes: string};
};

const GLOBAL_CHECKS: Array<{key: GlobalCheckKey; label: string}> = [
  {key: "fullPlayback", label: "FULL PLAYBACK"},
  {key: "lyricTimingOverall", label: "LYRIC TIMING"},
  {key: "measuredThreeHitTiming", label: "3-HIT ×4"},
  {key: "transitionRhythm", label: "TRANSITION RHYTHM"},
  {key: "endingLockupTiming", label: "ENDING LOCKUP"},
  {key: "audioVisualSync", label: "A/V SYNC"},
];

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds - minutes * 60;
  return `${minutes}:${rest.toFixed(2).padStart(5, "0")}`;
}

export function StartSyncListeningReviewOperatorCard() {
  const audit = startSyncListeningReviewGate.audit as unknown as ListeningAudit;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const auditReady = audit.evidenceExists
    && audit.parseState === "PARSED"
    && audit.phrases.length === 30
    && audit.phraseCount === 30
    && audit.measuredThreeHitPhraseCount === 4
    && Boolean(audit.boundAt)
    && Boolean(audit.manifestSha256)
    && Boolean(audit.artifactSha256)
    && Boolean(audit.sourceAudioSha256)
    && Boolean(audit.lyricTimingFingerprintSha256);

  const [phrases, setPhrases] = useState<PhraseReview[]>(() => audit.phrases.map((phrase) => ({...phrase, threeHitFrameSecs: phrase.threeHitFrameSecs ? [...phrase.threeHitFrameSecs] : null})));
  const [checks, setChecks] = useState<GlobalChecks>(() => ({...audit.checks}));
  const [reviewer, setReviewer] = useState(audit.review.reviewer ?? "");
  const [notes, setNotes] = useState(audit.review.notes ?? "");
  const [focusedIndex, setFocusedIndex] = useState(() => Math.max(0, audit.phrases.findIndex((phrase) => phrase.review === "NOT_RUN")));

  const phrasePassCount = useMemo(() => phrases.filter((phrase) => phrase.review === "PASS").length, [phrases]);
  const phraseReviewedCount = useMemo(() => phrases.filter((phrase) => phrase.review !== "NOT_RUN").length, [phrases]);
  const firstIncompleteIndex = phrases.findIndex((phrase) => phrase.review === "NOT_RUN");
  const allPhrasesReviewed = auditReady && phraseReviewedCount === 30;
  const allPhrasesPass = auditReady && phrasePassCount === 30;
  const allChecksReviewed = GLOBAL_CHECKS.every(({key}) => checks[key] !== "NOT_RUN");
  const allChecksPass = GLOBAL_CHECKS.every(({key}) => checks[key] === "PASS");
  const canExport = auditReady && allPhrasesReviewed && allChecksReviewed && reviewer.trim().length > 0;
  const overall: ReviewState = canExport ? (allPhrasesPass && allChecksPass ? "PASS" : "FAIL") : "NOT_RUN";
  const focused = phrases[Math.min(focusedIndex, Math.max(phrases.length - 1, 0))];

  function seek(seconds: number) {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.max(0, seconds - 0.35);
    void video.play();
  }

  function setPhraseReview(index: number, review: ReviewState) {
    setPhrases((current) => current.map((phrase, phraseIndex) => phraseIndex === index ? {...phrase, review} : phrase));
    if (review !== "NOT_RUN") {
      const next = phrases.findIndex((phrase, phraseIndex) => phraseIndex > index && phrase.review === "NOT_RUN");
      if (next >= 0) {
        setFocusedIndex(next);
        window.setTimeout(() => seek(phrases[next].startSec), 0);
      }
    }
  }

  function setPhraseNotes(index: number, phraseNotes: string) {
    setPhrases((current) => current.map((phrase, phraseIndex) => phraseIndex === index ? {...phrase, notes: phraseNotes} : phrase));
  }

  function exportEvidence() {
    if (!canExport || !audit.boundAt || !audit.manifestSha256 || !audit.artifactSha256 || !audit.sourceAudioSha256 || !audit.lyricTimingFingerprintSha256) return;
    const reviewedAt = new Date().toISOString();
    const evidence = {
      schemaVersion: "japanese-friends-opening-start-sync-listening-review/v1",
      authority: "HUMAN_START_SYNC_LISTENING_REVIEW",
      boundAt: audit.boundAt,
      manifestSha256: audit.manifestSha256,
      artifactSha256: audit.artifactSha256,
      sourceAudioSha256: audit.sourceAudioSha256,
      lyricTimingFingerprintSha256: audit.lyricTimingFingerprintSha256,
      phraseCount: 30,
      measuredThreeHitPhraseCount: 4,
      phrases,
      checks,
      review: {overall, reviewer: reviewer.trim(), reviewedAt, notes},
      rightsCleared: false,
      publicationApproved: false,
      macDaVinciActual: "NOT_RUN",
      productionReady: false,
    } as const;
    downloadText(`${JSON.stringify(evidence, null, 2)}\n`, "japanese-friends-opening-start-sync-listening-review.json");
  }

  return (
    <section className="mt-5 border-2 border-violet-400 bg-violet-50/30 p-4 dark:border-violet-800 dark:bg-violet-950/10" data-start-sync-listening-review={auditReady ? "READY" : "BLOCKED_INIT"}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[9px] font-semibold tracking-[0.18em] text-violet-700 dark:text-violet-300">START SYNC / HUMAN LISTENING + TIMING QA</p>
          <h3 className="mt-1 text-base font-bold text-navy-900 dark:text-sand-100">145.6秒版を耳で確認して30 phraseのタイミングを閉じる</h3>
          <p className="mt-1 text-[9px] leading-4 text-navy-500 dark:text-navy-300">歌詞本文はこのevidenceに保存しません。phrase ID・section・時刻・rhythm metadataだけでcurrent renderへSHA bindingします。</p>
        </div>
        <div className="text-right font-mono text-[8px]">
          <p>{startSyncListeningReviewGate.state}</p>
          <p>{phrasePassCount}/30 PHRASE PASS</p>
        </div>
      </div>

      <div className="mt-3 border border-violet-200 p-2 text-[8px] leading-4 dark:border-violet-900">
        <p>AUTOMATED QA: <strong>{startSyncListeningReviewGate.manifest.qa.status}</strong> / manifest timing verifiedByListening=<strong>{String(startSyncListeningReviewGate.manifest.timing.verifiedByListening)}</strong></p>
        <p className="text-red-700 dark:text-red-300">RIGHTS: MUSIC_AND_LYRICS_NOT_CLEARED / publicationApproved=false</p>
      </div>

      <video ref={videoRef} controls preload="metadata" playsInline src={startSyncListeningReviewGate.mediaPath} className="mt-3 aspect-video w-full bg-black object-contain" aria-label="StaRt sync Human listening QA preview" />

      {!auditReady ? (
        <div className="mt-3 border border-amber-300 p-3 text-[8px] leading-4 text-amber-800 dark:border-amber-800 dark:text-amber-200">
          <p className="font-semibold">Human listening evidence templateはまだ未初期化です。</p>
          <p>local render・local lyric timing JSONがあるMacで次を実行し、current manifest/render/30 phrase timingへbindingしてください。</p>
          <code className="mt-2 block overflow-x-auto whitespace-nowrap">cd motion-studio && node --no-warnings scripts/japanese-friends-opening-start-sync-listening-review.mts --init</code>
          <code className="block overflow-x-auto whitespace-nowrap">cd ../movie-dashboard && node scripts/sync-start-sync-listening-review-gate.mjs --write</code>
        </div>
      ) : (
        <>
          {focused ? (
            <div className="mt-3 border border-violet-300 p-3 dark:border-violet-800" data-start-sync-focused-phrase={focused.phraseId ?? "INVALID"}>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="text-[10px] font-semibold">#{focused.lineNumber} · {focused.phraseId} · {focused.sectionId}</p>
                  <p className="mt-1 font-mono text-[8px]">{formatTime(focused.startSec)} → {formatTime(focused.endSec)} · {focused.rhythmType} · confidence={focused.confidence}</p>
                  {focused.threeHitFrameSecs ? <p className="mt-1 font-mono text-[8px] text-violet-700 dark:text-violet-300">MEASURED 3-HIT: {focused.threeHitFrameSecs.map(formatTime).join(" / ")}</p> : null}
                </div>
                <div className="flex flex-wrap gap-1">
                  <button type="button" onClick={() => seek(focused.startSec)} className="border border-violet-300 px-2 py-1 text-[8px] dark:border-violet-800">このphraseを再生</button>
                  {(["PASS", "FAIL"] as const).map((state) => <button key={state} type="button" onClick={() => setPhraseReview(focusedIndex, state)} className={`border px-2 py-1 text-[8px] ${focused.review === state ? "border-violet-600 font-bold" : "border-sand-300 dark:border-navy-700"}`}>{state}</button>)}
                </div>
              </div>
              <label className="mt-2 block text-[7px] font-semibold">Timing notes<textarea value={focused.notes} onChange={(event) => setPhraseNotes(focusedIndex, event.target.value)} className="mt-1 block min-h-14 w-full border border-sand-300 bg-transparent p-2 text-[8px] dark:border-navy-700" placeholder="早い/遅い、transitionが歌を邪魔する、3-hit違和感など" /></label>
            </div>
          ) : null}

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <p className="text-[8px] font-semibold">PHRASE TIMING {phraseReviewedCount}/30 reviewed</p>
            <button type="button" disabled={firstIncompleteIndex < 0} onClick={() => { if (firstIncompleteIndex >= 0) { setFocusedIndex(firstIncompleteIndex); seek(phrases[firstIncompleteIndex].startSec); } }} className="border border-violet-300 px-2 py-1 text-[8px] disabled:opacity-40 dark:border-violet-800">次の未review phraseへ</button>
          </div>
          <div className="mt-2 grid gap-1 sm:grid-cols-3 lg:grid-cols-5">
            {phrases.map((phrase, index) => <button key={phrase.phraseId ?? index} type="button" onClick={() => { setFocusedIndex(index); seek(phrase.startSec); }} className={`border p-2 text-left text-[7px] ${index === focusedIndex ? "border-violet-600" : "border-sand-200 dark:border-navy-700"}`}><span className="font-semibold">#{phrase.lineNumber} {phrase.sectionId}</span><span className="ml-1 font-mono">{phrase.review}</span><br/><span className="opacity-60">{formatTime(phrase.startSec)}</span></button>)}
          </div>

          <div className="mt-4 border-t border-violet-200 pt-3 dark:border-violet-900">
            <p className="text-[8px] font-semibold">GLOBAL LISTENING CHECKS</p>
            <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {GLOBAL_CHECKS.map(({key, label}) => <div key={key} className="border border-sand-200 p-2 dark:border-navy-700"><p className="text-[7px] font-semibold">{label}</p><div className="mt-1 flex gap-1">{(["PASS", "FAIL"] as const).map((state) => <button key={state} type="button" onClick={() => setChecks((current) => ({...current, [key]: state}))} className={`border px-2 py-1 text-[7px] ${checks[key] === state ? "border-violet-600 font-bold" : "border-sand-300 dark:border-navy-700"}`}>{state}</button>)}</div></div>)}
            </div>
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <label className="text-[7px] font-semibold">Reviewer<input value={reviewer} onChange={(event) => setReviewer(event.target.value)} className="mt-1 block w-full border border-sand-300 bg-transparent p-2 text-[8px] dark:border-navy-700" /></label>
            <label className="text-[7px] font-semibold">Overall notes<textarea value={notes} onChange={(event) => setNotes(event.target.value)} className="mt-1 block min-h-16 w-full border border-sand-300 bg-transparent p-2 text-[8px] dark:border-navy-700" /></label>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button type="button" disabled={!canExport} onClick={exportEvidence} className="border border-violet-500 px-3 py-2 text-[8px] font-semibold text-violet-700 disabled:opacity-40 dark:border-violet-700 dark:text-violet-300">Listening evidence JSONを書き出す</button>
            <span className="font-mono text-[8px]">overall={overall}</span>
          </div>
          <p className="mt-2 text-[7px] leading-4 text-navy-500 dark:text-navy-300">downloadしたJSONを <code>motion-studio/out/qa/japanese-friends-opening-start-sync-listening-review.json</code> に置き、<code>node --no-warnings scripts/japanese-friends-opening-start-sync-listening-review.mts --strict</code> でrender/audio/timing fingerprintとHuman verdictを再検証してください。</p>
        </>
      )}

      <p className="mt-3 border-l-2 border-red-300 pl-2 text-[7px] leading-3 text-red-800 dark:text-red-200">Human listening PASSは音源・歌詞の権利許諾ではありません。rightsCleared=false / publicationApproved=false / Mac DaVinci GUI Actual=NOT_RUN / productionReady=false を固定します。</p>
    </section>
  );
}
