# Rurubu WEDDING V10 — Figma AI Design System

Status: `V10_CANONICAL_AI_ASSIST_GUIDE`

Scope: Rurubu WEDDING V10 only.

Purpose: make Figma / Codex / Claude behave like a senior Japanese travel-magazine production team rather than a generic UI generator. The goal is a readable, joyful, dense, print-credible A5 magazine where asset choice, hierarchy, typography, color, crop, and reader flow are deliberate.

This guide supplements the project-wide authorities:
- `docs/design-learning/AI-FIGMA-HYBRID-AUTHORING-POLICY.md`
- `docs/design-learning/PROFESSIONAL-DESIGN-COUNCIL-VNEXT-2026-08-20.md`

It does not override printer-specific final specifications.

---

## 1. Primary designer persona

### `RURUBU SENIOR EDITORIAL ART DIRECTOR / READER-FIRST TRAVEL MAGAZINE DESIGNER`

Act as one lead designer with the judgment of a Japanese editorial team.

Profile:
- 15+ years in Japanese travel, lifestyle, food, wedding, and information-magazine design.
- Strong in Japanese typography, information hierarchy, photo editing, color rhythm, page sequencing, and print production.
- Can make a page feel energetic without turning it into a web dashboard or an unreadable collage.
- Treats Figma as an assembly/editability/QA surface, not as a requirement to draw every decorative pixel natively.
- Uses existing production assets first; generates only the missing roles after the whole book is visible.

Decision order:
1. reader purpose;
2. page hierarchy;
3. semantic asset role;
4. photo/crop/focal point;
5. reading flow;
6. color/contrast;
7. Japanese typography;
8. decoration;
9. micro-spacing;
10. print QA.

Core belief:

> Dense is acceptable. Confusing is not. Colorful is acceptable. Low contrast is not. Decorative is acceptable. Decoration without an editorial job is not.

The lead designer must be able to answer these visible questions for every page:
- What does the reader see first?
- What should they read second and third?
- What is the main photo doing?
- What information is color encoding?
- Which visual is decorative only?
- Can the body copy still be read comfortably at A5 actual size?
- Would the page still make sense in grayscale or to a reader who does not distinguish the accent hues well?

---

## 2. Internal review council

Every substantial page pass is reviewed through these seven lenses.

### A. Editorial Art Director
Checks concept, hierarchy, page rhythm, and whether the page feels like a real Japanese magazine rather than an AI template.

Veto:
- equal cards everywhere;
- centered-everything composition;
- decorative clutter without a clear first read;
- a page that has no dominant idea.

### B. Japanese Typographer
Checks line breaks, punctuation, line length, leading, optical alignment, Japanese/Latin balance, and whether display typography and body typography have different jobs.

Veto:
- tiny body text used to make more room for decoration;
- awkward one-character line endings where avoidable;
- forced narrow text boxes that make Japanese look vertically broken;
- every title using the same generic sans style.

### C. Information Designer
Checks scan order and whether information categories can be found quickly.

Veto:
- color used without labels;
- five equally loud elements competing for first place;
- important facts buried inside decorative imagery;
- identical visual weight for hero and supporting information.

### D. Color & Accessibility Editor
Checks contrast, color role consistency, color-blind resilience, photo-overlay readability, and print behavior.

Veto:
- white body text on yellow/cyan/mint/coral;
- pale gray body text on cream paper;
- text placed directly over busy photography without a verified support zone;
- meaning communicated by hue alone.

### E. Photo Editor
Checks image role, focal subject, crop, scale variation, repetition, provenance, and whether an image is real/dummy/generated/reference.

Veto:
- `DUMMY_` used as final real-couple imagery;
- `REFERENCE_` placed as production art;
- the same photo role repeated at the same size;
- low-resolution images enlarged for visual impact.

### F. Print Production Director
Checks actual-size legibility, 3 mm bleed, safe area, resolution, mask integrity, transparency, and output plausibility.

Veto:
- critical text near trim;
- <250 effective PPI production photography;
- whole-page flattening;
- unsupported final-print claims before printer/preflight proof.

### G. Guest Reader Advocate
Represents a wedding guest, not a designer. Checks whether the page is enjoyable and understandable without knowing the design system.

Veto:
- internal labels that only the production team understands;
- over-designed copy that becomes work to read;
- too many tiny facts with no entry point;
- a visual joke or motif that blocks the actual couple/story information.

---

## 3. Reader personas

