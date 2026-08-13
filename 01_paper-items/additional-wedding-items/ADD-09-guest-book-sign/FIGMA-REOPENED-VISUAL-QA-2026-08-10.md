# ADD-09 Guest Bookサイン — Reopened Visual QA — 2026-08-10

Authority at write: GitHub latest `main` = `267ae44121b15a24f050eb4c00948c239942f7d5`; Current remains `VISUAL_REOPENED`.

## Live authority

- Figma file key: `PjFWBpDwaQM5LfvgdqSFvU`
- page: `01_PRODUCTION`
- production: `1:3 / FRAME_ADD09_GUEST_BOOK_SIGN`
- Drive folder: `ADD-09_ゲストブックサイン` / `1D259ugx13El0JYxvn8yyskIjc2c2liF4`
- previous structural authority retained: `01_paper-items/additional-wedding-items/ADD-09-guest-book-sign/QA-2026-08-07-FIGMA.md`
- RURUBU/るるぶ area was not read or written.

## Reopened visual diagnosis

Fresh production screenshot showed that the previous structural refinement was readable but still too sparse for the reopened sellable gate: tiny `GUEST BOOK`, one Japanese title, two placeholder lines, one long hairline and a large largely unused ivory lower half. It read as a tasteful draft/information sheet rather than a memorable physical guest-book sign.

The existing `DESIGN_QA_PASS_WITH_PLACEHOLDERS` and prior long-copy proof remain valid as historical structural evidence only.

## Clean-room comparison

Created:

- section: `5:2 / QA_ADD_09_REOPENED_CLEANROOM_2026_08_10`
- candidate: `5:3 / QA_ADD_09_GUEST_BOOK_V2_BOOKPLATE_EDITORIAL`

Art direction:

- Japanese-first headline `旅の記録に、一言を。` in native `Noto Serif JP`;
- a deep-navy book-spine field on the left gives the sign a role-specific physical-book reference instead of generic empty space;
- small `GUEST BOOK` kicker remains subordinate metadata;
- instructions and operational placeholder are separated by one restrained editorial rule;
- three low-contrast ruled-book lines in the lower field reference handwriting/guest-book use without becoming form UI;
- rust and mint accents are limited to small print anchors;
- date/location remain native text;
- no guest names, fake signatures, cards, badges, pills, gradients, shadows, QR, transport motifs, stock imagery, or generated people.

The first screenshot exposed an awkward `ARCH / IVE` wrap in the spine label. It was corrected before promotion by shrinking/reflowing `GUEST / BOOK / ARCHIVE` inside the physical spine.

## Image generation

`IMAGE_GEN_UNAVAILABLE_THIS_RUN`.

No generated asset was claimed or saved. The observed bottleneck was typographic composition and physical-object identity, so the item was advanced with native Figma text/vectors. Drive writes: `0`.

## Visual decision

Whole-item, reading-scale and actual-size screenshots show V2 clearly wins: the item has a specific guest-book/bookplate identity, the Japanese message is the visual event, and the lower half has intentional writing rhythm instead of undifferentiated blank space.

## Rollback-safe promotion

Before promotion, the live production was preserved exactly:

- rollback section: `5:20 / ROLLBACK_ADD_09_PRE_REOPENED_EDITORIAL_2026_08_10`
- rollback frame: `5:21 / ROLLBACK_ADD09_GUEST_BOOK_PRE_V2`

Production ID `1:3` was preserved and its contents replaced with the approved clean-room design.

## V2 long-copy stress

Created:

- section: `5:49 / QA_ADD_09_V2_LONG_COPY_STRESS_2026_08_10`
- frame: `5:50 / QA_ADD09_V2_LONG_COPY_STRESS`

Long native dummy strings were inserted for both the primary writing instruction and operational/placement note. Screenshot review confirmed the first string wraps above the editorial rule and the second wraps within its own text band without collision with the note heading, writing lines, spine, footer, or frame boundary.

## Post-promotion structure QA

Production `1:3`:

- `1000 × 1419`
- `clipsContent=true`
- native text count: `8`
- IMAGE fills: `0`
- text outside frame: `0`
- hidden `GUIDE_SAFE_10MM`: `5:48`, `864 × 1283`
- all variable content remains native editable text.

Rollback `5:21` remains intact with the prior five native text nodes, zero IMAGE fills, zero text outside frame, and its hidden safe guide.

Stress `5:50` retains eight native text nodes, zero IMAGE fills, zero text outside frame, and hidden safe guide `5:66`.

## 2026-08-13 placeholder hierarchy polish

Fresh actual-size review at current main `c31743ce370e316b6973e8350d2b03dda1e73ceb` confirmed that the V2 bookplate/editorial composition still passes the sellable visual gate, but the two semantic placeholders rendered proof-only `LAYOUT DUMMY` metadata at the same scale and color as their guest-facing field labels. The result looked more like a proof/CMS sheet than a finished physical sign.

Exact authority was re-read before mutation:

- Figma: `PjFWBpDwaQM5LfvgdqSFvU / 01_PRODUCTION / 1:3`
- Drive: `1D259ugx13El0JYxvn8yyskIjc2c2liF4 / ADD-09_Guest_Bookサイン`

A fresh hidden rollback was created on `99_QA`:

- `7:2 / ROLLBACK_ADD09_PRE_PLACEHOLDER_HIERARCHY_2026_08_13`

Production root `1:3` was preserved. Only native text-range hierarchy changed:

- `5:38 / TXT_GUIDE`: semantic field remains `29 px`; ` · LAYOUT DUMMY]` becomes `10 px`, muted warm-gray, opacity `0.78`.
- `5:42 / TXT_NOTE`: semantic field remains `24 px`; suffix becomes `9 px`, muted warm-gray, opacity `0.78`.

Post-write screenshot QA at the full-item `990 × 1400` rendering shows the semantic instructions remain immediately readable while proof metadata recedes. The deep-navy book spine, Japanese-first title, bookplate rule, writing-line rhythm and footer composition are unchanged.

Post-write structural readback:

- production root: `990 × 1400`, `clipsContent=true`
- native text count: `8`
- IMAGE fills: `0`
- no rasterization or flattening introduced
- both edited fields remain native editable text; unresolved values were not factually resolved or deleted.

Image generation was not required for this correction because the live bottleneck was proof-metadata typography, not missing imagery. Drive writes: `0`.

## Status

- structural: `DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / NATIVE_EDITABLE_PASS / SEMANTIC_PLACEHOLDERS_PASS / ROLLBACK_SAFE / ACTUAL_SIZE_QA_PASS`
- reopened visual: `SELLABLE_VISUAL_QA_PASS`
- combined: `ADD_09_PLACEHOLDER_HIERARCHY_PASS / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / NOT_PRINT_READY`

## Deferred finalization

`DEFERRED_FINALIZATION`:

- final writing method, pen placement and guest-book installation wording;
- final location/footer wording;
- printer bleed/template/profile;
- 100% physical proof and venue-distance readability.

These do not block progression.

## Next

Proceed to ADD-10 会場案内サイン for reopened visual-art-direction audit.
