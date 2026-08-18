# Indotravi — Documento de Diseño

> Tema del portfolio travel-portfolio. Documento de arquitectura visual e inventario de componentes.
> Ruta base: `src/themes/Indotravi/`
> Stack: React 19 + Vite + Tailwind v3 · i18n vía `useTranslation()` · imágenes vía `sharedImages`

---

## 1. Filosofía de diseño

Indotravi apunta a un **carácter corporativo-limpio de travel-tech premium** (línea Booking/Airbnb refinado): superficies amplias, jerarquía editorial muy marcada y un **esquema light dominante** (`bg-[#F8F9FA]` en el wrapper del tema, tarjetas `bg-white` sobre fondo casi-blanco) que se rompe deliberadamente en dos puntos focales oscuros — el hero fotográfico y los overlays de las tarjetas de destino, ambos con `from-slate-900/...` para anclar el contenido blanco. La paleta no es un neutro "gris corporativo": es **`slate` como protagonista** (slate-900 para texto principal, slate-500/600 para secundarios, slate-100/50 para hover backgrounds), evitando el "negro absoluto" — un comentario explícito en `Stats.tsx` lo confirma: *"Color semántico slate-900 en lugar de negro absoluto"*.

Las **esquinas redondeadas son agresivas y deliberadas**. No se usan `rounded-3xl` estándar como valor único: hay una jerarquía de radiación — `rounded-full` para píldoras/buttons/center-nav, `rounded-2xl` para dropdowns, `rounded-3xl` para hover backgrounds, y la **firma visual del tema** son los valores custom `rounded-[2rem]`, `rounded-[2.5rem]` y `rounded-[3rem]` para tarjetas e imagen grande, a lo que se suma `rounded-b-[2rem]/md:rounded-b-[3rem]` para curvar la parte inferior del hero. Es una micro-escala editorial custom, no el sistema de radios estándar de Tailwind.

El **glassmorphism es central, no decorativo**: `backdrop-blur` aparece en Navbar (contenedor `backdrop-blur-md`, píldora central `backdrop-blur-md`, hamburger `backdrop-blur-md`, dropdown `backdrop-blur-2xl`), en el buscador del hero (`backdrop-blur-2xl`), en los chips-icon de las tarjetas (`backdrop-blur-md`) y en el widget mockup de `HowItWorks` (`backdrop-blur-xl`).

El **grid asimétrico** se confirma en `Destinations.tsx` con `md:grid-cols-5` y patrón 3+2 / 2+3 invertido entre filas. En `HowItWorks` la asimetría es **vertical**: dos columnas 50/50 (`lg:flex-row`, `lg:w-1/2`) con imagen inmersiva a la izquierda y steps a la derecha.

> **Nota:** el tema es light en sus secciones "contenido" (Stats, Destinations, HowItWorks) y dark solo en superficies superpuestas a fotografías (Hero, Navbar encima del hero, overlays de tarjetas y widget). No hay dark-mode global; es dark contextual al hero.

---

## 2. Paleta de colores y tipografía

### Colores

| Token | Uso |
|---|---|
| `bg-[#F8F9FA]` (hex literal) | fondo global del tema |
| `text-neutral-900` | color base de texto en wrapper (coexiste con slate — ver observaciones) |
| `slate-900` | toda la paleta de texto primaria, títulos, botón-no-hover del login, divisor cabecera |
| `slate-500` / `slate-600` | texto secundario, labels uppercase |
| `slate-100` / `slate-50` | hover backgrounds |
| `slate-200/50` / `slate-300/60` | sombras tintadas |
| `slate-950/95` | dropdown móvil |
| `white` | login button y searcher button |
| `white/10` / `white/20` / `white/80` | glassmorphism borders/fondos |
| `from-slate-900/60 via-slate-900/20 to-slate-900/60` | overlay gradient del hero |
| `from-slate-900/90 via-slate-900/40 to-transparent` | overlays de tarjetas y widget |

