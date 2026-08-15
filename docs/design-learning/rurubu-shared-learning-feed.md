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

When the same tool/environment/input-contract fingerprint fails twice without a material capability change, stop cosmetic retries. Change transport/method or continue another safe visual target.

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

### RSL-008 — Subtraction needs a binding-function check; small timeline modules still carry visual mass

State: `VERIFIED_CROSS_ITEM`

Source problem: FE's back-cover six-event travel timeline was technically readable but visually too quiet at whole-item scale. In parallel, FG tested removing Feature 02's white photo border and cyan rule to reduce card/UI feeling.

Root-cause hypothesis: two different issues were being conflated. The timeline needed more hierarchy, while the Feature 02 border/rule had a real physical/editorial binding function between photo and caption. Blind subtraction weakened that relationship instead of improving it.

Bounded test: FG removed/reduced the Feature 02 framing treatment and tried both wide and portrait-like photo clipping; both variants were rejected at whole-item scale. FH left the accepted front photo treatment intact, enlarged native timeline title/date/label hierarchy, tightened the 3×2 event rhythm, and used six short purposeful color rails without adding cards or assets.

Expected improvement: stronger back-cover closure and better information hierarchy without increasing decoration or asset count.

Regression risk: enlarged dates can consume footer/safe-area reserve; colorful rails can become decorative noise; preserving a border/rule can slide back into card UI if it has no actual binding function.

Three-scale evidence: 500px whole-item PASS; 1000px spread PASS; actual-size back `1190:195` ≈ 798×1123 PASS; actual-size front `1190:324` = 794×1123 PASS. Final FH has 35 visible native text nodes, 7 visible IMAGE fills, 0 same-parent absolute text intersections and 0 18px text safe-area risks.

Figma evidence: FH `1190:194` adopted before FJ; FE `1186:2` hidden rollback; FG `1190:2` hidden rejected study; exact secondary Q60 node `1190:381` hash `644f449c3bf2001a94d4b822d2b55e2614c11042`.

Cross-item verification: neutral non-Rurubu lesson `NRSL-002` independently reproduced the binding-function check on ADD-10 with a materially different physical artifact. It compared a deeper information block with and without an extended accent seam and retained the seam only because whole-item QA showed that it bound upper and middle information regions. No Rurubu layout, asset, palette, geometry, or production state was inspected or copied.

Status: `VERIFIED_CROSS_ITEM`.

What must remain Rurubu-specific: the exact 3×2 layout, rail colors, title scale, photo framing, palette and travel-magazine treatment.

Cross-item applicability: before removing or extending a border/rule/rail during UI-subtraction or spacing polish, verify whether it performs a real image-caption/title-body/physical-region binding function at thumbnail scale.

### RSL-009 — A full-bleed image field can remove a print page's false header section without adding decoration

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Source problem: FH back cover still read as `cream header → large photo → lower collage/timeline`, which preserved a stacked web-section rhythm even though the individual modules were already print-oriented.

Evidence before change: FH `1190:194` passed structure and actual-size QA, but 500px whole-item comparison showed the top cream band functioning as an isolated header rather than part of the photographic page.

Root-cause hypothesis: the page break was being created by background segmentation, not by missing information or missing assets. Letting the existing dominant photo continue behind the native headline could unify the page while preserving editability and hierarchy.

Bounded test: create FJ `1193:2` from FH, change only the back-cover dominant photo from `y=150 / h=530` to `y=0 / h=650`, keep the native navy headline/subhead above it in z-order, preserve all lower collage/timeline content, and add no new card, shadow, gradient, asset, or text. A separate FI study `1192:2` removed the lower-right photo and enlarged the center image; it created dead cream space and was rejected/hidden.

Expected improvement: a single continuous back-cover editorial field, stronger photo-led first read, less section-band/UI rhythm, and better thumbnail cohesion without increasing decorative density.

Regression risk: headline contrast can fail on a bright photo; a weak raster can become visibly soft when enlarged; removing a lower photo can create dead space even if the page becomes simpler.

Three-scale evidence: FJ 500px whole-item PASS and stronger than FH; 1000px/read-equivalent composition preserved; actual-size back `1193:3` 798×1123 PASS; actual-size front `1193:132` 794×1123 PASS. Structure readback: 35 visible native text nodes, 7 visible IMAGE fills, absolute text intersections 0, 18px text safe-area risks 0.

Figma evidence: FJ `1193:2` promoted; FH `1190:194` hidden rollback; FI `1192:2` hidden rejected study. Back dominant image hash remains `adbb8e529451a81dd25e4eb29bf068655569ce25`; no asset provenance changed.

Asset/transport evidence: Q60 master Drive `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr` was materialized and visually inspected, but official upload target POST again hit the already-known `mcp.figma.com` DNS failure fingerprint before mutation. Per RSL-005, that method was not retried. Exact secondary Q60 remains Drive `1aVp34U5qUTqd9FR3AILmJggdWwY1lAJb` → FJ node `1193:189` → hash `644f449c3bf2001a94d4b822d2b55e2614c11042`.

What must remain Rurubu-specific: exact headline placement, destination photography, collage density, timeline geometry, and Rurubu-like editorial grammar.

Cross-item applicability: when another print artifact visually breaks into a false header band plus body even though the content is coherent, independently test whether extending an existing legitimate image/texture field behind native type improves continuity before adding another container or decorative device.

### RSL-010 — Destination-semantic coherence is a dominant-photo QA dimension

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Source problem: FJ's back dominant photo was visually strong but read as a foreign cliff/coast destination, weakening the Yokohama issue identity.

