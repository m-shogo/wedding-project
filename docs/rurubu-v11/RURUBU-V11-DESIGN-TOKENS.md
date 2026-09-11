# Rurubu WEDDING V11 — Design Tokens

Status: `CANONICAL_WORKING_TOKENS`

These tokens are newly derived for V11 from the user-approved reference behavior. They do not inherit V10 page-color assignments.

Exact print color is finalized through proof/preflight; these are sRGB working values and role definitions.

## Color tokens

| Token | Working sRGB | Job |
|---|---|---|
| `PAPER` | `#FBF8F3` | primary calm reading field |
| `WARM_CREAM` | `#F5E4CD` | editorial paper / data / postcard variation |
| `SKY_CYAN` | `#1EA5EB` | large travel/sky/route energy field |
| `LIGHT_SKY` | `#6AC4E7` | secondary travel support |
| `HOT_PINK` | `#F04781` | hero/title/emotional emphasis |
| `SUN_YELLOW` | `#F2BE3F` | burst/highlight only |
| `CORAL` | `#E86E62` | warm secondary emphasis |
| `TROPICAL_GREEN` | `#3E8A63` | foliage/travel support |
| `DEEP_TEAL` | `#236777` | route/structure/deep colored field |
| `INK` | `#27342F` | body/factual text |
| `WHITE` | `#FFFFFF` | keyline/reversed display use |

## Color behavior

Per page choose:
- 1 dominant field/color;
- 1 strong support;
- 1 burst accent;
- `INK/PAPER` or `INK/WARM_CREAM` for most factual/body text.

Do not distribute every token equally.

Suggested page dominance:
- P01: SKY_CYAN + HOT_PINK + SUN_YELLOW.
- P02: SKY_CYAN + warm map yellow/cream + pink microaccent.
- P03: PAPER/WARM_CREAM + HOT_PINK + SKY_CYAN.
- P04: photography + PAPER + one blue/pink accent.
- P05: PAPER + SKY_CYAN/DEEP_TEAL + CORAL/PINK.
- P06: PAPER/LIGHT_SKY + DEEP_TEAL + selected pink/yellow highlights.
- P07: PAPER + HOT_PINK + SKY_CYAN + yellow microaccent.
- P08: WARM_CREAM/PAPER + CORAL/HOT_PINK + blue travel accent.

## Typography roles

### `HERO_DISPLAY`
Job:
- P01 `WEDDING` and rare hero identity moments.

Behavior:
- very heavy rounded display;
- outline/keyline/offset-shadow allowed;
- may be composed image/vector art;
- target silhouette matters more than font-family uniformity.

Candidate native families when available:
- M PLUS Rounded 1c ExtraBold/Black;
- Noto Sans JP Black with custom outline treatment;
- another verified rounded Japanese display family.

Do not force a weak native font when composed title art is materially better.

### `PAGE_TITLE`
Job:
- P02–P08 Japanese page title.

Behavior:
- strong rounded/outlined editorial display;
- approx 22–34 pt equivalent at A5 depending on composition;
- can use ribbon/brush/backplate;
- page-to-page position/treatment may vary.

### `SECTION_TITLE`
Job:
- secondary feature such as `Best 5`, `Dress Code`, `Photo Contest`.

Behavior:
- approx 13–20 pt;
- clear but subordinate to page title.

### `BODY`
Job:
- facts, story, answers, venue copy, guest message.

Preferred:
- Noto Sans JP / Hiragino Sans / equivalent high-legibility Japanese sans available in the production environment.

Working range:
- approx 9–10.5 pt at final A5 size;
- line-height roughly 1.45–1.65× according to family/content.

### `CAPTION`
- approx 8–9 pt;
- dark ink on stable light field;
- visually attached to its photo.

### `MICRO_META`
- approx 7.5–8.5 pt;
- non-critical only.

### `HANDWRITTEN_ACCENT`
Job:
- tiny editorial comments/English subtitle/welcome note.

Candidate families when available:
- Klee One;
- Yomogi;
- another verified handwriting-style Japanese/Latin family.

Use sparingly. Do not put important factual copy in handwriting.

## Title effect vocabulary
Allowed selectively:
- white keyline;
- colored outer stroke;
- offset hard shadow;
- brush/ribbon backing;
- small angled subtitle;
- flower/leaf overlap;
- slight letter-level scale/rhythm in composed art.

Avoid generic soft web shadows and gradients as default polish.

## Spacing philosophy
No global 8px-grid mentality for editorial composition.

Use:
- consistent microspacing inside factual text systems;
- intentionally varied macrospacing between photo/title/decor clusters;
- tighter overlap where elements form one editorial cluster;
- larger calm zones only where body copy needs breathing room.

## Corner-radius rule
Photo/card-like structures must not share one universal corner radius.

Preferred visual vocabulary:
- square/near-square paper frames;
- polaroids;
- organic round crops;
- no-frame hero photography;
- occasional soft shape for Q/callout only.

Uniform rounded rectangles across a page are a structural fail.