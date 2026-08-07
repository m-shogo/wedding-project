# るるぶWEDDING — Editorial Design Lessons Log

Date opened: 2026-08-02
Scope: V5, V6, and later editorial work

## Purpose

This log captures mistakes, observations, and design discoveries before they become permanent rules.

A lesson is promoted into `RURUBU-MAGAZINE-EDITORIAL-DESIGN-KNOWLEDGE-BASE.md` only when it is reusable and supported by one or more of:

- repeated evidence
- strong editorial reasoning
- live screenshot comparison
- structural audit
- actual-size print proof
- explicit user preference that should persist across versions

Do not turn every isolated preference into a rigid global rule. The goal is accumulated judgment, not rule inflation.

---

## Lesson template

### LESSON-XXX — Title

**Date:**

**Context:**

**Observed failure or opportunity:**

**Root cause:**

**General editorial principle:**

**Process change:**

**Design change:**

**Verification evidence:**

**Applies to:** V5 / V6 / all versions

**Status:** CANDIDATE / TESTED / PROMOTED / REJECTED / SUPERSEDED

**Promoted knowledge-base section:**

---

## LESSON-001 — Generated, saved, applied, and approved are different states

**Date:** 2026-08-02

**Context:** V5 dummy photographs

**Observed failure or opportunity:** A report implied that generated realistic photographs were already applied to Figma, while the live target did not prove the intended high-resolution sources were present and visually acceptable.

**Root cause:** Several asset states were collapsed into one completion claim.

**General editorial principle:** Visual production requires provenance and visible-quality evidence. A page cannot be judged from intended operations.

**Process change:** Track master generation, Drive readback, Figma placement, screenshot QA, and role completion separately.

**Design change:** None by itself; this protects all later design decisions.

**Verification evidence:** Asset evidence ledger and live node/hash audit.

**Applies to:** all versions

**Status:** PROMOTED

**Promoted knowledge-base section:** Learning and error-conversion loop; Photography

---

## LESSON-002 — Transport success is not image-quality success

**Date:** 2026-08-02

**Context:** V5 cover hero inline Figma import

**Observed failure or opportunity:** A 5,927-byte derivative successfully produced a new Figma image hash, but remained unsuitable for a dominant printed photograph.

**Root cause:** Payload minimization was optimized before visible and print-scale quality.

**General editorial principle:** Technical success is subordinate to the visual role. Dominant imagery requires role-appropriate dimensions, compression, crop flexibility, and screenshot review.

**Process change:** Separate Drive master from Figma derivative. Define minimum derivative dimensions from the target frame and reject transmitted but visibly degraded assets.

**Design change:** Cover hero requires a better derivative and re-import.

**Verification evidence:** Whole-spread screenshot and asset ledger state `REJECT_LOW_QUALITY_DERIVATIVE`.

**Applies to:** all versions

**Status:** PROMOTED

**Promoted knowledge-base section:** Photography; Three-scale review

---

## LESSON-003 — An IMAGE fill count does not prove editorial correctness

**Date:** 2026-08-02

**Context:** V5 live Figma audit

**Observed failure or opportunity:** All thirteen semantic photo roles had IMAGE fills, but some fills were older, reassigned, low-resolution, or visually unsuitable.

**Root cause:** Structural presence was treated as content and quality evidence.

**General editorial principle:** A photograph role passes only when the intended source, crop, contrast, and visual function all pass.

**Process change:** Require Drive ID → node ID → image hash mapping plus screenshot QA.

**Design change:** Re-review every photo role rather than accepting fill presence.

**Verification evidence:** Live fill/hash audit and screenshots.

**Applies to:** all versions

**Status:** PROMOTED

**Promoted knowledge-base section:** Photography; Three-scale review

---

## LESSON-004 — More cards and badges do not create magazine authenticity

**Date:** 2026-08-02

**Context:** V5 outer and inside spread review

**Observed failure or opportunity:** Repeated rounded boxes, pill labels, shadows, and stickers made portions of the paper item resemble a web dashboard or Canva template.

**Root cause:** Visual richness was pursued through repeated containers rather than hierarchy, photography, typography, and alignment.

**General editorial principle:** Editorial richness comes from content scale, reading order, captions, image ratios, typography, and controlled density. Containers must have a semantic job.

**Process change:** During every final review, attempt at least one subtraction and classify each card/badge by purpose.

**Design change:** Supporting information should move toward direct type, rules, and white space where containment is unnecessary.

