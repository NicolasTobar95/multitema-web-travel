# Prompts — Tema 1: Cordada (cartográfico)

Paleta: tinta `#0F1A20` · papel `#ECEFEA` · azul glaciar `#2F6FDB` · oscuro `#0B1418`.
Tono: frío, técnico y preciso. Ropa en azul marino, gris u oliva. Nada de rojo ni naranja. Nada de texto dentro de las imágenes.

Guarda cada archivo con el nombre indicado en `src/assets/img/<carpeta>/`, en la máxima resolución.

**Negative prompt** (para todas las fotos, si tu generador lo acepta):
```
text, letters, watermark, logo, signature, brand logos on clothing, red jacket, orange jacket, red or orange color cast, oversaturated, HDR halos, faces looking at camera, distorted hands, extra limbs, blurry, low resolution, cartoon, 3d render
```

## Estado (revisión 2)
- ✅ 19 imágenes entregadas y guardadas en `src/assets/img/`. `detalle-w` corregida (ya no hay chaqueta magenta).
- Video `recorrido-w.mp4`: descartado (la IA no genera video). Se usa el póster con un acercamiento lento en CSS.
- Upscale: descartado. Las fotos quedan en 1672–1916 px de ancho, suficiente con el oscurecido y el HUD encima.
- **Cordada cerrada.**

---

## A. Fotos compartidas (se generan una sola vez y las usan los 4 temas)

Cordada las usa en las hojas de ruta, las escapadas y la Gran Travesía. Deja el sujeto **centrado y con aire alrededor**, porque cada tema las recorta distinto.

### `shared/trip-paine.jpg` · 3:2
```
Documentary outdoor travel photograph, the three granite towers of Torres del Paine lit by first pink-gold sunrise light, glacial lagoon at their base in shadow, two small hikers in navy and olive jackets standing on boulders seen from behind, cold clear air, scale emphasized, wide 24mm lens, true-to-life colors, subtle film grain, editorial quality, no text
```

### `shared/trip-castillo.jpg` · 3:2
```
Documentary outdoor travel photograph, jagged basalt spires of Cerro Castillo in Aysén, Chile, a turquoise glacial lagoon below, patches of snow on a high mountain pass, a single hiker in a teal jacket with a large backpack walking along the ridge seen from behind, crisp midday alpine light, dramatic but natural, 35mm lens, subtle film grain, no text
```

### `shared/trip-pumalin.jpg` · 3:2
```
Documentary outdoor travel photograph, ancient temperate rainforest in Pumalín Park, Chile, massive alerce trunks, giant nalca leaves and ferns, a wooden boardwalk trail disappearing into soft mist, rays of light filtering through the canopy, two hikers in olive and slate-blue rain jackets small in the frame, deep greens, humid atmosphere, 35mm lens, subtle film grain, no text
```

### `shared/trip-exploradores.jpg` · 3:2
```
Documentary outdoor travel photograph, a roped team of four hikers with crampons and helmets walking in single file across the white and blue ice of Exploradores glacier, deep blue crevasses, rainforest-covered mountains and distant snowfields behind, overcast soft light, jackets in navy, teal and mustard yellow, sense of scale, 35mm lens, subtle film grain, no text
```

### `shared/trip-puyuhuapi.jpg` · 3:2
```
Documentary outdoor travel photograph, two sea kayaks gliding on a mirror-calm fjord in Puyuhuapi, Chilean Patagonia, steep walls of dense green rainforest, low clouds hanging on the slopes, a thin waterfall in the distance, paddlers in teal and grey jackets seen from behind, soft diffused morning light, emerald and slate-blue tones, 50mm lens, subtle film grain, no text
```

### `shared/trip-esperanza.jpg` · 3:2
```
Documentary outdoor landscape photograph, Última Esperanza sound near Puerto Natales at golden hour, calm water reflecting a soft gold and lavender sky, snow-capped mountains on the horizon, windswept lenga trees in the foreground, a photographer with a tripod seen from behind in a dark green jacket, gentle warm light without strong orange, 35mm lens, subtle film grain, no text
```

### `shared/trip-travesia.jpg` · 3:2
```
Documentary outdoor travel photograph, the Carretera Austral gravel road winding through a wide Patagonian valley, a braided glacial river in milky turquoise, snowy peaks and green forest, a small white expedition van far away on the road, big sky with moving clouds, sense of a long journey, aerial drone view at medium altitude, true-to-life colors, subtle film grain, no text
```

---

## B. Exclusivas de Cordada

### 1. `cordada/hero.jpg` — Hero de escritorio · 16:9
Encima van el HUD de altitud, las coordenadas, las curvas de nivel y el titular a la izquierda.
```
Wide cinematic landscape photograph, a small group of six hikers walking in single file along a high ridge trail toward the granite towers of Torres del Paine, seen from behind and far away, cold blue pre-dawn light, deep shadows in the valley below, large calm dark area of sky and slope on the left third for text overlay, desaturated cool palette with steel blue tones, jackets in navy and grey, 35mm lens, subtle film grain, no text
```

