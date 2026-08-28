import {photoLibrary} from './photoLibrary.generated';
import {aliases, orderedKeys} from './openingV1PhotoRoles';
import type {OpeningV1PhotoKey} from './openingV1PhotoRoles';
import {
  openingV1PhotoMetadata,
  type OpeningV1PhotoFit,
  type OpeningV1PhotoFocus,
} from './openingV1PhotoPresentation';

export {aliases, orderedKeys};
export type {OpeningV1PhotoKey};

export type OpeningV1ResolvedPhoto = {
  key: OpeningV1PhotoKey;
  path: string | null;
  focus?: OpeningV1PhotoFocus;
  fit?: OpeningV1PhotoFit;
};

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

export const resolveOpeningV1PhotoAsset = (key: OpeningV1PhotoKey): OpeningV1ResolvedPhoto => ({
  key,
  path: resolveOpeningV1Photo(key),
  ...openingV1PhotoMetadata[key],
});

// Rich slots are the production rendering authority. The legacy path-only slots remain
// exported below for tooling that only needs completeness/path checks.
export const openingV1ResolvedPhotoSlots = {
  okinawa: [
    resolveOpeningV1PhotoAsset('okinawa-01'),
    resolveOpeningV1PhotoAsset('okinawa-02'),
    resolveOpeningV1PhotoAsset('okinawa-03'),
  ] as const,
  seoul: [
    resolveOpeningV1PhotoAsset('seoul-01'),
    resolveOpeningV1PhotoAsset('seoul-02'),
    resolveOpeningV1PhotoAsset('seoul-03'),
  ] as const,
  hawaii: [
    resolveOpeningV1PhotoAsset('hawaii-01'),
    resolveOpeningV1PhotoAsset('hawaii-02'),
    resolveOpeningV1PhotoAsset('hawaii-03'),
  ] as const,
  heroes: [resolveOpeningV1PhotoAsset('hero-01'), resolveOpeningV1PhotoAsset('hero-02')] as const,
};

export const openingV1PhotoSlots = {
  okinawa: openingV1ResolvedPhotoSlots.okinawa.map((asset) => asset.path) as [string | null, string | null, string | null],
  seoul: openingV1ResolvedPhotoSlots.seoul.map((asset) => asset.path) as [string | null, string | null, string | null],
  hawaii: openingV1ResolvedPhotoSlots.hawaii.map((asset) => asset.path) as [string | null, string | null, string | null],
  heroes: openingV1ResolvedPhotoSlots.heroes.map((asset) => asset.path) as [string | null, string | null],
};

export const openingV1ResolvedPhotoCount = Object.values(openingV1ResolvedPhotoSlots)
  .flat()
  .filter((asset) => asset.path !== null).length;
