import { useCallback, useEffect, useState } from "react";
import { Header } from "../components/Header";
import { SectionCard } from "../components/SectionCard";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { useProduction } from "../store/productionStore";

const STORAGE_KEY = "wedding-movie-dashboard-gates";

interface Gate {
  gateId: string;
  title: string;
  movieTypes: string[];
  items: string[];
}

const gates: Gate[] = [
  {
    gateId: "gate-1",
    title: "Gate 1: 10秒試作",
    movieTypes: ["opening", "profile"],
    items: [
      "旅行テーマが伝わる",
      "写真とAI背景の質感が喧嘩していない",
      "テロップが読める",
      "BGMの入口が気持ちいい",
      "AI素材が目立ちすぎない",
      "色が Style Bible に合っている",
      "フォントが読みやすい",
      "テロップ位置が適切",
      "写真の動きが自然",
      "AI素材の方向性が合っている",
    ],
  },
  {
    gateId: "gate-2",
    title: "Gate 2: 30秒試作",
    movieTypes: ["opening", "profile"],
    items: [
      "冒頭で飽きない",
      "感動・笑い・テンポの緩急がある",
      "写真の表示秒数が短すぎない",
      "章切り替えが分かる",
      "BGMの盛り上がりに映像が合っている",
      "写真順が自然",
      "AI素材の採否が適切",
    ],
  },
  {
    gateId: "gate-3",
    title: "Gate 3: 本編ラフ",
    movieTypes: ["opening", "profile"],
    items: [
      "二人らしさが主役になっている",
      "家族・友人・犬が自然に見える",
      "AI動画作品に見えない",
      "テロップが内輪すぎない",
      "最後が入場につながる",
      "不要な演出がない",
      "音量と余韻が適切",
    ],
  },
  {
    gateId: "gate-3-5",
    title: "Gate 3.5: 1章完成",
    movieTypes: ["opening", "profile"],
    items: [
      "1章だけなら完成品として見られる",
      "色・フォント・テロップ・写真演出の基準が決まっている",
      "他の章へ同じ品質で展開できる",
      "AI素材の量が適切",
      "CapCut上で再現しやすい",
    ],
  },
  {
    gateId: "gate-4",
    title: "Gate 4: 上映前",
    movieTypes: ["opening", "profile", "introduction"],
    items: [
      "会場仕様に合っている",
      "会場スクリーンで読める",
      "音量が大きすぎない",
      "音源の利用条件を確認済み",
      "SNS投稿版と上映版を分けている",
      "最終ファイル名が分かる",
      "バックアップを書き出している",
    ],
  },
];

type CheckState = Record<string, Record<string, boolean[]>>;

function loadChecks(): CheckState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as CheckState;
  } catch { /* ignore */ }
  return {};
}

function saveChecks(state: CheckState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function QualityGate() {
  const { selectedMovieId, currentMovie } = useProduction();
  const [checks, setChecks] = useState<CheckState>(loadChecks);
  const [showReset, setShowReset] = useState(false);

  useEffect(() => {
    saveChecks(checks);
  }, [checks]);

  const movieType = currentMovie?.type;
  const visibleGates = selectedMovieId === "all"
    ? gates
    : gates.filter((g) => movieType && g.movieTypes.includes(movieType));

  const movieKey = selectedMovieId || "all";

  const getChecked = useCallback(
    (gateId: string, idx: number) => checks[movieKey]?.[gateId]?.[idx] ?? false,
    [checks, movieKey],
  );

  function toggle(gateId: string, idx: number) {
    setChecks((prev) => {
      const next = { ...prev };
      if (!next[movieKey]) next[movieKey] = {};
      const gateChecks = [...(next[movieKey][gateId] ?? [])];
      gateChecks[idx] = !gateChecks[idx];
      next[movieKey] = { ...next[movieKey], [gateId]: gateChecks };
      return next;
    });
  }

  function handleReset() {
    setChecks((prev) => {
      const next = { ...prev };
      delete next[movieKey];
      return next;
    });
    setShowReset(false);
  }

  return (
    <div>
      <Header title="品質ゲート" description="ラフ版・完成前・上映前のチェック項目を管理します" showMovieSelector />

      <div className="flex justify-end mb-6">
        <button onClick={() => setShowReset(true)} className="px-3 py-1.5 text-xs rounded-lg border border-sand-200 text-navy-500 hover:bg-sand-50">
          チェックをリセット
        </button>
      </div>

      <div className="space-y-6">
        {visibleGates.map((gate) => {
          const checked = gate.items.filter((_, i) => getChecked(gate.gateId, i)).length;
          const total = gate.items.length;
          const allDone = checked === total;
          const pct = total > 0 ? Math.round((checked / total) * 100) : 0;

          return (
            <SectionCard key={gate.gateId} title={`${allDone ? "✅ " : ""}${gate.title}`}>
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-navy-500 mb-1">
                  <span>{checked}/{total} 確認済み</span>
                  <span>{pct}%</span>
                </div>
                <div className="w-full bg-sand-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${allDone ? "bg-emerald-500" : "bg-navy-500"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                {gate.items.map((item, i) => (
                  <label key={i} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={getChecked(gate.gateId, i)}
                      onChange={() => toggle(gate.gateId, i)}
                      className="w-4 h-4 rounded border-sand-300 text-navy-600 focus:ring-navy-300"
                    />
                    <span className={`text-sm ${getChecked(gate.gateId, i) ? "text-navy-400 line-through" : "text-navy-700"}`}>
                      {item}
                    </span>
                  </label>
                ))}
              </div>
            </SectionCard>
          );
        })}
        {visibleGates.length === 0 && (
          <p className="text-sm text-navy-400 text-center py-8">このムービータイプに該当する品質ゲートがありません</p>
        )}
      </div>

      <ConfirmDialog
        open={showReset}
        title="チェックリセット"
        message="このムービーのチェック状態をすべてリセットしますか？"
        onConfirm={handleReset}
        onCancel={() => setShowReset(false)}
        danger
      />
    </div>
  );
}
