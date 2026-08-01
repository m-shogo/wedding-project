# Figma Execution Checkpoint — 2026-08-01

Current authority: live Figma + GitHub `main`.

This checkpoint records only work verified against the live Figma files. It does not mark any item `PRINT_READY`.

## Mandatory project-wide Figma quality rule

Before continuing any item, read:

- `01_paper-items/README.md`
- `01_paper-items/FIGMA-GLOBAL-QUALITY-STANDARD.md`
- the target item's Current status, asset register, placement plan, and copy data

The global standard applies to all current and future Figma-generated wedding items.

Required interpretation:
- transfer researched Figma workflow, semantic structure, reusable styles/components, non-destructive photo replacement, screenshot QA, and Git continuity
- do not transfer the るるぶ palette, density, motifs, or editorial voice into unrelated items
- reject generic AI-looking equal-card layouts, arbitrary gradients, decorative filler, excessive rounded rectangles, and whole-page raster output with baked-in normal text
- item-specific art direction and human editorial judgment remain mandatory

The global standard was promoted to Current through:
- `6216b648a1b7b53c2b2b59cd8428f8c2565f1e47` — project-wide anti-AI Figma quality standard
- `39c54e8fb54067ee47cb3820309d2d1228522b60` — mandatory paper-items entry point

## 1. るるぶWEDDING

Production Figma: https://www.figma.com/design/bfM0d4c9dCeBv5pCkJ3TNM

Verified live state before execution:
- design file accessible with edit permission
- file contained one empty page only
- no pre-existing semantic frames, local variables, or styles

Completed in Figma:
- page renamed to `01_RURUBU_WEDDING`
- monochrome wireframe variables and Japanese-capable text styles created
- `01_Cover_Back_WF_A`, `01_Cover_Back_WF_B`, `01_Cover_Back_WF_C` created at the Current physical-equivalent spread geometry
- identical shared content payload placed across A/B/C
- screenshot comparison completed
- A selected as the strongest travel-magazine hierarchy
- A promoted to `02_Cover_Back_Visual`
- `02_INSIDE_WF_A`, `02_INSIDE_WF_B`, `03_BACK_WF_A`, `03_BACK_WF_B` shells created

Later live Current work is recorded in:
- `01_paper-items/rurubu-wedding/FIGMA-VISUAL-CHECKPOINT-2026-08-01.md`
- `01_paper-items/rurubu-wedding/FIGMA-EDITORIAL-QUALITY-PLAYBOOK-2026-08-01.md`

Not yet complete:
- final-photo/content replacement
- print-template and physical proof QA

## 2. WEDDING PASSPORT

Production Figma: https://www.figma.com/design/UbK8KmuWJcDeGScsN49Uor

Completed in Figma:
- separate production file created
- pages `00_README`, `01_OUTSIDE`, `02_INSIDE`, `99_QA` created
- semantic frames `FRAME_FRONT_COVER`, `FRAME_BACK_COVER`, `FRAME_MENU_DRINK`, `FRAME_SEATING` created
- native cover/back/menu/drink text inserted
- 11 native seating table groups inserted with dummy guest data
- screenshots captured for cover, menu/drink, and seating density review
- Current Drive cover emblem fetched and verified for the next exact placement pass

Not yet complete:
- remaining Current Drive icon/texture placement where still required
- final venue menu/drink copy
- final seating names and physical room layout
- print-size QA

## 3. BOARDING PASS

Production Figma: https://www.figma.com/design/P2PtpMyhyZqHYe1ZBBCD13

Completed in Figma:
- separate production file created
- pages `00_README`, `01_FRONT`, `02_BACK`, `99_QA` created
- semantic front/back frames created
- guest name, table number, route, date, gate, boarding time, stub, thank-you copy remain native text
- non-scannable decorative barcode geometry and ticket hierarchy created
- temporary emoji plane removed
- exact Current Drive `boarding_plane_v1.svg` placed as editable vector under `ICON_PLANE`
- post-placement front screenshot captured; hierarchy remains readable
- Current primary and thank-you PNG stamps fetched and verified

Not yet complete:
- remaining Current Drive asset placement where still required
- long-name stress screenshot and final correction pass
- final venue/copy replacement
- actual-size print QA

## 4. 青春ふたりきっぷ

Production Figma: https://www.figma.com/design/v7rIRHv8YKQXG0LYD0I5OA

Completed in Figma:
- separate production file created
- pages `00_README`, `01_LABEL`, `99_QA` created
- `FRAME_LABEL` and Current semantic/native text structure created
- pale sage / warm off-white / black direction applied, with red and blue stamp accents
- screenshot QA found phrase/support-mark interference and a low-quality train placeholder
- unnecessary support mark removed and phrase repositioned
- exact Current Drive `seishun_ticket_frame_v1.svg`, `seishun_route_v1.svg`, and `seishun_train_icon_v1.svg` placed as editable vectors
- first exact-asset screenshot exposed overlap caused by scale/layer order
- evidence-driven correction reduced asset scale, moved vectors behind native text, and added a restrained native outer border
- post-fix screenshot captured
- Current red `祝` and blue gate PNG stamps fetched and verified

Not yet complete:
- final small-format optical correction where still required
- physical MINTIA application-area measurement
- 100% print and adhesion test

## Shared declaration

- one item = one Figma file = one URL remains the production rule
- Current Drive assets remain authoritative
- normal changeable information remains native editable Figma text
- fixed and replaceable roles must remain separate and semantically named
- accepted assets must not be regenerated without a concrete, screenshot-supported defect
- every meaningful placement group requires screenshot QA
- visual tone is item-specific; shared quality method is project-wide
- none of the four items is `PRINT_READY`
