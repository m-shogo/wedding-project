# V20 Acceptance Evidence

Status: `CANONICAL_COMPLETION_EVIDENCE`

V20 is not accepted because it “looks good.” Completion requires observable evidence.

## Per-page / per-spread evidence

### A. 3-second scan
- screenshot at thumbnail scale;
- page/spread job is recognizable;
- first/second/third read match the page manual.

### B. Reading scale
- Japanese body/captions readable without zoom-dependent rescue;
- no decorative object blocks critical text;
- captions bind clearly to their photos.

### C. A5 actual-size check
- body copy remains comfortable at intended physical size;
- critical copy remains within safe area;
- center-spread gutter does not consume faces, names or essential copy.

### D. Editability proof
- replace at least one representative photo without rebuilding the page;
- replace/edit representative body text;
- no whole-page flattening;
- frame/decor remains independent from photo source.

### E. Change-resilience proof
Test representative stress cases before final polish:
- body copy +30–40%;
- one support photo removed;
- one replacement photo has a different aspect ratio;
- one caption becomes two lines longer;
- one P07 discovery item is removed because the wedding detail is not verified;
- one P07 discovery note expands to 3–4 lines without shrinking body type.

Do not solve stress failures by silently shrinking important type below the working readability floor.

### F. Truth/provenance proof
- no `DUMMY` or `REFERENCE` promoted as autobiographical final art;
- every authoritative fact has a known source/status;
- generated art is not presented as a real couple memory/photo;
- unresolved facts are still visibly unresolved.

### G. Image quality proof
For final promoted raster assets record, when available:
- source pixels;
- intended physical size;
- effective PPI;
- crop safety;
- provenance/classification.

### H. Anti-template proof
Compare adjacent spreads for:
- hero position;
- title silhouette;
- density peak;
- photo rhythm;
- dominant color;
- overlap gesture.

If fewer than four axes materially differ, review for template repetition.

## Verified live production evidence — P01 / 2026-08-31

A real-source-derived visual proxy of `035.jpg` is now placed in the live P01 HERO slot for composition/crop review.

Evidence:
- Figma page: `3287:2` / `13_RURUBU_V20_GREYBOX`;
- P01 frame: `3287:5`;
- HERO node: `3288:6`;
- HERO node name records `035 VISUAL PROXY / REAL SOURCE 4500x3000`;
- Drive source ID: `1_Tbnct5i8xqEgBwtiY3PsfzUSSWGpBkc`;
- verified master pixels: `4500 x 3000`;
- Figma visual proxy pixels: `300 x 200`;
- proxy image hash observed after placement: `346cd3a141e36eefea0a5c1b9c7bfcc5e16dd059`;
- placement remains independently replaceable as an image fill; the page is not flattened.

Interpretation from the first live screenshot:
- `035` is strong as a tropical/environmental HERO: palm canopy, sky, water and grass create useful magazine-scale place context;
- the masthead/HERO collision concept remains viable;
- however, the couple remains visually small at cover-reading scale, so `035` alone does **not yet prove** the required `SHOGO & SHIORI are the protagonists` first-read condition;
- therefore the next serious P01 composition should test a close real couple/personality support image intruding into the environmental HERO, rather than simply zooming away the environmental value;
- `036.jpg` is the current strongest reviewed personality-support candidate.

### Source-aware P01 geometry correction — verified live

After visually reviewing the `036.jpg` master and the first P01 screenshot, the live greybox was structurally corrected before any decorative rescue work.

Current verified geometry after correction:
- `3288:6` / 035 environmental HERO: `x=8`, `y=116`, `560 x 452` — widened to carry more of the cover and increase place-scale impact;
- `3288:2` / masthead silhouette: `x=8`, `y=66`, `462 x 128`, rotation about `-2.5°` — stronger asymmetric collision rather than a tidy horizontal card;
- `3288:4` / date-location fact support: `x=410`, `y=88`, `160 x 108`, rotation about `+3°`;
- `3288:8` / planned 036 personality-support crop: `x=-8`, `y=430`, `252 x 210`, rotation about `-4°`, intentionally entering from the left edge and overlapping HERO territory;
- `3307:3` / feature-vessel placeholder: `x=304`, `y=458`, `286 x 150`, rotation about `+4°`, creating a counter-movement from the right.

