/**
 * Interacciones de Albor (sin dependencias). Se inicia en cada astro:page-load
 * cuando el tema activo es Albor y suelta sus listeners al navegar.
 *
 * - Header: sólido al bajar, progreso, indicador deslizante del menú, menú móvil.
 * - Planificador: la frase del hero filtra y ordena los viajes en vivo, y la
 *   tarjeta de vista previa muestra la mejor opción.
 * - Banda "Incluido": parallax suave.
 */

import { $, $$, nf } from '@/lib/dom';

type Key = 'days' | 'land' | 'level' | 'budget';
const WHY: Record<Key, string> = { days: 'duración', land: 'paisaje', level: 'exigencia', budget: 'presupuesto' };

function init() {
  if (document.documentElement.dataset['theme'] !== 'albor') return;

  const ac = new AbortController();
  const { signal } = ac;
  const observers: IntersectionObserver[] = [];
  document.addEventListener('astro:before-swap', () => {
    ac.abort();
    observers.forEach((o) => o.disconnect());
  }, { once: true });

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- aparición ---------- */
  const reveal = new IntersectionObserver(
    (es) => es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        reveal.unobserve(e.target);
      }
    }),
    { threshold: 0.12 },
  );
  observers.push(reveal);
  $$('.rv').forEach((el) => reveal.observe(el));

  /* ---------- header ---------- */
  const hdr = $('[data-hdr]');
  const prog = $('[data-progress]');
  const nav = $('[data-nav]');
  const ind = $('[data-ind]');
  const links = nav ? $$<HTMLAnchorElement>('a', nav) : [];
  let active: HTMLAnchorElement | undefined;

  const moveInd = (a?: HTMLAnchorElement) => {
    if (!ind) return;
    if (!a || nav?.classList.contains('open')) {
      ind.style.opacity = '0';
      return;
    }
    ind.style.opacity = '1';
    ind.style.width = `${a.offsetWidth}px`;
    ind.style.transform = `translateX(${a.offsetLeft}px)`;
  };
  links.forEach((a) => a.addEventListener('mouseenter', () => moveInd(a), { signal }));
  nav?.addEventListener('mouseleave', () => moveInd(active), { signal });

  const spy = new IntersectionObserver(
    (es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      active = links.find((a) => a.dataset['sec'] === e.target.id);
      links.forEach((a) => {
        a.classList.toggle('on', a === active);
        if (a === active) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
      moveInd(active);
    }),
    { rootMargin: '-40% 0px -55% 0px' },
  );
  observers.push(spy);
  links.forEach((a) => {
    const sec = document.getElementById(a.dataset['sec'] ?? '');
    if (sec) spy.observe(sec);
  });

  /* ---------- menú móvil ---------- */
  const menu = $<HTMLButtonElement>('[data-menu]');
  if (menu && nav) {
    const setMenu = (open: boolean) => {
      nav.classList.toggle('open', open);
      menu.setAttribute('aria-expanded', String(open));
      moveInd(open ? undefined : active);
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

  /* ---------- scroll: header, progreso, parallax ---------- */
  const band = $('[data-parallax]');
  let ticking = false;
  const onScroll = () => {
    ticking = false;
    const y = scrollY;
    hdr?.classList.toggle('solid', y > 30);
    const H = document.documentElement.scrollHeight - innerHeight;
    if (prog) prog.style.transform = `scaleX(${H > 0 ? y / H : 0})`;
    if (band && !reduced) {
      const r = band.parentElement!.getBoundingClientRect();
      if (r.bottom > 0 && r.top < innerHeight) {
        band.style.transform = `translate3d(0, ${((r.top + r.height / 2 - innerHeight / 2) / innerHeight) * -50}px, 0)`;
      }
    }
  };
  addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(onScroll);
    }
  }, { passive: true, signal });
  onScroll();

  planner(signal, reduced);
}

