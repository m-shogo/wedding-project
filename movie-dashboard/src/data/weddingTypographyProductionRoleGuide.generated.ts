// GENERATED CONTRACT SURFACE.
// Source authority: motion-studio/src/data/weddingProductionTypographyElements.ts
// Keep this file synchronized via the cross-surface verifier; do not promote GUI Actual here.

export type WeddingTypographyRoleGuideItem = {
  movieId: "opening" | "profile";
  role: "TITLE_REVEAL" | "NAME_REVEAL" | "BEAT_ACCENT" | "SECTION_DIVIDER" | "DATE_OR_PLACE" | "EMOTIONAL_LINE";
  primaryPatternId: string;
  fallbackPatternIds: readonly string[];
  reason: string;
  remotionStudioActual: "NOT_RUN";
  davinciResolveActual: "NOT_RUN";
};

export const weddingTypographyProductionRoleGuide: readonly WeddingTypographyRoleGuideItem[] = [
  {
    movieId: "opening",
    role: "TITLE_REVEAL",
    primaryPatternId: "type-mask-reveal",
    fallbackPatternIds: ["type-outline-fill", "type-vertical-wipe"],
    reason: "Travel-opening title needs a clean editorial reveal before the first route/photo beat.",
    remotionStudioActual: "NOT_RUN",
    davinciResolveActual: "NOT_RUN",
  },
  {
    movieId: "opening",
    role: "BEAT_ACCENT",
    primaryPatternId: "type-type-on-rhythm",
    fallbackPatternIds: ["type-word-punch", "type-baseline-hop"],
    reason: "Beat-led accents should follow music timing without introducing a second animation engine.",
    remotionStudioActual: "NOT_RUN",
    davinciResolveActual: "NOT_RUN",
  },
  {
    movieId: "opening",
    role: "DATE_OR_PLACE",
    primaryPatternId: "type-tracking-burst",
    fallbackPatternIds: ["type-triplet"],
    reason: "Short destination/date labels benefit from compact motion that does not overpower photos.",
    remotionStudioActual: "NOT_RUN",
    davinciResolveActual: "NOT_RUN",
  },
  {
    movieId: "profile",
    role: "NAME_REVEAL",
    primaryPatternId: "type-char-stagger",
    fallbackPatternIds: ["type-mask-reveal", "type-outline-fill"],
    reason: "Name cards need readable character-level entrance with restrained production energy.",
    remotionStudioActual: "NOT_RUN",
    davinciResolveActual: "NOT_RUN",
  },
  {
    movieId: "profile",
    role: "SECTION_DIVIDER",
    primaryPatternId: "type-vertical-wipe",
    fallbackPatternIds: ["type-tracking-burst", "type-triplet"],
    reason: "Life-stage section changes need a directional but short transition between photo groups.",
    remotionStudioActual: "NOT_RUN",
    davinciResolveActual: "NOT_RUN",
  },
  {
    movieId: "profile",
    role: "EMOTIONAL_LINE",
    primaryPatternId: "type-outline-fill",
    fallbackPatternIds: ["type-baseline-hop", "type-word-punch"],
    reason: "Emotional copy should remain legible first, with a subtle finish suitable for wedding delivery.",
    remotionStudioActual: "NOT_RUN",
    davinciResolveActual: "NOT_RUN",
  },
] as const;

export const getWeddingTypographyProductionRoleGuide = (movieId: "opening" | "profile") =>
  weddingTypographyProductionRoleGuide.filter((item) => item.movieId === movieId);
