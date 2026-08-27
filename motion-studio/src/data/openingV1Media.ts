import {photoLibrary} from './photoLibrary.generated';

export type OpeningV1PhotoKey =
  | 'okinawa-01'
  | 'okinawa-02'
  | 'okinawa-03'
  | 'seoul-01'
  | 'seoul-02'
  | 'seoul-03'
  | 'hawaii-01'
  | 'hawaii-02'
  | 'hawaii-03'
  | 'hero-01'
  | 'hero-02';

// Canonical role order is shared with Dashboard handoff generation. It is metadata only:
// role resolution must never fall back to array position.
const orderedKeys: OpeningV1PhotoKey[] = [
  'okinawa-01',
  'okinawa-02',
  'okinawa-03',
  'seoul-01',
  'seoul-02',
  'seoul-03',
  'hawaii-01',
  'hawaii-02',
  'hawaii-03',
  'hero-01',
  'hero-02',
];

const aliases: Record<OpeningV1PhotoKey, string[]> = {
  'okinawa-01': ['okinawa-01', 'okinawa01', 'okinawa-1'],
  'okinawa-02': ['okinawa-02', 'okinawa02', 'okinawa-2'],
  'okinawa-03': ['okinawa-03', 'okinawa03', 'okinawa-3'],
  'seoul-01': ['seoul-01', 'seoul01', 'seoul-1', 'korea-01', 'korea01'],
  'seoul-02': ['seoul-02', 'seoul02', 'seoul-2', 'korea-02', 'korea02'],
  'seoul-03': ['seoul-03', 'seoul03', 'seoul-3', 'korea-03', 'korea03'],
  'hawaii-01': ['hawaii-01', 'hawaii01', 'hawaii-1'],
  'hawaii-02': ['hawaii-02', 'hawaii02', 'hawaii-2'],
  'hawaii-03': ['hawaii-03', 'hawaii03', 'hawaii-3'],
  'hero-01': ['hero-01', 'hero01', 'hero-1', 'couple-01', 'couple01'],
  'hero-02': ['hero-02', 'hero02', 'hero-2', 'couple-02', 'couple02'],
};

const openingPhotos = photoLibrary.opening ?? [];

const normalizedBasename = (path: string): string => {
  const file = path.split('/').pop() ?? path;
  const dot = file.lastIndexOf('.');
  return (dot >= 0 ? file.slice(0, dot) : file).toLowerCase().replaceAll('_', '-');
};

export const resolveOpeningV1Photo = (key: OpeningV1PhotoKey): string | null => {
  const aliasSet = aliases[key];
  const semanticMatch = openingPhotos.find((path) => {
    const base = normalizedBasename(path);
    return aliasSet.includes(base);
  });

  // Production slots are semantic roles, not array positions. Never assign an unrelated
  // image merely because opening/ happens to contain 11+ files. Missing semantic matches
  // stay null so preflight/render gates fail closed instead of silently swapping memories.
  return semanticMatch ?? null;
};

export const openingV1PhotoSlots = {
  okinawa: [
    resolveOpeningV1Photo('okinawa-01'),
    resolveOpeningV1Photo('okinawa-02'),
    resolveOpeningV1Photo('okinawa-03'),
  ] as const,
  seoul: [
    resolveOpeningV1Photo('seoul-01'),
    resolveOpeningV1Photo('seoul-02'),
    resolveOpeningV1Photo('seoul-03'),
  ] as const,
  hawaii: [
    resolveOpeningV1Photo('hawaii-01'),
    resolveOpeningV1Photo('hawaii-02'),
    resolveOpeningV1Photo('hawaii-03'),
  ] as const,
  heroes: [resolveOpeningV1Photo('hero-01'), resolveOpeningV1Photo('hero-02')] as const,
};

export const openingV1ResolvedPhotoCount = Object.values(openingV1PhotoSlots)
  .flat()
  .filter((value): value is string => value !== null).length;
