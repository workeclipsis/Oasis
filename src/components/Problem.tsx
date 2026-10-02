import { motion } from 'framer-motion'

const truths = [
  {
    num: '01',
    title: 'Skills without a surface to show them',
    body: 'You\'ve built things. Studied hard. But the work sits on a local machine, an unlisted GitHub, or a Wix site that doesn\'t reflect who you actually are. Talent invisible is talent wasted.',
  },
  {
    num: '02',
    title: 'Projects that end at submission',
    body: 'Most college projects get built once, submitted, and abandoned. They could be deployed, documented, and living on your portfolio — proof that you build real things. They aren\'t.',
  },
  {
    num: '03',
    title: 'Good ideas with no technical path forward',
    body: 'You know what you want to build. You don\'t always know how to start, what stack to pick, how to structure it, or how to finish. The gap between idea and working system is where most projects die.',
  },
]

export default function Problem() {
  return (
    <section className="section on-dark" style={{ background: 'var(--forest-2)', borderTop: '1px solid var(--line-dark)', borderBottom: '1px solid var(--line-dark)' }}>
      <div className="container">

        {/* Editorial heading block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ marginBottom: 72 }}
        >
          <span className="section-label">Why OASIS exists</span>
          <h2 className="display-lg" style={{ maxWidth: 640 }}>
            Students have more potential<br />than their online presence shows.
          </h2>
          <p className="body-lg" style={{ maxWidth: 520, marginTop: 16 }}>
            We see it constantly. The gap isn't skill — it's visibility, presentation, and execution.
          </p>
        </motion.div>

        {/* Three editorial truth cards — horizontal rule layout */}
        <div>
          {truths.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                display: 'grid',
                gridTemplateColumns: '60px 1fr',
                gap: '32px 40px',
                padding: '40px 0',
                borderBottom: i < truths.length - 1 ? '1px solid var(--line)' : 'none',
                alignItems: 'start',
              }}
              className="truth-row"
            >
              {/* Number */}
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 11,
                color: 'var(--ink-muted)', letterSpacing: '0.12em',
                paddingTop: 4,
              }}>
                {t.num}
              </span>

              {/* Content */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }} className="truth-content">
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                  fontWeight: 700, color: 'var(--ink)', lineHeight: 1.2,
                }}>
                  {t.title}
                </h3>
                <p style={{ fontSize: 14, color: 'var(--ink-muted)', lineHeight: 1.78 }}>
                  {t.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing statement */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.35 }}
          style={{ marginTop: 64, paddingTop: 40, borderTop: '2px solid var(--ink)' }}
        >
          <p style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(1.1rem, 2.2vw, 1.5rem)',
            fontWeight: 600, color: 'var(--ink)', lineHeight: 1.4, maxWidth: 640,
          }}>
            OASIS bridges the gap between what you can do and what the world can see.
          </p>
        </motion.div>
      </div>

      <style>{`
        @media(max-width: 768px) {
          .truth-row { grid-template-columns: 1fr !important; gap: 16px !important; }
          .truth-content { grid-template-columns: 1fr !important; gap: 12px !important; }
        }
      `}</style>
    </section>
  )
}
