import React from 'react';
import { useTranslation } from '../i18n';
import PandaLogo, { RGB_ANIMATION_STYLES, RGB_TEXT_STYLES } from './PandaLogo';

/**
 * AuthorCard - Tarjeta de presentación del autor Nicolás Tobar.
 *
 * QUÉ ES:
 *   Componente reusable, agnóstico al tema, que muestra una tarjeta de
 *   presentación con:
 *     - El panda rojo (PandaLogo, por defecto w-16 h-16, más grande que el
 *       w-8 h-8 usado en navbars) con el gradiente RGB animado.
 *     - El nombre del autor a la derecha del panda (h3 extrabold) con el
 *       MISMO gradiente RGB animado aplicado como relleno (background-clip:
 *       text) — panda, borde y nombre animan EN SINCRONÍA porque los tres
 *       consumen la misma source of truth exportada desde `PandaLogo.tsx`.
 *     - Opcionalmente un rol/título bajo el nombre (span medium opacity-70).
 *     - Un párrafo de bio debajo del bloque nombre+rol (p leading-relaxed
 *       opacity-80).
 *
 * I18N:
 *   El `name`, `role` y `bio` por defecto se resuelven desde el namespace
 *   `shared.author` del diccionario activo (`dictionaries.ts`), de modo que
 *   la tarjeta responde al idioma (EN/ES). Los props `name`/`role`/`bio`
 *   siguen disponibles por si un tema quiere forzar texto propio; si se
 *   pasan, pisan al i18n.
 *
 * CÓMO SE USA:
 *   <AuthorCard />                               → defaults i18n, fondo translúcido.
 *   <AuthorCard className="mb-8" />              → spacing extra fuera.
 *   <AuthorCard innerBg="bg-neutral-950"
 *               textColor="text-white" />        → para temas oscuros.
 *
 * DEFAULTS DE TEMA OSCURO:
 *   El fondo interno por defecto es `bg-white/20` (blanco translúcido al 20%)
 *   y el texto por defecto es `text-white` — pensados para que la tarjeta
 *   se asiente sobre un footer oscuro (caso Nimbus). El gradiente RGB del
 *   borde recorre el perímetro, y el nombre en RGB recorre el titular;
 *   la bio y el rol queda en blanco con opacidad (0.80 / 0.70) para
 *   jerarquía legible sobre el fondo translúcido.
 *
 * BORDE RGB (técnica):
 *   CSS `border-color` NO soporta gradientes, así que el borde animado se
 *   logra con el patrón "gradient-as-border": un wrapper externo con
 *   `p-[2px]` que lleva el gradiente RGB animado como fondo, y un contenido
 *   interno (innerBg) encima, dejando 2px visibles del wrapper a modo
 *   de borde.
 *
 *   CRÍTICO — sincronía panda/borde/nombre:
 *   El borde y el nombre reutilizan EXACTAMENTE los mismos `RGB_ANIMATION_STYLES`
 *   y `RGB_TEXT_STYLES` que el panda (mismo `RGB_GRADIENT`, mismo keyframe
 *   `panda-rgb-scroll`, misma duración 4s linear infinite). Por eso los tres
 *   se animan EN SINCRONÍA — no es magia, es la misma animación aplicada a
 *   tres elementos que comparten la única source of truth exportada desde
 *   `PandaLogo.tsx`. Duplicar el gradiente aquí rompería esa sincronía.
 */
export interface AuthorCardProps {
  /** Author display name. Default: del i18n `shared.author.name`. */
  name?: string;
  /** One-line role/title under the name (optional, before the bio). Default: del i18n `shared.author.role`. */
  role?: string;
  /** Longer bio paragraph shown under the name+role. Default: del i18n `shared.author.bio`. */
  bio?: string;
  /** PandaLogo variant: 'text' (animated RGB, default) or 'icon' (solid red). */
  pandaVariant?: 'text' | 'icon';
  /** Tailwind classes controlling panda SIZE. Default 'w-16 h-16' (larger than the default w-8 h-8 of navbars). */
  pandaClassName?: string;
  /** Outer wrapper extra classes (margin, max-width, etc). Default ''. */
  className?: string;
  /**
   * Capa BASE opaca entre el borde RGB y el contenido translúcido.
   * Sin esta capa, el gradiente RGB del wrapper se filtraría a través del
   * `innerBg` translúcido y el fondo se vería RGB. Default: 'bg-neutral-900'
   * (zinc-black genérico apto para footers oscuros). Los temas con footer
   * claro deberían pasar su color (p.ej. 'bg-neutral-50').
   */
  innerBgBase?: string;
  /** Inner content background class. Default 'bg-white/20' (blanco translúcido, pensado para footer oscuro). */
  innerBg?: string;
  /** Inner text color class for role/bio (name uses RGB gradient). Default 'text-white'. */
  textColor?: string;
  /** Border radius of the OUTER card. Default 'rounded-2xl'. */
  rounded?: string;
}

