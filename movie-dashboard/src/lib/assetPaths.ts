import type { AssetType, PersonCategory, PeriodTag } from "../types/movie";
import { assetTypeLabel, personCategoryLabel, periodTagLabel } from "./labels";

export interface PlacementRule {
  baseFolder: string;
  subfolders: string[];
  description: string;
  gitManaged: boolean;
  gitNote: string;
  namingExamples: string[];
}

const personFolderMap: Record<PersonCategory, string> = {
  groom: "groom",
  bride: "bride",
  both: "couple",
  family: "family",
  friend: "friends",
  other: "other",
};

const periodFolderMap: Record<PeriodTag, string> = {
  childhood: "childhood",
  student: "school",
  adult: "work",
  meeting: "meeting",
  present: "current",
  other: "other",
};

export const placementRules: Record<AssetType, PlacementRule> = {
  own_photo: {
    baseFolder: "/05_photos/",
    subfolders: [
      "profile/groom/childhood/",
      "profile/groom/school/",
      "profile/groom/work/",
      "profile/bride/childhood/",
      "profile/bride/school/",
      "profile/bride/work/",
      "profile/couple/meeting/",
      "profile/couple/travel/",
      "profile/couple/current/",
      "opening/couple/",
      "opening/travel/",
      "opening/venue/",
      "family/",
      "friends/",
    ],
    description: "プロフィール・オープニングムービーの写真、家族・友人写真",
    gitManaged: false,
    gitNote: "実写真本体はGitに入れない。Asset Libraryにはパスだけ登録",
    namingExamples: [
      "photo_001.jpg",
      "groom_childhood_001.jpg",
      "bride_school_001.jpg",
      "couple_hawaii_001.jpg",
    ],
  },
  own_video: {
    baseFolder: "/06_videos/",
    subfolders: [
      "opening/",
      "profile/",
      "couple/",
      "venue/",
      "travel/",
      "raw/",
    ],
    description: "自分たちで撮った動画、会場動画、旅行動画",
    gitManaged: false,
    gitNote: "動画本体はGitに入れない。Asset Libraryにはパスだけ登録",
    namingExamples: [
      "opening_entrance_001.mp4",
      "travel_hawaii_001.mov",
      "venue_lobby_001.mp4",
    ],
  },
  generated_image: {
    baseFolder: "/04_ai-video-assets/generated-images/",
    subfolders: [
      "opening/",
      "profile/",
      "backgrounds/",
      "transitions/",
      "countdown/",
    ],
    description: "AIで作った背景画像、つなぎ素材、カウントダウン背景、旅モチーフ画像",
    gitManaged: false,
    gitNote: "基本はGitに入れない。軽い参照画像だけdocsに置く場合は要判断",
    namingExamples: [
      "opening_yokohama_bg_001.png",
      "opening_countdown_light_001.png",
      "profile_map_transition_001.png",
    ],
  },
  ai_video: {
    baseFolder: "/04_ai-video-assets/ai-videos/",
    subfolders: [
      "opening/",
      "profile/",
      "transitions/",
      "atmosphere/",
      "countdown/",
    ],
    description: "Seedance / Kling / Hailuo / PixVerse / Luma / Runway などで作った動画",
    gitManaged: false,
    gitNote: "動画本体は絶対にGitに入れない。Asset Libraryには保存パスと使用シーンだけ登録",
    namingExamples: [
      "opening_countdown_motion_001.mp4",
      "opening_airport_transition_001.mp4",
      "profile_memory_transition_001.mp4",
    ],
  },
  motion_studio_export: {
    baseFolder: "/90_exports/motion-studio/",
    subfolders: [
      "opening/",
      "profile/",
      "intro/",
    ],
    description: "motion-studioから書き出した動画（テロップ演出、カウントダウン、チケット風アニメーションなど）",
    gitManaged: false,
    gitNote: "書き出し動画本体はGitに入れない。必要なら書き出し設定やメモだけ管理",
    namingExamples: [
      "opening_ticket_intro_001.mp4",
      "opening_countdown_001.mp4",
      "profile_chapter_groom_001.mp4",
    ],
  },
  audio: {
    baseFolder: "/07_music/",
    subfolders: [
      "bgm/",
      "se/",
      "licensed/",
      "candidates/",
    ],
    description: "BGM候補、効果音、ライセンス確認済み音源",
    gitManaged: false,
    gitNote: "音源ファイル本体はGitに入れない。曲名、出典、ライセンスメモだけ管理",
    namingExamples: [
      "opening_bgm_candidate_001.mp3",
      "profile_bgm_final_001.mp3",
      "countdown_se_001.wav",
    ],
  },
  reference: {
    baseFolder: "/10_references/",
    subfolders: [
      "design/",
      "video/",
      "prompt/",
      "capcut/",
      "wedding/",
    ],
    description: "参考動画、デザイン参考、プロンプト参考、結婚式ムービー参考",
    gitManaged: true,
    gitNote: "URLやメモはGit管理OK。著作物ファイル本体は入れない",
    namingExamples: [
      "reference_airport_cm_001.url",
      "design_ticket_mockup_001.png",
      "prompt_ocean_sunset_001.txt",
    ],
  },
  text: {
    baseFolder: "/08_texts/",
    subfolders: [
      "captions/",
      "announcements/",
      "comments/",
    ],
    description: "テロップ原稿、アナウンスコピー、写真コメント",
    gitManaged: true,
    gitNote: "テキストファイルはGit管理OK",
    namingExamples: [
      "opening_captions.md",
      "profile_comments.md",
    ],
  },
  design_asset: {
    baseFolder: "/09_design-assets/",
    subfolders: [
      "logos/",
      "tickets/",
      "stamps/",
      "maps/",
    ],
    description: "デザイン素材（ロゴ、チケット風デザイン、スタンプ、地図）",
    gitManaged: false,
    gitNote: "大きなデザインファイルはGitに入れない。軽いSVGやメモはOK",
    namingExamples: [
      "wedding_logo_001.svg",
      "ticket_template_001.ai",
    ],
  },
};

