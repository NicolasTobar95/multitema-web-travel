# NIMBUS — Documento de Diseño (Retoque de "Trevilo")

> **Nombre del tema:** **Nimbus**
> *Tagline sugerido: "Travel, light as air."*
> Basado en la arquitectura original de `Trevilo`, retocado para portfolio de temas dinámicos orientado a presentación comercial.
> Ruta base sugerida: `src/themes/Nimbus/`
> Stack: React 19 + Vite + Tailwind v3 · i18n vía `useTranslation()` · imágenes vía `sharedImages`

---

## 0. Por qué "Nimbus" y por qué este retoque

El documento original ya lo diagnosticaba con precisión: Trevilo es el tema "burbujeante" — esquinas grotescamente redondeadas (`rounded-[3rem]` como marca de diseño), composición por capas que **simula** flotar, y una paleta clara con acento cian-azulado (`#1ea0ff`) que evoca cielo. Pero el propio documento señala algo clave en la sección 5: *"el 'flotante' es composición (z-index + absolute + shadow), no movimiento"* — el tema **sugiere** aire y ligereza, pero nada se mueve de verdad. **Nimbus** (nube) es el nombre que le pega a ese carácter, y el retoque consiste exactamente en cumplir la promesa que el nombre hace: que las cosas floten *de verdad*.

**Elementos que se mantienen intactos (ya eran de alto valor):**
- `rounded-[3rem]` como firma jerárquica (Hero, Packages, Footer CTA) con gradación a `[2.5rem]`/`[2rem]` en superficies secundarias.
- El esquema light con dos islas oscuras (Footer `#18181B`, overlays sobre foto).
- El buscador del Hero con pestañas `-top-14` sobresaliendo de la caja `shadow-2xl` — la composición tridimensional más lograda del set original.
- El "bookend visual": la imagen del Hero reaparece en el CTA del Footer — se mantiene como decisión intencional de cierre narrativo, no como deuda.
- `Companies`, único componente de este tipo en todo el portfolio — se conserva como diferenciador estructural del tema.

**Lo nuevo — el "algo especial" de este tema:**
- **Float + tilt real** en la tarjeta flotante "Bali Island" (`Packages`) y en la caja del buscador (`Hero`): un balanceo vertical continuo y sutil (`translateY` oscilante, ~4s, sin brusquedad) combinado con **tilt 3D por posición del cursor** (`perspective` + `rotateX/rotateY` que sigue el mouse dentro de la tarjeta). Es el recurso que hoy más se asocia a "producto premium" en landing pages de SaaS y travel-tech (Linear, Stripe, Arc) — y es la evolución literal y directa del propio concepto "flotante" que el tema ya reclamaba tener.
- **Botón magnético** en el CTA del buscador del Hero: el botón se desplaza levemente hacia el cursor dentro de su propio radio de influencia antes del clic — micro-interacción muy presente en sitios premiados, coherente con el registro "ligero, responde al gesto" de Nimbus.

---

## 1. Filosofía de diseño

Nimbus conserva el ADN de Trevilo: esquinas agresivamente redondeadas que escalan con la importancia del bloque, una jerarquía de tres niveles de sombra (`shadow-sm` → `shadow-lg` → `shadow-xl/2xl`), y una paleta neutra-clara con cian como único acento — sin diluirlo con colores adicionales. El fondo casi-blanco (`#FDFDFD`) sigue siendo la superficie dominante, con el Footer como única isla oscura real.

La diferencia central es que el "flotar" deja de ser una metáfora resuelta solo con `z-index` y sombra, y pasa a tener **movimiento real, pero contenido**: nada de keyframes agresivos ni bounce — un balanceo de pocos píxeles, con easing suave, que se detiene y responde al cursor en vez de repetirse mecánicamente. Es la diferencia entre una tarjeta que "parece" flotar y una que efectivamente lo hace, sin caer en la exageración que rompería la sobriedad del tema.

