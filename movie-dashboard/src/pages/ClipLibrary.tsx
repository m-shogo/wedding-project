import { useMemo, useState } from "react";
import { Header } from "../components/Header";
import { SectionCard } from "../components/SectionCard";
import { StatCard } from "../components/StatCard";
import { Badge } from "../components/Badge";
import clipData from "../data/clips.json";
import type { ClipLibraryData } from "../types/movie";

const data = clipData as unknown as ClipLibraryData;

const pickLabel: Record<string, string> = {
  pool: "プール",
  candidate: "切り出し候補",
  picked: "採用",
  rejected: "不採用",
};

const pickColor: Record<string, string> = {
  pool: "bg-sand-100 text-navy-600 dark:bg-navy-700 dark:text-navy-200",
  candidate: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  picked: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  rejected: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
};

const ALL = "__all__";

export function ClipLibrary() {
  const [chapter, setChapter] = useState(ALL);
  const [motion, setMotion] = useState(ALL);
  const [pick, setPick] = useState(ALL);
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const motionLabel = useMemo(() => {
    const map: Record<string, string> = {};
    for (const m of data.motionVocab) map[m.id] = m.label;
    return map;
  }, []);

  const chapters = useMemo(() => {
    const set = new Set(data.clips.map((c) => c.chapter).filter(Boolean));
    return Array.from(set).sort();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data.clips.filter((c) => {
      if (chapter !== ALL && c.chapter !== chapter) return false;
      if (motion !== ALL && c.motion !== motion) return false;
      if (pick !== ALL && c.pick !== pick) return false;
      if (!q) return true;
      const haystack = [
        c.clipId, c.sourceFile, c.role, c.motion, c.notes, c.outName,
        ...c.tags, ...c.recipeIds,
      ].join(" ").toLowerCase();
      return haystack.includes(q);
    });
  }, [chapter, motion, pick, query]);

  const counts = useMemo(() => {
    const by = (p: string) => data.clips.filter((c) => c.pick === p).length;
    return { total: data.clips.length, picked: by("picked"), candidate: by("candidate"), pool: by("pool") };
  }, []);

  const visibleRecipes = useMemo(() => {
    return data.recipes.filter((r) => {
      if (motion !== ALL && !r.motion.includes(motion)) return false;
      if (chapter !== ALL && r.chapters.length > 0 && !r.chapters.includes(Number(chapter))) return false;
      return true;
    });
  }, [motion, chapter]);

  function copy(text: string) {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 1500);
  }

  const selectClass =
    "px-3 py-1.5 text-sm rounded-lg border border-sand-200 bg-white text-navy-700 dark:bg-navy-800 dark:border-navy-600 dark:text-sand-100";

  return (
    <div>
      <Header
        title="クリップ素材集"
        description="いろんな素材から切り出した「おいしいとこどり」クリップを、章・動き(motion)・採否で絞り込んで探せます"
      />

      <div className="mb-8 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
        <p className="text-sm text-amber-800 dark:text-amber-200 font-medium mb-1">読み取り専用</p>
        <p className="text-sm text-amber-700 dark:text-amber-300">
          この画面は編集できません。単一情報源は{" "}
          <code className="font-mono text-xs">docs/templates/sample-clips.csv</code> です。
          編集後に{" "}
          <code className="font-mono text-xs">python3 scripts/slice_clips.py sync-dashboard --write</code>{" "}
          を実行すると、ここへ反映されます。
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="クリップ総数" value={counts.total} icon="🎞" />
        <StatCard label="採用" value={counts.picked} icon="✅" accent="text-emerald-600 dark:text-emerald-400" />
        <StatCard label="切り出し候補" value={counts.candidate} icon="🔎" accent="text-amber-600 dark:text-amber-400" />
        <StatCard label="プール" value={counts.pool} icon="📥" />
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="タグ・パス・メモを検索"
          className="px-3 py-1.5 text-sm rounded-lg border border-sand-200 bg-white text-navy-700 placeholder:text-navy-300 min-w-[220px] dark:bg-navy-800 dark:border-navy-600 dark:text-sand-100"
        />
        <select value={chapter} onChange={(e) => setChapter(e.target.value)} className={selectClass}>
          <option value={ALL}>章: すべて</option>
          {chapters.map((c) => (
            <option key={c} value={c}>章 {c}</option>
          ))}
        </select>
        <select value={motion} onChange={(e) => setMotion(e.target.value)} className={selectClass}>
          <option value={ALL}>動き: すべて</option>
          {data.motionVocab.map((m) => (
            <option key={m.id} value={m.id}>{m.id}（{m.label}）</option>
          ))}
        </select>
        <select value={pick} onChange={(e) => setPick(e.target.value)} className={selectClass}>
          <option value={ALL}>採否: すべて</option>
          {Object.entries(pickLabel).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
        <span className="text-sm text-navy-400 dark:text-navy-300">{filtered.length} 件</span>
      </div>

      <SectionCard title="クリップ一覧" className="mb-8">
        {filtered.length === 0 ? (
          <p className="text-sm text-navy-400 dark:text-navy-300">
            該当するクリップがありません。CSVに追記して sync-dashboard を実行してください。
          </p>
        ) : (
          <div className="space-y-3">
            {filtered.map((c) => (
              <div
                key={c.clipId}
                className="border border-sand-200 dark:border-navy-600 rounded-lg p-4 hover:border-navy-300 dark:hover:border-navy-500"
              >
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="font-mono text-sm font-bold text-navy-800 dark:text-sand-100">{c.clipId}</span>
                  <Badge label={pickLabel[c.pick] ?? c.pick} colorClass={pickColor[c.pick] ?? pickColor.pool} />
                  {c.chapter && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-sand-100 text-navy-600 dark:bg-navy-700 dark:text-navy-200">
                      章 {c.chapter}
                    </span>
                  )}
                  {c.motion && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-navy-100 text-navy-700 dark:bg-navy-700 dark:text-sand-200">
                      {c.motion}
                      {motionLabel[c.motion] ? `（${motionLabel[c.motion]}）` : ""}
                    </span>
                  )}
                  {c.rating > 0 && (
                    <span className="text-xs text-navy-500 dark:text-navy-300">★ {c.rating}</span>
                  )}
                </div>

                <div className="text-sm text-navy-600 dark:text-navy-300 space-y-1">
                  <p>
                    <span className="text-navy-400 dark:text-navy-400">区間:</span>{" "}
                    <span className="font-mono">{c.inTc} → {c.outTc}</span>{" "}
                    <span className="text-navy-400">（{c.durationSec}秒）</span>
                    {c.role && <span className="ml-2">/ {c.role}</span>}
                    {c.captionSpace === "yes" && <span className="ml-2 text-xs">テロップ余白あり</span>}
                  </p>
                  <p className="flex items-center gap-2 flex-wrap">
                    <span className="text-navy-400 dark:text-navy-400">元素材:</span>
                    <code className="font-mono text-xs bg-sand-50 dark:bg-navy-700 px-1.5 py-0.5 rounded">
                      {c.sourceFile}
                    </code>
                    <button
                      onClick={() => copy(c.sourceFile)}
                      className="text-xs text-navy-400 hover:text-navy-600 dark:text-navy-300 dark:hover:text-white"
                    >
                      {copied === c.sourceFile ? "コピー済み" : "コピー"}
                    </button>
                  </p>
                  <p>
                    <span className="text-navy-400 dark:text-navy-400">出力名:</span>{" "}
                    <code className="font-mono text-xs">{c.outName}.mp4</code>
                  </p>
                  {c.tags.length > 0 && (
                    <p className="flex flex-wrap gap-1 items-center">
                      <span className="text-navy-400 dark:text-navy-400">タグ:</span>
                      {c.tags.map((t) => (
                        <span key={t} className="text-xs px-1.5 py-0.5 rounded bg-sand-100 text-navy-600 dark:bg-navy-700 dark:text-navy-200">
                          {t}
                        </span>
                      ))}
                    </p>
                  )}
                  {c.recipeIds.length > 0 && (
                    <p>
                      <span className="text-navy-400 dark:text-navy-400">レシピ:</span>{" "}
                      {c.recipeIds.join(", ")}
                    </p>
                  )}
                  {c.notes && (
                    <p className="text-xs text-navy-400 dark:text-navy-400">{c.notes}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      <SectionCard title={`演出レシピ（${visibleRecipes.length}件）`}>
        <p className="text-sm text-navy-500 dark:text-navy-300 mb-4">
          「どの動きを、どの章の、どの役割で使うか」の型。上のフィルタ（章・動き）と連動します。
          正本は <code className="font-mono text-xs">docs/reference-recipes.md</code>。
        </p>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {visibleRecipes.map((r) => (
            <div key={r.id} className="border border-sand-200 dark:border-navy-600 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="font-mono text-xs text-navy-400 dark:text-navy-400">{r.id}</span>
                <span className="font-bold text-navy-800 dark:text-sand-100">{r.name}</span>
                {r.chapters.length > 0 && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-sand-100 text-navy-600 dark:bg-navy-700 dark:text-navy-200">
                    章 {r.chapters.join(",")}
                  </span>
                )}
                <span className="text-xs text-navy-500 dark:text-navy-300">{r.role}</span>
              </div>
              <div className="flex flex-wrap gap-1 mb-2">
                {r.motion.map((m) => (
                  <span key={m} className="text-xs px-2 py-0.5 rounded-full bg-navy-100 text-navy-700 dark:bg-navy-700 dark:text-sand-200">
                    {m}
                  </span>
                ))}
              </div>
              <dl className="text-sm text-navy-600 dark:text-navy-300 space-y-0.5">
                <div><dt className="inline text-navy-400 dark:text-navy-400">ビート: </dt><dd className="inline">{r.beats}</dd></div>
                <div><dt className="inline text-navy-400 dark:text-navy-400">つなぎ: </dt><dd className="inline">{r.transition}</dd></div>
                <div><dt className="inline text-navy-400 dark:text-navy-400">テロップ: </dt><dd className="inline">{r.caption}</dd></div>
                <div><dt className="inline text-navy-400 dark:text-navy-400">避ける: </dt><dd className="inline">{r.avoid}</dd></div>
                {r.motion_studio_alt && (
                  <div>
                    <dt className="inline text-navy-400 dark:text-navy-400">自作代替: </dt>
                    <dd className="inline">motion-studio の {r.motion_studio_alt}</dd>
                  </div>
                )}
              </dl>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
