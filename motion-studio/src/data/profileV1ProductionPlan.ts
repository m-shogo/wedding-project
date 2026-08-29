export type ProfileV1ChapterId =
  | 'departure'
  | 'separate-journeys'
  | 'intersection'
  | 'adventure'
  | 'arrival';

export type ProfileV1MediaKind = 'photo' | 'video' | 'photo-or-video' | 'graphic';

export type ProfileV1MediaSlot = {
  id: string;
  chapterId: ProfileV1ChapterId;
  label: string;
  kind: ProfileV1MediaKind;
  required: boolean;
  canonicalStem: string;
  note: string;
};

export type ProfileV1Chapter = {
  id: ProfileV1ChapterId;
  order: number;
  title: string;
  role: string;
  editIntent: string[];
  mediaSlots: ProfileV1MediaSlot[];
};

const slot = (
  chapterId: ProfileV1ChapterId,
  id: string,
  label: string,
  kind: ProfileV1MediaKind,
  canonicalStem: string,
  note: string,
  required = true,
): ProfileV1MediaSlot => ({id, chapterId, label, kind, canonicalStem, note, required});

export const profileV1Chapters: readonly ProfileV1Chapter[] = [
  {
    id: 'departure',
    order: 1,
    title: '出発',
    role: '旅行テーマの世界観を提示してプロフィール本編へ出発する。',
    editIntent: ['10秒試作から成立確認', 'BGMと短いテロップを合わせる', 'AI背景は仮素材に限定可能'],
    mediaSlots: [
      slot('departure', 'departure-airport', '空港', 'photo-or-video', 'departure-airport', '空港・出発ロビー等。'),
      slot('departure', 'departure-runway', '滑走路', 'photo-or-video', 'departure-runway', '離陸前後の滑走路。'),
      slot('departure', 'departure-window-clouds', '飛行機窓・雲', 'photo-or-video', 'departure-window-clouds', '飛行機窓または雲。'),
      slot('departure', 'departure-boarding-title', '搭乗券風テロップ', 'graphic', 'departure-boarding-title', 'Motion Studio側で生成可能な固定グラフィック。', false),
    ],
  },
  {
    id: 'separate-journeys',
    order: 2,
    title: 'それぞれの旅',
    role: '新郎新婦それぞれの幼少期から学生・友人期までの歩みを見せる。',
    editIntent: ['写真中心', 'ゆっくりズーム', 'テロップは短く'],
    mediaSlots: [
      slot('separate-journeys', 'groom-childhood', '新郎 幼少期・家族', 'photo', 'groom-childhood', '幼少期または家族との代表写真。'),
      slot('separate-journeys', 'groom-school-friends', '新郎 学生・友人', 'photo', 'groom-school-friends', '学生時代または友人との代表写真。'),
      slot('separate-journeys', 'bride-childhood', '新婦 幼少期・家族', 'photo', 'bride-childhood', '幼少期または家族との代表写真。'),
      slot('separate-journeys', 'bride-school-friends', '新婦 学生・友人', 'photo', 'bride-school-friends', '学生時代または友人との代表写真。'),
    ],
  },
  {
    id: 'intersection',
    order: 3,
    title: '交差',
    role: '出会い・交際・同棲を、二人の写真と航路表現でつなぐ。',
    editIntent: ['写真の感情を優先', '地図や航路で章切り替え'],
    mediaSlots: [
      slot('intersection', 'couple-early', '出会い・交際初期', 'photo', 'couple-early', '二人の初期を代表する写真。'),
      slot('intersection', 'couple-daily', '日常・同棲', 'photo', 'couple-daily', '日常や同棲を表す写真。'),
      slot('intersection', 'couple-trip', '二人の旅行', 'photo', 'couple-trip', '旅行の代表写真。'),
      slot('intersection', 'intersection-route', '地図・航路', 'graphic', 'intersection-route', 'Motion Zukan route-line等で生成可能。', false),
    ],
  },
  {
    id: 'adventure',
    order: 4,
    title: '冒険',
    role: '旅行・犬・楽しい思い出を明るくテンポ良く見せる。',
    editIntent: ['前章より少しテンポを上げる', '笑いと明るさを入れる'],
    mediaSlots: [
      slot('adventure', 'adventure-hawaii', 'ハワイ', 'photo', 'adventure-hawaii', 'ハワイの代表写真。'),
      slot('adventure', 'adventure-trip', '旅行', 'photo', 'adventure-trip', 'ハワイ以外も含む旅行の代表写真。'),
      slot('adventure', 'adventure-dog', '犬との思い出', 'photo', 'adventure-dog', '実在の犬の実写真。AI置換しない。'),
      slot('adventure', 'adventure-fun', '楽しい思い出', 'photo', 'adventure-fun', '笑顔や出来事が伝わる代表写真。'),
    ],
  },
  {
    id: 'arrival',
    order: 5,
    title: '到着',
    role: '現在・入籍・結婚式から披露宴入場へつなぐ。',
    editIntent: ['現在の二人を主役にする', '横浜・会場へ接続', '光や到着の演出で締める'],
    mediaSlots: [
      slot('arrival', 'arrival-current-couple', '現在の二人', 'photo', 'arrival-current-couple', '現在の二人を代表する写真。'),
      slot('arrival', 'arrival-registration', '入籍', 'photo', 'arrival-registration', '入籍に関する実写真。'),
      slot('arrival', 'arrival-yokohama', '横浜・会場', 'photo-or-video', 'arrival-yokohama', '横浜または会場へ接続する素材。'),
      slot('arrival', 'arrival-door-light', '光・到着・扉', 'graphic', 'arrival-door-light', 'Motion Studioで生成可能な演出。', false),
    ],
  },
] as const;

export const profileV1RequiredMediaSlots = profileV1Chapters.flatMap((chapter) =>
  chapter.mediaSlots.filter((mediaSlot) => mediaSlot.required),
);

export const profileV1OptionalGeneratedSlots = profileV1Chapters.flatMap((chapter) =>
  chapter.mediaSlots.filter((mediaSlot) => !mediaSlot.required),
);

export const profileV1ProductionContract = {
  schemaVersion: 'profile-v1-production-plan/v1',
  sourceAuthority: '01_profile-movie/chapter-plan.md',
  chapterCount: 5,
  bgmAssetId: 'profile-bgm-main',
  mediaDirectory: 'public/profile',
  finalRenderEligibility: 'ALL_REQUIRED_MEDIA_AND_CLEARED_BGM',
  humanQaState: 'NOT_RUN',
  macDaVinciActualState: 'NOT_RUN',
  productionReady: false,
} as const;