**Verification evidence:** Whole-spread visual comparison before and after reduction.

**Applies to:** all versions

**Status:** PROMOTED

**Promoted knowledge-base section:** Cards, badges, stickers, and shadows

---

## LESSON-005 — Dominant images must be fixed before micro-decoration

**Date:** 2026-08-02

**Context:** V5 prioritization

**Observed failure or opportunity:** Small detail polishing could continue while cover hero, back main, and history imagery remained visibly weak.

**Root cause:** Tasks were ordered by availability rather than editorial impact.

**General editorial principle:** The largest and most emotionally important elements determine the spread more than micro-details.

**Process change:** Work by visual impact batches: dominant images → identity/lead images → supporting images → micro-details.

**Design change:** Batch A prioritizes cover hero, back main, and history.

**Verification evidence:** Thumbnail comparison after dominant-image replacement.

**Applies to:** all versions

**Status:** PROMOTED

**Promoted knowledge-base section:** Build the page in layers; Photography

---

## LESSON-006 — Japanese typography requires its own QA pass

**Date:** 2026-08-02

**Context:** V5 body copy, labels, and captions

**Observed failure or opportunity:** A visually lively page can still feel templated or amateur when Japanese line breaks, punctuation, line height, and hierarchy are unresolved.

**Root cause:** Typography was reviewed as decoration rather than reading infrastructure.

**General editorial principle:** Japanese composition, hierarchy, and actual-size legibility are core editorial design, not final polish.

**Process change:** Add independent Japanese typography QA using JLREQ/JIS-based checks and long-copy stress tests.

**Design change:** Define five text levels and review prohibited line-start/end characters, dates, Latin letters, captions, and microcopy.

**Verification evidence:** Page-level and actual-size text review.

**Applies to:** all versions

**Status:** PROMOTED

**Promoted knowledge-base section:** Typography system

---

## LESSON-007 — Controlled irregularity needs an invisible grid

**Date:** 2026-08-02

**Context:** Rurubu-style lively composition

**Observed failure or opportunity:** Rotation, overlap, and varied cards can create energy, but without common edges, baselines, or counterweights they appear random.

**Root cause:** Surface irregularity was confused with editorial rhythm.

**General editorial principle:** Lively magazine layouts are usually stabilized by an underlying grid, repeated alignments, captions, and balanced visual weight.

**Process change:** Identify the grid edge or baseline supporting every deliberate break from alignment.

**Design change:** Preserve asymmetric hierarchy while reducing arbitrary rotations and unsupported overlaps.

**Verification evidence:** Guide-on structural inspection and guide-off whole-spread review.

**Applies to:** all versions

**Status:** PROMOTED

**Promoted knowledge-base section:** Spread design; Grid systems

---

## LESSON-008 — Generated profile people must not impersonate the couple

**Date:** 2026-08-02

**Context:** V5 groom/bride dummy roles

**Observed failure or opportunity:** Realistic generated faces may look polished but can be interpreted as the actual bride or groom.

**Root cause:** Image realism was prioritized over semantic honesty.

**General editorial principle:** A dummy must communicate role and atmosphere without creating false personal identity.

**Process change:** Prefer back views, silhouettes, hands, travel objects, distant figures, or non-identifiable crops for dummy identity roles.

**Design change:** Crop or replace overly identifiable generated profile images before role pass.

**Verification evidence:** Screenshot review and source-status label.

**Applies to:** all versions

**Status:** PROMOTED

**Promoted knowledge-base section:** Photography

---

## LESSON-009 — V6 must inherit judgment, not V5 composition

**Date:** 2026-08-02

**Context:** Hawaii / tropical-resort V6 planning

**Observed failure or opportunity:** A new version can become a superficial reskin when it reuses the previous hero arrangement, card geometry, and decorative density.

**Root cause:** Efficiency can accidentally preserve the same visual skeleton.

**General editorial principle:** A genuinely new editorial direction requires a new content hierarchy, photography plan, grid tension, and spread rhythm.

**Process change:** V6 receives a clean-room research matrix, new generated masters, separate Drive/Figma structures, and at least two structurally different outer concepts.

**Design change:** No V5 photo reuse or automatic layout copying.

**Verification evidence:** Structural comparison between V5 and V6 thumbnails and layer maps.

**Applies to:** V6 and later alternate versions

**Status:** PROMOTED

**Promoted knowledge-base section:** V5-to-V6 transfer rules

---

