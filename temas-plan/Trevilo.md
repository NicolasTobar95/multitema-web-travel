# Trevilo — Documento de Diseño

> Tema del portfolio travel-portfolio. Documento de arquitectura visual e inventario de componentes.
> Ruta base: `src/themes/Trevilo/`
> Stack: React 19 + Vite + Tailwind v3 · i18n vía `useTranslation()` · imágenes vía `sharedImages`

---

## 1. Filosofía de diseño

Trevilo es el tema más "burbujeante" del portfolio y se reconoce a primera vista por dos decisiones radicales: **esquinas grotescamente redondeadas** y **composición flotante por capas**. El valor `rounded-[3rem]` aparece en los tres hitos visuales del recorrido (Hero, contenedor base de Packages y CTA gigante del Footer), mientras que `rounded-[2.5rem]` y `rounded-[2rem]` se usan en superficies secundarias (buscador del Hero, tarjetas de destinos, reseñas). La jerarquía de radios no es accidental — **escala con la importancia del bloque**: a más protagonismo, más redondez. Esto confirma la caracterización: el `rounded-[3rem]` no es un detalle, es la **marca de diseño del tema**.

El esquema es **light por defecto** (fondo `#FDFDFD` casi-blanco en `index.tsx`, textos `neutral-900`), con dos islas oscuras puntuales: el Footer (`#18181B` zinc-black) y los overlays degradados sobre imágenes (`black/20`, `black/40`, `black/80`). La paleta no es pastel ni cálida: es **neutra con un acento cian-azulado** (`#1ea0ff` y `#3b82f6`) reforzado por píldoras `blue-50` para tags e íconos. El blanco puro domina las superficies de tarjetas y botones, con `neutral-100/200/400/500` como grises funcionales.

Las "sombras suaves" que menciona el concepto son en realidad una **jerarquía de tres niveles**: `shadow-sm` (píldoras), `shadow-lg` (botones y navegación), `shadow-xl/2xl` (tarjetas y superficies hero). No es una sombra única, es un sistema.

Lo que hace que los componentes "floten" no es una técnica única sino una **combinación de tres recursos**:
1. `absolute` + `z-20`/`z-30` para despegar elementos del flujo normal (pestañas del buscador en `-top-14`, tarjeta "Bali Island" en `absolute top-16 right-0`, Navbar en `absolute top-0`)
2. sombras `shadow-2xl` que generan separación perceptual del fondo
3. `transform` con traslaciones negativas en hover (`hover:-translate-y-1`, `hover:-translate-y-2`, `hover:scale-105`) que sugieren elevación interactiva

El efecto más logrado es el buscador del Hero: las pestañas sobresalen `-top-14` por encima de una caja `shadow-2xl`, creando una **composición tridimensional real**, no un mero card plano.

---

## 2. Paleta de colores y tipografía

### Colores (clases Tailwind / hex literales)

| Uso | Valor | Dónde |
|---|---|---|
| Fondo base del tema | `#FDFDFD` | `index.tsx` |
| Fondo sección gris | `#F5F7FA` | `Testimonials.tsx` (única sección con bg) |
| Fondo footer oscuro | `#18181B` (zinc-900-ish) | `Footer.tsx` |
| Texto principal | `neutral-900` | todos |
| Texto secundario | `neutral-400`, `neutral-500`, `neutral-700` | subtítulos, descripciones |
| Bordes sutiles | `neutral-100`, `neutral-200`, `white/10`, `white/20` | cards, dividers, footer |
| Acento principal | `#1ea0ff` (cian-azul) | botones, tags, íconos, flecha carousel |
| Acento secundario | `#3b82f6` (blue-500) | pestaña activa Hero, íconos buscador |
| Tag bg suave | `blue-50` | píldoras de tags, contenedores de íconos |
| Logo (dos círculos superpuestos) | `yellow-400` + `white/90` | Navbar, Footer |
| Estrellas | `yellow-400` | Testimonials |
| Badge "verde online" | `#4ade80` (green-400) stroke | Footer copyright |
| Overlays degradados | `black/20`, `black/40`, `black/80`, `from-black/80 via-black/10` | Hero, Destinations, Footer |

### Tipografía

