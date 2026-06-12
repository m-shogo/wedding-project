# 本番未確定素材の一覧

自動生成: `pnpm export:capcut`。CapCutで本編を確定する前に、この表を空にする
(全素材を approved / final / external にする)のがゴール。

**ルール: candidate以上への昇格は人間の確認が必須。AIが勝手に昇格させない。**

## missing (4件)

- **photo-hawaii-01** — 写真-Hawaii 1枚目(プロポーズ文脈)
  - path: `public/photos/opening/hawaii-01.jpg`
  - 使用シーン: opening-photo-hawaii
  - メモ: 実写真の選定待ち(docs/templates/photo-selection.csv)
- **photo-hawaii-02** — 写真-Hawaii 2枚目
  - path: `public/photos/opening/hawaii-02.jpg`
  - 使用シーン: opening-photo-hawaii
- **photo-hawaii-03** — 写真-Hawaii 3枚目
  - path: `public/photos/opening/hawaii-03.jpg`
  - 使用シーン: opening-photo-hawaii
- **bgm-main** — オープニング本編BGM
  - path: `../07_music/`
  - 使用シーン: opening-countdown
  - メモ: 候補集め: docs/templates/music-candidates.csv。会場上映の利用条件確認必須

## generated_preview (6件)

- **photo-sample-01** — 写真カードの動作確認用プレースホルダー(合成グラデ画像)
  - path: `public/photos/opening/sample-01.jpg`
  - 使用シーン: なし
  - 再生成: `ffmpeg -f lavfi -i 'gradients=s=900x1200:c0=#2a4a6b:c1=#d9a05b:n=2' -frames:v 1 public/photos/opening/sample-01.jpg`
  - メモ: 実写真ではなく、動作確認用の合成グラデ画像なので再生成可能
- **render-boarding** — CapCut Track2: 搭乗券イントロ
  - path: `out/opening/boarding_pass_intro.mp4`
  - 使用シーン: なし
  - 再生成: `pnpm render 搭乗券 final`
- **render-stamp-rush** — CapCut Track2: スタンプ連打ダイジェスト
  - path: `out/opening/stamp_rush_full_route.mp4`
  - 使用シーン: なし
  - 再生成: `pnpm render 押印連打-全路線 final`
- **render-countdown** — CapCut Track2: 入場前カウントダウン
  - path: `out/opening/countdown_10sec.mp4`
  - 使用シーン: なし
  - 再生成: `pnpm render 入場前-秒読 final`
- **render-stamp-okinawa** — CapCut Track4: 透過ハンコ(乗算ブレンド推奨)
  - path: `out/opening/stamp_okinawa.webm`
  - 使用シーン: なし
  - 再生成: `pnpm render 押印-沖縄 final`
- **render-cloud-overlay** — CapCut Track3: 透過雲オーバーレイ(不透明度50-70%)
  - path: `out/common/cloud_overlay.webm`
  - 使用シーン: なし
  - 再生成: `pnpm render 雲-透過 final`

