# Wan2.2 5B fp16 Mac MPS検証

日付: 2026-06-10

## 目的

Mac MPSで、FP8を使わないWan2.2系のローカル動画生成が動くか確認する。

## 結論

Wan2.2 TI2V 5B fp16は、Mac MPSで最小テスト成功。

このプロジェクトのローカル動画AI本命は、まずこの構成にする。

## 使用モデル

`~/ComfyUI-Shared/models/` 配下。

```text
diffusion_models/wan2.2_ti2v_5B_fp16.safetensors
text_encoders/umt5_xxl_fp16.safetensors
vae/wan2.2_vae.safetensors
```

## 削除したもの

Mac MPSでFP8が使えないため、FP8系は削除した。

```text
diffusion_models/wan2.2_i2v_480p_5B_fp8_scaled.safetensors
diffusion_models/wan2.2_t2v_high_noise_14B_fp8_scaled.safetensors
diffusion_models/wan2.2_t2v_low_noise_14B_fp8_scaled.safetensors
text_encoders/umt5_xxl_fp8_e4m3fn_scaled.safetensors
```

14B low noise単体も、公式14B T2Vとしてはhigh noiseとのペア前提で、Macローカル本命から外したため削除した。

```text
diffusion_models/wan2.2_t2v_low_noise_14B_bf16.safetensors
diffusion_models/wan2.2_t2v_low_noise_14B_fp16.safetensors
```

## 実行したテスト

```text
prompt_id: d082614e-8f93-4775-ba27-aca66a5f6f9e
width: 128
height: 128
length: 5
steps: 1
sampler: euler
scheduler: simple
```

出力:

```text
~/ComfyUI-Shared/output/video/wan5b-fp16-mps-test_00001_.mp4
```

## 次の実制作方針

1. まずは低解像度、短尺、少ないstepでハワイ海素材を試す。
2. 動いたら解像度とフレーム数を少しずつ上げる。
3. 結婚式本編に使う素材は3-5秒に限定する。
4. 生成物はGitに入れず、採点と編集指示だけ残す。
