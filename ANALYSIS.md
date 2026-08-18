# Análisis de Arquitectura — travel-portfolio

> Documento generado el 2026-08-01. Fuente de verdad: código en `src/`.
> Nivel: **arquitectura general**. No reemplaza a `Proyecto.md` (que es el system prompt original); lo **complementa y corrige** donde hay discrepancias con el código real.

---

## 1. Resumen ejecutivo

SPA de portafolio de viajes con la particularidad de poder cambiar en tiempo real entre **4 diseños completamente distintos** (no son variantes de color: son layouts, tipografías y jerarquías visuales diferentes). La pieza central es un **theme switcher basado en View Transitions API** que produce una animación de "revelado circular" desde las coordenadas del click. No hay routing, no hay store, no hay librerías de UI: todo el estado vive en `App.tsx` y cada tema es un conjunto aislado de componentes.

---

## 2. Stack confirmado (versiones REALES del `package.json`)

| Capa | Tecnología | Versión |
|---|---|---|
| Runtime | React + ReactDOM | **^19.2.0** |
| Build | Vite + `@vitejs/plugin-react` | **^7.3.1** / **^5.1.1** |
| Tipos | TypeScript | **~5.9.3** |
| Estilos | Tailwind CSS + autoprefixer + postcss | **^3.4.19** (v3, **no v4**) |
| Lint | ESLint + typescript-eslint + react-hooks + react-refresh | **^9.39.1** / **^8.48.0** |
| Tipos Node | `@types/node` | **^24.10.1** |

> ⚠️ **Discrepancia con `Proyecto.md`:** ese documento dice "React 18". La realidad es **React 19.2**. Vite también está en majors nuevos (v7). Ambos docs conviven: usar este para versión, y `Proyecto.md` para las reglas de interacción/arquitectura.

### Dependencias NOTABLES por su ausencia

- **Cero librerías de UI** (MUI, Chakra, Radix, shadcn: ninguna). Todo es JSX + Tailwind.
- **Sin router** (no `react-router`, no `@tanstack/router`). Es single-view puro.
- **Sin store** (no Redux, Zustand, Jotai, Valtio). Estado 100% local.
- **Sin `framer-motion`** ni lib de animación: las transiciones usan View Transitions API nativa + Tailwind.

---

## 3. Estructura de `src/`

```
src/
├── App.tsx                       # RAÍZ: estado tema+idioma, switcher con View Transitions
├── App.css                       # (huérfano — NO se importa en ningún lado)
├── main.tsx                      # ReactDOM.createRoot + <StrictMode>
├── index.css                     # Tailwind base + @layer base con View Transitions
│
├── assets/
│   └── react.svg                 # (placeholder Vite, sin uso en temas)
│
├── components/
│   ├── BrandLogo.tsx             # SVG inline "NIMBUS TRAVEL" — SOLO lo usa Indotravi
│   └── layout/
│       └── FloatingControls.tsx  # UI fija: selector de tema + selector EN/ES
│
├── config/
│   ├── themeData.ts              # { Indotravi, PacificNW, Travelly, Trevilo }.heroImageUrl
│   ├── sharedImages.ts           # { destinations[4], narrative[3], panoramas[1], avatars[4] }
│   └── dictionaries.ts           # i18n EN/ES anidado por tema
│
├── utils/
│   └── preloader.ts              # Promise-based image preload (new Image)
│
└── themes/
    ├── PacificNW/
    │   ├── index.tsx
    │   └── components/{Navbar, Hero, Timeline, OlympicNational, Author, Footer}.tsx
    ├── Indotravi/
    │   ├── index.tsx
    │   └── components/{Navbar, Hero, Stats, Destinations, HowItWorks}.tsx   # sin Footer
    ├── Travelly/
    │   ├── index.tsx
    │   └── components/{Navbar, Hero, Services, RelaxingSpots, Discover, ClientReview, CTA, Footer}.tsx
    └── Trevilo/
        ├── index.tsx
        └── components/{Navbar, Hero, Companies, Destinations, Packages, Testimonials, Footer}.tsx
```

> **NO existen** `src/types/`, `src/hooks/`, `src/styles/`, ni `src/context/`. Todo el tipado y el contexto viven inline en `App.tsx`.

---

## 4. Mecanismos arquitectónicos críticos

### 4.1 Theme switcher (vive en `src/App.tsx`)

