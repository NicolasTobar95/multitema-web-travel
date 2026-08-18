# PacificNW — Documento de Diseño

> Tema del portfolio travel-portfolio. Documento de arquitectura visual e inventario de componentes.
> Ruta base: `src/themes/PacificNW/`
> Stack: React 19 + Vite + Tailwind v3 · i18n vía `useTranslation()` · imágenes vía `sharedImages`

---

## 1. Filosofía de diseño

PacificNW es una pieza **editorial de travel-log**, más cercana al lenguaje de revista impresa (estilo *National Geographic* o *Sidetracked*) que al de landing product. La columna vertebral es el **contraste tipográfico extremo**: un `font-display` condensado (Bebas Neue) usado en tamaños gigantes — `text-7xl` hasta `text-[140px]` en el Hero — contra un cuerpo de texto deliberadamente pequeño (`text-xs`, `text-sm`) con `tracking-widest` y `uppercase` que evoca etiquetas de archivo, coordenadas GPS y captions de foto. La leading es agresiva (`leading-[0.85]`, `leading-none`) para que los títulos pesen como bloques visuales macizos.

La paleta es **monocromática neutra con un único acento rojo**. Dominan `bg-white`, `bg-black/40`–`bg-black/60` (overlays sobre fotos) y una familia de grises `text-neutral-300/400/500/600/800/900`. El acento vehicular es `red-500`/`red-400`/`red-600` — apenas como border en los nodos de la timeline, el badge "+" del autor y los hover states. **No hay tonos amber/stone**: todo el calor cromático viene de las fotografías, no del CSS. El fondo es siempre `bg-white` o foto con overlay negro.

El **layout en zig-zag de Timeline** — parada 1 a la izquierda (`md:flex-row`), parada 2 a la derecha (`md:flex-row-reverse`) — se separa con una línea vertical central `border-l-2 border-dashed` y nodos circulares `bg-white border-4 border-red-500`. Es el patrón más original del tema: convierte la sección de paradas en algo visualmente narrado, no editorial estándar.

---

## 2. Paleta de colores y tipografía

### Colores

| Uso | Clases Tailwind |
|---|---|
| Fondo página | `bg-white` |
| Overlays sobre foto | `bg-black/40` (Hero), `bg-black/60` (Olympic) |
| Texto principal claro | `text-white` (Navbar, Hero, Olympic) |
| Familia neutra | `text-neutral-900/800/600/500/400/300` |
| Acento vehicular | `red-500` (timeline nodos, badge "+"), `red-400` (hover navbar), `red-600` (hover footer) |
| Bordes sutiles | `border-neutral-100/300`, `border-white/20/50` |
| Stroke SVG hardcoded | `#EF4444` (Navbar), `#171717` (Footer) — **literales que rompen la paleta Tailwind** |

### Tipografía

- **`font-display`** (Bebas Neue) — aplicado a todos los títulos grandes y stats. Es la voz dominante.
- **`font-sans`** — subtítulos, párrafos, navbar, links (cuerpo de redacción).
- **`font-serif italic`** — usado UNA sola vez, en el subtítulo "Mount Garibaldi" de Timeline. Única concesión clásica-editorial.
- **Tamaños dominantes:** `text-[140px]`, `text-7xl`, `text-5xl`, `text-4xl`, `text-3xl`, `text-base`, `text-sm`, `text-xs`, `text-[10px]`, `text-[9px]`
- **Tracking:** `tracking-widest` (etiquetas), `tracking-[0.2em]` (brand footer)
- **Leading:** `leading-[0.85]` (hero h1), `leading-none` (display), `leading-relaxed` (body)

---

## 3. Layout general

Ensamblado lineal y **full-bleed** en `index.tsx`:

