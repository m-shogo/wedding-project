# るるぶWEDDING — Print-aware QA 2026-07-31

Status: `LOCAL_PRINT_AWARE_QA_COMPLETE / FIGMA_REPRODUCTION_PENDING`
Current authority: GitHub `main`

Depends on:
- `PRINT-VENDOR-WORKING-TARGET-20260731.md`
- `PHOTO-SHORTLIST-20260730.md`
- `IMAGE-GENERATION-QUEUE.md`
- `DRIVE-ASSET-WRITE-GATE.md`

## Working print geometry

Working target: ラクスル `折りパンフレット / 二つ折り / A4仕上がり`

- trim spread: `420 × 297 mm`
- bleed: `3 mm` each outer edge
- bleed canvas: `426 × 303 mm`
- outer critical-content safe: `3 mm inside trim`
- trim center fold: `x = 210 mm`
- fold on bleed canvas: `x = 213 mm`
- explicit vendor fold-safe distance: `NOT FOUND / DO NOT INVENT`

The 3mm outer safe is a cut/trim requirement, not a claimed fold-safe requirement.

## Cover A real-photo print-aware QA

Direction:
- `Cover A — Classic Rurubu`
- hero photo: `007.jpg` / `PRIMARY_CANDIDATE / NOT_FINAL`
- Current PNG-only decoration assets only
- no SVG

QA artifact:
- `QA_rurubu_cover_A_printaware_007_raksul_working_20260731.png`
- Drive ID: `18ZpZZwZDOhrJRdFZ49Hzy6J80q_PIoT9`
- Drive readback: VERIFIED

Observed:
- `007.jpg` keeps strong sea / sky / palm context while the couple remains legible.
- masthead, date badge and feature panel remain inside the 3mm outer safe.
- back-cover hierarchy remains much quieter than the front cover.
- center fold does not pass through critical small text.
- decorative density is acceptable at this scale when limited to a few strong groups.

Measured local safe clearance from the 3mm safe boundary in the 96dpi-equivalent preview:
- front logo: ~`12 px`
- front date: ~`13.7 px`
- feature panel: ~`23.7 px`
- back heading: ~`30 px`

These are preview measurements, not printer tolerances.

## Inside A real-photo print-aware QA

Direction:
- `Inside A — Travel Editorial Grid`
- bride-side profile candidate: `024.jpg`
- groom-side clean portrait: `MISSING`
- history image: `023.jpg`
- memory-image candidates used for layout QA: `031.jpg`, `035.jpg`, `023.jpg`, `031.jpg`
- Current PNG-only decoration assets only
- no SVG

QA artifact:
- `QA_rurubu_inside_A_printaware_realphotos_raksul_working_20260731.png`
- Drive ID: `1-pValSg9oWvj0ZxbEVZ9SmXFZFUJ4l62`
- Drive readback: VERIFIED

Observed:
- `024.jpg` works cleanly as a portrait profile card.
- right-page History / Memory structure works with the existing Hawaii landscape set.
- `023.jpg` works well as a quiet history image.
- `031.jpg` and `035.jpg` work well as environment-heavy Memory Spot imagery.
- real-photo layout can proceed without inventing four unique photo sources.
- the visually obvious remaining photo blocker is the groom-side portrait.
- paired Q&A / profile / Memory Spot text remains TODO and should not be invented from photo appearance.

## Current structural direction after print-aware QA

Still provisional, not Final:
- Cover: `A — Classic Rurubu` first visual candidate
- Inside: `A — Travel Editorial Grid` first structural candidate
- Back: `A — Quiet Editorial Notes` first structural candidate

Figma same-condition comparison is still required before Final promotion.

## Remaining blockers after this QA

### Real photo
- groom-side clean profile portrait: `MISSING`
- Friends / Family source photos ×3: `MISSING`

### Real copy
- basic profile fields for both people
- paired Q&A ×3
- travel note ×1
- four pre-registration relationship/history milestones
- Memory Spots ×4 with factual names/reasons
- Friends / Family captions ×3

### Print finalization
- final printer/order selection
- vendor-confirmed fold-safe requirement if any
- final PDF/export/color profile at order time

### Figma
- Starter MCP monthly quota currently blocks production comparison.

## Boundary

These local print-aware previews are QA evidence only. They do not replace the production Figma file and do not promote any layout/photo to Final.
