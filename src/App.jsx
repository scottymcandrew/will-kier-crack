import { useState, useEffect, useRef, useCallback } from "react";

const EASTER_MONDAY = new Date("2026-04-06T23:59:59Z");
const PM_START = new Date("2024-07-05T00:00:00Z");
const LIZ_TRUSS_DAYS = 49;
const CREME_EGG_SEASON_START = new Date("2026-01-01T00:00:00Z");

const milestones = [
  { days: 49, label: "Liz Truss's entire premiership 🥬", icon: "🥬" },
  { days: 90, label: "A mayfly's adult lifespan... wait, those only last 24hrs. He beat that at least.", icon: "🪰" },
  { days: 119, label: "The Titanic's operational career (from launch to iceberg)", icon: "🚢" },
  { days: 175, label: "A hamster's pregnancy (×10)", icon: "🐹" },
  { days: 200, label: "The Fyre Festival planning period", icon: "🏝️" },
  { days: 365, label: "One whole year (participation trophy earned)", icon: "🏆" },
  { days: 500, label: "Longer than most New Year's resolutions... combined", icon: "💪" },
  { days: 584, label: "The entire run of Fawlty Towers (12 episodes felt longer)", icon: "📺" },
];

const PARTICLE_EMOJIS = ["🥚", "🥬", "🇬🇧", "💀", "📉", "🔥", "⭐", "✨"];

// Floating ambient particles
function AmbientParticles() {
  const particles = useRef([...Array(25)].map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    speed: Math.random() * 20 + 15,
    delay: Math.random() * 5,
    emoji: PARTICLE_EMOJIS[Math.floor(Math.random() * PARTICLE_EMOJIS.length)],
    isEmoji: Math.random() > 0.7,
  })));

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
      {particles.current.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            bottom: "-20px",
            fontSize: p.isEmoji ? `${p.size * 4}px` : undefined,
            width: p.isEmoji ? undefined : p.size,
            height: p.isEmoji ? undefined : p.size,
            borderRadius: "50%",
            background: p.isEmoji ? undefined : `radial-gradient(circle, rgba(255,215,0,0.8), rgba(123,45,142,0.4))`,
            boxShadow: p.isEmoji ? undefined : `0 0 ${p.size * 2}px rgba(255,215,0,0.5)`,
            animation: `floatUp ${p.speed}s linear infinite`,
            animationDelay: `${p.delay}s`,
            opacity: 0.6,
          }}
        >
          {p.isEmoji ? p.emoji : null}
        </div>
      ))}
    </div>
  );
}

