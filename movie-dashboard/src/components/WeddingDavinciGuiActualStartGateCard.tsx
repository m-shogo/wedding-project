import {useState} from "react";
import {
  auditWeddingDavinciGuiActualStartGate,
  defaultWeddingDavinciGuiActualStartGateAudits,
  type WeddingDavinciGuiActualStartGateAudit,
  type WeddingMovieId,
} from "../data/weddingDavinciGuiActualStartGateAudit";
import {publishWeddingDavinciGuiActualStartGateAudit} from "../data/weddingDavinciGuiActualStartGateLiveAuthority";

export const WEDDING_DAVINCI_GUI_ACTUAL_START_GATE_ANCHOR = "davinci-gui-actual-start-gate" as const;

const shortSha = (value: string | null) => value ? `${value.slice(0, 10)}…` : "—";

const stateClass = (state: string) => {
  if (state === "GUI_ACTUAL_COMPLETE" || state === "CURRENT") return "text-emerald-700 dark:text-emerald-300";
  if (state === "INVALID" || state.includes("BLOCKED") || state === "TRANSPORT_NOT_CURRENT") return "text-rose-700 dark:text-rose-300";
  return "text-amber-700 dark:text-amber-300";
};

type GateAudits = Record<WeddingMovieId, WeddingDavinciGuiActualStartGateAudit>;

