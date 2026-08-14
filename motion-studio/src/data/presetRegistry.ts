// テンプレート×props の「名前付きの組み合わせ」= プリセット。
//
// 目的: 毎回propsを指示しなくても、名前ひとつで同じ素材を出せるようにする。
// テンプレートを増やすのではなく、既存テンプレの使い方に名前を付ける。
//
// 使い方:
//   pnpm preset                 一覧
//   pnpm preset <id>            renderコマンドを表示
//   pnpm preset <id> --render   実際に書き出す
//
// remotion/Reactには依存しない純粋データ(check-presets.mtsがNodeで直接importする)。
// propsの正しさは pnpm check:presets が各Compositionのzodスキーマと突き合わせて検証する。

export type PresetStatus = 'draft' | 'approved';

export type PresetEntry = {
  // 英小文字・数字・ハイフンのみ
  id: string;
  // 一覧に出す日本語名
  label: string;
  // Composition ID(sceneRegistry.tsと一致させる)
  compositionId: string;
  description: string;
  // いつ使うか
  usage: string;
  // draft=試作 / approved=人間が実物を見て確定。AIが勝手にapprovedへ上げない
  status: PresetStatus;
  props: Record<string, unknown>;
  notes?: string;
};

export const presets: PresetEntry[] = [
  // --- 紹介札(IntroCard): 家族・友人・犬 ---
  // name/relation/comment/photo/background の5つだけ差し替えて使い回す
  {
    id: 'intro-dog-cookie',
    label: '紹介札-犬-Cookie',
    compositionId: '紹介札',
    description: '犬(Cookie)の紹介カード',
    usage: 'プロフィール/紹介ムービーの家族紹介パート',
    status: 'draft',
    props: {
      name: 'COOKIE',
      relation: 'FAMILY / DOG',
      comment: 'いつも一緒に旅をしてきた大切な家族',
      photo: null,
      background: 'beige',
    },
    notes: 'photoはnullだと上品なプレースホルダー。実写真を入れるときだけ差し替える',
  },
  {
    id: 'intro-dog-melon',
    label: '紹介札-犬-Melon',
    compositionId: '紹介札',
    description: '犬(Melon)の紹介カード',
    usage: '同上。Cookieと並べて使う',
    status: 'draft',
    props: {
      name: 'MELON',
      relation: 'FAMILY / DOG',
      comment: 'にぎやかで、いつも笑わせてくれる',
      photo: null,
      background: 'beige',
    },
  },
  {
    id: 'intro-family',
    label: '紹介札-家族',
    compositionId: '紹介札',
    description: '家族の紹介カード(navy背景で少し格を上げる)',
    usage: '両親・兄弟の紹介',
    status: 'draft',
    props: {
      name: 'FAMILY',
      relation: 'ALWAYS WITH US',
      comment: 'ここまで育ててくれた家族へ',
      photo: null,
      background: 'navy',
    },
    notes: 'name/commentを実際の呼び名に差し替えて使う',
  },
  {
    id: 'intro-friend',
    label: '紹介札-友人',
    compositionId: '紹介札',
    description: '友人の紹介カード',
    usage: 'friendパートの名前札',
    status: 'draft',
    props: {
      name: 'FRIENDS',
      relation: 'SINCE THEN',
      comment: '笑って、ふざけて、支えてくれた人たち',
      photo: null,
      background: 'beige',
    },
  },

  // --- 章題(ChapterTitle): docs/03_movie-structure.md の5章に対応 ---
  {
    id: 'chapter-1-departure',
    label: '章題-1-出発',
    compositionId: '章題',
    description: 'Chapter 1 出発',
    usage: 'プロフィールムービー第1章の頭',
    status: 'draft',
    props: {chapterLabel: 'CHAPTER 1', titleEn: 'Departure', titleJa: '出発', background: 'navy'},
  },
  {
    id: 'chapter-2-each-journey',
    label: '章題-2-それぞれの旅',
    compositionId: '章題',
    description: 'Chapter 2 それぞれの旅',
    usage: '新郎新婦それぞれの歩みへ入る前',
    status: 'draft',
    props: {chapterLabel: 'CHAPTER 2', titleEn: 'Each Journey', titleJa: 'それぞれの旅', background: 'beige'},
  },
  {
    id: 'chapter-3-crossing',
    label: '章題-3-交差',
    compositionId: '章題',
    description: 'Chapter 3 交差(出会い)',
    usage: '2人の道が交わるパート',
    status: 'draft',
    props: {chapterLabel: 'CHAPTER 3', titleEn: 'Crossing', titleJa: '交差', background: 'navy'},
  },
  {
    id: 'chapter-4-adventure',
    label: '章題-4-冒険',
    compositionId: '章題',
    description: 'Chapter 4 冒険(一番明るい章)',
    usage: '旅行・ハワイ・犬の思い出パート',
    status: 'draft',
    props: {chapterLabel: 'CHAPTER 4', titleEn: 'Adventure', titleJa: '冒険', background: 'beige'},
  },
  {
    id: 'chapter-5-arrival',
    label: '章題-5-到着',
    compositionId: '章題',
    description: 'Chapter 5 到着(現在・結婚式へ)',
    usage: '入場へつなぐ最終章',
    status: 'draft',
    props: {chapterLabel: 'CHAPTER 5', titleEn: 'Arrival', titleJa: '到着', background: 'navy'},
  },

  // --- 題字-汎用(GenericTitle): 透過。Opening V1の1番目/9番目に対応 ---
  {
    id: 'title-departure-announce',
    label: '題字-出発アナウンス',
    compositionId: '題字-汎用',
    description: '機内アナウンス風の出発コピー(透過)',
    usage: 'Opening V1 #1 Departure title。搭乗券の上に重ねる',
    status: 'draft',
    props: {
      mainText: 'Ladies and gentlemen,\nour journey is about to begin.',
      subText: 'MEMORY FLIGHT SS1024',
      background: 'transparent',
      mainSize: 64,
      italic: false,
      fadeInFrames: 24,
      fadeOutFrames: 24,
      showCinematicBars: true,
    },
    notes: 'docs/03_movie-structure.md のコピー例に準拠。透過なのでV2以上のトラックへ',
  },
  {
    id: 'title-arrival-announce',
    label: '題字-到着アナウンス',
    compositionId: '題字-汎用',
    description: '到着アナウンス風コピー(透過)',
    usage: '到着章の入り。地図の上に重ねる',
    status: 'draft',
    props: {
      mainText: 'Cabin crew,\nprepare for arrival.',
      subText: '',
      background: 'transparent',
      mainSize: 64,
      italic: false,
      fadeInFrames: 24,
      fadeOutFrames: 24,
      showCinematicBars: true,
    },
  },
  {
    id: 'title-wedding-date',
    label: '題字-日付会場',
    compositionId: '題字-汎用',
    description: '日付と会場の締め(透過)',
    usage: 'Opening V1 #9 Wedding opening title。入場直前の余韻',
    status: 'draft',
    props: {
      mainText: '2026.10.24\nYokohama',
      subText: 'SHOGO & SHIORI',
      background: 'transparent',
      mainSize: 80,
      italic: false,
      fadeInFrames: 30,
      fadeOutFrames: 45,
      showCinematicBars: false,
    },
    notes: '最後は引いて落ち着かせるのでfadeOutを長めにしている',
  },

  // --- 写真一枚(SinglePhoto): 動き対応表の判断を埋め込む ---
  // docs/opening-v1-motion-map.md で hero A=寄る / hero B=引く と決めた。
  // 全部同じ動きにすると単調になる(rec-13の「避ける」)。
  {
    id: 'hero-photo-a',
    label: '写真一枚-ヒーローA-寄る',
    compositionId: '写真一枚',
    description: '2人の写真を寄りで見せる(slow-push-in)',
    usage: 'Opening V1 #6 Couple hero photo A',
    status: 'draft',
    props: {
      photo: null,
      caption: '',
      subCaption: '',
      zoomDirection: 'in',
      background: 'beige',
      cardWidth: 1200,
      cardHeight: 800,
    },
    notes: 'motion対応表: slow-push-in',
  },
  {
    id: 'hero-photo-b',
    label: '写真一枚-ヒーローB-引く',
    compositionId: '写真一枚',
    description: '2人の写真を引きで見せる(slow-pull-out)。締めへ開放する',
    usage: 'Opening V1 #7 Couple hero photo B',
    status: 'draft',
    props: {
      photo: null,
      caption: '',
      subCaption: '',
      zoomDirection: 'out',
      background: 'navy',
      cardWidth: 1200,
      cardHeight: 800,
    },
    notes: 'motion対応表: slow-pull-out。Aと動きを変えて単調さを避ける',
  },
];

export const presetById = (id: string): PresetEntry | undefined =>
  presets.find((p) => p.id === id);

export const presetsByComposition = (compositionId: string): PresetEntry[] =>
  presets.filter((p) => p.compositionId === compositionId);
