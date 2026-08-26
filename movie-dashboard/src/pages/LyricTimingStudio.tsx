import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Header } from "../components/Header";
import { SectionCard } from "../components/SectionCard";

/**
 * 歌詞タイミング調整 (Lyric Timing Studio)
 *
 * 目的:
 *   word-accent-map.local.json の accentSec は「検出beatへsnapした値」であり、
 *   実際の歌い出し(vocal onset)ではない。ドラムのbeatと声の立ち上がりは別の瞬間。
 *   このページは、人間が実音を聴いて手で正しい位置へ直すためのUI。
 *
 * データの優先順位 (Human-Readable / Human-Editable Movie Contract):
 *   1. 手動override (このページで保存する manual-overrides ファイル) = HUMAN_SELECTED
 *   2. word-accent-map.local.json の accentSec = beat-snapped (参考/fallback)
 *   3. beat-map.local.json の beats = 参考gridlineのみ。これに合わせる必要はない。
 *
 * override保存先:
 *   motion-studio/local/word-accent-map.manual-overrides.local.json
 *   元ファイルは上書きしない (beat-snapped値をfallbackとして保存するため)。
 *
 * override entryの形:
 *   word !== null → その単語のaccent override
 *   word === null → phrase全体 (startSec / endSec) のoverride
 *   実効accent = (manualAccentSec ?? 元のaccentSec) + (manualOffsetFrames ?? 0) / 30
 *     manualAccentSec は「今の再生位置をここに設定」で入る絶対秒。
 *     manualOffsetFrames は数値入力による frame 単位の微調整。両方同時に使える。
 */

const FPS = 30;
const FRAME_SEC = 1 / FPS;
const HISTORY_LIMIT = 20;
const WAVEFORM_HEIGHT = 170;

interface Phrase {
  phraseId: string;
  lineNumber?: number;
  sectionId?: string;
  text: string;
  startSec: number;
  endSec: number;
  semanticType?: string;
  rhythmType?: string;
  selectedAnimation?: string;
  transitionIntent?: string;
  confidence?: string;
  humanReviewRequired?: boolean;
}

interface WordAccent {
  word: string;
  phraseId: string;
  approxSec: number;
  accentSec: number;
  role?: string;
}

interface OverrideEntry {
  phraseId: string;
  word: string | null;
  manualAccentSec: number | null;
  manualOffsetFrames: number | null;
  manualStartSec?: number | null;
  manualEndSec?: number | null;
  verifiedByListening: boolean;
  reviewComment: string;
  updatedAt: string;
}

type OverrideMap = Record<string, OverrideEntry>;

function keyOf(phraseId: string, word: string | null): string {
  return `${phraseId}|${word ?? ""}`;
}

function formatTime(sec: number): string {
  if (!Number.isFinite(sec) || sec < 0) return "0:00.000";
  const m = Math.floor(sec / 60);
  const s = sec - m * 60;
  return `${m}:${s.toFixed(3).padStart(6, "0")}`;
}

function toFrame(sec: number): number {
  return Math.round(sec * FPS);
}

function blankEntry(phraseId: string, word: string | null): OverrideEntry {
  return {
    phraseId,
    word,
    manualAccentSec: null,
    manualOffsetFrames: null,
    manualStartSec: null,
    manualEndSec: null,
    verifiedByListening: false,
    reviewComment: "",
    updatedAt: new Date().toISOString(),
  };
}

function isMeaningful(entry: OverrideEntry | undefined): boolean {
  if (!entry) return false;
  return (
    entry.manualAccentSec != null ||
    (entry.manualOffsetFrames != null && entry.manualOffsetFrames !== 0) ||
    entry.manualStartSec != null ||
    entry.manualEndSec != null ||
    entry.verifiedByListening ||
    entry.reviewComment.trim().length > 0
  );
}

function sameEntry(a: OverrideEntry | undefined, b: OverrideEntry | undefined): boolean {
  if (!isMeaningful(a) && !isMeaningful(b)) return true;
  if (!a || !b) return false;
  return (
    a.manualAccentSec === b.manualAccentSec &&
    (a.manualOffsetFrames ?? 0) === (b.manualOffsetFrames ?? 0) &&
    (a.manualStartSec ?? null) === (b.manualStartSec ?? null) &&
    (a.manualEndSec ?? null) === (b.manualEndSec ?? null) &&
    a.verifiedByListening === b.verifiedByListening &&
    a.reviewComment === b.reviewComment
  );
}

const SHORTCUTS: Array<{ keys: string; desc: string }> = [
  { keys: "Space", desc: "再生 / 停止" },
  { keys: "J / L", desc: "前後 1 frame (1/30秒)" },
  { keys: "Shift + J / L", desc: "前後 3 frame" },
  { keys: "[", desc: "選択中phraseの開始をこの位置に設定" },
  { keys: "]", desc: "選択中phraseの終了をこの位置に設定" },
  { keys: "1〜4", desc: "選択中phraseの1〜4番目の単語マーカーをこの位置に設定" },
  { keys: "R", desc: "ループ切替 (選択中phraseの範囲を既定にする)" },
  { keys: "V", desc: "選択中の単語を聴取確認済みにする / 解除" },
];