- **Familia:** `font-sans` (sin fuente custom declarada en el tema; **no hay archivo CSS propio** — hereda la configuración Tailwind global del proyecto).
- **Pesos dominantes:** `font-extrabold` en H2 de secciones, `font-bold` en body/CTAs, `font-medium` en textos descriptivos. Sin `font-light` ni `font-thin`.
- **Tamaños dominantes:**
  - Display: `text-5xl md:text-7xl` (Hero h1), `text-4xl md:text-5xl` (H2 de sección), `text-4xl md:text-6xl` (CTA Footer)
  - Cuerpo grande: `text-lg md:text-xl` (Hero subtítulo), `text-lg` (Packages features)
  - Cuerpo: `text-sm`, `text-base`
  - Micro / etiquetas: `text-xs` con `tracking-[0.2em] uppercase` (tag pattern repetido en Hero, Packages, Testimonials, Footer)
- **Patrones de tracking:** `tracking-tight` en headings, `tracking-[0.2em]` en tags uppercase, `tracking-wide` en logo "Trevilo", `tracking-widest` en "ESTABLISHED".

---

## 3. Layout general

El tema se monta en `index.tsx` como un único `<div>` root con `min-h-screen bg-[#FDFDFD] font-sans text-neutral-900 overflow-x-hidden` y apila los 7 componentes **verticalmente, sin container global compartido** — cada uno gestiona su propio ancho y padding:

```
<Navbar/>          absolute, sin section wrapper, flota sobre Hero
<Hero/>            w-full + px-4 md:px-6, tarjeta interna de 750/850px
<Companies/>       max-w-5xl mx-auto, px-6 py-16
<Destinations/>    max-w-[1400px] mx-auto, px-6 md:px-12 py-20
<Packages/>        max-w-7xl mx-auto, px-6 md:px-12 py-24
<Testimonials/>    w-full bg-[#F5F7FA] py-24, inner max-w-[1400px]
<Footer/>          w-full bg-[#18181B] pt-12 pb-16, inner max-w-[1400px]
```

**Observaciones de layout:**
- No hay un `Container` compartido: cada componente elige su propio `max-w-*` → **inconsistencia intencional pero notable** (`max-w-5xl`, `max-w-7xl`, `max-w-[1400px]` conviven).
- Los paddings verticales crecen hacia abajo: Navbar (~null, es absolute), Companies `py-16`, Destinations `py-20`, Packages `py-24`, Testimonials `py-24`, Footer `pt-12 pb-16` (excepto su CTA interno `mb-24` que empuja el bloque de links hacia abajo).
- Navbar usa `position: absolute` (no `fixed`), por lo tanto **no persiste al hacer scroll** — algo típico de hero-section-separada pero que rompería la affordance de navegación.
- `overflow-x-hidden` en el root previene rotura horizontal por los elementos flotantes negativos (tarjeta Bali `-right-4`, pestañas `-translate-x-1/2`).

---

## 4. Inventario de componentes

### 4.1 Navbar
**Ruta:** `src/themes/Trevilo/components/Navbar.tsx`

- **Rol:** barra de navegación superior **flotante sobre el Hero** (no sticky).
- **Estructura semántica:**
  ```
  <nav.absolute top-0 w-full z-30 px-8 py-8 flex justify-between>
    Logo (dos círculos superpuestos yellow-400/white + texto "Trevilo")
    Center links (hidden md:flex, gap-10) — 4 anchors
    Right actions (signup anchor + login button)
  ```
- **Clases Tailwind clave:** `absolute top-0 left-0 w-full z-30 px-8 py-8`, `bg-yellow-400 rounded-full` (logo), `bg-white text-neutral-900 px-6 py-2.5 rounded-full ... shadow-lg`.
- **`t()` consumido:** `Trevilo.nav` → `{ home, about, service, pricing, signup, login }`.
- **`sharedImages`:** no usa (sin imágenes).
- **Datos/props:** sin props — todo via `t()`. Texto "Trevilo" hardcodeado (no via i18n).

### 4.2 Hero ⭐
**Ruta:** `src/themes/Trevilo/components/Hero.tsx`

