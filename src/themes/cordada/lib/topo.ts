/**
 * Curvas de nivel decorativas, generadas en el build (antes se dibujaban con JS
 * en el navegador). Cada "cumbre" produce anillos deformados con senos; cada
 * quinto anillo es una curva índice, un poco más gruesa.
 */
export type Peak = readonly [cx: number, cy: number, seed: number];

export interface ContourPath {
  d: string;
  index: boolean;
}

export function contours(peaks: readonly Peak[], rings: number, step: number): ContourPath[] {
  const out: ContourPath[] = [];
  for (const [cx, cy, seed] of peaks) {
    for (let k = 1; k <= rings; k++) {
      const r = k * step;
      // Más puntos en los anillos grandes; coordenadas relativas y enteras para que pese poco
      const seg = Math.min(64, Math.max(24, Math.round(r / 9)));
      let d = '';
      let px = 0;
      let py = 0;
      for (let a = 0; a < seg; a++) {
        const t = (a / seg) * Math.PI * 2;
        const n = 1 + 0.18 * Math.sin(t * 3 + seed + k * 0.3) + 0.1 * Math.sin(t * 5 + seed * 2 - k * 0.2) + 0.05 * Math.sin(t * 9 + k);
        const x = Math.round(cx + Math.cos(t) * r * n * 1.25);
        const y = Math.round(cy + Math.sin(t) * r * n);
        if (a === 0) d = `M${x} ${y}l`;
        else d += `${x - px} ${y - py} `;
        px = x;
        py = y;
      }
      out.push({ d: `${d.trimEnd()}z`, index: k % 5 === 0 });
    }
  }
  return out;
}
