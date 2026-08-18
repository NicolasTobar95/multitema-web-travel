# AERIA — Documento de Diseño (Retoque de "Travelly")

> **Nombre del tema:** **Aeria**
> *Tagline sugerido: "Every trip, planned for you."*
> Basado en la arquitectura original de `Travelly`, retocado para portfolio de temas dinámicos orientado a presentación comercial.
> Ruta base sugerida: `src/themes/Aeria/`
> Stack: React 19 + Vite + Tailwind v3 · i18n vía `useTranslation()` · imágenes vía `sharedImages`

---

## 0. Por qué "Aeria" y por qué este retoque

Travelly ya era, de los cuatro, **el tema producto**: 8 componentes, buscador con pestañas y filtros, logo de avión + sección "Get App", el más cercano a una app de booking real (Skyscanner/Booking) que a un portfolio editorial. **Aeria** viene de ahí — de "aéreo", del logo de avión que ya tenía el Navbar — y se queda con el registro de "app de viajes completa" que el original ya perseguía, solo que ahora lo cumple de verdad.

**Elementos que se mantienen intactos (ya eran de alto valor):**
- Hero con tarjeta fotográfica gigante + overlay azul + buscador de pestañas semi-flotante (`-bottom-16`) — el patrón más fuerte del tema.
- Esquema dual **azul de marca + naranja cálido de acción** — se mantiene sin diluir.
- La "sombra ghost" (`blur-xl opacity-40`) detrás de la foto de `ClientReview` — detalle sutil y ya distintivo.
- Container `max-w-7xl mx-auto px-6 md:px-12` como patrón dominante, con Hero y CTA rompiéndolo a propósito.

**Lo nuevo — el "algo especial" de este tema:**
- **`AeriaConcierge`**: un widget flotante de asistente de viaje con IA (chip inferior derecho → panel expandible con sugerencias de destino) — hoy el feature más presente en el travel-tech de punta (Booking Trip Planner, Expedia Romie). Es la pieza que más siente "app completa" y encaja de forma natural con un tema que ya tenía Navbar de app, "Get App" y el buscador más sofisticado del set.
- **Carrusel drag-to-explore** en `RelaxingSpots`, reemplazando el grid estático de 4 columnas por un scroll horizontal con snap y momentum táctil — patrón que hoy domina en Booking/Airbnb para listados de destino.
- **Navbar sticky con transición glass→sólido** al hacer scroll (ya estaba sugerido como mejora en el documento original; en Aeria queda resuelto, no solo propuesto).
- **Parallax sutil de profundidad** entre la foto frontal y la sombra ghost de `ClientReview`: al hacer scroll, la sombra se desplaza a una velocidad ligeramente distinta que la foto frontal, dando sensación de profundidad real en vez de blur estático.

---

## 1. Filosofía de diseño

Aeria sigue siendo una pieza **inmersiva azul con tarjeta fotográfica gigante de fondo**: el hero entero es una foto panorámica con `bg-blue-900/40` de overlay, y el buscador de pestañas sale medio adentro/medio afuera de esa tarjeta (`-bottom-16`). Es el patrón que más "producto real" transmite del set de cuatro temas, y se mantiene como columna vertebral.

Lo que cambia es que ahora ese carácter de "app completa" se sostiene con interacción real, no solo con superficie: el nuevo `AeriaConcierge` convierte al tema en el único de los cuatro con un elemento de **asistencia activa** — no es una sección más para hacer scroll, es un widget que el usuario puede abrir en cualquier punto del recorrido. Y el carrusel táctil de `RelaxingSpots` reemplaza un grid que antes era puramente decorativo por algo que invita a explorar con el gesto, coherente con el registro "app" del tema.

El **naranja de acción** (`#fb923c`/`#f97316`) se mantiene como el único acento cálido — el chip del `AeriaConcierge` lo usa como color de estado "activo/escuchando", reforzando la regla ya existente de que el naranja siempre marca *acción disponible*, nunca decoración.

---

## 2. Paleta de colores y tipografía

### Colores

