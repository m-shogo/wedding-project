# Rurubu WEDDING — Completeness Gates

Status: `NO_BLIND_SPOT_CHECKLIST`

A page is not ready for Figma placement until every category below has an explicit answer.

## 1. Editorial purpose
- one-sentence page job;
- what the guest should understand in 3 seconds;
- what they should read next;
- what emotional or practical job the page performs in the whole book.

## 2. Content truth
- exact real content expected on the page;
- which facts are confirmed;
- which copy is placeholder;
- which items are optional;
- what must not be invented by AI.

## 3. Capacity
- approximate Japanese character count for each text block;
- maximum acceptable answer/story length;
- photo count range;
- what happens if content is shorter/longer than expected.

This prevents the layout from collapsing when real copy replaces placeholders.

## 4. Reading hierarchy
- FIRST READ;
- SECOND READ;
- THIRD READ;
- useful information;
- micro-discovery;
- calm reading zone.

## 5. Zone geometry
- approximate percentage/mm zones;
- hero zone;
- secondary cluster zones;
- calm body-copy zone;
- page-edge/bleed zones;
- gutter-aware safe zones.

## 6. Photo plan
For every image:
- role;
- relative size;
- orientation/aspect;
- mask type;
- crop/focal-point rules;
- acceptable rotation;
- overlap behavior;
- replaceability;
- proxy/final state;
- minimum final resolution.

## 7. Typography plan
- page-title role;
- section title roles;
- native body/caption roles;
- Japanese line-break expectations;
- English subtitle usage;
- minimum actual-size readability;
- outline/keyline/shadow rules for display type.

## 8. Color jobs
- one dominant color;
- one support color;
- one surprise accent;
- body field;
- text/background pairing;
- no hue-only semantic meaning;
- grayscale hierarchy survives.

## 9. Parts inventory
- exact parts needed;
- semantic reason for each part;
- existing/search/generate state;
- variants needed;
- parts explicitly forbidden on that page.

## 10. Overlap and z-order
- what crosses what;
- foreground/background relationship;
- frame vs photo separation;
- title/photo interaction;
- safe text layers;
- intentional vs accidental spill.

## 11. Density map
- highest density zone;
- medium zone;
- calm zone;
- intentional negative space;
- density difference from adjacent pages.

## 12. Edge tension / print safety
- which decorations enter bleed;
- which objects may touch trim;
- critical copy inset;
- face/focal-point safety;
- gutter allowance;
- 3 mm bleed handling.

## 13. Editability contract
Classify each major element as:
- `NATIVE_EDITABLE`;
- `REPLACEABLE_IMAGE`;
- `COMPOSED_DISPLAY_ASSET`;
- `DECORATIVE_ASSET`;
- `REFERENCE_ONLY`.

No entire production page may be flattened as the editable master.

## 14. Asset provenance / rights / truth
- real vs generated vs reference;
- no reference artwork reused as production art unless legitimately owned/approved;
- no generated fake Japanese factual text promoted as final;
- no wrong couple/venue/place imagery;
- source locator recorded for production images/assets where needed.

## 15. Responsive-to-real-content fallback
A manual must define what changes when:
- a photo is portrait instead of landscape;
- there are fewer usable photos;
- text becomes 30% longer;
- a Q&A answer is blank;
- a map is removed;
- one section is dropped.

The design must degrade gracefully rather than force fake content.

## 16. Adjacent-page rhythm
Compare with previous and next page:
- hero position;
- title position;
- dominant color;
- photo count;
- frame family;
- density peak;
- composition verb;
- edge gesture.

Avoid accidental clones.

## 17. Figma execution contract
- exact target page/frame;
- semantic layer names;
- placement order;
- no global Auto Layout where editorial overlap is required;
- component usage only where repetition is genuinely useful;
- masks remain replaceable;
- text remains editable.

## 18. Visual QA
At minimum:
- thumbnail / 3-second scan;
- reading scale;
- A5 actual-size review;
- grayscale hierarchy;
- blur/silhouette hierarchy;
- screenshot comparison against canonical reference behavior;
- detect equal-card / UI grammar.

## 19. Print QA
- trim 148×210 mm if A5 remains final format;
- bleed 3 mm unless printer says otherwise;
- safe area;
- effective PPI;
- text readability;
- transparency/mask integrity;
- export PDF review;
- final CMYK/preflight handled in the final print workflow rather than guessed in Figma.

## 20. Change-control / versioning
- page manual version/date;
- reference source ID/hash;
- content status;
- asset status;
- Figma execution status;
- screenshot QA evidence;
- reason for any manual change.

This prevents a future AI from silently reverting to an older recipe.

---

# Completion definition

A page manual is `READY_FOR_FIGMA` only when sections 1–17 are explicit.

A Figma page is `DESIGN_CANDIDATE` only when visual QA in section 18 passes.

A page is `PRINT_CANDIDATE` only when section 19 passes with final real content/assets.

No quality claim should collapse these three states into one.
