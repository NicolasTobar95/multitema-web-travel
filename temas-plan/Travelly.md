# Travelly — Documento de Diseño

> Tema del portfolio travel-portfolio. Documento de arquitectura visual e inventario de componentes.
> Ruta base: `src/themes/Travelly/`
> Stack: React 19 + Vite + Tailwind v3 · i18n vía `useTranslation()` · imágenes vía `sharedImages`

---

## 1. Filosofía de diseño

Travelly es el tema **más completo** del portfolio (8 componentes vs. 6-7 de los hermanos) y se rodea de una identidad **inmersiva azul con tarjeta fotográfica gigante de fondo**. La confirmación está en `Hero.tsx`: un contenedor de `h-[600px] md:h-[650px]` con `rounded-[2rem]` y `bg-cover bg-center` que aplica `themeData.Travelly.heroImageUrl` mediante `style={{ backgroundImage }}`. Sobre esa foto se superpone un **overlay azul**: `absolute inset-0 bg-blue-900/40 rounded-[2rem]`. Esa es la "tarjeta fotográfica gigante de fondo" — el hero entero es una sola foto panorámica con foco azul.

El azul `#3b82f6` (blue-500 en Tailwind) es el **color de marca**: aparece como `text-[#3b82f6]` en el logo (Navbar y Footer), como `bg-[#3b82f6]` en todos los botones primarios (Hero, Discover, CTA, Footer) y como `bg-blue-900/40` para el overlay del hero. El acento cálido es `#fb923c` (orange-400) para estrellas, chip `+24` del hero y botón Sign Up del Navbar (con `hover:bg-[#f97316]` orange-500). Es un esquema dual **azul de marca + naranja cálido de acción**.

El **buscador con pestañas** se confirma en `Hero.tsx`: una tarjeta `absolute -bottom-16` que sobresale del contenedor fotográfico (half-in / half-out del hero), con `tabs` renderizadas como `Object.values(heroData.tabs)` usando `rounded-t-xl` y estado activo `bg-white text-blue-600` contra inactivas `bg-white/20 text-white backdrop-blur-md`. La caja principal del buscador es `bg-white rounded-3xl p-6 shadow-2xl`.

Respecto a la **galería masonry**: *no es* `column-count`, *no es* `grid auto-flow: dense`, *no es* `columns-*`. En CTA es un `flex items-center justify-center gap-3 md:gap-6` con `flex-1` en cada item y alturas alternas **hardcodeadas** en un array `heights = ['h-[150px] md:h-[200px]', 'h-[280px]', 'h-[350px]', 'h-[280px]', 'h-[200px]']` — es decir, **imitan masonry con flex de alturas simétricas** (curva ascendente-descendente). `RelaxingSpots` es un grid regular `grid-cols-4` con `h-[280px]` fijo — no hay masonry ahí.

---

## 2. Paleta de colores y tipografía

### Colores específicos

| Uso | Clase / hex | Apariciones |
|---|---|---|
| Azul de marca (logo, botones primarios, focus input) | `#3b82f6` (blue-500) | Navbar, Hero, Discover, CTA, Footer |
| Azul hover (botones primarios) | `blue-600` | Hero, Discover, CTA, Footer |
| Overlay del hero | `bg-blue-900/40` | Hero |
| Tab activa del buscador | `text-blue-600` | Hero |
| Azules suaves (chip número) | `bg-blue-100 text-blue-600` | Services |
| Hover de íconos en buscador | `group-hover:text-blue-500` | Hero |
| Naranja cálido de acento | `#fb923c` (orange-400) | Navbar (Sign Up), Hero (chip +24), RelaxingSpots (★), ClientReview (★) |
| Naranja hover | `#f97316` (orange-500) | Navbar |
| Naranjas suaves (ícono Services) | `bg-orange-100 text-orange-600` | Services |
| Verde suave (ícono Services) | `bg-green-100 text-green-600` | Services |
| Texto primario neutro | `text-neutral-900` | transversal |
| Texto secundario | `text-neutral-500` / `text-neutral-600` | subtítulos, descripciones |
| Texto placeholder/débil | `text-neutral-400` / `text-neutral-300` | Hero placeholders, ClientReview paginador |
| Bordes | `border-neutral-100/200/300` | tarjetas, divisores, footer |
| Fondo general | `bg-white` (root) | index.tsx |
| Overlay blanco sobre foto | `bg-white/10/20/30/40/80` | Hero (chips, íconos sociales, tabs, avatares) |