```
<div min-h-screen bg-white font-sans text-neutral-900>
  Navbar    (absolute, superpuesto al Hero, z-20)
  Hero      (h-screen w-full, padding px-10 md:px-24)
  Timeline  (max-w-7xl mx-auto, px-6 md:px-12, py-24)
  Olympic   (max-w-7xl mx-auto, px-6 md:px-12, py-32 md:py-48, fondo foto)
  Author    (max-w-4xl mx-auto, px-6 md:px-12, py-24)
  Footer    (max-w-[1400px] + max-w-7xl, px-6 md:px-12, pt-24 pb-12)
```

**Patrones observados:**

- **No hay container global.** Cada sección trae su propio `max-w-*` y padding — hay **3 anchos distintos**: `max-w-4xl` (Author), `max-w-7xl` (Timeline, Olympic, footer bottom), `max-w-[1400px]` (footer top). Inconsistencia intencional o deuda.
- **Spacing vertical variable:** `py-24`, `py-32 md:py-48`, `pt-24 pb-12`. Sin escala uniforme. Timeline internamente usa `gap-32` entre paradas — muy generoso.
- **Navbar es `absolute`** (`absolute top-0 left-0 w-full z-20`): vive sobre el Hero, no empuja contenido.
- **Responsive breakpoints:** todos `md:` (768px) salvo el footer (`xl:flex-row`, `xl:flex` para el label rotado). Mobile-first limitado.

---

## 4. Inventario de componentes

### 4.1 Navbar
**Ruta:** `src/themes/PacificNW/components/Navbar.tsx`

- **Rol:** barra de navegación superior superpuesta al hero. Logo + 3 links + 3 iconos (heart/count, search, user).
- **Estructura semántica:** `<nav>` > [izq: logo SVG + div con 3 `<a>`] / [der: 3 `<button>` con SVGs inline].
- **Clases Tailwind clave:**
  - `absolute top-0 left-0 w-full z-20 px-10 py-6` — positioning full-bleed
  - `text-white text-xs tracking-widest uppercase font-medium` — texto micro mayúsculas
  - `hover:text-red-400 transition-colors` — hover en links y botones
  - SVG logo: `path stroke="#EF4444" strokeWidth="2"` (triángulo decorativo)
- **`t()` consumidas:** `PacificNW.nav.destinations`, `.trips`, `.experiences`
- **`sharedImages`:** ninguno — el logo es SVG inline, NO usa `BrandLogo` compartido.
- **Datos:** count `1,124` hardcoded en JSX.

### 4.2 Hero
**Ruta:** `src/themes/PacificNW/components/Hero.tsx`

- **Rol:** cabecera visual full-screen. Etiqueta de localización + título gigante + subtítulo.
- **Estructura semántica:** `<header>` > [`<div>` overlay] + [`<div>` contenido: label SVG pin + `<h1>` + `<p>`].
- **Clases Tailwind clave:**
  - `relative h-screen w-full bg-cover bg-center flex flex-col justify-center px-10 md:px-24`
  - `absolute inset-0 bg-black/40 z-0` — overlay
  - `relative z-10 max-w-4xl mt-20` — contenido sobre overlay
  - `text-7xl md:text-[140px] font-display text-white tracking-normal leading-[0.85] mb-8` — **h1 macizo, el más grande del tema**
  - `text-white text-sm md:text-base font-sans max-w-xl opacity-90 leading-relaxed` — subtítulo deliberadamente pequeño
- **`t()` consumidas:** `PacificNW.hero.label`, `.title`, `.subtitle`
- **`sharedImages`:** ninguno (usa `themeData.PacificNW.heroImageUrl`).
- **Observación:** el `mt-20` desplaza el bloque hacia abajo, rompiendo el centrado puro del flex — decisión editorial.

### 4.3 Timeline
**Ruta:** `src/themes/PacificNW/components/Timeline.tsx`

