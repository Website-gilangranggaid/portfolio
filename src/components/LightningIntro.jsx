import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* =========================================================================
   4K CINEMATIC VOLUMETRIC SPACE LIGHTNING STORM
   - Multi-Bolt Realistic Space Storm (Banyak Petir Berkelanjutan)
   - Deep Space Glowing Blue-Purple Plasma (#2c67ed / #8b5cf6 / #ffffff)
   - Giant Rotating Exoplanet with Atmosphere & Planetary Ring
   - Volumetric Cosmic Clouds with Intra-Cloud Sheet Lightning Scatter
   - 8-Second Cinematic Duration & Space Loading Progress Bar
   ========================================================================= */

// 3D Perspective Projection with Camera Drift
function project3D(p, width, height, camera) {
  const cx = width / 2;
  const cy = height / 2;
  const rx = p.x - cx - camera.x;
  const ry = p.y - cy - camera.y;
  const rz = p.z - camera.z;

  const effZ = Math.max(20, rz + camera.fov);
  const scale = camera.fov / effZ;

  return {
    x: rx * scale + cx,
    y: ry * scale + cy,
    scale: Math.max(0.05, scale),
    z: rz,
    visible: rz + camera.fov > 10,
  };
}

// 3D Fractal Lightning Tree with High-Density Network Branching
function generateCosmicBolt(p1, p2, depth, maxDepth, branchProb, scale) {
  if (depth >= maxDepth) {
    return [{ p1: { ...p1 }, p2: { ...p2 }, depth }];
  }

  const mid = {
    x: (p1.x + p2.x) / 2 + (Math.random() - 0.5) * scale.x,
    y: (p1.y + p2.y) / 2 + (Math.random() - 0.5) * scale.y,
    z: (p1.z + p2.z) / 2 + (Math.random() - 0.5) * scale.z,
  };

  const newScale = {
    x: scale.x * 0.55,
    y: scale.y * 0.55,
    z: scale.z * 0.55,
  };

  let segments = [];
  segments.push(...generateCosmicBolt(p1, mid, depth + 1, maxDepth, branchProb, newScale));
  segments.push(...generateCosmicBolt(mid, p2, depth + 1, maxDepth, branchProb, newScale));

  // Dense network branch tendrils spreading in 3D
  if (Math.random() < branchProb && depth >= 1) {
    const angleX = (Math.random() - 0.5) * 2.8;
    const angleY = (Math.random() - 0.25) * 2.2;
    const angleZ = (Math.random() - 0.5) * 2.8;
    const branchLength = scale.y * (0.8 + Math.random() * 1.1);

    const branchEnd = {
      x: mid.x + angleX * scale.x * 1.8,
      y: mid.y + angleY * branchLength,
      z: mid.z + angleZ * scale.z * 1.8,
    };
    segments.push(
      ...generateCosmicBolt(mid, branchEnd, depth + 1, maxDepth - 1, branchProb * 0.6, newScale)
    );
  }

  return segments;
}

export default function LightningIntro({ onFinish }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [phase, setPhase] = useState('dark'); // dark -> active -> exit
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [flashColor, setFlashColor] = useState('transparent');

  // Exact 8-Second Sequence Timeline
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('active'), 300),
      setTimeout(() => setPhase('exit'), 5000),
      setTimeout(() => onFinish(), 5700),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onFinish]);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mx = (e.clientX - rect.left) / rect.width - 0.5;
    const my = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: mx * 100, y: my * 60 });
  }, []);

  // Main 4K Canvas Cosmic Storm Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let lastTime = performance.now();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Camera state
    const camera = {
      x: 0,
      y: 0,
      z: 0,
      fov: 520,
      targetX: 0,
      targetY: 0,
    };

    // ── 1. INITIALIZE 3D STARFIELD (280 STARS) ──
    const stars = [];
    for (let i = 0; i < 280; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 3400,
        y: (Math.random() - 0.5) * 2600,
        z: Math.random() * 2000 - 800,
        size: Math.random() * 1.8 + 0.6,
        color:
          Math.random() > 0.4
            ? '#ffffff'
            : Math.random() > 0.5
            ? '#a5b4fc'
            : Math.random() > 0.5
            ? '#93c5fd'
            : '#c084fc',
        twinkleSpeed: Math.random() * 2 + 1,
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }

    // ── 2. VOLUMETRIC COSMIC NEBULA CLOUDS ──
    const nebulae = [
      { rx: -0.28, ry: -0.22, rz: 220, radius: 520, color: 'rgba(88, 28, 135, ', ill: 0.16 },
      { rx: 0.32, ry: 0.18, rz: 360, radius: 580, color: 'rgba(30, 58, 138, ', ill: 0.2 },
      { rx: -0.16, ry: 0.36, rz: 160, radius: 460, color: 'rgba(124, 58, 237, ', ill: 0.14 },
      { rx: 0.22, ry: -0.32, rz: 420, radius: 540, color: 'rgba(14, 165, 233, ', ill: 0.18 },
      { rx: 0.0, ry: 0.0, rz: 120, radius: 640, color: 'rgba(79, 70, 229, ', ill: 0.22 },
    ];

    // ── 3. DARK STORM CLOUDS (Gumpalan Awan Hitam Sangat Menggelegar) ──
    // Relative positions that will be resolved per frame based on canvas size
    const stormCloudDefs = [
      { rx: 0.15, ry: 0.15, rw: 0.35, rh: 0.22, z: 50, darkness: 0.85 },
      { rx: 0.55, ry: 0.05, rw: 0.38, rh: 0.2, z: 30, darkness: 0.9 },
      { rx: 0.75, ry: 0.45, rw: 0.3, rh: 0.24, z: 45, darkness: 0.8 },
      { rx: 0.05, ry: 0.65, rw: 0.28, rh: 0.18, z: 70, darkness: 0.75 },
      { rx: 0.45, ry: 0.7, rw: 0.35, rh: 0.2, z: 60, darkness: 0.88 },
      { rx: 0.85, ry: 0.2, rw: 0.28, rh: 0.18, z: 55, darkness: 0.78 },
      { rx: 0.25, ry: 0.35, rw: 0.4, rh: 0.14, z: 85, darkness: 0.6 },
      { rx: 0.6, ry: 0.15, rw: 0.3, rh: 0.12, z: 80, darkness: 0.65 },
      { rx: 0.35, ry: 0.8, rw: 0.34, rh: 0.15, z: 90, darkness: 0.7 },
      { rx: 0.8, ry: 0.6, rw: 0.26, rh: 0.18, z: 75, darkness: 0.72 },
    ];

    // ── 4. DRAMATIC MOVING COSMIC DUST MOTES (100 PARTICLES) ──
    const cosmicDust = [];
    for (let i = 0; i < 100; i++) {
      cosmicDust.push({
        x: (Math.random() - 0.5) * 2200,
        y: (Math.random() - 0.5) * 1800,
        z: Math.random() * 1800 - 400,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45 - 0.25,
        vz: (Math.random() - 0.5) * 0.45 - 0.9,
        size: Math.random() * 2.8 + 1.0,
        color: Math.random() > 0.5 ? '#818cf8' : '#38bdf8',
        pulse: Math.random() * Math.PI * 2,
      });
    }

    // ── 4. MULTI-BOLT LIGHTNING STORM SYSTEM (BANYAK PETIR) ──
    const activeBolts = [];
    const sparkParticles = [];
    let planetRotation = 0;

    // Helper: Spawn a Realistic 3D Cosmic Lightning Bolt
    const spawnBolt = (opts = {}) => {
      const w = canvas.width;
      const h = canvas.height;

      const startX = opts.startX ?? w / 2 + (Math.random() - 0.5) * w * 0.95;
      const startY = opts.startY ?? -60;
      const startZ = opts.startZ ?? (Math.random() - 0.5) * 400;

      const endX = opts.endX ?? w / 2 + (Math.random() - 0.5) * w * 0.85;
      const endY = opts.endY ?? h + 60;
      const endZ = opts.endZ ?? (Math.random() - 0.5) * 400;

      const segments = generateCosmicBolt(
        { x: startX, y: startY, z: startZ },
        { x: endX, y: endY, z: endZ },
        0,
        opts.maxDepth || (opts.isMajor ? 7 : 6),
        opts.branchProb || 0.46,
        {
          x: opts.jitterX || (opts.isSpider ? 220 : 130),
          y: opts.jitterY || (opts.isSpider ? 60 : 100),
          z: opts.jitterZ || 130,
        }
      );

      activeBolts.push({
        segments,
        life: 0,
        maxLife: opts.duration || (opts.isMajor ? 1.4 : 0.8 + Math.random() * 0.7),
        power: opts.power || 1.1,
        isMajor: opts.isMajor || false,
        endX,
        endY,
        endZ,
      });

      // Illuminate nearby nebulae
      nebulae.forEach((n) => {
        n.ill = Math.min(1.0, n.ill + (opts.isMajor ? 0.6 : 0.25));
      });

      // High-energy plasma sparks
      const sparkCount = opts.isMajor ? 35 : 16;
      for (let i = 0; i < sparkCount; i++) {
        const speed = Math.random() * 8 + 3;
        const theta = Math.random() * Math.PI * 2;
        const phi = (Math.random() - 0.5) * Math.PI;
        sparkParticles.push({
          x: endX,
          y: endY,
          z: endZ,
          vx: Math.cos(theta) * Math.cos(phi) * speed,
          vy: Math.sin(phi) * speed - Math.random() * 4,
          vz: Math.sin(theta) * Math.cos(phi) * speed,
          life: 0,
          maxLife: 0.6 + Math.random() * 0.5,
          size: 1.6 + Math.random() * 2.5,
          color: Math.random() > 0.5 ? '#c084fc' : '#60a5fa',
        });
      }

      // Volumetric atmospheric flash
      if (opts.flash) {
        setFlashColor(
          Math.random() > 0.5
            ? 'radial-gradient(circle at center, rgba(124, 58, 237, 0.45) 0%, rgba(44, 103, 237, 0.25) 45%, transparent 75%)'
            : 'radial-gradient(circle at center, rgba(44, 103, 237, 0.48) 0%, rgba(147, 51, 234, 0.22) 45%, transparent 75%)'
        );
        setTimeout(() => setFlashColor('transparent'), 180);
      }
    };

    // Storm Cadence: Timers for continuous rapid strikes (Banyak Petir)
    let stormClock = 0;
    let nextStrikeTime = 0.2;

    // ── MAIN RENDER LOOP ──
    const render = (time) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const w = canvas.width;
      const h = canvas.height;

      // ── CAMERA DRIFT & PARALLAX ──
      camera.z += dt * 38;
      camera.targetX = mouseOffset.x + Math.sin(time * 0.0006) * 45;
      camera.targetY = mouseOffset.y + Math.cos(time * 0.0005) * 30;
      camera.x += (camera.targetX - camera.x) * 0.05;
      camera.y += (camera.targetY - camera.y) * 0.05;

      planetRotation += dt * 0.04;

      // ── CONTINUOUS RAPID REALISTIC STORM SPAWNER (BANYAK PETIR) ──
      stormClock += dt;
      if (stormClock > nextStrikeTime && stormClock < 7.8) {
        // Next strike interval is short (0.2s - 0.5s), creating an intense, real space storm!
        nextStrikeTime = stormClock + (0.22 + Math.random() * 0.35);

        const randType = Math.random();
        if (randType < 0.35) {
          // Colossal Sky Ripper
          spawnBolt({
            startX: w * 0.5 + (Math.random() - 0.5) * w * 0.8,
            startY: -50,
            endX: w * 0.5 + (Math.random() - 0.5) * w * 0.7,
            endY: h + 50,
            duration: 1.4 + Math.random() * 0.6,
            power: 1.3,
            isMajor: true,
            flash: true,
          });
        } else if (randType < 0.7) {
          // Spider Crawling Web Lightning (horizontal across nebulae)
          const startSide = Math.random() > 0.5 ? -40 : w + 40;
          spawnBolt({
            startX: startSide,
            startY: h * 0.2 + Math.random() * h * 0.6,
            endX: w / 2 + (Math.random() - 0.5) * w * 0.5,
            endY: h * 0.3 + Math.random() * h * 0.5,
            duration: 0.9 + Math.random() * 0.6,
            isSpider: true,
            power: 1.1,
            flash: Math.random() > 0.6,
          });
        } else {
          // Planetary Atmospheric Arc
          spawnBolt({
            startX: w * 0.75 + (Math.random() - 0.5) * 200,
            startY: h * 0.15 + (Math.random() - 0.5) * 150,
            endX: w * 0.6 + (Math.random() - 0.5) * 300,
            endY: h * 0.55 + Math.random() * 200,
            duration: 0.8 + Math.random() * 0.5,
            power: 1.0,
            flash: false,
          });
        }
      }

      // Base Deep Cosmic Vacuum (#02000f)
      ctx.fillStyle = '#02000f';
      ctx.fillRect(0, 0, w, h);

      // ── 1. VOLUMETRIC COSMIC NEBULA CLOUDS ──
      ctx.globalCompositeOperation = 'screen';
      nebulae.forEach((n) => {
        n.ill = Math.max(0.12, n.ill - dt * 0.7);

        const nx = w / 2 + n.rx * w;
        const ny = h / 2 + n.ry * h;
        const np = project3D({ x: nx, y: ny, z: n.rz }, w, h, camera);

        if (np.visible) {
          const grad = ctx.createRadialGradient(
            np.x,
            np.y,
            0,
            np.x,
            np.y,
            n.radius * np.scale
          );
          grad.addColorStop(0, `${n.color}${n.ill * 0.85})`);
          grad.addColorStop(0.4, `${n.color}${n.ill * 0.48})`);
          grad.addColorStop(0.75, `${n.color}${n.ill * 0.18})`);
          grad.addColorStop(1, 'transparent');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(np.x, np.y, n.radius * np.scale, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // ── 2b. DARK STORM CLOUDS (Gumpalan Awan Hitam Sangat Menggelegar) ──
      // Multi-layered dark clouds for dramatic thunderstorm atmosphere
      ctx.globalCompositeOperation = 'source-over';
      stormCloudDefs.forEach((c) => {
        const cx = w * c.rx + Math.sin(time * 0.0003 + c.z) * 20;
        const cy = h * c.ry + Math.cos(time * 0.0004 + c.z * 0.5) * 15;
        const cw = w * c.rw;
        const ch = h * c.rh;

        // Cloud shadow/dark mass
        const cloudGrad = ctx.createRadialGradient(
          cx, cy, 0,
          cx, cy, Math.max(cw, ch) * 0.5
        );
        cloudGrad.addColorStop(0, `rgba(5, 5, 15, ${c.darkness})`);
        cloudGrad.addColorStop(0.5, `rgba(8, 8, 20, ${c.darkness * 0.75})`);
        cloudGrad.addColorStop(0.85, `rgba(15, 15, 30, ${c.darkness * 0.35})`);
        cloudGrad.addColorStop(1, 'transparent');

        ctx.fillStyle = cloudGrad;
        ctx.beginPath();
        // Draw organic cloud shape with multiple overlapping ellipses
        ctx.ellipse(cx, cy, cw * 0.5, ch * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Add smaller cloud puffs for volumetric look
        for (let p = 0; p < 5; p++) {
          const px = cx + (Math.random() - 0.5) * cw * 0.6;
          const py = cy + (Math.random() - 0.5) * ch * 0.6;
          const pr = Math.max(10, (cw + ch) * 0.12 * (0.5 + Math.random() * 0.5));
          const pGrad = ctx.createRadialGradient(px, py, 0, px, py, pr);
          pGrad.addColorStop(0, `rgba(5, 5, 15, ${c.darkness * 0.6})`);
          pGrad.addColorStop(1, 'transparent');
          ctx.fillStyle = pGrad;
          ctx.beginPath();
          ctx.arc(px, py, pr, 0, Math.PI * 2);
          ctx.fill();
        }

        // Lightning illumination on cloud when storm is active
        if (Math.random() < 0.02) {
          // Brief flash through cloud
          const flashGrad = ctx.createRadialGradient(
            cx, cy, 0, cx, cy, Math.max(cw, ch) * 0.5
          );
          flashGrad.addColorStop(0, 'rgba(44, 103, 237, 0.15)');
          flashGrad.addColorStop(0.5, 'rgba(124, 58, 237, 0.08)');
          flashGrad.addColorStop(1, 'transparent');
          ctx.fillStyle = flashGrad;
          ctx.beginPath();
          ctx.ellipse(cx, cy, cw * 0.5, ch * 0.5, 0, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // ── 3. 3D TWINKLING STARFIELD ──
      ctx.globalCompositeOperation = 'source-over';
      stars.forEach((s) => {
        let sz = s.z - (camera.z % 2000);
        if (sz < -800) sz += 2000;

        const sp = project3D({ x: s.x + w / 2, y: s.y + h / 2, z: sz }, w, h, camera);
        if (sp.visible && sp.x >= -20 && sp.x <= w + 20 && sp.y >= -20 && sp.y <= h + 20) {
          const twinkle =
            0.5 + Math.sin(time * 0.003 * s.twinkleSpeed + s.twinkleOffset) * 0.45;
          ctx.fillStyle = s.color;
          ctx.globalAlpha = Math.max(0.15, twinkle * Math.min(1, sp.scale * 1.6));
          ctx.beginPath();
          ctx.arc(sp.x, sp.y, Math.max(0.6, s.size * sp.scale), 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1.0;

      // ── 3. GIANT ROTATING EXOPLANET IN THE DISTANCE ──
      const planetBaseRadius = Math.min(w, h) * 0.28;
      const planetX = w * 0.82;
      const planetY = h * 0.28;
      const planetZ = 450;
      const planetP = project3D({ x: planetX, y: planetY, z: planetZ }, w, h, camera);

      if (planetP.visible) {
        const pr = planetBaseRadius * planetP.scale;

        ctx.save();

        // Atmospheric Outer Blue-Purple Corona Glow
        const atmosGrad = ctx.createRadialGradient(
          planetP.x,
          planetP.y,
          pr * 0.85,
          planetP.x,
          planetP.y,
          pr * 1.25
        );
        atmosGrad.addColorStop(0, 'rgba(99, 102, 241, 0.45)');
        atmosGrad.addColorStop(0.4, 'rgba(44, 103, 237, 0.25)');
        atmosGrad.addColorStop(0.8, 'rgba(147, 51, 234, 0.12)');
        atmosGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = atmosGrad;
        ctx.beginPath();
        ctx.arc(planetP.x, planetP.y, pr * 1.25, 0, Math.PI * 2);
        ctx.fill();

        // Clip Planet Sphere
        ctx.beginPath();
        ctx.arc(planetP.x, planetP.y, pr, 0, Math.PI * 2);
        ctx.clip();

        // Base Surface
        const pSurf = ctx.createLinearGradient(
          planetP.x - pr,
          planetP.y - pr,
          planetP.x + pr,
          planetP.y + pr
        );
        pSurf.addColorStop(0, '#1e1b4b');
        pSurf.addColorStop(0.4, '#1e3a8a');
        pSurf.addColorStop(0.8, '#0f172a');
        ctx.fillStyle = pSurf;
        ctx.fillRect(planetP.x - pr, planetP.y - pr, pr * 2, pr * 2);

        // Rotating Storm Bands
        ctx.save();
        ctx.translate(planetP.x, planetP.y);
        ctx.rotate(-0.35);

        const bands = 14;
        for (let b = 0; b < bands; b++) {
          const by = ((b / bands) * 2 - 1) * pr;
          const bh = (pr * 2) / bands;
          const bandOffset = Math.sin(planetRotation + b * 0.5) * 15;

          const bandGrad = ctx.createLinearGradient(
            -pr + bandOffset,
            by,
            pr + bandOffset,
            by + bh
          );
          if (b % 3 === 0) {
            bandGrad.addColorStop(0, 'rgba(99, 102, 241, 0.32)');
            bandGrad.addColorStop(0.5, 'rgba(147, 51, 234, 0.28)');
            bandGrad.addColorStop(1, 'rgba(44, 103, 237, 0.3)');
          } else if (b % 3 === 1) {
            bandGrad.addColorStop(0, 'rgba(14, 165, 233, 0.24)');
            bandGrad.addColorStop(0.5, 'rgba(30, 58, 138, 0.35)');
            bandGrad.addColorStop(1, 'rgba(56, 189, 248, 0.22)');
          } else {
            bandGrad.addColorStop(0, 'rgba(15, 23, 42, 0.4)');
            bandGrad.addColorStop(1, 'rgba(2, 6, 23, 0.55)');
          }

          ctx.fillStyle = bandGrad;
          ctx.fillRect(-pr * 1.2, by, pr * 2.4, bh);
        }

        // Great Storm Vortex
        const vortexX = Math.sin(planetRotation * 1.5) * pr * 0.45;
        const vortexY = pr * 0.15;
        const vGrad = ctx.createRadialGradient(
          vortexX,
          vortexY,
          0,
          vortexX,
          vortexY,
          pr * 0.22
        );
        vGrad.addColorStop(0, 'rgba(216, 180, 254, 0.55)');
        vGrad.addColorStop(0.6, 'rgba(99, 102, 241, 0.35)');
        vGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = vGrad;
        ctx.beginPath();
        ctx.ellipse(vortexX, vortexY, pr * 0.24, pr * 0.14, 0.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        // Shadow Terminator
        const shadowGrad = ctx.createRadialGradient(
          planetP.x - pr * 0.4,
          planetP.y - pr * 0.4,
          pr * 0.3,
          planetP.x + pr * 0.2,
          planetP.y + pr * 0.2,
          pr * 1.15
        );
        shadowGrad.addColorStop(0, 'rgba(2, 6, 23, 0)');
        shadowGrad.addColorStop(0.5, 'rgba(2, 6, 23, 0.45)');
        shadowGrad.addColorStop(0.75, 'rgba(2, 6, 23, 0.88)');
        shadowGrad.addColorStop(1, 'rgba(2, 6, 23, 0.98)');
        ctx.fillStyle = shadowGrad;
        ctx.fillRect(planetP.x - pr, planetP.y - pr, pr * 2, pr * 2);

        // Rim Light
        const rimGrad = ctx.createRadialGradient(
          planetP.x - pr * 0.7,
          planetP.y - pr * 0.7,
          pr * 0.85,
          planetP.x,
          planetP.y,
          pr
        );
        rimGrad.addColorStop(0, 'transparent');
        rimGrad.addColorStop(0.85, 'rgba(56, 189, 248, 0.35)');
        rimGrad.addColorStop(0.97, 'rgba(168, 85, 247, 0.7)');
        rimGrad.addColorStop(1, 'rgba(255, 255, 255, 0.9)');
        ctx.fillStyle = rimGrad;
        ctx.fillRect(planetP.x - pr, planetP.y - pr, pr * 2, pr * 2);

        ctx.restore();

        // 3D Planetary Ring
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(
          planetP.x,
          planetP.y,
          pr * 1.75,
          pr * 0.35,
          -0.35,
          0,
          Math.PI * 2
        );
        ctx.strokeStyle = 'rgba(147, 197, 253, 0.22)';
        ctx.lineWidth = 3.5 * planetP.scale;
        ctx.shadowColor = '#818cf8';
        ctx.shadowBlur = 15;
        ctx.stroke();

        ctx.beginPath();
        ctx.ellipse(
          planetP.x,
          planetP.y,
          pr * 1.55,
          pr * 0.3,
          -0.35,
          0,
          Math.PI * 2
        );
        ctx.strokeStyle = 'rgba(192, 132, 252, 0.18)';
        ctx.lineWidth = 1.8 * planetP.scale;
        ctx.stroke();
        ctx.restore();
      }

      // ── 4. RENDER MULTIPLE REALISTIC COSMIC LIGHTNING BOLTS & JARINGAN CAHAYA ──
      ctx.globalCompositeOperation = 'lighter';

      for (let i = activeBolts.length - 1; i >= 0; i--) {
        const bolt = activeBolts[i];
        bolt.life += dt;
        const progress = bolt.life / bolt.maxLife;

        if (progress >= 1) {
          activeBolts.splice(i, 1);
          continue;
        }

        // Realistic Restrike Strobe & Fade
        let alpha = 1.0;
        if (progress < 0.08) {
          alpha = progress / 0.08;
        } else if (progress < 0.35) {
          alpha = 0.65 + Math.sin(progress * 60) * 0.35;
        } else if (progress < 0.8) {
          alpha = 0.8 + (Math.random() - 0.5) * 0.2;
        } else {
          alpha = (1 - (progress - 0.8) / 0.2) * 0.8;
        }
        alpha = Math.max(0, Math.min(1, alpha * bolt.power));

        if (alpha <= 0.01) continue;

        for (let s = 0; s < bolt.segments.length; s++) {
          const seg = bolt.segments[s];

          // Living space plasma wave + high-voltage micro-crackle
          const waveX = Math.sin(time * 0.004 + s * 0.2) * 3.5;
          const waveY = Math.cos(time * 0.004 + s * 0.2) * 3.5;

          const jX = (Math.random() - 0.5) * 2.2;
          const jY = (Math.random() - 0.5) * 2.2;
          const jZ = (Math.random() - 0.5) * 2.2;

          const ptA = project3D(
            { x: seg.p1.x + waveX + jX, y: seg.p1.y + waveY + jY, z: seg.p1.z + jZ },
            w,
            h,
            camera
          );
          const ptB = project3D(
            { x: seg.p2.x + waveX + jX, y: seg.p2.y + waveY + jY, z: seg.p2.z + jZ },
            w,
            h,
            camera
          );

          if (!ptA.visible || !ptB.visible) continue;

          const avgScale = (ptA.scale + ptB.scale) / 2;
          const depthAtten = Math.max(0.2, 1 - seg.depth * 0.1);

          ctx.save();

          // PASS 1: Broad Volumetric Violet-Purple Corona Aura (#8b5cf6 / #7c3aed)
          ctx.beginPath();
          ctx.moveTo(ptA.x, ptA.y);
          ctx.lineTo(ptB.x, ptB.y);
          ctx.lineWidth = 16 * avgScale * depthAtten;
          ctx.strokeStyle = `rgba(139, 92, 246, ${alpha * 0.45})`;
          ctx.shadowColor = '#8b5cf6';
          ctx.shadowBlur = 40 * avgScale;
          ctx.lineCap = 'round';
          ctx.stroke();

          // PASS 2: High-Voltage Electric Blue-Cyan Arc (#2c67ed / #38bdf8)
          ctx.beginPath();
          ctx.moveTo(ptA.x, ptA.y);
          ctx.lineTo(ptB.x, ptB.y);
          ctx.lineWidth = 5.5 * avgScale * depthAtten;
          ctx.strokeStyle = `rgba(44, 103, 237, ${alpha * 0.85})`;
          ctx.shadowColor = '#38bdf8';
          ctx.shadowBlur = 16 * avgScale;
          ctx.stroke();

          // PASS 3: Blinding Pure White Star Core (#ffffff)
          ctx.beginPath();
          ctx.moveTo(ptA.x, ptA.y);
          ctx.lineTo(ptB.x, ptB.y);
          ctx.lineWidth = 1.8 * avgScale * depthAtten;
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.98})`;
          ctx.shadowColor = '#ffffff';
          ctx.shadowBlur = 8 * avgScale;
          ctx.stroke();

          ctx.restore();
        }
      }

      // ── 5. RENDER 3D IONIZED SPARKS & EMBERS ──
      for (let i = sparkParticles.length - 1; i >= 0; i--) {
        const p = sparkParticles[i];
        p.life += dt;
        const progress = p.life / p.maxLife;
        if (progress >= 1) {
          sparkParticles.splice(i, 1);
          continue;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;
        p.vy += 0.12;
        p.vx *= 0.98;
        p.vz *= 0.98;

        const pp = project3D(p, w, h, camera);
        if (pp.visible) {
          const pAlpha = (1 - progress) * 0.85;
          ctx.save();
          ctx.beginPath();
          ctx.arc(pp.x, pp.y, Math.max(0.8, p.size * pp.scale), 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 12 * pp.scale;
          ctx.globalAlpha = pAlpha;
          ctx.fill();
          ctx.restore();
        }
      }

      // ── 6. RENDER DRAMATIC MOVING COSMIC DUST MOTES ──
      cosmicDust.forEach((d) => {
        d.x += d.vx;
        d.y += d.vy;
        d.z += d.vz;
        d.pulse += dt * 1.5;

        if (d.z < -camera.fov + 40) d.z += 1800;

        const dp = project3D(d, w, h, camera);
        if (dp.visible && dp.x >= 0 && dp.x <= w && dp.y >= 0 && dp.y <= h) {
          const dAlpha =
            (0.35 + Math.sin(d.pulse) * 0.25) * Math.min(1, dp.scale * 1.8);
          ctx.save();
          ctx.beginPath();
          ctx.arc(dp.x, dp.y, Math.max(0.6, d.size * dp.scale), 0, Math.PI * 2);
          ctx.fillStyle = d.color;
          ctx.shadowColor = d.color;
          ctx.shadowBlur = 10 * dp.scale;
          ctx.globalAlpha = dAlpha;
          ctx.fill();
          ctx.restore();
        }
      });

      // Reset blend mode
      ctx.globalCompositeOperation = 'source-over';

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [mouseOffset]);

  return (
    <AnimatePresence>
      {phase !== 'exit' ? (
        <motion.div
          ref={containerRef}
          key="4k-cosmic-storm-intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.08 }}
          transition={{ duration: 1.0, ease: 'easeInOut' }}
          onMouseMove={handleMouseMove}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden select-none bg-[#02000f]"
        >
          {/* Volumetric Lightning Sky Flash Overlay */}
          <div
            className="absolute inset-0 pointer-events-none transition-all duration-300"
            style={{
              background: flashColor,
            }}
          />

          {/* 4K CANVAS COSMIC STORM ENGINE */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1 }}
          />

          {/* 3D FLOATING TYPOGRAPHY & LOADING PROGRESS */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, z: -120 }}
            animate={
              phase !== 'dark'
                ? {
                    opacity: 1,
                    scale: 1,
                    z: 0,
                    rotateX: mouseOffset.y * -0.06,
                    rotateY: mouseOffset.x * 0.06,
                  }
                : { opacity: 0, scale: 0.85, z: -120 }
            }
            transition={{ duration: 1.0, ease: 'easeOut' }}
            className="relative z-10 text-center px-6 max-w-4xl"
            style={{
              transformStyle: 'preserve-3d',
              perspective: 1200,
            }}
          >
            {/* Top Electric Arc Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={phase !== 'dark' ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.1, delay: 0.1 }}
              className="h-[2px] w-48 md:w-80 mx-auto mb-6 rounded-full"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, #7c3aed 25%, #38bdf8 50%, #2c67ed 75%, transparent 100%)',
                boxShadow: '0 0 25px #2c67ed, 0 0 50px #8b5cf6',
              }}
            />

            {/* Big 3D Typography with Cyan-Purple Glow (Tulisan Cosmic di atas telah dihapus) */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-[family-name:var(--font-heading)] text-white tracking-tight leading-none select-none">
              <span
                className="block drop-shadow-[0_0_35px_rgba(44,103,237,0.8)]"
                style={{
                  textShadow:
                    '0 0 10px #ffffff, 0 0 25px #2c67ed, 0 0 50px #7c3aed, 0 0 90px #1e1b4b',
                }}
              >
                Welcome to My
              </span>
              <span
                className="block mt-2 text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    'linear-gradient(135deg, #ffffff 0%, #c084fc 25%, #38bdf8 60%, #2c67ed 100%)',
                  filter: 'drop-shadow(0 0 35px rgba(124, 58, 237, 0.85))',
                  WebkitTextStroke: '1px rgba(192, 132, 252, 0.3)',
                }}
              >
                Portfolio Website
              </span>
            </h1>

            {/* Bottom Electric Arc Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={phase !== 'dark' ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.1, delay: 0.3 }}
              className="h-[2px] w-48 md:w-80 mx-auto mt-6 rounded-full"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, #2c67ed 25%, #c084fc 50%, #38bdf8 75%, transparent 100%)',
                boxShadow: '0 0 25px #8b5cf6, 0 0 50px #2c67ed',
              }}
            />

              {/* ================= TULISAN LOADING & PROGRESS BAR 5 DETIK ================= */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={phase !== 'dark' ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-8 flex flex-col items-center gap-3"
            >
              {/* Tulisan Loading dengan animasi titik */}
              <div className="flex items-center gap-2 text-sm sm:text-base font-mono tracking-[0.28em] uppercase text-purple-200">
                <span className="text-accent font-bold">⚡</span>
                <span className="font-semibold">Loading</span>
                <span className="inline-flex tracking-normal font-bold text-accent">
                  <span className="animate-pulse">.</span>
                  <span className="animate-pulse" style={{ animationDelay: '0.2s' }}>.</span>
                  <span className="animate-pulse" style={{ animationDelay: '0.4s' }}>.</span>
                </span>
              </div>

              {/* Progress Bar - 0% -> 100% tepat 5 detik */}
              <div className="w-56 sm:w-84 h-2 rounded-full bg-white/10 overflow-hidden relative border border-purple-500/40 shadow-[0_0_25px_rgba(124,58,237,0.4)]">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={phase !== 'dark' ? { width: '100%' } : { width: '0%' }}
                  transition={{ duration: 5, ease: 'linear' }}
                  className="h-full rounded-full"
                  style={{
                    background:
                      'linear-gradient(90deg, #7c3aed 0%, #2c67ed 40%, #38bdf8 80%, #ffffff 100%)',
                    boxShadow: '0 0 18px #8b5cf6, 0 0 35px #2c67ed',
                  }}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Top & Bottom Plasma Border Arcs */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#8b5cf6] to-transparent shadow-[0_0_25px_#8b5cf6]" />
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#2c67ed] to-transparent shadow-[0_0_25px_#2c67ed]" />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
