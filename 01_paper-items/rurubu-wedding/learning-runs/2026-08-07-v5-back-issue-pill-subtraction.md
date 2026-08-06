# V5 back issue-pill subtraction

Date: 2026-08-07
Item/version: Rurubu WEDDING V5
Live Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Current outer candidate: `77:18`

## Visible problem

The back cover contained a navy issue pill at the upper right (`77:70 / BACK_ISSUE_BAR`, `77:71 / BACK_ISSUE_BAR_TXT`) while the same publication/date identity was already stated in the bottom issue strip (`77:100`, `77:101`). The upper pill added no unique fact, navigation, provenance, or reading-order value and competed with the primary title area.

## Quality-over-legacy question

Would this pill be selected if it did not already exist?

Decision: no. The bottom strip already carries the issue identity, and the primary title should own the upper page.

## Hypothesis

Hiding the duplicate upper pill would reduce decorative density and improve quiet space without affecting copy, photography, crop, fold geometry, semantic structure, editability, or rollback history.

Possible regression: the back page could lose balance at the top edge.

Evidence required: whole-spread screenshot, exact node readback, preserved main title/subtitle, preserved bottom strip, preserved image fill/hash, and preserved fold guide.

## Bounded live experiment

- `77:70 / BACK_ISSUE_BAR`: `visible true → false`
- `77:71 / BACK_ISSUE_BAR_TXT`: `visible true → false`

No deletion, text rewrite, geometry change, image replacement, crop edit, or effect change was performed.

## Three-scale QA

### Thumbnail / whole item

The back cover now begins directly with `OUR TRAVEL NOTES`; the upper-right duplicate pill no longer competes with the title. The page remains balanced because the dominant photograph and title cluster still anchor the upper half.

### Reading / page scale

Reading order remains:

`OUR TRAVEL NOTES → Japanese subtitle → main memory photo and article → FRIENDS & FAMILY → OUR JOURNEY ROUTE → bottom issue strip`.

No content-bearing information was lost because the issue identity remains in the bottom strip.

### Detail / actual-size and structure

Verified live readback:

- `77:70`: visible `false`
- `77:71`: visible `false`; native text preserved
- `77:22 / BACK_VISUAL_TITLE`: visible `true`
- `77:23 / BACK_VISUAL_SUB`: visible `true`
- `77:100 / BACK_BOTTOM_BAR`: visible `true`
- `77:101 / BACK_BOTTOM_BAR_TXT`: visible `true`
- `77:24 / BACK_VISUAL_MAIN_MEMORY_PHOTO`: visible `true`
- `77:288 / PROVISIONAL_FOLD_GUIDE`: visible `true`
- cover hero `77:148`: visible `true`, IMAGE fill preserved, image hash `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`

The first post-change whole-spread render temporarily omitted the cover hero image even though the node remained visible with the same IMAGE hash. A direct screenshot of `77:148` rendered the image correctly, proving a transient screenshot-composition failure rather than a live Figma mutation. This failure is recorded and was not treated as design evidence.

## Result

`PROTOTYPED → VERIFIED / ADOPTED_FOR_V5_CURRENT / ROLLBACK_SAFE`

## Failure / limitation

This is an editorial-density improvement only. It does not close dominant-photo provenance, derivative-quality, or print-template gates. `INTENDED_SOURCE_APPLIED`, `PHOTO_ROLE_PASS`, V5 completion, and V6 start remain unchanged.

## Next safe application

Return priority to unresolved dominant-photo provenance and quality evidence. Do not continue low-impact subtraction unless the element is demonstrably redundant and the full screenshot plus exact-node QA remain trustworthy.