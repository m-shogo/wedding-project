export const WEDDING_VENUE_DELIVERY_GATE_SCHEMA = "wedding-venue-delivery-gate-dashboard/v1" as const;

type GateState = "NOT_RUN" | "CURRENT" | "STALE" | "INVALID";

type ProjectionCurrentness = {
  schemaVersion?: string;
  authority?: string;
  state?: string;
  current?: boolean;
  mismatches?: string[];
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

export type WeddingVenueDeliveryGateAudit = {
  schemaVersion: typeof WEDDING_VENUE_DELIVERY_GATE_SCHEMA;
  state: GateState;
  ready: boolean;
  projectionState: GateState;
  packageState: GateState;
  offlineVerifyState: GateState;
  blockers: string[];
  projectionManifestSha256: string | null;
  deliveryManifestSha256: string | null;
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
  commands: {
    writeProjection: string;
    strictProjection: string;
    buildPackage: string;
    verifyPackage: string;
  };
  evidenceBoundary: {
    macRemotionStudioGuiActual: "NOT_PROMOTED_BY_DASHBOARD_GATE";
    palmierGuiActual: "NOT_PROMOTED_BY_DASHBOARD_GATE";
    macDavinciResolveGuiActual: "NOT_PROMOTED_BY_DASHBOARD_GATE";
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

export function auditWeddingVenueDeliveryGate(
  projectionInput: unknown,
  packageManifestInput: unknown,
  offlineVerificationInput: unknown,
): WeddingVenueDeliveryGateAudit {
  const projection = projectionInput as ProjectionCurrentness | null;
  const packageManifest = packageManifestInput as VenuePackageManifest | null;
  const offline = offlineVerificationInput as OfflineVerification | null;

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

  const blockers: string[] = [];
  if (projectionState !== "CURRENT") blockers.push(`PROJECTION_${projectionState}`);
  if (packageState !== "CURRENT") blockers.push(`VENUE_PACKAGE_${packageState}`);
  if (offlineVerifyState !== "CURRENT") blockers.push(`OFFLINE_VERIFY_${offlineVerifyState}`);

  const projectionSha = projection?.carried?.manifestSha256 ?? null;
  const packageProjectionSha = packageManifest?.projectionManifestSha256 ?? null;
  const offlineProjectionSha = offline?.projectionManifestSha256 ?? null;
  if (projectionState === "CURRENT" && packageState === "CURRENT" && projectionSha !== packageProjectionSha) {
    blockers.push("PROJECTION_TO_PACKAGE_SHA_MISMATCH");
  }
  if (packageState === "CURRENT" && offlineVerifyState === "CURRENT" && packageProjectionSha !== offlineProjectionSha) {
    blockers.push("PACKAGE_TO_OFFLINE_PROJECTION_SHA_MISMATCH");
  }

  const deliveryManifestSha = packageManifest?.manifestSha256 ?? null;
  if (packageState === "CURRENT" && offlineVerifyState === "CURRENT" && deliveryManifestSha !== offline?.deliveryManifestSha256) {
    blockers.push("DELIVERY_MANIFEST_SHA_MISMATCH");
  }

  const movies = ["opening", "profile"] as const;
  for (const movieId of movies) {
    const projectionExportSha = projection?.carried?.[`${movieId}ExportSha256` as "openingExportSha256" | "profileExportSha256"] ?? null;
    const item = packageManifest?.[movieId];
    const verified = offline?.[movieId];
    if (packageState === "CURRENT" && item?.sourceExportSha256 !== projectionExportSha) blockers.push(`${movieId.toUpperCase()}_APPROVED_EXPORT_SHA_MISMATCH`);
    if (packageState === "CURRENT" && item?.sha256 !== item?.sourceExportSha256) blockers.push(`${movieId.toUpperCase()}_COPY_SOURCE_SHA_MISMATCH`);
    if (offlineVerifyState === "CURRENT" && item?.sha256 !== verified?.sha256) blockers.push(`${movieId.toUpperCase()}_OFFLINE_COPY_SHA_MISMATCH`);
  }

  const ready = blockers.length === 0;
  const state: GateState = ready
    ? "CURRENT"
    : [projectionState, packageState, offlineVerifyState].includes("INVALID")
      ? "INVALID"
      : [projectionState, packageState, offlineVerifyState].includes("STALE") || blockers.some((item) => item.includes("MISMATCH"))
        ? "STALE"
        : "NOT_RUN";

  return {
    schemaVersion: WEDDING_VENUE_DELIVERY_GATE_SCHEMA,
    state,
    ready,
    projectionState,
    packageState,
    offlineVerifyState,
    blockers,
    projectionManifestSha256: projectionSha,
    deliveryManifestSha256: deliveryManifestSha,
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
    commands: {
      writeProjection: "cd motion-studio && node --no-warnings scripts/wedding-projection-delivery-manifest.mts --write",
      strictProjection: "cd motion-studio && node --no-warnings scripts/wedding-projection-delivery-manifest-currentness.mts --strict-current --json > out/handoff/wedding/wedding-projection-delivery-currentness.json",
      buildPackage: "cd motion-studio && node --no-warnings scripts/wedding-venue-delivery-package.mts --write",
      verifyPackage: "cd motion-studio && node --no-warnings scripts/wedding-venue-delivery-package-verify.mts --package-dir=out/delivery/wedding-venue --json > out/delivery/wedding-venue-verification.json",
    },
    evidenceBoundary: {
      macRemotionStudioGuiActual: "NOT_PROMOTED_BY_DASHBOARD_GATE",
      palmierGuiActual: "NOT_PROMOTED_BY_DASHBOARD_GATE",
      macDavinciResolveGuiActual: "NOT_PROMOTED_BY_DASHBOARD_GATE",
      humanFinalApproval: "NOT_PROMOTED_BY_DASHBOARD_GATE",
    },
  };
}
