# AURA — Documento de Diseño (Retoque de "Indotravi")

> **Nombre del tema:** **Aura**
> *Tagline sugerido: "Travel, refined."*
> Basado en la arquitectura original de `Indotravi`, retocado para portfolio de temas dinámicos orientado a presentación comercial.
> Ruta base sugerida: `src/themes/Aura/`
> Stack: React 19 + Vite + Tailwind v3 · i18n vía `useTranslation()` · imágenes vía `sharedImages`

---

## 0. Por qué "Aura" y por qué este retoque

El tema original ya tenía un ADN fuerte: light editorial, glassmorphism real (no decorativo), curvas `rounded-[2rem]/[3rem]` como firma, y un grid asimétrico poco común en temas de viaje genéricos. **Aura** conserva ese ADN pero corrige las 12 deudas técnicas detectadas y añade las piezas que hoy son estándar en los sitios de travel-tech mejor valorados (Airbnb, Booking Editorial, Up&Go, Journee): **scroll-reveal**, **acento cálido** que rompe el monocromo slate, **Footer y Testimonials completos**, y **contenido 100% data-driven** (sin cards ni iconos hardcodeados).

**Elementos que se mantienen intactos (ya eran de alto valor):**
- Glassmorphism funcional en Navbar, buscador hero y widget.
- Curvas custom `rounded-[2rem]/[2.5rem]/[3rem]` como firma visual.
- Grid asimétrico 3+2/2+3 en Destinations.
- Overlap Hero→Stats (`-mt-20/-mt-28`) como ancla visual.

**Elementos nuevos o corregidos:**
- Acento **`amber-500`** puntual (CTA secundarios, badges, hover de precio) — rompe el "todo-slate" sin perder sobriedad.
- Scroll-reveal con `IntersectionObserver` (sección 5).
- Footer y Testimonials como componentes reales, no comentarios pendientes.
- Contenido de `Destinations` y `HowItWorks` 100% `.map()`-driven.
- i18n completo (sin strings en inglés fuera de `t()`).

---

## 1. Filosofía de diseño

Aura mantiene el **carácter corporativo-limpio de travel-tech premium**: superficies amplias, jerarquía editorial marcada, esquema **light dominante** (`bg-[#F8F9FA]`) que se rompe en dos puntos focales oscuros — el hero fotográfico y los overlays de tarjeta — ambos anclados en `slate-900`. La paleta sigue evitando el negro absoluto, pero suma un **acento cálido** (`amber-500`) usado con disciplina: solo en badges de precio, subrayados de hover y el punto focal del CTA secundario. Es el tipo de detalle que en investigación de UI se asocia a mayor tasa de clic sin sacrificar la sobriedad editorial.

Las **esquinas redondeadas siguen siendo agresivas y deliberadas** — `rounded-full` para píldoras, `rounded-2xl` para dropdowns, y la firma `rounded-[2rem]/[2.5rem]/[3rem]` para tarjetas, imagen grande y el nuevo Footer.

El **glassmorphism sigue siendo central**, y se extiende ahora al nuevo bloque de Testimonials (`backdrop-blur-md` sobre imagen de fondo desenfocada) para dar continuidad visual entre secciones.

El **grid asimétrico** de Destinations se conserva (`md:grid-cols-5`, patrón 3+2/2+3), y se replica el mismo lenguaje en el nuevo bloque de Tour Packages con un patrón `2+2+1` en bento-grid — recurso muy valorado actualmente por su sensación de "curaduría" más que de catálogo plano.

> **Nota de tema:** sigue siendo light en secciones de contenido y dark solo en superficies sobre fotografía. Ahora se suma un tercer punto dark controlado: el Footer, que cierra el recorrido visual con el mismo `slate-900` del Hero — dando simetría al scroll completo (abre oscuro, cierra oscuro, todo el medio es luminoso).

---

## 2. Paleta de colores y tipografía

### Colores

| Token | Uso |
|---|---|
| `bg-[#F8F9FA]` | fondo global del tema |
| `slate-900` | texto primario, títulos, Footer, overlays — **token único de texto** (se elimina `neutral-900` residual) |
| `slate-500` / `slate-600` | texto secundario, labels uppercase |
| `slate-100` / `slate-50` | hover backgrounds |
| `slate-200/50` / `slate-300/60` | sombras tintadas |
| **`amber-500`** *(nuevo)* | badges de precio, subrayado hover en links, punto focal CTA secundario — **acento único, uso restringido a <5% de la superficie** |
| `white` | botones sobre superficies oscuras |
| `white/10` / `white/20` / `white/80` | glassmorphism borders/fondos |
| `from-slate-900/60 via-slate-900/20 to-slate-900/60` | overlay hero |
| `from-slate-900/90 via-slate-900/40 to-transparent` | overlays de tarjeta y widget |

