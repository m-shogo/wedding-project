# ADD-16 両親贈呈品メッセージカード — ASSET QUEUE

Status: `PREPARED_FOR_FIGMA`
Date: 2026-08-02

## Required inputs before production
- [ ] 両家別／共通カードの判断
- [ ] 贈呈品の種類・外寸・包装方法
- [ ] カードの取付／封入方法
- [ ] 宛名と正式な呼称
- [ ] 本文または短文の正本
- [ ] 新郎新婦の署名表記
- [ ] 縦書き／横書き
- [ ] 手紙朗読との役割分担

## Native Figma elements
- [ ] 起点を示す小さなorigin mark
- [ ] 余白を横切らない短いhome-port route
- [ ] 本文を支える細いrule
- [ ] 自筆署名用の編集可能領域

## Conditional raster
- [ ] 正式な家族写真が採用された場合のみ、権利・解像度・トリミングを確認

## Explicitly not generated
- AI生成家族写真
- 架空の幼少期写真／思い出写真
- 汎用的な花束、家、ハート、飛行機の装飾PNG
- 本文や氏名を焼き込んだ画像

## Production decision
現時点のproduction rasterは0件。本文と贈呈品の物理条件が未確定であり、装飾素材を先行生成するとカードの感情的な静けさと実装適合性を損なうため。
