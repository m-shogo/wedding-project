# StaRt同期・日本式オープニング

`JapaneseFriendsOpeningStartSyncV1` は、架空キャストの日本式披露宴オープニングを、ローカルにあるMrs. GREEN APPLE「StaRt」の結婚式編集範囲へ同期した私的確認用コンポジションです。

## 正本

- 音源: `motion-studio/local/audio/StaRt.m4a`（Git管理外）
- Remotion用音源: `motion-studio/public/local-start-wedding-edit/audio/start-wedding-edit.m4a`（Git管理外）
- 歌詞・フレーズ時刻: `motion-studio/src/data/startWeddingEdit/generated.ts`
- 映像: `motion-studio/src/compositions/common/JapaneseFriendsOpeningStartSync.tsx`
- 編集範囲: 0–145.6秒、30fps、4368フレーム
- リズム: 187.5 BPM、歌詞30フレーズ、実測3-hit 4か所

## 再生成

```bash
cd motion-studio
pnpm render:japanese-friends-opening-start-sync
```

本番レンダーは `motion-studio/out/opening/japanese_friends_opening_start_sync_v1.mp4` に生成され、ローカルのモーション図鑑へコピーされます。publisherは解像度・fps・尺・音声形式・黒画面・1秒以上の無音を検査し、追跡可能なmanifestだけをGit管理します。

## 権利とタイミング

音源・歌詞の上映／複製／配信権は未確認です。成果物は私的確認専用で、公開・納品・会場上映の承認を示しません。

フレーズ時刻の大半は信号解析と既存マッピングによる暫定値です。3-hitは実測ビートへスナップ済みですが、全歌詞について人間の聴取による最終確認が必要です。
