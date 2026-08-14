# Rurubu → Shared Design Learning Feed

Owner: Rurubu WEDDING hourly improvement task
Opened: 2026-08-15

Read `SHARED-DESIGN-LEARNING-SYSTEM.md` before using this feed.

This is an append-oriented neutral feed for generalizable lessons verified by Rurubu work. It is not a Rurubu production authority and does not grant non-Rurubu workers permission to inspect Rurubu item-specific Figma, Drive, ledgers, or GitHub paths.

## Seed lessons from verified Rurubu work

### RSL-001 — Completion states must stay separate

State: `PROMOTED_PROJECT_RULE`

Generated, saved, transported, placed, structurally present, screenshot-verified, and visually approved are different states. Never collapse them into one completion claim.

Transfer value: all Figma/asset workflows.

Do not transfer: any Rurubu-specific visual treatment.

### RSL-002 — Dominant image quality is upstream of layout impact

State: `CROSS_ITEM_CANDIDATE`

A technically placed low-quality raster can pass structure checks while failing actual-size print review. Determine target printed role/crop and role-sized quality before enlarging imagery to solve hierarchy.

Transfer hypothesis: non-Rurubu items that use hero photography or atmosphere imagery should verify source fidelity before increasing image scale.

Do not transfer: Rurubu photo ratios or hero geometry.

### RSL-003 — UI-like containment often hides weak hierarchy

State: `CROSS_ITEM_CANDIDATE`

Repeated rounded cards, pills, badges, shadows, and large containment fields can simulate activity while weakening print/editorial hierarchy. Test direct type, alignment, rule, crop, overlap, and scale before adding a full container.

Transfer hypothesis: applicable to other print items when card geometry has no semantic/physical job.

Do not transfer: blanket removal of all containers; ticket/passport artifacts may require bounded physical fields.

### RSL-004 — Clean-room comparison prevents legacy lock-in

State: `CROSS_ITEM_CANDIDATE`

If the current composition would not be selected from scratch, incremental polish is not sufficient evidence. Build a materially different rollback-safe candidate and compare at thumbnail, reading, and actual-size scales.

Transfer value: visual-reopened items and any design stuck in local optimization.

### RSL-005 — Same failure fingerprint twice means method switch

State: `PROMOTED_PROJECT_RULE`

When the same tool/environment/input-contract fingerprint fails twice without a material capability change, stop cosmetic retries. Change transport/method or continue another safe target.

Transfer value: Figma binary transfer, Drive upload, image generation/placement, and other repeatable production capabilities.

### RSL-006 — Photo-role redistribution can outperform adding assets

State: `CROSS_ITEM_CANDIDATE`

Source problem: Rurubu FC outer had a large UI-like caption field and repeated one coast source across two major outer-cover roles.

Root-cause hypothesis: density was being carried by containment and repeated image mass instead of distinct dominant/support roles.

Bounded test: on rollback-safe FC, widen the vertical street anchor, reduce the caption field to a thin rule, and replace the repeated secondary source with an already verified alternate Rurubu image.

Expected improvement: clearer asymmetric hierarchy and less template/grid reading without new decoration or new asset generation.

Regression risk: dead space or reduced caption contrast.

Three-scale evidence: 500px thumbnail PASS; 1000px spread PASS; 794×1123 front PASS. Absolute text intersections 0; 18px text safe-area risk 0.

Figma evidence: FC `1180:2`; alternate source `1107:552` → target `1180:133`, hash `c09aa82e7b2ac75708707345c6f845452bf67663`.

Status: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

What must remain Rurubu-specific: photo ratios, overlap angles, magenta/cyan/yellow palette, Japanese travel-magazine grammar, exact image choices.

Cross-item applicability: other print items may independently test (a) full-field-to-rule subtraction and (b) duplicate-source audits before generating additional imagery.

### RSL-007 — Photo orientation can be a hierarchy decision, not just a crop decision

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Source problem: FC retained a wide horizontal hero band between the cream masthead and the stronger overlapping lower collage, so the cover still read partly as stacked web-like sections.

Root-cause hypothesis: the problem was not missing imagery but the **orientation and editorial role** assigned to existing photography. A continuous vertical photo spine can unify a print page when secondary images already provide enough lateral rhythm.

Bounded test: on rollback-safe duplicate FD/FE, hide the non-Q60 wide-band hero, promote a verified street image to a tall photo spine, keep one large angled secondary photo and one smaller destination photo, and preserve the bounded exact Q60 postcard role. Strengthen Feature 02 typography without introducing a new card.

Expected improvement: continuous page rhythm, clearer asymmetric photo hierarchy, less section-band reading, and reduced dependence on a weak dominant proxy.

Regression risk: source-detail exposure from enlarging a vertical role, excessive occlusion from the angled overlap, or text collisions on the rotated secondary photo.

Three-scale evidence: 500px whole-item PASS; 1000px spread PASS; 794×1123 actual-size front PASS. Final FE front has 15 visible native text nodes, 4 visible IMAGE fills, absolute text intersections 0, 18px text safe-area risk 0, and fold guide x=792.7 / width=2.

Figma evidence: FE `1186:2`, front `1186:132`; vertical spine hash `439a719d73f28e8dd2889f2026cccb15f345ec63`; angled secondary hash `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`; lower destination hash `c09aa82e7b2ac75708707345c6f845452bf67663`; exact Q60 secondary node `1186:189` hash `644f449c3bf2001a94d4b822d2b55e2614c11042`.

Status: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

What must remain Rurubu-specific: specific photo choices, overlap angles, the giant `横浜` title, magenta/cyan/yellow palette, and Japanese travel-magazine visual grammar.

Cross-item applicability: when a print item feels like stacked horizontal sections, another item may independently test whether changing a dominant image from a wide band to a continuous spine/field improves editorial continuity before generating new imagery.