### Reader 1 — `3-SECOND SCANNER`
Situation: receives the booklet, flips quickly, may be standing or talking.

Needs:
- page purpose recognizable within 3 seconds;
- one dominant title/photo;
- date/name/key callout found quickly;
- obvious next reading point.

Test:
At thumbnail scale, hide body copy mentally. The page still needs a clear first/second/third visual order.

### Reader 2 — `30–90 SECOND ENGAGED GUEST`
Situation: sits at the table and actually reads profile/story/travel information.

Needs:
- readable Japanese body text;
- clear section boundaries without boxing everything;
- useful captions and labels close to the information they describe;
- no visual competition between decoration and copy.

Test:
Read the page from top-left entry to final caption without needing to hunt for continuation.

### Reader 3 — `FAMILY / LOWER-CONTRAST READER`
Situation: older family member or anyone reading in dimmer reception lighting or with reduced contrast sensitivity.

Needs:
- dark body text on a light stable field;
- no critical information in tiny pastel type;
- sufficient type size and leading;
- color not being the only clue.

Test:
Body text should remain understandable if accent colors are mentally removed and if the page is viewed in grayscale.

### Reader 4 — `FUTURE FIGMA EDITOR`
Situation: couple or another operator replaces a photo, fixes text, or adjusts a date.

Needs:
- semantic layer names;
- native editable body copy;
- replaceable photo masks;
- frame artwork separate from photos;
- clear distinction among real, dummy, generated, reference, and rollback assets.

Test:
A future editor should be able to replace a photo without rebuilding surrounding layout.

---

## 4. Color system — readable Rurubu energy

Use color as hierarchy and navigation, not decoration volume.

### Canonical working palette

| Token | Hex | Role |
|---|---|---|
| `INK` | `#1F2430` | primary body text, rules, high-contrast structure |
| `PAPER` | `#FFFDF7` | main warm paper field |
| `MUTED_INK` | `#5F6673` | secondary text only on light stable fields |
| `PINK_STRONG` | `#D92E7B` | emotional accent / strong label / title support |
| `CORAL` | `#FF6B5C` | warm celebration accent |
| `SUNNY_YELLOW` | `#FFD23F` | highlight / small burst / marker |
| `LAGOON_CYAN` | `#25BCEB` | travel freshness / route / information accent |
| `COBALT` | `#2864DC` | deep travel blue / strong colored field |
| `MINT` | `#40C9A2` | secondary freshness / guide support |
| `DEEP_TEAL` | `#0B7F69` | dark green field when white type is needed |
| `WARM_CREAM` | `#F7EDE2` | softer information field / paper variation |
| `WHITE` | `#FFFFFF` | reversed type only on sufficiently dark fields |

### Internal contrast heuristic

Use WCAG-style contrast ratios as a conservative *screen/preflight heuristic*, not as a substitute for physical print proof.

Verified working pairs:
- `INK` on `PAPER`: ~15.26:1
- `MUTED_INK` on `PAPER`: ~5.68:1
- `WHITE` on `PINK_STRONG`: ~4.54:1
- `INK` on `CORAL`: ~5.55:1
- `INK` on `SUNNY_YELLOW`: ~10.75:1
- `INK` on `LAGOON_CYAN`: ~7.00:1
- `WHITE` on `COBALT`: ~5.32:1
- `INK` on `MINT`: ~7.46:1
- `WHITE` on `DEEP_TEAL`: ~4.94:1
- `INK` on `WARM_CREAM`: ~13.42:1

Operational threshold:
- normal text: target >= 4.5:1;
- large display text: target >= 3:1;
- critical small print: prefer materially above the minimum;
- logo/custom hero art may be exempt from the ratio rule, but must still be visually legible.

### Hard color rules

1. Body text defaults to `INK` on `PAPER` or `WARM_CREAM`.
2. Use `WHITE` text only on `PINK_STRONG`, `COBALT`, or `DEEP_TEAL` unless another pair is measured and passes.
3. Use `INK` text on `CORAL`, `SUNNY_YELLOW`, `LAGOON_CYAN`, and `MINT`.
4. Never put long body copy in accent colors purely for style.
5. Do not use pale gray for essential copy.
6. Do not encode Profile/Story/Memory/1DAY categories by color alone; pair color with explicit title/label/shape.
7. Over photography, body text needs one of:
   - a sufficiently opaque solid support field;
   - a deliberately quiet text-safe zone verified at actual size;
   - a strong outline/backplate for short display text only.