export function WeddingDavinciGuiActualStartGateCard() {
  const [audits, setAudits] = useState<GateAudits>({
    opening: defaultWeddingDavinciGuiActualStartGateAudits.opening,
    profile: defaultWeddingDavinciGuiActualStartGateAudits.profile,
  });

  const inspect = async (movieId: WeddingMovieId, file: File | undefined) => {
    if (!file) return;
    let audit: WeddingDavinciGuiActualStartGateAudit;
    try {
      const parsed = JSON.parse(await file.text());
      audit = auditWeddingDavinciGuiActualStartGate(movieId, parsed);
    } catch {
      audit = auditWeddingDavinciGuiActualStartGate(movieId, null);
    }
    setAudits((current) => ({...current, [movieId]: audit}));
    publishWeddingDavinciGuiActualStartGateAudit(movieId, audit);
  };

  return (
    <section id={WEDDING_DAVINCI_GUI_ACTUAL_START_GATE_ANCHOR} className="mb-10 scroll-mt-6 border border-amber-300 dark:border-amber-900/60 bg-white dark:bg-navy-800 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[10px] tracking-[0.2em] font-semibold text-amber-700 dark:text-amber-300">MAC DAVINCI GUI ACTUAL START GATE</p>
          <h2 className="mt-1 text-lg font-bold text-navy-900 dark:text-sand-100">Session Plan CURRENT → Project Motion + Remotion identity CURRENT → Evidence init → Human Mac GUI</h2>
          <p className="mt-2 text-xs leading-5 text-navy-500 dark:text-navy-300">
            Motion Studioのcanonical start-gate JSON artifactを生成・読み込み、Opening/ProfileそれぞれのTransport・Project Motion・Project Remotion identity・正確な次アクションを表示します。GUI_ACTUAL_ALLOWEDは「人間が開始してよい」だけで、実行済み/PASSではありません。
          </p>
        </div>
        <p className="text-[10px] leading-4 text-amber-700 dark:text-amber-300">GUI Actual synthetic promotion: FORBIDDEN</p>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-2">
        {(["opening", "profile"] as const).map((movieId) => {
          const audit = audits[movieId];
          const label = movieId === "opening" ? "Opening" : "Profile";
          const projectMotion = audit.project.projectMotionPreflight;
          const projectRemotionIdentity = audit.project.projectRemotionIdentityPreflight;
          return (
            <article key={movieId} className="border border-sand-200 dark:border-navy-600 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-bold text-navy-900 dark:text-sand-100">{label}</h3>
                <span className={`text-xs font-bold ${stateClass(audit.state)}`}>{audit.state}</span>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-3">
                <label className="cursor-pointer border border-amber-500 px-3 py-2 text-[11px] font-semibold text-amber-800 dark:text-amber-200 hover:bg-amber-100 dark:hover:bg-amber-950/40">
                  canonical gate JSONを読み込む
                  <input
                    type="file"
                    accept="application/json,.json"
                    className="hidden"
                    onChange={(event) => void inspect(movieId, event.target.files?.[0])}
                  />
                </label>
                <span className="text-[10px] text-navy-400">loaded: {audit.canonicalGateLoaded ? "YES" : "NO"}</span>
              </div>

              <div className="mt-3 border border-amber-100 dark:border-amber-900/50 px-3 py-2 text-[9px] leading-4 text-navy-500 dark:text-navy-300">
                <p className="font-semibold text-navy-700 dark:text-sand-200">Canonical artifact</p>
                <code className="mt-1 block overflow-x-auto whitespace-nowrap">motion-studio/{audit.canonicalArtifactPath}</code>
                <p className="mt-1 text-navy-400">下のinspect commandがこのJSONを保存します。artifactが存在してもGUI Actual実行済みにはなりません。</p>
              </div>

              <dl className="mt-4 grid grid-cols-[max-content_1fr] gap-x-3 gap-y-2 text-[10px] leading-4 text-navy-500 dark:text-navy-300">
                <dt className="font-semibold">Transport</dt><dd>{audit.transport.state} / current={audit.transport.current ? "YES" : "NO"}</dd>
                <dt className="font-semibold">Project Motion</dt>
                <dd>
                  <span className={`font-bold ${stateClass(projectMotion.state ?? "NOT_RUN")}`}>{projectMotion.state ?? "—"}</span>
                  {projectMotion.state && <> / applicable={projectMotion.applicable ? "YES" : "NO"} / current={projectMotion.current ? "YES" : "NO"}</>}
                </dd>
                <dt className="font-semibold">Remotion identity</dt>
                <dd>
                  <span className={`font-bold ${stateClass(projectRemotionIdentity.state ?? "NOT_RUN")}`}>{projectRemotionIdentity.state ?? "—"}</span>
                  {projectRemotionIdentity.state && <> / applicable={projectRemotionIdentity.applicable ? "YES" : "NO"} / current={projectRemotionIdentity.current ? "YES" : "NO"}</>}
                </dd>
                <dt className="font-semibold">Identity receipt</dt><dd className="font-mono">{shortSha(projectRemotionIdentity.receiptSha256)}</dd>
                <dt className="font-semibold">Resolve identity</dt><dd className="font-mono">{shortSha(projectRemotionIdentity.resolveSidecarSha256)}</dd>
                <dt className="font-semibold">Source Batch</dt><dd className="font-mono">{shortSha(projectRemotionIdentity.sourceBatchSha256)}</dd>
                <dt className="font-semibold">Session</dt><dd>{audit.project.sessionState ?? "—"}</dd>
                <dt className="font-semibold">Evidence</dt><dd>{audit.project.evidenceState ?? "—"}</dd>
                <dt className="font-semibold">Handoff SHA</dt><dd className="font-mono">{shortSha(audit.project.handoffIdentitySha256)}</dd>
                <dt className="font-semibold">Recovery SHA</dt><dd className="font-mono">{shortSha(audit.project.actualRecoverySha256)}</dd>
                <dt className="font-semibold">GUI start</dt><dd>{audit.guiActualStartAllowed ? "ALLOWED / HUMAN ONLY" : "BLOCKED"}</dd>
                <dt className="font-semibold">Next</dt><dd>{audit.nextAction.kind}</dd>
              </dl>

              {projectMotion.error && (
                <p className="mt-3 border-l-2 border-rose-400 pl-3 text-[10px] leading-4 text-rose-700 dark:text-rose-300">
                  Project Motion blocker: {projectMotion.error}
                </p>
              )}
              {projectMotion.command && (
                <div className="mt-3">
                  <p className="text-[9px] font-semibold text-navy-700 dark:text-sand-200">Project Motion canonical verifier</p>
                  <code className="mt-1 block overflow-x-auto bg-navy-950 px-3 py-2 text-[9px] leading-4 text-sand-100">cd motion-studio &amp;&amp; {projectMotion.command}</code>
                </div>
              )}

              {projectRemotionIdentity.error && (
                <p className="mt-3 border-l-2 border-rose-400 pl-3 text-[10px] leading-4 text-rose-700 dark:text-rose-300">
                  Project Remotion identity blocker: {projectRemotionIdentity.error}
                </p>
              )}
              {projectRemotionIdentity.command && (
                <div className="mt-3">
                  <p className="text-[9px] font-semibold text-navy-700 dark:text-sand-200">Project Remotion identity canonical verifier</p>
                  <code className="mt-1 block overflow-x-auto bg-navy-950 px-3 py-2 text-[9px] leading-4 text-sand-100">cd motion-studio &amp;&amp; {projectRemotionIdentity.command}</code>
                  <p className="mt-1 text-[9px] leading-4 text-navy-400">receipt / Resolve sidecar / source Batch SHAの表示自体はCURRENTを証明しません。canonical gateでlive authorityと再照合します。</p>
                </div>
              )}

              <p className="mt-3 text-[10px] leading-4 text-navy-600 dark:text-navy-300">{audit.nextAction.reason}</p>
              {audit.nextAction.command && (
                <code className="mt-2 block overflow-x-auto bg-navy-950 px-3 py-2 text-[9px] leading-4 text-sand-100">{audit.nextAction.command}</code>
              )}
              {audit.nextAction.humanOnly && (
                <p className="mt-2 border-l-2 border-amber-400 pl-3 text-[10px] font-semibold leading-4 text-amber-800 dark:text-amber-300">
                  HUMAN / MAC GUI — automation commandなし。ここから実機で確認し、evidenceへ記録する。
                </p>
              )}

              {(audit.mismatches.length > 0 || audit.transport.mismatches.length > 0) && (
                <ul className="mt-3 space-y-1 text-[9px] leading-4 text-rose-700 dark:text-rose-300">
                  {[...audit.mismatches, ...audit.transport.mismatches].map((reason, index) => <li key={`${reason}-${index}`}>• {reason}</li>)}
                </ul>
              )}

              <div className="mt-4 border-t border-sand-200 dark:border-navy-600 pt-3">
                <p className="text-[9px] font-semibold text-navy-700 dark:text-sand-200">1. inspect / canonical JSON保存</p>
                <code className="mt-1 block overflow-x-auto text-[9px] leading-4 text-navy-500 dark:text-navy-300">{audit.inspectCommand}</code>
                <p className="mt-3 text-[9px] font-semibold text-navy-700 dark:text-sand-200">2. GUI開始直前のstrict gate + JSON更新</p>
                <code className="mt-1 block overflow-x-auto text-[9px] leading-4 text-navy-500 dark:text-navy-300">{audit.strictGuiStartCommand}</code>
              </div>
            </article>
          );
        })}
      </div>

      <p className="mt-4 text-[10px] leading-4 text-navy-400">
        canonical gate JSON・Dashboard・CIの存在、Project Motion / Project Remotion identity verifier commandやSHAの表示はMac/Studio/DaVinci Actual PASSを意味しません。今回GUIを実操作していない場合、Actual evidenceはNOT_RUNのままです。
      </p>
    </section>
  );
}
