// pnpm export:claude-codex-ab-handoff
//
// Phase G — Claude / Codex A/B comparison framework for the StaRt Extended production
// foundation. Opening authority is defined by ../docs/opening-authority.md; Short implementation
// remains in motion-studio/src/data/openingV1.ts / OpeningV1.tsx.
//
// Writes two separate, symmetric handoff packs — one per agent lane — so Claude Code and Codex
// CLI/agent can each build the SAME 20s slice (chorus-1-a + chorus-1-b, 00:38-00:58) from the
// same source data without reading or copying from each other's output directory:
//
//   exports/palmier-ab/claude/director-recipe-ab-handoff.{csv,md,json}   (project: START_AB_CLAUDE)
//   exports/palmier-ab/codex/director-recipe-ab-handoff.{csv,md,json}   (project: START_AB_CODEX)
//
// Input (single source of truth, read-only, not copied):
//   movie-dashboard/src/data/directorRecipeCatalog.ts       Phase A — 97 recipes
//   movie-dashboard/src/data/startSectionRecipeMap.ts       Phase E — section -> primary/alternate/avoid
//   movie-dashboard/src/data/startExtendedRhythmMap.ts      section timing
//   movie-dashboard/src/data/startClaudeCodexAB.ts          Phase G — comparison shape, target section ids
//
// This is a human/agent-readable handoff pack, not a Palmier project file. It does not write to
// any running Palmier project (same read-only stance as Phase F — see
// docs/decisions/2026-08-25-director-recipe-palmier-davinci-handoff.md).

import {mkdirSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {getDirectorRecipeById, buildPalmierRecipeHandoff, type DirectorRecipe} from '../../movie-dashboard/src/data/directorRecipeCatalog.ts';
import {startSectionRecipeMap} from '../../movie-dashboard/src/data/startSectionRecipeMap.ts';
import {
  startExtendedAuthority,
  startExtendedResearchHypotheses,
  startExtendedSections,
} from '../../movie-dashboard/src/data/startExtendedRhythmMap.ts';
import {startAbComparisons, startAbAxes, type StartAbCandidate} from '../../movie-dashboard/src/data/startClaudeCodexAB.ts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');

