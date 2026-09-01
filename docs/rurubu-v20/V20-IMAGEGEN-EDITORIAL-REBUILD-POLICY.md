# Rurubu WEDDING V20 — ImageGen-first Editorial Rebuild Policy

Status: `CURRENT / PRODUCTION AUTHORITY / ALL-PAGES-OPEN / ZERO-BASE-PNG`

This document records the current production direction for Rurubu WEDDING V20. It exists to prevent future production runs from falling back to legacy SVG aesthetics, overusing native Figma geometry, or treating currently preferred pages as permanently locked before the book reaches the target editorial quality.

## 1. Target quality

V20 should aim for the excitement, density, hierarchy, layered collisions and page-discovery experience of a high-quality Japanese travel information magazine.

The goal is not to reproduce a specific commercial magazine page 1:1. The goal is to transfer the editorial principles that make strong Japanese travel magazines exciting to browse:

- dominant title events;
- strong secondary subtitles;
- many unequal photo roles;
- dense but readable information clusters;
- multiple scales of headlines, captions and micro-notes;
- deep front/back layer interaction;
- tickets, stamps, ribbons, cut paper, article vessels and photo-bound labels;
- page-edge crops and partial objects;
- small icons and discoveries that reward looking around;
- strong page-to-page tempo;
- deliberate calm islands inside otherwise dense pages.

A page is not finished merely because it is clean, readable or structurally complete. It should also feel authored, exciting and magazine-like.

## 2. No permanent visual locks yet

P01, P05, P08 and every other page remain visually improvable.

Current preferred nodes are baselines, not untouchable final masters.

Do not use `LOCK` as a reason to avoid high-value visual improvement. A current page may be held unchanged in a specific run when a candidate does not beat it, but no page is permanently blocked from future improvement until the whole book reaches the target editorial quality and survives full-book/A5 proof review.

Rules:

- preserve the current preferred version before risky experiments;
- create non-destructive candidates where useful;
- compare current vs candidate on the actual page, spread and full-book contact sheet;
- adopt only when the new version materially improves editorial quality;
- revert or reject when the current version is stronger.

`CURRENT PREFERRED != PERMANENTLY LOCKED`.

## 3. Old SVG legacy is not design authority

Legacy SVG-derived parts and the design language behind them are superseded when they look generic, flat, icon-pack-like, UI-like or visually weak.

Do NOT:

- convert an old SVG to PNG and call it a redesign;
- rasterize an old vector and preserve its silhouette;
- use an old SVG as a visual tracing reference for a new PNG;
- keep the same old composition and merely add paper texture, shadow or color;
- upscale old vector-looking art into a larger raster asset;
- treat legacy icon geometry, corner radii, strokes, layout or grouping as authority.

The only thing that may be inherited from a weak legacy asset is its functional job.

Example:

`old destination label` may contribute only the requirement `a destination-label editorial vessel is needed`.

Its shape, stroke, colors, icon, spacing, silhouette and composition must be reconsidered from zero.

## 4. Zero-base PNG generation

When a legacy part is weak, redesign it from a blank visual brief as new page-aware raster editorial artwork.

Preferred method:

1. inspect the actual page/spread first;
2. identify the missing editorial job;
3. inspect the page photography, palette, title mass, negative space and current collisions;
4. define the required physical size and text quiet zone;
5. design 2–3 materially different candidates from zero;
6. generate as high-resolution PNG with real alpha when transparency is required;
7. pixel-check alpha instead of trusting the prompt;
8. place each serious candidate in the actual Figma page;
9. compare page / spread / full-book behavior;
10. approve only the strongest candidate.

Do not derive the new artwork from the rejected SVG's visual form.

## 5. ImageGen is the primary design-production surface

Figma should increasingly behave as a compositor rather than the place where visual personality is invented from primitive geometry.

Image generation should be considered for:

- mastheads;
- page titles;
- subtitles and subtitle holders;
- headline slabs;
- article/text vessels;
- short-copy frames;
- caption vessels;
- Q&A/profile vessels;
- photo frames and photo-bound caption structures;
- ticket/luggage-tag/stamp families;
- route composites;
- badges;
- ribbons;
- tape/paper fragments;
- bursts;
- arrows;
- decorative clusters;
- guide marks;
- small editorial icons;
- page-edge ornaments;
- micro-discovery units.

Figma should mainly:

- place assets;
- control z-order;
- mask/crop photos;
- keep real photos independently replaceable;
- keep authoritative/factual copy native and editable;
- make final text positioning and line-break adjustments;
- perform spread/full-book/A5 QA.

Avoid solving page personality with repeated native rectangles, circles, polygons, pills or generic card grammar when a purpose-built editorial asset would produce a stronger magazine result.

## 6. Generate the vessel first; copy may adapt later

Article frames and information vessels do not need to be perfectly sized to current draft copy before they can be designed.

It is acceptable — and often desirable — to create the visually strongest vessel first, then let the human editor adjust final copy length, line breaks and minor text size to fit the vessel.

Generate vessels with intentional quiet zones for native text.

Useful vessel classes include:

- 2-line short note;
- 3–4-line feature note;
- 6–8-line article field;
- photo caption tab;
- episode field;
- profile/Q&A field;
- editor-pick field;
- destination label;
- small fact/index strip.

Do not bake authoritative long body copy into generated artwork.

## 7. Prefer editorial units over isolated stickers

Do not only generate one icon or one rectangle at a time.

Where useful, generate a coherent editorial unit that already includes multiple interacting visual functions, for example:

