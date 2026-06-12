// 再利用パーツ(src/components/parts/)のメタデータ単一情報源。
// パーツを追加したらここに登録し、確認用Composition(文字部品-確認)と
// pnpm check:parts も更新する。
//
// remotion/Reactには依存しない純粋データ(check-parts.mtsがNodeで直接importする)。

export type PartCategory = 'text' | 'photo' | 'layout' | 'effect';
export type PartStatus = 'draft' | 'approved' | 'deprecated';
export type PartScope = 'opening' | 'profile' | 'ending' | 'common';

export type PartEntry = {
  // 英小文字・数字・ハイフンのみ
  id: string;
  category: PartCategory;
  // 実装コンポーネント名
  name: string;
  description: string;
  usage: string;
  // draft=試作 / approved=人間承認済み / deprecated=非推奨。
  // AIが勝手にapprovedへ昇格させない。
  status: PartStatus;
  // どのムービーで使ってよいか
  allowedIn: PartScope[];
  notes?: string;
};

export const parts: PartEntry[] = [
  {
    id: 'text-fade-up-caption',
    category: 'text',
    name: 'FadeUpCaption',
    description: 'フェードしながら少し下から上に出る短文キャプション',
    usage: '写真下の短文・場面説明・さりげない字幕',
    status: 'draft',
    allowedIn: ['opening', 'profile', 'ending', 'common'],
  },
  {
    id: 'text-mask-reveal-title',
    category: 'text',
    name: 'MaskRevealTitle',
    description: 'マスクで静かに表示する見出し。subtitleは遅れて出る',
    usage: '章タイトル・場所名・MEMORY 01 などの見出し',
    status: 'draft',
    allowedIn: ['opening', 'profile', 'ending'],
  },
  {
    id: 'text-elegant-lower-third',
    category: 'text',
    name: 'ElegantLowerThird',
    description: '下部1/3に出る人物・家族・犬の名前札',
    usage: '人物紹介・家族紹介・犬紹介・プロフィール名前札',
    status: 'draft',
    allowedIn: ['profile', 'opening', 'ending'],
  },
];

export const partById = (id: string): PartEntry | undefined =>
  parts.find((p) => p.id === id);
