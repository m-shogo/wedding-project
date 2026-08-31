import {buildWeddingDavinciDeliveryReadiness} from "./weddingDavinciDeliveryReadiness";
import {weddingFinalDeliveryEvidenceManifestReadiness} from "./weddingFinalDeliveryEvidenceManifestReadiness.generated";

export const WEDDING_DAVINCI_FINAL_DELIVERY_PREFLIGHT_SCHEMA = "wedding-davinci-final-delivery-preflight-dashboard/v1" as const;
export const WEDDING_DAVINCI_OPERATOR_PACKET_SCHEMA = "wedding-davinci-operator-packet/v1" as const;

type SnapshotState = "NOT_RUN" | "CURRENT" | "STALE" | "INVALID";
type FinalEvidenceManifestState = "NOT_RUN" | "CURRENT" | "STALE" | "INVALID";
type PreflightState = "READY" | "SNAPSHOT_REQUIRED" | "STALE" | "INVALID" | "UPSTREAM_BLOCKED";

type FinalEvidenceManifestReadiness = {
  readonly state: FinalEvidenceManifestState;
  readonly current: boolean;
  readonly manifestPath: string;
  readonly mismatches: readonly string[];
  readonly manifestSha256: string | null;
  readonly readinessSha256: string | null;
  readonly openingEvidenceChainSha256: string | null;
  readonly profileEvidenceChainSha256: string | null;
  readonly writeCommand: string;
  readonly strictCommand: string;
};

export type WeddingDavinciSnapshotAudit = {
  state: SnapshotState;
  current: boolean;
  path: string;
  mismatches: readonly string[];
};

export const defaultWeddingDavinciSnapshotAudit: WeddingDavinciSnapshotAudit = {
  state: "NOT_RUN",
  current: false,
  path: "motion-studio/out/handoff/wedding/wedding-davinci-delivery-readiness.json",
  mismatches: [],
};