The post-correction screenshot verifies a stronger cover silhouette:
- the environmental HERO now reads as the dominant place layer rather than a centered photo card;
- the planned close-personality image has a deliberately unequal weight and edge-entry gesture instead of becoming a second equal photo tile;
- left personality intrusion and right feature-vessel intrusion create the intended `ENVIRONMENT + PEOPLE + FEATURE` collision structure;
- the page still has one first-read zone and has not been “improved” by adding small decorative stickers.

`036.jpg` source evidence:
- Drive source ID: `183kgq1fGMRNiEQFBkp4KlSkaIdIulaKL`;
- verified master pixels: `4500 x 3000`;
- visually reviewed as a materially closer, expressive two-person image suitable for the `PERSONALITY / PROTAGONIST RECOGNITION` job;
- bright yellow clothing in this source is also a useful photo-derived accent candidate for the eventual REAL → GENERATED bridge.

Important transfer boundary:
- direct new byte upload for `036` remains blocked by transient DNS resolution failure to `mcp.figma.com` from this execution runtime;
- however, a previously placed Figma real-photo derivative was found whose visible people/outfits/gestures/background visually match the reviewed `036.jpg` source;
- that existing Figma image resource is now used in Candidate A for composition and protagonist-recognition proof;
- exact binary/provenance equivalence between that existing Figma resource and Drive `036.jpg` is **not yet claimed**, so final source replacement/provenance proof remains required.

### P01 Candidate A — first authored cover pass / verified live screenshot

A non-destructive candidate was created beside the canonical greybox rather than overwriting the baseline:
- candidate frame: `3330:2` / `P01_V20_CANDIDATE_A / REAL-PHOTO EDITORIAL TEST`;
- the existing verified `035` Figma proxy remains the environmental HERO;
- support-photo node `3330:7` now contains the visually matched existing real close-couple Figma source rather than a yellow geometry placeholder;
- support node name explicitly records `REAL CLOSE-COUPLE FIGMA SOURCE / VISUAL MATCH TO 036 / EXACT BINARY PROVENANCE PENDING`;
- support photo is intentionally smaller than HERO, crops tightly to faces/gestures, enters from the left and uses a printed-photo edge + hard shadow;
- native caption `ふたりの素顔、ちらり。` now sits on a dedicated cyan editorial tab `3337:2`, improving A5 contrast instead of relying on tiny dark text over photography;
- the optional second support-photo block remains removed so photo hierarchy stays intentionally unequal;
- greybox QA labels/guides are hidden in the candidate, while the canonical greybox remains intact.

Authored cover changes proven by screenshot:
- large native editable masthead text `るるぶ WEDDING` uses original V20 typesetting rather than a traced commercial logo;
- masthead is a cyan printed slab with white edge and hard coral offset shadow, materially colliding with HERO photography;
- `SHOGO & SHIORI 特別号`, `2026.10.24`, `YOKOHAMA`, cover hooks and issue metadata are native editable text;
- the dominant feature hook reads `ふたりの旅と、今日という一日。` over an irregular coral collision field;
- the real close-couple support photo now materially improves protagonist recognition without replacing the environmental HERO;
- false placeholder atmosphere remains removed: the grey tropical-circle proxy and lower edge fragment stay hidden rather than being retained as filler decoration.

Current P01 screenshot conclusion:
- the cover now proves the intended `ENVIRONMENT + PEOPLE + FEATURE` hierarchy with real personal photography in both major photo roles;
- the 3-second read is materially stronger because the large environmental travel scene is followed immediately by recognizable close-couple faces;
- the next largest visible quality gap is no longer “missing people”; it is the final production-quality bridge between the real photos and the masthead/feature cluster, plus final-source/provenance replacement of low-resolution/legacy derivatives;
- the direct upload transport blocker remains transient and does not justify flattening or fake-memory substitution.

Current P01 largest visible quality gap:
`PHOTO-DERIVED TROPICAL/PRINT BRIDGE ASSET + FINAL-SOURCE PROVENANCE`
→ `MASTHEAD / FEATURE CLUSTER REFINEMENT`
→ `READING-SCALE / A5 PROOF`.

Quality boundary:
- the `035` `300 x 200` proxy is `LAYOUT/CROP QA ONLY`;
- the existing close-couple Figma image is valid for live composition evidence but its exact binary provenance to Drive `036.jpg` remains pending;
- neither may silently survive final print promotion without production-source proof;
- `DESIGN_COMPLETE != PRINT_READY` remains in force.

