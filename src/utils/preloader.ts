/**
 * Hero image preloader — best-effort, never blocks the animation.
 *
 * Returns a Promise that **always resolves**. A 4s timeout caps network
 * requests so a slow or unreachable Unsplash URL can never stall the
 * theme-change transition. Failure is logged but does not throw — the
 * theme-change animation must run regardless of preload outcome.
 */
export const preloader = (url: string, timeoutMs = 4000): Promise<void> => {
  return new Promise((resolve) => {
    const img = new Image();
    const timer = window.setTimeout(() => {
      console.warn(`[preloader] timeout after ${timeoutMs}ms — proceeding without preload:`, url);
      resolve();
    }, timeoutMs);
    img.onload = () => {
      window.clearTimeout(timer);
      resolve();
    };
    img.onerror = (err) => {
      window.clearTimeout(timer);
      console.warn(`[preloader] failed — proceeding without preload:`, url, err);
      resolve();
    };
    img.src = url;
  });
};