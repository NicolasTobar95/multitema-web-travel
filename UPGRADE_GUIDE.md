# Guía de Actualización - Imágenes Locales

## ✅ Cambios Realizados

He actualizado toda la infraestructura para que coincida con tu estructura de carpetas:

---

### 📂 **Estructura de Carpetas Actual**

```
src/webp/
├── headers/              # 4 imágenes (Waypoint, Aura, Aeria, Nimbus)
│   ├── Waypoint.webp
│   ├── Aura.webp
│   ├── Aeria.webp
│   └── Nimbus.webp
├── destinations/         # 8 imágenes (Bali, Suiza, Kyoto, etc.)
│   ├── Bali, Indonesia - Isla paradisíaca.webp
│   ├── Fiji - Islas vírgenes.webp
│   ├── Gili Trawangan - Playa cristalina.webp
│   ├── Islandia - Aurora boreal.webp
│   ├── Kyoto, Japón - Cultura tradicional.webp
│   ├── Maldivas - Lujo tropical.webp
│   ├── Perú - Machu Picchu.webp
│   └── Suiza - Alpes.webp
└── avatars/              # 6 imágenes (incluyendo tu foto)
    ├── Emily Chen - Cocinera exploradora.webp
    ├── James Wilson - Montañista profesional.webp
    ├── María García - Ecoturista.webp
    ├── Michael Brown - Fotógrafo de viajes.webp
    ├── Nicolas Tobar - Full Stack Developer.webp
    └── Sofía Martínez - Viajera apasionada.webp
```

---

### 📝 **Archivos Actualizados**

| Archivo | Cambio Realizado |
|---------|------------------|
| `src/config/imageMetadata.ts` | Actualizado con nombres de archivos exactos y nueva ruta `/src/webp` |
| `src/config/themeData.ts` | Ahora usa `getHeaderImageByTheme()` para importar headers locales |
| `INTEGRATION_GUIDE.md` | Guía actualizada con la nueva estructura |
| `README_SUMMARY.md` | Resumen completo con los cambios |

---

### 🔑 **Principales Cambios en `imageMetadata.ts`**

#### Headers
```typescript
// ANTES:
fileName: 'waypoint-hero.webp',
url: '/src/assets/images/headers/waypoint-hero.webp',

// AHORA:
fileName: 'Waypoint.webp',
url: '/src/webp/headers/Waypoint.webp',
```

#### Destinations
```typescript
// ANTES:
fileName: '01-swiss-alps.webp',
url: '/src/assets/images/destinations/01-swiss-alps.webp',

// AHORA:
fileName: 'Suiza - Alpes.webp',
url: '/src/webp/destinations/Suiza - Alpes.webp',
```

#### Avatars (Tu foto actualizada)
```typescript
// ANTES:
fileName: 'avatar-02.webp',
name: { es: 'Carlos Rodríguez', en: 'Carlos Rodríguez' },
role: { es: 'Aventurero urbano', en: 'Urban Adventurer' },

// AHORA:
fileName: 'Nicolas Tobar - Full Stack Developer.webp',
name: { es: 'Nicolas Tobar', en: 'Nicolas Tobar' },
role: { es: 'Full Stack Developer', en: 'Full Stack Developer' },
```

---

### 🚀 **Cómo Integrar en Componentes**

#### Paso 1: Importar los metadatos

```typescript
// Para headers:
import { getHeaderImageByTheme } from '../../../config/imageMetadata';

// Para destinos:
import { destinationMetadata } from '../../../config/imageMetadata';

// Para avatares:
import { avatarMetadata } from '../../../config/imageMetadata';
```

#### Paso 2: Usar en themeData.ts (ya hecho ✅)

```typescript
// Ya está actualizado:
export const themeData = {
  Waypoint: {
    heroImageUrl: getHeaderImageByTheme('Waypoint')!.url,
    // ...
  }
}
```

#### Paso 3: Usar en componentes (Ejemplos)

**Destinations Component:**
```typescript
const { language } = useTranslation();
const lang = language === 'es' ? 'es' : 'en';

const images = sharedImages.destinations;
const metadata = destinationMetadata;

// Mapear imagen con metadata bilingüe
const card = cards[idx];
const meta = metadata[idx];
<img
  src={images[idx]}
  alt={meta.alt[lang]}
  title={meta.description[lang]}
/>
```

**Avatars Component:**
```typescript
const { language } = useTranslation();
const lang = language === 'es' ? 'es' : 'en';

const avatars = sharedImages.avatars;
const avatarMeta = avatarMetadata;

const avatar = avatarMeta[idx % avatarMeta.length];
<img
  src={avatars[idx % avatars.length]}
  alt={avatar.name[lang]}
  title={`${avatar.name[lang]} - ${avatar.role[lang]}`}
/>
```

---

### ⚠️ **¿Qué Necesitas Hacer Ahora?**

#### ✅ **Ya terminado:**
- [x] Estructura de carpetas creada
- [x] Archivo `imageMetadata.ts` actualizado
- [x] `themeData.ts` configurado para usar headers locales
- [x] Metadata con tu foto actualizada

#### 🔄 **Necesario:**
- [ ] Actualizar componentes de Destinations para usar `destinationMetadata`
- [ ] Actualizar componentes de Testimonials para usar `avatarMetadata`
- [ ] Probar en modo desarrollo (`npm run dev`)
- [ ] Verificar que todas las imágenes se cargan correctamente
- [ ] Verificar textos bilingües (es/en)

---

### 📚 **Documentación Útil**

- **`README_SUMMARY.md`** - Resumen completo de todo el sistema
- **`INTEGRATION_GUIDE.md`** - Guía de integración paso a paso
- **`COMPONENT_EXAMPLES.tsx`** - Ejemplos de componentes actualizados

---

### 💡 **Para la próxima vez**

Cuando necesites agregar o cambiar imágenes:
1. Guarda las imágenes en la carpeta correcta: `src/webp/{categoria}/{nombre}.webp`
2. Actualiza `imageMetadata.ts` con el nuevo nombre
3. Los componentes usarán automáticamente los metadatos nuevos

---

## ❓ ¿Preguntas?

Si tienes dudas sobre:
- Cómo integrar en un componente específico
- Cómo probar las imágenes
- Cómo agregar más imágenes en el futuro

Solo pregúntame y te guío en el paso que necesites. ¡Toda la infraestructura está lista para usar! 🚀
