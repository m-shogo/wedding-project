import type {OpeningV1PhotoKey} from './openingV1PhotoRoles';

export type OpeningV1PhotoFit = 'cover' | 'contain';
export type OpeningV1PhotoFocus = {x: number; y: number};

export type OpeningV1PhotoMetadata = {
  focus?: OpeningV1PhotoFocus;
  fit?: OpeningV1PhotoFit;
};

/**
 * Asset-level presentation hints for real Opening V1 media.
 *
 * Keep this deliberately sparse: a missing entry means "no asset recommendation" and
 * therefore preserves the existing scene presentation unchanged. When real wedding
 * media is approved, crop QA may add a semantic-role hint here without coupling it to
 * filename order. Scene/storyboard instructions remain authoritative.
 */
export const openingV1PhotoMetadata: Partial<Record<OpeningV1PhotoKey, OpeningV1PhotoMetadata>> = {};

export const resolveOpeningV1PhotoPresentation = ({
  sceneFocus,
  sceneFit,
  assetFocus,
  assetFit,
  defaultFit = 'cover',
}: {
  sceneFocus?: OpeningV1PhotoFocus;
  sceneFit?: OpeningV1PhotoFit;
  assetFocus?: OpeningV1PhotoFocus;
  assetFit?: OpeningV1PhotoFit;
  defaultFit?: OpeningV1PhotoFit;
}): {focus?: OpeningV1PhotoFocus; fit: OpeningV1PhotoFit} => ({
  // Production precedence: explicit scene/storyboard direction > approved asset hint > default.
  // Asset metadata must never silently overwrite a choreographed scene crop.
  focus: sceneFocus ?? assetFocus,
  fit: sceneFit ?? assetFit ?? defaultFit,
});
