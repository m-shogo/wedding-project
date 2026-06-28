import { Header } from "../components/Header";
import { Badge } from "../components/Badge";
import { promptStatusLabel, promptStatusColor } from "../lib/labels";
import prompts from "../data/prompts.json";
import type { Prompt } from "../types/movie";

const typedPrompts = prompts as Prompt[];

export function PromptBank() {
  return (
    <div>
      <Header
        title="Prompt Bank"
        description="生成画像・AI動画用のプロンプト管理"
      />

      <div className="space-y-6">
        {typedPrompts.map((p) => (
          <div
            key={p.promptId}
            className="bg-white rounded-xl border border-sand-200 shadow-sm overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-sand-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-navy-400">
                  {p.promptId}
                </span>
                <h3 className="font-bold text-navy-800">{p.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  label={promptStatusLabel[p.status]}
                  colorClass={promptStatusColor[p.status]}
                />
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex flex-wrap gap-4 text-xs text-navy-500">
                <span>
                  <span className="font-semibold text-navy-400">Target:</span>{" "}
                  {p.target}
                </span>
                <span>
                  <span className="font-semibold text-navy-400">Tool:</span>{" "}
                  {p.tool}
                </span>
                <span>
                  <span className="font-semibold text-navy-400">Scenes:</span>{" "}
                  {p.relatedSceneIds.join(", ") || "—"}
                </span>
                {p.resultAssetIds.length > 0 && (
                  <span>
                    <span className="font-semibold text-navy-400">Results:</span>{" "}
                    {p.resultAssetIds.join(", ")}
                  </span>
                )}
              </div>

              <div>
                <p className="text-xs font-semibold text-navy-400 uppercase tracking-wider mb-2">
                  Positive Prompt
                </p>
                <pre className="text-sm text-navy-700 bg-sand-50 rounded-lg p-4 whitespace-pre-wrap break-words font-mono leading-relaxed select-all">
                  {p.prompt}
                </pre>
              </div>

              {p.negativePrompt && (
                <div>
                  <p className="text-xs font-semibold text-navy-400 uppercase tracking-wider mb-2">
                    Negative Prompt
                  </p>
                  <pre className="text-sm text-red-700 bg-red-50 rounded-lg p-4 whitespace-pre-wrap break-words font-mono leading-relaxed select-all">
                    {p.negativePrompt}
                  </pre>
                </div>
              )}

              {p.notes && (
                <div>
                  <p className="text-xs font-semibold text-navy-400 uppercase tracking-wider mb-2">
                    Notes
                  </p>
                  <p className="text-sm text-navy-500">{p.notes}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