export function buildWeddingDavinciFinalDeliveryPreflight(
  snapshot: WeddingDavinciSnapshotAudit = defaultWeddingDavinciSnapshotAudit,
) {
  const live = buildWeddingDavinciDeliveryReadiness();
  const finalEvidenceManifest = weddingFinalDeliveryEvidenceManifestReadiness as FinalEvidenceManifestReadiness;
  const blockerCodes: string[] = [];

  if (snapshot.state === "NOT_RUN") blockerCodes.push("WEDDING_DAVINCI_SNAPSHOT_REQUIRED");
  if (snapshot.state === "INVALID") blockerCodes.push("WEDDING_DAVINCI_SNAPSHOT_INVALID");
  if (snapshot.state === "STALE") blockerCodes.push("WEDDING_DAVINCI_SNAPSHOT_STALE");
  if (live.opening.projectMotion.state === "INVALID") blockerCodes.push("OPENING_PROJECT_MOTION_PROVENANCE_INVALID");
  if (live.profile.projectMotion.state === "INVALID") blockerCodes.push("PROFILE_PROJECT_MOTION_PROVENANCE_INVALID");
  if (live.opening.state !== "READY") blockerCodes.push("OPENING_DAVINCI_DELIVERY_NOT_READY");
  if (live.profile.state !== "READY") blockerCodes.push("PROFILE_DAVINCI_DELIVERY_NOT_READY");
  if (finalEvidenceManifest.state === "NOT_RUN") blockerCodes.push("FINAL_DELIVERY_EVIDENCE_MANIFEST_REQUIRED");
  if (finalEvidenceManifest.state === "STALE") blockerCodes.push("FINAL_DELIVERY_EVIDENCE_MANIFEST_STALE");
  if (finalEvidenceManifest.state === "INVALID") blockerCodes.push("FINAL_DELIVERY_EVIDENCE_MANIFEST_INVALID");
  if (finalEvidenceManifest.state === "CURRENT" && !finalEvidenceManifest.current) blockerCodes.push("FINAL_DELIVERY_EVIDENCE_MANIFEST_CURRENTNESS_INVALID");

  const eligible = snapshot.current && live.strictDeliveryEligible && finalEvidenceManifest.current && blockerCodes.length === 0;
  const state: PreflightState = eligible
    ? "READY"
    : snapshot.state === "INVALID" || live.opening.projectMotion.state === "INVALID" || live.profile.projectMotion.state === "INVALID" || finalEvidenceManifest.state === "INVALID"
      ? "INVALID"
      : snapshot.state === "STALE" || finalEvidenceManifest.state === "STALE"
        ? "STALE"
        : snapshot.state === "NOT_RUN"
          ? "SNAPSHOT_REQUIRED"
          : "UPSTREAM_BLOCKED";

  const projectMotionStatusCommands = [
    {
      id: "PROJECT_MOTION_OPENING_STATUS",
      label: `0a. Opening Project Motion — ${live.opening.projectMotion.state}`,
      command: `cd motion-studio && ${live.opening.projectMotion.command}`,
      required: live.opening.projectMotion.state === "INVALID",
      purpose: live.opening.projectMotion.error
        ?? (live.opening.projectMotion.state === "CURRENT"
          ? "CURRENT: canonical Project Motion provenance verifierがPASSしたsnapshot"
          : "NOT_APPLICABLE: Project Motion provenance未使用。検証済み/PASSを意味しない"),
    },
    {
      id: "PROJECT_MOTION_PROFILE_STATUS",
      label: `0b. Profile Project Motion — ${live.profile.projectMotion.state}`,
      command: `cd motion-studio && ${live.profile.projectMotion.command}`,
      required: live.profile.projectMotion.state === "INVALID",
      purpose: live.profile.projectMotion.error
        ?? (live.profile.projectMotion.state === "CURRENT"
          ? "CURRENT: canonical Project Motion provenance verifierがPASSしたsnapshot"
          : "NOT_APPLICABLE: Project Motion provenance未使用。検証済み/PASSを意味しない"),
    },
  ] as const;

  const commands = [
    ...projectMotionStatusCommands,
    {
      id: "WRITE_MANIFEST",
      label: "1. Readiness Manifest生成",
      command: "cd motion-studio && node --no-warnings scripts/wedding-davinci-delivery-readiness.mts --write",
      required: snapshot.state !== "CURRENT",
      purpose: "Opening / Profile の現在SHA・Project Motion provenance・next gateをtransport用snapshotへ固定する",
    },
    {
      id: "REVALIDATE_SNAPSHOT",
      label: "2. Readiness Snapshot再検証",
      command: "cd motion-studio && node --no-warnings scripts/wedding-davinci-delivery-readiness-snapshot.mts --strict-current",
      required: snapshot.state !== "CURRENT",
      purpose: "transported snapshotが現在のProject Motion provenance / recovery / Actual / approval鎖と一致することをfail-close確認する",
    },
    {
      id: "STRICT_FINAL_DELIVERY",
      label: "3. Final Delivery strict",
      command: "cd motion-studio && node --no-warnings scripts/wedding-davinci-final-delivery-preflight.mts --strict",
      required: true,
      purpose: "CURRENT Project Motion + CURRENT snapshot + Opening READY + Profile READY が全部成立したことを確認する",
    },
    {
      id: "WRITE_FINAL_DELIVERY_EVIDENCE_MANIFEST",
      label: "4. Final Evidence Manifest生成",
      command: finalEvidenceManifest.writeCommand,
      required: !finalEvidenceManifest.current,
      purpose: "READY後のRecovery / render / finishing Actual / transition proof / completion receipt / Human final approval / final binding SHAをOpening/Profileまとめて固定する",
    },
    {
      id: "STRICT_FINAL_DELIVERY_EVIDENCE_MANIFEST_CURRENTNESS",
      label: "5. Final Evidence Manifest strict-current",
      command: finalEvidenceManifest.strictCommand,
      required: true,
      purpose: "最終持ち出し直前にtransported final evidence manifestとfresh live evidence chainの全SHA・self-hash一致をfail-close確認する",
    },
  ] as const;

  return {
    schemaVersion: WEDDING_DAVINCI_FINAL_DELIVERY_PREFLIGHT_SCHEMA,
    state,
    eligible,
    snapshot,
    finalEvidenceManifest: {
      state: finalEvidenceManifest.state,
      current: finalEvidenceManifest.current,
      manifestPath: finalEvidenceManifest.manifestPath,
      mismatches: [...finalEvidenceManifest.mismatches],
      manifestSha256: finalEvidenceManifest.manifestSha256,
      readinessSha256: finalEvidenceManifest.readinessSha256,
      openingEvidenceChainSha256: finalEvidenceManifest.openingEvidenceChainSha256,
      profileEvidenceChainSha256: finalEvidenceManifest.profileEvidenceChainSha256,
    },
    blockerCodes,
    opening: {
      state: live.opening.state,
      projectMotion: live.opening.projectMotion,
      nextGate: live.opening.nextGate,
      recoverySha256: live.opening.audit.recoverySha256,
      actualEvidenceSha256: live.opening.audit.actualEvidenceSha256,
      finalApprovalSha256: live.opening.audit.finalApprovalSha256,
    },
    profile: {
      state: live.profile.state,
      projectMotion: live.profile.projectMotion,
      nextGate: live.profile.nextGate,
      recoverySha256: live.profile.audit.recoverySha256,
      actualEvidenceSha256: live.profile.audit.actualEvidenceSha256,
      finalApprovalSha256: live.profile.audit.finalApprovalSha256,
    },
    commands,
    guardrails: [
      "PROJECT_MOTION_STATE_ALWAYS_VISIBLE_IN_COMMAND_SURFACE",
      "PROJECT_MOTION_INVALID => FINAL_DELIVERY_INVALID",
      "PROJECT_MOTION_VERIFIER_COMMAND_VISIBLE != PROJECT_MOTION_VERIFIED",
      "PROJECT_MOTION_NOT_APPLICABLE != VERIFIED",
      "SNAPSHOT_CURRENT != FINAL_DELIVERY_READY",
      "FINAL_EVIDENCE_MANIFEST_CURRENT_REQUIRED_BEFORE_FINAL_DELIVERY_READY",
      "FINAL_EVIDENCE_MANIFEST_GENERATED_SNAPSHOT != CANONICAL_STRICT_CURRENT",
      "FINAL_EVIDENCE_MANIFEST_CURRENT != LIVE_MAC_DAVINCI_GUI_ACTUAL",
      "FINAL_DELIVERY_READY_REQUIRES_CURRENT_PROJECT_MOTION_SNAPSHOT_BOTH_MOVIES_READY_AND_CURRENT_FINAL_EVIDENCE_MANIFEST",
      "NOT_RUN != VERIFIED",
      "CI_MUST_NOT_PROMOTE_MAC_GUI_ACTUAL",
    ],
  } as const;
}

