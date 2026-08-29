export type MediaFit = 'cover' | 'contain';

type ResolveMediaPresentationInput = {
  shotFit?: MediaFit;
  shotObjectPosition?: string;
  assetFit?: MediaFit;
  assetFocusX?: number;
  assetFocusY?: number;
};

export type ResolvedMediaPresentation = {
  fit: MediaFit;
  objectPosition?: string;
};

const hasFiniteFocus = (value: number | undefined): value is number =>
  typeof value === 'number' && Number.isFinite(value);

/**
 * Keep authored shot framing authoritative while still allowing real-media
 * metadata to provide a safe fallback when the shot has no explicit crop.
 *
 * Precedence intentionally mirrors the proven StaRt Wedding Edit behavior:
 *   fit: shot -> asset -> cover
 *   position: shot objectPosition -> asset focus -> browser default
 */
export const resolveMediaPresentation = ({
  shotFit,
  shotObjectPosition,
  assetFit,
  assetFocusX,
  assetFocusY,
}: ResolveMediaPresentationInput): ResolvedMediaPresentation => {
  const fit = shotFit ?? assetFit ?? 'cover';

  if (shotObjectPosition) {
    return {fit, objectPosition: shotObjectPosition};
  }

  if (hasFiniteFocus(assetFocusX) && hasFiniteFocus(assetFocusY)) {
    return {fit, objectPosition: `${assetFocusX}% ${assetFocusY}%`};
  }

  return {fit};
};