/**
 * Forma del namespace `shared.author` en `dictionaries.ts`.
 * Se usa como default de los props `name`/`role`/`bio` vía i18n.
 */
interface AuthorI18n {
  name: string;
  role: string;
  bio: string;
}

/**
 * AuthorCard - React component (forwarded as default + named export).
 *
 * Ver doc comment del módulo para la técnica del borde RGB, la sincronía
 * con el panda, y el manejo de i18n para bio/role/name.
 */
const AuthorCard: React.FC<AuthorCardProps> = (props) => {
  // Defaults via i18n — `shared.author` se resuelve según el idioma activo.
  const { t } = useTranslation();
  const authorI18n = t('shared.author') as AuthorI18n;

  const {
    name = authorI18n.name,
    role = authorI18n.role,
    bio = authorI18n.bio,
    pandaVariant = 'text',
    pandaClassName,
    className = '',
    innerBgBase,
    innerBg = 'bg-white/20',
    textColor = 'text-white',
    rounded = 'rounded-2xl',
  } = props;

  // Wrapper externo: gradiente RGB animado como fondo de 2px que asoma
  // como borde. `inline-block` para que envuelva al contenido. El hint
  // `will-change-transform` viaja en RGB_ANIMATION_STYLES ya.
  const outerStyle: React.CSSProperties = {
    ...RGB_ANIMATION_STYLES,
  };

  // Contenido interno: tapona el centro del gradiente y deja 2px de
  // borde. Mismo `rounded` externo/interno — con radio >= 1rem y padding
  // de 2px el anidamiento visual es correcto en la práctica.
  // Capa BASE opaca: tapona por completo el gradiente RGB del wrapper
  // externo, dejando visibles solo los 2px de padding como borde RGB. Sin
  // esta capa, el contenido translúcido (bg-white/20) dejaría filtrar el
  // gradiente y el fondo se vería RGB en vez de blanco translúcido.
  // Default: bg-neutral-900 (zinc-black genérico) — los temas con footer
  // oscuro lo pueden dejar así; los de footer claro pasan su propio color.
  const baseLayer = innerBgBase ?? 'bg-neutral-900';

  return (
    <div
      className={`inline-block p-[2px] ${rounded} ${className}`}
      style={outerStyle}
    >
      {/* Capa opaca base: tappa el gradiente RGB del wrapper. */}
      <div className={`${baseLayer} ${rounded}`}>
        {/* Capa translúcida de contenido: bg-white/20 sobre la base opaca. */}
        <div className={`p-6 ${innerBg} ${rounded} ${textColor}`}>
          <div className="flex flex-col gap-4">
            {/* Bloque superior: panda + (nombre / rol) en fila */}
            <div className="flex items-center gap-4">
              <PandaLogo
                variant={pandaVariant}
                className={pandaClassName ?? 'w-16 h-16'}
              />
              <div className="flex flex-col">
                {/* Nombre con gradiente RGB animado (background-clip: text).
                    `textColor` queda en la clase como fallback semántico,
                    pero RGB_TEXT_STYLES vuelve los glifos transparentes y los
                    rellena con el gradiente — por eso el color se ignora. */}
                <h3
                  className={`text-xl font-extrabold tracking-tight leading-tight ${textColor}`}
                  style={RGB_TEXT_STYLES}
                >
                  {name}
                </h3>
                {role ? (
                  <span className="text-sm font-medium opacity-70">{role}</span>
                ) : null}
              </div>
            </div>

            {/* Bloque inferior: bio debajo del nombre+rol (propia fila) */}
            {bio ? (
              <p className="text-sm leading-relaxed opacity-80">{bio}</p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;
export { AuthorCard };