## Verified live production evidence — P05 / 2026-08-31

A separate non-destructive right-page candidate now exists for the center-spread emotional peak:
- candidate frame: `3332:2` / `P05_V20_CANDIDATE_A / HAWAII PEAK / SOURCE-AWARE TEST`;
- canonical P05 greybox `3287:21` remains intact;
- no Okinawa/Korea geometry was frozen to compensate for missing real sources.

Source/proxy boundary:
- the already-placed verified `035` image fill remains in the P05 HERO only as a temporary real-Hawaii `SOURCE-AWARE TEST` proxy;
- its candidate node name explicitly records `035 VERIFIED REAL SOURCE PROXY / FINAL SOURCE TBD`;
- this does **not** select `035` as the final P05 HERO and does not permit repeating it in final P01/P05 production;
- the final P05 HERO still needs a separately selected/provenanced Hawaii source.

Real emotion-photo proof:
- node `3332:7` now uses the verified real Hawaii couple-kiss source already present in the Figma source library;
- exact Drive provenance recorded from the source node: `1sIghnrqtfs0WxwBiVdmsZopsQ29tIpiw` / `REAL_PHOTO_PROFILE_HAWAII_COUPLE_KISS_01`;
- Figma image hash: `e4ce0f0ae0ca2c86b8fe7beb4523c8e34264bc0b`;
- screenshot QA initially showed an over-tall crop that removed too much of Shiori;
- geometry was corrected to a wider `236 x 178` printed-photo object so both people and the kiss gesture read clearly;
- native caption is `HAWAII / ふたりの一枚` and stays independently editable.

Visual behavior proven by screenshot:
- Hawaii HERO remains clearly dominant rather than one of several equal cards;
- the `HAWAII` title is a large native display mass on a cyan/white/coral printed slab colliding with HERO;
- the real emotion photo now enters from the lower-left as a materially smaller but readable printed-photo object;
- the proposal field is a large quiet cream paper island over the lower-right of the HERO region, preserving the intended `dense travel collage → calm story island` behavior;
- `YOKOHAMA → 2026.10.24` remains a separate green arrival object connected by route movement rather than a footer card;
- route pieces remain editable and fold-critical facts stay away from the gutter.

Current P05 correction still required:
- proposal body copy is temporary truth-safe placeholder wording, not final autobiographical copy;
- final P05 HERO must differ from P01 and gain exact source provenance before promotion;
- the route-front stroke is still a temporary geometry cue, not final route artwork;
- P04 Okinawa/Korea real-photo absence still prevents complete center-spread source proof.

### Fresh missing-source recheck — 2026-08-31

Google Drive image-only searches were repeated after the real-photo Figma corrections:
- `沖縄` still returns reference/page/generated/editorial assets rather than a promotable autobiographical real-photo pool;
- `韓国` still returns reference/page assets rather than promotable real trip photographs;
- `クッキー` returned no image results;
- `メロン` returned no image results.

Therefore P04 and dog-specific P06 roles remain explicit source gaps. No generated scenery, reference page, or unrelated image is promoted to real-memory evidence.

## Full-resolution production replacement — P01 Candidate H / P05 Candidate E / 2026-08-31

The live preferred candidates were re-opened and visually reviewed before write:
- P01 Candidate H `3355:2`;
- P05 Candidate E `3355:37`.

The first screenshots proved the editorial hierarchy but also exposed severe blocky pixelation from the legacy low-resolution HERO proxies. Full-resolution Drive masters were then downloaded, pixel-opened and transferred to the existing replaceable Figma image-fill roles without flattening either page.

Verified P01 replacements:
- HERO node `3355:7`;
- Drive ID `1_Tbnct5i8xqEgBwtiY3PsfzUSSWGpBkc` / `035.jpg`;
- source and Figma readback: `4500 x 3000`;
- Figma image hash `743b9dadda4774b8dc0f323db2a1fa4485744349`;
- support node `3355:8`;
- Drive ID `183kgq1fGMRNiEQFBkp4KlSkaIdIulaKL` / `036.jpg`;
- source and Figma readback: `4500 x 3000`;
- Figma image hash `fff2e955f6806513de82afd22bc93869e2e14ddb`.

