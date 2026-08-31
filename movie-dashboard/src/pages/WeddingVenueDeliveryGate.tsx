import {useMemo, useState} from "react";
import {Header} from "../components/Header";
import {auditWeddingVenueDeliveryGate} from "../data/weddingVenueDeliveryGate";

const shortSha = (value: string | null) => value ? `${value.slice(0, 12)}…` : "—";

const stateClass = (state: string) => {
  if (state === "CURRENT") return "text-emerald-700 dark:text-emerald-300";
  if (state === "INVALID" || state === "STALE") return "text-rose-700 dark:text-rose-300";
  return "text-amber-700 dark:text-amber-300";
};

const loadJson = async (file: File | undefined, setter: (value: unknown) => void) => {
  if (!file) return;
  try { setter(JSON.parse(await file.text())); }
  catch { setter({__invalidJson: true}); }
};

const copy = async (value: string) => {
  await navigator.clipboard.writeText(value);
};

export function WeddingVenueDeliveryGate() {
  const [projection, setProjection] = useState<unknown>(null);
  const [packageManifest, setPackageManifest] = useState<unknown>(null);
  const [offlineVerification, setOfflineVerification] = useState<unknown>(null);
  const [redundancyReceipt, setRedundancyReceipt] = useState<unknown>(null);
  const audit = useMemo(
    () => auditWeddingVenueDeliveryGate(projection, packageManifest, offlineVerification, redundancyReceipt),
    [projection, packageManifest, offlineVerification, redundancyReceipt],
  );

  const movies = [["Opening", audit.opening], ["Profile", audit.profile]] as const;
  const stages = [
    ["Projection", audit.projectionState],
    ["Venue Package", audit.packageState],
    ["Offline Verify", audit.offlineVerifyState],
    ["3-Copy Redundancy", audit.redundancyState],
  ] as const;

  return (
    <div>
      <Header
        title="式場持出し Gate"
        description="Human-approved DaVinci export → Projection → package → offline verify → 本番/予備/クラウド3-copy をSHA-boundで最終確認"
      />

      <section className="mb-8 border border-sand-300 dark:border-navy-600 bg-white dark:bg-navy-800 p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[10px] tracking-[0.2em] font-semibold text-violet-700 dark:text-violet-300">VENUE DELIVERY / FINAL TRANSPORT GATE</p>
            <h2 className="mt-1 text-xl font-bold text-navy-900 dark:text-sand-100">本番USB・予備USB・クラウド予備が同じ承認済み2本か確認する</h2>
            <p className="mt-2 max-w-3xl text-xs leading-5 text-navy-500 dark:text-navy-300">
              canonical CLIの結果を読み込み、Projection・package・offline verify・3-copy receiptを相互SHA bindingします。ブラウザだけでffprobeやSHA検証を代替せず、GUI ActualやHuman approvalも生成しません。
            </p>
          </div>
          <div className="text-right">
            <p className={`text-lg font-bold ${stateClass(audit.state)}`}>{audit.ready ? "VENUE DELIVERY READY" : audit.state}</p>
            <p className="mt-1 text-[10px] text-navy-400">package={audit.packageReady ? "READY" : "BLOCKED"} / redundancy={audit.redundancyReady ? "READY" : "BLOCKED"}</p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-4">
          {stages.map(([label, state]) => (
            <div key={label} className="border border-sand-200 dark:border-navy-600 p-3">
              <p className="text-[10px] font-semibold text-navy-400">{label}</p>
              <p className={`mt-1 text-sm font-bold ${stateClass(state)}`}>{state}</p>
            </div>
          ))}
        </div>

        {audit.blockers.length > 0 && (
          <div className="mt-4 border border-amber-200 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/10 p-3">
            <p className="text-[10px] font-semibold text-amber-800 dark:text-amber-300">CURRENT BLOCKERS</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {audit.blockers.map((blocker) => <code key={blocker} className="border border-amber-300 px-2 py-1 text-[10px] text-amber-800 dark:border-amber-800 dark:text-amber-300">{blocker}</code>)}
            </div>
          </div>
        )}
      </section>

      <section className="mb-8 grid gap-4 xl:grid-cols-4">
        <label className="border border-sky-200 dark:border-sky-900/60 p-4 cursor-pointer">
          <p className="text-[10px] font-semibold text-sky-700 dark:text-sky-300">1. PROJECTION CURRENTNESS</p>
          <p className="mt-2 text-xs text-navy-500 dark:text-navy-300">`wedding-projection-delivery-currentness.json` を読み込む</p>
          <input type="file" accept="application/json,.json" className="mt-3 block w-full text-xs" onChange={(event) => void loadJson(event.target.files?.[0], setProjection)} />
        </label>
        <label className="border border-fuchsia-200 dark:border-fuchsia-900/60 p-4 cursor-pointer">
          <p className="text-[10px] font-semibold text-fuchsia-700 dark:text-fuchsia-300">2. DELIVERY-MANIFEST</p>
          <p className="mt-2 text-xs text-navy-500 dark:text-navy-300">source package内 `DELIVERY-MANIFEST.json` を読み込む</p>
          <input type="file" accept="application/json,.json" className="mt-3 block w-full text-xs" onChange={(event) => void loadJson(event.target.files?.[0], setPackageManifest)} />
        </label>
        <label className="border border-emerald-200 dark:border-emerald-900/60 p-4 cursor-pointer">
          <p className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-300">3. OFFLINE VERIFY</p>
          <p className="mt-2 text-xs text-navy-500 dark:text-navy-300">source package verifierのJSON reportを読み込む</p>
          <input type="file" accept="application/json,.json" className="mt-3 block w-full text-xs" onChange={(event) => void loadJson(event.target.files?.[0], setOfflineVerification)} />
        </label>
        <label className="border border-violet-200 dark:border-violet-900/60 p-4 cursor-pointer">
          <p className="text-[10px] font-semibold text-violet-700 dark:text-violet-300">4. 3-COPY RECEIPT</p>
          <p className="mt-2 text-xs text-navy-500 dark:text-navy-300">`wedding-venue-delivery-redundancy.json` を読み込む</p>
          <input type="file" accept="application/json,.json" className="mt-3 block w-full text-xs" onChange={(event) => void loadJson(event.target.files?.[0], setRedundancyReceipt)} />
        </label>
      </section>

      <section className="mb-8 grid gap-4 xl:grid-cols-2">
        {movies.map(([label, movie]) => (
          <article key={label} className="border border-sand-300 dark:border-navy-600 bg-white dark:bg-navy-800 p-4">
            <h3 className="font-bold text-navy-900 dark:text-sand-100">{label}</h3>
            <dl className="mt-3 grid grid-cols-[max-content_1fr] gap-x-3 gap-y-2 text-[11px] text-navy-500 dark:text-navy-300">
              <dt className="font-semibold">File</dt><dd>{movie.filename ?? "—"}</dd>
              <dt className="font-semibold">Approved export SHA</dt><dd className="font-mono">{shortSha(movie.approvedExportSha256)}</dd>
              <dt className="font-semibold">Copied / verified SHA</dt><dd className="font-mono">{shortSha(movie.copiedSha256)}</dd>
              <dt className="font-semibold">Video</dt><dd>{movie.technical ? `${movie.technical.video?.codec ?? "?"} ${movie.technical.video?.width ?? "?"}×${movie.technical.video?.height ?? "?"} ${movie.technical.video?.fps ?? "?"}fps ${movie.technical.video?.pixelFormat ?? "?"}` : "—"}</dd>
              <dt className="font-semibold">Audio</dt><dd>{movie.technical ? `${movie.technical.audio?.codec ?? "?"} ${movie.technical.audio?.sampleRate ?? "?"}Hz ${movie.technical.audio?.channels ?? "?"}ch` : "—"}</dd>
              <dt className="font-semibold">Duration</dt><dd>{movie.technical?.durationSeconds ? `${movie.technical.durationSeconds.toFixed(3)}s` : "—"}</dd>
            </dl>
          </article>
        ))}
      </section>

      <section className="mb-8 border border-sand-300 dark:border-navy-600 bg-white dark:bg-navy-800 p-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[10px] tracking-[0.2em] font-semibold text-emerald-700 dark:text-emerald-300">THREE-COPY REDUNDANCY</p>
            <h3 className="mt-1 text-base font-bold text-navy-900 dark:text-sand-100">PRIMARY_USB / BACKUP_USB / CLOUD_BACKUP</h3>
          </div>
          <p className="text-[10px] font-mono text-navy-400">receipt {shortSha(audit.redundancyReceiptSha256)}</p>
        </div>
        <div className="mt-4 grid gap-3 xl:grid-cols-3">
          {audit.redundancyCopies.map((copyItem) => (
            <article key={copyItem.targetId} className="border border-sand-200 dark:border-navy-600 p-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-bold text-navy-800 dark:text-sand-100">{copyItem.targetId}</p>
                <span className={`text-[10px] font-bold ${stateClass(copyItem.state)}`}>{copyItem.state}</span>
              </div>
              <p className="mt-2 break-all text-[9px] text-navy-400">{copyItem.path ?? "—"}</p>
              <dl className="mt-3 grid grid-cols-[max-content_1fr] gap-x-2 gap-y-1 text-[10px] text-navy-500 dark:text-navy-300">
                <dt>Opening</dt><dd className="font-mono">{shortSha(copyItem.openingSha256)}</dd>
                <dt>Profile</dt><dd className="font-mono">{shortSha(copyItem.profileSha256)}</dd>
              </dl>
            </article>
          ))}
        </div>
        <p className="mt-3 text-[10px] leading-4 text-amber-700 dark:text-amber-300">デフォルトのprimary/backup/cloudパスはローカルstagingです。実USB挿入・クラウドupload・式場再生は、人間が本当に実施するまでActual = NOT_RUNのままです。</p>
      </section>

      <section className="mb-10 border border-violet-200 dark:border-violet-900/60 bg-violet-50/30 dark:bg-violet-950/10 p-5">
        <p className="text-[10px] tracking-[0.2em] font-semibold text-violet-700 dark:text-violet-300">CANONICAL OPERATOR CHAIN</p>
        <h3 className="mt-1 text-base font-bold text-navy-900 dark:text-sand-100">式場Package生成 → verify → 3-copy offline verificationまで一本道</h3>
        <ol className="mt-4 space-y-3">
          {Object.entries(audit.commands).map(([key, command], index) => (
            <li key={key} className="border-l-2 border-violet-300 dark:border-violet-800 pl-3">
              <div className="flex flex-wrap items-start gap-3">
                <span className="text-[10px] font-mono text-violet-700 dark:text-violet-300">{index + 1}</span>
                <code className="min-w-0 flex-1 overflow-x-auto text-[10px] leading-5 text-navy-600 dark:text-navy-300">{command}</code>
                <button type="button" onClick={() => void copy(command)} className="border border-violet-400 px-2 py-1 text-[10px] font-semibold text-violet-800 dark:text-violet-200">COPY</button>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-4 border-t border-violet-200 dark:border-violet-900/60 pt-4 text-[10px] leading-5 text-navy-500 dark:text-navy-300">
          <p>Projection SHA: <span className="font-mono">{shortSha(audit.projectionManifestSha256)}</span></p>
          <p>Delivery Manifest SHA: <span className="font-mono">{shortSha(audit.deliveryManifestSha256)}</span></p>
          <p>3-copy receipt SHA: <span className="font-mono">{shortSha(audit.redundancyReceiptSha256)}</span></p>
          <p>Verified source package dir: <span className="font-mono">{audit.packageDir ?? "—"}</span></p>
          <p className="mt-2 text-amber-700 dark:text-amber-300">Mac/Studio/Palmier/DaVinci GUI Actual・physical USB・cloud upload・venue playbackは、この画面によってPASSへ昇格しません。</p>
        </div>
      </section>
    </div>
  );
}
