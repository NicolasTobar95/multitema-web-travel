# Prompts — Tema 3: Brisa (afiche de parque nacional)

Paleta: bosque `#23402F` · pino `#345A3F` · teal `#2E6B6A` · pizarra `#7FA9A4` · cielo `#A9CFC7` · mostaza `#E0A93B` · crema `#F2E8D0`.
Estilo: **serigrafía vintage de afiches de parques nacionales**, con colores planos limitados, papel con grano y un poco de desregistro de tinta. Nada de rojo ni naranja. Nada de texto: los títulos los pongo yo con Big Shoulders Display.

Las 7 fotos de viaje compartidas ya están hechas: Brisa las usa en la galería de postales y al pasar el cursor sobre cada afiche.

Guarda cada archivo en `src/assets/img/brisa/` con el nombre indicado, en la máxima resolución.

## Estado (revisión 1)
- ✅ 25 de 26 entregadas. Las capas del parallax calzan con `hero-completo`. Los 7 afiches no tienen texto y dejan libre el tercio inferior. Parches, sello, matasellos, ticket y cóndor tienen transparencia correcta.
- ✅ `shared/og-brisa.jpg` entregada (1200×630). **Brisa cerrada.**
- 🔧 `textura-papel` trae una transparencia parcial: se pinta sobre fondo crema en CSS, así que no hay que regenerarla.
- 💡 Opcional: las franjas de `pase-temporada` tiran a naranja (#E9922x) en vez de mostaza. Si no se rehace, la redibujo en SVG con `#E0A93B`.
- 💡 Opcional: `parche-guias` tiene una cara muy realista y se ve distinta de los otros dos parches.

**Negative prompt para ilustraciones:**
```
text, letters, numbers, words, signature, watermark, logo, red, orange, photorealistic, 3d render, gradients, glossy, neon colors, clutter
```
**Negative prompt para fotos:**
```
text, letters, watermark, logo, brand logos on clothing, red jacket, orange jacket, red or orange color cast, oversaturated, faces looking at camera, distorted hands, blurry, low resolution
```

---

## 1. Cordillera del hero (parallax)

### `brisa/hero-completo.png` · 21:9
Genera esta primero: es la composición de referencia. Si tu herramienta acepta una imagen de referencia, úsala para las capas del punto 2.
```
Panoramic vintage screen-print travel poster illustration of the Torres del Paine massif seen across a calm lake, layered mountain ranges receding into the distance, a lenga forest in the foreground, a condor soaring, big calm sky in the top half, flat limited palette of forest green #23402F, pine #345A3F, teal #2E6B6A, slate #7FA9A4, sky #A9CFC7, mustard #E0A93B and cream #F2E8D0, bold simplified shapes, subtle paper grain and slight ink misregistration, no gradients, no text
```

### `brisa/capa-1-cielo.png` … `capa-5-bosque.png` · 21:9
Cada capa por separado y con el mismo encuadre. Desde la 2 en adelante, **fondo transparente**.
```
capa-1-cielo.png:     Flat sky band for a vintage screen-print poster, sky #A9CFC7 at the top fading in flat steps to cream #F2E8D0 at the horizon, two simple stylized clouds in cream and a small sun disc in mustard #E0A93B, paper grain, no mountains, no text
capa-2-lejana.png:    Only the silhouette of the distant Torres del Paine peaks in slate #7FA9A4 with flat cream #F2E8D0 snow caps, vintage screen-print style, paper grain, transparent background above and below, nothing else, no text
capa-3-media.png:     Only a middle mountain range silhouette in teal #2E6B6A, rolling ridges, vintage screen-print style, paper grain, transparent background above, nothing else, no text
capa-4-lago.png:      Only a band of lake and low hills in pine #345A3F, with simple horizontal water lines in slate #7FA9A4, vintage screen-print style, paper grain, transparent background above, nothing else, no text
capa-5-bosque.png:    Only the foreground silhouette of windswept lenga trees and tall grass in forest green #23402F along the bottom edge, vintage screen-print style, paper grain, transparent background above, nothing else, no text
```
> Si las capas no calzan entre sí o no salen transparentes, no insistas: con `hero-completo.png` como referencia las redibujo en SVG, que además pesa menos.

---

## 2. Mini afiches (×7) · 2:3
Uno por viaje, **sin texto**, con el **tercio inferior libre** para el nombre. Todos con la misma paleta y el mismo estilo para que se vean como una colección.

**Bloque de estilo** (va al final de cada uno):
```
vintage national park screen-print poster, flat limited palette of forest green #23402F, pine #345A3F, teal #2E6B6A, slate #7FA9A4, sky #A9CFC7, mustard #E0A93B and cream #F2E8D0, bold simplified shapes, subtle paper grain and slight ink misregistration, empty plain band in the bottom third, no gradients, no text, no letters
```

| Archivo | Escena (va antes del bloque de estilo) |
|---|---|
| `afiche-paine.png` | `Vertical poster illustration of the three granite towers of Torres del Paine at dawn above a glacial lagoon, mustard sun behind the towers,` |
| `afiche-castillo.png` | `Vertical poster illustration of the jagged spires of Cerro Castillo above a teal lagoon, a tiny hiker on the snowy pass,` |
| `afiche-pumalin.png` | `Vertical poster illustration of giant alerce tree trunks in a misty rainforest with a snow-capped volcano cone in the distance,` |
| `afiche-exploradores.png` | `Vertical poster illustration of a small rope team walking across glacier ice with stylized crevasses and forested mountains behind,` |
| `afiche-puyuhuapi.png` | `Vertical poster illustration of two kayaks on a calm fjord between steep forested walls with a hanging glacier and a thin waterfall,` |
| `afiche-esperanza.png` | `Vertical poster illustration of a lone photographer with a tripod on a hill above a calm sound at golden hour, big mustard sun low on the horizon,` |
| `afiche-travesia.png` | `Vertical poster illustration of a winding gravel road through mountains, forest and a braided river, a small van on the road,` |

Ejemplo completo del primero:
```
Vertical poster illustration of the three granite towers of Torres del Paine at dawn above a glacial lagoon, mustard sun behind the towers, vintage national park screen-print poster, flat limited palette of forest green #23402F, pine #345A3F, teal #2E6B6A, slate #7FA9A4, sky #A9CFC7, mustard #E0A93B and cream #F2E8D0, bold simplified shapes, subtle paper grain and slight ink misregistration, empty plain band in the bottom third, no gradients, no text, no letters
```

---

## 3. Emblemas de "Caminar liviano" (×3) · 1:1, fondo transparente
Los textos del borde ("GUÍAS LOCALES · BILINGÜES"…) los pongo en SVG alrededor del parche.

**Bloque de estilo:**
```
embroidered circular patch, thick satin stitching, merrowed border in mustard #E0A93B, threads in forest green #23402F, teal #2E6B6A and cream #F2E8D0, realistic embroidery texture, front view, centered with padding, transparent background, no text, no letters
```

| Archivo | Motivo (va antes del bloque de estilo) |
|---|---|
| `parche-guias.png` | `A mountain guide with a wide-brim hat and walking stick in front of snowy peaks,` |
| `parche-equipo.png` | `A dome tent under a lenga tree with mountains behind,` |
| `parche-traslados.png` | `A small bus and a small boat under a mountain range,` |

---

## 4. Detalles de correo

### `brisa/sello.png` — Estampilla · 4:5, transparente
```
Vintage postage stamp with perforated edges, a huemul deer standing in front of snowy Patagonian peaks, engraved line-art style in forest green #23402F and mustard #E0A93B on cream paper, slight ink texture, transparent background outside the perforations, no text, no numbers
```

### `brisa/matasellos.png` — Matasellos · 1:1, transparente
```
Circular postal cancellation mark with wavy cancellation lines, faded forest green ink, rubber-stamp texture with uneven ink, transparent background, no text, no numbers, no letters
```

### `brisa/postal-w.jpg` — Postal "Saludos desde el W" · 3:2
```
Vintage photochrome-style postcard image of the Torres del Paine towers and Lago Pehoé, soft hand-tinted colors leaning to teal, green and mustard, slight halftone dots and paper aging, rounded white border, no text
```

### `brisa/papel-postal.png` — Reverso de postal · 3:2
```
Top-down scan of the back of a blank vintage postcard on cream paper #F8F1DF, faint fibers, subtle yellowing at the edges, a thin vertical divider line in the middle, no text, no stamps, flat even lighting
```

### `brisa/ticket.png` — Ticket "Admite 1" · 5:2, transparente
```
Blank vintage admission ticket with scalloped die-cut edges, cream paper with a mustard #E0A93B border band and a small stylized mountain ornament on the left, slight paper texture and wear, transparent background, no text, no numbers
```

---

## 5. Serie "a medida" (×3) · 4:5
Fotos con look de película vintage, en verdes apagados y mostaza.
```
medida-grupo.jpg:   Documentary photograph of a group of friends of mixed ages laughing while hiking a forest trail in Chilean Patagonia, seen from behind and from the side, jackets in forest green, mustard and cream, warm vintage film look, muted greens, slight grain, no text, no logos
medida-equipo.jpg:  Documentary photograph of a small work team of eight people on a guided walk along a lakeshore in Chilean Patagonia, a guide pointing toward the mountains, relaxed outdoor retreat mood, jackets in forest green, teal and cream, warm vintage film look, muted greens, slight grain, no text, no logos
medida-foto.jpg:    Documentary photograph of a photographer with a tripod on a hilltop at golden hour shooting granite peaks in Torres del Paine, a small group with cameras behind, soft gold light without strong orange, warm vintage film look, muted greens, slight grain, no text, no logos
```

---

## 6. Fondos y texturas

### `brisa/textura-papel.png` — Papel crema · 2048 × 2048, repetible
```
Seamless tileable texture of cream poster paper #F2E8D0, visible fibers, subtle screen-print speckles and halftone dust, very low contrast, flat top-down scan, no text
```

### `brisa/pase-temporada.png` — Fondo del "Pase de temporada" · 16:9
```
Vintage screen-print illustration for a season pass card background, a stylized mountain range along the bottom, sun rays fanning from the top center in alternating mustard #E0A93B and cream #F2E8D0 stripes, forest green #23402F field, bold flat shapes, paper grain, large calm empty area in the center, no text
```

### `brisa/condor.png` — Silueta para animar · 1:1, transparente
Reemplaza el video: la animo con CSS volando sobre la cordillera.
```
Flat silhouette of an Andean condor gliding with wings fully spread, seen from below at a slight angle, single color forest green #23402F, clean vintage screen-print edge, transparent background, no text
```

### `shared/og-brisa.jpg` — Imagen para compartir · 1200 × 630
```
Vintage screen-print illustration of layered Patagonian mountains in forest green, teal, slate and mustard on cream paper, flat colors, visible paper grain, mountains concentrated on the right, large calm empty sky on the left half, no text
```

---

## Lo que no hay que generar en Brisa
- Fotos a color de la galería de postales y del hover de los afiches: usan las 7 compartidas.
- Títulos de los afiches, textos de los parches, sellos de fecha y marcos de postal: van en código.

## Resumen: 26 piezas
1 hero + 5 capas · 7 afiches · 3 parches · sello · matasellos · postal · reverso · ticket · 3 fotos a medida · textura · pase · cóndor · OG.