const csvEscape = (v: string): string => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);
const fps = 30;
const framesToSec = (f: number) => (f / fps).toFixed(2);
const mmss = (sec: number): string => {
  const m = Math.floor(sec / 60);
  const s = Math.round(sec % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

const comparison = startAbComparisons.find((c) => c.id === 'ab-chorus1-full');
if (!comparison) {
  console.error('export-claude-codex-ab-handoff: comparison "ab-chorus1-full" not found in startClaudeCodexAB.ts. Aborting.');
  process.exit(1);
}

const sections = startExtendedSections.filter((s) => comparison.targetSectionIds.includes(s.id));
if (sections.length !== comparison.targetSectionIds.length) {
  console.error(
    `export-claude-codex-ab-handoff: expected ${comparison.targetSectionIds.length} sections (${comparison.targetSectionIds.join(', ')}), resolved ${sections.length}.`,
  );
  process.exit(1);
}

interface Row {
  order: number;
  sectionId: string;
  sectionLabel: string;
  markerStart: string;
  markerEnd: string;
  durationSec: number;
  energy: string;
  density: string;
  primary: DirectorRecipe;
  alternates: DirectorRecipe[];
  avoid: string;
  photoHoldSeconds: string;
  graphicDensityPolicy: string;
  typographyLevel: string;
  threeHitPolicy: string;
  notes: string;
}

let missing = 0;
const rows: Row[] = [];
sections.forEach((section, index) => {
  const mapping = startSectionRecipeMap.find((m) => m.sectionId === section.id);
  if (!mapping) {
    missing++;
    console.error(`❌ no startSectionRecipeMap entry for section "${section.id}"`);
    return;
  }
  const primary = getDirectorRecipeById(mapping.primaryRecipeIds[0]);
  if (!primary) {
    missing++;
    console.error(`❌ primary recipe "${mapping.primaryRecipeIds[0]}" (section "${section.id}") not found.`);
    return;
  }
  const alternates = mapping.alternateRecipeIds.map((id) => getDirectorRecipeById(id)).filter((r): r is DirectorRecipe => Boolean(r));
  rows.push({
    order: index + 1,
    sectionId: section.id,
    sectionLabel: section.label,
    markerStart: mmss(section.referenceStartSec),
    markerEnd: mmss(section.referenceEndSec),
    durationSec: section.referenceEndSec - section.referenceStartSec,
    energy: mapping.energy,
    density: mapping.density,
    primary,
    alternates,
    avoid: mapping.avoidRecipeIds.map((a) => `${a.recipeId} (${a.reason})`).join(' | ') || '(none)',
    photoHoldSeconds: mapping.photoHoldSeconds,
    graphicDensityPolicy: mapping.graphicDensityPolicy,
    typographyLevel: mapping.typographyLevel,
    threeHitPolicy: mapping.threeHitPolicy ?? '(n/a)',
    notes: mapping.notes,
  });
});

if (missing > 0) {
  console.error(`export-claude-codex-ab-handoff: ${missing} section(s) unresolved. Aborting export.`);
  process.exit(1);
}

function writeLaneHandoff(candidate: StartAbCandidate, agentLabel: string) {
  const outDir = join(studioRoot, dirname(candidate.handoffPath.replace(/^motion-studio\//, '')));
  mkdirSync(outDir, {recursive: true});

  // --- CSV ---
  const csvHeader = [
    'order', 'audio_state', 'timing_state', 'section_id', 'section_label', 'marker_start', 'marker_end', 'duration_sec',
    'energy', 'density', 'primary_recipe_id', 'primary_recipe_label', 'primary_recipe_category',
    'motion_preset_ids', 'source_type', 'duration_sec_range', 'transition_grammar', 'beat_behavior',
    'alternate_recipe_ids', 'avoid_recipe_ids', 'photo_hold_seconds', 'graphic_density_policy',
    'typography_level', 'three_hit_policy', 'notes',
  ];
  const csvLines = [csvHeader.join(',')];
  for (const r of rows) {
    csvLines.push([
      r.order, startExtendedAuthority.audioState, startExtendedAuthority.timingState,
      r.sectionId, r.sectionLabel, r.markerStart, r.markerEnd, r.durationSec,
      r.energy, r.density, r.primary.id, r.primary.label, r.primary.category,
      r.primary.motionPresetIds.join(' / '), r.primary.sourceType,
      `${framesToSec(r.primary.durationFrames[0])}s-${framesToSec(r.primary.durationFrames[1])}s`,
      r.primary.transitionGrammar, r.primary.beatBehavior,
      r.alternates.map((a) => a.id).join(' / ') || '(none)', r.avoid,
      r.photoHoldSeconds, r.graphicDensityPolicy, r.typographyLevel, r.threeHitPolicy, r.notes,
    ].map((v) => csvEscape(String(v))).join(','));
  }
  writeFileSync(join(outDir, 'director-recipe-ab-handoff.csv'), `${csvLines.join('\n')}\n`);

  // --- JSON ---
  writeFileSync(
    join(outDir, 'director-recipe-ab-handoff.json'),
    `${JSON.stringify(
      {
        phase: 'G',
        agentLane: candidate.agent,
        palmierProjectName: candidate.projectName,
        comparisonId: comparison.id,
        targetStartSec: comparison.targetStartSec,
        targetEndSec: comparison.targetEndSec,
        brief: comparison.brief,
        generatedFrom: [
          'movie-dashboard/src/data/directorRecipeCatalog.ts (Phase A)',
          'movie-dashboard/src/data/startSectionRecipeMap.ts (Phase E)',
          'movie-dashboard/src/data/startExtendedRhythmMap.ts',
          'movie-dashboard/src/data/startClaudeCodexAB.ts (Phase G)',
        ],
        note: 'Reference/researched timing, not final. This lane is independent of the other agent\'s lane — do not read the other lane\'s output directory while building this one.',
        authority: startExtendedAuthority,
        researchHypotheses: startExtendedResearchHypotheses,
        evaluationAxes: startAbAxes.map((a) => ({id: a.id, label: a.label, labelJa: a.labelJa, direction: a.direction})),
        sections: rows.map((r) => ({...r, primary: undefined, alternates: undefined, primaryRecipeId: r.primary.id, alternateRecipeIds: r.alternates.map((a) => a.id)})),
      },
      null,
      2,
    )}\n`,
  );

  // --- Markdown ---
  const md: string[] = [];
  md.push(`# StaRt A/B Handoff — ${agentLabel} lane`);
  md.push('');
  md.push(`Palmier / project name for this lane: \`${candidate.projectName}\``);
  md.push('');
  md.push('StaRt Extended Candidateの独立A/B制作handoff。Opening全体のauthorityは`docs/opening-authority.md`。');
  md.push('');
  md.push('> **AUDIO_BLOCKED:** 以下のmarker・tempo・holdは研究用仮説。権利確認済みlocal音源の波形とMarkerで再確定するまでFinal timingとして使わない。');
  md.push('');
  md.push(`**このファイルは ${agentLabel} 専用レーン。もう一方のレーンの出力ディレクトリは読まない・参照しないこと。**`);
  md.push('');
  md.push(`## 対象区間: ${mmss(comparison.targetStartSec)}-${mmss(comparison.targetEndSec)} (${comparison.targetEndSec - comparison.targetStartSec}秒)`);
  md.push('');
  md.push(comparison.brief);
  md.push('');
  md.push('生成元:');
  md.push('- `movie-dashboard/src/data/directorRecipeCatalog.ts`（Phase A, 97 recipes）');
  md.push('- `movie-dashboard/src/data/startSectionRecipeMap.ts`（Phase E, section⇄recipe mapping）');
  md.push('- `movie-dashboard/src/data/startExtendedRhythmMap.ts`（section timing, researched-reference-not-final）');
  md.push('- `movie-dashboard/src/data/startClaudeCodexAB.ts`（Phase G, comparison shape + 12 evaluation axes）');
  md.push('');
  md.push('タイミングは研究用reference。Final timelineはlocal音源の波形とMarkerで確定する。');
  md.push('');
  md.push('| # | Section | Marker | Dur(s) | Energy/Density | Primary Recipe | Motion Presets | Duration | Transition | Alternates |');
  md.push('|---|---|---|---:|---|---|---|---|---|---|');
  for (const r of rows) {
    md.push(
      `| ${r.order} | ${r.sectionLabel} (\`${r.sectionId}\`) | ${r.markerStart}-${r.markerEnd} | ${r.durationSec} | ${r.energy}/${r.density} | \`${r.primary.id}\` ${r.primary.label} | ${r.primary.motionPresetIds.join(' / ')} | ${framesToSec(r.primary.durationFrames[0])}s-${framesToSec(r.primary.durationFrames[1])}s | ${r.primary.transitionGrammar} | ${r.alternates.map((a) => a.id).join(' / ') || '(none)'} |`,
    );
  }
  md.push('');
  md.push('## Section詳細（Primary recipeのbuildPalmierRecipeHandoff() + section policy）');
  md.push('');
  for (const r of rows) {
    md.push(`### ${r.order}. ${r.sectionLabel} (\`${r.sectionId}\`) — ${r.markerStart}-${r.markerEnd}`);
    md.push('');
    md.push('```text');
    md.push(buildPalmierRecipeHandoff(r.primary));
    md.push('```');
    md.push('');
    md.push(`- alternate recipes: ${r.alternates.map((a) => a.id).join(' / ') || '(none)'}`);
    md.push(`- avoid in this section: ${r.avoid}`);
    md.push(`- photo hold: ${r.photoHoldSeconds}`);
    md.push(`- graphic density (190bpm micro accent): ${r.graphicDensityPolicy}`);
    md.push(`- typography level: ${r.typographyLevel}`);
    md.push(`- three-hit policy: ${r.threeHitPolicy}`);
    md.push(`- section notes: ${r.notes}`);
    md.push('');
  }
  md.push('## 評価軸（12項目、docs/handoff/2026-08-25-codex-ab-comparison-handoff.md 参照）');
  md.push('');
  for (const axis of startAbAxes) {
    md.push(`- **${axis.label} / ${axis.labelJa}** (${axis.direction}): ${axis.summary}`);
  }
  md.push('');
  md.push('## 完成後にやること');
  md.push('');
  md.push(`1. 実際に render/export した artifact のrepo相対パスを控える（例: \`out/palmier-ab/${candidate.agent}/chorus1_ab.mp4\`）。`);
  md.push('2. `movie-dashboard/src/data/startClaudeCodexAB.ts` の対応する `artifactPath` を、実在するファイルのパスに更新する（AIが自動でwinnerを決めない）。');
  md.push('3. `pnpm check:claude-codex-ab` を実行し、artifactPath整合を確認する。');
  md.push('4. 人間が両方のartifactを実際に見て、12項目のscoreとwinnerを埋める。');
  writeFileSync(join(outDir, 'director-recipe-ab-handoff.md'), `${md.join('\n')}\n`);
}

writeLaneHandoff(comparison.claudeCandidate, 'Claude Code');
writeLaneHandoff(comparison.codexCandidate, 'Codex CLI/agent');

console.log(
  `export-claude-codex-ab-handoff: wrote ${rows.length} section rows x 2 lanes to ` +
    `${dirname(comparison.claudeCandidate.handoffPath.replace(/^motion-studio\//, ''))} and ` +
    `${dirname(comparison.codexCandidate.handoffPath.replace(/^motion-studio\//, ''))} (csv/md/json each).`,
);
