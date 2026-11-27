const nf = new Intl.NumberFormat('es-CL');
const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sept', 'oct', 'nov', 'dic'];

/** 1890 → "US$ 1.890" */
export const usd = (n: number): string => `US$ ${nf.format(n)}`;

export const num = (n: number): string => nf.format(n);

/** "2026-11-18" → "18 nov 2026" (sin depender de la zona horaria del build) */
export const shortDate = (iso: string): string => {
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return iso;
  return `${d} ${MONTHS[m - 1]} ${y}`;
};

/** 1 → "1 día", 5 → "5 días" */
export const days = (n: number): string => `${n} ${n === 1 ? 'día' : 'días'}`;
