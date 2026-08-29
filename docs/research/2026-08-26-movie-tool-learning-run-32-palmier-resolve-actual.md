# Movie Tool Learning Run 32 — Palmier → Resolve Actual

Date: 2026-08-26

## Scope

- Palmier Proの実timelineからResolve-target FCPXMLを実書き出しする。
- DaVinci Resolve Free 21.0.4.5の使い捨てprojectへimportする。
- inventory/property readback、save/reopen、Actual renderを実行する。
- 実婚礼project/private mediaは使わない。

## Runtime identity

- Product: `DaVinci Resolve`
- Version: `21.0.4.5`
- Edition: Free
- Platform: macOS
- Project: `MotionZukan_Palmier_Canary_20260826_B`
- Timeline: `Timeline 1`

外部Developer API設定はFree版UIに存在しなかったため、Resolve公式のuser Utility scriptをアプリ内部から実行した。

## Attempt A — real failure

最初のPalmier実exportはPalmier生成matte `matte-D9F8AEFB.png`を含んだ。Resolveはファイル名中の数字を連番として解釈し、`matte-D9F[0-149]AEFB.png`のfull-resolution media不足でActual renderを0.6秒地点で停止した。

この失敗を隠してPASSにせず、数字を含まないneutral asset `palmier-static-matte.png`へPalmier内でsource swapした。transform keyframeとtimingは保持された。

## Attempt B — fresh real Palmier export

- Export start: `2026-08-26T14:01:22Z`
- Source modified: `2026-08-26T14:01:28.223Z`
- FCPXML: `1.10`
- SHA-256: `1e7ad707cf31b0b3b230e11f701efc873bf2a5d5fbb01569ab67a54be7883365`
- Provenance: `OPERATOR_ATTESTED_REAL_PALMIER_EXPORT`

Resolve import後のinventory:

- Duration: 240 frames / 8 seconds / 30fps
- Resolution: 1920×1080
- Video tracks: 4
- Audio tracks: 2
- Timeline items: 8
- Repeated video clipsは同じphysical source pathを維持
- 全source pathはonline

保存→project close→同名project reopen後も、240 frames / 4 video tracks / 2 audio tracks / 8 itemsを保持した。

## Actual render

- Output: H.264/AAC MP4
- Duration: 8.064 seconds
- Resolution: 1920×1080
- Frame rate: 30fps
- SHA-256: `92680407f1b25263f0aedf9dc1a24e1e52bad5187f4a7690e9a9c983f180589a`

contact sheetで、base clip、transform-keyframed matte、title、repeated source、final stillを目視確認した。音声streamも存在し、1秒区間のmean volumeは前半約-25.3dB、repeat区間約-23.1dBだった。

## Property result

### Transport observed

- clip placement / duration / repeated physical source
- static scale (`ZoomX/Y=0.92`)
- transform keyframeの視覚変化
- title text
- static volume element (`adjust-volume amount=-3/-6`)とrendered audio

### Known omission preserved

- audio volume keyframes
- audio fade in/out

これらはHuman Masterで再構築対象のままとし、timelineがrenderできたことを根拠にtransport済みへ昇格させない。

### Runtime failure: static crop

Palmier内部timeline readbackにはbase clipの四辺`0.02` cropが存在したが、fresh実FCPXMLにはcrop要素が一切なかった。Resolve import後の`TimelineItem:GetProperty()`も`CropLeft/Right/Top/Bottom=0`だった。

したがって`crop-static`は`APPROX` transportではない。`REBUILD_VALUES / ASSISTED_REBUILD / RUNTIME_FAILED`へ降格し、Human Master値をResolve Edit pageへ再入力する。

## Verdict

- Import/readback/save-reopen/render path: PASS
- Static crop transport: FAIL
- Canary overall: FAIL（required transport property omission）
- Promotion eligible: NO

1回の成功経路だけでは`RUNTIME_VERIFIED`へ昇格しない。さらに今回はrequired static crop omissionがあるため、独立2回目を回す前にPalmier exporter修正またはHuman Master crop rebuildの正式finish stepが必要。