- **Rol:** hero a pantalla completa con **tarjeta fotográfica gigante redondeada** + buscador flotante con pestañas. Es el corazón visual del tema.
- **Estructura semántica:**
  ```
  <section.w-full px-4 md:px-6 pt-4 md:pt-6>
    <div.tarjeta h-[750px] md:h-[850px] rounded-[3rem] bg-cover bg-center overflow-hidden
         backgroundImage=themeData.Trevilo.heroImageUrl>
      overlay bg-black/20
      <div.textos centrales -mt-32> tag + h1 (drop-shadow) + p </div>
      <div.contenedor buscador absolute bottom-10 z-20 w-[95%] max-w-[1100px]>
        <div.pestañas -top-14 backdrop-blur-md bg-white/30 rounded-full>
          4 tab buttons con SVG inline (ícono dinámico por index)
        <div.caja buscador bg-white rounded-[2.5rem] shadow-2xl divide-x>
          4 fields destino/checkIn/checkOut/travelers (icon+cyan blue-50)
          CTA button bg-[#1ea0ff] rounded-[1.5rem] hover:-translate-y-1
      </div>
    </div>
  ```
- **Claves Tailwind clave:** `rounded-[3rem]` (tarjeta), `h-[750px] md:h-[850px]`, `bg-black/20` (overlay), `absolute bottom-10 z-20`, `bg-white/30 backdrop-blur-md ... border border-white/20` (pestañas), `bg-white rounded-[2.5rem] shadow-2xl` (buscador), `bg-[#1ea0ff] hover:-translate-y-1 rounded-[1.5rem]` (CTA).
- **`t()` consumido:** `Trevilo.hero` → `{ tag, title, subtitle, tabs[], search: { destination, destDesc, checkIn, inDesc, checkOut, outDesc, travelers, travDesc, button } }`.
- **`sharedImages`:** no usa. En su lugar usa **`themeData.Trevilo.heroImageUrl`** vía `style={{ backgroundImage }}` (única fuente de la imagen hero).
- **Comentario en código:** hay un `/* CORRECCIÓN: Altura aumentada aquí -> h-[750px] md:h-[850px] */` que evidencia un ajuste post-desarrollo.

### 4.3 Companies ⭐ (único en el portfolio)
**Ruta:** `src/themes/Trevilo/components/Companies.tsx`

- **Rol:** banda de **logos simulados de "empresas"** (no aerolíneas — son marcas ficticias tipo Stripe-logos). NO es sección de aerolíneas.
- **Estructura semántica:**
  ```
  <section.w-full max-w-5xl mx-auto px-6 py-16 flex flex-col items-center>
    <p.text-sm text-neutral-500> {t('Trevilo.companies')} </p>
    <div.flex flex-wrap gap-8/16 opacity-60>
      5 divs con: SVG inline + texto (font-bold text-2xl + color específico)
  ```
- **Las 5 "empresas" listadas (todas ficticias, color-secondary semantic-style):**
  1. `Layers` — `text-purple-600`, SVG layers
  2. `Sisyphus` — `text-green-600`, mismo SVG layers (reusado)
  3. `Circooles` — `text-blue-600`, SVG círculo sólido
  4. `Catalog` — `text-indigo-600`, SVG cubo (stroke)
  5. `Quotient` — `text-fuchsia-600`, SVG play-in-circle
- **Claves Tailwind clave:** `max-w-5xl mx-auto px-6 py-16`, `opacity-60` (tonos apagados), `font-bold text-2xl`, color por marca (`purple/green/blue/indigo/fuchsia-600`).
- **`t()` consumido:** solo `Trevilo.companies` (un único string — frase introductoria tipo "Trusted by…").
- **`sharedImages`:** no usa. Logos son **SVG inline + texto**, no imágenes.
- **Deuda técnica:** los nombres de marca están hardcodeados en JSX, no via i18n.

### 4.4 Destinations
**Ruta:** `src/themes/Trevilo/components/Destinations.tsx`

- **Rol:** grilla de **3 tarjetas gigantes con foto full-bleed** + caption sobre degradado. Incluye flechas de carousel (no funcionales — sin handler).
- **Estructura semántica:**
  ```
  <section.max-w-[1400px] mx-auto px-6 md:px-12 py-20>
    <header.flex justify-between> h2 + (prev button outline / next button solid cyan) </header>
    <grid.grid-cols-1 md:grid-cols-3 gap-8>
      cards.map → <div.relative h-[450px] md:h-[550px] rounded-[2.5rem] overflow-hidden group>
        <img object-cover group-hover:scale-105 duration-700>
        <div.overlay bg-gradient-to-t from-black/80 via-black/10>
          <h3.title> + location icon + price + per
  ```