Verified P05 replacement:
- HERO node `3355:39`;
- Drive ID `1G-8t1JbX-GyqeMhuPLCPjsLKT_oue4Rb` / `REAL_PHOTO_COVER_HAWAII_PALMS_COUPLE_WIDE_02.jpg`;
- source and Figma readback: `4500 x 3000`;
- Figma image hash `d5b01512eafc825820df06f40392a9d72fef3d85`.

Transport detail:
- the two source files above the Figma `10 MB` upload limit were converted to non-destructive transfer derivatives at the same `4500 x 3000` pixel dimensions;
- P01 HERO transfer derivative: about `6.9 MB`;
- P05 HERO transfer derivative: about `5.9 MB`;
- original Drive masters remain unchanged.

Post-transfer screenshot findings:
- P01: palm fronds, sky, shoreline, grass and both photo subjects now resolve cleanly; the `旅する WEDDING → 2人 → ふたりの旅と、今日という一日。` reading path is materially stronger because source detail no longer reads as a damaged preview;
- P05: palms, sky, foreground couple and the printed-photo support now separate clearly; `HAWAII` remains the first read, followed by the emotional image, proposal field and arrival marker;
- both pages retain deliberate image-weight inequality and independently replaceable real-photo roles;
- no generated bridge asset was placed during this pass.

Japanese microcopy correction actually tested in Figma:
- `3355:10` P01 support caption: `Inter Semi Bold 13` → `M PLUS 1 Bold 13`;
- `3355:35` P01 issue meta: `Inter Semi Bold 9` → `M PLUS 1 Medium 10`;
- `3355:56` P05 HERO caption: `Inter Semi Bold 10` → `M PLUS 1 Medium 11`;
- `3355:57` P05 emotion caption: `Inter Semi Bold 9` → `M PLUS 1 Medium 10`;
- new support node `3366:2` adds a cream printed-photo caption strip behind `3355:57`; post-change screenshot confirms the previously low-contrast caption now reads against a stable local field;
- date/location and Latin-heavy metadata remain in Inter.

Resolution consequence:
- P01 and P05 promoted HERO/support roles now exceed the `300 ppi` target at their current A5 physical placement;
- the remaining print warning is not source pixel capacity but actual printer-template, CMYK and physical proof verification.

Generated bridge-art comparison:
- Candidate A: tropical editorial extension;
- Candidate B: tactile ephemera collision;
- Candidate C: graphic print burst;
- all three, plus one attempted alpha-extraction revision of A, were rejected because file inspection reported `hasAlpha: no` and the checkerboard was baked into RGB pixels;
- no rejected asset was placed in Figma or promoted to Drive/Git production asset status.

Live Google Drive source-gap recheck:
- image searches `沖縄` and `韓国` still returned page/reference/generated editorial files rather than promotable autobiographical trip photos;
- rejected examples include `1DmbuDQ1I7ZhBr58ULJ4hXczkdRbmEI6u` / `REFERENCE_RURUBU_WEDDING_GOAL_MEMORY_1DAY_PAGE01.png`, `1JDainj5YYuEVSyS2QIxNy9IJBQ2r7d7s` / `PAGE01.png`, `1C-4MEw3-NbR__TN18ShvzwwY6qYRRZUj` / `REFERENCE_RURUBU_WEDDING_GOAL_PROFILE_QA_PAGE02.png` and `1WT9ks_SSOBMoyD2aagFVIdZ0ar637VQt` / `PAGE02.png`;
- `クッキー`, `メロン`, `日常` and `犬` returned zero image results;
- no result from this search was promoted or placed.

Current single largest P01 visible gap:
`TRUE-ALPHA, PHOTO-DERIVED BRIDGE ART THAT IMPROVES THE PAGE AFTER PLACEMENT`.

Current single largest P04–P05 spread gap:
`P04 OKINAWA/KOREA REAL-PHOTO SOURCES + COMPLETE TWO-PAGE SPREAD QA`.

## P01 visual lock + P04–P05 substantive center-spread production — 2026-08-31

### P01 final bridge decision

Live Figma comparison:
- Candidate H / no bridge `3355:2`;
- Candidate I / real-foliage extension `3371:2`;
- Candidate J / real-photo + native-print collision `3371:38`.

