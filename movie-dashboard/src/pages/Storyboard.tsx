import { Header } from "../components/Header";
import { Badge } from "../components/Badge";
import { sceneStatusLabel, sceneStatusColor } from "../lib/labels";
import scenes from "../data/scenes.json";
import type { Scene } from "../types/movie";

const typedScenes = scenes as Scene[];

export function Storyboard() {
  return (
    <div>
      <Header
        title="Storyboard"
        description="オープニングムービーの絵コンテ一覧"
      />

      <div className="space-y-6">
        {typedScenes.map((scene, i) => (
          <div
            key={scene.sceneId}
            className="bg-white rounded-xl border border-sand-200 shadow-sm overflow-hidden"
          >
            <div className="flex items-center gap-4 px-6 py-4 border-b border-sand-100 bg-gradient-to-r from-navy-50 to-transparent">
              <div className="w-10 h-10 rounded-full bg-navy-700 text-white flex items-center justify-center font-bold text-sm shrink-0">
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-navy-800 truncate">
                    {scene.title}
                  </h3>
                  <Badge
                    label={sceneStatusLabel[scene.status]}
                    colorClass={sceneStatusColor[scene.status]}
                  />
                </div>
                <p className="text-xs text-navy-400 mt-0.5">
                  {scene.sceneId} &middot; {scene.durationSec}秒
                </p>
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-navy-400 uppercase tracking-wider mb-1">
                    Purpose
                  </p>
                  <p className="text-sm text-navy-700">{scene.purpose}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-navy-400 uppercase tracking-wider mb-1">
                    Visual
                  </p>
                  <p className="text-sm text-navy-700">{scene.visual}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-navy-400 uppercase tracking-wider mb-1">
                    Caption
                  </p>
                  <p className="text-sm text-navy-700 font-serif italic">
                    {scene.caption}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-navy-400 uppercase tracking-wider mb-1">
                    BGM Cue
                  </p>
                  <p className="text-sm text-navy-700">{scene.bgmCue}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-navy-400 uppercase tracking-wider mb-1">
                    Assets
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {scene.assets.length > 0 ? (
                      scene.assets.map((a) => (
                        <span
                          key={a}
                          className="inline-block px-2 py-0.5 text-xs bg-sand-100 text-navy-600 rounded font-mono"
                        >
                          {a}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-navy-300">なし</span>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-navy-400 uppercase tracking-wider mb-1">
                    Prompts
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {scene.promptIds.length > 0 ? (
                      scene.promptIds.map((p) => (
                        <span
                          key={p}
                          className="inline-block px-2 py-0.5 text-xs bg-gold-100 text-gold-700 rounded font-mono"
                        >
                          {p}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-navy-300">なし</span>
                    )}
                  </div>
                </div>
                {scene.notes && (
                  <div>
                    <p className="text-xs font-semibold text-navy-400 uppercase tracking-wider mb-1">
                      Notes
                    </p>
                    <p className="text-sm text-navy-500 bg-sand-50 rounded p-2">
                      {scene.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
