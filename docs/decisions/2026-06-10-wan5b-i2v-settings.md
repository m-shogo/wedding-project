# Wan2.2 5B Image-to-Video 実制作設定の確定

日付: 2026-06-10
状態: 確定（このMacでのI2V標準設定）

## 結論

Mac MPS + Wan2.2 TI2V 5B fp16でのImage-to-Video標準設定:

```text
width: 480 / height: 272 / length: 49 (16fpsで約3秒)
steps: 14 / cfg: 5.0 / sampler: euler / scheduler: simple / shift: 8.0
所要時間: 約15分/本
```

実行はAPI経由: `python3 scripts/comfy_i2v.py --image ... --prompt ... --prefix ...`

## 学んだ失敗: 明るいシーンの白飛び

op_07ハワイビーチのtest01（cfg 6.0 / 8steps / 「bright」「warm sunlight」強調プロンプト）は
全フレームが白飛びして不採用。同設定でも室内シーン（op_11成田ロビー）は正常だったため、
**明るい屋外シーン × 高cfg × 低ステップ × 明るさ強調プロンプトの複合**が原因。

対策（test02で効果確認済み）:

- cfg 6.0 → 5.0（公式推奨値）
- steps 8 → 14
- プロンプトの「bright」「warm sunlight」を「soft golden hour light, balanced natural exposure」へ
- ネガティブに `overexposed, blown highlights, washed out colors` を追加（スクリプトに恒久反映）

同じ理由で、光が主役の素材（光る扉、明るい空）も「balanced exposure, soft light only」を
プロンプトに入れる。

## 生成結果ログ

| 素材 | 試行 | 設定 | 結果 |
|------|------|------|------|
| op_11 成田ロビー | test01 | 320x192/17f/8steps/cfg6 | 成功（最小テスト） |
| op_07 ハワイの海 | test01 | 480x272/49f/8steps/cfg6 | 白飛びで不採用 |
| op_07 ハワイの海 | test02 | 480x272/49f/14steps/cfg5 | 採用候補。露出正常・テロップ余白あり |
| op_08 雨ビーチ | test01 | 同上 | 生成中 |
| op_09 横浜の空 | test01 | 同上 | 生成中 |
| op_10 チャペル扉 | test01 | 同上 | 生成中 |

## 制約と次の判断

- 5秒フル尺（81フレーム）は1本25分超の見込み。まず49フレーム（3秒）で
  採否を決め、採用素材だけ長尺・高解像度（832x480等）で再生成する。
- 本編解像度が必要になったら、時間を測ってから判断する。
- 生成物は `~/ComfyUI-Shared/output/video/`。Gitには入れない。