- **Rol:** itinerario visual en zig-zag. Dos "paradas" con foto + título display + coords GPS + párrafo. Línea vertical central con nodos circulares.
- **Estructura semántica:** `<section>` > [`<div>` línea central] + `<div max-w-7xl>` con 2 bloques:
  - Parada 1 (`flex-row`): `<img>` + `<h2>` serif italic ‖ `<span>` label + `<h3>` display + `<span>` coords + `<p>` + `<img>` detalle
  - Parada 2 (`flex-row-reverse`): `<span>` label + `<h3>` display + `<span>` coords + `<p>` ‖ `<img>` grande
- **Clases Tailwind clave:**
  - `hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] border-l-2 border-dashed border-neutral-300` — **línea vertical central**
  - `absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-4 border-red-500 rounded-full z-10` — **nodo circular del zig-zag**
  - `flex flex-col md:flex-row` (parada 1) y `md:flex-row-reverse` (parada 2) — zig-zag
  - `text-5xl md:text-7xl font-display text-neutral-900 leading-none` — h3 de cada parada
  - `text-3xl md:text-5xl font-serif italic text-neutral-800 leading-snug` — subtítulo serif (única aparición de `font-serif`)
  - `h-[400px] object-cover rounded-sm shadow-xl` y `h-[600px] shadow-2xl` — **alturas mágicas distintas entre paradas**
- **`t()` consumidas:** `PacificNW.timeline` (array indexado: `timelineText[0].{label,title,coords,text}` y `[1].{...}`). Subtítulo de montaña **hardcoded bilingüe** vía `language === 'en' ? ... : ...`.
- **`sharedImages`:** `narrative[1]`, `narrative[2]`, `destinations[0]`.
- **Contextos:** consume `language` de `useTranslation()` (único componente además del `t`).
- **Deudas visibles:** alturas `h-[400px]` y `h-[600px]` magic numbers; `!` non-null assertion en `stopsData[0].image2!`; título hardcoded bilingüe fuera del diccionario i18n.

### 4.4 OlympicNational
**Ruta:** `src/themes/PacificNW/components/OlympicNational.tsx`

- **Rol:** sección full-bleed sobre fotografía panorámica con grid de meta + botón play + 3 stats numéricos + texto.
- **Estructura semántica:** `<section>` > [`<div>` overlay] + `<div max-w-7xl>` con `<div grid md:grid-cols-3>` (label+title+coords / botón / stats) + `<p>` centrado.
- **Claves Tailwind clave:**
  - `relative w-full py-32 md:py-48 bg-cover bg-center text-white` + `style={{ backgroundImage }}`
  - `absolute inset-0 bg-black/60 z-0` — overlay más oscuro que el Hero
  - `grid grid-cols-1 md:grid-cols-3 gap-10 items-end` — grid de 3 columnas con alineación a la base
  - `w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/50 hover:bg-white/10 hover:border-white transition-all duration-300 group` — botón play circular
  - `group-hover:scale-110 transition-transform` — ícono SVG escala al hover
  - `text-4xl md:text-5xl font-display` para stat values + `text-[10px] tracking-widest` para labels
- **`t()` consumidas:** `PacificNW.olympic` como objeto: `.label`, `.title`, `.coords`, `.text`, `.stats.{days,mileage,elevation}.{label,value}`
- **`sharedImages`:** `panoramas[0]` — imagen de fondo.
- **Observación:** los paddings `py-48` hacen que la sección ocupe casi dos tercios de viewport.

### 4.5 Author
**Ruta:** `src/themes/PacificNW/components/Author.tsx`

- **Rol:** tarjeta de autor horizontal — avatar circular + label + nombre + badge "+" + bio + métricas (likes y comments).
- **Estructura semántica:** `<section>` > `<div max-w-4xl>` flex row: [`<img>` avatar] + [`<span>` label / `<h3>` + badge / `<p>` bio] + [`<div>` métricas SVG+count].
- **Clases Tailwind clave:**
  - `w-full bg-white py-24 px-6 md:px-12 flex justify-center border-b border-neutral-100`
  - `max-w-4xl w-full flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16`
  - `w-24 h-24 md:w-32 md:h-32 rounded-full object-cover shadow-lg` — avatar
  - `text-2xl md:text-3xl font-display tracking-wide text-neutral-900` — nombre
  - `w-5 h-5 bg-red-500 text-white rounded flex items-center justify-center text-xs font-bold` — **badge "+" rojo**
  - `hover:text-red-500 transition-colors cursor-pointer` — hover en métricas
