import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from 'motion/react';
import { Heart, Stars, Sparkles, Music, VolumeX, ChevronDown, Quote, Calendar, Clock } from 'lucide-react';
import { UrduPoetrySection } from './components/UrduPoetrySection';

// --- Petals Overlay Component ---

const PETALS_DATA = [
  { id: 1, left: 6, size: 22, duration: 14, delay: -4, sway: 35, rot: 280, color: '#f43f5e', opacity: 0.65 },
  { id: 2, left: 14, size: 16, duration: 18, delay: -11, sway: 25, rot: 340, color: '#fb7185', opacity: 0.5 },
  { id: 3, left: 22, size: 26, duration: 13, delay: -2, sway: 45, rot: 210, color: '#fda4af', opacity: 0.7 },
  { id: 4, left: 31, size: 18, duration: 16, delay: -8, sway: 30, rot: 300, color: '#f43f5e', opacity: 0.55 },
  { id: 5, left: 39, size: 24, duration: 15, delay: -14, sway: 40, rot: 260, color: '#fb7185', opacity: 0.6 },
  { id: 6, left: 47, size: 15, duration: 19, delay: -5, sway: 20, rot: 320, color: '#fecdd3', opacity: 0.75 },
  { id: 7, left: 55, size: 28, duration: 12, delay: -9, sway: 50, rot: 240, color: '#f43f5e', opacity: 0.6 },
  { id: 8, left: 63, size: 20, duration: 17, delay: -1, sway: 35, rot: 310, color: '#fda4af', opacity: 0.65 },
  { id: 9, left: 72, size: 17, duration: 15, delay: -12, sway: 28, rot: 270, color: '#fb7185', opacity: 0.55 },
  { id: 10, left: 81, size: 25, duration: 14, delay: -6, sway: 42, rot: 330, color: '#f43f5e', opacity: 0.7 },
  { id: 11, left: 90, size: 19, duration: 18, delay: -15, sway: 32, rot: 290, color: '#fecdd3', opacity: 0.6 },
  { id: 12, left: 96, size: 23, duration: 13, delay: -3, sway: 38, rot: 220, color: '#fb7185', opacity: 0.65 },
  { id: 13, left: 10, size: 21, duration: 16, delay: -10, sway: 36, rot: 250, color: '#fda4af', opacity: 0.6 },
  { id: 14, left: 28, size: 14, duration: 20, delay: -7, sway: 22, rot: 350, color: '#fecdd3', opacity: 0.5 },
  { id: 15, left: 43, size: 27, duration: 12.5, delay: -13, sway: 48, rot: 230, color: '#f43f5e', opacity: 0.65 },
  { id: 16, left: 59, size: 18, duration: 16.5, delay: -4.5, sway: 30, rot: 310, color: '#fb7185', opacity: 0.55 },
  { id: 17, left: 77, size: 22, duration: 14.5, delay: -8.5, sway: 40, rot: 280, color: '#fda4af', opacity: 0.7 },
  { id: 18, left: 88, size: 16, duration: 17.5, delay: -11.5, sway: 26, rot: 330, color: '#fecdd3', opacity: 0.6 }
];

const FallingPetalsOverlay = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {PETALS_DATA.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute will-change-transform"
          style={{
            left: `${petal.left}%`,
            width: petal.size,
            height: petal.size * 1.3,
            top: 0,
            opacity: petal.opacity,
          }}
          initial={{
            y: "-10vh",
            x: 0,
            rotate: 0,
            scale: 0.8,
          }}
          animate={{
            y: "115vh",
            x: [0, petal.sway, -petal.sway, 0],
            rotate: [0, petal.rot, petal.rot * 1.5, petal.rot * 2],
            scale: [0.8, 1.05, 0.9, 0.75],
          }}
          transition={{
            y: {
              duration: petal.duration,
              repeat: Infinity,
              ease: "linear",
              delay: petal.delay,
            },
            x: {
              duration: petal.duration / 3,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: petal.delay,
            },
            rotate: {
              duration: petal.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: petal.delay,
            },
            scale: {
              duration: petal.duration / 2,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: petal.delay,
            },
          }}
        >
          {/* Organic Curved Rose Petal */}
          <svg
            viewBox="0 0 24 30"
            className="w-full h-full drop-shadow-[0_2px_5px_rgba(225,29,72,0.18)]"
            fill="none"
          >
            <path
              d="M12 2 C6 2, 2 7, 3 15 C4 23, 9 27, 12 28 C15 27, 20 23, 21 15 C22 7, 18 2, 12 2 Z"
              fill={petal.color}
            />
            {/* Soft inner petal highlight curve */}
            <path
              d="M11 6 C8 8, 6 12, 7 18 C7.5 20, 9 22, 11 23"
              stroke="white"
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeOpacity="0.35"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

// --- Components ---

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-12 py-8 flex justify-between items-center text-romantic-heading text-white mix-blend-difference">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="label-caps font-bold"
      >
        H & A Forever
      </motion.div>
      <div className="flex gap-6 text-[10px] uppercase tracking-widest font-semibold opacity-80">
        <span 
          className="cursor-pointer hover:opacity-100 transition-opacity font-nastaleeq text-base leading-[1.8]" 
          onClick={() => document.getElementById('urdu-poetry')?.scrollIntoView({ behavior: 'smooth' })}
        >
          اردو شاعری
        </span>
      </div>
    </nav>
  );
};

