# るるぶWEDDING — Magazine Editorial Design Knowledge Base

Date: 2026-08-02
Scope: V5, V6, and later Rurubu-style wedding profile-book work
Authority: this document governs editorial judgment; live Figma, Drive evidence, and the asset ledger govern implementation truth

## Purpose

The core skill for this project is not simply operating Figma or generating attractive images. It is making professional editorial decisions:

- what the reader notices first
- what is read second and third
- what information deserves space
- what should be quiet
- how photographs, type, captions, maps, and margins create a coherent journey
- how a spread remains lively without becoming a dashboard or a template
- how the design survives real-size print

Every future design pass must start from editorial intent and information hierarchy. Decoration is a supporting layer, never the starting point.

---

## 1. Editorial design is selection, hierarchy, and rhythm

A magazine page is not improved merely by adding more elements. It improves when the editor makes clearer decisions about:

1. the main promise of the page
2. the dominant visual
3. the reading order
4. the supporting evidence
5. the quiet areas that allow the dominant content to work

The first question for every spread is:

> What is the one thing this spread must communicate before the reader begins reading body text?

The second question is:

> Which two or three details should reward the reader after the first impression?

If every element has equal size, equal contrast, equal saturation, equal corner radius, or equal shadow, the page has no editorial hierarchy.

### Working rule

Every page or spread must define:

- one primary focus
- one or two secondary focuses
- supporting micro-information
- intentional quiet space

Do not begin polish until these roles are explicit.

---

## 2. Build the page in layers, in this order

Professional magazine quality is produced by a sequence of decisions. Use this order:

1. **Purpose and reader** — what the guest should feel and understand
2. **Content architecture** — what information belongs together
3. **Narrative order** — the intended eye and reading path
4. **Dominant photography** — the emotional and contextual anchor
5. **Grid and margins** — invisible structure
6. **Typography system** — hierarchy and reading comfort
7. **Supporting modules** — captions, maps, timelines, sidebars
8. **Color and texture** — atmosphere and separation
9. **Micro-details** — icons, stickers, route lines, folios
10. **Production constraints** — fold, trim, bleed, resolution, proofing

Starting at layers 8 or 9 produces attractive fragments without a convincing magazine spread.

---

## 3. Cover design principles

A strong travel-magazine cover is a controlled competition between image, masthead, principal cover line, date/issue information, and supporting teasers.

### Required hierarchy

1. dominant cover photograph
2. masthead / `るるぶWEDDING`
3. main issue promise
4. two to four supporting cover lines
5. date, location, and small navigation details

### Cover rules

- The photograph must remain readable at thumbnail size.
- The masthead must have a stable silhouette and must not disappear into the image.
- The main cover line must be clearly larger or more contrasted than supporting lines.
- Supporting cover lines should vary in scale, alignment, or treatment; do not use six equal boxes.
- Leave at least one calm photographic zone so type can sit naturally.
- Use stickers and badges only when they add editorial meaning such as `PICK UP`, page reference, date, or recommendation.
- A cover should feel abundant, but not uniformly busy.

### Cover failure patterns

- every teaser in the same rounded card
- too many independent accent colors
- masthead, title, and date all competing equally
- generated photo with no text-safe region
- decorative labels that do not indicate category, location, ranking, or navigation
- cover composition copied from the previous version with only a palette change

---

## 4. Spread design: controlled asymmetry

Travel magazines often appear lively and irregular, but the irregularity sits on an underlying grid.

### Good spread rhythm

Use a combination of:

- one large visual or article
- one medium supporting feature
- several small captions, facts, or destination points
- alignment lines that repeat across the spread
- intentional breaks from those lines for emphasis

### `1 + 2 + micro` model

A reliable spread structure is:

- 1 lead story/photo
- 2 supporting stories/modules
- micro-information such as captions, page numbers, notes, icons, or route labels

This is preferable to four or six equal cards when the content importance is unequal.

### Asymmetry rule

Asymmetry must be balanced by at least two of these:

- common baseline
- shared column edge
- repeated caption position
- repeated color cue
- visual weight on the opposite page
- route or directional flow
- deliberate white-space counterweight

Random rotation and overlap are not editorial rhythm by themselves.

---

## 5. Grid systems for print-oriented Figma work

The grid is an invisible decision system, not a visible design motif.

Adobe distinguishes baseline grids for aligning text across columns and document/layout grids for positioning objects. Japanese InDesign layout grids also define character size, spacing, lines, and columns for professional Japanese composition. Figma layout guides can establish reusable rows, columns, and uniform grids. These concepts should be adapted to Figma rather than imitating screen-dashboard grids.

### Rurubu working grid

Maintain:

- outer safe margin
- fold exclusion zone
- repeatable column edges
- baseline rhythm for body copy
- consistent caption offsets
- controlled gutters

### Grid use rules

