// pnpm check:claude-codex-ab
//
// Phase G/I — Claude / Codex A/B comparison framework contract check.
//
// Generated review media must NOT be committed to Git. Candidate artifactPath values are allowed
// to describe the expected local/CI output location while winner is still null. A missing file is
// therefore only a warning during an undecided research run.
//
// Hard rule:
//   winner is non-null  =>  both artifacts must exist on disk and every score row must contain
//   both values or an explicit N/A reason. CI must render/download both artifacts first.
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

if (startAbComparisons.length === 0) {
  err('startAbComparisons is empty — Phase G expects at least the seed chorus-1 comparison.');
}

for (const comparison of startAbComparisons) {
  for (const issue of validateStartAbComparisonShape(comparison)) {
    err(`[${issue.comparisonId}] ${issue.message}`);
  }

  const artifactExists = (path: string | null) => path !== null && existsSync(join(repoRoot, path));
  const warnMissingExpectedArtifact = (label: string, path: string | null) => {
    if (path !== null && !artifactExists(path)) {
      console.warn(
        `⚠️  [${comparison.id}] ${label}.artifactPath describes expected review output "${path}", ` +
          'but it is not present in this checkout. This is allowed while winner=null; render or download the CI artifact before human scoring.',
      );
    }
  };

  warnMissingExpectedArtifact('claudeCandidate', comparison.claudeCandidate.artifactPath);
  warnMissingExpectedArtifact('codexCandidate', comparison.codexCandidate.artifactPath);

  if (comparison.winner !== null) {
    for (const candidate of [comparison.claudeCandidate, comparison.codexCandidate]) {
      if (!artifactExists(candidate.artifactPath)) {
        err(
          `[${comparison.id}] winner=${comparison.winner} requires ${candidate.agent} review media, ` +
            `but artifactPath=${candidate.artifactPath ?? 'null'} is not present. Never record a winner without reviewable media.`,
        );
      }
    }
    console.log(`ℹ️  [${comparison.id}] winner=${comparison.winner} decided by ${comparison.decidedBy ?? '(unknown)'} at ${comparison.decidedAt ?? '(unknown)'}`);
  } else {
    ok(`[${comparison.id}] winner is still null (expected — no human decision recorded yet).`);
  }

  for (const candidate of [comparison.claudeCandidate, comparison.codexCandidate]) {
    const abs = join(repoRoot, candidate.handoffPath);
    if (!existsSync(abs)) {
      console.warn(`⚠️  [${comparison.id}] ${candidate.agent} handoff pack not found at ${candidate.handoffPath}. Run: pnpm export:claude-codex-ab-handoff`);
    }
  }
}

// Negative contract probes: the checked-in seed is intentionally undecided, so these mutations
// prove that a future winner cannot bypass the two-artifact and complete-score requirements.
const seed = startAbComparisons[0];
if (seed) {
  const decidedBase = {
    ...seed,
    winner: 'claude' as const,
    decidedBy: 'contract-probe',
    decidedAt: '2026-08-25',
    scores: seed.scores.map((row) => ({...row, claude: 3 as const, codex: 3 as const})),
  };
  const missingOpponent = validateStartAbComparisonShape({
    ...decidedBase,
    claudeCandidate: {...seed.claudeCandidate, artifactPath: 'out/claude.mp4'},
    codexCandidate: {...seed.codexCandidate, artifactPath: null},
  });
  if (!missingOpponent.some((issue) => issue.message.includes('codexCandidate.artifactPath'))) {
    err('negative probe failed: a winner with only one artifact was accepted.');
  }

  const incompleteScores = validateStartAbComparisonShape({
    ...decidedBase,
    claudeCandidate: {...seed.claudeCandidate, artifactPath: 'out/claude.mp4'},
    codexCandidate: {...seed.codexCandidate, artifactPath: 'out/codex.mp4'},
    scores: seed.scores.map((row) => ({...row, comment: ''})),
  });
  if (!incompleteScores.some((issue) => issue.message.includes('score row'))) {
    err('negative probe failed: a winner with incomplete scores was accepted.');
  }
}

if (errors > 0) {
  console.error(`check-claude-codex-ab: ${errors} error(s).`);
  process.exit(1);
}
console.log('check-claude-codex-ab: all checks passed.');
