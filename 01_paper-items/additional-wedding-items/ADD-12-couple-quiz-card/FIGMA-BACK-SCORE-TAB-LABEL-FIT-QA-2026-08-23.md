# ADD-12 新郎新婦クイズカード — Back score-tab label-fit QA / 2026-08-23

State: `CURRENT_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ARTIFACT_LABEL_FIELD_FIT_PASS / LONG_COPY_STRESS_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`

## Live authority

- start / pre-write latest `main`: `08fb6ff5600a8580665616ef2708f03ca26fc967`
- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- hybrid policy: `docs/design-learning/AI-FIGMA-HYBRID-AUTHORING-POLICY.md`
- Figma file: `oZ24SbwGkeAfFJcXlbxCoD`
- Current back: `59:84 / CURRENT / ADD-12 / ANSWER PUNCH CARD / BACK / FAMILY DIVERSITY 2026-08-21`
- hidden long-copy back: `59:129`
- exact Drive authority live-readback: `1LUanrHk9_lhZcSqf95ybgWH29_bmcfvZ / ADD-12_新郎新婦クイズカード`
- Drive writes: `0`

## Visible problem

Fresh native-size screenshot review showed the reader-facing blue score tab did not fully own its artifact label:

- fixed tab `59:86` was `158×54`, from x=`72` to x=`230`;
- native text `59:88 / AFTER THE QUIZ` starts at x=`108` with a `200px` text box;
- the visible label therefore extended beyond the blue field, making the final word appear clipped/unfinished at whole and reading scale.

The same geometry existed in hidden long-copy back proof `59:131 / 59:133`.

This did not justify another clean-room redesign. The `ANSWER PUNCH CARD` direction, information hierarchy, response lanes and Japanese typography remained preferred.

## Bounded repair

Before mutation, complete hidden rollback copies were created:

- `66:2 / ROLLBACK / ADD-12 BACK / PRE SCORE-TAB WIDTH FIX / 2026-08-23`
- `66:17 / ROLLBACK / ADD-12 LONG COPY BACK / PRE SCORE-TAB WIDTH FIX / 2026-08-23`

Only the fixed blue score-tab width changed:

- Current `59:86`: `158 → 236px`, height remains `54px`;
- stress `59:131`: `158 → 236px`, height remains `54px`;
- label text, font, font size, wording, x/y position and native editability did not change.

The fixed fields were renamed `DECOR / SCORE TAB / LABEL-FIT VERIFIED` so the production intent is explicit without adding guest-facing copy.

## Three-scale / stress QA

Post-change Current back screenshot:

- whole / thumbnail: PASS — `AFTER THE QUIZ` is completely contained by its blue artifact field;
- reading: PASS — tab reads as an intentional score/after-quiz identity, not a clipped banner;
- actual native `620×875`: PASS;
- no new collision with the Japanese title or paper-insert field.

The hidden long-copy proof `59:129` was temporarily revealed after the repair and freshly screened:

- long answer-method paragraph: PASS;
- long name: PASS;
- long message: PASS;
- score-tab label remains completely contained;
- proof was returned to hidden state after review.

No generated asset or raster/image fill was introduced.

## Hybrid / structure responsibility

Unchanged responsibility split:

- question/answers/response/name/message/date and artifact label: native editable Figma text;
- score tab / paper insert / tear edge / rules: simple native fixed geometry;
- generated/composed raster: `0`;
- replaceable image role: `0`;
- IMAGE fill changes: `0`.

This is a fixed-field geometry correction, not a visual-version replacement.

## Decision

Keep `ANSWER PUNCH CARD` as Current. The back-side artifact identity is now fully owned by the physical field intended to carry it.

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS` remains valid and gains `ARTIFACT_LABEL_FIELD_FIT_PASS`.

## Learning

`VERIFIED_CROSS_ITEM` candidate when combined with BOARDING PASS artifact-label mojikumi evidence:

- BOARDING PASS: a fixed artifact label wrapped only because its native text box was narrower than the physical strip that owned it;
- ADD-12: a fixed artifact field was narrower than the native label it was meant to own, creating visual clipping.

Transferable check: for short reader-facing artifact/identity labels, evaluate **text + owning physical field as one role**. A label may be structurally inside the page yet still look accidental when its wrap or clipping is caused only by mismatched label-field geometry.

Do not generalize this into “all English labels must be one line” or “always widen tabs.” Intentional multi-line labels are valid when compositionally owned and visually deliberate.