- **Estado:** `useState<Theme>('PacificNW')` — default PacificNW.
- **Tipo exportado:** `type Theme = 'PacificNW' | 'Indotravi' | 'Travelly' | 'Trevilo'` (exportado desde `App.tsx`).
- **API del handler:** `handleThemeChange(newTheme, event)` (no es hook, es función local).
- **Montaje:** render condicional simple, **uno por uno**:
  ```tsx
  {theme === 'PacificNW' && <PacificNWTheme />}
  {theme === 'Indotravi'  && <IndotraviTheme />}
  {theme === 'Travelly'   && <TravellyTheme />}
  {theme === 'Trevilo'    && <TreviloTheme />}
  ```
  → Solo el tema activo se monta. No hay keep-alive.

### 4.2 Orquestación del cambio (`handleThemeChange`, `App.tsx:52-80`)

1. Captura `event.clientX/Y` y los setea como `--circle-center-x/y` en `document.documentElement`.
2. Llama a `preloader(themeData[newTheme].heroImageUrl)` y **espera la Promesa**.
3. Si `document.startViewTransition` **no existe** → fallback con `setTheme(newTheme)` directo.
4. Si existe → `document.startViewTransition(() => { ReactDOM.flushSync(() => setTheme(newTheme)) })`.
   - El `flushSync` fuerza el commit sincrónico dentro del callback de la transición para que el snapshot del DOM nuevo sea coherente con el animation frame.
5. **No hay persistencia**: recargar pierde el tema elegido (vuelve a PacificNW).

### 4.3 View Transitions circulares (CSS en `src/index.css`)

Implementación clave en `@layer base`:

- `::view-transition-new(root)` anima con keyframe `reveal` que interpola `clip-path: circle(...)` desde `0%` a `150%`.
- Usa 2 CSS vars dinámicas: `--circle-origin`, `--circle-final` (derivadas de `--circle-center-x/y` seteadas inline desde JS en cada click).
- `::view-transition-old(root)` se anima con `none` → el tema viejo desaparece instantáneo, solo se anima el nuevo "barriendo" con el círculo. Esto produce la sensación de **wipe** en lugar de cross-fade.
- **Timing:** `1s cubic-bezier(0.23, 1, 0.32, 1)` (ease "expo out" agresivo).

### 4.4 Sistema i18n nativo (`src/config/dictionaries.ts`)

- **Estructura anidada:** `dictionaries[lang][ThemeName] = { nav, hero, ...secciones }`.
- **Idiomas:** EN y ES.
- **Contexto:** `LanguageContext` + hook `useTranslation()` (ambos definidos y exportados en `App.tsx`).
- **Función `t(key)`:** parsea claves con `.` y devuelve el valor anidado. **Si no encuentra la key, retorna la key literal** (sin warning) — esto es un gotcha: cualquier typo en `t('foo.bar')` se renderiza literalmente `"foo.bar"` en pantalla.
- **`controls.language`** y **`controls.theme`** viven en el nivel raíz del diccionario (consumidos por `FloatingControls.tsx`).
- **⚠️ Tipado débil:** `dictionaries: Record<string, any>` y `t: (key: string) => any`. No hay autocompletado ni safety. Mejora pendiente: tipar el árbol con mapped types.

### 4.5 Pre-carga de imágenes (`src/utils/preloader.ts`)

- Función pura de ~7 líneas: `new Image()` + handlers `onload`/`onerror` → `Promise<void>`.
- **Solo se usa para el hero del tema destino** (1 imagen), no para todo el bundle visual del tema.
- El objetivo es que cuando arranque la View Transition, el hero nuevo ya esté en caché del navegador y no haya flash blanco.

### 4.6 Tailwind config — **minimalista y engañoso**

`tailwind.config.js` no declara `darkMode` strategy ni extiende `theme.extend.colors` por tema.
- Solo se extiende `fontFamily`: `sans: Inter` y `display: "Bebas Neue"`.
- `content` escanea `./src/**/*.{js,ts,jsx,tsx}`.

> **Implicancia arquitectónica clave:** los 4 temas **NO se distinguen por tokens de Tailwind** (no hay `bg-pacificnw-500` ni `text-travelly-primary`). Toda la diferencia visual es **JSX/components distintos con clases hardcodeadas** dentro de cada `themes/[Tema]/components/*.tsx`. La palabra "tema" aquí significa **diseño completamente distinto**, no light/dark — esto induce a error.

### 4.7 Vite config — estándar

Solo `@vitejs/plugin-react()`. Sin aliases, sin plugins de assets, sin config de View Transitions (la provee el navegador nativamente, no Vite).

---

## 5. Componentes compartidos entre temas

