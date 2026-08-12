# Rurubu V5 — EC asymmetric editorial clean-room experiment

Date: 2026-08-12
Scope: Rurubu WEDDING only
Status: `EC_CREATED_AND_STRUCTURE_VERIFIED / NOT_PROMOTED / CURRENT_UNCHANGED / V5_OPEN`

## Authority refresh
Before the write, GitHub main comparator authority, live Figma EB/DZ/Current nodes, and Drive Q60 master/derivative metadata were re-read. Current remained outer `77:18` / inside `77:290`. Prior selected comparator remained EB `1029:2` / DZ `1019:2`. Q60 master remained Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`, JPEG, 155,439 bytes; the 240×220 derivative remained Drive ID `1aVp34U5qUTqd9FR3AILmJggdWwY1lAJb`.

## Scratch-selection test
EB would not be accepted as the only from-scratch answer. It is stronger than legacy-derived compositions, but its front still retains a date-badge image and a cyan feature-02 paper block that read as modular UI decorations rather than necessary editorial anchors.

## Visible problem
- top-right badge competes with the masthead and destination line;
- feature 02 still depends on a broad cyan paper field;
- feature scale is asymmetric, but some decoration remains module-like rather than print-native.

## Principle tested
Subtract badge/panel UI before adding anything. Preserve the verified photo spine and native text, enlarge and tilt the feature-02 photograph, move its typography directly onto the photographic zone, tighten feature-01 hierarchy, and let the lower full-bleed street image begin slightly earlier.

Expected improvement: stronger photo-led travel-magazine silhouette, fewer UI-like rectangles, more intentional overlap and scale contrast.

Regression risk: masthead/destination collision, feature-01 numeral collision, contrast over photography, and crowding near the hero/lower-photo seam.

## EC implementation
Created rollback-safe duplicate `1039:2 / V5_OUTER_EC_ASYMMETRIC_EDITORIAL_CLEANROOM_2026_08_12` from EB. Current and inside were not touched.

- front: `1039:131`
- back: `1039:3` (inherited unchanged)
- fold: `1039:184`, x=`792.7`, width=`2`, height=`1122.5`
- hero hash preserved: `539c259be8036b481d06b4f76db9a39b407d90e8`
- feature-02 hash preserved: `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`
- lower street hash preserved: `439a719d73f28e8dd2889f2026cccb15f345ec63`

Subtraction/rebuild:
- hid the date-badge image;
- hid the cyan feature-02 paper field;
- enlarged feature-02 photo to `336×250` and rotated it about `-3°`;
- moved 02 native text directly below/onto the photographic feature zone;
- enlarged the 01 numeral and tightened its headline relationship;
- extended lower street photography upward to `y=726`;
- removed the decorative footer rule while retaining native footer text.

## QA and rejected intermediate
First structural readback found two same-parent text-box intersections: destination line vs masthead, and feature-01 numeral vs feature-01 headline. That intermediate state was not accepted. EC alone was corrected: destination moved to `x=430,y=82,w=330`; feature 01 numeral reduced to `112×112`; headline moved to `x=142,y=590,w=284,h=92`.

Final structural readback:
- front same-parent text intersections: `0`
- bounded safe-area risks: `0`
- image hashes preserved as listed above
- fold preserved

## Adoption status
EC is **not promoted in this run**. The tool path available here provided exact structural readback but not a trustworthy three-scale screenshot comparison surface for this write, so the user-required visual gate is intentionally left open. EB remains the selected Review comparator until EC receives thumbnail / whole-item / actual-size visual evidence. This prevents structure-only progress from being misreported as visual completion.

## Next application
At the next run, visually compare EB and EC at the required three scales. If EC wins, promote it with rollback-safe Review evidence; if not, preserve it as a rejected clean-room study and continue with the next highest-value photo/typography defect. Q60 exact Drive-binary → Figma image-hash provenance remains independently open.