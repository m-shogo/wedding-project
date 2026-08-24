// pnpm export:palmier-recipe-handoff
//
// Phase F — Palmier / DaVinci handoff export for the StaRt Director Recipe Catalog research
// track (Phase A-E, already merged to main). This does NOT touch Opening V1. Opening V1's
// source of truth stays src/data/openingV1.ts / OpeningV1.tsx per ../CLAUDE.md.
//
// Input (single source of truth, read-only, not copied):
//   movie-dashboard/src/data/directorRecipeCatalog.ts   Phase A — 97 recipes, buildPalmierRecipeHandoff()
//   movie-dashboard/src/data/startSectionRecipeMap.ts   Phase E — section -> primary/alternate/avoid recipes
//   movie-dashboard/src/data/startExtendedRhythmMap.ts  section timing/order (referenceStartSec/EndSec)
//
// Output (Git-tracked; CSV/MD/JSON only, no video/image):
//   exports/palmier/director-recipe-section-handoff.csv
//   exports/palmier/director-recipe-section-handoff.md
//   exports/palmier/director-recipe-section-handoff.json
//
// This is a human-readable handoff pack for bringing the section -> recipe plan into Palmier
// (or any timeline tool) by hand. It is NOT a Palmier project file and does NOT write to any
// running Palmier project. See docs/decisions/2026-08-25-director-recipe-palmier-davinci-handoff.md
// for why (Palmier MCP write tools were intentionally not exercised in this phase — read-only
// checks only, per docs/palmier-operation.md "まだ本編集しない" guidance).

import {mkdirSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {
  directorRecipeCatalog,
  getDirectorRecipeById,
  buildPalmierRecipeHandoff,
  type DirectorRecipe,
} from '../../movie-dashboard/src/data/directorRecipeCatalog.ts';
import {startSectionRecipeMap} from '../../movie-dashboard/src/data/startSectionRecipeMap.ts';
import {startExtendedSections, startExtendedSongFacts} from '../../movie-dashboard/src/data/startExtendedRhythmMap.ts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(studioRoot, 'exports/palmier');
mkdirSync(outDir, {recursive: true});

const csvEscape = (v: string): string => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);

