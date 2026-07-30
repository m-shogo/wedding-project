# るるぶWEDDING — Figma Wireframe Execution Runbook

Current authority: GitHub `main`
Production Figma: https://www.figma.com/design/bfM0d4c9dCeBv5pCkJ3TNM
Status: `READY_TO_EXECUTE_AFTER_FIGMA_MCP_RECOVERY`

This runbook turns the existing `FIGMA-WIREFRAME-BUILD.md` into small, fail-closed `use_figma` stages. Do not skip stages. Do not place frozen decorative SVGs before the wireframe winner is promoted.

## Execution invariants

- target editor must be Figma Design (`editorType === "figma"`)
- target page: `01_RURUBU_WEDDING`
- top-level frames: `01_Cover_Back_WF_A`, `01_Cover_Back_WF_B`, `01_Cover_Back_WF_C`
- each frame: `1587.4 x 1122.5`
- provisional fold: `x = 793.7`
- left = Back Cover, right = Front Cover
- same copy quantity across A/B/C
- grayscale only until winner promotion
- no vendor bleed / trim-safe / fold-safe values invented
- no destructive cleanup of unrelated nodes
- exact-name reuse first; create only when missing
- every write returns all created/mutated node IDs
- one current-page switch maximum per `use_figma` call
- every text edit: load font first, then mutate
- failed script = atomic/no-change; inspect error before retry

## Stage 0 — read-only capability / file inspection

Run this first. It intentionally mutates nothing.

```js
if (figma.editorType !== "figma") {
  throw new Error(`Expected Figma Design editor, got ${figma.editorType}`);
}

const pages = figma.root.children.map(p => ({ id: p.id, name: p.name }));
const fonts = await figma.listAvailableFontsAsync();

const japanesePriority = [
  "Noto Sans JP",
  "Noto Sans CJK JP",
  "Hiragino Sans",
  "Yu Gothic",
  "YuGothic"
];

const familyInventory = [...new Set(fonts.map(f => f.fontName.family))];
const selectedFamily = japanesePriority.find(name => familyInventory.includes(name)) ?? null;

const localVariables = await figma.variables.getLocalVariablesAsync();
const localCollections = await figma.variables.getLocalVariableCollectionsAsync();
const localTextStyles = await figma.getLocalTextStylesAsync();

return {
  editorType: figma.editorType,
  pages,
  selectedJapaneseFamily: selectedFamily,
  matchingFonts: selectedFamily
    ? fonts.filter(f => f.fontName.family === selectedFamily).map(f => f.fontName)
    : [],
  localVariables: localVariables.map(v => ({ id: v.id, name: v.name, type: v.resolvedType })),
  localCollections: localCollections.map(c => ({ id: c.id, name: c.name })),
  localTextStyles: localTextStyles.map(s => ({ id: s.id, name: s.name, fontName: s.fontName, fontSize: s.fontSize }))
};
```

### Stage 0 gate

Do not continue unless:
- file is readable
- editorType is `figma`
- a Japanese-capable font family is verified

If no verified Japanese-capable font is found, stop and resolve fonts rather than substituting an unverified Latin-only font.

## Stage 1 — create/reuse page and 3 spread shells only

This stage creates no content copy and no decorative assets.

```js
if (figma.editorType !== "figma") throw new Error("Design file required");

let page = figma.root.children.find(p => p.name === "01_RURUBU_WEDDING");
const createdNodeIds = [];
const mutatedNodeIds = [];

if (!page) {
  page = figma.createPage();
  page.name = "01_RURUBU_WEDDING";
  createdNodeIds.push(page.id);
}
await figma.setCurrentPageAsync(page);

const W = 1587.4;
const H = 1122.5;
const GAP = 260;
const names = ["01_Cover_Back_WF_A", "01_Cover_Back_WF_B", "01_Cover_Back_WF_C"];

const existingTop = new Map(page.children.map(n => [n.name, n]));
const frames = [];

for (let i = 0; i < names.length; i++) {
  let frame = existingTop.get(names[i]);
  if (frame && frame.type !== "FRAME") {
    throw new Error(`${names[i]} exists but is ${frame.type}, expected FRAME`);
  }
  if (!frame) {
    frame = figma.createFrame();
    frame.name = names[i];
    page.appendChild(frame);
    createdNodeIds.push(frame.id);
  } else {
    mutatedNodeIds.push(frame.id);
  }
  frame.resize(W, H);
  frame.x = i * (W + GAP);
  frame.y = 0;
  frame.clipsContent = false;
  frame.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  frames.push({ id: frame.id, name: frame.name, x: frame.x, y: frame.y, width: frame.width, height: frame.height });
}

return { createdNodeIds, mutatedNodeIds, frames };
```

### Stage 1 gate

Validate before continuing:
- exactly one top-level frame exists for each A/B/C exact name
- all are `1587.4 x 1122.5`
- no unrelated node was removed
- frames are horizontally separated

Capture screenshots before Stage 2 if screenshot access is available.

## Stage 2 — semantic halves + provisional fold guide

Run once per exact top-level frame, or adapt the `TARGET` constant and execute three calls. Do not loop current-page switches.