### Tipografía

- **Familia:** `font-sans` (Tailwind default stack) — declarado explícitamente en `index.tsx`, `Navbar`, `Hero`, `Destinations`, `HowItWorks`.
- **Pesos dominantes:** `font-extrabold` (títulos grandes), `font-bold` (subtítulos, Nav), `font-semibold` (labels, search filters), `font-medium` (subtítulo hero). No hay `font-light`.
- **Tamaños dominantes:**
  - H1 hero: `text-4xl sm:text-5xl md:text-7xl` con `leading-[1.05]` y `tracking-tight`
  - H2 secciones: `text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight`
  - Stats value: `text-3xl sm:text-4xl md:text-5xl font-extrabold`
  - Body grande / subtítulo hero: `text-base sm:text-lg md:text-2xl`
  - Body: `text-base md:text-lg`
  - Labels uppercase: `text-sm` con `tracking-widest uppercase`
  - Counter flags: `text-xs sm:text-sm md:text-base`

---

## 3. Layout general

Composición vertical secuencia (en `index.tsx`):

```
<div min-h-screen bg-[#F8F9FA]>   ← wrapper light full-bleed
  Navbar   (absolute; z-50 — se superpone al hero)
  Hero     (header; min-h-[750px] / md:h-[900px])
  Stats    (overlay: -mt-20 md:-mt-28 — "monta" sobre la curva inferior del hero)
  Destinations  (max-w-[1400px] mx-auto)
  HowItWorks    (max-w-[1400px] mx-auto)
</div>
```

- **Container:** hay un ancho máximo consistente `max-w-[1400px] mx-auto` compartido por Stats, Destinations y HowItWorks. Navbar es full-bleed (`w-full px-4 md:px-10`); Hero es full-bleed (con `px-0 md:px-1` prácticamente nulo); Stats rompe el container con `px-4 md:px-10` y margin-top negativo para anclar sobre la curva del hero.
- **Spacing vertical:** entre Hero→Stats hay overlap intencional (`-mt-20 md:-mt-28`); Stats→Destinations se separa con `mb-24`; secciones internas usan `py-16` (Destinations) y `py-16 md:py-24` (HowItWorks).
- **No es full-bleed absoluto:** el `max-w-[1400px]` acota el contenido, pero la fotografía del hero y el Navbar sí son full-bleed.

---

## 4. Inventario de componentes

### 4.1 Navbar
**Ruta:** `src/themes/Indotravi/components/Navbar.tsx`

- **Rol:** barra de navegación superior, posicionada absoluta sobre el Hero.
- **Estructura semántica:**
  - `<nav>` outer (absolute, full-width, backdrop-blur) → `<div relative flex justify-between>` con 3 hijos:
    - Logo (izquierda, `flex-1`) → `<a>` con **`<BrandLogo variant="horizontal" className="h-12 md:h-14 w-auto drop-shadow-md" />`** ← **CONFIRMADO: importa BrandLogo** (único tema que lo hace)
    - Píldora central de links (centrado absoluto: `left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`, `backdrop-blur-md`)
    - Acciones derecha (`flex-1`): login button + toggle móvil
  - **Mobile dropdown:** render condicional sobre `isMobileMenuOpen` con `animate-in fade-in slide-in-from-top-4`
- **Clases Tailwind clave:**
  - `absolute top-0 left-0 w-full z-50`
  - `bg-slate-900/30 backdrop-blur-md border-b border-white/10` — **backdrop-blur confirmado en el nav entero**
  - `hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ... rounded-full`
  - `bg-white/10 backdrop-blur-md ... rounded-full border border-white/20` — **glass píldora central**
  - `bg-white text-slate-900 px-8 py-3 rounded-full font-bold`
  - Dropdown: `bg-slate-950/95 backdrop-blur-2xl ... rounded-2xl ... animate-in fade-in slide-in-from-top-4`
  - Hover logo: `hover:scale-105` (sobre `<a>` parent)
