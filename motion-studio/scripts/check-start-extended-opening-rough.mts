import {resolveDirectorRecipeById} from '../src/motion-kit/directorRecipeAdapter.ts';
import {
  START_EXTENDED_ROUGH_FPS,
  startExtendedOpeningRoughAuthority,
  startExtendedOpeningRoughItems,
  startExtendedOpeningRoughTotalFrames,
} from '../src/data/startExtendedOpeningRough.ts';

const errors: string[] = [];
const uniqueSections = new Set(startExtendedOpeningRoughItems.map((item) => item.sectionId));
const uniqueFamilies = new Set(startExtendedOpeningRoughItems.map((item) => item.familyId));

if (startExtendedOpeningRoughItems.length !== 14 || uniqueSections.size !== 14) errors.push('Rough must map exactly 14 unique sections.');
if (uniqueFamilies.size < 4 || uniqueFamilies.size > 8) errors.push(`Rough must use 4-8 motion families; found ${uniqueFamilies.size}.`);
if (startExtendedOpeningRoughTotalFrames !== 129 * START_EXTENDED_ROUGH_FPS) errors.push(`Expected 3870 reference frames; found ${startExtendedOpeningRoughTotalFrames}.`);
if (startExtendedOpeningRoughAuthority.audio !== 'AUDIO_BLOCKED') errors.push('Audio authority must remain AUDIO_BLOCKED.');
if (startExtendedOpeningRoughAuthority.media !== 'MEDIA_BLOCKED') errors.push('Media authority must remain MEDIA_BLOCKED.');

for (const item of startExtendedOpeningRoughItems) {
  try {
    const resolved = resolveDirectorRecipeById(item.recipeId);
    if (resolved.layers.length === 0) errors.push(`${item.sectionId}: ${item.recipeId} has no render layers.`);
  } catch (error) {
    errors.push(`${item.sectionId}: ${(error as Error).message}`);
  }
}

if (errors.length) {
  errors.forEach((error) => console.error(`❌ ${error}`));
  process.exit(1);
}

console.log(`StartExtendedOpeningRoughV1 contracts OK: 14 sections, ${uniqueFamilies.size} families, ${startExtendedOpeningRoughTotalFrames} frames, AUDIO_BLOCKED / MEDIA_BLOCKED.`);
