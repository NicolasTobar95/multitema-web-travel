# Cordada — Web demo multi-tema de venta de viajes

Contexto para Claude Code. Este paquete reúne todo lo trabajado en la fase de diseño (mockups HTML). El siguiente paso es construir el sitio real en Astro.

## Qué es

Sitio demo de una agencia ficticia, **Cordada**, que vende trekking guiado en la Patagonia chilena. La gracia de la demo: un **selector abajo** permite cambiar entre **4 temas visuales muy distintos** de la misma página, con el **mismo contenido**.

| Tema (selector) | Ex nombre | Mockup final | Estilo |
|---|---|---|---|
| Cordada | Waypoint | `mockups-finales/1-cordada.html` | Cartográfico: curvas de nivel, coordenadas, HUD de altitud, scroll horizontal de rutas, infografía de mapa (D3), perfil de elevación interactivo. Acento azul glaciar `#2F6FDB`. |
| Albor | Aura | `mockups-finales/2-albor.html` | Planificador: hero con frase editable ("Quiero caminar [x] entre [y]…") que filtra los viajes en vivo + tarjeta de vista previa. Violeta `#5B4BE8` + lima `#C9F27A`, Bricolage Grotesque. |
| Brisa | Aeria | `mockups-finales/3-brisa.html` | Afiche de parque nacional: cordillera ilustrada en capas SVG con parallax, mini afiches duotono, postal, emblemas. Bosque/mostaza, Big Shoulders Display. |
| Cúmulo | Nimbus | `mockups-finales/4-cumulo.html` | Estructura suiza (grilla 12 col, tipografía enorme, índice de salidas tipo tabla) con estética nocturna (estrellas, vidrio, degradado hielo→dorado). Sora. |

Los mockups son HTML autocontenidos (fotos en base64) y sirven de **referencia visual y de comportamiento**, no de código final.

## Stack decidido

- **Astro** (última estable) + TypeScript estricto
- **Tailwind CSS v4** (tokens por tema con `@theme` / variables CSS)
- **Content Collections + Zod** para el contenido único
- **View Transitions** (cross-document + `<ClientRouter />`) para cambiar de tema con morphing
- **GSAP + ScrollTrigger / Lenis** solo en los temas que lo usen
- Scripts TS dentro de Astro; Preact solo si una isla lo necesita
- `astro:assets` para imágenes (AVIF/WebP), fuentes autoalojadas por tema
- Deploy estático en Cloudflare Pages o Vercel

Se descartó Vite + React SPA (runtime de React en todas las rutas).

## Arquitectura

- **Cada tema es una ruta estática**: `/cordada`, `/albor`, `/brisa`, `/cumulo`. `/` redirige al tema por defecto o al último visto.
- `pages/[theme].astro` con `getStaticPaths()` genera las 4.
- **Contenido único** en `src/content/` (ver `shared/data.js` y `shared/common.js` como fuente: viajes, testimonios, parques, opciones del buscador, FAQ del chat).
- **Footer compartido idéntico en los 4 temas** (`shared/footer.html`): tarjeta del autor, contacto, likes. Solo toma el acento del tema vía `--sf-accent`.
- **Selector de tema** persistente (`transition:persist`).
- Componentes en dos capas: `components/shared/` (lógica/estructura común) y `themes/<tema>/sections/` (lo que cambia de forma).

```
src/
  content/            viajes, testimonios, parques (datos únicos)
  components/shared/  Footer, ThemeSwitcher, LikeButton, Chat, TripCarousel…
  themes/
    cordada/ albor/ brisa/ cumulo/   (tokens.css, Layout.astro, sections/)
  lib/motion/         helpers GSAP/Lenis/CSS
  pages/index.astro, pages/[theme].astro
  styles/global.css
```

## Contenido (fuente de verdad)

Agencia: **Cordada** · lema "Patagonia sin atajos" · grupos de máx. 12, guías locales, todo incluido (traslados, refugios, comidas, permisos, seguro). Temporada oct–abr. Moneda **USD**. Precios, fechas y cupos son **de ejemplo** (el sitio lo dice).

