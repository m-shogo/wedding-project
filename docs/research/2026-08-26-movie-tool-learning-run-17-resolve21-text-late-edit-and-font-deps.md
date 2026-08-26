# Movie Tool Learning Run 17 — Resolve 21 Text+/MultiText late edit and font dependency model

Date: 2026-08-26
Scope: Movie Tool Learning only.

## Why this matters

Wedding copy changes late. A title that renders perfectly but requires opening a complex Fusion graph for every typo or wording change is not a good production handoff.

Human Adjustability therefore treats text replacement and font recovery as first-class production capabilities, not cosmetic concerns.

## Resolve 21 official evidence

The Resolve 21 New Features Guide documents:

- multi-language spell checking for text elements, with errors visible in both Viewer and Inspector,
- Text+ and MultiText spell checking in Fusion,
- emoji support for Text+ and MultiText,
- improved support for color fonts, bitmap fonts and font styles,
- supported color-font palette controls in the Text+ Inspector,
- improved MultiText position/alignment controls,
- pivot adjustments in the Layout tab,
- improved MultiText CSV import.

The guide also warns about a real font-substitution asymmetry: an emoji-only font may not contain Latin glyphs, while use of a normal font with emoji can trigger emoji-font fallback. This means "text is visible" does not prove the intended font dependency is portable.

## Native routing update

For text that must be changed by a human near delivery:

1. Prefer Resolve-native Text/Text+/MultiText when the required appearance is achievable without baking.
2. Prefer a DRFX/Edit Template whose public Inspector exposes the actual copy field when Fusion styling is needed.
3. Use MultiText when the design genuinely benefits from multiple text items or data/CSV-driven updates.
4. Bake text only when portability/appearance requirements cannot be reproduced natively and the final copy is explicitly frozen.

Guardrail:

`LATE_EDIT_REQUIRED => NATIVE_TEXT_OR_EXPOSED_TEXT_CONTROL_FIRST`

## Human Adjustability contract for Wedding text

A reusable Wedding text template should expose only the controls the editor is expected to touch:

- Copy / Rich Text
- Font family or an intentionally constrained font choice
- Size
- Color
- position/alignment where relevant
- one semantic motion control such as Motion Amount when needed

Do not expose every Fusion parameter just because Macro Editor can expose it.

Guardrail:

`MORE_EXPOSED_CONTROLS != BETTER_HUMAN_ADJUSTABILITY`

Recommended default target: 3-8 meaningful controls for simple reusable titles.

## Font dependencies are not media dependencies

Every handoff/package must classify fonts separately from video/image media.

For each non-system/non-project-guaranteed font, record:

- family and style,
- source/license note,
- whether redistribution is allowed,
- expected fallback behavior,
- whether the receiving machine must install it,
- screenshot/golden evidence for the intended glyph set,
- emoji/color-font dependency if applicable.

Guardrails:

`PROJECT_ARCHIVE_PRESENT != FONT_LICENSE_CLEARED`

`FONT_FALLBACK_VISIBLE != FONT_PARITY`

`EMOJI_VISIBLE != FONT_DEPENDENCY_COMPLETE`

## CSV/data-driven MultiText candidate

Resolve 21's improved MultiText CSV import creates a potential native path for repetitive text systems such as:

- guest/location labels,
- short travel labels,
- repeated chapter cards,
- data-driven name/location variants.

This should not be used merely because CSV import exists. It becomes preferable only when it reduces human error or repeated copy editing.

Guardrail:

`DATA_DRIVEN_AVAILABLE != DATA_DRIVEN_REQUIRED`

## New canary — DV21-TEXT-LATE-02

Create one Text+ title and one MultiText title in Resolve 21 with a Wedding-like visual treatment.

For each:

1. save/reopen,
2. replace Japanese and Latin copy,
3. insert punctuation/emoji,
4. change font style,
5. change duration,
6. verify motion timing remains intentional,
7. package/transfer to a clean context without the custom font,
8. record missing/fallback behavior,
9. install the expected font and verify recovery,
10. render before/after golden frames.

Pass requires that expected user edits can be made without opening/rewiring the Fusion node graph for a template classified `EASY_INSPECTOR`.

## New canary — DV21-MULTITEXT-CSV-01

Use a small CSV fixture with 3-5 rows of travel/wedding labels. Validate:

- import mapping,
- character encoding for Japanese,
- line breaks/punctuation,
- position/alignment/pivot behavior,
- save/reopen,
- clean-context behavior,
- whether CSV remains an external dependency or is fully materialized after import.

Do not promote CSV-driven MultiText to a production recipe until dependency semantics are observed.

## Failure fingerprints

- `fusion-title-human-hostile`: every copy edit requires node graph navigation -> redesign public controls.
- `font-name-only-manifest`: dependency records family but no style/license/fallback -> incomplete.
- `emoji-fallback-misread-as-parity`: fallback renders something, so parity is claimed -> block.
- `multitext-overengineering`: MultiText/CSV introduced for one static line -> route to simpler native text.
- `late-copy-baked-too-early`: final copy is not frozen but rendered into pixels -> preserve a native text master or explicit source-of-truth sidecar.

## Evidence

Primary:

- Blackmagic Design — DaVinci Resolve 21 New Features Guide, Text+ / MultiText spell checking, font improvements, emoji/color fonts, MultiText position/pivot/alignment/CSV import.

## Saturation

NO_CHANGE is false. Human Adjustability now includes a concrete late-edit text policy and font-dependency verification model instead of treating text as a generic transported visual.
