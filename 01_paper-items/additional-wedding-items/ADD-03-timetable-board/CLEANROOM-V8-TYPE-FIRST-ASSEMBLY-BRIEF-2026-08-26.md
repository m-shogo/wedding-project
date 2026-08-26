# ADD-03 — Clean-room V8 Type-first Assembly Brief

Date: 2026-08-26
State: `PRE_FIGMA / TYPE_FIRST_METHOD_SWITCH / CURRENT_UNCHANGED`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Why this direction exists

The current `DAY BROADSHEET` remains a strong and sellable chronology reference, but the recent clean-room experiments all exposed a repeated failure pattern:

- route-like fixed art over-explained chronology and became infographic/wayfinding;
- accordion / layered paper constructions became section UI or generic stationery;
- large fixed sweeps became generic event-poster branding;
- adding more fixed art weakened the timetable's native information hierarchy.

V8 therefore changes method completely: **the art direction must be carried primarily by native Japanese typography, scale, staggering, rhythm and negative space.** Fixed art is intentionally not the starting point.

The visual construction for V8 must start from a blank A2 frame. Do not duplicate or visually reference current production, older V2/V3, V5/V6/V7, route assets, rails, sidebars, badges, previous folds, or previous timeline geometry while building.

## Professional research translated into constraints

Principles only; do not copy literal layouts.

- Pentagram Editorial Design: a print system needs theme + variation rather than repetitive modules.
- Pentagram London Design Festival 2025: a single concept may unify a programme, but the concept must express purpose instead of becoming generic decoration.
- Pentagram Type Directors Club: a cohesive graphic programme can stay recognizable without repeating the same forms.
- Studio Dumbar ATypI: typography itself can carry event energy; expressive contrast does not require decorative UI containers.
- Studio Dumbar D&AD Festival: type can stretch, shift and carry excitement when the concept is rooted in the event's meaning.

Reference URLs:
- https://www.pentagram.com/editorial-design
- https://www.pentagram.com/work/london-design-festival-2025
- https://www.pentagram.com/work/type-directors-club
- https://studiodumbar.com/work/atypi
- https://studiodumbar.com/work/imagine-everything-d-ad

## Facts and semantic requirements allowed to transfer

Only these non-visual facts/constraints may be re-entered:

- A2 `1400×1980` and independent A3 `990×1400` reflow if V8 matures;
- `2026.10.24 SAT`;
- `YOKOHAMA`;
- Ceremony `14:10–14:40`;
- unresolved transfer interval `14:40–15:00` remains a native semantic guidance role;
- Reception `15:00–17:30`;
- Japanese-first headline / event names / guidance / closing copy;
- all factual and variable copy stays native editable Figma text;
- no invented venue floor, gate, flight number, route, barcode, QR or transport credential.

## V8 visual premise — `TIME IN MOTION`

The timetable should feel like **three moments unfolding across one day**, not three cards, three stops on a route, or three rows in an admin schedule.

The visual memory device is the **large time typography itself**.

### Composition rules

- Warm paper field; no full-height sidebar by default.
- Large `14:10`, `14:40`, `15:00` become the dominant visual rhythm.
- Stagger the three times on a loose descending/advancing editorial rhythm rather than a perfectly equal grid.
- Event names sit optically attached to each time, but no box/card contains the pair.
- Guidance copy gets narrower native text measures and clear vertical reserve; no decorative support plate unless a later screenshot proves one is needed.
- Use color through typography, not through three equal modules. Initial palette roles may be cobalt / coral / deep navy, with at most one mango or lagoon supporting accent.
- The Japanese headline should be a strong first read but must not become a poster headline that overwhelms chronology.
- Closing copy is a warm editorial ending, not a footer component.
- Do not use route lines, event nodes, map metaphors, arrows, repeated badges, pills, fake tickets, airplane icons, gradients, shadows, or decorative English.

### Allowed fixed geometry

Only simple geometry with a proven print/editorial job may be added during Figma assembly:

- one paper-edge / fold / rule only if it binds real information at whole-item scale;
- one non-semantic color field only if it creates hierarchy without becoming a container;
- no pre-made SVG is required for first pass.

This is intentionally a **native-type-first experiment**. Hybrid policy still applies: if a later screenshot proves that a fixed visual role is genuinely missing, diagnose it first and then decide SVG/generated/composed asset vs native geometry.

## First Figma pass — A2 only

Create from a blank A2 frame.

Required native roles:

- `TEXT / HEADLINE`
- `TEXT / DATE_PLACE`
- `TEXT / TIME 1`
- `TEXT / EVENT 1`
- `TEXT / GUIDE 1`
- `TEXT / TIME 2`
- `TEXT / EVENT 2`
- `TEXT / GUIDE 2`
- `TEXT / TIME 3`
- `TEXT / EVENT 3`
- `TEXT / GUIDE 3`
- `TEXT / CLOSING`

All semantic text must use `textAutoResize=HEIGHT` and actual Japanese fonts. Do not resize a text node after setting auto-height without resetting the contract.

## Three materially different native-type studies

Build these from separate blank frames; do not copy one study into another.

### A — `TIME CASCADE`

- times stagger left / center-left / right-center;
- event labels lock to each time through optical proximity only;
- strongest sense of movement;
- main risk: poster chaos / weak scan order.

### B — `OPEN COLUMN SHIFT`

- one wide open editorial column;
- times alternate between left and right margins while guidance stays in a calm central reading lane;
- strongest Japanese editorial reading;
- main risk: too quiet / premium-by-emptiness.

### C — `CROPPED TIME BROADSIDE`

- each time is oversized and partially approaches/crops the page edge while event copy remains fully readable inside safe area;
- strongest pop / celebratory energy;
- main risk: event-poster reading or actual-size legibility loss.

At 500px choose at most one serious candidate. Do not average the three studies into a hybrid compromise.

## QA gates

1. **Whole / ~500px**
   - Japanese headline and three times must be immediately readable as a wedding-day programme.
   - reject if it reads like a festival poster, dashboard, infographic, route map or three cards.

2. **Reading / ~1000px**
   - event names and unresolved transfer guidance must remain naturally grouped;
   - reject machine-like Japanese line breaks and overly equal spacing.

3. **Actual A2 / 1400×1980**
   - factual microtype must be credible at the intended physical scale;
   - inspect optical alignment and line weight, not only bounding boxes.

4. **Realistic long-copy**
   - expand ceremony / transfer / reception guidance with realistic Japanese multi-line copy;
   - fresh stress is mandatory after any material spatial movement.

5. **Structure**
   - all semantic text native and auto-height;
   - no IMAGE fill in first pass;
   - no variable copy baked into SVG/raster;
   - no unintended flattening.

## Promotion rule

Only after one V8 study fully passes the gates may the retained `DAY BROADSHEET` be viewed for final comparison.

Promote only if V8 clearly preserves or improves chronology **and** adds wedding/travel excitement without introducing a new template grammar.

If none wins, record `REJECTED` and keep Current. Do not create V9 by cosmetically mutating a failed V8; the next method must have a materially new premise.

## Asset / Drive decision

- image generation: `0` for first pass;
- SVG: `0` required for first pass;
- Drive write: `0` until a serious Figma candidate actually needs an adopted/comparison asset master.

This is deliberate: the current bottleneck is not missing photography/illustration. It is whether typography itself can carry the day's energy without sacrificing chronology.