/* ======================= planificador ======================= */
function planner(signal: AbortSignal, reduced: boolean) {
  const sentence = $('[data-sentence]');
  const grid = $('[data-grid]');
  const empty = $('[data-empty]');
  if (!sentence || !grid || !empty) return;

  const S = Object.fromEntries($$<HTMLSelectElement>('[data-pick]', sentence).map((s) => [s.dataset['pick'], s])) as Record<Key, HTMLSelectElement>;
  const selects = Object.values(S);
  const cards = $$('[data-card]', grid);
  const total = cards.length;

  /* Ancho de cada selector según su texto (si el navegador no tiene field-sizing) */
  const fitAll = (() => {
    if (CSS.supports('field-sizing', 'content')) return () => {};
    const meas = document.createElement('span');
    meas.setAttribute('aria-hidden', 'true');
    meas.style.cssText = 'position:absolute;visibility:hidden;white-space:pre;left:-9999px';
    sentence.append(meas);
    const fit = (sel: HTMLSelectElement) => {
      meas.textContent = sel.options[sel.selectedIndex]?.text ?? '';
      const em = parseFloat(getComputedStyle(sel).fontSize);
      sel.style.width = `${meas.getBoundingClientRect().width + em * 1.2}px`;
    };
    document.fonts?.ready.then(() => selects.forEach(fit));
    addEventListener('resize', () => selects.forEach(fit), { signal });
    selects.forEach((s) => s.addEventListener('change', () => fit(s), { signal }));
    return () => selects.forEach(fit);
  })();
  fitAll();

  const n = $('[data-n]');
  const nText = $('[data-n-text]');
  const status = $('[data-status]');
  const reset = $<HTMLButtonElement>('[data-reset]');

  const evaluate = (c: HTMLElement) => {
    const d = c.dataset;
    const v = { days: S.days.value, land: S.land.value, level: S.level.value, budget: S.budget.value };
    const hit = {
      days: v.days === 'any' || d['days'] === v.days,
      land: v.land === 'any' || d['land'] === 'any' || d['land'] === v.land,
      level: v.level === 'any' || (d['level'] ?? '').split(' ').includes(v.level),
      budget: v.budget === 'any' || Number(d['price']) <= Number(v.budget),
    };
    const why = (Object.keys(hit) as Key[]).filter((k) => !hit[k]).map((k) => WHY[k]);
    const on = { days: v.days !== 'any', land: v.land !== 'any', level: v.level !== 'any' };
    return { ok: why.length === 0, why, hit, on };
  };

  /* ---------- vista previa ---------- */
  const pv = {
    pics: $$('[data-pv]'),
    title: $('[data-pv-title]'),
    tags: $('[data-pv-tags]'),
    price: $('[data-pv-price]'),
    match: $('[data-pv-match]'),
    link: $<HTMLAnchorElement>('[data-pv-link]'),
    more: $('[data-pv-more]'),
    moreText: $('[data-pv-more-text]'),
    thumbs: $$('[data-thumb]'),
  };
  let shown = pv.pics.find((p) => p.classList.contains('on'))?.dataset['pv'];
  let swap = 0;

  const showPic = async (id: string) => {
    if (id === shown) return;
    const next = pv.pics.find((p) => p.dataset['pv'] === id);
    const prev = pv.pics.find((p) => p.dataset['pv'] === shown);
    if (!next) return;
    shown = id;
    const token = ++swap;
    // Se carga oculta y se muestra cuando ya está decodificada (sin parpadeo)
    next.classList.add('out');
    const img = next.querySelector('img');
    if (img) {
      img.loading = 'eager';
      // Como mucho 1,2 s de espera: si la red va lenta, se muestra igual
      await Promise.race([img.decode().catch(() => {}), new Promise((r) => setTimeout(r, 1200))]);
    }
    if (token !== swap) return;
    pv.pics.forEach((p) => p.classList.remove('on', 'out'));
    prev?.classList.add('out');
    next.classList.add('on');
    setTimeout(() => {
      if (token === swap) prev?.classList.remove('out');
    }, reduced ? 0 : 700);
  };

  const preview = (matched: HTMLElement[], anyActive: boolean) => {
    const best = (anyActive && matched.find((c) => !c.classList.contains('wide'))) || matched[0];
    if (best) void showPic(best.dataset['card']!);
    if (pv.title) {
      const text = best?.querySelector('h3')?.textContent?.trim() ?? 'Armemos un viaje a tu medida';
      if (reduced) pv.title.textContent = text;
      else if (pv.title.textContent !== text) {
        pv.title.style.opacity = '0';
        setTimeout(() => {
          pv.title!.textContent = text;
          pv.title!.style.opacity = '1';
        }, 180);
      }
    }
    if (pv.tags) {
      const tags = best ? $$('.tags span', best).map((t) => t.textContent ?? '') : ['Escríbenos'];
      pv.tags.replaceChildren(...tags.map((t) => Object.assign(document.createElement('span'), { textContent: t })));
    }
    if (pv.price) pv.price.textContent = best?.querySelector('.foot b')?.textContent ?? 'A medida';
    if (pv.match) pv.match.textContent = `${matched.length} de ${total} calzan`;
    if (pv.link) pv.link.href = best ? '#resultados' : '#contacto';

    const rest = matched.filter((c) => c !== best).slice(0, 3).map((c) => c.dataset['card']);
    pv.thumbs.forEach((t) => t.classList.remove('on'));
    rest.forEach((id) => {
      const t = pv.thumbs.find((x) => x.dataset['thumb'] === id);
      if (t) {
        t.classList.add('on');
        pv.moreText?.before(t);
      }
    });
    if (pv.moreText) {
      const k = matched.length - 1;
      pv.moreText.hidden = k < 1;
      pv.moreText.textContent = `+${k} ${k === 1 ? 'opción más' : 'opciones más'} abajo`;
    }
  };

  const apply = (animate: boolean) => {
    const run = () => {
      const anyActive = selects.some((s) => s.selectedIndex > 0);
      const rows = cards.map((c, i) => {
        const r = evaluate(c);
        c.classList.toggle('off', !r.ok);
        const why = $('[data-why]', c);
        if (why) why.textContent = r.ok ? '' : `No calza: ${r.why.join(', ')}`;
        $$<HTMLElement>('.tags span', c).forEach((t) => {
          const k = t.dataset['k'] as 'days' | 'land' | 'level';
          t.classList.toggle('hit', r.ok && r.on[k] && r.hit[k]);
        });
        if (animate) c.classList.add('in');
        return { c, ok: r.ok, i };
      });
      rows.sort((a, b) => Number(b.ok) - Number(a.ok) || a.i - b.i).forEach(({ c }) => grid.insertBefore(c, empty));
      const matched = rows.filter((r) => r.ok).map((r) => r.c);
      const k = matched.length;
      const label = k === 1 ? 'viaje calza con lo que buscas' : 'viajes calzan con lo que buscas';
      if (n) n.textContent = nf.format(k);
      if (nText) nText.textContent = label;
      if (status && animate) status.textContent = `${k} ${label}`;
      if (reset) reset.hidden = !anyActive;
      // Sin resultados, el aviso va arriba (antes de las tarjetas apagadas)
      empty.hidden = k > 0;
      if (k === 0) grid.prepend(empty);
      else grid.append(empty);
      preview(matched, anyActive);
    };

    if (animate && !reduced && document.startViewTransition) {
      grid.classList.add('vt');
      const t = document.startViewTransition(run);
      t.ready.catch(() => {});
      t.updateCallbackDone.catch(() => {});
      t.finished.catch(() => {}).finally(() => grid.classList.remove('vt'));
    } else run();
  };

  selects.forEach((s) => s.addEventListener('change', () => apply(true), { signal }));
  reset?.addEventListener('click', () => {
    selects.forEach((s) => (s.selectedIndex = 0));
    fitAll();
    apply(true);
    S.days.focus();
  }, { signal });
  apply(false);
}

document.addEventListener('astro:page-load', init);