| id | Viaje | Región | Días | Paisaje | Exigencia | Desde |
|---|---|---|---|---|---|---|
| paine | Torres del Paine · Circuito W | Magallanes | 5 | montaña | Media | US$ 1.890 |
| castillo | Travesía Cerro Castillo | Aysén | 4 | montaña | Alta | US$ 1.290 |
| pumalin | Bosques de Pumalín | Los Lagos | 4 | bosque | Baja | US$ 1.090 |
| exploradores | Valle Exploradores | Aysén | 3 | glaciar | Media | US$ 690 |
| puyuhuapi | Fiordos de Puyuhuapi | Aysén | 4 | lagos | Baja | US$ 890 |
| esperanza | Última Esperanza | Magallanes | 2 | montaña | Baja | US$ 490 |
| travesia | Gran Travesía (las 3 rutas) | Los Lagos → Magallanes | 15 | todos | Media-alta | US$ 3.990 |

Coordenadas: Pumalín 42.70°S 72.45°W · Cerro Castillo 46.12°S 72.17°W · Torres del Paine 50.97°S 72.97°W (923 km de traslados entre rutas). Circuito W: 80 km, 880 m máx.

Testimonios: nombres ficticios (Camila R., Laura M., Tomás V., Martín G.), avatares con ícono, marcados "de ejemplo".

## Reglas del proyecto

- Textos en **español de Chile** (tú, nunca voseo).
- No usar los colores naranja/rojo del panda rojo del autor en los temas (están reservados para su marca personal).
- Sin textos ni nombres de la plantilla original (Waypoint, Alpes, Islandia, "Cumbres que hablan"…).
- Accesibilidad: contraste AA, foco visible, `prefers-reduced-motion`, botones reales.
- Presupuesto por tema: JS ≤ 60 KB gzip con GSAP (≤ 15 KB sin), LCP < 2,5 s en móvil, Lighthouse 90+.

## Pendientes

- Datos reales de contacto del footer: correo, GitHub, LinkedIn, portafolio, foto (hoy "[Tu correo]" y avatar "NT").
- Menú hamburguesa en móvil para todos los temas.
- Selector de idioma EN/ES (el original lo tenía).
- Validar km/desniveles de las rutas (aproximados).
- En Cordada el mapa usa D3 + world-atlas desde CDN: en Astro generar los SVG en build.

## Estado