**No hay uso de `from-blue-*` / `to-blue-*`** — ningún gradiente cromático. El "inmersivo azul" viene del overlay `bg-blue-900/40` sobre la imagen y de los azules sólidos.

### Tipografía

- **Familia:** `font-sans` (Tailwind default = ui-sans-serif / system-ui). **No hay `fontFamily` custom en este tema.**
- **Pesos dominantes:** `font-extrabold` (h1/h2), `font-bold` (h3, spans con énfasis, ícono Services), `font-semibold` (etiquetas uppercase, tags), `font-medium` (CTAs, texto pequeño). Falta `font-light`.
- **Tamaños dominantes:**
  - H1 hero: `text-5xl md:text-7xl` (el pico)
  - H2 secciones (Services/RelaxingSpots/Discover/ClientReview/CTA): `text-4xl md:text-5xl` (uniforme)
  - H3: `text-xl` / `text-3xl` / `text-lg`
  - Body grande: `text-lg` (ClientReview quote)
  - Body estándar: `text-sm` y `text-xs` (subtítulos, descripciones, badges)
  - Etiquetas uppercase: `text-sm uppercase tracking-widest`
- **Leading significativo:** `leading-[1.1]` (Hero h1), `leading-[1.15]` (h2 de RelaxingSpots/Discover/CTA), `leading-relaxed` (bodies)

---

## 3. Layout general

El root `index.tsx` envuelve los 8 componentes en:

```
<div className="min-h-screen bg-white font-sans text-neutral-900 overflow-x-hidden">
```

El `overflow-x-hidden` es crítico porque el hero saca su tarjeta buscador con `-bottom-16` y el CTA usa `overflow-hidden` propio.

**Orden vertical de los 8 componentes:**

1. `Navbar` — full-bleed horizontal, sin max-width, `px-8 py-6 bg-white`
2. `Hero` — `w-full px-4 md:px-8 pb-24` (sin max-width; foto anchísima), tarjeta interna `h-[600px] md:h-[650px]` redondeada, buscador sobresale `-bottom-16` (vital: el `pb-24` da aire para el buscador)
3. `Services` — `max-w-7xl mx-auto px-6 md:px-12 py-20`, grid 3 columnas
4. `RelaxingSpots` — `max-w-7xl mx-auto px-6 md:px-12 py-16`, grid 4 columnas
5. `Discover` — `max-w-7xl mx-auto px-6 md:px-12 py-24`, layout 2 columnas (50/50)
6. `ClientReview` — `max-w-7xl mx-auto px-6 md:px-12 py-24`, layout 2 columnas
7. `CTA` — `w-full flex flex-col items-center pt-24 pb-16 overflow-hidden`, galería interna `max-w-[1600px]` (más ancha que el resto — casi full-bleed)
8. `Footer` — `w-full border-t pt-20 pb-8 px-6 md:px-12 mt-10`, interno `max-w-7xl mx-auto`

**Container pattern dominante:** `max-w-7xl mx-auto px-6 md:px-12` (5 componentes lo usan). El hero y CTA rompen ese patrón apropósito para lograr full-bleed fotográfico. Spacing vertical dominante: `py-20`/`py-24`/`py-16` — secciones aireadas, no densas. Gap estándar entre cards: `gap-8`.

---

## 4. Inventario de componentes

### 4.1 Navbar
**Ruta:** `src/themes/Travelly/components/Navbar.tsx`

