# Rurubu WEDDING V6 — Y + CP/CQ chronology QA

Date: 2026-08-17
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`

## Result

Preferred set after this experiment:

- Outer Y `1542:2` — unchanged;
- Profile / Q&A CP `1567:18` — unchanged;
- Story / chronology CQ `1569:2` — promoted from rollback-safe comparison;
- previous chronology CO `1566:2` — hidden rollback.

Start Here live readback after promotion:

`V5 FU/FX · V6 Y + CP/CQ INSIDE STUDIES · V7 HOLD`

V7 and all non-Rurubu items were not edited.

## Observed problem

CO had already separated major photographic events from minor notes, but two visual inconsistencies remained:

1. Event 01 and Event 05 bound their native date/title/copy directly to their photos, while Event 03 placed the photo and its native copy in separate areas. At whole-item scale this made Event 03 feel like an inserted image plus a detached label rather than one editorial beat.
2. Event 02 / 04 occupied the left texture rail but lacked an explicit editorial role, so the rail could still read as leftover pale space with two loose chronology entries.

## Root-cause hypothesis

A travel-magazine chronology reads more coherently when each major photographic milestone is a single photo+copy beat, while secondary milestones share one intentionally labeled supporting rail. The hierarchy should be carried by role binding and spatial reading order rather than by adding more cards, badges or generated decoration.

## Bounded test

A rollback-safe clone of CO was created as CQ `1569:2`.

Changes were limited to chronology page `1569:27`:

- Event 03 replaceable photo remained the same verified image role and source hash;
- Event 03 native number/date/title/copy were moved onto the dark lower-left portion of its photograph;
- no wording was rasterized;
- Event 02 / 04 remained native text on the existing composed texture rail;
- one native editorial label `寄り道メモ / 02・04` was added to clarify that left rail's role;
- no new card, shadow, gradient, external asset, Drive asset or generated image was added;
- Event 01, Event 05 and the WEDDING terminal were preserved.

The first CQ pass was **not accepted**: Event 03 title/copy fell behind Event 05 due to z-order/vertical overlap. Event 03 copy was moved to the upper portion of its own photo and rechecked.

The second pass was also **not accepted immediately**: structure QA detected a 6px overlap between Event 03 number and date. The date was moved right and QA rerun.

## Three-scale visual evidence

- whole Story/chronology spread, 500px: PASS and stronger than CO;
- reading spread, ~1000px: PASS;
- chronology actual-size `1569:27` = `794×1123`: PASS.

Visible result:

- Event 03 now reads as one photographic milestone like Event 01 / 05;
- Event 02 / 04 read as intentional secondary `寄り道メモ` rather than loose fields;
- photo hierarchy remains asymmetric;
- WEDDING remains the strong terminal beat;
- no additional UI-like card system was introduced.

## Structure / safe-area QA

Final CQ chronology:

- visible native text: `31`;
- same-page absolute text collisions: `0`;
- 18px text safe-area risks: `0`;
- visible text overflow outside page: `0`.

Visible image roles and intrinsic checks:

- timeline composed texture `226×506` ≤ source `720×860`, hash `691a6ceed471a5d8efa144052a10564eed177b4f`;
- top hero `801×430` ≤ source `944×608`, hash `e3738476f760932bb5b09c9d60f174dd6c84049d`;
- Event 03 `345×230` ≤ source `352×368`, hash `439a719d73f28e8dd2889f2026cccb15f345ec63`;
- Event 01 `455×218` ≤ source `1356×560`, hash `539c259be8036b481d06b4f76db9a39b407d90e8`;
- Event 05 `455×154` ≤ source `732×498`, hash `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`.

Photo image hashes changed: `0`.
Replaceable photo semantics preserved: `YES`.
Native variable/factual copy preserved: `YES`.
Rollback preserved: `YES`.

## Drive readback

V6 root was re-read live:

- `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

No new Drive save was required.
Existing generated section masters remain unadopted.

## Asset lifecycle truth

- newly generated assets: `0`;
- newly adopted generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new raster bytes: `0`;
- existing photo roles recomposed: `YES`;
- native text changed/added: `YES`;
- visually verified: `YES`;
- structurally verified: `YES`.

## Status

`CQ = VERIFIED_LOCAL / PREFERRED / ROLLBACK_SAFE / NOT_PRINT_READY`.

This is not V6 completion. Final legitimate photography, final personal copy, exact print template, PDF preflight and physical proof remain separate gates.
