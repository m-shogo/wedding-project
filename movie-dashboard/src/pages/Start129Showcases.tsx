import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Header } from "../components/Header";
import {
  START_129_SECTIONS,
  START_129_SHOWCASES,
  START_129_TECHNIQUES,
  START_129_TECHNIQUE_STATUS_LABELS,
  type Start129ShowcaseId,
  type Start129TechniqueStatus,
} from "../data/start129Showcases";
import {
  readStart129Comments,
  readStart129ReviewDecisions,
  writeStart129Comments,
  writeStart129ReviewDecisions,
  type Start129Comment,
  type Start129ReviewDecision,
} from "../data/start129HumanReview";

const VIDEO_BASE = "/local-start-render/start-129";

const decisionLabels: Record<Start129ReviewDecision, string> = {
  favorite: "気に入った",
  maybe: "保留",
  reject: "使わない",
};
const decisionClasses: Record<Start129ReviewDecision, string> = {
  favorite: "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  maybe: "border-amber-500 bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  reject: "border-red-500 bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300",
};
const statusClasses: Record<Start129TechniqueStatus, string> = {
  ISOLATED: "border-navy-300 text-navy-500 dark:border-navy-600 dark:text-navy-300",
  CONTEXT_TESTED: "border-sky-400 text-sky-700 dark:border-sky-600 dark:text-sky-300",
  FULL_TIMELINE_TESTED: "border-indigo-400 text-indigo-700 dark:border-indigo-600 dark:text-indigo-300",
  VISUALLY_VERIFIED: "border-emerald-400 text-emerald-700 dark:border-emerald-600 dark:text-emerald-300",
  PRODUCTION_READY: "border-amber-500 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200",
};

const fmt = (sec: number) => {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
};

type Mode = "clean" | "guide";

