# Rurubu WEDDING V11 — Clean-Slate QA Gate

Status: `CANONICAL_QA_AUTHORITY`

V11 QA does not inherit V10 aesthetic baselines, old reference nodes, old page-signature thresholds or old visual-match scores.

Primary reference: Google Drive file ID `12ppT-SV-8OmOgz_a0MuhrkT3gNOOKsY3`.

## QA states
- `SKELETON` — title/hero/main regions only.
- `STRUCTURE_CANDIDATE` — meaningful hierarchy/photos/parts exist.
- `STRUCTURE_APPROVED` — visual grammar passes clean-slate checks.
- `CONTENT_APPROVED` — factual text/photos are verified.
- `PRINT_CANDIDATE` — print/readability checks pass.
- `PRINT_READY` — final preflight/physical proof requirements satisfied.

Do not use one score to jump states.

---

# 1. Hard-fail structural tells

Any one of these blocks `STRUCTURE_APPROVED`:
- page reads as a dashboard/card grid;
- hero/title/major photos have nearly equal weight without semantic reason;
- whole page is controlled by one generic Auto Layout stack;
- all photos use same size/aspect/frame treatment;
- all major content is centered;
- page has no identifiable FIRST READ;
- decorative stickers are being used to hide weak geometry;
- whole-page raster is the sole production master despite replaceable photos/changeable facts;
- page is visibly cloned from an adjacent page;
- page composition is inherited from V10 only because it already existed.

---

# 2. Reference-behavior scorecard

Score only `STRUCTURE_CANDIDATE` pages.

| Category | Points |
|---|---:|
| 3-second genre recognition / first read | 15 |
| title silhouette / authored display behavior | 10 |
| hero image hierarchy | 10 |
| scale variation | 10 |
| asymmetry / cluster composition | 10 |
| photo-treatment diversity | 10 |
| controlled overlap / tactile layering | 10 |
| useful editorial density | 10 |
| edge tension / perimeter use | 5 |
| decorative cluster quality | 5 |
| calm reading zone | 5 |
| **Total** | **100** |

Guidance:
- `<75`: rebuild structure;
- `75–84`: credible direction, still needs one major correction;
- `85–92`: strong candidate;
- `93+`: reference-level structural candidate, still not content/print approved.

Hard fails override numeric score.

---

# 3. Three-scale visual review

Every candidate page must be reviewed at:

## Thumbnail / 3-second
Check:
- first read;
- page genre;
- hero vs supports;
- whether the page collapses into equal rectangles.

## Reading scale
Check:
- caption/photo binding;
- question/time/profile hierarchy;
- useful micro-discovery;
- overlap clarity;
- no accidental collisions.

## A5 actual size
Check:
- body/caption readability;
- Japanese line breaks;
- thin rules/borders;
- microtext;
- image crop/focal point;
- safe area.

Also review grayscale/blur silhouette as a hierarchy diagnostic.

---

# 4. Cross-page rhythm gate

The eight-page set must be reviewed together.

Adjacent pages should normally differ in at least four of:
- hero position;
- title alignment;
- dominant color;
- photo count;
- frame family;
- density peak;
- calm-zone location;
- composition verb;
- overlap gesture.

Whole-book failure:
- every page has title at same y;
- every page has 2-column card layout;
- every page uses same cyan/pink balance;
- every page uses same polaroid count;
- every page has the same lower-right decoration cluster.

Shared identity comes from vocabulary, not repeated geometry.

---

# 5. Editability gate

Before `STRUCTURE_APPROVED`:
- all planned real/proxy photos have independent masks;
- frame art is separate from source photos;
- names/dates/times/facts/Q&A/message copy are native editable text;
- page can survive replacing a photo without reconstructing title/body;
- semantic layer names exist for major roles;
- no full-page flattening.

Test at least one representative photo replacement before finalizing the mask system.

---

# 6. Content truth gate

Before `CONTENT_APPROVED`:
- no realistic invented personal facts remain;
- TBD fields are resolved or intentionally omitted;
- real-photo/caption relationships are verified;
- schedule times are authoritative;
- venue facts/access details are verified;
- hashtag/CTA/message text is approved.

Use `RURUBU-V11-CONTENT-TRUTH.md`.

---

# 7. Asset quality gate

Final promoted raster assets:
- target effective 300+ ppi where practical;
- 250–299 ppi = warning/review;
- <250 ppi = not final print-ready unless explicitly accepted for a non-critical use;
- transparent assets must have clean alpha/edges;
- no accidental solid/green background remnants;
- no obvious AI artifacts or corrupted text;
- no unlicensed/reference image silently used as production art.

Proxy people/scenery images may remain lower resolution during layout but are explicitly non-final.

---

# 8. Print gate

Assuming A5 remains confirmed:
- trim 148 × 210 mm;
- 3 mm bleed candidate unless printer spec supersedes;
- critical copy stays safely inside trim;
- decorative assets can enter bleed intentionally;
- final color conversion/profile/preflight follows printer requirements;
- physical/actual-size proof decides final microtype/contrast adequacy.

`STRUCTURE_APPROVED != PRINT_READY`.

---

# 9. Required QA report format

After a meaningful page pass report:
- page/role;
- current QA state;
- FIRST / SECOND / THIRD read;
- reference score by category if eligible;
- hard fails: none/list;
- largest reference-distance cause;
- one structural correction made;
- photo replacement integrity;
- native factual-text integrity;
- TBD content count;
- asset resolution/transparency warnings;
- next exact correction.

Avoid `looks better` or `more Rurubu`. Name observable geometry/hierarchy changes.