export function buildWeddingDavinciOperatorPacket(
  snapshot: WeddingDavinciSnapshotAudit = defaultWeddingDavinciSnapshotAudit,
) {
  const preflight = buildWeddingDavinciFinalDeliveryPreflight(snapshot);

  return {
    schemaVersion: WEDDING_DAVINCI_OPERATOR_PACKET_SCHEMA,
    authority: "MOTION_ZUKAN_DERIVED_OPERATOR_PACKET" as const,
    evidenceBoundary: {
      macRemotionStudioGuiActual: "NOT_PROMOTED_BY_PACKET" as const,
      macDavinciResolveGuiActual: "NOT_PROMOTED_BY_PACKET" as const,
      humanFinalApproval: "NOT_PROMOTED_BY_PACKET" as const,
      note: "This packet is an operator handoff/index only. It is not GUI Actual evidence and cannot make productionReady true.",
    },
    preflight: {
      state: preflight.state,
      eligible: preflight.eligible,
      blockerCodes: [...preflight.blockerCodes],
      snapshot: {...preflight.snapshot, mismatches: [...preflight.snapshot.mismatches]},
      finalEvidenceManifest: {...preflight.finalEvidenceManifest, mismatches: [...preflight.finalEvidenceManifest.mismatches]},
    },
    projectMotionPreflight: {
      opening: preflight.opening.projectMotion,
      profile: preflight.profile.projectMotion,
    },
    projects: {
      opening: preflight.opening,
      profile: preflight.profile,
    },
    orderedCommands: preflight.commands.map((command, index) => ({
      order: index + 1,
      ...command,
    })),
    guardrails: [...preflight.guardrails],
  } as const;
}

export function buildWeddingDavinciOperatorPacketJson(
  snapshot: WeddingDavinciSnapshotAudit = defaultWeddingDavinciSnapshotAudit,
) {
  return JSON.stringify(buildWeddingDavinciOperatorPacket(snapshot), null, 2);
}
