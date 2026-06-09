"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { FacadePoster } from "./facade-poster";

/**
 * Building-facade LiDAR point cloud.
 *
 * This is the studio's actual deliverable, not an effect: a registered,
 * intensity-graded scan of a structure. Design decisions are all in service
 * of "this is what we hand you" reading as a survey viewport, not a portfolio
 * toy.
 *
 * Performance budget:
 *  - one BufferGeometry / one Points draw call (+ two thin LineSegments)
 *  - point count switched by viewport (60k desktop / 22k mobile)
 *  - DPR capped (2 desktop / 1.5 mobile)
 *  - RAF runs ONLY while in view (IntersectionObserver) and tab visible
 *  - prefers-reduced-motion: render a single static frame, no loop, no listeners
 *  - full teardown on unmount (dispose geom/mat/tex/renderer, lose context)
 *
 * Default-exported for next/dynamic({ ssr: false }) so `three` never enters
 * First Load JS.
 */

// --- facade geometry -------------------------------------------------------

const W = 16; // facade width  (world units ~ metres)
const H = 11; // facade height

function buildFacade(target: number) {
  const positions: number[] = [];
  const colors: number[] = [];

  const cDeep = new THREE.Color("#2d6285");
  const cBright = new THREE.Color("#cfeaff");
  const cWindow = new THREE.Color("#173e57");
  const cTrim = new THREE.Color("#d8f1ff");
  const cGround = new THREE.Color("#16304a");

  const cols = 7;
  const rows = 5;
  const marginX = 1.3;
  const marginTop = 1.5;
  const marginBottom = 1.7;
  const winW = 1.35;
  const winH = 1.5;

  const usableW = W - marginX * 2;
  const usableH = H - marginTop - marginBottom;
  const cellW = usableW / cols;
  const cellH = usableH / rows;

  const inWindow = (x: number, y: number) => {
    if (x < marginX || x > W - marginX) return false;
    if (y < marginBottom || y > H - marginTop) return false;
    const cx = (x - marginX) / cellW;
    const cy = (y - marginBottom) / cellH;
    const fx = (cx - Math.floor(cx)) * cellW;
    const fy = (cy - Math.floor(cy)) * cellH;
    const mx = (cellW - winW) / 2;
    const my = (cellH - winH) / 2;
    return fx > mx && fx < cellW - mx && fy > my && fy < cellH - my;
  };

  // floor-slab bands protrude slightly (string courses)
  const onSlab = (y: number) => {
    for (let k = 0; k <= rows; k++) {
      const sy = marginBottom + k * cellH - cellH * 0.04;
      if (Math.abs(y - sy) < 0.18) return true;
    }
    return false;
  };

  const facadeTarget = Math.floor(target * 0.82);
  const groundTarget = target - facadeTarget;

  let guard = facadeTarget * 6;
  while (positions.length / 3 < facadeTarget && guard-- > 0) {
    const x = Math.random() * W;
    const y = Math.random() * H;
    const win = inWindow(x, y);

    let z: number;
    let col: THREE.Color;

    if (win) {
      // glass returns: sparse and recessed
      if (Math.random() > 0.14) continue;
      z = -0.42 + (Math.random() - 0.5) * 0.12;
      col = cWindow.clone().multiplyScalar(0.55 + Math.random() * 0.4);
    } else {
      const trim = onSlab(y) || y > H - marginTop + 0.1;
      z = (trim ? 0.09 : 0) + (Math.random() - 0.5) * 0.022;
      const t = y / H;
      col = cDeep.clone().lerp(cBright, t);
      if (trim) col.lerp(cTrim, 0.5);
      col.multiplyScalar(0.66 + Math.random() * 0.34);
    }

    positions.push(x - W / 2, y, z);
    colors.push(col.r, col.g, col.b);
  }

  // ground returns in front of the facade, density falling off with distance
  guard = groundTarget * 8;
  while (positions.length / 3 < target && guard-- > 0) {
    const z = 0.5 + Math.random() * 10.5;
    if (Math.random() > 1 / (1 + z * 0.16)) continue;
    const x = -W / 2 - 2 + Math.random() * (W + 4);
    const y = -0.02 + (Math.random() - 0.5) * 0.04;
    const col = cGround.clone().multiplyScalar(0.5 + Math.random() * 0.5);
    positions.push(x, y, z);
    colors.push(col.r, col.g, col.b);
  }

  return {
    positions: new Float32Array(positions),
    colors: new Float32Array(colors),
  };
}

