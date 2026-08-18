# Cleanup Pendiente — Travel Portfolio

> Checklist de mejoras MEDIUM/LOW antes de hacer el repo público en GitHub.
> Generado el 2026-08-17 tras auditoría pre-publicación.

---

## 🟡 MEDIUM — Calidad de código y accesibilidad

### Lint errors (13) — `npm run lint`
- [ ] `src/App.tsx:22,24` — `any` en el tipo de retorno de `t` (usar tipo de diccionario o `unknown`)
- [ ] `src/components/ErrorBoundary.tsx:7,13,26` — `any` (tipar error/state)
- [ ] `src/i18n.tsx:8` — `any`
- [ ] `src/components/PandaLogo.tsx:50,62` — react-refresh: constantes exportadas junto a componentes (mover `RGB_*` a archivo aparte)
- [ ] `src/themes/Nimbus/components/Destinations.tsx:82` — `setState` sincrónico dentro de effect (cascading render)
- [ ] `src/themes/Nimbus/components/Destinations.tsx:129` — `_e` sin usar en `handleScrollEnd`

### Anchors muertos `<a href="#" onClick={e => e.preventDefault()}>`
Todos los navbars/footers de los 4 temas usan links que no navegan. Convertir a `<button>` o a anclas reales de la página.
- [ ] `src/themes/Waypoint/components/Navbar.tsx:16-18`
- [ ] `src/themes/Waypoint/components/Footer.tsx:148`
- [ ] `src/themes/Aura/components/Navbar.tsx:15,21-24,49-52`
- [ ] `src/themes/Aura/components/Footer.tsx:40`
- [ ] `src/themes/Nimbus/components/Navbar.tsx:40-48`
- [ ] `src/themes/Nimbus/components/Footer.tsx:73`
- [ ] `src/themes/Aeria/components/Navbar.tsx:18-25`
- [ ] `src/themes/Aeria/components/Footer.tsx:49`

### Accesibilidad
- [ ] `<html lang="en">` fijo en `index.html` — debería ser dinámico según idioma activo
- [ ] `<title>travel-portfolio</title>` genérico — poner nombre del proyecto + meta description
- [ ] Favicon sigue siendo `public/vite.svg` de la plantilla Vite
- [ ] Cero lazy loading en imágenes (`<img loading="lazy">` no aparece en ninguna)
- [ ] Alts genéricos: `alt="User"` (Aeria/ClientReview.tsx:71), `alt="Client"` (:100), `alt="Traveler"` (Aura/HowItWorks.tsx:39), `alt="Explorer"` (Nimbus/Packages.tsx:50)
- [ ] `alt=""` en tarjetas con contenido: `Aura/TourPackages.tsx:122`, `Aura/Testimonials.tsx:45`, `Waypoint/Footer.tsx:83`, `Waypoint/RouteMap.tsx:113`

### Duplicación
- [ ] `useInView.ts` repetido 3x: `Aeria/hooks`, `Aura/hooks`, `Waypoint/hooks` — extraer a `src/hooks/useInView.ts`
- [ ] `BrandLogo.tsx` repetido 3x: `src/components`, `Nimbus/components`, `Waypoint/components`

### Restos de plantilla Vite
- [ ] `src/assets/react.svg` sin usar
- [ ] `public/vite.svg` favicon genérico

---

## 🔵 LOW / INFO

- [ ] `.env.example` referencia `VITE_API_URL`, `VITE_GA_TRACKING_ID`, `VITE_SENTRY_DSN` que no se usan en el proyecto — limpiar o justificar
- [ ] TODO pendiente: `src/themes/Nimbus/components/Hero.tsx:24`
- [ ] Sin config de Prettier (`.prettierrc` + script `format`) — el código tiene estilos mezclados
- [ ] Comentarios en español mezclados con inglés en el código — decidir idioma único para comentarios
- [ ] `console.warn` en `src/utils/preloader.ts:13,22` — intencionales (best-effort), revisar si molestan en consola
- [ ] `console.error` en `src/components/ErrorBoundary.tsx:27` — correcto para error boundary, mantener

---

## 🟠 HIGH pendientes de decisión (no gitignoreables)

- [ ] **README.md** — sigue siendo la plantilla de Vite, hay que escribir uno real (descripción, stack, temas, setup, creditos)
- [ ] **LICENSE** — repo público sin licencia = "all rights reserved"; decidir MIT (recomendado para portfolio)
- [ ] Descripción/metadata en `package.json` (name, description, author, repository)

---

## Notas

- `src/docs/` (PandaSvg.astro, Red-Panda-SVG.svg, RgbLoopTechnique.astro) se referencian en comentarios de código (`PandaLogo.tsx`, `index.css`) — decidir si se conservan como docs públicos o se mueven a gitignore.
- `temas-plan/`, `Proyecto.md`, `ANALYSIS.md`, `UPGRADE_GUIDE.md`, `.atl/`, `src/assets/images/`, `1`, `cambie` ya están en `.gitignore` (2026-08-17).