export function Start129Showcases() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [variant, setVariant] = useState<Start129ShowcaseId>("A");
  const [mode, setMode] = useState<Mode>("clean");
  const [time, setTime] = useState(0);
  const [videoMissing, setVideoMissing] = useState(false);
  const [compare, setCompare] = useState(false);

  const [decisions, setDecisions] = useState<Record<string, Start129ReviewDecision>>(readStart129ReviewDecisions);
  const [comments, setComments] = useState<Start129Comment[]>(readStart129Comments);
  const [draft, setDraft] = useState("");
  const [copied, setCopied] = useState(false);

  const src = `${VIDEO_BASE}/start129_${variant}_${mode}.mp4`;

  // 案やモードを切り替えても同じtimecodeを維持する
  const switchTo = useCallback((v: Start129ShowcaseId, m: Mode) => {
    const t = videoRef.current?.currentTime ?? 0;
    setVariant(v);
    setMode(m);
    window.requestAnimationFrame(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = t;
        void videoRef.current.play().catch(() => undefined);
      }
    });
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const onTime = () => setTime(el.currentTime);
    el.addEventListener("timeupdate", onTime);
    return () => el.removeEventListener("timeupdate", onTime);
  }, []);

  const seek = (sec: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = sec;
      setTime(sec);
    }
  };

  const currentSection = useMemo(
    () => START_129_SECTIONS.find((s) => time >= s.startSec && time < s.endSec) ?? START_129_SECTIONS[0],
    [time],
  );
  const currentTechniques = useMemo(
    () => START_129_TECHNIQUES.filter((t) => t.showcase === variant),
    [variant],
  );

  const setDecision = (id: string, d: Start129ReviewDecision | undefined) => {
    setDecisions((prev) => {
      const next = { ...prev };
      if (d) next[id] = d;
      else delete next[id];
      writeStart129ReviewDecisions(next);
      return next;
    });
  };

  const addComment = () => {
    if (!draft.trim()) return;
    const next: Start129Comment[] = [
      ...comments,
      {
        id: crypto.randomUUID(),
        targetId: `${variant}@${time.toFixed(1)}s:${currentSection.id}`,
        text: draft.trim(),
        createdAt: new Date().toISOString(),
      },
    ];
    setComments(next);
    writeStart129Comments(next);
    setDraft("");
  };

  const buildPrompt = () => {
    const favS = START_129_SECTIONS.filter((s) => decisions[`section:${s.id}`] === "favorite");
    const rejS = START_129_SECTIONS.filter((s) => decisions[`section:${s.id}`] === "reject");
    const favT = START_129_TECHNIQUES.filter((t) => decisions[`technique:${t.id}`] === "favorite");
    const rejT = START_129_TECHNIQUES.filter((t) => decisions[`technique:${t.id}`] === "reject");
    const favV = (["A", "B", "C"] as const).filter((v) => decisions[`variant:${v}`] === "favorite");

    const L: string[] = [
      "motion-studio の StaRt 129秒 3案(A/B/C)について、次のレビュー結果を踏まえて修正してください。",
      "実装の設計source は motion-studio/src/data/start129/storyboard.ts です。",
      "",
    ];
    if (favV.length) L.push(`採用したい案: ${favV.map((v) => `${v}案`).join(", ")}`);
    if (favS.length) L.push(`気に入った区間: ${favS.map((s) => `${s.labelJa}(${fmt(s.startSec)}-${fmt(s.endSec)})`).join(", ")}`);
    if (rejS.length) L.push(`直したい区間: ${rejS.map((s) => `${s.labelJa}(${fmt(s.startSec)}-${fmt(s.endSec)})`).join(", ")}`);
    if (favT.length) L.push(`気に入った演出: ${favT.map((t) => `${t.nameJa}(${t.showcase}案)`).join(", ")}`);
    if (rejT.length) L.push(`使わない演出: ${rejT.map((t) => `${t.nameJa}(${t.showcase}案)`).join(", ")}`);
    if (comments.length) {
      L.push("", "時刻つきコメント:");
      for (const c of comments) L.push(`- [${c.targetId}] ${c.text}`);
    }
    L.push(
      "",
      "制約:",
      "- 正規歌詞・音源・本人写真が未投入のため WEDDING_FINAL_BLOCKED を維持すること",
      "- pnpm check:start-129-storyboard / qa:start-129-video を通すこと",
      "- 参照: docs/decisions/2026-08-25-start-129-rebuild-root-cause.md",
    );
    return L.join("\n");
  };

  const copyPrompt = async () => {
    await navigator.clipboard.writeText(buildPrompt());
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const summary = useMemo(() => {
    const v = Object.values(decisions);
    return {
      favorite: v.filter((x) => x === "favorite").length,
      maybe: v.filter((x) => x === "maybe").length,
      reject: v.filter((x) => x === "reject").length,
    };
  }, [decisions]);

  const DecisionRow = ({ targetId }: { targetId: string }) => (
    <div className="flex gap-1">
      {(Object.keys(decisionLabels) as Start129ReviewDecision[]).map((d) => (
        <button
          key={d}
          onClick={() => setDecision(targetId, decisions[targetId] === d ? undefined : d)}
          className={`px-2 py-0.5 text-[10px] border rounded ${
            decisions[targetId] === d
              ? decisionClasses[d]
              : "border-navy-200 text-navy-400 dark:border-navy-600 dark:text-navy-400"
          }`}
        >
          {decisionLabels[d]}
        </button>
      ))}
    </div>
  );

  return (
    <div>
      <Header
        title="StaRt 129秒・3案比較"
        description="A/B/Cを実際に再生して見比べ、時刻つきでコメントし、修正promptを出すレビュー画面"
      />

      {/* 状態バナー: 正規歌詞・音源が無いことを常に明示 */}
      <section className="mb-4 border-2 border-red-400 bg-red-50 dark:bg-red-900/20 p-3">
        <p className="text-[10px] tracking-[0.2em] font-bold text-red-700 dark:text-red-300">
          WEDDING_FINAL_BLOCKED
        </p>
        <p className="mt-1 text-xs text-red-800 dark:text-red-200">
          正規歌詞・正規音源・本人写真がまだ入っていません。現在の3本は<strong>演出比較用のDEMO</strong>で、
          歌詞は「歌詞スロットNN」の仮表示、音声は無音です。本番判断には使えません。
          必要な投入手順は <code>pnpm check:start-129-final-gate</code> が表示します。
        </p>
      </section>

      <section className="mb-5 border-2 border-sky-300 dark:border-sky-700 bg-sky-50 dark:bg-sky-900/20 p-4">
        <p className="text-[10px] tracking-[0.2em] font-semibold text-sky-700 dark:text-sky-300">次にすること</p>
        <p className="mt-1 text-sm text-sky-900 dark:text-sky-200">
          下のプレイヤーで<strong>A / B / C を最後まで見て、好きな案を1つ選ぶ</strong>。
          気になった瞬間で一時停止し、その時刻にコメントを残してください。
        </p>
      </section>

      {/* プレイヤー */}
      <section className="mb-5 border border-navy-200 dark:border-navy-700 bg-white dark:bg-navy-800 p-4">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {(["A", "B", "C"] as const).map((v) => (
            <button
              key={v}
              onClick={() => switchTo(v, mode)}
              className={`px-3 py-1.5 text-xs border rounded ${
                variant === v
                  ? "border-navy-700 bg-navy-700 text-white dark:border-sand-300 dark:bg-sand-300 dark:text-navy-900"
                  : "border-navy-300 text-navy-600 dark:border-navy-600 dark:text-navy-300"
              }`}
            >
              {v}案 {START_129_SHOWCASES.find((s) => s.id === v)?.nameJa}
            </button>
          ))}
          <span className="mx-2 text-navy-300">|</span>
          {(["clean", "guide"] as const).map((m) => (
            <button
              key={m}
              onClick={() => switchTo(variant, m)}
              className={`px-3 py-1.5 text-xs border rounded ${
                mode === m
                  ? "border-sky-600 bg-sky-600 text-white"
                  : "border-navy-300 text-navy-600 dark:border-navy-600 dark:text-navy-300"
              }`}
            >
              {m === "clean" ? "完成映像" : "解説付き"}
            </button>
          ))}
          <span className="mx-2 text-navy-300">|</span>
          <button
            onClick={() => setCompare((c) => !c)}
            className={`px-3 py-1.5 text-xs border rounded ${
              compare ? "border-emerald-600 bg-emerald-600 text-white" : "border-navy-300 text-navy-600 dark:text-navy-300"
            }`}
          >
            {compare ? "比較表示 ON" : "A/B/C 並べて比較"}
          </button>
        </div>

        {videoMissing ? (
          <div className="border border-amber-400 bg-amber-50 dark:bg-amber-900/20 p-5 text-sm text-amber-900 dark:text-amber-100">
            <p className="font-bold mb-2">動画がまだ書き出されていません</p>
            <p className="mb-3">motion-studio で次を実行してください。</p>
            <pre className="bg-navy-900 text-sand-100 p-3 text-xs overflow-x-auto rounded">{`cd motion-studio
pnpm render:start-129:demo      # 6本を129秒フルrender
pnpm sync:start-129-dashboard   # Dashboardへ同期`}</pre>
          </div>
        ) : compare ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {(["A", "B", "C"] as const).map((v) => (
              <div key={v}>
                <video
                  src={`${VIDEO_BASE}/start129_${v}_${mode}.mp4`}
                  className="w-full bg-black"
                  controls
                  muted
                  playsInline
                  onError={() => setVideoMissing(true)}
                />
                <p className="mt-1 text-[11px] text-navy-500 dark:text-navy-300">{v}案</p>
              </div>
            ))}
          </div>
        ) : (
          <video
            ref={videoRef}
            key={src}
            src={src}
            className="w-full bg-black"
            controls
            muted
            playsInline
            onError={() => setVideoMissing(true)}
          />
        )}

        {!compare && !videoMissing && (
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
            <span className="font-mono text-navy-500 dark:text-navy-300">
              {fmt(time)} / 2:09
            </span>
            <span className="px-2 py-0.5 border border-navy-300 rounded text-navy-600 dark:text-navy-300">
              {currentSection.labelJa}
            </span>
            <span className="text-navy-500 dark:text-navy-400">{currentSection.roleJa}</span>
            {currentSection.lyricSlotRange && (
              <span className="text-navy-400">
                歌詞 #{currentSection.lyricSlotRange[0]}–#{currentSection.lyricSlotRange[1]}
              </span>
            )}
          </div>
        )}
      </section>

      {/* 14区間 timeline: クリックでseek */}
      <section className="mb-5 border border-navy-200 dark:border-navy-700 bg-white dark:bg-navy-800 p-4">
        <h2 className="text-sm font-bold text-navy-900 dark:text-sand-100 mb-2">
          14区間タイムライン（クリックでその時刻へ移動）
        </h2>
        <div className="flex w-full h-9 rounded overflow-hidden border border-navy-200 dark:border-navy-700 mb-3">
          {START_129_SECTIONS.map((s) => {
            const active = time >= s.startSec && time < s.endSec;
            return (
              <button
                key={s.id}
                onClick={() => seek(s.startSec + 0.2)}
                title={`${s.labelJa} — ${s.roleJa}`}
                style={{ width: `${((s.endSec - s.startSec) / 129) * 100}%` }}
                className={`text-[9px] border-r border-white/20 last:border-r-0 truncate px-1 ${
                  active
                    ? "bg-sky-600 text-white font-bold"
                    : "bg-navy-100 text-navy-600 hover:bg-navy-200 dark:bg-navy-700 dark:text-navy-200 dark:hover:bg-navy-600"
                }`}
              >
                {s.labelJa}
              </button>
            );
          })}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <tbody>
              {START_129_SECTIONS.map((s) => (
                <tr key={s.id} className="border-b border-navy-100 dark:border-navy-800">
                  <td className="py-1.5 pr-2">
                    <button onClick={() => seek(s.startSec + 0.2)} className="font-mono text-sky-600 hover:underline">
                      {fmt(s.startSec)}–{fmt(s.endSec)}
                    </button>
                  </td>
                  <td className="py-1.5 pr-2 font-semibold text-navy-800 dark:text-sand-100">{s.labelJa}</td>
                  <td className="py-1.5 pr-2 text-navy-600 dark:text-navy-300">{s.roleJa}</td>
                  <td className="py-1.5 pr-2 text-navy-400">
                    {s.lyricSlotRange ? `#${s.lyricSlotRange[0]}–#${s.lyricSlotRange[1]}` : "—"}
                  </td>
                  <td className="py-1.5"><DecisionRow targetId={`section:${s.id}`} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 3案カード */}
      <section className="mb-5 grid grid-cols-1 md:grid-cols-3 gap-4">
        {START_129_SHOWCASES.map((sc) => (
          <div
            key={sc.id}
            className={`border p-4 bg-white dark:bg-navy-800 ${
              variant === sc.id ? "border-sky-500 ring-1 ring-sky-400" : "border-navy-200 dark:border-navy-700"
            }`}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-navy-900 dark:text-sand-100">{sc.id}案: {sc.nameJa}</h2>
              <span className="text-[10px] px-2 py-0.5 border border-navy-300 rounded text-navy-500 dark:text-navy-300">
                {sc.subtitleJa}
              </span>
            </div>
            <p className="mt-2 text-xs leading-5 text-navy-600 dark:text-navy-300">{sc.descriptionJa}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              {sc.keywordsJa.map((k) => (
                <span key={k} className="text-[10px] px-1.5 py-0.5 bg-navy-100 dark:bg-navy-700 text-navy-600 dark:text-navy-300 rounded">
                  {k}
                </span>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between">
              <button onClick={() => switchTo(sc.id, mode)} className="text-xs text-sky-600 hover:underline">
                この案を再生 ▶
              </button>
              <DecisionRow targetId={`variant:${sc.id}`} />
            </div>
          </div>
        ))}
      </section>

      {/* 現在の案で使っている演出 */}
      <section className="mb-5 border border-navy-200 dark:border-navy-700 bg-white dark:bg-navy-800 p-4">
        <h2 className="text-sm font-bold text-navy-900 dark:text-sand-100 mb-2">
          {variant}案で使っている演出
        </h2>
        <div className="space-y-2">
          {currentTechniques.map((t) => (
            <div key={t.id} className="border border-navy-100 dark:border-navy-700 p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-semibold text-sm text-navy-900 dark:text-sand-100">{t.nameJa}</span>
                <span className={`text-[10px] px-2 py-0.5 border rounded ${statusClasses[t.status]}`}>
                  {START_129_TECHNIQUE_STATUS_LABELS[t.status]}
                </span>
              </div>
              <p className="mt-1 text-xs text-navy-600 dark:text-navy-300">目的: {t.purposeJa}</p>
              <p className="mt-0.5 text-[11px] text-navy-400">向く: {t.goodForJa} / 避ける: {t.avoidWhenJa}</p>
              <p className="mt-0.5 text-[11px] font-mono text-navy-400">{t.componentRef}</p>
              <div className="mt-2"><DecisionRow targetId={`technique:${t.id}`} /></div>
            </div>
          ))}
        </div>
      </section>

      {/* コメント + 修正prompt */}
      <section className="mb-6 border border-navy-200 dark:border-navy-700 bg-white dark:bg-navy-800 p-4">
        <h2 className="text-sm font-bold text-navy-900 dark:text-sand-100 mb-2">
          レビュー: 気に入った{summary.favorite} / 保留{summary.maybe} / 使わない{summary.reject}
        </h2>
        <p className="text-[11px] text-navy-500 dark:text-navy-400 mb-2">
          コメントは<strong>今の再生位置（{variant}案 {fmt(time)} / {currentSection.labelJa}）</strong>に紐づきます。
        </p>
        <div className="flex gap-2 mb-3">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addComment()}
            placeholder="例: ここをもう少し長く / 文字を小さく"
            className="flex-1 border border-navy-300 dark:border-navy-600 bg-transparent px-2 py-1 text-xs rounded"
          />
          <button onClick={addComment} className="px-3 py-1 text-xs border border-navy-400 rounded text-navy-700 dark:text-navy-200">
            この時刻に追加
          </button>
        </div>
        {comments.length > 0 && (
          <ul className="mb-3 space-y-1 text-xs text-navy-600 dark:text-navy-300 max-h-56 overflow-y-auto">
            {comments.map((c) => {
              const m = /^([ABC])@([\d.]+)s/.exec(c.targetId);
              return (
                <li key={c.id} className="flex items-start gap-2">
                  {m ? (
                    <button
                      onClick={() => { switchTo(m[1] as Start129ShowcaseId, mode); seek(Number(m[2])); }}
                      className="font-mono text-sky-600 hover:underline shrink-0"
                    >
                      {m[1]}案 {fmt(Number(m[2]))}
                    </button>
                  ) : (
                    <span className="text-navy-400 shrink-0">—</span>
                  )}
                  <span>{c.text}</span>
                </li>
              );
            })}
          </ul>
        )}
        <button onClick={copyPrompt} className="px-3 py-1.5 text-xs border border-emerald-500 text-emerald-700 dark:text-emerald-300 rounded">
          {copied ? "コピーしました" : "Claude/Codexへの修正依頼をコピー"}
        </button>
      </section>
    </div>
  );
}