## LESSON-010 — Knowledge must be reviewed before tools are used

**Date:** 2026-08-02

**Context:** Ongoing autonomous improvement

**Observed failure or opportunity:** An automation can perform many Figma operations without improving editorial quality if it does not begin with design intent and the knowledge base.

**Root cause:** Tool execution can become the proxy for progress.

**General editorial principle:** Editorial judgment precedes execution. A design action needs a stated problem, principle, expected improvement, and verification method.

**Process change:** Every autonomous run must read the knowledge base and lessons log, then declare internally which editorial principle the next change tests.

**Design change:** No change should be made only because a tool call is available.

**Verification evidence:** Git record must name the visual problem, principle applied, and screenshot result for meaningful design changes.

**Applies to:** all versions

**Status:** PROMOTED

**Promoted knowledge-base section:** Learning and error-conversion loop; Mandatory pre-design questions

---

## LESSON-011 — Closing editorial notes can use rule + direct type instead of a full footer card

**Date:** 2026-08-07

**Context:** V5 inside-left `TRAVEL NOTE` (`77:330`–`77:332`)

**Observed failure or opportunity:** The useful closing note was contained in a `702 × 102` dark rounded card whose visual weight exceeded the importance of the content and reintroduced a Web-UI/footer-card silhouette.

**Root cause:** Contrast and grouping were solved with a full container even though the warm paper background already supported direct native type.

**General editorial principle:** When a closing note does not need image-backed contrast, test a lightweight separator plus direct type before retaining a full card. Preserve the content and hierarchy; remove only the unnecessary containment.

**Process change:** For low-priority editorial notes, compare `direct type → rule → minimal field → full card` in that order. Adopt the least container-heavy option that still passes reading and actual-size QA.

**Design change:** `77:330` became a `702 × 4` square pink rule; `77:331` changed to pink native text; `77:332` changed to navy native text. No copy, semantic node, image role, or rollback state changed.

**Verification evidence:** Whole-spread and left-page screenshots passed; inside structure audit remained at `92` native text nodes and `9` IMAGE-fill nodes; fold guide `77:540` and rollback frames `59:2` / `59:178` remained preserved. Detailed evidence: `learning-runs/2026-08-07-v5-travel-note-card-to-rule.md`.

**Applies to:** V5; candidate for later editorial versions when the same contrast conditions hold

**Status:** TESTED

**Promoted knowledge-base section:** Not yet promoted; requires repeated evidence before becoming a broader rule.

---

## LESSON-012 — Redundant profile ribbons can weaken direct identity hierarchy

**Date:** 2026-08-07

**Context:** V5 inside-left profile area, nodes `77:335`–`77:338`.

**Observed failure or opportunity:** The spread already identified the two people through the section heading, large native names, distinct profile photographs, metadata, and colored vertical rules. Rotated `新郎 PROFILE` / `新婦 PROFILE` ribbons repeated the same role and added sticker/tape geometry without additional navigation or information.

**Root cause:** Identity distinction had been solved twice: first by the profile composition itself, then again by decorative labels.

**General editorial principle:** When names, photographs, position, and editorial rules already establish identity, test removing secondary role ribbons before refining them. Keep a role label only when removing it creates genuine ambiguity.

**Process change:** During profile QA, classify every role label as essential identification, navigation, or decoration. Subtract labels that duplicate information already carried by stronger hierarchy.

**Design change:** Hid `77:335 / PROFILE_RIBBON_A`, `77:336 / PROFILE_RIBBON_A_TXT`, `77:337 / PROFILE_RIBBON_B`, and `77:338 / PROFILE_RIBBON_B_TXT`. Nodes were not deleted; rollback remains immediate.

**Verification evidence:** Whole-spread and page screenshots retained clear SHOGO/SHI-CHAN identity and reading order. Structure audit: `92` native text nodes, `57` visible text nodes, `9` IMAGE-fill nodes; fold guide `77:540` and rollback frames `59:2` / `59:178` preserved; history image hash remained `1bfd7f1fa601206bfed1594a140b40554e85d77a`. Detailed evidence: `learning-runs/2026-08-07-v5-profile-ribbon-subtraction.md`.

**Applies to:** V5; candidate for later profile/editorial pages under the same conditions

**Status:** TESTED

**Promoted knowledge-base section:** Not yet promoted; requires repeated evidence before broader adoption.

---

## LESSON-013 — Subtraction can create dead zones that require spacing re-balance

**Date:** 2026-08-07

