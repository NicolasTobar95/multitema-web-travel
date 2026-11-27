/**
 * Mapa de la Gran Travesía y perfil del Circuito W, calculados en el build.
 * El mockup usaba D3 + world-atlas desde un CDN en el navegador; aquí se generan
 * los trazados SVG una sola vez y al cliente solo llegan números.
 */
import { geoGraticule, geoMercator, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import type { GeometryCollection, Topology } from 'topojson-specification';
import land50 from 'world-atlas/land-50m.json';

export interface Stop {
  lat: number;
  lon: number;
}

/** Distancia en línea recta (km) entre dos puntos */
export function haversine(a: Stop, b: Stop): number {
  const R = 6371;
  const r = (x: number) => (x * Math.PI) / 180;
  const dl = r(b.lat - a.lat);
  const dn = r(b.lon - a.lon);
  const h = Math.sin(dl / 2) ** 2 + Math.cos(r(a.lat)) * Math.cos(r(b.lat)) * Math.sin(dn / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export const MAP_W = 1000;
export const MAP_H = 760;

export function buildMap(stops: readonly Stop[]) {
  const projection = geoMercator()
    .fitExtent(
      [
        [40, 40],
        [MAP_W - 40, MAP_H - 40],
      ],
      {
        type: 'MultiPoint',
        coordinates: [
          [-80, -39.5],
          [-64, -39.5],
          [-64, -53.5],
          [-80, -53.5],
        ],
      },
    )
    .clipExtent([
      [0, 0],
      [MAP_W, MAP_H],
    ]);
  const path = geoPath(projection).digits(1);

  const topo = land50 as unknown as Topology<{ land: GeometryCollection }>;
  const land = path(feature(topo, topo.objects.land)) ?? '';
  const graticule = path(geoGraticule().step([2, 2])()) ?? '';

  const coords = stops.map((s) => [s.lon, s.lat] as [number, number]);
  const legs = coords.slice(1).map((c, i) => path({ type: 'LineString', coordinates: [coords[i]!, c] }) ?? '');
  const points = coords.map((c) => {
    const [x, y] = projection(c) ?? [0, 0];
    return { x: Math.round(x), y: Math.round(y) };
  });

  // Barra de escala: 200 km medidos a 47° S
  const p0 = projection([-72, -47]) ?? [0, 0];
  const p1 = projection([-72 + 200 / (111.32 * Math.cos((47 * Math.PI) / 180)), -47]) ?? [0, 0];
  const scale200 = (p1[0] - p0[0]) / MAP_W;

  return { land, graticule, legs, points, scale200 };
}

/* ---------- Perfil de elevación del Circuito W ---------- */
export const PROFILE_KM = 80;
export const PROFILE_MAX = 880;

/** Puntos de control aproximados (km, m) del Circuito W */
const CTRL: ReadonlyArray<readonly [number, number]> = [
  [0, 140], [3, 350], [6, 560], [8, 720], [9.5, 880], [11, 700], [14, 430], [19, 140], [24, 95], [30, 80], [35, 150], [40, 200],
  [43, 470], [45, 760], [47, 460], [50, 200], [55, 110], [58, 60], [62, 150], [66, 230], [69, 120], [72, 210], [76, 140], [80, 60],
];

export const WAYPOINTS = [
  { km: 9.5, day: 'Día 1', name: 'Base Torres' },
  { km: 30, day: 'Día 2', name: 'Los Cuernos' },
  { km: 45, day: 'Día 3', name: 'Mirador Británico' },
  { km: 72, day: 'Día 4', name: 'Glaciar Grey' },
] as const;

/** Elevación cada 250 m de recorrido (321 valores, enteros) */
export function profileSamples(): number[] {
  const out: number[] = [];
  for (let i = 0; i <= PROFILE_KM * 4; i++) {
    const k = i / 4;
    let j = CTRL.findIndex((c) => c[0] >= k);
    if (j <= 0) j = 1;
    const [x0, y0] = CTRL[j - 1]!;
    const [x1, y1] = CTRL[j]!;
    const f = (k - x0) / (x1 - x0 || 1);
    const s = f * f * (3 - 2 * f);
    let e = y0 + (y1 - y0) * s;
    if (k > 0 && k < PROFILE_KM && Math.abs(k - 9.5) > 0.6) e += Math.sin(k * 3.1) * 5 + Math.sin(k * 1.3) * 7;
    out.push(Math.round(Math.max(0, Math.min(PROFILE_MAX, e))));
  }
  return out;
}

/** Geometría del gráfico del perfil (viewBox 1000 × 280) */
export const PF = { W: 1000, H: 280, l: 56, r: 16, t: 44, b: 30, max: 1000 } as const;
export const pfX = (k: number) => PF.l + (k / PROFILE_KM) * (PF.W - PF.l - PF.r);
export const pfY = (e: number) => PF.H - PF.b - (e / PF.max) * (PF.H - PF.t - PF.b);
