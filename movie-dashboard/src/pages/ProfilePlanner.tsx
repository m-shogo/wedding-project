import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { SectionCard } from "../components/SectionCard";
import { Badge } from "../components/Badge";
import { periodTagLabel, sceneStatusLabel, sceneStatusColor } from "../lib/labels";
import { useProduction } from "../store/productionStore";
import { getPhotoSlotFolder } from "../lib/assetPaths";
import type { PersonCategory, PhotoSlot, Scene } from "../types/movie";

const sections: { key: PersonCategory; label: string }[] = [
  { key: "groom", label: "新郎" },
  { key: "bride", label: "新婦" },
  { key: "both", label: "ふたり" },
];

function SlotCard({ slot, scene, assets }: { slot: PhotoSlot; scene: Scene; assets: { assetId: string; title: string }[] }) {
  const [showPath, setShowPath] = useState(false);
  const selected = slot.selectedAssetIds.length;
  const isFilled = selected >= slot.requiredCount;
  const folderPath = getPhotoSlotFolder(slot.person, slot.period);

  return (
    <div className={`border rounded-lg p-3 ${isFilled ? "border-emerald-200 dark:border-emerald-800" : "border-amber-200 dark:border-amber-800"}`}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-navy-800 dark:text-sand-100">{slot.label}</span>
        <span className={`text-xs px-1.5 py-0.5 rounded ${isFilled ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
          {selected}/{slot.requiredCount}
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5 text-xs text-navy-400 dark:text-navy-300 mb-1">
        <span>{periodTagLabel[slot.period]}</span>
        {slot.yearLabel && <span>{slot.yearLabel}</span>}
      </div>
      {slot.candidateAssetIds.length > 0 && (
        <div className="text-xs text-sky-600 dark:text-sky-400">
          候補: {slot.candidateAssetIds.map((aid) => {
            const a = assets.find((x) => x.assetId === aid);
            return a ? a.title : aid;
          }).join(", ")}
        </div>
      )}
      {slot.selectedAssetIds.length > 0 && (
        <div className="text-xs text-emerald-600 dark:text-emerald-400">
          選定: {slot.selectedAssetIds.map((aid) => {
            const a = assets.find((x) => x.assetId === aid);
            return a ? a.title : aid;
          }).join(", ")}
        </div>
      )}
      {slot.notes && <p className="text-xs text-navy-400 dark:text-navy-300 mt-1">{slot.notes}</p>}
      {slot.comment && <p className="text-xs text-navy-600 dark:text-navy-200 italic mt-1">{slot.comment}</p>}
      <div className="mt-1.5 flex items-center gap-2">
        <Link to={`/scene/${scene.sceneId}`} className="text-xs text-navy-500 hover:text-navy-700 dark:text-navy-300 dark:hover:text-navy-100 underline">
          {scene.title}
        </Link>
        <button onClick={() => setShowPath(!showPath)} className="text-xs text-sky-500 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-200">
          📁
        </button>
      </div>
      {showPath && (
        <div className="mt-1.5 p-1.5 bg-sky-50 dark:bg-sky-900/20 rounded text-xs">
          <span className="text-sky-700 dark:text-sky-300">保存先: </span>
          <code className="font-mono text-sky-800 dark:text-sky-200">{folderPath}</code>
        </div>
      )}
    </div>
  );
}

export function ProfilePlanner() {
  const { data } = useProduction();

  const profileScenes = data.scenes.filter((s) => s.movieId === "profile");
  const assetLookup = data.assets.map((a) => ({ assetId: a.assetId, title: a.title }));

  // Aggregate stats
  let totalSlots = 0;
  let totalRequired = 0;
  let totalSelected = 0;
  for (const s of profileScenes) {
    if (!s.photoSlots) continue;
    for (const slot of s.photoSlots) {
      totalSlots++;
      totalRequired += slot.requiredCount;
      totalSelected += Math.min(slot.selectedAssetIds.length, slot.requiredCount);
    }
  }
  const totalMissing = totalRequired - totalSelected;
  const progressPct = totalRequired > 0 ? Math.round((totalSelected / totalRequired) * 100) : 0;

  function scenesForPerson(person: PersonCategory) {
    return profileScenes.filter((s) => s.person === person && s.photoSlots && s.photoSlots.length > 0);
  }

  const otherScenes = profileScenes.filter((s) => {
    if (!s.photoSlots || s.photoSlots.length === 0) return false;
    return !sections.some((sec) => sec.key === s.person);
  });

  return (
    <div>
      <Header title="プロフィール写真計画" description="プロフィールムービーの写真スロットを人物・時期別に管理します" />

      {/* Progress summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-navy-800 rounded-lg border border-sand-200 dark:border-navy-600 p-4 text-center">
          <p className="text-xs text-navy-400 dark:text-navy-300">スロット数</p>
          <p className="text-2xl font-bold text-navy-800 dark:text-sand-100">{totalSlots}</p>
        </div>
        <div className="bg-white dark:bg-navy-800 rounded-lg border border-sand-200 dark:border-navy-600 p-4 text-center">
          <p className="text-xs text-navy-400 dark:text-navy-300">必要枚数</p>
          <p className="text-2xl font-bold text-navy-800 dark:text-sand-100">{totalRequired}</p>
        </div>
        <div className="bg-white dark:bg-navy-800 rounded-lg border border-sand-200 dark:border-navy-600 p-4 text-center">
          <p className="text-xs text-navy-400 dark:text-navy-300">選定済</p>
          <p className={`text-2xl font-bold ${totalSelected > 0 ? "text-emerald-600" : "text-navy-400"}`}>{totalSelected}</p>
        </div>
        <div className="bg-white dark:bg-navy-800 rounded-lg border border-sand-200 dark:border-navy-600 p-4 text-center">
          <p className="text-xs text-navy-400 dark:text-navy-300">不足</p>
          <p className={`text-2xl font-bold ${totalMissing > 0 ? "text-red-600" : "text-emerald-600"}`}>{totalMissing}</p>
        </div>
      </div>

      {/* Overall progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs text-navy-500 dark:text-navy-300 mb-1">
          <span>写真選定進捗</span>
          <span>{progressPct}%</span>
        </div>
        <div className="w-full bg-sand-100 dark:bg-navy-700 rounded-full h-3">
          <div className={`h-3 rounded-full transition-all ${progressPct === 100 ? "bg-emerald-500" : "bg-navy-500"}`} style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      {/* Per-person sections */}
      {sections.map(({ key, label }) => {
        const scenes = scenesForPerson(key);
        if (scenes.length === 0) return null;

        let secRequired = 0;
        let secSelected = 0;
        for (const s of scenes) {
          for (const slot of s.photoSlots!) {
            secRequired += slot.requiredCount;
            secSelected += Math.min(slot.selectedAssetIds.length, slot.requiredCount);
          }
        }

        return (
          <SectionCard key={key} title={`${label} (${secSelected}/${secRequired}枚)`} className="mb-6">
            {scenes.map((scene) => (
              <div key={scene.sceneId} className="mb-4 last:mb-0">
                <div className="flex items-center gap-2 mb-2">
                  <Badge label={sceneStatusLabel[scene.status]} colorClass={sceneStatusColor[scene.status]} />
                  <Link to={`/scene/${scene.sceneId}`} className="text-sm font-medium text-navy-800 dark:text-sand-100 hover:underline">
                    {scene.title}
                  </Link>
                  {scene.yearLabel && <span className="text-xs text-navy-400 dark:text-navy-300">{scene.yearLabel}</span>}
                  <span className="text-xs text-navy-400 dark:text-navy-300">{scene.durationSec}秒</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                  {scene.photoSlots!.map((slot) => (
                    <SlotCard key={slot.slotId} slot={slot} scene={scene} assets={assetLookup} />
                  ))}
                </div>
              </div>
            ))}
          </SectionCard>
        );
      })}

      {/* Scenes without person or with other person */}
      {otherScenes.length > 0 && (
        <SectionCard title="その他" className="mb-6">
          {otherScenes.map((scene) => (
            <div key={scene.sceneId} className="mb-4 last:mb-0">
              <div className="flex items-center gap-2 mb-2">
                <Badge label={sceneStatusLabel[scene.status]} colorClass={sceneStatusColor[scene.status]} />
                <Link to={`/scene/${scene.sceneId}`} className="text-sm font-medium text-navy-800 dark:text-sand-100 hover:underline">
                  {scene.title}
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {scene.photoSlots!.map((slot) => (
                  <SlotCard key={slot.slotId} slot={slot} scene={scene} assets={assetLookup} />
                ))}
              </div>
            </div>
          ))}
        </SectionCard>
      )}

      {profileScenes.filter((s) => s.photoSlots && s.photoSlots.length > 0).length === 0 && (
        <p className="text-sm text-navy-400 text-center py-8">プロフィールムービーに写真スロットが設定されていません</p>
      )}
    </div>
  );
}
