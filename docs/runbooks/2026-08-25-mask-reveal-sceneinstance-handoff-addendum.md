# Mask Reveal SceneInstance → Palmier / DaVinci Handoff Addendum

Status: ACTIVE / MUTABLE  
Scope: Movie only / Mask Reveal Vertical Slice  
Parent contracts:
- `docs/contracts/human-readable-editable-movie-contract.md`
- `docs/contracts/visual-scene-composer-design-rules.md`
- `docs/decisions/2026-08-25-motion-zukan-product-principles.md`
- `docs/runbooks/2026-08-25-mask-reveal-human-master-actual-addendum.md`

## 目的

PR #310以降、Mask Revealは一時的なUI入力ではなく、採用済み `SceneInstance` をProduction Source of Truthとして扱う。

Palmier / DaVinciへ渡す時も、必ず保存済みSceneInstanceから生成した `motion-zukan-scene-production/v1` bundleを使う。

## Human Master authority

bundleの正本は以下。

- `sceneId`
- `sourceRevision = SceneInstance.updatedAt`
- HUMAN_SELECTED
- LOCKED
- editable source of truth
- Target Duration
- Computed Duration
- Recipe provenance

MP4 / NLE XML / DaVinci node値はHuman Masterを置き換えない。

SceneInstanceを人間が編集して `updatedAt` が変わった場合、以前のbundleはSTALEとして扱い、再生成してからProductionへ渡す。

## Scene marker

従来のPattern-level marker:

`VML_MASK_REVEAL_<SECTION>`

は1Patternのscratch検証では利用可能だが、複数SceneInstanceを同一Project Timelineで扱うProduction handoffでは衝突する。

SceneInstance handoffでは必ず:

`VML_MASK_REVEAL_<SECTION>_<SCENE_TOKEN>`

という一意markerを使う。

Human-readable Scene値はmarker生成のために変更しない。markerはhandoff識別子であり、演出値の正本ではない。

## Palmier

PalmierではProject単位の実timelineを作り、実timelineからNLE XMLを書き出す。

- Opening: `palmier-opening-timeline.xml`
- Profile: `palmier-profile-timeline.xml`

各SceneInstanceは固有 `sceneMarkerId` で識別する。

アプリ側でNLE XMLを捏造しない。

Palmierが近似値を適用した場合はHuman Masterを書き換えず、以下をEvidenceとして別記録する。

- intended value
- applied value
- difference / delta

## DaVinci

DaVinci import時はProject XMLとScene sidecar bundleをセットで扱う。

1. NLE XML import
2. `sceneMarkerId` の位置を確認
3. bundleのHuman Master値を確認
4. Text+ / Rectangle Mask / Keyframe / SplineでMask Revealを実装
5. LOCKED値は黙って変更しない
6. 実装不能または矛盾時はconflictとして止める
7. Actual render後にverification evidenceを実測値で更新

## Preview / completion truth

以下だけではVertical Slice完成扱いにしない。

- Concept Previewがある
- MP4が書き出せた
- Fusion nodeが作れた
- Palmier XMLが書き出せた

完了には少なくとも、

`SceneInstance → fresh production bundle → Palmier real NLE XML → DaVinci import → Scene marker match → Actual DaVinci render → 1x/0.5x Visual QA → evidence更新`

が必要。

`productionReady` は実機検証完了まで `false` のままにする。

## 既存資産への適用

このルール適用だけのために36 Motion Kit / 97 Director Recipes / StaRt / Profile / Remotionを一括変換しない。

現在のMask Reveal Vertical Sliceで先に証明し、次に触るScene/Patternへ段階適用する。
