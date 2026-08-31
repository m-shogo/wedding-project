export const WEDDING_VENUE_DELIVERY_GATE_SCHEMA = "wedding-venue-delivery-gate-dashboard/v3" as const;

type GateState = "NOT_RUN" | "CURRENT" | "STALE" | "INVALID";

type ProjectionCurrentness = {
  schemaVersion?: string;
  authority?: string;
  state?: string;
  current?: boolean;
  carried?: {
    manifestSha256?: string | null;
    openingExportSha256?: string | null;
    profileExportSha256?: string | null;
  };
};

type Technical = {
  container?: string;
  video?: {codec?: string; width?: number; height?: number; pixelFormat?: string; fps?: number};
  durationSeconds?: number;
  audio?: {codec?: string; sampleRate?: number; channels?: number};
  streamCount?: number;
  unexpectedStreamCount?: number;
};

type VenuePackageManifest = {
  schemaVersion?: string;
  authority?: string;
  projectionManifestSha256?: string;
  projectionCurrentnessState?: string;
  packageReady?: boolean;
  manifestSha256?: string;
  opening?: {filename?: string; sha256?: string; sourceExportSha256?: string; technical?: Technical};
  profile?: {filename?: string; sha256?: string; sourceExportSha256?: string; technical?: Technical};
};

type OfflineVerification = {
  schemaVersion?: string;
  authority?: string;
  state?: string;
  current?: boolean;
  projectionManifestSha256?: string;
  deliveryManifestSha256?: string;
  packageDir?: string;
  opening?: {filename?: string; sha256?: string; durationSeconds?: number};
  profile?: {filename?: string; sha256?: string; durationSeconds?: number};
};

type RedundancyCopy = {
  targetId?: string;
  path?: string;
  state?: string;
  projectionManifestSha256?: string | null;
  deliveryManifestSha256?: string | null;
  openingSha256?: string | null;
  profileSha256?: string | null;
};

type RedundancyReceipt = {
  schemaVersion?: string;
  authority?: string;
  redundancyReady?: boolean;
  receiptSha256?: string;
  source?: {
    projectionManifestSha256?: string | null;
    deliveryManifestSha256?: string | null;
    openingSha256?: string | null;
    profileSha256?: string | null;
  };
  copies?: RedundancyCopy[];
};

type RedundancyCurrentness = {
  schemaVersion?: string;
  authority?: string;
  state?: string;
  current?: boolean;
  receiptSha256?: string | null;
  mismatches?: string[];
  source?: {
    projectionManifestSha256?: string | null;
    deliveryManifestSha256?: string | null;
    openingSha256?: string | null;
    profileSha256?: string | null;
  } | null;
  copies?: RedundancyCopy[];
};

export type WeddingVenueDeliveryGateAudit = {
  schemaVersion: typeof WEDDING_VENUE_DELIVERY_GATE_SCHEMA;
  state: GateState;
  ready: boolean;
  packageReady: boolean;
  redundancyReady: boolean;
  projectionState: GateState;
  packageState: GateState;
  offlineVerifyState: GateState;
  redundancyState: GateState;
  redundancyCurrentnessState: GateState;
  blockers: string[];
  projectionManifestSha256: string | null;
  deliveryManifestSha256: string | null;
  redundancyReceiptSha256: string | null;
  redundancyCurrentnessReceiptSha256: string | null;
  packageDir: string | null;
  opening: {
    filename: string | null;
    approvedExportSha256: string | null;
    copiedSha256: string | null;
    technical: Technical | null;
  };
  profile: {
    filename: string | null;
    approvedExportSha256: string | null;
    copiedSha256: string | null;
    technical: Technical | null;
  };
  redundancyCopies: Array<{
    targetId: string;
    path: string | null;
    state: GateState;
    openingSha256: string | null;
    profileSha256: string | null;
  }>;
  commands: {
    writeProjection: string;
    strictProjection: string;
    buildPackage: string;
    verifyPackage: string;
    buildThreeCopyRedundancy: string;
    strictThreeCopyRedundancy: string;
  };
  evidenceBoundary: {
    macRemotionStudioGuiActual: "NOT_PROMOTED_BY_DASHBOARD_GATE";
    palmierGuiActual: "NOT_PROMOTED_BY_DASHBOARD_GATE";
    macDavinciResolveGuiActual: "NOT_PROMOTED_BY_DASHBOARD_GATE";
    physicalUsbInsertedActual: "NOT_PROMOTED_BY_DASHBOARD_GATE";
    cloudUploadActual: "NOT_PROMOTED_BY_DASHBOARD_GATE";
    venuePlaybackActual: "NOT_RUN";
    humanFinalApproval: "NOT_PROMOTED_BY_DASHBOARD_GATE";
  };
};