- **Rol:** navegación superior sticky-like (aunque no es sticky — solo está al tope). Logo + "Get App" con íconos Apple/Google Play + 4 links + CTA "Sign Up".
- **Estructura semántica:**
  ```
  <nav>  (flex justify-between)
    <div left>
      <div logo (svg avión + "Travelly")>
      <div getApp (texto + 2 svgs plataformas)>
    <div center links>
      Home (activo) | About | Packages | Community
    <div right>
      <button Sign Up> (con ícono flecha)
  ```
- **Claves Tailwind:** `w-full flex items-center justify-between px-8 py-6 bg-white text-neutral-900`, `font-bold text-xl text-[#3b82f6]`, `hidden md:flex border-l border-neutral-200 pl-8`, `hidden lg:flex items-center gap-8 text-neutral-600`, `bg-[#fb923c] hover:bg-[#f97316] text-white px-5 py-2.5 rounded-full shadow-sm`.
- **`t()` consumidas:** `Travelly.nav` (`.getApp`, `.home`, `.about`, `.packages`, `.community`, `.signUp`).
- **`sharedImages`:** ninguno (íconos son SVG inline).
- **Datos/props:** ninguno — solo `t()`.

### 4.2 Hero ⭐ (componente clave)
**Ruta:** `src/themes/Travelly/components/Hero.tsx`

- **Rol:** hero inmersivo con tarjeta fotográfica gigante de fondo + buscador superpuesto con pestañas.
- **Estructura semántica:**
  ```
  <section pb-24>
    <div tarjeta fotográfica (relative, h-600/650, rounded-2rem, bg-cover)>
      <div overlay blue-900/40>
      <div social vertical (right-6, top-1/2 -translate-y-1/2)>
      <div contenido central (relative z-10, -mt-20)>
        <span tag uppercase tracking-widest>
        <div chip socialInfo (avatars pravatar + "+24")>
        <h1 title (drop-shadow-lg)>
      <div buscador absolute -bottom-16 z-30 w-[95%] max-w-5xl>
        <div tabs (rounded-t-xl, activo=bg-white/blue-600)>
        <div caja blanca (rounded-3xl p-6 shadow-2xl)>
          <div subfilters (airlines activo / class / type)>
          <div inputs (flex lg:divide-x)>
            Location | CheckIn | CheckOut | Who + Botón Buscar
  ```
- **Claves Tailwind:** `relative w-full h-[600px] md:h-[650px] rounded-[2rem] bg-cover bg-center`, `absolute inset-0 bg-blue-900/40 rounded-[2rem] z-0`, `absolute -bottom-16 w-[95%] max-w-5xl z-30`, `bg-white rounded-3xl p-6 shadow-2xl`, `flex flex-col lg:flex-row lg:divide-x divide-neutral-200`, `bg-[#3b82f6] hover:bg-blue-600 ... hover:scale-105`.
- **`t()` consumidas:** `Travelly.hero` (`.tag`, `.socialInfo`, `.title`, `.tabs` objeto, `.filters.airlines/.class/.type`, `.search.location/.locationDesc/.checkIn/.checkInDesc/.checkOut/.checkOutDesc/.who/.whoDesc/.button`).
- **Datos externos:** `themeData.Travelly.heroImageUrl` (vía `style.backgroundImage`).
- **`sharedImages`:** NO — los avatares del chip social vienen de `https://i.pravatar.cc/100?img=${i+10}` (URL externa hardcodeada).

### 4.3 Services
**Ruta:** `src/themes/Travelly/components/Services.tsx`

- **Rol:** grid de 3 servicios numerados con ícono, título, descripción y CTA.
- **Estructura semántica:**
  ```
  <section max-w-7xl py-20>
    <h2 title> <p subtitle>
    <div grid md:grid-cols-3 gap-8>
      map cards →
        <div card (rounded-3xl, border, hover:-translate-y-1)>
          <div número en círculo (bgColors[idx])>
          <h3> <p> <button>
  ```