**Context:** V5 inside-left page after profile-card/ribbon reductions.

**Observed failure or opportunity:** Earlier subtraction improved the profile hierarchy but left an excessive vertical pause between the profile content and `3 QUESTIONS`, while the lower modules still finished relatively close to the bottom edge.

**Root cause:** Removing containers and decorative layers changed the perceived density, but the old Y positions were retained as if the previous visual mass still existed.

**General editorial principle:** White space is valuable only when it clarifies hierarchy. After subtraction, re-evaluate rhythm rather than preserving legacy spacing automatically; a dead zone and intentional quiet space are not the same thing.

**Process change:** After any meaningful subtraction pass, compare the resulting page rhythm at whole-page scale and test bounded spacing re-balance before adding new decoration.

**Design change:** Created comparison frame `334:2 / V5_INSIDE_LEFT_RHYTHM_TEST_2026_08_07`, then moved the bounded Q&A/common/travel-note lower-half families upward by `52 px` in Current after the duplicate won the comparison. No copy, image, crop, size, or semantic role changed.

**Verification evidence:** Whole-page and whole-spread screenshots show improved continuity from profiles → questions → common points → travel note. Post-change structure audit retained `92` native text nodes, `57` visible text nodes, all `7 / 7` inside semantic image-role IMAGE fills, history hash `1bfd7f1fa601206bfed1594a140b40554e85d77a`, fold guide `77:540`, and rollback frames `59:2` / `59:178`. Detailed evidence: `learning-runs/2026-08-07-v5-inside-left-rhythm-compression.md`.

**Applies to:** V5; candidate for broader editorial use after repeated evidence

**Status:** TESTED

**Promoted knowledge-base section:** Not yet promoted; one verified V5 case is insufficient for PROJECT_RULE.

---

## LESSON-014 — Retire stale legacy roles instead of forcing them back into Current

**Date:** 2026-08-07

**Context:** V5 back-cover `FRIENDS & FAMILY`, registered role `V5-11 / 77:35`.

**Observed failure or opportunity:** The Current back cover had already evolved to a clean two-photo Friends & Family composition, while the asset ledger still required a third hidden legacy photo role. Following the old denominator would have forced a visually rejected module back into Current merely to complete the checklist.

**Root cause:** The ledger preserved an earlier semantic inventory after the editorial Current had materially changed. Registered provenance and active visual scope were treated as the same concept.

**General editorial principle:** A production ledger should preserve history without allowing stale legacy structure to dictate the current design. A role may be retired from active visual scope when a rollback-safe comparison proves it no longer improves the page. Retirement is not completion and must not erase provenance.

**Process change:** Distinguish `total registered roles`, `active Current roles`, and `retired preserved roles`. Before retiring a legacy role, create a safe comparator, review whole-item and reading-scale consequences, preserve the original semantic nodes and source master, and record a reversible retirement state.

**Design change:** Current `77:35`–`77:38` remains hidden. Comparison frame `336:2 / V5_BACK_FRIENDS_3UP_TEST_2026_08_07` restored the third group only in the duplicate. The three-up version produced collision/overlap and weaker Friends→route rhythm, so Current two-up remained unchanged. V5-11 was retired from the active completion denominator while its Drive master and semantic nodes were preserved.

**Verification evidence:** Live Current screenshot, rejected comparison screenshot, live node visibility/hash inspection, Drive readback for `11_FRIENDS_FAMILY_01_TOAST_DUMMY.png` (`1zZfvktztbPx59Yb0Gxor8IsbGG1w6Fq8`), and `learning-runs/2026-08-07-v5-friends-two-up-scope-comparison.md`.

**Applies to:** V5; candidate for broader project governance after repeated evidence

**Status:** TESTED

**Promoted knowledge-base section:** Not yet promoted. One role-retirement case is insufficient for PROJECT_RULE.

---

## Open candidate lessons

Use this area for observations that require further evidence before promotion.

### CANDIDATE-001 — Optimal density for A4 two-fold travel-magazine profile books

Need evidence from:

- actual-size print
- reading distance
- final copy lengths
- fold behavior
- guest readability

Do not convert this into a rigid module-count rule yet.

### CANDIDATE-002 — Best balance of authentic Rurubu abundance and premium wedding restraint

Need comparative screenshot and print evidence from:

- V5 Yokohama direction
- V6 Hawaii/resort direction
- user preference after side-by-side review

The correct balance may differ by version and should not be reduced to a single universal badge/card limit.