// extent ticks: short axis segments at each of the 8 bounding-box corners
function buildExtentTicks() {
  const min = new THREE.Vector3(-W / 2, 0, -0.45);
  const max = new THREE.Vector3(W / 2, H, 0.18);
  const L = 0.6;
  const pts: number[] = [];
  const corners = [
    [min.x, min.y, min.z], [max.x, min.y, min.z],
    [min.x, max.y, min.z], [max.x, max.y, min.z],
    [min.x, min.y, max.z], [max.x, min.y, max.z],
    [min.x, max.y, max.z], [max.x, max.y, max.z],
  ];
  for (const [cx, cy, cz] of corners) {
    const sx = cx === min.x ? 1 : -1;
    const sy = cy === min.y ? 1 : -1;
    const sz = cz === min.z ? 1 : -1;
    pts.push(cx, cy, cz, cx + sx * L, cy, cz);
    pts.push(cx, cy, cz, cx, cy + sy * L, cz);
    pts.push(cx, cy, cz, cx, cy, cz + sz * L);
  }
  return new Float32Array(pts);
}

// two ground "scan station" crosses — a quiet authenticity cue
function buildStations() {
  const pts: number[] = [];
  const stations = [
    [-3.5, 5.5],
    [4.2, 7.5],
  ];
  const s = 0.4;
  for (const [x, z] of stations) {
    pts.push(x - s, 0.01, z, x + s, 0.01, z);
    pts.push(x, 0.01, z - s, x, 0.01, z + s);
  }
  return new Float32Array(pts);
}

