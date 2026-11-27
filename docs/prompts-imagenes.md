# Prompts de imágenes — Cordada (4 temas)

Inventario completo de lo visual que pide cada mockup final, con su prompt listo para copiar.
Los prompts van en **inglés** (los generadores responden mejor); las notas, en español.

---

## 0. Reglas para todo el set

**Cómo entregar los archivos**
- Exporta en la **máxima resolución** que dé el generador, en PNG o JPG de alta calidad. Yo los convierto a AVIF/WebP con `astro:assets`; no hace falta comprimir.
- Guárdalos con el **nombre exacto** de cada ficha, en `src/assets/img/<carpeta>/` (`shared`, `cordada`, `albor`, `brisa`, `cumulo`).
- Íconos, parches, sellos y capas de ilustración: **fondo transparente** (PNG). Si el generador no da transparencia, pide fondo blanco o crema plano y yo lo recorto.
- **Sin texto dentro de las imágenes.** Los títulos, precios y coordenadas los pone el código (los generadores escriben mal y no se puede traducir ni editar).

**Restricciones de marca**
- **Nada de rojo ni naranja dominante** (reservados para la marca personal del autor). Ojo con las chaquetas: en outdoor casi siempre salen rojas o naranjas. Pide colores de ropa específicos (vienen en cada prompt).
- Los atardeceres van en **oro suave, lavanda y azul**, no en naranja intenso.
- Las personas, **de espalda o lejanas**, sin caras reconocibles. Los testimonios usan ícono, no foto.
- Lugares reales (Torres del Paine, Cerro Castillo…): el generador puede inventar la forma de los cerros. Revisa que se parezcan o acepta una versión "inspirada en".

**Negativo común** (agrégalo a todos los prompts fotográficos si tu generador acepta negative prompt):
```
text, letters, watermark, logo, signature, brand logos on clothing, red jacket, orange jacket, red or orange color cast, oversaturated, HDR halos, plastic skin, faces looking at camera, extra limbs, distorted hands, blurry, low resolution, cartoon, 3d render
```

**ADN fotográfico** (las fotos compartidas lo llevan incluido; úsalo si generas variaciones):
```
documentary outdoor travel photography, Chilean Patagonia, full-frame camera, natural light, true-to-life colors, subtle film grain, crisp detail, calm and honest mood, editorial magazine quality
```

**Formatos de referencia**
| Uso | Proporción | Tamaño mínimo |
|---|---|---|
| Hero escritorio | 16:9 | 2560 × 1440 |
| Hero móvil (recorte aparte) | 4:5 | 1440 × 1800 |
| Banda ancha / fondo de sección | 21:9 | 2560 × 1100 |
| Tarjeta de viaje | 3:2 | 2400 × 1600 |
| Afiche | 2:3 | 1600 × 2400 |
| Postal | 3:2 | 1800 × 1200 |
| Ícono / parche / sello | 1:1 | 1024 × 1024 |
| Open Graph | 1.91:1 | 1200 × 630 |

---

## 1. Compartidas (las usan los 4 temas)

Hoy hay 6 fotos y la Gran Travesía reutiliza la del valle. Esta es la serie nueva: **una foto por viaje**, con el mismo estilo entre todas.
En cada una, deja el sujeto principal **en el centro con aire alrededor**: cada tema la recorta distinto (4:3, 3:2, 2:3 o cuadrada).

### `shared/trip-paine.jpg` — Torres del Paine · Circuito W · 3:2
```
Documentary outdoor travel photograph, the three granite towers of Torres del Paine lit by first pink-gold sunrise light, glacial lagoon at their base in shadow, two small hikers in navy and olive jackets standing on boulders seen from behind, cold clear air, scale emphasized, wide 24mm lens, true-to-life colors, subtle film grain, editorial quality, no text
```

### `shared/trip-castillo.jpg` — Travesía Cerro Castillo · 3:2
```
Documentary outdoor travel photograph, jagged basalt spires of Cerro Castillo in Aysén, Chile, a turquoise glacial lagoon below, patches of snow on a high mountain pass, a single hiker in a teal jacket with a large backpack walking along the ridge seen from behind, crisp midday alpine light, dramatic but natural, 35mm lens, subtle film grain, no text
```

