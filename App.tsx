import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Zap, ArrowUp } from 'lucide-react'

// 🟢 BRAND ASSET IMPORT: Change path if dropped directly inside your public/ folder
import logoAsset from './assets/dynamix-logo.png'

// 🟢 BOOT SOUND: drop your PS2 startup audio file into src/components (or src/assets)
// and point this import at it — .mp3/.wav/.ogg all work fine with this setup.
import bootSound from './assets/ps2-boot.mp3'

// Master Event Data Matrix
const DX_2026_EVENTS = [
  { id: 1, title: "Outcode Sr", mode: "Hybrid", venue: "Jr CS lab", category: "Coding", desc: "The premier senior programming layout tier tracking core architecture, algorithmic speeds, and system parsing optimization nodes." },
  { id: 2, title: "Quest Sphere", mode: "Offline", venue: "Sr CS lab", category: "Quiz", desc: "A high-intensity technical quiz domain evaluating historical, structural, and emerging paradigms across modern global tech fields." },
  { id: 3, title: "Joy n stick", mode: "Offline", venue: "Sr CS lab", category: "Gaming", desc: "Symmetric tactical arena reflexes. Head-to-head performance match tiers hosted across precision high-refresh client frameworks." },
  { id: 4, title: "Overthink", mode: "Hybrid", venue: "Hall", category: "Cryptic", desc: "An asymmetric cryptography and deep pattern-matching challenge mapping system logic and hidden data tracks." },
  { id: 5, title: "Crossword", mode: "Offline", venue: "Hall", category: "Quiz", desc: "High-contrast technical grid word-play parsing system vocabulary, computing lore, and technological terminology." },
  { id: 6, title: "Council 8", mode: "Hybrid", venue: "Jr library", category: "MUN/Tech", desc: "A tech-policy simulation parsing emerging regulations, digital sovereignty, and ethical development protocols." },
  { id: 7, title: "Cryptix (Inspect element)", mode: "Hybrid", venue: "School", category: "Web", desc: "A web security and client-side reverse-engineering sprint breaking down compilation targets and source vulnerabilities." },
  { id: 8, title: "Pitch a Thon", mode: "Hybrid", venue: "—", category: "Startup", desc: "Founder framework pitching evaluating information architecture, unit scaling, and monetization paths for target automation pipelines." },
  { id: 9, title: "Surprise", mode: "Offline", venue: "Physics lab", category: "Hardware", desc: "Unannounced hardware parameters. Competitors unbox undisclosed modules to solve physical engineering logic tasks on site." },
  { id: 10, title: "AesthetiX", mode: "Hybrid", venue: "—", category: "Design", desc: "Digital design parameters tracking dark-theme styling layers, raw graphic layout rendering, and glassmorphism interface builds." },
  { id: 11, title: "Click noise", mode: "Hybrid", venue: "School", category: "Photography", desc: "Digital layout asset capture evaluating lighting frameworks, high-contrast framing, and technical post-processing workflows." },
  { id: 12, title: "Cliptica", mode: "Online", venue: "Discord", category: "Video", desc: "Video montage design tracking frame velocity alignment, tracking layers, and thematic audio-visual integration targets." },
  { id: 13, title: "ShootIt", mode: "Hybrid", venue: "School", category: "Video", desc: "On-site production running from live dynamic cinematography guidelines straight to finished media delivery blocks." },
  { id: 14, title: "Snapslide", mode: "Online", venue: "Discord", category: "Design", desc: "Rapid prototype deck creation tracking structural storytelling layouts and clean presentation typography parameters." },
  { id: 15, title: "Pixel Pop", mode: "Online", venue: "Discord", category: "Art", desc: "Vector canvas rendering evaluating digital line work, high-saturation accents, and raw creative conceptualization targets." },
  { id: 16, title: "LumoLuxe", mode: "Online", venue: "Discord", category: "Design", desc: "High-contrast render layout mechanics exploring simulated lighting behaviors and conceptual material maps." },
  { id: 17, title: "Robosoccer", mode: "Offline", venue: "Badminton", category: "Robotics", desc: "Custom hardware mechanical locomotion loops contesting autonomous and real-time kinetic navigation controls." },
  { id: 18, title: "Robowars", mode: "Offline", venue: "Badminton", category: "Robotics", desc: "High-impact custom combat robotics engineering loops built for kinetic durability and active structural disruption vectors." },
  { id: 19, title: "WebD", mode: "Online", venue: "—", category: "Web", desc: "Full-stack client architecture design mapping custom layouts, reactive interface flows, and data layer bridges." }
];

