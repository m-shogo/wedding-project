# RURUBU V8 AT — 1DAY paired-pace QA

Date: 2026-08-22
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`
Candidate promoted: `2264:2 / V8 / 1DAY AT / CURRENT / PAIRED PACE PHRASES`
Previous Current: `2257:2 / AR`, preserved hidden rollback.

## Visible defect

AR's left page used four isolated experiential words — `海辺 / 長めに / 寄り道 / ゆっくり` — at unrelated positions and scales. The intent was pacing, but at whole-spread scale the treatment could also read as synthetic randomness: four words scattered because editorial design was expected to look irregular.

## Fresh professional research hypothesis

IDEA No.346 on Heikichi Harata describes parataxis as a core editorial method: short statements may be separated, but their connection is deliberately framed rather than produced by arbitrary distance alone.

Source: https://www.idea-mag.com/en/idea_magazine/346/

Transferable hypothesis tested here: keep unequal rhythm, but make the semantic relationship between separated phrases explicit before using spatial irregularity.

## Bounded experiment

Rollback-safe duplicate of AR:

- `海辺` + `長めに` → `海辺は、長めに。`
- `寄り道` + `ゆっくり` → `寄り道は、ゆっくり。`
- right page exact-time information unchanged;
- no image/card/badge/rule/gradient added;
- no V6/V7 image reused.

The first candidate was rejected because `寄り道は、ゆっくり。` produced an accidental one-character wrap (`り。` split to a second line). The method switched to a wider text box and 56 px display size before promotion.

## QA

- whole spread / 500 px: PASS
- reading / 1000 px: PASS
- actual size / 1587×1123: PASS
- visible native text: `19`
- visible IMAGE roles: `0`
- text intersections: `0`
- 18 px outer safe risks: `0`
- accidental explicit one-character lines: `0`
- parent page: `2052:2`

Working physical geometry remains `420×297 mm` for the spread. Right-page required factual copy is not fragile microtype under that mapping: time labels are 22 px (about 16.5 pt at the working physical scale), and the closing copy is 18 px (about 13.5 pt). No size change was required.

## Decision

AT promoted locally. AR hidden rollback retained. V8 remains `NOT_GLOBAL_WINNER / NOT_PRINT_READY`.

## Asset truth

- new image-model generation: `0`
- new Drive masters: `0`
- new production Figma image placement: `0`
- V6/V7 image reuse: `0`