const mmss = (sec: number): string => {
  const m = Math.floor(sec / 60);
  const s = Math.round(sec % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

const fps = 30;
const framesToSec = (f: number) => (f / fps).toFixed(2);

interface RecipeRef {
  role: 'primary' | 'alternate';
  recipe: DirectorRecipe;
}

interface HandoffRow {
  order: number;
  sectionId: string;
  sectionLabel: string;
  markerStart: string;
  markerEnd: string;
  durationSec: number;
  energy: string;
  density: string;
  primaryRecipeId: string;
  primaryRecipeLabel: string;
  primaryRecipeCategory: string;
  motionPresetIds: string;
  sourceType: string;
  durationFramesRange: string;
  durationSecRange: string;
  intensity: string;
  transitionGrammar: string;
  beatBehavior: string;
  alternateRecipeIds: string;
  avoidRecipeIds: string;
  photoHoldSeconds: string;
  graphicDensityPolicy: string;
  typographyLevel: string;
  threeHitPolicy: string;
  notes: string;
}

const rows: HandoffRow[] = [];
let missingCount = 0;

startExtendedSections.forEach((section, index) => {
  const mapping = startSectionRecipeMap.find((m) => m.sectionId === section.id);
  if (!mapping) {
    missingCount++;
    console.error(`❌ no startSectionRecipeMap entry for section "${section.id}"`);
    return;
  }
  const primaryId = mapping.primaryRecipeIds[0];
  const primary = primaryId ? getDirectorRecipeById(primaryId) : undefined;
  if (!primary) {
    missingCount++;
    console.error(`❌ primary recipe "${primaryId}" (section "${section.id}") not found in directorRecipeCatalog`);
    return;
  }

  const alternates = mapping.alternateRecipeIds
    .map((id) => getDirectorRecipeById(id))
    .filter((r): r is DirectorRecipe => Boolean(r));

  rows.push({
    order: index + 1,
    sectionId: section.id,
    sectionLabel: section.label,
    markerStart: mmss(section.referenceStartSec),
    markerEnd: mmss(section.referenceEndSec),
    durationSec: section.referenceEndSec - section.referenceStartSec,
    energy: mapping.energy,
    density: mapping.density,
    primaryRecipeId: primary.id,
    primaryRecipeLabel: primary.label,
    primaryRecipeCategory: primary.category,
    motionPresetIds: primary.motionPresetIds.join(' / '),
    sourceType: primary.sourceType,
    durationFramesRange: `${primary.durationFrames[0]}-${primary.durationFrames[1]}f @${fps}fps`,
    durationSecRange: `${framesToSec(primary.durationFrames[0])}s-${framesToSec(primary.durationFrames[1])}s`,
    intensity: primary.intensity.join('/'),
    transitionGrammar: primary.transitionGrammar,
    beatBehavior: primary.beatBehavior,
    alternateRecipeIds: alternates.map((r) => r.id).join(' / ') || '(none)',
    avoidRecipeIds: mapping.avoidRecipeIds.map((a) => `${a.recipeId} (${a.reason})`).join(' | ') || '(none)',
    photoHoldSeconds: mapping.photoHoldSeconds,
    graphicDensityPolicy: mapping.graphicDensityPolicy,
    typographyLevel: mapping.typographyLevel,
    threeHitPolicy: mapping.threeHitPolicy ?? '(n/a)',
    notes: mapping.notes,
  });
});

if (missingCount > 0) {
  console.error(`export-palmier-recipe-handoff: ${missingCount} section(s) could not be resolved. Aborting export.`);
  process.exit(1);
}

// --- CSV ---------------------------------------------------------------------------------
const csvHeader = [
  'order', 'section_id', 'section_label', 'marker_start', 'marker_end', 'duration_sec',
  'energy', 'density', 'primary_recipe_id', 'primary_recipe_label', 'primary_recipe_category',
  'motion_preset_ids', 'source_type', 'duration_frames_range', 'duration_sec_range', 'intensity',
  'transition_grammar', 'beat_behavior', 'alternate_recipe_ids', 'avoid_recipe_ids',
  'photo_hold_seconds', 'graphic_density_policy', 'typography_level', 'three_hit_policy', 'notes',
];
const csvLines = [csvHeader.join(',')];
for (const r of rows) {
  csvLines.push([
    r.order, r.sectionId, r.sectionLabel, r.markerStart, r.markerEnd, r.durationSec,
    r.energy, r.density, r.primaryRecipeId, r.primaryRecipeLabel, r.primaryRecipeCategory,
    r.motionPresetIds, r.sourceType, r.durationFramesRange, r.durationSecRange, r.intensity,
    r.transitionGrammar, r.beatBehavior, r.alternateRecipeIds, r.avoidRecipeIds,
    r.photoHoldSeconds, r.graphicDensityPolicy, r.typographyLevel, r.threeHitPolicy, r.notes,
  ].map((v) => csvEscape(String(v))).join(','));
}
writeFileSync(join(outDir, 'director-recipe-section-handoff.csv'), `${csvLines.join('\n')}\n`);

// --- JSON ----------------------------------------------------------------------------------
writeFileSync(
  join(outDir, 'director-recipe-section-handoff.json'),
  `${JSON.stringify(
    {
      generatedFrom: [
        'movie-dashboard/src/data/directorRecipeCatalog.ts (Phase A)',
        'movie-dashboard/src/data/startSectionRecipeMap.ts (Phase E)',
        'movie-dashboard/src/data/startExtendedRhythmMap.ts',
      ],
      note: 'Reference/researched timing, not final. See startExtendedAuthority.timingState in startExtendedRhythmMap.ts. Not a Palmier project file; import by hand or via read-only MCP inspection.',
      songFacts: startExtendedSongFacts,
      sections: rows,
    },
    null,
    2,
  )}\n`,
);

// --- Markdown ------------------------------------------------------------------------------
const mdLines: string[] = [];
mdLines.push('# Palmier Director Recipe Section Handoff');
mdLines.push('');
mdLines.push('研究トラック（StaRt Extended Opening, Phase F）。Opening V1の正本ではない。');
mdLines.push('');
mdLines.push('生成元:');
mdLines.push('- `movie-dashboard/src/data/directorRecipeCatalog.ts`（Phase A, 97 recipes）');
mdLines.push('- `movie-dashboard/src/data/startSectionRecipeMap.ts`（Phase E, section⇄recipe mapping）');
mdLines.push('- `movie-dashboard/src/data/startExtendedRhythmMap.ts`（section timing, researched-reference-not-final）');
mdLines.push('');
mdLines.push('タイミングは研究用reference。Final timelineはlocal音源の波形とMarkerで確定する。');
mdLines.push('');
mdLines.push('| # | Section | Marker | Dur(s) | Energy/Density | Primary Recipe | Motion Presets | Source | Duration | Transition | Alternates |');
mdLines.push('|---|---|---|---:|---|---|---|---|---|---|---|');
for (const r of rows) {
  mdLines.push(
    `| ${r.order} | ${r.sectionLabel} (\`${r.sectionId}\`) | ${r.markerStart}-${r.markerEnd} | ${r.durationSec} | ${r.energy}/${r.density} | \`${r.primaryRecipeId}\` ${r.primaryRecipeLabel} | ${r.motionPresetIds} | ${r.sourceType} | ${r.durationSecRange} | ${r.transitionGrammar} | ${r.alternateRecipeIds} |`,
  );
}
mdLines.push('');
mdLines.push('## Section詳細（Primary recipeのbuildPalmierRecipeHandoff() + section policy）');
mdLines.push('');
for (const r of rows) {
  const primary = getDirectorRecipeById(r.primaryRecipeId)!;
  mdLines.push(`### ${r.order}. ${r.sectionLabel} (\`${r.sectionId}\`) — ${r.markerStart}-${r.markerEnd}`);
  mdLines.push('');
  mdLines.push('```text');
  mdLines.push(buildPalmierRecipeHandoff(primary));
  mdLines.push('```');
  mdLines.push('');
  mdLines.push(`- alternate recipes: ${r.alternateRecipeIds}`);
  mdLines.push(`- avoid in this section: ${r.avoidRecipeIds}`);
  mdLines.push(`- photo hold: ${r.photoHoldSeconds}`);
  mdLines.push(`- graphic density (190bpm micro accent): ${r.graphicDensityPolicy}`);
  mdLines.push(`- typography level: ${r.typographyLevel}`);
  mdLines.push(`- three-hit policy: ${r.threeHitPolicy}`);
  mdLines.push(`- section notes: ${r.notes}`);
  mdLines.push('');
}
writeFileSync(join(outDir, 'director-recipe-section-handoff.md'), `${mdLines.join('\n')}\n`);

console.log(`export-palmier-recipe-handoff: wrote ${rows.length} section rows to exports/palmier/ (csv/md/json).`);
