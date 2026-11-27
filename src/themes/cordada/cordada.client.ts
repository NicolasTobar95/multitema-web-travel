/**
 * Interacciones de Cordada (sin dependencias). Se inicia en cada astro:page-load
 * cuando el tema activo es Cordada y suelta sus listeners al navegar.
 *
 * - Header: sólido al bajar, barra de progreso, coordenada de la sección visible, menú móvil.
 * - HUD del hero: cuenta la altitud y las coordenadas.
 * - Hojas de ruta: desplazamiento horizontal fijado (escritorio) + HUD de ruta.
 * - Gran Travesía: dibuja la ruta en el mapa y llena las etapas.
 * - Circuito W: cursor sobre el perfil de elevación y cambio km/mi.
 */

const KM2MI = 0.621371;
const M2FT = 3.28084;
import { $, $$, nf } from '@/lib/dom';

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const easeOut = (k: number) => 1 - Math.pow(1 - k, 3);
const easeInOut = (k: number) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);


function init() {
  if (document.documentElement.dataset['theme'] !== 'cordada') return;

  const ac = new AbortController();
  const { signal } = ac;
  const observers: IntersectionObserver[] = [];
  document.addEventListener('astro:before-swap', () => {
    ac.abort();
    observers.forEach((o) => o.disconnect());
  }, { once: true });

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let metric = true;
  const dist = (km: number) => (metric ? `${nf.format(Math.round(km))} km` : `${nf.format(Math.round(km * KM2MI))} mi`);
  const elev = (m: number) => (metric ? `${nf.format(Math.round(m))} m` : `${nf.format(Math.round(m * M2FT))} ft`);

  /* ---------- aparición ---------- */
  const reveal = new IntersectionObserver(
    (es) => es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        reveal.unobserve(e.target);
      }
    }),
    { threshold: 0.15 },
  );
  observers.push(reveal);
  $$('.rv').forEach((el) => reveal.observe(el));

  /* ---------- menú móvil ---------- */
  const menu = $<HTMLButtonElement>('[data-menu]');
  const nav = $('#cd-nav');
  if (menu && nav) {
    const setMenu = (open: boolean) => {
      nav.classList.toggle('open', open);
      menu.setAttribute('aria-expanded', String(open));
    };
    menu.addEventListener('click', () => setMenu(!nav.classList.contains('open')), { signal });
    nav.addEventListener('click', (e) => {
      if (e.target instanceof HTMLAnchorElement) setMenu(false);
    }, { signal });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        setMenu(false);
        menu.focus();
      }
    }, { signal });
  }

  /* ---------- HUD del hero ---------- */
  const alt = $('[data-hud-alt]');
  const la = $('[data-hud-lat]');
  const lo = $('[data-hud-lon]');
  if (alt && la && lo && !reduced) {
    const to = (el: HTMLElement) => Number(el.dataset['to']);
    const start = performance.now();
    const tick = (now: number) => {
      const e = easeOut(clamp((now - start) / 2200));
      alt.textContent = `${String(Math.round(to(alt) * e)).padStart(4, '0')} m`;
      la.textContent = `${(to(la) * e).toFixed(4)}° S`;
      lo.textContent = `${(to(lo) * e).toFixed(4)}° W`;
      if (e < 1 && !signal.aborted) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ---------- Gran Travesía ---------- */
  const trav = $('[data-travesia]');
  const legs: number[] = trav ? JSON.parse(trav.dataset['legs'] ?? '[]') : [];
  const total = legs.reduce((a, b) => a + b, 0);
  let mapProg = trav && !reduced ? 0 : 1;

  const paintTravesia = () => {
    if (!trav) return;
    const km = mapProg * total;
    const read = $('[data-map-read]', trav);
    if (read) read.textContent = dist(km);
    $$('[data-leg]', trav).forEach((p, i) => {
      const base = legs.slice(0, i).reduce((a, b) => a + b, 0);
      p.style.setProperty('--p', String(1 - clamp((km - base) / (legs[i] ?? 1))));
    });
    $$('.facts li[data-i]', trav).forEach((li, i) => {
      const reach = legs.slice(0, i).reduce((a, b) => a + b, 0);
      li.classList.toggle('on', i === 0 ? mapProg > 0 : km >= reach - 1);
      const bar = $('.hop i', li);
      if (bar && i > 0) bar.style.setProperty('--f', String(clamp((km - (reach - (legs[i - 1] ?? 0))) / (legs[i - 1] ?? 1))));
    });
    $$('[data-pt]', trav).forEach((g, i) => {
      const reach = legs.slice(0, i).reduce((a, b) => a + b, 0);
      const shown = i === 0 ? mapProg > 0 : km >= reach - 0.5;
      g.classList.toggle('show', shown);
    });
    const on = $$('[data-pt].show', trav).length - 1;
    $$('[data-pt]', trav).forEach((g, i) => g.classList.toggle('on', i === on));
  };

  if (trav) {
    // Hover sobre una etapa: resalta su punto en el mapa
    $$('.facts li[data-i]', trav).forEach((li) => {
      const i = Number(li.dataset['i']);
      li.addEventListener('mouseenter', () => {
        $$('[data-pt]', trav).forEach((g, j) => (g.style.opacity = j === i ? '' : '0.3'));
        li.classList.add('hl');
      }, { signal });
      li.addEventListener('mouseleave', () => {
        $$('[data-pt]', trav).forEach((g) => (g.style.opacity = ''));
        li.classList.remove('hl');
      }, { signal });
    });

    if (!reduced) {
      trav.classList.add('armed');
      paintTravesia();
      const io = new IntersectionObserver(
        (es) => {
          if (!es[0]?.isIntersecting) return;
          io.disconnect();
          const start = performance.now() + 500;
          const dur = 1800 * legs.length;
          const step = (now: number) => {
            mapProg = easeInOut(clamp((now - start) / dur));
            paintTravesia();
            onScroll();
            if (mapProg < 1 && !signal.aborted) requestAnimationFrame(step);
          };
          mapProg = 0.0001;
          requestAnimationFrame(step);
        },
        { threshold: 0.3 },
      );
      observers.push(io);
      const map = $('[data-map]', trav);
      if (map) io.observe(map);
    }
  }

  /* ---------- Circuito W: perfil y unidades ---------- */
  const pf = $<SVGSVGElement>('[data-pf]');
  const samples: number[] = pf ? JSON.parse(pf.dataset['samples'] ?? '[]') : [];
  const KM = (samples.length - 1) / 4;
  const PF = { W: 1000, l: 56, r: 16, H: 280, t: 44, b: 30, max: 1000 };
  const px = (k: number) => PF.l + (k / KM) * (PF.W - PF.l - PF.r);
  const py = (e: number) => PF.H - PF.b - (e / PF.max) * (PF.H - PF.t - PF.b);
  let cursorKm = KM;

  const place = (k: number) => {
    if (!pf) return;
    cursorKm = k;
    const e = samples[Math.round(k * 4)] ?? 0;
    const line = $<SVGLineElement>('[data-pf-cur] line', pf);
    const dot = $<SVGCircleElement>('[data-pf-cur] circle', pf);
    line?.setAttribute('x1', String(px(k)));
    line?.setAttribute('x2', String(px(k)));
    dot?.setAttribute('cx', String(px(k)));
    dot?.setAttribute('cy', String(py(e)));
    const read = $('[data-pf-read]');
    if (read) read.innerHTML = `<span aria-hidden="true">●</span> ${dist(k)} · ${elev(e)}`;
  };

  if (pf) {
    const hit = $('[data-pf-hit]', pf);
    const move = (ev: PointerEvent) => {
      const r = pf.getBoundingClientRect();
      const x = (ev.clientX - r.left) * (PF.W / r.width);
      place(clamp(((x - PF.l) / (PF.W - PF.l - PF.r)) * KM, 0, KM));
    };
    hit?.addEventListener('pointermove', move, { signal });
    hit?.addEventListener('pointerdown', move, { signal });

    if (!reduced) {
      const io = new IntersectionObserver(
        (es) => {
          if (!es[0]?.isIntersecting) return;
          io.disconnect();
          const start = performance.now();
          const step = (now: number) => {
            const k = clamp((now - start) / 2600);
            place(KM * easeOut(k));
            if (k < 1 && !signal.aborted) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        },
        { threshold: 0.5 },
      );
      observers.push(io);
      io.observe(pf);
    }
  }

  const paintUnits = () => {
    $$('[data-dist]').forEach((el) => (el.textContent = nf.format(Math.round(Number(el.dataset['dist']) * (metric ? 1 : KM2MI)))));
    $$('[data-dist-unit]').forEach((el) => (el.textContent = metric ? 'km' : 'mi'));
    $$('[data-elev]').forEach((el) => (el.textContent = nf.format(Math.round(Number(el.dataset['elev']) * (metric ? 1 : M2FT)))));
    $$('[data-elev-unit]').forEach((el) => (el.textContent = metric ? 'm' : 'ft'));
    $$('[data-y-label]').forEach((el) => {
      const m = Number(el.dataset['yLabel']);
      el.textContent = nf.format(metric ? m : Math.round((m * M2FT) / 100) * 100);
    });
    $$('[data-x-label]').forEach((el) => (el.textContent = dist(Number(el.dataset['xLabel']))));
    $$('[data-km]').forEach((el) => (el.textContent = dist(Number(el.dataset['km']))));
    paintTravesia();
    place(cursorKm);
  };
  $$<HTMLButtonElement>('[data-units]').forEach((b) =>
    b.addEventListener('click', () => {
      metric = b.dataset['units'] === 'metric';
      $$('[data-units]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      paintUnits();
    }, { signal }),
  );

  /* ---------- scroll: header, horizontal, HUD de ruta ---------- */
  const hdr = $('[data-hdr]');
  const prog = $('[data-progress]');
  const hc = $('[data-hdr-coord]');
  const exp = $('[data-exp]');
  const ht = $('[data-htrack]');
  const rf = $('[data-rail-fill]');
  const rn = $('[data-rail-n]');
  const rh = $('[data-rhud]');
  const rhf = $('[data-rhud-fill]');
  const rhn = $('[data-rhud-now]');
  const nodes = rh ? $$('.nd', rh) : [];
  const stops = rh ? (JSON.parse(rh.dataset['stops'] ?? '[]') as { name: string; coord: string }[]) : [];
  const coordEls = $$('[data-coord]');
  const pinned = matchMedia('(min-width: 900px) and (prefers-reduced-motion: no-preference)');

  function onScroll() {
    const y = scrollY;
    const H = document.documentElement.scrollHeight - innerHeight;
    hdr?.classList.toggle('solid', y > innerHeight * 0.75);
    if (prog) prog.style.transform = `scaleX(${H > 0 ? y / H : 0})`;

    if (hc && coordEls[0]) {
      let c = coordEls[0].dataset['coord'] ?? '';
      for (const el of coordEls) if (el.getBoundingClientRect().top < innerHeight * 0.5) c = el.dataset['coord'] ?? c;
      if (hc.textContent !== c) hc.textContent = c;
    }

    let pe = 0;
    if (exp && ht) {
      if (pinned.matches) {
        const r = exp.getBoundingClientRect();
        const tot = exp.offsetHeight - innerHeight;
        pe = tot > 0 ? clamp(-r.top / tot) : 0;
        ht.style.transform = `translate3d(${-pe * (ht.scrollWidth - innerWidth)}px,0,0)`;
      } else ht.style.transform = '';
      if (rf) rf.style.transform = `scaleX(${pe})`;
      if (rn) rn.textContent = String(Math.round(pe * 2) + 1).padStart(2, '0');
    }

    if (rh && exp && trav) {
      const er = exp.getBoundingClientRect();
      const show = er.top < innerHeight * 0.4 && er.bottom > innerHeight * 0.6;
      const ri = trav.getBoundingClientRect();
      const inInfo = ri.top < innerHeight * 0.85 && ri.bottom > innerHeight * 0.15;
      rh.classList.toggle('show', show && !inInfo);
      const g = pe;
      if (rhf) rhf.style.transform = `scaleX(${g})`;
      const idx = g > 0.97 ? 2 : g > 0.45 ? 1 : 0;
      nodes.forEach((n, i) => n.classList.toggle('on', i <= idx));
      const s = stops[idx];
      if (rhn && s) rhn.innerHTML = `<b>${String(idx + 1).padStart(2, '0')} · ${s.name}</b>${s.coord}`;
    }
  }

  let ticking = false;
  addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      onScroll();
      ticking = false;
    });
  }, { passive: true, signal });
  addEventListener('resize', onScroll, { passive: true, signal });
  onScroll();
}

document.addEventListener('astro:page-load', init);