const HEART_COLORS = ['#f43f5e', '#fb7185', '#d4af37', '#c084fc', '#f472b6', '#fb923c'];

const AMBIENT_SPARKLES = [
  { id: 1, top: '15%', left: '12%', color: '#fde68a', size: 14, dur: 3.2, delay: 0 },
  { id: 2, top: '22%', left: '86%', color: '#fda4af', size: 16, dur: 4.1, delay: 0.8 },
  { id: 3, top: '62%', left: '8%', color: '#e9d5ff', size: 12, dur: 3.5, delay: 1.4 },
  { id: 4, top: '78%', left: '88%', color: '#fde68a', size: 18, dur: 4.6, delay: 0.3 },
  { id: 5, top: '38%', left: '92%', color: '#fca5a5', size: 14, dur: 3.8, delay: 2.1 },
  { id: 6, top: '18%', left: '48%', color: '#fde68a', size: 12, dur: 4.0, delay: 1.0 },
  { id: 7, top: '72%', left: '26%', color: '#fda4af', size: 15, dur: 3.6, delay: 1.7 },
  { id: 8, top: '82%', left: '62%', color: '#e9d5ff', size: 14, dur: 4.3, delay: 0.5 },
];

const Hero = () => {
  const heroRef = useRef<HTMLElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [sparks, setSparks] = useState<{ id: number; x: number; y: number; color: string; size: number }[]>([]);
  const lastSparkTime = useRef(0);

  // Mouse Coordinates & Springs for Interactive Spotlight
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const smoothX = useSpring(mouseX, { damping: 26, stiffness: 200, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 26, stiffness: 200, mass: 0.5 });

  const spotlightGradient = useMotionTemplate`radial-gradient(550px circle at ${smoothX}px ${smoothY}px, rgba(244, 63, 94, 0.22), rgba(212, 175, 55, 0.18), rgba(192, 132, 252, 0.15), transparent 70%)`;

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Background glowing orbs move at distinct rates and scales
  const yBgPink = useTransform(scrollYProgress, [0, 1], [0, 240]);
  const scaleBgPink = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const yBgPurple = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const scaleBgPurple = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacityBg = useTransform(scrollYProgress, [0, 0.85], [0.65, 0.15]);

  // Floating ambient hearts layer translates with counter-speed depth
  const yHeartsLayer = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const opacityHearts = useTransform(scrollYProgress, [0, 0.75], [1, 0.2]);

  // Foreground content layers parallax at varying depths with soft fade
  const yHeading = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const yParagraph = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const yIndicator = useTransform(scrollYProgress, [0, 1], [0, 210]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
    setIsHovering(true);

    const now = Date.now();
    if (now - lastSparkTime.current > 45) {
      lastSparkTime.current = now;
      const colors = ['#f43f5e', '#fb7185', '#d4af37', '#c084fc', '#f59e0b', '#fda4af', '#38bdf8'];
      const newSpark = {
        id: now + Math.random(),
        x,
        y,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.floor(Math.random() * 8) + 12,
      };
      setSparks((prev) => [...prev.slice(-14), newSpark]);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    mouseX.set(-1000);
    mouseY.set(-1000);
  };

  return (
    <section 
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center bg-romantic-bg overflow-hidden px-12 cursor-default select-none"
    >
      {/* Dynamic Mouse-Following Radial Spotlight */}
      <motion.div 
        style={{ background: spotlightGradient }}
        className="absolute inset-0 pointer-events-none z-[2]"
      />

      {/* Mouse Halo Core Glow */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isHovering ? 1 : 0,
        }}
        transition={{ opacity: { duration: 0.3 } }}
        className="absolute top-0 left-0 w-44 h-44 rounded-full bg-gradient-to-r from-rose-400/25 via-amber-300/20 to-purple-400/20 blur-2xl pointer-events-none z-[3]"
      />

      {/* Interactive Cursor Sparkle Particles Trail */}
      <div className="absolute inset-0 pointer-events-none z-[4] overflow-hidden">
        <AnimatePresence>
          {sparks.map((spark) => (
            <motion.div
              key={spark.id}
              initial={{ opacity: 1, scale: 0.2, x: spark.x, y: spark.y }}
              animate={{ 
                opacity: 0, 
                scale: 1.5, 
                y: spark.y - 35, 
                x: spark.x + (Math.sin(spark.id) * 20),
                rotate: 180 
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2"
              style={{ color: spark.color }}
            >
              <Sparkles style={{ width: spark.size, height: spark.size }} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Background Decorative Parallax Orbs with Richer Color Blends */}
      <motion.div 
        style={{ y: yBgPink, scale: scaleBgPink, opacity: opacityBg }}
        className="absolute top-[-100px] right-[-100px] w-[450px] h-[450px] bg-gradient-to-br from-rose-300/60 via-pink-400/40 to-amber-200/30 rounded-full blur-[130px] pointer-events-none"
      />
      <motion.div 
        style={{ y: yBgPurple, scale: scaleBgPurple, opacity: opacityBg }}
        className="absolute bottom-[-100px] left-[-100px] w-[450px] h-[450px] bg-gradient-to-tr from-purple-400/50 via-pink-300/40 to-rose-200/40 rounded-full blur-[130px] pointer-events-none"
      />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-200/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Ambient Twinkling Starlight Particles */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        {AMBIENT_SPARKLES.map((star) => (
          <motion.div
            key={star.id}
            style={{ top: star.top, left: star.left, color: star.color }}
            animate={{ 
              opacity: [0.2, 0.9, 0.2],
              scale: [0.8, 1.3, 0.8],
              rotate: [0, 90, 180]
            }}
            transition={{
              duration: star.dur,
              repeat: Infinity,
              ease: "easeInOut",
              delay: star.delay,
            }}
            className="absolute drop-shadow-[0_0_8px_currentColor]"
          >
            <Sparkles style={{ width: star.size, height: star.size }} />
          </motion.div>
        ))}
      </div>

      {/* Floating Multi-Color Hearts Layer with Counter-Speed Parallax */}
      <motion.div 
        style={{ y: yHeartsLayer, opacity: opacityHearts }}
        className="absolute inset-0 pointer-events-none z-[2]"
      >
        {[...Array(14)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ color: HEART_COLORS[i % HEART_COLORS.length] }}
            initial={{ 
              x: `${(i * 7.1 + (i % 4) * 3)}%`, 
              y: "110%", 
              scale: 0.5 + (i % 5) * 0.15,
              opacity: 0.25 + (i % 3) * 0.15,
              rotate: i * 28
            }}
            animate={{ 
              y: "-10%",
              rotate: i * 28 + 360
            }}
            transition={{ 
              duration: 13 + (i % 6) * 2, 
              repeat: Infinity,
              ease: "linear",
              delay: (i * 0.7) % 6
            }}
          >
            <Heart fill="currentColor" className="w-6 h-6 drop-shadow-sm" />
          </motion.div>
        ))}
      </motion.div>

      {/* Foreground Content */}
      <div className="container mx-auto relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1 }}
           style={{ opacity: textOpacity, scale: textScale }}
           className="max-w-4xl mx-auto"
        >
          {/* Animated Ribbon Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/85 border border-rose-200/80 shadow-md shadow-rose-100/50 mb-8 backdrop-blur-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-romantic-gold animate-spin" style={{ animationDuration: '8s' }} />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] bg-gradient-to-r from-amber-600 via-rose-500 to-purple-600 bg-clip-text text-transparent">
              Forever & Always • H & A
            </span>
            <Heart className="w-3.5 h-3.5 text-romantic-red fill-romantic-red" />
          </motion.div>

          <motion.h1 
            style={{ y: yHeading }}
            className="text-[64px] md:text-[112px] leading-[0.85] font-serif italic text-romantic-heading mb-10 tracking-tight"
          >
            Hina,<br />
            <span className="text-[44px] md:text-[84px] not-italic font-sans font-extrabold tracking-tighter">
              You Are My{" "}
              <span className="bg-gradient-to-r from-romantic-red via-rose-500 to-amber-500 bg-clip-text text-transparent drop-shadow-sm">
                Everything
              </span>
            </span>
          </motion.h1>

          <motion.p 
            style={{ y: yParagraph }}
            className="text-xl md:text-2xl text-romantic-paragraph leading-relaxed max-w-2xl mx-auto mb-12 font-light"
          >
            From the moment you came into my life, every sunrise felt warmer and every dream more within reach. You are the peace I always searched for.
          </motion.p>
          
          <motion.div
            style={{ y: yIndicator }}
            className="inline-block"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-romantic-gold p-3 rounded-full hover:bg-white/60 transition-colors cursor-pointer"
              onClick={() => document.getElementById('reasons')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <ChevronDown className="w-8 h-8" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const ReasonsSection = () => {
  const reasons = [
    { title: "Your Smile", text: "It is the brightest thing I've ever seen, lighting up even my darkest days.", icon: <Stars className="w-5 h-5" /> },
    { title: "Your Kindness", text: "The way you care for everyone around you makes me better.", icon: <Heart className="w-5 h-5" /> },
    { title: "Your Peace", text: "In this world, you are the calm I look forward to.", icon: <Sparkles className="w-5 h-5" /> }
  ];

  return (
    <section id="reasons" className="py-32 bg-romantic-heading overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-romantic-gold/10 blur-[80px] rounded-full"></div>
      
      <div className="container mx-auto px-12 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
           <div className="max-w-xl">
             <span className="label-caps text-romantic-gold block mb-4 italic">The Reasons</span>
             <h2 className="text-5xl md:text-7xl font-serif text-white italic leading-tight">Why I'll Love You <span className="text-romantic-gold">Forever</span></h2>
           </div>
           <p className="text-white/60 font-serif italic text-xl max-w-xs text-right">Each reason is a promise kept in my heart.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {reasons.map((reason, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 p-12 rounded-[3rem] backdrop-blur-md group hover:bg-white transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-full border border-romantic-gold/30 flex items-center justify-center mb-8 text-romantic-gold group-hover:bg-romantic-gold group-hover:text-white transition-colors">
                 {reason.icon}
              </div>
              <h3 className="text-3xl font-serif mb-4 text-white group-hover:text-romantic-heading transition-colors italic">{reason.title}</h3>
              <p className="text-white/60 leading-relaxed text-lg italic group-hover:text-romantic-paragraph transition-colors">{reason.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MessageSection = () => {
  return (
    <section className="py-32 bg-romantic-bg overflow-hidden">
      <div className="container mx-auto px-12 flex justify-center">
        <div className="max-w-4xl w-full">
           <motion.div 
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="bg-[#FFFBF5] p-12 md:p-24 rounded-[4rem] border border-[#F3E8D2] shadow-sm relative overflow-hidden text-center"
           >
             <div className="absolute top-0 right-0 p-12 opacity-10">
                <Quote className="w-20 h-20 text-romantic-gold rotate-180" />
             </div>
             <span className="label-caps text-romantic-gold block mb-12">A Heartfelt Letter</span>
             <p className="text-3xl md:text-5xl font-serif text-romantic-heading italic leading-tight mb-12">
               "Hina, I promise to choose you every day, to respect your dreams as much as my own, and to build a future where you always feel safe, loved, and celebrated."
             </p>
             <div className="flex items-center justify-center gap-6">
                <div className="w-16 h-px bg-romantic-gold"></div>
                <span className="font-script text-5xl text-romantic-gold">Forever Yours</span>
                <div className="w-16 h-px bg-romantic-gold"></div>
             </div>
           </motion.div>
        </div>
      </div>
    </section>
  );
};

const parseAnniversaryDate = (dateStr: string) => {
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]), 0, 0, 0);
  }
  return new Date(dateStr);
};

const DaysOfLoveSection = () => {
  const [anniversaryDate, setAnniversaryDate] = useState(() => {
    const saved = localStorage.getItem('love_anniversary_date');
    if (saved && saved !== '2024-05-20') return saved;
    localStorage.setItem('love_anniversary_date', '2025-07-23');
    return '2025-07-23';
  });
  const [isEditing, setIsEditing] = useState(false);
  const [tempDate, setTempDate] = useState(anniversaryDate);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSaveDate = (e: React.FormEvent) => {
    e.preventDefault();
    setAnniversaryDate(tempDate);
    localStorage.setItem('love_anniversary_date', tempDate);
    setIsEditing(false);
  };

  const start = parseAnniversaryDate(anniversaryDate).getTime();
  const current = now.getTime();
  const diffMs = Math.max(0, current - start);

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor(diffMs / (1000 * 60));
  const seconds = Math.floor(diffMs / 1000);

  return (
    <section id="days-of-love" className="py-28 bg-[#FFFBF8] px-12 overflow-hidden relative">
      {/* Soft Background Accents */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-romantic-pink/50 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-80 h-80 bg-romantic-purple/50 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white/80 backdrop-blur-md rounded-[3.5rem] p-10 md:p-16 border border-rose-100/80 shadow-xl shadow-rose-100/30 text-center relative overflow-hidden"
        >
          {/* Top Label */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200/60 text-romantic-red mb-6">
            <Heart className="w-3.5 h-3.5 fill-romantic-red" />
            <span className="text-[11px] font-bold uppercase tracking-widest">Our Journey in Time</span>
          </div>

          {/* User Requested Format: Days of Love: X days */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-romantic-heading italic mb-6 leading-tight">
            Days of Love: <span className="text-romantic-red not-italic font-sans font-bold tracking-tight">{days.toLocaleString()} days</span>
          </h2>

          <p className="text-romantic-paragraph text-base md:text-lg max-w-xl mx-auto mb-12 font-light leading-relaxed">
            Every sunrise since we began has been brighter, warmer, and filled with gratitude for having you by my side.
          </p>

          {/* Detailed Counter Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
            <div className="bg-rose-50/50 rounded-2xl p-5 border border-rose-100 flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-bold text-romantic-heading font-sans mb-1">{days.toLocaleString()}</span>
              <span className="text-[10px] uppercase tracking-widest text-romantic-gold font-semibold">Total Days</span>
            </div>
            <div className="bg-rose-50/50 rounded-2xl p-5 border border-rose-100 flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-bold text-romantic-heading font-sans mb-1">{hours.toLocaleString()}</span>
              <span className="text-[10px] uppercase tracking-widest text-romantic-gold font-semibold">Hours Shared</span>
            </div>
            <div className="bg-rose-50/50 rounded-2xl p-5 border border-rose-100 flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-bold text-romantic-heading font-sans mb-1">{minutes.toLocaleString()}</span>
              <span className="text-[10px] uppercase tracking-widest text-romantic-gold font-semibold">Minutes Loved</span>
            </div>
            <div className="bg-rose-50/50 rounded-2xl p-5 border border-rose-100 flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-bold text-romantic-red font-sans mb-1 tabular-nums">{seconds.toLocaleString()}</span>
              <span className="text-[10px] uppercase tracking-widest text-romantic-gold font-semibold">Seconds & Counting</span>
            </div>
          </div>

          {/* Anniversary Date Indicator & Adjustment */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-romantic-paragraph/80">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-romantic-gold" />
              Treasuring every moment since <strong className="font-semibold text-romantic-heading">{parseAnniversaryDate(anniversaryDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</strong>
            </span>
            <button
              onClick={() => {
                setTempDate(anniversaryDate);
                setIsEditing(!isEditing);
              }}
              className="text-romantic-gold hover:text-romantic-red underline underline-offset-4 transition-colors font-medium cursor-pointer"
            >
              {isEditing ? "Close" : "Change Date"}
            </button>
          </div>

          {/* Inline Date Form */}
          {isEditing && (
            <motion.form 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleSaveDate}
              className="mt-6 pt-6 border-t border-rose-100 flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <label htmlFor="anniversary-input" className="text-xs font-semibold text-romantic-heading">
                Set Our Anniversary:
              </label>
              <input
                id="anniversary-input"
                type="date"
                value={tempDate}
                onChange={(e) => setTempDate(e.target.value)}
                className="px-4 py-2 border border-rose-200 rounded-full text-xs text-romantic-heading bg-white focus:outline-none focus:ring-2 focus:ring-romantic-red/40"
              />
              <button
                type="submit"
                className="px-5 py-2 bg-romantic-gold text-white rounded-full text-xs font-semibold hover:bg-opacity-90 transition-colors shadow-sm"
              >
                Save
              </button>
            </motion.form>
          )}
        </motion.div>
      </div>
    </section>
  );
};


const ProposalSection = () => {
  const [accepted, setAccepted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleAccept = () => {
    setAccepted(true);
    setShowConfetti(true);
  };

  return (
    <section className="py-32 bg-romantic-bg px-12 overflow-hidden">
      <div className="container mx-auto">
        <AnimatePresence>
          {!accepted ? (
            <motion.div 
              key="proposal-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-gradient-to-r from-romantic-pink to-[#FFF1F2] p-12 md:p-20 rounded-[4rem] border border-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <Heart className="w-64 h-64 fill-romantic-red text-romantic-red" />
              </div>
              
              <div className="relative z-10">
                <h3 className="text-[40px] md:text-6xl font-serif italic text-romantic-heading mb-4 leading-tight">Hina, will you <br className="hidden md:block" /> always be mine?</h3>
                <p className="label-caps text-romantic-red/70">One question, a thousand lifetimes</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 relative z-10 w-full md:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAccept}
                  className="px-12 py-5 bg-romantic-red text-white rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-rose-200 transition-all hover:bg-opacity-90 active:scale-95"
                >
                  Yes ❤️
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAccept}
                  className="px-12 py-5 bg-white text-romantic-red border border-romantic-red rounded-full text-xs font-bold uppercase tracking-widest transition-all hover:bg-romantic-red/5 active:scale-95"
                >
                  Forever Yes 💍
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 relative z-10"
            >
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-7xl mb-8"
              >
                🎉💖💍
              </motion.div>
              <h2 className="text-6xl md:text-8xl font-script text-romantic-gold mb-6 italic">She Said Yes!</h2>
              <p className="text-2xl font-serif italic text-romantic-paragraph max-w-xl mx-auto">
                I promise to love you, cherish you, and keep you happy for as long as I live. Our forever starts today!
              </p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-12 flex justify-center gap-4"
              >
                 {[...Array(3)].map((_, i) => (
                   <div key={i} className="w-12 h-12 rounded-full border border-romantic-gold/20 flex items-center justify-center">
                     <Heart className="w-5 h-5 text-romantic-red fill-romantic-red" />
                   </div>
                 ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-[100]">
          {[...Array(60)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * 100 + "%", 
                y: "110%", 
                opacity: 1,
                rotate: Math.random() * 360,
                scale: Math.random() * 0.5 + 0.3
              }}
              animate={{ 
                y: "-10%", 
                rotate: Math.random() * 360 + 360,
                opacity: 0
              }}
              transition={{ 
                duration: Math.random() * 4 + 3, 
                ease: "easeOut",
                delay: Math.random() * 0.5
              }}
              className="absolute text-romantic-red"
            >
              <Heart fill="currentColor" className="w-6 h-6" />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="px-12 py-12 flex justify-between items-center border-t border-romantic-pink overflow-hidden">
      <div className="label-caps text-romantic-gold text-[10px]">H & A Forever</div>
      <div className="flex gap-4">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="w-8 h-8 rounded-full border border-romantic-pink flex items-center justify-center opacity-50">
            <div className="w-2 h-2 rounded-full bg-romantic-gold"></div>
          </div>
        ))}
      </div>
    </footer>
  );
};

// --- Main App Component ---

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Audio playback blocked", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen text-gray-900 overflow-x-hidden selection:bg-romantic-rose selection:text-white">
      {/* Background Music - Placeholder (Optional Toggle) */}
      <audio 
        ref={audioRef} 
        loop
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // Romantic placeholder
      />
      
      <AnimatePresence>
        {!isLoaded && (
          <motion.div 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-romantic-bg flex flex-col items-center justify-center"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="relative"
            >
              <div className="absolute inset-0 bg-romantic-gold/20 blur-3xl rounded-full scale-150"></div>
              <Heart className="w-20 h-20 text-romantic-gold fill-romantic-gold relative z-10" />
            </motion.div>
            <p className="mt-8 label-caps text-romantic-gold italic">Forever With You...</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-8 right-8 z-[60]">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMusic}
          className="w-14 h-14 bg-white shadow-xl rounded-full flex items-center justify-center text-romantic-gold relative group"
        >
          {isPlaying ? (
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
              <Music className="w-6 h-6" />
            </motion.div>
          ) : (
            <VolumeX className="w-6 h-6 opacity-50" />
          )}
          <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase tracking-widest pointer-events-none">
            {isPlaying ? "Pause Music" : "Unmute Music"}
          </span>
        </motion.button>
      </div>

      {/* Subtle Falling Petals Overlay */}
      <FallingPetalsOverlay />

      <Navbar />
      <Hero />
      <ReasonsSection />
      <MessageSection />
      <UrduPoetrySection />
      <DaysOfLoveSection />
      <ProposalSection />
      <Footer />
    </div>
  );
}