Candidate I and J reused only the verified `035` image hash. Screenshot QA rejected both: I introduces a duplicated left-edge palm mass that scatters the support-photo path; J breaks the masthead/date quiet zone with a small decorative crop. Candidate H remains the fastest and cleanest `旅する WEDDING → SHOGO & SHIORI → real couple → today` read.

The accepted state is named:
`P01_V20_CANDIDATE_H / P01 VISUAL LOCK CANDIDATE / NO BRIDGE / FULL-RES VERIFIED / A5 PROVISIONAL PASS`.

The lock retains:
- HERO `3355:7`, Drive `1_Tbnct5i8xqEgBwtiY3PsfzUSSWGpBkc`, image hash `743b9dadda4774b8dc0f323db2a1fa4485744349`, `4500 x 3000`, approximately `361 ppi`;
- support `3355:8`, Drive `183kgq1fGMRNiEQFBkp4KlSkaIdIulaKL`, image hash `fff2e955f6806513de82afd22bc93869e2e14ddb`, `4500 x 3000`, approximately `1143 ppi`;
- native masthead, names, date/location and cover copy;
- no proxy, fake content, AI decoration or broken alpha.

P01 passes thumbnail, reading-scale and provisional A5 inspection. It remains explicitly below `PRINT_READY` until printer-template, CMYK/profile and physical proof gates pass.

### P04–P05 physical center spread

Current preferred wrapper:
- `3373:2` / `P04-P05_V20_CENTER_SPREAD_CANDIDATE_A / CURRENT PREFERRED / PHYSICAL SPREAD QA PASSED / P04 SOURCE GAPS OPEN`;
- logical size `1164.1 x 816.38` Figma units, representing the `296 x 210 mm` trimmed spread;
- physical fold guide `3373:62` remains a non-printing QA layer.

P04 production A `3373:3`:
- large elastic Okinawa PLACE HERO slot `3373:12`;
- smaller, differently proportioned Korea PEOPLE/ACTION slot `3373:10`;
- Korea DETAIL/PLACE slot `3373:9`;
- visible native/source-honest role labels state that real photography is still pending;
- equal card geometry and lower explanatory UI panels were removed after screenshot QA;
- slots now overlap with deliberate inequality and can absorb portrait or landscape sources without rebuilding the spread story.

P05 production F `3373:29`:
- full-resolution Hawaii ENVIRONMENT HERO `3373:31`, Drive `1G-8t1JbX-GyqeMhuPLCPjsLKT_oue4Rb`, image hash `d5b01512eafc825820df06f40392a9d72fef3d85`, `4500 x 3000`, approximately `374 ppi`;
- real couple-kiss EMOTION support `3373:32`, Drive `1sIghnrqtfs0WxwBiVdmsZopsQ29tIpiw`, image hash `e4ce0f0ae0ca2c86b8fe7beb4523c8e34264bc0b`, `4500 x 3000`;
- `HAWAII` increased to native `M PLUS 1 Black 64` and remains the spread's largest display read;
- proposal calm field `3373:60` uses only a short grounded heading because final proposal facts are not verified;
- arrival field `3373:56` retains editable `YOKOHAMA → 2026.10.24` and `そして、今日へ。`.

Route/fold/depth correction:
- P04 back route `3373:5` runs beneath the elastic photo mass;
- P04 front arrow `3377:2` stops before the fold;
- P05 front route `3373:54` and `3373:55` re-emerges after the fold and reaches the arrival object;
- no faces, small copy or critical facts rely on fold alignment.

Final screenshot QA:
- thumbnail: the spread reads as `P04 journey accumulation → P05 Hawaii peak` rather than two equal pages;
- reading scale: title, photo-role labels, emotion image, calm proposal field, route and arrival remain separable;
- A5 provisional scale: visible text is `10 pt` or larger, Hawaii HERO retains sufficient source resolution, and the fold contains no critical content;
- no generated personal-memory photo or third-party asset is present.

Live Drive recheck again returned only reference/page/generated/editorial results for `沖縄` and `韓国`; none was promoted. The largest remaining visible spread gap is therefore the absence of verified real Okinawa/Korea photography inside the otherwise production-ready elastic P04 geometry.

## Whole-book acceptance