### `shared/trip-pumalin.jpg` — Bosques de Pumalín · 3:2
```
Documentary outdoor travel photograph, ancient temperate rainforest in Pumalín Park, Chile, massive alerce trunks, giant nalca leaves and ferns, a wooden boardwalk trail disappearing into soft mist, rays of light filtering through the canopy, two hikers in olive and slate-blue rain jackets small in the frame, deep greens, humid atmosphere, 35mm lens, subtle film grain, no text
```

### `shared/trip-exploradores.jpg` — Valle Exploradores · 3:2
```
Documentary outdoor travel photograph, a roped team of four hikers with crampons and helmets walking in single file across the white and blue ice of Exploradores glacier, deep blue crevasses, rainforest-covered mountains and Monte San Valentín snowfields behind, overcast soft light, jackets in navy, teal and mustard yellow, sense of scale, 35mm lens, subtle film grain, no text
```

### `shared/trip-puyuhuapi.jpg` — Fiordos de Puyuhuapi · 3:2
```
Documentary outdoor travel photograph, two sea kayaks gliding on a mirror-calm fjord in Puyuhuapi, Chilean Patagonia, steep walls of dense green rainforest, low clouds hanging on the slopes, a thin waterfall in the distance, paddlers in teal and grey jackets seen from behind, soft diffused morning light, emerald and slate-blue tones, 50mm lens, subtle film grain, no text
```

### `shared/trip-esperanza.jpg` — Última Esperanza · 3:2
```
Documentary outdoor landscape photograph, Última Esperanza sound near Puerto Natales at golden hour, calm water reflecting soft gold and lavender sky, snow-capped mountains on the horizon, windswept lenga trees in the foreground, a photographer with a tripod seen from behind in a dark green jacket, gentle warm light without strong orange, 35mm lens, subtle film grain, no text
```

### `shared/trip-travesia.jpg` — Gran Travesía · 3:2
```
Documentary outdoor travel photograph, the Carretera Austral gravel road winding through a wide Patagonian valley, a braided glacial river in milky turquoise, snowy peaks and green forest, a small white expedition van far away on the road, big sky with moving clouds, sense of long journey, aerial drone view at medium altitude, true-to-life colors, subtle film grain, no text
```

### `shared/og-<tema>.jpg` — Imagen para compartir (×4) · 1200 × 630
Una por tema. El generador hace solo el fondo y yo le pongo encima el nombre y el lema con código.
```
Cordada:  Minimal topographic contour map of a Patagonian mountain range, thin blue lines #2F6FDB on pale grey-green paper #ECEFEA, large empty area on the left, no text
Albor:    Soft abstract gradient mesh in violet #5B4BE8 and lime #C9F27A on warm off-white, subtle grain, smooth organic shapes, large empty area on the left, no text
Brisa:    Vintage screen-print illustration of layered Patagonian mountains in forest green, teal, slate blue and mustard on cream paper, flat colors, visible paper grain, no text
Cúmulo:   Night sky over a dark mountain silhouette, dense southern stars and the Magellanic Clouds, thin horizon glow from ice blue to soft gold, deep navy #080B14, no text
```

### Logo (opcional)
Hoy la marca es un SVG simple: dos cumbres. Si quieres explorar un isotipo:
```
Minimal logo mark for a guided trekking agency called Cordada, two mountain peaks joined by a single continuous rope line, geometric, monoline, works at 16px, black on white, flat vector style, no text, no gradients
```
> Si te gusta alguno, lo redibujo en SVG. Un logo debe quedar en vector, no en PNG.

---

## 2. Cordada — cartográfico

Paleta: tinta `#0F1A20`, papel `#ECEFEA`, azul glaciar `#2F6FDB`, oscuro `#0B1418`. Fríos, técnicos y precisos. La ropa va en azul, gris u oliva.

### `cordada/hero.jpg` — Hero a pantalla completa · 16:9 + recorte 4:5
Encima lleva el HUD de altitud, las coordenadas y las curvas de nivel, así que necesita **zonas oscuras y calmas** y espacio a la izquierda para el titular.
```
Wide cinematic landscape photograph, a small group of six hikers walking in single file along a high ridge trail toward the granite towers of Torres del Paine, seen from behind and far away, cold blue pre-dawn light, deep shadows in the valley below, large calm dark area of sky and slope on the left third for text overlay, desaturated cool palette with steel blue tones, jackets in navy and grey, 35mm lens, subtle film grain, no text
```