// ──────────────────────────────────────────────────────────────
// 🎯 LOGO TARGET-POINT SAMPLER
// Renders the "ワメ 2026" mark to an offscreen canvas and samples the lit
// pixels into point clouds. These points become the destination each matrix
// character migrates toward, so the rain physically assembles the logo.
// ──────────────────────────────────────────────────────────────
type LogoPoint = { x: number; y: number };

function generateLogoPoints(width: number, height: number): { white: LogoPoint[]; green: LogoPoint[]; bounds: { x: number; y: number; w: number; h: number } } {
  const off = document.createElement('canvas');
  off.width = width;
  off.height = height;
  const octx = off.getContext('2d');
  if (!octx) return { white: [], green: [], bounds: { x: width / 2 - 220, y: height / 2 - 90, w: 440, h: 180 } };

  const cx = width / 2;
  const cy = height / 2;
  const mainSize = Math.min(width, height) * 0.24;
  const yearSize = mainSize * 0.42;
  const step = 3; // sampling density — lower = denser point cloud

  octx.textAlign = 'center';
  octx.textBaseline = 'middle';

  // Pass 1 — white glyph ("ワ") — pulled in tight against the accent glyph
  octx.clearRect(0, 0, width, height);
  octx.fillStyle = '#ffffff';
  octx.font = `bold ${mainSize}px system-ui`;
  octx.fillText('ワ', cx - mainSize * 0.34, cy);
  const whiteData = octx.getImageData(0, 0, width, height).data;
  const white: LogoPoint[] = [];
  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      if (whiteData[(y * width + x) * 4 + 3] > 120) white.push({ x, y });
    }
  }

  // Pass 2 — accent glyph + year ("メ" · "2026") — closer to the white glyph too
  octx.clearRect(0, 0, width, height);
  octx.fillStyle = '#00fa6c';
  octx.font = `bold ${mainSize}px system-ui`;
  octx.fillText('メ', cx + mainSize * 0.34, cy);
  octx.font = `bold ${yearSize}px monospace`;
  octx.fillText('2026', cx + mainSize * 1.02, cy + mainSize * 0.05);
  const greenData = octx.getImageData(0, 0, width, height).data;
  const green: LogoPoint[] = [];
  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      if (greenData[(y * width + x) * 4 + 3] > 120) green.push({ x, y });
    }
  }

  // Re-center the whole cluster on the canvas — the year text makes the raw
  // layout wider on the right, so without this the mark reads as off-axis.
  const all = [...white, ...green];
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  all.forEach(p => {
    if (p.x < minX) minX = p.x;
    if (p.x > maxX) maxX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.y > maxY) maxY = p.y;
  });
  const clusterCx = (minX + maxX) / 2;
  const clusterCy = (minY + maxY) / 2;
  const offsetX = cx - clusterCx;
  const offsetY = cy - clusterCy;

  const shift = (pts: LogoPoint[]) => pts.map(p => ({ x: p.x + offsetX, y: p.y + offsetY }));
  const shiftedWhite = shift(white);
  const shiftedGreen = shift(green);

  return {
    white: shiftedWhite,
    green: shiftedGreen,
    bounds: { x: minX + offsetX - 24, y: minY + offsetY - 24, w: (maxX - minX) + 48, h: (maxY - minY) + 48 },
  };
}

