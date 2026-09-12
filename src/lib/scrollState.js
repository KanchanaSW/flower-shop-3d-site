/**
 * Mutable scene drivers. Written from the DOM (GSAP / pointer),
 * read inside R3F useFrame. Never put these in React state.
 */
export const scrollState = {
  progress: 0,
  mouseX: 0,
  mouseY: 0,
  reducedMotion: false,
};
