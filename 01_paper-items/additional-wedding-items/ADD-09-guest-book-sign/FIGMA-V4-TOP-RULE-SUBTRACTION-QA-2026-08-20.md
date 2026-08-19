# ADD-09 Guest Book V4 — top-rule subtraction QA

Date: 2026-08-20
State: `VERIFIED_LOCAL / TOP_RULE_SUBTRACTION_PASS / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Start authority SHA before selected mutation: `b447eb4607a08f68565a9a0f192aa921e2f2d1bd`
Latest main re-read before Git write: `f87eadf55fb1fc92f1a4e33508b3bf0caaefeefb`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `PjFWBpDwaQM5LfvgdqSFvU`
- selected V4: `16:3 / CLEANROOM_ADD09_V4_JOURNEY_LINE`
- long-copy stress: `17:4 / QA_CLEANROOM_ADD09_V4_LONG_COPY_STRESS`
- retained legacy: `1:3 / FRAME_ADD09_GUEST_BOOK_SIGN`
- Drive authority: `1D259ugx13El0JYxvn8yyskIjc2c2liF4 / ADD-09_ゲストブックサイン`

## Visible problem

Fresh selected screenshot review found the 760×6 rust `VECTOR / TOP RULE` floating above the Japanese headline/date pair. Earlier V4 polish had already removed an isolated index mark, a secondary route system and a lower form-like foot rule. The headline, date and primary continuous journey line now form a complete top-to-middle hierarchy on their own, so the remaining top rule no longer bound otherwise disconnected information and read as an extra template separator.

This was evaluated under the existing binding-function principle: subtraction is not automatic; a line is removed only when the artifact remains clearer without it.

## Bounded comparison

Production was not edited during comparison.

- comparison: `32:2 / QA / ADD-09 V4 / NO TOP RULE / 2026-08-20`
- only `VECTOR / TOP RULE` visibility changed.
- Japanese headline, date, continuous journey line/open nodes, lower rust instruction index and all native semantic placeholders remained unchanged.

The no-rule comparison was stronger at whole and reading scale: the title/date grouping remained clear, the page top became less template-framed, and the continuous line became the single intentional fixed-art gesture rather than one of several horizontal/route devices.

## Promotion / rollback

Full hidden pre-change rollbacks were created before selected/stress mutation:

- selected rollback `33:2`
- long-copy rollback `33:22`

Adopted:

- selected `16:4 / VECTOR / TOP RULE` → hidden
- long-copy `17:5 / VECTOR / TOP RULE` → hidden

Comparison `32:2` was hidden after promotion. Legacy production remained untouched.

## Three-scale / structure QA

- whole / ~500px-equivalent comparison: PASS.
- reading / 705×1000 screenshot: PASS.
- selected actual size `1000×1419`: PASS after adoption.
- selected visible native text: `5`.
- stress visible native text when structurally inspected: `5`.
- IMAGE fills: `0` in selected/stress.
- text outside root: `0` in selected/stress.
- visible proof-language: `0` in selected/stress.
- selected/stress top rule visible: `false`.
- primary continuous journey line remains visible and editable.
- lower instruction index remains visible and functional.
- stress root remains hidden after QA.

No variable text, date, instructions or location information was rasterized or baked into fixed art.

## Asset decision

Image generation: `0`.
Drive writes: `0`.

The defect was a redundant non-binding rule, not missing imagery or texture.

## Decision

`TOP_RULE_SUBTRACTION_PASS`.

ADD-09 V4 remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS`. Final writing method, installation wording/location and physical printer/venue proof remain deferred finalization inputs.