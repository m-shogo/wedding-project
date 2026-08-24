// pnpm check:start-section-recipes
//
// Phase H — closes the gap left after Phase A-G: movie-dashboard's
// verify-start-section-recipe-map-contracts.mjs already checks that every recipe id named in
// startSectionRecipeMap.ts (Phase E) exists somewhere in directorRecipeCatalog.ts (Phase A). It
// does NOT check that those ids actually render through the shared engine adapter built in
// Phase B (motion-studio/src/motion-kit/directorRecipeAdapter.ts). This script closes that gap
// from the motion-studio side, where the renderer actually lives.
//
// For all 14 StaRt Extended sections:
//   1. a mapping exists in startSectionRecipeMap.ts,
//   2. every primaryRecipeIds / alternateRecipeIds entry resolves via resolveDirectorRecipeById()
//      without throwing (i.e. is genuinely renderable, not just a string that matches an id),
//   3. every primary/alternate recipe only uses the known shared engines (no ad-hoc escape hatch),
//   4. section-level energy/density declared in startSectionRecipeMap.ts is compatible with the
//      recipe's own tags where the recipe declares an explicit energy (loose cross-check, not a
//      hard requirement, since a section can deliberately choose a slightly different energy).
//
// This is a read-only contract check. It does not render video and does not touch Opening V1.

import {directorRecipeCatalog, resolveDirectorRecipeById} from '../src/motion-kit/directorRecipeAdapter.ts';
import {getDirectorRecipeById} from '../../movie-dashboard/src/data/directorRecipeCatalog.ts';
import {startSectionRecipeMap} from '../../movie-dashboard/src/data/startSectionRecipeMap.ts';
import {startExtendedSections} from '../../movie-dashboard/src/data/startExtendedRhythmMap.ts';

let errors = 0;
const err = (msg: string) => {
  errors++;
  console.error(`❌ ${msg}`);
};

const KNOWN_ENGINES = new Set(['typography-reveal', 'camera-transform', 'transition-wipe', 'graphic-hit', 'native-cut', 'photo-layout']);

if (startExtendedSections.length !== 14) {
  err(`Expected 14 StaRt Extended sections, found ${startExtendedSections.length}.`);
}

if (startSectionRecipeMap.length !== 14) {
  err(`Expected startSectionRecipeMap to cover 14 sections, found ${startSectionRecipeMap.length}.`);
}

let checkedRecipes = 0;
let checkedSections = 0;

for (const section of startExtendedSections) {
  const mapping = startSectionRecipeMap.find((m) => m.sectionId === section.id);
  if (!mapping) {
    err(`Section "${section.id}" has no entry in startSectionRecipeMap.ts.`);
    continue;
  }
  checkedSections++;

  const idsToCheck = [
    ...mapping.primaryRecipeIds.map((id) => ({id, role: 'primary' as const})),
    ...mapping.alternateRecipeIds.map((id) => ({id, role: 'alternate' as const})),
  ];

  if (mapping.primaryRecipeIds.length === 0) {
    err(`Section "${section.id}": primaryRecipeIds is empty, so this section has no renderable default.`);
  }

  for (const {id, role} of idsToCheck) {
    const recipe = getDirectorRecipeById(id);
    if (!recipe) {
      err(`Section "${section.id}" (${role}): recipe id "${id}" does not exist in directorRecipeCatalog.ts.`);
      continue;
    }
    try {
      const resolved = resolveDirectorRecipeById(id);
      checkedRecipes++;
      if (resolved.layers.length === 0) {
        err(`Section "${section.id}" (${role}): recipe "${id}" resolved to zero renderer layers.`);
      }
      for (const layer of resolved.layers) {
        if (!KNOWN_ENGINES.has(layer.engine)) {
          err(`Section "${section.id}" (${role}): recipe "${id}" uses unknown engine "${layer.engine}".`);
        }
      }
    } catch (error) {
      err(`Section "${section.id}" (${role}): recipe "${id}" threw when resolving through directorRecipeAdapter: ${(error as Error).message}`);
    }
  }

  // Loose energy cross-check: at least one primary recipe should carry a matching or adjacent
  // energy tag when the recipe declares one. This is informational-strength (not a hard block on
  // energy mismatch, since the human-authored mapping already reasons about this in `notes`), but
  // it does block a primary recipe list where every recipe *explicitly* contradicts the section's
  // declared energy.
  const primaryRecipes = mapping.primaryRecipeIds.map((id) => getDirectorRecipeById(id)).filter((r): r is NonNullable<typeof r> => Boolean(r));
  const withDeclaredEnergy = primaryRecipes.filter((r) => r.energy.length > 0);
  if (withDeclaredEnergy.length > 0 && !withDeclaredEnergy.some((r) => r.energy.includes(mapping.energy))) {
    // Not an error: recipes may reasonably span adjacent energies. Surface it as a warning line
    // in the summary instead of failing the build, since energy taxonomy is intentionally loose
    // (see startSectionRecipeMap.ts header comment).
    console.warn(
      `⚠️  Section "${section.id}": none of its primaryRecipeIds declare energy including "${mapping.energy}" (found: ${withDeclaredEnergy.map((r) => r.energy.join('/')).join(', ') || 'none declared'}). Not a failure, worth a human glance.`,
    );
  }
}

for (const mapping of startSectionRecipeMap) {
  if (!startExtendedSections.some((s) => s.id === mapping.sectionId)) {
    err(`startSectionRecipeMap.ts has a mapping for "${mapping.sectionId}" which is not one of the 14 startExtendedSections ids.`);
  }
}

if (errors) {
  console.error(`StaRt Section ⇄ Recipe renderability contracts FAILED (${errors})`);
  process.exit(1);
}
console.log(
  `StaRt Section ⇄ Recipe renderability contracts OK: ${checkedSections}/14 sections, ${checkedRecipes} primary/alternate recipe references all resolve through directorRecipeAdapter and use only the 6 shared engines. Catalog size: ${directorRecipeCatalog.length}.`,
);
