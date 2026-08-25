# Mask Reveal Vertical Slice Handoff

Status: ACTIVE / NOT YET PRODUCTION READY
Scope: Movie only
Pattern: `type-mask-reveal`
Implementation: `impl-type-mask-reveal-davinci-text-plus`
Marker: `MOTION:type-mask-reveal`

## 目的

Visual Motion Libraryの最初のVertical SliceであるMask Revealを、基盤作りで止めず実際の制作ラインへ通す。

共通production line:

`Visual Motion Library → Prompt Generator → Palmier Rough → DaVinci-compatible NLE XML + Motion Handoff Manifest → DaVinci Resolve Final`

この文書は新しいPatternを増やすための仕様ではない。Mask Reveal 1件をactual render / Visual QAまで進めるための実行handoffである。

## 1. Visual Motion Libraryで入力する

最低限の入力:

- Text: 24文字以内の短いtitle
- Hero Photo: 任意。実写真を優先する
- Section: Opening Intro / Opening Chorus / Profile Chapter / Profile Couple Story
- Intensity: S / M / L
- Duration: 0.4〜3.0 sec

生成する出力:

1. Human Brief
2. Claude Creative Instruction
3. Palmier Instruction
4. NLE XML Handoff
5. DaVinci Finish Manifest
6. Verification Checklist
7. Machine JSON

## 2. Palmier Rough

Palmierの責務はrough timing / order / placementまで。

- 対象写真・動画をtrim / split / reorderする
- titleの表示区間を確保する
- marker `MOTION:type-mask-reveal` を対象位置に保持する
- exact Mask Revealを再現できない場合、別effectで代用しない
- bride / groom / family / friends / dogの実素材をAI変形しない
- final motion authorityをPalmier側へ移さない

## 3. NLE XML handoff

Palmierのrough timelineをDaVinci Resolveへ渡す際はDaVinci-compatible NLE XMLを使う。

handoff時に保持する意図:

- clip order
- rough timing
- target title timing
- `MOTION:type-mask-reveal` marker
- real-photo / real-video identity
- dedicated title trackで仕上げる意図

XML import後はmedia relink、clip timing、marker位置を確認する。

## 4. DaVinci Finish

登録済み実装:

- Kind: `DAVINCI_TEXT_PLUS`
- Method: Text+ + rectangular mask/keyframes + eased settle
- Studio requirement: local確認前は未確定
- Resolve version: local確認前は記録しない

仕上げ方:

1. marker位置へText+を置く
2. underlying real photo/videoを変更しない
3. rectangular maskまたは同等のclip境界で文字を隠す
4. keyframeで境界外から文字をrevealする
5. Easeで入りと停止を整える
6. bounce / glow / excessive motion blurを足さない
7. 顔や重要被写体を文字で覆わない

## 5. Actual render evidence

actual DaVinci renderが存在するまではRegistryを次の状態から昇格させない。

- Implementation: `AVAILABLE`
- Preview: `REPO_GENERATED / CONCEPT`
- `verified: false`
- `resolveVersion: null`

actual render完成後に記録するもの:

- actual render assetの保存場所
- poster/stillの保存場所
- sourceType: `ACTUAL_DAVINCI_RENDER`
- locally tested Resolve version
- implementation tested / verified
- Visual QA結果
- Studio-only機能を使ったか

実写真・実動画・大きなrender fileは原則Gitへ入れず、Gitにはpath / evidence / decisionを残す。

## 6. Visual QA

最低確認項目:

- titleが意図した境界から自然に現れる
- easingが急すぎない / もたつかない
- durationが読みやすい
- 顔・重要被写体と干渉しない
- typographyが写真より主張しすぎない
- glow / bounce / 強いmotion blurが無い
- Palmier roughのtiming intentがDaVinci import後も維持されている
- Concept PreviewとActual DaVinci Renderが明確に区別されている

## Completion Gate

以下が全て完了するまで次Patternへ進まない。

- [ ] Palmier rough作成
- [ ] `MOTION:type-mask-reveal` marker保持
- [ ] DaVinci-compatible NLE XML export
- [ ] DaVinci import / relink / timing確認
- [ ] Text+ Mask Reveal実装
- [ ] actual DaVinci render作成
- [ ] local Resolve version記録
- [ ] Visual QA PASS
- [ ] Registry Previewをactual evidenceへ接続
- [ ] Implementation statusをevidenceに応じてTESTED / PRODUCTION_READYへ更新

## Anti-overbuild

Mask Revealのactual renderが未完の間は、`photo-hero-still` / `camera-gentle-push` など次Patternの本実装へ広げない。
ただしMask Reveal完走に直接必要な修正、handoff、QA、evidence取り込みは進めてよい。
