import type { ExternalMotionAtlasItem } from "./externalMotionAtlas";

// 2026-09-17 「triple hit / impact frame / speed lines burst」等10語でGIPHY候補234件を集めたが、ほぼ全てTV番組・ゲーム・スポーツ選手・実在人物の切り抜きで、抽象的な打点素材として使えるものはほぼ尽きていた。目視確認した12件中、使えたのはこの1件のみ。
export const externalMotionAtlasAdditions27: ExternalMotionAtlasItem[] = [
  {
    id: "effect-giphy-lightning-burst",
    genre: "EFFECT",
    titleJa: "黄色い稲妻の形が連なって画面を横切る",
    titleOriginal: "Energy Lightning GIF",
    mediaType: "GIF",
    sourceName: "GIPHY / arwardell",
    sourceUrl: "https://giphy.com/gifs/pBafDbx3f5ZvbA1oyS",
    previewUrl: "https://media.giphy.com/media/pBafDbx3f5ZvbA1oyS/giphy.gif",
    descriptionJa: "グレーの背景に、黄色い稲妻の形が連なって左から右へ流れる。抽象的なエネルギー・衝撃の表現。3点バーストの1発をこの稲妻で表現できる。",
    difficulty: 1,
    tags: ["稲妻", "衝撃", "抽象", "3点バースト候補", "GIF"],
  },
];