const stateFromInput = (value: unknown, valid: boolean, current: boolean): GateState => {
  if (value == null) return "NOT_RUN";
  if (!valid) return "INVALID";
  return current ? "CURRENT" : "STALE";
};

const canonicalTechnical = (technical: Technical | undefined) =>
  technical?.container === "mp4"
  && technical.video?.codec === "h264"
  && technical.video?.width === 1920
  && technical.video?.height === 1080
  && technical.video?.pixelFormat === "yuv420p"
  && Math.abs(Number(technical.video?.fps) - 30) <= 0.01
  && technical.audio?.codec === "aac"
  && technical.audio?.sampleRate === 48000
  && technical.audio?.channels === 2
  && technical.streamCount === 2
  && technical.unexpectedStreamCount === 0
  && Number(technical.durationSeconds) > 0;

const expectedTargets = ["PRIMARY_USB", "BACKUP_USB", "CLOUD_BACKUP"] as const;

export function auditWeddingVenueDeliveryGate(
  projectionInput: unknown,
  packageManifestInput: unknown,
  offlineVerificationInput: unknown,
  redundancyReceiptInput: unknown = null,
  redundancyCurrentnessInput: unknown = null,
): WeddingVenueDeliveryGateAudit {
  const projection = projectionInput as ProjectionCurrentness | null;
  const packageManifest = packageManifestInput as VenuePackageManifest | null;
  const offline = offlineVerificationInput as OfflineVerification | null;
  const redundancy = redundancyReceiptInput as RedundancyReceipt | null;
  const redundancyCurrentness = redundancyCurrentnessInput as RedundancyCurrentness | null;

  const projectionValid = projection?.schemaVersion === "wedding-projection-delivery-manifest-currentness/v1"
    && projection.authority === "DERIVED_PROJECTION_DELIVERY_CURRENTNESS";
  const projectionCurrent = projectionValid && projection?.state === "CURRENT" && projection.current === true;
  const projectionState = stateFromInput(projectionInput, projectionValid, projectionCurrent);

  const packageValid = packageManifest?.schemaVersion === "wedding-venue-delivery-package/v1"
    && packageManifest.authority === "DERIVED_VENUE_DELIVERY_PACKAGE";
  const packageCurrent = packageValid
    && packageManifest?.projectionCurrentnessState === "CURRENT"
    && packageManifest.packageReady === true
    && canonicalTechnical(packageManifest.opening?.technical)
    && canonicalTechnical(packageManifest.profile?.technical);
  const packageState = stateFromInput(packageManifestInput, packageValid, packageCurrent);

  const offlineValid = offline?.schemaVersion === "wedding-venue-delivery-package-verification/v1"
    && offline.authority === "DERIVED_OFFLINE_VENUE_PACKAGE_VERIFICATION";
  const offlineCurrent = offlineValid && offline?.state === "CURRENT" && offline.current === true;
  const offlineVerifyState = stateFromInput(offlineVerificationInput, offlineValid, offlineCurrent);

  const redundancyValid = redundancy?.schemaVersion === "wedding-venue-delivery-redundancy/v1"
    && redundancy.authority === "DERIVED_THREE_COPY_DELIVERY_REDUNDANCY"
    && typeof redundancy.receiptSha256 === "string"
    && redundancy.receiptSha256.length >= 8;
  const ids = redundancy?.copies?.map((copy) => copy.targetId) ?? [];
  const uniqueTargets = expectedTargets.every((id) => ids.filter((value) => value === id).length === 1)
    && ids.length === expectedTargets.length;
  const copiesCurrent = redundancy?.copies?.every((copy) => copy.state === "CURRENT") === true;
  const redundancyCurrent = redundancyValid && redundancy?.redundancyReady === true && uniqueTargets && copiesCurrent;
  const redundancyState = stateFromInput(redundancyReceiptInput, redundancyValid, redundancyCurrent);

  const liveValid = redundancyCurrentness?.schemaVersion === "wedding-venue-delivery-redundancy-currentness/v1"
    && redundancyCurrentness.authority === "DERIVED_THREE_COPY_REDUNDANCY_CURRENTNESS";
  const liveIds = redundancyCurrentness?.copies?.map((copy) => copy.targetId) ?? [];
  const liveUniqueTargets = expectedTargets.every((id) => liveIds.filter((value) => value === id).length === 1)
    && liveIds.length === expectedTargets.length;
  const liveCopiesCurrent = redundancyCurrentness?.copies?.every((copy) => copy.state === "CURRENT") === true;
  const liveCurrent = liveValid
    && redundancyCurrentness?.state === "CURRENT"
    && redundancyCurrentness.current === true
    && (redundancyCurrentness.mismatches?.length ?? 0) === 0
    && liveUniqueTargets
    && liveCopiesCurrent;
  const redundancyCurrentnessState = stateFromInput(redundancyCurrentnessInput, liveValid, liveCurrent);

  const blockers: string[] = [];
  if (projectionState !== "CURRENT") blockers.push(`PROJECTION_${projectionState}`);
  if (packageState !== "CURRENT") blockers.push(`VENUE_PACKAGE_${packageState}`);
  if (offlineVerifyState !== "CURRENT") blockers.push(`OFFLINE_VERIFY_${offlineVerifyState}`);
  if (redundancyState !== "CURRENT") blockers.push(`THREE_COPY_REDUNDANCY_${redundancyState}`);
  if (redundancyCurrentnessState !== "CURRENT") blockers.push(`THREE_COPY_LIVE_CURRENTNESS_${redundancyCurrentnessState}`);
  if (redundancyValid && !uniqueTargets) blockers.push("THREE_COPY_TARGET_SET_INVALID");
  if (liveValid && !liveUniqueTargets) blockers.push("THREE_COPY_LIVE_TARGET_SET_INVALID");

  const projectionSha = projection?.carried?.manifestSha256 ?? null;
  const packageProjectionSha = packageManifest?.projectionManifestSha256 ?? null;
  const offlineProjectionSha = offline?.projectionManifestSha256 ?? null;
  if (projectionState === "CURRENT" && packageState === "CURRENT" && projectionSha !== packageProjectionSha) blockers.push("PROJECTION_TO_PACKAGE_SHA_MISMATCH");
  if (packageState === "CURRENT" && offlineVerifyState === "CURRENT" && packageProjectionSha !== offlineProjectionSha) blockers.push("PACKAGE_TO_OFFLINE_PROJECTION_SHA_MISMATCH");

  const deliveryManifestSha = packageManifest?.manifestSha256 ?? null;
  if (packageState === "CURRENT" && offlineVerifyState === "CURRENT" && deliveryManifestSha !== offline?.deliveryManifestSha256) blockers.push("DELIVERY_MANIFEST_SHA_MISMATCH");

  const movies = ["opening", "profile"] as const;
  for (const movieId of movies) {
    const projectionExportSha = projection?.carried?.[`${movieId}ExportSha256` as "openingExportSha256" | "profileExportSha256"] ?? null;
    const item = packageManifest?.[movieId];
    const verified = offline?.[movieId];
    if (packageState === "CURRENT" && item?.sourceExportSha256 !== projectionExportSha) blockers.push(`${movieId.toUpperCase()}_APPROVED_EXPORT_SHA_MISMATCH`);
    if (packageState === "CURRENT" && item?.sha256 !== item?.sourceExportSha256) blockers.push(`${movieId.toUpperCase()}_COPY_SOURCE_SHA_MISMATCH`);
    if (offlineVerifyState === "CURRENT" && item?.sha256 !== verified?.sha256) blockers.push(`${movieId.toUpperCase()}_OFFLINE_COPY_SHA_MISMATCH`);
  }

  const source = redundancy?.source;
  if (redundancyState === "CURRENT") {
    if (source?.projectionManifestSha256 !== projectionSha) blockers.push("REDUNDANCY_SOURCE_PROJECTION_SHA_MISMATCH");
    if (source?.deliveryManifestSha256 !== deliveryManifestSha) blockers.push("REDUNDANCY_SOURCE_DELIVERY_SHA_MISMATCH");
    if (source?.openingSha256 !== offline?.opening?.sha256) blockers.push("REDUNDANCY_SOURCE_OPENING_SHA_MISMATCH");
    if (source?.profileSha256 !== offline?.profile?.sha256) blockers.push("REDUNDANCY_SOURCE_PROFILE_SHA_MISMATCH");
    for (const copy of redundancy?.copies ?? []) {
      if (copy.projectionManifestSha256 !== source?.projectionManifestSha256) blockers.push(`${copy.targetId}_PROJECTION_SHA_MISMATCH`);
      if (copy.deliveryManifestSha256 !== source?.deliveryManifestSha256) blockers.push(`${copy.targetId}_DELIVERY_SHA_MISMATCH`);
      if (copy.openingSha256 !== source?.openingSha256) blockers.push(`${copy.targetId}_OPENING_SHA_MISMATCH`);
      if (copy.profileSha256 !== source?.profileSha256) blockers.push(`${copy.targetId}_PROFILE_SHA_MISMATCH`);
    }
  }

  const liveSource = redundancyCurrentness?.source;
  if (redundancyCurrentnessState === "CURRENT") {
    if (redundancyCurrentness?.receiptSha256 !== redundancy?.receiptSha256) blockers.push("LIVE_CURRENTNESS_RECEIPT_SHA_MISMATCH");
    if (liveSource?.projectionManifestSha256 !== projectionSha) blockers.push("LIVE_SOURCE_PROJECTION_SHA_MISMATCH");
    if (liveSource?.deliveryManifestSha256 !== deliveryManifestSha) blockers.push("LIVE_SOURCE_DELIVERY_SHA_MISMATCH");
    if (liveSource?.openingSha256 !== offline?.opening?.sha256) blockers.push("LIVE_SOURCE_OPENING_SHA_MISMATCH");
    if (liveSource?.profileSha256 !== offline?.profile?.sha256) blockers.push("LIVE_SOURCE_PROFILE_SHA_MISMATCH");
  }

  const packageReady = blockers.filter((item) => !item.startsWith("THREE_COPY_") && !item.startsWith("REDUNDANCY_") && !item.startsWith("LIVE_") && !expectedTargets.some((target) => item.startsWith(`${target}_`))).length === 0;
  const redundancyReady = redundancyState === "CURRENT" && redundancyCurrentnessState === "CURRENT" && blockers.length === 0;
  const ready = packageReady && redundancyReady;
  const states = [projectionState, packageState, offlineVerifyState, redundancyState, redundancyCurrentnessState];
  const state: GateState = ready
    ? "CURRENT"
    : states.includes("INVALID")
      ? "INVALID"
      : states.includes("STALE") || blockers.some((item) => item.includes("MISMATCH"))
        ? "STALE"
        : "NOT_RUN";

  const copyAuthority = redundancyCurrentnessState === "CURRENT" ? redundancyCurrentness?.copies : redundancy?.copies;
  return {
    schemaVersion: WEDDING_VENUE_DELIVERY_GATE_SCHEMA,
    state,
    ready,
    packageReady,
    redundancyReady,
    projectionState,
    packageState,
    offlineVerifyState,
    redundancyState,
    redundancyCurrentnessState,
    blockers,
    projectionManifestSha256: projectionSha,
    deliveryManifestSha256: deliveryManifestSha,
    redundancyReceiptSha256: redundancy?.receiptSha256 ?? null,
    redundancyCurrentnessReceiptSha256: redundancyCurrentness?.receiptSha256 ?? null,
    packageDir: offline?.packageDir ?? null,
    opening: {
      filename: packageManifest?.opening?.filename ?? null,
      approvedExportSha256: projection?.carried?.openingExportSha256 ?? null,
      copiedSha256: offline?.opening?.sha256 ?? null,
      technical: packageManifest?.opening?.technical ?? null,
    },
    profile: {
      filename: packageManifest?.profile?.filename ?? null,
      approvedExportSha256: projection?.carried?.profileExportSha256 ?? null,
      copiedSha256: offline?.profile?.sha256 ?? null,
      technical: packageManifest?.profile?.technical ?? null,
    },
    redundancyCopies: expectedTargets.map((targetId) => {
      const copy = copyAuthority?.find((item) => item.targetId === targetId);
      return {
        targetId,
        path: copy?.path ?? null,
        state: copy?.state === "CURRENT" ? "CURRENT" : copy ? "STALE" : "NOT_RUN",
        openingSha256: copy?.openingSha256 ?? null,
        profileSha256: copy?.profileSha256 ?? null,
      } as const;
    }),
    commands: {
      writeProjection: "cd motion-studio && node --no-warnings scripts/wedding-projection-delivery-manifest.mts --write",
      strictProjection: "cd motion-studio && node --no-warnings scripts/wedding-projection-delivery-manifest-currentness.mts --strict-current --json > out/handoff/wedding/wedding-projection-delivery-currentness.json",
      buildPackage: "cd motion-studio && node --no-warnings scripts/wedding-venue-delivery-package.mts --write",
      verifyPackage: "cd motion-studio && node --no-warnings scripts/wedding-venue-delivery-package-verify.mts --package-dir=out/delivery/wedding-venue --json > out/delivery/wedding-venue-verification.json",
      buildThreeCopyRedundancy: "cd motion-studio && node --no-warnings scripts/wedding-venue-delivery-redundancy.mts --source=out/delivery/wedding-venue --primary=<PRIMARY_USB_FOLDER> --backup=<BACKUP_USB_FOLDER> --cloud=<CLOUD_BACKUP_FOLDER> --write",
      strictThreeCopyRedundancy: "cd motion-studio && node --no-warnings scripts/wedding-venue-delivery-redundancy-currentness.mts --strict-current --json > out/handoff/wedding/wedding-venue-delivery-redundancy-currentness.json",
    },
    evidenceBoundary: {
      macRemotionStudioGuiActual: "NOT_PROMOTED_BY_DASHBOARD_GATE",
      palmierGuiActual: "NOT_PROMOTED_BY_DASHBOARD_GATE",
      macDavinciResolveGuiActual: "NOT_PROMOTED_BY_DASHBOARD_GATE",
      physicalUsbInsertedActual: "NOT_PROMOTED_BY_DASHBOARD_GATE",
      cloudUploadActual: "NOT_PROMOTED_BY_DASHBOARD_GATE",
      venuePlaybackActual: "NOT_RUN",
      humanFinalApproval: "NOT_PROMOTED_BY_DASHBOARD_GATE",
    },
  };
}
