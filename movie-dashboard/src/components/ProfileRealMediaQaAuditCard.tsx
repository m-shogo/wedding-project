import {
  getProfileRealMediaQaAuditSurface,
  type ProfileRealMediaQaState,
} from "../data/profileRealMediaQaAudit";

const shortSha = (value: string | null) => value ? `${value.slice(0, 12)}…` : "—";

function qaTone(state: ProfileRealMediaQaState | "BLOCKED") {
  if (state === "PASS") return "border-emerald-300 text-emerald-700 dark:text-emerald-300";
  if (state === "FAIL" || state === "BLOCKED") return "border-red-300 text-red-700 dark:text-red-300";
  return "border-amber-300 text-amber-700 dark:text-amber-300";
}

function QaBadge({label, state}: {label: string; state: ProfileRealMediaQaState}) {
  return (
    <span className={`inline-flex items-center gap-1 border px-2 py-1 text-[10px] ${qaTone(state)}`}>
      <span>{label}</span>
      <strong>{state}</strong>
    </span>
  );
}

export function ProfileRealMediaQaAuditCard() {
  const surface = getProfileRealMediaQaAuditSurface();
  const {audit} = surface;
  return (
    <section className="border border-violet-200 dark:border-violet-900/60 bg-violet-50/40 dark:bg-violet-950/10 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[10px] tracking-[0.2em] font-semibold text-violet-700 dark:text-violet-300">PROFILE REAL-MEDIA HUMAN QA / AUDIT</p>
          <h3 className="mt-1 text-base font-bold text-navy-900 dark:text-sand-100">承認済み証拠と「何が変わるとSTALEか」を確認</h3>
          <p className="mt-2 text-xs leading-5 text-navy-500 dark:text-navy-300">
            Motion Studio正本のHuman review evidenceを表示するだけです。ここからPASSやMac Actualへ昇格しません。
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-[10px]">
          <span className={`border px-2 py-1 font-semibold ${qaTone(surface.state)}`}>{surface.state}</span>
          <span className="border border-sand-300 dark:border-navy-600 px-2 py-1">Media {surface.mediaReviewed}/{surface.mediaExpected}</span>
          <span className="border border-sand-300 dark:border-navy-600 px-2 py-1">DaVinci Actual {surface.macDaVinciActual}</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-3 text-[11px]">
        <div className="border border-sand-200 dark:border-navy-700 bg-white/80 dark:bg-navy-900/60 p-3">
          <p className="font-semibold text-navy-900 dark:text-sand-100">Evidence binding</p>
          <dl className="mt-2 space-y-1 text-navy-500 dark:text-navy-300">
            <div><dt className="inline font-medium">Path:</dt> <dd className="inline font-mono break-all">{audit.evidencePath}</dd></div>
            <div><dt className="inline font-medium">Evidence:</dt> <dd className="inline font-mono">{audit.evidenceExists ? shortSha(audit.evidenceSha256) : "MISSING"}</dd></div>
            <div><dt className="inline font-medium">Parse:</dt> <dd className="inline font-mono">{audit.parseState}</dd></div>
            <div><dt className="inline font-medium">Bound at:</dt> <dd className="inline font-mono">{audit.boundAt ?? "—"}</dd></div>
          </dl>
        </div>
        <div className="border border-sand-200 dark:border-navy-700 bg-white/80 dark:bg-navy-900/60 p-3">
          <p className="font-semibold text-navy-900 dark:text-sand-100">Staleness fingerprints</p>
          <dl className="mt-2 space-y-1 text-navy-500 dark:text-navy-300">
            <div><dt className="inline font-medium">Preview SHA:</dt> <dd className="inline font-mono">{shortSha(audit.preview?.sha256 ?? null)}</dd></div>
            <div><dt className="inline font-medium">Preview sources:</dt> <dd className="inline font-mono">{shortSha(audit.previewSourceFingerprintSha256)}</dd></div>
            <div><dt className="inline font-medium">Runtime manifest:</dt> <dd className="inline font-mono">{shortSha(audit.runtimeManifestSha256)}</dd></div>
            <div><dt className="inline font-medium">Production plan:</dt> <dd className="inline font-mono">{shortSha(audit.productionPlanSha256)}</dd></div>
            <div><dt className="inline font-medium">Preview component:</dt> <dd className="inline font-mono">{shortSha(audit.previewComponentSha256)}</dd></div>
          </dl>
        </div>
      </div>

      {!audit.evidenceExists ? (
        <div className="mt-3 border border-amber-300 bg-amber-50/70 dark:bg-amber-950/20 p-3 text-xs text-amber-800 dark:text-amber-200">
          Human real-media review evidence はまだありません。現在の状態は正しく <strong>NOT_RUN</strong> です。実素材previewを生成して既存review flowを実行した時だけ、この欄にSHA-bound証拠が出ます。
        </div>
      ) : null}

      {audit.media.length > 0 ? (
        <div className="mt-4">
          <p className="text-xs font-semibold text-navy-900 dark:text-sand-100">17素材 QA binding</p>
          <div className="mt-2 space-y-2">
            {audit.media.map((media, index) => (
              <article key={media.slot ?? `media-${index}`} className="border border-sand-200 dark:border-navy-700 bg-white/80 dark:bg-navy-900/60 p-3">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="text-xs font-semibold text-navy-900 dark:text-sand-100">{media.label ?? media.slot ?? "Unknown media"}</p>
                    <p className="mt-1 text-[10px] font-mono text-navy-400">{media.slot ?? "—"} · SHA {shortSha(media.sha256)}</p>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    <QaBadge label="crop" state={media.qa.crop} />
                    <QaBadge label="focus" state={media.qa.focus} />
                    <QaBadge label="color" state={media.qa.color} />
                    <QaBadge label="emotion" state={media.qa.emotionalFit} />
                    <QaBadge label="content" state={media.qa.contentAccuracy} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : null}

      {audit.chapters.length > 0 ? (
        <div className="mt-4">
          <p className="text-xs font-semibold text-navy-900 dark:text-sand-100">章 QA binding</p>
          <div className="mt-2 grid grid-cols-1 lg:grid-cols-2 gap-2">
            {audit.chapters.map((chapter, index) => (
              <article key={chapter.chapterId ?? `chapter-${index}`} className="border border-sand-200 dark:border-navy-700 bg-white/80 dark:bg-navy-900/60 p-3">
                <p className="text-xs font-semibold text-navy-900 dark:text-sand-100">{chapter.title ?? chapter.chapterId ?? "Unknown chapter"}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  <QaBadge label="flow" state={chapter.visualFlow} />
                  <QaBadge label="readability" state={chapter.readability} />
                  <QaBadge label="role" state={chapter.mediaRoleFit} />
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : null}

      {surface.blockers.length > 0 ? (
        <details className="mt-4 text-xs">
          <summary className="cursor-pointer font-semibold text-navy-700 dark:text-navy-200">Current blockers ({surface.blockers.length})</summary>
          <div className="mt-2 space-y-1 font-mono text-[10px] text-navy-500 dark:text-navy-300">
            {surface.blockers.map((blocker) => <p key={blocker}>{blocker}</p>)}
          </div>
        </details>
      ) : null}

      <p className="mt-4 text-[10px] leading-4 text-navy-400">
        Guardrail: evidence SHA / preview-source fingerprint / media SHA / crop-focus-color-content verdict が変われば既存review contractがSTALE/BLOCKEDへ戻す。AUDIT_EXPORTED != HUMAN_REVIEW_PASS / MAC_DAVINCI_ACTUAL_VERIFIED。
      </p>
    </section>
  );
}
