import { useState, useEffect } from "react";

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

function CrackingEgg({ progress }) {
  const crackLevel = Math.min(progress * 1.2, 1);
  return (
    <div style={{ position: "relative", width: 180, height: 240, margin: "0 auto" }}>
      <svg viewBox="0 0 180 240" width="180" height="240">
        <defs>
          <linearGradient id="eggGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7B2D8E" />
            <stop offset="35%" stopColor="#5B1A6E" />
            <stop offset="65%" stopColor="#4A0E5C" />
            <stop offset="100%" stopColor="#2D0A3E" />
          </linearGradient>
          <linearGradient id="foilGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="30%" stopColor="#FFA500" />
            <stop offset="60%" stopColor="#FF8C00" />
            <stop offset="100%" stopColor="#FFD700" />
          </linearGradient>
          <linearGradient id="goopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#FF8C00" />
          </linearGradient>
          <filter id="eggShadow">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000" floodOpacity="0.4" />
          </filter>
          <radialGradient id="sheen" cx="35%" cy="30%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>

        {/* Foil wrapper bottom */}
        <ellipse cx="90" cy="175" rx="52" ry="55" fill="url(#foilGrad)" filter="url(#eggShadow)" />
        <ellipse cx="90" cy="175" rx="52" ry="55" fill="url(#foilGrad)" opacity="0.8" />
        {[...Array(8)].map((_, i) => (
          <line key={i} x1={90 + Math.cos((i * Math.PI) / 4) * 20} y1={140}
            x2={90 + Math.cos((i * Math.PI) / 4) * 50} y2={220}
            stroke="#CC8400" strokeWidth="0.5" opacity="0.4" />
        ))}

        {/* Main egg body */}
        <ellipse cx="90" cy="120" rx="55" ry="75" fill="url(#eggGrad)" filter="url(#eggShadow)" />
        <ellipse cx="90" cy="120" rx="55" ry="75" fill="url(#sheen)" />

        {/* Cadbury-style swirl text */}
        <text x="90" y="105" textAnchor="middle" fill="#FFD700"
          fontFamily="'Georgia', serif" fontSize="14" fontWeight="bold" fontStyle="italic"
          style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}>
          Creme
        </text>
        <text x="90" y="125" textAnchor="middle" fill="#FFD700"
          fontFamily="'Georgia', serif" fontSize="18" fontWeight="bold" fontStyle="italic"
          style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}>
          Egg
        </text>

        {/* Crack lines - appear based on progress */}
        {crackLevel > 0.2 && (
          <path d={`M ${75} ${85} L ${82} ${95} L ${77} ${105} L ${84} ${112}`}
            stroke="#2D0A3E" strokeWidth="2" fill="none" opacity={Math.min((crackLevel - 0.2) * 2, 1)} />
        )}
        {crackLevel > 0.4 && (
          <path d={`M ${100} ${78} L ${95} ${90} L ${102} ${98} L ${97} ${108}`}
            stroke="#2D0A3E" strokeWidth="2" fill="none" opacity={Math.min((crackLevel - 0.4) * 2, 1)} />
        )}
        {crackLevel > 0.6 && (
          <path d={`M ${110} ${88} L ${105} ${100} L ${112} ${110}`}
            stroke="#2D0A3E" strokeWidth="1.5" fill="none" opacity={Math.min((crackLevel - 0.6) * 2, 1)} />
        )}

        {/* Gooey centre oozing out if cracked enough */}
        {crackLevel > 0.7 && (
          <g opacity={Math.min((crackLevel - 0.7) * 3, 1)}>
            <ellipse cx="82" cy="112" rx="6" ry="4" fill="url(#goopGrad)">
              <animate attributeName="ry" values="4;6;4" dur="2s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="98" cy="108" rx="4" ry="3" fill="#FFD700">
              <animate attributeName="ry" values="3;5;3" dur="2.5s" repeatCount="indefinite" />
            </ellipse>
          </g>
        )}
      </svg>

      {/* Floating particles for extra flair */}
      {crackLevel > 0.5 && (
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
          {[...Array(3)].map((_, i) => (
            <div key={i} style={{
              position: "absolute",
              left: `${35 + i * 15}%`,
              top: `${40 + i * 5}%`,
              width: 4, height: 4,
              borderRadius: "50%",
              background: "#FFD700",
              animation: `float${i} 3s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }} />
          ))}
        </div>
      )}
    </div>
  );
}

function CountdownBlock({ value, label }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      background: "rgba(123, 45, 142, 0.15)",
      border: "1px solid rgba(123, 45, 142, 0.3)",
      borderRadius: 12, padding: "12px 16px", minWidth: 70,
      backdropFilter: "blur(10px)",
    }}>
      <span style={{
        fontSize: 36, fontWeight: 800, color: "#FFD700",
        fontFamily: "'Georgia', serif",
        lineHeight: 1,
        textShadow: "0 2px 10px rgba(255, 215, 0, 0.3)",
      }}>
        {String(value).padStart(2, "0")}
      </span>
      <span style={{
        fontSize: 10, textTransform: "uppercase", letterSpacing: 2,
        color: "rgba(255,255,255,0.6)", marginTop: 4,
        fontFamily: "'Courier New', monospace",
      }}>
        {label}
      </span>
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

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(145deg, #1a0525 0%, #0d0015 40%, #1a0a2e 70%, #0a0010 100%)",
      color: "white",
      fontFamily: "'Georgia', serif",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background texture */}
      <div style={{
        position: "fixed", inset: 0, opacity: 0.05,
        backgroundImage: `radial-gradient(circle at 20% 50%, #7B2D8E 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, #FFD700 0%, transparent 40%),
          radial-gradient(circle at 50% 80%, #5B1A6E 0%, transparent 45%)`,
        pointerEvents: "none",
      }} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=JetBrains+Mono:wght@400;700&display=swap');
        
        @keyframes float0 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        @keyframes float1 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        @keyframes float2 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.6; } }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes wiggle {
          0%,100% { transform: rotate(0deg); }
          25% { transform: rotate(-2deg); }
          75% { transform: rotate(2deg); }
        }
        
        .card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(123, 45, 142, 0.2);
          border-radius: 16px;
          padding: 24px;
          backdrop-filter: blur(20px);
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
        }

        .status-live {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'JetBrains Mono', 'Courier New', monospace;
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
        }
      `}</style>

      <div style={{
        maxWidth: 520, margin: "0 auto", padding: "40px 20px",
        position: "relative", zIndex: 1,
      }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32, animation: "slideUp 0.8s ease" }}>
          <div className="status-live" style={{ justifyContent: "center", marginBottom: 16 }}>
            Live Crisis Watch
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 32, fontWeight: 900, lineHeight: 1.1, margin: 0,
            background: "linear-gradient(135deg, #FFD700, #FFA500, #FFD700)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            Will Keir Crack<br />Before the Egg?
          </h1>
          <p style={{
            fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            fontSize: 12, color: "rgba(255,255,255,0.4)",
            letterSpacing: 1, marginTop: 8, textTransform: "uppercase",
          }}>
            Two-Tier Never-Here Kier vs The Creme Egg
          </p>
        </div>

        {/* Egg */}
        <div style={{ animation: "wiggle 4s ease-in-out infinite", marginBottom: 24 }}>
          <CrackingEgg progress={eggProgress} />
        </div>

        {/* Countdown to Easter */}
        <div className="card" style={{ marginBottom: 16, animation: "slideUp 0.8s ease 0.2s both" }}>
          <div style={{
            textAlign: "center", marginBottom: 12,
            fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            fontSize: 11, textTransform: "uppercase", letterSpacing: 2,
            color: "rgba(255,255,255,0.5)",
          }}>
            Creme Egg season ends in
          </div>
          {time.expired ? (
            <div style={{ textAlign: "center", fontSize: 24, color: "#FFD700" }}>
              🥚 THE EGG HAS EXPIRED! DID KEIR? 🥚
            </div>
          ) : (
            <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
              <CountdownBlock value={time.days} label="Days" />
              <CountdownBlock value={time.hours} label="Hrs" />
              <CountdownBlock value={time.minutes} label="Min" />
              <CountdownBlock value={time.seconds} label="Sec" />
            </div>
          )}
          <div style={{
            textAlign: "center", marginTop: 10, fontSize: 12,
            color: "rgba(255,255,255,0.4)",
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            Easter Monday · 6th April 2026
          </div>
        </div>

        {/* Stats */}
        <div className="card" style={{ marginBottom: 16, animation: "slideUp 0.8s ease 0.4s both" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, textAlign: "center" }}>
            <div>
              <div style={{
                fontSize: 40, fontWeight: 900, color: "#FFD700",
                fontFamily: "'Playfair Display', serif",
                lineHeight: 1,
              }}>
                {daysInPower}
              </div>
              <div style={{
                fontSize: 11, color: "rgba(255,255,255,0.5)",
                fontFamily: "'JetBrains Mono', monospace",
                textTransform: "uppercase", letterSpacing: 1, marginTop: 4,
              }}>
                Days as PM
              </div>
            </div>
            <div>
              <div style={{
                fontSize: 40, fontWeight: 900, color: "#7B2D8E",
                fontFamily: "'Playfair Display', serif",
                lineHeight: 1,
              }}>
                {trussMultiple}×
              </div>
              <div style={{
                fontSize: 11, color: "rgba(255,255,255,0.5)",
                fontFamily: "'JetBrains Mono', monospace",
                textTransform: "uppercase", letterSpacing: 1, marginTop: 4,
              }}>
                Liz Trusses
              </div>
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

        {/* Milestone */}
        {currentMilestone && (
          <div className="card" style={{
            marginBottom: 16, textAlign: "center",
            animation: "slideUp 0.8s ease 0.6s both",
          }}>
            <div style={{
              fontSize: 11, color: "rgba(255,255,255,0.4)",
              fontFamily: "'JetBrains Mono', monospace",
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
                fontFamily: "'JetBrains Mono', monospace",
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
            fontFamily: "'JetBrains Mono', monospace",
            textTransform: "uppercase", letterSpacing: 2, marginBottom: 12,
            textAlign: "center",
          }}>
            The Bookies Reckon...
          </div>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8,
          }}>
            {[
              { label: "Gone by Easter", odds: "4/6", hot: true },
              { label: "Survives 2026", odds: "4/1", hot: false },
              { label: "April–June exit", odds: "5/2", hot: true },
              { label: "Full term 😂", odds: "33/1", hot: false },
            ].map((bet, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "8px 12px", borderRadius: 8,
                background: bet.hot ? "rgba(255, 68, 68, 0.1)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${bet.hot ? "rgba(255, 68, 68, 0.3)" : "rgba(255,255,255,0.08)"}`,
              }}>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>{bet.label}</span>
                <span style={{
                  fontSize: 14, fontWeight: 700,
                  color: bet.hot ? "#ff4444" : "#FFD700",
                  fontFamily: "'JetBrains Mono', monospace",
                }}>
                  {bet.odds}
                </span>
              </div>
            ))}
          </div>
          <div style={{
            fontSize: 10, color: "rgba(255,255,255,0.25)", textAlign: "center",
            marginTop: 8, fontFamily: "'JetBrains Mono', monospace",
          }}>
            Source: William Hill · Jan 2026 · For entertainment only
          </div>
        </div>

        {/* Footer */}
        <div style={{
          textAlign: "center", padding: "20px 0",
          animation: "slideUp 0.8s ease 0.8s both",
        }}>
          <div style={{
            fontSize: 20, marginBottom: 8,
          }}>
            🥚🇬🇧🥚
          </div>
          <div style={{
            fontSize: 10, color: "rgba(255,255,255,0.2)",
            fontFamily: "'JetBrains Mono', monospace",
            lineHeight: 1.6,
          }}>
            A completely impartial and definitely not biased<br />
            public service announcement<br />
            <span style={{ color: "rgba(255,255,255,0.1)" }}>
              No Creme Eggs were harmed in the making of this app
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