| Uso | Clase / hex |
|---|---|
| Azul de marca (logo, botones primarios, focus input) | `#3b82f6` (blue-500) |
| Azul hover | `blue-600` |
| Overlay del hero | `bg-blue-900/40` |
| Tab activa del buscador | `text-blue-600` |
| Azules suaves (chip número) | `bg-blue-100 text-blue-600` |
| Naranja cálido de acción | `#fb923c` (orange-400) — **ahora también el estado "activo" del Concierge** |
| Naranja hover | `#f97316` (orange-500) |
| Texto primario / secundario | `text-neutral-900` / `text-neutral-500/600` |
| Fondo general | `bg-white` |
| Overlay blanco sobre foto | `bg-white/10–80` (Hero, Concierge) |

Se mantiene la regla explícita del original: **sin gradientes cromáticos** (`from-blue-*`/`to-blue-*`) — todo el peso visual azul viene de superficies sólidas y del overlay sobre foto, nunca de degradados.

### Tipografía

- **Familia:** `font-sans`, sin custom font — se mantiene, es coherente con el registro "app de producto" (no editorial).
- **Pesos y tamaños:** sin cambios respecto al original (H1 `text-5xl md:text-7xl`, H2 uniforme `text-4xl md:text-5xl`, body `text-sm`/`text-xs`).
- **Nuevo uso:** el panel del `AeriaConcierge` usa `text-sm` para las sugerencias y `text-xs uppercase tracking-widest` para el label "Aeria AI" — reutiliza la misma escala de labels que ya usa el buscador del Hero, sin introducir un tamaño nuevo.

---

## 3. Layout general

```
<div min-h-screen bg-white font-sans text-neutral-900 overflow-x-hidden>
  Navbar          (sticky top-0 z-50, glass→sólido al hacer scroll)   ← corregido
  Hero            (tarjeta fotográfica + buscador -bottom-16)
  Services        (max-w-7xl, grid 3 cols)
  RelaxingSpots   (carrusel drag-to-explore, no grid estático)         ← corregido
  Discover        (max-w-7xl, 2 columnas 50/50)
  ClientReview    (max-w-7xl, 2 columnas + parallax en sombra ghost)   ← mejorado
  CTA             (galería masonry real con columns-*, no flex hardcoded) ← corregido
  Footer          (max-w-7xl, 4 columnas)
  AeriaConcierge  (fixed bottom-6 right-6 z-50, overlay a todo el tema) ← nuevo
</div>
```

- **Container pattern:** se mantiene `max-w-7xl mx-auto px-6 md:px-12` como dominante; Hero y CTA siguen rompiéndolo a propósito para lograr full-bleed fotográfico.
- **`AeriaConcierge` vive fuera del flujo vertical**: es un elemento `fixed`, presente en todas las secciones, no una sección más — coherente con cómo funcionan los asistentes de viaje reales.

---

## 4. Inventario de componentes

### 4.1 Navbar — corrección de deuda
- Pasa de estático a **`sticky top-0 z-50`** con transición: transparente/glass (`bg-white/10 backdrop-blur-md`) sobre el hero, y `bg-white shadow-sm` sólido al superar el scroll del hero — usando el mismo hook `useInView`/scroll-listener liviano que el resto del retoque.
- Links `<a href="#">` placeholder → se documentan como rutas reales pendientes de router, no decorativas.

### 4.2 Hero — sin cambios estructurales, una corrección de dato
- Buscador de pestañas, chip social y overlay azul: **intactos**, es el componente más fuerte del tema.
- Avatares del chip social (`i.pravatar.cc`, servicio externo de terceros) → migrados a `sharedImages.avatars[]`, cerrando la dependencia externa y alineando el componente con el resto del sistema de imágenes.
- Los 4 "inputs" del buscador (`location`, `checkIn`, `checkOut`, `who`) pasan de `<div cursor-pointer>` a `<label>` + `<input>` reales dentro de un `<form role="search">`, con `aria-label` traducido — el buscador ahora es accesible y funcionalmente real, no solo visual.

### 4.3 Services — corrección de deuda
- `bgColors`/`btnColors` hardcodeados a exactamente 3 entradas → colores cíclicos por `index % colors.length`, soportando `cards.length` variable sin romper.
- `(card: any, idx)` → tipado con interfaz `ServiceCard`.

