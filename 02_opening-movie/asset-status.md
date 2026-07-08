# オープニング素材ステータス

最終更新: 2026-07-08（`python3 scripts/check_assets.py --write` で再生成）

## 前提

- `02_opening-movie/sample_image/**` はGit管理外。GitHub上に画像が無いこと自体は欠落ではない。
- この表は、ローカル素材・I2V生成ログ・scorecard・目視確認結果を合わせて読む。
- 人物、動物、文字、ロゴ、看板が入ったAI素材は、点数が高くても不採用または再生成対象。
- AIが勝手に採用確定しない。`candidate` 以上への昇格は人間確認が必須。
- 人間判断は `scripts/check_assets.py` の固定データにも反映する。`--write` で重要判断が消えないようにするため。

## 素材別ステータス

| 素材ID | 名前 | 点 | 静止画 | I2V動画 | 状態 |
|--------|------|----|--------|---------|------|
| 3 | 雲海（上から） | 89 | op_16_cloud_transition_ai.png | 1本 | 採点済み・採用候補 |
| 1-B | 薄い光の抽象背景 | 88 | op_02_boarding_pass_bg_ai.png | 1本 | 採点済み・採用候補 |
| 2-A | 飛行機窓・地上の遠景 | 87 | — | 0本 | 静止画なし（I2V不可） |
| 2-B | 飛行機窓・青空と雲 | 86 | op_03_airplane_window_clouds_ai.png | 1本 | 採点済み・採用候補 |
| 1-A-1 | 空港ロビーの光（朝） | 85 | op_11_narita_airport_lobby_ai.png | 3本 | 不採用（人物入り・再生成対象） |
| 4-A-1 | ハワイの海・ゴールドの光 | 85 | op_07_hawaii_beach_ai.png | 2本 | 採点済み・採用候補 |
| 5-B | 光が差す扉 | 84 | op_10_chapel_door_ai.png | 1本 | I2V版は不採用。Remotion版と比較 |
| 1-A-2 | 空港ロビーの光（夜） | 82 | op_01_narita_boarding_gate_ai.png | 0本 | 不採用（人物入り・再生成対象） |
| 4-A-2 | ハワイの海・夕暮れ | 81 | — | 0本 | 静止画なし（I2V不可） |

## 不採用・再生成対象

| 素材 | 理由 | 次の対応 |
|---|---|---|
| op_01_narita_boarding_gate_ai.png | カウンター係員と搭乗客の後ろ姿が写っている。Style Bibleの `no people` 違反 | 人物なしの搭乗ゲート/空港ロビーとして再生成 |
| op_11_narita_airport_lobby_ai.png | 複数人物が写っている。Style Bibleの `no people` 違反 | 人物なしの空港ロビーとして再生成 |
| op_10_chapel_door_ai.png のI2V test01 | 光が出ず暗闇になり、入場直前の期待感が弱い | Remotion版 `扉-光` と比較。AI版は再生成するなら warm light を強調 |
| op_08_hawaii_rain_beach_test01 | 白カブリで主役不在。明るい章に合わない | 不採用。必要なら別用途で再検討 |

## 採用候補I2V

| 動画 | 点 | 用途メモ |
|---|---:|---|
| op_16 雲海 test01 | 87 | 離陸後の山場。CapCutで速度調整推奨 |
| op_02 抽象光背景 test01 | 84 | 搭乗券/テロップ背景向き |
| op_03 飛行機窓 test01 | 81 | 下1/3が白雲なのでテロップは濃い影が必要 |
| op_07 ハワイ海 test02 | 80 | 色がやや淡いがハワイ章の候補 |

## ドラフトビルドが参照する画像

`build_opening_movie.py` はv002ドラフト用の旧ビルドスクリプト。
現在は人物入り不採用素材を参照しないよう、実行時に警告/停止する方針。

- `op_01` / `op_11` の代替ができるまでは、空港ロビー/搭乗ゲートを含む旧ドラフトを本番候補扱いしない。
- 本番に近い確認は `motion-studio` のRemotionテンプレ、または人物なし素材に差し替えたCapCut試作で行う。

build_opening_movie.py 参照: 16枚 / sample_image: 20枚

## 未使用の静止画（素材表・ビルド両方で未参照）

ローカル `sample_image` にある場合のみ確認する。GitHub上に無いこと自体は問題ではない。
- op_04_flight_map_bg_ai.png
- op_08_hawaii_rain_beach_ai.png
- op_09_yokohama_sky_ai.png
- op_17_hawaii_night_view_ai.png

## 重複ファイル（削除候補）

- ローカル実行時に検出されなかった、またはsample_image未配置。

## 素材表に紐付かない生成動画（採否未整理）

- op_08_hawaii_rain_beach_test01_00001_.mp4
- op_09_yokohama_sky_test01_00001_.mp4
- wan5b-fp16-mps-test_00001_.mp4

## 要対応

- 素材2-A 飛行機窓・地上の遠景: 対応する静止画がない。先に静止画を生成するか流用元を決める。
- 素材1-A-1 空港ロビーの光（朝）: op_11_narita_airport_lobby_ai.png は人物入り（複数人物）のため再生成する。
- 素材5-B 光が差す扉: 光が出ず暗闇になり、入場直前の期待感が弱い。Remotion版 `扉-光` と比較。AI版は再生成するなら warm light を強調。
- 素材1-A-2 空港ロビーの光（夜）: op_01_narita_boarding_gate_ai.png は人物入り（カウンター係員と搭乗客の後ろ姿）のため再生成する。
- 素材4-A-2 ハワイの海・夕暮れ: 対応する静止画がない。先に静止画を生成するか流用元を決める。