- **Claves Tailwind:** `max-w-7xl mx-auto px-6 md:px-12 py-20`, `grid grid-cols-1 md:grid-cols-3 gap-8`, `bg-white rounded-3xl p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-neutral-100`, `hover:-translate-y-1 transition-transform`.
- **`t()` consumidas:** `Travelly.services` (`.title`, `.subtitle`, `.cards` array con `.id`, `.title`, `.desc`, `.action`).
- **`sharedImages`:** ninguno.
- **Datos/props:** dos arrays **hardcodeados en el componente** — `bgColors` (3 colores cíclicos) y `btnColors` (3 estilos de botón). El patrón asume 3 cards exactas — si `cards.length > 3` rompe el index.

### 4.4 RelaxingSpots
**Ruta:** `src/themes/Travelly/components/RelaxingSpots.tsx`

- **Rol:** grid de 4 destinos/alojamientos con filtros pill arriba. NO es masonry (grid regular).
- **Estructura semántica:**
  ```
  <section max-w-7xl py-16>
    <div header (title + subtitle flex justify-between)>
    <div filters pills (gap-3 mb-10)>
      map filters → button (primero activo, último con ícono filtro)
    <div grid 1/2/4 cols gap-6>
      map destinations →
        <div card>
          <div imagen h-[280px] rounded-2rem overflow-hidden>
          <div title + rating ★>
          <p location>
          <div border-t (dates + price + "/Night")>
  ```
- **Claves Tailwind:** `max-w-7xl mx-auto px-6 md:px-12 py-16`, `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`, `w-full h-[280px] rounded-[2rem] overflow-hidden mb-4`, `group-hover:scale-105 transition-transform duration-500`, `bg-neutral-900 text-white border-neutral-900` (filtro activo).
- **`t()` consumidas:** `Travelly.spots` (`.title`, `.subtitle`, `.filters` array, `.destinations` array con `.title`, `.rating`, `.location`, `.dates`, `.price`).
- **`sharedImages`:** `sharedImages.destinations[idx]` (4 imágenes por index).
- **Acoplamiento frágil:** el index de `destinations` se usa directo sobre `sharedImages.destinations[idx]` — si `destinations.length > sharedImages.destinations.length`, truena.

### 4.5 Discover
**Ruta:** `src/themes/Travelly/components/Discover.tsx`

- **Rol:** sección narrativa de 2 columnas (izquierda con foto alta + bloque de texto; derecha con foto landscape + descripción). NO es masonry — layouts rectos de 50/50.
- **Estructura semántica:**
  ```
  <section max-w-7xl py-24 flex lg:flex-row gap-16 lg:gap-24>
    <div left lg:w-1/2>
      <div tags (3 pills)>
      <div flex md:flex-row gap-8>
        <div imagen ALTA h-[400px] rounded-2.5rem>
        <div texto (titleLeft, descLeft, btnLeft, paginador "1 / 5")>
    <div right lg:w-1/2 lg:pl-10>
      <h2 titleRight>
      <div flex sm:flex-row gap-8>
        <div imagen LANDSCAPE h-32 w-48 rounded-2rem>
        <div texto (svg dollar + descRight)>
  ```
- **Claves Tailwind:** `max-w-7xl mx-auto px-6 md:px-12 py-24 flex flex-col lg:flex-row gap-16 lg:gap-24`, `lg:w-1/2`, `w-full md:w-64 h-[400px] shrink-0 rounded-[2.5rem]`, `bg-[#3b82f6] hover:bg-blue-600 ... rounded-full`.
- **`t()` consumidas:** `Travelly.discover` (`.tag`/`.tag2`/`.tag3` accedidos con array `['tag','tag2','tag3']`, `.titleLeft`, `.descLeft`, `.btnLeft`, `.titleRight`, `.descRight`).
- **`sharedImages`:** `sharedImages.narrative[0]` (img alta izq) y `sharedImages.narrative[1]` (img landscape der).
- **Rarezas:** el paginador "1 / 5" está **hardcodeado** en JSX — no viene de `t()` ni de datos.

### 4.6 ClientReview
**Ruta:** `src/themes/Travelly/components/ClientReview.tsx`

