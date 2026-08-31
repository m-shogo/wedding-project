import {useMemo, useState} from "react";

type QaState = "NOT_RUN" | "PASS" | "FAIL";
type TargetId = "PRIMARY_USB" | "BACKUP_USB" | "CLOUD_BACKUP";
type HumanActual = {state: QaState; reviewer: string | null; reviewedAt: string | null; notes: string};
type CurrentnessCopy = {
  targetId?: string;
  path?: string | null;
  state?: string;
  projectionManifestSha256?: string | null;
  deliveryManifestSha256?: string | null;
  openingSha256?: string | null;
  profileSha256?: string | null;
};
type Currentness = {
  schemaVersion?: string;
  authority?: string;
  state?: string;
  current?: boolean;
  receiptSha256?: string | null;
  copies?: CurrentnessCopy[];
};
type EvidenceTarget = CurrentnessCopy & {targetId: TargetId; actual: HumanActual};
type VenueEvidence = {
  schemaVersion?: string;
  authority?: string;
  boundAt?: string;
  sourceCurrentness?: {path?: string; sha256?: string; receiptSha256?: string};
  targets?: EvidenceTarget[];
  venuePlayback?: {
    openingFullPlayback?: HumanActual;
    profileFullPlayback?: HumanActual;
    audioAudibleAndClean?: HumanActual;
    fullscreenAndAspectCorrect?: HumanActual;
    venueDevice?: string | null;
  };
  review?: HumanActual;
  evidenceBoundary?: {productionReady?: boolean};
};

const EXPECTED_TARGETS: TargetId[] = ["PRIMARY_USB", "BACKUP_USB", "CLOUD_BACKUP"];
const emptyActual = (): HumanActual => ({state: "NOT_RUN", reviewer: null, reviewedAt: null, notes: ""});
const shortSha = (value?: string | null) => value ? `${value.slice(0, 12)}…` : "—";
const copyFields = ["path", "projectionManifestSha256", "deliveryManifestSha256", "openingSha256", "profileSha256"] as const;

function bindingAudit(currentness: Currentness | null, evidence: VenueEvidence | null) {
  const blockers: string[] = [];
  const currentnessOk = currentness?.schemaVersion === "wedding-venue-delivery-redundancy-currentness/v1"
    && currentness.authority === "DERIVED_THREE_COPY_REDUNDANCY_CURRENTNESS"
    && currentness.state === "CURRENT" && currentness.current === true;
  if (!currentnessOk) blockers.push("LIVE_CURRENTNESS_NOT_CURRENT");
  const evidenceOk = evidence?.schemaVersion === "wedding-venue-delivery-actual-evidence/v1"
    && evidence.authority === "HUMAN_VENUE_DELIVERY_ACTUAL"
    && evidence.evidenceBoundary?.productionReady === false;
  if (!evidenceOk) blockers.push("VENUE_ACTUAL_EVIDENCE_INVALID");
  if (currentnessOk && evidenceOk) {
    if (evidence?.sourceCurrentness?.receiptSha256 !== currentness?.receiptSha256) blockers.push("VENUE_ACTUAL_RECEIPT_SHA_STALE");
    for (const targetId of EXPECTED_TARGETS) {
      const live = currentness?.copies?.find((item) => item.targetId === targetId);
      const carried = evidence?.targets?.find((item) => item.targetId === targetId);
      if (!live || live.state !== "CURRENT") blockers.push(`${targetId}_LIVE_NOT_CURRENT`);
      if (!carried) { blockers.push(`${targetId}_EVIDENCE_MISSING`); continue; }
      for (const field of copyFields) {
        if (live?.[field] !== carried[field]) blockers.push(`${targetId}_${field.toUpperCase()}_STALE`);
      }
    }
  }
  return {current: blockers.length === 0, blockers};
}

