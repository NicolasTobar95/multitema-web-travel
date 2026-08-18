# WAYPOINT — Documento de Diseño (Retoque de "PacificNW")

> **Nombre del tema:** **Waypoint**
> *Tagline sugerido: "Every coordinate, a story."*
> Basado en la arquitectura original de `PacificNW`, retocado para portfolio de temas dinámicos orientado a presentación comercial.
> Ruta base sugerida: `src/themes/Waypoint/`
> Stack: React 19 + Vite + Tailwind v3 · i18n vía `useTranslation()` · imágenes vía `sharedImages`

---

## 0. Por qué "Waypoint" y por qué este retoque

El original ya era el tema con **más identidad editorial** de los cuatro: contraste tipográfico extremo (Bebas Neue gigante vs. micro-caption uppercase), timeline en zig-zag con línea punteada y nodos, y un lenguaje visual de "cuaderno de bitácora" (coordenadas GPS, captions de foto, un único acento rojo). El nombre **Waypoint** — el término náutico/GPS para "punto de ruta" — no es decorativo: nace directo del motivo de coordenadas que ya vive en Timeline y Olympic, y le da sentido narrativo a la pieza nueva que se agrega en este retoque.

**Elementos que se mantienen intactos (ya eran de alto valor):**
- Contraste tipográfico display-gigante / caption-micro como columna vertebral.
- Monocromo neutro + acento único `red-500` (sin diluirlo con más colores).
- Timeline en zig-zag con línea central punteada y nodos circulares — el patrón más original del set de temas.
- El único uso de `font-serif italic` como concesión clásica puntual (se recontextualiza como firma, no como accidente).

**Lo nuevo — el "algo especial" pedido para este tema:**
- **`RouteMap`**: mapa-ruta interactivo con trazo animado (SVG `stroke-dashoffset`) que dibuja el recorrido entre las paradas al hacer scroll — hoy uno de los recursos más premiados en sitios de viaje/editorial (Awwwards, FWA). Reutiliza el mismo lenguaje `border-dashed` que ya existía en Timeline, así que no es un injerto: es la evolución natural del propio motivo del tema.
- **Contadores animados (odometer)** en Olympic — los stats (días, millas, elevación) cuentan desde 0 al entrar en viewport, en vez de aparecer estáticos.
- **Cursor-follow image preview** en los links de "More Experiences" del Footer — al pasar el mouse por un link, una miniatura de la foto sigue al cursor. Es el recurso de portfolio editorial más imitado de los últimos dos años.
- **Textura de grano sutil** (`noise overlay`, `mix-blend-overlay` muy bajo opacity) sobre las fotos del Hero y Olympic — refuerza la sensación "print/National Geographic" que ya estaba en la filosofía original, sin tocar la paleta.

---

## 1. Filosofía de diseño

Waypoint sigue siendo una pieza **editorial de travel-log** en la línea de una revista impresa: contraste tipográfico extremo, `leading-[0.85]`/`leading-none` para que los títulos pesen como bloques, y cuerpo micro (`text-xs`, `text-[10px]`) que evoca etiquetas de archivo y captions de foto. La paleta sigue siendo **monocromática neutra con un único acento rojo** — se mantiene la regla explícita de que **todo el calor cromático viene de la fotografía**, nunca del CSS.

Lo que cambia es que ahora el motivo de "bitácora de viaje" no vive solo en el texto (coordenadas, labels) sino que se hace **literal**: el nuevo `RouteMap` traza sobre un mapa estilizado el mismo camino que describe el Timeline, con el trazo dibujándose progresivamente mientras el usuario hace scroll. Es el tipo de detalle que convierte un tema "bonito" en un tema "memorable" — y es coherente al 100% con la identidad ya existente, no un componente traído de otro tema.

La **textura de grano** sobre Hero y Olympic es sutil (opacity 3–5%) y solo sobre superficies fotográficas oscuras — nunca sobre `bg-white`, para no ensuciar las secciones de lectura (Author, Footer).

---

## 2. Paleta de colores y tipografía

### Colores

| Uso | Clases Tailwind |
|---|---|
| Fondo página | `bg-white` |
| Overlays sobre foto | `bg-black/40` (Hero), `bg-black/60` (Olympic), `bg-black/50` (RouteMap) |
| Texto principal claro | `text-white` (Navbar, Hero, Olympic, RouteMap) |
| Familia neutra | `text-neutral-900/800/600/500/400/300` |
| Acento vehicular | `red-500` (timeline nodos, badge "+", trazo de RouteMap), `red-400` (hover navbar), `red-600` (hover footer) |
| Bordes sutiles | `border-neutral-100/300`, `border-white/20/50` |
| **Logo unificado** *(corregido)* | `currentColor` — antes eran hex literales `#EF4444`/`#171717` duplicados |

### Tipografía

