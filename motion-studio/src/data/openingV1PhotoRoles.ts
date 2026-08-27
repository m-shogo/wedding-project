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

// Canonical semantic roles for Opening V1 real photos.
// Keep this module free of generated/runtime media imports so intake/preflight tooling
// can reuse the same authority before public/photos has been populated.
export const orderedKeys: OpeningV1PhotoKey[] = [
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

export const aliases: Record<OpeningV1PhotoKey, string[]> = {
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
