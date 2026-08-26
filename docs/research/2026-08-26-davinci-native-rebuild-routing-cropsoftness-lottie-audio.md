# DaVinci Native Rebuild Routing — Crop Softness / Lottie / Audio

Status: OBSERVED / NEEDS_RUNTIME_VALIDATION  
Date: 2026-08-26  
Scope: Movie Tool Learning Base

## Purpose

Palmier → DaVinci handoffでFCPXMLに載らない値を、すぐFusionへ送らず、Resolveで最もnative・editable・portableな再構築経路へroutingする。

## New evidence

### 1. Crop SoftnessはTimelineItem propertyとしてscriptable candidate

DaVinci Resolve Scripting API v21系のTimelineItem `SetProperty` / `GetProperty` property listには以下が含まれる。

- CropLeft
- CropRight
- CropTop
- CropBottom
- CropSoftness
- CropRetain
- Opacity
- Pan / Tilt
- ZoomX / ZoomY
- RotationAngle

`CropSoftness` accepted rangeは `-100.0 .. 100.0` と記載される。

Sources:
- https://gist.github.com/X-Raym/2f2bf453fc481b9cca624d7ca0e19de8
- https://github.com/thesleepingsage/Davinci-Resolve-Scripting-API/blob/main/DaVinci%20Resolve%20Scripting%20Doc.md
- https://github.com/socratica/davinci-resolve/blob/main/docs/resolve-python-api.md

### Routing correction

Palmier FCPXMLがedge softnessをomitする場合でも、Palmier側のsemantic `edge softness` がDaVinci Inspectorの `CropSoftness` とvisual meaning上対応するケースでは、Recovery Pathの第一候補をFusionに固定しない。

```text
Canonical edge softness
→ resolve semantic mapping check
→ TimelineItem.SetProperty("CropSoftness", value) canary
→ visual/readback verification
→ if insufficient/non-equivalent, Fusion .setting fallback
```

重要: Palmierの `edge softness` とResolveの `CropSoftness` が完全同義とはまだ証明していない。したがって現時点は `REBUILD_VALUES candidate` であり `EXACT` ではない。

## 2. Fusion composition import/exportは公式Scripting surfaceに存在する

TimelineItem surfaceには以下が存在する。

- `AddFusionComp()`
- `ImportFusionComp(path)`
- `ExportFusionComp(path, compIndex)`
- `DeleteFusionCompByName(...)`
- `LoadFusionCompByName(...)`
- `RenameFusionCompByName(...)`

したがってCanonical Motion Specから `.setting` / Fusion composition artifactを生成し、対象TimelineItemへimportする方式は正式APIに沿ったrebuild path候補。

ただし、API存在だけではTrustedにしない。clean project / fresh clipでの実Import、node readback、再編集、save/reopen、render parityが必要。

Sources:
- https://gist.github.com/X-Raym/2f2bf453fc481b9cca624d7ca0e19de8
- https://github.com/socratica/davinci-resolve/blob/main/docs/resolve-python-api.md

## 3. LottieはResolve 21でnative direct-import pathがある

Blackmagic DesignのDaVinci Resolve 21 New Features GuideおよびWhat's Newでは、`.json` / `.lottie`をMedia PoolまたはTimelineへ直接追加でき、alpha transparencyを維持してrendered animation clipのように扱えると明示されている。Fusionには `OGrafLoader` も追加されている。

Sources:
- https://documents.blackmagicdesign.com/SupportNotes/DaVinci_Resolve_21_New_Features_Guide.pdf
- https://www.blackmagicdesign.com/jp/products/davinciresolve/whatsnew

### Routing rule

Palmier側でLottieがFCPXML transportされない場合:

```text
Lottie source artifact retained
→ DaVinci 21 direct .lottie import first
→ alpha / duration / trim / scaling / editability verification
→ OGrafLoader/Fusion only when node-level composition control is needed
→ baked video only as lower-editability fallback
```