export const capcutPackRule = {
  baseFolder: "/90_exports/capcut-pack/",
  subfolders: ["opening/", "profile/", "intro/"],
  description: "CapCutに渡す最終素材一式の参照先、Markdown編集指示書、CSV、使用素材一覧",
  gitNote: "MarkdownやCSVはGit管理OK。大きな素材本体はGitに入れない",
};

export function getRecommendedAssetFolder(
  assetType: AssetType,
  movieId?: string,
  person?: PersonCategory,
  period?: PeriodTag,
): string {
  const rule = placementRules[assetType];
  let folder = rule.baseFolder;

  if (assetType === "own_photo") {
    const movieFolder = movieId === "opening" ? "opening/" : "profile/";
    if (movieId === "opening") {
      folder += movieFolder;
      if (person && person !== "other") {
        folder += personFolderMap[person] + "/";
      }
    } else {
      folder += movieFolder;
      if (person) {
        folder += personFolderMap[person] + "/";
        if (period) {
          folder += periodFolderMap[period] + "/";
        }
      }
    }
  } else if (assetType === "generated_image" || assetType === "ai_video" || assetType === "motion_studio_export") {
    if (movieId === "opening") folder += "opening/";
    else if (movieId === "profile") folder += "profile/";
    else if (movieId === "introduction") folder += "intro/";
  } else if (assetType === "own_video") {
    if (movieId === "opening") folder += "opening/";
    else if (movieId === "profile") folder += "profile/";
  }

  return folder;
}

export function getRecommendedAssetPathExample(
  assetType: AssetType,
  title: string,
  movieId?: string,
  person?: PersonCategory,
  period?: PeriodTag,
): string {
  const folder = getRecommendedAssetFolder(assetType, movieId, person, period);
  const slug = title
    ? title.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "").slice(0, 30)
    : "asset";
  const ext = getDefaultExtension(assetType);
  return `${folder}${slug}_001${ext}`;
}

function getDefaultExtension(assetType: AssetType): string {
  switch (assetType) {
    case "own_photo":
    case "generated_image":
      return ".jpg";
    case "own_video":
    case "ai_video":
    case "motion_studio_export":
      return ".mp4";
    case "audio":
      return ".mp3";
    case "reference":
    case "text":
      return ".md";
    case "design_asset":
      return ".svg";
  }
}

export function getAssetPlacementGuide(assetType: AssetType): PlacementRule {
  return placementRules[assetType];
}

export function getPathValidationPrefix(assetType: AssetType): string | null {
  switch (assetType) {
    case "own_photo": return "/05_photos/";
    case "own_video": return "/06_videos/";
    case "generated_image": return "/04_ai-video-assets/generated-images/";
    case "ai_video": return "/04_ai-video-assets/ai-videos/";
    case "motion_studio_export": return "/90_exports/motion-studio/";
    case "audio": return "/07_music/";
    case "reference": return "/10_references/";
    default: return null;
  }
}

export function validateAssetPath(assetType: AssetType, path: string): string | null {
  if (!path) return null;
  const prefix = getPathValidationPrefix(assetType);
  if (!prefix) return null;
  const normalized = path.startsWith("/") ? path : "/" + path;
  if (!normalized.startsWith(prefix)) {
    return `${assetTypeLabel[assetType]}のパスは ${prefix} 配下が推奨です`;
  }
  return null;
}

export function getPhotoSlotFolder(person: PersonCategory, period: PeriodTag): string {
  return `/05_photos/profile/${personFolderMap[person]}/${periodFolderMap[period]}/`;
}

export function getPhotoSlotFolderLabel(person: PersonCategory, period: PeriodTag): string {
  return `${personCategoryLabel[person]}${periodTagLabel[period]}の写真保存先: ${getPhotoSlotFolder(person, period)}`;
}

export const assetLocationSummary = [
  { label: "写真", path: "/05_photos/profile/" },
  { label: "自前動画", path: "/06_videos/" },
  { label: "生成画像", path: "/04_ai-video-assets/generated-images/" },
  { label: "生成AI動画", path: "/04_ai-video-assets/ai-videos/" },
  { label: "Motion Studio書き出し", path: "/90_exports/motion-studio/" },
  { label: "音源・BGM", path: "/07_music/" },
  { label: "参考資料", path: "/10_references/" },
];