- **Claves Tailwind clave:** `rounded-[2.5rem]`, `group` + `group-hover:scale-105 transition-transform duration-700`, `hover:shadow-2xl transition-all duration-500`, `bg-[#1ea0ff] ... shadow-lg` (flecha activa), `rounded-full border border-neutral-200` (flecha mute), `bg-gradient-to-t from-black/80 via-black/10`.
- **`t()` consumido:** `Trevilo.destinations` → `{ title, cards[]: { title, location, price, per } }`.
- **`sharedImages` consumido (índices hardcodeados):**
  - `sharedImages.destinations[0]`
  - `sharedImages.destinations[1]`
  - `sharedImages.destinations[3]` ← **gap: el índice [2] se saltea deliberadamente**
- **Deuda técnica:** las flechas `<button>` no tienen `onClick` ni `aria-label` — son puramente decorativas. El salto de índice `[0,1,3]` es frágil ante cambios en el array de imágenes.

### 4.5 Packages
**Ruta:** `src/themes/Trevilo/components/Packages.tsx`

- **Rol:** sección **split 50/50** con composición de imágenes superpuestas (excursionista + tarjeta flotante "Bali Island") a la izquierda y bloque de texto + 3 features a la derecha.
- **Estructura semántica:**
  ```
  <section.max-w-7xl mx-auto px-6 md:px-12 py-24 flex flex-col lg:flex-row gap-16 lg:gap-32>
    <div.izquierda lg:w-1/2 relative h-[500px]>
      <div.base rounded-[3rem] shadow-xl> img narrative[0]
      <div.tarjeta flotante absolute top-16 right-0 rounded-3xl shadow-2xl
                   hover:-translate-y-2>
        img destinations[1] + "Bali Island" + location cyan
    <div.derecha lg:w-1/2>
      tag píldora cyan + h2 extrabold + p subtitle
      features.map → 3 filas: (icono blue-50 rounded-xl) + title
  ```
- **Claves Tailwind clave:** `rounded-[3rem]` (tarjeta base — segundo `rounded-[3rem]` del tema), `absolute top-16 right-0 ... rounded-3xl shadow-2xl hover:-translate-y-2 transition-transform duration-300` (tarjeta flotante), `bg-blue-50 ... text-[#1ea0ff]` (tag e iconos), `border border-neutral-100 shadow-sm hover:bg-neutral-50` (feature rows).
- **`t()` consumido:** `Trevilo.packages` → `{ tag, title, desc, features[]: { title } }`.
- **`sharedImages` consumido:** `sharedImages.narrative[0]` (imagen base grande), `sharedImages.destinations[1]` (miniatura Bali — **misma imagen que en Destinations card 2**, reuso confirmado).
- **Deuda técnica:** texto "Bali Island" y "Bali, Indonesia" hardcodeados, no via i18n (inconsistente con `packData` para el resto).

### 4.6 Testimonials
**Ruta:** `src/themes/Trevilo/components/Testimonials.tsx`

- **Rol:** grid de **reseñas de usuarios** con avatar, estrellas y quote. Única sección con `bg-[#F5F7FA]` (semi-gris) — genera contraste visual respecto del blanco predominante.
- **Estructura semántica:**
  ```
  <section.w-full bg-[#F5F7FA] py-24 px-6 md:px-12>
    <div.max-w-[1400px] mx-auto flex flex-col items-center>
      header central: tag + h2 + subtitle max-w-2xl
      <grid.grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6>
        reviews.map → <card.bg-white rounded-[2rem] p-8 shadow-sm hover:shadow-xl>
          comillas decorativas (SVG) + quote
          estrellas (5 svg yellow-400) + rating text
          avatar (img sharedImages.avatars[idx%3]) + name + role
  ```