El acento cian se mantiene con la misma disciplina que ya tenía: botones, tags, e íconos — y ahora también el brillo del `perspective` en el tilt de las tarjetas flotantes usa un `box-shadow` teñido en cian muy sutil (`shadow-[0_20px_60px_-15px_rgba(30,160,255,0.25)]`) que refuerza la sensación de elevación real, no solo geométrica.

---

## 2. Paleta de colores y tipografía

### Colores

| Uso | Valor |
|---|---|
| Fondo base | `#FDFDFD` |
| Fondo sección gris (Testimonials) | `#F5F7FA` |
| Fondo footer oscuro | `#18181B` |
| Acento principal | `#1ea0ff` — **ahora también centralizado en `tailwind.config` como `colors.nimbus.accent`** *(corregido)* |
| Acento secundario | `#3b82f6` |
| Tag bg suave | `blue-50` |
| Logo (dos círculos) | `yellow-400` + `white/90` — **ahora vía `<BrandLogo />` compartido** *(corregido)* |
| Estrellas | `yellow-400`, **ahora renderizadas según `review.rating` real** *(corregido)* |
| Sombra teñida de elevación *(nuevo)* | `shadow-[0_20px_60px_-15px_rgba(30,160,255,0.25)]` — tarjetas con float+tilt |

Se centraliza `#1ea0ff`, `#F5F7FA`, `#18181B` y `#FDFDFD` en `tailwind.config.js` bajo `colors.nimbus.*`, cerrando la deuda de literales sueltos repetidos en 5+ archivos.

### Tipografía

- **Familia:** `font-sans`, sin cambios — coherente con el registro "producto ligero", no editorial.
- **Tamaños y tracking:** se mantiene el sistema original (`text-5xl md:text-7xl` Hero, tags `text-xs tracking-[0.2em] uppercase`) sin modificaciones — ya era consistente y no formaba parte de las deudas detectadas.

---

## 3. Layout general

```
<div min-h-screen bg-[#FDFDFD] font-sans text-neutral-900 overflow-x-hidden>
  Navbar         (sticky top-0 z-30, backdrop-blur condicional)   ← corregido
  Hero           (tarjeta rounded-[3rem], buscador con float+tilt)  ← mejorado
  Companies      (max-w-5xl, único en el set de 4 temas)
  Destinations   (max-w-[1400px], grid 3 cols)
  Packages       (max-w-7xl, split 50/50, tarjeta Bali con float+tilt) ← mejorado
  Testimonials   (bg-[#F5F7FA], grid de reseñas)
  CtaBanner      (rounded-[3rem], reusa heroImageUrl como bookend)   ← extraído
  Footer         (bg-[#18181B], enlaces + copyright)                ← simplificado
</div>
```

- **`CtaBanner` se extrae del `Footer` original** *(corregido)*: hoy vivían mezclados en un mismo archivo de 101 líneas que combinaba dos secciones conceptualmente distintas. Separarlos deja al `Footer` como footer puro y al `CtaBanner` como pieza auditable e independiente — el reuso de `heroImageUrl` queda documentado en un solo módulo.
- **Container:** se mantiene la variedad de `max-w-*` por componente (`max-w-5xl`, `max-w-7xl`, `max-w-[1400px]`) tal como en el original — es una decisión que el propio documento marca como "inconsistencia intencional pero notable"; se documenta explícitamente como tal en vez de forzar un container único que rompería el ritmo ya afinado de cada sección.

---

## 4. Inventario de componentes

### 4.1 Navbar — corrección de deuda
- `absolute top-0` (desaparece al hacer scroll) → **`sticky top-0 z-30`** con `backdrop-blur-md` condicional: transparente sobre el hero, `bg-white/80 backdrop-blur-md shadow-sm` al scrollear — resuelve el tradeoff que el documento original ya anticipaba.
- Logo duplicado (Navbar + Footer, JSX idéntico) → `<BrandLogo />` único.
- Texto "Trevilo"/"Nimbus" hardcodeado → pasa a `t('Nimbus.brand')`.

