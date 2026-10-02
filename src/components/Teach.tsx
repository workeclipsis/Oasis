import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle } from 'lucide-react'

const sessions = [
  {
    tag: 'web',
    level: 'Beginner',
    title: 'Web Dev Fundamentals',
    desc: 'HTML, CSS, JavaScript from scratch. Build your first real webpage — not a tutorial clone — by the end of the session.',
  },
  {
    tag: 'react',
    level: 'Beginner',
    title: 'React for Builders',
    desc: 'Components, props, state, hooks. You\'ll understand every line of code in your own project by the end.',
  },
  {
    tag: 'hackathon',
    level: 'Intermediate',
    title: 'Hackathon Readiness',
    desc: 'How to pick an idea, structure a team, build an MVP in 24 hours, present it convincingly, and actually place.',
  },
  {
    tag: 'project',
    level: 'Intermediate',
    title: 'College Project Prep',
    desc: 'We plan your project end to end — tech stack, architecture, documentation, viva prep, and GitHub presentation.',
  },
  {
    tag: 'github',
    level: 'Beginner',
    title: 'Git & GitHub Mastery',
    desc: 'Commits, branches, PRs, README writing — and how to make your profile look actively maintained even if you just started.',
  },
  {
    tag: 'career',
    level: 'Intermediate',
    title: 'Tech Career Clarity',
    desc: 'Resume strategy, LinkedIn positioning, what recruiters actually look for, and a concrete plan to crack your first internship.',
  },
]

const pricing = [
  { label: 'Intro call',             price: 'Free',  free: true },
  { label: '1:1 session (1 hr)',     price: '₹499',  free: false },
  { label: 'Bundle — 4 sessions',    price: '₹1,499', free: false },
  { label: 'Group batch (per person)',price: '₹299',  free: false },
  { label: 'College project prep',   price: '₹999',  free: false },
]

export default function Teach() {
  return (
    <section id="learn" className="section on-light" style={{ background: 'var(--ivory)' }}>
      <div className="container">

        <div style={{ marginBottom: 64 }}>
          <span className="section-label">Mentoring & Learning</span>
          <h2 className="display-lg" style={{ marginTop: 8, maxWidth: 520 }}>
            Beyond the build —<br />
            <em style={{ fontStyle: 'italic', color: 'var(--accent-mint)' }}>we teach you to own it.</em>
          </h2>
          <p className="body-lg" style={{ maxWidth: 480, marginTop: 16 }}>
            Not just deliverables. If you want to understand what you're shipping, we'll walk you through it.
            Live sessions, real projects, zero fluff.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 32, alignItems: 'start' }} className="teach-grid">

          {/* Session types grid */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1px', background: 'var(--line)', border: '1px solid var(--line)',
          }}>
            {sessions.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}
                style={{
                  background: 'var(--paper)', padding: '24px 22px',
                  transition: 'background 0.18s', cursor: 'default',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--paper-dark)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--paper)')}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: 9,
                    color: 'var(--ink-muted)', letterSpacing: '0.1em',
                  }}>
                    // {s.tag}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.1em',
                    textTransform: 'uppercase', padding: '2px 8px',
                    border: '1px solid var(--line)', color: 'var(--ink-muted)',
                  }}>
                    {s.level}
                  </span>
                </div>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginBottom: 8 }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: 12, color: 'var(--ink-muted)', lineHeight: 1.72 }}>
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Booking card */}
          <motion.div
            initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
            style={{ position: 'sticky', top: 88 }}
          >
            <div style={{
              background: 'var(--paper)',
              border: '1px solid var(--line)',
              borderTop: '2px solid var(--ink)',
              padding: '28px 24px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
                <div style={{
                  width: 7, height: 7, borderRadius: '50%',
                  background: 'var(--success)', flexShrink: 0,
                  animation: 'pulse-dot 2s ease-in-out infinite',
                }} />
                <span style={{ fontSize: 12, color: 'var(--success)', fontWeight: 500 }}>
                  Currently accepting students
                </span>
              </div>

              <h3 style={{
                fontFamily: 'var(--font-display)', fontSize: 18,
                fontWeight: 700, color: 'var(--ink)', lineHeight: 1.2, marginBottom: 20,
              }}>
                Book a free 15-min intro call
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                {['1:1 personalised sessions', 'Group batches available', 'Flexible timing, online'].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13, color: 'var(--ink-muted)' }}>
                    <CheckCircle size={13} color="var(--accent-mint)" strokeWidth={1.5} />
                    {item}
                  </div>
                ))}
              </div>

              <a href="#contact" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginBottom: 24 }}>
                Schedule a Call <ArrowRight size={13} />
              </a>

              {/* Pricing list */}
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 12 }}>
                Session pricing
              </div>
              {pricing.map((row, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between',
                  padding: '8px 0', borderBottom: '1px solid var(--line)',
                }}>
                  <span style={{ fontSize: 12, color: 'var(--ink-muted)' }}>{row.label}</span>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: 12,
                    color: row.free ? 'var(--success)' : 'var(--ink)',
                  }}>
                    {row.price}
                  </span>
                </div>
              ))}

              <div style={{ marginTop: 16, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-muted)', textAlign: 'center' }}>
                Or DM on LinkedIn — reply within 2 hrs
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      <style>{`
        @media(max-width: 900px) {
          .teach-grid { grid-template-columns: 1fr !important; }
          .teach-grid > div:last-child { position: static !important; top: auto !important; }
        }
      `}</style>
    </section>
  )
}
