import { motion } from 'framer-motion'

const steps = [
  {
    num: '01',
    title: 'Tell us',
    time: '5 min',
    desc: 'Fill in a short form with your goals, scope, and timeline. No sales call, no lengthy onboarding. Just a direct brief.',
  },
  {
    num: '02',
    title: 'Plan',
    time: '24 hrs',
    desc: 'Our team reviews your brief, asks any clarifying questions, and agrees on scope and delivery timeline before any work begins.',
  },
  {
    num: '03',
    title: 'Build',
    time: '3–7 days',
    desc: 'We build. Every project is handled directly by our team — not outsourced, not templated. Real work, from scratch.',
  },
  {
    num: '04',
    title: 'Deliver',
    time: 'Done',
    desc: 'You review via a private link. We refine until you\'re satisfied. Then we deploy, hand over, and stay available for 7 days post-delivery.',
  },
]

export default function Process() {
  return (
    <section id="process" className="section on-dark" style={{ background: 'var(--forest)' }}>
      <div className="container">

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ marginBottom: 80 }}
        >
          <span className="section-label">How it works</span>
          <h2 className="display-lg" style={{ marginTop: 8, maxWidth: 520 }}>
            Four steps.<br />One week.
          </h2>
        </motion.div>

        {/* Horizontal timeline */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, position: 'relative' }} className="process-grid">
          {/* Connecting line — green progress */}
          <div style={{
            position: 'absolute', top: 28, left: '12.5%', right: '12.5%',
            height: 2, background: 'linear-gradient(90deg, var(--green-deep), var(--green) 60%, var(--line-strong))',
            zIndex: 0, opacity: 0.7,
          }} className="proc-line" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ position: 'relative', zIndex: 1, paddingRight: i < 3 ? 32 : 0 }}
            >
              {/* Step number indicator */}
              <div style={{
                width: 56, height: 56, border: '1px solid var(--green)',
                borderRadius: '50%',
                background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 28, boxShadow: '0 0 20px var(--green-glow)',
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--green)', letterSpacing: '0.06em' }}>
                  {step.num}
                </span>
              </div>

              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 10,
              }}>
                {step.time}
              </div>
              <h3 style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(1rem, 2vw, 1.4rem)',
                fontWeight: 700, color: 'var(--ink)', marginBottom: 12, lineHeight: 1.15,
              }}>
                {step.title}
              </h3>
              <p style={{ fontSize: 13, color: 'var(--ink-muted)', lineHeight: 1.75 }}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Quality note */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}
          style={{
            marginTop: 64, padding: '24px 28px',
            borderLeft: '2px solid var(--green)',
            background: 'var(--surface)',
          }}
        >
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-soft)', lineHeight: 1.7 }}>
            Our team works directly with you on every project. No outsourcing. No templates handed off as original work. What we deliver, we built.
          </p>
        </motion.div>
      </div>

      <style>{`
        @media(max-width: 900px) {
          .process-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 40px !important; }
          .proc-line { display: none !important; }
        }
        @media(max-width: 500px) {
          .process-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  )
}