- **`t()` consumidas:** `Indotravi.nav` con `.about`, `.services`, `.tour`, `.contact`, `.login`
- **`sharedImages`:** no consume.
- **Estado local:** `useState(false)` para `isMobileMenuOpen`.
- **Animaciones:** `hover:scale-105` en logo y login, `transition-colors` en links, `active:scale-95` en login.

### 4.2 Hero
**Ruta:** `src/themes/Indotravi/components/Hero.tsx`

- **Rol:** hero fotográfico full-bleed con título, subtítulo y **buscador de cristal** (3 filtros + CTA).
- **Estructura semántica:**
  - `<header>` → `<div>` photography container (`rounded-b-[3rem]`, `overflow-hidden`, `bg-cover`, fondo vía `themeData.Indotravi.heroImageUrl`)
    - Overlay gradient `from-slate-900/60 via-slate-900/20 to-slate-900/60`
    - Content wrapper (`z-10`, `max-w-5xl`) con `<h1>`, `<p>` subtítulo
    - **Search bar (buscador de cristal):** `bg-white/10 md:bg-white/20 backdrop-blur-2xl border border-white/20 rounded-3xl md:rounded-full` con 3 filtros (date, budget, guest) en `divide-x`/`divide-y` y un CTA blanco
- **Clases Tailwind clave:**
  - `relative w-full min-h-[750px] md:h-[900px] rounded-b-[2rem] md:rounded-b-[3rem] overflow-hidden bg-cover bg-center`
  - `bg-gradient-to-b from-slate-900/60 via-slate-900/20 to-slate-900/60 z-0` — overlay
  - `max-w-5xl ... text-center ... drop-shadow-lg` — contenido
  - **`bg-white/10 md:bg-white/20 backdrop-blur-2xl border border-white/20 rounded-3xl md:rounded-full p-2.5`** — **backdrop-blur-2xl confirmado en el buscador**
  - `divide-y md:divide-y-0 md:divide-x divide-white/20`
  - Filtros: `hover:bg-white/10 md:hover:bg-white/5` con icono `group-hover:scale-110` y chevron `group-hover:translate-y-0.5`
  - CTA: `bg-white text-slate-900 rounded-full ... px-10 py-4.5` (ver observaciones: `py-4.5` no existe en Tailwind v3 por defecto)
- **`t()` consumidas:** `Indotravi.hero` con `.title`, `.subtitle`, `.search.{date,budget,guest,button}`
- **`sharedImages`:** no consume — usa `themeData.Indotravi.heroImageUrl` para el background.
- **Deuda visible:** `py-4.5` en CTA no es clase válida en Tailwind v3 default; verificación pendiente.

### 4.3 Stats
**Ruta:** `src/themes/Indotravi/components/Stats.tsx`

- **Rol:** grid de 4 métricas que se "monta" sobre la curva inferior del Hero (overlap intencional vía margin-top negativo).
- **Estructura semántica:**
  - `<section z-20>` con `-mt-20 md:-mt-28` — ancla sobre curva hero
  - `<div grid grid-cols-2 md:grid-cols-4>` con 4 cards blancas
  - Por card: `<h3>` value uppercase + `<p>` label uppercase tracking
- **Clases Tailwind clave:**
  - `relative z-20 w-full px-4 md:px-10 -mt-20 md:-mt-28 mb-24 max-w-[1400px] mx-auto`
  - `grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6`
  - Card: `bg-white rounded-[2rem] p-6 md:p-10 shadow-xl shadow-slate-200/50 hover:-translate-y-3 hover:shadow-2xl hover:shadow-slate-300/60 transition-all duration-300 border border-slate-50`
  - Value: `text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight`
  - Label: `text-xs sm:text-sm md:text-base text-slate-500 font-semibold uppercase tracking-wider`