function ActualEditor({label, actual, disabled, onChange}: {label: string; actual: HumanActual; disabled: boolean; onChange: (next: HumanActual) => void}) {
  return (
    <div className="border border-sand-200 dark:border-navy-600 p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-semibold text-navy-800 dark:text-sand-100">{label}</p>
        <select disabled={disabled} value={actual.state} onChange={(event) => onChange({...actual, state: event.target.value as QaState})} className="border border-sand-300 bg-white px-2 py-1 text-[10px] dark:border-navy-600 dark:bg-navy-900">
          <option value="NOT_RUN">NOT_RUN</option><option value="PASS">PASS</option><option value="FAIL">FAIL</option>
        </select>
      </div>
      <div className="mt-2 grid gap-2 md:grid-cols-2">
        <input disabled={disabled} value={actual.reviewer ?? ""} onChange={(event) => onChange({...actual, reviewer: event.target.value || null})} placeholder="Human reviewer" className="border border-sand-300 bg-white px-2 py-1 text-[10px] dark:border-navy-600 dark:bg-navy-900" />
        <input disabled={disabled} value={actual.reviewedAt ?? ""} onChange={(event) => onChange({...actual, reviewedAt: event.target.value || null})} placeholder="2026-10-24T13:00:00+09:00" className="border border-sand-300 bg-white px-2 py-1 text-[10px] dark:border-navy-600 dark:bg-navy-900" />
      </div>
      <textarea disabled={disabled} value={actual.notes} onChange={(event) => onChange({...actual, notes: event.target.value})} placeholder="実施内容・端末・問題の有無" rows={2} className="mt-2 w-full border border-sand-300 bg-white px-2 py-1 text-[10px] dark:border-navy-600 dark:bg-navy-900" />
    </div>
  );
}

