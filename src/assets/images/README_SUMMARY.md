# Guía para Imágenes Locales - Travel Portfolio

## 📦 Archivos Creados

1. **`src/assets/images/README.md`** - Directorio para imágenes locales
2. **`src/config/imageMetadata.ts`** - Metadatos completos con descripciones bilingües
3. **`src/assets/images/INTEGRATION_GUIDE.md`** - Guía de integración
4. **`src/assets/images/COMPONENT_EXAMPLES.tsx`** - Ejemplos de componentes actualizados

---

## 🎯 Estructura de Imágenes Creada

### Headers (4 imágenes)
```
src/assets/images/headers/
├── waypoint-hero.webp      # Para tema Waypoint
├── aura-hero.webp          # Para tema Aura
├── aeria-hero.webp         # Para tema Aeria
└── nimbus-hero.webp        # Para tema Nimbus
```

### Destinations (8 imágenes)
```
src/assets/images/destinations/
├── 01-swiss-alps.webp      # Suiza - Alpes
├── 02-bali-island.webp     # Bali, Indonesia
├── 03-gili-trawangan.webp  # Gili Trawangan
├── 04-machu-picchu.webp    # Perú - Machu Picchu
├── 05-maldives.webp        # Maldivas
├── 06-northern-lights.webp # Islandia - Aurora Boreal
├── 07-kyoto.webp           # Japón - Kyoto
└── 08-fiji.webp            # Fiji
```

### Avatars (6 imágenes)
```
src/assets/images/avatars/
├── avatar-01.webp   # Sofía Martínez
├── avatar-02.webp   # Carlos Rodríguez
├── avatar-03.webp   # Emily Chen
├── avatar-04.webp   # James Wilson
├── avatar-05.webp   # María García
└── avatar-06.webp   # Michael Brown
```

---

## 📝 Datos de Cada Imagen

### Headers

| ID | Título (ES) | Título (EN) | Descripción Corta |
|----|-------------|-------------|-------------------|
| waypoint-hero | Picos de montaña nevados | Snow-capped mountain peaks | Vista impresionante del amanecer en los Alpes |
| aura-hero | Bosque místico | Mystical forest | Bosque con luz dorada etérea |
| aeria-hero | Montañas con neblina | Mountains with mist | Montañas en el atardecer con neblina |
| nimbus-hero | Bosque denso | Dense forest | Bosque de coníferas con luz dramática |

### Destinations

| ID | Ubicación (ES) | Location (EN) | Tags | Featured |
|----|----------------|---------------|------|----------|
| 01-swiss-alps | Suiza | Switzerland | montaña, alpes, trekking, nieve | ✅ Sí |
| 02-bali-island | Bali, Indonesia | Bali, Indonesia | tropical, playa, cultura, templos | ✅ Sí |
| 03-gili-trawangan | Gili Trawangan, Indonesia | Gili Trawangan, Indonesia | mar, relax, snorkel, playa | ✅ Sí |
| 04-machu-picchu | Perú | Peru | historia, andinas, arqueología, inca | ✅ Sí |
| 05-maldives | Maldivas | Maldives | lujo, playa, turquesa, romántico | ✅ Sí |
| 06-northern-lights | Islandia | Iceland | aurora, noche, extremo, vulcanos | ✅ Sí |
| 07-kyoto | Kyoto, Japón | Kyoto, Japan | cultura, japón, historia, jardines | ✅ Sí |
| 08-fiji | Fiji | Fiji | oceano, islas, playa, amazing | ✅ Sí |

### Avatars

| ID | Nombre (ES) | Name (EN) | Rol (ES) | Role (EN) |
|----|-------------|-----------|----------|-----------|
| avatar-01 | Sofía Martínez | Sofía Martínez | Viajera apasionada | Passionate Traveler |
| avatar-02 | Carlos Rodríguez | Carlos Rodríguez | Aventurero urbano | Urban Adventurer |
| avatar-03 | Emily Chen | Emily Chen | Cocinera exploradora | Culinary Explorer |
| avatar-04 | James Wilson | James Wilson | Montañista profesional | Professional Mountaineer |
| avatar-05 | María García | María García | Ecoturista | Eco-Tourist |
| avatar-06 | Michael Brown | Michael Brown | Fotógrafo de viajes | Travel Photographer |