- `BEST SHOTS UNIT` = caption vessel + tape + tiny icon + accent edge;
- `EPISODE UNIT` = article vessel + chapter tab + print edge + micro marker;
- `DESTINATION UNIT` = label shell + tiny route cue + small icon + paper collision;
- `FEATURE TITLE UNIT` = title art + subtitle holder + burst + route fragment;
- `PHOTO FEATURE UNIT` = photo frame + caption tab + paper backing + tiny label.

Figma then places the finished unit and overlays only the editable/native text that must remain factual.

## 8. Deep layer structure is mandatory

The book should not look like a flat set of clean components.

Think in multiple depth levels:

- paper/background;
- hero photography;
- support photography;
- photo frames/backing;
- route or page-specific decorative layer;
- main title artwork;
- subtitle/ribbon;
- article vessel;
- label/ticket/tag;
- icon/burst/stamp;
- tiny caption/meta/folio.

These levels may cross one another.

Examples:

- title overlaps the hero photo;
- subtitle bites into the title;
- route goes behind one photo and returns in front of another;
- article vessel partially covers a photo;
- stamp overlaps both a label and image edge;
- a mini icon sits partly outside the trim/crop area;
- a photo frame is itself partly hidden by a title or article field.

The target is magazine layering, not clean UI stacking.

## 9. More density and excitement, without losing reading order

Current V20 production has often been too clean and too restrained compared with the intended travel-magazine experience.

Future passes should be willing to increase:

- small captions;
- tiny labels;
- page-specific icons;
- mini photos/details;
- route points;
- short editorial notes;
- badges;
- asymmetric edge elements;
- feature-support graphics;
- photo/title collisions.

But density must remain hierarchical.

A useful target pattern is:

- 1 dominant first-read event;
- 2–4 medium secondary events;
- several micro discoveries;
- at least one calm area where the eye can recover.

`MAGAZINE DENSITY != RANDOM CLUTTER`.

## 10. Titles and subtitles are major generated assets

Titles and subtitles should not default to plain native Figma text when that produces a mockup-like result.

For important display moments, test generated title/subtitle artwork with:

- strong scale;
- outlines/keylines;
- controlled offset shadows;
- paper/ribbon support;
- slight print roughness;
- asymmetry;
- layer collision;
- page-specific ornaments.

Keep long factual copy native.

Generated title artwork must remain readable and should be compared at actual A5 size.

## 11. Icons and ornaments must be page-aware

Do not revive generic old SVG icon sets.

New icons/ornaments should be designed for the current page and publication DNA. Possible roles include:

- route marker;
- camera cue;
- food cue;
- dog/paw cue;
- wave/sun/flower cue;
- location marker;
- travel/ticket cue;
- small arrow;
- discovery marker;
- issue/stamp cue.

They should support the page rather than form a reusable corporate icon pack.

## 12. Photo frames may also be generated

Do not default every image to a rectangle with a white stroke or corner radius.

Different photo roles may use different generated treatments:

- HERO: minimal frame or bleed;
- EMOTION: printed-photo object / paper backing;
- DETAIL: ticket-attached or irregular small frame;
- LIFE/FUN: casual printed frame, tape, cut-paper treatment;
- DISCOVERY: small guide-card/photo-label hybrid.

Important real photography must remain replaceable and crop-safe.

## 13. Full-book improvement priority

All eight pages remain candidates for improvement.

Do not block P01, P05 or P08 merely because they are currently among the strongest pages.

Instead:

- protect current preferred versions;
- keep improving the weakest pages first;
- revisit stronger pages when full-book comparison shows that their title/subtitle density, editorial artifacts, layering or excitement still lag the target reference experience;
- stop only when the candidate fails to beat current.

A page may be temporarily held, not permanently closed.

## 14. Review standard

Every meaningful candidate must be reviewed at four levels:

1. asset alone — technical defects only;
2. page — first read / hierarchy / collision / readability;
3. spread — balance / fold / left-right tempo;
4. full-book contact — page differentiation / peak / calm / publication DNA.

Then inspect at A5 actual size.

Ask:

- does this look more like an authored travel-magazine page and less like a Figma mockup?;
- is there more excitement and discovery?;
- did the page gain real layer depth?;
- did title/subtitle hierarchy improve?;
- are the micro details useful rather than random?;
- did the page become merely busier, or actually better?;
- should something be removed, enlarged, replaced or moved behind/in front instead?;
- does the current version still beat the candidate?

## 15. Technical requirements for generated assets

Preferred:

- high-resolution PNG;
- real transparent alpha where required;
- approximately 300 ppi or better at intended placement size;
- no baked checkerboard;
- no fake paragraph text;
- no random glyphs;
- no glossy 3D unless a rare page-specific reason exists;
- no generic corporate icon-pack look;
- no dependence on old SVG silhouettes.

Rejected assets should remain documented with the actual rejection reason.

## 16. Current production consequence

From this point forward:

- do not describe P01/P05/P08 as permanently locked;
- do not preserve weak legacy SVG-derived visual language for continuity;
- use current preferred nodes as safe baselines;
- redesign weak visual parts from zero as PNG editorial artwork;
- generate frames/vessels as well as titles, subtitles, icons and ornaments;
- let final human copy adapt to strong generated vessels where appropriate;
- increase multi-layer editorial density and magazine excitement across the whole book;
- keep Figma primarily as the editable compositor and QA surface.

The guiding principle is:

`CURRENT PREFERRED IS A BASELINE, NOT A CEILING.`

and:

`KEEP THE JOB; REDESIGN THE OBJECT.`