### 2. `cordada/hero-movil.jpg` — Hero móvil · 4:5
```
Vertical cinematic landscape photograph, a small group of hikers walking in single file up a ridge trail toward the granite towers of Torres del Paine, seen from behind and far away, cold blue pre-dawn light, deep shadows below, calm dark empty area in the upper half for text overlay, desaturated cool palette with steel blue tones, jackets in navy and grey, 35mm lens, subtle film grain, no text
```

### 3. `cordada/prologo.jpg` — "Regla de cordada" · 21:9
La idea de la marca: el grupo avanza al ritmo del más lento.
```
Wide documentary photograph, a rope team of five trekkers walking slowly in a single line along the shore of a still glacial lake, seen from behind, the guide waiting for the last hiker, mountains reflected in the water, soft overcast light, cool blue-grey palette, quiet and patient mood, lots of negative space above, 50mm lens, subtle film grain, no text
```

### 4. `cordada/hoja-pumalin.jpg` — Hoja de ruta 01 · 4:5
```
Vertical documentary landscape photograph of Pumalín ancient temperate rainforest, towering alerce trunks, ferns and hanging moss in soft mist, a narrow trail leading into the forest, cool blue-shifted color grade, muted highlights, strong sense of depth, calm empty area in the bottom third for overlay text, 35mm lens, subtle film grain, no text
```

### 5. `cordada/hoja-castillo.jpg` — Hoja de ruta 02 · 4:5
```
Vertical documentary landscape photograph of the jagged basalt spires of Cerro Castillo rising above a turquoise glacial lagoon, snow on the pass, a tiny hiker on the moraine, cool blue-shifted color grade, muted highlights, strong sense of depth, calm empty area in the bottom third for overlay text, 35mm lens, subtle film grain, no text
```

### 6. `cordada/hoja-paine.jpg` — Hoja de ruta 03 · 4:5
```
Vertical documentary landscape photograph of the three granite towers of Torres del Paine above their glacial lagoon, boulder field in the foreground, early cold light, cool blue-shifted color grade, muted highlights, strong sense of depth, calm empty area in the bottom third for overlay text, 35mm lens, subtle film grain, no text
```

### 7. `cordada/detalle-w.jpg` — Fondo de "Circuito W en detalle" · 21:9
```
Wide panoramic landscape photograph of the Cuernos del Paine above Lago Nordenskjöld, turquoise water, dark granite horns with pale sedimentary caps, a thin trail on the hillside with tiny hikers, soft late-afternoon light without orange cast, cool palette, calm sky on top for overlay, 24mm lens, subtle film grain, no text
```

### 8. `cordada/recorrido-w.mp4` — Video "Ver el recorrido" · 16:9, 10 s, sin audio
Para texto a video, o imagen a video partiendo de `detalle-w.jpg`.
```
Slow cinematic drone flight following a hiking trail along the shore of Lago Pehoé toward the Cuernos del Paine, smooth forward motion, gentle altitude gain, turquoise lake, granite peaks, cool natural color grade, steady, no camera shake, 4K, 10 seconds, loop-friendly ending, no text
```

### 9. `cordada/recorrido-w-poster.jpg` — Imagen fija del video · 16:9
Usa el primer cuadro del video. Si no puedes exportarlo, genera esta imagen:
```
Aerial drone photograph above the shore of Lago Pehoé looking toward the Cuernos del Paine, a hiking trail along the turquoise lake, granite peaks, cool natural color grade, calm composition, no text
```

### 10. `cordada/textura-papel.png` — Papel de mapa claro · 2048 × 2048, repetible
```
Seamless tileable texture of vintage topographic survey map paper, pale grey-green #ECEFEA, very subtle fibers and faint grid, slight aging, extremely low contrast, no lines, no text, flat lighting, top-down scan
```

### 11. `cordada/textura-oscura.png` — Papel oscuro · 2048 × 2048, repetible
```
Seamless tileable texture of dark blue-black map paper #0B1418, very subtle grain and fibers, faint matte noise, extremely low contrast, no text, flat top-down scan
```

### 12. `shared/og-cordada.jpg` — Imagen para compartir en redes · 1200 × 630
El nombre y el lema los pongo yo encima con código.
```
Minimal topographic contour map of a Patagonian mountain range, thin precise blue lines #2F6FDB on pale grey-green paper #ECEFEA, a few index contours slightly thicker, large empty area on the left half, flat top-down, no text, no labels
```

### 13. `cordada/iconos-referencia.png` — Estilo de íconos · 1:1
Es solo una referencia de estilo: yo los redibujo en SVG (pesan menos de 1 KB, toman el azul del tema y se ven nítidos a cualquier tamaño).
```
Icon set of 12 technical cartographic line icons arranged in a 4x3 grid, monoline 1.5px stroke, square caps, precise geometric construction, single color ink #0F1A20 on plain white background, consistent 24px grid: north arrow compass, altitude marker triangle with tick, tent, mountain hut, hiking boot, distance ruler, calendar, group of people, certified guide badge, shield, bus, permit ticket. Clean, minimal, survey-map aesthetic, no text
```

---

## Lo que no hay que generar en Cordada
- Mapa de la Gran Travesía: lo genero en SVG en el build con datos geográficos reales.
- Perfil de elevación, curvas de nivel, HUD de altitud y coordenadas: van en código.
- Escapadas: usan las fotos compartidas de Exploradores, Puyuhuapi y Última Esperanza.
