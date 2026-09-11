# Rurubu WEDDING V11 — Visual Generation Prompt Templates

Status: `CANONICAL_GENERATION_GUIDE`

These prompts are for missing decorative/display assets and page previsuals. They do not replace the page manual or Figma production master.

## Rule: describe editorial role before style

Weak:
`るるぶ風の花を作って`

Strong:
`P04 lower-right photo-junction anchor. Transparent tropical floral cluster, approx 32×26 mm visible footprint at A5, asymmetric pink hibiscus + yellow flower + two green leaves, open negative space toward upper-left so it can wrap a photo corner, crisp print edges, no text/logo/people.`

Every asset prompt should contain:
1. semantic role;
2. page/placement context;
3. physical footprint/aspect;
4. visual job;
5. composition/negative-space requirement;
6. color job;
7. background/transparency;
8. forbidden content;
9. print-detail expectation;
10. whether edge cropping is intended.

---

# 1. Hero title prompt template

`Create an ORIGINAL wedding travel-magazine hero title asset for [PAGE/ROLE]. Text: [VERIFIED DISPLAY TEXT ONLY]. Visual job: [FIRST READ / SECTION TITLE]. Shape: bold rounded editorial lettering, strong silhouette at A5 thumbnail scale, white keyline with [PINK/BLUE] fill and controlled hard offset shadow, optional small ribbon/brush support. Approx visible footprint [W×H mm]. Transparent background. Keep at least [X mm] visual breathing space around letters. No commercial Rurubu logo, no copied proprietary typography, no extra words, no date/name unless explicitly supplied. Crisp print detail suitable for 300+ ppi placement.`

If text generation reliability is uncertain, generate only a decorative plate/background and keep authoritative title text native/vector in Figma.

---

# 2. Tropical corner cluster

`Create CLUSTER_TROPICAL_CORNER for [P0X / corner]. Transparent PNG. Intended footprint approx [W×H mm]. Asymmetric tropical editorial cluster: [2–5 flowers], [1–3 leaves], energetic but not photorealistic-stock. Visual weight should anchor the [upper/lower]-[left/right] edge and may be partially cropped at trim. Leave open negative space toward [direction] so it frames [title/photo] instead of covering it. Use HOT_PINK / SUN_YELLOW / TROPICAL_GREEN roles. No text, logo or people. Crisp cut edges; no green matte/background residue.`

---

# 3. Photo-junction floral cluster

`Create CLUSTER_PHOTO_JUNCTION for [P0X]. Transparent PNG. Small tactile floral accent designed to sit exactly where two white/polaroid photo frames overlap. Approx [W×H mm]. 1 pink flower + 1 yellow flower + 1–2 leaves. Directional composition opening toward the photos. Must visually bind the frames without hiding important photo content. No text/logo. Print-crisp edges.`

---

# 4. Travel still-life cluster

`Create TRAVEL_STILL_LIFE for [P0X / lower corner]. Transparent PNG. Editorial illustrated cluster combining [suitcase + passport + ticket] or [camera + passport + boarding pass]. Objects overlap into one tactile composition rather than appearing as separate icons. Approx [W×H mm]. Warm travel-magazine style, high detail, clean silhouette, cyan/pink/yellow accents with natural object colors. Leave negative space toward [direction] for adjacent native copy/photo. No readable fake airline/company logo, no incorrect dates/names, no copyrighted brand marks.`

---

# 5. Stamp / postmark

`Create [STAMP_DATE / STAMP_POSTMARK] for [P0X]. Transparent PNG or vector-like raster. Approx [diameter mm]. Vintage travel-journal stamp energy, one or two ink colors, slightly imperfect print texture but clean enough for A5. If factual text/date is included it must be exactly: [VERIFIED TEXT]. Otherwise generate decorative shell only and leave the factual center blank for native Figma text. No fake destination/company marks.`

---

# 6. Polaroid / frame art

`Create FRAME_[ROLE] for [P0X photo slot]. Transparent PNG frame artwork only, no embedded photo. Outer footprint [W×H mm], inner photo opening [aspect/size], slightly tactile white paper edge, subtle print shadow/edge depth rather than generic web drop shadow. Keep photo opening fully transparent. No text unless the caption area is intentionally blank. Frame will sit above an independently replaceable Figma photo mask.`

---

# 7. World map / route base

`Create a simplified editorial world-map graphic for P02 WEDDING JOURNEY. Intended footprint approx [W×H mm], warm yellow/cream land shapes on transparent or cyan-compatible background. It is a visual journey structure, not a geographically detailed navigation map. Leave clean areas for native destination labels and route overlay. No invented place names, no fake labels, no text. Friendly Japanese travel-magazine illustration quality, print crisp.`

Route should normally be native/vector in Figma when it must connect confirmed destinations.

---

# 8. Page previsual prompt

Whole-page generation is allowed only as reference/previsual.

`Create a NON-PRODUCTION PREVISUAL for Rurubu WEDDING V11 [P0X ROLE], A5 portrait. Follow this page job: [PAGE JOB]. Reading hierarchy: 1 [FIRST], 2 [SECOND], 3 [THIRD]. Use these visual territories: [BLUEPRINT ZONES]. Photography should be represented by obvious photo placeholders/illustrative mock images, not fake real-couple claims. Visual grammar: dense Japanese travel-magazine editorial, strong scale contrast, hero + satellites, controlled asymmetry, mixed photo frames, clustered tropical/travel objects, selective overlap and subtle tilt, edge tension, cream calm text zones. Do not create generic UI cards. Do not copy commercial Rurubu branding/layout exactly. Do not embed authoritative long text. This image is only a composition target for later editable Figma reconstruction.`

---

# 9. Generation QA

Before promoting a generated part:
- confirm semantic role;
- inspect full pixels;
- confirm no fake/unwanted text;
- confirm alpha/transparency if expected;
- confirm no matte/background residue;
- confirm footprint/resolution;
- confirm negative-space direction matches the placement;
- confirm it does not force an old V10 composition;
- record semantic filename and intended page/slot.

Filename convention:
`GENERATED_V11_<ROLE>_<PAGE>_<CONTENT>_<VARIANT>.png`