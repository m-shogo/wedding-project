# Palmier → DaVinci Export QA / Instruction Guardrails

Status: OBSERVED / NEEDS_RUNTIME_VALIDATION  
Date: 2026-08-26  
Scope: Movie Tool Learning Base

## Purpose

Palmier → DaVinci のhandoffで、単に「export commandが成功した」ことを完成条件にしない。出力Artifactの実在・新規性・importability・編集可能性まで検証する。

## New evidence

### 1. Palmier Agent contractは success-shaped response を禁止

Palmier upstream `AGENTS.md` は、Agent toolに対して次を要求している。

- tool引数をuntrustedとして検証
- mutation前にrequest全体をvalidate
- UIと同じdomain operationを再利用
- structured receiptsでstable IDs / no-op / warnings / errorsを返す
- requested outcomeが達成されていないのにsuccess-shaped responseを返さない
- long-running toolはdurable job / terminal resultをinspect可能にする

Source:
- https://github.com/palmier-io/palmier-pro/blob/main/AGENTS.md

### 2. XML/FCPXML exportには「書けていないのに成功扱い」する既知Issueがある

Palmier upstream Issue #182では、XML/FCPXML export pathでwrite failureが起きても `progress = 1.0` / `export ok` 相当へ進む可能性が報告されている。Agent側はfileExists checkで部分的に防いでいるが、同じpathに古いexportが残っている場合はstale fileを新しい成功として誤認し得る、とIssue側で指摘されている。

Source:
- https://github.com/palmier-io/palmier-pro/issues/182

## Guardrail update

Palmier export instructionは今後、原則として以下にする。

```text
read current timeline/project
→ resolve exact timelineId / target NLE
→ export to a UNIQUE fresh output path
→ poll durable export job until terminal
→ verify file exists
→ verify mtime/size changed after this job
→ parse/readback interchange file where possible
→ import into clean DaVinci test project
→ verify clips/timing/text/transforms/keyframes/editability
→ only then mark handoff PASS
```

### 禁止

- `status=started` / `status=queued` をcompletion扱いしない
- progress 100%だけでPASSにしない
- 同じ固定outputPathを使い回してfileExistsだけでPASSにしない
- stale artifactを再利用してexport成功と判定しない

### Recommended output naming

```text
<project>-<timeline>-<target>-<timestamp>-<source-head>.fcpxml
```

少なくともrunごとにunique pathを使う。

## Palmier capability evidence update

Palmier current Agent tool definitionは、`export_project`で:

- video: H.264 / H.265 / ProRes
- xml: XMEML
- fcpxml: FCPXML
- palmier: self-contained `.palmier`
- Premiere → `xml`
- DaVinci Resolve / Final Cut → `fcpxml`
- `fcpxmlTarget` = `resolve` / `fcp`

を明示している。

またcurrent tool definitionでは、FCPXMLはXMLよりも text / transforms / crop / opacity / keyframes を運べると説明される一方、edge softness / edge roundingはXML/FCPXML interchangeではomitされる。

Source:
- https://github.com/palmier-io/palmier-pro/blob/main/Sources/PalmierPro/Agent/Tools/ToolDefinitions.swift

## Handoff fidelity delta

| Capability | Current transport expectation | Recovery class | Verification |
|---|---|---|---|
| Clip timing / trims | FCPXML transport | EXACT candidate | clean import + timeline readback |
| Text | FCPXML transport | EXACT/APPROX candidate | font/style/editability check |
| Position / Scale / Rotation keyframes | FCPXML transport candidate | EXACT/APPROX | frame sampling + editability |
| Opacity keyframes | FCPXML transport candidate | EXACT/APPROX | frame sampling |
| Static / animated crop | tool supports crop keyframes; Resolve transport must remain runtime-verified | APPROX / REBUILD_VALUES fallback | clean import + visual compare |
| Edge Softness | interchange omitted | REBUILD_VALUES / REBUILD_INTENT | Fusion `.setting` canary |
| Edge Rounding | interchange omitted | REBUILD_VALUES / REBUILD_INTENT | Fusion `.setting` canary |
| Audio Volume keyframe / Fade | Palmier-native edit exists; Resolve scripting write surface remains constrained | ASSISTED_REBUILD candidate | Resolve 21.x live canary |

## Instruction reliability lesson

Export instruction itself is a Capability. Trusted状態を `Palmier export works` のようにtool全体へ付けず、最低でも次を分離する。

- `EXPORT_FCPXML_JOB_COMPLETES`
- `EXPORT_FCPXML_ARTIFACT_FRESH`
- `EXPORT_FCPXML_PARSEABLE`
- `DAVINCI_IMPORT_SUCCEEDS`
- `DAVINCI_TIMING_PARITY`
- `DAVINCI_MOTION_EDITABLE`
- `DAVINCI_TEXT_EDITABLE`

各段階を別々にObserved/Verified管理する。

## Next canary

1本のsynthetic timelineで以下を同時に持たせる。

- Position keyframes
- Scale keyframes
- Rotation keyframes
- Crop keyframes
- Opacity keyframes
- Audio volume keyframes
- Audio fade
- Text
- Edge softness
- Edge rounding

Artifacts:

```text
Palmier project
Human Master JSON
fresh FCPXML
DaVinci import evidence
Fusion rebuild artifact (.setting where appropriate)
rendered comparison frames
```

PASS条件:

1. unique output artifact generated
2. artifact timestamp/hash proves fresh output
3. FCPXML parse/readback succeeds
4. clean DaVinci import succeeds
5. transported properties remain editable
6. omitted properties have explicit Recovery Path
7. rendered visual/audio result is compared against Palmier reference

## Research state

`RESEARCH_SATURATED = false`

Reason: clean DaVinci import, Fusion `.setting` rebuild, audio fade/volume rebuild, and full Golden Handoff test remain high-value unverified items.