- **`t()` consumidas:** `PacificNW.author` como objeto: `.label`, `.name`, `.bio`
- **`sharedImages`:** `avatars[3]` — avatar del autor.
- **Deudas visibles:** contadores `1,124` y `35` **hardcoded** en JSX — `1,124` se duplica con el Navbar. Badge "+" parece puramente decorativo (sin `onClick`).

### 4.6 Footer
**Ruta:** `src/themes/PacificNW/components/Footer.tsx`

- **Rol:** doble bloque: arriba, 2 cards de "más experiencias" con foto + título + location; abajo, brand + columnas de links.
- **Estructura semántica:** `<footer>` > [`<div max-w-[1400px]>`: label vertical rotado (`xl`) + `<div flex-1>` con 2 cards] + [`<div max-w-7xl>`: brand SVG + `<span>` brand-name + `<div>` con `footerData.links.map` → columnas].
- **Clases Tailwind clave:**
  - `max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col xl:flex-row items-start gap-12 mb-32` — `mb-32` gigante
  - `text-[10px] tracking-widest text-neutral-400 font-bold uppercase -rotate-90 origin-left whitespace-nowrap` — **label "More Experiences" rotado vertical** (solo xl)
  - `w-full h-[300px] md:h-[400px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out` — **zoom lento de 700ms** en cards
  - `text-xl md:text-2xl font-display text-neutral-900 mb-2 group-hover:text-red-500 transition-colors` — h4 con hover rojo
  - `overflow-hidden mb-6 rounded-sm` — wrapper que contiene el zoom
  - `text-[9px] tracking-[0.2em] font-bold text-neutral-400 uppercase` — brand micro-texto (el más pequeño del tema)
  - `text-xs text-red-500 hover:text-red-600 transition-colors font-medium` — links en rojo (diferencia: rojo activo, no hover-only)
- **`t()` consumidas:** `PacificNW.footer` (`.moreExperiences`, `.brand`, `.cards` array, `.links` objeto con `.title` + `.items[]`)
- **`sharedImages`:** `narrative[1]` (reutilizada de Timeline) y `narrative[0]` — cards del top.
- **Observación:** el `mb-32` entre el bloque de cards y el bloque brand/links es inmenso, deliberado para que respire.

---

## 5. Animaciones y transiciones

| Componente | Tipo | Implementación |
|---|---|---|
| Navbar | color hover | `hover:text-red-400 transition-colors` |
| Hero | ninguna | sin animación explícita |
| Timeline | ninguna | sin `transition-*` ni hover ni `animate-*` |
| Olympic | hover group + scale | `hover:bg-white/10 transition-all duration-300 group` + `group-hover:scale-110 transition-transform` en SVG |
| Author | hover color | `hover:text-red-500 transition-colors cursor-pointer` |
| Footer | **zoom 700ms** (cards) + color hover | `group-hover:scale-105 transition-transform duration-700 ease-out` + `group-hover:text-red-500` |

**Sin IntersectionObserver, sin parallax real, sin `animate-*` utilidades.** Toda la "vida" dinámica es hover-only. No hay animación de entrada (mount) en ningún componente.

**SVGs decorativos inline** (sin librería de iconos): Navbar (logo triángulo, heart, search, user), Hero (location pin), Olympic (play triangle), Author (heart-fill, comment), Footer (location pin, logo triángulo duplicado del Navbar).

---

## 6. Observaciones específicas del tema