### 4.2 Hero — pieza diferencial #1
- Estructura intacta: tarjeta `rounded-[3rem]`, pestañas `-top-14`, caja de buscador `shadow-2xl`.
- **Nuevo:** la caja del buscador tiene un balanceo vertical sutil (`translateY` ±4px, 4s ease-in-out infinite, pausado en hover) y **tilt 3D** que seguí la posición del cursor mientras el mouse está sobre la caja (`perspective(1000px) rotateX() rotateY()`, límites pequeños —máx. 4°— para no romper la legibilidad de los campos).
- **Nuevo:** el CTA del buscador (`bg-[#1ea0ff]`) es **magnético**: se desplaza unos píxeles hacia el cursor dentro de su radio de influencia antes del clic, usando el mismo hook de tracking de mouse que el tilt.

### 4.3 Companies — sin cambios estructurales, una corrección
- Se mantiene como diferenciador único del portfolio (banda de logos ficticios estilo "trusted by").
- El SVG "layers" duplicado byte-por-byte entre `Layers` y `Sisyphus` → se reemplaza el segundo por un ícono distinto, cerrando la deuda de placeholder visual repetido.
- Nombres de marca hardcodeados → pasan a `t('Nimbus.companies.items[]')`.

### 4.4 Destinations — corrección de deuda
- El salto de índice `sharedImages.destinations[0,1,3]` (se saltea deliberadamente el `[2]`) → se reemplaza por un `.slice(0, 3)` explícito sobre el array de cards, sin depender de índices manuales frágiles.
- Flechas de carousel sin `onClick` ni `aria-label` → se agregan `aria-label="Anterior"/"Siguiente"` y handlers documentados como placeholder de navegación real.
- Zoom `group-hover:scale-105 duration-700` — **intacto**.

### 4.5 Packages — pieza diferencial #2
- Estructura intacta: composición split 50/50, imagen base `rounded-[3rem]`, tarjeta flotante "Bali Island" `absolute top-16 right-0`.
- **Nuevo:** la tarjeta "Bali Island" recibe el mismo tratamiento de **float + tilt** que la caja del buscador del Hero — balanceo vertical continuo y tilt 3D al pasar el mouse, con la sombra teñida en cian (`shadow-[...rgba(30,160,255,0.25)]`) que refuerza la sensación de que la tarjeta está genuinamente suspendida sobre la imagen base, no solo superpuesta con `z-index`.
- "Bali Island" / "Bali, Indonesia" hardcodeados → migrados a `t('Nimbus.packages.floatingCard.{title,location}')`.

### 4.6 Testimonials — corrección de deuda
- Estrellas siempre fijas en 5 (`[1,2,3,4,5].map` sin usar `review.rating`) → ahora renderiza `rating` estrellas llenas + `5 - rating` vacías, reflejando el dato real.
- `sharedImages.avatars[idx % 3]` (cicla solo 3 avatares) → `idx % avatars.length` dinámico, defensivo ante crecimiento del array de reseñas.

### 4.7 CtaBanner *(extraído del Footer original)*
- Contiene exactamente lo que antes vivía dentro de `Footer.tsx`: tarjeta `h-[500px] md:h-[600px] rounded-[3rem]` con `themeData.Nimbus.heroImageUrl` reutilizada como bookend visual del Hero, overlay `bg-black/40`, tag pill + h2 + 2 botones.
- **Sin cambios de comportamiento** — es una extracción de cohesión de código, no un rediseño visual. El reuso de la imagen del hero se mantiene como decisión intencional de cierre narrativo.

### 4.8 Footer — simplificado
- Ahora contiene solo el bloque de enlaces en 4 columnas + copyright — sin el CTA gigante, que vive en `CtaBanner`.
- Logo duplicado → `<BrandLogo />` compartido (ver 4.1).

---

