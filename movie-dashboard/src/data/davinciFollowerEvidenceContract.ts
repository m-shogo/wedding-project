// Backward-compatible import path for the two existing Follower routes.
// Generic DaVinci Actual evidence parsing now lives in davinciActualEvidenceContract so non-Follower
// patterns (for example type-word-punch) can reuse the same fail-closed evidence boundary without
// pretending they are sequential Follower animations.
export * from "./davinciActualEvidenceContract";
