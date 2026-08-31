export type DemoStockPhotoRole = "WEDDING_COUPLE" | "WEDDING_DETAILS" | "FAMILY_EVENT";
export type DemoBgmGenre = "CINEMATIC" | "ACOUSTIC" | "UPBEAT" | "AMBIENT";

interface DemoStockSource {
  provider: "Pexels" | "Pixabay";
  pageUrl: string;
  creator: string;
  licenseUrl: string;
}

export interface DemoStockPhoto {
  id: string;
  authority: "DEMO_ONLY_NOT_USER_MEDIA";
  role: DemoStockPhotoRole;
  title: string;
  localPath: string;
  sha256: string;
  source: DemoStockSource;
}

export interface DemoBgmCandidate {
  id: string;
  authority: "BGM_CANDIDATE";
  genre: DemoBgmGenre;
  title: string;
  localPath: string;
  durationSeconds: number;
  sha256: string;
  contentIdRegistered: true;
  selectionStatus: "CANDIDATE";
  finalPublicationApproved: false;
  source: DemoStockSource;
}

export interface DemoStockRender {
  id: string;
  authority: "DEMO_RENDER_ONLY";
  genre: DemoBgmGenre;
  title: string;
  localPath: string;
  durationSeconds: 20;
  width: 1280;
  height: 720;
  fps: 30;
  finalPublicationApproved: false;
}

export interface DummyProductionRender {
  id: string;
  authority: "DUMMY_PRODUCTION_SIMULATION";
  title: string;
  localPath: string;
  manifestPath: string;
  durationSeconds: 60;
  width: 1920;
  height: 1080;
  fps: 30;
  canonicalPhotoSlots: 11;
  bgmStatus: "DUMMY_CANDIDATE";
  finalPublicationApproved: false;
}

export interface JapaneseFriendsOpeningRender {
  id: "japanese-friends-opening-demo-v1";
  authority: "FICTIONAL_CAST_DEMO";
  title: string;
  localPath: string;
  manifestPath: string;
  durationSeconds: 105;
  width: 1920;
  height: 1080;
  fps: 30;
  fictionalCast: true;
  finalPublicationApproved: false;
}

export interface JapaneseFriendsOpeningStartSyncRender {
  id: "japanese-friends-opening-start-sync-v1";
  authority: "PRIVATE_START_SYNC_DEMO";
  title: string;
  localPath: string;
  manifestPath: string;
  durationSeconds: 145.6;
  width: 1920;
  height: 1080;
  fps: 30;
  bpm: 187.5;
  lyricsIncluded: true;
  rightsCleared: false;
  finalPublicationApproved: false;
}

export interface DemoStockMediaPack {
  schemaVersion: "motion-zukan-demo-stock-pack/v1";
  authority: "DEMO_ONLY_NOT_PRODUCTION";
  notice: string;
  photos: DemoStockPhoto[];
  bgmCandidate: DemoBgmCandidate;
  guards: {
    userMediaApproved: false;
    finalPublicationApproved: false;
    requiresPhotoReplacement: true;
    requiresBgmRightsReview: true;
  };
}

export const MOTION_ZUKAN_DEMO_STOCK_PACK_APPLY_EVENT = "motion-zukan-demo-stock-pack-apply";

