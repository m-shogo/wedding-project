# ADD-06 — Live visual recheck — 2026-08-11

State: `VISUAL_REOPENED_RECHECK / SELLABLE_VISUAL_QA_REOPENED / DESIGN_QA_PASS_WITH_PLACEHOLDERS_EVIDENCE_RETAINED / IMAGE_ASSET_REQUIRED_FOR_FINAL_SELLABLE_GATE`

Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
Observed latest `main` immediately before write: `279addee49d7219ca92e95207fe307aef5808550`

## Live authority

- Figma file key: `SVMALDUyhc2chxHa4fvdjx`
- production: `1:2 / FRAME_ADD06_A3_PORTRAIT`
- Drive authority: `1Ehk_oQ8vhAGo3DYBbgyOGfA03u0pu5wb / ADD-06_フォトブースサイン`
- Drive child count observed in exact authority folder: `0`
- RURUBU/るるぶ was not read or written.

## Fresh screenshot diagnosis

A fresh live screenshot at `990 × 1400` confirms that the V2 typography and asymmetry are still substantially better than the legacy composition, but the right-side four-frame contact sheet is visually unresolved: all four windows are blank ivory rectangles.

At whole-item/thumbnail scale those empty windows read as obvious asset placeholders rather than a finished photographic/editorial motif. That directly conflicts with the Current sellable gate: the design still looks like a polished template awaiting content, not a finished product that would independently be chosen today.

Therefore the previous `SELLABLE_VISUAL_QA_PASS` is reopened for the visual-completion portion only. Existing verified structure evidence remains valid: native text, safe area, no clipping, editable placeholders, rollback safety and actual-size geometry are not invalidated by this visual recheck.

## Image-production role brief

Role: fill the four contact-sheet windows with a coherent non-person photographic/editorial sequence that makes the sign feel intentionally finished while remaining secondary to the Japanese title.

- target role: four portrait-ish crops around `174 × 180` inside the existing strip;
- subject: non-person wedding-day atmosphere / travel-memory B-roll such as paper detail, table florals without identifiable people, venue-light abstraction, coast/night-sky/architectural texture, or print/film detail;
- palette: warm ivory, deep navy, restrained rust; avoid unrelated saturated stock colors;
- crop: each frame must still read at A3 viewing distance, no tiny factual detail dependency;
- text-safe: no baked text, QR, names, times, venue facts, table data or fake interface;
- identity: no bride/groom/family/friends/guests/children/dog generation;
- negative constraints: no fake lettering, fake camera UI, literal airplane/passport/stamp cliché, plastic diffusion-model gloss, impossible architecture, obvious duplicated objects, stock-advertising pose or fantasy light.

Candidate generation target when the image tool is available: `2–4 materially different sequences`, not near-identical variations. Editorial selection must reject artifacts and generic stock feel before any Drive/Figma adoption.

## This run

`IMAGE_GEN_UNAVAILABLE_THIS_RUN`.

The exact Drive authority contains no existing asset that can safely fill the four windows. No speculative raster was created, no production Figma node was changed, and no fake guest/documentary imagery was introduced.

## Completion consequence

ADD-06 remains structurally sound but its reopened visual completion is now:

`SELLABLE_VISUAL_QA_REOPENED / IMAGE_ASSET_REQUIRED / PRODUCTION_UNCHANGED / ROLLBACK_SAFE / NOT_PRINT_READY`

Resume at the generated-asset lifecycle when image generation is available:

`role brief → 2–4 candidates → critique → adopted comparison → Drive master + ID readback → replaceable Figma image roles → whole/reading/detail screenshot QA → structure/crop/editability QA → item-specific Git evidence`.
