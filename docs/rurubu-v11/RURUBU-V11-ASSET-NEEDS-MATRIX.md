# Rurubu WEDDING V11 — Asset Needs Matrix

Status: `CANONICAL_ASSET_PLANNING`

Purpose: separate design decisions from asset availability. V11 page composition must not be distorted merely because an old asset happens to exist.

## Source strategies
- `USER_REAL_PHOTO` — actual couple/travel/venue photo; independently replaceable.
- `PROXY_PHOTO` — temporary layout source; never final by implication.
- `SEARCH_EXISTING` — inspect existing Drive/Git visual library against V11 role before reuse.
- `GENERATE_PART` — create a new decorative/display part with explicit dimensions/role.
- `NATIVE_FIGMA` — create as editable text/vector/simple structure in Figma.
- `TBD_CONTENT` — user factual content still needed; do not invent.

## Global priority
1. authoritative/changeable text structure;
2. photo slots/masks;
3. hero titles and key frames;
4. semantic map/route structures;
5. decorative clusters;
6. micro-discoveries.

Do not spend generation effort on microdecor while hero/title/photo geometry is unresolved.

---

## P01 COVER
| Role | Strategy | Blocking? |
|---|---|---|
| P01_HERO_COUPLE | USER_REAL_PHOTO / PROXY_PHOTO | final only |
| P01_SUPPORT_VENUE | USER_REAL_PHOTO / SEARCH_EXISTING | no for skeleton |
| 2–3 memory photos | USER_REAL_PHOTO / PROXY_PHOTO | no for skeleton |
| TITLE_HERO_WEDDING | SEARCH_EXISTING then GENERATE_PART | yes for visual identity |
| original identity mark | GENERATE_PART / NATIVE_FIGMA | yes |
| date seal | SEARCH_EXISTING / GENERATE_PART | no |
| tropical clusters | SEARCH_EXISTING / GENERATE_PART | no |
| coverline copy | TBD_CONTENT / NATIVE_FIGMA | yes for final |

## P02 WEDDING JOURNEY
| Role | Strategy | Blocking? |
|---|---|---|
| world map | SEARCH_EXISTING / GENERATE_PART | yes for skeleton |
| route | NATIVE_FIGMA / GENERATE_PART | yes for skeleton |
| 3–4 memory photos | USER_REAL_PHOTO / PROXY_PHOTO | final only |
| journey title | SEARCH_EXISTING / GENERATE_PART | yes |
| travel still-life | SEARCH_EXISTING / GENERATE_PART | no |
| destination labels | TBD_CONTENT / NATIVE_FIGMA | final |

## P03 PROFILE
| Role | Strategy | Blocking? |
|---|---|---|
| Shogo portrait | USER_REAL_PHOTO / PROXY_PHOTO | final only |
| Shiori portrait | USER_REAL_PHOTO / PROXY_PHOTO | final only |
| portrait frames | SEARCH_EXISTING / GENERATE_PART | yes for visual skeleton |
| profile title | SEARCH_EXISTING / GENERATE_PART | yes |
| profile facts | TBD_CONTENT / NATIVE_FIGMA | final |
| mini-story facts | TBD_CONTENT / NATIVE_FIGMA | final |
| favorite feature visuals | USER_REAL_PHOTO / GENERATE_PART | optional |

## P04 MEMORIES
| Role | Strategy | Blocking? |
|---|---|---|
| hero memory photo | USER_REAL_PHOTO / PROXY_PHOTO | final only |
| 3–5 support photos | USER_REAL_PHOTO / PROXY_PHOTO | final only |
| mixed frames | SEARCH_EXISTING / GENERATE_PART | yes for skeleton |
| memories title | SEARCH_EXISTING / GENERATE_PART | yes |
| camera/travel still-life | SEARCH_EXISTING / GENERATE_PART | no |
| destination/caption copy | TBD_CONTENT / NATIVE_FIGMA | final |

## P05 VENUE GUIDE
| Role | Strategy | Blocking? |
|---|---|---|
| venue hero photo | USER_REAL_PHOTO / SEARCH_EXISTING | final only |
| venue detail photos | USER_REAL_PHOTO / SEARCH_EXISTING | final only |
| venue title | SEARCH_EXISTING / GENERATE_PART | yes |
| map | NATIVE_FIGMA / GENERATE_PART | only if page uses map |
| access/venue facts | TBD_CONTENT / NATIVE_FIGMA | final |
| floral/location parts | SEARCH_EXISTING / GENERATE_PART | no |

## P06 1DAY
| Role | Strategy | Blocking? |
|---|---|---|
| schedule title | SEARCH_EXISTING / GENERATE_PART | yes |
| route/spine | NATIVE_FIGMA / GENERATE_PART | yes |
| time/event rows | TBD_CONTENT / NATIVE_FIGMA | yes for meaningful QA |
| event icons | SEARCH_EXISTING / GENERATE_PART | no |
| side-feature visual | USER_REAL_PHOTO / GENERATE_PART | no |
| dress code/special note copy | TBD_CONTENT / NATIVE_FIGMA | optional/final |

## P07 Q&A
| Role | Strategy | Blocking? |
|---|---|---|
| Q&A title | SEARCH_EXISTING / GENERATE_PART | yes |
| Q labels | NATIVE_FIGMA / GENERATE_PART | yes for skeleton |
| questions/answers | TBD_CONTENT / NATIVE_FIGMA | yes for final |
| support photos | USER_REAL_PHOTO / PROXY_PHOTO | optional |
| small motifs | SEARCH_EXISTING / GENERATE_PART | no |

## P08 MESSAGE / BACK
| Role | Strategy | Blocking? |
|---|---|---|
| closing title | SEARCH_EXISTING / GENERATE_PART | yes |
| postcard/lined field | NATIVE_FIGMA / GENERATE_PART | yes for skeleton |
| guest message | TBD_CONTENT / NATIVE_FIGMA | final |
| hashtag/photo CTA | TBD_CONTENT / NATIVE_FIGMA | optional/final |
| postmark/date stamp | SEARCH_EXISTING / GENERATE_PART | no |
| camera/passport/ticket/suitcase cluster | SEARCH_EXISTING / GENERATE_PART | no |
| optional closing photo | USER_REAL_PHOTO / PROXY_PHOTO | no |

---

# Asset acceptance rules

Any reused/generated raster part must pass:
- semantic fit to V11 role;
- no incorrect embedded factual text;
- clean transparency when transparency is expected;
- no obvious AI artifacts;
- adequate resolution for intended physical size;
- no unwanted green/solid background remnants;
- clear edge behavior;
- no accidental visual dependence on old V10 composition.

Any photo must record:
- slot ID;
- source/proxy/final state;
- crop/focal point note;
- effective resolution at final size;
- replacement status.

Any missing factual content remains explicit TBD. Never fill with invented personal facts merely to make the design look complete.