import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { useProduction } from "../store/productionStore";
import { buildPalmierWeddingProductionGate } from "../lib/palmierWeddingProductionGate";
import {
  fusionDecisionRules,
  fusionLearningRecipes,
  fusionNodeLessons,
  type FusionNodeId,
} from "../data/fusionNodeTranslator";

function NodeBadge({ nodeId }: { nodeId: FusionNodeId }) {
  const node = fusionNodeLessons.find((item) => item.nodeId === nodeId);
  if (!node) return null;

  return (
    <span className="inline-flex flex-col border border-sand-300 dark:border-navy-500 px-3 py-2 min-w-[118px] bg-white dark:bg-navy-800">
      <span className="text-[10px] font-mono text-navy-400">{node.nodeName}</span>
      <span className="mt-0.5 text-xs font-bold text-navy-800 dark:text-sand-100">{node.plainName}</span>
    </span>
  );
}

export function FusionNodeTranslator() {
  const { selectedMovieId } = useProduction();
  const [selectedRecipeId, setSelectedRecipeId] = useState(fusionLearningRecipes[0]?.recipeId ?? "");
  const [selectedNodeId, setSelectedNodeId] = useState<FusionNodeId>("merge");

  const selectedRecipe = useMemo(
    () => fusionLearningRecipes.find((recipe) => recipe.recipeId === selectedRecipeId) ?? fusionLearningRecipes[0],
    [selectedRecipeId],
  );
  const selectedNode = fusionNodeLessons.find((node) => node.nodeId === selectedNodeId) ?? fusionNodeLessons[0];
  const productionGate = useMemo(
    () => buildPalmierWeddingProductionGate(selectedMovieId),
    [selectedMovieId],
  );

  return (
    <div>
      <Header
        title="FUSION NODE TRANSLATOR"
        description="Node名を暗記せず、映像がどこから入り・何をされ・どこへ出るかでFusionを理解する"
        showMovieSelector
      />

      <section className={`mb-9 border p-4 ${productionGate.productionReady ? "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-900/20" : "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20"}`}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">WEDDING PRODUCTION AUTHORITY</p>
            <h2 className="mt-1 text-lg font-bold text-navy-900 dark:text-sand-100">Fusion練習と本番DaVinci Actualを分離する</h2>
            <p className="mt-1 text-xs leading-5 text-navy-600 dark:text-navy-200">この画面のNode練習・recipe理解はMac DaVinci Actualの証拠ではありません。Palmier→DaVinci production bridgeのcurrent状態を読み、本番作業へ進める位置だけを表示します。</p>
          </div>
          <Link to="/palmier-handoff" className="shrink-0 px-3 py-2 rounded-lg bg-navy-700 text-white text-xs hover:bg-navy-800">Production Handoffを見る →</Link>
        </div>
        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          {productionGate.projects.map((project) => {
            const studio = project.remotionStudioToolingEvidence;
            return (
            <div key={project.movieId} className="rounded-lg border border-current/15 bg-white/70 dark:bg-navy-800/50 p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-bold text-navy-800 dark:text-sand-100">{project.title}</p>
                <code className={`text-[10px] ${project.bridge.state === "READY" ? "text-emerald-700 dark:text-emerald-300" : "text-amber-700 dark:text-amber-300"}`}>{project.bridge.state}</code>
              </div>
              <div className="mt-2 grid gap-1 text-[11px] text-navy-600 dark:text-navy-200">
                <p>{project.bridge.palmierCurrent ? "✓" : "○"} Palmier current · {project.bridge.palmierContractVersion}</p>
                <p>{project.bridge.davinciHandoffCurrent ? "✓" : "○"} DaVinci handoff current · {project.bridge.davinciContractVersion}</p>
                <p>{project.bridge.macDaVinciActualVerified ? "✓" : "○"} Mac DaVinci Actual verified</p>
                <p>{project.bridge.finalDeliveryApproved ? "✓" : "○"} Final delivery approved</p>
              </div>

              <div className="mt-3 rounded border border-sky-200 bg-sky-50/70 p-2 dark:border-sky-800 dark:bg-sky-900/15">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-[10px] font-semibold tracking-widest text-sky-800 dark:text-sky-200">REMOTION STUDIO TOOLING AUTHORITY</p>
                  <code className={`text-[9px] ${studio.currentRepoState === "VERIFIED" ? "text-emerald-700 dark:text-emerald-300" : "text-sky-700 dark:text-sky-300"}`}>{studio.currentRepoState}</code>
                </div>
                <p className="mt-1 text-[10px] leading-4 text-sky-800 dark:text-sky-200">Motion図鑑 Typography Element toolingのActual証拠参照です。Wedding production gate / Mac DaVinci Actualとは別authorityです。</p>
                <div className="mt-2 grid grid-cols-2 gap-2 text-[10px] text-navy-600 dark:text-navy-200">
                  <p><strong>Candidates:</strong> {studio.candidateCount}</p>
                  <p><strong>Checks each:</strong> {studio.checkAxesPerCandidate}</p>
                  <p>{studio.humanReviewed ? "✓" : "○"} Human reviewed</p>
                  <p>{studio.productionDependencyPromoted ? "✓" : "○"} Production dependency promoted</p>
                </div>
                <p className="mt-2 break-all text-[9px] text-navy-400"><strong>Summary:</strong> {studio.summaryPath}</p>
                <p className="mt-1 break-all text-[9px] text-navy-400"><strong>Evidence:</strong> {studio.evidencePath}</p>
                <div className="mt-2 grid gap-1">
                  <code className="block break-all rounded bg-white/80 px-2 py-1 text-[9px] text-sky-800 dark:bg-navy-950/30 dark:text-sky-200">status: {studio.statusCommand}</code>
                  <code className="block break-all rounded bg-white/80 px-2 py-1 text-[9px] text-sky-800 dark:bg-navy-950/30 dark:text-sky-200">strict: {studio.strictCommand}</code>
                </div>
                <p className="mt-2 text-[9px] font-semibold text-sky-800 dark:text-sky-200">Tooling evidenceを表示・exportしてもStudio Actual verifiedにはなりません。Element未採用ならWedding productionをBLOCKしません。</p>
              </div>

              {!project.productionReady && (
                <div className="mt-3 border-t border-current/10 pt-2">
                  <p className="text-[11px] text-navy-500 dark:text-navy-300"><strong>NOW:</strong> {project.nextGate.stage ?? project.overallState}</p>
                  <p className="mt-1 text-[10px] text-navy-400 break-all">{project.nextGate.artifactPath ?? "production artifact未確定"}</p>

                  <div className="mt-3">
                    <p className="text-[10px] font-semibold tracking-widest text-navy-500 dark:text-navy-300">STABLE BLOCKERS</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {project.nextGate.blockerCodes.length > 0 ? project.nextGate.blockerCodes.map((code) => (
                        <code key={code} className="rounded bg-amber-100 px-1.5 py-0.5 text-[9px] text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">{code}</code>
                      )) : <span className="text-[10px] text-navy-400">none</span>}
                    </div>
                  </div>

                  <div className="mt-3">
                    <p className="text-[10px] font-semibold tracking-widest text-navy-500 dark:text-navy-300">RECOVERY ACTIONS</p>
                    <div className="mt-1 grid gap-2">
                      {project.nextGate.blockerActions.length > 0 ? project.nextGate.blockerActions.map((action) => (
                        <div key={action.id} className="rounded border border-current/10 bg-white/70 p-2 dark:bg-navy-900/20">
                          <div className="flex flex-wrap items-center gap-2">
                            <code className="text-[9px] text-navy-400">{action.kind}</code>
                            {action.kind === "ROUTE" && action.route ? (
                              <Link to={action.route} className="text-[11px] font-semibold text-navy-700 underline decoration-navy-300 underline-offset-2 dark:text-sand-100">{action.label} →</Link>
                            ) : (
                              <span className="text-[11px] font-semibold text-navy-700 dark:text-sand-100">{action.label}</span>
                            )}
                          </div>
                          <p className="mt-1 text-[10px] leading-4 text-navy-500 dark:text-navy-300">{action.purpose}</p>
                          {action.kind === "COMMAND" && action.command && (
                            <code className="mt-1 block break-all rounded bg-navy-950/5 px-2 py-1 text-[9px] text-navy-600 dark:bg-white/5 dark:text-navy-200">{action.command}</code>
                          )}
                          {action.kind === "HUMAN" && (
                            <p className="mt-1 text-[9px] font-semibold text-amber-700 dark:text-amber-300">Human action required · この画面からPASSへ昇格しません</p>
                          )}
                        </div>
                      )) : <p className="text-[10px] text-navy-400">structured recovery actionなし</p>}
                    </div>
                  </div>

                  <div className="mt-3">
                    <p className="text-[10px] font-semibold tracking-widest text-navy-500 dark:text-navy-300">CANONICAL RECOVERY</p>
                    <ul className="mt-1 grid gap-1 text-[10px] leading-4 text-navy-500 dark:text-navy-300">
                      {project.nextGate.recovery.length > 0 ? project.nextGate.recovery.map((item) => <li key={item}>• {item}</li>) : <li>• recoveryなし</li>}
                    </ul>
                  </div>
                </div>
              )}
              {project.bridge.state === "MAC_DAVINCI_ACTUAL_NOT_VERIFIED" && (
                <div className="mt-3 rounded bg-amber-100/70 dark:bg-amber-900/20 p-2">
                  <p className="text-[10px] font-semibold text-amber-800 dark:text-amber-200">MAC ACTUAL GATE</p>
                  <p className="mt-1 text-[10px] text-amber-700 dark:text-amber-300 break-all">Evidence: {project.bridge.actualEvidencePath}</p>
                  <div className="mt-2 grid gap-1.5">
                    <div>
                      <p className="text-[9px] font-semibold text-amber-800 dark:text-amber-200">01 INIT EVIDENCE</p>
                      <code className="mt-0.5 block break-all rounded bg-white/70 px-2 py-1 text-[9px] text-amber-800 dark:bg-navy-950/30 dark:text-amber-200">{project.bridge.actualCommands.init}</code>
                    </div>
                    <div>
                      <p className="text-[9px] font-semibold text-amber-800 dark:text-amber-200">02 CHECK STATUS</p>
                      <code className="mt-0.5 block break-all rounded bg-white/70 px-2 py-1 text-[9px] text-amber-800 dark:bg-navy-950/30 dark:text-amber-200">{project.bridge.actualCommands.status}</code>
                    </div>
                    <div>
                      <p className="text-[9px] font-semibold text-amber-800 dark:text-amber-200">03 STRICT VERIFY</p>
                      <code className="mt-0.5 block break-all rounded bg-white/70 px-2 py-1 text-[9px] text-amber-800 dark:bg-navy-950/30 dark:text-amber-200">{project.bridge.actualCommands.strict}</code>
                    </div>
                  </div>
                  <p className="mt-2 text-[10px] text-amber-700 dark:text-amber-300">コマンド表示・initだけではActual verifiedになりません。Resolve GUIで実確認・exportし、current evidenceを記録してstrictを通した場合だけ次へ進みます。</p>
                  <p className="mt-1 text-[10px] text-amber-700 dark:text-amber-300">実際にResolve GUIで確認・exportしていない限り、このgateはPASSにしません。</p>
                </div>
              )}
            </div>
            );
          })}
        </div>
      </section>

      <section className="mb-9 border-y border-sand-200 dark:border-navy-600 py-5">
        <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">FUSION GATE</p>
        <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">まず「Fusionを使わない」判断から始める</h2>
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {fusionDecisionRules.map((item) => (
            <div key={item.label} className="border-l-2 border-navy-700 dark:border-sand-200 pl-4">
              <p className="text-sm font-bold text-navy-800 dark:text-sand-100">{item.label}</p>
              <p className="mt-1 text-xs font-mono text-navy-400">{item.examples}</p>
              <p className="mt-2 text-sm leading-6 text-navy-600 dark:text-navy-300">{item.rule}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <div className="border-b-2 border-navy-900 dark:border-sand-100 pb-3 mb-4">
          <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">NODE DICTIONARY</p>
          <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">英語名 → 人間の言葉 → 信号の役割</h2>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[0.8fr_1.4fr] gap-7">
          <div className="divide-y divide-sand-100 dark:divide-navy-700 border-y border-sand-200 dark:border-navy-600">
            {fusionNodeLessons.map((node) => {
              const active = selectedNode.nodeId === node.nodeId;
              return (
                <button
                  key={node.nodeId}
                  type="button"
                  onClick={() => setSelectedNodeId(node.nodeId)}
                  className={`w-full text-left px-3 py-3 border-l-2 ${
                    active
                      ? "border-navy-900 bg-sand-50 dark:border-sand-100 dark:bg-navy-800"
                      : "border-transparent"
                  }`}
                >
                  <span className="text-[10px] font-mono text-navy-400">{node.nodeName}</span>
                  <span className="block mt-0.5 text-sm font-semibold text-navy-800 dark:text-sand-100">{node.plainName}</span>
                </button>
              );
            })}
          </div>

          <article>
            <div className="flex flex-wrap items-baseline gap-x-3 border-b border-sand-200 dark:border-navy-600 pb-3">
              <h3 className="text-2xl font-mono font-bold text-navy-900 dark:text-sand-100">{selectedNode.nodeName}</h3>
              <span className="text-sm text-navy-500 dark:text-navy-300">= {selectedNode.plainName}</span>
            </div>
            <p className="mt-4 text-base leading-7 text-navy-700 dark:text-navy-200">{selectedNode.role}</p>
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5 border-y border-sand-200 dark:border-navy-600 py-4">
              <div>
                <p className="text-[10px] tracking-widest font-semibold text-navy-400">INPUT</p>
                <p className="mt-1 text-sm font-mono text-navy-700 dark:text-navy-200">{selectedNode.input}</p>
              </div>
              <div>
                <p className="text-[10px] tracking-widest font-semibold text-navy-400">OUTPUT</p>
                <p className="mt-1 text-sm font-mono text-navy-700 dark:text-navy-200">{selectedNode.output}</p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-[10px] tracking-widest font-semibold text-emerald-700 dark:text-emerald-300">WHEN TO USE</p>
                <p className="mt-1 text-sm leading-6 text-navy-700 dark:text-navy-200">{selectedNode.whenToUse}</p>
              </div>
              <div>
                <p className="text-[10px] tracking-widest font-semibold text-red-700 dark:text-red-300">COMMON MISTAKE</p>
                <p className="mt-1 text-sm leading-6 text-navy-700 dark:text-navy-200">{selectedNode.commonMistake}</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="mb-10">
        <div className="border-b-2 border-navy-900 dark:border-sand-100 pb-3 mb-4">
          <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">READ A NODE GRAPH</p>
          <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">Wedding Recipeから配線を読む</h2>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[0.75fr_1.5fr] gap-7">
          <div className="divide-y divide-sand-100 dark:divide-navy-700 border-y border-sand-200 dark:border-navy-600">
            {fusionLearningRecipes.map((recipe) => {
              const active = selectedRecipe?.recipeId === recipe.recipeId;
              return (
                <button
                  key={recipe.recipeId}
                  type="button"
                  onClick={() => setSelectedRecipeId(recipe.recipeId)}
                  className={`w-full text-left py-3 px-3 border-l-2 ${
                    active
                      ? "border-navy-900 bg-sand-50 dark:border-sand-100 dark:bg-navy-800"
                      : "border-transparent"
                  }`}
                >
                  <span className={`text-[10px] font-mono ${recipe.useFusion ? "text-amber-700 dark:text-amber-300" : "text-emerald-700 dark:text-emerald-300"}`}>
                    {recipe.useFusion ? "FUSION" : "EDIT FIRST"}
                  </span>
                  <span className="block mt-1 text-sm font-semibold text-navy-800 dark:text-sand-100">{recipe.title}</span>
                </button>
              );
            })}
          </div>

          {selectedRecipe && (
            <article>
              <div className="border-b border-sand-200 dark:border-navy-600 pb-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-[10px] font-mono border-b ${selectedRecipe.useFusion ? "text-amber-700 border-amber-300 dark:text-amber-300" : "text-emerald-700 border-emerald-300 dark:text-emerald-300"}`}>
                    {selectedRecipe.useFusion ? "USE FUSION" : "DO NOT USE FUSION"}
                  </span>
                </div>
                <h3 className="mt-2 text-2xl font-bold text-navy-900 dark:text-sand-100">{selectedRecipe.title}</h3>
                <p className="mt-1 text-sm text-navy-600 dark:text-navy-300">{selectedRecipe.goal}</p>
              </div>

              <div className="mt-5 overflow-x-auto pb-2">
                <div className="flex items-center gap-2 min-w-max">
                  {selectedRecipe.steps.map((step, index) => (
                    <div key={`${step.nodeId}-${index}`} className="flex items-center gap-2">
                      {index > 0 && <span className="font-mono text-navy-300 dark:text-navy-500">→</span>}
                      <button type="button" onClick={() => setSelectedNodeId(step.nodeId)}>
                        <NodeBadge nodeId={step.nodeId} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <ol className="mt-4 space-y-2 border-y border-sand-200 dark:border-navy-600 py-4">
                {selectedRecipe.steps.map((step, index) => {
                  const node = fusionNodeLessons.find((item) => item.nodeId === step.nodeId);
                  return (
                    <li key={`${step.nodeId}-note-${index}`} className="grid grid-cols-[28px_100px_1fr] gap-2 text-sm">
                      <span className="font-mono text-navy-400">{String(index + 1).padStart(2, "0")}</span>
                      <span className="font-mono font-semibold text-navy-700 dark:text-sand-200">{node?.nodeName}</span>
                      <span className="text-navy-600 dark:text-navy-300">{step.note}</span>
                    </li>
                  );
                })}
              </ol>

              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-[10px] tracking-widest font-semibold text-navy-400">WHY</p>
                  <p className="mt-1 text-sm leading-6 text-navy-700 dark:text-navy-200">{selectedRecipe.why}</p>
                  <p className="mt-4 text-[10px] tracking-widest font-semibold text-navy-400">EDIT ALTERNATIVE</p>
                  <p className="mt-1 text-sm leading-6 text-navy-700 dark:text-navy-200">{selectedRecipe.editAlternative}</p>
                </div>
                <div>
                  <p className="text-[10px] tracking-widest font-semibold text-emerald-700 dark:text-emerald-300">WEDDING USE</p>
                  <p className="mt-1 text-sm leading-6 text-navy-700 dark:text-navy-200">{selectedRecipe.weddingUse}</p>
                  <p className="mt-4 text-[10px] tracking-widest font-semibold text-red-700 dark:text-red-300">AVOID</p>
                  <ul className="mt-1 space-y-1 text-sm text-navy-600 dark:text-navy-300">
                    {selectedRecipe.avoid.map((item) => <li key={item}>× {item}</li>)}
                  </ul>
                </div>
              </div>
            </article>
          )}
        </div>
      </section>

      <section className="border-y border-sand-200 dark:border-navy-600 py-5">
        <p className="text-[10px] tracking-[0.2em] font-semibold text-navy-400">7 MIN PRACTICE</p>
        <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">MediaIn → Transform → MediaOutだけ作る</h2>
        <ol className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-navy-700 dark:text-navy-200">
          <li><span className="font-mono text-navy-400">01</span><p className="mt-1">Weddingで使う必要のない練習用clipを1つFusionで開く。</p></li>
          <li><span className="font-mono text-navy-400">02</span><p className="mt-1">MediaInとMediaOutの間へTransformを1つだけ追加。</p></li>
          <li><span className="font-mono text-navy-400">03</span><p className="mt-1">Scaleを少し変え、信号がTransformを通って結果へ届くことを確認。</p></li>
          <li><span className="font-mono text-navy-400">04</span><p className="mt-1">Transformを外して比較し、Nodeを足す理由を言葉にする。</p></li>
        </ol>
        <p className="mt-4 text-xs text-navy-400">完成条件: Node名を暗記することではなく、配線を見て「元映像 → 処理 → 完成」と説明できること。</p>
      </section>

      <div className="mt-7 flex flex-wrap gap-4 text-xs">
        <Link to="/movie-coach" className="border-b border-navy-300 text-navy-600 dark:text-navy-300">← Movie Coach</Link>
        <Link to="/movie-coach/dictionary?q=合成" className="border-b border-navy-300 text-navy-600 dark:text-navy-300">逆引き辞典で合成を調べる →</Link>
        <Link to="/movie-coach/review" className="border-b border-navy-300 text-navy-600 dark:text-navy-300">作った10秒をReviewする →</Link>
      </div>
    </div>
  );
}
