# Rurubu V5 — ED / EE editorial-density visual promotion

Date: 2026-08-12
Scope: Rurubu WEDDING only
Status: `ED_OUTER_AND_EE_INSIDE_VISUALLY_VERIFIED_AND_PROMOTED / CURRENT_UNCHANGED / V5_OPEN`

## Authority refresh
Before writes, the latest GitHub main, existing EC promotion authority, live Figma Working/Review/Start Here, and the verified Drive Q60 cover master were re-read. Current production nodes remained outer `77:18` and inside `77:290` and were not edited. The incoming selected comparison was EC outer `1039:2` / Review `1043:2` and DZ inside `1019:2` / Review `1021:2`.

Fresh Drive readback still identifies `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg` as Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`. Exact Drive-binary → Figma image-hash provenance remains open.

## ED outer — visible problem
EC's front cover was already strong, but the back-cover travel log still read like a sparse infographic: six small staggered dates and a decorative dashed zig-zag route competed with the photo-led editorial language.

### Principle / capability tested
Preserve the verified EC front and photo collage, but rebuild the lower back-cover chronology with typography rather than ornament: three columns × two rows, materially larger dates, compact labels, and narrow vertical accent rules. Subtract the dashed route completely when actual-size QA shows that it contributes decoration rather than reading order.

Expected improvement: denser Japanese travel-magazine back matter, faster chronology scanning, stronger print-native rhythm, and less infographic/template feeling.

Regression risk: timeline becoming a dashboard grid, date/label text collisions, crowding the footer, and loss of the playful travel rhythm.

### ED implementation
Created rollback-safe Working duplicate:
- ED root `1046:2 / V5_OUTER_ED_DENSE_TRAVEL_LOG_CLEANROOM_2026_08_12`
- back `1046:3`
- front `1046:131`

The front inherited EC unchanged. On the back:
- travel-log heading moved into a compact lower editorial zone;
- six chronology entries changed to a 3×2 reading rhythm;
- years enlarged to 18 px with compact labels;
- six previously hidden dot nodes became 5×34 magenta/cyan/yellow vertical rules;
- `AUTH_JOURNEY_ZIG_1..5` was removed from view after actual-size comparison showed the dashed route looked amateur and noisy.

### Rejected / repaired ED states
The first structural QA found six year/label text-box intersections. That state was not accepted. Each label was offset by 3 px, then structure QA returned zero intersections.

### ED evidence and adoption
Visual QA passed at:
- thumbnail: 500 px whole spread;
- whole-item reading scale;
- actual-size back: 794×1123;
- actual-size front: 794×1123.

Final structure:
- visible native text: `36`
- visible IMAGE fills: `6`
- same-parent text intersections: `0`
- verified image hashes preserved, including hero `539c259be8036b481d06b4f76db9a39b407d90e8`, lower street `439a719d73f28e8dd2889f2026cccb15f345ec63`, and back photos.

ED was adopted and promoted:
- Review `1048:2 / BEST OUTER — ED — source 1046:2`
- previous EC Review `1043:2` preserved hidden as rollback.

## EE inside — visible problem
DZ's right-page Memory Spots was improved, but the lower half still read as a gallery followed by detached text strips. At thumbnail scale the main/support-photo hierarchy was not aggressive enough for the desired travel-information-magazine silhouette.

### Principle / capability tested
Keep DZ's verified profile/interview and history structure while turning Memory Spots into a photo-led asymmetric composition: one dominant landscape photo, one vertical support image, and one smaller tilted destination image. Put the `01` headline on the dominant photograph and use only a minimal edge-attached caption strip where the smallest support image genuinely requires contrast.

Expected improvement: stronger editorial silhouette at thumbnail scale, more varied photographic scale, less card/gallery behavior, and better continuity between image and caption.

Regression risk: support images becoming cramped, bottom captions colliding with the footer, text over photography losing contrast, or the clean-room change disturbing the accepted left-page interview.

### EE implementation
Created rollback-safe Working duplicate:
- EE root `1048:185 / V5_INSIDE_EE_PHOTO_LED_MEMORY_CLEANROOM_2026_08_12`
- right page `1048:315`

Right-page changes:
- main memory image enlarged to a dominant ~520×392 field;
- `01 はじめての旅行先` placed directly on its lower image edge;
- support 02 changed to a taller ~254×230 photo with compact text beneath;
- support 03 changed to a smaller tilted ~262×180 photo;
- reused the existing hidden `IA_MEMORY_4_CARD` as a minimal warm edge-attached caption strip for 03, without shadow or rounded UI treatment.

### Rejected / repaired EE states
The first visual pass showed 03 copy crowding the bottom and 02 text/photo spacing breaking. That state was not accepted. The support photos and copy were shortened/repositioned to restore footer clearance.

Final structural QA then found one inherited left-page collision between the large Q1 numeral and its answer text. The answer was moved from x=140 to x=148; the next structure readback returned zero intersections.

### EE evidence and adoption
Visual QA passed at:
- thumbnail: 500 px whole spread;
- whole-item reading scale;
- actual-size right page: 794×1123.

Final structure:
- visible native text: `53`
- visible IMAGE fills: `6`
- same-parent text intersections: `0`
- fold guide `1048:466`, x=`792.7`, width=`2`, height=`1122.5`
- production image hashes preserved: `a39dd297...`, `2359f635...`, `539c259...`, `adbb8e529...`, `439a719...`, `c09aa82...`.

EE was adopted and promoted:
- Review `1050:2 / BEST INSIDE — EE — source 1048:185`
- previous DZ Review `1021:2` preserved hidden as rollback.

## Navigation / final live readback
Start Here now reads `ED outer / EE inside`. Final Review readback shows only ED and EE as visible Best comparators alongside the unchanged Current snapshots; EC and DZ are hidden rollback evidence.

## Reusable learning
1. A travel timeline becomes more magazine-like when chronology is encoded by type scale + short rules, not decorative route diagrams.
2. Photo hierarchy should remain legible at thumbnail scale: dominant / support / accent is stronger than three similarly weighted gallery items.
3. Subtraction is still the default, but a busy image may receive the smallest edge-attached caption strip needed for actual-size legibility.
4. Structural collision checks must be run on the full duplicated spread because inherited defects can surface even when the edited page looks visually correct.

## Progress classification
- generated this run: `0`
- new generated asset adopted: `0`
- new external binary placed: `0`
- ED clean-room comparator created: `YES`
- ED visually verified: `YES`
- ED structure verified: `YES`
- ED Review promoted: `YES`
- EE clean-room comparator created: `YES`
- EE visually verified: `YES`
- EE structure verified: `YES`
- EE Review promoted: `YES`
- Current changed: `NO`
- exact Q60 Drive binary placed in Figma: `NO`
- V5 complete: `NO`
- V6 production started: `NO`

## Next application
Do not spend another run merely polishing the same modules. Preserve ED/EE as the strongest comparison evidence and continue with the highest-value verified visual defect or the exact Q60 provenance bridge. V5 remains open until the complete asset/print/structure/ledger gate is genuinely closed.