- **Rol:** testimonio de cliente con cita + foto principal + foto fantasma desenfocada detrás.
- **Estructura semántica:**
  ```
  <section max-w-7xl py-24 flex md:flex-row gap-16 lg:gap-24 items-center>
    <div left md:w-1/2>
      <h2 title>
      <p quote italic>
      <span "— author">
      <div 5 estrellas ★ (text-[#fb923c])>
      <div avatares superpuestos (-space-x-4, 3 imgs)>
    <div right md:w-1/2 relative>
      <div sombra (absolute top-8 right-12 blur-xl opacity-40 bg-cover)>
      <img frontal (relative z-10, rounded-2.5rem, shadow-2xl)>
  ```
- **Claves Tailwind:** `max-w-7xl mx-auto px-6 md:px-12 py-24 flex flex-col md:flex-row items-center gap-16 lg:gap-24`, `flex -space-x-4`, `absolute top-8 right-12 w-[80%] h-[500px] rounded-[2.5rem] bg-cover bg-center opacity-40 blur-xl z-0`, `relative z-10 w-[80%] h-[500px] object-cover rounded-[2.5rem] shadow-2xl`.
- **`t()` consumidas:** `Travelly.review` (`.title`, `.quote`, `.author`).
- **`sharedImages`:** `sharedImages.avatars[0]`/`[1]`/`[2]` (3 avatares superpuestos) + `sharedImages.avatars[3]` (foto principal del cliente y su doble desenfocado).
- **Rarezas:** usa una misma foto (`avatars[3]`) dos veces (frontal y ghost). Si el array `avatars` tiene menos de 4 elementos, falla.

### 4.7 CTA
**Ruta:** `src/themes/Travelly/components/CTA.tsx`

- **Rol:** cierre con CTA central + galería ondulada tipo "masonry visual" (flex de alturas alternas).
- **Estructura semántica:**
  ```
  <section w-full pt-24 pb-16 overflow-hidden>
    <div tag pill (explore + svg flecha)>
    <h2 title (whitespace-pre-line)>
    <p subtitle (max-w-2xl)>
    <button bg-[#3b82f6]>
    <div galería flex max-w-[1600px] gap-3 md:gap-6>
      map galleryImages →
        <div flex-1 rounded-2rem overflow-hidden shadow-lg hover:scale-105 + heights[idx] (alturas alternas)>
        <img>
  ```
- **Claves Tailwind:** `w-full flex flex-col items-center pt-24 pb-16 overflow-hidden`, `max-w-[1600px] mx-auto px-4 flex items-center justify-center gap-3 md:gap-6`, `flex-1 rounded-2xl md:rounded-[2rem] overflow-hidden shadow-lg hover:scale-105 transition-transform duration-500`, `bg-[#3b82f6] hover:bg-blue-600 ... hover:shadow-xl hover:-translate-y-1`.
- **`t()` consumidas:** `Travelly.cta` (`.explore`, `.title`, `.subtitle`, `.button`).
- **`sharedImages`:** construye array local `galleryImages = [destinations[0], narrative[0], destinations[2], destinations[1], destinations[3]]` — 5 imágenes mezclando ambos buckets del repositorio central.
- **"Masonry real":** array `heights` con 5 valores hardcodeados con curva `[200, 280, 350, 280, 200]` — produce la "onda" central más alta. Si `galleryImages.length !== 5`, rompe el index.

### 4.8 Footer
**Ruta:** `src/themes/Travelly/components/Footer.tsx`

- **Rol:** footer a 4 columnas (marca/descripción/CTA, links, contacto, newsletter) + barra de copyright con iconos sociales.
- **Estructura semántica:**
  ```
  <footer w-full border-t pt-20 pb-8 px-6 md:px-12 mt-10>
    <div max-w-7xl flex lg:flex-row gap-16 lg:gap-24 mb-16>
      <div col 1: logo + desc + button joinBtn>
      <div col 2: linksTitle + ul links (map)>
      <div col 3: contactTitle + ul contactInfo (map)>
      <div col 4: newsTitle + newsDesc + input email + button flecha>
    <div copyright bar (max-w-7xl border-t pt-8 flex)>
      <span copy>
      <div 3 svgs redes (FB/Twitter/Instagram)>
  ```
