export type JapaneseOpeningSceneKind =
  | 'countdown'
  | 'title'
  | 'profile'
  | 'friends'
  | 'collage'
  | 'message'
  | 'request'
  | 'entrance'
  | 'final';

export type JapaneseOpeningScene = {
  id: string;
  kind: JapaneseOpeningSceneKind;
  durationSeconds: number;
  asset: 'couple-arrival' | 'friends-picnic' | 'bride-friends' | 'groom-friends' | 'venue-entrance';
  kicker: string;
  title: string;
  sub: string;
  accent: string;
};

export const japaneseFriendsOpeningStory = [
  {id: 'ready', kind: 'countdown', durationSeconds: 5, asset: 'venue-entrance', kicker: 'ARE YOU READY?', title: 'LET’S START!', sub: '最高の一日にしよう', accent: '#ffd33d'},
  {id: 'welcome', kind: 'title', durationSeconds: 7, asset: 'couple-arrival', kicker: '2026.10.24 · YOKOHAMA', title: 'HARUTO & AOI', sub: 'WEDDING PARTY', accent: '#ff6b5f'},
  {id: 'groom', kind: 'profile', durationSeconds: 8, asset: 'groom-friends', kicker: 'GROOM / 29', title: 'HARUTO', sub: 'よく笑う、よく食べる、友達が大好き。', accent: '#52d9ff'},
  {id: 'groom-team', kind: 'friends', durationSeconds: 8, asset: 'groom-friends', kicker: 'GROOM TEAM', title: '学生時代からの仲間', sub: '今日も全力で盛り上げてください！', accent: '#ffd33d'},
  {id: 'bride', kind: 'profile', durationSeconds: 8, asset: 'bride-friends', kicker: 'BRIDE / 28', title: 'AOI', sub: 'カフェと旅行と、みんなとのおしゃべりが好き。', accent: '#ff7eae'},
  {id: 'bride-team', kind: 'friends', durationSeconds: 8, asset: 'bride-friends', kicker: 'BRIDE TEAM', title: '笑い声が止まらない', sub: 'いつものメンバー、今日はもっと楽しもう！', accent: '#ff6b5f'},
  {id: 'story', kind: 'collage', durationSeconds: 8, asset: 'couple-arrival', kicker: 'OUR STORY', title: '出会って 5年', sub: 'たくさんの「楽しい」を一緒に重ねてきました。', accent: '#52d9ff'},
  {id: 'all-friends', kind: 'collage', durationSeconds: 10, asset: 'friends-picnic', kicker: 'OUR FAVORITE PEOPLE', title: 'みんながいるから今日がある', sub: '家族も友人も、私たちの大切なチームです。', accent: '#ffd33d'},
  {id: 'thanks', kind: 'message', durationSeconds: 7, asset: 'friends-picnic', kicker: 'THANK YOU FOR COMING', title: '今日は来てくれてありがとう', sub: '短い時間ですが、最後まで一緒に楽しんでください。', accent: '#ff7eae'},
  {id: 'drink', kind: 'request', durationSeconds: 6, asset: 'friends-picnic', kicker: 'TODAY’S RULE 01', title: 'たくさん飲んで', sub: '乾杯は何度でも大歓迎！', accent: '#52d9ff'},
  {id: 'eat', kind: 'request', durationSeconds: 6, asset: 'friends-picnic', kicker: 'TODAY’S RULE 02', title: 'たくさん食べて', sub: 'おいしい料理をゆっくり楽しんでね。', accent: '#ffd33d'},
  {id: 'photo', kind: 'request', durationSeconds: 6, asset: 'bride-friends', kicker: 'TODAY’S RULE 03', title: 'たくさん撮って', sub: '写真も動画も遠慮なく！', accent: '#ff6b5f'},
  {id: 'smile', kind: 'message', durationSeconds: 7, asset: 'groom-friends', kicker: 'MOST IMPORTANT', title: 'たくさん笑って！', sub: '今日いちばんの思い出を一緒につくろう。', accent: '#ff7eae'},
  {id: 'entrance', kind: 'entrance', durationSeconds: 6, asset: 'venue-entrance', kicker: 'PLEASE GET READY', title: 'まもなく入場です', sub: '拍手の準備はできていますか？', accent: '#ffd33d'},
  {id: 'final', kind: 'final', durationSeconds: 5, asset: 'venue-entrance', kicker: 'LET THE PARTY BEGIN', title: '5 · 4 · 3 · 2 · 1', sub: 'HARUTO & AOI', accent: '#ff6b5f'},
] satisfies JapaneseOpeningScene[];

export const japaneseFriendsOpeningDurationFrames = japaneseFriendsOpeningStory.reduce(
  (total, scene) => total + scene.durationSeconds * 30,
  0,
);
