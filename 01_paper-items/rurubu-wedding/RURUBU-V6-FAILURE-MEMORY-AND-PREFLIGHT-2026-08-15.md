# Rurubu WEDDING V6 — Failure Memory & Preflight

Date: 2026-08-15
Scope: Rurubu WEDDING V6 and later clean-room editorial work

## Purpose

V6 must not repeat V5 failures just because the visual target changes. This document converts repeated V5 failures into explicit V6 preflight checks, stop conditions, and replacement methods.

This is not a permanent project rule by existence alone. Each item below is either already supported by repeated V5 evidence or remains a V6 guardrail candidate. New lessons still follow DISCOVERED → PROTOTYPED → VERIFIED → PROJECT_RULE.

## Failure taxonomy

### F-01 — Binary asset transport was treated as an image-design problem

**Observed failure**

A verified high-quality Drive master existed, but exact Figma placement repeatedly failed through transport paths:

- single-use Figma upload target created successfully, but execution environment could not resolve `mcp.figma.com`
- long/model-visible base64 transfer produced truncation or integrity failures
- some Plugin API image creation attempts rejected the payload/image type atomically

**Root cause**

The source image quality and the transport capability were separate problems, but repeated runs sometimes spent too much time trying another variant of the same blocked transport path.

**V6 response**

- Treat transport capability as a preflight dependency, not as a design iteration.
- Before generating a production-critical image, prove one binary-safe path end-to-end with a disposable test asset.
- If the same transport fingerprint fails twice, mark that route `BLOCKED` for the session and do not retry with cosmetic parameter changes.
- Continue typography, composition, crop, or other safe work instead of burning the run on transport.
- Never call an image complete until Drive ID → Figma node ID → image hash → screenshot QA is closed.

### F-02 — Weak raster assets were enlarged to create impact

**Observed failure**

Low-resolution/proxy imagery sometimes looked acceptable at thumbnail scale but showed blockiness or synthetic softness at actual-size print review when enlarged.

**Root cause**

Editorial hierarchy was occasionally solved by increasing image area before checking source fidelity and role-sized resolution.

**V6 response**

- Source fidelity before scale.
- Determine target printed dimensions and crop before choosing/generating the image.
- Never promote a weak source to dominant-photo status simply because the composition needs a hero.
- If the best available source is limited, reduce its printed role and create hierarchy with stronger typography, overlap, and verified supporting images.

### F-03 — Incremental cleanup preserved the wrong composition too long

**Observed failure**

Legacy-derived V5 could become cleaner while still retaining brochure/web structure: horizontal section bands, repeated cards, centered modules, equal photo sizes, and safe-but-timid hierarchy.

**Root cause**

Local polishing optimized the existing arrangement instead of asking whether the arrangement would be chosen from scratch.

**V6 response**

- V6 starts clean-room; V5 geometry is reference evidence, not a starting template.
- Build at least two materially different macro-compositions before detailed polishing.
- No candidate may win because it is already more finished.
- Compare silhouette first: thumbnail/whole-item before captions, decoration, or micro-alignment.

### F-04 — “Magazine energy” was simulated with UI containers

**Observed failure**

Rounded cards, wide color fields, badges, shadows, and repeated strips sometimes increased activity but made the result resemble a landing page, dashboard, or Canva wedding template.

**Root cause**

Density was created through containers rather than editorial hierarchy.

**V6 response**

Use this default order before adding a container:

1. photo scale/crop
2. typography scale/weight
3. overlap and alignment
4. white-space compression/expansion
5. thin rule or small label
6. minimal square field only if contrast/semantic containment is genuinely required
7. full card only as last resort

Every card/field must be able to answer: “What information or contrast job exists that direct type cannot perform?”

### F-05 — Irregularity became collage noise

**Observed failure**

Rotation and overlap increased energy, but some experiments became scrapbook-like, random, or visually unstable.

**Root cause**

Surface irregularity was added without an invisible alignment system or a clear dominant/support hierarchy.

**V6 response**

- Every deliberate misalignment must have a stabilizing edge, baseline, fold relationship, or visual counterweight.
- One dominant photo, one primary text anchor, and a limited number of secondary disruptions per page.
- Rotation is a compositional tool, not decoration.

### F-06 — Structural QA passed while rendered typography was still broken

**Observed failure**

Examples included a large `01` wrapping visually even when collision checks passed, and text boxes that were technically non-overlapping but looked crowded or clipped at actual size.

**Root cause**

Geometry/structure checks were treated as sufficient evidence for rendered Japanese typography.

**V6 response**

Every promoted candidate requires both:

- structural QA: native text, bounds, absolute intersections, safe area, fold
- rendered QA: glyph fit, line break, punctuation, contrast, optical spacing at actual printed size

`collision = 0` is necessary but never sufficient.

### F-07 — Same-parent intersection checks missed real cross-parent collisions

**Observed failure**

Separate parent groups could overlap on the final page while local same-parent checks remained clean.

**Root cause**

QA scope followed layer hierarchy instead of final rendered coordinates.

**V6 response**

- Use absolute-coordinate collision checks for the full visible page/spread before promotion.
- Parent-local checks remain useful for diagnosis but cannot be the final gate.

### F-08 — Thumbnail success hid actual-size print failure

**Observed failure**

Some candidates looked energetic and strong at 500px but exposed raster weakness, cramped text, over-dense overlaps, or amateur detail at 1:1 print review.