1. **Hex literales en SVGs rompen Tailwind:** `#EF4444` (Navbar) y `#171717` (Footer) para el mismo logo de triángulo. Tailwind ya expone `red-500` y `neutral-900` con esos valores exactos — usar hex crudos impide theme switching. Es además un **logo duplicado a mano** en dos componentes, 100% redundante, sin componente `BrandLogo` compartido. El tema NO usa `BrandLogo`.
2. **`stopsData` con imagen nullable** en `Timeline`: `image2: null` en parada 2, consumido con `stopsData[0].image2!` non-null assertion. Tipado frágil.
3. **Strings bilingual hardcodeados en JSX:** en `Timeline` el h2 "Cielo: atrapado entre picos..." se hace con ternario `language === 'en' ? ... : ...` fuera del diccionario `t()`. **Rompe el contrato i18n** del proyecto.
4. **Contadores mágicos repetidos:** `1,124` aparece hardcoded en Navbar (heart count) y en Author (likes). `35` en Author también es hardcoded. No es dato viviente, es escenografía.
5. **Magic numbers en alturas de imágenes:** `h-[400px]`, `h-[600px]`, `h-[300px] md:h-[400px]`, `w-48 h-32`, `h-[140px]` (Navbar font) — sin escala. Dificulta mantener ritmo vertical entre componentes.
6. **Inconsistencia de max-width:** 4 anchos distintos (`max-w-4xl`, `max-w-7xl`, `max-w-[1400px]`, sin container en Hero/Navbar). No hay un "grid" temático.
7. **Un solo uso de `font-serif`** en todo el tema (subtítulo Mount Garibaldi en Timeline). Parece remix de otro tema anterior — es la única concesión tipográfica no-condensada.
8. **Responsividad limitada:** todos los breakpoints son `md:` (768px) salvo el footer top. No hay variantes `sm` o `lg`. Entre 768px y 1280px el layout funciona "medio".

---

## 7. Oportunidades de mejora

1. **Extraer `<BrandLogo>` compartido** para el triángulo rojo, reemplazando los dos SVG inline duplicados en Navbar y Footer. Reemplazar los hex `#EF4444`/`#171717` por `currentColor` o por las clases Tailwind `text-red-500`/`text-neutral-900` para que el logo sea themable.
2. **Migrar el subtítulo bilingüe de Timeline a `PacificNW.timeline`** (nueva key `subtitle` en cada stop). Hoy el i18n está roto para esa cadena — cualquier idioma agregado fuera de en/es rompe.
3. **Estandarizar el container del tema:** crear una utilidad `theme-container` (o constante `MAX_W` y `PADDING`) que centralice `max-w-7xl mx-auto px-6 md:px-12`. Eliminar `max-w-4xl`, `max-w-[1400px]` y los `px-*` dispersos.
4. **Reemplazar alturas mágicas por aspecto ratio consistente:** definir `aspect-[4/3]`, `aspect-[3/4]` o constantes `IMG_LANDSCAPE`/`IMG_PORTRAIT` en un `layout.ts` del tema. Hoy `h-[400px]` y `h-[600px]` viven sueltos en Timeline.
5. **Añadir animación de entrada (mount) sutil** con `IntersectionObserver` o una utility `animate-fade-up` keyframe custom en `tailwind.config.js`. El zig-zag Timeline y el botón play de Olympic ganarían vida con un fade-in escalonado al entrar en viewport. Pura CSS, sin librerías.
6. **(Bonus) Reemplazar los contadores hardcoded `1,124` / `35`** por props o por `themeData.PacificNW.stats` — si esos números mentaban algo, deberían vivir en config, no en JSX.

---

## 8. Rutas absolutas de referencia

- `src\themes\PacificNW\index.tsx` — entry del tema
- `src\themes\PacificNW\components\Navbar.tsx`
- `src\themes\PacificNW\components\Hero.tsx`
- `src\themes\PacificNW\components\Timeline.tsx`
- `src\themes\PacificNW\components\OlympicNational.tsx`
- `src\themes\PacificNW\components\Author.tsx`
- `src\themes\PacificNW\components\Footer.tsx`