### `cordada/prologo.jpg` — "Regla de cordada" · 21:9
Es la idea central de la marca: el grupo avanza al ritmo del más lento.
```
Wide documentary photograph, a rope team of five trekkers walking slowly in a single line along the shore of a still glacial lake, seen from behind, the last hiker helped by the guide, mountains reflected in the water, soft overcast light, cool blue-grey palette, quiet and patient mood, lots of negative space above, 50mm lens, subtle film grain, no text
```

### `cordada/hoja-pumalin.jpg`, `hoja-castillo.jpg`, `hoja-paine.jpg` — "Hojas" de ruta · 4:5
Son las tres pantallas del scroll horizontal ("Hoja 18G · PU 42"). Pueden usar las fotos compartidas, pero quedan mejor con una versión vertical y fría:
```
Vertical documentary landscape photograph of [Pumalín ancient rainforest with alerce trees and mist | Cerro Castillo basalt spires above a turquoise lagoon | Torres del Paine granite towers above the glacial lagoon], cool blue-shifted color grade, muted highlights, strong sense of depth, empty calm area at the bottom third for overlay text, 35mm lens, subtle film grain, no text
```

### `cordada/textura-papel.png` — Papel de mapa topográfico (claro) · 2048 × 2048, repetible
```
Seamless tileable texture of vintage topographic survey map paper, pale grey-green #ECEFEA, very subtle fibers and faint grid, slight aging, extremely low contrast, no lines, no text, flat lighting, top-down scan
```

### `cordada/textura-oscura.png` — Papel oscuro para secciones nocturnas · 2048 × 2048, repetible
```
Seamless tileable texture of dark blue-black map paper #0B1418, very subtle grain and fibers, faint matte noise, extremely low contrast, no text, flat top-down scan
```

### `cordada/detalle-w.jpg` — Fondo de "Circuito W en detalle" · 21:9
```
Wide panoramic landscape photograph of the Cuernos del Paine above Lago Nordenskjöld, turquoise water, dark granite horns with light sedimentary caps, a thin trail on the hillside with tiny hikers, soft late-afternoon light without orange cast, cool palette, calm sky on top for overlay, 24mm lens, subtle film grain, no text
```

### `cordada/recorrido-w.mp4` — Video "Ver el recorrido 2:14 · 4K" (animación)
Para un generador de video (texto a video, o imagen a video partiendo de `detalle-w.jpg`). En el sitio lo uso como **loop corto de 8 a 12 s**, sin audio.
```
Slow cinematic drone flight following a hiking trail along the shore of Lago Pehoé toward the Cuernos del Paine, smooth forward motion, gentle altitude gain, turquoise lake, granite peaks, cool natural color grade, steady, no camera shake, 4K, 10 seconds, seamless loop-friendly ending, no text
```
Pide también el **primer cuadro como imagen fija**: `cordada/recorrido-w-poster.jpg` (16:9).

### `cordada/escapada-exploradores.jpg`, `escapada-puyuhuapi.jpg`, `escapada-esperanza.jpg` — Escapadas · 3:4
Usan las fotos compartidas. Solo genera estas si quieres versiones verticales propias del tema: el mismo prompt del viaje con "vertical composition, cool blue-shifted grade".

### `cordada/iconos/*.png` — Set de íconos técnicos · 1:1, transparente
> **Recomendación:** los íconos los dibujo yo en SVG (pesan menos de 1 KB, toman el color del tema y se ven nítidos a cualquier tamaño). Usa este prompt para definir el **estilo** y yo los vectorizo.
```
Icon set of 12 technical cartographic line icons, monoline 1.5px stroke, square caps, precise geometric construction, single color ink #0F1A20 on transparent background, consistent 24px grid: north arrow compass, altitude marker triangle with tick, tent, mountain hut, hiking boot, distance ruler, calendar, group of people, certified guide badge, shield (insurance), bus (transfer), permit ticket. Clean, minimal, survey-map aesthetic, no text
```

---

## 3. Albor — planificador

Paleta: violeta `#5B4BE8`, lima `#C9F27A`, blanco cálido `#F7F6F3`, tinta `#16151D`. Luminoso, amable y moderno. La ropa y el equipo van en violeta, lima y blanco.