function makeDisc() {
  const size = 64;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.55, "rgba(255,255,255,0.85)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  ctx.fill();
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

function webglAvailable() {
  try {
    const canvas = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function PointCloud() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [unsupported, setUnsupported] = useState(false);
  const [interacted, setInteracted] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    if (!webglAvailable()) {
      setUnsupported(true);
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 900px)").matches;
    const pointTarget = isMobile ? 22000 : 60000;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);

    // --- scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x06090e, 20, 58);

    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 200);
    const target = new THREE.Vector3(0, H * 0.46, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.touchAction = "pan-y";

    // --- points
    const { positions, colors } = buildFacade(pointTarget);
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geom.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const disc = makeDisc();
    const mat = new THREE.PointsMaterial({
      size: isMobile ? 0.075 : 0.065,
      map: disc,
      vertexColors: true,
      transparent: true,
      alphaTest: 0.4,
      depthWrite: true,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(geom, mat);
    scene.add(points);

    // --- extent ticks + grid + stations
    const tickGeom = new THREE.BufferGeometry();
    tickGeom.setAttribute("position", new THREE.BufferAttribute(buildExtentTicks(), 3));
    const tickMat = new THREE.LineBasicMaterial({ color: 0xb8e2ff, transparent: true, opacity: 0.5 });
    const ticks = new THREE.LineSegments(tickGeom, tickMat);
    scene.add(ticks);

    const stationGeom = new THREE.BufferGeometry();
    stationGeom.setAttribute("position", new THREE.BufferAttribute(buildStations(), 3));
    const stationMat = new THREE.LineBasicMaterial({ color: 0xb8e2ff, transparent: true, opacity: 0.65 });
    const stations = new THREE.LineSegments(stationGeom, stationMat);
    scene.add(stations);

    const grid = new THREE.GridHelper(44, 44, 0x6aa9d8, 0x6aa9d8);
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = 0.1;
    scene.add(grid);

    // --- camera orbit state
    const baseTheta = -0.52; // ~ -30° azimuth: 3/4 view
    const basePhi = 1.33; // slightly above horizontal
    const R = 22;
    let manualTheta = 0;
    let manualPhi = 0;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    const clock = new THREE.Clock();

    const place = (theta: number, phi: number) => {
      const sp = Math.sin(phi);
      camera.position.set(
        target.x + R * sp * Math.sin(theta),
        target.y + R * Math.cos(phi),
        target.z + R * sp * Math.cos(theta)
      );
      camera.lookAt(target);
    };

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();

    const renderOnce = () => {
      place(baseTheta, basePhi);
      renderer.render(scene, camera);
    };

    // reduced motion: one static, well-composed frame. No loop, no input.
    if (reduce) {
      renderOnce();
      setReady(true);
      const ro = new ResizeObserver(() => {
        resize();
        renderOnce();
      });
      ro.observe(mount);
      return () => {
        ro.disconnect();
        geom.dispose();
        mat.dispose();
        disc.dispose();
        tickGeom.dispose();
        tickMat.dispose();
        stationGeom.dispose();
        stationMat.dispose();
        (grid.material as THREE.Material).dispose();
        grid.geometry.dispose();
        renderer.dispose();
        renderer.forceContextLoss();
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      };
    }

    // --- interaction
    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      setInteracted(true);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      manualTheta -= (e.clientX - lastX) * 0.005;
      manualPhi -= (e.clientY - lastY) * 0.005;
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const onPointerUp = () => {
      dragging = false;
    };
    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    // --- loop, gated by view + visibility
    let rafId = 0;
    let running = false;

    const frame = () => {
      const t = clock.getElapsedTime();
      const autoTheta = Math.sin(t * 0.16) * 0.2;
      if (!dragging) {
        manualTheta *= 0.94;
        manualPhi *= 0.94;
      }
      const theta = baseTheta + autoTheta + manualTheta;
      const phi = Math.max(0.8, Math.min(1.5, basePhi + manualPhi));
      place(theta, phi);
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running) return;
      running = true;
      clock.start();
      rafId = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(rafId);
    };

    // first paint, then fade in
    renderOnce();
    setReady(true);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !document.hidden) start();
        else stop();
      },
      { threshold: 0.05 }
    );
    io.observe(mount);

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (mount.getBoundingClientRect().top < window.innerHeight) start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      geom.dispose();
      mat.dispose();
      disc.dispose();
      tickGeom.dispose();
      tickMat.dispose();
      stationGeom.dispose();
      stationMat.dispose();
      (grid.material as THREE.Material).dispose();
      grid.geometry.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (unsupported) {
    return <FacadePoster className="absolute inset-0 h-full w-full opacity-60" />;
  }

  return (
    <>
      {/* poster sits behind until the first WebGL frame paints */}
      <FacadePoster
        className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${
          ready ? "opacity-0" : "opacity-60"
        }`}
      />
      <div
        ref={mountRef}
        aria-hidden
        className={`absolute inset-0 transition-opacity duration-700 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* HUD — supplemental readout, like a registration viewport */}
      <div className="pointer-events-none absolute inset-0">
        <span className="mono absolute left-4 top-4 text-[9px] uppercase tracking-[0.25em] text-[color:var(--color-ink-dim)]">
          Facade scan · E57
        </span>
        <span className="mono absolute bottom-4 left-4 text-[9px] uppercase tracking-[0.25em] text-[color:var(--color-ink-mute)]">
          N 6.6018 · E 0.4708
        </span>
        <span
          className={`mono absolute bottom-4 right-4 text-[9px] uppercase tracking-[0.25em] text-[color:var(--color-ink-mute)] transition-opacity duration-500 ${
            interacted ? "opacity-0" : "opacity-100"
          }`}
        >
          Drag to orbit
        </span>
      </div>
    </>
  );
}
