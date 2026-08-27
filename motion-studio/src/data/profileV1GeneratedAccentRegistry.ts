import type {ProfileV1ChapterId} from './profileV1ProductionPlan';

export type ProfileV1GeneratedAccentImplementation = {
  slotId: string;
  chapterId: ProfileV1ChapterId;
  implementation: string;
  canonicalReuse: string;
};

export const profileV1GeneratedAccentImplementations = [
  {
    slotId: 'departure-boarding-title',
    chapterId: 'departure',
    implementation: 'PROFILE_BOARDING_TITLE_CARD',
    canonicalReuse: 'COMPOSITION_SPECIFIC_GRAPHIC',
  },
  {
    slotId: 'intersection-route',
    chapterId: 'intersection',
    implementation: 'MOTION_ZUKAN_ROUTE_LINE',
    canonicalReuse: 'TransitionWipeEngine/route-line',
  },
  {
    slotId: 'arrival-door-light',
    chapterId: 'arrival',
    implementation: 'OPENING_DOOR_LIGHT_REUSE',
    canonicalReuse: 'DoorLight',
  },
] as const satisfies readonly ProfileV1GeneratedAccentImplementation[];
