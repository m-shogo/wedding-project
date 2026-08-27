export type OpeningV1PhotoQaState = "NOT_RUN";

export interface OpeningV1PhotoProductionPlanItem {
  slotKey: string;
  chapter: "OKINAWA" | "SEOUL" | "HAWAII" | "COUPLE_HERO_A" | "COUPLE_HERO_B";
  ordinalInChapter: number;
  placements: Array<{
    startSeconds: number;
    endSeconds: number;
    role: string;
  }>;
  qa: {
    crop: OpeningV1PhotoQaState;
    focus: OpeningV1PhotoQaState;
    color: OpeningV1PhotoQaState;
    motion: OpeningV1PhotoQaState;
  };
}

const notRunQa = () => ({
  crop: "NOT_RUN" as const,
  focus: "NOT_RUN" as const,
  color: "NOT_RUN" as const,
  motion: "NOT_RUN" as const,
});

export const openingV1PhotoProductionPlan: OpeningV1PhotoProductionPlanItem[] = [
  {
    slotKey: "okinawa-01",
    chapter: "OKINAWA",
    ordinalInChapter: 1,
    placements: [{startSeconds: 2, endSeconds: 13, role: "chapter-entry"}],
    qa: notRunQa(),
  },
  {
    slotKey: "okinawa-02",
    chapter: "OKINAWA",
    ordinalInChapter: 2,
    placements: [{startSeconds: 2, endSeconds: 13, role: "chapter-middle"}],
    qa: notRunQa(),
  },
  {
    slotKey: "okinawa-03",
    chapter: "OKINAWA",
    ordinalInChapter: 3,
    placements: [{startSeconds: 2, endSeconds: 13, role: "chapter-exit"}],
    qa: notRunQa(),
  },
  {
    slotKey: "seoul-01",
    chapter: "SEOUL",
    ordinalInChapter: 1,
    placements: [{startSeconds: 13, endSeconds: 24, role: "chapter-entry"}],
    qa: notRunQa(),
  },
  {
    slotKey: "seoul-02",
    chapter: "SEOUL",
    ordinalInChapter: 2,
    placements: [{startSeconds: 13, endSeconds: 24, role: "chapter-middle"}],
    qa: notRunQa(),
  },
  {
    slotKey: "seoul-03",
    chapter: "SEOUL",
    ordinalInChapter: 3,
    placements: [{startSeconds: 13, endSeconds: 24, role: "chapter-exit"}],
    qa: notRunQa(),
  },
  {
    slotKey: "hawaii-01",
    chapter: "HAWAII",
    ordinalInChapter: 1,
    placements: [{startSeconds: 24, endSeconds: 35, role: "chapter-entry"}],
    qa: notRunQa(),
  },
  {
    slotKey: "hawaii-02",
    chapter: "HAWAII",
    ordinalInChapter: 2,
    placements: [{startSeconds: 24, endSeconds: 35, role: "chapter-emotional-peak"}],
    qa: notRunQa(),
  },
  {
    slotKey: "hawaii-03",
    chapter: "HAWAII",
    ordinalInChapter: 3,
    placements: [{startSeconds: 24, endSeconds: 35, role: "chapter-exit"}],
    qa: notRunQa(),
  },
  {
    slotKey: "hero-01",
    chapter: "COUPLE_HERO_A",
    ordinalInChapter: 1,
    placements: [
      {startSeconds: 0, endSeconds: 2, role: "cold-open"},
      {startSeconds: 35, endSeconds: 44, role: "hero-a"},
    ],
    qa: notRunQa(),
  },
  {
    slotKey: "hero-02",
    chapter: "COUPLE_HERO_B",
    ordinalInChapter: 1,
    placements: [{startSeconds: 44, endSeconds: 53, role: "hero-b"}],
    qa: notRunQa(),
  },
];

export function openingV1PhotoPlanForSlot(slotKey: string) {
  return openingV1PhotoProductionPlan.find((item) => item.slotKey === slotKey) ?? null;
}