### 4.4 RelaxingSpots *(retocado — el componente diferencial #1)*
- El grid estático `grid-cols-4` pasa a un **carrusel horizontal drag-to-explore**: `overflow-x-auto snap-x snap-mandatory` con momentum táctil nativo (sin librería — CSS scroll-snap puro) y flechas de navegación discretas que aparecen solo en desktop (`hidden md:flex` sobre los extremos).
- Cada card mantiene su estructura original (imagen `h-[280px] rounded-[2rem]`, rating, precio) — el cambio es de contenedor, no de card individual.
- `sharedImages.destinations[idx]` acoplado por índice → lookup defensivo `destinations[idx % sharedImages.destinations.length]`, cerrando la deuda de acoplamiento frágil.
- **Por qué encaja:** es el patrón que hoy usan Booking y Airbnb para listados de destino — "deslizar para explorar" se siente más *producto* que un grid fijo, y es coherente con el registro app que ya tenía el tema.

### 4.5 Discover — corrección de deuda
- Paginador `"1 / 5"` hardcodeado → `t('Aeria.discover.pageCurrent')` / `.pageTotal`, o subcomponente `<Pager current total />` reutilizable.
- Resto de la estructura (columna alta + columna landscape, tags triples) intacta.

### 4.6 ClientReview — mejora del efecto existente
- La "sombra ghost" (`blur-xl opacity-40`) se mantiene, pero ahora tiene **parallax de profundidad**: al hacer scroll, la foto frontal y la sombra se desplazan a velocidades ligeramente distintas (`translateY` con distinto factor), dando sensación de separación real entre capas en vez de blur estático. Efecto sutil, sin librerías — un solo listener de scroll con `requestAnimationFrame`.
- `avatars[3]` reutilizada dos veces (frontal + ghost) — se mantiene, es intencional y funciona bien visualmente; se documenta como decisión, no como deuda.

### 4.7 CTA — corrección de deuda (masonry real)
- El `flex` con array `heights` hardcodeado (`[200, 280, 350, 280, 200]`) → **masonry real** con `columns-2 md:columns-3 gap-3 md:gap-6` + `break-inside-avoid` en cada item (soportado nativamente en Tailwind v3). Ya no depende de que `galleryImages.length === 5` exactamente.
- `galleryImages` sigue mezclando `destinations` y `narrative` de `sharedImages`, ahora con `.slice()` defensivo en vez de índices fijos.

### 4.8 Footer — corrección menor
- Comentario que enumera "Facebook, Twitter, Instagram, Dribbble" pero renderiza solo 3 iconos → se agrega el cuarto ícono (Dribbble) o se corrige el comentario para reflejar los 3 reales. Se opta por completar el cuarto ícono, ya que el layout (`gap` entre iconos) ya estaba pensado para 4.

### 4.9 AeriaConcierge *(nuevo — el componente diferencial #2, la pieza insignia)*
**Rol:** widget flotante de asistente de viaje. Chip circular `fixed bottom-6 right-6` con el logo-avión del tema; al hacer clic, expande un panel `w-80 md:w-96 rounded-[2rem] bg-white shadow-2xl` con:
- Header: `"Aeria AI"` en `text-xs uppercase tracking-widest text-blue-600`, punto de estado `bg-[#fb923c]` (animación `pulse` suave, no parpadeo agresivo).
- Input de texto libre (`"¿A dónde te gustaría ir?"`) con el mismo estilo `rounded-full border focus:border-[#3b82f6]` que ya usa el buscador del Hero — reutiliza el lenguaje visual existente, no inventa uno nuevo.
- 3 chips de sugerencia rápida (`bg-blue-100 text-blue-600 rounded-full px-4 py-2 text-sm`) con destinos precargados desde `themeData.Aeria.suggestions` — mismo patrón de chip suave que ya usaba `Services`.
- Estado colapsado por defecto; se abre con `scale-95 opacity-0 → scale-100 opacity-100` (`transition-transform duration-200`).

