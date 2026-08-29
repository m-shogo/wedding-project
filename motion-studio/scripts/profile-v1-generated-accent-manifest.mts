import {profileV1GeneratedAccentImplementations} from '../src/data/profileV1GeneratedAccentRegistry.ts';
import {profileV1OptionalGeneratedSlots} from '../src/data/profileV1ProductionPlan.ts';

const rows = profileV1OptionalGeneratedSlots.map((slot) => {
  const implementation = profileV1GeneratedAccentImplementations.find((item) => item.slotId === slot.id);
  if (!implementation) throw new Error(`PROFILE_GENERATED_ACCENT_IMPLEMENTATION_MISSING:${slot.id}`);
  if (implementation.chapterId !== slot.chapterId) {
    throw new Error(`PROFILE_GENERATED_ACCENT_CHAPTER_MISMATCH:${slot.id}:${slot.chapterId}:${implementation.chapterId}`);
  }
  return {
    slotId: slot.id,
    chapterId: slot.chapterId,
    label: slot.label,
    kind: slot.kind,
    required: slot.required,
    canonicalStem: slot.canonicalStem,
    note: slot.note,
    implementation: implementation.implementation,
    canonicalReuse: implementation.canonicalReuse,
    source: 'MOTION_STUDIO_GENERATED' as const,
    realMediaRequired: false,
  };
});

const manifest = {
  schemaVersion: 'profile-v1-generated-accent-manifest/v1' as const,
  authority: 'MOTION_STUDIO_CANONICAL_GENERATED_ACCENTS' as const,
  count: rows.length,
  accents: rows,
  productionEvidence: {
    visualSmokeOnly: true,
    humanRealMediaQa: 'NOT_RUN' as const,
    macDaVinciActual: 'NOT_RUN' as const,
    productionReady: false,
  },
  guardrails: [
    'GENERATED_ACCENT_IMPLEMENTED != HUMAN_REAL_MEDIA_QA_PASS',
    'VISUAL_SMOKE_PASS != MAC_DAVINCI_ACTUAL_VERIFIED',
    'OPTIONAL_GENERATED_ROLE != REQUIRED_REAL_MEDIA_SLOT',
  ],
};

if (manifest.count !== profileV1GeneratedAccentImplementations.length) {
  throw new Error(`PROFILE_GENERATED_ACCENT_COUNT_MISMATCH:${manifest.count}:${profileV1GeneratedAccentImplementations.length}`);
}

console.log(JSON.stringify(manifest, null, 2));