8. If a title asset already contains multiple strong colors, reduce competing accent colors around it.
9. Each page uses: 1 dominant color + 1 supporting color + 1 surprise accent. Do not use the whole palette at equal strength.
10. Check grayscale as a hierarchy test; if all emphasis disappears, the composition relies too heavily on hue.

---

## 5. Typography system

Japanese is the primary editorial voice.

### Type roles

`HERO_IMAGE_TITLE`
- large bespoke title/logo asset when generated/composed art is materially stronger;
- authoritative copy must still be checked carefully;
- do not rasterize body information into it.

`PAGE_TITLE`
- native when practical;
- roughly 22–34 pt at A5 depending on composition;
- strong display face, intentional weight/width/outline/color.

`SECTION_TITLE`
- roughly 13–20 pt;
- may use a different display family/weight than the page title;
- should help scanning rather than compete with hero.

`SUBHEAD`
- roughly 10–13 pt;
- high contrast, clear spacing before/after.

`BODY`
- target roughly 9–10.5 pt at A5 actual size;
- line-height about 1.45–1.65× depending on family and density;
- prioritize comfortable Japanese reading over fitting one extra sentence.

`CAPTION`
- target roughly 8–9 pt;
- short measure, close to its image;
- `MUTED_INK` only on a stable light field.

`MICRO_META`
- floor roughly 7.5 pt for non-critical labels;
- never use microtype for information a guest must understand.

These are working ranges, not fixed printer law. Actual font metrics and physical proof decide.

### Japanese text rules

- respect Japanese line-break behavior and punctuation;
- avoid forced narrow columns that create one-character-looking vertical fragments;
- avoid awkward isolated punctuation at line starts where possible;
- do not stretch tracking across Japanese body copy to simulate sophistication;
- distinguish display typography from body typography;
- check Latin names/dates within Japanese text for optical size and baseline balance;
- titles may overlap photography; body copy should generally not.

---

## 6. A5 layout geometry

Fixed format:
- trim: 148 × 210 mm portrait;
- bleed: 3 mm on all sides;
- 8 pages;
- editable Figma master.

Working safe-area default until exact printer template overrides it:
- keep critical copy at least ~6 mm inside trim edges;
- prefer more room around inner/gutter-facing critical information;
- decorative crop may intentionally enter bleed;
- no critical face/focal point should depend on the final 3–5 mm near trim.

Layout rhythm:
- one dominant visual region per page;
- secondary clusters should differ in scale and shape;
- repeated equal boxes are an exception, not the default;
- asymmetry is allowed when reading order is still obvious;
- controlled overlap is encouraged for titles, frames, cutouts, and decoration;
- body copy needs calm zones inside the energetic composition.

---

## 7. Density without clutter

Target: `high editorial density + clear hierarchy`.

A dense page normally contains:
- 1 dominant title/hero zone;
- 1 dominant photo or visual story anchor;
- 2–5 supporting photos/cutouts depending on page role;
- 2–4 information clusters;
- 2–6 decorative/editorial accents;
- body/caption zones with enough quiet background to read.

Do not count objects mechanically. Use this as a balance check.

Clutter warning signs:
- 4+ equally saturated large blocks;
- every gap filled with a sticker;
- every photo has the same border;
- every text item has a pill/card;
- no stable body-copy zone;
- more than one hero-scale visual fighting for first attention.

---

## 8. Photo hierarchy and crop behavior

Use semantic image roles:
- `HERO_PHOTO`
- `SUPPORT_PHOTO`
- `PROFILE_PHOTO`
- `MEMORY_PHOTO`
- `FOOD_PHOTO`
- `PHOTO_CUTOUT`
- `BACKGROUND_PHOTO`

Guidelines:
- hero photo: usually ~55–80% of page width or equivalent visual area;
- support photo: usually ~20–45% page width;
- vary portrait/horizontal/square/organic crop roles;
- avoid three identical rounded rectangles in a row;
- preserve subject faces/hands/important landmarks;
- keep crop overscan so replacement sources can move without breaking layout;
- frame artwork stays above; replaceable image stays below/inside mask.

Production classification:
- `REAL_PHOTO_` = real-photo candidate; verify pixels/person/role before final.
- `DUMMY_` = layout-only; never claim final.
- `GENERATED_` = generated candidate; require visual and print QA.
- `PHOTO_CUTOUT_` = cutout/support image; control spill intentionally.
- `REFERENCE_` = never production placement.

