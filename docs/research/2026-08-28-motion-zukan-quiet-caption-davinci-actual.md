# Motion Zukan Quiet Caption — DaVinci Actual

Date: 2026-08-28
Status: Completed / PRODUCTION_READY
Scope: `type-quiet-caption`

## Actual構成

- Resolve project: `MotionZukan_QuietCaption_Actual_20260828_Codex`
- Timeline: `Quiet Caption Actual 24fps`
- 1280x720 / 24fps / 95frames / 3.958333秒
- Text+: `A QUIET BEGINNING`
- Font: Helvetica Neue Regular
- Position: x=0.50 / y=0.22(Fusion bottom-originの下寄せ)
- Size: 0.055 / Tracking: 1.08
- Motion: Merge Blendだけをframe 0=0、5=0.4545、11=1、94=1。位置・scaleは静止。
- Audio: なし。専用project内の重複source audioも削除済み。

## Render経路

DeliverのH.264試行はFusion titleが反映されない出力になったため、証拠として採用しなかった。
FusionページでMediaIn → Merge(Text+ foreground) → MediaOutを実画面確認し、native Saverから
118枚の合成済みEXRをResolve自身で出力。その先頭95framesをffmpegでH.264へ収録した。
したがって映像合成の正本はResolve Fusion出力であり、MP4 encoderだけがffmpegである。

## 永続asset

- `movie-dashboard/public/motion-previews/type-quiet-caption/davinci-actual-v1.mp4`
  - SHA-256: `945439d65312d947087b1f64e570d4d7eae9300bb0db656d20f3d66572e0ad03`
- `movie-dashboard/public/motion-previews/type-quiet-caption/davinci-actual-v1-poster.png`
  - SHA-256: `637e04022d1c2983ba1b917274a4ea574dfa55f686248867fc145d31f08ffe69`

## 独立oracle

`verify-quiet-caption-davinci-actual.mjs`が次をfail-closedで確認する。

- H.264 / 1280x720 / 24fps / 95frames / 3.958333秒
- frame 5はframe 11の約半分のcaption差分で、短いopacity fadeになっている
- frame 11 / 50 / 94のcaption ROI差分が同一水準でholdする
- caption bboxがx=407..869 / y=545..583から移動しない
- control ROIは静止し、カメラmotionを混入しない
- asset hash、図鑑/evidence登録、Resolve builderのkeyframe token、Actual queue除外

## 残る人間判断

背景はDEMO_ONLY_NOT_USER_MEDIA。演出技法自体はActualだが、本人素材へ適用する際の文章、
顔を避けた配置、読み時間、最終採用は別途Human approvalが必要。
