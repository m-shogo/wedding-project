import { useMemo, useState } from "react";
import { Header } from "../components/Header";
import {
  START_129_ASSET_NOTE_JA,
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

const ALL = "ALL" as const;
type ShowcaseFilter = Start129ShowcaseId | typeof ALL;

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

function formatTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function DecisionButtons({
  targetId,
  decisions,
  onChange,
}: {
  targetId: string;
  decisions: Record<string, Start129ReviewDecision>;
  onChange: (id: string, decision: Start129ReviewDecision | undefined) => void;
}) {
  const current = decisions[targetId];
  return (
    <div className="flex gap-1">
      {(Object.keys(decisionLabels) as Start129ReviewDecision[]).map((d) => (
        <button
          key={d}
          onClick={() => onChange(targetId, current === d ? undefined : d)}
          className={`px-2 py-0.5 text-[10px] border rounded ${
            current === d ? decisionClasses[d] : "border-navy-200 text-navy-400 dark:border-navy-600 dark:text-navy-400"
          }`}
        >
          {decisionLabels[d]}
        </button>
      ))}
    </div>
  );
}

export function Start129Showcases() {
  const [decisions, setDecisions] = useState<Record<string, Start129ReviewDecision>>(readStart129ReviewDecisions);
  const [comments, setComments] = useState<Start129Comment[]>(readStart129Comments);
  const [commentDraft, setCommentDraft] = useState("");
  const [showcaseFilter, setShowcaseFilter] = useState<ShowcaseFilter>(ALL);
  const [copied, setCopied] = useState(false);

  const setDecision = (id: string, decision: Start129ReviewDecision | undefined) => {
    setDecisions((prev) => {
      const next = {...prev};
      if (decision) {
        next[id] = decision;
      } else {
        delete next[id];
      }
      writeStart129ReviewDecisions(next);
      return next;
    });
  };

  const addComment = () => {
    if (!commentDraft.trim()) return;
    const next: Start129Comment[] = [
      ...comments,
      {id: crypto.randomUUID(), targetId: "general", text: commentDraft.trim(), createdAt: new Date().toISOString()},
    ];
    setComments(next);
    writeStart129Comments(next);
    setCommentDraft("");
  };

  const filteredTechniques = useMemo(
    () => (showcaseFilter === ALL ? START_129_TECHNIQUES : START_129_TECHNIQUES.filter((t) => t.showcase === showcaseFilter)),
    [showcaseFilter],
  );

  const summaryCounts = useMemo(() => {
    const values = Object.values(decisions);
    return {
      favorite: values.filter((v) => v === "favorite").length,
      maybe: values.filter((v) => v === "maybe").length,
      reject: values.filter((v) => v === "reject").length,
    };
  }, [decisions]);

  const buildHandoffPrompt = () => {
    const favSections = START_129_SECTIONS.filter((s) => decisions[`section:${s.id}`] === "favorite");
    const rejSections = START_129_SECTIONS.filter((s) => decisions[`section:${s.id}`] === "reject");
    const favTechniques = START_129_TECHNIQUES.filter((t) => decisions[`technique:${t.id}`] === "favorite");
    const rejTechniques = START_129_TECHNIQUES.filter((t) => decisions[`technique:${t.id}`] === "reject");

    const lines: string[] = [];
    lines.push("motion-studio/src/compositions/start129/ のStaRt 129秒 3案ショーケースについて、次のレビュー結果を踏まえて修正してください。");
    lines.push("");
    if (favSections.length) {
      lines.push(`気に入った区間: ${favSections.map((s) => `${s.labelJa}(${formatTime(s.startSec)}-${formatTime(s.endSec)})`).join(", ")}`);
    }
    if (rejSections.length) {
      lines.push(`使わない区間: ${rejSections.map((s) => s.labelJa).join(", ")}`);
    }
    if (favTechniques.length) {
      lines.push(`気に入った演出: ${favTechniques.map((t) => `${t.nameJa}(${t.showcase}案)`).join(", ")}`);
    }
    if (rejTechniques.length) {
      lines.push(`使わない演出: ${rejTechniques.map((t) => `${t.nameJa}(${t.showcase}案)`).join(", ")}`);
    }
    if (comments.length) {
      lines.push("");
      lines.push("コメント:");
      for (const c of comments) {
        lines.push(`- ${c.text}`);
      }
    }
    lines.push("");
    lines.push("参照: docs/decisions/start-129-three-showcase-directions.md, docs/learning-entries/start-129-production-lessons.md");
    return lines.join("\n");
  };

  const copyPrompt = async () => {
    await navigator.clipboard.writeText(buildHandoffPrompt());
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div>
      <Header
        title="StaRt 129秒・3案比較"
        description="曲頭〜129秒を、旅の記録映画/冒険アニメOP/リズム・タイポMVの3案として比較するレビュー画面"
      />

      <section className="mb-5 border-2 border-sky-300 dark:border-sky-700 bg-sky-50 dark:bg-sky-900/20 p-4">
        <p className="text-[10px] tracking-[0.2em] font-semibold text-sky-700 dark:text-sky-300">次にすること</p>
        <p className="mt-1 text-sm text-sky-900 dark:text-sky-200">
          <code>cd motion-studio &amp;&amp; pnpm dev:start-129</code> でRemotion Studioを開き、6つのComposition(A/B/C ×
          完成映像/解説付き)を実際に見てください。気に入った区間・演出は下のボタンで記録できます。
        </p>
      </section>

      <section className="mb-5 border border-amber-400 bg-amber-50 dark:bg-amber-900/20 p-3">
        <p className="text-xs text-amber-800 dark:text-amber-200">{START_129_ASSET_NOTE_JA}</p>
      </section>

      <section className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {START_129_SHOWCASES.map((sc) => (
          <div key={sc.id} className="border border-navy-200 dark:border-navy-700 p-4 bg-white dark:bg-navy-800">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-navy-900 dark:text-sand-100">{sc.id}案: {sc.nameJa}</h2>
              <span className="text-[10px] px-2 py-0.5 border border-navy-300 rounded text-navy-500 dark:text-navy-300">{sc.subtitleJa}</span>
            </div>
            <p className="mt-2 text-xs leading-5 text-navy-600 dark:text-navy-300">{sc.descriptionJa}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              {sc.keywordsJa.map((k) => (
                <span key={k} className="text-[10px] px-1.5 py-0.5 bg-navy-100 dark:bg-navy-700 text-navy-600 dark:text-navy-300 rounded">{k}</span>
              ))}
            </div>
            <p className="mt-3 text-[11px] font-mono text-navy-400">pnpm render:start-129:{sc.id.toLowerCase()}</p>
          </div>
        ))}
      </section>

      <section className="mb-6 border border-navy-200 dark:border-navy-700 bg-white dark:bg-navy-800 p-4">
        <h2 className="text-sm font-bold text-navy-900 dark:text-sand-100 mb-2">14区間タイムライン</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-navy-400 border-b border-navy-200 dark:border-navy-700">
                <th className="py-1 pr-2">時刻</th>
                <th className="py-1 pr-2">区間</th>
                <th className="py-1 pr-2">役割</th>
                <th className="py-1 pr-2">歌詞slot</th>
                <th className="py-1 pr-2">レビュー</th>
              </tr>
            </thead>
            <tbody>
              {START_129_SECTIONS.map((s) => (
                <tr key={s.id} className="border-b border-navy-100 dark:border-navy-800">
                  <td className="py-1.5 pr-2 font-mono text-navy-500">{formatTime(s.startSec)}–{formatTime(s.endSec)}</td>
                  <td className="py-1.5 pr-2 font-semibold text-navy-800 dark:text-sand-100">{s.labelJa}</td>
                  <td className="py-1.5 pr-2 text-navy-600 dark:text-navy-300">{s.roleJa}</td>
                  <td className="py-1.5 pr-2 text-navy-400">{s.lyricSlotRange ? `#${s.lyricSlotRange[0]}–#${s.lyricSlotRange[1]}` : "—"}</td>
                  <td className="py-1.5 pr-2">
                    <DecisionButtons targetId={`section:${s.id}`} decisions={decisions} onChange={setDecision} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-6 border border-navy-200 dark:border-navy-700 bg-white dark:bg-navy-800 p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-bold text-navy-900 dark:text-sand-100">使用演出一覧(Technique Catalog)</h2>
          <div className="flex gap-1">
            {[ALL, "A", "B", "C"].map((f) => (
              <button
                key={f}
                onClick={() => setShowcaseFilter(f as ShowcaseFilter)}
                className={`px-2 py-1 text-[11px] border rounded ${
                  showcaseFilter === f
                    ? "border-navy-700 bg-navy-700 text-white dark:border-sand-300 dark:bg-sand-300 dark:text-navy-900"
                    : "border-navy-300 text-navy-500 dark:border-navy-600 dark:text-navy-300"
                }`}
              >
                {f === ALL ? "全案" : `${f}案`}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          {filteredTechniques.map((t) => (
            <div key={t.id} className="border border-navy-100 dark:border-navy-700 p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] px-1.5 py-0.5 border border-navy-300 rounded text-navy-500 mr-2">{t.showcase}案</span>
                  <span className="font-semibold text-sm text-navy-900 dark:text-sand-100">{t.nameJa}</span>
                </div>
                <span className={`text-[10px] px-2 py-0.5 border rounded ${statusClasses[t.status]}`}>
                  {START_129_TECHNIQUE_STATUS_LABELS[t.status]}
                </span>
              </div>
              <p className="mt-1 text-xs text-navy-600 dark:text-navy-300">目的: {t.purposeJa}</p>
              <p className="mt-0.5 text-[11px] text-navy-400">向く素材: {t.goodForJa} / 避ける: {t.avoidWhenJa}</p>
              <p className="mt-0.5 text-[11px] font-mono text-navy-400">{t.componentRef}</p>
              <p className="mt-1 text-[11px] text-navy-500 italic">根拠: {t.evidenceJa}</p>
              <div className="mt-2">
                <DecisionButtons targetId={`technique:${t.id}`} decisions={decisions} onChange={setDecision} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-6 border border-navy-200 dark:border-navy-700 bg-white dark:bg-navy-800 p-4">
        <h2 className="text-sm font-bold text-navy-900 dark:text-sand-100 mb-2">
          レビューサマリー: 気に入った{summaryCounts.favorite} / 保留{summaryCounts.maybe} / 使わない{summaryCounts.reject}
        </h2>
        <div className="flex gap-2 mb-3">
          <input
            value={commentDraft}
            onChange={(e) => setCommentDraft(e.target.value)}
            placeholder="コメントを入力(例: 1サビBのspeed lineが強すぎる)"
            className="flex-1 border border-navy-300 dark:border-navy-600 bg-transparent px-2 py-1 text-xs rounded"
          />
          <button onClick={addComment} className="px-3 py-1 text-xs border border-navy-400 rounded text-navy-700 dark:text-navy-200">
            追加
          </button>
        </div>
        {comments.length > 0 && (
          <ul className="mb-3 space-y-1 text-xs text-navy-600 dark:text-navy-300">
            {comments.map((c) => (
              <li key={c.id}>・{c.text} <span className="text-navy-400">({new Date(c.createdAt).toLocaleString("ja-JP")})</span></li>
            ))}
          </ul>
        )}
        <button
          onClick={copyPrompt}
          className="px-3 py-1.5 text-xs border border-emerald-500 text-emerald-700 dark:text-emerald-300 rounded"
        >
          {copied ? "コピーしました" : "Claude/Codexへの修正依頼をコピー"}
        </button>
      </section>
    </div>
  );
}