- **`t()` consumidas:** `Indotravi.stats` (array); por item `.value` y `.label`. Tipado "lax": `statsData: any[]`.
- **`sharedImages`:** no consume.
- **Iteración por `.map`** con `index` como key (ver observaciones).
- **Animaciones:** `hover:-translate-y-3` (elevación), shadow intensifica, `transition-all duration-300`. No hay animate-in/fade-in al montar.

### 4.4 Destinations
**Ruta:** `src/themes/Indotravi/components/Destinations.tsx`

- **Rol:** showcase editorial de destinos con **grid asimétrico** 3+2 / 2+3 invertido.
- **Estructura semántica:**
  - `<section max-w-[1400px] mx-auto>` →
    - Header: línea decorativa (`h-[2px] w-12 bg-slate-900` + label uppercase) + `<h2>` + `<p>` descripción a la derecha
    - **Grid asimétrico:** `<div grid grid-cols-1 md:grid-cols-5>`
      - Fila 1: card 3-cols + card 2-cols
      - Fila 2: card 2-cols + card 3-cols (invertida deliberadamente)
      - Cada card: imagen + overlay degradado + reveal content al hover (icono "arrow" aparece)
- **Clases Tailwind clave:**
  - `w-full max-w-[1400px] mx-auto px-4 md:px-10 py-16`
  - Header: `flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16`; etiqueta: `h-[2px] w-12 bg-slate-900` + `tracking-widest uppercase`
  - **`grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6`** — **grid asimétrico confirmado (5 col custom)**
  - Card ancha: `md:col-span-3 h-[300px] sm:h-[400px] rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl`
  - Card estrecha: `md:col-span-2` (mismas clases)
  - Overlay: `absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500`
  - Reveal content: `absolute inset-0 p-8 md:p-10 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500`
  - Chip icono reveal: `w-12 h-12 rounded-full bg-white/20 backdrop-blur-md ... opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500 delay-100`
  - Imagen: `group-hover:scale-110 transition-transform duration-700 ease-out` (**scale-110, no 105 — zoom agresivo**)
- **`t()` consumidas:** `Indotravi.destinations` con `.subtitle`, `.title`, `.description` y `.cards[]` (con `.location`, `.title`)
- **`sharedImages`:** consume `sharedImages.destinations` (array indexado `images[0..3]`).
- **Deuda visible:** 4 cards hardcodeadas estructuralmente (no `.map`). Si el diccionario trae 3 o 5 cards, se rompe o queda espacio muerto.

### 4.5 HowItWorks
**Ruta:** `src/themes/Indotravi/components/HowItWorks.tsx`

- **Rol:** sección bipartita "cómo funciona" con narrativa inmersiva (imagen + widget mockup glass) y lista de pasos interactivos.
- **Estructura semántica:**
  - `<section max-w-[1400px] mx-auto flex flex-col lg:flex-row>` →
    - Columna izquierda (`lg:w-1/2`): imagen inmersiva `rounded-[3rem]` con overlay degradado inferior; **widget mockup glassmorphism** simulando search bar y un texto `overlayText` superpuesto
    - Columna derecha (`lg:w-1/2`): line-label + `<h2>` + lista de steps iterados por `.map` con icono en caja blanca que "salta" a slate-900 en hover
- **Clases Tailwind clave:**
  - `w-full max-w-[1400px] mx-auto px-4 md:px-10 py-16 md:py-24 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center` — **asimetría vertical: 2 columnas 50/50**
  - Col imagen: `lg:w-1/2 relative h-[600px] md:h-[750px] rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200/50 group`
  - Widget glass: `bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl md:rounded-full p-1.5 max-w-md shadow-2xl` — **backdrop-blur-xl confirmado**
  - Header line-label: `h-[2px] w-12 bg-slate-900` + `tracking-widest uppercase`
  - Step item: `flex items-start gap-6 group cursor-pointer p-4 md:p-6 -mx-4 md:-mx-6 rounded-3xl hover:bg-slate-50 transition-colors duration-300`
  - Icon box: `w-14 h-14 ... rounded-2xl bg-white border border-slate-100 ... group-hover:bg-slate-900 group-hover:text-white group-hover:scale-110 group-hover:shadow-lg transition-all duration-300 ease-out`
  - Imagen: `group-hover:scale-105 transition-transform duration-700 ease-out`