| Recurso | Quién lo importa | Frecuencia de uso |
|---|---|---|
| `components/BrandLogo.tsx` | **Solo Indotravi** (`Navbar.tsx`) | 1 tema |
| `components/layout/FloatingControls.tsx` | Solo `App.tsx` | 1 (compartido por todos los temas indirectamente) |
| `config/themeData.ts` | Los 4 `Hero.tsx` + `Trevilo/Footer.tsx` | 5 usos |
| `config/sharedImages.ts` | 10 componentes distribuidos en los 4 temas | ver mapa abajo |
| `config/dictionaries.ts` | Vía `useTranslation()` en cualquier componente con `t(...)` | transversal |
| `utils/preloader.ts` | Solo `App.tsx` | 1 uso |

> **Observación crítica:** NO existe un set de "componentes atómicos" compartidos (Button, Card, Container, Section). El branding visual es 100% por-clase Tailwind dentro de cada tema, con **mucho copy-paste entre temas**. `BrandLogo` es un componente no-trivial (~60 líneas, SVG con paths complejos) que está **sub-utilizado** (solo 1 tema lo importa).

### Mapa de uso de `sharedImages` por tema

| Tema | Componentes que importan `sharedImages` |
|---|---|
| **PacificNW** | `Timeline`, `OlympicNational`, `Author`, `Footer` |
| **Indotravi** | `Destinations`, `HowItWorks` |
| **Travelly** | `RelaxingSpots`, `Discover`, `ClientReview`, `CTA` |
| **Trevilo** | `Destinations`, `Packages`, `Testimonials` |

Cada tema indexa por **número** (`sharedImages.narrative[1]`), no por nombre. Cambiar el orden de los arrays rompería todos los temas silenciosamente.

---

## 6. Los 4 temas en detalle

| Tema | # Componentes | ¿Tiene Footer? | Componentes | Personalidad visual |
|---|---|---|---|---|
| **PacificNW** | 6 | ✅ | Navbar, Hero, Timeline, OlympicNational, Author, Footer | Editorial oscuro, tipografía condensada gigante (Bebas Neue), layout en zig-zag (Timeline) |
| **Indotravi** | 5 | ❌ | Navbar, Hero, Stats, Destinations, HowItWorks | Corporativo limpio, esquinas redondeadas, buscador de cristal (`backdrop-blur`), grid asimétrico |
| **Travelly** | 8 | ✅ | Navbar, Hero, Services, RelaxingSpots, Discover, ClientReview, CTA, Footer | Inmersivo azul, tarjeta fotográfica gigante de fondo, buscador con pestañas, galería masonry ondulada |
| **Trevilo** | 7 | ✅ | Navbar, Hero, Companies, Destinations, Packages, Testimonials, Footer | Burbujeante, `rounded-[3rem]` exagerado, sombras suaves, componentes flotantes. **Único con `Companies`** y reusa el hero en el Footer |

> **Travelly** es el más completo (8 secciones). **Indotravi** es el único sin `Footer.tsx` y coherente con eso, no tiene `footer` en el diccionario (simetría EN↔ES preservada en todas las secciones presentes).

---

## 7. Observaciones, rarezas y deudas técnicas

1. **Versiones:** React 19 (no 18 en `Proyecto.md`), Vite 7, Tailwind v3.4.19 — todo en majors nuevos.
2. **`useTransition` muerto** en `App.tsx:33` — `startPendingTransition` se descarta con `[, ...]`. Dead code heredado.
3. **`useTranslation` mal tipado:** `t: (key: string) => any` pierde toda la jerarquía del diccionario. Sin autocompletado ni safety en keys. Mejora pendiente con mapped types.
4. **No existe `src/types/`** — todo el tipado vive inline en `App.tsx` o en archivos sueltos.
5. **No hay store ni routing** — el estado es local a `App.tsx` y el idioma+tema **se pierden al refrescar** (no hay `localStorage`). Posible mejora: persistir preferencia del usuario.
6. **`BrandLogo` sub-utilizado:** componente SVG de ~60 líneas que solo usa **un** tema.
7. **Tematización "dura":** los 4 temas son 4 conjuntos de componentes casi independientes. No comparten layout, cards ni botones. La única abstracción real es `sharedImages` + diccionarios + switcher de View Transitions.
8. **Sin `darkMode` en Tailwind:** "tema" significa diseño distinto, no light/dark — induce a error narrarlo como "themes".
9. **Diccionario retorna la key** si no encuentra traducción (gotcha de UX: cualquier `t('typo.x')` aparece literal en pantalla sin warning).
10. **`App.css` huérfano:** existe pero no se importa en `App.tsx` ni `main.tsx`.
11. **`assets/react.svg`** placeholder default de Vite, sin uso en temas.
12. **`public/images/`** existe pero está vacío — indica intención previa de imágenes locales que no se terminó.
13. **Indexación por número en `sharedImages`:** cambiar el orden de los arrays rompe los temas silenciosamente. Mejora sugerida: mapear por nombre clave en vez de índice.

