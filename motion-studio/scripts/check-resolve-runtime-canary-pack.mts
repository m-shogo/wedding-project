import {
  createResolveRuntimeCanaryEvidenceTemplate,
  resolve21RuntimeCanaryPack,
} from '../src/data/resolveRuntimeCanaryPack.ts';
import {
  resolveRuntimeCanaryEvidenceSchema,
  resolveRuntimeCanaryPackSchema,
} from '../src/data/resolveRuntimeCanary.schema.ts';
import {
  getResolveRuntimeCanaryCapabilityRefs,
  resolveRuntimeCanaryCapabilityRefs,
} from '../src/data/resolveRuntimeCanaryCapabilityRefs.ts';

let errors = 0;
const err = (message: string) => {
  errors += 1;
  console.error(`❌ ${message}`);
};
const ok = (message: string) => console.log(`✅ ${message}`);

const parsedPack = resolveRuntimeCanaryPackSchema.safeParse(resolve21RuntimeCanaryPack);
if (!parsedPack.success) {
  for (const issue of parsedPack.error.issues) {
    err(`schema: ${issue.path.join('.')} -> ${issue.message}`);
  }
}

const ids = resolve21RuntimeCanaryPack.canaries.map((canary) => canary.id);
if (new Set(ids).size !== ids.length) err('duplicate canary IDs');

const capabilityRefKeys = Object.keys(resolveRuntimeCanaryCapabilityRefs);
for (const id of ids) {
  if (!capabilityRefKeys.includes(id)) err(`${id}: typed capability reference mapping missing`);
}
for (const refKey of capabilityRefKeys) {
  if (!ids.includes(refKey)) err(`typed capability reference has no canary: ${refKey}`);
}

for (const canary of resolve21RuntimeCanaryPack.canaries) {
  const stepIds = canary.steps.map((step) => step.id);
  if (new Set(stepIds).size !== stepIds.length) err(`${canary.id}: duplicate step IDs`);

  const evidenceIds = canary.evidenceRequirements.map((evidence) => evidence.id);
  if (new Set(evidenceIds).size !== evidenceIds.length) err(`${canary.id}: duplicate evidence requirement IDs`);

  const typedRefs = getResolveRuntimeCanaryCapabilityRefs(canary.id);
  if (typedRefs.length === 0) err(`${canary.id}: at least one typed capability reference is required`);
  for (const ref of typedRefs) {
    if (!canary.capabilityIds.includes(ref.id)) {
      err(`${canary.id}: typed ref ${ref.kind}:${ref.id} is not declared in capabilityIds compatibility labels`);
    }
    if (!ref.sourceRef.trim()) err(`${canary.id}: typed ref ${ref.id} sourceRef is empty`);
  }
  for (const compatibilityId of canary.capabilityIds) {
    if (!typedRefs.some((ref) => ref.id === compatibilityId)) {
      err(`${canary.id}: compatibility capabilityId has no typed source mapping: ${compatibilityId}`);
    }
  }

  if (!canary.isolation.disposableProjectRequired) {
    err(`${canary.id}: disposableProjectRequired must stay true for unresolved runtime canaries`);
  }
  if (!canary.isolation.realWeddingProjectMutationForbidden) {
    err(`${canary.id}: real wedding project mutation must remain forbidden`);
  }
  if (!canary.isolation.privateMediaCommitForbidden) {
    err(`${canary.id}: private media commit must remain forbidden`);
  }
  if (canary.isolation.networkInstallAllowed) {
    err(`${canary.id}: first-pass runtime canary must not require network install`);
  }

  if (canary.promotion.minimumIndependentExecutions < 2) {
    err(`${canary.id}: promotion needs at least two independent executions`);
  }

  if (canary.promotion.requiresRender && !canary.evidenceRequirements.some((item) => item.required && item.kind === 'RENDER')) {
    err(`${canary.id}: render-required promotion must require RENDER evidence`);
  }
  if (canary.promotion.requiresSaveReopen && !canary.steps.some((step) => /reopen/i.test(`${step.id} ${step.action} ${step.expected}`))) {
    err(`${canary.id}: save/reopen promotion must include an explicit reopen step`);
  }

  if (!canary.guardrails.some((guardrail) => guardrail.includes('!='))) {
    err(`${canary.id}: must include at least one explicit non-equivalence guardrail`);
  }

  const evidenceTemplate = createResolveRuntimeCanaryEvidenceTemplate(canary.id);
  const evidenceParsed = resolveRuntimeCanaryEvidenceSchema.safeParse(evidenceTemplate);
  if (!evidenceParsed.success) {
    for (const issue of evidenceParsed.error.issues) {
      err(`${canary.id} evidence template: ${issue.path.join('.')} -> ${issue.message}`);
    }
  }

  if (evidenceTemplate.promotionEligible) err(`${canary.id}: fresh evidence template must fail closed`);
  if (evidenceTemplate.result !== 'NOT_RUN') err(`${canary.id}: fresh evidence template must be NOT_RUN`);
  if (evidenceTemplate.capturedAt !== null) err(`${canary.id}: fresh evidence template capturedAt must be null`);
}

for (const requiredId of [
  'DV21-PALMIER-FCPXML-01',
  'DV21-REMOTION-ALPHA-01',
  'DV21-LOTTIE-OGRAF-01',
  'DV21-DRFX-FREE-01',
  'DV21-AUDIO-RECOVERY-01',
  'DV21-DRT-PORTABILITY-01',
]) {
  if (!ids.includes(requiredId)) err(`required high-value canary missing: ${requiredId}`);
}

const lottie = resolve21RuntimeCanaryPack.canaries.find((canary) => canary.id === 'DV21-LOTTIE-OGRAF-01');
if (lottie?.target.platforms.includes('LINUX')) {
  err('DV21-LOTTIE-OGRAF-01 must not claim Linux support without a Linux/runtime evidence update');
}

const audio = resolve21RuntimeCanaryPack.canaries.find((canary) => canary.id === 'DV21-AUDIO-RECOVERY-01');
if (!audio?.guardrails.includes('MANUAL_RECOVERY != AUTOMATED_WRITE')) {
  err('audio canary must keep manual recovery separate from automated write capability');
}

const fcpxml = resolve21RuntimeCanaryPack.canaries.find((canary) => canary.id === 'DV21-PALMIER-FCPXML-01');
if (fcpxml?.state !== 'BLOCKED_INPUT') {
  err('Palmier FCPXML canary must stay BLOCKED_INPUT until a real Palmier export fixture exists');
}

const drtRefs = getResolveRuntimeCanaryCapabilityRefs('DV21-DRT-PORTABILITY-01');
if (!drtRefs.some((ref) => ref.kind === 'RESEARCH_CANARY' && ref.id === 'DV21-DRT-PORT-02')) {
  err('DRT portability canary must reference the research canary namespace instead of pretending a canonical HandoffProperty exists');
}

if (errors > 0) {
  console.error(`Resolve runtime canary pack FAILED (${errors})`);
  process.exit(1);
}

ok(`${ids.length} Resolve runtime canaries parsed with fail-closed evidence templates, typed policy references, disposable-project safety, two-run promotion, and explicit platform/automation boundaries.`);