export function LyricTimingStudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const baseCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const waveWrapRef = useRef<HTMLDivElement | null>(null);
  const timeLabelRef = useRef<HTMLSpanElement | null>(null);
  const frameLabelRef = useRef<HTMLSpanElement | null>(null);
  const channelRef = useRef<Float32Array | null>(null);
  const sampleRateRef = useRef<number>(44100);

  const [phrases, setPhrases] = useState<Phrase[]>([]);
  const [words, setWords] = useState<WordAccent[]>([]);
  const [beats, setBeats] = useState<number[]>([]);
  const [sourceEndSec, setSourceEndSec] = useState<number>(0);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [overrides, setOverrides] = useState<OverrideMap>({});
  const [savedOverrides, setSavedOverrides] = useState<OverrideMap>({});
  const [history, setHistory] = useState<OverrideMap[]>([]);

  const [activePhraseId, setActivePhraseId] = useState<string | null>(null);
  const [activeWordKey, setActiveWordKey] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [rate, setRate] = useState(1);

  const [loopEnabled, setLoopEnabled] = useState(false);
  const [loopStart, setLoopStart] = useState<number | null>(null);
  const [loopEnd, setLoopEnd] = useState<number | null>(null);

  const [viewStart, setViewStart] = useState(0);
  const [viewSpan, setViewSpan] = useState(0);
  const [canvasWidth, setCanvasWidth] = useState(1000);
  const [waveStatus, setWaveStatus] = useState<"idle" | "decoding" | "ready" | "error">("idle");
  const [waveError, setWaveError] = useState<string | null>(null);
  const [waveReadyTick, setWaveReadyTick] = useState(0);

  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [promptText, setPromptText] = useState("");

  // ---------- 終了位置確認(145.6秒問題) ----------
  const [endConfirmed, setEndConfirmed] = useState(false);
  const [endVerificationMethod, setEndVerificationMethod] = useState<string>("");
  const [endDraftEnd, setEndDraftEnd] = useState<number>(0);
  const [endDraftFadeStart, setEndDraftFadeStart] = useState<number>(0);
  const [endDraftFadeDur, setEndDraftFadeDur] = useState<number>(0.5);
  const [endComment, setEndComment] = useState("");
  const [endSaveMessage, setEndSaveMessage] = useState<string | null>(null);
  const [endSaving, setEndSaving] = useState(false);
  const btnClass =
    "rounded border border-gray-300 px-2 py-1 text-xs hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800";

  // 常に最新値をkeyboard handler / rAFから読むためのref
  const stateRef = useRef({
    activePhraseId,
    activeWordKey,
    loopEnabled,
    loopStart,
    loopEnd,
    phrases,
    words,
  });
  stateRef.current = { activePhraseId, activeWordKey, loopEnabled, loopStart, loopEnd, phrases, words };

  // ---------- data load ----------
  const loadData = useCallback(async (withReset: boolean) => {
    setLoading(true);
    setLoadError(null);
    try {
      const [lyricsRes, wordsRes, beatsRes, editRes, overridesRes] = await Promise.all([
        fetch("/api/timing/lyrics"),
        fetch("/api/timing/word-accents"),
        fetch("/api/timing/beats"),
        fetch("/api/timing/wedding-edit"),
        fetch("/api/timing/overrides"),
      ]);
      if (!lyricsRes.ok) throw new Error(`lyrics: HTTP ${lyricsRes.status}`);
      if (!wordsRes.ok) throw new Error(`word-accents: HTTP ${wordsRes.status}`);

      const lyricsJson = (await lyricsRes.json()) as Phrase[];
      const wordsJson = (await wordsRes.json()) as WordAccent[];
      const beatsJson = beatsRes.ok ? ((await beatsRes.json()) as { beats?: number[] }) : { beats: [] };
      const editJson = editRes.ok
        ? ((await editRes.json()) as {
            sourceEndSec?: number;
            fadeOutStartSec?: number;
            fadeOutDurationSec?: number;
            verifiedByListening?: boolean;
            verificationMethod?: string;
          })
        : {};
      const overrideList = overridesRes.ok ? ((await overridesRes.json()) as OverrideEntry[]) : [];

      setPhrases(lyricsJson);
      setWords(wordsJson);
      setBeats(Array.isArray(beatsJson.beats) ? beatsJson.beats : []);

      const end =
        typeof editJson.sourceEndSec === "number" && editJson.sourceEndSec > 0
          ? editJson.sourceEndSec
          : Math.max(0, ...lyricsJson.map((p) => p.endSec)) + 5;
      setSourceEndSec(end);
      if (withReset || viewSpan === 0) {
        setViewStart(0);
        setViewSpan(end);
      }
      setEndDraftEnd(end);
      setEndDraftFadeStart(
        typeof editJson.fadeOutStartSec === "number" ? editJson.fadeOutStartSec : Math.max(0, end - 0.5),
      );
      setEndDraftFadeDur(typeof editJson.fadeOutDurationSec === "number" ? editJson.fadeOutDurationSec : 0.5);
      setEndConfirmed(Boolean(editJson.verifiedByListening));
      setEndVerificationMethod(editJson.verificationMethod ?? "");

      const map: OverrideMap = {};
      for (const entry of overrideList) {
        map[keyOf(entry.phraseId, entry.word ?? null)] = {
          ...blankEntry(entry.phraseId, entry.word ?? null),
          ...entry,
          word: entry.word ?? null,
          reviewComment: entry.reviewComment ?? "",
          verifiedByListening: Boolean(entry.verifiedByListening),
        };
      }
      setOverrides(map);
      setSavedOverrides(map);
      setHistory([]);
    } catch (error) {
      setLoadError(String(error));
    } finally {
      setLoading(false);
    }
    // viewSpan は初回判定のみに使うので依存に入れない
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    void loadData(true);
  }, [loadData]);

  // ---------- waveform decode ----------
  useEffect(() => {
    let cancelled = false;
    async function decode() {
      setWaveStatus("decoding");
      setWaveError(null);
      try {
        const res = await fetch("/api/timing/audio");
        if (!res.ok) throw new Error(`audio: HTTP ${res.status}`);
        const buffer = await res.arrayBuffer();
        const AudioCtx =
          window.AudioContext ??
          (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!AudioCtx) throw new Error("AudioContext unavailable");
        const ctx = new AudioCtx();
        const decoded = await ctx.decodeAudioData(buffer);
        if (cancelled) return;
        channelRef.current = decoded.getChannelData(0);
        sampleRateRef.current = decoded.sampleRate;
        setWaveStatus("ready");
        setWaveReadyTick((tick) => tick + 1);
        void ctx.close();
      } catch (error) {
        if (cancelled) return;
        setWaveStatus("error");
        setWaveError(String(error));
      }
    }
    void decode();
    return () => {
      cancelled = true;
    };
  }, []);

  // ---------- canvas size ----------
  useEffect(() => {
    const el = waveWrapRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const width = Math.max(320, Math.floor(entries[0].contentRect.width));
      setCanvasWidth(width);
    });
    observer.observe(el);
    setCanvasWidth(Math.max(320, Math.floor(el.clientWidth)));
    return () => observer.disconnect();
  }, []);

  // ---------- derived ----------
  const wordsByPhrase = useMemo(() => {
    const map = new Map<string, WordAccent[]>();
    for (const word of words) {
      const list = map.get(word.phraseId) ?? [];
      list.push(word);
      map.set(word.phraseId, list);
    }
    return map;
  }, [words]);

  const effectiveAccent = useCallback(
    (word: WordAccent): number => {
      const entry = overrides[keyOf(word.phraseId, word.word)];
      const base = entry?.manualAccentSec ?? word.accentSec;
      const offset = (entry?.manualOffsetFrames ?? 0) * FRAME_SEC;
      return base + offset;
    },
    [overrides],
  );

  const effectivePhraseRange = useCallback(
    (phrase: Phrase): { start: number; end: number } => {
      const entry = overrides[keyOf(phrase.phraseId, null)];
      return {
        start: entry?.manualStartSec ?? phrase.startSec,
        end: entry?.manualEndSec ?? phrase.endSec,
      };
    },
    [overrides],
  );

  const dirtyKeys = useMemo(() => {
    const keys = new Set<string>();
    const all = new Set([...Object.keys(overrides), ...Object.keys(savedOverrides)]);
    for (const key of all) {
      if (!sameEntry(overrides[key], savedOverrides[key])) keys.add(key);
    }
    return keys;
  }, [overrides, savedOverrides]);

  const meaningfulOverrides = useMemo(
    () => Object.values(overrides).filter(isMeaningful),
    [overrides],
  );

  // ---------- mutation with undo history ----------
  const mutate = useCallback((updater: (prev: OverrideMap) => OverrideMap) => {
    setOverrides((prev) => {
      const next = updater(prev);
      if (next === prev) return prev;
      setHistory((stack) => [...stack, prev].slice(-HISTORY_LIMIT));
      return next;
    });
  }, []);

  const patchEntry = useCallback(
    (phraseId: string, word: string | null, patch: Partial<OverrideEntry>) => {
      mutate((prev) => {
        const key = keyOf(phraseId, word);
        const base = prev[key] ?? blankEntry(phraseId, word);
        return {
          ...prev,
          [key]: { ...base, ...patch, updatedAt: new Date().toISOString() },
        };
      });
    },
    [mutate],
  );

  const undo = useCallback(() => {
    setHistory((stack) => {
      if (stack.length === 0) return stack;
      const previous = stack[stack.length - 1];
      setOverrides(previous);
      return stack.slice(0, -1);
    });
  }, []);

  // ---------- transport ----------
  const getTime = useCallback(() => audioRef.current?.currentTime ?? 0, []);

  const seekTo = useCallback(
    (sec: number) => {
      const audio = audioRef.current;
      if (!audio) return;
      const clamped = Math.max(0, Math.min(sec, sourceEndSec || audio.duration || sec));
      audio.currentTime = clamped;
    },
    [sourceEndSec],
  );

  const nudge = useCallback(
    (deltaSec: number) => {
      seekTo(getTime() + deltaSec);
    },
    [getTime, seekTo],
  );

  const loopEndCandidate = useCallback(() => {
    setLoopStart(Math.max(0, endDraftEnd - 4));
    setLoopEnd(Math.min(sourceEndSec + 8, endDraftEnd + 4));
    setLoopEnabled(true);
    seekTo(Math.max(0, endDraftEnd - 4));
  }, [endDraftEnd, sourceEndSec, seekTo]);

  const confirmEndPosition = useCallback(async () => {
    setEndSaving(true);
    setEndSaveMessage(null);
    try {
      const res = await fetch("/api/timing/save-end-position", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceEndSec: endDraftEnd,
          fadeOutStartSec: endDraftFadeStart,
          fadeOutDurationSec: endDraftFadeDur,
          confirmedComment: endComment,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setEndConfirmed(true);
      setEndVerificationMethod("human-listening-confirmed");
      setSourceEndSec(endDraftEnd);
      setEndSaveMessage("確定しました。motion-studio側で pnpm sync:start-wedding-edit-local を実行してください。");
    } catch (error) {
      setEndSaveMessage(`保存失敗: ${String(error)}`);
    } finally {
      setEndSaving(false);
    }
  }, [endDraftEnd, endDraftFadeStart, endDraftFadeDur, endComment]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) void audio.play();
    else audio.pause();
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.playbackRate = rate;
  }, [rate]);

  // ---------- marker actions ----------
  const setWordToCurrentTime = useCallback(
    (word: WordAccent) => {
      const now = getTime();
      patchEntry(word.phraseId, word.word, { manualAccentSec: Number(now.toFixed(3)), manualOffsetFrames: 0 });
      setActiveWordKey(keyOf(word.phraseId, word.word));
      setActivePhraseId(word.phraseId);
    },
    [getTime, patchEntry],
  );

  const setNthWordToCurrentTime = useCallback(
    (index: number) => {
      const { activePhraseId: phraseId } = stateRef.current;
      if (!phraseId) return;
      const list = stateRef.current.words.filter((w) => w.phraseId === phraseId);
      const target = list[index];
      if (!target) return;
      setWordToCurrentTime(target);
    },
    [setWordToCurrentTime],
  );

  const toggleVerifiedActiveWord = useCallback(() => {
    const key = stateRef.current.activeWordKey;
    if (!key) return;
    const [phraseId, word] = key.split("|");
    setOverrides((prev) => {
      const existing = prev[key] ?? blankEntry(phraseId, word || null);
      setHistory((stack) => [...stack, prev].slice(-HISTORY_LIMIT));
      return {
        ...prev,
        [key]: {
          ...existing,
          verifiedByListening: !existing.verifiedByListening,
          updatedAt: new Date().toISOString(),
        },
      };
    });
  }, []);

  const setPhraseBoundary = useCallback(
    (which: "start" | "end") => {
      const phraseId = stateRef.current.activePhraseId;
      if (!phraseId) return;
      const now = Number(getTime().toFixed(3));
      patchEntry(phraseId, null, which === "start" ? { manualStartSec: now } : { manualEndSec: now });
    },
    [getTime, patchEntry],
  );

  const focusPhrase = useCallback(
    (phrase: Phrase) => {
      const range = effectivePhraseRange(phrase);
      setActivePhraseId(phrase.phraseId);
      const list = wordsByPhrase.get(phrase.phraseId) ?? [];
      setActiveWordKey(list.length > 0 ? keyOf(phrase.phraseId, list[0].word) : null);
      seekTo(range.start);
      // waveform viewportをphraseの中心へ寄せる
      setViewSpan((span) => {
        const nextSpan = span >= sourceEndSec ? Math.min(12, sourceEndSec) : span;
        const center = (range.start + range.end) / 2;
        setViewStart(Math.max(0, Math.min(center - nextSpan / 2, Math.max(0, sourceEndSec - nextSpan))));
        return nextSpan;
      });
    },
    [effectivePhraseRange, seekTo, sourceEndSec, wordsByPhrase],
  );

  const toggleLoop = useCallback(() => {
    const { loopEnabled: enabled, activePhraseId: phraseId, phrases: allPhrases } = stateRef.current;
    if (enabled) {
      setLoopEnabled(false);
      return;
    }
    if (loopStart == null || loopEnd == null) {
      const phrase = allPhrases.find((p) => p.phraseId === phraseId);
      if (phrase) {
        const entry = overrides[keyOf(phrase.phraseId, null)];
        setLoopStart(entry?.manualStartSec ?? phrase.startSec);
        setLoopEnd(entry?.manualEndSec ?? phrase.endSec);
      } else {
        return;
      }
    }
    setLoopEnabled(true);
  }, [loopEnd, loopStart, overrides]);

  // ---------- keyboard ----------
  useEffect(() => {
    function isTyping(target: EventTarget | null): boolean {
      if (!(target instanceof HTMLElement)) return false;
      const tag = target.tagName;
      return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target.isContentEditable;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (isTyping(event.target)) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const key = event.key;

      if (key === " ") {
        event.preventDefault();
        togglePlay();
        return;
      }
      const lower = key.toLowerCase();
      if (lower === "j" || lower === "l") {
        event.preventDefault();
        const frames = event.shiftKey ? 3 : 1;
        nudge((lower === "j" ? -1 : 1) * frames * FRAME_SEC);
        return;
      }
      if (key === "[") {
        event.preventDefault();
        setPhraseBoundary("start");
        return;
      }
      if (key === "]") {
        event.preventDefault();
        setPhraseBoundary("end");
        return;
      }
      if (key >= "1" && key <= "4") {
        event.preventDefault();
        setNthWordToCurrentTime(Number(key) - 1);
        return;
      }
      if (lower === "r") {
        event.preventDefault();
        toggleLoop();
        return;
      }
      if (lower === "v") {
        event.preventDefault();
        toggleVerifiedActiveWord();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [nudge, setNthWordToCurrentTime, setPhraseBoundary, toggleLoop, toggleVerifiedActiveWord, togglePlay]);

  // ---------- base canvas render ----------
  useEffect(() => {
    const canvas = baseCanvasRef.current;
    if (!canvas || viewSpan <= 0) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(canvasWidth * dpr);
    canvas.height = Math.floor(WAVEFORM_HEIGHT * dpr);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, canvasWidth, WAVEFORM_HEIGHT);

    const viewEnd = viewStart + viewSpan;
    const xOf = (sec: number) => ((sec - viewStart) / viewSpan) * canvasWidth;

    // background
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, canvasWidth, WAVEFORM_HEIGHT);

    const waveTop = 26;
    const waveBottom = WAVEFORM_HEIGHT - 34;
    const waveMid = (waveTop + waveBottom) / 2;
    const waveHalf = (waveBottom - waveTop) / 2;

    // 検出beat gridline (参考。視覚的に必ず波形より弱くする)
    ctx.strokeStyle = "rgba(148,163,184,0.28)";
    ctx.lineWidth = 1;
    for (const beat of beats) {
      if (beat < viewStart || beat > viewEnd) continue;
      const x = Math.round(xOf(beat)) + 0.5;
      ctx.beginPath();
      ctx.moveTo(x, waveBottom - 6);
      ctx.lineTo(x, waveBottom + 6);
      ctx.stroke();
    }

    // active phrase の範囲
    const activePhrase = phrases.find((p) => p.phraseId === activePhraseId);
    if (activePhrase) {
      const range = effectivePhraseRange(activePhrase);
      const x1 = xOf(range.start);
      const x2 = xOf(range.end);
      ctx.fillStyle = "rgba(56,189,248,0.12)";
      ctx.fillRect(x1, waveTop - 8, Math.max(1, x2 - x1), waveBottom - waveTop + 16);
      ctx.strokeStyle = "rgba(56,189,248,0.55)";
      ctx.beginPath();
      ctx.moveTo(Math.round(x1) + 0.5, waveTop - 8);
      ctx.lineTo(Math.round(x1) + 0.5, waveBottom + 8);
      ctx.moveTo(Math.round(x2) + 0.5, waveTop - 8);
      ctx.lineTo(Math.round(x2) + 0.5, waveBottom + 8);
      ctx.stroke();
    }

    // waveform (min/max per pixel column)
    const channel = channelRef.current;
    if (channel) {
      const sampleRate = sampleRateRef.current;
      ctx.strokeStyle = "#7dd3fc";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x < canvasWidth; x += 1) {
        const t0 = viewStart + (x / canvasWidth) * viewSpan;
        const t1 = viewStart + ((x + 1) / canvasWidth) * viewSpan;
        let i0 = Math.floor(t0 * sampleRate);
        let i1 = Math.ceil(t1 * sampleRate);
        i0 = Math.max(0, Math.min(i0, channel.length - 1));
        i1 = Math.max(i0 + 1, Math.min(i1, channel.length));
        let min = 1;
        let max = -1;
        const stride = Math.max(1, Math.floor((i1 - i0) / 400));
        for (let i = i0; i < i1; i += stride) {
          const v = channel[i];
          if (v < min) min = v;
          if (v > max) max = v;
        }
        if (min > max) {
          min = 0;
          max = 0;
        }
        const yTop = waveMid - max * waveHalf;
        const yBottom = waveMid - min * waveHalf;
        ctx.moveTo(x + 0.5, yTop);
        ctx.lineTo(x + 0.5, Math.max(yBottom, yTop + 0.5));
      }
      ctx.stroke();
    } else {
      ctx.fillStyle = "rgba(148,163,184,0.6)";
      ctx.font = "12px sans-serif";
      ctx.fillText(
        waveStatus === "decoding" ? "波形をデコード中..." : waveStatus === "error" ? "波形を読み込めませんでした" : "",
        12,
        waveMid,
      );
    }

    // word accent markers (波形より上のレーンに置いてbeat gridlineと区別する)
    for (const word of words) {
      const sec = effectiveAccent(word);
      if (sec < viewStart || sec > viewEnd) continue;
      const key = keyOf(word.phraseId, word.word);
      const entry = overrides[key];
      const dirty = dirtyKeys.has(key);
      const verified = entry?.verifiedByListening ?? false;
      const color = dirty ? "#fbbf24" : verified ? "#4ade80" : "#f472b6";
      const x = Math.round(xOf(sec)) + 0.5;
      ctx.strokeStyle = color;
      ctx.lineWidth = word.phraseId === activePhraseId ? 2 : 1;
      ctx.beginPath();
      ctx.moveTo(x, 6);
      ctx.lineTo(x, waveTop + 14);
      ctx.stroke();
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, 6, 3, 0, Math.PI * 2);
      ctx.fill();
      if (word.phraseId === activePhraseId) {
        ctx.font = "10px sans-serif";
        ctx.fillText(word.word, x + 4, 16);
      }
    }

    // 時間目盛り
    ctx.fillStyle = "rgba(148,163,184,0.75)";
    ctx.font = "10px sans-serif";
    const tickStep = viewSpan > 90 ? 15 : viewSpan > 30 ? 5 : viewSpan > 10 ? 2 : 1;
    for (let t = Math.ceil(viewStart / tickStep) * tickStep; t <= viewEnd; t += tickStep) {
      const x = xOf(t);
      ctx.fillRect(x, WAVEFORM_HEIGHT - 20, 1, 6);
      ctx.fillText(formatTime(t).slice(0, -4), x + 3, WAVEFORM_HEIGHT - 8);
    }
  }, [
    activePhraseId,
    beats,
    canvasWidth,
    dirtyKeys,
    effectiveAccent,
    effectivePhraseRange,
    overrides,
    phrases,
    viewSpan,
    viewStart,
    waveReadyTick,
    waveStatus,
    words,
  ]);

  // ---------- overlay (playhead + loop) via rAF ----------
  useEffect(() => {
    let raf = 0;
    const canvas = overlayCanvasRef.current;
    if (!canvas) return;

    function frame() {
      const audio = audioRef.current;
      const overlay = overlayCanvasRef.current;
      if (!audio || !overlay || viewSpan <= 0) {
        raf = requestAnimationFrame(frame);
        return;
      }
      const dpr = window.devicePixelRatio || 1;
      if (overlay.width !== Math.floor(canvasWidth * dpr)) {
        overlay.width = Math.floor(canvasWidth * dpr);
        overlay.height = Math.floor(WAVEFORM_HEIGHT * dpr);
      }
      const ctx = overlay.getContext("2d");
      if (!ctx) {
        raf = requestAnimationFrame(frame);
        return;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, canvasWidth, WAVEFORM_HEIGHT);

      const time = audio.currentTime;
      const s = stateRef.current;

      // loop処理: loop終端を越えたら先頭へ戻す
      if (s.loopEnabled && s.loopStart != null && s.loopEnd != null && s.loopEnd > s.loopStart) {
        if (time >= s.loopEnd || time < s.loopStart - 0.05) {
          audio.currentTime = s.loopStart;
        }
        const x1 = ((s.loopStart - viewStart) / viewSpan) * canvasWidth;
        const x2 = ((s.loopEnd - viewStart) / viewSpan) * canvasWidth;
        ctx.fillStyle = "rgba(250,204,21,0.12)";
        ctx.fillRect(x1, 0, Math.max(1, x2 - x1), WAVEFORM_HEIGHT);
      }

      const x = ((time - viewStart) / viewSpan) * canvasWidth;
      if (x >= -2 && x <= canvasWidth + 2) {
        ctx.strokeStyle = "#f87171";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, WAVEFORM_HEIGHT);
        ctx.stroke();
      }

      if (timeLabelRef.current) timeLabelRef.current.textContent = formatTime(time);
      if (frameLabelRef.current) frameLabelRef.current.textContent = `${toFrame(time)}f`;

      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [canvasWidth, viewSpan, viewStart]);

  const onWaveClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const ratio = (event.clientX - rect.left) / rect.width;
      seekTo(viewStart + ratio * viewSpan);
    },
    [seekTo, viewSpan, viewStart],
  );

  // ---------- save / export ----------
  const buildPayload = useCallback((): OverrideEntry[] => meaningfulOverrides, [meaningfulOverrides]);

  const save = useCallback(async () => {
    setSaveMessage("保存中...");
    try {
      const res = await fetch("/api/timing/save-overrides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload()),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string; count?: number };
      if (!res.ok || !json.ok) throw new Error(json.error ?? `HTTP ${res.status}`);
      setSavedOverrides(overrides);
      setSaveMessage(`保存しました (${json.count}件)`);
    } catch (error) {
      setSaveMessage(`保存に失敗しました: ${String(error)} — 下のダウンロードを使ってください。`);
    }
  }, [buildPayload, overrides]);

  const download = useCallback(() => {
    const blob = new Blob([JSON.stringify(buildPayload(), null, 2) + "\n"], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "word-accent-map.manual-overrides.local.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [buildPayload]);

  const generatePrompt = useCallback(() => {
    const lines: string[] = [
      "以下のphrase/word timingを人間が聴取確認し修正しました。sync scriptとgenerated.tsへ反映してください。",
      "",
      "参照: motion-studio/local/word-accent-map.manual-overrides.local.json (HUMAN_SELECTED。beat-snapped値より優先)",
      "",
    ];
    for (const entry of meaningfulOverrides) {
      const phrase = phrases.find((p) => p.phraseId === entry.phraseId);
      const marks: string[] = [];
      if (entry.verifiedByListening) marks.push("聴取確認済み");
      if (entry.word === null) {
        const startChanged = entry.manualStartSec != null;
        const endChanged = entry.manualEndSec != null;
        if (!startChanged && !endChanged && marks.length === 0 && !entry.reviewComment) continue;
        const parts: string[] = [];
        if (startChanged) parts.push(`startSec ${phrase?.startSec ?? "?"} → ${entry.manualStartSec}`);
        if (endChanged) parts.push(`endSec ${phrase?.endSec ?? "?"} → ${entry.manualEndSec}`);
        lines.push(
          `${entry.phraseId} 「${phrase?.text ?? ""}」: ${parts.join(" / ") || "範囲変更なし"}` +
            (marks.length ? ` (${marks.join(", ")})` : ""),
        );
      } else {
        const word = words.find((w) => w.phraseId === entry.phraseId && w.word === entry.word);
        if (!word) continue;
        const before = word.accentSec;
        const after = effectiveAccent(word);
        const changed = Math.abs(after - before) > 1e-6;
        if (!changed && marks.length === 0 && !entry.reviewComment) continue;
        lines.push(
          `${entry.phraseId} 「${entry.word}」: accentSec ${before.toFixed(2)} → ${after.toFixed(2)}` +
            ` (${toFrame(after) - toFrame(before)}frame)` +
            (marks.length ? ` (${marks.join(", ")})` : ""),
        );
      }
      if (entry.reviewComment.trim()) lines.push(`    コメント: ${entry.reviewComment.trim()}`);
    }
    if (meaningfulOverrides.length === 0) lines.push("(このセッションでの修正はありません)");
    setPromptText(lines.join("\n"));
  }, [effectiveAccent, meaningfulOverrides, phrases, words]);

  const zoomTo = useCallback(
    (span: number) => {
      const audio = audioRef.current;
      const center = audio ? audio.currentTime : viewStart + viewSpan / 2;
      const nextSpan = Math.min(span, sourceEndSec || span);
      setViewSpan(nextSpan);
      setViewStart(Math.max(0, Math.min(center - nextSpan / 2, Math.max(0, (sourceEndSec || nextSpan) - nextSpan))));
    },
    [sourceEndSec, viewSpan, viewStart],
  );

  const activePhrase = phrases.find((p) => p.phraseId === activePhraseId) ?? null;

  return (
    <div>
      <Header
        title="歌詞タイミング調整"
        description="実音を聴いて、word accentとphrase範囲を人間の耳で直す。検出beatは参考であり、正解ではない。"
      />

      {loadError && (
        <div className="mb-4 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-700 dark:bg-red-950 dark:text-red-200">
          ローカル素材を読み込めませんでした: {loadError}
          <div className="mt-1 text-xs">
            <code>motion-studio/local/</code> に lyrics / word-accent-map / beat-map / audio があるか確認してください。
          </div>
        </div>
      )}

      <div className="mb-4 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-xs text-amber-900 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-100">
        現在の <code>accentSec</code> は Palmier のbeat検出結果へsnapした値で、
        <strong>歌の実際の立ち上がり(vocal onset)ではありません</strong>。
        ドラムのbeatと声の出だしは別の瞬間です。ここで聴いて直した値が正本(HUMAN_SELECTED)になります。
        元ファイルは上書きせず、<code>word-accent-map.manual-overrides.local.json</code> へ別レイヤーとして保存します。
      </div>

      {/* 終了位置確認(145.6秒問題) */}
      <SectionCard title="終了位置確認(2番後の間奏が終わる位置)" className="mb-6">
        <div
          className={`mb-3 rounded-md border px-3 py-2 text-xs ${
            endConfirmed
              ? "border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-700 dark:bg-emerald-950 dark:text-emerald-100"
              : "border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-100"
          }`}
        >
          {endConfirmed ? (
            <>✅ 人間が確定済み ({endVerificationMethod})</>
          ) : (
            <>
              ⚠️ 現在値は波形解析による<strong>推定</strong>です(verifiedByListening=false)。
              人間が実際に聴いて「この位置で確定」を押すまで、この秒数を本仕様にしません。
            </>
          )}
        </div>
        <div className="flex flex-wrap items-end gap-4 text-xs">
          <label className="flex flex-col gap-1">
            最終frame(終了位置) 秒
            <div className="flex items-center gap-1">
              <button className={btnClass} onClick={() => setEndDraftEnd((v) => v - 3 / FPS)}>
                -3f
              </button>
              <button className={btnClass} onClick={() => setEndDraftEnd((v) => v - 1 / FPS)}>
                -1f
              </button>
              <input
                type="number"
                step={0.001}
                className="w-24 rounded border px-2 py-1 dark:bg-gray-800"
                value={endDraftEnd.toFixed(3)}
                onChange={(e) => setEndDraftEnd(Number(e.target.value))}
              />
              <button className={btnClass} onClick={() => setEndDraftEnd((v) => v + 1 / FPS)}>
                +1f
              </button>
              <button className={btnClass} onClick={() => setEndDraftEnd((v) => v + 3 / FPS)}>
                +3f
              </button>
              <button className={btnClass} onClick={() => setEndDraftEnd((v) => v - 0.05)}>
                -50ms
              </button>
              <button className={btnClass} onClick={() => setEndDraftEnd((v) => v + 0.05)}>
                +50ms
              </button>
            </div>
          </label>
          <label className="flex flex-col gap-1">
            fade開始位置 秒
            <input
              type="number"
              step={0.01}
              className="w-24 rounded border px-2 py-1 dark:bg-gray-800"
              value={endDraftFadeStart.toFixed(3)}
              onChange={(e) => setEndDraftFadeStart(Number(e.target.value))}
            />
          </label>
          <label className="flex flex-col gap-1">
            fade長さ 秒
            <input
              type="number"
              step={0.01}
              className="w-20 rounded border px-2 py-1 dark:bg-gray-800"
              value={endDraftFadeDur.toFixed(3)}
              onChange={(e) => setEndDraftFadeDur(Number(e.target.value))}
            />
          </label>
          <button className={btnClass} onClick={loopEndCandidate}>
            この付近をループ再生
          </button>
          <button className={btnClass} onClick={() => seekTo(endDraftEnd)}>
            この位置へシーク
          </button>
        </div>
        <label className="mt-2 flex flex-col gap-1 text-xs">
          コメント(任意)
          <input
            type="text"
            className="w-full rounded border px-2 py-1 dark:bg-gray-800"
            value={endComment}
            onChange={(e) => setEndComment(e.target.value)}
            placeholder="例: 145.6sで切ると次のI canの頭が少し被る気がする"
          />
        </label>
        <div className="mt-3 flex items-center gap-3">
          <button
            className="rounded bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
            disabled={endSaving}
            onClick={() => void confirmEndPosition()}
          >
            {endSaving ? "保存中…" : "この位置で確定"}
          </button>
          {endSaveMessage && <span className="text-xs text-gray-600 dark:text-gray-300">{endSaveMessage}</span>}
        </div>
      </SectionCard>

      {/* transport */}
      <SectionCard title="再生とマーカー" className="mb-6">
        <audio
          ref={audioRef}
          src="/api/timing/audio"
          preload="metadata"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="hidden"
        />
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={togglePlay}
            className="px-4 py-2 rounded-lg bg-navy-700 text-white text-sm font-semibold hover:bg-navy-600"
          >
            {isPlaying ? "⏸ 停止" : "▶ 再生"}
          </button>
          <div className="font-mono text-sm text-navy-800 dark:text-sand-100">
            <span ref={timeLabelRef}>0:00.000</span>
            <span className="mx-2 text-navy-300">/</span>
            <span ref={frameLabelRef}>0f</span>
            <span className="ml-2 text-xs text-navy-400">(30fps)</span>
          </div>

          <div className="flex items-center gap-1">
            {[0.5, 0.75, 1].map((r) => (
              <button
                key={r}
                onClick={() => setRate(r)}
                className={`px-2.5 py-1 text-xs rounded border ${
                  rate === r
                    ? "bg-navy-700 text-white border-navy-700"
                    : "border-sand-300 text-navy-600 dark:border-navy-600 dark:text-navy-200"
                }`}
              >
                {r}x
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <button onClick={() => nudge(-0.05)} className="px-2.5 py-1 text-xs rounded border border-sand-300 dark:border-navy-600 dark:text-navy-200">
              −50ms
            </button>
            <button onClick={() => nudge(-FRAME_SEC)} className="px-2.5 py-1 text-xs rounded border border-sand-300 dark:border-navy-600 dark:text-navy-200">
              −1f
            </button>
            <button onClick={() => nudge(FRAME_SEC)} className="px-2.5 py-1 text-xs rounded border border-sand-300 dark:border-navy-600 dark:text-navy-200">
              +1f
            </button>
            <button onClick={() => nudge(0.05)} className="px-2.5 py-1 text-xs rounded border border-sand-300 dark:border-navy-600 dark:text-navy-200">
              +50ms
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setLoopStart(Number(getTime().toFixed(3)))}
              className="px-2.5 py-1 text-xs rounded border border-sand-300 dark:border-navy-600 dark:text-navy-200"
            >
              ここでループ開始
            </button>
            <button
              onClick={() => setLoopEnd(Number(getTime().toFixed(3)))}
              className="px-2.5 py-1 text-xs rounded border border-sand-300 dark:border-navy-600 dark:text-navy-200"
            >
              ここでループ終了
            </button>
            <button
              onClick={toggleLoop}
              className={`px-2.5 py-1 text-xs rounded border ${
                loopEnabled ? "bg-amber-400 text-navy-900 border-amber-400" : "border-sand-300 dark:border-navy-600 dark:text-navy-200"
              }`}
            >
              ループ {loopEnabled ? "ON" : "OFF"} (R)
            </button>
            <span className="text-xs text-navy-400">
              {loopStart != null && loopEnd != null
                ? `${formatTime(loopStart)} – ${formatTime(loopEnd)}`
                : "範囲未設定"}
            </span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-navy-500 dark:text-navy-300">表示範囲:</span>
          {[
            { label: "全体", span: sourceEndSec },
            { label: "30秒", span: 30 },
            { label: "10秒", span: 10 },
            { label: "4秒", span: 4 },
          ].map((z) => (
            <button
              key={z.label}
              onClick={() => zoomTo(z.span)}
              className="px-2.5 py-1 rounded border border-sand-300 text-navy-600 dark:border-navy-600 dark:text-navy-200"
            >
              {z.label}
            </button>
          ))}
          <button
            onClick={() => setViewStart(Math.max(0, viewStart - viewSpan / 2))}
            className="px-2.5 py-1 rounded border border-sand-300 text-navy-600 dark:border-navy-600 dark:text-navy-200"
          >
            ← 前へ
          </button>
          <button
            onClick={() => setViewStart(Math.min(Math.max(0, sourceEndSec - viewSpan), viewStart + viewSpan / 2))}
            className="px-2.5 py-1 rounded border border-sand-300 text-navy-600 dark:border-navy-600 dark:text-navy-200"
          >
            次へ →
          </button>
          <span className="text-navy-400">
            {formatTime(viewStart)} – {formatTime(viewStart + viewSpan)} / 全長 {formatTime(sourceEndSec)}
          </span>
        </div>

        <div ref={waveWrapRef} className="mt-3 relative cursor-crosshair select-none" onClick={onWaveClick}>
          <canvas
            ref={baseCanvasRef}
            style={{ width: "100%", height: `${WAVEFORM_HEIGHT}px`, display: "block", borderRadius: "8px" }}
          />
          <canvas
            ref={overlayCanvasRef}
            style={{
              width: "100%",
              height: `${WAVEFORM_HEIGHT}px`,
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
            }}
          />
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-4 text-[11px] text-navy-500 dark:text-navy-300">
          <span className="flex items-center gap-1">
            <span className="inline-block w-3 h-0.5 bg-slate-400" />
            検出beat(参考、これに合わせる必要はない)
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full" style={{ background: "#f472b6" }} />
            未確認
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full" style={{ background: "#4ade80" }} />
            聴取確認済み
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full" style={{ background: "#fbbf24" }} />
            編集済み未保存
          </span>
          <span className="text-navy-400">波形クリックでその位置へシーク</span>
          {waveStatus === "decoding" && <span className="text-navy-400">波形デコード中...</span>}
          {waveStatus === "error" && <span className="text-red-500">波形エラー: {waveError}</span>}
        </div>
      </SectionCard>

      {(() => {
        const confirmedCount = phrases.filter((p) => {
          const entry = overrides[keyOf(p.phraseId, null)];
          return !p.humanReviewRequired || entry?.verifiedByListening;
        }).length;
        const allConfirmed = confirmedCount === phrases.length && phrases.length > 0;
        const goToNextUnconfirmed = () => {
          const startIdx = activePhraseId ? phrases.findIndex((p) => p.phraseId === activePhraseId) + 1 : 0;
          const ordered = [...phrases.slice(startIdx), ...phrases.slice(0, startIdx)];
          const next = ordered.find((p) => {
            const entry = overrides[keyOf(p.phraseId, null)];
            return p.humanReviewRequired && !entry?.verifiedByListening;
          });
          if (next) focusPhrase(next);
        };
        return (
          <div
            className={`mb-4 flex items-center justify-between rounded-lg border px-4 py-2 text-sm ${
              allConfirmed
                ? "border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-700 dark:bg-emerald-950 dark:text-emerald-100"
                : "border-sand-300 bg-sand-50 text-navy-800 dark:border-navy-600 dark:bg-navy-800 dark:text-sand-100"
            }`}
          >
            <span>
              {allConfirmed ? "✅ 全phrase 聴取確認済み(同期完了)" : `確認進捗: ${confirmedCount} / ${phrases.length}件 確認済み`}
            </span>
            {!allConfirmed && (
              <button className={btnClass} onClick={goToNextUnconfirmed}>
                次の未確認phraseへ →
              </button>
            )}
          </div>
        );
      })()}

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-6">
        {/* phrase list */}
        <SectionCard title={`Phrase / Word (${phrases.length}件)`}>
          {loading && <p className="text-sm text-navy-500">読み込み中...</p>}
          <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
            {phrases.map((phrase) => {
              const range = effectivePhraseRange(phrase);
              const phraseEntry = overrides[keyOf(phrase.phraseId, null)];
              const phraseDirty = dirtyKeys.has(keyOf(phrase.phraseId, null));
              const list = wordsByPhrase.get(phrase.phraseId) ?? [];
              const isActive = phrase.phraseId === activePhraseId;
              return (
                <div
                  key={phrase.phraseId}
                  className={`rounded-lg border p-3 ${
                    isActive
                      ? "border-sky-400 bg-sky-50 dark:bg-navy-700 dark:border-sky-500"
                      : "border-sand-200 dark:border-navy-600"
                  }`}
                >
                  <button onClick={() => focusPhrase(phrase)} className="w-full text-left">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="text-xs font-mono text-navy-400">{phrase.phraseId}</span>
                      <span className="text-sm font-semibold text-navy-800 dark:text-sand-100">{phrase.text}</span>
                      <span className="text-xs font-mono text-navy-400">
                        {range.start.toFixed(2)}s – {range.end.toFixed(2)}s
                      </span>
                      {phraseDirty && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-200 text-amber-900">未保存</span>
                      )}
                      {phrase.humanReviewRequired && !phraseEntry?.verifiedByListening && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-200 text-rose-900">要確認</span>
                      )}
                    </div>
                  </button>

                  {isActive && (
                    <div className="mt-2 flex flex-wrap gap-2 text-xs">
                      <button
                        onClick={() => setPhraseBoundary("start")}
                        className="px-2 py-1 rounded border border-sand-300 dark:border-navy-500 dark:text-navy-100"
                      >
                        [ 開始をここに
                      </button>
                      <button
                        onClick={() => setPhraseBoundary("end")}
                        className="px-2 py-1 rounded border border-sand-300 dark:border-navy-500 dark:text-navy-100"
                      >
                        ] 終了をここに
                      </button>
                      <button
                        onClick={() => {
                          setLoopStart(range.start);
                          setLoopEnd(range.end);
                          setLoopEnabled(true);
                        }}
                        className="px-2 py-1 rounded border border-sand-300 dark:border-navy-500 dark:text-navy-100"
                      >
                        この範囲をループ
                      </button>
                    </div>
                  )}

                  {list.length === 0 ? (
                    <p className="mt-2 text-xs text-navy-400">このphraseにはword accentがありません。</p>
                  ) : (
                    <div className="mt-2 space-y-2">
                      {list.map((word, index) => {
                        const key = keyOf(word.phraseId, word.word);
                        const entry = overrides[key];
                        const dirty = dirtyKeys.has(key);
                        const verified = entry?.verifiedByListening ?? false;
                        const current = effectiveAccent(word);
                        const isActiveWord = key === activeWordKey;
                        return (
                          <div
                            key={key}
                            className={`rounded border px-2 py-2 ${
                              isActiveWord
                                ? "border-sky-400 dark:border-sky-500"
                                : "border-sand-200 dark:border-navy-600"
                            } ${dirty ? "bg-amber-50 dark:bg-amber-950/30" : verified ? "bg-emerald-50 dark:bg-emerald-950/20" : ""}`}
                            onClick={() => {
                              setActiveWordKey(key);
                              setActivePhraseId(word.phraseId);
                            }}
                          >
                            <div className="flex flex-wrap items-center gap-2">
                              {isActive && index < 4 && (
                                <span className="text-[10px] font-mono px-1 rounded bg-navy-700 text-white">
                                  {index + 1}
                                </span>
                              )}
                              <span className="text-sm text-navy-800 dark:text-sand-100">{word.word}</span>
                              <span className="text-xs font-mono text-navy-500 dark:text-navy-300">
                                {current.toFixed(3)}s / {toFrame(current)}f
                              </span>
                              {entry?.manualAccentSec != null && (
                                <span className="text-[10px] text-navy-400">
                                  元 {word.accentSec.toFixed(2)}s (beat-snapped)
                                </span>
                              )}
                              <button
                                onClick={() => setWordToCurrentTime(word)}
                                className="px-2 py-0.5 text-xs rounded bg-navy-700 text-white hover:bg-navy-600"
                              >
                                現在地点をここに設定
                              </button>
                              <button
                                onClick={() => seekTo(current)}
                                className="px-2 py-0.5 text-xs rounded border border-sand-300 dark:border-navy-500 dark:text-navy-100"
                              >
                                ここへシーク
                              </button>
                            </div>
                            <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs">
                              <label className="flex items-center gap-1 text-navy-600 dark:text-navy-200">
                                微調整(frame)
                                <input
                                  type="number"
                                  step={1}
                                  value={entry?.manualOffsetFrames ?? 0}
                                  onChange={(e) =>
                                    patchEntry(word.phraseId, word.word, {
                                      manualOffsetFrames: Number(e.target.value) || 0,
                                    })
                                  }
                                  className="w-16 px-1 py-0.5 rounded border border-sand-300 dark:bg-navy-800 dark:border-navy-500 dark:text-sand-100"
                                />
                              </label>
                              <label className="flex items-center gap-1 text-navy-600 dark:text-navy-200">
                                秒を直接
                                <input
                                  type="number"
                                  step={0.01}
                                  value={entry?.manualAccentSec ?? ""}
                                  placeholder={word.accentSec.toFixed(2)}
                                  onChange={(e) =>
                                    patchEntry(word.phraseId, word.word, {
                                      manualAccentSec: e.target.value === "" ? null : Number(e.target.value),
                                    })
                                  }
                                  className="w-20 px-1 py-0.5 rounded border border-sand-300 dark:bg-navy-800 dark:border-navy-500 dark:text-sand-100"
                                />
                              </label>
                              <label className="flex items-center gap-1 text-navy-600 dark:text-navy-200">
                                <input
                                  type="checkbox"
                                  checked={verified}
                                  onChange={(e) =>
                                    patchEntry(word.phraseId, word.word, { verifiedByListening: e.target.checked })
                                  }
                                />
                                聴取確認済み
                              </label>
                              <input
                                type="text"
                                value={entry?.reviewComment ?? ""}
                                placeholder="コメント (例: 低音で聞き取りにくい)"
                                onChange={(e) =>
                                  patchEntry(word.phraseId, word.word, { reviewComment: e.target.value })
                                }
                                className="flex-1 min-w-[160px] px-2 py-0.5 rounded border border-sand-300 dark:bg-navy-800 dark:border-navy-500 dark:text-sand-100"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </SectionCard>

        {/* side panel */}
        <div className="space-y-6">
          <SectionCard title="キーボード操作">
            <ul className="space-y-1.5 text-xs">
              {SHORTCUTS.map((s) => (
                <li key={s.keys} className="flex gap-2">
                  <code className="shrink-0 px-1.5 py-0.5 rounded bg-sand-100 text-navy-700 dark:bg-navy-700 dark:text-sand-100">
                    {s.keys}
                  </code>
                  <span className="text-navy-600 dark:text-navy-200">{s.desc}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[11px] text-navy-400">
              入力欄にフォーカスがある間はショートカットは無効になります。
            </p>
            {activePhrase && (
              <div className="mt-3 rounded border border-sky-300 bg-sky-50 p-2 text-xs dark:border-sky-700 dark:bg-navy-700">
                <p className="font-semibold text-navy-800 dark:text-sand-100">選択中: {activePhrase.phraseId}</p>
                <p className="text-navy-600 dark:text-navy-200">{activePhrase.text}</p>
                <p className="mt-1 text-navy-500 dark:text-navy-300">
                  1〜4 →{" "}
                  {(wordsByPhrase.get(activePhrase.phraseId) ?? [])
                    .slice(0, 4)
                    .map((w, i) => `${i + 1}:${w.word}`)
                    .join(" / ") || "単語なし"}
                </p>
              </div>
            )}
          </SectionCard>

          <SectionCard title="保存 / 書き出し">
            <div className="space-y-2">
              <div className="text-xs text-navy-600 dark:text-navy-200">
                未保存の変更: <strong>{dirtyKeys.size}</strong> 件 / override合計 {meaningfulOverrides.length} 件
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => void save()}
                  className="px-3 py-1.5 rounded bg-navy-700 text-white text-sm hover:bg-navy-600"
                >
                  保存
                </button>
                <button
                  onClick={undo}
                  disabled={history.length === 0}
                  className="px-3 py-1.5 rounded border border-sand-300 text-sm disabled:opacity-40 dark:border-navy-500 dark:text-navy-100"
                >
                  ↩ Undo ({history.length})
                </button>
                <button
                  onClick={() => void loadData(false)}
                  className="px-3 py-1.5 rounded border border-sand-300 text-sm dark:border-navy-500 dark:text-navy-100"
                >
                  Reset (保存済みへ戻す)
                </button>
              </div>
              <button
                onClick={download}
                className="w-full px-3 py-1.5 rounded border border-sand-300 text-sm dark:border-navy-500 dark:text-navy-100"
              >
                JSONをダウンロード
              </button>
              <p className="text-[11px] text-navy-500 dark:text-navy-300">
                保存できない場合はダウンロードし、
                <code>motion-studio/local/word-accent-map.manual-overrides.local.json</code> として配置してください。
              </p>
              {saveMessage && <p className="text-xs text-navy-700 dark:text-sand-100">{saveMessage}</p>}
            </div>
          </SectionCard>

          <SectionCard title="修正プロンプト">
            <button
              onClick={generatePrompt}
              className="px-3 py-1.5 rounded border border-sand-300 text-sm dark:border-navy-500 dark:text-navy-100"
            >
              修正プロンプトを生成
            </button>
            <textarea
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              rows={10}
              placeholder="生成するとここに出ます。コピーしてClaude / Codexへ渡してください。"
              className="mt-2 w-full text-[11px] font-mono px-2 py-1.5 rounded border border-sand-300 dark:bg-navy-800 dark:border-navy-500 dark:text-sand-100"
            />
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