- **`font-display`** (Bebas Neue) — títulos grandes, stats, y ahora también las etiquetas de punto en `RouteMap`.
- **`font-sans`** — cuerpo, navbar, links.
- **`font-serif italic`** — se mantiene como aparición única e intencional (subtítulo "Mount Garibaldi"), y se replica **una sola vez más** en el titular del `RouteMap` para que la firma tipográfica tenga dos anclas en vez de una sola isla aislada.
- **Tamaños:** sin cambios (`text-[140px]` → `text-[9px]`), se mantiene la escala extrema original.
- **Tracking / Leading:** sin cambios — es una de las señas de identidad más fuertes del tema.

---

## 3. Layout general

```
<div min-h-screen bg-white font-sans text-neutral-900>
  Navbar     (absolute, z-20, sobre el Hero)
  Hero       (h-screen w-full, grano sutil sobre overlay)
  Timeline   (theme-container, py-24)
  RouteMap   (theme-container, py-24)     ← nuevo, mapa con trazo animado
  Olympic    (theme-container, py-32 md:py-48, stats con odometer)
  Author     (theme-container, py-24)
  Footer     (theme-container ampliado, cursor-follow preview en links)
</div>
```

- **Container unificado** *(corregido)*: se reemplazan los 4 anchos distintos (`max-w-4xl`, `max-w-7xl`, `max-w-[1400px]`, sin container) por una única utilidad `theme-container` = `max-w-7xl mx-auto px-6 md:px-12`, con **una excepción declarada**: el bloque top del Footer conserva `max-w-[1400px]` porque ahí vive el label rotado — se documenta como excepción intencional, no como inconsistencia accidental.
- **Spacing vertical:** se mantiene el ritmo generoso original (`py-24`, `py-32 md:py-48`), que es parte del carácter "editorial que respira" del tema — no se comprime.
- **RouteMap se ubica entre Timeline y Olympic**: visualmente cierra el relato de las dos paradas antes de entrar al bloque panorámico de Olympic.

---

## 4. Inventario de componentes

### 4.1 Navbar — corrección de deuda
- Logo SVG con `stroke="#EF4444"` → **`stroke="currentColor"` + `text-red-500`**, ahora themable.
- Contador `1,124` hardcoded → pasa a `themeData.Waypoint.stats.likes`, compartido con Author (ver 4.5).

### 4.2 Hero
- Estructura intacta (título `text-[140px]`, subtítulo micro, `mt-20` deliberado).
- **Nuevo:** overlay con capa de grano `opacity-[0.04] mix-blend-overlay pointer-events-none` sobre `bg-black/40` — refuerzo textural, cero impacto en legibilidad.

### 4.3 Timeline — correcciones de deuda
- Subtítulo bilingüe hardcodeado (`language === 'en' ? ... : ...`) → migrado a `t('Waypoint.timeline.stops[i].subtitle')`, cierra el contrato i18n.
- `stopsData[0].image2!` (non-null assertion) → chequeo condicional real: si `image2` es `null`, la parada renderiza sin la imagen de detalle en vez de forzar el tipo.
- `h-[400px]` / `h-[600px]` (alturas mágicas) → `aspect-[3/4]` y `aspect-[4/5]` consistentes, definidos como constantes `IMG_PORTRAIT`/`IMG_TALL` en `layout.ts`.
- Línea central punteada y nodos `border-red-500` — **intactos**, es el patrón más original del tema.

### 4.4 RouteMap *(nuevo — el componente diferencial)*
**Rol:** mapa estilizado (ilustración plana en tonos `neutral-100`/`neutral-300`, no un mapa real de terceros) que traza con una línea punteada roja el recorrido entre las paradas del Timeline y el punto de Olympic, dibujándose progresivamente a medida que la sección entra en viewport.

- **Mecánica:** SVG `<path>` con `stroke-dasharray` = longitud total del trazo y `stroke-dashoffset` animado de `length → 0` vía `IntersectionObserver` + `requestAnimationFrame` (o `@keyframes` si se prefiere CSS puro) — sin librerías de mapas ni dependencias externas.
- **Nodos:** mismos círculos `bg-white border-4 border-red-500 rounded-full` que ya usa Timeline — coherencia visual total con el patrón existente, reutilizado, no reinventado.
- **Etiquetas de punto:** `font-display text-sm tracking-widest uppercase` junto a cada nodo, con las coordenadas GPS reales de cada parada (mismo dato que ya consume Timeline, sin duplicar la fuente de verdad).
- **Titular de sección:** único segundo uso de `font-serif italic` del tema (ver sección 2).
- **Clases clave:** `theme-container py-24`, mapa en `relative aspect-[16/9] md:aspect-[21/9] bg-neutral-50 rounded-sm overflow-hidden`, trazo `stroke="#EF4444"` → mejor `stroke-red-500` vía CSS variable para mantener themability.
- **`t()`:** `Waypoint.routeMap` con `.title` y reutiliza `Waypoint.timeline.stops[].coords` para las etiquetas — una sola fuente de verdad.
- **`sharedImages`:** ninguno — es ilustración vectorial, no fotografía, así que no compite con el peso visual de Hero/Timeline/Olympic.

