// pnpm check:claude-codex-ab
//
// Phase G — Claude / Codex A/B comparison framework contract check.
//
// Verifies, mechanically, the one rule this whole framework depends on:
//   winner is non-null  =>  the artifactPath(s) it depends on actually exist on disk.
// Nothing may claim a winner for work that was never produced. This is separate from
// validateStartAbComparisonShape() in startClaudeCodexAB.ts (pure data-shape checks, no fs
// access, usable from browser code) — this script adds the filesystem half.
//
// Also checks:
//   - exactly 12 evaluation axes, unique ids, 5-point rubric each
//   - every comparison has one score row per axis (nulls allowed)
//   - claude/codex lanes use distinct project names and distinct handoff paths

import {existsSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {startAbAxes, startAbComparisons, validateStartAbComparisonShape} from '../../movie-dashboard/src/data/startClaudeCodexAB.ts';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

let errors = 0;
const err = (msg: string) => {
  errors++;
  console.error(`❌ ${msg}`);
};
const ok = (msg: string) => console.log(`✅ ${msg}`);

// --- axes ------------------------------------------------------------------------------------
if (startAbAxes.length !== 12) {
  err(`expected exactly 12 evaluation axes, found ${startAbAxes.length}.`);
} else {
  ok('12 evaluation axes defined.');
}

const axisIds = new Set<string>();
for (const axis of startAbAxes) {
  if (axisIds.has(axis.id)) err(`duplicate axis id "${axis.id}".`);
  axisIds.add(axis.id);
  if (axis.rubric.length !== 5) err(`axis "${axis.id}" rubric has ${axis.rubric.length} levels, expected 5.`);
  const scores = axis.rubric.map((r) => r.score).sort();
  if (scores.join(',') !== '1,2,3,4,5') err(`axis "${axis.id}" rubric scores are not exactly 1..5 (got ${scores.join(',')}).`);
  for (const level of axis.rubric) {
    if (!level.description.trim()) err(`axis "${axis.id}" rubric level ${level.score} has an empty description.`);
  }
}

// --- comparisons -------------------------------------------------------------------------------
if (startAbComparisons.length === 0) {
  err('startAbComparisons is empty — Phase G expects at least the seed chorus-1 comparison.');
}

for (const comparison of startAbComparisons) {
  for (const issue of validateStartAbComparisonShape(comparison)) {
    err(`[${issue.comparisonId}] ${issue.message}`);
  }

  // Filesystem half of the winner contract: this is the part validateStartAbComparisonShape()
  // (a pure, fs-free function reusable from movie-dashboard browser code) cannot do itself.
  const checkArtifact = (label: string, path: string | null) => {
    if (path === null) return;
    const abs = join(repoRoot, path);
    if (!existsSync(abs)) {
      err(`[${comparison.id}] ${label}.artifactPath is set to "${path}" but that file does not exist on disk. Never point a winner at work that wasn't produced.`);
    }
  };
  checkArtifact('claudeCandidate', comparison.claudeCandidate.artifactPath);
  checkArtifact('codexCandidate', comparison.codexCandidate.artifactPath);

  if (comparison.winner !== null) {
    console.log(`ℹ️  [${comparison.id}] winner=${comparison.winner} decided by ${comparison.decidedBy ?? '(unknown)'} at ${comparison.decidedAt ?? '(unknown)'}`);
  } else {
    ok(`[${comparison.id}] winner is still null (expected — no human decision recorded yet).`);
  }

  // Handoff pack existence is informational, not fatal: it's fine to define a comparison before
  // running `pnpm export:claude-codex-ab-handoff`, but warn so it's not forgotten.
  for (const candidate of [comparison.claudeCandidate, comparison.codexCandidate]) {
    const abs = join(repoRoot, candidate.handoffPath);
    if (!existsSync(abs)) {
      console.warn(`⚠️  [${comparison.id}] ${candidate.agent} handoff pack not found at ${candidate.handoffPath}. Run: pnpm export:claude-codex-ab-handoff`);
    }
  }
}

if (errors > 0) {
  console.error(`check-claude-codex-ab: ${errors} error(s).`);
  process.exit(1);
}
console.log('check-claude-codex-ab: all checks passed.');
