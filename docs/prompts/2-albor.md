# Prompts — Tema 2: Albor (planificador)

Paleta: violeta `#5B4BE8` · lima `#C9F27A` · blanco cálido `#F7F6F3` · tinta `#16151D`.
Tono: luminoso, amable, moderno y optimista. Ropa y equipo en violeta, lima, blanco y gris. Nada de rojo ni naranja. Nada de texto dentro de las imágenes.

Las 7 fotos de viaje compartidas ya están hechas: Albor las usa en los resultados del planificador y en la tarjeta de vista previa.

Guarda cada archivo en `src/assets/img/albor/` con el nombre indicado, en la máxima resolución.

## Estado (revisión 1)
- ✅ 16 de 16 entregadas, más `og-albor`. Los PNG tienen transparencia correcta. Video: descartado (CSS).
- ✅ `paso-4-camina` rehecha con los Cuernos del Paine. Original guardado (1122×1402).
- **Albor cerrado.**
- 💡 Opcional: `icono-guia` es un personaje humano y `icono-grupo` son figuras moradas; van juntos en el hero y no combinan.
- 💡 Opcional: `paso-1-elige` muestra caras de perfil; se pidieron solo manos.

**Negative prompt para fotos:**
```
text, letters, watermark, logo, brand logos on clothing, red jacket, orange jacket, red or orange color cast, oversaturated, faces looking at camera, distorted hands, extra limbs, blurry, low resolution
```

**Negative prompt para íconos e ilustraciones 3D:**
```
text, letters, numbers, watermark, logo, red, orange, realistic photo, harsh shadows, clutter, background scenery
```

---

## 1. `albor/fondo-hero.png` — Fondo de color del planificador · 16:9
```
Soft abstract gradient mesh background, warm off-white #F7F6F3 base with large blurred organic blobs of violet #5B4BE8 and lime #C9F27A at low opacity, gentle film grain, airy and optimistic, lots of clean empty space in the center, no hard edges, no shapes, no text
```

## 2. Íconos 3D (×9) · 1:1, fondo transparente
Genera **uno por uno** con el mismo bloque de estilo; solo cambia el objeto. Así salen coherentes entre sí.
Si tu generador no da transparencia, usa fondo blanco plano `#FFFFFF` y yo lo recorto.

**Bloque de estilo** (pégalo al final de cada uno):
```
3D clay-style icon, soft rounded shapes, matte material, studio lighting with a soft contact shadow, main color violet #5B4BE8 with lime #C9F27A accents and small white details, three-quarter isometric view, centered with generous padding, transparent background, playful but premium, no text
```

| Archivo | Dónde va | Objeto (va antes del bloque de estilo) |
|---|---|---|
| `icono-grupo.png` | Hero: "12 personas máx." | `A small group of tiny rounded figures standing together, one of them slightly ahead,` |
| `icono-guia.png` | Hero: "Guías locales" | `A friendly rounded guide figure wearing a wide-brim hat and holding a compass,` |
| `icono-todo-incluido.png` | Hero: "Todo incluido" | `A plump trekking backpack fully packed with a rolled sleeping mat on top,` |
| `icono-bilingue.png` | Incluido: "Guía local bilingüe" | `Two overlapping rounded speech bubbles,` |
| `icono-traslado.png` | Incluido: "Traslados desde el aeropuerto" | `A small rounded shuttle van,` |
| `icono-refugio.png` | Incluido: "Refugios o cabañas" | `A small rounded mountain cabin with a pitched roof and a tiny chimney,` |
| `icono-comidas.png` | Incluido: "Todas las comidas" | `A rounded bowl of warm soup with a spoon and a little steam,` |
| `icono-permisos.png` | Incluido: "Permisos y entradas" | `A rounded park entry ticket with a small mountain cut-out,` |
| `icono-seguro.png` | Incluido: "Seguro de viaje" | `A rounded shield with a check mark,` |

Ejemplo completo del primero:
```
A small group of tiny rounded figures standing together, one of them slightly ahead, 3D clay-style icon, soft rounded shapes, matte material, studio lighting with a soft contact shadow, main color violet #5B4BE8 with lime #C9F27A accents and small white details, three-quarter isometric view, centered with generous padding, transparent background, playful but premium, no text
```

## 3. "Reservar es simple" — 4 pasos · 4:5
Las 4 deben verse como una serie: misma luz, mismo tratamiento de color y detalles violeta y lima.

### `albor/paso-1-elige.jpg` — Elige tu ruta
```
Top-down editorial photograph of hands pointing at a paper trail map of Patagonia spread on a light wooden table, a phone face-down and a cup of coffee beside it, a violet pencil and a lime sticky note, soft bright daylight from a window, clean and airy, consistent color grade, no readable text, no logos
```

### `albor/paso-2-reserva.jpg` — Reserva tu cupo
```
Close-up editorial photograph of a hand holding a phone with a blank bright screen above a packed trekking backpack, a violet luggage tag with a lime strap hanging from the backpack, soft bright daylight, shallow depth of field, clean and airy, consistent color grade, no readable text, no logos
```

### `albor/paso-3-preparate.jpg` — Prepárate
```
Top-down flat lay photograph of trekking gear neatly arranged on a warm off-white floor: hiking boots, merino layers, headlamp, water bottle, trekking poles, a rain jacket, gear colored in violet, lime, white and light grey, soft even shadows, clean and organized, consistent color grade, no readable text, no logos
```

### `albor/paso-4-camina.jpg` — Camina
```
Editorial photograph of two hikers seen from behind walking into a sunny Patagonian valley with snowy peaks, one in a violet jacket and one in a lime jacket, bright optimistic daylight, open space and blue sky, light and airy color grade, consistent with a lifestyle photo series, no text, no logos
```

## 4. `albor/incluido.jpg` — Banda "Tú solo caminas. Del resto nos encargamos." · 21:9
Encima va texto a la izquierda: deja esa zona calma.
```
Wide photograph of a cozy mountain refuge at blue hour in Torres del Paine, soft warm yellow window light, a row of hiking boots at the door, granite peaks behind under a violet-blue twilight sky, inviting and calm, clean composition with an empty calm sky area on the left third, no orange cast, subtle film grain, no text
```

## 5. `albor/sin-resultados.png` — "Ningún viaje calza con todo eso" · 1:1, transparente
```
Friendly 3D clay illustration of a small rounded hiker character holding a big folded map upside down, looking curious and a bit lost, a dotted trail line curling into a loop beside them, violet #5B4BE8 and lime #C9F27A with white details, soft studio lighting, matte material, centered with generous padding, transparent background, charming and minimal, no text
```

## 6. `shared/og-albor.jpg` — Imagen para compartir · 1200 × 630
```
Soft abstract gradient mesh in violet #5B4BE8 and lime #C9F27A on warm off-white #F7F6F3, subtle grain, smooth organic shapes concentrated on the right side, large calm empty area on the left half, no text
```

## 7. `albor/loop-iconos.mp4` — Animación opcional del hero · 1:1, 6 s, sin audio
Opcional. Lo más liviano es animar los PNG de los íconos con CSS; usa esto solo si quieres probar el video.
```
3D clay icons of a compass, a backpack, a small mountain and a tent gently floating and slowly rotating in a seamless loop, violet and lime on a warm off-white background, soft shadows, calm motion, 6 seconds, perfect loop, no text
```

---

## Lo que no hay que generar en Albor
- Fotos de los viajes: usan las 7 compartidas.
- Estrellas de valoración, avatares de testimonios, frase editable y filtros: van en código.
