# 31 Figma Plugin API Current Notes

更新: 2026-07-29

## Status
`OFFICIAL / CURRENT RESEARCH`

## 重要な2026時点の仕様

### Manifest
Figma公式では新規Pluginに `documentAccess: "dynamic-page"` が必要。
Plugin IDはFigmaが発行するため、repoに架空IDを固定しない。

Source:
https://developers.figma.com/docs/plugins/manifest/
https://developers.figma.com/docs/plugins/migrating-to-dynamic-loading/

### Variables
Plugin APIでは `figma.variables` からlocal Variable/Collectionを作成可能。
Dynamic page環境ではasync getterを優先する。

Current prototype uses:
- `getLocalVariableCollectionsAsync()`
- `getLocalVariablesAsync()`
- `createVariableCollection()`
- `createVariable()`

Source:
https://developers.figma.com/docs/plugins/working-with-variables/
https://developers.figma.com/docs/plugins/api/figma-variables/

### Text / Font
Textを書き換える前に対象fontを `loadFontAsync()` する。
Missing fontは先に検出し、安全停止またはFindingにする。

Source:
https://developers.figma.com/docs/plugins/working-with-text/
https://developers.figma.com/docs/plugins/api/properties/figma-loadfontasync/

### Pluginの役割
今回の自作Pluginは美的判断ではなく、以下へ限定する。
- QA
- Data populate
- Stress test
- Design tokens
- Print guide
- Batch operation

## Current implementation
`figma-plugins/wedding-print-toolkit/`

- Typography QA
- Design Token Bootstrap
- Long-name Stress Test

## 未検証
Figma Desktop上でのlocal plugin importと実ファイル動作は未検証。
そのためstatusは `PROTOTYPE` のまま。
