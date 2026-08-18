# Travel Portfolio

A collection of four handcrafted travel website themes — **Waypoint**, **Aura**, **Aeria** and **Nimbus** — built as a single interactive showcase. Switch between themes at runtime with a click, complete with a smooth circular reveal transition.

Built with React 19, TypeScript, Vite and Tailwind CSS.

## ✨ Features

- **4 distinct themes** in one SPA, each with its own visual identity, layout and interactions
- **Runtime theme switching** with a circular clip-path reveal (plus native View Transitions when available)
- **Bilingual UI** — English and Spanish, switchable on the fly
- **Interactive details** per theme: Ken Burns hero typography, 3D float/tilt search cards, split-depth parallax, magnetic CTAs, scroll-driven route maps and more
- **Best-effort preloader** for warm hero-image caching during theme transitions

## 🧭 Themes

| Theme     | Vibe                              | Highlights                                        |
| --------- | --------------------------------- | ------------------------------------------------- |
| Waypoint  | Dark, cinematic, editorial        | Ken Burns letters, SVG route map, hover previews  |
| Aura      | Warm, amber, premium travel       | Interactive booking widget, sticky stats          |
| Aeria     | Light, purple, modern SaaS travel | Split-depth hologram, relaxing spots carousel     |
| Nimbus    | Sky-blue, clean, utility-first    | Floating magnetic search box, 3D tilt cards       |

## 🚀 Getting started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Type-check + production build
npm run build

# Lint
npm run lint
```

## 🧱 Project structure

```
src/
├── components/        # Shared components (PandaLogo, BrandLogo, ErrorBoundary, AuthorCard, ...)
├── config/            # Theme data, shared images, i18n dictionaries
├── hooks/             # Shared hooks (useInView)
├── themes/            # One folder per theme (Waypoint, Aura, Aeria, Nimbus)
│   └── <theme>/       # Theme entry, layout, components and sections
├── utils/             # Helpers (preloader)
├── i18n.tsx           # Translation context (en/es)
└── App.tsx            # Theme + language state and switching
```

## 🛠️ Stack

- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vite.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [ESLint](https://eslint.org)

## 📄 License

[MIT](./LICENSE) © 2026 Nicolas Tobar