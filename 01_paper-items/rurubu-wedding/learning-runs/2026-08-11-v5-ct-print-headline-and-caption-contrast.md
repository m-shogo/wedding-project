# Rurubu WEDDING V5 — CT print-headline + caption-contrast clean-room QA

Date: 2026-08-11
Scope: Rurubu WEDDING only

Current outer `77:18` and Current inside `77:290` were re-read before every Figma mutation and remained untouched.

## Starting question

Would CN outer `819:2` be selected from scratch as the cover direction if its implementation history did not exist?

Decision: **not yet**.

CN had improved photo mass and 01/02/03 scale hierarchy, but two visual defects remained independent of the still-open cover-raster gate:

1. the white Japanese cover headline with dark outline read more like generic display treatment than print-native Japanese travel-magazine typography;
2. the feature-02 white title sat over a light, busy photo area and lost local contrast at actual size.

The cover raster itself remains a separate explicit FAIL and was not disguised by typography work.

## Fresh authority / Q60 source readback

Before visual writes, live Figma, current project/Rurubu authorities, the active-scope reconciliation, and the asset evidence ledger were re-read.

Fresh Google Drive readback verified the intended V5-01 higher-quality derivative:

- file: `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`
- Drive ID: `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- MIME: `image/jpeg`
- dimensions: `1330 × 1220`
- bytes: `155,439`
- SHA-256 authority: `090880c0ebe101f1321ebac05f22a91b2b61f3a8ac31c8d112dc418412f13ab2`

The existing deterministic staging on hidden transfer node `80:18`, namespace `rurubu_q60_20260811`, was also re-read before work:

- `c00`: length `12000`, FNV `46fd192d`
- `c01`: length `12000`, FNV `f9ed8c47`

This remains **partial binary staging only**.

## CR — Q60 exact-placement target created, transport still blocked

Rollback-safe CN-derived duplicate:

- frame `825:2`
- front `825:131`
- target hero `825:133 / CR_HERO_Q60_EXACT_TARGET`

The exact Drive Q60 was offered to the official Figma asset-upload route once on this safe duplicate. The returned upload target was under `mcp.figma.com`, but the execution environment again failed before POST with DNS resolution failure (`Could not resolve host: mcp.figma.com`).

The route was not retried again after the repeated blocker fingerprint.

Fresh live readback after the failure proves `825:133` still has proxy hash `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`.

Therefore:

- Q60 Drive verified: **YES**
- CR exact target created: **YES**
- Q60 image created in Figma: **NO**
- Q60 placed: **NO**
- Q60 Figma visual QA: **NO**

Transport preparation is not counted as visual progress or role completion.

## CS — print-headline clean-room experiment

Safe duplicate:

- frame `826:2`
- front `826:131`

### Visible problem

The outlined white `横浜 / ふたり旅。` treatment survived CN compositionally but still felt generic at whole-cover and actual-size scales.

### Principle / capability tested

Use native Japanese type plus **one purposeful print color bar** rather than outline/shadow effects. The goal is a more forceful editorial silhouette that survives thumbnail reduction without adding a card system.

### Change

- retained native `Noto Sans JP Bold` text;
- removed headline strokes/effects;
- `横浜` became dark navy on the photography;
- `ふたり旅。` became white on a slightly angled magenta print bar;
- kept the underlying photo-led CN composition and semantic image nodes unchanged.

### Expected improvement

- stronger thumbnail recognition;
- less generic digital display treatment;
- clearer Japanese travel-magazine cover grammar;
- stronger large / medium / small hierarchy without adding rounded UI containers.

### Regression risk

The stronger bar could become a loud sticker if oversized or detached from the headline, and headline repositioning could collide with the kicker or fold/safe references.

### Visual result

Whole-item, 500px thumbnail, and front actual-size screenshots were reviewed. The headline hierarchy is visibly stronger than CN and remains legible at thumbnail scale.

Status: **accepted as stronger than CN, preserved as comparison evidence; not Current**.

## CT — feature-02 contrast repair

Safe CS-derived duplicate:

- frame `827:2`
- front `827:131`
- hero `827:133`
- headline bar `827:143 / CS_MAIN_HEADLINE_MAGENTA_BAR`
- main headline `827:144 / CS_MAIN`
- feature-02 ink strip `827:186 / CT_FEATURE_02_INK_STRIP`
- provisional fold guide `827:185`

### Visible problem

Actual-size CS showed the feature-02 title losing contrast over the bright dining photograph.

### Principle / capability tested

When photography is compositionally correct but local text contrast is unstable, use a **narrow editorial ink strip tied to the caption**, not a full card, blur overlay, generic shadow panel, or replacement of the entire photo module.

### Change

- added one dark-navy semi-opaque `270 × 58` caption strip aligned to the existing `-4.8°` feature-02 photo angle;
- kept `02` yellow and its title white;
- did not introduce rounded corners, generic shadows, or a new module grid.

### Expected improvement

Stable actual-size readability while preserving the photo as the visual object and keeping the 01 > 02/03 hierarchy intact.

### Regressions detected and repaired

1. Structure QA found a `1px` same-parent overlap between the cover kicker and main headline. The main headline was moved down before acceptance.
2. A final structure readback then caught a non-obvious regression: the provisional fold guide had accidentally shifted to `y=217` during headline adjustment. It was restored to `x=792.7, y=0, 2 × 1122.5` before final QA. This regression was visible structurally even though the ordinary screenshot could easily miss it.

No Current frame was changed during either repair.

### Final CT evidence

Fresh live readback:

- frame: `827:2 / V5_OUTER_RURUBU_CLEANROOM_CT_CAPTION_CONTRAST_2026_08_11`
- front: `827:131 / FRONT_COVER_CT_CAPTION_CONTRAST`
- hero: `827:133`, `793.7 × 575`
- hero hash: `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912` — **low-quality semantic proxy only**
- headline bar: `827:143`, `440 × 92`
- main headline: `827:144`
- feature-02 ink strip: `827:186`, `270 × 58`
- fold guide: `827:185`, `x=792.7`, `y=0`, `2 × 1122.5`
- visible native text: `37`
- visible IMAGE nodes: `7`
- same-parent text intersections: `0`

Three-scale QA:

- thumbnail: the `横浜 / ふたり旅。` hierarchy remains dominant and the 01/02/03 hierarchy survives reduction;
- whole spread / reading: the stronger front headline balances the photo-led back cover without introducing a dashboard/card rhythm;
- actual-size: feature-02 caption contrast is materially improved and Japanese cover type reads more print-native; **the cover proxy raster remains visibly pixelated and therefore still fails the photo-role gate**.

Status: **CT accepted as strongest outer composition comparator, not Current**.

Inside comparator remains **CM `818:2`**, unchanged this run.

## State at end of run

- new image generation: `0`
- newly adopted generated master: `0`
- Q60 fresh Drive verification: `YES`
- Q60 exact Figma placement: `NO`
- Q60 Figma visual QA: `NO`
- CR exact-placement target created: `YES`, but still proxy-filled
- CT placed / three-scale visually reviewed / structure verified: `YES` for composition
- CM remains strongest inside comparator: `YES`
- Current outer `77:18` changed: `NO`
- Current inside `77:290` changed: `NO`
- V5 PHOTO_ROLE_PASS: remains `9/10`
- dominant-photo pass: remains `2/3`
- V5 complete: `NO`
- V6 production started: `NO`

## Next application

Do not spend the next iteration adding decoration around the pixelated hero. Continue with a genuinely binary-safe exact-Q60 path that changes the transport method rather than repeating the DNS-blocked upload. Once Q60 is truly on a rollback-safe CT-derived cover, rerun thumbnail / reading / actual-size crop QA and node/hash verification. Only then may the final dominant-photo and V5 gates change.
