# ADD-01 ウェルカムボード — QA

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LEGACY_PRODUCTION_RETAINED / CLEANROOM_V3_CANDIDATE_REFINED / REAL_PHOTO_COMPARISON_REQUIRED / NOT_PRINT_READY`
Updated: 2026-08-18
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
Start `main`: `3e9023c52f1633a77ee9700914b6614cb7c8abf9`

## Live authority reconciliation

The prior QA text treated retained production `1:3` as the only current visual authority. Live Figma readback now shows both the retained production and the newer clean-room V3 comparison candidate in the same non-Rurubu file. The clean-room candidate must not be lost or confused with the retained production.

- Figma file: `XyyTGuz6BMf8XRhPZZfdoT`
- retained production: `1:3 / FRAME_ADD_01_WELCOME_A2_PORTRAIT`
- clean-room V3 candidate: `19:3 / V3 / ADD-01 / PHOTO WINDOW POSTER / 852x1200`
- clean-room V3 long-copy stress: `19:21`
- V3 photo replacement-resilience QA: `22:8`
- exact Drive folder: `1UT-s_z2KOnzNeq9cluqJ_Uxh-xDzO6Kg / ADD-01_ウェルカムボード`

The retained production remains untouched as rollback/reference history. V3 is not promoted over it until a real couple photograph is placed and the final photo-led comparison is completed.

## Fresh V3 visual refinement — 2026-08-18

Fresh whole-item and native `852×1200` screenshots showed two non-semantic English filler elements in the clean-room V3 candidate:

- `19:10 / WELCOME TO OUR DAY`
- `19:19 / YOKOHAMA / 2026`

They duplicated information already carried by the Japanese title/date/location hierarchy and weakened the Japanese-first editorial poster into a more generic wedding-template read. Current explicitly rejects excessive decorative English filler without a genuine reader-facing job.

Rollback copies were created before mutation:

- `23:2 / ROLLBACK / ADD-01 V3 / PRE_ENGLISH_FILLER_SUBTRACTION / 2026-08-18`
- `23:21 / ROLLBACK / ADD-01 V3 STRESS / PRE_ENGLISH_FILLER_SUBTRACTION / 2026-08-18`

The two filler nodes were hidden in the selected V3 candidate, and their counterparts were hidden in the long-copy stress. No layout group, photo role, arc vector, date, location, venue, couple-name placeholder, or subcopy role was removed.

Result at thumbnail and actual size:

- Japanese `ようこそ。 / 旅の一日へ` becomes the unambiguous first read;
- date/location/couple identity remain the right-side information anchor;
- the large photo window still dominates the physical poster as intended;
- no new icon, card, badge, shadow, gradient, or filler copy was introduced.

## Long-copy / structure readback

The hidden stress contained old internal suffixes in venue/name/subcopy test strings. Those were replaced with realistic long semantic test strings without `LAYOUT DUMMY`, preserving stress intent while removing proof-language leakage.

Fresh readback:

- V3 candidate `19:3`: `852×1200`, visible native text `7`, outside text `0`, proof-language `0`, fixed-height <=12px text `0`;
- V3 stress `19:21`: `852×1200`, visible native text `8`, outside text `0`, proof-language `0`, fixed-height <=12px text `0`;
- the title/subtitle text bounding boxes overlap by ~2px because of font metrics, but fresh screenshots show no visible glyph collision; no geometry change was justified from numeric bounds alone;
- replaceable real-photo role remains `19:4`, `514×720`;
- variable names/venue/subcopy remain native editable text;
- image-role replacement-resilience evidence in `22:8` remains valid.

## Drive / image decision

Drive authority was read back live and remains `1UT-s_z2KOnzNeq9cluqJ_Uxh-xDzO6Kg`.

Drive writes in this run: `0`.

Image generation is still not appropriate for the main hero because it is reserved for the real couple photograph. Do not AI-generate bride/groom likeness as a substitute. The fixed paper/arc treatment did not show a screenshot-supported need for another generated asset.

## Completion / deferred finalization

The retained production keeps its previous `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS` evidence. The clean-room V3 candidate is now structurally and visually cleaner, but final promotion still requires authoritative real-photo input.

Remaining:

- select the actual couple photograph;
- place it non-destructively in `19:4` and verify crop/focal point;
- whole / reading / actual-size comparison against retained production `1:3` after real-photo placement;
- confirm final couple names, venue copy, physical A2/A3 choice, printer bleed/safe area and installation proof;
- promote V3 only if it clearly wins with the real photo.

Current result: `V3_FILLER_SUBTRACTION_PASS / V3_STRUCTURE_PASS / V3_LONG_COPY_PASS / PHOTO_ROLE_REPLACEMENT_RESILIENCE_PASS / REAL_PHOTO_COMPARISON_REQUIRED / LEGACY_PRESERVED / NOT_PRINT_READY`.
