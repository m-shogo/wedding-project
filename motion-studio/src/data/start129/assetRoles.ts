// StaRt 129秒ショーケースで使う「素材の役割」定義。
//
// 実素材(本番写真)・無料ダミー素材どちらも、ファイル名ではなくこのroleで参照する。
// role→実ファイルの解決は demoAssetLibrary.generated.ts (pnpm sync:start-129-local相当) が行う。
// 実ファイルが無いroleは、Remotion内で自動生成する抽象placeholderへ落ちる
// (StartDemoBackdrop.tsx)。無料素材が無い状態でも3案の構成・演出は確認できる。

export type Start129AssetRole =
  | 'HERO_WIDE'
  | 'HERO_CLOSE'
  | 'DEPARTURE'
  | 'OKINAWA_WIDE'
  | 'SEOUL_STREET'
  | 'HAWAII_WARM'
  | 'DETAIL_HAND'
  | 'MOVEMENT_LEFT_TO_RIGHT'
  | 'MOVEMENT_RIGHT_TO_LEFT'
  | 'VERTICAL_PORTRAIT'
  | 'NEGATIVE_SPACE'
  | 'ARRIVAL_YOKOHAMA'
  | 'END_BREATH'
  | 'BROLL_WALK'
  | 'BROLL_TEXTURE';

export type Start129AssetRoleSpec = {
  role: Start129AssetRole;
  labelJa: string;
  kind: 'photo' | 'video';
  aspectHint: '16:9' | '9:16' | '4:5';
  searchQueryHint: string;
  purposeJa: string;
};

export const START_129_ASSET_ROLES: Start129AssetRoleSpec[] = [
  {role: 'HERO_WIDE', labelJa: 'Heroワイド', kind: 'photo', aspectHint: '16:9', searchQueryHint: 'couple silhouette back view travel wide', purposeJa: '二人の代替。余白のある横長Hero(後ろ姿・遠景中心)'},
  {role: 'HERO_CLOSE', labelJa: 'Hero寄り', kind: 'photo', aspectHint: '4:5', searchQueryHint: 'hands holding travel detail', purposeJa: '表情・手元の寄り(本人と誤認させない)'},
  {role: 'DEPARTURE', labelJa: '出発', kind: 'photo', aspectHint: '16:9', searchQueryHint: 'airport window suitcase walking', purposeJa: '空港・駅・スーツケース・歩き出す足元'},
  {role: 'OKINAWA_WIDE', labelJa: '沖縄ワイド', kind: 'photo', aspectHint: '16:9', searchQueryHint: 'okinawa ocean horizon blue sky', purposeJa: '海・水平線・風。match cut可能な水平線'},
  {role: 'SEOUL_STREET', labelJa: 'ソウル街', kind: 'photo', aspectHint: '16:9', searchQueryHint: 'seoul street night city movement', purposeJa: '都市の移動・夜景・横方向の流れ'},
  {role: 'HAWAII_WARM', labelJa: 'ハワイ夕景', kind: 'photo', aspectHint: '16:9', searchQueryHint: 'hawaii sunset beach warm backlight', purposeJa: '夕景・海辺・暖色の逆光'},
  {role: 'DETAIL_HAND', labelJa: 'ディテール', kind: 'photo', aspectHint: '4:5', searchQueryHint: 'ticket map camera detail travel', purposeJa: '手・切符・地図・カメラ等のdetail'},
  {role: 'MOVEMENT_LEFT_TO_RIGHT', labelJa: '左→右移動', kind: 'video', aspectHint: '16:9', searchQueryHint: 'walking left to right platform', purposeJa: '左から右へ進む被写体。方向match用'},
  {role: 'MOVEMENT_RIGHT_TO_LEFT', labelJa: '右→左移動', kind: 'video', aspectHint: '16:9', searchQueryHint: 'walking right to left street', purposeJa: '右から左へ進む被写体。対比・戻り用'},
  {role: 'VERTICAL_PORTRAIT', labelJa: '縦写真', kind: 'photo', aspectHint: '9:16', searchQueryHint: 'travel vertical portrait scenery', purposeJa: '縦写真layout・cropの確認用'},
  {role: 'NEGATIVE_SPACE', labelJa: '余白', kind: 'photo', aspectHint: '16:9', searchQueryHint: 'empty sky negative space minimal', purposeJa: '歌詞・日付を置ける安全な余白'},
  {role: 'ARRIVAL_YOKOHAMA', labelJa: '横浜到着', kind: 'photo', aspectHint: '16:9', searchQueryHint: 'yokohama port city night wide', purposeJa: '港・街・会場到着を連想させるwide'},
  {role: 'END_BREATH', labelJa: '終盤の静止', kind: 'photo', aspectHint: '16:9', searchQueryHint: 'calm horizon still evening', purposeJa: '3秒静止でも成立する最終写真'},
  {role: 'BROLL_WALK', labelJa: 'B-roll歩行', kind: 'video', aspectHint: '16:9', searchQueryHint: 'walking feet path short clip', purposeJa: '3〜5秒の歩行・移動の接続素材'},
  {role: 'BROLL_TEXTURE', labelJa: 'B-roll質感', kind: 'video', aspectHint: '16:9', searchQueryHint: 'water surface light texture short clip', purposeJa: '水面・紙・光と影の短い接続素材'},
];

export const start129AssetRoleSpec = (role: Start129AssetRole): Start129AssetRoleSpec => {
  const spec = START_129_ASSET_ROLES.find((r) => r.role === role);
  if (!spec) {
    throw new Error(`未知のstart-129 asset role: ${role}`);
  }
  return spec;
};
