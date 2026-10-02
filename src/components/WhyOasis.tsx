import { motion } from 'framer-motion'

const stages = [
  { label: 'SKILL',       note: 'What you already know',        color: 'var(--fg-muted)' },
  { label: 'BUILD',       note: 'We turn it into real work',    color: 'var(--green-deep)' },
  { label: 'PROVE',       note: 'Documented, deployed, real',   color: 'var(--green-2)' },
  { label: 'PRESENT',     note: 'Packaged so it gets noticed',  color: 'var(--green)' },
]

// Hand-drawn journey diagram — nodes connected by ink arrows
function JourneyDiagram() {
  return (
    <svg viewBox="0 0 900 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ width: '100%', maxWidth: 900 }}>
      {/* Connecting hand-drawn arrows between the 4 nodes at x = 110, 350, 590, 810 */}
      {[
        'M 175 100 C 220 80, 260 120, 300 100',
        'M 415 100 C 460 120, 500 80, 540 100',
        'M 655 100 C 700 80, 730 120, 760 100',
      ].map((d, i) => (
        <path key={i} d={d} stroke="var(--ink-muted)" strokeWidth="1.5" strokeLinecap="round" fill="none" markerEnd="url(#ja)" />
      ))}

      {/* Nodes */}
      {[110, 350, 590].map((cx, i) => (
        <circle key={cx} cx={cx} cy={100} r={44}
          stroke={i === 2 ? 'var(--green-2)' : i === 1 ? 'var(--green-deep)' : 'var(--line-strong)'}
          strokeWidth="2" fill="var(--surface)" />
      ))}
      <circle cx={830} cy={100} r={48} stroke="var(--green)" strokeWidth="2.5" fill="var(--surface)" />
      <circle cx={830} cy={100} r={48} stroke="var(--green)" strokeWidth="0.5" opacity="0.4" fill="none" />

      {/* Node labels */}
      <text x={110} y={104} textAnchor="middle" dominantBaseline="middle" fontFamily="var(--font-mono)" fontSize="12" fontWeight="500" fill="var(--fg-soft)" letterSpacing="0.04em">SKILL</text>
      <text x={350} y={104} textAnchor="middle" dominantBaseline="middle" fontFamily="var(--font-mono)" fontSize="12" fontWeight="500" fill="var(--fg)" letterSpacing="0.04em">BUILD</text>
      <text x={590} y={104} textAnchor="middle" dominantBaseline="middle" fontFamily="var(--font-mono)" fontSize="12" fontWeight="500" fill="var(--fg)" letterSpacing="0.04em">PROVE</text>
      <text x={830} y={104} textAnchor="middle" dominantBaseline="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight="500" fill="var(--green)" letterSpacing="0.04em">PRESENT</text>

      {/* Faint annotation */}
      <text x={350} y={40} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--ink-muted)" letterSpacing="0.04em">the OASIS process</text>

      <defs>
        <marker id="ja" markerWidth="7" markerHeight="7" refX="4" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="var(--ink-muted)" />
        </marker>
      </defs>
    </svg>
  )
}

export default function WhyOasis() {
  return (
    <section id="why" className="section on-light" style={{ background: 'var(--ivory)' }}>
      <div className="container">

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ marginBottom: 72, maxWidth: 640 }}
        >
          <span className="section-label">Why OASIS</span>
          <h2 className="display-lg" style={{ marginTop: 8 }}>
            The distance between<br />
            <em style={{ fontStyle: 'italic', color: 'var(--accent-mint)' }}>skill and opportunity</em>
            <br />is where we work.
          </h2>
          <p className="body-lg" style={{ marginTop: 16, maxWidth: 520 }}>
            Most students have real ability. What they often lack is a way to turn that ability
            into something visible, credible, and finished. OASIS closes that gap.
          </p>
        </motion.div>

        {/* Diagram — desktop */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: 56 }}
          className="journey-desktop"
        >
          <JourneyDiagram />
        </motion.div>

        {/* Stage labels — always visible, doubles as mobile layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, borderTop: '1px solid var(--line)', paddingTop: 32 }} className="stage-grid">
          {stages.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-muted)' }}>0{i + 1}</span>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: s.color }} />
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1rem, 2vw, 1.3rem)', fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>
                {s.label}
              </div>
              <p style={{ fontSize: 13, color: 'var(--ink-muted)', lineHeight: 1.6 }}>{s.note}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width: 700px) {
          .journey-desktop { display: none !important; }
          .stage-grid { grid-template-columns: 1fr 1fr !important; gap: 28px !important; }
        }
      `}</style>
    </section>
  )
}
