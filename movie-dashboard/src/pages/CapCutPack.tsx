import { Header } from "../components/Header";
import { Badge } from "../components/Badge";
import { sceneStatusLabel, sceneStatusColor, assetStatusLabel, assetStatusColor } from "../lib/labels";
import scenes from "../data/scenes.json";
import assets from "../data/assets.json";
import type { Scene, Asset } from "../types/movie";

const typedScenes = scenes as Scene[];
const typedAssets = assets as Asset[];

function getSceneAssets(scene: Scene): Asset[] {
  return scene.assets
    .map((id) => typedAssets.find((a) => a.assetId === id))
    .filter((a): a is Asset => a !== undefined);
}

export function CapCutPack() {
  let timelineSec = 0;

  return (
    <div>
      <Header
        title="CapCut Pack"
        description="CapCut編集に渡すための素材・指示まとめ — この画面を見れば編集を進められる"
      />

      <div className="bg-white rounded-xl border border-sand-200 shadow-sm p-6 mb-8">
        <h2 className="text-sm font-bold text-navy-800 mb-3 uppercase tracking-wider">
          Timeline Overview
        </h2>
        <div className="flex gap-1 h-8 rounded-lg overflow-hidden">
          {typedScenes.map((scene) => {
            const totalDur = typedScenes.reduce((s, sc) => s + sc.durationSec, 0);
            const pct = (scene.durationSec / totalDur) * 100;
            const colorMap: Record<string, string> = {
              not_started: "bg-gray-300",
              collecting: "bg-amber-400",
              generating: "bg-blue-400",
              editing: "bg-purple-400",
              review: "bg-orange-400",
              done: "bg-emerald-400",
            };
            return (
              <div
                key={scene.sceneId}
                className={`${colorMap[scene.status] ?? "bg-gray-300"} flex items-center justify-center`}
                style={{ width: `${pct}%` }}
                title={`${scene.title} (${scene.durationSec}秒)`}
              >
                <span className="text-[10px] text-white font-bold truncate px-1">
                  {scene.sceneId}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between mt-2 text-xs text-navy-400">
          <span>0:00</span>
          <span>
            {Math.floor(
              typedScenes.reduce((s, sc) => s + sc.durationSec, 0) / 60,
            )}
            :
            {String(
              typedScenes.reduce((s, sc) => s + sc.durationSec, 0) % 60,
            ).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {typedScenes.map((scene) => {
          const startSec = timelineSec;
          timelineSec += scene.durationSec;
          const sceneAssets = getSceneAssets(scene);
          const missing = sceneAssets.filter(
            (a) => a.status === "pending" || !a.path,
          );
          const ready = sceneAssets.filter(
            (a) => a.status === "adopted" && a.path,
          );
          const inProgress = sceneAssets.filter(
            (a) =>
              a.status !== "adopted" &&
              a.status !== "pending" &&
              a.status !== "rejected",
          );

          return (
            <div
              key={scene.sceneId}
              className="bg-white rounded-xl border border-sand-200 shadow-sm overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-sand-100 bg-gradient-to-r from-navy-50 to-transparent flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-xs font-mono bg-navy-700 text-white px-2 py-1 rounded">
                    {Math.floor(startSec / 60)}:
                    {String(startSec % 60).padStart(2, "0")} —{" "}
                    {Math.floor(timelineSec / 60)}:
                    {String(timelineSec % 60).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-800">{scene.title}</h3>
                    <p className="text-xs text-navy-400">
                      {scene.durationSec}秒
                    </p>
                  </div>
                </div>
                <Badge
                  label={sceneStatusLabel[scene.status]}
                  colorClass={sceneStatusColor[scene.status]}
                />
              </div>

              <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-xs font-bold text-navy-400 uppercase tracking-wider mb-3">
                    使用素材
                  </h4>
                  {sceneAssets.length === 0 ? (
                    <p className="text-sm text-navy-300">素材なし</p>
                  ) : (
                    <ul className="space-y-2">
                      {sceneAssets.map((a) => (
                        <li key={a.assetId} className="text-sm">
                          <div className="flex items-center gap-2">
                            <Badge
                              label={assetStatusLabel[a.status]}
                              colorClass={assetStatusColor[a.status]}
                            />
                            <span className="text-navy-700 font-medium">
                              {a.title}
                            </span>
                          </div>
                          {a.path && (
                            <code className="text-xs text-navy-400 block mt-0.5 ml-16 truncate">
                              {a.path}
                            </code>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div>
                  <h4 className="text-xs font-bold text-navy-400 uppercase tracking-wider mb-3">
                    編集メモ
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-xs text-navy-400">テロップ:</span>
                      <p className="text-navy-700 font-serif italic">
                        {scene.caption}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs text-navy-400">BGM/SE:</span>
                      <p className="text-navy-700">{scene.bgmCue}</p>
                    </div>
                    {scene.notes && (
                      <div>
                        <span className="text-xs text-navy-400">備考:</span>
                        <p className="text-navy-500">{scene.notes}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-navy-400 uppercase tracking-wider mb-3">
                    ステータス
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-emerald-400" />
                      <span className="text-navy-700">
                        準備完了: {ready.length}件
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-blue-400" />
                      <span className="text-navy-700">
                        進行中: {inProgress.length}件
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-400" />
                      <span className="text-navy-700">
                        不足: {missing.length}件
                      </span>
                    </div>
                  </div>
                  {missing.length > 0 && (
                    <div className="mt-3 p-2 bg-red-50 rounded text-xs text-red-700">
                      <p className="font-semibold mb-1">不足素材:</p>
                      <ul className="list-disc list-inside">
                        {missing.map((a) => (
                          <li key={a.assetId}>{a.title}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