**Fase 1 lista (24 nov 2026)** — Astro 7 + Tailwind 4 + TS 6 (estricto; TS 7 aún no lo soporta `@astrojs/check`).
- `npm run dev` · `npm run build` (corre `astro check` antes) · `npm run preview`
- Contenido en `src/content/*.json` validado en `src/content.config.ts`; usar `getTrips()` de `src/lib/content.ts` (ordena por `order`).
- Temas: `src/lib/themes.ts` (lista, metadatos) + `src/themes/<tema>/{tokens.css,Layout.astro,Home.astro,sections/}`. Tokens bajo `[data-theme]`, expuestos a Tailwind en `src/styles/global.css` (`bg-bg`, `text-ink`, `font-display`, `rounded-theme`…).
- Fuentes autoalojadas con Fontsource (importadas en cada `tokens.css`).
- `ThemeSwitcher` persiste con `transition:persist`; marca y viajes hacen morphing (`transition:name`).
- Los heroes y la grilla de viajes son **provisionales**: se reemplazan en las fases 2–3.
- Rutas: una página por tema (`src/pages/cordada.astro`, `albor.astro`…), así cada ruta carga solo el CSS de su tema (antes era `[theme].astro`, que juntaba el CSS de los 4). `build.format: 'file'` → `cordada.html`, que Cloudflare Pages sirve en `/cordada` sin redirigir a `/cordada/`.
- OG por tema: `BaseLayout` busca `src/assets/img/shared/og-<tema>.(jpg|webp)` y la exporta a JPG 1200×630.
- Deploy: **Cloudflare Pages**, proyecto `multitema-web-travel` (https://multitema-web-travel.pages.dev), conectado a GitHub `NicolasTobar95/multitema-web-travel` rama `master`. Build: `npm run build`, salida `dist`, Node 24 (`.nvmrc`). Cabeceras en `public/_headers`.
- Prompts de todas las imágenes por tema: `docs/prompts-imagenes.md` (guardar en `src/assets/img/<shared|tema>/` con el nombre indicado).
- **Imágenes de los 4 temas entregadas y revisadas (26 nov 2026)**: estado por tema en `docs/prompts/<n>-<tema>.md`. Aún no se usan en las páginas (fase 3), salvo `shared/trip-*.webp` en el carrusel.

**Fase 2 lista (26 nov 2026)** — componentes compartidos en `src/components/shared/`:
- `Footer.astro`: idéntico en los 4 temas, va en `BaseLayout`. Fuentes propias (Geist) y acento `--sf-accent`. Datos del autor en `src/lib/author.ts` (correo, GitHub, LinkedIn, portafolio vacíos → apuntan a `#contacto`).
- `LikeButton.astro` (`variant="footer" | "pill"`): todos los botones comparten estado, guardado en localStorage (`cordada:like`); sobrevive al cambio de tema. Los headers de la fase 3 usan la píldora.
- `TripCarousel.astro` + `TripCard.astro`: filtros por paisaje con View Transition, prev/next, scroll-snap, funciona sin JS (filtros ocultos). Un tema puede pasar su tarjeta con `card={MiTarjeta}` (props `trip`, `index`). Fotos con `tripPhoto(id)` de `src/lib/images.ts`.
- `Chat.astro`: FAQ de `src/content/faq.json` (ordenado por `order`), Escape cierra, `aria-live`. Opt-in con `<BaseLayout chat>`; hoy solo Brisa (como su mockup).
- Scripts en `astro:page-load` con guarda `data-ready` (se re-enlazan tras cada navegación con `<ClientRouter />`).
- Token nuevo `--panel` (superficie opaca para paneles flotantes; en Cúmulo `--card` es translúcida).
**Fase 3 · Cordada lista (26 nov 2026)** — `src/themes/cordada/`:
- Secciones: `Header` (sólido al bajar, progreso, coordenada de la sección, menú móvil), `Hero` (foto escritorio/móvil, HUD), `Prologue`, `Routes` (scroll horizontal fijado en ≥900 px; apilado en móvil, sin JS o con movimiento reducido), `Travesia` (mapa), `CircuitW` (perfil + km/mi), `Escapes`. `components/Topo.astro` y `RouteHud.astro`.
- Todo lo pesado se genera en el build: curvas de nivel (`lib/topo.ts`), mapa con costa real (`lib/geo.ts`: d3-geo + topojson-client + world-atlas, solo devDependencies) y perfil de elevación. Al cliente llega solo `cordada.client.ts` (~2,5 KB gzip, sin GSAP).
- Los km de cada traslado reparten `travesia.transfersKm` (923 km por carretera) según la distancia en línea recta de cada tramo.
- Textos propios del tema en `data.ts`. El video del recorrido se reemplazó por el póster con acercamiento lento en CSS.
- `.rv` (aparición) y el estado inicial de las animaciones solo se aplican con JS (`@media (scripting: enabled)` o clase `.armed`).

**Fase 3 · Albor lista (26 nov 2026)** — `src/themes/albor/`:
- Secciones: `Header` (barra de vidrio, indicador deslizante del menú, próxima salida calculada del contenido, menú móvil), `Hero` (planificador: frase con 4 `<select>` + tarjeta "Tu mejor opción"), `Results` (7 tarjetas; la Gran Travesía va ancha y primero), `How` (4 pasos con fotos + banda "Incluido" con íconos y parallax), `Voices` (3 testimonios; el promedio de la tarjeta flotante sale de los 4).
- El filtro vive en `albor.client.ts` (~2,8 KB gzip): marca `.off` y el motivo ("No calza: …"), reordena con View Transition y actualiza la vista previa. Las reglas (tramos de días, "Media-alta" calza con media y alta) están en `data.ts` y viajan en `data-*`.
- Vista previa: todas las fotos van en el HTML pero con `display:none` (no se descargan) hasta que se eligen; se decodifican antes del fundido.
- Selectores con `field-sizing: content`; el script mide el texto solo si el navegador no lo soporta.
- Sin JS: la frase se ve, el contador dice 7 y todas las tarjetas están visibles (los selectores no filtran).
- Tarjetas apagadas: la foto se destiñe y el texto baja a `--muted` (mantiene AA).
- Helpers `$`, `$$`, `nf` compartidos en `src/lib/dom.ts`.
- En el panel de pruebas oculto, las View Transitions esperan un frame: parece que el filtro o el cambio de tema "no responden" hasta la siguiente captura. Confirmar en navegadores reales (fase 4).

**Fase 3 · Brisa lista (26 nov 2026)** — `src/themes/brisa/`:
- Secciones: `Header` (franja bosque fija, menú móvil), `Hero` (afiche con las 5 capas PNG → AVIF con transparencia, parallax por scroll y cursor, cóndor en CSS, emblema SVG giratorio, ticket "Admite 1"), `Services` (parches bordados con leyenda en anillo SVG), `Destinations` (el `TripCarousel` compartido con `components/PosterCard.astro`: afiche ilustrado y, al pasar el cursor o con foco, la foto a color), `Postcard` (postal del W, reverso de papel, estampilla y matasellos + 2 testimonios), `Tailor` (serie "a medida": rota cada 6,5 s, botón de pausa, se detiene con cursor/foco o fuera de pantalla, no rota con movimiento reducido; sin JS se ven las 3), `Gallery` (postales con las fotos compartidas), `Pass`.
- `brisa.client.ts` ~1,4 KB gzip. Formularios de demo (`components/DemoForm.astro`) con `method="dialog"`: sin JS no navegan ni dejan el correo en la URL; con JS muestran "¡Listo! (Es una demo…)".
- Papel de fondo: `textura-papel.png` exportada a WebP 640 px y pintada sobre `--cream` (estilo inline en `Layout.astro`).
- `pase-temporada.png` lleva `hue-rotate(6deg)` para que sus franjas no tiren a naranja. `ticket.png` y `hero-completo.png` no se usan (el ticket es CSS para que el formulario sea flexible; el hero usa las capas).
- `TripCarousel`: `.tc-item` ahora es `position: relative` (un `.sr-only` dentro de la tarjeta escapaba del carril y ensanchaba la página en móvil).

**Fase 3 · Cúmulo lista (26 nov 2026)** — `src/themes/cumulo/`:
- `Layout.astro`: cielo fijo con estrellas generadas en el build (semilla fija, 3 capas de `box-shadow` que titilan), dos brillos difusos y las 12 columnas (4 en móvil).
- Secciones: `Header` (vidrio fijo arriba, menú numerado, menú móvil), `Hero` (titular con máscara, figura nocturna que pasa de B/N a color, buscador con pestañas de `search.json` + cinta de parques de `parks.json` con botón de pausa), `Index` (índice de salidas: filtros por paisaje con View Transition; cada fila es un botón que despliega 3 miniaturas `indice-*` + descripción; con cursor también se abre al pasar), `Why` (`por-que.jpg` + 3 razones), `Voices` (los 4 testimonios), `Cta` (`cta.jpg`; al tomar color lleva un `hue-rotate(10deg)` para que el horizonte no tire a naranja).
- Buscador (patrón ARIA tabs con flechas/Inicio/Fin): al buscar abre la fila del viaje elegido (opciones con `data-go`, calculado del nombre antes del "·"); "Gran Travesía" va a su fila y "A medida" al contacto. Sin JS se ve solo el panel "Rutas" y las vistas previas del índice quedan abiertas.
- Fotos `.img-bw`: B/N con cursor; en pantallas táctiles toman color al aparecer.
- `getCollection` no respeta el orden del JSON: `Home.astro` reordena búsqueda, parques y testimonios según su archivo.
- `cumulo.client.ts` ~1,8 KB gzip.

## Fases sugeridas

1. Base: Astro + TS + Tailwind v4, Content Collections con los datos de arriba, `[theme].astro` con 4 rutas y selector con View Transitions, deploy.
2. Componentes compartidos (Footer, ThemeSwitcher, carrusel de viajes, chat) + tokens de cada tema.
3. Un tema a la vez, replicando su mockup final.
4. Pulido: transiciones entre temas, imágenes, Lighthouse, pruebas en Chrome/Safari/Firefox/móvil.

## Carpetas del paquete

- `mockups-finales/` — los 4 diseños elegidos (abrir en el navegador).
- `mockups-descartados/` — direcciones que no se eligieron, por si se quiere rescatar algo.
- `shared/` — footer compartido, datos de viajes/carrusel/slider/chat (`data.js`) y buscador/testimonios/parques (`common.js`).
- `assets/fotos/` — las 6 fotos en WebP (L 1800 px, M 760 px): trek, snow, forest, valley, lake, sunset.
- `referencias/` — HTML original de Waypoint antes del rediseño y capturas de los temas originales.
