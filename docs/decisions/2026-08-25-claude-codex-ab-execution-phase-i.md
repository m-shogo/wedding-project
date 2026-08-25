# Phase I — Claude/Codex A/B: actual execution of the Claude lane

Date: 2026-08-25
Status: Claude lane complete. Codex lane attempted with Codex CLI (`codex-cli 0.144.1`); see
outcome recorded in `movie-dashboard/src/data/startClaudeCodexAB.ts` `codexCandidate` field —
this document does not restate that outcome so it can't go stale if a later run replaces it.

Scope: this is Phase I of the Phase G Claude/Codex A/B comparison framework — actually producing
both candidates' artifacts, not deciding a winner. `winner` stays `null`; that is a human decision
per the Phase G contract (`docs/handoff/2026-08-25-codex-ab-comparison-handoff.md` §6).

## What changed to make the Claude lane renderable

The Phase G framework (`startClaudeCodexAB.ts`) and Phase E section mapping
(`startSectionRecipeMap.ts`) already fully specified which recipes to use
(`start-chorus-hero-lift` for chorus-1-a, `start-triple-hit` for chorus-1-b) and their target
duration (300 frames / 10s each, from `startExtendedRhythmMap.ts`). What was missing was a way to
actually *render* that 20s slice: the existing Phase C reel infrastructure
(`placeRecipesSequentially()` / `DirectorRecipeReelBody`) places clips using each recipe's own
`resolveDirectorRecipeById()` duration, which `directorRecipeAdapter.ts`'s `clampDuration()` caps
at 180 frames — a reel-safety default sized for browsing all 97 recipes back-to-back, not for
honoring one specific StaRt Extended section's real reference length.

Rather than loosen that global clamp (which exists for a good reason across 97 recipes) or invent
a new one-off visual component (explicitly disallowed by the handoff brief), three small additions
were made, all reusing the existing shared-engine pipeline unchanged:

1. `motion-studio/src/motion-kit/directorRecipeReelSelections.ts` —
   `placeRecipesWithDurations(items: {id, durationInFrames}[])`, a pure function alongside the
   existing `placeRecipesSequentially()`, taking an *explicit* duration per clip instead of each
   recipe's resolved one.
2. `motion-studio/src/compositions/common/DirectorRecipeReel.tsx` — `DirectorRecipeCustomReel`,
   the `.tsx` counterpart: identical to `DirectorRecipeReelBody` except it consumes
   `placeRecipesWithDurations()` output. Still just `Sequence` + the existing
   `DirectorRecipePreview` — no new engine, no new visual.
3. `motion-studio/src/data/startAbChorus1Timeline.ts` — derives the Claude lane's timeline
   directly from the three existing sources of truth (`startClaudeCodexAB.ts` target section ids,
   `startSectionRecipeMap.ts` primary recipe, `startExtendedRhythmMap.ts` section duration) instead
   of hardcoding a second copy of that mapping.

A new `StartAbClaudeChorus1` Composition (600 frames / 20.00s @ 1920x1080/30fps, confirmed via
`pnpm exec remotion compositions src/index-director-recipes.ts`) was registered in
`DirectorRecipeRoot.tsx`, reusing the exact same registration pattern as the Phase C reels/
comparisons already there.

### Editorial deviation, stated per the handoff brief's requirement to document any

Each section uses only its **first-ranked** primary recipe (not all three `primaryRecipeIds`),
held for the section's full real 10s rather than the clamped duration. Both
`start-chorus-hero-lift` and `start-triple-hit` are, by their own `editGrammar`, a "hold the Hero"
grammar (a static/locked lift, then a maintained-Hero 3-hit accent) — extending their `Sequence`
past the 180-frame clamp does not invent new motion, it holds the settled state for the section's
remaining runtime, which is literally what the brief's own words describe: "Hero写真の提示
(chorus-1-a)からHero維持のまま3-hit(chorus-1-b)へ". Using all three primary recipes concatenated
per section was considered and rejected — it would triple the section length and break the fixed
00:38-00:58 target window this comparison exists to test.

## Render result (Claude lane)

```text
Composition: StartAbClaudeChorus1
Command: pnpm exec remotion render src/index-director-recipes.ts StartAbClaudeChorus1 \
  motion-studio/out/palmier-ab/claude/chorus1_ab.mp4 --scale=0.667 --crf=30
Output (copied to a non-gitignored path for commit): motion-studio/exports/ab/claude/chorus1_ab.mp4
Resolution: 1280x720 (0.667 scale of the 1920x1080 Composition)
Duration: 20.05s (ffprobe), 600 frames @ 30fps
Codec: h264 (video) / aac (audio, silent — no source audio wired in this research composition)
Size: 935.7 kB (935,654 bytes)
```

Visual QA (stills pulled with ffmpeg at t=1s, t=9s, t=12s, t=18s): chorus-1-a shows the
`DirectorRecipePreview` placeholder/demo backdrop (navy gradient, "StaRt Chorus Hero Lift" label,
"REAL PHOTO / VIDEO SLOT (placeholder)" marker — expected, no real Hero photo exists yet,
MEDIA_BLOCKED per repo state) with the `type-word-punch` title layer active; chorus-1-b shows the
`accent-speed-lines` / `wipe-route-line` graphic-hit layers firing over a warm color-field flash,
confirming the 3-hit accent grammar is actually executing through the shared engine, not just
resolving without error.

## Why this doesn't touch Opening V1

Nothing in this change touches `motion-studio/src/compositions/opening/`,
`motion-studio/src/data/openingV1*.ts`, or `motion-studio/src/OpeningV1Root.tsx`. All new files
live under the existing Director Recipe Renderer / Phase G research-track paths
(`src/motion-kit/`, `src/compositions/common/`, `src/data/startAbChorus1Timeline.ts`,
`src/DirectorRecipeRoot.tsx`). `pnpm check` (all sub-checks, including the pre-existing Opening V1
contract checks) and `pnpm typecheck` both stayed green after this change; `movie-dashboard`'s
`pnpm build` was also re-verified green since `startClaudeCodexAB.ts` (a movie-dashboard data
file) was edited.

## Related

- `docs/handoff/2026-08-25-codex-ab-comparison-handoff.md` — the brief both lanes work from.
- `docs/decisions/2026-08-25-claude-codex-ab-framework.md` — Phase G framework design (winner-null
  contract, why AI never decides a winner).
- `motion-studio/src/data/startAbChorus1Timeline.ts` — source-derived timeline, full reasoning in
  its header comment.
