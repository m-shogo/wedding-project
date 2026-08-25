import {startExtendedAuthority, startExtendedSections} from '../../../movie-dashboard/src/data/startExtendedRhythmMap.ts';
import {startMotionFamilies, startStarterSectionPlan} from '../../../movie-dashboard/src/data/startSelectionPlan.ts';

export const START_EXTENDED_ROUGH_FPS = 30;

export const startExtendedOpeningRoughAuthority = {
  audio: startExtendedAuthority.audioState,
  timing: startExtendedAuthority.timingState,
  media: 'MEDIA_BLOCKED' as const,
  adoption: 'STARTER_PLAN_HUMAN_CONFIRMATION_REQUIRED' as const,
};

export const startExtendedOpeningRoughItems = startExtendedSections.map((section) => {
  const plan = startStarterSectionPlan.find((item) => item.sectionId === section.id);
  if (!plan) throw new Error(`StartExtendedOpeningRoughV1: missing starter plan for ${section.id}`);
  const family = startMotionFamilies.find((item) => item.id === plan.familyId);
  if (!family) throw new Error(`StartExtendedOpeningRoughV1: missing family ${plan.familyId}`);
  return {
    ...plan,
    sectionLabel: section.label,
    familyLabel: family.label,
    referenceStartSec: section.referenceStartSec,
    referenceEndSec: section.referenceEndSec,
    durationInFrames: Math.round((section.referenceEndSec - section.referenceStartSec) * START_EXTENDED_ROUGH_FPS),
  };
});

export const startExtendedOpeningRoughTotalFrames = startExtendedOpeningRoughItems.reduce((sum, item) => sum + item.durationInFrames, 0);
