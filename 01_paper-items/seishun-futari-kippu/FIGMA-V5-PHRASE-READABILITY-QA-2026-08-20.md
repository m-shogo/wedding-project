# 青春ふたりきっぷ V5 — phrase actual-size readability QA

Date: 2026-08-20
State: `VERIFIED_LOCAL / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PHRASE_ACTUAL_SIZE_READABILITY_HARDENED / LEGACY_PRESERVED / NOT_PRINT_READY`

## Live authority

- latest `main` immediately before the Figma write: `2eed57ea65adbda2219e5b34f0a943613048c9d7`
- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file: `v7rIRHv8YKQXG0LYD0I5OA`
- selected V5: `52:25 / V5 / ARCHIVAL JOURNEY COUPON / 720x250`
- exact Drive authority: `1XpuRqck_yDmWI6NhwZFWkvxpS6mqH29J / 04_青春18きっぷ風_ミンティア用シール`

Drive metadata was read back live before the Figma write. Drive writes: `0`.

## Visible problem

Fresh native `720×250` screenshot review found that the main title, route and date seal remained strong, but the fixed reader-facing phrase `旅のはじまりは、あなたと。` was only `13px` and materially weaker than the semantic role warrants at actual-size/detail review.

This is fixed authoritative copy, not internal metadata. Removing it was previously tested and rejected because the lower-left field became too empty; therefore the correct bounded question was readability, not subtraction.

## Bounded comparison

A separate comparison clone was created without changing selected production:

- `64:2 / QA / V5 PHRASE READABILITY 15PX / 2026-08-20`
- only `TEXT / PHRASE` changed `13 → 15px`;
- title, route, issue number, date seal, print bands, crop cues and all other geometry remained unchanged.

Native `720×250` comparison screenshot: PASS. The phrase became readable without competing with the 34px title or 15px route hierarchy.

## Adoption / rollback

Before selected mutation, the original selected root was preserved as hidden rollback:

- `64:24 / ROLLBACK / V5 PRE PHRASE READABILITY / 2026-08-20`

Adopted on selected root `52:25`:

- `52:40 / TEXT / PHRASE`: `13 → 15px`.

The comparison root was hidden after adoption. Retained production, V4 study and previous V5 history were not changed or deleted.

## QA

Fresh selected screenshots:

- whole / thumbnail: PASS;
- reading scale: PASS;
- native `720×250` actual-size/detail: PASS.

Structural readback:

- visible native text: `9`;
- visible text outside selected root: `0`;
- text-to-text bounding-box collisions: `0`;
- IMAGE fills: `0`;
- adopted phrase: `15px`, `360×24` native text role.

## Hybrid / asset state

- all authoritative copy remains native editable Figma text;
- fixed print graphics remain editable vector roles;
- generated imagery added: `0`;
- IMAGE fills added: `0`;
- Drive writes: `0`.

## Decision

`VERIFIED_LOCAL / PHRASE_ACTUAL_SIZE_READABILITY_HARDENED`.

The selected clean-room V5 remains the current `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS` direction. This run did not introduce a new visual grammar; it strengthened one meaningful fixed reader-facing line at actual size while preserving the existing hierarchy and rollback history.

This is a local application of the already established non-Rurubu actual-size secondary-reader-copy QA principle; no new shared-learning entry is required.