**Clases clave:** `fixed bottom-6 right-6 z-50`, chip `w-14 h-14 rounded-full bg-[#3b82f6] shadow-xl hover:scale-105`, panel `rounded-[2rem] shadow-2xl border border-neutral-100`.
**`t()`:** `Aeria.concierge` con `.greeting`, `.placeholder`, `.suggestions[]`.
**Nota de alcance:** el componente es una **interfaz de UI** (mock de conversación con sugerencias precargadas) — no implica integración real con un modelo de lenguaje; queda documentado como punto de extensión si el cliente quiere conectarlo a un backend de IA real más adelante.

---

## 5. Animaciones y transiciones

| Mecanismo | Dónde | Tipo |
|---|---|---|
| `hover:-translate-y-1` / `-0.5` | Services card, CTA/Footer buttons | elevación |
| `hover:scale-105` | Hero botón buscar, RelaxingSpots imagen, CTA cards | zoom |
| `hover:bg-blue-600` | todos los primary buttons | color |
| `backdrop-blur-md/sm` | Hero tabs, chips sociales | glassmorphism, sin cambios |
| **Navbar glass→sólido** *(nuevo)* | Navbar | transición de fondo ligada a scroll |
| **`snap-x snap-mandatory` + momentum táctil** *(nuevo)* | RelaxingSpots | scroll horizontal nativo |
| **parallax de dos capas (`requestAnimationFrame`)** *(nuevo)* | ClientReview (ghost vs. frontal) | profundidad de scroll |
| **`scale-95/opacity-0 → scale-100/opacity-100`** *(nuevo)* | AeriaConcierge panel | apertura del widget |
| **`animate-pulse` suave** *(nuevo)* | punto de estado del Concierge | indicador de disponibilidad |
| Blur decorativo ghost | ClientReview | se mantiene, ahora con parallax |

Todo lo nuevo sigue sin dependencias externas de animación — scroll-snap y `columns-*` son CSS nativo, y el parallax usa un solo listener con `requestAnimationFrame`, coherente con que el tema original ya era 100% hover-driven sin librerías.

---

## 6. Deudas resueltas (frente al documento original)

| # | Deuda original | Resolución en Aeria |
|---|---|---|
| 1 | Acoplamiento por índice frágil (RelaxingSpots, ClientReview, CTA) | Lookups defensivos con `% length` / `.slice()` |
| 2 | Paginador `"1 / 5"` hardcodeado en Discover | Migrado a `t()` o `<Pager />` |
| 3 | Avatares del Hero vía `pravatar.cc` (servicio externo) | Migrados a `sharedImages.avatars[]` |
| 4 | `bgColors`/`btnColors` limitados a 3 en Services | Cíclicos por `index % length` |
| 5 | `heights[]` hardcodeado en CTA (masonry falso) | `columns-2 md:columns-3` + `break-inside-avoid` (masonry real) |
| 6 | Footer: comentario menciona Dribbble, falta el ícono | Cuarto ícono agregado |
| 7 | `any` types en maps (Services, RelaxingSpots, Hero) | Interfaces tipadas por componente |
| 8 | Navbar no sticky en tema inmersivo | `sticky` con transición glass→sólido |
| 9 | Sin `aria-label`, SVGs sin `aria-hidden`, links `href="#"` | Accesibilidad agregada; links documentados como pendientes de router |
| 10 | Inputs del buscador eran `<div>` falsos | `<form role="search">` con `<input>`/`<label>` reales |

---

## 7. Rutas de referencia sugeridas

- `src/themes/Aeria/index.tsx`
- `src/themes/Aeria/components/Navbar.tsx`
- `src/themes/Aeria/components/Hero.tsx`
- `src/themes/Aeria/components/Services.tsx`
- `src/themes/Aeria/components/RelaxingSpots.tsx`
- `src/themes/Aeria/components/Discover.tsx`
- `src/themes/Aeria/components/ClientReview.tsx`
- `src/themes/Aeria/components/CTA.tsx`
- `src/themes/Aeria/components/Footer.tsx`
- `src/themes/Aeria/components/AeriaConcierge.tsx` *(nuevo)*
- `src/themes/Aeria/hooks/useScrollDirection.ts` *(nuevo — Navbar sticky)*
- `src/themes/Aeria/hooks/useParallax.ts` *(nuevo — ClientReview)*