- **`t()` consumidas:** `Indotravi.howItWorks` con `.subtitle`, `.title`, `.steps[]` (`.title`, `.desc`) y `.overlayText`
- **`sharedImages`:** consume `sharedImages.narrative[0]` como `mainImage`.
- **`icons` array:** hardcodeo de 4 SVG inline (search, book, card, pin) indexado por `index` del `.map`. Si `steps.length > 4` se rompe.
- **Hardcoded strings:** el widget mockup tiene `"Date"`, `"Budget"`, `"Search"` en inglés literal (no pasan por `t()`).

---

## 5. Animaciones y transiciones

| Mecanismo | Dónde | Tipo |
|---|---|---|
| `hover:scale-105` | Navbar (logo, login), Hero (CTA searcher), HowItWorks (widget button) | micro-interaction |
| `active:scale-95` | Navbar login, Hero searcher CTA, HowItWorks widget button | feedback presión |
| `hover:-translate-y-3` | Stats cards | elevación al hover |
| `group-hover:scale-110` | Destinations imágenes (**scale agresivo**) | reveal editorial |
| `group-hover:scale-105` | HowItWorks imagen inmersiva | subtly reveal suave |
| `group-hover:translate-y-0` + `translate-y-4` | Destinations contenido | content reveal |
| `group-hover:opacity-100` + `-translate-x-4 group-hover:translate-x-0` | chip flecha en Destinations | entrance icono |
| `group-hover:scale-110` + color swap a slate-900 | icon box de HowItWorks | salto + dark mode |
| `group-hover/btn:opacity-100` | widget HowItWorks (nested group) | nested hover para chevrones |
| `transition-colors/all/transform/opacity` | generalizado | durations 300–700ms |
| `duration-500 delay-100` | reveals Destinations | stagger con delay |
| `animate-in fade-in slide-in-from-top-4` | Navbar mobile dropdown | entrance animation (requiere plugin `tailwindcss-animate` — ver observaciones) |
| `drop-shadow-lg/md` + `shadow-md/xl/2xl` | jerarquía de elevación | sistema de sombras |
| `shadow-slate-200/50` / `shadow-slate-300/60` | Stats y HowItWorks | sombras **tintadas** (no neutral-black) |

**No hay parallax, scroll-triggered animations, ni keyframes personalizados.** Todas las animaciones son hover/active-driven. No hay `intersection-observer` ni `framer-motion`.

---

## 6. Observaciones específicas del tema

### Confirmaciones frente al contexto previo

1. **Indotravi importa `BrandLogo`** → CONFIRMADO en `Navbar.tsx`: `<BrandLogo variant="horizontal" className="h-12 md:h-14 w-auto drop-shadow-md" />`. Es el **único** componente del tema que lo importa.
2. **No tiene `Footer.tsx`** → CONFIRMADO: la carpeta `components/` contiene únicamente `Navbar`, `Hero`, `Stats`, `Destinations`, `HowItWorks` (5 archivos). El `index.tsx` deja un comentario explícito: `{/* Tour Packages, Testimonials, y Footer irán aquí luego */}` — **el Footer es deuda declarada**, no omisión accidental. Coherente con diccionario: no hay claves `Indotravi.footer.*` consumidas.

### Deudas técnicas y rarezas detectadas

