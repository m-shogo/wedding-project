import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { profileProductionOutcomes } from "../data/profileCoachLearning";
import { profileCoachPhases } from "../data/profileCoachRoadmap";
import {
  getMovieCoachProgress,
  getOutcomeCompletion,
  loadCoachProgress,
  saveCoachProgress,
  toggleOutcomeChecklistProgress,
} from "../lib/movieCoach";
import { useProduction } from "../store/productionStore";

function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${minutes}:${String(rest).padStart(2, "0")}`;
}

export function ProfileMovieCoach() {
  const { data } = useProduction();
  const [coachProgress, setCoachProgress] = useState(loadCoachProgress);

  useEffect(() => {
    saveCoachProgress(coachProgress);
  }, [coachProgress]);

  const movie = data.movies.find((item) => item.movieId === "profile");
  const scenes = data.scenes.filter((scene) => scene.movieId === "profile");
  const sceneMap = new Map(scenes.map((scene) => [scene.sceneId, scene]));

  const plannedDuration = scenes.reduce((sum, scene) => sum + scene.durationSec, 0);
  const targetDuration = movie?.targetDurationSec ?? plannedDuration;
  const durationGap = targetDuration - plannedDuration;

  const photoSlots = scenes.flatMap((scene) => scene.photoSlots ?? []);
  const requiredPhotos = photoSlots.reduce((sum, slot) => sum + slot.requiredCount, 0);
  const selectedPhotos = photoSlots.reduce(
    (sum, slot) => sum + Math.min(slot.selectedAssetIds.length, slot.requiredCount),
    0,
  );
  const photoPercent = requiredPhotos > 0 ? Math.round((selectedPhotos / requiredPhotos) * 100) : 0;

  const doneScenes = scenes.filter((scene) => scene.status === "done").length;
  const storyNeedsResolution = durationGap !== 0;
  const coachStats = getMovieCoachProgress("profile", coachProgress);

  const nextAction = selectedPhotos < requiredPhotos
    ? {
        label: "不足写真を先に埋める",
        reason: `現在 ${selectedPhotos}/${requiredPhotos}枚。演出より先にStory素材を揃える。`,
        to: "/profile-planner",
        cta: "写真計画へ",
      }
    : storyNeedsResolution
      ? {
          label: "Story Map / 最終尺を決める",
          reason: `現在の10scene計画 ${formatDuration(plannedDuration)} に対しproject targetは ${formatDuration(targetDuration)}。差 ${durationGap > 0 ? "+" : ""}${durationGap}秒をEffectで埋めず、BGMと物語から決める。`,
          to: "#profile-story-map",
          cta: "Phase 01を見る",
        }
      : {
          label: "最初の未完成Chapterを編集する",
          reason: "素材と最終尺が揃ったので、scene単体ではなく人物Arc単位で編集する。",
          to: "#profile-groom-arc",
          cta: "Roadmapへ",
        };

  return (
    <div>
      <Header
        title="PROFILE MOVIE COACH"
        description="派手な演出よりStory。長尺Timelineを、写真選定 → Narrative → Caption → BGM → Full Passの順で完成させる"
      />

      <div className="border-y border-sand-200 dark:border-navy-600 py-5 mb-7 grid grid-cols-2 lg:grid-cols-6 gap-x-6 gap-y-4">
        <div>
          <p className="text-[10px] tracking-[0.18em] font-semibold text-navy-400">SCENES</p>
          <p className="mt-1 text-2xl font-mono font-bold text-navy-900 dark:text-sand-100">{doneScenes}/{scenes.length}</p>
          <p className="text-xs text-navy-400">production status</p>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.18em] font-semibold text-navy-400">COACH</p>
          <p className="mt-1 text-2xl font-mono font-bold text-navy-900 dark:text-sand-100">{coachStats.percent}%</p>
          <p className="text-xs text-navy-400">{coachStats.done}/{coachStats.total} outcomes</p>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.18em] font-semibold text-navy-400">CURRENT PLAN</p>
          <p className="mt-1 text-2xl font-mono font-bold text-navy-900 dark:text-sand-100">{formatDuration(plannedDuration)}</p>
          <p className="text-xs text-navy-400">10scene合計</p>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.18em] font-semibold text-navy-400">PROJECT TARGET</p>
          <p className="mt-1 text-2xl font-mono font-bold text-navy-900 dark:text-sand-100">{formatDuration(targetDuration)}</p>
          <p className="text-xs text-navy-400">既存Movie設定</p>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.18em] font-semibold text-navy-400">PHOTO SLOTS</p>
          <p className="mt-1 text-2xl font-mono font-bold text-navy-900 dark:text-sand-100">{selectedPhotos}/{requiredPhotos}</p>
          <p className="text-xs text-navy-400">{photoPercent}% selected</p>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.18em] font-semibold text-navy-400">DURATION GAP</p>
          <p className={`mt-1 text-2xl font-mono font-bold ${durationGap === 0 ? "text-emerald-700 dark:text-emerald-300" : "text-amber-700 dark:text-amber-300"}`}>
            {durationGap > 0 ? "+" : ""}{durationGap}s
          </p>
          <p className="text-xs text-navy-400">target − planned</p>
        </div>
      </div>

      <section className="mb-8 border-l-2 border-navy-900 dark:border-sand-100 pl-5 py-1">
        <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">NEXT PRODUCTION ACTION</p>
        <div className="mt-1 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-navy-900 dark:text-sand-100">{nextAction.label}</h2>
            <p className="mt-1 max-w-3xl text-sm leading-6 text-navy-600 dark:text-navy-300">{nextAction.reason}</p>
          </div>
          <a href={nextAction.to} className="shrink-0 text-xs border border-navy-700 dark:border-sand-300 px-3 py-2 text-navy-700 dark:text-sand-200">
            {nextAction.cta} →
          </a>
        </div>
      </section>

      {durationGap !== 0 && (
        <div className="mb-8 border-y border-amber-200 dark:border-amber-800 py-4">
          <p className="text-xs font-bold tracking-widest text-amber-700 dark:text-amber-300">STORY GATE</p>
          <p className="mt-2 text-sm leading-6 text-navy-700 dark:text-navy-200">
            現在のscene設計は {formatDuration(plannedDuration)}、project targetは {formatDuration(targetDuration)} です。
            この差をTransition・Slow Zoom・AI B-rollで埋めません。BGM候補、写真を読む時間、ゲストへ伝えたいStoryを確認してから最終尺を決めます。
          </p>
        </div>
      )}

      <div className="mb-8 flex flex-wrap gap-3 text-xs">
        <Link to="/profile-planner" className="border-b border-navy-300 text-navy-600 dark:text-navy-300">写真計画 →</Link>
        <Link to="/movie-coach/dictionary" className="border-b border-navy-300 text-navy-600 dark:text-navy-300">逆引きDaVinci辞典 →</Link>
        <Link to="/movie-coach" className="border-b border-navy-300 text-navy-600 dark:text-navy-300">Today / Movie Coach →</Link>
        <Link to="/movie-coach/review" className="border-b border-navy-300 text-navy-600 dark:text-navy-300">Movie Review →</Link>
      </div>

      <div className="space-y-10">
        {profileCoachPhases.map((phase) => {
          const phaseScenes = phase.sceneIds
            .map((sceneId) => sceneMap.get(sceneId))
            .filter((scene) => scene !== undefined);
          const phaseDuration = phaseScenes.reduce((sum, scene) => sum + scene.durationSec, 0);
          const phaseSlots = phaseScenes.flatMap((scene) => scene.photoSlots ?? []);
          const phaseRequired = phaseSlots.reduce((sum, slot) => sum + slot.requiredCount, 0);
          const phaseSelected = phaseSlots.reduce(
            (sum, slot) => sum + Math.min(slot.selectedAssetIds.length, slot.requiredCount),
            0,
          );
          const productionScenesDone =
            phaseScenes.length > 0 && phaseScenes.every((scene) => scene.status === "done");
          const outcome = profileProductionOutcomes.find((item) => item.outcomeId === phase.phaseId);
          const completion = outcome
            ? getOutcomeCompletion(outcome, coachProgress.outcomeChecklist)
            : { done: 0, total: phase.done.length, percent: 0, complete: false };

          return (
            <section key={phase.phaseId} id={phase.phaseId} className="scroll-mt-6">
              <div className="grid grid-cols-[48px_1fr] gap-4">
                <div className="font-mono text-sm text-navy-400 pt-1">{String(phase.order).padStart(2, "0")}</div>
                <div>
                  <div className="flex flex-wrap items-start justify-between gap-4 border-b-2 border-navy-900 dark:border-sand-100 pb-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-navy-400">
                        <span>{phaseScenes.map((scene) => scene.sceneId).join(" / ") || "ALL"}</span>
                        <span>·</span>
                        <span>{formatDuration(phaseDuration)}</span>
                        {phaseRequired > 0 && <><span>·</span><span>PHOTO {phaseSelected}/{phaseRequired}</span></>}
                        {productionScenesDone && <><span>·</span><span>SCENES DONE</span></>}
                      </div>
                      <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">{phase.title}</h2>
                      <p className="mt-1 text-sm text-navy-600 dark:text-navy-300">{phase.productionOutcome}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-sm font-mono font-bold ${completion.complete ? "text-emerald-700 dark:text-emerald-300" : "text-navy-700 dark:text-sand-200"}`}>
                        {completion.percent}%
                      </span>
                      <p className="text-[10px] font-mono text-navy-400">{completion.done}/{completion.total} · {phase.practiceMinutes} MIN</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 py-5 border-b border-sand-200 dark:border-navy-600">
                    <div>
                      <p className="text-[10px] tracking-[0.18em] font-semibold text-navy-400">LEARN</p>
                      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-2">
                        {phase.learn.map((item) => <span key={item} className="text-xs border-b border-sand-300 dark:border-navy-500 text-navy-700 dark:text-navy-200">{item}</span>)}
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.18em] font-semibold text-navy-400">DAVINCI</p>
                      <p className="mt-2 text-xs font-mono leading-6 text-navy-600 dark:text-navy-300">{phase.davinci.join(" / ")}</p>
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.18em] font-semibold text-navy-400">WHY</p>
                      <p className="mt-2 text-xs leading-5 text-navy-600 dark:text-navy-300">{phase.why}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-7 py-5">
                    <div>
                      <p className="text-[10px] tracking-[0.18em] font-semibold text-navy-400">APPLY TO WEDDING</p>
                      <ol className="mt-3 space-y-2">
                        {phase.apply.map((item, index) => (
                          <li key={item} className="flex gap-3 text-sm text-navy-700 dark:text-navy-200">
                            <span className="w-5 shrink-0 font-mono text-navy-400">{index + 1}</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.18em] font-semibold text-emerald-700 dark:text-emerald-300">DONE WHEN / EVIDENCE</p>
                      <div className="mt-3 space-y-2">
                        {outcome
                          ? outcome.checklist.map((item) => {
                              const checked = (coachProgress.outcomeChecklist[outcome.outcomeId] ?? []).includes(item.itemId);
                              return (
                                <label key={item.itemId} className="flex items-start gap-2 text-sm text-navy-700 dark:text-navy-200 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() =>
                                      setCoachProgress((current) =>
                                        toggleOutcomeChecklistProgress(current, outcome, item.itemId),
                                      )
                                    }
                                    className="mt-0.5 h-4 w-4"
                                  />
                                  <span className={checked ? "line-through text-navy-400" : ""}>{item.label}</span>
                                </label>
                              );
                            })
                          : phase.done.map((item) => <p key={item} className="text-sm text-navy-700 dark:text-navy-200">✓ {item}</p>)}
                      </div>
                      {completion.complete && (
                        <p className="mt-3 text-xs text-emerald-700 dark:text-emerald-300">
                          ✓ Phase完了。使用SkillへWedding実使用Evidenceを記録済み。
                        </p>
                      )}
                      <p className="mt-5 text-[10px] tracking-[0.18em] font-semibold text-red-700 dark:text-red-300">AVOID</p>
                      <ul className="mt-2 space-y-1 text-xs text-navy-500 dark:text-navy-300">
                        {phase.avoid.map((item) => <li key={item}>× {item}</li>)}
                      </ul>
                    </div>
                  </div>

                  {phaseScenes.length > 0 && (
                    <div className="border-t border-sand-100 dark:border-navy-700 pt-3 flex flex-wrap gap-x-4 gap-y-2">
                      {phaseScenes.map((scene) => (
                        <Link key={scene.sceneId} to={`/scene/${scene.sceneId}`} className="text-xs text-navy-500 dark:text-navy-300 hover:underline">
                          {scene.sceneId} {scene.title} · {scene.durationSec}s
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
