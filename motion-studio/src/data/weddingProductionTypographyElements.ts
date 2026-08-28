export const weddingTypographyElementIds = [
  'type-mask-reveal',
  'type-character-stagger',
  'type-on-rhythm',
  'type-word-punch',
  'type-tracking-burst',
  'type-vertical-wipe',
  'type-outline-fill',
  'type-baseline-hop',
  'type-triplet',
] as const;

export type WeddingTypographyElementId = (typeof weddingTypographyElementIds)[number];
export type WeddingMovieId = 'opening' | 'profile';
export type TypographyProductionRole =
  | 'TITLE_REVEAL'
  | 'NAME_REVEAL'
  | 'BEAT_ACCENT'
  | 'SECTION_DIVIDER'
  | 'DATE_OR_PLACE'
  | 'EMOTIONAL_LINE';

export type TypographyProductionUse = {
  movieId: WeddingMovieId;
  role: TypographyProductionRole;
  primary: WeddingTypographyElementId;
  fallbacks: readonly WeddingTypographyElementId[];
  reason: string;
  studioActual: 'NOT_RUN';
  davinciActual: 'NOT_RUN';
};

export const weddingProductionTypographyUses: readonly TypographyProductionUse[] = [
  {
    movieId: 'opening',
    role: 'TITLE_REVEAL',
    primary: 'type-mask-reveal',
    fallbacks: ['type-outline-fill', 'type-vertical-wipe'],
    reason: 'Travel-opening title needs a clean editorial reveal before the first route/photo beat.',
    studioActual: 'NOT_RUN',
    davinciActual: 'NOT_RUN',
  },
  {
    movieId: 'opening',
    role: 'BEAT_ACCENT',
    primary: 'type-on-rhythm',
    fallbacks: ['type-word-punch', 'type-baseline-hop'],
    reason: 'Beat-led accents should follow music timing without introducing a second animation engine.',
    studioActual: 'NOT_RUN',
    davinciActual: 'NOT_RUN',
  },
  {
    movieId: 'opening',
    role: 'DATE_OR_PLACE',
    primary: 'type-tracking-burst',
    fallbacks: ['type-triplet'],
    reason: 'Short destination/date labels benefit from compact motion that does not overpower photos.',
    studioActual: 'NOT_RUN',
    davinciActual: 'NOT_RUN',
  },
  {
    movieId: 'profile',
    role: 'NAME_REVEAL',
    primary: 'type-character-stagger',
    fallbacks: ['type-mask-reveal', 'type-outline-fill'],
    reason: 'Name cards need readable character-level entrance with restrained production energy.',
    studioActual: 'NOT_RUN',
    davinciActual: 'NOT_RUN',
  },
  {
    movieId: 'profile',
    role: 'SECTION_DIVIDER',
    primary: 'type-vertical-wipe',
    fallbacks: ['type-tracking-burst', 'type-triplet'],
    reason: 'Life-stage section changes need a directional but short transition between photo groups.',
    studioActual: 'NOT_RUN',
    davinciActual: 'NOT_RUN',
  },
  {
    movieId: 'profile',
    role: 'EMOTIONAL_LINE',
    primary: 'type-outline-fill',
    fallbacks: ['type-baseline-hop', 'type-word-punch'],
    reason: 'Emotional copy should remain legible first, with a subtle finish suitable for wedding delivery.',
    studioActual: 'NOT_RUN',
    davinciActual: 'NOT_RUN',
  },
] as const;

export function getWeddingProductionTypographyUses(movieId: WeddingMovieId): readonly TypographyProductionUse[] {
  return weddingProductionTypographyUses.filter((use) => use.movieId === movieId);
}