### `albor/fondo-hero.png` — Malla de color detrás del planificador · 16:9
```
Soft abstract gradient mesh background, warm off-white #F7F6F3 base with large blurred organic blobs of violet #5B4BE8 and lime #C9F27A at low opacity, gentle film grain, airy and optimistic, lots of clean empty space in the center, no shapes with hard edges, no text
```

### `albor/iconos-3d/*.png` — Íconos 3D de beneficios (×9) · 1:1, transparente
Son los 3 del hero (12 personas, guías locales, todo incluido) y los 6 de "Incluido en cada salida".
```
Set of nine 3D clay-style icons, soft rounded shapes, matte material, studio lighting with soft shadows, violet #5B4BE8 and lime #C9F27A with white accents, isometric three-quarter view, consistent size and lighting, transparent background: 1) small group of twelve tiny figures, 2) local guide with a hat and compass, 3) backpack with everything packed, 4) bilingual speech bubbles, 5) shuttle van, 6) mountain cabin, 7) bowl of warm food, 8) park entry ticket, 9) shield with a check mark. Playful but premium, no text
```
> Si el generador no mantiene el estilo entre íconos, pídelos **uno por uno** con el mismo prompt y cambia solo el objeto.

### `albor/paso-1.jpg` … `paso-4.jpg` — "Reservar es simple" · 4:5
Hoy usan fotos de paisaje sueltas. Con estas cada paso tiene su propia imagen:
```
1) Elige tu ruta: Top-down photograph of hands pointing at a paper trail map of Patagonia on a light wooden table, a phone and a cup of coffee beside it, soft daylight, small violet and lime details (pencil, sticky note), clean and bright, no readable text
2) Reserva tu cupo: Close-up photograph of a backpack tag and a booking confirmation on a phone screen (blank, no readable text) resting on a hiking pack, violet and lime accents, bright natural light
3) Prepárate: Flat lay photograph of trekking gear neatly arranged on a white floor, boots, merino layers, headlamp, water bottle, trekking poles, gear colored in violet, lime, white and grey, top-down, soft shadows, no logos
4) Camina: Photograph of two hikers seen from behind walking into a sunny Patagonian valley with snowy peaks, jackets in violet and lime, bright optimistic light, open space
```
Agrega a todos: `editorial lifestyle photography, consistent color grade, no text, no logos`.

### `albor/incluido.jpg` — Banda "Tú solo caminas" · 21:9
```
Wide photograph of a cozy mountain refuge at blue hour in Torres del Paine, warm soft yellow window light, hikers' boots lined up at the door, granite peaks behind under a violet-blue twilight sky, inviting and calm, clean composition with empty sky on the left, no orange cast, subtle film grain, no text
```

### `albor/sin-resultados.png` — Estado vacío ("Ningún viaje calza…") · 1:1, transparente
```
Friendly 3D clay illustration of a small hiker character holding a big folded map upside down, looking curious, a floating question-mark-shaped trail line beside them, violet #5B4BE8 and lime #C9F27A, soft studio lighting, matte material, transparent background, charming and minimal, no text
```

### `albor/loop-iconos.mp4` — Animación opcional del hero · 1:1, 6 s
```
3D clay icons (compass, backpack, small mountain, tent) gently floating and rotating in a slow seamless loop, violet and lime on warm off-white background, soft shadows, calm motion, 6 seconds, perfect loop, no text
```
> Alternativa más liviana: anima los PNG de `iconos-3d/` con CSS. Te lo recomiendo por el presupuesto de rendimiento: un video agrega cientos de KB.

---

## 4. Brisa — afiche de parque nacional

Paleta: bosque `#23402F`, pino `#345A3F`, teal `#2E6B6A`, pizarra `#7FA9A4`, cielo `#A9CFC7`, mostaza `#E0A93B`, crema `#F2E8D0`.
Estilo: **serigrafía vintage de afiches de parques**, con colores planos limitados (4–6 tintas), papel con grano y un poco de desregistro.

**ADN Brisa** (agrégalo a todo lo ilustrado):
```
vintage screen-print travel poster style, flat limited palette of forest green #23402F, pine #345A3F, teal #2E6B6A, slate #7FA9A4, sky #A9CFC7, mustard #E0A93B and cream #F2E8D0, bold simplified shapes, subtle paper grain and slight ink misregistration, no gradients, no text
```

