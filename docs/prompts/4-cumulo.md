# Prompts — Tema 4: Cúmulo (suizo nocturno)

Paleta: noche `#080B14` · tinta `#EEF2FF` · hielo `#9FD8FF` · dorado `#F2C879`.
Tono: nocturno, silencioso y preciso. Hora azul, luna, estrellas y Vía Láctea. Las luces cálidas son **dorado suave**, nunca naranja. Ropa en azul marino, gris o negro, con linternas frontales blancas o azul hielo. Nada de texto dentro de las imágenes.

**Importante:** en este tema las fotos parten en **blanco y negro** y toman color al cargar o al pasar el cursor. Pide **buen contraste de luces y sombras**: una foto plana se ve gris y apagada en blanco y negro.

Guarda cada archivo en `src/assets/img/cumulo/` (la OG en `shared/`) con el nombre indicado, en la máxima resolución.

## Estado (revisión 1)
- ✅ 11 de 11 entregadas, con las proporciones correctas. La serie es coherente y se ve bien también en blanco y negro.
- 💡 Menor: en `cta`, `og-cumulo`, `indice-esperanza` e `indice-exploradores` el horizonte tiene un brillo cálido algo anaranjado. Es pequeño y queda dentro del degradado hielo→dorado; si molesta, se corrige con un filtro en CSS.
- **Cúmulo cerrado.**

**Negative prompt para fotos:**
```
text, letters, watermark, logo, brand logos on clothing, red jacket, orange jacket, red or orange color cast, orange sunset, sodium light, oversaturated, HDR halos, light pollution, star trails, faces looking at camera, distorted hands, extra limbs, blurry, low resolution, cartoon, 3d render
```

---

## 1. `cumulo/fig-01-paine.jpg` — Hero "Fig. 01 — Torres del Paine" · 16:10
Va en un recuadro grande junto al titular "Patagonia sin atajos".
```
Night landscape photograph of the three granite towers of Torres del Paine under a clear sky with the Milky Way arching above them, two hikers seen from behind on the rocky trail in the foreground with small white headlamps on, faint moonlight on the granite, deep blue night tones with ice-blue highlights and a subtle soft gold glow on the horizon, strong tonal contrast, sharp stars without trails, wide 20mm lens, long exposure astrophotography, subtle film grain, no text
```

## 2. Índice de salidas — miniaturas nocturnas (×7) · 16:9
Aparecen al pasar el cursor por cada fila del índice. Deben verse como una serie: misma hora azul o noche, mismo tratamiento de color y el sujeto centrado.

**Bloque de estilo** (va al final de cada una):
```
blue hour or night photograph, deep navy shadows, ice-blue #9FD8FF highlights, a touch of soft gold #F2C879 light, strong tonal contrast, clear sky with visible stars, calm and silent mood, centered subject with space around it, 35mm lens, subtle film grain, no orange, no text
```

| Archivo | Escena (va antes del bloque de estilo) |
|---|---|
| `indice-paine.jpg` | `The Cuernos del Paine reflected in the still water of Lago Pehoé at dusk, first stars appearing,` |
| `indice-castillo.jpg` | `The jagged basalt spires of Cerro Castillo above a frozen glacial lagoon under moonlight, a small tent glowing softly on the moraine,` |
| `indice-pumalin.jpg` | `Ancient alerce rainforest at night, moonlight filtering through mist between the giant trunks, a wooden boardwalk lit by a single headlamp,` |
| `indice-exploradores.jpg` | `The ice of Exploradores glacier at blue hour, deep blue crevasses glowing faintly, forested mountains in silhouette, a roped team with headlamps far away,` |
| `indice-puyuhuapi.jpg` | `A mirror-calm fjord in Puyuhuapi at night reflecting the stars, steep forested walls in silhouette, two kayaks resting on a pebble shore,` |
| `indice-esperanza.jpg` | `Última Esperanza sound near Puerto Natales at blue hour, calm water, snowy peaks on the horizon, a photographer with a tripod shooting the stars,` |
| `indice-travesia.jpg` | `The Carretera Austral gravel road winding through a wide valley under the Milky Way, a small van with soft white headlights far away, a braided river reflecting the sky,` |

Ejemplo completo de la primera:
```
The Cuernos del Paine reflected in the still water of Lago Pehoé at dusk, first stars appearing, blue hour or night photograph, deep navy shadows, ice-blue #9FD8FF highlights, a touch of soft gold #F2C879 light, strong tonal contrast, clear sky with visible stars, calm and silent mood, centered subject with space around it, 35mm lens, subtle film grain, no orange, no text
```

## 3. `cumulo/por-que.jpg` — "Hecho para cada caminante" · 4:5
Va junto a la lista "Fechas flexibles · Grupos de 12 · Guías locales".
```
Vertical night photograph of a small group of hikers walking in single file along a lakeshore trail, their white headlamps forming a line of small lights, the guide at the back waiting for the last person, still lake with mist, pine and lenga silhouettes, mountains and stars above, deep navy tones with ice-blue highlights, strong tonal contrast, quiet and patient mood, 35mm lens, subtle film grain, no text
```

## 4. `cumulo/cta.jpg` — Banda "Elige tu aventura" · 3:1 (panorámica)
Va abajo del llamado final, muy ancha y baja: deja el sujeto en la franja central.
```
Ultra-wide panoramic night photograph of a braided glacial river winding through a wide Patagonian valley under moonlight, snowy peaks along the horizon, the river reflecting the starry sky, faint soft gold glow of dawn at the far edge, deep navy and ice-blue tones, strong tonal contrast, subject in the central horizontal band, aerial view at medium altitude, subtle film grain, no text
```

## 5. `shared/og-cumulo.jpg` — Imagen para compartir · 1200 × 630
El nombre y el lema los pongo yo encima con código.
```
Minimal night sky over a dark silhouette of Patagonian granite peaks along the bottom right, deep navy #080B14 sky with fine sharp stars and a faint Milky Way, a subtle diagonal glow shifting from ice blue #9FD8FF to soft gold #F2C879 near the horizon, large calm empty dark area on the left half, no text
```

---

## Lo que no hay que generar en Cúmulo
- Estrellas del fondo, brillos de color, efecto vidrio, columnas de la grilla y el degradado hielo→dorado de los títulos: van en CSS.
- Time-lapse de estrellas: se reemplaza por estrellas animadas en CSS.
- Íconos: este tema usa números ("01", "02"…) en lugar de íconos.
- Avatares de testimonios y estrellas de valoración: van en código.
- Las 2 miniaturas extra de cada fila del índice: reutilizan las otras miniaturas nocturnas.

## Resumen: 11 piezas
1 hero · 7 miniaturas del índice · por qué · CTA · OG.
