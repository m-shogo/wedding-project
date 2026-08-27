import {photoLibrary} from './photoLibrary.generated';
import {aliases, orderedKeys} from './openingV1PhotoRoles';
import type {OpeningV1PhotoKey} from './openingV1PhotoRoles';

export {aliases, orderedKeys};
export type {OpeningV1PhotoKey};

const openingPhotos = photoLibrary.opening ?? [];

export const normalizedBasename = (path: string): string => {
  const file = path.split('/').pop() ?? path;
  const dot = file.lastIndexOf('.');
  return (dot >= 0 ? file.slice(0, dot) : file).toLowerCase().replaceAll('_', '-');
};

export const resolveOpeningV1Photo = (key: OpeningV1PhotoKey): string | null => {
  const aliasSet = aliases[key];
  const semanticMatches = openingPhotos.filter((path) => {
    const base = normalizedBasename(path);
    return aliasSet.includes(base);
  });

  // Production slots are semantic roles, not array positions. Exactly one semantic match
  // is required. Missing or ambiguous matches stay null so filename order/extensions can
  // never silently decide which real memory is used.
  return semanticMatches.length === 1 ? semanticMatches[0] : null;
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
