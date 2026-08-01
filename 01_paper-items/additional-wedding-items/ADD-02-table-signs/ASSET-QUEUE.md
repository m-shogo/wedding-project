# ADD-02 — ASSET QUEUE

Status: `CURRENT / QUEUE_READY`

## Production rule

Create only assets that cannot be represented cleanly as native Figma geometry, text, image fills, or simple masks. Country names, table names, notes, route codes, borders, tickets, labels, and most line decoration remain editable in Figma.

## Shared assets

| ID | Asset | Type | State | Notes |
|---|---|---|---|---|
| TS-00 | restrained paper grain | transparent PNG | `PENDING_REVIEW` | one shared texture only if native fills look too digital |
| TS-01 | route / coordinate micro-pattern | native Figma vector | `FIGMA_NATIVE` | no raster generation |
| TS-02 | small destination-stamp frame | native Figma vector | `FIGMA_NATIVE` | copy remains native text |

## Country hero roles

The primary visual should normally be a selected real photograph or a non-destructive crop. Do not generate fake documentary travel photographs.

| Destination | Hero role | Optional fixed motif | Current state |
|---|---|---|---|
| Hawaii | volcanic coast / ocean | wave contour | `PHOTO_SELECTION_PENDING` |
| Italy | warm street / piazza | arch linework | `PHOTO_SELECTION_PENDING` |
| France | avenue / café detail | receipt / avenue rule | `PHOTO_SELECTION_PENDING` |
| Spain | plaza / tile detail | tile rhythm | `PHOTO_SELECTION_PENDING` |
| Taiwan | alley / railway / night market | lantern rhythm | `PHOTO_SELECTION_PENDING` |
| Japan | station / paper / landscape | station-stamp frame | `PHOTO_SELECTION_PENDING` |
| Hong Kong | harbour / vertical city | sign-grid linework | `PHOTO_SELECTION_PENDING` |
| Singapore | garden-city / transit | garden-transit diagram | `PHOTO_SELECTION_PENDING` |
| Bali | stone / greenery / woven detail | weave rhythm | `PHOTO_SELECTION_PENDING` |
| Korea | roof / modern street / hanji | roof curve | `PHOTO_SELECTION_PENDING` |
| Maldives | lagoon / sand / water | water-depth rings | `PHOTO_SELECTION_PENDING` |

## Generation decision

No new production raster is authorised yet.

Reason:
- 11 signs need authentic destination differentiation
- generated country scenes risk clichés and false realism
- most motifs are better as editable Figma vectors
- selected real photos will determine contrast, crop, and final palette

A fixed motif may be generated only after screenshot QA identifies a concrete gap that native geometry cannot solve.

## Naming contract

- `ADD-02_TS-[COUNTRY]-01_[ROLE]_v1.ext`
- country key: `HAWAII`, `ITALY`, `FRANCE`, `SPAIN`, `TAIWAN`, `JAPAN`, `HONG-KONG`, `SINGAPORE`, `BALI`, `KOREA`, `MALDIVES`
- one production asset per file
- contact sheets use `_QA_CONTACT_SHEET` and are `NON_PRODUCTION`

## Queue completion

`QUEUE_READY / ZERO_UNJUSTIFIED_GENERATION`