### `brisa/hero-completo.png` — Cordillera ilustrada · 21:9
Sirve de referencia de composición para las capas.
```
Panoramic illustration of the Torres del Paine massif seen from across a lake, layered mountain ranges receding into the distance, a lenga forest in the foreground, a condor soaring, big calm sky in the top half, [ADN Brisa]
```

### `brisa/capa-1.png` … `capa-5.png` — Capas para parallax · 21:9, transparente
Para el parallax, cada capa va **por separado**, con el mismo encuadre y las cumbres en el mismo lugar.
```
1) Cielo: flat sky band from sky #A9CFC7 to cream #F2E8D0 with two simple stylized clouds and a small sun disc in mustard, [ADN Brisa]
2) Cordillera lejana: silhouette of distant Torres del Paine peaks in slate #7FA9A4 with flat cream snow caps, only this layer, transparent background, [ADN Brisa]
3) Cerros medios: middle mountain range silhouette in teal #2E6B6A, only this layer, transparent background, [ADN Brisa]
4) Lago y laderas: lake band and hills in pine #345A3F with simple horizontal water lines, transparent background, [ADN Brisa]
5) Bosque cercano: foreground lenga trees and grass silhouette in forest #23402F, transparent above, [ADN Brisa]
```
> Si no logras capas transparentes coherentes, genera `hero-completo.png` y yo lo separo en SVG. Igual conviene que queden en vector: pesan poco y el parallax se ve nítido.

### `brisa/afiche-<id>.png` — Mini afiches duotono (×7) · 2:3
Uno por viaje (`paine`, `castillo`, `pumalin`, `exploradores`, `puyuhuapi`, `esperanza`, `travesia`). **Sin texto**: el nombre del parque lo pongo yo con Big Shoulders Display. Al pasar el cursor, el afiche deja ver la foto a color.
Deja libre el **tercio inferior** para el título.
```
paine:        Vertical poster illustration of the three granite towers of Torres del Paine at dawn above a glacial lagoon, empty bottom third, [ADN Brisa]
castillo:     Vertical poster illustration of the spiky Cerro Castillo spires above a turquoise lagoon, a tiny hiker on the pass, empty bottom third, [ADN Brisa]
pumalin:      Vertical poster illustration of giant alerce trees in a misty rainforest with the Chaitén volcano behind, empty bottom third, [ADN Brisa]
exploradores: Vertical poster illustration of a rope team walking on glacier ice with stylized crevasses, empty bottom third, [ADN Brisa]
puyuhuapi:    Vertical poster illustration of two kayaks on a calm fjord between steep forested walls and a hanging glacier, empty bottom third, [ADN Brisa]
esperanza:    Vertical poster illustration of a lone photographer on a hill above Última Esperanza sound at golden hour, mustard sun, empty bottom third, [ADN Brisa]
travesia:     Vertical poster illustration of a winding gravel road through mountains, forests and a braided river, a small van, empty bottom third, [ADN Brisa]
```
Si los quieres **duotono estricto** (como el mockup): reemplaza la paleta por `two-color screen print, forest green #23402F and cream #F2E8D0 only`.

### `brisa/parche-guias.png`, `parche-equipo.png`, `parche-traslados.png` — Emblemas de servicios · 1:1, transparente
```
Embroidered circular patch for a national park guide service, [1) a guide with a hat and walking stick in front of mountains | 2) a dome tent under a pine tree | 3) a small bus and a boat under mountains], thick satin stitching, merrowed border in mustard #E0A93B, threads in forest green, teal and cream, realistic embroidery texture, front view, transparent background, no text
```
> Los textos del borde ("GUÍAS LOCALES · BILINGÜES") los pongo en SVG alrededor del parche.

### `brisa/sello.png` — Estampilla de correo · 4:5, transparente
```
Vintage postage stamp illustration with perforated edges, a huemul deer standing in front of snowy Patagonian peaks, engraved line-art style in forest green and mustard on cream paper, slight ink texture, transparent background outside the perforations, no text, no numbers
```