- Align body text and captions more strictly than stickers or handwritten accents.
- Allow photographs to bleed or break columns only when this strengthens hierarchy.
- Do not let every decorative card define its own private grid.
- Check the whole spread with guides hidden; the structure should remain perceptible without visible boxes.
- Use baseline increments derived from body-text leading, not arbitrary screen spacing.

---

## 6. Typography system

Typography should carry most of the hierarchy. Boxes and shadows should not compensate for weak type decisions.

### Five mandatory levels

1. **Display / cover title**
2. **Section heading**
3. **Article or card title**
4. **Body text**
5. **Caption / note / folio**

Each level must have a defined role, approximate size range, weight, line height, and spacing behavior.

### Hierarchy rules

- Prefer size, spacing, placement, and contrast before adding bold weight.
- Avoid using bold for every heading, label, number, and caption.
- English should function as an accent, category marker, or atmosphere; Japanese should carry essential meaning.
- Avoid excessive all-caps English competing with Japanese headings.
- Keep caption styling visibly different from body text.
- Page numbers and microcopy must remain readable at actual print size.

### Japanese composition QA

Use W3C JLREQ / JIS-based principles as the reference for Japanese line breaking and punctuation behavior.

Check:

- prohibited characters at line start/end
- awkward punctuation isolation
- unnatural line breaks caused by narrow cards
- excessive ragging in short Japanese lines
- inconsistent treatment of dates, Latin letters, and numerals
- spacing around brackets, punctuation, and symbols
- body leading and paragraph spacing
- captions that become too small after export

### Text-length stress test

Before final copy arrives, test:

- short realistic copy
- expected copy length
- 130–150% long copy

Do not optimize only for the shortest dummy text.

---

## 7. Photography is editorial content, not decoration

A photograph must have a specific editorial role:

- establish place
- introduce a person
- document a memory
- show atmosphere
- support chronology
- create emotional pause
- provide detail or evidence

### Photo-role specification

Before generation or selection, record:

- semantic role
- required aspect ratio
- focal subject
- desired eye direction or visual flow
- required negative space
- acceptable crop range
- color/light relationship to neighboring images
- whether a recognizable person is allowed

### Crop principles

- Protect faces, hands, landmarks, horizon lines, and meaningful objects.
- Avoid placing key subjects on the fold or trim zone.
- Use non-destructive image fills so the crop can be revised.
- Crop for the actual frame, not for the source image alone.
- A beautiful source that cannot support the required crop is the wrong source.

### Photo-set coherence

A spread should not look like unrelated stock photos. Check consistency in:

- light temperature
- saturation
- contrast
- time of day
- camera distance
- horizon treatment
- human presence
- visual noise

Perfect uniformity is unnecessary, but transitions must feel edited rather than accidental.

---

## 8. Information density and white space

A travel magazine can be dense, but density must be organized.

### Density principles

- Allow local density differences while balancing the whole spread.
- Place dense informational areas next to calmer photographs or margins.
- Do not fill every empty area merely because it is empty.
- White space may frame a title, separate stories, protect the fold, or create a pause.
- Repetition should establish rhythm, not monotony.

### Diagnostic questions

- Does the reader know where to start?
- Is there a resting point after the main feature?
- Are several small elements competing without a parent story?
- Is an empty area intentional or merely unfinished?
- Would removing one module improve the spread?

Every major QA pass must attempt at least one subtraction before adding new decoration.

---

## 9. Cards, badges, stickers, and shadows

These devices are allowed, but each must have a job.

### Valid jobs

- category
- recommendation
- ranking
- location
- page reference
- quote
- annotation
- date or issue marker
- physical scrapbook metaphor

### Invalid use

- putting every paragraph in a rounded white box
- repeating identical pills for unrelated content
- using shadows to separate all elements
- adding tape/stickers only to make the page appear handmade
- treating a badge count as a measure of magazine authenticity

### Reduction rule

For supporting information, prefer this order:

1. direct type on the page
2. alignment and white space
3. a rule line or color bar
4. a minimal background field
5. a full card only when containment is meaningful

---

## 10. Color system

Color should connect the photography, destination, wedding identity, and information hierarchy.

### Palette construction

Use:

- one dominant base
- one principal accent
- one supporting accent
- neutrals derived from paper, sand, sky, architecture, or photography

### Color rules

- Derive accents from the photo set where possible.
- Reserve the strongest saturation for the highest-priority labels or navigation.
- Do not make every module a different saturated color.
- Verify text contrast on actual images, not only on flat placeholders.
- Tropical V6 must avoid a generic combination of cyan, coral, yellow, hibiscus, and palm motifs applied everywhere.

---

## 11. Maps, timelines, captions, and travel-guide devices

Travel-guide authenticity comes from useful editorial devices, not merely from travel icons.

### Maps and routes

- Connect real narrative points.
- Use a clear start, direction, and destination.
- Avoid route lines that cross body text or exist only as decoration.

### Timelines

- Use chronology as the primary alignment logic.
- Distinguish dates, events, and commentary.
- Use one lead memory image and supporting milestones rather than equal event cards when importance differs.

### Captions