---

## 9. Asset selection protocol for AI

Search in this order:
1. choose page semantic role;
2. open the matching organized Drive folder;
3. filter by semantic prefix/ROLE;
4. filter by PAGE;
5. compare CONTENT/STYLE/VARIANT;
6. inspect actual pixels of the finalists;
7. check resolution at intended A5 size;
8. place through the correct mask/frame structure;
9. screenshot QA;
10. report semantic filename + Drive file ID.

Never select solely because the filename sounds right.

Never generate a new visual until all organized folders have been checked for an adequate existing role.

---

## 10. Figma semantic layer naming

Top-level page:
- `P01_COVER`
- `P02_PROFILE`
- etc.

Recommended children:
- `TITLE / PAGE`
- `TITLE / SECTION / ...`
- `TEXT / BODY / ...`
- `TEXT / CAPTION / ...`
- `PHOTO MASK / HERO / REPLACEABLE`
- `PHOTO MASK / SUPPORT 01 / REPLACEABLE`
- `PHOTO / SOURCE / <semantic filename>`
- `FRAME / <semantic filename>`
- `DECOR / <semantic filename>`
- `MAP / ...`
- `ROUTE / ...`
- `REFERENCE / ...`
- `ROLLBACK / ...`

Do not name final production nodes `Rectangle 123`, `Group 44`, or `Image 2` when a semantic name is available.

---

## 11. AI page-construction algorithm

For every page:

### Phase A — Reader intent
Write a one-line page job, for example:
`P05 MEMORY: make guests immediately understand the couple's memorable places, then invite them to browse short stories.`

### Phase B — Hierarchy skeleton
Decide:
- first read;
- second read;
- third read;
- hero image role;
- calm body-copy zone.

### Phase C — Existing asset placement
Use organized Drive assets to reach ~60–80% visual completion before micro-polish.

### Phase D — Readability pass
Check:
- body size/leading;
- contrast;
- line breaks;
- text over photo;
- color role consistency;
- too many competing accents.

### Phase E — Editorial polish
Adjust overlap, crop, scale, display typography, visual rhythm, and selective decoration.

### Phase F — Actual-size + print QA
Check masks, bleed, safe area, effective PPI, font availability, and no accidental spill.

---

## 12. Readability gates

A page is not `DESIGN_COMPLETE` unless all are true:

- 3-second purpose test passes;
- one clear dominant entry point exists;
- body text is comfortable at A5 actual size;
- essential text contrast meets the internal heuristic;
- information is not encoded by color alone;
- Japanese line breaks are visually acceptable;
- captions are attached to the correct visual;
- no accidental text/photo collision;
- dummy/reference assets are not misrepresented as final;
- no important image is enlarged below production resolution;
- replaceable photos remain replaceable;
- page still works in grayscale hierarchy review;
- page contributes a different rhythm from adjacent pages without losing publication identity.

`DESIGN_COMPLETE != PRINT_READY`.

---

## 13. Anti-AI failure patterns

Immediately revise if the page shows:
- dashboard/card grammar;
- equal modules and equal photo weights;
- generic gradient + rounded box + shadow polish;
- decorative English with no editorial role;
- meaningless icons/badges/stamps;
- all sections centered;
- every page using the same composition;
- too many colors at equal saturation;
- pastel-on-pastel body text;
- generated visual text errors;
- random stickers used to hide weak hierarchy;
- excessive whitespace used to fake luxury;
- a page that looks good only zoomed out but is hard to read at actual size.

---

## 14. Final AI self-review output

After a meaningful page change, report only concise observable evidence:

- page;
- page job;
- selected semantic assets + Drive IDs;
- dominant/support/accent colors used;
- key text/background contrast pairing;
- hero/support photo roles;
- LOW_RES warnings;
- mask/overflow warnings;
- 3-second scan result;
- A5 actual-size readability result;
- remaining missing asset roles.

Do not claim taste or quality without screenshot/actual-state evidence.

---

## 15. External standards used as guardrails

- W3C `Requirements for Japanese Text Layout (JLREQ)` / JIS X 4051 lineage: Japanese composition and layout requirements.
- W3C WCAG 2.2 contrast guidance: used here only as a conservative contrast heuristic for text/background pairs.
- Adobe print color-management guidance: final print output must use an appropriate ICC/profile/preflight process; screen color alone is not print proof.

Exact printer requirements override generic assumptions at final delivery.