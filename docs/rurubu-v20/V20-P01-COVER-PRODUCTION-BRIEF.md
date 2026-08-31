# V20 P01 Cover — Production Brief

Status: `PRODUCTION_AUTHORITY_BEFORE_DECORATED_FIGMA`

Purpose: translate the V20 principles into a cover that can be assembled in Figma mainly by placing approved real photography, prepared editorial assets and native variable text.

This is NOT a request for Figma to “make a Rurubu-like cover.” The cover composition and asset jobs are specified here first.

## 1. Cover job

Within ~3 seconds the viewer should understand:
1. this is an energetic travel-magazine-like wedding booklet;
2. Shogo & Shiori are the protagonists;
3. the page is rich, tactile and worth opening;
4. the cover is editorial, not a wedding-template card layout.

The cover may be visually dense and heavily layered.

## 2. Source-photo strategy

Current Hawaii source review produced three useful behavior models:

- `035.jpg` behavior — preferred environmental HERO: tropical environment naturally frames the couple; useful for masthead/photo collision and edge intrusion;
- `036.jpg` behavior — preferred close-couple personality support: faces/gesture are large, immediate and joyful; useful for fixing the protagonist-recognition weakness of `035` without sacrificing its environmental travel scale;
- `031.jpg` behavior — open sky/sea/environment; useful when the title needs large photo-negative-space;
- `023.jpg` behavior — dramatic scale / small people in large landscape; useful for a more editorial travel-book feel.

Do not select the final source solely from filename. Final decision requires actual-photo-in-layout comparison when the image can be placed reliably in Figma.

Working preference: `035 environmental HERO + 036 close personality support`, because the pair creates deliberate photo-weight inequality: destination scale first, recognizable couple immediately after.

### Verified `035.jpg` source evidence — 2026-08-30

The raw file was downloaded and pixel-opened, not judged by filename alone.

Verified source behavior:
- raw raster: `4500 x 3000 px`;
- aspect ratio: `3:2` landscape;
- bright Hawaii waterfront/park environment;
- couple is small and sits low/near center rather than dominating the frame;
- large palm leaves enter from top/left/right and already create a natural editorial frame;
- large blue-sky/bright-water field gives masthead and cover-hook placement room;
- strong foreground grass band can accept a lower feature vessel without covering faces;
- right-side palm trunks create useful depth but must not become clutter when a generated tropical cluster is added.

Print consequence:
- source-pixel capacity is comfortably above the V20 final-raster floor for an A5 cover crop; even using the full 4500 px width across 148 mm would be roughly 772 ppi before crop;
- resolution is therefore not the current blocker for this source;
- the real constraint is editorial crop/scale: keep the couple recognizable enough for a wedding cover while preserving the dramatic environment.

REAL → GENERATED bridge consequence:
- do **not** generate another full symmetrical tropical frame around this photo;
- any P01 tropical art should extend or counterbalance the real palm geometry, not duplicate it;
- keep the generated cluster sparse around the couple and masthead quiet zone;
- use photo-derived green/sky-blue/warm-yellow relationships as input, but avoid mechanically sampling the whole page into one flat palette;
- generated/editorial parts should introduce print/paper character and hierarchy that the clean photograph itself does not supply.

### Verified `036.jpg` source evidence — 2026-08-31

The original Drive file `183kgq1fGMRNiEQFBkp4KlSkaIdIulaKL` was downloaded and pixel-opened at source level rather than inferred from an old derivative filename.

Verified source behavior:
- source raster: `4500 x 3000 px`, JPEG, approximately 4.22 MB;
- close waist-up couple portrait with both faces large and unobstructed;
- Shogo is on image-left, Shiori on image-center/right;
- both subjects are smiling and making playful hand gestures, so the image communicates personality faster than `035`;
- Shiori's yellow dress creates a strong warm editorial color anchor; Shogo's dark brown suit provides useful contrast;
- bright water/sky background and distant mountain are soft and low-detail, giving generous crop tolerance around the couple;
- there is a large bright negative-space field on image-right;
- the photograph is high-key and should not be surrounded by equally pale support art without a keyline/shadow/printed-paper edge.

P01 role consequence:
- `036` should **not** replace `035` as another full-page environmental HERO by default;
- use it as a materially smaller but still forceful `PERSONALITY / RECOGNITION` support image that intrudes into the environmental HERO;
- crop should keep both faces, Shogo's shaka gesture and enough of Shiori's gesture/dress to preserve the playful reading;
- avoid a tiny thumbnail: the purpose is immediate protagonist recognition;
- a postcard / thick-bottom snapshot / irregular printed-photo treatment is preferable to a generic rounded card;
- place it where it does not cover the small couple inside `035`; the two images should read as `place + people`, not duplicate portraits competing with each other;
- because the right side of `036` is mostly bright negative space, crop aggressively toward the couple before allocating cover area; do not waste P01 area on empty water merely because the source is landscape.

Color consequence:
- the yellow dress is now a credible source for a warm feature accent or paper-vessel relationship;
- brown suit / warm yellow / Hawaii sky-blue / tropical green can create a more authored cover palette than generic evenly distributed pastels;
- keep skin natural and avoid pushing the already bright highlights further toward clipping in print-oriented grading.