- **Claves Tailwind:** `w-full border-t border-neutral-100 pt-20 pb-8 px-6 md:px-12 mt-10`, `max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 mb-16`, `font-bold text-2xl text-[#3b82f6]`, `bg-[#3b82f6] hover:bg-blue-600 ... hover:-translate-y-0.5`, `w-full border border-neutral-200 rounded-full px-6 py-3.5 focus:border-[#3b82f6]`, `absolute right-2 top-2 ... w-10 h-10 rounded-full`.
- **`t()` consumidas:** `Travelly.footer` (`.desc`, `.joinBtn`, `.linksTitle`, `.links` array, `.contactTitle`, `.contactInfo` array, `.newsTitle`, `.newsDesc`, `.newsPlaceholder`, `.copy`).
- **`sharedImages`:** ninguno. 3 iconos sociales SVG en la barra copyright.
- **Rarezas:** el comment dice "Facebook, Twitter, Instagram, Dribbble" pero solo hay **3 iconos** efectivos — el de Dribbble no está.

---

## 5. Animaciones y transiciones

| Tipo | Dónde | Clases |
|---|---|---|
| Hover elevación (translate Y) | Services card, CTA button, Footer button | `hover:-translate-y-1 transition-transform`, `hover:-translate-y-0.5` |
| Hover scale up | Hero botón Buscar, RelaxingSpots imagen, CTA cards galería | `hover:scale-105 transition-transform duration-500` |
| Hover color de texto | Navbar links, Hero inputs (group-hover), Footer links, Footer iconos | `hover:text-neutral-900`, `group-hover:text-blue-500`, `hover:text-[#3b82f6]` |
| Hover bg de botón | todos los primary buttons | `hover:bg-blue-600` |
| Hover shadow | CTA button, Footer button | `hover:shadow-xl` (sobre `shadow-lg`), `hover:shadow-lg` (sobre `shadow-md`) |
| Hover bg chip social (Hero) | Hero redes sociales | `hover:bg-white/40 transition-colors` |
| Transiciones en tabs | Hero tabs | `transition-colors` y `backdrop-blur-md` en inactivas |
| Blur decorativo (transcendente clave) | ClientReview imagen fantasma | `blur-xl opacity-40` sobre `bg-cover bg-center` |
| Backdrop blur (glassmorphism) | Hero tabs inactivas, Hero chip socialINFO, Hero social icons | `backdrop-blur-md`, `backdrop-blur-sm`, `bg-white/10`, `bg-white/20` |
| Drop shadow en texto | Hero h1 | `drop-shadow-lg` |
| Shadow gran caja blanca | Hero buscador | `shadow-2xl` |
| Shadow sutil card | Services, RelaxingSpots | `shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)]`, `shadow-lg` |
| Parallax / scroll-tied | — | **NINGUNO.** No hay `parallax`, no hay `IntersectionObserver`, no hay framer-motion. Toda la animación es hover-only. |

---

## 6. Observaciones específicas del tema

**El más completo:**
- `index.tsx` tiene **8 componentes**, vs. hermanos temáticos con 6-7. Los comments `// <-- Inyectado` sugieren que ClientReview, CTA y Footer se agregaron después.
- Es el único tema con un buscador compuesto (tabs + filtros secundarios + 4 inputs), un "oyente glassmorphism" del chip de hero, y la sombra ghost en ClientReview.

**Deudas técnicas detectadas:**

