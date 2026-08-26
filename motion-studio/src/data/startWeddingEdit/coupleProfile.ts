// 冒頭ウェルカム/新郎新婦紹介で使うプロフィール情報の型。
//
// 実データはlocal/couple-profile.local.json(Git管理外)に置く。
// 性格・趣味・経歴を勝手に創作しない: nameやoneLineが空文字の場合、
// IntroNarrative側は「未入力」として扱い、名前を推測で埋めない。

export type PersonProfile = {
  name: string;
  label: string;
  oneLine: string;
  photoRole: string;
};

export type CoupleProfile = {
  groom: PersonProfile;
  bride: PersonProfile;
  couple: {photoRole: string};
  welcomeLines: string[];
  taglineLines: string[];
  /** 紹介blockを表示するかどうか。名前が未入力のまま本番表示しないための
   * 明示スイッチ(Dashboardから切り替える)。 */
  showIntroduction: boolean;
};

export const EMPTY_COUPLE_PROFILE: CoupleProfile = {
  groom: {name: '', label: '新郎', oneLine: '', photoRole: 'GROOM_PROFILE'},
  bride: {name: 'SHIORI', label: '新婦', oneLine: '', photoRole: 'BRIDE_PROFILE'},
  couple: {photoRole: 'COUPLE_HERO'},
  welcomeLines: ['ようこそ'],
  taglineLines: ['今日はふたりのはじまりを', '一緒に楽しんでいってください'],
  showIntroduction: false,
};

export const parseCoupleProfile = (raw: unknown): {ok: true; data: CoupleProfile} | {ok: false; error: string} => {
  if (typeof raw !== 'object' || raw === null) return {ok: false, error: 'ルートがobjectでない'};
  const r = raw as Record<string, unknown>;
  const person = (key: string, fallback: PersonProfile): PersonProfile | null => {
    const v = r[key];
    if (typeof v !== 'object' || v === null) return null;
    const o = v as Record<string, unknown>;
    return {
      name: typeof o.name === 'string' ? o.name : fallback.name,
      label: typeof o.label === 'string' ? o.label : fallback.label,
      oneLine: typeof o.oneLine === 'string' ? o.oneLine : fallback.oneLine,
      photoRole: typeof o.photoRole === 'string' ? o.photoRole : fallback.photoRole,
    };
  };
  const groom = person('groom', EMPTY_COUPLE_PROFILE.groom);
  const bride = person('bride', EMPTY_COUPLE_PROFILE.bride);
  if (!groom || !bride) return {ok: false, error: 'groom/brideの形式が不正'};
  const couple = r.couple as {photoRole?: unknown} | undefined;
  return {
    ok: true,
    data: {
      groom,
      bride,
      couple: {photoRole: typeof couple?.photoRole === 'string' ? couple.photoRole : EMPTY_COUPLE_PROFILE.couple.photoRole},
      welcomeLines: Array.isArray(r.welcomeLines) ? (r.welcomeLines as string[]) : EMPTY_COUPLE_PROFILE.welcomeLines,
      taglineLines: Array.isArray(r.taglineLines) ? (r.taglineLines as string[]) : EMPTY_COUPLE_PROFILE.taglineLines,
      showIntroduction: typeof r.showIntroduction === 'boolean' ? r.showIntroduction : EMPTY_COUPLE_PROFILE.showIntroduction,
    },
  };
};