### `brisa/matasellos.png` — Matasellos · 1:1, transparente
```
Circular postal cancellation stamp mark, wavy cancellation lines, faded dark green ink on transparent background, rubber-stamp texture with uneven ink, no text, no numbers
```

### `brisa/postal-w.jpg` — Postal "Saludos desde el W" · 3:2
```
Vintage photochrome-style postcard image of the Torres del Paine towers and Lago Pehoé, soft hand-tinted colors leaning to teal, green and mustard, slight halftone and paper aging, rounded white border, no text
```

### `brisa/papel-postal.png` — Reverso de postal y ticket · 3:2
```
Top-down scan of the back of a blank vintage postcard on cream paper #F8F1DF, faint fibers, subtle yellowing at the edges, a thin vertical divider line, no text, no stamps, flat lighting
```

### `brisa/ticket.png` — Ticket "Admite 1" · 5:2, transparente
```
Blank vintage admission ticket with scalloped die-cut edges, cream paper with mustard #E0A93B border band and a small stylized mountain ornament, slight paper texture and wear, transparent background, no text, no numbers
```

### `brisa/medida-grupo.jpg`, `medida-equipo.jpg`, `medida-foto.jpg` — Serie a medida (×3) · 4:5
```
1) Group of friends of mixed ages laughing while hiking a forest trail in Patagonia, seen from behind and side, jackets in forest green, mustard and cream
2) Small work team of eight people doing a guided walk on a lakeshore, relaxed, a guide gesturing toward the mountains, outdoor retreat feeling
3) A photographer with a tripod on a hilltop at golden hour photographing granite peaks, a small group behind with cameras
```
Agrega a todos: `documentary photography with a warm vintage film look, muted greens and mustard, slight grain, no text, no logos`.

### `brisa/textura-papel.png` — Papel crema · 2048 × 2048, repetible
```
Seamless tileable texture of cream poster paper #F2E8D0, visible fibers, subtle screen-print speckles and halftone dust, very low contrast, flat top-down scan, no text
```

### `brisa/pase-temporada.png` — Fondo del "Pase de temporada" · 16:9
```
Illustrated background of a season pass card, stylized mountain range at the bottom, sun rays fanning from the top in mustard and cream stripes, forest green field, [ADN Brisa], large empty center area
```

### `brisa/condor.mp4` — Animación opcional · 21:9, loop de 8 s
```
Flat screen-print style illustration animation, a condor silhouette gliding slowly across a pale sky above layered mountain silhouettes, gentle circular flight, forest green and slate palette on cream, subtle paper grain, seamless 8 second loop, no text
```
> Alternativa más liviana: le pido la silueta del cóndor como PNG y la animo en CSS.

---

## 5. Cúmulo — suizo nocturno

Paleta: noche `#080B14`, hielo `#9FD8FF`, oro `#F2C879`, tinta `#EEF2FF`. Fotografía nocturna o de hora azul, fría, con **un solo punto de luz cálida** (frontal, ventana de refugio). Estética limpia, de museo.

**ADN Cúmulo:**
```
night and blue-hour landscape photography, deep navy shadows, ice blue highlights #9FD8FF, a single small warm gold light accent #F2C879, long exposure, pin-sharp stars, minimal and quiet, museum-print quality, no text
```

### `cumulo/fig-01-paine.jpg` — Hero "Fig. 01 — Torres del Paine, 50.97° S" · 4:5
```
Vertical night photograph of the three granite towers of Torres del Paine under a dense southern sky, the Milky Way core rising beside them, faint starlight on the rock faces, a single hiker's headlamp glowing gold on the moraine below, [ADN Cúmulo]
```

### `cumulo/indice-<id>.jpg` — Hover del "Índice de salidas" (×7) · 4:3
Una versión nocturna o de hora azul por viaje. Todas deben sentirse **del mismo set**.
```
paine:        Torres del Paine towers at blue hour, last ice-blue light on granite, a refuge with one gold window below, [ADN Cúmulo]
castillo:     Cerro Castillo spires under stars, frozen lagoon reflecting the sky, a tent glowing gold on the shore, [ADN Cúmulo]
pumalin:      Alerce rainforest at night, mist lit by moonlight, a trail of gold headlamps far away, [ADN Cúmulo]
exploradores: Exploradores glacier at twilight, blue ice crevasses, one headlamp on the ice, [ADN Cúmulo]
puyuhuapi:    Still fjord at night, rainforest walls, stars reflected in the water, a small gold cabin light on the shore, [ADN Cúmulo]
esperanza:    Última Esperanza sound at the end of blue hour, thin gold line on the horizon, calm water, [ADN Cúmulo]
travesia:     Carretera Austral winding through mountains at night, long-exposure light trail of a vehicle in soft gold, stars above, [ADN Cúmulo]
```