A V20 design candidate must show:
- distinct cover silhouette;
- coherent P02–P03 spread;
- unmistakable P04–P05 center-spread peak;
- P06–P07 contrast and transition from `REAL LIFE` playfulness to `TODAY` wedding discovery;
- P07 remains useful to a guest already seated, with verified look-around details and no schedule-first/pre-arrival logistics takeover;
- calmer P08 ending;
- no page that exists only because an older version had it;
- no unresolved low-res/proxy/fact issue silently treated as final.

`DESIGN_ACCEPTED` is still not `PRINT_READY` until printer template, export, color/output and physical proof requirements pass.

## Full-book visible production pass — 2026-08-31

The live V20 surface now has a visible production candidate for every page. The final whole-book review surface is:
- contact sheet `3413:3` / `V20_FULL_BOOK_CONTACT_SHEET_C / CURRENT PREFERRED / 8 PAGES / DESIGN COMPLETE / PRINT READY NO`;
- P01 locked cover `3355:2`;
- P02–P03 physical spread `3407:2`, containing P02 `3407:3` and P03 `3407:22`;
- P04–P05 current preferred spread `3373:2`, containing P04 `3373:3` and P05 `3373:29`;
- P06–P07 physical spread `3408:2`, containing P06 `3408:3` and P07 `3408:19`;
- P08 quiet close `3410:2`.

Page behavior confirmed in screenshot QA:
- P02 is a bright, asymmetric personality introduction using verified real-source crops only as temporary profile roles; no unverified biography was added;
- P03 is calmer and story-led, with semantic native copy that explicitly avoids unverified dates or events;
- P04 now has a complete visible photo field using one clearly managed generated generic coast asset, while the real Okinawa/Korea replacement requirement remains open;
- P06 uses unequal real-source temporary crops and remains viable without dog-specific or unverified daily-life claims;
- P07 is a zero-photo seated-guest discovery page, not a timetable or access page; the 11 destination names remain native `GROUNDED_CANDIDATE / CONFIRM` layers and no table numbers or guest assignments were invented;
- P08 is a calm closing image with the verified names, date and location in native text.

Generated temporary asset adopted for visible completion:
- repository path `assets/rurubu-v20/generated-temp/V20_P04_GENERIC_COAST_TEMP_A.png`;
- SHA-256 `ed2a1b056c737c6b41e1fa53a19cf197383ce60b19993caa135c552ba1dd4934`;
- source dimensions `1402 x 1122`;
- Drive ID `1ctxFvrvJhYWRWCU_OzDNs9K6Zx85Jxhq`;
- Figma image hash `9355bec66d5083714368a1ab96fb3e69a3337822`;
- placed only in P04 nodes `3373:12`, `3373:10` and `3373:9`;
- contains no people, names, dates, logos or authoritative copy and is not accepted as autobiographical evidence;
- all three roles are explicitly named `GENERATED ... TEMP / REPLACE REQUIRED` in Figma, with a small non-final QA marker `3413:2`.

Final QA correction pass:
- P04 image fills were re-applied directly after the upload transport left the old placeholder fills visible;
- P03 calm-body text `3407:36` was shortened and reduced to remove lower-edge overflow;
- P08 sign-off text `3410:14` was resized to remove awkward character wrapping;
- superseded contact sheets remain named as superseded; `3413:3` is the current review surface.

Current acceptance state:
- `DESIGN_COMPLETE`: yes, as a visible whole-book candidate;
- `SOURCE_COMPLETE`: no, because P04 real Okinawa/Korea sources, P06 role-specific everyday/dog sources, P07 final verified venue details and several personal copy fields remain open;
- `PRINT_READY`: no, pending source replacement, final copy lock, 11-destination confirmation, printer template, bleed/export, CMYK/profile and physical proof.

## Full-book visible quality pass — 2026-08-31

Current review surface:
- contact sheet `3420:2` / `V20_FULL_BOOK_CONTACT_SHEET_D / CURRENT PREFERRED / VISIBLE QUALITY PASS / PRINT READY NO`;
- P01 `3355:2` and P05 `3373:29` remained locked;
- updated P02 `3407:3`, P03 `3407:22`, P04 `3373:3`, P06 `3408:3` and P07 `3408:19`;
- P08 `3410:2` was screenshot-reviewed and held.

### P04 visible quality

