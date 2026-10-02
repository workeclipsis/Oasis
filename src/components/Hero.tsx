import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

// Green pixel particles — decorative, inspired by the reference's square accents
function PixelField() {
  const pixels = [
    { x: 12, y: 20, s: 6, o: 0.9 }, { x: 22, y: 34, s: 4, o: 0.6 },
    { x: 6, y: 52, s: 8, o: 1 },    { x: 30, y: 12, s: 5, o: 0.5 },
    { x: 40, y: 46, s: 4, o: 0.7 }, { x: 18, y: 66, s: 6, o: 0.8 },
    { x: 46, y: 26, s: 3, o: 0.5 }, { x: 34, y: 62, s: 5, o: 0.6 },
  ]
  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
      {pixels.map((p, i) => (
        <span key={i} style={{
          position: 'absolute', right: `${p.x}%`, top: `${p.y}%`,
          width: p.s, height: p.s, background: 'var(--sage)',
          opacity: p.o * 0.5, borderRadius: 1,
          animation: `floatY ${4 + i * 0.5}s ease-in-out ${i * 0.2}s infinite`,
        }} />
      ))}
    </div>
  )
}

// Abstract technical system visual — nodes, links, green signal
function SystemVisual() {
  return (
    <svg viewBox="0 0 520 460" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
      style={{ width: '100%', maxWidth: 560 }}>
      <defs>
        <linearGradient id="gv" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#66745D" />
          <stop offset="1" stopColor="#879B83" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#879B83" stopOpacity="0.14" />
          <stop offset="1" stopColor="#879B83" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ambient glow behind central node */}
      <circle cx="260" cy="230" r="180" fill="url(#glow)" />

      {/* Grid dots */}
      {[80,160,240,320,400,440].map(x =>
        [80,160,240,320,400].map(y => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={1.4} fill="var(--line-strong)" />
        ))
      )}

      {/* Connections */}
      {[
        'M140 130 L260 230', 'M260 230 L400 120', 'M260 230 L390 330',
        'M260 230 L130 320', 'M140 130 L130 320', 'M400 120 L390 330',
      ].map((d, i) => (
        <path key={i} d={d} stroke="var(--line-strong)" strokeWidth="1.25" strokeDasharray="4 5" />
      ))}
      {/* Active green signal path */}
      <path d="M140 130 L260 230 L390 330" stroke="url(#gv)" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Outer nodes */}
      {[
        { cx: 140, cy: 130, r: 26, label: 'IDEA' },
        { cx: 400, cy: 120, r: 26, label: 'SKILL' },
        { cx: 130, cy: 320, r: 22, label: 'CODE' },
        { cx: 390, cy: 330, r: 30, label: 'SHIP' },
      ].map(n => (
        <g key={n.label}>
          <circle cx={n.cx} cy={n.cy} r={n.r} fill="var(--surface)" stroke="var(--line-strong)" strokeWidth="1.5" />
          <text x={n.cx} y={n.cy + 3} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--fg-soft)" letterSpacing="0.06em">{n.label}</text>
        </g>
      ))}

      {/* Central node — sage */}
      <circle cx="260" cy="230" r="42" fill="var(--forest-2)" stroke="url(#gv)" strokeWidth="2" />
      <text x="260" y="228" textAnchor="middle" fontFamily="var(--font-display)" fontSize="15" fontWeight="600" fill="#879B83">OASIS</text>
      <text x="260" y="244" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" fill="var(--on-dark-muted)" letterSpacing="0.14em">BUILD</text>
    </svg>
  )
}

export default function Hero() {
  return (
    <section
      style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', background: 'var(--bg)', overflow: 'hidden' }}
      aria-label="Hero"
    >
      {/* Soft forest wash + faint grid */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 70% 30%, rgba(135,155,131,0.08), transparent 60%)', zIndex: 0 }} />
      <div className="grid-bg" aria-hidden="true" style={{ position: 'absolute', inset: 0, opacity: 0.35, maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent 75%)', WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent 75%)', zIndex: 0 }} />
      <PixelField />

      <div className="container dom-layer" style={{ paddingTop: 132, paddingBottom: 120 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 56, alignItems: 'center' }} className="hero-grid">

          {/* Left — copy */}
          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="section-label">OASIS — Technology Studio</span>

              <h1 className="display-hero" style={{ marginBottom: 28 }}>
                Build.<br />
                Prove.<br />
                <span className="serif" style={{ color: 'var(--sage)' }}>Be seen.</span>
              </h1>

              <p className="body-xl" style={{ maxWidth: 500, marginBottom: 40 }}>
                We help students and early-career builders turn skills, ideas, and projects into
                real products, professional digital identities, and work worth showing.
              </p>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 56 }}>
                <a href="#contact" className="btn-primary">Get Started <ArrowRight size={14} /></a>
                <a href="#work" className="btn-ghost">See Our Work</a>
              </div>

              {/* Inline proof strip */}
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
                style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}
              >
                {[
                  { v: '10+', l: 'Projects delivered' },
                  { v: '4.5/5', l: 'Client satisfaction' },
                  { v: '<1 wk', l: 'Typical delivery' },
                ].map((m, i) => (
                  <div key={i}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 600, color: 'var(--sage)' }}>{m.v}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginTop: 2 }}>{m.l}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Right — visual + floating green card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            className="hero-visual"
          >
            <SystemVisual />

            {/* Floating feature card — subtle forest panel, ivory text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
              className="float-card"
              style={{
                position: 'absolute', bottom: -28, left: -12,
                width: 250, padding: '24px 24px',
                background: 'linear-gradient(150deg, #12241D, #17302704 120%)',
                backgroundColor: '#12241D',
                border: '1px solid var(--line-dark)',
                borderTop: '2px solid var(--sage)',
                borderRadius: 'var(--r-lg)',
                boxShadow: '0 24px 60px rgba(0,0,0,0.45)',
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 12 }}>
                Build support
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, color: 'var(--ivory)', lineHeight: 1.25, marginBottom: 10 }}>
                Your project,<br /><span className="serif" style={{ color: 'var(--sage)' }}>properly shipped.</span>
              </div>
              <p style={{ fontSize: 12.5, color: 'var(--on-dark-soft)', lineHeight: 1.65, marginBottom: 16 }}>
                From idea to a deployed, documented project you can actually show.
              </p>
              <a href="#services" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 600, color: 'var(--ivory)', textDecoration: 'none', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Explore <ArrowUpRight size={13} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media(max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 64px !important; }
          .hero-visual { order: -1; }
          .float-card { left: auto !important; right: 0 !important; bottom: -20px !important; width: 210px !important; }
        }
        @media(max-width: 600px) {
          .hero-visual svg { max-width: 320px !important; }
          .float-card { width: 190px !important; padding: 18px !important; }
        }
        @media(max-width: 380px) {
          .float-card { position: static !important; width: 100% !important; margin-top: 24px; }
        }
      `}</style>
    </section>
  )
}