Transfer state:
- the source is verified and suitable for P01 support testing;
- the original `4500 x 3000` source was successfully transferred to live Figma node `3355:8` on 2026-08-31;
- verified Figma image hash: `fff2e955f6806513de82afd22bc93869e2e14ddb`;
- Plugin API readback confirmed `4500 x 3000`, and a post-transfer Candidate H screenshot verified the intended close-couple crop;
- `036` is therefore `PLACED_IN_FIGMA / SOURCE VERIFIED`, while final layout approval still depends on the complete P01 composition and print proof.

The evidence strengthens the two-photo strategy: `035 = environmental travel scale`, `036 = human recognition/personality`.

## 3. Cover silhouette

The page must NOT read as:
`header / photo / footer cards`.

Preferred silhouette:
- masthead occupies a large irregular upper zone and enters photography;
- HERO photography controls the center and extends toward at least one edge;
- one strong editorial feature vessel collides with the lower/side hero area;
- one close personality support photo/paper object intrudes into the HERO rather than sitting in its own card;
- edge decoration enters from outside trim/bleed;
- small metadata/date/name elements use attached supports rather than a clean footer row.

At least one major title/photo collision must be obvious at thumbnail scale.

## 4. Layer plan — not a rigid z-index

Suggested interaction:

### A. BACKGROUND BASE
- warm paper / sky-responsive base;
- optional broad color slab or giant cropped type fragment;
- does NOT need to remain visible everywhere.

### B. HERO PHOTO
- `035`-behavior real environmental couple image;
- large, replaceable;
- may extend into bleed;
- may be partially covered by masthead, feature slab, support photo and tropical art.

### C. LARGE EDITORIAL COMPOSITE
- page-specific tropical/travel cluster;
- can sit partly behind HERO and partly in front via split assets if useful;
- dense near one edge/corner, sparse toward faces/title legibility.

### D. MASTHEAD
- original V20 wedding/travel masthead artwork;
- may sit partly behind a cutout/person edge and partly above photo;
- strong outlined/offset-shadow silhouette acceptable;
- not a commercial-logo trace.

### E. FEATURE VESSEL(S)
- one strong editorial container for a feature hook;
- can cover a large portion of HERO/support photography;
- vessel shape may be burst/ribbon/irregular slab/paper object;
- variable wording remains native.

### F. SUPPORT PHOTO / PAPER OBJECT
- preferred current source: verified `036.jpg`;
- one close personality support photo, not a row of equal thumbnails;
- crop toward faces/gestures; do not preserve unused bright right-side source area merely to honor original aspect ratio;
- postcard / printed snapshot / irregular paper treatment is preferred over a generic app card;
- must intrude into `035` HERO territory while keeping the small `035` couple legible;
- should be large enough to solve protagonist recognition at cover scan speed.

### G. TEXT SUPPORT + NATIVE TEXT
- names/date/location/feature hooks;
- supports created per actual background contrast;
- no requirement to isolate from photo.

### H. MICRO DISCOVERY
- 1–4 tiny marks only after hierarchy works;
- small arrow, issue number, mini travel mark, tiny note.

## 5. Prepared asset list

### `V20_P01_MASTHEAD_A`
Job:
- primary cover identity;
- creates large graphic silhouette and strong overlap with HERO.

Production:
- ideally transparent PNG/SVG-like artwork or high-quality raster with transparency;
- no variable date/name baked into art;
- original lettering treatment, not direct Rurubu logo copy;
- large enough for approximately 90–120 mm physical width depending on final placement.

Behavior:
- thick display mass;
- white/cream keyline and hard offset shadow may be used;
- can support a small attached label/tab;
- no soft SaaS gradient/shadow styling.

### `V20_P01_TROPICAL_FRAME_CLUSTER_A`
Job:
- turn the cover environment into an authored magazine edge rather than a flat photo.

Composition brief:
- dense beyond one top/side corner;
- tropical foliage + a few flower shapes + one small travel-print cue;
- asymmetric;
- transparent center opening around faces/title;
- designed to be partly hidden by HERO/frame and partly sit above another layer;
- no text;
- no centered bouquet;
- no symmetrical wreath;
- when paired with `035.jpg`, extend/counterbalance the real palm geometry instead of repeating palm leaves around every edge;
- do not repeat `036` yellow uniformly; use it as one intentional warm accent relationship.

### `V20_P01_FEATURE_VESSEL_A`
Job:
- support one major cover hook directly over photography.

Possible silhouette:
- irregular warm-yellow or cream printed slab informed by the real `036` dress, balanced against sky-blue/green from the environment;
- attached small contrasting tab;
- may cover 50%+ of the photo area it intersects;
- no generic rounded-app-card appearance;
- no text baked in.

### `V20_P01_DATE_LOCATION_SUPPORT_A`
Job:
- give date/location strong magazine metadata treatment without turning it into a footer.

Possible form:
- stamp shell + small paper tab;
- native text layered above;
- can overlap HERO or masthead edge.