## 5. Animaciones y transiciones

| Mecanismo | Dónde | Tipo |
|---|---|---|
| `hover:-translate-y-1/-2` | Hero CTA, Packages Bali card (base) | elevación hover, sin cambios |
| `group-hover:scale-105 duration-700` | Destinations cards | zoom, sin cambios |
| `hover:shadow-xl/2xl` | Testimonials, Hero CTA | sombra, sin cambios |
| **balanceo vertical continuo (`translateY` ±4px, 4s ease-in-out)** *(nuevo)* | Hero search box, Packages Bali card | float real, pausado en hover |
| **tilt 3D por posición del cursor (`perspective` + `rotateX/rotateY`, máx. 4°)** *(nuevo)* | Hero search box, Packages Bali card | profundidad interactiva |
| **botón magnético (`translate` hacia el cursor dentro de radio)** *(nuevo)* | Hero CTA de búsqueda | micro-interacción de precisión |
| Navbar sticky con `backdrop-blur` condicional | Navbar | transición ligada a scroll |
| Sin `animate-pulse`/`bounce` | — | se mantiene la ausencia — Nimbus sigue evitando movimiento mecánico repetitivo; el float usa easing orgánico, no keyframes rígidos |

El float y el tilt se implementan con un único hook (`useFloatTilt`) reutilizado en ambas tarjetas, y el botón magnético reutiliza el mismo listener de posición del mouse — sin librerías de física ni animación externas, coherente con que el tema original ya no dependía de ninguna.

---

## 6. Deudas resueltas (frente al documento original)

| # | Deuda original | Resolución en Nimbus |
|---|---|---|
| 1 | Acento `#1ea0ff` y otros hex repetidos en 5+ archivos | Centralizados en `tailwind.config` (`colors.nimbus.*`) |
| 2 | Logo duplicado byte-por-byte (Navbar + Footer) | `<BrandLogo />` único |
| 3 | Footer mezclaba CTA gigante + footer de enlaces en un archivo | `CtaBanner` extraído como componente hermano |
| 4 | Navbar `absolute` desaparece al hacer scroll | `sticky` con `backdrop-blur` condicional |
| 5 | Tipado `any` en todos los `.map` | Interfaces por componente (`NimbusHero`, `NimbusPackages`, etc.) |
| 6 | `avatars[idx % 3]` cicla solo 3 avatares | `idx % avatars.length` dinámico |
| 7 | Flechas de Destinations sin `onClick`/`aria-label` | Agregados, documentadas como placeholder |
| 8 | Estrellas de Testimonials siempre fijas en 5 | Reflejan `review.rating` real |
| 9 | SVG "layers" duplicado entre Layers y Sisyphus | Ícono distinto para el segundo |
| 10 | Índice `[0,1,3]` salteado en Destinations | `.slice(0, 3)` explícito |
| 11 | "Bali Island"/"Bali, Indonesia" hardcodeados | Migrados a `t()` |
| 12 | El tema "sugiere" flotar pero no hay movimiento real | Float + tilt real en Hero search box y Packages Bali card |

---

## 7. Rutas de referencia sugeridas

- `src/themes/Nimbus/index.tsx`
- `src/themes/Nimbus/components/Navbar.tsx`
- `src/themes/Nimbus/components/Hero.tsx`
- `src/themes/Nimbus/components/Companies.tsx`
- `src/themes/Nimbus/components/Destinations.tsx`
- `src/themes/Nimbus/components/Packages.tsx`
- `src/themes/Nimbus/components/Testimonials.tsx`
- `src/themes/Nimbus/components/CtaBanner.tsx` *(nuevo — extraído de Footer)*
- `src/themes/Nimbus/components/Footer.tsx` *(simplificado)*
- `src/themes/Nimbus/components/BrandLogo.tsx` *(nuevo — compartido)*
- `src/themes/Nimbus/hooks/useFloatTilt.ts` *(nuevo — float + tilt + magnetismo)*
