/**
 * Static SVG facade rendered as a dot grid.
 *
 * Serves three jobs, all non-decorative:
 *  1. dynamic() loading state while the Three.js chunk downloads
 *  2. no-WebGL fallback (the canvas never mounts)
 *  3. data-saver / SSR paint so the figure is never empty
 *
 * Built once at module load so it costs nothing per render.
 */

type Dot = { x: number; y: number; o: number };

const VIEW_W = 160;
const VIEW_H = 110;

const DOTS: Dot[] = (() => {
  const out: Dot[] = [];
  // facade extents inside the viewbox
  const left = 18, right = 142, top = 14, bottom = 96;
  const cols = 7, rows = 5;
  const cellW = (right - left) / cols;
  const cellH = (bottom - top) / rows;
  const winInset = 0.26; // fraction of cell that is glass (recessed, sparse)

  const inWindow = (x: number, y: number) => {
    if (x < left || x > right || y < top || y > bottom) return false;
    const cx = (x - left) / cellW;
    const cy = (y - top) / cellH;
    const fx = cx - Math.floor(cx);
    const fy = cy - Math.floor(cy);
    return fx > winInset && fx < 1 - winInset && fy > winInset && fy < 1 - winInset;
  };

  const step = 3.4;
  for (let y = top - 2; y <= bottom + 2; y += step) {
    for (let x = left - 2; x <= right + 2; x += step) {
      const win = inWindow(x, y);
      // skip most glass returns; keep wall returns
      if (win && Math.random() > 0.18) continue;
      // intensity brighter toward the top (height-graded, like the live scene)
      const heightT = 1 - (y - top) / (bottom - top);
      const base = win ? 0.16 : 0.32 + heightT * 0.34;
      out.push({ x, y, o: Math.min(0.85, base + Math.random() * 0.12) });
    }
  }
  // sparse ground returns in front of the facade
  for (let i = 0; i < 90; i++) {
    const x = 10 + Math.random() * 140;
    const y = bottom + 2 + Math.random() * 10;
    out.push({ x, y, o: 0.08 + Math.random() * 0.06 });
  }
  return out;
})();

export function FacadePoster({ className }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="xMidYMid meet"
      className={className}
      role="img"
      aria-label="Point-cloud scan of a building facade, rendered as graded survey returns"
    >
      {DOTS.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={0.7} fill="#b8e2ff" fillOpacity={d.o} />
      ))}
    </svg>
  );
}