function sampleCap(points: LogoPoint[], max: number): LogoPoint[] {
  if (points.length <= max) return points;
  const out: LogoPoint[] = [];
  const stride = points.length / max;
  for (let i = 0; i < max; i++) out.push(points[Math.floor(i * stride)]);
  return out;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

type AssemblyParticle = {
  sx: number; sy: number;   // start (random matrix position)
  tx: number; ty: number;   // target (logo pixel)
  color: 'white' | 'green';
  delay: number;            // staggered start offset, seconds
  char: string;
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeEvent, setActiveEvent] = useState<typeof DX_2026_EVENTS[0] | null>(null);

  const loaderCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const eventSectionRef = useRef<HTMLDivElement | null>(null);
  const bootAudioRef = useRef<HTMLAudioElement | null>(null);
  const convergeStartRef = useRef<number | null>(null); // set the instant the first real gesture happens

  // 🎬 MATRIX RAIN (ambient, runs immediately) → LOGO CONVERGENCE (kicks in on first
  // interaction). No gate UI — the rain just loops as wallpaper until the very first
  // click/tap/key anywhere on the page, at which point audio.play() fires and the
  // convergence timeline starts in that same instant, so they launch in sync.
  useEffect(() => {
    if (!isLoading) return;
    const canvas = loaderCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const armInteraction = () => {
      if (convergeStartRef.current !== null) return;
      convergeStartRef.current = Date.now();
      const audio = bootAudioRef.current;
      if (audio) {
        audio.volume = 0.7;
        audio.play().catch((err) => console.error('[bootSound] playback failed:', err.name));
      }
    };
    window.addEventListener('pointerdown', armInteraction, { once: true });
    window.addEventListener('keydown', armInteraction, { once: true });

    let animId: number;

    const resizeLoader = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeLoader();
    window.addEventListener('resize', resizeLoader);

    // Timeline (seconds, all relative to convergeStartRef — the interaction moment)
    const T_GHOST_START = 1.0;    // faint outline preview begins forming
    const T_GHOST_FULL = 2.0;
    const T_CONVERGE_START = 2.0; // characters begin migrating into the logo
    const T_CONVERGE_DUR = 1.8;   // base duration before per-particle stagger
    const T_STAGGER_MAX = 0.5;
    const T_HOLD_END = 4.8;       // logo sits solid + glowing
    const T_FLASH_END = 5.4;
    const T_TOTAL = 5.9;

    const colWidth = 14;
    const cols = Math.ceil(canvas.width / colWidth);
    const streams = Array.from({ length: cols }, () => ({
      x: 0,
      y: Math.random() * -canvas.height,
      speed: 3 + Math.random() * 4,
      col: 0,
      chars: Array.from({ length: 22 }, () => String.fromCharCode(0x30a0 + Math.random() * 96))
    })).map((s, idx) => ({ ...s, col: idx, x: idx * colWidth }));

    // Build the logo point cloud + assembly particles once we know canvas size
    const { white, green, bounds } = generateLogoPoints(canvas.width, canvas.height);
    const whiteSample = sampleCap(white, 1450);
    const greenSample = sampleCap(green, 1650);
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const maxDist = Math.sqrt(cx * cx + cy * cy);

    const allTargets: { p: LogoPoint; color: 'white' | 'green' }[] = [
      ...whiteSample.map(p => ({ p, color: 'white' as const })),
      ...greenSample.map(p => ({ p, color: 'green' as const })),
    ];
    const assembly: AssemblyParticle[] = allTargets.map(({ p, color }) => {
      const dist = Math.sqrt((p.x - cx) ** 2 + (p.y - cy) ** 2);
      return {
        sx: Math.random() * canvas.width,
        sy: Math.random() * canvas.height,
        tx: p.x,
        ty: p.y,
        color,
        delay: (dist / maxDist) * T_STAGGER_MAX + Math.random() * 0.15,
        char: String.fromCharCode(0x30a0 + Math.random() * 96),
      };
    });

    const drawLoader = () => {
      const started = convergeStartRef.current;
      const elapsed = started !== null ? (Date.now() - started) / 1000 : -1; // -1 = still ambient, pre-interaction

      if (started !== null && elapsed >= T_TOTAL) {
        setIsLoading(false);
        return;
      }

      // Matrix rain fades out as convergence progresses so the logo reads clearly
      let rainStrength = 1;
      if (elapsed > T_CONVERGE_START) {
        rainStrength = Math.max(0.12, 1 - (elapsed - T_CONVERGE_START) / (T_CONVERGE_DUR + 0.6));
      }

      ctx.fillStyle = `rgba(5, 5, 7, ${elapsed > T_CONVERGE_START ? 0.35 : 0.25})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Background matrix rain (unassigned columns) — continues falling, dimming over time
      streams.forEach((s) => {
        s.y += s.speed;
        if (s.y > canvas.height) s.y = -100;
        for (let i = 0; i < s.chars.length; i++) {
          const currY = s.y + i * 14;
          if (currY < 0 || currY > canvas.height) continue;
          const alpha = (1 - i / s.chars.length) * rainStrength;
          ctx.font = '11px monospace';
          ctx.fillStyle = `rgba(0, 250, 108, ${alpha * 0.7})`;
          ctx.fillText(s.chars[i], s.x, currY);
        }
      });

      // Ghost outline preview — faint, sparse hint of the logo forming before the snap-together
      if (elapsed > T_GHOST_START) {
        const ghostT = Math.min(1, (elapsed - T_GHOST_START) / (T_GHOST_FULL - T_GHOST_START));
        const ghostAlpha = ghostT * 0.14;
        ctx.fillStyle = `rgba(255, 255, 255, ${ghostAlpha})`;
        for (let i = 0; i < whiteSample.length; i += 3) {
          ctx.fillRect(whiteSample[i].x, whiteSample[i].y, 1.5, 1.5);
        }
        ctx.fillStyle = `rgba(0, 250, 108, ${ghostAlpha})`;
        for (let i = 0; i < greenSample.length; i += 3) {
          ctx.fillRect(greenSample[i].x, greenSample[i].y, 1.5, 1.5);
        }
      }

      // Convergence — matrix characters migrate from random positions onto the logo
      if (elapsed > T_CONVERGE_START) {
        assembly.forEach((a) => {
          const localElapsed = elapsed - T_CONVERGE_START - a.delay;
          const t = Math.max(0, Math.min(1, localElapsed / T_CONVERGE_DUR));
          if (t <= 0) return;
          const eased = easeOutCubic(t);
          const x = lerp(a.sx, a.tx, eased);
          const y = lerp(a.sy, a.ty, eased);
          const settled = t > 0.86;

          if (settled) {
            // Locked in — render as a crisp solid pixel so logo edges stay clean
            ctx.fillStyle = a.color === 'white'
              ? `rgba(255,255,255,${0.9})`
              : `rgba(0,250,108,${0.95})`;
            ctx.fillRect(x - 1.5, y - 1.5, 3, 3);
          } else {
            // Still in flight — render as a flickering matrix glyph
            if (Math.random() < 0.4) a.char = String.fromCharCode(0x30a0 + Math.random() * 96);
            ctx.font = '12px monospace';
            ctx.fillStyle = a.color === 'white'
              ? `rgba(255,255,255,${0.3 + eased * 0.6})`
              : `rgba(0,250,108,${0.3 + eased * 0.6})`;
            ctx.fillText(a.char, x, y);
          }
        });
      }

      // Hold: gentle pulsing glow once fully formed
      if (elapsed > T_CONVERGE_START + T_CONVERGE_DUR + T_STAGGER_MAX && elapsed < T_HOLD_END) {
        const pulse = 0.5 + 0.5 * Math.sin((elapsed - T_CONVERGE_START) * 3);
        ctx.save();
        ctx.globalAlpha = 0.12 + pulse * 0.08;
        ctx.shadowColor = '#00fa6c';
        ctx.shadowBlur = 25;
        ctx.fillStyle = '#00fa6c';
        ctx.fillRect(bounds.x, bounds.y, bounds.w, bounds.h);
        ctx.restore();
      }

      // Flash to white before handing off to the main site
      if (elapsed > T_HOLD_END) {
        const flashAlpha = Math.min(1, (elapsed - T_HOLD_END) / (T_FLASH_END - T_HOLD_END));
        ctx.fillStyle = `rgba(255, 255, 255, ${flashAlpha * 0.9})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      animId = requestAnimationFrame(drawLoader);
    };

    drawLoader();
    return () => {
      window.removeEventListener('resize', resizeLoader);
      window.removeEventListener('pointerdown', armInteraction);
      window.removeEventListener('keydown', armInteraction);
      cancelAnimationFrame(animId);
    };
  }, [isLoading]);
  useEffect(() => {
    if (isLoading) return;
    const canvas = heroCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animId: number;
    let particles: any[] = [];
    const mouse = { x: null as number | null, y: null as number | null, radius: 220 };

    const resizeHero = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeHero);
    resizeHero();

    class Particle {
      x: number; y: number; directionX: number; directionY: number; size: number;
      constructor(x: number, y: number, directionX: number, directionY: number, size: number) {
        this.x = x; this.y = y; this.directionX = directionX; this.directionY = directionY;
        this.size = size;
      }
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = 'rgba(0, 250, 108, 0.45)';
        ctx.fill();
      }
      update() {
        if (!canvas) return;
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;

        if (mouse.x !== null && mouse.y !== null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius + this.size) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            this.x -= forceDirectionX * force * 4;
            this.y -= forceDirectionY * force * 4;
          }
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    particles = Array.from({ length: Math.ceil((canvas.height * canvas.width) / 8500) }, () => {
      let size = Math.random() * 2.5 + 1;
      return new Particle(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        (Math.random() * 0.5) - 0.25,
        (Math.random() * 0.5) - 0.25,
        size
      );
    });

    const animateHero = () => {
      if (!ctx || !canvas) return;
      animId = requestAnimationFrame(animateHero);
      ctx.fillStyle = '#050507';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => p.update());

      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          let dist = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x))
              + ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));
          if (dist < (canvas.width / 6.5) * (canvas.height / 6.5)) {
            let opacityValue = 1 - (dist / 25000);
            
            let dx_mouse_a = particles[a].x - (mouse.x ?? 0);
            let dy_mouse_a = particles[a].y - (mouse.y ?? 0);
            let distance_mouse_a = Math.sqrt(dx_mouse_a * dx_mouse_a + dy_mouse_a * dy_mouse_a);

            if (mouse.x && distance_mouse_a < mouse.radius) {
              ctx.strokeStyle = `rgba(0, 250, 108, ${opacityValue * 0.85})`;
            } else {
              ctx.strokeStyle = `rgba(0, 250, 108, ${opacityValue * 0.35})`;
            }

            ctx.lineWidth = 0.9;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX; mouse.y = event.clientY;
    };
    const handleMouseOut = () => {
      mouse.x = null; mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);

    animateHero();
    return () => {
      window.removeEventListener('resize', resizeHero);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animId);
    };
  }, [isLoading]);

  const filteredEvents = selectedCategory === "All" 
    ? DX_2026_EVENTS 
    : DX_2026_EVENTS.filter(e => e.category === selectedCategory);

  const categories = ["All", "Coding", "Quiz", "Gaming", "Robotics", "Web", "Design", "Video"];

  return (
    <div className="min-h-screen bg-[#050507] text-neutral-200 selection:bg-[#00fa6c] selection:text-black antialiased relative">
      
      {/* Always-mounted audio element so bootAudioRef.current is ready before any interaction */}
      <audio ref={bootAudioRef} src={bootSound} preload="auto" />

      {/* Preloader — ambient matrix rain runs the instant this mounts, no gate needed.
          The logo convergence + boot sound both arm on the page's first click/tap/key,
          wherever it happens, since that's the earliest moment a browser allows audio. */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed inset-0 w-full h-full z-40 bg-[#050507] flex items-center justify-center"
          >
            <canvas ref={loaderCanvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* CORE FRAMEWORK INTERFACE */}
      {!isLoading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          
          {/* Animated network particles flow continuously underneath all sections */}
          <canvas ref={heroCanvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0" />

          {/* FIRST VIEW: LANDING PANEL */}
          <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
            <div className="text-center p-6 max-w-5xl mx-auto relative z-10 flex flex-col items-center justify-center">
              
              <motion.div
  initial={{ opacity: 0, y: -10 }}
  animate={{
    opacity: 1,
    y: [0, -5, 0],
  }}
  transition={{
    opacity: { duration: 0.8 },
    y: {
      duration: 3.8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }}
  className="mb-10"
>
  <div className="relative inline-flex items-center justify-center">

    {/* Cyan Glow */}
    <div className="absolute inset-0 blur-3xl bg-cyan-400/20 rounded-full scale-150" />

    {/* Pink Glow */}
    <div className="absolute inset-0 blur-3xl bg-fuchsia-500/15 rounded-full scale-125" />

    <span
      className="text-[42px] leading-none font-black tracking-[-0.08em]"
      style={{
        fontFamily: "'Orbitron', sans-serif",
        color: "#fff",
        textShadow: `
          0 0 6px #ffffff,
          0 0 18px rgba(255,255,255,.8),
          0 0 32px rgba(255,255,255,.45)
        `,
      }}
    >
      ワ
    </span>

    <span
      className="text-[42px] leading-none font-black tracking-[-0.08em]"
      style={{
        fontFamily: "'Orbitron', sans-serif",
        color: "#00fa6c",
        textShadow: `
          0 0 6px #00fa6c,
          0 0 18px #00fa6c,
          0 0 36px rgba(0,250,108,.9),
          0 0 60px rgba(0,250,108,.45)
        `,
      }}
    >
      メ
    </span>

  </div>
</motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 15 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.1 }}
                className="flex items-center justify-center gap-4 mb-10 select-none pointer-events-none"
              >
                <img 
                  src={logoAsset} 
                  alt="DynamiX Logo" 
                  className="h-16 md:h-24 w-auto object-contain invert brightness-200 drop-shadow-[0_0_35px_rgba(255,255,255,0.15)]"
                />
                <span className="text-4xl md:text-6xl font-mono font-bold tracking-tighter text-[#00fa6c] drop-shadow-[0_0_20px_rgba(0,250,108,0.4)] relative top-1 md:top-2 border-b-4 border-[#00fa6c] pb-1">
                  2026
                </span>
              </motion.div>

              <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="max-w-xl mx-auto text-sm md:text-base text-neutral-400 mb-12 font-normal leading-relaxed">
               Twenty-five years of pushing boundaries.
Twenty-five years of transforming ideas into reality.
25 years of Dynamix.

The journey continues with a celebration that honours our legacy while embracing the future.
Coming Soon....
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="relative inline-block group rounded">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00fa6c]/30 to-[#00fa6c]/30 opacity-40 blur-sm group-hover:opacity-100 transition-opacity duration-500" />
                <button 
                  onClick={() => eventSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="relative px-8 py-4 border border-[#00fa6c]/40 bg-neutral-950/90 text-[#00fa6c] font-mono text-xs tracking-widest uppercase rounded hover:border-[#00fa6c] hover:bg-[#00fa6c] hover:text-black transition-all duration-300 flex items-center gap-3"
                >
                  Scroll Down for more <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </div>
          </div>

          {/* SECOND VIEW: APPLE-STYLE HIGH-FIDELITY GLASSMORPHISM DASHBOARD */}
          <div 
            ref={eventSectionRef} 
            className="min-h-screen border-t border-white/5 bg-transparent px-8 pt-24 pb-40 relative z-10"
          >
            <div className="max-w-6xl mx-auto">
              
              {/* iOS Frosted Control Header Component */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/10 pb-8 backdrop-blur-xl bg-white/[0.01] p-6 rounded-2xl border">
                <div>
                  <h2 className="text-3xl font-mono font-bold text-white uppercase tracking-tight">Upcoming Events</h2>
                </div>
                
                <div className="flex flex-wrap gap-2 max-w-xl">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1 text-[10px] font-mono uppercase tracking-wider rounded-lg transition-all border ${
                        selectedCategory === cat 
                          ? "bg-[#00fa6c]/20 text-white border-[#00fa6c]/50 backdrop-blur-md shadow-[0_0_15px_rgba(0,250,108,0.15)]" 
                          : "bg-white/[0.03] text-neutral-400 border-white/5 hover:bg-white/[0.08]"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* 🟢 NATIVE IPHONE GLASSMORPHISM CARDS GRID ARRAY */}
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance] w-full items-start">
                {filteredEvents.map((event) => (
                  <div 
                    key={event.id} 
                    onClick={() => setActiveEvent(event)}
                    className="break-inside-avoid mb-6 p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-[20px] backdrop-saturate-[160%] cursor-pointer transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1 hover:border-white/[0.18] hover:bg-white/[0.06] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                  >
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-[9px] font-mono tracking-widest text-[#00fa6c] bg-[#00fa6c]/10 px-2.5 py-0.5 rounded-md border border-[#00fa6c]/20 uppercase">
                          {event.category}
                        </span>
                        <span className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider">{event.mode}</span>
                      </div>
                      <h3 className="text-lg font-mono font-bold text-white group-hover:text-[#00fa6c] transition-colors duration-300">
                        {event.title}
                      </h3>
                      <p className="mt-2 text-sm text-neutral-300 leading-relaxed font-light line-clamp-2">
                        {event.desc}
                      </p>
                    </div>
                    <div className="mt-5 pt-3 border-t border-white/[0.06] flex justify-between items-center text-[10px] font-mono text-neutral-400">
                      <span className="tracking-wide">LOC: {event.venue}</span>
                      <span className="text-[#00fa6c] opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium tracking-widest">View →</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-20 flex justify-center">
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                  className="px-5 py-3 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-md text-neutral-400 hover:text-[#00fa6c] hover:border-[#00fa6c]/30 transition-all font-mono text-xs flex items-center gap-2 uppercase tracking-widest"
                >
                  <ArrowUp className="h-4 w-4" /> Return to Main Node
                </button>
              </div>

            </div>
          </div>

          {/* HIGH-FIDELITY IPHONE SIDE OVERLAY PANEL CONSOLE */}
          <div className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-xl transition-all duration-500 ease-in-out flex justify-end ${activeEvent ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
            <div className={`w-full md:w-[540px] h-full bg-black/50 border-l border-white/[0.08] backdrop-blur-[30px] backdrop-saturate-[180%] p-12 overflow-y-auto relative transition-transform duration-500 flex flex-col justify-between ${activeEvent ? "translate-x-0" : "translate-x-full"}`}>
              {activeEvent && (
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <button onClick={() => setActiveEvent(null)} className="text-neutral-400 hover:text-white font-mono text-xs tracking-widest uppercase mb-12 flex items-center gap-2 transition-colors">← RETURN</button>
                    <div className="flex gap-2 mb-6">
                      <span className="text-[10px] font-mono tracking-widest text-[#00fa6c] bg-[#00fa6c]/10 px-2.5 py-0.5 rounded-md border border-[#00fa6c]/20 uppercase">{activeEvent.category}</span>
                      <span className="text-[10px] font-mono tracking-widest text-neutral-300 bg-white/[0.06] px-2.5 py-0.5 rounded-md border border-white/10 uppercase">{activeEvent.mode}</span>
                    </div>
                    <h2 className="text-3xl font-mono font-bold text-white mb-6 uppercase tracking-tight">{activeEvent.title}</h2>
                    <div className="space-y-6 text-neutral-200 text-sm leading-relaxed border-t border-b border-white/[0.08] py-8 my-8 font-light">
                      <p>{activeEvent.desc}</p>
                      <div className="grid grid-cols-2 gap-4 pt-4 font-mono text-xs text-neutral-300">
                        <div>
                          <span className="text-neutral-500 block uppercase mb-1">ASSIGNED VENUE</span>
                          <span className="text-white text-sm font-normal">{activeEvent.venue}</span>
                        </div>
                        <div>
                          <span className="text-neutral-500 block uppercase mb-1">SYSTEM_STAMP</span>
                          <span className="text-white text-sm font-normal">DX//NODE_{activeEvent.id}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-6">
                    <button className="w-full py-4 rounded-xl bg-[#00fa6c] text-black font-mono font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors duration-300 shadow-[0_10px_30px_rgba(0,250,108,0.2)]">EXECUTE_REGISTRATION_FLOW</button>
                  </div>
                </div>
              )}
            </div>
          </div>

        </motion.div>
      )}
    </div>
  )
}
