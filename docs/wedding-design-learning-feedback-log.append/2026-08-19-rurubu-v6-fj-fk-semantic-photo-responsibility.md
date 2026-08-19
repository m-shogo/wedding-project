# Rurubu V6 feedback — FJ / FK semantic photo responsibility

Date: 2026-08-19
Scope: Rurubu WEDDING only
V7: HOLD

## Experiment 1 — Cafe/Table FJ

Visible problem:

The Table page had a dominant food photograph and then a smaller `04` support photo below it. The lower photo did not add enough new evidence to justify another photo-card module, and it amplified the limited-photo-pool repetition.

Principle/capability tested:

Move responsibility from a semantically weak repeated photo role to native typography while retaining the dominant legitimate visual anchor.

Bounded change:

- source FB `1843:2`;
- candidate/adopted FJ `1866:2`;
- hide `PHOTO / TABLE_NOTE_SUPPORT_REPLACEABLE`;
- promote native `04` / title / copy into a stronger editorial feature;
- no new image or generated decoration.

Expected improvement:

Reduce card/module feeling and image repetition without making the page visually empty.

Regression risk:

Over-subtraction could make the lower-right page too quiet or text-heavy.

Evidence:

- whole/read context: PASS;
- actual-size Table `794×1123`: PASS;
- native text `22`;
- text collision `0` after one detected initial collision was repaired;
- 18px safe-area risk `0`;
- support photo hidden and no page-level stray nodes.

Decision: `ADOPTED / VERIFIED_LOCAL`.

## Experiment 2 — chronology FK

Visible problem:

Event 05 `入籍` used a repeated dining image. The photograph did not semantically document the milestone and made the chronology feel more template-driven.

Principle/capability tested:

When a milestone photo has weak evidentiary authority, use native type hierarchy instead of substituting another unrelated image merely to preserve a photo count.

Bounded change:

- source EN `1773:2`;
- candidate/adopted FK `1870:2`;
- hide event-05 dining photo;
- preserve native date/title/body;
- promote `05` and its copy into a typographic milestone;
- preserve legitimate existing photo beats and WEDDING terminal.

Expected improvement:

Make the event read as an editorial milestone rather than an arbitrary photo module and reduce repeated-image artificiality.

Regression risk:

Removing too many event photos could turn the chronology into a diagram/text list and weaken travel-magazine energy.

Evidence:

- whole/read context: PASS;
- actual-size chronology `794×1123`: PASS;
- native text `31`;
- text collision `0` after one detected initial 05/title collision was repaired;
- 18px safe-area risk `0`.

Decision: `ADOPTED / VERIFIED_LOCAL`.

## Cross-spread result

After both promotions, the six current preferred roots contain `30` visible IMAGE-fill roles with `8` unique hashes. Dining-image repetition is `5` visible roles after FK. These counts are diagnostic, not targets.

No semantically unrelated image was introduced to improve diversity metrics.

## Asset/evidence state

- image generation: `0`;
- generated asset adopted: `0`;
- Drive new save: `0`;
- external binary placement: `0`;
- new image hash: `0`;
- native variable text preserved: YES;
- remaining replaceable photos preserved: YES;
- hidden rollback FB/EN preserved: YES;
- V7 touched: NO.

## Next application

Continue same-scale review across FH + FG/FK + EW + FJ + FI. For repeated photos, ask first whether the role needs unique photographic evidence. Do not remove an image merely to lower counts, and do not add unrelated imagery to fake diversity.

Shared-learning status: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`; no cross-item verification claimed.