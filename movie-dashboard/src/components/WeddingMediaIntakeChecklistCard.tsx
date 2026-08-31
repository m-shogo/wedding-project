import {openingProductionGate} from "../data/openingProductionGate.generated";
import {profileProductionGate} from "../data/profileProductionGate.generated";
import type {SceneProjectId} from "../data/visualSceneComposer";

const openingAliases: Record<string, readonly string[]> = {
  "okinawa-01": ["okinawa-01", "okinawa01", "okinawa-1"],
  "okinawa-02": ["okinawa-02", "okinawa02", "okinawa-2"],
  "okinawa-03": ["okinawa-03", "okinawa03", "okinawa-3"],
  "seoul-01": ["seoul-01", "seoul01", "seoul-1", "korea-01", "korea01"],
  "seoul-02": ["seoul-02", "seoul02", "seoul-2", "korea-02", "korea02"],
  "seoul-03": ["seoul-03", "seoul03", "seoul-3", "korea-03", "korea03"],
  "hawaii-01": ["hawaii-01", "hawaii01", "hawaii-1"],
  "hawaii-02": ["hawaii-02", "hawaii02", "hawaii-2"],
  "hawaii-03": ["hawaii-03", "hawaii03", "hawaii-3"],
  "hero-01": ["hero-01", "hero01", "hero-1", "couple-01", "couple01"],
  "hero-02": ["hero-02", "hero02", "hero-2", "couple-02", "couple02"],
};

export function WeddingMediaIntakeChecklistCard({projectId}: {projectId: SceneProjectId}) {
  const isOpening = projectId === "opening";
  const slots = isOpening
    ? openingProductionGate.photoSlots.map((slot) => ({
        id: slot.key,
        label: slot.key,
        kind: "photo",
        canonicalStem: slot.key,
        ready: slot.resolved,
        chapterId: slot.key.split("-")[0],
        aliases: openingAliases[slot.key] ?? [slot.key],
      }))
    : profileProductionGate.mediaSlots.map((slot) => ({
        id: slot.id,
        label: slot.label,
        kind: slot.kind,
        canonicalStem: slot.canonicalStem,
        ready: slot.ready,
        chapterId: slot.chapterId,
        aliases: [slot.canonicalStem] as readonly string[],
      }));
  const missing = slots.filter((slot) => !slot.ready);
  const expected = slots.length;
  const ready = expected - missing.length;
  const accepted = isOpening ? "JPG / JPEG / PNG / WEBP" : "写真: JPG/JPEG/PNG/WEBP、photo-or-video: + MP4/MOV/M4V/WEBM";
  const target = isOpening ? "motion-studio/public/photos/opening" : "motion-studio/public/profile";
  const bgm = isOpening ? openingProductionGate.bgm : profileProductionGate.bgm;

  return (
    <section className="mt-3 border-2 border-lime-300 dark:border-lime-800 p-3" data-wedding-media-intake-checklist={projectId}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-[8px] tracking-[0.14em] font-semibold text-lime-700 dark:text-lime-300">REAL MEDIA INTAKE CHECKLIST / {projectId.toUpperCase()}</p>
          <p className="mt-1 text-[11px] font-semibold text-navy-800 dark:text-sand-100">素材 {ready}/{expected} / BGM {bgm.ready ? "READY" : "MISSING / NOT_CURRENT"}</p>
          <p className="mt-1 text-[8px] leading-4 text-navy-500 dark:text-navy-300">1フォルダにcanonical stemまたは許可aliasで素材を置けば、既存intake CLIが安全に照合・copy・SHA receipt化します。</p>
        </div>
        <span className="border border-lime-300 dark:border-lime-800 px-2 py-1 font-mono text-[8px] text-lime-700 dark:text-lime-300">MISSING {missing.length}</span>
      </div>

      <div className="mt-2 border border-lime-200 dark:border-lime-900 p-2 text-[8px] leading-4">
        <p><span className="font-semibold">Target:</span> <code>{target}</code></p>
        <p><span className="font-semibold">形式:</span> {accepted}</p>
        <p className="text-navy-400">拡張子は自由、stemだけ合わせます。例: <code>{slots[0]?.canonicalStem}.jpg</code></p>
      </div>

      <div className="mt-3 grid gap-1 sm:grid-cols-2 xl:grid-cols-3">
        {slots.map((slot) => (
          <div key={slot.id} className={`border p-2 text-[7px] ${slot.ready ? "border-emerald-200 dark:border-emerald-800" : "border-amber-200 dark:border-amber-800"}`} data-media-intake-slot={slot.id} data-media-intake-state={slot.ready ? "READY" : "MISSING"}>
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold">{slot.label}</span>
              <span className="font-mono">{slot.ready ? "READY" : "MISSING"}</span>
            </div>
            <p className="mt-1 font-mono">{slot.canonicalStem}.* / {slot.kind}</p>
            <p className="mt-1 opacity-60">chapter={slot.chapterId}</p>
            {slot.aliases.length > 1 ? <p className="mt-1 break-words opacity-70">aliases: {slot.aliases.join(" / ")}</p> : null}
          </div>
        ))}
      </div>

      <div className="mt-3 border-t border-lime-200 dark:border-lime-900 pt-2 text-[7px] leading-4">
        <p className="font-semibold uppercase tracking-wide text-lime-700 dark:text-lime-300">Intake sequence</p>
        <code className="block max-w-full overflow-x-auto whitespace-nowrap">node --no-warnings scripts/intake-production-media.mts --project {projectId} --source "/ABS/PATH/TO/{projectId}-media"</code>
        <code className="block max-w-full overflow-x-auto whitespace-nowrap">node --no-warnings scripts/intake-production-media.mts --project {projectId} --source "/ABS/PATH/TO/{projectId}-media" --apply --overwrite --receipt out/intake/{projectId}-media-intake.json</code>
        <code className="block max-w-full overflow-x-auto whitespace-nowrap">node --no-warnings scripts/verify-production-media-intake-receipt.mts --project {projectId}</code>
      </div>

      <p className="mt-2 border-l-2 border-amber-300 pl-2 text-[7px] leading-3 text-amber-800 dark:text-amber-200">このchecklistは準備用表示です。素材名が揃ったこと ≠ Human visual QA PASS ≠ Remotion Studio GUI Actual PASS ≠ Mac DaVinci GUI Actual PASS ≠ productionReady。</p>
    </section>
  );
}