// Confetti explosion for milestones
function ConfettiBurst({ active, onComplete }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (active) {
      const newParticles = [...Array(50)].map((_, i) => ({
        id: i,
        x: 50 + (Math.random() - 0.5) * 20,
        y: 40,
        vx: (Math.random() - 0.5) * 30,
        vy: -Math.random() * 20 - 10,
        rotation: Math.random() * 360,
        color: ["#FFD700", "#7B2D8E", "#FF4444", "#00FF88", "#FF69B4", "#00BFFF"][Math.floor(Math.random() * 6)],
        size: Math.random() * 10 + 5,
        shape: Math.random() > 0.5 ? "rect" : "circle",
      }));
      setParticles(newParticles);
      setTimeout(() => {
        setParticles([]);
        onComplete?.();
      }, 3000);
    }
  }, [active, onComplete]);

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 100, overflow: "hidden" }}>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.shape === "rect" ? p.size * 0.6 : p.size,
            borderRadius: p.shape === "circle" ? "50%" : "2px",
            background: p.color,
            transform: `rotate(${p.rotation}deg)`,
            animation: `confettiFall 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
            "--vx": `${p.vx}vw`,
            "--vy": `${p.vy}vh`,
          }}
        />
      ))}
    </div>
  );
}

// Dramatic screen shake
function useScreenShake() {
  const [shaking, setShaking] = useState(false);

  const triggerShake = useCallback(() => {
    setShaking(true);
    setTimeout(() => setShaking(false), 500);
  }, []);

  return { shaking, triggerShake };
}

// Pulsing glow ring around elements
function GlowRing({ intensity = 1, color = "#FFD700", children }) {
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          inset: -20,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color}${Math.round(intensity * 40).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
          animation: "pulseGlow 2s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      {children}
    </div>
  );
}

// Flying crack debris
function CrackDebris({ active }) {
  const debris = useRef([...Array(8)].map((_, i) => ({
    id: i,
    angle: (i / 8) * Math.PI * 2,
    distance: Math.random() * 50 + 30,
    size: Math.random() * 8 + 4,
    delay: Math.random() * 0.3,
  })));

  if (!active) return null;

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {debris.current.map((d) => (
        <div
          key={d.id}
          style={{
            position: "absolute",
            left: "50%",
            top: "45%",
            width: d.size,
            height: d.size,
            background: "linear-gradient(135deg, #5B1A6E, #2D0A3E)",
            borderRadius: "2px",
            animation: `debrisFly 1s ease-out forwards`,
            animationDelay: `${d.delay}s`,
            "--angle": `${d.angle}rad`,
            "--distance": `${d.distance}px`,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  );
}

// Dramatic number counter animation
function AnimatedNumber({ value, duration = 500 }) {
  const [displayValue, setDisplayValue] = useState(value);
  const prevValue = useRef(value);

  useEffect(() => {
    if (value !== prevValue.current) {
      const start = prevValue.current;
      const end = value;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplayValue(Math.round(start + (end - start) * eased));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      animate();
      prevValue.current = value;
    }
  }, [value, duration]);

  return displayValue;
}

function getTimeRemaining() {
  const now = new Date();
  const diff = EASTER_MONDAY - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: false,
  };
}

function getDaysInPower() {
  const now = new Date();
  return Math.floor((now - PM_START) / (1000 * 60 * 60 * 24));
}

function getEggSeasonProgress() {
  const now = new Date();
  const total = EASTER_MONDAY - CREME_EGG_SEASON_START;
  const elapsed = now - CREME_EGG_SEASON_START;
  return Math.min(Math.max(elapsed / total, 0), 1);
}

function CrackingEgg({ progress, onCrack }) {
  const crackLevel = Math.min(progress * 1.2, 1);
  const prevCrackLevel = useRef(0);
  const [showDebris, setShowDebris] = useState(false);

  // Trigger effects when crack level increases significantly
  useEffect(() => {
    if (crackLevel > prevCrackLevel.current + 0.15) {
      setShowDebris(true);
      onCrack?.();
      setTimeout(() => setShowDebris(false), 1000);
    }
    prevCrackLevel.current = crackLevel;
  }, [crackLevel, onCrack]);

  const eggShake = crackLevel > 0.6 ? "eggTremble" : crackLevel > 0.3 ? "eggWobble" : "";

  return (
    <div style={{ position: "relative", width: 200, height: 260, margin: "0 auto" }}>
      {/* Dramatic glow behind egg */}
      <div style={{
        position: "absolute",
        left: "50%",
        top: "45%",
        transform: "translate(-50%, -50%)",
        width: 180,
        height: 180,
        borderRadius: "50%",
        background: `radial-gradient(circle, rgba(255,215,0,${0.1 + crackLevel * 0.2}) 0%, rgba(123,45,142,${0.1 + crackLevel * 0.15}) 40%, transparent 70%)`,
        animation: "pulseGlow 2s ease-in-out infinite",
        filter: `blur(${10 + crackLevel * 10}px)`,
      }} />

      <svg viewBox="0 0 180 240" width="200" height="260" style={{ animation: eggShake ? `${eggShake} 0.5s ease-in-out infinite` : undefined }}>
        <defs>
          <linearGradient id="eggGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7B2D8E" />
            <stop offset="35%" stopColor="#5B1A6E" />
            <stop offset="65%" stopColor="#4A0E5C" />
            <stop offset="100%" stopColor="#2D0A3E" />
          </linearGradient>
          <linearGradient id="foilGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700">
              <animate attributeName="stop-color" values="#FFD700;#FFA500;#FFD700" dur="3s" repeatCount="indefinite" />
            </stop>
            <stop offset="30%" stopColor="#FFA500" />
            <stop offset="60%" stopColor="#FF8C00" />
            <stop offset="100%" stopColor="#FFD700">
              <animate attributeName="stop-color" values="#FFD700;#FFEC8B;#FFD700" dur="2s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
          <linearGradient id="goopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFACD" />
            <stop offset="30%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#FF8C00" />
          </linearGradient>
          <filter id="eggShadow">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000" floodOpacity="0.4" />
          </filter>
          <filter id="goopGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="sheen" cx="35%" cy="30%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          <radialGradient id="innerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,215,0,0.3)" />
            <stop offset="100%" stopColor="rgba(255,215,0,0)" />
          </radialGradient>
          {/* Crack texture filter */}
          <filter id="crackRough">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
          </filter>
        </defs>

        {/* Foil wrapper bottom with shimmer */}
        <ellipse cx="90" cy="175" rx="52" ry="55" fill="url(#foilGrad)" filter="url(#eggShadow)" />
        <ellipse cx="90" cy="175" rx="52" ry="55" fill="url(#foilGrad)" opacity="0.8" />
        {[...Array(12)].map((_, i) => (
          <line key={i} x1={90 + Math.cos((i * Math.PI) / 6) * 20} y1={140}
            x2={90 + Math.cos((i * Math.PI) / 6) * 50} y2={220}
            stroke="#CC8400" strokeWidth="0.5" opacity="0.4" />
        ))}
        {/* Foil sparkles */}
        {[...Array(5)].map((_, i) => (
          <circle key={`sparkle-${i}`}
            cx={70 + i * 10} cy={165 + (i % 2) * 15} r="1.5"
            fill="#FFFACD" opacity="0.8">
            <animate attributeName="opacity" values="0.3;1;0.3" dur={`${1 + i * 0.3}s`} repeatCount="indefinite" />
          </circle>
        ))}

        {/* Main egg body */}
        <ellipse cx="90" cy="120" rx="55" ry="75" fill="url(#eggGrad)" filter="url(#eggShadow)" />
        <ellipse cx="90" cy="120" rx="55" ry="75" fill="url(#sheen)" />

        {/* Inner glow when cracking */}
        {crackLevel > 0.3 && (
          <ellipse cx="90" cy="120" rx="55" ry="75" fill="url(#innerGlow)" opacity={crackLevel * 0.8}>
            <animate attributeName="opacity" values={`${crackLevel * 0.5};${crackLevel * 0.9};${crackLevel * 0.5}`} dur="1.5s" repeatCount="indefinite" />
          </ellipse>
        )}

        {/* Cadbury-style swirl text */}
        <text x="90" y="105" textAnchor="middle" fill="#FFD700"
          fontFamily="'Cormorant Garamond', serif" fontSize="14" fontWeight="bold" fontStyle="italic"
          style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}>
          Creme
        </text>
        <text x="90" y="125" textAnchor="middle" fill="#FFD700"
          fontFamily="'Cormorant Garamond', serif" fontSize="18" fontWeight="bold" fontStyle="italic"
          style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}>
          Egg
        </text>

        {/* Crack lines - MORE cracks, more drama */}
        {crackLevel > 0.15 && (
          <g filter="url(#crackRough)">
            <path d={`M 75 82 L 80 90 L 74 98 L 79 108 L 73 115`}
              stroke="#1a0525" strokeWidth="2.5" fill="none"
              opacity={Math.min((crackLevel - 0.15) * 2.5, 1)}
              strokeLinecap="round" />
            <path d={`M 76 83 L 81 91 L 75 99 L 80 109`}
              stroke="#FFD700" strokeWidth="0.5" fill="none"
              opacity={Math.min((crackLevel - 0.15) * 2, 0.6)} />
          </g>
        )}
        {crackLevel > 0.3 && (
          <g filter="url(#crackRough)">
            <path d={`M 102 75 L 96 85 L 103 93 L 95 102 L 100 112`}
              stroke="#1a0525" strokeWidth="2.5" fill="none"
              opacity={Math.min((crackLevel - 0.3) * 2.5, 1)}
              strokeLinecap="round" />
            <path d={`M 100 76 L 94 86 L 101 94`}
              stroke="#FFD700" strokeWidth="0.5" fill="none"
              opacity={Math.min((crackLevel - 0.3) * 2, 0.6)} />
          </g>
        )}
        {crackLevel > 0.45 && (
          <g filter="url(#crackRough)">
            <path d={`M 112 85 L 106 95 L 114 105 L 108 115`}
              stroke="#1a0525" strokeWidth="2" fill="none"
              opacity={Math.min((crackLevel - 0.45) * 2.5, 1)}
              strokeLinecap="round" />
          </g>
        )}
        {crackLevel > 0.55 && (
          <g filter="url(#crackRough)">
            <path d={`M 68 95 L 72 105 L 66 112`}
              stroke="#1a0525" strokeWidth="2" fill="none"
              opacity={Math.min((crackLevel - 0.55) * 2.5, 1)}
              strokeLinecap="round" />
          </g>
        )}
        {crackLevel > 0.7 && (
          <g filter="url(#crackRough)">
            <path d={`M 85 68 L 88 78 L 82 85 L 90 92`}
              stroke="#1a0525" strokeWidth="2" fill="none"
              opacity={Math.min((crackLevel - 0.7) * 2.5, 1)}
              strokeLinecap="round" />
            <path d={`M 95 70 L 100 80 L 94 88`}
              stroke="#1a0525" strokeWidth="1.5" fill="none"
              opacity={Math.min((crackLevel - 0.7) * 2.5, 1)}
              strokeLinecap="round" />
          </g>
        )}

        {/* Gooey centre oozing out - MORE GOOP */}
        {crackLevel > 0.5 && (
          <g opacity={Math.min((crackLevel - 0.5) * 2.5, 1)} filter="url(#goopGlow)">
            {/* Main ooze from cracks */}
            <ellipse cx="78" cy="110" rx="7" ry="5" fill="url(#goopGrad)">
              <animate attributeName="ry" values="5;8;5" dur="2s" repeatCount="indefinite" />
              <animate attributeName="cy" values="110;113;110" dur="2s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="100" cy="105" rx="5" ry="4" fill="#FFD700">
              <animate attributeName="ry" values="4;7;4" dur="2.5s" repeatCount="indefinite" />
            </ellipse>
            {crackLevel > 0.7 && (
              <>
                <ellipse cx="85" cy="78" rx="4" ry="3" fill="url(#goopGrad)">
                  <animate attributeName="ry" values="3;5;3" dur="1.8s" repeatCount="indefinite" />
                </ellipse>
                <ellipse cx="72" cy="100" rx="5" ry="6" fill="#FFD700">
                  <animate attributeName="ry" values="6;9;6" dur="2.2s" repeatCount="indefinite" />
                  <animate attributeName="cy" values="100;105;100" dur="2.2s" repeatCount="indefinite" />
                </ellipse>
                {/* Drip */}
                <path d="M 78 115 Q 78 125 76 135 Q 74 145 78 155"
                  stroke="url(#goopGrad)" strokeWidth="4" fill="none" strokeLinecap="round">
                  <animate attributeName="d"
                    values="M 78 115 Q 78 125 76 135 Q 74 145 78 155;M 78 115 Q 80 128 77 140 Q 73 152 80 162;M 78 115 Q 78 125 76 135 Q 74 145 78 155"
                    dur="3s" repeatCount="indefinite" />
                </path>
              </>
            )}
          </g>
        )}

        {/* White cream center peeking through major cracks */}
        {crackLevel > 0.8 && (
          <g opacity={Math.min((crackLevel - 0.8) * 4, 1)}>
            <ellipse cx="88" cy="95" rx="8" ry="6" fill="#FFFACD" filter="url(#goopGlow)">
              <animate attributeName="rx" values="8;10;8" dur="2s" repeatCount="indefinite" />
            </ellipse>
          </g>
        )}
      </svg>

      {/* Floating golden particles around egg */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            left: `${20 + i * 12}%`,
            top: `${30 + (i % 3) * 15}%`,
            width: 4 + (i % 3) * 2,
            height: 4 + (i % 3) * 2,
            borderRadius: "50%",
            background: `radial-gradient(circle, #FFD700, #FFA500)`,
            boxShadow: "0 0 8px rgba(255,215,0,0.8)",
            animation: `floatParticle${i % 3} ${2 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
            opacity: 0.5 + crackLevel * 0.5,
          }} />
        ))}
      </div>

      {/* Crack debris effect */}
      <CrackDebris active={showDebris} />

      {/* Stress indicator when highly cracked */}
      {crackLevel > 0.75 && (
        <div style={{
          position: "absolute",
          top: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: 24,
          animation: "stressEmoji 0.5s ease-in-out infinite",
        }}>
          {crackLevel > 0.9 ? "💥" : "😰"}
        </div>
      )}
    </div>
  );
}

function CountdownBlock({ value, label, tick }) {
  return (
    <div className="countdown-block" style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      background: "rgba(123, 45, 142, 0.15)",
      border: "1px solid rgba(123, 45, 142, 0.3)",
      borderRadius: 12, padding: "12px 16px", minWidth: 70,
      backdropFilter: "blur(10px)",
      animation: tick ? "countdownTick 0.3s ease-out" : undefined,
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Shimmer effect */}
      <div style={{
        position: "absolute",
        top: 0,
        left: "-100%",
        width: "100%",
        height: "100%",
        background: "linear-gradient(90deg, transparent, rgba(255,215,0,0.1), transparent)",
        animation: tick ? "shimmer 0.5s ease-out" : undefined,
      }} />
      <span style={{
        fontSize: 42, fontWeight: 600, color: "#FFD700",
        fontFamily: "'Cormorant Garamond', serif",
        fontStyle: "italic",
        lineHeight: 1,
        textShadow: "0 2px 10px rgba(255, 215, 0, 0.3)",
        position: "relative",
        zIndex: 1,
      }}>
        {String(value).padStart(2, "0")}
      </span>
      <span style={{
        fontSize: 10, textTransform: "uppercase", letterSpacing: 2,
        color: "rgba(255,255,255,0.6)", marginTop: 4,
        fontFamily: "'Space Mono', monospace",
        position: "relative",
        zIndex: 1,
      }}>
        {label}
      </span>
    </div>
  );
}

// Breaking news ticker
function NewsTicker() {
  const headlines = [
    "BREAKING: Egg still intact, nation holds breath",
    "LIVE: Creme Egg demonstrates more structural integrity than cabinet",
    "EXPERT ANALYSIS: Chocolate shell 'significantly more stable' than polling numbers",
    "JUST IN: Lettuce sends supportive message to Creme Egg",
    "DEVELOPING: Sources say egg 'cautiously optimistic' about survival chances",
    "UPDATE: Fondant centre remains composed despite external pressure",
    "EXCLUSIVE: Anonymous egg insider describes 'cracks appearing'",
  ];

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      background: "linear-gradient(90deg, #7B2D8E, #5B1A6E)",
      padding: "8px 0",
      overflow: "hidden",
      zIndex: 50,
      borderBottom: "2px solid #FFD700",
    }}>
      <div style={{
        display: "flex",
        animation: "tickerScroll 30s linear infinite",
        whiteSpace: "nowrap",
      }}>
        {[...headlines, ...headlines].map((headline, i) => (
          <span key={i} style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 11,
            color: "#FFD700",
            marginRight: 60,
            textTransform: "uppercase",
            letterSpacing: 1,
          }}>
            <span style={{ color: "#FF4444", marginRight: 8 }}>●</span>
            {headline}
          </span>
        ))}
      </div>
    </div>
  );
}

// Shareable Crisis Card - generates a downloadable/shareable image-style card
function CrisisCard({ daysInPower, trussMultiple, daysRemaining, eggProgress, onClose }) {
  const cardRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

  const downloadCard = async () => {
    if (!cardRef.current) return;
    setDownloading(true);

    try {
      // Use html2canvas dynamically loaded
      const html2canvas = (await import('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/+esm')).default;
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#1a0525',
        scale: 2,
      });
      const link = document.createElement('a');
      link.download = `crisis-update-${daysInPower}-days.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      // Fallback: just alert to screenshot
      alert('Screenshot this card to share! 📸');
    }
    setDownloading(false);
  };

  const today = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const crisisLevel = eggProgress > 0.8 ? "CRITICAL" : eggProgress > 0.6 ? "SEVERE" : eggProgress > 0.4 ? "ELEVATED" : "MONITORING";
  const crisisColor = eggProgress > 0.8 ? "#FF4444" : eggProgress > 0.6 ? "#FFA500" : eggProgress > 0.4 ? "#FFD700" : "#10B981";

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.9)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: 20,
      backdropFilter: "blur(10px)",
    }}>
      <div style={{ maxWidth: 400, width: "100%" }}>
        {/* The actual card */}
        <div
          ref={cardRef}
          style={{
            background: "linear-gradient(145deg, #1a0525 0%, #0d0015 50%, #1a0a2e 100%)",
            borderRadius: 16,
            padding: 24,
            border: "2px solid rgba(255, 215, 0, 0.3)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background decoration */}
          <div style={{
            position: "absolute",
            top: -50,
            right: -50,
            width: 150,
            height: 150,
            background: "radial-gradient(circle, rgba(123,45,142,0.3) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          {/* Header */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 16,
          }}>
            <div>
              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 10,
                color: "rgba(255,255,255,0.5)",
                textTransform: "uppercase",
                letterSpacing: 2,
              }}>
                Crisis Update
              </div>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 24,
                color: "#FFD700",
                lineHeight: 1,
                marginTop: 4,
              }}>
                EGG WATCH 2026
              </div>
            </div>
            <div style={{
              background: crisisColor,
              color: crisisColor === "#FFD700" ? "#1a0525" : "white",
              padding: "4px 10px",
              borderRadius: 4,
              fontFamily: "'Space Mono', monospace",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 1,
            }}>
              {crisisLevel}
            </div>
          </div>

          {/* Main stats */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            marginBottom: 20,
          }}>
            <div style={{
              background: "rgba(255,255,255,0.05)",
              borderRadius: 12,
              padding: 16,
              textAlign: "center",
            }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 36,
                fontWeight: 600,
                fontStyle: "italic",
                color: "#FFD700",
                lineHeight: 1,
              }}>
                {daysInPower}
              </div>
              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 9,
                color: "rgba(255,255,255,0.5)",
                textTransform: "uppercase",
                letterSpacing: 1,
                marginTop: 4,
              }}>
                Days as PM
              </div>
            </div>
            <div style={{
              background: "rgba(255,255,255,0.05)",
              borderRadius: 12,
              padding: 16,
              textAlign: "center",
            }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 36,
                fontWeight: 600,
                fontStyle: "italic",
                color: "#7B2D8E",
                lineHeight: 1,
              }}>
                {trussMultiple}×
              </div>
              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 9,
                color: "rgba(255,255,255,0.5)",
                textTransform: "uppercase",
                letterSpacing: 1,
                marginTop: 4,
              }}>
                Liz Trusses
              </div>
            </div>
          </div>

          {/* Countdown */}
          <div style={{
            background: "rgba(123, 45, 142, 0.2)",
            borderRadius: 8,
            padding: 12,
            textAlign: "center",
            marginBottom: 16,
          }}>
            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 10,
              color: "rgba(255,255,255,0.5)",
              textTransform: "uppercase",
              letterSpacing: 1,
              marginBottom: 4,
            }}>
              Egg expires in
            </div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 28,
              fontWeight: 600,
              fontStyle: "italic",
              color: "#FFD700",
            }}>
              {daysRemaining} days
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ marginBottom: 16 }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              fontFamily: "'Space Mono', monospace",
              fontSize: 9,
              color: "rgba(255,255,255,0.4)",
              marginBottom: 4,
            }}>
              <span>Egg integrity</span>
              <span>{Math.round((1 - eggProgress) * 100)}%</span>
            </div>
            <div style={{
              height: 8,
              background: "rgba(255,255,255,0.1)",
              borderRadius: 4,
              overflow: "hidden",
            }}>
              <div style={{
                width: `${(1 - eggProgress) * 100}%`,
                height: "100%",
                background: `linear-gradient(90deg, ${crisisColor}, #FFD700)`,
                borderRadius: 4,
              }} />
            </div>
          </div>

          {/* Footer */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: 12,
          }}>
            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 9,
              color: "rgba(255,255,255,0.3)",
            }}>
              {today}
            </div>
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 12,
              color: "rgba(255,255,255,0.5)",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}>
              <span>🥚</span>
              will-keir-crack.co.uk
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div style={{
          display: "flex",
          gap: 8,
          marginTop: 16,
        }}>
          <button
            onClick={downloadCard}
            disabled={downloading}
            style={{
              flex: 1,
              padding: "12px 20px",
              background: "#FFD700",
              color: "#1a0525",
              border: "none",
              borderRadius: 8,
              fontFamily: "'Space Mono', monospace",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            {downloading ? "⏳" : "📸"} {downloading ? "Generating..." : "Download Image"}
          </button>
          <button
            onClick={onClose}
            style={{
              padding: "12px 20px",
              background: "rgba(255,255,255,0.1)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 8,
              fontFamily: "'Space Mono', monospace",
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>

        <div style={{
          textAlign: "center",
          marginTop: 12,
          fontFamily: "'Space Mono', monospace",
          fontSize: 10,
          color: "rgba(255,255,255,0.3)",
        }}>
          Screenshot or download to share on social media
        </div>
      </div>
    </div>
  );
}

// Prediction picker component
function PredictionPicker({ daysInPower, onClose }) {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [shared, setShared] = useState(false);

  const predictions = [
    { month: "Feb 2026", label: "February", emoji: "❄️", odds: "12/1" },
    { month: "Mar 2026", label: "March", emoji: "🌱", odds: "8/1" },
    { month: "Apr 2026", label: "April (Easter!)", emoji: "🥚", odds: "4/1", hot: true },
    { month: "May 2026", label: "May", emoji: "🌸", odds: "6/1" },
    { month: "Jun 2026", label: "June", emoji: "☀️", odds: "5/1" },
    { month: "Later", label: "He'll survive 2026", emoji: "🦄", odds: "15/1" },
    { month: "Already", label: "He's already cracked", emoji: "💀", odds: "2/1", hot: true },
  ];

  const shareMyPrediction = () => {
    if (!selectedMonth) return;
    const pred = predictions.find(p => p.month === selectedMonth);
    const text = `🔮 MY PREDICTION: Keir Starmer will crack in ${pred.label} ${pred.emoji}

He's currently at ${daysInPower} days... will the egg outlast him?

Make YOUR prediction: `;
    const url = "https://will-keir-crack.co.uk";
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank');
    setShared(true);
  };

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.9)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: 20,
      backdropFilter: "blur(10px)",
    }}>
      <div style={{
        maxWidth: 400,
        width: "100%",
        background: "linear-gradient(145deg, #1a0525 0%, #0d0015 100%)",
        borderRadius: 16,
        padding: 24,
        border: "2px solid rgba(255, 215, 0, 0.3)",
      }}>
        <div style={{
          textAlign: "center",
          marginBottom: 20,
        }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🔮</div>
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 28,
            color: "#FFD700",
            lineHeight: 1,
          }}>
            MAKE YOUR PREDICTION
          </div>
          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 11,
            color: "rgba(255,255,255,0.5)",
            marginTop: 8,
          }}>
            When will Keir crack?
          </div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
          marginBottom: 20,
        }}>
          {predictions.map((pred) => (
            <button
              key={pred.month}
              onClick={() => setSelectedMonth(pred.month)}
              style={{
                padding: "12px 8px",
                borderRadius: 8,
                border: selectedMonth === pred.month
                  ? "2px solid #FFD700"
                  : pred.hot
                    ? "1px solid rgba(255, 68, 68, 0.5)"
                    : "1px solid rgba(255,255,255,0.1)",
                background: selectedMonth === pred.month
                  ? "rgba(255, 215, 0, 0.15)"
                  : pred.hot
                    ? "rgba(255, 68, 68, 0.1)"
                    : "rgba(255,255,255,0.03)",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.2s ease",
                position: "relative",
              }}
            >
              {pred.hot && (
                <div style={{
                  position: "absolute",
                  top: -6,
                  right: -6,
                  background: "#FF4444",
                  borderRadius: 10,
                  padding: "2px 6px",
                  fontSize: 8,
                  fontFamily: "'Space Mono', monospace",
                  color: "white",
                  fontWeight: 700,
                }}>
                  HOT
                </div>
              )}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 4,
              }}>
                <span style={{ fontSize: 18 }}>{pred.emoji}</span>
                <span style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 12,
                  color: selectedMonth === pred.month ? "#FFD700" : "white",
                  fontWeight: 700,
                }}>
                  {pred.label}
                </span>
              </div>
              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 10,
                color: "rgba(255,255,255,0.4)",
              }}>
                Odds: {pred.odds}
              </div>
            </button>
          ))}
        </div>

        {selectedMonth && !shared && (
          <button
            onClick={shareMyPrediction}
            style={{
              width: "100%",
              padding: "14px 20px",
              background: "linear-gradient(135deg, #1DA1F2, #0d8ecf)",
              color: "white",
              border: "none",
              borderRadius: 8,
              fontFamily: "'Space Mono', monospace",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              marginBottom: 12,
            }}
          >
            <span style={{ fontSize: 16 }}>𝕏</span>
            Share My Prediction
          </button>
        )}

        {shared && (
          <div style={{
            textAlign: "center",
            padding: "14px 20px",
            background: "rgba(16, 185, 129, 0.2)",
            borderRadius: 8,
            marginBottom: 12,
            fontFamily: "'Space Mono', monospace",
            fontSize: 13,
            color: "#10B981",
          }}>
            ✓ Prediction shared! May the egg be with you 🥚
          </div>
        )}

        <button
          onClick={onClose}
          style={{
            width: "100%",
            padding: "12px 20px",
            background: "transparent",
            color: "rgba(255,255,255,0.5)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 8,
            fontFamily: "'Space Mono', monospace",
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

// Share buttons component
function ShareButtons({ daysInPower, trussMultiple }) {
  const [copied, setCopied] = useState(false);
  const siteUrl = "https://will-keir-crack.co.uk";

  const shareText = `🥚 CRISIS UPDATE: Keir Starmer has survived ${daysInPower} days (${trussMultiple} Liz Trusses)... but will he outlast the Creme Egg?

Live countdown: `;

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(siteUrl)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(siteUrl)}&quote=${encodeURIComponent(shareText)}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + siteUrl)}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(siteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = siteUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const buttonStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    padding: "10px 16px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    fontSize: 13,
    fontFamily: "'Space Mono', monospace",
    fontWeight: 700,
    textDecoration: "none",
    transition: "all 0.2s ease",
    flex: 1,
    minWidth: 0,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{
        fontSize: 11,
        color: "rgba(255,255,255,0.4)",
        fontFamily: "'Space Mono', monospace",
        textTransform: "uppercase",
        letterSpacing: 2,
        textAlign: "center",
        marginBottom: 4,
      }}>
        Spread the crisis
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            ...buttonStyle,
            background: "#1DA1F2",
            color: "white",
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          <span style={{ fontSize: 16 }}>𝕏</span>
          <span>Tweet</span>
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            ...buttonStyle,
            background: "#25D366",
            color: "white",
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          <span style={{ fontSize: 16 }}>💬</span>
          <span>WhatsApp</span>
        </a>
        <a
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            ...buttonStyle,
            background: "#1877F2",
            color: "white",
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          <span style={{ fontSize: 16 }}>f</span>
          <span>Share</span>
        </a>
        <button
          onClick={copyToClipboard}
          style={{
            ...buttonStyle,
            background: copied ? "#10B981" : "rgba(255,255,255,0.1)",
            color: copied ? "white" : "#FFD700",
            border: copied ? "none" : "1px solid rgba(255, 215, 0, 0.3)",
          }}
          onMouseOver={(e) => { if (!copied) e.currentTarget.style.transform = "scale(1.05)"; }}
          onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          <span style={{ fontSize: 14 }}>{copied ? "✓" : "🔗"}</span>
          <span>{copied ? "Copied!" : "Copy"}</span>
        </button>
      </div>
    </div>
  );
}