- **Claves Tailwind clave:** `bg-[#F5F7FA]`, `rounded-[2rem]`, `shadow-sm hover:shadow-xl transition-shadow duration-300`, `bg-blue-50 text-[#1ea0ff] rounded-xl` (ícono comillas), `text-yellow-400` (estrellas), `tracking-[0.2em] uppercase` (tag pattern).
- **`t()` consumido:** `Trevilo.testimonials` → `{ tag, title, subtitle, reviews[]: { quote, rating, name, role } }`.
- **`sharedImages` consumido:** `sharedImages.avatars[idx % 3]` — **recicla solo 3 avatares** cíclicamente, sin importar cuántas reviews haya. Si hay 4+ reviews, al menos un avatar se repite.
- **Deuda técnica:** Estrellas siempre dinámicamente 5 (loop `[1,2,3,4,5]`); el `rating` numérico viene del data pero las estrellas siempre muestran 5.

### 4.7 Footer ⭐
**Ruta:** `src/themes/Trevilo/components/Footer.tsx`

- **Rol:** footer complejo con **tarjeta CTA gigante en su interior** + bloque de enlaces en 4 columnas + copyright inferior.
- **Estructura semántica:**
  ```
  <footer.bg-[#18181B] pt-12 pb-16 px-6 md:px-12 text-white>
    <div.max-w-[1400px] mx-auto flex flex-col>
      <div.CTA h-[500px] md:h-[600px] rounded-[3rem] bg-cover bg-center shadow-2xl
           backgroundImage=themeData.Trevilo.heroImageUrl>   ← REUSO DEL HERO
        overlay bg-black/40 + content: tag pill + h2 + 2 botones (outline + solid)
      <div.grid md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-white/10>
        Col1 (lg:col-span-2): logo + 3 íconos redondos redes sociales
        Col2/3: fData.links.map → (h4 + ul de items)
      <div.copyright flex justify-between pt-8>
        established + contact/privacy links
        badge "online" (check verde + texto)
  ```
- **Claves Tailwind clave:** `bg-[#18181B]`, `h-[500px] md:h-[600px] rounded-[3rem] bg-cover bg-center shadow-2xl` (CTA — **tercer `rounded-[3rem]`**), `bg-black/40` (overlay), `bg-white/10 backdrop-blur-md border border-white/20` (tag), `bg-white text-neutral-900 ... hover:scale-105 shadow-xl` (CTA solid), `border border-white/20 hover:bg-white hover:text-neutral-900` (social icons), `border-b border-white/10`.
- **`t()` consumido:** `Trevilo.footer` → `{ ctaTag, ctaTitle, btnSignup, btnLogin, brand, links[]: { title, items[] }, established, contact, privacy, badge }`.
- **`sharedImages`:** no usa. La imagen del CTA gigante viene de **`themeData.Trevilo.heroImageUrl`** — **exactamente la misma URL que usa el Hero**.
- **REUSO DE HERO IMAGE CONFIRMADO:** `Footer.tsx` hace `style={{ backgroundImage: url(${themeData.Trevilo.heroImageUrl}) }}`. Es la **segunda consumidora de esa URL** en el tema (Hero es la primera). El CTA del Footer reimprime la imagen del Hero a tamaño casi idéntico (500/600px vs 750/850px del Hero), con un overlay más oscuro (`black/40` vs `black/20`) para diferenciar la intención (CTA conversión vs Hero showcase).
- **Logo duplicado:** el patrón de logo "dos círculos superpuestos yellow-400/white" aparece **idéntico en Navbar y Footer** (mismo JSX, sin factorizar a componente).

---

## 5. Animaciones y transiciones

Trevilo no usa `keyframes` ni `animate-*` de Tailwind. Todo el movimiento viene de **transitions puntuales y hovers**:

| Patrón | Clases | Dónde |
|---|---|---|
| Hover opacidad navegación | `transition-opacity` (`hover:opacity-100`, `hover:opacity-80`) | Navbar links + signup |
| Hover color botones | `transition-colors` (`hover:bg-neutral-100`, `hover:bg-blue-500`) | Navbar login, flechas Destinations |
| Hover elevación traducida | `hover:-translate-y-1` (`Hero CTA`), `hover:-translate-y-2` (`Packages Bali card`), `hover:scale-105` (`Footer solid CTA`) | CTA talento |
| Hover shadow-step | `shadow-lg hover:shadow-xl` | Hero CTA, flecha Destinations |
| Hover shadow-tarjeta | `shadow-sm hover:shadow-xl transition-shadow duration-300` | Testimonials cards |
| Hover scale imagen | `group-hover:scale-105 transition-transform duration-700` | Destinations cards |
| Hover shadow-tarjeta grande | `shadow-md hover:shadow-2xl transition-all duration-500` | Destinations cards |
| Hover translate pestaña | `transition-all flex` (sin `hover:` específico en pestañas) — pasivo | Hero tabs |
| Hover field del buscador | `hover:bg-neutral-50 transition-colors` | Hero search fields |
| Hover social icon invert | `hover:bg-white hover:text-neutral-900 transition-colors` | Footer social |
| Hover link pie | `hover:text-white transition-colors` | Footer link columns |

**Durations observadas:** 300ms (Testimonials, Packages), 500ms (Destinations card), 700ms (Destinations img zoom). El resto usa default 150ms.

**Ausencias notables:** no `animate-pulse`, no `animate-bounce`, no `animate-float` custom, no `motion-safe:`/`motion-reduce:`. Las "animaciones flotantes" que el tema sugiere visualmente no son animaciones keyframe continuas — son estáticas + hovers transitorios. **El "flotante" es composición (z-index + absolute + shadow), no movimiento**.

---

## 6. Observaciones específicas del tema

1. **REUSO DEL HERO IMAGE — CONFIRMADO.** `themeData.Trevilo.heroImageUrl` se consume DOS veces en el tema: Hero (línea 15 de `Hero.tsx`) y Footer (línea 16 de `Footer.tsx`). El CTA del Footer reutiliza literalmente la misma imagen del hero, escalada y con overlay más oscuro. No hay segunda hero-image distinta. Esto puede ser (a) intencional para crear "bookend visual" (apertura y cierre del recorrido), o (b) un shortcut de desarrollo. La cantidad de `mb-24` entre CTA y los links del Footer (600px CTA + 96px margin) es exagerada y empuja la sección de links muy abajo.
2. **Inconsistencia de `max-w-*` por componente:** `max-w-5xl` (Companies), `max-w-7xl` (Packages), `max-w-[1400px]` (Destinations, Testimonials, Footer inner), sin max-w (Hero, Navbar). En viewport xl esto produce **alineaciones de borde izquierdo distintas** entre secciones adyacentes — no comparten eje visual.
3. **Navbar no es sticky:** el `absolute top-0` la hace desaparecer al scroll. Compensa con `z-30` mientras el Hero sigue visible, pero una vez scrolleado, no hay nav. Probablemente intencional para themes tipo landing-full-bleed, pero **rompe affordance**.
4. **Tipado loose:** todos los `.map` usan `any` (`card: any`, `feature: any`, `review: any`, `col: any`). Sin interfaces ni tipos. Si los JSON de i18n cambian, no hay feedback type-safe.
5. **Hardcodeo de strings fuera de i18n:**
   - "Trevilo" (brand) en Navbar y Footer.
   - "Bali Island", "Bali, Indonesia" en Packages.
   - Acento cian hardcodeado `#1ea0ff` repetido en 5+ archivos (no extraído a constant ni a `tailwind.config` extend).
   - Nombres falsos de compañías (Layers, Sisyphus, Circooles, Catalog, Quotient) en Companies.tsx.
6. **Reuso estructural de SVG:** el SVG "layers" (paths `M12 2L2 7...`) aparece **idéntico** en Companies para Layers y Sisyphus — claramente placeholders.
7. **Botones de flecha no funcionales** en Destinations: `<button>` sin `onClick` ni `aria-label`. Puramente cosméticos.
8. **Estrellas siempre 5** en Testimonials: el loop `[1,2,3,4,5].map` dibuja 5 estrellas sin importar `review.rating` (que solo aparece como número al lado). Rating visualmente siempre es 5 estrellas, sin importar el score real.
9. **Saturación de `rounded-[3rem]`:** 3 ocurrencias en 3 componentes hito (Hero, Packages base image, Footer CTA). No es excesivo — es **coherente como marca de diseño**. `rounded-[2.5rem]` (Hero buscador, Destinations cards) y `rounded-[2rem]` (Testimonials cards) forman una gradación de radios clara.
10. **Ausencia de CSS-in-JS o archivo CSS propio del tema:** toda la paleta y tipografía vive inline en JSX. No hay `theme.css`, no hay `theme.config.js`. Esto hace el tema **altamente portable** pero hace que cambiar la paleta requiera editar 8 archivos.