つまり `FCPXML LOST = visual asset must be baked` ではない。

## 4. Edge roundingは別扱いを維持

Resolve 21にはPicture in Picture Resolve FXでframe rounding等を調整できるNative UI pathが追加されている。ただし、現時点でTimelineItem scripting surfaceから任意Resolve FXを追加・parameterizeするdocumented APIを確認できていない。

Source:
- https://documents.blackmagicdesign.com/SupportNotes/DaVinci_Resolve_21_New_Features_Guide.pdf

したがってedge roundingは現状:

```text
FCPXML omitted
→ documented Edit-page SetProperty direct route: not confirmed
→ Resolve FX UI native candidate: available but automation path unverified
→ Fusion .setting / macro candidate
→ assisted rebuild fallback
```

とする。

## 5. Audio volume/fadeはVisual SetPropertyと混同しない

Resolve scripting communityの21.0.0 live mutation evidenceでは、`SetProperty('Volume'|'Level'|'Gain'|'AudioVolume', ...)` はFalseとなり、documented TimelineItem property listにもFairlight clip/track volume/fade automation write surfaceはない。

また `Pan` はaudio panではなくVIDEO transform propertyなので、audio automation指示で使わない。

Evidence:
- https://github.com/samuelgursky/davinci-resolve-mcp/blob/main/docs/reference/api-limitations.md

これは公式API不存在の補助Evidenceであり、21.0.3 actual runtimeで再確認するまでは `ASSISTED_REBUILD candidate` を維持する。

## Updated compiler routing

| Lost / omitted capability | Preferred rebuild candidate | Fallback | Current trust |
|---|---|---|---|
| Crop softness / edge softness-like value | Edit page `TimelineItem.SetProperty("CropSoftness")` | Fusion `.setting` | OBSERVED / runtime needed |
| Edge rounding | Native Resolve FX UI path if automatable | Fusion `.setting` / assisted | OBSERVED / automation unverified |
| Lottie | Direct `.lottie` import | Fusion `OGrafLoader` → bake | Official capability / handoff unverified |
| Complex mask/reveal | Fusion comp `.setting` / ImportFusionComp | assisted rebuild | API surface observed |
| Audio volume keyframes / fades | no trusted scripted write route yet | Fairlight assisted/manual | runtime revalidation needed |

## Instruction Pattern update

DaVinci/Codexへ再構築を依頼する時は、最初から `Fusionで作って` と指定しない。

```text
1. Read the current timeline item and project context.
2. Map the Human Master capability to the simplest documented native Resolve property.
3. Prefer Edit-page TimelineItem property if it preserves meaning and editability.
4. If no equivalent native property exists, use a Fusion artifact / .setting path.
5. Do not confuse video transform Pan with Fairlight audio pan.
6. After mutation, GetProperty/read back the target value.
7. Reopen/save or clean-import where applicable.
8. Render comparison frames/audio before promoting fidelity.
```

## Next Canary

### CropSoftness semantic parity canary

Use one test image and fixed crop geometry.

Human Master:

```text
edgeSoftnessNormalized: 0.00 / 0.25 / 0.50 / 1.00
```

For each value:

1. map to candidate Resolve CropSoftness value
2. apply with `SetProperty`
3. `GetProperty("CropSoftness")` readback
4. render fixed frames
5. compare against Palmier reference
6. determine mapping curve or reject equivalence

Only if this fails should the same canary move to Fusion.

### Lottie canary

1. retain original `.lottie`
2. import directly into clean Resolve 21.0.3 project
3. verify alpha
4. verify duration / trim
5. verify scaling / positioning
6. save/reopen
7. relink/package test
8. compare render to source player/reference

## Research state

`RESEARCH_SATURATED = false`

Reason: this run changed a concrete Recovery Path priority (CropSoftness direct native candidate before Fusion) and defined new runtime canaries. Clean Resolve runtime remains required before promotion.