```js
const TARGET = "01_Cover_Back_WF_A"; // change to B / C per call
const W = 1587.4;
const H = 1122.5;
const HALF = 793.7;

const page = figma.root.children.find(p => p.name === "01_RURUBU_WEDDING");
if (!page) throw new Error("01_RURUBU_WEDDING page missing");
await figma.setCurrentPageAsync(page);

const spread = page.children.find(n => n.name === TARGET);
if (!spread || spread.type !== "FRAME") throw new Error(`${TARGET} frame missing`);

const createdNodeIds = [];
const mutatedNodeIds = [spread.id];
const childByName = new Map(spread.children.map(n => [n.name, n]));

function ensureFrame(name, x) {
  let n = childByName.get(name);
  if (n && n.type !== "FRAME") throw new Error(`${name} exists but is ${n.type}`);
  if (!n) {
    n = figma.createFrame();
    n.name = name;
    spread.appendChild(n);
    createdNodeIds.push(n.id);
  } else mutatedNodeIds.push(n.id);
  n.resize(HALF, H);
  n.x = x;
  n.y = 0;
  n.clipsContent = false;
  n.fills = [];
  return n;
}

ensureFrame("BACK_COVER", 0);
ensureFrame("FRONT_COVER", HALF);

let fold = childByName.get("PROVISIONAL_FOLD_GUIDE");
if (fold && fold.type !== "RECTANGLE") throw new Error("Fold guide has unexpected type");
if (!fold) {
  fold = figma.createRectangle();
  fold.name = "PROVISIONAL_FOLD_GUIDE";
  spread.appendChild(fold);
  createdNodeIds.push(fold.id);
} else mutatedNodeIds.push(fold.id);
fold.resize(1, H);
fold.x = HALF;
fold.y = 0;
fold.fills = [{ type: "SOLID", color: { r: 0.62, g: 0.62, b: 0.62 } }];

return { createdNodeIds, mutatedNodeIds, target: TARGET };
```

## Stage 3 — wireframe variables and text roles

Before this stage, reuse equivalent Current variables/styles if discovered in Stage 0. Only create missing exact wireframe roles.

Required grayscale primitives:
- `wf/bg` = `#FFFFFF`
- `wf/ink` = `#111111`
- `wf/muted` = `#6B6B6B`
- `wf/line` = `#B8B8B8`
- `wf/photo` = `#E5E5E5`
- `wf/panel` = `#F4F4F4`

Required text roles:
- `WF/Display`: 52px Bold
- `WF/Title`: 28px Bold
- `WF/Heading`: 18px Bold
- `WF/Body`: 14px Regular
- `WF/Meta`: 11px Regular

Use the Japanese-capable family verified in Stage 0. Load every exact font name with `await figma.loadFontAsync(fontName)` before assigning text or text-style font properties.

## Stage 4 — populate A/B/C incrementally

Use `FIGMA-WIREFRAME-BUILD.md` as the geometry authority and `WIREFRAME.md` as the comparison authority.

Shared Front copy — identical across A/B/C:
1. `ふたりの思い出スポットを旅する SPECIAL GUIDE`
2. `出会いから今日まで OUR TRAVEL HISTORY`
3. `いつもありがとう FRIENDS & FAMILY`
4. `食べて飲んで楽しむ YOKOHAMA WEDDING DAY`
5. `BEST SHOT & FAVORITE MOMENTS`
6. `NEXT DESTINATION: OUR FUTURE`

Shared Back modules:
- `MEMORY SPOTS / ふたりで歩いた場所`
- `FRIENDS / 一緒に旅してくれたみんな`
- `HISTORY / 出会いから2026.10.24まで`

Populate **one variant per `use_figma` call**, screenshot it, validate it, then move to the next variant. Do not build all three in a single mutation script.

## Stage 5 — exact stress payload

Repeat the local mechanical stress test in editable Figma using this longer copy:

1. `ふたりの思い出スポットを旅する SPECIAL GUIDE — はじめての旅行から横浜で迎える結婚式まで`
2. `出会いから今日まで OUR TRAVEL HISTORY — 笑った日も迷った日もぜんぶ大切な旅の途中`
3. `いつもありがとう FRIENDS & FAMILY — 一緒に歩いてくれた大切なみんなへ伝えたいこと`
4. `食べて飲んで楽しむ YOKOHAMA WEDDING DAY — 今日だけのおすすめ料理・ドリンク・楽しみ方`
5. `BEST SHOT & FAVORITE MOMENTS — 写真で振り返るふたりのお気に入りの景色と忘れられない瞬間`
6. `NEXT DESTINATION: OUR FUTURE — これからふたりで行きたい場所、やりたいこと、続いていく旅`

Check:
- text overflow / clipping
- accidental type reduction below the wireframe minimum
- reading-order collapse
- fold proximity

## Stage 6 — hero-photo ratio stress

For every variant test the same three ratios:
- portrait `4:5`
- landscape `3:2`
- square `1:1`

Two passes are required:

### Pass A — same-frame replacement
Keep hero frame geometry unchanged and compare crop pressure.

Local mechanical baseline:
- A: 4:5 = 73.4% source area visible, 3:2 = 72.7%, 1:1 = 91.7%
- B: 4:5 = 84.7%, 3:2 = 45.2%, 1:1 = 67.8%
- C: 4:5 = 70.7%, 3:2 = 75.4%, 1:1 = 88.4%

### Pass B — one allowed structural re-layout
Allow the hero geometry to be adjusted once without changing content quantity or fold position. This specifically tests B's claimed structural adaptability; do not award B a high photo-ratio score unless this editable re-layout remains clean.

## Stage 7 — scoring and promotion

Use the existing weighted rubric only after:
- A/B/C screenshots exist
- exact long-copy payload was tested
- all three hero ratios were tested
- B's structural hero re-layout was tested

Current local pre-score is **A 4.45 / B 4.45 / C 3.89**, but it is not final.

Promotion rule:
- promote exactly one winner to `02_Cover_Back_Visual`
- keep losing wireframes as comparison evidence
- only after promotion place frozen SVG decoration one asset at a time

## Current known blocker

Latest 2026-07-30 Figma metadata retry still fails before metadata access with the Starter-plan MCP tool-call limit. No canvas mutation occurred. Do not repeatedly retry until quota/session availability changes.
