export type DaVinciEvidenceState = "NOT_RUN" | "PASS" | "FAIL";
export type DaVinciObservedValue = string | number | boolean | null;

export interface DaVinciLiveParameterBindingV1<Role extends string> {
  role: Role;
  toolName: string;
  inputName: string;
  observedValue: DaVinciObservedValue;
}

export interface DaVinciVisualQaV1<State extends DaVinciEvidenceState = DaVinciEvidenceState> {
  oneX: State;
  halfSpeed: State;
  reviewedAt: string | null;
  notes: string[];
}

export interface DaVinciHumanPromotionGateV1<Role extends string> {
  schemaVersion: "davinci-human-promotion-gate/v1";
  authority: "DERIVED_EVIDENCE_GATE";
  machineChecksPass: boolean;
  requiredBindingRoles: Role[];
  capturedBindingRoles: Role[];
  bindingsComplete: boolean;
  visualQaComplete: boolean;
  eligibleForHumanReview: boolean;
  automaticPromotionAllowed: false;
  productionReady: false;
  blockers: string[];
  rule: string;
}

export function evidenceObject(value: unknown, label: string): Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error(`${label} must be an object`);
  }
  return value as Record<string, unknown>;
}

export function evidenceString(value: unknown, label: string): string {
  if (typeof value !== "string") throw new Error(`${label} must be a string`);
  return value;
}

export function evidenceNullableString(value: unknown, label: string): string | null {
  return value === null ? null : evidenceString(value, label);
}

export function evidenceNullableBoolean(value: unknown, label: string): boolean | null {
  if (value === null) return null;
  if (typeof value !== "boolean") throw new Error(`${label} must be boolean|null`);
  return value;
}

export function evidenceNullableFiniteNumber(value: unknown, label: string): number | null {
  if (value === null) return null;
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error(`${label} must be finite number|null`);
  }
  return value;
}

export function evidenceStringArray(value: unknown, label: string): string[] {
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    throw new Error(`${label} must be string[]`);
  }
  return [...value];
}

export function evidenceState(value: unknown, label: string): DaVinciEvidenceState {
  if (value !== "NOT_RUN" && value !== "PASS" && value !== "FAIL") {
    throw new Error(`${label} must be NOT_RUN|PASS|FAIL`);
  }
  return value;
}

export function parseDaVinciVisualQa(
  value: unknown,
  label = "visualQa",
): DaVinciVisualQaV1 {
  const input = evidenceObject(value, label);
  return {
    oneX: evidenceState(input.oneX, `${label}.oneX`),
    halfSpeed: evidenceState(input.halfSpeed, `${label}.halfSpeed`),
    reviewedAt: evidenceNullableString(input.reviewedAt, `${label}.reviewedAt`),
    notes: evidenceStringArray(input.notes, `${label}.notes`),
  };
}

export function parseDaVinciLiveParameterBindings<Role extends string>(
  value: unknown,
  allowedRoles: readonly Role[],
): DaVinciLiveParameterBindingV1<Role>[] {
  if (!Array.isArray(value)) throw new Error("liveParameterBindings must be an array");
  return value.map((entry, index) => {
    const input = evidenceObject(entry, `liveParameterBindings[${index}]`);
    const role = input.role as Role;
    if (!allowedRoles.includes(role)) {
      throw new Error(`liveParameterBindings[${index}].role is invalid`);
    }
    const observedValue = input.observedValue;
    if (
      observedValue !== null &&
      typeof observedValue !== "string" &&
      typeof observedValue !== "number" &&
      typeof observedValue !== "boolean"
    ) {
      throw new Error(`liveParameterBindings[${index}].observedValue has unsupported type`);
    }
    return {
      role,
      toolName: evidenceString(input.toolName, `liveParameterBindings[${index}].toolName`),
      inputName: evidenceString(input.inputName, `liveParameterBindings[${index}].inputName`),
      observedValue,
    };
  });
}

export function capturedDaVinciBindingRoles<Role extends string>(
  bindings: readonly DaVinciLiveParameterBindingV1<Role>[],
  requiredRoles: readonly Role[],
): Role[] {
  return requiredRoles.filter((role) =>
    bindings.some(
      (binding) =>
        binding.role === role &&
        binding.toolName.trim().length > 0 &&
        binding.inputName.trim().length > 0,
    ),
  );
}

export function evaluateDaVinciHumanPromotionGate<Role extends string>({
  machineChecks,
  bindings,
  requiredBindingRoles,
  visualQa,
}: {
  machineChecks: readonly DaVinciEvidenceState[];
  bindings: readonly DaVinciLiveParameterBindingV1<Role>[];
  requiredBindingRoles: readonly Role[];
  visualQa: DaVinciVisualQaV1;
}): DaVinciHumanPromotionGateV1<Role> {
  const machineChecksPass = machineChecks.length > 0 && machineChecks.every((state) => state === "PASS");
  const capturedBindingRoles = capturedDaVinciBindingRoles(bindings, requiredBindingRoles);
  const bindingsComplete =
    requiredBindingRoles.length > 0 && capturedBindingRoles.length === requiredBindingRoles.length;
  const visualQaComplete =
    visualQa.oneX === "PASS" &&
    visualQa.halfSpeed === "PASS" &&
    typeof visualQa.reviewedAt === "string" &&
    visualQa.reviewedAt.trim().length > 0;
  const blockers: string[] = [];
  if (!machineChecksPass) blockers.push("DAVINCI_MACHINE_EVIDENCE_INCOMPLETE");
  if (!bindingsComplete) blockers.push("DAVINCI_REQUIRED_BINDINGS_INCOMPLETE");
  if (!visualQaComplete) blockers.push("DAVINCI_VISUAL_QA_INCOMPLETE");
  const eligibleForHumanReview = blockers.length === 0;
  if (eligibleForHumanReview) blockers.push("DAVINCI_HUMAN_PROMOTION_REVIEW_REQUIRED");

  return {
    schemaVersion: "davinci-human-promotion-gate/v1",
    authority: "DERIVED_EVIDENCE_GATE",
    machineChecksPass,
    requiredBindingRoles: [...requiredBindingRoles],
    capturedBindingRoles,
    bindingsComplete,
    visualQaComplete,
    eligibleForHumanReview,
    automaticPromotionAllowed: false,
    productionReady: false,
    blockers,
    rule: "Machine/readback evidence can only make a candidate eligible for a separate human promotion review. It never promotes a Typography route or marks productionReady automatically.",
  };
}

export function assertDaVinciEvidenceIdentity(
  evidence: { sceneId: string; sourceRevision: string },
  expected: { sceneId: string; sourceRevision: string },
  options: { sceneMismatchMessage: string; staleRevisionMessage: string },
) {
  if (evidence.sceneId !== expected.sceneId) throw new Error(options.sceneMismatchMessage);
  if (evidence.sourceRevision !== expected.sourceRevision) throw new Error(options.staleRevisionMessage);
}

export function blankDaVinciVisualQa(): DaVinciVisualQaV1 {
  return {
    oneX: "NOT_RUN",
    halfSpeed: "NOT_RUN",
    reviewedAt: null,
    notes: [],
  };
}