### `cumulo/por-que.jpg` — "Hecho para cada caminante" · 3:2
```
Wide photograph of a perfectly still glacial lake at night reflecting snow-capped peaks and stars, moonlight on the water, a small group of hikers standing on the shore with one gold lantern, symmetrical composition, [ADN Cúmulo]
```

### `cumulo/cta.jpg` — "Elige tu aventura" · 21:9
```
Ultra-wide photograph of a Patagonian valley just before dawn, the horizon glowing from ice blue to soft gold, a braided river reflecting the light, mountains as dark silhouettes, deep navy sky with last stars, large calm area for overlay, [ADN Cúmulo]
```

### `cumulo/cielo.jpg` — Fondo de estrellas · 21:9 (2560 × 1100 o más)
Reemplaza las estrellas hechas con CSS. Debe ser **oscuro y sutil** para que el texto encima se lea (contraste AA).
```
Deep southern night sky, thousands of fine pin-sharp stars of varying brightness, the Large and Small Magellanic Clouds faintly visible, very subtle ice-blue nebula haze in one corner, background #080B14, no horizon, no landscape, extremely clean, no text
```

### `cumulo/textura-vidrio.png` — Ruido para paneles de vidrio · 1024 × 1024, repetible
```
Seamless tileable fine noise texture, neutral grey monochrome grain on transparent, very subtle, for frosted glass UI overlay, uniform, no pattern repetition visible
```

### `cumulo/timelapse.mp4` — Animación del hero · 16:9 o 4:5, loop de 10 s
```
Night time-lapse of stars slowly rotating around the south celestial pole above the granite towers of Torres del Paine, the Milky Way drifting, rock faces faintly lit, one gold headlamp moving slowly on the trail, deep navy and ice blue palette, smooth motion, seamless 10 second loop, no text
```
Pide también el **primer cuadro**: `cumulo/timelapse-poster.jpg`.
> Con `prefers-reduced-motion` muestro solo el póster.

### `cumulo/iconos/*.png` — Glifos finos · 1:1, transparente
> Igual que en Cordada: define el estilo y yo los paso a SVG.
```
Icon set of 8 ultra-thin line glyphs, 1px stroke, geometric Swiss style, ice blue #9FD8FF on transparent background: calendar, group, guide, star, compass, moon, mountain, arrow. Minimal, precise, consistent grid, no text
```

---

## 6. Lo que NO hay que generar

- **Mapa de la Gran Travesía** (Cordada): se genera en SVG en el build a partir de datos geográficos reales.
- **Perfil de elevación** (Cordada): es SVG interactivo hecho con datos.
- **Curvas de nivel, HUD de altitud, coordenadas, grilla suiza y degradado hielo→oro**: van en código.
- **Avatares de testimonios**: ícono genérico, nombres ficticios marcados "de ejemplo".
- **Foto del autor en el footer**: tiene que ser tu foto real.

## 7. Resumen de cantidades

| Carpeta | Imágenes | Videos | Íconos / gráficos |
|---|---|---|---|
| shared | 7 viajes + 4 OG (+ logo opcional) | — | — |
| cordada | hero, prólogo, 3 hojas, detalle, 2 texturas (+3 escapadas opcionales) | 1 + póster | set de 12 (referencia de estilo) |
| albor | fondo, 4 pasos, banda incluido, estado vacío | 1 opcional | 9 íconos 3D |
| brisa | hero + 5 capas, 7 afiches, postal, reverso, 3 a medida, textura, pase | 1 opcional | 3 parches, sello, matasellos, ticket |
| cumulo | hero, 7 índice, por qué, CTA, cielo, textura vidrio | 1 + póster | set de 8 (referencia de estilo) |

**Prioridad sugerida:** 1) las 7 compartidas (las usan los 4 temas) → 2) los heroes → 3) lo propio de cada tema a medida que lo construyamos en la fase 3.
