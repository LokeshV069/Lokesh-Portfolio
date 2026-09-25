// Lightweight no-op hook to prevent any animation frame loops or mouse lag
export function useMouseParallax() {
  return { x: 0, y: 0, normX: 0, normY: 0, reducedMotion: false };
}