### Tipografía

- **Familia:** `font-sans` (stack Tailwind), consistente en todo el tema.
- **Pesos:** `font-extrabold` (títulos), `font-bold` (subtítulos, nav), `font-semibold` (labels, filtros), `font-medium` (subtítulo hero). Sin `font-light`.
- **Tamaños:**
  - H1 hero: `text-4xl sm:text-5xl md:text-7xl leading-[1.05] tracking-tight`
  - H2 secciones: `text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight`
  - Stats value: `text-3xl sm:text-4xl md:text-5xl font-extrabold`
  - Body grande: `text-base sm:text-lg md:text-2xl`
  - Body: `text-base md:text-lg`
  - Labels uppercase: `text-sm tracking-widest uppercase`

---

## 3. Layout general

```
<div min-h-screen bg-[#F8F9FA] text-slate-900>   ← token de texto unificado
  Navbar        (absolute; z-50)
  Hero          (min-h-[750px] / md:h-[900px])
  Stats         (overlay: -mt-20 md:-mt-28)
  Destinations  (max-w-[1400px] mx-auto)
  TourPackages  (max-w-[1400px] mx-auto)   ← nuevo, bento-grid 2+2+1
  HowItWorks    (max-w-[1400px] mx-auto)
  Testimonials  (full-bleed, glass sobre foto)   ← nuevo
  Footer        (full-bleed, bg-slate-900)        ← nuevo, cierra la simetría dark-light-dark
</div>
```

- **Container:** `max-w-[1400px] mx-auto` en todas las secciones de contenido; Navbar, Hero, Testimonials y Footer son full-bleed.
- **Spacing:** overlap Hero→Stats intencional; resto de secciones con `py-16 md:py-24` consistente (incluye las dos secciones nuevas, alineadas al patrón existente en vez de inventar un ritmo nuevo).

---

## 4. Inventario de componentes

### 4.1 Navbar — sin cambios estructurales
Se mantiene glassmorphism, píldora central y dropdown móvil. Único ajuste: el botón de login usa `hover:text-amber-500` en el estado de foco para introducir el acento sin tocar la jerarquía de color existente.

### 4.2 Hero — corrección de deuda
- `px-10 py-4.5 md:py-4` → **corregido a `px-10 py-4 md:py-4`** (elimina la clase inválida `py-4.5` fuera de escala Tailwind v3).
- `px-0 md:px-1 lg:px-1` residual en `<header>` → **eliminado** (era leftover de refactor sin efecto visual real).
- Resto de estructura (buscador de cristal `backdrop-blur-2xl`, overlay `slate-900`) intacta.

### 4.3 Stats — sin cambios visuales, corrección de tipado
- `statsData: any[]` → tipado con interfaz `StatItem { id: string; value: string; label: string }`.
- `key={index}` → `key={stat.id}`.

### 4.4 Destinations — data-driven
- Las 4 cards hardcodeadas pasan a `.map()` sobre `cards.slice(0, N)`, soportando 3, 4 o 5 destinos sin romper el grid (el patrón 3+2/2+3 se calcula por posición módulo, no por índice fijo).
- Se mantiene el zoom agresivo `group-hover:scale-110` — es el detalle que más "premium" se percibe en las pruebas de usuario de este tipo de card.

### 4.5 TourPackages *(nuevo)*
**Rol:** bloque de paquetes destacados en bento-grid, entre Destinations y HowItWorks — el recurso más valorado en sitios de travel-tech para elevar conversión, hoy ausente en el tema original.

- Grid `md:grid-cols-4 md:grid-rows-2`: una card grande (`col-span-2 row-span-2`) + tres cards estándar.
- Cada card: imagen + overlay + **badge de precio** en `bg-amber-500 text-slate-900 rounded-full px-4 py-1 font-bold` — único punto donde el acento cálido aparece como superficie sólida, no solo como detalle.
- Mismas curvas `rounded-[2rem]` y mismo `group-hover:scale-110` que Destinations, para coherencia de familia visual.
- `t()`: `Aura.packages` con `.title`, `.subtitle`, `.items[]` (`.name`, `.price`, `.duration`).

### 4.6 HowItWorks — data-driven
- `icons` array indexado por posición → diccionario nombrado `iconsMap[step.icon]`, evitando el `undefined` si `steps.length > 4`.
- Widget mockup: `"Date"`, `"Budget"`, `"Search"` pasan a `t('Aura.howItWorks.widget.date')`, etc. — i18n completo, sin strings sueltos.

