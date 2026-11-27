/**
 * Interacciones de Brisa (sin dependencias). Se inicia en cada astro:page-load
 * cuando el tema activo es Brisa y suelta sus listeners al navegar.
 *
 * - Afiche del hero: parallax de las capas con el scroll y el cursor.
 * - Serie "a medida": rotación automática con pausa, anterior/siguiente.
 * - Formularios de demo: muestran un aviso (no envían nada).
 * - Aparición al hacer scroll y menú móvil.
 */
import { $, $$ } from '@/lib/dom';

function init() {
  if (document.documentElement.dataset['theme'] !== 'brisa') return;

  const ac = new AbortController();
  const { signal } = ac;
  const observers: IntersectionObserver[] = [];
  const timers: number[] = [];
  document.addEventListener('astro:before-swap', () => {
    ac.abort();
    observers.forEach((o) => o.disconnect());
    timers.forEach((t) => clearInterval(t));
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
    { threshold: 0.14 },
  );
  observers.push(reveal);
  $$('.rv').forEach((el) => reveal.observe(el));

  /* ---------- menú móvil ---------- */
  const menu = $<HTMLButtonElement>('[data-menu]');
  const nav = $('#br-nav');
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

  /* ---------- parallax del afiche ---------- */
  const poster = $('[data-poster]');
  if (poster && !reduced) {
    const layers = $$('.layer', poster).map((el) => ({ el, d: Number(el.dataset['d'] ?? 0) }));
    let mx = 0;
    let my = 0;
    let queued = false;
    let visible = true;
    const paint = () => {
      queued = false;
      if (!visible) return;
      const y = Math.min(scrollY, innerHeight);
      for (const { el, d } of layers) {
        el.style.transform = `translate3d(${mx * d * -40}px, ${y * d * 0.6 + my * d * -20}px, 0)`;
      }
    };
    const queue = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(paint);
      }
    };
    const io = new IntersectionObserver(([e]) => {
      visible = !!e?.isIntersecting;
      if (visible) queue();
    });
    io.observe(poster);
    observers.push(io);
    poster.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse') return;
      const r = poster.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width - 0.5;
      my = (e.clientY - r.top) / r.height - 0.5;
      queue();
    }, { signal });
    poster.addEventListener('pointerleave', () => {
      mx = 0;
      my = 0;
      queue();
    }, { signal });
    addEventListener('scroll', queue, { passive: true, signal });
    paint();
  }

  /* ---------- serie "a medida" ---------- */
  const slider = $('[data-slider]');
  if (slider) {
    const slides = $$('[data-slide]', slider);
    const ctrl = $('[data-ctrl]', slider);
    const count = $('[data-count]', slider);
    const pauseBtn = $<HTMLButtonElement>('[data-pause]', slider);
    let i = 0;
    let timer = 0;
    let paused = reduced;
    let hovering = false;

    const show = (n: number, announce = true) => {
      i = (n + slides.length) % slides.length;
      slides.forEach((s, j) => {
        const on = j === i;
        s.classList.toggle('on', on);
        // Las ocultas no se leen ni reciben foco
        s.toggleAttribute('inert', !on);
        s.setAttribute('aria-hidden', String(!on));
      });
      // Solo se anuncia el cambio pedido por la persona, no la rotación automática
      if (count) {
        count.setAttribute('aria-live', announce ? 'polite' : 'off');
        count.textContent = `${i + 1} / ${slides.length}`;
      }
    };
    const stop = () => {
      clearInterval(timer);
      timer = 0;
    };
    const start = () => {
      stop();
      if (paused || hovering) return;
      timer = window.setInterval(() => show(i + 1, false), 6500);
      timers.push(timer);
    };
    const setPaused = (p: boolean) => {
      paused = p;
      if (pauseBtn) {
        pauseBtn.setAttribute('aria-pressed', String(p));
        const label = pauseBtn.querySelector('.sr-only');
        if (label) label.textContent = p ? 'Reanudar la rotación' : 'Pausar la rotación';
      }
      start();
    };

    if (ctrl) ctrl.hidden = false;
    $('[data-prev]', slider)?.addEventListener('click', () => {
      show(i - 1);
      start();
    }, { signal });
    $('[data-next]', slider)?.addEventListener('click', () => {
      show(i + 1);
      start();
    }, { signal });
    pauseBtn?.addEventListener('click', () => setPaused(!paused), { signal });
    slider.addEventListener('pointerenter', () => {
      hovering = true;
      stop();
    }, { signal });
    slider.addEventListener('pointerleave', () => {
      hovering = false;
      start();
    }, { signal });
    slider.addEventListener('focusin', () => {
      hovering = true;
      stop();
    }, { signal });
    slider.addEventListener('focusout', (e) => {
      if (!slider.contains(e.relatedTarget as Node | null)) {
        hovering = false;
        start();
      }
    }, { signal });
    // Solo rota mientras se ve
    const io = new IntersectionObserver(([e]) => (e?.isIntersecting ? start() : stop()));
    io.observe(slider);
    observers.push(io);

    show(0);
    setPaused(paused);
  }

  /* ---------- formularios de demo ---------- */
  $$<HTMLFormElement>('[data-demo-form]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = $('[data-msg]', form);
      if (msg) msg.textContent = '¡Listo! (Es una demo: no guardamos ni enviamos tu correo).';
      form.reset();
    }, { signal });
  });
}

document.addEventListener('astro:page-load', init);