### 4.5 Olympic — animación nueva + corrección
- Estructura intacta (overlay `bg-black/60`, grid de 3 columnas, botón play).
- **Nuevo:** los 3 stats (`days`, `mileage`, `elevation`) usan un hook `useCountUp` que anima el valor de 0 al número final cuando la sección entra en viewport — mismo patrón `IntersectionObserver` que `RouteMap`, reutilizando el hook.
- **Nuevo:** capa de grano sutil, igual que en Hero, sobre el overlay `bg-black/60`.

### 4.6 Author — corrección de deuda
- Contadores `1,124` y `35` hardcoded → `themeData.Waypoint.stats.{likes, comments}` (fuente única, compartida con Navbar — ver 4.1).
- Badge "+" rojo: se mantiene visual, se le añade `onClick` funcional documentado como placeholder para "guardar autor", en vez de quedar puramente decorativo.

### 4.7 Footer — el segundo componente diferencial
- Estructura intacta: bloque top de 2 cards "More Experiences" + bloque bottom brand/links.
- **Nuevo — cursor-follow preview:** al pasar el cursor sobre cada link de la columna de navegación del footer, una miniatura (`w-40 h-52 rounded-sm object-cover shadow-2xl`) de la foto asociada a ese link sigue la posición del cursor con un `translate` suavizado (`ease-out`, sin librería de física, un `lerp` simple en `requestAnimationFrame`). Es el recurso que hoy diferencia un footer "de catálogo" de un footer "de estudio de diseño".
- Logo SVG duplicado (Navbar + Footer) → se extrae a un único `<BrandLogo />` compartido con `currentColor`, eliminando el segundo hex literal `#171717`.
- Label vertical rotado "More Experiences" y zoom `duration-700` en cards — **intactos**.

---

## 5. Animaciones y transiciones

| Mecanismo | Dónde | Tipo |
|---|---|---|
| `hover:text-red-400/500` | Navbar, Author, Footer links | color hover |
| `group-hover:scale-110` | Olympic (botón play) | micro-interacción |
| `group-hover:scale-105 duration-700` | Footer cards | zoom lento, sin cambios |
| **`stroke-dashoffset` animado por scroll** *(nuevo)* | RouteMap | **trazo de ruta progresivo** — pieza central del retoque |
| **`useCountUp` por `IntersectionObserver`** *(nuevo)* | Olympic stats | contador ascendente al entrar en viewport |
| **cursor-follow con `lerp` en `requestAnimationFrame`** *(nuevo)* | Footer links | preview de imagen que sigue al cursor |
| **`opacity-0 translate-y-6 → opacity-100 translate-y-0`** *(nuevo)* | Timeline (cada parada), RouteMap, Olympic | fade-up de entrada al hacer scroll |
| Grano `mix-blend-overlay` estático | Hero, Olympic | textura, no animación |

Todo lo nuevo se implementa sin librerías de animación pesadas (`framer-motion` no es necesario): dos hooks reutilizables (`useInView`, `useCountUp`) y una función `lerp` de una línea cubren el 100% de los efectos nuevos — coherente con que el original ya era "hover-only, cero dependencias".

---

## 6. Deudas resueltas (frente al documento original)

| # | Deuda original | Resolución en Waypoint |
|---|---|---|
| 1 | Hex literales `#EF4444`/`#171717` en SVG duplicado | `<BrandLogo currentColor />` único, themable |
| 2 | Subtítulo bilingüe hardcodeado en Timeline | Migrado a `t('Waypoint.timeline.stops[].subtitle')` |
| 3 | `image2!` non-null assertion | Chequeo condicional real |
| 4 | 4 anchos de container distintos | `theme-container` único (con 1 excepción documentada) |
| 5 | Alturas mágicas `h-[400px]`/`h-[600px]` | `aspect-[3/4]`/`aspect-[4/5]` constantes |
| 6 | Contadores `1,124`/`35` hardcoded y duplicados | `themeData.Waypoint.stats` como fuente única |
| 7 | Badge "+" decorativo sin función | `onClick` placeholder documentado |
| 8 | Sin animación de entrada en ningún componente | `useInView` fade-up (Timeline, RouteMap, Olympic) |
| 9 | Responsividad limitada a `md:` | RouteMap y Footer preview suman variantes `lg:` donde el nuevo contenido lo requiere |

---

## 7. Rutas de referencia sugeridas

- `src/themes/Waypoint/index.tsx`
- `src/themes/Waypoint/components/Navbar.tsx`
- `src/themes/Waypoint/components/Hero.tsx`
- `src/themes/Waypoint/components/Timeline.tsx`
- `src/themes/Waypoint/components/RouteMap.tsx` *(nuevo)*
- `src/themes/Waypoint/components/OlympicNational.tsx`
- `src/themes/Waypoint/components/Author.tsx`
- `src/themes/Waypoint/components/Footer.tsx`
- `src/themes/Waypoint/hooks/useInView.ts` *(nuevo)*
- `src/themes/Waypoint/hooks/useCountUp.ts` *(nuevo)*
- `src/themes/Waypoint/utils/lerp.ts` *(nuevo)*
- `src/themes/Waypoint/layout.ts` *(nuevo — constantes de container y aspect-ratio)*