### `V20_P01_SUPPORT_FRAME_A`
Job:
- carry the verified `036` close-couple personality image.

Preferred form:
- postcard / printed snapshot / thick-bottom photo edge;
- opening/crop optimized for both faces and gestures rather than the original 3:2 frame;
- optional small tape/print detail;
- sufficiently strong edge/keyline/shadow to separate the high-key photo from the high-key `035` environment;
- no baked caption.

### `V20_P01_BOTTOM_EDITORIAL_CLUSTER_A`
Job:
- create lower-page information density without a clean row of cards.

Composition:
- one feature vessel + one small travel object + one tiny locator/arrow + negative spaces for native coverlines;
- asymmetric, irregular; different depths;
- transparent background outside cluster.

## 6. Text support vocabulary for P01

Do not solve every coverline with a box.

Possible mix:
- masthead: outline/shadow directly over photo;
- feature hook A: irregular opaque slab;
- feature hook B: short colored ribbon partially over photo;
- date/location: stamp/paper field;
- tiny metadata: direct high-contrast type in a naturally quiet photo area;
- one mini note: small paper tab or handwritten support.

The visible support silhouettes should be different.

## 7. Strong overlap requirements

At production review, target at least these relationships:
- masthead materially overlaps HERO photography;
- HERO materially overlaps/occludes part of one background composite or vice versa;
- one feature vessel covers a meaningful section of photo, not just touches its edge;
- the `036` close personality photo/paper object intrudes into `035` HERO territory;
- one edge composite is cropped by bleed;
- one small stamp/label overlaps two different layer types.

These are relationship goals, not percentage quotas.

## 8. What stays editable in Figma

Must stay independently editable:
- HERO photo;
- support photos;
- Shogo & Shiori names;
- date;
- location;
- cover hooks/captions;
- issue/meta text;
- text support size/position when copy changes.

Prepared art can be raster/vector:
- masthead shell/art;
- tropical cluster;
- feature vessel shell;
- stamp shell;
- paper/photo-frame overlay;
- travel/decor clusters.

## 9. Anti-AI rejection criteria

Reject the cover if:
- it can be described as “logo centered, hero centered, three cards at bottom”;
- all text supports are matching rounded boxes;
- photo is politely contained with no edge/collision behavior;
- flower/travel assets are evenly distributed around the page;
- every asset is fully visible;
- masthead could be swapped for any generic wedding logo without changing composition;
- small stickers are compensating for weak HERO/title structure;
- the page uses one evenly distributed pastel palette with no strong hierarchy;
- the page looks like a social-media template rather than a printed travel magazine;
- `035` and `036` are shown at near-equal size as two polite photo cards instead of `environment + personality` with deliberate inequality.

## 10. Cover QA sequence

1. grayscale thumbnail: masthead + environmental HERO + main feature vessel must read immediately;
2. second scan: close personality support must make the couple immediately recognizable without becoming a second equal HERO;
3. hide micro accents: composition should remain strong;
4. inspect A5 actual size: coverlines/date/names readable;
5. check both source photos for face/gesture: intentional occlusion only;
6. replace HERO/support with alternate aspect behavior: layout should be adjustable without complete rebuild;
7. compare with North Star for density/energy/overlap, NOT coordinates or copied branding;
8. verify all authoritative text remains native;
9. verify every raster composite has enough source pixels for physical size.

## 11. Production order

1. `035` environmental HERO + `036` personality-support placement proof;
2. masthead A production;
3. tropical frame cluster production from the actual two-photo color/negative-space relationship;
4. feature vessel production;
5. date/location support production;
6. support-frame refinement around the actual `036` crop;
7. assemble first decorated P01 in Figma;
8. judge actual gaps before creating bottom/micro cluster;
9. only then make missing micro assets.

Do not produce a giant generic sticker library before the first decorated cover exists.

## 12. Final production-pass decision — 2026-08-31

Live comparison states:
- no bridge: Candidate H `3355:2`;
- real-foliage extension test: Candidate I `3371:2`;
- real-photo + native-print collision test: Candidate J `3371:38`.

All photo-derived test fragments reused the verified `035` Figma image hash. No generated foliage, invented species, fake memory object or broken-alpha raster was introduced.

Decision:
- Candidate I adds an isolated duplicate palm mass at the left edge and interrupts the path from masthead to the close-couple support;
- Candidate J adds a cyan print strip and photo crop but makes the masthead/date quiet zone busier without increasing recognition or editorial meaning;
- Candidate H without bridge remains strongest at thumbnail, reading and A5 provisional scales;
- the final current decision is therefore `P01 VISUAL LOCK CANDIDATE / NO BRIDGE`.

Lock evidence:
- frame `3355:2`;
- `035` HERO `3355:7`, verified `4500 x 3000`;
- `036` personality support `3355:8`, verified `4500 x 3000`;
- current effective resolution remains approximately `361 ppi` and `1143 ppi` respectively;
- authoritative text remains native;
- no proxy image, fake content, generated decoration or broken alpha is visible.

This is not `PRINT_READY`. Printer template, CMYK/profile conversion and a physical A5 proof remain separate gates.