function ProgressBar({ progress, label }) {
  return (
    <div style={{ width: "100%", marginBottom: 8 }}>
      <div style={{
        display: "flex", justifyContent: "space-between", marginBottom: 4,
        fontSize: 12, color: "rgba(255,255,255,0.7)",
        fontFamily: "'Courier New', monospace",
      }}>
        <span>{label}</span>
        <span>{Math.round(progress * 100)}%</span>
      </div>
      <div style={{
        width: "100%", height: 8, background: "rgba(255,255,255,0.1)",
        borderRadius: 4, overflow: "hidden",
      }}>
        <div style={{
          width: `${progress * 100}%`, height: "100%",
          background: "linear-gradient(90deg, #7B2D8E, #FFD700)",
          borderRadius: 4,
          transition: "width 1s ease",
          boxShadow: "0 0 10px rgba(255, 215, 0, 0.4)",
        }} />
      </div>
    </div>
  );
}

export default function App() {
  const [time, setTime] = useState(getTimeRemaining());
  const [daysInPower, setDaysInPower] = useState(getDaysInPower());
  const [eggProgress, setEggProgress] = useState(getEggSeasonProgress());
  const [showConfetti, setShowConfetti] = useState(false);
  const [lastMilestone, setLastMilestone] = useState(null);
  const [showCrisisCard, setShowCrisisCard] = useState(false);
  const [showPrediction, setShowPrediction] = useState(false);
  const { shaking, triggerShake } = useScreenShake();
  const prevSeconds = useRef(time.seconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeRemaining());
      setDaysInPower(getDaysInPower());
      setEggProgress(getEggSeasonProgress());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentMilestone = [...milestones].reverse().find((m) => daysInPower >= m.days);
  const nextMilestone = milestones.find((m) => daysInPower < m.days);
  const trussMultiple = (daysInPower / LIZ_TRUSS_DAYS).toFixed(1);

  // Trigger confetti on new milestone
  useEffect(() => {
    if (currentMilestone && currentMilestone !== lastMilestone) {
      if (lastMilestone !== null) {
        setShowConfetti(true);
        triggerShake();
      }
      setLastMilestone(currentMilestone);
    }
  }, [currentMilestone, lastMilestone, triggerShake]);

  // Track second changes for tick animation
  const secondChanged = time.seconds !== prevSeconds.current;
  useEffect(() => {
    prevSeconds.current = time.seconds;
  }, [time.seconds]);

  const handleEggCrack = useCallback(() => {
    triggerShake();
  }, [triggerShake]);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(145deg, #1a0525 0%, #0d0015 40%, #1a0a2e 70%, #0a0010 100%)",
      color: "white",
      fontFamily: "'Cormorant Garamond', serif",
      position: "relative",
      overflow: "hidden",
      animation: shaking ? "screenShake 0.5s ease-in-out" : undefined,
    }}>
      {/* Modals */}
      {showCrisisCard && (
        <CrisisCard
          daysInPower={daysInPower}
          trussMultiple={trussMultiple}
          daysRemaining={time.days}
          eggProgress={eggProgress}
          onClose={() => setShowCrisisCard(false)}
        />
      )}
      {showPrediction && (
        <PredictionPicker
          daysInPower={daysInPower}
          onClose={() => setShowPrediction(false)}
        />
      )}

      {/* Breaking news ticker */}
      <NewsTicker />

      {/* Confetti system */}
      <ConfettiBurst active={showConfetti} onComplete={() => setShowConfetti(false)} />

      {/* Ambient floating particles */}
      <AmbientParticles />

      {/* Aurora effect in background */}
      <div style={{
        position: "fixed",
        top: "-50%",
        left: "50%",
        width: "200%",
        height: "200%",
        background: `conic-gradient(from 0deg at 50% 50%,
          transparent 0deg,
          rgba(123, 45, 142, 0.03) 60deg,
          transparent 120deg,
          rgba(255, 215, 0, 0.02) 180deg,
          transparent 240deg,
          rgba(123, 45, 142, 0.03) 300deg,
          transparent 360deg)`,
        animation: "aurora 60s linear infinite",
        pointerEvents: "none",
      }} />

      {/* Background texture */}
      <div style={{
        position: "fixed", inset: 0, opacity: 0.08,
        backgroundImage: `radial-gradient(circle at 20% 50%, #7B2D8E 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, #FFD700 0%, transparent 40%),
          radial-gradient(circle at 50% 80%, #5B1A6E 0%, transparent 45%)`,
        pointerEvents: "none",
        animation: "gradientShift 20s ease infinite",
        backgroundSize: "200% 200%",
      }} />

      {/* Subtle grid overlay */}
      <div style={{
        position: "fixed", inset: 0, opacity: 0.02,
        backgroundImage: `linear-gradient(rgba(255,215,0,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,215,0,0.1) 1px, transparent 1px)`,
        backgroundSize: "50px 50px",
        pointerEvents: "none",
      }} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Space+Mono:wght@400;700&display=swap');

        /* Floating particles going up */
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }

        /* Confetti physics */
        @keyframes confettiFall {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate(var(--vx), calc(var(--vy) + 100vh)) rotate(720deg); opacity: 0; }
        }

        /* Particle floats around egg */
        @keyframes floatParticle0 { 0%,100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-15px) scale(1.2); } }
        @keyframes floatParticle1 { 0%,100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-20px) scale(1.1); } }
        @keyframes floatParticle2 { 0%,100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-12px) scale(1.3); } }

        /* Debris flying from cracks */
        @keyframes debrisFly {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          100% {
            transform: translate(
              calc(-50% + cos(var(--angle)) * var(--distance)),
              calc(-50% + sin(var(--angle)) * var(--distance))
            ) scale(0);
            opacity: 0;
          }
        }

        /* Glow pulse */
        @keyframes pulseGlow {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }

        /* Egg wobble - mild */
        @keyframes eggWobble {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-1deg); }
          75% { transform: rotate(1deg); }
        }

        /* Egg tremble - intense */
        @keyframes eggTremble {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          20% { transform: translate(-2px, 1px) rotate(-2deg); }
          40% { transform: translate(2px, -1px) rotate(2deg); }
          60% { transform: translate(-1px, 2px) rotate(-1deg); }
          80% { transform: translate(1px, -2px) rotate(1deg); }
        }

        /* Stress emoji bounce */
        @keyframes stressEmoji {
          0%, 100% { transform: translateX(-50%) scale(1); }
          50% { transform: translateX(-50%) scale(1.3); }
        }

        /* UI animations */
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.6; } }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Screen shake */
        @keyframes screenShake {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5px, -5px); }
          20% { transform: translate(5px, 5px); }
          30% { transform: translate(-5px, 5px); }
          40% { transform: translate(5px, -5px); }
          50% { transform: translate(-3px, -3px); }
          60% { transform: translate(3px, 3px); }
          70% { transform: translate(-2px, 2px); }
          80% { transform: translate(2px, -2px); }
          90% { transform: translate(-1px, -1px); }
        }

        /* Number flash */
        @keyframes numberFlash {
          0% { transform: scale(1); color: #FFD700; }
          50% { transform: scale(1.2); color: #FFFACD; text-shadow: 0 0 20px rgba(255, 215, 0, 0.8); }
          100% { transform: scale(1); color: #FFD700; }
        }

        /* Countdown tick */
        @keyframes countdownTick {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        /* Gradient shift for background */
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Aurora effect */
        @keyframes aurora {
          0% { transform: translateX(-50%) rotate(0deg); }
          100% { transform: translateX(-50%) rotate(360deg); }
        }

        /* Milestone unlock */
        @keyframes milestoneUnlock {
          0% { transform: scale(0.8); opacity: 0; }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }

        /* Sparkle */
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }

        /* Shimmer effect */
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        /* News ticker scroll */
        @keyframes tickerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(123, 45, 142, 0.2);
          border-radius: 16px;
          padding: 24px;
          backdrop-filter: blur(20px);
          transition: all 0.3s ease;
        }

        .card:hover {
          background: rgba(255,255,255,0.05);
          border-color: rgba(123, 45, 142, 0.4);
          transform: translateY(-2px);
          box-shadow: 0 10px 40px rgba(123, 45, 142, 0.2);
        }

        .milestone-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 215, 0, 0.1);
          border: 1px solid rgba(255, 215, 0, 0.3);
          border-radius: 20px;
          padding: 6px 14px;
          font-size: 13px;
          color: #FFD700;
          animation: milestoneUnlock 0.5s ease-out;
        }

        .status-live {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          color: #ff4444;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        .status-live::before {
          content: '';
          width: 8px; height: 8px;
          background: #ff4444;
          border-radius: 50%;
          animation: pulse 1.5s infinite;
          box-shadow: 0 0 10px #ff4444, 0 0 20px #ff4444;
        }

        .countdown-block {
          transition: all 0.2s ease;
        }
        .countdown-block:hover {
          transform: scale(1.05);
        }

        /* Odds card hover effects */
        .odds-item {
          transition: all 0.2s ease;
        }
        .odds-item:hover {
          transform: scale(1.02);
          background: rgba(255, 68, 68, 0.15) !important;
        }
      `}</style>

      <div style={{
        maxWidth: 520, margin: "0 auto", padding: "60px 20px 40px",
        position: "relative", zIndex: 1,
      }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32, animation: "slideUp 0.8s ease" }}>
          <div className="status-live" style={{ justifyContent: "center", marginBottom: 16 }}>
            Live Crisis Watch
          </div>
          <h1 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(42px, 12vw, 56px)",
            fontWeight: 400,
            lineHeight: 1.0,
            margin: 0,
            letterSpacing: "0.02em",
            background: "linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 4px 30px rgba(255, 215, 0, 0.3)",
            filter: "drop-shadow(0 2px 10px rgba(255, 165, 0, 0.4))",
          }}>
            WILL KEIR CRACK<br />BEFORE THE EGG?
          </h1>
          <p style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 12, color: "rgba(255,255,255,0.4)",
            letterSpacing: 1, marginTop: 8, textTransform: "uppercase",
          }}>
            Two-Tier Never-Here Kier vs The Creme Egg
          </p>
        </div>

        {/* Egg with glow effect */}
        <div style={{ marginBottom: 32, position: "relative", display: "flex", justifyContent: "center" }}>
          <GlowRing intensity={eggProgress} color={eggProgress > 0.7 ? "#FF4444" : "#FFD700"}>
            <CrackingEgg progress={eggProgress} onCrack={handleEggCrack} />
          </GlowRing>
          {/* Danger level indicator */}
          {eggProgress > 0.5 && (
            <div style={{
              position: "absolute",
              bottom: -10,
              left: "50%",
              transform: "translateX(-50%)",
              fontFamily: "'Space Mono', monospace",
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: 2,
              color: eggProgress > 0.8 ? "#FF4444" : eggProgress > 0.6 ? "#FFA500" : "#FFD700",
              textShadow: `0 0 10px ${eggProgress > 0.8 ? "#FF4444" : "#FFD700"}`,
              animation: eggProgress > 0.8 ? "pulse 0.5s ease-in-out infinite" : undefined,
            }}>
              {eggProgress > 0.9 ? "⚠️ CRITICAL" : eggProgress > 0.7 ? "⚠️ HIGH RISK" : "⚡ CRACKING"}
            </div>
          )}
        </div>

        {/* Countdown to Easter */}
        <div className="card" style={{ marginBottom: 16, animation: "slideUp 0.8s ease 0.2s both" }}>
          <div style={{
            textAlign: "center", marginBottom: 12,
            fontFamily: "'Space Mono', monospace",
            fontSize: 11, textTransform: "uppercase", letterSpacing: 2,
            color: "rgba(255,255,255,0.5)",
          }}>
            Creme Egg season ends in
          </div>
          {time.expired ? (
            <div style={{
              textAlign: "center", fontSize: 28, color: "#FFD700",
              animation: "pulse 1s ease-in-out infinite",
              textShadow: "0 0 20px rgba(255, 215, 0, 0.5)",
            }}>
              🥚 THE EGG HAS EXPIRED! DID KEIR? 🥚
            </div>
          ) : (
            <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
              <CountdownBlock value={time.days} label="Days" />
              <CountdownBlock value={time.hours} label="Hrs" />
              <CountdownBlock value={time.minutes} label="Min" />
              <CountdownBlock value={time.seconds} label="Sec" tick={secondChanged} />
            </div>
          )}
          <div style={{
            textAlign: "center", marginTop: 10, fontSize: 12,
            color: "rgba(255,255,255,0.4)",
            fontFamily: "'Space Mono', monospace",
          }}>
            Easter Monday · 6th April 2026
          </div>
        </div>

        {/* Stats */}
        <div className="card" style={{ marginBottom: 16, animation: "slideUp 0.8s ease 0.4s both" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, textAlign: "center" }}>
            <div style={{ position: "relative" }}>
              <div style={{
                fontSize: 48, fontWeight: 600, color: "#FFD700",
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                lineHeight: 1,
                textShadow: "0 0 20px rgba(255, 215, 0, 0.3)",
              }}>
                <AnimatedNumber value={daysInPower} />
              </div>
              <div style={{
                fontSize: 11, color: "rgba(255,255,255,0.5)",
                fontFamily: "'Space Mono', monospace",
                textTransform: "uppercase", letterSpacing: 1, marginTop: 4,
              }}>
                Days as PM
              </div>
              {/* Sparkle decorations */}
              <div style={{
                position: "absolute", top: -5, right: 10,
                fontSize: 12, animation: "sparkle 2s ease-in-out infinite",
              }}>✨</div>
            </div>
            <div style={{ position: "relative" }}>
              <div style={{
                fontSize: 48, fontWeight: 600,
                fontStyle: "italic",
                background: "linear-gradient(135deg, #9B4DCA, #7B2D8E, #5B1A6E)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontFamily: "'Cormorant Garamond', serif",
                lineHeight: 1,
                filter: "drop-shadow(0 0 10px rgba(123, 45, 142, 0.5))",
              }}>
                {trussMultiple}×
              </div>
              <div style={{
                fontSize: 11, color: "rgba(255,255,255,0.5)",
                fontFamily: "'Space Mono', monospace",
                textTransform: "uppercase", letterSpacing: 1, marginTop: 4,
              }}>
                Liz Trusses
              </div>
              {/* Lettuce icon */}
              <div style={{
                position: "absolute", top: -8, right: 5,
                fontSize: 14, animation: "floatParticle0 3s ease-in-out infinite",
              }}>🥬</div>
            </div>
          </div>
        </div>

        {/* Egg Season Progress */}
        <div className="card" style={{ marginBottom: 16, animation: "slideUp 0.8s ease 0.5s both" }}>
          <ProgressBar progress={eggProgress} label="🥚 Creme Egg freshness remaining" />
          <ProgressBar
            progress={Math.min(daysInPower / 1826, 1)}
            label="📊 Starmer stamina (full 5yr term)"
          />
        </div>

        {/* Share Buttons */}
        <div className="card" style={{ marginBottom: 16, animation: "slideUp 0.8s ease 0.55s both" }}>
          <ShareButtons daysInPower={daysInPower} trussMultiple={trussMultiple} />

          {/* Action buttons for viral features */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
            marginTop: 16,
            paddingTop: 16,
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}>
            <button
              onClick={() => setShowCrisisCard(true)}
              style={{
                padding: "14px 12px",
                background: "linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(123, 45, 142, 0.15))",
                border: "1px solid rgba(255, 215, 0, 0.3)",
                borderRadius: 10,
                cursor: "pointer",
                transition: "all 0.2s ease",
                textAlign: "center",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.02)";
                e.currentTarget.style.borderColor = "rgba(255, 215, 0, 0.6)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.borderColor = "rgba(255, 215, 0, 0.3)";
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 6 }}>📸</div>
              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 11,
                fontWeight: 700,
                color: "#FFD700",
                textTransform: "uppercase",
                letterSpacing: 1,
              }}>
                Crisis Card
              </div>
              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 9,
                color: "rgba(255,255,255,0.4)",
                marginTop: 4,
              }}>
                Shareable stats image
              </div>
            </button>

            <button
              onClick={() => setShowPrediction(true)}
              style={{
                padding: "14px 12px",
                background: "linear-gradient(135deg, rgba(123, 45, 142, 0.15), rgba(255, 68, 68, 0.1))",
                border: "1px solid rgba(123, 45, 142, 0.3)",
                borderRadius: 10,
                cursor: "pointer",
                transition: "all 0.2s ease",
                textAlign: "center",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.02)";
                e.currentTarget.style.borderColor = "rgba(123, 45, 142, 0.6)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.borderColor = "rgba(123, 45, 142, 0.3)";
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 6 }}>🔮</div>
              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 11,
                fontWeight: 700,
                color: "#9B4DCA",
                textTransform: "uppercase",
                letterSpacing: 1,
              }}>
                Predict
              </div>
              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 9,
                color: "rgba(255,255,255,0.4)",
                marginTop: 4,
              }}>
                When will Keir crack?
              </div>
            </button>
          </div>
        </div>

        {/* Milestone */}
        {currentMilestone && (
          <div className="card" style={{
            marginBottom: 16, textAlign: "center",
            animation: "slideUp 0.8s ease 0.6s both",
          }}>
            <div style={{
              fontSize: 11, color: "rgba(255,255,255,0.4)",
              fontFamily: "'Space Mono', monospace",
              textTransform: "uppercase", letterSpacing: 2, marginBottom: 8,
            }}>
              Current Achievement Unlocked
            </div>
            <div className="milestone-tag">
              <span>{currentMilestone.icon}</span>
              <span>Outlasted: {currentMilestone.label}</span>
            </div>
            {nextMilestone && (
              <div style={{
                marginTop: 12, fontSize: 12, color: "rgba(255,255,255,0.4)",
                fontFamily: "'Space Mono', monospace",
              }}>
                Next: {nextMilestone.icon} {nextMilestone.label}
                <br />({nextMilestone.days - daysInPower} days to go)
              </div>
            )}
          </div>
        )}

        {/* Odds Section */}
        <div className="card" style={{ marginBottom: 16, animation: "slideUp 0.8s ease 0.7s both" }}>
          <div style={{
            fontSize: 11, color: "rgba(255,255,255,0.4)",
            fontFamily: "'Space Mono', monospace",
            textTransform: "uppercase", letterSpacing: 2, marginBottom: 12,
            textAlign: "center",
          }}>
            The Bookies Reckon...
          </div>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8,
          }}>
            {[
              { label: "Gone by Easter", odds: "4/6", hot: true, icon: "🔥" },
              { label: "Survives 2026", odds: "4/1", hot: false, icon: "🤞" },
              { label: "April–June exit", odds: "5/2", hot: true, icon: "📅" },
              { label: "Full term 😂", odds: "33/1", hot: false, icon: "🦄" },
            ].map((bet, i) => (
              <div key={i} className="odds-item" style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "10px 12px", borderRadius: 8,
                background: bet.hot ? "rgba(255, 68, 68, 0.1)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${bet.hot ? "rgba(255, 68, 68, 0.3)" : "rgba(255,255,255,0.08)"}`,
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              }}>
                {bet.hot && (
                  <div style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: 0,
                    height: 0,
                    borderLeft: "20px solid transparent",
                    borderTop: "20px solid #ff4444",
                  }} />
                )}
                <span style={{
                  fontSize: 12, color: "rgba(255,255,255,0.7)",
                  display: "flex", alignItems: "center", gap: 6,
                }}>
                  <span style={{ fontSize: 14 }}>{bet.icon}</span>
                  {bet.label}
                </span>
                <span style={{
                  fontSize: 15, fontWeight: 700,
                  color: bet.hot ? "#ff4444" : "#FFD700",
                  fontFamily: "'Space Mono', monospace",
                  textShadow: bet.hot ? "0 0 10px rgba(255, 68, 68, 0.5)" : "0 0 10px rgba(255, 215, 0, 0.3)",
                }}>
                  {bet.odds}
                </span>
              </div>
            ))}
          </div>
          <div style={{
            fontSize: 10, color: "rgba(255,255,255,0.25)", textAlign: "center",
            marginTop: 8, fontFamily: "'Space Mono', monospace",
          }}>
            Source: William Hill · Jan 2026 · For entertainment only
          </div>
        </div>

        {/* Footer */}
        <div style={{
          textAlign: "center", padding: "24px 0",
          animation: "slideUp 0.8s ease 0.8s both",
        }}>
          {/* Animated emoji parade */}
          <div style={{
            fontSize: 24, marginBottom: 12,
            display: "flex", justifyContent: "center", gap: 8,
          }}>
            {["🥚", "🇬🇧", "🥬", "📉", "🥚"].map((emoji, i) => (
              <span key={i} style={{
                animation: `floatParticle${i % 3} ${2 + i * 0.3}s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}>{emoji}</span>
            ))}
          </div>
          <div style={{
            fontSize: 10, color: "rgba(255,255,255,0.25)",
            fontFamily: "'Space Mono', monospace",
            lineHeight: 1.8,
            maxWidth: 300,
            margin: "0 auto",
          }}>
            A completely impartial and definitely not biased<br />
            public service announcement<br />
            <span style={{
              display: "inline-block",
              marginTop: 8,
              padding: "4px 12px",
              background: "rgba(255,255,255,0.03)",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.05)",
              color: "rgba(255,255,255,0.15)",
            }}>
              No Creme Eggs were harmed
            </span>
          </div>
          {/* Version tag */}
          <div style={{
            marginTop: 16,
            fontSize: 9,
            color: "rgba(255,255,255,0.1)",
            fontFamily: "'Space Mono', monospace",
          }}>
            v1.0.0 · Made with 🥚 and questionable political commentary
          </div>
        </div>
      </div>
    </div>
  );
}