---

## 🚀 Próximos Pasos

### Paso 1: Obtener las Imágenes

Usa las referencias de Unsplash mencionadas para buscar imágenes:

**Headers:**
```
Unsplash IDs:
- Waypoint: photo-1464822759023-fed622ff2c3b
- Aura: photo-1686757328248-cf22f6ba269
- Aeria: photo-1436491865332-7a61a109cc05
- Nimbus: photo-1493976040374-85c8e12f0c0e
```

**Destinations:**
```
Unsplash IDs (para desktop):
- 01: photo-1530122037265-a5f1f91d3b99 (Suiza)
- 02: photo-1537996194471-e657df975ab4 (Bali)
- 03: photo-1596401057633-ce4e22e6cf48 (Gili Trawangan)
- 04: photo-1587595431973-160d0d94add1 (Machu Picchu)
- 05: photo-1514282401047-d79a71a590e8 (Maldivas)
- 06: photo-1531366936337-7c912a4589a7 (Islandia)
- 07: photo-1493976040374-85c8e12f0c0e (Kyoto - SAME AS NIMBUS)
- 08: photo-1538688525198-9b0457bef86d (Fiji)
```

**Avatars:**
```
Pravatar URLs (reemplaza {id} con 11, 12, 13, 51, 68, 72):
https://i.pravatar.cc/150?img={id}
```

### Paso 2: Convertir a WebP

Usa una herramienta como:
- **Squoosh.app** (recomendado): https://squoosh.app/
- **ImageMagick**: `convert original.jpg output.webp`
- **TinyPNG**: https://tinypng.com/

Configuración recomendada para WebP:
- Calidad: 85-90%
- Máxima pérdida: "Más rápido"

### Paso 3: Guardar las Imágenes

Copia las imágenes a la carpeta correspondiente:
```
src/assets/images/headers/{nombre}.webp
src/assets/images/destinations/{nombre}.webp
src/assets/images/avatars/{nombre}.webp
```

**Importante:** Deben coincidir exactamente con los nombres definidos en `imageMetadata.ts`

### Paso 4: Actualizar Components

Sigue la guía en `INTEGRATION_GUIDE.md` para actualizar tus componentes:
1. Importa los metadatos: `import { destinationMetadata } from '../../../config/imageMetadata'`
2. Usa el método `alt[lang]` para textos bilingües
3. Mapea imágenes con sus metadatos correspondientes

---

## 🎨 Ejemplo de Uso

```typescript
// Antes:
<img src={sharedImages.destinations[idx]} alt={card.title} />

// Después:
const metadata = destinationMetadata[idx];
<img
  src={images[idx]}
  alt={metadata.description[lang]}
  title={metadata.description[lang]}
/>
```

---

## ⚙️ Cómo Vite Maneja las Imágenes

Cuando uses import:
```typescript
import waypointHero from '/src/assets/images/headers/waypoint-hero.webp';
<img src={waypointHero} alt="..." />
```

Cuando uses el objeto (como en `themeData.ts`):
```typescript
import { getHeaderImageByTheme } from '../../../config/imageMetadata';
const imageUrl = getHeaderImageByTheme('Waypoint')!.url;
```

---

## 📊 Resumen de Datos

- **Headers**: 4 imágenes (1 por tema)
- **Destinations**: 8 imágenes (incluye destinos nuevos)
- **Avatars**: 6 imágenes (para testimonios)
- **Total**: 18 imágenes listas para usar
- **Formato**: WebP (recomendado)
- **Idiomas**: Español (es) e Inglés (en)
- **Estructura**: TypeScript con type safety
- **Integración**: Listo para usar con i18n

---

## ✅ Checklist Final

- [ ] Obtener todas las 18 imágenes desde Unsplash/Pravatar
- [ ] Convertir a WebP (85-90% calidad)
- [ ] Guardar en las carpetas correctas
- [ ] Verificar que los nombres coincidan exactamente
- [ ] Actualizar `themeData.ts` para usar metadatos
- [ ] Actualizar componentes de Destinations
- [ ] Actualizar componentes de Testimonials/Avatars
- [ ] Probar en modo desarrollo
- [ ] Verificar textos bilingües
- [ ] Probar en modo producción

---

**¿Tienes alguna duda sobre algún paso? ¡Pregúntame!**