**Root cause**

One scale was allowed to dominate judgment.

**V6 response**

The three-scale gate is mandatory and ordered:

1. thumbnail/whole-item — silhouette, hierarchy, rhythm
2. reading/page — reading order, density, caption relationships
3. actual-size/detail — raster quality, glyph fit, safe area, fold plausibility, optical spacing

A candidate rejected at any scale is not “almost done”; it returns to prototype.

### F-09 — Figma candidate sprawl obscured authority

**Observed failure**

Many sequential comparator frames accumulated and made it hard to know Current, active Best, working candidates, rejected studies, and rollback evidence.

**Root cause**

Experiments were preserved, but information architecture for the design file lagged behind experimentation speed.

**V6 response**

Maintain these roles from day one:

- `00_START_HERE`
- `01_CURRENT_REFERENCE`
- `02_V6_CLEANROOM_WORKING`
- `03_V6_REVIEW`
- `06_V6_STUDIES`
- `90_ARCHIVE`

Working contains only active candidates. Rejected/superseded experiments move to Studies/Archive immediately after evidence is captured. Review shows only current winners plus hidden rollback snapshots.

### F-10 — Authority drift occurred between live Figma, Review labels, Start Here, ledgers, and GitHub

**Observed failure**

A newer live candidate could exist while Start Here or GitHub authority still named an older winner.

**Root cause**

Promotion was treated as a Figma edit rather than a multi-system transaction.

**V6 response**

Promotion is atomic at the workflow level:

1. promote Working candidate
2. create/update Review snapshot
3. preserve previous winner as hidden rollback
4. update Start Here
5. fresh Figma readback
6. update ledger/authority in Git
7. GitHub readback

If any step fails, status is `PROMOTION_PARTIAL`, not Best-complete.

### F-11 — Asset states were collapsed into one progress claim

**Observed failure**

Generated, saved, adopted, placed, and visually verified were sometimes easy to conflate.

**Root cause**

The workflow did not always enforce state names in reporting.

**V6 response**

Every generated/selected asset must expose these independent states:

- `generated_or_selected`
- `visual_master_pass`
- `drive_saved`
- `drive_readback_verified`
- `derivative_pass`
- `figma_placed`
- `node_hash_verified`
- `screenshot_verified`
- `structure_verified`
- `role_complete`

No later state is implied by an earlier one.

### F-12 — Repeating known failures consumed runs without increasing design quality

**Observed failure**

DNS upload failures, base64 integrity failures, and some atomic Figma write failures recurred across runs.

**Root cause**

Failure memory existed in logs but was not always consulted as a stop-list before execution.

**V6 response**

Introduce a `KNOWN FAILURE FINGERPRINT` check before each risky operation.

A failure fingerprint contains:

- operation/method
- exact failure class
- environment/date
- affected asset/node
- mutation occurred? yes/no
- safe fallback
- retry condition

If method + failure class + environment match a known blocked fingerprint, do not retry unless the retry condition has changed.

## V6 preflight — must pass before production concept work

### Tool/capability preflight

- [ ] Figma safe duplicate creation works.
- [ ] Figma bounded text/geometry mutation works.
- [ ] Screenshot/readback works at required scales.
- [ ] If new binary imagery is required, a disposable binary file can complete Drive/local → Figma → image hash → screenshot readback.
- [ ] Known blocked transport fingerprints have been loaded and excluded.

### Editorial preflight

- [ ] V6 concept brief defines one dominant photo role per page/spread.
- [ ] Target print dimensions and folds are fixed before image generation.
- [ ] Photo roles include target crop, safe text zone, focal point, and minimum useful resolution.
- [ ] No V5 card geometry or hero placement is inherited by default.
- [ ] At least two materially different macro-compositions are planned.
- [ ] Japanese type hierarchy is defined before decorative devices.

### Asset-generation preflight

For every generated image role, art direction must include:

- exact editorial role
- target aspect ratio and expected crop
- focal point location
- native-text safe zone
- photographic character/lens/lighting
- believable Japanese travel-magazine print character
- explicit negatives: fake text/signage/UI, warped architecture, plastic surfaces, excessive bokeh, oversaturated fantasy, stock/AI polish
- identity restriction: generated people must never represent the real couple/family/friends/dog

Do not generate until the role has a concrete visual defect or need.

## V6 promotion gate

A V6 candidate may become Best only when all are true:

- materially different from legacy-derived V5
- thumbnail winner or competitive at whole-item scale
- reading/page hierarchy verified
- actual-size print detail verified
- Japanese glyph/line-break QA passed
- absolute collision = 0
- fold/safe area plausible
- native editable text preserved
- non-destructive crops preserved
- image provenance state explicit
- Review + Start Here + Git authority synchronized
- previous Best retained as rollback

## Stop conditions

Stop or switch method immediately when:

- same failure fingerprint occurs twice
- an external capability blocker prevents safe mutation
- a generated image fails the role brief twice in the same way; revise art direction before generating again
- added decoration is compensating for a weak dominant image or weak hierarchy
- actual-size quality worsens even if thumbnail quality improves
- the candidate only wins because it has received more polishing time

## V6 core operating principle

**Do not make V6 by fixing V5. Make V6 from the lessons that V5 paid to discover.**

Preserve facts, provenance, semantic editability, rollback, and verified knowledge. Re-invent composition, scale, photography, crop, typography, and editorial rhythm from a clean sheet.