- Explain why the image matters.
- Remain short and visually subordinate.
- Maintain consistent relation to the image edge.
- Do not repeat the headline.

### Sidebars

- Contain a coherent secondary topic.
- Use different scale or background from the main narrative.
- Do not become a collection of unrelated leftover facts.

---

## 12. Anti-AI and anti-template diagnostics

The following patterns frequently make generated editorial design feel artificial:

- perfectly even spacing everywhere
- identical card structures repeated across unrelated content
- decorative English labels without meaning
- too many gradients
- every photograph having the same cinematic color treatment
- generated people presented as the real couple
- text wrapping determined only by a box shape
- excessive symmetry on lively travel pages
- too many accent colors used with equal intensity
- visual details added without editorial function
- a new version created by recoloring the previous layout

### Correction strategy

- change hierarchy before changing decoration
- vary module scale according to content importance
- remove at least one unnecessary element
- use real editorial labels and captions
- give each photograph a distinct role and crop
- preserve irregularity only where the grid still holds the page together

---

## 13. Three-scale review method

Every major design pass must be reviewed at three scales.

### A. Thumbnail / whole spread

Check:

- primary focus
- page balance
- color distribution
- visual path
- whether it resembles a magazine or a collection of UI cards

### B. Reading scale / page level

Check:

- headline hierarchy
- paragraph grouping
- caption relation
- photo crop
- module rhythm
- fold safety

### C. Detail / actual-size print scale

Check:

- Japanese line breaks
- punctuation
- small text
- fine rules
- image sharpness
- alignment
- shadow and border excess

A design does not pass because it looks good at only one scale.

---

## 14. Editorial scoring rubric

Score each spread from 1 to 5 on:

1. dominant focus
2. travel-magazine authenticity
3. wedding identity
4. photographic quality
5. crop quality
6. Japanese typography
7. information density
8. eye movement
9. absence of web-UI feel
10. print plausibility

### Pass conditions

- no criterion below 3
- photography, Japanese typography, and print plausibility each at least 4
- total score alone cannot hide a critical weakness
- reviewer must identify one element to remove or simplify

---

## 15. Learning and error-conversion loop

Every meaningful mistake must be converted into durable knowledge.

Use this sequence:

1. **Observation** — what visibly or structurally failed
2. **Root cause** — why the decision was wrong
3. **General principle** — what applies beyond this one page
4. **Process change** — what must happen differently next time
5. **Design change** — what was changed in the file
6. **Verification** — screenshot, structure audit, print check, or user review
7. **Promotion** — update this knowledge base only if the lesson is reusable

Do not create a new permanent rule from a single ambiguous preference. Record it first in the lessons log, test it, and promote it after repeated evidence or strong editorial reasoning.

---

## 16. V5-to-V6 transfer rules

V6 must inherit knowledge, not imagery or layout imitation.

Transfer:

- hierarchy principles
- grid discipline
- Japanese typography QA
- evidence-based asset lifecycle
- photo-role specifications
- scoring rubric
- print checks
- lessons from failed V5 decisions

Do not transfer automatically:

- V5-generated photographs
- V5 hero composition
- V5 card geometry
- V5 accent-color distribution
- V5 decorative density
- V5 image hashes or node mappings

V6 must prove that it is structurally different, not merely tropical in color.

---

## 17. Mandatory pre-design questions

Before editing a spread, answer:

1. What is the spread's single main promise?
2. What should be understood in three seconds?
3. Which image is dominant and why?
4. What is the intended reading path?
5. Which modules are supporting rather than equal?
6. Where is the quiet space?
7. Which grid edges and baselines hold the composition together?
8. Which decorative elements have a semantic job?
9. What can be removed?
10. What will fail at actual print size?

If these cannot be answered, the design is not ready for polish.

---

## 18. Primary reference set

Use primary/official documentation for implementation and Japanese composition rules:

- Adobe InDesign — baseline grids: https://helpx.adobe.com/indesign/desktop/layout-and-grid-tools/grids/use-a-baseline-grid.html
- Adobe InDesign — Japanese layout grids: https://helpx.adobe.com/indesign/desktop/layout-and-grid-tools/grids/create-customize-layout-grids.html
- Adobe InDesign Japanese layout grid overview: https://helpx.adobe.com/jp/indesign/using/layout-grids.html
- Figma — layout guides: https://help.figma.com/hc/en-us/articles/360040450513
- Figma — styles: https://help.figma.com/hc/en-us/articles/360039238753
- Figma — non-destructive image cropping: https://help.figma.com/hc/en-us/articles/360040675194-Crop-an-image
- W3C — Requirements for Japanese Text Layout / JLREQ: https://www.w3.org/International/jlreq/

Reference images from magazines, travel guides, design portfolios, and resort editorials may inform observation, but implementation must extract general principles rather than trace or reproduce one protected page.

---

## Final principle

A professional-looking magazine is not the page with the most design. It is the page where every visible decision supports the reader's experience, the story, and the printed object.
