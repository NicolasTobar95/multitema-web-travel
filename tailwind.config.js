/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Para textos pequeños
        display: ['"Bebas Neue"', 'sans-serif'], // ¡Nueva fuente para los títulos gigantes!
      },
      // Nimbus (retoque de Trevilo): centraliza los literales hex sueltos que
      // el doc de Trevilo reportaba repetidos en 5+ archivos. NO rompe los
      // colores existentes — solo agrega el namespace `nimbus.*`.
      colors: {
        nimbus: {
          accent: '#1ea0ff',      // cian-azulado: botones, tags, íconos, brillo del tilt
          secondary: '#3b82f6',   // blue-500: pestaña activa Hero, íconos buscador
          surface: '#FDFDFD',      // fondo base casi-blanco
          footerBg: '#18181B',    // zinc-black del Footer (única isla oscura)
          testimonialsBg: '#F5F7FA', // gris sutil de Testimonials
        },
      },
    },
  },
  plugins: [],
}