export function WeddingVenueDeliveryActualOperator({currentnessInput, transportCurrent}: {currentnessInput: unknown; transportCurrent: boolean}) {
  const currentness = currentnessInput as Currentness | null;
  const [evidence, setEvidence] = useState<VenueEvidence | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const audit = useMemo(() => bindingAudit(currentness, evidence), [currentness, evidence]);
  const editable = transportCurrent && audit.current && evidence !== null;

  const loadEvidence = async (file?: File) => {
    if (!file) return;
    try {
      setEvidence(JSON.parse(await file.text()) as VenueEvidence);
      setLoadError(null);
    } catch {
      setEvidence(null);
      setLoadError("INVALID_JSON");
    }
  };
  const updateTarget = (targetId: TargetId, actual: HumanActual) => setEvidence((current) => current ? ({...current, targets: current.targets?.map((target) => target.targetId === targetId ? {...target, actual} : target)}) : current);
  const updatePlayback = (key: "openingFullPlayback" | "profileFullPlayback" | "audioAudibleAndClean" | "fullscreenAndAspectCorrect", actual: HumanActual) => setEvidence((current) => current ? ({...current, venuePlayback: {...current.venuePlayback, [key]: actual}}) : current);
  const exportEvidence = () => {
    if (!evidence || !editable) return;
    const blob = new Blob([`${JSON.stringify(evidence, null, 2)}\n`], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url; anchor.download = "wedding-venue-delivery-actual-evidence.json"; anchor.click();
    URL.revokeObjectURL(url);
  };
  const initCommand = "cd motion-studio && node --no-warnings scripts/wedding-venue-delivery-actual-evidence.mts --init";
  const verifyCommand = "cd motion-studio && node --no-warnings scripts/wedding-venue-delivery-actual-evidence.mts --strict --json";

  return (
    <section className="mb-10 border border-cyan-200 dark:border-cyan-900/60 bg-cyan-50/20 dark:bg-cyan-950/10 p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[10px] tracking-[0.2em] font-semibold text-cyan-700 dark:text-cyan-300">HUMAN VENUE ACTUAL / POST-DELIVERY</p>
          <h3 className="mt-1 text-base font-bold text-navy-900 dark:text-sand-100">実USB・クラウド・式場PC再生を、人間が実施した後だけ記録する</h3>
          <p className="mt-2 max-w-3xl text-[10px] leading-5 text-navy-500 dark:text-navy-300">まずcanonical CLIでNOT_RUN evidenceを初期化し、そのJSONを読み込みます。Transport Gateとlive SHA bindingがCURRENTの間だけ編集可能。画面はPASSを自動設定しません。</p>
        </div>
        <div className="text-right">
          <p className={`text-sm font-bold ${editable ? "text-emerald-700 dark:text-emerald-300" : "text-amber-700 dark:text-amber-300"}`}>{editable ? "HUMAN EDIT ENABLED" : "BLOCKED / NOT_RUN"}</p>
          <p className="mt-1 text-[9px] text-navy-400">receipt {shortSha(evidence?.sourceCurrentness?.receiptSha256)}</p>
        </div>
      </div>

      <div className="mt-4 grid gap-3 xl:grid-cols-3">
        <div className="border border-cyan-200 p-3 dark:border-cyan-900/60"><p className="text-[10px] font-semibold">1. INIT NOT_RUN</p><code className="mt-2 block break-all text-[9px]">{initCommand}</code></div>
        <label className="border border-cyan-200 p-3 dark:border-cyan-900/60 cursor-pointer"><p className="text-[10px] font-semibold">2. LOAD EVIDENCE JSON</p><input type="file" accept="application/json,.json" className="mt-2 block w-full text-[10px]" onChange={(event) => void loadEvidence(event.target.files?.[0])} /></label>
        <div className="border border-cyan-200 p-3 dark:border-cyan-900/60"><p className="text-[10px] font-semibold">3. STRICT VERIFY</p><code className="mt-2 block break-all text-[9px]">{verifyCommand}</code></div>
      </div>

      {(loadError || audit.blockers.length > 0) && <div className="mt-4 border border-amber-300 p-3"><p className="text-[10px] font-semibold text-amber-800">ACTUAL OPERATOR BLOCKERS</p><div className="mt-2 flex flex-wrap gap-2">{[loadError, ...audit.blockers].filter(Boolean).map((item) => <code key={item!} className="text-[9px] text-amber-800">{item}</code>)}</div></div>}

      {evidence && <>
        <div className="mt-5 grid gap-3 xl:grid-cols-3">
          {EXPECTED_TARGETS.map((targetId) => {
            const target = evidence.targets?.find((item) => item.targetId === targetId);
            return <div key={targetId}><p className="mb-2 text-[10px] font-mono text-navy-400">{targetId} / {shortSha(target?.openingSha256)} / {shortSha(target?.profileSha256)}</p><ActualEditor label={`${targetId} delivery Actual`} actual={target?.actual ?? emptyActual()} disabled={!editable} onChange={(actual) => updateTarget(targetId, actual)} /></div>;
          })}
        </div>
        <div className="mt-5 grid gap-3 xl:grid-cols-2">
          <ActualEditor label="Opening full playback on venue device" actual={evidence.venuePlayback?.openingFullPlayback ?? emptyActual()} disabled={!editable} onChange={(actual) => updatePlayback("openingFullPlayback", actual)} />
          <ActualEditor label="Profile full playback on venue device" actual={evidence.venuePlayback?.profileFullPlayback ?? emptyActual()} disabled={!editable} onChange={(actual) => updatePlayback("profileFullPlayback", actual)} />
          <ActualEditor label="Audio audible / clean" actual={evidence.venuePlayback?.audioAudibleAndClean ?? emptyActual()} disabled={!editable} onChange={(actual) => updatePlayback("audioAudibleAndClean", actual)} />
          <ActualEditor label="Fullscreen / aspect correct" actual={evidence.venuePlayback?.fullscreenAndAspectCorrect ?? emptyActual()} disabled={!editable} onChange={(actual) => updatePlayback("fullscreenAndAspectCorrect", actual)} />
        </div>
        <input disabled={!editable} value={evidence.venuePlayback?.venueDevice ?? ""} onChange={(event) => setEvidence((current) => current ? ({...current, venuePlayback: {...current.venuePlayback, venueDevice: event.target.value || null}}) : current)} placeholder="式場再生端末 / venue device" className="mt-3 w-full border border-sand-300 bg-white px-3 py-2 text-xs dark:border-navy-600 dark:bg-navy-900" />
        <div className="mt-3"><ActualEditor label="Overall venue delivery Actual" actual={evidence.review ?? emptyActual()} disabled={!editable} onChange={(review) => setEvidence((current) => current ? ({...current, review}) : current)} /></div>
        <button type="button" disabled={!editable} onClick={exportEvidence} className="mt-4 border border-cyan-500 px-4 py-2 text-xs font-semibold text-cyan-800 disabled:cursor-not-allowed disabled:opacity-40 dark:text-cyan-200">EXPORT HUMAN EVIDENCE JSON</button>
      </>}
      <p className="mt-4 text-[10px] leading-5 text-amber-700 dark:text-amber-300">PASSは「実際にその作業を行ったHuman」がstate / reviewer / reviewedAtを明示入力した場合だけ有効です。export後もcanonical strict verifierがcurrentness file SHA・receipt・各target hashを再検証します。</p>
    </section>
  );
}