---

## 8. Rutas absolutas clave (referencia futura)

### Configuración / entrada
- `G:\Documentos\PORTFOLIO\3-WEB-TRAVEL\repaldo 16-07-2026 (pre-opencode)\travel-portfolio\package.json`
- `G:\Documentos\PORTFOLIO\3-WEB-TRAVEL\repaldo 16-07-2026 (pre-opencode)\travel-portfolio\vite.config.ts`
- `G:\Documentos\PORTFOLIO\3-WEB-TRAVEL\repaldo 16-07-2026 (pre-opencode)\travel-portfolio\tailwind.config.js`
- `G:\Documentos\PORTFOLIO\3-WEB-TRAVEL\repaldo 16-07-2026 (pre-opencode)\travel-portfolio\postcss.config.js`
- `G:\Documentos\PORTFOLIO\3-WEB-TRAVEL\repaldo 16-07-2026 (pre-opencode)\travel-portfolio\index.html`

### Core de la app
- `G:\Documentos\PORTFOLIO\3-WEB-TRAVEL\repaldo 16-07-2026 (pre-opencode)\travel-portfolio\src\main.tsx`
- `G:\Documentos\PORTFOLIO\3-WEB-TRAVEL\repaldo 16-07-2026 (pre-opencode)\travel-portfolio\src\App.tsx` — **el switcher vive acá**
- `G:\Documentos\PORTFOLIO\3-WEB-TRAVEL\repaldo 16-07-2026 (pre-opencode)\travel-portfolio\src\index.css` — **CSS de View Transitions**

### Config (datos compartidos)
- `G:\Documentos\PORTFOLIO\3-WEB-TRAVEL\repaldo 16-07-2026 (pre-opencode)\travel-portfolio\src\config\themeData.ts`
- `G:\Documentos\PORTFOLIO\3-WEB-TRAVEL\repaldo 16-07-2026 (pre-opencode)\travel-portfolio\src\config\sharedImages.ts`
- `G:\Documentos\PORTFOLIO\3-WEB-TRAVEL\repaldo 16-07-2026 (pre-opencode)\travel-portfolio\src\config\dictionaries.ts`

### Utils
- `G:\Documentos\PORTFOLIO\3-WEB-TRAVEL\repaldo 16-07-2026 (pre-opencode)\travel-portfolio\src\utils\preloader.ts`

### Componentes compartidos
- `G:\Documentos\PORTFOLIO\3-WEB-TRAVEL\repaldo 16-07-2026 (pre-opencode)\travel-portfolio\src\components\layout\FloatingControls.tsx`
- `G:\Documentos\PORTFOLIO\3-WEB-TRAVEL\repaldo 16-07-2026 (pre-opencode)\travel-portfolio\src\components\BrandLogo.tsx`

### Entry points por tema
- `G:\Documentos\PORTFOLIO\3-WEB-TRAVEL\repaldo 16-07-2026 (pre-opencode)\travel-portfolio\src\themes\PacificNW\index.tsx`
- `G:\Documentos\PORTFOLIO\3-WEB-TRAVEL\repaldo 16-07-2026 (pre-opencode)\travel-portfolio\src\themes\Indotravi\index.tsx`
- `G:\Documentos\PORTFOLIO\3-WEB-TRAVEL\repaldo 16-07-2026 (pre-opencode)\travel-portfolio\src\themes\Travelly\index.tsx`
- `G:\Documentos\PORTFOLIO\3-WEB-TRAVEL\repaldo 16-07-2026 (pre-opencode)\travel-portfolio\src\themes\Trevilo\index.tsx`

### Documentación
- `G:\Documentos\PORTFOLIO\3-WEB-TRAVEL\repaldo 16-07-2026 (pre-opencode)\travel-portfolio\Proyecto.md` (system prompt original)
- `G:\Documentos\PORTFOLIO\3-WEB-TRAVEL\repaldo 16-07-2026 (pre-opencode)\travel-portfolio\README.md`
- `G:\Documentos\PORTFOLIO\3-WEB-TRAVEL\repaldo 16-07-2026 (pre-opencode)\travel-portfolio\ANALYSIS.md` (este documento)

---

## 9. Estado para futuras tareas

Este documento es el punto de partida para cualquier mejora o nueva feature. Antes de tocar código:

1. Revisar las **reglas de interacción** en `Proyecto.md` (rutas absolutas, Tailwind v3 nativo, mantener `t()` y `sharedImages`).
2. Respetar las **capas críticas**: `@layer base` con View Transitions, composición por tema en `src/themes/[Tema]/`.
3. Considerar las **deudas técnicas** listadas en la sección 7 — son oportunidades de mejora concreta.
