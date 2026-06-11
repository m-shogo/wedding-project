# Wan2.2 14B FP8 Mac MPS検証

日付: 2026-06-10

## 目的

ComfyUI Desktop上で、Wan2.2 14B / FP8系ワークフローがMacのMPSで動くか確認する。

## 環境

- ComfyUI Desktop
- ComfyUI API: `http://127.0.0.1:8188`
- デバイス: `mps`
- メモリ: 24GB

## 追加したモデル

`~/ComfyUI-Shared/models/` 配下に、公式Wan2.2 14B T2V FP8テンプレートで必要な不足モデルを追加した。

```text
diffusion_models/wan2.2_t2v_high_noise_14B_fp8_scaled.safetensors
vae/wan_2.1_vae.safetensors
```

既に存在していたもの:

```text
diffusion_models/wan2.2_t2v_low_noise_14B_fp8_scaled.safetensors
text_encoders/umt5_xxl_fp8_e4m3fn_scaled.safetensors
```

## 実行したテスト

公式Wan2.2 14B T2V FP8構成を、最小設定に落としてAPIから実行した。

```text
prompt_id: 8515085f-ba90-49ad-8ac2-a39c02423257
width: 128
height: 128
length: 5
steps: 2
sampler: euler
scheduler: simple
```

## 結果

失敗。動画は生成されなかった。

エラー:

```text
TypeError: Trying to convert Float8_e4m3fn to the MPS backend but it does not have support for that dtype.
```

## 判断

MacのMPSでは、Wan2.2 14B FP8系の公式テンプレートはそのまま実用できない。

今回の検証では、モデル認識とロードは進んだが、サンプリング時にFP8 dtypeをMPSへ変換できず停止した。

次に進む場合は、以下のどちらかを選ぶ。

1. MacではFP8を避け、fp16/bf16系またはMac対応が明記された軽量ワークフローを使う。
2. Wan2.2 14B FP8を使う場合は、NVIDIA GPU環境またはComfy Cloudなどを検討する。

このプロジェクトでは、結婚式ムービー用素材の実制作は1を優先する。
