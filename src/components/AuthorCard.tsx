import React from 'react';
import { useTranslation } from '../i18n';
import PandaLogo from './PandaLogo';
import { RGB_ANIMATION_STYLES, RGB_TEXT_STYLES } from './pandaStyles';

/**
 * AuthorCard - Author presentation card for Nicolas Tobar.
 *
 * WHAT IT IS:
 *   Reusable, theme-agnostic component that renders a presentation card with:
 *     - The red panda (PandaLogo, w-16 h-16 by default, larger than the
 *       w-8 h-8 used in navbars) with the animated RGB gradient.
 *     - The author name to the right of the panda (extrabold h3) with the
 *       SAME animated RGB gradient applied as fill (background-clip: text) —
 *       panda, border and name animate IN SYNC because all three consume
 *       the same source of truth exported from `PandaLogo.tsx`.
 *     - Optionally a role/title under the name (medium span, opacity-70).
 *     - A bio paragraph below the name+role block (leading-relaxed p,
 *       opacity-80).
 *
 * I18N:
 *   The default `name`, `role` and `bio` are resolved from the `shared.author`
 *   namespace of the active dictionary (`dictionaries.ts`), so the card
 *   responds to the active language (EN/ES). The `name`/`role`/`bio` props
 *   remain available for themes that want to force their own text; when
 *   passed, they override i18n.
 *
 * HOW TO USE:
 *   <AuthorCard />                               → i18n defaults, translucent background.
 *   <AuthorCard className="mb-8" />              → extra spacing outside.
 *   <AuthorCard innerBg="bg-neutral-950"
 *               textColor="text-white" />        → for dark themes.
 *
 * DARK THEME DEFAULTS:
 *   The inner background defaults to `bg-white/20` (20% translucent white)
 *   and the text defaults to `text-white` — designed so the card sits on a
 *   dark footer (Nimbus case). The RGB border gradient runs along the
 *   perimeter, and the RGB name runs across the heading; bio and role stay
 *   white with opacity (0.80 / 0.70) for readable hierarchy over the
 *   translucent background.
 *
 * RGB BORDER (technique):
 *   CSS `border-color` does NOT support gradients, so the animated border is
 *   achieved with the "gradient-as-border" pattern: an outer wrapper with
 *   `p-[2px]` carrying the animated RGB gradient as background, and an inner
 *   content (innerBg) on top, leaving 2px of the wrapper visible as border.
 *
 *   CRITICAL — panda/border/name sync:
 *   The border and the name reuse EXACTLY the same `RGB_ANIMATION_STYLES`
 *   and `RGB_TEXT_STYLES` as the panda (same `RGB_GRADIENT`, same
 *   `panda-rgb-scroll` keyframe, same 4s linear infinite duration). That is
 *   why all three animate IN SYNC — not magic, just the same animation applied
 *   to three elements that share the single source of truth exported from
 *   `PandaLogo.tsx`. Duplicating the gradient here would break that sync.
 */
export interface AuthorCardProps {
  /** Author display name. Default: from i18n `shared.author.name`. */
  name?: string;
  /** One-line role/title under the name (optional, before the bio). Default: from i18n `shared.author.role`. */
  role?: string;
  /** Longer bio paragraph shown under the name+role. Default: from i18n `shared.author.bio`. */
  bio?: string;
  /** PandaLogo variant: 'text' (animated RGB, default) or 'icon' (solid red). */
  pandaVariant?: 'text' | 'icon';
  /** Tailwind classes controlling panda SIZE. Default 'w-16 h-16' (larger than the default w-8 h-8 of navbars). */
  pandaClassName?: string;
  /** Outer wrapper extra classes (margin, max-width, etc). Default ''. */
  className?: string;
  /**
   * BASE opaque layer between the RGB border and the translucent content.
   * Without this layer, the wrapper's RGB gradient would bleed through the
   * translucent `innerBg` and the background would look RGB. Default: 'bg-neutral-900'
   * (generic zinc-black, suitable for dark footers). Themes with a light
   * footer should pass their own color (e.g. 'bg-neutral-50').
   */
  innerBgBase?: string;
  /** Inner content background class. Default 'bg-white/20' (translucent white, designed for dark footers). */
  innerBg?: string;
  /** Inner text color class for role/bio (name uses RGB gradient). Default 'text-white'. */
  textColor?: string;
  /** Border radius of the OUTER card. Default 'rounded-2xl'. */
  rounded?: string;
}

/**
 * Shape of the `shared.author` namespace in `dictionaries.ts`.
 * Used as default for the `name`/`role`/`bio` props via i18n.
 */
interface AuthorI18n {
  name: string;
  role: string;
  bio: string;
}

/**
 * AuthorCard - React component (forwarded as default + named export).
 *
 * See the module doc comment for the RGB border technique, the sync with
 * the panda, and the i18n handling for bio/role/name.
 */
const AuthorCard: React.FC<AuthorCardProps> = (props) => {
  // Defaults via i18n — `shared.author` is resolved from the active language.
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

  // Outer wrapper: animated RGB gradient as a 2px background peeking out
  // as a border. `inline-block` so it wraps the content. The
  // `will-change-transform` hint already travels in RGB_ANIMATION_STYLES.
  const outerStyle: React.CSSProperties = {
    ...RGB_ANIMATION_STYLES,
  };

  // Inner content: plugs the center of the gradient and leaves 2px of
  // border. Same outer/inner `rounded` — with radius >= 1rem and 2px
  // padding the visual nesting is correct in practice.
  // BASE opaque layer: fully plugs the wrapper's RGB gradient, leaving only
  // the 2px padding visible as an RGB border. Without this layer, the
  // translucent content (bg-white/20) would let the gradient bleed through
  // and the background would look RGB instead of translucent white.
  // Default: bg-neutral-900 (generic zinc-black) — themes with a dark footer
  // can leave it as-is; light-footer themes pass their own color.
  const baseLayer = innerBgBase ?? 'bg-neutral-900';

  return (
    <div
      className={`inline-block p-[2px] ${rounded} ${className}`}
      style={outerStyle}
    >
      {/* Opaque base layer: plugs the wrapper's RGB gradient. */}
      <div className={`${baseLayer} ${rounded}`}>
        {/* Translucent content layer: bg-white/20 over the opaque base. */}
        <div className={`p-6 ${innerBg} ${rounded} ${textColor}`}>
          <div className="flex flex-col gap-4">
            {/* Top block: panda + (name / role) in a row */}
            <div className="flex items-center gap-4">
              <PandaLogo
                variant={pandaVariant}
                className={pandaClassName ?? 'w-16 h-16'}
              />
              <div className="flex flex-col">
                {/* Name with animated RGB gradient (background-clip: text).
                    `textColor` stays in the class as a semantic fallback,
                    but RGB_TEXT_STYLES makes the glyphs transparent and
                    fills them with the gradient — that is why the color is ignored. */}
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

            {/* Bottom block: bio under the name+role (own row) */}
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