export const demoStockMediaCatalog = {
  schemaVersion: "demo-stock-media/v1",
  fetchedAt: "2026-08-27T03:56:56Z",
  notice: "画面・モーション検証専用の第三者ストック素材。本人・家族の実素材として扱わず、最終納品前に必ず差し替える。",
  photos: [
    { id: "pexels-17630524", authority: "DEMO_ONLY_NOT_USER_MEDIA", role: "WEDDING_COUPLE", title: "Waterfront wedding couple", localPath: "/demo-assets/stock-photos/pexels-17630524-1280x720.jpg", sha256: "9e842a64c6df0a1e3f62f15bef827eb3a270491d830c2dec75743ae4e9a95943", source: { provider: "Pexels", pageUrl: "https://www.pexels.com/photo/bride-and-groom-walking-down-the-steps-to-the-waterfront-17630524/", creator: "Tahir Osman", licenseUrl: "https://www.pexels.com/legal-pages/license/" } },
    { id: "pexels-18858568", authority: "DEMO_ONLY_NOT_USER_MEDIA", role: "WEDDING_COUPLE", title: "Wedding couple on a beach", localPath: "/demo-assets/stock-photos/pexels-18858568-1280x720.jpg", sha256: "27785614a5378ce3851fff951a4c4a300d64014208bd52645086a4a5371f39b9", source: { provider: "Pexels", pageUrl: "https://www.pexels.com/photo/wedding-couple-walking-on-a-beach-18858568/", creator: "Marcus Queiroga Silva", licenseUrl: "https://www.pexels.com/legal-pages/license/" } },
    { id: "pexels-27687897", authority: "DEMO_ONLY_NOT_USER_MEDIA", role: "WEDDING_DETAILS", title: "Wedding rings and details", localPath: "/demo-assets/stock-photos/pexels-27687897-1280x720.jpg", sha256: "d5d65a1abff9a43b9b16bc2ba4e3494b9f67bf2e59d3d269cfeaad6e1cdfc331", source: { provider: "Pexels", pageUrl: "https://www.pexels.com/photo/wedding-rings-and-other-items-on-a-table-27687897/", creator: "Anastasia Nagibina", licenseUrl: "https://www.pexels.com/legal-pages/license/" } },
    { id: "pexels-27954353", authority: "DEMO_ONLY_NOT_USER_MEDIA", role: "FAMILY_EVENT", title: "Family at sunset", localPath: "/demo-assets/stock-photos/pexels-27954353-1280x720.jpg", sha256: "fc4a1dbf8304300f06d544b2cb6d99d60d6632bf3060f782ad8f913c6f583483", source: { provider: "Pexels", pageUrl: "https://www.pexels.com/photo/family-photo-at-sunset-27954353/", creator: "Seljan Salimova", licenseUrl: "https://www.pexels.com/legal-pages/license/" } },
    { id: "pexels-30219174", authority: "DEMO_ONLY_NOT_USER_MEDIA", role: "FAMILY_EVENT", title: "Outdoor family gathering", localPath: "/demo-assets/stock-photos/pexels-30219174-1280x720.jpg", sha256: "ce8a35d7cef639768bbbb986ad5eab9aa5eebb2f158b9e25b3e72230213ee37d", source: { provider: "Pexels", pageUrl: "https://www.pexels.com/photo/lively-outdoor-african-family-gathering-30219174/", creator: "Mad Knoxx Deluxe", licenseUrl: "https://www.pexels.com/legal-pages/license/" } },
    { id: "pexels-33029121", authority: "DEMO_ONLY_NOT_USER_MEDIA", role: "FAMILY_EVENT", title: "Outdoor festival gathering", localPath: "/demo-assets/stock-photos/pexels-33029121-1280x720.jpg", sha256: "7c6269f640f56c2aff969c210f78e32cfe90496c6a93e15748c9c197593c7730", source: { provider: "Pexels", pageUrl: "https://www.pexels.com/photo/joyful-family-gathering-at-outdoor-festival-33029121/", creator: "Tahir Xəlfəquliyev", licenseUrl: "https://www.pexels.com/legal-pages/license/" } },
    { id: "pexels-33741754", authority: "DEMO_ONLY_NOT_USER_MEDIA", role: "WEDDING_DETAILS", title: "Bouquet and rings", localPath: "/demo-assets/stock-photos/pexels-33741754-1280x720.jpg", sha256: "892dee588bc8699f4e3869a237806133f172bf5e4dd23778a202eb1941f18639", source: { provider: "Pexels", pageUrl: "https://www.pexels.com/photo/elegant-wedding-bouquet-and-rings-on-wooden-table-33741754/", creator: "viresh studio", licenseUrl: "https://www.pexels.com/legal-pages/license/" } },
    { id: "pexels-35511825", authority: "DEMO_ONLY_NOT_USER_MEDIA", role: "FAMILY_EVENT", title: "Formal outdoor family", localPath: "/demo-assets/stock-photos/pexels-35511825-1280x720.jpg", sha256: "1b82866b9af0c181564a152495e0bae19a1b4b4b778d019b4e60d59605f27ff8", source: { provider: "Pexels", pageUrl: "https://www.pexels.com/photo/large-family-celebrating-outdoors-in-formal-attire-35511825/", creator: "jose jimenez", licenseUrl: "https://www.pexels.com/legal-pages/license/" } },
    { id: "pexels-36708862", authority: "DEMO_ONLY_NOT_USER_MEDIA", role: "FAMILY_EVENT", title: "Evening family celebration", localPath: "/demo-assets/stock-photos/pexels-36708862-1280x720.jpg", sha256: "efd57449103cdd7a9be65f9b937c9315e1d9195bcee2b6293b807f853d911b5f", source: { provider: "Pexels", pageUrl: "https://www.pexels.com/photo/family-celebrating-at-an-outdoor-evening-event-36708862/", creator: "Gabriel Tovar", licenseUrl: "https://www.pexels.com/legal-pages/license/" } },
    { id: "pexels-36807071", authority: "DEMO_ONLY_NOT_USER_MEDIA", role: "WEDDING_DETAILS", title: "Rings and floral arrangement", localPath: "/demo-assets/stock-photos/pexels-36807071-1280x720.jpg", sha256: "2b5940cabbe823827cb298e73e6e4224bc707b756e4efe248e1497c4fc1a8636", source: { provider: "Pexels", pageUrl: "https://www.pexels.com/photo/elegant-wedding-rings-and-floral-arrangement-36807071/", creator: "Wolf Art", licenseUrl: "https://www.pexels.com/legal-pages/license/" } },
    { id: "pexels-4180047", authority: "DEMO_ONLY_NOT_USER_MEDIA", role: "WEDDING_DETAILS", title: "Wedding rings on white table", localPath: "/demo-assets/stock-photos/pexels-4180047-1280x720.jpg", sha256: "516ac2aad1801f705a20f5e1fa43e80d57c48ad9aa54e754ef9ddbda2cf5ba53", source: { provider: "Pexels", pageUrl: "https://www.pexels.com/photo/wedding-rings-on-white-table-4180047/", creator: "Darya Sannikova", licenseUrl: "https://www.pexels.com/legal-pages/license/" } },
  ] satisfies DemoStockPhoto[],
  bgmCandidates: [
    { id: "pixabay-cinematic-wedding-223110", authority: "BGM_CANDIDATE", genre: "CINEMATIC", title: "Cinematic Wedding", localPath: "/demo-assets/bgm-candidates/pixabay-cinematic-wedding-223110.mp3", durationSeconds: 144.039156, sha256: "10dccc08254869fa33faacd304c7398b06e2351448129530a87a4254988c836b", contentIdRegistered: true, selectionStatus: "CANDIDATE", finalPublicationApproved: false, source: { provider: "Pixabay", pageUrl: "https://pixabay.com/music/build-up-scenes-cinematic-wedding-223110/", creator: "Alex_MakeMusic", licenseUrl: "https://pixabay.com/service/license-summary/" } },
    { id: "pixabay-acoustic-wedding-guitar-359697", authority: "BGM_CANDIDATE", genre: "ACOUSTIC", title: "Acoustic Wedding Guitar", localPath: "/demo-assets/bgm-candidates/pixabay-acoustic-wedding-guitar-359697.mp3", durationSeconds: 133.694688, sha256: "64b09c41d219e371cd850a7874d41f6aec101451eb331e33654c3f3580421723", contentIdRegistered: true, selectionStatus: "CANDIDATE", finalPublicationApproved: false, source: { provider: "Pixabay", pageUrl: "https://pixabay.com/music/wedding-acoustic-wedding-guitar-359697/", creator: "Dredstudio", licenseUrl: "https://pixabay.com/service/license-summary/" } },
    { id: "pixabay-simple-upbeat-158080", authority: "BGM_CANDIDATE", genre: "UPBEAT", title: "Simple Upbeat", localPath: "/demo-assets/bgm-candidates/pixabay-simple-upbeat-158080.mp3", durationSeconds: 106.527344, sha256: "be7ff0127db7b57b5ff799c2d641ffccd5700d17bd1ac29db7256a416ce77467", contentIdRegistered: true, selectionStatus: "CANDIDATE", finalPublicationApproved: false, source: { provider: "Pixabay", pageUrl: "https://pixabay.com/music/wedding-simple-upbeat-158080/", creator: "The_Mountain", licenseUrl: "https://pixabay.com/service/license-summary/" } },
    { id: "pixabay-ambient-piano-347950", authority: "BGM_CANDIDATE", genre: "AMBIENT", title: "Ambient Piano Relaxing Music", localPath: "/demo-assets/bgm-candidates/pixabay-ambient-piano-347950.mp3", durationSeconds: 84.21875, sha256: "600bbd1404468e4c2f39f9d05e21640010e51e7748439b600e557871ca75efa2", contentIdRegistered: true, selectionStatus: "CANDIDATE", finalPublicationApproved: false, source: { provider: "Pixabay", pageUrl: "https://pixabay.com/music/ambient-ambient-piano-relaxing-music-347950/", creator: "Tunetank", licenseUrl: "https://pixabay.com/service/license-summary/" } },
  ] satisfies DemoBgmCandidate[],
  renders: [
    { id: "motion-zukan-cinematic-v1", authority: "DEMO_RENDER_ONLY", genre: "CINEMATIC", title: "A Story Begins", localPath: "/demo-renders/motion-zukan-cinematic-v1.mp4", durationSeconds: 20, width: 1280, height: 720, fps: 30, finalPublicationApproved: false },
    { id: "motion-zukan-acoustic-v1", authority: "DEMO_RENDER_ONLY", genre: "ACOUSTIC", title: "Together, Always", localPath: "/demo-renders/motion-zukan-acoustic-v1.mp4", durationSeconds: 20, width: 1280, height: 720, fps: 30, finalPublicationApproved: false },
    { id: "motion-zukan-upbeat-v1", authority: "DEMO_RENDER_ONLY", genre: "UPBEAT", title: "Our Best Day", localPath: "/demo-renders/motion-zukan-upbeat-v1.mp4", durationSeconds: 20, width: 1280, height: 720, fps: 30, finalPublicationApproved: false },
    { id: "motion-zukan-ambient-v1", authority: "DEMO_RENDER_ONLY", genre: "AMBIENT", title: "A Quiet Promise", localPath: "/demo-renders/motion-zukan-ambient-v1.mp4", durationSeconds: 20, width: 1280, height: 720, fps: 30, finalPublicationApproved: false },
  ] satisfies DemoStockRender[],
  productionSimulation: {
    id: "opening-v1-dummy-production",
    authority: "DUMMY_PRODUCTION_SIMULATION",
    title: "Opening V1 — 60秒ダミー本番版",
    localPath: "/demo-renders/opening-v1-dummy-production.mp4",
    manifestPath: "/demo-renders/opening-v1-dummy-production.manifest.json",
    durationSeconds: 60,
    width: 1920,
    height: 1080,
    fps: 30,
    canonicalPhotoSlots: 11,
    bgmStatus: "DUMMY_CANDIDATE",
    finalPublicationApproved: false,
  } satisfies DummyProductionRender,
  japaneseFriendsOpening: {
    id: "japanese-friends-opening-demo-v1",
    authority: "FICTIONAL_CAST_DEMO",
    title: "日本の王道・友人と盛り上がる105秒OP",
    localPath: "/demo-renders/japanese-friends-opening-demo-v1.mp4",
    manifestPath: "/demo-renders/japanese-friends-opening-demo-v1.manifest.json",
    durationSeconds: 105,
    width: 1920,
    height: 1080,
    fps: 30,
    fictionalCast: true,
    finalPublicationApproved: false,
  } satisfies JapaneseFriendsOpeningRender,
  japaneseFriendsOpeningStartSync: {
    id: "japanese-friends-opening-start-sync-v1",
    authority: "PRIVATE_START_SYNC_DEMO",
    title: "Mrs. GREEN APPLE『StaRt』歌詞・ビート同期OP",
    localPath: "/demo-renders/japanese-friends-opening-start-sync-v1.mp4",
    manifestPath: "/demo-renders/japanese-friends-opening-start-sync-v1.manifest.json",
    durationSeconds: 145.6,
    width: 1920,
    height: 1080,
    fps: 30,
    bpm: 187.5,
    lyricsIncluded: true,
    rightsCleared: false,
    finalPublicationApproved: false,
  } satisfies JapaneseFriendsOpeningStartSyncRender,
} as const;

export function buildDemoStockMediaPack(genre: DemoBgmGenre): DemoStockMediaPack {
  const bgmCandidate = demoStockMediaCatalog.bgmCandidates.find((candidate) => candidate.genre === genre);
  if (!bgmCandidate) throw new Error(`Demo BGM candidate not found: ${genre}`);

  return {
    schemaVersion: "motion-zukan-demo-stock-pack/v1",
    authority: "DEMO_ONLY_NOT_PRODUCTION",
    notice: demoStockMediaCatalog.notice,
    photos: demoStockMediaCatalog.photos.map((photo) => ({ ...photo, source: { ...photo.source } })),
    bgmCandidate: { ...bgmCandidate, source: { ...bgmCandidate.source } },
    guards: {
      userMediaApproved: false,
      finalPublicationApproved: false,
      requiresPhotoReplacement: true,
      requiresBgmRightsReview: true,
    },
  };
}