Root-cause hypothesis: image quality is not only resolution, crop and beauty. A dominant photograph can be technically excellent and still be wrong when its place/story semantics conflict with native editorial context.

Bounded test: FL `1195:2` replaced only the back dominant image with an existing verified waterfront source, preserved native headline, lower collage, timeline and all front content, and rebalanced existing vertical positions without adding assets or containers.

Expected improvement: stronger front/back destination coherence and less synthetic travel-collage feeling.

Regression risk: semantically safer city imagery can still feel generic; role and crop must remain editorially intentional.

Three-scale evidence: 500px whole-item PASS; 1000px spread PASS; actual-size back ≈798×1123 PASS; 35 visible native texts; 7 IMAGE fills; absolute text intersections 0; 18px safe-area risks 0.

Figma evidence: FL `1195:2`, back `1195:3`, dominant source node `1195:6`, hash `539c259be8036b481d06b4f76db9a39b407d90e8`.

What must remain Rurubu-specific: Yokohama subject, exact image, crop, headline, timeline geometry and magazine grammar.

Cross-item applicability: other print items can independently test whether a dominant image contradicts the artifact's place/story semantics before solving the problem with more decoration or generation.

### RSL-011 — An invented face must never inherit a real-person identity label

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Source problem: EO's profile page paired recognizable generic/generated people with native `SHOGO` / `SHI-CHAN` labels, which could falsely represent strangers as the real couple.

Root-cause hypothesis: when verified real-person photography is unavailable, identity should remain in native editable text while raster imagery carries non-person atmosphere, objects, destination or explicitly replaceable placeholders.

Bounded test: FM `1196:285` replaced only the two profile raster roles with already-verified non-person travel/lifestyle atmosphere sources, preserved native names and factual copy, and rebalanced question hierarchy without new cards/shadows/gradients.

Expected improvement: remove false-identity risk while retaining a strong editorial profile page and editable identity facts.

Regression risk: non-person lifestyle imagery can become generic stock or be mistaken for final real-photo authority; keep it semantically named and replaceable.

Three-scale evidence: 1000px spread PASS; actual-size left 794×1123 PASS; final structure 52 visible native texts; 6 IMAGE fills; absolute text intersections 0; 18px safe-area risks 0.

Figma evidence: FM `1196:285`; non-person profile nodes `1196:290` hash `c1ada11205bc3978bf426b304d683f1c1566cac2` and `1196:295` hash `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`; EO retained as hidden rollback.

What must remain Rurubu-specific: cafe/dining image choices, profile composition, question geometry, colors and travel-magazine treatment.

Cross-item applicability: any wedding artifact that labels a real person must independently verify image identity authority. If verified real photography is absent, use non-person atmosphere or an explicit replaceable placeholder rather than a generated recognizable stranger.

### RSL-012 — Image-role semantics should be reviewed as a set, not one photo at a time

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Source problem: FN's `思い出スポット` cluster combined individually valid imagery whose destination/story semantics conflicted with the surrounding native editorial context. The large coast/resort lead made the page read as a synthetic multi-destination collage even though each raster itself had already passed technical/provenance checks.

Evidence before change: FN `1199:2` had passed profile identity-label separation, structure and actual-size QA, but the lower right page still mixed foreign-looking coast/resort imagery with the Yokohama-oriented issue and captions.

Root-cause hypothesis: individual source quality, crop and provenance are necessary but not sufficient. Adjacent photo roles form a narrative set; semantic contradictions between those roles can undermine plausibility. Asset repetition is a separate concern and should not be solved by subtraction when subtraction destroys visual binding.

Bounded test: FO `1200:2` retained the full native structure and reassigned only the three lower image roles to already-verified Rurubu sources: street hash `439a719d73f28e8dd2889f2026cccb15f345ec63`, exact Q60 Yokohama secondary hash `644f449c3bf2001a94d4b822d2b55e2614c11042`, and waterfront hash `539c259be8036b481d06b4f76db9a39b407d90e8`. FP `1202:2` then tested deduplicating the repeated waterfront by replacing the third image with a text-led callout; it weakened lower-right binding and photo-led closure and was rejected/hidden.

Expected improvement: stronger story/place coherence without unnecessary new generation, while retaining dense editorial rhythm.

Regression risk: semantically coherent sets can over-repeat one source; conversely, aggressive deduplication can remove a role that is doing necessary compositional work. Evaluate coherence, repetition and binding as distinct axes.

Three-scale evidence: FO 1000px spread PASS; actual-size right page ≈795×1123 PASS; visible native text 52; visible IMAGE fills 6; absolute text intersections 0; 18px text safe-area risks 0; fold x=792.700012 / width=2 / height=1122.5.

Figma evidence: FO `1200:2` promoted; lead `1200:267`; exact secondary `1200:268`; support `1200:269`; FN `1199:2` hidden rollback; FP `1202:2` rejected/hidden. Current `77:18 / 77:290` untouched.

Drive/provenance evidence: exact secondary remains bound to Drive `1aVp34U5qUTqd9FR3AILmJggdWwY1lAJb`. Dominant Q60 master `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`, JPEG 155,439 bytes, was freshly materialized, but a new first-class `Figma.upload_assets` target plus exact mounted-file multipart POST again hit `FIGMA_UPLOAD_DNS_MCP_FIGMA_COM` before mutation. Per RSL-005 it was not retried and does not count as placement.

What must remain Rurubu-specific: Yokohama subject, exact photographs, crop/overlap geometry, Japanese headline treatment, palette and travel-magazine grammar.

Cross-item applicability: another print artifact with multiple photos can independently audit whether the images form one believable editorial story before generating more assets. If a repeated source is detected, compare whether deduplication improves the artifact or merely removes a necessary visual/binding role.
