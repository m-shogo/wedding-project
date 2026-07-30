# るるぶWEDDING — Photo Search Audit 2026-07-31

Status: `AUDIT_COMPLETE / GROOM_AND_FRIENDS_STILL_MISSING`
Current authority: GitHub `main`

## Purpose

Avoid repeating broad Drive searches for the two remaining photo blockers:
- groom-side clean single portrait
- three meaningful Friends / Family source photos

## Existing usable candidate pool

Keep using the already-reviewed Hawaii set for first layout QA:
- cover hero: `007.jpg` primary candidate
- bride-side profile: `024.jpg` primary candidate
- history / memory: `014.jpg`, `023.jpg`, `031.jpg`, `035.jpg`
- back memory: `023.jpg`, with `001.jpg` as alternative

These roles are editorial candidates only, not Final selections.

## Drive-wide search performed

### Folder-title search

Searched for photo-oriented folders including:
- `写真`
- `友達`
- `前撮り`

Result:
- `ハワイ写真` is the only clearly relevant photo folder found from those terms.
- no dedicated `友達` / `前撮り` folder was found.

### Broad image search

Searched image MIME files outside the newly generated Rurubu asset batch and inspected older filename families.

Observed filename families included:
- `m###########_1.jpg` — unrelated commerce/product imagery; do not use
- `IMG_<UUID>.jpeg` around 2026-05-11 — inspected sample is Pokémon-card photography / unrelated; do not use for wedding profile
- `Image_20251201_165934_*.jpeg` — inspected samples are dog-centered personal photos; one includes a person only at the edge/background, not a clean profile portrait; not suitable for the groom profile slot
- older `dummy_img_*` and web/project image assets — unrelated; do not use

## Decision

No acceptable new source was found for:
- `profile_groom`
- `friends_01`
- `friends_02`
- `friends_03`

Do not keep broad-searching Drive unless:
1. the user identifies a different folder/source, or
2. new files are uploaded.

Do not silently crop a couple/group/dog photo into a fake-equivalent clean groom portrait.
Do not fill Friends / Family slots with unrelated Hawaii/couple photos just to complete the mock.

## Next content action

Use `CONTENT-COLLECTION-MINIMUM.md` as the shortest remaining intake surface.

The genuinely user-dependent blockers are now:
- groom-only portrait: 1
- meaningful friend/family source photos: 3
- profile facts / Q&A / history / Memory Spots / captions
- printer/venue final bleed-safe-export values

All fixed decoration PNGs #1–#14 are already complete and Drive-verified; do not return to decoration generation.