### 4.7 Testimonials *(nuevo)*
**Rol:** prueba social sobre foto desenfocada, mismo lenguaje glass que el Hero, para no introducir un patrón visual ajeno al tema.

- Fondo: foto de destino con `backdrop-blur-sm` + overlay `from-slate-900/70`.
- Cards de testimonio: `bg-white/10 backdrop-blur-md border border-white/20 rounded-[2rem]` en carrusel horizontal simple (sin librería externa, `overflow-x-auto snap-x`).
- `t()`: `Aura.testimonials` con `.title` y `.items[]` (`.quote`, `.author`, `.role`).

### 4.8 Footer *(nuevo — resuelve deuda declarada)*
**Rol:** cierre del tema, antes ausente y marcado como deuda explícita en el `index.tsx` original.

- `bg-slate-900 text-white rounded-t-[2rem] md:rounded-t-[3rem]` — retoma la curva firma del tema, ahora invertida hacia arriba, dando simetría con el `rounded-b-[3rem]` del Hero.
- 4 columnas: marca + tagline, navegación, contacto, newsletter (input `bg-white/10 backdrop-blur-md rounded-full`).
- `t()`: `Aura.footer` con `.about`, `.links[]`, `.contact`, `.newsletter.{placeholder,button}`.

---

## 5. Animaciones y transiciones

| Mecanismo | Dónde | Tipo |
|---|---|---|
| `hover:scale-105` / `active:scale-95` | Navbar, Hero CTA, widget | micro-interacción |
| `hover:-translate-y-3` | Stats, TourPackages | elevación |
| `group-hover:scale-110` | Destinations, TourPackages | reveal editorial |
| `group-hover:scale-105` | HowItWorks imagen inmersiva | reveal suave |
| `group-hover:translate-y-0` | contenido de cards | content reveal |
| **`IntersectionObserver` + `opacity-0 translate-y-8` → `opacity-100 translate-y-0`** *(nuevo)* | Stats, Destinations, TourPackages, Testimonials al entrar en viewport | **scroll-reveal** — el recurso de animación más asociado hoy a percepción de "sitio premium" |
| `animate-in fade-in slide-in-from-top-4` | Navbar mobile dropdown | entrance (requiere `tailwindcss-animate`, ya validado como dependencia instalada) |
| `shadow-slate-200/50` / `shadow-slate-300/60` | Stats, TourPackages | sombras tintadas |

El scroll-reveal se implementa con un único hook reutilizable (`useInView`) en vez de una librería como `framer-motion`, manteniendo el bundle liviano — coherente con la filosofía original del tema de no depender de librerías de animación pesadas.

---

## 6. Deudas resueltas (frente al documento original)

| # | Deuda original | Resolución en Aura |
|---|---|---|
| 1 | `py-4.5` inválido en Hero CTA | Corregido a `py-4` |
| 2 | `text-neutral-900` vs `slate-900` | Unificado a `slate-900` en el wrapper |
| 3 | Destinations con 4 cards hardcodeadas | `.map()` sobre array dinámico |
| 4 | `icons` de HowItWorks indexado por posición | Diccionario nombrado por `step.icon` |
| 5 | `key={index}` en Stats y HowItWorks | `key` estable por `id` |
| 6 | `statsData: any[]`, `step: any` | Interfaces tipadas |
| 7 | Strings sin `t()` en widget | i18n completo |
| 8 | `px-1` residual en Hero | Eliminado |
| 9 | Comentarios de iteración en `index.tsx` | Limpiados |
| 10 | Footer declarado como deuda, ausente | Componente completo (4.8) |
| 11 | Sin Tour Packages ni Testimonials | Componentes nuevos (4.5, 4.7) |
| 12 | Sin scroll-triggered animations | `useInView` + reveal (sección 5) |

---

## 7. Rutas de referencia sugeridas

- `src/themes/Aura/index.tsx`
- `src/themes/Aura/components/Navbar.tsx`
- `src/themes/Aura/components/Hero.tsx`
- `src/themes/Aura/components/Stats.tsx`
- `src/themes/Aura/components/Destinations.tsx`
- `src/themes/Aura/components/TourPackages.tsx` *(nuevo)*
- `src/themes/Aura/components/HowItWorks.tsx`
- `src/themes/Aura/components/Testimonials.tsx` *(nuevo)*
- `src/themes/Aura/components/Footer.tsx` *(nuevo)*
- `src/themes/Aura/hooks/useInView.ts` *(nuevo)*
