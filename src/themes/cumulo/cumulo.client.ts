/**
 * Interacciones de Cúmulo (sin dependencias). Se inicia en cada astro:page-load
 * cuando el tema activo es Cúmulo y suelta sus listeners al navegar.
 *
 * - Buscador con pestañas (patrón ARIA tabs): al buscar, abre la fila del
 *   viaje elegido en el índice (o lleva al contacto en "A medida").
 * - Índice de salidas: filtros por paisaje con View Transition y filas que
 *   se despliegan.
 * - Cinta de parques con pausa, aparición al hacer scroll y menú móvil.
 */
import { $, $$ } from '@/lib/dom';

function init() {
  if (document.documentElement.dataset['theme'] !== 'cumulo') return;

  const ac = new AbortController();
  const { signal } = ac;
  const observers: IntersectionObserver[] = [];
  document.addEventListener('astro:before-swap', () => {
    ac.abort();
    observers.forEach((o) => o.disconnect());
  }, { once: true });

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const behavior: ScrollBehavior = reduced ? 'auto' : 'smooth';

  /* ---------- aparición ---------- */
  const reveal = new IntersectionObserver(
    (es) => es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        reveal.unobserve(e.target);
      }
    }),
    { threshold: 0.14 },
  );
  observers.push(reveal);
  $$('.rv').forEach((el) => reveal.observe(el));

  /* ---------- menú móvil ---------- */
  const menu = $<HTMLButtonElement>('[data-menu]');
  const nav = $('#cu-nav');
  if (menu && nav) {
    const setMenu = (open: boolean) => {
      nav.classList.toggle('open', open);
      menu.setAttribute('aria-expanded', String(open));
    };
    menu.addEventListener('click', () => setMenu(!nav.classList.contains('open')), { signal });
    nav.addEventListener('click', (e) => {
      if ((e.target as Element).closest('a')) setMenu(false);
    }, { signal });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        setMenu(false);
        menu.focus();
      }
    }, { signal });
  }

  /* ---------- cinta de parques ---------- */
  const marq = $('[data-marq]');
  const marqBtn = $<HTMLButtonElement>('[data-marq-pause]');
  if (marq && marqBtn && !reduced) {
    marqBtn.hidden = false;
    marqBtn.addEventListener('click', () => {
      const p = marq.classList.toggle('paused');
      marqBtn.setAttribute('aria-pressed', String(p));
      const label = $('.sr-only', marqBtn);
      if (label) label.textContent = p ? 'Reanudar la cinta de parques' : 'Pausar la cinta de parques';
    }, { signal });
  }

  const index = setupIndex(signal);
  setupSearch(signal, behavior, index);
}

/* ======================= índice de salidas ======================= */
type Index = { open: (id: string) => HTMLElement | null };

function setupIndex(signal: AbortSignal): Index | undefined {
  const list = $('[data-list]');
  const chips = $('[data-chips]');
  if (!list || !chips) return;
  const rows = $$('.row', list);
  const empty = $('[data-empty]');
  const status = $('[data-idx-status]');

  const heads = rows.map((r) => $<HTMLButtonElement>('.head', r)!);
  heads.forEach((h) => h.addEventListener('click', () => {
    h.setAttribute('aria-expanded', String(h.getAttribute('aria-expanded') !== 'true'));
  }, { signal }));

  const apply = (filter: string) => {
    let n = 0;
    for (const r of rows) {
      const land = r.dataset['landscape'];
      const show = filter === 'todos' || land === filter || land === 'todos';
      r.hidden = !show;
      if (show) {
        n++;
        const num = $('[data-n]', r);
        if (num) num.textContent = String(n).padStart(2, '0');
      }
    }
    if (empty) empty.hidden = n > 0;
    if (status) status.textContent = `${n} ${n === 1 ? 'salida' : 'salidas'}`;
  };

  const select = (filter: string, animate = true) => {
    const btns = $$<HTMLButtonElement>('[data-filter]', chips);
    const btn = btns.find((b) => b.dataset['filter'] === filter);
    if (!btn || btn.getAttribute('aria-pressed') === 'true') return;
    btns.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    const run = () => apply(filter);
    if (animate && document.startViewTransition && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      list.classList.add('vt');
      const vt = document.startViewTransition(run);
      vt.ready.catch(() => {});
      vt.finished.finally(() => list.classList.remove('vt'));
    } else run();
  };

  chips.addEventListener('click', (e) => {
    const btn = (e.target as Element).closest<HTMLButtonElement>('[data-filter]');
    if (btn) select(btn.dataset['filter'] ?? 'todos');
  }, { signal });

  return {
    /** Muestra y abre la fila de un viaje (quita el filtro si la ocultaba) */
    open(id) {
      const row = document.getElementById(`fila-${id}`);
      if (!row) return null;
      if (row.hidden) select('todos', false);
      $('.head', row)?.setAttribute('aria-expanded', 'true');
      return row;
    },
  };
}

/* ======================= buscador con pestañas ======================= */
function setupSearch(signal: AbortSignal, behavior: ScrollBehavior, index?: Index) {
  const form = $<HTMLFormElement>('[data-search]');
  if (!form) return;
  const tabs = $$<HTMLButtonElement>('[role="tab"]', form);
  const panels = $$('[role="tabpanel"]', form);
  const status = $('[data-search-status]', form);

  const activate = (tab: HTMLButtonElement, focus = false) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
    });
    const id = tab.getAttribute('aria-controls');
    panels.forEach((p) => {
      const was = !p.hidden;
      p.hidden = p.id !== id;
      if (!p.hidden && !was && behavior === 'smooth') {
        p.animate([{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }], { duration: 300, easing: 'ease-out' });
      }
    });
    if (focus) tab.focus();
  };

  tabs.forEach((t) => t.addEventListener('click', () => activate(t), { signal }));
  // Flechas, Inicio y Fin mueven entre pestañas (activación automática)
  form.querySelector('[role="tablist"]')?.addEventListener('keydown', (e) => {
    const ev = e as KeyboardEvent;
    const i = tabs.findIndex((t) => t.getAttribute('aria-selected') === 'true');
    const to = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[ev.key];
    if (to === undefined) return;
    ev.preventDefault();
    activate(tabs[(to + tabs.length) % tabs.length]!, true);
  }, { signal });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const panel = panels.find((p) => !p.hidden);
    const first = panel ? $<HTMLSelectElement>('select', panel) : null;
    const go = first?.selectedOptions[0]?.dataset['go'] ?? panel?.dataset['go'] ?? '';

    if (go === 'contacto') {
      document.getElementById('contacto')?.scrollIntoView({ behavior });
      if (status) status.textContent = 'Los viajes a medida se coordinan con un guía: te llevamos al contacto.';
      return;
    }
    const row = index?.open(go);
    const target = row ?? document.getElementById('destinos');
    target?.scrollIntoView({ behavior, block: row ? 'center' : 'start' });
    if (row) {
      $<HTMLButtonElement>('.head', row)?.focus({ preventScroll: true });
      row.classList.add('hit');
      setTimeout(() => row.classList.remove('hit'), 2200);
    }
    if (status) status.textContent = row ? `Abrimos ${$('.t', row)?.textContent ?? 'el viaje'} en el índice de salidas.` : 'Te llevamos al índice de salidas.';
  }, { signal });
}

document.addEventListener('astro:page-load', init);