The repeated single coast image was removed from all three P04 roles. Current distinct fills:
- PLACE HERO `3373:12`: Drive `1asmjKbDFm_9Eozm6Qq2ZVx2PyF7zMFBC`, hash `2605e0f2b32da7bba5b1b3f88e245be77df27ab3`;
- anonymous TRAVEL ACTION `3373:10`: Drive `1jI8Km3W1uPqcx4Z75wi4LdTfkG6j66mZ`, hash `84842aba6d58e7cc4fb63139acc0b2c215b258c4`;
- generic TRAVEL DETAIL `3373:9`: Drive `1UUCs1p3boxq4CaTOU1Bdz687NyRyOft4`, hash `1ab55531178fa16f66a9c2080bb2e74bc2f93692`.

All three remain generated temporary assets and do not claim Okinawa, Korea or autobiographical memory. The visible production marker `3413:2` is hidden. Reader-facing, fact-independent captions were added with supports `3419:2`, `3419:3`, `3419:4`; route/fold continuity and the weaker-left/stronger-right spread hierarchy remain intact.

### P06 visible quality

The reused Hawaii/wedding photography was removed from the current P06 frame. Current generated temporary roles:
- LIFE HERO `3408:7`: Drive `1OzCb8szXQwzPs3YDVjIZvZhFPrqsmkF0`, hash `c8d652cf45e81607795989575effb560c68752d2`;
- FOOD `3408:8`: Drive `169_GxGWMHNaFG9AASluleqVFCExjSNhp`, hash `728a0204eb5ee66e574b132d9b50fbdb3866dfe4`;
- PET-LIFE `3408:9`: Drive `1lgcwtFn7up34pDHooRTHiErVjOj0Wl93`, hash `88563f699fd6d409fa0450db26f4634f0ecddc21`;
- FUN `3408:10`: Drive `1nVJx5NZIlFVNtsvBpzLNXaj5ij1C2jl-`, hash `15abdfd38f2eb01b6c367d177f5e971fca70e68d`.

The dog image shows only a generic partial pet-life scene and is explicitly not Cookie or Melon. Visible production notes were replaced by native reader-facing `WEEKEND NOTES`, an everyday observation line and a short discovery line.

### P07 visible quality

P07 remains a seated-guest discovery page led by the native `11 DESTINATIONS AROUND YOU` structure. Two small atmosphere-only details were added behind/among destination labels:
- paper discovery `3418:2`: Drive `1IpuiH8gI6T-7ELC6_LpyFf_C5msNhJqF`, hash `07e19b61460c8a3bb810d49a9fa54f29fc79a020`;
- table-color discovery `3418:3`: Drive `1FK4xuMKfEyB27btaavNX6mrvURreJ2o_`, hash `f8b1e25bb9ec34ba27a420616c5835de1667af88`.

Neither image is accepted as actual venue evidence. The visible `実在する会場ディテールを確認後にここへ。` production note was replaced by a reader-facing prompt. No schedule, access, table assignment or operational wedding fact was added.

### P02–P03 micro correction

- P02 Japanese kicker support `3418:4` separates `このふたり、どんな人？` from the `WHO WE ARE` display mass without removing either;
- P03 episode shapes/text `3407:28`–`3407:33` now behave as offset hard-shadow print slabs rather than equal rounded UI cards;
- P03 narrative `3407:36` no longer exposes production instructions or unverified-story warnings to the reader.

### Final QA evidence

- page screenshots reviewed: P04, P06, P07, P08, P01 and P05;
- spread screenshots reviewed: `3373:2`, `3408:2`, `3407:2`;
- final contact sheet reviewed: `3420:2`;
- current eight-page source audit found zero visible strings matching the production-note set `REPLACE BEFORE PRINT / REAL FACTS ONLY / 確認後 / 未確認 / native text / 実在する会場ディテール / GENERATED TEMP VISUAL`;
- current visible fonts are limited to the established `M PLUS 1` and `Inter` families;
- minimum visible Figma font size by page: P01 10, P02 13, P03 14, P04 10, P05 10, P06 14, P07 13, P08 12;
- the P04/P06/P07 generated images remain replaceable independent fills with Drive IDs and Figma hashes recorded in their layer names.

One rejected generation:
- the first P06 FUN variant was rejected because a circular crop and black corners were baked into the raster, reducing crop flexibility;
- it was not copied into the repository, uploaded to Drive or placed in Figma.