---

## 7. Oportunidades de mejora

1. **[Alta] Extraer paleta a `theme-config` dedicate o `tailwind.config` extend.** El `#1ea0ff` aparece pegado en 5+ archivos (Hero, Packages, Destinations, Testimonials) y `#F5F7FA`, `#18181B`, `#FDFDFD`, `#3b82f6` son otros literales sueltos. Definir `colors.trevilo.accent`, `colors.trevilo.surface`, `colors.trevilo.footer` en `tailwind.config` permite variar el tema en un solo lugar. **Hoy cambiar el cyan por teal implicaría find-replace manual en ≥6 archivos.**

2. **[Alta] Factorizar el logo "Trevilo" a `<BrandLogo/>` reutilizable.** El JSX de dos círculos superpuestos (`yellow-400` + `white/90` + texto "Trevilo") está duplicado **byte por byte** en Navbar y Footer. Extraerlo elimina 8 líneas duplicadas y permite unificar el breakpoint `hidden md:flex` vs el `flex` del footer. Single source of truth para la marca.

3. **[Media] Separar el CTA del Footer en su propio `<CtaBanner/>`.** Hoy `Footer.tsx` (101 líneas) mezcla dos secciones conceptualmente distintas — un CTA gigante con hero-image-reuse (39 líneas) y el footer de enlaces (60 líneas). Extraer `CtaBanner` como hermano componente del Footer en `index.tsx` aumenta cohesión, facilita mover/eliminar el CTA, y deja al Footer como un footer puro. Como bonus, el reuse del hero-image queda aislado y auditable en un solo módulo.

4. **[Media] Hacer la Navbar `sticky` (o `fixed` + offset en Hero).** Hoy `absolute top-0` la hace desaparecer al hacer scroll, perdiendo affordance de navegación. Cambiar a `sticky top-0 z-30` (o `fixed` con `pt-8`-equivalente en el primer section del Hero) preserva navegación. **Tradeoff:** sticky opaca el hero durante scroll; requeriría un `backdrop-blur` condicional.

5. **[Media] Tipado de los datos i18n y rotación real de avatares.** (a) Definir interfaces `TreviloNav`, `TreviloHero`, `TreviloDestinations`, `TreviloPackages`, `TreviloTestimonials`, `TreviloFooter` y reemplazar los `any` en los `.map` — expone rotura de contrato i18n en compile-time. (b) En Testimonials, `sharedImages.avatars[idx % 3]` cicla solo 3 avatares sin importar el total de reviews; si hay 4+ reseñas, las avatares se repiten visualmente. Ampliar el array de avatares en `sharedImages` o usar `idx % avatars.length` dinámico (defensivo ante crecimientos del array). **Evitar "María aparece con cara de Juan" en listados con 6 reviews.**

6. **[Baja] Etiquetas `aria-label` y handlers en las flechas de Destinations.** Hoy son `<button>` decorativos sin `onClick` ni `aria-label`. Aunque sean placeholder, al menos `aria-label="Previous"` / `aria-label="Next"` los hace accesibles a screen readers. **Bajo costo, alta ganancia a11y.**

---

## 8. Rutas absolutas de referencia

- `src\themes\Trevilo\index.tsx` — entry del tema
- `src\themes\Trevilo\components\Navbar.tsx`
- `src\themes\Trevilo\components\Hero.tsx` ⭐ (tarjeta gigante redondeada + buscador con pestañas flotante)
- `src\themes\Trevilo\components\Companies.tsx` ⭐ (único en el portfolio — logos de empresas ficticias)
- `src\themes\Trevilo\components\Destinations.tsx`
- `src\themes\Trevilo\components\Packages.tsx` ⭐ (tarjeta flotante "Bali Island")
- `src\themes\Trevilo\components\Testimonials.tsx`
- `src\themes\Trevilo\components\Footer.tsx` ⭐ (reuse del hero image en CTA interno)
