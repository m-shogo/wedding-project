// 写真カード用データ。photosはpublic/photos/配下の相対パス。
// nullのままだと上品なプレースホルダーカードが表示される。
// 実写真を入れたら 'opening/okinawa-01.jpg' のように差し替える。

export type Memory = {
  id: string;
  label: string;
  title: string;
  photos: [string | null, string | null, string | null];
};

export const memories: Record<string, Memory> = {
  okinawa: {
    id: 'okinawa',
    label: 'MEMORY 01',
    title: 'Okinawa',
    photos: [null, null, null],
  },
  korea: {
    id: 'korea',
    label: 'MEMORY 02',
    title: 'Seoul',
    photos: [null, null, null],
  },
  hawaii: {
    id: 'hawaii',
    label: 'MEMORY 03',
    title: 'Hawaii',
    photos: [null, null, null],
  },
};
