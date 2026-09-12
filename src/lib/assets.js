/**
 * Asset paths for the 3D hero and HTML sections.
 *
 * Plug in your own files here:
 *  1. Video loop  ->  public/flower-loop.mp4   (currently copied from flowers.mp4)
 *  2. Rose sprites -> public/textures/rose-01.png ... rose-14.png
 *                     Square PNGs with soft circular alpha work best (256-512px).
 *  3. Petal sprite -> public/textures/petal.png
 *  4. Mobile still -> public/textures/rose-wall-fallback.jpg
 */
export const VIDEO_SRC = "/flower-loop.mp4";

export const ROSE_TEXTURES = Array.from(
  { length: 14 },
  (_, i) => `/textures/rose-${String(i + 1).padStart(2, "0")}.png`,
);

export const PETAL_TEXTURE = "/textures/petal.png";

export const MOBILE_FALLBACK_STILL = "/textures/rose-wall-fallback.jpg";
