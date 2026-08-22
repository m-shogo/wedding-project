# 参考素材の置き場（Git管理外）

このフォルダの中身は **Gitに入れない**（`.gitignore` で除外）。このREADMEだけ管理する。

```text
10_references/media/
  pool/    ① 集めた素材をここに置く（無料素材サイト等から）
  reel/    ② `slice_clips.py reel --write` が作る確認用リール
  clips/   ③ `slice_clips.py slice --write` が切り出したクリップ
```

`pool/` は自分で作る。`reel/` と `clips/` はスクリプトが自動で作る。

## 使い方

```sh
# 素材を集める（公式API。要・無料APIキー）
python3 scripts/fetch_stock.py --provider pexels --query "clouds aerial" --count 3
python3 scripts/fetch_stock.py --provider pexels --query "clouds aerial" --count 3 --write

# 目視確認してから
python3 scripts/slice_clips.py reel --write     # 1本にまとめて全体を見る
# 使いたい区間を docs/templates/sample-clips.csv に記録してから
python3 scripts/slice_clips.py slice --write    # 秒単位で切り出す
```

手順の詳細: [../../docs/clip-library-guide.md](../../docs/clip-library-guide.md)
無料素材の入手先: [../../docs/free-sample-sources.md](../../docs/free-sample-sources.md)

## 注意

- ライセンスを確認してから置く。出所は `sample-clips.csv` の `notes` に必ず控える。
- 人物・動物・読める文字・ロゴ・看板が写った素材は採用しない（Style Bible）。
- **Coverr素材はAI生成の参照素材に使わない**（ライセンスがAI利用を禁止）。