Current state remains `DESIGN_COMPLETE / SOURCE_COMPLETE = NO / PRINT_READY = NO`.

## Generated PNG editorial-parts acceptance pass — 2026-08-31

This section supersedes the same-day SVG editorial-parts trial as the current format decision.

### Current preferred nodes

- P01 lock, untouched: `3355:2`;
- P02–P03 spread: `3447:2`;
  - P02 `3447:43`;
  - P03 `3447:67`;
- P04–P05 spread: `3434:2`;
  - P04 `3434:3`;
  - P05 `3434:34`, content unchanged;
  - adopted sparse generated-PNG route `3434:69`;
- P06–P07 spread: `3447:90`;
  - P06 `3447:150`;
  - P07 `3447:174`;
- P08: `3446:2`;
- current full-book contact sheet: `3465:2`.

Route candidates compared in the live spread:
- Candidate A `3463:3`: scenic printed route, rejected;
- Candidate B `3462:2`: travel-ephemera route, rejected;
- Candidate C `3434:2`: sparse generated PNG route, adopted.

### Alpha and source evidence

- all ten adopted files are RGBA PNGs with measured transparent pixels;
- all ten adopted files were uploaded and read back from Drive folder `1Xs7x_CqOLvXin2bkbjNGosJ8TtSskW_w`;
- image hashes and exact Git/Drive/SHA records are in `assets/rurubu-v20/editorial-parts/README.md`;
- generated artwork contains no baked authoritative name, destination, date, body copy or official mark;
- reader-facing text remains native and independently editable in Figma;
- the earlier SVG folder `1Ch422qqyxPD_AAJ5UHLtMRUrvKKatS5Z` is superseded, not current.

### Page QA

- P07: four materially distinct paper families replace selected flat shells while five native color labels remain; this keeps the `TODAY'S TRAVEL GUIDE → 11 DESTINATIONS → discovery` order and avoids turning all eleven items into one sticker family.
- P04–P05: sparse route C joins the spread without covering faces, Hawaii display or proposal/arrival fields; the route weakens around the fold and returns on P05.
- P06: the generated tab and tape add tactile everyday-editorial character without increasing the photo count or creating scrapbook overload.
- P03: the single paper edge softens Episode 01 while the page remains calmer than P06/P07.
- P02: the generated profile badge makes the Q&A support read as travel-editorial rather than a plain ellipse and stays subordinate to the portrait and title.
- P08: the generated issue stamp adds matte print character while preserving the quiet close.
- P01: no new part was added and the visual lock remains intact.
- P05: content and hierarchy remain locked; only spread continuity passes across it.

### Full-book QA

Contact sheet `3465:2` was screenshot-reviewed.

- 3-second scan: P01 remains the strongest entry; P04–P05 remains the emotional peak; P08 remains the calm exit.
- page rhythm: P02/P03 and P06/P07 retain clear internal contrast rather than becoming a repeated template.
- editorial density: generated paper/ink artifacts now bridge photos and native text, most visibly on P06 and P07.
- repeated-family warning: no all-book ticket system was introduced; route, tab/tape, episode edge, profile badge, destination shells and issue stamp remain page-specific.
- A5 readability: current page minima remain P01 10, P02 13, P03 14, P04 12, P05 10, P06 14, P07 13 and P08 12 Figma points; the contact-sheet clone is excluded because it is intentionally scaled.
- visible production-note audit remains zero for `REPLACE BEFORE PRINT / REAL FACTS ONLY / 確認後 / 未確認 / native text / 実在する会場ディテール / GENERATED TEMP VISUAL`.
- visible font families remain limited to `M PLUS 1` and `Inter`.

Current acceptance state:
- `DESIGN_COMPLETE`: yes, as a generated-PNG editorial-parts candidate;
- `SOURCE_COMPLETE`: no;
- `COPY_LOCKED`: no;
- `PRINT_READY`: no.

Largest remaining visible quality gap:
`P06 REAL EVERYDAY / COOKIE / MELON SOURCE REPLACEMENT`.

Next exact task:
retrieve pixel-open verified real everyday, food and Cookie/Melon sources; replace the temporary P06 image fills inside `3447:150`; then re-run spread `3447:90` and full-book contact `3465:2` QA without changing the adopted PNG tab/tape system.
