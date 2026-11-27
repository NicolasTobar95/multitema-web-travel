/**
 * Datos del autor para el footer compartido.
 * Pendiente: reemplazar los valores vacíos por los reales (ver CLAUDE.md).
 * Un enlace vacío se muestra igual, pero apunta a #contacto.
 */
export const AUTHOR = {
  name: 'Nicolás Tobar',
  initials: 'NT',
  role: 'Full-Stack Software Engineer',
  bio: 'Enfocado en construir ecosistemas digitales robustos, eficientes y centrados en el usuario. Especializado en desarrollo asistido por IA y agéntico: flujos de agentes autónomos con Skills, MCP, Spec-Driven Development y herramientas como Claude Code, OpenCode y Cursor.',
  /** Ruta de la foto dentro de src/assets (vacío = se muestran las iniciales) */
  photo: '',
  email: '',
  github: '',
  linkedin: '',
  portfolio: '',
  /** Contadores de ejemplo */
  likes: 1124,
  comments: 35,
} as const;
