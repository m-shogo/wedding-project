# ADD-07 エスコートカード案内ボード — Print-first Japanese action-copy QA — 2026-08-29

State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / JP_ACTION_COPY_POLISHED / ROLLBACK_SAFE / NOT_PRINT_READY`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
Run start / pre-write main: `28b25b14a9b3cfb29427a6c71f0708d9fdf3826e`

## Live authority

- Figma file: `rplj1IWXP4XVKjWDQRg3dU`
- Current A2: `32:2`
- Current A3: `32:16`
- Drive folder live-readback: `1nPb_yvp1rIlF_L3X0mAnBFSzSuEIllDi / ADD-07_エスコートカード案内ボード`
- Drive write: `0`

## Visible issue

The promoted HANGING CARD RACK composition remained strong, but the small English kicker `FIND YOUR CARD` and the footer `カードを見つけたら、次の場所へ。` were weaker than the otherwise Japanese-first, physically specific guidance. The English role was not required for comprehension, while `次の場所` was vague relative to the already verified escort-card action: find the named card, take it, then proceed to the table printed on it.

This run did not reopen the HANGING CARD RACK geometry, palette, hanging-card metaphor or A2/A3 reflow. It made a bounded reader-facing copy repair only.

## Figma change

A2 `32:2` and A3 `32:16`:

- kicker: `FIND YOUR CARD` → `お名前のカードを探して`
- footer: `カードを見つけたら、次の場所へ。` → `カードを手に取ったら、\n記載のテーブルへ。`

The replacement is supported by the already verified lead/action sequence and introduces no new venue or operational fact.

Rollback copies saved hidden before mutation:

- A2 `51:2 / ... PRE-JP-MICROCOPY 2026-08-29`
- A3 `51:25 / ... PRE-JP-MICROCOPY 2026-08-29`

## Three-scale / structure QA

Fresh post-write screenshots:

- A2 whole-item at 990×1400 render: PASS
- A3 native 990×1400: PASS
- Japanese kicker remains subordinate to the primary title and reads faster than the removed English filler.
- Footer now closes the actual physical flow instead of using vague `次の場所` language.

Readback for both roots:

- visible native text: `12`
- fixed-height visible text: `0`
- outside-root visible text: `0`
- IMAGE fills: `0`
- variable/factual copy remains native editable text

## Print-first actual-size check

Physical formats remain A2 `420×594mm` and A3 `297×420mm`. Current canvases are `1400×1980` and `990×1400`, both approximately `3.333 px/mm`.

Approximate type sizes at output:

- A2 title 96px ≈ 81.6pt; lead 38px ≈ 32.3pt; step 40px ≈ 34.0pt; kicker/footer 28px ≈ 23.8pt.
- A3 title 66px ≈ 56.1pt; lead 27px ≈ 23.0pt; step 28px ≈ 23.8pt; kicker/footer 20px ≈ 17.0pt.

Hanging-card physical cues:

- A2 rail 5px ≈ 1.5mm; threads 4px ≈ 1.2mm; holes 36px ≈ 10.8mm.
- A3 rail 4px ≈ 1.2mm; threads 3px ≈ 0.9mm; holes 24px ≈ 7.2mm.

No raster/image fills exist in Current, so effective PPI is `N/A`; `RESOLUTION_WARNING` does not apply.

## Print risks / deferred finalization

- dark plum field + cream + yellow/coral/lagoon accents still require CMYK/profile and grayscale proof;
- exact bleed/trim/safe geometry must follow the selected printer template and is not guessed here;
- final A2/A3 installation choice, easel/lip occlusion, installation height and 2–4m viewing-distance proof remain unresolved;
- final card-placement operation and wording remain subject to venue confirmation;
- PDF export, font/embed, overprint/knockout, transparency, printer preflight and 100%/physical proof remain open.

`DESIGN_COMPLETE != PRINT_READY` remains in force.
