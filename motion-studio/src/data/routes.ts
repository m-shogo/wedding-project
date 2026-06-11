// フライトマップの都市座標（1920x1080キャンバス基準）と区間定義。
// 座標はRemotion Studioで見ながら調整する。

export type City = {
  id: string;
  label: string;
  x: number;
  y: number;
};

export const cities: Record<string, City> = {
  narita: {id: 'narita', label: 'NARITA', x: 1430, y: 330},
  okinawa: {id: 'okinawa', label: 'OKINAWA', x: 520, y: 760},
  seoul: {id: 'seoul', label: 'SEOUL', x: 760, y: 250},
  hawaii: {id: 'hawaii', label: 'HAWAII', x: 1620, y: 700},
  yokohama: {id: 'yokohama', label: 'YOKOHAMA', x: 1390, y: 380},
};

export type RouteSegment = {
  id: string;
  from: City;
  to: City;
  // 航路の弧の膨らみ。0で直線、正で上方向に膨らむ。
  arc: number;
};

export const routes: Record<string, RouteSegment> = {
  naritaToOkinawa: {
    id: 'naritaToOkinawa',
    from: cities.narita,
    to: cities.okinawa,
    arc: 180,
  },
  okinawaToSeoul: {
    id: 'okinawaToSeoul',
    from: cities.okinawa,
    to: cities.seoul,
    arc: 140,
  },
  seoulToHawaii: {
    id: 'seoulToHawaii',
    from: cities.seoul,
    to: cities.hawaii,
    arc: 220,
  },
  hawaiiToYokohama: {
    id: 'hawaiiToYokohama',
    from: cities.hawaii,
    to: cities.yokohama,
    arc: 160,
  },
};

// 2次ベジェの航路パスを作る。
export const routePath = (seg: RouteSegment): string => {
  const mx = (seg.from.x + seg.to.x) / 2;
  const my = (seg.from.y + seg.to.y) / 2 - seg.arc;
  return `M ${seg.from.x} ${seg.from.y} Q ${mx} ${my} ${seg.to.x} ${seg.to.y}`;
};
