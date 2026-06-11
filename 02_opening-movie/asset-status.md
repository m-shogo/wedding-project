# オープニング素材ステータス

最終更新: 2026-06-11（`python3 scripts/check_assets.py --write` で再生成）

## 素材別ステータス

| 素材ID | 名前 | 点 | 静止画 | I2V動画 | 状態 |
|--------|------|----|--------|---------|------|
| 3 | 雲海（上から） | 89 | op_16_cloud_transition_ai.png | 0本 | 動画未生成 |
| 1-B | 薄い光の抽象背景 | 88 | op_02_boarding_pass_bg_ai.png | 0本 | 動画未生成 |
| 2-A | 飛行機窓・地上の遠景 | 87 | — | 0本 | 静止画なし（I2V不可） |
| 2-B | 飛行機窓・青空と雲 | 86 | op_03_airplane_window_clouds_ai.png | 0本 | 動画未生成 |
| 1-A-1 | 空港ロビーの光（朝） | 85 | op_11_narita_airport_lobby_ai.png | 3本 | 生成済み・未採点 |
| 4-A-1 | ハワイの海・ゴールドの光 | 85 | op_07_hawaii_beach_ai.png | 2本 | 生成済み・未採点 |
| 5-B | 光が差す扉 | 84 | op_10_chapel_door_ai.png | 1本 | 生成済み・未採点 |
| 1-A-2 | 空港ロビーの光（夜） | 82 | op_01_narita_boarding_gate_ai.png | 0本 | 動画未生成 |
| 4-A-2 | ハワイの海・夕暮れ | 81 | — | 0本 | 静止画なし（I2V不可） |

## ドラフトビルドが参照する画像

build_opening_movie.py 参照: 15枚 / sample_image: 22枚

## 未使用の静止画（素材表・ビルド両方で未参照）

- _dup_airplane_window.png
- _dup_narita_lobby.png
- op_04_flight_map_bg_ai.png
- op_09_yokohama_sky_ai.png
- op_14_okinawa_sunset_ai.png
- op_17_hawaii_night_view_ai.png
- op_20_countdown_light_ai.png

## 重複ファイル（削除候補）

- _dup_airplane_window.png
- _dup_narita_lobby.png

## 素材表に紐付かない生成動画（採否未整理）

- op_08_hawaii_rain_beach_test01_00001_.mp4
- op_09_yokohama_sky_test01_00001_.mp4
- wan5b-fp16-mps-test_00001_.mp4

## 要対応

- 素材2-A 飛行機窓・地上の遠景: 対応する静止画がない。先に静止画を生成するか流用元を決める。
- 素材1-A-1 空港ロビーの光（朝）: 動画 3本が未採点。scorecardで採点して採否を決める。
- 素材4-A-1 ハワイの海・ゴールドの光: 動画 2本が未採点。scorecardで採点して採否を決める。
- 素材5-B 光が差す扉: 動画 1本が未採点。scorecardで採点して採否を決める。
- 素材4-A-2 ハワイの海・夕暮れ: 対応する静止画がない。先に静止画を生成するか流用元を決める。