3. **`py-4.5` en Hero CTA:** `px-10 py-4.5 md:py-4` — la clase `py-4.5` no es parte de la escala por defecto de Tailwind v3.1+ (salta 4→5). Sólo funcionaría si `tailwind.config.js` definió spacing extendido. **Verificar config** — puede ser cls silenciada que no aplica estilos.
4. **`text-neutral-900` vs `slate-900`:** el wrapper de `index.tsx` declara `text-neutral-900` como color base, pero todos los componentes hijos usan `slate-900` explícitamente. **Inconsistencia semántica mínima** — el `neutral-900` queda virtualmente nunca aplicado.
5. **Destinations:** hardcodedo de 4 cards estructuralmente en JSX (no `.map()`). Si el diccionario trae 3 o 5 cards, se rompe. **Acoplamiento frágil length-dictado-por-código.**
6. **HowItWorks:** `icons` array hardcodeado con 4 SVGs indexados por `index` del `.map`. Si `steps` tiene más de 4 pasos, `icons[index]` devuelve undefined y rompe el render.
7. **`key={index}` en `.map()`** de Stats y HowItWorks — anti-patrón cuando los items pueden reordenarse.
8. **`statsData: any[]` y `step: any`** — tipado explícito `any`. Tipado flojo del payload i18n.
9. **Strings hardcodeados en widget HowItWorks:** `"Date"`, `"Budget"`, `"Search"` no pasan por `t()` — **el widget está fuera del sistema i18n**.
10. **`px-0 md:px-1 lg:px-1` en el `<header>` Hero:** el padding `px-1` (un solo píxel) es prácticamente nulo. Probablemente leftover de refactor.
11. **Comentarios `// <-- Nueva importación` / `// <-- Inyectado`** en `index.tsx`: markers de iteración incremental de desarrollo. Deberían limpiarse.
12. **`backdrop-blur` y `animate-in`:** el dropdown móvil de Navbar usa `animate-in fade-in slide-in-from-top-4` (clases del plugin `tailwindcss-animate`, no core de Tailwind). **Verificar dependencia instalada** — si no, las clases se ignoran silenciosamente.

---

## 7. Oportunidades de mejora

1. **Extraer `Destinations` e `HowItWorks` a render data-driven** (`.map()` + length dinámica) en lugar de cards/iconos hardcodeados. `icons` como diccionario nombrado (no array indexado) y `cards.slice(0, N)` render con `.map`. Reduce acoplamiento y permite variar contenido desde el diccionario.
2. **Reemplazar `py-4.5` por `py-4` o `py-5`** en Hero searcher CTA, o definir el spacing 4.5 en `tailwind.config.js`. Hoy la regla se ignora y el botón usa `md:py-4` — invisible en desktop pero roto en mobile.
3. **I18n completo del widget `HowItWorks`:** los strings `"Date"`, `"Budget"`, `"Search"` están fuera de `t()`. Añadir claves `Indotravi.howItWorks.widget.{date,budget,search}` — mantiene una sola fuente de verdad para los labels del buscador.
4. **Sistema de `key` estable** en `.map()` de Stats (clave única) y HowItWorks (por título o id del step). `key={index}` hoy es inofensivo pero frágil si los items se vuelven editables o reordenables.
5. **Anclar el tema a un dark/light plan:** declarar tokens tematizados (p.ej. `--indotravi-text`, `--indotravi-surface`) en `:root` del tema, o al menos alinear el wrapper a `text-slate-900` para centralizar la paleta slate. Facilita futuro multi-theme dentro del mismo tema.
6. **(Bonus) Eliminar comentarios `// <-- Nueva importación` y `// <-- Inyectado`** de `index.tsx`. Son ruido de iteración incremental que no aporta al lector del tema final.

---

## 8. Rutas absolutas de referencia

- `src\themes\Indotravi\index.tsx` — entry del tema
- `src\themes\Indotravi\components\Navbar.tsx` — **único que importa BrandLogo**
- `src\themes\Indotravi\components\Hero.tsx`
- `src\themes\Indotravi\components\Stats.tsx`
- `src\themes\Indotravi\components\Destinations.tsx`
- `src\themes\Indotravi\components\HowItWorks.tsx`
- **(Falta) `src\themes\Indotravi\components\Footer.tsx`** — deuda declarada en el `index.tsx`
