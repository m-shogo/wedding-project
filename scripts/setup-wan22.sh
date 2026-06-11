#!/bin/bash
# Wan2.2 T2V モデルダウンロードスクリプト
# 実行: bash scripts/setup-wan22.sh

BASE="https://huggingface.co/Comfy-Org/Wan_2.2_ComfyUI_repackaged/resolve/main/split_files"
MODELS=~/ComfyUI-Shared/models

mkdir -p "$MODELS/diffusion_models" "$MODELS/vae" "$MODELS/text_encoders"

echo "=== Wan2.2 T2V モデルをダウンロード中 (合計約12GB) ==="

curl -L "$BASE/diffusion_models/wan2.2_t2v_low_noise_14B_fp8_scaled.safetensors" \
  -o "$MODELS/diffusion_models/wan2.2_t2v_low_noise_14B_fp8_scaled.safetensors" --progress-bar &

curl -L "$BASE/vae/wan2.2_vae.safetensors" \
  -o "$MODELS/vae/wan2.2_vae.safetensors" --progress-bar &

curl -L "$BASE/text_encoders/umt5_xxl_fp8_e4m3fn_scaled.safetensors" \
  -o "$MODELS/text_encoders/umt5_xxl_fp8_e4m3fn_scaled.safetensors" --progress-bar &

wait
echo "=== 完了 ==="
ls -lh "$MODELS/diffusion_models/wan2.2_t2v_low_noise_14B_fp8_scaled.safetensors" \
        "$MODELS/vae/wan2.2_vae.safetensors" \
        "$MODELS/text_encoders/umt5_xxl_fp8_e4m3fn_scaled.safetensors"