1. **Acoplamiento por índice frágil** en 3 componentes: `RelaxingSpots` usa `sharedImages.destinations[idx]`, `ClientReview` usa `sharedImages.avatars[0..3]`, `CTA` construye `galleryImages` con 5 índices fijos. Cualquier cambio en la longitud de los arrays de `sharedImages` rompe el render en runtime (undefined src en `<img>`).
2. **Paginador hardcodeado en `Discover.tsx`** (`1 / 5` literal en JSX) — no depende de `t()` ni de datos. Es un fake estático.
3. **Avatares del hero via pravatar.cc** (`Hero.tsx`) — dependencia externa a un servicio tercer-party que mandan requests a `i.pravatar.cc`. No es lo mismo que `sharedImages`, rompe el patrón central-imágenes.
4. **Arrays de estilo hardcodeados en `Services.tsx`** (`bgColors`, `btnColors`) con exactamente 3 entradas — si `cards.length > 3`, vuelve undefined la style del índice 3+.
5. **Array `heights` hardcodeado en `CTA.tsx`** con 5 valores — si `galleryImages.length !== 5`, falla el index de alturas.
6. **Comentario incorrecto en `Footer.tsx`:** enumera "Facebook, Twitter, Instagram, Dribbble" pero solo hay 3 SVGs — falta Dribbble.
7. **`any` types en maps:** `(card: any, idx: number)` en Services, `(dest: any, idx: number)` en RelaxingSpots, `(tab: any, i: number)` en Hero. Sin tipado de i18n.
8. **Navbar no es sticky** — al hacer scroll, desaparece. En un tema "inmersivo" con hero largo, suele esperarse sticky.
9. **Accesibilidad:** ningún `aria-label`, los SVGs decorativos no están marcados como `aria-hidden`, los links `<a href="#">` son placeholders no navegables.
10. **Inputs del buscador son `div` con `cursor-pointer`, no `<input>`** — son falsos inputs visuales. No hay formulario real.

---

## 7. Oportunidades de mejora

1. **Desacoplar imágenes de índices hardcoded en RelaxingSpots, ClientReview y CTA.** Reemplazar `sharedImages.destinations[idx]` por un lookup defensivo (`sharedImages.destinations[idx % sharedImages.destinations.length]`) o, mejor, mapear los datos del i18n contra un campo `imageKey` en cada item. Igual para `avatars[3]` en ClientReview.
2. **Centralizar el paginador de `Discover.tsx`.** Mover el "1 / 5" hardcodeado al JSON de i18n (`discover.pageCurrent`, `discover.pageTotal`) o a un sub-componente `<Pager current total>` reutilizable.
3. **Hacer el Navbar sticky con transición de fondo** (`sticky top-0 z-50 backdrop-blur-md transition-colors`). Como el hero es inmersivo azul, un navbar que pase de transparente (sobre la foto) a blanco (al scrollear) reforzaría el carácter inmersivo.
4. **Reemplazar el `flex` con `heights[]` hardcoded del CTA por `columns-2 md:columns-3` con `break-inside-avoid`** para lograr un masonry real responsive (Tailwind v3 ya lo soporta). El actual "onda simétrica" es frágil y no escala.
5. **Conversión de búsqueda visual a formulario accesible**: los 4 "inputs" del Hero (`location`, `checkIn`, `checkOut`, `who`) son `<div>` con `cursor-pointer`. Convertirlos a `<label>` + `<input>` reales con `aria-label` traducidos, agrupándolos en un `<form>` con `role="search"`.
6. *(bonus)* **Tipar el i18n**: crear `type TravellyKeys = { nav: {...}; hero: {...}; ... }` y generar `t<TravellyKeys>()` o un wrapper `tT()` tipado, eliminando los `(x: any)` en maps y dando autocomplete por componente.

---

## 8. Rutas absolutas de referencia

- `src\themes\Travelly\index.tsx` — entry del tema
- `src\themes\Travelly\components\Navbar.tsx`
- `src\themes\Travelly\components\Hero.tsx` ⭐ (tarjeta fotográfica gigante + buscador con pestañas)
- `src\themes\Travelly\components\Services.tsx`
- `src\themes\Travelly\components\RelaxingSpots.tsx`
- `src\themes\Travelly\components\Discover.tsx`
- `src\themes\Travelly\components\ClientReview.tsx` ⭐ (sombra ghost blur-xl)
- `src\themes\Travelly\components\CTA.tsx` ⭐ (galería masonry "ondulada")
- `src\themes\Travelly\components\Footer.tsx`
